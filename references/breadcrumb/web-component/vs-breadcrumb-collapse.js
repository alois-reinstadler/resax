const u=`
  :host { display: inline-flex; max-width: 100%; }
  .bcc {
    --fs: var(--ctrl-fs-md, 14px);
    --gap: 8px;
    --sep-size: 16px;
    --accent-rgb: var(--fx-tint, var(--ui-ring, 255 255 255));
    display: inline-flex;
    font-family: inherit;
    font-size: var(--fs);
    max-width: 100%;
  }
  .bcc--sm { --fs: var(--ctrl-fs-sm, 13px); --gap: 6px; --sep-size: 14px; }
  .bcc--md { --fs: var(--ctrl-fs-md, 14px); --gap: 8px; --sep-size: 16px; }
  .bcc--lg { --fs: var(--ctrl-fs-lg, 15px); --gap: 10px; --sep-size: 18px; }

  .bcc__list {
    display: flex;
    /* This component exists so a long trail FITS on one line — wrapping was
       working against that: in a narrow box the last crumb dropped to a second
       row under the ellipsis instead of the trail staying a single line. */
    flex-wrap: nowrap;
    min-width: 0;
    align-items: center;
    gap: 0 var(--gap);
    /* Expanding a 5-crumb trail inside a narrow box still overruns; scroll it
       instead of letting it spill. The padding/negative-margin pair is there so
       the implied vertical clipping (overflow-x forces overflow-y: auto) does
       not bite the ellipsis button's hover scale, its focus ring, or the part
       of its thumb target that reaches above and below the trail — a clipped
       region stops taking taps, not just paint. */
    overflow-x: auto;
    scrollbar-width: none;
    padding: 9px 0;
    margin: -9px 0;
    list-style: none;
  }
  .bcc__list::-webkit-scrollbar { display: none; }
  .bcc__item { display: inline-flex; align-items: center; gap: var(--gap); flex: 0 0 auto; }
  /* If even the collapsed trail overruns, the current crumb is what gives:
     it truncates rather than overflowing the box or wrapping. */
  .bcc__item:last-child { flex: 0 1 auto; min-width: 0; overflow: hidden; }
  .bcc__item:last-child .bcc__crumb { min-width: 0; overflow: hidden; }
  .bcc__item:last-child .bcc__text { overflow: hidden; text-overflow: ellipsis; }

  .bcc__crumb {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    color: var(--text-muted, #8a8a8a);
    transition: color 200ms ease;
  }
  .bcc__crumb:hover:not(.is-current):not(.is-disabled) { color: var(--text, #ededed); }
  .bcc__crumb:focus-visible { outline: none; color: var(--text, #ededed); }
  .bcc__crumb.is-current { cursor: default; color: var(--ui-accent-fg, #0b0b0b); }
  .bcc__crumb.is-disabled { pointer-events: none; opacity: 0.4; }

  /* staggered reveal on expand */
  .bcc__item--reveal { animation: bcc-in 360ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .bcc__item--reveal:nth-child(2) { animation-delay: 40ms; }
  .bcc__item--reveal:nth-child(3) { animation-delay: 80ms; }
  .bcc__item--reveal:nth-child(4) { animation-delay: 120ms; }
  .bcc__item--reveal:nth-child(5) { animation-delay: 160ms; }
  .bcc__item--reveal:nth-child(6) { animation-delay: 200ms; }
  @keyframes bcc-in {
    from { opacity: 0; transform: translateX(-6px) scale(0.9); }
    to { opacity: 1; transform: none; }
  }

  /* ellipsis toggle — the only way back to the hidden crumbs, so it has to be
     hittable. The pill is 9px tall; the button box is padded out to the 24px
     thumb floor and the padding pulled back with margin, which keeps the trail
     on the same line. That means the pill lives on .bcc__dots, not on the
     button — padding the button would just inflate the pill. */
  .bcc__ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0;
    margin: -8px 0;
    border: 0;
    background: none;
    color: var(--text-muted, #8a8a8a);
    cursor: pointer;
    font: inherit;
    -webkit-tap-highlight-color: transparent;
    transition: transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .bcc__ellipsis:hover { transform: scale(1.08); }
  .bcc__ellipsis:focus-visible { outline: none; }
  .bcc__dots {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 0.22em 0.5em;
    border-radius: 999px;
    background: rgb(var(--accent-rgb) / 0.14);
    transition: background-color 220ms ease;
  }
  .bcc__ellipsis:hover .bcc__dots { background: rgb(var(--accent-rgb) / 0.3); }
  .bcc__ellipsis:focus-visible .bcc__dots { box-shadow: 0 0 0 2px rgb(var(--accent-rgb) / 0.55); }
  .bcc__dots i {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: currentColor;
    display: block;
    animation: bcc-bob 1200ms ease-in-out infinite;
  }
  .bcc__dots i:nth-child(2) { animation-delay: 150ms; }
  .bcc__dots i:nth-child(3) { animation-delay: 300ms; }
  .bcc__ellipsis:hover .bcc__dots i { background: var(--text, #ededed); }
  @keyframes bcc-bob {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50% { transform: translateY(-2px); opacity: 1; }
  }

  .bcc__icon { display: inline-flex; align-items: center; justify-content: center; }
  .bcc__icon svg { width: 1.05em; height: 1.05em; display: block; }

  .bcc__sep {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted, #8a8a8a);
    user-select: none;
  }
  .bcc__sep--svg svg { width: var(--sep-size); height: var(--sep-size); display: block; }

  .bcc--t-danger { --accent-rgb: 255 99 105; }
  .bcc--t-warn { --accent-rgb: 255 178 36; }
  .bcc--t-success { --accent-rgb: 76 195 138; }

  .bcc.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .bcc__item--reveal { animation: none; }
    .bcc__ellipsis { transition: none; }
    .bcc__ellipsis:hover { transform: none; }
    .bcc__dots { transition: background-color 120ms ease; }
    .bcc__dots i { animation: none; }
  }
`,g=[{label:"Home"},{label:"Docs"},{label:"Components"},{label:"Navigation"},{label:"Breadcrumb"}];let p;function f(b){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=b;const t=p.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(b,t){const e=t?f(String(t).trim()):null;if(!e){for(const i of _)b.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),c=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(i=>Math.round(c?i*.92:i+(255-i)*.16)),s=(i,r)=>b.style.setProperty(i,r);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(i,a);s("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(i,c?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])s(i,c?"0 0 0":"255 255 255");s("--vs-color",a),s("--vs-color-rgb",e.join(" ")),s("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["separator","size","tone","disabled","max-visible","color"];#n;#e;#s=null;#a=!1;#i=[];#t=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#n=document.createElement("nav"),this.#n.setAttribute("aria-label","Breadcrumb"),this.#e=document.createElement("ol"),this.#e.className="bcc__list",this.#n.append(this.#e),t.append(e,this.#n)}connectedCallback(){m(this,this.getAttribute("color")),this.#r()}disconnectedCallback(){this.#e.replaceChildren(),this.#i=[],this.#t=null}attributeChangedCallback(){m(this,this.getAttribute("color")),this.isConnected&&this.#r()}set items(t){this.#s=Array.isArray(t)?t:null,this.isConnected&&this.#r()}get items(){return this.#s}#c(){return this.#s?.length?this.#s:g}#d(){const t=parseInt(this.getAttribute("max-visible"),10);return Number.isFinite(t)?t:3}#b(){const t="http://www.w3.org/2000/svg",e=document.createElementNS(t,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none");const n=document.createElementNS(t,"path");return n.setAttribute("d","M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","1.5"),n.setAttribute("stroke-miterlimit","10"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),e.append(n),e}#o(){const t=document.createElement("span");t.className="bcc__sep",t.setAttribute("aria-hidden","true");const e=this.getAttribute("separator");return e?e.trim().startsWith("<")?(t.classList.add("bcc__sep--svg"),t.innerHTML=e):t.textContent=e:(t.classList.add("bcc__sep--svg"),t.append(this.#b())),t}#p(t,e,n){const l=this.#c();this.hasAttribute("disabled")||t.disabled||e!==l.length-1&&(t.href||n.preventDefault(),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:t,index:e}})))}#h(){this.hasAttribute("disabled")||this.#a||(this.#a=!0,this.#l(),this.dispatchEvent(new CustomEvent("expand",{bubbles:!0,composed:!0})))}#r(){const t=this.#c(),e=t.length;this.#n.className=`bcc bcc--${this.getAttribute("size")||"md"} bcc--t-${this.getAttribute("tone")||"default"}`+(this.hasAttribute("disabled")?" is-disabled":""),this.#e.replaceChildren(),this.#i=[],this.#t=null,t.forEach((n,l)=>{const c=l===e-1,a=document.createElement("li");a.className="bcc__item";const o=n.href&&!c?"a":"span",s=document.createElement(o);if(s.className="bcc__crumb"+(c?" is-current":"")+(n.disabled?" is-disabled":""),c&&s.setAttribute("aria-current","page"),o==="a"&&(s.href=n.href),n.icon){const r=document.createElement("span");r.className="bcc__icon",r.innerHTML=n.icon,s.append(r)}const i=document.createElement("span");if(i.className="bcc__text",i.textContent=n.label,s.append(i),s.addEventListener("click",r=>this.#p(n,l,r)),a.append(s),c||a.append(this.#o()),this.#e.append(a),this.#i.push(a),l===0){const r=document.createElement("li");r.className="bcc__item";const d=document.createElement("button");d.type="button",d.className="bcc__ellipsis";const h=document.createElement("span");h.className="bcc__dots",h.append(document.createElement("i"),document.createElement("i"),document.createElement("i")),d.append(h),d.addEventListener("click",()=>this.#h()),r.append(d,this.#o()),this.#e.append(r),this.#t={li:r,btn:d}}}),this.#l()}#l(){const t=this.#c(),e=this.#i.length,n=this.#d(),l=!this.#a&&t.length>n&&n>=2,c=(a,o)=>{a.style.display=o?"":"none"};if(this.#t)if(l){const a=n-1;this.#i.forEach((s,i)=>{c(s,i===0||i>=e-a),s.classList.remove("bcc__item--reveal")});const o=t.length-n;this.#t.btn.setAttribute("aria-label",`Show ${o} hidden ${o===1?"crumb":"crumbs"}`),this.#t.btn.setAttribute("aria-expanded","false"),c(this.#t.li,!0)}else this.#i.forEach(a=>{c(a,!0),a.classList.add("bcc__item--reveal")}),this.#t.btn.setAttribute("aria-expanded","true"),c(this.#t.li,!1)}}customElements.define("vs-breadcrumb-collapse",v);
