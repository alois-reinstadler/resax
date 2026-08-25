const b=`
  :host { display: inline-flex; }
  .comet { --sz:32px; --bw:3px; --dur:0.9s; --gap:10px; --fs:13px;
    --ring:var(--inp-ring,237 237 237); --tint:var(--text-secondary,#a1a1a1); --head:calc(var(--bw)*1.5);
    display:inline-flex; align-items:center; gap:var(--gap); color:var(--tint);
    font:inherit; font-size:var(--fs); font-weight:500; line-height:1; user-select:none; }
  .comet__box{ position:relative; width:var(--sz); height:var(--sz); flex:0 0 auto; }
  .comet__spin{ position:absolute; inset:0; animation:comet-spin var(--dur) linear infinite; }
  /* trail: conic sweep clipped to the stroke width with a radial mask */
  .comet__trail{ position:absolute; inset:0; border-radius:999px;
    background:conic-gradient(from 0deg, transparent 0%, rgb(var(--ring)/.04) 35%, rgb(var(--ring)) 100%);
    -webkit-mask:radial-gradient(farthest-side, transparent calc(100% - var(--bw)), #000 calc(100% - var(--bw)));
    mask:radial-gradient(farthest-side, transparent calc(100% - var(--bw)), #000 calc(100% - var(--bw))); }
  /* glowing head at the top edge (leading edge of the trail) */
  .comet__head{ position:absolute; top:calc(var(--bw)/2 - var(--head)/2); left:calc(50% - var(--head)/2);
    width:var(--head); height:var(--head); border-radius:999px; background:rgb(var(--ring));
    box-shadow:0 0 calc(var(--head)*2) rgb(var(--ring)/.7); }
  @keyframes comet-spin{ to{ transform:rotate(360deg); } }
  /* sizes */
  .comet--sm{ --sz:20px; --bw:2px; --fs:12px; --gap:8px; }
  .comet--md{ --sz:32px; --bw:3px; --fs:13px; }
  .comet--lg{ --sz:44px; --bw:4px; --fs:14px; --gap:12px; }
  .comet--xl{ --sz:60px; --bw:5px; --fs:16px; --gap:14px; }
  /* speed */
  .comet--s-slow{ --dur:1.4s; } .comet--s-normal{ --dur:0.9s; } .comet--s-fast{ --dur:0.55s; }
  .comet__label{ color:var(--tint); white-space:nowrap; }
  .comet__label:empty{ display:none; }
  .comet.is-overlay{ position:absolute; inset:0; flex-direction:column; justify-content:center;
    background:rgb(var(--overlay-rgb,0 0 0)/.45); backdrop-filter:blur(2px); border-radius:inherit; z-index:10; }
  /* tones */
  .comet--t-danger{ --ring:255 99 105; --tint:var(--inp-t-danger-hint,#ff8a8e); }
  .comet--t-warn{ --ring:255 178 36; --tint:var(--inp-t-warn-hint,#f5b544); }
  .comet--t-success{ --ring:76 195 138; --tint:var(--inp-t-success-hint,#5fd49b); }
  @media (prefers-reduced-motion:reduce){ .comet__spin{ animation-duration:2.6s; } }
`;let c;function g(o){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=o;const r=c.fillStyle;if(r.charAt(0)==="#")return[parseInt(r.slice(1,3),16),parseInt(r.slice(3,5),16),parseInt(r.slice(5,7),16)];const t=r.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(o,r){const t=r?g(String(r).trim()):null;if(!t){for(const e of f)o.style.removeProperty(e);return}const a=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),n=.2126*a(t[0])+.7152*a(t[1])+.0722*a(t[2])>.45,p=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(e=>Math.round(n?e*.92:e+(255-e)*.16)),i=(e,m)=>o.style.setProperty(e,m);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(e,p);i("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(e,n?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])i(e,n?"0 0 0":"255 255 255");i("--vs-color",p),i("--vs-color-rgb",t.join(" ")),i("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class h extends HTMLElement{static observedAttributes=["size","tone","speed","label","overlay","color"];#t;#r;#e;constructor(){super();const r=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=b,this.#t=document.createElement("div"),this.#t.className="comet",this.#t.setAttribute("role","status"),this.#t.setAttribute("aria-live","polite");const a=document.createElement("span");a.className="comet__box",a.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="comet__spin";const n=document.createElement("span");n.className="comet__trail",this.#r=document.createElement("i"),this.#r.className="comet__head",s.append(n,this.#r),a.append(s),this.#e=document.createElement("span"),this.#e.className="comet__label",this.#t.append(a,this.#e),r.append(t,this.#t)}connectedCallback(){d(this,this.getAttribute("color")),this.#a()}disconnectedCallback(){}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#t&&this.#a()}#a(){const r=(s,n)=>this.getAttribute(s)??n,t=r("label",""),a=this.hasAttribute("overlay");this.#t.className=`comet comet--${r("size","md")} comet--t-${r("tone","default")} comet--s-${r("speed","normal")}${a?" is-overlay":""}`,this.#t.setAttribute("aria-label",t||"Loading"),this.#e.textContent=t}}customElements.define("vs-spinner-comet",h);
