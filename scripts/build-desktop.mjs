import {copyFile, cp, mkdir, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {bundleEditor} from './build-editor.mjs';

const root = fileURLToPath(new URL('..',import.meta.url));
const out = join(root,'dist');
await mkdir(out,{recursive:true});
const files = [
  'index.html','style.css','quest.css','signal.css','app.js','quest.mjs','desktop.mjs','java-plan.mjs','expedition.mjs','narration.mjs',
  'bank.mjs','curriculum.mjs','memory.mjs','coaching.mjs','exercism-java.mjs',
  'problems-foundations.mjs','problems-structures.mjs','problems-algorithms.mjs','problems-advanced.mjs',
  'problems-oop.mjs','problems-signal.mjs','courses.mjs','checkpoints.mjs',
  'tutorial.mjs','syllabus.mjs','problems-start.mjs','problems-control.mjs','problems-data-basics.mjs','problems-workshops.mjs',
  'LICENSE','THIRD-PARTY-NOTICES.md',
];
await Promise.all(files.map(file=>copyFile(join(root,file),join(out,file))));
await writeFile(join(out,'editor.bundle.js'),await bundleEditor());
await cp(join(root,'assets'),join(out,'assets'),{recursive:true});
console.log('Packaged the Java Quest frontend for Tauri.');
