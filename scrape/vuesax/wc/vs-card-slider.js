import{FX_CSS as x,attachGlow as y}from"./vs-fx.CLXiCjCI.js";const m="http://www.w3.org/2000/svg",p=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,w="M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008",k="M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008";function g(d){const t=document.createElementNS(m,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");const e=document.createElementNS(m,"path");return e.setAttribute("d",d),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.6"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t.appendChild(e),t}const f=d=>String(d).padStart(2,"0"),E=`
  :host { display: block; }
  ${x}
  .cs {
    --r: var(--ctrl-r-md, 12px);
    --pad: var(--card-pad-md, 18px);
    --gap: 8px;
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* the card is an island: centered inside whatever box it is dropped in,
       instead of hugging the left edge once max-width kicks in */
    margin-inline: auto;
    text-align: left;
    font-family: inherit;
    color: var(--card-fg, var(--text, #ededed));
    border-radius: calc(var(--r, 12px) * var(--r-mult, 1));
    border: 1px solid transparent;
    background: var(--card-bg, var(--bg-card, #141414));
    transition:
      border-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .cs--sm { --pad: var(--card-pad-sm, 14px); --r: var(--ctrl-r-sm, 10px); max-width: 320px; }
  .cs--md { --pad: var(--card-pad-md, 18px); --r: var(--ctrl-r-md, 12px); max-width: 380px; }
  .cs--lg { --pad: var(--card-pad-lg, 24px); --r: var(--ctrl-r-lg, 14px); max-width: 440px; }

  .cs--r-none { --r: 0px; }
  .cs--r-subtle { --r: 8px; }
  .cs--r-pill { --r: 28px; }
  @supports (corner-shape: squircle) {
    .cs--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
  }

  .cs--elevated {
    border-color: var(--card-border, var(--border, #232323));
    box-shadow: var(--card-shadow, 0 1px 2px rgba(0, 0, 0, 0.08), 0 6px 18px -14px rgba(0, 0, 0, 0.16));
  }
  .cs--outlined { background: transparent; border-color: var(--border, #2a2a2a); }
  .cs--soft {
    background: var(--card-soft-bg, var(--bg-elevated, rgba(255, 255, 255, 0.035)));
    border-color: transparent;
  }
  .cs:hover:not(.is-disabled) { border-color: var(--border-hover, #3d3d3d); }
  .is-disabled { opacity: 0.5; pointer-events: none; }

  /* inner clip — rounds the slider to the card shape, keeps the glow outside it */
  .cs__inner { position: relative; z-index: 0; display: flex; flex-direction: column; border-radius: inherit; overflow: clip; }
  @supports (corner-shape: squircle) {
    .cs--r-squircle .cs__inner { corner-shape: squircle; }
  }

  .cs__glow { --glow-strength: 1; --glow-inset: -1px; }
  .cs:not(.cs--glow) .cs__glow { display: none; }
  .cs--r-pill .cs__glow { border-radius: 28px; }
  @supports (corner-shape: squircle) {
    .cs--r-squircle .cs__glow { corner-shape: squircle; }
  }

  /* ── slider ───────────────────────────────────────────────────────────── */
  .cs__media {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: var(--card-media-bg, #0d0d0d);
    touch-action: pan-y;
    cursor: grab;
    outline: none;
  }
  .cs__media:focus-visible { outline: 2px solid var(--focus-ring, var(--ui-accent, #ededed)); outline-offset: -2px; }
  .cs__media.is-drag { cursor: grabbing; }
  .cs__track { position: absolute; inset: 0; display: flex; will-change: transform; }
  /* the shell travels soft, the photo inside it travels stiff — the lag between
     the two is the whole feel; a single duration reads flat */
  .cs__track.is-eased { transition: transform 620ms cubic-bezier(0.22, 1, 0.36, 1); }
  .cs__slide { position: relative; flex: 0 0 100%; height: 100%; overflow: hidden; }
  .cs__img {
    width: 100%; height: 100%; display: block;
    object-fit: cover;
    /* the crop: these are 16/9 wallpapers, so hold the horizon a touch above
       centre — an exactly centred crop puts empty sky in the top half */
    object-position: center 62%;
    transform: scale(1.06);
    will-change: transform;
  }
  .cs__slide.is-eased .cs__img { transition: transform 760ms cubic-bezier(0.22, 1, 0.36, 1); }

  /* scrim so dots/counter/arrows stay legible over any photo */
  .cs__scrim {
    position: absolute; inset: auto 0 0 0; height: 46%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.14) 45%, transparent);
    pointer-events: none;
  }

  .cs__nav {
    position: absolute; top: 50%; translate: 0 -50%;
    width: 32px; height: 32px; padding: 0;
    display: grid; place-items: center;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.28);
    background: rgba(20, 20, 20, 0.34);
    -webkit-backdrop-filter: blur(10px) saturate(140%);
    backdrop-filter: blur(10px) saturate(140%);
    color: #fff;
    cursor: pointer;
    opacity: 0;
    transform: scale(0.72);
    filter: blur(4px);
    transition: opacity 200ms ease, transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 200ms ease, background-color 180ms ease;
  }
  .cs__nav svg { width: 16px; height: 16px; }
  .cs__nav--prev { left: 10px; }
  .cs__nav--next { right: 10px; }
  .cs__media:hover .cs__nav,
  .cs__nav:focus-visible { opacity: 1; transform: none; filter: none; }
  .cs__nav:hover { background: rgba(20, 20, 20, 0.6); }
  .cs__nav:disabled { opacity: 0; pointer-events: none; }
  @media (hover: none) {
    .cs__nav { opacity: 1; transform: none; filter: none; }
  }

  .cs__count {
    position: absolute; top: 10px; right: 10px;
    display: inline-flex; align-items: center; gap: 2px;
    height: 20px; padding: 0 8px;
    border-radius: 999px;
    background: rgba(12, 12, 12, 0.42);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    color: #fff;
    font-size: 10.5px; font-weight: 600; letter-spacing: 0.06em;
    font-variant-numeric: tabular-nums;
  }
  .cs__count b { font-weight: 600; }
  .cs__count i { font-style: normal; opacity: 0.55; }

  .cs__dots {
    position: absolute; left: 0; right: 0; bottom: 10px;
    display: flex; justify-content: center; align-items: center;
    /* 9px on each side of a pill is what buys the 24px thumb target below, so
       the dots need 18px between them or a tap on one pill lands on its
       neighbour's target instead. */
    gap: 18px;
  }
  .cs__dot {
    position: relative;
    /* The pill is 6px — a quarter of the thumb floor. Pad the button box out to
       24px and give the space straight back with margin, so the row keeps the
       spacing the pills had; the pill itself is painted by ::before at its own
       size and never learns about the padding. */
    box-sizing: content-box;
    width: 6px; height: 6px;
    padding: 9px; margin: -9px;
    border: 0; border-radius: 999px;
    background: none;
    cursor: pointer;
    transition: width 420ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .cs__dot::before {
    content: '';
    position: absolute; inset: 9px;
    border-radius: inherit;
    background: rgba(255, 255, 255, 0.42);
    transition: background-color 260ms ease;
  }
  .cs__dot.is-on { width: 22px; }
  .cs__dot.is-on::before { background: rgba(255, 255, 255, 0.34); }
  /* Ring the pill, not the invisible target box around it. */
  .cs__dot:focus-visible { outline: none; }
  .cs__dot:focus-visible::before { box-shadow: 0 0 0 2px #fff; }
  /* autoplay progress: only the active pill carries it, driven from the same rAF
     that advances the slide, so the bar and the flip can never disagree. It sits
     on the pill's inset rather than the button's, and its own radius is what
     shapes it now that the button can no longer clip (the target box would go
     with it). */
  .cs__fill {
    position: absolute; inset: 9px;
    transform-origin: left center;
    transform: scaleX(0);
    background: #fff;
    border-radius: inherit;
  }

  /* ── body (same anatomy as VsCard) ────────────────────────────────────── */
  .cs__body { position: relative; z-index: 2; display: flex; flex-direction: column; gap: var(--gap); padding: var(--pad); }
  .cs__title { margin: 0; font-size: 16px; font-weight: 600; line-height: 1.3; color: var(--text, #ededed); }
  .cs__subtitle { margin: 0; font-size: 13px; color: var(--text-muted, #8a8a8a); }
  .cs__text { font-size: 14px; line-height: 1.55; color: var(--text-secondary, #a8a8a8); }
  .cs__footer { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
  .cs__btn {
    height: 32px; padding: 0 12px; border: 1px solid transparent; border-radius: 10px;
    font: inherit; font-weight: 500; font-size: 13px; line-height: 1; cursor: pointer;
    transition: opacity 200ms, background-color 200ms, transform 200ms;
  }
  .cs__btn:active:not(:disabled) { transform: scale(0.97); }
  .cs__btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .cs__btn--primary { background: var(--btn-primary-bg, #ededed); color: var(--btn-primary-fg, #000); }
  .cs__btn--primary:hover:not(:disabled) { opacity: 0.85; }
  .cs__btn--ghost { background: transparent; color: var(--inp-text, #ededed); }
  .cs__btn--ghost:hover:not(:disabled) { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); }

  @media (prefers-reduced-motion: reduce) {
    .cs__track.is-eased,
    .cs__slide.is-eased .cs__img,
    .cs__dot,
    .cs__dot::before { transition: none; }
    .cs__img { transform: none; }
    .cs__nav { opacity: 1; transform: none; filter: none; transition: none; }
  }
`;let u;function A(d){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=d;const t=u.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const C=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function _(d,t){const e=t?A(String(t).trim()):null;if(!e){for(const r of C)d.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),i=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(r=>Math.round(i?r*.92:r+(255-r)*.16)),o=(r,l)=>d.style.setProperty(r,l);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(r,a);o("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(r,i?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])o(r,i?"0 0 0":"255 255 255");o("--vs-color",a),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class N extends HTMLElement{static observedAttributes=["variant","size","radius","images","media","title","subtitle","text","primary-action","secondary-action","autoplay","interval","arrows","dots","counter","loop","parallax","glow","disabled","color"];#r;#A;#C;#e;#c;#g;#n;#a;#l;#M;#z;#u;#f;#_;#v;#x;#y;#d;#h;#S=[];#w=[];#i=[];#$=null;#t=0;#b=null;#m=0;#q=0;#I=0;#p=0;#k=!1;#E=!1;#P=!0;#N=null;#F=null;#D=()=>this.#o(this.#t-1,!0);#V=()=>this.#o(this.#t+1,!0);#W=()=>{this.#k=!0};#T=()=>{this.#k=!1};#G=()=>{this.#E=!0};#K=()=>{this.#E=!1};#j=()=>{this.#p=0};#Y=t=>{t.key==="ArrowLeft"?(t.preventDefault(),this.#o(this.#t-1,!0)):t.key==="ArrowRight"&&(t.preventDefault(),this.#o(this.#t+1,!0))};#H=t=>{if(!(this.#i.length<2||this.#s("disabled"))&&!(t.button!==void 0&&t.button!==0)){this.#b={x:t.clientX,y:t.clientY,id:t.pointerId,axis:null},this.#e.classList.add("is-drag");try{this.#e.setPointerCapture?.(t.pointerId)}catch{}}};#U=t=>{const e=this.#b;if(!e)return;const s=t.clientX-e.x,n=t.clientY-e.y;if(!e.axis){if(Math.hypot(s,n)<6)return;if(e.axis=Math.abs(s)>Math.abs(n)?"x":"y",e.axis==="y"){this.#X();return}}const i=this.#e.clientWidth||1;let a=s/i;this.#s("loop",!0)||(this.#t===0&&a>0||this.#t===this.#i.length-1&&a<0)&&(a*=.34),this.#m=a,this.#L(!1)};#B=()=>{if(!this.#b)return;const e=this.#m;this.#X(),e<=-.18?this.#o(this.#t+1,!0):e>=.18?this.#o(this.#t-1,!0):this.#L(!0)};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=E,this.#r=document.createElement("div"),this.#r.className="cs",this.#A=document.createElement("span"),this.#A.className="fx-glow cs__glow",this.#A.setAttribute("aria-hidden","true"),this.#C=document.createElement("div"),this.#C.className="cs__inner",this.#e=document.createElement("div"),this.#e.className="cs__media",this.#e.tabIndex=0,this.#e.setAttribute("role","group"),this.#e.setAttribute("aria-roledescription","carousel"),this.#c=document.createElement("div"),this.#c.className="cs__track is-eased",this.#g=document.createElement("span"),this.#g.className="cs__scrim",this.#g.setAttribute("aria-hidden","true"),this.#n=document.createElement("button"),this.#n.type="button",this.#n.className="cs__nav cs__nav--prev",this.#n.setAttribute("aria-label","Previous image"),this.#n.appendChild(g(w)),this.#a=document.createElement("button"),this.#a.type="button",this.#a.className="cs__nav cs__nav--next",this.#a.setAttribute("aria-label","Next image"),this.#a.appendChild(g(k)),this.#l=document.createElement("span"),this.#l.className="cs__count",this.#M=document.createElement("b");const s=document.createElement("i");s.textContent=" / ",this.#l.append(this.#M,s),this.#z=document.createElement("i"),this.#l.appendChild(this.#z),this.#l.setAttribute("aria-live","polite"),this.#u=document.createElement("div"),this.#u.className="cs__dots",this.#e.append(this.#c,this.#g,this.#n,this.#a,this.#l,this.#u),this.#f=document.createElement("div"),this.#f.className="cs__body",this.#_=document.createElement("h3"),this.#_.className="cs__title",this.#v=document.createElement("p"),this.#v.className="cs__subtitle",this.#x=document.createElement("div"),this.#x.className="cs__text",this.#y=document.createElement("div"),this.#y.className="cs__footer",this.#d=document.createElement("button"),this.#d.type="button",this.#d.className="cs__btn cs__btn--primary",this.#h=document.createElement("button"),this.#h.type="button",this.#h.className="cs__btn cs__btn--ghost",this.#y.append(this.#d,this.#h),this.#f.append(this.#_,this.#v,this.#x,this.#y),this.#C.append(this.#e,this.#f),this.#r.append(this.#A,this.#C),t.append(e,this.#r),this.#n.addEventListener("click",this.#D),this.#a.addEventListener("click",this.#V),this.#e.addEventListener("pointerdown",this.#H),this.#e.addEventListener("pointermove",this.#U),this.#e.addEventListener("pointerup",this.#B),this.#e.addEventListener("pointercancel",this.#B),this.#e.addEventListener("keydown",this.#Y),this.#r.addEventListener("pointerenter",this.#W),this.#r.addEventListener("pointerleave",this.#T),this.#r.addEventListener("focusin",this.#G),this.#r.addEventListener("focusout",this.#K)}connectedCallback(){_(this,this.getAttribute("color")),this.#R(),this.#F=y(this.#r,260,()=>this.#s("disabled")||!this.#s("glow",!0)),document.addEventListener("visibilitychange",this.#j),typeof IntersectionObserver<"u"&&(this.#N=new IntersectionObserver(t=>{for(const e of t)this.#P=e.isIntersecting}),this.#N.observe(this)),this.#O(0)}disconnectedCallback(){this.#F?.(),this.#F=null,cancelAnimationFrame(this.#q),this.#q=0,this.#N?.disconnect(),this.#N=null,document.removeEventListener("visibilitychange",this.#j)}attributeChangedCallback(){_(this,this.getAttribute("color")),this.#r&&this.#R()}set images(t){this.#$=Array.isArray(t)?t.slice():null,this.#r&&this.#R()}get images(){return this.#i.slice()}set index(t){this.#o(Number(t)||0,!1)}get index(){return this.#t}#s(t,e=!1){const s=this.getAttribute(t);return s===null?e:s!=="false"&&s!=="0"}#J(){return this.#$?.length?this.#$:(this.getAttribute("images")??"").split(",").map(t=>t.trim()).filter(Boolean)}#R(){const t=(b,v)=>this.getAttribute(b)??v,e=this.#s("disabled"),s=this.#s("glow",!0);this.#r.className=`cs cs--${t("variant","elevated")} cs--${t("size","md")} cs--r-${t("radius","squircle")}`+(s?" cs--glow":"")+(e?" is-disabled":"");const n=this.#J();n.join("|")!==this.#i.join("|")&&(this.#i=n,this.#Q(),this.#t>n.length-1&&(this.#t=Math.max(0,n.length-1))),this.#e.style.aspectRatio=t("media","16/9"),this.#e.style.display=this.#i.length?"":"none";const i=this.#i.length>1,a=i&&this.#s("arrows",!0);this.#n.style.display=a?"":"none",this.#a.style.display=a?"":"none",this.#u.style.display=i&&this.#s("dots",!0)?"":"none",this.#l.style.display=i&&this.#s("counter",!0)?"":"none",this.#g.style.display=i&&(this.#s("dots",!0)||this.#s("counter",!0))?"":"none",this.#e.style.cursor=i?"":"default";const c=t("title",""),o=t("subtitle",""),r=t("text",""),l=t("primary-action",""),h=t("secondary-action","");this.#_.textContent=c,this.#_.style.display=c?"":"none",this.#v.textContent=o,this.#v.style.display=o?"":"none",this.#x.textContent=r,this.#x.style.display=r?"":"none",this.#d.textContent=l,this.#d.style.display=l?"":"none",this.#d.disabled=e,this.#h.textContent=h,this.#h.style.display=h?"":"none",this.#h.disabled=e,this.#y.style.display=l||h?"":"none",this.#f.style.display=c||o||r||l||h?"":"none",this.#L(!0)}#Q(){this.#c.replaceChildren(),this.#u.replaceChildren(),this.#S=[],this.#w=[],this.#i.forEach((t,e)=>{const s=document.createElement("div");s.className="cs__slide is-eased",s.setAttribute("role","group"),s.setAttribute("aria-roledescription","slide"),s.setAttribute("aria-label",`${e+1} of ${this.#i.length}`);const n=document.createElement("img");n.className="cs__img",n.src=t,n.alt="",n.draggable=!1,n.loading=e===0?"eager":"lazy",n.decoding="async",s.appendChild(n),this.#c.appendChild(s),this.#S.push({slide:s,img:n});const i=document.createElement("button");i.type="button",i.className="cs__dot",i.setAttribute("aria-label",`Go to image ${e+1}`);const a=document.createElement("span");a.className="cs__fill",i.appendChild(a),i.addEventListener("click",()=>this.#o(e,!0)),this.#u.appendChild(i),this.#w.push({dot:i,fill:a})})}#X(){const t=this.#b;if(this.#b=null,this.#m=0,this.#e.classList.remove("is-drag"),t)try{this.#e.releasePointerCapture?.(t.id)}catch{}}#o(t,e){const s=this.#i.length;if(!s)return;const i=this.#s("loop",!0)?(t%s+s)%s:Math.max(0,Math.min(s-1,t)),a=i!==this.#t;this.#t=i,this.#m=0,e&&(this.#p=0),this.#L(!0),a&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{index:i,total:s,src:this.#i[i]}}))}#L(t){const e=this.#i.length;if(!e)return;const s=t&&!p();this.#c.classList.toggle("is-eased",s);const n=this.#s("parallax",!0)&&!p()?22:0,i=-(this.#t-this.#m)*100;this.#c.style.transform=`translate3d(${i}%, 0, 0)`,this.#S.forEach(({slide:c,img:o},r)=>{c.classList.toggle("is-eased",s);const l=r-this.#t+this.#m,h=Math.max(-1.4,Math.min(1.4,l)),b=p()?1:1.06+Math.min(.06,Math.abs(h)*.05);o.style.transform=p()?"":`translate3d(${(-h*n).toFixed(2)}%, 0, 0) scale(${b.toFixed(3)})`}),this.#w.forEach(({dot:c,fill:o},r)=>{const l=r===this.#t;c.classList.toggle("is-on",l),c.setAttribute("aria-current",l?"true":"false"),l||(o.style.transform="scaleX(0)")}),this.#M.textContent=f(this.#t+1),this.#z.textContent=f(e);const a=this.#s("loop",!0);this.#n.disabled=!a&&this.#t===0,this.#a.disabled=!a&&this.#t===e-1}#O=t=>{this.#q=requestAnimationFrame(this.#O);const e=this.#I?t-this.#I:0;this.#I=t;const s=this.#s("autoplay",!0)&&!this.#s("disabled")&&!p()&&this.#i.length>1&&this.#P&&!this.#k&&!this.#E&&!this.#b&&!document.hidden,n=Math.max(1200,Number(this.getAttribute("interval"))||4200);if(!s){this.#p!==0&&!this.#k&&!this.#E&&(this.#p=0);const c=this.#w[this.#t];c&&!this.#k&&!this.#E&&(c.fill.style.transform="scaleX(0)");return}this.#p+=Math.min(e,120);const i=Math.min(1,this.#p/n),a=this.#w[this.#t];a&&(a.fill.style.transform=`scaleX(${i.toFixed(3)})`),i>=1&&(this.#p=0,this.#o(this.#t+1,!1))}}customElements.define("vs-card-slider",N);
