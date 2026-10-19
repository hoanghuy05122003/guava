"""
Guava Native Visual Studio Launcher
Chạy lệnh: python examples/launch_app.py
"""
import argparse
import os
import sys

# Đảm bảo in UTF-8 trên Windows console
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

from PIL import Image, ImageDraw

import guava as gv
from guava.core.annotation import BboxAnnotation
from guava.core.sample import ImageMetadata, Sample


def generate_scene_image(filepath: str, width: int, height: int, bboxes: list[dict]) -> None:
    """Tạo một file ảnh mô phỏng cảnh đường phố thực tế cho mỗi sample."""
    os.makedirs(os.path.dirname(os.path.abspath(filepath)), exist_ok=True)
    img = Image.new("RGB", (width, height), color=(15, 23, 42))
    draw = ImageDraw.Draw(img)

    # 1. Bầu trời với tông màu hoàng hôn / bình minh đẹp
    sky_h = int(height * 0.45)
    for y in range(sky_h):
        r = int(18 + (y / sky_h) * 25)
        g = int(24 + (y / sky_h) * 35)
        b = int(45 + (y / sky_h) * 45)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Mặt trời / vầng trăng nhẹ
    draw.ellipse([int(width * 0.75), 40, int(width * 0.75) + 60, 100], fill=(254, 240, 138, 200))

    # 2. Toà nhà phía xa (Skyline)
    for bx in range(0, width, 55):
        bh = 60 + ((bx * 31) % 90)
        draw.rectangle([bx, sky_h - bh, bx + 50, sky_h], fill=(30, 41, 59))
        # Cửa sổ toà nhà
        for wy in range(sky_h - bh + 10, sky_h - 10, 15):
            for wx in range(bx + 8, bx + 42, 12):
                draw.rectangle([wx, wy, wx + 6, wy + 8], fill=(253, 224, 71, 150))

    # 3. Mặt đường Asphalt
    draw.rectangle([0, sky_h, width, height], fill=(51, 65, 85))

    # Vỉa hè
    draw.rectangle([0, sky_h, width, sky_h + 20], fill=(100, 116, 139))
    for x in range(0, width, 30):
        draw.line([(x, sky_h), (x, sky_h + 20)], fill=(71, 85, 105), width=2)

    # Vạch kẻ đường trung tâm
    for x in range(20, width, 80):
        draw.rectangle([x, int(height * 0.72), x + 45, int(height * 0.72) + 8], fill=(245, 158, 11))

    # 4. Vẽ các vật thể tương ứng với Bounding Boxes
    for b in bboxes:
        bx, by, bw, bh = b["x"], b["y"], b["w"], b["h"]
        label = b["label"]

        if label in ("car", "truck"):
            car_color = (225, 29, 72) if label == "car" else (37, 99, 235)
            # Thân xe
            draw.rounded_rectangle([bx + 4, by + int(bh * 0.35), bx + bw - 4, by + bh - 6], radius=6, fill=car_color)
            # Nóc kính xe
            draw.rounded_rectangle([bx + int(bw * 0.2), by + 4, bx + int(bw * 0.8), by + int(bh * 0.45)], radius=4, fill=(203, 213, 225))
            # Bánh xe
            draw.ellipse([bx + 8, by + bh - 14, bx + 26, by + bh], fill=(15, 23, 42))
            draw.ellipse([bx + bw - 26, by + bh - 14, bx + bw - 8, by + bh], fill=(15, 23, 42))

        elif label in ("pedestrian", "person"):
            # Đầu
            cx = bx + bw / 2
            head_r = min(bw, bh) * 0.18
            draw.ellipse([cx - head_r, by + 4, cx + head_r, by + 4 + 2 * head_r], fill=(254, 215, 170))
            # Thân
            draw.rounded_rectangle([bx + 4, by + 4 + int(2 * head_r), bx + bw - 4, by + bh - 6], radius=4, fill=(16, 185, 129))

        elif label == "traffic_light":
            draw.rectangle([bx + 6, by + 4, bx + bw - 6, by + bh - 4], fill=(15, 23, 42), outline=(148, 163, 184))
            draw.ellipse([bx + 9, by + 8, bx + bw - 9, by + int(bh * 0.45)], fill=(239, 68, 68))
            draw.ellipse([bx + 9, by + int(bh * 0.52), bx + bw - 9, by + bh - 8], fill=(34, 197, 94))

        elif label == "bicycle":
            # 2 Bánh xe
            draw.ellipse([bx + 6, by + bh - 24, bx + 26, by + bh - 4], outline=(203, 213, 225), width=2)
            draw.ellipse([bx + bw - 26, by + bh - 24, bx + bw - 6, by + bh - 4], outline=(203, 213, 225), width=2)
            # Khung
            draw.line([(bx + 16, by + bh - 14), (bx + bw - 16, by + bh - 14)], fill=(245, 158, 11), width=2)
            draw.line([(bx + 16, by + bh - 14), (bx + int(bw * 0.6), by + 10)], fill=(245, 158, 11), width=2)

    img.save(filepath, format="JPEG", quality=88)


def create_demo_dataset() -> gv.Dataset:
    """Tạo một dataset mẫu hoàn chỉnh có ảnh JPEG thật và nhãn phong phú."""
    cache_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".cache", "demo_images"))
    os.makedirs(cache_dir, exist_ok=True)

    ds = gv.Dataset(name="guava_demo_dataset")
    categories = ["car", "pedestrian", "traffic_light", "bicycle", "truck"]

    subsets = ["train", "train", "val", "test"]
    for i in range(1, 25):
        subset = subsets[i % len(subsets)]
        img_path = os.path.join(cache_dir, f"scene_{i:03d}.jpg")
        w, h = 640, 480

        sample = Sample(
            id=f"scene_{i:03d}",
            filepath=img_path,
            subset=subset,
            metadata=ImageMetadata(width=w, height=h),
        )
        sample.add_tag(subset)
        if i % 2 == 0:
            sample.add_tag("verified")
        if i % 4 == 0:
            sample.add_tag("high_priority")

        # Ground Truth annotations
        num_gt = 1 + (i % 3)
        boxes_info = []
        for j in range(num_gt):
            label = categories[(i + j) % len(categories)]
            bw = 85 + ((i * 19 + j * 23) % 130)
            bh = 65 + ((i * 17 + j * 31) % 110)
            bx = 30 + ((i * 37 + j * 71) % (w - bw - 60))
            by = int(h * 0.45) + ((i * 29 + j * 47) % (int(h * 0.5) - bh))
            conf = round(0.78 + ((i + j) % 22) * 0.01, 2)

            sample.add_annotation(BboxAnnotation(
                id=f"gt_{i}_{j}",
                label=label,
                x=bx,
                y=by,
                w=bw,
                h=bh,
                confidence=conf,
                is_normalized=False,
            ))
            boxes_info.append({"x": bx, "y": by, "w": bw, "h": bh, "label": label})

        # Prediction annotations
        if i % 2 == 1:
            pred_label = categories[(i) % len(categories)]
            sample.add_annotation(BboxAnnotation(
                id=f"pred_{i}_0",
                label=pred_label,
                x=boxes_info[0]["x"] + 8,
                y=boxes_info[0]["y"] + 6,
                w=boxes_info[0]["w"] - 4,
                h=boxes_info[0]["h"] - 4,
                confidence=0.89,
                is_normalized=False,
                attributes={"kind": "prediction"},
            ))

        # Tạo file ảnh thực tế trên đĩa
        generate_scene_image(img_path, w, h, boxes_info)

        ds.add_sample(sample)

    return ds


def main():
    parser = argparse.ArgumentParser(description="🍈 Guava Visual Web App Launcher")
    parser.add_argument("--format", "-f", type=str, default=None, help="Định dạng dữ liệu (coco, yolo, voc...)")
    parser.add_argument("--path", "-p", type=str, default=None, help="Đường dẫn file hoặc thư mục dataset")
    parser.add_argument("--port", type=int, default=5151, help="Cổng Web Server (mặc định: 5151)")
    parser.add_argument("--demo", action="store_true", help="Buộc sử dụng demo dataset thay vì tự động tìm dataset trên đĩa")
    args = parser.parse_args()

    print("=" * 65)
    print("🍈 Đang khởi động Guava Visual Studio (100% Native Web App)...")
    print("=" * 65)

    dataset = None

    if args.format and args.path:
        print(f"📥 Đang tải dataset định dạng '{args.format}' từ: {args.path}...")
        dataset = gv.load(args.format, args.path)
        print(f"✅ Đã tải thành công dataset: {dataset.name} ({len(dataset)} mẫu)")
    elif args.path:
        fmt = gv.detect_format(args.path)
        print(f"🔍 Tự động nhận diện định dạng '{fmt}' từ: {args.path}...")
        dataset = gv.load(fmt, args.path)
        print(f"✅ Đã tải thành công dataset: {dataset.name} ({len(dataset)} mẫu)")
    elif not args.demo and os.path.exists(r"D:\data\Wits\coils_v1"):
        real_path = r"D:\data\Wits\coils_v1"
        print(f"🎯 Tự động phát hiện tập dữ liệu thực tế trên máy: {real_path}")
        dataset = gv.load("yolo", real_path)
        cat_names = [c.name for c in dataset.schema.categories]
        print(f"✅ Đã tải thành công dataset thực tế: {dataset.name} ({len(dataset)} mẫu, nhãn: {cat_names})")
    else:
        print("💡 Đang khởi tạo tập dữ liệu mẫu Guava Demo Studio (24 ảnh JPEG thật, 5 danh mục)...")
        dataset = create_demo_dataset()
        print(f"✅ Đã chuẩn bị sẵn: {dataset.name} ({len(dataset)} mẫu)")

    print(f"🌐 Địa chỉ Web: http://127.0.0.1:{args.port}")
    print("⚡ Tự động mở trình duyệt. Nhấn Ctrl+C trong terminal để tắt server.")
    print("=" * 65)

    session = gv.launch_app(dataset=dataset, port=args.port, auto=True)

    try:
        session.wait()
    except KeyboardInterrupt:
        print("\n🛑 Đang đóng Guava App...")
        gv.close_app()
        print("👋 Đã tắt server thành công!")


if __name__ == "__main__":
    main()
