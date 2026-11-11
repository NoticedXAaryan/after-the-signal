import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';

export async function bundleEditor() {
  const result = await build({
    entryPoints:[fileURLToPath(new URL('../editor.mjs',import.meta.url))],
    bundle:true,
    format:'esm',
    target:'es2022',
    minify:true,
    legalComments:'inline',
    write:false,
  });
  return result.outputFiles[0].contents;
}
