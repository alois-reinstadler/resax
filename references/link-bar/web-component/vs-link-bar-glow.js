const p=`
  /* shrink-to-fit host: without max-width it keeps its widest natural size and
     shoves the whole bar out of a narrow column */
  :host { display: inline-flex; max-width: 100%; }
  .vlbg {
    display: inline-flex;
    align-items: center;
    /* a nav that cannot wrap can only overflow; the 18px gap doubles as row-gap */
    flex-wrap: wrap;
    max-width: 100%;
    gap: 18px;
    font-family: inherit;
  }
  .vlbg__link {
    position: relative;
    /* a bare text run is 14px tall — under the 24px touch floor. The flex box
       floors the tap area; the glow is a text-shadow, so nothing else moves. */
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    font-size: 14px;
    line-height: 1;
    color: var(--text-muted, #8a8a8a);
    text-decoration: none;
    transition:
      color 200ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      text-shadow 240ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
  }
  .vlbg__link:hover {
    color: var(--ui-accent, #ededed);
    text-shadow:
      0 0 6px color-mix(in srgb, var(--ui-accent, #ededed) 70%, transparent),
      0 0 16px color-mix(in srgb, var(--ui-accent, #ededed) 45%, transparent);
  }
  .vlbg__link.is-active {
    color: var(--text, #ededed);
    animation: vlbg-pulse 2400ms ease-in-out infinite;
  }
  .vlbg__link:focus-visible {
    outline: 2px solid var(--ui-accent, #ededed);
    outline-offset: 4px;
    border-radius: 2px;
  }
  @keyframes vlbg-pulse {
    0%, 100% {
      text-shadow: 0 0 4px color-mix(in srgb, var(--ui-accent, #ededed) 30%, transparent);
    }
    50% {
      text-shadow:
        0 0 8px color-mix(in srgb, var(--ui-accent, #ededed) 65%, transparent),
        0 0 20px color-mix(in srgb, var(--ui-accent, #ededed) 40%, transparent);
    }
  }
  .vlbg__sep {
    width: 1px;
    align-self: center;
    height: 14px;
    background: var(--ctrl-border, var(--text-muted, #8a8a8a));
    opacity: 0.35;
  }

  @media (prefers-reduced-motion: reduce) {
    .vlbg__link {
      transition: color 180ms linear;
    }
    .vlbg__link:hover {
      text-shadow: none;
    }
    .vlbg__link.is-active {
      animation: none;
    }
  }
`,d=[{label:"Product",href:"#"},{label:"Pricing",href:"#"},{label:"Docs",href:"#"},{label:"Contact",href:"#"}];let h;function g(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(c,t){const e=t?g(String(t).trim()):null;if(!e){for(const i of f)c.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),r=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(i=>Math.round(r?i*.92:i+(255-i)*.16)),a=(i,b)=>c.style.setProperty(i,b);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(i,n);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(i,r?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])a(i,r?"0 0 0":"255 255 255");a("--vs-color",n),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["active","value","separated","color"];#t;#e=null;#i=[];constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=p,this.#t=document.createElement("nav"),this.#t.className="vlbg",this.#t.setAttribute("aria-label","Links"),t.append(e,this.#t),this.#t.addEventListener("click",this.#r)}set items(t){this.#e=Array.isArray(t)?t:null,this.#n()}get items(){return this.#e??d}get active(){const t=Number(this.getAttribute("active")??this.getAttribute("value"));return Number.isFinite(t)?t:0}set active(t){this.setAttribute("active",String(t))}connectedCallback(){u(this,this.getAttribute("color")),this.#n()}disconnectedCallback(){this.#t.removeEventListener("click",this.#r)}attributeChangedCallback(t){u(this,this.getAttribute("color")),this.#t&&(t==="separated"?this.#n():this.#s())}#s(){const t=this.active;this.#i.forEach((e,s)=>{const o=s===t;e.classList.toggle("is-active",o),o?e.setAttribute("aria-current","page"):e.removeAttribute("aria-current")})}#n(){if(!this.#t)return;const t=this.#e?.length?this.#e:d,e=this.hasAttribute("separated")&&this.hasAttribute("separated"),s=this.active;this.#t.textContent="",this.#i=[],t.forEach((o,r)=>{const n=document.createElement("a");if(n.className="vlbg__link",n.href=o.href??"#",n.textContent=o.label??"",n.dataset.i=r,r===s&&(n.classList.add("is-active"),n.setAttribute("aria-current","page")),this.#t.append(n),this.#i.push(n),e&&r<t.length-1){const l=document.createElement("span");l.className="vlbg__sep",l.setAttribute("aria-hidden","true"),this.#t.append(l)}})}#r=t=>{const e=t.target.closest(".vlbg__link");if(!e)return;const s=Number(e.dataset.i),r=(this.#e?.length?this.#e:d)[s];if(!r)return;(!r.href||r.href==="#")&&t.preventDefault(),this.active=s;const n={item:r,index:s};this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:n})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:n}))}}customElements.define("vs-link-bar-glow",v);
