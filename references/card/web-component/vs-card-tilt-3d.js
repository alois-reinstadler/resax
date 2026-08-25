const g=`
  :host { display: block; width: 100%; }
  .ctilt {
    --r: var(--ctrl-r-md, 12px);
    --pad: var(--card-pad-md, 18px);
    --gap: 8px;
    --rx: 0deg;
    --ry: 0deg;
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* centered island (see vs-card.js): max-width must not left-align the card */
    margin-inline: auto;
    text-align: left;
    font-family: inherit;
    color: var(--card-fg, var(--text, #ededed));
    border-radius: calc(var(--r, 12px) * var(--r-mult, 1));
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-card, #111);
    transform-style: preserve-3d;
    transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));
    transition:
      transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
      border-color 220ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .ctilt.is-active { transition: transform 90ms linear, border-color 220ms ease; }

  /* drop shadow lives on a pseudo-element and crossfades via opacity (cheaper
     than transitioning box-shadow: no shadow repaint every frame) */
  .ctilt::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    box-shadow: 0 24px 48px -24px rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 280ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* sizes — padding scale + the same max-width ladder as VsCard, so a wide
     container (the preview frame, a grid cell) caps the card instead of
     stretching it into a banner. */
  .ctilt--sm { --pad: var(--card-pad-sm, 14px); --r: var(--ctrl-r-sm, 10px); max-width: 320px; }
  .ctilt--md { --pad: var(--card-pad-md, 18px); --r: var(--ctrl-r-md, 12px); max-width: 380px; }
  .ctilt--lg { --pad: var(--card-pad-lg, 24px); --r: var(--ctrl-r-lg, 14px); max-width: 440px; }

  .ctilt--r-none { --r: 0px; }
  .ctilt--r-subtle { --r: 8px; }
  .ctilt--r-pill { --r: 28px; }
  @supports (corner-shape: squircle) {
    .ctilt--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
  }

  .ctilt--elevated { background: var(--bg-card, #111); border-color: var(--border, #232323); }
  .ctilt--outlined { background: transparent; border-color: var(--border, #2a2a2a); }
  .ctilt--soft { background: var(--bg-elevated, rgba(255, 255, 255, 0.035)); border-color: transparent; }

  .ctilt--tilt.is-active {
    border-color: color-mix(in srgb, var(--ui-accent, #ededed) 40%, var(--border, #2a2a2a));
  }
  .ctilt--tilt.is-active::after { opacity: 1; }

  .ctilt--interactive {
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  .ctilt--interactive:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }

  .is-disabled { opacity: 0.5; pointer-events: none; }

  .ctilt__inner {
    position: relative;
    z-index: 0;
    display: flex;
    flex-direction: column;
    border-radius: inherit;
    overflow: clip;
    transform: translateZ(0.01px);
  }
  @supports (corner-shape: squircle) {
    .ctilt--r-squircle .ctilt__inner { corner-shape: squircle; }
  }

  .ctilt__media { position: relative; width: 100%; background: #0d0d0d; overflow: hidden; }
  .ctilt__media[hidden] { display: none; }
  .ctilt__img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .ctilt__body { display: flex; flex-direction: column; gap: var(--gap); padding: var(--pad); }
  .ctilt__title { margin: 0; font-size: 16px; font-weight: 600; line-height: 1.3; color: var(--text, #ededed); }
  .ctilt__title[hidden] { display: none; }
  .ctilt__subtitle { margin: 0; font-size: 13px; color: var(--text-muted, #8a8a8a); }
  .ctilt__subtitle[hidden] { display: none; }
  .ctilt__text { font-size: 14px; line-height: 1.55; color: var(--text-secondary, #a8a8a8); }
  .ctilt__text[hidden] { display: none; }
  .ctilt__footer { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
  .ctilt__footer[hidden] { display: none; }

  .ctilt__btn {
    height: 32px;
    padding: 0 12px;
    border-radius: var(--ctrl-r-sm, 10px);
    border: 1px solid transparent;
    font: inherit;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  }
  .ctilt__btn[hidden] { display: none; }
  .ctilt__btn--primary { background: var(--ui-accent, #ededed); color: var(--ui-accent-fg, #0b0b0b); }
  .ctilt__btn--ghost { background: transparent; color: var(--text, #ededed); border-color: var(--border, #2a2a2a); }
  .ctilt__btn:disabled { opacity: 0.5; cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .ctilt, .ctilt.is-active { transform: none; transition: border-color 200ms ease; }
    .ctilt::after { transition: none; }
  }
`;let l;function f(o){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=o;const t=l.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(o,t){const e=t?f(String(t).trim()):null;if(!e){for(const i of x)o.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),a=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,n=e.map(i=>Math.round(a?i*.92:i+(255-i)*.16)),r=(i,d)=>o.style.setProperty(i,d);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(i,c);r("--btn-primary-bg-hover",`rgb(${n[0]} ${n[1]} ${n[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(i,a?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])r(i,a?"0 0 0":"255 255 255");r("--vs-color",c),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["variant","size","radius","image","media","title","subtitle","text","primary-action","secondary-action","interactive","glow","disabled","color"];#t;#b;#n;#a;#r;#u;#c;#d;#h;#p;#v;#m;#o;#i;#s;#g=!1;#e=null;#l=0;#x=0;#y=0;#_=t=>this.#S(t);#w=t=>this.#$(t);#E=t=>this.#M(t);#f=()=>{this.#e=null};#z=()=>this.#q();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#t=document.createElement("div"),this.#t.className="ctilt",this.#b=document.createElement("div"),this.#b.className="ctilt__inner",this.#n=document.createElement("div"),this.#n.className="ctilt__media",this.#a=document.createElement("slot"),this.#a.name="media",this.#r=document.createElement("img"),this.#r.className="ctilt__img",this.#r.loading="lazy",this.#a.appendChild(this.#r),this.#n.appendChild(this.#a),this.#a.addEventListener("slotchange",()=>this.#C());const s=document.createElement("div");s.className="ctilt__body",this.#u=document.createElement("slot"),this.#u.name="header",this.#c=document.createElement("h3"),this.#c.className="ctilt__title",this.#d=document.createElement("p"),this.#d.className="ctilt__subtitle",this.#u.append(this.#c,this.#d),this.#h=document.createElement("div"),this.#h.className="ctilt__text",this.#p=document.createElement("slot"),this.#v=document.createTextNode(""),this.#p.appendChild(this.#v),this.#h.appendChild(this.#p),this.#p.addEventListener("slotchange",()=>this.#L()),this.#m=document.createElement("div"),this.#m.className="ctilt__footer",this.#o=document.createElement("slot"),this.#o.name="footer",this.#i=document.createElement("button"),this.#i.type="button",this.#i.className="ctilt__btn ctilt__btn--primary",this.#s=document.createElement("button"),this.#s.type="button",this.#s.className="ctilt__btn ctilt__btn--ghost",this.#o.append(this.#i,this.#s),this.#m.appendChild(this.#o),this.#o.addEventListener("slotchange",()=>this.#N()),s.append(this.#u,this.#h,this.#m),this.#b.append(this.#n,s),this.#t.append(this.#b),t.append(e,this.#t)}connectedCallback(){b(this,this.getAttribute("color")),this.#t.addEventListener("pointerenter",this.#_),this.#t.addEventListener("pointermove",this.#w),this.#t.addEventListener("pointerleave",this.#E),this.#A()}disconnectedCallback(){this.#t.removeEventListener("pointerenter",this.#_),this.#t.removeEventListener("pointermove",this.#w),this.#t.removeEventListener("pointerleave",this.#E),this.#k()}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#t&&this.#A()}#A(){const t=(u,v)=>this.getAttribute(u)??v,e=t("variant","elevated"),s=t("size","md"),h=t("radius","squircle"),a=this.hasAttribute("interactive"),c=this.hasAttribute("glow"),n=this.hasAttribute("disabled");this.#t.className=`ctilt ctilt--${e} ctilt--${s} ctilt--r-${h}`+(a?" ctilt--interactive":"")+(c?" ctilt--tilt":"")+(n?" is-disabled":"")+(this.#g?" is-active":""),a?(this.#t.setAttribute("role","button"),n?this.#t.removeAttribute("tabindex"):this.#t.setAttribute("tabindex","0"),n?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled")):(this.#t.removeAttribute("role"),this.#t.removeAttribute("tabindex"),this.#t.removeAttribute("aria-disabled"));const r=t("image",""),i=t("title","Card title");this.#r.src=r,this.#r.alt=i,this.#C(),this.#n.style.aspectRatio=t("media","16/9"),this.#c.textContent=i,this.#c.hidden=!i;const d=t("subtitle","");this.#d.textContent=d,this.#d.hidden=!d,this.#v.textContent=t("text",""),this.#L();const p=t("primary-action",""),m=t("secondary-action","");this.#i.textContent=p,this.#i.hidden=!p,this.#i.disabled=n,this.#s.textContent=m,this.#s.hidden=!m,this.#s.disabled=n,this.#N()}#C(){const t=!!this.getAttribute("image"),e=this.#a.assignedNodes({flatten:!0}).some(s=>s!==this.#r);this.#n.hidden=!(t||e)}#L(){const t=!!this.getAttribute("text"),e=this.#p.assignedNodes({flatten:!0}).some(s=>s!==this.#v);this.#h.hidden=!(t||e)}#N(){const t=!!this.getAttribute("primary-action")||!!this.getAttribute("secondary-action"),e=this.#o.assignedNodes({flatten:!0}).some(s=>s!==this.#i&&s!==this.#s);this.#m.hidden=!(t||e)}#S(){this.#e=null,window.addEventListener("scroll",this.#f,{passive:!0,capture:!0}),window.addEventListener("resize",this.#f,{passive:!0})}#$(t){this.hasAttribute("disabled")||!this.hasAttribute("glow")||(this.#x=t.clientX,this.#y=t.clientY,this.#g||(this.#g=!0,this.#t.classList.add("is-active")),this.#l||(this.#l=requestAnimationFrame(this.#z)))}#q(){this.#l=0;const t=this.#t;if(!t)return;this.#e||(this.#e=t.getBoundingClientRect());const e=(this.#x-this.#e.left)/this.#e.width,s=(this.#y-this.#e.top)/this.#e.height;t.style.setProperty("--ry",`${(e-.5)*2*9}deg`),t.style.setProperty("--rx",`${-(s-.5)*2*9}deg`)}#k(){window.removeEventListener("scroll",this.#f,{capture:!0}),window.removeEventListener("resize",this.#f),this.#l&&(cancelAnimationFrame(this.#l),this.#l=0),this.#e=null}#M(){this.#g=!1,this.#t.classList.remove("is-active"),this.#k();const t=this.#t;t&&(t.style.setProperty("--rx","0deg"),t.style.setProperty("--ry","0deg"))}}customElements.define("vs-card-tilt3-d",y);
