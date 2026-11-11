import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {problems, byId, publicProblem, solutionCode} from './bank.mjs';
import {topics, lessons} from './curriculum.mjs';
import {execute, benchmark, scratch, javaCommand} from './judge.mjs';
import {cards} from './memory.mjs';
import {firstRuinProgress} from './world-progress.mjs';

const host='127.0.0.1';
const port=Number(process.env.DSA_PORT||4173);
const address='http://'+host+':'+port;
const staticFiles=new Map([['/','index.html'],...[
  'app.js','quest.mjs','courses.mjs','checkpoints.mjs','expedition.mjs','syllabus.mjs','narration.mjs','coaching.mjs','style.css','quest.css','signal.css',
  'assets/logo.svg','assets/java-grove.png','assets/guide.png','assets/companions.png','assets/signal-mark.svg','assets/relay-07.png',
  'assets/brand/signal-insignia.svg','assets/brand/signal-lockup-dark.svg','assets/brand/signal-lockup-light.svg','assets/brand/signal-wordmark.svg',
  'assets/brand/first-signal.webp','assets/brand/recovery-workbench.webp',
].map(file=>['/'+file,file])]);
const types={html:'text/html',js:'text/javascript',mjs:'text/javascript',css:'text/css',svg:'image/svg+xml',png:'image/png',webp:'image/webp'};
let busy=false;
const editorBundle=await readFile(new URL('./editor.bundle.js',import.meta.url)).catch(async error=>{
  if(error.code!=='ENOENT')throw error;
  return (await import('./scripts/build-editor.mjs')).bundleEditor();
});
const firstRuin=await firstRuinProgress(port);
function reply(res,status,body) {
  res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
  res.end(JSON.stringify(body));
}
async function readJson(req) {
  let data='';
  for await (const chunk of req) {
    data+=chunk;
    if(data.length>85000)throw new Error('Code exceeds the size limit.');
  }
  return JSON.parse(data);
}
async function sendNarration(req,res,pathname) {
  let audio;
  try { audio=await readFile(new URL('.'+pathname,import.meta.url)); }
  catch(error) {
    if(error.code==='ENOENT')return reply(res,404,{error:'Recording unavailable.'});
    throw error;
  }
  const headers={'Content-Type':'audio/mpeg','Accept-Ranges':'bytes','Cache-Control':'no-cache'};
  const range=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range??'');
  if(!range) {
    res.writeHead(200,{...headers,'Content-Length':audio.length});
    return res.end(req.method==='HEAD'?undefined:audio);
  }
  const start=range[1]?Number(range[1]):Math.max(0,audio.length-Number(range[2]));
  const end=range[1]&&range[2]?Math.min(Number(range[2]),audio.length-1):audio.length-1;
  if(start>end||start>=audio.length) {
    res.writeHead(416,{...headers,'Content-Range':'bytes */'+audio.length});
    return res.end();
  }
  res.writeHead(206,{...headers,'Content-Length':end-start+1,'Content-Range':'bytes '+start+'-'+end+'/'+audio.length});
  return res.end(req.method==='HEAD'?undefined:audio.subarray(start,end+1));
}
const server=http.createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Content-Security-Policy',"default-src 'self'; style-src 'self' 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
  if(req.headers.host!==host+':'+port && req.headers.host!=='localhost:'+port)return reply(res,403,{error:'Open the lab on localhost.'});
  const {pathname}=new URL(req.url,address);
  try {
    if(['GET','HEAD'].includes(req.method)&&/^\/assets\/narration\/learn-[a-z0-9-]+\.mp3$/.test(pathname))
      return await sendNarration(req,res,pathname);
    if(req.method==='GET' && pathname==='/editor.bundle.js') {
      res.writeHead(200,{'Content-Type':'text/javascript; charset=utf-8','Cache-Control':'no-cache'});
      return res.end(editorBundle);
    }
    if(req.method==='GET' && staticFiles.has(pathname)) {
      const file=staticFiles.get(pathname);
      const data=await readFile(new URL('./'+file,import.meta.url));
      res.writeHead(200,{'Content-Type':types[file.split('.').at(-1)]+'; charset=utf-8','Cache-Control':'no-cache'});
      return res.end(data);
    }
    if(req.method==='GET' && pathname==='/api/catalog')return reply(res,200,{topics,lessons,problems:problems.map(publicProblem),cards});
    if(req.method==='GET' && pathname==='/api/world/first-ruin')return reply(res,200,firstRuin.status());
    if(req.method==='GET' && pathname.startsWith('/api/solution/')) {
      const p=byId.get(pathname.split('/').at(-1));
      return p?reply(res,200,{code:solutionCode(p),hint:p.hint,time:p.time,space:p.space}):reply(res,404,{error:'Problem unavailable.'});
    }
    if(req.method==='POST' && ['/api/run','/api/benchmark','/api/scratch'].includes(pathname)) {
      if(req.headers['x-dsa-lab']!=='practice' || (req.headers.origin && ![address,'http://localhost:'+port].includes(req.headers.origin)))
        return reply(res,403,{error:'Run Java from the local practice lab.'});
      const data=await readJson(req);
      const scratchpad=pathname==='/api/scratch';
      const p=byId.get(data.id);
      if((!scratchpad&&!p) || typeof data.code!=='string' || data.code.length>50000)return reply(res,400,{error:'Provide Java code under 50,000 characters for this exercise.'});
      if(scratchpad&&(typeof data.input!=='string'||data.input.length>12000))return reply(res,400,{error:'Keep standard input under 12,000 characters.'});
      const compare=byId.get(p?.compareId)||p;
      if(pathname==='/api/benchmark'&&!compare.growth)return reply(res,400,{error:'This problem has no growth comparison.'});
      if(busy)return reply(res,429,{error:'A Java run is in progress. Try again when it finishes.'});
      busy=true;
      try {
        const result=scratchpad?await scratch(data.code,data.input):pathname==='/api/run'
          ?await execute(p,data.code,Boolean(data.submit)):await benchmark(compare,data.referenceOnly?'':data.code);
        if(pathname==='/api/run'&&data.submit===true&&result.passed)await firstRuin.record(p.id);
        return reply(res,200,result);
      } finally {busy=false;}
    }
    reply(res,404,{error:'Page unavailable.'});
  } catch(err) {
    console.error(err.message);
    reply(res,500,{error:'The lab could not finish this request. Check the server console and try again.'});
  }
});
function openBrowser() {
  const windows=process.platform==='win32';
  const child=spawn(windows?'cmd.exe':process.platform==='darwin'?'open':'xdg-open',windows?['/d','/c','start','',address]:[address],{windowsHide:true,stdio:'ignore'});
  child.on('error',()=>console.log('Open '+address+' in your browser.'));
  child.unref();
}
server.on('error',err=>{
  if(err.code==='EADDRINUSE' && process.argv.includes('--open')) {
    fetch(address+'/api/catalog',{signal:AbortSignal.timeout(2000)}).then(r=>r.json()).then(data=>{
      if(!Array.isArray(data.problems)||!Array.isArray(data.cards))throw err;
      openBrowser();
    }).catch(()=>{console.error('Port '+port+' is busy. Set DSA_PORT to another port.');process.exitCode=1;});
  } else {console.error(err.message);process.exitCode=1;}
});
server.listen(port,host,()=>{
  console.log('Java DSA Lab is ready at '+address);
  console.log('JDK compiler: '+javaCommand('javac'));
  console.log('Keep this window open while practicing. Press Ctrl+C to stop.');
  if(process.argv.includes('--open'))openBrowser();
});
