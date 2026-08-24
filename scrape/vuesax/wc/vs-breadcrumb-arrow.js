const u=`
  :host { display: inline-flex; max-width: 100%; }
  .bca {
    --fs: var(--ctrl-fs-md, 14px);
    --notch: 0.62em;
    --pad-x: 0.9em;
    --accent-rgb: var(--fx-tint, var(--ui-ring, 255 255 255));
    display: inline-flex;
    font-family: inherit;
    font-size: var(--fs);
    max-width: 100%;
  }
  .bca--sm { --fs: var(--ctrl-fs-sm, 13px); --notch: 0.55em; --pad-x: 0.8em; }
  .bca--md { --fs: var(--ctrl-fs-md, 14px); --notch: 0.62em; --pad-x: 0.9em; }
  .bca--lg { --fs: var(--ctrl-fs-lg, 15px); --notch: 0.72em; --pad-x: 1.05em; }

  .bca__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .bca__item {
    display: inline-flex;
    align-items: stretch;
    margin-left: -0.14em; /* overlap so chevrons nest */
  }
  .bca__item.is-first { margin-left: 0; }

  .bca__crumb {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0.4em var(--pad-x) 0.4em calc(var(--pad-x) + var(--notch));
    text-decoration: none;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    color: var(--text-muted, #8a8a8a);
    background: rgb(var(--accent-rgb) / 0.1);
    /* arrow/chevron shape: pointed right edge + notched left edge */
    clip-path: polygon(
      0 0, calc(100% - var(--notch)) 0, 100% 50%, calc(100% - var(--notch)) 100%,
      0 100%, var(--notch) 50%
    );
    transition: background-color 240ms ease, color 200ms ease, transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .bca__item.is-first .bca__crumb { padding-left: var(--pad-x); clip-path: polygon(0 0, calc(100% - var(--notch)) 0, 100% 50%, calc(100% - var(--notch)) 100%, 0 100%); }
  .bca__item.is-last .bca__crumb { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, var(--notch) 50%); }

  .bca__crumb:hover:not(.is-current):not(.is-disabled) {
    color: var(--text, #ededed);
    background: rgb(var(--accent-rgb) / 0.32);
    transform: translateX(3px);
  }
  .bca__crumb:focus-visible {
    outline: none;
    color: var(--text, #ededed);
    background: rgb(var(--accent-rgb) / 0.4);
  }
  .bca__crumb.is-current {
    cursor: default;
    color: var(--ui-accent-fg, #0b0b0b);
    background: var(--ui-accent, #ededed);
  }
  .bca__crumb.is-disabled { pointer-events: none; opacity: 0.4; }

  .bca__icon { display: inline-flex; align-items: center; justify-content: center; }
  .bca__icon svg { width: 1.05em; height: 1.05em; display: block; }

  .bca--t-danger { --accent-rgb: 255 99 105; }
  .bca--t-warn { --accent-rgb: 255 178 36; }
  .bca--t-success { --accent-rgb: 76 195 138; }

  .bca.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .bca__crumb { transition: background-color 120ms ease, color 120ms ease; }
    .bca__crumb:hover:not(.is-current):not(.is-disabled) { transform: none; }
  }
`,h=[{label:"Home"},{label:"Breadcrumb"}];let m;function f(l){if(m||=document.createElement("canvas").getContext("2d"),!m)return null;m.fillStyle="#000",m.fillStyle=l;const n=m.fillStyle;if(n.charAt(0)==="#")return[parseInt(n.slice(1,3),16),parseInt(n.slice(3,5),16),parseInt(n.slice(5,7),16)];const e=n.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(l,n){const e=n?f(String(n).trim()):null;if(!e){for(const t of g)l.style.removeProperty(t);return}const a=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),i=.2126*a(e[0])+.7152*a(e[1])+.0722*a(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,s=e.map(t=>Math.round(i?t*.92:t+(255-t)*.16)),r=(t,b)=>l.style.setProperty(t,b);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(t,o);r("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(t,e.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(t,i?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])r(t,i?"0 0 0":"255 255 255");r("--vs-color",o),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["size","tone","disabled","separator","color"];#t;#n;#e=null;constructor(){super();const n=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#t=document.createElement("nav"),this.#t.className="bca",this.#t.setAttribute("aria-label","Breadcrumb"),this.#n=document.createElement("ol"),this.#n.className="bca__list",this.#t.appendChild(this.#n),n.append(e,this.#t)}connectedCallback(){p(this,this.getAttribute("color")),this.#r(),this.#a()}disconnectedCallback(){this.#n.replaceChildren(),this.#e=null}attributeChangedCallback(){p(this,this.getAttribute("color")),this.#t&&this.#r()}set items(n){this.#e=Array.isArray(n)?n:null,this.isConnected&&this.#a()}get items(){return this.#e??h}#r(){const n=(e,a)=>this.getAttribute(e)??a;this.#t.className=`bca bca--${n("size","md")} bca--t-${n("tone","default")}${this.hasAttribute("disabled")?" is-disabled":""}`}#a(){const n=this.#e?.length?this.#e:h,e=n.length-1,a=document.createDocumentFragment();n.forEach((c,i)=>{const o=document.createElement("li");o.className=`bca__item${i===0?" is-first":""}${i===e?" is-last":""}`;const s=i===e,r=c.href&&!s,t=document.createElement(r?"a":"span");if(t.className=`bca__crumb${s?" is-current":""}${c.disabled?" is-disabled":""}`,r&&(t.href=c.href),s&&t.setAttribute("aria-current","page"),c.icon){const d=document.createElement("span");d.className="bca__icon",d.innerHTML=c.icon,t.appendChild(d)}const b=document.createElement("span");b.className="bca__text",b.textContent=c.label??"",t.appendChild(b),t.addEventListener("click",d=>this.#c(c,i,d)),o.appendChild(t),a.appendChild(o)}),this.#n.replaceChildren(a)}#c(n,e,a){const c=this.#e?.length?this.#e:h;this.hasAttribute("disabled")||n.disabled||e!==c.length-1&&(n.href||a.preventDefault(),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:n,index:e}})))}}customElements.define("vs-breadcrumb-arrow",v);
