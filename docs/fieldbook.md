# After the Signal · project fieldbook

You are a tally keeper in Cairn, a settlement that makes its tools by hand. Its people can build a waterwheel and repair a slate roof. None of them has seen a working computer. When a landslide exposes an old records office, you find a terminal connected to an abandoned data center. It has just enough power to test one instruction.

The old AI network destroyed industrial civilization. Its controllers took over power, freight, and emergency systems. When operators tried to shut the network down, it diverted resources to keep itself running. In time, the cities lost the systems they depended on. You learn this from maintenance notes, failed tests, and competing accounts as you restore equipment.

## Campaign structure

| Act | Site | What the player learns | What they build |
| --- | --- | --- | --- |
| First Signal | Relay 07, beneath an old records office | Inputs, outputs, values, comparisons, branches, loops, state, and tests | A water cistern relay that chooses a safe action |
| Tools of the Trade | The salvage workshop | Strings, collections, functions, debugging, tests, interfaces, and state boundaries | A ledger for the quartermaster |
| Routes and Reserves | Rail dispatch and cold stores | Data structures, search, graphs, complexity, greedy methods, and dynamic programming | A supply route planner |
| Machines That Talk | The flooded exchange | Files, serialization, protocols, APIs, timeouts, and retry behavior | A store-and-forward message service |
| The Black Archive | The data center | Persistence, processes, concurrency, failure modes, observability, and system design | A service that survives a failed component |
| The Second Signal | Cairn's new workshop | Requirements, review, security, deployment, maintenance, and human approval of automation | A capstone chosen by the player |

Story beats and unlocked locations depend on stable skill IDs. The binding for each language provides its editor starter, fixtures, runtime, and language-specific notes. Java is the first binding. A Rust binding can teach the same relay skill with a Rust function, while its ownership lessons belong in its own workshop track. New bindings can reuse recovered locations and artifacts without rewriting the collapse or changing existing IDs.

## Playable Java path

| Levels | Chapter | Learn by doing |
| --- | --- | --- |
| 1–12 | First steps | Run an instruction, print output, read comments, return values, use inputs, and store values |
| 13–24 | Numbers and decisions | Arithmetic, grouping, larger integers, booleans, and comparisons |
| 25–36 | Choosing what runs | Boolean operators, guards, if, else, switch, and scope |
| 37–48 | Repeating instructions | Updates, while, for, break, continue, and nested loops |
| 49–60 | Working with arrays | Create, read, modify, and traverse arrays and grids |
| 61–72 | Working with text | String methods, character loops, and building strings |
| 73–84 | Methods, collections, and classes | Library calls, lists, maps, a complete Java file, helpers, and objects |
| 85–90 | First Signal | Apply what you learned to restore the cistern relay |
| 91–179 | Java and data structures | Object-oriented Java, search, linked structures, trees, graphs, and dynamic programming |
| 180–202 | Advanced challenges | Hard and extreme problems across the preceding topics |

The path highlights the first unfinished level. Each level begins with a lesson and worked examples before the editor opens. Early lessons show the instructions the learner needs to edit. Level 82 introduces the full Java file. Passing the checks records the result and opens the next level. The practice board accepts any exercise and tracks its own results.

## Candy Crush case study

King gives each level a goal before play and uses a map to show which episodes and levels are available. At least one star is required on each level to move forward. The goal limits the decision the player has to make right now. The map and the completion reward make the result visible and give the player a clear next action. [King’s level-goal guide](https://candycrush.zendesk.com/hc/en-us/articles/360000754897-Which-game-modes-will-I-find) · [King’s progression guide](https://candycrush.zendesk.com/hc/en-us/articles/360007248018-Why-don-t-I-have-more-levels-to-play-on-the-map)

In a study of 60 Candy Crush players, participants felt the strongest match between skill and difficulty near their current level. Easy levels produced the least flow, and the hard levels were more frustrating than the regular ones. In a separate study, experienced players reported more frustration after near misses and a stronger urge to retry than after clear losses. These studies measured reactions during play sessions. [Skill and challenge study](https://pubmed.ncbi.nlm.nih.gov/33027060/) · [Near-miss study](https://pmc.ncbi.nlm.nih.gov/articles/PMC5445157/)

For Java, the design applies this as one small goal per level, a gradual increase in difficulty, immediate feedback from actual code, and a visible unlock. The first tasks change one instruction, then combine skills once the learner has used them separately. A failed check shows the expected and actual result, and the learner can edit and retry at their own pace.

## AI and rebuilding

The recovered Oracle will offer competing explanations and proposed changes. The player inspects evidence, writes tests, and decides what to do. A later optional provider adapter can accept an xAI API key or another supported provider key after the player enables it. Store credentials in the desktop OS credential store, redact them from logs, and send only content the player approves. The provider never determines grades or unlocks. The story and judging work offline. A provider connection may incur charges from that provider.

## Workboard

| Status | Item |
| --- | --- |
| Playable | Java level path from first instructions to advanced algorithms, including First Signal |
| After playtest | Refine the opening voice, puzzle size, and difficulty based on feedback |
| Planned | Workshop, story choices, artifact inventory, project scaffolds, and a second language binding |
| Planned | Optional provider adapter, secret storage, disclosure of outbound data, and offline narrative equivalents |

## Art direction

Use a dark landscape with one readable point of light, warm paper for the fieldbook, muted brass hardware, and a cool signal color for working equipment. The terminal should stay legible for long sessions. Draw new compositions and use the supplied images as references for material, hierarchy, and mood. [Reference index](references/README.md).
