// A chapter is an ordered teaching unit, with one application that is graded in Java.
// Exercise slugs refer to the pinned Exercism Java source in docs/curriculum-pacing.md.
export const javaSyllabus = [
  {id:'first', title:'First steps', goal:'Read an input line, build a message, and print it.', sources:['hello-world'], repair:'learn-receipt',
    sessions:'2 short sessions', proof:'You can explain the difference between a value returned to a caller and text printed to the console.'},
  {id:'values', title:'Numbers and decisions', goal:'Trace whole-number arithmetic and comparison boundaries.', sources:['lasagna','cars-assemble'], repair:'learn-kiln-time',
    sessions:'2 short sessions', proof:'You can convert units before adding, predict division and remainder, and check an equality boundary.'},
  {id:'branches', title:'Choosing what runs', goal:'Translate a rule into conditions and test each path.', sources:['annalyns-infiltration','cars-assemble'], repair:'learn-quiet-entry',
    sessions:'2 short sessions', proof:'You can explain when both sides must be true, when either one is enough, and when Java skips a condition.'},
  {id:'loops', title:'Repeating instructions', goal:'Track a loop counter, a stopping condition, and a running total.', sources:['bird-watcher'], repair:'learn-fuel-tally',
    sessions:'2 short sessions', proof:'You can trace zero, one, and several iterations and explain which endpoint is included.'},
  {id:'arrays', title:'Working with arrays', goal:'Use indexes and traverse every element safely.', sources:['bird-watcher'], repair:'learn-bird-log',
    sessions:'2 short sessions', proof:'You can tell the difference between an index, a stored value, and a count of matches.'},
  {id:'text', title:'Working with text', goal:'Find separators, extract slices, and handle spaces.', sources:['log-levels','squeaky-clean'], repair:'learn-recover-log',
    sessions:'2 short sessions', proof:'You can trace a slice, preserve meaningful whitespace, and handle an empty result.'},
  {id:'methods', title:'Methods, collections, and classes', goal:'Organize state and behavior with methods, collections, and objects.', sources:['jedliks-toy-car','karls-languages','international-calling-connoisseur'], repair:'learn-survey-car',
    sessions:'3 short sessions', proof:'You can predict what a caller gets and what happens when two objects use the same class.'},
  {id:'contracts', title:'Contracts and failure', goal:'Keep fixed states, unique records, and invalid input explicit.', sources:['logs-logs-logs','calculator-conundrum','remote-control-competition','gotta-snatch-em-all','wizards-and-warriors-2'], repair:'learn-repair-contract',
    sessions:'2 short sessions', proof:'You can explain how a caller reacts to a failure and how an interface constrains a class.'},
];

export const exercismUrl = slug => 'https://exercism.org/tracks/java/exercises/'+slug;
