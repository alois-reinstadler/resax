const u=`
  :host { display: inline-flex; }
  .flipavg {
    --sz: 40px; --fs: 15px; --ov: 0.38;
    display: inline-flex; align-items: center; isolation: isolate; perspective: 620px;
  }
  .flipavg--xs { --sz: 24px; --fs: 10px; }
  .flipavg--sm { --sz: 32px; --fs: 12px; }
  .flipavg--md { --sz: 40px; --fs: 15px; }
  .flipavg--lg { --sz: 56px; --fs: 20px; }
  .flipavg--xl { --sz: 80px; --fs: 28px; }
  .flipavg--ov-sm { --ov: 0.25; }
  .flipavg--ov-md { --ov: 0.38; }
  .flipavg--ov-lg { --ov: 0.52; }

  .flipavg__item {
    position: relative; display: grid; place-items: center;
    width: var(--sz); height: var(--sz); padding: 0; border: 0; background: none;
    cursor: pointer; line-height: 0; -webkit-tap-highlight-color: transparent;
  }
  .flipavg__item + .flipavg__item { margin-left: calc(var(--sz) * var(--ov) * -1); }
  .flipavg__item:hover { z-index: 60 !important; }

  .flipavg__card {
    position: relative; width: 100%; height: 100%; border-radius: 50%;
    transform-style: preserve-3d; transform: rotateY(0deg);
    transition: transform 560ms cubic-bezier(0.34, 1.4, 0.5, 1);
  }
  .flipavg__card--rounded { border-radius: 30%; }
  .flipavg__card--squircle { border-radius: 26%; }
  @supports (corner-shape: squircle) {
    .flipavg__card--squircle { corner-shape: squircle; }
  }
  .flipavg--hoverflip .flipavg__item:hover .flipavg__card { transform: rotateY(180deg); }

  /* faces are position:absolute — out of flow, stacked for the 3D flip */
  .flipavg__face {
    position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden;
    border-radius: inherit; backface-visibility: hidden; -webkit-backface-visibility: hidden;
    background: var(--vs-color, var(--bg-elevated, #161616)); color: var(--text, #ededed);
    font-size: calc(var(--fs) * 0.9); font-weight: 600; letter-spacing: -0.02em;
    box-shadow: 0 0 0 2px var(--bg, #000);
  }
  .flipavg__face--back {
    transform: rotateY(180deg);
    background: var(--bg-card, #1d1d1d); color: var(--text-secondary, #aaa);
  }
  .flipavg__img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .flipavg__ini { color: var(--text-secondary, #aaa); }
  .flipavg__card--chip .flipavg__face--front {
    background: var(--bg-card, #1d1d1d); color: var(--text-secondary, #aaa);
    font-size: calc(var(--fs) * 0.82);
  }

  @media (prefers-reduced-motion: reduce) {
    .flipavg__card { transition: none; }
    .flipavg--hoverflip .flipavg__item:hover .flipavg__card { transform: none; }
  }
`,h=[{name:"Ada Lovelace",src:"https://i.pravatar.cc/120?img=5"},{name:"Alan Turing",src:"https://i.pravatar.cc/120?img=12"},{name:"Grace Hopper",src:"https://i.pravatar.cc/120?img=32"},{name:"Linus Torvalds",src:"https://i.pravatar.cc/120?img=68"},{name:"Margaret Hamilton",src:"https://i.pravatar.cc/120?img=47"},{name:"Dennis Ritchie",src:"https://i.pravatar.cc/120?img=51"}];function _(f){return f?f.trim().split(/\s+/).slice(0,2).map(t=>t[0]?.toUpperCase()??"").join(""):"?"}let g;function y(f){if(g||=document.createElement("canvas").getContext("2d"),!g)return null;g.fillStyle="#000",g.fillStyle=f;const t=g.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(f,t){const e=t?y(String(t).trim()):null;if(!e){for(const i of x)f.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),p=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,s=e.map(i=>Math.round(p?i*.92:i+(255-i)*.16)),o=(i,m)=>f.style.setProperty(i,m);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(i,c);o("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(i,p?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])o(i,p?"0 0 0":"255 255 255");o("--vs-color",c),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",p?"#0b0b0b":"#ffffff")}class k extends HTMLElement{static observedAttributes=["max","size","shape","overlap","flip-on-hover","color"];#e;#a=h;#i=[];#t;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#e=document.createElement("div"),t.append(e,this.#e)}connectedCallback(){b(this,this.getAttribute("color")),this.#r()}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#e&&this.#r()}get items(){return this.#a}set items(t){this.#a=Array.isArray(t)?t:h,this.#e&&this.#r()}#n(){const t=document.createElement("button");t.type="button",t.className="flipavg__item";const e=document.createElement("span");e.className="flipavg__card";const n=document.createElement("span");n.className="flipavg__face flipavg__face--front";const l=document.createElement("img");l.className="flipavg__img";const p=document.createElement("span");p.className="flipavg__ini",p.setAttribute("aria-hidden","true"),n.append(l,p);const c=document.createElement("span");c.className="flipavg__face flipavg__face--back",c.setAttribute("aria-hidden","true"),e.append(n,c),t.append(e);const s={btn:t,card:e,img:l,ini:p,back:c,idx:-1,onClick:null};return s.onClick=()=>this.dispatchEvent(new CustomEvent("item",{detail:{item:this.#a[s.idx],index:s.idx},bubbles:!0,composed:!0})),t.addEventListener("click",s.onClick),s}#s(){const t=document.createElement("button");t.type="button",t.className="flipavg__item flipavg__more";const e=document.createElement("span");e.className="flipavg__card flipavg__card--chip";const n=document.createElement("span");n.className="flipavg__face flipavg__face--front";const l=document.createElement("span");return l.className="flipavg__face flipavg__face--back",l.setAttribute("aria-hidden","true"),l.textContent="···",e.append(n,l),t.append(e),t.addEventListener("click",()=>this.dispatchEvent(new CustomEvent("more",{bubbles:!0,composed:!0}))),{btn:t,card:e,front:n}}#r(){const t=(a,d)=>this.getAttribute(a)??d,e=t("size","md"),n=t("shape","circle"),l=t("overlap","md"),p=this.hasAttribute("flip-on-hover"),c=parseInt(t("max","4"),10);this.#e.className=`flipavg flipavg--${e} flipavg--ov-${l}`+(p?" flipavg--hoverflip":"");const s=this.#a.length,o=c>0?this.#a.slice(0,c):this.#a,i=c>0?Math.max(0,s-c):0,m=`flipavg__card flipavg__card--${n}`;for(;this.#i.length<o.length;){const a=this.#n();this.#i.push(a),this.#e.appendChild(a.btn)}for(;this.#i.length>o.length;){const a=this.#i.pop();a.btn.removeEventListener("click",a.onClick),a.btn.remove()}o.forEach((a,d)=>{const r=this.#i[d];r.idx=d,r.card.className=m,r.btn.setAttribute("aria-label",a.name||"Avatar"),r.btn.style.zIndex=String(s-d),r.btn.style.setProperty("--i",String(d));const v=_(a.name);a.src?(r.img.style.display="block",r.img.src=a.src,r.img.alt=a.name||"",r.ini.style.display="none"):(r.img.style.display="none",r.img.removeAttribute("src"),r.ini.style.display="",r.ini.textContent=v),r.back.textContent=v}),i>0?(this.#t||(this.#t=this.#s()),this.#t.btn.parentNode!==this.#e&&this.#e.appendChild(this.#t.btn),this.#t.card.className=`${m} flipavg__card--chip`,this.#t.front.textContent=`+${i}`,this.#t.btn.setAttribute("aria-label",`${i} more`),this.#t.btn.style.zIndex=String(s+1),this.#t.btn.style.setProperty("--i",String(o.length))):this.#t&&this.#t.btn.parentNode&&this.#t.btn.remove()}disconnectedCallback(){for(const t of this.#i)t.btn.removeEventListener("click",t.onClick);this.#i=[],this.#e.replaceChildren(),this.#t=null}}customElements.define("vs-avatar-group-flip",k);
