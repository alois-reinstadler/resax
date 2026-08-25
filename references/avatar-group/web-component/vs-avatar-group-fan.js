const u=`
  :host { display: inline-flex; }
  .fanavg {
    --sz: 40px;
    --fs: 15px;
    --ov: 0.38;
    display: inline-flex;
    align-items: flex-end;
    isolation: isolate;
  }
  .fanavg--xs { --sz: 24px; --fs: 10px; }
  .fanavg--sm { --sz: 32px; --fs: 12px; }
  .fanavg--md { --sz: 40px; --fs: 15px; }
  .fanavg--lg { --sz: 56px; --fs: 20px; }
  .fanavg--xl { --sz: 80px; --fs: 28px; }
  .fanavg--ov-sm { --ov: 0.25; }
  .fanavg--ov-md { --ov: 0.38; }
  .fanavg--ov-lg { --ov: 0.52; }

  .fanavg__item {
    position: relative;
    display: grid;
    place-items: center;
    width: var(--sz);
    height: var(--sz);
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    line-height: 0;
    -webkit-tap-highlight-color: transparent;
    /* pivot at the base → "card in hand" rotation */
    transform-origin: 50% 130%;
    --rot: 0deg;
    transform: rotate(0deg);
    transition: transform 460ms cubic-bezier(0.34, 1.56, 0.5, 1);
  }
  .fanavg__item + .fanavg__item { margin-left: calc(var(--sz) * var(--ov) * -1); }

  .fanavg:hover .fanavg__item { transform: rotate(var(--rot)); }
  .fanavg__item:hover { z-index: 60 !important; }

  .fanavg__av {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
    background: var(--vs-color, var(--bg-elevated, #161616));
    color: var(--text, #ededed);
    font-size: calc(var(--fs) * 0.9);
    font-weight: 600;
    box-shadow: 0 0 0 2px var(--bg, #000);
  }
  .fanavg__av--rounded { border-radius: 30%; }
  .fanavg__av--squircle { border-radius: 26%; }
  @supports (corner-shape: squircle) {
    .fanavg__av--squircle { corner-shape: squircle; }
  }
  .fanavg__img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .fanavg__ini { color: var(--text-secondary, #aaa); letter-spacing: -0.02em; }
  .fanavg__av--chip {
    background: var(--bg-card, #1d1d1d);
    color: var(--text-secondary, #aaa);
    font-size: calc(var(--fs) * 0.82);
  }

  @media (prefers-reduced-motion: reduce) {
    .fanavg__item { transition: none; }
    .fanavg:hover .fanavg__item { transform: none; }
  }
`,d=[{name:"Ada Lovelace",src:"https://i.pravatar.cc/120?img=5"},{name:"Alan Turing",src:"https://i.pravatar.cc/120?img=12"},{name:"Grace Hopper",src:"https://i.pravatar.cc/120?img=32"},{name:"Linus Torvalds",src:"https://i.pravatar.cc/120?img=68"},{name:"Margaret Hamilton",src:"https://i.pravatar.cc/120?img=47"},{name:"Dennis Ritchie",src:"https://i.pravatar.cc/120?img=51"}];function b(s){return s?s.trim().split(/\s+/).slice(0,2).map(a=>a[0]?.toUpperCase()??"").join(""):"?"}let v;function _(s){if(v||=document.createElement("canvas").getContext("2d"),!v)return null;v.fillStyle="#000",v.fillStyle=s;const a=v.fillStyle;if(a.charAt(0)==="#")return[parseInt(a.slice(1,3),16),parseInt(a.slice(3,5),16),parseInt(a.slice(5,7),16)];const e=a.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(s,a){const e=a?_(String(a).trim()):null;if(!e){for(const t of x)s.style.removeProperty(t);return}const f=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),c=.2126*f(e[0])+.7152*f(e[1])+.0722*f(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,g=e.map(t=>Math.round(c?t*.92:t+(255-t)*.16)),n=(t,r)=>s.style.setProperty(t,r);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(t,l);n("--btn-primary-bg-hover",`rgb(${g[0]} ${g[1]} ${g[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(t,e.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(t,c?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])n(t,c?"0 0 0":"255 255 255");n("--vs-color",l),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["max","size","shape","overlap","fan-angle","color"];#t;#e=d;constructor(){super();const a=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#t=document.createElement("div"),this.#t.className="fanavg",a.append(e,this.#t)}connectedCallback(){h(this,this.getAttribute("color")),this.#a()}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#t&&this.#a()}set items(a){this.#e=Array.isArray(a)?a:d,this.#a()}get items(){return this.#e}#a(){if(!this.#t)return;const a=this.#e,e=Number(this.getAttribute("max")??4),f=this.getAttribute("shape")??"circle",p=Number(this.getAttribute("fan-angle")??44);this.#t.className=`fanavg fanavg--${this.getAttribute("size")??"md"} fanavg--ov-${this.getAttribute("overlap")??"md"}`;const c=e>0?a.slice(0,e):a,l=e>0?Math.max(0,a.length-e):0,g=c.length+(l>0?1:0),n=t=>g<=1?0:(t/(g-1)-.5)*p;if(this.#t.replaceChildren(),c.forEach((t,r)=>{const o=document.createElement("button");o.type="button",o.className="fanavg__item",o.style.zIndex=String(a.length-r),o.style.setProperty("--rot",n(r)+"deg"),o.setAttribute("aria-label",t.name||"Avatar");const m=document.createElement("span");if(m.className=`fanavg__av fanavg__av--${f}`,t.src){const i=document.createElement("img");i.className="fanavg__img",i.src=t.src,i.alt=t.name||"",m.append(i)}else{const i=document.createElement("span");i.className="fanavg__ini",i.setAttribute("aria-hidden","true"),i.textContent=b(t.name),m.append(i)}o.append(m),o.addEventListener("click",()=>this.#n("item",{item:t,index:r})),this.#t.append(o)}),l>0){const t=document.createElement("button");t.type="button",t.className="fanavg__item fanavg__more",t.style.zIndex=String(a.length+1),t.style.setProperty("--rot",n(g-1)+"deg"),t.setAttribute("aria-label",l+" more");const r=document.createElement("span");r.className=`fanavg__av fanavg__av--chip fanavg__av--${f}`,r.textContent=`+${l}`,t.append(r),t.addEventListener("click",()=>this.#n("more")),this.#t.append(t)}}#n(a,e){this.dispatchEvent(new CustomEvent(a,{bubbles:!0,composed:!0,detail:e}))}}customElements.define("vs-avatar-group-fan",y);
