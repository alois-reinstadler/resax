const u=[{label:"Product",href:"#"},{label:"Pricing",href:"#"},{label:"Docs",href:"#"},{label:"Contact",href:"#"}],b=`
  :host { display: inline-flex; max-width: 100%; }
  .vlbu {
    --fs: 14px;
    position: relative;               /* underline offsetParent */
    display: inline-flex;
    align-items: center;
    /* a nav that cannot wrap can only overflow; gap doubles as the row-gap that
       keeps row 1's underline off row 2's labels */
    flex-wrap: wrap;
    max-width: 100%;
    gap: 16px;
    padding-bottom: 4px;              /* room for the underline */
    font-family: inherit;
    font-size: var(--fs);
  }
  .vlbu--sm { --fs: var(--ctrl-fs-sm, 13px); gap: 12px; }
  .vlbu--md { --fs: var(--ctrl-fs-md, 14px); gap: 16px; }
  .vlbu--lg { --fs: var(--ctrl-fs-lg, 15px); gap: 20px; }

  .vlbu__link {
    position: relative;
    /* a bare text run is 14px tall — under the 24px touch floor. The flex box
       floors the tap area with the label still centred on its own line. */
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    font-size: var(--fs);
    line-height: 1;
    color: var(--text-muted, #8a8a8a);
    text-decoration: none;
    cursor: pointer;
    transition: color 180ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
  }
  .vlbu__link:hover { color: var(--text, #ededed); }
  .vlbu__link.is-active { color: var(--text, #ededed); }
  .vlbu__link:focus-visible {
    outline: 2px solid var(--ui-accent, #ededed);
    outline-offset: 4px;
    border-radius: 2px;
  }
  .vlbu__sep {
    width: 1px;
    align-self: center;
    height: 14px;
    background: var(--ctrl-border, var(--text-muted, #8a8a8a));
    opacity: 0.35;
  }

  /* persistent sliding underline — its x/y/width are driven imperatively.
     Anchored to the nav's TOP: pinned to the bottom it would strand on the last
     row the moment the bar wraps, floating under the wrong label. */
  .vlbu__bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 2px;
    width: 0;
    border-radius: 2px;
    background: var(--ui-accent, #ededed);
    transform: translateX(0);
    pointer-events: none;
  }
  .vlbu__bar.is-ready {
    transition:
      transform 260ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      width 260ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
  }

  /* tone → accent tint (drives the underline color) */
  .vlbu--t-danger  { --accent: var(--danger, #ff6369); }
  .vlbu--t-success { --accent: var(--success, #4cc38a); }
  .vlbu--t-warn    { --accent: var(--warn, #ffb224); }

  @media (prefers-reduced-motion: reduce) {
    .vlbu__link { transition: none; }
    .vlbu__bar.is-ready { transition: none; }
  }
`;let h;function p(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(c,t){const e=t?p(String(t).trim()):null;if(!e){for(const i of v)c.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),a=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,r=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(i=>Math.round(a?i*.92:i+(255-i)*.16)),l=(i,f)=>c.style.setProperty(i,f);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(i,r);l("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(i,a?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])l(i,a?"0 0 0":"255 255 255");l("--vs-color",r),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["active","value","size","tone","separated","color"];#t;#e;#a=null;#s=[];#n=null;#i=0;#l=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#t=document.createElement("nav"),this.#t.className="vlbu",this.#t.setAttribute("aria-label","Links"),this.#e=document.createElement("span"),this.#e.className="vlbu__bar",this.#e.setAttribute("aria-hidden","true"),this.#t.appendChild(this.#e),t.append(e,this.#t)}connectedCallback(){d(this,this.getAttribute("color")),this.#h(),this.#u(),this.#n=new ResizeObserver(()=>this.#r()),this.#n.observe(this.#t),this.#r()}disconnectedCallback(){this.#n?.disconnect(),this.#n=null,this.#i&&cancelAnimationFrame(this.#i),this.#i=0}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#t&&(this.#h(),this.#d(),this.#r())}set links(t){this.#a=Array.isArray(t)&&t.length?t:null,this.#t&&(this.#u(),this.#r())}get links(){return this.#a??u}set items(t){this.links=t}get items(){return this.links}get active(){const t=this.getAttribute("active")??this.getAttribute("value")??"0",e=parseInt(t,10);return Number.isFinite(e)?e:0}set active(t){this.setAttribute("active",String(t))}#c(){return this.#a??u}#o(){const t=this.#c();return Math.max(0,Math.min(this.active,t.length-1))}#h(){const t=(e,n)=>this.getAttribute(e)??n;this.#t.className=`vlbu vlbu--${t("size","md")} vlbu--t-${t("tone","default")}`}#u(){for(const s of[...this.#t.childNodes])s!==this.#e&&s.remove();this.#s=[];const t=this.#c(),e=this.#o(),n=(this.getAttribute("separated")??"true")!=="false";t.forEach((s,a)=>{const r=document.createElement("a");if(r.className="vlbu__link"+(a===e?" is-active":""),r.href=s.href??"#",r.textContent=s.label,a===e&&r.setAttribute("aria-current","page"),r.addEventListener("click",o=>this.#b(s,a,o)),this.#t.appendChild(r),this.#s.push(r),n&&a<t.length-1){const o=document.createElement("span");o.className="vlbu__sep",o.setAttribute("aria-hidden","true"),this.#t.appendChild(o)}})}#d(){const t=this.#o();this.#s.forEach((e,n)=>{const s=n===t;e.classList.toggle("is-active",s),s?e.setAttribute("aria-current","page"):e.removeAttribute("aria-current")})}#r(){this.#i||(this.#i=requestAnimationFrame(()=>this.#f()))}#f(){this.#i=0;const t=this.#s[this.#o()];if(!t){this.#e.style.width="0";return}const e=t.offsetLeft,n=t.offsetWidth,s=t.offsetTop+t.offsetHeight;this.#e.style.width=`${n}px`,this.#e.style.transform=`translate(${e}px, ${s}px)`,this.#l||(this.#e.getBoundingClientRect(),this.#e.classList.add("is-ready"),this.#l=!0)}#b(t,e,n){(!t.href||t.href==="#")&&n.preventDefault(),this.active=e;const s={item:t,index:e};this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:s})),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:s}))}}customElements.define("vs-link-bar-underline",g);
