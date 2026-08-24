const b=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,p=(a,t,e)=>{if(!a.hasAttribute(t))return e;const i=a.getAttribute(t);return!(i==="false"||i==="0")},c=(a,t,e)=>a.getAttribute(t)??e,m="http://www.w3.org/2000/svg";function g(){const a=document.createElementNS(m,"svg");a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("aria-hidden","true");for(const t of["M6 6L18 18","M18 6L6 18"]){const e=document.createElementNS(m,"path");e.setAttribute("d",t),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),a.appendChild(e)}return a}function y(a){return a==="sm"?300:a==="lg"?520:380}const x=`
  :host { display: inline-flex; }
  .psh-trigger {
    appearance: none;
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-card, #111);
    color: var(--text, #ededed);
    font: inherit; font-size: 14px;
    padding: 10px 18px;
    border-radius: var(--ctrl-r-md, 10px);
    cursor: pointer;
    transition: border-color 160ms ease;
  }
  .psh-trigger:hover { border-color: var(--ui-accent, #ededed); }
`,w=`
  .psh-ov {
    position: absolute;
    inset: 0;
    background: var(--backdrop, rgba(0, 0, 0, 0.35));
  }

  .psh-panel {
    --psh-w: 380px;
    position: absolute;
    display: flex;
    flex-direction: column;
    background: var(--bg-card, #111);
    color: var(--text, #ededed);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
    outline: none;
    overflow: hidden;
  }
  .psh-panel--left, .psh-panel--right { top: 0; height: 100%; width: min(var(--psh-w), calc(100vw - 48px)); }
  .psh-panel--left { left: 0; border-right: 1px solid var(--border, #2a2a2a); }
  .psh-panel--right { right: 0; border-left: 1px solid var(--border, #2a2a2a); }
  .psh-panel--top, .psh-panel--bottom { left: 0; width: 100%; height: min(var(--psh-w), calc(100vh - 48px)); }
  .psh-panel--top { top: 0; border-bottom: 1px solid var(--border, #2a2a2a); }
  .psh-panel--bottom { bottom: 0; border-top: 1px solid var(--border, #2a2a2a); }

  .psh-panel--sm { --psh-w: 300px; }
  .psh-panel--md { --psh-w: 380px; }
  .psh-panel--lg { --psh-w: 520px; }

  .psh-panel__head {
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; padding: 18px 20px;
    border-bottom: 1px solid var(--border, #2a2a2a);
  }
  .psh-panel__title { margin: 0; font-size: 16px; font-weight: 600; color: var(--text, #ededed); }
  .psh-panel__x {
    appearance: none; border: none; background: transparent;
    color: var(--text, #ededed);
    width: 30px; height: 30px; display: grid; place-items: center;
    border-radius: var(--ctrl-r-sm, 8px); cursor: pointer;
    transition: background 140ms ease;
  }
  .psh-panel__x svg { width: 18px; height: 18px; }
  .psh-panel__x:hover { background: var(--bg-input, rgba(255, 255, 255, 0.06)); }

  .psh-panel__body { flex: 1; padding: 20px; overflow-y: auto; font-size: 14px; line-height: 1.55; color: var(--text-secondary, #c4c4c4); }
  .psh-panel__placeholder { margin: 0; }
  .psh-panel__placeholder code {
    font-family: var(--font-mono, monospace);
    padding: 1px 6px; border-radius: 6px;
    background: var(--bg-input, rgba(255, 255, 255, 0.06));
    color: var(--text, #ededed);
  }
  .psh-panel__foot {
    display: flex; justify-content: flex-end; gap: 10px;
    padding: 16px 20px; border-top: 1px solid var(--border, #2a2a2a);
  }

  .psh-panel--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .psh-panel--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .psh-panel--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  /* unique effect: panel slides while the JS-driven body push (applied by the
     host element, not this overlay) carries the rest of the page */
  .psh-ov-enter-active, .psh-ov-leave-active { transition: opacity 340ms ease; }
  .psh-ov-enter-from, .psh-ov-leave-to { opacity: 0; }

  .psh-right-enter-active, .psh-right-leave-active,
  .psh-left-enter-active, .psh-left-leave-active,
  .psh-top-enter-active, .psh-top-leave-active,
  .psh-bottom-enter-active, .psh-bottom-leave-active {
    transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .psh-right-enter-from, .psh-right-leave-to { transform: translateX(100%); }
  .psh-left-enter-from, .psh-left-leave-to { transform: translateX(-100%); }
  .psh-top-enter-from, .psh-top-leave-to { transform: translateY(-100%); }
  .psh-bottom-enter-from, .psh-bottom-leave-to { transform: translateY(100%); }

  @media (prefers-reduced-motion: reduce) {
    .psh-ov-enter-active, .psh-ov-leave-active,
    .psh-right-enter-active, .psh-right-leave-active,
    .psh-left-enter-active, .psh-left-leave-active,
    .psh-top-enter-active, .psh-top-leave-active,
    .psh-bottom-enter-active, .psh-bottom-leave-active { transition-duration: 0ms; }
  }
`;let f;function E(a){if(f||=document.createElement("canvas").getContext("2d"),!f)return null;f.fillStyle="#000",f.fillStyle=a;const t=f.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(a,t){const e=t?E(String(t).trim()):null;if(!e){for(const n of _)a.style.removeProperty(n);return}const i=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),l=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,r=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(n=>Math.round(l?n*.92:n+(255-n)*.16)),o=(n,d)=>a.style.setProperty(n,d);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(n,r);o("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(n,l?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])o(n,l?"0 0 0":"255 255 255");o("--vs-color",r),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class A extends HTMLElement{static observedAttributes=["open","side","size","title","tone","prevent-close","close-hidden","trigger-label","embed","push-scale","color"];#s;#h;#e=null;#c=null;#t=null;#u=null;#m=null;#r=null;#n=null;#x=!1;#i=!1;#w=!1;#p=null;#a=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=x,this.#s=document.createElement("button"),this.#s.type="button",this.#s.className="psh-trigger",this.#s.addEventListener("click",()=>this.#v()),this.#h=document.createElement("slot"),this.#h.name="trigger",t.append(e,this.#s,this.#h)}connectedCallback(){v(this,this.getAttribute("color")),this.#f(),this.#o()&&this.#b()}disconnectedCallback(){clearTimeout(this.#a),document.removeEventListener("keydown",this.#y,!0),document.body.style.overflow="",this.#g(!1),this.#d(),this.#i=!1,this.#p=null}attributeChangedCallback(t){if(v(this,this.getAttribute("color")),!(!this.#s||!this.isConnected)){if(t==="open"){const e=this.#o();if(e!==this.#i){e?this.#b():this.#_();return}}this.#f()}}get open(){return this.#o()}set open(t){this.setAttribute("open",t?"":"false")}show(){this.#v()}close(){this.#l()}toggle(){this.#o()?this.#l():this.#v()}#o(){return this.hasAttribute("open")?p(this,"open",!1):this.#x}#v(){this.#o()||this.#E(!0)}#l(){p(this,"prevent-close",!1)||this.#o()&&this.#E(!1)}#E(t){const e=this.hasAttribute("open");e||(this.#x=t),this.dispatchEvent(new CustomEvent(t?"open":"close",{bubbles:!0,composed:!0,detail:{open:t}})),e||(t?this.#b():this.#_())}#b(){this.#i||(this.#i=!0,this.#d(),this.#C(),this.#p=document.activeElement,document.body.style.overflow="hidden",document.body.appendChild(this.#e),this.#t.offsetWidth,this.#c.classList.remove("psh-ov-enter-from"),this.#t.classList.remove(`psh-${c(this,"side","right")}-enter-from`),this.#g(!0),document.addEventListener("keydown",this.#y,!0),this.#f(),requestAnimationFrame(()=>{this.#t&&this.#i&&this.#t.focus({preventScroll:!0})}))}#_(){if(!this.#i)return;this.#i=!1,document.removeEventListener("keydown",this.#y,!0),document.body.style.overflow="",this.#g(!1),this.#f(),this.#p?.focus?.({preventScroll:!0}),this.#p=null;const t=this.#e,e=this.#c,i=this.#t;if(!t)return;if(b()){this.#d();return}const s=c(this,"side","right");e.classList.remove("psh-ov-enter-active","psh-ov-enter-from"),e.classList.add("psh-ov-leave-active","psh-ov-leave-to"),i.classList.remove(`psh-${s}-enter-active`,`psh-${s}-enter-from`),i.classList.add(`psh-${s}-leave-active`,`psh-${s}-leave-to`);let l=2;const r=()=>{clearTimeout(this.#a),this.#e===t&&this.#d()},h=()=>{--l<=0&&r()},o=n=>{n.target!==e&&n.target!==i||(n.currentTarget.removeEventListener("transitionend",o),h())};e.addEventListener("transitionend",o),i.addEventListener("transitionend",o),clearTimeout(this.#a),this.#a=setTimeout(r,700)}#d(){clearTimeout(this.#a),this.#e&&(this.#L(),this.#e.remove(),this.#e=this.#c=this.#t=null,this.#u=this.#m=this.#r=this.#n=null)}#g(t){if(t===this.#w)return;this.#w=t;const e=Array.from(document.body.children);for(const i of e){if(i===this.#e)continue;if(!t){i.style.transition="",i.style.transform="",i.style.transformOrigin="";continue}const s=y(c(this,"size","md")),l=c(this,"side","right"),r={left:`translateX(${s}px)`,right:`translateX(-${s}px)`,top:`translateY(${s}px)`,bottom:`translateY(-${s}px)`},h=p(this,"push-scale",!0)?" scale(0.94)":"";i.style.transition="transform 380ms cubic-bezier(0.22, 1, 0.36, 1)",i.style.transformOrigin="center",i.style.transform=r[l]+h}}#C(){const t=document.createElement("div"),e=t.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=w;const s=document.createElement("div");s.className="psh-ov psh-ov-enter-active psh-ov-enter-from",s.addEventListener("click",()=>this.#l()),this.#c=s;const l=c(this,"side","right"),r=document.createElement("aside");r.className=`psh-panel psh-${l}-enter-active psh-${l}-enter-from`,r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.setAttribute("tabindex","-1"),this.#t=r;const h=document.createElement("header");h.className="psh-panel__head";const o=document.createElement("h2");o.className="psh-panel__title",this.#u=o;const n=document.createElement("button");n.type="button",n.className="psh-panel__x",n.setAttribute("aria-label","Close"),n.appendChild(g()),n.addEventListener("click",()=>this.#l()),this.#m=n,h.append(o,n);const d=document.createElement("div");d.className="psh-panel__body",this.#r=d;const u=document.createElement("footer");u.className="psh-panel__foot",this.#n=u,r.append(h,d,u),e.append(i,s,r),this.#e=t,this.#S(),this.#A()}#k(){const t=document.createElement("p");t.className="psh-panel__placeholder",t.append("Push drawer content. Pass markup via ");const e=document.createElement("code");return e.textContent="<slot>",t.append(e,"."),t}#S(){const t=[],e=[],i=s=>s.nodeType===1||s.nodeType===3&&s.textContent.trim()!=="";for(const s of Array.from(this.childNodes))s.nodeType===1&&s.getAttribute("slot")==="trigger"||i(s)&&(s.nodeType===1&&s.getAttribute("slot")==="footer"?e.push(s):t.push(s));if(t.length)for(const s of t)this.#r.appendChild(s);else this.#r.appendChild(this.#k());if(e.length){for(const s of e)this.#n.appendChild(s);this.#n.hidden=!1}else this.#n.hidden=!0}#L(){if(this.#r)for(const t of Array.from(this.#r.childNodes)){if(t.nodeType===1&&t.classList.contains("psh-panel__placeholder")){t.remove();continue}this.appendChild(t)}if(this.#n)for(const t of Array.from(this.#n.childNodes))this.appendChild(t)}#y=t=>{if(t.key==="Escape"){if(p(this,"prevent-close",!1))return;t.preventDefault(),this.#l();return}if(t.key!=="Tab"||!this.#t)return;const e=this.#t.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');if(!e.length)return;const i=e[0],s=e[e.length-1],l=this.#e&&this.#e.shadowRoot,r=l?l.activeElement:null;t.shiftKey&&r===i?(t.preventDefault(),s.focus()):!t.shiftKey&&r===s&&(t.preventDefault(),i.focus())};#f(){this.#s.textContent=c(this,"trigger-label","Open drawer");const t=p(this,"embed",!1);this.#s.hidden=t,this.#h.hidden=!t,this.#e&&this.#A()}#A(){if(!this.#t)return;const t=c(this,"side","right"),e=c(this,"size","md"),i=c(this,"tone","default"),s=[...this.#t.classList].filter(o=>o.startsWith("psh-")&&(o.includes("-enter-")||o.includes("-leave-")));this.#t.className=["psh-panel",`psh-panel--${t}`,`psh-panel--${e}`,`psh-panel--t-${i}`,...s].join(" ");const l=c(this,"title","Drawer title");this.#u.textContent=l,this.#t.setAttribute("aria-label",l);const r=p(this,"prevent-close",!1),h=p(this,"close-hidden",!1);this.#m.hidden=h||r}}customElements.define("vs-drawer-push",A);
