# Third-party notices

## Exercism Java

`exercism-java.mjs`, `problems-workshops.mjs`, and `syllabus.mjs` adapt exercise specifications and the learning sequence from [exercism/java, revision be2d006](https://github.com/exercism/java/tree/be2d006c30c50e0154231dd987d5a3b5526c0427/exercises/concept). The app uses its own grading fixtures, written explanations, and runner. Here is the [upstream license](https://github.com/exercism/java/blob/be2d006c30c50e0154231dd987d5a3b5526c0427/LICENSE):

MIT License

Copyright (c) 2021 Exercism

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Narration

The bundled recordings are generated from this project's lesson scripts using [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) (Apache-2.0) and [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx). The recordings are marked as synthetic in the project documentation. The app does not ship a copy of the model, the Python inference runtime, or FFmpeg.

## Exploration

The First Ruin scene is original source built for the [MIT-licensed Godot Engine](https://godotengine.org/license/). Godot itself is installed separately and is not bundled in the workbench or Tauri installer.

The courier's character model and animations, the flag, both grass models, and their shared texture are by Kenney, from the [Starter Kit 3D Platformer at revision 3fa8a04](https://github.com/KenneyNL/Starter-Kit-3D-Platformer/tree/3fa8a04b1c01ab23db43123d4ce814a34c3fc7f0). The upstream project designates its 3D models and included assets [CC0](https://creativecommons.org/publicdomain/zero/1.0/). We use the assets only; no template game code was copied.

The Windows game embeds the workbench using [Godot WRY v1.0.2](https://github.com/doceazedo/godot_wry/releases/tag/v1.0.2), MIT licensed. Its license is in `world/addons/godot_wry/LICENSE.txt`. The extension uses the separately installed Windows WebView2 Runtime. The DLL is the Windows x64 release binary, SHA-256 `a8fb72d3570708874f92e5e55384c35127c056c1554eb7a06b5997d050831e5b`.

The portable Windows game also includes Godot and Node.js. Their license files and notices are in the package's `licenses/` directory. The Tauri workbench is a separate package.
