# Open-source shortlist and runtime decision

This is a focused review of upstream source, licenses, and runtime documentation. Reuse is marked separately from inspiration. No account, cloud execution service, or API key is needed to play.

| Project | What it does well | Decision for After the Signal |
| --- | --- | --- |
| [Exercism Java](https://github.com/exercism/java) | Concept exercises with prerequisites and small, testable steps. MIT. | **Use now.** Three adapted exercise sets, 11 runnable methods, pinned upstream revision and visible attribution. Keep the campaign in our own story and order. |
| [University of Helsinki Java MOOC](https://java-programming.mooc.fi/) | Starts from no experience, builds through OOP, and combines examples with frequent tested exercises. Helsinki marks this Java course as legacy. | **Teaching reference.** Compare the order and depth of explanations; use original lesson text and keep our integrated editor. |
| [CodeCombat](https://github.com/codecombat/codecombat) | Closest comparison for short levels where code has a visible effect on the world. [Licensing](https://codecombat.com/legal) distinguishes the software and assets from official level content. | **Game-loop reference.** Use the pattern of an immediate, observable result. Do not fork its backend or copy its levels. |
| [Greenfoot](https://github.com/k-pet-group/BlueJ-Greenfoot) | A visual Java environment built around worlds and actors. Learners connect classes and methods with behavior they can watch. | **Java environment reference.** A good model for explaining OOP later. Keep the current first-run Java toolchain and use Godot for authored scenes. |
| [Robocode Tank Royale](https://github.com/robocode-dev/tank-royale) | Executes player-written bots separately from a visual battle arena. Java is among the supported languages. | **Architecture reference.** Keep execution and scene logic separate. Revisit its event-driven bot pattern for an advanced programming challenge. |
| [Judge0](https://github.com/judge0/judge0) and [Piston](https://github.com/engineer-man/piston) | Self-hostable execution services for several languages with isolation. | **Future remote-runner candidates.** The app already compiles with a local JDK. Hosted or LAN play would need an isolated runner, an install/operations plan, and separate threat testing. |
| [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) and [Piper](https://github.com/OHF-Voice/piper1-gpl) | Both generate neural speech locally. Piper is a useful alternative for on-device synthesis. | **Use Kokoro now.** Render lesson tracks at build time. Players get a standard audio player and transcript with no model install or browser voice dependency. |
| [Godot](https://godotengine.org/license/) and [Bevy](https://bevy.org/) | Both are open-source engines. Godot provides an editor for scenes, lighting, animation and UI; Bevy has a Rust-first workflow. | **Use Godot now.** The scene editor is useful for contributors who work on environments. The Rust/Tauri workbench keeps its existing role. |

## Boundary between the game and Java

The workbench owns the curriculum, local drafts, grading, stars, and the next level. Godot owns movement, lighting, collision, and the terminal. The browser runner records two world events after passing submissions: Level 1 powers the screen, and the chapter receipt finishes the repair. Godot reads two booleans from the local server; it never receives code, drafts, or grading cases. Keep the plain level path available to players who skip the 3D scene.

For the first full quest, give each world task a stable mission ID, then map that ID to one or more language lessons. The Godot scene should consume a narrow completion event such as `mission_completed("first-signal")`, issued only after the workbench records a pass. Do not send executable code, learner drafts, or API keys through the game bridge. Add a Rust track by supplying content and a runner adapter, rather than duplicating a map or rewriting the story.

## Rebuild the voice tracks

Kokoro renders the voice, but the words live with the curriculum. The first 12 scripts are authored in `coaching.mjs`; later guided transcripts combine the existing lesson and examples. Current tracks are English synthetic narration. Edit the script alongside the lesson when either changes.

With [uv](https://docs.astral.sh/uv/) and FFmpeg installed, download `kokoro-v1.0.int8.onnx` and `voices-v1.0.bin` from the pinned [model-files-v1.0 release](https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0) into an ignored `.voice-build/` directory. From the repo root run:

```powershell
node scripts/narration-manifest.mjs .voice-build/transcripts.json
uv run --python 3.12 --isolated --with kokoro-onnx==0.5.0 python scripts/render-narration.py .voice-build/transcripts.json .voice-build/kokoro-v1.0.int8.onnx .voice-build/voices-v1.0.bin assets/narration --force
```

Review the speech for pacing and pronunciation, and check that playback advances from the lesson page. `--start` and `--end` select a zero-based slice when rebuilding part of the set. The workbench and Tauri frontend both package these MP3s. This build process does not use a speech API or upload learner material.
