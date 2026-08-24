const w=`
  :host { display: inline-flex; }
  .pin {
    --pin-spring: cubic-bezier(0.22, 1, 0.36, 1);
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

  .pin--sm { --badge: 16px; --dot: 8px; }
  .pin--md { --badge: 19px; --dot: 10px; }
  .pin--lg { --badge: 24px; --dot: 13px; }

  .pin__anchor { display: inline-flex; border-radius: inherit; }

  .pin__demo {
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
  .pin__demo svg { width: 60%; height: 60%; }
  .pin--sm .pin__demo { width: 34px; height: 34px; }
  .pin--lg .pin__demo { width: 60px; height: 60px; }

  .pin--p-top-right    .pin__badge, .pin--p-top-right    .pin__ring { top: 0; right: 0; }
  .pin--p-top-left     .pin__badge, .pin--p-top-left     .pin__ring { top: 0; left: 0; }
  .pin--p-bottom-right .pin__badge, .pin--p-bottom-right .pin__ring { bottom: 0; right: 0; }
  .pin--p-bottom-left  .pin__badge, .pin--p-bottom-left  .pin__ring { bottom: 0; left: 0; }

  .pin--p-top-right    { --pushx: 35%;  --pushy: -35%; }
  .pin--p-top-left     { --pushx: -35%; --pushy: -35%; }
  .pin--p-bottom-right { --pushx: 35%;  --pushy: 35%; }
  .pin--p-bottom-left  { --pushx: -35%; --pushy: 35%; }

  .pin__badge {
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
      width 420ms var(--pin-spring),
      border-radius 300ms var(--pin-spring),
      background-color 300ms ease;
  }
  .pin__badge.is-hidden { display: none; }

  .pin--m-dot { width: var(--dot); min-width: var(--dot); height: var(--dot); }
  .pin--m-icon { width: var(--badge); min-width: var(--badge); }
  .pin__content { display: inline-flex; align-items: center; justify-content: center; }
  .pin--m-icon .pin__content ::slotted(svg) {
    width: calc(var(--badge) * 0.62);
    height: calc(var(--badge) * 0.62);
    display: block;
  }
  .pin__num { display: block; }

  .pin--t-danger  { --tone-c: var(--tone-danger,  #f23f43); }
  .pin--t-success { --tone-c: var(--tone-success, #23a55a); }
  .pin--t-warn    { --tone-c: var(--tone-warn,    #f0b232); }
  .pin--t-info    { --tone-c: var(--ui-accent, #ededed); }
  .pin--t-neutral { --tone-c: var(--tone-neutral, var(--ui-accent, #ededed)); }
  .pin__badge { background: var(--tone-c, var(--ui-accent, #ededed)); }
  .pin--t-warn.pin__badge { color: #160f02; }

  /* ── ping: concentric rings expanding in a cascade ─────────────────── */
  .pin__ring {
    position: absolute;
    z-index: 4;
    width: var(--badge);
    height: var(--badge);
    border-radius: 999px;
    box-shadow: inset 0 0 0 2px var(--tone-c, var(--ui-accent, #ededed));
    background: transparent;
    transform: translate(var(--pushx), var(--pushy));
    transform-origin: var(--pushx) var(--pushy);
    animation: pin-ping 1.8s var(--pin-spring) infinite;
    animation-delay: calc(var(--i) * 0.35s);
    pointer-events: none;
  }
  .pin__ring--dot { width: var(--dot); height: var(--dot); }
  .pin__ring.is-hidden { display: none; }
  @keyframes pin-ping {
    0%   { opacity: 0.7; transform: translate(var(--pushx), var(--pushy)) scale(0.9); }
    80%  { opacity: 0;   transform: translate(var(--pushx), var(--pushy)) scale(2.6); }
    100% { opacity: 0;   transform: translate(var(--pushx), var(--pushy)) scale(2.6); }
  }

  .pin__badge.pin-pop-enter-active {
    transition: transform 420ms var(--pin-spring), opacity 220ms ease, filter 280ms ease;
  }
  .pin__badge.pin-pop-leave-active {
    transition: transform 200ms cubic-bezier(0.4, 0, 1, 1), opacity 170ms ease, filter 170ms ease;
  }
  .pin__badge.pin-pop-enter-from {
    opacity: 0; filter: blur(7px);
    transform: translate(var(--pushx), var(--pushy)) scale(0);
  }
  .pin__badge.pin-pop-leave-to {
    opacity: 0; filter: blur(7px);
    transform: translate(var(--pushx), var(--pushy)) scale(0.2);
  }

  .pin-swap-enter-active { transition: opacity 200ms ease, filter 200ms ease, scale 320ms var(--pin-spring); }
  .pin-swap-leave-active { transition: opacity 150ms ease, filter 150ms ease, scale 150ms cubic-bezier(0.4, 0, 1, 1); }
  .pin-swap-enter-from { opacity: 0; filter: blur(6px); scale: 0.45; }
  .pin-swap-leave-to   { opacity: 0; filter: blur(6px); scale: 0.35; }

  @media (prefers-reduced-motion: reduce) {
    .pin__badge,
    .pin-swap-enter-active,
    .pin-swap-leave-active { transition: none; }
    .pin__ring { animation: none; opacity: 0; }
  }
`,v="http://www.w3.org/2000/svg";function A(){const o=document.createElementNS(v,"svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none");const i=document.createElementNS(v,"path");i.setAttribute("d","M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z");const t=document.createElementNS(v,"path");t.setAttribute("d","M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22");for(const n of[i,t])n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","1.5"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round");return o.append(i,t),o}let u;function S(o){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=o;const i=u.fillStyle;if(i.charAt(0)==="#")return[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)];const t=i.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const N=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function y(o,i){const t=i?S(String(i).trim()):null;if(!t){for(const e of N)o.style.removeProperty(e);return}const n=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),a=.2126*n(t[0])+.7152*n(t[1])+.0722*n(t[2])>.45,d=`rgb(${t[0]} ${t[1]} ${t[2]})`,h=t.map(e=>Math.round(a?e*.92:e+(255-e)*.16)),r=(e,m)=>o.style.setProperty(e,m);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(e,d);r("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(e,a?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])r(e,a?"0 0 0":"255 255 255");r("--vs-color",d),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class C extends HTMLElement{static observedAttributes=["count","max","dot","show-zero","position","tone","size","rings","color"];#p;#a;#c;#s;#l;#d=[];#t;#e;#i;#n;#f=-1;#u=null;#h=null;#g=!1;#r=0;#o=0;#b=!0;constructor(){super();const i=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=w;const n=document.createElement("span");n.className="pin",this.#a=document.createElement("span"),this.#a.className="pin__anchor",this.#c=document.createElement("slot"),this.#s=document.createElement("span"),this.#s.className="pin__demo",this.#s.setAttribute("aria-hidden","true"),this.#s.append(A()),this.#c.append(this.#s),this.#a.append(this.#c),this.#l=document.createElement("span");for(let p=0;p<6;p++){const a=document.createElement("span");a.className="pin__ring is-hidden",a.style.setProperty("--i",String(p)),a.setAttribute("aria-hidden","true"),this.#d.push(a),this.#l.append(a)}this.#t=document.createElement("span"),this.#t.className="pin__badge is-hidden",this.#t.setAttribute("role","status"),this.#e=document.createElement("span"),this.#e.className="pin__content",this.#i=document.createElement("slot"),this.#i.name="badge",this.#n=document.createElement("span"),this.#n.className="pin__num",this.#e.append(this.#i,this.#n),this.#t.append(this.#e),n.append(this.#a,this.#l,this.#t),i.append(t,n),this.#p=n,this.#i.addEventListener("slotchange",()=>this.#m())}connectedCallback(){y(this,this.getAttribute("color")),this.#m()}disconnectedCallback(){clearTimeout(this.#r),clearTimeout(this.#o)}attributeChangedCallback(){y(this,this.getAttribute("color")),this.#p&&this.#m()}#m(){const i=(l,f)=>this.getAttribute(l)??f,t=i("size","md"),n=i("position","top-right"),p=i("tone","danger"),a=Math.max(1,Math.min(6,Number(i("rings","3"))||3));this.#p.className=`pin pin--${t} pin--p-${n}`;const d=this.hasAttribute("dot"),h=this.hasAttribute("show-zero"),r=this.#i.assignedNodes({flatten:!0}).length>0,e=this.getAttribute("count"),m=e===null||e===""?0:Number(e)||0,_=Number(i("max","99"))||99,c=m>_?`${_}+`:String(m),g=d||r||m>0||h,s=d?"dot":r?"icon":"count",x=s==="count"?c.length:1,b=s==="count"?`n:${c}`:s;for(let l=0;l<this.#d.length;l++){const f=g&&l<a;this.#d[l].className=`pin__ring pin--t-${p}${s==="dot"?" pin__ring--dot":""}${f?"":" is-hidden"}`}this.#f=a,g!==this.#g&&(clearTimeout(this.#r),g?(this.#t.classList.remove("is-hidden"),this.#t.classList.add("pin-pop-enter-from"),this.#t.classList.add("pin-pop-enter-active"),this.#t.offsetWidth,this.#t.classList.remove("pin-pop-enter-from"),this.#r=setTimeout(()=>this.#t.classList.remove("pin-pop-enter-active"),420)):(this.#t.classList.add("pin-pop-leave-active"),this.#t.classList.add("pin-pop-leave-to"),this.#r=setTimeout(()=>{this.#t.classList.add("is-hidden"),this.#t.classList.remove("pin-pop-leave-active","pin-pop-leave-to")},200)),this.#g=g),this.#t.className=this.#t.className.replace(/\bpin--t-\S+/g,"").replace(/\bpin--m-\S+/g,"").trim()+` pin--t-${p} pin--m-${s}`,this.#t.style.setProperty("--digits",String(x)),s==="count"?this.#t.setAttribute("aria-label",`${c} notifications`):this.#t.removeAttribute("aria-label"),this.#b?(this.#n.textContent=s==="count"?c:"",this.#i.style.display=s==="icon"?"":"none",this.#h=b,this.#b=!1):b!==this.#h?(clearTimeout(this.#o),this.#e.classList.add("pin-swap-leave-active","pin-swap-leave-to"),this.#o=setTimeout(()=>{this.#e.classList.remove("pin-swap-leave-active","pin-swap-leave-to"),this.#n.textContent=s==="count"?c:"",this.#i.style.display=s==="icon"?"":"none",this.#e.classList.add("pin-swap-enter-active","pin-swap-enter-from"),this.#e.offsetWidth,this.#e.classList.remove("pin-swap-enter-from"),this.#o=setTimeout(()=>this.#e.classList.remove("pin-swap-enter-active"),320)},150),this.#h=b):this.#u!==s?(this.#n.textContent=s==="count"?c:"",this.#i.style.display=s==="icon"?"":"none"):s==="count"&&(this.#n.textContent=c),this.#u=s}}customElements.define("vs-indicator-ping",C);
