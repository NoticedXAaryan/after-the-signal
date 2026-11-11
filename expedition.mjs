export const acts = [
  ['First Signal','Relay 07 · records office','Read inputs, return outputs, use conditions and loops, and test a real control rule.','Recover the cistern relay.'],
  ['Tools of the Trade','Salvage workshop','Work with text, collections, functions, and interfaces. Learn how to debug and test.','Build the quartermaster’s ledger.'],
  ['Routes and Reserves','Rail dispatch and cold stores','Choose data structures and algorithms. Compare complexity and tradeoffs.','Build a supply route planner.'],
  ['Machines That Talk','Flooded exchange','Work with files, serialization, APIs, timeouts, and retries.','Build a store-and-forward message service.'],
  ['The Black Archive','Abandoned data center','Study persistence, concurrency, observability, and system design.','Build a service that can survive a failed component.'],
  ['The Second Signal','Cairn’s new workshop','Gather requirements, review code, deploy, and decide which actions people must approve.','Build and defend a project of your choice.'],
];

export const stations = [
  {id:'input-output',java:'relay-units',skill:'Inputs and outputs',site:'Intake manifest',
    scene:'The tally marks on Cairn’s barrels match the marks in an old intake manifest. Each mark means four liters. The terminal asks you to teach it that rule.',
    lesson:'The runner calls solve with a value for marks. Java evaluates the expression after return and gives the result back to the runner. The runner compares that result with the expected number of liters.',
    check:['If the runner calls solve(3), what should your method return?',['3','7','12'],2,'Three marks at four liters per mark give twelve liters.']},
  {id:'comparison',java:'relay-warning',skill:'Booleans and boundaries',site:'Pressure plate',
    scene:'The warning plate has a line scratched at 80. Mara remembers the cistern spilling when the needle first touched it.',
    lesson:'A comparison evaluates to true or false. Greater-than excludes equality. Greater-than-or-equal includes it.',
    check:['The warning starts at 80. Should a reading of exactly 80 trigger it?',['Yes','No'],0,'The boundary is included. In Java, >= includes equality.']},
  {id:'branching',java:'relay-valve',skill:'Conditional branches',site:'Valve cabinet',
    scene:'Three wires leave the valve cabinet. One opens the inlet, one closes it, and the third leaves the valve alone.',
    lesson:'Use conditions to choose which result to return. Once a method returns, it stops. A final return can cover the case that none of the earlier conditions matched.',
    check:['At 50%, should the inlet open, close, or hold?',['OPEN','CLOSE','HOLD'],2,'50 lies between the low and high thresholds. The valve should hold.']},
  {id:'accumulation',java:'relay-total',skill:'Arrays, loops, and state',site:'Tally bench',
    scene:'The office did not store the cistern total. It stored every change in order. You need a way to replay the tally.',
    lesson:'An array stores several values. A for-each loop gives you each element in order. An accumulator is a variable you update each time through the loop.',
    check:['What should the total be before reading any changes?',['0','The first value','1'],0,'Start from zero, then add each entry exactly once. The same rule handles an empty log.']},
  {id:'first-match',java:'relay-leak',skill:'Indexes and early returns',site:'Inspection log',
    scene:'Water is escaping somewhere along the intake. The repair crew wants the position of the first low reading, so they know where to start looking.',
    lesson:'Array indexes begin at zero. Visit entries in order and return the index as soon as one matches. Return -1 after the loop to report that no entry matched.',
    check:['For readings [50, 22, 18] and a floor of 30, which index is the first low reading?',['0','1','2'],1,'22 is the first reading below 30 and is at index 1.']},
  {id:'control-contract',java:'relay-restore',skill:'Composition and safe failure',site:'Relay 07',
    scene:'The terminal can now read a log and choose a command. Cairn needs both jobs in one control rule, with a safe response when a reading is impossible.',
    lesson:'Split the job into validation, replaying the readings, and choosing an action. Test the input boundaries separately from the action rules.',
    check:['The reading briefly goes above 100 before returning to 50. What should the controller return?',['OPEN','HOLD','ERROR'],2,'Every intermediate reading must be valid. A valid final reading cannot repair a bad log.']},
];

import {javaSyllabus} from './syllabus.mjs';

const practiceOrder=['java','oop','arrays','hash','windows','search','stack','list','backtrack','tree','heap','graph','dp','advanced'];

export function bindJavaPath(problems, topics) {
  const byId=new Map(problems.map(problem=>[problem.id,problem]));
  const worlds=[];
  let number=0;
  function addWorld(id,name,entries,syllabus) {
    const rounds=entries.map(([problem,station])=>({...problem,station,number:++number,world:id}));
    worlds.push({id,name,rounds,syllabus});
  }
  const tutorials=Map.groupBy(problems.filter(problem=>problem.tutorial),problem=>problem.tutorial.group);
  for(const chapter of javaSyllabus) {
    const entries=tutorials.get(chapter.id)??[];
    const ordered=[];
    for(const problem of entries) {
      const {after}=problem.tutorial;
      const index=after?ordered.findIndex(p=>p.id===after):-1;
      if(after&&index===-1)throw new Error('Missing prerequisite '+after+' for '+problem.id);
      ordered.splice(after?index+1:ordered.length,0,problem);
    }
    if(ordered.at(-1)?.id!==chapter.repair)throw new Error('Missing final repair for '+chapter.id);
    addWorld('learn-'+chapter.id,chapter.title,ordered.map(problem=>[problem,{
      skill:problem.title,lesson:problem.tutorial.lesson,examples:problem.tutorial.examples,check:problem.tutorial.check,
    }]),chapter);
  }
  addWorld('signal','First Signal · Restore the cistern',stations.map(station=>[byId.get(station.java),station]));
  const challengeLevels=['Hard','Extreme'];
  const practice=practiceOrder.flatMap(topic=>problems.filter(p=>p.kind==='Core problem'&&p.topic===topic));
  const stationFor=problem=>({skill:problem.title,lesson:problem.hint});
  for(const topic of practiceOrder) {
    const entries=practice.filter(p=>p.topic===topic&&!challengeLevels.includes(p.level));
    if(entries.length)addWorld(topic,topics.find(([id])=>id===topic)[1],entries.map(p=>[p,stationFor(p)]));
  }
  addWorld('expert','Advanced challenges',challengeLevels.flatMap(level=>
    practice.filter(p=>p.level===level).map(p=>[p,stationFor(p)])));
  const rounds=worlds.flatMap(world=>world.rounds);
  return {rounds,worlds,byId:new Map(rounds.map(round=>[round.id,round]))};
}
