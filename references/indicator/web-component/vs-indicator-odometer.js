const b="http://www.w3.org/2000/svg",y=`
  :host { display: inline-flex; }
  .odo {
    --odo-spring: cubic-bezier(0.22, 1, 0.36, 1);
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
  .odo--sm { --badge: 16px; --dot: 8px; }
  .odo--md { --badge: 19px; --dot: 10px; }
  .odo--lg { --badge: 24px; --dot: 13px; }

  .odo__anchor { display: inline-flex; border-radius: inherit; }

  .odo__demo {
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
  .odo__demo svg { width: 60%; height: 60%; }
  .odo--sm .odo__demo { width: 34px; height: 34px; }
  .odo--lg .odo__demo { width: 60px; height: 60px; }

  .odo--p-top-right    .odo__badge { top: 0; right: 0; }
  .odo--p-top-left     .odo__badge { top: 0; left: 0; }
  .odo--p-bottom-right .odo__badge { bottom: 0; right: 0; }
  .odo--p-bottom-left  .odo__badge { bottom: 0; left: 0; }

  .odo--p-top-right    { --pushx: 35%;  --pushy: -35%; }
  .odo--p-top-left     { --pushx: -35%; --pushy: -35%; }
  .odo--p-bottom-right { --pushx: 35%;  --pushy: 35%; }
  .odo--p-bottom-left  { --pushx: -35%; --pushy: 35%; }

  .odo__badge {
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
    opacity: 1;
    filter: none;
    transform: translate(var(--pushx), var(--pushy)) scale(1);
    transform-origin: var(--pushx) var(--pushy);
    transition:
      width 420ms var(--odo-spring),
      border-radius 300ms var(--odo-spring),
      background-color 300ms ease,
      transform 420ms var(--odo-spring),
      opacity 220ms ease,
      filter 280ms ease;
  }
  /* hidden state — stands in for Vue's v-if unmount; the node stays mounted
     (never rebuilt) so the entrance/exit pop can actually transition. */
  .odo__badge.is-hidden {
    pointer-events: none;
    opacity: 0;
    filter: blur(7px);
    transform: translate(var(--pushx), var(--pushy)) scale(0);
    transition:
      transform 200ms cubic-bezier(0.4, 0, 1, 1),
      opacity 170ms ease,
      filter 170ms ease;
  }

  .odo--m-dot { width: var(--dot); min-width: var(--dot); height: var(--dot); }
  .odo--m-icon { width: var(--badge); min-width: var(--badge); }
  .odo__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: opacity 200ms ease, filter 200ms ease, transform 320ms var(--odo-spring);
  }
  .odo--m-icon .odo__content ::slotted(svg) {
    width: calc(var(--badge) * 0.62);
    height: calc(var(--badge) * 0.62);
    display: block;
  }
  /* icon ↔ dot swap — mirrors <Transition name="odo-swap" mode="out-in"> */
  .odo__content.is-swapping {
    opacity: 0;
    filter: blur(6px);
    transform: scale(0.35);
    transition: opacity 150ms ease, filter 150ms ease, transform 150ms cubic-bezier(0.4, 0, 1, 1);
  }

  /* ── odometer: digit reels that roll vertically ────────────────────── */
  .odo__reels {
    display: inline-flex;
    align-items: stretch;
    height: 1em;
    overflow: hidden;
  }
  .odo__reel {
    display: inline-block;
    height: 1em;
    overflow: hidden;
    line-height: 1;
  }
  .odo__reel--fixed { line-height: 1em; }
  .odo__strip {
    display: flex;
    flex-direction: column;
    transition: transform var(--roll, 620ms) var(--odo-spring);
  }
  .odo__cell {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1em;
    line-height: 1em;
  }
  .odo__cell--fixed { height: 1em; }

  .odo--t-danger  { --tone-c: var(--tone-danger,  #f23f43); }
  .odo--t-success { --tone-c: var(--tone-success, #23a55a); }
  .odo--t-warn    { --tone-c: var(--tone-warn,    #f0b232); }
  .odo--t-info    { --tone-c: var(--ui-accent, #ededed); }
  .odo--t-neutral { --tone-c: var(--tone-neutral, var(--ui-accent, #ededed)); }
  .odo__badge { background: var(--tone-c, var(--ui-accent, #ededed)); }
  .odo--t-warn.odo__badge { color: #160f02; }

  @media (prefers-reduced-motion: reduce) {
    .odo__badge,
    .odo__badge.is-hidden,
    .odo__strip,
    .odo__content,
    .odo__content.is-swapping { transition: none; }
  }
`;function x(){const r=document.createElement("span");r.className="odo__demo",r.setAttribute("aria-hidden","true");const t=document.createElementNS(b,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none");for(const e of["M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z","M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"]){const o=document.createElementNS(b,"path");o.setAttribute("d",e),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),t.appendChild(o)}return r.appendChild(t),r}const m=r=>r>="0"&&r<="9";let u;function w(r){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=r;const t=u.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const C=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function _(r,t){const e=t?w(String(t).trim()):null;if(!e){for(const n of C)r.style.removeProperty(n);return}const o=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),s=.2126*o(e[0])+.7152*o(e[1])+.0722*o(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(n=>Math.round(s?n*.92:n+(255-n)*.16)),d=(n,h)=>r.style.setProperty(n,h);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])d(n,l);d("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])d(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])d(n,s?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])d(n,s?"0 0 0":"255 255 255");d("--vs-color",l),d("--vs-color-rgb",e.join(" ")),d("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class A extends HTMLElement{static observedAttributes=["count","max","dot","show-zero","position","tone","size","roll","color"];#i;#t;#e;#o;#n;#c=null;#s;#r=0;#a=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=y,this.#i=document.createElement("span");const o=document.createElement("span");o.className="odo__anchor";const i=document.createElement("slot");i.appendChild(x()),o.appendChild(i),this.#t=document.createElement("span"),this.#t.className="odo__badge is-hidden",this.#t.setAttribute("role","status"),this.#e=document.createElement("span"),this.#e.className="odo__reels",this.#e.setAttribute("aria-hidden","true"),this.#o=document.createElement("span"),this.#o.className="odo__content",this.#n=document.createElement("slot"),this.#n.name="badge",this.#n.style.display="none",this.#o.appendChild(this.#n),this.#n.addEventListener("slotchange",this.#u),this.#t.append(this.#e,this.#o),this.#i.append(o,this.#t),t.append(e,this.#i)}connectedCallback(){_(this,this.getAttribute("color")),this.#a=!0,this.#l()}disconnectedCallback(){this.#a=!1,clearTimeout(this.#r)}attributeChangedCallback(){_(this,this.getAttribute("color")),this.#a&&this.#l()}#u=()=>this.#l();#d(t,e){const o=parseFloat(this.getAttribute(t));return Number.isFinite(o)?o:e}#h(t){return this.hasAttribute(t)&&this.getAttribute(t)!=="false"}#l(){const e=this.getAttribute("count")===null?null:this.#d("count",null),o=this.#d("max",99),i=this.#h("dot"),s=this.#h("show-zero"),l=this.getAttribute("position")||"top-right",a=this.getAttribute("tone")||"neutral",d=this.getAttribute("size")||"md",n=Math.max(120,this.#d("roll",620)),h=e??0,p=h>o?`${o}+`:String(h),g=this.#n.assignedNodes({flatten:!0}).length>0,f=i||g?!0:h>0||s,c=i?"dot":g?"icon":"count",v=c==="count"?p.length:1;this.#i.className=`odo odo--${d} odo--p-${l}`,this.#t.className=`odo__badge odo--t-${a} odo--m-${c}`+(f?"":" is-hidden"),this.#t.style.setProperty("--digits",String(v)),this.#t.style.setProperty("--roll",`${n}ms`),f?this.#t.removeAttribute("aria-hidden"):this.#t.setAttribute("aria-hidden","true"),c==="count"?this.#t.setAttribute("aria-label",`${p} notifications`):this.#t.removeAttribute("aria-label"),this.#e.style.display=c==="count"?"":"none",this.#o.style.display=c==="count"?"none":"",c==="count"&&this.#p(p.split("")),this.#g(c==="count"?null:c)}#p(t){const e=t.map(m).join(",");if(e!==this.#c){this.#e.replaceChildren();for(const i of t)this.#e.appendChild(this.#m(i));this.#c=e;return}const o=this.#e.children;for(let i=0;i<t.length;i++){const s=t[i],l=o[i];if(l)if(m(s)){const a=l.firstElementChild;a&&(a.style.transform=`translateY(${Number(s)*-10}%)`)}else{const a=l.firstElementChild;a&&(a.textContent=s)}}}#m(t){const e=document.createElement("span");if(m(t)){e.className="odo__reel",e.setAttribute("aria-hidden","true");const o=document.createElement("span");o.className="odo__strip",o.style.transform=`translateY(${Number(t)*-10}%)`;for(let i=0;i<=9;i++){const s=document.createElement("span");s.className="odo__cell",s.textContent=String(i),o.appendChild(s)}e.appendChild(o)}else{e.className="odo__reel odo__reel--fixed",e.setAttribute("aria-hidden","true");const o=document.createElement("span");o.className="odo__cell odo__cell--fixed",o.textContent=t,e.appendChild(o)}return e}#g(t){if(t===null){this.#s=null;return}if(this.#n.style.display=t==="icon"?"":"none",this.#s===t)return;const e=this.#s===void 0;this.#s=t,e||(this.#o.classList.add("is-swapping"),clearTimeout(this.#r),this.#r=setTimeout(()=>this.#o.classList.remove("is-swapping"),160))}get count(){const t=this.getAttribute("count");return t===null?null:parseFloat(t)}set count(t){t==null?this.removeAttribute("count"):this.setAttribute("count",String(t))}}customElements.define("vs-indicator-odometer",A);
