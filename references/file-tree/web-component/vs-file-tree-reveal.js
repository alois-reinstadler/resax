const b="http://www.w3.org/2000/svg",m={chevron:["M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"],folder:["M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z","M8 2H17C19 2 20 3 20 5V6.38"],code:["M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z","M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5","M10 13L8 15L10 17","M14 13L16 15L14 17"],text:["M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z","M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5","M8 13H12","M8 17H16"],file:["M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14","M22 10H18C15 10 14 9 14 6V2L22 10Z"]};function g(d){const e=document.createElementNS(b,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none");for(const t of d){const i=document.createElementNS(b,"path");i.setAttribute("d",t),e.appendChild(i)}return e}function C(d){const e=(d.split(".").pop()||"").toLowerCase();return["ts","tsx","js","jsx","vue","mjs","cjs"].includes(e)?"code":e==="json"?"file":["md","mdx","txt","css"].includes(e)?"text":"file"}const k=[{id:"src",name:"src",type:"folder",defaultOpen:!0,children:[{id:"components",name:"components",type:"folder",defaultOpen:!0,children:[{id:"button",name:"VsButton.vue"},{id:"tree",name:"VsFileTree.vue",highlight:!0},{id:"input",name:"VsInput.vue"}]},{id:"lib",name:"lib",type:"folder",children:[{id:"effects",name:"effects",type:"folder",children:[{id:"press",name:"usePress.ts"},{id:"glow",name:"useProximityGlow.ts"}]},{id:"utils",name:"utils.ts"}]},{id:"styles",name:"tokens.css"},{id:"main",name:"main.ts"}]},{id:"readme",name:"README.md"},{id:"pkg",name:"package.json"}],A=`
  :host { display: block; }
  .rv {
    --rr: 14px;
    position: relative; isolation: isolate; width: 100%; max-width: 340px;
    border: 1px solid var(--border, #2a2a2a); border-radius: var(--rr);
    background: var(--bg-card, #111); color: var(--text, #ededed);
    font-family: inherit; font-size: var(--ctrl-fs-sm, 13.5px);
  }
  .rv--r-subtle { --rr: 8px; }
  .rv--r-pill { --rr: 22px; }
  @supports (corner-shape: squircle) { .rv--r-squircle { corner-shape: squircle; --rr: 22px; } }

  .rv__body {
    padding: 8px; overflow-y: auto; overflow-x: hidden;
    scrollbar-width: thin; scrollbar-color: var(--border, #2a2a2a) transparent;
  }
  .rv__body::-webkit-scrollbar { width: 6px; }
  .rv__body::-webkit-scrollbar-thumb { background: var(--border, #2a2a2a); border-radius: 999px; }

  .rv-children[hidden] { display: none; }

  .rv-row {
    position: relative; display: flex; align-items: center; gap: 8px;
    padding: 7px 9px; border-radius: 9px; cursor: pointer; user-select: none;
    color: var(--text, #ededed);
    transition: background 160ms ease, color 160ms ease;
  }
  .rv-row:hover,
  .rv-row:focus-visible { background: color-mix(in srgb, var(--rv-accent, var(--ui-accent, #ededed)) 10%, transparent); outline: none; }
  .rv-row.is-sel { background: color-mix(in srgb, var(--rv-accent, var(--ui-accent, #ededed)) 17%, transparent); color: var(--rv-accent, var(--ui-accent, #ededed)); }
  .rv-row.is-hl { color: var(--rv-accent, var(--ui-accent, #ededed)); font-weight: 600; }

  /* cascading reveal: each row enters with fade + slide from the left.
     delay grows by sibling index (--i) times the stagger step. */
  .rv-row.is-reveal {
    animation: rv-reveal 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: calc(var(--i, 0) * var(--rv-stagger, 45ms));
  }
  @keyframes rv-reveal {
    from { opacity: 0; transform: translateX(-10px); filter: blur(4px); }
    to   { opacity: 1; transform: translateX(0); filter: blur(0); }
  }

  .rv-chevron {
    display: inline-flex; flex: 0 0 14px; width: 14px; height: 14px;
    color: var(--text-muted, #8a8a8a);
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .rv-chevron svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.1; stroke-linecap: round; stroke-linejoin: round; }
  .rv-chevron.is-open { transform: rotate(90deg); }
  .rv-chevron--ghost { visibility: hidden; }

  .rv-icon { display: inline-flex; flex: 0 0 18px; width: 18px; height: 18px; color: var(--text-muted, #8a8a8a); }
  .rv-icon[hidden] { display: none; }
  .rv-icon svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
  .rv-row.is-hl .rv-icon { color: var(--rv-accent, var(--ui-accent, #ededed)); }

  .rv-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .rv.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .rv-chevron, .rv-row { transition: none !important; }
    .rv-row.is-reveal { animation: none; }
  }
`;let u;function E(d){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=d;const e=u.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const L=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function w(d,e){const t=e?E(String(e).trim()):null;if(!t){for(const r of L)d.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),l=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,a=`rgb(${t[0]} ${t[1]} ${t[2]})`,s=t.map(r=>Math.round(l?r*.92:r+(255-r)*.16)),n=(r,h)=>d.style.setProperty(r,h);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(r,a);n("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(r,l?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])n(r,l?"0 0 0":"255 255 255");n("--vs-color",a),n("--vs-color-rgb",t.join(" ")),n("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class S extends HTMLElement{static observedAttributes=["highlight-color","indent-size","show-icons","radius","disabled","glow","max-vh","stagger","color"];#t;#e;#o=null;#a=[];#r=new Set;#i=null;#s=[];#n=new Set;#l;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=A,this.#t=document.createElement("div"),this.#e=document.createElement("div"),this.#e.className="rv__body",this.#e.setAttribute("role","tree"),this.#t.appendChild(this.#e),e.append(t,this.#t),this.#l=i=>this.#m(i),this.#e.addEventListener("keydown",this.#l)}set elements(e){this.#o=Array.isArray(e)?e:null,this.isConnected&&this.#d()}get elements(){return this.#o}set defaultOpenIds(e){this.#a=Array.isArray(e)?e:[],this.isConnected&&this.#d()}get defaultOpenIds(){return this.#a}connectedCallback(){w(this,this.getAttribute("color")),this.#d(),this.#h()}disconnectedCallback(){this.#e.removeEventListener("keydown",this.#l);for(const e of this.#n)clearTimeout(e);this.#n.clear()}attributeChangedCallback(){w(this,this.getAttribute("color")),this.#t.isConnected&&this.#h()}#d(){const e=this.#o??k;this.#r=new Set(this.#a),(function t(i){for(const o of i)o.type==="folder"&&o.defaultOpen&&this.#r.add(o.id),o.children&&t.call(this,o.children)}).call(this,e),this.#s=[],this.#i=null,this.#e.textContent="";for(const t of e)this.#e.appendChild(this.#p(t,0,[]));this.#h()}#p(e,t,i){const o=e.type==="folder",l=[...i,e.id],a=document.createElement("div");a.className="rv-node";const s=document.createElement("div");s.className="rv-row",s.setAttribute("role","treeitem"),e.highlight&&s.classList.add("is-hl"),s.dataset.depth=String(t);const n=document.createElement("span");n.setAttribute("aria-hidden","true"),o?(n.className="rv-chevron",n.appendChild(g(m.chevron))):n.className="rv-chevron rv-chevron--ghost",s.appendChild(n);const r=document.createElement("span");r.className="rv-icon",r.setAttribute("aria-hidden","true"),r.appendChild(g(o?m.folder:m[C(e.name)])),s.appendChild(r);const h=document.createElement("span");h.className="rv-name",h.textContent=e.name,s.appendChild(h),a.appendChild(s);const c={node:e,depth:t,path:l,row:s,icon:r,isFolder:o,chevron:n,childBox:null};if(this.#s.push(c),o){const v=this.#r.has(e.id);n.classList.toggle("is-open",v),s.setAttribute("aria-expanded",String(v));const p=document.createElement("div");p.className="rv-children",p.hidden=!v,(e.children||[]).forEach((x,y)=>{const f=this.#p(x,t+1,l);f.style.setProperty("--i",String(y)),p.appendChild(f)}),a.appendChild(p),c.childBox=p,s.addEventListener("click",()=>this.#c(c))}else s.setAttribute("aria-selected","false"),s.addEventListener("click",()=>this.#c(c));return a}#c(e){this.hasAttribute("disabled")||(e.isFolder?this.#u(e):this.#v(e))}#u(e){const t=e.node.id,i=!this.#r.has(t);if(i?this.#r.add(t):this.#r.delete(t),e.chevron.classList.toggle("is-open",i),e.row.setAttribute("aria-expanded",String(i)),e.childBox.hidden=!i,i){const o=e.childBox.querySelectorAll(":scope > .rv-node > .rv-row");o.forEach(a=>{a.classList.remove("is-reveal"),a.offsetWidth,a.classList.add("is-reveal")});const l=setTimeout(()=>{this.#n.delete(l),o.forEach(a=>a.classList.remove("is-reveal"))},700);this.#n.add(l)}this.dispatchEvent(new CustomEvent("toggle",{bubbles:!0,composed:!0,detail:{node:e.node,path:e.path,open:i}}))}#v(e){this.#i&&(this.#i.classList.remove("is-sel"),this.#i.setAttribute("aria-selected","false")),e.row.classList.add("is-sel"),e.row.setAttribute("aria-selected","true"),this.#i=e.row,this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{node:e.node,path:e.path}}))}#m(e){if(e.key!=="Enter"&&e.key!==" ")return;const t=this.#s.find(i=>i.row===e.target);t&&(e.preventDefault(),this.#c(t))}#h(){const e=this.getAttribute("radius")||"rounded",t=this.hasAttribute("disabled");this.#t.className=`rv rv--r-${e}${t?" is-disabled":""}`;const i=this.getAttribute("highlight-color")||"var(--ui-accent, #ededed)";this.#t.style.setProperty("--rv-accent",i);const o=Number(this.getAttribute("stagger"));this.#t.style.setProperty("--rv-stagger",`${Number.isFinite(o)&&o>=0?o:45}ms`);const l=Number(this.getAttribute("max-vh")),a=Number.isFinite(l)&&l>0?l:90,s=typeof window<"u"?Math.round(window.innerHeight*a/100):0;this.#e.style.maxHeight=s?`${s}px`:"";const n=Number(this.getAttribute("indent-size")),r=Number.isFinite(n)?n:16,h=this.hasAttribute("show-icons");for(const c of this.#s)c.row.style.paddingLeft=`${c.depth*r+9}px`,c.row.tabIndex=t?-1:0,c.icon.hidden=!h}}customElements.define("vs-file-tree-reveal",S);
