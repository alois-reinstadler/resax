const A={ts:"js",tsx:"js",typescript:"js",js:"js",jsx:"js",javascript:"js",vue:"markup",html:"markup",xml:"markup",svg:"markup",markup:"markup",css:"css",scss:"css",less:"css",sass:"css",json:"json",json5:"json",jsonc:"json",bash:"shell",sh:"shell",shell:"shell",zsh:"shell",py:"python",python:"python",plain:"plain",text:"plain",txt:"plain"},u=t=>new Set(t.split(/\s+/).filter(Boolean)),E=u("const let var function return new class import export from default async await try catch type interface"),j=u("if else for while do switch case break continue return await yield throw in of"),N=u("true false null undefined NaN this super"),S=u("def class import from return lambda pass yield with as print global"),T=u("if elif else for while try except finally and or not in is break continue"),$=u("True False None self cls"),z=u("if then fi else elif for do done while case esac function in export local npm npx node yarn pnpm git cd ls mkdir rm cp mv echo"),O=u("true false"),y=t=>/[\w$]/.test(t);function x(t,i){const c=[],e=t.length;let r=0;const o=()=>{for(let s=c.length-1;s>=0;s--)if(c[s].t!=="ws")return c[s];return null};for(;r<e;){const s=t[r];if(/\s/.test(s)){let n=r;for(;n<e&&/\s/.test(t[n]);)n++;c.push({t:"ws",v:t.slice(r,n)}),r=n;continue}if(i.block&&s==="/"&&t[r+1]==="*"){const n=t.indexOf("*/",r+2),a=n===-1?e:n+2;c.push({t:"comment",v:t.slice(r,a)}),r=a;continue}if(i.line&&t.startsWith(i.line,r)){let n=r;for(;n<e&&t[n]!==`
`;)n++;c.push({t:"comment",v:t.slice(r,n)}),r=n;continue}if(i.triple&&(t.startsWith('"""',r)||t.startsWith("'''",r))){const n=t.substr(r,3),a=t.indexOf(n,r+3),l=a===-1?e:a+3;c.push({t:"string",v:t.slice(r,l)}),r=l;continue}if(i.template&&s==="`"){let n=r+1;for(;n<e&&t[n]!=="`";)t[n]==="\\"&&n++,n++;c.push({t:"string",v:t.slice(r,Math.min(n+1,e))}),r=Math.min(n+1,e);continue}if(s==='"'||s==="'"){let n=r+1;for(;n<e&&t[n]!==s&&t[n]!==`
`;)t[n]==="\\"&&n++,n++;const a=Math.min(n+1,e),l={t:"string",v:t.slice(r,a)};if(r=a,i.jsonKeys){let d=r;for(;d<e&&/\s/.test(t[d]);)d++;t[d]===":"&&(l.t="property")}c.push(l);continue}if(i.dollar&&s==="$"){let n=r+1;if(t[n]==="{"){const a=t.indexOf("}",n);n=a===-1?e:a+1}else for(;n<e&&y(t[n]);)n++;c.push({t:"variable",v:t.slice(r,n)}),r=n;continue}if(i.decorators&&s==="@"&&/[A-Za-z_]/.test(t[r+1]||"")){let n=r+1;for(;n<e&&y(t[n]);)n++;c.push({t:"decorator",v:t.slice(r,n)}),r=n;continue}if(/[0-9]/.test(s)||s==="."&&/[0-9]/.test(t[r+1]||"")){let n=r;if(s==="0"&&/[xXbBoO]/.test(t[r+1]||""))for(n=r+2;n<e&&/[0-9a-fA-F_]/.test(t[n]);)n++;else for(;n<e&&/[0-9_.eE]/.test(t[n]);)n++;c.push({t:"number",v:t.slice(r,n)}),r=n;continue}if(/[A-Za-z_$]/.test(s)){let n=r;for(;n<e&&y(t[n]);)n++;const a=t.slice(r,n);let l="variable";if(i.ctrl.has(a))l="control";else if(i.kw.has(a))l="keyword";else if(i.cst.has(a))l="const";else{let d=n;for(;d<e&&/\s/.test(t[d]);)d++;t[d]==="("?l="function":o()?.v==="."?l="property":/^[A-Z]/.test(a)&&(l="type")}c.push({t:l,v:a}),r=n;continue}if("+-*/%=<>!&|^~?:".includes(s)){let n=r;for(;n<e&&"+-*/%=<>!&|^~?:".includes(t[n]);)n++;c.push({t:"operator",v:t.slice(r,n)}),r=n;continue}c.push({t:"punct",v:s}),r++}return c}function M(t){const i=[],c=t.length;let e=0,r=!1;for(;e<c;)if(r){const o=t[e];if(/\s/.test(o)){let s=e;for(;s<c&&/\s/.test(t[s]);)s++;i.push({t:"ws",v:t.slice(e,s)}),e=s;continue}if(o==="/"&&t[e+1]===">"){i.push({t:"punct",v:"/>"}),e+=2,r=!1;continue}if(o===">"){i.push({t:"punct",v:">"}),e++,r=!1;continue}if(o==='"'||o==="'"){let s=e+1;for(;s<c&&t[s]!==o;)s++;i.push({t:"string",v:t.slice(e,Math.min(s+1,c))}),e=Math.min(s+1,c);continue}if(o==="="){i.push({t:"operator",v:"="}),e++;continue}if(/[\w@:.\-]/.test(o)){let s=e;for(;s<c&&/[\w@:.\-]/.test(t[s]);)s++;const n=t.slice(e,s),a=/^(v-|:|@|#)/.test(n);i.push({t:a?"attr-dir":"attr",v:n}),e=s;continue}i.push({t:"punct",v:o}),e++}else{if(t.startsWith("<!--",e)){const s=t.indexOf("-->",e),n=s===-1?c:s+3;i.push({t:"comment",v:t.slice(e,n)}),e=n;continue}if(t[e]==="<"){let s=e+1;t[s]==="/"&&s++;let a=s;for(;a<c&&/[\w:.-]/.test(t[a]);)a++;if(a>s){i.push({t:"punct",v:t.slice(e,s)}),i.push({t:"tag",v:t.slice(s,a)}),e=a,r=!0;continue}i.push({t:"punct",v:"<"}),e++;continue}let o=e;for(;o<c&&t[o]!=="<";)o++;i.push({t:"text",v:t.slice(e,o)}),e=o;continue}return i}function L(t){const i=[],c=t.length;let e=0;for(;e<c;){const r=t[e];if(/\s/.test(r)){let o=e;for(;o<c&&/\s/.test(t[o]);)o++;i.push({t:"ws",v:t.slice(e,o)}),e=o;continue}if(r==="/"&&t[e+1]==="*"){const o=t.indexOf("*/",e+2),s=o===-1?c:o+2;i.push({t:"comment",v:t.slice(e,s)}),e=s;continue}if(r==='"'||r==="'"){let o=e+1;for(;o<c&&t[o]!==r;)t[o]==="\\"&&o++,o++;i.push({t:"string",v:t.slice(e,Math.min(o+1,c))}),e=Math.min(o+1,c);continue}if(r==="@"){let o=e+1;for(;o<c&&/[\w-]/.test(t[o]);)o++;i.push({t:"keyword",v:t.slice(e,o)}),e=o;continue}if(/[0-9]/.test(r)||r==="."&&/[0-9]/.test(t[e+1]||"")){let o=e;for(;o<c&&/[0-9.]/.test(t[o]);)o++;for(;o<c&&/[a-z%]/i.test(t[o]);)o++;i.push({t:"number",v:t.slice(e,o)}),e=o;continue}if(/[.#&]/.test(r)||/[A-Za-z_-]/.test(r)){let o=e;for(/[.#&]/.test(r)&&o++;o<c&&/[\w-]/.test(t[o]);)o++;const s=t.slice(e,o);let n="plain";if(/^[.#&]/.test(s))n="type";else{let a=o;for(;a<c&&/\s/.test(t[a]);)a++;t[a]==="("?n="function":t[a]===":"&&(n="property")}i.push({t:n,v:s}),e=o;continue}i.push({t:"punct",v:r}),e++}return i}function W(t,i){switch(i){case"js":return x(t,{line:"//",block:!0,template:!0,decorators:!0,kw:E,ctrl:j,cst:N});case"python":return x(t,{line:"#",triple:!0,decorators:!0,kw:S,ctrl:T,cst:$});case"shell":return x(t,{line:"#",dollar:!0,kw:z,ctrl:u(""),cst:O});case"json":return x(t,{jsonKeys:!0,kw:u(""),ctrl:u(""),cst:u("true false null")});case"markup":return M(t);case"css":return L(t);default:return[{t:"plain",v:t}]}}function K(t){const i=[[]];for(const c of t)c.v.split(`
`).forEach((r,o)=>{o>0&&i.push([]),r&&i[i.length-1].push({t:c.t,v:r})});return i}function P(t){const i=new Set;for(const c of(t||"").split(",")){const e=c.trim().match(/^(\d+)(?:-(\d+))?$/);if(!e)continue;const r=+e[1],o=e[2]?+e[2]:r;for(let s=r;s<=o;s++)i.add(s)}return i}const q=`# install dependencies
npm install vuesax

# start dev server
npm run dev

# build for production
npm run build`,B=`
  :host { display: block; }
  .tcx {
    --r: var(--ctrl-r-rounded, 12px);
    position: relative; display: flex; flex-direction: column; width: 100%;
    border: 1px solid var(--border, #2a2a2a); border-radius: var(--r);
    background: var(--bg-elevated, #0e0e0e); color: var(--text, #ededed);
    overflow: hidden; font-family: var(--font-mono, ui-monospace, monospace);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.5);
    --c-comment: #6a9955; --c-string: #ce9178; --c-keyword: #4ec9b0;
    --c-control: #c586c0; --c-number: #b5cea8; --c-function: #dcdcaa;
    --c-property: #9cdcfe; --c-variable: #d4d4d4; --c-type: #4ec9b0;
    --c-tag: var(--vs-color, var(--accent, #5b8cff)); --c-attr: #9cdcfe; --c-attr-dir: #c586c0;
    --c-const: var(--vs-color, var(--accent, #5b8cff)); --c-decorator: #dcdcaa;
  }
  .tcx--r-subtle { --r: var(--ctrl-r-subtle, 8px); }
  .tcx--r-rounded { --r: var(--ctrl-r-rounded, 12px); }
  @supports (corner-shape: squircle) {
    .tcx--r-squircle { --r: var(--ctrl-r-squircle, 18px); corner-shape: squircle; }
  }
  .tcx__bar {
    display: flex; align-items: center; gap: 10px; height: 34px; padding: 0 12px;
    background: color-mix(in srgb, var(--bg-elevated, #0e0e0e) 80%, #000);
    border-bottom: 1px solid var(--border, #2a2a2a); flex: none;
  }
  .tcx__traffic { display: inline-flex; gap: 7px; flex: none; }
  .tcx__dot { width: 11px; height: 11px; border-radius: 50%; display: block; }
  .tcx__dot--r { background: #ff5f57; }
  .tcx__dot--y { background: #febc2e; }
  .tcx__dot--g { background: #28c840; }
  .tcx__file {
    font-size: 12px; font-weight: 500;
    color: color-mix(in srgb, var(--text, #ededed) 65%, transparent);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-right: auto;
  }
  .tcx__lang {
    font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em;
    padding: 2px 7px; border-radius: 5px; color: var(--vs-color, var(--accent, #5b8cff));
    background: color-mix(in srgb, var(--vs-color, var(--accent, #5b8cff)) 14%, transparent); flex: none;
  }
  .tcx__copy {
    flex: none; font-family: inherit; font-size: 11px;
    padding: 4px 9px; border-radius: 6px; border: none; cursor: pointer;
    color: color-mix(in srgb, var(--text, #ededed) 70%, transparent);
    background: color-mix(in srgb, var(--text, #ededed) 8%, transparent);
    transition: background-color 160ms ease, color 160ms ease;
  }
  .tcx__copy:hover { color: var(--text, #ededed); background: color-mix(in srgb, var(--text, #ededed) 16%, transparent); }
  .tcx__copy.is-copied { color: #2ecc71; }
  .tcx__copy:focus-visible { outline: 2px solid var(--vs-color, var(--accent, #5b8cff)); outline-offset: 1px; }
  .tcx__body { overflow: auto; scrollbar-width: thin; }
  .tcx__pre { margin: 0; }
  .tcx__code {
    display: block; padding: 12px 0;
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 13px; line-height: 1.7; tab-size: 2;
  }
  .tcx__line { display: flex; min-height: 1.7em; padding: 0 14px; }
  .tcx__line.is-hl { background: color-mix(in srgb, var(--vs-color, var(--accent, #5b8cff)) 10%, transparent); }
  .tcx__ln {
    flex: none; width: 2.4em; padding-right: 1em; text-align: right;
    color: color-mix(in srgb, var(--text, #ededed) 35%, transparent);
    user-select: none; font-variant-numeric: tabular-nums;
  }
  .tcx__prompt {
    flex: none; padding-right: 0.7em; user-select: none;
    color: var(--vs-color, var(--accent, #5b8cff)); font-weight: 600;
  }
  .tcx__lc { flex: 1; white-space: pre; }
  .tcx--wrap .tcx__lc { white-space: pre-wrap; word-break: break-word; }
  .tcx:not(.tcx--wrap) .tcx__line { width: max-content; min-width: 100%; }
  .tcx__caret {
    display: inline-block; width: 8px; height: 1.05em; margin-left: 2px;
    vertical-align: text-bottom; background: var(--vs-color, var(--accent, #5b8cff));
    animation: tcx-blink 1s steps(2, start) infinite;
  }
  @keyframes tcx-blink { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }
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
    .tcx__caret { animation: none; opacity: 1; }
    .tcx__copy { transition: none; }
  }
`;let b;function H(t){if(b||=document.createElement("canvas").getContext("2d"),!b)return null;b.fillStyle="#000",b.fillStyle=t;const i=b.fillStyle;if(i.charAt(0)==="#")return[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)];const c=i.match(/[\d.]+/g);return c&&c.length>=3?[+c[0],+c[1],+c[2]]:null}const I=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function w(t,i){const c=i?H(String(i).trim()):null;if(!c){for(const l of I)t.style.removeProperty(l);return}const e=l=>(l/=255,l<=.03928?l/12.92:((l+.055)/1.055)**2.4),o=.2126*e(c[0])+.7152*e(c[1])+.0722*e(c[2])>.45,s=`rgb(${c[0]} ${c[1]} ${c[2]})`,n=c.map(l=>Math.round(o?l*.92:l+(255-l)*.16)),a=(l,d)=>t.style.setProperty(l,d);for(const l of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(l,s);a("--btn-primary-bg-hover",`rgb(${n[0]} ${n[1]} ${n[2]})`);for(const l of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(l,c.join(" "));for(const l of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(l,o?"#0b0b0b":"#ffffff");for(const l of["--btn-primary-rip","--btn-primary-glow"])a(l,o?"0 0 0":"255 255 255");a("--vs-color",s),a("--vs-color-rgb",c.join(" ")),a("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class R extends HTMLElement{static observedAttributes=["code","language","filename","theme","titlebar","traffic","line-numbers","copyable","wrap","highlight-lines","max-height","radius","prompt","caret","color"];#r;#i;#s;#c;#t;#o;#e;#a=null;#n=null;#l=!1;constructor(){super();const i=this.attachShadow({mode:"open"}),c=document.createElement("style");c.textContent=B,this.#r=document.createElement("div"),this.#r.className="tcx",this.#i=document.createElement("div"),this.#i.className="tcx__bar";const e=document.createElement("span");e.className="tcx__traffic",e.setAttribute("aria-hidden","true");for(const o of["r","y","g"]){const s=document.createElement("i");s.className=`tcx__dot tcx__dot--${o}`,e.appendChild(s)}this.#s=document.createElement("span"),this.#s.className="tcx__file",this.#c=document.createElement("span"),this.#c.className="tcx__lang",this.#c.setAttribute("aria-hidden","true"),this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="tcx__copy",this.#t.addEventListener("click",()=>this.#m()),this.#i.append(e,this.#s,this.#c,this.#t),this.#o=document.createElement("div"),this.#o.className="tcx__body";const r=document.createElement("pre");r.className="tcx__pre",this.#e=document.createElement("code"),this.#e.className="tcx__code",r.appendChild(this.#e),this.#o.appendChild(r),this.#r.append(this.#i,this.#o),i.append(c,this.#r)}connectedCallback(){w(this,this.getAttribute("color")),this.#l=!1,this.#d()}disconnectedCallback(){this.#l=!0,this.#n&&(clearTimeout(this.#n),this.#n=null)}attributeChangedCallback(){w(this,this.getAttribute("color")),this.#e&&this.#d()}get code(){return this.getAttribute("code")??""}set code(i){this.#a=null,this.setAttribute("code",i??"")}set lines(i){this.#a=Array.isArray(i)?i.map(String):null,this.#e&&this.#d()}get lines(){return this.#p().split(`
`)}#p(){if(this.#a)return this.#a.join(`
`);const i=this.getAttribute("code");return i&&i.length?i:q}#h(i,c){if(!this.hasAttribute(i))return c;const e=this.getAttribute(i);return e!=="false"&&e!=="0"}#d(){const i=(v,h)=>this.getAttribute(v)??h,c=i("radius","rounded"),e=this.#h("wrap",!1),r=this.hasAttribute("prompt");this.#r.className=`tcx tcx--r-${c}`+(e?" tcx--wrap":"")+(r?" tcx--prompt":"");const o=this.hasAttribute("titlebar");this.#i.style.display=o?"":"none",this.#i.firstElementChild.style.display=this.hasAttribute("traffic")?"":"none",this.#s.textContent=i("filename","zsh — ~/project");const s=i("language","bash");this.#c.textContent=s;const n=this.hasAttribute("copyable");this.#t.style.display=n?"":"none",this.#u(!1);const a=parseInt(i("max-height","0"),10);this.#o.style.maxHeight=a>0?`${a}px`:"";const l=A[s.toLowerCase()]??"plain",d=K(W(this.#p(),l)),_=P(i("highlight-lines","")),k=this.#h("line-numbers",!1),C=this.hasAttribute("caret");this.#e.replaceChildren(),d.forEach((v,h)=>{const f=document.createElement("span");if(f.className="tcx__line"+(_.has(h+1)?" is-hl":""),k){const p=document.createElement("span");p.className="tcx__ln",p.setAttribute("aria-hidden","true"),p.textContent=String(h+1),f.appendChild(p)}if(r){const p=document.createElement("span");p.className="tcx__prompt",p.setAttribute("aria-hidden","true"),p.textContent="$",f.appendChild(p)}const m=document.createElement("span");m.className="tcx__lc";for(const p of v){const g=document.createElement("span");g.className=`t-${p.t}`,g.textContent=p.v,m.appendChild(g)}if(C&&h===d.length-1){const p=document.createElement("span");p.className="tcx__caret",p.setAttribute("aria-hidden","true"),m.appendChild(p)}m.appendChild(document.createTextNode(`
`)),f.appendChild(m),this.#e.appendChild(f)})}#u(i){this.#t.classList.toggle("is-copied",i),this.#t.textContent=i?"✓ copied":"copy",this.#t.setAttribute("aria-label",i?"Copied":"Copy code")}#f(i){const c=document.createElement("textarea");c.value=i,c.style.position="fixed",c.style.opacity="0",document.body.appendChild(c),c.select();try{document.execCommand("copy")}finally{c.remove()}}async#m(){const i=this.#p();try{navigator.clipboard?.writeText?await navigator.clipboard.writeText(i):this.#f(i)}catch{this.#f(i)}this.dispatchEvent(new CustomEvent("copy",{bubbles:!0,composed:!0,detail:{code:i}})),!this.#l&&(this.#u(!0),this.#n&&clearTimeout(this.#n),this.#n=setTimeout(()=>{this.#n=null,this.#l||this.#u(!1)},1400))}}customElements.define("vs-code-terminal",R);
