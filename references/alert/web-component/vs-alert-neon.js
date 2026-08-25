function u(){return matchMedia("(prefers-reduced-motion: reduce)").matches}try{globalThis.CSS.registerProperty({name:"--neo-angle",syntax:"<angle>",inherits:!0,initialValue:"0deg"})}catch{}const p={dangerWarn:[["M12 9V14",1.5],["M12.0001 21.4093H5.94005C2.47005 21.4093 1.02005 18.9293 2.70005 15.8993L5.82006 10.2793L8.76006 4.9993C10.5401 1.7893 13.4601 1.7893 15.2401 4.9993L18.1801 10.2893L21.3001 15.9093C22.9801 18.9393 21.5201 21.4193 18.0601 21.4193H12.0001V21.4093Z",1.5],["M11.9945 17H12.0035",2]],success:[["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",1.5],["M7.75 11.9999L10.58 14.8299L16.25 9.16992",1.5]],default:[["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",1.5],["M12 8V13",1.5],["M11.9945 16H12.0035",2]]},g="http://www.w3.org/2000/svg";function h(r){const e=document.createElementNS(g,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true");for(const[t,o]of r){const s=document.createElementNS(g,"path");s.setAttribute("d",t),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width",String(o)),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),e.appendChild(s)}return e}const f=`
  /* NOTE: --neo-angle is registered from script above, NOT with an @property
     rule here — @property inside a shadow stylesheet never registers. */
  :host { display: block; }
  .neo {
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    /* body copy stays neutral — only a 14% breath of the tone. Tinting the
       message the full accent color made it read as a link, not as text. */
    --tint: color-mix(in srgb, var(--accent) 14%, var(--text-secondary, #a1a1a1));
    --rr: 16px;
    --tube: 1.5px;

    position: relative; isolation: isolate; box-sizing: border-box;
    display: flex; align-items: flex-start; gap: 13px;
    width: 100%; max-width: 420px; padding: 16px 16px 17px 15px;
    border: 0; border-radius: var(--rr);
    background:
      radial-gradient(125% 150% at 0% 0%, color-mix(in srgb, var(--accent) 9%, transparent), transparent 62%),
      var(--bg-card, #0b0d0c);
    color: var(--inp-text, #ededed);
    font: inherit; line-height: 1.45;
    box-shadow:
      0 16px 40px -24px #000,
      0 0 34px -12px color-mix(in srgb, var(--accent) 75%, transparent);
    animation: neo-spin 4.4s linear infinite;
    transition: box-shadow 280ms ease;
  }
  .neo:hover {
    box-shadow:
      0 18px 46px -24px #000,
      0 0 46px -10px color-mix(in srgb, var(--accent) 90%, transparent);
  }
  @keyframes neo-spin { to { --neo-angle: 360deg; } }

  /* Neon tube: a conic gradient clipped to a 1.5px ring by a mask. The whole
     perimeter keeps a lit floor (22%) so the outline always reads as a closed
     shape; the bright head + white hot-spot is what travels around it. */
  .neo__glow, .neo__bloom {
    position: absolute; border-radius: inherit; pointer-events: none;
    background: conic-gradient(
      from var(--neo-angle),
      color-mix(in srgb, var(--accent) 22%, transparent) 0deg,
      color-mix(in srgb, var(--accent) 30%, transparent) 145deg,
      color-mix(in srgb, var(--accent) 72%, transparent) 255deg,
      var(--accent) 312deg,
      color-mix(in srgb, #fff 72%, var(--accent)) 340deg,
      var(--accent) 350deg,
      color-mix(in srgb, var(--accent) 22%, transparent) 360deg
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
  }
  .neo__glow { inset: 0; z-index: -1; padding: var(--tube); }
  /* second copy of the same ring, blurred — the actual bloom. Sits one layer
     further back and breathes, which is what sells "lit tube" over "border". */
  .neo__bloom {
    inset: -2px; z-index: -2; padding: calc(var(--tube) + 2.5px);
    border-radius: calc(var(--rr) + 2px);
    filter: blur(7px);
    animation: neo-breathe 3.4s ease-in-out infinite alternate;
  }
  @keyframes neo-breathe { from { opacity: 0.5; } to { opacity: 0.95; } }

  /* hairline of specular light on the top edge — depth under the tube */
  .neo::after {
    content: ''; position: absolute; inset: 0; z-index: 1;
    border-radius: inherit; pointer-events: none;
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.055);
  }

  .neo__icon {
    position: relative; z-index: 2; flex: 0 0 auto; margin-top: 0; width: 28px; height: 28px; border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    color: var(--accent); font-size: 15px;
    background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--accent) 24%, transparent), transparent 72%);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--accent) 32%, transparent),
      0 0 18px -6px var(--accent);
    filter: drop-shadow(0 0 5px color-mix(in srgb, var(--accent) 45%, transparent));
  }
  .neo__icon svg { width: 1.05em; height: 1.05em; display: block; }

  .neo__body { position: relative; z-index: 2; flex: 1 1 auto; min-width: 0; padding-top: 3px; }
  .neo__title {
    margin: 0 0 3px; font-weight: 640; font-size: 14px; letter-spacing: -0.011em;
    color: var(--inp-text, #ededed);
    text-shadow: 0 0 14px color-mix(in srgb, var(--accent) 45%, transparent);
  }
  .neo__msg { margin: 0; font-size: 13px; color: var(--tint); }
  .neo__action { margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap; }

  .neo__close {
    position: relative; z-index: 2; flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center;
    width: 1.75em; height: 1.75em; margin: 0 -3px 0 0; padding: 0;
    border: 0; border-radius: 8px; background: transparent; color: inherit; font-size: 14px;
    cursor: pointer; opacity: 0.45;
    transition: opacity 180ms ease, background 180ms ease, box-shadow 180ms ease, color 180ms ease;
  }
  .neo__close:hover:not(:disabled) {
    opacity: 1; color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--accent) 30%, transparent),
      0 0 14px -5px var(--accent);
  }
  .neo__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  .neo__close svg { width: 1em; height: 1em; display: block; }

  .neo--t-danger { --accent: #ff5a61; --ui-accent-fg: #fff; --ring: 255 99 105; }
  .neo--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; }
  .neo--t-success { --accent: #3ee6a0; --ui-accent-fg: #fff; --ring: 76 195 138; }

  .neo.is-disabled { opacity: 0.5; animation-play-state: paused; }
  .neo.is-disabled .neo__bloom { animation-play-state: paused; opacity: 0.4; }
  .neo.is-disabled .neo__close { cursor: not-allowed; }

  /* close: collapse height to 0 with anticipation bounce + blur */
  .neo.is-closing {
    overflow: hidden; opacity: 0; filter: blur(6px); transform: scale(0.97);
    padding-top: 0 !important; padding-bottom: 0 !important;
    margin-top: 0 !important; margin-bottom: 0 !important;
    box-shadow: none;
    transition:
      height 440ms cubic-bezier(0.5, -0.45, 0.55, 1),
      opacity 300ms ease,
      filter 340ms ease,
      transform 440ms cubic-bezier(0.5, -0.45, 0.55, 1),
      padding 440ms cubic-bezier(0.5, -0.45, 0.55, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    /* park the hot-spot on the top-right run instead of spinning — the ring
       still reads as a closed neon tube because of the lit floor. */
    .neo { animation: none; --neo-angle: 210deg; }
    .neo__bloom { animation: none; opacity: 0.8; }
    .neo, .neo__close { transition: none; }
  }
`;let d;function x(r){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=r;const e=d.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(r,e){const t=e?x(String(e).trim()):null;if(!t){for(const n of v)r.style.removeProperty(n);return}const o=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),i=.2126*o(t[0])+.7152*o(t[1])+.0722*o(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(n=>Math.round(i?n*.92:n+(255-n)*.16)),a=(n,b)=>r.style.setProperty(n,b);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(n,c);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(n,t.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(n,i?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])a(n,i?"0 0 0":"255 255 255");a("--vs-color",c),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["title","message","tone","icon","dismissible","disabled","color"];#t;#i;#d;#h;#p;#c;#a;#l;#g;#m;#o;#s;#e;#b=!1;#r=0;#n=null;#u=()=>this.#y();#f=()=>{this.#o.hidden=this.#s.assignedNodes({flatten:!0}).length===0};constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=f,this.#t=document.createElement("div");const o=document.createElement("span");o.className="neo__bloom",o.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="neo__glow",s.setAttribute("aria-hidden","true"),this.#i=document.createElement("span"),this.#i.className="neo__icon",this.#i.setAttribute("aria-hidden","true"),this.#c=document.createElement("slot"),this.#c.name="icon",this.#d=h(p.dangerWarn),this.#h=h(p.success),this.#p=h(p.default),this.#c.append(this.#d,this.#h,this.#p),this.#i.appendChild(this.#c);const i=document.createElement("div");i.className="neo__body",this.#a=document.createElement("p"),this.#a.className="neo__title",this.#l=document.createElement("p"),this.#l.className="neo__msg",this.#g=document.createElement("slot"),this.#m=document.createTextNode(""),this.#g.appendChild(this.#m),this.#l.appendChild(this.#g),this.#o=document.createElement("div"),this.#o.className="neo__action",this.#o.hidden=!0,this.#s=document.createElement("slot"),this.#s.name="action",this.#o.appendChild(this.#s),i.append(this.#a,this.#l,this.#o),this.#e=document.createElement("button"),this.#e.className="neo__close",this.#e.type="button",this.#e.setAttribute("aria-label","Close alert");const c=h([["M6 6L18 18",1.5],["M18 6L6 18",1.5]]);this.#e.appendChild(c),this.#t.append(o,s,this.#i,i,this.#e),e.append(t,this.#t),this.#e.addEventListener("click",this.#u),this.#s.addEventListener("slotchange",this.#f)}connectedCallback(){m(this,this.getAttribute("color")),this.setAttribute("role","alert"),this.#x()}disconnectedCallback(){this.#e.removeEventListener("click",this.#u),this.#s.removeEventListener("slotchange",this.#f),this.#r&&(cancelAnimationFrame(this.#r),this.#r=0),this.#n&&(this.#t.removeEventListener("transitionend",this.#n),this.#n=null)}attributeChangedCallback(){m(this,this.getAttribute("color")),this.#t&&this.#x()}#x(){const e=(a,n)=>this.getAttribute(a)??n,t=this.hasAttribute("disabled"),o=this.hasAttribute("dismissible"),s=this.hasAttribute("icon"),i=e("tone","default"),c=e("title",""),l=e("message","Something you should know.");this.#t.className=`neo neo--t-${i}${t?" is-disabled":""}${this.#b?" is-closing":""}`,this.#i.style.display=s?"":"none",this.#d.style.display=i==="danger"||i==="warn"?"":"none",this.#h.style.display=i!=="success"?"none":"",this.#p.style.display=i==="danger"||i==="warn"||i==="success"?"none":"",this.#a.textContent=c,this.#a.hidden=!c,this.#m.textContent=l,this.#e.style.display=o?"":"none",this.#e.disabled=t}#y(){if(this.hasAttribute("disabled")||this.#b)return;const e=this.#t;if(!e||u()){this.#v();return}const t=e.getBoundingClientRect().height;e.style.height=`${t}px`,this.#b=!0,e.classList.add("is-closing"),e.offsetHeight,this.#r=requestAnimationFrame(()=>{this.#r=0,e.style.height="0px"}),this.#n=o=>{o.propertyName==="height"&&(e.removeEventListener("transitionend",this.#n),this.#n=null,this.#v())},e.addEventListener("transitionend",this.#n)}#v(){this.style.display="none",this.dispatchEvent(new CustomEvent("dismiss",{bubbles:!0,composed:!0}))}}customElements.define("vs-alert-neon",y);
