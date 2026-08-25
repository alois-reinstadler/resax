const u=`
  :host { display: inline-flex; }
  .bgrad {
    --h: 24px; --px: 9px; --fs: 12px; --gap: 5px; --rr: 999px;
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    --solid-fg: var(--badge-solid-fg, #0b0b0b);
    position: relative; isolation: isolate; display: inline-flex; align-items: center;
    gap: var(--gap); height: var(--h); padding: 0 var(--px);
    border: 1px solid transparent; border-radius: var(--rr);
    font: inherit; font-size: var(--fs); font-weight: 550; line-height: 1;
    letter-spacing: 0.01em; white-space: nowrap; user-select: none;
    background-size: 220% 100%; background-position: 0% 50%;
    transition: border-color 200ms ease, color 200ms ease;
  }
  /* sizes */
  .bgrad--sm { --h: 20px; --px: 7px; --fs: 11px; --gap: 4px; }
  .bgrad--lg { --h: 28px; --px: 12px; --fs: 13px; --gap: 6px; }
  /* radii */
  .bgrad--r-subtle { --rr: 6px; }
  .bgrad--r-rounded { --rr: 9px; }
  .bgrad--r-pill { --rr: 999px; }
  /* variants — the gradient uses the tone with stepped alphas */
  .bgrad--v-soft {
    background-image: linear-gradient(100deg,
      rgb(var(--ring) / 0.10) 0%, rgb(var(--ring) / 0.24) 50%, rgb(var(--ring) / 0.10) 100%);
    color: var(--tint); border-color: rgb(var(--ring) / 0.22);
  }
  .bgrad--v-solid {
    background-image: linear-gradient(100deg,
      rgb(var(--ring) / 0.78) 0%, rgb(var(--ring) / 1) 50%, rgb(var(--ring) / 0.78) 100%);
    color: var(--solid-fg); border-color: transparent;
  }
  .bgrad--v-outline {
    background-image: linear-gradient(100deg,
      rgb(var(--ring) / 0) 0%, rgb(var(--ring) / 0.16) 50%, rgb(var(--ring) / 0) 100%);
    color: var(--tint); border-color: rgb(var(--ring) / 0.5);
  }
  /* gradient animation */
  .bgrad.is-animated { animation: bgrad-shift 3.2s ease-in-out infinite; }
  @keyframes bgrad-shift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  /* status dot */
  .bgrad__dot { width: 6px; height: 6px; border-radius: 999px; background: currentColor; flex: 0 0 auto; }
  .bgrad__label { position: relative; z-index: 2; }
  /* remove button */
  .bgrad__close {
    position: relative; display: inline-flex; align-items: center; justify-content: center;
    width: 1.15em; height: 1.15em; margin-right: -2px; padding: 0;
    border: none; border-radius: 999px; background: transparent; color: inherit;
    font-size: inherit; cursor: pointer; opacity: 0.7;
    transition: opacity 160ms ease, background-color 160ms ease;
  }
  .bgrad__close:hover:not(:disabled) { opacity: 1; background: rgb(var(--ring) / 0.18); }
  .bgrad--v-solid .bgrad__close:hover:not(:disabled) { background: rgb(0 0 0 / 0.18); }
  .bgrad__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  .bgrad__close svg { width: 100%; height: 100%; }
  /* tones */
  .bgrad--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --tint: var(--inp-t-danger-hint, #ff8a8e); --solid-fg: #160405; }
  .bgrad--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --tint: var(--inp-t-warn-hint, #f5b544); --solid-fg: #160f02; }
  .bgrad--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --tint: var(--inp-t-success-hint, #5fd49b); --solid-fg: #04120b; }
  /* disabled */
  .bgrad.is-disabled { opacity: 0.5; animation: none; }
  .bgrad.is-disabled .bgrad__close { cursor: not-allowed; }
  @media (prefers-reduced-motion: reduce) {
    .bgrad { transition: none; }
    .bgrad.is-animated { animation: none; background-position: 50% 50%; }
  }
`,g="http://www.w3.org/2000/svg";let d;function f(o){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=o;const e=d.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const h=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(o,e){const t=e?f(String(e).trim()):null;if(!t){for(const r of h)o.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),a=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,s=t.map(r=>Math.round(a?r*.92:r+(255-r)*.16)),n=(r,p)=>o.style.setProperty(r,p);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(r,c);n("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(r,a?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])n(r,a?"0 0 0":"255 255 255");n("--vs-color",c),n("--vs-color-rgb",t.join(" ")),n("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["label","variant","size","radius","tone","dot","removable","disabled","animate","color"];#e;#r;#i;#t;#n=this.#s.bind(this);constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=u,this.#e=document.createElement("span"),this.#e.className="bgrad",this.#r=document.createElement("span"),this.#r.className="bgrad__dot",this.#r.setAttribute("aria-hidden","true");const i=document.createElement("span");i.className="bgrad__label",this.#i=document.createElement("slot"),i.append(this.#i),this.#t=document.createElement("button"),this.#t.className="bgrad__close",this.#t.type="button",this.#t.append(this.#o()),this.#e.append(this.#r,i,this.#t),e.append(t,this.#e)}#o(){const e=document.createElementNS(g,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true");for(const t of["M6 6L18 18","M18 6L6 18"]){const i=document.createElementNS(g,"path");i.setAttribute("d",t),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),e.append(i)}return e}connectedCallback(){b(this,this.getAttribute("color")),this.#t.addEventListener("click",this.#n),this.#a()}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#e&&this.#a()}#a(){const e=(c,s)=>this.getAttribute(c)??s,t=this.hasAttribute("disabled"),i=e("animate","true")!=="false";this.#e.className=["bgrad",`bgrad--${e("size","md")}`,`bgrad--v-${e("variant","soft")}`,`bgrad--r-${e("radius","pill")}`,`bgrad--t-${e("tone","default")}`,i?"is-animated":"",t?"is-disabled":""].filter(Boolean).join(" ");const l=e("label","New");this.#i.textContent=l,this.#r.hidden=!this.hasAttribute("dot");const a=this.hasAttribute("removable");this.#t.style.display=a?"":"none",this.#t.disabled=t,this.#t.setAttribute("aria-label",`Remove ${l}`)}#s(){this.hasAttribute("disabled")||this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,composed:!0}))}disconnectedCallback(){this.#t?.removeEventListener("click",this.#n)}}customElements.define("vs-badge-gradient",m);
