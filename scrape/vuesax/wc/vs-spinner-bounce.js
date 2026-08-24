const p=`
  :host { display: inline-flex; }
  .bounce {
    --sz: 32px;
    --dur: 0.9s;
    --gap: 10px;
    --fs: 13px;
    --ring: var(--inp-ring, 237 237 237);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    --ball: calc(var(--sz) * 0.4);

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

  .bounce__dots {
    display: inline-flex;
    align-items: flex-end;
    gap: calc(var(--ball) * 0.55);
  }

  .bounce__box {
    position: relative;
    width: var(--ball);
    height: var(--sz);
    flex: 0 0 auto;
    --fall: calc(var(--sz) - var(--ball));
  }

  .bounce__ball {
    position: absolute;
    left: 0;
    top: 0;
    width: var(--ball);
    height: var(--ball);
    border-radius: 999px;
    background: rgb(var(--ring));
    transform-origin: center bottom;
    animation: bounce-drop var(--dur) infinite;
    animation-delay: calc(var(--dur) / var(--n, 3) * var(--i, 0) * -1);
  }

  .bounce__shadow {
    position: absolute;
    left: 50%;
    bottom: calc(var(--sz) * 0.03);
    width: var(--ball);
    height: calc(var(--ball) * 0.28);
    border-radius: 999px;
    background: rgb(var(--ring) / 0.5);
    transform: translateX(-50%);
    filter: blur(1px);
    animation: bounce-shadow var(--dur) infinite;
    animation-delay: calc(var(--dur) / var(--n, 3) * var(--i, 0) * -1);
  }

  /* Physics: falls accelerating (gravity), squashes on the floor, bounces
     stretching and rises decelerating. Per-segment timing on each keyframe. */
  @keyframes bounce-drop {
    0%   { transform: translateY(0) scaleX(1) scaleY(1);
           animation-timing-function: cubic-bezier(0.5, 0, 1, 0.42); }          /* accelerates on the fall */
    38%  { transform: translateY(var(--fall)) scaleX(0.94) scaleY(1.1);
           animation-timing-function: cubic-bezier(0.1, 0, 0.2, 1); }           /* stretched right before impact */
    47%  { transform: translateY(var(--fall)) scaleX(1.35) scaleY(0.55);
           animation-timing-function: cubic-bezier(0.6, 0, 0.9, 0.5); }         /* SQUASH — flattened on the floor */
    56%  { transform: translateY(var(--fall)) scaleX(0.92) scaleY(1.12);
           animation-timing-function: cubic-bezier(0.1, 0.5, 0.4, 1); }         /* takes off stretching */
    100% { transform: translateY(0) scaleX(1) scaleY(1); }                      /* rises decelerating */
  }
  @keyframes bounce-shadow {
    0%   { transform: translateX(-50%) scale(0.5);  opacity: 0.2;
           animation-timing-function: cubic-bezier(0.5, 0, 1, 0.42); }
    42%  { transform: translateX(-50%) scale(1.05); opacity: 0.62; }
    47%  { transform: translateX(-50%) scale(1.2);  opacity: 0.7; }
    56%  { transform: translateX(-50%) scale(1);    opacity: 0.6;
           animation-timing-function: cubic-bezier(0.1, 0.5, 0.4, 1); }
    100% { transform: translateX(-50%) scale(0.5);  opacity: 0.2; }
  }

  /* sizes */
  .bounce--sm { --sz: 20px; --fs: 12px; --gap: 8px; }
  .bounce--md { --sz: 32px; --fs: 13px; }
  .bounce--lg { --sz: 44px; --fs: 14px; --gap: 12px; }
  .bounce--xl { --sz: 60px; --fs: 16px; --gap: 14px; }

  /* speed */
  .bounce--s-slow   { --dur: 1.3s; }
  .bounce--s-normal { --dur: 0.9s; }
  .bounce--s-fast   { --dur: 0.6s; }

  .bounce__label { color: var(--tint); white-space: nowrap; }

  .bounce.is-overlay {
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
  .bounce--t-danger  { --ring: 255 99 105;  --tint: var(--inp-t-danger-hint, #ff8a8e); }
  .bounce--t-warn    { --ring: 255 178 36;  --tint: var(--inp-t-warn-hint, #f5b544); }
  .bounce--t-success { --ring: 76 195 138;  --tint: var(--inp-t-success-hint, #5fd49b); }

  @media (prefers-reduced-motion: reduce) {
    .bounce__ball, .bounce__shadow { animation-duration: 2.4s; }
  }
`;let c;function m(s){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=s;const n=c.fillStyle;if(n.charAt(0)==="#")return[parseInt(n.slice(1,3),16),parseInt(n.slice(3,5),16),parseInt(n.slice(5,7),16)];const e=n.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(s,n){const e=n?m(String(n).trim()):null;if(!e){for(const t of g)s.style.removeProperty(t);return}const o=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),r=.2126*o(e[0])+.7152*o(e[1])+.0722*o(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,i=e.map(t=>Math.round(r?t*.92:t+(255-t)*.16)),a=(t,b)=>s.style.setProperty(t,b);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(t,l);a("--btn-primary-bg-hover",`rgb(${i[0]} ${i[1]} ${i[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(t,e.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(t,r?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])a(t,r?"0 0 0":"255 255 255");a("--vs-color",l),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class h extends HTMLElement{static observedAttributes=["size","tone","speed","count","label","overlay","color"];#t;#e;#n;#a=0;constructor(){super();const n=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=p,this.#t=document.createElement("div"),this.#t.className="bounce",this.#t.setAttribute("role","status"),this.#e=document.createElement("span"),this.#e.className="bounce__dots",this.#e.setAttribute("aria-hidden","true"),this.#n=document.createElement("span"),this.#n.className="bounce__label",this.#t.append(this.#e),n.append(e,this.#t)}connectedCallback(){d(this,this.getAttribute("color")),this.#r()}disconnectedCallback(){}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#t&&this.#r()}#r(){const n=(a,t)=>this.getAttribute(a)??t,e=n("size","md"),o=n("tone","default"),u=n("speed","normal"),r=n("label",""),l=this.hasAttribute("overlay"),i=Math.max(1,Math.min(8,parseInt(n("count","3"),10)||3));if(this.#t.className=`bounce bounce--${e} bounce--t-${o} bounce--s-${u}${l?" is-overlay":""}`,this.#t.setAttribute("aria-label",r||"Loading"),this.#e.style.setProperty("--n",String(i)),i!==this.#a){this.#a=i,this.#e.replaceChildren();for(let a=0;a<i;a++){const t=document.createElement("span");t.className="bounce__box",t.style.setProperty("--i",String(a));const b=document.createElement("i");b.className="bounce__ball";const f=document.createElement("span");f.className="bounce__shadow",t.append(b,f),this.#e.appendChild(t)}}r?(this.#n.textContent=r,this.#n.isConnected||this.#t.append(this.#n)):this.#n.isConnected&&this.#n.remove()}}customElements.define("vs-spinner-bounce",h);
