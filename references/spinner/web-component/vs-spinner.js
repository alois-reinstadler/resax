const b=`
  :host { display: inline-flex; }
  :host([overlay]) { position: absolute; inset: 0; display: flex; }

  .spinner {
    /* size base */
    --sz: 32px;
    --bw: 3px;          /* arc / bar thickness */
    --dur: 0.9s;        /* speed */
    --gap: 10px;
    --fs: 13px;
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 237 237 237); /* space-separated rgb → rgb(var(--ring)/a) */
    --track: rgb(var(--ring) / 0.16);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));

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

  .spinner__box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sz);
    height: var(--sz);
    flex: 0 0 auto;
  }

  /* ── sizes ───────────────────────────────────────────────────── */
  .spinner--sm { --sz: 20px; --bw: 2px; --fs: 12px; --gap: 8px; }
  .spinner--md { --sz: 32px; --bw: 3px; --fs: 13px; }
  .spinner--lg { --sz: 44px; --bw: 4px; --fs: 14px; --gap: 12px; }
  .spinner--xl { --sz: 60px; --bw: 5px; --fs: 16px; --gap: 14px; }

  /* ── speed ───────────────────────────────────────────────────── */
  .spinner--s-slow   { --dur: 1.4s; }
  .spinner--s-normal { --dur: 0.9s; }
  .spinner--s-fast   { --dur: 0.55s; }

  @keyframes spinner-spin {
    to { transform: rotate(360deg); }
  }

  /* ── arc: a single arc over a faint track ────────────────────── */
  .spinner__arc {
    width: 100%;
    height: 100%;
    border-radius: 999px;
    border: var(--bw) solid var(--track);
    border-top-color: rgb(var(--ring));
    animation: spinner-spin var(--dur) linear infinite;
  }

  /* ── dual: two stacked arcs (linear + eased opacity .5) ──────── */
  .spinner__dual {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .spinner__dual .spinner__arc {
    position: absolute;
    inset: 0;
  }
  .spinner__arc--lin { animation-timing-function: linear; }
  .spinner__arc--ease {
    opacity: 0.5;
    animation-timing-function: cubic-bezier(0.65, 0.1, 0.35, 0.9);
  }

  /* ── gradient: conic sweep with a fading tail ────────────────── */
  .spinner__grad {
    width: 100%;
    height: 100%;
    border-radius: 999px;
    /* ring: conic gradient clipped to the thickness with a mask */
    background: conic-gradient(from 0deg, transparent 0%, rgb(var(--ring)) 100%);
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - var(--bw)), #000 calc(100% - var(--bw)));
    mask: radial-gradient(farthest-side, transparent calc(100% - var(--bw)), #000 calc(100% - var(--bw)));
    animation: spinner-spin var(--dur) linear infinite;
  }

  /* no background ring: only the spinning arc */
  .spinner.no-track { --track: transparent; }

  .spinner__label { color: var(--tint); white-space: nowrap; }

  /* ── overlay: covers the parent container (host: position:absolute) ─ */
  .spinner.is-overlay {
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    background: rgb(var(--overlay-rgb, 0 0 0) / 0.45);
    backdrop-filter: blur(2px);
    border-radius: inherit;
  }

  /* ── tones — recolor ring/track + label ──────────────────────── */
  .spinner--t-danger  { --ring: 255 99 105;  --tint: var(--inp-t-danger-hint, #ff8a8e); }
  .spinner--t-warn    { --ring: 255 178 36;  --tint: var(--inp-t-warn-hint, #f5b544); }
  .spinner--t-success { --ring: 76 195 138;  --tint: var(--inp-t-success-hint, #5fd49b); }

  @media (prefers-reduced-motion: reduce) {
    .spinner__arc,
    .spinner__dual,
    .spinner__grad { animation-duration: 2.4s; }
  }
`;let c;function u(s){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=s;const n=c.fillStyle;if(n.charAt(0)==="#")return[parseInt(n.slice(1,3),16),parseInt(n.slice(3,5),16),parseInt(n.slice(5,7),16)];const t=n.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(s,n){const t=n?u(String(n).trim()):null;if(!t){for(const e of f)s.style.removeProperty(e);return}const a=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),i=.2126*a(t[0])+.7152*a(t[1])+.0722*a(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(e=>Math.round(i?e*.92:e+(255-e)*.16)),r=(e,p)=>s.style.setProperty(e,p);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(e,l);r("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(e,i?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])r(e,i?"0 0 0":"255 255 255");r("--vs-color",l),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["size","tone","speed","thickness","variant","track","label","overlay","color"];#t;#e;#i;#r;#a;#o;#s;#n;constructor(){super();const n=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=b,this.#t=document.createElement("div"),this.#t.className="spinner",this.#t.setAttribute("role","status"),this.#t.setAttribute("aria-live","polite"),this.#e=document.createElement("span"),this.#e.className="spinner__box",this.#e.setAttribute("aria-hidden","true"),this.#i=document.createElement("span"),this.#i.className="spinner__arc",this.#r=document.createElement("span"),this.#r.className="spinner__dual",this.#a=document.createElement("span"),this.#a.className="spinner__arc spinner__arc--lin",this.#o=document.createElement("span"),this.#o.className="spinner__arc spinner__arc--ease",this.#r.append(this.#a,this.#o),this.#s=document.createElement("span"),this.#s.className="spinner__grad",this.#e.append(this.#i,this.#r,this.#s),this.#n=document.createElement("span"),this.#n.className="spinner__label",this.#n.style.display="none",this.#t.append(this.#e,this.#n),n.append(t,this.#t)}connectedCallback(){h(this,this.getAttribute("color")),this.#c()}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#t&&this.#c()}disconnectedCallback(){}#c(){const n=(p,g)=>this.getAttribute(p)??g,t=n("variant","arc"),a=n("size","md"),d=n("tone","default"),i=n("speed","normal"),l=n("track","true")!=="false",o=this.hasAttribute("overlay"),r=n("label","");this.#t.className=`spinner spinner--${a} spinner--v-${t} spinner--t-${d} spinner--s-${i}`+(o?" is-overlay":"")+(l?"":" no-track");const e=Number(this.getAttribute("thickness"))||0;e>0?this.#e.style.setProperty("--bw",`${e}px`):this.#e.style.removeProperty("--bw"),this.#i.style.display=t==="arc"?"":"none",this.#r.style.display=t==="dual"?"":"none",this.#s.style.display=t==="gradient"?"":"none",this.#t.setAttribute("aria-label",r||"Loading"),this.#n.style.display=r?"":"none",r&&(this.#n.textContent=r)}}customElements.define("vs-spinner",m);
