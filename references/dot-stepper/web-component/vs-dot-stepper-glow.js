const f=`
  :host { display: inline-flex; }
  .gl {
    --dot: 10px;
    --gap: 16px;
    --pad-x: 22px;
    --pad-y: 14px;
    --accent: var(--ctrl-accent, var(--ui-accent, #ededed));
    --off: var(--ctrl-dot-off, rgb(var(--ui-ring, 255 255 255) / 0.32));
    display: inline-flex;
    font-family: inherit;
    user-select: none;
    -webkit-user-select: none;
  }
  .gl--sm { --dot: 8px; --gap: 12px; --pad-x: 18px; --pad-y: 12px; }
  .gl--lg { --dot: 12px; --gap: 20px; --pad-x: 28px; --pad-y: 18px; }

  .gl__track {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
    padding: var(--pad-y) var(--pad-x);
    border: 1px solid var(--ctrl-border, var(--border, #2a2a2a));
    border-radius: 999px;
    background: var(--ctrl-bg, var(--bg-elevated, rgba(20, 20, 20, 0.9)));
    isolation: isolate;
  }
  .gl--vertical .gl__track { flex-direction: column; padding: var(--pad-x) var(--pad-y); }
  .gl--has-labels.gl--horizontal .gl__track { align-items: flex-end; }
  .gl--no-track .gl__track { padding: 0; border-color: transparent; background: transparent; }

  .gl__dot {
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
    color: var(--ctrl-text-muted, var(--text-muted, #8a8a8a));
    z-index: 2;
  }
  .gl__dot:disabled { cursor: default; }
  .gl__dot:focus-visible { outline: none; }
  .gl__dot:focus-visible .gl__core { box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 40%, transparent); }

  .gl__core {
    position: relative;
    width: var(--dot);
    height: var(--dot);
    border-radius: 999px;
    background: var(--off);
    transition: background-color 260ms ease, box-shadow 260ms ease;
  }
  .gl__dot:hover:not(:disabled):not(.is-active) .gl__core { background: color-mix(in srgb, var(--off) 55%, var(--accent) 45%); }

  /* active: breathing neon. Keyframes only animate transform/opacity (compositable).
     The min shadow stays static on the core; the max one is baked into ::after (a
     glow layer, absolutely positioned out of flow) and pulses its opacity in sync. */
  .gl__dot.is-active .gl__core {
    background: var(--accent);
    box-shadow:
      0 0 calc(6px * var(--gl-int, 1)) color-mix(in srgb, var(--accent) 85%, transparent),
      0 0 calc(14px * var(--gl-int, 1)) color-mix(in srgb, var(--accent) 45%, transparent);
    animation: gl-pulse 1600ms ease-in-out infinite;
  }
  .gl__dot.is-active .gl__core::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow:
      0 0 calc(12px * var(--gl-int, 1)) color-mix(in srgb, var(--accent) 95%, transparent),
      0 0 calc(28px * var(--gl-int, 1)) color-mix(in srgb, var(--accent) 55%, transparent);
    opacity: 0;
    animation: gl-halo 1600ms ease-in-out infinite;
  }
  @keyframes gl-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.18); }
  }
  @keyframes gl-halo {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }

  .gl--vertical .gl__dot { flex-direction: row; }

  .gl__label {
    font-size: 0.78em;
    white-space: nowrap;
    transition: color 200ms ease;
  }
  .gl__dot.is-active .gl__label { color: var(--ctrl-text, var(--text, #ededed)); }

  .gl--t-danger { --accent: var(--ctrl-danger, #ff6369); }
  .gl--t-warn { --accent: var(--ctrl-warn, #ffb224); }
  .gl--t-success { --accent: var(--ctrl-success, #4cc38a); }

  .gl.is-disabled { opacity: 0.5; }
  .gl.is-disabled .gl__dot { cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .gl__dot.is-active .gl__core {
      animation: none;
      box-shadow: 0 0 calc(8px * var(--gl-int, 1)) color-mix(in srgb, var(--accent) 70%, transparent);
    }
    .gl__dot.is-active .gl__core::after { animation: none; opacity: 0; }
  }
`;function v(s){if(s==null||s==="")return[{},{},{},{}];const t=Number(s);if(Number.isFinite(t))return Array.from({length:Math.max(1,t|0)},()=>({}));const e=String(s).trim();try{const i=JSON.parse(e);if(Array.isArray(i)&&i.length)return i.map(a=>typeof a=="string"?{label:a}:a||{});if(typeof i=="number")return Array.from({length:Math.max(1,i|0)},()=>({}))}catch{const i=e.split(",").map(a=>a.trim()).filter(Boolean);if(i.length)return i.map(a=>({label:a}))}return[{},{},{},{}]}let p;function m(s){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=s;const t=p.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(s,t){const e=t?m(String(t).trim()):null;if(!e){for(const r of x)s.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),o=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,h=`rgb(${e[0]} ${e[1]} ${e[2]})`,d=e.map(r=>Math.round(o?r*.92:r+(255-r)*.16)),l=(r,n)=>s.style.setProperty(r,n);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(r,h);l("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(r,o?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])l(r,o?"0 0 0":"255 255 255");l("--vs-color",h),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["count","steps","value","current","size","tone","clickable","labels","track","orientation","intensity","disabled","color"];#c;#e;#i;#r=[];#a=[];#t=0;#o;constructor(){super(),this.#c=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=f,this.#e=document.createElement("div"),this.#e.className="gl",this.#e.setAttribute("role","tablist"),this.#i=document.createElement("div"),this.#i.className="gl__track",this.#e.append(this.#i),this.#c.append(t,this.#e),this.#o=e=>this.#p(e)}connectedCallback(){b(this,this.getAttribute("color")),this.#e.addEventListener("keydown",this.#o),this.#d(),this.#l()}disconnectedCallback(){this.#e.removeEventListener("keydown",this.#o);for(const t of this.#r)t.removeEventListener("click",t._onClick)}attributeChangedCallback(t,e,i){b(this,this.getAttribute("color")),this.isConnected&&e!==i&&((t==="count"||t==="steps")&&this.#d(),this.#l())}get value(){return this.#t}set value(t){this.setAttribute("value",String(t|0))}get current(){return this.#t}set current(t){this.setAttribute("value",String(t|0))}#s(t){return Math.min(Math.max(t|0,0),Math.max(0,this.#a.length-1))}#d(){for(const t of this.#r)t.removeEventListener("click",t._onClick);this.#i.textContent="",this.#r=[],this.#a=v(this.getAttribute("count")??this.getAttribute("steps")),this.#t=this.#s(this.#t),this.#a.forEach((t,e)=>{const i=document.createElement("button");i.type="button",i.className="gl__dot",i.setAttribute("role","tab");const a=document.createElement("span");a.className="gl__core",i.append(a);const o=()=>this.#g(e);i._onClick=o,i.addEventListener("click",o),this.#i.append(i),this.#r.push(i)})}#l(){const t=(n,c)=>this.getAttribute(n)??c,e=t("size","md"),i=t("tone","default"),a=t("orientation","horizontal")==="vertical",o=this.hasAttribute("labels"),h=t("track","true")!=="false",d=this.hasAttribute("disabled"),l=t("clickable","true")!=="false",r=this.getAttribute("value")??this.getAttribute("current");r!=null?this.#t=this.#s(Number(r)):this.#t=this.#s(this.#t),this.#e.className=`gl gl--${e} gl--t-${i} gl--${a?"vertical":"horizontal"}`+(d?" is-disabled":"")+(o?" gl--has-labels":"")+(h?"":" gl--no-track"),this.#e.style.setProperty("--gl-int",t("intensity","1")),this.#e.setAttribute("aria-orientation",a?"vertical":"horizontal"),d?this.#e.setAttribute("aria-disabled","true"):this.#e.removeAttribute("aria-disabled"),this.#r.forEach((n,c)=>{const u=(this.#a[c]||{}).label||`Step ${c+1}`;n.classList.toggle("is-active",c===this.#t),n.classList.toggle("is-done",c<this.#t),n.setAttribute("aria-selected",c===this.#t?"true":"false"),n.setAttribute("aria-label",u),n.tabIndex=c===this.#t?0:-1,n.disabled=d||!l&&c!==this.#t;let g=n.querySelector(".gl__label");o?(g||(g=document.createElement("span"),g.className="gl__label",n.append(g)),g.textContent=u):g&&g.remove()})}#n(t){const e=this.#s(t);e!==this.#t&&(this.#t=e,this.getAttribute("value")!==String(e)?this.setAttribute("value",String(e)):this.#l(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{index:e}})))}#g(t){const e=(this.getAttribute("clickable")??"true")!=="false";this.hasAttribute("disabled")||!e||t===this.#t||this.#n(t)}#p(t){if(this.hasAttribute("disabled"))return;const e=this.getAttribute("orientation")==="vertical",i=e?"ArrowUp":"ArrowLeft",a=e?"ArrowDown":"ArrowRight";t.key===a?(t.preventDefault(),this.#n(this.#t+1)):t.key===i?(t.preventDefault(),this.#n(this.#t-1)):t.key==="Home"?(t.preventDefault(),this.#n(0)):t.key==="End"&&(t.preventDefault(),this.#n(this.#a.length-1))}}customElements.define("vs-dot-stepper-glow",y);
