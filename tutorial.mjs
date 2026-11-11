import {chapter} from './curriculum.mjs';

export function tutorial(group, title) {
  const add=chapter('signal');
  return (id,command,signature,lesson,examples,prompt,starterBody,body,cases,extra={})=>{
    add('learn-'+id,command,'Easy',signature,prompt,extra.time??'O(1)',extra.space??'O(1)',
      extra.hint??'Compare your instructions with the two worked examples.',
      body,cases,{starterBody,tutorial:{group,title,lesson,examples,after:extra.after,
        workshop:extra.workshop,source:extra.source,check:extra.check},bodyOnly:extra.bodyOnly??true,...extra});
  };
}
