const p=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,l=(c,t,e)=>{if(!c.hasAttribute(t))return e;const r=c.getAttribute(t);return!(r==="false"||r==="0")},d=(c,t,e)=>c.getAttribute(t)??e,m=`
  :host { display: inline-flex; }
.vtf {
  --h: var(--ctrl-h-md, 40px);
  --fs: var(--ctrl-fs-md, 14px);
  --px: var(--ctrl-px-md, 16px);
  --accent: var(--ui-accent, #ededed);
  display: inline-flex;
  font-family: inherit;
  font-size: var(--fs);
  color: var(--text, #ededed);
}
.vtf--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
.vtf--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 20px); }
.vtf--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
.vtf--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
.vtf--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

.vtf__trigger {
  height: var(--h);
  padding: 0 var(--px);
  font: inherit;
  font-weight: 600;
  color: var(--ui-accent-fg, #0b0b0b);
  background: var(--accent);
  border: 0;
  border-radius: var(--ctrl-r-rounded, 12px);
  cursor: pointer;
  transition: filter 160ms ease, transform 140ms ease;
}
.vtf--r-none .vtf__trigger { border-radius: var(--ctrl-r-none, 4px); }
.vtf--r-subtle .vtf__trigger { border-radius: var(--ctrl-r-subtle, 8px); }
.vtf--r-pill .vtf__trigger { border-radius: var(--ctrl-r-pill, 999px); }
.vtf--r-squircle .vtf__trigger { border-radius: var(--ctrl-r-squircle, 14px); }
@supports (corner-shape: squircle) { .vtf--r-squircle .vtf__trigger { corner-shape: squircle; } }
.vtf__trigger:hover { filter: brightness(1.06); }
.vtf__trigger:active { transform: scale(0.97); }
.vtf.is-disabled { opacity: 0.6; pointer-events: none; }
`,b=`
.vtf__backdrop {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: var(--backdrop, rgba(0, 0, 0, 0.5));
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.vtf-fade-enter-active, .vtf-fade-leave-active { transition: opacity 300ms ease; }
.vtf-fade-enter-from, .vtf-fade-leave-to { opacity: 0; }

.vtf__panel {
  --rr: 20px;
  --accent: var(--ui-accent, #ededed);
  position: fixed;
  z-index: 70;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--rr);
  background: var(--bg-card, var(--bg-elevated, #161616));
  border: 1px solid var(--border, #2a2a2a);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
  outline: none;
  color: var(--text, #ededed);
}
.vtf__panel.vtf--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
.vtf__panel.vtf--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
.vtf__panel.vtf--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }
.vtf__panel.vtf--r-none { --rr: 8px; }
.vtf__panel.vtf--r-subtle { --rr: 10px; }
.vtf__panel.vtf--r-pill { --rr: 24px; }
.vtf__panel.vtf--r-squircle { --rr: 26px; }
@supports (corner-shape: squircle) { .vtf__panel.vtf--r-squircle { corner-shape: squircle; } }

/* the UNIQUE morph: a blur-to-clear dissolve with a micro rise — no scale, no slide */
.vtf-dissolve-enter-active {
  transition: opacity 320ms ease, filter 320ms ease, transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.vtf-dissolve-leave-active {
  transition: opacity 200ms ease, filter 200ms ease, transform 200ms ease;
}
.vtf-dissolve-enter-from, .vtf-dissolve-leave-to {
  opacity: 0;
  filter: blur(var(--vtf-blur, 8px));
  transform: translate(-50%, calc(-50% + 8px));
}

.vtf__card { display: flex; flex-direction: column; gap: 14px; width: 300px; padding: 18px; }
.vtf__head { display: flex; align-items: center; gap: 12px; }
.vtf__avatar {
  display: grid; place-items: center;
  width: 46px; height: 46px; flex: none;
  border-radius: 14px;
  background: var(--accent); color: var(--ui-accent-fg, #0b0b0b); font-weight: 700;
}
@supports (corner-shape: squircle) { .vtf__avatar { corner-shape: squircle; } }
.vtf__id { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.vtf__name { font-weight: 700; font-size: 1.05em; color: var(--text, #ededed); }
.vtf__role { font-size: 0.85em; color: var(--text-muted, #8a8a8a); }
.vtf__bio { margin: 0; font-size: 0.92em; line-height: 1.5; color: var(--text-secondary, #c4c4c4); }
.vtf__actions { display: flex; gap: 8px; margin-top: 2px; }
.vtf__btn {
  flex: 1; height: 38px; border: 0; border-radius: 11px;
  font: inherit; font-weight: 600; cursor: pointer;
  transition: filter 160ms ease, transform 140ms ease;
}
@supports (corner-shape: squircle) { .vtf__btn { corner-shape: squircle; } }
.vtf__btn:active { transform: scale(0.96); }
.vtf__btn--ghost { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); color: var(--text-secondary, #c4c4c4); }
.vtf__btn--primary { background: var(--accent); color: var(--ui-accent-fg, #0b0b0b); }
.vtf__btn--primary:hover { filter: brightness(1.06); }

@media (prefers-reduced-motion: reduce) {
  .vtf-fade-enter-active, .vtf-fade-leave-active,
  .vtf-dissolve-enter-active, .vtf-dissolve-leave-active,
  .vtf__trigger, .vtf__btn { transition: none; }
  .vtf-dissolve-enter-from, .vtf-dissolve-leave-to {
    opacity: 1; filter: none; transform: translate(-50%, -50%);
  }
}
`;let h;function g(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(c,t){const e=t?g(String(t).trim()):null;if(!e){for(const s of _)c.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),a=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,f=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(s=>Math.round(a?s*.92:s+(255-s)*.16)),i=(s,v)=>c.style.setProperty(s,v);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(s,f);i("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(s,a?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])i(s,a?"0 0 0":"255 255 255");i("--vs-color",f),i("--vs-color-rgb",e.join(" ")),i("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["size","radius","tone","label","disabled","backdrop","dismissable","open","blur","color"];#a;#s;#r=null;#e=null;#t=null;#l=[];#u=!1;#i=!1;#f=!1;#c=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#a=document.createElement("div"),this.#a.className="vtf",this.#s=document.createElement("button"),this.#s.type="button",this.#s.className="vtf__trigger",this.#s.setAttribute("aria-haspopup","dialog"),this.#s.addEventListener("click",()=>this.#m()),this.#a.appendChild(this.#s),t.append(e,this.#a)}connectedCallback(){u(this,this.getAttribute("color")),this.#v(),this.#n()&&this.#h()}disconnectedCallback(){clearTimeout(this.#c),this.#p(),this.#d(),this.#i=!1}attributeChangedCallback(){if(u(this,this.getAttribute("color")),!this.#a||!this.isConnected)return;const t=this.#n();if(t!==this.#i){t?this.#h():this.#g();return}this.#v()}get open(){return this.#n()}set open(t){this.setAttribute("open",t?"":"false")}toggle(){this.#m()}#n(){return this.hasAttribute("open")?l(this,"open",!1):this.#u}#m(){l(this,"disabled",!1)||(this.#n()?this.#o():this.#C())}#C(){l(this,"disabled",!1)||this.#n()||this.#b(!0)}#o(){this.#n()&&this.#b(!1)}#b(t){const e=this.hasAttribute("open");e||(this.#u=t),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{open:t}})),e||(t?this.#h():this.#g())}#h(){this.#i||(this.#i=!0,this.#d(),this.#L(),document.body.appendChild(this.#r),this.#e.offsetWidth,this.#e.classList.remove("vtf-dissolve-enter-from"),this.#t?.classList.remove("vtf-fade-enter-from"),l(this,"dismissable",!0)&&this.#E(),this.dispatchEvent(new CustomEvent("opened",{bubbles:!0,composed:!0})),this.#v(),requestAnimationFrame(()=>{this.#e&&this.#i&&this.#e.focus({preventScroll:!0})}))}#g(){if(!this.#i)return;this.#i=!1,this.#p(),this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0})),this.#v(),this.isConnected&&this.#s.focus({preventScroll:!0});const t=this.#r,e=this.#e,r=this.#t;if(!t)return;if(p()){this.#d();return}e.classList.remove("vtf-dissolve-enter-active","vtf-dissolve-enter-from"),e.classList.add("vtf-dissolve-leave-active","vtf-dissolve-leave-to"),r&&(r.classList.remove("vtf-fade-enter-active","vtf-fade-enter-from"),r.classList.add("vtf-fade-leave-active","vtf-fade-leave-to"));let n=r?2:1;const a=()=>{clearTimeout(this.#c),this.#r===t&&this.#d()},f=()=>{--n===0&&a()},o=i=>{i.target!==e&&i.target!==r||(i.currentTarget.removeEventListener("transitionend",o),f())};e.addEventListener("transitionend",o),r?.addEventListener("transitionend",o),clearTimeout(this.#c),this.#c=setTimeout(a,700)}#d(){clearTimeout(this.#c),this.#r&&(this.#r.remove(),this.#r=this.#e=this.#t=null)}#L(){const t=document.createElement("div");t.className="vtf-overlay";const e=t.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=b,l(this,"backdrop",!0)&&(this.#t=this.#_());const n=document.createElement("div");n.className="vtf__panel vtf-dissolve-enter-active vtf-dissolve-enter-from",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("tabindex","-1"),n.style.setProperty("--vtf-blur",this.#x()),n.appendChild(this.#A()),this.#e=n,this.#y(),e.append(r,...this.#t?[this.#t]:[],n),this.#r=t}#_(){const t=document.createElement("div");return t.className="vtf__backdrop vtf-fade-enter-active vtf-fade-enter-from",t.addEventListener("click",()=>{l(this,"dismissable",!0)&&this.#o()}),t}#A(){const t=document.createElement("div");t.className="vtf__card";const e=document.createElement("div");e.className="vtf__head";const r=document.createElement("span");r.className="vtf__avatar",r.textContent="AL";const n=document.createElement("div");n.className="vtf__id";const a=document.createElement("span");a.className="vtf__name",a.textContent="Ada Lovelace";const f=document.createElement("span");f.className="vtf__role",f.textContent="Lead Engineer",n.append(a,f),e.append(r,n);const o=document.createElement("p");o.className="vtf__bio",o.textContent="A blur-to-clear fade — the card resolves into focus.";const i=document.createElement("div");i.className="vtf__actions";const s=document.createElement("button");s.type="button",s.className="vtf__btn vtf__btn--ghost",s.textContent="Close";const v=document.createElement("button");return v.type="button",v.className="vtf__btn vtf__btn--primary",v.textContent="Follow",s.addEventListener("click",()=>this.#o()),v.addEventListener("click",()=>this.#o()),i.append(s,v),t.append(e,o,i),t}#x(){return`${Math.max(0,Number(d(this,"blur","8"))||0)}px`}#y(){this.#l.length&&this.#e.classList.remove(...this.#l),this.#l=[`vtf--${d(this,"size","md")}`,`vtf--r-${d(this,"radius","squircle")}`,`vtf--t-${d(this,"tone","default")}`],this.#e.classList.add(...this.#l)}#E(){this.#f||(this.#f=!0,document.addEventListener("pointerdown",this.#k,!0),document.addEventListener("keydown",this.#w,!0))}#p(){this.#f&&(this.#f=!1,document.removeEventListener("pointerdown",this.#k,!0),document.removeEventListener("keydown",this.#w,!0))}#k=t=>{const e=t.composedPath();e.includes(this)||this.#e&&e.includes(this.#e)||this.#o()};#w=t=>{t.key==="Escape"&&this.#n()&&(t.preventDefault(),this.#o())};#v(){const t=this.#n(),e=l(this,"disabled",!1);this.#a.className=`vtf vtf--${d(this,"size","md")} vtf--r-${d(this,"radius","squircle")} vtf--t-${d(this,"tone","default")}${t?" is-open":""}${e?" is-disabled":""}`,this.#s.disabled=e,this.#s.setAttribute("aria-expanded",String(t)),this.#s.textContent=d(this,"label","Open card"),this.#r&&(this.#y(),this.#e.style.setProperty("--vtf-blur",this.#x()),this.#N(),this.#i&&(l(this,"dismissable",!0)?this.#E():this.#p()))}#N(){const t=l(this,"backdrop",!0);if(t&&!this.#t)this.#t=this.#_(),this.#r.shadowRoot.insertBefore(this.#t,this.#e),this.#t.offsetWidth,this.#t.classList.remove("vtf-fade-enter-from");else if(!t&&this.#t){const e=this.#t;this.#t=null,e.classList.remove("vtf-fade-enter-active","vtf-fade-enter-from"),e.classList.add("vtf-fade-leave-active","vtf-fade-leave-to");const r=()=>e.remove();p()?r():(e.addEventListener("transitionend",r,{once:!0}),setTimeout(r,500))}}}customElements.define("vs-transform-fade",x);
