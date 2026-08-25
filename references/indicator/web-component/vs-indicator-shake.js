const v="http://www.w3.org/2000/svg",A=`
  :host { display: inline-flex; }
  .shk {
    --shk-spring: cubic-bezier(0.22, 1, 0.36, 1);
    --badge: 19px;
    --dot: 10px;
    --pushx: 35%;
    --pushy: -35%;
    position: relative;
    isolation: isolate;
    display: inline-flex;
    flex: none;
    vertical-align: middle;
  }

  .shk--sm { --badge: 16px; --dot: 8px; }
  .shk--md { --badge: 19px; --dot: 10px; }
  .shk--lg { --badge: 24px; --dot: 13px; }

  .shk__anchor { display: inline-flex; border-radius: inherit; }

  .shk__demo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--surface-2, #1a1a1a);
    color: var(--text-muted, #8a8a8a);
    box-shadow: inset 0 0 0 1px var(--border, #2a2a2a);
  }
  .shk__demo svg { width: 60%; height: 60%; }
  .shk--sm .shk__demo { width: 34px; height: 34px; }
  .shk--lg .shk__demo { width: 60px; height: 60px; }

  .shk--p-top-right    .shk__badge { top: 0; right: 0; }
  .shk--p-top-left     .shk__badge { top: 0; left: 0; }
  .shk--p-bottom-right .shk__badge { bottom: 0; right: 0; }
  .shk--p-bottom-left  .shk__badge { bottom: 0; left: 0; }

  .shk--p-top-right    { --pushx: 35%;  --pushy: -35%; }
  .shk--p-top-left     { --pushx: -35%; --pushy: -35%; }
  .shk--p-bottom-right { --pushx: 35%;  --pushy: 35%; }
  .shk--p-bottom-left  { --pushx: -35%; --pushy: 35%; }

  .shk__badge {
    position: absolute;
    z-index: 5;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-sizing: border-box;
    height: var(--badge);
    min-width: var(--badge);
    width: calc(var(--badge) + (var(--digits, 1) - 1) * 0.6em);
    border-radius: 999px;
    color: #fff;
    font-size: calc(var(--badge) * 0.52);
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    box-shadow: 0 0 0 2px var(--bg, #0a0a0a);
    transform: translate(var(--pushx), var(--pushy));
    transform-origin: var(--pushx) var(--pushy);
    transition:
      width 420ms var(--shk-spring),
      border-radius 300ms var(--shk-spring),
      background-color 300ms ease;
  }

  .shk--m-dot { width: var(--dot); min-width: var(--dot); height: var(--dot); }
  .shk--m-icon { width: var(--badge); min-width: var(--badge); }

  /* inner wrapper that shakes: rotates in bursts (does not affect position) */
  .shk__jitter {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transform-origin: 50% 0%;
    animation: shk-ring var(--cycle, 2.4s) ease-in-out infinite;
  }
  .shk__content { display: inline-flex; align-items: center; justify-content: center; }
  .shk--m-icon ::slotted(svg) {
    width: calc(var(--badge) * 0.62);
    height: calc(var(--badge) * 0.62);
    display: block;
  }
  .shk__num { display: block; }

  .shk--t-danger  { --tone-c: var(--tone-danger,  #f23f43); }
  .shk--t-success { --tone-c: var(--tone-success, #23a55a); }
  .shk--t-warn    { --tone-c: var(--tone-warn,    #f0b232); }
  .shk--t-info    { --tone-c: var(--ui-accent, #ededed); }
  .shk--t-neutral { --tone-c: var(--tone-neutral, var(--ui-accent, #ededed)); }
  .shk__badge { background: var(--tone-c, var(--ui-accent, #ededed)); }
  .shk--t-warn.shk__badge { color: #160f02; }

  /* ── shake: bell-like rotation burst, then a pause ─────────────────── */
  @keyframes shk-ring {
    0%   { transform: rotate(0deg); }
    3%   { transform: rotate(14deg); }
    6%   { transform: rotate(-12deg); }
    9%   { transform: rotate(10deg); }
    12%  { transform: rotate(-8deg); }
    15%  { transform: rotate(5deg); }
    18%  { transform: rotate(-3deg); }
    21%  { transform: rotate(0deg); }
    100% { transform: rotate(0deg); }
  }

  .shk__badge.shk-pop-enter-active {
    transition: transform 420ms var(--shk-spring), opacity 220ms ease, filter 280ms ease;
  }
  .shk__badge.shk-pop-leave-active {
    transition: transform 200ms cubic-bezier(0.4, 0, 1, 1), opacity 170ms ease, filter 170ms ease;
  }
  .shk__badge.shk-pop-enter-from {
    opacity: 0; filter: blur(7px);
    transform: translate(var(--pushx), var(--pushy)) scale(0);
  }
  .shk__badge.shk-pop-leave-to {
    opacity: 0; filter: blur(7px);
    transform: translate(var(--pushx), var(--pushy)) scale(0.2);
  }

  .shk-swap-enter-active { transition: opacity 200ms ease, filter 200ms ease, scale 320ms var(--shk-spring); }
  .shk-swap-leave-active { transition: opacity 150ms ease, filter 150ms ease, scale 150ms cubic-bezier(0.4, 0, 1, 1); }
  .shk-swap-enter-from { opacity: 0; filter: blur(6px); scale: 0.45; }
  .shk-swap-leave-to   { opacity: 0; filter: blur(6px); scale: 0.35; }

  @media (prefers-reduced-motion: reduce) {
    .shk__jitter { animation: none; }
    .shk__badge,
    .shk-swap-enter-active,
    .shk-swap-leave-active { transition: none; }
  }
`;let u;function C(m){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=m;const t=u.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const E=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function k(m,t){const e=t?C(String(t).trim()):null;if(!e){for(const i of E)m.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),n=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,r=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(i=>Math.round(n?i*.92:i+(255-i)*.16)),a=(i,f)=>m.style.setProperty(i,f);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(i,r);a("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(i,n?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])a(i,n?"0 0 0":"255 255 255");a("--vs-color",r),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class L extends HTMLElement{static observedAttributes=["count","max","dot","show-zero","position","tone","size","every","color"];#s;#t;#o;#n;#e;#r;#m=!1;#d=!1;#i=null;#a=new Map;#u=()=>this.#p();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=A,this.#s=document.createElement("span"),this.#s.className="shk";const s=document.createElement("span");s.className="shk__anchor";const c=document.createElement("slot"),n=document.createElement("span");n.className="shk__demo",n.setAttribute("aria-hidden","true");const r=document.createElementNS(v,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none");for(const o of["M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z","M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"]){const a=document.createElementNS(v,"path");a.setAttribute("d",o),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),r.appendChild(a)}n.appendChild(r),c.appendChild(n),s.appendChild(c),this.#t=document.createElement("span"),this.#t.className="shk__badge",this.#t.setAttribute("role","status"),this.#t.hidden=!0,this.#o=document.createElement("span"),this.#o.className="shk__jitter",this.#n=document.createElement("span"),this.#n.className="shk__content",this.#e=document.createElement("slot"),this.#e.name="badge",this.#r=document.createElement("span"),this.#r.className="shk__num",this.#n.append(this.#e,this.#r),this.#o.appendChild(this.#n),this.#t.appendChild(this.#o),this.#s.append(s,this.#t),t.append(e,this.#s),this.#e.addEventListener("slotchange",this.#u)}connectedCallback(){k(this,this.getAttribute("color")),this.#p()}disconnectedCallback(){this.#e.removeEventListener("slotchange",this.#u);for(const[t,e]of this.#a)t.removeEventListener("transitionend",e.fn),clearTimeout(e.timer);this.#a.clear()}attributeChangedCallback(){k(this,this.getAttribute("color")),this.#s&&this.#p()}#f(){return this.#e.assignedNodes({flatten:!0}).length>0}#p(){const t=(w,x)=>this.getAttribute(w)??x,e=t("size","md"),s=t("position","top-right"),c=t("tone","danger"),n=this.hasAttribute("dot"),r=this.hasAttribute("show-zero"),o=this.hasAttribute("count")?Number(this.getAttribute("count")):null,a=this.hasAttribute("max")?Number(this.getAttribute("max")):99,i=this.hasAttribute("every")?Number(this.getAttribute("every")):2.4,f=Number.isFinite(i)?i:2.4,b=this.#f(),h=n?"dot":b?"icon":"count",g=o??0,l=g>a?`${a}+`:String(g),y=h==="count"?l.length:1,p=h==="count"?`n:${l}`:h,_=`${Math.max(1,f)}s`,d=n||b||g>0||r;if(this.#s.className=`shk shk--${e} shk--p-${s}`,this.#t.className=`shk__badge shk--t-${c} shk--m-${h}`,this.#t.style.setProperty("--digits",String(y)),this.#t.style.setProperty("--cycle",_),h==="count"?this.#t.setAttribute("aria-label",`${l} notifications`):this.#t.removeAttribute("aria-label"),!this.#m){this.#h(h,l),this.#i=p,this.#t.hidden=!d,this.#d=d,this.#m=!0;return}if(d!==this.#d){d?(this.#h(h,l),this.#i=p,this.#g()):this.#b(),this.#d=d;return}d&&p!==this.#i?(this.#v(h,l),this.#i=p):!d&&p!==this.#i&&(this.#h(h,l),this.#i=p)}#h(t,e){this.#e.style.display=t==="icon"?"":"none",this.#r.style.display=t==="count"?"":"none",this.#r.textContent=e}#g(){const t=this.#t;this.#l(t),t.hidden=!1,t.classList.remove("shk-pop-leave-active","shk-pop-leave-to"),t.classList.add("shk-pop-enter-from","shk-pop-enter-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove("shk-pop-enter-from")),this.#c(t,()=>t.classList.remove("shk-pop-enter-active"),420)}#b(){const t=this.#t;this.#l(t),t.classList.remove("shk-pop-enter-from","shk-pop-enter-active"),t.classList.add("shk-pop-leave-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.add("shk-pop-leave-to")),this.#c(t,()=>{t.hidden=!0,t.classList.remove("shk-pop-leave-active","shk-pop-leave-to")},200)}#v(t,e){const s=this.#n;this.#l(s),s.classList.remove("shk-swap-enter-from","shk-swap-enter-active"),s.classList.add("shk-swap-leave-active"),s.offsetWidth,requestAnimationFrame(()=>s.classList.add("shk-swap-leave-to")),this.#c(s,()=>{s.classList.remove("shk-swap-leave-active","shk-swap-leave-to"),this.#h(t,e),s.classList.add("shk-swap-enter-from","shk-swap-enter-active"),s.offsetWidth,requestAnimationFrame(()=>s.classList.remove("shk-swap-enter-from")),this.#c(s,()=>s.classList.remove("shk-swap-enter-active"),320)},150)}#c(t,e,s){this.#l(t);const c=()=>{t.removeEventListener("transitionend",n),clearTimeout(r.timer),this.#a.delete(t),e()},n=o=>{o.target===t&&c()},r={fn:n,timer:setTimeout(c,s)};this.#a.set(t,r),t.addEventListener("transitionend",n)}#l(t){const e=this.#a.get(t);e&&(t.removeEventListener("transitionend",e.fn),clearTimeout(e.timer),this.#a.delete(t))}}customElements.define("vs-indicator-shake",L);
