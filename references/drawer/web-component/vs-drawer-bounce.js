const u=`
  :host { display: inline-block; }
  .bnc-trigger {
    appearance: none;
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-card, #111);
    color: var(--text, #ededed);
    font: inherit;
    font-size: 14px;
    padding: 10px 18px;
    border-radius: var(--ctrl-r-md, 10px);
    cursor: pointer;
    transition: border-color 160ms ease;
  }
  .bnc-trigger:hover { border-color: var(--ui-accent, #ededed); }
`,f=`
  :host { all: initial; }
  * { box-sizing: border-box; }
  .bnc-root { position: fixed; inset: 0; z-index: 1000; pointer-events: none; font-family: inherit; }
  .bnc-root.is-open { pointer-events: auto; }

  .bnc-ov {
    position: absolute;
    inset: 0;
    background: var(--backdrop, rgba(0, 0, 0, 0.5));
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 320ms ease;
  }
  .bnc-ov.is-open { opacity: 1; }

  .bnc-panel {
    --bnc-w: 380px;
    --bnc-dur: 720ms;
    position: absolute;
    display: flex;
    flex-direction: column;
    background: var(--bg-card, #111);
    color: var(--text, #ededed);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    outline: none;
  }
  .bnc-panel--left, .bnc-panel--right { top: 0; height: 100%; width: min(var(--bnc-w), calc(100vw - 48px)); }
  .bnc-panel--left { left: 0; border-right: 1px solid var(--border, #2a2a2a); }
  .bnc-panel--right { right: 0; border-left: 1px solid var(--border, #2a2a2a); }
  .bnc-panel--top, .bnc-panel--bottom { left: 0; width: 100%; height: min(var(--bnc-w), calc(100vh - 48px)); }
  .bnc-panel--top { top: 0; border-bottom: 1px solid var(--border, #2a2a2a); }
  .bnc-panel--bottom { bottom: 0; border-top: 1px solid var(--border, #2a2a2a); }

  .bnc-panel--sm { --bnc-w: 300px; }
  .bnc-panel--md { --bnc-w: 380px; }
  .bnc-panel--lg { --bnc-w: 520px; }

  .bnc-panel--gentle { --bnc-dur: 620ms; }
  .bnc-panel--springy { --bnc-dur: 820ms; }

  .bnc-panel__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 20px; border-bottom: 1px solid var(--border, #2a2a2a); flex: none; }
  .bnc-panel__title { margin: 0; font-size: 16px; font-weight: 600; color: var(--text, #ededed); }
  .bnc-panel__x { appearance: none; border: none; background: transparent; color: var(--text, #ededed); width: 30px; height: 30px; display: grid; place-items: center; border-radius: var(--ctrl-r-sm, 8px); cursor: pointer; transition: background 140ms ease; }
  .bnc-panel__x svg { width: 18px; height: 18px; }
  .bnc-panel__x:hover { background: var(--bg-input, rgba(255, 255, 255, 0.06)); }
  .bnc-panel__x[hidden] { display: none; }

  .bnc-panel__body { flex: 1; padding: 20px; overflow-y: auto; font-size: 14px; line-height: 1.55; color: var(--text-secondary, #c4c4c4); }
  .bnc-panel__ph { margin: 0; }
  .bnc-panel__ph code { font-family: var(--font-mono, monospace); padding: 1px 6px; border-radius: 6px; background: var(--bg-input, rgba(255, 255, 255, 0.06)); color: var(--text, #ededed); }
  .bnc-panel__foot { display: flex; justify-content: flex-end; gap: 10px; padding: 16px 20px; border-top: 1px solid var(--border, #2a2a2a); flex: none; }
  .bnc-panel__foot[hidden] { display: none; }

  /* tone -> --accent ported 1:1 from the SFC. Note: in the source this custom
     prop is only ever read by .bnc-trigger:hover, which lives OUTSIDE the
     teleported subtree (different shadow root here, different DOM branch
     there) — so it never actually reaches the trigger in either version.
     Kept for fidelity; harmless no-op. */
  .bnc-panel--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .bnc-panel--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .bnc-panel--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  /* ── unique effect: elastic multi-bounce spring on enter ── */
  .bnc-panel--right.is-entering { animation: bnc-in-right var(--bnc-dur) both; }
  .bnc-panel--left.is-entering { animation: bnc-in-left var(--bnc-dur) both; }
  .bnc-panel--top.is-entering { animation: bnc-in-top var(--bnc-dur) both; }
  .bnc-panel--bottom.is-entering { animation: bnc-in-bottom var(--bnc-dur) both; }

  .bnc-panel.is-leaving { transition: transform 300ms cubic-bezier(0.4, 0, 1, 1); }
  .bnc-panel--right.is-leaving { transform: translateX(100%); }
  .bnc-panel--left.is-leaving { transform: translateX(-100%); }
  .bnc-panel--top.is-leaving { transform: translateY(-100%); }
  .bnc-panel--bottom.is-leaving { transform: translateY(100%); }

  @keyframes bnc-in-right {
    0% { transform: translateX(100%); }
    55% { transform: translateX(-6%); }
    72% { transform: translateX(3%); }
    86% { transform: translateX(-1.5%); }
    100% { transform: translateX(0); }
  }
  @keyframes bnc-in-left {
    0% { transform: translateX(-100%); }
    55% { transform: translateX(6%); }
    72% { transform: translateX(-3%); }
    86% { transform: translateX(1.5%); }
    100% { transform: translateX(0); }
  }
  @keyframes bnc-in-top {
    0% { transform: translateY(-100%); }
    55% { transform: translateY(6%); }
    72% { transform: translateY(-3%); }
    86% { transform: translateY(1.5%); }
    100% { transform: translateY(0); }
  }
  @keyframes bnc-in-bottom {
    0% { transform: translateY(100%); }
    55% { transform: translateY(-6%); }
    72% { transform: translateY(3%); }
    86% { transform: translateY(-1.5%); }
    100% { transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .bnc-ov { transition: none; }
    .bnc-panel--right.is-entering, .bnc-panel--left.is-entering,
    .bnc-panel--top.is-entering, .bnc-panel--bottom.is-entering { animation: none; }
    .bnc-panel.is-leaving { transition: none; }
    .bnc-panel--right.is-leaving, .bnc-panel--left.is-leaving,
    .bnc-panel--top.is-leaving, .bnc-panel--bottom.is-leaving { transform: none; }
  }
`,p="http://www.w3.org/2000/svg";function m(){const o=document.createElementNS(p,"svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("aria-hidden","true");for(const e of["M6 6L18 18","M18 6L6 18"]){const t=document.createElementNS(p,"path");t.setAttribute("d",e),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),o.appendChild(t)}return o}const g='a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',v=340,y=900;let d;function x(o){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=o;const e=d.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const E=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(o,e){const t=e?x(String(e).trim()):null;if(!t){for(const i of E)o.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),s=.2126*n(t[0])+.7152*n(t[1])+.0722*n(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,a=t.map(i=>Math.round(s?i*.92:i+(255-i)*.16)),c=(i,b)=>o.style.setProperty(i,b);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(i,l);c("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(i,t.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(i,s?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])c(i,s?"0 0 0":"255 255 255");c("--vs-color",l),c("--vs-color-rgb",t.join(" ")),c("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["open","side","size","tone","bounce","title","prevent-close","close-hidden","trigger-label","color"];#o;#b;#e=null;#s;#n;#t;#d;#i;#a;#u=null;#p=null;#h=0;#l=0;#r=!1;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=u,this.#o=document.createElement("button"),this.#o.type="button",this.#o.className="bnc-trigger";const n=document.createElement("slot");n.name="trigger",this.#b=document.createTextNode(this.getAttribute("trigger-label")||"Open drawer"),n.appendChild(this.#b),this.#o.appendChild(n),e.append(t,this.#o),this.#o.addEventListener("click",()=>this.show()),this.#p=r=>this.#E(r)}connectedCallback(){h(this,this.getAttribute("color")),this.#f()}disconnectedCallback(){clearTimeout(this.#h),clearTimeout(this.#l),document.removeEventListener("keydown",this.#p,!0),this.#r&&(document.body.style.overflow=""),this.#r=!1,this.#m(),this.#e&&this.#e.isConnected&&this.#e.remove()}attributeChangedCallback(e,t,n){if(h(this,this.getAttribute("color")),e==="open"){const r=n!==null;r!==this.#r&&(r?this.#y():this.#x());return}this.#f()}get open(){return this.hasAttribute("open")}set open(e){e?this.setAttribute("open",""):this.removeAttribute("open")}show(){this.setAttribute("open","")}close(){this.hasAttribute("prevent-close")||this.removeAttribute("open")}#f(){const e=(r,s)=>this.getAttribute(r)??s;if(this.#b.textContent=e("trigger-label","Open drawer"),!this.#t)return;this.#d.textContent=e("title","Drawer title"),this.#t.setAttribute("aria-label",e("title","Drawer title")),this.#c();const t=this.hasAttribute("prevent-close"),n=this.hasAttribute("close-hidden");this.#i.style.display=n||t?"none":""}#c(e){e===void 0&&(e=this.#t.classList.contains("is-entering")?"is-entering":this.#t.classList.contains("is-leaving")?"is-leaving":"");const t=(n,r)=>this.getAttribute(n)??r;this.#t.className=`bnc-panel bnc-panel--${t("side","right")} bnc-panel--${t("size","md")} bnc-panel--t-${t("tone","default")} bnc-panel--${t("bounce","springy")}${e?" "+e:""}`}#g(){if(this.#e)return;this.#e=document.createElement("div");const e=this.#e.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=f,this.#s=document.createElement("div"),this.#s.className="bnc-root",this.#n=document.createElement("div"),this.#n.className="bnc-ov",this.#n.setAttribute("aria-hidden","true"),this.#n.addEventListener("click",()=>{this.hasAttribute("prevent-close")||this.close()}),this.#t=document.createElement("aside"),this.#t.setAttribute("role","dialog"),this.#t.setAttribute("aria-modal","true"),this.#t.tabIndex=-1;const n=document.createElement("header");n.className="bnc-panel__head",this.#d=document.createElement("h2"),this.#d.className="bnc-panel__title",this.#i=document.createElement("button"),this.#i.type="button",this.#i.className="bnc-panel__x",this.#i.setAttribute("aria-label","Close"),this.#i.appendChild(m()),this.#i.addEventListener("click",()=>this.close()),n.append(this.#d,this.#i);const r=document.createElement("div");r.className="bnc-panel__body";const s=document.createElement("slot"),l=document.createElement("p");l.className="bnc-panel__ph",l.append("Bounce drawer content. Pass markup via ",Object.assign(document.createElement("code"),{textContent:"<slot>"}),"."),s.appendChild(l),r.appendChild(s),this.#a=document.createElement("footer"),this.#a.className="bnc-panel__foot",this.#a.hidden=!0;const a=document.createElement("slot");a.name="footer",a.addEventListener("slotchange",()=>{this.#a.hidden=a.assignedNodes({flatten:!0}).length===0}),this.#a.appendChild(a),this.#t.append(n,r,this.#a),this.#s.append(this.#n,this.#t),e.append(t,this.#s),this.#f()}#v(){const e=[...this.childNodes].filter(t=>!(t.nodeType===1&&t.getAttribute("slot")==="trigger"));for(const t of e)this.#e.appendChild(t)}#m(){if(this.#e)for(const e of[...this.#e.childNodes])this.appendChild(e)}#y(){clearTimeout(this.#h),clearTimeout(this.#l),this.#g(),this.#v(),this.#e.isConnected||document.body.appendChild(this.#e),this.#r=!0,this.#s.classList.add("is-open"),this.#u=document.activeElement,document.body.style.overflow="hidden",document.addEventListener("keydown",this.#p,!0),this.#n.classList.remove("is-open"),this.#c(""),this.#t.offsetWidth,requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(!this.#r)return;this.#n.classList.add("is-open"),this.#c("is-entering"),this.#t.focus();const e=t=>{t.target===this.#t&&(this.#t.removeEventListener("animationend",e),this.#c(""))};this.#t.addEventListener("animationend",e),clearTimeout(this.#l),this.#l=setTimeout(()=>{this.#t?.removeEventListener("animationend",e),this.#r&&this.#c("")},y)})}),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#x(){this.#r=!1,clearTimeout(this.#l),this.#s&&this.#s.classList.remove("is-open"),this.#n&&this.#n.classList.remove("is-open"),this.#t&&this.#c("is-leaving"),document.removeEventListener("keydown",this.#p,!0),document.body.style.overflow="",this.#u?.focus?.(),this.#u=null,clearTimeout(this.#h);const e=()=>{this.#r||(this.#m(),this.#e&&this.#e.isConnected&&this.#e.remove())};if(this.#t){const t=n=>{n.target===this.#t&&(this.#t.removeEventListener("transitionend",t),e())};this.#t.addEventListener("transitionend",t),this.#h=setTimeout(()=>{this.#t?.removeEventListener("transitionend",t),e()},v)}else e();this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#E(e){if(e.key==="Escape"&&!this.hasAttribute("prevent-close")){e.preventDefault(),this.close();return}if(e.key!=="Tab"||!this.#t)return;const t=this.#t.querySelectorAll(g);if(!t.length)return;const n=t[0],r=t[t.length-1],s=this.#t.getRootNode().activeElement;e.shiftKey&&s===n?(e.preventDefault(),r.focus()):!e.shiftKey&&s===r&&(e.preventDefault(),n.focus())}}customElements.define("vs-drawer-bounce",w);
