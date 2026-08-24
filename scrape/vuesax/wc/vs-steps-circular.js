const p="http://www.w3.org/2000/svg",g=["Account","Profile","Confirm"];const _=2*Math.PI*52;function x(u,e){const t=document.createElementNS(p,"svg");t.setAttribute("class",`stc__dot-ico ${u}`),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const n of e){const r=document.createElementNS(p,"path");r.setAttribute("d",n),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2.6"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),t.appendChild(r)}return t}const y=()=>x("stc__dot-ico--check",["M7.75 11.9999L10.58 14.8299L16.25 9.16992"]),w=()=>x("stc__dot-ico--err",["M9.17004 14.8299L14.83 9.16992","M14.83 14.8299L9.17004 9.16992"]),E=`
  :host { display: inline-block; }
  .stc {
    --sz: 120px;
    --fs: var(--ctrl-fs-md, 14px);
    --dotsz: 20px;
    --accent: var(--ui-accent, #ededed);
    --ring: var(--ui-ring, 255 255 255);
    --done-fg: var(--ui-accent-fg, #0b0b0b);
    display: inline-flex;
    align-items: center;
    gap: 16px;
    font-family: inherit;
    color: var(--text, #ededed);
  }
  .stc--sm { --sz: 92px; --fs: 13px; --dotsz: 16px; }
  .stc--lg { --sz: 148px; --fs: 15px; --dotsz: 24px; }
  .stc--vertical { flex-direction: column; text-align: center; }

  .stc__ring { position: relative; width: var(--sz); height: var(--sz); flex: none; }
  .stc__svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .stc__track { fill: none; stroke: var(--border, #2a2a2a); stroke-width: 8; }
  .stc__fill {
    fill: none;
    stroke: var(--accent);
    stroke-width: 8;
    stroke-linecap: round;
    filter: drop-shadow(0 0 5px color-mix(in srgb, var(--accent) 55%, transparent));
    transition: stroke-dashoffset 620ms cubic-bezier(0.22, 1, 0.36, 1), stroke 260ms ease;
  }

  .stc__center {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1px;
  }
  .stc__count { font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
  .stc__count strong { font-size: calc(var(--sz) * 0.26); font-weight: 700; color: var(--text, #ededed); }
  .stc__count span { font-size: calc(var(--sz) * 0.13); color: var(--text-muted, #8a8a8a); }
  .stc__step { font-size: calc(var(--fs) - 3px); text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted, #8a8a8a); }

  .stc__meta { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  .stc--vertical .stc__meta { align-items: center; }
  .stc__label { font-size: calc(var(--fs) + 2px); font-weight: 600; color: var(--text, #ededed); }
  .stc__next { font-size: calc(var(--fs) - 1px); color: var(--text-muted, #8a8a8a); }
  .stc__next--done { color: var(--accent); }

  /* ---- back-nav marker row (family addition) ---- */
  .stc__dots { display: flex; align-items: center; gap: 6px; margin-top: 2px; flex-wrap: wrap; }
  .stc--vertical .stc__dots { justify-content: center; }
  .stc__dot {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--dotsz);
    height: var(--dotsz);
    padding: 0;
    border: 1.5px solid var(--border, #2a2a2a);
    border-radius: 999px;
    background: var(--bg-card, #141414);
    color: var(--text-muted, #8a8a8a);
    font: inherit;
    font-size: calc(var(--dotsz) * 0.42);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    cursor: default;
    transition: background-color 240ms ease, border-color 240ms ease, color 240ms ease, transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .stc__dot-ico { width: 58%; height: 58%; display: none; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
  .stc__dot-num { display: block; line-height: 1; }
  .stc__dot.is-completed { background: var(--accent); border-color: var(--accent); color: var(--done-fg); }
  .stc__dot.is-completed .stc__dot-ico--check { display: block; }
  .stc__dot.is-completed .stc__dot-num { display: none; }
  .stc__dot.is-active { border-color: var(--accent); color: var(--accent); transform: scale(1.25); box-shadow: 0 0 0 3px rgb(var(--ring) / 0.18); }
  .stc__dot.is-error { background: var(--steps-err, #ff6369); border-color: var(--steps-err, #ff6369); color: #fff; }
  .stc__dot.is-error .stc__dot-ico--err { display: block; }
  .stc__dot.is-error .stc__dot-num { display: none; }
  .stc--clickable .stc__dot.is-nav { cursor: pointer; }
  .stc--clickable .stc__dot.is-nav:hover { filter: brightness(1.15); }
  .stc--clickable .stc__dot.is-nav:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

  /* tones */
  .stc--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --done-fg: #fff; }
  .stc--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; }
  .stc--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; }
  .stc.is-error { --accent: #ff6369; --ring: 255 99 105; }

  .is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .stc__fill { transition: stroke 260ms ease; }
    .stc__dot { transition: none; }
    .stc__dot.is-active { transform: none; }
  }
`;let f;function S(u){if(f||=document.createElement("canvas").getContext("2d"),!f)return null;f.fillStyle="#000",f.fillStyle=u;const e=f.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const C=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(u,e){const t=e?S(String(e).trim()):null;if(!t){for(const s of C)u.style.removeProperty(s);return}const n=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),i=.2126*n(t[0])+.7152*n(t[1])+.0722*n(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,a=t.map(s=>Math.round(i?s*.92:s+(255-s)*.16)),o=(s,l)=>u.style.setProperty(s,l);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(s,c);o("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(s,t.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(s,i?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])o(s,i?"0 0 0":"255 255 255");o("--vs-color",c),o("--vs-color-rgb",t.join(" ")),o("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class N extends HTMLElement{static observedAttributes=["current","value","size","tone","orientation","clickable","disabled","show-next","color"];#i;#r;#a;#u;#c;#n;#e;#l=null;#s=[];#o=[];#t=1;#h=e=>{const t=e.target.closest(".stc__dot");if(!t||!this.#e.contains(t))return;const n=Number(t.dataset.idx);Number.isNaN(n)||this.#b(n)};constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=E,this.#i=document.createElement("div"),this.#i.className="stc";const n=document.createElement("div");n.className="stc__ring";const r=document.createElementNS(p,"svg");r.setAttribute("class","stc__svg"),r.setAttribute("viewBox","0 0 120 120"),r.setAttribute("aria-hidden","true");const i=document.createElementNS(p,"circle");i.setAttribute("class","stc__track"),i.setAttribute("cx","60"),i.setAttribute("cy","60"),i.setAttribute("r",String(52)),this.#r=document.createElementNS(p,"circle"),this.#r.setAttribute("class","stc__fill"),this.#r.setAttribute("cx","60"),this.#r.setAttribute("cy","60"),this.#r.setAttribute("r",String(52)),this.#r.setAttribute("stroke-dasharray",String(_)),r.append(i,this.#r);const c=document.createElement("div");c.className="stc__center";const a=document.createElement("span");a.className="stc__count",this.#a=document.createElement("strong");const o=document.createElement("span");o.className="stc__count-total",a.append(this.#a,o);const s=document.createElement("span");s.className="stc__step",s.textContent="Step",c.append(a,s),this.#u=o,n.append(r,c);const l=document.createElement("div");l.className="stc__meta",this.#c=document.createElement("span"),this.#c.className="stc__label",this.#n=document.createElement("span"),this.#n.className="stc__next",this.#e=document.createElement("div"),this.#e.className="stc__dots",this.#e.setAttribute("role","group"),this.#e.setAttribute("aria-label","Steps"),l.append(this.#c,this.#n,this.#e),this.#i.append(n,l),e.append(t,this.#i)}connectedCallback(){v(this,this.getAttribute("color")),this.#p(),this.#d(),this.#e.addEventListener("click",this.#h)}disconnectedCallback(){this.#e.removeEventListener("click",this.#h)}attributeChangedCallback(){v(this,this.getAttribute("color")),this.#i&&this.#d()}get steps(){return this.#l??g}set steps(e){this.#l=Array.isArray(e)?e:null,this.#i&&(this.#p(),this.#d())}get current(){return this.#t}set current(e){this.setAttribute("current",String(e|0))}get value(){return this.#t}set value(e){this.setAttribute("value",String(e|0))}#f(e,t){if(!this.hasAttribute(e))return t;const n=this.getAttribute(e);return n!=="false"&&n!=="0"}#p(){this.#e.textContent="",this.#o=[];const e=this.#l??g;this.#s=e.map(t=>typeof t=="string"?{label:t}:t||{}),this.#s.forEach((t,n)=>{const r=document.createElement("button");r.type="button",r.className="stc__dot",r.dataset.idx=String(n);const i=y(),c=w(),a=document.createElement("span");a.className="stc__dot-num",a.textContent=String(n+1),r.append(i,c,a),this.#e.appendChild(r),this.#o.push(r)})}#d(){const e=this.getAttribute("size")||"md",t=this.getAttribute("tone")||"default",n=this.getAttribute("orientation")==="vertical"?"vertical":"horizontal",r=this.#f("clickable",!1),i=this.hasAttribute("disabled"),c=this.#s.length,a=this.getAttribute("current")??this.getAttribute("value"),o=a==null?this.#t:parseInt(a,10)||0;this.#t=c?Math.min(Math.max(o,0),c-1):0;const s=this.#s[this.#t]?.status==="error";this.#i.className=["stc",`stc--${e}`,`stc--t-${t}`,n==="vertical"?"stc--vertical":"",r?"stc--clickable":"",s?"is-error":"",i?"is-disabled":""].filter(Boolean).join(" ");const l=c?Math.min(Math.max(o,0)+1,c):0,k=c?l/c:0;this.#r.setAttribute("stroke-dashoffset",String(_*(1-k))),this.#a.textContent=String(l),this.#u.textContent=`/${c}`,this.#c.textContent=this.#s[this.#t]?.label??"";const m=this.#s[this.#t+1]?.label??null;m?(this.#n.textContent=`Next: ${m}`,this.#n.classList.remove("stc__next--done")):(this.#n.textContent="Last step",this.#n.classList.add("stc__next--done")),this.#n.style.display=this.hasAttribute("show-next")?"":"none";for(let d=0;d<this.#o.length;d++){const h=this.#o[d],b=this.#s[d]?.status||(d<this.#t?"completed":d===this.#t?"active":"pending"),A=r&&!i&&b==="completed";h.className=`stc__dot is-${b}`+(A?" is-nav":""),h.disabled=i,h.setAttribute("aria-label",this.#s[d]?.label||`Step ${d+1}`),b==="active"?h.setAttribute("aria-current","step"):h.removeAttribute("aria-current")}}#b(e){this.hasAttribute("disabled")||!this.#f("clickable",!1)||(this.#s[e]?.status||(e<this.#t?"completed":e===this.#t?"active":"pending"))!=="completed"||this.#m(e)}#m(e){e!==this.#t&&(this.setAttribute("current",String(e)),this.setAttribute("value",String(e)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{index:e}})))}}customElements.define("vs-steps-circular",N);
