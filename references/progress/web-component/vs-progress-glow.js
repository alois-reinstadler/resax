const d=`
  :host { display: block; width: 100%; }
  .vpgl {
    --h: 10px;
    --fs: 13px;
    --radius: var(--ctrl-r-pill, 999px);
    --accent: var(--ui-accent, #ededed);
    --track: var(--border, #2a2a2a);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    --vpgl-int: 0.6;

    display: inline-flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    min-width: 240px;
    font: inherit;
    font-size: var(--fs);
    color: var(--tint);
  }

  .vpgl--sm { --h: 6px; --fs: 12px; }
  .vpgl--md { --h: 10px; --fs: 13px; }
  .vpgl--lg { --h: 14px; --fs: 14px; }

  .vpgl__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    line-height: 1;
  }
  .vpgl__head[hidden] { display: none; }
  .vpgl__label { font-weight: 500; }
  .vpgl__label:empty { display: none; }
  .vpgl__val { font-variant-numeric: tabular-nums; color: var(--accent); }
  .vpgl__val[hidden] { display: none; }

  .vpgl__track {
    position: relative;
    width: 100%;
    height: var(--h);
    background: var(--track);
    border-radius: var(--radius);
    overflow: hidden;
  }
  /* full-width bar revealed by translateX (compositable); glow = box-shadow halo
     living on the bar, which is position:absolute → out of flow. --p lets the
     spark hug the visible area of the fill. */
  .vpgl__bar {
    position: absolute;
    inset: 0 auto 0 0;
    width: 100%;
    height: 100%;
    border-radius: var(--radius);
    background: var(--accent);
    overflow: hidden;
    box-shadow:
      0 0 calc(8px * var(--vpgl-int)) color-mix(in srgb, var(--accent) 90%, transparent),
      0 0 calc(18px * var(--vpgl-int)) color-mix(in srgb, var(--accent) 60%, transparent);
    animation: vpgl-pulse 1.8s ease-in-out infinite;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes vpgl-pulse {
    0%, 100% { filter: brightness(1); }
    50%      { filter: brightness(1.25); }
  }

  .vpgl__spark {
    position: absolute;
    top: 0;
    bottom: 0;
    /* visible area of the fill: starts where the bar enters the track and spans 40% of it,
       like when the bar had a dynamic width (indeterminate: --p=1 → same as before) */
    left: calc((1 - var(--p, 1)) * 100%);
    width: calc(40% * var(--p, 1));
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgb(255 255 255 / 0.55),
      transparent
    );
    animation: vpgl-sweep 2.2s ease-in-out infinite;
  }
  @keyframes vpgl-sweep {
    0%   { transform: translateX(-120%); }
    100% { transform: translateX(320%); }
  }

  .vpgl.is-indeterminate .vpgl__bar {
    width: 45%;
    animation:
      vpgl-pulse 1.8s ease-in-out infinite,
      vpgl-slide 1.5s cubic-bezier(0.65, 0.05, 0.36, 1) infinite;
  }
  /* % are relative to the bar itself (45% of track): -100% ≡ left:-45%, 222.23% ≡ left:100% */
  @keyframes vpgl-slide {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(222.23%); }
  }

  .vpgl--t-danger  { --accent: var(--danger,  #ff6369); }
  .vpgl--t-warn    { --accent: var(--warn,    #ffb224); }
  .vpgl--t-success { --accent: var(--success, #4cc38a); }

  @media (prefers-reduced-motion: reduce) {
    .vpgl__bar { animation: none; transition: none; }
    .vpgl__spark { animation: none; display: none; }
  }
`;let p;function v(c){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=c;const e=p.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function g(c,e){const t=e?v(String(e).trim()):null;if(!t){for(const a of m)c.style.removeProperty(a);return}const i=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),n=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(a=>Math.round(n?a*.92:a+(255-a)*.16)),r=(a,h)=>c.style.setProperty(a,h);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(a,l);r("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(a,t.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(a,n?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])r(a,n?"0 0 0":"255 255 255");r("--vs-color",l),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class b extends HTMLElement{static observedAttributes=["value","max","size","tone","indeterminate","label","show-value","glow-intensity","color"];#e;#a;#r;#i;#t;#n=!1;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=d,this.#e=document.createElement("div"),this.#e.className="vpgl",this.#a=document.createElement("div"),this.#a.className="vpgl__head",this.#r=document.createElement("span"),this.#r.className="vpgl__label",this.#i=document.createElement("span"),this.#i.className="vpgl__val",this.#a.append(this.#r,this.#i);const i=document.createElement("div");i.className="vpgl__track",i.setAttribute("aria-hidden","true"),this.#t=document.createElement("span"),this.#t.className="vpgl__bar";const s=document.createElement("span");s.className="vpgl__spark",this.#t.append(s),i.append(this.#t),this.#e.append(this.#a,i),e.append(t,this.#e)}connectedCallback(){g(this,this.getAttribute("color")),this.hasAttribute("role")||this.setAttribute("role","progressbar"),this.#s()}disconnectedCallback(){}attributeChangedCallback(){g(this,this.getAttribute("color")),this.#t&&this.#s()}get value(){return Number(this.getAttribute("value"))||0}set value(e){this.setAttribute("value",String(e))}get max(){const e=Number(this.getAttribute("max"));return e>0?e:100}set max(e){this.setAttribute("max",String(e))}#s(){const e=(a,h)=>this.getAttribute(a)??h,t=this.hasAttribute("indeterminate"),i=this.max,s=this.value,n=Math.max(0,Math.min(100,s/i*100));this.#e.className=`vpgl vpgl--${e("size","md")} vpgl--t-${e("tone","default")}`+(t?" is-indeterminate":""),this.#e.style.setProperty("--vpgl-int",String(Math.max(0,Math.min(1,Number(e("glow-intensity",.6))||0)))),t?(this.#t.style.transform="",this.#t.style.removeProperty("--p")):(this.#t.style.transform=`translateX(${n-100}%)`,this.#t.style.setProperty("--p",String(n/100)));const l=e("label",""),o=this.hasAttribute("show-value")&&!t;this.#r.textContent=l,this.#i.textContent=`${Math.round(n)}%`,this.#i.hidden=!o,this.#a.style.display=!l&&!o?"none":"",this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax",String(i)),this.setAttribute("aria-label",l||"Progress"),t?this.removeAttribute("aria-valuenow"):this.setAttribute("aria-valuenow",String(Math.max(0,Math.min(i,s))));const r=!t&&n>=100;r&&!this.#n&&this.dispatchEvent(new CustomEvent("complete",{bubbles:!0,composed:!0})),this.#n=r}}customElements.define("vs-progress-glow",b);
