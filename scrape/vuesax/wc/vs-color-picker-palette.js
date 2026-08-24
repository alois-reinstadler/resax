const h=[{name:"Red",steps:["#fdd8d8","#f7a7a7","#f16a6a","#e5484d","#c62828","#8f1f1f"]},{name:"Amber",steps:["#ffeccc","#ffd27a","#ffb224","#f59e0b","#c67c05","#8a5a06"]},{name:"Green",steps:["#d6f5e3","#9be3bd","#4cc38a","#22a06b","#137a4c","#0c5233"]},{name:"Blue",steps:["#d3e9ff","#8fc4ff","#0091ff","#0072d6","#0057a3","#003c70"]},{name:"Violet",steps:["#e6def8","#c3b0ee","#a970ff","#6e56cf","#553da0","#3b2a70"]},{name:"Neutral",steps:["#ededed","#c8c8c8","#a1a1a1","#6b6b6b","#3d3d3d","#111111"]}];function c(l){if(l==null)return null;let t=String(l).trim().replace(/^#/,"");return t.length===3&&(t=t.split("").map(e=>e+e).join("")),/^[0-9a-fA-F]{6}$/.test(t)?`#${t.toLowerCase()}`:null}const f=`
  :host { display: inline-block; }
  :host([block]) { display: block; }
  .pl {
    --r: var(--ctrl-r-md, 12px);
    --w: 264px;
    --accent: var(--inp-accent, #ededed);
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: var(--w);
    padding: 16px;
    border: 1px solid var(--inp-border, var(--border, #2a2a2a));
    border-radius: var(--rr, var(--r));
    background: var(--bg-card, #111);
    color: var(--inp-text, #ededed);
    font: inherit;
    transition: border-color 200ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .pl--block { width: 100%; }
  .pl:hover:not(.is-disabled) { border-color: var(--inp-border-hover, #3d3d3d); }

  .pl--sm { --r: var(--ctrl-r-sm, 8px); --w: 232px; font-size: var(--ctrl-fs-sm, 13px); }
  .pl--lg { --r: var(--ctrl-r-lg, 16px); --w: 304px; font-size: var(--ctrl-fs-lg, 15px); }

  .pl--r-none { --rr: 0px; }
  .pl--r-subtle { --rr: 10px; }
  .pl--r-rounded { --rr: 18px; }
  .pl--r-pill { --rr: 24px; }
  @supports (corner-shape: squircle) {
    .pl--r-squircle { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
  }

  .pl__head { display: flex; align-items: center; gap: 10px; }
  .pl__preview {
    flex: none;
    width: var(--ctrl-h-md, 38px);
    height: var(--ctrl-h-md, 38px);
    border-radius: 10px;
    border: 1px solid var(--inp-border, var(--border, #2a2a2a));
  }
  .pl--sm .pl__preview { width: var(--ctrl-h-sm, 32px); height: var(--ctrl-h-sm, 32px); }
  .pl--lg .pl__preview { width: var(--ctrl-h-lg, 44px); height: var(--ctrl-h-lg, 44px); }
  .pl__field {
    flex: 1;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    min-width: 0;
    height: var(--ctrl-h-md, 38px);
    padding: 0 10px;
    border: 1px solid var(--inp-border, var(--border, #2a2a2a));
    border-radius: 9px;
    background: var(--bg-input, var(--bg-elevated, #1a1a1a));
    transition: border-color 160ms ease;
  }
  .pl__field:focus-within { border-color: var(--accent); }
  .pl__hash { color: var(--inp-placeholder, #8b8b8b); }
  .pl__hex {
    flex: 1; min-width: 0; border: none; background: transparent;
    color: var(--inp-text, #ededed); font: inherit; font-size: 13px;
    font-variant-numeric: tabular-nums; text-transform: lowercase; outline: none;
  }
  .pl__cur-label { font-size: 13px; font-variant-numeric: tabular-nums; color: var(--text-secondary, #a1a1a1); }

  .pl__ramps { display: flex; flex-direction: column; gap: 10px; }
  .pl__ramp { display: flex; flex-direction: column; gap: 4px; }
  .pl__name {
    font-size: 11px; font-weight: 600; letter-spacing: 0.02em;
    color: var(--text-secondary, #a1a1a1);
  }
  .pl__steps { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 4px; }
  .pl__step {
    height: 22px;
    border-radius: 5px;
    border: 1px solid rgba(127, 127, 127, 0.22);
    background: var(--c);
    cursor: pointer;
    padding: 0;
    transition: transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 150ms ease;
  }
  .pl--sm .pl__step { height: 18px; }
  .pl--lg .pl__step { height: 26px; }
  .pl__step:hover:not(:disabled) { transform: translateY(-3px); z-index: 1; }
  .pl__step:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--accent); }
  .pl__step.is-active {
    transform: translateY(-3px);
    box-shadow: 0 0 0 2px var(--bg-card, #111), 0 0 0 4px var(--accent);
  }

  .pl--t-danger  { --accent: #ff6369; }
  .pl--t-warn    { --accent: #ffb224; }
  .pl--t-success { --accent: #4cc38a; }

  .pl.is-disabled { opacity: 0.5; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .pl, .pl__field, .pl__step { transition: none; }
    .pl__step:hover:not(:disabled) { transform: none; }
    .pl__step.is-active { transform: none; }
  }
`;let d;function m(l){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=l;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(l,t){const e=t?m(String(t).trim()):null;if(!e){for(const s of v)l.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),n=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,p=e.map(s=>Math.round(n?s*.92:s+(255-s)*.16)),a=(s,b)=>l.style.setProperty(s,b);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(s,o);a("--btn-primary-bg-hover",`rgb(${p[0]} ${p[1]} ${p[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(s,n?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])a(s,n?"0 0 0":"255 255 255");a("--vs-color",o),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["value","size","radius","tone","show-inputs","disabled","block","glow","color"];#r;#a;#n;#t;#l;#s;#e="#6e56cf";#o=h;#i=[];#p;#d;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#r=document.createElement("div"),this.#r.className="pl",this.#r.setAttribute("role","group"),this.#r.setAttribute("aria-label","Color picker");const r=document.createElement("div");r.className="pl__head",this.#a=document.createElement("span"),this.#a.className="pl__preview",this.#a.setAttribute("aria-hidden","true"),this.#n=document.createElement("div"),this.#n.className="pl__field";const i=document.createElement("span");i.className="pl__hash",i.setAttribute("aria-hidden","true"),i.textContent="#",this.#t=document.createElement("input"),this.#t.className="pl__hex",this.#t.type="text",this.#t.maxLength=6,this.#t.spellcheck=!1,this.#t.setAttribute("aria-label","Hex value"),this.#n.append(i,this.#t),this.#l=document.createElement("span"),this.#l.className="pl__cur-label",r.append(this.#a,this.#n,this.#l),this.#s=document.createElement("div"),this.#s.className="pl__ramps",this.#r.append(r,this.#s),t.append(e,this.#r),this.#p=()=>{const n=c(this.#t.value);n&&this.#b(n)},this.#d=()=>{this.#t.value=this.#e.replace(/^#/,"")},this.#t.addEventListener("input",this.#p),this.#t.addEventListener("blur",this.#d)}connectedCallback(){u(this,this.getAttribute("color")),this.#e=c(this.getAttribute("value"))||"#6e56cf",this.#u(),this.#f()}disconnectedCallback(){this.#t.removeEventListener("input",this.#p),this.#t.removeEventListener("blur",this.#d);for(const t of this.#i)t.btn.remove();this.#i=[]}attributeChangedCallback(t,e,r){if(u(this,this.getAttribute("color")),!!this.#r){if(t==="value"){const i=c(r);i&&i!==this.#e&&(this.#e=i,this.#c(),this.#h());return}this.#f()}}get value(){return this.#e}set value(t){const e=c(t);e&&this.setAttribute("value",e)}get palettes(){return this.#o}set palettes(t){this.#o=Array.isArray(t)&&t.length?t:h,this.#r&&(this.#u(),this.#c())}get palette(){return this.#o}set palette(t){this.palettes=t}get disabled(){return this.hasAttribute("disabled")}set disabled(t){t?this.setAttribute("disabled",""):this.removeAttribute("disabled")}#u(){for(;this.#s.firstChild;)this.#s.removeChild(this.#s.firstChild);this.#i=[];const t=this.hasAttribute("disabled");for(const e of this.#o){const r=document.createElement("div");r.className="pl__ramp",r.setAttribute("role","group"),r.setAttribute("aria-label",e.name);const i=document.createElement("span");i.className="pl__name",i.textContent=e.name;const n=document.createElement("div");n.className="pl__steps",(e.steps||[]).forEach((o,p)=>{const a=document.createElement("button");a.className="pl__step",a.type="button",a.style.setProperty("--c",o),a.disabled=t,a.setAttribute("aria-label",`${e.name} ${p+1} ${o}`),a.addEventListener("click",()=>this.#m(o)),n.appendChild(a),this.#i.push({btn:a,hex:c(o)||""})}),r.append(i,n),this.#s.appendChild(r)}this.#c()}#m(t){this.hasAttribute("disabled")||this.#b(t)}#b(t){const e=c(t);e&&(this.#e,this.#e=e,this.getAttribute("value")!==e&&this.setAttribute("value",e),this.#c(),this.#h(),this.dispatchEvent(new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:e}})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e}})))}#c(){for(const{btn:t,hex:e}of this.#i){const r=e===this.#e;t.classList.toggle("is-active",r),t.setAttribute("aria-pressed",r?"true":"false")}}#h(){this.#a.style.background=this.#e,document.activeElement!==this.#t&&(this.#t.value=this.#e.replace(/^#/,"")),this.#l.textContent=this.#e}#f(){const t=(i,n)=>this.getAttribute(i)??n,e=this.hasAttribute("disabled"),r=t("show-inputs","true")!=="false";this.#r.className=["pl",`pl--${t("size","md")}`,`pl--r-${t("radius","rounded")}`,`pl--t-${t("tone","default")}`,e?"is-disabled":"",this.hasAttribute("block")?"pl--block":"",t("glow","true")!=="false"?"pl--glow":""].filter(Boolean).join(" "),this.#n.style.display=r?"":"none",this.#l.style.display=r?"none":"",this.#t.disabled=e;for(const{btn:i}of this.#i)i.disabled=e;this.#h()}}customElements.define("vs-color-picker-palette",g);
