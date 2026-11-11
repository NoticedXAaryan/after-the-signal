# Java syllabus and pacing

The campaign starts with a real Java program, then teaches one operation at a time. A chapter ends with a graded field repair that uses several of those operations together. Its test cases cover a normal input, a boundary, and a likely wrong assumption where those distinctions apply.

Sources: [Exercism Java track configuration](https://github.com/exercism/java/blob/be2d006c30c50e0154231dd987d5a3b5526c0427/config.json), its linked concept exercises, and [University of Helsinki Java Programming, Part 1](https://java-programming.mooc.fi/part-1/). The pinned source has 27 concepts, 24 concept-exercise records, and 145 practice-exercise records, including deprecated entries. The campaign borrows the dependency graph and adapts selected tasks under MIT; Helsinki informs pacing. See the [question audit](exercism-java-audit.md) for the full upstream index and coverage.

| Chapter | Build the mental model | Prove it in a new task | Upstream anchor |
| --- | --- | --- | --- |
| First steps | Output, exact newlines, comments, return versus print, parameters, variables, text, reading one input line | Make a terminal read a name and print a two-line receipt | Hello World; Helsinki's printing and input units |
| Numbers and decisions | Operators, grouping, integer division, remainder, larger numbers, comparison boundaries | Compose preparation and elapsed time in one calculation | Lasagna |
| Choosing what runs | Truth tables, short circuit, branching, early return, local scope | Combine two rescue rules and test both paths | Annalyn's Infiltration; Cars, Assemble! |
| Repeating instructions | Count and trace each iteration; test zero and one before many | Tally the fuel delivered over a changing sequence | Bird Watcher (repetition pattern) |
| Working with arrays | Indexes, bounds, aliases, empty arrays, iteration | Count active days in a bird log without missing the first or last day | Bird Watcher |
| Working with text | Length, slices, delimiters, equality, exact whitespace | Recover a message that can contain its own colon | Log Levels |
| Methods, collections, and classes | Read a full method, create helpers, use lists and maps, construct objects | Make one car drive repeatedly without changing another car | Jedlik's Toy Car |
| Contracts and failure | Distinct values, overloads, interfaces, exceptional input, and unique records | Enforce an explicit status contract and handle unknown inputs | Logs, Logs, Logs!; Wizards and Warriors 2; Calculator Conundrum; Remote Control Competition; Gotta Snatch 'Em All |
| Cistern, OOP, and DSA | Compose, measure, and improve working programs | Restore the cistern and continue through structures, algorithmic patterns, and timed challenges | Local curriculum; transfer links where appropriate |

Every campaign checkpoint is in the normal path, with an optional prediction and a worked example using a different input or problem. A wrong prediction explains the mistake without costing stars. Graded Java decides whether the next level opens. Existing saves use stable exercise IDs; inserted levels can become the next unfinished task without erasing completed levels.

The separate Open Practice board remains available at any time. The question audit is a reference library, not the order a beginner is expected to follow. The Fieldbook links to four optional library labs: seeded randomness, dates, temporal adjusters, and bit masks. These apply Exercism concepts that the terminal repair does not need.
