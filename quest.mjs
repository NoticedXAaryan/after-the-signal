const worldNames = [
  'Java Grove', 'Object Foundry', 'String Shore', 'Hash Harbor', 'Window Wilds', 'Binary Bluffs',
  'Stack Springs', 'Linked Lagoon', 'Tree Canopy', 'Heap Heights', 'Graph Reef',
  'Recursion Ruins', 'Memo Marsh', 'Bitmask Summit',
];
const foundationOrder = ['sum','first-index','safe-product','floor-division','copy-array','string-equality','code-points','join'];
const levels = ['Easy','Medium','Hard','Extreme'];

export function makeCampaign(topics, problems) {
  let number=0;
  const worlds=topics.map(([id,topic,,symbol,description],index)=>{
    const rounds=problems.filter(p=>p.topic===id&&p.kind==='Core problem').sort((a,b)=>id==='java'
      ? foundationOrder.indexOf(a.id)-foundationOrder.indexOf(b.id)
      : levels.indexOf(a.level)-levels.indexOf(b.level));
    return {
      id, topic, symbol, description, name:worldNames[index]??topic, number:index+1,
      rounds:rounds.map((p,i)=>({...p,number:++number,world:id,boss:i===rounds.length-1})),
    };
  });
  const rounds=worlds.flatMap(w=>w.rounds);
  return {worlds,rounds,byId:new Map(rounds.map(round=>[round.id,round]))};
}
export function nextRound(campaign, stars) {
  return campaign.rounds.find(round=>!stars[round.id]);
}
export function unlocked(round, next, stars) {
  return Boolean(round&&(stars[round.id]||round.id===next?.id));
}
export function recordStars(stars, id, earned) {
  return {...stars,[id]:Math.max(stars[id]??0,earned)};
}
export function complexityChoices(round) {
  const pool=['O(1)','O(log n)','O(n)','O(n log n)','O(n²)','O(n³)','O(2ⁿ)'];
  const wrong=pool.filter(x=>x!==round.time);
  const start=round.number%wrong.length;
  const options=[wrong[start],wrong[(start+2)%wrong.length],wrong[(start+4)%wrong.length]];
  options[round.number%3]=round.time;
  return options;
}

export const mapPoints=[[18,69],[34,76],[55,69],[76,56],[63,45],[42,46],[25,32],[56,23]];
function route(points) {
  const vertices=points.map(([x,y])=>[x*8,y*5.8]);
  return vertices.map(([x,y],i)=>{
    if(!i)return 'M'+x+' '+y;
    const [px,py]=vertices[i-1], mid=(px+x)/2;
    return 'C'+mid+' '+py+' '+mid+' '+y+' '+x+' '+y;
  }).join(' ');
}

export function islandArt(points, cleared, generated = false) {
  const full=route(points), trail=route(points.slice(0,cleared+1));
  const open='<svg class="island-art" viewBox="0 0 800 580" preserveAspectRatio="none" aria-hidden="true">';
  const path='<path d="'+full+'" stroke="#487947" stroke-width="39" stroke-linecap="round" fill="none" opacity=".29" transform="translate(0 4)"/>'+
    '<path d="'+full+'" stroke="#fff2c7" stroke-width="36" stroke-linecap="round" fill="none"/>'+
    '<path d="'+full+'" stroke="#dfc083" stroke-width="27" stroke-linecap="round" fill="none"/>'+
    '<path d="'+full+'" stroke="#fff2cb" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="1 10" fill="none"/>'+
    (cleared?'<path d="'+trail+'" stroke="#fff1a3" stroke-width="15" stroke-linecap="round" fill="none"/>':'');
  if(generated)return open+path+'</svg>';
  return open+
    '<defs>'+
    '<linearGradient id="sea" x2="0" y2="1"><stop stop-color="#91ddff"/><stop offset="1" stop-color="#61bbea"/></linearGradient>'+
    '<linearGradient id="meadow" x2="0" y2="1"><stop stop-color="var(--grass-light)"/><stop offset="1" stop-color="var(--grass-dark)"/></linearGradient>'+
    '<pattern id="wavelets" width="115" height="64" patternUnits="userSpaceOnUse"><path d="M17 32q8 6 16 0 8 6 16 0m35 19q5 4 10 0M70 10q7 5 14 0" fill="none" stroke="#e1f8ff" stroke-opacity=".49" stroke-width="2" stroke-linecap="round"/></pattern>'+
    '<g id="tree"><ellipse cx="0" cy="12" rx="15" ry="6" fill="#398974" opacity=".19"/><rect x="-3" y="-4" width="6" height="17" rx="3" fill="#98634d"/><path d="M-16-1C-22-12-12-25-7-28c0-10 15-10 16 0 8 5 15 19 8 27C12 6-10 6-16-1Z" fill="#2b9e85"/><path d="M-16-4C-21-11-12-25-7-28c0-10 15-10 16 0 7 5 14 16 8 24C9 1-11 1-16-4Z" fill="#64c998"/><path d="M-10-13c0-6 3-10 6-14" fill="none" stroke="#98e4b5" stroke-width="3" stroke-linecap="round"/></g>'+
    '<g id="stone"><ellipse cx="0" cy="7" rx="14" ry="5" fill="#397f75" opacity=".2"/><path d="m-13 5 3-10L0-11 10-6l5 11-10 5-13-1Z" fill="#8ea8c2"/><path d="m-13 5 3-10L0-11 10-6l-5 8-10 2Z" fill="#c2d5e4"/></g>'+
    '<g id="flowers"><path d="M0 6v-9m9 11V2m-17 5V3" stroke="#47a47f" stroke-width="2"/><circle cy="-4" r="4" fill="#fff2c1"/><circle cx="9" cy="2" r="3" fill="#fff"/><circle cx="-8" cy="2" r="3" fill="#f7adc9"/></g>'+
    '<g id="spark"><path d="M0-9Q2-2 9 0 2 2 0 9-2 2-9 0-2-2 0-9Z" fill="#fff7d0"/></g>'+
    '</defs>'+
    '<rect width="800" height="580" fill="url(#sea)"/><rect width="800" height="580" fill="url(#wavelets)"/>'+
    '<path d="M-18 151C61 131 58 89 144 82c64-5 99 15 155-23C368 12 503 21 553 62c44 36 67 44 122 49 73 7 115 38 118 101 3 53-49 74-40 129 9 54 50 100 7 144-32 33-102 31-146 30-103-2-135 56-242 55-83-1-120-33-192-30C80 544 35 525-18 482Z" fill="#428ac0" opacity=".28" transform="translate(0 13)"/>'+
    '<path d="M-18 151C61 131 58 89 144 82c64-5 99 15 155-23C368 12 503 21 553 62c44 36 67 44 122 49 73 7 115 38 118 101 3 53-49 74-40 129 9 54 50 100 7 144-32 33-102 31-146 30-103-2-135 56-242 55-83-1-120-33-192-30C80 544 35 525-18 482Z" fill="#fff0b3" stroke="#dff7e6" stroke-width="6"/>'+
    '<path d="M-18 165C65 148 68 103 146 98c64-4 104 17 161-22C370 34 494 41 542 77c47 35 78 46 132 52 58 6 100 32 101 84 1 48-48 75-38 130 8 48 46 95 9 128-31 27-88 27-132 26-104-2-143 57-242 56-83-1-124-32-193-28C84 530 33 507-18 465Z" fill="url(#meadow)" stroke="#79c29a" stroke-width="4"/>'+
    '<path d="M-9 235c98 3 117-91 209-100s115 49 203 15c83-33 116 11 196 31 65 16 120 3 173 49-16 34-41 67-35 111-83-64-128-28-206-58-74-28-123-81-192-42-92 51-151-22-219 29C70 306 31 310-9 295Z" fill="#fff" opacity=".17"/>'+
    '<path d="M-7 435c97 19 124 62 222 39 84-19 127-66 211-54 80 12 133 70 214 32 40-19 71-23 112-19 23 40-35 62-105 64-115-3-167 68-275 56-84-2-120-32-194-28C87 529 35 509-7 478Z" fill="#459d8b" opacity=".18"/>'+
    '<path d="M688 26c16-7 44-5 55 7 10 10 5 20-7 24-20 8-53 3-62-8-6-8 2-18 14-23ZM705 553c12-9 41-9 52 0 8 8 1 16-12 18-19 3-46-1-46-10 0-2 2-5 6-8Z" fill="#b4e8b3" stroke="#fff2c1" stroke-width="4"/>'+
    path+
    '<g fill="#fff" opacity=".64"><path d="M44 82c-15 0-13-14-2-16 3-16 25-20 34-6 11-1 19 9 11 16-5 5-26 6-43 6Zm570-35c-12 0-14-10-5-15 3-12 18-16 25-6 9-1 17 8 11 14-5 6-20 7-31 7Z"/></g>'+
    '<use href="#tree" transform="translate(108 178) scale(1.15)"/><use href="#tree" transform="translate(137 182) scale(.73)"/><use href="#tree" transform="translate(60 319) scale(1.1)"/><use href="#tree" transform="translate(85 329) scale(.68)"/><use href="#tree" transform="translate(720 216) scale(1.16)"/><use href="#tree" transform="translate(689 223) scale(.81)"/><use href="#tree" transform="translate(700 421) scale(1.33)"/><use href="#tree" transform="translate(666 443) scale(.82)"/><use href="#tree" transform="translate(181 502) scale(.76)"/>'+
    '<use href="#stone" transform="translate(115 215) scale(.68)"/><use href="#stone" transform="translate(693 342) scale(.86)"/><use href="#stone" transform="translate(523 495) scale(.95)"/><use href="#stone" transform="translate(55 464) scale(.62)"/><use href="#stone" transform="translate(567 186) scale(.73)"/>'+
    '<use href="#flowers" transform="translate(73 366)"/><use href="#flowers" transform="translate(144 269)"/><use href="#flowers" transform="translate(246 181)"/><use href="#flowers" transform="translate(740 365)"/><use href="#flowers" transform="translate(471 484)"/><use href="#flowers" transform="translate(343 513)"/><use href="#flowers" transform="translate(632 394)"/>'+
    '<g transform="translate(308 119) rotate(-9)"><ellipse cx="4" cy="20" rx="37" ry="14" fill="#4f9476" opacity=".24"/><path d="m-31-8 35-18 33 15-35 19Z" fill="#fff7dc"/><path d="M-31-8 2 8v30l-33-15Z" fill="#f2a772"/><path d="M2 8 37-11v30L2 38Z" fill="#e48359"/><path d="m-36-9 41-21 38 17-41 22Z" fill="#ffcf90" stroke="#ffedca" stroke-width="3"/><path d="m-14-9 9-5m-9 5 11 5m16-15 10 5m0 0-10 6" fill="none" stroke="#8c563f" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></g>'+
    '<g transform="translate(656 151)"><ellipse cy="26" rx="36" ry="11" fill="#529783" opacity=".28"/><path d="M-27 22v-24a27 27 0 0 1 54 0v24Z" fill="#8770e0" stroke="#eee1ff" stroke-width="5"/><path d="M-14 21V0a14 14 0 0 1 28 0v21Z" fill="#5c4bab"/><path d="M-37 23h74v8h-74z" rx="4" fill="#afa3ef"/><use href="#spark" transform="translate(0 -20) scale(.6)"/></g>'+
    '<g transform="translate(399 358)"><ellipse cy="27" rx="32" ry="10" fill="#529783" opacity=".23"/><path d="M-22 20c-6-10-3-19 3-20l6-18 13 8 14-8 6 18c8 5 8 15 2 20-10 10-34 10-44 0Z" fill="#8065de"/><path d="M-22 16c-6-10-3-19 3-20l6-18 13 8 14-8 6 18c8 5 8 15 2 20-10 10-34 10-44 0Z" fill="#ad96ff" stroke="#f2e9ff" stroke-width="2.5"/><ellipse cx="-8" cy="5" rx="2.4" ry="3.7" fill="#383167"/><ellipse cx="8" cy="5" rx="2.4" ry="3.7" fill="#383167"/><path d="M-3 12q3 4 6 0" fill="none" stroke="#383167" stroke-width="1.8" stroke-linecap="round"/><use href="#spark" transform="translate(29 -17) scale(.65)"/></g>'+
    '<use href="#spark" transform="translate(570 81)"/><use href="#spark" transform="translate(746 114) scale(.65)"/><use href="#spark" transform="translate(603 520) scale(.7)"/>'+
    '</svg>';
}
