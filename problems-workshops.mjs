import {tutorial} from './tutorial.mjs';

const first = tutorial('first','First steps');
first('read-line','Read a line with Scanner','String solve(String incoming)',
  'A console can take input as well as display output. Scanner reads from a source; nextLine takes the entire next line, including spaces, and leaves out the line break. The worked examples read from the console. In the graded editor, incoming supplies the same kind of text without waiting for someone to type.',
  [
    ['Scanner console = new Scanner(System.in);\nString name = console.nextLine();\nSystem.out.println(name);','The program prints North Gate as one line. nextLine keeps the space between the two words.',{stdin:'North Gate\n'}],
    ['Scanner console = new Scanner(System.in);\nString first = console.nextLine();\nSystem.out.println(first);','Only Pip is printed. The second line is still unread.',{stdin:'Pip\nMara\n'}],
  ],
  'Create a Scanner with incoming as its source. Return the entire first line. Every test contains at least one line, which may be empty.',
  'Scanner input = new Scanner(incoming);\nreturn "";','Scanner input = new Scanner(incoming); return input.nextLine();',
  [[['North Gate\nSecond line\n'],'North Gate'],[['\nSecond line'],''],[['Pip'],'Pip'],[['Mara\r\nPip'],'Mara']],
  {after:'learn-concat',check:['If the input is North Gate on one line, what does nextLine return?',['North','North Gate','North Gate plus a line break'],1,'nextLine keeps spaces inside the line and consumes the line break without returning it.']});

first('receipt','Field repair · Print a supply receipt','void solve(String incoming)',
  'Keep input, processing, and output separate. First read one complete line. Then build the label and print it. The second print is a separate line. Trace the same instructions with a different name before you submit.',
  [
    ['String name = "Pip";\nSystem.out.println("Guide: " + name);\nSystem.out.println("Proceed");','This prints Guide: Pip on the first line and Proceed on the second.',{stdin:''}],
    ['Scanner console = new Scanner(System.in);\nString place = console.nextLine();\nSystem.out.println("Site: " + place);','The space in North Gate is kept when the site label prints.',{stdin:'North Gate\n'}],
  ],
  'Read the first line of incoming using a Scanner. Print Item: followed by one space and that line. On a new line print Recorded. Ignore any other input lines.',
  'Scanner input = new Scanner(incoming);\n// Read the item name and print the receipt.','Scanner input = new Scanner(incoming); String name = input.nextLine(); System.out.println("Item: " + name); System.out.println("Recorded");',
  [[['Rope\n'],'Item: Rope\nRecorded\n'],[['Copper wire\nIgnore this'],'Item: Copper wire\nRecorded\n'],[['seal kit'],'Item: seal kit\nRecorded\n']],
  {after:'learn-read-line',prints:true,workshop:true,check:['Why would calling next() lose part of Copper wire?',['It reads only the first whitespace-separated word.','It removes all vowels.','It reads every line.'],0,'next() reads a token. nextLine() reads the rest of an entire line.']});

const numbers = tutorial('values','Numbers and decisions');
numbers('kiln-time','Field repair · Calculate a kiln schedule','int solve(int trays, int elapsed)',
  'Follow the units. Tray count is a count; elapsed is in minutes. Convert the tray count to preparation minutes before adding. Name the intermediate result so you can inspect it.',
  [['int drying = 3 * 4;\nreturn drying + 10;','Three batches at four minutes each take 12 minutes. Add 10 elapsed minutes to get 22.'],['int drying = 0 * 4;\nreturn drying + 10;','With zero batches, only the 10 elapsed minutes remain.']],
  'Each tray takes three minutes to prepare. Return preparation minutes plus elapsed kiln minutes. Both inputs are nonnegative.',
  'int preparation = 0;\nreturn preparation;', 'int preparation = trays * 3; return preparation + elapsed;',
  [[[4,12],24],[[0,18],18],[[5,0],15],[[2,7],13]],
  {workshop:true,source:'lasagna',check:['For four trays, which quantity can you safely add to 12 elapsed minutes?',['4 trays','12 preparation minutes','3 minutes per tray'],1,'Four trays multiplied by three minutes per tray is 12 minutes. Now both quantities are in minutes.']});

const branches = tutorial('branches','Choosing what runs');
branches('quiet-entry','Field repair · Choose a safe entry','boolean solve(boolean guardAwake, boolean partnerReady, boolean dogPresent)',
  'Start with what all safe paths have in common. Then ask which of the remaining conditions can substitute for one another. Write down one case with the dog and one without it.',
  [['boolean safe = !alarm && (guide || map);','A quiet alarm is required. The guide or the map can satisfy the other part.'],['boolean safe = false && (true || true);','The answer is false even though both alternatives are present.']],
  'Return whether the rescue can proceed. The guard must be asleep. When the guard is asleep, either a ready partner or the dog makes entry possible.',
  '// Write the rule for safe entry.\nreturn false;', 'return !guardAwake && (partnerReady || dogPresent);',
  [false,true].flatMap(g=>[false,true].flatMap(p=>[false,true].map(d=>[[g,p,d],!g&&(p||d)]))),
  {workshop:true,source:'annalyns-infiltration',check:['The guard is awake and the dog is present. Which result follows the rules?',['true','false'],1,'The guard must be asleep in both rescue paths. The dog replaces the partner condition only.']});

const loops = tutorial('loops','Repeating instructions');
loops('fuel-tally','Field repair · Tally fuel deliveries','int solve(int days)',
  'A loop changes state in small steps. Write the first value, the next value, and the point where the condition becomes false. An accumulator holds the sum of deliveries processed so far.',
  [['int total = 0;\nfor (int day = 1; day <= 3; day++) {\n    total += day;\n}','After day 1, the total is 1; after day 2 it is 3; after day 3 it is 6.'],['int total = 0;\nfor (int day = 1; day <= 0; day++) {\n    total += day;\n}','The first condition is false, so total stays zero.']],
  'Day 1 delivers two units, day 2 delivers four, and each following day delivers twice its day number. Return the total for days 1 through days, inclusive. days is between 0 and 100.',
  'int total = 0;\n// Add each delivery to total.\nreturn total;', 'int total = 0; for (int day = 1; day <= days; day++) total += day * 2; return total;',
  [[[3],12],[[0],0],[[1],2],[[6],42]], {workshop:true,time:'O(n)',source:'bird-watcher',
    check:['For three days, which delivery is missed if the condition is day < days?',['The first','The third','None'],1,'The condition becomes false on day 3, so that day is never added.']});

const arrays = tutorial('arrays','Working with arrays');
arrays('bird-log','Field repair · Read the bird log','int solve(int[] dailyCounts, int threshold)',
  'An array stores one count per day. This task asks how many days matched the rule, not how many birds were counted. Increase the result by one for each matching entry.',
  [['int[] observations = {1, 6, 3};','With a threshold of 3, the entries 6 and 3 count as two matching days.'],['int[] observations = {};','There are no entries to examine, so the answer is zero.']],
  'Return the number of days whose bird count is at least threshold. The array can be empty. Do not change the array.',
  'int matchingDays = 0;\n// Visit every day.\nreturn matchingDays;', 'int n = 0; for (int birds : dailyCounts) if (birds >= threshold) n++; return n;',
  [[[[1,6,3],3],2],[[[],3],0],[[[4],4],1],[[[9,0,9],1],2],[[[0,0],1],0]],{workshop:true,time:'O(n)',source:'bird-watcher',
    check:['With counts [3, 1] and a threshold of 3, how many days match?',['0','1','3'],1,'At least includes equality. Count the matching day once, regardless of how many birds it records.']});

const text = tutorial('text','Working with text');
text('recover-log','Field repair · Recover a log message','String solve(String line)',
  'Work in three stages: locate the separator, take the part after it, then trim the edges. Later colons are part of the message. An empty message is still a valid string.',
  [['"TAG:  gate: open  ".indexOf(":")','The first colon has index 3. The second colon belongs to the message.'],['"  North Gate  ".trim()','The outer spaces are removed. The space between the words stays.']],
  'A log is a tag followed by a colon and a message. Return all text after the first colon, with whitespace removed from its ends. Preserve any later colons or internal spaces.',
  '// Find the first separator and then extract the message.\nreturn "";','int colon = line.indexOf(\':\'); return line.substring(colon + 1).trim();',
  [[['INFO:  relay online  '],'relay online'],[['WARN:  gate: jammed  '],'gate: jammed'],[['X:'],''],[['OK: North Gate\r\n'],'North Gate']],
  {workshop:true,time:'O(n)',space:'O(n)',source:'log-levels',check:['Which colon should you look up for TAG: gate: open?',['The first','The last','Both'],0,'The first colon separates the tag from the message. Everything afterward belongs to the message.']});

const methods = tutorial('methods','Methods, collections, and classes');
methods('survey-car','Field repair · Fix an object’s counter','int solve(int trips, int distancePerTrip)',
  'An instance field belongs to one object. A constructor sets that object’s starting values. A method can update the same instance field on every call. Keep a second object in the harness to catch accidental sharing.',
  [['Rover scout = new Rover(4);\nscout.drive();\nscout.drive();','A rover that moves four meters per drive has gone eight meters.'],['Rover spare = new Rover(4);','If spare has never moved, its distance is zero even when scout has driven.']],
  'Complete the Rover class. The constructor stores meters per drive. drive adds that amount to this rover’s distance. distance returns how far this rover has gone. Leave solve as provided; it checks that a second rover stays parked.',
  'Rover scout = new Rover(distancePerTrip);\nRover spare = new Rover(distancePerTrip);\nfor (int i = 0; i < trips; i++) scout.drive();\nreturn spare.distance() == 0 ? scout.distance() : -1;',
  'Rover scout = new Rover(distancePerTrip); Rover spare = new Rover(distancePerTrip); for (int i = 0; i < trips; i++) scout.drive(); return spare.distance() == 0 ? scout.distance() : -1;',
  [[[3,5],15],[[0,6],0],[[2,4],8],[[1,0],0]],
  {bodyOnly:false,workshop:true,time:'O(n)',source:'jedliks-toy-car',
    starterHelpers:'static class Rover { int perDrive; int meters; Rover(int step) { /* store step */ } void drive() { /* update this rover */ } int distance() { return meters; } }',
    helpers:'static class Rover { int perDrive; int meters; Rover(int step) { perDrive = step; } void drive() { meters += perDrive; } int distance() { return meters; } }',
    check:['What should happen to a parked second rover when the first one drives?',['It stays at zero.','It gains the same distance.','Its counter resets the first rover.'],0,'Distance is instance state. Each object keeps its own counter.']});

const contracts = tutorial('contracts','Contracts and failure');
contracts('overload','Choose a method by its inputs','int solve(int reading)',
  'Overloads share a method name but have different parameter lists. The compiler chooses the overload from the arguments supplied. Changing only the return type does not create a valid overload.',
  [['int scale(int n) { return n * 2; }','A call scale(3) uses the one-argument version.'],['int scale(int n, int by) { return n * by; }','A call scale(3, 4) uses the two-argument version.']],
  'Add a two-argument scale method that multiplies its two inputs. Keep the one-argument version and solve as provided.',
  'return scale(reading) + scale(reading, 3);','return scale(reading) + scale(reading,3);',[[[4],20],[[0],0],[[-2],-10]],
  {bodyOnly:false,source:'wizards-and-warriors-2',starterHelpers:'int scale(int n) { return n * 2; }',
    helpers:'int scale(int n) { return n * 2; } int scale(int n, int factor) { return n * factor; }'});
contracts('enum','Name a fixed set of states','String solve(boolean blocked)',
  'An enum names a fixed set of choices. Using a named constant prevents misspelled state names from creeping into comparisons. name returns the constant’s declared name.',
  [['enum Mode { STOP, RUN }','Only STOP and RUN are declared choices.'],['Mode current = Mode.STOP;\nreturn current.name();','This returns the text STOP.']],
  'Set mode to STOP when blocked is true and RUN otherwise. Return its name. The Mode enum is supplied.',
  'Mode mode = Mode.RUN;\nreturn mode.name();','Mode mode = blocked ? Mode.STOP : Mode.RUN; return mode.name();',
  [[[true],'STOP'],[[false],'RUN']],{bodyOnly:false,source:'logs-logs-logs',starterHelpers:'enum Mode { STOP, RUN }',helpers:'enum Mode { STOP, RUN }'});
contracts('unique','Use a Set for unique records','int solve(String[] labels)',
  'A Set represents membership. add returns false if the item already exists, and the size does not change. A HashSet is useful when you only care whether a label has appeared, not where it was added.',
  [['Set<String> seen = new HashSet<>();\nseen.add("rope");\nseen.add("rope");','There is one distinct label.'],['seen.add("water");','Adding a different label increases the distinct count.']],
  'Return the number of distinct labels. The array may be empty; upper and lower case remain distinct.',
  'Set<String> seen = new HashSet<>();\nreturn seen.size();','Set<String> seen = new HashSet<>(); for (String label : labels) seen.add(label); return seen.size();',
  [[[['rope','rope','water']],2],[[[]],0],[[['water','Water']],2]],{source:'gotta-snatch-em-all',time:'O(n) expected',space:'O(n)'});
contracts('interface','Use an interface as a promise','int solve(int voltage)',
  'An interface names methods callers can depend on. A class implements an interface by providing those methods. The caller can use a Signal reference without knowing which class implements it.',
  [['interface Signal { int read(); }','Every Signal must provide a read method that returns int.'],['class Lamp implements Signal {\n    public int read() { return 5; }\n}','A Lamp can be passed anywhere a Signal is expected.']],
  'Implement read in the Probe class so it returns the voltage stored by its constructor. Keep the Signal contract and solve.',
  'Signal probe = new Probe(voltage);\nreturn probe.read();','Signal probe = new Probe(voltage); return probe.read();',
  [[[7],7],[[0],0],[[-4],-4]],{bodyOnly:false,source:'remote-control-competition',
    starterHelpers:'interface Signal { int read(); } static class Probe implements Signal { int value; Probe(int v) { value = v; } public int read() { return 0; } }',
    helpers:'interface Signal { int read(); } static class Probe implements Signal { int value; Probe(int v) { value = v; } public int read() { return value; } }'});
contracts('catch','Handle a number that cannot be read','int solve(String text)',
  'Parsing turns digit text into a number. A NumberFormatException means parsing failed. Put the operation that can fail inside try, and catch that specific exception so other bugs remain visible.',
  [['Integer.parseInt("17")','The result is the integer 17.'],['Integer.parseInt("wet")','The input cannot be parsed as an integer, so Java throws NumberFormatException.']],
  'Return the integer in text. If it cannot be parsed as an int, including a value outside the int range, return -1.',
  'try {\n    return Integer.parseInt(text);\n} catch (NumberFormatException error) {\n    return 0;\n}',
  'try { return Integer.parseInt(text); } catch (NumberFormatException error) { return -1; }',
  [[['42'],42],[['wet'],-1],[['2147483648'],-1],[['-7'],-7]],{source:'calculator-conundrum',time:'O(n)'});
contracts('repair-contract','Field repair · Reject an unknown status','String solve(int code)',
  'Choose one clear policy for invalid input. Here the field reader throws a specific exception for unknown codes; its caller recovers and reports UNKNOWN. A successful read becomes a named state.',
  [['State state = State.HOLD;\nreturn state.name();','The caller receives HOLD.'],['throw new IllegalArgumentException("Unsupported state");','Execution leaves this method. A caller can catch this specific exception.']],
  'Complete decode. Code 0 means HOLD, 1 means OPEN, and 2 means CLOSE. Throw IllegalArgumentException for all other codes. solve is already written to catch it and return UNKNOWN.',
  'try {\n    return decode(code).name();\n} catch (IllegalArgumentException error) {\n    return "UNKNOWN";\n}',
  'try { return decode(code).name(); } catch (IllegalArgumentException error) { return "UNKNOWN"; }',
  [[[0],'HOLD'],[[1],'OPEN'],[[2],'CLOSE'],[[-1],'UNKNOWN'],[[99],'UNKNOWN']],
  {bodyOnly:false,workshop:true,source:'calculator-conundrum',
    starterHelpers:'enum State { HOLD, OPEN, CLOSE } State decode(int code) { return State.HOLD; }',
    helpers:'enum State { HOLD, OPEN, CLOSE } State decode(int code) { return switch (code) { case 0 -> State.HOLD; case 1 -> State.OPEN; case 2 -> State.CLOSE; default -> throw new IllegalArgumentException("Unsupported state"); }; }',
    check:['Why does decode throw for code 7?',['Seven means CLOSE.','Seven has no defined meaning.','Seven is larger than an int.'],1,'The contract defines only 0, 1, and 2. The caller, not decode, decides how to display an unknown state.']});
