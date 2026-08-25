function f(o,t,e){return Math.min(e,Math.max(t,o))}function u(o){let t=String(o).trim().replace(/^#/,"");return t.length===3&&(t=t.split("").map(e=>e+e).join("")),/^[0-9a-fA-F]{6}$/.test(t)?[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]:null}function b(o,t,e){o/=255,t/=255,e/=255;const r=Math.max(o,t,e),s=Math.min(o,t,e),n=r-s;let i=0;const l=(r+s)/2,c=n?n/(1-Math.abs(2*l-1)):0;return n&&(r===o?i=(t-e)/n%6:r===t?i=(e-o)/n+2:i=(o-t)/n+4,i=(i*60+360)%360),[i,c,l]}function p(o,t,e){const r=(1-Math.abs(2*e-1))*t,s=r*(1-Math.abs(o/60%2-1)),n=e-r/2;let i=0,l=0,c=0;o<60?[i,l,c]=[r,s,0]:o<120?[i,l,c]=[s,r,0]:o<180?[i,l,c]=[0,r,s]:o<240?[i,l,c]=[0,s,r]:o<300?[i,l,c]=[s,0,r]:[i,l,c]=[r,0,s];const a=d=>Math.round((d+n)*255).toString(16).padStart(2,"0");return`#${a(i)}${a(l)}${a(c)}`}const g=.5,v=`
  :host { display: inline-block; }
  :host([block]) { display: block; }
  .rg {
    --r: var(--ctrl-r-md, 12px);
    --w: 220px;
    --accent: var(--inp-accent, #ededed);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    width: var(--w);
    padding: 18px;
    border: 1px solid var(--inp-border, var(--border, #2a2a2a));
    border-radius: var(--rr, var(--r));
    background: var(--bg-card, #111);
    color: var(--inp-text, #ededed);
    font: inherit;
    transition: border-color 200ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .rg--block { width: 100%; }
  .rg:hover:not(.is-disabled) { border-color: var(--inp-border-hover, #3d3d3d); }

  .rg--sm { --r: var(--ctrl-r-sm, 8px); --w: 196px; font-size: var(--ctrl-fs-sm, 13px); }
  .rg--lg { --r: var(--ctrl-r-lg, 16px); --w: 252px; font-size: var(--ctrl-fs-lg, 15px); }

  .rg--r-none { --rr: 0px; }
  .rg--r-subtle { --rr: 10px; }
  .rg--r-rounded { --rr: 18px; }
  .rg--r-pill { --rr: 24px; }
  @supports (corner-shape: squircle) {
    .rg--r-squircle { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
  }

  .rg__ring {
    position: relative;
    align-self: center;
    width: 100%;
    max-width: 168px;
    aspect-ratio: 1;
    border-radius: 50%;
    cursor: pointer;
    touch-action: none;
    outline: none;
    background: conic-gradient(
      from 0deg,
      #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00
    );
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    -webkit-mask: radial-gradient(closest-side, transparent 58%, #000 59%);
    mask: radial-gradient(closest-side, transparent 58%, #000 59%);
  }
  .rg__ring:focus-visible { box-shadow: 0 0 0 3px var(--accent); }
  /* central preview disc: painted over the mask with a pseudo-wrapper */
  .rg__disc {
    position: absolute;
    inset: 24%;
    border-radius: 50%;
    background: var(--cur);
    border: 3px solid var(--bg-card, #111);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    /* show above the ring mask: the mask only applies to the conic background */
    -webkit-mask: none;
    mask: none;
  }
  .rg__thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid #fff;
    background: var(--tc, var(--cur));
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35), 0 1px 4px rgba(0, 0, 0, 0.4);
    transform: translate(-50%, -50%) scale(var(--sc, 1));
    pointer-events: none;
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .rg__thumb.is-drag { --sc: 1.35; }

  .rg__row { display: flex; flex-direction: column; gap: 6px; }
  .rg__label {
    font-size: 12px; font-weight: 600;
    color: var(--text-secondary, #a1a1a1); letter-spacing: -0.01em;
  }
  .rg__bar {
    -webkit-appearance: none; appearance: none;
    width: 100%; height: 14px; border-radius: 999px;
    cursor: pointer; outline: none;
    background: var(--track, #444);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
  }
  .rg__bar:focus-visible { box-shadow: 0 0 0 2px var(--accent); }
  .rg__bar::-webkit-slider-thumb {
    -webkit-appearance: none; width: 12px; height: 22px; border-radius: 6px;
    background: var(--cur); border: 3px solid #fff; cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .rg__bar::-moz-range-thumb {
    width: 12px; height: 22px; border-radius: 6px;
    background: var(--cur); border: 3px solid #fff; cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .rg__bar.is-active::-webkit-slider-thumb { transform: scale(1.35); }
  .rg__bar.is-active::-moz-range-thumb { transform: scale(1.35); }

  .rg__field {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    height: var(--ctrl-h-md, 38px);
    padding: 0 10px;
    border: 1px solid var(--inp-border, var(--border, #2a2a2a));
    border-radius: 9px;
    background: var(--bg-input, var(--bg-elevated, #1a1a1a));
    transition: border-color 160ms ease;
  }
  .rg__field:focus-within { border-color: var(--accent); }
  .rg__hash { color: var(--inp-placeholder, #8b8b8b); }
  .rg__hex {
    flex: 1; min-width: 0; border: none; background: transparent;
    color: var(--inp-text, #ededed); font: inherit; font-size: 13px;
    font-variant-numeric: tabular-nums; text-transform: lowercase; outline: none;
  }

  .rg--t-danger  { --accent: #ff6369; }
  .rg--t-warn    { --accent: #ffb224; }
  .rg--t-success { --accent: #4cc38a; }

  .rg.is-disabled { opacity: 0.5; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .rg, .rg__field { transition: none; }
    .rg__thumb { transition: none; }
    .rg__thumb.is-drag { --sc: 1; }
    .rg__bar::-webkit-slider-thumb, .rg__bar::-moz-range-thumb { transition: none; }
    .rg__bar.is-active::-webkit-slider-thumb,
    .rg__bar.is-active::-moz-range-thumb { transform: none; }
  }
`;let h;function x(o){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=o;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(o,t){const e=t?x(String(t).trim()):null;if(!e){for(const a of _)o.style.removeProperty(a);return}const r=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),n=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,i=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(a=>Math.round(n?a*.92:a+(255-a)*.16)),c=(a,d)=>o.style.setProperty(a,d);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(a,i);c("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(a,e.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(a,n?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])c(a,n?"0 0 0":"255 255 255");c("--vs-color",i),c("--vs-color-rgb",e.join(" ")),c("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["value","disabled","size","radius","tone","glow","block","show-inputs","color"];#s;#t;#c;#n;#e;#l;#r;#i=255;#u=.6;#h=.58;#m="";#d=!1;#p=0;#b;#a;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=v,this.#s=document.createElement("div"),this.#s.className="rg",this.#s.setAttribute("role","group"),this.#s.setAttribute("aria-label","Color picker"),this.#t=document.createElement("div"),this.#t.className="rg__ring",this.#t.setAttribute("role","slider"),this.#t.tabIndex=0,this.#t.setAttribute("aria-label","Hue"),this.#t.setAttribute("aria-valuemin","0"),this.#t.setAttribute("aria-valuemax","360"),this.#c=document.createElement("span"),this.#c.className="rg__disc",this.#c.setAttribute("aria-hidden","true"),this.#n=document.createElement("span"),this.#n.className="rg__thumb",this.#n.setAttribute("aria-hidden","true"),this.#t.append(this.#c,this.#n);const r=document.createElement("div");r.className="rg__row";const s=document.createElement("span");s.className="rg__label",s.textContent="Lightness",this.#e=document.createElement("input"),this.#e.className="rg__bar",this.#e.type="range",this.#e.min="0",this.#e.max="100",this.#e.step="1",this.#e.setAttribute("aria-label","Lightness"),r.append(s,this.#e),this.#l=document.createElement("div"),this.#l.className="rg__field";const n=document.createElement("span");n.className="rg__hash",n.setAttribute("aria-hidden","true"),n.textContent="#",this.#r=document.createElement("input"),this.#r.className="rg__hex",this.#r.type="text",this.#r.maxLength=6,this.#r.spellcheck=!1,this.#r.setAttribute("aria-label","Hex value"),this.#l.append(n,this.#r),this.#s.append(this.#t,r,this.#l),t.append(e,this.#s),this.#t.addEventListener("pointerdown",i=>this.#_(i)),this.#t.addEventListener("keydown",i=>this.#k(i)),this.#e.addEventListener("input",()=>this.#A()),this.#r.addEventListener("input",()=>this.#E()),this.#r.addEventListener("blur",()=>this.#L()),this.#b=i=>this.#w(i),this.#a=i=>this.#y(i)}connectedCallback(){m(this,this.getAttribute("color")),this.hasAttribute("value")&&this.#v(this.getAttribute("value")),this.#f(),this.#g()}disconnectedCallback(){document.removeEventListener("pointermove",this.#b),document.removeEventListener("pointerup",this.#a),document.removeEventListener("pointercancel",this.#a),clearTimeout(this.#p),this.#d=!1}attributeChangedCallback(t,e,r){if(m(this,this.getAttribute("color")),!!this.#s){if(t==="value"){r&&r.toLowerCase()!==this.#m.toLowerCase()&&(this.#v(r),this.#g());return}this.#f()}}get value(){return p(this.#i,this.#u,this.#h)}set value(t){this.setAttribute("value",t)}get disabled(){return this.hasAttribute("disabled")}set disabled(t){t?this.setAttribute("disabled",""):this.removeAttribute("disabled")}#f(){const t=(s,n)=>this.getAttribute(s)??n,e=this.hasAttribute("disabled"),r=t("show-inputs","true")!=="false";this.#s.className=`rg rg--${t("size","md")} rg--r-${t("radius","rounded")} rg--t-${t("tone","default")}`+(this.hasAttribute("block")?" rg--block":"")+(t("glow","true")!=="false"?" rg--glow":"")+(e?" is-disabled":""),this.#t.setAttribute("aria-disabled",String(e)),this.#e.disabled=e,this.#r.disabled=e,this.#l.style.display=r?"":"none"}#v(t){const e=u(t);if(!e)return;const[r,s,n]=b(e[0],e[1],e[2]);this.#i=r,this.#u=s,this.#h=n}#g(){const t=this.value,e=(this.#i-90)*Math.PI/180,r=50+Math.cos(e)*(g*100),s=50+Math.sin(e)*(g*100);this.#n.style.left=`${r}%`,this.#n.style.top=`${s}%`,this.#n.style.setProperty("--tc",`hsl(${Math.round(this.#i)} 90% 55%)`),this.#c.style.background=t,this.#s.style.setProperty("--cur",t),this.#t.setAttribute("aria-valuenow",String(Math.round(this.#i))),this.#e.style.setProperty("--track",`linear-gradient(to right, #000, ${p(this.#i,this.#u,.5)}, #fff)`),document.activeElement!==this.#e&&(this.#e.value=String(Math.round(this.#h*100))),document.activeElement!==this.#r&&(this.#r.value=t.replace(/^#/,""))}#o(t){const e=this.value;this.#m=e,this.setAttribute("value",e),this.#g(),this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:e}}))}#x(t){const e=this.#t;if(!e)return;const r=e.getBoundingClientRect(),s=r.left+r.width/2,n=r.top+r.height/2;let i=Math.atan2(t.clientY-n,t.clientX-s)*180/Math.PI+90;i=(i+360)%360,this.#i=i}#_(t){if(!this.hasAttribute("disabled")){this.#d=!0,this.#n.classList.add("is-drag");try{this.#t.setPointerCapture(t.pointerId)}catch{}document.addEventListener("pointermove",this.#b),document.addEventListener("pointerup",this.#a),document.addEventListener("pointercancel",this.#a),this.#x(t),this.#o("input")}}#w(t){this.hasAttribute("disabled")||!this.#d||(this.#x(t),this.#o("input"))}#y(t){if(this.#d){this.#d=!1,this.#n.classList.remove("is-drag");try{this.#t.releasePointerCapture?.(t.pointerId)}catch{}document.removeEventListener("pointermove",this.#b),document.removeEventListener("pointerup",this.#a),document.removeEventListener("pointercancel",this.#a),this.#o("change")}}#k(t){if(this.hasAttribute("disabled"))return;const e=r=>{this.#i=(this.#i+r+360)%360,this.#o("change")};t.key==="ArrowLeft"||t.key==="ArrowDown"?(t.preventDefault(),e(-4)):(t.key==="ArrowRight"||t.key==="ArrowUp")&&(t.preventDefault(),e(4))}#A(){this.hasAttribute("disabled")||(this.#h=f(Number(this.#e.value)/100,0,1),this.#e.classList.add("is-active"),clearTimeout(this.#p),this.#p=setTimeout(()=>this.#e.classList.remove("is-active"),160),this.#o("input"))}#E(){const t=u(this.#r.value);if(!t)return;const[e,r,s]=b(t[0],t[1],t[2]);this.#i=e,this.#u=r,this.#h=s,this.#o("input")}#L(){this.#r.value=this.value.replace(/^#/,"")}}customElements.define("vs-color-picker-ring",w);
