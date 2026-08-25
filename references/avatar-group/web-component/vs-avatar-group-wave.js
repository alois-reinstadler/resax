const _=`
  :host { display: inline-flex; }
  .waveavg {
    --sz: 40px;
    --fs: 15px;
    --ov: 0.38;
    --wave-h: 10px;
    display: inline-flex;
    align-items: center;
    isolation: isolate;
  }
  .waveavg--xs { --sz: 24px; --fs: 10px; }
  .waveavg--sm { --sz: 32px; --fs: 12px; }
  .waveavg--md { --sz: 40px; --fs: 15px; }
  .waveavg--lg { --sz: 56px; --fs: 20px; }
  .waveavg--xl { --sz: 80px; --fs: 28px; }
  .waveavg--ov-sm { --ov: 0.25; }
  .waveavg--ov-md { --ov: 0.38; }
  .waveavg--ov-lg { --ov: 0.52; }

  .waveavg__item {
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
    transform: translateY(0);
    transition: transform 300ms ease;
  }
  .waveavg__item + .waveavg__item { margin-left: calc(var(--sz) * var(--ov) * -1); }

  /* on group hover, every item runs the same animation delayed by its index →
     the wave travels from left to right. */
  .waveavg:hover .waveavg__item {
    animation: waveavg-bob 1.1s ease-in-out infinite;
    animation-delay: calc(var(--i) * 110ms);
  }
  .waveavg__item:hover { z-index: 60 !important; }
  @keyframes waveavg-bob {
    0%, 100% { transform: translateY(0); }
    30% { transform: translateY(calc(var(--wave-h) * -1)); }
    60% { transform: translateY(0); }
  }

  .waveavg__av {
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
  .waveavg__av--rounded { border-radius: 30%; }
  .waveavg__av--squircle { border-radius: 26%; }
  @supports (corner-shape: squircle) {
    .waveavg__av--squircle { corner-shape: squircle; }
  }
  .waveavg__img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .waveavg__ini { color: var(--text-secondary, #aaa); letter-spacing: -0.02em; }
  .waveavg__av--chip {
    background: var(--bg-card, #1d1d1d);
    color: var(--text-secondary, #aaa);
    font-size: calc(var(--fs) * 0.82);
  }

  @media (prefers-reduced-motion: reduce) {
    .waveavg__item { transition: none; }
    .waveavg:hover .waveavg__item { animation: none; transform: none; }
  }
`,u=[{name:"Ada Lovelace",src:"https://i.pravatar.cc/120?img=5"},{name:"Alan Turing",src:"https://i.pravatar.cc/120?img=12"},{name:"Grace Hopper",src:"https://i.pravatar.cc/120?img=32"},{name:"Linus Torvalds",src:"https://i.pravatar.cc/120?img=68"},{name:"Margaret Hamilton",src:"https://i.pravatar.cc/120?img=47"},{name:"Dennis Ritchie",src:"https://i.pravatar.cc/120?img=51"}];function y(v){return v?v.trim().split(/\s+/).slice(0,2).map(e=>e[0]?.toUpperCase()??"").join(""):"?"}let f;function x(v){if(f||=document.createElement("canvas").getContext("2d"),!f)return null;f.fillStyle="#000",f.fillStyle=v;const e=f.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const k=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function w(v,e){const t=e?x(String(e).trim()):null;if(!t){for(const a of k)v.style.removeProperty(a);return}const l=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),h=.2126*l(t[0])+.7152*l(t[1])+.0722*l(t[2])>.45,m=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(a=>Math.round(h?a*.92:a+(255-a)*.16)),r=(a,i)=>v.style.setProperty(a,i);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(a,m);r("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(a,t.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(a,h?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])r(a,h?"0 0 0":"255 255 255");r("--vs-color",m),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",h?"#0b0b0b":"#ffffff")}class C extends HTMLElement{static observedAttributes=["max","size","shape","overlap","wave-height","color"];#s;#t;#n=u.slice();#a=[];#e;constructor(){super(),this.#s=this.attachShadow({mode:"open"});const e=document.createElement("style");e.textContent=_,this.#t=document.createElement("div"),this.#t.className="waveavg",this.#s.append(e,this.#t)}connectedCallback(){w(this,this.getAttribute("color")),this.#r()}disconnectedCallback(){this.#a.length=0,this.#e=null}attributeChangedCallback(){w(this,this.getAttribute("color")),this.isConnected&&this.#r()}set items(e){this.#n=Array.isArray(e)?e:u.slice(),this.isConnected&&this.#r()}get items(){return this.#n}#i(e,t){return this.getAttribute(e)??t}#o(){const e=document.createElement("button");e.type="button",e.className="waveavg__item";const t=document.createElement("span");t.className="waveavg__av";const l=document.createElement("img");l.className="waveavg__img";const p=document.createElement("span");return p.className="waveavg__ini",p.setAttribute("aria-hidden","true"),e.append(t),{btn:e,av:t,img:l,ini:p}}#r(){const e=this.#i("size","md"),t=this.#i("shape","circle"),l=this.#i("overlap","md"),p=this.#i("wave-height","10"),h=this.#i("max","4"),m=Number(h);this.#t.className=`waveavg waveavg--${e} waveavg--ov-${l}`,this.#t.style.setProperty("--wave-h",`${p}px`);const c=this.#n,r=m>0?c.slice(0,m):c,a=m>0?Math.max(0,c.length-m):0;for(let i=0;i<r.length;i++){const n=r[i]||{};let s=this.#a[i];s||(s=this.#o(),this.#a[i]=s);const{btn:o,av:b,img:g,ini:d}=s;o.style.zIndex=String(c.length-i),o.style.setProperty("--i",String(i)),o.setAttribute("aria-label",n.name||"Avatar"),b.className=`waveavg__av waveavg__av--${t}`,n.src?(g.getAttribute("src")!==n.src&&g.setAttribute("src",n.src),g.setAttribute("alt",n.name||""),d.parentNode&&d.remove(),g.parentNode||b.append(g)):(d.textContent=y(n.name),g.parentNode&&g.remove(),d.parentNode||b.append(d)),o.parentNode!==this.#t&&this.#t.append(o),s.onClick&&o.removeEventListener("click",s.onClick),s.onClick=()=>this.dispatchEvent(new CustomEvent("item",{detail:{item:n,index:i},bubbles:!0,composed:!0})),o.addEventListener("click",s.onClick)}for(let i=this.#a.length-1;i>=r.length;i--){const n=this.#a[i];n.onClick&&n.btn.removeEventListener("click",n.onClick),n.btn.remove(),this.#a.splice(i,1)}if(a>0){if(!this.#e){const s=document.createElement("button");s.type="button",s.className="waveavg__item waveavg__more";const o=document.createElement("span");s.append(o),this.#e={btn:s,av:o}}const{btn:i,av:n}=this.#e;i.style.zIndex=String(c.length+1),i.style.setProperty("--i",String(r.length)),i.setAttribute("aria-label",`${a} more`),n.className=`waveavg__av waveavg__av--chip waveavg__av--${t}`,n.textContent=`+${a}`,this.#e.onClick&&i.removeEventListener("click",this.#e.onClick),this.#e.onClick=()=>this.dispatchEvent(new CustomEvent("more",{bubbles:!0,composed:!0})),i.addEventListener("click",this.#e.onClick),i.parentNode!==this.#t&&this.#t.append(i)}else this.#e&&this.#e.btn.parentNode&&(this.#e.onClick&&this.#e.btn.removeEventListener("click",this.#e.onClick),this.#e.btn.remove())}}customElements.define("vs-avatar-group-wave",C);
