const S=`type User = {
  id: string;
  name: string;
  admin?: boolean;
};

const isAdmin = (u: User) => u.admin === true;`,N={ts:"js",tsx:"js",typescript:"js",js:"js",jsx:"js",javascript:"js",vue:"markup",html:"markup",xml:"markup",svg:"markup",markup:"markup",css:"css",scss:"css",less:"css",sass:"css",json:"json",json5:"json",jsonc:"json",bash:"shell",sh:"shell",shell:"shell",zsh:"shell",py:"python",python:"python",plain:"plain",text:"plain",txt:"plain"},p=t=>new Set(t.split(/\s+/).filter(Boolean)),j=p("const let var function return new class import export from default async await try catch type interface extends"),T=p("if else for while do switch case break continue return await yield throw in of"),H=p("true false null undefined NaN this super"),L=p("def class import from return lambda pass yield with as print global"),M=p("if elif else for while try except finally and or not in is break continue"),O=p("True False None self cls"),V=p("if then fi else elif for do done while case esac function in export local npm npx node yarn git cd"),$=p("true false"),x=t=>/[\w$]/.test(t);function g(t,n){const s=[],e=t.length;let r=0;const o=()=>{for(let c=s.length-1;c>=0;c--)if(s[c].t!=="ws")return s[c];return null};for(;r<e;){const c=t[r];if(/\s/.test(c)){let i=r;for(;i<e&&/\s/.test(t[i]);)i++;s.push({t:"ws",v:t.slice(r,i)}),r=i;continue}if(n.block&&c==="/"&&t[r+1]==="*"){const i=t.indexOf("*/",r+2),l=i===-1?e:i+2;s.push({t:"comment",v:t.slice(r,l)}),r=l;continue}if(n.line&&t.startsWith(n.line,r)){let i=r;for(;i<e&&t[i]!==`
`;)i++;s.push({t:"comment",v:t.slice(r,i)}),r=i;continue}if(n.triple&&(t.startsWith('"""',r)||t.startsWith("'''",r))){const i=t.substr(r,3),l=t.indexOf(i,r+3),a=l===-1?e:l+3;s.push({t:"string",v:t.slice(r,a)}),r=a;continue}if(n.template&&c==="`"){let i=r+1;for(;i<e&&t[i]!=="`";)t[i]==="\\"&&i++,i++;s.push({t:"string",v:t.slice(r,Math.min(i+1,e))}),r=Math.min(i+1,e);continue}if(c==='"'||c==="'"){let i=r+1;for(;i<e&&t[i]!==c&&t[i]!==`
`;)t[i]==="\\"&&i++,i++;const l=Math.min(i+1,e),a={t:"string",v:t.slice(r,l)};if(r=l,n.jsonKeys){let h=r;for(;h<e&&/\s/.test(t[h]);)h++;t[h]===":"&&(a.t="property")}s.push(a);continue}if(n.dollar&&c==="$"){let i=r+1;if(t[i]==="{"){const l=t.indexOf("}",i);i=l===-1?e:l+1}else for(;i<e&&x(t[i]);)i++;s.push({t:"variable",v:t.slice(r,i)}),r=i;continue}if(n.decorators&&c==="@"&&/[A-Za-z_]/.test(t[r+1]||"")){let i=r+1;for(;i<e&&x(t[i]);)i++;s.push({t:"decorator",v:t.slice(r,i)}),r=i;continue}if(/[0-9]/.test(c)||c==="."&&/[0-9]/.test(t[r+1]||"")){let i=r;if(c==="0"&&/[xXbBoO]/.test(t[r+1]||""))for(i=r+2;i<e&&/[0-9a-fA-F_]/.test(t[i]);)i++;else for(;i<e&&/[0-9_.eE]/.test(t[i]);)i++;s.push({t:"number",v:t.slice(r,i)}),r=i;continue}if(/[A-Za-z_$]/.test(c)){let i=r;for(;i<e&&x(t[i]);)i++;const l=t.slice(r,i);let a="variable";if(n.ctrl.has(l))a="control";else if(n.kw.has(l))a="keyword";else if(n.cst.has(l))a="const";else{let h=i;for(;h<e&&/\s/.test(t[h]);)h++;t[h]==="("?a="function":o()?.v==="."?a="property":/^[A-Z]/.test(l)&&(a="type")}s.push({t:a,v:l}),r=i;continue}if("+-*/%=<>!&|^~?:".includes(c)){let i=r;for(;i<e&&"+-*/%=<>!&|^~?:".includes(t[i]);)i++;s.push({t:"operator",v:t.slice(r,i)}),r=i;continue}s.push({t:"punct",v:c}),r++}return s}function z(t){const n=[],s=t.length;let e=0,r=!1;for(;e<s;)if(r){const o=t[e];if(/\s/.test(o)){let c=e;for(;c<s&&/\s/.test(t[c]);)c++;n.push({t:"ws",v:t.slice(e,c)}),e=c;continue}if(o==="/"&&t[e+1]===">"){n.push({t:"punct",v:"/>"}),e+=2,r=!1;continue}if(o===">"){n.push({t:"punct",v:">"}),e++,r=!1;continue}if(o==='"'||o==="'"){let c=e+1;for(;c<s&&t[c]!==o;)c++;n.push({t:"string",v:t.slice(e,Math.min(c+1,s))}),e=Math.min(c+1,s);continue}if(o==="="){n.push({t:"operator",v:"="}),e++;continue}if(/[\w@:.\-]/.test(o)){let c=e;for(;c<s&&/[\w@:.\-]/.test(t[c]);)c++;const i=t.slice(e,c),l=/^(v-|:|@|#)/.test(i);n.push({t:l?"attr-dir":"attr",v:i}),e=c;continue}n.push({t:"punct",v:o}),e++}else{if(t.startsWith("<!--",e)){const c=t.indexOf("-->",e),i=c===-1?s:c+3;n.push({t:"comment",v:t.slice(e,i)}),e=i;continue}if(t[e]==="<"){let c=e+1;t[c]==="/"&&c++;let l=c;for(;l<s&&/[\w:.-]/.test(t[l]);)l++;if(l>c){n.push({t:"punct",v:t.slice(e,c)}),n.push({t:"tag",v:t.slice(c,l)}),e=l,r=!0;continue}n.push({t:"punct",v:"<"}),e++;continue}let o=e;for(;o<s&&t[o]!=="<";)o++;n.push({t:"text",v:t.slice(e,o)}),e=o;continue}return n}function I(t){const n=[],s=t.length;let e=0;for(;e<s;){const r=t[e];if(/\s/.test(r)){let o=e;for(;o<s&&/\s/.test(t[o]);)o++;n.push({t:"ws",v:t.slice(e,o)}),e=o;continue}if(r==="/"&&t[e+1]==="*"){const o=t.indexOf("*/",e+2),c=o===-1?s:o+2;n.push({t:"comment",v:t.slice(e,c)}),e=c;continue}if(r==='"'||r==="'"){let o=e+1;for(;o<s&&t[o]!==r;)t[o]==="\\"&&o++,o++;n.push({t:"string",v:t.slice(e,Math.min(o+1,s))}),e=Math.min(o+1,s);continue}if(r==="@"){let o=e+1;for(;o<s&&/[\w-]/.test(t[o]);)o++;n.push({t:"keyword",v:t.slice(e,o)}),e=o;continue}if(/[0-9]/.test(r)||r==="."&&/[0-9]/.test(t[e+1]||"")){let o=e;for(;o<s&&/[0-9.]/.test(t[o]);)o++;for(;o<s&&/[a-z%]/i.test(t[o]);)o++;n.push({t:"number",v:t.slice(e,o)}),e=o;continue}if(/[.#&]/.test(r)||/[A-Za-z_-]/.test(r)){let o=e;for(/[.#&]/.test(r)&&o++;o<s&&/[\w-]/.test(t[o]);)o++;const c=t.slice(e,o);let i="plain";if(/^[.#&]/.test(c))i="type";else{let l=o;for(;l<s&&/\s/.test(t[l]);)l++;t[l]==="("?i="function":t[l]===":"&&(i="property")}n.push({t:i,v:c}),e=o;continue}n.push({t:"punct",v:r}),e++}return n}function W(t,n){switch(n){case"js":return g(t,{line:"//",block:!0,template:!0,decorators:!0,kw:j,ctrl:T,cst:H});case"python":return g(t,{line:"#",triple:!0,decorators:!0,kw:L,ctrl:M,cst:O});case"shell":return g(t,{line:"#",dollar:!0,kw:V,ctrl:p(""),cst:$});case"json":return g(t,{jsonKeys:!0,kw:p(""),ctrl:p(""),cst:p("true false null")});case"markup":return z(t);case"css":return I(t);default:return[{t:"plain",v:t}]}}function Z(t){const n=[[]];for(const s of t)s.v.split(`
`).forEach((r,o)=>{o>0&&n.push([]),r&&n[n.length-1].push({t:s.t,v:r})});return n}function B(t){const n=new Set;if(Array.isArray(t)){for(const s of t){const e=+s;e&&n.add(e)}return n}for(const s of String(t||"").split(",")){const e=s.trim().match(/^(\d+)(?:-(\d+))?$/);if(!e)continue;const r=+e[1],o=e[2]?+e[2]:r;for(let c=r;c<=o;c++)n.add(c)}return n}const w="http://www.w3.org/2000/svg";function _(t){const n=document.createElementNS(w,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("aria-hidden","true");for(const s of t){const e=document.createElementNS(w,"path");e.setAttribute("d",s),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),n.appendChild(e)}return n}const K=["M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z","M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"],P=["M22 11.1V6.9C22 3.4 20.6 2 17.1 2H12.9C9.4 2 8 3.4 8 6.9V8H11.1C14.6 8 16 9.4 16 12.9V16H17.1C20.6 16 22 14.6 22 11.1Z","M16 17.1V12.9C16 9.4 14.6 8 11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1Z","M6.08008 15.0008L8.03008 16.9508L11.9201 13.0508"],q=`
  :host { display: block; width: 100%; }
  .mcx {
    --r: var(--ctrl-r-subtle, 8px);
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid color-mix(in srgb, var(--border, #2a2a2a) 60%, transparent);
    border-radius: var(--r);
    background: color-mix(in srgb, var(--bg-elevated, #0e0e0e) 60%, transparent);
    color: var(--text, #ededed);
    overflow: hidden;
    font-family: var(--font-mono, ui-monospace, monospace);

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

  .mcx--r-subtle { --r: var(--ctrl-r-subtle, 8px); }
  .mcx--r-rounded { --r: var(--ctrl-r-rounded, 12px); }
  @supports (corner-shape: squircle) {
    .mcx--r-squircle { --r: var(--ctrl-r-squircle, 18px); corner-shape: squircle; }
  }

  .mcx__bar {
    display: flex; align-items: center; gap: 9px;
    height: 32px; padding: 0 12px;
    border-bottom: 1px solid color-mix(in srgb, var(--border, #2a2a2a) 50%, transparent);
    flex: none;
  }
  .mcx__traffic { display: inline-flex; gap: 6px; flex: none; }
  .mcx__dot {
    width: 9px; height: 9px; border-radius: 50%; display: block;
    background: color-mix(in srgb, var(--text, #ededed) 22%, transparent);
  }
  .mcx__file {
    font-size: 12px;
    color: color-mix(in srgb, var(--text, #ededed) 55%, transparent);
  }

  /* floating language badge */
  .mcx__lang {
    position: absolute;
    top: 8px; right: 8px;
    z-index: 3;
    font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em;
    color: color-mix(in srgb, var(--text, #ededed) 40%, transparent);
    pointer-events: none;
    transition: opacity 180ms ease;
  }
  .mcx--bar .mcx__lang { display: none; }
  .mcx:hover .mcx__lang { opacity: 0; }

  /* floating copy — fades in on hover */
  .mcx__copy {
    position: absolute;
    top: 6px; right: 8px;
    z-index: 4;
    display: inline-flex; align-items: center; justify-content: center;
    width: 26px; height: 26px; padding: 0;
    border: none; border-radius: 6px; cursor: pointer;
    color: color-mix(in srgb, var(--text, #ededed) 65%, transparent);
    background: color-mix(in srgb, var(--text, #ededed) 8%, transparent);
    opacity: 0;
    transition: opacity 180ms ease, background-color 160ms ease, color 160ms ease;
  }
  .mcx--bar .mcx__copy { top: 4px; }
  .mcx__copy svg { width: 15px; height: 15px; }
  .mcx:hover .mcx__copy { opacity: 1; }
  .mcx__copy:hover { color: var(--text, #ededed); background: color-mix(in srgb, var(--text, #ededed) 16%, transparent); }
  .mcx__copy.is-copied { opacity: 1; color: #2ecc71; }
  .mcx__copy:focus-visible { opacity: 1; outline: 2px solid var(--vs-color, var(--accent, #5b8cff)); outline-offset: 1px; }

  .mcx__body { overflow: auto; scrollbar-width: thin; }
  .mcx__pre { margin: 0; }
  .mcx__code {
    display: block; padding: 14px 0;
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 13px; line-height: 1.6; tab-size: 2;
  }
  .mcx__line { display: flex; min-height: 1.6em; }
  .mcx__line.is-hl { background: color-mix(in srgb, var(--vs-color, var(--accent, #5b8cff)) 8%, transparent); }
  .mcx__ln {
    flex: none; width: 3em; padding-right: 1em; text-align: right;
    color: color-mix(in srgb, var(--text, #ededed) 28%, transparent);
    user-select: none; font-variant-numeric: tabular-nums;
  }
  .mcx__lc { flex: 1; padding: 0 18px 0 0; white-space: pre; }
  .mcx--wrap .mcx__lc { white-space: pre-wrap; word-break: break-word; }
  .mcx:not(.mcx--wrap) .mcx__line { width: max-content; min-width: 100%; }

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
  .mcx__slot { display: none; }

  @media (prefers-reduced-motion: reduce) {
    .mcx__lang, .mcx__copy { transition: none; }
  }
`;let d;function R(t){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=t;const n=d.fillStyle;if(n.charAt(0)==="#")return[parseInt(n.slice(1,3),16),parseInt(n.slice(3,5),16),parseInt(n.slice(5,7),16)];const s=n.match(/[\d.]+/g);return s&&s.length>=3?[+s[0],+s[1],+s[2]]:null}const D=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function k(t,n){const s=n?R(String(n).trim()):null;if(!s){for(const a of D)t.style.removeProperty(a);return}const e=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),o=.2126*e(s[0])+.7152*e(s[1])+.0722*e(s[2])>.45,c=`rgb(${s[0]} ${s[1]} ${s[2]})`,i=s.map(a=>Math.round(o?a*.92:a+(255-a)*.16)),l=(a,h)=>t.style.setProperty(a,h);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(a,c);l("--btn-primary-bg-hover",`rgb(${i[0]} ${i[1]} ${i[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(a,s.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(a,o?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])l(a,o?"0 0 0":"255 255 255");l("--vs-color",c),l("--vs-color-rgb",s.join(" ")),l("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class F extends HTMLElement{static observedAttributes=["code","language","filename","theme","titlebar","traffic","line-numbers","copyable","wrap","highlight-lines","max-height","radius","lang-badge","color"];#a=null;#x=null;#v=null;#m=null;#h;#e;#p;#s;#t;#u;#r;#o;#d;#c;#l;#n=null;#f;#g;constructor(){super();const n=this.attachShadow({mode:"open"}),s=document.createElement("style");s.textContent=q,this.#h=document.createElement("div"),this.#e=document.createElement("div"),this.#e.className="mcx__bar";const e=document.createElement("span");e.className="mcx__traffic",e.setAttribute("aria-hidden","true");for(let r=0;r<3;r++){const o=document.createElement("i");o.className="mcx__dot",e.appendChild(o)}this.#p=document.createElement("span"),this.#p.className="mcx__file",this.#e.append(e,this.#p),this.#e._traffic=e,this.#s=document.createElement("span"),this.#s.className="mcx__lang",this.#s.setAttribute("aria-hidden","true"),this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="mcx__copy",this.#u=_(K),this.#r=_(P),this.#r.style.display="none",this.#t.append(this.#u,this.#r),this.#o=document.createElement("div"),this.#o.className="mcx__body",this.#d=document.createElement("pre"),this.#d.className="mcx__pre",this.#c=document.createElement("code"),this.#c.className="mcx__code",this.#d.appendChild(this.#c),this.#o.appendChild(this.#d),this.#l=document.createElement("slot"),this.#l.className="mcx__slot",this.#h.append(this.#e,this.#s,this.#t,this.#o,this.#l),n.append(s,this.#h),this.#f=()=>this.#_(),this.#g=()=>this.#i(),this.#t.addEventListener("click",this.#f),this.#l.addEventListener("slotchange",this.#g)}connectedCallback(){k(this,this.getAttribute("color")),this.#i()}disconnectedCallback(){this.#t.removeEventListener("click",this.#f),this.#l.removeEventListener("slotchange",this.#g),this.#n&&(clearTimeout(this.#n),this.#n=null)}attributeChangedCallback(){k(this,this.getAttribute("color")),this.#c&&this.#i()}get code(){return this.#a??this.getAttribute("code")??""}set code(n){this.#a=n==null?null:String(n),this.#i()}get language(){return this.#x??this.getAttribute("language")??"ts"}set language(n){this.#x=n==null?null:String(n),this.#i()}get filename(){return this.#v??this.getAttribute("filename")??""}set filename(n){this.#v=n==null?null:String(n),this.#i()}get highlightLines(){return this.#m??this.getAttribute("highlight-lines")??""}set highlightLines(n){this.#m=Array.isArray(n)?n.join(","):n==null?null:String(n),this.#i()}#b(n,s){return this.hasAttribute(n)?this.getAttribute(n)!=="false":s}#y(){if(this.#a)return this.#a;const n=this.getAttribute("code");if(n)return n;const s=(this.textContent||"").replace(/^\n+/,"").replace(/\s+$/,"");return s||S}#i(){const n=this.#b("titlebar",!1),s=this.#b("traffic",!1),e=this.hasAttribute("line-numbers"),r=this.hasAttribute("copyable"),o=this.#b("wrap",!1),c=this.hasAttribute("lang-badge"),i=this.getAttribute("radius")||"subtle",l=this.language,a=+(this.getAttribute("max-height")||0);this.#h.className=`mcx mcx--r-${i}`+(o?" mcx--wrap":"")+(n?" mcx--bar":""),this.#e.style.display=n?"":"none",this.#e._traffic.style.display=s?"":"none",this.#p.textContent=this.filename||l,this.#s.style.display=c?"":"none",this.#s.textContent=l,this.#t.style.display=r?"":"none",this.#o.style.maxHeight=a?a+"px":"";const h=N[l.toLowerCase()]??"plain",C=Z(W(this.#y(),h)),A=B(this.#m??this.getAttribute("highlight-lines")??""),v=document.createDocumentFragment();C.forEach((E,y)=>{const m=document.createElement("span");if(m.className="mcx__line"+(A.has(y+1)?" is-hl":""),e){const u=document.createElement("span");u.className="mcx__ln",u.setAttribute("aria-hidden","true"),u.textContent=String(y+1),m.appendChild(u)}const f=document.createElement("span");f.className="mcx__lc";for(const u of E){const b=document.createElement("span");b.className=`t-${u.t}`,b.textContent=u.v,f.appendChild(b)}f.appendChild(document.createTextNode(`
`)),m.appendChild(f),v.appendChild(m)}),this.#c.replaceChildren(v)}async#_(){const n=this.#y();try{navigator.clipboard?.writeText?await navigator.clipboard.writeText(n):this.#w(n)}catch{this.#w(n)}this.#t.classList.add("is-copied"),this.#t.setAttribute("aria-label","Copied"),this.#u.style.display="none",this.#r.style.display="",this.#n&&clearTimeout(this.#n),this.#n=setTimeout(()=>{this.#t.classList.remove("is-copied"),this.#t.setAttribute("aria-label","Copy code"),this.#u.style.display="",this.#r.style.display="none",this.#n=null},1400),this.dispatchEvent(new CustomEvent("copy",{bubbles:!0,composed:!0,detail:{code:n}}))}#w(n){const s=document.createElement("textarea");s.value=n,s.style.position="fixed",s.style.opacity="0",document.body.appendChild(s),s.select();try{document.execCommand("copy")}finally{s.remove()}}}customElements.define("vs-code-minimal",F);
