// Language-independent course metadata. Add a runner before exposing another language.
export const courses = [
  {
    id:'java',
    title:'Java & DSA',
    language:'Java',
    engine:'java',
    modules:[
      {id:'java-fundamentals',title:'Java fundamentals',topics:['java']},
      {id:'java-objects',title:'Object-oriented Java',topics:['oop']},
      {id:'java-dsa',title:'Data structures & algorithms',topics:['arrays','hash','windows','search','stack','list','tree','heap','graph','backtrack','dp','advanced']},
    ],
  },
];

const related = {
  'two-sum':['Two Sum','two-sum'],
  'brackets':['Valid Parentheses','valid-parentheses'],
  'merge-lists':['Merge Two Sorted Lists','merge-two-sorted-lists'],
  'binary-search':['Binary Search','binary-search'],
  'tree-depth':['Maximum Depth of Binary Tree','maximum-depth-of-binary-tree'],
  'cycle':['Linked List Cycle','linked-list-cycle'],
  'window-max':['Sliding Window Maximum','sliding-window-maximum'],
  'coins':['Coin Change','coin-change'],
};
export function practiceLink(id) {
  const problem=related[id];
  return problem?{title:problem[0],url:'https://leetcode.com/problems/'+problem[1]+'/'}:null;
}
