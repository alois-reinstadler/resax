const k=`
  :host { display: inline-flex; }
  .vpci {
    --sz: 56px;
    --bw: 8px;
    --fs: 13px;
    --accent: var(--ui-accent, #ededed);
    --track: var(--border, #2a2a2a);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font: inherit;
    font-size: var(--fs);
    color: var(--tint);
  }
  .vpci--sm { --sz: 40px; --bw: 6px;  --fs: 12px; }
  .vpci--md { --sz: 56px; --bw: 8px;  --fs: 13px; }
  .vpci--lg { --sz: 76px; --bw: 11px; --fs: 14px; }

  .vpci__ring {
    position: relative;
    width: var(--sz);
    height: var(--sz);
  }
  .vpci__svg {
    display: block;
    width: 100%;
    height: 100%;
    /* start the arc at 12 o'clock */
    transform: rotate(-90deg);
    transform-origin: center;
  }
  .vpci__track { fill: none; stroke: var(--track); }
  .vpci__bar {
    fill: none;
    stroke: var(--accent);
    stroke-linecap: round;
    transition: stroke-dashoffset 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .vpci__val {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: calc(var(--fs) - 1px);
    font-variant-numeric: tabular-nums;
    color: var(--accent);
  }
  .vpci__label { font-weight: 500; }

  /* indeterminate: fixed quarter arc that spins */
  .vpci.is-indeterminate .vpci__svg { animation: vpci-spin 1s linear infinite; }
  .vpci.is-indeterminate .vpci__bar { transition: none; }
  @keyframes vpci-spin { to { transform: rotate(270deg); } }

  .vpci--t-danger  { --accent: var(--danger,  #ff6369); }
  .vpci--t-warn    { --accent: var(--warn,    #ffb224); }
  .vpci--t-success { --accent: var(--success, #4cc38a); }

  @media (prefers-reduced-motion: reduce) {
    .vpci__bar { transition: none; }
    .vpci.is-indeterminate .vpci__svg { animation: none; }
  }
`,m="http://www.w3.org/2000/svg",w={sm:{sz:40,bw:6},md:{sz:56,bw:8},lg:{sz:76,bw:11}};let u;function S(p){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=p;const i=u.fillStyle;if(i.charAt(0)==="#")return[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)];const e=i.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const z=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function _(p,i){const e=i?S(String(i).trim()):null;if(!e){for(const t of z)p.style.removeProperty(t);return}const r=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),c=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(t=>Math.round(c?t*.92:t+(255-t)*.16)),s=(t,b)=>p.style.setProperty(t,b);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(t,n);s("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(t,e.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(t,c?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])s(t,c?"0 0 0":"255 255 255");s("--vs-color",n),s("--vs-color-rgb",e.join(" ")),s("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class E extends HTMLElement{static observedAttributes=["value","max","size","tone","thickness","indeterminate","show-value","show-label","label","color"];#t;#e;#n;#i;#s;#r;#a=0;#c=!1;constructor(){super();const i=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=k,this.#t=document.createElement("div"),this.#t.className="vpci",this.#t.setAttribute("role","progressbar"),this.#t.setAttribute("aria-valuemin","0");const r=document.createElement("div");r.className="vpci__ring",this.#e=document.createElementNS(m,"svg"),this.#e.setAttribute("class","vpci__svg"),this.#e.setAttribute("aria-hidden","true"),this.#n=document.createElementNS(m,"circle"),this.#n.setAttribute("class","vpci__track"),this.#i=document.createElementNS(m,"circle"),this.#i.setAttribute("class","vpci__bar"),this.#e.append(this.#n,this.#i),this.#s=document.createElement("span"),this.#s.className="vpci__val",this.#s.setAttribute("aria-hidden","true"),r.append(this.#e,this.#s),this.#r=document.createElement("span"),this.#r.className="vpci__label",this.#t.append(r,this.#r),i.append(e,this.#t)}connectedCallback(){_(this,this.getAttribute("color")),this.#o()}attributeChangedCallback(){_(this,this.getAttribute("color")),this.#t&&this.#o()}disconnectedCallback(){}get value(){return Number(this.getAttribute("value"))||0}set value(i){this.setAttribute("value",String(i))}#o(){const i=(l,A)=>this.getAttribute(l)??A,e=i("size","md"),r=i("tone","default"),a=this.hasAttribute("indeterminate")&&i("indeterminate","true")!=="false",c=this.hasAttribute("show-value")&&i("show-value","true")!=="false",n=i("label",""),o=w[e]||w.md,s=o.sz,t=Math.max(1,Number(this.getAttribute("thickness"))||o.bw),b=(s-t)/2,d=s/2;this.#a=2*Math.PI*b,this.#t.className=`vpci vpci--${e} vpci--t-${r}`+(a?" is-indeterminate":""),this.#t.setAttribute("aria-label",n||"Progress");const h=Math.max(1,Number(i("max","100"))||100),v=Math.max(0,Math.min(h,Number(i("value","0"))||0)),f=v/h;this.#e.setAttribute("viewBox",`0 0 ${s} ${s}`);for(const l of[this.#n,this.#i])l.setAttribute("cx",d),l.setAttribute("cy",d),l.setAttribute("r",b),l.setAttribute("stroke-width",t);this.#i.setAttribute("stroke-dasharray",this.#a);const y=a?.25:f;this.#i.setAttribute("stroke-dashoffset",this.#a*(1-y)),this.#t.setAttribute("aria-valuemax",String(h)),a?this.#t.removeAttribute("aria-valuenow"):this.#t.setAttribute("aria-valuenow",String(v));const g=c&&!a;this.#s.style.display=g?"":"none",g&&(this.#s.textContent=`${Math.round(f*100)}%`),this.#r.style.display=n?"":"none",n&&(this.#r.textContent=n);const x=!a&&v>=h;x&&!this.#c&&this.dispatchEvent(new CustomEvent("complete",{bubbles:!0,composed:!0,detail:{value:v,max:h}})),this.#c=x}}customElements.define("vs-progress-circular",E);
