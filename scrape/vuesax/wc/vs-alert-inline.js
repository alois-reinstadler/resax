function m(){return matchMedia("(prefers-reduced-motion: reduce)").matches}const h="http://www.w3.org/2000/svg";function f(r){const t=document.createElementNS(h,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const[e,n]of r){const s=document.createElementNS(h,"path");s.setAttribute("d",e),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width",String(n)),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),t.appendChild(s)}return t}const b=`
  :host { display: inline-block; }
  .inl {
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));

    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    gap: 9px;
    max-width: 480px;
    padding: 4px 2px;
    color: var(--inp-text, #ededed);
    font: inherit;
    font-size: 13px;
    line-height: 1.4;
  }

  /* pulsing status dot */
  .inl__dot {
    flex: 0 0 auto;
    position: relative;
    width: 8px; height: 8px;
    border-radius: 999px;
    background: var(--accent);
  }
  .inl__dot::after {
    content: '';
    position: absolute; inset: 0;
    border-radius: inherit;
    background: var(--accent);
    animation: inl-pulse 1.8s ease-out infinite;
  }
  @keyframes inl-pulse {
    0% { transform: scale(1); opacity: 0.55; }
    70%, 100% { transform: scale(2.6); opacity: 0; }
  }

  .inl__text { margin: 0; min-width: 0; color: var(--tint); }
  .inl__prefix { margin-right: 6px; font-weight: 650; color: var(--accent); }
  .inl__action { flex: 0 0 auto; display: inline-flex; }

  .inl__close {
    flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center;
    width: 1.4em; height: 1.4em; margin-left: 2px; padding: 0;
    border: 0; border-radius: 6px; background: transparent; color: var(--tint); font-size: 13px;
    cursor: pointer; opacity: 0.7; transition: opacity 150ms ease, background 150ms ease, color 150ms ease;
  }
  .inl__close:hover:not(:disabled) { opacity: 1; color: var(--inp-text, #ededed); background: rgb(var(--ring) / 0.12); }
  .inl__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  .inl__close svg { width: 1em; height: 1em; display: block; }

  .inl--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --tint: var(--inp-t-danger-hint, #ff8a8e); }
  .inl--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --tint: var(--inp-t-warn-hint, #f5b544); }
  .inl--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --tint: var(--inp-t-success-hint, #5fd49b); }

  .inl.is-disabled { opacity: 0.55; }
  .inl.is-disabled .inl__close { cursor: not-allowed; }

  /* dismiss: collapse height to 0 with anticipation bounce + blur */
  .inl.is-closing {
    overflow: hidden;
    opacity: 0;
    filter: blur(5px);
    transform: scale(0.96);
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    transition:
      height 420ms cubic-bezier(0.5, -0.45, 0.55, 1),
      opacity 280ms ease,
      filter 320ms ease,
      transform 420ms cubic-bezier(0.5, -0.45, 0.55, 1),
      padding 420ms cubic-bezier(0.5, -0.45, 0.55, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    .inl__dot::after { animation: none; }
    .inl__close { transition: none; }
  }
`;let d;function g(r){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=r;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(r,t){const e=t?g(String(t).trim()):null;if(!e){for(const i of v)r.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),a=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(i=>Math.round(a?i*.92:i+(255-i)*.16)),o=(i,u)=>r.style.setProperty(i,u);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(i,c);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(i,a?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])o(i,a?"0 0 0":"255 255 255");o("--vs-color",c),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["title","message","tone","dot","dismissible","disabled","color"];#e;#n;#s;#r;#a;#i;#o;#t;#c=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#e=document.createElement("div"),this.#n=document.createElement("span"),this.#n.className="inl__dot",this.#n.setAttribute("aria-hidden","true");const n=document.createElement("p");n.className="inl__text",this.#s=document.createElement("strong"),this.#s.className="inl__prefix",this.#r=document.createElement("slot"),this.#a=document.createTextNode(""),this.#r.appendChild(this.#a),n.append(this.#s,this.#r),this.#i=document.createElement("span"),this.#i.className="inl__action",this.#i.hidden=!0,this.#o=document.createElement("slot"),this.#o.name="action",this.#i.appendChild(this.#o),this.#o.addEventListener("slotchange",()=>{this.#i.hidden=this.#o.assignedNodes({flatten:!0}).length===0}),this.#t=document.createElement("button"),this.#t.className="inl__close",this.#t.type="button",this.#t.setAttribute("aria-label","Close alert"),this.#t.appendChild(f([["M6 6L18 18",1.5],["M18 6L6 18",1.5]])),this.#e.append(this.#n,n,this.#i,this.#t),t.append(e,this.#e),this.#t.addEventListener("click",()=>this.#d())}connectedCallback(){p(this,this.getAttribute("color")),this.setAttribute("role","alert"),this.#l()}disconnectedCallback(){this.#t.removeEventListener("click",this.#d)}attributeChangedCallback(){p(this,this.getAttribute("color")),this.#e&&this.#l()}#l(){const t=(o,i)=>this.getAttribute(o)??i,e=this.hasAttribute("disabled"),n=this.hasAttribute("dismissible"),s=this.hasAttribute("dot"),a=t("tone","default"),c=t("title",""),l=t("message","Link copied to clipboard.");this.#e.className=`inl inl--t-${a}${e?" is-disabled":""}${this.#c?" is-closing":""}`,this.#n.hidden=!s,this.#s.textContent=c,this.#s.hidden=!c,this.#a.textContent=l,this.#t.style.display=n?"":"none",this.#t.disabled=e}#d=()=>{if(this.hasAttribute("disabled")||this.#c)return;const t=this.#e;if(!t||m()){this.#h();return}const e=t.getBoundingClientRect().height;t.style.height=`${e}px`,this.#c=!0,this.#l(),t.offsetHeight,requestAnimationFrame(()=>{t.style.height="0px"});const n=s=>{s.propertyName==="height"&&(t.removeEventListener("transitionend",n),this.#h())};t.addEventListener("transitionend",n)};#h(){this.style.display="none",this.dispatchEvent(new CustomEvent("dismiss",{bubbles:!0,composed:!0}))}}customElements.define("vs-alert-inline",y);
