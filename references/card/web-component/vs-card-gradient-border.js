const _=`
  /* The 2px of host padding is the ring's gutter: .cgrad__ring hangs 1.5px
     outside the card on every side, and with nothing to hang into it drags the
     page scrollbar of whatever narrow column the card was dropped in. */
  :host { display: block; box-sizing: border-box; padding: 2px; }
  .cgrad {
    --r: var(--ctrl-r-md, 12px);
    --pad: var(--card-pad-md, 18px);
    --gap: 8px;
    --accent: var(--ui-accent, #ededed);
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    /* the 1px border has to count INSIDE the 100%, or the card is 2px wider
       than its container at every width */
    box-sizing: border-box;
    width: 100%;
    /* centered island (see vs-card.js): max-width must not left-align the card */
    margin-inline: auto;
    text-align: left;
    font-family: inherit;
    color: var(--card-fg, var(--text, #ededed));
    border-radius: calc(var(--r, 12px) * var(--r-mult, 1));
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-card, #111);
    transition: transform 320ms cubic-bezier(0.34, 1.4, 0.64, 1);
  }

  /* sizes — padding scale + the same max-width ladder as VsCard, so a wide
     container (the preview frame, a grid cell) caps the card instead of
     stretching it into a banner. */
  .cgrad--sm { --pad: var(--card-pad-sm, 14px); --r: var(--ctrl-r-sm, 10px); max-width: 320px; }
  .cgrad--md { --pad: var(--card-pad-md, 18px); --r: var(--ctrl-r-md, 12px); max-width: 380px; }
  .cgrad--lg { --pad: var(--card-pad-lg, 24px); --r: var(--ctrl-r-lg, 14px); max-width: 440px; }

  .cgrad--r-none { --r: 0px; }
  .cgrad--r-subtle { --r: 8px; }
  .cgrad--r-pill { --r: 28px; }
  @supports (corner-shape: squircle) {
    .cgrad--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
  }

  .cgrad--elevated { background: var(--bg-card, #111); }
  .cgrad--outlined { background: transparent; }
  .cgrad--soft { background: var(--bg-elevated, rgba(255, 255, 255, 0.035)); }

  /* animated conic gradient ring — sits just outside the inner content, rotating
     a hue sweep between the accent and a cool/warm partner. On non-ring mode the
     host's own 1px border shows through instead. */
  @property --cgrad-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }
  .cgrad__ring {
    position: absolute;
    inset: -1.5px;
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    background: conic-gradient(
      from var(--cgrad-angle),
      var(--ui-accent, #ededed),
      color-mix(in srgb, var(--ui-accent, #ededed) 40%, #ffffff) 25%,
      color-mix(in srgb, var(--ui-accent, #ededed) 60%, transparent) 50%,
      color-mix(in srgb, var(--ui-accent, #ededed) 40%, #ffffff) 75%,
      var(--ui-accent, #ededed)
    );
    opacity: 0.55;
    animation: cgrad-spin 6s linear infinite;
  }
  .cgrad--ring { border-color: transparent; }
  .cgrad:not(.cgrad--ring) .cgrad__ring { display: none; }
  @keyframes cgrad-spin {
    to { --cgrad-angle: 360deg; }
  }

  .cgrad--interactive {
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  .cgrad--interactive:hover:not(.is-disabled) { transform: translateY(-2px); }
  .cgrad--ring:hover:not(.is-disabled) .cgrad__ring { opacity: 0.95; }
  .cgrad--interactive:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 3px; }

  .is-disabled { opacity: 0.5; pointer-events: none; }

  .cgrad__inner {
    position: relative;
    z-index: 0;
    display: flex;
    flex-direction: column;
    border-radius: inherit;
    overflow: clip;
    background: inherit;
  }
  @supports (corner-shape: squircle) {
    .cgrad--r-squircle .cgrad__inner { corner-shape: squircle; }
  }

  .cgrad__media { position: relative; width: 100%; background: #0d0d0d; overflow: hidden; }
  .cgrad__img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .cgrad__body { display: flex; flex-direction: column; gap: var(--gap); padding: var(--pad); }
  .cgrad__title { margin: 0; font-size: 16px; font-weight: 600; line-height: 1.3; color: var(--text, #ededed); }
  .cgrad__subtitle { margin: 0; font-size: 13px; color: var(--text-muted, #8a8a8a); }
  .cgrad__text { font-size: 14px; line-height: 1.55; color: var(--text-secondary, #a8a8a8); }
  .cgrad__footer { display: flex; align-items: center; gap: 8px; margin-top: 4px; }

  .cgrad__btn {
    height: 32px;
    padding: 0 12px;
    border-radius: var(--ctrl-r-sm, 10px);
    border: 1px solid transparent;
    font: inherit;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  }
  .cgrad__btn--primary { background: var(--ui-accent, #ededed); color: var(--ui-accent-fg, #0b0b0b); }
  .cgrad__btn--ghost { background: transparent; color: var(--text, #ededed); border-color: var(--border, #2a2a2a); }
  .cgrad__btn:disabled { opacity: 0.5; cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .cgrad { transition: none; }
    .cgrad__ring { animation: none; }
    .cgrad--interactive:hover:not(.is-disabled) { transform: none; }
  }
`;let l;function y(s){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=s;const i=l.fillStyle;if(i.charAt(0)==="#")return[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)];const e=i.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const w=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(s,i){const e=i?y(String(i).trim()):null;if(!e){for(const t of w)s.style.removeProperty(t);return}const r=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),n=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,d=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(t=>Math.round(n?t*.92:t+(255-t)*.16)),a=(t,h)=>s.style.setProperty(t,h);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(t,d);a("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(t,e.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(t,n?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])a(t,n?"0 0 0":"255 255 255");a("--vs-color",d),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class E extends HTMLElement{static observedAttributes=["variant","size","radius","image","media","title","subtitle","text","primary-action","secondary-action","interactive","glow","disabled","color"];#t;#p;#m;#a;#n;#r;#u;#b;#d;#o;#c;#l;#f;#h;#s;#e;#i;#v=!1;#x=!1;#_=!1;constructor(){super();const i=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=_,this.#t=document.createElement("div"),this.#p=document.createElement("span"),this.#p.className="cgrad__ring",this.#p.setAttribute("aria-hidden","true"),this.#m=document.createElement("div"),this.#m.className="cgrad__inner",this.#a=document.createElement("div"),this.#a.className="cgrad__media",this.#n=document.createElement("slot"),this.#n.name="media",this.#r=document.createElement("img"),this.#r.className="cgrad__img",this.#r.loading="lazy",this.#n.appendChild(this.#r),this.#a.appendChild(this.#n),this.#n.addEventListener("slotchange",()=>{this.#v=this.#n.assignedNodes({flatten:!0}).some(r=>r!==this.#r),this.#g()}),this.#u=document.createElement("div"),this.#u.className="cgrad__body",this.#b=document.createElement("slot"),this.#b.name="header",this.#d=document.createElement("h3"),this.#d.className="cgrad__title",this.#o=document.createElement("p"),this.#o.className="cgrad__subtitle",this.#b.append(this.#d,this.#o),this.#c=document.createElement("div"),this.#c.className="cgrad__text",this.#l=document.createElement("slot"),this.#f=document.createTextNode(""),this.#l.appendChild(this.#f),this.#c.appendChild(this.#l),this.#l.addEventListener("slotchange",()=>{this.#_=this.#l.assignedNodes({flatten:!0}).some(r=>r!==this.#f),this.#g()}),this.#h=document.createElement("div"),this.#h.className="cgrad__footer",this.#s=document.createElement("slot"),this.#s.name="footer",this.#e=document.createElement("button"),this.#e.type="button",this.#e.className="cgrad__btn cgrad__btn--primary",this.#i=document.createElement("button"),this.#i.type="button",this.#i.className="cgrad__btn cgrad__btn--ghost",this.#s.append(this.#e,this.#i),this.#h.appendChild(this.#s),this.#s.addEventListener("slotchange",()=>{this.#x=this.#s.assignedNodes({flatten:!0}).some(r=>r!==this.#e&&r!==this.#i),this.#g()}),this.#u.append(this.#b,this.#c,this.#h),this.#m.append(this.#a,this.#u),this.#t.append(this.#p,this.#m),i.append(e,this.#t)}connectedCallback(){f(this,this.getAttribute("color")),this.#g()}attributeChangedCallback(){f(this,this.getAttribute("color")),this.#t&&this.#g()}#g(){const i=(g,x)=>this.getAttribute(g)??x,e=g=>this.hasAttribute(g)&&this.getAttribute(g)!=="false",r=i("variant","elevated"),u=i("size","md"),n=i("radius","squircle"),d=i("image",""),o=i("media","16/9"),a=i("title","Card title"),t=i("subtitle",""),h=i("text",""),p=i("primary-action",""),m=i("secondary-action",""),b=e("interactive"),v=this.hasAttribute("glow"),c=e("disabled");this.#t.className=`cgrad cgrad--${r} cgrad--${u} cgrad--r-${n}${b?" cgrad--interactive":""}${v?" cgrad--ring":""}${c?" is-disabled":""}`,b?(this.#t.setAttribute("role","button"),c?this.#t.removeAttribute("tabindex"):this.#t.setAttribute("tabindex","0"),c?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled")):(this.#t.removeAttribute("role"),this.#t.removeAttribute("tabindex"),this.#t.removeAttribute("aria-disabled")),this.#a.hidden=!(d||this.#v),this.#a.style.aspectRatio=o,this.#r.src=d,this.#r.alt=a,this.#d.textContent=a,this.#d.hidden=!a,this.#o.textContent=t,this.#o.hidden=!t,this.#c.hidden=!(h||this.#_),this.#f.textContent=h,this.#h.hidden=!(this.#x||p||m),this.#e.textContent=p,this.#e.hidden=!p,this.#e.disabled=c,this.#i.textContent=m,this.#i.hidden=!m,this.#i.disabled=c}}customElements.define("vs-card-gradient-border",E);
