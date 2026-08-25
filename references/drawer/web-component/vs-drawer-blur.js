const g=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,h=(o,e,t)=>{if(!o.hasAttribute(e))return t;const r=o.getAttribute(e);return!(r==="false"||r==="0")},p=(o,e,t)=>o.getAttribute(e)??t,y=(o,e,t)=>{const r=parseFloat(o.getAttribute(e));return Number.isFinite(r)?r:t},x='a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',m="http://www.w3.org/2000/svg";function w(){const o=document.createElementNS(m,"svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("aria-hidden","true");for(const e of["M6 6L18 18","M18 6L6 18"]){const t=document.createElementNS(m,"path");t.setAttribute("d",e),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),o.appendChild(t)}return o}const E=`
  :host { display: inline-flex; }
  .blr-trigger {
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
  .blr-trigger:hover { border-color: var(--ui-accent, #ededed); }
`,C=`
  .blr-root { position: fixed; inset: 0; z-index: 1000; pointer-events: none; }
  .blr-root.is-open { pointer-events: auto; }

  .blr-ov {
    position: absolute;
    inset: 0;
    background: var(--backdrop, rgba(0, 0, 0, 0.5));
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
  }

  .blr-panel {
    --blr-w: 380px;
    position: absolute;
    display: flex;
    flex-direction: column;
    background: var(--bg-card, #111);
    color: var(--text, #ededed);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    outline: none;
    overflow: hidden;
    will-change: filter, opacity, transform;
  }
  .blr-panel--left, .blr-panel--right { top: 0; height: 100%; width: min(var(--blr-w), calc(100vw - 48px)); }
  .blr-panel--left { left: 0; border-right: 1px solid var(--border, #2a2a2a); }
  .blr-panel--right { right: 0; border-left: 1px solid var(--border, #2a2a2a); }
  .blr-panel--top, .blr-panel--bottom { left: 0; width: 100%; height: min(var(--blr-w), calc(100vh - 48px)); }
  .blr-panel--top { top: 0; border-bottom: 1px solid var(--border, #2a2a2a); }
  .blr-panel--bottom { bottom: 0; border-top: 1px solid var(--border, #2a2a2a); }

  .blr-panel--sm { --blr-w: 300px; }
  .blr-panel--md { --blr-w: 380px; }
  .blr-panel--lg { --blr-w: 520px; }

  .blr-panel__head {
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; padding: 18px 20px;
    border-bottom: 1px solid var(--border, #2a2a2a);
  }
  .blr-panel__title { margin: 0; font-size: 16px; font-weight: 600; color: var(--text, #ededed); }
  .blr-panel__x {
    appearance: none; border: none; background: transparent;
    color: var(--text, #ededed);
    width: 30px; height: 30px; display: grid; place-items: center;
    border-radius: var(--ctrl-r-sm, 8px); cursor: pointer;
    transition: background 140ms ease;
  }
  .blr-panel__x svg { width: 18px; height: 18px; }
  .blr-panel__x:hover { background: var(--bg-input, rgba(255, 255, 255, 0.06)); }

  .blr-panel__body { flex: 1; padding: 20px; overflow-y: auto; font-size: 14px; line-height: 1.55; color: var(--text-secondary, #c4c4c4); }
  .blr-panel__placeholder { margin: 0; }
  .blr-panel__placeholder code {
    font-family: var(--font-mono, monospace);
    padding: 1px 6px; border-radius: 6px;
    background: var(--bg-input, rgba(255, 255, 255, 0.06));
    color: var(--text, #ededed);
  }
  .blr-panel__foot {
    display: flex; justify-content: flex-end; gap: 10px;
    padding: 16px 20px; border-top: 1px solid var(--border, #2a2a2a);
  }

  .blr-panel--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .blr-panel--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .blr-panel--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  /* unique effect: focus-pull. panel de-blurs + fades into sharpness with a
     tiny directional nudge, per the side it's docked on. */
  .blr-ov-enter-active, .blr-ov-leave-active { transition: opacity 340ms ease; }
  .blr-ov-enter-from, .blr-ov-leave-to { opacity: 0; }

  .blr-panel-t-enter-active { transition: filter 420ms ease, opacity 420ms ease, transform 420ms cubic-bezier(0.22, 1, 0.36, 1); }
  .blr-panel-t-leave-active { transition: filter 300ms ease, opacity 300ms ease, transform 300ms ease; }
  .blr-panel-t-enter-from, .blr-panel-t-leave-to { filter: blur(var(--blr-amt, 16px)); opacity: 0; }
  .blr-panel-t-enter-from.blr-panel--right, .blr-panel-t-leave-to.blr-panel--right { transform: translateX(8%); }
  .blr-panel-t-enter-from.blr-panel--left, .blr-panel-t-leave-to.blr-panel--left { transform: translateX(-8%); }
  .blr-panel-t-enter-from.blr-panel--top, .blr-panel-t-leave-to.blr-panel--top { transform: translateY(-8%); }
  .blr-panel-t-enter-from.blr-panel--bottom, .blr-panel-t-leave-to.blr-panel--bottom { transform: translateY(8%); }

  @media (prefers-reduced-motion: reduce) {
    .blr-ov-enter-active, .blr-ov-leave-active,
    .blr-panel-t-enter-active, .blr-panel-t-leave-active { transition: none; }
    .blr-panel-t-enter-from, .blr-panel-t-leave-to { filter: none; }
  }
`;let b;function A(o){if(b||=document.createElement("canvas").getContext("2d"),!b)return null;b.fillStyle="#000",b.fillStyle=o;const e=b.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(o,e){const t=e?A(String(e).trim()):null;if(!t){for(const s of _)o.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),i=.2126*r(t[0])+.7152*r(t[1])+.0722*r(t[2])>.45,a=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(s=>Math.round(i?s*.92:s+(255-s)*.16)),l=(s,f)=>o.style.setProperty(s,f);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(s,a);l("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(s,t.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(s,i?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])l(s,i?"0 0 0":"255 255 255");l("--vs-color",a),l("--vs-color-rgb",t.join(" ")),l("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class k extends HTMLElement{static observedAttributes=["open","side","size","title","tone","prevent-close","close-hidden","trigger-label","embed","blur-amount","color"];#e;#s;#r=null;#C=null;#m=null;#t=null;#c=null;#n=null;#o=null;#d=null;#h="";#p="";#b="";#v=null;#g=null;#_=!1;#i=!1;#y=!1;#l=null;#f=0;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=E,this.#e=document.createElement("button"),this.#e.type="button",this.#e.className="blr-trigger",this.#e.addEventListener("click",()=>this.#x()),this.#s=document.createElement("slot"),this.#s.name="trigger",this.#s.hidden=!0,this.#s.addEventListener("click",()=>this.#x()),e.append(t,this.#e,this.#s)}connectedCallback(){v(this,this.getAttribute("color")),this.#E(),this.#a()&&this.#A()}disconnectedCallback(){clearTimeout(this.#f),this.#N(),this.#w(),this.#i&&(document.body.style.overflow=""),this.#i=!1,this.#l=null}attributeChangedCallback(e){if(v(this,this.getAttribute("color")),!!this.#e&&this.isConnected){if(e==="open"){const t=this.#a();if(t!==this.#i){t?this.#A():this.#L();return}}this.#E()}}get open(){return this.#a()}set open(e){this.setAttribute("open",e?"":"false")}show(){this.#x()}close(){this.#u()}toggle(){this.#a()?this.#u():this.#x()}#a(){return this.hasAttribute("open")?h(this,"open",!1):this.#_}#x(){this.#a()||this.#k(!0)}#u(){h(this,"prevent-close",!1)||this.#a()&&this.#k(!1)}#k(e){const t=this.hasAttribute("open");t||(this.#_=e),this.dispatchEvent(new CustomEvent(e?"open":"close",{bubbles:!0,composed:!0})),t||(e?this.#A():this.#L())}#A(){this.#i||(this.#i=!0,this.#l=document.activeElement,this.#w(),this.#$(),document.body.style.overflow="hidden",document.body.appendChild(this.#r),this.#t.offsetWidth,this.#t.classList.remove("blr-panel-t-enter-from"),this.#m.classList.remove("blr-ov-enter-from"),this.#r.classList.add("is-open"),this.#z(),this.#E(),requestAnimationFrame(()=>{this.#t&&this.#i&&this.#t.focus({preventScroll:!0})}))}#L(){if(!this.#i)return;this.#i=!1,this.#N(),document.body.style.overflow="",this.#E(),this.isConnected&&(this.#l&&this.#l.isConnected?this.#l:this.#e).focus({preventScroll:!0}),this.#l=null;const e=this.#r,t=this.#t,r=this.#m;if(!e)return;if(e.classList.remove("is-open"),g()){this.#w();return}t.classList.remove("blr-panel-t-enter-active","blr-panel-t-enter-from"),t.classList.add("blr-panel-t-leave-active","blr-panel-t-leave-to"),r.classList.remove("blr-ov-enter-active","blr-ov-enter-from"),r.classList.add("blr-ov-leave-active","blr-ov-leave-to");let n=2;const i=()=>{clearTimeout(this.#f),this.#r===e&&this.#w()},a=()=>{--n<=0&&i()},c=l=>{l.target!==t&&l.target!==r||(l.currentTarget.removeEventListener("transitionend",c),a())};t.addEventListener("transitionend",c),r.addEventListener("transitionend",c),clearTimeout(this.#f),this.#f=setTimeout(i,700)}#w(){clearTimeout(this.#f),this.#O(),this.#r&&(this.#r.remove(),this.#r=this.#C=this.#m=this.#t=null,this.#c=this.#n=this.#o=this.#d=null,this.#h=this.#p=this.#b="")}#B(){const e=[],t=[];for(const n of Array.from(this.childNodes))if(!(n.nodeType===1&&n.getAttribute("slot")==="trigger")){if(n.nodeType===1&&n.getAttribute("slot")==="footer"){t.push(n);continue}e.push(n)}const r=e.some(n=>n.nodeType===1||n.nodeType===3&&n.textContent.trim());return{body:e,footer:t,hasBody:r,hasFooter:t.length>0}}#O(){if(this.#v){for(const e of this.#v)this.appendChild(e);this.#v=null}if(this.#g){for(const e of this.#g)this.appendChild(e);this.#g=null}}#$(){const e=document.createElement("div");e.className="blr-root";const t=e.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=C;const n=document.createElement("div");n.className="blr-ov blr-ov-enter-active blr-ov-enter-from",n.setAttribute("aria-hidden","true"),n.addEventListener("click",()=>this.#u()),this.#m=n;const i=document.createElement("aside");i.className="blr-panel blr-panel-t-enter-active blr-panel-t-enter-from",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("tabindex","-1"),this.#t=i;const a=document.createElement("header");a.className="blr-panel__head",this.#c=document.createElement("h2"),this.#c.className="blr-panel__title",this.#n=document.createElement("button"),this.#n.type="button",this.#n.className="blr-panel__x",this.#n.setAttribute("aria-label","Close"),this.#n.appendChild(w()),this.#n.addEventListener("click",()=>this.#u()),a.append(this.#c,this.#n),this.#o=document.createElement("div"),this.#o.className="blr-panel__body",this.#d=document.createElement("footer"),this.#d.className="blr-panel__foot";const{body:c,footer:l,hasBody:s,hasFooter:f}=this.#B();if(s){this.#v=c;for(const d of c)this.#o.appendChild(d)}else{const d=document.createElement("p");d.className="blr-panel__placeholder",d.append("Blur drawer content. Pass markup via ");const u=document.createElement("code");u.textContent="<slot>",d.append(u,"."),this.#o.appendChild(d)}if(f){this.#g=l;for(const d of l)this.#d.appendChild(d)}i.append(a,this.#o),f&&i.appendChild(this.#d),t.append(r,n,i),this.#C=t,this.#r=e,this.#S()}#S(){if(!this.#t)return;const e=p(this,"side","right"),t=p(this,"size","md"),r=p(this,"tone","default"),n=y(this,"blur-amount",16);this.#h&&this.#t.classList.remove(this.#h),this.#h=`blr-panel--${e}`,this.#t.classList.add(this.#h),this.#p&&this.#t.classList.remove(this.#p),this.#p=`blr-panel--${t}`,this.#t.classList.add(this.#p),this.#b&&this.#t.classList.remove(this.#b),this.#b=`blr-panel--t-${r}`,this.#t.classList.add(this.#b),this.#r.style.setProperty("--blr-amt",`${n}px`);const i=p(this,"title","Drawer title");this.#c.textContent=i,this.#t.setAttribute("aria-label",i);const a=!h(this,"close-hidden",!1)&&!h(this,"prevent-close",!1);this.#n.style.display=a?"":"none"}#z(){this.#y||(this.#y=!0,document.addEventListener("keydown",this.#T,!0))}#N(){this.#y&&(this.#y=!1,document.removeEventListener("keydown",this.#T,!0))}#T=e=>{if(e.key==="Escape"){if(h(this,"prevent-close",!1))return;e.preventDefault(),this.#u();return}if(e.key!=="Tab"||!this.#t)return;const t=this.#t.querySelectorAll(x);if(!t.length)return;const r=t[0],n=t[t.length-1],i=this.#C?.activeElement;e.shiftKey&&i===r?(e.preventDefault(),n.focus()):!e.shiftKey&&i===n&&(e.preventDefault(),r.focus())};#E(){const e=h(this,"embed",!1);this.#e.hidden=e,this.#s.hidden=!e,this.#e.textContent=p(this,"trigger-label","Open drawer"),this.#t&&this.#S()}}customElements.define("vs-drawer-blur",k);
