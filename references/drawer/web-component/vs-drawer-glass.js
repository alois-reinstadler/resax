const v=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,p=(o,e,t)=>{if(!o.hasAttribute(e))return t;const n=o.getAttribute(e);return!(n==="false"||n==="0")},h=(o,e,t)=>o.getAttribute(e)??t,x='a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',b="http://www.w3.org/2000/svg";function y(){const o=document.createElementNS(b,"svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("aria-hidden","true");for(const e of["M6 6L18 18","M18 6L6 18"]){const t=document.createElementNS(b,"path");t.setAttribute("d",e),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),o.appendChild(t)}return o}const w=`
  :host { display: inline-flex; }
  .gls-trigger {
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
  .gls-trigger:hover { border-color: var(--ui-accent, #ededed); }
  @media (prefers-reduced-motion: reduce) { .gls-trigger { transition: none; } }
`,C=`
.gls-root { position: fixed; inset: 0; z-index: 1000; pointer-events: auto; }

.gls-ov {
  position: absolute;
  inset: 0;
  background: var(--backdrop, rgba(0, 0, 0, 0.35));
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}
.gls-ov.gls-ov-enter-active, .gls-ov.gls-ov-leave-active { transition: opacity 320ms ease; }
.gls-ov.gls-ov-enter-from, .gls-ov.gls-ov-leave-to { opacity: 0; }

/* ── unique effect: frosted translucent glass surface ── */
.gls-panel {
  --gls-w: 380px;
  --gls-glass: color-mix(in srgb, var(--bg-card, #111) 55%, transparent);
  position: absolute;
  display: flex;
  flex-direction: column;
  background: var(--gls-glass);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  color: var(--text, #ededed);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  outline: none;
  overflow: hidden;
}
.gls-panel--frost-subtle { --gls-glass: color-mix(in srgb, var(--bg-card, #111) 72%, transparent); backdrop-filter: blur(10px) saturate(130%); -webkit-backdrop-filter: blur(10px) saturate(130%); }
.gls-panel--frost-heavy { --gls-glass: color-mix(in srgb, var(--bg-card, #111) 48%, transparent); backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%); }

.gls-panel--left, .gls-panel--right { top: 0; height: 100%; width: min(var(--gls-w), calc(100vw - 48px)); }
.gls-panel--left { left: 0; border-right: 1px solid var(--border, #2a2a2a); }
.gls-panel--right { right: 0; border-left: 1px solid var(--border, #2a2a2a); }
.gls-panel--top, .gls-panel--bottom { left: 0; width: 100%; height: min(var(--gls-w), calc(100vh - 48px)); }
.gls-panel--top { top: 0; border-bottom: 1px solid var(--border, #2a2a2a); }
.gls-panel--bottom { bottom: 0; border-top: 1px solid var(--border, #2a2a2a); }

.gls-panel--sm { --gls-w: 300px; }
.gls-panel--md { --gls-w: 380px; }
.gls-panel--lg { --gls-w: 520px; }

.gls-panel__head {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; padding: 18px 20px;
  border-bottom: 1px solid var(--border, #2a2a2a);
}
.gls-panel__title { margin: 0; font-size: 16px; font-weight: 600; color: var(--text, #ededed); }
.gls-panel__x {
  appearance: none; border: none; background: transparent;
  color: var(--text, #ededed);
  width: 30px; height: 30px; display: grid; place-items: center;
  border-radius: var(--ctrl-r-sm, 8px); cursor: pointer;
  transition: background 140ms ease;
}
.gls-panel__x svg { width: 18px; height: 18px; }
.gls-panel__x:hover { background: var(--bg-input, rgba(255, 255, 255, 0.06)); }

.gls-panel__body { flex: 1; padding: 20px; overflow-y: auto; font-size: 14px; line-height: 1.55; color: var(--text-secondary, #c4c4c4); }
.gls-panel__placeholder { margin: 0; }
.gls-panel__placeholder code {
  font-family: var(--font-mono, monospace);
  padding: 1px 6px; border-radius: 6px;
  background: var(--bg-input, rgba(255, 255, 255, 0.06));
  color: var(--text, #ededed);
}
.gls-panel__foot {
  display: flex; justify-content: flex-end; gap: 10px;
  padding: 16px 20px; border-top: 1px solid var(--border, #2a2a2a);
}

.gls-panel--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
.gls-panel--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
.gls-panel--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

.gls-panel.gls-enter-active, .gls-panel.gls-leave-active {
  transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1), opacity 380ms ease;
}
.gls-panel--right.gls-enter-from, .gls-panel--right.gls-leave-to { transform: translateX(100%); opacity: 0.4; }
.gls-panel--left.gls-enter-from, .gls-panel--left.gls-leave-to { transform: translateX(-100%); opacity: 0.4; }
.gls-panel--top.gls-enter-from, .gls-panel--top.gls-leave-to { transform: translateY(-100%); opacity: 0.4; }
.gls-panel--bottom.gls-enter-from, .gls-panel--bottom.gls-leave-to { transform: translateY(100%); opacity: 0.4; }

@media (prefers-reduced-motion: reduce) {
  .gls-ov.gls-ov-enter-active, .gls-ov.gls-ov-leave-active,
  .gls-panel.gls-enter-active, .gls-panel.gls-leave-active { transition: none; }
}
`;let g;function E(o){if(g||=document.createElement("canvas").getContext("2d"),!g)return null;g.fillStyle="#000",g.fillStyle=o;const e=g.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const k=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(o,e){const t=e?E(String(e).trim()):null;if(!t){for(const r of k)o.style.removeProperty(r);return}const n=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),i=.2126*n(t[0])+.7152*n(t[1])+.0722*n(t[2])>.45,a=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(r=>Math.round(i?r*.92:r+(255-r)*.16)),l=(r,f)=>o.style.setProperty(r,f);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(r,a);l("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(r,i?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])l(r,i?"0 0 0":"255 255 255");l("--vs-color",a),l("--vs-color-rgb",t.join(" ")),l("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["open","side","size","title","tone","frost","prevent-close","close-hidden","trigger-label","color"];#e;#s=null;#b=null;#t=null;#a=null;#i=null;#n=null;#c=null;#d="";#h="";#p="";#g="";#m=null;#v=null;#k=!1;#r=!1;#x=!1;#o=null;#f=0;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=w,this.#e=document.createElement("button"),this.#e.type="button",this.#e.className="gls-trigger",this.#e.addEventListener("click",()=>this.#C()),e.append(t,this.#e)}connectedCallback(){m(this,this.getAttribute("color")),this.#w(),this.#l()&&this.#E()}disconnectedCallback(){clearTimeout(this.#f),this.#S(),this.#y(),this.#r&&(document.body.style.overflow=""),this.#r=!1,this.#o=null}attributeChangedCallback(e){if(m(this,this.getAttribute("color")),!this.#e)return;if(e==="trigger-label"){this.#e.textContent=h(this,"trigger-label","Open drawer");return}if(!this.isConnected)return;const t=this.#l();if(t!==this.#r){t?this.#E():this.#A();return}this.#w()}get open(){return this.#l()}set open(e){this.setAttribute("open",e?"":"false")}show(){this.#C()}close(){this.#u()}toggle(){this.#l()?this.#u():this.#C()}#l(){return this.hasAttribute("open")?p(this,"open",!1):this.#k}#C(){this.#l()||this.#_(!0)}#u(){p(this,"prevent-close",!1)||this.#l()&&this.#_(!1)}#_(e){const t=this.hasAttribute("open");t||(this.#k=e),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{open:e}})),e||this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),t||(e?this.#E():this.#A())}#E(){this.#r||(this.#r=!0,this.#o=document.activeElement,this.#y(),this.#$(),document.body.style.overflow="hidden",document.body.appendChild(this.#s),this.#t.offsetWidth,this.#t.classList.remove("gls-enter-from"),this.#b.classList.remove("gls-ov-enter-from"),this.#z(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0})),this.#w(),requestAnimationFrame(()=>{this.#t&&this.#r&&this.#t.focus({preventScroll:!0})}))}#A(){if(!this.#r)return;this.#r=!1,this.#S(),document.body.style.overflow="",this.#w(),this.isConnected&&(this.#o&&this.#o.isConnected?this.#o:this.#e).focus({preventScroll:!0}),this.#o=null;const e=this.#s,t=this.#t,n=this.#b;if(!e)return;if(v()){this.#y();return}t.classList.remove("gls-enter-active","gls-enter-from"),t.classList.add("gls-leave-active","gls-leave-to"),n.classList.remove("gls-ov-enter-active","gls-ov-enter-from"),n.classList.add("gls-ov-leave-active","gls-ov-leave-to");let s=2;const i=()=>{clearTimeout(this.#f),this.#s===e&&this.#y()},a=()=>{--s<=0&&i()},c=l=>{l.target!==t&&l.target!==n||(l.currentTarget.removeEventListener("transitionend",c),a())};t.addEventListener("transitionend",c),n.addEventListener("transitionend",c),clearTimeout(this.#f),this.#f=setTimeout(i,700)}#y(){clearTimeout(this.#f),this.#T(),this.#s&&(this.#s.remove(),this.#s=this.#b=this.#t=null,this.#a=this.#i=this.#n=this.#c=null,this.#d=this.#h=this.#p=this.#g="")}#O(){const e=[],t=[];for(const s of Array.from(this.childNodes)){if(s.nodeType===1&&s.getAttribute("slot")==="footer"){t.push(s);continue}e.push(s)}const n=e.some(s=>s.nodeType===1||s.nodeType===3&&s.textContent.trim());return{body:e,footer:t,hasBody:n,hasFooter:t.length>0}}#T(){if(this.#m){for(const e of this.#m)this.appendChild(e);this.#m=null}if(this.#v){for(const e of this.#v)this.appendChild(e);this.#v=null}}#$(){const e=document.createElement("div");e.className="gls-root";const t=e.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent=C;const s=document.createElement("div");s.className="gls-ov gls-ov-enter-active gls-ov-enter-from",s.setAttribute("aria-hidden","true"),s.addEventListener("click",()=>this.#u()),this.#b=s;const i=document.createElement("aside");i.className="gls-panel gls-enter-active gls-enter-from",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("tabindex","-1"),this.#t=i;const a=document.createElement("header");a.className="gls-panel__head",this.#a=document.createElement("h2"),this.#a.className="gls-panel__title",this.#i=document.createElement("button"),this.#i.type="button",this.#i.className="gls-panel__x",this.#i.setAttribute("aria-label","Close"),this.#i.appendChild(y()),this.#i.addEventListener("click",()=>this.#u()),a.append(this.#a,this.#i),this.#n=document.createElement("div"),this.#n.className="gls-panel__body",this.#c=document.createElement("footer"),this.#c.className="gls-panel__foot";const{body:c,footer:l,hasBody:r,hasFooter:f}=this.#O();if(r){this.#m=c;for(const d of c)this.#n.appendChild(d)}else{const d=document.createElement("p");d.className="gls-panel__placeholder",d.append("Glass drawer content. Pass markup via ");const u=document.createElement("code");u.textContent="<slot>",d.append(u,"."),this.#n.appendChild(d)}if(f){this.#v=l;for(const d of l)this.#c.appendChild(d)}i.append(a,this.#n),f&&i.appendChild(this.#c),t.append(n,s,i),this.#s=e,this.#L()}#L(){if(!this.#t)return;const e=h(this,"side","right"),t=h(this,"size","md"),n=h(this,"tone","default"),s=h(this,"frost","heavy");this.#d&&this.#t.classList.remove(this.#d),this.#d=`gls-panel--${e}`,this.#t.classList.add(this.#d),this.#h&&this.#t.classList.remove(this.#h),this.#h=`gls-panel--${t}`,this.#t.classList.add(this.#h),this.#p&&this.#t.classList.remove(this.#p),this.#p=`gls-panel--t-${n}`,this.#t.classList.add(this.#p),this.#g&&this.#t.classList.remove(this.#g),this.#g=`gls-panel--frost-${s}`,this.#t.classList.add(this.#g);const i=h(this,"title","Drawer title");this.#a.textContent=i,this.#t.setAttribute("aria-label",i);const a=!p(this,"close-hidden",!1)&&!p(this,"prevent-close",!1);this.#i.style.display=a?"":"none"}#z(){this.#x||(this.#x=!0,document.addEventListener("keydown",this.#N,!0))}#S(){this.#x&&(this.#x=!1,document.removeEventListener("keydown",this.#N,!0))}#N=e=>{if(e.key==="Escape"){if(p(this,"prevent-close",!1))return;e.preventDefault(),this.#u();return}if(e.key!=="Tab"||!this.#t)return;const t=this.#t.querySelectorAll(x);if(!t.length)return;const n=t[0],s=t[t.length-1],i=this.#s?.shadowRoot?.activeElement;e.shiftKey&&i===n?(e.preventDefault(),s.focus()):!e.shiftKey&&i===s&&(e.preventDefault(),n.focus())};#w(){this.#e.textContent=h(this,"trigger-label","Open drawer"),this.#s&&this.#L()}}customElements.define("vs-drawer-glass",_);
