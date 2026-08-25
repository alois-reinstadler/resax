const b={ts:"js",tsx:"js",typescript:"js",js:"js",jsx:"js",javascript:"js",vue:"markup",html:"markup",xml:"markup",svg:"markup",markup:"markup",css:"css",scss:"css",less:"css",sass:"css",json:"json",json5:"json",jsonc:"json",bash:"shell",sh:"shell",shell:"shell",zsh:"shell",py:"python",python:"python",plain:"plain",text:"plain",txt:"plain"},p=t=>new Set(t.split(/\s+/).filter(Boolean)),x=p("const let var function return new class import export from default async await try catch type interface extends"),y=p("if else for while do switch case break continue return await yield throw in of"),w=p("true false null undefined NaN this super"),_=p("def class import from return lambda pass yield with as print global"),k=p("if elif else for while try except finally and or not in is break continue"),C=p("True False None self cls"),E=p("if then fi else elif for do done while case esac function in export local npm npx node yarn git cd"),A=p("true false"),f=t=>/[\w$]/.test(t);function u(t,r){const o=[],e=t.length;let n=0;const s=()=>{for(let c=o.length-1;c>=0;c--)if(o[c].t!=="ws")return o[c];return null};for(;n<e;){const c=t[n];if(/\s/.test(c)){let i=n;for(;i<e&&/\s/.test(t[i]);)i++;o.push({t:"ws",v:t.slice(n,i)}),n=i;continue}if(r.block&&c==="/"&&t[n+1]==="*"){const i=t.indexOf("*/",n+2),l=i===-1?e:i+2;o.push({t:"comment",v:t.slice(n,l)}),n=l;continue}if(r.line&&t.startsWith(r.line,n)){let i=n;for(;i<e&&t[i]!==`
`;)i++;o.push({t:"comment",v:t.slice(n,i)}),n=i;continue}if(r.triple&&(t.startsWith('"""',n)||t.startsWith("'''",n))){const i=t.substr(n,3),l=t.indexOf(i,n+3),a=l===-1?e:l+3;o.push({t:"string",v:t.slice(n,a)}),n=a;continue}if(r.template&&c==="`"){let i=n+1;for(;i<e&&t[i]!=="`";)t[i]==="\\"&&i++,i++;o.push({t:"string",v:t.slice(n,Math.min(i+1,e))}),n=Math.min(i+1,e);continue}if(c==='"'||c==="'"){let i=n+1;for(;i<e&&t[i]!==c&&t[i]!==`
`;)t[i]==="\\"&&i++,i++;const l=Math.min(i+1,e),a={t:"string",v:t.slice(n,l)};if(n=l,r.jsonKeys){let d=n;for(;d<e&&/\s/.test(t[d]);)d++;t[d]===":"&&(a.t="property")}o.push(a);continue}if(r.dollar&&c==="$"){let i=n+1;if(t[i]==="{"){const l=t.indexOf("}",i);i=l===-1?e:l+1}else for(;i<e&&f(t[i]);)i++;o.push({t:"variable",v:t.slice(n,i)}),n=i;continue}if(r.decorators&&c==="@"&&/[A-Za-z_]/.test(t[n+1]||"")){let i=n+1;for(;i<e&&f(t[i]);)i++;o.push({t:"decorator",v:t.slice(n,i)}),n=i;continue}if(/[0-9]/.test(c)||c==="."&&/[0-9]/.test(t[n+1]||"")){let i=n;if(c==="0"&&/[xXbBoO]/.test(t[n+1]||""))for(i=n+2;i<e&&/[0-9a-fA-F_]/.test(t[i]);)i++;else for(;i<e&&/[0-9_.eE]/.test(t[i]);)i++;o.push({t:"number",v:t.slice(n,i)}),n=i;continue}if(/[A-Za-z_$]/.test(c)){let i=n;for(;i<e&&f(t[i]);)i++;const l=t.slice(n,i);let a="variable";if(r.ctrl.has(l))a="control";else if(r.kw.has(l))a="keyword";else if(r.cst.has(l))a="const";else{let d=i;for(;d<e&&/\s/.test(t[d]);)d++;t[d]==="("?a="function":s()?.v==="."?a="property":/^[A-Z]/.test(l)&&(a="type")}o.push({t:a,v:l}),n=i;continue}if("+-*/%=<>!&|^~?:".includes(c)){let i=n;for(;i<e&&"+-*/%=<>!&|^~?:".includes(t[i]);)i++;o.push({t:"operator",v:t.slice(n,i)}),n=i;continue}o.push({t:"punct",v:c}),n++}return o}function j(t){const r=[],o=t.length;let e=0,n=!1;for(;e<o;)if(n){const s=t[e];if(/\s/.test(s)){let c=e;for(;c<o&&/\s/.test(t[c]);)c++;r.push({t:"ws",v:t.slice(e,c)}),e=c;continue}if(s==="/"&&t[e+1]===">"){r.push({t:"punct",v:"/>"}),e+=2,n=!1;continue}if(s===">"){r.push({t:"punct",v:">"}),e++,n=!1;continue}if(s==='"'||s==="'"){let c=e+1;for(;c<o&&t[c]!==s;)c++;r.push({t:"string",v:t.slice(e,Math.min(c+1,o))}),e=Math.min(c+1,o);continue}if(s==="="){r.push({t:"operator",v:"="}),e++;continue}if(/[\w@:.\-]/.test(s)){let c=e;for(;c<o&&/[\w@:.\-]/.test(t[c]);)c++;const i=t.slice(e,c),l=/^(v-|:|@|#)/.test(i);r.push({t:l?"attr-dir":"attr",v:i}),e=c;continue}r.push({t:"punct",v:s}),e++}else{if(t.startsWith("<!--",e)){const c=t.indexOf("-->",e),i=c===-1?o:c+3;r.push({t:"comment",v:t.slice(e,i)}),e=i;continue}if(t[e]==="<"){let c=e+1;t[c]==="/"&&c++;let l=c;for(;l<o&&/[\w:.-]/.test(t[l]);)l++;if(l>c){r.push({t:"punct",v:t.slice(e,c)}),r.push({t:"tag",v:t.slice(c,l)}),e=l,n=!0;continue}r.push({t:"punct",v:"<"}),e++;continue}let s=e;for(;s<o&&t[s]!=="<";)s++;r.push({t:"text",v:t.slice(e,s)}),e=s;continue}return r}function N(t){const r=[],o=t.length;let e=0;for(;e<o;){const n=t[e];if(/\s/.test(n)){let s=e;for(;s<o&&/\s/.test(t[s]);)s++;r.push({t:"ws",v:t.slice(e,s)}),e=s;continue}if(n==="/"&&t[e+1]==="*"){const s=t.indexOf("*/",e+2),c=s===-1?o:s+2;r.push({t:"comment",v:t.slice(e,c)}),e=c;continue}if(n==='"'||n==="'"){let s=e+1;for(;s<o&&t[s]!==n;)t[s]==="\\"&&s++,s++;r.push({t:"string",v:t.slice(e,Math.min(s+1,o))}),e=Math.min(s+1,o);continue}if(n==="@"){let s=e+1;for(;s<o&&/[\w-]/.test(t[s]);)s++;r.push({t:"keyword",v:t.slice(e,s)}),e=s;continue}if(/[0-9]/.test(n)||n==="."&&/[0-9]/.test(t[e+1]||"")){let s=e;for(;s<o&&/[0-9.]/.test(t[s]);)s++;for(;s<o&&/[a-z%]/i.test(t[s]);)s++;r.push({t:"number",v:t.slice(e,s)}),e=s;continue}if(/[.#&]/.test(n)||/[A-Za-z_-]/.test(n)){let s=e;for(/[.#&]/.test(n)&&s++;s<o&&/[\w-]/.test(t[s]);)s++;const c=t.slice(e,s);let i="plain";if(/^[.#&]/.test(c))i="type";else{let l=s;for(;l<o&&/\s/.test(t[l]);)l++;t[l]==="("?i="function":t[l]===":"&&(i="property")}r.push({t:i,v:c}),e=s;continue}r.push({t:"punct",v:n}),e++}return r}function S(t,r){switch(r){case"js":return u(t,{line:"//",block:!0,template:!0,decorators:!0,kw:x,ctrl:y,cst:w});case"python":return u(t,{line:"#",triple:!0,decorators:!0,kw:_,ctrl:k,cst:C});case"shell":return u(t,{line:"#",dollar:!0,kw:E,ctrl:p(""),cst:A});case"json":return u(t,{jsonKeys:!0,kw:p(""),ctrl:p(""),cst:p("true false null")});case"markup":return j(t);case"css":return N(t);default:return[{t:"plain",v:t}]}}function L(t){const r=[[]];for(const o of t)o.v.split(`
`).forEach((n,s)=>{s>0&&r.push([]),n&&r[r.length-1].push({t:o.t,v:n})});return r}function T(t){const r=new Set;for(const o of(t||"").split(",")){const e=o.trim().match(/^(\d+)(?:-(\d+))?$/);if(!e)continue;const n=+e[1],s=e[2]?+e[2]:n;for(let c=n;c<=s;c++)r.add(c)}return r}const $=`// hover to move the spotlight
export function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

const log = debounce(console.log, 300);
log('ready');`,z=`
  .glc {
    --r: var(--ctrl-r-rounded, 12px);
    --gx: 50%;
    --gy: 50%;
    --glow-r: 220px;
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid var(--border, #2a2a2a);
    border-radius: var(--r);
    background: var(--bg-elevated, #0e0e0e);
    color: var(--text, #ededed);
    overflow: hidden;
    font-family: var(--font-mono, ui-monospace, monospace);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.5);
    transition: border-color 220ms ease;

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
  .glc.is-active { border-color: color-mix(in srgb, var(--vs-color, var(--accent, #5b8cff)) 55%, var(--border, #2a2a2a)); }

  .glc--r-subtle { --r: var(--ctrl-r-subtle, 8px); }
  .glc--r-rounded { --r: var(--ctrl-r-rounded, 12px); }
  @supports (corner-shape: squircle) {
    .glc--r-squircle { --r: var(--ctrl-r-squircle, 18px); corner-shape: squircle; }
  }

  /* cursor-tracking radial spotlight — self-animated glow, kept out of flow */
  .glc__spot {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0;
    background: radial-gradient(
      var(--glow-r) circle at var(--gx) var(--gy),
      color-mix(in srgb, var(--vs-color, var(--accent, #5b8cff)) 22%, transparent),
      transparent 70%
    );
    transition: opacity 260ms ease;
  }
  .glc.is-active .glc__spot { opacity: 1; }

  .glc__bar {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 36px;
    padding: 0 12px;
    background: color-mix(in srgb, var(--bg-elevated, #0e0e0e) 82%, #000);
    border-bottom: 1px solid var(--border, #2a2a2a);
    flex: none;
  }
  .glc__traffic { display: inline-flex; gap: 7px; flex: none; }
  .glc__dot { width: 11px; height: 11px; border-radius: 50%; display: block; }
  .glc__dot--r { background: #ff5f57; }
  .glc__dot--y { background: #febc2e; }
  .glc__dot--g { background: #28c840; }
  .glc__file {
    font-size: 12.5px; font-weight: 500;
    color: color-mix(in srgb, var(--text, #ededed) 78%, transparent);
    margin: 0 auto; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 55%;
  }
  .glc__lang {
    font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em;
    padding: 2px 7px; border-radius: 5px;
    color: var(--vs-color, var(--accent, #5b8cff));
    background: color-mix(in srgb, var(--vs-color, var(--accent, #5b8cff)) 14%, transparent);
    flex: none;
  }
  .glc__copy {
    flex: none; font-family: inherit; font-size: 11px;
    padding: 4px 9px; border-radius: 6px; border: none; cursor: pointer;
    color: color-mix(in srgb, var(--text, #ededed) 70%, transparent);
    background: color-mix(in srgb, var(--text, #ededed) 8%, transparent);
    transition: background-color 160ms ease, color 160ms ease;
  }
  .glc__copy:hover { color: var(--text, #ededed); background: color-mix(in srgb, var(--text, #ededed) 16%, transparent); }
  .glc__copy.is-copied { color: #2ecc71; }
  .glc__copy:focus-visible { outline: 2px solid var(--vs-color, var(--accent, #5b8cff)); outline-offset: 1px; }

  .glc__body { position: relative; z-index: 1; overflow: auto; scrollbar-width: thin; }
  .glc__pre { margin: 0; }
  .glc__code {
    display: block; padding: 14px 0;
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 13px; line-height: 1.65; tab-size: 2;
  }
  .glc__line { display: flex; min-height: 1.65em; }
  .glc__line.is-hl { background: color-mix(in srgb, var(--vs-color, var(--accent, #5b8cff)) 10%, transparent); box-shadow: inset 2px 0 0 var(--vs-color, var(--accent, #5b8cff)); }
  .glc__ln {
    flex: none; width: 3.2em; padding-right: 1em; text-align: right;
    color: color-mix(in srgb, var(--text, #ededed) 35%, transparent);
    user-select: none; font-variant-numeric: tabular-nums;
  }
  .glc__lc { flex: 1; padding: 0 18px 0 0; white-space: pre; }
  .glc--wrap .glc__lc { white-space: pre-wrap; word-break: break-word; }
  .glc:not(.glc--wrap) .glc__line { width: max-content; min-width: 100%; }

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
    .glc, .glc__spot, .glc__copy { transition: none; }
  }
`;let h;function M(t){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=t;const r=h.fillStyle;if(r.charAt(0)==="#")return[parseInt(r.slice(1,3),16),parseInt(r.slice(3,5),16),parseInt(r.slice(5,7),16)];const o=r.match(/[\d.]+/g);return o&&o.length>=3?[+o[0],+o[1],+o[2]]:null}const O=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function g(t,r){const o=r?M(String(r).trim()):null;if(!o){for(const a of O)t.style.removeProperty(a);return}const e=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),s=.2126*e(o[0])+.7152*e(o[1])+.0722*e(o[2])>.45,c=`rgb(${o[0]} ${o[1]} ${o[2]})`,i=o.map(a=>Math.round(s?a*.92:a+(255-a)*.16)),l=(a,d)=>t.style.setProperty(a,d);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(a,c);l("--btn-primary-bg-hover",`rgb(${i[0]} ${i[1]} ${i[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(a,o.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(a,s?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])l(a,s?"0 0 0":"255 255 255");l("--vs-color",c),l("--vs-color-rgb",o.join(" ")),l("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class P extends HTMLElement{static observedAttributes=["code","language","filename","theme","titlebar","traffic","line-numbers","copyable","wrap","highlight-lines","max-height","radius","spotlight","glow-radius","color"];#t;#a;#i;#d;#s;#e;#c;#p;#h=!1;#n=0;#u=null;#r=null;#f;#g;#m;#l;#o=0;constructor(){super();const r=this.attachShadow({mode:"open"}),o=document.createElement("style");o.textContent=z,this.#t=document.createElement("div"),this.#t.className="glc",this.#a=document.createElement("span"),this.#a.className="glc__spot",this.#a.setAttribute("aria-hidden","true"),this.#i=document.createElement("div"),this.#i.className="glc__bar";const e=document.createElement("span");e.className="glc__traffic",e.setAttribute("aria-hidden","true");for(const s of["r","y","g"]){const c=document.createElement("i");c.className=`glc__dot glc__dot--${s}`,e.appendChild(c)}this.#d=document.createElement("span"),this.#d.className="glc__file",this.#s=document.createElement("span"),this.#s.className="glc__lang",this.#s.setAttribute("aria-hidden","true"),this.#e=document.createElement("button"),this.#e.type="button",this.#e.className="glc__copy",this.#e.addEventListener("click",()=>this.#_()),this.#i.append(e,this.#d,this.#s,this.#e),this.#i.__traffic=e,this.#c=document.createElement("div"),this.#c.className="glc__body";const n=document.createElement("pre");n.className="glc__pre",this.#p=document.createElement("code"),this.#p.className="glc__code",n.appendChild(this.#p),this.#c.appendChild(n),this.#t.append(this.#a,this.#i,this.#c),r.append(o,this.#t),this.#f=s=>{this.hasAttribute("spotlight")&&(this.#u=s,this.#n||(this.#n=requestAnimationFrame(()=>{this.#n=0;const c=this.#u;c&&(this.#r||(this.#r=this.#t.getBoundingClientRect()),this.#t.style.setProperty("--gx",`${c.clientX-this.#r.left}px`),this.#t.style.setProperty("--gy",`${c.clientY-this.#r.top}px`))})))},this.#g=()=>{this.hasAttribute("spotlight")&&(this.#r=null,this.#h=!0,this.#t.classList.add("is-active"))},this.#m=()=>{this.#h=!1,this.#t.classList.remove("is-active")},this.#l=()=>{this.#r=null},this.#t.addEventListener("mouseenter",this.#g),this.#t.addEventListener("mousemove",this.#f),this.#t.addEventListener("mouseleave",this.#m)}connectedCallback(){g(this,this.getAttribute("color")),this.#b(),addEventListener("scroll",this.#l,{passive:!0,capture:!0}),addEventListener("resize",this.#l,{passive:!0})}disconnectedCallback(){removeEventListener("scroll",this.#l,{capture:!0}),removeEventListener("resize",this.#l),this.#n&&(cancelAnimationFrame(this.#n),this.#n=0),this.#o&&(clearTimeout(this.#o),this.#o=0)}attributeChangedCallback(){g(this,this.getAttribute("color")),this.#t&&this.#b()}set code(r){r==null?this.removeAttribute("code"):this.setAttribute("code",r)}get code(){return this.getAttribute("code")??""}#v(){const r=this.getAttribute("code");if(r&&r.length)return r;const o=this.textContent;return o&&o.trim().length?o.replace(/^\n/,""):$}#y(r,o){const e=this.getAttribute(r);return e==null?o:e!=="false"}#b(){const r=(m,v)=>this.getAttribute(m)??v,o=r("radius","rounded"),e=this.#y("wrap",!1);this.#t.className=`glc glc--r-${o}${e?" glc--wrap":""}${this.#h?" is-active":""}`,this.#t.style.setProperty("--glow-r",`${r("glow-radius","220")}px`),this.#i.style.display=this.hasAttribute("titlebar")?"":"none",this.#i.__traffic.style.display=this.hasAttribute("traffic")?"":"none",this.#d.textContent=r("filename","glow.js");const n=r("language","js");this.#s.textContent=n;const s=this.hasAttribute("copyable");this.#e.style.display=s?"":"none",this.#e.classList.contains("is-copied")||(this.#e.textContent="copy",this.#e.setAttribute("aria-label","Copy code"));const c=+r("max-height","0");this.#c.style.maxHeight=c>0?`${c}px`:"";const i=b[n.toLowerCase()]??"plain",l=L(S(this.#v(),i)),a=T(r("highlight-lines","")),d=this.hasAttribute("line-numbers");this.#w(l,a,d)}#w(r,o,e){const n=this.#p;n.textContent="",r.forEach((s,c)=>{const i=document.createElement("span");if(i.className=`glc__line${o.has(c+1)?" is-hl":""}`,e){const a=document.createElement("span");a.className="glc__ln",a.setAttribute("aria-hidden","true"),a.textContent=String(c+1),i.appendChild(a)}const l=document.createElement("span");l.className="glc__lc";for(const a of s){const d=document.createElement("span");d.className=`t-${a.t}`,d.textContent=a.v,l.appendChild(d)}l.appendChild(document.createTextNode(`
`)),i.appendChild(l),n.appendChild(i)})}#x(r){const o=document.createElement("textarea");o.value=r,o.style.position="fixed",o.style.opacity="0",document.body.appendChild(o),o.select();try{document.execCommand("copy")}finally{o.remove()}}async#_(){const r=this.#v();try{navigator.clipboard?.writeText?await navigator.clipboard.writeText(r):this.#x(r)}catch{this.#x(r)}this.#e.classList.add("is-copied"),this.#e.textContent="✓",this.#e.setAttribute("aria-label","Copied"),this.#o&&clearTimeout(this.#o),this.#o=setTimeout(()=>{this.#e.classList.remove("is-copied"),this.#e.textContent="copy",this.#e.setAttribute("aria-label","Copy code")},1400),this.dispatchEvent(new CustomEvent("copy",{bubbles:!0,composed:!0,detail:{code:r}}))}}customElements.define("vs-code-glow",P);
