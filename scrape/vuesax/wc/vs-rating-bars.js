const d=`
  :host { display: inline-flex; }
  :host([hidden]) { display: none; }

  .vrb {
    --sz: 28px;
    --w: 8px;
    --gap: 5px;
    --fs: var(--ctrl-fs-sm, 13px);
    --bar: var(--ui-accent, #ededed);
    --muted: var(--text-muted, #8a8a8a);

    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font: inherit;
    user-select: none;
    -webkit-user-select: none;
    outline: none;
  }
  .vrb__row { display: inline-flex; align-items: flex-end; gap: var(--gap); }

  .vrb--sm { --sz: 22px; --w: 6px; --gap: 4px; --fs: var(--ctrl-fs-xs, 12px); }
  .vrb--lg { --sz: 36px; --w: 10px; --gap: 6px; --fs: var(--ctrl-fs-md, 15px); }

  .vrb__item {
    display: inline-flex;
    align-items: flex-end;
    width: var(--w);
    height: var(--sz);
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .vrb__item:disabled { cursor: default; }
  .vrb.is-readonly .vrb__item { cursor: default; }
  .vrb__item:hover:not(:disabled) { transform: translateY(-2px); }
  .vrb__item:focus-visible {
    outline: 2px solid var(--bar);
    outline-offset: 3px;
    border-radius: 4px;
  }

  .vrb__bar {
    position: relative;
    width: 100%;
    height: calc(var(--sz) * var(--h));
    border-radius: 3px;
    background: color-mix(in srgb, var(--muted) 42%, transparent);
    overflow: hidden;
  }
  /* fill grows from the bottom based on --fill (vertical sweep) */
  .vrb__fill {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: calc(var(--fill) * 100%);
    background: linear-gradient(to top, var(--bar), color-mix(in srgb, var(--bar) 70%, #fff 30%));
    border-radius: 3px;
    transition: height 240ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .vrb__item.is-rise { animation: vrb-rise 480ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  @keyframes vrb-rise {
    0% { transform: translateY(4px) scaleY(0.85); }
    55% { transform: translateY(-3px) scaleY(1.1); }
    100% { transform: translateY(0) scaleY(1); }
  }

  .vrb__value {
    font-size: var(--fs);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--muted);
    min-width: 1.6em;
  }

  .vrb--t-danger { --bar: #ff6369; }
  .vrb--t-warn { --bar: #ffb224; }
  .vrb--t-success { --bar: #4cc38a; }

  .vrb.is-disabled { opacity: 0.5; }

  @media (prefers-reduced-motion: reduce) {
    .vrb__item, .vrb__fill { transition: none; }
    .vrb__item:hover:not(:disabled) { transform: none; }
    .vrb__item.is-rise { animation: none; }
  }
`;let c;function f(h){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=h;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(h,t){const e=t?f(String(t).trim()):null;if(!e){for(const s of v)h.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(s=>Math.round(n?s*.92:s+(255-s)*.16)),a=(s,u)=>h.style.setProperty(s,u);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(s,l);a("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(s,n?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])a(s,n?"0 0 0":"255 255 255");a("--vs-color",l),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["value","max","count","readonly","disabled","size","tone","flat","allow-half","clearable","show-value","color"];#t;#n;#a=[];#i=null;#l;#h;#e=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=d,this.#t=document.createElement("div"),this.#t.className="vrb",this.#t.setAttribute("role","slider"),this.#t.setAttribute("aria-valuemin","0"),this.#n=document.createElement("div"),this.#n.className="vrb__row",this.#t.append(this.#n),t.append(e,this.#t),this.#l=i=>this.#w(i),this.#h=()=>{this.#i=null,this.#b()}}connectedCallback(){b(this,this.getAttribute("color")),this.#t.addEventListener("keydown",this.#l),this.#t.addEventListener("pointerleave",this.#h),this.#m(),this.#p()}disconnectedCallback(){this.#t.removeEventListener("keydown",this.#l),this.#t.removeEventListener("pointerleave",this.#h)}attributeChangedCallback(t){b(this,this.getAttribute("color")),this.#t&&((t==="count"||t==="max")&&this.isConnected&&this.#a.length!==this.#r()&&this.#m(),this.#p())}get value(){return this.#s()}set value(t){this.setAttribute("value",String(this.#o(Number(t)||0)))}get max(){return this.#r()}set max(t){this.setAttribute("max",String(Math.max(1,Number(t)|0)))}#r(){const t=Number(this.getAttribute("count")??this.getAttribute("max"));return Number.isFinite(t)&&t>=1?t|0:5}#s(){return this.#o(Number(this.getAttribute("value"))||0)}#o(t){return Math.max(0,Math.min(this.#r(),t))}#c(){return!(this.hasAttribute("disabled")&&this.hasAttribute("disabled"))&&!(this.hasAttribute("readonly")&&this.hasAttribute("readonly"))}#u(){return this.hasAttribute("allow-half")}#x(){return this.hasAttribute("clearable")}#y(){return this.hasAttribute("flat")}#d(){const t=this.#i!==null?this.#i:this.#s();return Number.isInteger(t)?String(t):t.toFixed(1)}#f(t){if(this.#y())return 1;const e=this.#r();return .34+t/Math.max(1,e-1)*.66}#v(t,e){if(!this.#u())return t+1;const i=e.currentTarget.getBoundingClientRect();return t+(e.clientX-i.left<i.width/2?.5:1)}#m(){const t=this.#r();this.#n.textContent="",this.#a=Array.from({length:t},(e,i)=>{const r=document.createElement("button");r.type="button",r.className="vrb__item",r.dataset.index=String(i),r.style.setProperty("--h",String(this.#f(i)));const n=document.createElement("span");n.className="vrb__bar",n.setAttribute("aria-hidden","true");const l=document.createElement("span");return l.className="vrb__fill",n.append(l),r.append(n),r.addEventListener("pointermove",o=>this.#A(i,o)),r.addEventListener("click",o=>this.#_(i,o)),r.addEventListener("animationend",()=>r.classList.remove("is-rise")),this.#n.append(r),r})}#p(){const t=this.getAttribute("size")||"md",e=this.getAttribute("tone")||"default",i=this.hasAttribute("disabled")&&this.hasAttribute("disabled"),r=this.hasAttribute("readonly")&&this.hasAttribute("readonly"),n=!i&&!r,l=this.#s(),o=this.#r();this.#t.className=["vrb",`vrb--${t}`,`vrb--t-${e}`,i?"is-disabled":"",r?"is-readonly":""].filter(Boolean).join(" "),this.#t.tabIndex=n?0:-1,this.#t.setAttribute("aria-valuenow",String(l)),this.#t.setAttribute("aria-valuemax",String(o)),this.#t.setAttribute("aria-label",`Rating: ${l} of ${o}`),r?this.#t.setAttribute("aria-readonly","true"):this.#t.removeAttribute("aria-readonly"),i?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled"),this.#a.forEach((a,s)=>{a.disabled=!n,a.setAttribute("aria-label",`${+a.dataset.index+1} of ${o}`),a.style.setProperty("--h",String(this.#f(s)))}),this.hasAttribute("show-value")?(this.#e||(this.#e=document.createElement("span"),this.#e.className="vrb__value",this.#e.setAttribute("aria-hidden","true"),this.#t.appendChild(this.#e)),this.#e.textContent=this.#d()):this.#e&&(this.#e.remove(),this.#e=null),this.#b()}#b(){const t=this.#i!==null?this.#i:this.#s();this.#a.forEach((e,i)=>{const r=t-i,n=r>=1?1:r<=0?0:r;e.querySelector(".vrb__fill").style.setProperty("--fill",String(n))}),this.#e&&(this.#e.textContent=this.#d())}#A(t,e){if(!this.#c())return;const i=this.#v(t,e);this.#i!==i&&(this.#i=i,this.#b(),this.dispatchEvent(new CustomEvent("hover",{bubbles:!0,composed:!0,detail:{value:i}})))}#_(t,e){if(!this.#c())return;let i=this.#v(t,e);this.#x()&&i===this.#s()&&(i=0),this.#g(i,t)}#w(t){if(!this.#c())return;const e=this.#r(),i=this.#u()?.5:1;let r=this.#s();switch(t.key){case"ArrowRight":case"ArrowUp":r=this.#o(r+i);break;case"ArrowLeft":case"ArrowDown":r=this.#o(r-i);break;case"Home":r=0;break;case"End":r=e;break;default:return}t.preventDefault(),this.#g(r,Math.ceil(r)-1)}#g(t,e){this.#i=null,this.setAttribute("value",String(this.#o(t)));const i=this.#a[e];i&&(i.classList.remove("is-rise"),i.offsetWidth,i.classList.add("is-rise")),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.#s()}}))}}customElements.define("vs-rating-bars",m);
