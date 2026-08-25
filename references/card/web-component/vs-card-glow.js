const f=`
  :host { display: block; width: 100%; }
  .cglow {
    --r: var(--ctrl-r-md, 12px);
    --pad: var(--card-pad-md, 18px);
    --gap: 8px;
    --accent: var(--ui-accent, #ededed);
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
    transition:
      transform 320ms cubic-bezier(0.34, 1.4, 0.64, 1),
      border-color 220ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* sizes — padding scale + the same max-width ladder as VsCard, so a wide
     container (the preview frame, a grid cell) caps the card instead of
     stretching it into a banner. */
  .cglow--sm { --pad: var(--card-pad-sm, 14px); --r: var(--ctrl-r-sm, 10px); max-width: 320px; }
  .cglow--md { --pad: var(--card-pad-md, 18px); --r: var(--ctrl-r-md, 12px); max-width: 380px; }
  .cglow--lg { --pad: var(--card-pad-lg, 24px); --r: var(--ctrl-r-lg, 14px); max-width: 440px; }

  .cglow--r-none { --r: 0px; }
  .cglow--r-subtle { --r: 8px; }
  .cglow--r-pill { --r: 28px; }
  @supports (corner-shape: squircle) {
    .cglow--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
  }

  .cglow--elevated { background: var(--bg-card, #111); border-color: var(--border, #232323); }
  .cglow--outlined { background: transparent; border-color: var(--border, #2a2a2a); }
  .cglow--soft { background: var(--bg-elevated, rgba(255, 255, 255, 0.035)); border-color: transparent; }

  /* ambient aura — sits behind the card, breathes, and flares on hover */
  .cglow__aura {
    position: absolute;
    inset: -2px;
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(
      120% 120% at 50% 0%,
      color-mix(in srgb, var(--ui-accent, #ededed) 55%, transparent),
      transparent 70%
    );
    filter: blur(14px);
    opacity: 0.35;
    animation: cglow-breathe 4.5s ease-in-out infinite;
  }
  .cglow:not(.cglow--glow) .cglow__aura { display: none; }
  @keyframes cglow-breathe {
    0%, 100% { opacity: 0.3; transform: scale(0.98); }
    50% { opacity: 0.5; transform: scale(1.02); }
  }

  .cglow--interactive {
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  .cglow--interactive:hover:not(.is-disabled) {
    border-color: color-mix(in srgb, var(--ui-accent, #ededed) 60%, var(--border, #2a2a2a));
    transform: translateY(-2px);
  }
  .cglow--glow:hover:not(.is-disabled) .cglow__aura { opacity: 0.7; animation-play-state: paused; }
  .cglow--interactive:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }

  .is-disabled { opacity: 0.5; pointer-events: none; }

  .cglow__inner {
    position: relative;
    z-index: 0;
    display: flex;
    flex-direction: column;
    border-radius: inherit;
    overflow: clip;
    background: inherit;
  }
  @supports (corner-shape: squircle) {
    .cglow--r-squircle .cglow__inner { corner-shape: squircle; }
  }

  .cglow__media { position: relative; width: 100%; background: #0d0d0d; overflow: hidden; }
  .cglow__media[hidden] { display: none; }
  .cglow__img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .cglow__body { display: flex; flex-direction: column; gap: var(--gap); padding: var(--pad); }
  .cglow__title { margin: 0; font-size: 16px; font-weight: 600; line-height: 1.3; color: var(--text, #ededed); }
  .cglow__title[hidden] { display: none; }
  .cglow__subtitle { margin: 0; font-size: 13px; color: var(--text-muted, #8a8a8a); }
  .cglow__subtitle[hidden] { display: none; }
  .cglow__text { font-size: 14px; line-height: 1.55; color: var(--text-secondary, #a8a8a8); }
  .cglow__text[hidden] { display: none; }
  .cglow__footer { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
  .cglow__footer[hidden] { display: none; }

  .cglow__btn {
    height: 32px;
    padding: 0 12px;
    border-radius: var(--ctrl-r-sm, 10px);
    border: 1px solid transparent;
    font: inherit;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  }
  .cglow__btn[hidden] { display: none; }
  .cglow__btn--primary { background: var(--ui-accent, #ededed); color: var(--ui-accent-fg, #0b0b0b); }
  .cglow__btn--ghost { background: transparent; color: var(--text, #ededed); border-color: var(--border, #2a2a2a); }
  .cglow__btn:disabled { opacity: 0.5; cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .cglow { transition: border-color 200ms ease; }
    .cglow__aura { animation: none; }
    .cglow--interactive:hover:not(.is-disabled) { transform: none; }
  }
`;let c;function w(n){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=n;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(n,t){const e=t?w(String(t).trim()):null;if(!e){for(const i of v)n.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),s=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(i=>Math.round(s?i*.92:i+(255-i)*.16)),a=(i,d)=>n.style.setProperty(i,d);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(i,l);a("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(i,s?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])a(i,s?"0 0 0":"255 255 255");a("--vs-color",l),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["variant","size","radius","image","media","title","subtitle","text","primary-action","secondary-action","interactive","glow","disabled","color"];#t;#g;#p;#a;#o;#r;#m;#n;#c;#l;#d;#b;#h;#s;#e;#i;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#t=document.createElement("div"),this.#t.className="cglow",this.#g=document.createElement("span"),this.#g.className="cglow__aura",this.#g.setAttribute("aria-hidden","true"),this.#p=document.createElement("div"),this.#p.className="cglow__inner",this.#a=document.createElement("div"),this.#a.className="cglow__media",this.#o=document.createElement("slot"),this.#o.name="media",this.#r=document.createElement("img"),this.#r.className="cglow__img",this.#r.loading="lazy",this.#o.appendChild(this.#r),this.#a.appendChild(this.#o),this.#o.addEventListener("slotchange",()=>this.#f());const r=document.createElement("div");r.className="cglow__body",this.#m=document.createElement("slot"),this.#m.name="header",this.#n=document.createElement("h3"),this.#n.className="cglow__title",this.#c=document.createElement("p"),this.#c.className="cglow__subtitle",this.#m.append(this.#n,this.#c),this.#l=document.createElement("div"),this.#l.className="cglow__text",this.#d=document.createElement("slot"),this.#b=document.createTextNode(""),this.#d.appendChild(this.#b),this.#l.appendChild(this.#d),this.#d.addEventListener("slotchange",()=>this.#w()),this.#h=document.createElement("div"),this.#h.className="cglow__footer",this.#s=document.createElement("slot"),this.#s.name="footer",this.#e=document.createElement("button"),this.#e.type="button",this.#e.className="cglow__btn cglow__btn--primary",this.#i=document.createElement("button"),this.#i.type="button",this.#i.className="cglow__btn cglow__btn--ghost",this.#s.append(this.#e,this.#i),this.#h.appendChild(this.#s),this.#s.addEventListener("slotchange",()=>this.#v()),r.append(this.#m,this.#l,this.#h),this.#p.append(this.#a,r),this.#t.append(this.#g,this.#p),t.append(e,this.#t)}connectedCallback(){m(this,this.getAttribute("color")),this.#u()}disconnectedCallback(){}attributeChangedCallback(){m(this,this.getAttribute("color")),this.#t&&this.#u()}#u(){const t=(b,u)=>this.getAttribute(b)??u,e=t("variant","elevated"),r=t("size","md"),h=t("radius","squircle"),s=this.hasAttribute("interactive"),l=this.hasAttribute("glow"),o=this.hasAttribute("disabled");this.#t.className=`cglow cglow--${e} cglow--${r} cglow--r-${h}`+(s?" cglow--interactive":"")+(l?" cglow--glow":"")+(o?" is-disabled":""),s?(this.#t.setAttribute("role","button"),o?this.#t.removeAttribute("tabindex"):this.#t.setAttribute("tabindex","0"),o?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled")):(this.#t.removeAttribute("role"),this.#t.removeAttribute("tabindex"),this.#t.removeAttribute("aria-disabled"));const a=t("image",""),i=t("title","Card title");this.#r.src=a,this.#r.alt=i,this.#f(),this.#a.style.aspectRatio=t("media","16/9"),this.#n.textContent=i,this.#n.hidden=!i;const d=t("subtitle","");this.#c.textContent=d,this.#c.hidden=!d,this.#b.textContent=t("text",""),this.#w();const g=t("primary-action",""),p=t("secondary-action","");this.#e.textContent=g,this.#e.hidden=!g,this.#e.disabled=o,this.#i.textContent=p,this.#i.hidden=!p,this.#i.disabled=o,this.#v()}#f(){const t=!!this.getAttribute("image"),e=this.#o.assignedNodes({flatten:!0}).some(r=>r!==this.#r);this.#a.hidden=!(t||e)}#w(){const t=!!this.getAttribute("text"),e=this.#d.assignedNodes({flatten:!0}).some(r=>r!==this.#b);this.#l.hidden=!(t||e)}#v(){const t=!!this.getAttribute("primary-action")||!!this.getAttribute("secondary-action"),e=this.#s.assignedNodes({flatten:!0}).some(r=>r!==this.#e&&r!==this.#i);this.#h.hidden=!(t||e)}}customElements.define("vs-card-glow",x);
