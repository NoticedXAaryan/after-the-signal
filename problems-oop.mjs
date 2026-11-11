import {chapter} from './curriculum.mjs';

const o=chapter('oop');
o('counter-object','Build a counter object','Easy','int solve(int start, int[] changes)',
  'Create a Counter with a private value and a constructor that takes start. Apply each signed change through an instance method. Return the final value. All intermediate values fit in int.',
  'O(n)','O(1)','Put value on the instance. A static field would share it with every counter.',
  'Counter counter=new Counter(start); for(int x:changes)counter.add(x); return counter.value();',
  [[[2,[3,-1,4]],8],[[9,[]],9],[[-4,[4]],0]],
  {helpers:'static class Counter{private int value; Counter(int start){value=start;}void add(int amount){value+=amount;}int value(){return value;}}'});
o('independent-counters','Keep two counters independent','Easy','int[] solve(int[][] changes)',
  'Create two separate Counter objects initially holding zero. Each operation [index, delta] changes the indicated counter, where index is 0 or 1. Return both final values.',
  'O(n)','O(1)','One class can have two instances, each with its own fields.',
  'Counter[] counters={new Counter(),new Counter()};for(int[] op:changes)counters[op[0]].value+=op[1];return new int[]{counters[0].value,counters[1].value};',
  [[[[[0,5],[1,3],[0,-1]]],[4,3]],[[[]],[0,0]],[[[[1,-6]]],[0,-6]]],
  {helpers:'static class Counter{int value;}'});
o('guarded-wallet','Protect a wallet invariant','Easy','int solve(int initial, int[] transactions)',
  'Create a Wallet with a nonnegative balance and an apply method. Add each signed transaction only if the new balance is nonnegative. Balances fit in int. Return the final balance.',
  'O(n)','O(1)','Keep validation and mutation together in the wallet method.',
  'Wallet wallet=new Wallet(initial);for(int x:transactions)wallet.apply(x);return wallet.balance;',
  [[[10,[-11,-10,4]],4],[[3,[0,-2,-2]],1],[[0,[]],0]],
  {helpers:'static class Wallet{private int balance;Wallet(int value){balance=value;}void apply(int delta){if((long)balance+delta>=0)balance+=delta;}}'});
o('value-equality','Compare points by value','Easy','boolean solve(int[] a, int[] b)',
  'Each array contains x and y. Create an immutable Point type. Return true when both points have matching coordinates. Java records are one option.',
  'O(1)','O(1)','A record supplies value equality and a matching hashCode for its components.',
  'Point p=new Point(a[0],a[1]),q=new Point(b[0],b[1]);return p.equals(q);',
  [[[[2,7],[2,7]],true],[[[2,7],[7,2]],false],[[[0,-3],[0,-3]],true]],
  {helpers:'record Point(int x,int y){}'});
o('defensive-snapshot','Save a defensive snapshot','Easy','int[] solve(int[] values, int index, int replacement)',
  'Construct a Snapshot object from values, change index in the original array, and return the stored snapshot. The index is valid. The result must preserve the original contents.',
  'O(n)','O(n)','Copy the primitive array in the constructor to avoid storing an alias.',
  'Snapshot saved=new Snapshot(values);values[index]=replacement;return saved.read();',
  [[[[2,4,6],1,99],[2,4,6]],[[[7],0,-3],[7]]],
  {helpers:'static class Snapshot{private final int[] values;Snapshot(int[] values){this.values=values.clone();}int[] read(){return values.clone();}}'});
o('virtual-dispatch','Dispatch to the actual object','Medium','String[] solve(String[] pets)',
  'Implement an Animal base class with a speak method. Create Cat and Dog subclasses that override it. For each entry "cat" or "dog", call speak through an Animal reference and return "meow" or "woof" in order.',
  'O(n)','O(1) excluding output','Use the same Animal reference type for both objects. The override is selected at runtime.',
  'String[] out=new String[pets.length];for(int i=0;i<pets.length;i++){Animal pet=pets[i].equals("cat")?new Cat():new Dog();out[i]=pet.speak();}return out;',
  [[[['dog','cat','cat']],['woof','meow','meow']],[[[]],[]],[[['cat']],['meow']]],
  {helpers:'static abstract class Animal{abstract String speak();}static class Cat extends Animal{@Override String speak(){return "meow";}}static class Dog extends Animal{@Override String speak(){return "woof";}}'});
o('strategy-object','Swap an algorithm with an interface','Medium','int[] solve(int[] a, boolean doubleIt)',
  'Implement an IntRule interface with an apply method. Use one strategy that doubles a value and another that negates it. Choose the strategy once using doubleIt. Return the transformed array. Inputs are between -10⁸ and 10⁸.',
  'O(n)','O(1) excluding output','Choose an IntRule object first, then keep the loop independent of the choice.',
  'IntRule rule=doubleIt?x->x*2:x->-x;int[] out=new int[a.length];for(int i=0;i<a.length;i++)out[i]=rule.apply(a[i]);return out;',
  [[[[2,-1,0],true],[4,-2,0]],[[[2,-1,0],false],[-2,1,0]],[[[],false],[]]],
  {helpers:'interface IntRule{int apply(int x);}'});
o('queue-composition','Build an inbox by composition','Medium','int[] solve(int[][] ops)',
  'Build an Inbox class that owns a FIFO deque. Operation [1,x] sends x. Operation [2] receives the oldest item, or -1 if empty. Return all receives in order. Use composition to keep the deque private.',
  'O(n)','O(n)','Expose send and receive methods. The caller should never get a reference to the deque.',
  'Inbox inbox=new Inbox();int[] out=new int[ops.length];int i=0;for(int[] op:ops){if(op[0]==1)inbox.send(op[1]);else out[i++]=inbox.receive();}return Arrays.copyOf(out,i);',
  [[[[[1,7],[1,3],[2],[2],[2]]],[7,3,-1]],[[[[2],[1,9],[2]]],[-1,9]],[[[]],[]]],
  {helpers:'static class Inbox{private final Deque<Integer> pending=new ArrayDeque<>();void send(int x){pending.addLast(x);}int receive(){Integer value=pending.pollFirst();return value==null?-1:value;}}'});
