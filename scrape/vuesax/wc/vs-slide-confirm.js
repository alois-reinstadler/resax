import{attachGlow as f,FX_CSS as g}from"./vs-fx.CLXiCjCI.js";const m=`
  :host {
    display: inline-block;
    width: min(100%, 360px);
    max-width: var(--sc-max-w, 420px);
    box-sizing: border-box;
  }
  :host([block]) { display: block; width: 100%; }
  :host([hidden]) { display: none; }

  .sc {
    --h: var(--sc-h, 64px);
    --pad: 6px;
    --r: 999px;
    --tint: var(--vs-color-rgb, 31 116 255);
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--h);
    padding: var(--pad);
    border: 1px solid var(--sc-border, rgb(var(--tint) / 0.12));
    border-radius: var(--r);
    background: var(--sc-track, color-mix(in srgb, rgb(var(--tint)) 5%, var(--bg-card, #101013)));
    box-sizing: border-box;
    overflow: hidden;
    touch-action: pan-y;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    font-family: inherit;
  }
  .sc--sm { --sc-h: 52px; --pad: 5px; }
  .sc--lg { --sc-h: 74px; --pad: 7px; }

  .sc--r-none    { --r: 0; }
  .sc--r-subtle  { --r: 10px; }
  .sc--r-rounded { --r: 18px; }
  .sc--r-pill    { --r: 999px; }
  .sc--r-squircle { --r: 26px; }
  @supports (corner-shape: squircle) {
    .sc--r-squircle { corner-shape: squircle; --r: 34px; }
  }

  /* The trail the knob leaves behind: it is the progress bar, so it is drawn
     from the same number that positions the knob. */
  .sc__fill {
    position: absolute;
    inset: 0;
    width: 100%;
    transform-origin: left center;
    transform: scaleX(var(--p, 0));
    background: var(--sc-fill,
      linear-gradient(90deg,
        rgb(var(--tint) / 0.06) 0%,
        rgb(var(--tint) / 0.18) 48%,
        rgb(var(--tint) / 0.5) 100%));
    pointer-events: none;
  }
  .sc--done .sc__fill {
    background: var(--sc-fill-done,
      linear-gradient(90deg, rgb(var(--tint) / 0.18), rgb(var(--tint) / 0.48)));
  }

  .sc__label {
    position: absolute;
    left: 0;
    right: 0;
    display: block;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--sc-label, var(--text-muted, #8b8b93));
    pointer-events: none;
    /* Fades out as the knob covers it: a label the knob is sitting on top of
       is noise, and at the end the confirm label takes the whole track. */
    opacity: calc(1 - var(--p, 0) * 1.35);
    transition: color var(--dur-fast, 160ms) var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
  }
  .sc__label--done {
    opacity: calc(var(--p, 0) * 1.2 - 0.2);
    color: var(--text, #f4f4f5);
    font-weight: 600;
  }
  .sc.is-dragging .sc__label { color: var(--text, #f4f4f5); }

  .sc__knob {
    position: relative;
    z-index: 2;
    display: grid;
    place-items: center;
    flex: none;
    width: calc(var(--h) - var(--pad) * 2);
    height: calc(var(--h) - var(--pad) * 2);
    padding: 0;
    border: 0;
    border-radius: calc(var(--r) - var(--pad));
    background: var(--sc-knob, var(--bg-card, #0f0f12));
    color: var(--text, #f4f4f5);
    box-shadow:
      -14px 0 26px -18px rgb(var(--tint) / 0.9),
      0 8px 22px -10px rgba(0, 0, 0, 0.7),
      inset 0 0 0 1px rgba(255, 255, 255, 0.055);
    cursor: grab;
    touch-action: none;
    transform: translateX(var(--x, 0px)) scaleX(var(--sx, 1)) scaleY(var(--sy, 1));
    font: inherit;
  }
  @supports (corner-shape: squircle) {
    .sc--r-squircle .sc__knob, .sc--r-pill .sc__knob { corner-shape: squircle; }
  }
  .sc__knob:active { cursor: grabbing; }
  .sc.is-dragging .sc__knob {
    box-shadow:
      -22px 0 34px -18px rgb(var(--tint) / 0.95),
      0 10px 28px -12px rgba(0, 0, 0, 0.78),
      inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
  .sc__knob:focus-visible {
    outline: 2px solid rgb(var(--tint) / 0.9);
    outline-offset: 2px;
  }
  .sc__knob svg { width: 22px; height: 22px; display: block; }
  .sc__knob .sc__tick { position: absolute; opacity: 0; transform: scale(0.7); }
  .sc--done .sc__knob .sc__tick { opacity: 1; transform: scale(1); }
  .sc--done .sc__knob .sc__arrow { opacity: 0; transform: scale(0.7); }
  .sc__arrow, .sc__tick {
    transition:
      opacity var(--dur-fast, 160ms) var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      transform var(--dur, 220ms) var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
  }

  /* Tones recolour the trail, the ring and the glow together. */
  .sc--t-success { --tint: 52 199 123; }
  .sc--t-danger  { --tint: 255 99 105; }
  .sc--t-warn    { --tint: 245 176 65; }

  .sc.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .sc__label, .sc__arrow, .sc__tick { transition: none; }
  }
`+g;let c;function v(o){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=o;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(o,t){const e=t?v(String(t).trim()):null;if(!e){for(const s of x)o.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),a=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(s=>Math.round(a?s*.92:s+(255-s)*.16)),n=(s,u)=>o.style.setProperty(s,u);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(s,l);n("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(s,a?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])n(s,a?"0 0 0":"255 255 255");n("--vs-color",l),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",a?"#0b0b0b":"#ffffff")}const b="http://www.w3.org/2000/svg";function p(o,t){const e=document.createElementNS(b,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),e.setAttribute("class",o);for(const i of t){const r=document.createElementNS(b,"path");r.setAttribute("d",i),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.5"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.append(r)}return e}class _ extends HTMLElement{static observedAttributes=["label","confirm-label","size","radius","tone","color","threshold","stiffness","damping","block","glow","confirmed","disabled"];#e;#f;#t;#h;#l;#d;#x;#s=0;#i=0;#o=0;#n=0;#a=!1;#_=0;#r=0;#b=!0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#e=document.createElement("div"),this.#e.className="sc",this.#f=document.createElement("span"),this.#f.className="sc__fill",this.#d=document.createElement("span"),this.#d.className="fx-glow",this.#d.setAttribute("aria-hidden","true"),this.#h=document.createElement("span"),this.#h.className="sc__label",this.#l=document.createElement("span"),this.#l.className="sc__label sc__label--done",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="sc__knob",this.#t.setAttribute("role","slider"),this.#t.setAttribute("aria-valuemin","0"),this.#t.setAttribute("aria-valuemax","100"),this.#t.append(p("sc__arrow",["M14.4302 5.92969L20.5002 11.9997L14.4302 18.0697","M3.5 12H20.33"]),p("sc__tick",["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z","M7.75 11.9999L10.58 14.8299L16.25 9.16992"])),this.#e.append(this.#d,this.#f,this.#h,this.#l,this.#t),t.append(e,this.#e),this.#t.addEventListener("pointerdown",this.#E),this.#t.addEventListener("keydown",this.#C)}connectedCallback(){d(this,this.getAttribute("color")),this.#y(),this.#x=f(this.#e,180,()=>this.hasAttribute("disabled")||!this.hasAttribute("glow")),this.#g=new ResizeObserver(()=>this.#k()),this.#g.observe(this.#e),this.#k()}disconnectedCallback(){cancelAnimationFrame(this.#n),this.#n=0,this.#g?.disconnect(),this.#x?.(),removeEventListener("pointermove",this.#v),removeEventListener("pointerup",this.#c)}attributeChangedCallback(t,e,i){d(this,this.getAttribute("color")),this.#e&&(this.#y(),t==="confirmed"&&e!==i&&this.#u(this.hasAttribute("confirmed")?this.#r:0))}#g=null;get progress(){return this.#r>0?Math.min(1,Math.max(0,this.#s/this.#r)):0}get confirmed(){return this.hasAttribute("confirmed")}set confirmed(t){t?this.setAttribute("confirmed",""):this.removeAttribute("confirmed")}reset(){this.removeAttribute("confirmed"),this.#u(0),this.dispatchEvent(new CustomEvent("reset",{bubbles:!0,composed:!0}))}#m(t,e){const i=parseFloat(this.getAttribute(t));return Number.isFinite(i)?i:e}#y(){const t=(i,r)=>this.getAttribute(i)??r,e=this.hasAttribute("disabled");this.#e.className=["sc",`sc--${t("size","md")}`,`sc--r-${t("radius","pill")}`,`sc--t-${t("tone","default")}`,this.hasAttribute("confirmed")?"sc--done":"",this.#a?"is-dragging":"",e?"is-disabled":""].filter(Boolean).join(" "),this.#h.textContent=t("label","Slide to confirm"),this.#l.textContent=t("confirm-label","Confirmed"),this.#t.disabled=e,this.#t.setAttribute("aria-label",t("label","Slide to confirm")),this.#t.setAttribute("aria-valuenow",String(Math.round(this.progress*100)))}#k(){const t=parseFloat(getComputedStyle(this.#e).paddingLeft)||6,e=this.#e.getBoundingClientRect().width,i=this.#t.getBoundingClientRect().width;this.#r=Math.max(0,e-i-t*2),this.hasAttribute("confirmed")&&(this.#s=this.#r,this.#o=this.#r),this.#p()}#p(){const t=this.progress,e=Math.max(-.07,Math.min(.07,this.#i*16e-5));this.#e.style.setProperty("--p",t.toFixed(4)),this.#t.style.setProperty("--x",`${this.#s.toFixed(2)}px`),this.#t.style.setProperty("--sx",(1+e).toFixed(3)),this.#t.style.setProperty("--sy",(1-e*.6).toFixed(3)),this.#t.setAttribute("aria-valuenow",String(Math.round(t*100)))}#u(t){this.#o=t,this.#b&&(this.#b=!1,this.#n=requestAnimationFrame(this.#w))}#w=()=>{const t=this.#m("stiffness",260),e=this.#m("damping",17);for(let i=0;i<3;i++){const r=.005555555555555556,a=-t*(this.#s-this.#o)-e*this.#i;this.#i+=a*r,this.#s+=this.#i*r}if(this.#p(),Math.abs(this.#s-this.#o)<.15&&Math.abs(this.#i)<.6){this.#s=this.#o,this.#i=0,this.#p(),this.#b=!0,this.#n=0;return}this.#n=requestAnimationFrame(this.#w)};#E=t=>{if(!this.hasAttribute("disabled")&&!this.hasAttribute("confirmed")){this.#a=!0,this.#e.classList.add("is-dragging"),this.#_=t.clientX-this.#s,cancelAnimationFrame(this.#n),this.#n=0,this.#b=!0,this.#i=0;try{this.#t.setPointerCapture?.(t.pointerId)}catch{}addEventListener("pointermove",this.#v,{passive:!1}),addEventListener("pointerup",this.#c),addEventListener("pointercancel",this.#c)}};#v=t=>{if(!this.#a)return;t.preventDefault();const e=this.#s;this.#s=Math.max(0,Math.min(this.#r,t.clientX-this.#_)),this.#i=(this.#s-e)*60,this.#p(),this.dispatchEvent(new CustomEvent("input",{bubbles:!0,composed:!0,detail:{progress:this.progress}}))};#c=()=>{if(!this.#a)return;this.#a=!1,this.#e.classList.remove("is-dragging"),removeEventListener("pointermove",this.#v),removeEventListener("pointerup",this.#c),removeEventListener("pointercancel",this.#c);const t=this.progress;t>=this.#m("threshold",.9)?this.#A():(this.#u(0),t>.02&&this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0,detail:{progress:t}})))};#C=t=>{this.hasAttribute("disabled")||(t.key==="ArrowRight"||t.key==="End"||t.key==="Enter"||t.key===" "?(t.preventDefault(),this.hasAttribute("confirmed")||this.#A()):(t.key==="ArrowLeft"||t.key==="Home"||t.key==="Escape")&&(t.preventDefault(),this.hasAttribute("confirmed")&&this.reset()))};#A(){this.setAttribute("confirmed",""),this.#u(this.#r),this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{progress:1}}))}}customElements.define("vs-slide-confirm",_);export{_ as default};
