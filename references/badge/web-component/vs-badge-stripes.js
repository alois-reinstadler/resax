const u=`
  :host { display: inline-flex; }
  .bstr {
    --h: 24px;
    --px: 9px;
    --fs: 12px;
    --gap: 5px;
    --rr: 999px;
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    --solid-fg: var(--badge-solid-fg, #0b0b0b);

    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
    height: var(--h);
    padding: 0 var(--px);
    border: 1px solid transparent;
    border-radius: var(--rr);
    overflow: hidden;
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
  .bstr--sm { --h: 20px; --px: 7px; --fs: 11px; --gap: 4px; }
  .bstr--lg { --h: 28px; --px: 12px; --fs: 13px; --gap: 6px; }

  /* radii */
  .bstr--r-subtle { --rr: 6px; }
  .bstr--r-rounded { --rr: 9px; }
  .bstr--r-pill { --rr: 999px; }

  /* variants */
  .bstr--v-soft {
    background: rgb(var(--ring) / 0.14);
    color: var(--tint);
    border-color: rgb(var(--ring) / 0.22);
  }
  .bstr--v-solid {
    background: rgb(var(--ring) / 0.92);
    color: var(--solid-fg);
    border-color: transparent;
  }
  .bstr--v-outline {
    background: transparent;
    color: var(--tint);
    border-color: rgb(var(--ring) / 0.5);
  }

  /* marching diagonal stripes layer — absolute, out of flow */
  .bstr__stripes {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    pointer-events: none;
    background-image: repeating-linear-gradient(
      45deg,
      rgb(var(--ring) / 0.18) 0,
      rgb(var(--ring) / 0.18) 6px,
      transparent 6px,
      transparent 12px
    );
    background-size: 34px 34px;
    opacity: 0.9;
  }
  .bstr--v-solid .bstr__stripes {
    background-image: repeating-linear-gradient(
      45deg,
      rgb(0 0 0 / 0.16) 0,
      rgb(0 0 0 / 0.16) 6px,
      transparent 6px,
      transparent 12px
    );
  }
  .bstr.is-marching .bstr__stripes {
    animation: bstr-march 0.9s linear infinite;
  }
  @keyframes bstr-march {
    from { background-position: 0 0; }
    to   { background-position: 34px 0; }
  }

  /* status dot */
  .bstr__dot {
    position: relative;
    z-index: 2;
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: currentColor;
    flex: 0 0 auto;
  }

  .bstr__label { position: relative; z-index: 2; }

  .bstr__close {
    position: relative;
    z-index: 2;
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
  .bstr__close:hover:not(:disabled) { opacity: 1; background: rgb(var(--ring) / 0.18); }
  .bstr--v-solid .bstr__close:hover:not(:disabled) { background: rgb(0 0 0 / 0.18); }
  .bstr__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  .bstr__close svg { width: 100%; height: 100%; }

  /* tones */
  .bstr--t-danger {
    --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105;
    --tint: var(--inp-t-danger-hint, #ff8a8e); --solid-fg: #160405; }
  .bstr--t-warn {
    --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36;
    --tint: var(--inp-t-warn-hint, #f5b544); --solid-fg: #160f02;
  }
  .bstr--t-success {
    --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138;
    --tint: var(--inp-t-success-hint, #5fd49b); --solid-fg: #04120b;
  }

  .bstr.is-disabled { opacity: 0.5; }
  .bstr.is-disabled .bstr__stripes { animation: none; }
  .bstr.is-disabled .bstr__close { cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .bstr { transition: none; }
    .bstr.is-marching .bstr__stripes { animation: none; }
  }
`,d="http://www.w3.org/2000/svg";let l;function h(o){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=o;const r=l.fillStyle;if(r.charAt(0)==="#")return[parseInt(r.slice(1,3),16),parseInt(r.slice(3,5),16),parseInt(r.slice(5,7),16)];const t=r.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(o,r){const t=r?h(String(r).trim()):null;if(!t){for(const e of f)o.style.removeProperty(e);return}const i=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),s=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,b=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(e=>Math.round(s?e*.92:e+(255-e)*.16)),n=(e,g)=>o.style.setProperty(e,g);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(e,b);n("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(e,s?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])n(e,s?"0 0 0":"255 255 255");n("--vs-color",b),n("--vs-color-rgb",t.join(" ")),n("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["label","variant","size","radius","tone","dot","removable","disabled","march","color"];#e;#s;#r;#i;#n;#t;constructor(){super();const r=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=u,this.#e=document.createElement("span"),this.#s=document.createElement("span"),this.#s.className="bstr__stripes",this.#s.setAttribute("aria-hidden","true"),this.#r=document.createElement("span"),this.#r.className="bstr__dot",this.#r.setAttribute("aria-hidden","true"),this.#i=document.createElement("span"),this.#i.className="bstr__label",this.#n=document.createElement("slot"),this.#i.append(this.#n),this.#t=document.createElement("button"),this.#t.className="bstr__close",this.#t.type="button";const i=document.createElementNS(d,"svg");i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("fill","none"),i.setAttribute("aria-hidden","true");for(const a of["M6 6L18 18","M18 6L6 18"]){const s=document.createElementNS(d,"path");s.setAttribute("d",a),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),i.append(s)}this.#t.append(i),this.#e.append(this.#s,this.#r,this.#i,this.#t),r.append(t,this.#e),this.#t.addEventListener("click",this.#o)}connectedCallback(){p(this,this.getAttribute("color")),this.#a()}disconnectedCallback(){this.#t.removeEventListener("click",this.#o)}attributeChangedCallback(){p(this,this.getAttribute("color")),this.#e&&this.#a()}#o=()=>{this.hasAttribute("disabled")||this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,composed:!0}))};#a(){const r=(b,c)=>this.getAttribute(b)??c,t=r("march","true")!=="false",i=this.hasAttribute("disabled"),a=r("label","New");this.#e.className=`bstr bstr--${r("size","md")} bstr--v-${r("variant","soft")} bstr--r-${r("radius","pill")} bstr--t-${r("tone","default")}`+(t?" is-marching":"")+(i?" is-disabled":""),this.#r.hidden=!this.hasAttribute("dot"),this.#n.textContent=a;const s=this.hasAttribute("removable");this.#t.style.display=s?"":"none",this.#t.disabled=i,this.#t.setAttribute("aria-label",`Remove ${a}`)}}customElements.define("vs-badge-stripes",m);
