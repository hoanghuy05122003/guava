"""
Guava Quickstart Example

This script demonstrates the core capabilities of Guava:
  1. Loading datasets (50+ formats via Datumaro)
  2. Dataset statistics and info
  3. Filtering and splitting
  4. Format conversion
  5. AI curation via FiftyOne Brain
  6. Visual exploration via FiftyOne App
"""
import sys

# Ensure UTF-8 console encoding on Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

import guava as gv

print("🍈 Guava — Unified Dataset Management & Visualization Platform")
print("=" * 65)
print(f"Guava version: {gv.__version__}")

# ── 1. Show supported formats ──────────────────────────────────────────────
print("\n1️⃣  Supported dataset formats:")
formats = gv.io.list_formats()
print(f"   Total formats: {len(formats)}")
print(f"   Sample formats: {', '.join(sorted(formats)[:15])}...")

# ── 2. Load a dataset (COCO example) ──────────────────────────────────────
print("\n2️⃣  Loading a COCO dataset...")
print("   ds = gv.load('coco', '/path/to/coco')")
print("   (Skipping actual load — no dataset path provided)")

# Create a demo dataset for illustration
from unittest.mock import MagicMock

demo_ds = gv.Dataset(name="demo_dataset")
demo_ds._format = "coco"
# Simulate items
demo_ds._items = [MagicMock(
    id=str(i),
    subset="train" if i < 80 else ("val" if i < 90 else "test"),
    annotations=[MagicMock(), MagicMock()] if i % 3 != 0 else [],
) for i in range(100)]
print(f"   Created demo dataset: {demo_ds}")

# ── 3. Dataset statistics ──────────────────────────────────────────────────
print("\n3️⃣  Dataset statistics:")
stats = demo_ds.stats()
print(f"   Items:            {stats['item_count']}")
print(f"   Annotations:      {stats['annotation_count']}")
print(f"   Subsets:          {stats['subset_distribution']}")

# ── 4. Filter the dataset ──────────────────────────────────────────────────
print("\n4️⃣  Filtering dataset...")
filtered = demo_ds.filter(lambda item: len(item.annotations) > 0)
print(f"   Original: {len(demo_ds)} items")
print(f"   Filtered (has annotations): {len(filtered)} items")

# ── 5. Split dataset ──────────────────────────────────────────────────────
print("\n5️⃣  Splitting dataset...")
splits = gv.transforms.split_dataset(demo_ds, splits={"train": 0.8, "val": 0.1, "test": 0.1})
for name, split_ds in splits.items():
    print(f"   {name}: {len(split_ds)} items")

# ── 6. Format conversion (conceptual) ────────────────────────────────────
print("\n6️⃣  Format conversion example:")
print("   # Convert COCO → YOLO")
print("   gv.export(ds, 'yolo', '/output/yolo')")
print()
print("   # Convert COCO → Pascal VOC")
print("   gv.export(ds, 'voc', '/output/voc', save_media=True)")
print()
print("   # Convert CVAT → COCO")
print("   gv.export(gv.load('cvat', '/cvat_dir'), 'coco', '/output/coco')")

# ── 7. AI Curation (conceptual) ──────────────────────────────────────────
print("\n7️⃣  AI Curation with FiftyOne Brain:")
print("   # Compute visual similarity (CLIP embeddings)")
print("   gv.brain.compute_similarity(ds, model='clip-vit-base32')")
print()
print("   # Find near-duplicates")
print("   dupes = gv.brain.find_near_duplicates(ds, threshold=0.05)")
print()
print("   # Score uniqueness")
print("   gv.brain.compute_uniqueness(ds)")
print()
print("   # Visualize embeddings in 2D (UMAP)")
print("   gv.brain.visualize_embeddings(ds, method='umap')")

# ── 8. Visual App ────────────────────────────────────────────────────────
print("\n8️⃣  Launch the visual App:")
print("   session = gv.launch_app(ds)")
print("   # Opens browser at http://localhost:5151")
print("   # Features: Sample Grid, Embeddings Panel, Filtering, Tagging")

print("\n" + "=" * 65)
print("✅  Guava is ready to use!")
print("📚 Full docs: https://github.com/your-org/guava")
print("=" * 65)
