const g=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,d=(r,e,t)=>{if(!r.hasAttribute(e))return t;const i=r.getAttribute(e);return!(i==="false"||i==="0")},f=(r,e,t)=>r.getAttribute(e)??t,y='a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',m="http://www.w3.org/2000/svg";function x(){const r=document.createElementNS(m,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("aria-hidden","true");for(const e of["M6 6L18 18","M18 6L6 18"]){const t=document.createElementNS(m,"path");t.setAttribute("d",e),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),r.appendChild(t)}return r}const z=`
  :host { display: inline-flex; }
  .vpz__trigger {
    height: var(--ctrl-h-md, 40px);
    padding: 0 16px;
    border-radius: 12px;
    border: 1px solid transparent;
    background: var(--btn-primary-bg, #ededed);
    color: var(--btn-primary-fg, #000);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 160ms ease;
  }
  .vpz__trigger:hover { opacity: 0.9; }
`,_=`
.vpz__overlay {
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
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}
.vpz__panel {
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
}
.vpz--sm { --vpw: 360px; }
.vpz--md { --vpw: 460px; }
.vpz--lg { --vpw: 640px; }

.vpz__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 20px; border-bottom: 1px solid var(--border, #2a2a2a); }
.vpz__title { margin: 0; font-size: 16px; font-weight: 600; }
.vpz__close { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; padding: 0; border: none; border-radius: 8px; background: transparent; color: var(--text-secondary, #a1a1a1); cursor: pointer; transition: background-color 160ms ease, color 160ms ease; }
.vpz__close:hover { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.08)); color: var(--text, #ededed); }
.vpz__close svg { width: 18px; height: 18px; }
.vpz__body { padding: 20px; overflow-y: auto; font-size: 14px; line-height: 1.55; color: var(--text-secondary, #c4c4c4); }
.vpz__ph { margin: 0; }
.vpz__ph code { font-family: var(--font-mono, monospace); padding: 1px 6px; border-radius: 6px; background: var(--bg-input, rgba(255, 255, 255, 0.06)); color: var(--text, #ededed); }
.vpz__foot { display: flex; justify-content: flex-end; gap: 10px; padding: 16px 20px; border-top: 1px solid var(--border, #2a2a2a); }

/* zoom spring entrance + backdrop fade — overlay fades, panel zooms (descendant rule) */
.vpz-enter-active { transition: opacity 260ms ease; }
.vpz-leave-active { transition: opacity 200ms ease; }
.vpz-enter-from, .vpz-leave-to { opacity: 0; }
.vpz-enter-active .vpz__panel { transition: transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 260ms ease; }
.vpz-leave-active .vpz__panel { transition: transform 200ms cubic-bezier(0.4, 0, 1, 1), opacity 200ms ease; }
.vpz-enter-from .vpz__panel, .vpz-leave-to .vpz__panel { transform: scale(0.88); opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .vpz-enter-active, .vpz-leave-active, .vpz-enter-active .vpz__panel, .vpz-leave-active .vpz__panel { transition-duration: 0ms; }
  .vpz-enter-from .vpz__panel, .vpz-leave-to .vpz__panel { transform: none; }
}
`;let h;function E(r){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=r;const e=h.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const w=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(r,e){const t=e?E(String(e).trim()):null;if(!t){for(const s of w)r.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),o=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,p=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(s=>Math.round(o?s*.92:s+(255-s)*.16)),a=(s,u)=>r.style.setProperty(s,u);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(s,p);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(s,t.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(s,o?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])a(s,o?"0 0 0":"255 255 255");a("--vs-color",p),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class C extends HTMLElement{static observedAttributes=["open","title","size","prevent-close","close-hidden","trigger-label","color"];#n;#g;#e=null;#r=null;#t=null;#a=null;#i=null;#o=null;#l=null;#c="";#u=null;#f=null;#z=!1;#s=!1;#v=!1;#p=null;#d=0;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=z,this.#n=document.createElement("button"),this.#n.type="button",this.#n.className="vpz__trigger";const i=document.createElement("slot");i.name="trigger",this.#g=document.createTextNode(""),i.appendChild(this.#g),this.#n.appendChild(i),this.#n.addEventListener("click",()=>this.#k()),e.append(t,this.#n)}connectedCallback(){b(this,this.getAttribute("color")),this.#b(),this.#h()&&this.#x()}disconnectedCallback(){clearTimeout(this.#d),this.#C(),this.#m(),this.#s&&(document.body.style.overflow=""),this.#s=!1}attributeChangedCallback(e){if(b(this,this.getAttribute("color")),!this.#n||(e==="trigger-label"&&(this.#g.textContent=f(this,"trigger-label","Open popup")),!this.isConnected))return;const t=this.#h();if(t!==this.#s){t?this.#x():this.#E();return}this.#b()}get open(){return this.#h()}set open(e){this.setAttribute("open",e?"":"false")}#h(){return this.hasAttribute("open")?d(this,"open",!1):this.#z}#k(){this.#h()||this.#_(!0)}#y(){d(this,"prevent-close",!1)||this.#h()&&this.#_(!1)}#_(e){const t=this.hasAttribute("open");t||(this.#z=e),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{open:e}})),e||this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),t||(e?this.#x():this.#E())}#x(){this.#s||(this.#s=!0,this.#p=this.shadowRoot.activeElement||document.activeElement,this.#m(),this.#N(),document.body.style.overflow="hidden",document.body.appendChild(this.#e),this.#r.offsetWidth,this.#r.classList.remove("vpz-enter-from"),this.#T(),this.dispatchEvent(new CustomEvent("opened",{bubbles:!0,composed:!0})),this.#b(),requestAnimationFrame(()=>{this.#t&&this.#s&&this.#t.focus({preventScroll:!0})}))}#E(){if(!this.#s)return;this.#s=!1,this.#C(),document.body.style.overflow="",this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0})),this.#b(),this.isConnected&&(this.#p&&this.#p.isConnected?this.#p:this.#n).focus({preventScroll:!0}),this.#p=null;const e=this.#e,t=this.#r,i=this.#t;if(!e)return;if(g()){this.#m();return}t.classList.remove("vpz-enter-active","vpz-enter-from"),t.classList.add("vpz-leave-active","vpz-leave-to");let n=2;const o=()=>{clearTimeout(this.#d),this.#e===e&&this.#m()},p=()=>{--n<=0&&o()},l=a=>{a.target!==t&&a.target!==i||(a.currentTarget.removeEventListener("transitionend",l),p())};t.addEventListener("transitionend",l),i?.addEventListener("transitionend",l),clearTimeout(this.#d),this.#d=setTimeout(o,700)}#m(){clearTimeout(this.#d),this.#L(),this.#e&&(this.#e.remove(),this.#e=this.#r=this.#t=this.#a=this.#i=this.#o=this.#l=null,this.#c="")}#S(){const e=[],t=[];for(const n of Array.from(this.childNodes))if(!(n.nodeType===1&&n.getAttribute("slot")==="trigger")){if(n.nodeType===1&&n.getAttribute("slot")==="footer"){t.push(n);continue}e.push(n)}const i=e.some(n=>n.nodeType===1||n.nodeType===3&&n.textContent.trim());return{body:e,footer:t,hasBody:i,hasFooter:t.length>0}}#L(){if(this.#u){for(const e of this.#u)this.appendChild(e);this.#u=null}if(this.#f){for(const e of this.#f)this.appendChild(e);this.#f=null}}#N(){const e=document.createElement("div"),t=e.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=_;const n=document.createElement("div");n.className="vpz-enter-active vpz-enter-from vpz__overlay",n.addEventListener("click",c=>{c.target===n&&this.#y()}),this.#r=n;const o=document.createElement("div");o.className="vpz__panel",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("tabindex","-1"),this.#t=o;const p=document.createElement("header");p.className="vpz__head",this.#a=document.createElement("h2"),this.#a.className="vpz__title",this.#i=document.createElement("button"),this.#i.type="button",this.#i.className="vpz__close",this.#i.setAttribute("aria-label","Close"),this.#i.appendChild(x()),this.#i.addEventListener("click",()=>this.#y()),p.append(this.#a,this.#i),this.#o=document.createElement("div"),this.#o.className="vpz__body",this.#l=document.createElement("footer"),this.#l.className="vpz__foot";const{body:l,footer:a,hasBody:s,hasFooter:u}=this.#S();if(s){this.#u=l;for(const c of l)this.#o.appendChild(c)}else{const c=document.createElement("p");c.className="vpz__ph",c.append("Popup content. Pass your markup via ");const v=document.createElement("code");v.textContent="<slot>",c.append(v,"."),this.#o.appendChild(c)}if(u){this.#f=a;for(const c of a)this.#l.appendChild(c)}o.append(p,this.#o),u&&o.appendChild(this.#l),n.appendChild(o),t.append(i,n),this.#e=e,this.#w()}#w(){if(!this.#t)return;const e=f(this,"size","md");this.#c&&this.#t.classList.remove(this.#c),this.#c=`vpz--${e}`,this.#t.classList.add(this.#c);const t=f(this,"title","Popup title");this.#a.textContent=t,this.#t.setAttribute("aria-label",t);const i=!d(this,"close-hidden",!1)&&!d(this,"prevent-close",!1);this.#i.style.display=i?"":"none"}#T(){this.#v||(this.#v=!0,document.addEventListener("keydown",this.#A,!0))}#C(){this.#v&&(this.#v=!1,document.removeEventListener("keydown",this.#A,!0))}#A=e=>{if(e.key==="Escape"){if(d(this,"prevent-close",!1))return;e.preventDefault(),this.#y();return}if(e.key!=="Tab"||!this.#t)return;const t=this.#t.querySelectorAll(y);if(!t.length)return;const i=t[0],n=t[t.length-1],o=this.#e?.shadowRoot?.activeElement;e.shiftKey&&o===i?(e.preventDefault(),n.focus()):!e.shiftKey&&o===n&&(e.preventDefault(),i.focus())};#b(){this.#e&&this.#w()}}customElements.define("vs-popup-zoom",C);
