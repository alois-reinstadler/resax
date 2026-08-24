const p=`
  :host { display: inline-flex; }
  .el {
    --dot: 10px; --gap: 16px; --pad-x: 22px; --pad-y: 14px;
    --accent: var(--ctrl-accent, var(--ui-accent, #ededed));
    --off: var(--ctrl-dot-off, rgb(var(--ui-ring, 255 255 255) / 0.32));
    display: inline-flex; font-family: inherit; user-select: none; -webkit-user-select: none;
  }
  .el--sm { --dot: 8px; --gap: 12px; --pad-x: 18px; --pad-y: 12px; }
  .el--lg { --dot: 12px; --gap: 20px; --pad-x: 28px; --pad-y: 18px; }
  .el--t-danger { --accent: var(--ctrl-danger, #ff6369); }
  .el--t-warn { --accent: var(--ctrl-warn, #ffb224); }
  .el--t-success { --accent: var(--ctrl-success, #4cc38a); }
  .el.is-disabled { opacity: 0.5; }
  .el.is-disabled .el__dot { cursor: not-allowed; }

  .el__track {
    position: relative; display: inline-flex; align-items: center; gap: var(--gap);
    padding: var(--pad-y) var(--pad-x);
    border: 1px solid var(--ctrl-border, var(--border, #2a2a2a));
    border-radius: 999px;
    background: var(--ctrl-bg, var(--bg-elevated, rgba(20, 20, 20, 0.9)));
    isolation: isolate;
  }
  .el--vertical .el__track { flex-direction: column; padding: var(--pad-x) var(--pad-y); }
  .el--has-labels.el--horizontal .el__track { align-items: flex-end; }
  .el--no-track .el__track { padding: 0; border-color: transparent; background: transparent; }

  /* persistent sliding indicator — a 0×0 anchor that translates to the active
     dot's center; its accent core is centered on the anchor via negative margin */
  .el__indicator {
    position: absolute; left: 0; top: 0; width: 0; height: 0; z-index: 1;
    transition: transform 560ms cubic-bezier(0.16, 1.5, 0.3, 1);
    pointer-events: none;
  }
  .el__ind-core {
    position: absolute; left: 0; top: 0;
    width: calc(var(--dot) * 1.9); height: calc(var(--dot) * 1.9);
    margin: calc(var(--dot) * -0.95) 0 0 calc(var(--dot) * -0.95);
    border-radius: 999px; background: var(--accent);
    box-shadow: 0 0 12px 0 color-mix(in srgb, var(--accent) 50%, transparent);
    animation: el-spring 560ms cubic-bezier(0.16, 1.5, 0.3, 1);
  }
  /* elastic entrance: overshoots past target scale, then settles (spring) */
  @keyframes el-spring {
    0% { transform: scale(0.3); opacity: 0.4; }
    100% { transform: scale(1); opacity: 1; }
  }

  .el__dot {
    position: relative; z-index: 2; display: inline-flex; flex-direction: column;
    align-items: center; gap: 8px; padding: 8px; margin: -8px; border: 0;
    background: none; cursor: pointer; -webkit-tap-highlight-color: transparent;
    font: inherit; color: var(--ctrl-text-muted, var(--text-muted, #8a8a8a));
  }
  .el--vertical .el__dot { flex-direction: row; }
  .el__dot:disabled { cursor: default; }
  .el__dot:focus-visible { outline: none; }
  .el__dot:focus-visible .el__core { box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 40%, transparent); }

  /* dot core: gray by default; elastic nudge for neighbors; hidden under the
     indicator when active (the indicator provides the accent swell) */
  .el__core {
    width: var(--dot); height: var(--dot); border-radius: 999px; background: var(--off);
    transform: scale(1);
    transition: transform 560ms cubic-bezier(0.16, 1.5, 0.3, 1), background-color 260ms ease, opacity 200ms ease;
  }
  .el__dot:hover:not(:disabled) .el__core { background: color-mix(in srgb, var(--off) 55%, var(--accent) 45%); }
  .el__dot.is-done .el__core { background: color-mix(in srgb, var(--off) 40%, var(--accent) 60%); }
  .el__dot.is-near .el__core { transform: scale(1.25); }
  .el__dot.is-active .el__core { opacity: 0; }

  .el__label { font-size: 0.78em; white-space: nowrap; transition: color 200ms ease; }
  .el__dot.is-active .el__label { color: var(--ctrl-text, var(--text, #ededed)); }

  @media (prefers-reduced-motion: reduce) {
    .el__indicator { transition: none; }
    .el__ind-core { animation: none; }
    .el__core { transition: background-color 260ms ease, opacity 200ms ease; }
    .el__dot.is-near .el__core { transform: scale(1); }
  }
`;let d;function b(c){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=c;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(c,t){const e=t?b(String(t).trim()):null;if(!e){for(const s of f)c.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),a=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(s=>Math.round(a?s*.92:s+(255-s)*.16)),n=(s,u)=>c.style.setProperty(s,u);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(s,l);n("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(s,a?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])n(s,a?"0 0 0":"255 255 255");n("--vs-color",l),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["count","steps","current","value","size","tone","orientation","labels","track","clickable","disabled","bounce","color"];#e;#i;#r;#s;#a=[];#t=0;#u="";#o;#d=!1;#h;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=p,this.#e=document.createElement("div"),this.#e.className="el",this.#e.setAttribute("role","tablist"),this.#i=document.createElement("div"),this.#i.className="el__track",this.#r=document.createElement("span"),this.#r.className="el__indicator",this.#r.setAttribute("aria-hidden","true"),this.#s=document.createElement("span"),this.#s.className="el__ind-core",this.#r.appendChild(this.#s),this.#i.appendChild(this.#r),this.#e.appendChild(this.#i),t.append(e,this.#e),this.#h=r=>this.#x(r)}connectedCallback(){h(this,this.getAttribute("color")),this.#e.addEventListener("keydown",this.#h),this.#b(),this.#o=new ResizeObserver(()=>this.#c(!1)),this.#o.observe(this.#i),requestAnimationFrame(()=>this.#c(!1))}disconnectedCallback(){this.#e.removeEventListener("keydown",this.#h),this.#o?.disconnect(),this.#o=null}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#i&&!this.#d&&this.#b()}get value(){return this.#t}set value(t){this.setAttribute("value",String(t))}get current(){return this.#t}set current(t){this.setAttribute("current",String(t))}#m(){const t=this.getAttribute("steps")??this.getAttribute("count");if(t==null||t==="")return[{},{},{},{}];const e=Number(t);if(Number.isFinite(e))return Array.from({length:Math.max(1,e|0)},()=>({}));try{const i=JSON.parse(t);if(Array.isArray(i)&&i.length)return i.map(a=>typeof a=="string"?{label:a}:a);if(typeof i=="number")return Array.from({length:Math.max(1,i|0)},()=>({}))}catch{}const r=t.split(",").map(i=>i.trim()).filter(Boolean);return r.length?r.map(i=>({label:i})):[{}]}get#l(){return this.getAttribute("orientation")==="vertical"}#p(t){return Math.min(Math.max(t|0,0),Math.max(0,this.#a.length-1))}#b(){const t=(n,s)=>this.getAttribute(n)??s,e=this.hasAttribute("labels"),r=t("clickable","true")!=="false",i=this.hasAttribute("disabled");this.#e.className=`el el--${t("size","md")} el--t-${t("tone","default")} `+(this.#l?"el--vertical":"el--horizontal")+(e?" el--has-labels":"")+(i?" is-disabled":"")+(t("track","true")==="false"?" el--no-track":""),this.#e.setAttribute("aria-orientation",this.#l?"vertical":"horizontal"),i?this.#e.setAttribute("aria-disabled","true"):this.#e.removeAttribute("aria-disabled");const a=this.#m(),l=JSON.stringify([a.map(n=>n.label??""),e]);l!==this.#u&&(this.#u=l,this.#v(a,e));const o=this.#p(Number(t("value",t("current",this.#t)))||0);this.#t=o,this.#g(o),this.#f(r,i),this.#c(!1)}#v(t,e){for(const r of this.#a)r.remove();this.#a=t.map((r,i)=>{const a=document.createElement("button");a.type="button",a.className="el__dot",a.setAttribute("role","tab"),a.setAttribute("aria-label",r.label||`Step ${i+1}`);const l=document.createElement("span");if(l.className="el__core",a.appendChild(l),e){const o=document.createElement("span");o.className="el__label",o.textContent=r.label||`Step ${i+1}`,a.appendChild(o)}return a.addEventListener("click",()=>this.#_(i)),this.#i.appendChild(a),a})}#f(t,e){this.#a.forEach((r,i)=>{r.classList.toggle("is-active",i===this.#t),r.classList.toggle("is-done",i<this.#t),r.classList.toggle("is-near",Math.abs(i-this.#t)===1),r.setAttribute("aria-selected",String(i===this.#t)),r.tabIndex=i===this.#t?0:-1,r.disabled=e||!t&&i!==this.#t})}#c(t=!0){const e=this.#a[this.#t];if(!e)return;const r=e.offsetLeft+e.offsetWidth/2,i=e.offsetTop+e.offsetHeight/2;this.#r.style.transform=`translate(${r}px, ${i}px)`,t&&(this.#s.style.animation="none",this.#s.offsetWidth,this.#s.style.animation="")}#n(t,e=!0){t=this.#p(t),t!==this.#t&&(this.#t=t,this.#g(t),this.#f(this.hasAttribute("clickable"),this.hasAttribute("disabled")),this.#c(!0),e&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{index:t}})))}#g(t){this.#d=!0,this.getAttribute("value")!==String(t)&&this.setAttribute("value",String(t)),this.hasAttribute("current")&&this.getAttribute("current")!==String(t)&&this.setAttribute("current",String(t)),this.#d=!1}#_(t){this.hasAttribute("disabled")||!this.hasAttribute("clickable")||t===this.#t||this.#n(t)}#x(t){if(this.hasAttribute("disabled"))return;const e=this.#l?"ArrowUp":"ArrowLeft",r=this.#l?"ArrowDown":"ArrowRight";t.key===r?(t.preventDefault(),this.#n(this.#t+1)):t.key===e?(t.preventDefault(),this.#n(this.#t-1)):t.key==="Home"?(t.preventDefault(),this.#n(0)):t.key==="End"&&(t.preventDefault(),this.#n(this.#a.length-1))}}customElements.define("vs-dot-stepper-elastic",g);
