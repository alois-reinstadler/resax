const x=`
  :host { display: inline-flex; }
  .avg {
    --sz: 40px;
    --fs: 15px;
    --ov: 0.38;
    display: inline-flex;
    align-items: center;
    isolation: isolate;
    /* 3D depth → the avatar can "come closer" (animatable translateZ) */
    perspective: 620px;
    transform-style: preserve-3d;
  }
  .avg--xs { --sz: 24px; --fs: 10px; }
  .avg--sm { --sz: 32px; --fs: 12px; }
  .avg--md { --sz: 40px; --fs: 15px; }
  .avg--lg { --sz: 56px; --fs: 20px; }
  .avg--xl { --sz: 80px; --fs: 28px; }
  .avg--ov-sm { --ov: 0.25; }
  .avg--ov-md { --ov: 0.38; }
  .avg--ov-lg { --ov: 0.52; }

  .avg__item {
    position: relative;
    display: grid;
    place-items: center;
    width: var(--sz);
    height: var(--sz);
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    line-height: 0;
    border-radius: 50%;
    box-shadow: 0 0 0 2px var(--bg, #000);
    --avg-bounce: cubic-bezier(0.34, 1.8, 0.5, 1);
    --spread-x: 0px;
    --lift: 0px;
    --tz: 0px;
    --pop: 1;
    transform: translateX(var(--spread-x)) translateY(var(--lift)) translateZ(var(--tz)) scale(var(--pop));
    transition: transform 460ms var(--avg-bounce);
  }
  .avg__item + .avg__item,
  .avg__item + .avg__more-anchor { margin-left: calc(var(--sz) * var(--ov) * -1); }

  /* In this port the anchor and the +N chip are the SAME button, so this
     display:inline-flex overrides the display:grid on .avg__item — and
     place-items does not center along the inline axis in a flex container.
     Center explicitly here or the +N label sits flush against the left edge. */
  .avg__more-anchor {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    --spread-x: 0px;
    transform: translateX(var(--spread-x));
    transition: transform 460ms cubic-bezier(0.34, 1.8, 0.5, 1);
  }

  /* ring shape so it matches the avatar — mirrors the SFC's :has(.avt--*):
     the shape class rides the avatar FACE, the button rounds via :has(). */
  .avg__item:has(.avt--rounded),
  .avg__more--rounded { border-radius: 30%; }
  .avg__more--squircle { border-radius: 26%; }
  @supports (corner-shape: squircle) {
    .avg__item:has(.avt--squircle),
    .avg__more--squircle { corner-shape: squircle; }
  }

  /* hover: the group fans out and the avatar under the cursor lifts */
  .avg--spread:hover .avg__item,
  .avg--spread:hover .avg__more-anchor,
  .avg--spread.avg--open .avg__item,
  .avg--spread.avg--open .avg__more-anchor {
    --spread-x: calc(var(--i, 0) * var(--sz) * 0.16);
    --lift: -2px;
  }
  .avg__item:hover { --lift: -5px; --tz: 38px; z-index: 50 !important; }

  .avg__av {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: inherit;
    background: var(--vs-color, var(--bg-elevated, #161616));
    color: var(--text, #ededed);
    font-size: calc(var(--fs) * 0.9);
    font-weight: 600;
  }
  .avg__img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .avg__ini { color: var(--text-secondary, #aaa); letter-spacing: -0.02em; }

  /* +N overflow chip */
  .avg__more {
    background: var(--vs-color, var(--bg-elevated, #161616));
    color: var(--text-secondary, #aaa);
    /* .avg__item zeroes line-height for the <img> faces; the chip holds real
       text, so give it a line box back. */
    line-height: 1;
    font-size: calc(var(--fs) * 0.82);
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .avg__more:hover,
  .avg__more.is-open {
    color: var(--text, #ededed);
    background: var(--bg-card, #1d1d1d);
  }

  @media (prefers-reduced-motion: reduce) {
    .avg__item { transition: none; }
    .avg__item:hover { transform: none; }
  }
`,y=`
  .avg-pop {
    position: fixed;
    z-index: 2147483000;
    min-width: 200px;
    max-height: 264px;
    overflow: hidden;
    border-radius: 20px;
    border: 1px solid var(--sel-menu-border, rgba(255, 255, 255, 0.09));
    /* SFC parity: the panel is a VsTransform surface — bg = --bg-card, and the
       SFC's global override (.vt__panel:has(.avg__list) .vt__surface {
       box-shadow: none }) strips the drop shadow. Mirrored below via .vt__panel. */
    background: var(--bg-card, #0a0a0a);
    font-family: inherit;
    color: var(--text, #ededed);
    opacity: 0;
    filter: blur(6px);
    transform: scale(0.92);
    transform-origin: var(--ox, 50%) var(--oy, 0%);
    transition: opacity 200ms ease, transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 200ms ease;
  }
  .avg-pop.is-open { opacity: 1; filter: blur(0); transform: scale(1); }
  /* VsTransform panel identity: no drop shadow when it hosts the .avg__list. */
  .vt__panel:has(.avg__list) { box-shadow: none; }

  .avg__list {
    position: relative;
    display: grid;
    gap: 0;
    max-height: 264px;
    overflow-y: auto;
    padding: 4px;
    line-height: normal;
  }
  .avg__hl {
    position: absolute;
    z-index: 0;
    left: 4px;
    right: 4px;
    top: 4px;
    height: var(--row-h, 44px);
    border-radius: 16px;
    background: var(--sel-opt-hover, rgba(255, 255, 255, 0.06));
    transform: translateY(calc(var(--ai, 0) * var(--row-h, 44px)));
    opacity: 0;
    pointer-events: none;
    transition: transform 280ms cubic-bezier(0.34, 1.42, 0.5, 1), opacity 160ms ease;
  }
  .avg__hl.is-on { opacity: 1; }

  .avg__pop-row {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: var(--row-h, 44px);
    padding: 0 10px;
    border: 0;
    border-radius: 16px;
    background: none;
    color: var(--text, #ededed);
    font: inherit;
    font-size: var(--list-fs, 0.9em);
    text-align: left;
    cursor: pointer;
    transition: color 120ms ease;
  }
  .avg-pop__av {
    flex: none;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: 50%;
    background: var(--vs-color, var(--bg-elevated, #161616));
    color: var(--text, #ededed);
    font-weight: 600;
  }
  .avg-pop__av.avt--rounded { border-radius: 30%; }
  .avg-pop__av.avt--squircle { border-radius: 26%; }
  @supports (corner-shape: squircle) { .avg-pop__av.avt--squircle { corner-shape: squircle; } }
  .avg-pop__img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .avg-pop__ini { color: var(--text-secondary, #aaa); letter-spacing: -0.02em; }
  .avg__pop-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  @media (prefers-reduced-motion: reduce) {
    .avg-pop, .avg__hl { transition: none; }
  }
`,m=[{name:"Ada Lovelace",src:"https://i.pravatar.cc/120?img=5"},{name:"Alan Turing",src:"https://i.pravatar.cc/120?img=12"},{name:"Grace Hopper",src:"https://i.pravatar.cc/120?img=32"},{name:"Linus Torvalds",src:"https://i.pravatar.cc/120?img=68"},{name:"Margaret Hamilton",src:"https://i.pravatar.cc/120?img=47"},{name:"Dennis Ritchie",src:"https://i.pravatar.cc/120?img=51"}],g={xs:38,sm:46,md:54,lg:54,xl:70},u={xs:"0.85em",sm:"0.9em",md:"0.95em",lg:"0.95em",xl:"1.02em"},f={xs:24,sm:32,md:40,lg:40,xl:56};function w(h){return h?h.trim().split(/\s+/).slice(0,2).map(e=>e[0]?.toUpperCase()??"").join(""):"?"}function _(h,e,t,a,n){const i=document.createElement("span");if(i.className=h,n&&(i.style.width=`${n}px`,i.style.height=`${n}px`),a.src){const r=document.createElement("img");r.className=e,r.src=a.src,r.alt=a.name||"",i.append(r)}else{const r=document.createElement("span");r.className=t,r.setAttribute("aria-hidden","true"),r.textContent=w(a.name),i.append(r)}return i}let d;function E(h){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=h;const e=d.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const z=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(h,e){const t=e?E(String(e).trim()):null;if(!t){for(const s of z)h.style.removeProperty(s);return}const a=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),i=.2126*a(t[0])+.7152*a(t[1])+.0722*a(t[2])>.45,r=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(s=>Math.round(i?s*.92:s+(255-s)*.16)),o=(s,p)=>h.style.setProperty(s,p);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(s,r);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(s,t.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(s,i?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])o(s,i?"0 0 0":"255 255 255");o("--vs-color",r),o("--vs-color-rgb",t.join(" ")),o("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class A extends HTMLElement{static observedAttributes=["max","size","shape","overlap","spread","color"];#s;#p=m;#m=[];#t=null;#e=!1;#h=!1;#n=null;#r=null;#o=null;#i=-1;#g=0;#d=!1;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=x,this.#s=document.createElement("div"),e.append(t,this.#s)}connectedCallback(){b(this,this.getAttribute("color")),this.#u()}attributeChangedCallback(){b(this,this.getAttribute("color")),this.isConnected&&this.#u()}disconnectedCallback(){this.#w(),clearTimeout(this.#g),this.#y(),this.#e=!1,this.#h=!1}get items(){return this.#p}set items(e){const t=Array.isArray(e)?e:m;t!==this.#p&&(this.#p=t,this.isConnected&&this.#u())}#a(e,t){return this.getAttribute(e)??t}#A(e,t){if(!this.hasAttribute(e))return t;const a=this.getAttribute(e);return!(a==="false"||a==="0")}#l(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}#u(){if(!this.#s)return;const e=this.#a("size","md"),t=this.#a("shape","circle"),a=this.#a("overlap","md"),n=this.#A("spread",!0),i=Number(this.#a("max","4"));this.#s.className=`avg avg--${e} avg--ov-${a}`+(n?" avg--spread":"")+(this.#h?" avg--open":"");const r=this.#p,l=i>0?r.slice(0,i):r;this.#m=i>0?r.slice(i):[];const o=this.#m.length;if(this.#s.replaceChildren(),l.forEach((s,p)=>{const c=document.createElement("button");c.type="button",c.className="avg__item",c.style.zIndex=String(r.length-p),c.style.setProperty("--i",String(p)),c.setAttribute("aria-label",s.name||"Avatar");const v=_(`avg__av avt--${t}`,"avg__img","avg__ini",s);c.append(v),c.addEventListener("click",()=>this.#l("item",{item:s,index:p})),this.#s.append(c)}),o>0){const s=document.createElement("button");s.type="button",s.className=`avg__item avg__more-anchor avg__more avg__more--${t}`+(this.#e?" is-open":""),s.style.zIndex=String(r.length+1),s.style.setProperty("--i",String(Math.max(0,l.length-1))),s.setAttribute("aria-label",`${o} more`),s.setAttribute("aria-haspopup","menu"),s.setAttribute("aria-expanded",this.#e?"true":"false"),s.textContent=`+${o}`,s.addEventListener("click",()=>this.#L()),this.#s.append(s),this.#t=s}else this.#t=null,this.#e&&this.#c();this.#e&&this.#r&&this.#C()}#L(){this.#e?this.#c():this.#S()}#S(){this.#e||!this.#t||(this.#e=!0,this.#h=!0,this.#t.classList.add("is-open"),this.#t.setAttribute("aria-expanded","true"),this.#s.classList.add("avg--open"),this.#k(),this.#P(),this.#l("open"),this.#l("more"))}#c(){if(!this.#e)return;this.#e=!1,this.#t?.classList.remove("is-open"),this.#t?.setAttribute("aria-expanded","false"),this.#w();const e=this.#r;if(!e){this.#b();return}e.classList.remove("is-open");let t=!1;const a=()=>{t||(t=!0,e.removeEventListener("transitionend",n),clearTimeout(this.#g),this.#b())},n=i=>{i.target===e&&a()};e.addEventListener("transitionend",n),this.#g=setTimeout(a,380)}#b(){this.#y(),this.#h=!1,this.#s.classList.remove("avg--open"),this.#l("close")}#k(){const e=document.createElement("div"),t=e.attachShadow({mode:"open"}),a=document.createElement("style");a.textContent=y;const n=document.createElement("div");n.className="avg-pop vt__panel",n.setAttribute("role","menu");const i=document.createElement("div");i.className="avg__list";const r=document.createElement("span");r.className="avg__hl",r.setAttribute("aria-hidden","true"),i.append(r),i.addEventListener("mouseleave",()=>{this.#i=-1,this.#f()}),n.append(i),t.append(a,n),document.body.append(e),this.#n=e,this.#r=n,this.#o=r,this.#i=-1,this.#x(i),this.#_(),n.offsetWidth,n.classList.add("is-open")}#x(e){[...e.querySelectorAll(".avg__pop-row")].forEach(l=>l.remove());const t=this.#a("size","md"),a=this.#a("shape","circle"),n=Number(this.#a("max","4")),i=g[t]??g.md,r=f[t]??f.md;this.#r.style.setProperty("--row-h",`${i}px`),e.style.setProperty("--list-fs",u[t]??u.md),this.#m.forEach((l,o)=>{const s=document.createElement("button");s.type="button",s.className="avg__pop-row",s.setAttribute("role","menuitem");const p=_(`avg-pop__av avt--${a}`,"avg-pop__img","avg-pop__ini",l,r),c=document.createElement("span");c.className="avg__pop-name",c.textContent=l.name||"Unnamed",s.append(p,c),s.addEventListener("mouseenter",()=>{this.#i=o,this.#f()}),s.addEventListener("click",()=>{this.#l("item",{item:l,index:n+o}),this.#c()}),e.append(s)})}#C(){const e=this.#r?.querySelector(".avg__list");e&&(this.#i=-1,this.#x(e),this.#f(),this.#t&&this.#_())}#f(){this.#o&&(this.#o.classList.toggle("is-on",this.#i>=0),this.#o.style.setProperty("--ai",String(this.#i<0?0:this.#i)))}#_(){const e=this.#r;if(!e||!this.#t)return;const t=this.#t.getBoundingClientRect(),a=window.innerWidth,n=window.innerHeight,i=8,r=10,l=e.offsetWidth||200,o=e.offsetHeight||120;let s=t.left,p=t.bottom+r,c=!1;p+o+i>n&&(p=t.top-o-r,c=!0),s+l+i>a&&(s=t.right-l),s=Math.max(i,Math.min(s,a-l-i)),p=Math.max(i,Math.min(p,n-o-i)),e.style.left=`${s}px`,e.style.top=`${p}px`;const v=Math.max(0,Math.min(l,t.left+t.width/2-s));e.style.setProperty("--ox",`${v}px`),e.style.setProperty("--oy",c?`${o}px`:"0px")}#y(){this.#n?.remove(),this.#n=null,this.#r=null,this.#o=null,this.#i=-1}#P(){this.#d||(this.#d=!0,document.addEventListener("pointerdown",this.#E,!0),document.addEventListener("keydown",this.#z,!0),window.addEventListener("scroll",this.#v,!0),window.addEventListener("resize",this.#v))}#w(){this.#d&&(this.#d=!1,document.removeEventListener("pointerdown",this.#E,!0),document.removeEventListener("keydown",this.#z,!0),window.removeEventListener("scroll",this.#v,!0),window.removeEventListener("resize",this.#v))}#E=e=>{const t=e.composedPath();t.includes(this)||this.#n&&t.includes(this.#n)||this.#c()};#z=e=>{e.key==="Escape"&&this.#e&&(e.preventDefault(),this.#c(),this.#t?.focus())};#v=()=>{this.#e&&this.#_()}}customElements.define("vs-avatar-group",A);
