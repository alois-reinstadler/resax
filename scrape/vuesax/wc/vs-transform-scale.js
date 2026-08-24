const f=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,l=(o,t,e)=>{if(!o.hasAttribute(t))return e;const r=o.getAttribute(t);return!(r==="false"||r==="0")},p=(o,t,e)=>o.getAttribute(t)??e,m=`
  :host { display: inline-flex; }
.vtsc {
  --h: var(--ctrl-h-md, 40px);
  --fs: var(--ctrl-fs-md, 14px);
  --px: var(--ctrl-px-md, 16px);
  --accent: var(--ui-accent, #ededed);
  display: inline-flex;
  font-family: inherit;
  font-size: var(--fs);
  color: var(--text, #ededed);
}
.vtsc--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
.vtsc--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 20px); }
.vtsc--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
.vtsc--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
.vtsc--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

.vtsc__trigger {
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
.vtsc--r-none .vtsc__trigger { border-radius: var(--ctrl-r-none, 4px); }
.vtsc--r-subtle .vtsc__trigger { border-radius: var(--ctrl-r-subtle, 8px); }
.vtsc--r-pill .vtsc__trigger { border-radius: var(--ctrl-r-pill, 999px); }
.vtsc--r-squircle .vtsc__trigger { border-radius: var(--ctrl-r-squircle, 14px); }
@supports (corner-shape: squircle) { .vtsc--r-squircle .vtsc__trigger { corner-shape: squircle; } }
.vtsc__trigger:hover { filter: brightness(1.06); }
.vtsc__trigger:active { transform: scale(0.97); }
.vtsc.is-disabled { opacity: 0.6; pointer-events: none; }
`,b=`
.vtsc__backdrop {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: var(--backdrop, rgba(0, 0, 0, 0.5));
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.vtsc-fade-enter-active, .vtsc-fade-leave-active { transition: opacity 260ms ease; }
.vtsc-fade-enter-from, .vtsc-fade-leave-to { opacity: 0; }

.vtsc__panel {
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
.vtsc__panel.vtsc--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
.vtsc__panel.vtsc--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
.vtsc__panel.vtsc--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }
.vtsc__panel.vtsc--r-none { --rr: 8px; }
.vtsc__panel.vtsc--r-subtle { --rr: 10px; }
.vtsc__panel.vtsc--r-pill { --rr: 24px; }
.vtsc__panel.vtsc--r-squircle { --rr: 26px; }
@supports (corner-shape: squircle) { .vtsc__panel.vtsc--r-squircle { corner-shape: squircle; } }

/* the UNIQUE morph: a transform-scale pop from the trigger's centre */
.vtsc-pop-enter-active {
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease;
}
.vtsc-pop-enter-active.vtsc__panel--bounce {
  transition: transform 420ms cubic-bezier(0.34, 1.46, 0.44, 1), opacity 220ms ease;
}
.vtsc-pop-leave-active {
  transition: transform 200ms cubic-bezier(0.4, 0, 1, 1), opacity 180ms ease;
}
.vtsc-pop-enter-from, .vtsc-pop-leave-to {
  transform: translate(-50%, -50%) scale(0.6);
  opacity: 0;
}

.vtsc__card { display: flex; flex-direction: column; gap: 14px; width: 300px; padding: 18px; }
.vtsc__head { display: flex; align-items: center; gap: 12px; }
.vtsc__avatar {
  display: grid; place-items: center;
  width: 46px; height: 46px; flex: none;
  border-radius: 14px;
  background: var(--accent); color: var(--ui-accent-fg, #0b0b0b); font-weight: 700;
}
@supports (corner-shape: squircle) { .vtsc__avatar { corner-shape: squircle; } }
.vtsc__id { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.vtsc__name { font-weight: 700; font-size: 1.05em; color: var(--text, #ededed); }
.vtsc__role { font-size: 0.85em; color: var(--text-muted, #8a8a8a); }
.vtsc__bio { margin: 0; font-size: 0.92em; line-height: 1.5; color: var(--text-secondary, #c4c4c4); }
.vtsc__actions { display: flex; gap: 8px; margin-top: 2px; }
.vtsc__btn {
  flex: 1; height: 38px; border: 0; border-radius: 11px;
  font: inherit; font-weight: 600; cursor: pointer;
  transition: filter 160ms ease, transform 140ms ease;
}
@supports (corner-shape: squircle) { .vtsc__btn { corner-shape: squircle; } }
.vtsc__btn:active { transform: scale(0.96); }
.vtsc__btn--ghost { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); color: var(--text-secondary, #c4c4c4); }
.vtsc__btn--primary { background: var(--accent); color: var(--ui-accent-fg, #0b0b0b); }
.vtsc__btn--primary:hover { filter: brightness(1.06); }

@media (prefers-reduced-motion: reduce) {
  .vtsc-fade-enter-active, .vtsc-fade-leave-active,
  .vtsc-pop-enter-active, .vtsc-pop-leave-active,
  .vtsc__trigger, .vtsc__btn { transition: none; }
  .vtsc-pop-enter-from, .vtsc-pop-leave-to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}
`;let h;function g(o){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=o;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(o,t){const e=t?g(String(t).trim()):null;if(!e){for(const s of _)o.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),c=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,d=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(s=>Math.round(c?s*.92:s+(255-s)*.16)),i=(s,v)=>o.style.setProperty(s,v);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(s,d);i("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(s,c?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])i(s,c?"0 0 0":"255 255 255");i("--vs-color",d),i("--vs-color-rgb",e.join(" ")),i("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["size","radius","tone","label","disabled","backdrop","dismissable","open","bounce","color"];#c;#s;#r=null;#t=null;#e=null;#l=[];#u=!1;#i=!1;#d=!1;#o=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#c=document.createElement("div"),this.#c.className="vtsc",this.#s=document.createElement("button"),this.#s.type="button",this.#s.className="vtsc__trigger",this.#s.setAttribute("aria-haspopup","dialog"),this.#s.addEventListener("click",()=>this.#m()),this.#c.appendChild(this.#s),t.append(e,this.#c)}connectedCallback(){u(this,this.getAttribute("color")),this.#p(),this.#n()&&this.#h()}disconnectedCallback(){clearTimeout(this.#o),this.#f(),this.#v(),this.#i=!1}attributeChangedCallback(){if(u(this,this.getAttribute("color")),!this.#c||!this.isConnected)return;const t=this.#n();if(t!==this.#i){t?this.#h():this.#g();return}this.#p()}get open(){return this.#n()}set open(t){this.setAttribute("open",t?"":"false")}toggle(){this.#m()}#n(){return this.hasAttribute("open")?l(this,"open",!1):this.#u}#m(){l(this,"disabled",!1)||(this.#n()?this.#a():this.#C())}#C(){l(this,"disabled",!1)||this.#n()||this.#b(!0)}#a(){this.#n()&&this.#b(!1)}#b(t){const e=this.hasAttribute("open");e||(this.#u=t),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{open:t}})),e||(t?this.#h():this.#g())}#h(){this.#i||(this.#i=!0,this.#v(),this.#L(),document.body.appendChild(this.#r),this.#t.offsetWidth,this.#t.classList.remove("vtsc-pop-enter-from"),this.#e?.classList.remove("vtsc-fade-enter-from"),l(this,"dismissable",!0)&&this.#y(),this.dispatchEvent(new CustomEvent("opened",{bubbles:!0,composed:!0})),this.#p(),requestAnimationFrame(()=>{this.#t&&this.#i&&this.#t.focus({preventScroll:!0})}))}#g(){if(!this.#i)return;this.#i=!1,this.#f(),this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0})),this.#p(),this.isConnected&&this.#s.focus({preventScroll:!0});const t=this.#r,e=this.#t,r=this.#e;if(!t)return;if(f()){this.#v();return}e.classList.remove("vtsc-pop-enter-active","vtsc-pop-enter-from"),e.classList.add("vtsc-pop-leave-active","vtsc-pop-leave-to"),r&&(r.classList.remove("vtsc-fade-enter-active","vtsc-fade-enter-from"),r.classList.add("vtsc-fade-leave-active","vtsc-fade-leave-to"));let n=r?2:1;const c=()=>{clearTimeout(this.#o),this.#r===t&&this.#v()},d=()=>{--n===0&&c()},a=i=>{i.target!==e&&i.target!==r||(i.currentTarget.removeEventListener("transitionend",a),d())};e.addEventListener("transitionend",a),r?.addEventListener("transitionend",a),clearTimeout(this.#o),this.#o=setTimeout(c,700)}#v(){clearTimeout(this.#o),this.#r&&(this.#r.remove(),this.#r=this.#t=this.#e=null)}#L(){const t=document.createElement("div");t.className="vtsc-overlay";const e=t.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=b,l(this,"backdrop",!0)&&(this.#e=this.#_());const n=document.createElement("div");n.className="vtsc__panel vtsc-pop-enter-active vtsc-pop-enter-from",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("tabindex","-1"),n.appendChild(this.#w()),this.#t=n,this.#x(),e.append(r,...this.#e?[this.#e]:[],n),this.#r=t}#_(){const t=document.createElement("div");return t.className="vtsc__backdrop vtsc-fade-enter-active vtsc-fade-enter-from",t.addEventListener("click",()=>{l(this,"dismissable",!0)&&this.#a()}),t}#w(){const t=document.createElement("div");t.className="vtsc__card";const e=document.createElement("div");e.className="vtsc__head";const r=document.createElement("span");r.className="vtsc__avatar",r.textContent="AL";const n=document.createElement("div");n.className="vtsc__id";const c=document.createElement("span");c.className="vtsc__name",c.textContent="Ada Lovelace";const d=document.createElement("span");d.className="vtsc__role",d.textContent="Lead Engineer",n.append(c,d),e.append(r,n);const a=document.createElement("p");a.className="vtsc__bio",a.textContent="A scale pop — this card zooms out of the button.";const i=document.createElement("div");i.className="vtsc__actions";const s=document.createElement("button");s.type="button",s.className="vtsc__btn vtsc__btn--ghost",s.textContent="Close";const v=document.createElement("button");return v.type="button",v.className="vtsc__btn vtsc__btn--primary",v.textContent="Follow",s.addEventListener("click",()=>this.#a()),v.addEventListener("click",()=>this.#a()),i.append(s,v),t.append(e,a,i),t}#x(){this.#l.length&&this.#t.classList.remove(...this.#l),this.#l=[`vtsc--${p(this,"size","md")}`,`vtsc--r-${p(this,"radius","squircle")}`,`vtsc--t-${p(this,"tone","default")}`],this.#t.classList.add(...this.#l);const t=l(this,"bounce",!0);this.#t.classList.toggle("vtsc__panel--bounce",t),this.#t.classList.toggle("vtsc-pop--bounce",t)}#y(){this.#d||(this.#d=!0,document.addEventListener("pointerdown",this.#E,!0),document.addEventListener("keydown",this.#k,!0))}#f(){this.#d&&(this.#d=!1,document.removeEventListener("pointerdown",this.#E,!0),document.removeEventListener("keydown",this.#k,!0))}#E=t=>{const e=t.composedPath();e.includes(this)||this.#t&&e.includes(this.#t)||this.#a()};#k=t=>{t.key==="Escape"&&this.#n()&&(t.preventDefault(),this.#a())};#p(){const t=this.#n(),e=l(this,"disabled",!1);this.#c.className=`vtsc vtsc--${p(this,"size","md")} vtsc--r-${p(this,"radius","squircle")} vtsc--t-${p(this,"tone","default")}${t?" is-open":""}${e?" is-disabled":""}`,this.#s.disabled=e,this.#s.setAttribute("aria-expanded",String(t)),this.#s.textContent=p(this,"label","Open card"),this.#r&&(this.#x(),this.#A(),this.#i&&(l(this,"dismissable",!0)?this.#y():this.#f()))}#A(){const t=l(this,"backdrop",!0);if(t&&!this.#e)this.#e=this.#_(),this.#r.shadowRoot.insertBefore(this.#e,this.#t),this.#e.offsetWidth,this.#e.classList.remove("vtsc-fade-enter-from");else if(!t&&this.#e){const e=this.#e;this.#e=null,e.classList.remove("vtsc-fade-enter-active","vtsc-fade-enter-from"),e.classList.add("vtsc-fade-leave-active","vtsc-fade-leave-to");const r=()=>e.remove();f()?r():(e.addEventListener("transitionend",r,{once:!0}),setTimeout(r,500))}}}customElements.define("vs-transform-scale",x);
