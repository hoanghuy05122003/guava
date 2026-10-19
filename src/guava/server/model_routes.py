"""
Model / evaluation / quick-check endpoints.

Everything runs locally: weights are read from disk, inference happens in a
background job (GPU if available), and results are written into the active
dataset as a "predictions" layer that the grid can filter and evaluate.
"""
from __future__ import annotations

import asyncio
import os
import re
import time
from typing import Any

from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.routing import Route

from guava.server.jobs import Job, job_manager

QUICK_ROOT = os.path.join(os.path.expanduser("~"), ".guava", "quick")
WORKSPACE_ROOT = os.path.join(os.path.expanduser("~"), ".guava", "workspaces")

# last model settings, so "quick check" and re-runs reuse them
model_state: dict[str, Any] = {"path": None, "backend": "auto", "conf": 0.25, "iou": 0.45, "imgsz": None,
                               "device": None, "mode": "eval"}
# evaluation settings shared by every model so their reports stay comparable
eval_state: dict[str, Any] = {"iou": 0.5, "conf": 0.25, "ignore_missing": False, "class_map": {}}


def _manager():
    from guava.server.app import dataset_manager
    return dataset_manager


def _err(msg: str, code: int = 400) -> JSONResponse:
    return JSONResponse({"status": "error", "message": msg}, status_code=code)


def _float(v: Any, default: float) -> float:
    try:
        return float(v)
    except (TypeError, ValueError):
        return default


async def endpoint_system(request: Request) -> JSONResponse:
    from guava.models import model_dirs, system_info
    from guava.version import __version__
    info = await asyncio.to_thread(system_info)
    info.update({"version": __version__, "model_dirs": model_dirs(), "model": model_state})
    return JSONResponse(info)


async def endpoint_list_models(request: Request) -> JSONResponse:
    from guava.models import discover_models, model_dirs
    extra = request.query_params.get("dir", "").strip().strip('"')
    dirs = [extra] if extra and os.path.isdir(extra) else model_dirs()
    found = await asyncio.to_thread(discover_models, dirs)
    return JSONResponse({"dirs": dirs, "models": found})


async def endpoint_inspect_model(request: Request) -> JSONResponse:
    from guava.models import load_model
    body = await request.json()
    path = (body.get("path") or "").strip().strip('"')
    try:
        model = await asyncio.to_thread(load_model, path, body.get("backend", "auto"))
    except Exception as e:
        return _err(f"{type(e).__name__}: {e}")
    model_state.update({"path": path, "backend": body.get("backend", "auto")})
    return JSONResponse({"status": "ok", "model": model.info()})


def _scope_samples(body: dict[str, Any]):
    mgr = _manager()
    ds = mgr.dataset
    scope = body.get("scope", "all")
    if scope == "selected":
        ids = set(body.get("sample_ids") or [])
        return [s for s in ds.samples if s.id in ids]
    if scope == "filtered":
        samples, _ = mgr.query(**(body.get("filters") or {}))
        return samples
    if scope == "not_inferred":
        return [s for s in ds.samples if "infer_ms" not in s.fields]
    return list(ds.samples)


async def endpoint_run_model(request: Request) -> JSONResponse:
    from guava.models import InferenceConfig, apply_model, load_model

    mgr = _manager()
    if mgr.dataset is None:
        return _err("No dataset loaded")
    body = await request.json()
    path = (body.get("path") or model_state.get("path") or "").strip().strip('"')
    if not path:
        return _err("Choose a model file first")
    backend = body.get("backend") or model_state.get("backend") or "auto"
    imgsz = body.get("imgsz")
    # mode "eval": keep every box (conf 0.001, like `ultralytics val`) so mAP is comparable;
    # `conf` is then only the operating point for P/R/TP/FP/FN and the default display filter.
    # mode "display": only boxes >= conf are stored (deploy-like, lighter).
    mode = "display" if body.get("mode") == "display" else "eval"
    conf = _float(body.get("conf"), 0.25)
    nms_iou = _float(body.get("iou"), 0.45)
    common = dict(
        imgsz=int(imgsz) if imgsz not in (None, "", 0, "0") else None,
        device=body.get("device") or None,
        batch=int(body.get("batch") or 8),
        half=bool(body.get("half", False)),
    )
    cfg = InferenceConfig.for_eval(**common) if mode == "eval" else InferenceConfig(conf=conf, iou=nms_iou, **common)
    model_state.update({"path": path, "backend": backend, "conf": conf, "iou": nms_iou,
                        "imgsz": cfg.imgsz, "device": cfg.device, "mode": mode})
    if mode == "eval":
        eval_state["conf"] = conf
    alias = (body.get("alias") or "").strip() or None
    samples = _scope_samples(body)
    auto_eval = bool(body.get("auto_eval", True))
    ds = mgr.dataset

    def work(job: Job) -> dict[str, Any]:
        job.message = f"Loading {os.path.basename(path)}..."
        model = load_model(path, backend=backend, device=cfg.device)
        job.message = f"Running {model.name} on {len(samples)} images"
        summary: dict[str, Any] = apply_model(
            ds, model, cfg, samples=samples,
            progress=lambda d, t: job.update(d, t),
            cancel=job.cancel_event,
            alias=alias,
        )
        name = str(summary["model_name"])
        summary["model"] = model.info()
        summary["mode"] = mode
        summary["operating_conf"] = conf
        if auto_eval and any(s.ground_truth for s in samples):
            job.message = "Evaluating against ground truth..."
            # every model, same settings: the comparison table must never mix thresholds
            _eval_all(mgr, None)
            report = mgr.evals.get(name)
            if report is not None:
                mgr.last_eval = report
                summary["eval"] = report.get("overall")
                summary["warnings"] = report.get("warnings", [])
        return summary

    job = job_manager.submit("inference", work, title=f"Predict: {os.path.basename(path)}")
    return JSONResponse({"status": "ok", "job_id": job.id, "count": len(samples)})


async def endpoint_jobs(request: Request) -> JSONResponse:
    return JSONResponse({"jobs": job_manager.list()})


async def endpoint_job(request: Request) -> JSONResponse:
    job = job_manager.get(request.path_params["job_id"])
    if not job:
        return _err("Job not found", 404)
    return JSONResponse(job.to_dict())


async def endpoint_job_cancel(request: Request) -> JSONResponse:
    return JSONResponse({"status": "ok", "cancelled": job_manager.cancel(request.path_params["job_id"])})


async def endpoint_clear_predictions(request: Request) -> JSONResponse:
    """Clear one model's predictions (body.model) or all of them."""
    from guava.models import clear_predictions
    mgr = _manager()
    if mgr.dataset is None:
        return _err("No dataset loaded")
    body = await request.json() if request.method == "POST" else {}
    model = body.get("model") or None
    removed = clear_predictions(mgr.dataset.samples, model)
    if model is None:
        for s in mgr.dataset.samples:
            for a in s.annotations:
                a.attributes.pop("eval", None)
        mgr.evals = {}
        mgr.last_eval = None
    else:
        mgr.evals.pop(model, None)
        if (mgr.last_eval or {}).get("model") == model:
            mgr.last_eval = next(iter(mgr.evals.values()), None)
    return JSONResponse({"status": "ok", "removed": removed})


def _eval_all(mgr, model: str | None) -> dict[str, Any] | None:
    from guava.eval import evaluate_models
    names = [model] if model else None
    reports = evaluate_models(mgr.dataset, models=names, **eval_state)
    mgr.evals.update(reports)
    if model:
        mgr.last_eval = reports.get(model)
    elif reports:
        # keep the previously active model active if it is still there
        active = (mgr.last_eval or {}).get("model")
        mgr.last_eval = reports.get(active) or next(iter(reports.values()))
    return mgr.last_eval


async def endpoint_eval_run(request: Request) -> JSONResponse:
    """Evaluate one model (body.model) or every model with predictions, each separately."""
    mgr = _manager()
    if mgr.dataset is None:
        return _err("No dataset loaded")
    from guava.eval import parse_class_map
    body = await request.json() if request.method == "POST" else {}
    eval_state.update({
        "iou": _float(body.get("iou"), eval_state["iou"]),
        "conf": _float(body.get("conf"), eval_state["conf"]),
        "ignore_missing": bool(body.get("ignore_missing", eval_state["ignore_missing"])),
        "class_map": parse_class_map(body["class_map"]) if "class_map" in body else eval_state["class_map"],
    })
    report = await asyncio.to_thread(_eval_all, mgr, body.get("model") or None)
    return JSONResponse({"status": "ok", "report": report, "models": mgr.pred_models(), "settings": eval_state})


async def endpoint_eval_report(request: Request) -> JSONResponse:
    mgr = _manager()
    model = request.query_params.get("model", "")
    report = mgr.evals.get(model) if model else mgr.last_eval
    if model and report is not None:
        mgr.last_eval = report
    return JSONResponse({"report": report, "settings": eval_state})


async def endpoint_eval_compare(request: Request) -> JSONResponse:
    """Side-by-side metrics for every model + disagreement counts for models a/b."""
    from guava.server.app import compare_counts
    mgr = _manager()
    if mgr.dataset is None:
        return _err("No dataset loaded")
    models = mgr.pred_models()
    names = [str(m["name"]) for m in models]
    a = request.query_params.get("a") or (names[0] if names else "")
    b = request.query_params.get("b") or (next((n for n in names if n != a), ""))
    rows = []
    for m in models:
        rep = mgr.evals.get(str(m["name"]))
        rows.append({**m, "type": (rep or {}).get("type"), "classes": (rep or {}).get("classes", []),
                     "run": (rep or {}).get("run"), "warnings": (rep or {}).get("warnings", [])})
    counts = compare_counts(mgr.dataset.samples, a, b) if a and b and a != b else None
    return JSONResponse({"models": rows, "a": a, "b": b, "counts": counts})


# QC settings shared by /api/eval/qc and the box-level compare filters.
# critical=None -> classes named like defect/scratch/NG; thresholds = {model: {class: conf}}
qc_state: dict[str, Any] = {"critical": None, "weights": {}, "thresholds": {}, "target_recall": 0.99}


def _dataset_labels(ds) -> list[str]:
    from guava.core.annotation import BboxAnnotation
    return sorted({a.label for s in ds.samples for a in s.annotations if isinstance(a, BboxAnnotation)})


def qc_critical(mgr) -> list[str]:
    from guava.eval.qc import default_critical
    if qc_state["critical"] is not None:
        return list(qc_state["critical"])
    return default_critical(_dataset_labels(mgr.dataset)) if mgr.dataset is not None else []


def _eval_params(mgr, model: str) -> tuple[float, float]:
    rep = mgr.evals.get(model) or {}
    return float(rep.get("iou", 0.5)), float(rep.get("conf", 0.0))


def box_compare_args(mgr, a: str, b: str) -> dict[str, Any]:
    """Keyword args for guava.eval.qc.sample_box_compare (same IoU / min conf as each model's eval)."""
    iou, conf_a = _eval_params(mgr, a)
    conf_b = _eval_params(mgr, b)[1]
    return {"critical": qc_critical(mgr), "iou": iou, "conf_a": conf_a, "conf_b": conf_b}


def qc_image_ids(mgr, model: str | None, issue: str) -> set[str]:
    """Ids of the images `model` escaped (issue="qc_escape") or over-rejected ("qc_overkill")."""
    from guava.eval.qc import collect, image_qc
    if model is None:
        names = [str(m["name"]) for m in mgr.pred_models()]
        model = names[0] if len(names) == 1 else None
    iou, conf = _eval_params(mgr, model or "")
    res = image_qc(collect(mgr.dataset, model, iou), qc_critical(mgr), (qc_state["thresholds"] or {}).get(model or ""),
                   qc_state["weights"], default_thr=conf)
    return set(res["escaped_ids"] if issue == "qc_escape" else res["overkill_ids"])


def _qc_all(mgr, names: list[str], a: str, b: str, n_boot: int) -> dict[str, Any]:
    from guava.eval.qc import box_compare_counts, qc_report
    crit = qc_critical(mgr)
    reports = {}
    for m in names:
        rep = mgr.evals.get(m) or {}
        if rep.get("type") == "classification":
            continue
        iou, conf = _eval_params(mgr, m)
        reports[m] = qc_report(
            mgr.dataset, m, critical=crit, weights=qc_state["weights"],
            thresholds=(qc_state["thresholds"] or {}).get(m), target_recall=qc_state["target_recall"],
            iou=iou, conf=conf, n_boot=n_boot,
        )
    box = box_compare_counts(mgr.dataset.samples, a, b, **box_compare_args(mgr, a, b)) if a and b and a != b else None
    return {
        "config": {**qc_state, "critical": crit, "auto_critical": qc_state["critical"] is None,
                   "labels": _dataset_labels(mgr.dataset)},
        "models": reports, "a": a, "b": b, "box_counts": box,
    }


async def endpoint_eval_qc(request: Request) -> JSONResponse:
    """QC view per model: escape / overkill, PR + F1 curves, recommended thresholds, bootstrap CIs.

    POST body may update the settings: critical (list, or null = auto), weights {class: w},
    thresholds {model: {class: conf}}, target_recall; plus a / b for box-level compare counts.
    """
    mgr = _manager()
    if mgr.dataset is None:
        return _err("No dataset loaded")
    body = await request.json() if request.method == "POST" else {}
    if "critical" in body:
        crit = body["critical"]
        qc_state["critical"] = None if crit is None else [str(c) for c in crit]
    if isinstance(body.get("weights"), dict):
        qc_state["weights"] = {str(k): _float(v, 1.0) for k, v in body["weights"].items()}
    if isinstance(body.get("thresholds"), dict):
        qc_state["thresholds"] = {str(m): {str(k): _float(v, 0.0) for k, v in (t or {}).items()}
                                  for m, t in body["thresholds"].items()}
    if body.get("target_recall") is not None:
        qc_state["target_recall"] = min(1.0, max(0.0, _float(body["target_recall"], 0.99)))
    names = [str(m["name"]) for m in mgr.pred_models()]
    a = body.get("a") or request.query_params.get("a") or (names[0] if names else "")
    b = body.get("b") or request.query_params.get("b") or next((n for n in names if n != a), "")
    n_boot = int(_float(body.get("n_boot"), 500))
    out = await asyncio.to_thread(_qc_all, mgr, names, a, b, max(0, min(n_boot, 5000)))
    return JSONResponse(out)


async def endpoint_tag_filtered(request: Request) -> JSONResponse:
    """Tag every sample matching the current filters (e.g. all FP images -> 'review')."""
    mgr = _manager()
    if mgr.dataset is None:
        return _err("No dataset loaded")
    body = await request.json()
    tag = (body.get("tag") or "").strip()
    if not tag:
        return _err("Tag name required")
    samples, _ = mgr.query(**(body.get("filters") or {}))
    for s in samples:
        s.add_tag(tag)
    return JSONResponse({"status": "ok", "affected": len(samples)})


_SAFE = re.compile(r"[^A-Za-z0-9._()\- ]+")


async def endpoint_quick_upload(request: Request) -> JSONResponse:
    """Drop images in the browser -> saved locally -> appended to a 'Quick Check' dataset."""
    from guava.core.dataset import Dataset
    from guava.core.sample import Sample

    mgr = _manager()
    name = _SAFE.sub("_", os.path.basename(request.query_params.get("filename", "image.jpg"))) or "image.jpg"
    if not name.lower().endswith((".jpg", ".jpeg", ".png", ".bmp", ".webp", ".tif", ".tiff")):
        return _err("Only image files are supported")
    data = await request.body()
    if not data:
        return _err("Empty upload")

    fresh = request.query_params.get("new") == "1"
    if fresh or mgr.dataset is None or mgr.dataset.format != "quick":
        session_dir = os.path.join(QUICK_ROOT, time.strftime("%Y%m%d_%H%M%S"))
        os.makedirs(session_dir, exist_ok=True)
        ds = Dataset(name="Quick Check", format="quick")
        mgr.set_dataset(ds, path=session_dir)
    session_dir = mgr.dataset_path or QUICK_ROOT
    os.makedirs(session_dir, exist_ok=True)

    dest = os.path.join(session_dir, name)
    stem, ext = os.path.splitext(dest)
    i = 1
    while os.path.exists(dest):
        dest = f"{stem}_{i}{ext}"
        i += 1
    with open(dest, "wb") as f:
        f.write(data)
    sample = Sample(id=os.path.splitext(os.path.basename(dest))[0], filepath=dest)
    sample.read_image_metadata()
    mgr.dataset.add_sample(sample)
    return JSONResponse({"status": "ok", "sample_id": sample.id, "path": dest})


async def endpoint_workspace_save(request: Request) -> JSONResponse:
    """Persist the dataset with predictions/tags/eval to a .guava.json manifest."""
    mgr = _manager()
    if mgr.dataset is None:
        return _err("No dataset loaded")
    body = await request.json()
    path = (body.get("path") or "").strip().strip('"')
    if not path:
        os.makedirs(WORKSPACE_ROOT, exist_ok=True)
        path = os.path.join(WORKSPACE_ROOT, f"{_SAFE.sub('_', mgr.dataset.name)}_{time.strftime('%Y%m%d_%H%M%S')}.guava.json")
    elif os.path.isdir(path):
        path = os.path.join(path, f"{_SAFE.sub('_', mgr.dataset.name)}.guava.json")
    elif not path.endswith(".guava.json"):
        path += ".guava.json"
    await asyncio.to_thread(mgr.dataset.save, path)
    return JSONResponse({"status": "ok", "path": path})


async def endpoint_workspace_list(request: Request) -> JSONResponse:
    items = []
    if os.path.isdir(WORKSPACE_ROOT):
        for f in sorted(os.listdir(WORKSPACE_ROOT), reverse=True):
            if f.endswith(".guava.json"):
                p = os.path.join(WORKSPACE_ROOT, f)
                items.append({"name": f, "path": p, "size_kb": round(os.path.getsize(p) / 1024, 1)})
    return JSONResponse({"root": WORKSPACE_ROOT, "workspaces": items})


model_routes = [
    Route("/api/system", endpoint_system),
    Route("/api/models", endpoint_list_models),
    Route("/api/models/inspect", endpoint_inspect_model, methods=["POST"]),
    Route("/api/models/run", endpoint_run_model, methods=["POST"]),
    Route("/api/jobs", endpoint_jobs),
    Route("/api/jobs/{job_id}", endpoint_job),
    Route("/api/jobs/{job_id}/cancel", endpoint_job_cancel, methods=["POST"]),
    Route("/api/predictions/clear", endpoint_clear_predictions, methods=["POST"]),
    Route("/api/eval/run", endpoint_eval_run, methods=["POST"]),
    Route("/api/eval/report", endpoint_eval_report),
    Route("/api/eval/compare", endpoint_eval_compare),
    Route("/api/eval/qc", endpoint_eval_qc, methods=["GET", "POST"]),
    Route("/api/samples/tag_filtered", endpoint_tag_filtered, methods=["POST"]),
    Route("/api/quick/upload", endpoint_quick_upload, methods=["POST"]),
    Route("/api/workspace/save", endpoint_workspace_save, methods=["POST"]),
    Route("/api/workspace/list", endpoint_workspace_list),
]