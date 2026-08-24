import{FX_CSS as A,attachGlow as g,pressRipple as f}from"./vs-fx.CLXiCjCI.js";import"./vs-scrollbar.vNxNWrCw.js";const p="cubic-bezier(0.34, 1.46, 0.44, 1)",u=264,E=`
${A}
  :host { display: inline-flex; }
  :host([block]) { display: block; width: 100%; }
  :host([block]) .sel { width: 100%; max-width: none; }
  :host([fit]) .sel { min-width: 0; }
  :host([fit]) .sel__menu {
    right: auto;
    width: max-content;
    min-width: 160px;
    max-width: min(240px, calc(100vw - 24px));
  }
  .sel {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --px: var(--ctrl-px-md, 14px);
    --opt-h: 36px;                       /* option height → drives the sliding highlight */
    --rip: var(--fx-tint, 255 255 255);
    font-size: var(--ctrl-fs-md, 14px);
    position: relative;
    display: inline-flex;
    flex-direction: column;
    width: max-content;
    min-width: 140px;
    max-width: 100%;
    font-family: inherit;
    user-select: none;
    -webkit-user-select: none;
  }

  /* sizes — from the control scale in tokens.css */
  .sel--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --px: var(--ctrl-px-sm, 12px); --opt-h: 32px; font-size: var(--ctrl-fs-sm, 13px); }
  .sel--md { --h: var(--ctrl-h-md, 40px); --r: var(--ctrl-r-md, 12px); --px: var(--ctrl-px-md, 14px); --opt-h: 36px; font-size: var(--ctrl-fs-md, 14px); }
  .sel--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --px: var(--ctrl-px-lg, 18px); --opt-h: 40px; font-size: var(--ctrl-fs-lg, 15px); }

  /* radii — apply to trigger AND menu (the morphing box keeps the radius) */
  .sel--r-none .sel__trigger, .sel--r-none .sel__menu { --rr: 0px; }
  .sel--r-subtle .sel__trigger, .sel--r-subtle .sel__menu { --rr: 8px; }
  .sel--r-pill .sel__trigger { --rr: 999px; }
  .sel--r-pill .sel__menu { --rr: 20px; }  /* menu can't be a full pill */
  @supports (corner-shape: squircle) {
    .sel--r-squircle .sel__trigger,
    .sel--r-squircle .sel__menu { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
  }

  .sel__trigger {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    height: var(--h);
    padding: 0 var(--px, var(--ctrl-px-md, 14px));
    border-radius: var(--rr, var(--r));
    border: 1px solid var(--t-border, var(--inp-border, #2a2a2a));
    background: var(--t-fill-base, var(--sel-fill, transparent));
    color: var(--t-text, var(--inp-text, #ededed));
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    isolation: isolate;
    /* opacity WITHOUT transition → the trigger appears/disappears instantly (swap) */
    transition:
      transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1),
      border-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
      background-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 200ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .sel__trigger .sel__value,
  .sel__trigger .sel__caret { position: relative; z-index: 1; }
  .sel__trigger:hover:not(:disabled) {
    border-color: var(--t-border-hover, var(--inp-border-hover, #3d3d3d));
    background-color: color-mix(in srgb, var(--t-accent, #8a8a8a) 8%, var(--sel-hover-base, transparent));
  }
  /* trigger hidden INSTANTLY while there is a menu (the clone face replaces it);
     reappears abruptly when the menu is removed → swap with no fade */
  .sel.has-menu .sel__trigger { opacity: 0; pointer-events: none; }
  .sel__trigger:disabled { opacity: 0.45; cursor: not-allowed; }
  .sel__trigger:focus-visible { outline: 2px solid var(--t-accent, var(--ui-accent, #ededed)); outline-offset: 2px; }

  /* proximity glow (.fx-glow from vs-fx) — over the border, shaped by radius */
  .sel__glow { --glow-strength: 0.55; }
  .sel--r-pill .sel__glow { border-radius: 999px; }
  .sel__menu-glow { --glow-strength: 0.55; }
  @supports (corner-shape: squircle) {
    .sel--r-squircle .sel__glow,
    .sel--r-squircle .sel__menu-glow { corner-shape: squircle; }
  }

  /* droplet ripple lane (fx-ripples) — clipped to the trigger radius */
  .sel__trigger .fx-ripples { z-index: 0; }
  .sel--r-pill .sel__trigger .fx-ripples { border-radius: 999px; }
  @supports (corner-shape: squircle) {
    .sel--r-squircle .sel__trigger .fx-ripples { corner-shape: squircle; }
  }

  .sel__value { overflow: hidden; text-overflow: ellipsis; }
  .sel__value.is-placeholder {
    color: color-mix(in srgb, var(--t-accent, #8a8a8a) 60%, transparent);
    transition: color 200ms ease;
  }

  .sel__caret {
    flex: none;
    /* sizeable from outside — see the SFC */
    width: var(--sel-caret, 16px);
    height: var(--sel-caret, 16px);
    color: var(--t-accent, #8a8a8a);
    transition: transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1), color 200ms ease;
  }
  .sel.is-open .sel__caret,
  .sel.is-expanded .sel__head .sel__caret { transform: rotate(180deg); }

  /* floating menu — is born OVER the trigger (same box) and grows downward */
  .sel__menu {
    position: absolute;
    z-index: 50;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    max-height: ${u}px;
    overflow: hidden;                    /* clip to the corners; scroll = inner vs-scrollbar */
    border-radius: var(--rr, 14px);
    border: 1px solid var(--sel-menu-border, rgba(255, 255, 255, 0.09));
    background: var(--sel-menu-bg, #000);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow: var(--sel-menu-shadow,
      0 12px 40px rgba(0, 0, 0, 0.5),
      0 2px 8px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.06));
    transform-origin: top center;        /* grows downward from the trigger */
  }
  .sel__menu[hidden] { display: none; }

  /* DROP-UP — the same morph, anchored to the trigger's bottom edge instead.
     Set by #openMenu when the list would not fit under the trigger (a select
     sitting on the bottom edge of a panel), so the options open into the room
     that exists rather than off the viewport. */
  .sel--up .sel__menu {
    top: auto;
    bottom: 0;
    transform-origin: bottom center;
  }
  /* The cloned face has to stay over the real trigger, which is now at the
     BOTTOM of the menu box. */
  .sel--up .sel__head { top: auto; bottom: 5px; }
  /* Options enter from below, mirroring the direction the menu grew. */
  .sel--up .sel__opt { transform: translateY(6px); }

  /* cloned trigger face inside the menu (top overlay) — dissolves on expand */
  .sel__head {
    position: absolute;
    z-index: 3;
    top: 5px;                            /* = list padding → fits exactly over the pill */
    left: 5px;
    right: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    height: calc(var(--h) - 10px);
    padding: 0 8px;
    color: var(--t-text, #ededed);
    font-weight: 500;
    pointer-events: none;
    opacity: 1;
    transition: opacity 220ms ease, transform 240ms var(--ease-out, cubic-bezier(0.22,1,0.36,1));
  }
  .sel.is-expanded .sel__head { opacity: 0; transform: translateY(-6px) scale(0.97); }
  /* Dropped up: the face dissolves downward, the way the menu grew. */
  .sel--up.is-expanded .sel__head { transform: translateY(6px) scale(0.97); }

  .sel__list {
    position: relative;                  /* anchor for the sliding highlight */
    margin: 0;
    padding: 5px;
    list-style: none;
  }

  .sel__opt {
    position: relative;
    z-index: 1;                          /* above the sliding highlight */
    overflow: hidden;                    /* clips the ripple to the option radius */
    isolation: isolate;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 0 10px;
    height: var(--opt-h, 36px);
    border-radius: 9px;
    color: var(--inp-text, #ededed);
    cursor: pointer;
    white-space: nowrap;
    /* hidden at rest, enter staggered on expand */
    opacity: 0;
    transform: translateY(-6px);
    transition: opacity 240ms ease, transform 280ms var(--ease-out, cubic-bezier(0.22,1,0.36,1)), background-color 120ms ease, color 120ms ease;
  }
  .sel.is-expanded .sel__opt {
    opacity: 1;
    transform: none;
    transition-delay: calc(var(--i, 0) * 26ms + 90ms);
  }
  .sel__opt-label, .sel__check { position: relative; z-index: 1; }
  .sel__opt.is-selected { color: var(--t-accent, var(--ui-accent, #ededed)); font-weight: 600; }
  .sel__opt.is-disabled { opacity: 0.4; cursor: not-allowed; }
  .sel__opt-label { overflow: hidden; text-overflow: ellipsis; }
  .sel__check { flex: none; width: 16px; height: 16px; color: var(--t-accent, var(--ui-accent, #ededed)); }

  /* single highlight that slides to the active option (animates its position) */
  .sel__highlight {
    position: absolute;
    z-index: 0;
    left: 5px;
    right: 5px;
    top: 5px;                            /* = list padding */
    height: var(--opt-h, 36px);
    border-radius: 9px;
    background: var(--sel-opt-hover, rgb(20, 20, 20));
    transform: translateY(calc(var(--ai, 0) * var(--opt-h, 36px)));
    opacity: 0;
    pointer-events: none;
    transition: transform 280ms cubic-bezier(0.34, 1.42, 0.5, 1), opacity 160ms ease;
  }
  .sel__highlight.is-on { opacity: 1; }

  /* tones — recolor ring/accent */
  .sel--t-danger { --t-accent: #ff6369; --t-border: var(--inp-t-danger-rest, #5b1a1d); --t-border-hover: var(--inp-t-danger-rest, #8c2c30); --t-text: var(--inp-t-danger-hint, #ffd7d8); --rip: 255 99 105; --fx-tint: 255 99 105; }
  .sel--t-warn { --t-accent: #ffb224; --t-border: var(--inp-t-warn-rest, #5a3d10); --t-border-hover: var(--inp-t-warn-rest, #8a5e1a); --t-text: var(--inp-t-warn-hint, #ffe7c2); --rip: 255 178 36; --fx-tint: 255 178 36; }
  .sel--t-success { --t-accent: #4cc38a; --t-border: var(--inp-t-success-rest, #1b3b2a); --t-border-hover: var(--inp-t-success-rest, #2a5e42); --t-text: var(--inp-t-success-hint, #c8efd9); --rip: 76 195 138; --fx-tint: 76 195 138; }

  @media (prefers-reduced-motion: reduce) {
    .sel__trigger, .sel__caret, .sel__head, .sel__opt, .sel__highlight { transition: none; }
  }
`,m=[{label:"Apple",value:"apple"},{label:"Banana",value:"banana"},{label:"Cherry",value:"cherry"},{label:"Peach",value:"peach"},{label:"Grape",value:"grape"},{label:"Mango",value:"mango"},{label:"Orange",value:"orange"},{label:"Pear",value:"pear"},{label:"Watermelon",value:"watermelon"},{label:"Melon",value:"melon"},{label:"Pineapple",value:"pineapple"},{label:"Strawberry",value:"strawberry"},{label:"Kiwi",value:"kiwi"},{label:"Lemon",value:"lemon"},{label:"Plum",value:"plum"},{label:"Raspberry",value:"raspberry"},{label:"Blueberry",value:"blueberry"},{label:"Pomegranate",value:"pomegranate"},{label:"Fig",value:"fig"},{label:"Coconut",value:"coconut"}],_="http://www.w3.org/2000/svg",k="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502";function y(l){const e=document.createElementNS(_,"svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),e.setAttribute("class",l),e}function b(l,e){const t=document.createElementNS(_,"path");if(t.setAttribute("d",l),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),e)for(const s in e)t.setAttribute(s,e[s]);return t}function v(l){const e=y(l);return e.appendChild(b(k,{"stroke-miterlimit":"10"})),e}function d(){return typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}let C=0,c;function L(l){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=l;const e=c.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const $=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function x(l,e){const t=e?L(String(e).trim()):null;if(!t){for(const n of $)l.style.removeProperty(n);return}const s=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),r=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,a=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(n=>Math.round(r?n*.92:n+(255-n)*.16)),h=(n,w)=>l.style.setProperty(n,w);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])h(n,a);h("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])h(n,t.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])h(n,r?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])h(n,r?"0 0 0":"255 255 255");h("--vs-color",a),h("--vs-color-rgb",t.join(" ")),h("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class N extends HTMLElement{static observedAttributes=["value","placeholder","disabled","size","tone","radius","glow","open","color"];#n;#e;#p;#d;#a;#u;#b;#l;#h;#i=m;#g=[];#r="";#t=-1;#s=!1;#y=!1;#w=!1;#A=!1;#E=`vs-select-${++C}`;#f=!1;#$=null;#N=null;#k=null;#m=0;#C=0;#S=0;#T=0;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=E,this.#n=document.createElement("div"),this.#n.className="sel",this.#e=document.createElement("button"),this.#e.type="button",this.#e.className="sel__trigger",this.#e.setAttribute("role","combobox"),this.#e.setAttribute("aria-haspopup","listbox"),this.#e.setAttribute("aria-expanded","false"),this.#e.setAttribute("aria-controls",`${this.#E}-list`);const s=document.createElement("span");s.className="fx-glow sel__glow",s.setAttribute("aria-hidden","true"),this.#p=document.createElement("span"),this.#p.className="fx-ripples sel__ripples",this.#p.setAttribute("aria-hidden","true"),this.#d=document.createElement("span"),this.#d.className="sel__value",this.#e.append(s,this.#p,this.#d,v("sel__caret")),this.#a=document.createElement("div"),this.#a.className="sel__menu",this.#a.hidden=!0;const i=document.createElement("span");i.className="fx-glow sel__menu-glow",i.setAttribute("aria-hidden","true"),this.#u=document.createElement("div"),this.#u.className="sel__head",this.#u.setAttribute("aria-hidden","true"),this.#b=document.createElement("span"),this.#b.className="sel__value",this.#u.append(this.#b,v("sel__caret"));const r=document.createElement("vs-scrollbar");r.setAttribute("bare",""),r.setAttribute("size","sm"),r.setAttribute("max-height",String(u)),r.setAttribute("smoothness","0.2"),this.#l=document.createElement("ul"),this.#l.className="sel__list",this.#l.id=`${this.#E}-list`,this.#l.setAttribute("role","listbox"),this.#h=document.createElement("div"),this.#h.className="sel__highlight",this.#h.setAttribute("aria-hidden","true"),this.#l.appendChild(this.#h),r.appendChild(this.#l),this.#a.append(i,this.#u,r),this.#n.append(this.#e,this.#a),e.append(t,this.#n),this.#r=this.getAttribute("value")??"",this.#e.addEventListener("click",this.#se),this.#e.addEventListener("keydown",this.#re),this.#e.addEventListener("pointerdown",this.#ie),this.#e.addEventListener("pointerup",this.#O),this.#e.addEventListener("pointerleave",this.#O),this.#e.addEventListener("pointercancel",this.#O)}connectedCallback(){x(this,this.getAttribute("color")),this.#x(),this.#P(),this.#$=g(this.#e,200,()=>this.hasAttribute("disabled")||!this.#D()),this.#N=g(this.#a,260,()=>!this.#D()),this.hasAttribute("open")&&this.#B()}disconnectedCallback(){this.#V(),this.#M(),this.#$?.(),this.#$=null,this.#N?.(),this.#N=null}attributeChangedCallback(e){if(x(this,this.getAttribute("color")),!!this.#n){if(e==="open"){this.hasAttribute("open")?this.#B():this.#X();return}if(e==="value"){if(this.#f)return;this.#r=this.getAttribute("value")??"",this.#x(),this.#v();return}this.#P()}}set options(e){let t=null;if(Array.isArray(e))t=e;else if(typeof e=="string"&&e.trim())try{const s=JSON.parse(e);Array.isArray(s)&&(t=s)}catch{}this.#i=t&&t.length?t:m,this.#n&&(this.#x(),this.#v())}get options(){return this.#i}get value(){return this.#r}set value(e){const t=e==null?"":String(e);this.#f=!0,t?this.setAttribute("value",t):this.removeAttribute("value"),this.#f=!1,this.#r=t,this.#n&&(this.#x(),this.#v())}get open(){return this.#s}set open(e){e?this.setAttribute("open",""):this.removeAttribute("open")}#D(){const e=this.getAttribute("glow");return e===null||e!=="false"}#G(){return this.getAttribute("placeholder")??"Select…"}#K(){return this.#i.find(e=>e.value===this.#r)||null}#o(){const e=(t,s)=>this.getAttribute(t)??s;this.#n.className=`sel sel--${e("size","md")} sel--t-${e("tone","default")} sel--r-${e("radius","squircle")}`+(this.#s?" is-open":"")+(this.#y?" is-expanded":"")+(this.#w?" has-menu":"")+(this.#A?" sel--up":"")+(this.hasAttribute("disabled")?" is-disabled":"")}#P(){this.#o(),this.#e.disabled=this.hasAttribute("disabled"),this.#e.setAttribute("aria-expanded",this.#s?"true":"false"),this.#v()}#v(){const e=this.#K(),t=e?e.label:this.#G();this.#d.textContent=t,this.#d.classList.toggle("is-placeholder",!e),this.#b.textContent=t,this.#b.classList.toggle("is-placeholder",!e)}#x(){this.#g.forEach(e=>e.remove()),this.#g=[],this.#i.forEach((e,t)=>{const s=document.createElement("li");s.className="sel__opt"+(e.value===this.#r?" is-selected":"")+(e.disabled?" is-disabled":""),s.style.setProperty("--i",t),s.id=`${this.#E}-opt-${t}`,s.setAttribute("role","option"),s.setAttribute("aria-selected",e.value===this.#r?"true":"false"),e.disabled&&s.setAttribute("aria-disabled","true");const i=document.createElement("span");i.className="fx-ripples sel__opt-ripples",i.setAttribute("aria-hidden","true");const r=document.createElement("span");if(r.className="sel__opt-label",r.textContent=e.label??"",s.append(i,r),e.value===this.#r){const a=y("sel__check");a.appendChild(b("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z")),a.appendChild(b("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),s.appendChild(a)}s.addEventListener("pointerenter",()=>{e.disabled||(this.#t=t,this.#_())}),s.addEventListener("pointerdown",a=>{!e.disabled&&!d()&&f(s,i,a)}),s.addEventListener("pointerup",()=>{s.style.transform=""}),s.addEventListener("pointerleave",()=>{s.style.transform=""}),s.addEventListener("pointercancel",()=>{s.style.transform=""}),s.addEventListener("click",()=>this.#H(t)),this.#g[t]=s,this.#l.appendChild(s)}),this.#_()}#_(){this.#g.forEach((e,t)=>{e&&e.classList.toggle("is-active",t===this.#t)}),this.#h.classList.toggle("is-on",this.#t>=0),this.#h.style.setProperty("--ai",this.#t<0?0:this.#t),this.#t>=0?this.#e.setAttribute("aria-activedescendant",`${this.#E}-opt-${this.#t}`):this.#e.removeAttribute("aria-activedescendant")}#W(){return this.#i.findIndex(e=>!e.disabled)}#q(){this.#t<0||this.#g[this.#t]?.scrollIntoView({block:"nearest"})}#R(e){const t=this.#i.length;if(!t)return;let s=this.#t;for(let i=0;i<t;i++)if(s=(s+e+t)%t,!this.#i[s]?.disabled){this.#t=s;break}this.#_(),this.#q()}#H(e){const t=this.#i[e];!t||t.disabled||(this.#r=t.value,this.#f=!0,t.value?this.setAttribute("value",t.value):this.removeAttribute("value"),this.#f=!1,this.#x(),this.#v(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:t.value}})),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:{value:t.value}})),this.#c())}#L(){this.setAttribute("open","")}#c(){this.removeAttribute("open")}#B(){if(this.#s)return;if(this.hasAttribute("disabled")){this.removeAttribute("open");return}this.#M(),this.#s=!0,this.#w=!0,this.#y=!1,this.#o(),this.#e.setAttribute("aria-expanded","true"),this.#e.style.transition="none",this.#e.style.opacity="0",this.#e.style.filter="";const e=this.#a;e.hidden=!1,this.#A=this.#Z(e),this.#o();const t=this.#i.findIndex(s=>s.value===this.#r);this.#t=t>=0&&!this.#i[t]?.disabled?t:this.#W(),this.#_(),this.#S=requestAnimationFrame(()=>{this.#T=requestAnimationFrame(()=>{this.#y=!0,this.#o()})}),this.#Q(e),this.#q(),this.#te(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#X(){this.#s&&(this.#M(),this.#s=!1,this.#y=!1,this.#o(),this.#e.setAttribute("aria-expanded","false"),this.#t=-1,this.#_(),this.#V(),this.#ee(this.#a),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})))}#J(){let e=0,t=window.innerHeight,s=this.parentElement??this.getRootNode()?.host??null;for(;s;){if(getComputedStyle(s).overflowY!=="visible"){const i=s.getBoundingClientRect();e=Math.max(e,i.top),t=Math.min(t,i.bottom)}s=s.parentElement??s.getRootNode()?.host??null}return{top:e,bottom:t}}#Z(e){const t=this.getBoundingClientRect();if(!t.height)return!1;const s=Math.min(e.scrollHeight||u,u),i=this.#J(),r=i.bottom-t.top,a=t.bottom-i.top;return r<s+8&&a>r}#I(){return this.#e.offsetHeight||40}#Q(e){if(d()){this.#z(e);return}const t=this.#I(),s=e.scrollHeight;e.style.overflow="hidden",e.style.transformOrigin=this.#A?"bottom center":"top center",e.style.height=`${t}px`,e.style.transform="scale(0.9)",e.style.filter="blur(8px)",e.style.opacity="0.5",e.offsetHeight,e.style.transition=`height 560ms ${p}, transform 560ms ${p}, filter 340ms ease, opacity 240ms ease`,e.style.height=`${s}px`,e.style.transform="scale(1)",e.style.filter="blur(0px)",e.style.opacity="1",this.#U(e,()=>this.#z(e),620)}#z(e){e.style.height="auto",e.style.overflow="",e.style.transition="",e.style.transform="",e.style.transformOrigin="",e.style.filter="",e.style.opacity=""}#ee(e){if(d()){e.hidden=!0,this.#w=!1,this.#o(),this.#F();return}const t=this.#I(),s=e.offsetHeight;e.style.overflow="hidden",e.style.transformOrigin=this.#A?"bottom center":"top center",e.style.height=`${s}px`,e.style.transform="scale(1)",e.style.filter="blur(0px)",e.style.opacity="1",e.offsetHeight;const i=420,r=8;e.style.transition=`height ${i}ms ${p}, transform ${i}ms ${p}, filter ${i}ms ease, opacity ${i}ms ease`,e.style.height=`${t}px`,e.style.transform="scale(0.9)",e.style.filter=`blur(${r}px)`,e.style.opacity="0";const a=.45,o=this.#e;this.#C=setTimeout(()=>{o.style.transition="none",o.style.opacity="1",o.style.filter=`blur(${r*a}px)`,o.offsetHeight,o.style.transition=`filter ${i*(1-a)}ms ease`,o.style.filter="blur(0px)",this.#C=0},i*a),this.#U(e,()=>{e.hidden=!0,this.#z(e),this.#w=!1,this.#o(),this.#F()},i+120)}#F(){const e=this.#e;e.style.transition="",e.style.filter="",e.style.opacity=""}#U(e,t,s){const i=()=>{e.removeEventListener("transitionend",r),clearTimeout(this.#m),this.#m=0,this.#k=null,t()},r=a=>{a.target===e&&a.propertyName==="height"&&i()};this.#k=()=>e.removeEventListener("transitionend",r),e.addEventListener("transitionend",r),this.#m=setTimeout(i,s)}#M(){this.#k?.(),this.#k=null,clearTimeout(this.#m),this.#m=0,clearTimeout(this.#C),this.#C=0,cancelAnimationFrame(this.#S),cancelAnimationFrame(this.#T),this.#S=this.#T=0}#te(){document.addEventListener("pointerdown",this.#Y,!0),document.addEventListener("keydown",this.#j,!0)}#V(){document.removeEventListener("pointerdown",this.#Y,!0),document.removeEventListener("keydown",this.#j,!0)}#Y=e=>{e.composedPath().includes(this)||this.#c()};#j=e=>{e.key==="Escape"&&this.#s&&(e.preventDefault(),this.#c())};#se=()=>{this.hasAttribute("disabled")||(this.hasAttribute("open")?this.#c():this.#L())};#ie=e=>{!this.hasAttribute("disabled")&&!d()&&f(this.#e,this.#p,e)};#O=()=>{this.#e.style.transform=""};#re=e=>{if(!this.hasAttribute("disabled"))switch(e.key){case"Enter":case" ":e.preventDefault(),this.#s?this.#t>=0&&this.#H(this.#t):this.#L();break;case"ArrowDown":e.preventDefault(),this.#s?this.#R(1):this.#L();break;case"ArrowUp":e.preventDefault(),this.#s?this.#R(-1):this.#L();break;case"Escape":this.#s&&(e.preventDefault(),this.#c());break;case"Tab":this.#s&&this.#c();break}}}customElements.define("vs-select",N);
