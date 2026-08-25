const M="http://www.w3.org/2000/svg";let ut=0;const xt=`
  :host {
    display: inline-flex;
    overflow: visible;
  }
  :host([hidden]) { display: none; }
  :host([block]) { display: flex; width: 100%; }
  :host([block]) .gbtn,
  :host([block]) .gbtn__hit { width: 100%; }

  .gbtn {
    --h: var(--ctrl-h-lg, 48px);
    --fs: var(--ctrl-fs-lg, 15px);
    --px: 24px;
    --r: 999px;
    --fill: var(--vs-color, var(--gooey-button-bg, #c8ff3d));
    --on-fill: var(--vs-color-fg, var(--gooey-button-fg, #0b0b0b));
    --ring: var(--vs-color-rgb, 200 255 61);
    --g-rip: var(--gooey-rip, 11 11 11);
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--h);
    overflow: visible;
    font-family: inherit;
    font-size: var(--fs);
    line-height: 1;
  }
  .gbtn--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: 15px; }
  .gbtn--md { --h: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 14px); --px: 19px; }
  .gbtn--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: 24px; }

  .gbtn--r-none { --r: 0px; }
  .gbtn--r-subtle { --r: 9px; }
  .gbtn--r-rounded { --r: 15px; }
  .gbtn--r-pill { --r: 999px; }
  .gbtn--r-squircle { --r: calc(var(--h) * 0.48); }
  @supports (corner-shape: squircle) {
    .gbtn--r-squircle .gbtn__hit,
    .gbtn--r-squircle .gbtn__ripples { corner-shape: squircle; }
  }

  .gbtn--t-danger {
    --fill: var(--gooey-danger, #ff6369);
    --on-fill: var(--gooey-danger-fg, #2a0c0e);
    --ring: 255 99 105;
    --g-rip: 42 12 14;
  }
  .gbtn--t-warn {
    --fill: var(--gooey-warn, #ffb224);
    --on-fill: var(--gooey-warn-fg, #2a1c02);
    --ring: 255 178 36;
    --g-rip: 42 28 2;
  }
  .gbtn--t-success {
    --fill: var(--gooey-success, #4cc38a);
    --on-fill: var(--gooey-success-fg, #06231a);
    --ring: 76 195 138;
    --g-rip: 6 35 26;
  }

  .gbtn__liquid {
    position: absolute;
    inset: 0;
    z-index: 0;
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
  }
  .gbtn__shapes {
    fill: var(--fill);
    transition: fill 180ms ease;
  }
  .gbtn.is-hover .gbtn__shapes {
    fill: color-mix(in srgb, var(--fill) 92%, var(--on-fill));
  }
  .gbtn.is-focus .gbtn__shapes {
    fill: color-mix(in srgb, var(--fill) 68%, var(--on-fill));
  }
  .gbtn__tail,
  .gbtn__base-bead,
  .gbtn__tip-bead,
  .gbtn__filament,
  .gbtn__filament-bead,
  .gbtn__drop-tail,
  .gbtn__drop { opacity: 0; }
  .gbtn.is-tethered .gbtn__tail,
  .gbtn.is-tethered .gbtn__base-bead,
  .gbtn.is-tethered .gbtn__tip-bead,
  .gbtn.is-tethered .gbtn__filament,
  .gbtn.is-tethered .gbtn__filament-bead,
  .gbtn.is-tethered .gbtn__drop-tail,
  .gbtn.is-tethered .gbtn__drop { opacity: 1; }

  .gbtn__hit {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: calc(var(--h) * 2.05);
    height: var(--h);
    padding: 0 var(--px);
    margin: 0;
    border: 0;
    border-radius: var(--r);
    outline: 0;
    background: transparent;
    color: var(--on-fill);
    font: inherit;
    font-weight: 650;
    line-height: 1;
    letter-spacing: -0.012em;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .gbtn__hit:disabled { cursor: not-allowed; }
  .gbtn.is-disabled { opacity: 0.45; pointer-events: none; }

  .gbtn__label {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transform: scale(var(--label-scale, 1));
    transition: transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .gbtn__hit:active:not(:disabled) { --label-scale: 0.96; }

  .gbtn__ripples {
    position: absolute;
    inset: 0;
    z-index: 1;
    overflow: hidden;
    border-radius: var(--r);
    pointer-events: none;
  }
  .gbtn__ripple {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    background:
      radial-gradient(circle,
        rgb(var(--g-rip) / 0.32) 0%,
        rgb(var(--g-rip) / 0.16) 34%,
        rgb(var(--g-rip) / 0.05) 58%,
        transparent 76%);
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
    animation:
      gbtn-ripple 720ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
      gbtn-fade 720ms ease forwards;
  }
  @keyframes gbtn-ripple {
    to { transform: translate(-50%, -50%) scale(1); }
  }
  @keyframes gbtn-fade {
    from { opacity: 0.78; }
    to { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .gbtn__shapes,
    .gbtn__label { transition: none; }
    .gbtn__hit:active:not(:disabled) { --label-scale: 1; }
    .gbtn__ripple { display: none; }
  }
`,A=(w,i,t)=>w<i?i:w>t?t:w,g=.8,L=(w,i,t)=>{const n=A((t-w)/Math.max(1e-4,i-w),0,1);return n*n*(3-2*n)};class U{x=0;y=0;vx=0;vy=0;tx=0;ty=0;constructor(i,t){this.k=i,this.d=t}seed(i,t){this.x=this.tx=i,this.y=this.ty=t,this.vx=0,this.vy=0}step(i){const t=i/2;for(let n=0;n<2;n++){const e=-this.k*(this.x-this.tx)-this.d*this.vx,s=-this.k*(this.y-this.ty)-this.d*this.vy;this.vx+=e*t,this.vy+=s*t,this.x+=this.vx*t,this.y+=this.vy*t}}get settled(){return Math.hypot(this.vx,this.vy)<.08&&Math.hypot(this.x-this.tx,this.y-this.ty)<.08}snap(){this.x=this.tx,this.y=this.ty,this.vx=0,this.vy=0}}let tt;function dt(w){if(tt||=document.createElement("canvas").getContext("2d"),!tt)return null;tt.fillStyle="#000",tt.fillStyle=w;const i=tt.fillStyle;if(i.charAt(0)==="#")return[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)];const t=i.match(/[\\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const yt=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg","--gooey-rip"];function ot(w,i){const t=i?dt(String(i).trim()):null;if(!t){for(const a of yt)w.style.removeProperty(a);return}const n=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),s=.2126*n(t[0])+.7152*n(t[1])+.0722*n(t[2])>.45,h="rgb("+t.join(" ")+")",o=t.map(a=>Math.round(s?a*.92:a+(255-a)*.16)),r=(a,c)=>w.style.setProperty(a,c);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(a,h);r("--btn-primary-bg-hover","rgb("+o.join(" ")+")");for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(a,t.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(a,s?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])r(a,s?"0 0 0":"255 255 255");r("--vs-color",h),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",s?"#0b0b0b":"#ffffff"),r("--gooey-rip",s?"11 11 11":"255 255 255")}class bt extends HTMLElement{static observedAttributes=["color","size","radius","tone","label","reach","stiffness","damping","lag","goo","goo-strength","squash","block","disabled","filaments","droplets","gravity","drag","sag","aria-label","title"];#b;#n;#B;#_;#p;#f;#u;#w;#x;#d;#c;#S;#P;#i=new U(220,13);#h=new U(170,12);#o=new U(135,10);#r=[];#m=[];#e={width:1,height:1};#t={x:.5,y:1,nx:0,ny:1,tx:1,ty:0};#Z={clientX:0,clientY:0,type:"mouse"};#s="idle";#H=!1;#O=!1;#k=0;#C=0;#y=0;#Y=0;#X={x:0,y:1};#v=!1;#j=0;#L=0;#N=!1;#T=null;#F=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):{matches:!1};constructor(){super(),this.#P="vs-button-gooey-"+ ++ut;const i=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=xt,this.#b=document.createElement("span"),this.#b.className="gbtn",this.#p=document.createElementNS(M,"svg"),this.#p.setAttribute("class","gbtn__liquid"),this.#p.setAttribute("aria-hidden","true"),this.#p.setAttribute("focusable","false"),this.#p.setAttribute("preserveAspectRatio","none"),this.#f=document.createElementNS(M,"g"),this.#f.setAttribute("class","gbtn__shapes"),this.#u=document.createElementNS(M,"rect"),this.#u.setAttribute("class","gbtn__body"),this.#w=document.createElementNS(M,"path"),this.#w.setAttribute("class","gbtn__tail"),this.#x=document.createElementNS(M,"circle"),this.#x.setAttribute("class","gbtn__base-bead"),this.#d=document.createElementNS(M,"circle"),this.#d.setAttribute("class","gbtn__tip-bead"),this.#f.append(this.#u);for(let e=0;e<2;e++){const s=document.createElementNS(M,"path");s.setAttribute("class","gbtn__filament gbtn__filament--"+(e+1));const h=document.createElementNS(M,"circle");h.setAttribute("class","gbtn__filament-bead"),this.#r.push({path:s,bead:h,tip:new U(160,12),mid:new U(125,10),neck:new U(90,8),anchor:{x:0,y:0},releaseAxis:{x:0,y:1},releaseDelay:e===0?32:68,absorbed:!0,retracting:!1}),this.#f.append(s,h)}for(let e=0;e<4;e++){const s=document.createElementNS(M,"path");s.setAttribute("class","gbtn__drop-tail");const h=document.createElementNS(M,"circle");h.setAttribute("class","gbtn__drop"),this.#m.push({path:s,circle:h,active:!1,state:"idle",x:0,y:0,vx:0,vy:0,r:0,age:0,hang:0,ttl:0,ox:0,oy:0,source:null}),this.#f.append(s,h)}this.#f.append(this.#x,this.#w,this.#d),this.#p.append(this.#yt(),this.#f),this.#n=document.createElement("button"),this.#n.type="button",this.#n.className="gbtn__hit",this.#n.setAttribute("part","button"),this.#_=document.createElement("span"),this.#_.className="gbtn__ripples",this.#_.setAttribute("aria-hidden","true");const n=document.createElement("span");n.className="gbtn__label",n.setAttribute("part","label"),this.#B=document.createElement("slot"),n.append(this.#B),this.#n.append(this.#_,n),this.#b.append(this.#p,this.#n),i.append(t,this.#b),this.#n.addEventListener("pointerenter",this.#Bt),this.#n.addEventListener("pointerleave",this.#Pt),this.#n.addEventListener("pointerdown",this.#Ht),this.#n.addEventListener("focus",this.#Ot),this.#n.addEventListener("blur",this.#Gt)}connectedCallback(){ot(this,this.getAttribute("color")),this.#A(),this.#D(),typeof ResizeObserver<"u"&&(this.#T=new ResizeObserver(this.#Vt),this.#T.observe(this.#n)),this.#F.addEventListener?.("change",this.#dt)}disconnectedCallback(){this.#M(!0),this.#T?.disconnect(),this.#T=null,this.#F.removeEventListener?.("change",this.#dt)}attributeChangedCallback(i,t,n){ot(this,this.getAttribute("color")),!(!this.#n||t===n)&&(this.#A(),(i==="size"||i==="radius"||i==="label"||i==="block"||i==="reach"||i==="goo-strength"||i==="gravity")&&queueMicrotask(()=>{this.isConnected&&this.#D()}),i==="disabled"&&this.#z("disabled")&&this.#M(!0))}#yt(){const i=document.createElementNS(M,"defs");this.#c=document.createElementNS(M,"filter"),this.#c.setAttribute("id",this.#P),this.#c.setAttribute("filterUnits","userSpaceOnUse"),this.#c.setAttribute("primitiveUnits","userSpaceOnUse"),this.#c.setAttribute("color-interpolation-filters","sRGB"),this.#S=document.createElementNS(M,"feGaussianBlur"),this.#S.setAttribute("in","SourceGraphic"),this.#S.setAttribute("stdDeviation","0"),this.#S.setAttribute("result","blur");const t=document.createElementNS(M,"feColorMatrix");t.setAttribute("in","blur"),t.setAttribute("mode","matrix"),t.setAttribute("values","1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"),t.setAttribute("result","goo");const n=document.createElementNS(M,"feComposite");return n.setAttribute("in","SourceGraphic"),n.setAttribute("in2","goo"),n.setAttribute("operator","atop"),this.#c.append(this.#S,t,n),i.append(this.#c),i}#E(i,t){return this.getAttribute(i)??t}#z(i){const t=this.getAttribute(i);return t!==null&&t!=="false"}#l(i,t,n,e){const s=parseFloat(this.getAttribute(i));return A(Number.isFinite(s)?s:t,n,e)}#bt(){const i=this.getAttribute("goo");return i===null||i!=="false"}get#K(){return this.#l("reach",240,50,360)}get#a(){return this.#K*g}get#pt(){return this.#l("stiffness",220,40,900)}get#ft(){return this.#l("damping",13,2,70)}get#G(){return this.#l("lag",.62,0,.9)}get#V(){return this.#l("goo-strength",7,0,18)}get#mt(){return this.#l("squash",.065,0,.16)}get#g(){return Math.round(this.#l("filaments",2,0,2))}get#vt(){return Math.round(this.#l("droplets",3,0,4))}get#Ft(){return this.#l("gravity",620,0,1400)}get#At(){return this.#l("drag",3.2,.5,8)}get#I(){return this.#l("sag",.28,0,.7)}#A(){const i=this.#E("size","lg"),t=this.#E("radius","pill"),n=this.#E("tone","default"),e=this.#z("disabled");this.#b.className="gbtn gbtn--"+i+" gbtn--r-"+t+" gbtn--t-"+n+(e?" is-disabled":"")+(this.#H?" is-hover":"")+(this.#O?" is-focus":"")+(this.#s!=="idle"?" is-tethered":""),this.#n.disabled=e,this.#B.textContent=this.#E("label","Start Collecting");for(const s of["aria-label","title"]){const h=this.getAttribute(s);h==null?this.#n.removeAttribute(s):this.#n.setAttribute(s,h)}this.#Mt()}#Mt(){const i=this.#pt,t=this.#ft,n=this.#G;this.#i.k=i,this.#i.d=t,this.#h.k=i*(1-n*.42),this.#h.d=t*(1-n*.18),this.#o.k=i*(1-n*.72),this.#o.d=t*(1-n*.34);const e=[{tk:1.05,td:.95,mk:.58,md:.82,nk:.4,nd:.72},{tk:.56,td:.78,mk:.4,md:.68,nk:.27,nd:.58}];this.#r.forEach((s,h)=>{const o=e[h];s.tip.k=i*o.tk,s.tip.d=t*o.td,s.mid.k=i*o.mk,s.mid.d=t*o.md,s.neck.k=i*o.nk,s.neck.d=t*o.nd})}#D(){const i=this.#n.getBoundingClientRect();if(!i.width||!i.height)return;const t=Math.abs(i.width-this.#e.width)>.25||Math.abs(i.height-this.#e.height)>.25;this.#e={width:i.width,height:i.height},this.#p.setAttribute("viewBox","0 0 "+i.width+" "+i.height),this.#u.setAttribute("x","0"),this.#u.setAttribute("y","0"),this.#u.setAttribute("width",i.width.toFixed(2)),this.#u.setAttribute("height",i.height.toFixed(2));const n=this.#J(i.height);this.#u.setAttribute("rx",n.toFixed(2)),this.#u.setAttribute("ry",n.toFixed(2));const e=this.#a*1.45+this.#V*3*g+32,s=this.#a*.95+this.#V*4*g+24;this.#c.setAttribute("x",(-e).toFixed(2)),this.#c.setAttribute("y",(-e).toFixed(2)),this.#c.setAttribute("width",(i.width+e*2).toFixed(2)),this.#c.setAttribute("height",(i.height+e+Math.max(e,s)).toFixed(2)),t&&this.#s!=="idle"&&this.#M(!0),this.#s==="idle"&&(this.#t={x:i.width*.72,y:i.height,nx:0,ny:1,tx:1,ty:0},this.#i.seed(this.#t.x,this.#t.y),this.#h.seed(this.#t.x,this.#t.y),this.#o.seed(this.#t.x,this.#t.y),this.#U())}#J(i){const t=this.#E("radius","pill");return t==="none"?0:t==="subtle"?Math.min(9,i*.28):t==="rounded"?Math.min(15,i*.38):i*.5}#$(){return Math.min(this.#J(this.#e.height),this.#e.width/2,this.#e.height/2)}#_t(i,t){const{width:n,height:e}=this.#e,s=this.#$(),h=Math.abs(i-n/2)-(n/2-s),o=Math.abs(t-e/2)-(e/2-s),r=Math.hypot(Math.max(h,0),Math.max(o,0)),a=Math.min(Math.max(h,o),0);return r+a<=s}#wt(i,t){const{width:n,height:e}=this.#e,s=this.#$(),h=n/2,o=e/2,r=i>=h?1:-1,a=t>=o?1:-1,c=n/2-s,u=e/2-s;let b=0,y=0;if(s>0&&Math.abs(i-h)>c&&Math.abs(t-o)>u){const l=h+r*c,x=o+a*u,p=Math.hypot(i-l,t-x)||1;b=(i-l)/p,y=(t-x)/p}else Math.abs(i-h)/Math.max(1,n/2)>=Math.abs(t-o)/Math.max(1,e/2)?b=r:y=a;return{x:i,y:t,nx:b,ny:y,tx:-y,ty:b}}#tt(i,t){const n=this.#e.width/2,e=this.#e.height/2,s=Math.hypot(i,t)||1,h=i/s,o=t/s;let r=0,a=Math.hypot(this.#e.width,this.#e.height);for(let c=0;c<18;c++){const u=(r+a)/2;this.#_t(n+h*u,e+o*u)?r=u:a=u}return this.#wt(n+h*r,e+o*r)}#R(i,t,n=1.8){const e=this.#e.width/2,s=this.#e.height/2,h=this.#tt(i.x+i.tx*t-e,i.y+i.ty*t-s);return{...h,x:h.x-h.nx*n,y:h.y-h.ny*n}}#kt(i){const t=i===0?1:-1,n=this.#e.height*(i===0?.32:.25)*t;return this.#R(this.#t,n,0)}#U(){const i=this.#g;this.#r.forEach((t,n)=>{t.anchor=this.#kt(n),t.tip.seed(t.anchor.x,t.anchor.y),t.mid.seed(t.anchor.x,t.anchor.y),t.neck.seed(t.anchor.x,t.anchor.y),t.releaseAxis={x:this.#t.nx,y:this.#t.ny},t.absorbed=n>=i,t.retracting=!1,t.absorbed&&this.#q(t)})}#Et(){const i=this.#g,t=this.#a,n=this.#i.tx-this.#t.x,e=this.#i.ty-this.#t.y,s=Math.hypot(n,e),h=s>.001?n/s:this.#t.nx,o=s>.001?e/s:this.#t.ny,r=Math.min(this.#Y,t),a=A(r/Math.max(1,t),0,1),c=this.#I*this.#e.height*a*a*.75*g,u=-o,b=h,y=[{neck:.24,mid:.58,tip:.99,sag:1.8,side:.18},{neck:.18,mid:.46,tip:.88,sag:.68,side:-.2}];this.#r.forEach((l,x)=>{if(x>=i||l.absorbed)return;const p=L(l.releaseDelay,l.releaseDelay+82,this.#y),d=y[x],v=(m,F,f,_)=>{const k=d.side*this.#e.height*a*_*g;m.tx=l.anchor.x+h*r*F*p+u*k*p,m.ty=l.anchor.y+o*r*F*p+b*k*p+c*d.sag*f*p};v(l.neck,d.neck,.42,.32),v(l.mid,d.mid,1,.76),v(l.tip,d.tip,0,1),x===0&&(l.tip.tx=this.#i.tx,l.tip.ty=this.#i.ty)})}#St(){this.#r.forEach((i,t)=>{if(t>=this.#g||i.absorbed)return;const n=i.tip.x-i.anchor.x,e=i.tip.y-i.anchor.y,s=Math.hypot(n,e);i.releaseAxis=s>.001?{x:n/s,y:e/s}:{x:i.anchor.nx,y:i.anchor.ny},i.retracting=!1})}#Ct(){this.#r.forEach((i,t)=>{if(!(t>=this.#g||i.absorbed)&&!i.retracting&&this.#j>=i.releaseDelay){i.retracting=!0;for(const n of[i.tip,i.mid,i.neck])n.tx=i.anchor.x,n.ty=i.anchor.y}})}#Yt(i,t){const n=this.#n.getBoundingClientRect(),e=this.#e.width/2,s=this.#e.height/2;let h=i-n.left-e,o=t-n.top-s;return Math.abs(h)+Math.abs(o)<.001&&(o=1),this.#tt(h,o)}#it(i,t){const n=this.#n.getBoundingClientRect();let e=i-n.left-this.#t.x,s=t-n.top-this.#t.y;const h=Math.hypot(e,s);this.#Y=h,h<.001?(e=this.#t.nx,s=this.#t.ny):(e/=h,s/=h);const o=this.#a,r=Math.min(h,o),a=Math.max(0,h-o),c=o*.22*(1-Math.exp(-a/Math.max(1,o*.38))),u=r+c;this.#i.tx=this.#t.x+e*u,this.#i.ty=this.#t.y+s*u;const b=r*A(.68-this.#G*.1,.6,.68);this.#h.tx=this.#t.x+e*b,this.#h.ty=this.#t.y+s*b;const y=r*A(.34-this.#G*.09,.26,.34);this.#o.tx=this.#t.x+e*y,this.#o.ty=this.#t.y+s*y}#Xt(){if(this.#s!=="attached")return;const i=this.#i.x-this.#t.x,t=this.#i.y-this.#t.y,n=Math.hypot(i,t),e=this.#a*1.22;if(n<=e||n<.001)return;const s=i/n,h=t/n;this.#i.x=this.#t.x+s*e,this.#i.y=this.#t.y+h*e;const o=this.#i.vx*s+this.#i.vy*h;o>0&&(this.#i.vx-=s*o*.82,this.#i.vy-=h*o*.82)}#et(i=!0){if(this.#s!=="attached")return;const t=this.#i.x-this.#t.x,n=this.#i.y-this.#t.y,e=Math.hypot(t,n);this.#X=e>.001?{x:t/e,y:n/e}:{x:this.#t.nx,y:this.#t.ny},this.#s="retract",this.#j=0,this.#i.tx=this.#t.x,this.#i.ty=this.#t.y,this.#h.tx=this.#t.x,this.#h.ty=this.#t.y,this.#o.tx=this.#t.x,this.#o.ty=this.#t.y,this.#St(),this.#ut(),this.#A(),i&&this.#Q()}#Q(){if(this.#F.matches){this.#M(!0);return}this.#k||(this.#C=0,this.#k=requestAnimationFrame(this.#st))}#st=i=>{if(this.#k=0,this.#s==="idle"||!this.isConnected)return;const t=Math.min(.032,this.#C?(i-this.#C)/1e3:1/60);if(this.#C=i,this.#y+=t*1e3,this.#s==="attached"){this.#Et(),this.#Nt();const n=A(this.#K*5.2,780,1250);(this.#y>n||this.#y>70&&this.#Y>this.#a*1.07)&&this.#et(!1)}else this.#s==="retract"&&(this.#j+=t*1e3,this.#Ct());if(!this.#v&&this.#s!=="drain"&&(this.#i.step(t),this.#h.step(t),this.#o.step(t),this.#Xt()),this.#r.forEach((n,e)=>{e>=this.#g||n.absorbed||(n.tip.step(t),n.mid.step(t),n.neck.step(t))}),this.#Dt(t),this.#s==="retract"&&!this.#v&&(this.#i.x-this.#t.x)*this.#X.x+(this.#i.y-this.#t.y)*this.#X.y<=this.#e.height*.032&&this.#jt(),this.#s==="retract"&&this.#Rt(),this.#Lt(),!(this.#s==="retract"&&this.#v&&this.#nt()&&(this.#M(!1),this.#s==="idle"))){if(this.#s==="drain"&&!this.#W()){this.#M(!0);return}this.#k=requestAnimationFrame(this.#st)}};#jt(){this.#v=!0;const i=[this.#i,this.#h,this.#o];this.#lt(i);for(const t of i)t.tx=this.#t.x,t.ty=this.#t.y,t.snap();this.#ht()}#Rt(){this.#r.forEach((i,t)=>{if(t>=this.#g||i.absorbed||!i.retracting||(i.tip.x-i.anchor.x)*i.releaseAxis.x+(i.tip.y-i.anchor.y)*i.releaseAxis.y>this.#e.height*.025)return;i.absorbed=!0;const e=[i.tip,i.mid,i.neck];this.#lt(e);for(const s of e)s.tx=i.anchor.x,s.ty=i.anchor.y,s.snap();this.#q(i)})}#nt(){return this.#r.every((i,t)=>t>=this.#g||i.absorbed)}#ht(){this.#w.setAttribute("d",""),this.#x.setAttribute("r","0"),this.#d.setAttribute("r","0"),this.#w.style.removeProperty("opacity"),this.#x.style.removeProperty("opacity"),this.#d.style.removeProperty("opacity")}#q(i){i.path.setAttribute("d",""),i.path.style.removeProperty("opacity"),i.bead.setAttribute("r","0"),i.bead.style.removeProperty("opacity")}#Lt(){if(this.#v||this.#s==="drain"){const lt=this.#ot(),gt=this.#rt();this.#at(0,Math.max(lt,gt),!this.#nt()||this.#W());return}const i=this.#t.x,t=this.#t.y,n=this.#i.x,e=this.#i.y;let s=n-i,h=e-t;const o=Math.hypot(s,h);o<.001?(s=this.#t.nx,h=this.#t.ny):(s/=o,h/=o);const r=-h,a=s,c=this.#e.height,u=A(o/Math.max(1,this.#a),0,1),b=Math.max(Math.hypot(this.#i.vx,this.#i.vy),Math.hypot(this.#h.vx,this.#h.vy)*1.08,Math.hypot(this.#o.vx,this.#o.vy)*1.16),y=this.#i.vx*r+this.#i.vy*a,l=this.#mt,x=A(b*g/900,0,1)*l,p=Math.max(0,(n-i)*this.#X.x+(e-t)*this.#X.y),d=this.#s==="retract"?L(c*.03,c*.42,p):1,v=A(c*(.19+u*.18+x*.16),5,c*.42)*d*g,m=A(c*(.14-u*.045+x*.12),2.2,c*.16)*d*g,F=A(c*(.095-u*.035+x*.08),1.9,c*.12)*d*g,f=A(c*(.066-u*.018+x*.08),2,c*.085)*d*g,_=this.#t.tx*r+this.#t.ty*a<0?-1:1,k=v*(1.12+Math.sin(this.#y*.009)*u*.04),S=v*.82,N=Math.min(2.2,c*.055),E=this.#R(this.#t,k*_,N),C=this.#R(this.#t,-S*_,N),T=E.x,Y=E.y,j=C.x,z=C.y,R=Math.min(o*.22,c*.62)*d*g,D=A(y*.007*g,-c*.24*g,c*.24*g),Q=this.#s==="attached"?Math.sin(this.#y*.012)*u*.75*g:0,it=this.#I*c*u*u*1.65*g,X=this.#o.x+r*D*.28,q=this.#o.y+a*D*.28+it*.28,B=this.#h.x+r*(D+Q),P=this.#h.y+a*(D+Q)+it*.88,W=n-s*f*.58,Z=e-h*f*.58,H=f*.46,K=W+r*H,O=Z+a*H,J=W-r*H,$=Z-a*H;let V=E.nx+C.nx,I=E.ny+C.ny;const G=Math.hypot(V,I)||1;V/=G,I/=G;const et=Math.min(2.4,c*.055),nt=(T+j)*.5-V*et,st=(Y+z)*.5-I*et,rt=["M",T.toFixed(2),Y.toFixed(2),"C",(T+E.nx*R).toFixed(2),(Y+E.ny*R).toFixed(2),(X+r*m).toFixed(2),(q+a*m).toFixed(2),(X+r*m).toFixed(2),(q+a*m).toFixed(2),"C",(B+r*F).toFixed(2),(P+a*F).toFixed(2),K.toFixed(2),O.toFixed(2),K.toFixed(2),O.toFixed(2),"L",J.toFixed(2),$.toFixed(2),"C",J.toFixed(2),$.toFixed(2),(B-r*F).toFixed(2),(P-a*F).toFixed(2),(X-r*m).toFixed(2),(q-a*m).toFixed(2),"C",(X-r*m).toFixed(2),(q-a*m).toFixed(2),(j+C.nx*R).toFixed(2),(z+C.ny*R).toFixed(2),j.toFixed(2),z.toFixed(2),"Q",nt.toFixed(2),st.toFixed(2),T.toFixed(2),Y.toFixed(2),"Z"].join(" ");this.#w.setAttribute("d",rt),this.#x.setAttribute("cx",(i-this.#t.nx*v*.16).toFixed(2)),this.#x.setAttribute("cy",(t-this.#t.ny*v*.16).toFixed(2)),this.#x.setAttribute("r",(v*.52).toFixed(2)),this.#d.setAttribute("cx",n.toFixed(2)),this.#d.setAttribute("cy",e.toFixed(2)),this.#d.setAttribute("r",f.toFixed(2));const ht=(this.#s==="retract"?d*d:1).toFixed(3);this.#w.style.opacity=ht,this.#x.style.opacity=ht,this.#d.style.opacity=ht;const at=this.#ot(),ct=this.#rt();this.#at(u,Math.max(b,at,ct),!0)}#ot(){const i=this.#g,t=this.#e.height;let n=0;return this.#r.forEach((e,s)=>{if(s>=i||e.absorbed){this.#q(e);return}const h=e.anchor.x,o=e.anchor.y,r=s===0&&this.#s==="attached",a=r?this.#i.x:e.tip.x,c=r?this.#i.y:e.tip.y;let u=a-h,b=c-o;const y=Math.hypot(u,b);y>.001?(u/=y,b/=y):(u=this.#t.nx,b=this.#t.ny);const l=-b,x=u,p=Math.max(Math.hypot(e.tip.vx,e.tip.vy),Math.hypot(e.mid.vx,e.mid.vy),Math.hypot(e.neck.vx,e.neck.vy));n=Math.max(n,p);const d=A(y/Math.max(1,this.#a),0,1),v=Math.max(0,(a-h)*e.releaseAxis.x+(c-o)*e.releaseAxis.y),m=this.#s==="retract"&&e.retracting?L(t*.025,t*.34,v):1,F=L(.7,t*.16,y),f=m*F,_=s===0?.5:.34,k=t*(.14-d*.035)*_*f*g,S=t*(.095-d*.035)*_*f*g,N=t*(.066-d*.024)*_*f*g,E=t*(.052-d*.012)*_*f*g,C=e.anchor.tx*l+e.anchor.ty*x<0?-1:1,T=Math.min(1.45,t*.036),Y=this.#R(e.anchor,k*C,T),j=this.#R(e.anchor,-k*C,T),z=Y.x,R=Y.y,D=j.x,Q=j.y,it=e.tip.vx*l+e.tip.vy*x,X=A(it*.006*g,-t*.16*g,t*.16*g),q=this.#I*t*d*d*(s===0?3:.35)*g,B=e.neck.x+l*X*.25,P=e.neck.y+x*X*.25+q*.34,W=e.mid.x+l*X,Z=e.mid.y+x*X+q,H=a-u*E*.52,K=c-b*E*.52,O=E*.42,J=H+l*O,$=K+x*O,V=H-l*O,I=K-x*O,G=Math.min(y*.13,t*.22)*f*g,et=h-e.anchor.nx*1.4,nt=o-e.anchor.ny*1.4;e.path.setAttribute("d",["M",z.toFixed(2),R.toFixed(2),"C",(z+Y.nx*G).toFixed(2),(R+Y.ny*G).toFixed(2),(B+l*S).toFixed(2),(P+x*S).toFixed(2),(B+l*S).toFixed(2),(P+x*S).toFixed(2),"C",(W+l*N).toFixed(2),(Z+x*N).toFixed(2),J.toFixed(2),$.toFixed(2),J.toFixed(2),$.toFixed(2),"L",V.toFixed(2),I.toFixed(2),"C",V.toFixed(2),I.toFixed(2),(W-l*N).toFixed(2),(Z-x*N).toFixed(2),(B-l*S).toFixed(2),(P-x*S).toFixed(2),"C",(B-l*S).toFixed(2),(P-x*S).toFixed(2),(D+j.nx*G).toFixed(2),(Q+j.ny*G).toFixed(2),D.toFixed(2),Q.toFixed(2),"Q",et.toFixed(2),nt.toFixed(2),z.toFixed(2),R.toFixed(2),"Z"].join(" ")),e.bead.setAttribute("cx",a.toFixed(2)),e.bead.setAttribute("cy",c.toFixed(2)),e.bead.setAttribute("r",E.toFixed(2));const st=(f*f).toFixed(3);e.path.style.opacity=st,e.bead.style.opacity=st}),n}#rt(){let i=0;return this.#m.forEach(t=>{if(!t.active)return;const n=1-L(t.ttl*.65,t.ttl,t.age),e=this.#e.height+this.#a*.9,s=1-L(e-this.#a*.24,e,t.y),h=Math.min(n,s),o=t.r*Math.sqrt(Math.max(0,h));t.circle.setAttribute("cx",t.x.toFixed(2)),t.circle.setAttribute("cy",t.y.toFixed(2)),t.circle.setAttribute("r",o.toFixed(2)),t.circle.style.opacity=h.toFixed(3),i=Math.max(i,Math.hypot(t.vx,t.vy));const r=Math.max(0,t.age-t.hang),a=t.state==="hanging"?h:h*(1-L(0,125,r));if(a<=.01||o<=.1){t.path.setAttribute("d",""),t.path.style.opacity="0";return}const c=t.x-t.vx*.035,u=t.y-t.vy*.035,b=L(0,110,r),y=t.state==="hanging"?t.ox:t.ox+(c-t.ox)*b,l=t.state==="hanging"?t.oy:t.oy+(u-t.oy)*b;let x=t.x-y,p=t.y-l;const d=Math.hypot(x,p);d>.001?(x/=d,p/=d):(x=0,p=1);const v=-p,m=x,F=o*(t.state==="hanging"?.72:.34),f=o*(t.state==="hanging"?.34:.2),_=t.x-x*o*.55,k=t.y-p*o*.55;t.path.setAttribute("d",["M",(y+v*F).toFixed(2),(l+m*F).toFixed(2),"C",(y+x*d*.3+v*F).toFixed(2),(l+p*d*.3+m*F).toFixed(2),(_+v*f).toFixed(2),(k+m*f).toFixed(2),(_+v*f).toFixed(2),(k+m*f).toFixed(2),"L",(_-v*f).toFixed(2),(k-m*f).toFixed(2),"C",(_-v*f).toFixed(2),(k-m*f).toFixed(2),(y+x*d*.3-v*F).toFixed(2),(l+p*d*.3-m*F).toFixed(2),(y-v*F).toFixed(2),(l-m*F).toFixed(2),"Z"].join(" ")),t.path.style.opacity=a.toFixed(3)}),i}#at(i,t,n){const e=this.#E("size","lg")==="sm"?.82:this.#E("size","lg")==="lg"?1.12:1,s=this.#V*e*g,h=Math.min(s,3.1*e*g),o=n?Math.min(h,.35*g+i*h*.48):0,r=this.#bt()&&!this.#F.matches&&n?Math.min(h,Math.max(o,t*.007*g)):0;this.#gt(r)}#Nt(){const i=this.#vt;if(!i||this.#F.matches)return;const t=this.#Y/Math.max(1,this.#a),n=[.18,.38,.56,.76],e=[52,108,172,238];for(let s=0;s<i;s++){const h=1<<s;this.#L&h||t<n[s]||this.#y<e[s]||(this.#L|=h,this.#zt(s))}}#Tt(i){return i===0&&this.#g>0&&!this.#r[0].absorbed?this.#r[0].tip:i===1&&this.#g>1&&!this.#r[1].absorbed?this.#r[1].tip:i===2?this.#h:this.#i}#zt(i){const t=this.#m[i],n=this.#Tt(i),e=i===0,s=e?A(this.#t.x-this.#e.height*.3*g,this.#e.height*.28,this.#e.width-this.#e.height*.28):n.x,h=e?this.#e.height:n.y,o=e?0:n.vx,r=e?0:n.vy,a=s-this.#t.x,c=h-this.#t.y,u=Math.hypot(a,c),b=u>.001?a/u:this.#t.nx,l=-(u>.001?c/u:this.#t.ny),x=b,p=i%2?-1:1,d=e?0:this.#e.height*(.022+i*.005)*p*g;t.active=!0,t.state="hanging",t.x=s+l*d,t.y=h+x*d+.8*g,t.ox=s,t.oy=h,t.source=e?null:n,t.vx=(o*.28+(e?2:l*p*(15+i*6)))*g,t.vy=(r*.2+(e?18:28+i*14))*g,t.r=this.#e.height*(e?.062:.052+i*.007)*g,t.age=0,t.hang=e?560:300+i*80,t.ttl=e?1400:1160+i*145}#Dt(i){const t=this.#Ft*g,n=this.#At,e=this.#e.height+this.#a*.9;this.#m.forEach((s,h)=>{if(!s.active)return;s.age+=i*1e3,s.state==="hanging"&&s.source&&(s.ox=s.source.x,s.oy=s.source.y),s.state==="hanging"&&s.age>=s.hang&&(s.state="falling",s.source=null);const o=s.state==="hanging";s.vy+=t*(o?.28:1)*i;const r=Math.exp(-n*(o?.42:1)*i);s.vx*=r,s.vy*=r,s.x+=s.vx*i,s.y+=s.vy*i,(s.age>=s.ttl||s.y>e)&&this.#ct(h)})}#ct(i){const t=this.#m[i];t.active=!1,t.state="idle",t.source=null,t.path.setAttribute("d",""),t.path.style.removeProperty("opacity"),t.circle.setAttribute("r","0"),t.circle.style.removeProperty("opacity")}#lt(i){this.#m.forEach(t=>{!t.active||t.state!=="hanging"||!i.includes(t.source)||(t.ox=t.source.x,t.oy=t.source.y,t.source=null,t.state="falling",t.hang=t.age)})}#W(){return this.#m.some(i=>i.active)}#gt(i){const t=i>.15;this.#S.setAttribute("stdDeviation",i.toFixed(2)),this.#f.style.filter=t?"url(#"+this.#P+")":"none"}#qt(){this.#N||(this.#N=!0,window.addEventListener("pointermove",this.#xt,{passive:!0}))}#ut(){this.#N&&(this.#N=!1,window.removeEventListener("pointermove",this.#xt))}#M(i=!1){if(this.#k&&cancelAnimationFrame(this.#k),this.#k=0,this.#C=0,this.#ut(),this.#ht(),this.#r.forEach(t=>this.#q(t)),!i&&this.#W()){this.#s="drain",this.#v=!0,this.#A();return}this.#s="idle",this.#y=0,this.#j=0,this.#Y=0,this.#v=!1,this.#L=0,this.#i.tx=this.#t.x,this.#i.ty=this.#t.y,this.#h.tx=this.#t.x,this.#h.ty=this.#t.y,this.#o.tx=this.#t.x,this.#o.ty=this.#t.y,this.#i.snap(),this.#h.snap(),this.#o.snap(),this.#U(),this.#m.forEach((t,n)=>{(t.active||t.circle.getAttribute("r")!=="0")&&this.#ct(n)}),this.#gt(0),this.#b&&this.#A()}#Bt=i=>{i.pointerType!=="touch"&&(this.#H=!0,this.#b.classList.add("is-hover"),this.#s!=="idle"&&this.#et())};#Pt=i=>{this.#H=!1,this.#b.classList.remove("is-hover"),!(i.pointerType==="touch"||this.#F.matches||this.#z("disabled"))&&(this.#s!=="idle"&&this.#M(!0),this.#D(),this.#t=this.#Yt(i.clientX,i.clientY),this.#i.seed(this.#t.x,this.#t.y),this.#h.seed(this.#t.x,this.#t.y),this.#o.seed(this.#t.x,this.#t.y),this.#U(),this.#v=!1,this.#L=0,this.#j=0,this.#Z={clientX:i.clientX,clientY:i.clientY,type:i.pointerType||"mouse"},this.#s="attached",this.#y=0,this.#it(i.clientX,i.clientY),this.#qt(),this.#A(),this.#Q())};#xt=i=>{this.#s!=="attached"||i.pointerType==="touch"||(this.#Z={clientX:i.clientX,clientY:i.clientY,type:i.pointerType||"mouse"},this.#it(i.clientX,i.clientY),this.#Q())};#Ht=i=>{if(this.#z("disabled")||this.#F.matches)return;const t=this.#n.getBoundingClientRect(),n=i.clientX-t.left,e=i.clientY-t.top,s=Math.max(n,t.width-n),h=Math.max(e,t.height-e),o=Math.hypot(s,h)*2,r=document.createElement("span");for(r.className="gbtn__ripple",r.style.cssText="left:"+n+"px;top:"+e+"px;width:"+o+"px;height:"+o+"px",r.addEventListener("animationend",()=>r.remove()),this.#_.append(r);this.#_.childElementCount>5;)this.#_.firstElementChild?.remove()};#Ot=()=>{this.#O=this.#n.matches(":focus-visible"),this.#A()};#Gt=()=>{this.#O=!1,this.#A()};#Vt=()=>{this.#D()};#dt=()=>{this.#F.matches&&this.#M(!0)}}customElements.define("vs-button-gooey",bt);
