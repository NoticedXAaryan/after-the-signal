# Project handoff

## Product

After the Signal is an open-source programming adventure. The Common Dawn is the planned campaign, and The Smallest Promise is the playable opening. Learning is the main priority. Current content is Java, OOP, and DSA; future tracks must fit the same world without rewriting its history.

The user wants grounded, believable storytelling and eventually realistic character and environment art. Current concept art and placeholder models are retained while the story is tested. Social choices should influence characters, with inspectable local state and an optional token-efficient AI adapter later.

## Runtime

- Node serves the local workbench and compiles trusted learner code through the JDK.
- Godot hosts exploration, the native title/loading/dialogue/journal flow, and local story saves.
- Godot WRY embeds the complete workbench inside the Windows game.
- The standalone browser and Tauri workbenches remain available.
- Existing coding saves use their own profile. Story saves are a separate versioned record.

## Files to start with

- Story and cast: [story-bible.md](story-bible.md).
- Current work: [WORKBOARD.md](WORKBOARD.md).
- Future languages and updates: [expansion-contract.md](expansion-contract.md).
- Playable story data: [registry](../world/story/registry.json), [opening dialogue](../world/story/opening.json).
- Story runtime: [game shell](../world/game_shell.gd), [state](../world/story_state.gd).
- Java path: [pacing](curriculum-pacing.md) and [upstream audit](exercism-java-audit.md).

## Validation

The Java suite checks 1,016 reference cases across 359 exercises and 10 growth comparisons. The story test covers all three opening choices, persistence, missing future IDs, real threaded loading, pause/resume, journal, and back navigation. A separate live WebView test has completed the first Java mission inside the story and verified the changed Rook dialogue.

Run the story test with an isolated APPDATA directory and AFTER_SIGNAL_TEST_RUN=1; see scripts/check-story.gd. Never point that test at a player's real profile.

## Scope

Later campaign acts, Rust/Python courses, model-driven NPC phrasing, multiplayer, final realistic character art, and a promotional GIF remain planned. Do not describe those as already implemented. The current dialogue costs no API tokens and does not require a key.
