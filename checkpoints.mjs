// Prompt, choices, correct index, explanation.
export const checkpoints = {
  sum: [
    ['What should the accumulator contain before the first iteration?',['0','a[0]','1'],0,'Zero is the additive identity and also handles an empty array.'],
    ['Two entries are Integer.MAX_VALUE. What keeps the sum valid?',['A long accumulator','A final cast to long','Arrays.sort'],0,'Keep the running value in long. A cast after overflow cannot recover the lost bits.'],
  ],
  'first-index': [
    ['For [5, 1, 5] and target 5, which index wins?',['0','2','Either index'],0,'The first matching position wins. Return as soon as you see it.'],
    ['What would binary search need that this array may lack?',['A monotonic comparison predicate','Extra memory','A long target'],0,'With unsorted values you cannot decide which half to discard.'],
  ],
  'safe-product': [
    ['Which expression widens before multiplying?',['(long)(a * b)','(long)a * b','long result = a * b'],1,'Promote an operand so the multiplication itself uses 64 bits.'],
    ['Does using long make multiplication depend on n?',['Yes','No, the operand width is fixed'],1,'This is a fixed-width multiplication, so it takes constant time.'],
  ],
  'floor-division': [
    ['What is -7 / 3 using ordinary Java int division?',['-2','-3','-2.333…'],0,'Integer division truncates toward zero. The mathematical floor is -3.'],
    ['When is truncation different from floor for a positive divisor?',['Whenever the dividend is negative and the remainder is nonzero','For every negative dividend','Only when the divisor is odd'],0,'An exact negative quotient needs no adjustment.'],
  ],
  'copy-array': [
    ['Does int[] copy = a allocate a new array?',['Yes','No'],1,'The assignment creates a second reference to the same array.'],
    ['Why is a.clone() enough here?',['Each element is an int value','clone always deep-copies objects','The caller cannot see changes'],0,'Primitive values are copied directly. A 2D array would need separate row copies.'],
  ],
  'string-equality': [
    ['What can make == appear to work for two strings?',['Identical literals may share an object','It always compares content','Java unboxes String into char[]'],0,'Interned strings may share a reference, masking the identity comparison.'],
    ['Which handles two possibly null strings?',['Objects.equals(a,b)','a.equals(b)','a.compareTo(b)==0'],0,'Objects.equals handles null before calling equals.'],
  ],
  'code-points': [
    ['How many UTF-16 units are in A🙂B?',['3','4','5'],1,'The emoji takes a surrogate pair. It still counts as one code point.'],
    ['Which index type does String.substring use?',['Code point index','UTF-16 unit index','Byte offset'],1,'String indices are UTF-16 code-unit offsets.'],
  ],
  join: [
    ['Where should a delimiter go when there are three words?',['Before every word','Between words only','After every word'],1,'Three items have two gaps. A check on the item index avoids a trailing delimiter.'],
    ['Why can concatenating one token at a time with + be expensive?',['It can repeatedly copy growing immutable strings','It changes the string pool order','It sorts the tokens'],0,'A StringBuilder avoids rebuilding the whole prefix on each append.'],
  ],
  'counter-object': [
    ['What should initialize the value field?',['The constructor','A static block','The first read'],0,'A constructor establishes the state of the new object.'],
    ['Which signature exposes a read without allowing direct writes?',['int value()','public int value','static int value'],0,'A getter can return a primitive copy while the field stays private.'],
  ],
  'independent-counters': [
    ['What would static int value do here?',['Give each Counter a separate value','Share the value across every instance','Make the value constant'],1,'Static state belongs to the class. Per-object counters use instance fields.'],
    ['Do new Counter() and another new Counter() alias the same object?',['Always','No, each creates a new object'],1,'Each new expression allocates a separate instance.'],
  ],
  'guarded-wallet': [
    ['Where should the nonnegative check live?',['In the wallet’s update method','In every caller only','In a print method'],0,'Put the invariant next to the mutation so every caller uses the same rule.'],
    ['Should a transaction that leaves exactly zero succeed?',['Yes','No'],0,'Zero satisfies a nonnegative invariant. Test that boundary.'],
  ],
  'value-equality': [
    ['Two Point records have the same coordinates. Does equals return true?',['Yes','No, only == can do that'],0,'A record’s default equals compares its component values.'],
    ['If equals returns true, what must be true of hashCode?',['Both hash codes must match','Hash codes must differ','No relationship is required'],0,'Hash-based collections rely on equal keys having the same hash code.'],
  ],
  'defensive-snapshot': [
    ['What happens if Snapshot stores the array reference unchanged?',['It observes the caller’s mutation','It freezes the original array','Java automatically clones it'],0,'Both references point at the same mutable array.'],
    ['Does final int[] prevent writing to an element?',['Yes','No, it prevents reassigning the reference'],1,'Final applies to the reference variable. Its target array can still change.'],
  ],
  'virtual-dispatch': [
    ['Animal pet = new Cat(); which speak method runs?',['Cat.speak','Animal.speak only','The declaration does not compile'],0,'An overridden instance method dispatches based on the runtime object.'],
    ['What does @Override catch?',['A signature mismatch that fails to override','An empty method body','A missing constructor call'],0,'The compiler checks that the annotated method really overrides or implements one.'],
  ],
  'strategy-object': [
    ['Where should the choice between doubling and negating live?',['Before the loop','In every output index','Inside Arrays.sort'],0,'Selecting a strategy once lets the loop use the same interface for both behaviors.'],
    ['Does a lambda implementing IntRule require a named class?',['Yes','No'],1,'A compatible functional interface has a single abstract method and can be implemented with a lambda.'],
  ],
  'queue-composition': [
    ['Which relationship describes Inbox owning a deque?',['Has-a','Is-a','Is equal to'],0,'Composition lets Inbox control a private implementation detail.'],
    ['Why avoid exposing pending directly?',['Callers could break the Inbox rules','Deque cannot be returned in Java','Returning it would always clone it'],0,'A getter that leaks the mutable deque allows callers to modify it behind the Inbox’s API.'],
  ],
  'two-sum': [
    ['Which extra cost buys expected linear lookup time?',['A HashMap of seen values','A recursive call stack','A sorted copy only'],0,'Hash lookup trades O(n) auxiliary storage for expected O(1) lookup per item.'],
    ['Can the pair reuse the current index when target = 2 × value?',['Yes','No'],1,'Look up the complement before inserting the current value.'],
  ],
  brackets: [
    ['Why does a frequency count fail for ([)]?',['It loses nesting order','It loses the number of parentheses','It cannot count two kinds'],0,'A stack remembers which opener must be closed next.'],
  ],
  'binary-search': [
    ['When the midpoint is too small, where can the next left bound start?',['mid','mid + 1','mid - 1'],1,'You already ruled out mid. Keeping it can prevent progress.'],
  ],
  'minimum-cover': [
    ['Why is a set alone insufficient when t is AABC?',['It loses the second A','It sorts the input','It loses uppercase'],0,'Track multiplicity for every required character.'],
  ],
  'reverse-list': [
    ['Which link must be saved before reversing current.next?',['The original next node','The list length','The head’s value'],0,'You need that saved reference to reach the unprocessed suffix.'],
  ],
  'window-max': [
    ['When a larger value enters, what happens to smaller values behind it in the deque?',['They can be removed from the back','They must always remain','They become the next maximum'],0,'A later larger value stays in the window at least as long as each dominated value.'],
  ],
  coins: [
    ['How many coins are needed to make amount zero?',['0','1','Unreachable'],0,'Zero is reachable without using a coin. Initialize dp[0] to 0.'],
  ],
  dijkstra: [
    ['You pop (node, 12) but dist[node] is 7. What now?',['Skip the stale entry','Raise dist to 12','Stop the algorithm'],0,'A better route already replaced that distance. The old heap record is stale.'],
  ],
  queens: [
    ['Why can you keep one choice per row?',['Two queens on the same row attack each other','A row may not contain a queen','Rows are processed in random order'],0,'With n queens and n rows, each valid placement has exactly one queen in each row.'],
  ],
  'range-sums': [
    ['Why use an array of n + 1 prefixes?',['There are n + 1 boundaries','There are n + 1 values','It prevents overflow'],0,'The extra zero represents the boundary before the first item.'],
    ['For many range queries on fixed data, what makes prefix sums faster than rescanning?',['Pay once to build, then subtract two entries','Sort the queries by size','Store every possible interval'],0,'The preprocessing is linear, and each half-open sum is a constant-time difference.'],
  ],
  'subarray-k': [
    ['Can a two-pointer positive-sum window solve arbitrary signed input?',['Yes, always','No, a negative can reverse the effect of moving a pointer'],1,'Use prefix frequencies when the sum is not monotonic under pointer moves.'],
    ['Why use a frequency map instead of a set of prefixes?',['Several earlier boundaries can have the same sum','A set cannot hold negative values','Sets always sort'],0,'Each matching earlier boundary contributes a different subarray.'],
  ],
  'fixed-window': [
    ['What changes between consecutive length-k windows?',['Only the entering and leaving values','Every value changes','The length increases by one'],0,'Update the sum using two elements. The middle overlap stays in place.'],
    ['When all sums are negative, why is best = 0 a bug?',['Zero may not be a legal window sum','It skips the final window','It creates an off-by-one index'],0,'Initialize best from the first real window.'],
  ],
  'lower-bound': [
    ['Which index is the lower bound of 9 in [1,4,7]?',['2','3','-1'],1,'The first valid boundary may be one past the array. Only read the value when the index is in range.'],
    ['Which boundary do you update when a[mid] equals target?',['Move hi to mid','Move lo to mid + 1','Return mid immediately'],0,'A duplicate may appear earlier. Keeping mid in the search preserves the candidate.'],
  ],
  'inversions': [
    ['In a sorted merge, right[j] < left[i]. How many left values form inversions with right[j]?',['Every remaining left value','Only left[i]','None'],0,'All remaining left values are at least left[i] and occur earlier in the original array.'],
    ['Should equal values add inversions?',['Yes','No'],1,'An inversion uses strict greater-than. Take the left value first on a tie.'],
  ],
  'warmer-days': [
    ['Is a day with the same temperature a match?',['Yes','No'],1,'The request says strictly warmer. Equal values remain unresolved.'],
    ['Why does the nested pop loop stay linear?',['Each index is pushed and popped at most once','The stack is always empty','The outer loop stops at the first match'],0,'Count operations over the whole traversal, not the loops in isolation.'],
  ],
  'bst-valid': [
    ['Is checking only parent–child comparisons enough?',['Yes','No, descendants can violate an ancestor’s bound'],1,'Pass lower and upper bounds down the tree.'],
    ['Why use long for initial open bounds?',['An int node might equal Integer.MIN_VALUE or MAX_VALUE','Comparing longs is faster','Recursion requires longs'],0,'The sentinels must lie strictly outside the int input domain.'],
  ],
  'meeting-rooms': [
    ['Does [0,4) conflict with [4,6)?',['Yes','No'],1,'The first meeting has released its room by time 4.'],
    ['What belongs at the top of the heap?',['The earliest current end time','The latest end time','The largest start time'],0,'You need the room that becomes free first.'],
  ],
  bfs: [
    ['For equal-cost edges, which structure finds layers in increasing distance?',['FIFO queue','LIFO stack','HashMap alone'],0,'FIFO expands each distance layer before the next.'],
    ['What problem does marking visited on enqueue prevent?',['Multiple parents enqueuing the same vertex','Edges with negative weights','An unsorted adjacency list'],0,'The first discovery is enough in BFS. Mark it before other parents see it.'],
  ],
  'edit-distance': [
    ['Which neighbor represents replacing the final character?',['The diagonal state','The state above only','The state to the left only'],0,'Replacement consumes one character from both prefixes.'],
    ['What is the distance from an empty string to a string of length m?',['0','1','m'],2,'Every target character requires an insertion.'],
  ],
  'range-min': [
    ['What value acts like an empty contribution for minimum?',['Integer.MAX_VALUE','0','Integer.MIN_VALUE'],0,'Taking min(x, MAX_VALUE) leaves x unchanged.'],
    ['Why can a segment tree beat scanning after updates?',['A query combines precomputed ranges, and an update touches only ancestors','It recalculates every query in advance','It only works when the array is sorted'],0,'Each update changes a root path, and each query combines a logarithmic number of tree segments.'],
  ],
};

const sayings = [
  ['Off-by-one','A boundary that includes or excludes exactly one item by mistake. Check both the empty input and the last valid index.'],
  ['Footgun','An easy-to-trigger mistake. Sorting with (a, b) -> a - b is a classic int-overflow footgun.'],
  ['Aliasing','Two references point at the same mutable object. A surprise mutation is often a clue.'],
  ['Rubber duck debugging','Explain the failing input to an inanimate listener. Say the expected state out loud at each iteration.'],
  ['Boxing','Wrapping a primitive like int in an object like Integer. Unboxing null is where the plot gets unpleasant.'],
  ['Stale heap entry','A priority queue record that has been superseded. Compare it with the current best distance before processing it.'],
  ['Fencepost problem','Counting gaps and counting posts produce different answers. Three words need two delimiters.'],
  ['Happy path','The input where everything behaves. Also test an empty collection, ties, extremes, and the first or last element.'],
  ['Sentinel','A boundary marker or special value. A dummy list node gives the real head a predecessor.'],
  ['Invariant','A condition your code keeps true across steps. If your pointer moves, explain why the invariant survives.'],
];
export const programmerTerms = sayings;

export const fieldNotes = {
  java:'If a test surprises you, rubber-duck the value after each line. The duck charges no consulting fee.',
  oop:'Two instances should have two balances. A static wallet is a group project nobody agreed to.',
  arrays:'Watch the fenceposts. length is the first index you can’t visit.',
  hash:'If two keys look equal, check equals and hashCode before blaming the HashMap.',
  windows:'An off-by-one can rent space at both ends of a sliding window. Write down which end is exclusive.',
  search:'If your binary search can’t prove one endpoint moves, you may have built a very small infinite loop.',
  stack:'The stack says last in, first out. It has no interest in being fair.',
  list:'Save next before severing a link. There is no Ctrl+Z for your pointer variables.',
  tree:'A tree can be a linked list wearing a branch costume. Account for its height.',
  heap:'A priority queue promises its next item. Iterating over it is not a secret sorting API.',
  graph:'A stale heap entry is yesterday’s weather report. Check the current distance before acting.',
  backtrack:'Undo the choice before leaving a branch. Future you did not sign up to debug shared state.',
  dp:'If your DP state needs a paragraph, try defining it with one smaller sentence first.',
  advanced:'A bit trick deserves a tiny example. Try writing the binary digits before trying wizardry.',
};
