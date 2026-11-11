export const topics = [
  ['signal','First Signal','01','◈','Inputs, decisions, loops and safe control','Start here'],
  ['java','Java foundations','01','{}','Values, references & control flow','Start here'],
  ['oop','Object-oriented Java','02','◇','Classes, interfaces & polymorphism','Foundations'],
  ['arrays','Arrays & strings','02','[ ]','Indexing, mutation & text','Foundations'],
  ['hash','Hashing & prefix sums','03','#','Frequency maps & running totals','Core patterns'],
  ['windows','Pointers & windows','04','↔','Pairs, ranges & sliding windows','Core patterns'],
  ['search','Sorting & binary search','05','⌕','Order, partitioning & boundaries','Core patterns'],
  ['stack','Stacks & queues','06','≡','LIFO, FIFO & monotonic structures','Data structures'],
  ['list','Linked lists','07','⤳','Node references & pointer rewiring','Data structures'],
  ['tree','Trees & tries','08','⑂','Traversals, BSTs & prefixes','Data structures'],
  ['heap','Heaps & intervals','09','△','Priority queues, greedy & sweeps','Core patterns'],
  ['graph','Graphs & grids','10','◇','BFS, DFS, shortest paths & DSU','Algorithms'],
  ['backtrack','Recursion & backtracking','11','↻','Decision trees, pruning & undo','Algorithms'],
  ['dp','Dynamic programming','12','▦','States, transitions & optimization','Algorithms'],
  ['advanced','Advanced techniques','13','✦','Bitmasks, string matching & range trees','Stretch'],
].map(([id,name,,symbol,description,band],index)=>[id,name,String(index+1).padStart(2,'0'),symbol,description,band]);

export const lessons = {
  signal: [
    ['Input, rule, output','A program takes data and applies instructions. A method is a named piece of that program. It accepts input through its parameters and returns a value to whatever called it. The challenge runner is the caller in these stations.','int liters(int marks) {\n    return marks * 4;\n}'],
    ['Decisions and repeated work','A condition chooses which line runs next. A loop repeats instructions while its bounds allow it. An array of length n has valid indexes from 0 to n - 1.','for (int i = 0; i < readings.length; i++) {\n    if (readings[i] < floor) return i;\n}\nreturn -1;'],
  ],
  java: [
    ['Values and references','Primitives store values. A reference points to an object. Java always passes arguments by value, so a method receives a copy of the reference. Mutating the referenced array is visible to the caller. Reassigning the parameter is local.','int[] alias = nums;\nalias[0] = 9; // nums[0] is now 9\nalias = new int[2]; // nums still points to the original'],
    ['Types, loops, and methods','Choose int for bounded integers and long when a sum or product can exceed int range. Cast before the calculation. Integer division truncates toward zero. Use for for indexed traversal and while when the stopping condition drives the loop. Methods return a declared type or void.','long area = (long) width * height;\nfor (int i = 0; i < nums.length; i++) {\n    System.out.println(nums[i]);\n}'],
    ['Classes, generics, and boxing','A class groups state and behavior. Each new instance gets its own instance fields. Static members belong to the class. Generics express collection element types. Use Integer in generics because int is primitive. Unboxing null throws.','List<Integer> scores = new ArrayList<>();\nscores.add(7);\nint score = scores.get(0);'],
  ],
  oop: [
    ['Encapsulate state','Let a class own the rules for changing its state. Keep fields private and expose methods that maintain the invariant. A constructor creates a valid starting state. A getter returning a mutable field can accidentally hand out write access.','class Counter {\n    private int value;\n    void increment() { value++; }\n    int value() { return value; }\n}'],
    ['Composition, inheritance, and dispatch','Composition puts one object inside another. Inheritance creates a subtype. When a subclass overrides an instance method, Java dispatches to the implementation for the actual object. Overloaded signatures are chosen from the declared types at compile time.','Animal pet = new Dog();\npet.speak(); // The override in Dog runs.'],
    ['Program to an interface','An interface is a contract. Code can depend on a behavior without depending on its concrete implementation. For example, a method receiving List<Integer> can work with multiple list implementations.','interface Rule {\n    int apply(int value);\n}\nRule doubleIt = value -> value * 2;'],
  ],
  arrays: [
    ['Arrays and copies','Arrays have fixed length and zero-based indexing. A 2D Java array is an array of row references, so rows can have different lengths. clone makes a shallow copy. ArrayList grows automatically. Appending is amortized O(1), while inserting near the front shifts elements.','int[] copy = nums.clone();\nArrays.sort(copy);\nboolean same = Arrays.equals(copy, nums);'],
    ['Strings under the hood','Strings are immutable and use UTF-16 indexing. charAt returns one code unit. Use codePoints() when you need full Unicode code points. Use equals to compare contents and StringBuilder for repeated appends. String literals can share a pooled instance.','String word = "java";\nboolean same = word.equals(new String("java"));\nString reversed = new StringBuilder(word).reverse().toString();'],
  ],
  hash: [['Choosing a lookup structure','HashMap maps keys to values. HashSet tracks membership. Expected lookup and insertion are O(1) with well-distributed hashes. Key equality and hashCode must agree. A prefix array stores the sum before each boundary, so [l, r) is prefix[r] minus prefix[l].','counts.merge(value, 1, Integer::sum);\nlong sum = prefix[right] - prefix[left];']],
  windows: [['Prove what the window represents','Keep a valid or deliberately overfull interval. Add the right element, then advance left until the invariant holds. Even with a nested while, each pointer advances at most n times. For sums, negative numbers can break the monotonic property.','for (int right = 0; right < a.length; right++) {\n    sum += a[right];\n    while (sum > limit) sum -= a[left++];\n}']],
  search: [['Search a boundary','A binary search needs a monotonic predicate. Use a half-open interval [lo, hi) to find the first true index. For sorting, distinguish stable order, comparisons, auxiliary space, and worst-case behavior.','while (lo < hi) {\n    int mid = lo + (hi - lo) / 2;\n    if (good(mid)) hi = mid;\n    else lo = mid + 1;\n}']],
  stack: [['Two ends, two policies','A stack removes the newest item. A queue removes the oldest. ArrayDeque supports both and rejects null. A monotonic stack pops entries that can no longer answer the next-greater or next-smaller query. Each index enters and leaves at most once.','Deque<Integer> work = new ArrayDeque<>();\nwork.push(3); work.pop(); // stack\nwork.addLast(3); work.removeFirst(); // queue']],
  list: [['Preserve the next reference','A linked list stores nodes with references rather than contiguous indices. Finding the kth node takes O(k). Rewiring a known node can take O(1). Save the next pointer before changing it. A dummy head simplifies edits near the front.','ListNode next = current.next;\ncurrent.next = previous;\nprevious = current;\ncurrent = next;']],
  tree: [['Traversal and state','Preorder visits a node before its children. Inorder visits a BST in sorted order when duplicates are excluded. Postorder can combine results from both subtrees. Level order uses a queue. Recursion uses O(h) stack space. A trie follows one edge per character.','int depth(TreeNode root) {\n    if (root == null) return 0;\n    return 1 + Math.max(depth(root.left), depth(root.right));\n}']],
  heap: [['Maintain the next best candidate','Java PriorityQueue puts the smallest element first by default. Peek is O(1) and offer/poll are O(log n). Use Integer.compare for safe comparators. For interval sweeps decide whether touching endpoints overlap before ordering events.','PriorityQueue<Integer> topK = new PriorityQueue<>();\ntopK.offer(x);\nif (topK.size() > k) topK.poll();']],
  graph: [['Pick the traversal from the edge rules','BFS finds shortest paths when all edges cost the same. Mark vertices when enqueuing. Dijkstra handles nonnegative weighted edges. Topological sort removes vertices with no remaining prerequisites. DSU merges components efficiently but does not recover paths.','dist[source] = 0;\nqueue.offer(source);\n// For each unseen neighbor of v, set dist[u] = dist[v] + 1.']],
  backtrack: [['Choose, explore, undo','State what a partial solution means. Try each legal choice, recurse, then restore the state before trying the next choice. Prune branches only when they cannot produce a valid solution. Include output size in your cost analysis.','path.add(choice);\nsearch(next);\npath.remove(path.size() - 1);']],
  dp: [['Write the recurrence first','Define the state in a sentence. List the base cases and transitions, then decide the order that makes every dependency available. Time is often states times work per state. Compress space only if older states are no longer needed.','// dp[i] is the number of ways to reach step i.\ndp[0] = 1;\ndp[1] = 1;\nfor (int i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];']],
  advanced: [['Choose a representation for repeated work','A bitmask represents subsets with one bit per item. Fenwick trees trade O(n) storage for O(log n) prefix queries and point updates. KMP reuses the longest proper prefix that also matches the suffix to avoid rescanning text.','int lowBit = index & -index;\nint withoutLowestSetBit = mask & (mask - 1);']],
};

export const core = [];
export function chapter(topic) {
  return (id, title, level, signature, prompt, time, space, hint, body, cases, extra = {}) => {
    const [, result, method, params] = signature.match(/^(\S+) (\w+)\((.*)\)$/);
    const args = params ? params.split(', ').map(param => param.split(' ')) : [];
    core.push({id, title, topic, level, signature, result, method, args, prompt, time, space, hint, body, cases, ...extra});
  };
}
