import{FX_CSS as v,attachGlow as x,pressRipple as y}from"./vs-fx.CLXiCjCI.js";const _=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,w=`
  :host { display: block; }
  ${v}
  .card {
    --r: var(--ctrl-r-md, 12px);
    --pad: var(--card-pad-md, 18px);
    --gap: 8px;
    --rip: 255 255 255;
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* centered island: past the size ladder's max-width the card would
       otherwise hug the left edge of whatever box it is dropped in */
    margin-inline: auto;
    text-align: left;
    font-family: inherit;
    color: var(--card-fg, var(--text, #ededed));
    border-radius: calc(var(--r, 12px) * var(--r-mult, 1));
    border: 1px solid transparent;
    background: var(--card-bg, var(--bg-card, #141414));
    transition:
      transform 320ms cubic-bezier(0.34, 1.4, 0.64, 1),
      background-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
      border-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .card--sm { --pad: var(--card-pad-sm, 14px); --r: var(--ctrl-r-sm, 10px); max-width: 320px; }
  .card--md { --pad: var(--card-pad-md, 18px); --r: var(--ctrl-r-md, 12px); max-width: 380px; }
  .card--lg { --pad: var(--card-pad-lg, 24px); --r: var(--ctrl-r-lg, 14px); max-width: 440px; }

  .card--r-none { --r: 0px; }
  .card--r-subtle { --r: 8px; }
  .card--r-pill { --r: 28px; }
  @supports (corner-shape: squircle) {
    .card--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
  }

  .card--elevated {
    background: var(--card-bg, var(--bg-card, #141414));
    border-color: var(--card-border, var(--border, #232323));
    box-shadow: var(--card-shadow, 0 1px 2px rgba(0, 0, 0, 0.08), 0 6px 18px -14px rgba(0, 0, 0, 0.16));
  }
  .card--outlined { background: transparent; border-color: var(--border, #2a2a2a); }
  .card--soft {
    background: var(--card-soft-bg, var(--bg-elevated, rgba(255, 255, 255, 0.035)));
    border-color: transparent;
  }

  .card--interactive { cursor: pointer; user-select: none; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .card--interactive:hover:not(.is-disabled) {
    border-color: var(--border-hover, #3d3d3d);
    box-shadow: var(--card-shadow-hover, 0 1px 3px rgba(0, 0, 0, 0.1), 0 12px 30px -18px rgba(0, 0, 0, 0.22));
    transform: translateY(-2px);
  }
  .card--interactive:focus-visible { outline: 2px solid var(--focus-ring, var(--ui-accent, #ededed)); outline-offset: 2px; }
  .is-disabled { opacity: 0.5; pointer-events: none; }

  .card__media { position: relative; width: 100%; background: var(--card-media-bg, #0d0d0d); overflow: hidden; }
  .card__img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* inner clip — rounds media/ripple to the card shape; keeps the glow (on .card)
     over the border, so there is a single border line */
  .card__inner { position: relative; z-index: 0; display: flex; flex-direction: column; border-radius: inherit; overflow: clip; }
  @supports (corner-shape: squircle) {
    .card--r-squircle .card__inner { corner-shape: squircle; }
  }

  .card__body { position: relative; z-index: 2; display: flex; flex-direction: column; gap: var(--gap); padding: var(--pad); }
  .card__title { margin: 0; font-size: 16px; font-weight: 600; line-height: 1.3; color: var(--text, #ededed); }
  .card__subtitle { margin: 0; font-size: 13px; color: var(--text-muted, #8a8a8a); }
  .card__text { font-size: 14px; line-height: 1.55; color: var(--text-secondary, #a8a8a8); }
  .card__footer { display: flex; align-items: center; gap: 8px; margin-top: 4px; }

  /* proximity glow (.fx-glow base from vs-fx) — inset -1px overlaps the host's
     1px border (single border line). Lives on .card so the media clip on
     .card__inner never reaches it. */
  .card__glow { --glow-strength: 1; --glow-ring: 1.5px; --glow-inset: -1px; --glow-r-core: 90px; --glow-r-soft: 260px; }
  .card:not(.card--glow) .card__glow { display: none; }
  .card--r-pill .card__glow { border-radius: 28px; }
  @supports (corner-shape: squircle) {
    .card--r-squircle .card__glow { corner-shape: squircle; }
  }

  /* ripples (.fx-ripples base from vs-fx) — clipped to the card shape */
  .card--r-pill .card__ripples { border-radius: 28px; }

  /* footer action buttons — mirror VsButton size="sm" primary/ghost (not
     imported: zero-deps rule only allows the shared vs-fx effects engine) */
  .card__btn {
    height: 32px; padding: 0 12px; border: 1px solid transparent; border-radius: 10px;
    font: inherit; font-weight: 500; font-size: 13px; line-height: 1; cursor: pointer;
    transition: opacity 200ms, background-color 200ms, border-color 200ms, transform 200ms;
  }
  .card__btn:active:not(:disabled) { transform: scale(0.97); }
  .card__btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .card__btn--primary { background: var(--btn-primary-bg, #ededed); color: var(--btn-primary-fg, #000); }
  .card__btn--primary:hover:not(:disabled) { opacity: 0.85; }
  .card__btn--ghost { background: transparent; color: var(--inp-text, #ededed); }
  .card__btn--ghost:hover:not(:disabled) { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); }

  @media (prefers-reduced-motion: reduce) {
    .card { transition: border-color 200ms ease, background-color 200ms ease; }
    .card--interactive:hover:not(.is-disabled) { transform: none; }
  }
`;let l;function E(d){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=d;const e=l.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const A=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(d,e){const t=e?E(String(e).trim()):null;if(!t){for(const r of A)d.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),a=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,o=`rgb(${t[0]} ${t[1]} ${t[2]})`,n=t.map(r=>Math.round(a?r*.92:r+(255-r)*.16)),s=(r,c)=>d.style.setProperty(r,c);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(r,o);s("--btn-primary-bg-hover",`rgb(${n[0]} ${n[1]} ${n[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(r,a?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])s(r,a?"0 0 0":"255 255 255");s("--vs-color",o),s("--vs-color-rgb",t.join(" ")),s("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class C extends HTMLElement{static observedAttributes=["variant","size","radius","image","media","title","subtitle","text","primary-action","secondary-action","interactive","glow","disabled","color"];#t;#u;#g;#c;#n;#e;#i;#f;#l;#h;#p;#s;#v;#b;#r;#a;#o;#w;#x=!1;#y=!1;#_=!1;#E=e=>this.#N(e);#A=()=>{this.#x=this.#d(this.#e),this.#m()};#C=()=>{this.#y=this.#d(this.#s),this.#m()};#k=()=>{this.#_=this.#d(this.#r),this.#m()};constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=w,this.#t=document.createElement("div"),this.#t.className="card",this.#u=document.createElement("span"),this.#u.className="fx-glow card__glow",this.#u.setAttribute("aria-hidden","true"),this.#g=document.createElement("div"),this.#g.className="card__inner",this.#c=document.createElement("span"),this.#c.className="fx-ripples card__ripples",this.#c.setAttribute("aria-hidden","true"),this.#n=document.createElement("div"),this.#n.className="card__media",this.#e=document.createElement("slot"),this.#e.name="media",this.#i=document.createElement("img"),this.#i.className="card__img",this.#i.loading="lazy",this.#e.appendChild(this.#i),this.#n.appendChild(this.#e);const i=document.createElement("div");i.className="card__body",this.#f=document.createElement("slot"),this.#f.name="header",this.#l=document.createElement("h3"),this.#l.className="card__title",this.#h=document.createElement("p"),this.#h.className="card__subtitle",this.#f.append(this.#l,this.#h),this.#p=document.createElement("div"),this.#p.className="card__text",this.#s=document.createElement("slot"),this.#v=document.createTextNode(""),this.#s.appendChild(this.#v),this.#p.appendChild(this.#s),this.#b=document.createElement("div"),this.#b.className="card__footer",this.#r=document.createElement("slot"),this.#r.name="footer",this.#a=document.createElement("button"),this.#a.type="button",this.#a.className="card__btn card__btn--primary",this.#o=document.createElement("button"),this.#o.type="button",this.#o.className="card__btn card__btn--ghost",this.#r.append(this.#a,this.#o),this.#b.appendChild(this.#r),i.append(this.#f,this.#p,this.#b),this.#g.append(this.#c,this.#n,i),this.#t.append(this.#u,this.#g),e.append(t,this.#t),this.#t.addEventListener("pointerdown",this.#E),this.#e.addEventListener("slotchange",this.#A),this.#s.addEventListener("slotchange",this.#C),this.#r.addEventListener("slotchange",this.#k)}connectedCallback(){p(this,this.getAttribute("color")),this.#x=this.#d(this.#e),this.#y=this.#d(this.#s),this.#_=this.#d(this.#r),this.#m(),this.#w=x(this.#t,260,()=>this.hasAttribute("disabled")||!this.hasAttribute("glow"))}disconnectedCallback(){this.#w?.(),this.#t.removeEventListener("pointerdown",this.#E),this.#e.removeEventListener("slotchange",this.#A),this.#s.removeEventListener("slotchange",this.#C),this.#r.removeEventListener("slotchange",this.#k)}attributeChangedCallback(){p(this,this.getAttribute("color")),this.#t&&this.#m()}#d(e){return e.assignedNodes().some(t=>t.nodeType===1||t.nodeType===3&&t.textContent.trim()!=="")}#m(){const e=(g,f)=>this.getAttribute(g)??f,t=this.hasAttribute("disabled"),i=this.hasAttribute("interactive"),h=this.hasAttribute("glow"),a=e("image",""),o=e("title","Card title"),n=e("subtitle",""),s=e("text",""),r=e("primary-action",""),c=e("secondary-action","");this.#t.className=`card card--${e("variant","elevated")} card--${e("size","md")} card--r-${e("radius","squircle")}`+(i?" card--interactive":"")+(h?" card--glow":"")+(t?" is-disabled":""),i?this.#t.setAttribute("role","button"):this.#t.removeAttribute("role"),i&&!t?this.#t.setAttribute("tabindex","0"):this.#t.removeAttribute("tabindex"),i&&t?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled");const b=!!a||this.#x;this.#n.style.display=b?"":"none",this.#n.style.aspectRatio=e("media","16/9"),this.#i.getAttribute("src")!==a&&this.#i.setAttribute("src",a),this.#i.setAttribute("alt",o),this.#l.textContent=o,this.#l.style.display=o?"":"none",this.#h.textContent=n,this.#h.style.display=n?"":"none";const m=!!s||this.#y;this.#p.style.display=m?"":"none",this.#v.textContent=s;const u=this.#_||!!r||!!c;this.#b.style.display=u?"":"none",this.#a.textContent=r,this.#a.style.display=r?"":"none",this.#a.disabled=t,this.#o.textContent=c,this.#o.style.display=c?"":"none",this.#o.disabled=t}#N(e){if(!(this.hasAttribute("disabled")||!this.hasAttribute("interactive"))&&!_())try{y(this.#t,this.#c,e,{tilt:!1})}catch{}}}customElements.define("vs-card",C);
