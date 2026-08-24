const _=`
  :host { display: inline-flex; }
  .ringavg {
    --sz: 40px;
    --fs: 15px;
    --ov: 0.38;
    --ring-color: var(--primary, var(--ui-accent, #ededed));
    --ring-w: 2.5px;
    display: inline-flex;
    align-items: center;
    isolation: isolate;
  }
  .ringavg--xs { --sz: 24px; --fs: 10px; --ring-w: 2px; }
  .ringavg--sm { --sz: 32px; --fs: 12px; --ring-w: 2px; }
  .ringavg--md { --sz: 40px; --fs: 15px; --ring-w: 2.5px; }
  .ringavg--lg { --sz: 56px; --fs: 20px; --ring-w: 3px; }
  .ringavg--xl { --sz: 80px; --fs: 28px; --ring-w: 4px; }
  .ringavg--ov-sm { --ov: 0.25; }
  .ringavg--ov-md { --ov: 0.38; }
  .ringavg--ov-lg { --ov: 0.52; }

  .ringavg__item {
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
    transition: transform 320ms cubic-bezier(0.34, 1.56, 0.5, 1);
  }
  .ringavg__item + .ringavg__item { margin-left: calc(var(--sz) * var(--ov) * -1); }
  .ringavg__item:hover { transform: translateY(-4px) scale(1.06); z-index: 60 !important; }

  /* spinning conic ring behind the avatar — position:absolute, out of flow */
  .ringavg__ring {
    position: absolute;
    inset: calc(var(--ring-w) * -1.6);
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      var(--ring-color),
      color-mix(in srgb, var(--ring-color) 20%, transparent) 55%,
      var(--ring-color)
    );
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - var(--ring-w)), #000 calc(100% - var(--ring-w)));
    mask: radial-gradient(farthest-side, transparent calc(100% - var(--ring-w)), #000 calc(100% - var(--ring-w)));
    animation: ringavg-spin 3.4s linear infinite;
    opacity: 0.85;
  }
  .ringavg__item:hover .ringavg__ring { animation-duration: 0.9s; opacity: 1; }
  @keyframes ringavg-spin { to { transform: rotate(360deg); } }

  .ringavg__av {
    position: relative;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
    background: var(--bg-elevated, #161616);
    color: var(--text, #ededed);
    font-size: calc(var(--fs) * 0.9);
    font-weight: 600;
    box-shadow: 0 0 0 2px var(--bg, #000);
  }
  .ringavg__av--rounded { border-radius: 30%; }
  .ringavg__av--squircle { border-radius: 26%; }
  @supports (corner-shape: squircle) {
    .ringavg__av--squircle { corner-shape: squircle; }
  }
  .ringavg__img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .ringavg__ini { color: var(--text-secondary, #aaa); letter-spacing: -0.02em; }
  .ringavg__av--chip {
    background: var(--bg-card, #1d1d1d);
    color: var(--text-secondary, #aaa);
    font-size: calc(var(--fs) * 0.82);
  }

  @media (prefers-reduced-motion: reduce) {
    .ringavg__item { transition: none; }
    .ringavg__ring { animation: none; }
    .ringavg__item:hover { transform: none; }
    .ringavg__item:hover .ringavg__ring { animation: none; }
  }
`,b=[{name:"Ada Lovelace",src:"https://i.pravatar.cc/120?img=5"},{name:"Alan Turing",src:"https://i.pravatar.cc/120?img=12"},{name:"Grace Hopper",src:"https://i.pravatar.cc/120?img=32"},{name:"Linus Torvalds",src:"https://i.pravatar.cc/120?img=68"},{name:"Margaret Hamilton",src:"https://i.pravatar.cc/120?img=47"},{name:"Dennis Ritchie",src:"https://i.pravatar.cc/120?img=51"}];function x(o){return o?o.trim().split(/\s+/).slice(0,2).map(t=>t[0]?.toUpperCase()??"").join(""):"?"}let d;function y(o){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=o;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const w=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(o,t){const e=t?y(String(t).trim()):null;if(!e){for(const r of w)o.style.removeProperty(r);return}const v=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),p=.2126*v(e[0])+.7152*v(e[1])+.0722*v(e[2])>.45,g=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(r=>Math.round(p?r*.92:r+(255-r)*.16)),n=(r,i)=>o.style.setProperty(r,i);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(r,g);n("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(r,p?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])n(r,p?"0 0 0":"255 255 255");n("--vs-color",g),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",p?"#0b0b0b":"#ffffff")}class A extends HTMLElement{static observedAttributes=["max","size","shape","overlap","ring-color","color"];#t;#r=b;constructor(){super(),this.#t=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=_,this.#t.append(t,document.createElement("div"))}connectedCallback(){f(this,this.getAttribute("color")),this.#e()}attributeChangedCallback(){f(this,this.getAttribute("color")),this.isConnected&&this.#e()}set items(t){this.#r=Array.isArray(t)?t:b,this.isConnected&&this.#e()}get items(){return this.#r}#e(){const t=this.#t.querySelector("div"),e=this.getAttribute("size")??"md",v=this.getAttribute("shape")??"circle",u=this.getAttribute("overlap")??"md",p=this.getAttribute("ring-color")??"var(--primary, var(--ui-accent, #ededed))",g=this.hasAttribute("max")?Number(this.getAttribute("max")):4;t.className=`ringavg ringavg--${e} ringavg--ov-${u}`,t.style.setProperty("--ring-color",p);const a=this.#r,n=g>0?a.slice(0,g):a,r=g>0?Math.max(0,a.length-g):0;if(t.textContent="",n.forEach((i,l)=>{const c=document.createElement("button");c.type="button",c.className="ringavg__item",c.style.zIndex=String(a.length-l),c.style.setProperty("--i",String(l)),c.setAttribute("aria-label",i.name||"Avatar"),c.addEventListener("click",()=>this.#i("item",{item:i,index:l}));const h=document.createElement("span");h.className="ringavg__ring",h.setAttribute("aria-hidden","true");const m=document.createElement("span");if(m.className=`ringavg__av ringavg__av--${v}`,i.src){const s=document.createElement("img");s.className="ringavg__img",s.src=i.src,s.alt=i.name||"",m.appendChild(s)}else{const s=document.createElement("span");s.className="ringavg__ini",s.setAttribute("aria-hidden","true"),s.textContent=x(i.name),m.appendChild(s)}c.append(h,m),t.appendChild(c)}),r>0){const i=document.createElement("button");i.type="button",i.className="ringavg__item ringavg__more",i.style.zIndex=String(a.length+1),i.style.setProperty("--i",String(n.length)),i.setAttribute("aria-label",`${r} more`),i.addEventListener("click",()=>this.#i("more"));const l=document.createElement("span");l.className=`ringavg__av ringavg__av--chip ringavg__av--${v}`,l.textContent=`+${r}`,i.appendChild(l),t.appendChild(i)}}#i(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}disconnectedCallback(){const t=this.#t.querySelector("div");t&&(t.textContent="")}}customElements.define("vs-avatar-group-ring",A);
