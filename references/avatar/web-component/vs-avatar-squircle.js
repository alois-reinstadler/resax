const f=`
  :host { display: inline-flex; }
  .avq {
    --sz: var(--ctrl-h-md, 40px);
    --fs: var(--ctrl-fs-md, 15px);
    --spring: linear(
      0, 0.009, 0.035, 0.078, 0.137, 0.211, 0.298, 0.396, 0.501, 0.609,
      0.715, 0.815, 0.905, 0.981, 1.04, 1.083, 1.108, 1.117, 1.114, 1.1,
      1.08, 1.057, 1.034, 1.014, 0.998, 0.987, 0.981, 0.979, 0.981, 0.985,
      0.99, 0.995, 0.999, 1.001, 1.002, 1.001, 1
    );
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sz);
    height: var(--sz);
    border-radius: var(--avq-r, 28%);
    flex: none;
    user-select: none;
    cursor: pointer;
    transition: transform 520ms var(--spring);
  }
  @supports (corner-shape: squircle) {
    .avq, .avq__face { corner-shape: squircle; border-radius: calc(var(--avq-r, 28%) * 1.35); }
  }

  .avq__face {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    overflow: hidden;
    background: var(--vs-color, hsl(var(--avq-hue, 220) 45% 22%));
    color: var(--vs-color-fg, hsl(var(--avq-hue, 220) 70% 78%));
  }

  /* sizes */
  .avq--xs { --sz: var(--ctrl-h-xs, 24px); --fs: var(--ctrl-fs-xs, 10px); }
  .avq--sm { --sz: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 12px); }
  .avq--md { --sz: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 15px); }
  .avq--lg { --sz: var(--ctrl-h-lg, 56px); --fs: var(--ctrl-fs-lg, 20px); }
  .avq--xl { --sz: var(--ctrl-h-xl, 80px); --fs: var(--ctrl-fs-xl, 28px); }

  .avq--bordered .avq__face {
    box-shadow:
      0 0 0 2px var(--bg-card, #111),
      0 0 0 3px var(--inp-border, #2a2a2a);
  }

  .avq__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
    -webkit-user-drag: none;
  }
  .avq__initials {
    font-family: inherit;
    font-weight: 600;
    font-size: var(--fs);
    line-height: 1;
    letter-spacing: 0.02em;
  }
  .avq__placeholder {
    width: 62%;
    height: 62%;
    color: var(--inp-text, #ededed);
    opacity: 0.5;
  }

  /* ── gummy elastic pop on hover ─────────────────────────────── */
  .avq:hover { transform: scale(1.12) rotate(-2deg); }
  .avq:active { transform: scale(0.96); transition-duration: 160ms; }

  @media (prefers-reduced-motion: reduce) {
    .avq { transition: none; }
    .avq:hover { transform: none; }
    .avq:active { transform: none; }
  }
`,u="http://www.w3.org/2000/svg";let l;function p(o){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=o;const r=l.fillStyle;if(r.charAt(0)==="#")return[parseInt(r.slice(1,3),16),parseInt(r.slice(3,5),16),parseInt(r.slice(5,7),16)];const t=r.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(o,r){const t=r?p(String(r).trim()):null;if(!t){for(const e of m)o.style.removeProperty(e);return}const s=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),a=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,h=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(e=>Math.round(a?e*.92:e+(255-e)*.16)),i=(e,v)=>o.style.setProperty(e,v);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(e,h);i("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(e,a?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])i(e,a?"0 0 0":"255 255 255");i("--vs-color",h),i("--vs-color-rgb",t.join(" ")),i("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["src","alt","name","size","bordered","curvature","color"];#e;#i;#t;#s;#r;#n=!1;constructor(){super();const r=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=f,this.#e=document.createElement("span"),this.#e.className="avq",this.#i=document.createElement("span"),this.#i.className="avq__face",this.#t=document.createElement("img"),this.#t.className="avq__img",this.#t.draggable=!1,this.#t.addEventListener("error",()=>{this.#n||(this.#n=!0,this.#a())}),this.#s=document.createElement("span"),this.#s.className="avq__initials",this.#s.setAttribute("aria-hidden","true"),this.#r=document.createElementNS(u,"svg"),this.#r.setAttribute("class","avq__placeholder"),this.#r.setAttribute("viewBox","0 0 24 24"),this.#r.setAttribute("fill","none"),this.#r.setAttribute("aria-hidden","true");for(const s of["M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z","M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"]){const n=document.createElementNS(u,"path");n.setAttribute("d",s),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","1.5"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),this.#r.appendChild(n)}this.#i.append(this.#t,this.#s,this.#r),this.#e.append(this.#i),r.append(t,this.#e)}connectedCallback(){d(this,this.getAttribute("color")),this.#a()}attributeChangedCallback(r,t,s){d(this,this.getAttribute("color")),r==="src"&&t!==s&&(this.#n=!1),this.#e&&this.#a()}#o(){const r=(this.getAttribute("name")||this.getAttribute("alt")||"").trim();if(!r)return"";const t=r.split(/\s+/);return t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase()}#c(){const r=this.getAttribute("name")||this.getAttribute("alt")||"";let t=0;for(let s=0;s<r.length;s++)t=(t*31+r.charCodeAt(s))%360;return t}#a(){const r=this.getAttribute("src")||"",t=this.getAttribute("alt")||"",s=this.getAttribute("name")||"",n=this.getAttribute("size")||"md",a=this.getAttribute("bordered"),h=a===null?!0:a!=="false",c=Number.isFinite(+this.getAttribute("curvature"))?+this.getAttribute("curvature"):.55;this.#e.className=`avq avq--${n}${h?" avq--bordered":""}`,this.#e.style.setProperty("--avq-hue",String(this.#c())),this.#e.style.setProperty("--avq-r",`${Math.max(0,Math.min(1,c))*45}%`);const i=this.#o(),e=!!r&&!this.#n;e?(this.#t.src=r,this.#t.alt=t||s):this.#t.removeAttribute("src"),this.#s.textContent=i,this.#t.style.display=e?"":"none",this.#s.style.display=!e&&i?"":"none",this.#r.style.display=!e&&!i?"":"none"}disconnectedCallback(){this.#t&&this.#t.removeAttribute("src")}}customElements.define("vs-avatar-squircle",g);
