import{FX_CSS as L,pressRipple as S}from"./vs-fx.CLXiCjCI.js";const F=`
  :host {
    display: inline-flex;
    /* shrink-to-fit host: without this it insists on ticks + gap + the full card
       width and hangs the card's right corner out of a narrow column */
    max-width: 100%;
    /* metrics only — the tick geometry and the card share one scale */
    --tick-h: 3px;
    --gap: 18px;
    --w-min: 10px;
    --w-max: 27px;
    --card-w: 252px;
    --card-offset: 18px;
    --fs: 13px;
    --fs-2: 12px;
    --fs-idx: 10px;
    --pad: 14px;
    --r: 15px;
    --body-min: 32px;
    /* accent as an rgb triple so the hot tick can tint its own glow; the tones
       below swap it. Kept separate from --accent (a hex token) on purpose. */
    --tr-hot: var(--ui-ring, 255 255 255);
    --tr-card: var(--bg-elevated, #111111);
    --tr-card-tint: color-mix(in srgb, var(--bg-elevated, #111111) 88%, transparent);
    --tr-border: var(--border, #1f1f1f);
    --tr-shadow-rgb: 0 0 0;
    --tr-shadow-a: 0.34;
    --tr-lite: 0;
    --rip: 255 255 255;
  }
  :host([size='sm']) {
    --tick-h: 2px; --gap: 14px; --w-min: 8px; --w-max: 21px;
    --card-w: 216px; --card-offset: 14px;
    --fs: 12px; --fs-2: 11px; --pad: 12px; --r: 13px; --body-min: 28px;
  }
  :host([size='lg']) {
    --tick-h: 4px; --gap: 24px; --w-min: 13px; --w-max: 35px;
    --card-w: 292px; --card-offset: 22px;
    --fs: 15px; --fs-2: 13px; --pad: 17px; --r: 18px; --body-min: 36px;
  }

  /* block: the rail is edge furniture, so it pins to the side of its container
     instead of sitting centred. The :not() is load-bearing — the playground
     turns a flag off by writing the string "false", not by removing it. */
  :host([block]:not([block='false'])) { display: flex; width: 100%; }
  :host([block]:not([block='false'])) .rail { margin-right: auto; }
  :host([block]:not([block='false'])[side='left']) .rail {
    margin-right: 0;
    margin-left: auto;
  }

  :host([tone='danger'])  { --tr-hot: 255 99 105; }
  :host([tone='warn'])    { --tr-hot: 245 176 66; }
  :host([tone='success']) { --tr-hot: 46 196 122; }

  /* light theme: the card goes to the page surface and the shadow gets short
     and soft, the way an elevated surface behaves on white. */
  :host-context([data-theme='light']) {
    --tr-card: #ffffff;
    --tr-card-tint: color-mix(in srgb, #ffffff 90%, transparent);
    --tr-border: var(--border, #e4e4e4);
    --tr-shadow-rgb: 17 24 39;
    --tr-shadow-a: 0.14;
    --tr-lite: 1;
    --rip: 20 20 20;
  }

  .rail {
    position: relative;
    display: grid;
    /* the track column is the HOT width, not the resting one: a magnified tick
       must never slide under the card, and the card must not shift when the
       magnify knob moves. JS writes --hot-w. */
    /* --card-w is the card's DESIGN width, not a floor: as a bare track it also
       becomes the rail's minimum and the card gets sliced by the container edge.
       minmax(0, …) keeps the design width wherever it fits and gives it up first
       when it does not — the tick column is fixed and never yields. */
    grid-template-columns: var(--hot-w, auto) minmax(0, var(--card-w));
    column-gap: var(--card-offset);
    align-items: start;
    box-sizing: border-box;
    font-family: inherit;
    /* the card and the hot ticks travel past their own column — clipping any of
       it kills the lag, which is the effect */
    overflow: visible;
    -webkit-tap-highlight-color: transparent;
    /* JS owns every transform; stay invisible until the first measurement */
    opacity: 0;
    transition: opacity 160ms linear;
  }
  .rail--ready { opacity: 1; }
  :host([side='left']) .rail { grid-template-columns: minmax(0, var(--card-w)) var(--hot-w, auto); }
  :host([disabled]) .rail { opacity: 0.45; pointer-events: none; }

  .rail__track {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: var(--gap);
    grid-column: 1;
  }
  :host([side='left']) .rail__track { grid-column: 2; align-items: flex-end; }

  /* the button IS the tick: 4px tall, so the hit area is widened by a
     pseudo-element instead of by layout (which would change the row pitch) */
  .rail__tick {
    position: relative;
    flex: 0 0 auto;
    height: var(--tick-h);
    padding: 0;
    border: 0;
    background: none;
    color: var(--text, #ededed);
    cursor: pointer;
    transform-origin: left center;
    will-change: transform, opacity, filter;
  }
  :host([side='left']) .rail__tick { transform-origin: right center; }
  .rail__tick::after {
    content: '';
    position: absolute;
    inset: calc(var(--gap) / -2 - 1px) -6px;
  }
  .rail__tick:focus { outline: none; }
  .rail__tick:focus-visible .rail__bar {
    box-shadow: 0 0 0 2px var(--ui-accent, #ededed), 0 0 0 4px rgb(var(--tr-hot) / 0.22);
  }

  .rail__bar {
    position: absolute;
    inset: 0;
    border-radius: 999px;
    background: currentColor;
  }
  /* the hot layer only fades its own opacity, so a per-frame colour ramp costs
     nothing — no background recompute, no paint of a new gradient */
  .rail__bar--hot {
    background: rgb(var(--tr-hot));
    box-shadow: 0 0 10px rgb(var(--tr-hot) / 0.55);
    opacity: 0;
  }

  /* The card is out of flow, so the track above only reserves its space — the
     card has to follow that column down on its own. Anchored to the rail edge
     (identical to the old left: calc(100% - --card-w) while it fits) and capped
     by what the ticks and their gap leave behind, so it never crosses the track
     and never sticks out of the box. */
  .rail__card {
    position: absolute;
    top: 0;
    left: auto;
    right: 0;
    width: min(var(--card-w), 100% - var(--hot-w, 0px) - var(--card-offset));
    border-radius: var(--r);
    will-change: transform, filter;
  }
  :host([side='left']) .rail__card { left: 0; right: auto; }

  .rail__bg {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--tr-card-tint);
    border: 1px solid var(--tr-border);
    backdrop-filter: blur(10px) saturate(1.4);
    -webkit-backdrop-filter: blur(10px) saturate(1.4);
    box-shadow:
      0 1px 0 rgb(255 255 255 / calc(0.05 * (1 - var(--tr-lite, 0)))) inset,
      0 10px 30px rgb(var(--tr-shadow-rgb) / calc(var(--tr-shadow-a) * (0.55 + 0.45 * var(--e, 0))));
  }

  .rail__inner {
    position: relative;
    z-index: 2;
    padding: var(--pad);
    will-change: transform;
  }
  /* Height is a SPRING, written by JS from the incoming layer's own content —
     so a two-line and a four-line item both fit and the card grows into it.
     min-height is only the floor for a one-line item. */
  .rail__body {
    position: relative;
    min-height: var(--body-min);
    will-change: height;
  }

  /* two stacked layers so the label HANDS OVER instead of cross-fading: the
     outgoing one blurs down and out fast, then a dead window, then the incoming
     one lands. Delays live in CSS; the class flip is the only JS involved. */
  /* top/left/right but NO bottom: the layer is as tall as its own text, which
     is exactly what the height spring measures. */
  .rail__layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transform: translate3d(0, -7px, 0) scale(0.985);
    filter: blur(7px);
    transition:
      opacity 170ms linear,
      transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
      filter 200ms linear;
    pointer-events: none;
  }
  .rail__layer.is-in {
    opacity: 1;
    transform: none;
    filter: none;
    transition-delay: 90ms;
  }
  .rail__layer.is-out {
    opacity: 0;
    transform: translate3d(0, 7px, 0) scale(0.99);
    filter: blur(6px);
    transition-duration: 120ms, 200ms, 120ms;
    transition-delay: 0ms;
  }

  .rail__idx {
    display: block;
    margin-bottom: 5px;
    color: var(--text-muted, #666666);
    font-size: var(--fs-idx);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.08em;
  }
  .rail__title {
    display: block;
    color: var(--text, #ededed);
    font-size: var(--fs);
    font-weight: 560;
    line-height: 1.25;
    letter-spacing: -0.01em;
  }
  /* No line clamp: the card is sized from the text, not the text from the card. */
  .rail__text {
    display: block;
    margin-top: 4px;
    color: var(--text-secondary, #a1a1a1);
    font-size: var(--fs-2);
    line-height: 1.4;
    text-wrap: pretty;
  }
  .rail__text:empty { display: none; }

  ${L}
  .fx-ripples { z-index: 1; border-radius: inherit; }

  @media (prefers-reduced-motion: reduce) {
    .rail, .rail__layer { transition: none; }
    .rail__layer.is-in { transition-delay: 0ms; }
  }
`,o=(c,t,e)=>c<t?t:c>e?e:c,v=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;class m{x=0;v=0;target=0;constructor(t,e){this.k=t,this.d=e}step(t){const e=t/2;for(let i=0;i<2;i++){const s=-this.k*(this.x-this.target)-this.d*this.v;this.v+=s*e,this.x+=this.v*e}}get settled(){return Math.abs(this.v)<.002&&Math.abs(this.x-this.target)<.002}snap(){this.x=this.target,this.v=0}}class x extends m{get settled(){return Math.abs(this.v)<.6&&Math.abs(this.x-this.target)<.15}}const M=["Spring tuning pass|Stiffness 260 and damping 17 across the whole catalog","Gaussian falloff|One tick lifts all the way and its neighbours barely notice","Shell lag|The card trails its own content by half of the gap","Velocity blur|The filter reads spring speed and lands on exactly zero","Rail magnifier|Ticks lerp toward the card instead of scaling by a factor","Tooltip handover|Labels swap through a dead window — never a cross-fade","Squash and stretch|Thickness follows acceleration and not a keyframe","Edge ripple|A press pushes one wave in from the rail side of the card","Keyboard pass|Every tick is reachable with the arrow keys","Reduced motion|Springs snap straight to target when the user asks"].join(", ");let f;function A(c){if(f||=document.createElement("canvas").getContext("2d"),!f)return null;f.fillStyle="#000",f.fillStyle=c;const t=f.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const C=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function k(c,t){const e=t?A(String(t).trim()):null;if(!e){for(const n of C)c.style.removeProperty(n);return}const i=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),r=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(n=>Math.round(r?n*.92:n+(255-n)*.16)),l=(n,u)=>c.style.setProperty(n,u);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(n,a);l("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(n,r?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])l(n,r?"0 0 0":"255 255 255");l("--vs-color",a),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class N extends HTMLElement{static observedAttributes=["items","active","side","size","tone","reach","magnify","stiffness","damping","stagger","lag","blur","squash","block","disabled","color"];#u;#r;#c;#b;#S;#F=[];#M;#e=[];#s=[];#A=null;#G="";#a=new x(260,17);#d=new x(260,17);#n=new x(300,20);#v=new m(220,20);#p=new m(420,22);#o=[];#t={pitch:0,first:0,railH:0,padY:14,bodyMin:32,hotW:0};#g=-1;#x=null;#i=0;#y=0;#C=0;#f=!1;#O=!1;#J=!1;#m=0;#k=0;#N=0;#T=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=F,this.#u=document.createElement("div"),this.#u.className="rail",this.#r=document.createElement("div"),this.#r.className="rail__track",this.#r.setAttribute("role","toolbar"),this.#r.setAttribute("aria-orientation","vertical"),this.#r.setAttribute("aria-label","Timeline"),this.#c=document.createElement("div"),this.#c.className="rail__card";const i=document.createElement("div");i.className="rail__bg",this.#M=document.createElement("span"),this.#M.className="fx-ripples",this.#b=document.createElement("div"),this.#b.className="rail__inner";const s=document.createElement("div");s.className="rail__body";for(let r=0;r<2;r++){const a=document.createElement("div");a.className="rail__layer";const h=document.createElement("span");h.className="rail__idx";const l=document.createElement("span");l.className="rail__title";const n=document.createElement("span");n.className="rail__text",a.append(h,l,n),s.appendChild(a),this.#F.push({layer:a,idx:h,title:l,text:n})}this.#S=s,this.#b.appendChild(s),this.#c.append(i,this.#M,this.#b),this.#u.append(this.#r,this.#c),t.append(e,this.#u)}set items(t){Array.isArray(t)&&(this.#A=t,this.#R())}get items(){return this.#e.slice()}set active(t){this.#E(o(Math.round(+t||0),0,Math.max(0,this.#e.length-1)),!1)}get active(){return this.#i}#h(t,e){const i=parseFloat(this.getAttribute(t));return Number.isFinite(i)?i:e}#w(t){return this.hasAttribute(t)?this.getAttribute(t)!=="false":!1}get#at(){return o(this.#h("reach",34),10,260)}get#nt(){return o(this.#h("magnify",1.4),0,4)}get#ot(){return o(this.#h("stiffness",260),40,900)}get#ht(){return o(this.#h("damping",17),4,60)}get#lt(){return o(this.#h("stagger",16),0,90)}get#ct(){return o(this.#h("lag",.45),0,.9)}get#dt(){return o(this.#h("blur",5),0,24)}get#pt(){return o(this.#h("squash",.045),0,.12)}get#W(){return this.getAttribute("side")==="left"}get#ft(){return .7}#ut(){if(this.#A)return this.#A.map(i=>typeof i=="string"?{label:i,detail:""}:{label:String(i.label??""),detail:String(i.detail??""),value:i.value});const t=this.getAttribute("items");return(t==null||t.trim()===""?M:t).split(",").map(i=>i.trim()).filter(Boolean).map(i=>{const s=i.indexOf("|");return s<0?{label:i,detail:""}:{label:i.slice(0,s).trim(),detail:i.slice(s+1).trim()}})}#gt(t,e){const i=t.label.length+t.detail.length*.35||8,s=e*37%11/11;return o((i-10)/46+s*.22,0,1)}#R(){const t=this.#ut(),e=JSON.stringify(t);if(!(e===this.#G&&this.#s.length)){this.#G=e,this.#e=t;for(const i of this.#s)i.btn.remove();this.#s=[],t.forEach((i,s)=>{const r=document.createElement("button");r.type="button",r.className="rail__tick",r.tabIndex=-1,r.setAttribute("aria-label",i.label);const a=document.createElement("span");a.className="rail__bar";const h=document.createElement("span");h.className="rail__bar rail__bar--hot",r.append(a,h),r.addEventListener("pointerdown",l=>this.#xt(s,l)),r.addEventListener("pointerup",this.#V),r.addEventListener("click",()=>this.#wt(s)),r.addEventListener("focus",()=>this.#yt(s)),this.#r.appendChild(r),this.#s.push({btn:r,bar:a,hot:h,w:0})}),this.#i=o(Math.round(this.#h("active",0)),0,Math.max(0,t.length-1)),this.#y=this.#i,this.#B(),this.#H(),this.#j(this.#i,!0),this.#_(),this.#Y()}}#H(){const t=getComputedStyle(this),e=parseFloat(t.getPropertyValue("--w-min"))||10,i=parseFloat(t.getPropertyValue("--w-max"))||27;this.#e.forEach((s,r)=>{const a=e+(i-e)*this.#gt(s,r);this.#s[r].w=a,this.#s[r].btn.style.width=`${a.toFixed(2)}px`}),this.#t.hotW=i*(1+this.#nt),this.#u.style.setProperty("--hot-w",`${this.#t.hotW.toFixed(2)}px`)}#_(){const t=this.#w("disabled");this.#s.forEach((e,i)=>{e.btn.disabled=t,e.btn.tabIndex=i===this.#y?0:-1,e.btn.setAttribute("aria-current",i===this.#i?"true":"false")})}#j(t,e=!1){const i=this.#e[t];if(!i)return;const s=e?this.#C:1-this.#C,r=this.#F[s],a=this.#F[1-s];r.idx.textContent=String(t+1).padStart(2,"0"),r.title.textContent=i.label,r.text.textContent=i.detail,e||v()?(r.layer.classList.remove("is-out"),r.layer.classList.add("is-in"),a.layer.classList.remove("is-in","is-out")):(a.layer.classList.remove("is-in"),a.layer.classList.add("is-out"),r.layer.classList.remove("is-out"),r.layer.classList.add("is-in")),this.#C=s,this.#P(e)}#P(t=!1){const e=this.#F[this.#C]?.layer;if(!e||!this.#S)return;const i=Math.max(this.#t.bodyMin,e.offsetHeight);this.#n.target=i,t&&(this.#n.snap(),this.#S.style.height=`${i}px`)}#B(){const t=this.#ot,e=this.#ht,i=this.#ct;this.#d.k=t,this.#d.d=e,this.#n.k=t*1.15,this.#n.d=e*1.15,this.#a.k=t*(1-i*.62),this.#a.d=e*(1-i*.3);const s=[];for(let r=0;r<this.#e.length;r++){const a=this.#o[r]??new m(t,e);a.k=t*(1+r*29%7*.012),a.d=e*(1-r*13%5*.015),s.push(a)}this.#o=s}#K(){if(!this.#s.length)return;const t=getComputedStyle(this.#s[0].btn),e=parseFloat(t.height)||4,i=parseFloat(getComputedStyle(this.#r).rowGap)||0;this.#t.pitch=e+i,this.#t.first=e/2,this.#t.railH=this.#e.length*e+Math.max(0,this.#e.length-1)*i;const s=getComputedStyle(this.#b);this.#t.padY=(parseFloat(s.paddingTop)||0)+(parseFloat(s.paddingBottom)||0),this.#t.bodyMin=parseFloat(getComputedStyle(this).getPropertyValue("--body-min"))||32,this.#x=null}#X(t){return this.#t.first+t*this.#t.pitch}get#mt(){return this.#t.padY+this.#n.x}#U(t){const e=this.#t.railH,i=this.#mt,s=this.#X(t)-i/2;return i>=e?(e-i)/2:o(s,-18,e-i+18)}#Q(t){if(this.#g<0)return t===this.#i?this.#ft:0;const e=(this.#g-this.#X(t))/this.#at;return Math.exp(-e*e*2.6)}#bt(t){return this.#t.pitch?o(Math.round((t-this.#t.first)/this.#t.pitch),0,this.#e.length-1):0}#D(){const t=v(),e=t?0:this.#dt,i=t?0:this.#pt,s=this.#W?-1:1,r=this.#p.x;for(let g=0;g<this.#s.length;g++){const d=this.#s[g],b=this.#o[g];if(!d||!b)continue;const p=b.x,_=1+(this.#t.hotW/d.w-1)*p,E=s*(p*3-r*2*o(p,0,1));d.btn.style.transform=`translate3d(${E.toFixed(2)}px,0,0) scaleX(${_.toFixed(3)})`,d.btn.style.opacity=(.32+.52*o(p,0,1)).toFixed(3),d.hot.style.opacity=o(p*p,0,1).toFixed(3);const w=Math.min(e*.34,Math.abs(b.v)*.7);d.btn.style.filter=w>.05?`blur(${w.toFixed(2)}px)`:""}this.#S.style.height=`${this.#n.x.toFixed(2)}px`;const a=o(this.#v.x,0,1.3),h=this.#a.x,l=(this.#d.x-h)*.6,n=o(this.#a.v*i*.004,-.09,.09),u=.976+.024*o(a,0,1)-r*.014;this.#c.style.transform=`translate3d(0,${h.toFixed(2)}px,0) scale(${(u*(1-n*.5)).toFixed(4)},${(u*(1+n)).toFixed(4)})`;const y=Math.min(e,Math.abs(this.#a.v)*.014);this.#c.style.filter=y>.05?`blur(${y.toFixed(2)}px)`:"",this.#c.style.opacity=(.8+.2*o(a,0,1)).toFixed(3),this.#c.style.setProperty("--e",o(a,0,1).toFixed(3)),this.#b.style.transform=`translate3d(0,${l.toFixed(2)}px,0)`}#vt(t){const e=this.#lt;return e<=0?0:Math.abs(t-this.#i)*e}#Z=t=>{const e=Math.min(.032,this.#k?(t-this.#k)/1e3:.016666666666666666);this.#k=t,this.#N+=e*1e3;const i=this.#U(this.#i);this.#a.target=i,this.#d.target=i,this.#v.target=this.#f?1:0;let s=0;for(let a=0;a<this.#o.length;a++){const h=this.#vt(a);h>s&&(s=h),this.#N>=h&&(this.#o[a].target=this.#Q(a))}this.#n.step(e),this.#a.step(e),this.#d.step(e),this.#v.step(e),this.#p.step(e);for(const a of this.#o)a.step(e);this.#D(),this.#N>=s&&this.#n.settled&&this.#a.settled&&this.#d.settled&&this.#v.settled&&this.#p.settled&&this.#o.every(a=>a.settled)?(this.#q(),this.#tt()):this.#m=requestAnimationFrame(this.#Z)};#l(t=!1){if(v()){this.#et();return}t&&(this.#N=0),!this.#m&&(this.#k=0,this.#m=requestAnimationFrame(this.#Z))}#q(){this.#m&&cancelAnimationFrame(this.#m),this.#m=0,this.#k=0}#tt(){this.#n.snap(),this.#a.snap(),this.#d.snap(),this.#v.snap(),this.#p.snap();for(const t of this.#o)t.snap();this.#D()}#et(){this.#q(),this.#n.snap();const t=this.#U(this.#i);this.#a.target=t,this.#d.target=t,this.#v.target=this.#f?1:0,this.#p.target=0;for(let e=0;e<this.#o.length;e++)this.#o[e].target=this.#Q(e);this.#tt()}#Y(){this.#K(),this.#P(!0),this.#et()}#E(t,e=!0){const i=o(t,0,Math.max(0,this.#e.length-1));if(i!==this.#i){if(this.#i=i,this.#j(i),this.#_(),e){const s=this.#e[i];this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{index:i,label:s?.label??"",detail:s?.detail??""}}))}this.#l(!0)}}#$=t=>{this.#w("disabled")||(this.#f=!0,this.#x=this.#r.getBoundingClientRect(),this.#L(t))};#L=t=>{if(this.#w("disabled"))return;this.#x||(this.#x=this.#r.getBoundingClientRect());const e=this.#x;if(this.#W?t.clientX<e.left-26:t.clientX>e.right+26){this.#f=!0,this.#l();return}this.#g=t.clientY-e.top,this.#f=!0;const i=this.#bt(this.#g);i!==this.#i?this.#E(i):this.#l()};#z=()=>{this.#g=-1,this.#O||(this.#f=!1),this.#p.target=0,this.#l()};#xt(t,e){this.#w("disabled")||(this.#p.target=1,S(this.#c,this.#M,e,{tilt:!1}),t!==this.#i?this.#E(t):this.#l())}#V=()=>{this.#p.target=0,this.#l()};#yt(t){this.#O=!0,this.#f=!0,this.#y=t,t!==this.#i?this.#E(t):(this.#_(),this.#l())}#it=t=>{this.shadowRoot.contains(t.relatedTarget)||(this.#O=!1,this.#g<0&&(this.#f=!1),this.#l())};#st=t=>{if(this.#w("disabled")||!this.#e.length)return;const e=this.#e.length;let i=null;t.key==="ArrowDown"||t.key==="ArrowRight"?i=Math.min(e-1,this.#y+1):t.key==="ArrowUp"||t.key==="ArrowLeft"?i=Math.max(0,this.#y-1):t.key==="Home"?i=0:t.key==="End"&&(i=e-1),i!=null&&(t.preventDefault(),this.#y=i,this.#_(),this.#s[i]?.btn.focus())};#wt(t){if(this.#w("disabled"))return;const e=this.#e[t];this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{index:t,label:e?.label??"",value:e?.value??e?.label??""}}))}connectedCallback(){k(this,this.getAttribute("color")),this.addEventListener("pointerenter",this.#$,{passive:!0}),this.addEventListener("pointermove",this.#L,{passive:!0}),this.addEventListener("pointerleave",this.#z,{passive:!0}),this.addEventListener("pointercancel",this.#V,{passive:!0}),this.addEventListener("mouseenter",this.#$,{passive:!0}),this.addEventListener("mousemove",this.#L,{passive:!0}),this.addEventListener("mouseleave",this.#z,{passive:!0}),this.addEventListener("keydown",this.#st),this.addEventListener("focusout",this.#it),this.#R(),this.#Y(),this.#J=!0,this.#u.classList.add("rail--ready"),document.fonts?.ready?.then(()=>this.#rt()).catch(()=>{}),typeof ResizeObserver<"u"&&(this.#T=new ResizeObserver(()=>this.#rt()),this.#T.observe(this.#r)),addEventListener("scroll",this.#I,{passive:!0,capture:!0}),addEventListener("resize",this.#I,{passive:!0})}disconnectedCallback(){this.#q(),this.#T?.disconnect(),this.#T=null,this.removeEventListener("pointerenter",this.#$),this.removeEventListener("pointermove",this.#L),this.removeEventListener("pointerleave",this.#z),this.removeEventListener("pointercancel",this.#V),this.removeEventListener("mouseenter",this.#$),this.removeEventListener("mousemove",this.#L),this.removeEventListener("mouseleave",this.#z),this.removeEventListener("keydown",this.#st),this.removeEventListener("focusout",this.#it),removeEventListener("scroll",this.#I,{capture:!0}),removeEventListener("resize",this.#I)}#I=()=>{this.#x=null};#rt(){this.isConnected&&(this.#K(),this.#P(!0),this.#m||this.#D())}attributeChangedCallback(t,e,i){if(k(this,this.getAttribute("color")),!(!this.#u||e===i)){if(t==="items"){this.#A=null,this.#R();return}if(t==="active"){const s=o(Math.round(this.#h("active",0)),0,Math.max(0,this.#e.length-1));s!==this.#i&&this.#g<0&&this.#E(s,!1);return}if(t==="stiffness"||t==="damping"||t==="lag"){this.#B();return}if(t==="magnify"){this.#H(),this.#l();return}if(t==="reach"||t==="stagger"){this.#l(!0);return}if(t==="size"||t==="side"){this.#B(),this.#H(),this.#J&&this.#Y();return}this.#_()}}}customElements.define("vs-tick-rail",N);
