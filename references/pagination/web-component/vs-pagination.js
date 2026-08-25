const v="http://www.w3.org/2000/svg";const y=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,b={first:{label:"First page",paths:["M18 6l-6 6 6 6M11 6l-6 6 6 6"]},prev:{label:"Previous page",paths:["M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"]},next:{label:"Next page",paths:["M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"]},last:{label:"Last page",paths:["M6 6l6 6-6 6M13 6l6 6-6 6"]}},_=`
  :host { display: inline-flex; }
.pg {
  --h: 36px;
  --fs: 14px;
  --gap: 4px;
  --tr: 9px; /* pill/number radius */
  /* pill inverted from the background: dark → light pill/dark text, light → dark pill/white text */
  --acc: var(--vs-color, var(--text, #ededed));
  --acc-on: var(--bg, #0a0a0a);
  --ring: var(--inp-ring, 255 255 255);

  display: inline-flex;
  align-items: center;
  gap: var(--gap);
  font-family: inherit;
  font-size: var(--fs);
}

/* sizes */
.pg--sm { --h: 30px; --fs: 13px; --gap: 3px; --tr: 7px; }
.pg--lg { --h: 42px; --fs: 15px; --gap: 5px; --tr: 11px; }

/* shape */
.pg--s-pill { --tr: 999px; }

/* Apple radius (squircle) on the active pill — rounded only */
@supports (corner-shape: squircle) {
  .pg--s-rounded .pg__indicator,
  .pg--s-rounded .pg__page,
  .pg--s-rounded .pg__nav {
    corner-shape: squircle;
    --tr: calc(var(--h) * 0.32);
  }
}

/* ── carousel window ───────────────────────────────────────── */
.pg__viewport {
  position: relative;
  overflow: hidden;
  /* width = visible button count · button width + gaps + side padding */
  width: calc(var(--win) * var(--h) + (var(--win) - 1) * var(--gap) + var(--padx) * 2);
  height: var(--h);
}
.pg__track {
  position: absolute;
  top: 0;
  left: var(--padx);
  display: flex;
  gap: var(--gap);
  height: var(--h);
  will-change: transform;
  transition: transform 420ms cubic-bezier(0.34, 1.4, 0.64, 1);
}

/* ── number (button) ───────────────────────────────────────── */
.pg__page {
  position: relative;
  isolation: isolate;
  z-index: 0;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--h);
  height: var(--h);
  padding: 0;
  border: 0;
  background: transparent;
  --lit: 0;
  --mx: 50%;
  --my: 50%;
  --rip: var(--ring); /* droplet in the theme color */
  cursor: pointer;
  border-radius: var(--tr);
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transform-style: preserve-3d;
  transition: transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pg__page:disabled { cursor: not-allowed; }
.pg__page:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }

/* digit with a radial focus clipped to the glyph: those under the cursor glow */
.pg__num {
  position: relative;
  z-index: 1;
  color: var(--text-muted, #8a8a8a);
  background: radial-gradient(
    140px circle at var(--mx) var(--my),
    var(--text, #ededed),
    var(--text, #ededed) 25%,
    var(--text-muted, #8a8a8a) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font: inherit;
  font-size: var(--fs);
  font-weight: 540;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

/* ── indicator: sliding white pill + spring ───────────────── */
.pg__indicator {
  position: absolute;
  top: 0;
  left: 0;
  height: var(--h);
  border-radius: var(--tr);
  background: var(--acc);
  opacity: 0;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
  transition:
    transform 420ms cubic-bezier(0.34, 1.4, 0.64, 1),
    width 420ms cubic-bezier(0.34, 1.4, 0.64, 1),
    opacity 200ms ease;
}
.pg__indicator.is-ready { opacity: 1; }
.pg__indicator.is-pop { animation: pg-pop 460ms cubic-bezier(0.34, 1.4, 0.64, 1); }
@keyframes pg-pop {
  0% { scale: 1; }
  38% { scale: 1.099; }
  100% { scale: 1; }
}

/* at the edges there are no more numbers behind → reduced overshoot and a
   subtle pop so the pill does not seem to "jump" outward, just a bounce. */
.pg.is-edge .pg__indicator,
.pg.is-edge .pg__ind-mask {
  transition-timing-function: cubic-bezier(0.34, 1.12, 0.64, 1);
}
.pg.is-edge .pg__indicator.is-pop { animation: pg-pop-soft 380ms cubic-bezier(0.34, 1.12, 0.64, 1); }
@keyframes pg-pop-soft {
  0% { scale: 1; }
  42% { scale: 1.035; }
  100% { scale: 1; }
}

/* mask: copy of the numbers in inverted color, clipped to the pill.
   Its translate cancels out the indicator's → the text stays "fixed" over the
   track while the pill window slides, revealing it digit by digit. */
.pg__ind-mask {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  gap: var(--gap);
  height: var(--h);
  box-sizing: border-box;
  transition:
    transform 420ms cubic-bezier(0.34, 1.4, 0.64, 1),
    width 420ms cubic-bezier(0.34, 1.4, 0.64, 1);
}
.pg__ind-label {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--h);
  height: var(--h);
  font: inherit;
  font-size: var(--fs);
  font-weight: 540;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  color: var(--acc-on);
}

/* ── nav arrows ────────────────────────────────────────────── */
.pg__nav {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--h);
  height: var(--h);
  padding: 0;
  border: 1px solid transparent;
  border-radius: var(--tr);
  background: transparent;
  --lit: 0;
  --rip: var(--ring); /* droplet in the theme color (space-separated rgb) */
  /* proximity light: the cursor lights up the arrow as it approaches */
  color: color-mix(in srgb, var(--text, #ededed) calc(var(--lit) * 100%), var(--text-muted, #8a8a8a));
  font-size: var(--fs);
  cursor: pointer;
  transform-style: preserve-3d;
  transition:
    transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 200ms ease;
}
/* arrows: the droplet is clipped to the button (like VsButton) */
.pg__nav .pg__ripples { overflow: hidden; }
.pg__nav svg {
  position: relative;
  z-index: 1;
  display: block;
  filter: drop-shadow(0 0 calc(var(--lit) * 6px) rgb(var(--ring) / calc(var(--lit) * 0.5)));
}
.pg__nav:hover:not(:disabled) {
  background: rgb(var(--ring) / 0.1);
}
.pg__nav:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }
.pg__nav:disabled { opacity: 0.35; cursor: not-allowed; }

/* water droplet — container clips to the arrow radius */
.pg__ripples {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  /* no clip → the droplet blooms beyond the button (bigger) */
  overflow: visible;
  pointer-events: none;
}
.pg__ripple {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: radial-gradient(
    circle,
    rgb(var(--rip) / 0.34) 0%,
    rgb(var(--rip) / 0.18) 24%,
    rgb(var(--rip) / 0.08) 44%,
    rgb(var(--rip) / 0.03) 60%,
    transparent 76%
  );
  opacity: 0;
  will-change: transform, opacity;
  animation:
    pg-ripple-scale 720ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
    pg-ripple-fade 720ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}
@keyframes pg-ripple-scale {
  from { transform: translate(-50%, -50%) scale(0); }
  to   { transform: translate(-50%, -50%) scale(1.7); }
}
@keyframes pg-ripple-fade {
  from { opacity: 0.8; }
  to   { opacity: 0; }
}
@supports (corner-shape: squircle) {
  .pg--s-rounded .pg__ripples { corner-shape: squircle; }
}

.pg.is-disabled { opacity: 0.55; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .pg__track,
  .pg__indicator,
  .pg__ind-mask { transition: opacity 200ms ease; }
  .pg__indicator.is-pop { animation: none; }
  .pg__page,
  .pg__nav { transition: none; }
  .pg__page:active:not(:disabled) { transform: none; }
  .pg__ripple { display: none; }
}
`;let m;function w(d){if(m||=document.createElement("canvas").getContext("2d"),!m)return null;m.fillStyle="#000",m.fillStyle=d;const t=m.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const A=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function x(d,t){const e=t?w(String(t).trim()):null;if(!e){for(const a of A)d.style.removeProperty(a);return}const i=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,r=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(a=>Math.round(n?a*.92:a+(255-a)*.16)),l=(a,p)=>d.style.setProperty(a,p);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(a,r);l("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(a,e.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(a,n?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])l(a,n?"0 0 0":"255 255 255");l("--vs-color",r),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class k extends HTMLElement{static observedAttributes=["total","current","page","sibling-count","size","shape","show-prev-next","show-edges","disabled","color"];#i;#a;#n;#t;#r;#o;#l;#p;#c;#s=[];#u=0;#e=1;#d=0;#b=null;#h=0;#v=t=>this.#E(t);#f=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=_,this.#i=document.createElement("nav"),this.#i.className="pg",this.#i.setAttribute("role","navigation"),this.#i.setAttribute("aria-label","Pagination"),this.#o=this.#m(b.first),this.#l=this.#m(b.prev),this.#p=this.#m(b.next),this.#c=this.#m(b.last),this.#a=document.createElement("div"),this.#a.className="pg__viewport",this.#n=document.createElement("div"),this.#n.className="pg__track",this.#t=document.createElement("span"),this.#t.className="pg__indicator",this.#t.setAttribute("aria-hidden","true"),this.#r=document.createElement("span"),this.#r.className="pg__ind-mask",this.#t.appendChild(this.#r),this.#t.addEventListener("animationend",()=>this.#t.classList.remove("is-pop")),this.#n.appendChild(this.#t),this.#a.appendChild(this.#n),this.#i.append(this.#o,this.#l,this.#a,this.#p,this.#c),t.append(e,this.#i),this.#o.addEventListener("click",()=>this.#g(1)),this.#l.addEventListener("click",()=>this.#g(this.#e-1)),this.#p.addEventListener("click",()=>this.#g(this.#e+1)),this.#c.addEventListener("click",()=>this.#g(this.#u))}connectedCallback(){x(this,this.getAttribute("color")),this.#x(),addEventListener("pointermove",this.#v,{passive:!0}),typeof ResizeObserver<"u"&&(this.#f=new ResizeObserver(()=>this.#y()),this.#f.observe(this.#a))}disconnectedCallback(){removeEventListener("pointermove",this.#v),this.#d&&cancelAnimationFrame(this.#d),this.#h&&cancelAnimationFrame(this.#h),this.#f?.disconnect()}attributeChangedCallback(){x(this,this.getAttribute("color")),this.#i&&this.#x()}get current(){return this.#e}set current(t){this.setAttribute("current",String(t|0))}get page(){return this.#e}set page(t){this.setAttribute("page",String(t|0))}#w(t,e){if(!this.hasAttribute(t))return e;const i=this.getAttribute(t);return i!=="false"&&i!=="0"}#x(){const t=Math.max(1,Math.floor(Number(this.getAttribute("total")??12))||1),e=Math.max(0,parseInt(this.getAttribute("sibling-count")??"1",10)||0),i=Math.max(1,e*2+1),s=this.getAttribute("size")||"md",n=this.getAttribute("shape")||"rounded",r=this.hasAttribute("disabled");t!==this.#u&&(this.#u=t,this.#A(t));const o=this.getAttribute("current")??this.getAttribute("page"),l=o==null?this.#e:parseInt(o,10)||1,a=Math.min(Math.max(1,l),t),p=a!==this.#e;this.#e=a;const c=a<=1,h=a>=t;this.#i.className=["pg",`pg--${s}`,`pg--s-${n}`,r?"is-disabled":"",c||h?"is-edge":""].filter(Boolean).join(" "),this.#i.style.setProperty("--win",String(i)),this.#i.style.setProperty("--padx","10px");const g=this.hasAttribute("show-prev-next"),u=this.#w("show-edges",!1);this.#o.style.display=u?"":"none",this.#c.style.display=u?"":"none",this.#l.style.display=g?"":"none",this.#p.style.display=g?"":"none",this.#o.disabled=r||c,this.#l.disabled=r||c,this.#p.disabled=r||h,this.#c.disabled=r||h;for(const{btn:f}of this.#s)f.disabled=r;this.#k(),this.#M(p)}#A(t){for(const e of this.#s)e.btn.remove();this.#s=[],this.#r.textContent="";for(let e=1;e<=t;e++){const i=document.createElement("span");i.className="pg__ind-label",i.textContent=String(e),this.#r.appendChild(i);const s=document.createElement("button");s.type="button",s.className="pg__page",s.setAttribute("aria-label",`Page ${e}`);const n=document.createElement("span");n.className="pg__ripples",n.setAttribute("aria-hidden","true");const r=document.createElement("span");r.className="pg__num",r.textContent=String(e),s.append(n,r);const o=e;s.addEventListener("pointerdown",l=>this.#_(s,n,l));for(const l of["pointerup","pointerleave","pointercancel"])s.addEventListener(l,()=>{s.style.transform=""});s.addEventListener("click",()=>this.#g(o)),this.#n.appendChild(s),this.#s.push({btn:s,ripples:n})}}#k(){for(let t=0;t<this.#s.length;t++){const e=this.#s[t].btn,i=t+1===this.#e;e.classList.toggle("is-active",i),i?e.setAttribute("aria-current","page"):e.removeAttribute("aria-current")}}#y(){const t=this.#s[this.#e-1]?.btn,e=this.#n,i=this.#a;if(!t||!e||!i)return;const s=i.clientWidth,n=e.scrollWidth,r=t.offsetLeft+t.offsetWidth/2,o=Math.min(0,s-20-n),l=Math.max(o,Math.min(0,s/2-10-r));this.#n.style.transform=`translateX(${l}px)`,this.#t.style.transform=`translateX(${t.offsetLeft}px)`,this.#t.style.width=`${t.offsetWidth}px`,this.#r.style.transform=`translateX(${-t.offsetLeft}px)`,this.#r.style.width=`${n}px`,this.#t.classList.add("is-ready")}#M(t){this.#h&&cancelAnimationFrame(this.#h),this.#h=requestAnimationFrame(()=>{this.#h=0,this.#y(),t&&(this.#t.classList.remove("is-pop"),requestAnimationFrame(()=>requestAnimationFrame(()=>{this.isConnected&&this.#t.classList.add("is-pop")})))})}#g(t){if(this.hasAttribute("disabled"))return;const e=Math.min(Math.max(1,t),this.#u);e!==this.#e&&(this.#e=e,this.setAttribute("current",String(e)),this.setAttribute("page",String(e)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{page:e}})))}#m({paths:t,label:e}){const i=document.createElement("button");i.type="button",i.className="pg__nav",i.setAttribute("aria-label",e);const s=document.createElement("span");s.className="pg__ripples",s.setAttribute("aria-hidden","true");const n=document.createElementNS(v,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("width","1em"),n.setAttribute("height","1em"),n.setAttribute("aria-hidden","true");for(const r of t){const o=document.createElementNS(v,"path");o.setAttribute("d",r),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-miterlimit","10"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),n.appendChild(o)}i.append(s,n),i.addEventListener("pointerdown",r=>this.#_(i,s,r));for(const r of["pointerup","pointerleave","pointercancel"])i.addEventListener(r,()=>{i.style.transform=""});return i}#_(t,e,i){if(this.hasAttribute("disabled")||t.disabled||y())return;const s=t.getBoundingClientRect(),n=i.clientX-s.left,r=i.clientY-s.top,o=Math.max(n,s.width-n),l=Math.max(r,s.height-r),a=Math.hypot(o,l)*2,p=document.createElement("span");for(p.className="pg__ripple",p.style.cssText=`left:${n}px;top:${r}px;width:${a}px;height:${a}px`,p.addEventListener("animationend",()=>p.remove()),e.appendChild(p);e.childElementCount>6;)e.firstElementChild.remove();const c=f=>Math.max(-1,Math.min(1,f)),h=c((n/s.width-.5)*2),g=c((r/s.height-.5)*2),u=1-.2*Math.min(Math.abs(h),Math.abs(g));t.style.transform=`perspective(420px) rotateX(${(-g*9*u).toFixed(2)}deg) rotateY(${(h*7*u).toFixed(2)}deg) scale(0.9)`}#E(t){this.#b=t,!this.#d&&(this.#d=requestAnimationFrame(()=>{this.#d=0,this.#b&&this.#L(this.#b)}))}#L(t){if(!this.hasAttribute("disabled")){for(let e=0;e<this.#s.length;e++){const i=this.#s[e].btn;if(e===this.#e-1){i.style.setProperty("--lit","0");continue}const s=i.getBoundingClientRect();i.style.setProperty("--mx",`${t.clientX-s.left}px`),i.style.setProperty("--my",`${t.clientY-s.top}px`);const n=Math.max(s.left,Math.min(t.clientX,s.right)),r=Math.max(s.top,Math.min(t.clientY,s.bottom)),o=Math.hypot(t.clientX-n,t.clientY-r);i.style.setProperty("--lit",Math.max(0,1-o/96).toFixed(3))}for(const e of[this.#o,this.#l,this.#p,this.#c]){if(e.disabled){e.style.setProperty("--lit","0");continue}const i=e.getBoundingClientRect(),s=Math.max(i.left,Math.min(t.clientX,i.right)),n=Math.max(i.top,Math.min(t.clientY,i.bottom)),r=Math.hypot(t.clientX-s,t.clientY-n);e.style.setProperty("--lit",Math.max(0,1-r/96).toFixed(3))}}}}customElements.define("vs-pagination",k);
