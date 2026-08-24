function b(){return matchMedia("(prefers-reduced-motion: reduce)").matches}const h={dangerWarn:[["M12 9V14",1.5],["M12.0001 21.4093H5.94005C2.47005 21.4093 1.02005 18.9293 2.70005 15.8993L5.82006 10.2793L8.76006 4.9993C10.5401 1.7893 13.4601 1.7893 15.2401 4.9993L18.1801 10.2893L21.3001 15.9093C22.9801 18.9393 21.5201 21.4193 18.0601 21.4193H12.0001V21.4093Z",1.5],["M11.9945 17H12.0035",2]],success:[["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",1.5],["M7.75 11.9999L10.58 14.8299L16.25 9.16992",1.5]],default:[["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",1.5],["M12 8V13",1.5],["M11.9945 16H12.0035",2]]},g="http://www.w3.org/2000/svg";function p(a){const t=document.createElementNS(g,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const[e,n]of a){const i=document.createElementNS(g,"path");i.setAttribute("d",e),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width",String(n)),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),t.appendChild(i)}return t}const m=`
  :host { display: block; }
  .spl {
    --accent: var(--inp-accent, #ededed);
    --solid-fg: var(--badge-solid-fg, #0b0b0b);
    --ring: var(--inp-ring, 255 255 255);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));

    position: relative;
    isolation: isolate;
    box-sizing: border-box;
    display: flex;
    align-items: stretch;
    width: 100%;
    max-width: 440px;
    min-height: 66px;
    border: 1px solid rgb(var(--ring) / 0.14);
    border-radius: 14px;
    background: var(--bg-card, #111);
    color: var(--inp-text, #ededed);
    font: inherit;
    line-height: 1.45;
    overflow: hidden;
  }

  /* solid color panel holding the icon */
  .spl__panel {
    flex: 0 0 auto;
    display: flex; align-items: center; justify-content: center;
    width: 54px;
    background: var(--accent);
    color: var(--solid-fg);
    box-shadow: inset -1px 0 0 rgb(0 0 0 / 0.08);
  }
  .spl__panel svg { width: 22px; height: 22px; display: block; }

  .spl__body { flex: 1 1 auto; min-width: 0; padding: 13px 14px; align-self: center; }
  .spl__title { margin: 0 0 2px; font-weight: 650; font-size: 14px; color: var(--accent); }
  .spl__msg { margin: 0; font-size: 13px; color: var(--tint); }
  .spl__action { margin-top: 9px; display: flex; gap: 8px; flex-wrap: wrap; }

  .spl__close {
    flex: 0 0 auto; align-self: flex-start;
    display: inline-flex; align-items: center; justify-content: center;
    width: 1.7em; height: 1.7em; margin: 8px 8px 0 0; padding: 0;
    border: 0; border-radius: 7px; background: transparent; color: var(--tint); font-size: 15px;
    cursor: pointer; opacity: 0.7; transition: opacity 160ms ease, background 160ms ease, color 160ms ease;
  }
  .spl__close:hover:not(:disabled) { opacity: 1; color: var(--inp-text, #ededed); background: rgb(var(--ring) / 0.12); }
  .spl__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  .spl__close svg { width: 1em; height: 1em; display: block; }

  /* tones (default uses the light accent with dark text) */
  .spl--t-danger { --accent: #ff5a61; --ui-accent-fg: #fff; --ring: 255 99 105; --solid-fg: #160405; --tint: var(--inp-t-danger-hint, #ff8a8e); }
  .spl--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --solid-fg: #160f02; --tint: var(--inp-t-warn-hint, #f5b544); }
  .spl--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --solid-fg: #04120b; --tint: var(--inp-t-success-hint, #5fd49b); }
  .spl--t-purple { --accent: #9a7bff; --ui-accent-fg: #fff; --ring: 154 123 255; --solid-fg: #0d0620; --tint: var(--inp-t-purple-hint, #b6a0ff); }

  .spl.is-disabled { opacity: 0.55; }
  .spl.is-disabled .spl__close { cursor: not-allowed; }

  /* close: collapse height to 0 with anticipation bounce + blur */
  .spl.is-closing {
    overflow: hidden;
    min-height: 0 !important;
    opacity: 0;
    filter: blur(6px);
    transform: scale(0.97);
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    border-top-width: 0 !important;
    border-bottom-width: 0 !important;
    transition:
      height 440ms cubic-bezier(0.5, -0.45, 0.55, 1),
      opacity 300ms ease,
      filter 340ms ease,
      transform 440ms cubic-bezier(0.5, -0.45, 0.55, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    .spl__close { transition: none; }
  }
`;let c;function v(a){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=a;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(a,t){const e=t?v(String(t).trim()):null;if(!e){for(const s of y)a.style.removeProperty(s);return}const n=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),r=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,d=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(s=>Math.round(r?s*.92:s+(255-s)*.16)),o=(s,f)=>a.style.setProperty(s,f);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(s,d);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(s,r?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])o(s,r?"0 0 0":"255 255 255");o("--vs-color",d),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["title","message","tone","dismissible","disabled","color"];#e;#s;#r;#l;#c;#d;#n;#a;#p;#i;#o;#t;#h=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#e=document.createElement("div"),this.#s=document.createElement("div"),this.#s.className="spl__panel",this.#s.setAttribute("aria-hidden","true"),this.#r=document.createElement("slot"),this.#r.name="icon",this.#l=p(h.dangerWarn),this.#c=p(h.success),this.#d=p(h.default),this.#r.append(this.#l,this.#c,this.#d),this.#s.appendChild(this.#r);const n=document.createElement("div");n.className="spl__body",this.#n=document.createElement("p"),this.#n.className="spl__title",this.#a=document.createElement("p"),this.#a.className="spl__msg";const i=document.createElement("slot");this.#p=document.createTextNode(""),i.appendChild(this.#p),this.#a.appendChild(i),this.#i=document.createElement("div"),this.#i.className="spl__action",this.#i.hidden=!0,this.#o=document.createElement("slot"),this.#o.name="action",this.#i.appendChild(this.#o),this.#o.addEventListener("slotchange",()=>{this.#i.hidden=this.#o.assignedNodes({flatten:!0}).length===0}),n.append(this.#n,this.#a,this.#i),this.#t=document.createElement("button"),this.#t.className="spl__close",this.#t.type="button",this.#t.setAttribute("aria-label","Close alert");const r=p([["M6 6L18 18",1.5],["M18 6L6 18",1.5]]);this.#t.appendChild(r),this.#e.append(this.#s,n,this.#t),t.append(e,this.#e),this.#t.addEventListener("click",()=>this.#f())}connectedCallback(){u(this,this.getAttribute("color")),this.setAttribute("role","alert"),this.#g()}disconnectedCallback(){}attributeChangedCallback(){u(this,this.getAttribute("color")),this.#e&&this.#g()}#g(){const t=(l,o)=>this.getAttribute(l)??o,e=this.hasAttribute("disabled"),n=this.hasAttribute("dismissible"),i=t("tone","default"),r=t("title",""),d=t("message","Something you should know.");this.#e.className=`spl spl--t-${i}${e?" is-disabled":""}${this.#h?" is-closing":""}`,this.#l.style.display=i==="danger"||i==="warn"?"":"none",this.#c.style.display=i!=="success"?"none":"",this.#d.style.display=i==="danger"||i==="warn"||i==="success"?"none":"",this.#n.textContent=r,this.#n.hidden=!r,this.#p.textContent=d,this.#t.style.display=n?"":"none",this.#t.disabled=e}#f(){if(this.hasAttribute("disabled")||this.#h)return;const t=this.#e;if(!t||b()){this.#u();return}const e=t.getBoundingClientRect().height;t.style.height=`${e}px`,this.#h=!0,t.classList.add("is-closing"),t.offsetHeight,requestAnimationFrame(()=>{t.style.height="0px"});const n=i=>{i.propertyName==="height"&&(t.removeEventListener("transitionend",n),this.#u())};t.addEventListener("transitionend",n)}#u(){this.style.display="none",this.dispatchEvent(new CustomEvent("dismiss",{bubbles:!0,composed:!0}))}}customElements.define("vs-alert-split",x);
