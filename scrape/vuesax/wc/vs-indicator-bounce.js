const g="http://www.w3.org/2000/svg",w=`
  :host { display: inline-flex; }
  .bnc {
    --bnc-spring: cubic-bezier(0.22, 1, 0.36, 1);
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

  .bnc--sm { --badge: 16px; --dot: 8px; }
  .bnc--md { --badge: 19px; --dot: 10px; }
  .bnc--lg { --badge: 24px; --dot: 13px; }

  .bnc__anchor { display: inline-flex; border-radius: inherit; }

  .bnc__demo {
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
  .bnc__demo svg { width: 60%; height: 60%; }
  .bnc--sm .bnc__demo { width: 34px; height: 34px; }
  .bnc--lg .bnc__demo { width: 60px; height: 60px; }

  .bnc--p-top-right    .bnc__badge { top: 0; right: 0; }
  .bnc--p-top-left     .bnc__badge { top: 0; left: 0; }
  .bnc--p-bottom-right .bnc__badge { bottom: 0; right: 0; }
  .bnc--p-bottom-left  .bnc__badge { bottom: 0; left: 0; }

  .bnc--p-top-right    { --pushx: 35%;  --pushy: -35%; }
  .bnc--p-top-left     { --pushx: -35%; --pushy: -35%; }
  .bnc--p-bottom-right { --pushx: 35%;  --pushy: 35%; }
  .bnc--p-bottom-left  { --pushx: -35%; --pushy: 35%; }

  .bnc__badge {
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
      width 420ms var(--bnc-spring),
      border-radius 300ms var(--bnc-spring),
      background-color 300ms ease;
    /* bounce: hops in a wrapper that composes its own translate */
    animation: bnc-hop var(--hop, 1.2s) var(--bnc-spring) infinite;
  }

  .bnc--m-dot { width: var(--dot); min-width: var(--dot); height: var(--dot); }
  .bnc--m-icon { width: var(--badge); min-width: var(--badge); }
  .bnc__content { display: inline-flex; align-items: center; justify-content: center; }
  .bnc--m-icon .bnc__content ::slotted(svg) {
    width: calc(var(--badge) * 0.62);
    height: calc(var(--badge) * 0.62);
    display: block;
  }
  .bnc__num { display: block; }

  .bnc--t-danger  { --tone-c: var(--tone-danger,  #f23f43); }
  .bnc--t-success { --tone-c: var(--tone-success, #23a55a); }
  .bnc--t-warn    { --tone-c: var(--tone-warn,    #f0b232); }
  .bnc--t-info    { --tone-c: var(--ui-accent, #ededed); }
  .bnc--t-neutral { --tone-c: var(--tone-neutral, var(--ui-accent, #ededed)); }
  .bnc__badge { background: var(--tone-c, var(--ui-accent, #ededed)); }
  .bnc--t-warn.bnc__badge { color: #160f02; }

  /* ── bounce: vertical hop with squash & stretch ────────────────────── */
  @keyframes bnc-hop {
    0%, 100% {
      transform: translate(var(--pushx), var(--pushy)) translateY(0) scale(1, 1);
    }
    15% {
      transform: translate(var(--pushx), var(--pushy)) translateY(0) scale(1.1, 0.9);
    }
    40% {
      transform: translate(var(--pushx), var(--pushy)) translateY(-42%) scale(0.94, 1.08);
    }
    60% {
      transform: translate(var(--pushx), var(--pushy)) translateY(-42%) scale(0.94, 1.08);
    }
    80% {
      transform: translate(var(--pushx), var(--pushy)) translateY(0) scale(1.08, 0.92);
    }
  }

  .bnc__badge.bnc-pop-enter-active {
    animation: none;
    transition: transform 420ms var(--bnc-spring), opacity 220ms ease, filter 280ms ease;
  }
  .bnc__badge.bnc-pop-leave-active {
    animation: none;
    transition: transform 200ms cubic-bezier(0.4, 0, 1, 1), opacity 170ms ease, filter 170ms ease;
  }
  .bnc__badge.bnc-pop-enter-from {
    opacity: 0; filter: blur(7px);
    transform: translate(var(--pushx), var(--pushy)) scale(0);
  }
  .bnc__badge.bnc-pop-leave-to {
    opacity: 0; filter: blur(7px);
    transform: translate(var(--pushx), var(--pushy)) scale(0.2);
  }

  .bnc-swap-enter-active { transition: opacity 200ms ease, filter 200ms ease, scale 320ms var(--bnc-spring); }
  .bnc-swap-leave-active { transition: opacity 150ms ease, filter 150ms ease, scale 150ms cubic-bezier(0.4, 0, 1, 1); }
  .bnc-swap-enter-from { opacity: 0; filter: blur(6px); scale: 0.45; }
  .bnc-swap-leave-to   { opacity: 0; filter: blur(6px); scale: 0.35; }

  @media (prefers-reduced-motion: reduce) {
    .bnc__badge {
      animation: none;
      transition: none;
    }
    .bnc-swap-enter-active,
    .bnc-swap-leave-active { transition: none; }
  }
`;let d;function _(h){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=h;const e=d.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const A=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(h,e){const t=e?_(String(e).trim()):null;if(!t){for(const n of A)h.style.removeProperty(n);return}const s=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),c=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,i=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(n=>Math.round(c?n*.92:n+(255-n)*.16)),a=(n,b)=>h.style.setProperty(n,b);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(n,i);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(n,t.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(n,c?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])a(n,c?"0 0 0":"255 255 255");a("--vs-color",i),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class C extends HTMLElement{static observedAttributes=["count","max","dot","show-zero","position","tone","size","hops","color"];#n;#o;#h;#t;#s;#e;#i;#r=!1;#u=!1;#b=!1;#m=null;#p=null;#a=0;#c=0;#l=0;#g=()=>{const e=this.#e.assignedNodes({flatten:!0}).length>0;e!==this.#r&&(this.#r=e,this.#d())};constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=w,this.#n=document.createElement("span"),this.#n.className="bnc",this.#o=document.createElement("span"),this.#o.className="bnc__anchor",this.#h=document.createElement("slot"),this.#o.appendChild(this.#h);const s=document.createElement("span");s.className="bnc__demo",s.setAttribute("aria-hidden","true");const r=document.createElementNS(g,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none");for(const c of["M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z","M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"]){const i=document.createElementNS(g,"path");i.setAttribute("d",c),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),r.appendChild(i)}s.appendChild(r),this.#h.appendChild(s),this.#t=document.createElement("span"),this.#t.className="bnc__badge",this.#t.setAttribute("role","status"),this.#t.hidden=!0,this.#s=document.createElement("span"),this.#s.className="bnc__content",this.#e=document.createElement("slot"),this.#e.name="badge",this.#e.hidden=!0,this.#i=document.createElement("span"),this.#i.className="bnc__num",this.#s.append(this.#e,this.#i),this.#t.appendChild(this.#s),this.#n.append(this.#o,this.#t),e.append(t,this.#n),this.#e.addEventListener("slotchange",this.#g)}connectedCallback(){v(this,this.getAttribute("color")),this.#r=this.#e.assignedNodes({flatten:!0}).length>0,this.#d()}disconnectedCallback(){clearTimeout(this.#a),this.#a=0,clearTimeout(this.#c),this.#c=0,clearTimeout(this.#l),this.#l=0}attributeChangedCallback(){v(this,this.getAttribute("color")),this.#n&&this.#d()}#v(){const e=this.getAttribute("count");if(e===null)return null;const t=parseFloat(e);return Number.isFinite(t)?t:null}#y(){const e=parseFloat(this.getAttribute("max"));return Number.isFinite(e)?e:99}#x(){const e=parseFloat(this.getAttribute("hops"));return Number.isFinite(e)?e:1.2}#d(){const e=this.getAttribute("size")||"md",t=this.getAttribute("position")||"top-right",s=this.getAttribute("tone")||"neutral",r=this.hasAttribute("dot"),c=this.hasAttribute("show-zero"),i=this.#x(),l=this.#y(),a=this.#v(),n=this.#r;this.#n.className=`bnc bnc--${e} bnc--p-${t}`;const b=a??0,p=b>l?`${l}+`:String(b),u=r||n?!0:b>0||c,o=r?"dot":n?"icon":"count",y=o==="count"?p.length:1,m=o==="count"?`n:${p}`:o,x=`${Math.max(.4,i)}s`;this.#t.className=`bnc__badge bnc--t-${s} bnc--m-${o}`,this.#t.style.setProperty("--digits",String(y)),this.#t.style.setProperty("--hop",x),o==="count"?this.#t.setAttribute("aria-label",`${p} notifications`):this.#t.removeAttribute("aria-label");const f=!this.#u;this.#u=!0,f?(this.#b=u,this.#t.hidden=!u):u!==this.#b&&this.#w(u),f?(this.#m=o,this.#p=m,this.#f(o,p)):m!==this.#p&&(this.#m=o,this.#p=m,this.#_(o,p))}#f(e,t){this.#e.hidden=e!=="icon",this.#i.hidden=e!=="count",this.#i.textContent=t}#w(e){this.#b=e,clearTimeout(this.#a);const t=this.#t;e?(t.hidden=!1,t.classList.remove("bnc-pop-leave-active","bnc-pop-leave-to"),t.classList.add("bnc-pop-enter-from","bnc-pop-enter-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove("bnc-pop-enter-from")),this.#a=setTimeout(()=>t.classList.remove("bnc-pop-enter-active"),420)):(t.classList.remove("bnc-pop-enter-from","bnc-pop-enter-active"),t.classList.add("bnc-pop-leave-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.add("bnc-pop-leave-to")),this.#a=setTimeout(()=>{t.hidden=!0,t.classList.remove("bnc-pop-leave-active","bnc-pop-leave-to")},200))}#_(e,t){clearTimeout(this.#c),clearTimeout(this.#l);const s=this.#s;s.classList.remove("bnc-swap-enter-from","bnc-swap-enter-active"),s.classList.add("bnc-swap-leave-active"),s.offsetWidth,requestAnimationFrame(()=>s.classList.add("bnc-swap-leave-to")),this.#c=setTimeout(()=>{s.classList.remove("bnc-swap-leave-active","bnc-swap-leave-to"),this.#f(e,t),s.classList.add("bnc-swap-enter-from","bnc-swap-enter-active"),s.offsetWidth,requestAnimationFrame(()=>s.classList.remove("bnc-swap-enter-from")),this.#l=setTimeout(()=>s.classList.remove("bnc-swap-enter-active"),320)},150)}}customElements.define("vs-indicator-bounce",C);
