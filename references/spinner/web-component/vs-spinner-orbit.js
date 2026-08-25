const f=`
  :host { display: inline-flex; }
  .orbit {
    --sz: 32px;
    --bw: 3px;
    --dur: 1.1s;
    --gap: 10px;
    --fs: 13px;
    --ring: var(--inp-ring, 237 237 237);
    --track: rgb(var(--ring) / 0.1);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    --dot: calc(var(--sz) * 0.19);

    display: inline-flex;
    align-items: center;
    gap: var(--gap);
    color: var(--tint);
    font: inherit;
    font-size: var(--fs);
    font-weight: 500;
    line-height: 1;
    user-select: none;
  }

  .orbit__box {
    position: relative;
    width: var(--sz);
    height: var(--sz);
    flex: 0 0 auto;
  }

  /* faint hairline track — merely hints at the orbit */
  .orbit__track {
    position: absolute;
    inset: calc(var(--dot) / 2);
    border-radius: 999px;
    border: 1.5px solid var(--track);
  }

  /* spinning wrapper; the 3 satellites hang off it evenly spaced */
  .orbit__spin {
    position: absolute;
    inset: calc(var(--dot) / 2);
    animation: orbit-spin var(--dur) linear infinite;
  }

  .orbit__sat {
    position: absolute;
    inset: 0;
  }
  .orbit__sat:nth-child(2) { transform: rotate(120deg); }
  .orbit__sat:nth-child(3) { transform: rotate(240deg); }

  .orbit__dot {
    position: absolute;
    top: calc(var(--dot) / -2);
    left: 50%;
    width: var(--dot);
    height: var(--dot);
    margin-left: calc(var(--dot) / -2);
    border-radius: 999px;
    background: rgb(var(--ring));
    box-shadow: 0 0 calc(var(--dot) * 1.1) rgb(var(--ring) / 0.5);
  }
  /* depth: each satellite a touch fainter → sense of a trail */
  .orbit__sat:nth-child(2) .orbit__dot { opacity: 0.72; }
  .orbit__sat:nth-child(3) .orbit__dot { opacity: 0.44; }

  @keyframes orbit-spin { to { transform: rotate(360deg); } }

  /* sizes */
  .orbit--sm { --sz: 20px; --bw: 2px; --fs: 12px; --gap: 8px; }
  .orbit--md { --sz: 32px; --bw: 3px; --fs: 13px; }
  .orbit--lg { --sz: 44px; --bw: 4px; --fs: 14px; --gap: 12px; }
  .orbit--xl { --sz: 60px; --bw: 5px; --fs: 16px; --gap: 14px; }

  /* speed */
  .orbit--s-slow   { --dur: 1.7s; }
  .orbit--s-normal { --dur: 1.1s; }
  .orbit--s-fast   { --dur: 0.7s; }

  .orbit__label { color: var(--tint); white-space: nowrap; }

  .orbit.is-overlay {
    position: absolute;
    inset: 0;
    flex-direction: column;
    justify-content: center;
    background: rgb(var(--overlay-rgb, 0 0 0) / 0.45);
    backdrop-filter: blur(2px);
    border-radius: inherit;
    z-index: 10;
  }

  /* tones */
  .orbit--t-danger  { --ring: 255 99 105;  --tint: var(--inp-t-danger-hint, #ff8a8e); }
  .orbit--t-warn    { --ring: 255 178 36;  --tint: var(--inp-t-warn-hint, #f5b544); }
  .orbit--t-success { --ring: 76 195 138;  --tint: var(--inp-t-success-hint, #5fd49b); }

  @media (prefers-reduced-motion: reduce) {
    .orbit__spin { animation-duration: 3s; }
  }
`;let b;function g(c){if(b||=document.createElement("canvas").getContext("2d"),!b)return null;b.fillStyle="#000",b.fillStyle=c;const r=b.fillStyle;if(r.charAt(0)==="#")return[parseInt(r.slice(1,3),16),parseInt(r.slice(3,5),16),parseInt(r.slice(5,7),16)];const t=r.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const h=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(c,r){const t=r?g(String(r).trim()):null;if(!t){for(const e of h)c.style.removeProperty(e);return}const o=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),n=.2126*o(t[0])+.7152*o(t[1])+.0722*o(t[2])>.45,a=`rgb(${t[0]} ${t[1]} ${t[2]})`,s=t.map(e=>Math.round(n?e*.92:e+(255-e)*.16)),i=(e,d)=>c.style.setProperty(e,d);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(e,a);i("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(e,n?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])i(e,n?"0 0 0":"255 255 255");i("--vs-color",a),i("--vs-color-rgb",t.join(" ")),i("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class u extends HTMLElement{static observedAttributes=["size","tone","speed","label","overlay","color"];#t;#e;constructor(){super();const r=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=f,this.#t=document.createElement("div"),this.#t.className="orbit",this.#t.setAttribute("role","status"),this.#t.setAttribute("aria-live","polite");const o=document.createElement("span");o.className="orbit__box",o.setAttribute("aria-hidden","true");const l=document.createElement("span");l.className="orbit__track";const n=document.createElement("span");n.className="orbit__spin";for(let a=0;a<3;a++){const s=document.createElement("span");s.className="orbit__sat";const i=document.createElement("i");i.className="orbit__dot",s.append(i),n.append(s)}o.append(l,n),this.#e=document.createElement("span"),this.#e.className="orbit__label",this.#t.append(o),r.append(t,this.#t)}connectedCallback(){p(this,this.getAttribute("color")),this.#r()}disconnectedCallback(){}attributeChangedCallback(){p(this,this.getAttribute("color")),this.#t&&this.#r()}#r(){const r=(s,i)=>this.getAttribute(s)??i,t=r("size","md"),o=r("tone","default"),l=r("speed","normal"),n=r("label",""),a=this.hasAttribute("overlay");this.#t.className=`orbit orbit--${t} orbit--t-${o} orbit--s-${l}${a?" is-overlay":""}`,this.#t.setAttribute("aria-label",n||"Loading"),n?(this.#e.textContent=n,this.#e.isConnected||this.#t.append(this.#e)):this.#e.isConnected&&this.#e.remove()}}customElements.define("vs-spinner-orbit",u);
