const y=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,f="http://www.w3.org/2000/svg";function g(i){const t=document.createElementNS(f,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none");for(const{d:e,sw:r}of i){const s=document.createElementNS(f,"path");s.setAttribute("d",e),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width",String(r??1.5)),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),t.appendChild(s)}return t}const p="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",m={success:()=>g([{d:p},{d:"M7.75 11.9999L10.58 14.8299L16.25 9.16992"}]),error:()=>g([{d:p},{d:"M9.17004 14.8299L14.83 9.16992"},{d:"M14.83 14.8299L9.17004 9.16992"}]),warn:()=>g([{d:"M12 9V14"},{d:"M12.0001 21.4093H5.94005C2.47005 21.4093 1.02005 18.9293 2.70005 15.8993L5.82006 10.2793L8.76006 4.9993C10.5401 1.7893 13.4601 1.7893 15.2401 4.9993L18.1801 10.2893L21.3001 15.9093C22.9801 18.9393 21.5201 21.4193 18.0601 21.4193H12.0001V21.4093Z"},{d:"M11.9945 17H12.0035",sw:2}]),info:()=>g([{d:p},{d:"M12 8V13"},{d:"M11.9945 16H12.0035",sw:2}])};function _(){const i=g([{d:"M6 6L18 18"},{d:"M18 6L6 18"}]);return i.setAttribute("aria-hidden","true"),i}const w=`
  :host { display: inline-flex; }
  .ngl__trigger {
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
  .ngl__trigger:hover { opacity: 0.9; }
`,C=`
  .ngl__host { position: fixed; top: calc(20px + var(--ngl-offset, 0px)); right: 20px; z-index: 9999; transition: top 240ms ease; }

  .ngl {
    --acc: var(--ui-accent, #ededed);
    --acc-rgb: 76 195 138;
    display: flex;
    align-items: center;
    gap: 12px;
    width: 330px;
    max-width: calc(100vw - 40px);
    padding: 13px 14px;
    border-radius: 14px;
    border: 1px solid color-mix(in srgb, rgb(var(--acc-rgb)) 55%, transparent);
    background: #0e0e10;
    color: #f0f0f0;
    box-shadow:
      0 0 0 1px color-mix(in srgb, rgb(var(--acc-rgb)) 35%, transparent),
      0 0 22px -6px rgb(var(--acc-rgb) / 0.55),
      0 16px 40px -14px rgba(0, 0, 0, 0.7);
  }
  .ngl--success { --acc: var(--ui-accent, #ededed); --acc-rgb: 76 195 138; }
  .ngl--error { --acc: #ff6369; --acc-rgb: 255 99 105; }
  .ngl--warn { --acc: #ffb224; --acc-rgb: 255 178 36; }
  .ngl--info { --acc: #6e9bff; --acc-rgb: 110 155 255; }

  .ngl__icon {
    position: relative;
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: color-mix(in srgb, rgb(var(--acc-rgb)) 18%, transparent);
    color: var(--acc);
    filter: drop-shadow(0 0 5px rgb(var(--acc-rgb) / 0.8));
  }
  /* Perf: the ping (spread 0/α.5→6px/α0) is baked at its visible peak (~3px at
     half alpha) into ::after; only opacity animates (compositable). The peak
     shows up twice per cycle (25% and 75%), like the original interpolation. */
  .ngl__icon::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow: 0 0 0 3px rgb(var(--acc-rgb) / 0.25);
    opacity: 0;
    animation: ngl-pulse 1.8s ease-in-out infinite;
  }
  .ngl__icon svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
  @keyframes ngl-pulse {
    0%, 50%, 100% { opacity: 0; }
    25%, 75% { opacity: 1; }
  }

  .ngl__text { display: flex; flex-direction: column; gap: 2px; flex: 1 1 auto; min-width: 0; }
  .ngl__title { font-size: 14px; font-weight: 600; }
  .ngl__desc { font-size: 13px; line-height: 1.5; color: rgba(255, 255, 255, 0.6); }
  .ngl__close {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    padding: 0;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: background-color 160ms ease, color 160ms ease;
  }
  .ngl__close:hover { background: rgba(255, 255, 255, 0.08); color: #fff; }
  .ngl__close svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }

  /* slide in from the right */
  .ngl-enter-active { transition: transform 440ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease; }
  .ngl-leave-active { transition: transform 260ms cubic-bezier(0.4, 0, 1, 1), opacity 220ms ease; }
  .ngl-enter-from, .ngl-leave-to { transform: translateX(120%); opacity: 0; }

  @media (prefers-reduced-motion: reduce) {
    .ngl__host { transition-duration: 0ms; }
    .ngl-enter-active, .ngl-leave-active { transition-duration: 0ms; }
    .ngl-enter-from, .ngl-leave-to { transform: none; }
    .ngl__icon::after { animation: none; opacity: 0; }
  }
`,E=72,u=[];function k(i){u.unshift(i),x()}function b(i){const t=u.indexOf(i);t!==-1&&u.splice(t,1),x()}function x(){u.forEach((i,t)=>i.style.setProperty("--ngl-offset",`${t*E}px`))}let h;function A(i){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=i;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const L=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(i,t){const e=t?A(String(t).trim()):null;if(!e){for(const n of L)i.style.removeProperty(n);return}const r=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),o=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,d=e.map(n=>Math.round(o?n*.92:n+(255-n)*.16)),c=(n,a)=>i.style.setProperty(n,a);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(n,l);c("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(n,o?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])c(n,o?"0 0 0":"255 255 255");c("--vs-color",l),c("--vs-color-rgb",e.join(" ")),c("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class S extends HTMLElement{static observedAttributes=["state","title","description","duration","trigger-label","color"];#n;#e=null;#t=null;#l=null;#d=null;#c=null;#g=null;#s=!1;#r=0;#i=0;#o=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=w,this.#n=document.createElement("button"),this.#n.type="button",this.#n.className="ngl__trigger",this.#n.addEventListener("click",()=>this.show()),t.append(e,this.#n)}connectedCallback(){v(this,this.getAttribute("color")),this.#u()}disconnectedCallback(){clearTimeout(this.#r),this.#r=0,clearTimeout(this.#i),this.#i=0,this.#a(),this.#s=!1}attributeChangedCallback(){v(this,this.getAttribute("color")),this.#n&&this.#u()}show(){if(!this.isConnected)return;this.#s?this.#h():(this.#s=!0,this.#f()),clearTimeout(this.#r);const t=this.#p();t>0&&(this.#r=setTimeout(()=>this.close(),t))}close(){this.#s&&(this.#s=!1,clearTimeout(this.#r),this.#r=0,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),this.#m())}get open(){return this.#s}#p(){const t=this.getAttribute("duration");if(t===null)return 5e3;const e=Number(t);return Number.isFinite(e)?e:5e3}#f(){this.#a(),this.#b(),document.body.appendChild(this.#e),k(this.#t),this.#t.offsetWidth,this.#t.classList.remove("ngl-enter-from"),this.dispatchEvent(new CustomEvent("show",{bubbles:!0,composed:!0}))}#m(){const t=this.#e,e=this.#t;if(!t||!e)return;if(b(e),y()){this.#a();return}e.classList.remove("ngl-enter-active","ngl-enter-from"),e.classList.add("ngl-leave-active","ngl-leave-to");const r=()=>{clearTimeout(this.#i),this.#e===t&&this.#a()},s=o=>{o.target===e&&(e.removeEventListener("transitionend",s),r())};e.addEventListener("transitionend",s),clearTimeout(this.#i),this.#i=setTimeout(r,700)}#a(){clearTimeout(this.#i),this.#i=0,this.#t&&b(this.#t),this.#e&&(this.#e.remove(),this.#e=this.#t=this.#l=null,this.#d=this.#c=this.#g=null)}#b(){const t=document.createElement("div"),e=t.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=C;const s=document.createElement("div");s.className="ngl__host";const o=document.createElement("div");o.className="ngl ngl-enter-active ngl-enter-from",o.setAttribute("role","status"),o.setAttribute("aria-live","polite"),this.#t=o;const l=document.createElement("span");l.className="ngl__icon",l.setAttribute("aria-hidden","true"),this.#l=l;const d=document.createElement("div");d.className="ngl__text";const c=document.createElement("span");c.className="ngl__title",this.#d=c;const n=document.createElement("span");n.className="ngl__desc",this.#c=n,d.append(c,n);const a=document.createElement("button");a.type="button",a.className="ngl__close",a.setAttribute("aria-label","Dismiss"),a.appendChild(_()),a.addEventListener("click",()=>this.close()),this.#g=a,o.append(l,d,a),s.appendChild(o),e.append(r,s),this.#e=t,this.#o=null,this.#h()}#h(){if(!this.#t)return;const t=this.getAttribute("state")||"success",e=this.getAttribute("title")??"Deployment live",r=this.getAttribute("description")??"";if(this.#o!==t){this.#o&&this.#t.classList.remove(`ngl--${this.#o}`),this.#t.classList.add(`ngl--${t}`);const s=(m[t]||m.success)();this.#l.replaceChildren(s),this.#o=t}this.#d.textContent=e,this.#c.textContent=r,this.#c.hidden=!r}#u(){this.#n.textContent=this.getAttribute("trigger-label")??"Show toast",this.#e&&this.#h()}}customElements.define("vs-notification-glow",S);
