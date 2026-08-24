const b="http://www.w3.org/2000/svg",x={chevron:["M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"],folder:["M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z","M8 2H17C19 2 20 3 20 5V6.38"],code:["M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z","M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5","M10 13L8 15L10 17","M14 13L16 15L14 17"],text:["M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z","M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5","M8 13H12","M8 17H16"],file:["M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14","M22 10H18C15 10 14 9 14 6V2L22 10Z"]};function v(d){const t=document.createElementNS(b,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none");for(const e of x[d]){const s=document.createElementNS(b,"path");s.setAttribute("d",e),t.appendChild(s)}return t}function y(d){const t=(d.split(".").pop()||"").toLowerCase();return["ts","tsx","js","jsx","vue","mjs","cjs"].includes(t)?"code":t==="json"?"file":["md","mdx","txt","css"].includes(t)?"text":"file"}const C=[{id:"src",name:"src",type:"folder",defaultOpen:!0,children:[{id:"components",name:"components",type:"folder",defaultOpen:!0,children:[{id:"button",name:"VsButton.vue"},{id:"tree",name:"VsFileTree.vue",highlight:!0},{id:"input",name:"VsInput.vue"}]},{id:"lib",name:"lib",type:"folder",children:[{id:"effects",name:"effects",type:"folder",children:[{id:"press",name:"usePress.ts"},{id:"glow",name:"useProximityGlow.ts"}]},{id:"utils",name:"utils.ts"}]},{id:"styles",name:"tokens.css"},{id:"main",name:"main.ts"}]},{id:"readme",name:"README.md"},{id:"pkg",name:"package.json"}],A=`
  :host { display: block; }
  .gl {
    --rr: 14px;
    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 340px;
    border: 1px solid var(--border, #2a2a2a);
    border-radius: var(--rr);
    background: var(--bg-card, #111);
    color: var(--text, #ededed);
    font-size: var(--ctrl-fs-sm, 13.5px);
  }
  .gl--r-subtle { --rr: 8px; }
  .gl--r-pill { --rr: 22px; }
  @supports (corner-shape: squircle) { .gl--r-squircle { corner-shape: squircle; --rr: 22px; } }

  .gl__body {
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: var(--border, #2a2a2a) transparent;
  }
  .gl__body::-webkit-scrollbar { width: 6px; }
  .gl__body::-webkit-scrollbar-thumb { background: var(--border, #2a2a2a); border-radius: 999px; }

  .gl-row {
    --mx: 50%; --my: 50%; --lit: 0;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 9px;
    border-radius: 9px;
    cursor: pointer;
    user-select: none;
    color: color-mix(in srgb, var(--text, #ededed) calc(55% + 45% * var(--lit)), var(--text-muted, #8a8a8a));
    transition: color 200ms ease;
  }
  /* radial halo that follows the cursor inside the hovered row — absolute, out of flow */
  .gl-halo {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    background: radial-gradient(120px circle at var(--mx) var(--my),
      color-mix(in srgb, var(--gl-accent, var(--ui-accent, #ededed)) 22%, transparent), transparent 70%);
    transition: opacity 200ms ease;
    pointer-events: none;
  }
  .gl-row:hover .gl-halo,
  .gl-row:focus-visible .gl-halo { opacity: 1; }
  .gl-row:focus-visible { outline: none; }
  .gl-row:hover,
  .gl-row:focus-visible { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gl-accent, var(--ui-accent, #ededed)) 40%, transparent); }
  .gl-row.is-sel { box-shadow: inset 0 0 0 1px var(--gl-accent, var(--ui-accent, #ededed)); }
  .gl-row.is-hl { color: var(--gl-accent, var(--ui-accent, #ededed)); font-weight: 600; }

  .gl-chevron {
    display: inline-flex; flex: 0 0 14px; width: 14px; height: 14px;
    color: var(--text-muted, #8a8a8a);
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .gl-chevron svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.1; stroke-linecap: round; stroke-linejoin: round; }
  .gl-chevron.is-open { transform: rotate(90deg); }
  .gl-chevron--ghost { visibility: hidden; }

  .gl-icon { display: inline-flex; flex: 0 0 18px; width: 18px; height: 18px; color: var(--text-muted, #8a8a8a); }
  .gl-icon svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
  .gl-icon[hidden] { display: none; }
  .gl-row.is-hl .gl-icon { color: var(--gl-accent, var(--ui-accent, #ededed)); }

  .gl-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; position: relative; }

  .gl-children[hidden] { display: none; }

  .gl.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .gl-chevron, .gl-halo, .gl-row { transition: none !important; }
  }
`;let p;function E(d){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=d;const t=p.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const k=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function w(d,t){const e=t?E(String(t).trim()):null;if(!e){for(const n of k)d.style.removeProperty(n);return}const s=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),r=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(n=>Math.round(r?n*.92:n+(255-n)*.16)),i=(n,c)=>d.style.setProperty(n,c);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(n,o);i("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(n,r?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])i(n,r?"0 0 0":"255 255 255");i("--vs-color",o),i("--vs-color-rgb",e.join(" ")),i("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class L extends HTMLElement{static observedAttributes=["highlight-color","indent-size","show-icons","radius","disabled","glow","max-vh","glow-radius","color"];#y;#i;#e;#h=null;#u=[];#s=new Set;#k=null;#p=!1;#r=[];#n=[];#g=[];#f=[];#l=!1;#a=0;#d=0;#c=!1;#t=0;#m;#o;constructor(){super(),this.#y=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=A,this.#i=document.createElement("div"),this.#i.className="gl",this.#e=document.createElement("div"),this.#e.className="gl__body",this.#e.setAttribute("role","tree"),this.#i.appendChild(this.#e),this.#y.append(t,this.#i),this.#m=e=>this.#M(e),this.#o=()=>this.#L()}set elements(t){this.#h=Array.isArray(t)?t:null,this.isConnected&&this.#b()}get elements(){return this.#h}set defaultOpenIds(t){this.#u=Array.isArray(t)?t.slice():[],this.isConnected&&this.#b()}get defaultOpenIds(){return this.#u}connectedCallback(){w(this,this.getAttribute("color")),this.#p||this.#b(),this.#v(),window.addEventListener("pointermove",this.#m,{passive:!0}),window.addEventListener("scroll",this.#o,{passive:!0,capture:!0}),window.addEventListener("resize",this.#o,{passive:!0}),this.#w()}disconnectedCallback(){window.removeEventListener("pointermove",this.#m),window.removeEventListener("scroll",this.#o,{capture:!0}),window.removeEventListener("resize",this.#o),this.#t&&cancelAnimationFrame(this.#t),this.#t=0,this.#n=[],this.#g=[]}attributeChangedCallback(){w(this,this.getAttribute("color")),this.#p&&this.#v()}#b(){const t=this.#h??C;this.#s=new Set(this.#u);const e=s=>{for(const a of s)a.type==="folder"&&a.defaultOpen&&this.#s.add(a.id),a.children&&e(a.children)};e(t),this.#e.textContent="",this.#r=[],this.#C(t,0,this.#e,[]),this.#p=!0,this.#v(),this.#w()}#C(t,e,s,a){for(const r of t){const o=r.type==="folder",l=[...a,r.id],i=document.createElement("div");i.className="gl-row",i.setAttribute("role","treeitem"),r.highlight&&i.classList.add("is-hl"),i.dataset.id=r.id;const n=document.createElement("span");n.className="gl-halo",n.setAttribute("aria-hidden","true"),i.appendChild(n);const c=document.createElement("span");c.className=o?"gl-chevron":"gl-chevron gl-chevron--ghost",c.setAttribute("aria-hidden","true"),o&&c.appendChild(v("chevron")),i.appendChild(c);const u=document.createElement("span");u.className="gl-icon",u.setAttribute("aria-hidden","true"),u.appendChild(v(o?"folder":y(r.name))),i.appendChild(u);const f=document.createElement("span");f.className="gl-name",f.textContent=r.name,i.appendChild(f),s.appendChild(i);let h=null;o&&r.children&&r.children.length&&(h=document.createElement("div"),h.className="gl-children",h.setAttribute("role","group"),s.appendChild(h));const g={el:i,depth:e,isFolder:o,node:r,path:l,iconEl:u,chevronEl:c,childrenEl:h};this.#r.push(g),i.addEventListener("click",()=>this.#E(g)),i.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),this.#E(g))}),o&&this.#A(g,this.#s.has(r.id),!1),h&&this.#C(r.children,e+1,h,l)}}#v(){const t=this.getAttribute("radius")||"rounded",e=this.hasAttribute("disabled"),s=this.getAttribute("highlight-color")||"var(--ui-accent, #ededed)",a=Number(this.getAttribute("indent-size"))||16,r=this.hasAttribute("show-icons")?this.hasAttribute("show-icons"):!0,o=Number(this.getAttribute("max-vh"))||90;this.#i.className=`gl gl--r-${t}${e?" is-disabled":""}`,this.#i.style.setProperty("--gl-accent",s);const l=typeof window<"u"?Math.round(window.innerHeight*o/100):0;this.#e.style.maxHeight=l?l+"px":"";for(const i of this.#r)i.el.style.paddingLeft=i.depth*a+9+"px",i.el.tabIndex=e?-1:0,i.iconEl.hidden=!r}#A(t,e,s){t.isFolder&&(e?this.#s.add(t.node.id):this.#s.delete(t.node.id),t.chevronEl.classList.toggle("is-open",e),t.el.setAttribute("aria-expanded",String(e)),t.childrenEl&&(t.childrenEl.hidden=!e),s&&(this.dispatchEvent(new CustomEvent("toggle",{bubbles:!0,composed:!0,detail:{node:t.node,path:t.path,open:e}})),this.#w()))}#E(t){if(!this.hasAttribute("disabled"))if(t.isFolder)this.#A(t,!this.#s.has(t.node.id),!0);else{this.#k=t.node.id;for(const e of this.#r){const s=e===t;e.el.classList.toggle("is-sel",s),e.isFolder||e.el.setAttribute("aria-selected",String(s))}this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{node:t.node,path:t.path}}))}}#w(){this.#n=this.#r.map(t=>t.el).filter(t=>!t.closest("[hidden]")),this.#f=new Array(this.#n.length).fill(-1),this.#l=!1,this.#c&&!this.#t&&(this.#t=requestAnimationFrame(()=>this.#x()))}#L(){this.#l=!1,this.#c&&!this.#t&&(this.#t=requestAnimationFrame(()=>this.#x()))}#M(t){this.hasAttribute("disabled")||!this.hasAttribute("glow")||(this.#a=t.clientX,this.#d=t.clientY,this.#c=!0,this.#t||(this.#t=requestAnimationFrame(()=>this.#x())))}#x(){if(this.#t=0,!this.#c)return;this.#l||(this.#g=this.#n.map(e=>e.getBoundingClientRect()),this.#l=!0);const t=Number(this.getAttribute("glow-radius"))||150;for(let e=0;e<this.#n.length;e++){const s=this.#g[e],a=Math.max(0,s.left-this.#a,this.#a-s.right),r=Math.max(0,s.top-this.#d,this.#d-s.bottom),o=Math.max(0,1-Math.hypot(a,r)/t);if(o===0&&this.#f[e]===0)continue;const l=this.#n[e];l.style.setProperty("--mx",this.#a-s.left+"px"),l.style.setProperty("--my",this.#d-s.top+"px"),l.style.setProperty("--lit",o.toFixed(3)),this.#f[e]=o}}}customElements.define("vs-file-tree-glow",L);
