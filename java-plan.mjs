import {source} from './bank.mjs';

export function literal(type,value) {
  if(type.endsWith('[]')) return 'new '+type+'{'+value.map(v=>literal(type.slice(0,-2),v)).join(',')+'}';
  if(type==='ListNode') {
    const values=Array.isArray(value)?value:value.values;
    return 'Support.list('+literal('int[]',values)+','+(value.cycle??-1)+')';
  }
  if(type==='TreeNode') return 'Support.tree('+literal('Integer[]',value)+')';
  if(type==='String') {
    if(value===null)return 'null';
    return 'new String(new char[]{'+Array.from({length:value.length},(_,i)=>'(char)'+value.charCodeAt(i)).join(',')+'})';
  }
  if(value===null && type==='Integer')return 'null';
  if(type==='long')return value+'L';
  if(type==='double')return value+'d';
  if(['int','Integer','boolean'].includes(type))return String(value);
  throw new Error('Unsupported Java fixture type '+type);
}

export const support = String.raw`
import java.util.*;
import java.lang.reflect.Array;
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val; this.left = left; this.right = right;
    }
}
class Support {
    static ListNode list(int[] values, int cycle) {
        ListNode head = null, tail = null, entry = null;
        for (int i = 0; i < values.length; i++) {
            ListNode node = new ListNode(values[i]);
            if (i == cycle) entry = node;
            if (head == null) head = node; else tail.next = node;
            tail = node;
        }
        if (tail != null) tail.next = entry;
        return head;
    }
    static TreeNode tree(Integer[] values) {
        if (values.length == 0 || values[0] == null) return null;
        TreeNode root = new TreeNode(values[0]);
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        for (int i = 1; i < values.length && !queue.isEmpty();) {
            TreeNode parent = queue.remove();
            Integer left = values[i++];
            Integer right = i < values.length ? values[i++] : null;
            if (left != null) queue.add(parent.left = new TreeNode(left));
            if (right != null) queue.add(parent.right = new TreeNode(right));
        }
        return root;
    }
    static Object normalize(Object value, String type) {
        if (type.endsWith("[]") && type.startsWith("ListNode")) {
            Object[] output = new Object[Array.getLength(value)];
            for (int i = 0; i < output.length; i++) output[i] = normalize(Array.get(value,i),type.substring(0,type.length()-2));
            return output;
        }
        if (type.equals("ListNode")) {
            List<Integer> result = new ArrayList<>();
            Set<ListNode> seen = Collections.newSetFromMap(new IdentityHashMap<>());
            for (ListNode node = (ListNode)value; node != null; node = node.next) {
                if (!seen.add(node)) throw new IllegalArgumentException("Returned list contains a cycle.");
                result.add(node.val);
            }
            return result.toArray();
        }
        return value;
    }
    static String json(Object value) {
        if (value == null) return "null";
        if (value instanceof Double d && !Double.isFinite(d)) return quote(d.toString());
        if (value instanceof Number || value instanceof Boolean) return value.toString();
        if (value instanceof String s) return quote(s);
        if (value.getClass().isArray()) {
            StringJoiner out = new StringJoiner(",", "[", "]");
            for (int i = 0; i < Array.getLength(value); i++) out.add(json(Array.get(value,i)));
            return out.toString();
        }
        return quote(String.valueOf(value));
    }
    static String quote(String text) {
        StringBuilder out = new StringBuilder().append('"');
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (c == '"' || c == 92) out.append((char)92).append(c);
            else if (c < 32 || Character.isSurrogate(c)) out.append(String.format("%c%s%04x",92,"u",(int)c));
            else out.append(c);
        }
        return out.append('"').toString();
    }
    static final java.io.PrintStream output = System.out;
    static String captureConsole(Runnable code) {
        var buffer = new java.io.ByteArrayOutputStream();
        try (var stream = new java.io.PrintStream(buffer, false, java.nio.charset.StandardCharsets.UTF_8)) {
            System.setOut(stream);
            try {
                code.run();
            } finally {
                System.setOut(output);
            }
        }
        return buffer.toString(java.nio.charset.StandardCharsets.UTF_8).replace("\r\n", "\n");
    }
    static void emit(boolean passed, Object actual, long nanos, String error) {
        output.println("@DSA@" + "{\"passed\":"+passed+",\"actual\":"+json(actual)+",\"nanos\":"+nanos+",\"error\":"+json(error)+"}");
    }
}
`;

export function fixture(p, [args,expected], name, className='Solution') {
  const values=p.args.map(([type],i)=>type+' a'+i+' = '+literal(type,args[i])+';').join('\n');
  const call=p.args.map((_,i)=>'a'+i).join(', ');
  const expectedType=p.prints?'String':p.result.replace('ListNode','int[]');
  const pure=p.pure?' && Objects.deepEquals(a0,'+literal(p.args[0][0],args[0])+') && result != a0':'';
  const invocation='solver.'+p.method+'('+call+')';
  const result=p.prints?'String result = Support.captureConsole(() -> '+invocation+');':p.result+' result = '+invocation+';';
  return 'static void '+name+'() {\n'+values+'\ntry {\n'+className+' solver = new '+className+'();\n'+
    'long start = System.nanoTime();\n'+result+'\n'+
    'long nanos = System.nanoTime()-start;\n'+
    'Object actual = Support.normalize(result,"'+p.result+'");\n'+
    'Object expected = '+literal(expectedType,expected)+';\n'+
    'Support.emit(Support.json(expected).equals(Support.json(actual))'+pure+', actual, nanos, null);\n'+
    '} catch (Throwable ex) { Support.emit(false,null,0,ex.toString()); }\n}\n';
}
function outputOf(run) {
  const lines=run.stdout.split(/\r?\n/);
  return {
    results:lines.filter(line=>line.startsWith('@DSA@')).map(line=>JSON.parse(line.slice(5))),
    logs:[...lines.filter(line=>!line.startsWith('@DSA@')),run.stderr].join('\n').trim().slice(0,6000),
  };
}

const growthCases={
  'two-sum':n=>[Array.from({length:n},(_,i)=>i<n-2?0:i===n-2?2:3),5],
  'duplicates':n=>[Array.from({length:n},(_,i)=>i)],
  'range-sums':n=>[Array(n).fill(1),Array.from({length:n},()=>[0,n])],
  'subarray-k':n=>[Array(n).fill(0),0],
  'fixed-window':n=>[Array(n).fill(1),n/2],
  'binary-search':n=>[Array.from({length:n},(_,i)=>i),-1],
  'inversions':n=>[Array.from({length:n},(_,i)=>n-i)],
  'warmer-days':n=>[Array.from({length:n},(_,i)=>n-i)],
  'window-max':n=>[Array.from({length:n},(_,i)=>n-i),n/2],
  'lis':n=>[Array.from({length:n},(_,i)=>i)],
};
const failed=(run,fallback)=>run.failure||run.stderr.slice(0,6000)||fallback;
export function createJudge(runJava) {
  async function execute(p,code,submit) {
    if(p.bodyOnly)code='import java.util.*;\n\nclass Solution {\npublic '+p.signature+' {\n'+code+'\n}\n}\n';
    const cases=submit?p.cases:p.cases.slice(0,1);
    const names=cases.map((_,i)=>'case'+i);
    const runner='import java.util.*;\nclass Judge { public static void main(String[] args) {\n'+names.map(x=>x+'();').join('\n')+'\n}\n'+cases.map((row,i)=>fixture(p,row,names[i])).join('\n')+'\n}';
    const run=await runJava({files:[['Solution.java',code],['Support.java',support],['Judge.java',runner]],main:'Judge'});
    if(!run.ok)return {error:failed(run,'Java exited before grading all cases.')};
    const {results,logs}=outputOf(run);
    if(results.length!==cases.length)return {error:'Java exited before grading all cases.',logs};
    return {passed:results.every(x=>x.passed),results:results.map((x,i)=>({...x,input:cases[i][0],expected:cases[i][1]})),logs};
  }
  async function scratch(code,input) {
    const run=await runJava({files:[['Main.java',code]],main:'Main',input});
    return {output:run.stdout.slice(0,18000),error:run.ok?'':failed(run,'Java exited with an error.')};
  }
  async function benchmark(p,code) {
    const sizes=[128,512,2048];
    const inputs=growthCases[p.id];
    const classes=['Baseline','Reference',...(code?['Attempt']:[])];
    const files=[['Baseline.java',source(p,p.baseline).replace('class Solution','class Baseline')],
      ['Reference.java',source(p,p.body,p.helpers).replace('class Solution','class Reference')],
      ['Support.java',support]];
    if(code)files.push(['Solution.java',code]);
    const names=sizes.map(n=>'size'+n);
    const methods=sizes.map((n,index)=>{
      const input=inputs(n);
      const args=p.args.map(([type],i)=>type+' a'+i+'='+literal(type,input[i])+';').join('\n');
      const call=p.args.map((_,i)=>'a'+i).join(',');
      return 'static long '+names[index]+'(int kind) {\n'+args+'\nlong start=System.nanoTime();\n'+classes.map((cls,i)=>
        'if(kind=='+i+') sink = new '+(cls==='Attempt'?'Solution':cls)+'().'+p.method+'('+call+');').join('\n')+
        '\nreturn System.nanoTime()-start;\n}';
    });
    files.push(['Measure.java','class Measure { static volatile Object sink; public static void main(String[] args) {\n'+
      names.map(name=>'for(int kind=0;kind<'+classes.length+';kind++){for(int i=0;i<5;i++)'+name+'(kind);long[] samples=new long[9];for(int i=0;i<9;i++)samples[i]='+name+'(kind);java.util.Arrays.sort(samples);System.out.println("@DSA@"+samples[4]);}').join('\n')+'\n}\n'+methods.join('\n')+'\n}']);

    const run=await runJava({files,main:'Measure'});
    if(!run.ok)return {error:failed(run,'Benchmark stopped early.')};
    const {results}=outputOf(run);
    if(results.length!==sizes.length*classes.length)return {error:'Benchmark stopped early.'};
    return {classes,sizes,values:sizes.map((_,i)=>results.slice(i*classes.length,(i+1)*classes.length)),slow:p.slow,fast:p.time};
  }
  return {execute,scratch,benchmark};
}
