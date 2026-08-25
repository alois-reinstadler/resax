const h=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,f=(o,t,e)=>{if(!o.hasAttribute(t))return e;const r=o.getAttribute(t);return!(r==="false"||r==="0")},d=(o,t,e)=>o.getAttribute(t)??e,m=`
  :host { display: inline-flex; }
.vtfl {
  --h: var(--ctrl-h-md, 40px);
  --fs: var(--ctrl-fs-md, 14px);
  --px: var(--ctrl-px-md, 16px);
  --accent: var(--ui-accent, #ededed);
  display: inline-flex;
  font-family: inherit;
  font-size: var(--fs);
  color: var(--text, #ededed);
}
.vtfl--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
.vtfl--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 20px); }
.vtfl--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
.vtfl--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
.vtfl--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

.vtfl__trigger {
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
.vtfl--r-none .vtfl__trigger { border-radius: var(--ctrl-r-none, 4px); }
.vtfl--r-subtle .vtfl__trigger { border-radius: var(--ctrl-r-subtle, 8px); }
.vtfl--r-pill .vtfl__trigger { border-radius: var(--ctrl-r-pill, 999px); }
.vtfl--r-squircle .vtfl__trigger { border-radius: var(--ctrl-r-squircle, 14px); }
@supports (corner-shape: squircle) { .vtfl--r-squircle .vtfl__trigger { corner-shape: squircle; } }
.vtfl__trigger:hover { filter: brightness(1.06); }
.vtfl__trigger:active { transform: scale(0.97); }
.vtfl.is-disabled { opacity: 0.6; pointer-events: none; }
`,b=`
.vtfl__backdrop {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: var(--backdrop, rgba(0, 0, 0, 0.5));
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.vtfl-fade-enter-active, .vtfl-fade-leave-active { transition: opacity 300ms ease; }
.vtfl-fade-enter-from, .vtfl-fade-leave-to { opacity: 0; }

/* stage owns the 3D perspective so the panel flips in depth (not a flat skew) */
.vtfl__stage {
  position: fixed;
  z-index: 70;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  perspective: 1100px;
}

.vtfl__panel {
  --rr: 20px;
  --accent: var(--ui-accent, #ededed);
  border-radius: var(--rr);
  background: var(--bg-card, var(--bg-elevated, #161616));
  border: 1px solid var(--border, #2a2a2a);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
  outline: none;
  color: var(--text, #ededed);
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
.vtfl--ax-x .vtfl__panel { transform-origin: center top; }
.vtfl--ax-y .vtfl__panel { transform-origin: left center; }
.vtfl__panel.vtfl--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
.vtfl__panel.vtfl--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
.vtfl__panel.vtfl--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }
.vtfl__panel.vtfl--r-none { --rr: 8px; }
.vtfl__panel.vtfl--r-subtle { --rr: 10px; }
.vtfl__panel.vtfl--r-pill { --rr: 24px; }
.vtfl__panel.vtfl--r-squircle { --rr: 26px; }
@supports (corner-shape: squircle) { .vtfl__panel.vtfl--r-squircle { corner-shape: squircle; } }

/* the UNIQUE morph: a 3D perspective FLIP around a hinge — the transition targets the
   stage's inner panel (rotate + opacity) so the card unfolds into view */
.vtfl-flip-x-enter-active .vtfl__panel {
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease;
}
.vtfl-flip-x-leave-active .vtfl__panel {
  transition: transform 240ms cubic-bezier(0.4, 0, 1, 1), opacity 200ms ease;
}
.vtfl-flip-x-enter-from .vtfl__panel, .vtfl-flip-x-leave-to .vtfl__panel {
  transform: rotateX(-88deg);
  opacity: 0;
}
.vtfl-flip-y-enter-active .vtfl__panel {
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease;
}
.vtfl-flip-y-leave-active .vtfl__panel {
  transition: transform 240ms cubic-bezier(0.4, 0, 1, 1), opacity 200ms ease;
}
.vtfl-flip-y-enter-from .vtfl__panel, .vtfl-flip-y-leave-to .vtfl__panel {
  transform: rotateY(88deg);
  opacity: 0;
}

.vtfl__card { display: flex; flex-direction: column; gap: 14px; width: 300px; padding: 18px; }
.vtfl__head { display: flex; align-items: center; gap: 12px; }
.vtfl__avatar {
  display: grid; place-items: center;
  width: 46px; height: 46px; flex: none;
  border-radius: 14px;
  background: var(--accent); color: var(--ui-accent-fg, #0b0b0b); font-weight: 700;
}
@supports (corner-shape: squircle) { .vtfl__avatar { corner-shape: squircle; } }
.vtfl__id { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.vtfl__name { font-weight: 700; font-size: 1.05em; color: var(--text, #ededed); }
.vtfl__role { font-size: 0.85em; color: var(--text-muted, #8a8a8a); }
.vtfl__bio { margin: 0; font-size: 0.92em; line-height: 1.5; color: var(--text-secondary, #c4c4c4); }
.vtfl__actions { display: flex; gap: 8px; margin-top: 2px; }
.vtfl__btn {
  flex: 1; height: 38px; border: 0; border-radius: 11px;
  font: inherit; font-weight: 600; cursor: pointer;
  transition: filter 160ms ease, transform 140ms ease;
}
@supports (corner-shape: squircle) { .vtfl__btn { corner-shape: squircle; } }
.vtfl__btn:active { transform: scale(0.96); }
.vtfl__btn--ghost { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); color: var(--text-secondary, #c4c4c4); }
.vtfl__btn--primary { background: var(--accent); color: var(--ui-accent-fg, #0b0b0b); }
.vtfl__btn--primary:hover { filter: brightness(1.06); }

@media (prefers-reduced-motion: reduce) {
  .vtfl-fade-enter-active, .vtfl-fade-leave-active,
  .vtfl-flip-x-enter-active .vtfl__panel, .vtfl-flip-x-leave-active .vtfl__panel,
  .vtfl-flip-y-enter-active .vtfl__panel, .vtfl-flip-y-leave-active .vtfl__panel,
  .vtfl__trigger, .vtfl__btn { transition: none; }
  .vtfl-flip-x-enter-from .vtfl__panel, .vtfl-flip-x-leave-to .vtfl__panel,
  .vtfl-flip-y-enter-from .vtfl__panel, .vtfl-flip-y-leave-to .vtfl__panel {
    transform: none; opacity: 1;
  }
}
`,g=["x","y"];let p;function _(o){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=o;const t=p.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(o,t){const e=t?_(String(t).trim()):null;if(!e){for(const i of x)o.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),l=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,s=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(i=>Math.round(l?i*.92:i+(255-i)*.16)),n=(i,v)=>o.style.setProperty(i,v);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(i,s);n("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(i,l?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])n(i,l?"0 0 0":"255 255 255");n("--vs-color",s),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["size","radius","tone","label","disabled","backdrop","dismissable","open","axis","color"];#o;#e;#r=null;#a=null;#i=null;#t=null;#d=[];#b=!1;#s=!1;#v=!1;#f=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#o=document.createElement("div"),this.#o.className="vtfl",this.#e=document.createElement("button"),this.#e.type="button",this.#e.className="vtfl__trigger",this.#e.setAttribute("aria-haspopup","dialog"),this.#e.addEventListener("click",()=>this.#g()),this.#o.appendChild(this.#e),t.append(e,this.#o)}connectedCallback(){u(this,this.getAttribute("color")),this.#h(),this.#n()&&this.#u()}disconnectedCallback(){clearTimeout(this.#f),this.#m(),this.#p(),this.#s=!1}attributeChangedCallback(){if(u(this,this.getAttribute("color")),!this.#o||!this.isConnected)return;const t=this.#n();if(t!==this.#s){t?this.#u():this.#x();return}this.#h()}get open(){return this.#n()}set open(t){this.setAttribute("open",t?"":"false")}toggle(){this.#g()}#n(){return this.hasAttribute("open")?f(this,"open",!1):this.#b}#l(){return d(this,"axis","x")}#g(){f(this,"disabled",!1)||(this.#n()?this.#c():this.#L())}#L(){f(this,"disabled",!1)||this.#n()||this.#_(!0)}#c(){this.#n()&&this.#_(!1)}#_(t){const e=this.hasAttribute("open");e||(this.#b=t),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{open:t}})),e||(t?this.#u():this.#x())}#u(){this.#s||(this.#s=!0,this.#p(),this.#A(),document.body.appendChild(this.#r),this.#i.offsetWidth,this.#a.classList.remove(`vtfl-flip-${this.#l()}-enter-from`),this.#t?.classList.remove("vtfl-fade-enter-from"),f(this,"dismissable",!0)&&this.#k(),this.dispatchEvent(new CustomEvent("opened",{bubbles:!0,composed:!0})),this.#h(),requestAnimationFrame(()=>{this.#i&&this.#s&&this.#i.focus({preventScroll:!0})}))}#x(){if(!this.#s)return;this.#s=!1,this.#m(),this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0})),this.#h(),this.isConnected&&this.#e.focus({preventScroll:!0});const t=this.#r,e=this.#a,r=this.#i,a=this.#t;if(!t)return;if(h()){this.#p();return}for(const i of g)e.classList.remove(`vtfl-flip-${i}-enter-active`,`vtfl-flip-${i}-enter-from`);e.classList.add(`vtfl-flip-${this.#l()}-leave-active`,`vtfl-flip-${this.#l()}-leave-to`),a&&(a.classList.remove("vtfl-fade-enter-active","vtfl-fade-enter-from"),a.classList.add("vtfl-fade-leave-active","vtfl-fade-leave-to"));let l=a?2:1;const s=()=>{clearTimeout(this.#f),this.#r===t&&this.#p()},c=()=>{--l===0&&s()},n=i=>{i.target!==r&&i.target!==a||(i.currentTarget.removeEventListener("transitionend",n),c())};r.addEventListener("transitionend",n),a?.addEventListener("transitionend",n),clearTimeout(this.#f),this.#f=setTimeout(s,700)}#p(){clearTimeout(this.#f),this.#r&&(this.#r.remove(),this.#r=this.#a=this.#i=this.#t=null)}#A(){const t=document.createElement("div");t.className="vtfl-overlay";const e=t.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=b,f(this,"backdrop",!0)&&(this.#t=this.#y());const a=this.#l(),l=document.createElement("div");l.className=`vtfl__stage vtfl--ax-${a} vtfl-flip-${a}-enter-active vtfl-flip-${a}-enter-from`,this.#a=l;const s=document.createElement("div");s.className="vtfl__panel",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("tabindex","-1"),s.appendChild(this.#$()),this.#i=s,this.#E(),l.appendChild(s),e.append(r,...this.#t?[this.#t]:[],l),this.#r=t}#y(){const t=document.createElement("div");return t.className="vtfl__backdrop vtfl-fade-enter-active vtfl-fade-enter-from",t.addEventListener("click",()=>{f(this,"dismissable",!0)&&this.#c()}),t}#$(){const t=document.createElement("div");t.className="vtfl__card";const e=document.createElement("div");e.className="vtfl__head";const r=document.createElement("span");r.className="vtfl__avatar",r.textContent="AL";const a=document.createElement("div");a.className="vtfl__id";const l=document.createElement("span");l.className="vtfl__name",l.textContent="Ada Lovelace";const s=document.createElement("span");s.className="vtfl__role",s.textContent="Lead Engineer",a.append(l,s),e.append(r,a);const c=document.createElement("p");c.className="vtfl__bio",c.textContent="A 3D flip — the card unfolds around a hinge.";const n=document.createElement("div");n.className="vtfl__actions";const i=document.createElement("button");i.type="button",i.className="vtfl__btn vtfl__btn--ghost",i.textContent="Close";const v=document.createElement("button");return v.type="button",v.className="vtfl__btn vtfl__btn--primary",v.textContent="Follow",i.addEventListener("click",()=>this.#c()),v.addEventListener("click",()=>this.#c()),n.append(i,v),t.append(e,c,n),t}#E(){this.#d.length&&this.#i.classList.remove(...this.#d),this.#d=[`vtfl--${d(this,"size","md")}`,`vtfl--r-${d(this,"radius","squircle")}`,`vtfl--t-${d(this,"tone","default")}`],this.#i.classList.add(...this.#d)}#k(){this.#v||(this.#v=!0,document.addEventListener("pointerdown",this.#w,!0),document.addEventListener("keydown",this.#C,!0))}#m(){this.#v&&(this.#v=!1,document.removeEventListener("pointerdown",this.#w,!0),document.removeEventListener("keydown",this.#C,!0))}#w=t=>{const e=t.composedPath();e.includes(this)||this.#i&&e.includes(this.#i)||this.#c()};#C=t=>{t.key==="Escape"&&this.#n()&&(t.preventDefault(),this.#c())};#h(){const t=this.#n(),e=f(this,"disabled",!1);this.#o.className=`vtfl vtfl--${d(this,"size","md")} vtfl--r-${d(this,"radius","squircle")} vtfl--t-${d(this,"tone","default")} vtfl--ax-${this.#l()}${t?" is-open":""}${e?" is-disabled":""}`,this.#e.disabled=e,this.#e.setAttribute("aria-expanded",String(t)),this.#e.textContent=d(this,"label","Open card"),this.#r&&(this.#E(),this.#a.classList.toggle("vtfl--ax-x",this.#l()==="x"),this.#a.classList.toggle("vtfl--ax-y",this.#l()==="y"),this.#N(),this.#s&&(f(this,"dismissable",!0)?this.#k():this.#m()))}#N(){const t=f(this,"backdrop",!0);if(t&&!this.#t)this.#t=this.#y(),this.#r.shadowRoot.insertBefore(this.#t,this.#a),this.#t.offsetWidth,this.#t.classList.remove("vtfl-fade-enter-from");else if(!t&&this.#t){const e=this.#t;this.#t=null,e.classList.remove("vtfl-fade-enter-active","vtfl-fade-enter-from"),e.classList.add("vtfl-fade-leave-active","vtfl-fade-leave-to");const r=()=>e.remove();h()?r():(e.addEventListener("transitionend",r,{once:!0}),setTimeout(r,500))}}}customElements.define("vs-transform-flip",y);
