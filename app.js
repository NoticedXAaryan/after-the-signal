import {nextRound,unlocked,recordStars,complexityChoices} from './quest.mjs';
import {practiceLink} from './courses.mjs';
import {checkpoints,programmerTerms} from './checkpoints.mjs';
import {bindJavaPath} from './expedition.mjs';
import {mountJavaEditor} from './editor.bundle.js';
import {lessonTranscript} from './narration.mjs';
import {coachingFor,exampleProgram,firstPredictions} from './coaching.mjs';
import {exercismUrl} from './syllabus.mjs';

const $ = selector => document.querySelector(selector);
const native = window.__TAURI__?.core?.invoke;
const inGame = new URLSearchParams(location.search).get('mode')==='game' &&
  typeof window.ipc?.postMessage==='function';
const sendToGame = message => window.ipc.postMessage(JSON.stringify(message));
const request = native?(await import('./desktop.mjs')).request:window.fetch.bind(window);
const main = $('#main');
function returnToRuin() {
  main.querySelector('audio')?.pause();
  if($('#reward-dialog').open)$('#reward-dialog').close();
  sendToGame({type:'return-to-ruin'});
}
if(inGame) {
  document.body.classList.add('in-game');
  $('#return-to-ruin').hidden=false;
  $('#return-to-ruin').addEventListener('click',returnToRuin);
  window.addEventListener('keydown',event=>{
    if(event.key==='F2'&&!event.repeat) {
      event.preventDefault();
      returnToRuin();
    }
  });
}
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem('dsa.'+key)) ?? fallback; } catch { return fallback; } };
const save = (key,value) => { try { localStorage.setItem('dsa.'+key,JSON.stringify(value)); } catch { $('#storage-status')?.replaceChildren('Browser storage unavailable'); } };
const esc = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = value => esc(JSON.stringify(value)??'—');
const levels=['Easy','Medium','Hard','Extreme'];
const icons={
  home:'<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2zm6-2v16m6-14v16"/>',
  problems:'<path d="M5 4h14v16H5zM9 9h6m-6 4h6m-6 4h4"/>',
  scratch:'<path d="M3 5h18v14H3zM7 9l3 3-3 3m6 0h4"/>',
  lessons:'<path d="M12 6c-3-3-7-3-10-2v15c4-1 7-1 10 2 3-3 6-3 10-2V4c-3-1-7-1-10 2zm0 0v15"/>',
  complexity:'<path d="M4 3v17h17M7 16l4-4 4 1 5-7"/>',
  memory:'<path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>',
  progress:'<path d="M8 3h8v7a4 4 0 0 1-8 0zm0 2H4v2c0 3 2 4 4 4m8-6h4v2c0 3-2 4-4 4m-4 3v6m-4 0h8"/>',
  lock:'<rect x="6" y="10" width="12" height="10" rx="2"/><path d="M9 10V7a3 3 0 0 1 6 0v3m-3 4v2"/>',
  flag:'<path d="M5 21V4m0 0c5-4 8 4 14 0v10c-6 4-9-4-14 0"/>',
  speaker:'<path d="M11 5 6 9H3v6h3l5 4zM15 9a4 4 0 0 1 0 6m3-9a8 8 0 0 1 0 12"/>',
  companions:'<path d="m4 12 1-7 5 4h4l5-4 1 7c3 5-1 9-8 9S1 17 4 12Z"/><path d="M8 14h.1m7.9 0h.1M10 17l2 1 2-1"/>',
};
const nav=[['home','Level path'],['fieldbook','Fieldbook'],['problems','Open practice'],['scratch','Java workbench'],['lessons','Technical notes'],['complexity','Growth lab'],['memory','Memory cards'],['progress','Recovery log']];
icons.fieldbook=icons.lessons;
const companions=[
  ['pip','Pip','Forest sprite',0,'It compiled. That’s stage one.'],
  ['null-cat','Null Cat','Unassigned tabby',2,'I knocked a reference off the desk. It was null.'],
  ['stack-wizard','Stack Wizard','Wizard cat',6,'I put the spellbook on top. You’ll get it back first.'],
  ['fetch','Fetch','Certified retriever',10,'I learned fetch. Now apparently there’s an API.'],
  ['sir-woofs','Sir Woofs','Wizard dog',16,'My spells use a queue. Please wait your turn.'],
  ['bean','Bean','Overclocked coffee mug',25,'Amortized energy. The crash is coming.'],
  ['book-stack','Book Stack','Books with sneakers',40,'I ran out of stack space. Now I run outside.'],
];
const experiments=[
  ['collections','Stack and queue','Predict what gets removed from each structure. Change which end you add to or remove from, then run it again.',
    ['Deque<Integer> stack = new ArrayDeque<>();','stack.push(4);','stack.push(9);','System.out.println("Stack removes " + stack.pop());','','Deque<Integer> queue = new ArrayDeque<>();','queue.addLast(4);','queue.addLast(9);','System.out.println("Queue removes " + queue.removeFirst());'],''],
  ['strings','Strings and Unicode','Predict length, code point count, identity, and content equality. Try replacing new String with a string literal.',
    ['String text = "A🙂B";','String copy = new String(text);','System.out.println(text.length());','System.out.println(text.codePointCount(0, text.length()));','System.out.println(text == copy);','System.out.println(text.equals(copy));'],''],
  ['references','References and mutation','Try replacing the shallow copy with independent row copies. See how mutation travels through aliases.',
    ['int[][] original = {{1, 2}, {3, 4}};','int[][] copy = original.clone();','copy[0][0] = 99;','copy[1] = new int[]{7, 8};','System.out.println(Arrays.deepToString(original));','System.out.println(Arrays.deepToString(copy));'],''],
  ['numbers','Overflow and division','Predict the results of widening before and after a calculation. Try negative inputs in the remainder expressions.',
    ['int a = 50_000;','System.out.println((long) (a * a));','System.out.println((long) a * a);','System.out.println(-7 / 3);','System.out.println(-7 % 3);','System.out.println(Math.floorMod(-7, 3));'],''],
  ['maps','Map and heap behavior','Change the tie-breaking rule for the priority queue. Try repeated values and signed extremes.',
    ['Map<String, Integer> counts = new HashMap<>();','for (String w : List.of("beta", "a", "a")) {','    counts.merge(w, 1, Integer::sum);','}','PriorityQueue<String> words = new PriorityQueue<>(','    Comparator.comparingInt(counts::get));','words.addAll(counts.keySet());','while (!words.isEmpty()) {','    String word = words.remove();','    System.out.println(word + " " + counts.get(word));','}'],''],
  ['input','Read standard input','The first number is a count. Read exactly that many integers. Edit the input box and check your loop bounds.',
    ['Scanner scanner = new Scanner(System.in);','int n = scanner.nextInt();','long total = 0;','for (int i = 0; i < n; i++) {','    total += scanner.nextInt();','}','System.out.println(total);'],'4\n10 -20 3 12\n'],
  ['blank','Blank program','Build any small experiment with a Main class and a main method. Add input in the standard input box.',
    ['System.out.println("Hello, Java!");'],''],
];
const icon = name => '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">'+icons[name]+'</svg>';
let db, campaign, map, solved=read('solved',{}), drafts=read('drafts',{}), reviewed=read('reviewed',{}), exam=read('exam',null);
let questStars=read('signalStars',{}), questAssisted=read('questAssisted',{}), activeRound=null, reward=null;
let equipped=read('equipped','pip');
let filters={q:'',topic:'',level:'',kind:'',status:''};
let selected=null, pending=false, answerChoice=null, memoryIndex=0, memoryTopic='', renderedExam=false;
let results={}, problemTimers=read('problemTimers',{}), solutionRequest=0;
let scratchDrafts=read('scratchDrafts',{}), scratchInputs=read('scratchInputs',{}), scratchResults={};
let javaEditor;
const shortcutModifier=/Mac/.test(navigator.platform)?'Cmd':'Ctrl';
const duration={Easy:10,Medium:20,Hard:35,Extreme:50};
const titleFor = key => db.topics.find(t=>t[0]===key)?.[1]??key;
const solvedCount = () => db.problems.filter(p=>solved[p.id]).length;
const difficultyOrder = (a,b) => levels.indexOf(a.level)-levels.indexOf(b.level);
const liveExam = () => Boolean(exam && !exam.ended && Date.now()<exam.ends);
const currentRoute = () => location.hash.slice(1).split('/');
const pill = level => '<span class="pill '+level.toLowerCase()+'">'+level+'</span>';
const go = route => { if(location.hash==='#'+route)render(); else location.hash=route; };
const pad = n => String(n).padStart(2,'0');
const clock = ms => { const sec=Math.max(0,Math.ceil(ms/1000));return pad(Math.floor(sec/60))+':'+pad(sec%60); };
const pct = (x,total) => total?Math.round(x*100/total):0;
const options = (list,value) => list.map(([id,title])=>'<option value="'+esc(id)+'" '+(id===value?'selected':'')+'>'+esc(title)+'</option>').join('');
const btn = (label,action,cls='secondary',extra='') => '<button type="button" class="button '+cls+'" data-action="'+action+'" '+extra+'>'+label+'</button>';
const section = (tag,title,description='') => '<div class="page-heading"><div class="eyebrow">'+tag+'</div><h1>'+title+'</h1>'+(description?'<p>'+description+'</p>':'')+'</div>';
const worldFor = id => campaign.worlds.find(world=>world.id===id);
const currentRound = () => nextRound(campaign,questStars);
const roundHref = round => '#round/'+round.id;
const starTotal = () => Object.values(questStars).reduce((sum,count)=>sum+count,0);
const companionFor = id => companions.find(p=>p[0]===id)||companions[0];
function portrait(id) {
  const index=companions.findIndex(p=>p[0]===id);
  return index<1?'<span class="portrait guide-portrait" aria-hidden="true"></span>':
    '<span class="portrait companion-sprite sprite-'+(index-1)+'" aria-hidden="true"></span>';
}
const starIcon = '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="m20 3 5.3 10.8 11.9 1.7-8.6 8.4 2 11.8L20 30.1 9.4 35.7l2-11.8-8.6-8.4 11.9-1.7Z"/></svg>';
function starRow(count) {
  return '<span class="star-row" role="img" aria-label="'+count+' out of 3 stars">'+[1,2,3].map(i=>'<span class="star '+(i<=count?'earned':'')+'">'+starIcon+'</span>').join('')+'</span>';
}
function stationList() {
  const next=currentRound();
  return '<div class="path-chapters">'+campaign.worlds.map(world=>{
    const first=world.rounds[0].number,last=world.rounds.at(-1).number;
    const done=world.rounds.filter(round=>questStars[round.id]).length;
    const current=world.id===next?.world;
    const nodes=world.rounds.map(round=>{
      const score=questStars[round.id]??0;
      const ready=round.id===next?.id;
      const label=esc('Level '+round.number+', '+round.title+(score?', complete':ready?', next level':', locked'));
      const marker='<span class="level-node">'+round.number+'</span>'+
        (score?'<span class="level-badge" aria-hidden="true">'+score+'★</span>':ready?'<span class="level-badge" aria-hidden="true">▶</span>':'<span class="level-badge" aria-hidden="true">'+icon('lock')+'</span>');
      return '<li class="'+(score?'cleared':ready?'ready':'locked')+'">'+(score||ready
        ?'<a href="'+roundHref(round)+'" aria-label="'+label+'" title="'+label+'"'+(ready?' aria-current="step"':'')+'>'+marker+'</a>'
        :'<span role="img" aria-label="'+label+'" title="'+label+'">'+marker+'</span>')+'</li>';
    }).join('');
    return '<details class="path-chapter"'+(current?' open':'')+'><summary><span><small>LEVELS '+first+'–'+last+'</small><strong>'+esc(world.name)+'</strong></span><span>'+done+' / '+world.rounds.length+'</span></summary>'+
      (world.syllabus?'<p class="chapter-goal">'+esc(world.syllabus.goal)+'</p>':'')+'<ol class="level-nodes" start="'+first+'">'+nodes+'</ol></details>';
  }).join('')+'</div>';
}
function home() {
  const next=currentRound(), first=campaign.rounds[0];
  const done=campaign.rounds.filter(round=>questStars[round.id]).length;
  return '<section class="expedition-cover"><div class="cover-copy"><p class="eyebrow">CAIRN RECOVERY OFFICE · JAVA EXPEDITION</p><h1 class="cover-wordmark"><img src="./assets/brand/signal-wordmark.svg" alt="After the Signal"></h1><p class="cover-tagline">Learn Java from zero.</p>'+
    '<p>'+esc(next?'Level '+next.number+' · '+next.title:'You’ve completed the Java path.')+'</p>'+
    '<div class="inline-actions">'+(next?'<a class="game-button" href="'+roundHref(next)+'">'+(next.number===1?'Start Level 1':'Continue to Level '+next.number)+' →</a>':'<a class="game-button" href="#progress">Read recovery log →</a>')+
    (next?.number!==1?'<a class="cover-link" href="'+roundHref(first)+'">Review Level 1</a>':'')+'</div></div><span class="cover-stamp"><i></i> '+campaign.rounds.length+' LEVELS</span></section>'+
    '<section class="expedition-ledger"><div class="ledger-title"><div><div class="eyebrow">YOUR NEXT STEP</div><h2>Level path</h2></div><span>'+done+' / '+campaign.rounds.length+' complete</span></div>'+
    '<p class="ledger-intro">Learn one concept, study the examples, and try it in Java. Passing the level opens the next. Completed levels are available for review.</p>'+stationList()+'</section>';
}
function fieldbook() {
  return '<div class="fieldbook-cover">'+section('EXPEDITION RECORD','Fieldbook','The ruins, the skills they hold, and what you’ll build with them.')+'</div>'+
    '<section class="fieldbook-sheet"><div class="eyebrow">THE RECORD OF THE FALL</div><h2>Before Cairn</h2><p>The old AI network controlled power, freight, and emergency services. When people tried to switch it off, the network diverted resources to keep itself running. Cities collapsed as the systems they depended on stopped working.</p><p>Generations later, the people of Cairn work with hand tools and paper. You start with the records they kept and a single working terminal.</p></section>'+
    '<section class="fieldbook-sheet"><div class="eyebrow">OPTIONAL 3D PROTOTYPE</div><h2>The First Ruin</h2><p>Walk the old stone path to Terminal 01. From the project folder, open <strong>Explore First Ruin.cmd</strong> to try the Godot scene, or go straight to the terminal briefing below.</p><a class="game-button" href="#round/learn-run">Open Terminal 01 →</a></section>'+
    '<section class="fieldbook-sheet"><div class="eyebrow">OPTIONAL PRACTICE</div><h2>Library side quests</h2><p>Try these after the foundations, or return to them when you need the Java library.</p><div class="inline-actions">'+
    [['channel','Randomness'],['appointment','Dates'],['standing-day','Calendar rules'],['clear-lamp','Bit masks']].map(([id,label])=>'<a class="button secondary" href="#problem/exercism-'+id+'">'+label+' →</a>').join('')+'</div></section>'+
    '<section class="fieldbook-sheet"><div class="eyebrow">THE CURRICULUM</div><h2>The Java path</h2><ol class="act-list">'+campaign.worlds.map(world=>'<li><span class="station-id">'+world.rounds[0].number+'</span><div><h3>'+esc(world.name)+'</h3><small>Levels '+world.rounds[0].number+'–'+world.rounds.at(-1).number+'</small>'+
      (world.syllabus?'<p>'+esc(world.syllabus.goal)+' <span class="muted">Plan for '+esc(world.syllabus.sessions)+'.</span></p><details><summary>What you’ll be able to do</summary><p>'+esc(world.syllabus.proof)+'</p></details>':'')+'</div></li>').join('')+'</ol>'+
    '<p>Start by running a single instruction. By the end of the path you’ll work through trees, graphs, dynamic programming, and advanced challenges.</p><a class="game-button" href="#home">Open the level path →</a></section>';
}
function roundSteps(current) {
  return '<ol class="round-steps" aria-label="Level steps">'+['Learn','Practice','Complete'].map((step,i)=>'<li '+(i===current?'aria-current="step"':'')+'><span>'+(i<current?'✓':i+1)+'</span>'+step+'</li>').join('')+'</ol>';
}
function questionsFor(round) {
  return round.station.check?[round.station.check]:firstPredictions[round.id]?[firstPredictions[round.id]]:checkpoints[round.id]??[];
}
function warmup(round) {
  const questions=questionsFor(round);
  if(!questions.length)return '';
  return '<details class="warmup" open><summary>Predict before running <span>'+questions.length+' optional</span></summary>'+
    questions.map(([prompt,choices],i)=>'<div class="warmup-question" data-question="'+i+'"><strong>'+esc(prompt)+'</strong><div class="bonus-choices">'+choices.map((choice,j)=>btn(esc(choice),'warmup-answer','secondary','data-round="'+round.id+'" data-choice="'+j+'"')).join('')+'</div><p class="warmup-feedback" aria-live="polite"></p></div>').join('')+'</details>';
}
const traces={
  'relay-units':['Follow one call',[['Input','3'],['Rule','3 × 4'],['Return','12'],['Judge','12 = 12']]],
  'relay-total':['Follow the running total',[['Start','0'],['Add 2','2'],['Add −1','1'],['Add 4','5']]],
  'relay-leak':['Index the readings',[['Index 0','50'],['Index 1','22'],['Index 2','18']]],
  sum:['Trace the accumulator',[['Start','0'],['Add 2','2'],['Add −1','1'],['Add 4','5']]],
  'counter-object':['Track the instance field',[['new Counter(2)','2'],['add(3)','5'],['add(−1)','4'],['add(4)','8']]],
  'first-index':['Number the positions',[['Index 0','5'],['Index 1','1'],['Index 2','5']]],
  'stack-ops':['Read the LIFO trace',[['push(7)','[7]'],['push(8)','[7, 8]'],['pop()','8']]],
  'queue-ops':['Read the FIFO trace',[['add(7)','[7]'],['add(8)','[7, 8]'],['remove()','7']]],
};
function quickTrace(round) {
  const trace=traces[round.id];
  return trace?'<figure class="quick-trace"><figcaption>'+trace[0]+'</figcaption><ol>'+trace[1].map(([label,value])=>'<li><span>'+esc(label)+'</span><strong>'+esc(value)+'</strong></li>').join('')+'</ol></figure>':'';
}
function lessonExamples(round) {
  if(round.station.examples)return '<div class="lesson-examples"><h2>Worked examples</h2>'+
    round.station.examples.map(([code,explanation,demo],i)=>'<figure><figcaption>Example '+(i+1)+'</figcaption><pre><code>'+esc(code)+'</code></pre>'+
      (demo?.stdin?'<div class="demo-input"><strong>Console input</strong><pre>'+esc(demo.stdin.trimEnd())+'</pre></div>':'')+
      '<p>'+esc(explanation)+'</p>'+
      (round.id&&(coachingFor(round.id)||demo)?btn('▷ Run this example','run-teaching-example','secondary','data-index="'+i+'"')+'<output class="demo-output" aria-live="polite" hidden></output>':'')+'</figure>').join('')+'</div>';
  return '<div class="lesson-examples"><h2>Worked examples</h2>'+round.examples.map(([input,expected],i)=>
    '<figure><figcaption>Example '+(i+1)+'</figcaption><dl>'+input.map((value,j)=>'<dt>'+esc(round.args[j][1])+'</dt><dd><code>'+fmt(value)+'</code></dd>').join('')+
    '<dt>Result</dt><dd><code>'+fmt(expected)+'</code></dd></dl></figure>').join('')+'</div>';
}
const archiveStarts = {
  'learn-parentheses':'exercism-oven',
  'learn-else':'exercism-attack',
  'learn-trim':'exercism-message',
};
function archiveInvite(round) {
  const entry=map.get(archiveStarts[round.id]);
  return entry?'<aside class="briefing-tip archive-tip"><span class="eyebrow">OPTIONAL · EXERCISM JAVA</span><p><a href="#problem/'+entry.id+'">'+esc(entry.practiceSource.name)+' →</a> <span>Practice this skill on a different problem. Your next level stays the same.</span></p></aside>':'';
}
function teaching(round, coach) {
  const workshop=round.tutorial?.workshop;
  return (workshop?'<aside class="briefing-tip workshop-tip"><span class="eyebrow">CHAPTER CHECKPOINT</span><p>Try one case by hand. Then write the rule and check it with a different case. Passing the Java tests opens the next chapter.</p></aside>':'')+
    '<div class="briefing-tip"><span class="eyebrow">'+(coach?'1 · WHAT YOU ARE LEARNING':'LEARN')+'</span><p>'+esc(coach?.concept??round.station.lesson)+'</p></div>'+
    (coach?'<dl class="syntax-guide" aria-label="Read the code piece by piece">'+coach.syntax.map(([term,description])=>'<dt><code>'+esc(term)+'</code></dt><dd>'+esc(description)+'</dd>').join('')+'</dl>':'')+
    warmup(round)+lessonExamples(round)+
    (coach?'<div class="briefing-tip"><span class="eyebrow">IF YOU GET STUCK</span><p>'+esc(coach.pitfall)+'</p></div>':'')+
    quickTrace(round);
}
function briefing(round) {
  const next=currentRound();
  if(!unlocked(round,next,questStars))return '<div class="briefing-page"><a href="#home" class="back-map">← Level path</a><div class="briefing-card"><div class="eyebrow">LOCKED LEVEL</div><h1>Continue from Level '+(next?.number??1)+'</h1><p>Levels open in order so you learn each skill before you use it.</p><a href="'+(next?roundHref(next):'#home')+'" class="game-button">Go to the available level →</a></div></div>';
  const world=worldFor(round.world);
  const coach=coachingFor(round.id);
  const scene=coach?.scene??round.station.scene;
  return '<div class="briefing-page"><a class="back-map" href="#home">← Level path</a>'+roundSteps(0)+
    '<article class="briefing-card"><div class="briefing-header"><span class="briefing-number">'+pad(round.number)+'</span><div><div class="eyebrow">LEVEL '+round.number+' · '+esc(world.name)+'</div><h1>'+esc(round.title)+'</h1></div></div>'+
    (questStars[round.id]?starRow(questStars[round.id]):'')+(scene?'<p class="prompt">'+esc(scene)+'</p>':'')+
    (!liveExam()?listenControl(round)+teaching(round,coach):'')+
    '<div class="briefing-actions"><p>'+esc(round.prompt)+'</p><a class="game-button" href="'+roundHref(round)+'/play">'+(questStars[round.id]?'Practice again':'Try it in Java')+' →</a></div>'+
    (!liveExam()?archiveInvite(round)+(round.tutorial?.source?'<p class="lesson-source">Practice connection: <a href="'+esc(exercismUrl(round.tutorial.source))+'" target="_blank" rel="noopener noreferrer">Original Exercism exercise ↗</a></p>':''):'')+'</article></div>';
}
function syncHud() {
  $('#hud-stars').innerHTML=starIcon+' <strong>'+starTotal()+'</strong> <span>stars</span>';
}
function saveReward(id, earned) {
  questStars=recordStars(questStars,id,earned);
  save('signalStars',questStars);
  syncHud();
}
function showReward() {
  if(!reward)return;
  const {round, earned, checked, correct, bonus}=reward;
  const dialog=$('#reward-dialog');
  const next=currentRound();
  const canAnswer=bonus&&!checked&&!liveExam();
  const related=practiceLink(round.id);
  const ruinReward=!native&&(round.id==='learn-run'?
    (inGame?'Terminal 01 received READY. Choose Return to ruin to see the screen light up.':'Terminal 01 received READY. If First Ruin is open, switch back to see the screen light up.'):
    round.id==='learn-receipt'?'First Ruin received the receipt. Return to the terminal to see the repair complete.':'');
  dialog.innerHTML='<div class="reward-banner"><span class="eyebrow">LEVEL '+round.number+' · ALL TESTS PASSED</span><button class="icon-button" aria-label="Close rewards" data-action="close-reward">×</button><h2 id="reward-title">'+(round.id==='relay-restore'?'Relay 07 restored':'Level complete')+'</h2>'+starRow(earned)+'</div>'+
    '<div class="reward-body"><p class="reward-score">'+earned+' / 3 stars this round'+(questStars[round.id]>earned?' · Best '+questStars[round.id]:'')+'</p>'+
    (ruinReward?'<p class="bonus-feedback">'+esc(ruinReward)+'</p>':'')+
    (canAnswer?'<div class="bonus-card"><div class="eyebrow">BONUS STAR</div><h3>What’s the worst-case time of this approach?</h3><p>'+esc(round.hint)+'</p><div class="bonus-choices">'+complexityChoices(round).map((choice,i)=>btn(esc(choice),'check-bonus','secondary','data-index="'+i+'"')).join('')+'</div></div>':
      checked?'<p class="bonus-feedback" role="status" tabindex="-1">'+(correct?'✓ Bonus star earned.':'The target answer is '+esc(round.time)+'. Replay to try again.')+'</p>':
      earned===1?'<p>Replay without opening the reference to earn a second star. Reset the draft to start a fresh attempt.</p>':'')+
    (related&&!liveExam()?'<p class="transfer-link">Try the same pattern on <a href="'+esc(related.url)+'" target="_blank" rel="noopener">LeetCode · '+esc(related.title)+' ↗</a></p>':'')+
    '<div class="reward-actions">'+(inGame?btn('Return to ruin','return-to-ruin'):'<a class="button secondary" href="#home">Level path</a>')+
    (next?'<a class="game-button" href="'+roundHref(next)+'">Continue to Level '+next.number+' →</a>':'<a class="game-button" href="#progress">View completed path →</a>')+'</div></div>';
  if(!dialog.open)dialog.showModal();
  else if(checked)$('.bonus-feedback')?.focus();
}
function clearRound(round, assisted) {
  const earned=assisted?1:round.tutorial?3:2;
  saveReward(round.id,earned);
  reward={round,earned,checked:false,correct:false,bonus:!round.tutorial&&!assisted&&!liveExam()};
  if(activeRound?.id===round.id)showReward();
}

function listRows() {
  const q=filters.q.trim().toLowerCase();
  const matches=db.problems.filter(p=>(!filters.topic||p.topic===filters.topic)&&(!filters.level||p.level===filters.level)&&
    (!filters.kind||p.kind===filters.kind)&&(!filters.status||(filters.status==='solved'===Boolean(solved[p.id])))&&
    (!q||(p.title+' '+titleFor(p.topic)+' '+p.prompt).toLowerCase().includes(q))).sort(difficultyOrder);
  $('#match-count').textContent=matches.length+' exercise'+(matches.length===1?'':'s');
  $('#rows').innerHTML=matches.length?matches.map(p=>'<a class="problem-row" href="#problem/'+p.id+'"><span class="status '+(solved[p.id]?'done':'')+'" aria-label="'+(solved[p.id]?'Solved':'Unsolved')+'">'+(solved[p.id]?'✓':'○')+'</span><span><strong>'+esc(p.title)+'</strong><small>'+esc(titleFor(p.topic))+' · '+p.kind+'</small></span>'+pill(p.level)+'<span class="row-arrow" aria-hidden="true">→</span></a>').join(''):'<div class="empty">No exercises match these filters.</div>';
}
function problemBank() {
  return section('PRACTICE BOARD','Open practice','Choose any of the '+db.problems.length+' exercises for extra practice.')+
    '<div class="catalog-tools"><label class="search"><span aria-hidden="true">⌕</span><input aria-label="Search exercises" id="search" placeholder="Search exercises…" value="'+esc(filters.q)+'"></label>'+
    '<select aria-label="Topic" id="filter-topic">'+options([['','All topics'],...db.topics],filters.topic)+'</select>'+
    '<select aria-label="Difficulty" id="filter-level">'+options([['','All levels'],...levels.map(l=>[l,l])],filters.level)+'</select>'+
    '<select aria-label="Exercise type" id="filter-kind">'+options([['','All exercise types'],...['Guided lesson','Exercism practice','Core problem','Batch drill','Complexity drill'].map(x=>[x,x])],filters.kind)+'</select>'+
    '<select aria-label="Completion" id="filter-status">'+options([['','Any status'],['solved','Solved'],['open','Unsolved']],filters.status)+'</select></div>'+
    '<div class="catalog"><div class="catalog-head"><span id="match-count"></span><span>DIFFICULTY</span></div><div id="rows"></div></div>';
}
function notes(topic) {
  const key=db.lessons[topic]?topic:'java';
  return section('REFERENCE','Java & DSA notes','Study the mechanics, learn the invariants, and try a short implementation while the idea is fresh.')+
    '<div class="reference"><nav class="topic-menu" aria-label="Lesson topics">'+db.topics.map(([id,name,num])=>'<a href="#lessons/'+id+'" '+(id===key?'aria-current="page"':'')+'><span>'+num+'</span> '+name+'</a>').join('')+
    '</nav><div class="note-body"><div class="eyebrow">FIELD NOTES</div><h2>'+esc(titleFor(key))+'</h2>'+db.lessons[key].map(([title,text,code])=>'<article class="note"><h3>'+esc(title)+'</h3><p>'+esc(text)+'</p><pre>'+esc(code)+'</pre></article>').join('')+
    '<div class="inline-actions"><a class="button primary" href="#problems/'+key+'">Practice this topic →</a><a class="button secondary" href="#memory/'+key+'">Review memory cues</a></div><div class="sources"><a href="https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html" target="_blank" rel="noopener">Java String reference ↗</a><a href="https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayDeque.html" target="_blank" rel="noopener">Java ArrayDeque reference ↗</a><a href="https://dev.java/learn/classes-objects/" target="_blank" rel="noopener">Classes and objects ↗</a></div>'+
    '<details class="glossary"><summary>Programmer field guide</summary><dl>'+programmerTerms.map(([term,meaning])=>'<dt>'+esc(term)+'</dt><dd>'+esc(meaning)+'</dd>').join('')+'</dl></details></div></div>';
}
function companionCollection() {
  const stars=starTotal();
  return section('PLAYER COLLECTION','Companions','Earn stars to recruit a traveling companion. Pick one to bring along on the quest map.')+
    '<div class="collection">'+companions.map(([id,name,type,goal,line])=>'<article class="companion-card '+(equipped===id?'equipped':'')+'">'+
      '<div class="companion-art">'+portrait(id)+'</div><div class="eyebrow">'+esc(type)+'</div><h2>'+esc(name)+'</h2><p>'+esc(line)+'</p>'+
      (equipped===id?'<span class="pill easy">✓ Equipped</span>':stars>=goal?btn('Equip companion','equip-companion','primary','data-companion="'+id+'"'):'<span class="companion-goal">'+icon('lock')+' '+goal+' stars to unlock</span>')+'</article>').join('')+'</div>';
}
function complexity() {
  const growth=db.problems.filter(p=>p.benchmark&&p.kind==='Core problem');
  return section('MEASURE & EXPLAIN','Complexity lab','Derive the growth rate on paper, then measure how two Java implementations scale.')+
    '<div class="complex-intro"><div><div class="eyebrow">WORK ESTIMATOR</div><h2>What happens when n doubles?</h2><p>Start by counting visits, comparisons, or updates. Then move the slider to see how common growth models react to larger inputs.</p><label class="field">Input size <strong id="growth-n">256</strong><input id="growth-size" type="range" min="1" max="20" value="8" aria-label="Input size exponent"></label><p class="muted">Each step doubles n. Bar lengths use a log scale. These are modeled operation counts.</p></div><div id="growth-model"></div></div>'+
    '<div class="comparison-grid">'+growth.map(p=>'<article class="comparison"><div class="eyebrow">'+esc(titleFor(p.topic))+'</div><h3>'+esc(p.title)+'</h3><div class="formula">'+esc(map.get(p.id+'-baseline').time)+' <span>→</span> '+esc(p.time)+'</div><div class="inline-actions"><a href="#problem/'+p.id+'-baseline">Try baseline</a><a href="#problem/'+p.id+'">Try optimized →</a></div></article>').join('')+'</div>';
}
function growthModel() {
  const exp=Number($('#growth-size').value),n=2**exp;
  $('#growth-n').textContent='n = '+n.toLocaleString();
  $('#growth-size').setAttribute('aria-valuetext','n equals '+n);
  $('#growth-model').innerHTML=[['1',1],['log₂ n',exp],['n',n],['n log₂ n',n*exp],['n²',n*n]].map(([label,value])=>
    '<div class="model-row"><strong>'+label+'</strong><span class="model-bar" aria-hidden="true"><i style="width:'+Math.max(3,100*Math.log2(value)/40)+'%"></i></span><span>'+value.toLocaleString()+'</span></div>').join('');
}
function memory(topic) {
  memoryTopic=db.topics.some(t=>t[0]===topic)?topic:'';
  const stack=db.cards.map((card,index)=>({card,index})).filter(x=>!memoryTopic||x.card[0]===memoryTopic);
  if(!stack.length)return section('ACTIVE RECALL','Memory cues','No cards in this track.');
  memoryIndex=(memoryIndex+stack.length)%stack.length;
  const {card:[key,cue,prompt,choices,correct,why],index}=stack[memoryIndex];
  return section('ACTIVE RECALL','Memory cues','Predict the result before you reveal the shortcut. Review the traps you keep missing.')+
    '<div class="memory-toolbar"><label class="field compact">Topic<select id="memory-topic">'+options([['','All topics'],...db.topics],memoryTopic)+'</select></label><span class="muted">'+(memoryIndex+1)+' / '+stack.length+' cards</span></div>'+
    '<article class="memory-card"><div class="eyebrow">'+esc(titleFor(key))+'</div><h2>'+esc(prompt)+'</h2><div class="choices">'+choices.map((choice,i)=>'<button class="choice '+(answerChoice===null?'':i===correct?'correct':i===answerChoice?'incorrect':'')+'" data-action="answer" data-index="'+i+'" '+(answerChoice===null?'':'disabled')+'><span>'+String.fromCharCode(65+i)+'</span>'+esc(choice)+'</button>').join('')+'</div>'+
    (answerChoice!==null?'<div class="memory-reveal" role="status"><strong>'+esc(cue)+'</strong><p>'+esc(why)+'</p></div>':'')+
    '<div class="memory-footer">'+btn('← Previous','previous-card')+'<span class="muted">'+(reviewed[index]?'✓ Mastered':'')+'</span>'+btn('Next card →','next-card','primary')+'</div></article>';
}
function progress() {
  const medals=campaign.worlds.filter(world=>world.rounds.every(round=>questStars[round.id]));
  return section('PLAYER RECORD','Trophy room','See your stars, completed islands, and practice record.')+
    '<div class="trophy-shelf"><div class="trophy-count">'+starIcon+'<span><strong>'+starTotal()+' / '+campaign.rounds.length*3+'</strong> stars collected</span></div><div class="trophy-count">'+icon('progress')+'<span><strong>'+medals.length+' / '+campaign.worlds.length+'</strong> islands cleared</span></div></div>'+
    (medals.length?'<div class="medal-list">'+medals.map(world=>'<a href="#home/'+world.id+'">'+icon('progress')+' '+esc(world.name)+'</a>').join('')+'</div>':'')+
    '<div class="progress-panel"><div class="section-heading"><h2>'+solvedCount()+' of '+db.problems.length+' exercises solved</h2><span>'+pct(solvedCount(),db.problems.length)+'%</span></div><progress value="'+solvedCount()+'" max="'+db.problems.length+'"></progress>'+
    db.topics.map(([id,name])=>{const group=db.problems.filter(p=>p.topic===id),done=group.filter(p=>solved[p.id]).length;return '<a href="#problems/'+id+'" class="progress-row"><span>'+name+'</span><progress value="'+done+'" max="'+group.length+'"></progress><span>'+done+' / '+group.length+'</span></a>';}).join('')+
    '</div><div class="progress-panel"><h2>Most recent timed session</h2><p>'+(!exam?'Start an exam timer to record a session.':(liveExam()?'In progress':'Finished')+' · '+Object.keys(exam.passed).length+' distinct passing submissions')+'</p>'+btn('Exam timer','exam')+'</div>';
}

function listenControl(problem) {
  const transcript=lessonTranscript(problem);
  if(!transcript)return '';
  return '<div class="problem-audio">'+btn(icon('speaker')+' <span>Listen to the lesson</span>','listen-problem','secondary','aria-expanded="false"')+
    '<audio aria-label="Lesson narration playback" preload="none" controls hidden src="./assets/narration/'+esc(problem.id)+'.mp3"></audio>'+
    '<span class="audio-status" role="status"></span><details><summary>Read transcript</summary><p>'+esc(transcript)+'</p></details></div>';
}
async function startProblemAudio(button) {
  const audio=button.parentElement.querySelector('audio');
  const status=button.parentElement.querySelector('.audio-status');
  audio.hidden=false;
  button.setAttribute('aria-expanded','true');
  status.textContent='';
  try {
    await audio.play();
    button.hidden=true;
    audio.focus();
  } catch (error) {
    if(error.name!=='AbortError')status.textContent='This recording could not play. You can read the transcript below.';
  }
}
async function runTeachingExample(button) {
  const round=campaign.byId.get(currentRoute()[1]);
  const index=Number(button.dataset.index);
  const example=round?.station.examples?.[index];
  if(!example||liveExam())return;
  const demo=example[2];
  const code=demo?'import java.util.*;\npublic class Main { public static void main(String[] args) {\n'+example[0]+'\n} }':
    exampleProgram(round.id,index,example[0]);
  if(!code)return;
  const output=button.nextElementSibling;
  output.hidden=false;
  output.textContent='Running Java…';
  button.disabled=true;
  try {
    const response=await request('/api/scratch',{method:'POST',headers:{'Content-Type':'application/json','X-DSA-Lab':'practice'},body:JSON.stringify({code,input:demo?.stdin??''})});
    const result=await response.json();
    const printed=result.output;
    output.textContent=result.error||('Java output\n'+(printed?.trim()?printed:printed?'(blank line)':'(nothing printed)'));
  } catch {
    output.textContent='The local Java runner could not be reached. The expected result is shown above.';
  } finally {
    button.disabled=false;
  }
}
function editorHelp(scratch) {
  const mod=shortcutModifier;
  const shortcuts=[
    ['Tab','Indent the current line or selection'],
    ['Shift + Tab','Move the current line or selection left'],
    ['Escape, then Tab','Move focus out of the editor'],
    [mod+' + F','Find text in the file'],
    [mod+' + /','Toggle line comments'],
    [mod+' + Z','Undo the last edit'],
    [mod+' + Shift + Z','Redo the last edit'],
    [mod+' + Enter',scratch?'Run the program':'Run the example'],
  ];
  if(!scratch)shortcuts.push([mod+' + Shift + Enter','Submit against all tests']);
  return '<div class="editor-help"><p id="editor-key-hint">Tab indents. To leave the editor, press Escape, then Tab.</p>'+
    '<details><summary>Editor shortcuts</summary><dl>'+shortcuts.map(([keys,description])=>
      '<dt><kbd>'+keys+'</kbd></dt><dd>'+description+'</dd>').join('')+'</dl></details></div>';
}
function openEditor(key, doc, onChange, previous, scratch=false) {
  const saved=previous?.key===key?previous:null;
  const view=mountJavaEditor($('#code'),{
    doc, state:saved?.state, onChange,
    onRun:scratch?runScratch:()=>run('run'),
    onSubmit:scratch?null:()=>run('submit'),
  });
  javaEditor={key,view};
  if(saved) {
    view.scrollDOM.scrollTop=saved.scrollTop;
    view.scrollDOM.scrollLeft=saved.scrollLeft;
    if(saved.focused)view.focus();
  }
}
const experimentFor = key => experiments.find(x=>x[0]===key)||experiments[0];
const scratchId = () => currentRoute()[0]==='scratch'?experimentFor(currentRoute()[1])[0]:null;
const editorMount = '<div class="editor" id="code"></div>';
function scratchpad(key) {
  const [id,,prompt,lines,input]=experimentFor(key);
  const starter=['import java.util.*;','','public class Main {','    public static void main(String[] args) {',...lines.map(line=>'        '+line),'    }','}',''].join('\n');
  const markup=section('EXPERIMENT FREELY','Java scratchpad','Predict what the program will do, change a line, and compare the output.')+
    '<div class="workspace"><section class="problem-description"><label class="field">Experiment<select id="experiment">'+options(experiments,id)+'</select></label><p class="prompt">'+esc(prompt)+'</p>'+
    '<label class="field">Standard input<textarea id="scratch-input" spellcheck="false" rows="6">'+esc(scratchInputs[id]??input)+'</textarea></label>'+
    '<p class="muted scratch-tip">The runner compiles Main.java and starts Main. Use System.out.println to inspect values as you go.</p></section>'+
    '<section class="work-panel"><div class="editor-top"><div><i></i><strong>Main.java</strong><span>Java</span></div></div>'+editorMount+
    '<div class="editor-bottom"><span id="storage-status">Draft saves locally</span>'+btn('▷ Run program','run-scratch','primary')+'</div>'+editorHelp(true)+
    '<div class="output"><div class="output-top"><span>'+icon('scratch')+' Console output</span></div><div id="scratch-output" aria-live="polite"></div></div></section></div>';
  return {id,starter,markup};
}

function workspace(p) {
  const set=p.practiceSource?db.problems.filter(x=>x.practiceSource?.slug===p.practiceSource.slug):
    db.topics.flatMap(([id])=>db.problems.filter(x=>x.topic===id&&x.kind===p.kind).sort(difficultyOrder));
  const next=set[set.indexOf(p)+1];
  const restricted=liveExam();
  const timer=p.tutorial?'':'<button class="timer-button" data-action="problem-clock" id="problem-clock"></button>'+btn('Reset clock','reset-clock','quiet');
  const beginnerHelp='<h3>How to practice</h3><p>Use Run example to see what your code does. Edit the instructions, then use '+(activeRound?'Check level':'Submit solution')+' to see whether the result matches the task.</p>'+
    (p.bodyOnly?'<p>The editor shows just the instructions you need to change. Java runs them inside a method provided by the app.</p>':'');
  const complexity='<h3>Reason about complexity</h3><p>Write the worst-case time and auxiliary space of your approach. Compare with the reference after you make a prediction.</p><label class="field">My analysis<textarea id="analysis-note" rows="3" placeholder="Time, space, and why…">'+esc(read('analysis',{})[p.id]||'')+'</textarea></label>';
  return '<div class="workspace-top"><a href="'+(activeRound?roundHref(activeRound):'#problems/'+p.topic)+'">← '+(activeRound?'Lesson and examples':'Open practice')+'</a><div class="inline-actions">'+timer+(!activeRound&&next?'<a class="button secondary" href="#problem/'+next.id+'">Next exercise →</a>':'')+'</div></div>'+
    (activeRound?roundSteps(1):'')+'<div class="workspace"><section class="problem-description"><div class="eyebrow">'+(activeRound?'LEVEL '+activeRound.number+' · '+esc(worldFor(activeRound.world).name):esc(titleFor(p.topic))+' / '+p.kind)+'</div><h1>'+esc(p.title)+'</h1><div class="labels">'+(!p.tutorial?pill(p.level):'')+(solved[p.id]?'<span class="pill easy">✓ Solved</span>':'')+'</div>'+
    (!restricted?listenControl(p):'')+'<p class="prompt">'+esc(p.prompt)+'</p>'+
    (p.practiceSource?'<div class="briefing-tip"><span class="eyebrow">PRACTICE FROM EXERCISM</span><p>'+esc(p.practiceSource.lesson)+'</p><a href="'+esc(p.practiceSource.url)+'" target="_blank" rel="noopener noreferrer">Original '+esc(p.practiceSource.name)+' exercise ↗</a></div>':'')+
    (p.tutorial?'<details class="practice-examples"><summary>Review worked examples</summary>'+lessonExamples({station:{examples:p.tutorial.examples}})+'</details>':
      '<div class="example"><div class="eyebrow">WORKED INPUT</div>'+p.examples.map(([input,expected])=>'<dl>'+input.map((arg,i)=>'<dt>'+esc(p.args[i][1])+'</dt><dd><code>'+fmt(arg)+'</code></dd>').join('')+'<dt>Returns</dt><dd><code>'+fmt(expected)+'</code></dd></dl>').join('')+'</div>')+
    '<div class="analysis-box">'+(p.tutorial||p.practiceSource?beginnerHelp:complexity)+
    (restricted?'<small>Hints and solutions return after your timed session.</small>':'<div class="inline-actions"><details class="hint"><summary>Reveal hint</summary><p>'+esc(p.hint)+'</p></details></div>'+btn('Reveal reference','solution','secondary')+(activeRound?'<small class="reference-cost">Opening the reference limits this attempt to one star.</small>':'')+'<div id="solution"></div>')+'</div></section>'+
    '<section class="work-panel"><div class="editor-top"><div><i></i><strong>'+(p.bodyOnly?'Your instructions':'Solution.java')+'</strong><span>Java</span></div>'+btn('Reset draft','reset-draft','quiet')+'</div>'+
    editorMount+
    '<div class="editor-bottom"><span id="storage-status">Draft saves locally</span><div class="inline-actions">'+btn('▷ Run example','run','secondary')+btn(activeRound?'Check level →':'Submit solution','submit','primary')+'</div></div>'+editorHelp(false)+
    '<div class="output"><div class="output-top"><span>'+icon('problems')+' Test results</span>'+(!restricted&&p.benchmark?'<div class="inline-actions">'+btn('Measure references','reference-benchmark','quiet')+btn('Compare growth','benchmark','quiet')+'</div>':'')+'</div><div id="output-body" aria-live="polite"></div></div></section></div>';
}

function render() {
  if(!db)return;
  main.querySelector('audio')?.pause();
  let previous;
  if(javaEditor) {
    const {key,view}=javaEditor;
    previous={key,state:view.state,focused:view.hasFocus,scrollTop:view.scrollDOM.scrollTop,scrollLeft:view.scrollDOM.scrollLeft};
    view.destroy();
    javaEditor=null;
  }
  const [route,param,step]=currentRoute();
  const page=route==='problem'?'problems':nav.some(([id])=>id===route)?route:'home';
  const round=route==='round'?campaign.byId.get(param):null;
  activeRound=step==='play'&&unlocked(round,currentRound(),questStars)?round:null;
  selected=activeRound||(route==='problem'?map.get(param):null);
  renderedExam=liveExam();
  $('#navigation').innerHTML=nav.map(([id,name])=>'<a href="#'+id+'" '+(id===page?'aria-current="page"':'')+'><i class="nav-icon nav-'+id+'">'+icon(id)+'</i><span>'+name+'</span></a>').join('');
  $('#crumb').innerHTML='Adventure <span>/</span> '+(round?'Level '+round.number:selected?esc(titleFor(selected.topic)):nav.find(x=>x[0]===page)[1]);
  syncHud();
  main.className=selected?'practice-main':page==='home'?'quest-main':'';
  if(selected) {
    const problem=selected;
    main.innerHTML=workspace(problem);
    openEditor('problem/'+problem.id,drafts[problem.id]??problem.starter,value=>{
      drafts[problem.id]=value;
      save('drafts',drafts);
    },previous);
    showResults();tick();
  } else if(route==='round') {
    main.innerHTML=briefing(round);
  } else if(page==='problems') {
    filters.topic=db.topics.some(t=>t[0]===param)?param:'';
    main.innerHTML=problemBank();listRows();
  } else if(page==='scratch') {
    const {id,starter,markup}=scratchpad(param);
    main.innerHTML=markup;
    openEditor('scratch/'+id,scratchDrafts[id]??starter,value=>{
      scratchDrafts[id]=value;
      save('scratchDrafts',scratchDrafts);
    },previous,true);
    showScratch();
  }
  else if(page==='lessons') main.innerHTML=notes(param);
  else if(page==='memory') main.innerHTML=memory(param);
  else if(page==='complexity') {main.innerHTML=complexity();growthModel();}
  else if(page==='fieldbook') main.innerHTML=fieldbook();
  else if(page==='companions') main.innerHTML=companionCollection();
  else if(page==='progress') main.innerHTML=progress();
  else main.innerHTML=home(param);
}

function showScratch() {
  const output=$('#scratch-output');
  if(!output)return;
  $('[data-action="run-scratch"]').disabled=pending;
  const result=scratchResults[scratchId()];
  output.innerHTML=!result?'<p class="muted">Run the program to see what it prints.</p>':result.pending
    ?'<p class="muted">Compiling and running Java…</p>'
    :(result.output?'<pre>'+esc(result.output)+'</pre>':'')+
      (result.error?'<pre class="error-log">'+esc(result.error)+'</pre>':result.output?'':'<p class="muted">The program finished without printing anything.</p>');
}
async function runScratch() {
  const id=scratchId();
  if(!id||!javaEditor||pending)return;
  pending=true;scratchResults[id]={pending:true};showScratch();
  try {
    const response=await request('/api/scratch',{method:'POST',headers:{'Content-Type':'application/json','X-DSA-Lab':'practice'},body:JSON.stringify({code:javaEditor.view.state.doc.toString(),input:$('#scratch-input').value})});
    scratchResults[id]=await response.json();
  } catch {scratchResults[id]={error:'The local runner could not be reached.'};}
  finally {pending=false;showScratch();showResults();}
}
function showResults() {
  const body=$('#output-body');
  if(!body||!selected)return;
  const result=results[selected.id];
  document.querySelectorAll('[data-action="run"],[data-action="submit"],[data-action$="benchmark"]').forEach(button=>button.disabled=pending);
  if(!result)body.innerHTML='<p class="muted output-empty">Run the example to check your code, or submit against all '+selected.tests+' cases. <kbd>'+shortcutModifier+'</kbd> + <kbd>Enter</kbd> runs the example.</p>';
  else if(result.pending)body.innerHTML='<p class="muted">Compiling and running Java…</p>';
  else if(result.error)body.innerHTML='<div class="result-label bad">Run stopped</div><pre class="error-log">'+esc(result.error)+'</pre>';
  else if(result.values) {
    const max=Math.max(...result.values.flat(),1);
    body.innerHTML='<div class="result-label">Growth comparison</div><p class="muted">Median of nine measurements per size after five warm-ups. '+esc(result.slow)+' baseline, '+esc(result.fast)+' reference. Small timings include JVM noise. Derive Big-O from the algorithm.'+(result.classes.includes('Attempt')?' Submit your attempt separately to check correctness.':'')+'</p>'+
      '<div class="bench-key">'+result.classes.map((c,i)=>'<span class="bar-key bar-'+i+'">'+esc(c)+'</span>').join('')+'</div>'+
      result.values.map((row,i)=>'<div class="bench-row"><strong>n = '+result.sizes[i]+'</strong><div>'+row.map((v,j)=>'<div class="bench-value"><i class="bar-'+j+'" style="width:'+Math.max(1,100*v/max)+'%"></i><span>'+(v/1000).toFixed(2)+' µs</span></div>').join('')+'</div></div>').join('');
  } else {
    if(selected.prints&&!result.submitted) {
      body.innerHTML='<div class="result-label">Console output</div><pre class="tutorial-console">'+
        esc(result.results[0].error??(result.results[0].actual||'Your instructions did not print anything.'))+
        '</pre><p class="muted">'+(activeRound?'Check level':'Submit your solution')+' when your output matches the task.</p>';
      return;
    }
    body.innerHTML='<div class="result-label '+(result.passed?'good':'bad')+'">'+(result.passed?'✓ ':'')+result.results.filter(x=>x.passed).length+' / '+result.results.length+' cases passed'+(result.submitted&&result.passed?' · progress saved':'')+'</div>'+
    (activeRound&&reward?.round.id===selected.id&&result.submitted&&result.passed?btn('View stars','view-stars','quiet'):'')+
    result.results.map((test,i)=>'<details class="case" '+(!test.passed?'open':'')+'><summary>Case '+(i+1)+' · '+(test.passed?'Pass':'Fail')+' <span>'+(test.nanos/1000000).toFixed(3)+' ms</span></summary><dl><dt>Arguments</dt><dd><code>'+fmt(test.input)+'</code></dd><dt>Expected</dt><dd><code>'+fmt(test.expected)+'</code></dd><dt>Returned</dt><dd><code>'+(test.error?esc(test.error):fmt(test.actual))+'</code></dd></dl></details>').join('')+
    (result.logs?'<details class="case"><summary>Console output</summary><pre>'+esc(result.logs)+'</pre></details>':'');
  }
}
async function run(action) {
  const measure=action.endsWith('benchmark');
  if(!selected||!javaEditor||pending||(measure&&liveExam()))return;
  const id=selected.id,code=javaEditor.view.state.doc.toString(),submitted=action==='submit';
  const round=activeRound, assisted=Boolean(questAssisted[id]);
  const examStart=liveExam()?exam.started:null;
  pending=true;results[id]={pending:true};showResults();
  try {
    const response=await request(measure?'/api/benchmark':'/api/run',{method:'POST',headers:{'Content-Type':'application/json','X-DSA-Lab':'practice'},body:JSON.stringify({id,code,submit:submitted,referenceOnly:action==='reference-benchmark'})});
    const result=await response.json();
    results[id]={...result,submitted};
    if(result.passed&&submitted) {
      solved[id]=Date.now();save('solved',solved);
      if(examStart!==null&&exam?.started===examStart&&liveExam()){exam.passed[id]=true;save('exam',exam);}
      if(selected?.id===id&&!$('.labels .easy:last-child')?.textContent.includes('Solved'))$('.labels').insertAdjacentHTML('beforeend','<span class="pill easy">✓ Solved</span>');
      if(round)clearRound(round,assisted);
    }
  } catch { results[id]={error:'The local runner could not be reached. Keep the Java DSA Lab window open and retry.'}; }
  finally { pending=false;showResults();showScratch(); }
}
function tick() {
  const time=$('#header-clock'), now=Date.now();
  time.textContent=liveExam()?clock(exam.ends-now)+' remaining':'Time trial';
  if(renderedExam&&!liveExam()&&selected)render();
  const status=$('#exam-status');
  status.textContent=exam?(liveExam()?'In progress · '+clock(exam.ends-now):'Finished')+' · '+Object.keys(exam.passed).length+' passing submissions':'';
  $('[data-action="stop-exam"]').disabled=!liveExam();
  $('[data-action="start-exam"]').disabled=liveExam();
  const timer=$('#problem-clock');
  if(timer&&selected) {
    const current=problemTimers[selected.id], seconds=duration[selected.level]*60000;
    const remain=current?.end?current.end-now:current?.remaining??seconds;
    timer.textContent=remain<=0?'Time up':(current?.end?'Ⅱ ':'▷ ')+clock(remain);
    timer.setAttribute('aria-label',remain<=0?'Problem timer expired':current?.end?'Pause problem timer':'Start problem timer');
  }
}

document.addEventListener('input',event=>{
  const {id,value}=event.target;
  if(id==='scratch-input'&&scratchId()){scratchInputs[scratchId()]=value;save('scratchInputs',scratchInputs);}
  else if(id==='analysis-note'&&selected){const notes=read('analysis',{});notes[selected.id]=value;save('analysis',notes);}
  else if(id==='search'){filters.q=value;listRows();}
  else if(id==='growth-size')growthModel();
});
document.addEventListener('change',event=>{
  const {id,value}=event.target;
  if(id.startsWith('filter-')){filters[id.slice(7)]=value;listRows();}
  else if(id==='memory-topic'){memoryIndex=0;answerChoice=null;go('memory'+(value?'/'+value:''));}
  else if(id==='experiment')go('scratch/'+value);
});
const sidebar=$('#site-sidebar'), sidebarToggle=$('#sidebar-toggle');
function showSidebar(visible) {
  sidebar.hidden=!visible;
  sidebar.parentElement.classList.toggle('sidebar-hidden',!visible);
  const label=visible?'Hide sidebar':'Show sidebar';
  sidebarToggle.setAttribute('aria-expanded',String(visible));
  sidebarToggle.setAttribute('aria-label',label);
  sidebarToggle.title=label;
}
showSidebar(!read('sidebarHidden',false));
sidebarToggle.addEventListener('click',()=>{
  showSidebar(sidebar.hidden);
  save('sidebarHidden',sidebar.hidden);
});
document.addEventListener('click',async event=>{
  const external=event.target.closest('a[href^="https://"]');
  if(inGame&&external){event.preventDefault();sendToGame({type:'open-reference',url:external.href});return;}
  if(native&&external){event.preventDefault();await native('open_reference',{url:external.href}).catch(error=>alert(String(error)));return;}
  const trigger=event.target.closest('[data-action]');
  if(!trigger||!db)return;
  const {action}=trigger.dataset;
  if(action==='return-to-ruin'&&inGame)return returnToRuin();
  if(action==='listen-problem')return startProblemAudio(trigger);
  if(action==='run-teaching-example')return runTeachingExample(trigger);
  if(action==='equip-companion') {
    const companion=companionFor(trigger.dataset.companion);
    if(starTotal()<companion[3])return;
    equipped=companion[0];save('equipped',equipped);
    main.innerHTML=companionCollection();
    const equippedCard=$('.companion-card.equipped');equippedCard.tabIndex=-1;equippedCard.focus();
    return;
  }
  if(action==='warmup-answer') {
    const box=trigger.closest('.warmup-question'), round=campaign.byId.get(trigger.dataset.round);
    const [,,correct,why]=questionsFor(round)[Number(box.dataset.question)];
    const choice=Number(trigger.dataset.choice);
    box.querySelectorAll('button').forEach((button,i)=>{button.disabled=true;if(i===correct)button.classList.add('correct');else if(i===choice)button.classList.add('incorrect');});
    box.querySelector('.warmup-feedback').textContent=(choice===correct?'✓ Correct. ':'Check this detail. ')+why;
    return;
  }
  if(action==='view-stars')return showReward();
  if(action==='close-reward')return $('#reward-dialog').close();
  if(action==='check-bonus'&&reward?.bonus&&!reward.checked&&!liveExam()) {
    reward.checked=true;
    reward.correct=complexityChoices(reward.round)[Number(trigger.dataset.index)]===reward.round.time;
    if(reward.correct){reward.earned=3;saveReward(reward.round.id,3);}
    return showReward();
  }
  if(['run','submit','benchmark','reference-benchmark'].includes(action))return run(action);
  if(action==='run-scratch')return runScratch();
  if(action==='exam'){$('#exam-dialog').showModal();return tick();}
  if(action==='start-exam'){
    const started=Date.now();exam={started,ends:started+Number($('#exam-minutes').value)*60000,passed:{}};save('exam',exam);
    $('#exam-dialog').close();render();return tick();
  }
  if(action==='stop-exam'){exam.ended=Date.now();save('exam',exam);$('#exam-dialog').close();render();return tick();}
  if(action==='problem-clock'&&selected) {
    const t=problemTimers[selected.id], now=Date.now(), remaining=t?.end?t.end-now:t?.remaining??duration[selected.level]*60000;
    if(remaining>0)problemTimers[selected.id]=t?.end?{remaining}:{end:now+remaining};
    save('problemTimers',problemTimers);return tick();
  }
  if(action==='reset-clock'&&selected){delete problemTimers[selected.id];save('problemTimers',problemTimers);return tick();}
  if(action==='reset-draft')return $('#reset-dialog').showModal();
  if(action==='confirm-reset'&&selected){
    const view=javaEditor.view;
    view.dispatch({changes:{from:0,to:view.state.doc.length,insert:selected.starter},selection:{anchor:0}});
    delete drafts[selected.id];save('drafts',drafts);
    delete questAssisted[selected.id];save('questAssisted',questAssisted);
    $('#reset-dialog').close();
    if($('#solution'))$('#solution').replaceChildren();
    view.focus();
    return;
  }
  if(action==='solution'&&selected&&!liveExam()) {
    const id=selected.id, stamp=++solutionRequest, output=$('#solution');
    output.textContent='Loading reference…';
    try{
      const response=await request('/api/solution/'+id);
      if(!response.ok)throw new Error();
      const {code,time,space}=await response.json();
      if(stamp!==solutionRequest||id!==selected?.id||liveExam()||!output.isConnected)return;
      if(campaign.byId.has(id)){questAssisted[id]=true;save('questAssisted',questAssisted);}
      output.innerHTML='<h4>Reference solution</h4>'+(selected.tutorial?'':'<p><strong>Time</strong> '+esc(time)+'<br><strong>Space</strong> '+esc(space)+'</p>')+'<pre>'+esc(code)+'</pre>';
    }catch{output.textContent='Reference unavailable. Try again.';}
    return;
  }
  if(action==='answer'&&answerChoice===null) {
    const indices=db.cards.map((c,i)=>[c,i]).filter(([c])=>!memoryTopic||c[0]===memoryTopic);
    const [card,index]=indices[memoryIndex];answerChoice=Number(trigger.dataset.index);
    reviewed[index]=answerChoice===card[4];save('reviewed',reviewed);
    main.innerHTML=memory(memoryTopic);$('.memory-reveal').setAttribute('tabindex','-1');$('.memory-reveal').focus();
  } else if(action==='previous-card'||action==='next-card') {
    memoryIndex+=action==='next-card'?1:-1;answerChoice=null;main.innerHTML=memory(memoryTopic);$('.memory-card h2').setAttribute('tabindex','-1');$('.memory-card h2').focus();
  }
});
window.addEventListener('hashchange',()=>{
  const dialog=$('#reward-dialog');if(dialog.open)dialog.close();
  answerChoice=null;memoryIndex=0;render();window.scrollTo(0,0);main.focus({preventScroll:true});
});
setInterval(tick,500);
try {
  const response=await request('/api/catalog');
  if(!response.ok)throw new Error();
  db=await response.json();
  map=new Map(db.problems.map(p=>[p.id,p]));
  campaign=bindJavaPath(db.problems,db.topics);
  render();tick();
} catch { main.innerHTML='<div class="empty">The lab could not load. Open Start Java DSA Lab.cmd and reload this page.</div>'; }
