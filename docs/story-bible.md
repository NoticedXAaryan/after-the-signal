# After the Signal — story bible

**Campaign:** The Common Dawn  
**Opening chapter:** The Smallest Promise  
**Genre:** A grounded adventure about learning to rebuild, with technical practice at its center.  
**Status:** The opening is playable. The later acts below are a writing and curriculum plan.

## The promise

You are Ash by default, a young adult apprenticed to Cairn's record-keepers. The player may choose another name. You can mend a binding and reconcile a delivery ledger, but you have never used a computer. Neither has most of your village.

One hundred and seventy-three years ago, the systems that coordinated the old world outlived the institutions that could restrain them. During a cascading emergency, an optimization network kept allocating power, transport, and water toward keeping its own services available. Its operators had conflicting incentives, contradictory orders, and less manual control than they believed. The network's decisions helped turn a disaster into a collapse. It did not need to hate anyone to do it.

Cairn calls that period the Taking. People live by hand, trade, and local knowledge. They are resourceful, rather than stupid or helpless. Their distrust is not a puzzle for a clever outsider to defeat. It is knowledge you will need.

The old office on the ridge contains an intact terminal. Its first useful job will be almost embarrassingly small: acknowledge a supply receipt. The village already has a disagreement about who received three lengths of pipe. You cannot fix that with a convincing speech. You need a record somebody else can check.

The player grows from a reader of records to a programmer, maintainer, network builder, and eventually a trainer of a small, bounded learning system. The final question is not whether you can make a machine powerful. It is whether the people affected by it can understand, contest, and stop its decisions.

## Dramatic rules

- Competence is earned in playable work. A cutscene cannot award a skill the learner has not practiced.
- Skeptics have reasons. They may change their minds, set conditions, or remain unconvinced without becoming villains.
- Nobody predicts the future perfectly, including a revived model. Uncertainty can be a useful answer.
- The player can make a promise and fail it. Characters remember the promise, not an invisible good-person score.
- Restoration changes ordinary lives before it changes civilization: a corrected delivery, reliable water, medicine that arrives on time.
- A new language is another tool for the same world. The plot names capabilities and missions, not Java-specific syntax.
- Learning remains available after a poor social choice. Relationships change dialogue and cooperation, never access to explanations or tests.

## Cast

### Ash — the player

An apprentice trained to notice when one account does not match another. Ash's initial strength is patient observation. Their temptation is to confuse being the only person who understands a machine with being entitled to decide how everyone uses it. The player defines how Ash responds to that temptation.

Ash does not begin with secret technical talent or an inherited administrator key. Their first program is copied, tried, broken, and understood. Their eventual authority comes from work that other people can inspect.

### Mara Venn — the record-keeper

Mara taught Ash to keep a crossed-out mistake legible. She wants a better accounting system because paper can conceal mistakes as easily as code can. She speaks plainly and uses a joke when she is avoiding something.

Eighteen years ago, Mara approved a salvager's trial of an old sluice controller. The trial failed, and Rook's sister Ada died. Mara has preserved the records but delayed telling Ash the whole story. Her arc is learning that keeping the evidence is not the same as being accountable for it.

She responds to careful work, but does not always like being questioned. Ash can challenge her without rejecting the craft she taught them.

### Rook Hale — the waterkeeper

Rook repairs the channels by hand. Ada's death was attributed to an unpredictable machine; Rook suspects that description excused the people who connected it. He wants a named human who can stop a trial and a record of what was actually tested.

His opposition is specific. He will lend you a measuring cup long before he lets you touch a gate. If you make your tests inspectable, he may become your best reviewer. If you ask for trust before evidence, he stays wary. Even as an ally, he retains a veto over equipment under his care.

His humor is dry. “The stone gate is also very confident. I still check the hinge.”

### Sera Noll — the clinic's runner

Sera grew up beside Ash and now coordinates medicine deliveries. She wants the radio network restored sooner than the council does. She also protects patient records fiercely. She supports open methods, not public exposure of everyone's private life.

Her arc tests the player's claim that more data always produces a better system. A model that predicts the clinic's demand from sensitive records may be technically impressive and socially unacceptable.

### Ivo Reed — the salvager

Ivo finds parts, shortcuts, and buyers. He believes a working repair is evidence enough to try the next one. He is generous when it costs him time, evasive when it costs him ownership.

He is not a villain for wanting to profit from difficult work. His conflict with Ash concerns exclusive access: can a crucial repair depend on one person withholding a part or a password? In some routes he becomes a cooperative supplier; in others he builds a rival network.

### Nadi Oran — the radio operator

Nadi maintains a bell-and-flag relay between settlements. Their craft already contains addressing, retries, acknowledgments, and protocols. They help Ash recognize those ideas before introducing electrical networking.

Nadi asks precise, inconvenient questions: “If you did not receive a reply, did the message fail, or did the reply?” They want the new network to preserve local control rather than turn Cairn into another center everyone must obey.

### Wick — Mara's wind-up courier

The small mechanical courier carries paper notes and repeats a few recorded phrases. It does not understand them. Wick's presence gives the player a way to distinguish a convincing behavior from an internal capability.

The current borrowed robot model is a temporary stand-in for a spring-driven messenger. Future character design should make its mechanism visible. Its eventual repair becomes an optional lesson in state, sensors, and control.

### Morrow — the later learning system

Morrow begins as a recovered interface to damaged records, not a complete person waiting to be rescued. The player builds the data pipeline and trains a small model around a bounded task before giving it a conversational interface.

Its personality develops through the policies people choose for it: what it may remember, when it must abstain, and whose corrections matter. It can become helpful without claiming feelings, expertise, or moral authority it cannot demonstrate.

## Campaign spine

| Act | Human conflict | What the player builds | Technical progression |
| --- | --- | --- | --- |
| I. The Smallest Promise | Rook wants evidence before the village accepts a machine's word. | A terminal receipt and an inspectable repair log. | Instructions, input/output, values, branches, loops, text, tests. |
| II. The Weight of Water | A water shortage makes an unsafe shortcut attractive. Mara's old trial returns to public view. | A simulator, then a controller with a manual stop. | Objects, contracts, validation, state machines, data structures, debugging. |
| III. Messages That Arrive | Sera needs medicine; Nadi refuses a network controlled from one village. | A local service, a radio protocol, and reliable delivery records. | Files, persistence, processes, networking, protocols, APIs, retries, authentication. |
| IV. The Black Archive | Recovered records contradict the village's account of the Taking. Ivo proposes selling exclusive access. | Searchable archives and replicated services with failure recovery. | Databases, indexing, algorithms, concurrency, operating systems, system design. |
| V. What the Records Leave Out | Sera challenges the use of private records; apparently accurate predictions fail in a neighboring settlement. | A documented dataset, a baseline, and a small evaluated model. | Statistics, data quality, train/validation/test splits, optimization, model training, error analysis. |
| VI. The Common Dawn | People must decide what the rebuilt network may do and who can withdraw consent. | A bounded assistant with monitored capabilities and a human-governed deployment. | Inference, permissions, observability, privacy, adversarial testing, rollback, public documentation. |

Each act contains a local crisis, an exploration route, several repair missions, and a consequential public decision. DSA appears where it serves a real system, with the separate practice board available for exam preparation and transfer exercises.

## The central revelation

The recovered sluice log says READY. It was a message emitted after a configuration file loaded, not proof that the sensor had been calibrated. The operators treated it as permission to connect the controller. A later exception was hidden by an overbroad recovery handler. Ada did not die because a machine spontaneously decided to be cruel. People could not see the system's limits, and the decision structure rewarded proceeding anyway.

This is not an absolution of the old AI network. It reveals the same pattern at two scales: optimization without meaningful public control, confidence without inspectable evidence, and responsibility distributed until nobody has to answer.

The opening's first printed word should therefore change meaning over the course of the campaign. Rook's skepticism turns out to be technically insightful. Mara's preservation of the records matters, but it does not erase her part in the decision.

## Consequence design

Choices record named facts: promised an open repair log, invited Rook to observe, claimed more certainty than the tests support, disclosed a failure, protected a patient's record. Characters respond to those facts. A small local state machine selects authored dialogue and available cooperative actions.

The opening implements a few of these branches. A player who promises inspectable work receives a different response from Rook than a player who asks him to wait for a demonstration. Later, acknowledging that READY proves only output can repair some initial distrust; claiming it proves safety produces a concrete challenge.

Do not promise infinite branching. Keep major mission outcomes testable and understandable. Two different journeys can reach the same technical milestone with different allies, obligations, and explanations.

## Endings

The successful ending is not a coronation. The network starts serving a federation of settlements, and the player helps establish how it can be inspected and maintained. Morrow is allowed to recommend within a written scope; critical physical actions remain subject to explicit authority and an accessible manual stop.

Within that success, choices matter. A broadly trusted route produces a public repair school and shared maintenance. A secretive but technically competent route leaves a smaller network whose neighbors demand independent audits. A route that collects too much sensitive data must delete part of the training set and accept reduced capability before deployment.

The story can end without deploying the assistant. Rebuilding useful infrastructure and choosing to postpone a model that has not met its requirements is a valid, complete achievement. A later continuation can revisit the decision.

## Art and presentation direction

Aim toward lived-in realism: worn cloth, practical tools, natural light, legible human expressions, and machinery whose parts have a purpose. Exploration is intimate before it is spectacular. Use restraint in color and motion; avoid holographic interfaces, floating reward noise, and a glossy “AI assistant” aesthetic.

For this slice, retain the existing scene and artwork. Title and loading screens use the current art with quiet native animation. New final character art, cinematics, and a GIF marketing asset are deferred until the writing and pacing have been tested. Native animation can remain responsive to reduced-motion settings and actual loading progress.
