import {coachingFor} from './coaching.mjs';

// The transcript ships with the app; the MP3 is generated from these same words.
export function lessonTranscript(problem) {
  const coach = coachingFor(problem.id);
  if (coach) return coach.script;
  if (!problem.tutorial) return null;
  const speak = text => text
    .replace(/System\.out\.println/g, 'the print line method')
    .replace(/\.length\(\)/g, ' dot length')
    .replace(/>=/g, ' greater than or equal to ')
    .replace(/<=/g, ' less than or equal to ')
    .replace(/!=/g, ' not equal to ')
    .replace(/==/g, ' equal to ')
    .replace(/&&/g, ' and ')
    .replace(/\|\|/g, ' or ')
    .replace(/[\x60]/g, '');
  return speak([
    problem.title + '.',
    problem.tutorial.lesson,
    ...problem.tutorial.examples.map(([, why], i) => 'Example ' + (i + 1) + '. ' + why),
    'Your task. ' + problem.prompt,
  ].join(' '));
}
