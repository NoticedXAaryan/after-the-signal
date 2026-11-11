import {tutorial} from './tutorial.mjs';

const branch=tutorial('branches','Choosing what runs');
branch('and','Require both conditions with &&','boolean solve(boolean key, boolean power)',
  'The AND operator returns true only when both sides are true. Java evaluates the right side only if the left side is true.',
  [['true && false','The result is false.'],['true && true','The result is true.']],
  'Return true only if both key and power are true.','return false;','return key&&power;',[[[true,true],true],[[true,false],false],[[false,true],false]]);
branch('or','Accept either condition with ||','boolean solve(boolean switchA, boolean switchB)',
  'The OR operator returns true if at least one side is true. Java skips the right side when the left side is already true.',
  [['false || true','The result is true.'],['false || false','The result is false.']],
  'Return true if either switch is on.','return false;','return switchA||switchB;',[[[false,true],true],[[false,false],false],[[true,false],true]]);
branch('range','Combine two bounds','boolean solve(int level)',
  'Check each end of a range separately. Combine the two comparisons with &&. Include equality at an endpoint only when the rule includes it.',
  [['3 <= 5 && 5 <= 9','5 is inside the closed range 3 to 9.'],['3 <= 9 && 9 < 9','9 fails the upper bound when it is exclusive.']],
  'Return true for levels from 10 through 30, including both endpoints.','return false;','return level>=10&&level<=30;',[[[10],true],[[30],true],[[31],false],[[9],false]]);
branch('guard','Guard against division by zero','boolean solve(int items, int size)',
  'Put a safety check on the left side of &&. When the check is false, Java skips the expression on the right.',
  [['size != 0 && 8 % size == 0','With size 0, the result is false and % never runs.'],['size != 0 && 8 % size == 0','With size 4, the result is true.']],
  'Return true when size is nonzero and items is evenly divisible by size.','return false;','return size!=0&&items%size==0;',[[[12,3],true],[[12,0],false],[[12,5],false]]);
branch('if','Run a block only if a test passes','int solve(int stock, boolean delivery)',
  'Write if, a boolean condition in parentheses, and instructions inside braces. The instructions inside the braces only run when the condition is true.',
  [['if (true) { stock = stock + 1; }','The assignment runs.'],['if (false) { stock = stock + 1; }','The assignment is skipped.']],
  'Add 5 to stock only when delivery is true. Return the resulting stock.','if (delivery) {\n    // Update stock here.\n}\nreturn stock;','if(delivery){stock=stock+5;}return stock;',[[[9,true],14],[[9,false],9]]);
branch('else','Choose between two branches','String solve(boolean locked)',
  'An else block runs when the preceding if condition is false. Exactly one of the two branches runs.',
  [['if (cold) { return "Coat"; }\nelse { return "Shirt"; }','With cold true, the result is Coat.'],['if (cold) { return "Coat"; }\nelse { return "Shirt"; }','With cold false, the result is Shirt.']],
  'Return Locked when locked is true and Open otherwise.','if (locked) {\n    return "";\n} else {\n    return "";\n}','if(locked){return "Locked";}else{return "Open";}',[[[true],'Locked'],[[false],'Open']]);
branch('else-if','Check several branches in order','String solve(int level)',
  'Java checks if and else if conditions from top to bottom. Only the first matching branch runs. An else handles the remaining cases.',
  [['if (n >= 10) return "High";\nelse if (n >= 5) return "Mid";\nelse return "Low";','With n equal to 12, the result is High.'],['if (n >= 10) return "High";\nelse if (n >= 5) return "Mid";\nelse return "Low";','With n equal to 6, the result is Mid.']],
  'Return Full at 90 or higher, Half at 50 through 89, and Low below 50.','return "Low";','if(level>=90)return "Full";else if(level>=50)return "Half";else return "Low";',[[[90],'Full'],[[50],'Half'],[[49],'Low']]);
branch('early','Exit a method early','int solve(int amount)',
  'A return ends the method immediately. Put it inside an if to handle a special case before the ordinary rule.',
  [['if (n < 0) return -1;\nreturn n + 1;','With n equal to -2, the method ends with -1.'],['if (n < 0) return -1;\nreturn n + 1;','With n equal to 4, the method returns 5.']],
  'Return -1 for a negative amount. Otherwise return twice the amount.','// Handle a negative amount first.\nreturn amount;','if(amount<0)return -1;return amount*2;',[[[-2],-1],[[6],12],[[0],0]]);
branch('scope','Use variables inside their scope','int solve(int a, int b)',
  'A variable declared inside braces can be used until those braces close. Declare a result outside the branches when you need it afterwards.',
  [['int result = 0;\nif (true) { result = 8; }\nreturn result;','The result is visible after the block.'],['if (true) { int local = 8; }\n// local is out of scope here.','The name local is only available inside the braces.']],
  'Set result to the larger of a and b using if and else, then return result after the branches.','int result = 0;\n// Choose result here.\nreturn result;','int result;if(a>b){result=a;}else{result=b;}return result;',[[[2,7],7],[[7,2],7],[[-2,-4],-2]]);
branch('ternary','Choose a value with ? and :','int solve(boolean sale, int price)',
  'A conditional expression has a condition, a question mark, the value for true, a colon, and the value for false.',
  [['true ? 4 : 7','The value is 4.'],['false ? "A" : "B"','The value is B.']],
  'Use a conditional expression to return price minus 2 when sale is true, or price otherwise.','return price;','return sale?price-2:price;',[[[true,8],6],[[false,8],8]]);
branch('switch','Match a value with switch','String solve(int code)',
  'A switch expression compares one value to its case labels. Each arrow gives the result for that case. default handles values that match no case.',
  [['return switch (n) { case 1 -> "One"; default -> "Other"; };','With n equal to 1, this returns One.'],['return switch (n) { case 1 -> "One"; default -> "Other"; };','With n equal to 7, this returns Other.']],
  'Use a switch expression to return Open for code 1, Closed for code 2, and Unknown for any other code.','return switch (code) {\n    default -> "Unknown";\n};','return switch(code){case 1 -> "Open";case 2 -> "Closed";default -> "Unknown";};',[[[1],'Open'],[[2],'Closed'],[[5],'Unknown']]);
branch('even','Combine remainder and a comparison','boolean solve(int n)',
  'An even number has remainder zero when divided by 2. First get the remainder, then compare it to zero.',
  [['6 % 2 == 0','The result is true.'],['7 % 2 == 0','The result is false.']],
  'Return true if n is even. Include zero and negative even numbers.','return false;','return n%2==0;',[[[0],true],[[-4],true],[[-3],false]]);

const repeat=tutorial('loops','Repeating instructions');
repeat('increment','Increase a value with ++','int solve(int counter)',
  'As a standalone instruction, counter++ adds one to counter. Read counter on the next line to get the updated value.',
  [['int x = 2;\nx++;','x becomes 3.'],['int x = -1;\nx++;','x becomes 0.']],
  'Increase counter twice with ++ and return it.','counter++;\nreturn counter;','counter++;counter++;return counter;',[[[3],5],[[-2],0]]);
repeat('decrement','Decrease a value with --','int solve(int lives)',
  'As a standalone instruction, lives-- subtracts one. Use one update for each unit you need to remove.',
  [['int x = 3;\nx--;','x becomes 2.'],['int x = 0;\nx--;','x becomes -1.']],
  'Decrease lives twice with -- and return it.','lives--;\nreturn lives;','lives--;lives--;return lives;',[[[5],3],[[2],0]]);
repeat('compound','Update a running value with +=','int solve(int total, int change)',
  'total += change reads the current total, adds change, and stores the new value. Similarly, total -= change subtracts change.',
  [['int x = 3;\nx += 4;','x becomes 7.'],['int x = 8;\nx -= 2;','x becomes 6.']],
  'Add change to total with +=, then return it.','return total;','total+=change;return total;',[[[5,4],9],[[5,-2],3]]);
repeat('while','Repeat while a condition is true','int solve(int n)',
  'A while loop checks its condition before each pass. Update a variable inside the loop so that the condition eventually becomes false.',
  [['int x = 0;\nwhile (x < 2) { x++; }','The body runs twice and x ends at 2.'],['int x = 3;\nwhile (x < 2) { x++; }','The body never runs.']],
  'Starting at n, use while to increase it until it reaches 10. Leave n alone if it is already at least 10. Inputs range from 0 to 20.',
  'while (n < 10) {\n    n += 2; // Change this to increase n by one.\n}\nreturn n;','while(n<10){n++;}return n;',[[[5],10],[[10],10],[[13],13]]);
repeat('for','Count passes with for','int solve(int n)',
  'A for loop groups setup, condition, and update. Start at 0, keep going while i < n, and increase i after each pass to run the body n times.',
  [['for (int i = 0; i < 3; i++) { System.out.println(i); }','The console shows 0, 1, and 2.'],['for (int i = 0; i < 0; i++) { System.out.println(i); }','The body does not run.']],
  'Use the for loop to add 2 to total n times. n is nonnegative.','int total = 0;\nfor (int i = 0; i < n; i++) {\n    // Update total.\n}\nreturn total;','int total=0;for(int i=0;i<n;i++){total+=2;}return total;',[[[4],8],[[0],0]],{time:'O(n)'});
repeat('inclusive','Include the final iteration','int solve(int n)',
  'The loop condition determines the last value reached. i <= n includes n. i < n stops before n.',
  [['for (int i = 1; i <= 3; i++) { System.out.println(i); }','This prints 1, 2, and 3.'],['for (int i = 1; i < 3; i++) { System.out.println(i); }','This prints 1 and 2.']],
  'Add all whole numbers from 1 through n. Return zero when n is zero. n is at most 100.',
  'int sum = 0;\n// Use a for loop that includes n.\nreturn sum;','int sum=0;for(int i=1;i<=n;i++){sum+=i;}return sum;',[[[5],15],[[1],1],[[0],0]],{time:'O(n)'});
repeat('countdown','Loop backwards','void solve(int n)',
  'A for loop can start at a high value and update with i--. Use a lower bound in the condition so it knows when to stop.',
  [['for (int i = 2; i >= 1; i--) { System.out.println(i); }','This prints 2, then 1.'],['for (int i = 3; i > 1; i--) { System.out.println(i); }','This prints 3, then 2.']],
  'Print n down through 1, one number per line. n is positive.','// Count backwards from n.','for(int i=n;i>=1;i--){System.out.println(i);}',[[[3],'3\n2\n1\n'],[[1],'1\n']],{prints:true,time:'O(n)'});
repeat('stride','Advance in steps larger than one','int solve(int limit)',
  'The update of a loop can use += 2 or any other amount. Choose a starting value and step that visit the numbers you need.',
  [['for (int i = 0; i < 6; i += 2) { System.out.println(i); }','This visits 0, 2, and 4.'],['for (int i = 1; i < 6; i += 2) { System.out.println(i); }','This visits 1, 3, and 5.']],
  'Sum the positive even numbers up through limit. limit is nonnegative and at most 100.',
  'int total = 0;\n// Start at 2 and increase by 2.\nreturn total;','int total=0;for(int i=2;i<=limit;i+=2){total+=i;}return total;',[[[7],12],[[4],6],[[0],0]],{time:'O(n)'});
repeat('break','Stop a loop with break','int solve(int n, int target)',
  'break ends the nearest loop. Instructions after the loop still run. A condition can decide when to break.',
  [['for (int i = 0; i < 5; i++) {\n    if (i == 2) break;\n    System.out.println(i);\n}','This prints 0 and 1.'],['while (true) { break; }\nSystem.out.println("Done");','The loop exits immediately and prints Done.']],
  'Count the values from 0 up to but excluding n. Stop counting before target if you reach it.',
  'int count = 0;\nfor (int i = 0; i < n; i++) {\n    // Stop before counting target.\n    count++;\n}\nreturn count;','int count=0;for(int i=0;i<n;i++){if(i==target)break;count++;}return count;',[[[6,2],2],[[3,9],3],[[5,0],0]],{time:'O(n)'});
repeat('continue','Skip one pass with continue','int solve(int n, int skip)',
  'continue skips the rest of the current pass. In a for loop, the update still runs and the next condition is checked.',
  [['for (int i = 0; i < 3; i++) {\n    if (i == 1) continue;\n    System.out.println(i);\n}','This prints 0 and 2.'],['for (int i = 0; i < 2; i++) {\n    if (i == 0) continue;\n    System.out.println(i);\n}','This prints only 1.']],
  'Sum 1 through n, except skip the value equal to skip.',
  'int total = 0;\nfor (int i = 1; i <= n; i++) {\n    // Skip the matching value.\n    total += i;\n}\nreturn total;','int total=0;for(int i=1;i<=n;i++){if(i==skip)continue;total+=i;}return total;',[[[5,3],12],[[3,9],6],[[0,0],0]],{time:'O(n)'});
repeat('do-while','Run at least once with do while','int solve(int start)',
  'A do while loop runs its body before checking the condition. Even when the condition is false at the first check, the body has already run once.',
  [['int x = 0;\ndo { x++; } while (x < 3);','x ends at 3.'],['int x = 9;\ndo { x++; } while (x < 3);','x ends at 10.']],
  'Increase start at least once, then keep increasing it while it is below 5. Return the final value. start is between 0 and 10.',
  '// Use a do while loop.\nreturn start;','do{start++;}while(start<5);return start;',[[[1],5],[[5],6],[[8],9]]);
repeat('nested','Repeat a loop inside another','int solve(int rows, int columns)',
  'The inner loop restarts for each pass of the outer loop. Together they can visit every pair of a row and a column.',
  [['for (int r = 0; r < 2; r++) {\n    for (int c = 0; c < 3; c++) { count++; }\n}','The inner instruction runs six times.'],['for (int r = 0; r < 2; r++) {\n    for (int c = 0; c < 0; c++) { count++; }\n}','The inner instruction never runs.']],
  'Use two loops to count cells in a grid with rows rows and columns columns.',
  'int count = 0;\n// Loop over rows, then columns.\nreturn count;','int count=0;for(int r=0;r<rows;r++){for(int c=0;c<columns;c++){count++;}}return count;',[[[2,4],8],[[3,0],0]],{time:'O(rows × columns)'});
