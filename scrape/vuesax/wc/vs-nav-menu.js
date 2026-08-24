import{attachGlow as h,FX_CSS as b}from"./vs-fx.CLXiCjCI.js";const x=b+`
  /* max-width, not a breakpoint: the bar is shrink-to-fit, so without this it
     keeps its widest natural size and hangs out of any box narrower than the
     three triggers laid end to end. */
  :host { display: inline-flex; max-width: 100%; }
  .vnm {
    --accent: var(--ui-accent, #ededed);
    --ring: var(--ui-ring, 255 255 255);
    --fx-tint: 255 255 255;
    --rr: 14px;
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    font-family: inherit;
    color: var(--text, #ededed);
  }

  .vnm--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; }
  .vnm--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36; }
  .vnm--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; }

  .vnm--r-subtle { --rr: 10px; }
  .vnm--r-pill { --rr: 22px; }
  @supports (corner-shape: squircle) {
    .vnm--r-squircle { --rr: 22px; }
  }

  /* ── trigger list ─────────────────────────────────────────────────────── */
  .vnm__list {
    position: relative;
    isolation: isolate;
    display: flex;
    align-items: center;
    /* Wrap rather than scroll: the pill and the viewport are positioned from
       measured trigger rects, so a second row lands correctly, and every
       trigger stays reachable without a hidden scroll gesture. */
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    gap: 2px;
    margin: 0;
    padding: 4px;
    list-style: none;
    border: 1px solid var(--border, #1f1f1f);
    border-radius: calc(var(--rr) + 4px);
    background: var(--bg-card, #0a0a0a);
  }
  @supports (corner-shape: squircle) {
    .vnm--r-squircle .vnm__list { corner-shape: squircle; }
  }
  /* ghost variant: no border, no background */
  .vnm--ghost .vnm__list { border-color: transparent; background: transparent; }

  /* border glow following the cursor (VsButton style) — solid only */
  .vnm__bar-glow {
    border-radius: calc(var(--rr) + 4px);
  }
  .vnm__bar-glow[hidden] { display: none; }
  @supports (corner-shape: squircle) {
    .vnm--r-squircle .vnm__bar-glow { corner-shape: squircle; }
  }
  .vnm__item { position: relative; z-index: 1; }

  .vnm__trigger {
    --lit: 0;
    --mx: 50%;
    --my: 50%;
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 36px;
    padding: 0 14px;
    border: 0;
    border-radius: var(--rr);
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    /* text glow: the cursor lights up nearby glyphs (clip-to-text) */
    color: var(--text-muted, #666);
    background: radial-gradient(
      120px circle at var(--mx) var(--my),
      var(--text, #ededed),
      var(--text, #ededed) 22%,
      var(--text-muted, #666) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @supports (corner-shape: squircle) {
    .vnm--r-squircle .vnm__trigger { corner-shape: squircle; }
  }
  /* the open trigger stays readable at all times (solid text) */
  .vnm__trigger[data-state='open'] {
    background: none;
    -webkit-text-fill-color: var(--text, #ededed);
    color: var(--text, #ededed);
  }
  .vnm__trigger:focus-visible { outline: 2px solid rgb(var(--ring)); outline-offset: 2px; }
  /* the chevron must not inherit clip-to-text (it would be invisible) */
  .vnm__chev { -webkit-text-fill-color: currentColor; color: var(--text-secondary, #a1a1a1); }

  .vnm__chev {
    width: 13px;
    height: 13px;
    transition: transform 320ms var(--spring, cubic-bezier(0.34, 1.5, 0.4, 1));
  }
  .vnm__chev.is-open { transform: rotate(180deg); }

  /* sliding pill under the hovered trigger */
  .vnm__pill {
    position: absolute;
    top: 4px;
    left: 0;
    z-index: -1;
    border-radius: var(--rr);
    background: var(--bg-elevated, #111);
    opacity: 0;
    pointer-events: none;
    transform-origin: left center;
    transition:
      transform 360ms var(--spring, cubic-bezier(0.34, 1.5, 0.4, 1)),
      width 360ms var(--spring, cubic-bezier(0.34, 1.5, 0.4, 1)),
      opacity 200ms ease;
  }
  .vnm__pill.is-on { opacity: 1; }
  @supports (corner-shape: squircle) {
    .vnm--r-squircle .vnm__pill { corner-shape: squircle; }
  }

  /* ghost bridge: invisible area joining the bar to the panel (covers the
     margin-top) → the pointer never leaves the nav on the way to the submenu */
  .vnm__bridge {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 12px;
    z-index: 49;
  }
  .vnm__bridge[hidden] { display: none; }

  /* ── morphing viewport ────────────────────────────────────────────────── */
  .vnm__viewport-pos {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 50;
    margin-top: 8px;
    display: flex;
    justify-content: center;
    /* translateX(-50%) (on the child) centers the viewport; translateX(viewportX) places it */
    transition: transform 420ms var(--spring, cubic-bezier(0.34, 1.5, 0.4, 1));
  }

  .vnm__viewport {
    position: relative;
    isolation: isolate;
    /* width/height = measured content size (border excluded) → the panel fits
       exactly and the left/right margins stay equal */
    box-sizing: content-box;
    width: 0;
    height: 0;
    overflow: hidden;
    border-radius: var(--rr);
    border: 1px solid var(--border, #1f1f1f);
    background: var(--panel-bg, var(--bg-card, #0a0a0a));
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    opacity: 0;
    transform: translateX(-50%) scale(0.96);
    transform-origin: top center;
    transition:
      width 420ms var(--spring, cubic-bezier(0.34, 1.5, 0.4, 1)),
      height 420ms var(--spring, cubic-bezier(0.34, 1.5, 0.4, 1)),
      opacity 220ms ease,
      transform 420ms var(--spring, cubic-bezier(0.34, 1.5, 0.4, 1));
  }
  .vnm__viewport.is-on { opacity: 1; transform: translateX(-50%) scale(1); }
  @supports (corner-shape: squircle) {
    .vnm--r-squircle .vnm__viewport { corner-shape: squircle; }
  }

  .vnm__glow {
    border-radius: var(--rr);
  }
  @supports (corner-shape: squircle) {
    .vnm--r-squircle .vnm__glow { corner-shape: squircle; }
  }

  /* content (absolutely positioned so the slide never affects the measured size) */
  .vnm__content {
    position: absolute;
    inset: 0;
    width: max-content;
    height: max-content;
    transform-origin: center center;
  }
  .vnm__panel {
    display: grid;
    gap: 2px;
    padding: 6px;
  }
  .vnm__panel--grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 440px;
  }
  .vnm__panel--list { width: 280px; }

  .vnm__link {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 9px 12px;
    border-radius: calc(var(--rr) - 4px);
    text-decoration: none;
    color: inherit;
  }
  @supports (corner-shape: squircle) {
    .vnm--r-squircle .vnm__link { corner-shape: squircle; }
  }

  /* single sliding highlight (one element that moves between items) */
  .vnm__link-hl {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    border-radius: calc(var(--rr) - 4px);
    background: var(--bg-elevated, #161616);
    opacity: 0;
    pointer-events: none;
    transform-origin: top left;
    transition:
      transform 320ms var(--spring, cubic-bezier(0.34, 1.5, 0.4, 1)),
      width 320ms var(--spring, cubic-bezier(0.34, 1.5, 0.4, 1)),
      height 320ms var(--spring, cubic-bezier(0.34, 1.5, 0.4, 1)),
      opacity 180ms ease;
  }
  .vnm__link-hl.is-on { opacity: 1; }
  @supports (corner-shape: squircle) {
    .vnm--r-squircle .vnm__link-hl { corner-shape: squircle; }
  }

  .vnm__link-title {
    --lit: 0;
    --mx: 50%;
    --my: 50%;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    /* same text glow as the triggers (clip-to-text following the cursor) */
    color: var(--text-secondary, #a1a1a1);
    background: radial-gradient(
      90px circle at var(--mx) var(--my),
      var(--text, #ededed),
      var(--text, #ededed) 25%,
      var(--text-secondary, #a1a1a1) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .vnm__link-desc {
    --lit: 0;
    --mx: 50%;
    --my: 50%;
    font-size: 12.5px;
    line-height: 1.35;
    /* same text glow (clip-to-text following the cursor) */
    color: var(--text-muted, #666);
    background: radial-gradient(
      90px circle at var(--mx) var(--my),
      var(--text-secondary, #a1a1a1),
      var(--text-secondary, #a1a1a1) 25%,
      var(--text-muted, #666) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* measurement layer: off-screen, natural size */
  .vnm__measure {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    pointer-events: none;
    width: max-content;
  }
  .vnm__measure .vnm__content { position: static; inset: auto; }

  /* ── directional content morph ────────────────────────────────────────────
     incoming and outgoing OVERLAP (crossfade) → blur + scale + slide so it
     feels like a real transformation from one content to another, not a swap. */
  .vnm-slide-r-enter-active,
  .vnm-slide-l-enter-active {
    transition:
      transform 480ms var(--spring, cubic-bezier(0.34, 1.5, 0.4, 1)),
      opacity 320ms ease 80ms,
      filter 320ms ease 80ms;
  }
  .vnm-slide-r-leave-active,
  .vnm-slide-l-leave-active {
    transition:
      transform 420ms var(--spring, cubic-bezier(0.34, 1.5, 0.4, 1)),
      opacity 260ms ease,
      filter 260ms ease;
  }
  .vnm-slide-r-enter-from { transform: translateX(34px) scale(0.92); opacity: 0; filter: blur(10px); }
  .vnm-slide-r-leave-to { transform: translateX(-34px) scale(0.92); opacity: 0; filter: blur(10px); }
  .vnm-slide-l-enter-from { transform: translateX(-34px) scale(0.92); opacity: 0; filter: blur(10px); }
  .vnm-slide-l-leave-to { transform: translateX(34px) scale(0.92); opacity: 0; filter: blur(10px); }

  .vnm.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .vnm__pill,
    .vnm__viewport,
    .vnm__viewport-pos,
    .vnm__chev,
    .vnm-slide-r-enter-active,
    .vnm-slide-r-leave-active,
    .vnm-slide-l-enter-active,
    .vnm-slide-l-leave-active {
      transition-duration: 1ms;
    }
    .vnm__viewport {
      -webkit-backdrop-filter: none;
      backdrop-filter: none;
    }
  }
`,m=[{value:"products",label:"Products",layout:"grid",links:[{title:"Components",desc:"Buttons, inputs, overlays and more."},{title:"Sections",desc:"Complete blocks ready to use."},{title:"Templates",desc:"Prebuilt landings and dashboards."},{title:"Icons",desc:"1,500+ SVGs ready to copy."},{title:"Themes",desc:"Light, dark and your own tokens."},{title:"MCP",desc:"Bring the catalog to your agent."}]},{value:"solutions",label:"Solutions",layout:"list",links:[{title:"For startups",desc:"Ship your MVP in days, not months."},{title:"For agencies",desc:"Reuse and deliver faster."},{title:"For teams",desc:"A shared design system."}]},{value:"resources",label:"Resources",layout:"list",links:[{title:"Documentation",desc:"Install and usage guides."},{title:"Changelog",desc:"What's new in each release."},{title:"Support",desc:"Talk to the team."}]},{value:"pricing",label:"Pricing",href:"#"}],u="http://www.w3.org/2000/svg";function _(){const a=document.createElementNS(u,"svg");a.setAttribute("class","vnm__chev"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("aria-hidden","true");const t=document.createElementNS(u,"path");return t.setAttribute("d","M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-miterlimit","10"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),a.appendChild(t),a}const p=(a,t,e)=>Math.max(t,Math.min(e,a)),v=a=>!!a.links&&a.links.length>0;let d;function w(a){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=a;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(a,t){const e=t?w(String(t).trim()):null;if(!e){for(const r of y)a.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(r=>Math.round(n?r*.92:r+(255-r)*.16)),c=(r,g)=>a.style.setProperty(r,g);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(r,o);c("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(r,n?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])c(r,n?"0 0 0":"255 255 255");c("--vs-color",o),c("--vs-color-rgb",e.join(" ")),c("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class k extends HTMLElement{static observedAttributes=["variant","tone","radius","bounce","disabled","glow","color"];#e;#s;#h;#i;#a;#p;#t;#o;#n;#l=m;#k=[];#m=new Map;#E=new Map;#A=null;#r="";#C="";#M=1;#L="";#b={w:0,h:0};#u=[];#x=null;#_=new Set;#c=0;#z=null;#w=!1;#v=null;#d=0;#q=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=x,this.#e=document.createElement("nav"),this.#e.className="vnm",this.#s=document.createElement("ul"),this.#s.className="vnm__list",this.#h=document.createElement("span"),this.#h.className="fx-glow vnm__bar-glow",this.#h.setAttribute("aria-hidden","true"),this.#i=document.createElement("span"),this.#i.className="vnm__pill",this.#i.setAttribute("aria-hidden","true"),this.#s.append(this.#h,this.#i),this.#a=document.createElement("div"),this.#a.className="vnm__bridge",this.#a.setAttribute("aria-hidden","true"),this.#a.hidden=!0,this.#p=document.createElement("div"),this.#p.className="vnm__viewport-pos",this.#t=document.createElement("div"),this.#t.className="vnm__viewport";const i=document.createElement("span");i.className="fx-glow vnm__glow",i.setAttribute("aria-hidden","true"),this.#o=document.createElement("span"),this.#o.className="vnm__link-hl",this.#o.setAttribute("aria-hidden","true"),this.#t.append(i,this.#o),this.#p.appendChild(this.#t),this.#n=document.createElement("div"),this.#n.className="vnm__measure",this.#n.setAttribute("aria-hidden","true"),this.#e.append(this.#s,this.#a,this.#p,this.#n),t.append(e,this.#e),this.#e.addEventListener("pointerleave",this.#rt),this.#e.addEventListener("keydown",this.#at),this.#s.addEventListener("pointerleave",this.#nt),this.#t.addEventListener("pointerenter",this.#R),this.#t.addEventListener("pointermove",this.#it),this.#t.addEventListener("pointerleave",this.#S)}connectedCallback(){f(this,this.getAttribute("color")),this.#F(),this.#T();const t=()=>this.#f()||!this.#K();this.#u.push(h(this.#e,300,t)),this.#u.push(h(this.#s,220,()=>t()||this.#P()!=="solid")),this.#u.push(h(this.#t,300,t)),window.addEventListener("resize",this.#G,{passive:!0}),document.addEventListener("pointerdown",this.#Y,!0),window.addEventListener("pointermove",this.#I,{passive:!0}),typeof ResizeObserver<"u"&&(this.#x=new ResizeObserver(()=>{this.#j(),this.#$()}),this.#x.observe(this.#n))}disconnectedCallback(){for(const t of this.#u)t?.();this.#u=[],window.removeEventListener("resize",this.#G),document.removeEventListener("pointerdown",this.#Y,!0),window.removeEventListener("pointermove",this.#I),this.#x?.disconnect(),this.#x=null,this.#c&&cancelAnimationFrame(this.#c),this.#c=0,this.#d&&cancelAnimationFrame(this.#d),this.#d=0;for(const t of this.#_)clearTimeout(t);this.#_.clear()}attributeChangedCallback(){f(this,this.getAttribute("color")),this.#e&&this.#T()}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const i=JSON.parse(t);Array.isArray(i)&&(e=i)}catch{}this.#l=e&&e.length?e:m,this.#e&&(this.#g(),this.#F())}get items(){return this.#l}#P(){return this.getAttribute("variant")??"solid"}#f(){return this.hasAttribute("disabled")}#K(){return this.hasAttribute("glow")}#B(t){return this.#l.findIndex(e=>e.value===t)}#T(){this.#X();const t=this.getAttribute("bounce");let e=t==null||t===""?.55:Number(t);isFinite(e)||(e=.55),e=p(e,0,1);const i=(1+e*.9).toFixed(3);this.#e.style.setProperty("--spring",`cubic-bezier(0.34, ${i}, 0.4, 1)`),this.#h.hidden=this.#P()!=="solid",this.#f()&&this.#r&&this.#g()}#X(){const t=(e,i)=>this.getAttribute(e)??i;this.#e.className=`vnm vnm--t-${t("tone","default")} vnm--r-${t("radius","rounded")} vnm--${t("variant","solid")}`+(this.#f()?" is-disabled":"")+(this.#r?" is-open":"")}#F(){for(const t of this.#k)t.remove();this.#k=[],this.#m.clear(),this.#E.clear();for(const t of this.#l){const e=document.createElement("li");e.className="vnm__item",e.dataset.value=t.value,e.addEventListener("pointerenter",()=>this.#y(t));let i;if(t.href&&!v(t))i=document.createElement("a"),i.className="vnm__trigger",i.href=t.href,i.textContent=t.label,i.addEventListener("focus",()=>this.#y(t)),i.addEventListener("click",s=>this.#W(s,t,[t]));else{i=document.createElement("button"),i.type="button",i.className="vnm__trigger",i.setAttribute("data-state","closed"),i.setAttribute("aria-expanded","false"),i.appendChild(document.createTextNode(t.label));const s=_();i.appendChild(s),this.#E.set(t.value,s),i.addEventListener("focus",()=>this.#y(t)),i.addEventListener("click",()=>this.#y(t))}e.appendChild(i),this.#s.appendChild(e),this.#k.push(e),this.#m.set(t.value,i)}}#O(t){const e=document.createElement("div");e.className="vnm__content";const i=document.createElement("div");i.className=`vnm__panel vnm__panel--${t.layout||"list"}`;for(const s of t.links||[]){const n=document.createElement("a");n.className="vnm__link",n.href=s.href||"#";const o=document.createElement("span");if(o.className="vnm__link-title",o.textContent=s.title,n.appendChild(o),s.desc){const l=document.createElement("span");l.className="vnm__link-desc",l.textContent=s.desc,n.appendChild(l)}n.addEventListener("click",l=>this.#W(l,s,[t,s])),i.appendChild(n)}return e.appendChild(i),e}#y(t){if(this.#f())return;if(this.#D(t.value),!v(t)){this.#N("");return}if(t.value===this.#r)return;const e=this.#B(this.#L),i=this.#B(t.value);e!==-1&&i!==-1&&(this.#M=i>e?1:-1),this.#L=t.value,this.#N(t.value)}#g(){this.#N(""),this.#D(""),this.#L=""}#N(t){const e=this.#l.find(i=>i.value===t)||null;this.#r=t,this.#X(),this.#a.hidden=!e,this.#t.classList.toggle("is-on",!!e);for(const i of this.#l){const s=this.#m.get(i.value),n=i.value===t;s&&s.tagName==="BUTTON"&&(s.setAttribute("data-state",n?"open":"closed"),s.setAttribute("aria-expanded",n?"true":"false")),this.#E.get(i.value)?.classList.toggle("is-open",n)}this.#S(),this.#R(),this.#J(e),this.#Z(e),e||(this.#t.style.width="0px",this.#t.style.height="0px"),this.#j(),this.#$()}#J(t){const e=this.#M===1?"vnm-slide-r":"vnm-slide-l",i=this.#A;if(i&&this.#Q(i,e),t){const s=this.#O(t);this.#t.appendChild(s),this.#U(s,e),this.#A=s}else this.#A=null}#U(t,e){t.classList.add(`${e}-enter-active`,`${e}-enter-from`),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove(`${e}-enter-from`)),this.#V(t,580,()=>t.classList.remove(`${e}-enter-active`))}#Q(t,e){t.classList.add(`${e}-leave-active`),t.offsetWidth,requestAnimationFrame(()=>t.classList.add(`${e}-leave-to`)),this.#V(t,520,()=>t.remove())}#V(t,e,i){const s=()=>{t.removeEventListener("transitionend",n),clearTimeout(o),this.#_.delete(o),i()},n=l=>{l.target===t&&s()};t.addEventListener("transitionend",n);const o=setTimeout(s,e);this.#_.add(o)}#Z(t){this.#n.replaceChildren(),t&&this.#n.appendChild(this.#O(t))}#j(){const t=this.#n.firstElementChild;if(!t)return;const e=t.getBoundingClientRect();(e.width>0||e.height>0)&&(this.#b={w:Math.round(e.width),h:Math.round(e.height)},this.#r&&(this.#t.style.width=`${this.#b.w}px`,this.#t.style.height=`${this.#b.h}px`))}#$(){if(!this.#r)return;const t=this.#m.get(this.#r);if(!t)return;const e=this.#e.getBoundingClientRect(),i=t.getBoundingClientRect(),s=i.left-e.left+i.width/2,n=(this.#b.w||0)/2,o=8;let l=0;const c=e.left+s-n,r=e.left+s+n;c<o?l=o-c:r>window.innerWidth-o&&(l=window.innerWidth-o-r),this.#p.style.transform=`translateX(${s+l}px)`}#D(t){this.#C=t,this.#H()}#H(){if(!this.#C){this.#i.classList.remove("is-on");return}const t=this.#m.get(this.#C);if(!t){this.#i.classList.remove("is-on");return}const e=this.#s.getBoundingClientRect(),i=t.getBoundingClientRect();this.#i.style.transform=`translateX(${i.left-e.left}px)`,this.#i.style.width=`${i.width}px`,this.#i.style.height=`${i.height}px`,this.#i.classList.add("is-on")}#tt(t){this.#v||(this.#v=new Map);let e=this.#v.get(t);if(!e){const i=this.#t,s=i.getBoundingClientRect(),n=t.getBoundingClientRect();e={x:n.left-s.left-i.clientLeft,y:n.top-s.top-i.clientTop,w:n.width,h:n.height},this.#v.set(t,e)}return e}#et(t){const e=this.#t,i=this.#o,s=t.target?.closest?.(".vnm__link");if(!s||!e.contains(s)){this.#S();return}const n=this.#tt(s);i.style.transform=`translate(${n.x}px, ${n.y}px)`,i.style.width=`${n.w}px`,i.style.height=`${n.h}px`,this.#w||(this.#w=!0,i.classList.add("is-on"))}#it=t=>{this.#z=t,this.#c||(this.#c=requestAnimationFrame(()=>{this.#c=0,this.#z&&this.#et(this.#z)}))};#S=()=>{this.#w&&(this.#w=!1,this.#o.classList.remove("is-on"))};#R=()=>{this.#v=null};#st(t){if(this.#f())return;this.#e.querySelectorAll(".vnm__trigger, .vnm__link-title, .vnm__link-desc").forEach(i=>{const s=i.getBoundingClientRect();i.style.setProperty("--mx",`${t.clientX-s.left}px`),i.style.setProperty("--my",`${t.clientY-s.top}px`);const n=p(t.clientX,s.left,s.right),o=p(t.clientY,s.top,s.bottom),l=Math.hypot(t.clientX-n,t.clientY-o);i.style.setProperty("--lit",Math.max(0,1-l/110).toFixed(3))})}#I=t=>{this.#q=t,!this.#d&&(this.#d=requestAnimationFrame(()=>{this.#d=0,this.#q&&this.#st(this.#q)}))};#nt=()=>{this.#e.querySelectorAll(".vnm__trigger, .vnm__link-title, .vnm__link-desc").forEach(t=>t.style.setProperty("--lit","0"))};#W(t,e,i){(e.href==null||e.href==="#")&&t.preventDefault(),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:e,path:i}}))}#rt=()=>this.#g();#at=t=>{t.key==="Escape"&&this.#g()};#G=()=>{this.#H(),this.#$(),this.#R()};#Y=t=>{t.composedPath().includes(this)||this.#g()}}customElements.define("vs-nav-menu",k);
