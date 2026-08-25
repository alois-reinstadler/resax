const p=`
  :host {
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
  :host([hidden]) { display: none; }
  :host([size="sm"]) { --dot: 8px; --gap: 12px; --pad-x: 18px; --pad-y: 12px; }
  :host([size="lg"]) { --dot: 12px; --gap: 20px; --pad-x: 28px; --pad-y: 18px; }

  .wm { display: inline-flex; }
  .wm__track {
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
  .wm--vertical .wm__track { flex-direction: column; padding: var(--pad-x) var(--pad-y); }
  .wm--has-labels.wm--horizontal .wm__track { align-items: flex-end; }
  .wm--no-track .wm__track { padding: 0; border-color: transparent; background: transparent; }

  /* worm: absolute focus measured against the active dot. --tf holds the slide
     translate (written in place); the is-traveling rules compose the stretch. */
  .wm__focus {
    position: absolute;
    left: 0;
    top: 0;
    width: var(--dot);
    height: var(--dot);
    border-radius: 999px;
    background: var(--accent);
    z-index: 1;
    transform-origin: center;
    transform: var(--tf, none);
    transition:
      transform 400ms cubic-bezier(0.5, 0, 0.2, 1),
      width 400ms cubic-bezier(0.5, 0, 0.2, 1),
      height 400ms cubic-bezier(0.5, 0, 0.2, 1);
  }
  /* while traveling: stretches along the movement axis */
  .wm.is-traveling.wm--horizontal .wm__focus { transform: var(--tf, none) scaleX(var(--wm-stretch, 1.6)); }
  .wm.is-traveling.wm--vertical .wm__focus { transform: var(--tf, none) scaleY(var(--wm-stretch, 1.6)); }

  .wm__dot {
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
  .wm__dot:disabled { cursor: default; }
  .wm__dot:focus-visible { outline: none; }
  .wm__dot:focus-visible .wm__core { box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 40%, transparent); }

  .wm__core {
    width: var(--dot);
    height: var(--dot);
    border-radius: 999px;
    background: var(--off);
    transition: background-color 220ms ease;
  }
  .wm__dot:hover:not(:disabled):not(.is-active) .wm__core { background: color-mix(in srgb, var(--off) 60%, var(--accent) 40%); }
  .wm__dot.is-active .wm__core { background: transparent; }

  .wm--vertical .wm__dot { flex-direction: row; }

  .wm__label {
    font-size: 0.78em;
    white-space: nowrap;
    transition: color 200ms ease;
  }
  .wm__dot.is-active .wm__label { color: var(--ctrl-text, var(--text, #ededed)); }

  .wm--t-danger { --accent: var(--ctrl-danger, #ff6369); }
  .wm--t-warn { --accent: var(--ctrl-warn, #ffb224); }
  .wm--t-success { --accent: var(--ctrl-success, #4cc38a); }

  .wm.is-disabled { opacity: 0.5; }
  .wm.is-disabled .wm__dot { cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .wm__focus { transition: none; }
    .wm.is-traveling.wm--horizontal .wm__focus,
    .wm.is-traveling.wm--vertical .wm__focus { transform: var(--tf, none); }
  }
`;let m;function f(h){if(m||=document.createElement("canvas").getContext("2d"),!m)return null;m.fillStyle="#000",m.fillStyle=h;const t=m.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(h,t){const e=t?f(String(t).trim()):null;if(!e){for(const a of g)h.style.removeProperty(a);return}const i=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),s=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,d=e.map(a=>Math.round(s?a*.92:a+(255-a)*.16)),n=(a,o)=>h.style.setProperty(a,o);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(a,l);n("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(a,e.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(a,s?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])n(a,s?"0 0 0":"255 255 255");n("--vs-color",l),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["count","steps","current","value","size","tone","orientation","clickable","labels","track","stretch","disabled","color"];#t;#s;#e;#a=[];#l;#c;#n=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=p,this.#t=document.createElement("div"),this.#t.className="wm",this.#t.setAttribute("role","tablist"),this.#s=document.createElement("div"),this.#s.className="wm__track",this.#e=document.createElement("span"),this.#e.className="wm__focus",this.#e.setAttribute("aria-hidden","true"),this.#s.append(this.#e),this.#t.append(this.#s),t.append(e,this.#t),this.#l=i=>this.#_(i),this.#c=()=>this.#u()}connectedCallback(){b(this,this.getAttribute("color")),this.#t.addEventListener("keydown",this.#l),window.addEventListener("resize",this.#c,{passive:!0}),this.#g(),this.#d(),requestAnimationFrame(()=>this.#u())}disconnectedCallback(){this.#t.removeEventListener("keydown",this.#l),window.removeEventListener("resize",this.#c),this.#n&&(clearTimeout(this.#n),this.#n=0)}attributeChangedCallback(t){b(this,this.getAttribute("color")),this.isConnected&&((t==="count"||t==="steps")&&this.#g(),this.#d(),this.#u())}get value(){return this.#i()}set value(t){this.#r(t|0,!1)}get current(){return this.#i()}set current(t){this.#r(t|0,!1)}#m(){const t=this.getAttribute("steps");if(t!=null&&t.trim()){const i=t.trim();if(/^\d+$/.test(i))return this.#h(Number(i));try{const r=JSON.parse(i);if(Array.isArray(r)&&r.length)return r.map(s=>s&&typeof s=="object"?{label:s.label}:{label:String(s)});if(typeof r=="number")return this.#h(r)}catch{const r=i.split(",").map(s=>s.trim()).filter(Boolean);if(r.length)return r.map(s=>({label:s}))}}const e=Number(this.getAttribute("count")??t??4);return this.#h(Number.isFinite(e)?e:4)}#h(t){return Array.from({length:Math.max(1,t|0)},()=>({}))}#b(){return this.#a.length||this.#m().length}#p(t){return Math.min(Math.max(t|0,0),Math.max(0,this.#b()-1))}#i(){const t=this.getAttribute("current")??this.getAttribute("value")??0;return this.#p(Number(t)||0)}#o(){return this.getAttribute("orientation")==="vertical"}#f(){return this.hasAttribute("clickable")}#v(){return this.hasAttribute("labels")&&this.hasAttribute("labels")}#g(){const t=this.#m();this.#a.forEach(e=>e.remove()),this.#a=t.map((e,i)=>{const r=document.createElement("button");r.type="button",r.className="wm__dot",r.setAttribute("role","tab"),r.dataset.index=String(i),r._label=e.label||`Step ${i+1}`;const s=document.createElement("span");return s.className="wm__core",r.append(s),r.addEventListener("click",()=>this.#w(i)),this.#s.append(r),r})}#d(){const t=this.#i(),e=this.getAttribute("size")||"md",i=this.getAttribute("tone")||"default",r=this.hasAttribute("disabled")&&this.hasAttribute("disabled"),s=this.#v(),l=this.hasAttribute("track"),d=this.#f(),n=this.getAttribute("stretch"),a=this.#t.classList.contains("is-traveling");this.#t.className=["wm",`wm--${e}`,`wm--t-${i}`,this.#o()?"wm--vertical":"wm--horizontal",r?"is-disabled":"",s?"wm--has-labels":"",l?"":"wm--no-track",a?"is-traveling":""].filter(Boolean).join(" "),this.#t.setAttribute("aria-orientation",this.#o()?"vertical":"horizontal"),r?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled"),this.#t.style.setProperty("--wm-stretch",n!=null&&n!==""?String(Number(n)||1.6):"1.6"),this.#a.forEach((o,u)=>{o.classList.toggle("is-active",u===t),o.classList.toggle("is-done",u<t),o.setAttribute("aria-selected",u===t?"true":"false"),o.setAttribute("aria-label",o._label),o.tabIndex=u===t?0:-1,o.disabled=r||!d&&u!==t;let c=o.querySelector(".wm__label");s?(c||(c=document.createElement("span"),c.className="wm__label",o.append(c)),c.textContent=o._label):c&&c.remove()})}#u(){const t=this.#a[this.#i()];if(!t||!this.#e)return;const e=this.#s.getBoundingClientRect(),i=t.getBoundingClientRect();i.width&&(this.#e.style.setProperty("--tf",`translate(${i.left-e.left}px, ${i.top-e.top}px)`),this.#e.style.width=`${i.width}px`,this.#e.style.height=`${i.height}px`)}#w(t){this.hasAttribute("disabled")&&this.hasAttribute("disabled")||!this.#f()||t===this.#i()||this.#r(t,!0)}#_(t){if(this.hasAttribute("disabled")&&this.hasAttribute("disabled"))return;const i=this.#o()?"ArrowUp":"ArrowLeft",r=this.#o()?"ArrowDown":"ArrowRight",s=this.#i(),l=this.#b()-1;t.key===r?(t.preventDefault(),this.#r(Math.min(s+1,l),!0)):t.key===i?(t.preventDefault(),this.#r(Math.max(s-1,0),!0)):t.key==="Home"?(t.preventDefault(),this.#r(0,!0)):t.key==="End"&&(t.preventDefault(),this.#r(l,!0))}#r(t,e){const i=this.#p(t),r=i!==this.#i();if(!r&&this.getAttribute("current")!=null){this.#d();return}r&&this.isConnected&&this.#x(),this.setAttribute("current",String(i)),e&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{index:i}}));const s=this.#a[i];s&&this.#t.contains(document.activeElement)&&s.focus()}#x(){this.#t.classList.add("is-traveling"),clearTimeout(this.#n),this.#n=setTimeout(()=>{this.#t.classList.remove("is-traveling"),this.#n=0},420)}}customElements.define("vs-dot-stepper-worm",v);
