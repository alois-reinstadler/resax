const x=`
  :host { display: inline-flex; flex-direction: column; width: 100%; }
  .vpst {
    --h: 10px;
    --fs: 13px;
    --radius: var(--ctrl-r-pill, 999px);
    --accent: var(--ui-accent, #ededed);
    --track: var(--border, #2a2a2a);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    --vpst-speed: 1s;

    display: inline-flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    min-width: 240px;
    font: inherit;
    font-size: var(--fs);
    color: var(--tint);
  }

  .vpst--sm { --h: 6px; --fs: 12px; }
  .vpst--md { --h: 10px; --fs: 13px; }
  .vpst--lg { --h: 14px; --fs: 14px; }

  .vpst__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    line-height: 1;
  }
  .vpst__label { font-weight: 500; }
  .vpst__val { font-variant-numeric: tabular-nums; color: var(--accent); }

  .vpst__track {
    position: relative;
    width: 100%;
    height: var(--h);
    background: var(--track);
    border-radius: var(--radius);
    overflow: hidden;
  }
  /* full-width + compositable translateX; stripes (px) never stretch (no scale) */
  .vpst__bar {
    position: absolute;
    inset: 0 auto 0 0;
    width: 100%;
    height: 100%;
    border-radius: var(--radius);
    background-color: var(--accent);
    background-image: repeating-linear-gradient(
      45deg,
      rgb(255 255 255 / 0.22) 0,
      rgb(255 255 255 / 0.22) 8px,
      transparent 8px,
      transparent 16px
    );
    background-size: 22.6px 22.6px;
    animation: vpst-move var(--vpst-speed) linear infinite;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes vpst-move {
    to { background-position: 22.6px 0; }
  }

  .vpst.is-indeterminate .vpst__bar {
    width: 45%;
    animation:
      vpst-move var(--vpst-speed) linear infinite,
      vpst-slide 1.5s cubic-bezier(0.65, 0.05, 0.36, 1) infinite;
  }
  /* % relative to the bar itself (45% of track): -100% ≡ left:-45%, 222.23% ≡ left:100% */
  @keyframes vpst-slide {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(222.23%); }
  }

  .vpst--t-danger  { --accent: var(--danger,  #ff6369); }
  .vpst--t-warn    { --accent: var(--warn,    #ffb224); }
  .vpst--t-success { --accent: var(--success, #4cc38a); }

  @media (prefers-reduced-motion: reduce) {
    .vpst__bar { animation: none; transition: none; }
  }
`;let d;function y(o){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=o;const s=d.fillStyle;if(s.charAt(0)==="#")return[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];const e=s.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(o,s){const e=s?y(String(s).trim()):null;if(!e){for(const t of _)o.style.removeProperty(t);return}const c=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),a=.2126*c(e[0])+.7152*c(e[1])+.0722*c(e[2])>.45,r=`rgb(${e[0]} ${e[1]} ${e[2]})`,n=e.map(t=>Math.round(a?t*.92:t+(255-t)*.16)),i=(t,p)=>o.style.setProperty(t,p);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(t,r);i("--btn-primary-bg-hover",`rgb(${n[0]} ${n[1]} ${n[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(t,e.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(t,a?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])i(t,a?"0 0 0":"255 255 255");i("--vs-color",r),i("--vs-color-rgb",e.join(" ")),i("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["value","max","size","tone","indeterminate","striped","label","show-value","stripe-speed","color"];#t;#e;#s;#i;#r;#a;#n=!1;constructor(){super();const s=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=x,this.#t=document.createElement("div"),this.#t.className="vpst",this.#e=document.createElement("div"),this.#e.className="vpst__head",this.#s=document.createElement("span"),this.#s.className="vpst__label",this.#i=document.createElement("span"),this.#i.className="vpst__val",this.#e.append(this.#s,this.#i),this.#r=document.createElement("div"),this.#r.className="vpst__track",this.#r.setAttribute("aria-hidden","true"),this.#a=document.createElement("span"),this.#a.className="vpst__bar",this.#r.append(this.#a),this.#t.append(this.#e,this.#r),s.append(e,this.#t)}connectedCallback(){v(this,this.getAttribute("color")),this.hasAttribute("role")||this.setAttribute("role","progressbar"),this.#o()}disconnectedCallback(){}attributeChangedCallback(){v(this,this.getAttribute("color")),this.#t&&this.#o()}get value(){return Number(this.getAttribute("value")??0)}set value(s){this.setAttribute("value",String(s))}#o(){const s=(f,g)=>this.getAttribute(f)??g,e=s("size","md"),c=s("tone","default"),l=Math.max(1,Number(s("max",100))||100),a=Number(s("value",0))||0,r=this.hasAttribute("indeterminate"),n=this.hasAttribute("show-value"),i=s("label",""),t=Math.max(.2,Number(s("stripe-speed",1))||1),p=Math.max(0,Math.min(l,a)),h=p/l*100,m=Math.round(h);this.#t.className=`vpst vpst--${e} vpst--t-${c}`+(r?" is-indeterminate":""),this.#t.style.setProperty("--vpst-speed",`${t}s`);const b=!!i||n;this.#e.style.display=b?"":"none",this.#s.hidden=!i,this.#s.textContent=i,this.#i.hidden=!(n&&!r),this.#i.textContent=`${m}%`,this.#a.style.transform=r?"":`translateX(${h-100}%)`,this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax",String(l)),r?this.removeAttribute("aria-valuenow"):this.setAttribute("aria-valuenow",String(p)),this.setAttribute("aria-label",i||"Progress");const u=!r&&h>=100;u&&!this.#n&&this.dispatchEvent(new CustomEvent("complete",{bubbles:!0,composed:!0,detail:{value:p,max:l}})),this.#n=u}}customElements.define("vs-progress-striped",w);
