#!/usr/bin/env python3
"""
Vectorise the cyanotype line drawings: PNG -> SVG.

WHY THIS EXISTS
---------------
The drawings were authored as 1024x1024 PNGs with white line work on a flat
cyanotype ground. That is wrong for this site in two ways:

  1. ~1 MB each. Twenty-odd of them is ~22 MB, on a site whose spec demands a
     sub-second first paint.
  2. The blue is BAKED IN. DESIGN.md makes colour a token system; a raster with
     #0C2942 fused into it cannot respond to --field or --line, so changing the
     palette would silently break every drawing.

The fix is not to re-derive line art from the source photographs (edge detection
on a photo yields broken, noisy contours that read as a filter, not a drawing).
It is to trace the ALREADY-CLEAN renders, which are near-ideal potrace input:
two-tone, flat, no gradients, no texture.

PIPELINE
--------
    PNG -> greyscale -> threshold -> 1-bit PBM -> potrace -> SVG -> retint

The threshold step inverts on purpose: the drawings are light-on-dark, and
potrace traces BLACK regions, so line pixels must become black and the ground
white. The resulting SVG is a set of filled paths in the shape of the strokes.

Output SVGs carry NO background and `fill="currentColor"`, so the page supplies
both colours from tokens:

    .drawing { color: var(--line); }          /* the ink   */
    .drawing-frame { background: var(--field); }  /* the paper */

Usage:
    python3 scripts/vectorize_drawings.py [--src DIR] [--out DIR]
                                          [--threshold N] [--keep-png]
"""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required:  pip install Pillow")


# potrace tuning. These are the values that survived visual comparison against
# the source renders; changing them changes the character of the line.
TURDSIZE = 8        # drop speckles smaller than this many pixels (generator noise)
ALPHAMAX = 1.2      # corner smoothing; >1 favours curves over corners
OPTTOLERANCE = 0.3  # curve-fitting slack; higher = fewer segments = smaller file
RESOLUTION = 72     # dpi, so 1 output unit == 1 source pixel

# Luminance split between ink and ground. The renders sit near the extremes
# (ground ~35, ink ~240 in 8-bit grey), so the exact value is not delicate.
DEFAULT_THRESHOLD = 128


def require_potrace() -> str:
    path = shutil.which("potrace")
    if not path:
        sys.exit("potrace not found on PATH.  brew install potrace")
    return path


def to_bitmap(png: Path, dest: Path, threshold: int) -> None:
    """Greyscale, threshold, invert, write a 1-bit PBM for potrace."""
    with Image.open(png) as im:
        grey = im.convert("L")
    # Ink (bright) -> 0/black so potrace traces it; ground (dark) -> 255/white.
    bitmap = grey.point(lambda p: 0 if p > threshold else 255, mode="L").convert("1")
    bitmap.save(dest, format="PPM")


def trace(potrace: str, pbm: Path, dest: Path) -> None:
    subprocess.run(
        [
            potrace, str(pbm),
            "--svg",
            "--output", str(dest),
            "--turdsize", str(TURDSIZE),
            "--alphamax", str(ALPHAMAX),
            "--opttolerance", str(OPTTOLERANCE),
            "--resolution", str(RESOLUTION),
        ],
        check=True,
        capture_output=True,
    )


_SIZE = re.compile(r'width="([\d.]+)pt"\s+height="([\d.]+)pt"')
_METADATA = re.compile(r"<metadata>.*?</metadata>", re.S)
_BODY = re.compile(r"<svg[^>]*>(.*)</svg>", re.S)


def retint(svg_text: str, title: str) -> str:
    """
    Rebuild potrace's SVG so it is token-driven and accessible:
      - a real viewBox in source-pixel units (potrace emits pt sizes)
      - fill="currentColor" instead of hard black, so CSS `color` is the ink
      - no background rect: the page's --field shows through
      - a <title> so the drawing is announced rather than skipped
    """
    size = _SIZE.search(svg_text)
    if not size:
        raise ValueError("could not read potrace output dimensions")
    width, height = float(size.group(1)), float(size.group(2))

    body = _BODY.search(_METADATA.sub("", svg_text))
    if not body:
        raise ValueError("could not read potrace output body")
    inner = body.group(1).strip()
    inner = inner.replace('fill="#000000"', 'fill="currentColor"')

    safe_title = title.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="0 0 {width:g} {height:g}" '
        f'role="img" aria-labelledby="t">'
        f"<title id=\"t\">{safe_title}</title>"
        f"{inner}"
        "</svg>\n"
    )


def title_for(stem: str) -> str:
    """A human sentence per drawing, for screen readers and for <title>."""
    name = stem.removeprefix("detail-")
    words = name.replace("-", " ")
    return f"Line drawing: {words}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default="public/drawings", type=Path)
    ap.add_argument("--out", default="public/drawings", type=Path)
    ap.add_argument("--threshold", default=DEFAULT_THRESHOLD, type=int)
    ap.add_argument("--keep-png", action="store_true",
                    help="leave the source PNGs in place (default: report only)")
    args = ap.parse_args()

    potrace = require_potrace()
    pngs = sorted(args.src.glob("*.png"))
    if not pngs:
        sys.exit(f"no PNGs in {args.src}")

    args.out.mkdir(parents=True, exist_ok=True)
    before = after = 0
    failures: list[str] = []

    with tempfile.TemporaryDirectory() as tmp:
        tmpdir = Path(tmp)
        for png in pngs:
            pbm = tmpdir / f"{png.stem}.pbm"
            raw = tmpdir / f"{png.stem}.svg"
            try:
                to_bitmap(png, pbm, args.threshold)
                trace(potrace, pbm, raw)
                svg = retint(raw.read_text(), title_for(png.stem))
            except (subprocess.CalledProcessError, ValueError, OSError) as exc:
                failures.append(f"{png.name}: {exc}")
                continue

            dest = args.out / f"{png.stem}.svg"
            dest.write_text(svg)
            src_kb, dst_kb = png.stat().st_size / 1024, dest.stat().st_size / 1024
            before, after = before + src_kb, after + dst_kb
            print(f"  {png.stem:<24} {src_kb:7.0f} KB -> {dst_kb:6.1f} KB "
                  f"({src_kb / dst_kb:5.1f}x)")

    print(f"\n{len(pngs) - len(failures)}/{len(pngs)} traced")
    print(f"total  {before / 1024:.1f} MB -> {after / 1024:.2f} MB", end="")
    if after:
        print(f"  ({before / after:.0f}x smaller)")
    else:
        print()

    for f in failures:
        print(f"  FAILED  {f}", file=sys.stderr)
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
