# Narrative system and optional AI

## Playable now

The opening uses authored dialogue and local, persistent choices. Godot owns the story state; passing Java submissions remain the only source of terminal repair milestones. Social dialogue does not award stars or change a test result.

The title screen offers a new journey, continuation, settings, credits, and direct access to the Java workbench. A real threaded scene load leads into the opening. A journal records the current objective and the player's choices. The pause menu returns to the title without clearing the workbench.

The new-game form stores a chosen name, language track, and study goal. Only Java is currently selectable. Missions grant language-neutral capabilities through the versioned registry. Future content can extend that registry without changing the existing story's stakes; see [the expansion contract](expansion-contract.md).

## Efficient AI boundary — planned

No API key or language model is needed for the current game. Authored states make consequences reproducible, cheap, and available offline.

An optional future provider can rephrase a short NPC response after a significant story event. It receives a stable character brief, a compact summary of relevant choices, and the current authored response intent. Do not send source code, a learner's answers, complete chat history, or private logs. A suitable initial limit is at most 1,200 input tokens and 150 output tokens per significant interaction, with no calls per frame, keystroke, test case, or repeated menu visit.

Cache a response by campaign version, character, event, locale, and relevant state. Validate a structured response containing dialogue only. The model cannot write saves, award progress, alter grading, call tools, or invent new quest prerequisites. If validation fails or the provider is unavailable, use the authored line.

The user explicitly chooses and configures a provider before any network narration is enabled. A future key must use OS-backed credential storage. Token limits, usage, and a hard spending cap must be visible. This provider adapter is not implemented in the opening build.
