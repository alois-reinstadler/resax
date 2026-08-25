const v="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z",u="http://www.w3.org/2000/svg";function f(){const n=document.createElementNS(u,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("class","vrg__svg"),n.setAttribute("aria-hidden","true");for(const e of["vrg__bg","vrg__halo","vrg__fg"]){const t=document.createElementNS(u,"path");t.setAttribute("class",e),t.setAttribute("d",v),n.appendChild(t)}return n}const m=`
  :host { display: inline-flex; }
  .vrg {
    --sz: 24px;
    --gap: 6px;
    --fs: var(--ctrl-fs-sm, 13px);
    --neon: var(--ui-accent, #ededed);
    --muted: var(--text-muted, #8a8a8a);
    --glow: 9px;
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font: inherit;
    user-select: none;
    outline: none;
  }
  .vrg:focus-visible { outline: 2px solid var(--neon); outline-offset: 3px; border-radius: 6px; }
  .vrg__row { display: inline-flex; align-items: center; gap: var(--gap); }

  .vrg--sm { --sz: 18px; --gap: 5px; --fs: var(--ctrl-fs-xs, 12px); }
  .vrg--lg { --sz: 32px; --gap: 8px; --fs: var(--ctrl-fs-md, 15px); }

  .vrg--i-low { --glow: 4px; }
  .vrg--i-high { --glow: 9px; }

  .vrg__item {
    position: relative;
    display: inline-flex;
    width: var(--sz);
    height: var(--sz);
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .vrg__item:disabled { cursor: default; }
  .vrg.is-readonly .vrg__item { cursor: default; }
  .vrg__item:hover:not(:disabled) { transform: scale(1.08); }

  .vrg__svg { width: 100%; height: 100%; overflow: visible; }
  .vrg__bg {
    fill: transparent;
    stroke: var(--muted);
    stroke-width: 1.1;
    opacity: 0.5;
  }
  .vrg__fg {
    fill: var(--neon);
    clip-path: inset(0 calc((1 - var(--fill)) * 100%) 0 0);
    transition: clip-path 200ms cubic-bezier(0.22, 1, 0.36, 1), filter 220ms ease;
    filter: none;
  }
  /* pulsing glow on the lit stars.
     Perf: the filter is not animated per frame. The min state stays static on .vrg__fg;
     the max is baked into .vrg__halo (twin path under the fg, same clip) and only
     its opacity is animated (compositable). */
  .vrg__item.is-lit .vrg__fg {
    filter: drop-shadow(0 0 var(--glow) var(--neon)) drop-shadow(0 0 calc(var(--glow) * 2) var(--neon));
  }
  .vrg__halo {
    fill: var(--neon);
    clip-path: inset(0 calc((1 - var(--fill)) * 100%) 0 0);
    filter: drop-shadow(0 0 calc(var(--glow) * 1.6) var(--neon)) drop-shadow(0 0 calc(var(--glow) * 3) var(--neon));
    opacity: 0;
    pointer-events: none;
  }
  .vrg__item.is-lit .vrg__halo { animation: vrg-pulse 2.4s ease-in-out infinite; }
  @keyframes vrg-pulse {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }

  /* neon flash on select */
  .vrg__item.is-flash { animation: vrg-flash 520ms ease-out; }
  @keyframes vrg-flash {
    0% { transform: scale(1); }
    30% { transform: scale(1.32); }
    100% { transform: scale(1); }
  }

  .vrg__value {
    font-size: var(--fs);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--neon);
    text-shadow: 0 0 8px color-mix(in srgb, var(--neon) 60%, transparent);
    min-width: 1.6em;
  }

  .vrg--t-danger { --neon: #ff6369; }
  .vrg--t-warn { --neon: #ffb224; }
  .vrg--t-success { --neon: #4cc38a; }

  .vrg.is-disabled { opacity: 0.5; }

  @media (prefers-reduced-motion: reduce) {
    .vrg__item, .vrg__fg { transition: none; }
    .vrg__item:hover:not(:disabled) { transform: none; }
    .vrg__item.is-lit .vrg__fg { animation: none; }
    .vrg__item.is-lit .vrg__halo { animation: none; opacity: 0; }
    .vrg__item.is-flash { animation: none; }
  }
`;let l;function b(n){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=n;const e=l.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const p=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function g(n,e){const t=e?b(String(e).trim()):null;if(!t){for(const s of p)n.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),o=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,h=t.map(s=>Math.round(o?s*.92:s+(255-s)*.16)),a=(s,d)=>n.style.setProperty(s,d);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(s,c);a("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(s,t.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(s,o?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])a(s,o?"0 0 0":"255 255 255");a("--vs-color",c),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["value","max","count","intensity","clearable","show-value","readonly","disabled","size","tone","allow-half","color"];#t;#e;#i;#r=[];#n=null;#o;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=m,this.#t=document.createElement("div"),this.#t.className="vrg",this.#t.setAttribute("role","slider"),this.#e=document.createElement("div"),this.#e.className="vrg__row",this.#i=document.createElement("span"),this.#i.className="vrg__value",this.#i.setAttribute("aria-hidden","true"),this.#i.hidden=!0,this.#t.append(this.#e,this.#i),e.append(t,this.#t),this.#c(this.#s)}connectedCallback(){g(this,this.getAttribute("color")),this.#o=new AbortController;const e={signal:this.#o.signal};this.#e.addEventListener("pointermove",t=>this.#d(t),e),this.#e.addEventListener("click",t=>this.#f(t),e),this.#e.addEventListener("animationend",t=>t.target.classList?.remove("is-flash"),e),this.#t.addEventListener("pointerleave",()=>this.#v(),e),this.#t.addEventListener("keydown",t=>this.#m(t),e),this.#u()}disconnectedCallback(){this.#o?.abort()}attributeChangedCallback(){g(this,this.getAttribute("color")),this.#t&&this.#u()}get value(){return this.#l("value",0)}set value(e){this.setAttribute("value",String(e))}get#s(){return Math.max(1,Math.floor(this.#l("count",this.#l("max",5))))}#l(e,t){const i=parseFloat(this.getAttribute(e));return Number.isFinite(i)?i:t}get#a(){return!this.hasAttribute("disabled")&&!this.hasAttribute("readonly")}#c(e){this.#e.textContent="",this.#r=[];for(let t=0;t<e;t++){const i=document.createElement("button");i.type="button",i.className="vrg__item",i.tabIndex=-1,i.setAttribute("aria-label",`${t+1} of ${e}`),i.appendChild(f()),this.#e.appendChild(i),this.#r.push(i)}}#u(){const e=this.getAttribute("size")||"md",t=this.getAttribute("tone")||"default",i=this.getAttribute("intensity")||"high";this.#t.className=`vrg vrg--${e} vrg--t-${t} vrg--i-${i}`+(this.hasAttribute("disabled")?" is-disabled":"")+(this.hasAttribute("readonly")?" is-readonly":""),this.#t.tabIndex=this.#a?0:-1,this.#t.setAttribute("aria-valuemin","0"),this.#t.setAttribute("aria-valuemax",String(this.#s)),this.hasAttribute("readonly")?this.#t.setAttribute("aria-readonly","true"):this.#t.removeAttribute("aria-readonly"),this.hasAttribute("disabled")?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled"),this.#r.length!==this.#s&&this.#c(this.#s),this.#i.hidden=!this.hasAttribute("show-value"),this.#h()}#h(){const e=this.value,t=this.#n!=null?this.#n:e;this.#r.forEach((i,r)=>{const o=Math.max(0,Math.min(1,t-r));i.style.setProperty("--fill",String(o)),i.classList.toggle("is-lit",o>0),i.disabled=!this.#a}),this.#t.setAttribute("aria-valuenow",String(e)),this.#t.setAttribute("aria-label",`Rating: ${e} of ${this.#s}`),this.#i.hidden||(this.#i.textContent=Number.isInteger(t)?String(t):t.toFixed(1))}#g(e,t){const i=this.#r.indexOf(e);if(i<0)return null;if(!this.hasAttribute("allow-half"))return i+1;const r=e.getBoundingClientRect();return i+(t.clientX-r.left<r.width/2?.5:1)}#d(e){if(!this.#a)return;const t=e.target.closest?.(".vrg__item");if(!t)return;const i=this.#g(t,e);i!=null&&(this.#n=i,this.#h(),this.dispatchEvent(new CustomEvent("hover",{bubbles:!0,composed:!0,detail:{value:i}})))}#v(){this.#n!=null&&(this.#n=null,this.#h())}#f(e){if(!this.#a)return;const t=e.target.closest?.(".vrg__item");if(!t)return;let i=this.#g(t,e);i!=null&&(this.hasAttribute("clearable")&&i===this.value&&(i=0),this.value=i,t.classList.add("is-flash"),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:i}})))}#m(e){if(!this.#a)return;const t=this.hasAttribute("allow-half")?.5:1,i=this.#s;let r=this.value;switch(e.key){case"ArrowRight":case"ArrowUp":r=Math.min(i,r+t);break;case"ArrowLeft":case"ArrowDown":r=Math.max(0,r-t);break;case"Home":r=0;break;case"End":r=i;break;default:return}e.preventDefault(),this.value=r,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:r}}))}}customElements.define("vs-rating-glow",_);
