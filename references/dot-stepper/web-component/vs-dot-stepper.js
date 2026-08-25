import{FX_CSS as f,attachGlow as g}from"./vs-fx.CLXiCjCI.js";const u=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,m=`
${f}
  :host { display: inline-flex; }
  .ds {
    --dot: 10px;            /* base dot size */
    --focus-w: 48px;        /* pill length (expanded active dot) */
    --focus-h: 12px;        /* bar thickness */
    --gap: 14px;            /* spacing between dots (tight) */
    --pad-x: 22px;          /* track side padding */
    --pad-y: 14px;
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    --fx-tint: 255 255 255;
    display: inline-flex;
    font-family: inherit;
    user-select: none;
    -webkit-user-select: none;
  }
  .ds--sm { --dot: 8px; --focus-w: 38px; --focus-h: 10px; --gap: 11px; --pad-x: 18px; --pad-y: 12px; }
  .ds--lg { --dot: 12px; --focus-w: 60px; --focus-h: 15px; --gap: 18px; --pad-x: 28px; --pad-y: 18px; }

  /* track: pill container with proximity glow */
  .ds__track {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
    padding: var(--pad-y) var(--pad-x);
    border: 1px solid var(--border, rgba(255, 255, 255, 0.09));
    border-radius: 999px;
    background: var(--bg-elevated, #141414);
    isolation: isolate;
  }
  .ds--vertical .ds__track { flex-direction: column; padding: var(--pad-x) var(--pad-y); }
  .ds--has-labels.ds--horizontal .ds__track { align-items: flex-end; }

  /* no container → just the dots */
  .ds--no-track .ds__track { padding: 0; border-color: transparent; background: transparent; }
  .ds--no-track .ds__glow { display: none; }

  .ds__glow { --glow-strength: 0.45; --glow-ring: 1px; border-radius: 999px; }

  /* dot */
  .ds__dot {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 8px;
    margin: -8px;
    border: 0;
    background: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    font: inherit;
    color: var(--text-muted, #8a8a8a);
    --rip: var(--fx-tint, 255 255 255);
    z-index: 2;
  }
  .ds__dot:disabled { cursor: default; }
  .ds__dot:focus-visible { outline: none; }
  .ds__dot:focus-visible .ds__core { box-shadow: 0 0 0 3px rgb(var(--ring) / 0.35); }

  /* core = the dot; the active one EXPANDS into a pill (the progress bar). The width
     change lives in the flex flow → it pushes the neighbours (push effect). */
  .ds__core {
    position: relative;
    width: var(--dot);
    height: var(--dot);
    border-radius: 999px;
    overflow: hidden;
    background: var(--ds-dot-off, rgba(255, 255, 255, 0.4));
    transition:
      width 460ms cubic-bezier(0.34, 1.46, 0.44, 1),
      height 460ms cubic-bezier(0.34, 1.46, 0.44, 1),
      background-color 260ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      transform 440ms cubic-bezier(0.34, 1.7, 0.5, 1); /* release = bounce with overshoot */
  }
  /* click: the dot SINKS fast and BOUNCES back on release (spring above) */
  .ds__dot:active:not(:disabled) .ds__core {
    transform: scale(0.8);
    transition: transform 110ms ease;
  }
  /* proximity glow: the cursor "lights" each dot via --lit (0..1) set from JS.
     Tint layer over the dot background (not the border) → lights up as you approach. */
  .ds__core::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: rgb(var(--fx-tint, 255 255 255) / 0.75);
    opacity: calc(var(--lit, 0) * 0.9);
    pointer-events: none;
    transition: opacity 140ms ease;
  }
  /* the active dot does not light up (it is already the bar) */
  .ds__dot.is-active .ds__core::after { opacity: 0; }
  .ds__dot:hover:not(:disabled) .ds__core { background: var(--ds-dot-hover, rgba(255, 255, 255, 0.6)); }
  /* active → wide pill with a grey track; the bar grows inside it */
  .ds__dot.is-active .ds__core {
    width: var(--focus-w);
    height: var(--focus-h);
    background: var(--ds-bar-track, rgba(255, 255, 255, 0.16));
  }
  .ds--vertical .ds__dot.is-active .ds__core { width: var(--focus-h); height: var(--focus-w); }

  /* inner progress bar of the active dot */
  .ds__fill {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 100%;
    border-radius: 999px;
    background: var(--accent);
  }
  .ds.is-auto .ds__fill { transition: width 80ms linear; }
  .ds--vertical .ds__fill { transition: height 80ms linear; }

  .ds__label {
    font-size: 0.78em;
    color: var(--text-muted, #8a8a8a);
    white-space: nowrap;
    transition: color 200ms ease;
  }
  .ds__dot.is-active .ds__label { color: var(--text, #ededed); }
  .ds--vertical .ds__dot { flex-direction: row; }

  /* the ripple is not clipped to the dot area → the full wave shows, nice and strong */
  .ds__ripples { position: absolute; inset: 0; overflow: visible; pointer-events: none; z-index: 3; }
  .ds__ripples .fx-ripple { animation-duration: 820ms; }

  /* tones — recolor accent, ring and glow/ripple */
  .ds--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; }
  .ds--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36; }
  .ds--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; }

  .ds.is-disabled { opacity: 0.5; }
  .ds.is-disabled .ds__dot { cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .ds__core, .ds__fill { transition: none; }
  }
`,v=90;let p;function x(d){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=d;const t=p.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(d,t){const e=t?x(String(t).trim()):null;if(!e){for(const r of _)d.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(r=>Math.round(n?r*.92:r+(255-r)*.16)),a=(r,h)=>d.style.setProperty(r,h);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(r,l);a("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(r,n?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])a(r,n?"0 0 0":"255 255 255");a("--vs-color",l),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["count","steps","value","current","size","tone","orientation","autoplay","duration","loop","labels","track","clickable","disabled","glow","pause-on-hover","color"];#e;#a;#c;#t=[];#C=[];#f=!1;#i=0;#g;#s=0;#p=0;#r=0;#l=!1;#h=0;#m=null;#v=t=>this.#z(t);#x=()=>{this.hasAttribute("pause-on-hover")&&this.#R()};#_=()=>{this.hasAttribute("pause-on-hover")&&this.#P(),this.#I()};#y=t=>this.#F(t);constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#e=document.createElement("div"),this.#e.className="ds",this.#e.setAttribute("role","tablist"),this.#a=document.createElement("div"),this.#a.className="ds__track",this.#c=document.createElement("span"),this.#c.className="fx-glow ds__glow",this.#c.setAttribute("aria-hidden","true"),this.#a.appendChild(this.#c),this.#e.appendChild(this.#a),t.append(e,this.#e),this.#e.addEventListener("keydown",this.#v),this.#e.addEventListener("pointerenter",this.#x),this.#e.addEventListener("pointerleave",this.#_)}connectedCallback(){b(this,this.getAttribute("color")),this.#w(),this.#g=g(this.#a,200,()=>this.hasAttribute("disabled")||!this.hasAttribute("glow")),addEventListener("pointermove",this.#y,{passive:!0})}disconnectedCallback(){this.#d(),this.#g?.(),removeEventListener("pointermove",this.#y),this.#h&&cancelAnimationFrame(this.#h),this.#e.removeEventListener("keydown",this.#v),this.#e.removeEventListener("pointerenter",this.#x),this.#e.removeEventListener("pointerleave",this.#_)}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#e&&this.#w()}get value(){return this.#i}set value(t){this.setAttribute("value",String(t|0))}get current(){return this.#i}set current(t){this.setAttribute("current",String(t|0))}#n(t,e){if(!this.hasAttribute(t))return e;const i=this.getAttribute(t);return i!=="false"&&i!=="0"}#L(){const t=this.getAttribute("steps");if(t&&t.trim())try{const i=JSON.parse(t);if(Array.isArray(i)&&i.length)return i.map(s=>typeof s=="string"?{label:s}:s||{});if(typeof i=="number")return Array.from({length:Math.max(1,i)},()=>({}))}catch{const i=t.split(",").map(s=>s.trim()).filter(Boolean);if(i.length)return i.map(s=>({label:s}))}const e=Math.max(1,parseInt(this.getAttribute("count")||"4",10)||4);return Array.from({length:e},()=>({}))}#w(){const t=this.#L(),e=this.#n("labels",!1),i=this.getAttribute("size")||"md",s=this.getAttribute("tone")||"default",n=this.getAttribute("orientation")==="vertical";if(this.#e.className=["ds",`ds--${i}`,`ds--t-${s}`,n?"ds--vertical":"ds--horizontal",this.hasAttribute("disabled")?"is-disabled":"",this.#n("autoplay",!1)?"is-auto":"",e?"ds--has-labels has-labels":"",this.hasAttribute("track")?"":"ds--no-track"].filter(Boolean).join(" "),this.#e.setAttribute("aria-orientation",n?"vertical":"horizontal"),this.hasAttribute("disabled")?this.#e.setAttribute("aria-disabled","true"):this.#e.removeAttribute("aria-disabled"),t.length!==this.#t.length||e!==this.#f)this.#$(t,e),this.#f=e;else for(let a=0;a<t.length;a++){const r=t[a].label||`Step ${a+1}`;this.#t[a].btn.setAttribute("aria-label",r),this.#t[a].label&&(this.#t[a].label.textContent=r)}this.#C=t;const l=this.getAttribute("value")??this.getAttribute("current"),o=l==null?this.#i:parseInt(l,10)||0;this.#i=Math.min(Math.max(o,0),t.length-1),this.#A(),this.#n("autoplay",!1)?this.#M():(this.#d(),this.#r=0)}#$(t,e){for(const i of this.#t)i.btn.remove();this.#t=[];for(let i=0;i<t.length;i++){const s=document.createElement("button");s.type="button",s.className="ds__dot",s.setAttribute("role","tab");const n=document.createElement("span");n.className="ds__ripples",n.setAttribute("aria-hidden","true");const l=document.createElement("span");l.className="ds__core";const o=document.createElement("span");o.className="ds__fill",l.appendChild(o),s.append(n,l);let a=null;e&&(a=document.createElement("span"),a.className="ds__label",a.textContent=t[i].label||`Step ${i+1}`,s.appendChild(a)),s.setAttribute("aria-label",t[i].label||`Step ${i+1}`);const r=i;s.addEventListener("click",()=>this.#N(r)),s.addEventListener("pointerdown",h=>this.#D(h,r)),this.#a.appendChild(s),this.#t.push({btn:s,core:l,fill:o,ripples:n,label:a})}}#A(){const t=this.getAttribute("orientation")==="vertical",e=this.hasAttribute("disabled"),i=this.hasAttribute("clickable");for(let s=0;s<this.#t.length;s++){const{btn:n,fill:l}=this.#t[s],o=s===this.#i;n.classList.toggle("is-active",o),n.classList.toggle("is-done",s<this.#i),n.setAttribute("aria-selected",String(o)),n.tabIndex=o?0:-1,n.disabled=e||!i&&!o;let a=0;o&&(a=this.#n("autoplay",!1)?this.#r*100:100),this.#k(l,a,t)}}#k(t,e,i){i?(t.style.height=`${e}%`,t.style.width="100%"):(t.style.width=`${e}%`,t.style.height="100%")}#o(t,e=!0){const i=Math.min(Math.max(t,0),this.#t.length-1);i!==this.#i&&(this.#i=i,this.setAttribute("value",String(i)),this.setAttribute("current",String(i)),this.#A(),this.#n("autoplay",!1)&&this.#M(),e&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{index:i,value:i}})))}#N(t){this.hasAttribute("disabled")||!this.hasAttribute("clickable")||t===this.#i||this.#o(t)}#z(t){if(this.hasAttribute("disabled"))return;const e=this.getAttribute("orientation")==="vertical",i=e?"ArrowUp":"ArrowLeft",s=e?"ArrowDown":"ArrowRight";t.key===s?(t.preventDefault(),this.#o(this.#i+1)):t.key===i?(t.preventDefault(),this.#o(this.#i-1)):t.key==="Home"?(t.preventDefault(),this.#o(0)):t.key==="End"&&(t.preventDefault(),this.#o(this.#t.length-1))}#D(t,e){if(this.hasAttribute("disabled")||!this.hasAttribute("clickable")||e===this.#i||u())return;const{btn:i,ripples:s}=this.#t[e],n=i.getBoundingClientRect(),l=t.clientX-n.left,o=t.clientY-n.top,a=Math.max(l,n.width-l),r=Math.max(o,n.height-o),h=Math.max(Math.hypot(a,r)*2,60),c=document.createElement("span");for(c.className="fx-ripple",c.style.cssText=`left:${l}px;top:${o}px;width:${h}px;height:${h}px`,c.addEventListener("animationend",()=>c.remove()),s.appendChild(c);s.childElementCount>3;)s.firstElementChild.remove()}#F(t){this.#m=t,!this.#h&&(this.#h=requestAnimationFrame(()=>{this.#h=0;const e=this.#m;if(!(!e||this.hasAttribute("disabled")||!this.hasAttribute("glow")))for(const{core:i}of this.#t){const s=i.getBoundingClientRect(),n=Math.max(s.left,Math.min(e.clientX,s.right)),l=Math.max(s.top,Math.min(e.clientY,s.bottom)),o=Math.hypot(e.clientX-n,e.clientY-l);i.style.setProperty("--lit",Math.max(0,1-o/v).toFixed(3))}}))}#I(){for(const{core:t}of this.#t)t.style.setProperty("--lit","0")}#E(){return this.#n("autoplay",!1)&&!this.hasAttribute("disabled")&&this.#t.length>1&&!u()}#S(){return Math.max(parseInt(this.getAttribute("duration")||"3000",10)||3e3,300)}#u(){return typeof performance<"u"?performance.now():Date.now()}#b=()=>{const t=Math.min(Math.max(this.#u()-this.#p,0)/this.#S(),1);this.#r=t;const e=this.#t[this.#i];if(e&&this.#k(e.fill,t*100,this.getAttribute("orientation")==="vertical"),t>=1){this.#B();return}this.#s=requestAnimationFrame(this.#b)};#M(){if(this.#d(),!this.#E()){this.#r=0;return}this.#l=!1,this.#r=0,this.#p=this.#u(),this.#s=requestAnimationFrame(this.#b)}#d(){this.#s&&cancelAnimationFrame(this.#s),this.#s=0}#B(){let t=this.#i+1;if(t>=this.#t.length){if(!this.hasAttribute("loop")){this.#d(),this.#r=1;return}t=0}this.#o(t)}#R(){!this.#s||this.#l||(this.#d(),this.#l=!0)}#P(){!this.#l||!this.#E()||(this.#l=!1,this.#p=this.#u()-this.#r*this.#S(),this.#s=requestAnimationFrame(this.#b))}}customElements.define("vs-dot-stepper",y);
