const p=`
  :host {
    --bar-w: 6px;
    --bar-min: 10px;
    --bar-max: 30px;
    --gap: 10px;
    --pad-x: 20px;
    --pad-y: 16px;
    /* How far a dot has to reach past its own bar to clear the 24px thumb
       floor. Derived from the bar so every size class lands on 24, and read
       back by the trackless row, which otherwise has no room to lend. */
    --hit-x: calc((24px - var(--bar-w)) / 2);
    --hit-y: calc((24px - var(--bar-min)) / 2);
    --accent: var(--ctrl-accent, var(--ui-accent, #ededed));
    --off: var(--ctrl-dot-off, rgb(var(--ui-ring, 255 255 255) / 0.32));
    display: inline-flex;
    font-family: inherit;
    user-select: none;
    -webkit-user-select: none;
  }
  :host([hidden]) { display: none; }
  :host([size="sm"]) { --bar-w: 5px; --bar-min: 8px; --bar-max: 24px; --gap: 8px; --pad-x: 16px; --pad-y: 13px; }
  :host([size="lg"]) { --bar-w: 7px; --bar-min: 12px; --bar-max: 38px; --gap: 12px; --pad-x: 26px; --pad-y: 20px; }

  .bs { display: inline-flex; }
  .bs__track {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
    padding: var(--pad-y) var(--pad-x);
    border: 1px solid var(--ctrl-border, var(--border, #2a2a2a));
    border-radius: 16px;
    background: var(--ctrl-bg, var(--bg-elevated, rgba(20, 20, 20, 0.9)));
    isolation: isolate;
  }
  .bs--vertical .bs__track { flex-direction: column; padding: var(--pad-x) var(--pad-y); }
  .bs--has-labels.bs--horizontal .bs__track { align-items: flex-end; }
  .bs--no-track .bs__track { padding: var(--hit-y) var(--hit-x); border-color: transparent; background: transparent; }
  .bs--vertical.bs--no-track .bs__track { padding: var(--hit-x) var(--hit-y); }

  .bs__dot {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    /* A resting bar is 6x10 — half the thumb floor in both axes. The button box
       is padded out to 24px and the padding handed straight back with margin,
       so the row still lays out as if the bars were the only boxes in it. */
    padding: var(--hit-y) var(--hit-x);
    margin: calc(-1 * var(--hit-y)) calc(-1 * var(--hit-x));
    border: 0;
    background: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    font: inherit;
    color: var(--ctrl-text-muted, var(--text-muted, #8a8a8a));
    z-index: 2;
  }
  .bs__dot:disabled { cursor: default; }
  .bs__dot:focus-visible { outline: none; }
  .bs__dot:focus-visible .bs__bar { box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 40%, transparent); }

  /* equalizer-style bar — the "grow" easing lives here */
  .bs__bar {
    width: var(--bar-w);
    height: var(--bar-min);
    border-radius: 999px;
    background: var(--off);
    transition:
      height 380ms cubic-bezier(0.34, 1.3, 0.5, 1),
      background-color 260ms ease;
  }
  .bs--vertical .bs__bar { width: var(--bar-min); height: var(--bar-w); transition: width 380ms cubic-bezier(0.34, 1.3, 0.5, 1), background-color 260ms ease; }

  .bs__dot:hover:not(:disabled):not(.is-active):not(.is-done) .bs__bar { background: color-mix(in srgb, var(--off) 55%, var(--accent) 45%); }

  /* visited steps: half height and tinted */
  .bs__dot.is-done .bs__bar {
    height: calc(var(--bar-min) + (var(--bar-max) - var(--bar-min)) * 0.5);
    background: color-mix(in srgb, var(--accent) 70%, transparent);
  }
  .bs--vertical .bs__dot.is-done .bs__bar { height: var(--bar-w); width: calc(var(--bar-min) + (var(--bar-max) - var(--bar-min)) * 0.5); }

  /* active: bar at peak */
  .bs__dot.is-active .bs__bar {
    height: calc(var(--bar-max) * var(--bs-peak, 1));
    background: var(--accent);
  }
  .bs--vertical .bs__dot.is-active .bs__bar { height: var(--bar-w); width: calc(var(--bar-max) * var(--bs-peak, 1)); }

  /* Vertical lays the bar on its side, so the axis that needs the padding swaps
     with it. */
  .bs--vertical .bs__dot {
    flex-direction: row;
    padding: var(--hit-x) var(--hit-y);
    margin: calc(-1 * var(--hit-x)) calc(-1 * var(--hit-y));
  }

  .bs__label {
    font-size: 0.78em;
    white-space: nowrap;
    transition: color 200ms ease;
  }
  .bs__dot.is-active .bs__label { color: var(--ctrl-text, var(--text, #ededed)); }

  .bs--t-danger { --accent: var(--ctrl-danger, #ff6369); }
  .bs--t-warn { --accent: var(--ctrl-warn, #ffb224); }
  .bs--t-success { --accent: var(--ctrl-success, #4cc38a); }

  .bs.is-disabled { opacity: 0.5; }
  .bs.is-disabled .bs__dot { cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .bs__bar { transition: background-color 260ms ease; }
  }
`;let h;function g(b){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=b;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const r=t.match(/[\d.]+/g);return r&&r.length>=3?[+r[0],+r[1],+r[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(b,t){const r=t?g(String(t).trim()):null;if(!r){for(const e of v)b.style.removeProperty(e);return}const s=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),i=.2126*s(r[0])+.7152*s(r[1])+.0722*s(r[2])>.45,o=`rgb(${r[0]} ${r[1]} ${r[2]})`,d=r.map(e=>Math.round(i?e*.92:e+(255-e)*.16)),n=(e,l)=>b.style.setProperty(e,l);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(e,o);n("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(e,r.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(e,i?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])n(e,i?"0 0 0":"255 255 255");n("--vs-color",o),n("--vs-color-rgb",r.join(" ")),n("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["count","steps","current","value","size","tone","orientation","clickable","labels","track","peak","disabled","color"];#t;#a;#s=[];#n;constructor(){super();const t=this.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=p,this.#t=document.createElement("div"),this.#t.className="bs",this.#t.setAttribute("role","tablist"),this.#a=document.createElement("div"),this.#a.className="bs__track",this.#t.append(this.#a),t.append(r,this.#t),this.#n=s=>this.#v(s)}connectedCallback(){u(this,this.getAttribute("color")),this.#t.addEventListener("keydown",this.#n),this.#u(),this.#l()}disconnectedCallback(){this.#t.removeEventListener("keydown",this.#n)}attributeChangedCallback(t){u(this,this.getAttribute("color")),this.isConnected&&((t==="count"||t==="steps")&&this.#u(),this.#l())}get value(){return this.#r()}set value(t){this.#e(t|0,!1)}get current(){return this.#r()}set current(t){this.#e(t|0,!1)}#c(){const t=this.getAttribute("steps");if(t!=null&&t.trim()){const s=t.trim();if(/^\d+$/.test(s))return this.#o(Number(s));try{const a=JSON.parse(s);if(Array.isArray(a)&&a.length)return a.map(i=>i&&typeof i=="object"?{label:i.label}:{label:String(i)});if(typeof a=="number")return this.#o(a)}catch{const a=s.split(",").map(i=>i.trim()).filter(Boolean);if(a.length)return a.map(i=>({label:i}))}}const r=Number(this.getAttribute("count")??t??4);return this.#o(Number.isFinite(r)?r:4)}#o(t){return Array.from({length:Math.max(1,t|0)},()=>({}))}#b(){return this.#s.length||this.#c().length}#d(t){return Math.min(Math.max(t|0,0),Math.max(0,this.#b()-1))}#r(){const t=this.getAttribute("current")??this.getAttribute("value")??0;return this.#d(Number(t)||0)}#i(){return this.getAttribute("orientation")==="vertical"}#h(){return this.hasAttribute("clickable")}#p(){return this.hasAttribute("labels")&&this.hasAttribute("labels")}#u(){const t=this.#c();this.#a.textContent="",this.#s=t.map((r,s)=>{const a=document.createElement("button");a.type="button",a.className="bs__dot",a.setAttribute("role","tab"),a.dataset.index=String(s),a._label=r.label||`Step ${s+1}`;const i=document.createElement("span");return i.className="bs__bar",a.append(i),a.addEventListener("click",()=>this.#g(s)),this.#a.append(a),a})}#l(){const t=this.#r(),r=this.getAttribute("size")||"md",s=this.getAttribute("tone")||"default",a=this.hasAttribute("disabled")&&this.hasAttribute("disabled"),i=this.#p(),o=this.hasAttribute("track"),d=this.#h(),n=this.getAttribute("peak");this.#t.className=["bs",`bs--${r}`,`bs--t-${s}`,this.#i()?"bs--vertical":"bs--horizontal",a?"is-disabled":"",i?"bs--has-labels":"",o?"":"bs--no-track"].filter(Boolean).join(" "),this.#t.setAttribute("aria-orientation",this.#i()?"vertical":"horizontal"),a?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled"),this.#t.style.setProperty("--bs-peak",n!=null&&n!==""?String(Number(n)||1):"1"),this.#s.forEach((e,l)=>{e.classList.toggle("is-active",l===t),e.classList.toggle("is-done",l<t),e.setAttribute("aria-selected",l===t?"true":"false"),e.setAttribute("aria-label",e._label),e.tabIndex=l===t?0:-1,e.disabled=a||!d&&l!==t;let c=e.querySelector(".bs__label");i?(c||(c=document.createElement("span"),c.className="bs__label",e.append(c)),c.textContent=e._label):c&&c.remove()})}#g(t){this.hasAttribute("disabled")&&this.hasAttribute("disabled")||!this.#h()||t===this.#r()||this.#e(t,!0)}#v(t){if(this.hasAttribute("disabled")&&this.hasAttribute("disabled"))return;const s=this.#i()?"ArrowUp":"ArrowLeft",a=this.#i()?"ArrowDown":"ArrowRight",i=this.#r(),o=this.#b()-1;t.key===a?(t.preventDefault(),this.#e(Math.min(i+1,o),!0)):t.key===s?(t.preventDefault(),this.#e(Math.max(i-1,0),!0)):t.key==="Home"?(t.preventDefault(),this.#e(0,!0)):t.key==="End"&&(t.preventDefault(),this.#e(o,!0))}#e(t,r){const s=this.#d(t);if(s===this.#r()&&this.getAttribute("current")!=null){this.#l();return}this.setAttribute("current",String(s)),r&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{index:s}}));const a=this.#s[s];a&&this.#t.contains(document.activeElement)&&a.focus()}}customElements.define("vs-dot-stepper-bars",m);
