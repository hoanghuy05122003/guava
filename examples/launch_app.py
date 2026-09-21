"""
Guava Web App Launcher
Chạy lệnh: python examples/launch_app.py
"""
import sys

# Đảm bảo in UTF-8 trên Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

import guava as gv

print("=" * 60)
print("🍈 Đang khởi động Guava Visual Web App...")
print("🌐 Địa chỉ Web: http://localhost:5151")
print("⚡ Tự động mở trình duyệt. Nhấn Ctrl+C để tắt server.")
print("=" * 60)

# Khởi động visual App
session = gv.launch_app(port=5151, auto=True)

try:
    session.wait()
except KeyboardInterrupt:
    print("\n🛑 Đang đóng Guava App...")
    gv.close_app()
    print("👋 Đã tắt thành công!")
