"""
Guava Web App Launcher
Chạy lệnh: python examples/launch_app.py
"""
import sys

# Đảm bảo in UTF-8 trên Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

import argparse
import guava as gv
import fiftyone as fo

parser = argparse.ArgumentParser(description="🍈 Guava Visual Web App Launcher")
parser.add_argument("--dataset", "-d", type=str, default=None, help="Tên dataset cần mở")
parser.add_argument("--format", "-f", type=str, default=None, help="Định dạng để import (coco, yolo, voc...)")
parser.add_argument("--path", "-p", type=str, default=None, help="Đường dẫn dataset trên ổ đĩa")
parser.add_argument("--port", type=int, default=5151, help="Port Web App (mặc định: 5151)")
args = parser.parse_args()

print("=" * 65)
print("🍈 Đang khởi động Guava Visual Web App...")
print("=" * 65)

dataset = None

# 1. Nếu người dùng truyền format và path -> import bằng Datumaro engine của Guava
if args.format and args.path:
    print(f"📥 Đang import dataset định dạng '{args.format}' từ: {args.path}...")
    dataset = gv.load(args.format, args.path)
    print(f"✅ Đã tải thành công: {dataset}")

# 2. Nếu người dùng chỉ định tên dataset cụ thể
elif args.dataset:
    print(f"📦 Đang tải dataset: '{args.dataset}'...")
    dataset = fo.load_dataset(args.dataset)

# 3. Mặc định: tự động tải dataset có sẵn (ví dụ coils_v2_val) để hiển thị đầy đủ hình ảnh & nhãn
else:
    available = fo.list_datasets()
    if available:
        target = "coils_v2_val" if "coils_v2_val" in available else available[0]
        dataset = fo.load_dataset(target)
        print(f"📦 Tự động tải tập dữ liệu mẫu: '{target}' ({len(dataset)} ảnh)")
    else:
        print("⚠️ Chưa có dataset nào trên máy. Giao diện sẽ mở ở chế độ trống.")

print("🌐 Địa chỉ Web: http://localhost:5151")
print("⚡ Tự động mở trình duyệt. Nhấn Ctrl+C trong terminal để tắt server.")
print("=" * 65)

# Khởi động Guava visual App
session = gv.launch_app(dataset=dataset, port=args.port, auto=True)

try:
    session.wait()
except KeyboardInterrupt:
    print("\n🛑 Đang đóng Guava App...")
    gv.close_app()
    print("👋 Đã tắt server thành công!")

