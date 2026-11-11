import {readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {javaSyllabus,exercismUrl} from '../syllabus.mjs';

const root=process.argv[2];
if(!root)throw new Error('Supply the extracted Exercism Java checkout.');
const ref='be2d006c30c50e0154231dd987d5a3b5526c0427';
const data=JSON.parse(await readFile(join(root,'config.json'),'utf8'));
const rows=[];
for(const kind of ['concept','practice']) {
  for(const exercise of data.exercises[kind]) {
    const path=join(root,'exercises',kind,exercise.slug,'.docs','instructions.md');
    let instructions='';
    try { instructions=await readFile(path,'utf8'); }
    catch(error) { if(error.code!=='ENOENT')throw error; }
    const parts=(instructions.match(/^##\s+\d+[.)]?\s+/gm)??[]).length;
    rows.push({...exercise,kind,parts,hasInstructions:instructions.trim().length>0});
  }
}
const tag=({slug,status})=>'['+slug+']('+exercismUrl(slug)+')'+(status?' ('+status+')':'');
const names=new Map(data.concepts.map(({slug,name})=>[slug,name]));
const concepts=items=>items?.map(x=>names.get(x)??x).join(', ')||'—';
const related=slug=>javaSyllabus.filter(x=>x.sources.includes(slug)).map(x=>x.title).join('; ')||'—';
const conceptsOnly=rows.filter(p=>p.kind==='concept');
const practice=rows.filter(p=>p.kind==='practice');
const markdown=[
  '# Exercism Java question audit',
  '',
  'Source: [exercism/java at '+ref.slice(0,7)+'](https://github.com/exercism/java/tree/'+ref+').',
  'This is the full upstream inventory at that revision, including inactive entries. The audit reads each checked-in instruction file and records task counts for numbered concept exercises. The playable pacing is documented in [Java syllabus and pacing](curriculum-pacing.md).',
  '',
  '**'+data.concepts.length+' concepts · '+conceptsOnly.length+' concept exercises · '+practice.length+' practice exercises · '+rows.filter(p=>p.hasInstructions).length+' instruction files read.**',
  '',
  'The dependency pattern is visible below. Basics feeds strings and booleans independently. Branches are needed before the Bird Watcher traversal exercise. Classes feed constructors and interfaces; lists and generic types lead into maps and sets. The campaign gives each of those dependencies a small runnable level before the corresponding field repair.',
  '',
  '## Concept exercise prerequisites',
  '',
  '| Exercise | Concepts introduced | Prerequisites | Numbered tasks | Used as a chapter reference |',
  '| --- | --- | --- | ---: | --- |',
  ...conceptsOnly.map(p=>'| '+[tag(p),concepts(p.concepts),concepts(p.prerequisites),p.hasInstructions?p.parts:'Unavailable',related(p.slug)].join(' | ')+' |'),
  '',
  '## Practice question index',
  '',
  'Upstream difficulty is an ordinal label, not our campaign order. Consult prerequisites before adding a transfer task to a lesson.',
  '',
  '| Exercise | Difficulty | Prerequisites | Instructions in checkout |',
  '| --- | ---: | --- | --- |',
  ...practice.toSorted((a,b)=>a.difficulty-b.difficulty).map(p=>'| '+[tag(p),p.difficulty,concepts(p.prerequisites),p.hasInstructions?'Yes':'No'].join(' | ')+' |'),
  '',
];
await writeFile(new URL('../docs/exercism-java-audit.md',import.meta.url),markdown.join('\n'));
console.log(rows.length+' exercise records, '+rows.filter(p=>p.hasInstructions).length+' instruction files read.');
console.log('Missing instructions: '+(rows.filter(p=>!p.hasInstructions).map(p=>p.slug).join(', ')||'none'));
