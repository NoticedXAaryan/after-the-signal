import {chapter} from './curriculum.mjs';

const r=chapter('signal');
r('relay-units','A number in, a number out','Easy','int solve(int marks)',
  'Each mark represents four liters. Return the number of liters for marks, a whole number from 0 to 1,000,000.',
  'O(1)','O(1)','Use the value in marks. The expression after return should multiply it by four.',
  'return marks * 4;', [[[3],12],[[0],0],[[1],4],[[1000000],4000000]],
  {starterBody:'// Replace 0 with an expression that uses marks.\nreturn 0;'});
r('relay-warning','The red line','Easy','boolean solve(int reading)',
  'Return true when reading is 80 or higher. Otherwise return false. Readings are whole numbers from 0 to 100.',
  'O(1)','O(1)','Return the result of comparing reading with 80. Include equality.',
  'return reading >= 80;', [[[80],true],[[79],false],[[100],true],[[0],false]],
  {starterBody:'// Replace false with a comparison.\nreturn false;'});
r('relay-valve','One valve at a time','Easy','String solve(int level)',
  'Return "OPEN" below 30, "CLOSE" at 80 or higher, and "HOLD" otherwise. The level is a whole percentage from 0 to 100. Match the command spelling exactly.',
  'O(1)','O(1)','Use an if for each threshold and a final return for the remaining range.',
  'if(level<30)return "OPEN"; if(level>=80)return "CLOSE"; return "HOLD";',
  [[[50],'HOLD'],[[29],'OPEN'],[[30],'HOLD'],[[79],'HOLD'],[[80],'CLOSE']],
  {starterBody:'// Check the low and high thresholds here.\nreturn "HOLD";'});
r('relay-total','Count the barrels','Easy','long solve(int[] changes)',
  'Each entry is a signed change in liters. Return the sum of all entries. An empty log totals zero. The total fits in long but may exceed int.',
  'O(n)','O(1)','Start with a long total at zero. In a for-each loop, add the current entry.',
  'long total=0;for(int change:changes)total+=change;return total;',
  [[[[2,-1,4]],5],[[[]],0],[[[-5,3]],-2],[[[2147483647,2147483647]],4294967294]],
  {starterBody:'long total = 0;\nfor (int change : changes) {\n    // Update total with this change.\n}\nreturn total;'});
r('relay-leak','Find the first leak','Easy','int solve(int[] readings, int floor)',
  'Return the zero-based index of the first reading strictly below floor. Return -1 if no reading is below it. A reading equal to floor is safe.',
  'O(n)','O(1)','Use an indexed loop. Return the current index inside it as soon as the reading is too low.',
  'for(int i=0;i<readings.length;i++)if(readings[i]<floor)return i;return -1;',
  [[[[50,22,18],30],1],[[[30,50],30],-1],[[[0,50],1],0],[[[],30],-1]],
  {starterBody:'for (int i = 0; i < readings.length; i++) {\n    // Return i if this reading is too low.\n}\nreturn -1;'});
r('relay-restore','Restore Relay 07','Medium','String solve(int initial, int[] changes, int low, int high)',
  'The level starts at initial and changes by each signed entry in order. Return "ERROR" if initial or any intermediate level is outside 0 to 100, or unless 0 ≤ low < high ≤ 100. Otherwise return "OPEN" if the final level is below low, "CLOSE" if it is at least high, and "HOLD" in between.',
  'O(n)','O(1)','Validate the starting level and thresholds first. Track the current level as a long and reject an invalid level immediately after adding a change.',
  'if(initial<0||initial>100||low<0||low>=high||high>100)return "ERROR";long level=initial;for(int change:changes){level+=change;if(level<0||level>100)return "ERROR";}if(level<low)return "OPEN";if(level>=high)return "CLOSE";return "HOLD";',
  [[[45,[-20],30,80],'OPEN'],[[40,[40],30,80],'CLOSE'],[[30,[],30,80],'HOLD'],
   [[50,[60,-60],30,80],'ERROR'],[[-1,[50],30,80],'ERROR'],[[40,[],80,30],'ERROR'],[[40,[2147483647],30,80],'ERROR']],
  {starterBody:'// Validate the initial level and thresholds.\nlong level = initial;\nfor (int change : changes) {\n    // Update the level and reject impossible readings.\n}\n// Choose a command based on the final level.\nreturn "HOLD";'});
