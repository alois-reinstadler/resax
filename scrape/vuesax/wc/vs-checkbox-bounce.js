const u=`
  :host { display: inline-flex; }
  :host([hidden]) { display: none; }
  .ckb {
    --box: 20px;
    --fs: 14px;
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    --on-fg: var(--bg, #0a0a0a);
    display: inline-flex;
    align-items: center;
    gap: 9px;
    font-family: inherit;
    font-size: var(--fs);
    color: var(--text, #ededed);
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .ckb--lbl-left { flex-direction: row-reverse; }
  .ckb--sm { --box: 16px; --fs: 13px; }
  .ckb--md { --box: 20px; --fs: 14px; }
  .ckb--lg { --box: 24px; --fs: 15px; }

  .ckb__box {
    position: relative;
    isolation: isolate;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--box);
    height: var(--box);
    padding: 0;
    border: 1.5px solid var(--inp-border, #3a3a3a);
    border-radius: 6px;
    background: var(--bg-input, #0d0d0d);
    cursor: inherit;
    outline: none;
    transition:
      border-color 200ms var(--ease-out, ease),
      background-color 200ms var(--ease-out, ease),
      transform 340ms cubic-bezier(0.34, 1.7, 0.5, 1);
  }
  .ckb__box:hover { border-color: var(--inp-border-hover, #5a5a5a); }
  .ckb__box:focus-visible { border-color: var(--accent); box-shadow: 0 0 0 3px rgb(var(--ring) / 0.3); }
  .ckb.is-on .ckb__box {
    background: var(--accent);
    border-color: var(--accent);
    animation: ckb-pop 420ms cubic-bezier(0.34, 1.7, 0.5, 1);
  }
  @keyframes ckb-pop {
    0% { scale: 0.86; }
    45% { scale: 1.16; }
    100% { scale: 1; }
  }

  /* expanding wave ring on check */
  .ckb__ping {
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    border: 2px solid rgb(var(--ring) / 0.7);
    pointer-events: none;
    animation: ckb-ping 620ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  @keyframes ckb-ping {
    0% { opacity: 0.6; transform: scale(1); }
    100% { opacity: 0; transform: scale(2.1); }
  }

  .ckb__mark {
    position: relative;
    z-index: 1;
    width: 78%;
    height: 78%;
    color: var(--on-fg);
    transform: scale(0);
    transform-origin: center;
  }
  .ckb.is-on .ckb__mark { animation: ckb-mark 460ms cubic-bezier(0.34, 1.8, 0.5, 1) 60ms forwards; }
  @keyframes ckb-mark {
    0% { transform: scale(0) rotate(-12deg); }
    60% { transform: scale(1.22) rotate(4deg); }
    100% { transform: scale(1) rotate(0); }
  }
  .ckb__check {
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
  }
  .ckb.is-on .ckb__check { animation: ckb-draw 300ms cubic-bezier(0.65, 0, 0.35, 1) 120ms forwards; }
  @keyframes ckb-draw { to { stroke-dashoffset: 0; } }

  .ckb__label { line-height: 1.2; }
  .ckb__label:empty { display: none; }

  .ckb--t-danger { --accent: #e5484d; --ui-accent-fg: #fff; --ring: 255 99 105; --on-fg: #fff; }
  .ckb--t-warn { --accent: #f5a623; --ui-accent-fg: #160f02; --ring: 255 178 36; --on-fg: #1a1206; }
  .ckb--t-success { --accent: #30a46c; --ui-accent-fg: #fff; --ring: 76 195 138; --on-fg: #fff; }

  .ckb.is-disabled { opacity: 0.45; cursor: not-allowed; }
  .ckb.is-disabled .ckb__box { cursor: not-allowed; }

  /* WC addition: indeterminate — fill the box, show a dash instead of the tick */
  .ckb.is-indet .ckb__box { background: var(--accent); border-color: var(--accent); }
  .ckb.is-indet .ckb__mark { transform: scale(1); animation: none; }
  .ckb.is-indet .ckb__check { display: none; }
  .ckb__dash { display: none; }
  .ckb.is-indet .ckb__dash { display: block; }

  @media (prefers-reduced-motion: reduce) {
    .ckb__box, .ckb.is-on .ckb__box { animation: none; transition-duration: 0ms; }
    .ckb__mark { transform: scale(1); }
    .ckb.is-on .ckb__mark { animation: none; }
    .ckb.is-on .ckb__check { animation: none; stroke-dashoffset: 0; }
    .ckb__ping { display: none; }
  }
`,d="http://www.w3.org/2000/svg";let l;function f(b){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=b;const t=l.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(b,t){const e=t?f(String(t).trim()):null;if(!e){for(const i of m)b.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),c=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(i=>Math.round(c?i*.92:i+(255-i)*.16)),r=(i,k)=>b.style.setProperty(i,k);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(i,o);r("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(i,c?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])r(i,c?"0 0 0":"255 255 255");r("--vs-color",o),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class p extends HTMLElement{static observedAttributes=["checked","disabled","indeterminate","label","size","tone","label-position","color"];#i;#t;#e;#s;#n;#r;constructor(){super(),this.#i=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=u,this.#i.className="ckb";const e=document.createElement("label");e.className="ckb",this.#s=e,this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="ckb__box",this.#t.setAttribute("role","checkbox"),this.#e=document.createElementNS(d,"svg"),this.#e.setAttribute("class","ckb__mark"),this.#e.setAttribute("viewBox","0 0 24 24"),this.#e.setAttribute("aria-hidden","true");const n=document.createElementNS(d,"path");n.setAttribute("class","ckb__check"),n.setAttribute("d","M5 12.5l4.2 4.2L19 7"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.6"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round");const s=document.createElementNS(d,"path");s.setAttribute("class","ckb__dash"),s.setAttribute("d","M6 12h12"),s.setAttribute("fill","none"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","2.6"),s.setAttribute("stroke-linecap","round"),this.#e.append(n,s),this.#t.append(this.#e);const c=document.createElement("span");c.className="ckb__label";const o=document.createElement("slot"),a=document.createElement("span");a.setAttribute("data-label-fallback",""),o.append(a),c.append(o),this._lblText=a,e.append(this.#t,c),this.#i.append(t,e),this.#r=()=>this.#o(),this.#n=r=>{this.hasAttribute("disabled")||(r.key===" "||r.key==="Enter")&&(r.preventDefault(),this.#o())}}connectedCallback(){h(this,this.getAttribute("color")),this.#t.addEventListener("click",this.#r),this.#t.addEventListener("keydown",this.#n),this.#c()}disconnectedCallback(){this.#t.removeEventListener("click",this.#r),this.#t.removeEventListener("keydown",this.#n)}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#t&&this.#c()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}#c(){const t=(c,o)=>this.getAttribute(c)??o,e=this.hasAttribute("checked"),n=this.hasAttribute("indeterminate"),s=this.hasAttribute("disabled");this.#s.className=`ckb ckb--${t("size","md")} ckb--t-${t("tone","default")} ckb--lbl-${t("label-position","right")}`+(e?" is-on":"")+(n?" is-indet":"")+(s?" is-disabled":""),this.#t.disabled=s,this.#t.setAttribute("aria-checked",n?"mixed":String(e)),this._lblText.textContent=t("label","")}#o(){if(this.hasAttribute("disabled"))return;const t=!this.hasAttribute("checked");t?this.setAttribute("checked",""):this.removeAttribute("checked"),this.hasAttribute("indeterminate")&&this.removeAttribute("indeterminate"),t&&this.#a(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:t}}))}#a(){const t=document.createElement("span");for(t.className="ckb__ping",t.setAttribute("aria-hidden","true"),t.addEventListener("animationend",()=>t.remove()),this.#t.appendChild(t);this.#t.querySelectorAll(".ckb__ping").length>3;)this.#t.querySelector(".ckb__ping").remove()}}customElements.define("vs-checkbox-bounce",p);
