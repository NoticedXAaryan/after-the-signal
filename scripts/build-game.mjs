import {copyFile,cp,mkdir,readdir,writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {basename,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

if(process.platform!=='win32'||process.arch!=='x64')throw new Error('Build the portable Windows game from 64-bit Windows.');
const root=fileURLToPath(new URL('..',import.meta.url));
const folder=process.env.DSA_GAME_FOLDER||'After the Signal';
if(!/^[a-zA-Z0-9 -]+$/.test(folder))throw new Error('Use a plain folder name for DSA_GAME_FOLDER.');
const out=join(root,'game-dist',folder);
const fallback=join(root,'.voice-build','godot');
const engines=existsSync(fallback)?await readdir(fallback):[];
const engine=process.env.GODOT_BIN||join(fallback,engines.find(name=>/^Godot_v[\d.]+-stable_win64\.exe$/i.test(name))||'godot.exe');
const notices=process.env.DSA_RUNTIME_LICENSES||join(root,'.voice-build','upstream','game-licenses');
const licenseNames=['Godot-LICENSE.txt','Godot-COPYRIGHT.txt','Node-LICENSE.txt'];
for(const file of [engine,...licenseNames.map(name=>join(notices,name))]) {
  if(!existsSync(file))throw new Error('Missing portable build input: '+file);
}
const built=spawnSync(process.execPath,[join(root,'scripts','build-desktop.mjs')],{cwd:root,stdio:'inherit'});
if(built.status!==0)throw new Error('Could not prepare the bundled frontend.');
await mkdir(out,{recursive:true});
await cp(join(root,'dist'),out,{recursive:true});
for(const path of ['runtime','scripts','licenses'])await mkdir(join(out,path),{recursive:true});
await Promise.all([
  cp(join(root,'world'),join(out,'world'),{recursive:true,filter:path=>basename(path)!=='.godot'}),
  cp(join(root,'docs'),join(out,'docs'),{recursive:true,filter:path=>basename(path)!=='private'}),
  copyFile(engine,join(out,'runtime','godot.exe')),
  copyFile(process.execPath,join(out,'runtime','node.exe')),
  copyFile(join(root,'scripts','launch-game.mjs'),join(out,'scripts','launch-game.mjs')),
  ...['server.mjs','judge.mjs','world-progress.mjs','Play After the Signal.cmd','README.md','CONTRIBUTING.md'].map(file=>copyFile(join(root,file),join(out,file))),
  ...licenseNames.map(file=>copyFile(join(notices,file),join(out,'licenses',file))),
]);
await writeFile(join(out,'START HERE.txt'),[
  'AFTER THE SIGNAL — WINDOWS GAME',
  '',
  'Extract the entire package, then open Play After the Signal.cmd.',
  'The game needs Windows 10/11 x64, WebView2 Runtime, and a Java JDK 17 or newer.',
  'Node.js and Godot are included. Play is local; no account or network connection is needed.',
  '',
  'WASD or arrows move. E uses the courier or terminal. F2 opens the Java workbench.',
  'Begin a new journey from the title, or choose Java workbench for direct practice. Esc pauses; J opens the journal.',
  'Solve the campaign or choose Open practice for any exercise. Use Return to ruin or F2 to go back.',
  'The game saves drafts and stars in its own local profile, separate from the browser and Tauri edition.',
  '',
  'Runtime: '+basename(engine)+' / Node '+process.version+'.',
  'See LICENSE, THIRD-PARTY-NOTICES.md, and licenses/ for credits and licensing.',
  'Story, curriculum, and update plans are in docs/. Later story acts and other languages are planned.',
  '',
].join('\r\n'));
console.log('Portable Windows game ready: '+out);
