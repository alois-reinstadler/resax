const j=`import { defineStore } from 'pinia';

export const useCounter = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    doubled: (s) => s.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});`,T={ts:"js",tsx:"js",typescript:"js",js:"js",jsx:"js",javascript:"js",vue:"markup",html:"markup",xml:"markup",svg:"markup",markup:"markup",css:"css",scss:"css",less:"css",sass:"css",json:"json",json5:"json",jsonc:"json",bash:"shell",sh:"shell",shell:"shell",zsh:"shell",py:"python",python:"python",plain:"plain",text:"plain",txt:"plain"},h=t=>new Set(t.split(/\s+/).filter(Boolean)),$=h("const let var function return new class import export from default async await try catch type interface extends"),z=h("if else for while do switch case break continue return await yield throw in of"),L=h("true false null undefined NaN this super"),M=h("def class import from return lambda pass yield with as print global"),q=h("if elif else for while try except finally and or not in is break continue"),O=h("True False None self cls"),W=h("if then fi else elif for do done while case esac function in export local npm npx node yarn git cd"),B=h("true false"),w=t=>/[\w$]/.test(t);function m(t,r){const i=[],e=t.length;let s=0;const o=()=>{for(let c=i.length-1;c>=0;c--)if(i[c].t!=="ws")return i[c];return null};for(;s<e;){const c=t[s];if(/\s/.test(c)){let n=s;for(;n<e&&/\s/.test(t[n]);)n++;i.push({t:"ws",v:t.slice(s,n)}),s=n;continue}if(r.block&&c==="/"&&t[s+1]==="*"){const n=t.indexOf("*/",s+2),a=n===-1?e:n+2;i.push({t:"comment",v:t.slice(s,a)}),s=a;continue}if(r.line&&t.startsWith(r.line,s)){let n=s;for(;n<e&&t[n]!==`
`;)n++;i.push({t:"comment",v:t.slice(s,n)}),s=n;continue}if(r.triple&&(t.startsWith('"""',s)||t.startsWith("'''",s))){const n=t.substr(s,3),a=t.indexOf(n,s+3),l=a===-1?e:a+3;i.push({t:"string",v:t.slice(s,l)}),s=l;continue}if(r.template&&c==="`"){let n=s+1;for(;n<e&&t[n]!=="`";)t[n]==="\\"&&n++,n++;i.push({t:"string",v:t.slice(s,Math.min(n+1,e))}),s=Math.min(n+1,e);continue}if(c==='"'||c==="'"){let n=s+1;for(;n<e&&t[n]!==c&&t[n]!==`
`;)t[n]==="\\"&&n++,n++;const a=Math.min(n+1,e),l={t:"string",v:t.slice(s,a)};if(s=a,r.jsonKeys){let d=s;for(;d<e&&/\s/.test(t[d]);)d++;t[d]===":"&&(l.t="property")}i.push(l);continue}if(r.dollar&&c==="$"){let n=s+1;if(t[n]==="{"){const a=t.indexOf("}",n);n=a===-1?e:a+1}else for(;n<e&&w(t[n]);)n++;i.push({t:"variable",v:t.slice(s,n)}),s=n;continue}if(r.decorators&&c==="@"&&/[A-Za-z_]/.test(t[s+1]||"")){let n=s+1;for(;n<e&&w(t[n]);)n++;i.push({t:"decorator",v:t.slice(s,n)}),s=n;continue}if(/[0-9]/.test(c)||c==="."&&/[0-9]/.test(t[s+1]||"")){let n=s;if(c==="0"&&/[xXbBoO]/.test(t[s+1]||""))for(n=s+2;n<e&&/[0-9a-fA-F_]/.test(t[n]);)n++;else for(;n<e&&/[0-9_.eE]/.test(t[n]);)n++;i.push({t:"number",v:t.slice(s,n)}),s=n;continue}if(/[A-Za-z_$]/.test(c)){let n=s;for(;n<e&&w(t[n]);)n++;const a=t.slice(s,n);let l="variable";if(r.ctrl.has(a))l="control";else if(r.kw.has(a))l="keyword";else if(r.cst.has(a))l="const";else{let d=n;for(;d<e&&/\s/.test(t[d]);)d++;t[d]==="("?l="function":o()?.v==="."?l="property":/^[A-Z]/.test(a)&&(l="type")}i.push({t:l,v:a}),s=n;continue}if("+-*/%=<>!&|^~?:".includes(c)){let n=s;for(;n<e&&"+-*/%=<>!&|^~?:".includes(t[n]);)n++;i.push({t:"operator",v:t.slice(s,n)}),s=n;continue}i.push({t:"punct",v:c}),s++}return i}function H(t){const r=[],i=t.length;let e=0,s=!1;for(;e<i;)if(s){const o=t[e];if(/\s/.test(o)){let c=e;for(;c<i&&/\s/.test(t[c]);)c++;r.push({t:"ws",v:t.slice(e,c)}),e=c;continue}if(o==="/"&&t[e+1]===">"){r.push({t:"punct",v:"/>"}),e+=2,s=!1;continue}if(o===">"){r.push({t:"punct",v:">"}),e++,s=!1;continue}if(o==='"'||o==="'"){let c=e+1;for(;c<i&&t[c]!==o;)c++;r.push({t:"string",v:t.slice(e,Math.min(c+1,i))}),e=Math.min(c+1,i);continue}if(o==="="){r.push({t:"operator",v:"="}),e++;continue}if(/[\w@:.\-]/.test(o)){let c=e;for(;c<i&&/[\w@:.\-]/.test(t[c]);)c++;const n=t.slice(e,c),a=/^(v-|:|@|#)/.test(n);r.push({t:a?"attr-dir":"attr",v:n}),e=c;continue}r.push({t:"punct",v:o}),e++}else{if(t.startsWith("<!--",e)){const c=t.indexOf("-->",e),n=c===-1?i:c+3;r.push({t:"comment",v:t.slice(e,n)}),e=n;continue}if(t[e]==="<"){let c=e+1;t[c]==="/"&&c++;let a=c;for(;a<i&&/[\w:.-]/.test(t[a]);)a++;if(a>c){r.push({t:"punct",v:t.slice(e,c)}),r.push({t:"tag",v:t.slice(c,a)}),e=a,s=!0;continue}r.push({t:"punct",v:"<"}),e++;continue}let o=e;for(;o<i&&t[o]!=="<";)o++;r.push({t:"text",v:t.slice(e,o)}),e=o;continue}return r}function P(t){const r=[],i=t.length;let e=0;for(;e<i;){const s=t[e];if(/\s/.test(s)){let o=e;for(;o<i&&/\s/.test(t[o]);)o++;r.push({t:"ws",v:t.slice(e,o)}),e=o;continue}if(s==="/"&&t[e+1]==="*"){const o=t.indexOf("*/",e+2),c=o===-1?i:o+2;r.push({t:"comment",v:t.slice(e,c)}),e=c;continue}if(s==='"'||s==="'"){let o=e+1;for(;o<i&&t[o]!==s;)t[o]==="\\"&&o++,o++;r.push({t:"string",v:t.slice(e,Math.min(o+1,i))}),e=Math.min(o+1,i);continue}if(s==="@"){let o=e+1;for(;o<i&&/[\w-]/.test(t[o]);)o++;r.push({t:"keyword",v:t.slice(e,o)}),e=o;continue}if(/[0-9]/.test(s)||s==="."&&/[0-9]/.test(t[e+1]||"")){let o=e;for(;o<i&&/[0-9.]/.test(t[o]);)o++;for(;o<i&&/[a-z%]/i.test(t[o]);)o++;r.push({t:"number",v:t.slice(e,o)}),e=o;continue}if(/[.#&]/.test(s)||/[A-Za-z_-]/.test(s)){let o=e;for(/[.#&]/.test(s)&&o++;o<i&&/[\w-]/.test(t[o]);)o++;const c=t.slice(e,o);let n="plain";if(/^[.#&]/.test(c))n="type";else{let a=o;for(;a<i&&/\s/.test(t[a]);)a++;t[a]==="("?n="function":t[a]===":"&&(n="property")}r.push({t:n,v:c}),e=o;continue}r.push({t:"punct",v:s}),e++}return r}function K(t,r){switch(r){case"js":return m(t,{line:"//",block:!0,template:!0,decorators:!0,kw:$,ctrl:z,cst:L});case"python":return m(t,{line:"#",triple:!0,decorators:!0,kw:M,ctrl:q,cst:O});case"shell":return m(t,{line:"#",dollar:!0,kw:W,ctrl:h(""),cst:B});case"json":return m(t,{jsonKeys:!0,kw:h(""),ctrl:h(""),cst:h("true false null")});case"markup":return H(t);case"css":return P(t);default:return[{t:"plain",v:t}]}}function F(t,r){const i=K(t,r),e=[[]];for(const s of i)s.v.split(`
`).forEach((c,n)=>{n>0&&e.push([]),c&&e[e.length-1].push({t:s.t,v:c})});return e}function I(t){const r=new Set;for(const i of(t||"").split(",")){const e=i.trim().match(/^(\d+)(?:-(\d+))?$/);if(!e)continue;const s=+e[1],o=e[2]?+e[2]:s;for(let c=s;c<=o;c++)r.add(c)}return r}const k="http://www.w3.org/2000/svg";function A(t,r){const i=document.createElementNS(k,"svg");i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("fill","none"),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.9"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.setAttribute("aria-hidden","true"),i.setAttribute("class",r);for(const e of t){const s=document.createElementNS(k,"path");s.setAttribute("d",e),i.appendChild(s)}return i}const R=`
/* Boxes in here pair a 100% width with their own padding/border — the frame
   alone is 3px over, which shears the conic ring off the right edge. */
*, *::before, *::after { box-sizing: border-box; }

.gbc {
  --r: var(--ctrl-r-rounded, 12px);
  --gb-w: 1.5px;
  position: relative;
  width: 100%;
  max-width: 100%;
  border-radius: var(--r);
  padding: var(--gb-w);
  isolation: isolate;
  font-family: var(--font-mono, ui-monospace, monospace);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.5);

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

.gbc--r-subtle { --r: var(--ctrl-r-subtle, 8px); }
.gbc--r-rounded { --r: var(--ctrl-r-rounded, 12px); }
@supports (corner-shape: squircle) {
  .gbc--r-squircle { --r: var(--ctrl-r-squircle, 18px); corner-shape: squircle; }
}

/* animated conic gradient frame */
.gbc__frame {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: conic-gradient(
    from var(--gb-angle, 0deg),
    var(--vs-color, var(--accent, #5b8cff)),
    #c586c0,
    #4ec9b0,
    var(--vs-color, var(--accent, #5b8cff))
  );
  opacity: 0.9;
}
@supports (corner-shape: squircle) {
  .gbc--r-squircle .gbc__frame { corner-shape: squircle; }
}
@property --gb-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
.gbc--animated .gbc__frame { animation: gbc-spin 6s linear infinite; }
@keyframes gbc-spin {
  to { --gb-angle: 360deg; }
}

.gbc__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  border-radius: calc(var(--r) - var(--gb-w));
  background: var(--bg-elevated, #0e0e0e);
  color: var(--text, #ededed);
  overflow: hidden;
}
@supports (corner-shape: squircle) {
  .gbc--r-squircle .gbc__inner { corner-shape: squircle; }
}

.gbc__bar {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  padding: 0 12px;
  background: color-mix(in srgb, var(--bg-elevated, #0e0e0e) 82%, #000);
  border-bottom: 1px solid var(--border, #2a2a2a);
  flex: none;
}
.gbc__traffic { display: inline-flex; gap: 7px; flex: none; }
.gbc__dot { width: 11px; height: 11px; border-radius: 50%; display: block; }
.gbc__dot--r { background: #ff5f57; }
.gbc__dot--y { background: #febc2e; }
.gbc__dot--g { background: #28c840; }
.gbc__file {
  font-size: 12.5px; font-weight: 500;
  color: color-mix(in srgb, var(--text, #ededed) 78%, transparent);
  margin: 0 auto; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 55%;
}
.gbc__lang {
  font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em;
  padding: 2px 7px; border-radius: 5px;
  color: var(--vs-color, var(--accent, #5b8cff));
  background: color-mix(in srgb, var(--vs-color, var(--accent, #5b8cff)) 14%, transparent);
  flex: none;
}
.gbc__copy {
  flex: none; font-family: inherit; font-size: 11px;
  padding: 4px 9px; border-radius: 6px; border: none; cursor: pointer;
  color: color-mix(in srgb, var(--text, #ededed) 70%, transparent);
  background: color-mix(in srgb, var(--text, #ededed) 8%, transparent);
  transition: background-color 160ms ease, color 160ms ease;
}
.gbc__copy:hover { color: var(--text, #ededed); background: color-mix(in srgb, var(--text, #ededed) 16%, transparent); }
.gbc__copy.is-copied { color: #2ecc71; }
.gbc__copy:focus-visible { outline: 2px solid var(--vs-color, var(--accent, #5b8cff)); outline-offset: 1px; }

.gbc__body { overflow: auto; scrollbar-width: thin; }
.gbc__pre { margin: 0; }
.gbc__code {
  display: block; padding: 14px 0;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 13px; line-height: 1.65; tab-size: 2;
}
.gbc__line { display: flex; min-height: 1.65em; }
.gbc__line.is-hl { background: color-mix(in srgb, var(--vs-color, var(--accent, #5b8cff)) 10%, transparent); box-shadow: inset 2px 0 0 var(--vs-color, var(--accent, #5b8cff)); }
.gbc__ln {
  /* 3.2em of digits + the 1em gutter, which the border-box now counts in */
  flex: none; width: 4.2em; padding-right: 1em; text-align: right;
  color: color-mix(in srgb, var(--text, #ededed) 35%, transparent);
  user-select: none; font-variant-numeric: tabular-nums;
}
.gbc__lc { flex: 1; padding: 0 18px 0 0; white-space: pre; }
.gbc--wrap .gbc__lc { white-space: pre-wrap; word-break: break-word; }
.gbc:not(.gbc--wrap) .gbc__line { width: max-content; min-width: 100%; }

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

@media (prefers-reduced-motion: reduce) {
  .gbc--animated .gbc__frame { animation: none; }
  .gbc__copy { transition: none; }
}

/* ── WC additions ── */
:host { display: block; width: 100%; }
:host([hidden]) { display: none; }
.gbc__copy { display: inline-flex; align-items: center; gap: 5px; }
.gbc__copy svg { width: 13px; height: 13px; display: block; }
.gbc__copy .ic-check { display: none; }
.gbc__copy.is-copied .ic-copy { display: none; }
.gbc__copy.is-copied .ic-check { display: block; }
.gbc__slot { display: none; }
`;let u;function V(t){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=t;const r=u.fillStyle;if(r.charAt(0)==="#")return[parseInt(r.slice(1,3),16),parseInt(r.slice(3,5),16),parseInt(r.slice(5,7),16)];const i=r.match(/[\d.]+/g);return i&&i.length>=3?[+i[0],+i[1],+i[2]]:null}const Z=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function C(t,r){const i=r?V(String(r).trim()):null;if(!i){for(const l of Z)t.style.removeProperty(l);return}const e=l=>(l/=255,l<=.03928?l/12.92:((l+.055)/1.055)**2.4),o=.2126*e(i[0])+.7152*e(i[1])+.0722*e(i[2])>.45,c=`rgb(${i[0]} ${i[1]} ${i[2]})`,n=i.map(l=>Math.round(o?l*.92:l+(255-l)*.16)),a=(l,d)=>t.style.setProperty(l,d);for(const l of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(l,c);a("--btn-primary-bg-hover",`rgb(${n[0]} ${n[1]} ${n[2]})`);for(const l of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(l,i.join(" "));for(const l of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(l,o?"#0b0b0b":"#ffffff");for(const l of["--btn-primary-rip","--btn-primary-glow"])a(l,o?"0 0 0":"255 255 255");a("--vs-color",c),a("--vs-color-rgb",i.join(" ")),a("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class D extends HTMLElement{static observedAttributes=["code","language","filename","theme","titlebar","traffic","line-numbers","copyable","wrap","highlight-lines","max-height","radius","animated","border-width","color"];#g;#e;#l;#d;#s;#n;#h;#o;#t;#c;#a;#r;#p="";#i=null;#u;#b;constructor(){super(),this.#g=this.attachShadow({mode:"open"});const r=document.createElement("style");r.textContent=R,this.#e=document.createElement("div"),this.#e.className="gbc",this.#l=document.createElement("span"),this.#l.className="gbc__frame",this.#l.setAttribute("aria-hidden","true"),this.#d=document.createElement("div"),this.#d.className="gbc__inner",this.#s=document.createElement("div"),this.#s.className="gbc__bar",this.#n=document.createElement("span"),this.#n.className="gbc__traffic",this.#n.setAttribute("aria-hidden","true");for(const e of["r","y","g"]){const s=document.createElement("i");s.className=`gbc__dot gbc__dot--${e}`,this.#n.appendChild(s)}this.#h=document.createElement("span"),this.#h.className="gbc__file",this.#o=document.createElement("span"),this.#o.className="gbc__lang",this.#o.setAttribute("aria-hidden","true"),this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="gbc__copy",this.#t.append(A(["M9 9h11v11H9z","M5 15V5a2 2 0 0 1 2-2h8"],"ic-copy"),A(["M20 6 9 17l-5-5"],"ic-check")),this.#s.append(this.#n,this.#h,this.#o,this.#t),this.#c=document.createElement("div"),this.#c.className="gbc__body";const i=document.createElement("pre");i.className="gbc__pre",this.#a=document.createElement("code"),this.#a.className="gbc__code",i.appendChild(this.#a),this.#c.appendChild(i),this.#d.append(this.#s,this.#c),this.#e.append(this.#l,this.#d),this.#r=document.createElement("slot"),this.#r.className="gbc__slot",this.#g.append(r,this.#e,this.#r),this.#u=()=>this.#w(),this.#b=()=>this.#f(),this.#t.addEventListener("click",this.#u),this.#r.addEventListener("slotchange",this.#b)}connectedCallback(){C(this,this.getAttribute("color")),this.#f()}disconnectedCallback(){this.#i&&(clearTimeout(this.#i),this.#i=null),this.#t.removeEventListener("click",this.#u),this.#r.removeEventListener("slotchange",this.#b)}attributeChangedCallback(){C(this,this.getAttribute("color")),this.#e&&this.#f()}set code(r){r==null?this.removeAttribute("code"):this.setAttribute("code",r)}get code(){return this.#p}set language(r){this.setAttribute("language",r)}get language(){return this.getAttribute("language")??"ts"}set filename(r){this.setAttribute("filename",r)}get filename(){return this.getAttribute("filename")??"store.ts"}set highlightLines(r){this.setAttribute("highlight-lines",r)}get highlightLines(){return this.getAttribute("highlight-lines")??""}#y(r,i){if(!this.hasAttribute(r))return i;const e=this.getAttribute(r);return e!=="false"&&e!=="0"}#m(r,i){const e=parseFloat(this.getAttribute(r));return Number.isFinite(e)?e:i}#x(){const i=this.#r.assignedNodes({flatten:!0}).map(e=>e.textContent||"").join("");return i.trim()?i.replace(/^\n+|\n+$/g,""):""}#f(){const r=(y,b)=>this.getAttribute(y)??b,i=r("language","ts"),e=r("radius","rounded"),s=this.hasAttribute("titlebar"),o=this.hasAttribute("traffic"),c=this.hasAttribute("line-numbers"),n=this.hasAttribute("copyable"),a=this.#y("wrap",!1),l=this.hasAttribute("animated"),d=this.#m("border-width",1.5),_=this.#m("max-height",0),v=this.getAttribute("code");this.#p=v&&v.length?v:this.#x()||j,this.#e.className=`gbc gbc--r-${e}`+(a?" gbc--wrap":"")+(l?" gbc--animated":""),this.#e.style.setProperty("--gb-w",`${d}px`),this.getAttribute("theme")&&this.#e.setAttribute("data-theme",this.getAttribute("theme")),this.#s.style.display=s?"":"none",this.#n.style.display=o?"":"none",this.#h.textContent=r("filename","store.ts"),this.#o.textContent=i,this.#t.style.display=n?"":"none",this.#t.setAttribute("aria-label",this.#t.classList.contains("is-copied")?"Copied":"Copy code"),this.#c.style.maxHeight=_?`${_}px`:"";const E=T[i.toLowerCase()]??"plain",N=F(this.#p,E),S=I(this.getAttribute("highlight-lines"));this.#a.replaceChildren(),N.forEach((y,b)=>{const f=document.createElement("span");if(f.className="gbc__line"+(S.has(b+1)?" is-hl":""),c){const p=document.createElement("span");p.className="gbc__ln",p.setAttribute("aria-hidden","true"),p.textContent=String(b+1),f.appendChild(p)}const g=document.createElement("span");g.className="gbc__lc";for(const p of y){const x=document.createElement("span");x.className=`t-${p.t}`,x.textContent=p.v,g.appendChild(x)}g.appendChild(document.createTextNode(`
`)),f.appendChild(g),this.#a.appendChild(f)})}#v(r){const i=document.createElement("textarea");i.value=r,i.style.position="fixed",i.style.opacity="0",document.body.appendChild(i),i.select();try{document.execCommand("copy")}finally{i.remove()}}async#w(){const r=this.#p;try{navigator.clipboard?.writeText?await navigator.clipboard.writeText(r):this.#v(r)}catch{this.#v(r)}this.#t.classList.add("is-copied"),this.#t.setAttribute("aria-label","Copied"),this.#i&&clearTimeout(this.#i),this.#i=setTimeout(()=>{this.#t.classList.remove("is-copied"),this.#t.setAttribute("aria-label","Copy code"),this.#i=null},1400),this.dispatchEvent(new CustomEvent("copy",{bubbles:!0,composed:!0,detail:{code:r}}))}}customElements.define("vs-code-gradient-border",D);
