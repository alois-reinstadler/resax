const b="M16.44 3.09961C14.63 3.09961 13.01 3.97961 12 5.32961C10.99 3.97961 9.37 3.09961 7.56 3.09961C4.49 3.09961 2 5.59961 2 8.68961C2 9.87961 2.19 10.9796 2.52 11.9996C4.1 16.9996 8.97 19.9896 11.38 20.8096C11.72 20.9296 12.28 20.9296 12.62 20.8096C15.03 19.9896 19.9 16.9996 21.48 11.9996C21.81 10.9796 22 9.87961 22 8.68961C22 5.59961 19.51 3.09961 16.44 3.09961Z",d="http://www.w3.org/2000/svg",m=`
  :host { display: inline-flex; }
  .vrh {
    --sz: 24px;
    --gap: 5px;
    --fs: var(--ctrl-fs-sm, 13px);
    --heart: var(--ui-accent, #ededed);
    --muted: var(--text-muted, #8a8a8a);
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font: inherit;
    user-select: none;
    outline: none;
  }
  .vrh__row { display: inline-flex; align-items: center; gap: var(--gap); }

  .vrh--sm { --sz: 18px; --gap: 4px; --fs: var(--ctrl-fs-xs, 12px); }
  .vrh--lg { --sz: 32px; --gap: 7px; --fs: var(--ctrl-fs-md, 15px); }

  .vrh__item {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    width: var(--sz);
    height: var(--sz);
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .vrh__item:disabled { cursor: default; }
  .vrh.is-readonly .vrh__item { cursor: default; }
  .vrh__item:hover:not(:disabled) { transform: translateY(-1px); }
  .vrh__item:focus-visible {
    outline: 2px solid var(--heart);
    outline-offset: 2px;
    border-radius: 6px;
  }

  .vrh__svg { position: relative; z-index: 1; width: 100%; height: 100%; overflow: visible; }
  .vrh__bg {
    fill: transparent;
    stroke: var(--muted);
    stroke-width: 1.1;
    opacity: 0.55;
  }
  .vrh__fg {
    fill: var(--heart);
    clip-path: inset(0 calc((1 - var(--fill)) * 100%) 0 0);
    transition: clip-path 200ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* aura: soft halo pulsing behind the selected heart */
  .vrh__aura {
    position: absolute;
    inset: -30%;
    z-index: 0;
    border-radius: 50%;
    background: radial-gradient(circle, color-mix(in srgb, var(--heart) 40%, transparent) 0%, transparent 68%);
    opacity: 0;
    transform: scale(0.4);
    pointer-events: none;
  }
  .vrh__item.is-beat .vrh__aura { animation: vrh-aura 620ms ease-out; }
  @keyframes vrh-aura {
    0% { opacity: 0.9; transform: scale(0.4); }
    100% { opacity: 0; transform: scale(1.5); }
  }

  /* heartbeat of the heart on select */
  .vrh__item.is-beat { animation: vrh-beat 620ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .vrh--beat-strong .vrh__item.is-beat { animation-duration: 720ms; }
  @keyframes vrh-beat {
    0% { transform: scale(1); }
    20% { transform: scale(1.28); }
    40% { transform: scale(0.94); }
    60% { transform: scale(1.16); }
    100% { transform: scale(1); }
  }

  .vrh__value {
    font-size: var(--fs);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--muted);
    min-width: 1.6em;
  }

  .vrh--t-danger { --heart: #ff6369; }
  .vrh--t-warn { --heart: #ffb224; }
  .vrh--t-success { --heart: #4cc38a; }

  .vrh.is-disabled { opacity: 0.5; }

  @media (prefers-reduced-motion: reduce) {
    .vrh__item, .vrh__fg { transition: none; }
    .vrh__item:hover:not(:disabled) { transform: none; }
    .vrh__item.is-beat { animation: none; }
    .vrh__aura { display: none; }
  }
`;let u;function f(h){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=h;const e=u.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const p=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(h,e){const t=e?f(String(e).trim()):null;if(!t){for(const i of p)h.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),n=.2126*r(t[0])+.7152*r(t[1])+.0722*r(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(i=>Math.round(n?i*.92:i+(255-i)*.16)),s=(i,c)=>h.style.setProperty(i,c);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(i,l);s("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(i,t.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(i,n?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])s(i,n?"0 0 0":"255 255 255");s("--vs-color",l),s("--vs-color-rgb",t.join(" ")),s("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["value","max","count","beat","allow-half","clearable","show-value","readonly","disabled","size","tone","color"];#t;#i;#e;#r=[];#s=null;#n;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=m,this.#t=document.createElement("span"),this.#t.className="vrh",this.#t.setAttribute("role","slider"),this.#t.setAttribute("aria-valuemin","0"),this.#i=document.createElement("span"),this.#i.className="vrh__row",this.#e=document.createElement("span"),this.#e.className="vrh__value",this.#e.setAttribute("aria-hidden","true"),this.#t.append(this.#i,this.#e),e.append(t,this.#t)}connectedCallback(){v(this,this.getAttribute("color")),this.#n=new AbortController;const e={signal:this.#n.signal};this.#t.addEventListener("keydown",t=>this.#f(t),e),this.#t.addEventListener("pointerleave",()=>{this.#s=null,this.#l()},e),this.#u(),this.#d()}disconnectedCallback(){this.#n?.abort()}attributeChangedCallback(){v(this,this.getAttribute("color")),this.#t.isConnected&&(this.#u(),this.#d())}get value(){return this.#o("value",0)}set value(e){this.setAttribute("value",String(e))}get max(){return Math.max(1,Math.round(this.#o("count",this.#o("max",5))))}#o(e,t){const r=parseFloat(this.getAttribute(e));return Number.isFinite(r)?r:t}#a(){return!this.hasAttribute("disabled")&&!this.hasAttribute("readonly")}#h(){return this.hasAttribute("allow-half")}#b(){return this.hasAttribute("clearable")}#c(e,t){if(!this.#h())return e+1;const r=t.currentTarget.getBoundingClientRect();return e+(t.clientX-r.left<r.width/2?.5:1)}#u(){const e=this.max;if(this.#r.length!==e){this.#i.textContent="",this.#r=[];for(let t=0;t<e;t++){const r=document.createElement("button");r.type="button",r.className="vrh__item";const a=document.createElement("span");a.className="vrh__aura",a.setAttribute("aria-hidden","true");const n=document.createElementNS(d,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("class","vrh__svg"),n.setAttribute("aria-hidden","true");const l=document.createElementNS(d,"path");l.setAttribute("class","vrh__bg"),l.setAttribute("d",b);const o=document.createElementNS(d,"path");o.setAttribute("class","vrh__fg"),o.setAttribute("d",b),n.append(l,o),r.append(a,n);const s=t,i={signal:this.#n.signal};r.addEventListener("pointermove",c=>this.#v(s,c),i),r.addEventListener("click",c=>this.#m(s,c),i),r.addEventListener("animationend",()=>r.classList.remove("is-beat"),i),this.#i.appendChild(r),this.#r.push(r)}}}#d(){const e=this.getAttribute("size")||"md",t=this.getAttribute("tone")||"default",r=this.hasAttribute("readonly"),a=this.hasAttribute("disabled"),n=this.getAttribute("beat")||"soft";this.#t.className=`vrh vrh--${e} vrh--t-${t} vrh--beat-${n}${r?" is-readonly":""}${a?" is-disabled":""}`,this.#t.tabIndex=this.#a()?0:-1;const l=this.value,o=this.max;this.#t.setAttribute("aria-valuenow",String(l)),this.#t.setAttribute("aria-valuemax",String(o)),this.#t.setAttribute("aria-label",`Rating: ${l} of ${o}`),r?this.#t.setAttribute("aria-readonly","true"):this.#t.removeAttribute("aria-readonly"),a?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled");for(const s of this.#r)s.disabled=!this.#a();this.#e.hidden=!this.hasAttribute("show-value"),this.#l()}#l(){const e=this.#s!==null?this.#s:this.value;this.#r.forEach((t,r)=>{const a=Math.max(0,Math.min(1,e-r));t.style.setProperty("--fill",String(a))}),this.#e.textContent=Number.isInteger(e)?String(e):e.toFixed(1)}#v(e,t){this.#a()&&(this.#s=this.#c(e,t),this.#l(),this.dispatchEvent(new CustomEvent("hover",{bubbles:!0,composed:!0,detail:{value:this.#s}})))}#m(e,t){if(!this.#a())return;let r=this.#c(e,t);this.#b()&&r===this.value&&(r=0),this.value=r,r>0&&this.#r[e]?.classList.add("is-beat"),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:r}}))}#f(e){if(!this.#a())return;let t=this.value;const r=this.max,a=this.#h()?.5:1;switch(e.key){case"ArrowRight":case"ArrowUp":t=Math.min(r,t+a);break;case"ArrowLeft":case"ArrowDown":t=Math.max(0,t-a);break;case"Home":t=0;break;case"End":t=r;break;default:return}e.preventDefault(),t!==this.value&&(this.value=t,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:t}})))}}customElements.define("vs-rating-hearts",g);
