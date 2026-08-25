const k=`
  :host{ position:relative; display:inline-flex; isolation:isolate;
    --sp:14; --spm:1; --bleed:.6;
    --h:40px; --r:16px; --fs:14px; --pad:4px; --lx:16px;
    --c1:color-mix(in oklab, var(--vs-color, #f8a35d) 72%, #f8a35d);
    --c2:color-mix(in oklab, var(--vs-color, #f0879b) 72%, #f0879b);
    --c3:color-mix(in oklab, var(--vs-color, #fbe2d4) 58%, #fbe2d4);
    --c4:color-mix(in oklab, var(--vs-color, #8b74f0) 74%, #8b74f0);
    --c5:color-mix(in oklab, var(--vs-color, #4a45d9) 74%, #4a45d9); }
  :host([block]){ display:flex; width:100%; }
  :host([block]) .ask{ width:100%; }

  /* ── the button: its padding IS the light frame around the coloured fill ── */
  .ask{ position:relative; z-index:1; display:inline-flex; align-items:center; justify-content:center;
    box-sizing:border-box; height:calc(var(--h) + var(--pad)*2); padding:var(--pad);
    border:1px solid var(--border, #1f1f1f); border-radius:calc(var(--r) + var(--pad));
    background:var(--bg-card, #0a0a0a); font-family:inherit; cursor:pointer;
    -webkit-appearance:none; appearance:none; -webkit-tap-highlight-color:transparent;
    transition:transform 260ms cubic-bezier(.34,1.56,.64,1), border-color 200ms, opacity 200ms; }
  .ask:active:not(:disabled){ transform:scale(.972); }
  .ask:disabled{ cursor:not-allowed; opacity:.55; }
  .ask:focus-visible{ outline:2px solid rgb(var(--ring, 143 123 239) / .9); outline-offset:2px; }
  .ask--sm{ --h:32px; --r:12px; --fs:13px; --pad:3px; --lx:12px; }
  .ask--md{ --h:40px; --r:16px; --fs:14px; --pad:4px; --lx:16px; }
  .ask--lg{ --h:48px; --r:20px; --fs:15px; --pad:5px; --lx:20px; }
  .ask--r-none{ --r:0px; } .ask--r-subtle{ --r:8px; } .ask--r-pill{ --r:999px; }
  @supports (corner-shape: squircle){
    .ask--r-squircle{ corner-shape:squircle; --r:26px; }
    .ask--r-squircle .ask__skin{ corner-shape:squircle; } }

  /* ── the coloured fill: a base ramp + seven drifting blobs, each on its own
     random-looking path/timing so the mesh never reads as a loop ── */
  .mesh{ background:linear-gradient(168deg, var(--c1) 0%, var(--c2) 28%, var(--c3) 46%, var(--c4) 72%, var(--c5) 100%); }
  .ask__skin{ position:absolute; inset:var(--pad); z-index:0; border-radius:var(--r); overflow:hidden; pointer-events:none; }
  .mesh__wrap{ position:absolute; inset:0; transform:translate3d(var(--par-x, 0px), var(--par-y, 0px), 0);
    transition:transform 420ms cubic-bezier(.22,1,.36,1); }
  .blob{ position:absolute; width:98%; height:250%; will-change:transform; }
  .b1{ left:-30%; top:-118%; background:radial-gradient(closest-side circle, var(--c1) 0%, var(--c1) 40%, rgb(0 0 0 / 0) 100%);
    animation:ask-d1 calc(var(--sp) * var(--spm) * .71s) ease-in-out infinite; animation-delay:-.31s; }
  .b2{ left:14%; top:-132%; background:radial-gradient(closest-side circle, var(--c2) 0%, var(--c2) 38%, rgb(0 0 0 / 0) 100%);
    animation:ask-d2 calc(var(--sp) * var(--spm) * .52s) ease-in-out infinite; animation-delay:-1.4s; }
  .b3{ left:50%; top:-82%; background:radial-gradient(closest-side circle, var(--c3) 0%, var(--c3) 34%, rgb(0 0 0 / 0) 100%);
    animation:ask-d3 calc(var(--sp) * var(--spm) * .85s) ease-in-out infinite; animation-delay:-.63s; }
  .b4{ left:-24%; top:-14%; background:radial-gradient(closest-side circle, var(--c4) 0%, var(--c4) 40%, rgb(0 0 0 / 0) 100%);
    animation:ask-d4 calc(var(--sp) * var(--spm) * .39s) ease-in-out infinite; animation-delay:-2.05s; }
  .b5{ left:44%; top:0%; background:radial-gradient(closest-side circle, var(--c5) 0%, var(--c5) 42%, rgb(0 0 0 / 0) 100%);
    animation:ask-d5 calc(var(--sp) * var(--spm) * .97s) ease-in-out infinite; animation-delay:-.18s; }
  .b6{ left:-4%; top:-62%; width:64%; height:196%;
    background:radial-gradient(closest-side circle, var(--c3) 0%, var(--c3) 36%, rgb(0 0 0 / 0) 100%);
    animation:ask-d6 calc(var(--sp) * var(--spm) * .58s) ease-in-out infinite; animation-delay:-1.72s; }
  .b7{ left:62%; top:-48%; width:56%; height:180%;
    background:radial-gradient(closest-side circle, var(--c1) 0%, var(--c1) 36%, rgb(0 0 0 / 0) 100%);
    animation:ask-d7 calc(var(--sp) * var(--spm) * .77s) ease-in-out infinite; animation-delay:-.94s; }
  @keyframes ask-d1{ 0%{ transform:translate3d(0,0,0) } 13%{ transform:translate3d(11%,4%,0) } 29%{ transform:translate3d(-6%,10%,0) } 44%{ transform:translate3d(-14%,-3%,0) } 58%{ transform:translate3d(3%,-11%,0) } 71%{ transform:translate3d(9%,8%,0) } 87%{ transform:translate3d(-9%,-6%,0) } 100%{ transform:translate3d(0,0,0) } }
  @keyframes ask-d2{ 0%{ transform:translate3d(0,0,0) } 17%{ transform:translate3d(-13%,6%,0) } 33%{ transform:translate3d(4%,-9%,0) } 49%{ transform:translate3d(12%,10%,0) } 62%{ transform:translate3d(-8%,-4%,0) } 78%{ transform:translate3d(-3%,12%,0) } 94%{ transform:translate3d(7%,-7%,0) } 100%{ transform:translate3d(0,0,0) } }
  @keyframes ask-d3{ 0%{ transform:translate3d(0,0,0) } 11%{ transform:translate3d(-9%,-8%,0) } 27%{ transform:translate3d(13%,3%,0) } 41%{ transform:translate3d(-4%,11%,0) } 56%{ transform:translate3d(-11%,-5%,0) } 69%{ transform:translate3d(8%,-10%,0) } 84%{ transform:translate3d(5%,7%,0) } 100%{ transform:translate3d(0,0,0) } }
  @keyframes ask-d4{ 0%{ transform:translate3d(0,0,0) } 15%{ transform:translate3d(10%,-7%,0) } 31%{ transform:translate3d(-12%,4%,0) } 47%{ transform:translate3d(6%,12%,0) } 61%{ transform:translate3d(-5%,-11%,0) } 76%{ transform:translate3d(-10%,6%,0) } 91%{ transform:translate3d(9%,3%,0) } 100%{ transform:translate3d(0,0,0) } }
  @keyframes ask-d5{ 0%{ transform:translate3d(0,0,0) } 19%{ transform:translate3d(-7%,-10%,0) } 34%{ transform:translate3d(11%,5%,0) } 48%{ transform:translate3d(-3%,-6%,0) } 63%{ transform:translate3d(-13%,8%,0) } 77%{ transform:translate3d(7%,-4%,0) } 92%{ transform:translate3d(4%,11%,0) } 100%{ transform:translate3d(0,0,0) } }
  @keyframes ask-d6{ 0%{ transform:translate3d(0,0,0) } 14%{ transform:translate3d(8%,-11%,0) } 28%{ transform:translate3d(-10%,-3%,0) } 43%{ transform:translate3d(12%,7%,0) } 59%{ transform:translate3d(-6%,10%,0) } 73%{ transform:translate3d(-4%,-9%,0) } 88%{ transform:translate3d(9%,4%,0) } 100%{ transform:translate3d(0,0,0) } }
  @keyframes ask-d7{ 0%{ transform:translate3d(0,0,0) } 12%{ transform:translate3d(-8%,7%,0) } 26%{ transform:translate3d(10%,-6%,0) } 42%{ transform:translate3d(-13%,-9%,0) } 57%{ transform:translate3d(5%,11%,0) } 72%{ transform:translate3d(9%,-4%,0) } 89%{ transform:translate3d(-6%,8%,0) } 100%{ transform:translate3d(0,0,0) } }
  :host([disabled]) .ask__skin{ filter:saturate(.3); }

  /* ── pointer specular + press ripples (both clipped by the skin) ── */
  .ask__spec{ position:absolute; inset:0; opacity:0; transition:opacity 260ms ease;
    background:radial-gradient(circle 96px at var(--mx, 50%) var(--my, 50%),
      rgb(255 255 255 / .38), rgb(255 255 255 / .12) 42%, rgb(255 255 255 / 0) 72%); }
  :host(:hover) .ask__spec{ opacity:1; }
  .ask__shine{ position:absolute; inset:0; opacity:0; transform:translateX(-130%);
    background:linear-gradient(104deg, rgb(255 255 255 / 0) 38%, rgb(255 255 255 / .4) 50%, rgb(255 255 255 / 0) 62%); }
  .ask--loading .ask__shine{ opacity:1; animation:ask-shine 1.45s linear infinite; }
  @keyframes ask-shine{ from{ transform:translateX(-130%) } to{ transform:translateX(130%) } }
  .ask__ripple{ position:absolute; border-radius:50%; pointer-events:none; transform:translate(-50%,-50%) scale(0);
    background:radial-gradient(circle, rgb(var(--rip, 255 255 255) / .42) 0%, rgb(var(--rip, 255 255 255) / .2) 26%,
      rgb(var(--rip, 255 255 255) / .07) 48%, rgb(0 0 0 / 0) 74%);
    opacity:0; will-change:transform,opacity;
    animation:ask-rip 760ms cubic-bezier(.22,1,.36,1) forwards, ask-fade 760ms cubic-bezier(.25,.1,.25,1) forwards; }
  @keyframes ask-rip{ from{ transform:translate(-50%,-50%) scale(0) } to{ transform:translate(-50%,-50%) scale(1) } }
  @keyframes ask-fade{ from{ opacity:.85 } to{ opacity:0 } }

  /* ── label + sparkles ── */
  .ask__label{ position:relative; z-index:2; display:inline-flex; align-items:center; justify-content:center;
    gap:.55em; padding:0 var(--lx); font-size:var(--fs); font-weight:600; line-height:1; letter-spacing:-.01em;
    white-space:nowrap; color:var(--vs-color-fg, #ffffff); }
  .ask__spark{ display:block; flex:none; width:calc(var(--fs) * 1.6); height:calc(var(--fs) * 1.6); overflow:visible; }
  .spark{ fill:currentColor; transform-box:fill-box; transform-origin:center;
    transition:transform 460ms cubic-bezier(.34,1.56,.64,1), opacity 300ms ease; }
  .spark-a{ animation:ask-twinkle 3.4s ease-in-out infinite; filter:drop-shadow(0 0 5px rgb(255 255 255 / .6)); }
  .spark-b{ animation:ask-twinkle 2.6s ease-in-out .7s infinite; filter:drop-shadow(0 0 4px rgb(255 255 255 / .5)); }
  @keyframes ask-twinkle{ 0%,100%{ opacity:.82 } 50%{ opacity:1 } }
  .ask:hover:not(:disabled) .spark-a{ transform:scale(1.14) rotate(22deg); }
  .ask:hover:not(:disabled) .spark-b{ transform:scale(1.34) rotate(-26deg); }
  .ask:active:not(:disabled) .spark-a{ transform:scale(.82) rotate(-14deg); }
  .ask:active:not(:disabled) .spark-b{ transform:scale(1.6) rotate(34deg); }
  .ask--loading .spark-a{ animation:ask-twinkle 3.4s ease-in-out infinite, ask-spin 2.1s linear infinite; }
  .ask--loading .spark-b{ animation:ask-twinkle 2.6s ease-in-out .7s infinite, ask-spin 3.4s linear reverse infinite; }
  .ask--loading .ask__label{ opacity:.86; }
  @keyframes ask-spin{ to{ transform:rotate(360deg) } }

  @media (prefers-reduced-motion: reduce){
    .ask, .mesh__wrap, .spark{ transition:none; }
    .blob, .spark-a, .spark-b, .ask--loading .spark-a, .ask--loading .spark-b, .ask--loading .ask__shine{ animation:none; }
    .ask:active:not(:disabled){ transform:none; }
    .ask__ripple{ display:none; } }
`;let d;function g(o){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=o;const a=d.fillStyle;if(a.charAt(0)==="#")return[parseInt(a.slice(1,3),16),parseInt(a.slice(3,5),16),parseInt(a.slice(5,7),16)];const t=a.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const u=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(o,a){const t=a?g(String(a).trim()):null;if(!t){for(const e of u)o.style.removeProperty(e);return}const n=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),s=.2126*n(t[0])+.7152*n(t[1])+.0722*n(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(e=>Math.round(s?e*.92:e+(255-e)*.16)),i=(e,h)=>o.style.setProperty(e,h);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(e,c);i("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(e,s?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])i(e,s?"0 0 0":"255 255 255");i("--vs-color",c),i("--vs-color-rgb",t.join(" ")),i("--vs-color-fg",s?"#0b0b0b":"#ffffff")}const p="http://www.w3.org/2000/svg",v="M18.0841 11.612C18.4509 11.6649 18.4509 12.3351 18.0841 12.388C14.1035 12.9624 12.9624 14.1035 12.388 18.0841C12.3351 18.4509 11.6649 18.4509 11.612 18.0841C11.0376 14.1035 9.89647 12.9624 5.91594 12.388C5.5491 12.3351 5.5491 11.6649 5.91594 11.612C9.89647 11.0376 11.0376 9.89647 11.612 5.91594C11.6649 5.5491 12.3351 5.5491 12.388 5.91594C12.9624 9.89647 14.1035 11.0376 18.0841 11.612Z";function f(o,a,t,n){const r=document.createElementNS(p,"g");r.setAttribute("transform",`translate(${o} ${a}) scale(${t}) translate(-12 -12)`);const s=document.createElementNS(p,"path");return s.setAttribute("d",v),s.setAttribute("class",`spark ${n}`),r.append(s),r}function y(o){const a=document.createElement("span");a.className=`${o} mesh`,a.setAttribute("aria-hidden","true");const t=document.createElement("span");t.className="mesh__wrap";for(const n of[1,2,3,4,5,6,7]){const r=document.createElement("span");r.className=`blob b${n}`,t.append(r)}return a.append(t),a}const b=(o,a,t)=>o<a?a:o>t?t:o;class x extends HTMLElement{static observedAttributes=["label","size","radius","speed","glow","loading","disabled","block","color","aria-label","title"];#t;#e;#s;#r;#a=0;#n=0;#i=0;#o=1;#l=1;constructor(){super();const a=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=k,this.#t=document.createElement("button"),this.#t.type="button",this.#t.setAttribute("part","button"),this.#e=y("ask__skin");const n=document.createElement("span");n.className="ask__spec";const r=document.createElement("span");r.className="ask__shine",this.#e.append(n,r),this.#s=document.createElement("span"),this.#s.className="ask__label",this.#s.setAttribute("part","label");const s=document.createElementNS(p,"svg");s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("class","ask__spark"),s.setAttribute("aria-hidden","true"),s.append(f(8.4,8.6,.5,"spark-b"),f(14.2,14.6,.92,"spark-a")),this.#r=document.createElement("slot"),this.#s.append(s,this.#r),this.#t.append(this.#e,this.#s),a.append(t,this.#t),this.#t.addEventListener("pointermove",this.#d),this.#t.addEventListener("pointerleave",this.#m),this.#t.addEventListener("pointerdown",this.#f),this.#t.addEventListener("click",this.#b)}connectedCallback(){m(this,this.getAttribute("color")),this.#c()}disconnectedCallback(){this.#a&&cancelAnimationFrame(this.#a),this.#a=0}attributeChangedCallback(){m(this,this.getAttribute("color")),this.#t&&this.#c()}get loading(){return this.hasAttribute("loading")}set loading(a){a?this.setAttribute("loading",""):this.removeAttribute("loading")}#c(){const a=(c,l)=>this.getAttribute(c)??l,t=this.hasAttribute("loading"),n=this.hasAttribute("disabled");this.#t.className=`ask ask--${a("size","md")} ask--r-${a("radius","rounded")}`+(t?" ask--loading":""),this.#t.disabled=n||t,this.#t.setAttribute("aria-busy",t?"true":"false"),this.#r.textContent=a("label","Ask AI");const r=Number(a("speed",14));this.style.setProperty("--sp",String(Number.isFinite(r)&&r>0?b(r,2,60):14)),this.style.setProperty("--spm",t?".34":"1");const s=Number(a("glow",60));this.style.setProperty("--bleed",String((Number.isFinite(s)?b(s,0,100):60)/100));for(const c of["aria-label","title"]){const l=this.getAttribute(c);l!=null?this.#t.setAttribute(c,l):this.#t.removeAttribute(c)}}#d=a=>{const t=this.#t.getBoundingClientRect();this.#o=t.width||1,this.#l=t.height||1,this.#n=a.clientX-t.left,this.#i=a.clientY-t.top,this.#a||(this.#a=requestAnimationFrame(this.#p))};#p=()=>{this.#a=0;const a=this.#t.style;a.setProperty("--mx",`${this.#n.toFixed(1)}px`),a.setProperty("--my",`${this.#i.toFixed(1)}px`),a.setProperty("--par-x",`${((this.#n/this.#o-.5)*-9).toFixed(2)}px`),a.setProperty("--par-y",`${((this.#i/this.#l-.5)*-6).toFixed(2)}px`)};#m=()=>{this.#a&&(cancelAnimationFrame(this.#a),this.#a=0);const a=this.#t.style;a.setProperty("--par-x","0px"),a.setProperty("--par-y","0px")};#f=a=>{if(this.#t.disabled)return;const t=this.#t.getBoundingClientRect(),n=a.clientX-t.left,r=a.clientY-t.top,s=Math.max(n,t.width-n),c=Math.max(r,t.height-r),l=Math.hypot(s,c)*2,i=document.createElement("span");for(i.className="ask__ripple",i.style.cssText=`left:${n}px;top:${r}px;width:${l}px;height:${l}px`,i.addEventListener("animationend",()=>i.remove()),this.#e.append(i);this.#e.querySelectorAll(".ask__ripple").length>5;)this.#e.querySelector(".ask__ripple").remove()};#b=()=>{this.#t.disabled||this.dispatchEvent(new CustomEvent("ask",{bubbles:!0,composed:!0,detail:{label:this.getAttribute("label")??"Ask AI"}}))}}customElements.define("vs-ask-ai-button",x);
