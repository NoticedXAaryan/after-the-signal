import {problems,byId,publicProblem,solutionCode} from './bank.mjs';
import {topics,lessons} from './curriculum.mjs';
import {cards} from './memory.mjs';
import {createJudge} from './java-plan.mjs';

const invoke = (command,args) => window.__TAURI__.core.invoke(command,args);
const judge = createJudge(job=>invoke('run_java',{job}));
const response = (data,status=200) => new Response(JSON.stringify(data),{
  status,headers:{'Content-Type':'application/json; charset=utf-8'},
});
export async function request(path, options) {
  if(path==='/api/catalog')return response({topics,lessons,problems:problems.map(publicProblem),cards});
  if(path.startsWith('/api/solution/')) {
    const p=byId.get(path.split('/').at(-1));
    return p?response({code:solutionCode(p),hint:p.hint,time:p.time,space:p.space}):response({error:'Problem unavailable.'},404);
  }
  try {
    const data=JSON.parse(options.body);
    if(typeof data.code!=='string'||data.code.length>50000)return response({error:'Keep your Java code under 50,000 characters.'},400);
    if(path==='/api/scratch') {
      if(typeof data.input!=='string'||data.input.length>12000)return response({error:'Keep standard input under 12,000 characters.'},400);
      return response(await judge.scratch(data.code,data.input));
    }
    const p=byId.get(data.id);
    if(!p)return response({error:'Problem unavailable.'},404);
    if(path==='/api/run')return response(await judge.execute(p,data.code,Boolean(data.submit)));
    const compare=byId.get(p.compareId)||p;
    if(path==='/api/benchmark'&&compare.growth)return response(await judge.benchmark(compare,data.referenceOnly?'':data.code));
    return response({error:'Request unavailable.'},404);
  } catch(error) {
    return response({error:typeof error==='string'?error:'The Java engine could not finish this request.'},500);
  }
}
