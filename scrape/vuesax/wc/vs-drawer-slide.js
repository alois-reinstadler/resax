const m=`
  :host { display: inline-block; }
  .sld-trigger {
    appearance: none;
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-card, #111);
    color: var(--text, #ededed);
    font: inherit;
    font-size: 14px;
    padding: 10px 18px;
    border-radius: var(--ctrl-r-md, 10px);
    cursor: pointer;
    transition: border-color 160ms ease, background 160ms ease;
  }
  .sld-trigger:hover { border-color: var(--ui-accent, #ededed); }
  /* embed mode: caller supplies their own trigger markup via slot="trigger";
     the wrapping button is stripped of all box styling so it's invisible —
     clicks on the slotted content still bubble through it to open(). */
  :host([embed]) .sld-trigger { all: unset; display: contents; cursor: pointer; }
`,b=`
  :host { all: initial; }
  * { box-sizing: border-box; }

  .sld-root { position: fixed; inset: 0; z-index: 1000; pointer-events: none; font-family: inherit; }
  .sld-root.is-open { pointer-events: auto; }

  .sld-ov {
    position: absolute;
    inset: 0;
    background: var(--backdrop, rgba(0, 0, 0, 0.5));
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 260ms ease;
  }
  .sld-ov.is-open { opacity: 1; }

  .sld-panel {
    --sld-w: 380px;
    position: absolute;
    display: flex;
    flex-direction: column;
    background: var(--bg-card, #111);
    color: var(--text, #ededed);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    outline: none;
    overflow: hidden;
    transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .sld-panel--left, .sld-panel--right { top: 0; height: 100%; width: min(var(--sld-w), calc(100vw - 48px)); }
  .sld-panel--left { left: 0; border-right: 1px solid var(--border, #2a2a2a); }
  .sld-panel--right { right: 0; border-left: 1px solid var(--border, #2a2a2a); }
  .sld-panel--top, .sld-panel--bottom { left: 0; width: 100%; height: min(var(--sld-w), calc(100vh - 48px)); }
  .sld-panel--top { top: 0; border-bottom: 1px solid var(--border, #2a2a2a); }
  .sld-panel--bottom { bottom: 0; border-top: 1px solid var(--border, #2a2a2a); }

  .sld-panel--sm { --sld-w: 300px; }
  .sld-panel--md { --sld-w: 380px; }
  .sld-panel--lg { --sld-w: 520px; }

  /* closed/leave-to transforms — one per edge, matching VsDrawerSlide.vue */
  .sld-panel--right { transform: translateX(calc(100% * var(--sld-depth, 1))); }
  .sld-panel--left { transform: translateX(calc(-100% * var(--sld-depth, 1))); }
  .sld-panel--top { transform: translateY(calc(-100% * var(--sld-depth, 1))); }
  .sld-panel--bottom { transform: translateY(calc(100% * var(--sld-depth, 1))); }
  /* open state wins the cascade (declared last, same specificity) */
  .sld-panel.is-open { transform: translateX(0) translateY(0); }

  .sld-panel--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .sld-panel--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .sld-panel--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .sld-panel__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 18px 20px;
    border-bottom: 1px solid var(--border, #2a2a2a);
    flex: none;
  }
  .sld-panel__title { margin: 0; font-size: 16px; font-weight: 600; color: var(--text, #ededed); }
  .sld-panel__x {
    appearance: none;
    border: none;
    background: transparent;
    color: var(--text, #ededed);
    width: 30px; height: 30px;
    display: grid; place-items: center;
    border-radius: var(--ctrl-r-sm, 8px);
    cursor: pointer;
    transition: background 140ms ease;
  }
  .sld-panel__x svg { width: 18px; height: 18px; display: block; }
  .sld-panel__x:hover { background: var(--bg-input, rgba(255, 255, 255, 0.06)); }
  .sld-panel__x[hidden] { display: none; }

  .sld-panel__body { flex: 1; padding: 20px; overflow-y: auto; font-size: 14px; line-height: 1.55; color: var(--text-secondary, #c4c4c4); }
  .sld-panel__placeholder { margin: 0; }
  .sld-panel__placeholder code {
    font-family: var(--font-mono, monospace);
    padding: 1px 6px; border-radius: 6px;
    background: var(--bg-input, rgba(255, 255, 255, 0.06));
    color: var(--text, #ededed);
  }
  .sld-panel__foot {
    display: flex; justify-content: flex-end; gap: 10px;
    padding: 16px 20px;
    border-top: 1px solid var(--border, #2a2a2a);
    flex: none;
  }
  .sld-panel__foot[hidden] { display: none; }

  @media (prefers-reduced-motion: reduce) {
    .sld-ov, .sld-ov.is-open, .sld-panel, .sld-panel.is-open { transition-duration: 0ms; }
  }
`,p="http://www.w3.org/2000/svg";function f(){const r=document.createElementNS(p,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("aria-hidden","true");for(const t of["M6 6L18 18","M18 6L6 18"]){const e=document.createElementNS(p,"path");e.setAttribute("d",t),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),r.appendChild(e)}return r}const g='a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',v=360;let c;function x(r){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=r;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(r,t){const e=t?x(String(t).trim()):null;if(!e){for(const n of y)r.style.removeProperty(n);return}const s=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),o=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(n=>Math.round(o?n*.92:n+(255-n)*.16)),d=(n,u)=>r.style.setProperty(n,u);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])d(n,a);d("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])d(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])d(n,o?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])d(n,o?"0 0 0":"255 255 255");d("--vs-color",a),d("--vs-color-rgb",e.join(" ")),d("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["open","side","size","title","tone","prevent-close","close-hidden","trigger-label","embed","slide-depth","color"];#r;#h;#t=null;#s;#o;#e;#l;#n;#a;#u=null;#d=null;#y=null;#c=0;#i=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#r=document.createElement("button"),this.#r.type="button",this.#r.className="sld-trigger";const s=document.createElement("slot");s.name="trigger",this.#h=document.createTextNode(this.getAttribute("trigger-label")||"Open drawer"),s.appendChild(this.#h),this.#r.appendChild(s),t.append(e,this.#r),this.#r.addEventListener("click",()=>this.show()),this.#d=i=>this.#x(i)}connectedCallback(){h(this,this.getAttribute("color")),this.#p()}disconnectedCallback(){clearTimeout(this.#c),document.removeEventListener("keydown",this.#d,!0),this.#i&&(document.body.style.overflow=""),this.#i=!1,this.#m(),this.#t&&this.#t.isConnected&&this.#t.remove()}attributeChangedCallback(t,e,s){if(h(this,this.getAttribute("color")),t==="open"){const i=s!==null;i!==this.#i&&(i?this.#g():this.#v());return}this.#p()}get open(){return this.hasAttribute("open")}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}show(){this.setAttribute("open","")}close(){this.hasAttribute("prevent-close")||this.removeAttribute("open")}#p(){const t=(o,a)=>this.getAttribute(o)??a;this.#h.textContent=t("trigger-label","Open drawer");const e=Math.min(1.5,Math.max(.4,parseFloat(t("slide-depth","1"))||1));if(this.#t&&this.#t.style.setProperty("--sld-depth",String(e)),!this.#e)return;this.#l.textContent=t("title","Drawer title"),this.#e.setAttribute("aria-label",t("title","Drawer title")),this.#e.className=`sld-panel sld-panel--${t("side","right")} sld-panel--${t("size","md")} sld-panel--t-${t("tone","default")}${this.#i?" is-open":""}`;const s=this.hasAttribute("prevent-close"),i=this.hasAttribute("close-hidden");this.#n.style.display=i||s?"none":""}#b(){if(this.#t)return;this.#t=document.createElement("div");const t=this.#t.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#s=document.createElement("div"),this.#s.className="sld-root",this.#o=document.createElement("div"),this.#o.className="sld-ov",this.#e=document.createElement("aside"),this.#e.className="sld-panel sld-panel--right sld-panel--md",this.#e.setAttribute("role","dialog"),this.#e.setAttribute("aria-modal","true"),this.#e.tabIndex=-1;const s=document.createElement("header");s.className="sld-panel__head",this.#l=document.createElement("h2"),this.#l.className="sld-panel__title",this.#n=document.createElement("button"),this.#n.type="button",this.#n.className="sld-panel__x",this.#n.setAttribute("aria-label","Close"),this.#n.appendChild(f()),this.#n.addEventListener("click",()=>this.close()),s.append(this.#l,this.#n);const i=document.createElement("div");i.className="sld-panel__body";const o=document.createElement("slot"),a=document.createElement("p");a.className="sld-panel__placeholder",a.append("Slide drawer content. Pass markup via ",Object.assign(document.createElement("code"),{textContent:"<slot>"}),"."),o.appendChild(a),i.appendChild(o),this.#a=document.createElement("footer"),this.#a.className="sld-panel__foot",this.#a.hidden=!0;const l=document.createElement("slot");l.name="footer",l.addEventListener("slotchange",()=>{this.#a.hidden=l.assignedNodes({flatten:!0}).length===0}),this.#a.appendChild(l),this.#e.append(s,i,this.#a),this.#s.append(this.#o,this.#e),t.append(e,this.#s),this.#o.addEventListener("mousedown",()=>{this.hasAttribute("prevent-close")||this.close()}),this.#p()}#f(){const t=[...this.childNodes].filter(e=>e.nodeType!==1?!0:e.getAttribute("slot")!=="trigger");for(const e of t)this.#t.appendChild(e)}#m(){if(this.#t)for(const t of[...this.#t.childNodes])this.appendChild(t)}#g(){clearTimeout(this.#c),this.#b(),this.#f(),this.#t.isConnected||document.body.appendChild(this.#t),this.#i=!0,this.#p(),this.#u=document.activeElement,document.body.style.overflow="hidden",document.addEventListener("keydown",this.#d,!0),this.#s.classList.remove("is-open"),this.#o.classList.remove("is-open"),this.#e.classList.remove("is-open"),this.#e.offsetHeight,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.#i&&(this.#s.classList.add("is-open"),this.#o.classList.add("is-open"),this.#e.classList.add("is-open"),this.#e.focus())})}),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#v(){this.#i=!1,this.#s&&(this.#s.classList.remove("is-open"),this.#o.classList.remove("is-open"),this.#e.classList.remove("is-open")),document.removeEventListener("keydown",this.#d,!0),document.body.style.overflow="",this.#u?.focus?.(),this.#u=null,clearTimeout(this.#c);const t=()=>{this.#i||(this.#m(),this.#t&&this.#t.isConnected&&this.#t.remove())};if(this.#e){const e=s=>{s.target===this.#e&&s.propertyName==="transform"&&(this.#e.removeEventListener("transitionend",e),t())};this.#e.addEventListener("transitionend",e),this.#c=setTimeout(()=>{this.#e?.removeEventListener("transitionend",e),t()},v)}else t();this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#x(t){if(t.key==="Escape"&&!this.hasAttribute("prevent-close")){t.preventDefault(),this.close();return}if(t.key!=="Tab"||!this.#e)return;const e=this.#e.querySelectorAll(g);if(!e.length)return;const s=e[0],i=e[e.length-1],o=this.#e.getRootNode().activeElement;t.shiftKey&&o===s?(t.preventDefault(),i.focus()):!t.shiftKey&&o===i&&(t.preventDefault(),s.focus())}}customElements.define("vs-drawer-slide",w);
