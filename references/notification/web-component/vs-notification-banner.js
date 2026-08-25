const f=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,p="http://www.w3.org/2000/svg";function o(i,e){const t=document.createElementNS(p,"path");return t.setAttribute("d",i),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width",e||"1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t}function g(i){const e=document.createElementNS(p,"svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),i==="success"?e.append(o("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"),o("M7.75 11.9999L10.58 14.8299L16.25 9.16992")):i==="error"?e.append(o("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"),o("M9.17004 14.8299L14.83 9.16992"),o("M14.83 14.8299L9.17004 9.16992")):i==="warn"?e.append(o("M12 9V14"),o("M12.0001 21.4093H5.94005C2.47005 21.4093 1.02005 18.9293 2.70005 15.8993L5.82006 10.2793L8.76006 4.9993C10.5401 1.7893 13.4601 1.7893 15.2401 4.9993L18.1801 10.2893L21.3001 15.9093C22.9801 18.9393 21.5201 21.4193 18.0601 21.4193H12.0001V21.4093Z"),o("M11.9945 17H12.0035","2")):e.append(o("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"),o("M12 8V13"),o("M11.9945 16H12.0035","2")),e}function v(){const i=document.createElementNS(p,"svg");return i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("fill","none"),i.setAttribute("aria-hidden","true"),i.append(o("M6 6L18 18"),o("M18 6L6 18")),i}const x=`
  :host { display: inline-flex; }
  .bnt__trigger {
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
  .bnt__trigger:hover { opacity: 0.9; }
`,y=`
  .bnt {
    --acc: var(--ui-accent, #ededed);
    --acc-rgb: var(--ui-ring, 255 255 255);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    color: var(--text, #ededed);
    background: color-mix(in srgb, rgb(var(--acc-rgb)) 14%, var(--bg-card, #111));
    border-bottom: 1px solid color-mix(in srgb, rgb(var(--acc-rgb)) 40%, transparent);
    box-shadow: 0 8px 24px -12px rgba(0, 0, 0, 0.5);
  }
  .bnt--success { --acc: #4cc38a; --acc-rgb: 76 195 138; }
  .bnt--error { --acc: #ff6369; --acc-rgb: 255 99 105; }
  .bnt--warn { --acc: #ffb224; --acc-rgb: 255 178 36; }
  .bnt--info { --acc: #6e9bff; --acc-rgb: 110 155 255; }

  .bnt__icon { display: inline-flex; flex: none; color: var(--acc); }
  .bnt__icon svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
  .bnt__text { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 10px; flex: 1 1 auto; min-width: 0; }
  .bnt__title { font-size: 14px; font-weight: 600; }
  .bnt__desc { font-size: 13px; color: var(--text-secondary, #b4b4b4); }
  .bnt__action {
    flex: none;
    height: 30px;
    padding: 0 12px;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, rgb(var(--acc-rgb)) 45%, transparent);
    background: transparent;
    color: var(--acc);
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 160ms ease;
  }
  .bnt__action:hover { background: color-mix(in srgb, rgb(var(--acc-rgb)) 14%, transparent); }
  .bnt__close {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    padding: 0;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--text-secondary, #a1a1a1);
    cursor: pointer;
    transition: background-color 160ms ease, color 160ms ease;
  }
  .bnt__close:hover { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.08)); color: var(--text, #ededed); }
  .bnt__close svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }

  /* slide down from the top */
  .bnt-enter-active { transition: transform 460ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease; }
  .bnt-leave-active { transition: transform 260ms cubic-bezier(0.4, 0, 1, 1), opacity 220ms ease; }
  .bnt-enter-from, .bnt-leave-to { transform: translateY(-100%); opacity: 0; }

  @media (prefers-reduced-motion: reduce) {
    .bnt-enter-active, .bnt-leave-active { transition-duration: 0ms; }
    .bnt-enter-from, .bnt-leave-to { transform: none; }
  }
`;let h;function C(i){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=i;const e=h.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(i,e){const t=e?C(String(e).trim()):null;if(!t){for(const n of _)i.style.removeProperty(n);return}const a=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),c=.2126*a(t[0])+.7152*a(t[1])+.0722*a(t[2])>.45,u=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(n=>Math.round(c?n*.92:n+(255-n)*.16)),s=(n,d)=>i.style.setProperty(n,d);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(n,u);s("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(n,t.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(n,c?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])s(n,c?"0 0 0":"255 255 255");s("--vs-color",u),s("--vs-color-rgb",t.join(" ")),s("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class E extends HTMLElement{static observedAttributes=["state","title","description","action-label","duration","trigger-label","color"];#n;#t=null;#e=null;#a=null;#d=null;#b=null;#u=null;#c=null;#p=null;#r=!1;#s=0;#i=0;#o=null;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=x,this.#n=document.createElement("button"),this.#n.type="button",this.#n.className="bnt__trigger",this.#n.addEventListener("click",()=>this.show()),e.append(t,this.#n)}connectedCallback(){m(this,this.getAttribute("color")),this.#m()}disconnectedCallback(){clearTimeout(this.#s),this.#s=0,clearTimeout(this.#i),this.#i=0,this.#l(),this.#r=!1}attributeChangedCallback(){m(this,this.getAttribute("color")),this.#n&&this.#m()}show(){if(!this.isConnected)return;this.#r?this.#h():(this.#r=!0,this.#v()),clearTimeout(this.#s);const e=this.#g();e>0&&(this.#s=setTimeout(()=>this.close(),e))}close(){this.#r&&(this.#r=!1,clearTimeout(this.#s),this.#s=0,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),this.#x())}#f(){this.dispatchEvent(new CustomEvent("action",{bubbles:!0,composed:!0})),this.close()}get open(){return this.#r}#g(){const e=this.getAttribute("duration");if(e===null)return 5e3;const t=Number(e);return Number.isFinite(t)?t:5e3}#v(){this.#l(),this.#y(),document.body.appendChild(this.#t),this.#e.offsetWidth,this.#e.classList.remove("bnt-enter-from")}#x(){const e=this.#t,t=this.#e;if(!e||!t)return;if(f()){this.#l();return}t.classList.remove("bnt-enter-active","bnt-enter-from"),t.classList.add("bnt-leave-active","bnt-leave-to");const a=()=>{clearTimeout(this.#i),this.#t===e&&this.#l()},r=c=>{c.target===t&&(t.removeEventListener("transitionend",r),a())};t.addEventListener("transitionend",r),clearTimeout(this.#i),this.#i=setTimeout(a,700)}#l(){clearTimeout(this.#i),this.#i=0,this.#t&&(this.#t.remove(),this.#t=this.#e=this.#a=null,this.#d=this.#b=this.#u=null,this.#c=this.#p=null)}#y(){const e=document.createElement("div"),t=e.attachShadow({mode:"open"}),a=document.createElement("style");a.textContent=y;const r=document.createElement("div");r.className="bnt bnt-enter-active bnt-enter-from",r.setAttribute("role","status"),r.setAttribute("aria-live","polite"),this.#e=r;const c=document.createElement("span");c.className="bnt__icon",c.setAttribute("aria-hidden","true"),this.#a=c;const u=document.createElement("div");u.className="bnt__text";const l=document.createElement("span");l.className="bnt__title",this.#d=l;const s=document.createElement("span");s.className="bnt__desc";const n=document.createElement("slot");s.appendChild(n),this.#b=s,this.#u=n,u.append(l,s);const d=document.createElement("button");d.type="button",d.className="bnt__action",d.addEventListener("click",()=>this.#f()),this.#c=d;const b=document.createElement("button");b.type="button",b.className="bnt__close",b.setAttribute("aria-label","Dismiss"),b.appendChild(v()),b.addEventListener("click",()=>this.close()),this.#p=b,r.append(c,u,d,b),t.append(a,r),this.#t=e,this.#o=null,this.#h()}#h(){if(!this.#e)return;const e=this.getAttribute("state")||"info",t=this.getAttribute("title")??"Heads up!",a=this.getAttribute("description")??"",r=this.getAttribute("action-label")??"";this.#o!==e&&(this.#o&&this.#e.classList.remove(`bnt--${this.#o}`),this.#e.classList.add(`bnt--${e}`),this.#a.textContent="",this.#a.appendChild(g(e)),this.#o=e),this.#d.textContent=t,this.#b.hidden=!a,this.#u.textContent=a,this.#c.textContent=r,this.#c.hidden=!r}#m(){this.#n.textContent=this.getAttribute("trigger-label")??"Show banner",this.#t&&this.#h()}}customElements.define("vs-notification-banner",E);
