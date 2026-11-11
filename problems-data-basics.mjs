import {tutorial} from './tutorial.mjs';

const array=tutorial('arrays','Working with arrays');
array('array-create','Create a fixed-size array','int[] solve(int size)',
  'An array holds several values of one type. new int[size] creates size slots, each starting at zero.',
  [['new int[2]','The array is [0, 0].'],['new int[0]','This creates an empty array.']],
  'Return a new int array with exactly size slots. size is nonnegative.',
  'return new int[0];','return new int[size];',[[[3],[0,0,0]],[[0],[]]],{time:'O(n)',space:'O(n)'});
array('array-literal','Fill an array when creating it','int[] solve(int left, int right)',
  'Inside new int[]{...}, list the values in order, separated by commas. The number of values sets the array length.',
  [['new int[]{4, 8}','The array contains 4, then 8.'],['new int[]{7}','This creates one slot containing 7.']],
  'Return an array containing left, then right, then left again.',
  'return new int[]{left, right};','return new int[]{left,right,left};',[[[2,7],[2,7,2]],[[-1,3],[-1,3,-1]]]);
array('index','Read a value by its index','int solve(int[] values, int index)',
  'Square brackets access one slot. The first slot has index 0. The valid indexes end at length minus one.',
  [['int[] a = {9, 4};\nreturn a[0];','Index 0 gives 9.'],['int[] a = {9, 4};\nreturn a[1];','Index 1 gives 4.']],
  'Return the value at index in values. The input guarantees a valid index.',
  'return values[0];','return values[index];',[[[[3,8,5],1],8],[[[9,2],0],9]]);
array('array-length','Count slots with .length','int solve(int[] values)',
  'An array has a length field. Write values.length without parentheses. The length counts slots even if some contain zero.',
  [['new int[]{4, 0, 2}.length','The length is 3.'],['new int[0].length','The length is 0.']],
  'Return how many slots are in values.',
  'return 0;','return values.length;',[[[[2,0,5]],3],[[[]],0]]);
array('last','Read the final array slot','int solve(int[] values)',
  'If an array has n slots, its final index is n minus one. On an empty array, there is no valid index.',
  [['int[] a = {3, 6};\nreturn a[a.length - 1];','The last index is 1 and its value is 6.'],['int[] a = {9};\nreturn a[a.length - 1];','The last index is 0 and its value is 9.']],
  'Return the last value in values. Return -1 when values is empty.',
  '// Check whether the array is empty first.\nreturn -1;','if(values.length==0)return -1;return values[values.length-1];',[[[[1,4,7]],7],[[[]],-1],[[[8]],8]]);
array('write','Replace an array value','int[] solve(int[] values, int index, int replacement)',
  'An assignment to values[index] changes that one slot. The other slots keep their values.',
  [['int[] a = {3, 4};\na[0] = 8;','The array becomes [8, 4].'],['int[] a = {3, 4};\na[1] = 8;','The array becomes [3, 8].']],
  'Replace the value at the given index and return the modified array. index is valid.',
  '// Assign to the slot at index.\nreturn values;','values[index]=replacement;return values;',[[[[2,4,6],1,9],[2,9,6]],[[[8],0,0],[0]]]);
array('foreach','Visit values with for-each','int solve(int[] values)',
  'In for (int value : values), Java gives value the contents of the next slot each time. Use this form when you only need the value.',
  [['for (int value : new int[]{2, 5}) { System.out.println(value); }','It prints 2, then 5.'],['for (int value : new int[0]) { System.out.println(value); }','It prints nothing.']],
  'Use a for-each loop to count the positive values in values.',
  'int count = 0;\nfor (int value : values) {\n    // Count a positive value.\n}\nreturn count;','int count=0;for(int value:values){if(value>0)count++;}return count;',[[[[0,3,-2,4]],2],[[[]],0]],{time:'O(n)'});
array('indexed','Visit indexes with for','int solve(int[] values, int target)',
  'An indexed loop starts at 0 and continues while i < values.length. Read values[i] to get the value at the current position.',
  [['int[] a = {4, 7};\nfor (int i = 0; i < a.length; i++) { System.out.println(a[i]); }','It prints 4, then 7.'],['int[] a = {5};\nfor (int i = 0; i < a.length; i++) { System.out.println(i); }','Only index 0 runs.']],
  'Return the first index that contains target, or -1 if it is missing.',
  'for (int i = 0; i < values.length; i++) {\n    // Return i when the value matches target.\n}\nreturn -1;','for(int i=0;i<values.length;i++){if(values[i]==target)return i;}return -1;',[[[[3,8,8],8],1],[[[3],0],-1]],{time:'O(n)'});
array('swap','Swap two values using a temporary','int[] solve(int[] values)',
  'An assignment overwrites the old value. Save the first value in a temporary variable before putting the second value in its slot.',
  [['int a = 2, b = 9;\nint temp = a;\na = b;\nb = temp;','a is 9 and b is 2.'],['int a = 2, b = 9;\na = b;\nb = a;','Both become 9 because the original 2 was lost.']],
  'Swap indexes 0 and 1 of this two-element array and return it.',
  'int temp = values[0];\n// Move the values to their opposite slots.\nreturn values;','int temp=values[0];values[0]=values[1];values[1]=temp;return values;',[[[[3,8]],[8,3]],[[[5,-2]],[-2,5]]]);
array('clone','Copy an array before editing','int[] solve(int[] values)',
  'Assigning an array to another variable shares the same array. For an int array, clone creates a separate array with the same values.',
  [['int[] a = {4};\nint[] b = a;\nb[0] = 9;','a[0] becomes 9 too.'],['int[] a = {4};\nint[] b = a.clone();\nb[0] = 9;','a[0] remains 4.']],
  'Return a separate copy of the nonempty array with its first value changed to 99. Keep the input unchanged.',
  'int[] copy = values.clone();\n// Update the first slot in copy.\nreturn copy;','int[] copy=values.clone();copy[0]=99;return copy;',[[[[7,3]],[99,3]],[[[2]],[99]]],{time:'O(n)',space:'O(n)',pure:true});
array('grid','Read a row and column','int solve(int[][] grid, int row, int col)',
  'An int[][] stores arrays as its rows. grid[row] selects one row. Adding [col] selects a slot in that row.',
  [['int[][] grid = {{1, 3}, {6, 9}};\nreturn grid[0][1];','Row 0, column 1 gives 3.'],['int[][] grid = {{1, 3}, {6, 9}};\nreturn grid[1][0];','Row 1, column 0 gives 6.']],
  'Return the requested cell. The row and column are valid.',
  'return grid[0][0];','return grid[row][col];',[[[[[1,3],[6,9]],1,0],6],[[[[8,2]],0,1],2]]);
array('row-sum','Add values in one row','int solve(int[][] grid, int row)',
  'Each row is an int array. You can assign that row to a variable, then use a for-each loop to visit its values.',
  [['int[][] grid = {{2, 3}, {9}};\nint[] selected = grid[0];','selected contains [2, 3].'],['int[][] grid = {{2, 3}, {9}};\nint[] selected = grid[1];','selected contains [9].']],
  'Return the sum of the values in grid[row]. The row index is valid.',
  'int sum = 0;\n// Visit only grid[row].\nreturn sum;','int sum=0;for(int value:grid[row]){sum+=value;}return sum;',[[[[[5,1],[2,8,3]],1],13],[[[[5,1],[]],1],0]],{time:'O(n)'});

const strings=tutorial('text','Working with text');
strings('text-length','Count with String.length()','int solve(String text)',
  'String.length() is a method call and needs parentheses. For these exercises each letter, digit, or space counts as one. Java counts UTF-16 units, so some symbols outside these exercises occupy two.',
  [['"Gate".length()','The result is 4.'],['"a b".length()','The result is 3, including the space.']],
  'Return the length of text.','return 0;','return text.length();',[[['Relay'],5],[[''],0]]);
strings('charat','Read a character with charAt','String solve(String text, int index)',
  'charAt(index) reads one char at a zero-based index. Put single quotes around a char literal. Use String.valueOf to turn a char into a String.',
  [['"Gate".charAt(0)','The char is G.'],['String.valueOf("Gate".charAt(2))','The String is t.']],
  'Return the character at index as a String. The index is valid.','return "";','return String.valueOf(text.charAt(index));',[[['Cairn',1],'a'],[['Cairn',4],'n']]);
strings('equals-text','Compare text with .equals()','boolean solve(String first, String second)',
  'Use first.equals(second) to compare the text inside two strings. The result respects uppercase and lowercase.',
  [['"gate".equals("gate")','The result is true.'],['"Gate".equals("gate")','The result is false.']],
  'Return true when the two strings have the same text, with the same letter case.','return false;','return first.equals(second);',[[['ready','ready'],true],[['Ready','ready'],false]]);
strings('substring','Take a slice with substring','String solve(String text, int start, int end)',
  'substring(start, end) includes the character at start and stops before end. The number of characters is end minus start.',
  [['"relay".substring(0, 2)','The result is re.'],['"relay".substring(2, 5)','The result is lay.']],
  'Return the slice of text from start up to but excluding end. The boundaries are valid.',
  'return "";','return text.substring(start,end);',[[['signal',1,4],'ign'],[['signal',3,3],'']]);
strings('starts','Recognize a prefix','boolean solve(String text, String prefix)',
  'startsWith checks the beginning of a string. A prefix can match the whole string, and the empty string is a prefix of every string.',
  [['"Cairn Gate".startsWith("Cairn")','The result is true.'],['"Cairn Gate".startsWith("Gate")','The result is false because Gate is later.']],
  'Return true when text starts with prefix.','return false;','return text.startsWith(prefix);',[[['port-9','port'],true],[['aport','port'],false],[['x',''],true]]);
strings('ends','Recognize a suffix','boolean solve(String text, String suffix)',
  'endsWith compares the last characters of a string with the suffix. Matching only in the middle does not pass.',
  [['"map.txt".endsWith(".txt")','The result is true.'],['"map.txt.old".endsWith(".txt")','The result is false.']],
  'Return true when text ends with suffix.','return false;','return text.endsWith(suffix);',[[['report.csv','.csv'],true],[['csv.log','.csv'],false]]);
strings('contains','Look for text anywhere','boolean solve(String text, String needle)',
  'contains looks for an exact contiguous sequence anywhere inside a string. Characters must appear together in the right order.',
  [['"water gate".contains("gate")','The result is true.'],['"water gate".contains("wte")','The result is false because those letters are not consecutive.']],
  'Return true if needle occurs anywhere inside text.','return false;','return text.contains(needle);',[[['ab-cd','-c'],true],[['ab-cd','ac'],false]]);
strings('indexof','Locate text with indexOf','int solve(String text, String needle)',
  'indexOf finds the start index of the first match. If there is no match, it returns -1.',
  [['"banana".indexOf("an")','The first an starts at index 1.'],['"banana".indexOf("zz")','The result is -1.']],
  'Return the start index of the first occurrence of needle, or -1 if it is missing.',
  'return -1;','return text.indexOf(needle);',[[['ababa','ba'],1],[['ababa','xy'],-1]]);
strings('trim','Remove outside whitespace','String solve(String text)',
  'trim removes leading and trailing spaces from these inputs. It keeps spaces between words.',
  [['"  Cairn  ".trim()','The result is Cairn.'],['"  North Gate  ".trim()','The result is North Gate, including the inside space.']],
  'Return text with the spaces at the beginning and end removed.','return text;','return text.trim();',[[['  open  '],'open'],[['  a b'],'a b']]);
strings('replace','Replace every literal match','String solve(String text)',
  'String.replace produces a new string. It replaces every exact literal match. Save or return the new value.',
  [['"a-b-c".replace("-", " ")','The result is a b c.'],['"a-b".replace("-", "")','The result is ab.']],
  'Replace every underscore with a space and return the result.',
  'return text;','return text.replace("_"," ");',[[['north_gate_now'],'north gate now'],[['open'],'open']]);
strings('character-loop','Count matching characters','int solve(String text, String symbol)',
  'Loop from zero to text.length() minus one. Use charAt(i) for each char and compare it to the target char with ==.',
  [['"aba".charAt(0) == \'a\'','The result is true.'],['"aba".charAt(1) == \'a\'','The result is false.']],
  'Count how often the single character in symbol appears in text.',
  'int count = 0;\n// Loop over the character indexes.\nreturn count;','int count=0;for(int i=0;i<text.length();i++){if(text.charAt(i)==symbol.charAt(0))count++;}return count;',[[['banana','a'],3],[['','x'],0]],{time:'O(n)'});
strings('builder','Build repeated text with StringBuilder','String solve(String word, int n)',
  'StringBuilder stores text you can keep adding to. append adds to the end. toString gives you the final String to return.',
  [['new StringBuilder().append("A").append("B").toString()','The result is AB.'],['new StringBuilder().toString()','The result is an empty string.']],
  'Append word exactly n times with no separator. Return the result. n is nonnegative.',
  'StringBuilder out = new StringBuilder();\n// Append word in a loop.\nreturn out.toString();','StringBuilder out=new StringBuilder();for(int i=0;i<n;i++){out.append(word);}return out.toString();',[[['ha',3],'hahaha'],[['ha',0],'']],{time:'O(n × word length + n)',space:'O(output length)'});

const tools=tutorial('methods','Methods, collections, and classes');
tools('max','Call a helper with Math.max','int solve(int a, int b)',
  'A method can accept several arguments and return a value. Math.max takes two numbers and gives the larger one.',
  [['Math.max(3, 8)','The result is 8.'],['Math.max(-2, -5)','The result is -2.']],
  'Use Math.max to return the larger of a and b.','return 0;','return Math.max(a,b);',[[[3,8],8],[[-2,-5],-2]]);
tools('min','Call a helper with Math.min','int solve(int demand, int stock)',
  'Math.min returns the smaller of its two arguments. It can cap an amount at an available limit.',
  [['Math.min(4, 9)','The result is 4.'],['Math.min(13, 6)','The result is 6.']],
  'Return how many units can be supplied when demand and stock are both nonnegative.',
  'return demand;','return Math.min(demand,stock);',[[[4,9],4],[[9,4],4],[[8,0],0]]);
tools('parse','Turn digit text into an integer','int solve(String text)',
  'Integer.parseInt reads digit text as an int. This lets you do arithmetic with a value that originally arrived as text.',
  [['Integer.parseInt("42")','The numeric result is 42.'],['Integer.parseInt("-5") + 2','The numeric result is -3.']],
  'Parse text and return the parsed number plus one. text always contains a valid int that can be increased by one.',
  'return 0;','return Integer.parseInt(text)+1;',[[['17'],18],[['-4'],-3]]);
tools('null','Check for missing objects','int solve(String text)',
  'A String reference can hold null, meaning it points to no object. Check for null before calling a method on it.',
  [['String text = null;\nreturn text == null;','The result is true.'],['String text = "";\nreturn text == null;','The result is false. An empty string is still an object.']],
  'Return -1 if text is null. Otherwise return its length.',
  '// Check for null before calling length().\nreturn 0;','if(text==null)return -1;return text.length();',[[[null],-1],[[''],0],[['abc'],3]]);
tools('list-create','Create a growable ArrayList','int solve(int first, int second)',
  'An ArrayList can grow after creation. ArrayList<Integer> holds whole numbers as Integer objects. add puts a value at the end.',
  [['ArrayList<Integer> list = new ArrayList<>();\nlist.add(4);','The list contains [4].'],['list.add(9);','After the first example, the list becomes [4, 9].']],
  'Create a list. Add first, then second, then first again. Return its size.',
  'ArrayList<Integer> list = new ArrayList<>();\n// Add three values.\nreturn list.size();','ArrayList<Integer> list=new ArrayList<>();list.add(first);list.add(second);list.add(first);return list.size();',[[[2,7],3],[[0,0],3]]);
tools('list-get','Read a list slot with get','int solve(int a, int b, int index)',
  'ArrayList uses get(index) to read a slot and size() to count slots. Its first index is 0, just like an array.',
  [['List<Integer> list = List.of(3, 7);\nreturn list.get(0);','The result is 3.'],['List<Integer> list = List.of(3, 7);\nreturn list.get(1);','The result is 7.']],
  'Add a and b to an ArrayList in that order, then return its value at index. index is 0 or 1.',
  'ArrayList<Integer> list = new ArrayList<>();\nlist.add(a);\nlist.add(b);\nreturn list.get(0);','ArrayList<Integer> list=new ArrayList<>();list.add(a);list.add(b);return list.get(index);',[[[3,8,1],8],[[3,8,0],3]]);
tools('list-set','Update a list slot with set','int solve(int a, int b, int replacement)',
  'list.set(index, value) replaces a value at an existing index. It does not add a slot. Use a mutable list such as ArrayList.',
  [['ArrayList<Integer> list = new ArrayList<>(List.of(2, 7));\nlist.set(1, 9);','The list is now [2, 9].'],['ArrayList<Integer> list = new ArrayList<>(List.of(2, 7));\nlist.set(0, 9);','The list is now [9, 7].']],
  'Put a and b in a list. Replace the second value with replacement. Return the sum of the two list values.',
  'ArrayList<Integer> list = new ArrayList<>(List.of(a, b));\n// Replace the second value.\nreturn list.get(0) + list.get(1);','ArrayList<Integer> list=new ArrayList<>(List.of(a,b));list.set(1,replacement);return list.get(0)+list.get(1);',[[[2,7,9],11],[[4,8,0],4]]);
tools('map-put','Store and read a value by key','int solve(String key, int quantity)',
  'A HashMap connects keys to values. put(key, value) saves an entry and get(key) reads it. Putting a value under an existing key replaces its earlier value.',
  [['HashMap<String, Integer> map = new HashMap<>();\nmap.put("water", 3);\nreturn map.get("water");','The result is 3.'],['map.put("water", 8);\nreturn map.get("water");','The same key now maps to 8.']],
  'Save quantity under key. Then replace it with quantity plus 2 and return the value stored under key.',
  'HashMap<String, Integer> map = new HashMap<>();\nmap.put(key, quantity);\n// Replace the saved quantity.\nreturn map.get(key);','HashMap<String,Integer> map=new HashMap<>();map.put(key,quantity);map.put(key,quantity+2);return map.get(key);',[[['rope',3],5],[['water',0],2]]);
tools('map-default','Handle a missing key','int solve(String name)',
  'getOrDefault looks up a key. If the key is absent, it returns the fallback you supplied. This avoids converting a missing null into a primitive int.',
  [['Map.of("water", 3).getOrDefault("water", 0)','The result is 3.'],['Map.of("water", 3).getOrDefault("rope", 0)','The result is the fallback 0.']],
  'Use the provided map to return the count for name. Return 0 for an unknown name.',
  'Map<String, Integer> stock = Map.of("water", 5, "rope", 2);\nreturn 0;','Map<String,Integer> stock=Map.of("water",5,"rope",2);return stock.getOrDefault(name,0);',[[['rope'],2],[['unknown'],0]]);
tools('method','Read a complete Java method','int solve(int steps)',
  'This level shows the full Java file. class Solution encloses your methods. In public int solve(int steps), public lets callers access the method, the first int is the result type, solve is its name, and int steps names one whole-number input.',
  [['public int solve(int n) { return n + 1; }','Calling solve(4) gives 5.'],['public int solve(int n) { return n * 2; }','Calling solve(4) gives 8.']],
  'Keep the class and method header. Change the body so solve returns steps plus 10.',
  'return steps;','return steps+10;',[[[4],14],[[0],10]],{bodyOnly:false});
tools('helper','Write and call your own helper','int solve(int width, int height)',
  'A class can contain several methods. Put a helper after the closing brace of solve and before the closing brace of Solution. Give the helper its own name, inputs, and return type.',
  [['int twice(int n) { return n * 2; }\n// Another method can call twice(3).','The helper call gives 6.'],['int add(int a, int b) { return a + b; }\n// Another method can call add(2, 5).','The helper call gives 7.']],
  'Complete the area helper so solve returns width multiplied by height.',
  'return area(width, height);','return area(width,height);',[[[3,4],12],[[0,5],0]],
  {bodyOnly:false,starterHelpers:'int area(int w, int h) { return 0; }',helpers:'int area(int w,int h){return w*h;}'});
tools('object','Construct and read an object','int solve(int initial)',
  'A class describes fields and methods. new calls a constructor to create an object. Different objects can hold different values in the same field.',
  [['Box a = new Box(3);\nreturn a.value;','If the constructor stores its argument, a.value is 3.'],['Box a = new Box(3);\nBox b = new Box(8);\nreturn b.value;','b.value is 8. It has its own field.']],
  'Complete the Box constructor so it stores start in the field value. solve should then return initial through that object.',
  'Box box = new Box(initial);\nreturn box.value;','Box box=new Box(initial);return box.value;',[[[8],8],[[-2],-2]],
  {bodyOnly:false,starterHelpers:'static class Box { int value; Box(int start) { value = 0; } }',helpers:'static class Box{int value;Box(int start){value=start;}}'});
