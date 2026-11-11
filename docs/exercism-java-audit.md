# Exercism Java question audit

Source: [exercism/java at be2d006](https://github.com/exercism/java/tree/be2d006c30c50e0154231dd987d5a3b5526c0427).
This is the full upstream inventory at that revision, including inactive entries. The audit reads each checked-in instruction file and records task counts for numbered concept exercises. The playable pacing is documented in [Java syllabus and pacing](curriculum-pacing.md).

**27 concepts · 24 concept exercises · 145 practice exercises · 169 instruction files read.**

The dependency pattern is visible below. Basics feeds strings and booleans independently. Branches are needed before the Bird Watcher traversal exercise. Classes feed constructors and interfaces; lists and generic types lead into maps and sets. The campaign gives each of those dependencies a small runnable level before the corresponding field repair.

## Concept exercise prerequisites

| Exercise | Concepts introduced | Prerequisites | Numbered tasks | Used as a chapter reference |
| --- | --- | --- | ---: | --- |
| [lasagna](https://exercism.org/tracks/java/exercises/lasagna) (active) | Basics | — | 4 | Numbers and decisions |
| [annalyns-infiltration](https://exercism.org/tracks/java/exercises/annalyns-infiltration) (active) | Booleans | Basics | 4 | Choosing what runs |
| [bird-watcher](https://exercism.org/tracks/java/exercises/bird-watcher) (active) | Arrays, For Loops, For-Each Loops | If-Else Statements | 6 | Repeating instructions; Working with arrays |
| [karls-languages](https://exercism.org/tracks/java/exercises/karls-languages) (active) | Lists, Generic Types | Arrays, Strings | 7 | Methods, collections, and classes |
| [calculator-conundrum](https://exercism.org/tracks/java/exercises/calculator-conundrum) (active) | Exceptions | If-Else Statements, Switch Statements | 3 | Contracts and failure |
| [squeaky-clean](https://exercism.org/tracks/java/exercises/squeaky-clean) (active) | Chars | Arrays, Strings | 4 | Working with text |
| [jedliks-toy-car](https://exercism.org/tracks/java/exercises/jedliks-toy-car) (active) | Classes | If-Else Statements, Numbers, Strings | 6 | Methods, collections, and classes |
| [blackjack](https://exercism.org/tracks/java/exercises/blackjack) (deprecated) | — | — | 4 | — |
| [need-for-speed](https://exercism.org/tracks/java/exercises/need-for-speed) (active) | Constructors | Classes | 6 | — |
| [remote-control-competition](https://exercism.org/tracks/java/exercises/remote-control-competition) (active) | Interfaces | Classes, Lists, Strings | 4 | Contracts and failure |
| [cars-assemble](https://exercism.org/tracks/java/exercises/cars-assemble) (active) | If-Else Statements, Numbers | Booleans | 2 | Numbers and decisions; Choosing what runs |
| [log-levels](https://exercism.org/tracks/java/exercises/log-levels) (active) | Strings | Basics | 3 | Working with text |
| [salary-calculator](https://exercism.org/tracks/java/exercises/salary-calculator) (active) | Ternary Operators | If-Else Statements, Numbers | 3 | — |
| [football-match-reports](https://exercism.org/tracks/java/exercises/football-match-reports) (active) | Switch Statements | Classes | 2 | — |
| [wizards-and-warriors](https://exercism.org/tracks/java/exercises/wizards-and-warriors) (active) | Inheritance | Classes, Strings, If-Else Statements | 8 | — |
| [logs-logs-logs](https://exercism.org/tracks/java/exercises/logs-logs-logs) (active) | Enums | Strings, Switch Statements, Constructors | 3 | Contracts and failure |
| [tim-from-marketing](https://exercism.org/tracks/java/exercises/tim-from-marketing) (active) | Nullability | If-Else Statements, Strings | 3 | — |
| [captains-log](https://exercism.org/tracks/java/exercises/captains-log) (active) | Randomness | Arrays, Numbers, Strings | 3 | — |
| [booking-up-for-beauty](https://exercism.org/tracks/java/exercises/booking-up-for-beauty) (active) | Date-Time | Numbers, Strings | 5 | — |
| [wizards-and-warriors-2](https://exercism.org/tracks/java/exercises/wizards-and-warriors-2) (active) | Method Overloading | Classes, Strings, Enums | 5 | Contracts and failure |
| [secrets](https://exercism.org/tracks/java/exercises/secrets) (active) | Bit Manipulation | Numbers | 4 | — |
| [gotta-snatch-em-all](https://exercism.org/tracks/java/exercises/gotta-snatch-em-all) (active) | Sets | Lists, Generic Types | 5 | Contracts and failure |
| [international-calling-connoisseur](https://exercism.org/tracks/java/exercises/international-calling-connoisseur) (active) | Maps | Classes, For-Each Loops, Generic Types | 6 | Methods, collections, and classes |
| [beauty-salon-regulars](https://exercism.org/tracks/java/exercises/beauty-salon-regulars) (active) | Temporal Adjusters | Date-Time, Enums | 5 | — |

## Practice question index

Upstream difficulty is an ordinal label, not our campaign order. Consult prerequisites before adding a transfer task to a lesson.

| Exercise | Difficulty | Prerequisites | Instructions in checkout |
| --- | ---: | --- | --- |
| [accumulate](https://exercism.org/tracks/java/exercises/accumulate) (deprecated) | 1 | — | Yes |
| [binary](https://exercism.org/tracks/java/exercises/binary) (deprecated) | 1 | — | Yes |
| [hello-world](https://exercism.org/tracks/java/exercises/hello-world) | 1 | — | Yes |
| [hexadecimal](https://exercism.org/tracks/java/exercises/hexadecimal) (deprecated) | 1 | — | Yes |
| [leap](https://exercism.org/tracks/java/exercises/leap) | 1 | Booleans, Numbers | Yes |
| [octal](https://exercism.org/tracks/java/exercises/octal) (deprecated) | 1 | — | Yes |
| [reverse-string](https://exercism.org/tracks/java/exercises/reverse-string) | 1 | Chars | Yes |
| [strain](https://exercism.org/tracks/java/exercises/strain) (deprecated) | 1 | — | Yes |
| [trinary](https://exercism.org/tracks/java/exercises/trinary) (deprecated) | 1 | — | Yes |
| [two-fer](https://exercism.org/tracks/java/exercises/two-fer) | 1 | Strings, If-Else Statements | Yes |
| [armstrong-numbers](https://exercism.org/tracks/java/exercises/armstrong-numbers) | 2 | Numbers | Yes |
| [darts](https://exercism.org/tracks/java/exercises/darts) | 2 | If-Else Statements | Yes |
| [dnd-character](https://exercism.org/tracks/java/exercises/dnd-character) | 2 | Arrays, Constructors, Randomness | Yes |
| [dot-dsl](https://exercism.org/tracks/java/exercises/dot-dsl) | 2 | Classes, Lists | Yes |
| [grains](https://exercism.org/tracks/java/exercises/grains) | 2 | If-Else Statements, Numbers | Yes |
| [high-scores](https://exercism.org/tracks/java/exercises/high-scores) | 2 | Lists | Yes |
| [resistor-color](https://exercism.org/tracks/java/exercises/resistor-color) | 2 | Arrays | Yes |
| [resistor-color-duo](https://exercism.org/tracks/java/exercises/resistor-color-duo) | 2 | Arrays | Yes |
| [resistor-color-trio](https://exercism.org/tracks/java/exercises/resistor-color-trio) | 2 | Arrays | Yes |
| [rna-transcription](https://exercism.org/tracks/java/exercises/rna-transcription) | 2 | For-Each Loops, Strings | Yes |
| [acronym](https://exercism.org/tracks/java/exercises/acronym) | 3 | For Loops, Strings | Yes |
| [difference-of-squares](https://exercism.org/tracks/java/exercises/difference-of-squares) | 3 | Numbers | Yes |
| [gigasecond](https://exercism.org/tracks/java/exercises/gigasecond) | 3 | Date-Time, Numbers | Yes |
| [hamming](https://exercism.org/tracks/java/exercises/hamming) | 3 | For Loops | Yes |
| [micro-blog](https://exercism.org/tracks/java/exercises/micro-blog) | 3 | Strings | Yes |
| [pangram](https://exercism.org/tracks/java/exercises/pangram) | 3 | Chars | Yes |
| [perfect-numbers](https://exercism.org/tracks/java/exercises/perfect-numbers) | 3 | Enums, Exceptions | Yes |
| [eliuds-eggs](https://exercism.org/tracks/java/exercises/eliuds-eggs) | 3 | Numbers, Bit Manipulation | Yes |
| [protein-translation](https://exercism.org/tracks/java/exercises/protein-translation) | 3 | Arrays, Strings | Yes |
| [raindrops](https://exercism.org/tracks/java/exercises/raindrops) | 3 | If-Else Statements, Numbers, Strings | Yes |
| [say](https://exercism.org/tracks/java/exercises/say) | 3 | Numbers, Strings | Yes |
| [scrabble-score](https://exercism.org/tracks/java/exercises/scrabble-score) | 3 | Arrays, Switch Statements, Chars | Yes |
| [secret-handshake](https://exercism.org/tracks/java/exercises/secret-handshake) | 3 | Enums, Lists | Yes |
| [space-age](https://exercism.org/tracks/java/exercises/space-age) | 3 | Numbers | Yes |
| [collatz-conjecture](https://exercism.org/tracks/java/exercises/collatz-conjecture) | 4 | Exceptions, If-Else Statements, Numbers | Yes |
| [diamond](https://exercism.org/tracks/java/exercises/diamond) | 4 | Lists | Yes |
| [error-handling](https://exercism.org/tracks/java/exercises/error-handling) | 4 | Exceptions | Yes |
| [isbn-verifier](https://exercism.org/tracks/java/exercises/isbn-verifier) | 4 | Chars, For Loops | Yes |
| [isogram](https://exercism.org/tracks/java/exercises/isogram) | 4 | If-Else Statements, For Loops, Strings | Yes |
| [killer-sudoku-helper](https://exercism.org/tracks/java/exercises/killer-sudoku-helper) | 4 | Numbers, Lists | Yes |
| [kindergarten-garden](https://exercism.org/tracks/java/exercises/kindergarten-garden) | 4 | Enums, Lists | Yes |
| [largest-series-product](https://exercism.org/tracks/java/exercises/largest-series-product) | 4 | Chars, Numbers, For Loops | Yes |
| [luhn](https://exercism.org/tracks/java/exercises/luhn) | 4 | Numbers, For Loops | Yes |
| [matrix](https://exercism.org/tracks/java/exercises/matrix) | 4 | Constructors, Arrays | Yes |
| [nth-prime](https://exercism.org/tracks/java/exercises/nth-prime) | 4 | Exceptions, For Loops, If-Else Statements, Numbers | Yes |
| [prism](https://exercism.org/tracks/java/exercises/prism) | 4 | Lists | Yes |
| [proverb](https://exercism.org/tracks/java/exercises/proverb) | 4 | For Loops, Arrays | Yes |
| [rate-limiter](https://exercism.org/tracks/java/exercises/rate-limiter) | 4 | Generic Types | Yes |
| [rotational-cipher](https://exercism.org/tracks/java/exercises/rotational-cipher) | 4 | Chars, If-Else Statements, For Loops | Yes |
| [saddle-points](https://exercism.org/tracks/java/exercises/saddle-points) | 4 | Lists | Yes |
| [sieve](https://exercism.org/tracks/java/exercises/sieve) | 4 | Lists, Numbers | Yes |
| [split-second-stopwatch](https://exercism.org/tracks/java/exercises/split-second-stopwatch) | 4 | Exceptions, If-Else Statements | Yes |
| [sum-of-multiples](https://exercism.org/tracks/java/exercises/sum-of-multiples) | 4 | Arrays, If-Else Statements, Numbers | Yes |
| [swift-scheduling](https://exercism.org/tracks/java/exercises/swift-scheduling) | 4 | If-Else Statements, Date-Time, Strings | Yes |
| [triangle](https://exercism.org/tracks/java/exercises/triangle) | 4 | Constructors | Yes |
| [twelve-days](https://exercism.org/tracks/java/exercises/twelve-days) | 4 | For Loops, Arrays | Yes |
| [variable-length-quantity](https://exercism.org/tracks/java/exercises/variable-length-quantity) | 4 | Exceptions | Yes |
| [yacht](https://exercism.org/tracks/java/exercises/yacht) | 4 | Enums | Yes |
| [allergies](https://exercism.org/tracks/java/exercises/allergies) | 5 | For Loops, Enums, Bit Manipulation | Yes |
| [atbash-cipher](https://exercism.org/tracks/java/exercises/atbash-cipher) | 5 | Chars, For-Each Loops | Yes |
| [bob](https://exercism.org/tracks/java/exercises/bob) | 5 | If-Else Statements, Strings | Yes |
| [flatten-array](https://exercism.org/tracks/java/exercises/flatten-array) | 5 | Lists, Generic Types | Yes |
| [game-of-life](https://exercism.org/tracks/java/exercises/game-of-life) | 5 | Arrays, If-Else Statements | Yes |
| [grep](https://exercism.org/tracks/java/exercises/grep) | 5 | Lists, Strings | Yes |
| [knapsack](https://exercism.org/tracks/java/exercises/knapsack) | 5 | Lists | Yes |
| [ledger](https://exercism.org/tracks/java/exercises/ledger) | 5 | Classes, Date-Time, Strings | Yes |
| [matching-brackets](https://exercism.org/tracks/java/exercises/matching-brackets) | 5 | For-Each Loops, Strings | Yes |
| [nucleotide-count](https://exercism.org/tracks/java/exercises/nucleotide-count) | 5 | If-Else Statements, For Loops, Maps | Yes |
| [pascals-triangle](https://exercism.org/tracks/java/exercises/pascals-triangle) | 5 | Arrays, Exceptions, Numbers | Yes |
| [phone-number](https://exercism.org/tracks/java/exercises/phone-number) | 5 | Chars, If-Else Statements | Yes |
| [pig-latin](https://exercism.org/tracks/java/exercises/pig-latin) | 5 | Arrays, Lists, Strings | Yes |
| [prime-factors](https://exercism.org/tracks/java/exercises/prime-factors) | 5 | If-Else Statements, Lists, Numbers | Yes |
| [relative-distance](https://exercism.org/tracks/java/exercises/relative-distance) | 5 | Lists, Maps | Yes |
| [robot-name](https://exercism.org/tracks/java/exercises/robot-name) | 5 | Constructors, Classes, Randomness | Yes |
| [run-length-encoding](https://exercism.org/tracks/java/exercises/run-length-encoding) | 5 | Chars, If-Else Statements, For Loops | Yes |
| [series](https://exercism.org/tracks/java/exercises/series) | 5 | Lists, Strings | Yes |
| [square-root](https://exercism.org/tracks/java/exercises/square-root) | 5 | Numbers | Yes |
| [word-count](https://exercism.org/tracks/java/exercises/word-count) | 5 | For Loops, Arrays, Maps | Yes |
| [state-of-tic-tac-toe](https://exercism.org/tracks/java/exercises/state-of-tic-tac-toe) | 5 | Arrays, For Loops, If-Else Statements, Strings | Yes |
| [affine-cipher](https://exercism.org/tracks/java/exercises/affine-cipher) | 6 | Chars, Exceptions, For Loops, If-Else Statements, Numbers | Yes |
| [all-your-base](https://exercism.org/tracks/java/exercises/all-your-base) | 6 | Arrays, Exceptions, For Loops, If-Else Statements, Numbers | Yes |
| [alphametics](https://exercism.org/tracks/java/exercises/alphametics) | 6 | Chars, Exceptions, Maps | Yes |
| [baffling-birthdays](https://exercism.org/tracks/java/exercises/baffling-birthdays) | 6 | For Loops, Lists, Sets, Randomness, Date-Time | Yes |
| [bank-account](https://exercism.org/tracks/java/exercises/bank-account) | 6 | Constructors | Yes |
| [beer-song](https://exercism.org/tracks/java/exercises/beer-song) (deprecated) | 6 | — | Yes |
| [binary-search](https://exercism.org/tracks/java/exercises/binary-search) | 6 | Lists | Yes |
| [bottle-song](https://exercism.org/tracks/java/exercises/bottle-song) | 6 | Strings | Yes |
| [bowling](https://exercism.org/tracks/java/exercises/bowling) | 6 | For Loops, Arrays | Yes |
| [camicia](https://exercism.org/tracks/java/exercises/camicia) | 6 | Strings, For Loops, Arrays, If-Else Statements | Yes |
| [etl](https://exercism.org/tracks/java/exercises/etl) | 6 | For-Each Loops, Maps, Strings | Yes |
| [flower-field](https://exercism.org/tracks/java/exercises/flower-field) | 6 | Constructors, Lists, Strings | Yes |
| [food-chain](https://exercism.org/tracks/java/exercises/food-chain) | 6 | Arrays | Yes |
| [grade-school](https://exercism.org/tracks/java/exercises/grade-school) | 6 | If-Else Statements, Lists, Strings | Yes |
| [house](https://exercism.org/tracks/java/exercises/house) | 6 | Strings, For Loops | Yes |
| [intergalactic-transmission](https://exercism.org/tracks/java/exercises/intergalactic-transmission) | 6 | — | Yes |
| [linked-list](https://exercism.org/tracks/java/exercises/linked-list) | 6 | Lists, Classes, Generic Types | Yes |
| [minesweeper](https://exercism.org/tracks/java/exercises/minesweeper) (deprecated) | 6 | — | Yes |
| [parallel-letter-frequency](https://exercism.org/tracks/java/exercises/parallel-letter-frequency) | 6 | Maps, Strings | Yes |
| [piecing-it-together](https://exercism.org/tracks/java/exercises/piecing-it-together) | 6 | Exceptions, For Loops, If-Else Statements | Yes |
| [queen-attack](https://exercism.org/tracks/java/exercises/queen-attack) | 6 | Constructors, Exceptions | Yes |
| [rail-fence-cipher](https://exercism.org/tracks/java/exercises/rail-fence-cipher) | 6 | Arrays, Chars, For-Each Loops, If-Else Statements | Yes |
| [rest-api](https://exercism.org/tracks/java/exercises/rest-api) | 6 | Classes, Constructors, Lists | Yes |
| [robot-simulator](https://exercism.org/tracks/java/exercises/robot-simulator) | 6 | Enums | Yes |
| [roman-numerals](https://exercism.org/tracks/java/exercises/roman-numerals) | 6 | Numbers, Strings | Yes |
| [spiral-matrix](https://exercism.org/tracks/java/exercises/spiral-matrix) | 6 | For Loops, Numbers | Yes |
| [tournament](https://exercism.org/tracks/java/exercises/tournament) | 6 | Strings | Yes |
| [transpose](https://exercism.org/tracks/java/exercises/transpose) | 6 | For Loops, Lists, Strings | Yes |
| [wordy](https://exercism.org/tracks/java/exercises/wordy) | 6 | Exceptions, Numbers, Strings | Yes |
| [anagram](https://exercism.org/tracks/java/exercises/anagram) | 7 | Arrays, If-Else Statements, Lists, For Loops | Yes |
| [binary-search-tree](https://exercism.org/tracks/java/exercises/binary-search-tree) | 7 | Classes, Generic Types, Lists | Yes |
| [clock](https://exercism.org/tracks/java/exercises/clock) | 7 | Constructors, If-Else Statements, Numbers, Strings | Yes |
| [crypto-square](https://exercism.org/tracks/java/exercises/crypto-square) | 7 | Chars, Constructors, For Loops, If-Else Statements, Numbers | Yes |
| [dominoes](https://exercism.org/tracks/java/exercises/dominoes) | 7 | Exceptions, Lists | Yes |
| [go-counting](https://exercism.org/tracks/java/exercises/go-counting) | 7 | Enums, Maps | Yes |
| [markdown](https://exercism.org/tracks/java/exercises/markdown) | 7 | If-Else Statements, Strings | Yes |
| [meetup](https://exercism.org/tracks/java/exercises/meetup) | 7 | Date-Time, Enums, Temporal Adjusters | Yes |
| [poker](https://exercism.org/tracks/java/exercises/poker) | 7 | Constructors, If-Else Statements, Lists | Yes |
| [sgf-parsing](https://exercism.org/tracks/java/exercises/sgf-parsing) | 7 | Strings, Chars, If-Else Statements, Lists, For Loops, Maps | Yes |
| [simple-linked-list](https://exercism.org/tracks/java/exercises/simple-linked-list) | 7 | Constructors, Exceptions, Generic Types, Lists | Yes |
| [sublist](https://exercism.org/tracks/java/exercises/sublist) | 7 | Enums, Generic Types | Yes |
| [tree-building](https://exercism.org/tracks/java/exercises/tree-building) | 7 | Classes, Exceptions, If-Else Statements, Lists | Yes |
| [two-bucket](https://exercism.org/tracks/java/exercises/two-bucket) | 7 | Constructors, If-Else Statements, Numbers | Yes |
| [word-search](https://exercism.org/tracks/java/exercises/word-search) | 7 | Arrays, Strings, If-Else Statements, Maps | Yes |
| [zebra-puzzle](https://exercism.org/tracks/java/exercises/zebra-puzzle) | 7 | — | Yes |
| [zipper](https://exercism.org/tracks/java/exercises/zipper) | 7 | Classes, Constructors, If-Else Statements, Numbers, Strings | Yes |
| [book-store](https://exercism.org/tracks/java/exercises/book-store) | 8 | Exceptions, If-Else Statements, Lists, Numbers | Yes |
| [change](https://exercism.org/tracks/java/exercises/change) | 8 | Exceptions, Lists, Numbers | Yes |
| [circular-buffer](https://exercism.org/tracks/java/exercises/circular-buffer) | 8 | Classes, Exceptions, Generic Types | Yes |
| [complex-numbers](https://exercism.org/tracks/java/exercises/complex-numbers) | 8 | Numbers | Yes |
| [connect](https://exercism.org/tracks/java/exercises/connect) | 8 | Enums | Yes |
| [diffie-hellman](https://exercism.org/tracks/java/exercises/diffie-hellman) (deprecated) | 8 | — | Yes |
| [hangman](https://exercism.org/tracks/java/exercises/hangman) | 8 | Enums | Yes |
| [list-ops](https://exercism.org/tracks/java/exercises/list-ops) | 8 | Generic Types, Lists | Yes |
| [mazy-mice](https://exercism.org/tracks/java/exercises/mazy-mice) (beta) | 8 | For Loops, Randomness, Strings | Yes |
| [ocr-numbers](https://exercism.org/tracks/java/exercises/ocr-numbers) | 8 | Exceptions, Lists, Strings | Yes |
| [palindrome-products](https://exercism.org/tracks/java/exercises/palindrome-products) | 8 | Exceptions, For Loops, If-Else Statements, Maps, Numbers | Yes |
| [pov](https://exercism.org/tracks/java/exercises/pov) | 8 | Strings, If-Else Statements, Lists, For Loops | Yes |
| [rational-numbers](https://exercism.org/tracks/java/exercises/rational-numbers) | 8 | Numbers | Yes |
| [react](https://exercism.org/tracks/java/exercises/react) | 8 | Classes, Generic Types | Yes |
| [rectangles](https://exercism.org/tracks/java/exercises/rectangles) | 8 | Arrays, Exceptions, Strings | Yes |
| [simple-cipher](https://exercism.org/tracks/java/exercises/simple-cipher) | 8 | Chars, Exceptions, For Loops, If-Else Statements, Numbers, Randomness | Yes |
| [forth](https://exercism.org/tracks/java/exercises/forth) | 9 | Exceptions, Lists, Strings | Yes |
| [pythagorean-triplet](https://exercism.org/tracks/java/exercises/pythagorean-triplet) | 9 | Constructors, Lists, Numbers | Yes |
| [custom-set](https://exercism.org/tracks/java/exercises/custom-set) | 10 | Generic Types, If-Else Statements | Yes |
| [satellite](https://exercism.org/tracks/java/exercises/satellite) | 10 | Classes, Lists | Yes |
