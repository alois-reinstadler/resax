import{FX_CSS as u,attachGlow as p}from"./vs-fx.CLXiCjCI.js";const v=`
  :host { display: inline-flex; }
${u}
.vsw {
  /* md scale by default */
  --w: 52px;
  --h: 32px;
  --pad: 3px;
  --accent: #1f74ff;
  --off: var(--sw-off, #39393d);
  --thumb: #ffffff;
  --dur: 480ms;
  --spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: inherit;
  font-size: 14px;
  color: #ededed;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.vsw--lbl-left { flex-direction: row-reverse; }

/* double light (global): radii for the switch size */
.vsw__glow { --glow-r-core: 42px; --glow-r-soft: 150px; }

/* sm is the size chrome reuses, so its metrics read from tokens (fallback =
   the catalog default) — a host can shrink the track without a transform. */
.vsw--sm {
  --w: var(--sw-w-sm, 40px);
  --h: var(--sw-h-sm, 24px);
  --pad: var(--sw-pad-sm, 2.5px);
  font-size: var(--sw-fs-sm, 13px);
}
.vsw--lg { --w: 64px; --h: 38px; --pad: 4px; font-size: 15px; }

/* ── track ── */
.vsw__track {
  position: relative;
  flex: none;
  width: var(--w);
  height: var(--h);
  padding: 0;
  border: none;
  border-radius: 999px;
  background: var(--off);
  cursor: inherit;
  outline: none;
  box-shadow: none;
  transform-style: preserve-3d;
  transition:
    transform 260ms var(--spring),
    background-color var(--dur) var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
}

/* wave container: clips to the track shape without touching the thumb's shadow */
.vsw__ripples {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
}
.vsw__ripple {
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.45) 0%,
    rgba(255, 255, 255, 0.22) 30%,
    rgba(255, 255, 255, 0.08) 52%,
    transparent 72%
  );
  opacity: 0;
  will-change: transform, opacity;
  animation:
    vsw-ripple-scale 640ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
    vsw-ripple-fade 640ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}
@keyframes vsw-ripple-scale {
  from { transform: translate(-50%, -50%) scale(0); }
  to   { transform: translate(-50%, -50%) scale(1); }
}
@keyframes vsw-ripple-fade {
  from { opacity: 0.85; }
  to   { opacity: 0; }
}
.vsw--r-rounded .vsw__track { border-radius: calc(var(--h) * 0.34); }
.vsw--r-square .vsw__track { border-radius: 7px; }

.is-on .vsw__track {
  background: var(--accent);
  box-shadow: none;
}

.vsw__track:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--accent) 80%, #fff);
  outline-offset: 3px;
}

/* ── thumb ── */
.vsw__thumb {
  position: absolute;
  z-index: 2;
  top: var(--pad);
  left: var(--pad);
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--h) - var(--pad) * 2);
  height: calc(var(--h) - var(--pad) * 2);
  /* fixed radius (half the height) → when stretched it stays a rounded rect, not an oval */
  border-radius: calc((var(--h) - var(--pad) * 2) / 2);
  background: var(--thumb);
  color: var(--off);
  box-shadow: none;
  /* width and transform SAME duration+easing → when stretching, the opposite edge
     stays perfectly attached (no drift) */
  transition:
    transform var(--dur) var(--spring),
    width var(--dur) var(--spring),
    border-radius var(--dur) var(--ease-out, ease);
  will-change: transform, width;
}
.vsw--r-rounded .vsw__thumb { border-radius: calc((var(--h) - var(--pad) * 2) * 0.32); }
.vsw--r-square .vsw__thumb { border-radius: 5px; }

.is-on .vsw__thumb {
  transform: translateX(calc(var(--w) - var(--h)));
  color: var(--accent);
}

/* stretch on press (iOS-style elastic): the thumb elongates */
.is-pressed .vsw__thumb { width: calc((var(--h) - var(--pad) * 2) * 1.32); }
/* on + pressed: since it grows to the right, compensate the translate */
.is-on.is-pressed .vsw__thumb {
  transform: translateX(calc(var(--w) - var(--h) - (var(--h) - var(--pad) * 2) * 0.32));
}

/* ── icons inside the thumb (cross-fade) ── */
.vsw__thumb-ico {
  position: absolute;
  width: 56%;
  height: 56%;
  transition: opacity 200ms ease, transform 320ms var(--spring);
}
.vsw__thumb-ico--on { opacity: 0; transform: scale(0.4) rotate(-45deg); }
.vsw__thumb-ico--off { opacity: 0.55; transform: scale(1); color: var(--off); }
.is-on .vsw__thumb-ico--on { opacity: 1; transform: scale(1) rotate(0); }
.is-on .vsw__thumb-ico--off { opacity: 0; transform: scale(0.4); }

/* ── spinner loading ── */
.vsw__spinner {
  width: 60%;
  height: 60%;
  color: var(--off);
  animation: vsw-spin 0.7s linear infinite;
}
.is-on .vsw__spinner { color: var(--accent); }
@keyframes vsw-spin { to { transform: rotate(360deg); } }
.is-loading .vsw__track { cursor: progress; }

/* ── label ── */
.vsw__label { line-height: 1; }

/* ── disabled ── */
.is-disabled {
  cursor: not-allowed;
  opacity: 0.45;
}
.is-disabled .vsw__track { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .vsw__track,
  .vsw__thumb,
  .vsw__thumb-ico { transition-duration: 0ms; }
  .vsw__spinner { animation-duration: 1.4s; }
  .vsw__ripple { display: none; }
}
`,o="http://www.w3.org/2000/svg",l=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,d={accent:"#1f74ff",success:"#30d158",danger:"#ff453a",warn:"#ff9f0a",neutral:"#ededed"},b=18,m=12;class f extends HTMLElement{static observedAttributes=["checked","disabled","label","size","tone","loading","icons","radius","color","label-position","glow"];#e;#t;#l;#r;#d;#n;#s;#i;#h;#a;#f;#o=!1;#u=!1;#p=!1;#w=0;#g=!1;#_=t=>this.#M(t);#y=t=>this.#N(t);#k=t=>this.#z(t);#v=()=>this.#X();#A=t=>this.#S(t);#x=()=>this.#L();constructor(){super();const t=this.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=v,this.#e=document.createElement("label"),this.#e.className="vsw",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="vsw__track",this.#t.setAttribute("role","switch"),this.#l=document.createElement("span"),this.#l.className="fx-glow vsw__glow",this.#l.setAttribute("aria-hidden","true"),this.#r=document.createElement("span"),this.#r.className="vsw__ripples",this.#r.setAttribute("aria-hidden","true"),this.#d=document.createElement("span"),this.#d.className="vsw__thumb",this.#n=document.createElementNS(o,"svg"),this.#n.setAttribute("class","vsw__spinner"),this.#n.setAttribute("viewBox","0 0 24 24"),this.#n.setAttribute("aria-hidden","true");const e=document.createElementNS(o,"circle");e.setAttribute("cx","12"),e.setAttribute("cy","12"),e.setAttribute("r","8"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","3"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-dasharray","38 50"),this.#n.append(e),this.#s=document.createElementNS(o,"svg"),this.#s.setAttribute("class","vsw__thumb-ico vsw__thumb-ico--on"),this.#s.setAttribute("viewBox","0 0 24 24"),this.#s.setAttribute("fill","none"),this.#s.setAttribute("aria-hidden","true");const s=document.createElementNS(o,"path");s.setAttribute("d","M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"),s.setAttribute("fill","none"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round");const r=document.createElementNS(o,"path");r.setAttribute("d","M7.75 11.9999L10.58 14.8299L16.25 9.16992"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.5"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),this.#s.append(s,r),this.#i=document.createElementNS(o,"svg"),this.#i.setAttribute("class","vsw__thumb-ico vsw__thumb-ico--off"),this.#i.setAttribute("viewBox","0 0 24 24"),this.#i.setAttribute("fill","none"),this.#i.setAttribute("aria-hidden","true");const n=document.createElementNS(o,"path");n.setAttribute("d","M6 12H18"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","1.5"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),this.#i.append(n),this.#d.append(this.#n,this.#s,this.#i),this.#t.append(this.#l,this.#r,this.#d),this.#h=document.createElement("span"),this.#h.className="vsw__label",this.#a=document.createElement("slot"),this.#h.append(this.#a),this.#e.append(this.#t,this.#h),t.append(i,this.#e),this.#t.addEventListener("pointerdown",this.#_),this.#t.addEventListener("pointermove",this.#y),this.#t.addEventListener("pointerup",this.#k),this.#t.addEventListener("pointercancel",this.#v),this.#t.addEventListener("pointerleave",this.#v),this.#t.addEventListener("keydown",this.#A),this.#a.addEventListener("slotchange",this.#x)}connectedCallback(){this.#E(),this.#f=p(this.#t,120,()=>this.hasAttribute("disabled")||this.hasAttribute("loading")||!this.hasAttribute("glow"))}disconnectedCallback(){this.#f?.(),this.#t.removeEventListener("pointerdown",this.#_),this.#t.removeEventListener("pointermove",this.#y),this.#t.removeEventListener("pointerup",this.#k),this.#t.removeEventListener("pointercancel",this.#v),this.#t.removeEventListener("pointerleave",this.#v),this.#t.removeEventListener("keydown",this.#A),this.#a.removeEventListener("slotchange",this.#x)}attributeChangedCallback(){this.#t&&this.#E()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}#c(){return this.hasAttribute("checked")}#m(){return!this.hasAttribute("disabled")&&!this.hasAttribute("loading")}#E(){const t=(a,c)=>this.getAttribute(a)??c,i=this.#c(),e=this.hasAttribute("disabled"),s=this.hasAttribute("loading"),r=this.hasAttribute("icons"),n=t("tone","accent"),h=this.getAttribute("color")||d[n]||d.accent;this.#e.className=`vsw vsw--${t("size","md")} vsw--r-${t("radius","pill")} vsw--lbl-${t("label-position","right")}`+(i?" is-on":"")+(e?" is-disabled":"")+(s?" is-loading":"")+(this.#o?" is-pressed":"")+(this.#u?" is-dragging":""),this.#e.style.setProperty("--accent",h),this.#t.disabled=e,this.#t.setAttribute("aria-checked",String(i)),this.#t.setAttribute("aria-busy",String(s)),this.#n.style.display=s?"":"none",this.#s.style.display=!s&&r?"":"none",this.#i.style.display=!s&&r?"":"none",this.#a.textContent=t("label",""),this.#L()}#L(){const t=!!this.getAttribute("label")||this.#a.assignedNodes({flatten:!0}).length>0;this.#h.style.display=t?"":"none"}#b(t){!this.#m()||t===this.#c()||(this.checked=t,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:t}})))}#C(){this.#b(!this.#c())}#S(t){this.#m()&&(t.key===" "||t.key==="Enter"?(t.preventDefault(),this.#C()):t.key==="ArrowRight"?(t.preventDefault(),this.#b(!0)):t.key==="ArrowLeft"&&(t.preventDefault(),this.#b(!1)))}#M(t){if(this.#m()){this.#o=!0,this.#p=!1,this.#w=t.clientX,this.#g=this.#c(),this.#e.classList.add("is-pressed"),this.#$(t),this.#T(t);try{this.#t.setPointerCapture?.(t.pointerId)}catch{}}}#N(t){if(!this.#o)return;const i=t.clientX-this.#w;if(Math.abs(i)>4&&(this.#p=!0,this.#u=!0,this.#e.classList.add("is-dragging")),!this.#p)return;const e=i>0?!0:i<0?!1:this.#g;e!==this.#c()&&this.#b(e)}#z(t){if(this.#o){this.#o=!1,this.#t.style.transform="",this.#p||this.#C(),this.#u=!1,this.#e.classList.remove("is-pressed","is-dragging");try{this.#t.releasePointerCapture?.(t.pointerId)}catch{}}}#X(){this.#o=!1,this.#u=!1,this.#t.style.transform="",this.#e.classList.remove("is-pressed","is-dragging")}#$(t){if(l())return;const i=this.#t.getBoundingClientRect(),e=t.clientX-i.left,s=t.clientY-i.top,r=Math.max(e,i.width-e),n=Math.max(s,i.height-s),h=Math.hypot(r,n)*2,a=document.createElement("span");for(a.className="vsw__ripple",a.style.cssText=`left:${e}px;top:${s}px;width:${h}px;height:${h}px`,a.addEventListener("animationend",()=>a.remove()),this.#r.appendChild(a);this.#r.childElementCount>5;)this.#r.firstElementChild.remove()}#T(t){if(l())return;const i=this.#t.getBoundingClientRect(),e=c=>Math.max(-1,Math.min(1,c)),s=e(((t.clientX-i.left)/i.width-.5)*2),r=e(((t.clientY-i.top)/i.height-.5)*2),n=1-.2*Math.min(Math.abs(s),Math.abs(r)),h=(-r*b*n).toFixed(2),a=(s*m*n).toFixed(2);this.#t.style.transform=`perspective(300px) rotateX(${h}deg) rotateY(${a}deg) scale(0.93)`}}customElements.define("vs-switch",f);
