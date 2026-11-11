// Adapted from exercism/java at be2d006c30c50e0154231dd987d5a3b5526c0427 (MIT).
// See THIRD-PARTY-NOTICES.md. Exercises are split into independently runnable methods.
import {chapter} from './curriculum.mjs';

const base = 'https://exercism.org/tracks/java/exercises/';
export const archiveSets = {
  lasagna: {name:'Lasagna', intro:'A kitchen timer is a small program. Build its rules one method at a time, then combine them.'},
  'annalyns-infiltration': {name:'Annalyn’s Infiltration', intro:'Translate an RPG rescue plan into boolean decisions. The dog changes the rules.'},
  'log-levels': {name:'Log Levels', intro:'Recover a message and severity from the same log line, then put them back together.'},
  'captains-log': {name:'Captain’s Log', intro:'Generate a repeatable radio channel from a seed.'},
  'booking-up-for-beauty': {name:'Booking Up for Beauty', intro:'Parse and move a scheduled date.'},
  'beauty-salon-regulars': {name:'Beauty Salon Regulars', intro:'Apply a calendar rule without counting weekdays by hand.'},
  secrets: {name:'Secrets', intro:'Change one bit of a status panel without touching its other bits.'},
};
function archive(slug, topic) {
  const add = chapter(topic);
  return (part, title, signature, prompt, lesson, hint, body, cases, linear = false) =>
    add('exercism-'+part, title, 'Easy', signature, prompt, linear?'O(n)':'O(1)', linear?'O(n)':'O(1)', hint, body, cases, {
      kind:'Exercism practice',
      practiceSource:{slug, name:archiveSets[slug].name, url:base+slug, lesson},
      bodyOnly:true,
      starterBody:signature.startsWith('String')?'return "";':signature.startsWith('boolean')?'return false;':'return 0;',
    });
}

const cook = archive('lasagna','java');
cook('oven','Lasagna 1 · Read the recipe','int expectedMinutesInOven()',
  'Return the recipe’s fixed oven time: 40 minutes.',
  'A method with empty parentheses takes no input. It can still give a result to the caller.',
  'Use return with a whole number.', 'return 40;', [[[],40]]);
cook('remaining','Lasagna 2 · Time remaining','int remainingMinutesInOven(int actualMinutesInOven)',
  'The recipe says 40 minutes. Return how many of those minutes are left after actualMinutesInOven.',
  'Read the input name to get the elapsed time. For an oven timer, subtract what already happened from the original target.',
  'If 30 minutes elapsed, there are 10 left.', 'return 40 - actualMinutesInOven;', [[[30],10],[[0],40],[[40],0]]);
cook('prep','Lasagna 3 · Count the layers','int preparationTimeInMinutes(int layers)',
  'Each layer takes two minutes to prepare. Return the preparation time for layers layers.',
  'Multiplication is repeated addition. Three layers at two minutes each take six minutes.',
  'Java uses * to multiply.', 'return layers * 2;', [[[2],4],[[0],0],[[5],10]]);
cook('total','Lasagna 4 · Finish the timer','int totalTimeInMinutes(int layers, int actualMinutesInOven)',
  'Return the preparation time plus the minutes already spent in the oven. Each layer takes two minutes to prepare.',
  'This method has two parameters with different units: layers and minutes. Convert the layer count to minutes before adding.',
  'Calculate the prep time in a variable first so both terms are in minutes.', 'int prep = layers * 2; return prep + actualMinutesInOven;', [[[3,20],26],[[0,40],40],[[1,0],2],[[5,30],40]]);

const rescue = archive('annalyns-infiltration','java');
rescue('attack','Infiltration 1 · Fast attack','boolean canFastAttack(boolean knightIsAwake)',
  'Return whether Annalyn can attack quickly. She can do this only while the knight is asleep.',
  'The input describes whether the knight is awake. The action needs the opposite condition.',
  'Put ! before a boolean to reverse its value.', 'return !knightIsAwake;', [[[true],false],[[false],true]]);
rescue('spy','Infiltration 2 · Spy on the camp','boolean canSpy(boolean knightIsAwake, boolean archerIsAwake, boolean prisonerIsAwake)',
  'Return whether at least one of the three people is awake.',
  'The phrase “at least one” points to OR. The result should still be true if two people are awake.',
  'Join the three conditions with ||.', 'return knightIsAwake || archerIsAwake || prisonerIsAwake;',
  [[[false,false,false],false],[[true,false,false],true],[[false,true,false],true],[[false,false,true],true],[[true,true,true],true]]);
rescue('signal','Infiltration 3 · Send a signal','boolean canSignalPrisoner(boolean archerIsAwake, boolean prisonerIsAwake)',
  'Return whether Annalyn can send a birdcall. The prisoner must be awake and the archer must be asleep.',
  'Check both conditions. An awake prisoner helps; an awake archer blocks the signal.',
  'Use && to require both conditions; negate the one that describes the archer.', 'return !archerIsAwake && prisonerIsAwake;',
  [[[false,true],true],[[true,true],false],[[false,false],false],[[true,false],false]]);
rescue('rescue','Infiltration 4 · Free the prisoner','boolean canFreePrisoner(boolean knightIsAwake, boolean archerIsAwake, boolean prisonerIsAwake, boolean petDogIsPresent)',
  'Return whether Annalyn can free the prisoner. With her dog, the archer must be asleep. Without the dog, both guards must be asleep and the prisoner must be awake.',
  'Treat the dog and no-dog cases separately. The archer being asleep is required in both.',
  'Use if to handle the dog case early, then return the result of the no-dog rule.',
  'if (petDogIsPresent) return !archerIsAwake; return !knightIsAwake && !archerIsAwake && prisonerIsAwake;',
  [false,true].flatMap(knight => [false,true].flatMap(archer => [false,true].flatMap(prisoner => [false,true].map(dog =>
    [[knight,archer,prisoner,dog], !archer && (dog || (!knight && prisoner))])))));

const logs = archive('log-levels','arrays');
const log1='[ERROR]: Invalid operation';
const log2='[WARNING]:  Disk almost full\r\n';
const log3='[INFO]: Operation completed: relay online';
logs('message','Log Levels 1 · Extract a message','String message(String line)',
  'Return the text after the first colon in a log line. Remove surrounding whitespace. A message can contain another colon.',
  'indexOf finds the first colon. substring can take everything from the next character onward. trim removes spaces and line breaks at the edges.',
  'If the colon is at index 7, the part after it starts at index 8.', 'return line.substring(line.indexOf(\':\')+1).trim();',
  [[[log1],'Invalid operation'],[[log2],'Disk almost full'],[[log3],'Operation completed: relay online']], true);
logs('level','Log Levels 2 · Read severity','String logLevel(String line)',
  'Return the label between the square brackets as lowercase text.',
  'The opening bracket is at index 0. In substring(start, end), start is included and end is excluded.',
  'Find the closing bracket rather than assuming a fixed length.', 'return line.substring(1,line.indexOf(\']\')).toLowerCase(Locale.ROOT);',
  [[[log1],'error'],[[log2],'warning'],[[log3],'info']], true);
logs('format','Log Levels 3 · Reformat the record','String reformat(String line)',
  'Return the trimmed message first, followed by a space and the lowercase severity in parentheses.',
  'Separate extraction from formatting. Work out the message and level first; then use + to combine the pieces.',
  'Example: [INFO]: Signal restored becomes Signal restored (info).',
  'String message = line.substring(line.indexOf(\':\')+1).trim(); String severity = line.substring(1,line.indexOf(\']\')).toLowerCase(Locale.ROOT); return message + " (" + severity + ")";',
  [[[log1],'Invalid operation (error)'],[[log2],'Disk almost full (warning)'],[[log3],'Operation completed: relay online (info)']], true);

archive('captains-log','java')('channel','Library lab · Pick a radio channel','int channel(int seed)',
  'Create a java.util.Random with seed. Take its first nextInt(10) and convert that result into a channel from 1 through 10.',
  'A seeded generator makes the exercise repeatable. nextInt(10) includes 0 and excludes 10. Adding one shifts the entire range.',
  'Use the seed to construct the generator. Do not draw another number before choosing the channel.',
  'Random generator = new Random(seed); return generator.nextInt(10) + 1;',
  [[[0],1],[[1],6],[[2],9],[[3],5]]);

archive('booking-up-for-beauty','java')('appointment','Library lab · Move an appointment','String nextAppointment(String date)',
  'Parse the supplied ISO date, such as 2024-02-28. Return the next calendar date in the same YYYY-MM-DD format.',
  'java.time.LocalDate stores a date without a clock or time zone. plusDays returns a new date and takes care of month and year changes.',
  'Call LocalDate.parse, then plusDays(1), then toString on the new date.',
  'return java.time.LocalDate.parse(date).plusDays(1).toString();',
  [[['2024-02-28'],'2024-02-29'],[['2025-02-28'],'2025-03-01'],[['2025-12-31'],'2026-01-01']]);

archive('beauty-salon-regulars','java')('standing-day','Library lab · Set the first Monday','String firstMonday(String date)',
  'Return the date of the first Monday in the month that contains the supplied ISO date.',
  'An adjuster represents a rule for transforming a date. firstInMonth asks for the first occurrence of a weekday in the same month, even when the supplied date is later.',
  'Pass java.time.DayOfWeek.MONDAY to java.time.temporal.TemporalAdjusters.firstInMonth, then use with on the date.',
  'return java.time.LocalDate.parse(date).with(java.time.temporal.TemporalAdjusters.firstInMonth(java.time.DayOfWeek.MONDAY)).toString();',
  [[['2025-09-24'],'2025-09-01'],[['2025-10-01'],'2025-10-06'],[['2024-02-29'],'2024-02-05']]);

archive('secrets','advanced')('clear-lamp','Library lab · Clear one status bit','int clearLamp(int panel, int position)',
  'Clear the bit at position in panel and leave all other bits unchanged. Position 0 is the rightmost bit. position is between 0 and 30.',
  'Shift a one left to make a mask. Inverting that mask leaves ones everywhere except the selected bit. AND keeps only the bits the inverted mask allows.',
  'Try panel 7 and position 1 in binary: 111 becomes 101.',
  'return panel & ~(1 << position);',
  [[[7,1],5],[[5,1],5],[[1,0],0],[[1073741825,30],1]]);
