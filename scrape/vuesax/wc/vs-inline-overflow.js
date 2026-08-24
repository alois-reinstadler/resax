import{FX_CSS as S,pressRipple as E}from"./vs-fx.CLXiCjCI.js";const F=`
  :host {
    display: inline-flex;
    /* tinted recess for the shell, solid pills on top. Both sides derive from
       the theme's own surfaces, so the arrangement survives the theme flip. */
    --io-shell: color-mix(in srgb, var(--text, #ededed) 6%, transparent);
    --io-pill: var(--bg-elevated, #1c1c1c);
    --io-pill-hover: color-mix(in srgb, var(--bg-elevated, #1c1c1c) 100%, var(--text, #ededed) 10%);
    --io-fg: var(--text, #ededed);
    --io-shadow: 0 1px 2px rgba(0, 0, 0, 0.28);
    --rip: 255 255 255;
    /* sizes carry the metrics only; radius is a separate axis so the two can
       be set independently (a pill SM and a rounded SM share these numbers) */
    --h: 40px; --fs: 14px; --px: 17px; --gap: 6px; --pad: 5px;
    --r: 999px;  /* pill by default — same default as meta.controls */
    --sr: 999px; /* shell radius: the pill radius plus the shell padding */
  }
  :host([size='sm']) { --h: 30px; --fs: 12px; --px: 12px; --gap: 4px; --pad: 4px; }
  :host([size='lg']) { --h: 48px; --fs: 15px; --px: 21px; --gap: 8px; --pad: 6px; }
  :host([radius='pill'])    { --r: 999px; --sr: 999px; }
  :host([radius='rounded']) { --r: 12px; --sr: calc(12px + var(--pad)); }

  /* light theme: pills go to the page surface (white) over the tinted shell —
     the same arrangement the dark side has, flipped. The ripple re-tints black. */
  :host-context([data-theme='light']) {
    --io-shell: color-mix(in srgb, var(--text, #171717) 6%, transparent);
    --io-pill: #ffffff;
    --io-pill-hover: #ffffff;
    --io-shadow: 0 1px 2px rgba(17, 24, 39, 0.1), 0 1px 1px rgba(17, 24, 39, 0.06);
    --rip: 20 20 20;
  }
  :host-context([data-theme='light']) .io__pill:hover {
    box-shadow: 0 2px 6px rgba(17, 24, 39, 0.14);
  }

  .io {
    position: relative;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    padding: var(--pad);
    border-radius: calc(var(--sr) * var(--r-mult, 1));
    background: var(--io-shell);
    font-family: inherit;
    /* The track keeps the width of the OPEN bar while collapsed, so its box juts
       out of the shell with the tucked pills parked inside it — invisible, but it
       still hands the host page a phantom scrollbar. clip, not hidden: no scroll
       container, no scroll anchoring, nothing to focus-scroll into. The margin is
       the runway the effect needs — the pills fly about 6px past the shell edge
       mid-flight and carry their own motion blur, and clipping THAT kills the lag. */
    overflow: clip;
    overflow-clip-margin: 24px;
    /* JS owns the width; stay invisible until the first measurement lands */
    opacity: 0;
    transition: opacity 140ms linear;
    -webkit-tap-highlight-color: transparent;
  }
  .io--ready { opacity: 1; }
  :host([disabled]) .io { opacity: 0.5; pointer-events: none; }

  @supports (corner-shape: squircle) {
    :host([radius='squircle']) {
      --r: calc(var(--h) * 0.5);
      --sr: calc(var(--h) * 0.5 + var(--pad));
      --r-mult: 1.5;
    }
    :host([radius='squircle']) .io,
    :host([radius='squircle']) .io__pill { corner-shape: squircle; }
  }

  .io__track {
    display: flex;
    align-items: center;
    gap: var(--gap);
    flex: 0 0 auto;
    width: max-content;
    will-change: transform;
  }

  /* the wrapper is the JS layer (transform / opacity / blur); the pill inside
     keeps its own hover + press transform, so the two never fight over one
     transform property.
     display:flex is load-bearing: as a block box it would open a line box for
     the inline-flex pill and inherit the font's leading, making the wrapper ~4px
     taller than the pill. The shell pads the WRAPPER, so that phantom leading
     showed up as 7px of breathing room top/bottom against 5px on the sides. */
  .io__item { display: flex; flex: 0 0 auto; will-change: transform, filter, opacity; }

  .io__pill {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--h);
    padding: 0 var(--px);
    border: 0;
    border-radius: calc(var(--r) * var(--r-mult, 1));
    background: var(--io-pill);
    box-shadow: var(--io-shadow);
    color: var(--io-fg);
    font-family: inherit;
    font-size: var(--fs);
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: background 160ms ease, transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .io__pill > * { position: relative; z-index: 2; }
  .io__pill:hover { background: var(--io-pill-hover); }
  .io__pill:active { transform: scale(0.94); }
  .io__pill:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }
  .io__pill:disabled { cursor: not-allowed; }
  .io__pill--danger { color: var(--io-danger, #ef4444); }

  .io__pill--trigger {
    width: var(--h);
    padding: 0;
    color: var(--text-secondary, #a1a1a1);
  }

  /* both glyphs share one box and cross-fade on the same spring */
  .io__glyph {
    position: absolute;
    inset: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    will-change: transform, opacity;
  }
  .io__glyph svg { width: 20px; height: 20px; display: block; }
  .io__glyph--cross svg { width: 16px; height: 16px; }

  ${S}

  @media (prefers-reduced-motion: reduce) {
    .io { transition: none; }
    .io__pill { transition: background 160ms ease; }
    .io__pill:active { transform: none; }
  }
`,C="http://www.w3.org/2000/svg";function k(c,t={}){const e=document.createElementNS(C,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true");for(const s of c){const r=document.createElementNS(C,"path");r.setAttribute("d",s),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width",t.width??"1.5"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),e.appendChild(r)}return e}const M=["M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z","M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z","M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"],$=["M6 6l12 12","M18 6L6 18"],p=(c,t,e)=>c<t?t:c>e?e:c,x=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;class w{x=0;v=0;target=0;constructor(t,e){this.k=t,this.d=e}step(t){const e=t/2;for(let s=0;s<2;s++){const r=-this.k*(this.x-this.target)-this.d*this.v;this.v+=r*e,this.x+=this.v*e}}get settled(){return Math.abs(this.v)<.002&&Math.abs(this.x-this.target)<.002}snap(){this.x=this.target,this.v=0}}let m;function T(c){if(m||=document.createElement("canvas").getContext("2d"),!m)return null;m.fillStyle="#000",m.fillStyle=c;const t=m.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const N=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function A(c,t){const e=t?T(String(t).trim()):null;if(!e){for(const i of N)c.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),o=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(i=>Math.round(o?i*.92:i+(255-i)*.16)),d=(i,l)=>c.style.setProperty(i,l);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])d(i,n);d("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])d(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])d(i,o?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])d(i,o?"0 0 0":"255 255 255");d("--vs-color",n),d("--vs-color-rgb",e.join(" ")),d("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class L extends HTMLElement{static observedAttributes=["items","visible","open","size","radius","stiffness","damping","stagger","lag","blur","squash","disabled","color"];#e;#o;#n;#d;#p;#u=[];#a=[];#s=new w(260,17);#l=new w(260,17);#i=[];#r={WT:0,H:0,dx:[],extra:0};#t=!1;#C=!1;#f=0;#x=0;#v=0;#y=null;#T="";constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=F,this.#e=document.createElement("div"),this.#e.className="io",this.#e.setAttribute("role","toolbar"),this.#e.setAttribute("aria-label","Actions"),this.#o=document.createElement("div"),this.#o.className="io__track",this.#n=this.#N("io__item--trigger");const s=this.#n.firstChild;s.classList.add("io__pill--trigger"),this.#d=document.createElement("span"),this.#d.className="io__glyph io__glyph--dots",this.#d.appendChild(k(M)),this.#p=document.createElement("span"),this.#p.className="io__glyph io__glyph--cross",this.#p.appendChild(k($,{width:"1.8"})),s.append(this.#d,this.#p),s.addEventListener("click",this.#K),this.#e.appendChild(this.#o),t.append(e,this.#e)}set items(t){Array.isArray(t)&&(this.#w=t,this.#k())}get items(){return this.#u.slice()}#w=null;set open(t){this.#$(!!t)}get open(){return this.#t}#h(t,e){const s=parseFloat(this.getAttribute(t));return Number.isFinite(s)?s:e}#g(t){return this.hasAttribute(t)?this.getAttribute(t)!=="false":!1}get#I(){return p(this.#h("stiffness",260),20,900)}get#P(){return p(this.#h("damping",17),1,60)}get#W(){return p(this.#h("stagger",45),0,400)}get#D(){return p(this.#h("lag",.45),0,.9)}get#J(){return p(this.#h("blur",5),0,24)}get#V(){return p(this.#h("squash",.045),0,.2)}get#_(){return p(Math.round(this.#h("visible",2)),0,this.#u.length)}get#c(){return this.#u.length-this.#_}get#m(){return this.#c>0}#N(t){const e=document.createElement("div");e.className="io__item"+(t?" "+t:"");const s=document.createElement("button");s.type="button",s.className="io__pill";const r=document.createElement("span");return r.className="fx-ripples",s.append(r),s.addEventListener("pointerdown",o=>{this.#g("disabled")||E(s,r,o,{tilt:!1})}),e.appendChild(s),e}#Z(){if(this.#w)return this.#w.map(s=>typeof s=="string"?{label:s}:{label:String(s.label??""),value:s.value,danger:!!s.danger});const t=this.getAttribute("items");return(t??"Save,Copy,Share,Delete").split(",").map(s=>s.trim()).filter(Boolean).map(s=>({label:s}))}#k(){const t=this.#Z(),e=JSON.stringify(t);if(!(e===this.#T&&this.#a.length)){this.#T=e,this.#u=t;for(const s of this.#a)s.remove();this.#a=[];for(const s of this.#u){const r=this.#N(),o=r.firstChild,n=document.createElement("span");n.className="io__label",n.textContent=s.label,o.appendChild(n),s.danger&&o.classList.add("io__pill--danger"),o.addEventListener("click",()=>this.#X(s)),this.#o.appendChild(r),this.#a.push(r)}this.#o.appendChild(this.#n),this.#b(),this.#A(),this.#M()}}#b(){const t=this.#g("disabled"),e=this.#_;this.#n.style.display=this.#m?"":"none";const s=this.#n.firstChild;s.disabled=t,s.setAttribute("aria-expanded",String(this.#t)),s.setAttribute("aria-label",this.#t?"Collapse actions":"More actions"),this.#a.forEach((r,o)=>{const n=this.#m&&o>=e&&!this.#t,a=r.firstChild;a.disabled=t,a.tabIndex=n?-1:0,n?r.setAttribute("inert",""):r.removeAttribute("inert")})}#A(){const t=this.#I,e=this.#P,s=this.#D;this.#s.k=t,this.#s.d=e,this.#l.k=t*(1-s*.62),this.#l.d=e*(1-s*.3);const r=this.#c,o=[];for(let n=0;n<r;n++){const a=this.#i[n]??new w(t,e);a.k=t*(1+n*.04),a.d=e*(1-Math.min(.2,n*.03)),o.push(a)}this.#i=o}#L(){const t=getComputedStyle(this.#e);this.#r.extra=parseFloat(t.paddingLeft)+parseFloat(t.paddingRight)+parseFloat(t.borderLeftWidth)+parseFloat(t.borderRightWidth);const e=parseFloat(getComputedStyle(this.#o).columnGap)||0,s=this.#a.map(h=>parseFloat(getComputedStyle(h).width)||0),r=s.length,o=this.#m,n=o&&parseFloat(getComputedStyle(this.#n).width)||0,a=s.reduce((h,b)=>h+b,0),d=r+(o?1:0);this.#r.WT=a+n+e*Math.max(0,d-1);const i=this.#_;if(!o||i>=r){this.#r.H=0,this.#r.dx=[];return}let l=0;const u=s.map((h,b)=>{const y=l+e*b;return l+=h,y}),f=a+e*r;this.#r.H=f-u[i];const v=u[i]+n/2,g=[];for(let h=0;h<this.#c;h++)g.push(v-(u[i+h]+s[i+h]/2));this.#r.dx=g}#q(t){const e=this.#J;return!e||x()?0:Math.min(e,Math.abs(t)*1.1)}#S(){const{WT:t,H:e}=this.#r,s=this.#s.x,r=this.#l.x;this.#e.style.width=`${t-e*(1-r)+this.#r.extra}px`,this.#o.style.transform=`translate3d(${(e*(r-s)/2).toFixed(2)}px,0,0)`;const o=this.#_,n=this.#q(this.#s.v*.55),a=n>.05?`blur(${n.toFixed(2)}px)`:"",d=this.#V;for(let i=0;i<o;i++){const l=this.#a[i];l&&(l.style.transform="",l.style.opacity="1",l.style.filter=a)}for(let i=0;i<this.#c;i++){const l=this.#a[o+i],u=this.#i[i];if(!l||!u)continue;const f=u.x,v=(this.#r.dx[i]??0)*(1-f),g=.34+.66*f,h=x()?0:u.v*d,b=p(g*(1+h),.2,1.5),y=p(g*(1-h*.62),.2,1.5);l.style.transform=`translate3d(${v.toFixed(2)}px,0,0) scale(${b.toFixed(3)},${y.toFixed(3)})`,l.style.opacity=p(f*1.7,0,1).toFixed(3);const _=this.#q(u.v);l.style.filter=_>.05?`blur(${_.toFixed(2)}px)`:""}this.#m&&(this.#n.style.transform=`translate3d(${(-e*(1-s)).toFixed(2)}px,0,0)`,this.#n.style.filter=a),this.#d.style.opacity=p(1-s*1.6,0,1).toFixed(3),this.#d.style.transform=`rotate(${(s*90).toFixed(1)}deg) scale(${(1-s*.45).toFixed(3)})`,this.#p.style.opacity=p((s-.25)*1.8,0,1).toFixed(3),this.#p.style.transform=`rotate(${((1-s)*-90).toFixed(1)}deg) scale(${(.5+s*.5).toFixed(3)})`}#O(t){const e=this.#W;return e<=0?0:this.#t?t*e:(this.#c-1-t)*e*.7}#G(){return this.#c?this.#O(this.#t?this.#c-1:0):0}#z=t=>{const e=Math.min(.032,this.#x?(t-this.#x)/1e3:.016666666666666666);this.#x=t,this.#v+=e*1e3;const s=this.#t?1:0;this.#s.target=s,this.#l.target=s;for(let o=0;o<this.#i.length;o++)this.#v>=this.#O(o)&&(this.#i[o].target=s);this.#s.step(e),this.#l.step(e);for(const o of this.#i)o.step(e);this.#S(),this.#v>=this.#G()&&this.#s.settled&&this.#l.settled&&this.#i.every(o=>o.settled)?(this.#E(),this.#j()):this.#f=requestAnimationFrame(this.#z)};#E(){this.#f&&cancelAnimationFrame(this.#f),this.#f=0,this.#x=0}#j(){this.#s.snap(),this.#l.snap();for(const t of this.#i)t.snap();this.#S()}#R(){this.#E(),this.#v=0,this.#f=requestAnimationFrame(this.#z)}#F(t){const e=t?1:0;this.#s.target=e,this.#l.target=e;for(const s of this.#i)s.target=e;this.#j()}#M(){this.#L(),this.#F(this.#t)}#$(t,e=!1){t!==this.#t&&(this.#t=t,t?this.setAttribute("open",""):this.removeAttribute("open"),this.#b(),e&&this.dispatchEvent(new CustomEvent("toggle",{bubbles:!0,composed:!0,detail:{open:t}})),x()?this.#F(t):this.#R())}#K=()=>{this.#g("disabled")||!this.#m||this.#$(!this.#t,!0)};#X(t){this.#g("disabled")||this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{label:t.label,value:t.value??t.label,index:this.#u.indexOf(t)}}))}#B=t=>{t.key==="Escape"&&this.#t&&this.#$(!1,!0)};connectedCallback(){A(this,this.getAttribute("color")),this.addEventListener("keydown",this.#B),this.#t=this.#g("open"),this.#k(),this.#b(),this.#M(),this.#C=!0,this.#e.classList.add("io--ready"),document.fonts?.ready?.then(()=>this.#H()).catch(()=>{}),typeof ResizeObserver<"u"&&(this.#y=new ResizeObserver(()=>this.#H()),this.#y.observe(this.#o))}disconnectedCallback(){this.#E(),this.#y?.disconnect(),this.#y=null,this.removeEventListener("keydown",this.#B)}#H(){this.isConnected&&(this.#L(),this.#f||this.#S())}attributeChangedCallback(t,e,s){if(A(this,this.getAttribute("color")),!(!this.#e||e===s)){if(t==="items"){this.#w=null,this.#k();return}if(t==="open"){const r=this.#g("open");r!==this.#t&&(this.#t=r,this.#b(),this.#C&&!x()?this.#R():this.#F(r));return}if(t==="stiffness"||t==="damping"||t==="lag"){this.#A();return}if(t==="visible"||t==="size"||t==="radius"){this.#A(),this.#b(),this.#C&&this.#M();return}this.#b()}}}customElements.define("vs-inline-overflow",L);
