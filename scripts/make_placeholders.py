# -*- coding: utf-8 -*-
"""寸法だけ合わせた仮画像（単色＋寸法表記）を public/images/ に生成する。
本人が写真を用意したら、同じファイル名で上書きすれば差し替えが終わる。
使い方: python3 scripts/make_placeholders.py   （要 Pillow）
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images")
BG = (201, 183, 156)   # クラフト紙の色
FG = (60, 52, 44)
FONTS = [
    "/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc",
    "/System/Library/Fonts/Hiragino Sans GB.ttc",
    "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]

# (フォルダ, ファイル名, 幅, 高さ, 用途ラベル)
SPECS = []
for i in range(1, 7):
    SPECS.append(("hero", f"hero-{i:02d}.png", 1600, 900, f"メインビジュアル {i}"))
    SPECS.append(("burgers", f"burger-{i:02d}.png", 800, 600, f"バーガー {i}"))
    SPECS.append(("sides", f"side-{i:02d}.png", 800, 600, f"サイドメニュー {i}"))
    SPECS.append(("goods", f"goods-{i:02d}.png", 600, 600, f"グッズ {i}"))
    SPECS.append(("news", f"news-{i:02d}.png", 600, 600, f"投稿写真 {i}"))
SPECS += [
    ("about", "about-01.png", 1200, 800, "店内・ABOUT 用"),
    ("access", "access-map.png", 1200, 600, "地図の代わり（架空の店）"),
    ("", "ogp.png", 1200, 630, "OGP 画像"),
]


def font(size):
    for p in FONTS:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def make(folder, name, w, h, label):
    im = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(im)
    f = font(max(18, min(w, h) // 14))
    txt = f"{label}\n{w}×{h}（仮画像）"
    bb = d.multiline_textbbox((0, 0), txt, font=f, align="center")
    d.multiline_text(((w - bb[2]) // 2, (h - bb[3]) // 2), txt, font=f, fill=FG, align="center")
    out = os.path.join(ROOT, folder) if folder else ROOT
    os.makedirs(out, exist_ok=True)
    im.save(os.path.join(out, name), optimize=True)


if __name__ == "__main__":
    for spec in SPECS:
        make(*spec)
    print(f"{len(SPECS)} 点を生成しました → {os.path.abspath(ROOT)}")
