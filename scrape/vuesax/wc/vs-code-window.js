const C=`<script setup lang="ts">
import { ref } from 'vue';
const open = ref(false);
<\/script>

<template>
  <button @click="open = !open">
    {{ open ? 'Close' : 'Open' }}
  </button>
</template>`,A={ts:"js",tsx:"js",typescript:"js",js:"js",jsx:"js",javascript:"js",vue:"markup",html:"markup",xml:"markup",svg:"markup",markup:"markup",css:"css",scss:"css",less:"css",sass:"css",json:"json",json5:"json",jsonc:"json",bash:"shell",sh:"shell",shell:"shell",zsh:"shell",py:"python",python:"python",plain:"plain",text:"plain",txt:"plain"},u=t=>new Set(t.split(/\s+/).filter(Boolean)),m=u("const let var function return new class import export from default async await try catch type interface extends"),v=u("if else for while do switch case break continue return await yield throw in of"),y=u("true false null undefined NaN this super"),j=u("def class import from return lambda pass yield with as print global"),S=u("if elif else for while try except finally and or not in is break continue"),E=u("True False None self cls"),T=u("if then fi else elif for do done while case esac function in export local npm npx node yarn git cd"),N=u("true false"),b=t=>/[\w$]/.test(t);function f(t,o){const i=[],n=t.length;let r=0;const c=()=>{for(let l=i.length-1;l>=0;l--)if(i[l].t!=="ws")return i[l];return null};for(;r<n;){const l=t[r];if(/\s/.test(l)){let e=r;for(;e<n&&/\s/.test(t[e]);)e++;i.push({t:"ws",v:t.slice(r,e)}),r=e;continue}if(o.block&&l==="/"&&t[r+1]==="*"){const e=t.indexOf("*/",r+2),s=e===-1?n:e+2;i.push({t:"comment",v:t.slice(r,s)}),r=s;continue}if(o.line&&t.startsWith(o.line,r)){let e=r;for(;e<n&&t[e]!==`
`;)e++;i.push({t:"comment",v:t.slice(r,e)}),r=e;continue}if(o.triple&&(t.startsWith('"""',r)||t.startsWith("'''",r))){const e=t.substr(r,3),s=t.indexOf(e,r+3),a=s===-1?n:s+3;i.push({t:"string",v:t.slice(r,a)}),r=a;continue}if(o.template&&l==="`"){let e=r+1;for(;e<n&&t[e]!=="`";)t[e]==="\\"&&e++,e++;i.push({t:"string",v:t.slice(r,Math.min(e+1,n))}),r=Math.min(e+1,n);continue}if(l==='"'||l==="'"){let e=r+1;for(;e<n&&t[e]!==l&&t[e]!==`
`;)t[e]==="\\"&&e++,e++;const s=Math.min(e+1,n),a={t:"string",v:t.slice(r,s)};if(r=s,o.jsonKeys){let p=r;for(;p<n&&/\s/.test(t[p]);)p++;t[p]===":"&&(a.t="property")}i.push(a);continue}if(o.dollar&&l==="$"){let e=r+1;if(t[e]==="{"){const s=t.indexOf("}",e);e=s===-1?n:s+1}else for(;e<n&&b(t[e]);)e++;i.push({t:"variable",v:t.slice(r,e)}),r=e;continue}if(o.decorators&&l==="@"&&/[A-Za-z_]/.test(t[r+1]||"")){let e=r+1;for(;e<n&&b(t[e]);)e++;i.push({t:"decorator",v:t.slice(r,e)}),r=e;continue}if(/[0-9]/.test(l)||l==="."&&/[0-9]/.test(t[r+1]||"")){let e=r;if(l==="0"&&/[xXbBoO]/.test(t[r+1]||""))for(e=r+2;e<n&&/[0-9a-fA-F_]/.test(t[e]);)e++;else for(;e<n&&/[0-9_.eE]/.test(t[e]);)e++;i.push({t:"number",v:t.slice(r,e)}),r=e;continue}if(/[A-Za-z_$]/.test(l)){let e=r;for(;e<n&&b(t[e]);)e++;const s=t.slice(r,e);let a="variable";if(o.ctrl.has(s))a="control";else if(o.kw.has(s))a="keyword";else if(o.cst.has(s))a="const";else{let p=e;for(;p<n&&/\s/.test(t[p]);)p++;t[p]==="("?a="function":c()?.v==="."?a="property":/^[A-Z]/.test(s)&&(a="type")}i.push({t:a,v:s}),r=e;continue}if("+-*/%=<>!&|^~?:".includes(l)){let e=r;for(;e<n&&"+-*/%=<>!&|^~?:".includes(t[e]);)e++;i.push({t:"operator",v:t.slice(r,e)}),r=e;continue}i.push({t:"punct",v:l}),r++}return i}function O(t){const o=[],i=t.length;let n=0,r=!1,c="",l=!1;for(;n<i;)if(r){const e=t[n];if(/\s/.test(e)){let s=n;for(;s<i&&/\s/.test(t[s]);)s++;o.push({t:"ws",v:t.slice(n,s)}),n=s;continue}if(e==="/"&&t[n+1]===">"){o.push({t:"punct",v:"/>"}),n+=2,r=!1;continue}if(e===">"){if(o.push({t:"punct",v:">"}),n++,r=!1,!l&&(c==="script"||c==="style")){const s=c==="script"?"<\/script":"</style";let a=t.toLowerCase().indexOf(s,n);a===-1&&(a=i);const p=t.slice(n,a);if(p){const x=c==="script"?f(p,{line:"//",block:!0,template:!0,decorators:!0,kw:m,ctrl:v,cst:y}):_(p);for(const k of x)o.push(k)}n=a}continue}if(e==='"'||e==="'"){let s=n+1;for(;s<i&&t[s]!==e;)s++;o.push({t:"string",v:t.slice(n,Math.min(s+1,i))}),n=Math.min(s+1,i);continue}if(e==="="){o.push({t:"operator",v:"="}),n++;continue}if(/[\w@:.\-]/.test(e)){let s=n;for(;s<i&&/[\w@:.\-]/.test(t[s]);)s++;const a=t.slice(n,s),p=/^(v-|:|@|#)/.test(a);o.push({t:p?"attr-dir":"attr",v:a}),n=s;continue}o.push({t:"punct",v:e}),n++}else{if(t.startsWith("<!--",n)){const s=t.indexOf("-->",n),a=s===-1?i:s+3;o.push({t:"comment",v:t.slice(n,a)}),n=a;continue}if(t[n]==="<"){let s=n+1;l=t[s]==="/",l&&s++;let a=s;for(;a<i&&/[\w:.-]/.test(t[a]);)a++;if(a>s){o.push({t:"punct",v:t.slice(n,s)}),o.push({t:"tag",v:t.slice(s,a)}),c=t.slice(s,a).toLowerCase(),n=a,r=!0;continue}o.push({t:"punct",v:"<"}),n++;continue}let e=n;for(;e<i&&t[e]!=="<";)e++;o.push({t:"text",v:t.slice(n,e)}),n=e;continue}return o}function _(t){const o=[],i=t.length;let n=0;for(;n<i;){const r=t[n];if(/\s/.test(r)){let c=n;for(;c<i&&/\s/.test(t[c]);)c++;o.push({t:"ws",v:t.slice(n,c)}),n=c;continue}if(r==="/"&&t[n+1]==="*"){const c=t.indexOf("*/",n+2),l=c===-1?i:c+2;o.push({t:"comment",v:t.slice(n,l)}),n=l;continue}if(r==='"'||r==="'"){let c=n+1;for(;c<i&&t[c]!==r;)t[c]==="\\"&&c++,c++;o.push({t:"string",v:t.slice(n,Math.min(c+1,i))}),n=Math.min(c+1,i);continue}if(r==="@"){let c=n+1;for(;c<i&&/[\w-]/.test(t[c]);)c++;o.push({t:"keyword",v:t.slice(n,c)}),n=c;continue}if(/[0-9]/.test(r)||r==="."&&/[0-9]/.test(t[n+1]||"")){let c=n;for(;c<i&&/[0-9.]/.test(t[c]);)c++;for(;c<i&&/[a-z%]/i.test(t[c]);)c++;o.push({t:"number",v:t.slice(n,c)}),n=c;continue}if(/[.#&]/.test(r)||/[A-Za-z_-]/.test(r)){let c=n;for(/[.#&]/.test(r)&&c++;c<i&&/[\w-]/.test(t[c]);)c++;const l=t.slice(n,c);let e="plain";if(/^[.#&]/.test(l))e="type";else{let s=c;for(;s<i&&/\s/.test(t[s]);)s++;t[s]==="("?e="function":t[s]===":"&&(e="property")}o.push({t:e,v:l}),n=c;continue}o.push({t:"punct",v:r}),n++}return o}function L(t,o){switch(o){case"js":return f(t,{line:"//",block:!0,template:!0,decorators:!0,kw:m,ctrl:v,cst:y});case"python":return f(t,{line:"#",triple:!0,decorators:!0,kw:j,ctrl:S,cst:E});case"shell":return f(t,{line:"#",dollar:!0,kw:T,ctrl:u(""),cst:N});case"json":return f(t,{jsonKeys:!0,kw:u(""),ctrl:u(""),cst:u("true false null")});case"markup":return O(t);case"css":return _(t);default:return[{t:"plain",v:t}]}}function $(t){const o=[[]];for(const i of t)i.v.split(`
`).forEach((r,c)=>{c>0&&o.push([]),r&&o[o.length-1].push({t:i.t,v:r})});return o}function z(t){const o=new Set;for(const i of(t||"").split(",")){const n=i.trim().match(/^(\d+)(?:-(\d+))?$/);if(!n)continue;const r=+n[1],c=n[2]?+n[2]:r;for(let l=r;l<=c;l++)o.add(l)}return o}const M=`
  :host { display: block; width: 100%; perspective: 1400px; }
  .wcx {
    --r: var(--ctrl-r-rounded, 12px);
    position: relative; display: flex; flex-direction: column; width: 100%;
    border: 1px solid var(--border, #2a2a2a);
    border-radius: var(--r);
    background: var(--bg-elevated, #0e0e0e);
    color: var(--text, #ededed);
    overflow: hidden;
    font-family: var(--font-mono, ui-monospace, monospace);
    transform-style: preserve-3d;
    box-shadow:
      0 2px 6px rgba(0, 0, 0, 0.35),
      0 14px 32px rgba(0, 0, 0, 0.45),
      0 40px 80px rgba(0, 0, 0, 0.35);
    transition: transform 340ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 340ms ease;

    --c-comment: #6a9955;
    --c-string: #ce9178;
    --c-keyword: #4ec9b0;
    --c-control: #c586c0;
    --c-number: #b5cea8;
    --c-function: #dcdcaa;
    --c-property: #9cdcfe;
    --c-variable: #d4d4d4;
    --c-type: #4ec9b0;
    --c-tag: var(--vs-color, var(--accent, #5b8cff));
    --c-attr: #9cdcfe;
    --c-attr-dir: #c586c0;
    --c-const: var(--vs-color, var(--accent, #5b8cff));
    --c-decorator: #dcdcaa;
  }

  .wcx--r-subtle { --r: var(--ctrl-r-subtle, 8px); }
  .wcx--r-rounded { --r: var(--ctrl-r-rounded, 12px); }
  @supports (corner-shape: squircle) {
    .wcx--r-squircle { --r: var(--ctrl-r-squircle, 18px); corner-shape: squircle; }
  }

  /* 3D tilt on hover (CSS-only) — on by default, tilt="false" opts out.
     One selector only: a :host([tilt]:hover) companion would also match
     tilt="false" (the attribute IS present) and the opt-out would never win. */
  :host(:not([tilt="false"]):hover) .wcx {
    transform: rotateX(6deg) rotateY(-5deg) translateZ(14px);
    box-shadow:
      0 6px 12px rgba(0, 0, 0, 0.4),
      0 26px 50px rgba(0, 0, 0, 0.5),
      0 60px 110px rgba(0, 0, 0, 0.4);
  }

  .wcx__bar {
    display: flex; align-items: center; gap: 10px;
    height: 38px; padding: 0 12px 0 12px;
    background: color-mix(in srgb, var(--bg-elevated, #0e0e0e) 82%, #000);
    border-bottom: 1px solid var(--border, #2a2a2a);
    flex: none;
  }
  .wcx__traffic { display: inline-flex; gap: 7px; flex: none; }
  .wcx__dot { width: 11px; height: 11px; border-radius: 50%; display: block; }
  .wcx__dot--r { background: #ff5f57; }
  .wcx__dot--y { background: #febc2e; }
  .wcx__dot--g { background: #28c840; }

  /* active tab chip */
  .wcx__tab {
    display: inline-flex; align-items: center; gap: 7px;
    height: 26px; padding: 0 12px; margin-left: 4px;
    border-radius: 7px 7px 0 0;
    align-self: flex-end;
    font-size: 12px; font-weight: 500;
    color: var(--text, #ededed);
    background: var(--bg-elevated, #0e0e0e);
    border: 1px solid var(--border, #2a2a2a);
    border-bottom: none;
  }
  .wcx__ext {
    width: 7px; height: 7px; border-radius: 2px; flex: none;
    background: var(--vs-color, var(--accent, #5b8cff));
  }
  .wcx__file {
    font-size: 12.5px; font-weight: 500;
    color: color-mix(in srgb, var(--text, #ededed) 78%, transparent);
  }
  .wcx__lang {
    font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em;
    padding: 2px 7px; border-radius: 5px; margin-left: auto;
    color: var(--vs-color, var(--accent, #5b8cff));
    background: color-mix(in srgb, var(--vs-color, var(--accent, #5b8cff)) 14%, transparent);
    flex: none;
  }
  .wcx__copy {
    flex: none; font-family: inherit; font-size: 11px;
    padding: 4px 9px; border-radius: 6px; border: none; cursor: pointer;
    color: color-mix(in srgb, var(--text, #ededed) 70%, transparent);
    background: color-mix(in srgb, var(--text, #ededed) 8%, transparent);
    transition: background-color 160ms ease, color 160ms ease;
  }
  .wcx__copy:hover { color: var(--text, #ededed); background: color-mix(in srgb, var(--text, #ededed) 16%, transparent); }
  .wcx__copy.is-copied { color: #2ecc71; }
  .wcx__copy:focus-visible { outline: 2px solid var(--vs-color, var(--accent, #5b8cff)); outline-offset: 1px; }

  .wcx__body { overflow: auto; scrollbar-width: thin; }
  .wcx__pre { margin: 0; }
  .wcx__code {
    display: block; padding: 14px 0;
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 13px; line-height: 1.65; tab-size: 2;
  }
  .wcx__line { display: flex; min-height: 1.65em; }
  .wcx__line.is-hl { background: color-mix(in srgb, var(--vs-color, var(--accent, #5b8cff)) 10%, transparent); box-shadow: inset 2px 0 0 var(--vs-color, var(--accent, #5b8cff)); }
  .wcx__ln {
    flex: none; width: 3.2em; padding-right: 1em; text-align: right;
    color: color-mix(in srgb, var(--text, #ededed) 35%, transparent);
    user-select: none; font-variant-numeric: tabular-nums;
  }
  .wcx__lc { flex: 1; padding: 0 18px 0 0; white-space: pre; }
  .wcx--wrap .wcx__lc { white-space: pre-wrap; word-break: break-word; }
  .wcx:not(.wcx--wrap) .wcx__line { width: max-content; min-width: 100%; }

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
  .t-operator { color: var(--text, #ededed); }
  .t-punct { color: var(--text, #ededed); }
  .t-const { color: var(--c-const); }
  .t-decorator { color: var(--c-decorator); }
  .t-text, .t-plain { color: var(--text, #ededed); }
  .t-ws { white-space: pre; }

  /* off-screen slot: captures light-DOM code text without rendering it */
  .wcx__slot { position: absolute; width: 0; height: 0; overflow: hidden; opacity: 0; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .wcx { transition: none; }
    :host(:hover) .wcx { transform: none; }
  }
`;let h;function W(t){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=t;const o=h.fillStyle;if(o.charAt(0)==="#")return[parseInt(o.slice(1,3),16),parseInt(o.slice(3,5),16),parseInt(o.slice(5,7),16)];const i=o.match(/[\d.]+/g);return i&&i.length>=3?[+i[0],+i[1],+i[2]]:null}const K=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function g(t,o){const i=o?W(String(o).trim()):null;if(!i){for(const a of K)t.style.removeProperty(a);return}const n=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),c=.2126*n(i[0])+.7152*n(i[1])+.0722*n(i[2])>.45,l=`rgb(${i[0]} ${i[1]} ${i[2]})`,e=i.map(a=>Math.round(c?a*.92:a+(255-a)*.16)),s=(a,p)=>t.style.setProperty(a,p);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(a,l);s("--btn-primary-bg-hover",`rgb(${e[0]} ${e[1]} ${e[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(a,i.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(a,c?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])s(a,c?"0 0 0":"255 255 255");s("--vs-color",l),s("--vs-color-rgb",i.join(" ")),s("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class P extends HTMLElement{static observedAttributes=["code","language","filename","title","theme","titlebar","traffic","tab","copyable","wrap","line-numbers","highlight-lines","max-height","radius","tilt","color"];#o;#s;#i;#c;#h;#f;#a;#l;#t;#p;#d;#r;#e=null;#x;#b;constructor(){super();const o=this.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=M,this.#o=d("div","wcx"),this.#s=d("div","wcx__bar"),this.#i=d("span","wcx__traffic"),this.#i.setAttribute("aria-hidden","true"),this.#i.append(d("i","wcx__dot wcx__dot--r"),d("i","wcx__dot wcx__dot--y"),d("i","wcx__dot wcx__dot--g")),this.#c=d("span","wcx__tab"),this.#h=d("span","wcx__ext"),this.#h.setAttribute("aria-hidden","true"),this.#f=document.createTextNode(""),this.#c.append(this.#h,this.#f),this.#a=d("span","wcx__file"),this.#l=d("span","wcx__lang"),this.#l.setAttribute("aria-hidden","true"),this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="wcx__copy",this.#t.textContent="copy",this.#s.append(this.#i,this.#c,this.#a,this.#l,this.#t),this.#p=d("div","wcx__body");const n=d("pre","wcx__pre");this.#d=d("code","wcx__code"),n.append(this.#d),this.#p.append(n),this.#r=document.createElement("slot");const r=d("span","wcx__slot");r.setAttribute("aria-hidden","true"),r.append(this.#r),this.#o.append(this.#s,this.#p,r),o.append(i,this.#o),this.#x=()=>this.#y(),this.#b=()=>this.#w()}connectedCallback(){g(this,this.getAttribute("color")),this.#t.addEventListener("click",this.#x),this.#r.addEventListener("slotchange",this.#b),this.#w()}disconnectedCallback(){this.#t.removeEventListener("click",this.#x),this.#r.removeEventListener("slotchange",this.#b),this.#e&&(clearTimeout(this.#e),this.#e=null)}attributeChangedCallback(){g(this,this.getAttribute("color")),this.#o&&this.#w()}set code(o){o==null?this.removeAttribute("code"):this.setAttribute("code",o)}get code(){return this.#g()}set language(o){o==null?this.removeAttribute("language"):this.setAttribute("language",o)}get language(){return this.getAttribute("language")||"vue"}#u(o,i){return this.getAttribute(o)??i}#n(o,i){const n=this.getAttribute(o);return n==null?i:n!=="false"}#m(){let o="";for(const i of this.#r.assignedNodes({flatten:!0}))o+=i.textContent||"";return o.replace(/^\n+|\n+$/g,"")}#g(){const o=this.getAttribute("code");if(o&&o.length)return o;const i=this.#m();return i.length?i:C}#w(){this.#o.className=`wcx wcx--r-${this.#u("radius","rounded")}`+(this.#n("wrap",!1)?" wcx--wrap":"");const o=this.#n("titlebar",!0);this.#s.style.display=o?"":"none",this.#i.style.display=this.#n("traffic",!0)?"":"none";const i=this.#u("filename",this.#u("title","App.vue")),n=this.#n("tab",!0);this.#c.style.display=n?"":"none",this.#a.style.display=n?"none":"",n?this.#f.nodeValue=i:this.#a.textContent=i,this.#l.textContent=this.language,this.#t.style.display=this.#n("copyable",!0)?"":"none";const r=+this.#u("max-height",0);this.#p.style.maxHeight=r?`${r}px`:"",this.#v()}#v(){const o=this.#g(),i=A[(this.language||"").toLowerCase()]??"plain",n=$(L(o,i)),r=z(this.getAttribute("highlight-lines")),c=this.#n("line-numbers",!0);this.#d.textContent="",n.forEach((l,e)=>{const s=d("span","wcx__line"+(r.has(e+1)?" is-hl":""));if(c){const p=d("span","wcx__ln");p.setAttribute("aria-hidden","true"),p.textContent=String(e+1),s.append(p)}const a=d("span","wcx__lc");for(const p of l){const x=d("span",`t-${p.t}`);x.textContent=p.v,a.append(x)}a.append(document.createTextNode(`
`)),s.append(a),this.#d.append(s)})}#y(){const o=this.#g(),i=()=>{this.#t.classList.add("is-copied"),this.#t.textContent="✓",this.#e&&clearTimeout(this.#e),this.#e=setTimeout(()=>{this.#t.classList.remove("is-copied"),this.#t.textContent="copy",this.#e=null},1400),this.dispatchEvent(new CustomEvent("copy",{bubbles:!0,composed:!0,detail:{code:o}}))};navigator.clipboard?.writeText?navigator.clipboard.writeText(o).then(i,()=>{w(o),i()}):(w(o),i())}}function d(t,o){const i=document.createElement(t);return o&&(i.className=o),i}function w(t){const o=document.createElement("textarea");o.value=t,o.style.position="fixed",o.style.opacity="0",document.body.appendChild(o),o.select();try{document.execCommand("copy")}finally{o.remove()}}customElements.define("vs-code-window",P);
