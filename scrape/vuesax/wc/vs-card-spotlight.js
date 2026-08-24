const x=`
  :host { display: block; }
  .cspot {
    --r: var(--ctrl-r-md, 12px);
    --pad: var(--card-pad-md, 18px);
    --gap: 8px;
    --mx: 50%;
    --my: 50%;
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
  .cspot--sm { --pad: var(--card-pad-sm, 14px); --r: var(--ctrl-r-sm, 10px); max-width: 320px; }
  .cspot--md { --pad: var(--card-pad-md, 18px); --r: var(--ctrl-r-md, 12px); max-width: 380px; }
  .cspot--lg { --pad: var(--card-pad-lg, 24px); --r: var(--ctrl-r-lg, 14px); max-width: 440px; }

  .cspot--r-none { --r: 0px; }
  .cspot--r-subtle { --r: 8px; }
  .cspot--r-pill { --r: 28px; }
  @supports (corner-shape: squircle) {
    .cspot--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
  }

  .cspot--elevated { background: var(--bg-card, #111); border-color: var(--border, #232323); }
  .cspot--outlined { background: transparent; border-color: var(--border, #2a2a2a); }
  .cspot--soft { background: var(--bg-elevated, rgba(255, 255, 255, 0.035)); border-color: transparent; }

  /* the spotlight — a radial accent glow parked at the cursor position, fading
     in only while the pointer is over the card */
  .cspot__light {
    position: absolute;
    inset: 0;
    z-index: 3;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 240ms ease;
    background: radial-gradient(
      240px circle at var(--mx) var(--my),
      color-mix(in srgb, var(--ui-accent, #ededed) 22%, transparent),
      transparent 60%
    );
    mix-blend-mode: screen;
  }
  .cspot--spot.is-lit .cspot__light { opacity: 1; }
  .cspot:not(.cspot--spot) .cspot__light { display: none; }

  .cspot--interactive {
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  .cspot--interactive:hover:not(.is-disabled) {
    border-color: var(--border-hover, #3d3d3d);
    transform: translateY(-2px);
  }
  .cspot--interactive:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }

  .is-disabled { opacity: 0.5; pointer-events: none; }

  .cspot__inner {
    position: relative;
    z-index: 0;
    display: flex;
    flex-direction: column;
    border-radius: inherit;
    overflow: clip;
  }
  @supports (corner-shape: squircle) {
    .cspot--r-squircle .cspot__inner { corner-shape: squircle; }
  }

  .cspot__media { position: relative; width: 100%; background: #0d0d0d; overflow: hidden; }
  .cspot__img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .cspot__body { position: relative; z-index: 2; display: flex; flex-direction: column; gap: var(--gap); padding: var(--pad); }
  .cspot__title { margin: 0; font-size: 16px; font-weight: 600; line-height: 1.3; color: var(--text, #ededed); }
  .cspot__subtitle { margin: 0; font-size: 13px; color: var(--text-muted, #8a8a8a); }
  .cspot__text { font-size: 14px; line-height: 1.55; color: var(--text-secondary, #a8a8a8); }
  .cspot__footer { display: flex; align-items: center; gap: 8px; margin-top: 4px; }

  .cspot__btn {
    height: 32px;
    padding: 0 12px;
    border-radius: var(--ctrl-r-sm, 10px);
    border: 1px solid transparent;
    font: inherit;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  }
  .cspot__btn--primary { background: var(--ui-accent, #ededed); color: var(--ui-accent-fg, #0b0b0b); }
  .cspot__btn--ghost { background: transparent; color: var(--text, #ededed); border-color: var(--border, #2a2a2a); }
  .cspot__btn:disabled { opacity: 0.5; cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .cspot { transition: border-color 200ms ease; }
    .cspot__light { transition: none; }
    .cspot--interactive:hover:not(.is-disabled) { transform: none; }
  }
`;let h;function _(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const i=t.match(/[\d.]+/g);return i&&i.length>=3?[+i[0],+i[1],+i[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(c,t){const i=t?_(String(t).trim()):null;if(!i){for(const e of y)c.style.removeProperty(e);return}const r=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),n=.2126*r(i[0])+.7152*r(i[1])+.0722*r(i[2])>.45,p=`rgb(${i[0]} ${i[1]} ${i[2]})`,o=i.map(e=>Math.round(n?e*.92:e+(255-e)*.16)),s=(e,d)=>c.style.setProperty(e,d);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(e,p);s("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(e,i.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(e,n?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])s(e,n?"0 0 0":"255 255 255");s("--vs-color",p),s("--vs-color-rgb",i.join(" ")),s("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["variant","size","radius","image","media","title","subtitle","text","primary-action","secondary-action","interactive","glow","disabled","color"];#t;#b;#s;#r;#n;#g;#d;#l;#h;#p;#f;#m;#o;#e;#i;#a=null;#c=0;#x=0;#_=0;#y=!1;#w=!1;#E=!1;#C=t=>this.#L(t);#k=t=>this.#S(t);#N=()=>this.#$();#v=()=>{this.#a=null};constructor(){super();const t=this.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=x,this.#t=document.createElement("div"),this.#b=document.createElement("span"),this.#b.className="cspot__light",this.#b.setAttribute("aria-hidden","true");const r=document.createElement("div");r.className="cspot__inner",this.#s=document.createElement("div"),this.#s.className="cspot__media",this.#r=document.createElement("slot"),this.#r.name="media",this.#n=document.createElement("img"),this.#n.className="cspot__img",this.#n.loading="lazy",this.#r.appendChild(this.#n),this.#s.appendChild(this.#r),this.#r.addEventListener("slotchange",()=>{this.#y=this.#r.assignedNodes({flatten:!0}).length>0,this.#u()});const a=document.createElement("div");a.className="cspot__body",this.#g=document.createElement("slot"),this.#g.name="header",this.#d=document.createElement("h3"),this.#d.className="cspot__title",this.#l=document.createElement("p"),this.#l.className="cspot__subtitle",this.#g.append(this.#d,this.#l),this.#h=document.createElement("div"),this.#h.className="cspot__text",this.#p=document.createElement("slot"),this.#f=document.createTextNode(""),this.#p.appendChild(this.#f),this.#h.appendChild(this.#p),this.#p.addEventListener("slotchange",()=>{this.#w=this.#p.assignedNodes({flatten:!0}).length>0,this.#u()}),this.#m=document.createElement("div"),this.#m.className="cspot__footer",this.#o=document.createElement("slot"),this.#o.name="footer",this.#e=document.createElement("button"),this.#e.className="cspot__btn cspot__btn--primary",this.#e.type="button",this.#i=document.createElement("button"),this.#i.className="cspot__btn cspot__btn--ghost",this.#i.type="button",this.#o.append(this.#e,this.#i),this.#m.appendChild(this.#o),this.#o.addEventListener("slotchange",()=>{this.#E=this.#o.assignedNodes({flatten:!0}).length>0,this.#u()}),a.append(this.#g,this.#h,this.#m),r.append(this.#s,a),this.#t.append(this.#b,r),t.append(i,this.#t),this.#t.addEventListener("pointerenter",this.#C),this.#t.addEventListener("pointermove",this.#k),this.#t.addEventListener("pointerleave",this.#N)}connectedCallback(){b(this,this.getAttribute("color")),this.#u()}disconnectedCallback(){this.#A()}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#t&&this.#u()}#u(){const t=(v,f)=>this.getAttribute(v)??f,i=t("variant","elevated"),r=t("size","md"),a=t("radius","squircle"),n=t("image",""),p=t("media","16/9"),o=t("title","Card title"),s=t("subtitle",""),e=t("text",""),d=t("primary-action",""),m=t("secondary-action",""),u=this.hasAttribute("interactive"),g=this.hasAttribute("glow"),l=this.hasAttribute("disabled");this.#t.className=["cspot",`cspot--${i}`,`cspot--${r}`,`cspot--r-${a}`,u&&"cspot--interactive",g&&"cspot--spot",l&&"is-disabled",this.#t.classList.contains("is-lit")&&"is-lit"].filter(Boolean).join(" "),u?(this.setAttribute("role","button"),l?this.removeAttribute("tabindex"):this.setAttribute("tabindex","0"),l?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled")):(this.removeAttribute("role"),this.removeAttribute("tabindex"),this.removeAttribute("aria-disabled")),this.#s.style.aspectRatio=p,this.#s.hidden=!(n||this.#y),this.#n.src=n,this.#n.alt=o,this.#d.textContent=o,this.#d.hidden=!o,this.#l.textContent=s,this.#l.hidden=!s,this.#f.textContent=e,this.#h.hidden=!(e||this.#w),this.#m.hidden=!(this.#E||d||m),this.#e.textContent=d,this.#e.hidden=!d,this.#e.disabled=l,this.#i.textContent=m,this.#i.hidden=!m,this.#i.disabled=l}#z(){this.#c=0,this.#a||(this.#a=this.#t.getBoundingClientRect());const t=this.#a;this.#t.style.setProperty("--mx",`${(this.#x-t.left)/t.width*100}%`),this.#t.style.setProperty("--my",`${(this.#_-t.top)/t.height*100}%`)}#L(){this.#a=null,window.addEventListener("scroll",this.#v,{passive:!0,capture:!0}),window.addEventListener("resize",this.#v,{passive:!0})}#S(t){this.hasAttribute("disabled")||!this.hasAttribute("glow")||(this.#x=t.clientX,this.#_=t.clientY,this.#t.classList.add("is-lit"),this.#c||(this.#c=requestAnimationFrame(()=>this.#z())))}#$(){this.#t.classList.remove("is-lit"),this.#A()}#A(){window.removeEventListener("scroll",this.#v,{capture:!0}),window.removeEventListener("resize",this.#v),this.#c&&(cancelAnimationFrame(this.#c),this.#c=0),this.#a=null}}customElements.define("vs-card-spotlight",w);
