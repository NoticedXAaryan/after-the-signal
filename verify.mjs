import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {problems, source} from './bank.mjs';
import {cards} from './memory.mjs';
import {benchmark, command, execute, fixture, support, withTemp} from './judge.mjs';

assert.equal(new Set(problems.map(p=>p.id)).size,problems.length);
assert.ok(problems.length>=200);
assert.ok(cards.every(([, , , choices, answer])=>choices[answer]));
await withTemp(async dir=>{
  const methods=[], calls=[], sources=[];
  for(const [i,p] of problems.entries()) {
    const name='Solution'+i;
    sources.push(source(p,p.body,p.helpers).replace('import java.util.*;\n','').replace('class Solution','class '+name));
    for(const [j,row] of p.cases.entries()) {
      const id='test'+methods.length;
      methods.push(fixture(p,row,id,name));
      calls.push({id,label:p.id+' case '+(j+1)});
    }
  }
  const runner='import java.util.*;\nclass Verify { public static void main(String[] args) {\n'+calls.map(x=>x.id+'();').join('\n')+'\n}\n'+methods.join('\n')+'\n}\n'+sources.join('\n');
  await Promise.all([writeFile(join(dir,'Verify.java'),runner),writeFile(join(dir,'Support.java'),support)]);
  const compile=await command('javac',['-encoding','UTF-8','-proc:none','Verify.java','Support.java'],dir,30000);
  assert.ok(compile.ok,compile.failure||compile.stderr);
  const run=await command('java',['-Dfile.encoding=UTF-8','-cp',dir,'Verify'],dir,15000);
  assert.ok(run.ok,run.failure||run.stderr);
  const results=run.stdout.split(/\r?\n/).filter(line=>line.startsWith('@DSA@')).map(line=>JSON.parse(line.slice(5)));
  assert.equal(results.length,calls.length);
  const failures=results.flatMap((x,i)=>x.passed?[]:[[calls[i].label,x.error??x.actual]]);
  assert.deepEqual(failures,[]);
  console.log(results.length+' reference cases passed across '+problems.length+' exercises.');
});

const sum=problems[0];
const compileError=await execute(sum,'class Solution {',false);
assert.match(compileError.error,/error:/);
const timeout=await execute(sum,source(sum,'while (true) {}'),false);
assert.match(timeout.error,/Time limit/);
const wrong=await execute(sum,source(sum,'return 0;'),true);
assert.equal(wrong.passed,false);
assert.equal(wrong.results.length,sum.cases.length);
const correct=await execute(sum,source(sum,sum.body),true);
assert.equal(correct.passed,true);
const comparisons=problems.filter(p=>p.growth);
for(const p of comparisons) {
  const result=await benchmark(p,source(p,p.body,p.helpers));
  assert.ok(!result.error,p.id+' '+result.error);
  assert.equal(result.values.length,3);
  assert.equal(result.values[0].length,3);
}
console.log(comparisons.length+' growth comparisons passed. Verified compile error, timeout, wrong answer, and submission.');
