const F="http://www.w3.org/2000/svg",E={chevron:["M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"],folder:["M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z","M8 2H17C19 2 20 3 20 5V6.38"],code:["M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z","M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5","M10 13L8 15L10 17","M14 13L16 15L14 17"],text:["M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z","M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5","M8 13H12","M8 17H16"],file:["M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14","M22 10H18C15 10 14 9 14 6V2L22 10Z"]};function H(n){const t=document.createElementNS(F,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none");for(const e of n){const i=document.createElementNS(F,"path");i.setAttribute("d",e),t.appendChild(i)}return t}function B(n){const t=(n.split(".").pop()||"").toLowerCase();return["ts","tsx","js","jsx","vue","mjs","cjs"].includes(t)?"code":t==="json"?"file":["md","mdx","txt","css"].includes(t)?"text":"file"}const w=new Set;let k=0,_=0,M=!1,C=0,N=!1,L=null;function $(){if(C=0,!!M)for(const n of w){if(!n.visible)continue;if(n.disabled()){n.lastI!==0&&(n.el.style.setProperty("--glow","0"),n.lastI=0);continue}n.rect||(n.rect=n.el.getBoundingClientRect());const t=n.rect,e=Math.max(t.left,Math.min(k,t.right)),i=Math.max(t.top,Math.min(_,t.bottom)),r=Math.max(0,1-Math.hypot(k-e,_-i)/n.radius);r===0&&n.lastI===0||(n.el.style.setProperty("--gx",`${k-t.left}px`),n.el.style.setProperty("--gy",`${_-t.top}px`),n.el.style.setProperty("--glow",r.toFixed(3)),n.lastI=r)}}function q(n){k=n.clientX,_=n.clientY,M=!0,C||(C=requestAnimationFrame($))}function V(){for(const n of w)n.rect=null;M&&!C&&(C=requestAnimationFrame($))}function T(n,t,e){N||(N=!0,addEventListener("pointermove",q,{passive:!0}),addEventListener("scroll",V,{passive:!0,capture:!0}),addEventListener("resize",V,{passive:!0}),L=new IntersectionObserver(s=>{for(const d of s)for(const h of w)h.el===d.target&&(h.visible=d.isIntersecting,d.isIntersecting&&(h.rect=null))}));const i={el:n,radius:t,disabled:e,rect:null,visible:!0,lastI:0};w.add(i),L.observe(n);const r=D.add(n);return()=>{w.delete(i),L.unobserve(n),r()}}const G=[{id:"src",name:"src",type:"folder",defaultOpen:!0,children:[{id:"components",name:"components",type:"folder",defaultOpen:!0,children:[{id:"button",name:"VsButton.vue"},{id:"tree",name:"VsFileTree.vue",highlight:!0},{id:"input",name:"VsInput.vue"}]},{id:"lib",name:"lib",type:"folder",children:[{id:"effects",name:"effects",type:"folder",children:[{id:"press",name:"usePress.ts"},{id:"glow",name:"useProximityGlow.ts"}]},{id:"utils",name:"utils.ts"}]},{id:"styles",name:"tokens.css"},{id:"main",name:"main.ts"}]},{id:"readme",name:"README.md"},{id:"pkg",name:"package.json"}],D=globalThis[Symbol.for("vs-light")]||=(()=>{const n=new Set,t=110,e=1.6,i=1.7,r=34,s=72,d=[[.6,0],[.42,30],[.16,58],[0,82]],h=[[.6,0],[.27,42],[.08,66],[0,85]],l=[[.85,0],[.4,42],[.12,66],[0,84]];let a=0,v=null;const A=(p,o,u)=>{const f=o.w/2+p,m=o.h/2+p,g=o.h/2/m;return`radial-gradient(${f.toFixed(1)}px ${m.toFixed(1)}px at ${o.x.toFixed(1)}px ${o.y.toFixed(1)}px,`+u.map(([c,b])=>` rgb(${o.rgb} / ${(c*o.k).toFixed(3)}) ${((g+b/100*(1-g))*100).toFixed(1)}%`).join(",")+")"};function R(){const p=[];for(const o of document.querySelectorAll("[color],[data-lamp]")){const u=getComputedStyle(o),f=u.getPropertyValue("--vs-color-rgb").trim()||(o.hasAttribute("data-lamp")?(u.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");f&&p.push({el:o,rgb:f,rect:o.getBoundingClientRect()})}return p}function j(){if(a=0,!n.size)return;const p=R();for(const o of n){if(!o.visible)continue;if(!p.length){o.on&&(o.el.style.setProperty("--lit","0"),o.on=!1);continue}const u=o.el.getBoundingClientRect(),f=u.left+u.width/2,m=u.top+u.height/2,g=[];for(const c of p){if(c.el===o.el||c.el.contains(o.el)||o.el.contains(c.el))continue;const b=Math.max(c.rect.left,Math.min(f,c.rect.right)),S=Math.max(c.rect.top,Math.min(m,c.rect.bottom)),z=Math.max(u.left,Math.min(b,u.right)),O=Math.max(u.top,Math.min(S,u.bottom)),I=Math.max(0,1-Math.hypot(b-z,S-O)/t)**e*i;I&&g.push({rgb:c.rgb,k:Math.min(1,I),w:c.rect.width,h:c.rect.height,x:c.rect.left+c.rect.width/2-u.left,y:c.rect.top+c.rect.height/2-u.top})}if(!g.length){o.on&&(o.el.style.setProperty("--lit","0"),o.on=!1);continue}g.sort((c,b)=>c.k-b.k),o.el.style.setProperty("--lit-ring",g.flatMap(c=>[A(r,c,d),A(s,c,h)]).join(",")),o.el.style.setProperty("--lit-fill",g.map(c=>A(s,c,l)).join(",")),o.el.style.setProperty("--lit","1"),o.on=!0}}const x=()=>{a||(a=requestAnimationFrame(j))};return addEventListener("scroll",x,{passive:!0,capture:!0}),addEventListener("resize",x,{passive:!0}),globalThis.vsLight=x,{add(p){v||=new IntersectionObserver(u=>{for(const f of u)for(const m of n)m.el===f.target&&(m.visible=f.isIntersecting);x()});const o={el:p,visible:!0,on:!1};return n.add(o),v.observe(p),x(),()=>{n.delete(o),v.unobserve(p)}}}})(),Z=`
  :host { display: block; }

  /* proximity glow rim (same shape as the shared FX_CSS in vs-fx.js) */
  .fx-glow {
    position: absolute; inset: var(--glow-inset, -1px); z-index: 1; border-radius: inherit;
    padding: var(--glow-ring, 1px); pointer-events: none;
    background:
      radial-gradient(var(--glow-r-core, 60px) circle at var(--gx,50%) var(--gy,50%),
        rgb(var(--fx-tint,255 255 255)/.6), rgb(var(--fx-tint,255 255 255)/.42) 30%, rgb(var(--fx-tint,255 255 255)/.16) 58%, rgb(var(--fx-tint,255 255 255)/0) 82%),
      radial-gradient(var(--glow-r-soft, 200px) circle at var(--gx,50%) var(--gy,50%),
        rgb(var(--fx-tint,255 255 255)/.6), rgb(var(--fx-tint,255 255 255)/.27) 42%, rgb(var(--fx-tint,255 255 255)/.08) 66%, rgb(var(--fx-tint,255 255 255)/0) 85%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude;
    opacity: calc(var(--glow,0) * var(--glow-strength,.4)); transition: opacity 140ms;
  }
  /* neighbour light — a coloured element nearby throws ITS colour on this one.
     Fed by the engine at the top of the file: --lit-fill / --lit-ring hold one
     gradient per lamp in reach, --lit is the master fade so a lamp leaving
     range dims out instead of cutting. Deliberately not on --glow: that one is
     the cursor's and other rules read it as a 0..1 intensity. */
  .hi::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .hi::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
  .hi__glow { --glow-strength: 0.5; --glow-ring: 1px; --glow-inset: -1px; border-radius: var(--rr); }
  .hi {
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
    font-family: inherit;
  }
  .hi--r-subtle { --rr: 8px; }
  .hi--r-pill { --rr: 22px; }
  @supports (corner-shape: squircle) { .hi--r-squircle { corner-shape: squircle; --rr: 22px; } }

  .hi__body {
    position: relative;
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: var(--border, #2a2a2a) transparent;
  }
  .hi__body::-webkit-scrollbar { width: 6px; }
  .hi__body::-webkit-scrollbar-thumb { background: var(--border, #2a2a2a); border-radius: 999px; }

  /* shared sliding pill with bounce */
  .hi-slider {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    border-radius: 9px;
    background: color-mix(in srgb, var(--hi-accent, var(--ui-accent, #ededed)) 16%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hi-accent, var(--ui-accent, #ededed)) 35%, transparent);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    opacity: 0;
    transform-origin: top left;
    transition:
      transform 340ms cubic-bezier(0.34, 1.56, 0.64, 1),
      width 340ms cubic-bezier(0.34, 1.56, 0.64, 1),
      height 340ms cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity 180ms ease;
    pointer-events: none;
  }
  .hi-slider.is-on { opacity: 1; }

  .hi-group.is-collapsed { display: none; }
  .no-icons .hi-icon { display: none; }

  .hi-row {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 9px;
    border-radius: 9px;
    cursor: pointer;
    user-select: none;
    color: var(--text, #ededed);
    transition: color 160ms ease;
  }
  .hi-row:focus-visible { outline: none; }
  .hi-row.is-sel { color: var(--hi-accent, var(--ui-accent, #ededed)); font-weight: 600; }
  .hi-row.is-hl { color: var(--hi-accent, var(--ui-accent, #ededed)); font-weight: 600; }

  .hi-chevron {
    display: inline-flex; flex: 0 0 14px; width: 14px; height: 14px;
    color: var(--text-muted, #8a8a8a);
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .hi-chevron svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.1; stroke-linecap: round; stroke-linejoin: round; }
  .hi-chevron.is-open { transform: rotate(90deg); }
  .hi-chevron--ghost { visibility: hidden; }

  .hi-icon { display: inline-flex; flex: 0 0 18px; width: 18px; height: 18px; color: var(--text-muted, #8a8a8a); }
  .hi-icon svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
  .hi-row.is-hl .hi-icon { color: var(--hi-accent, var(--ui-accent, #ededed)); }

  .hi-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .hi.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .hi-slider {
      transition: opacity 140ms ease;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
    .hi-chevron, .hi-row { transition: none !important; }
  }
`;let y;function K(n){if(y||=document.createElement("canvas").getContext("2d"),!y)return null;y.fillStyle="#000",y.fillStyle=n;const t=y.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const X=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function P(n,t){const e=t?K(String(t).trim()):null;if(!e){for(const a of X)n.style.removeProperty(a);return}const i=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),s=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,d=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(a=>Math.round(s?a*.92:a+(255-a)*.16)),l=(a,v)=>n.style.setProperty(a,v);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(a,d);l("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(a,e.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(a,s?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])l(a,s?"0 0 0":"255 255 255");l("--vs-color",d),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class Y extends HTMLElement{static observedAttributes=["highlight-color","indent-size","show-icons","radius","disabled","max-vh","default-open-ids","glow","color"];#i;#r;#t;#e;#s;#c=null;#d=null;#n=new Set;#b=null;#o=[];#a=!1;#h;#u;#p;#f;#g;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=Z,this.#r=document.createElement("span"),this.#r.className="fx-glow hi__glow",this.#r.setAttribute("aria-hidden","true"),this.#i=document.createElement("div"),this.#i.className="hi",this.#t=document.createElement("div"),this.#t.className="hi__body",this.#t.setAttribute("role","tree"),this.#e=document.createElement("span"),this.#e.className="hi-slider",this.#e.setAttribute("aria-hidden","true"),this.#s=document.createElement("div"),this.#t.append(this.#e,this.#s),this.#i.append(this.#r,this.#t),t.append(e,this.#i),this.#h=i=>{const r=this.#l(i);r&&this.#C(r)},this.#u=i=>{const r=this.#l(i);r&&this.#C(r)},this.#p=()=>this.#E(),this.#f=i=>{const r=this.#l(i);r&&this.#y(r)},this.#g=i=>{if(i.key!=="Enter"&&i.key!==" ")return;const r=this.#l(i);r&&(i.preventDefault(),this.#y(r))},this.#t.addEventListener("mouseover",this.#h),this.#t.addEventListener("focusin",this.#u),this.#t.addEventListener("mouseleave",this.#p),this.#t.addEventListener("click",this.#f),this.#t.addEventListener("keydown",this.#g)}get elements(){return this.#d}set elements(t){this.#d=Array.isArray(t)?t:null,this.#a&&this.#v()}connectedCallback(){P(this,this.getAttribute("color")),this.#a?this.#m():this.#v(),this.#c=T(this.#i,280,()=>this.hasAttribute("disabled")||this.getAttribute("glow")==="false")}disconnectedCallback(){this.#c?.(),this.#c=null,this.#t.removeEventListener("mouseover",this.#h),this.#t.removeEventListener("focusin",this.#u),this.#t.removeEventListener("mouseleave",this.#p),this.#t.removeEventListener("click",this.#f),this.#t.removeEventListener("keydown",this.#g)}attributeChangedCallback(){P(this,this.getAttribute("color")),this.#a&&this.#m()}#v(){this.#n=new Set(this.#L(this.getAttribute("default-open-ids")));const t=this.#d??G;(function e(i,r){for(const s of i)s.type==="folder"&&s.defaultOpen&&r.#n.add(s.id),s.children&&e(s.children,r)})(t,this),this.#s.textContent="",this.#o=[],this.#x(t,0,[],this.#s),this.#a=!0,this.#m()}#x(t,e,i,r){for(const s of t){const d=s.type==="folder",h=[...i,s.id],l=this.#k(s,e,d,h);if(r.appendChild(l),this.#o.push(l),d&&s.children&&s.children.length){const a=document.createElement("div");a.className="hi-group",this.#x(s.children,e+1,h,a),r.appendChild(a),l._group=a,this.#w(l,this.#n.has(s.id))}}}#k(t,e,i,r){const s=document.createElement("div");s.className="hi-row"+(i?" is-folder":"")+(t.highlight?" is-hl":""),s.setAttribute("role","treeitem"),s._node=t,s._path=r,s._depth=e,s._isFolder=i;const d=document.createElement("span");i?(d.className="hi-chevron",d.setAttribute("aria-hidden","true"),d.appendChild(H(E.chevron))):(d.className="hi-chevron hi-chevron--ghost",d.setAttribute("aria-hidden","true")),s.appendChild(d);const h=document.createElement("span");h.className="hi-icon",h.setAttribute("aria-hidden","true"),h.appendChild(H(i?E.folder:E[B(t.name)])),s.appendChild(h);const l=document.createElement("span");return l.className="hi-name",l.textContent=t.name,s.appendChild(l),s}#m(){const t=this.getAttribute("radius")||"rounded",e=this.hasAttribute("disabled");this.#i.className="hi hi--r-"+t+(e?" is-disabled":""),this.#i.style.setProperty("--hi-accent",this.getAttribute("highlight-color")||"var(--ui-accent, #ededed)");const i=this.hasAttribute("show-icons");this.#t.classList.toggle("no-icons",!i);const r=Number(this.getAttribute("max-vh"))||90,s=typeof window<"u"?Math.round(window.innerHeight*r/100):0;s&&(this.#t.style.maxHeight=s+"px");const d=Number(this.getAttribute("indent-size")),h=Number.isFinite(d)?d:16;for(const l of this.#o)l.style.paddingLeft=l._depth*h+9+"px",l.tabIndex=e?-1:0,l._isFolder?l.setAttribute("aria-expanded",String(this.#n.has(l._node.id))):l.setAttribute("aria-selected",String(this.#b===l._node.id))}#l(t){const e=t.target,i=e&&e.closest?e.closest(".hi-row"):null;return i&&this.#s.contains(i)?i:null}#y(t){this.hasAttribute("disabled")||(t._isFolder?this.#_(t):this.#A(t))}#_(t){const e=!this.#n.has(t._node.id);e?this.#n.add(t._node.id):this.#n.delete(t._node.id),this.#w(t,e),this.dispatchEvent(new CustomEvent("toggle",{bubbles:!0,composed:!0,detail:{node:t._node,path:t._path,open:e}}))}#w(t,e){t._group&&t._group.classList.toggle("is-collapsed",!e);const i=t.querySelector(".hi-chevron");i&&i.classList.toggle("is-open",e),t.setAttribute("aria-expanded",String(e))}#A(t){this.#b=t._node.id;for(const e of this.#o){if(e._isFolder)continue;const i=e===t;e.classList.toggle("is-sel",i),e.setAttribute("aria-selected",String(i))}this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{node:t._node,path:t._path}}))}#C(t){if(this.hasAttribute("disabled"))return;const e=this.#t.getBoundingClientRect(),i=t.getBoundingClientRect(),r=i.top-e.top+this.#t.scrollTop,s=i.left-e.left;this.#e.style.transform=`translate(${s}px, ${r}px)`,this.#e.style.width=i.width+"px",this.#e.style.height=i.height+"px",this.#e.classList.add("is-on")}#E(){this.#e.classList.remove("is-on")}#L(t){return t?t.split(/[\s,]+/).filter(Boolean):[]}}customElements.define("vs-file-tree-highlight",Y);
