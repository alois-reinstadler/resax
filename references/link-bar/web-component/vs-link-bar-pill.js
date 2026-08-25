const h=[{label:"Product",href:"#"},{label:"Pricing",href:"#"},{label:"Docs",href:"#"},{label:"Contact",href:"#"}],b=`
  :host { display: inline-flex; max-width: 100%; }
  .vlbp {
    --fs: 14px;
    --px: 14px;
    --py: 8px;
    --accent: var(--ui-accent, #ededed);
    position: relative;
    display: inline-flex;
    /* four pills + separators need ~348px; without wrapping the last one is
       simply chopped off. The pill node reads offsetTop as well as offsetLeft,
       so it follows the active link down to the second row. */
    flex-wrap: wrap;
    max-width: 100%;
    align-items: center;
    gap: 6px;
    font-family: inherit;
  }
  .vlbp--sm { --fs: 13px; --px: 12px; --py: 6px; }
  .vlbp--md { --fs: 14px; --px: 14px; --py: 8px; }
  .vlbp--lg { --fs: 15px; --px: 18px; --py: 10px; }

  /* One persistent pill that slides under the active link. left/width are set
     imperatively; the transition here is what makes it glide like a capsule. */
  .vlbp__pill {
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--ui-accent, #ededed) 16%, transparent);
    pointer-events: none;
    z-index: 0;
    opacity: 0;
    transform: translateX(0);
    transition:
      transform 420ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      width 420ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      opacity 200ms ease;
  }
  .vlbp.is-ready .vlbp__pill { opacity: 1; }

  .vlbp__link {
    position: relative;
    z-index: 1;
    /* --py already clears 24px at every size; the floor is here so a caller who
       shrinks the padding cannot drop the tap area below the touch minimum.
       border-box or min-height would measure the content alone and stack the
       padding on top of it, growing every pill by 10px. */
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    min-height: 24px;
    font-size: var(--fs);
    line-height: 1;
    padding: var(--py) var(--px);
    border-radius: 999px;
    color: var(--text-muted, #8a8a8a);
    text-decoration: none;
    background: transparent;
    white-space: nowrap;
    transition:
      color 180ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      background-color 200ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      transform 200ms var(--ease-out, cubic-bezier(0.34, 1.56, 0.64, 1));
  }
  .vlbp__link:hover {
    color: var(--text, #ededed);
    background: color-mix(in srgb, var(--text, #ededed) 10%, transparent);
    transform: translateY(-1px);
  }
  .vlbp__link.is-active {
    color: var(--ui-accent, #ededed);
  }
  .vlbp__link:focus-visible {
    outline: 2px solid var(--ui-accent, #ededed);
    outline-offset: 2px;
  }
  .vlbp__sep {
    width: 1px;
    align-self: center;
    height: 14px;
    background: var(--ctrl-border, var(--text-muted, #8a8a8a));
    opacity: 0.35;
    margin: 0 4px;
  }

  .vlbp--t-danger { --accent: 255 99 105; --accent: #ff6369; --ui-accent-fg: #fff; }
  .vlbp--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }
  .vlbp--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }

  @media (prefers-reduced-motion: reduce) {
    .vlbp__link { transition: color 180ms linear, background-color 180ms linear; }
    .vlbp__link:hover { transform: none; }
    .vlbp__pill { transition: opacity 200ms ease; }
  }
`;let p;function u(c){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=c;const t=p.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(c,t){const e=t?u(String(t).trim()):null;if(!e){for(const i of v)c.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),a=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(i=>Math.round(a?i*.92:i+(255-i)*.16)),o=(i,f)=>c.style.setProperty(i,f);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(i,n);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(i,a?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])o(i,a?"0 0 0":"255 255 255");o("--vs-color",n),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["active","value","size","tone","separated","color"];#t;#e;#s=[];#a=null;#r=null;#i=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#t=document.createElement("nav"),this.#t.className="vlbp",this.#t.setAttribute("aria-label","Links"),this.#e=document.createElement("span"),this.#e.className="vlbp__pill",this.#e.setAttribute("aria-hidden","true"),this.#t.appendChild(this.#e),t.append(e,this.#t)}connectedCallback(){d(this,this.getAttribute("color")),this.#c(),this.#l(),this.#r=new ResizeObserver(()=>this.#n()),this.#r.observe(this.#t),this.#n()}disconnectedCallback(){this.#r?.disconnect(),this.#r=null,this.#i&&cancelAnimationFrame(this.#i),this.#i=0}attributeChangedCallback(t){d(this,this.getAttribute("color")),this.#t&&(this.#c(),t==="separated"&&this.#l(),this.#p())}set items(t){this.#a=Array.isArray(t)&&t.length?t:null,this.#t&&this.#l()}get items(){return this.#a??h}set active(t){this.setAttribute("active",String(t))}get active(){const t=this.getAttribute("active")??this.getAttribute("value"),e=Number.parseInt(t??"0",10),s=this.#s.length||this.#o().length;return Number.isFinite(e)?Math.max(0,Math.min(e,s-1)):0}#o(){return this.#a??h}#c(){const t=(e,s)=>this.getAttribute(e)??s;this.#t.className=`vlbp vlbp--${t("size","md")} vlbp--t-${t("tone","default")}${this.#t.classList.contains("is-ready")?" is-ready":""}`}#l(){const t=this.#o(),e=this.hasAttribute("separated")?this.hasAttribute("separated"):!0;for(;this.#t.lastChild&&this.#t.lastChild!==this.#e;)this.#t.removeChild(this.#t.lastChild);this.#s=[];const s=this.active;t.forEach((r,a)=>{const n=document.createElement("a");if(n.className="vlbp__link"+(a===s?" is-active":""),n.href=r.href??"#",n.textContent=r.label,a===s&&n.setAttribute("aria-current","page"),n.addEventListener("click",l=>this.#h(r,a,l)),this.#t.appendChild(n),this.#s.push(n),e&&a<t.length-1){const l=document.createElement("span");l.className="vlbp__sep",l.setAttribute("aria-hidden","true"),this.#t.appendChild(l)}}),this.#n()}#p(){const t=this.active;this.#s.forEach((e,s)=>{const r=s===t;e.classList.toggle("is-active",r),r?e.setAttribute("aria-current","page"):e.removeAttribute("aria-current")}),this.#n()}#n(){this.#i||(this.#i=requestAnimationFrame(()=>{this.#i=0;const t=this.#s[this.active];t&&(this.#e.style.transform=`translateX(${t.offsetLeft}px)`,this.#e.style.width=`${t.offsetWidth}px`,this.#e.style.top=`${t.offsetTop}px`,this.#e.style.height=`${t.offsetHeight}px`,this.#t.classList.contains("is-ready")||this.#t.classList.add("is-ready"))}))}#h(t,e,s){(!t.href||t.href==="#")&&s.preventDefault(),this.active=e;const r={item:t,index:e};this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:r})),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:r}))}}customElements.define("vs-link-bar-pill",m);
