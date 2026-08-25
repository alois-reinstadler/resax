const y=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,b="http://www.w3.org/2000/svg";function r(i,e){const t=document.createElementNS(b,"path");return t.setAttribute("d",i),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width",e?.w||"1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t}function g(){const i=document.createElementNS(b,"svg");return i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("fill","none"),i}const p="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z";function _(i){const e=g();return i==="success"?e.append(r(p),r("M7.75 11.9999L10.58 14.8299L16.25 9.16992")):i==="error"?e.append(r(p),r("M9.17004 14.8299L14.83 9.16992"),r("M14.83 14.8299L9.17004 9.16992")):i==="warn"?e.append(r("M12 9V14"),r("M12.0001 21.4093H5.94005C2.47005 21.4093 1.02005 18.9293 2.70005 15.8993L5.82006 10.2793L8.76006 4.9993C10.5401 1.7893 13.4601 1.7893 15.2401 4.9993L18.1801 10.2893L21.3001 15.9093C22.9801 18.9393 21.5201 21.4193 18.0601 21.4193H12.0001V21.4093Z"),r("M11.9945 17H12.0035",{w:"2"})):e.append(r(p),r("M12 8V13"),r("M11.9945 16H12.0035",{w:"2"})),e}function w(){const i=g();return i.setAttribute("aria-hidden","true"),i.append(r("M6 6L18 18"),r("M18 6L6 18")),i}const C=`
  :host { display: inline-flex; }
  .ncd__trigger {
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
  .ncd__trigger:hover { opacity: 0.9; }
`,E=`
  .ncd {
    --acc: var(--ui-accent, #ededed);
    --acc-rgb: var(--ui-ring, 255 255 255);
    --ncd-offset: 0px;
    position: fixed;
    top: calc(20px + var(--ncd-offset, 0px));
    right: 20px;
    z-index: 9999;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    width: 340px;
    max-width: calc(100vw - 40px);
    padding: 14px 14px 16px;
    border-radius: 14px;
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-card, #141414);
    color: var(--text, #ededed);
    box-shadow: 0 16px 44px -12px rgba(0, 0, 0, 0.6);
    overflow: hidden;
    transition: top 240ms ease;
  }
  .ncd--success { --acc: #4cc38a; --acc-rgb: 76 195 138; }
  .ncd--error { --acc: #ff6369; --acc-rgb: 255 99 105; }
  .ncd--warn { --acc: #ffb224; --acc-rgb: 255 178 36; }
  .ncd--info { --acc: #6e9bff; --acc-rgb: 110 155 255; }

  .ncd__icon {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: color-mix(in srgb, rgb(var(--acc-rgb)) 16%, transparent);
    color: var(--acc);
  }
  .ncd__icon svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2.3; stroke-linecap: round; stroke-linejoin: round; }
  .ncd__text { display: flex; flex-direction: column; gap: 3px; flex: 1 1 auto; min-width: 0; padding-top: 2px; }
  .ncd__title { font-size: 14px; font-weight: 600; }
  .ncd__desc { font-size: 13px; line-height: 1.5; color: var(--text-secondary, #b0b0b0); }
  .ncd__close {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    margin: -2px -2px 0 0;
    padding: 0;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--text-secondary, #a1a1a1);
    cursor: pointer;
    transition: background-color 160ms ease, color 160ms ease;
  }
  .ncd__close:hover { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.08)); color: var(--text, #ededed); }
  .ncd__close svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }

  /* countdown progress bar at the bottom */
  .ncd__bar {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 100%;
    transform-origin: left center;
    background: var(--acc);
    animation: ncd-countdown linear forwards;
  }
  @keyframes ncd-countdown { from { transform: scaleX(1); } to { transform: scaleX(0); } }

  /* slide in from the right */
  .ncd-enter-active { transition: transform 440ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease; }
  .ncd-leave-active { transition: transform 260ms cubic-bezier(0.4, 0, 1, 1), opacity 220ms ease; }
  .ncd-enter-from, .ncd-leave-to { transform: translateX(120%); opacity: 0; }

  @media (prefers-reduced-motion: reduce) {
    .ncd { transition-duration: 0ms; }
    .ncd-enter-active, .ncd-leave-active { transition-duration: 0ms; }
    .ncd-enter-from, .ncd-leave-to { transform: none; }
    .ncd__bar { animation: none; display: none; }
  }
`,k=12,u=[];function A(i){u.unshift(i),v()}function f(i){const e=u.indexOf(i);e!==-1&&u.splice(e,1),v()}function v(){let i=0;for(const e of u)e.style.setProperty("--ncd-offset",`${i}px`),i+=e.offsetHeight+k}let h;function L(i){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=i;const e=h.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const S=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(i,e){const t=e?L(String(e).trim()):null;if(!t){for(const n of S)i.style.removeProperty(n);return}const s=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),c=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,d=t.map(n=>Math.round(c?n*.92:n+(255-n)*.16)),o=(n,x)=>i.style.setProperty(n,x);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(n,l);o("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(n,t.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(n,c?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])o(n,c?"0 0 0":"255 255 255");o("--vs-color",l),o("--vs-color-rgb",t.join(" ")),o("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class N extends HTMLElement{static observedAttributes=["state","title","description","duration","trigger-label","color"];#n;#e=null;#t=null;#l=null;#h=null;#a=null;#o=null;#r=!1;#s=0;#i=0;#c=null;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=C,this.#n=document.createElement("button"),this.#n.type="button",this.#n.className="ncd__trigger",this.#n.addEventListener("click",()=>this.show()),e.append(t,this.#n)}connectedCallback(){m(this,this.getAttribute("color")),this.#f()}disconnectedCallback(){clearTimeout(this.#s),this.#s=0,clearTimeout(this.#i),this.#i=0,this.#d(),this.#r=!1}attributeChangedCallback(){m(this,this.getAttribute("color")),this.#n&&this.#f()}show(){if(!this.isConnected)return;this.#r?this.#u():(this.#r=!0,this.#m()),this.#v(),clearTimeout(this.#s);const e=this.#p();e>0&&(this.#s=setTimeout(()=>this.close(),e))}close(){this.#r&&(this.#r=!1,clearTimeout(this.#s),this.#s=0,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),this.#b())}get open(){return this.#r}#p(){const e=this.getAttribute("duration");if(e===null)return 5e3;const t=Number(e);return Number.isFinite(t)?t:5e3}#m(){this.#d(),this.#g(),document.body.appendChild(this.#e),A(this.#t),this.#t.offsetWidth,this.#t.classList.remove("ncd-enter-from"),this.dispatchEvent(new CustomEvent("show",{bubbles:!0,composed:!0}))}#b(){const e=this.#e,t=this.#t;if(!e||!t)return;if(f(t),y()){this.#d();return}t.classList.remove("ncd-enter-active","ncd-enter-from"),t.classList.add("ncd-leave-active","ncd-leave-to");const s=()=>{clearTimeout(this.#i),this.#e===e&&this.#d()},a=c=>{c.target===t&&(t.removeEventListener("transitionend",a),s())};t.addEventListener("transitionend",a),clearTimeout(this.#i),this.#i=setTimeout(s,700)}#d(){clearTimeout(this.#i),this.#i=0,this.#t&&f(this.#t),this.#e&&(this.#e.remove(),this.#e=this.#t=this.#l=null,this.#h=this.#a=this.#o=null)}#g(){const e=document.createElement("div"),t=e.attachShadow({mode:"open"}),s=document.createElement("style");s.textContent=E;const a=document.createElement("div");a.className="ncd ncd-enter-active ncd-enter-from",a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),this.#t=a;const c=document.createElement("span");c.className="ncd__icon",c.setAttribute("aria-hidden","true"),this.#l=c;const l=document.createElement("div");l.className="ncd__text";const d=document.createElement("span");d.className="ncd__title",this.#h=d;const o=document.createElement("span");o.className="ncd__desc",this.#a=o,l.append(d,o);const n=document.createElement("button");n.type="button",n.className="ncd__close",n.setAttribute("aria-label","Dismiss"),n.appendChild(w()),n.addEventListener("click",()=>this.close()),a.append(c,l,n),t.append(s,a),this.#e=e,this.#c=null,this.#u()}#u(){if(!this.#t)return;const e=this.getAttribute("state")||"success",t=this.getAttribute("title")??"Changes saved",s=this.getAttribute("description")??"";this.#c!==e&&(this.#c&&this.#t.classList.remove(`ncd--${this.#c}`),this.#t.classList.add(`ncd--${e}`),this.#c=e,this.#l.replaceChildren(_(e))),this.#h.textContent=t,this.#a.textContent=s,this.#a.hidden=!s}#v(){if(!this.#t)return;this.#o&&(this.#o.remove(),this.#o=null);const e=this.#p();if(e<=0)return;const t=document.createElement("span");t.className="ncd__bar",t.style.animationDuration=`${e}ms`,t.setAttribute("aria-hidden","true"),this.#t.appendChild(t),this.#o=t}#f(){this.#n.textContent=this.getAttribute("trigger-label")??"Show card",this.#e&&this.#u()}}customElements.define("vs-notification-card",N);
