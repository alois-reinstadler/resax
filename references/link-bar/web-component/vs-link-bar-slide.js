const p=[{label:"Product",href:"#"},{label:"Pricing",href:"#"},{label:"Docs",href:"#"},{label:"Contact",href:"#"}],u=`
  :host { display: inline-flex; max-width: 100%; }
  .vlbs {
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
  .vlbs--sm { --fs: var(--ctrl-fs-sm, 13px); gap: 12px; }
  .vlbs--md { --fs: var(--ctrl-fs-md, 14px); gap: 16px; }
  .vlbs--lg { --fs: var(--ctrl-fs-lg, 15px); gap: 20px; }

  .vlbs__link {
    position: relative;
    /* the flip track is only 1em tall — well under the 24px touch floor. The
       flex box raises the tap area and keeps the track centred inside it. */
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    font-size: var(--fs);
    line-height: 1;
    color: var(--text-muted, #8a8a8a);
    text-decoration: none;
    cursor: pointer;
  }
  /* screen-reader / no-motion label lives in normal flow but is hidden visually
     when the animated track is present */
  .vlbs__sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  .vlbs__track {
    position: relative;
    display: block;
    overflow: hidden;
    height: 1em;
  }
  .vlbs__line {
    display: block;
    line-height: 1;
    transition: transform 300ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
  }
  .vlbs__line--in {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--ui-accent, #ededed);
    transform: translateY(100%);
  }
  .vlbs__link:hover .vlbs__line,
  .vlbs__link.is-active .vlbs__line {
    transform: translateY(-100%);
  }
  .vlbs__link.is-active .vlbs__line--in {
    color: var(--text, #ededed);
  }
  .vlbs__link:focus-visible {
    outline: 2px solid var(--ui-accent, #ededed);
    outline-offset: 4px;
    border-radius: 2px;
  }
  .vlbs__sep {
    width: 1px;
    align-self: center;
    height: 14px;
    background: var(--ctrl-border, var(--text-muted, #8a8a8a));
    opacity: 0.35;
  }

  /* persistent sliding underline — its x/y/width are driven imperatively.
     Anchored to the nav's TOP: pinned to the bottom it would strand on the last
     row the moment the bar wraps, floating under the wrong label. */
  .vlbs__underline {
    position: absolute;
    left: 0;
    top: 0;
    height: 2px;
    width: 0;
    border-radius: 999px;
    background: var(--ui-accent, #ededed);
    transform: translateX(0);
    pointer-events: none;
  }
  .vlbs__underline.is-ready {
    transition:
      transform 300ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      width 300ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
  }

  /* tone → accent tint (drives both the flip's accent copy and the underline) */
  .vlbs--t-danger  { --accent: var(--danger, #ff6369); }
  .vlbs--t-success { --accent: var(--success, #4cc38a); }
  .vlbs--t-warn    { --accent: var(--warn, #ffb224); }

  @media (prefers-reduced-motion: reduce) {
    .vlbs__line { transition: none; }
    /* keep only the top line static, no vertical slide */
    .vlbs__link:hover .vlbs__line,
    .vlbs__link.is-active .vlbs__line { transform: none; }
    .vlbs__line--in { display: none; }
    .vlbs__link:hover,
    .vlbs__link.is-active { color: var(--text, #ededed); }
    .vlbs__underline.is-ready { transition: none; }
  }
`;let b;function v(c){if(b||=document.createElement("canvas").getContext("2d"),!b)return null;b.fillStyle="#000",b.fillStyle=c;const t=b.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(c,t){const e=t?v(String(t).trim()):null;if(!e){for(const s of m)c.style.removeProperty(s);return}const n=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),l=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(s=>Math.round(l?s*.92:s+(255-s)*.16)),r=(s,h)=>c.style.setProperty(s,h);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(s,a);r("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(s,l?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])r(s,l?"0 0 0":"255 255 255");r("--vs-color",a),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["active","value","size","tone","separated","color"];#t;#e;#a=null;#i=[];#n=null;#s=0;#o=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#t=document.createElement("nav"),this.#t.className="vlbs",this.#t.setAttribute("aria-label","Links"),this.#e=document.createElement("span"),this.#e.className="vlbs__underline",this.#e.setAttribute("aria-hidden","true"),this.#t.appendChild(this.#e),t.append(e,this.#t)}connectedCallback(){f(this,this.getAttribute("color")),this.#h(),this.#d(),this.#n=new ResizeObserver(()=>this.#r()),this.#n.observe(this.#t),this.#r()}disconnectedCallback(){this.#n?.disconnect(),this.#n=null,this.#s&&cancelAnimationFrame(this.#s),this.#s=0}attributeChangedCallback(){f(this,this.getAttribute("color")),this.#t&&(this.#h(),this.#b(),this.#r())}set items(t){this.#a=Array.isArray(t)&&t.length?t:null,this.#t&&(this.#d(),this.#r())}get items(){return this.#a??p}get active(){const t=this.getAttribute("active")??this.getAttribute("value")??"0",e=parseInt(t,10);return Number.isFinite(e)?e:0}set active(t){this.setAttribute("active",String(t))}#c(){return this.#a??p}#l(){const t=this.#c();return Math.max(0,Math.min(this.active,t.length-1))}#h(){const t=(e,n)=>this.getAttribute(e)??n;this.#t.className=`vlbs vlbs--${t("size","md")} vlbs--t-${t("tone","default")}`}#d(){for(const i of[...this.#t.childNodes])i!==this.#e&&i.remove();this.#i=[];const t=this.#c(),e=this.#l(),n=(this.getAttribute("separated")??"true")!=="false";t.forEach((i,l)=>{const a=document.createElement("a");a.className="vlbs__link"+(l===e?" is-active":""),a.href=i.href??"#",l===e&&a.setAttribute("aria-current","page");const o=document.createElement("span");o.className="vlbs__track",o.setAttribute("aria-hidden","true");const r=document.createElement("span");r.className="vlbs__line",r.textContent=i.label;const s=document.createElement("span");s.className="vlbs__line vlbs__line--in",s.textContent=i.label,o.append(r,s);const h=document.createElement("span");if(h.className="vlbs__sr",h.textContent=i.label,a.append(o,h),a.addEventListener("click",d=>this.#f(i,l,d)),this.#t.appendChild(a),this.#i.push(a),n&&l<t.length-1){const d=document.createElement("span");d.className="vlbs__sep",d.setAttribute("aria-hidden","true"),this.#t.appendChild(d)}})}#b(){const t=this.#l();this.#i.forEach((e,n)=>{const i=n===t;e.classList.toggle("is-active",i),i?e.setAttribute("aria-current","page"):e.removeAttribute("aria-current")})}#r(){this.#s||(this.#s=requestAnimationFrame(()=>this.#p()))}#p(){this.#s=0;const t=this.#i[this.#l()];if(!t){this.#e.style.width="0";return}const e=t.offsetLeft,n=t.offsetWidth,i=t.offsetTop+t.offsetHeight;this.#e.style.width=`${n}px`,this.#e.style.transform=`translate(${e}px, ${i}px)`,this.#o||(this.#e.getBoundingClientRect(),this.#e.classList.add("is-ready"),this.#o=!0)}#f(t,e,n){(!t.href||t.href==="#")&&n.preventDefault(),this.active=e;const i={item:t,index:e};this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:i})),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:i}))}}customElements.define("vs-link-bar-slide",g);
