import {tutorial} from './tutorial.mjs';

const start=tutorial('first','First steps');
start('run','Run your first instruction','void solve()',
  'Code is a set of instructions. Press Run example to ask Java to execute the line in the editor. System.out.println sends the text inside quotes to the console. The semicolon ends this instruction. After you see the console output, change the text and submit.',
  [['System.out.println("Hello");','The console shows Hello.'],['System.out.println("Water ready");','The console shows Water ready.']],
  'Run the starter to see Start. Then change Start to Ready and submit. Keep the quotation marks.',
  'System.out.println("Start");','System.out.println("Ready");',[[[],'Ready\n']],{prints:true});
start('two-lines','Print two lines','void solve()',
  'Java runs instructions from top to bottom. Every println writes its value and then moves to a new line.',
  [['System.out.println("A");\nSystem.out.println("B");','A appears on the first line and B on the second.'],['System.out.println("Gate");\nSystem.out.println("Open");','Gate appears first, then Open.']],
  'Print North on the first line and South on the second.',
  'System.out.println("North");\n// Add the second instruction.','System.out.println("North");System.out.println("South");',[[[],'North\nSouth\n']],{prints:true});
start('print','Print on the same line','void solve()',
  'Use System.out.print when the next output should continue on the same line. Use println when you are ready to end that line.',
  [['System.out.print("A");\nSystem.out.println("B");','The result is AB on one line.'],['System.out.print("Gate ");\nSystem.out.println("open");','The space inside the first quotes keeps the two words apart.']],
  'Use two print instructions to produce one line containing Port 7. End the line with println.',
  'System.out.print("Port ");\n// Print 7 and end the line.','System.out.print("Port ");System.out.println("7");',[[[],'Port 7\n']],{prints:true});
start('comment','Read comments and fix a line','void solve()',
  'Two forward slashes start a comment. Java ignores the rest of that line. Comments can explain instructions or temporarily turn them off.',
  [['// This is a note.\nSystem.out.println("On");','Only On is printed.'],['// System.out.println("Off");\nSystem.out.println("Ready");','The commented instruction does not run.']],
  'Remove the // before the instruction so the console shows Signal.',
  '// System.out.println("Signal");','System.out.println("Signal");',[[[],'Signal\n']],{prints:true});
start('number','Print numbers without quotes','void solve()',
  'A whole number such as 8 is a numeric literal. Quotes make it text. Java can calculate with numbers before printing them.',
  [['System.out.println(2 + 3);','The console shows 5.'],['System.out.println("2 + 3");','The console shows the text 2 + 3.']],
  'Print the result of adding 9 and 4. Write an addition expression inside println.',
  'System.out.println(9);','System.out.println(9 + 4);',[[[],'13\n']],{prints:true});
start('return','Send a result with return','int solve()',
  'A method is a named group of instructions. The grader calls the method that contains your editor code. A return sends a value back to the caller and ends that method. Tests for a return value inspect the value you send back.',
  [['return 3;','The caller receives the number 3.'],['return 2 + 4;','Java calculates 6, then sends it back.']],
  'Change the instruction to return the number 7.',
  'return 0;','return 7;',[[[],7]]);
start('input','Use an input by name','int solve(int reading)',
  'A parameter is a named input. In int solve(int reading), reading holds whatever whole number the grader gives the method. Read its value by writing its name.',
  [['return reading;','With input 4, this returns 4.'],['return reading + 1;','With input 9, this returns 10.']],
  'Return the input named reading exactly as given.',
  'return 0;','return reading;',[[[5],5],[[-3],-3]]);
start('declare','Declare a variable with int','int solve(int crates)',
  'A variable has a name and a type. int means a whole number. In int count = 3, the first equals sign puts the initial value 3 into count.',
  [['int count = 3;\nreturn count;','The result is 3.'],['int copied = crates;\nreturn copied;','With crates equal to 8, the result is 8.']],
  'Declare a variable named total that holds crates plus 2, then return total.',
  'int total = 0;\nreturn total;','int total = crates + 2;return total;',[[[5],7],[[0],2]]);
start('assign','Update a variable with =','int solve(int stock)',
  'When a variable already exists, use its name and = to give it a new value. Java works out the right-hand side first.',
  [['int x = 2;\nx = 9;','x now holds 9.'],['int x = 2;\nx = x + 3;','Java uses the old 2 to compute the new value 5.']],
  'Start with the given stock. Update it by adding 4, then return it.',
  '// Update stock here.\nreturn stock;','stock = stock + 4;return stock;',[[[9],13],[[0],4]]);
start('copy','Copy a number into another variable','int solve(int value)',
  'Assigning one int to another copies the number. Changing the original afterwards leaves the copy with its earlier value.',
  [['int a = 4;\nint b = a;\na = 9;','b is still 4.'],['int a = 7;\nint b = a;\nb = 1;','a is still 7.']],
  'Save a copy of value, set value to zero, and return the saved copy.',
  '// Save a copy before changing value.\nvalue = 0;\nreturn value;','int saved=value;value=0;return saved;',[[[6],6],[[-9],-9]]);
start('string','Store text with String','String solve()',
  'Use String for text. Put text literals in double quotes. A capital letter and a lowercase letter are different characters.',
  [['String name = "Cairn";\nreturn name;','The caller receives the text Cairn.'],['String blank = "";\nreturn blank;','Two quotes with nothing between them represent an empty string.']],
  'Store the exact text Relay in a variable called label and return it.',
  'String label = "";\nreturn label;','String label="Relay";return label;',[[[],'Relay']]);
start('concat','Join text with +','String solve(String name)',
  'When either operand is a string, + can join text. Include a space inside a quoted string when you want a space in the result.',
  [['return "North" + "Gate";','The result is NorthGate.'],['return "Hi " + "Mara";','The result is Hi Mara.']],
  'Return the text Hello followed by one space and the input name.',
  'return name;','return "Hello " + name;',[[['Mara'],'Hello Mara'],[['Ada'],'Hello Ada']]);

const math=tutorial('values','Numbers and decisions');
math('add','Add two values with +','int solve(int a, int b)',
  'Use + between numbers to add them. Parameters a and b can hold different values each time the method runs.',
  [['2 + 5','The value is 7.'],['-3 + 1','The value is -2.']],
  'Return the sum of a and b.','return a;','return a+b;',[[[3,8],11],[[-5,2],-3]]);
math('subtract','Subtract with -','int solve(int start, int used)',
  'The minus sign between two values subtracts the second from the first. Reversing the order generally changes the result.',
  [['9 - 2','The value is 7.'],['2 - 9','The value is -7.']],
  'Return how much remains after subtracting used from start.','return start;','return start-used;',[[[12,5],7],[[3,8],-5]]);
math('multiply','Multiply with *','int solve(int rows, int seats)',
  'Java uses an asterisk for multiplication. Multiplying by zero always gives zero.',
  [['3 * 5','The value is 15.'],['0 * 9','The value is 0.']],
  'Return the total seats in rows rows with seats seats in each row.','return 0;','return rows*seats;',[[[3,7],21],[[0,8],0]]);
math('divide','Divide whole numbers with /','int solve(int items, int size)',
  'When both operands are int, division gives the whole-number quotient and discards the fractional part. The divisor must be nonzero.',
  [['12 / 4','The quotient is 3.'],['14 / 4','The quotient is also 3.']],
  'Return the number of full groups of size that fit into items. size is positive and items is nonnegative.','return 0;','return items/size;',[[[14,4],3],[[2,5],0]]);
math('remainder','Find leftovers with %','int solve(int items, int size)',
  'The percent operator gives the remainder after integer division. For nonnegative inputs it is the amount left over after making full groups.',
  [['14 % 4','The remainder is 2.'],['12 % 4','The remainder is 0.']],
  'Return the number of leftover items after making full groups of size. size is positive.','return 0;','return items%size;',[[[19,5],4],[[12,3],0]]);
math('parentheses','Control order with parentheses','int solve(int base, int extra, int groups)',
  'Multiplication happens before addition by default. Parentheses make the expression inside them evaluate first.',
  [['2 + 3 * 4','Java computes 2 + 12, which is 14.'],['(2 + 3) * 4','Java computes 5 times 4, which is 20.']],
  'Add base and extra first, then multiply that sum by groups.','return 0;','return (base+extra)*groups;',[[[2,3,4],20],[[5,1,2],12]]);
math('long','Use long for larger whole numbers','long solve(int crates, int perCrate)',
  'An int has limited range. A long can hold larger whole numbers. Convert at least one operand to long before multiplication so Java does the multiplication using long.',
  [['long count = 3000000000L;','L makes the literal a long.'],['long total = (long) 50000 * 50000;','The product is 2,500,000,000.']],
  'Return the product of crates and perCrate as a long. Some products exceed the int range.','return 0;','return (long)crates*perCrate;',[[[50000,50000],2500000000],[[3,8],24]]);
math('boolean','Use true and false','boolean solve(boolean enabled)',
  'A boolean holds one of two values, true or false. Both are Java keywords and have no quotes.',
  [['boolean lamp = true;','lamp holds true.'],['return false;','A method with boolean return type can send back false.']],
  'Return the boolean input enabled.','return false;','return enabled;',[[[true],true],[[false],false]]);
math('greater','Compare with > and >=','boolean solve(int temperature)',
  'Greater than (>) excludes equality. Greater than or equal to (>=) includes the boundary. A comparison produces a boolean.',
  [['10 > 10','The result is false.'],['10 >= 10','The result is true.']],
  'Return true when temperature is at least 20.','return false;','return temperature>=20;',[[[20],true],[[19],false],[[35],true]]);
math('less','Compare with < and <=','boolean solve(int remaining)',
  'Less than (<) accepts smaller values only. Less than or equal to (<=) accepts smaller values and the exact boundary.',
  [['4 < 5','The result is true.'],['5 <= 5','The result is true.']],
  'Return true when remaining is strictly less than 5.','return false;','return remaining<5;',[[[4],true],[[5],false]]);
math('equal','Check equal values with ==','boolean solve(int a, int b)',
  'A single equals sign assigns a value. Two equals signs compare primitive values. The != operator checks whether values differ.',
  [['3 == 3','The result is true.'],['3 != 3','The result is false.']],
  'Return true when a and b are equal.','return false;','return a==b;',[[[8,8],true],[[8,9],false]]);
math('not','Reverse a boolean with !','boolean solve(boolean blocked)',
  'A leading exclamation mark reverses a boolean. It can apply to a variable or a parenthesized comparison.',
  [['!true','The result is false.'],['!(3 > 8)','The comparison is false, so the result is true.']],
  'Return true when blocked is false and false when blocked is true.','return blocked;','return !blocked;',[[[true],false],[[false],true]]);
