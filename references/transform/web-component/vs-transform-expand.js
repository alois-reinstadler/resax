const f=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,d=(o,t,e)=>{if(!o.hasAttribute(t))return e;const r=o.getAttribute(t);return!(r==="false"||r==="0")},c=(o,t,e)=>o.getAttribute(t)??e,m=`
  :host { display: inline-flex; }
.vte {
  --h: var(--ctrl-h-md, 40px);
  --fs: var(--ctrl-fs-md, 14px);
  --px: var(--ctrl-px-md, 16px);
  --accent: var(--ui-accent, #ededed);
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: inherit;
  font-size: var(--fs);
  color: var(--text, #ededed);
}
.vte--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
.vte--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 20px); }
.vte--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
.vte--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
.vte--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

.vte__trigger {
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
.vte--r-none .vte__trigger { border-radius: var(--ctrl-r-none, 4px); }
.vte--r-subtle .vte__trigger { border-radius: var(--ctrl-r-subtle, 8px); }
.vte--r-pill .vte__trigger { border-radius: var(--ctrl-r-pill, 999px); }
.vte--r-squircle .vte__trigger { border-radius: var(--ctrl-r-squircle, 14px); }
@supports (corner-shape: squircle) { .vte--r-squircle .vte__trigger { corner-shape: squircle; } }
.vte__trigger:hover { filter: brightness(1.06); }
.vte__trigger:active { transform: scale(0.97); }
.vte.is-disabled { opacity: 0.6; pointer-events: none; }

/* the UNIQUE morph: the collapse wrapper animates HEIGHT (JS) while the panel is
   CLIPPED open from the top edge (clip-path wipe) — an in-flow accordion unfold */
.vte__collapse {
  overflow: hidden;
  margin-top: 10px;
}
.vte__panel {
  --rr: 20px;
  --accent: var(--ui-accent, #ededed);
  border-radius: var(--rr);
  background: var(--bg-card, var(--bg-elevated, #161616));
  border: 1px solid var(--border, #2a2a2a);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
  outline: none;
  color: var(--text, #ededed);
  animation: vte-wipe 340ms cubic-bezier(0.22, 1, 0.36, 1);
}
.vte--soft .vte__panel { animation: vte-wipe-soft 340ms cubic-bezier(0.22, 1, 0.36, 1); }
.vte__panel.vte--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
.vte__panel.vte--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
.vte__panel.vte--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }
.vte__panel.vte--r-none { --rr: 8px; }
.vte__panel.vte--r-subtle { --rr: 10px; }
.vte__panel.vte--r-pill { --rr: 24px; }
.vte__panel.vte--r-squircle { --rr: 26px; }
@supports (corner-shape: squircle) { .vte__panel.vte--r-squircle { corner-shape: squircle; } }

@keyframes vte-wipe {
  from { clip-path: inset(0 0 100% 0); }
  to { clip-path: inset(0 0 0 0); }
}
@keyframes vte-wipe-soft {
  from { clip-path: inset(0 0 100% 0); opacity: 0; }
  to { clip-path: inset(0 0 0 0); opacity: 1; }
}

.vte__card { display: flex; flex-direction: column; gap: 14px; width: 300px; padding: 18px; }
.vte__head { display: flex; align-items: center; gap: 12px; }
.vte__avatar {
  display: grid; place-items: center;
  width: 46px; height: 46px; flex: none;
  border-radius: 14px;
  background: var(--accent); color: var(--ui-accent-fg, #0b0b0b); font-weight: 700;
}
@supports (corner-shape: squircle) { .vte__avatar { corner-shape: squircle; } }
.vte__id { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.vte__name { font-weight: 700; font-size: 1.05em; color: var(--text, #ededed); }
.vte__role { font-size: 0.85em; color: var(--text-muted, #8a8a8a); }
.vte__bio { margin: 0; font-size: 0.92em; line-height: 1.5; color: var(--text-secondary, #c4c4c4); }
.vte__actions { display: flex; gap: 8px; margin-top: 2px; }
.vte__btn {
  flex: 1; height: 38px; border: 0; border-radius: 11px;
  font: inherit; font-weight: 600; cursor: pointer;
  transition: filter 160ms ease, transform 140ms ease;
}
@supports (corner-shape: squircle) { .vte__btn { corner-shape: squircle; } }
.vte__btn:active { transform: scale(0.96); }
.vte__btn--ghost { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); color: var(--text-secondary, #c4c4c4); }
.vte__btn--primary { background: var(--accent); color: var(--ui-accent-fg, #0b0b0b); }
.vte__btn--primary:hover { filter: brightness(1.06); }

@media (prefers-reduced-motion: reduce) {
  .vte__trigger, .vte__btn { transition: none; }
  .vte__panel, .vte--soft .vte__panel { animation: none; clip-path: none; opacity: 1; }
}
`;let u;function b(o){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=o;const t=u.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(o,t){const e=t?b(String(t).trim()):null;if(!e){for(const i of g)o.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),s=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,p=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(i=>Math.round(s?i*.92:i+(255-i)*.16)),n=(i,h)=>o.style.setProperty(i,h);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(i,p);n("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(i,s?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])n(i,s?"0 0 0":"255 255 255");n("--vs-color",p),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["size","radius","tone","label","disabled","dismissable","open","soft-fade","color"];#n;#t;#e=null;#i=null;#a=[];#v=!1;#r=!1;#h=!1;#o=0;#c=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#n=document.createElement("div"),this.#n.className="vte",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="vte__trigger",this.#t.setAttribute("aria-haspopup","true"),this.#t.addEventListener("click",()=>this.#m()),this.#n.appendChild(this.#t),t.append(e,this.#n)}connectedCallback(){v(this,this.getAttribute("color")),this.#p(),this.#s()&&this.#u()}disconnectedCallback(){clearTimeout(this.#o),clearTimeout(this.#c),this.#f(),this.#d(),this.#r=!1}attributeChangedCallback(){if(v(this,this.getAttribute("color")),!this.#n||!this.isConnected)return;const t=this.#s();if(t!==this.#r){t?this.#u():this.#g();return}this.#p()}get open(){return this.#s()}set open(t){this.setAttribute("open",t?"":"false")}toggle(){this.#m()}#s(){return this.hasAttribute("open")?d(this,"open",!1):this.#v}#m(){d(this,"disabled",!1)||(this.#s()?this.#l():this.#w())}#w(){d(this,"disabled",!1)||this.#s()||this.#b(!0)}#l(){this.#s()&&this.#b(!1)}#b(t){const e=this.hasAttribute("open");e||(this.#v=t),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{open:t}})),e||(t?this.#u():this.#g())}#u(){this.#r||(this.#r=!0,this.#d(),this.#N(),this.#n.appendChild(this.#e),d(this,"dismissable",!0)&&this.#x(),this.dispatchEvent(new CustomEvent("opened",{bubbles:!0,composed:!0})),this.#p(),this.#C(),requestAnimationFrame(()=>{this.#i&&this.#r&&this.#i.focus({preventScroll:!0})}))}#g(){this.#r&&(this.#r=!1,this.#f(),this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0})),this.#p(),this.isConnected&&this.#t.focus({preventScroll:!0}),this.#A())}#C(){const t=this.#e;if(!t)return;if(f()){t.style.height="auto";return}const e=t.scrollHeight;t.style.height="0px",t.offsetHeight,t.style.transition="height 340ms cubic-bezier(0.22, 1, 0.36, 1)",t.style.height=`${e}px`,clearTimeout(this.#o);const r=a=>{a&&(a.target!==t||a.propertyName!=="height")||(t.removeEventListener("transitionend",r),clearTimeout(this.#o),t.style.transition="",t.style.height="auto")};this.#o=setTimeout(()=>r(),420),t.addEventListener("transitionend",r)}#A(){const t=this.#e;if(!t)return;if(f()){this.#d();return}const e=t.scrollHeight;t.style.height=`${e}px`,t.offsetHeight,t.style.transition="height 240ms cubic-bezier(0.4, 0, 1, 1)",t.style.height="0px";const r=()=>{clearTimeout(this.#c),this.#e===t&&this.#d()},a=s=>{s&&(s.target!==t||s.propertyName!=="height")||(t.removeEventListener("transitionend",a),r())};clearTimeout(this.#c),this.#c=setTimeout(r,320),t.addEventListener("transitionend",a)}#d(){clearTimeout(this.#o),clearTimeout(this.#c),this.#e&&(this.#e.remove(),this.#e=this.#i=null)}#N(){const t=document.createElement("div");t.className="vte__collapse";const e=document.createElement("div");e.className="vte__panel",e.setAttribute("role","region"),e.setAttribute("tabindex","-1"),e.appendChild(this.#q()),this.#i=e,this.#a=[],this.#_(),t.appendChild(e),this.#e=t}#q(){const t=document.createElement("div");t.className="vte__card";const e=document.createElement("div");e.className="vte__head";const r=document.createElement("span");r.className="vte__avatar",r.textContent="AL";const a=document.createElement("div");a.className="vte__id";const s=document.createElement("span");s.className="vte__name",s.textContent="Ada Lovelace";const p=document.createElement("span");p.className="vte__role",p.textContent="Lead Engineer",a.append(s,p),e.append(r,a);const l=document.createElement("p");l.className="vte__bio",l.textContent="An unfold — the panel clips open beneath the trigger.";const n=document.createElement("div");n.className="vte__actions";const i=document.createElement("button");i.type="button",i.className="vte__btn vte__btn--ghost",i.textContent="Close";const h=document.createElement("button");return h.type="button",h.className="vte__btn vte__btn--primary",h.textContent="Follow",i.addEventListener("click",()=>this.#l()),h.addEventListener("click",()=>this.#l()),n.append(i,h),t.append(e,l,n),t}#_(){this.#a.length&&this.#i.classList.remove(...this.#a),this.#a=[`vte--${c(this,"size","md")}`,`vte--r-${c(this,"radius","squircle")}`,`vte--t-${c(this,"tone","default")}`],this.#i.classList.add(...this.#a),this.#i.setAttribute("aria-label",c(this,"label","Open card"))}#x(){this.#h||(this.#h=!0,document.addEventListener("pointerdown",this.#y,!0),document.addEventListener("keydown",this.#E,!0))}#f(){this.#h&&(this.#h=!1,document.removeEventListener("pointerdown",this.#y,!0),document.removeEventListener("keydown",this.#E,!0))}#y=t=>{t.composedPath().includes(this)||this.#l()};#E=t=>{t.key==="Escape"&&this.#s()&&(t.preventDefault(),this.#l())};#p(){const t=this.#s(),e=d(this,"disabled",!1),r=d(this,"soft-fade",!0);this.#n.className=`vte vte--${c(this,"size","md")} vte--r-${c(this,"radius","squircle")} vte--t-${c(this,"tone","default")}${t?" is-open":""}${e?" is-disabled":""}${r?" vte--soft":""}`,this.#t.disabled=e,this.#t.setAttribute("aria-expanded",String(t)),this.#t.textContent=c(this,"label","Open card"),this.#i&&(this.#_(),this.#r&&(d(this,"dismissable",!0)?this.#x():this.#f()))}}customElements.define("vs-transform-expand",_);
