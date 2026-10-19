"""
🍈 Guava Quickstart Example
Chạy lệnh: python examples/quickstart.py
"""
import os
import sys

# Đảm bảo in UTF-8 trên Windows console
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

import guava as gv
from guava.core.annotation import BboxAnnotation
from guava.core.sample import ImageMetadata, Sample

print("🍈 Guava — Unified Dataset Management & AI Visual Platform")
print("=" * 65)
print(f"Guava version: {gv.__version__}")

# ── 1. Show supported formats ──────────────────────────────────────────────
print("\n1️⃣  Supported dataset formats:")
formats = gv.list_formats()
print(f"   Total formats & aliases: {len(formats)}")
print(f"   Key formats: {', '.join(sorted(formats)[:15])}...")

# ── 2. Create a Native Guava Dataset ───────────────────────────────────────
print("\n2️⃣  Building a Native Guava Dataset...")
demo_ds = gv.Dataset(name="guava_quickstart_dataset")

categories = ["pedestrian", "car", "bicycle", "motorcycle", "traffic_sign"]
for i in range(1, 51):
    subset = "train" if i <= 35 else ("val" if i <= 45 else "test")
    sample = Sample(
        id=f"sample_{i:03d}",
        filepath=f"images/img_{i:03d}.jpg",
        subset=subset,
        metadata=ImageMetadata(width=1280, height=720),
    )
    sample.add_tag(subset)
    if i % 3 == 0:
        sample.add_tag("annotated_verified")

    # Add 1 to 3 bounding boxes
    num_boxes = 1 + (i % 3)
    for j in range(num_boxes):
        label = categories[(i + j) % len(categories)]
        sample.add_annotation(BboxAnnotation(
            id=f"box_{i}_{j}",
            label=label,
            x=50 + (i * 13 + j * 47) % 800,
            y=60 + (i * 19 + j * 31) % 400,
            w=120 + (i * 7) % 200,
            h=90 + (i * 11) % 150,
            confidence=round(0.80 + ((i + j) % 20) * 0.01, 2),
            is_normalized=False,
        ))

    demo_ds.add_sample(sample)

print(f"   ✅ Created: {demo_ds}")

# ── 3. Dataset statistics ──────────────────────────────────────────────────
print("\n3️⃣  Dataset statistics:")
stats = demo_ds.stats()
print(f"   Total Samples:     {stats['sample_count']}")
print(f"   Total Annotations: {stats['annotation_count']}")
print(f"   Subsets:           {stats['subset_distribution']}")
print(f"   Top Categories:    {dict(list(stats['category_distribution'].items())[:4])}")

# ── 4. Dataset Quality Audit & Validation ──────────────────────────────────
print("\n4️⃣  Quality Audit & Health Validation:")
audit_report = demo_ds.audit()
print(f"   Total annotations checked: {audit_report['total_annotations']}")
print(f"   Degenerate bboxes (w,h<=0): {audit_report['degenerate_bboxes_count']}")
print(f"   Unannotated samples:       {audit_report['unannotated_samples_count']}")
print(f"   Audit status:              {'✅ CLEAN' if audit_report['is_clean'] else '⚠️ ISSUES DETECTED'}")

# ── 5. Filtering dataset ───────────────────────────────────────────────────
print("\n5️⃣  Filtering dataset:")
filtered = demo_ds.filter(lambda s: len(s.annotations) >= 2)
print(f"   Original dataset:          {len(demo_ds)} samples")
print(f"   Filtered (>= 2 annotations): {len(filtered)} samples")

# ── 6. Splitting dataset ───────────────────────────────────────────────────
print("\n6️⃣  Splitting dataset:")
splits = gv.split_dataset(demo_ds, splits={"train": 0.7, "val": 0.15, "test": 0.15})
for name, split_ds in splits.items():
    print(f"   Split '{name}': {len(split_ds)} samples")

# ── 7. Format conversion demonstration ─────────────────────────────────────
print("\n7️⃣  Native 1-Line Format Conversion:")
print("   # Convert to COCO JSON format")
print("   gv.export(demo_ds, 'coco', 'output/coco/annotations.json')")
print("   # Convert to YOLO Ultralytics format")
print("   gv.export(demo_ds, 'yolo', 'output/yolo/')")
print("   # Convert to Pascal VOC XML format")
print("   gv.export(demo_ds, 'voc', 'output/voc/')")

# ── 8. AI Curation via Guava Brain ─────────────────────────────────────────
print("\n8️⃣  AI Curation via Guava Brain:")
print("   - Calculating uniqueness scores...")
uniqueness = gv.brain.compute_uniqueness(demo_ds)
print(f"     Computed uniqueness for {len(uniqueness)} samples (sample_001 score: {uniqueness.get('sample_001')})")

print("   - Detecting near-duplicate images...")
dupes = gv.brain.find_near_duplicates(demo_ds, threshold=5)
print(f"     Found {len(dupes)} duplicate clusters.")

# ── 9. Visual Web App ──────────────────────────────────────────────────────
print("\n9️⃣  Launch the Guava Visual Studio:")
print("   session = gv.launch_app(demo_ds, port=5151)")
print("   # Opens browser at http://127.0.0.1:5151")

if "--app" in sys.argv or "-a" in sys.argv:
    print("\n🚀 Đang mở giao diện Guava Visual Studio trên trình duyệt...")
    session = gv.launch_app(demo_ds, port=5151, auto=True)
    try:
        session.wait()
    except KeyboardInterrupt:
        print("\n🛑 Đã tắt Web App.")
else:
    print("\n💡 Mẹo: Để mở giao diện Web App ngay trên trình duyệt, chạy:")
    print("   python examples/launch_app.py")
    print("   hoặc: python examples/quickstart.py --app")

print("\n" + "=" * 65)
print("✅  Guava engine is 100% operational!")
print("=" * 65)
