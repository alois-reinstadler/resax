const h=`
  :host { display: block; width: 100%; }
  .vpgr {
    --h: 10px;
    --fs: 13px;
    --radius: var(--ctrl-r-pill, 999px);
    --accent: var(--ui-accent, #ededed);
    --track: var(--border, #2a2a2a);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    --g1: var(--ui-accent, #ededed);
    --g2: color-mix(in srgb, var(--ui-accent, #ededed) 55%, #ffffff);
    --vpgr-speed: 3s;

    display: inline-flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    min-width: 240px;
    font: inherit;
    font-size: var(--fs);
    color: var(--tint);
  }

  .vpgr--sm { --h: 6px; --fs: 12px; }
  .vpgr--md { --h: 10px; --fs: 13px; }
  .vpgr--lg { --h: 14px; --fs: 14px; }

  .vpgr__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    line-height: 1;
  }
  .vpgr__head[hidden] { display: none; }
  .vpgr__label { font-weight: 500; }
  .vpgr__label:empty { display: none; }
  .vpgr__val { font-variant-numeric: tabular-nums; color: var(--accent); }
  .vpgr__val[hidden] { display: none; }

  .vpgr__track {
    position: relative;
    width: 100%;
    height: var(--h);
    background: var(--track);
    border-radius: var(--radius);
    overflow: hidden;
  }
  /* full-width + compositable translateX; the gradient never warps (no scale) */
  .vpgr__bar {
    position: absolute;
    inset: 0 auto 0 0;
    width: 100%;
    height: 100%;
    border-radius: var(--radius);
    background: linear-gradient(90deg, var(--g1), var(--g2), var(--g1));
    background-size: 200% 100%;
    animation: vpgr-flow var(--vpgr-speed) linear infinite;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes vpgr-flow {
    to { background-position: -200% 0; }
  }

  .vpgr.is-indeterminate .vpgr__bar {
    width: 45%;
    animation:
      vpgr-flow var(--vpgr-speed) linear infinite,
      vpgr-slide 1.5s cubic-bezier(0.65, 0.05, 0.36, 1) infinite;
  }
  /* % relative to the bar itself (45% of track): -100% ≡ left:-45%, 222.23% ≡ left:100% */
  @keyframes vpgr-slide {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(222.23%); }
  }

  .vpgr--t-danger  { --accent: var(--danger,  #ff6369); }
  .vpgr--t-warn    { --accent: var(--warn,    #ffb224); }
  .vpgr--t-success { --accent: var(--success, #4cc38a); }

  @media (prefers-reduced-motion: reduce) {
    .vpgr__bar { animation: none; transition: none; }
  }
`;let c;function v(l){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=l;const e=c.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const u=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function g(l,e){const t=e?v(String(e).trim()):null;if(!t){for(const r of u)l.style.removeProperty(r);return}const a=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),n=.2126*a(t[0])+.7152*a(t[1])+.0722*a(t[2])>.45,s=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(r=>Math.round(n?r*.92:r+(255-r)*.16)),i=(r,d)=>l.style.setProperty(r,d);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(r,s);i("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(r,n?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])i(r,n?"0 0 0":"255 255 255");i("--vs-color",s),i("--vs-color-rgb",t.join(" ")),i("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class f extends HTMLElement{static observedAttributes=["value","max","size","tone","indeterminate","label","show-value","flow-speed","color"];#t;#e;#i;#r;#a;#n=!1;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=h,this.#t=document.createElement("div"),this.#t.className="vpgr",this.#e=document.createElement("div"),this.#e.className="vpgr__head",this.#i=document.createElement("span"),this.#i.className="vpgr__label",this.#r=document.createElement("span"),this.#r.className="vpgr__val",this.#e.append(this.#i,this.#r);const a=document.createElement("div");a.className="vpgr__track",a.setAttribute("aria-hidden","true"),this.#a=document.createElement("span"),this.#a.className="vpgr__bar",a.append(this.#a),this.#t.append(this.#e,a),e.append(t,this.#t)}connectedCallback(){g(this,this.getAttribute("color")),this.hasAttribute("role")||this.setAttribute("role","progressbar"),this.#s()}attributeChangedCallback(){g(this,this.getAttribute("color")),this.#a&&this.#s()}get value(){return Number(this.getAttribute("value"))||0}set value(e){this.setAttribute("value",String(e))}get max(){const e=Number(this.getAttribute("max"));return e>0?e:100}set max(e){this.setAttribute("max",String(e))}#s(){const e=(r,d)=>this.getAttribute(r)??d,t=this.hasAttribute("indeterminate"),a=this.max,p=this.value,n=Math.max(0,Math.min(100,p/a*100));this.#t.className=`vpgr vpgr--${e("size","md")} vpgr--t-${e("tone","default")}`+(t?" is-indeterminate":""),this.#t.style.setProperty("--vpgr-speed",`${Math.max(.4,Number(e("flow-speed",3))||3)}s`),this.#a.style.transform=t?"":`translateX(${n-100}%)`;const s=e("label",""),o=this.hasAttribute("show-value")&&!t;this.#i.textContent=s,this.#r.textContent=`${Math.round(n)}%`,this.#r.hidden=!o,this.#e.style.display=!s&&!o?"none":"",this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax",String(a)),this.setAttribute("aria-label",s||"Progress"),t?this.removeAttribute("aria-valuenow"):this.setAttribute("aria-valuenow",String(Math.max(0,Math.min(a,p))));const i=!t&&n>=100;i&&!this.#n&&this.dispatchEvent(new CustomEvent("complete",{bubbles:!0,composed:!0})),this.#n=i}}customElements.define("vs-progress-gradient",f);
