from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / "tmp" / "pdfs"
output = root / "public" / "educational" / "nf1"
output.mkdir(parents=True, exist_ok=True)

# Fractions were mapped against the visually inspected complete PDF page images.
# The resulting crops are derivative examples from the user-authorized PDF and
# retain their original case attribution in the lesson and provenance record.
crops = [
    ("nf1-hi-82.png", "fasi-case-44916.png", (0.365, 0.718, 0.598, 0.923)),
    ("nf1-hi-83.png", "optic-pathway-glioma-case-7683.png", (0.375, 0.317, 0.594, 0.542)),
    ("nf1-hi-83.png", "plexiform-neurofibroma-example.png", (0.298, 0.652, 0.672, 0.913)),
    ("nf1-hi-84.png", "ulnar-pseudarthrosis-example.png", (0.396, 0.095, 0.576, 0.285)),
]

for page, name, fractions in crops:
    image = Image.open(source / page).convert("RGB")
    width, height = image.size
    left, top, right, bottom = fractions
    box = (round(left * width), round(top * height), round(right * width), round(bottom * height))
    image.crop(box).save(output / name, optimize=True)
    print(f"{page} -> {name}: source={image.size}, crop={box}")
