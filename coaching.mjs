// The first room assumes the player has never typed a line of Java.
// Each demonstration is independent of the level's graded answer.
const opening = {
  run: [
    'Mara brought a blank terminal back from the offices. Its screen works. Before you connect it to anything, teach it to show a message you can recognize.',
    'You give the computer instructions by typing code. Run asks Java to check the instructions and carry them out. The console is where you see what the program printed.',
    [['System.out', 'The standard output stream. In this app, what you send here appears in the console.'], ['println(…)','Print what is inside the parentheses, then start a new line.'], ['"Hello"', 'The double quotes tell Java where the text begins and ends. The quotes themselves do not print.'], [';', 'Ends this Java statement.']],
    'If Java reports an error after your edit, look for both double quotes and the semicolon. If it runs but prints the wrong word, check its capitalization.',
    'Welcome to the old office. You have a working screen, but nothing to show on it yet. Code is a set of instructions for the computer. To see an instruction work, run the first example. System dot out is where the message goes. Print line is the instruction that puts the message on the screen. The quotation marks surround the text, and the semicolon ends the instruction. The first example prints Hello. The second prints Water ready. In your editor, run the starter and look for Start in the results. Then change only the word inside the quotes to Ready and check the level.',
  ],
  'two-lines': [
    'The gate has room for two messages, one below the other.',
    'Java runs these statements from top to bottom. Each call to println moves the cursor down after it prints.',
    [['First println','Writes the first line.'],['Second println','Starts where the first instruction left the cursor: at the start of the next line.']],
    'Adding a blank line in your editor does not add one to the console. It takes another print instruction to change the output.',
    'This time the gate needs two lines. Java runs the first print line statement before it runs the second. After printing A, the first statement moves the cursor down. That is where the second statement prints B. A blank line in the editor does not print a blank line. In your task, keep the instruction that prints North. Add a separate instruction underneath it for South.',
  ],
  print: [
    'The port number belongs beside its label, on the same line.',
    'Picture a cursor in the console. print leaves it next to the last character. println writes its text and moves the cursor down.',
    [['print','Leave the cursor on this line.'],['println','Finish this line and move down.'],['"Gate "','The space before the closing quote is part of the text.']],
    'Java does not insert a space between two print calls. Add it inside a quoted message if the words should be separated.',
    'Print and print line both write to the console. The difference is where the next character goes. Print stays on the same line. Print line moves down after writing. Notice the space in the Gate example. Java would join the words without that space. Use the starter to print the port label and then finish the same line with the number seven.',
  ],
  comment: [
    'Someone left instructions scratched out in the old terminal.',
    'Java ignores a comment that begins with two forward slashes. A comment is for the person reading the code.',
    [['//','Starts a line comment. Everything after it on that line is ignored.'],['Next line','Java checks this line normally unless it is a comment too.']],
    'Remove just the two slashes to reactivate the starter instruction. You do not need to rewrite the whole line.',
    'A line comment starts with two forward slashes. Java ignores everything after them until the next line. In the first example, the note stays in the editor, and only On appears in the console. In the second example, the instruction to print Off is still visible, but Java skips it. Remove the slashes in the starter so the instruction prints Signal.',
  ],
  number: [
    'The quartermaster wants the total, rather than the marks you used to calculate it.',
    'A whole number written directly in code is a numeric literal. Java can calculate with it. Double quotes turn those same characters into text.',
    [['2 + 3','Java adds the numbers first.'],['"2 + 3"','Java keeps the characters as written.'],['println(…)','Prints the value Java gets after evaluating what is inside the parentheses.']],
    'The quotes are the important difference between the examples. If you see a plus sign in the console, check whether your calculation is inside quotes.',
    'Compare the two examples. Without quotes, two plus three is a calculation, so Java prints five. With quotes, the digits and plus sign are characters, so Java prints them as they are. In the editor, give the print instruction the expression nine plus four. Let Java do the addition.',
  ],
  return: [
    'The relay wants a number it can use itself. Showing that number on a screen is a different job.',
    'The tester calls a method, which is a named group of instructions. return hands a value back to whoever called the method and stops that call.',
    [['int solve()','The app supplies a method named solve that gives back a whole number.'],['return 3;','Send 3 back to the caller.'],['println(…)','Writes a message to the console instead.']],
    'On this level the test checks the returned result. Printing the correct number will not replace return.',
    'Up to now you have been writing to the console. Here, another part of the program calls your method and needs a number back. Return gives the number to the caller and ends the method. Return three gives back three. Return two plus four gives back six. Change the starter so it returns seven. You only need the instruction inside the method.',
  ],
  input: [
    'The gauge changes throughout the day. The relay passes the latest reading to your method each time it calls it.',
    'A parameter is a name for a value supplied by the caller. You can use the name immediately. Each test call can supply a different value.',
    [['int reading','A whole number comes in under the name reading.'],['reading + 1','Look up the current value and add one.'],['return …','Give a value back to the caller.']],
    'A fixed number can appear to work for one test. Try tracing the same instruction with a second number, including a negative one.',
    'A parameter is a named input. When the caller sends four, reading holds four. On a later call, the caller could send nine or negative three. The name stays the same, but the value can change. Return the reading unchanged. Try thinking through your code with two different inputs before checking it.',
  ],
  declare: [
    'The supply ledger needs a named spot for the total so you can use it later.',
    'Declare a variable the first time you introduce its name. Java calculates the expression on the right and stores the result under the name on the left.',
    [['int','The variable holds a whole number.'],['count','The name you use to read the value.'],['= 3','Store three as the starting value.']],
    'Use the variable name without quotation marks when you want its stored value.',
    'A variable is a named place to keep a value. In the first example, int tells Java to expect a whole number. Count is the name, and the equals sign stores three in it. Return count then reads that stored three. In the task, use the number of crates to calculate the total. Store the total under its own name, then return it.',
  ],
  assign: [
    'A delivery arrived. Update the stock already recorded in the ledger.',
    'Read an assignment from right to left: work out the right-hand side first, then replace the value under the name on the left.',
    [['x = 9','Replace the old value with 9.'],['x = x + 3','Read the old x, add 3, then store the result back into x.']],
    'A parameter already has a name and a type. Do not write int again when you update it.',
    'The equals sign here means store a value. It does not ask whether two things are equal. In x equals x plus three, Java first reads the old value of x. If it was two, the sum is five. Only then does Java replace x with five. Apply that same pattern to the stock you received and return the updated value.',
  ],
  copy: [
    'Before clearing the counter, record its old value in a separate tally.',
    'An int assignment copies the number at that moment. The two names can hold different values after you update one of them.',
    [['int b = a','Copy the current number from a into b.'],['a = 9','Update a. The number stored in b stays as it was.']],
    'Copy the input before setting it to zero. Once you replace the original number, it is too late to read it from that variable.',
    'Copy a whole number into a second variable before changing the first one. If a holds four when you copy it into b, b gets its own four. Changing a to nine later does not change b. For the task, make a copy of the input first. Then clear the original and return the copy.',
  ],
  string: [
    'The label on the recovered panel is text, so the ledger needs a different kind of value.',
    'A String holds text. String names the type, and double quotes make a literal value. String starts with a capital S in Java.',
    [['String name','Declare a place for text.'],['"Cairn"','A literal string with five characters.'],['""','An empty string with zero characters.']],
    'Capital letters matter both in Java names and in the text the tests expect.',
    'A String holds text. The first example stores the word Cairn under the name called name. Its capital C is part of the value. Two double quotes with nothing between them give an empty string. For your task, store the label Relay with a capital R, then return the variable.',
  ],
  concat: [
    'The terminal should greet different travelers without having to rewrite its instructions.',
    'Joining text is called concatenation. Java puts the left string immediately before the right string, preserving any spaces you included.',
    [['"North" + "Gate"','No space was supplied, so the words touch.'],['"Hi " + "Mara"','The space is part of the first string.']],
    'The parameter name goes outside the quotes. Inside quotes, Java would write the letters n, a, m, e instead of reading the supplied name.',
    'The plus sign can join strings. North plus Gate gives NorthGate without a space. The Hi example includes a space just before the closing quote, so the two words stay separate. In the task, join a greeting with the input name. Keep the space inside the greeting and use the parameter outside the quotes.',
  ],
};

export function coachingFor(id) {
  const entry = opening[id.replace(/^learn-/, '')];
  if (!id.startsWith('learn-') || !entry) return null;
  const [scene, concept, syntax, pitfall, script] = entry;
  return {scene, concept, syntax, pitfall, script};
}

// Show the evaluated value in a console, including for snippets that use return.
const demos = {
  return: [['int','',''],['int','','']],
  input: [['int','int reading','4'],['int','int reading','9']],
  declare: [['int','',''],['int','int crates','8']],
  assign: [['int','','','x'],['int','','','x']],
  copy: [['int','','','b'],['int','','','a']],
  string: [['String','',''],['String','','']],
  concat: [['String','',''],['String','','']],
};
export const firstPredictions = {
  'learn-run':['What appears when Java runs System.out.println("Hello");?',['Hello','"Hello"','Nothing until another line runs'],0,'The quotes mark the text in Java. The console displays the text without the quotes.'],
  'learn-two-lines':['What actually moves the console cursor to the next line?',['A blank line in the editor','The ln in println','The semicolon'],1,'println prints its value and then a line break. The semicolon ends a Java statement.'],
  'learn-print':['What follows print("North") and then println("Gate")?',['North Gate','NorthGate','Two lines'],1,'Neither command inserts a space between the words. Only println appends a line break.'],
  'learn-comment':['What runs if a line starts with //?',['Everything after //','Only the first word','Nothing on that line'],2,'The comment ends at the next line, where normal Java code can run again.'],
  'learn-number':['What does println("9 + 4") show?',['13','9 + 4','A compile error'],1,'The quotes make this text. To calculate, put the expression outside quotes.'],
  'learn-return':['Which instruction gives a number back to the code that called this method?',['System.out.println(7);','return 7;','// 7'],1,'return gives the caller a value. println writes to the console instead.'],
  'learn-input':['If the caller changes reading from 4 to −3, what does return reading give back?',['4','−3','The word reading'],1,'A parameter takes the value passed into that particular call.'],
  'learn-declare':['What does int count = 3; tell Java about count?',['It stores a whole number and starts at 3.','It stores the text 3.','It is an input from the console.'],0,'int is the type, count is the name, and 3 is its starting value.'],
  'learn-assign':['If x starts at 4, what does x = x + 2 leave in x?',['4','2','6'],2,'Java computes the right side using the old x, then stores the result.'],
  'learn-copy':['If b copies a when a is 4, and a later becomes 9, what is b?',['4','9','Neither'],0,'Copying an int copies the number. Later assignments to a do not change b.'],
  'learn-string':['Which Java value is text containing zero characters?',['" "','""','null'],1,'A space is one character. An empty string exists and contains no characters; null refers to no object.'],
  'learn-concat':['Why does "Hi" + "Pip" print HiPip?',['Java removes spaces.','The strings contain no space at the join.','The plus sign counts characters.'],1,'String concatenation preserves the characters supplied. Include a space in either string if you need one.'],
};
export function exampleProgram(id, index, snippet) {
  if (!coachingFor(id)) return null;
  const demo = demos[id.slice(6)]?.[index];
  if (!demo) return 'public class Main { public static void main(String[] args) {\n'+snippet+'\n} }';
  const [type, parameters, args, result] = demo;
  return 'public class Main {\nstatic '+type+' demo('+parameters+') {\n'+snippet+'\n'+
    (result?'return '+result+';\n':'')+'}\npublic static void main(String[] args) { System.out.println(demo('+args+')); }\n}';
}
