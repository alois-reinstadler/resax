function f(){return matchMedia("(prefers-reduced-motion: reduce)").matches}const u={dangerWarn:[["M12 9V14",1.5],["M12.0001 21.4093H5.94005C2.47005 21.4093 1.02005 18.9293 2.70005 15.8993L5.82006 10.2793L8.76006 4.9993C10.5401 1.7893 13.4601 1.7893 15.2401 4.9993L18.1801 10.2893L21.3001 15.9093C22.9801 18.9393 21.5201 21.4193 18.0601 21.4193H12.0001V21.4093Z",1.5],["M11.9945 17H12.0035",2]],success:[["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",1.5],["M7.75 11.9999L10.58 14.8299L16.25 9.16992",1.5]],default:[["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",1.5],["M12 8V13",1.5],["M11.9945 16H12.0035",2]]},m="http://www.w3.org/2000/svg";function h(a){const t=document.createElementNS(m,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const[e,s]of a){const o=document.createElementNS(m,"path");o.setAttribute("d",e),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width",String(s)),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),t.appendChild(o)}return t}const b=`
  :host { display: block; }
  .tst {
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    --spring: cubic-bezier(0.34, 1.56, 0.64, 1);

    position: relative;
    isolation: isolate;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    max-width: 400px;
    padding: 14px;
    border: 1px solid rgb(var(--ring) / 0.14);
    border-radius: 16px;
    background: var(--bg-elevated, #191919);
    color: var(--inp-text, #ededed);
    font: inherit;
    line-height: 1.45;
    overflow: hidden;
    box-shadow: 0 20px 48px -16px rgb(0 0 0 / 0.55), 0 2px 8px rgb(0 0 0 / 0.3);
    /* enter state */
    opacity: 0;
    transform: translateY(14px) scale(0.97);
    filter: blur(6px);
    transition: opacity 300ms ease, transform 480ms var(--spring), filter 320ms ease;
  }
  .tst.is-in { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }

  /* icon in a tinted circle */
  .tst__icon {
    flex: 0 0 auto;
    display: inline-flex; align-items: center; justify-content: center;
    width: 34px; height: 34px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent) 18%, transparent);
    color: var(--accent);
    font-size: 16px;
  }
  .tst__icon svg { width: 1.1em; height: 1.1em; display: block; }

  .tst__body { flex: 1 1 auto; min-width: 0; padding-top: 1px; }
  .tst__title { margin: 0 0 2px; font-weight: 650; font-size: 14px; }
  .tst__msg { margin: 0; font-size: 13px; color: var(--tint); }
  .tst__action { margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap; }

  .tst__close {
    flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center;
    width: 1.6em; height: 1.6em; margin: -2px -2px 0 0; padding: 0;
    border: 0; border-radius: 8px; background: transparent; color: inherit; font-size: 15px;
    cursor: pointer; opacity: 0.55; transition: opacity 160ms ease, background 160ms ease;
  }
  .tst__close:hover:not(:disabled) { opacity: 1; background: rgb(var(--ring) / 0.14); }
  .tst__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  .tst__close svg { width: 1em; height: 1em; display: block; }

  .tst__progress {
    position: absolute; left: 0; bottom: 0; height: 3px; width: 100%;
    transform-origin: left center; background: var(--accent);
    animation: tst-count linear forwards;
  }
  .tst:hover .tst__progress { animation-play-state: paused; }
  @keyframes tst-count { from { transform: scaleX(1); } to { transform: scaleX(0); } }

  .tst--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --tint: var(--inp-t-danger-hint, #ff8a8e); }
  .tst--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --tint: var(--inp-t-warn-hint, #f5b544); }
  .tst--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --tint: var(--inp-t-success-hint, #5fd49b); }

  .tst.is-disabled { opacity: 0.55; }
  .tst.is-disabled .tst__close { cursor: not-allowed; }

  /* close: collapse height to 0 with anticipation bounce + blur */
  .tst.is-closing {
    opacity: 0;
    filter: blur(6px);
    transform: scale(0.97);
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    border-top-width: 0 !important;
    border-bottom-width: 0 !important;
    transition:
      height 440ms cubic-bezier(0.5, -0.45, 0.55, 1),
      opacity 300ms ease,
      filter 340ms ease,
      transform 440ms cubic-bezier(0.5, -0.45, 0.55, 1),
      padding 440ms cubic-bezier(0.5, -0.45, 0.55, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    .tst { transition: opacity 200ms ease; transform: none; filter: none; }
    .tst__close { transition: none; }
    .tst__progress { animation: none; display: none; }
  }
`;let d;function y(a){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=a;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function g(a,t){const e=t?y(String(t).trim()):null;if(!e){for(const i of v)a.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),n=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(i=>Math.round(n?i*.92:i+(255-i)*.16)),r=(i,p)=>a.style.setProperty(i,p);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(i,c);r("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(i,n?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])r(i,n?"0 0 0":"255 255 255");r("--vs-color",c),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["title","message","tone","icon","dismissible","duration","disabled","color"];#i;#s;#h;#p;#u;#l;#a;#d;#m;#g;#n;#c;#t;#r;#e=0;#o=0;#y=!1;#f=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#i=document.createElement("div"),this.#s=document.createElement("span"),this.#s.className="tst__icon",this.#s.setAttribute("aria-hidden","true"),this.#l=document.createElement("slot"),this.#l.name="icon",this.#h=h(u.dangerWarn),this.#p=h(u.success),this.#u=h(u.default),this.#l.append(this.#h,this.#p,this.#u),this.#s.appendChild(this.#l);const s=document.createElement("div");s.className="tst__body",this.#a=document.createElement("p"),this.#a.className="tst__title",this.#d=document.createElement("p"),this.#d.className="tst__msg",this.#m=document.createElement("slot"),this.#g=document.createTextNode(""),this.#m.appendChild(this.#g),this.#d.appendChild(this.#m),this.#n=document.createElement("div"),this.#n.className="tst__action",this.#n.hidden=!0,this.#c=document.createElement("slot"),this.#c.name="action",this.#n.appendChild(this.#c),this.#c.addEventListener("slotchange",()=>{this.#n.hidden=this.#c.assignedNodes({flatten:!0}).length===0}),s.append(this.#a,this.#d,this.#n),this.#t=document.createElement("button"),this.#t.className="tst__close",this.#t.type="button",this.#t.setAttribute("aria-label","Close alert"),this.#t.appendChild(h([["M6 6L18 18",1.5],["M18 6L6 18",1.5]])),this.#t.addEventListener("click",()=>this.#v()),this.#r=document.createElement("span"),this.#r.className="tst__progress",this.#r.setAttribute("aria-hidden","true"),this.#i.append(this.#s,s,this.#t,this.#r),t.append(e,this.#i)}connectedCallback(){g(this,this.getAttribute("color")),this.setAttribute("role","status"),this.#b(),this.#o=requestAnimationFrame(()=>{this.#o=requestAnimationFrame(()=>{this.#o=0,this.#y=!0,this.#b()})});const t=Number(this.getAttribute("duration"))||0;t>0&&(this.#e=setTimeout(()=>this.#v(),t))}disconnectedCallback(){this.#o&&(cancelAnimationFrame(this.#o),this.#o=0),this.#e&&(clearTimeout(this.#e),this.#e=0)}attributeChangedCallback(){g(this,this.getAttribute("color")),this.#i&&this.#b()}#b(){const t=(i,p)=>this.getAttribute(i)??p,e=this.hasAttribute("disabled"),s=this.hasAttribute("dismissible"),o=this.hasAttribute("icon"),n=t("tone","success"),c=t("title","Saved"),l=t("message","Your changes were saved successfully."),r=Number(t("duration","0"))||0;this.#i.className=`tst tst--t-${n}${this.#y?" is-in":""}${e?" is-disabled":""}${this.#f?" is-closing":""}`,this.#s.style.display=o?"":"none",this.#h.style.display=n==="danger"||n==="warn"?"":"none",this.#p.style.display=n!=="success"?"none":"",this.#u.style.display=n==="danger"||n==="warn"||n==="success"?"none":"",this.#a.textContent=c,this.#a.hidden=!c,this.#g.textContent=l,this.#t.style.display=s?"":"none",this.#t.disabled=e,this.#r.hidden=r<=0,this.#r.style.animationDuration=r>0?`${r}ms`:""}#v(){if(this.hasAttribute("disabled")||this.#f)return;this.#e&&(clearTimeout(this.#e),this.#e=0);const t=this.#i;if(!t||f()){this.#x();return}const e=t.getBoundingClientRect().height;t.style.height=`${e}px`,this.#f=!0,t.classList.add("is-closing"),t.offsetHeight,requestAnimationFrame(()=>{t.style.height="0px"});const s=o=>{o.propertyName==="height"&&(t.removeEventListener("transitionend",s),this.#x())};t.addEventListener("transitionend",s)}#x(){this.style.display="none",this.dispatchEvent(new CustomEvent("dismiss",{bubbles:!0,composed:!0}))}}customElements.define("vs-alert-toast",x);
