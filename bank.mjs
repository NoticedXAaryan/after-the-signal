import {core} from './curriculum.mjs';
import './problems-foundations.mjs';
import './problems-signal.mjs';
import './problems-oop.mjs';
import './problems-structures.mjs';
import './problems-algorithms.mjs';
import './problems-advanced.mjs';
import './problems-start.mjs';
import './problems-control.mjs';
import './problems-data-basics.mjs';
import './problems-workshops.mjs';
import './exercism-java.mjs';

function formatJava(code, depth) {
  const lines=[];
  let line='', quote='', parentheses=0;
  function flush() {
    if(line.trim())lines.push('    '.repeat(depth)+line.trim());
    line='';
  }
  for(let i=0;i<code.length;i++) {
    const c=code[i];
    if(quote) {
      line+=c;
      if(c==='\\')line+=code[++i];
      else if(c===quote)quote='';
    } else if(c==='"'||c==="'"){quote=c;line+=c;}
    else if(c==='('){parentheses++;line+=c;}
    else if(c===')'){parentheses--;line+=c;}
    else if(c==='{'&&!parentheses){line+=' {';flush();depth++;}
    else if(c==='}'&&!parentheses){
      flush();depth--;line='}';
      if(!/^[;,)]/.test(code.slice(i+1).trimStart()))flush();
    } else if(c===';'&&!parentheses){line+=c;flush();}
    else if(c==='\n')flush();
    else line+=c;
  }
  flush();
  return lines;
}
export function source(p, body = 'throw new UnsupportedOperationException("Implement this method");', helpers = '') {
  return ['import java.util.*;', '', 'class Solution {', '    public '+p.signature+' {',
    ...formatJava(body,2), '    }',
    ...(helpers ? ['', ...formatJava(helpers,1)] : []), '}', ''].join('\n');
}
function batch(p) {
  const args = p.args.map(([type,name])=>[type+'[]',name+'Cases']);
  const result = p.result+'[]';
  const signature = result+' solveBatch('+args.map(x=>x.join(' ')).join(', ')+')';
  const rows = p.cases;
  const pack = examples => [p.args.map((_,i)=>examples.map(([input])=>input[i])), examples.map(([,expected])=>expected)];
  const baseType = p.result.replace(/\[.*$/,'');
  const extraDimensions = p.result.slice(baseType.length);
  const reference = 'int count = '+args[0][1]+'.length;\n'+result+' out = new '+baseType+'[count]'+extraDimensions+';\nfor (int i = 0; i < count; i++) {\n    out[i] = solve('+args.map(([,name])=>name+'[i]').join(', ')+');\n}\nreturn out;';
  return {
    ...p, id:p.id+'-batch', title:p.title+' · batch', kind:'Batch drill', signature, result, args, method:'solveBatch',
    time:'O(sum of per-case costs + b)', space:'O(peak per-case workspace + output)',
    prompt:'Process b independent cases in input order and return one answer per case. Each argument array has length b. Case i uses index i from every argument array. Support an empty batch and repeated calls without leaking state between cases.\n\nPer-case task: '+p.prompt,
    hint:'Extract a per-case helper. Allocate a correctly shaped result and reset all case-specific state before each call. '+p.hint,
    body:reference, helpers:'public '+p.signature+' {\n    '+p.body+'\n}'+(p.helpers?'\n'+p.helpers:''),
    cases:[pack(rows.slice(0,2)),pack([...rows.slice().reverse(),rows[0]]),pack([])],
    baseline:undefined, growth:undefined, pure:p.pure,
  };
}
const comparisons = core.filter(p=>p.baseline).map(p=>({
  ...p,id:p.id+'-baseline',title:p.title+' · baseline',kind:'Complexity drill',time:p.slow,
  space: ['range-sums','warmer-days','window-max','lis'].includes(p.id) ? (p.id==='lis'?'O(n)':'O(1) excluding output') : 'O(1)',
  prompt:'Implement the direct approach with '+p.slow+' worst-case time. Use no shortcut from the faster version. Run the comparison after solving to see how each approach scales.\n\n'+p.prompt.replace(/ Aim for O\(n log n\)\./,''),
  hint: {
    'two-sum':'Enumerate both indices with nested loops.',
    'duplicates':'Compare each element with every later element.',
    'range-sums':'Scan the full requested interval for each query.',
    'subarray-k':'Fix the left boundary and extend right with a running sum.',
    'fixed-window':'Recompute the sum independently for each window.',
    'binary-search':'Scan indices from left to right without halving.',
    'inversions':'Check each pair in index order.',
    'warmer-days':'Scan forward from each day until a warmer day appears.',
    'window-max':'Recompute the maximum independently for each window.',
    'lis':'Store the best length ending at each index. Check every earlier index.',
  }[p.id], body:p.baseline, helpers:'', growth:undefined, baseline:undefined, compareId:p.id,
}));
export const problems = [
  ...core.map(p=>({...p,kind:p.kind??(p.tutorial?'Guided lesson':'Core problem')})),
  ...comparisons,
  ...core.filter(p=>!p.tutorial&&!p.practiceSource).map(batch),
];
export const byId = new Map(problems.map(p=>[p.id,p]));
export const solutionCode = p => p.bodyOnly?p.body:source(p,p.body,p.helpers);
export function publicProblem(p) {
  const {body,helpers,cases,baseline,growth,starterBody,starterHelpers,...rest} = p;
  const starter=p.bodyOnly?starterBody:p.kind==='Core problem'||p.tutorial?source(p,starterBody,starterHelpers):source(p);
  return {...rest,starter,examples:cases.slice(0,3),tests:cases.length,benchmark:Boolean(growth||p.compareId)};
}
