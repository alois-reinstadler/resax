const b=`
  /* shrink-to-fit host: without max-width it keeps its widest natural size and
     shoves the whole bar out of a narrow column */
  :host { display: inline-flex; max-width: 100%; }
  .vlb {
    position: relative;
    display: inline-flex;
    align-items: center;
    /* a nav that cannot wrap can only overflow; the 16px gap doubles as row-gap */
    flex-wrap: wrap;
    max-width: 100%;
    gap: 16px;
    font-family: inherit;
  }
  .vlb__link {
    position: relative;
    /* a bare text run is 14px tall — under the 24px touch floor. The flex box
       floors the tap area without moving the label off its own baseline. */
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    font-size: 14px;
    line-height: 1;
    color: var(--text-secondary, #a8a8a8);
    text-decoration: none;
    transition: color 180ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
  }
  .vlb__link::after {
    content: '';
    position: absolute;
    left: 0;
    /* the touch box pads 5px of half-leading under the label, so the rule hugs
       the text from inside the box instead of hanging below it */
    bottom: 1px;
    width: 100%;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 240ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
  }
  .vlb__link:hover {
    color: var(--text, #ededed);
  }
  .vlb__link:hover::after {
    transform: scaleX(1);
  }
  .vlb__link:focus-visible {
    outline: 2px solid var(--ui-accent, #ededed);
    outline-offset: 4px;
    border-radius: 2px;
  }
  .vlb__link--active { color: var(--text, #ededed); }
  /* the vertical separator stays short next to text */
  .vlb__sep {
    width: 1px;
    min-height: 14px;
    align-self: center;
    background: var(--border, #2a2a2a);
  }
  /* persistent active-indicator — a single node that slides left/width in place */
  /* anchored to the nav's TOP, not its bottom: once the row wraps, the bottom
     edge belongs to the last row and the indicator would strand there */
  .vlb__ind {
    position: absolute;
    left: 0;
    top: 0;
    height: 1px;
    width: 0;
    background: var(--ui-accent, #ededed);
    transform: translateX(0);
    opacity: 0;
    pointer-events: none;
    transition: transform 260ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
                width 260ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
                opacity 180ms;
  }
  @media (prefers-reduced-motion: reduce) {
    .vlb__link, .vlb__link::after, .vlb__ind { transition: none; }
  }
`;let c;function u(l){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=l;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const p=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(l,t){const e=t?u(String(t).trim()):null;if(!e){for(const i of p)l.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),s=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(i=>Math.round(s?i*.92:i+(255-i)*.16)),r=(i,d)=>l.style.setProperty(i,d);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(i,o);r("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(i,s?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])r(i,s?"0 0 0":"255 255 255");r("--vs-color",o),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["active","value","separated","color"];#t;#e;#s=[];#i=[{label:"Product",href:"#"},{label:"Pricing",href:"#"},{label:"Docs",href:"#"},{label:"Contact",href:"#"}];#r;#n=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#t=document.createElement("nav"),this.#t.className="vlb",this.#t.setAttribute("aria-label","Links"),this.#e=document.createElement("span"),this.#e.className="vlb__ind",this.#e.setAttribute("aria-hidden","true"),this.#t.append(this.#e),t.append(e,this.#t)}connectedCallback(){f(this,this.getAttribute("color")),this.#o(),this.#r=new ResizeObserver(()=>this.#c()),this.#r.observe(this.#t)}disconnectedCallback(){this.#r?.disconnect(),this.#r=null,this.#n&&(cancelAnimationFrame(this.#n),this.#n=0);for(const t of this.#s)t.onclick=null}attributeChangedCallback(){f(this,this.getAttribute("color")),this.#t&&this.#l()}set links(t){Array.isArray(t)&&(this.#i=t,this.#t&&this.#o())}get links(){return this.#i}set items(t){this.links=t}get items(){return this.#i}get active(){const t=this.getAttribute("active");return t==null?-1:Number(t)}set active(t){this.setAttribute("active",String(t))}#h(){return this.hasAttribute("separated")}#a(){const t=this.getAttribute("active");if(t!=null&&t!==""){const n=Number(t);if(!Number.isNaN(n))return n;const a=this.#i.findIndex(s=>s.label===t||s.href===t);if(a!==-1)return a}const e=this.getAttribute("value");return e!=null?this.#i.findIndex(n=>n.href===e||n.label===e):-1}#o(){for(const n of this.#s)n.onclick=null;for(;this.#t.lastChild&&this.#t.lastChild!==this.#e;)this.#t.removeChild(this.#t.lastChild);this.#s=[];const t=this.#h(),e=this.#i.length;this.#i.forEach((n,a)=>{const s=document.createElement("a");if(s.className="vlb__link",s.href=n.href??"#",s.textContent=n.label,s.onclick=()=>{this.active=a,this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:n,index:a}}))},this.#t.append(s),this.#s.push(s),t&&a<e-1){const o=document.createElement("span");o.className="vlb__sep",o.setAttribute("aria-hidden","true"),this.#t.append(o)}}),this.#l()}#l(){const t=this.#a();this.#s.forEach((e,n)=>e.classList.toggle("vlb__link--active",n===t)),this.#c()}#c(){const t=this.#s[this.#a()];if(!t){this.#e.style.opacity="0";return}this.#n&&cancelAnimationFrame(this.#n),this.#n=requestAnimationFrame(()=>{this.#n=0,this.#e.style.opacity="1",this.#e.style.width=`${t.offsetWidth}px`,this.#e.style.transform=`translate(${t.offsetLeft}px, ${t.offsetTop+t.offsetHeight-2}px)`})}}customElements.define("vs-link-bar",m);
