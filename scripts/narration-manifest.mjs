import {writeFile} from 'node:fs/promises';
import {problems} from '../bank.mjs';
import {lessonTranscript} from '../narration.mjs';

const items = problems.flatMap(problem => {
  const script = lessonTranscript(problem);
  return script ? [{id: problem.id, script}] : [];
});
await writeFile(process.argv[2], JSON.stringify(items, null, 2), 'utf8');
console.log(items.length + ' lesson transcripts');
