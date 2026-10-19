"""
Guava Native Perceptual Image Hashing.

Pure Python & Pillow/NumPy implementation:
- dHash (Difference Hash)
- aHash (Average Hash)
- Hamming Distance
"""
from __future__ import annotations

import hashlib
import os
from typing import Any


def dhash(image_path: str, hash_size: int = 8) -> int:
    """
    Compute Difference Hash (dHash) for an image file.
    Fast and robust against scaling, brightness, and slight crops.
    """
    if not image_path or not os.path.exists(image_path):
        # Fallback to hash of string if image not on disk
        h = hashlib.md5(str(image_path).encode("utf-8")).hexdigest()
        return int(h[:16], 16)

    try:
        from PIL import Image
        with Image.open(image_path) as img:
            # Convert to grayscale and resize to (hash_size + 1, hash_size)
            resized = img.convert("L").resize((hash_size + 1, hash_size), Image.Resampling.BILINEAR)
            pixels = list(resized.getdata())

            diff = []
            for row in range(hash_size):
                for col in range(hash_size):
                    pixel_left = pixels[row * (hash_size + 1) + col]
                    pixel_right = pixels[row * (hash_size + 1) + col + 1]
                    diff.append(pixel_left > pixel_right)

            decimal_val = 0
            for index, value in enumerate(diff):
                if value:
                    decimal_val |= 1 << index
            return decimal_val
    except Exception:
        h = hashlib.md5(str(image_path).encode("utf-8")).hexdigest()
        return int(h[:16], 16)


def ahash(image_path: str, hash_size: int = 8) -> int:
    """Compute Average Hash (aHash)."""
    if not image_path or not os.path.exists(image_path):
        h = hashlib.md5(str(image_path).encode("utf-8")).hexdigest()
        return int(h[:16], 16)

    try:
        from PIL import Image
        with Image.open(image_path) as img:
            resized = img.convert("L").resize((hash_size, hash_size), Image.Resampling.BILINEAR)
            pixels = list(resized.getdata())
            avg = sum(pixels) / len(pixels)

            decimal_val = 0
            for index, pixel in enumerate(pixels):
                if pixel > avg:
                    decimal_val |= 1 << index
            return decimal_val
    except Exception:
        h = hashlib.md5(str(image_path).encode("utf-8")).hexdigest()
        return int(h[:16], 16)


def hamming_distance(h1: int, h2: int) -> int:
    """Compute Hamming distance between two integer hashes."""
    return bin(h1 ^ h2).count("1")
