import{FX_CSS as C,attachGlow as A}from"./vs-fx.CLXiCjCI.js";const E=`<script setup lang="ts">
import { ref, computed } from 'vue';

// reactive counter
const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}
<\/script>

<template>
  <button class="counter" @click="increment">
    Count is {{ count }} ({{ doubled }})
  </button>
</template>`,j={ts:"js",tsx:"js",typescript:"js",js:"js",jsx:"js",javascript:"js",mjs:"js",cjs:"js",vue:"markup",html:"markup",xml:"markup",svg:"markup",markup:"markup",svelte:"markup",css:"css",scss:"css",less:"css",sass:"css",json:"json",json5:"json",jsonc:"json",bash:"shell",sh:"shell",shell:"shell",zsh:"shell",py:"python",python:"python",plain:"plain",text:"plain",txt:"plain"},h=t=>new Set(t.split(/\s+/).filter(Boolean)),g=h(`const let var function return new class extends super import export from default
  async await try catch finally throw typeof instanceof void delete as interface type enum implements
  public private protected readonly static get set namespace declare abstract is keyof satisfies infer module`),_=h("if else for while do switch case break continue return await yield throw try catch finally in of"),y=h("true false null undefined NaN Infinity this super"),N=h("def class import from return lambda pass global nonlocal yield assert del raise with as print"),S=h("if elif else for while try except finally and or not in is break continue"),T=h("True False None self cls __name__"),M=h(`if then fi else elif for do done while case esac function in select until return export
  local readonly source set unset alias`),L=h("true false"),f=t=>/[\w$]/.test(t);function p(t,i){const o=[],e=t.length;let c=0;const n=()=>{for(let l=o.length-1;l>=0;l--)if(o[l].t!=="ws")return o[l];return null};for(;c<e;){const l=t[c];if(/\s/.test(l)){let s=c;for(;s<e&&/\s/.test(t[s]);)s++;o.push({t:"ws",v:t.slice(c,s)}),c=s;continue}if(i.block&&l==="/"&&t[c+1]==="*"){const s=t.indexOf("*/",c+2),r=s===-1?e:s+2;o.push({t:"comment",v:t.slice(c,r)}),c=r;continue}if(i.line&&t.startsWith(i.line,c)){let s=c;for(;s<e&&t[s]!==`
`;)s++;o.push({t:"comment",v:t.slice(c,s)}),c=s;continue}if(i.triple&&(t.startsWith('"""',c)||t.startsWith("'''",c))){const s=t.substr(c,3),r=t.indexOf(s,c+3),a=r===-1?e:r+3;o.push({t:"string",v:t.slice(c,a)}),c=a;continue}if(i.template&&l==="`"){let s=c+1;for(;s<e&&t[s]!=="`";)t[s]==="\\"&&s++,s++;o.push({t:"string",v:t.slice(c,Math.min(s+1,e))}),c=Math.min(s+1,e);continue}if(l==='"'||l==="'"){let s=c+1;for(;s<e&&t[s]!==l&&t[s]!==`
`;)t[s]==="\\"&&s++,s++;const r=Math.min(s+1,e),a={t:"string",v:t.slice(c,r)};if(c=r,i.jsonKeys){let d=c;for(;d<e&&/\s/.test(t[d]);)d++;t[d]===":"&&(a.t="property")}o.push(a);continue}if(i.dollar&&l==="$"){let s=c+1;if(t[s]==="{"){const r=t.indexOf("}",s);s=r===-1?e:r+1}else for(;s<e&&f(t[s]);)s++;o.push({t:"variable",v:t.slice(c,s)}),c=s;continue}if(i.decorators&&l==="@"&&/[A-Za-z_]/.test(t[c+1]||"")){let s=c+1;for(;s<e&&f(t[s]);)s++;o.push({t:"decorator",v:t.slice(c,s)}),c=s;continue}if(/[0-9]/.test(l)||l==="."&&/[0-9]/.test(t[c+1]||"")){let s=c;if(l==="0"&&/[xXbBoO]/.test(t[c+1]||""))for(s=c+2;s<e&&/[0-9a-fA-F_]/.test(t[s]);)s++;else for(;s<e&&(/[0-9_.eE]/.test(t[s])||/[+-]/.test(t[s])&&/[eE]/.test(t[s-1]));)s++;o.push({t:"number",v:t.slice(c,s)}),c=s;continue}if(/[A-Za-z_$]/.test(l)){let s=c;for(;s<e&&f(t[s]);)s++;const r=t.slice(c,s);let a="variable";if(i.ctrl.has(r))a="control";else if(i.kw.has(r))a="keyword";else if(i.cst.has(r))a="const";else{let d=s;for(;d<e&&/\s/.test(t[d]);)d++;t[d]==="("?a="function":n()?.v==="."?a="property":/^[A-Z]/.test(r)&&(a="type")}o.push({t:a,v:r}),c=s;continue}if("+-*/%=<>!&|^~?:".includes(l)){let s=c;for(;s<e&&"+-*/%=<>!&|^~?:".includes(t[s]);)s++;o.push({t:"operator",v:t.slice(c,s)}),c=s;continue}o.push({t:"punct",v:l}),c++}return o}function H(t){const i=[],o=t.length;let e=0,c=!1,n="",l=!1;for(;e<o;)if(c){const s=t[e];if(/\s/.test(s)){let r=e;for(;r<o&&/\s/.test(t[r]);)r++;i.push({t:"ws",v:t.slice(e,r)}),e=r;continue}if(s==="/"&&t[e+1]===">"){i.push({t:"punct",v:"/>"}),e+=2,c=!1;continue}if(s===">"){if(i.push({t:"punct",v:">"}),e++,c=!1,!l&&(n==="script"||n==="style")){const r=n==="script"?"<\/script":"</style";let a=t.toLowerCase().indexOf(r,e);a===-1&&(a=o);const d=t.slice(e,a);if(d){const x=n==="script"?p(d,{line:"//",block:!0,template:!0,decorators:!0,kw:g,ctrl:_,cst:y}):w(d);for(const k of x)i.push(k)}e=a}continue}if(s==='"'||s==="'"){let r=e+1;for(;r<o&&t[r]!==s;)r++;i.push({t:"string",v:t.slice(e,Math.min(r+1,o))}),e=Math.min(r+1,o);continue}if(s==="="){i.push({t:"operator",v:"="}),e++;continue}if(/[\w@:.\-]/.test(s)){let r=e;for(;r<o&&/[\w@:.\-]/.test(t[r]);)r++;const a=t.slice(e,r),d=/^(v-|:|@|#)/.test(a);i.push({t:d?"attr-dir":"attr",v:a}),e=r;continue}i.push({t:"punct",v:s}),e++}else{if(t.startsWith("<!--",e)){const r=t.indexOf("-->",e),a=r===-1?o:r+3;i.push({t:"comment",v:t.slice(e,a)}),e=a;continue}if(t[e]==="<"){let r=e+1;l=t[r]==="/",l&&r++;let a=r;for(;a<o&&/[\w:.-]/.test(t[a]);)a++;if(a>r){i.push({t:"punct",v:t.slice(e,r)}),i.push({t:"tag",v:t.slice(r,a)}),n=t.slice(r,a).toLowerCase(),e=a,c=!0;continue}i.push({t:"punct",v:"<"}),e++;continue}let s=e;for(;s<o&&t[s]!=="<";)s++;i.push({t:"text",v:t.slice(e,s)}),e=s;continue}return i}function w(t){const i=[],o=t.length;let e=0;for(;e<o;){const c=t[e];if(/\s/.test(c)){let n=e;for(;n<o&&/\s/.test(t[n]);)n++;i.push({t:"ws",v:t.slice(e,n)}),e=n;continue}if(c==="/"&&t[e+1]==="*"){const n=t.indexOf("*/",e+2),l=n===-1?o:n+2;i.push({t:"comment",v:t.slice(e,l)}),e=l;continue}if(c==='"'||c==="'"){let n=e+1;for(;n<o&&t[n]!==c;)t[n]==="\\"&&n++,n++;i.push({t:"string",v:t.slice(e,Math.min(n+1,o))}),e=Math.min(n+1,o);continue}if(c==="@"){let n=e+1;for(;n<o&&/[\w-]/.test(t[n]);)n++;i.push({t:"keyword",v:t.slice(e,n)}),e=n;continue}if(c==="#"&&/[0-9a-fA-F]/.test(t[e+1]||"")){let n=e+1;for(;n<o&&/[0-9a-fA-F]/.test(t[n]);)n++;i.push({t:"number",v:t.slice(e,n)}),e=n;continue}if(c==="$"||c==="-"&&t[e+1]==="-"){let n=e;for(;n<o&&/[\w-]/.test(t[n]);)n++;i.push({t:"variable",v:t.slice(e,n)}),e=n;continue}if(/[0-9]/.test(c)||c==="."&&/[0-9]/.test(t[e+1]||"")){let n=e;for(;n<o&&/[0-9.]/.test(t[n]);)n++;for(;n<o&&/[a-z%]/i.test(t[n]);)n++;i.push({t:"number",v:t.slice(e,n)}),e=n;continue}if(/[.#&]/.test(c)||/[A-Za-z_-]/.test(c)){let n=e;for(/[.#&]/.test(c)&&n++;n<o&&/[\w-]/.test(t[n]);)n++;const l=t.slice(e,n);let s="plain";if(/^[.#&]/.test(l))s="type";else{let r=n;for(;r<o&&/\s/.test(t[r]);)r++;t[r]==="("?s="function":t[r]===":"&&(s="property")}i.push({t:s,v:l}),e=n;continue}i.push({t:"punct",v:c}),e++}return i}function $(t,i){switch(i){case"js":return p(t,{line:"//",block:!0,template:!0,decorators:!0,kw:g,ctrl:_,cst:y});case"python":return p(t,{line:"#",triple:!0,decorators:!0,kw:N,ctrl:S,cst:T});case"shell":return p(t,{line:"#",dollar:!0,kw:M,ctrl:h(""),cst:L});case"json":return p(t,{jsonKeys:!0,kw:h(""),ctrl:h(""),cst:h("true false null")});case"markup":return H(t);case"css":return w(t);default:return[{t:"plain",v:t}]}}function O(t){const i=[[]];for(const o of t)o.v.split(`
`).forEach((c,n)=>{n>0&&i.push([]),c&&i[i.length-1].push({t:o.t,v:c})});return i}function V(t){const i=new Set;for(const o of(t||"").split(",")){const e=o.trim().match(/^(\d+)(?:-(\d+))?$/);if(!e)continue;const c=+e[1],n=e[2]?+e[2]:c;for(let l=c;l<=n;l++)i.add(l)}return i}const b="http://www.w3.org/2000/svg";function v(t){const i=document.createElementNS(b,"svg");i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("fill","none"),i.setAttribute("aria-hidden","true");for(const o of t){const e=document.createElementNS(b,"path");e.setAttribute("d",o),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),i.appendChild(e)}return i}const z=["M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z","M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"],F=["M22 11.1V6.9C22 3.4 20.6 2 17.1 2H12.9C9.4 2 8 3.4 8 6.9V8H11.1C14.6 8 16 9.4 16 12.9V16H17.1C20.6 16 22 14.6 22 11.1Z","M16 17.1V12.9C16 9.4 14.6 8 11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1Z","M6.08008 15.0008L8.03008 16.9508L11.9201 13.0508"],P=`
:host { display: block; width: 100%; }
.vsc {
  --r: 12px;
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--ed-border);
  border-radius: var(--r);
  background: var(--ed-bg);
  color: var(--ed-fg);
  overflow: hidden;
  font-family: var(--font-mono, 'Geist Mono Variable', ui-monospace, 'SF Mono', monospace);
  box-shadow: var(--ed-shadow);
  transition: border-color 200ms var(--ease-out, ease), box-shadow 200ms var(--ease-out, ease);
}

/* ── editor color schemes (VSCode Dark+ / Light+) ───────────────── */
.vsc--dark {
  --ed-bg: #000000;
  --ed-bar: #000000;
  --ed-border: #1f1f1f;
  --ed-fg: #d4d4d4;
  --ed-gutter: #5a6169;
  --ed-bar-fg: #cccccc;
  --ed-hl: rgba(255, 255, 255, 0.06);
  --ed-hl-bar: var(--vs-color, #569cd6);
  --ed-btn: #9da5b4;
  --ed-btn-hover: #ffffff;
  --ed-btn-bg: rgba(255, 255, 255, 0.08);
  --ed-shadow: 0 18px 50px rgba(0, 0, 0, 0.6), 0 4px 14px rgba(0, 0, 0, 0.4);
  --ed-sep: rgba(255, 255, 255, 0.08);
  --c-comment: #6a9955;
  --c-string: #ce9178;
  --c-keyword: #569cd6;
  --c-control: #c586c0;
  --c-number: #b5cea8;
  --c-function: #dcdcaa;
  --c-property: #9cdcfe;
  --c-variable: #9cdcfe;
  --c-type: #4ec9b0;
  --c-tag: #569cd6;
  --c-attr: #9cdcfe;
  --c-attr-dir: #c586c0;
  --c-operator: #d4d4d4;
  --c-punct: #d4d4d4;
  --c-const: #569cd6;
  --c-decorator: #dcdcaa;
  --c-text: #d4d4d4;
}
.vsc--light {
  --ed-bg: #ffffff;
  --ed-bar: #f3f3f3;
  --ed-border: #e2e2e2;
  --ed-fg: #383a42;
  --ed-gutter: #aab1bf;
  --ed-bar-fg: #424242;
  --ed-hl: rgba(0, 80, 200, 0.06);
  --ed-hl-bar: var(--vs-color, #0066cc);
  --ed-btn: #6a737d;
  --ed-btn-hover: #1a1a1a;
  --ed-btn-bg: rgba(0, 0, 0, 0.06);
  --ed-shadow: 0 18px 50px rgba(0, 0, 0, 0.12), 0 4px 14px rgba(0, 0, 0, 0.08);
  --ed-sep: rgba(0, 0, 0, 0.08);
  --c-comment: #008000;
  --c-string: #a31515;
  --c-keyword: #0000ff;
  --c-control: #af00db;
  --c-number: #098658;
  --c-function: #795e26;
  --c-property: #001080;
  --c-variable: #001080;
  --c-type: #267f99;
  --c-tag: #800000;
  --c-attr: #e50000;
  --c-attr-dir: #af00db;
  --c-operator: #383a42;
  --c-punct: #383a42;
  --c-const: #0000ff;
  --c-decorator: #795e26;
  --c-text: #383a42;
}

/* radii */
.vsc--r-subtle { --r: 8px; }
.vsc--r-rounded { --r: 12px; }
@supports (corner-shape: squircle) {
  .vsc--r-squircle { --r: 18px; corner-shape: squircle; }
}

/* ── proximity glow on the window border ────────────────────────── */
.vsc__glow {
  --glow-strength: 0.5;
  --glow-ring: 1px;
  --glow-inset: -1px;
  border-radius: var(--r);
  z-index: 4;
}
@supports (corner-shape: squircle) {
  .vsc--r-squircle .vsc__glow { corner-shape: squircle; }
}

/* ── title bar ──────────────────────────────────────────────────── */
.vsc__bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 38px;
  padding: 0 12px;
  background: var(--ed-bar);
  border-bottom: 1px solid var(--ed-sep);
  flex: none;
}
.vsc__bar[hidden] { display: none; }
.vsc__traffic {
  display: inline-flex;
  gap: 8px;
  flex: none;
}
.vsc__traffic[hidden] { display: none; }
.vsc__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.2);
}
.vsc__dot--r { background: #ff5f57; }
.vsc__dot--y { background: #febc2e; }
.vsc__dot--g { background: #28c840; }

.vsc__file {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin: 0 auto;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--ed-bar-fg);
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60%;
}
/* tiny file-type dot, colored by extension */
.vsc__ext {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  flex: none;
  background: #8a8a8a;
}
.vsc__ext[data-ext='vue'] { background: #42b883; }
.vsc__ext[data-ext='ts'], .vsc__ext[data-ext='tsx'] { background: #3178c6; }
.vsc__ext[data-ext='js'], .vsc__ext[data-ext='jsx'], .vsc__ext[data-ext='mjs'] { background: #f7df1e; }
.vsc__ext[data-ext='css'], .vsc__ext[data-ext='scss'] { background: #2965f1; }
.vsc__ext[data-ext='html'] { background: #e34f26; }
.vsc__ext[data-ext='json'] { background: #cbcb41; }
.vsc__ext[data-ext='py'], .vsc__ext[data-ext='python'] { background: #3776ab; }
.vsc__ext[data-ext='sh'], .vsc__ext[data-ext='bash'] { background: #4eaa25; }
.vsc__ext[data-ext='md'] { background: #519aba; }

/* ── copy button ────────────────────────────────────────────────── */
.vsc__copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex: none;
  padding: 0;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: var(--ed-btn);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, transform 160ms var(--ease-spring, ease);
}
.vsc__copy[hidden] { display: none; }
.vsc__copy svg { width: 16px; height: 16px; }
.vsc__copy:hover { background: var(--ed-btn-bg); color: var(--ed-btn-hover); }
.vsc__copy:active { transform: scale(0.9); }
.vsc__copy.is-copied { color: #2ecc71; }
.vsc__copy:focus-visible { outline: 2px solid var(--ed-hl-bar); outline-offset: 1px; }
/* icon swap — check hidden until copied */
.vsc__copy .vsc__ico-check { display: none; }
.vsc__copy.is-copied .vsc__ico-copy { display: none; }
.vsc__copy.is-copied .vsc__ico-check { display: block; }
.vsc__copy--float {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
  background: var(--ed-btn-bg);
  backdrop-filter: blur(6px);
  opacity: 0;
  transition: opacity 180ms ease, background-color 160ms ease, color 160ms ease;
}
.vsc:hover .vsc__copy--float { opacity: 1; }
.vsc__copy--float.is-copied { opacity: 1; }

/* ── body ───────────────────────────────────────────────────────── */
.vsc__body {
  position: relative;
  z-index: 1;
  min-height: 0;
  overflow-y: auto;
}
/* horizontal scroll for long lines lives here, native bar hidden */
.vsc__hscroll {
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.vsc__hscroll::-webkit-scrollbar { width: 0; height: 0; display: none; }
.vsc--wrap .vsc__hscroll { overflow-x: hidden; }

.vsc__pre { margin: 0; }
.vsc__code {
  display: block;
  padding: 14px 0;
  font-family: var(--font-mono, 'Geist Mono Variable', ui-monospace, 'SF Mono', monospace);
  font-size: 13px;
  line-height: 1.65;
  tab-size: 2;
}

.vsc__line {
  display: flex;
  min-height: 1.65em;
}
.vsc__line.is-hl {
  background: var(--ed-hl);
  box-shadow: inset 2px 0 0 var(--ed-hl-bar);
}
.vsc__ln {
  flex: none;
  width: 3.2em;
  padding-right: 1em;
  text-align: right;
  color: var(--ed-gutter);
  user-select: none;
  -webkit-user-select: none;
  font-variant-numeric: tabular-nums;
}
.vsc__lc {
  flex: 1;
  padding-right: 18px;
  white-space: pre;
}
.vsc--wrap .vsc__lc { white-space: pre-wrap; word-break: break-word; }
.vsc:not(.vsc--wrap) .vsc__line { width: max-content; min-width: 100%; }

/* ── syntax token colors ────────────────────────────────────────── */
.t-comment { color: var(--c-comment); font-style: italic; }
.t-string { color: var(--c-string); }
.t-keyword { color: var(--c-keyword); }
.t-control { color: var(--c-control); }
.t-number { color: var(--c-number); }
.t-function { color: var(--c-function); }
.t-property { color: var(--c-property); }
.t-variable { color: var(--c-variable); }
.t-type { color: var(--c-type); }
.t-tag { color: var(--c-tag); }
.t-attr { color: var(--c-attr); }
.t-attr-dir { color: var(--c-attr-dir); }
.t-operator { color: var(--c-operator); }
.t-punct { color: var(--c-punct); }
.t-const { color: var(--c-const); }
.t-decorator { color: var(--c-decorator); }
.t-text, .t-plain { color: var(--c-text); }
.t-ws { white-space: pre; }

@media (prefers-reduced-motion: reduce) {
  .vsc, .vsc__copy { transition: none; }
}
`;let u;function B(t){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=t;const i=u.fillStyle;if(i.charAt(0)==="#")return[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)];const o=i.match(/[\d.]+/g);return o&&o.length>=3?[+o[0],+o[1],+o[2]]:null}const I=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(t,i){const o=i?B(String(i).trim()):null;if(!o){for(const a of I)t.style.removeProperty(a);return}const e=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),n=.2126*e(o[0])+.7152*e(o[1])+.0722*e(o[2])>.45,l=`rgb(${o[0]} ${o[1]} ${o[2]})`,s=o.map(a=>Math.round(n?a*.92:a+(255-a)*.16)),r=(a,d)=>t.style.setProperty(a,d);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(a,l);r("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(a,o.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(a,n?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])r(a,n?"0 0 0":"255 255 255");r("--vs-color",l),r("--vs-color-rgb",o.join(" ")),r("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class W extends HTMLElement{static observedAttributes=["code","language","filename","theme","titlebar","traffic","line-numbers","copyable","wrap","highlight-lines","max-height","radius","glow","smooth-scroll","color"];#t;#o;#c;#s;#l;#n;#h;#u;#p;#i;#r;#f=[];#_;#b;#v;#e=0;#m="dark";#a=null;constructor(){super();const i=this.attachShadow({mode:"open"}),o=document.createElement("style");o.textContent=C+P,this.#t=document.createElement("div"),this.#t.className="vsc",this.#o=document.createElement("span"),this.#o.className="fx-glow vsc__glow",this.#o.setAttribute("aria-hidden","true"),this.#c=document.createElement("div"),this.#c.className="vsc__bar",this.#s=document.createElement("span"),this.#s.className="vsc__traffic",this.#s.setAttribute("aria-hidden","true");for(const n of["vsc__dot--r","vsc__dot--y","vsc__dot--g"]){const l=document.createElement("i");l.className=`vsc__dot ${n}`,this.#s.appendChild(l)}this.#l=document.createElement("span"),this.#l.className="vsc__file",this.#n=document.createElement("span"),this.#n.className="vsc__ext",this.#n.setAttribute("aria-hidden","true"),this.#h=document.createTextNode(""),this.#l.append(this.#n,this.#h),this.#u=this.#x(!1),this.#c.append(this.#s,this.#l,this.#u),this.#p=this.#x(!0),this.#i=document.createElement("div"),this.#i.className="vsc__body";const e=document.createElement("div");e.className="vsc__hscroll";const c=document.createElement("pre");c.className="vsc__pre",this.#r=document.createElement("code"),this.#r.className="vsc__code",c.appendChild(this.#r),e.appendChild(c),this.#i.appendChild(e),this.#t.append(this.#o,this.#c,this.#p,this.#i),i.append(o,this.#t)}connectedCallback(){m(this,this.getAttribute("color")),this.#y(),this.#b=new MutationObserver(()=>this.#y()),typeof document<"u"&&this.#b.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),this.#v=new MutationObserver(()=>this.#d()),this.#v.observe(this,{childList:!0,characterData:!0,subtree:!0}),this.#_=A(this.#t,260,()=>this.hasAttribute("glow")===!1),this.#g(),this.#d()}disconnectedCallback(){this.#_?.(),this.#b?.disconnect(),this.#v?.disconnect(),this.#e&&(clearTimeout(this.#e),this.#e=0)}attributeChangedCallback(i){m(this,this.getAttribute("color")),this.#t&&(this.#g(),["code","language","line-numbers","highlight-lines","wrap"].includes(i)&&this.#d())}get code(){return this.#a??this.getAttribute("code")??""}set code(i){this.#a=i==null?null:String(i),this.#d()}get language(){return this.getAttribute("language")??"vue"}set language(i){this.setAttribute("language",i)}get filename(){return this.getAttribute("filename")??"App.vue"}set filename(i){this.setAttribute("filename",i)}#C(i,o){if(!this.hasAttribute(i))return o;const e=this.getAttribute(i);return e!=="false"&&e!=="0"}#y(){if(typeof document>"u")return;const i=document.documentElement.getAttribute("data-theme")==="light"?"light":"dark";i!==this.#m&&(this.#m=i,this.#t&&this.#g())}#A(){const i=this.getAttribute("theme")||"auto";return i==="auto"?this.#m:i}#w(){if(this.#a&&this.#a.length)return this.#a;const i=this.getAttribute("code");if(i&&i.length)return i;const o=this.textContent;return o&&o.trim().length?o.replace(/^\n/,""):E}#E(){return j[(this.getAttribute("language")||"").toLowerCase()]??"plain"}#j(){const i=(this.getAttribute("filename")||"").match(/\.(\w+)$/);return i?i[1].toLowerCase():(this.getAttribute("language")||"").toLowerCase()}#x(i){const o=document.createElement("button");o.type="button",o.className=i?"vsc__copy vsc__copy--float":"vsc__copy";const e=v(z);e.classList.add("vsc__ico-copy");const c=v(F);return c.classList.add("vsc__ico-check"),o.append(e,c),o.setAttribute("aria-label","Copy code"),o.addEventListener("click",()=>this.#N()),this.#f.push(o),o}#g(){const i=this.hasAttribute("titlebar"),o=this.hasAttribute("traffic"),e=this.hasAttribute("copyable"),c=this.#C("wrap",!1),n=this.hasAttribute("glow");this.#t.className=`vsc vsc--${this.#A()} vsc--r-${this.getAttribute("radius")||"rounded"}${c?" vsc--wrap":""}`,this.#o.hidden=!n,this.#c.style.display=i?"":"none",this.#s.style.display=o?"":"none",this.#u.hidden=!e,this.#p.hidden=!(e&&!i);const l=this.getAttribute("filename")??"App.vue";this.#h.nodeValue=" "+l,this.#n.setAttribute("data-ext",this.#j());const s=parseInt(this.getAttribute("max-height")||"0",10);this.#i.style.maxHeight=s>0?`${s}px`:"",this.#i.style.scrollBehavior=this.hasAttribute("smooth-scroll")?"smooth":"auto"}#d(){if(!this.#r)return;const i=O($(this.#w(),this.#E())),o=this.hasAttribute("line-numbers"),e=V(this.getAttribute("highlight-lines")||""),c=document.createDocumentFragment();i.forEach((n,l)=>{const s=document.createElement("span");if(s.className=e.has(l+1)?"vsc__line is-hl":"vsc__line",o){const a=document.createElement("span");a.className="vsc__ln",a.setAttribute("aria-hidden","true"),a.textContent=String(l+1),s.appendChild(a)}const r=document.createElement("span");r.className="vsc__lc";for(const a of n){const d=document.createElement("span");d.className=`t-${a.t}`,d.textContent=a.v,r.appendChild(d)}r.appendChild(document.createTextNode(`
`)),s.appendChild(r),c.appendChild(s)}),this.#r.replaceChildren(c)}#k(i){const o=document.createElement("textarea");o.value=i,o.style.position="fixed",o.style.opacity="0",document.body.appendChild(o),o.select();try{document.execCommand("copy")}finally{o.remove()}}async#N(){const i=this.#w();try{navigator.clipboard?.writeText?await navigator.clipboard.writeText(i):this.#k(i)}catch{this.#k(i)}this.dispatchEvent(new CustomEvent("copy",{bubbles:!0,composed:!0,detail:{code:i}}));for(const o of this.#f)o.classList.add("is-copied"),o.setAttribute("aria-label","Copied");this.#e&&clearTimeout(this.#e),this.#e=setTimeout(()=>{for(const o of this.#f)o.classList.remove("is-copied"),o.setAttribute("aria-label","Copy code");this.#e=0},1400)}}customElements.define("vs-code",W);
