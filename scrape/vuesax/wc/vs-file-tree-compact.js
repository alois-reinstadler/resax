const C=`
  :host { display: block; }
  .cp {
    --rr: 14px;
    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 340px;
    border: 1px solid var(--border, #2a2a2a);
    border-radius: var(--rr);
    background: var(--bg-card, #111);
    color: var(--text, #ededed);
    font-size: var(--ctrl-fs-xs, 12.5px);
  }
  .cp--r-subtle { --rr: 8px; }
  .cp--r-pill { --rr: 22px; }
  @supports (corner-shape: squircle) { .cp--r-squircle { corner-shape: squircle; --rr: 22px; } }

  .cp__body {
    position: relative;
    padding: 4px 6px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: var(--border, #2a2a2a) transparent;
  }
  .cp__body::-webkit-scrollbar { width: 5px; }
  .cp__body::-webkit-scrollbar-thumb { background: var(--border, #2a2a2a); border-radius: 999px; }

  /* accent indicator bar that slides to the selected row */
  .cp-marker {
    position: absolute;
    left: 2px;
    top: 0;
    width: 2.5px;
    height: calc(var(--cp-row-h) - 8px);
    border-radius: 999px;
    background: var(--cp-accent, var(--ui-accent, #ededed));
    box-shadow: 0 0 8px var(--cp-accent, var(--ui-accent, #ededed));
    opacity: 0;
    transition: transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease;
    pointer-events: none;
  }
  .cp-marker.is-on { opacity: 1; }

  /* nested child list — [hidden] collapses in place (no whole-tree rebuild) */
  .cp-children[hidden] { display: none; }

  .cp-row {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    height: var(--cp-row-h);
    padding-right: 8px;
    border-radius: 7px;
    cursor: pointer;
    user-select: none;
    color: var(--text, #ededed);
    transition: background 140ms ease, color 140ms ease;
  }
  .cp-row:hover,
  .cp-row:focus-visible { background: color-mix(in srgb, var(--cp-accent, var(--ui-accent, #ededed)) 9%, transparent); outline: none; }
  .cp-row.is-sel { background: color-mix(in srgb, var(--cp-accent, var(--ui-accent, #ededed)) 15%, transparent); color: var(--text, #ededed); }
  .cp-row.is-hl { color: var(--cp-accent, var(--ui-accent, #ededed)); font-weight: 600; }

  .cp-chevron {
    display: inline-flex; flex: 0 0 12px; width: 12px; height: 12px;
    color: var(--text-muted, #8a8a8a);
    transition: transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .cp-chevron svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
  .cp-chevron.is-open { transform: rotate(90deg); }
  .cp-chevron--ghost { visibility: hidden; }

  .cp-icon { display: inline-flex; flex: 0 0 15px; width: 15px; height: 15px; color: var(--text-muted, #8a8a8a); }
  .cp-icon svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  .cp-row.is-hl .cp-icon { color: var(--cp-accent, var(--ui-accent, #ededed)); }

  .cp-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .cp.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .cp-marker, .cp-chevron, .cp-row { transition: none !important; }
  }
`,k=[{id:"src",name:"src",type:"folder",defaultOpen:!0,children:[{id:"components",name:"components",type:"folder",defaultOpen:!0,children:[{id:"button",name:"VsButton.vue"},{id:"tree",name:"VsFileTree.vue",highlight:!0},{id:"input",name:"VsInput.vue"}]},{id:"lib",name:"lib",type:"folder",children:[{id:"effects",name:"effects",type:"folder",children:[{id:"press",name:"usePress.ts"},{id:"glow",name:"useProximityGlow.ts"}]},{id:"utils",name:"utils.ts"}]},{id:"styles",name:"tokens.css"},{id:"main",name:"main.ts"}]},{id:"readme",name:"README.md"},{id:"pkg",name:"package.json"}],x="http://www.w3.org/2000/svg";function y(l){const e=document.createElementNS(x,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none");for(const i of l){const t=document.createElementNS(x,"path");t.setAttribute("d",i),t.setAttribute("stroke","currentColor"),e.appendChild(t)}return e}const g={chevron:["M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"],folder:["M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z","M8 2H17C19 2 20 3 20 5V6.38"],code:["M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z","M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5","M10 13L8 15L10 17","M14 13L16 15L14 17"],text:["M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z","M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5","M8 13H12","M8 17H16"],file:["M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14","M22 10H18C15 10 14 9 14 6V2L22 10Z"]};function A(l){const e=(l.split(".").pop()||"").toLowerCase();return["ts","tsx","js","jsx","vue","mjs","cjs"].includes(e)?"code":e==="json"?"json":["md","mdx","txt","css"].includes(e)?"text":"file"}let m;function E(l){if(m||=document.createElement("canvas").getContext("2d"),!m)return null;m.fillStyle="#000",m.fillStyle=l;const e=m.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const i=e.match(/[\d.]+/g);return i&&i.length>=3?[+i[0],+i[1],+i[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function w(l,e){const i=e?E(String(e).trim()):null;if(!i){for(const r of _)l.style.removeProperty(r);return}const t=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),s=.2126*t(i[0])+.7152*t(i[1])+.0722*t(i[2])>.45,n=`rgb(${i[0]} ${i[1]} ${i[2]})`,o=i.map(r=>Math.round(s?r*.92:r+(255-r)*.16)),d=(r,p)=>l.style.setProperty(r,p);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])d(r,n);d("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])d(r,i.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])d(r,s?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])d(r,s?"0 0 0":"255 255 255");d("--vs-color",n),d("--vs-color-rgb",i.join(" ")),d("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class L extends HTMLElement{static observedAttributes=["highlight-color","indent-size","show-icons","radius","disabled","glow","max-vh","density","color"];#t;#e;#i;#r=[];#s=new Set;#n=null;#o=null;constructor(){super();const e=this.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=C,this.#t=document.createElement("div"),this.#t.className="cp",this.#e=document.createElement("div"),this.#e.className="cp__body",this.#e.setAttribute("role","tree"),this.#i=document.createElement("span"),this.#i.className="cp-marker",this.#i.setAttribute("aria-hidden","true"),this.#e.appendChild(this.#i),this.#t.appendChild(this.#e),e.append(i,this.#t),this._onClick=t=>this.#h(t,!1),this._onKey=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.#h(t,!0))}}connectedCallback(){w(this,this.getAttribute("color")),this.#e.addEventListener("click",this._onClick),this.#e.addEventListener("keydown",this._onKey),this.#p(),this.#c()}disconnectedCallback(){this.#e.removeEventListener("click",this._onClick),this.#e.removeEventListener("keydown",this._onKey)}attributeChangedCallback(){w(this,this.getAttribute("color")),this.#t&&this.#c()}set elements(e){this.#o=Array.isArray(e)?e:null,this.#t&&this.isConnected&&(this.#p(),this.#c())}get elements(){return this.#o}#d(){return this.#o??k}#l(e,i){const t=parseFloat(this.getAttribute(e));return Number.isFinite(t)?t:i}#u(){const e=this.getAttribute("density")||"compact";return e==="compact"?26:e==="cozy"?30:36}#p(){this.#s=new Set;const e=(this.getAttribute("default-open-ids")||"").split(",").map(s=>s.trim()).filter(Boolean);for(const s of e)this.#s.add(s);const i=s=>{for(const n of s)n.type==="folder"&&n.defaultOpen&&this.#s.add(n.id),n.children&&i(n.children)};i(this.#d());for(const s of this.#r)s.el.remove();this.#e.querySelectorAll(".cp-children").forEach(s=>s.remove()),this.#r=[];const t=this.hasAttribute("show-icons"),a=(s,n,o,d)=>{for(const r of s){const p=r.type==="folder",v=[...d,r.id],c=document.createElement("div");c.className="cp-row"+(p?" is-folder":"")+(r.highlight?" is-hl":""),c.setAttribute("role","treeitem"),c._node=r,c._path=v,c._isFolder=p;const h=document.createElement("span");p?(h.className="cp-chevron",h.appendChild(y(g.chevron))):h.className="cp-chevron cp-chevron--ghost",h.setAttribute("aria-hidden","true"),c.appendChild(h),c._chev=h;let f=null;if(t){f=document.createElement("span"),f.className="cp-icon",f.setAttribute("aria-hidden","true");const u=p?"folder":A(r.name);f.appendChild(y(g[u]||g.file)),c.appendChild(f)}const b=document.createElement("span");if(b.className="cp-name",b.textContent=r.name,c.appendChild(b),o.appendChild(c),this.#r.push({el:c,depth:n,node:r,chev:h,isFolder:p}),p&&r.children&&r.children.length){const u=document.createElement("div");u.className="cp-children",u.setAttribute("role","group"),c._kids=u,o.appendChild(u),a(r.children,n+1,u,v)}}};a(this.#d(),0,this.#e,[])}#c(){const e=this.getAttribute("radius")||"rounded",i=this.hasAttribute("disabled");this.#t.className=`cp cp--r-${e} cp--d-${this.getAttribute("density")||"compact"}`+(i?" is-disabled":""),this.#t.style.setProperty("--cp-accent",this.getAttribute("highlight-color")||"var(--ui-accent, #ededed)"),this.#t.style.setProperty("--cp-row-h",this.#u()+"px");const t=this.#l("max-vh",90);typeof window<"u"&&(this.#e.style.maxHeight=Math.round(window.innerHeight*t/100)+"px");const a=this.#l("indent-size",16);for(const s of this.#r)if(s.el.style.paddingLeft=s.depth*a+8+"px",s.el.tabIndex=i?-1:0,s.isFolder){const n=this.#s.has(s.node.id);s.chev.classList.toggle("is-open",n),s.el.setAttribute("aria-expanded",String(n)),s.el._kids&&(s.el._kids.hidden=!n)}else{const n=this.#n===s.node.id;s.el.classList.toggle("is-sel",n),s.el.setAttribute("aria-selected",String(n))}this.#a()}#a(){const e=this.#r.find(i=>i.node.id===this.#n);if(!e||e.el.offsetParent===null){this.#i.classList.remove("is-on");return}this.#i.style.transform=`translateY(${e.el.offsetTop+4}px)`,this.#i.classList.add("is-on")}#h(e,i){if(this.hasAttribute("disabled"))return;const t=e.target.closest(".cp-row");if(!t||!this.#e.contains(t))return;const a=t._node,s=t._path;if(t._isFolder){const n=a.id,o=!this.#s.has(n);o?this.#s.add(n):this.#s.delete(n),t._chev.classList.toggle("is-open",o),t.setAttribute("aria-expanded",String(o)),t._kids&&(t._kids.hidden=!o),this.#a(),this.dispatchEvent(new CustomEvent("toggle",{bubbles:!0,composed:!0,detail:{node:a,path:s,open:o}}))}else{this.#n,a.id;const n=this.#r.find(o=>o.node.id===this.#n);n&&(n.el.classList.remove("is-sel"),n.el.setAttribute("aria-selected","false")),this.#n=a.id,t.classList.add("is-sel"),t.setAttribute("aria-selected","true"),this.#a(),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{node:a,path:s}}))}}}customElements.define("vs-file-tree-compact",L);
