const b=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,d=(a,t,e)=>{if(!a.hasAttribute(t))return e;const r=a.getAttribute(t);return!(r==="false"||r==="0")},h=(a,t,e)=>a.getAttribute(t)??e,u="http://www.w3.org/2000/svg";function g(){const a=document.createElementNS(u,"svg");a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("aria-hidden","true");for(const t of["M6 6L18 18","M18 6L6 18"]){const e=document.createElementNS(u,"path");e.setAttribute("d",t),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),a.appendChild(e)}return a}const y=`
  :host { display: inline-flex; }
  .vpf__trigger {
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
  .vpf__trigger:hover { opacity: 0.9; }
`,x=`
  .vpf__overlay {
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
    perspective: 1400px; /* 3D depth for the flip */
  }
  .vpf__panel {
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
    transform-origin: center top;
  }
  .vpf--sm { --vpw: 360px; }
  .vpf--md { --vpw: 460px; }
  .vpf--lg { --vpw: 640px; }

  .vpf__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 20px; border-bottom: 1px solid var(--border, #2a2a2a); }
  .vpf__title { margin: 0; font-size: 16px; font-weight: 600; }
  .vpf__close { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; padding: 0; border: none; border-radius: 8px; background: transparent; color: var(--text-secondary, #a1a1a1); cursor: pointer; transition: background-color 160ms ease, color 160ms ease; }
  .vpf__close:hover { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.08)); color: var(--text, #ededed); }
  .vpf__close svg { width: 18px; height: 18px; }
  .vpf__body { padding: 20px; overflow-y: auto; font-size: 14px; line-height: 1.55; color: var(--text-secondary, #c4c4c4); }
  .vpf__ph { margin: 0; }
  .vpf__ph code { font-family: var(--font-mono, monospace); padding: 1px 6px; border-radius: 6px; background: var(--bg-input, rgba(255, 255, 255, 0.06)); color: var(--text, #ededed); }
  .vpf__foot { display: flex; justify-content: flex-end; gap: 10px; padding: 16px 20px; border-top: 1px solid var(--border, #2a2a2a); }

  /* 3D flip entrance (rotateX from top) + backdrop fade */
  .vpf-enter-active { transition: opacity 280ms ease; }
  .vpf-leave-active { transition: opacity 200ms ease; }
  .vpf-enter-from, .vpf-leave-to { opacity: 0; }
  .vpf-enter-active .vpf__panel { transition: transform 460ms cubic-bezier(0.34, 1.4, 0.5, 1), opacity 280ms ease; }
  .vpf-leave-active .vpf__panel { transition: transform 220ms cubic-bezier(0.4, 0, 1, 1), opacity 200ms ease; }
  .vpf-enter-from .vpf__panel, .vpf-leave-to .vpf__panel { transform: rotateX(-85deg) translateY(-20px); opacity: 0; }

  @media (prefers-reduced-motion: reduce) {
    .vpf-enter-active, .vpf-leave-active, .vpf-enter-active .vpf__panel, .vpf-leave-active .vpf__panel { transition-duration: 0ms; }
    .vpf-enter-from .vpf__panel, .vpf-leave-to .vpf__panel { transform: none; }
  }
`;let f;function _(a){if(f||=document.createElement("canvas").getContext("2d"),!f)return null;f.fillStyle="#000",f.fillStyle=a;const t=f.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const E=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(a,t){const e=t?_(String(t).trim()):null;if(!e){for(const n of E)a.style.removeProperty(n);return}const r=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),s=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(n=>Math.round(s?n*.92:n+(255-n)*.16)),o=(n,p)=>a.style.setProperty(n,p);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(n,l);o("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(n,s?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])o(n,s?"0 0 0":"255 255 255");o("--vs-color",l),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["active","title","size","prevent-close","close-hidden","trigger-label","color"];#e;#f;#i=null;#l=null;#t=null;#h=null;#u=null;#s=null;#n=null;#b=!1;#r=!1;#a=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=y,this.#e=document.createElement("button"),this.#e.type="button",this.#e.className="vpf__trigger",this.#e.setAttribute("aria-haspopup","dialog");const r=document.createElement("slot");r.name="trigger",this.#f=document.createTextNode(""),r.appendChild(this.#f),this.#e.appendChild(r),this.#e.addEventListener("click",()=>this.#g()),t.append(e,this.#e)}connectedCallback(){v(this,this.getAttribute("color")),this.#d(),this.#o()&&this.#v()}disconnectedCallback(){clearTimeout(this.#a),document.removeEventListener("keydown",this.#m,!0),document.body.style.overflow="",this.#p(),this.#r=!1}attributeChangedCallback(t){if(v(this,this.getAttribute("color")),!(!this.#e||!this.isConnected)){if(t==="active"){const e=this.#o();if(e!==this.#r){e?this.#v():this.#x();return}}this.#d()}}get active(){return this.#o()}set active(t){this.setAttribute("active",t?"":"false")}toggle(){this.#E()}#o(){return this.hasAttribute("active")?d(this,"active",!1):this.#b}#E(){this.#o()?this.#c():this.#g()}#g(){this.#o()||this.#y(!0)}#c(){d(this,"prevent-close",!1)||this.#o()&&this.#y(!1)}#y(t){const e=this.hasAttribute("active");e||(this.#b=t),this.dispatchEvent(new CustomEvent(t?"open":"close",{bubbles:!0,composed:!0,detail:{active:t}})),e||(t?this.#v():this.#x())}#v(){this.#r||(this.#r=!0,this.#p(),this.#w(),document.body.appendChild(this.#i),this.#t.offsetWidth,this.#l.classList.remove("vpf-enter-from"),document.body.style.overflow="hidden",document.addEventListener("keydown",this.#m,!0),this.#d(),requestAnimationFrame(()=>{this.#t&&this.#r&&this.#t.focus({preventScroll:!0})}))}#x(){if(!this.#r)return;this.#r=!1,document.removeEventListener("keydown",this.#m,!0),document.body.style.overflow="",this.#d(),this.isConnected&&this.#e.focus({preventScroll:!0});const t=this.#i,e=this.#l,r=this.#t;if(!t)return;if(b()){this.#p();return}e.classList.remove("vpf-enter-active","vpf-enter-from"),e.classList.add("vpf-leave-active","vpf-leave-to");let i=2;const s=()=>{clearTimeout(this.#a),this.#i===t&&this.#p()},l=()=>{--i<=0&&s()},c=o=>{o.target!==e&&o.target!==r||(o.currentTarget.removeEventListener("transitionend",c),l())};e.addEventListener("transitionend",c),r.addEventListener("transitionend",c),clearTimeout(this.#a),this.#a=setTimeout(s,700)}#p(){clearTimeout(this.#a),this.#i&&(this.#k(),this.#i.remove(),this.#i=this.#l=this.#t=null,this.#h=this.#u=this.#s=this.#n=null)}#w(){const t=document.createElement("div"),e=t.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=x;const i=document.createElement("div");i.className="vpf__overlay vpf-enter-active vpf-enter-from",i.addEventListener("click",m=>{m.target===i&&this.#c()}),this.#l=i;const s=document.createElement("div");s.className=`vpf__panel vpf--${h(this,"size","md")}`,s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("tabindex","-1"),this.#t=s;const l=document.createElement("header");l.className="vpf__head";const c=document.createElement("h2");c.className="vpf__title",this.#h=c;const o=document.createElement("button");o.type="button",o.className="vpf__close",o.setAttribute("aria-label","Close"),o.appendChild(g()),o.addEventListener("click",()=>this.#c()),this.#u=o,l.append(c,o);const n=document.createElement("div");n.className="vpf__body",this.#s=n;const p=document.createElement("footer");p.className="vpf__foot",this.#n=p,s.append(l,n,p),i.appendChild(s),e.append(r,i),this.#i=t,this.#C(),this.#_()}#A(){const t=document.createElement("p");t.className="vpf__ph",t.append("Popup content. Pass your markup via ");const e=document.createElement("code");return e.textContent="<slot>",t.append(e,"."),t}#C(){const t=[],e=[],r=i=>i.nodeType===1||i.nodeType===3&&i.textContent.trim()!=="";for(const i of Array.from(this.childNodes))i.nodeType===1&&i.getAttribute("slot")==="trigger"||r(i)&&(i.nodeType===1&&i.getAttribute("slot")==="footer"?e.push(i):t.push(i));if(t.length)for(const i of t)this.#s.appendChild(i);else this.#s.appendChild(this.#A());if(e.length){for(const i of e)this.#n.appendChild(i);this.#n.hidden=!1}else this.#n.hidden=!0}#k(){if(this.#s)for(const t of Array.from(this.#s.childNodes)){if(t.nodeType===1&&t.classList.contains("vpf__ph")){t.remove();continue}this.appendChild(t)}if(this.#n)for(const t of Array.from(this.#n.childNodes))this.appendChild(t)}#m=t=>{if(t.key==="Escape"){if(d(this,"prevent-close",!1))return;t.preventDefault(),this.#c();return}if(t.key!=="Tab"||!this.#t)return;const e=this.#t.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');if(!e.length)return;const r=e[0],i=e[e.length-1],s=this.#i&&this.#i.shadowRoot,l=s?s.activeElement:null;t.shiftKey&&l===r?(t.preventDefault(),i.focus()):!t.shiftKey&&l===i&&(t.preventDefault(),r.focus())};#d(){this.#f.textContent=h(this,"trigger-label","Open popup"),this.#e.setAttribute("aria-expanded",String(this.#o())),this.#i&&this.#_()}#_(){if(!this.#t)return;const t=h(this,"size","md");this.#t.className=`vpf__panel vpf--${t}`;const e=h(this,"title","Popup title");this.#h.textContent=e,this.#t.setAttribute("aria-label",e);const r=d(this,"prevent-close",!1),i=d(this,"close-hidden",!1);this.#u.hidden=i||r}}customElements.define("vs-popup-flip",w);
