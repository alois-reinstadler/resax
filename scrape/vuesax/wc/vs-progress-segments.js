const f=`
  :host {
    --h: 12px;
    --fs: 13px;
    --radius: var(--ctrl-r-sm, 4px);
    --gap: 4px;
    --accent: var(--ui-accent, #ededed);
    --track: var(--border, #2a2a2a);
    --cell-off: var(--bg-elevated, #161616);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));

    display: inline-flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    min-width: 240px;
    font: inherit;
    font-size: var(--fs);
    color: var(--tint);
  }
  :host([hidden]) { display: none; }

  :host([size="sm"]) { --h: 8px;  --gap: 3px; --fs: 12px; }
  :host([size="md"]) { --h: 12px; --gap: 4px; --fs: 13px; }
  :host([size="lg"]) { --h: 16px; --gap: 5px; --fs: 14px; }

  .vpsg__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    line-height: 1;
  }
  .vpsg__label { font-weight: 500; }
  .vpsg__val { font-variant-numeric: tabular-nums; color: var(--accent); }

  .vpsg__track {
    display: flex;
    gap: var(--gap);
    width: 100%;
    height: var(--h);
  }
  .vpsg__cell {
    position: relative;
    flex: 1 1 0;
    height: 100%;
    border-radius: var(--radius);
    background: var(--cell-off);
    border: 1px solid var(--track);
    overflow: hidden;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
  }
  /* the fill overlay carries the "light up" — scaleX is the per-cell progress */
  .vpsg__fill {
    position: absolute;
    inset: 0;
    transform-origin: left center;
    transform: scaleX(var(--fill, 0));
    background: var(--accent);
    transition: transform 0.25s ease;
  }
  .vpsg__cell.is-on {
    border-color: var(--accent);
    box-shadow: 0 0 6px color-mix(in srgb, var(--accent) 55%, transparent);
  }

  :host([indeterminate]) .vpsg__fill {
    transform: scaleX(1);
    animation: vpsg-chase 1.2s ease-in-out infinite;
  }
  @keyframes vpsg-chase {
    0%, 100% { opacity: 0; }
    40%      { opacity: 1; }
  }

  :host([tone="danger"])  { --accent: var(--danger,  #ff6369); }
  :host([tone="warn"])    { --accent: var(--warn,    #ffb224); }
  :host([tone="success"]) { --accent: var(--success, #4cc38a); }

  @media (prefers-reduced-motion: reduce) {
    .vpsg__cell, .vpsg__fill { transition: none; animation: none; }
  }
`;let h;function b(o){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=o;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(o,t){const e=t?b(String(t).trim()):null;if(!e){for(const s of v)o.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),a=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,i=e.map(s=>Math.round(a?s*.92:s+(255-s)*.16)),n=(s,p)=>o.style.setProperty(s,p);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(s,c);n("--btn-primary-bg-hover",`rgb(${i[0]} ${i[1]} ${i[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(s,a?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])n(s,a?"0 0 0":"255 255 255");n("--vs-color",c),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["value","max","segments","indeterminate","size","tone","label","show-value","color"];#e;#s;#r;#t;#n=[];#i=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#e=document.createElement("div"),this.#e.className="vpsg__head",this.#s=document.createElement("span"),this.#s.className="vpsg__label",this.#r=document.createElement("span"),this.#r.className="vpsg__val",this.#e.append(this.#s,this.#r),this.#t=document.createElement("div"),this.#t.className="vpsg__track",this.#t.setAttribute("aria-hidden","true"),t.append(e,this.#e,this.#t)}connectedCallback(){d(this,this.getAttribute("color")),this.setAttribute("role","progressbar"),this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax","100"),this.#o(),this.#l()}disconnectedCallback(){}attributeChangedCallback(t){d(this,this.getAttribute("color")),this.isConnected&&(t==="segments"&&this.#o(),this.#l())}get value(){return Number(this.getAttribute("value"))||0}set value(t){this.setAttribute("value",String(Number(t)||0))}get max(){return this.#a()}set max(t){this.setAttribute("max",String(Number(t)||100))}#a(){const t=Number(this.getAttribute("max"));return Number.isFinite(t)&&t>0?t:100}#c(){const t=Math.round(Number(this.getAttribute("segments")));return Math.max(2,Math.min(40,Number.isFinite(t)?t:10))}#h(){return Math.max(0,Math.min(100,this.value/this.#a()*100))}#o(){const t=this.#c();this.#t.textContent="",this.#n=Array.from({length:t},()=>{const e=document.createElement("span");e.className="vpsg__cell";const r=document.createElement("span");return r.className="vpsg__fill",e.append(r),this.#t.append(e),{cell:e,fill:r}})}#l(){const t=this.hasAttribute("indeterminate")&&this.hasAttribute("indeterminate"),e=this.getAttribute("label")||"",r=this.hasAttribute("show-value")&&this.hasAttribute("show-value"),l=this.#h();this.#s.textContent=e,this.#s.style.display=e?"":"none",this.#r.textContent=`${Math.round(l)}%`,this.#r.style.display=r&&!t?"":"none",this.#e.style.display=e||r&&!t?"":"none",t?this.removeAttribute("aria-valuenow"):this.setAttribute("aria-valuenow",String(Math.round(l))),this.setAttribute("aria-label",e||"Progress");const a=this.#n.length,c=t?0:l/100*a,i=Math.floor(c),n=c-i;this.#n.forEach(({cell:p,fill:u},m)=>{if(t){u.style.animationDelay=`${(m*.09).toFixed(2)}s`,u.style.removeProperty("--fill"),p.classList.remove("is-on");return}u.style.removeProperty("animation-delay");const g=m<i?1:m===i?n:0;u.style.setProperty("--fill",String(g)),p.classList.toggle("is-on",g>=.999)});const s=!t&&l>=100;s&&!this.#i&&this.dispatchEvent(new CustomEvent("complete",{bubbles:!0,composed:!0})),this.#i=s}}customElements.define("vs-progress-segments",y);
