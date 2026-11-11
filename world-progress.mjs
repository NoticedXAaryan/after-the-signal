import {mkdir,readFile,rename,writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {resolve,sep} from 'node:path';

// The game gets two achievements, not Java code, drafts, tests, or personal data.
export async function firstRuinProgress(port) {
  const directory = process.env.DSA_GAME_DATA
    ? pathToFileURL(resolve(process.env.DSA_GAME_DATA)+sep)
    : new URL('./.runner/',import.meta.url);
  const file = new URL('first-ruin-'+port+'.json',directory);
  const pendingFile = new URL('first-ruin-'+port+'.tmp',directory);
  let powered=false, receipt=false;
  try {
    const saved=JSON.parse(await readFile(file,'utf8'));
    receipt=saved.receiptPrinted===true;
    powered=receipt||saved.terminalPowered===true;
  } catch(error) {
    if(error.code!=='ENOENT')console.warn('Could not read First Ruin progress:',error.message);
  }
  const status=()=>({terminalPowered:powered,receiptPrinted:receipt});
  return {status, async record(id) {
    if(id==='learn-run'&&!powered)powered=true;
    else if(id==='learn-receipt'&&!receipt)powered=receipt=true;
    else return;
    try {
      await mkdir(directory,{recursive:true});
      await writeFile(pendingFile,JSON.stringify(status())+'\n');
      await rename(fileURLToPath(pendingFile),fileURLToPath(file));
    } catch(error) {
      console.warn('First Ruin progress is available for this session only:',error.message);
    }
  }};
}
