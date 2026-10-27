"""
Guava Native High-Performance Web Server Application.

100% built for Guava:
- Pure REST API serving Guava Single-Page Application
- Zero FiftyOne dependencies, zero MongoDB
- Real dataset operations: Load from disk, Export, Filter, Sort, Tag, Edit annotations
- Real Brain AI: Visual similarity ranking, duplicate detection, uniqueness scoring
- Real Quality Audit with click-to-filter problematic samples
"""
from __future__ import annotations

import mimetypes
import os
import shutil
from typing import Any
from urllib.parse import quote

from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import FileResponse, JSONResponse, Response
from starlette.routing import Mount, Route
from starlette.staticfiles import StaticFiles

from guava.core.annotation import Annotation, BboxAnnotation
from guava.core.dataset import Dataset
from guava.core.sample import ImageMetadata, Sample
from guava.io.api import detect_format, export, list_formats, load
from guava.server.model_routes import model_routes

WEB_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "web"))


class DatasetManager:
    """Manages active dataset access, sample filtering, sorting and caching."""

    def __init__(self, dataset: Dataset | None = None):
        self.dataset: Dataset | None = None
        self.last_eval: dict[str, Any] | None = None
        self.evals: dict[str, dict[str, Any]] = {}  # per-model eval reports
        self.dataset_path: str | None = None
        self.dirty: set[str] = set()  # samples whose ground truth was edited and not yet saved
        self.eval_stale = False  # ground truth changed after the last full evaluation
        self.saved_classes: list[str] = []  # class order of the label files on disk
        if dataset is not None:
            self.set_dataset(dataset)

    def set_dataset(self, dataset: Dataset, path: str | None = None) -> None:
        self.dataset = dataset
        self.dataset_path = path
        self.last_eval = None
        self.evals = {}
        self.dirty = set()
        self.eval_stale = False
        self.saved_classes = list(dataset.schema.class_names)

    def pred_models(self) -> list[dict[str, Any]]:
        """Models with results in the dataset + their last eval summary."""
        from guava.models import prediction_models
        if self.dataset is None:
            return []
        out = prediction_models(self.dataset.samples)
        for m in out:
            rep = self.evals.get(str(m["name"]))
            m["eval"] = (rep or {}).get("overall")
            m["iou"] = (rep or {}).get("iou")
        return out

    def get_info(self) -> dict[str, Any]:
        if self.dataset is None:
            return {
                "name": "No Dataset Loaded",
                "total_samples": 0,
                "subsets": {},
                "categories": {},
                "tags": {},
            }
        stats = self.dataset.stats()
        return {
            "name": stats.get("name", "Guava Dataset"),
            "total_samples": stats.get("item_count", 0),
            "subsets": stats.get("subset_distribution", {}),
            "categories": stats.get("category_distribution", {}),
            "tags": stats.get("tag_distribution", {}),
            "predictions": stats.get("prediction_distribution", {}),
            "prediction_count": stats.get("prediction_count", 0),
            "inferred_count": sum(1 for s in self.dataset.samples if "infer_ms" in s.fields),
            "has_eval": self.last_eval is not None or bool(self.evals),
            "pred_models": self.pred_models(),
            "active_model": (self.last_eval or {}).get("model"),
            "format": self.dataset.format or "native",
            "path": self.dataset_path,
            "classes": self._class_list(),
            "dirty_count": len(self.dirty),
            "eval_stale": self.eval_stale,
            "can_save_labels": any("label_path" in s.fields for s in self.dataset.samples),
        }

    def _class_list(self) -> list[str]:
        """Classes to offer in the label editor: schema order, then any other GT label."""
        names = list(self.dataset.schema.class_names) if self.dataset else []
        seen = set(names)
        for s in self.dataset.samples if self.dataset else []:
            for a in s.ground_truth:
                if a.label not in seen:
                    seen.add(a.label)
                    names.append(a.label)
        return names

    def query(
        self,
        subsets: list[str] | None = None,
        tags: list[str] | None = None,
        search: str = "",
        category: str = "",
        sort_by: str = "default",
        similar_to: str = "",
        filter_issue: str = "",
        cm_gt: str = "",
        cm_pred: str = "",
        model: str = "",
        cmp: str = "",
        cmp_a: str = "",
        cmp_b: str = "",
        **_: Any,
    ) -> tuple[list[Sample], dict[str, float]]:
        """Apply sidebar filters + sorting. Returns (samples, similarity_map).

        `model` scopes eval filters/sorts to one model's results; `cmp` with
        `cmp_a`/`cmp_b` keeps images where the two models disagree.
        """
        if self.dataset is None:
            return [], {}
        filtered = list(self.dataset.samples)
        m = model or None

        if filter_issue in ("qc_escape", "qc_overkill"):
            # image-level QC: NG images the model passed / OK images it rejected
            from guava.server.model_routes import qc_image_ids
            ids = qc_image_ids(self, m, filter_issue)
            filtered = [s for s in filtered if s.id in ids]
        elif filter_issue:
            filtered = [s for s in filtered if _matches_issue(s, filter_issue, m)]

        if cm_gt and cm_pred:
            from guava.eval import sample_in_confusion_cell
            rep = self.evals.get(model) if model else self.last_eval
            iou = (rep or self.last_eval or {}).get("iou", 0.5)
            filtered = [s for s in filtered if sample_in_confusion_cell(s, cm_gt, cm_pred, iou, model=m)]

        if cmp and cmp_a and cmp_b:
            from guava.eval.qc import BOX_COMPARE_MODES, sample_box_compare
            if cmp in BOX_COMPARE_MODES:
                # box-level: which GT objects one model found and the other did not
                from guava.server.model_routes import box_compare_args
                kw = box_compare_args(self, cmp_a, cmp_b)
                filtered = [s for s in filtered if cmp in sample_box_compare(s, cmp_a, cmp_b, **kw)]
            else:
                filtered = [s for s in filtered if _matches_compare(s, cmp, cmp_a, cmp_b)]

        if subsets:
            sub_set = set(subsets)
            filtered = [s for s in filtered if (s.subset or "default") in sub_set]

        if tags:
            tag_set = set(tags)
            filtered = [s for s in filtered if any(t in tag_set for t in s.tags)]

        if search:
            q = search.lower()
            filtered = [
                s for s in filtered
                if q in s.id.lower()
                or q in os.path.basename(s.filepath).lower()
                or any(q in t.lower() for t in s.tags)
                or any(q in a.label.lower() for a in s.annotations)
            ]

        if category:
            cats = {c for c in category.split(",") if c}
            filtered = [s for s in filtered if any(a.label in cats for a in s.annotations)]

        similarity_map: dict[str, float] = {}
        if similar_to:
            from guava.brain.similarity import compute_similarity
            sim_results = compute_similarity(self.dataset, similar_to, top_k=len(self.dataset))
            similarity_map = {sid: score for sid, score in sim_results}
            similarity_map[similar_to] = 1.0
            filtered.sort(key=lambda s: -similarity_map.get(s.id, 0.0))
        elif sort_by in SORTERS:
            key, reverse = SORTERS[sort_by]
            filtered.sort(key=lambda s: key(s, m), reverse=reverse)
        return filtered, similarity_map

    def get_samples(
        self,
        page: int = 1,
        limit: int = 30,
        min_conf: float = 0.0,
        layers: list[str] | None = None,
        **filters: Any,
    ) -> dict[str, Any]:
        if self.dataset is None:
            return {"page": 1, "limit": limit, "total": 0, "total_pages": 1, "samples": []}

        filtered, similarity_map = self.query(**filters)
        total = len(filtered)
        start = (page - 1) * limit
        samples_out = []
        for s in filtered[start:start + limit]:
            item = serialize_sample(s, min_conf, layers=layers, model=filters.get("model") or None)
            if filters.get("similar_to"):
                item["similarity"] = similarity_map.get(s.id, 0.0)
            samples_out.append(item)

        return {
            "page": page,
            "limit": limit,
            "total": total,
            "total_pages": max(1, (total + limit - 1) // limit),
            "samples": samples_out,
        }

    def get_sample(self, sample_id: str) -> Sample | None:
        if self.dataset:
            return self.dataset.get(sample_id)
        return None

    def delete_sample(self, sample_id: str) -> bool:
        if self.dataset:
            s = self.dataset.get(sample_id)
            if s and s in self.dataset._samples:
                self.dataset._samples.remove(s)
                self.dataset._id_map.pop(sample_id, None)
                return True
        return False


def _preds(s: Sample, model: str | None = None) -> list[Annotation]:
    if model is None:
        return s.predictions
    from guava.models.apply import ann_model
    return [a for a in s.predictions if ann_model(a) == model]


def _ev(s: Sample, model: str | None, key: str) -> int:
    from guava.eval import sample_eval
    return int((sample_eval(s, model) or {}).get(key, 0))


def _max_pred_conf(s: Sample, default: float, model: str | None = None) -> float:
    confs = [a.confidence for a in _preds(s, model) if a.confidence is not None]
    return max(confs, default=default)


def _min_conf(s: Sample) -> float:
    confs = [a.confidence for a in s.annotations if a.confidence is not None]
    return min(confs, default=1.0)


def _infer_ms(s: Sample, model: str | None) -> float:
    runs = s.fields.get("infer")
    if model is not None and isinstance(runs, dict):
        return float(runs.get(model, 0.0))
    return float(s.fields.get("infer_ms", 0.0))


# sort key(sample, active model or None), reverse
SORTERS: dict[str, tuple[Any, bool]] = {
    "annotations_desc": (lambda s, m: len(s.ground_truth), True),
    "annotations_asc": (lambda s, m: len(s.ground_truth), False),
    "conf_desc": (lambda s, m: _max_pred_conf(s, 0.0, m), True),
    "conf_asc": (lambda s, m: _max_pred_conf(s, 1.0, m), False),
    "min_conf_asc": (lambda s, m: _min_conf(s), False),
    "uniqueness_desc": (lambda s, m: s.fields.get("uniqueness", 0.5), True),
    "uniqueness_asc": (lambda s, m: s.fields.get("uniqueness", 0.5), False),
    "id_asc": (lambda s, m: s.id, False),
    "errors_desc": (lambda s, m: _ev(s, m, "fp") + _ev(s, m, "fn"), True),
    "fp_desc": (lambda s, m: _ev(s, m, "fp"), True),
    "fn_desc": (lambda s, m: _ev(s, m, "fn"), True),
    "preds_desc": (lambda s, m: len(_preds(s, m)), True),
    "infer_ms_desc": (lambda s, m: _infer_ms(s, m), True),
}

COMPARE_MODES = ("a_wrong_b_right", "b_wrong_a_right", "both_wrong", "both_right")


def _compare_key(s: Sample, a: str, b: str) -> str | None:
    """Which COMPARE_MODES bucket an image falls in (None = not evaluated by both)."""
    from guava.eval import sample_wrong
    wa, wb = sample_wrong(s, a), sample_wrong(s, b)
    if wa is None or wb is None:
        return None
    if wa:
        return "both_wrong" if wb else "a_wrong_b_right"
    return "b_wrong_a_right" if wb else "both_right"


def _matches_compare(s: Sample, mode: str, a: str, b: str) -> bool:
    key = _compare_key(s, a, b)
    if mode == "disagree":
        return key in ("a_wrong_b_right", "b_wrong_a_right")
    return key == mode


def compare_counts(samples: list[Sample], a: str, b: str) -> dict[str, int]:
    out = dict.fromkeys(COMPARE_MODES, 0)
    for s in samples:
        key = _compare_key(s, a, b)
        if key:
            out[key] += 1
    return out


def _matches_issue(s: Sample, issue: str, model: str | None = None) -> bool:
    if issue == "degenerate":
        return any(isinstance(a, BboxAnnotation) and (a.w <= 0 or a.h <= 0) for a in s.annotations)
    if issue == "unannotated":
        return len(s.ground_truth) == 0
    if issue == "missing_media":
        return bool(s.filepath) and not os.path.exists(s.filepath)
    from guava.eval import sample_eval
    from guava.models import sample_ran
    inferred = sample_ran(s, model) if model else "infer_ms" in s.fields
    ev = sample_eval(s, model) or {}
    fp, fn = ev.get("fp", 0), ev.get("fn", 0)
    correct = ev.get("correct")
    if issue == "eval_fp":
        return fp > 0
    if issue == "eval_fn":
        return fn > 0
    if issue == "eval_error":
        return fp > 0 or fn > 0 or correct is False
    if issue == "eval_ok":
        return inferred and fp == 0 and fn == 0 and correct is not False
    if issue == "has_pred":
        return len(_preds(s, model)) > 0
    if issue == "no_pred":
        return inferred and len(_preds(s, model)) == 0
    if issue == "not_inferred":
        return not inferred
    return True


def _ann_out(a: Annotation, s: Sample, model: str | None = None) -> dict[str, Any] | None:
    is_pred = a.attributes.get("kind") == "prediction"
    if not is_pred and model is not None:
        from guava.eval import gt_eval
        status = gt_eval(a, model)
    else:
        status = a.attributes.get("eval")
    out: dict[str, Any] = {
        "id": a.id,
        "label": a.label,
        "confidence": a.confidence if a.confidence is not None else 1.0,
        "eval": status,
        "eval_iou": a.attributes.get("eval_iou"),
    }
    if is_pred:
        from guava.models.apply import ann_model
        out["model"] = ann_model(a)
    elif isinstance(a.attributes.get("eval_models"), dict):
        # TP / FN of this object for every evaluated model (side-by-side compare)
        out["eval_by"] = dict(a.attributes["eval_models"])
    if isinstance(a, BboxAnnotation):
        b = a
        w, h = s.metadata.width, s.metadata.height
        if not a.is_normalized and w and h:
            b = a.to_normalized(w, h)
        out["bounding_box"] = b.bounding_box
        out["is_normalized"] = b.is_normalized
        if a.attributes.get("points"):
            out["points"] = a.attributes["points"]
    elif getattr(a, "points", None):
        out["points"] = a.points  # type: ignore[attr-defined]
        out["is_normalized"] = False
    else:
        out["classification"] = True
    return out


def serialize_sample(
    s: Sample, min_conf: float = 0.0, layers: list[str] | None = None, model: str | None = None,
) -> dict[str, Any]:
    """`layers` = model names whose predictions to include (None = all);
    `model` = whose TP/FN status to show on ground-truth boxes."""
    from guava.models.apply import ann_model
    layer_set = set(layers) if layers is not None else None
    gt = [_ann_out(a, s, model) for a in s.ground_truth]
    preds = [
        _ann_out(a, s) for a in s.predictions
        if (a.confidence if a.confidence is not None else 1.0) >= min_conf
        and (layer_set is None or ann_model(a) in layer_set)
    ]
    ev = s.fields.get("eval")
    return {
        "id": s.id,
        "filepath": s.filepath,
        "filename": os.path.basename(s.filepath) if s.filepath else s.id,
        "media_url": f"/api/media/{quote(s.id, safe='')}",
        "thumb_url": f"/api/media/{quote(s.id, safe='')}?thumb=1",
        "width": s.metadata.width or 640,
        "height": s.metadata.height or 480,
        "subset": s.subset or "default",
        "tags": sorted(s.tags),
        "annotations_count": len(gt),
        "ground_truth": gt,
        "predictions": preds,
        "fields": {k: v for k, v in s.fields.items() if not isinstance(v, (list, dict))},
        "uniqueness": s.fields.get("uniqueness"),
        "eval_models": ev if isinstance(ev, dict) else {},
    }


dataset_manager = DatasetManager()


# ── REST API Endpoints ────────────────────────────────────────────────────────

async def endpoint_root(request: Request) -> Response:
    index_path = os.path.join(WEB_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path, media_type="text/html")
    return Response("<h1>Guava Web App index.html not found</h1>", status_code=404)


async def endpoint_info(request: Request) -> JSONResponse:
    return JSONResponse(dataset_manager.get_info())


async def endpoint_discover_datasets(request: Request) -> JSONResponse:
    """Auto-discover real datasets on this machine."""
    scan_roots = [
        r"D:\data",
        r"D:\datasets",
        os.path.expanduser("~/fiftyone"),
        os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".cache", "demo_images")),
    ]
    discovered = []
    seen = set()

    for root_dir in scan_roots:
        if not os.path.exists(root_dir):
            continue
        try:
            for item in os.listdir(root_dir):
                sub = os.path.join(root_dir, item)
                if not os.path.isdir(sub):
                    continue

                check_dirs = [sub]
                try:
                    for child in os.listdir(sub):
                        child_path = os.path.join(sub, child)
                        if os.path.isdir(child_path):
                            check_dirs.append(child_path)
                except Exception:
                    pass

                for d in check_dirs:
                    if d in seen:
                        continue
                    has_yaml = os.path.exists(os.path.join(d, "data.yaml"))
                    has_labels = (
                        os.path.exists(os.path.join(d, "labels"))
                        or os.path.exists(os.path.join(d, "train", "labels"))
                        or os.path.exists(os.path.join(d, "classes.txt"))
                    )
                    has_voc = os.path.exists(os.path.join(d, "Annotations"))
                    has_coco = any(
                        f.endswith(".json") and "annotation" in f.lower()
                        for f in os.listdir(d)
                        if os.path.isfile(os.path.join(d, f))
                    )

                    fmt = None
                    if has_yaml or has_labels:
                        fmt = "yolo"
                    elif has_voc:
                        fmt = "voc"
                    elif has_coco:
                        fmt = "coco"
                    elif any(
                        f.lower().endswith((".bmp", ".jpg", ".png", ".webp"))
                        for f in os.listdir(d)
                        if os.path.isfile(os.path.join(d, f))
                    ):
                        fmt = "imagefolder"

                    if fmt:
                        seen.add(d)
                        img_count = 0
                        try:
                            for _, _, files in os.walk(d):
                                img_count += sum(1 for f in files if f.lower().endswith((".bmp", ".jpg", ".jpeg", ".png", ".webp")))
                                if img_count > 1000:
                                    break
                        except Exception:
                            pass

                        parent_folder = os.path.basename(os.path.dirname(d))
                        display_name = f"{parent_folder} / {os.path.basename(d)}" if parent_folder and parent_folder != os.path.basename(root_dir) else os.path.basename(d)

                        discovered.append({
                            "name": display_name,
                            "path": d,
                            "format": fmt,
                            "sample_count": img_count,
                        })
        except Exception:
            pass

    return JSONResponse({"datasets": discovered})


async def endpoint_browse(request: Request) -> JSONResponse:
    """Browse directories and files on machine."""
    path = request.query_params.get("path", "").strip()
    if (path.startswith('"') and path.endswith('"')) or (path.startswith("'") and path.endswith("'")):
        path = path[1:-1].strip()

    if not path:
        # Return root drives on Windows
        drives = []
        for letter in "CDEFGHIJKLMNOPQRSTUVWXYZ":
            drive = f"{letter}:\\"
            if os.path.exists(drive):
                drives.append({"name": drive, "path": drive, "is_dir": True})
        return JSONResponse({"current": "", "items": drives})

    if not os.path.exists(path):
        return JSONResponse({"error": "Path not found"}, status_code=404)

    items = []
    try:
        if os.path.isdir(path):
            parent = os.path.dirname(os.path.abspath(path))
            for f in sorted(os.listdir(path)):
                fp = os.path.join(path, f)
                is_dir = os.path.isdir(fp)
                items.append({
                    "name": f,
                    "path": fp,
                    "is_dir": is_dir,
                })
            return JSONResponse({"current": path, "parent": parent, "items": items[:150]})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
    return JSONResponse({"current": path, "items": []})


async def endpoint_load_dataset(request: Request) -> JSONResponse:
    """Load a dataset from disk given path and format."""
    try:
        body = await request.json()
        path = body.get("path", "").strip()
        if (path.startswith('"') and path.endswith('"')) or (path.startswith("'") and path.endswith("'")):
            path = path[1:-1].strip()

        fmt = body.get("format")

        if path.lower() == "demo" or (fmt and fmt.lower() == "demo"):
            try:
                from examples.launch_app import create_demo_dataset
                new_ds = create_demo_dataset()
                dataset_manager.set_dataset(new_ds)
                return JSONResponse({
                    "status": "ok",
                    "message": f"Successfully loaded demo dataset '{new_ds.name}' with {len(new_ds)} samples!",
                    "info": dataset_manager.get_info(),
                })
            except Exception as ex:
                return JSONResponse({"status": "error", "message": f"Failed to load demo: {str(ex)}"}, status_code=500)

        if not path:
            # Pre-select available dataset if user clicked without typing
            if os.path.exists(r"D:\data\Wits\coils_v1"):
                path = r"D:\data\Wits\coils_v1"
            elif os.path.exists(r"D:\data\Endplate\plate_04_split"):
                path = r"D:\data\Endplate\plate_04_split"
            else:
                return JSONResponse({"status": "error", "message": "Dataset path is required."}, status_code=400)

        if not os.path.exists(path):
            return JSONResponse({"status": "error", "message": f"Path not found on server: {path}"}, status_code=404)

        if not fmt:
            fmt = detect_format(path)

        new_ds = load(fmt, path)
        dataset_manager.set_dataset(new_ds, path=path)

        return JSONResponse({
            "status": "ok",
            "message": f"Successfully loaded dataset '{new_ds.name}' with {len(new_ds)} samples!",
            "info": dataset_manager.get_info(),
        })
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)


async def endpoint_samples(request: Request) -> JSONResponse:
    page = int(request.query_params.get("page", 1))
    limit = int(request.query_params.get("limit", 30))
    subsets_raw = request.query_params.get("subsets", "")
    subsets = [s.strip() for s in subsets_raw.split(",") if s.strip()]
    tags_raw = request.query_params.get("tags", "")
    tags = [t.strip() for t in tags_raw.split(",") if t.strip()]
    search = request.query_params.get("search", "")
    category = request.query_params.get("category", "")
    min_conf = float(request.query_params.get("min_conf", 0.0))
    sort_by = request.query_params.get("sort_by", "default")
    similar_to = request.query_params.get("similar_to", "")
    filter_issue = request.query_params.get("filter_issue", "")
    layers_raw = request.query_params.get("layers")
    layers = None if layers_raw is None else [m for m in layers_raw.split(",") if m]

    data = dataset_manager.get_samples(
        layers=layers,
        model=request.query_params.get("model", ""),
        cmp=request.query_params.get("cmp", ""),
        cmp_a=request.query_params.get("cmp_a", ""),
        cmp_b=request.query_params.get("cmp_b", ""),
        cm_gt=request.query_params.get("cm_gt", ""),
        cm_pred=request.query_params.get("cm_pred", ""),
        page=page,
        limit=limit,
        subsets=subsets,
        tags=tags,
        search=search,
        category=category,
        min_conf=min_conf,
        sort_by=sort_by,
        similar_to=similar_to,
        filter_issue=filter_issue,
    )
    return JSONResponse(data)


async def endpoint_media(request: Request) -> Response:
    sample_id = request.path_params.get("sample_id", "")
    sample = dataset_manager.get_sample(sample_id)

    if sample and sample.filepath and os.path.exists(sample.filepath):
        if request.query_params.get("thumb"):
            thumb = _thumbnail(sample.filepath)
            if thumb:
                return FileResponse(thumb, media_type="image/jpeg", headers={"Cache-Control": "max-age=3600"})
        mime, _ = mimetypes.guess_type(sample.filepath)
        if (mime or "").endswith(("bmp", "tiff")):
            # browsers can't show TIFF and BMP is huge: serve a full-size JPEG instead
            full = _thumbnail(sample.filepath, max_side=4096)
            if full:
                return FileResponse(full, media_type="image/jpeg")
        return FileResponse(sample.filepath, media_type=mime or "image/jpeg")

    # Generate a realistic rendered photographic scene using Pillow on the fly
    try:
        from io import BytesIO
        from PIL import Image, ImageDraw

        w = 640
        h = 480
        img = Image.new("RGB", (w, h), color=(15, 23, 42))
        draw = ImageDraw.Draw(img)

        # Sky gradient
        draw.rectangle([0, 0, w, int(h * 0.45)], fill=(30, 41, 59))
        # Ground / Asphalt Road
        draw.rectangle([0, int(h * 0.45), w, h], fill=(51, 65, 85))
        # Road lane markings
        for x in range(30, w, 80):
            draw.rectangle([x, int(h * 0.7), x + 40, int(h * 0.7) + 6], fill=(245, 158, 11))

        # Render geometric visual silhouettes for annotations so bounding boxes match actual content
        if sample:
            for ann in sample.annotations:
                if isinstance(ann, BboxAnnotation):
                    abs_box = ann.to_absolute(w, h)
                    bx, by, bw, bh = abs_box.x, abs_box.y, abs_box.w, abs_box.h
                    if ann.label in ("car", "truck"):
                        # Render vehicle silhouette
                        draw.rounded_rectangle([bx + 4, by + 4, bx + bw - 4, by + bh - 4], radius=8, fill=(71, 85, 105), outline=(148, 163, 184))
                        # Wheels
                        draw.ellipse([bx + 10, by + bh - 15, bx + 30, by + bh], fill=(15, 23, 42))
                        draw.ellipse([bx + bw - 30, by + bh - 15, bx + bw - 10, by + bh], fill=(15, 23, 42))
                    elif ann.label in ("pedestrian", "person"):
                        # Person silhouette: head + body
                        cx = bx + bw / 2
                        r = min(bw, bh) * 0.2
                        draw.ellipse([cx - r, by + 4, cx + r, by + 4 + 2 * r], fill=(203, 213, 225))
                        draw.rounded_rectangle([bx + 4, by + 4 + 2 * r, bx + bw - 4, by + bh - 4], radius=4, fill=(100, 116, 139))
                    elif ann.label == "traffic_light":
                        # Traffic light housing
                        draw.rectangle([bx + 4, by + 4, bx + bw - 4, by + bh - 4], fill=(15, 23, 42), outline=(100, 116, 139))
                        draw.ellipse([bx + 8, by + 8, bx + bw - 8, by + bh / 2], fill=(239, 68, 68))
                        draw.ellipse([bx + 8, by + bh / 2 + 4, bx + bw - 8, by + bh - 8], fill=(34, 197, 94))
                    else:
                        draw.rectangle([bx + 2, by + 2, bx + bw - 2, by + bh - 2], fill=(71, 85, 105, 120))

        # Output to JPEG stream
        buf = BytesIO()
        img.save(buf, format="JPEG", quality=85)
        return Response(buf.getvalue(), media_type="image/jpeg")

    except Exception:
        # Fallback SVG
        svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480">
          <rect width="640" height="480" fill="#0f172a"/>
          <text x="320" y="240" fill="#10b981" font-family="sans-serif" font-size="24" text-anchor="middle">🍈 {sample_id}</text>
        </svg>"""
        return Response(svg, media_type="image/svg+xml")


THUMB_DIR = os.path.join(os.path.expanduser("~"), ".guava", "cache", "thumbs")


def _thumbnail(path: str, max_side: int = 480) -> str | None:
    """Disk-cached JPEG thumbnail (keyed by path + mtime) so grids of 4K images stay fast."""
    import hashlib
    try:
        st = os.stat(path)
        key = hashlib.md5(f"{os.path.abspath(path)}|{st.st_mtime}|{max_side}".encode()).hexdigest()
        out = os.path.join(THUMB_DIR, key[:2], key + ".jpg")
        if os.path.exists(out):
            return out
        from PIL import Image, ImageOps
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with Image.open(path) as img:
            img = ImageOps.exif_transpose(img)
            if img.mode not in ("RGB", "L"):
                img = img.convert("RGB")
            img.thumbnail((max_side, max_side))
            img.save(out, "JPEG", quality=85)
        return out
    except Exception:
        return None


async def endpoint_formats(request: Request) -> JSONResponse:
    return JSONResponse(list_formats())


async def endpoint_convert(request: Request) -> JSONResponse:
    try:
        body = await request.json()
        target_fmt = body.get("format", "yolo")
        output_dir = body.get("output_dir", "exported_dataset")
        sample_ids = body.get("sample_ids")

        if dataset_manager.dataset is None:
            return JSONResponse({"status": "error", "message": "No active dataset loaded"}, status_code=400)

        ds_to_export = dataset_manager.dataset
        if sample_ids and len(sample_ids) > 0:
            id_set = set(sample_ids)
            filtered_samples = [s for s in ds_to_export if s.id in id_set]
            ds_to_export = Dataset(name=f"{dataset_manager.dataset.name}_selection", schema=dataset_manager.dataset.schema)
            ds_to_export.add_samples(filtered_samples)

        export(ds_to_export, target_fmt, output_dir, copy_images=False)
        return JSONResponse({
            "status": "ok",
            "message": f"Successfully exported {len(ds_to_export)} samples to '{output_dir}' in '{target_fmt}' format!",
            "exported_count": len(ds_to_export),
        })
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)


async def endpoint_audit(request: Request) -> JSONResponse:
    try:
        if dataset_manager.dataset is not None:
            report = dataset_manager.dataset.audit()
            return JSONResponse(report)
        return JSONResponse({"is_clean": True, "message": "No dataset loaded"})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)


async def endpoint_duplicates(request: Request) -> JSONResponse:
    try:
        if dataset_manager.dataset is not None:
            from guava.brain.duplicates import find_near_duplicates
            threshold = int(request.query_params.get("threshold", 5))
            dups = find_near_duplicates(dataset_manager.dataset, threshold=threshold)
            return JSONResponse({"duplicates": dups, "count": len(dups)})
        return JSONResponse({"duplicates": [], "count": 0})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)


async def endpoint_tag_duplicates(request: Request) -> JSONResponse:
    """Tag all near-duplicate samples in the dataset."""
    try:
        if dataset_manager.dataset is not None:
            from guava.brain.duplicates import find_near_duplicates
            threshold = int(request.query_params.get("threshold", 5))
            dups = find_near_duplicates(dataset_manager.dataset, threshold=threshold)
            tagged_count = 0
            for group in dups:
                # Keep first sample as original, tag remainder as duplicate
                for dup_id in group["sample_ids"][1:]:
                    s = dataset_manager.get_sample(dup_id)
                    if s:
                        s.add_tag("duplicate")
                        tagged_count += 1
            return JSONResponse({"status": "ok", "tagged_count": tagged_count})
        return JSONResponse({"status": "error", "message": "No dataset loaded"}, status_code=400)
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)


async def endpoint_compute_uniqueness(request: Request) -> JSONResponse:
    try:
        if dataset_manager.dataset is not None:
            from guava.brain.similarity import compute_uniqueness
            scores = compute_uniqueness(dataset_manager.dataset)
            return JSONResponse({"status": "ok", "scores_count": len(scores)})
        return JSONResponse({"status": "error", "message": "No dataset loaded"}, status_code=400)
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)


async def endpoint_samples_action(request: Request) -> JSONResponse:
    """Batch action on selected samples: tag, untag, delete."""
    try:
        body = await request.json()
        action = body.get("action")
        sample_ids = body.get("sample_ids", [])
        tag_name = body.get("tag_name", "").strip()

        if not dataset_manager.dataset:
            return JSONResponse({"status": "error", "message": "No dataset loaded"}, status_code=400)

        affected = 0
        if action == "tag" and tag_name:
            for sid in sample_ids:
                s = dataset_manager.get_sample(sid)
                if s:
                    s.add_tag(tag_name)
                    affected += 1

        elif action == "untag" and tag_name:
            for sid in sample_ids:
                s = dataset_manager.get_sample(sid)
                if s:
                    s.remove_tag(tag_name)
                    affected += 1

        elif action == "delete":
            for sid in sample_ids:
                if dataset_manager.delete_sample(sid):
                    affected += 1

        return JSONResponse({"status": "ok", "affected": affected})
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)


async def endpoint_annotation_action(request: Request) -> JSONResponse:
    """Edit or delete an individual annotation on a sample."""
    try:
        body = await request.json()
        sample_id = body.get("sample_id")
        ann_id = body.get("annotation_id")
        action = body.get("action")  # "edit" or "delete"

        sample = dataset_manager.get_sample(sample_id)
        if not sample:
            return JSONResponse({"status": "error", "message": "Sample not found"}, status_code=404)

        target_ann = None
        for a in sample.annotations:
            if a.id == ann_id:
                target_ann = a
                break

        if not target_ann:
            return JSONResponse({"status": "error", "message": "Annotation not found"}, status_code=404)

        is_gt = target_ann.attributes.get("kind") != "prediction"
        if action == "delete":
            sample.annotations.remove(target_ann)
            if is_gt:
                _after_gt_change(sample)
            return JSONResponse({"status": "ok", "message": f"Deleted annotation {ann_id}"})

        elif action == "edit":
            new_label = body.get("label")
            if new_label:
                target_ann.label = new_label
                dataset_manager.dataset.schema.get_or_create(new_label)
                if is_gt:
                    _after_gt_change(sample)
            return JSONResponse({"status": "ok", "message": f"Updated annotation {ann_id}"})

        return JSONResponse({"status": "error", "message": f"Unknown action: {action}"}, status_code=400)
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)


def _after_gt_change(sample: Sample) -> None:
    """Ground truth of `sample` changed: mark it unsaved and refresh its TP/FP/FN for every
    evaluated model (dataset-level metrics stay as they were until the next full evaluation)."""
    from guava.eval import evaluate_detections
    from guava.models import sample_ran
    from guava.server.model_routes import eval_state
    mgr = dataset_manager
    mgr.dirty.add(sample.id)
    if not mgr.evals:
        return
    mgr.eval_stale = True
    for name in list(mgr.evals):
        if sample_ran(sample, name):
            evaluate_detections(mgr.dataset, samples=[sample], model=name, **eval_state)


def _clamp01(v: Any) -> float:
    return min(1.0, max(0.0, float(v)))


async def endpoint_set_ground_truth(request: Request) -> JSONResponse:
    """Replace a sample's box ground truth with the editor's list.

    body: {sample_id, boxes: [{id?, label, bbox: [x, y, w, h] normalized}], model?, min_conf?}
    Non-box ground truth (polygons, classification labels) is kept as it is.
    """
    try:
        body = await request.json()
        mgr = dataset_manager
        sample = mgr.get_sample(body.get("sample_id", ""))
        if sample is None or mgr.dataset is None:
            return JSONResponse({"status": "error", "message": "Sample not found"}, status_code=404)
        old = {a.id: a for a in sample.ground_truth if isinstance(a, BboxAnnotation)}
        new_boxes: list[Annotation] = []
        for b in body.get("boxes", []):
            label = str(b.get("label") or "").strip()
            x, y, w, h = (float(v) for v in b["bbox"])
            x, y = _clamp01(x), _clamp01(y)
            w, h = min(_clamp01(w), 1.0 - x), min(_clamp01(h), 1.0 - y)
            if not label or w <= 0 or h <= 0:
                continue
            prev = old.get(b.get("id") or "")
            ann = BboxAnnotation(label=label, x=x, y=y, w=w, h=h, is_normalized=True)
            if prev is not None:
                ann.id = prev.id
                ann.attributes = {k: v for k, v in prev.attributes.items() if not k.startswith("eval")}
            mgr.dataset.schema.get_or_create(label)
            new_boxes.append(ann)
        kept = [a for a in sample.annotations if not (isinstance(a, BboxAnnotation) and a.id in old)]
        sample.annotations = new_boxes + kept
        _after_gt_change(sample)
        out = serialize_sample(sample, float(body.get("min_conf") or 0.0), model=body.get("model") or None)
        return JSONResponse({"status": "ok", "sample": out, "dirty_count": len(mgr.dirty), "eval_stale": mgr.eval_stale})
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)


def _backup(path: str, root: str, base: str | None) -> None:
    """Copy `path` into the backup folder, keeping its location relative to the dataset folder."""
    if not os.path.exists(path):
        return
    rel = os.path.basename(path)
    if base:
        try:
            r = os.path.relpath(os.path.abspath(path), os.path.abspath(base))
            if not r.startswith(".."):
                rel = r
        except ValueError:  # other drive
            pass
    dest = os.path.join(root, rel)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    shutil.copy2(path, dest)


async def endpoint_save_labels(request: Request) -> JSONResponse:
    """Write edited ground truth back to the YOLO label files it was loaded from.

    Every file that gets overwritten is copied to ~/.guava/backups/<time>/ first.
    """
    import time
    mgr = dataset_manager
    if mgr.dataset is None:
        return JSONResponse({"status": "error", "message": "No dataset loaded"}, status_code=400)
    if not mgr.dirty:
        return JSONResponse({"status": "ok", "written": 0, "message": "Nothing to save"})
    samples = [s for s in (mgr.get_sample(i) for i in sorted(mgr.dirty)) if s is not None]
    no_path = [s.id for s in samples if not s.fields.get("label_path")]
    if no_path:
        return JSONResponse({"status": "error", "message": (
            f"{len(no_path)} edited images were not loaded from YOLO label files, so there is nowhere to write "
            "them back. Use 💾 Save (workspace) or 🔄 Convert & Export instead.")}, status_code=400)

    classes = list(mgr.saved_classes)
    used = sorted({a.label for s in samples for a in s.ground_truth if isinstance(a, BboxAnnotation)})
    new_classes = [c for c in used if c not in classes]
    backup_root = os.path.join(os.path.expanduser("~"), ".guava", "backups", time.strftime("%Y%m%d-%H%M%S"))
    if new_classes:
        classes_txt = os.path.join(mgr.dataset_path or "", "classes.txt") if mgr.dataset_path else ""
        if not classes_txt or not os.path.exists(classes_txt):
            return JSONResponse({"status": "error", "message": (
                f"New classes {', '.join(new_classes)} are not in the dataset's class list. Add them to "
                "data.yaml (names) yourself, reload the dataset, then save again.")}, status_code=400)
        _backup(classes_txt, backup_root, mgr.dataset_path)
        classes += new_classes
        with open(classes_txt, "w", encoding="utf-8") as f:
            f.write("".join(f"{c}\n" for c in classes))
        mgr.saved_classes = classes

    index = {c: i for i, c in enumerate(classes)}
    written = 0
    for s in samples:
        path = s.fields["label_path"]
        _backup(path, backup_root, mgr.dataset_path)
        w, h = s.metadata.width, s.metadata.height
        lines = []
        for a in s.ground_truth:
            if not isinstance(a, BboxAnnotation):
                continue
            b = a if a.is_normalized else a.to_normalized(w, h)
            lines.append(f"{index[a.label]} {b.x + b.w / 2:.6f} {b.y + b.h / 2:.6f} {b.w:.6f} {b.h:.6f}\n")
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.writelines(lines)
        written += 1
    mgr.dirty.clear()
    msg = f"Saved labels of {written} images" + (f" (new classes: {', '.join(new_classes)})" if new_classes else "")
    return JSONResponse({"status": "ok", "written": written, "backup": backup_root, "message": msg})


# ── Starlette Application Setup ───────────────────────────────────────────────

routes = [
    Route("/", endpoint_root),
    Route("/api/info", endpoint_info),
    Route("/api/dataset/info", endpoint_info),
    Route("/api/dataset/load", endpoint_load_dataset, methods=["POST"]),
    Route("/api/dataset/discover", endpoint_discover_datasets),
    Route("/api/browse", endpoint_browse),
    Route("/api/samples", endpoint_samples),
    Route("/api/media/{sample_id}", endpoint_media),
    Route("/api/formats", endpoint_formats),
    Route("/api/convert", endpoint_convert, methods=["POST"]),
    Route("/api/audit", endpoint_audit),
    Route("/api/brain/duplicates", endpoint_duplicates),
    Route("/api/brain/tag_duplicates", endpoint_tag_duplicates, methods=["POST"]),
    Route("/api/brain/compute_uniqueness", endpoint_compute_uniqueness, methods=["POST"]),
    Route("/api/samples/action", endpoint_samples_action, methods=["POST"]),
    Route("/api/annotations/action", endpoint_annotation_action, methods=["POST"]),
    Route("/api/annotations/set", endpoint_set_ground_truth, methods=["POST"]),
    Route("/api/labels/save", endpoint_save_labels, methods=["POST"]),
    *model_routes,
    Mount("/web", StaticFiles(directory=WEB_DIR), name="web"),
]

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )
]

app = Starlette(debug=False, routes=routes, middleware=middleware)
