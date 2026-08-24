const g=`
  :host { display: inline-flex; }
  .bpulse {
    --h: 24px;
    --px: 9px;
    --fs: 12px;
    --gap: 5px;
    --rr: 999px;
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    --solid-fg: var(--badge-solid-fg, #0b0b0b);
    --dur: 2s;

    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
    height: var(--h);
    padding: 0 var(--px);
    border: 1px solid transparent;
    border-radius: var(--rr);
    font: inherit;
    font-size: var(--fs);
    font-weight: 550;
    line-height: 1;
    letter-spacing: 0.01em;
    white-space: nowrap;
    user-select: none;
    transition: border-color 200ms ease, background-color 200ms ease, color 200ms ease;
  }

  /* sizes */
  .bpulse--sm { --h: 20px; --px: 7px; --fs: 11px; --gap: 4px; }
  .bpulse--lg { --h: 28px; --px: 12px; --fs: 13px; --gap: 6px; }

  /* radii */
  .bpulse--r-subtle { --rr: 6px; }
  .bpulse--r-rounded { --rr: 9px; }
  .bpulse--r-pill { --rr: 999px; }

  /* speeds */
  .bpulse--s-slow { --dur: 3s; }
  .bpulse--s-normal { --dur: 2s; }
  .bpulse--s-fast { --dur: 1.2s; }

  /* variants */
  .bpulse--v-soft {
    background: rgb(var(--ring) / 0.14);
    color: var(--tint);
    border-color: rgb(var(--ring) / 0.22);
  }
  .bpulse--v-solid {
    background: rgb(var(--ring) / 0.92);
    color: var(--solid-fg);
    border-color: transparent;
  }
  .bpulse--v-outline {
    background: transparent;
    color: var(--tint);
    border-color: rgb(var(--ring) / 0.5);
  }

  /* pulsing ring, behind the content (position:absolute → out of flow, so its
     animation is never restarted by an unrelated attribute/text update) */
  .bpulse__ring {
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    border: 1px solid rgb(var(--ring) / 0.6);
    animation: bpulse-ring var(--dur) var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)) infinite;
    pointer-events: none;
  }
  @keyframes bpulse-ring {
    0%   { opacity: 0.55; transform: scale(1); }
    70%  { opacity: 0; transform: scale(1.35); }
    100% { opacity: 0; transform: scale(1.35); }
  }

  /* status dot */
  .bpulse__dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: currentColor;
    flex: 0 0 auto;
  }

  .bpulse__label { position: relative; z-index: 2; }

  .bpulse__close {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.15em;
    height: 1.15em;
    margin-right: -2px;
    padding: 0;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: inherit;
    font-size: inherit;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 160ms ease, background-color 160ms ease;
  }
  .bpulse__close:hover:not(:disabled) { opacity: 1; background: rgb(var(--ring) / 0.18); }
  .bpulse--v-solid .bpulse__close:hover:not(:disabled) { background: rgb(0 0 0 / 0.18); }
  .bpulse__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }

  /* tones */
  .bpulse--t-danger {
    --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105;
    --tint: var(--inp-t-danger-hint, #ff8a8e); --solid-fg: #160405; }
  .bpulse--t-warn {
    --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36;
    --tint: var(--inp-t-warn-hint, #f5b544); --solid-fg: #160f02;
  }
  .bpulse--t-success {
    --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138;
    --tint: var(--inp-t-success-hint, #5fd49b); --solid-fg: #04120b;
  }

  .bpulse.is-disabled { opacity: 0.5; }
  .bpulse.is-disabled .bpulse__close { cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .bpulse { transition: none; }
    .bpulse__ring { animation: none; opacity: 0; }
  }
`,b="http://www.w3.org/2000/svg";let p;function f(c){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=c;const s=p.fillStyle;if(s.charAt(0)==="#")return[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];const e=s.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const h=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(c,s){const e=s?f(String(s).trim()):null;if(!e){for(const t of h)c.style.removeProperty(t);return}const i=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),r=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,n=e.map(t=>Math.round(r?t*.92:t+(255-t)*.16)),o=(t,u)=>c.style.setProperty(t,u);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(t,l);o("--btn-primary-bg-hover",`rgb(${n[0]} ${n[1]} ${n[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(t,e.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(t,r?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])o(t,r?"0 0 0":"255 255 255");o("--vs-color",l),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["label","variant","size","radius","tone","dot","removable","disabled","pulse-speed","color"];#t;#s;#r;#e;#i=()=>{this.hasAttribute("disabled")||this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,composed:!0}))};constructor(){super();const s=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#t=document.createElement("span"),this.#t.className="bpulse";const i=document.createElement("span");i.className="bpulse__ring",i.setAttribute("aria-hidden","true"),this.#s=document.createElement("span"),this.#s.className="bpulse__dot",this.#s.setAttribute("aria-hidden","true");const a=document.createElement("span");a.className="bpulse__label",this.#r=document.createElement("slot"),a.appendChild(this.#r),this.#e=document.createElement("button"),this.#e.className="bpulse__close",this.#e.type="button";const r=document.createElementNS(b,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("aria-hidden","true");for(const l of["M6 6L18 18","M18 6L6 18"]){const n=document.createElementNS(b,"path");n.setAttribute("d",l),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","1.5"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),r.appendChild(n)}this.#e.appendChild(r),this.#t.append(i,this.#s,a,this.#e),s.append(e,this.#t),this.#e.addEventListener("click",this.#i)}connectedCallback(){d(this,this.getAttribute("color")),this.#n()}disconnectedCallback(){this.#e.removeEventListener("click",this.#i)}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#t&&this.#n()}#n(){const s=(r,l)=>this.getAttribute(r)??l,e=this.hasAttribute("disabled");this.#t.className=`bpulse bpulse--${s("size","md")} bpulse--v-${s("variant","soft")} bpulse--r-${s("radius","pill")} bpulse--t-${s("tone","default")} bpulse--s-${s("pulse-speed","normal")}`+(e?" is-disabled":"");const i=s("label","New");this.#r.textContent=i,this.#s.style.display=this.hasAttribute("dot")?"":"none";const a=this.hasAttribute("removable");this.#e.style.display=a?"":"none",this.#e.disabled=e,this.#e.setAttribute("aria-label",`Remove ${i}`)}}customElements.define("vs-badge-pulse",m);
