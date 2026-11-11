# Contributing to After the Signal

You can contribute a single Java question, an accessibility fix, a new quest world, or a language engine. Open an issue for changes that affect progression, persistence, or how code runs.

## Where things live

| Area | Files |
| --- | --- |
| Course order and external practice links | `courses.mjs` |
| Topic descriptions and lessons | `curriculum.mjs` |
| Coding prompts, references, and fixtures | `problems-*.mjs` |
| Quick checks and glossary | `checkpoints.mjs` |
| Memory cards | `memory.mjs` |
| Campaign rules and map | `quest.mjs`, `app.js`, `quest.css` |
| Java case generation and grading | `java-plan.mjs` |
| Desktop and browser execution | `src-tauri/src/java.rs`, `judge.mjs` |
| Art and visual conventions | `assets/`, `docs/design-system.md` |

## Add a question

1. Give the problem a stable ID and choose a topic and difficulty. State the exact input domain, output, and tie-breaking rule.
2. Explain one decision the learner needs to make. Good quick checks isolate an index boundary, state invariant, or tempting wrong approach.
3. Add a readable Java reference with worst-case time and auxiliary space. Include a visible example and boundary cases. Use original wording and fixtures. Link to related external practice where it helps.
4. Run `pnpm run check`. For UI work, also check the new path in the desktop window and at a narrow viewport.

## Add a language

Keep the course metadata independent of the implementation. A language needs its own problem format or adapter, grading fixtures, runtime integration, and install instructions. Preserve the local execution boundary and use the existing course and campaign models when they fit. See the Java runner and `courses.mjs` for the first integration.

## Add story content

The native title, loading flow, dialogue, and journal live in world/game_shell.gd. The versioned registry and dialogue packs live in world/story. Local persistence lives in world/story_state.gd.

Write the human reason for a mission before selecting its programming task. Use named facts for consequences and keep learning accessible after disagreement. Give nodes stable IDs, update the workboard, and extend scripts/check-story.gd with meaningful branch and save tests. Run that script only with an isolated APPDATA and AFTER_SIGNAL_TEST_RUN=1.

Use [the expansion contract](docs/expansion-contract.md). Mark a track available only when its curriculum, runner, and mission bindings work. Unknown save fields and story IDs must survive an update.

## Submit changes

Open a pull request with a short description of the learner-facing change and the checks you ran. For art changes, include the source or prompt and the terms under which it can be redistributed. By contributing, you agree to license your contributions under this project’s MIT license.
