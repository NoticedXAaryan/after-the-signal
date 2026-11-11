import {spawn,spawnSync} from 'node:child_process';
import {existsSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {setTimeout as wait} from 'node:timers/promises';
import {javaCommand} from '../judge.mjs';

const root=fileURLToPath(new URL('..',import.meta.url));
const developmentEngine=join(root,'.voice-build','godot');
const localEngine=existsSync(developmentEngine)&&readdirSync(developmentEngine)
  .find(name=>/^Godot_v[\d.]+-stable_win64\.exe$/i.test(name));
const engine=process.env.GODOT_BIN||
  (existsSync(join(root,'runtime','godot.exe'))?join(root,'runtime','godot.exe'):
    localEngine?join(developmentEngine,localEngine):'godot.exe');
const port=Number(process.env.DSA_GAME_PORT||4180);
const address='http://127.0.0.1:'+port;
let service,game;

function cleanup() {
  if(game?.exitCode===null)game.kill();
  if(service?.exitCode===null)service.kill();
}
process.once('SIGINT',cleanup);
process.once('SIGTERM',cleanup);
async function ready() {
  try {
    const res=await fetch(address+'/api/world/first-ruin',{signal:AbortSignal.timeout(750)});
    return res.ok&&typeof (await res.json()).terminalPowered==='boolean';
  } catch {return false;}
}
function finished(child) {
  return new Promise((resolve,reject)=>{
    child.once('error',reject);
    child.once('exit',code=>resolve(code??0));
  });
}
try {
  if(process.platform!=='win32'||process.arch!=='x64')throw new Error('This game build requires 64-bit Windows.');
  if(!Number.isInteger(port)||port<1024||port>65535)throw new Error('Choose a valid DSA_GAME_PORT (1024–65535).');
  const compiler=spawnSync(javaCommand('javac'),['-version'],{windowsHide:true,encoding:'utf8',timeout:5000});
  const version=Number((compiler.stdout+compiler.stderr).match(/javac\s+(\d+)/)?.[1]);
  if(compiler.status!==0||!(version>=17))throw new Error('Install a JDK 17 or newer and set JAVA_HOME, then reopen the game.');
  if(!existsSync(join(root,'world','addons','godot_wry','godot_wry.dll')))throw new Error('The game is missing its Windows workbench extension. Extract the entire package first.');
  if(await ready())throw new Error('After the Signal is already running. Return to its game window.');
  const env={...process.env,DSA_PORT:String(port),DSA_GAME_DATA:process.env.DSA_GAME_DATA||
    join(process.env.LOCALAPPDATA||root,'After the Signal','world-progress')};
  service=spawn(process.execPath,[join(root,'server.mjs')],{cwd:root,env,windowsHide:true,stdio:'inherit'});
  let serviceFailed=false;
  service.once('error',error=>{serviceFailed=true;console.error(error.message);});
  let connected=false;
  for(let attempt=0;attempt<30&&!serviceFailed&&service.exitCode===null;attempt++) {
    if(await ready()){connected=true;break;}
    await wait(220);
  }
  if(!connected)throw new Error('The game could not start its local Java workbench. Check the message above.');
  console.log('Opening After the Signal. Press F2 in the game to open the Java workbench.');
  game=spawn(engine,['--path',join(root,'world')],{cwd:root,env,stdio:'inherit'});
  const code=await finished(game).catch(error=>{
    if(error.code==='ENOENT')throw new Error('Godot was not found. Use the portable game or set GODOT_BIN to the Windows Godot executable.');
    throw error;
  });
  process.exitCode=code;
} catch(error) {
  console.error(error.message);
  process.exitCode=1;
} finally {cleanup();}
