const y=new Set;let A=0,E=0,N=!1,k=0,M=!1,L=null;function $(){if(k=0,!!N)for(const n of y){if(!n.visible)continue;if(n.disabled()){n.lastI!==0&&(n.el.style.setProperty("--glow","0"),n.lastI=0);continue}n.rect||(n.rect=n.el.getBoundingClientRect());const e=n.rect,t=Math.max(e.left,Math.min(A,e.right)),i=Math.max(e.top,Math.min(E,e.bottom)),s=Math.max(0,1-Math.hypot(A-t,E-i)/n.radius);s===0&&n.lastI===0||(n.el.style.setProperty("--gx",`${A-e.left}px`),n.el.style.setProperty("--gy",`${E-e.top}px`),n.el.style.setProperty("--glow",s.toFixed(3)),n.lastI=s)}}function X(n){A=n.clientX,E=n.clientY,N=!0,k||(k=requestAnimationFrame($))}function z(){for(const n of y)n.rect=null;N&&!k&&(k=requestAnimationFrame($))}function Y(n,e,t){M||(M=!0,addEventListener("pointermove",X,{passive:!0}),addEventListener("scroll",z,{passive:!0,capture:!0}),addEventListener("resize",z,{passive:!0}),L=new IntersectionObserver(l=>{for(const c of l)for(const p of y)p.el===c.target&&(p.visible=c.isIntersecting,c.isIntersecting&&(p.rect=null))}));const i={el:n,radius:e,disabled:t,rect:null,visible:!0,lastI:0};y.add(i),L.observe(n);const s=H.add(n);return()=>{y.delete(i),L.unobserve(n),s()}}const _=(n,e,t)=>{if(!n.hasAttribute(e))return t;const i=n.getAttribute(e);return!(i==="false"||i==="0")},B='a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',q=560,F="http://www.w3.org/2000/svg";function D(){const n=document.createElementNS(F,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("aria-hidden","true");for(const e of["M6 6L18 18","M18 6L6 18"]){const t=document.createElementNS(F,"path");t.setAttribute("d",e),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),n.appendChild(t)}return n}const H=globalThis[Symbol.for("vs-light")]||=(()=>{const n=new Set,e=110,t=1.6,i=1.7,s=34,l=72,c=[[.6,0],[.42,30],[.16,58],[0,82]],p=[[.6,0],[.27,42],[.08,66],[0,85]],g=[[.85,0],[.4,42],[.12,66],[0,84]];let o=0,w=null;const C=(h,r,d)=>{const f=r.w/2+h,b=r.h/2+h,u=r.h/2/b;return`radial-gradient(${f.toFixed(1)}px ${b.toFixed(1)}px at ${r.x.toFixed(1)}px ${r.y.toFixed(1)}px,`+d.map(([a,m])=>` rgb(${r.rgb} / ${(a*r.k).toFixed(3)}) ${((u+m/100*(1-u))*100).toFixed(1)}%`).join(",")+")"};function O(){const h=[];for(const r of document.querySelectorAll("[color],[data-lamp]")){const d=getComputedStyle(r),f=d.getPropertyValue("--vs-color-rgb").trim()||(r.hasAttribute("data-lamp")?(d.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");f&&h.push({el:r,rgb:f,rect:r.getBoundingClientRect()})}return h}function T(){if(o=0,!n.size)return;const h=O();for(const r of n){if(!r.visible)continue;if(!h.length){r.on&&(r.el.style.setProperty("--lit","0"),r.on=!1);continue}const d=r.el.getBoundingClientRect(),f=d.left+d.width/2,b=d.top+d.height/2,u=[];for(const a of h){if(a.el===r.el||a.el.contains(r.el)||r.el.contains(a.el))continue;const m=Math.max(a.rect.left,Math.min(f,a.rect.right)),S=Math.max(a.rect.top,Math.min(b,a.rect.bottom)),R=Math.max(d.left,Math.min(m,d.right)),j=Math.max(d.top,Math.min(S,d.bottom)),I=Math.max(0,1-Math.hypot(m-R,S-j)/e)**t*i;I&&u.push({rgb:a.rgb,k:Math.min(1,I),w:a.rect.width,h:a.rect.height,x:a.rect.left+a.rect.width/2-d.left,y:a.rect.top+a.rect.height/2-d.top})}if(!u.length){r.on&&(r.el.style.setProperty("--lit","0"),r.on=!1);continue}u.sort((a,m)=>a.k-m.k),r.el.style.setProperty("--lit-ring",u.flatMap(a=>[C(s,a,c),C(l,a,p)]).join(",")),r.el.style.setProperty("--lit-fill",u.map(a=>C(l,a,g)).join(",")),r.el.style.setProperty("--lit","1"),r.on=!0}}const v=()=>{o||(o=requestAnimationFrame(T))};return addEventListener("scroll",v,{passive:!0,capture:!0}),addEventListener("resize",v,{passive:!0}),globalThis.vsLight=v,{add(h){w||=new IntersectionObserver(d=>{for(const f of d)for(const b of n)b.el===f.target&&(b.visible=f.isIntersecting);v()});const r={el:h,visible:!0,on:!1};return n.add(r),w.observe(h),v(),()=>{n.delete(r),w.unobserve(h)}}}})(),G=`
  :host { display: inline-block; }
  .drw-trigger {
    appearance: none;
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-card, #111);
    color: var(--text, #ededed);
    font: inherit;
    font-size: 14px;
    padding: 10px 18px;
    border-radius: var(--ctrl-r-md, 10px);
    cursor: pointer;
    transition: border-color 160ms ease, background 160ms ease;
  }
  .drw-trigger:hover { border-color: var(--ui-accent, #ededed); }
  /* embed mode: caller supplies their own trigger markup via slot="trigger";
     the wrapping button is stripped of all box styling so it's invisible —
     clicks on the slotted content still bubble through it to open(). */
  :host([embed]) .drw-trigger { all: unset; display: contents; cursor: pointer; }
  @media (prefers-reduced-motion: reduce) { .drw-trigger { transition: none; } }
`,K=`
  :host { all: initial; }
  * { box-sizing: border-box; }

  .drw-root { position: fixed; inset: 0; z-index: 1000; pointer-events: none; font-family: inherit; }
  .drw-root.is-open { pointer-events: auto; }

  .drw-ov {
    position: absolute;
    inset: 0;
    background: var(--backdrop, rgba(0, 0, 0, 0.5));
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 320ms ease;
  }
  .drw-ov.is-open { opacity: 1; }
  /* overlay lingers on close (delayed transition) so the page is never
     exposed while the panel is still mid-bounce off the edge */
  .drw-ov--leaving { transition: opacity 360ms ease 120ms; }
  /* gradient mode: no dim, no blur — only the feathered panel floats over
     the page (overlay stays transparent so it still catches a click) */
  .drw-ov--bare { background: transparent; backdrop-filter: none; -webkit-backdrop-filter: none; }

  .drw-panel {
    --drw-w: 380px;
    --drw-spring: cubic-bezier(0.34, 2.5, 0.45, 1);
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    position: absolute;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    background: var(--bg-card, #111);
    color: var(--text, #ededed);
    box-shadow: var(--drw-shadow, 0 24px 60px rgba(0, 0, 0, 0.45));
    outline: none;
    overflow: hidden; /* clip content while the measure springs open from 0 */
  }
  .drw-panel--left, .drw-panel--right { top: 0; height: 100%; width: min(var(--drw-w), calc(100vw - 48px)); }
  .drw-panel--left { left: 0; border-right: 1px solid var(--border, #2a2a2a); }
  .drw-panel--right { right: 0; border-left: 1px solid var(--border, #2a2a2a); }
  .drw-panel--top, .drw-panel--bottom { left: 0; width: 100%; height: min(var(--drw-w), calc(100vh - 48px)); }
  .drw-panel--top { top: 0; border-bottom: 1px solid var(--border, #2a2a2a); }
  .drw-panel--bottom { bottom: 0; border-top: 1px solid var(--border, #2a2a2a); }

  .drw-panel--sm { --drw-w: 300px; }
  .drw-panel--md { --drw-w: 380px; }
  .drw-panel--lg { --drw-w: 520px; }

  /* proximity glow ring on the panel border (see the .fx-glow base rule
     below — the same primitive vs-button.js / vs-badge.js use) */
  /* neighbour light — a coloured element nearby throws ITS colour on this one.
     Fed by the engine at the top of the file: --lit-fill / --lit-ring hold one
     gradient per lamp in reach, --lit is the master fade so a lamp leaving
     range dims out instead of cutting. Deliberately not on --glow: that one is
     the cursor's and other rules read it as a 0..1 intensity. */
  .drw-panel::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .drw-panel::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
  .drw-panel__glow {
    --glow-strength: 0.6;
    --glow-ring: 1px;
    --glow-inset: 0;
    --glow-r-core: 90px;
    --glow-r-soft: 280px;
    border-radius: inherit;
  }
  .fx-glow {
    position: absolute;
    inset: var(--glow-inset, 0);
    z-index: 1;
    border-radius: inherit;
    padding: var(--glow-ring, 1.5px);
    pointer-events: none;
    background:
      radial-gradient(var(--glow-r-core, 60px) circle at var(--gx, 50%) var(--gy, 50%),
        rgb(var(--fx-tint, 255 255 255) / 0.6), rgb(var(--fx-tint, 255 255 255) / 0.42) 30%, rgb(var(--fx-tint, 255 255 255) / 0.16) 58%, rgb(var(--fx-tint, 255 255 255) / 0) 82%),
      radial-gradient(var(--glow-r-soft, 200px) circle at var(--gx, 50%) var(--gy, 50%),
        rgb(var(--fx-tint-soft, var(--fx-tint, 255 255 255)) / var(--glow-soft-a, 0.6)), rgb(var(--fx-tint-soft, var(--fx-tint, 255 255 255)) / calc(var(--glow-soft-a, 0.6) * 0.45)) 42%, rgb(var(--fx-tint-soft, var(--fx-tint, 255 255 255)) / calc(var(--glow-soft-a, 0.6) * 0.14)) 66%, rgb(var(--fx-tint-soft, var(--fx-tint, 255 255 255)) / 0) 85%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    opacity: calc(var(--glow, 0) * var(--glow-strength, 0.4) * var(--glow-boost, 1));
    transition: opacity 140ms ease;
  }

  .drw-panel__head {
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; padding: 18px 20px;
    border-bottom: 1px solid var(--border, #2a2a2a);
    flex: none;
  }
  .drw-panel__title { margin: 0; font-size: 16px; font-weight: 600; color: var(--text, #ededed); }
  .drw-panel__x {
    appearance: none; border: none; background: transparent;
    color: var(--text, #ededed);
    width: 30px; height: 30px; display: grid; place-items: center;
    border-radius: var(--ctrl-r-sm, 8px); cursor: pointer;
    transition: background 140ms ease;
  }
  .drw-panel__x svg { width: 18px; height: 18px; }
  .drw-panel__x:hover { background: var(--bg-input, rgba(255, 255, 255, 0.06)); }
  .drw-panel__x[hidden] { display: none; }

  .drw-panel__body { flex: 1; padding: 20px; overflow-y: auto; font-size: 14px; line-height: 1.55; color: var(--text-secondary, #c4c4c4); }
  .drw-panel__placeholder { margin: 0; }
  .drw-panel__placeholder code {
    font-family: var(--font-mono, monospace);
    padding: 1px 6px; border-radius: 6px;
    background: var(--bg-input, rgba(255, 255, 255, 0.06));
    color: var(--text, #ededed);
  }
  .drw-panel__foot {
    display: flex; justify-content: flex-end; gap: 10px;
    padding: 16px 20px; border-top: 1px solid var(--border, #2a2a2a);
    flex: none;
  }
  .drw-panel__foot[hidden] { display: none; }

  .drw-panel--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; }
  .drw-panel--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36; }
  .drw-panel--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; }

  /* gradient mode: no hard inner border, no drop shadow — the panel color
     feathers out to opacity 0 past the inner edge via a ::before gradient.
     Needs overflow:visible so the feather can bleed beyond the panel box. */
  .drw-panel--gradient { border: none; box-shadow: none; overflow: visible; }
  .drw-panel--gradient .drw-panel__glow { display: none; }
  .drw-panel--gradient::before {
    content: ''; position: absolute; pointer-events: none; z-index: -1;
  }
  .drw-panel--gradient.drw-panel--right::before { top: 0; bottom: 0; right: 100%; width: 140px; background: linear-gradient(to left, var(--bg-card, #111), transparent); }
  .drw-panel--gradient.drw-panel--left::before { top: 0; bottom: 0; left: 100%; width: 140px; background: linear-gradient(to right, var(--bg-card, #111), transparent); }
  .drw-panel--gradient.drw-panel--top::before { left: 0; right: 0; top: 100%; height: 140px; background: linear-gradient(to bottom, var(--bg-card, #111), transparent); }
  .drw-panel--gradient.drw-panel--bottom::before { left: 0; right: 0; bottom: 100%; height: 140px; background: linear-gradient(to top, var(--bg-card, #111), transparent); }

  /* ── unique effect 1/2: punchy spring on enter — a slide-in (transform)
     UNION a measure spring that overshoots the target size and settles
     (width for left/right, height for top/bottom), floored at 300px so it
     never starts fully collapsed. "--from" supplies the closed/floored
     state; "--entering" supplies the transition and stays present through
     the settle (removing "--from" is what triggers the animation). ── */
  .drw-panel--entering {
    transition:
      transform 440ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      width 560ms var(--drw-spring),
      height 560ms var(--drw-spring);
  }
  .drw-panel--right.drw-panel--from { transform: translateX(100%); width: 300px; }
  .drw-panel--left.drw-panel--from { transform: translateX(-100%); width: 300px; }
  .drw-panel--bottom.drw-panel--from { transform: translateY(100%); height: 300px; }
  .drw-panel--top.drw-panel--from { transform: translateY(-100%); height: 300px; }

  /* ── unique effect 2/2: bounce-off-the-wall on leave — a single slide out
     to the edge, then a bounce off the "wall": the panel overshoots fully
     hidden, rebounds a sliver back into view, settles hidden. Keyframes,
     not a transition — a single cubic-bezier can't come back into view
     past its own endpoint. ── */
  .drw-panel--right.drw-panel--leaving { animation: drw-out-right 500ms cubic-bezier(0.4, 0, 0.5, 1) both; }
  .drw-panel--left.drw-panel--leaving { animation: drw-out-left 500ms cubic-bezier(0.4, 0, 0.5, 1) both; }
  .drw-panel--bottom.drw-panel--leaving { animation: drw-out-bottom 500ms cubic-bezier(0.4, 0, 0.5, 1) both; }
  .drw-panel--top.drw-panel--leaving { animation: drw-out-top 500ms cubic-bezier(0.4, 0, 0.5, 1) both; }

  @keyframes drw-out-right {
    0%   { transform: translateX(0); }
    60%  { transform: translateX(100%); }  /* hits the wall, hidden */
    78%  { transform: translateX(90%); }   /* bounces a sliver back into view */
    100% { transform: translateX(100%); }  /* settles hidden */
  }
  @keyframes drw-out-left {
    0%   { transform: translateX(0); }
    60%  { transform: translateX(-100%); }
    78%  { transform: translateX(-90%); }
    100% { transform: translateX(-100%); }
  }
  @keyframes drw-out-bottom {
    0%   { transform: translateY(0); }
    60%  { transform: translateY(100%); }
    78%  { transform: translateY(90%); }
    100% { transform: translateY(100%); }
  }
  @keyframes drw-out-top {
    0%   { transform: translateY(0); }
    60%  { transform: translateY(-100%); }
    78%  { transform: translateY(-90%); }
    100% { transform: translateY(-100%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .drw-ov, .drw-ov--leaving { transition: none; }
    .drw-panel--entering { transition: none; }
    .drw-panel--right.drw-panel--leaving,
    .drw-panel--left.drw-panel--leaving,
    .drw-panel--top.drw-panel--leaving,
    .drw-panel--bottom.drw-panel--leaving { animation: none; }
  }
`;let x;function V(n){if(x||=document.createElement("canvas").getContext("2d"),!x)return null;x.fillStyle="#000",x.fillStyle=n;const e=x.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const U=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function P(n,e){const t=e?V(String(e).trim()):null;if(!t){for(const o of U)n.style.removeProperty(o);return}const i=o=>(o/=255,o<=.03928?o/12.92:((o+.055)/1.055)**2.4),l=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,p=t.map(o=>Math.round(l?o*.92:o+(255-o)*.16)),g=(o,w)=>n.style.setProperty(o,w);for(const o of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])g(o,c);g("--btn-primary-bg-hover",`rgb(${p[0]} ${p[1]} ${p[2]})`);for(const o of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])g(o,t.join(" "));for(const o of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])g(o,l?"#0b0b0b":"#ffffff");for(const o of["--btn-primary-rip","--btn-primary-glow"])g(o,l?"0 0 0":"255 255 255");g("--vs-color",c),g("--vs-color-rgb",t.join(" ")),g("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class W extends HTMLElement{static observedAttributes=["open","side","size","title","tone","prevent-close","close-hidden","trigger-label","embed","glow","gradient","color"];#a;#h;#e=null;#i;#n;#t;#l;#d;#r;#s;#g=null;#f=null;#c=null;#p=0;#o=!1;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=G,this.#a=document.createElement("button"),this.#a.type="button",this.#a.className="drw-trigger";const i=document.createElement("slot");i.name="trigger",this.#h=document.createTextNode(this.getAttribute("trigger-label")||"Open drawer"),i.appendChild(this.#h),this.#a.appendChild(i),e.append(t,this.#a),this.#a.addEventListener("click",()=>this.show()),this.#c=s=>this.#k(s)}connectedCallback(){P(this,this.getAttribute("color")),this.#u()}disconnectedCallback(){clearTimeout(this.#p),document.removeEventListener("keydown",this.#c,!0),this.#o&&(document.body.style.overflow=""),this.#o=!1,this.#g?.(),this.#g=null,this.#m(),this.#e&&this.#e.isConnected&&this.#e.remove()}attributeChangedCallback(e){if(P(this,this.getAttribute("color")),e==="open"){const t=this.hasAttribute("open");t!==this.#o&&(t?this.#x():this.#y());return}this.#u()}get open(){return this.hasAttribute("open")}set open(e){e?this.setAttribute("open",""):this.removeAttribute("open")}show(){this.setAttribute("open","")}close(){this.hasAttribute("prevent-close")||this.removeAttribute("open")}toggle(){this.hasAttribute("open")?this.close():this.show()}#u(){const e=(s,l)=>this.getAttribute(s)??l;if(this.#h.textContent=e("trigger-label","Open drawer"),!this.#t)return;this.#d.textContent=e("title","Drawer title"),this.#t.setAttribute("aria-label",e("title","Drawer title")),this.#b(),this.#n.classList.toggle("drw-ov--bare",_(this,"gradient",!1));const t=this.hasAttribute("prevent-close"),i=this.hasAttribute("close-hidden");this.#r.style.display=i||t?"none":""}#b(e){e===void 0&&(e=this.#t.classList.contains("drw-panel--leaving")?"drw-panel--leaving":this.#t.classList.contains("drw-panel--entering")?"drw-panel--entering":"");const t=(l,c)=>this.getAttribute(l)??c,i=_(this,"gradient",!1),s=this.#t.classList.contains("drw-panel--from");this.#t.className=`drw-panel drw-panel--${t("side","right")} drw-panel--${t("size","md")} drw-panel--t-${t("tone","default")}`+(i?" drw-panel--gradient":"")+(e?" "+e:"")+(s?" drw-panel--from":"")}#w(){if(this.#e)return;this.#e=document.createElement("div");const e=this.#e.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=K,this.#i=document.createElement("div"),this.#i.className="drw-root",this.#n=document.createElement("div"),this.#n.className="drw-ov",this.#n.setAttribute("aria-hidden","true"),this.#n.addEventListener("click",()=>{this.hasAttribute("prevent-close")||this.close()}),this.#t=document.createElement("aside"),this.#t.setAttribute("role","dialog"),this.#t.setAttribute("aria-modal","true"),this.#t.tabIndex=-1,this.#l=document.createElement("span"),this.#l.className="fx-glow drw-panel__glow",this.#l.setAttribute("aria-hidden","true");const i=document.createElement("header");i.className="drw-panel__head",this.#d=document.createElement("h2"),this.#d.className="drw-panel__title",this.#r=document.createElement("button"),this.#r.type="button",this.#r.className="drw-panel__x",this.#r.setAttribute("aria-label","Close"),this.#r.appendChild(D()),this.#r.addEventListener("click",()=>this.close()),i.append(this.#d,this.#r);const s=document.createElement("div");s.className="drw-panel__body";const l=document.createElement("slot"),c=document.createElement("p");c.className="drw-panel__placeholder",c.append("Drawer content. Pass your markup via ",Object.assign(document.createElement("code"),{textContent:"<slot>"}),"."),l.appendChild(c),s.appendChild(l),this.#s=document.createElement("footer"),this.#s.className="drw-panel__foot",this.#s.hidden=!0;const p=document.createElement("slot");p.name="footer",p.addEventListener("slotchange",()=>{this.#s.hidden=p.assignedNodes({flatten:!0}).length===0}),this.#s.appendChild(p),this.#t.append(this.#l,i,s,this.#s),this.#i.append(this.#n,this.#t),e.append(t,this.#i),this.#g=Y(this.#t,260,()=>!_(this,"glow",!0)||_(this,"gradient",!1)),this.#u()}#v(){const e=[...this.childNodes].filter(t=>!(t.nodeType===1&&t.getAttribute("slot")==="trigger"));for(const t of e)this.#e.appendChild(t)}#m(){if(this.#e)for(const e of[...this.#e.childNodes])this.appendChild(e)}#x(){clearTimeout(this.#p),this.#w(),this.#v(),this.#e.isConnected||document.body.appendChild(this.#e),this.#o=!0,this.#f=document.activeElement,document.body.style.overflow="hidden",document.addEventListener("keydown",this.#c,!0),this.#n.classList.remove("is-open","drw-ov--leaving"),this.#b("drw-panel--entering"),this.#t.classList.add("drw-panel--from"),this.#t.offsetWidth,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.#o&&(this.#i.classList.add("is-open"),this.#n.classList.add("is-open"),this.#t.classList.remove("drw-panel--from"),this.#t.focus())})}),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#y(){this.#o=!1,this.#i&&this.#i.classList.remove("is-open"),this.#n&&(this.#n.classList.remove("is-open"),this.#n.classList.add("drw-ov--leaving")),this.#t&&this.#b("drw-panel--leaving"),document.removeEventListener("keydown",this.#c,!0),document.body.style.overflow="",this.#f?.focus?.(),this.#f=null,clearTimeout(this.#p);const e=()=>{this.#o||(this.#m(),this.#e&&this.#e.isConnected&&this.#e.remove())};if(this.#t){const t=i=>{i.target===this.#t&&(this.#t.removeEventListener("animationend",t),e())};this.#t.addEventListener("animationend",t),this.#p=setTimeout(()=>{this.#t?.removeEventListener("animationend",t),e()},q)}else e();this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#k(e){if(e.key==="Escape"&&!this.hasAttribute("prevent-close")){e.preventDefault(),this.close();return}if(e.key!=="Tab"||!this.#t)return;const t=this.#t.querySelectorAll(B);if(!t.length)return;const i=t[0],s=t[t.length-1],l=this.#t.getRootNode().activeElement;e.shiftKey&&l===i?(e.preventDefault(),s.focus()):!e.shiftKey&&l===s&&(e.preventDefault(),i.focus())}}customElements.define("vs-drawer",W);
