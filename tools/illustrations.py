#!/usr/bin/env python3
"""
Générateur d'illustrations "affiche de voyage" pour SahlaMaroc.
------------------------------------------------------------
Produit des SVG plats, légers (quelques Ko), cohérents entre eux, dans
src/assets/illustrations/<scene>.svg. Aucune photo externe nécessaire.

Usage : python3 tools/illustrations.py
Remplacer plus tard par vos propres photos (frontmatter `heroImage`) pour l'E-E-A-T.
"""
import math
import random
from pathlib import Path

W, H = 1200, 750
OUT = Path(__file__).resolve().parent.parent / "src" / "assets" / "illustrations"

# Palette commune (alignée sur src/styles/global.css)
TERRA = "#c8553d"
TERRA_D = "#873425"
CLAY = "#e08a5a"
SAND = "#f3d9a8"
SAND_L = "#f8ead0"
MAJ = "#2f4bd8"
MAJ_D = "#172d94"
NIGHT = "#141a3a"
EMER = "#0f8a5f"
EMER_D = "#0b5a40"
CREAM = "#fbf8f3"
INK = "#1b1a1f"
SKY_BLUE = "#7fb6e8"
TEAL = "#1f8a9e"


# ------------------------------------------------------------------ helpers
def f(x):
    return f"{x:.1f}".rstrip("0").rstrip(".")


def poly(points, fill, extra=""):
    pts = " ".join(f"{f(x)},{f(y)}" for x, y in points)
    return f'<polygon points="{pts}" fill="{fill}" {extra}/>'


def rect(x, y, w, h, fill, extra=""):
    return f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" fill="{fill}" {extra}/>'


def circle(cx, cy, r, fill, extra=""):
    return f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="{fill}" {extra}/>'


def path(d, fill, extra=""):
    return f'<path d="{d}" fill="{fill}" {extra}/>'


def sky(gid, stops):
    s = "".join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
    return (
        f'<defs><linearGradient id="{gid}" x1="0" y1="0" x2="0" y2="1">{s}</linearGradient></defs>'
        f'<rect width="{W}" height="{H}" fill="url(#{gid})"/>'
    )


def sun(cx, cy, r, color, glow=True):
    out = ""
    if glow:
        for i, a in enumerate((0.08, 0.12, 0.18)):
            out += circle(cx, cy, r * (2.2 - i * 0.4), color, f'opacity="{a}"')
    return out + circle(cx, cy, r, color)


def ridge(seed, base, amp, color, peaks=7, snow=None, jitter=0.35):
    """Ligne de crête montagneuse (polygone)."""
    rnd = random.Random(seed)
    xs = [i * W / peaks for i in range(peaks + 1)]
    pts = [(0, H)]
    tops = []
    for i, x in enumerate(xs):
        y = base - amp * (0.55 + rnd.random() * 0.45) if i % 2 == 0 else base - amp * rnd.random() * jitter
        x2 = x + rnd.uniform(-30, 30) if 0 < i < peaks else x
        pts.append((x2, y))
        if i % 2 == 0:
            tops.append((x2, y))
    pts.append((W, H))
    out = poly(pts, color)
    if snow:
        for (x, y) in tops:
            if y < base - amp * 0.7:
                out += poly([(x, y), (x - 42, y + 38), (x - 18, y + 30), (x, y + 44), (x + 20, y + 30), (x + 44, y + 38)], snow)
    return out


def dune(y, amp, color, phase=0.0, waves=2.2):
    d = f"M0,{H} L0,{f(y)} "
    steps = 24
    for i in range(1, steps + 1):
        x = i * W / steps
        yy = y - amp * math.sin(phase + i / steps * math.pi * waves) * (0.6 + 0.4 * math.sin(i * 0.7 + phase))
        d += f"L{f(x)},{f(yy)} "
    d += f"L{W},{H} Z"
    return path(d, color)


def minaret(x, base, w, h, body, trim, dark):
    """Minaret marocain : fût carré, bandeau décoratif, créneaux, lanternon, dôme, jamour."""
    top = base - h
    out = rect(x, top, w, h, body)
    # fenêtres en arc
    for k in range(3):
        wy = top + h * (0.2 + k * 0.22)
        out += path(
            f"M{f(x + w * 0.4)},{f(wy + 26)} L{f(x + w * 0.4)},{f(wy + 8)} "
            f"Q{f(x + w * 0.5)},{f(wy - 6)} {f(x + w * 0.6)},{f(wy + 8)} L{f(x + w * 0.6)},{f(wy + 26)} Z",
            dark,
        )
    # bandeau de zellige
    out += rect(x, top + 10, w, 16, trim)
    for k in range(6):
        out += rect(x + k * w / 6 + 3, top + 13, w / 6 - 6, 10, dark, 'opacity=".55"')
    # créneaux
    n = 5
    for k in range(n):
        cw = w / n
        out += poly([(x + k * cw + 2, top), (x + k * cw + cw / 2, top - 16), (x + (k + 1) * cw - 2, top)], body)
    # lanternon
    lw, lh = w * 0.42, h * 0.16
    lx = x + (w - lw) / 2
    out += rect(lx, top - lh, lw, lh, body)
    out += rect(lx, top - lh + 6, lw, 6, trim)
    # dôme + jamour
    out += path(f"M{f(lx)},{f(top - lh)} Q{f(lx + lw / 2)},{f(top - lh - lw * 0.75)} {f(lx + lw)},{f(top - lh)} Z", trim)
    cx = lx + lw / 2
    out += rect(cx - 1.5, top - lh - lw * 0.5 - 46, 3, 50, dark)
    for k, r in enumerate((7, 5.5, 4)):
        out += circle(cx, top - lh - lw * 0.5 - 10 - k * 13, r, "#e9b949")
    return out


def palm(x, base, h, trunk, leaf, lean=0.0):
    tx, ty = x + lean * h, base - h
    out = path(
        f"M{f(x - 7)},{base} Q{f(x + lean * h * 0.4 - 4)},{f(base - h * 0.5)} {f(tx - 3)},{f(ty)} "
        f"L{f(tx + 4)},{f(ty)} Q{f(x + lean * h * 0.4 + 6)},{f(base - h * 0.5)} {f(x + 8)},{base} Z",
        trunk,
    )
    for a in (-160, -125, -90, -55, -20, 15, 200):
        r = math.radians(a)
        ex, ey = tx + math.cos(r) * h * 0.42, ty + math.sin(r) * h * 0.25 + h * 0.12
        mx, my = tx + math.cos(r) * h * 0.22, ty + math.sin(r) * h * 0.3 - h * 0.06
        out += path(f"M{f(tx)},{f(ty)} Q{f(mx)},{f(my)} {f(ex)},{f(ey)} Q{f(mx)},{f(my + 14)} {f(tx)},{f(ty + 8)} Z", leaf)
    return out


def houses(seed, base, x0, x1, hmin, hmax, colors, win, wmin=50, wmax=110):
    rnd = random.Random(seed)
    out = ""
    x = x0
    while x < x1:
        w = rnd.uniform(wmin, wmax)
        h = rnd.uniform(hmin, hmax)
        c = rnd.choice(colors)
        out += rect(x, base - h, w + 1, h + 400, c)
        # parapets
        if rnd.random() < 0.5:
            out += rect(x + 4, base - h - 6, w - 8, 6, c)
        for k in range(rnd.randint(0, 3)):
            wx = x + rnd.uniform(8, max(9, w - 22))
            wy = base - h + rnd.uniform(14, max(15, h - 30))
            out += rect(wx, wy, 11, 16, win, 'rx="5"')
        x += w
    return out


def horseshoe(cx, base, w, h, fill, extra=""):
    """Arc outrepassé (fer à cheval) — signature de l'architecture marocaine."""
    r = w / 2
    sy = base - h + r
    return path(
        f"M{f(cx - r * 0.82)},{base} L{f(cx - r * 0.82)},{f(sy + r * 0.55)} "
        f"A{f(r)},{f(r)} 0 1 1 {f(cx + r * 0.82)},{f(sy + r * 0.55)} L{f(cx + r * 0.82)},{base} Z",
        fill,
        extra,
    )


def camel(x, base, s, color):
    """Silhouette de dromadaire (s = échelle)."""
    pts = [
        (0, 0), (4, -38), (2, -62), (10, -78), (30, -84), (44, -108), (58, -84), (70, -80), (82, -86), (92, -104),
        (100, -116), (112, -118), (118, -110), (108, -104), (100, -88), (92, -66), (86, -54), (86, -36), (88, 0),
        (80, 0), (78, -34), (70, -46), (36, -46), (24, -36), (16, 0), (8, 0), (10, -36),
    ]
    out = poly([(x + px * s, base + py * s) for px, py in pts], color)
    # selle / couverture
    out += poly([(x + 30 * s, base - 84 * s), (44 * s + x, base - 108 * s), (58 * s + x, base - 84 * s), (52 * s + x, base - 70 * s), (36 * s + x, base - 70 * s)], TERRA)
    return out


def rider(x, base, s, color):
    return rect(x + 40 * s, base - 128 * s, 8 * s, 22 * s, color) + circle(x + 44 * s, base - 133 * s, 5 * s, color)


def boat(x, y, w, hull, stripe):
    out = path(f"M{f(x)},{f(y)} L{f(x + w)},{f(y)} L{f(x + w * 0.85)},{f(y + w * 0.22)} L{f(x + w * 0.12)},{f(y + w * 0.22)} Z", hull)
    out += rect(x + w * 0.08, y + 4, w * 0.84, 5, stripe)
    return out


def waves(y, color, amp=8, length=80, op=1.0):
    d = f"M0,{f(y)} "
    for i in range(int(W / length) + 2):
        x = i * length
        d += f"Q{f(x + length / 4)},{f(y - amp)} {f(x + length / 2)},{f(y)} T{f(x + length)},{f(y)} "
    d += f"L{W},{H} L0,{H} Z"
    return path(d, color, f'opacity="{op}"')


def birds(seed, n, x0, x1, y0, y1, color):
    rnd = random.Random(seed)
    out = ""
    for _ in range(n):
        x, y, s = rnd.uniform(x0, x1), rnd.uniform(y0, y1), rnd.uniform(6, 12)
        out += path(f"M{f(x - s)},{f(y)} Q{f(x - s / 2)},{f(y - s / 1.6)} {f(x)},{f(y)} Q{f(x + s / 2)},{f(y - s / 1.6)} {f(x + s)},{f(y)}", "none", f'stroke="{color}" stroke-width="2.4" stroke-linecap="round"')
    return out


def lantern(x, y, s, body, glow):
    out = rect(x - 1, 0, 2, y - 10 * s, INK, 'opacity=".5"')
    out += circle(x, y + 18 * s, 34 * s, glow, 'opacity=".25"')
    out += poly([(x - 10 * s, y), (x + 10 * s, y), (x + 16 * s, y + 18 * s), (x + 10 * s, y + 36 * s), (x - 10 * s, y + 36 * s), (x - 16 * s, y + 18 * s)], body)
    out += poly([(x - 6 * s, y + 8 * s), (x + 6 * s, y + 8 * s), (x + 9 * s, y + 18 * s), (x + 6 * s, y + 28 * s), (x - 6 * s, y + 28 * s), (x - 9 * s, y + 18 * s)], glow)
    out += poly([(x - 10 * s, y), (x, y - 12 * s), (x + 10 * s, y)], body)
    return out


def zellige_band(y, h, c1, c2):
    out = rect(0, y, W, h, c1)
    step = h * 1.2
    k = 0
    x = 0.0
    while x < W + step:
        cx, cy, r = x, y + h / 2, h * 0.38
        pts = []
        for i in range(16):
            a = math.pi / 8 * i
            rr = r if i % 2 == 0 else r * 0.55
            pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
        out += poly(pts, c2 if k % 2 == 0 else CREAM)
        x += step
        k += 1
    return out


def svg(body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-label="{title}" '
        f'preserveAspectRatio="xMidYMid slice">{body}</svg>\n'
    )


# ------------------------------------------------------------------ scènes
def marrakech():
    b = sky("s", [(0, "#f6c58f"), (0.55, "#f3a87a"), (1, "#e9845a")])
    b += sun(860, 250, 70, "#fff1c9")
    b += ridge(3, 430, 170, "#c9a6c9", peaks=9, snow="#fbf3f8")
    b += ridge(4, 470, 90, "#b78aa6", peaks=11)
    b += houses(1, 560, -20, 1240, 40, 120, ["#d9774f", "#cf6b46", "#e08a5a"], TERRA_D)
    b += minaret(470, 600, 92, 380, "#b9583a", "#2d8a6a", "#6e2a1c")
    b += palm(170, 620, 250, "#7a3b24", "#2f6f4f", -0.08)
    b += palm(260, 640, 200, "#7a3b24", "#3d8a5f", 0.1)
    b += palm(1040, 630, 240, "#7a3b24", "#2f6f4f", 0.06)
    b += rect(0, 600, W, 160, "#b5523a")
    for k in range(25):  # créneaux du rempart
        b += rect(k * 50 + 8, 588, 30, 14, "#b5523a")
    b += horseshoe(820, 750, 120, 130, "#7a2f20")
    b += birds(5, 6, 600, 1000, 120, 220, "#7a3b24")
    return svg(b, "Marrakech")


def casablanca():
    b = sky("s", [(0, "#a8d4f2"), (0.6, "#d9ecf7"), (1, "#f6efe3")])
    b += sun(260, 190, 54, "#fff6dc")
    b += houses(2, 470, 640, 1240, 60, 190, ["#e9e4da", "#d9d3c7", "#f1ece3"], "#9fb6c8", 40, 90)
    # Mosquée : salle de prière + minaret élancé
    b += rect(150, 400, 420, 100, "#efe8dc")
    for k in range(7):
        b += horseshoe(185 + k * 58, 500, 38, 70, "#2f8a7a")
    b += rect(150, 392, 420, 10, "#2f8a7a")
    b += minaret(560, 500, 70, 400, "#f1ebe0", "#1f8a76", "#9a8b74")
    b += waves(520, "#3d8fc9", 10, 90)
    b += waves(560, "#2a73b0", 12, 120)
    b += waves(610, MAJ, 10, 70)
    b += waves(680, MAJ_D, 8, 100)
    b += birds(7, 7, 750, 1100, 90, 200, "#5c6b80")
    return svg(b, "Casablanca")


def chefchaouen():
    b = sky("s", [(0, "#cfe6f5"), (1, "#eef6fb")])
    b += ridge(11, 330, 200, "#8fb2a0", peaks=7)
    b += ridge(12, 380, 110, "#6f9a84", peaks=9)
    rnd = random.Random(9)
    blues = ["#3f6fd8", "#5b8ae6", "#7aa6f0", "#2f58c4", "#9cc0f5"]
    for row in range(6):
        b += houses(20 + row, 430 + row * 62, -40 + rnd.uniform(0, 60), 1260, 40, 90, blues, "#1d3a8a", 70, 130)
    # escalier + porte
    b += horseshoe(600, 750, 110, 180, "#1d3a8a")
    b += circle(624, 690, 5, "#e9b949")
    for k in range(5):
        b += rect(420 + k * 12, 690 + k * 12, 140 - k * 24, 12, "#e9eef7")
    b += lantern(950, 520, 1.1, "#6b4a2b", "#f4c35a")
    b += palm(140, 760, 160, "#6b4a2b", EMER_D, 0.05)
    return svg(b, "Chefchaouen")


def sahara():
    b = sky("s", [(0, "#3a2a6b"), (0.45, "#c5577a"), (0.75, "#f2955b"), (1, "#f7c97f")])
    b += sun(780, 360, 80, "#ffe1a1")
    b += dune(470, 60, "#e59a5c", 0.2, 1.6)
    b += dune(540, 70, "#d9814a", 1.4, 2.1)
    b += dune(620, 60, "#c46a3a", 2.4, 1.8)
    b += dune(700, 40, "#a8552e", 0.9, 2.5)
    for i, x in enumerate((300, 410, 520)):
        b += camel(x, 560 - i * 6, 0.9, "#2b1a2e")
        b += rider(x, 560 - i * 6, 0.9, "#2b1a2e")
    # piquets de bivouac
    b += poly([(960, 640), (1020, 580), (1080, 640)], "#2b1a2e")
    b += poly([(1050, 650), (1100, 600), (1150, 650)], "#3a2440")
    for k in range(40):
        rnd = random.Random(k)
        b += circle(rnd.uniform(0, W), rnd.uniform(0, 200), rnd.uniform(0.8, 2), "#fff", 'opacity=".7"')
    return svg(b, "Merzouga, Sahara")


def essaouira():
    b = sky("s", [(0, "#bfe0f2"), (1, "#eef7fb")])
    b += sun(980, 160, 50, "#fff7de")
    b += houses(31, 420, -20, 760, 60, 150, ["#f4efe6", "#e8e1d4", "#fbf7ef"], "#2f6fb8", 50, 100)
    b += rect(-10, 400, 790, 60, "#c9a27a")
    for k in range(16):
        b += rect(k * 50, 388, 30, 14, "#c9a27a")
    b += rect(560, 300, 110, 110, "#c9a27a")
    for k in range(4):
        b += rect(560 + k * 30, 288, 20, 14, "#c9a27a")
    b += waves(470, "#5aa7d6", 8, 80)
    b += waves(520, "#3a8cc6", 10, 110)
    for i, (x, y) in enumerate(((120, 560), (300, 600), (520, 570), (760, 610), (930, 560))):
        b += boat(x, y, 150 - i * 6, MAJ, "#f4efe6")
    b += waves(660, MAJ_D, 8, 90)
    b += birds(13, 10, 200, 1100, 120, 330, "#5a6a7a")
    return svg(b, "Essaouira")


def fes():
    b = sky("s", [(0, "#f2d6a8"), (1, "#f8ead0")])
    b += ridge(41, 420, 120, "#d6b98e", peaks=9)
    b += houses(42, 520, -20, 1240, 40, 140, ["#e8d3b0", "#dcc29b", "#efdcbc"], "#9c7b54", 40, 80)
    # Bab : porte monumentale à décor bleu
    b += rect(330, 330, 540, 420, MAJ)
    b += rect(330, 330, 540, 30, "#e9b949")
    for k in range(9):
        b += rect(345 + k * 58, 336, 40, 18, MAJ_D)
    for cx in (440, 600, 760):
        b += horseshoe(cx, 750, 120, 300 if cx == 600 else 240, "#f8ead0" if cx == 600 else "#d9c3a0")
    b += rect(330, 700, 540, 50, "#173a8f")
    b += minaret(980, 560, 70, 260, "#c9a27a", EMER, "#7a5a3a")
    return svg(b, "Fès")


def rabat():
    b = sky("s", [(0, "#b8d8ef"), (1, "#f1ece3")])
    b += waves(560, "#4b97cf", 8, 100)
    b += rect(0, 520, W, 50, "#d8c4a0")
    # Tour Hassan (inachevée) + colonnes
    b += rect(460, 200, 170, 330, "#c79a6e")
    for k in range(3):
        b += horseshoe(545, 300 + k * 80, 48, 60, "#8a6040")
    for k in range(14):
        x = 120 + k * 70 if k < 5 else 700 + (k - 5) * 52
        b += rect(x, 470, 20, 60, "#e3d2b4")
    b += palm(1080, 540, 230, "#6b4a2b", EMER_D, -0.05)
    b += birds(19, 6, 700, 1000, 120, 220, "#5a6a7a")
    return svg(b, "Rabat")


def tangier():
    b = sky("s", [(0, "#9ccbe8"), (1, "#e6f2f8")])
    b += ridge(51, 400, 80, "#9db3c2", peaks=8)
    b += waves(470, "#3a8cc6", 8, 120)
    b += houses(52, 470, 600, 1240, 50, 230, ["#f8f6f1", "#ece8df", "#e0ddd3"], "#5d86a8", 40, 90)
    b += minaret(820, 300, 50, 220, "#efeae0", EMER, "#8f8a7f")
    b += boat(140, 540, 330, "#f4f1ea", MAJ)
    b += rect(250, 470, 120, 70, "#f4f1ea")
    b += rect(280, 440, 40, 34, TERRA)
    b += waves(600, MAJ, 10, 90)
    b += waves(680, MAJ_D, 8, 100)
    return svg(b, "Tanger")


def taghazout():
    b = sky("s", [(0, "#f7b98a"), (0.6, "#f6d6a9"), (1, "#a8dbe0")])
    b += sun(300, 330, 90, "#fff0c8")
    b += ridge(61, 380, 100, "#d08b62", peaks=7)
    b += houses(62, 430, 750, 1240, 30, 110, ["#f1e6d6", "#e9c9a8", "#dcb48a"], "#2f6fb8", 40, 80)
    b += waves(470, TEAL, 10, 110)
    # rouleau de vague
    b += path("M500,560 C620,420 800,420 880,520 C820,480 740,490 700,560 Z", "#5cc3c9")
    b += waves(560, "#167b8f", 12, 130)
    # surfeur
    b += poly([(690, 512), (760, 500), (765, 506), (695, 518)], "#f4c35a")
    b += rect(722, 470, 9, 32, INK) + circle(726, 462, 7, INK)
    b += waves(650, "#0f5f72", 10, 90)
    # arganier
    b += rect(140, 560, 16, 120, "#5a3a22")
    b += path("M60,580 Q150,470 250,580 Q150,610 60,580 Z", "#3f7a4a")
    return svg(b, "Taghazout")


def atlas():
    b = sky("s", [(0, "#9fc7ea"), (1, "#e9f2f7")])
    b += ridge(71, 330, 230, "#7f8fb5", peaks=7, snow="#ffffff")
    b += ridge(72, 420, 160, "#5f739b", peaks=9, snow="#eef3fb")
    b += ridge(73, 520, 90, "#a35f43", peaks=11)
    # village berbère (pisé)
    b += houses(74, 610, 300, 900, 40, 110, ["#b8704f", "#a9603f", "#c47e5a"], "#5a2f1f", 50, 90)
    b += minaret(560, 620, 40, 150, "#a9603f", "#e9b949", "#5a2f1f")
    b += ridge(75, 690, 50, "#3f6f4a", peaks=13)
    return svg(b, "Haut Atlas")


def souk():
    b = sky("s", [(0, "#3b2340"), (1, "#7a3b45")])
    # arcades
    for k in range(5):
        b += horseshoe(140 + k * 230, 750, 190, 560, "#e3a35f" if k % 2 else "#d8914f")
        b += horseshoe(140 + k * 230, 750, 150, 500, "#5a2b33")
    for i, x in enumerate((180, 330, 520, 640, 810, 980, 1080)):
        b += lantern(x, 150 + (i % 3) * 70, 1.2 + (i % 2) * 0.4, "#9a6a2b", "#ffcf6b")
    # étal de tapis / épices
    for k, c in enumerate(("#c8553d", "#e9b949", "#2f4bd8", "#0f8a5f", "#873425", "#f39a4a")):
        b += path(f"M{90 + k * 180},{690} Q{150 + k * 180},{610} {210 + k * 180},{690} Z", c)
    b += rect(0, 690, W, 60, "#2a1820")
    return svg(b, "Souk")


def riad():
    b = rect(0, 0, W, H, "#f4e6cf")
    b += zellige_band(560, 60, EMER, "#e9b949")
    # galerie d'arcs
    for k in range(5):
        x = 120 + k * 240
        b += horseshoe(x, 560, 170, 360, "#fbf3e6")
        b += horseshoe(x, 560, 130, 320, "#c8b08a")
        b += horseshoe(x, 560, 130, 320, "#3a6f8f", 'opacity=".15"')
    b += rect(0, 150, W, 30, "#d7a96c")
    b += rect(0, 620, W, 130, "#e8d6b8")
    # bassin + fontaine
    b += path("M400,700 Q600,640 800,700 Q600,760 400,700 Z", "#3a8cc6")
    b += rect(590, 600, 20, 90, "#d7a96c")
    b += path("M560,605 Q600,570 640,605 Z", "#3a8cc6")
    b += palm(220, 700, 200, "#6b4a2b", EMER_D, 0.05)
    b += palm(1000, 700, 200, "#6b4a2b", EMER_D, -0.05)
    b += lantern(600, 200, 1.3, "#9a6a2b", "#ffcf6b")
    return svg(b, "Riad")


SCENES = {
    "marrakech": marrakech,
    "casablanca": casablanca,
    "chefchaouen": chefchaouen,
    "sahara": sahara,
    "essaouira": essaouira,
    "fes": fes,
    "rabat": rabat,
    "tangier": tangier,
    "taghazout": taghazout,
    "atlas": atlas,
    "souk": souk,
    "riad": riad,
}

if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for name, fn in SCENES.items():
        (OUT / f"{name}.svg").write_text(fn(), encoding="utf-8")
    print(f"{len(SCENES)} illustrations -> {OUT}")
