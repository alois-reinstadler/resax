const T=[{label:"All",value:"all"},{label:"Mentions",value:"mentions"},{label:"System",value:"system"}],R={k:235,c:24,m:1},I={k:168,c:21,m:1},b=1e3/120,$=`
  :host { display: inline-block; max-width: 100%; }
  :host([block]) { display: block; width: 100%; }

  .tc {
    --h: var(--ctrl-h-md, 40px);
    --fs: var(--ctrl-fs-md, 14px);
    --px: 18px;
    /* shoulder radius: the concave flare AND the tab's own top corners */
    --r: 12px;
    /* how much of the surface below the tabs the strip paints itself */
    --lip: 10px;
    --panel: var(--bg-card, #111111);
    --line: var(--border, #2a2a2a);
    --txt: var(--vs-color, var(--text, #ededed));
    --muted: var(--text-muted, #8a8a8a);
    --hover: color-mix(in srgb, var(--muted) 16%, transparent);
    position: relative;
    display: block;
    box-sizing: border-box;
    padding-inline: var(--r);
    padding-bottom: var(--lip);
    font-family: inherit;
    font-size: var(--fs);
    max-width: 100%;
  }
  .tc--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: 13px; }
  .tc--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: 22px; }

  /* The toolbar the tabs sit on. It is part of the component, not of the page:
     without it the shoulders are quarter-circles floating in mid-air. */
  .tc__lip {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: var(--lip);
    background: var(--panel);
    border-radius: 0 0 calc(var(--r) * 0.55) calc(var(--r) * 0.55);
  }

  .tc__list {
    position: relative;
    display: flex;
    align-items: flex-end;
    min-height: var(--h);
    overflow: visible;
  }
  .tc--block .tc__list { width: 100%; }

  /* ── the sled: the active tab's surface, and the only thing that moves ── */
  .tc__sled {
    position: absolute;
    left: 0;
    bottom: 0;
    height: var(--h);
    width: 0;
    border-radius: var(--r) var(--r) 0 0;
    background: var(--panel);
    transform: translate3d(0, 0, 0);
    transform-origin: 50% 100%;
    /* No transition here on purpose: the travel is a WAAPI animation sampled
       from a spring solver, and a transition can only interpolate both edges
       with ONE curve — which is exactly what kills the stretch. */
    pointer-events: none;
  }
  /* The shoulders. Each is a square patch beside the sled with the quarter disc
     centred on its OUTER top corner cut away — that missing quarter is the
     concave curve, and what is left flares down into the lip. */
  .tc__sled::before,
  .tc__sled::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: var(--r);
    height: var(--r);
    background: var(--panel);
  }
  .tc__sled::before {
    left: calc(var(--r) * -1);
    -webkit-mask: radial-gradient(circle at 0 0, transparent calc(var(--r) - 0.5px), #000 var(--r));
    mask: radial-gradient(circle at 0 0, transparent calc(var(--r) - 0.5px), #000 var(--r));
  }
  .tc__sled::after {
    right: calc(var(--r) * -1);
    -webkit-mask: radial-gradient(circle at 100% 0, transparent calc(var(--r) - 0.5px), #000 var(--r));
    mask: radial-gradient(circle at 100% 0, transparent calc(var(--r) - 0.5px), #000 var(--r));
  }

  /* ── tabs ── */
  .tc__tab {
    position: relative;
    z-index: 1;
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: var(--h);
    padding: 0 var(--px);
    border: 0;
    background: transparent;
    color: var(--muted);
    font: inherit;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: color 240ms ease, opacity 240ms ease;
  }
  .tc--block .tc__tab { flex: 1 1 0; justify-content: center; min-width: 0; }
  .tc__tab.is-active { color: var(--txt); font-weight: 600; }

  /* Hover is INK ONLY — no plate, no fill. A hover surface here would read as a
     second sled and fight the one that is actually moving. */
  .tc__tab:hover:not(.is-active):not(:disabled) { color: var(--txt); }

  /* the hairline between two resting tabs (Chrome's separator) */
  .tc__tab::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 1px;
    height: 42%;
    background: var(--line);
    transform: translateY(-50%);
    transition: opacity 180ms ease;
  }
  /* Only the sled hides the hairline now: with no hover plate there is nothing
     for the line to cut through, and blinking it on hover was noise. */
  .tc__tab:last-of-type::after,
  .tc__tab.is-active::after,
  .tc__tab:has(+ .tc__tab.is-active)::after { opacity: 0; }

  .tc__tab:focus-visible {
    outline: 2px solid var(--vs-color, var(--ui-accent, #ededed));
    outline-offset: -3px;
    border-radius: var(--r) var(--r) 0 0;
  }
  .tc__tab:disabled { opacity: 0.4; cursor: not-allowed; }

  .tc__label { position: relative; overflow: hidden; text-overflow: ellipsis; }

  .tc__badge {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 999px;
    background: var(--vs-color, var(--ui-accent, #ededed));
    color: var(--vs-color-fg, var(--ui-accent-fg, #0b0b0b));
    font-size: 11px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }

  /* Close is a span, not a button: a <button> inside a <button> is invalid HTML
     and browsers drop it out of the tab. */
  .tc__x {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    margin-right: -6px;
    border-radius: 999px;
    color: inherit;
    opacity: 0.55;
    transition: opacity 160ms ease, background-color 160ms ease;
  }
  .tc__x:hover { opacity: 1; background: var(--hover); }
  .tc__x svg { width: 11px; height: 11px; display: block; }

  .tc__add {
    position: relative;
    z-index: 1;
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin: 0 0 calc((var(--h) - 28px) / 2) 6px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    transition: background-color 160ms ease, color 160ms ease;
  }
  .tc__add:hover { background: var(--hover); color: var(--txt); }
  .tc__add svg { width: 14px; height: 14px; display: block; }

  .is-disabled { opacity: 0.55; pointer-events: none; }

  /* Reduced motion: the sled still marks the active tab, it just gets there
     without travelling or smearing (the spring pass is skipped in JS). */
  @media (prefers-reduced-motion: reduce) {
    .tc__tab { transition: color 200ms ease; }
  }
`;function A({k:d,c:t,m:e},a=1800){const s=[],i=b/1e3;let n=1,o=0;for(let l=0;l<=a&&(s.push(1-n),o+=(-d*n-t*o)/e*i,n+=o*i,!(Math.abs(n)<.002&&Math.abs(o)<.02));l+=b);return s.push(1),s}const f=A(R),v=A(I),m=Math.max(f.length,v.length),F=Math.round(m*b),y=(d,t)=>t<d.length?d[t]:1;let p;function P(d){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=d;const t=p.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const z=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function k(d,t){const e=t?P(String(t).trim()):null;if(!e){for(const r of z)d.style.removeProperty(r);return}const a=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),i=.2126*a(e[0])+.7152*a(e[1])+.0722*a(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(r=>Math.round(i?r*.92:r+(255-r)*.16)),l=(r,c)=>d.style.setProperty(r,c);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(r,n);l("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(r,i?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])l(r,i?"0 0 0":"255 255 255");l("--vs-color",n),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",i?"#0b0b0b":"#ffffff")}const D='<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 2.5 9.5 9.5M9.5 2.5 2.5 9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',O='<svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 2.2v9.6M2.2 7h9.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';class j extends HTMLElement{static observedAttributes=["value","tabs","size","curve","lip","speed","closable","addable","block","disabled","color"];#i;#e;#t;#r=[];#d=null;#h;#o;#b=!1;#n=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=$,this.#i=document.createElement("div"),this.#i.className="tc";const a=document.createElement("div");a.className="tc__lip",this.#e=document.createElement("div"),this.#e.className="tc__list",this.#e.setAttribute("role","tablist"),this.#t=document.createElement("div"),this.#t.className="tc__sled",this.#e.appendChild(this.#t),this.#i.append(a,this.#e),this.#h=s=>this.#x(s),t.append(e,this.#i)}connectedCallback(){k(this,this.getAttribute("color")),this.#f(),this.#u(),this.#e.addEventListener("keydown",this.#h),this.#s(!1),requestAnimationFrame(()=>this.#s(!1)),setTimeout(()=>this.#s(!1),80),document.fonts?.ready?.then(()=>this.#s(!1)).catch(()=>{}),typeof ResizeObserver<"u"&&(this.#o=new ResizeObserver(()=>this.#s(!1)),this.#o.observe(this.#e))}disconnectedCallback(){this.#e.removeEventListener("keydown",this.#h),this.#o?.disconnect(),this.#o=null}attributeChangedCallback(t){k(this,this.getAttribute("color")),this.#i&&(this.#f(),t==="tabs"&&this.#u(),t==="value"&&this.#m(),this.#s(t==="value"))}set items(t){this.#d=Array.isArray(t)&&t.length?t:null,this.#i&&(this.#u(),this.#s(!1))}get items(){return this.#a()}set value(t){this.setAttribute("value",String(t))}get value(){return this.getAttribute("value")??this.#a()[0]?.value??""}#a(){if(this.#d)return this.#d;const t=this.getAttribute("tabs");return t&&t.trim()?t.split(",").map(e=>{let a=e.trim();const s=a.startsWith("!");s&&(a=a.slice(1).trim());const[i,n]=a.split(":");return{label:i.trim(),value:i.trim().toLowerCase().replace(/\s+/g,"-"),badge:n?n.trim():void 0,disabled:s}}).filter(e=>e.label):T}#l(){return this.hasAttribute("disabled")}#p(t,e){const a=parseFloat(this.getAttribute(t));return Number.isFinite(a)?a:e}#c(){const t=this.value,e=this.#a().findIndex(a=>a.value===t);return e<0?0:e}#f(){const t=this.getAttribute("size")||"md",e=this.#l();this.#i.className=`tc tc--${t}${this.hasAttribute("block")?" tc--block":""}${e?" is-disabled":""}`,this.#i.style.setProperty("--r",`${this.#p("curve",12)}px`),this.#i.style.setProperty("--lip",`${this.#p("lip",10)}px`),this.#i.setAttribute("aria-disabled",e?"true":"false")}#u(){for(const i of[...this.#e.children])i!==this.#t&&this.#e.removeChild(i);this.#r=[];const t=this.#a(),e=this.#c(),a=this.#l(),s=this.hasAttribute("closable");if(t.forEach((i,n)=>{const o=document.createElement("button");o.type="button",o.className="tc__tab"+(n===e?" is-active":""),o.setAttribute("role","tab"),o.setAttribute("aria-selected",n===e?"true":"false");const l=a||!!i.disabled;o.disabled=l,l&&o.setAttribute("aria-disabled","true"),o.tabIndex=n===e?0:-1;const r=document.createElement("span");if(r.className="tc__label",r.textContent=i.label,o.appendChild(r),i.badge!==void 0&&i.badge!==null&&i.badge!==""){const c=document.createElement("span");c.className="tc__badge",c.textContent=String(i.badge),o.appendChild(c)}if(s){const c=document.createElement("span");c.className="tc__x",c.setAttribute("role","button"),c.setAttribute("aria-label",`Close ${i.label}`),c.innerHTML=D,c.addEventListener("click",u=>{u.stopPropagation(),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0,detail:{value:i.value,index:n}}))}),o.appendChild(c)}o.addEventListener("click",()=>this.#v(n)),this.#e.appendChild(o),this.#r.push(o)}),this.hasAttribute("addable")){const i=document.createElement("button");i.type="button",i.className="tc__add",i.setAttribute("aria-label","New tab"),i.innerHTML=O,i.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("add",{bubbles:!0,composed:!0}))}),this.#e.appendChild(i)}}#m(){const t=this.#c();this.#r.forEach((e,a)=>{const s=a===t;e.classList.toggle("is-active",s),e.setAttribute("aria-selected",s?"true":"false"),e.tabIndex=s?0:-1})}#g(){const t=getComputedStyle(this.#t),e=t.transform;let a=0;if(e&&e!=="none"){const s=e.match(/matrix(?:3d)?\(([^)]+)\)/);if(s){const i=s[1].split(",").map(parseFloat);a=i.length>12?i[12]:i[4]}}return{l:a||0,w:parseFloat(t.width)||0}}#s(t){const e=this.#r[this.#c()];if(!e)return;const a=e.offsetLeft,s=e.offsetWidth;if(!s)return;const i=!this.#b,n=this.#n?.playState==="running",o=parseFloat(this.#t.dataset.x||"NaN")!==a||parseFloat(this.#t.dataset.w||"NaN")!==s;if(n&&!o)return;const l=n?this.#g():null,r=i?a:l?l.l:parseFloat(this.#t.dataset.x||"0"),c=i?s:l?l.w:parseFloat(this.#t.dataset.w||"0");this.#b=!0,this.#t.dataset.x=String(a),this.#t.dataset.w=String(s);const u=(t||n)&&!i&&(r!==a||c!==s)&&!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;if(this.#t.style.width=`${s}px`,this.#t.style.transform=`translate3d(${a}px, 0, 0)`,!u){this.#n?.cancel(),this.#n=null;return}const g=a+s/2>=r+c/2,E=g?v:f,C=g?f:v,x=r+c,N=a+s,L=parseFloat(getComputedStyle(this.#i).getPropertyValue("--r"))*2||16,_=[];for(let h=0;h<m;h++){const w=r+(a-r)*y(E,h),M=x+(N-x)*y(C,h);_.push({offset:h/(m-1),transform:`translate3d(${w.toFixed(2)}px, 0, 0)`,width:`${Math.max(L,M-w).toFixed(2)}px`})}const S=Math.max(.1,this.#p("speed",100)/100);this.#n?.cancel(),this.#n=this.#t.animate?.(_,{duration:Math.round(F/S),easing:"linear",fill:"none"})??null}#v(t){if(this.#l())return;const e=this.#a()[t];!e||e.disabled||e.value===this.value||(this.value=e.value,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.value,index:t}})))}#x(t){if(this.#l()||!["ArrowRight","ArrowDown","ArrowLeft","ArrowUp","Home","End"].includes(t.key))return;const s=this.#a().map((l,r)=>({t:l,i:r})).filter(l=>!l.t.disabled);if(!s.length)return;const i=s.findIndex(l=>l.i===this.#c());let n=-1;if(t.key==="ArrowRight"||t.key==="ArrowDown"?n=(i+1+s.length)%s.length:t.key==="ArrowLeft"||t.key==="ArrowUp"?n=(i-1+s.length)%s.length:t.key==="Home"?n=0:t.key==="End"&&(n=s.length-1),n<0)return;t.preventDefault();const o=s[n].i;this.#v(o),this.#r[o]?.focus()}}customElements.define("vs-tabs-chrome",j);export{j as default};
