const m=2*Math.PI*45,S=`
  :host { display: inline-flex; flex-direction: column; width: 100%; }
  /* class-level display (ring inline-flex, ring-val grid) beats the UA [hidden]
     rule, so hidden nodes stayed visible — force it back off explicitly. */
  [hidden] { display: none !important; }
  .prog {
    --bw: 8px;            /* bar / ring thickness */
    --h: 8px;             /* linear track height */
    --sz: 48px;           /* circular diameter */
    --fs: 13px;
    --dur: 1.4s;
    --radius: 999px;
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 237 237 237);     /* space-separated rgb */
    --track: rgb(var(--ring) / 0.16);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));

    display: inline-flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    font: inherit;
    font-size: var(--fs);
    color: var(--tint);
  }

  .prog--v-linear { min-width: 240px; }
  .prog--v-circular { width: auto; min-width: 0; }

  /* ── header ──────────────────────────────────────────────── */
  .prog__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    line-height: 1;
  }
  .prog__label { font-weight: 500; }
  .prog__val { font-variant-numeric: tabular-nums; color: rgb(var(--ring)); }

  /* ── sizes ───────────────────────────────────────────────── */
  .prog--sm { --h: 5px; --bw: 5px; --sz: 36px; --fs: 12px; }
  .prog--md { --h: 8px; --bw: 8px; --sz: 48px; --fs: 13px; }
  .prog--lg { --h: 12px; --bw: 11px; --sz: 64px; --fs: 14px; }

  /* ── linear ──────────────────────────────────────────────── */
  .prog__track {
    position: relative;
    width: 100%;
    height: var(--h);
    background: var(--track);
    border-radius: var(--radius);
    overflow: hidden;
  }
  /* fill/buffer: fixed 100% width + compositable translateX (no per-frame width).
     The rounded cap never deforms (no scale) and the track clips with overflow:hidden. */
  .prog__bar {
    position: absolute;
    inset: 0 auto 0 0;
    width: 100%;
    height: 100%;
    background: rgb(var(--ring));
    border-radius: var(--radius);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .prog__buffer {
    position: absolute;
    inset: 0 auto 0 0;
    width: 100%;
    height: 100%;
    background: rgb(var(--ring) / 0.3);
    border-radius: var(--radius);
    transition: transform 0.45s ease;
  }

  /* striped */
  .prog.is-striped .prog__bar {
    background-image: linear-gradient(
      45deg,
      rgb(255 255 255 / 0.18) 25%,
      transparent 25%,
      transparent 50%,
      rgb(255 255 255 / 0.18) 50%,
      rgb(255 255 255 / 0.18) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
    animation: prog-stripes 1s linear infinite;
  }
  @keyframes prog-stripes {
    to { background-position: 1rem 0; }
  }

  /* indeterminate linear */
  .prog.is-indeterminate .prog__bar {
    width: 40%;
    animation: prog-slide var(--dur) cubic-bezier(0.65, 0.05, 0.36, 1) infinite;
  }
  /* % are relative to the bar itself (40% of track): -100% ≡ left:-40%, 250% ≡ left:100% */
  @keyframes prog-slide {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(250%); }
  }

  /* ── circular ────────────────────────────────────────────── */
  .prog__ring {
    position: relative;
    display: inline-flex;
    width: var(--sz);
    height: var(--sz);
  }
  .prog__ring svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  .prog__ring circle {
    fill: none;
    stroke-width: var(--bw);
  }
  .prog__ring-track { stroke: var(--track); }
  .prog__ring-bar {
    stroke: rgb(var(--ring));
    stroke-linecap: round;
    transition: stroke-dashoffset 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .prog__ring-val {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: calc(var(--fs) - 1px);
    font-variant-numeric: tabular-nums;
    color: rgb(var(--ring));
  }

  /* indeterminate circular */
  .prog.is-indeterminate .prog__ring svg {
    animation: prog-rotate var(--dur) linear infinite;
  }
  .prog.is-indeterminate .prog__ring-bar {
    stroke-dasharray: 70 212;
  }
  @keyframes prog-rotate {
    to { transform: rotate(270deg); }
  }

  /* ── tones — recolor the ring ────────────────────────────── */
  .prog--t-danger  { --ring: 255 99 105; }
  .prog--t-warn    { --ring: 255 178 36; }
  .prog--t-success { --ring: 76 195 138; }

  @media (prefers-reduced-motion: reduce) {
    .prog.is-indeterminate .prog__bar,
    .prog.is-indeterminate .prog__ring svg,
    .prog.is-striped .prog__bar { animation-duration: 3s; }
    .prog__bar, .prog__ring-bar { transition: none; }
  }
`,f="http://www.w3.org/2000/svg";let g;function z(l){if(g||=document.createElement("canvas").getContext("2d"),!g)return null;g.fillStyle="#000",g.fillStyle=l;const r=g.fillStyle;if(r.charAt(0)==="#")return[parseInt(r.slice(1,3),16),parseInt(r.slice(3,5),16),parseInt(r.slice(5,7),16)];const t=r.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const $=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function w(l,r){const t=r?z(String(r).trim()):null;if(!t){for(const e of $)l.style.removeProperty(e);return}const a=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),s=.2126*a(t[0])+.7152*a(t[1])+.0722*a(t[2])>.45,h=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(e=>Math.round(s?e*.92:e+(255-e)*.16)),i=(e,c)=>l.style.setProperty(e,c);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(e,h);i("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(e,s?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])i(e,s?"0 0 0":"255 255 255");i("--vs-color",h),i("--vs-color-rgb",t.join(" ")),i("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class C extends HTMLElement{static observedAttributes=["variant","value","max","buffer","indeterminate","size","tone","thickness","striped","label","show-value","color"];#e;#s;#a;#n;#r;#c;#o;#i;#t;#l;#p=!1;constructor(){super();const r=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=S,this.#e=document.createElement("div"),this.#e.className="prog",this.#s=document.createElement("div"),this.#s.className="prog__head",this.#a=document.createElement("span"),this.#a.className="prog__label",this.#n=document.createElement("span"),this.#n.className="prog__val",this.#s.append(this.#a,this.#n),this.#r=document.createElement("div"),this.#r.className="prog__track",this.#r.setAttribute("aria-hidden","true"),this.#o=document.createElement("span"),this.#o.className="prog__buffer",this.#c=document.createElement("span"),this.#c.className="prog__bar",this.#r.append(this.#o,this.#c),this.#i=document.createElement("span"),this.#i.className="prog__ring",this.#i.setAttribute("aria-hidden","true");const a=document.createElementNS(f,"svg");a.setAttribute("viewBox","0 0 100 100");const n=document.createElementNS(f,"circle");n.setAttribute("class","prog__ring-track"),n.setAttribute("cx","50"),n.setAttribute("cy","50"),n.setAttribute("r","45"),this.#t=document.createElementNS(f,"circle"),this.#t.setAttribute("class","prog__ring-bar"),this.#t.setAttribute("cx","50"),this.#t.setAttribute("cy","50"),this.#t.setAttribute("r","45"),a.append(n,this.#t),this.#l=document.createElement("span"),this.#l.className="prog__ring-val",this.#i.append(a,this.#l),this.#e.append(this.#s,this.#r,this.#i),r.append(t,this.#e)}connectedCallback(){w(this,this.getAttribute("color")),this.hasAttribute("role")||this.setAttribute("role","progressbar"),this.#g()}disconnectedCallback(){}attributeChangedCallback(){w(this,this.getAttribute("color")),this.#e&&this.#g()}get value(){return Number(this.getAttribute("value")??0)}set value(r){this.setAttribute("value",String(r))}#g(){const r=(N,E)=>this.getAttribute(N)??E,t=r("variant","linear"),a=r("size","md"),n=r("tone","default"),s=Math.max(1,Number(r("max",100))||100),h=Number(r("value",0))||0,o=Number(r("buffer",0))||0,i=this.hasAttribute("indeterminate"),e=this.hasAttribute("striped"),c=this.hasAttribute("show-value"),d=r("label",""),v=Number(r("thickness",0))||0,u=Math.max(0,Math.min(s,h)),p=u/s*100,k=Math.max(p,Math.min(100,o/s*100)),_=Math.round(p),y=o>0&&!i;this.#e.className=`prog prog--${a} prog--v-${t} prog--t-${n}`+(i?" is-indeterminate":"")+(e&&!i?" is-striped":"")+(y?" has-buffer":""),v>0?this.#e.style.setProperty("--bw",`${v}px`):this.#e.style.removeProperty("--bw");const A=!!d||c;this.#s.style.display=A?"":"none",this.#a.hidden=!d,this.#a.textContent=d,this.#n.hidden=!(c&&!i),this.#n.textContent=`${_}%`;const b=t==="linear";this.#r.hidden=!b,this.#i.hidden=b,b?(this.#c.style.transform=i?"":`translateX(${p-100}%)`,this.#o.hidden=!y,this.#o.style.transform=`translateX(${k-100}%)`):(i?(this.#t.style.strokeDasharray="",this.#t.style.strokeDashoffset=""):(this.#t.style.strokeDasharray=`${m}`,this.#t.style.strokeDashoffset=`${m-p/100*m}`),this.#l.style.display=c&&!i?"":"none",this.#l.textContent=`${_}%`),this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax",String(s)),i?this.removeAttribute("aria-valuenow"):this.setAttribute("aria-valuenow",String(u)),this.setAttribute("aria-label",d||"Progress");const x=!i&&p>=100;x&&!this.#p&&this.dispatchEvent(new CustomEvent("complete",{bubbles:!0,composed:!0,detail:{value:u,max:s}})),this.#p=x}}customElements.define("vs-progress",C);
