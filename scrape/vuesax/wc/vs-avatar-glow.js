const v=`
  :host { display: inline-flex; }
  .avg {
    --sz: var(--ctrl-h-md, 40px);
    --fs: var(--ctrl-fs-md, 15px);
    --r: 50%;
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
  .avg__face {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    overflow: hidden;
    z-index: 1;
    background: var(--vs-color, hsl(var(--avg-hue, 220) 45% 22%));
    color: var(--vs-color-fg, hsl(var(--avg-hue, 220) 70% 78%));
  }
  /* sizes */
  .avg--xs { --sz: var(--ctrl-h-xs, 24px); --fs: var(--ctrl-fs-xs, 10px); }
  .avg--sm { --sz: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 12px); }
  .avg--md { --sz: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 15px); }
  .avg--lg { --sz: var(--ctrl-h-lg, 56px); --fs: var(--ctrl-fs-lg, 20px); }
  .avg--xl { --sz: var(--ctrl-h-xl, 80px); --fs: var(--ctrl-fs-xl, 28px); }
  /* shapes */
  .avg--s-circle { --r: 50%; }
  .avg--s-rounded { --r: var(--ctrl-r-md, 12px); }
  .avg--s-squircle { --r: var(--ctrl-r-lg, 16px); }
  @supports (corner-shape: squircle) {
    .avg--s-squircle,
    .avg--s-squircle .avg__face,
    .avg--s-squircle .avg__halo { corner-shape: squircle; }
  }
  .avg--bordered .avg__face {
    box-shadow:
      0 0 0 2px var(--bg-card, #111),
      0 0 0 3px var(--inp-border, #2a2a2a);
  }
  .avg__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
    -webkit-user-drag: none;
  }
  .avg__initials {
    font-family: inherit;
    font-weight: 600;
    font-size: var(--fs);
    line-height: 1;
    letter-spacing: 0.02em;
  }
  .avg__placeholder {
    width: 62%;
    height: 62%;
    color: var(--inp-text, #ededed);
    opacity: 0.5;
  }
  /* ── breathing neon halo (self-animated, out of flow) ───────── */
  .avg__halo {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    z-index: 0;
    pointer-events: none;
    --spread: calc(6px * var(--avg-i, 1));
    box-shadow:
      0 0 var(--spread) calc(var(--spread) * 0.3) rgba(91, 140, 255, 0.35),
      0 0 calc(var(--spread) * 2) calc(var(--spread) * 0.6) rgba(91, 140, 255, 0.18);
    animation: avg-breathe 3s ease-in-out infinite;
  }
  /* tint the glow with the accent token where supported */
  @supports (color: color-mix(in srgb, red, blue)) {
    .avg__halo {
      box-shadow:
        0 0 var(--spread) calc(var(--spread) * 0.3) color-mix(in srgb, var(--accent, #5b8cff) 45%, transparent),
        0 0 calc(var(--spread) * 2) calc(var(--spread) * 0.6) color-mix(in srgb, var(--accent, #5b8cff) 22%, transparent);
    }
  }
  @keyframes avg-breathe {
    0%, 100% { opacity: 0.55; transform: scale(0.985); }
    50% { opacity: 1; transform: scale(1.015); }
  }
  .avg:hover .avg__halo {
    --spread: calc(11px * var(--avg-i, 1));
    animation-duration: 1.6s;
  }
  @media (prefers-reduced-motion: reduce) {
    .avg__halo { animation: none; }
  }
`,g="http://www.w3.org/2000/svg";function u(){const n=document.createElementNS(g,"svg");n.setAttribute("class","avg__placeholder"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("aria-hidden","true");for(const e of["M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z","M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"]){const t=document.createElementNS(g,"path");t.setAttribute("d",e),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),n.appendChild(t)}return n}let h;function f(n){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=n;const e=h.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(n,e){const t=e?f(String(e).trim()):null;if(!t){for(const r of b)n.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),i=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(r=>Math.round(i?r*.92:r+(255-r)*.16)),o=(r,p)=>n.style.setProperty(r,p);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(r,c);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(r,i?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])o(r,i?"0 0 0":"255 255 255");o("--vs-color",c),o("--vs-color-rgb",t.join(" ")),o("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["src","alt","name","size","shape","bordered","intensity","color"];#e;#s;#a;#t;#r;#n;#i=!1;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=v,this.#e=document.createElement("span"),this.#e.className="avg",this.#s=document.createElement("span"),this.#s.className="avg__halo",this.#s.setAttribute("aria-hidden","true"),this.#a=document.createElement("span"),this.#a.className="avg__face",this.#t=document.createElement("img"),this.#t.className="avg__img",this.#t.draggable=!1,this.#r=document.createElement("span"),this.#r.className="avg__initials",this.#r.setAttribute("aria-hidden","true"),this.#n=u(),this.#a.append(this.#t,this.#r,this.#n),this.#e.append(this.#s,this.#a),e.append(t,this.#e),this.#t.addEventListener("error",()=>{this.#i||(this.#i=!0,this.#o(),this.dispatchEvent(new CustomEvent("error",{bubbles:!0,composed:!0,detail:{src:this.getAttribute("src")}})))})}connectedCallback(){d(this,this.getAttribute("color")),this.#o()}attributeChangedCallback(e){d(this,this.getAttribute("color")),this.#e&&(e==="src"&&(this.#i=!1),this.#o())}#o(){const e=(o,r)=>this.getAttribute(o)??r,t=e("src",""),s=e("alt",""),a=e("name",""),i=!!t&&!this.#i,c=this.#c(a,s),l=this.#l(a,s);this.#e.className=`avg avg--${e("size","md")} avg--s-${e("shape","circle")}${this.#h("bordered",!0)?" avg--bordered":""}`,this.#e.style.setProperty("--avg-hue",l),this.#e.style.setProperty("--avg-i",e("intensity","1")),this.#t.style.display=i?"":"none",this.#r.style.display=!i&&c?"":"none",this.#n.style.display=!i&&!c?"":"none",i&&(this.#t.getAttribute("src")!==t&&this.#t.setAttribute("src",t),this.#t.alt=s||a),this.#r.textContent=c}#c(e,t){const s=(e||t||"").trim();if(!s)return"";const a=s.split(/\s+/);return a.length===1?a[0].slice(0,2).toUpperCase():(a[0][0]+a[a.length-1][0]).toUpperCase()}#l(e,t){const s=e||t||"";let a=0;for(let i=0;i<s.length;i++)a=(a*31+s.charCodeAt(i))%360;return a}#h(e,t){const s=this.getAttribute(e);return s===null?t:s!=="false"}}customElements.define("vs-avatar-glow",m);
