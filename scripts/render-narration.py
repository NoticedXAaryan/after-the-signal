"""Render bundled lesson recordings with the local Kokoro model and FFmpeg."""
import argparse
import json
import os
from pathlib import Path
import subprocess

import numpy as np
import onnxruntime as ort
from kokoro_onnx import Kokoro

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("manifest", type=Path)
parser.add_argument("model", type=Path)
parser.add_argument("voices", type=Path)
parser.add_argument("output", type=Path)
parser.add_argument("--start", type=int, default=0)
parser.add_argument("--end", type=int)
parser.add_argument("--force", action="store_true")
args = parser.parse_args()

options = ort.SessionOptions()
options.intra_op_num_threads = min(4, os.cpu_count() or 1)
options.inter_op_num_threads = 1
session = ort.InferenceSession(str(args.model), sess_options=options, providers=["CPUExecutionProvider"])
voice = Kokoro.from_session(session, str(args.voices))
args.output.mkdir(parents=True, exist_ok=True)
items = json.loads(args.manifest.read_text(encoding="utf-8"))
for item in items[args.start:args.end]:
    target = args.output / (item["id"] + ".mp3")
    if target.exists() and not args.force:
        continue
    samples, rate = voice.create(item["script"], voice="af_heart", speed=0.94, lang="en-us")
    if len(samples) < rate or not np.isfinite(samples).all():
        raise ValueError("Invalid audio for " + item["id"])
    temp = target.with_suffix(".tmp")
    subprocess.run([
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-f", "f32le",
        "-ar", str(rate), "-ac", "1", "-i", "pipe:0", "-c:a", "libmp3lame",
        "-b:a", "40k", "-f", "mp3", str(temp),
    ], input=samples.astype("<f4").tobytes(), check=True)
    temp.replace(target)
    print(f"{item['id']}: {len(samples) / rate:.1f}s", flush=True)
