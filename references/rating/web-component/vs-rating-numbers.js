const p=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,f=`
  :host { display: inline-flex; }
  .vrn {
    --sz: 28px;
    --gap: 6px;
    --fs: var(--ctrl-fs-sm, 13px);
    --chip: var(--ui-accent, #ededed);
    --muted: var(--text-muted, #8a8a8a);
    --radius: 8px;

    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font: inherit;
    user-select: none;
    outline: none;
  }
  .vrn__row { display: inline-flex; align-items: center; gap: var(--gap); perspective: 400px; }

  .vrn--sm { --sz: 22px; --gap: 5px; --fs: var(--ctrl-fs-xs, 12px); }
  .vrn--lg { --sz: 36px; --gap: 7px; --fs: var(--ctrl-fs-md, 15px); }

  .vrn__chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sz);
    height: var(--sz);
    padding: 0;
    border: 1.5px solid color-mix(in srgb, var(--muted) 55%, transparent);
    border-radius: var(--radius);
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    transition: background 180ms ease, color 180ms ease, border-color 180ms ease, transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .vrn__chip:disabled { cursor: default; }
  .vrn.is-readonly .vrn__chip { cursor: default; }
  .vrn__chip:hover:not(:disabled) { transform: translateY(-2px); }
  .vrn__chip:focus-visible {
    outline: 2px solid var(--chip);
    outline-offset: 2px;
  }

  /* shape: circle rounds the tile fully (square is the default --radius) */
  .vrn--circle { --radius: 50%; }

  /* active: tile filled with the accent color */
  .vrn__chip.is-on {
    background: var(--chip);
    border-color: var(--chip);
    color: #fff;
  }

  .vrn__num {
    font-size: var(--fs);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }

  /* 3D flip of the chosen tile */
  .vrn__chip.is-flip { animation: vrn-flip 520ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  @keyframes vrn-flip {
    0% { transform: rotateY(0) scale(1); }
    50% { transform: rotateY(180deg) scale(1.12); }
    100% { transform: rotateY(360deg) scale(1); }
  }

  .vrn__value {
    font-size: var(--fs);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--chip);
    min-width: 1.4em;
  }

  .vrn--t-danger { --chip: #ff6369; }
  .vrn--t-warn { --chip: #ffb224; }
  .vrn--t-success { --chip: #4cc38a; }

  .vrn.is-disabled { opacity: 0.5; }

  @media (prefers-reduced-motion: reduce) {
    .vrn__chip { transition: none; }
    .vrn__chip:hover:not(:disabled) { transform: none; }
    .vrn__chip.is-flip { animation: none; }
  }
`;let l;function b(o){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=o;const t=l.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(o,t){const e=t?b(String(t).trim()):null;if(!e){for(const s of v)o.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(s=>Math.round(n?s*.92:s+(255-s)*.16)),a=(s,d)=>o.style.setProperty(s,d);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(s,c);a("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(s,n?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])a(s,n?"0 0 0":"255 255 255");a("--vs-color",c),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["value","max","count","shape","clearable","show-value","readonly","disabled","size","tone","color"];#t;#n;#s=[];#l=0;#i=0;#a=null;#e=null;#c=t=>this.#g(t);#h=()=>this.#p(null);constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#t=document.createElement("span"),this.#t.className="vrn",this.#t.setAttribute("role","slider"),this.#t.setAttribute("aria-valuemin","0"),this.#n=document.createElement("span"),this.#n.className="vrn__row",this.#t.appendChild(this.#n),t.append(e,this.#t),this.#t.addEventListener("keydown",this.#c),this.#t.addEventListener("pointerleave",this.#h)}connectedCallback(){u(this,this.getAttribute("color")),this.#d()}disconnectedCallback(){this.#t.removeEventListener("keydown",this.#c),this.#t.removeEventListener("pointerleave",this.#h)}attributeChangedCallback(){u(this,this.getAttribute("color")),this.#t&&this.#d()}get value(){return this.#i}set value(t){this.setAttribute("value",String(t|0))}#u(){return Math.max(1,parseInt(this.getAttribute("count")??this.getAttribute("max")??"5",10)||5)}#r(){return!this.hasAttribute("disabled")&&!this.hasAttribute("readonly")}#f(){return this.hasAttribute("clearable")}#b(){return this.#a!==null?this.#a:this.#i}#d(){const t=this.#u(),e=this.getAttribute("size")||"md",i=this.getAttribute("tone")||"default",r=this.getAttribute("shape")||"square";this.#t.className=["vrn",`vrn--${e}`,`vrn--t-${i}`,`vrn--${r}`,this.hasAttribute("disabled")?"is-disabled":"",this.hasAttribute("readonly")?"is-readonly":""].filter(Boolean).join(" "),t!==this.#l&&this.#v(t);const n=this.getAttribute("value"),c=n==null?this.#i:parseInt(n,10)||0;this.#i=Math.min(Math.max(c,0),t),this.#t.setAttribute("aria-valuenow",String(this.#i)),this.#t.setAttribute("aria-valuemax",String(t)),this.#t.setAttribute("aria-label",`Rating: ${this.#i} of ${t}`),this.#t.tabIndex=this.#r()?0:-1,this.hasAttribute("readonly")?this.#t.setAttribute("aria-readonly","true"):this.#t.removeAttribute("aria-readonly"),this.hasAttribute("disabled")?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled"),this.hasAttribute("show-value")?this.#e||(this.#e=document.createElement("span"),this.#e.className="vrn__value",this.#e.setAttribute("aria-hidden","true"),this.#t.appendChild(this.#e)):this.#e&&(this.#e.remove(),this.#e=null),this.#o()}#v(t){for(const e of this.#s)e.btn.remove();this.#s=[];for(let e=0;e<t;e++){const i=document.createElement("button");i.type="button",i.className="vrn__chip",i.setAttribute("aria-label",`${e+1} of ${t}`);const r=document.createElement("span");r.className="vrn__num",r.setAttribute("aria-hidden","true"),r.textContent=String(e+1),i.appendChild(r);const n=e;i.addEventListener("pointermove",()=>this.#p(n+1)),i.addEventListener("click",()=>this.#m(n)),i.addEventListener("animationend",()=>i.classList.remove("is-flip")),this.#n.appendChild(i),this.#s.push({btn:i,num:r})}this.#l=t}#o(){const t=this.#b(),e=this.#r();for(let i=0;i<this.#s.length;i++){const{btn:r}=this.#s[i];r.classList.toggle("is-on",t>=i+1),r.disabled=!e}this.#e&&(this.#e.textContent=String(Math.round(t)))}#p(t){this.#r()||(t=null),t!==this.#a&&(this.#a=t,this.#o(),t!==null&&this.dispatchEvent(new CustomEvent("hover",{bubbles:!0,composed:!0,detail:{value:t}})))}#m(t){if(!this.#r())return;let e=t+1;this.#f()&&e===this.#i&&(e=0),this.setAttribute("value",String(e)),this.#o(),e>0&&!p()&&(this.#s[t].btn.classList.remove("is-flip"),this.#s[t].btn.offsetWidth,this.#s[t].btn.classList.add("is-flip")),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e}}))}#g(t){if(!this.#r())return;const e=this.#u();let i=this.#i;switch(t.key){case"ArrowRight":case"ArrowUp":i=Math.min(e,i+1);break;case"ArrowLeft":case"ArrowDown":i=Math.max(0,i-1);break;case"Home":i=0;break;case"End":i=e;break;default:return}t.preventDefault(),i!==this.#i&&(this.setAttribute("value",String(i)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:i}})))}}customElements.define("vs-rating-numbers",m);
