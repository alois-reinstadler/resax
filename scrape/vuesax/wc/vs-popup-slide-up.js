const m=`
  :host { display: inline-block; }
  .vps__trigger {
    height: var(--ctrl-h-md, 40px);
    padding: 0 16px;
    border-radius: 12px;
    border: 1px solid transparent;
    background: var(--btn-primary-bg, #ededed);
    color: var(--btn-primary-fg, #000);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
  }
  .vps__trigger:hover { opacity: 0.9; }
`,v=`
  :host { all: initial; }
  * { box-sizing: border-box; }
  .vps__overlay {
    position: fixed;
    inset: 0;
    /* Above every piece of page chrome — a fixed bottom blur band or a floating
       mobile nav at 1100-1200 would otherwise repaint over the dialog. */
    z-index: 2000;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 16px;
    background: rgba(0, 0, 0, 0.55);
    font-family: inherit;
    opacity: 0;
    transition: opacity 220ms ease;
  }
  .vps__overlay.is-open { opacity: 1; transition: opacity 300ms ease; }
  .vps__panel {
    --vpw: 460px;
    display: flex;
    flex-direction: column;
    width: min(var(--vpw), calc(100vw - 32px));
    max-height: calc(100vh - 32px);
    border-radius: 20px;
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-card, #111);
    color: var(--text, #ededed);
    box-shadow: 0 -12px 60px -12px rgba(0, 0, 0, 0.6);
    overflow: hidden;
    outline: none;
    transform: translateY(110%);
    transition: transform 240ms cubic-bezier(0.4, 0, 1, 1);
  }
  .vps__overlay.is-open .vps__panel { transform: translateY(0); transition: transform 460ms cubic-bezier(0.22, 1, 0.36, 1); }
  .vps__panel--sm { --vpw: 360px; }
  .vps__panel--md { --vpw: 460px; }
  .vps__panel--lg { --vpw: 640px; }

  .vps__grip { width: 40px; height: 4px; margin: 10px auto 0; border-radius: 999px; background: var(--border-strong, #3a3a3a); flex: none; }
  .vps__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 20px 14px; border-bottom: 1px solid var(--border, #2a2a2a); flex: none; }
  .vps__title { margin: 0; font-size: 16px; font-weight: 600; }
  .vps__close { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; padding: 0; border: none; border-radius: 8px; background: transparent; color: var(--text-secondary, #a1a1a1); cursor: pointer; transition: background-color 160ms ease, color 160ms ease; }
  .vps__close:hover { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.08)); color: var(--text, #ededed); }
  .vps__close svg { width: 18px; height: 18px; display: block; }
  .vps__close[hidden] { display: none; }
  .vps__body { padding: 20px; overflow-y: auto; font-size: 14px; line-height: 1.55; color: var(--text-secondary, #c4c4c4); }
  .vps__ph { margin: 0; }
  .vps__ph code { font-family: var(--font-mono, monospace); padding: 1px 6px; border-radius: 6px; background: var(--bg-input, rgba(255, 255, 255, 0.06)); color: var(--text, #ededed); }
  .vps__foot { display: flex; justify-content: flex-end; gap: 10px; padding: 16px 20px; border-top: 1px solid var(--border, #2a2a2a); flex: none; }
  .vps__foot[hidden] { display: none; }

  @media (prefers-reduced-motion: reduce) {
    .vps__overlay, .vps__overlay.is-open, .vps__panel, .vps__overlay.is-open .vps__panel { transition-duration: 0ms; }
  }
`,c="http://www.w3.org/2000/svg";function b(){const a=document.createElementNS(c,"svg");a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("aria-hidden","true");for(const e of["M6 6L18 18","M18 6L6 18"]){const t=document.createElementNS(c,"path");t.setAttribute("d",e),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),a.appendChild(t)}return a}const f='a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',g=320;let p;function _(a){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=a;const e=p.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(a,e){const t=e?_(String(e).trim()):null;if(!t){for(const s of y)a.style.removeProperty(s);return}const n=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),o=.2126*n(t[0])+.7152*n(t[1])+.0722*n(t[2])>.45,d=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(s=>Math.round(o?s*.92:s+(255-s)*.16)),r=(s,u)=>a.style.setProperty(s,u);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(s,d);r("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(s,t.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(s,o?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])r(s,o?"0 0 0":"255 255 255");r("--vs-color",d),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["open","title","size","prevent-close","close-hidden","trigger-label","color"];#o;#p;#e=null;#t;#s;#a;#n;#r;#c=null;#l=null;#d=0;#i=!1;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=m,this.#o=document.createElement("button"),this.#o.type="button",this.#o.className="vps__trigger";const n=document.createElement("slot");n.name="trigger",this.#p=document.createTextNode(this.getAttribute("trigger-label")||"Open popup"),n.appendChild(this.#p),this.#o.appendChild(n),e.append(t,this.#o),this.#o.addEventListener("click",()=>this.show()),this.#l=i=>this.#g(i)}connectedCallback(){h(this,this.getAttribute("color")),this.#h()}disconnectedCallback(){clearTimeout(this.#d),document.removeEventListener("keydown",this.#l,!0),this.#i&&(document.body.style.overflow=""),this.#i=!1,this.#u(),this.#e&&this.#e.isConnected&&this.#e.remove()}attributeChangedCallback(e,t,n){if(h(this,this.getAttribute("color")),e==="open"){const i=n!==null;i!==this.#i&&(i?this.#b():this.#f());return}this.#h()}get open(){return this.hasAttribute("open")}set open(e){e?this.setAttribute("open",""):this.removeAttribute("open")}show(){this.setAttribute("open","")}close(){this.hasAttribute("prevent-close")||this.removeAttribute("open")}#h(){const e=(i,o)=>this.getAttribute(i)??o;if(this.#p.textContent=e("trigger-label","Open popup"),!this.#s)return;this.#a.textContent=e("title","Popup title"),this.#s.setAttribute("aria-label",e("title","Popup title")),this.#s.className=`vps__panel vps__panel--${e("size","md")}`;const t=this.hasAttribute("prevent-close"),n=this.hasAttribute("close-hidden");this.#n.style.display=n||t?"none":""}#m(){if(this.#e)return;this.#e=document.createElement("div");const e=this.#e.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=v,this.#t=document.createElement("div"),this.#t.className="vps__overlay",this.#s=document.createElement("div"),this.#s.className="vps__panel vps__panel--md",this.#s.setAttribute("role","dialog"),this.#s.setAttribute("aria-modal","true"),this.#s.tabIndex=-1;const n=document.createElement("div");n.className="vps__grip",n.setAttribute("aria-hidden","true");const i=document.createElement("header");i.className="vps__head",this.#a=document.createElement("h2"),this.#a.className="vps__title",this.#n=document.createElement("button"),this.#n.type="button",this.#n.className="vps__close",this.#n.setAttribute("aria-label","Close"),this.#n.appendChild(b()),this.#n.addEventListener("click",()=>this.close()),i.append(this.#a,this.#n);const o=document.createElement("div");o.className="vps__body";const d=document.createElement("slot"),l=document.createElement("p");l.className="vps__ph",l.append("Popup content. Pass your markup via ",Object.assign(document.createElement("code"),{textContent:"<slot>"}),"."),d.appendChild(l),o.appendChild(d),this.#r=document.createElement("footer"),this.#r.className="vps__foot",this.#r.hidden=!0;const r=document.createElement("slot");r.name="footer",r.addEventListener("slotchange",()=>{this.#r.hidden=r.assignedNodes({flatten:!0}).length===0}),this.#r.appendChild(r),this.#s.append(n,i,o,this.#r),this.#t.appendChild(this.#s),e.append(t,this.#t),this.#t.addEventListener("mousedown",s=>{s.target===this.#t&&!this.hasAttribute("prevent-close")&&this.close()}),this.#h()}#v(){const e=[...this.childNodes].filter(t=>!(t.nodeType===1&&t.getAttribute("slot")==="trigger"));for(const t of e)this.#e.appendChild(t)}#u(){if(this.#e)for(const e of[...this.#e.childNodes])this.appendChild(e)}#b(){clearTimeout(this.#d),this.#m(),this.#v(),this.#e.isConnected||document.body.appendChild(this.#e),this.#i=!0,this.#c=document.activeElement,document.body.style.overflow="hidden",document.addEventListener("keydown",this.#l,!0),this.#t.classList.remove("is-open"),this.#t.offsetHeight,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.#i&&(this.#t.classList.add("is-open"),this.#s.focus())})}),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#f(){this.#i=!1,this.#t&&this.#t.classList.remove("is-open"),document.removeEventListener("keydown",this.#l,!0),document.body.style.overflow="",this.#c?.focus?.(),this.#c=null,clearTimeout(this.#d);const e=()=>{this.#i||(this.#u(),this.#e&&this.#e.isConnected&&this.#e.remove())};if(this.#t){const t=n=>{n.target===this.#t&&(this.#t.removeEventListener("transitionend",t),e())};this.#t.addEventListener("transitionend",t),this.#d=setTimeout(()=>{this.#t?.removeEventListener("transitionend",t),e()},g)}else e();this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#g(e){if(e.key==="Escape"&&!this.hasAttribute("prevent-close")){e.preventDefault(),this.close();return}if(e.key!=="Tab"||!this.#s)return;const t=this.#s.querySelectorAll(f);if(!t.length)return;const n=t[0],i=t[t.length-1],o=this.#s.getRootNode().activeElement;e.shiftKey&&o===n?(e.preventDefault(),i.focus()):!e.shiftKey&&o===i&&(e.preventDefault(),n.focus())}}customElements.define("vs-popup-slide-up",x);
