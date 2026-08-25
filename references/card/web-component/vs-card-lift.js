const v=`
  :host { display: block; width: 100%; }
.clift {
  --r: var(--ctrl-r-md, 12px);
  --pad: var(--card-pad-md, 18px);
  --gap: 8px;
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 6px 18px -14px rgba(0, 0, 0, 0.3);
  transition:
    transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 320ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 220ms cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
}

/* sizes — padding scale + the same max-width ladder as VsCard, so a wide
   container (the preview frame, a grid cell) caps the card instead of
   stretching it into a banner. */
.clift--sm { --pad: var(--card-pad-sm, 14px); --r: var(--ctrl-r-sm, 10px); max-width: 320px; }
.clift--md { --pad: var(--card-pad-md, 18px); --r: var(--ctrl-r-md, 12px); max-width: 380px; }
.clift--lg { --pad: var(--card-pad-lg, 24px); --r: var(--ctrl-r-lg, 14px); max-width: 440px; }

.clift--r-none { --r: 0px; }
.clift--r-subtle { --r: 8px; }
.clift--r-pill { --r: 28px; }
@supports (corner-shape: squircle) {
  .clift--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
}

.clift--elevated { background: var(--bg-card, #111); border-color: var(--border, #232323); }
.clift--outlined { background: transparent; border-color: var(--border, #2a2a2a); }
.clift--soft { background: var(--bg-elevated, rgba(255, 255, 255, 0.035)); border-color: transparent; }

.clift--interactive {
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
/* the lift: springy pop up + deep shadow, and the media rises slightly */
.clift--lift.clift--interactive:hover:not(.is-disabled),
.clift--lift:hover:not(.is-disabled) {
  transform: translateY(-8px) scale(1.015);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18), 0 26px 50px -22px rgba(0, 0, 0, 0.5);
  border-color: color-mix(in srgb, var(--ui-accent, #ededed) 30%, var(--border, #2a2a2a));
}
.clift--lift:active:not(.is-disabled) { transform: translateY(-3px) scale(1.005); }
.clift--lift:hover:not(.is-disabled) .clift__img { transform: scale(1.06) translateY(-2%); }
.clift--interactive:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }

.is-disabled { opacity: 0.5; pointer-events: none; }

.clift__inner {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  border-radius: inherit;
  overflow: clip;
}
@supports (corner-shape: squircle) {
  .clift--r-squircle .clift__inner { corner-shape: squircle; }
}

.clift__media { position: relative; width: 100%; background: #0d0d0d; overflow: hidden; }
.clift__media[hidden] { display: none; }
.clift__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 480ms cubic-bezier(0.22, 1, 0.36, 1);
}

.clift__body { display: flex; flex-direction: column; gap: var(--gap); padding: var(--pad); }
.clift__title { margin: 0; font-size: 16px; font-weight: 600; line-height: 1.3; color: var(--text, #ededed); }
.clift__subtitle { margin: 0; font-size: 13px; color: var(--text-muted, #8a8a8a); }
.clift__text { font-size: 14px; line-height: 1.55; color: var(--text-secondary, #a8a8a8); }
.clift__text[hidden] { display: none; }
.clift__footer { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
.clift__footer[hidden] { display: none; }

.clift__btn {
  height: 32px;
  padding: 0 12px;
  border-radius: var(--ctrl-r-sm, 10px);
  border: 1px solid transparent;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}
.clift__btn--primary { background: var(--ui-accent, #ededed); color: var(--ui-accent-fg, #0b0b0b); }
.clift__btn--ghost { background: transparent; color: var(--text, #ededed); border-color: var(--border, #2a2a2a); }
.clift__btn:disabled { opacity: 0.5; cursor: not-allowed; }
.clift__btn[hidden] { display: none; }
.clift__title[hidden], .clift__subtitle[hidden] { display: none; }

@media (prefers-reduced-motion: reduce) {
  .clift { transition: box-shadow 200ms ease, border-color 200ms ease; }
  .clift--lift:hover:not(.is-disabled) { transform: none; }
  .clift__img, .clift--lift:hover:not(.is-disabled) .clift__img { transition: none; transform: none; }
}
`;let l;function x(n){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=n;const t=l.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const i=t.match(/[\d.]+/g);return i&&i.length>=3?[+i[0],+i[1],+i[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(n,t){const i=t?x(String(t).trim()):null;if(!i){for(const e of _)n.style.removeProperty(e);return}const o=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),s=.2126*o(i[0])+.7152*o(i[1])+.0722*o(i[2])>.45,c=`rgb(${i[0]} ${i[1]} ${i[2]})`,a=i.map(e=>Math.round(s?e*.92:e+(255-e)*.16)),r=(e,d)=>n.style.setProperty(e,d);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(e,c);r("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(e,i.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(e,s?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])r(e,s?"0 0 0":"255 255 255");r("--vs-color",c),r("--vs-color-rgb",i.join(" ")),r("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["variant","size","radius","image","media","title","subtitle","text","primary-action","secondary-action","interactive","glow","disabled","color"];#t;#p;#n;#e;#i;#m;#o;#c;#d;#h;#l;#b;#f;#r;#s;#a;#g="";#v="";#x="";#_="";#y=()=>this.#k();#E=()=>this.#C();#w=()=>this.#N();#A=()=>this.#z();constructor(){super();const t=this.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=v,this.#t=document.createElement("div"),this.#t.className="clift",this.#p=document.createElement("div"),this.#p.className="clift__inner",this.#n=document.createElement("div"),this.#n.className="clift__media",this.#e=document.createElement("slot"),this.#e.name="media",this.#i=document.createElement("img"),this.#i.className="clift__img",this.#i.loading="lazy",this.#e.append(this.#i),this.#n.append(this.#e),this.#m=document.createElement("div"),this.#m.className="clift__body",this.#o=document.createElement("slot"),this.#o.name="header",this.#c=document.createElement("h3"),this.#c.className="clift__title",this.#d=document.createElement("p"),this.#d.className="clift__subtitle",this.#o.append(this.#c,this.#d),this.#h=document.createElement("div"),this.#h.className="clift__text",this.#l=document.createElement("slot"),this.#b=document.createTextNode(""),this.#l.append(this.#b),this.#h.append(this.#l),this.#f=document.createElement("div"),this.#f.className="clift__footer",this.#r=document.createElement("slot"),this.#r.name="footer",this.#s=document.createElement("button"),this.#s.type="button",this.#s.className="clift__btn clift__btn--primary",this.#a=document.createElement("button"),this.#a.type="button",this.#a.className="clift__btn clift__btn--ghost",this.#r.append(this.#s,this.#a),this.#f.append(this.#r),this.#m.append(this.#o,this.#h,this.#f),this.#p.append(this.#n,this.#m),this.#t.append(this.#p),t.append(i,this.#t),this.#e.addEventListener("slotchange",this.#y),this.#o.addEventListener("slotchange",this.#E),this.#l.addEventListener("slotchange",this.#w),this.#r.addEventListener("slotchange",this.#A)}connectedCallback(){b(this,this.getAttribute("color")),this.#S()}disconnectedCallback(){this.#e.removeEventListener("slotchange",this.#y),this.#o.removeEventListener("slotchange",this.#E),this.#l.removeEventListener("slotchange",this.#w),this.#r.removeEventListener("slotchange",this.#A)}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#t&&this.#S()}#S(){const t=(u,g)=>this.getAttribute(u)??g,i=t("variant","elevated"),o=t("size","md"),m=t("radius","squircle"),s=this.hasAttribute("interactive"),c=this.hasAttribute("glow"),a=this.hasAttribute("disabled");this.#t.className=`clift clift--${i} clift--${o} clift--r-${m}`+(s?" clift--interactive":"")+(c?" clift--lift":"")+(a?" is-disabled":""),s?this.#t.setAttribute("role","button"):this.#t.removeAttribute("role"),s&&!a?this.#t.setAttribute("tabindex","0"):this.#t.removeAttribute("tabindex"),s&&a?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled");const r=t("title","Card title"),e=t("subtitle",""),d=t("text",""),h=t("primary-action",""),f=t("secondary-action",""),p=t("image","");this.#c.textContent=r,this.#c.hidden=!r,this.#d.textContent=e,this.#d.hidden=!e,this.#b.textContent=d,this.#g=d,this.#s.textContent=h,this.#s.hidden=!h,this.#s.disabled=a,this.#a.textContent=f,this.#a.hidden=!f,this.#a.disabled=a,p?this.#i.src=p:this.#i.removeAttribute("src"),this.#i.alt=r,this.#n.style.aspectRatio=t("media","16/9"),this.#v=p,this.#x=h,this.#_=f,this.#k(),this.#C(),this.#N(),this.#z()}#u(t){return t.assignedNodes({flatten:!0}).length>0}#k(){this.#n.hidden=!(this.#v||this.#u(this.#e))}#C(){}#N(){this.#h.hidden=!(this.#g||this.#u(this.#l))}#z(){this.#f.hidden=!(this.#u(this.#r)||this.#x||this.#_)}}customElements.define("vs-card-lift",y);
