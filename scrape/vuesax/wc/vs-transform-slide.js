const d=(a,t,e)=>{if(!a.hasAttribute(t))return e;const r=a.getAttribute(t);return!(r==="false"||r==="0")},h=(a,t,e)=>a.getAttribute(t)??e,u=`
  /* the panel's border has to count inside the width the clamp below hands it,
     otherwise the clamped panel still overhangs by its own 2px */
  *, *::before, *::after { box-sizing: border-box; }
  :host { display: inline-flex; }
.vtsl {
  --h: var(--ctrl-h-md, 40px);
  --fs: var(--ctrl-fs-md, 14px);
  --px: var(--ctrl-px-md, 16px);
  --accent: var(--ui-accent, #ededed);
  position: relative;
  display: inline-flex;
  font-family: inherit;
  font-size: var(--fs);
  color: var(--text, #ededed);
}
.vtsl--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
.vtsl--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 20px); }
.vtsl--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
.vtsl--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
.vtsl--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

.vtsl__trigger {
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
.vtsl--r-none .vtsl__trigger { border-radius: var(--ctrl-r-none, 4px); }
.vtsl--r-subtle .vtsl__trigger { border-radius: var(--ctrl-r-subtle, 8px); }
.vtsl--r-pill .vtsl__trigger { border-radius: var(--ctrl-r-pill, 999px); }
.vtsl--r-squircle .vtsl__trigger { border-radius: var(--ctrl-r-squircle, 14px); }
@supports (corner-shape: squircle) { .vtsl--r-squircle .vtsl__trigger { corner-shape: squircle; } }
.vtsl__trigger:hover { filter: brightness(1.06); }
.vtsl__trigger:active { transform: scale(0.97); }
.vtsl.is-disabled { opacity: 0.6; pointer-events: none; }

.vtsl__panel {
  --rr: 20px;
  --accent: var(--ui-accent, #ededed);
  position: absolute;
  z-index: 70;
  /* The panel is anchored inside a trigger-sized box, so a percentage here
     would measure the button, not the column — --vtsl-avail carries the real
     one in from #measure(). Without the clamp the card hangs out of any
     container narrower than itself, open or closed. */
  max-width: min(var(--vtsl-avail, 100vw), calc(100vw - 16px));
  border-radius: var(--rr);
  background: var(--bg-card, var(--bg-elevated, #161616));
  border: 1px solid var(--border, #2a2a2a);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
  outline: none;
  color: var(--text, #ededed);
}
/* anchor position per edge */
.vtsl--f-bottom .vtsl__panel { top: calc(var(--h) + 10px); left: 0; }
.vtsl--f-top .vtsl__panel { bottom: calc(var(--h) + 10px); left: 0; }
.vtsl--f-left .vtsl__panel { top: 0; right: calc(100% + 10px); }
.vtsl--f-right .vtsl__panel { top: 0; left: calc(100% + 10px); }

.vtsl__panel.vtsl--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
.vtsl__panel.vtsl--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
.vtsl__panel.vtsl--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }
.vtsl__panel.vtsl--r-none { --rr: 8px; }
.vtsl__panel.vtsl--r-subtle { --rr: 10px; }
.vtsl__panel.vtsl--r-pill { --rr: 24px; }
.vtsl__panel.vtsl--r-squircle { --rr: 26px; }
@supports (corner-shape: squircle) { .vtsl__panel.vtsl--r-squircle { corner-shape: squircle; } }

/* the UNIQUE morph: a directional slide reveal, one variant per edge.
   Closed = "leave-to" resting state (base rule, leave timing + delayed
   visibility). Open = "enter" state (.is-open rule, enter timing, instant
   visibility). Direction transform comes from the --f-* class on the root. */
.vtsl__panel {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition: transform 200ms cubic-bezier(0.4, 0, 1, 1), opacity 170ms ease, visibility 0s linear 200ms;
}
.vtsl--f-bottom .vtsl__panel { transform: translateY(-14px); }
.vtsl--f-top .vtsl__panel { transform: translateY(14px); }
.vtsl--f-left .vtsl__panel { transform: translateX(14px); }
.vtsl--f-right .vtsl__panel { transform: translateX(-14px); }

.vtsl.is-open .vtsl__panel {
  opacity: 1;
  transform: none;
  pointer-events: auto;
  visibility: visible;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease, visibility 0s;
}

/* 336px = the 300px surface plus its own padding, now that the box counts it —
   same panel as ever on a wide page, but it can give ground once the clamp
   above narrows the panel it sits in. */
.vtsl__card { display: flex; flex-direction: column; gap: 14px; width: 336px; max-width: 100%; padding: 18px; }
.vtsl__head { display: flex; align-items: center; gap: 12px; }
.vtsl__avatar {
  display: grid; place-items: center;
  width: 46px; height: 46px; flex: none;
  border-radius: 14px;
  background: var(--accent); color: var(--ui-accent-fg, #0b0b0b); font-weight: 700;
}
@supports (corner-shape: squircle) { .vtsl__avatar { corner-shape: squircle; } }
.vtsl__id { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.vtsl__name { font-weight: 700; font-size: 1.05em; color: var(--text, #ededed); }
.vtsl__role { font-size: 0.85em; color: var(--text-muted, #8a8a8a); }
.vtsl__bio { margin: 0; font-size: 0.92em; line-height: 1.5; color: var(--text-secondary, #c4c4c4); }
.vtsl__actions { display: flex; gap: 8px; margin-top: 2px; }
.vtsl__btn {
  flex: 1; height: 38px; border: 0; border-radius: 11px;
  font: inherit; font-weight: 600; cursor: pointer;
  transition: filter 160ms ease, transform 140ms ease;
}
@supports (corner-shape: squircle) { .vtsl__btn { corner-shape: squircle; } }
.vtsl__btn:active { transform: scale(0.96); }
.vtsl__btn--ghost { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); color: var(--text-secondary, #c4c4c4); }
.vtsl__btn--primary { background: var(--accent); color: var(--ui-accent-fg, #0b0b0b); }
.vtsl__btn--primary:hover { filter: brightness(1.06); }

@media (prefers-reduced-motion: reduce) {
  .vtsl__panel, .vtsl.is-open .vtsl__panel { transition: none; }
  .vtsl__trigger, .vtsl__btn { transition: none; }
  .vtsl__panel { transform: none; }
}
`;let v;function m(a){if(v||=document.createElement("canvas").getContext("2d"),!v)return null;v.fillStyle="#000",v.fillStyle=a;const t=v.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(a,t){const e=t?m(String(t).trim()):null;if(!e){for(const s of b)a.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),n=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(s=>Math.round(n?s*.92:s+(255-s)*.16)),i=(s,p)=>a.style.setProperty(s,p);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(s,l);i("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(s,n?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])i(s,n?"0 0 0":"255 255 255");i("--vs-color",l),i("--vs-color-rgb",e.join(" ")),i("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["size","radius","tone","label","disabled","dismissable","open","from","color"];#r;#t;#e;#d=!1;#s=!1;#l=!1;#n;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#r=document.createElement("div"),this.#r.className="vtsl",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="vtsl__trigger",this.#t.setAttribute("aria-haspopup","dialog"),this.#t.addEventListener("click",()=>this.#v()),this.#e=document.createElement("div"),this.#e.className="vtsl__panel",this.#e.setAttribute("role","dialog"),this.#e.setAttribute("aria-modal","false"),this.#e.setAttribute("tabindex","-1"),this.#e.appendChild(this.#y()),this.#r.append(this.#t,this.#e),t.append(e,this.#r)}connectedCallback(){f(this,this.getAttribute("color")),this.#s=this.#i(),this.#o(),this.#_(),this.#s&&d(this,"dismissable",!0)&&this.#c()}disconnectedCallback(){this.#p(),this.#n?.disconnect(),this.#n=void 0}#h=()=>{const t=this.parentElement?.clientWidth||0;t>0?this.#r.style.setProperty("--vtsl-avail",`${t}px`):this.#r.style.removeProperty("--vtsl-avail")};#_(){this.#h(),!(this.#n||typeof ResizeObserver>"u"||!this.parentElement)&&(this.#n=new ResizeObserver(this.#h),this.#n.observe(this.parentElement))}attributeChangedCallback(){if(f(this,this.getAttribute("color")),!this.#r||!this.isConnected)return;const t=this.#i();if(t!==this.#s){t?this.#u():this.#m();return}this.#o()}get open(){return this.#i()}set open(t){this.setAttribute("open",t?"":"false")}toggle(){this.#v()}#i(){return this.hasAttribute("open")?d(this,"open",!1):this.#d}#v(){d(this,"disabled",!1)||(this.#i()?this.#a():this.#x())}#x(){d(this,"disabled",!1)||this.#i()||this.#f(!0)}#a(){this.#i()&&this.#f(!1)}#f(t){const e=this.hasAttribute("open");e||(this.#d=t),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{open:t}})),e||(t?this.#u():this.#m())}#u(){this.#s||(this.#s=!0,d(this,"dismissable",!0)&&this.#c(),this.dispatchEvent(new CustomEvent("opened",{bubbles:!0,composed:!0})),this.#o(),requestAnimationFrame(()=>{this.#s&&this.#e.focus({preventScroll:!0})}))}#m(){this.#s&&(this.#s=!1,this.#p(),this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0})),this.#o(),this.isConnected&&this.#t.focus({preventScroll:!0}))}#y(){const t=document.createElement("div");t.className="vtsl__card";const e=document.createElement("div");e.className="vtsl__head";const r=document.createElement("span");r.className="vtsl__avatar",r.textContent="AL";const o=document.createElement("div");o.className="vtsl__id";const n=document.createElement("span");n.className="vtsl__name",n.textContent="Ada Lovelace";const l=document.createElement("span");l.className="vtsl__role",l.textContent="Lead Engineer",o.append(n,l),e.append(r,o);const c=document.createElement("p");c.className="vtsl__bio",c.textContent="A directional slide — the panel glides in from the edge.";const i=document.createElement("div");i.className="vtsl__actions";const s=document.createElement("button");s.type="button",s.className="vtsl__btn vtsl__btn--ghost",s.textContent="Close";const p=document.createElement("button");return p.type="button",p.className="vtsl__btn vtsl__btn--primary",p.textContent="Follow",s.addEventListener("click",()=>this.#a()),p.addEventListener("click",()=>this.#a()),i.append(s,p),t.append(e,c,i),t}#c(){this.#l||(this.#l=!0,document.addEventListener("pointerdown",this.#b,!0),document.addEventListener("keydown",this.#g,!0))}#p(){this.#l&&(this.#l=!1,document.removeEventListener("pointerdown",this.#b,!0),document.removeEventListener("keydown",this.#g,!0))}#b=t=>{const e=t.composedPath();e.includes(this)||e.includes(this.#e)||this.#a()};#g=t=>{t.key==="Escape"&&this.#i()&&(t.preventDefault(),this.#a())};#o(){const t=this.#i(),e=d(this,"disabled",!1),r=h(this,"size","md"),o=h(this,"radius","squircle"),n=h(this,"tone","default"),l=h(this,"from","bottom");this.#r.className=`vtsl vtsl--${r} vtsl--r-${o} vtsl--t-${n} vtsl--f-${l}${t?" is-open":""}${e?" is-disabled":""}`,this.#t.disabled=e,this.#t.setAttribute("aria-expanded",String(t)),this.#t.textContent=h(this,"label","Open card"),this.#e.className=`vtsl__panel vtsl--${r} vtsl--r-${o} vtsl--t-${n}`,this.#s&&(d(this,"dismissable",!0)?this.#c():this.#p())}}customElements.define("vs-transform-slide",g);
