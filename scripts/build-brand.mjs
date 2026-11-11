import {mkdir,writeFile} from 'node:fs/promises';

// Original vector artwork. No installed font is needed to render the lockup.
const base=new URL('../',import.meta.url);
const seal=`<path fill="#132322" stroke="#bd9a62" stroke-width="4" d="M22 6h84l16 16v84l-16 16H22L6 106V22Z"/>
<path fill="none" stroke="#476455" stroke-width="1.5" d="M26 14h76l12 12v76l-12 12H26l-12-12V26Z"/>
<path fill="none" stroke="#a9ead0" stroke-linecap="round" stroke-width="6" d="M29 46a41 41 0 0 1 70 0M43 55a25 25 0 0 1 42 0"/>
<path fill="#e9c48a" d="M64 58 82 91h15v7H73l-9-18-9 18H31v-7h15Z"/>
<circle cx="64" cy="61" r="7" fill="#cbf9de"/>
<path d="M53 105h22" stroke="#6f947f" stroke-linecap="round" stroke-width="2"/>`;
const top=`M0 11 5 0l5 11M2 7h6M16 11V0h9M16 5h7M30 0h10m-5 0v11M55 0h-9v11h9m-9-6h7M62 11V0h6l3 2v2l-3 2h-6m5 0 5 5M87 0h10m-5 0v11M103 0v11m9-11v11m-9-6h9M128 0h-9v11h9m-9-6h7`;
const letters=[
  'M2 18 15 4h31l11 11-9 9-8-7H20l-5 6 4 6h26l13 13v13L44 68H13L1 57l9-10 9 8h20l6-5v-5l-5-4H15L2 29Z',
  'M68 4h35v12H93v40h10v12H68V56h10V16H68Z',
  'M116 18 130 4h34l11 11-9 10-9-8h-22l-5 6v26l6 6h24V43h-13V31h28v37h-46l-13-13Z',
  'M188 4h14l31 40V4h14v64h-14l-31-40v40h-14Z',
  'M283 4h14l27 64h-16l-5-13h-27l-5 13h-16Zm-2 39h17l-8-22Z',
  'M333 4h15v51h36v13h-51Z',
];
function wordmark(ink,accent) {
  return `<g transform="translate(0 5)" fill="none" stroke="${accent}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="${top}"/><path d="M143 5.5h70" stroke-opacity=".56"/></g>
<g transform="translate(0 24)" fill="${ink}" fill-rule="evenodd">${letters.map(d=>`<path d="${d}"/>`).join('')}</g>`;
}
const svg=(box,title,body)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}" role="img" aria-label="${title}"><title>${title}</title>\n${body}\n</svg>\n`;
const mark=svg('0 0 128 128','After the Signal emblem',seal);
const light='#f4e6c9',brass='#dbbd86';
const dark='#172723',darkBrass='#785820';
const lockup=(ink,accent)=>svg('0 0 554 132','After the Signal',`<g transform="translate(0 2)">${seal}</g><g transform="translate(154 13)">${wordmark(ink,accent)}</g>`);
const files={
  'assets/brand/signal-insignia.svg':mark,
  'assets/brand/signal-wordmark.svg':svg('-2 0 390 94','After the Signal',wordmark(light,brass)),
  'assets/brand/signal-lockup-dark.svg':lockup(light,brass),
  'assets/brand/signal-lockup-light.svg':lockup(dark,darkBrass),
  'world/assets/signal-insignia.svg':mark,
};
await mkdir(new URL('assets/brand/',base),{recursive:true});
await Promise.all(Object.entries(files).map(([path,data])=>writeFile(new URL(path,base),data)));
