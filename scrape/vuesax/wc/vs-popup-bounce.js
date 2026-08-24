const u=`
  :host { display: inline-block; }
  .vpb__trigger {
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
  .vpb__trigger:hover { opacity: 0.9; }
`,v=`
  :host { all: initial; }
  * { box-sizing: border-box; }
  .vpb__overlay {
    position: fixed;
    inset: 0;
    /* Above every piece of page chrome — a fixed bottom blur band or a floating
       mobile nav at 1100-1200 would otherwise repaint over the dialog. */
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(0, 0, 0, 0.55);
    font-family: inherit;
    opacity: 0;
    transition: opacity 280ms ease;
  }
  .vpb__overlay.is-leaving { transition: opacity 200ms ease; }
  .vpb__overlay.is-open { opacity: 1; }
  .vpb__panel {
    --vpw: 460px;
    display: flex;
    flex-direction: column;
    width: min(var(--vpw), calc(100vw - 48px));
    max-height: calc(100vh - 48px);
    border-radius: 16px;
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-card, #111);
    color: var(--text, #ededed);
    box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.6);
    overflow: hidden;
    outline: none;
    transform: translateY(-90px) scale(0.96);
    opacity: 0;
    transition: transform 220ms cubic-bezier(0.4, 0, 1, 1), opacity 200ms ease;
  }
  .vpb__overlay.is-open .vpb__panel {
    transform: translateY(0) scale(1);
    opacity: 1;
    transition: transform 560ms cubic-bezier(0.3, 1.8, 0.5, 1), opacity 240ms ease;
  }
  .vpb__panel--sm { --vpw: 360px; }
  .vpb__panel--md { --vpw: 460px; }
  .vpb__panel--lg { --vpw: 640px; }

  .vpb__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 20px; border-bottom: 1px solid var(--border, #2a2a2a); flex: none; }
  .vpb__title { margin: 0; font-size: 16px; font-weight: 600; }
  .vpb__close { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; padding: 0; border: none; border-radius: 8px; background: transparent; color: var(--text-secondary, #a1a1a1); cursor: pointer; transition: background-color 160ms ease, color 160ms ease; }
  .vpb__close:hover { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.08)); color: var(--text, #ededed); }
  .vpb__close svg { width: 18px; height: 18px; display: block; }
  .vpb__close[hidden] { display: none; }
  .vpb__body { padding: 20px; overflow-y: auto; font-size: 14px; line-height: 1.55; color: var(--text-secondary, #c4c4c4); }
  .vpb__ph { margin: 0; }
  .vpb__ph code { font-family: var(--font-mono, monospace); padding: 1px 6px; border-radius: 6px; background: var(--bg-input, rgba(255, 255, 255, 0.06)); color: var(--text, #ededed); }
  .vpb__foot { display: flex; justify-content: flex-end; gap: 10px; padding: 16px 20px; border-top: 1px solid var(--border, #2a2a2a); flex: none; }
  .vpb__foot[hidden] { display: none; }

  @media (prefers-reduced-motion: reduce) {
    .vpb__overlay, .vpb__overlay.is-open, .vpb__overlay.is-leaving,
    .vpb__panel, .vpb__overlay.is-open .vpb__panel { transition-duration: 0ms; }
    .vpb__panel, .vpb__overlay.is-open .vpb__panel { transform: none; }
  }
`,d="http://www.w3.org/2000/svg";function m(){const r=document.createElementNS(d,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("aria-hidden","true");for(const e of["M6 6L18 18","M18 6L6 18"]){const t=document.createElementNS(d,"path");t.setAttribute("d",e),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),r.appendChild(t)}return r}const f='a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',g=260;let p;function _(r){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=r;const e=p.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(r,e){const t=e?_(String(e).trim()):null;if(!t){for(const i of y)r.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),s=.2126*n(t[0])+.7152*n(t[1])+.0722*n(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(i=>Math.round(s?i*.92:i+(255-i)*.16)),a=(i,b)=>r.style.setProperty(i,b);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(i,c);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(i,t.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(i,s?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])a(i,s?"0 0 0":"255 255 255");a("--vs-color",c),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["open","title","size","prevent-close","close-hidden","trigger-label","color"];#s;#p;#e=null;#t;#n;#a;#i;#r;#d=null;#l=null;#c=0;#o=!1;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=u,this.#s=document.createElement("button"),this.#s.type="button",this.#s.className="vpb__trigger";const n=document.createElement("slot");n.name="trigger",this.#p=document.createTextNode(this.getAttribute("trigger-label")||"Open popup"),n.appendChild(this.#p),this.#s.appendChild(n),e.append(t,this.#s),this.#s.addEventListener("click",()=>this.show()),this.#l=o=>this.#g(o)}connectedCallback(){h(this,this.getAttribute("color")),this.#h()}disconnectedCallback(){clearTimeout(this.#c),document.removeEventListener("keydown",this.#l,!0),this.#o&&(document.body.style.overflow=""),this.#o=!1,this.#b(),this.#e&&this.#e.isConnected&&this.#e.remove()}attributeChangedCallback(e,t,n){if(h(this,this.getAttribute("color")),e==="open"){const o=n!==null;o!==this.#o&&(o?this.#m():this.#f());return}this.#h()}get open(){return this.hasAttribute("open")}set open(e){e?this.setAttribute("open",""):this.removeAttribute("open")}show(){this.setAttribute("open","")}close(){this.hasAttribute("prevent-close")||this.removeAttribute("open")}#h(){const e=(o,s)=>this.getAttribute(o)??s;if(this.#p.textContent=e("trigger-label","Open popup"),!this.#n)return;this.#a.textContent=e("title","Popup title"),this.#n.setAttribute("aria-label",e("title","Popup title")),this.#n.className=`vpb__panel vpb__panel--${e("size","md")}`;const t=this.hasAttribute("prevent-close"),n=this.hasAttribute("close-hidden");this.#i.style.display=n||t?"none":""}#u(){if(this.#e)return;this.#e=document.createElement("div");const e=this.#e.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=v,this.#t=document.createElement("div"),this.#t.className="vpb__overlay",this.#n=document.createElement("div"),this.#n.className="vpb__panel vpb__panel--md",this.#n.setAttribute("role","dialog"),this.#n.setAttribute("aria-modal","true"),this.#n.tabIndex=-1;const n=document.createElement("header");n.className="vpb__head",this.#a=document.createElement("h2"),this.#a.className="vpb__title",this.#i=document.createElement("button"),this.#i.type="button",this.#i.className="vpb__close",this.#i.setAttribute("aria-label","Close"),this.#i.appendChild(m()),this.#i.addEventListener("click",()=>this.close()),n.append(this.#a,this.#i);const o=document.createElement("div");o.className="vpb__body";const s=document.createElement("slot"),c=document.createElement("p");c.className="vpb__ph",c.append("Popup content. Pass your markup via ",Object.assign(document.createElement("code"),{textContent:"<slot>"}),"."),s.appendChild(c),o.appendChild(s),this.#r=document.createElement("footer"),this.#r.className="vpb__foot",this.#r.hidden=!0;const l=document.createElement("slot");l.name="footer",l.addEventListener("slotchange",()=>{this.#r.hidden=l.assignedNodes({flatten:!0}).length===0}),this.#r.appendChild(l),this.#n.append(n,o,this.#r),this.#t.appendChild(this.#n),e.append(t,this.#t),this.#t.addEventListener("mousedown",a=>{a.target===this.#t&&!this.hasAttribute("prevent-close")&&this.close()}),this.#h()}#v(){const e=[...this.childNodes].filter(t=>!(t.nodeType===1&&t.getAttribute("slot")==="trigger"));for(const t of e)this.#e.appendChild(t)}#b(){if(this.#e)for(const e of[...this.#e.childNodes])this.appendChild(e)}#m(){clearTimeout(this.#c),this.#u(),this.#v(),this.#e.isConnected||document.body.appendChild(this.#e),this.#o=!0,this.#d=document.activeElement,document.body.style.overflow="hidden",document.addEventListener("keydown",this.#l,!0),this.#t.classList.remove("is-open","is-leaving"),this.#t.offsetHeight,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.#o&&(this.#t.classList.add("is-open"),this.#n.focus())})}),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#f(){this.#o=!1,this.#t&&(this.#t.classList.remove("is-open"),this.#t.classList.add("is-leaving")),document.removeEventListener("keydown",this.#l,!0),document.body.style.overflow="",this.#d?.focus?.(),this.#d=null,clearTimeout(this.#c);const e=()=>{this.#o||(this.#b(),this.#e&&this.#e.isConnected&&this.#e.remove())};if(this.#t){const t=n=>{n.target===this.#t&&(this.#t.removeEventListener("transitionend",t),e())};this.#t.addEventListener("transitionend",t),this.#c=setTimeout(()=>{this.#t?.removeEventListener("transitionend",t),e()},g)}else e();this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#g(e){if(e.key==="Escape"&&!this.hasAttribute("prevent-close")){e.preventDefault(),this.close();return}if(e.key!=="Tab"||!this.#n)return;const t=this.#n.querySelectorAll(f);if(!t.length)return;const n=t[0],o=t[t.length-1],s=this.#n.getRootNode().activeElement;e.shiftKey&&s===n?(e.preventDefault(),o.focus()):!e.shiftKey&&s===o&&(e.preventDefault(),n.focus())}}customElements.define("vs-popup-bounce",x);
