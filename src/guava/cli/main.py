"""
Guava Command Line Interface (CLI).
"""
from __future__ import annotations

import argparse
import sys

from guava.core.dataset import Dataset
from guava.io.api import detect_format, export, load
from guava.version import __version__


def main() -> None:
    # pythonw.exe (desktop shortcut) has no console: stdout/stderr are None and the
    # server's logging would fail and silently stop it.
    if sys.stdout is None or sys.stderr is None:
        import os
        devnull = open(os.devnull, "w", encoding="utf-8")
        sys.stdout = sys.stdout or devnull
        sys.stderr = sys.stderr or devnull
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")

    parser = argparse.ArgumentParser(
        prog="guava",
        description="Guava — Unified Dataset Management & AI Visual Studio",
    )
    parser.add_argument("--version", "-v", action="version", version=f"Guava {__version__}")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Command: view
    view_parser = subparsers.add_parser("view", help="Launch Guava Web App to visualize a dataset")
    view_parser.add_argument("path", nargs="?", default=None, help="Path to dataset")
    view_parser.add_argument("--format", "-f", default=None, help="Dataset format (coco, yolo, voc, etc.)")
    view_parser.add_argument("--port", "-p", type=int, default=5151, help="Web port (default: 5151)")
    view_parser.add_argument("--lan", action="store_true", help="Also accept connections from other machines on the network")

    # Command: studio (offline desktop app)
    studio_parser = subparsers.add_parser("studio", help="Open Guava Studio as an offline desktop app window")
    studio_parser.add_argument("path", nargs="?", default=None, help="Dataset path (optional)")
    studio_parser.add_argument("--format", "-f", default=None, help="Dataset format")
    studio_parser.add_argument("--model", "-m", default=None, help="Preselect a local model (.pt/.onnx/.engine)")
    studio_parser.add_argument("--port", "-p", type=int, default=5151, help="Port (default: 5151)")
    studio_parser.add_argument("--browser", action="store_true", help="Open in a normal browser tab instead")
    studio_parser.add_argument("--lan", action="store_true", help="Also accept connections from other machines on the network")

    # Command: predict (headless model check)
    pred_parser = subparsers.add_parser("predict", help="Run a local model on a dataset and print metrics")
    pred_parser.add_argument("path", help="Dataset path (or image folder)")
    pred_parser.add_argument("--model", "-m", required=True, help="Model weights (.pt/.onnx/.engine)")
    pred_parser.add_argument("--format", "-f", default=None, help="Dataset format")
    pred_parser.add_argument("--conf", type=float, default=0.25)
    pred_parser.add_argument("--iou", type=float, default=0.45, help="NMS IoU")
    pred_parser.add_argument("--match-iou", type=float, default=0.5, help="IoU to match predictions to GT")
    pred_parser.add_argument("--imgsz", type=int, default=None)
    pred_parser.add_argument("--device", default=None, help="cpu, 0, cuda:0 ... (default auto)")
    pred_parser.add_argument("--backend", default="auto", choices=["auto", "ultralytics", "onnxruntime"])
    pred_parser.add_argument("--save", default=None, help="Save dataset+predictions to a .guava.json workspace")
    pred_parser.add_argument("--view", action="store_true", help="Open the results in Guava Studio afterwards")

    # Command: stats
    stats_parser = subparsers.add_parser("stats", help="Print dataset statistics")
    stats_parser.add_argument("path", help="Path to dataset")
    stats_parser.add_argument("--format", "-f", default=None, help="Dataset format")

    # Command: audit
    audit_parser = subparsers.add_parser("audit", help="Audit dataset quality and health")
    audit_parser.add_argument("path", help="Path to dataset")
    audit_parser.add_argument("--format", "-f", default=None, help="Dataset format")

    # Command: convert
    conv_parser = subparsers.add_parser("convert", help="Convert dataset between formats")
    conv_parser.add_argument("input_path", help="Input dataset path")
    conv_parser.add_argument("output_path", help="Output dataset path")
    conv_parser.add_argument("--from-format", "-i", default=None, help="Source format")
    conv_parser.add_argument("--to-format", "-o", required=True, help="Target format (coco, yolo, voc)")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(0)

    if args.command == "view":
        from guava.app.api import launch_app
        ds = None
        if args.path:
            fmt = args.format or detect_format(args.path)
            print(f"📥 Loading dataset '{args.path}' (format: {fmt})...")
            ds = load(fmt, args.path)
        session = launch_app(dataset=ds, port=args.port, address=_bind_address(args), auto=True)
        print(f"🍈 Guava Studio running at: {session.url}")
        _print_lan(session)
        print("Press Ctrl+C to stop.")
        try:
            session.wait()
        except KeyboardInterrupt:
            print("\nShutting down Guava Studio...")

    elif args.command == "studio":
        _run_studio(args)

    elif args.command == "predict":
        _run_predict(args)

    elif args.command == "stats":
        fmt = args.format or detect_format(args.path)
        ds = load(fmt, args.path)
        import pprint
        pprint.pprint(ds.stats())

    elif args.command == "audit":
        fmt = args.format or detect_format(args.path)
        ds = load(fmt, args.path)
        import pprint
        pprint.pprint(ds.audit())

    elif args.command == "convert":
        in_fmt = args.from_format or detect_format(args.input_path)
        print(f"Converting from {in_fmt} to {args.to_format}...")
        ds = load(in_fmt, args.input_path)
        export(ds, args.to_format, args.output_path)
        print(f"✅ Exported {len(ds)} samples to {args.output_path}")


def _bind_address(args: argparse.Namespace) -> str:
    return "0.0.0.0" if args.lan else "127.0.0.1"


def _print_lan(session) -> None:
    for url in session.lan_urls():
        print(f"🌐 LAN access: {url}")


def _load_any(path: str, fmt: str | None) -> Dataset:
    fmt = fmt or detect_format(path)
    print(f"📥 Loading '{path}' (format: {fmt})...")
    return load(fmt, path)


def _run_studio(args: argparse.Namespace) -> None:
    from guava.app.api import launch_app
    from guava.server.desktop import has_webview, run_webview
    from guava.server.model_routes import model_state

    ds = _load_any(args.path, args.format) if args.path else None
    if ds is not None:
        from guava.server.app import dataset_manager
        dataset_manager.set_dataset(ds, path=args.path)
    if args.model:
        model_state["path"] = args.model

    use_webview = not args.browser and has_webview()
    session = launch_app(dataset=None, port=args.port, address=_bind_address(args),
                         auto=not use_webview, desktop=not args.browser)
    print(f"🍈 Guava Studio running at: {session.url}  (offline, Ctrl+C to stop)")
    _print_lan(session)
    if use_webview:
        lan = session.lan_urls()
        # no console under the desktop shortcut, so show the LAN address in the title bar
        run_webview(session.url, title=f"Guava Studio — LAN: {lan[0]}" if lan else "Guava Studio")
        session.close()
        return
    try:
        session.wait()
    except KeyboardInterrupt:
        print("\nShutting down Guava Studio...")


def _run_predict(args: argparse.Namespace) -> None:
    import time

    from guava.eval import evaluate
    from guava.models import InferenceConfig, apply_model, load_model

    ds = _load_any(args.path, args.format)
    model = load_model(args.model, backend=args.backend, device=args.device)
    print(f"🤖 {model.name} [{model.backend}, task={model.task}] classes={model.class_names[:10]}")
    cfg = InferenceConfig(conf=args.conf, iou=args.iou, imgsz=args.imgsz, device=args.device)
    t0 = time.time()

    def progress(done: int, total: int) -> None:
        print(f"\r   {done}/{total} images", end="", flush=True)

    summary = apply_model(ds, model, cfg, progress=progress)
    print(f"\n✅ {summary['detections']} detections on {summary['processed']} images, "
          f"{summary['avg_ms']} ms/img, total {time.time() - t0:.1f}s")
    run_name = str(summary["model_name"])

    if any(s.ground_truth for s in ds):
        rep = evaluate(ds, iou=args.match_iou, model=run_name)
        o = rep["overall"]
        if rep["type"] == "classification":
            print(f"📈 accuracy={o['accuracy']}  ({o['correct']}/{o['total']})")
        else:
            print(f"📈 mAP50={o['mAP50']}  mAP50-95={o['mAP50_95']}  P={o['precision']}  R={o['recall']}  "
                  f"TP={o['tp']} FP={o['fp']} FN={o['fn']}")
            print(f"   {'class':<20}{'GT':>6}{'TP':>6}{'FP':>6}{'FN':>6}{'P':>8}{'R':>8}{'AP50':>8}")
            for c in rep["classes"]:
                ap = "-" if c["ap50"] is None else f"{c['ap50']:.3f}"
                print(f"   {c['label'][:20]:<20}{c['support']:>6}{c['tp']:>6}{c['fp']:>6}{c['fn']:>6}"
                      f"{c['precision']:>8.3f}{c['recall']:>8.3f}{ap:>8}")
            bad = sorted(ds, key=lambda s: -(s.fields.get("eval_fp", 0) + s.fields.get("eval_fn", 0)))[:5]
            bad = [s for s in bad if s.fields.get("eval_fp", 0) + s.fields.get("eval_fn", 0)]
            if bad:
                print("   worst images:", ", ".join(f"{s.id} (FP{s.fields['eval_fp']}/FN{s.fields['eval_fn']})" for s in bad))

    if args.save:
        out = args.save if args.save.endswith(".guava.json") else args.save + ".guava.json"
        ds.save(out)
        print(f"💾 Saved workspace: {out}")

    if args.view:
        from guava.app.api import launch_app
        from guava.server.app import dataset_manager
        from guava.server.model_routes import model_state
        dataset_manager.set_dataset(ds, path=args.path)
        if any(s.ground_truth for s in ds):
            dataset_manager.last_eval = evaluate(ds, iou=args.match_iou, model=run_name)
            dataset_manager.evals[run_name] = dataset_manager.last_eval
        model_state.update({"path": args.model, "conf": args.conf, "iou": args.iou})
        session = launch_app(port=5151, auto=True, desktop=True)
        print(f"🍈 Guava Studio: {session.url}")
        session.wait()


if __name__ == "__main__":
    main()
