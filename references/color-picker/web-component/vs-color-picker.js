import{FX_CSS as $,attachGlow as L}from"./vs-fx.CLXiCjCI.js";const M=`
  :host { display: inline-block; }
  :host([block]) { display: block; width: 100%; }
${$}
.cp {
  --r: var(--ctrl-r-md, 12px);
  --w: 256px;
  --accent: var(--inp-accent, #ededed);
  --ring: var(--inp-ring, 255 255 255);
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  gap: 0;
  width: var(--w);
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--inp-border, #2a2a2a);
  border-radius: var(--rr, var(--r));
  background: var(--bg-card, #0a0a0a);
  color: var(--inp-text, #ededed);
  font: inherit;
  transition:
    border-color 200ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    background-color 200ms ease;
}
.cp--block { width: 100%; }
.cp:hover:not(.is-disabled) { border-color: var(--inp-border-hover, #3d3d3d); }

/* sizes */
.cp--sm { --r: var(--ctrl-r-sm, 10px); --w: 224px; font-size: var(--ctrl-fs-sm, 13px); }
.cp--lg { --r: var(--ctrl-r-lg, 14px); --w: 296px; font-size: var(--ctrl-fs-lg, 15px); }

/* radii */
.cp--r-none { --rr: 0px; }
.cp--r-subtle { --rr: 12px; }
.cp--r-rounded { --rr: 22px; }
.cp--r-pill { --rr: 28px; }
@supports (corner-shape: squircle) {
  .cp--r-squircle { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
}

/* glow (above sv + sheet so the ring covers the whole border) */
.cp__glow { z-index: 10; opacity: calc(var(--glow, 0) * 0.5); }

/* SV area — color hero: full-bleed on top, tall */
.cp__sv {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 0;
  overflow: hidden;
  cursor: crosshair;
  background: var(--hue, #f00);
  touch-action: none;
  outline: none;
}

/* card that sits ON TOP of the color */
.cp__sheet {
  position: relative;
  z-index: 1;
  margin-top: -18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 18px;
  border-radius: 22px 22px 0 0;
  background: var(--bg-card, #0a0a0a);
  box-shadow: 0 -10px 24px -12px rgba(0, 0, 0, 0.45);
}
.cp__sv:focus-visible { box-shadow: 0 0 0 2px var(--accent); }
.cp__sv-sat,
.cp__sv-val { position: absolute; inset: 0; pointer-events: none; }
.cp__sv-sat { background: linear-gradient(to right, #fff, transparent); }
.cp__sv-val { background: linear-gradient(to top, #000, transparent); }
.cp__sv-ripples { z-index: 1; border-radius: inherit; }
.cp__sv-thumb {
  --sc: 1;
  position: absolute;
  z-index: 2;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.4);
  background: var(--cur);
  transform: translate(-50%, -50%) scale(var(--sc));
  pointer-events: none;
  transition: transform 320ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}
/* direct click: the dot bounces to the point */
.cp__sv-thumb.is-jump {
  transition:
    left 420ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
    top 420ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
    transform 320ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}
/* pressed: grows with a bounce */
.cp__sv-thumb.is-drag { --sc: 1.45; }

/* preview row + sliders — reusable checkerboard (transparency) */
.cp {
  --checker: repeating-conic-gradient(
    var(--cp-checker, #c8ccd2) 0% 25%, #ffffff 0% 50%
  ) 0 0 / 12px 12px;
}
.cp__preview {
  flex: none;
  width: 36px;
  height: 36px;
  position: relative;
  padding: 0;
  border-radius: 11px;
  overflow: hidden;
  background: var(--checker);
  border: 1px solid var(--inp-border, #2a2a2a);
  cursor: pointer;
  transition: transform 200ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)), border-color 160ms ease;
}
.cp__preview:hover:not(:disabled) { border-color: var(--inp-border-hover, #3d3d3d); }
.cp__preview:active:not(:disabled) { transform: scale(0.94); }
.cp__preview:focus-visible { outline: none; border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent); }
.cp__preview-fill { position: absolute; inset: 0; }
/* overlay: copy icon on hover, check once copied */
.cp__preview-ov {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.32);
  opacity: 0;
  transition: opacity 160ms ease;
  pointer-events: none;
}
.cp__preview:hover:not(:disabled) .cp__preview-ov,
.cp__preview:focus-visible .cp__preview-ov,
.cp__preview.is-copied .cp__preview-ov { opacity: 1; }
.cp__preview-ico {
  width: 18px;
  height: 18px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
  transform: scale(0.7);
  transition: transform 260ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}
.cp__preview:hover:not(:disabled) .cp__preview-ico,
.cp__preview.is-copied .cp__preview-ico { transform: scale(1); }
/* swap copy/check icons via the is-copied flag (both nodes built once) */
.cp__preview-ico--check { display: none; }
.cp__preview.is-copied .cp__preview-ico--copy { display: none; }
.cp__preview.is-copied .cp__preview-ico--check { display: block; }
.cp__tracks {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.cp__track { display: flex; flex-direction: column; gap: 7px; }
.cp__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text, #ededed);
  letter-spacing: -0.01em;
}

/* slider wrap that hosts the droplet ripple (clipped to the bar shape) */
.cp__bar-wrap { position: relative; display: block; line-height: 0; }
.cp__bar-ripples {
  overflow: visible; /* the bloom shows above/below the thin bar */
  z-index: 2; /* above the input gradient */
  --rip: 255 255 255;
}
.cp__bar { position: relative; z-index: 0; }

/* base bars — tall, rounded, fresh */
.cp__bar {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 16px;
  border-radius: 999px;
  cursor: pointer;
  outline: none;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
}
.cp__bar:focus-visible { box-shadow: 0 0 0 2px var(--accent); }
.cp__hue {
  background: linear-gradient(
    to right,
    #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%
  );
}
.cp__alpha {
  background: var(--track, linear-gradient(to right, transparent, #fff)), var(--checker);
}

/* pill-shaped thumb (taller than the bar) */
.cp__bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 24px;
  border-radius: 7px;
  background: transparent;
  border: 3px solid #fff;
  box-shadow: none;
  cursor: pointer;
  transition:
    transform 320ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
    filter 140ms ease;
}
.cp__bar::-moz-range-thumb {
  width: 14px;
  height: 24px;
  border-radius: 7px;
  background: transparent;
  border: 3px solid #fff;
  box-shadow: none;
  cursor: pointer;
  transition:
    transform 320ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
    filter 140ms ease;
}
/* drag: bouncy scale + motion blur */
.cp__bar.is-active::-webkit-slider-thumb { transform: scale(1.35); filter: blur(1.1px); }
.cp__bar.is-active::-moz-range-thumb { transform: scale(1.35); filter: blur(1.1px); }

/* inputs: [ preview ] [ FMT ] [ value .......... ] */
.cp__inputs { display: flex; align-items: center; gap: 8px; }
.cp__inputs > .cp__fmt,
.cp__inputs > .cp__field { height: 36px; }

/* format button (cycles HEX/RGB/HSL) */
.cp__fmt {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 0 8px 0 10px;
  border: 1px solid var(--inp-border, #2a2a2a);
  border-radius: 9px;
  background: var(--bg-input, var(--bg-elevated, #111));
  color: var(--text-secondary, #a1a1a1);
  font: inherit;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease, color 160ms ease;
}
.cp__fmt:hover:not(:disabled) {
  border-color: var(--inp-border-hover, #3d3d3d);
  background: var(--inp-hover-bg, rgba(255, 255, 255, 0.05));
  color: var(--text, #ededed);
}
.cp__fmt:focus-visible { outline: none; border-color: var(--accent); }
.cp__fmt-ico { width: 13px; height: 13px; opacity: 0.7; }

/* value cell (editable in hex, read-only in rgb/hsl) */
.cp__field {
  flex: 1;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
  padding: 0 10px;
  border: 1px solid var(--inp-border, #2a2a2a);
  border-radius: 9px;
  background: var(--bg-input, var(--bg-elevated, #111));
  transition: border-color 160ms ease;
}
.cp__field:focus-within { border-color: var(--accent); }
.cp__field--ro { color: var(--text, #ededed); }
.cp__hash { color: var(--inp-placeholder, #8b8b8b); }
.cp__hex {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  text-transform: lowercase;
  outline: none;
}
.cp__value {
  flex: 1;
  min-width: 0;
  font-size: 12px;
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* swatches */
.cp__swatches {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 6px;
}
.cp--sm .cp__swatches { grid-template-columns: repeat(8, 1fr); }
.cp__swatch {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  aspect-ratio: 1;
  border-radius: 6px;
  border: 1px solid rgba(127, 127, 127, 0.25);
  background: var(--sw);
  cursor: pointer;
  padding: 0;
  transition: transform 140ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}
.cp__swatch-ripples { border-radius: inherit; }
.cp__swatch:hover:not(:disabled) { transform: scale(1.12); }
.cp__swatch:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--accent); }
.cp__swatch.is-active { box-shadow: 0 0 0 2px var(--bg-card, #0a0a0a), 0 0 0 4px var(--accent); }

/* tones — recolor accent, ring and the glow */
.cp--t-danger  { --accent: #ff6369; --ring: 255 99 105;  --fx-tint: 255 99 105; }
.cp--t-warn    { --accent: #ffb224; --ring: 255 178 36;  --fx-tint: 255 178 36; }
.cp--t-success { --accent: #4cc38a; --ring: 76 195 138;  --fx-tint: 76 195 138; }

/* hidden inputs section */
.cp--no-inputs .cp__inputs { display: none; }

/* disabled */
.cp.is-disabled { opacity: 0.5; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .cp, .cp__swatch, .cp__sv-thumb, .cp__sv-thumb.is-jump,
  .cp__preview, .cp__preview-ov, .cp__preview-ico { transition: none; }
  .cp__sv-thumb.is-drag { --sc: 1; }
  .cp__bar::-webkit-slider-thumb, .cp__bar::-moz-range-thumb { transition: none; }
  .cp__bar.is-active::-webkit-slider-thumb,
  .cp__bar.is-active::-moz-range-thumb { transform: none; filter: none; }
}
`;function d(a){return Math.min(1,Math.max(0,a))}function _(a){let t=String(a).trim().replace(/^#/,"");if(t.length===3&&(t=t.split("").map(i=>i+i).join("")),t.length===4&&(t=t.split("").map(i=>i+i).join("")),!/^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(t))return null;const e=t.length===8?parseInt(t.slice(6,8),16)/255:1;return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16),e]}function g(a,t,e){const i=s=>Math.round(s).toString(16).padStart(2,"0");return`#${i(a)}${i(t)}${i(e)}`}function x(a,t,e){a/=255,t/=255,e/=255;const i=Math.max(a,t,e),s=Math.min(a,t,e),r=i-s;let n=0;return r&&(i===a?n=(t-e)/r%6:i===t?n=(e-a)/r+2:n=(a-t)/r+4,n*=60,n<0&&(n+=360)),[n,i?r/i:0,i]}function w(a,t,e){const i=e*t,s=i*(1-Math.abs(a/60%2-1)),r=e-i;let n=0,p=0,c=0;return a<60?[n,p,c]=[i,s,0]:a<120?[n,p,c]=[s,i,0]:a<180?[n,p,c]=[0,i,s]:a<240?[n,p,c]=[0,s,i]:a<300?[n,p,c]=[s,0,i]:[n,p,c]=[i,0,s],[(n+r)*255,(p+r)*255,(c+r)*255]}function N(a,t,e){a/=255,t/=255,e/=255;const i=Math.max(a,t,e),s=Math.min(a,t,e),r=i-s;let n=0;const p=(i+s)/2,c=r?r/(1-Math.abs(2*p-1)):0;return r&&(i===a?n=(t-e)/r%6:i===t?n=(e-a)/r+2:n=(a-t)/r+4,n=(n*60+360)%360),[n,c,p]}const y="http://www.w3.org/2000/svg",k=["#ff6369","#ffb224","#4cc38a","#6e56cf","#0091ff","#ededed","#8b8b8b","#111111"],m=["hex","rgb","hsl"],S=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function f(a,t,e){const i=document.createElementNS(y,"svg");i.setAttribute("class",a),i.setAttribute("viewBox",t),i.setAttribute("fill","none"),i.setAttribute("aria-hidden","true");for(const s of e){const r=document.createElementNS(y,"path");r.setAttribute("d",s),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.5"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),i.appendChild(r)}return i}let u;function T(a){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=a;const t=u.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const z=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function E(a,t){const e=t?T(String(t).trim()):null;if(!e){for(const o of z)a.style.removeProperty(o);return}const i=o=>(o/=255,o<=.03928?o/12.92:((o+.055)/1.055)**2.4),r=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,p=e.map(o=>Math.round(r?o*.92:o+(255-o)*.16)),c=(o,l)=>a.style.setProperty(o,l);for(const o of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(o,n);c("--btn-primary-bg-hover",`rgb(${p[0]} ${p[1]} ${p[2]})`);for(const o of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(o,e.join(" "));for(const o of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(o,r?"#0b0b0b":"#ffffff");for(const o of["--btn-primary-rip","--btn-primary-glow"])c(o,r?"0 0 0":"255 255 255");c("--vs-color",n),c("--vs-color-rgb",e.join(" ")),c("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class H extends HTMLElement{static observedAttributes=["value","disabled","format","size","radius","tone","show-inputs","glow","block","color"];#m=0;#c=0;#p=0;#r=1;#D="";#z=k.slice();#P;#H;#A;#v;#_;#C=!1;#g=!1;#X=0;#O=0;#$;#u;#n;#L;#e;#x;#h;#i;#U;#t;#Y;#M;#a;#w;#s;#y;#N;#l;#R;#d;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=M,this.#n=document.createElement("div"),this.#n.className="cp",this.#n.setAttribute("role","group"),this.#n.setAttribute("aria-label","Color picker"),this.#L=document.createElement("span"),this.#L.className="fx-glow cp__glow",this.#L.setAttribute("aria-hidden","true"),this.#e=document.createElement("div"),this.#e.className="cp__sv",this.#e.setAttribute("role","slider"),this.#e.tabIndex=0,this.#e.setAttribute("aria-label","Saturation and brightness");const i=document.createElement("span");i.className="cp__sv-sat",i.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="cp__sv-val",s.setAttribute("aria-hidden","true"),this.#x=document.createElement("span"),this.#x.className="fx-ripples cp__sv-ripples",this.#x.setAttribute("aria-hidden","true"),this.#h=document.createElement("span"),this.#h.className="cp__sv-thumb",this.#h.setAttribute("aria-hidden","true"),this.#e.append(i,s,this.#x,this.#h);const r=document.createElement("div");r.className="cp__sheet";const n=document.createElement("div");n.className="cp__tracks";const p=this.#Z("Hue");this.#i=p.input,this.#U=p.ripples,this.#i.className="cp__bar cp__hue",this.#i.min="0",this.#i.max="360",this.#i.step="1",this.#i.setAttribute("aria-label","Hue");const c=this.#Z("Opacity");this.#t=c.input,this.#Y=c.ripples,this.#t.className="cp__bar cp__alpha",this.#t.min="0",this.#t.max="100",this.#t.step="1",this.#t.setAttribute("aria-label","Opacity"),n.append(p.track,c.track),this.#M=document.createElement("div"),this.#M.className="cp__inputs",this.#a=document.createElement("button"),this.#a.className="cp__preview",this.#a.type="button";const o=document.createElement("span");o.className="cp__preview-fill";const l=document.createElement("span");l.className="cp__preview-ov",l.setAttribute("aria-hidden","true");const A=f("cp__preview-ico cp__preview-ico--copy","0 0 24 24",["M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z","M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"]),C=f("cp__preview-ico cp__preview-ico--check","0 0 24 24",["M22 11.1V6.9C22 3.4 20.6 2 17.1 2H12.9C9.4 2 8 3.4 8 6.9V8H11.1C14.6 8 16 9.4 16 12.9V16H17.1C20.6 16 22 14.6 22 11.1Z","M16 17.1V12.9C16 9.4 14.6 8 11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1Z","M6.08008 15.0008L8.03008 16.9508L11.9201 13.0508"]);l.append(A,C),this.#a.append(o,l),this.#a.__fill=o,this.#l=document.createElement("button"),this.#l.className="cp__fmt",this.#l.type="button",this.#R=document.createTextNode("HEX");const v=f("cp__fmt-ico","0 0 24 24",["M9.01023 20.5002L3.99023 15.4902","M9.00977 3.5V20.5","M14.9902 3.5L20.0102 8.51","M14.9902 20.5V3.5"]);v.setAttribute("stroke-miterlimit","10"),this.#l.append(this.#R,v),this.#w=document.createElement("label"),this.#w.className="cp__field";const b=document.createElement("span");b.className="cp__hash",b.setAttribute("aria-hidden","true"),b.textContent="#",this.#s=document.createElement("input"),this.#s.className="cp__hex",this.#s.type="text",this.#s.maxLength=8,this.#s.spellcheck=!1,this.#s.setAttribute("aria-label","Hex value"),this.#w.append(b,this.#s),this.#y=document.createElement("div"),this.#y.className="cp__field cp__field--ro",this.#N=document.createElement("span"),this.#N.className="cp__value",this.#y.append(this.#N),this.#M.append(this.#a,this.#l,this.#w,this.#y),this.#d=document.createElement("div"),this.#d.className="cp__swatches",this.#d.setAttribute("role","group"),this.#d.setAttribute("aria-label","Quick colors"),r.append(n,this.#M,this.#d),this.#n.append(this.#L,this.#e,r),t.append(e,this.#n),this.#e.addEventListener("pointerdown",h=>this.#ct(h)),this.#e.addEventListener("keydown",h=>this.#lt(h)),this.#$=h=>this.#pt(h),this.#u=h=>this.#ht(h),this.#i.addEventListener("input",()=>this.#dt()),this.#i.addEventListener("pointerdown",h=>this.#tt(h,this.#i,this.#U,"hue"));for(const h of["pointerup","pointercancel","blur"])this.#i.addEventListener(h,()=>this.#it("hue"));this.#t.addEventListener("input",()=>this.#ut()),this.#t.addEventListener("pointerdown",h=>this.#tt(h,this.#t,this.#Y,"alpha"));for(const h of["pointerup","pointercancel","blur"])this.#t.addEventListener(h,()=>this.#it("alpha"));this.#a.addEventListener("click",()=>this.#xt()),this.#l.addEventListener("click",()=>this.#_t()),this.#s.addEventListener("input",()=>this.#bt()),this.#s.addEventListener("blur",()=>this.#mt())}#Z(t){const e=document.createElement("div");e.className="cp__track";const i=document.createElement("span");i.className="cp__label",i.textContent=t;const s=document.createElement("div");s.className="cp__bar-wrap";const r=document.createElement("input");r.type="range";const n=document.createElement("span");return n.className="fx-ripples cp__bar-ripples",n.setAttribute("aria-hidden","true"),s.append(r,n),e.append(i,s),{track:e,input:r,ripples:n}}connectedCallback(){E(this,this.getAttribute("color")),this.#F(this.getAttribute("value")||"#6e56cf"),this.#W(),this.#Q(),this.#E(),this.#P=L(this.#n,240,()=>this.#o||!this.#st)}disconnectedCallback(){this.#P?.(),document.removeEventListener("pointermove",this.#$),document.removeEventListener("pointerup",this.#u),document.removeEventListener("pointercancel",this.#u),clearTimeout(this.#H),clearTimeout(this.#A),clearTimeout(this.#v),clearTimeout(this.#_)}attributeChangedCallback(t,e,i){if(E(this,this.getAttribute("color")),!!this.#n){if(t==="value"){i&&i.toLowerCase()!==this.#D.toLowerCase()&&(this.#F(i),this.#E());return}this.#Q(),t==="format"&&this.#E()}}get#o(){return this.hasAttribute("disabled")}get#st(){return this.hasAttribute("glow")}get#rt(){return this.hasAttribute("show-inputs")}get#b(){const t=this.getAttribute("format");return m.includes(t)?t:"hex"}get value(){return this.#k()}set value(t){t!=null&&this.setAttribute("value",String(t))}get swatches(){return this.#z.slice()}set swatches(t){this.#z=Array.isArray(t)?t.slice():k.slice(),this.#n&&(this.#W(),this.#E())}get presets(){return this.swatches}set presets(t){this.swatches=t}#I(){return w(this.#m,this.#c,this.#p)}#V(){const[t,e,i]=this.#I();return g(t,e,i)}#k(){if(this.#r>=1)return this.#V();const t=Math.round(this.#r*255).toString(16).padStart(2,"0");return`${this.#V()}${t}`}#S(){const[t,e,i]=this.#I();return`${Math.round(t)}, ${Math.round(e)}, ${Math.round(i)}`}#q(){const[t,e,i]=this.#I(),[s,r,n]=N(t,e,i);return[Math.round(s),Math.round(r*100),Math.round(n*100)]}#nt(){const[t,e,i]=w(this.#m,1,1);return g(t,e,i)}#B(){return`rgb(${this.#S()})`}#G(){return`rgba(${this.#S()}, ${this.#r})`}#K(){return Math.round(this.#r*100)}#at(){if(this.#b==="rgb")return this.#r<1?`${this.#S()}, ${this.#r.toFixed(2)}`:this.#S();const[t,e,i]=this.#q();return this.#r<1?`${t}, ${e}%, ${i}%, ${this.#K()}%`:`${t}, ${e}%, ${i}%`}#ot(){if(this.#b==="rgb")return this.#r<1?this.#G():this.#B();if(this.#b==="hsl"){const[t,e,i]=this.#q();return this.#r<1?`hsla(${t}, ${e}%, ${i}%, ${this.#r})`:`hsl(${t}, ${e}%, ${i}%)`}return this.#k()}#F(t){const e=_(t);if(!e)return;const[i,s,r]=x(e[0],e[1],e[2]);this.#m=i,this.#c=s,this.#p=r,this.#r=e[3]}#f(){const t=this.#k();this.#D=t,this.setAttribute("value",t),this.#E();for(const e of["input","change"])this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:{value:t}}))}#Q(){const t=(i,s)=>this.getAttribute(i)??s,e=["cp",`cp--${t("size","md")}`,`cp--r-${t("radius","rounded")}`,`cp--t-${t("tone","default")}`];this.#o&&e.push("is-disabled"),this.hasAttribute("block")&&e.push("cp--block"),this.#rt||e.push("cp--no-inputs"),this.#n.className=e.join(" "),this.#n.setAttribute("aria-disabled",String(this.#o)),this.#e.setAttribute("aria-disabled",String(this.#o));for(const i of[this.#i,this.#t,this.#a,this.#l,this.#s])i.disabled=this.#o}#E(){this.#n.style.setProperty("--hue",this.#nt()),this.#n.style.setProperty("--cur",this.#B()),this.#h.style.left=`${this.#c*100}%`,this.#h.style.top=`${(1-this.#p)*100}%`,this.#e.setAttribute("aria-valuetext",`S ${Math.round(this.#c*100)}% B ${Math.round(this.#p*100)}%`),this.#i.value=String(Math.round(this.#m)),this.#t.value=String(this.#K()),this.#t.style.setProperty("--track",`linear-gradient(to right, transparent, ${this.#B()})`),this.#a.__fill.style.background=this.#G(),this.#R.textContent=this.#b.toUpperCase(),this.#l.setAttribute("aria-label",`Format: ${this.#b.toUpperCase()}, change`);const t=this.#b==="hex";this.#w.style.display=t?"":"none",this.#y.style.display=t?"none":"",t?document.activeElement!==this&&this.shadowRoot.activeElement!==this.#s&&(this.#s.value=this.#k().replace(/^#/,"")):this.#N.textContent=this.#at();const e=this.#V().toLowerCase();for(const i of this.#d.children)i.classList.toggle("is-active",i.__color?.toLowerCase()===e)}#W(){this.#d.replaceChildren();for(const t of this.#z){const e=document.createElement("button");e.className="cp__swatch",e.type="button",e.style.setProperty("--sw",t),e.setAttribute("aria-label",t),e.__color=t;const i=document.createElement("span");i.className="fx-ripples cp__swatch-ripples",i.setAttribute("aria-hidden","true"),e.append(i),e.addEventListener("pointerdown",s=>this.#ft(s,e,i)),e.addEventListener("click",()=>this.#vt(t)),this.#d.append(e)}}#j(t,e,i,s,r=6){if(S())return;const n=document.createElement("span");for(n.className="fx-ripple",n.style.cssText=`left:${e}px;top:${i}px;width:${s}px;height:${s}px`,n.addEventListener("animationend",()=>n.remove()),t.appendChild(n);t.childElementCount>r;)t.firstElementChild.remove()}#J(t){const e=this.#e;if(!e||!this.isConnected)return;const i=e.getBoundingClientRect();!i.width||!i.height||(this.#c=d((t.clientX-i.left)/i.width),this.#p=d(1-(t.clientY-i.top)/i.height),this.#f())}#ct(t){if(this.#o)return;this.#C=!0,this.#g=!0,this.#X=t.clientX,this.#O=t.clientY,clearTimeout(this.#A),this.#A=setTimeout(()=>{this.#g=!1,this.#T()},440);const e=this.#e.getBoundingClientRect(),i=t.clientX-e.left,s=t.clientY-e.top;this.#j(this.#x,i,s,Math.hypot(Math.max(i,e.width-i),Math.max(s,e.height-s))*2);try{this.#e.setPointerCapture(t.pointerId)}catch{}document.addEventListener("pointermove",this.#$),document.addEventListener("pointerup",this.#u),document.addEventListener("pointercancel",this.#u),this.#T(),this.#J(t)}#pt(t){this.#o||!this.#C||(this.#g&&Math.hypot(t.clientX-this.#X,t.clientY-this.#O)>5&&(this.#g=!1,clearTimeout(this.#A),this.#T()),this.#J(t))}#ht(t){this.#C=!1,document.removeEventListener("pointermove",this.#$),document.removeEventListener("pointerup",this.#u),document.removeEventListener("pointercancel",this.#u);try{this.#e.releasePointerCapture(t.pointerId)}catch{}this.#T()}#T(){this.#h.classList.toggle("is-drag",this.#C),this.#h.classList.toggle("is-jump",this.#g)}#lt(t){if(this.#o)return;const e=.02,i=(s,r)=>{this.#c=d(this.#c+s),this.#p=d(this.#p+r),this.#f()};t.key==="ArrowLeft"?(t.preventDefault(),i(-e,0)):t.key==="ArrowRight"?(t.preventDefault(),i(e,0)):t.key==="ArrowUp"?(t.preventDefault(),i(0,e)):t.key==="ArrowDown"&&(t.preventDefault(),i(0,-e))}#dt(){this.#o||(this.#m=Number(this.#i.value),this.#et("hue"),this.#f())}#ut(){this.#o||(this.#r=d(Number(this.#t.value)/100),this.#et("alpha"),this.#f())}#tt(t,e,i,s){if(this.#o)return;e.classList.add("is-active");const r=e.getBoundingClientRect();this.#j(i,t.clientX-r.left,r.height/2,r.height*4),clearTimeout(s==="hue"?this.#v:this.#_)}#et(t){const e=t==="hue"?this.#i:this.#t;e.classList.add("is-active");const i=s=>{t==="hue"?this.#v=s:this.#_=s};clearTimeout(t==="hue"?this.#v:this.#_),i(setTimeout(()=>e.classList.remove("is-active"),140))}#it(t){const e=t==="hue"?this.#i:this.#t;clearTimeout(t==="hue"?this.#v:this.#_),e.classList.remove("is-active")}#bt(){const t=_(this.#s.value);if(!t)return;const[e,i,s]=x(t[0],t[1],t[2]);this.#m=e,this.#c=i,this.#p=s,this.#r=t[3],this.#f()}#mt(){this.#s.value=this.#k().replace(/^#/,"")}#ft(t,e,i){if(this.#o)return;const s=e.getBoundingClientRect(),r=t.clientX-s.left,n=t.clientY-s.top;this.#j(i,r,n,Math.hypot(Math.max(r,s.width-r),Math.max(n,s.height-n))*2,8)}#vt(t){this.#o||(this.#F(t),this.#f())}#_t(){const t=m[(m.indexOf(this.#b)+1)%m.length];this.setAttribute("format",t)}#gt(t){try{const e=document.createElement("textarea");e.value=t,e.style.cssText="position:fixed;opacity:0;pointer-events:none;",document.body.appendChild(e),e.select();const i=document.execCommand("copy");return document.body.removeChild(e),i}catch{return!1}}async#xt(){const t=this.#ot();let e=!1;try{await navigator.clipboard.writeText(t),e=!0}catch{e=this.#gt(t)}!e||!this.isConnected||(this.#a.classList.add("is-copied"),this.#a.setAttribute("aria-label","Copied"),clearTimeout(this.#H),this.#H=setTimeout(()=>{this.#a.classList.remove("is-copied"),this.#a.setAttribute("aria-label","Copy color")},1100))}}customElements.define("vs-color-picker",H);
