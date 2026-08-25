const g=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,f=(s,t,e)=>{if(!s.hasAttribute(t))return e;const n=s.getAttribute(t);return!(n==="false"||n==="0")},p=(s,t,e)=>s.getAttribute(t)??e,y=`
  :host { display: inline-flex; }
  .vpc--t-default { --tc: var(--ui-accent, #ededed); --tc-fg: var(--ui-accent-fg, #0b0b0b); --tc-soft: rgb(var(--ui-ring, 255 255 255) / 0.14); }
  .vpc--t-danger { --tc: #e5484d; --tc-fg: var(--ui-accent-fg, #0b0b0b); --tc-soft: rgba(229, 72, 77, 0.14); }
  .vpc--t-warn { --tc: #f5a623; --tc-fg: #1a1206; --tc-soft: rgba(245, 166, 35, 0.16); }
  .vpc--t-success { --tc: #30a46c; --tc-fg: var(--ui-accent-fg, #0b0b0b); --tc-soft: rgba(48, 164, 108, 0.14); }

  .vpc__trigger {
    height: var(--ctrl-h-md, 40px);
    padding: 0 16px;
    border-radius: 12px;
    border: 1px solid transparent;
    background: var(--tc, var(--ui-accent, #ededed));
    color: var(--tc-fg, #fff);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 160ms ease, transform 120ms ease;
  }
  .vpc__trigger:hover { opacity: 0.9; }
  .vpc__trigger:active { transform: scale(0.97); }
  @media (prefers-reduced-motion: reduce) { .vpc__trigger { transition: none; } .vpc__trigger:active { transform: none; } }
`,k=`
  .vpc--t-default { --tc: var(--ui-accent, #ededed); --tc-fg: var(--ui-accent-fg, #0b0b0b); --tc-soft: rgb(var(--ui-ring, 255 255 255) / 0.14); }
  .vpc--t-danger { --tc: #e5484d; --tc-fg: var(--ui-accent-fg, #0b0b0b); --tc-soft: rgba(229, 72, 77, 0.14); }
  .vpc--t-warn { --tc: #f5a623; --tc-fg: #1a1206; --tc-soft: rgba(245, 166, 35, 0.16); }
  .vpc--t-success { --tc: #30a46c; --tc-fg: var(--ui-accent-fg, #0b0b0b); --tc-soft: rgba(48, 164, 108, 0.14); }

  .vpc__overlay {
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

  /* compact, CENTERED alert card — deliberately different from a head/body/footer modal */
  .vpc__panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: min(380px, calc(100vw - 48px));
    padding: 28px 26px 22px;
    border-radius: 20px;
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-card, #111);
    color: var(--text, #ededed);
    box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.6);
    outline: none;
  }

  /* icon badge: soft tinted disc + tone-colored glyph */
  .vpc__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    margin-bottom: 16px;
    border-radius: 50%;
    background: var(--tc-soft, rgba(255, 255, 255, 0.1));
    color: var(--tc, var(--ui-accent, #ededed));
  }
  .vpc__badge svg { width: 28px; height: 28px; }

  .vpc__title { margin: 0 0 8px; font-size: 18px; font-weight: 650; letter-spacing: -0.01em; }
  .vpc__message { margin: 0 0 22px; font-size: 14px; line-height: 1.55; color: var(--text-secondary, #b4b4b4); }

  .vpc__actions { display: flex; gap: 10px; width: 100%; }
  .vpc__btn {
    flex: 1 1 0;
    height: 42px;
    padding: 0 16px;
    border-radius: 12px;
    border: 1px solid transparent;
    font: inherit;
    font-weight: 550;
    cursor: pointer;
    transition: background-color 160ms ease, border-color 160ms ease, opacity 160ms ease, transform 120ms ease;
  }
  .vpc__btn:active { transform: scale(0.97); }
  .vpc__cancel {
    background: transparent;
    border-color: var(--inp-border, #2a2a2a);
    color: var(--text, #ededed);
  }
  .vpc__cancel:hover { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); border-color: var(--inp-border-hover, #3d3d3d); }
  .vpc__confirm {
    background: var(--tc, var(--ui-accent, #ededed));
    color: var(--tc-fg, #fff);
  }
  .vpc__confirm:hover { opacity: 0.9; }
  .vpc__confirm:focus-visible { outline: 2px solid var(--tc, var(--ui-accent, #ededed)); outline-offset: 2px; }

  /* entrance: pop from slightly below with a soft spring + backdrop fade */
  .vpc-fade-enter-active, .vpc-fade-leave-active { transition: opacity 240ms ease; }
  .vpc-fade-leave-active { transition: opacity 180ms ease; }
  .vpc-fade-enter-from, .vpc-fade-leave-to { opacity: 0; }

  .vpc-pop-enter-active { transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 240ms ease; }
  .vpc-pop-leave-active { transition: transform 180ms cubic-bezier(0.4, 0, 1, 1), opacity 180ms ease; }
  .vpc-pop-enter-from, .vpc-pop-leave-to { transform: translateY(16px) scale(0.94); opacity: 0; }

  @media (prefers-reduced-motion: reduce) {
    .vpc-fade-enter-active, .vpc-fade-leave-active,
    .vpc-pop-enter-active, .vpc-pop-leave-active { transition-duration: 0ms; }
    .vpc-pop-enter-from, .vpc-pop-leave-to { transform: none; }
  }
`,v={danger:'<path d="M12 9V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.0001 21.4093H5.94005C2.47005 21.4093 1.02005 18.9293 2.70005 15.8993L5.82006 10.2793L8.76006 4.9993C10.5401 1.7893 13.4601 1.7893 15.2401 4.9993L18.1801 10.2893L21.3001 15.9093C22.9801 18.9393 21.5201 21.4193 18.0601 21.4193H12.0001V21.4093Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.9945 17H12.0035" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',success:'<path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.75 11.9999L10.58 14.8299L16.25 9.16992" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',warn:'<path d="M12 7.75V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21.08 8.58003V15.42C21.08 16.54 20.4799 17.58 19.5099 18.15L13.5699 21.58C12.5999 22.14 11.3999 22.14 10.4199 21.58L4.47992 18.15C3.50992 17.59 2.90991 16.55 2.90991 15.42V8.58003C2.90991 7.46003 3.50992 6.41999 4.47992 5.84999L10.4199 2.42C11.3899 1.86 12.5899 1.86 13.5699 2.42L19.5099 5.84999C20.4799 6.41999 21.08 7.45003 21.08 8.58003Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 16.1992V16.2992" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',default:'<path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.9945 16H12.0035" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'};function _(s){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.innerHTML=v[s]||v.default,t}let u;function x(s){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=s;const t=u.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const C=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(s,t){const e=t?x(String(t).trim()):null;if(!e){for(const r of C)s.style.removeProperty(r);return}const n=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),i=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(r=>Math.round(i?r*.92:r+(255-r)*.16)),o=(r,d)=>s.style.setProperty(r,d);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(r,l);o("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(r,i?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])o(r,i?"0 0 0":"255 255 255");o("--vs-color",l),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["title","message","tone","confirm-label","cancel-label","trigger-label","prevent-close","open","color"];#i;#r;#e=null;#t=null;#o=null;#v=null;#m=null;#b=null;#g=null;#a=null;#s=[];#x=!1;#n=!1;#d=!1;#l=0;#p=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=y,this.#i=document.createElement("div"),this.#i.className="vpc",this.#r=document.createElement("button"),this.#r.type="button",this.#r.className="vpc__trigger",this.#r.addEventListener("click",()=>this.#y()),this.#i.appendChild(this.#r),t.append(e,this.#i)}connectedCallback(){m(this,this.getAttribute("color")),this.#f(),this.#c()&&this.#_()}disconnectedCallback(){clearTimeout(this.#l),this.#E(),this.#u(),document.body.style.overflow="",this.#n=!1,this.#p=null}attributeChangedCallback(){if(m(this,this.getAttribute("color")),!this.#i||!this.isConnected)return;const t=this.#c();if(t!==this.#n){t?this.#_():this.#w();return}this.#f()}get open(){return this.#c()}set open(t){this.setAttribute("open",t?"":"false")}show(){this.#y()}close(){this.#h()}toggle(){this.#c()?this.#h():this.#y()}#c(){return this.hasAttribute("open")?f(this,"open",!1):this.#x}#y(){this.#c()||this.#C(!0)}#h(){this.#c()&&this.#C(!1)}#C(t){const e=this.hasAttribute("open");e||(this.#x=t),t||this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),e||(t?this.#_():this.#w())}#k(){this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0})),this.#h()}#S(){this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0})),this.#h()}#M(){f(this,"prevent-close",!1)||this.#k()}#_(){this.#n||(this.#n=!0,this.#u(),this.#j(),this.#p=document.activeElement,document.body.style.overflow="hidden",document.body.appendChild(this.#e),this.#t.offsetWidth,this.#t.classList.remove("vpc-pop-enter-from"),this.#o?.classList.remove("vpc-fade-enter-from"),this.#T(),this.#f(),requestAnimationFrame(()=>{this.#a&&this.#n&&this.#a.focus({preventScroll:!0})}))}#w(){if(!this.#n)return;this.#n=!1,this.#E(),document.body.style.overflow="",this.#f(),this.#p?.focus?.({preventScroll:!0}),this.#p=null;const t=this.#e,e=this.#t,n=this.#o;if(!t)return;if(g()){this.#u();return}e.classList.remove("vpc-pop-enter-active","vpc-pop-enter-from"),e.classList.add("vpc-pop-leave-active","vpc-pop-leave-to"),n&&(n.classList.remove("vpc-fade-enter-active","vpc-fade-enter-from"),n.classList.add("vpc-fade-leave-active","vpc-fade-leave-to"));let c=n?2:1;const i=()=>{clearTimeout(this.#l),this.#e===t&&this.#u()},l=()=>{--c===0&&i()},a=o=>{o.target!==e&&o.target!==n||(o.currentTarget.removeEventListener("transitionend",a),l())};e.addEventListener("transitionend",a),n?.addEventListener("transitionend",a),clearTimeout(this.#l),this.#l=setTimeout(i,700)}#u(){clearTimeout(this.#l),this.#e&&(this.#e.remove(),this.#e=this.#t=this.#o=this.#v=null,this.#m=this.#b=this.#g=this.#a=null)}#j(){const t=document.createElement("div");t.className="vpc-overlay";const e=t.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent=k;const c=document.createElement("div");c.className="vpc__overlay vpc-fade-enter-active vpc-fade-enter-from",c.addEventListener("click",b=>{b.target===c&&this.#M()}),this.#o=c;const i=document.createElement("div");i.className="vpc__panel vpc-pop-enter-active vpc-pop-enter-from",i.setAttribute("role","alertdialog"),i.setAttribute("aria-modal","true"),i.setAttribute("tabindex","-1"),this.#t=i;const l=document.createElement("span");l.className="vpc__badge",l.setAttribute("aria-hidden","true"),this.#v=l;const a=document.createElement("h2");a.className="vpc__title",this.#m=a;const o=document.createElement("p");o.className="vpc__message",this.#b=o;const r=document.createElement("div");r.className="vpc__actions";const d=document.createElement("button");d.type="button",d.className="vpc__btn vpc__cancel",d.addEventListener("click",()=>this.#k()),this.#g=d;const h=document.createElement("button");h.type="button",h.className="vpc__btn vpc__confirm",h.addEventListener("click",()=>this.#S()),this.#a=h,r.append(d,h),i.append(l,a,o,r),c.appendChild(i),this.#A(),this.#N(),e.append(n,c),this.#e=t}#T(){this.#d||(this.#d=!0,document.addEventListener("keydown",this.#L,!0))}#E(){this.#d&&(this.#d=!1,document.removeEventListener("keydown",this.#L,!0))}#L=t=>{if(t.key==="Escape"){if(f(this,"prevent-close",!1))return;t.preventDefault(),this.#k();return}if(t.key!=="Tab"||!this.#t)return;const e=this.#t.querySelectorAll("button:not([disabled])");if(!e.length)return;const n=e[0],c=e[e.length-1],i=this.#t.getRootNode().activeElement;t.shiftKey&&i===n?(t.preventDefault(),c.focus()):!t.shiftKey&&i===c&&(t.preventDefault(),n.focus())};#A(){if(!this.#e)return;const t=p(this,"title","Delete item?");this.#m.textContent=t,this.#b.textContent=p(this,"message","This action cannot be undone."),this.#g.textContent=p(this,"cancel-label","Cancel"),this.#a.textContent=p(this,"confirm-label","Delete"),this.#t.setAttribute("aria-label",t)}#N(){const t=p(this,"tone","danger");this.#s.length&&(this.#t.classList.remove(...this.#s),this.#o.classList.remove(...this.#s)),this.#s=[`vpc--t-${t}`],this.#t.classList.add(...this.#s),this.#o.classList.add(...this.#s),this.#v.replaceChildren(_(t))}#f(){const t=p(this,"tone","danger");this.#i.className="vpc",this.#r.className=`vpc__trigger vpc--t-${t}`,this.#r.textContent=p(this,"trigger-label","Delete item"),this.#e&&(this.#A(),this.#N())}}customElements.define("vs-popup-confirm",w);
