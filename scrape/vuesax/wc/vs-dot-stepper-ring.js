const u=`
  :host { display: inline-flex; }
  .rg {
    --dot: 10px;
    --ring: 22px;         /* active dot ring diameter */
    --ring-w: 3px;        /* ring thickness */
    --gap: 18px;
    --pad-x: 22px;
    --pad-y: 16px;
    --accent: var(--ctrl-accent, var(--ui-accent, #ededed));
    --off: var(--ctrl-dot-off, rgb(var(--ui-ring, 255 255 255) / 0.32));
    display: inline-flex;
    font-family: inherit;
    user-select: none;
    -webkit-user-select: none;
  }
  .rg--sm { --dot: 8px; --ring: 18px; --ring-w: 2.5px; --gap: 14px; --pad-x: 18px; --pad-y: 13px; }
  .rg--lg { --dot: 12px; --ring: 28px; --ring-w: 3.5px; --gap: 22px; --pad-x: 28px; --pad-y: 20px; }

  .rg__track {
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
  .rg--vertical .rg__track { flex-direction: column; padding: var(--pad-x) var(--pad-y); }
  .rg--has-labels.rg--horizontal .rg__track { align-items: flex-end; }
  /* Trackless, the row has no padding to lend and the active dot's ring — which
     is (ring - dot)/2 wider than the dot on every side — hangs off the host and
     gets sliced by whatever clips next. Keep the pill's spacing, drop only its
     skin. */
  .rg--no-track .rg__track {
    padding: calc((var(--ring) - var(--dot)) / 2);
    border-color: transparent;
    background: transparent;
  }

  .rg__dot {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
  .rg__dot:disabled { cursor: default; }
  .rg__dot:focus-visible { outline: none; }
  .rg__dot:focus-visible .rg__core { box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 40%, transparent); }

  .rg__core {
    position: relative;
    width: var(--dot);
    height: var(--dot);
    border-radius: 999px;
    background: var(--off);
    transition: background-color 260ms ease;
    z-index: 1;
  }
  .rg__dot:hover:not(:disabled):not(.is-active) .rg__core { background: color-mix(in srgb, var(--off) 55%, var(--accent) 45%); }
  .rg__dot.is-active .rg__core { background: var(--accent); }

  /* orbital ring: conic-gradient spinning around the active dot */
  .rg__ring {
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--ring);
    height: var(--ring);
    border-radius: 999px;
    transform: translate(-50%, -50%) scale(0.4);
    opacity: 0;
    pointer-events: none;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      var(--accent) 90deg,
      transparent 200deg
    );
    -webkit-mask: radial-gradient(farthest-side, transparent calc(50% - var(--ring-w)), #000 calc(50% - var(--ring-w) + 0.5px));
    mask: radial-gradient(farthest-side, transparent calc(50% - var(--ring-w)), #000 calc(50% - var(--ring-w) + 0.5px));
    transition: opacity 300ms ease, transform 300ms cubic-bezier(0.34, 1.4, 0.5, 1);
  }
  .rg__dot.is-active .rg__ring {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    animation: rg-spin var(--rg-spin, 2400ms) linear infinite;
  }
  @keyframes rg-spin {
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  .rg--vertical .rg__dot { flex-direction: row; }

  .rg__label {
    font-size: 0.78em;
    white-space: nowrap;
    transition: color 200ms ease;
  }
  .rg__dot.is-active .rg__label { color: var(--ctrl-text, var(--text, #ededed)); }

  .rg--t-danger { --accent: var(--ctrl-danger, #ff6369); }
  .rg--t-warn { --accent: var(--ctrl-warn, #ffb224); }
  .rg--t-success { --accent: var(--ctrl-success, #4cc38a); }

  .rg.is-disabled { opacity: 0.5; }
  .rg.is-disabled .rg__dot { cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .rg__ring { transition: opacity 200ms ease; }
    .rg__dot.is-active .rg__ring { animation: none; transform: translate(-50%, -50%) scale(1); }
  }
`;function b(c){if(c==null||c==="")return[{},{},{},{}];const t=Number(c);if(Number.isFinite(t)&&String(t)===String(c).trim())return Array.from({length:Math.max(1,t|0)},()=>({}));try{const e=JSON.parse(c);if(Array.isArray(e)&&e.length)return e;if(typeof e=="number")return Array.from({length:Math.max(1,e)},()=>({}))}catch{const e=String(c).split(",").map(r=>r.trim()).filter(Boolean);if(e.length)return e.map(r=>({label:r}))}return[{},{},{},{}]}let g;function f(c){if(g||=document.createElement("canvas").getContext("2d"),!g)return null;g.fillStyle="#000",g.fillStyle=c;const t=g.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(c,t){const e=t?f(String(t).trim()):null;if(!e){for(const i of v)c.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),n=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(i=>Math.round(n?i*.92:i+(255-i)*.16)),a=(i,d)=>c.style.setProperty(i,d);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(i,l);a("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(i,n?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])a(i,n?"0 0 0":"255 255 255");a("--vs-color",l),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["steps","count","value","current","clickable","labels","track","orientation","size","tone","disabled","spin","color"];#t;#i;#s=[];#e=0;#r=[];#a;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#t=document.createElement("div"),this.#t.className="rg",this.#t.setAttribute("role","tablist"),this.#i=document.createElement("div"),this.#i.className="rg__track",this.#t.append(this.#i),t.append(e,this.#t),this.#a=r=>this.#p(r),this.#t.addEventListener("keydown",this.#a)}connectedCallback(){p(this,this.getAttribute("color")),this.#c()}disconnectedCallback(){this.#t.removeEventListener("keydown",this.#a)}attributeChangedCallback(){p(this,this.getAttribute("color")),this.isConnected&&this.#c()}get value(){return this.#e}set value(t){this.setAttribute("value",String(t))}get current(){return this.#e}set current(t){this.setAttribute("current",String(t))}#o(t){return Math.min(Math.max(t|0,0),Math.max(0,this.#r.length-1))}#c(){const t=(d,h)=>this.getAttribute(d)??h,e=t("size","md"),r=t("tone","default"),s=t("orientation","horizontal")==="vertical",n=this.hasAttribute("labels")&&t("labels","true")!=="false",l=t("track","true")!=="false"&&this.getAttribute("track")!=="",o=this.hasAttribute("disabled");this.#t.className=`rg rg--${e} rg--t-${r} rg--${s?"vertical":"horizontal"}`+(o?" is-disabled":"")+(n?" rg--has-labels":"")+(l?"":" rg--no-track"),this.#t.style.setProperty("--rg-spin",`${t("spin","2400").replace(/ms$/,"")}ms`),this.#t.setAttribute("aria-orientation",s?"vertical":"horizontal"),o?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled");const a=b(this.getAttribute("steps")??this.getAttribute("count"));a.length!==this.#r.length?(this.#r=a,this.#g()):this.#r=a;const i=this.getAttribute("value")??this.getAttribute("current");this.#e=this.#o(i==null?this.#e:Number(i)||0),this.#l(n,o,l)}#g(){this.#i.textContent="",this.#s=this.#r.map((t,e)=>{const r=document.createElement("button");r.type="button",r.className="rg__dot",r.setAttribute("role","tab");const s=document.createElement("span");s.className="rg__ring",s.setAttribute("aria-hidden","true");const n=document.createElement("span");n.className="rg__core";const l=document.createElement("span");return l.className="rg__label",r.append(s,n,l),r.addEventListener("click",()=>this.#d(e)),this.#i.append(r),{dot:r,label:l}})}#l(t,e,r){const s=this.hasAttribute("clickable");this.#s.forEach(({dot:n,label:l},o)=>{const a=this.#r[o]||{},i=o===this.#e;n.classList.toggle("is-active",i),n.classList.toggle("is-done",o<this.#e),n.setAttribute("aria-selected",String(i)),n.setAttribute("aria-label",a.label||`Step ${o+1}`),n.tabIndex=i?0:-1,n.disabled=e||!s&&!i,l.style.display=t?"":"none",t&&(l.textContent=a.label||`Step ${o+1}`)})}#n(t,e=!0){const r=this.#o(t);if(r===this.#e)return;this.#e=r;const s=this.hasAttribute("current")&&!this.hasAttribute("value")?"current":"value";this.getAttribute(s)!==String(r)&&this.setAttribute(s,String(r)),this.#l(this.hasAttribute("labels"),this.hasAttribute("disabled"),!0),e&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{index:r}}))}#d(t){this.hasAttribute("disabled")||!this.hasAttribute("clickable")||t===this.#e||this.#n(t)}#p(t){if(this.hasAttribute("disabled"))return;const e=this.getAttribute("orientation")==="vertical",r=e?"ArrowUp":"ArrowLeft",s=e?"ArrowDown":"ArrowRight";t.key===s?(t.preventDefault(),this.#n(this.#e+1)):t.key===r?(t.preventDefault(),this.#n(this.#e-1)):t.key==="Home"?(t.preventDefault(),this.#n(0)):t.key==="End"&&(t.preventDefault(),this.#n(this.#r.length-1))}}customElements.define("vs-dot-stepper-ring",m);
