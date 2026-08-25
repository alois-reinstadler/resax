const G="http://www.w3.org/2000/svg";function V(i,t){const e=document.createElementNS(G,i);for(const r in t)t[r]!=null&&e.setAttribute(r,t[r]);return e}function k(i){const t=V("svg",{viewBox:"0 0 24 24",fill:"none"});for(const e of i)t.appendChild(V("path",e));return t}const g=(i,t)=>Object.assign({d:i,stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},t),E={chevron:()=>k([g("M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008",{"stroke-miterlimit":"10"})]),folder:()=>k([g("M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z",{"stroke-miterlimit":"10","stroke-linecap":void 0,"stroke-linejoin":void 0}),g("M8 2H17C19 2 20 3 20 5V6.38",{"stroke-miterlimit":"10"})]),code:()=>k([g("M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z",{"stroke-miterlimit":"10"}),g("M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5",{"stroke-miterlimit":"10"}),g("M10 13L8 15L10 17",{"stroke-miterlimit":"10"}),g("M14 13L16 15L14 17",{"stroke-miterlimit":"10"})]),text:()=>k([g("M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z",{"stroke-miterlimit":"10"}),g("M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5",{"stroke-miterlimit":"10"}),g("M8 13H12",{"stroke-miterlimit":"10"}),g("M8 17H16",{"stroke-miterlimit":"10"})]),file:()=>k([g("M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"),g("M22 10H18C15 10 14 9 14 6V2L22 10Z")])};function q(i){const t=(i.split(".").pop()||"").toLowerCase();return["ts","tsx","js","jsx","vue","mjs","cjs"].includes(t)?"code":t==="json"?"json":["md","mdx","txt","css"].includes(t)?"text":"file"}const _=new Set;let M=0,L=0,S=!1,A=0,j=!1,I=null;function O(){if(A=0,!!S)for(const i of _){if(!i.visible)continue;if(i.disabled()){i.lastI!==0&&(i.el.style.setProperty("--glow","0"),i.lastI=0);continue}i.rect||(i.rect=i.el.getBoundingClientRect());const t=i.rect,e=Math.max(t.left,Math.min(M,t.right)),r=Math.max(t.top,Math.min(L,t.bottom)),o=Math.max(0,1-Math.hypot(M-e,L-r)/i.radius);o===0&&i.lastI===0||(i.el.style.setProperty("--gx",`${M-t.left}px`),i.el.style.setProperty("--gy",`${L-t.top}px`),i.el.style.setProperty("--glow",o.toFixed(3)),i.lastI=o)}}function T(i){M=i.clientX,L=i.clientY,S=!0,A||(A=requestAnimationFrame(O))}function F(){for(const i of _)i.rect=null;S&&!A&&(A=requestAnimationFrame(O))}function D(i,t,e){j||(j=!0,addEventListener("pointermove",T,{passive:!0}),addEventListener("scroll",F,{passive:!0,capture:!0}),addEventListener("resize",F,{passive:!0}),I=new IntersectionObserver(n=>{for(const h of n)for(const l of _)l.el===h.target&&(l.visible=h.isIntersecting,h.isIntersecting&&(l.rect=null))}));const r={el:i,radius:t,disabled:e,rect:null,visible:!0,lastI:0};_.add(r),I.observe(i);const o=K.add(i);return()=>{_.delete(r),I.unobserve(i),o()}}const Z=[{id:"src",name:"src",type:"folder",defaultOpen:!0,children:[{id:"components",name:"components",type:"folder",defaultOpen:!0,children:[{id:"button",name:"VsButton.vue"},{id:"tree",name:"VsFileTree.vue",highlight:!0},{id:"input",name:"VsInput.vue"}]},{id:"lib",name:"lib",type:"folder",children:[{id:"effects",name:"effects",type:"folder",children:[{id:"press",name:"usePress.ts"},{id:"glow",name:"useProximityGlow.ts"}]},{id:"utils",name:"utils.ts"}]},{id:"styles",name:"tokens.css"},{id:"main",name:"main.ts"}]},{id:"readme",name:"README.md"},{id:"pkg",name:"package.json"}],K=globalThis[Symbol.for("vs-light")]||=(()=>{const i=new Set,t=110,e=1.6,r=1.7,o=34,n=72,h=[[.6,0],[.42,30],[.16,58],[0,82]],l=[[.6,0],[.27,42],[.08,66],[0,85]],d=[[.85,0],[.4,42],[.12,66],[0,84]];let s=0,u=null;const m=(p,a,f)=>{const b=a.w/2+p,x=a.h/2+p,v=a.h/2/x;return`radial-gradient(${b.toFixed(1)}px ${x.toFixed(1)}px at ${a.x.toFixed(1)}px ${a.y.toFixed(1)}px,`+f.map(([c,y])=>` rgb(${a.rgb} / ${(c*a.k).toFixed(3)}) ${((v+y/100*(1-v))*100).toFixed(1)}%`).join(",")+")"};function $(){const p=[];for(const a of document.querySelectorAll("[color],[data-lamp]")){const f=getComputedStyle(a),b=f.getPropertyValue("--vs-color-rgb").trim()||(a.hasAttribute("data-lamp")?(f.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");b&&p.push({el:a,rgb:b,rect:a.getBoundingClientRect()})}return p}function R(){if(s=0,!i.size)return;const p=$();for(const a of i){if(!a.visible)continue;if(!p.length){a.on&&(a.el.style.setProperty("--lit","0"),a.on=!1);continue}const f=a.el.getBoundingClientRect(),b=f.left+f.width/2,x=f.top+f.height/2,v=[];for(const c of p){if(c.el===a.el||c.el.contains(a.el)||a.el.contains(c.el))continue;const y=Math.max(c.rect.left,Math.min(b,c.rect.right)),H=Math.max(c.rect.top,Math.min(x,c.rect.bottom)),z=Math.max(f.left,Math.min(y,f.right)),B=Math.max(f.top,Math.min(H,f.bottom)),N=Math.max(0,1-Math.hypot(y-z,H-B)/t)**e*r;N&&v.push({rgb:c.rgb,k:Math.min(1,N),w:c.rect.width,h:c.rect.height,x:c.rect.left+c.rect.width/2-f.left,y:c.rect.top+c.rect.height/2-f.top})}if(!v.length){a.on&&(a.el.style.setProperty("--lit","0"),a.on=!1);continue}v.sort((c,y)=>c.k-y.k),a.el.style.setProperty("--lit-ring",v.flatMap(c=>[m(o,c,h),m(n,c,l)]).join(",")),a.el.style.setProperty("--lit-fill",v.map(c=>m(n,c,d)).join(",")),a.el.style.setProperty("--lit","1"),a.on=!0}}const w=()=>{s||(s=requestAnimationFrame(R))};return addEventListener("scroll",w,{passive:!0,capture:!0}),addEventListener("resize",w,{passive:!0}),globalThis.vsLight=w,{add(p){u||=new IntersectionObserver(f=>{for(const b of f)for(const x of i)x.el===b.target&&(x.visible=b.isIntersecting);w()});const a={el:p,visible:!0,on:!1};return i.add(a),u.observe(p),w(),()=>{i.delete(a),u.unobserve(p)}}}})(),X=`
  :host { display: block; }
  .fg {
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
  .fg::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .fg::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
  .fg__glow { --glow-strength: 0.5; --glow-ring: 1px; --glow-inset: -1px; border-radius: var(--rr); }
  .fg--r-subtle { --rr: 8px; }
  .fg--r-pill { --rr: 22px; }
  @supports (corner-shape: squircle) {
    .fg--r-squircle { corner-shape: squircle; --rr: 22px; }
  }
  .fg__body {
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: var(--border, #2a2a2a) transparent;
  }
  .fg__body::-webkit-scrollbar { width: 6px; }
  .fg__body::-webkit-scrollbar-thumb { background: var(--border, #2a2a2a); border-radius: 999px; }

  .fg-row {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 9px;
    border-radius: 9px;
    cursor: pointer;
    user-select: none;
    color: var(--text, #ededed);
    transition: background 160ms ease, color 160ms ease;
  }
  .fg-row:hover,
  .fg-row:focus-visible { background: color-mix(in srgb, var(--fg-accent, var(--ui-accent, #ededed)) 10%, transparent); outline: none; }
  .fg-row.is-sel { background: color-mix(in srgb, var(--fg-accent, var(--ui-accent, #ededed)) 18%, transparent); }
  .fg-row.is-hl { color: var(--fg-accent, var(--ui-accent, #ededed)); font-weight: 600; }

  /* vertical guides per level */
  .fg-guide {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1.5px;
    background: var(--border, #2a2a2a);
    transition: background 220ms ease, box-shadow 220ms ease, width 220ms ease;
  }
  .fg-guide.is-lit {
    width: 2px;
    background: var(--fg-accent, var(--ui-accent, #ededed));
    box-shadow: 0 0 6px var(--fg-accent, var(--ui-accent, #ededed));
  }
  .fg-indent { flex: 0 0 auto; }

  .fg-chevron {
    display: inline-flex;
    flex: 0 0 14px;
    width: 14px; height: 14px;
    color: var(--text-muted, #8a8a8a);
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .fg-chevron svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.1; stroke-linecap: round; stroke-linejoin: round; }
  .fg-chevron.is-open { transform: rotate(90deg); }
  .fg-chevron--ghost { visibility: hidden; }

  .fg-icon { display: inline-flex; flex: 0 0 18px; width: 18px; height: 18px; color: var(--text-muted, #8a8a8a); }
  .fg-icon svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
  .fg-row.is-hl .fg-icon { color: var(--fg-accent, var(--ui-accent, #ededed)); }

  .fg-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .fg.is-disabled { opacity: 0.55; pointer-events: none; }
  .fg.hide-icons .fg-icon { display: none; }
  .fg-children[hidden] { display: none; }

  @media (prefers-reduced-motion: reduce) {
    .fg-guide, .fg-chevron, .fg-row { transition: none !important; }
  }
`;let C;function Y(i){if(C||=document.createElement("canvas").getContext("2d"),!C)return null;C.fillStyle="#000",C.fillStyle=i;const t=C.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const J=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function P(i,t){const e=t?Y(String(t).trim()):null;if(!e){for(const s of J)i.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),n=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,h=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(s=>Math.round(n?s*.92:s+(255-s)*.16)),d=(s,u)=>i.style.setProperty(s,u);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])d(s,h);d("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])d(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])d(s,n?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])d(s,n?"0 0 0":"255 255 255");d("--vs-color",h),d("--vs-color-rgb",e.join(" ")),d("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class Q extends HTMLElement{static observedAttributes=["highlight-color","indent-size","show-icons","radius","disabled","glow","max-vh","color"];#e;#r;#t;#o=null;#a=null;#i=new Set;#l=[];#c=[];#s=[];#d=[];#n=null;#h;#f;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=X,this.#e=document.createElement("div"),this.#e.className="fg",this.#r=document.createElement("span"),this.#r.className="fx-glow fg__glow",this.#r.setAttribute("aria-hidden","true"),this.#t=document.createElement("div"),this.#t.className="fg__body",this.#t.setAttribute("role","tree"),this.#e.append(this.#r,this.#t),t.append(e,this.#e),this.#h=r=>{const o=r.target.closest(".fg-row");o&&this.#v(o._ancestors)},this.#f=r=>{r.target.closest(".fg-row")&&this.#v(null)}}connectedCallback(){P(this,this.getAttribute("color")),this.#t.addEventListener("mouseenter",this.#h,!0),this.#t.addEventListener("mouseleave",this.#f,!0),this.#t.firstChild||this.#u(),this.#g(),this.#o=D(this.#e,280,()=>this.hasAttribute("disabled")||this.getAttribute("glow")==="false")}disconnectedCallback(){this.#o?.(),this.#o=null,this.#t.removeEventListener("mouseenter",this.#h,!0),this.#t.removeEventListener("mouseleave",this.#f,!0)}attributeChangedCallback(){P(this,this.getAttribute("color")),(this.#e.isConnected||this.#t.firstChild)&&this.#g()}get elements(){return this.#a}set elements(t){this.#a=Array.isArray(t)?t:null,this.#u(),this.#g()}get defaultOpenIds(){return this.#l}set defaultOpenIds(t){this.#l=Array.isArray(t)?t:[],this.#u()}#p(){return this.#a??Z}#u(){this.#t.textContent="",this.#c=[],this.#s=[],this.#d=[],this.#n=null,this.#i=new Set(this.#l),(function t(e,r){for(const o of e)o.type==="folder"&&o.defaultOpen&&r.#i.add(o.id),o.children&&t(o.children,r)})(this.#p(),this),this.#m(this.#p(),0,[],this.#t)}#m(t,e,r,o){for(const n of t){const h=n.type==="folder",l=this.#x(n,e,r,h);if(o.appendChild(l),h){const d=document.createElement("div");d.className="fg-children";const s=this.#i.has(n.id);d.hidden=!s,l._kids=d,l._chevron.classList.toggle("is-open",s),l.setAttribute("aria-expanded",String(s)),o.appendChild(d),n.children&&n.children.length&&this.#m(n.children,e+1,r.concat(n.id),d)}}}#x(t,e,r,o){const n=document.createElement("div");n.className="fg-row"+(o?" is-folder":"")+(t.highlight?" is-hl":""),n.setAttribute("role","treeitem"),n._node=t,n._ancestors=r,n._isFolder=o;for(let u=1;u<=e;u++){const m=document.createElement("span");m.className="fg-guide",m.setAttribute("aria-hidden","true"),m._col=u,m._ancestorId=r[u-1],this.#s.push(m),n.appendChild(m)}const h=document.createElement("span");h.className="fg-indent",h.setAttribute("aria-hidden","true"),h._depth=e,this.#d.push(h),n.appendChild(h);const l=document.createElement("span");l.setAttribute("aria-hidden","true"),o?(l.className="fg-chevron",l.appendChild(E.chevron())):l.className="fg-chevron fg-chevron--ghost",n._chevron=l,n.appendChild(l);const d=document.createElement("span");d.className="fg-icon",d.setAttribute("aria-hidden","true"),d.appendChild(o?E.folder():(E[q(t.name)]||E.file)()),n.appendChild(d);const s=document.createElement("span");return s.className="fg-name",s.textContent=t.name,n.appendChild(s),o||n.setAttribute("aria-selected","false"),n.addEventListener("click",()=>this.#b(n)),n.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),this.#b(n))}),this.#c.push(n),n}#b(t){if(!this.hasAttribute("disabled"))if(t._isFolder)this.#y(t);else{this.#n&&(this.#n.classList.remove("is-sel"),this.#n.setAttribute("aria-selected","false")),this.#n=t,t.classList.add("is-sel"),t.setAttribute("aria-selected","true");const e=t._ancestors.concat(t._node.id);this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{node:t._node,path:e}}))}}#y(t){const e=t._node.id,r=!this.#i.has(e);r?this.#i.add(e):this.#i.delete(e),t._kids&&(t._kids.hidden=!r),t._chevron.classList.toggle("is-open",r),t.setAttribute("aria-expanded",String(r));const o=t._ancestors.concat(e);this.dispatchEvent(new CustomEvent("toggle",{bubbles:!0,composed:!0,detail:{node:t._node,path:o,open:r}}))}#v(t){const e=t?new Set(t):null;for(const r of this.#s)r.classList.toggle("is-lit",!!e&&e.has(r._ancestorId))}#g(){const t=this.getAttribute("radius")||"rounded",e=this.hasAttribute("disabled"),r=this.hasAttribute("show-icons"),o=this.getAttribute("highlight-color")||"var(--ui-accent, #ededed)",n=parseInt(this.getAttribute("indent-size"),10)||16,h=parseFloat(this.getAttribute("max-vh"))||90;this.#e.className="fg fg--r-"+t+(e?" is-disabled":"")+(r?"":" hide-icons"),this.#e.style.setProperty("--fg-accent",o),this.#e.style.setProperty("--fg-indent",n+"px"),typeof window<"u"&&(this.#t.style.maxHeight=Math.round(window.innerHeight*h/100)+"px");for(const l of this.#s)l.style.left=(l._col-1)*n+8+"px";for(const l of this.#d)l.style.width=l._depth*n+"px";for(const l of this.#c)l.setAttribute("tabindex",e?"-1":"0")}}customElements.define("vs-file-tree-guides",Q);
