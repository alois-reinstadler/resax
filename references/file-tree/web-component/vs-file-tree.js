import{attachGlow as A}from"./vs-fx.CLXiCjCI.js";const g="http://www.w3.org/2000/svg",u={folder:[{d:"M4 6a2 2 0 0 1 2-2h3.2a2 2 0 0 1 1.4.6L12 6h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"}],folderOpen:[{d:"M4 7a2 2 0 0 1 2-2h3.2a2 2 0 0 1 1.4.6L12 7h6a2 2 0 0 1 2 2v1"},{d:"M3.4 11.5A1.5 1.5 0 0 1 4.85 10.4H20.2a1.2 1.2 0 0 1 1.16 1.5l-1.2 5A1.5 1.5 0 0 1 18.7 18H5.2a1.5 1.5 0 0 1-1.45-1.1L3.4 11.5Z"}],file:[{d:"M7 3.5h6.5L18.5 8.5V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"},{d:"M13 3.6V8.5h4.9"}],code:[{d:"M7 3.5h6.5L18.5 8.5V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"},{d:"M13 3.6V8.5h4.9"},{d:"m10.3 13.2-1.8 1.8 1.8 1.8"},{d:"m13.7 13.2 1.8 1.8-1.8 1.8"}],json:[{d:"M7 3.5h6.5L18.5 8.5V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"},{d:"M13 3.6V8.5h4.9"},{d:"M10.2 12.5c-1 0-1.2.6-1.2 1.4s.2 1.1-.6 1.6c.8.5.6.8.6 1.6s.2 1.4 1.2 1.4"},{d:"M13.8 12.5c1 0 1.2.6 1.2 1.4s-.2 1.1.6 1.6c-.8.5-.6.8-.6 1.6s-.2 1.4-1.2 1.4"}],text:[{d:"M7 3.5h6.5L18.5 8.5V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"},{d:"M13 3.6V8.5h4.9"},{d:"M8.5 12.5h4"},{d:"M8.5 15h7"},{d:"M8.5 17.5h7"}],image:[{d:"M7 3.5h6.5L18.5 8.5V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"},{d:"M13 3.6V8.5h4.9"},{tag:"circle",attrs:{cx:"10",cy:"13.5",r:"1.1"}},{d:"M6 19l3.2-3.2a1 1 0 0 1 1.4 0L14 19"}],cog:[{tag:"circle",attrs:{cx:"12",cy:"12",r:"2.6"}},{d:"M12 4.5v1.8M12 17.7v1.8M19.5 12h-1.8M6.3 12H4.5M17.3 6.7l-1.3 1.3M8 16l-1.3 1.3M17.3 17.3 16 16M8 8 6.7 6.7"}]},k="M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008",E={tsx:"code",ts:"code",jsx:"code",js:"code",mjs:"code",cjs:"code",vue:"code",json:"json",md:"text",mdx:"text",txt:"text",png:"image",jpg:"image",jpeg:"image",svg:"image",webp:"image",gif:"image",config:"cog",toml:"cog",yaml:"cog",yml:"cog",env:"cog",lock:"cog"};function M(c,t){if(t)return t;const e=(c.split(".").pop()||"").toLowerCase();return E[e]||"file"}function w(c){const t=document.createElementNS(g,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none");for(const e of c)if(e.tag==="circle"){const i=document.createElementNS(g,"circle");for(const n in e.attrs)i.setAttribute(n,e.attrs[n]);t.appendChild(i)}else{const i=document.createElementNS(g,"path");i.setAttribute("d",e.d),t.appendChild(i)}return t}function C(){const c=document.createElementNS(g,"svg");c.setAttribute("viewBox","0 0 24 24"),c.setAttribute("fill","none");const t=document.createElementNS(g,"path");return t.setAttribute("d",k),c.appendChild(t),c}const L=[{id:"src",name:"src",type:"folder",defaultOpen:!0,children:[{id:"components",name:"components",type:"folder",defaultOpen:!0,children:[{id:"button",name:"VsButton.vue"},{id:"tree",name:"VsFileTree.vue",highlight:!0},{id:"input",name:"VsInput.vue"}]},{id:"lib",name:"lib",type:"folder",children:[{id:"effects",name:"effects",type:"folder",children:[{id:"press",name:"usePress.ts"},{id:"glow",name:"useProximityGlow.ts"}]},{id:"utils",name:"utils.ts"}]},{id:"styles",name:"tokens.css"},{id:"main",name:"main.ts"}]},{id:"readme",name:"README.md"},{id:"pkg",name:"package.json"},{id:"cfg",name:"tsconfig.json"}],_=154,N=`
  :host { display: block; }
  .vft {
    --rr: 14px;
    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 340px;
    border: 1px solid var(--border, #1f1f1f);
    border-radius: var(--rr);
    background: var(--bg-card, #0a0a0a);
    color: var(--text, #ededed);
    font-family: inherit;
  }
  .vft--r-subtle { --rr: 8px; }
  .vft--r-pill { --rr: 22px; }
  @supports (corner-shape: squircle) { .vft--r-squircle { corner-shape: squircle; --rr: 22px; } }

  .vft__glow {
    --glow-strength: 0.9;
    --glow-ring: 1px;
    --glow-inset: -1px;
    --glow-r-core: 90px;
    --glow-r-soft: 260px;
    position: absolute;
    inset: var(--glow-inset, 0);
    z-index: 1;
    border-radius: var(--rr);
    padding: var(--glow-ring, 1.5px);
    pointer-events: none;
    background:
      radial-gradient(
        var(--glow-r-core, 60px) circle at var(--gx, 50%) var(--gy, 50%),
        rgb(var(--fx-tint, 255 255 255) / 0.6),
        rgb(var(--fx-tint, 255 255 255) / 0.42) 30%,
        rgb(var(--fx-tint, 255 255 255) / 0.16) 58%,
        rgb(var(--fx-tint, 255 255 255) / 0) 82%
      ),
      radial-gradient(
        var(--glow-r-soft, 200px) circle at var(--gx, 50%) var(--gy, 50%),
        rgb(var(--fx-tint-soft, var(--fx-tint, 255 255 255)) / var(--glow-soft-a, 0.6)),
        rgb(var(--fx-tint-soft, var(--fx-tint, 255 255 255)) / calc(var(--glow-soft-a, 0.6) * 0.45)) 42%,
        rgb(var(--fx-tint-soft, var(--fx-tint, 255 255 255)) / calc(var(--glow-soft-a, 0.6) * 0.14)) 66%,
        rgb(var(--fx-tint-soft, var(--fx-tint, 255 255 255)) / 0) 85%
      );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    opacity: calc(var(--glow, 0) * var(--glow-strength, 0.4) * var(--glow-boost, 1) * var(--glow-soften, 0.7));
    transition: opacity 140ms ease;
  }
  .vft--r-pill .vft__glow { border-radius: 999px; }
  @supports (corner-shape: squircle) { .vft--r-squircle .vft__glow { corner-shape: squircle; } }

  .vft__body {
    position: relative;
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: var(--border-hover, #2e2e2e) transparent;
  }
  .vft__body::-webkit-scrollbar { width: 6px; }
  .vft__body::-webkit-scrollbar-track { background: transparent; }
  .vft__body::-webkit-scrollbar-thumb { background: var(--border-hover, #2e2e2e); border-radius: 999px; }
  .vft__body::-webkit-scrollbar-thumb:hover { background: var(--border-strong, #3a3a3a); }

  .vft__hl {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    border-radius: 9px;
    background: var(--bg-elevated, #111);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    opacity: 0;
    transform-origin: top left;
    transition:
      transform 360ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      width 360ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      height 360ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      opacity 200ms ease;
    pointer-events: none;
  }
  .vft__hl.is-on { opacity: 1; }

  .vft.is-disabled { opacity: 0.55; pointer-events: none; }
  .vft.hide-icons .vft-icon { display: none; }

  /* ── node / row (VsFileTreeNode.vue) ─────────────────────────────────── */
  .vft-node { position: relative; z-index: 1; }

  .vft-row {
    --mx: 50%;
    --my: 50%;
    --lit: 0;
    position: relative;
    z-index: 2;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 7px 9px;
    border: 0;
    border-radius: 9px;
    background: transparent;
    color: var(--text, #ededed);
    font: inherit;
    font-size: 13.5px;
    text-align: start;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    transition:
      color 200ms var(--ease-out, ease),
      transform 180ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  }
  .vft-row.is-hl { font-weight: 600; }

  .vft-name {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: calc(0.45 + 0.55 * var(--lit));
    transition: opacity 180ms ease;
  }
  .vft-row.is-hl .vft-name { opacity: 1; }

  .vft-chevron {
    display: inline-flex;
    flex: 0 0 14px;
    width: 14px;
    height: 14px;
    color: var(--text-muted, #666);
    transition: transform 360ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  }
  .vft-chevron svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.1; stroke-linecap: round; stroke-linejoin: round; }
  .vft-chevron.is-open { transform: rotate(90deg); }
  .vft-chevron--ghost { visibility: hidden; }

  .vft-icon { position: relative; display: inline-flex; flex: 0 0 18px; width: 18px; height: 18px; color: var(--text-secondary, #a1a1a1); }
  .vft-ico-svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
  .vft-ico-closed, .vft-ico-open {
    position: absolute;
    inset: 0;
    opacity: 0;
    transform: scale(0.5) rotate(-15deg);
    filter: blur(3px);
    transition:
      opacity 280ms var(--ease-out, ease),
      transform 400ms var(--ease-spring, cubic-bezier(0.25, 1.6, 0.4, 1)),
      filter 280ms ease;
  }
  .vft-ico-svg.is-on { opacity: 1; transform: scale(1) rotate(0deg); filter: blur(0); }
  .vft-ico-open { transform: scale(0.5) rotate(15deg); color: var(--ui-accent, #ededed); }

  .vft-collapse {
    --spring: cubic-bezier(0.34, 1.8, 0.42, 1);
    --spring-soft: cubic-bezier(0.22, 1.2, 0.36, 1);
    position: relative;
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 600ms var(--spring);
  }
  .vft-collapse.is-open { grid-template-rows: 1fr; }
  .vft-collapse__inner {
    min-height: 0;
    overflow: hidden;
    transform-origin: top center;
    will-change: filter, opacity, transform;
    opacity: 0;
    filter: blur(14px);
    transform: translateY(-6px) scale(0.97);
    transition:
      opacity 440ms cubic-bezier(0.6, 0, 0.9, 0.3),
      filter 460ms cubic-bezier(0.4, 0, 0.2, 1),
      transform 480ms var(--spring-soft);
  }
  .vft-collapse.is-open > .vft-collapse__inner {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0) scale(1);
    transition:
      opacity 320ms ease 40ms,
      filter 420ms cubic-bezier(0.4, 0, 0.2, 1) 40ms,
      transform 520ms var(--spring-soft) 40ms;
  }

  .vft-branch { position: relative; padding-left: 11px; }
  .vft-branch::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent 0%, var(--border, #1f1f1f) 18%, var(--border, #1f1f1f) 82%, transparent 100%);
  }

  .vft-ripple {
    position: absolute;
    translate: -50% -50%;
    border-radius: 50%;
    background: rgb(var(--fx-tint, 255 255 255) / var(--fx-rip-a, 0.12));
    pointer-events: none;
    animation: vft-ripple 600ms ease-out forwards;
  }
  @keyframes vft-ripple {
    from { transform: scale(0); opacity: 1; }
    to   { transform: scale(1); opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .vft__hl { transition: opacity 160ms ease; backdrop-filter: none; -webkit-backdrop-filter: none; }
    .vft-chevron, .vft-ico-closed, .vft-ico-open, .vft-collapse, .vft-collapse__inner, .vft-row { transition: none !important; }
    .vft-collapse__inner { filter: none; transform: none; }
    .vft-name { opacity: 1; }
    .vft-ripple { display: none; }
  }
`;let m;function V(c){if(m||=document.createElement("canvas").getContext("2d"),!m)return null;m.fillStyle="#000",m.fillStyle=c;const t=m.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const S=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function x(c,t){const e=t?V(String(t).trim()):null;if(!e){for(const s of S)c.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),o=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,r=e.map(s=>Math.round(o?s*.92:s+(255-s)*.16)),l=(s,p)=>c.style.setProperty(s,p);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(s,a);l("--btn-primary-bg-hover",`rgb(${r[0]} ${r[1]} ${r[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(s,o?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])l(s,o?"0 0 0":"255 255 255");l("--vs-color",a),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class z extends HTMLElement{static observedAttributes=["highlight-color","indent-size","show-icons","radius","disabled","glow","max-vh","color"];#s;#t;#e;#d=null;#p=[];#x=new Set;#h=[];#f=[];#v=[];#m=!1;#g=null;#r=[];#y=[];#u=[];#n=!1;#a=0;#l=0;#c=!1;#i=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=N,this.#s=document.createElement("div"),this.#s.className="vft";const i=document.createElement("span");i.className="fx-glow vft__glow",i.setAttribute("aria-hidden","true"),this.#t=document.createElement("div"),this.#t.className="vft__body",this.#t.setAttribute("role","tree"),this.#e=document.createElement("span"),this.#e.className="vft__hl",this.#e.setAttribute("aria-hidden","true"),this.#t.appendChild(this.#e),this.#s.append(i,this.#t),t.append(e,this.#s),this.#t.addEventListener("mouseleave",()=>this.#k(null)),this.#t.addEventListener("click",this.#o),this.#t.addEventListener("transitionend",this.#R)}connectedCallback(){x(this,this.getAttribute("color")),this.#m||this.#b(),window.addEventListener("pointermove",this.#M,{passive:!0}),window.addEventListener("scroll",this.#o,{passive:!0,capture:!0}),window.addEventListener("resize",this.#C,{passive:!0}),this.#g=A(this.#s,280,()=>this.hasAttribute("disabled")||!this.hasAttribute("glow"))}disconnectedCallback(){window.removeEventListener("pointermove",this.#M),window.removeEventListener("scroll",this.#o,{capture:!0}),window.removeEventListener("resize",this.#C),this.#i&&cancelAnimationFrame(this.#i),this.#i=0,this.#g?.(),this.#g=null}attributeChangedCallback(){x(this,this.getAttribute("color")),this.#m&&this.#L()}set elements(t){this.#d=Array.isArray(t)?t:null,this.#b()}get elements(){return this.#d}set defaultOpenIds(t){this.#p=Array.isArray(t)?t:[],this.#b()}get defaultOpenIds(){return this.#p}#b(){for(;this.#t.lastChild&&this.#t.lastChild!==this.#e;)this.#t.removeChild(this.#t.lastChild);this.#h=[],this.#f=[],this.#v=[],this.#x=new Set(this.#p);const t=this.#d??L;for(const e of t)this.#t.appendChild(this.#A(e));this.#m=!0,this.#L(),this.#O()}#A(t){const e=t.type==="folder",i=t.defaultOpen!=null?!!t.defaultOpen:this.#x.has(t.id),n=document.createElement("div");n.className="vft-node";const o=document.createElement(e?"button":"div");o.className="vft-row"+(e?" is-folder":"")+(i?" is-open":"")+(t.highlight?" is-hl":""),e&&(o.type="button",o.setAttribute("aria-expanded",String(i)));const a=document.createElement("span");a.setAttribute("aria-hidden","true"),e?(a.className="vft-chevron"+(i?" is-open":""),a.appendChild(C())):a.className="vft-chevron vft-chevron--ghost",o.appendChild(a);const r=document.createElement("span");r.className="vft-icon",r.setAttribute("aria-hidden","true");let l=null,s=null;if(e)l=w(u.folder),l.classList.add("vft-ico-svg","vft-ico-closed"),i||l.classList.add("is-on"),s=w(u.folderOpen),s.classList.add("vft-ico-svg","vft-ico-open"),i&&s.classList.add("is-on"),r.append(l,s);else{const d=w(u[M(t.name,t.icon)]||u.file);d.classList.add("vft-ico-svg","is-on"),r.appendChild(d)}o.appendChild(r);const p=document.createElement("span");p.className="vft-name",p.textContent=t.name,o.appendChild(p),n.appendChild(o);const h={node:t,row:o,chevron:a,icoClosed:l,icoOpen:s,open:i,isFolder:e,collapse:null};if(this.#h.push(h),this.#f.push(o),o.addEventListener("mouseenter",()=>this.#V(o)),o.addEventListener("pointerdown",d=>this.#S(d,o)),o.addEventListener("pointerup",()=>this.#E(o)),o.addEventListener("pointercancel",()=>this.#E(o)),e&&o.addEventListener("click",()=>this.#N(h)),e){const d=document.createElement("div");d.className="vft-collapse"+(i?" is-open":"");const f=document.createElement("div");f.className="vft-collapse__inner";const v=document.createElement("div");v.className="vft-branch";for(const b of t.children??[])v.appendChild(this.#A(b));f.appendChild(v),d.appendChild(f),n.appendChild(d),h.collapse=d,this.#v.push(d)}return n}#N(t){this.hasAttribute("disabled")||(t.open=!t.open,t.row.classList.toggle("is-open",t.open),t.row.setAttribute("aria-expanded",String(t.open)),t.chevron.classList.toggle("is-open",t.open),t.icoClosed&&t.icoClosed.classList.toggle("is-on",!t.open),t.icoOpen&&t.icoOpen.classList.toggle("is-on",t.open),t.collapse&&t.collapse.classList.toggle("is-open",t.open),this.dispatchEvent(new CustomEvent("toggle",{bubbles:!0,composed:!0,detail:{node:t.node,open:t.open}})),this.#o())}#V(t){if(this.hasAttribute("disabled"))return;const e=this.#t.getBoundingClientRect(),i=t.getBoundingClientRect();this.#k({top:i.top-e.top,left:i.left-e.left,width:i.width,height:i.height})}#k(t){t&&this.hasAttribute("disabled")||(t?(this.#e.style.transform=`translate(${t.left}px, ${t.top}px)`,this.#e.style.width=t.width+"px",this.#e.style.height=t.height+"px",this.#e.classList.add("is-on")):this.#e.classList.remove("is-on"))}#S(t,e){if(this.#z())return;const i=e.getBoundingClientRect(),n=t.clientX-i.left,o=t.clientY-i.top,a=Math.max(n,i.width-n),r=Math.max(o,i.height-o),l=Math.hypot(a,r)*2,s=document.createElement("span");for(s.className="vft-ripple",s.style.left=n+"px",s.style.top=o+"px",s.style.width=l+"px",s.style.height=l+"px",s.addEventListener("animationend",()=>s.remove()),e.appendChild(s);e.querySelectorAll(":scope > .vft-ripple").length>6;)e.querySelector(".vft-ripple").remove();const p=y=>Math.max(-1,Math.min(1,y)),h=p((n/i.width-.5)*2),d=p((o/i.height-.5)*2),f=1-.2*Math.min(Math.abs(h),Math.abs(d)),v=(-d*4*f).toFixed(2),b=(h*3*f).toFixed(2);e.style.transform=`perspective(600px) rotateX(${v}deg) rotateY(${b}deg) scale(0.98)`}#E(t){t.style.transform=""}#z(){return typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}#O(){this.#r=this.#f.slice(),this.#u=new Array(this.#r.length).fill(-1),this.#n=!1,this.#c&&!this.#i&&(this.#i=requestAnimationFrame(()=>this.#w()))}#o=()=>{this.#n=!1,this.#c&&!this.#i&&(this.#i=requestAnimationFrame(()=>this.#w()))};#R=t=>{t.propertyName==="grid-template-rows"&&this.#o()};#M=t=>{this.#a=t.clientX,this.#l=t.clientY,this.#c=!0,this.#i||(this.#i=requestAnimationFrame(()=>this.#w()))};#w(){if(this.#i=0,!!this.#c){this.#n||(this.#y=this.#r.map(t=>t.getBoundingClientRect()),this.#n=!0);for(let t=0;t<this.#r.length;t++){const e=this.#y[t],i=Math.max(0,e.left-this.#a,this.#a-e.right),n=Math.max(0,e.top-this.#l,this.#l-e.bottom),o=Math.hypot(i,n),a=Math.max(0,1-o/_);if(a===0&&this.#u[t]===0)continue;const r=this.#r[t];r.style.setProperty("--mx",this.#a-e.left+"px"),r.style.setProperty("--my",this.#l-e.top+"px"),r.style.setProperty("--lit",a.toFixed(3)),this.#u[t]=a}}}#C=()=>{this.#_(),this.#o()};#L(){const t=this.getAttribute("radius")||"rounded",e=this.hasAttribute("disabled"),i=this.hasAttribute("show-icons");this.#s.className=`vft vft--r-${t}`+(e?" is-disabled":"")+(i?"":" hide-icons");const n=Number(this.getAttribute("indent-size")),o=Number.isFinite(n)?n:16;for(const r of this.#v)r.style.marginLeft=o+"px";const a=this.getAttribute("highlight-color")||"var(--ui-accent, #ededed)";for(const r of this.#h)r.node.highlight?r.row.style.color=a:r.row.style.removeProperty("color");this.#_()}#_(){const t=Number(this.getAttribute("max-vh")),e=Number.isFinite(t)&&t>0?t:90;typeof window<"u"&&(this.#t.style.maxHeight=Math.round(window.innerHeight*e/100)+"px")}}customElements.define("vs-file-tree",z);
