const d=`
  :host { display: inline-flex; }
  .avr {
    --sz: var(--ctrl-h-md, 40px);
    --fs: var(--ctrl-fs-md, 15px);
    --r: 50%;
    --gap: 3px;
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sz);
    height: var(--sz);
    border-radius: var(--r);
    flex: none;
    user-select: none;
  }
  .avr__face {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    overflow: hidden;
    z-index: 1;
    background: var(--vs-color, hsl(var(--avr-hue, 220) 45% 22%));
    color: var(--vs-color-fg, hsl(var(--avr-hue, 220) 70% 78%));
    box-shadow: 0 0 0 var(--gap) var(--bg-card, #111);
  }
  /* sizes */
  .avr--xs { --sz: var(--ctrl-h-xs, 24px); --fs: var(--ctrl-fs-xs, 10px); --gap: 2px; }
  .avr--sm { --sz: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 12px); --gap: 2px; }
  .avr--md { --sz: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 15px); --gap: 3px; }
  .avr--lg { --sz: var(--ctrl-h-lg, 56px); --fs: var(--ctrl-fs-lg, 20px); --gap: 3px; }
  .avr--xl { --sz: var(--ctrl-h-xl, 80px); --fs: var(--ctrl-fs-xl, 28px); --gap: 4px; }
  /* shapes */
  .avr--s-circle { --r: 50%; }
  .avr--s-rounded { --r: var(--ctrl-r-md, 12px); }
  .avr--s-squircle { --r: var(--ctrl-r-lg, 16px); }
  @supports (corner-shape: squircle) {
    .avr--s-squircle,
    .avr--s-squircle .avr__face,
    .avr--s-squircle .avr__ring { corner-shape: squircle; }
  }
  .avr--bordered .avr__face {
    box-shadow:
      0 0 0 var(--gap) var(--bg-card, #111),
      0 0 0 calc(var(--gap) + 1px) var(--inp-border, #2a2a2a);
  }
  .avr__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
    -webkit-user-drag: none;
  }
  .avr__initials {
    font-family: inherit;
    font-weight: 600;
    font-size: var(--fs);
    line-height: 1;
    letter-spacing: 0.02em;
  }
  .avr__placeholder {
    width: 62%;
    height: 62%;
    color: var(--inp-text, #ededed);
    opacity: 0.5;
  }
  /* ── the spinning gradient ring (position:absolute, out of flow) ─────────── */
  @property --avr-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }
  .avr__ring {
    position: absolute;
    inset: calc(-1 * (var(--gap) + var(--avr-ring-w, 3px)));
    border-radius: inherit;
    z-index: 0;
    pointer-events: none;
    background: conic-gradient(
      from var(--avr-angle),
      var(--accent, #5b8cff),
      hsl(var(--avr-hue, 220) 80% 62%),
      var(--accent, #5b8cff),
      hsl(var(--avr-hue, 220) 80% 62%),
      var(--accent, #5b8cff)
    );
    animation: avr-spin var(--avr-spin, 5s) linear infinite;
  }
  .avr:hover .avr__ring { animation-duration: calc(var(--avr-spin, 5s) / 2.5); }
  @keyframes avr-spin {
    to { --avr-angle: 360deg; }
  }
  @media (prefers-reduced-motion: reduce) {
    .avr__ring { animation: none; }
  }
`,g=`<svg class="avr__placeholder" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;let c;function f(o){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=o;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const r=t.match(/[\d.]+/g);return r&&r.length>=3?[+r[0],+r[1],+r[2]]:null}const u=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(o,t){const r=t?f(String(t).trim()):null;if(!r){for(const e of u)o.style.removeProperty(e);return}const i=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),a=.2126*i(r[0])+.7152*i(r[1])+.0722*i(r[2])>.45,n=`rgb(${r[0]} ${r[1]} ${r[2]})`,l=r.map(e=>Math.round(a?e*.92:e+(255-e)*.16)),s=(e,p)=>o.style.setProperty(e,p);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(e,n);s("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(e,r.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(e,a?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])s(e,a?"0 0 0":"255 255 255");s("--vs-color",n),s("--vs-color-rgb",r.join(" ")),s("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class b extends HTMLElement{static observedAttributes=["src","alt","name","size","shape","bordered","ring-width","spin","color"];#t;#i;#e;#r;#s;#o;#a=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=d,this.#t=document.createElement("span"),this.#t.className="avr",this.#i=document.createElement("span"),this.#i.className="avr__ring",this.#i.setAttribute("aria-hidden","true"),this.#e=document.createElement("span"),this.#e.className="avr__face",this.#e.innerHTML=`<img class="avr__img" draggable="false" alt="" /><span class="avr__initials" aria-hidden="true"></span>${g}`,this.#r=this.#e.querySelector(".avr__img"),this.#s=this.#e.querySelector(".avr__initials"),this.#o=this.#e.querySelector(".avr__placeholder"),this.#r.addEventListener("error",()=>{this.#a=!0,this.#n()}),this.#t.append(this.#i,this.#e),t.append(r,this.#t)}connectedCallback(){v(this,this.getAttribute("color")),this.#n()}disconnectedCallback(){this.#r.removeAttribute("src")}attributeChangedCallback(t){v(this,this.getAttribute("color")),t==="src"&&(this.#a=!1),this.#t&&this.#n()}get src(){return this.getAttribute("src")??""}set src(t){t==null?this.removeAttribute("src"):this.setAttribute("src",t)}get name(){return this.getAttribute("name")??""}set name(t){t==null?this.removeAttribute("name"):this.setAttribute("name",t)}#n(){const t=(l,s)=>this.getAttribute(l)??s,r=t("src",""),i=t("alt",""),h=t("name",""),a=this.#l(h||i),n=!!r&&!this.#a;this.#t.className=`avr avr--${t("size","md")} avr--s-${t("shape","circle")}${this.hasAttribute("bordered")?" avr--bordered":""}`,this.#t.style.setProperty("--avr-hue",String(this.#c(h||i))),this.#t.style.setProperty("--avr-ring-w",`${t("ring-width","3")}px`),this.#t.style.setProperty("--avr-spin",`${t("spin","5")}s`),this.#r.style.display=n?"block":"none",this.#s.style.display=!n&&a?"":"none",this.#o.style.display=!n&&!a?"":"none",n?(this.#r.getAttribute("src")!==r&&this.#r.setAttribute("src",r),this.#r.alt=i||h):this.#r.removeAttribute("src"),this.#s.textContent=a}#l(t){if(t=(t||"").trim(),!t)return"";const r=t.split(/\s+/);return r.length===1?r[0].slice(0,2).toUpperCase():(r[0][0]+r[r.length-1][0]).toUpperCase()}#c(t){t=t||"";let r=0;for(let i=0;i<t.length;i++)r=(r*31+t.charCodeAt(i))%360;return r}}customElements.define("vs-avatar-ring",b);
