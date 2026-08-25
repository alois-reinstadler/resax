const g="http://www.w3.org/2000/svg",z=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;function E(f){const e=document.createElementNS(g,"svg");e.setAttribute("class","steps__ico"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true");for(const t of f){const r=document.createElementNS(g,"path");r.setAttribute("d",t),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.5"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.appendChild(r)}return e}const S=()=>E(["M9.17004 14.8299L14.83 9.16992","M14.83 14.8299L9.17004 9.16992"]),N=()=>E(["M7.75 11.9999L10.58 14.8299L16.25 9.16992"]),w=["Account","Profile","Confirm"],C=`
  :host { display: block; width: 100%; }
  .steps {
    --mk: 32px;            /* marker size */
    --gap: 14px;          /* vertical spacing between steps */
    --line: 2px;          /* connector thickness */
    --fs: var(--ctrl-fs-md, 14px);
    --accent: var(--ui-accent, #ededed);     /* stepper accent (theme-agnostic, legible in both) */
    --ring: var(--ui-ring, 255 255 255);    /* space-separated rgb of the accent */
    --rip: var(--fx-tint, 255 255 255);
    --done-fg: var(--ui-accent-fg, #0b0b0b);
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    font-family: inherit;
    color: var(--text, #ededed);
    user-select: none;
    -webkit-user-select: none;
  }
  .steps--sm { --mk: 26px; --fs: 13px; --gap: 10px; }
  .steps--lg { --mk: 38px; --fs: 15px; --gap: 18px; }

  /* ---- orientation ---- */
  .steps--horizontal { flex-direction: row; align-items: flex-start; width: 100%; }
  .steps--vertical { flex-direction: column; }

  .steps__item {
    position: relative;
    display: flex;
    min-width: 0;
  }
  .steps--horizontal .steps__item {
    flex: 1 1 0;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
  }
  .steps--vertical .steps__item {
    flex-direction: row;
    align-items: flex-start;
    gap: 12px;
    padding-bottom: var(--gap);
  }
  .steps--vertical .steps__item:last-child { padding-bottom: 0; }

  /* ---- rail (marker + lines) ---- */
  .steps__rail {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .steps--horizontal .steps__rail { width: 100%; height: var(--mk); }
  .steps--vertical .steps__rail { flex-direction: column; height: 100%; width: var(--mk); }

  .steps__line {
    position: absolute;
    background: var(--steps-line, var(--border, #2a2a2a));
    z-index: 0;
  }
  /* a single bar per segment: from this marker's edge to the next one's */
  .steps--horizontal .steps__line--after {
    top: 50%; height: var(--line); transform: translateY(-50%);
    left: calc(50% + var(--mk) / 2);
    right: calc(-50% + var(--mk) / 2);
  }
  .steps--vertical .steps__line--after {
    left: 50%; width: var(--line); transform: translateX(-50%);
    top: var(--mk); height: var(--gap);
  }

  /* last step: no dangling connector */
  .steps__item:last-child .steps__line--after { display: none; }

  /* progress: every line carries an ::after fill that EXPANDS in width (progress bar) */
  .steps__line::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 480ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
    transition-delay: 480ms; /* exit: wait for the ring to finish emptying */
  }
  .steps--vertical .steps__line::after { transform: scaleY(0); transform-origin: top center; }

  /* completed step → its bar to the next one fills 0→100% */
  .is-completed .steps__line--after::after { transform: scaleX(1); transition-delay: 0ms; }
  .steps--vertical .is-completed .steps__line--after::after { transform: scaleY(1); transition-delay: 0ms; }

  /* ---- marker ---- */
  .steps__marker {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--mk);
    height: var(--mk);
    border-radius: 999px;
    background: var(--bg-card, #141414);
    color: var(--text-muted, #8a8a8a);
    font-size: calc(var(--fs) - 1px);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    overflow: visible; /* ring lives here but overhangs; ripples clip via their own overflow:hidden */
    transition:
      background-color 280ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      color 280ms ease,
      transform 280ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  }
  .steps__marker:focus-visible { outline: none; }

  /* ---- progress ring ---- */
  /* SVG viewBox 34×34, r=16 → stroke lands exactly on the marker edge (32px + 1px inset) */
  .steps__ring {
    position: absolute;
    inset: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    pointer-events: none;
    z-index: 3;
    overflow: visible;
    /* rotate(180deg) → starts at 9 o'clock (left), where the horizontal line arrives */
    transform: rotate(180deg);
  }
  .steps__ring-track {
    fill: none;
    stroke: var(--steps-mk-border, var(--border-strong, #3a3a3a));
    stroke-width: 2;
    transition: stroke 280ms ease;
  }
  .steps__ring-fill {
    fill: none;
    stroke: var(--accent);
    stroke-width: 2;
    stroke-linecap: round;
    /* circumference = 2π × 16 ≈ 100.53 */
    stroke-dasharray: 100.53;
    stroke-dashoffset: 100.53;
    transition: stroke-dashoffset 480ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .is-active  .steps__ring-track { stroke: rgb(var(--ring) / 0.25); }
  .is-active    .steps__ring-fill { stroke-dashoffset: 0; transition-delay: 380ms; }
  .is-completed .steps__ring-fill { stroke-dashoffset: 0; }
  .is-error .steps__ring-track { stroke: var(--steps-err, #ff6369); }
  .is-error .steps__ring-fill  { stroke: var(--steps-err, #ff6369); stroke-dashoffset: 0; }

  /* marker background = ::before (animates scale 0.5 blur → scale 1 blur 0) */
  /* blue background = ::before. At rest: scale 0.5 + opacity 0.
     On complete: scale 1 + opacity 1 with a bouncy transition (the circle "pops") */
  .steps__marker::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    background: var(--accent);
    transform-origin: center;
    transform: scale(0.5);
    opacity: 0;
    filter: blur(8px);
    /* exit: wait for ring (480ms) + line (480ms) before fading out */
    transition:
      transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1) 900ms,
      opacity 260ms ease 900ms,
      filter 380ms cubic-bezier(0.22, 1, 0.36, 1) 900ms;
  }
  /* completed: expanded accent fill + check */
  .is-completed .steps__marker { color: var(--done-fg); }
  .is-completed .steps__marker::before {
    transform: scale(1);
    opacity: 1;
    filter: blur(0);
    /* enter: no delay */
    transition:
      transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1) 0ms,
      opacity 260ms ease 0ms,
      filter 380ms cubic-bezier(0.22, 1, 0.36, 1) 0ms;
  }
  /* active: scales up (no outer ring), hollow background */
  .is-active .steps__marker {
    color: var(--accent);
    transform: scale(1.06);
  }
  /* error */
  .is-error .steps__marker { color: #fff; }
  .is-error .steps__marker::before { background: var(--steps-err, #ff6369); transform: scale(1); opacity: 1; }

  /* icon layer: error / check / num all stay mounted, stacked + absolute; an
     is-shown class crossfades the active one (blur+scale), mirroring the
     SFC's Transition name=steps-ico without mount/unmount churn. */
  .steps__ico, .steps__num {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: scale(0.4);
    filter: blur(4px);
    pointer-events: none;
    transition: opacity 180ms ease, transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 180ms ease;
  }
  .steps__ico { width: 60%; height: 60%; margin: auto; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
  .steps__num { line-height: 1; }
  .steps__ico.is-shown, .steps__num.is-shown {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
    transition-delay: 60ms;
  }

  /* ---- variant dots ---- */
  .steps--v-dots .steps__marker { width: calc(var(--mk) * 0.5); height: calc(var(--mk) * 0.5); border-width: 2px; }
  .steps--v-dots .is-active .steps__marker { transform: scale(1.15); }

  /* ---- text ---- */
  .steps__body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .steps--vertical .steps__body { padding-top: calc((var(--mk) - var(--fs) * 1.3) / 2); }
  .steps__label {
    font-size: var(--fs);
    font-weight: 500;
    line-height: 1.3;
    color: var(--text-muted, #8a8a8a);
    transition: color 240ms ease;
  }
  .is-active .steps__label { color: var(--text, #ededed); font-weight: 600; }
  .is-completed .steps__label { color: var(--text-secondary, #a8a8a8); }
  .is-error .steps__label { color: var(--steps-err, #ff6369); }
  .steps__desc { font-size: calc(var(--fs) - 2px); color: var(--text-muted, #8a8a8a); line-height: 1.4; }

  /* ---- clickable ---- */
  .steps--clickable .is-nav .steps__marker { cursor: pointer; }
  .steps--clickable .is-nav .steps__marker:hover { border-color: var(--accent); }
  .steps--clickable .is-nav .steps__marker:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .steps--clickable .is-nav .steps__label { cursor: pointer; }

  /* ripple on clickable marker */
  .steps__ripples { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; pointer-events: none; z-index: 0; }
  .steps__ripple {
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: radial-gradient(circle, rgb(var(--rip) / 0.4) 0%, rgb(var(--rip) / 0.12) 50%, transparent 72%);
    opacity: 0;
    animation: steps-ripple 640ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  @keyframes steps-ripple {
    from { transform: translate(-50%, -50%) scale(0); opacity: 0.7; }
    to   { transform: translate(-50%, -50%) scale(1); opacity: 0; }
  }

  /* ---- tones (recolor accent/ring/progress) ---- */
  .steps--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --rip: 255 99 105; --done-fg: #fff; }
  .steps--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --rip: 255 178 36; --done-fg: #1a1206; }
  .steps--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --rip: 76 195 138; --done-fg: #06180f; }

  /* ---- disabled ---- */
  .is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .steps__marker, .steps__line, .steps__label { transition: none; }
    .is-active .steps__marker { transform: none; }
    .steps--v-dots .is-active .steps__marker { transform: none; }
    .steps__marker::before { transition: none; }
    .steps__ring-fill { transition: none; }
    .steps__ico, .steps__num { transition: none; }
    .steps__ripple { display: none; }
  }
`;let h;function L(f){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=f;const e=h.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const $=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function A(f,e){const t=e?L(String(e).trim()):null;if(!t){for(const s of $)f.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),n=.2126*r(t[0])+.7152*r(t[1])+.0722*r(t[2])>.45,a=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(s=>Math.round(n?s*.92:s+(255-s)*.16)),i=(s,o)=>f.style.setProperty(s,o);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(s,a);i("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(s,t.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(s,n?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])i(s,n?"0 0 0":"255 255 255");i("--vs-color",a),i("--vs-color-rgb",t.join(" ")),i("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class M extends HTMLElement{static observedAttributes=["current","value","size","tone","orientation","variant","clickable","disabled","color"];#e;#i=null;#r=[];#t=[];#s=1;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=C,this.#e=document.createElement("ol"),this.#e.className="steps",e.append(t,this.#e)}connectedCallback(){A(this,this.getAttribute("color")),this.#a(),this.#n()}disconnectedCallback(){for(const e of this.#t)e.marker.removeEventListener("pointerdown",e.onDown),e.marker.removeEventListener("keydown",e.onKey)}attributeChangedCallback(){A(this,this.getAttribute("color")),this.#e&&this.#n()}get steps(){return this.#i??w}set steps(e){this.#i=Array.isArray(e)?e:null,this.#e&&(this.#a(),this.#n())}get current(){return this.#s}set current(e){this.setAttribute("current",String(e|0))}get value(){return this.#s}set value(e){this.setAttribute("value",String(e|0))}#c(e,t){if(!this.hasAttribute(e))return t;const r=this.getAttribute(e);return r!=="false"&&r!=="0"}#a(){for(const t of this.#t)t.marker.removeEventListener("pointerdown",t.onDown),t.marker.removeEventListener("keydown",t.onKey);this.#e.textContent="",this.#t=[];const e=this.#i??w;this.#r=e.map(t=>typeof t=="string"?{label:t}:t||{}),this.#r.forEach((t,r)=>{const p=document.createElement("li");p.className="steps__item";const n=document.createElement("div");n.className="steps__rail";const a=document.createElement("span");a.className="steps__marker";const l=document.createElement("span");l.className="steps__ripples",l.setAttribute("aria-hidden","true");const i=document.createElementNS(g,"svg");i.setAttribute("class","steps__ring"),i.setAttribute("viewBox","0 0 34 34"),i.setAttribute("aria-hidden","true");const s=document.createElementNS(g,"circle");s.setAttribute("class","steps__ring-track"),s.setAttribute("cx","17"),s.setAttribute("cy","17"),s.setAttribute("r","16");const o=document.createElementNS(g,"circle");o.setAttribute("class","steps__ring-fill"),o.setAttribute("cx","17"),o.setAttribute("cy","17"),o.setAttribute("r","16"),i.append(s,o);const c=S(),v=N(),d=document.createElement("span");d.className="steps__num",d.setAttribute("aria-hidden","true"),d.textContent=String(r+1),a.append(l,i,c,v,d);const u=document.createElement("span");u.className="steps__line steps__line--after",u.setAttribute("aria-hidden","true"),n.append(a,u);const m=document.createElement("div");m.className="steps__body";const _=document.createElement("span");_.className="steps__label";const b=document.createElement("span");b.className="steps__desc",m.append(_,b),_.textContent=t.label||"",t.description?(b.textContent=t.description,b.style.display=""):b.style.display="none",m.style.display=t.label?"":"none",p.append(n,m),this.#e.appendChild(p);const y=k=>this.#l(r,k),x=k=>this.#p(r,k);a.addEventListener("pointerdown",y),a.addEventListener("keydown",x),this.#t.push({li:p,marker:a,ripples:l,errorIco:c,checkIco:v,numEl:d,canNav:!1,onDown:y,onKey:x})})}#n(){const e=this.getAttribute("size")||"md",t=this.getAttribute("tone")||"default",r=this.getAttribute("variant")||"numbered",p=this.getAttribute("orientation")==="vertical"?"vertical":"horizontal",n=this.#c("clickable",!1),a=this.hasAttribute("disabled");this.#e.className=["steps",`steps--${p}`,`steps--${e}`,`steps--v-${r}`,`steps--t-${t}`,n?"steps--clickable":"",a?"is-disabled":""].filter(Boolean).join(" ");const l=this.getAttribute("current")??this.getAttribute("value"),i=l==null?1:parseInt(l,10)||0,s=this.#r.length;this.#s=s?Math.min(Math.max(i,0),s-1):0;for(let o=0;o<this.#t.length;o++){const c=this.#t[o],d=this.#r[o]?.status||(o<this.#s?"completed":o===this.#s?"active":"pending"),u=n&&!a&&d==="completed";c.canNav=u,c.li.className=`steps__item is-${d}`+(u?" is-nav":""),d==="active"?c.li.setAttribute("aria-current","step"):c.li.removeAttribute("aria-current"),u?(c.marker.setAttribute("role","button"),c.marker.tabIndex=0):(c.marker.removeAttribute("role"),c.marker.removeAttribute("tabindex"));let m="empty";d==="error"?m="error":d==="completed"&&r!=="dots"?m="check":r==="numbered"&&(m="num"),c.errorIco.classList.toggle("is-shown",m==="error"),c.checkIco.classList.toggle("is-shown",m==="check"),c.numEl.classList.toggle("is-shown",m==="num")}}#o(e){e!==this.#s&&(this.setAttribute("current",String(e)),this.setAttribute("value",String(e)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{index:e}})))}#l(e,t){const r=this.#t[e];!r||!r.canNav||(this.#d(r,t),this.#o(e))}#p(e,t){const r=this.#t[e];!r||!r.canNav||(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.#o(e))}#d(e,t){if(z())return;const r=e.marker.getBoundingClientRect(),p=t.clientX-r.left,n=t.clientY-r.top,a=Math.max(p,r.width-p),l=Math.max(n,r.height-n),i=Math.hypot(a,l)*2,s=document.createElement("span");for(s.className="steps__ripple",s.style.cssText=`left:${p}px;top:${n}px;width:${i}px;height:${i}px`,s.addEventListener("animationend",()=>s.remove()),e.ripples.appendChild(s);e.ripples.childElementCount>6;)e.ripples.firstElementChild.remove()}}customElements.define("vs-steps",M);
