# Expanding the world without rewriting it

The story describes things people need: a reliable record, a safe controller, a message that arrives. A language track teaches the skills needed to deliver them. These are different layers.

The opening's [registry](../world/story/registry.json) contains a campaign ID, tracks, goals, mission IDs, and capabilities. A mission grants a stable capability such as terminal.output. The Java binding names the current exercise. A future language adds its own exercise binding to that mission; the dialogue and human stakes remain intact.

## Update rules

1. Keep released mission, node, capability, and track IDs stable. Display names may change.
2. Add new regions and story packs with their own IDs and versions. The Common Dawn can end while the world continues into later expeditions.
3. Version save schemas separately from content. Additive content does not require a save reset.
4. Preserve unrecognized fields and track IDs. An absent story node is suspended in the save, rather than discarded.
5. A track is selectable only when its course, runner, grading, and mission bindings are implemented and tested. Rust and Python currently appear as planned entries.
6. Goals change the protagonist's stated intent, study guidance, and future mission selection. They do not replace the prerequisites required to build a skill.
7. New branches record facts and obligations, not a universal morality score. Preserve access to learning after social disagreement.
8. AI suggestions can vary phrasing inside the authored intent, but cannot add prerequisites, change a grade, or write save state.

The current implementation offers Java and three study goals. Its two repair capabilities are reported by the Java runner. Other tracks and later campaign acts remain planned. Extensibility makes those additions possible; it is not a claim that unlimited authored content already exists.
