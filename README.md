# 🍈 Guava

**Guava** is a unified dataset management and visualization platform that combines the best of:

- 🔵 **[Datumaro](https://github.com/open-edge-platform/datumaro)** (Intel) — 50+ format I/O, Rust/C++ core, transforms, validation
- 🟠 **[FiftyOne](https://github.com/voxel51/fiftyone)** (Voxel51) — Visual web app, embeddings, AI curation, integrations

> *"Manage, Transform, Visualize — All in One Pipeline"*

---

## ✨ Key Features

| Feature | Source | Description |
|---|---|---|
| **50+ Dataset Formats** | Datumaro | COCO, YOLO, VOC, CVAT, KITTI, Roboflow, SAM, Cityscapes... |
| **Visual App** | FiftyOne | React-based dataset explorer with Embeddings Panel |
| **Native Performance** | Datumaro | Rust (PyO3) + C++ (pybind11) core for fast I/O |
| **Dataset Transforms** | Datumaro | Filter, merge, split, validate, rename labels |
| **AI Curation** | FiftyOne Brain | Similarity, uniqueness, hardness, near-duplicates |
| **Model Integrations** | FiftyOne | HuggingFace, Ultralytics, SAM3, CLIP, Qwen3-VL |
| **Dual Storage** | Both | MongoDB (enterprise) + Apache Arrow (lightweight) |
| **Annotation Tools** | FiftyOne | Native annotation + CVAT, LabelStudio, Scale, LabelBox |
| **Dataset Zoo** | FiftyOne | 100+ benchmark datasets ready to use |
| **Model Zoo** | FiftyOne | Pretrained models for inference |
| **CLI** | Datumaro | Powerful `guava` CLI for pipeline automation |
| **Plugin System** | FiftyOne | Extensible Operators & Panels |

---

## 🚀 Quick Start

```python
import guava as gv

# Load a dataset (50+ formats supported)
dataset = gv.load("coco", "/path/to/coco/dataset")

# Or load from FiftyOne Zoo
dataset = gv.zoo.load_dataset("quickstart")

# Visualize in the web app
session = gv.launch_app(dataset)

# Transform: filter out images without annotations
filtered = dataset.filter(lambda item: len(item.annotations) > 0)

# Convert to YOLO format
gv.export(filtered, format="yolo", output_dir="/path/to/output")

# AI Curation: find near-duplicates
gv.brain.compute_similarity(dataset, model="clip-vit-base32")

# Run model inference
model = gv.zoo.load_model("yolov8n-coco-torch")
dataset.apply_model(model)
```

---

## 📦 Installation

```bash
# Basic install
pip install guava-cv

# With PyTorch support
pip install "guava-cv[torch]"

# With HuggingFace integration
pip install "guava-cv[huggingface]"

# With all integrations
pip install "guava-cv[all]"
```

### Install from source

```bash
git clone https://github.com/your-org/guava
cd guava
pip install -e ".[dev]"
```

---

## 🖥️ CLI Usage

```bash
# Import dataset
guava import -i /path/to/dataset -f coco

# Convert between formats
guava convert -i coco_dir/ -f yolo -o output/

# Validate dataset
guava validate -i /path/to/dataset -f coco

# Statistics
guava stats -i /path/to/dataset

# Split dataset
guava split -i dataset/ --ratio 0.8:0.1:0.1 -o splits/

# Launch visual app
guava app --dataset /path/to/dataset
```

---

## 📊 Supported Formats

Guava inherits all 50+ formats from Datumaro:

| Format | Tasks | Read | Write |
|---|---|---|---|
| COCO | Detection, Segmentation, Keypoints, Captions | ✅ | ✅ |
| YOLO | Detection, Segmentation, Pose | ✅ | ✅ |
| Pascal VOC | Classification, Detection, Segmentation | ✅ | ✅ |
| CVAT XML | All | ✅ | ✅ |
| LabelMe | Detection, Segmentation | ✅ | ✅ |
| Cityscapes | Segmentation | ✅ | ✅ |
| KITTI | Detection, 3D, Segmentation | ✅ | ✅ |
| ImageNet | Classification | ✅ | ✅ |
| MNIST / CIFAR | Classification | ✅ | ✅ |
| Roboflow | Detection, Segmentation | ✅ | ✅ |
| Segment Anything | Segmentation | ✅ | ✅ |
| Open Images | Detection, Segmentation | ✅ | ✅ |
| LFW | Classification, Re-ID | ✅ | ✅ |
| BraTS (Medical) | Segmentation | ✅ | ✅ |
| AVA | Action Recognition | ✅ | ✅ |
| MPII | Pose Estimation | ✅ | ✅ |
| Tabular | Regression, Classification | ✅ | ✅ |
| ... | *50+ total* | | |

---

## 🧠 Architecture

```
guava/
├── core/           # Unified data model (Dataset, DatasetItem, Annotations)
├── io/             # 50+ format readers & writers
│   └── formats/    # COCO, YOLO, VOC, CVAT, KITTI, Roboflow, ...
├── transforms/     # Filter, merge, split, validate, augment
├── storage/        # Dual backend
│   ├── mongodb/    # FiftyOne-style enterprise storage
│   └── arrow/      # Lightweight local storage
├── app/            # React/TypeScript visual web application
├── server/         # GraphQL + REST API backend
├── brain/          # AI curation (similarity, uniqueness, embeddings)
├── integrations/   # HuggingFace, Ultralytics, SAM, CLIP, ...
├── plugins/        # Extensible Operators & Panels
├── zoo/            # Dataset Zoo + Model Zoo
├── cli/            # Command-line interface
└── rust/           # High-performance Rust native core
```

---

## 🤝 Attribution

Guava is built on top of the outstanding work of:
- **Datumaro** by Intel — [MIT License](https://github.com/open-edge-platform/datumaro/blob/develop/LICENSE)
- **FiftyOne** by Voxel51 — [Apache 2.0 License](https://github.com/voxel51/fiftyone/blob/main/LICENSE)

See [NOTICE](./NOTICE) for full attribution details.

---

## 📝 License

Guava is licensed under the **Apache License 2.0**. See [LICENSE](./LICENSE) for details.
