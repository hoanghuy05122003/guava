# 🍈 Guava — Unified Dataset Management & AI Visual Studio

**Guava** is an independent, high-performance Computer Vision dataset management and visual analytics platform. It was architected from the ground up to synthesize the best conceptual capabilities in Computer Vision dataset engineering into a unified, lightweight Python engine:

- 🔄 **Universal Dataset Operations & Converters**: Native 1-line bidirectional conversions between **COCO**, **YOLO**, **Pascal VOC**, and **ImageFolder** without heavy external binaries.
- 🎯 **Sample-First Data Model**: Rich `Sample` model supporting Ground Truth vs. Model Predictions, Bounding Boxes, Polygons, Keypoints, Tags, and Custom Metadata.
- 📊 **Quality Validation & Health Audit**: Automatic detection of degenerate bboxes ($w \le 0, h \le 0$), out-of-bounds annotations, missing image files on disk, and class imbalance.
- 🧠 **Guava Brain AI Curation**: Zero-dependency perceptual image hashing (dHash/aHash), near-duplicate detection, and visual uniqueness scoring.
- 🌐 **Guava Studio Visual Web App**: 100% native ASGI web application with a dark-mode interactive UI, HTML5 Canvas annotation overlays, zoom/pan lightbox inspector, multi-facet filtering, and 1-click export modals.

---

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/your-org/guava
cd guava

# Install in editable mode
pip install -e .
```

### 2. Python SDK

```python
import guava as gv
from guava.core.annotation import BboxAnnotation
from guava.core.sample import Sample, ImageMetadata

# 1. Load any dataset
dataset = gv.load("coco", "path/to/annotations.json")
# Or create natively:
# dataset = gv.Dataset(name="my_dataset")

# 2. Inspect stats and run quality audit
stats = dataset.stats()
print(f"Total samples: {stats['sample_count']}, annotations: {stats['annotation_count']}")

audit = dataset.audit()
print(f"Dataset clean status: {audit['is_clean']}")

# 3. Filter and split
filtered = dataset.filter(lambda s: len(s.annotations) > 0)
splits = gv.split_dataset(dataset, splits={"train": 0.8, "val": 0.1, "test": 0.1})

# 4. Bidirectional format conversion (COCO -> YOLO, VOC, etc.)
gv.export(dataset, format="yolo", output_dir="output/yolo_dataset")
gv.export(dataset, format="voc", output_dir="output/voc_dataset")

# 5. AI Curation via Guava Brain
duplicates = gv.brain.find_near_duplicates(dataset, threshold=5)
uniqueness = gv.brain.compute_uniqueness(dataset)

# 6. Launch Guava Studio Visual Web App
session = gv.launch_app(dataset, port=5151)
session.wait()
```

---

## 🌐 Guava Studio Visual Web App

Launch the interactive studio from terminal:

```bash
# Launch with built-in interactive demo dataset
python examples/launch_app.py

# Or launch directly with any dataset on disk
python examples/launch_app.py --format coco --path D:/datasets/coco/annotations.json
python examples/launch_app.py --format yolo --path D:/datasets/yolo/
```

### Studio Features:
- 🖼️ **Responsive Thumbnail Grid**: Dynamic card grid with customizable sizes.
- 🎨 **HTML5 Canvas Overlays**: Bounding boxes rendered in real-time with per-category neon color swatches, labels, and confidence tags.
- 🔍 **Lightbox Inspector**: High-resolution zoom & pan, coordinate inspector, tag editor, and metadata breakdown.
- ⚡ **Multi-Facet Filtering**: Real-time category checklist, subset selectors (`train`, `val`, `test`), confidence threshold slider, and ID/tag search.
- 🔄 **1-Click Exporter Modal**: Live export to COCO, YOLO, Pascal VOC, or ImageFolder with real-time feedback.
- 📊 **Quality Health Check Modal**: Instant pass/fail audit for missing media and invalid bounding boxes.
- 🧠 **Brain AI Curation Modal**: Live scan for near-duplicate image clusters.

---

## 🤖 Offline Model Check (no internet, no MongoDB)

Run your own local weights on a dataset, compare against ground truth and jump straight to the mistakes.

```bash
# Desktop-style window (Edge/Chrome --app mode, or pywebview if installed)
guava studio D:/data/my_yolo_dataset --model D:/models/best.pt

# Headless: predict + metrics in the terminal, optionally open the results
guava predict D:/data/my_yolo_dataset --model D:/models/best.pt --conf 0.25 --save run1 --view
```

```python
import guava as gv
ds = gv.load("yolo", "D:/data/my_yolo_dataset")
model = gv.load_model("D:/models/best.pt")                       # .pt / .onnx / .engine via Ultralytics
# model = gv.load_model("best.onnx", backend="onnxruntime")      # pure ONNX Runtime, no torch
gv.apply_model(ds, model, gv.InferenceConfig(conf=0.25))
report = gv.evaluate(ds, iou=0.5)                                # mAP50, mAP50-95, P/R/F1, confusion matrix
ds.save("run1.guava.json")                                       # reopen later via Load Dataset
```

In the app:
- **🤖 Run Model** — pick weights found on disk (scans `~/.guava/models`, `D:/models`, `D:/data`, plus `GUAVA_MODEL_DIRS`), set conf/IoU/imgsz/device, run on all / filtered / selected images as a background job with progress.
- **📈 Evaluate** — COCO-style metrics per class; click a confusion-matrix cell or a class row to see exactly those images. Boxes are colored TP (green) / FP (red) / FN (rose).
- **⚡ Quick Check** — drag & drop images anywhere in the window; they are copied to `~/.guava/quick/` and run through the current model.
- **💾 Save** — persist dataset + predictions + tags + eval to a `.guava.json` workspace.
- Sidebar **Model Results** filters (errors / FP / FN / no prediction) and sorts (most errors, least confident).

---

## 🖥️ Guava CLI

```bash
# Launch visual studio
guava view /path/to/dataset --format coco

# Print dataset statistics
guava stats /path/to/dataset

# Run health audit
guava audit /path/to/dataset

# Convert between formats
guava convert /input/coco.json /output/yolo/ --from-format coco --to-format yolo
```

---

## 🧪 Testing

Run the full native test suite:

```bash
python -m pytest tests/unit/
```

All 22 unit tests pass in sub-second time.
