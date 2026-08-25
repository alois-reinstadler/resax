const g=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,u="http://www.w3.org/2000/svg";function v(){const s=document.createElementNS(u,"svg");s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("fill","none"),s.setAttribute("aria-hidden","true");for(const e of["M6 6L18 18","M18 6L6 18"]){const t=document.createElementNS(u,"path");t.setAttribute("d",e),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),s.appendChild(t)}return s}const k=`
  :host { display: inline-flex; }
  .snk__trigger {
    height: var(--ctrl-h-md, 40px);
    padding: 0 16px;
    border-radius: 12px;
    border: 1px solid transparent;
    background: var(--btn-primary-bg, #ededed);
    color: var(--btn-primary-fg, #000);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
  }
  .snk__trigger:hover { opacity: 0.9; }
`,x=`
  .snk {
    --acc: var(--ui-accent, #ededed);
    --snk-offset: 0px;
    position: fixed;
    left: 50%;
    bottom: calc(24px + var(--snk-offset, 0px));
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: calc(100vw - 32px);
    padding: 0 8px 0 16px;
    height: 48px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: #1c1c1e;
    color: #f2f2f2;
    box-shadow: 0 14px 40px -10px rgba(0, 0, 0, 0.6);
    transition: bottom 240ms ease;
  }
  .snk--success { --acc: #4cc38a; }
  .snk--error { --acc: #ff6369; }
  .snk--warn { --acc: #ffb224; }
  .snk--info { --acc: #6e9bff; }

  .snk__dot { flex: none; width: 9px; height: 9px; border-radius: 50%; background: var(--acc); box-shadow: 0 0 10px var(--acc); }
  .snk__title { font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .snk__action {
    flex: none;
    height: 32px;
    padding: 0 12px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--acc);
    font: inherit;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: background-color 160ms ease;
  }
  .snk__action:hover { background: color-mix(in srgb, var(--acc) 16%, transparent); }
  .snk__close {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: rgba(255, 255, 255, 0.55);
    cursor: pointer;
    transition: background-color 160ms ease, color 160ms ease;
  }
  .snk__close:hover { background: rgba(255, 255, 255, 0.08); color: #fff; }
  .snk__close svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }

  /* rise from the bottom edge */
  .snk-enter-active { transition: transform 460ms cubic-bezier(0.34, 1.4, 0.5, 1), opacity 300ms ease; }
  .snk-leave-active { transition: transform 240ms cubic-bezier(0.4, 0, 1, 1), opacity 220ms ease; }
  .snk-enter-from, .snk-leave-to { transform: translateX(-50%) translateY(140%); opacity: 0; }

  @media (prefers-reduced-motion: reduce) {
    .snk { transition-duration: 0ms; }
    .snk-enter-active, .snk-leave-active { transition-duration: 0ms; }
    .snk-enter-from, .snk-leave-to { transform: translateX(-50%); }
  }
`,y=60,h=[];function _(s){h.unshift(s),m()}function f(s){const e=h.indexOf(s);e!==-1&&h.splice(e,1),m()}function m(){h.forEach((s,e)=>s.style.setProperty("--snk-offset",`${e*y}px`))}let d;function w(s){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=s;const e=d.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const E=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(s,e){const t=e?w(String(e).trim()):null;if(!t){for(const n of E)s.style.removeProperty(n);return}const r=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),o=.2126*r(t[0])+.7152*r(t[1])+.0722*r(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(n=>Math.round(o?n*.92:n+(255-n)*.16)),i=(n,b)=>s.style.setProperty(n,b);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(n,l);i("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(n,t.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(n,o?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])i(n,o?"0 0 0":"255 255 255");i("--vs-color",l),i("--vs-color-rgb",t.join(" ")),i("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class A extends HTMLElement{static observedAttributes=["state","title","action-label","duration","trigger-label","color"];#n;#e=null;#t=null;#h=null;#l=null;#a=null;#u=null;#i=!1;#r=0;#s=0;#o=null;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=k,this.#n=document.createElement("button"),this.#n.type="button",this.#n.className="snk__trigger",this.#n.addEventListener("click",()=>this.show()),e.append(t,this.#n)}connectedCallback(){p(this,this.getAttribute("color")),this.#f()}disconnectedCallback(){clearTimeout(this.#r),this.#r=0,clearTimeout(this.#s),this.#s=0,this.#c(),this.#i=!1}attributeChangedCallback(){p(this,this.getAttribute("color")),this.#n&&this.#f()}show(){if(!this.isConnected)return;this.#i?this.#d():(this.#i=!0,this.#b()),clearTimeout(this.#r);const e=this.#m();e>0&&(this.#r=setTimeout(()=>this.close(),e))}close(){this.#i&&(this.#i=!1,clearTimeout(this.#r),this.#r=0,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),this.#g())}#p(){this.dispatchEvent(new CustomEvent("action",{bubbles:!0,composed:!0})),this.close()}get open(){return this.#i}#m(){const e=this.getAttribute("duration");if(e===null)return 4e3;const t=Number(e);return Number.isFinite(t)?t:4e3}#b(){this.#c(),this.#v(),document.body.appendChild(this.#e),_(this.#t),this.#t.offsetWidth,this.#t.classList.remove("snk-enter-from"),this.dispatchEvent(new CustomEvent("show",{bubbles:!0,composed:!0}))}#g(){const e=this.#e,t=this.#t;if(!e||!t)return;if(f(t),g()){this.#c();return}t.classList.remove("snk-enter-active","snk-enter-from"),t.classList.add("snk-leave-active","snk-leave-to");const r=()=>{clearTimeout(this.#s),this.#e===e&&this.#c()},a=o=>{o.target===t&&(t.removeEventListener("transitionend",a),r())};t.addEventListener("transitionend",a),clearTimeout(this.#s),this.#s=setTimeout(r,700)}#c(){clearTimeout(this.#s),this.#s=0,this.#t&&f(this.#t),this.#e&&(this.#e.remove(),this.#e=this.#t=this.#h=null,this.#l=this.#a=this.#u=null)}#v(){const e=document.createElement("div"),t=e.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=x;const a=document.createElement("div");a.className="snk snk-enter-active snk-enter-from",a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),this.#t=a;const o=document.createElement("span");o.className="snk__dot",o.setAttribute("aria-hidden","true"),this.#h=o;const l=document.createElement("span");l.className="snk__title",this.#l=l;const c=document.createElement("button");c.type="button",c.className="snk__action",c.addEventListener("click",()=>this.#p()),this.#a=c;const i=document.createElement("button");i.type="button",i.className="snk__close",i.setAttribute("aria-label","Dismiss"),i.appendChild(v()),i.addEventListener("click",()=>this.close()),this.#u=i,a.append(o,l,c,i),t.append(r,a),this.#e=e,this.#o=null,this.#d()}#d(){if(!this.#t)return;const e=this.getAttribute("state")||"info",t=this.getAttribute("title")??"Message sent",r=this.getAttribute("action-label")??"Undo";this.#o!==e&&(this.#o&&this.#t.classList.remove(`snk--${this.#o}`),this.#t.classList.add(`snk--${e}`),this.#o=e),this.#l.textContent=t,this.#a.textContent=r,this.#a.hidden=!r}#f(){this.#n.textContent=this.getAttribute("trigger-label")??"Show snackbar",this.#e&&this.#d()}}customElements.define("vs-notification-snackbar",A);
