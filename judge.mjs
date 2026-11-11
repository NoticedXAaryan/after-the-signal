import {spawn} from 'node:child_process';
import {existsSync, readdirSync} from 'node:fs';
import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createJudge} from './java-plan.mjs';
export {fixture, support} from './java-plan.mjs';

const executable = name => process.platform==='win32'?name+'.exe':name;
const javaRoot = 'C:/Program Files/Java';
const installed = process.platform==='win32' && existsSync(javaRoot)
  ? readdirSync(javaRoot).filter(x=>x.startsWith('jdk-')).sort((a,b)=>b.localeCompare(a,undefined,{numeric:true})).map(x=>join(javaRoot,x))
  : [];
const jdk = [process.env.JAVA_HOME,...installed].find(path=>path && existsSync(join(path,'bin',executable('javac'))));
export const javaCommand = name => jdk?join(jdk,'bin',executable(name)):name;

export function command(name,args,cwd,timeout,input) {
  return new Promise(resolve=>{
    const child=spawn(javaCommand(name),args,{cwd,windowsHide:true,stdio:[input===undefined?'ignore':'pipe','pipe','pipe']});
    let stdout='',stderr='',failure='';
    const stop=message=>{failure=message;child.kill();};
    const timer=setTimeout(()=>stop('Time limit exceeded.'),timeout);
    child.stdout.on('data',chunk=>{stdout+=chunk;if(stdout.length>500000)stop('Output limit exceeded.');});
    child.stderr.on('data',chunk=>{stderr+=chunk;if(stderr.length>500000)stop('Output limit exceeded.');});
    child.on('error',err=>{failure=err.code==='ENOENT'?'JDK compiler unavailable. Install a JDK or set JAVA_HOME.':err.message;});
    child.on('close',code=>{clearTimeout(timer);resolve({ok:code===0&&!failure,stdout,stderr,failure});});
    if(child.stdin){child.stdin.on('error',()=>{});child.stdin.end(input);}
  });
}

export async function withTemp(fn) {
  const dir=await mkdtemp(join(tmpdir(),'java-dsa-'));
  try { return await fn(dir); }
  finally { await rm(dir,{recursive:true,force:true,maxRetries:3}); }
}


async function runJava({files, main, input}) {
  return withTemp(async dir=>{
    await Promise.all(files.map(([name,content])=>writeFile(join(dir,name),content)));
    const compile=await command('javac',['-encoding','UTF-8','-proc:none',...files.map(([name])=>name)],dir,12000);
    if(!compile.ok)return {...compile,compileFailed:true};
    return command('java',['-Dfile.encoding=UTF-8','-Xmx160m','-cp',dir,main],dir,5000,input);
  });
}
export const {execute,benchmark,scratch}=createJudge(runJava);
