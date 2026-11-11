import {basicSetup} from 'codemirror';
import {indentWithTab} from '@codemirror/commands';
import {java} from '@codemirror/lang-java';
import {HighlightStyle, indentUnit, syntaxHighlighting} from '@codemirror/language';
import {EditorState, Prec} from '@codemirror/state';
import {EditorView, keymap} from '@codemirror/view';
import {tags} from '@lezer/highlight';

const theme = EditorView.theme({
  '&': {height:'100%', backgroundColor:'#162220', color:'#e0e9dc'},
  '.cm-scroller': {fontFamily:'var(--mono)', fontSize:'13px', lineHeight:'1.65'},
  '.cm-content': {caretColor:'#e0e9dc', padding:'10px 0'},
  '.cm-cursor': {borderLeftColor:'#e0e9dc'},
  '.cm-gutters': {backgroundColor:'#20302c', color:'#b0c3b6', borderColor:'#374d44'},
  '.cm-activeLine, .cm-activeLineGutter': {backgroundColor:'#29413a'},
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': {backgroundColor:'#46685d'},
  '.cm-panels, .cm-tooltip': {backgroundColor:'#253530', color:'#e0e9dc'},
  '.cm-textfield, .cm-button': {background:'#162220', color:'#e0e9dc', border:'1px solid #587366'},
}, {dark:true});
const javaColors = HighlightStyle.define([
  {tag:[tags.keyword,tags.modifier], color:'#b1ddc1'},
  {tag:[tags.string,tags.character], color:'#efc89a'},
  {tag:[tags.number,tags.bool,tags.null], color:'#d5c18a'},
  {tag:tags.comment, color:'#a0b7ab', fontStyle:'italic'},
  {tag:[tags.typeName,tags.className], color:'#a4cfe1'},
]);

export function mountJavaEditor(parent, {doc,state,onChange,onRun,onSubmit}) {
  const invoke = action => () => { action(); return true; };
  const commands = [{key:'Mod-Enter',run:invoke(onRun),preventDefault:true}, indentWithTab];
  if(onSubmit)commands.unshift({key:'Mod-Shift-Enter',run:invoke(onSubmit),preventDefault:true});
  return new EditorView({
    parent,
    state:state??EditorState.create({
      doc,
      extensions:[
        basicSetup,
        java(),
        theme,
        syntaxHighlighting(javaColors),
        indentUnit.of('    '),
        EditorState.tabSize.of(4),
        Prec.highest(keymap.of(commands)),
        EditorView.contentAttributes.of({
          'aria-label':'Java source code',
          'aria-describedby':'editor-key-hint',
        }),
        EditorView.updateListener.of(update=>{
          if(update.docChanged)onChange(update.state.doc.toString());
        }),
      ],
    }),
  });
}
