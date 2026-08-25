const v=`
  :host { display: inline-flex; max-width: 100%; }
  :host([block]) { display: flex; width: 100%; }

  .sto {
    --sto-w: 380px;
    --sto-dot: 3px;
    --sto-stop: 9px;
    --sto-hw: 10px;
    --sto-hh: 26px;
    --sto-sw: 3px;
    --sto-fs: 13px;
    --accent: var(--ui-accent, #ededed);
    --accent-fg: var(--ui-accent-fg, #0b0b0b);
    box-sizing: border-box;
    width: var(--sto-w);
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px 20px 18px;
    border-radius: var(--ctrl-r-lg, 14px);
    background: var(--bg-elevated, #111111);
    border: 1px solid var(--border, #1f1f1f);
    font-family: inherit;
    color: var(--text, #ededed);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .sto--sm { --sto-w: 300px; --sto-stop: 8px; --sto-hw: 9px; --sto-hh: 22px; --sto-sw: 2.5px; --sto-fs: 12px; padding: 12px 16px 15px; }
  .sto--lg { --sto-w: 460px; --sto-stop: 10px; --sto-hw: 12px; --sto-hh: 30px; --sto-sw: 3.5px; --sto-fs: 14px; padding: 16px 24px 21px; }
  .sto--block { width: 100%; }
  .sto--bare { background: transparent; border-color: transparent; padding: 0; }

  /* ── named stops ───────────────────────────────────────────────── */
  .sto__labels { position: relative; height: 28px; }
  .sto__label {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    border: 0;
    appearance: none;
    font: inherit;
    font-size: var(--sto-fs);
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: -0.01em;
    white-space: nowrap;
    padding: 4px 12px;
    border-radius: var(--ctrl-r-full, 999px);
    cursor: pointer;
    will-change: transform;
    /* --pp is written by the spring loop as a percentage string ("42.0%") */
    color: color-mix(in srgb, var(--accent-fg) var(--pp, 0%), var(--text-secondary, #a1a1a1));
    background: color-mix(in srgb, var(--accent) var(--pp, 0%), transparent);
  }
  .sto__label:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--accent) 80%, transparent);
    outline-offset: 2px;
  }

  /* ── dotted track ──────────────────────────────────────────────── */
  .sto__track {
    position: relative;
    height: 28px;
    cursor: pointer;
    touch-action: none;
    outline: none;
    border-radius: var(--ctrl-r-sm, 6px);
  }
  .sto__track:active { cursor: grabbing; }
  .sto__track:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--accent) 80%, transparent);
    outline-offset: 5px;
  }

  .sto__dot {
    position: absolute;
    top: 50%;
    width: var(--sto-dot);
    height: var(--sto-dot);
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--border-hover, #333333);
    transform: translate(-50%, -50%);
  }

  .sto__stop {
    position: absolute;
    top: 50%;
    width: var(--sto-stop);
    height: var(--sto-stop);
    box-sizing: border-box;
    border-radius: var(--ctrl-r-full, 999px);
    border: 1px solid color-mix(in srgb, var(--accent) var(--pp, 0%), var(--border-hover, #333333));
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sto__stop::after {
    content: '';
    width: 3px;
    height: 3px;
    border-radius: var(--ctrl-r-full, 999px);
    background: color-mix(in srgb, var(--accent) var(--pp, 0%), var(--border-hover, #333333));
  }

  /* full-width rail: translateX(p%) of itself == p% of the track */
  .sto__rail {
    position: absolute;
    inset: 0;
    pointer-events: none;
    will-change: transform, filter;
  }
  .sto__handle {
    position: absolute;
    left: 0;
    top: 50%;
    width: var(--sto-hw);
    height: var(--sto-hh);
    box-sizing: border-box;
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--accent);
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.28);
    will-change: transform;
  }
  .sto__slot {
    width: var(--sto-sw, 3px);
    height: 34%;
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--accent-fg);
    opacity: 0.92;
    will-change: transform;
  }

  .sto__ripple {
    position: absolute;
    top: 50%;
    width: 8px;
    height: 8px;
    border-radius: var(--ctrl-r-full, 999px);
    background: rgb(var(--ui-ring, 255 255 255) / 0.35);
    transform: translate(-50%, -50%);
    pointer-events: none;
    animation: sto-rip 520ms ease-out forwards;
  }
  @keyframes sto-rip {
    from { opacity: 0.45; transform: translate(-50%, -50%) scale(1); }
    to { opacity: 0; transform: translate(-50%, -50%) scale(6); }
  }

  .sto--t-danger { --accent: #ff6369; --accent-fg: #ffffff; }
  .sto--t-warn { --accent: #ffb224; --accent-fg: #160f02; }
  .sto--t-success { --accent: #4cc38a; --accent-fg: #06120c; }

  .is-disabled { opacity: 0.45; }
  .is-disabled .sto__track { cursor: not-allowed; pointer-events: none; }
  .is-disabled .sto__label { cursor: not-allowed; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .sto__ripple { display: none; }
  }
`;class d{x=0;v=0;target=0;constructor(t,s){this.k=t,this.d=s}step(t){const s=t/2;for(let e=0;e<2;e++){const i=-this.k*(this.x-this.target)-this.d*this.v;this.v+=i*s,this.x+=this.v*s}}get settled(){return Math.abs(this.v)<.002&&Math.abs(this.x-this.target)<.002}snap(){this.x=this.target,this.v=0}}let p;function x(c){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=c;const t=p.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const s=t.match(/[\d.]+/g);return s&&s.length>=3?[+s[0],+s[1],+s[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(c,t){const s=t?x(String(t).trim()):null;if(!s){for(const o of y)c.style.removeProperty(o);return}const e=o=>(o/=255,o<=.03928?o/12.92:((o+.055)/1.055)**2.4),r=.2126*e(s[0])+.7152*e(s[1])+.0722*e(s[2])>.45,n=`rgb(${s[0]} ${s[1]} ${s[2]})`,h=s.map(o=>Math.round(r?o*.92:o+(255-o)*.16)),a=(o,u)=>c.style.setProperty(o,u);for(const o of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(o,n);a("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const o of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(o,s.join(" "));for(const o of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(o,r?"#0b0b0b":"#ffffff");for(const o of["--btn-primary-rip","--btn-primary-glow"])a(o,r?"0 0 0":"255 255 255");a("--vs-color",n),a("--vs-color-rgb",s.join(" ")),a("--vs-color-fg",r?"#0b0b0b":"#ffffff")}const l=(c,t,s)=>Math.min(s,Math.max(t,c));class w extends HTMLElement{static observedAttributes=["value","default-value","min","max","stops","snap","threshold","dot-count","size","tone","disabled","block","bare","color","stiffness","damping","lag","blur","squash"];#s=50;#g=null;#c=!1;#w;#k;#t;#a;#v;#A;#u=[];#E=[];#L=[];#C=null;#e=[];#$="";#T="";#h=new d(260,17);#p=new d(260,17);#n=[];#P=0;#I=10;#S=null;#d=0;#F=0;#N=!1;#x=0;#U=0;#_=null;#f=null;constructor(){super();const t=this.attachShadow({mode:"open"}),s=document.createElement("style");s.textContent=v,this.#w=document.createElement("div"),this.#w.className="sto",this.#k=document.createElement("div"),this.#k.className="sto__labels",this.#t=document.createElement("div"),this.#t.className="sto__track",this.#t.setAttribute("role","slider"),this.#t.setAttribute("tabindex","0"),this.#a=document.createElement("div"),this.#a.className="sto__rail",this.#v=document.createElement("div"),this.#v.className="sto__handle",this.#A=document.createElement("span"),this.#A.className="sto__slot",this.#v.appendChild(this.#A),this.#a.appendChild(this.#v),this.#t.appendChild(this.#a),this.#w.append(this.#k,this.#t),t.append(s,this.#w),this.#t.addEventListener("pointerdown",this.#ut),this.#t.addEventListener("keydown",this.#ct)}connectedCallback(){b(this,this.getAttribute("color")),this.#c=!0;const t=this.hasAttribute("value")?this.#i("value",50):this.#i("default-value",50);this.#s=this.#b(t),this.#g=this.#s,this.#G(),typeof ResizeObserver=="function"&&(this.#S=new ResizeObserver(()=>{this.#G(),this.#O()}),this.#S.observe(this.#t)),this.#X(!0)}disconnectedCallback(){this.#c=!1,this.#st(),this.#Z(),this.#S?.disconnect(),this.#S=null}attributeChangedCallback(t,s,e){if(b(this,this.getAttribute("color")),!(!this.#c||s===e)){if(t==="value"){if(e===null)this.#s=this.#b(this.#i("default-value",this.#s));else{if(this.#g!==null&&Number(e)===this.#g)return;this.#s=this.#b(this.#i("value",50))}this.#g=this.#s}else t==="default-value"&&!this.hasAttribute("value")&&(this.#s=this.#b(this.#i("default-value",this.#s)),this.#g=this.#s);this.#X(!1)}}get value(){return this.#s}set value(t){this.setAttribute("value",String(t))}get stops(){return(this.#c?this.#e:this.#V()).map(t=>({...t}))}set stops(t){this.#C=Array.isArray(t)&&t.length?t.slice():null,this.#c&&this.#X(!1)}#i(t,s){const e=parseFloat(this.getAttribute(t));return Number.isFinite(e)?e:s}get#r(){return this.#i("min",0)}get#y(){return this.#i("max",100)}get#l(){return this.hasAttribute("disabled")}get#z(){return this.hasAttribute("snap")&&this.getAttribute("snap")!=="false"}get#it(){return l(this.#i("threshold",6),0,50)}get#W(){return l(Math.round(this.#i("dot-count",41)),5,81)}get#B(){return l(this.#i("stiffness",260),20,1200)}get#R(){return l(this.#i("damping",17),2,120)}get#rt(){return l(this.#i("lag",.45),0,1)}get#nt(){return l(this.#i("blur",5),0,14)}get#ot(){return l(this.#i("squash",.045),0,.12)}get#j(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}#b(t){return l(t,this.#r,this.#y)}#m(){const t=this.#y-this.#r;return t===0?1:t}#M(t){return l((t-this.#r)/this.#m(),0,1)}#H(){return this.#it/100*this.#m()}#V(){if(this.#C){const i=this.#C.length;return this.#C.map((r,n)=>{const h=String(typeof r=="string"?r:r&&r.label||""),a=typeof r=="object"&&r?r.value:void 0,o=Number.isFinite(Number(a))&&a!==""&&a!==null&&a!==void 0?Number(a):this.#r+(i<=1?0:n/(i-1)*this.#m());return{label:h,value:this.#b(o)}})}const s=(this.getAttribute("stops")??"Minimalist, Standard, Comfort").split(",").map(i=>i.trim()).filter(Boolean),e=s.length;return s.map((i,r)=>{const n=i.lastIndexOf(":");let h=i,a=null;if(n>0){const o=Number(i.slice(n+1).trim());Number.isFinite(o)&&(h=i.slice(0,n).trim(),a=o)}return a===null&&(a=this.#r+(e<=1?0:r/(e-1)*this.#m())),{label:h,value:this.#b(a)}})}#q(t){const s=this.#H();let e=-1,i=1/0;for(let r=0;r<this.#e.length;r++){const n=Math.abs(t-this.#e[r].value);n<=s&&n<i&&(e=r,i=n)}return e}#at(){for(const e of this.#u)e.remove();for(const e of this.#E)e.remove();this.#u=[],this.#E=[],this.#n=[];const t=this.#B,s=this.#R;for(let e=0;e<this.#e.length;e++){const i=this.#e[e],r=this.#M(i.value)*100,n=document.createElement("button");n.type="button",n.className="sto__label",n.textContent=i.label,n.style.left=r+"%",n.style.transformOrigin=r+"% 50%",n.addEventListener("click",()=>this.#lt(e)),this.#k.appendChild(n),this.#u.push(n);const h=document.createElement("span");h.className="sto__stop",h.setAttribute("aria-hidden","true"),h.style.left=r+"%",this.#t.insertBefore(h,this.#a),this.#E.push(h),this.#n.push(new d(t*(1+e*.04),s))}}#ht(){for(const i of this.#L)i.remove();this.#L=[];const t=this.#W,s=100/(t-1),e=this.#e.map(i=>this.#M(i.value)*100);for(let i=0;i<t;i++){const r=i/(t-1)*100;if(e.some(h=>Math.abs(h-r)<s*.9))continue;const n=document.createElement("span");n.className="sto__dot",n.setAttribute("aria-hidden","true"),n.style.left=r+"%",this.#t.insertBefore(n,this.#a),this.#L.push(n)}}#G(){const t=getComputedStyle(this.#t),s=parseFloat(t.width);Number.isFinite(s)&&s>0&&(this.#P=s);const e=parseFloat(getComputedStyle(this.#v).width);Number.isFinite(e)&&e>0&&(this.#I=e)}#X(t){const s=(r,n)=>this.getAttribute(r)??n;this.#w.className="sto sto--"+s("size","md")+" sto--t-"+s("tone","default")+(this.#l?" is-disabled":"")+(this.hasAttribute("block")?" sto--block":"")+(this.hasAttribute("bare")?" sto--bare":""),this.#e=this.#V();const e=this.#e.map(r=>r.label+"@"+r.value).join("|")+"#"+this.#B+"/"+this.#R;e!==this.#$&&(this.#$=e,this.#at());const i=this.#W+"#"+this.#e.map(r=>r.value).join(",")+"#"+this.#r+"/"+this.#y;i!==this.#T&&(this.#T=i,this.#ht()),this.#t.setAttribute("tabindex",this.#l?"-1":"0"),this.#l?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled");for(const r of this.#u)r.disabled=this.#l;this.#J(),t||this.#j?this.#K():this.#tt(),this.#Q()}#J(){const t=this.#B,s=this.#R,e=this.#rt;this.#h.k=t,this.#h.d=s,this.#p.k=t*(1-e*.62),this.#p.d=s*(1-e*.3);const i=this.#M(this.#s);this.#h.target=i,this.#p.target=i;const r=this.#q(this.#s);for(let n=0;n<this.#n.length;n++)this.#n[n].target=n===r?1:0}#Q(){const t=this.#q(this.#s),s=Math.round(this.#s*100)/100;this.#t.setAttribute("aria-valuemin",String(this.#r)),this.#t.setAttribute("aria-valuemax",String(this.#y)),this.#t.setAttribute("aria-valuenow",String(s)),this.#t.setAttribute("aria-valuetext",t>=0?this.#e[t].label:String(s))}#o(t,s=!0){let e=this.#b(t);if(this.#z){const n=this.#H();let h=null,a=1/0;for(const o of this.#e){const u=Math.abs(e-o.value);u<=n&&u<a&&(h=o.value,a=u)}h!==null&&(e=h)}if(this.#l||e===this.#s||(this.#s=e,this.#g=e,this.setAttribute("value",String(e)),this.#J(),this.#Q(),this.#j?this.#K():this.#tt(),!s))return;const i=this.#q(e),r={value:e,index:i,stop:i>=0?this.#e[i].label:null};this.dispatchEvent(new CustomEvent("input",{bubbles:!0,composed:!0,detail:r})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:r}))}#lt(t){this.#l||!this.#e[t]||this.#o(this.#e[t].value)}#ct=t=>{if(this.#l)return;const s=this.#m()/100,e=t.key;e==="ArrowRight"||e==="ArrowUp"?(t.preventDefault(),this.#o(this.#z?this.#D(1):this.#s+s)):e==="ArrowLeft"||e==="ArrowDown"?(t.preventDefault(),this.#o(this.#z?this.#D(-1):this.#s-s)):e==="PageUp"?(t.preventDefault(),this.#o(this.#D(1))):e==="PageDown"?(t.preventDefault(),this.#o(this.#D(-1))):e==="Home"?(t.preventDefault(),this.#o(this.#r)):e==="End"&&(t.preventDefault(),this.#o(this.#y))};#D(t){const s=this.#m()*.001;let e=null;for(const i of this.#e)t>0&&i.value>this.#s+s&&(e===null||i.value<e)&&(e=i.value),t<0&&i.value<this.#s-s&&(e===null||i.value>e)&&(e=i.value);return e===null?t>0?this.#y:this.#r:e}#Y(t){const s=this.#t.getBoundingClientRect();if(!s.width)return this.#s;const e=l((t-s.left)/s.width,0,1);return this.#r+e*this.#m()}#ut=t=>{if(!this.#l){this.#N=!0,this.#ft(t.clientX);try{this.#t.setPointerCapture?.(t.pointerId)}catch{}this.#o(this.#Y(t.clientX)),this.#_=s=>this.#pt(s),this.#f=s=>this.#dt(s,t.pointerId),document.addEventListener("pointermove",this.#_,{passive:!0}),document.addEventListener("pointerup",this.#f),document.addEventListener("pointercancel",this.#f)}};#pt(t){this.#N&&(this.#U=t.clientX,!this.#x&&(this.#x=requestAnimationFrame(()=>{this.#x=0,!(!this.#N||!this.#c)&&this.#o(this.#Y(this.#U))})))}#dt(t,s){try{this.#t.releasePointerCapture?.(s)}catch{}this.#Z()}#Z(){this.#x&&(cancelAnimationFrame(this.#x),this.#x=0),this.#_&&(document.removeEventListener("pointermove",this.#_),this.#_=null),this.#f&&(document.removeEventListener("pointerup",this.#f),document.removeEventListener("pointercancel",this.#f),this.#f=null),this.#N=!1}#ft(t){if(this.#j)return;const s=this.#t.getBoundingClientRect();if(!s.width)return;const e=document.createElement("span");e.className="sto__ripple",e.style.left=l((t-s.left)/s.width*100,0,100)+"%",e.addEventListener("animationend",()=>e.remove()),this.#t.appendChild(e)}#tt(){this.#d||(this.#F=0,this.#d=requestAnimationFrame(this.#et))}#st(){this.#d&&(cancelAnimationFrame(this.#d),this.#d=0)}#K(){this.#st(),this.#h.snap(),this.#p.snap();for(const t of this.#n)t.snap();this.#O()}#et=t=>{if(this.#d=0,!this.#c)return;const s=Math.min(.032,this.#F?(t-this.#F)/1e3:1/60);this.#F=t,this.#h.step(s),this.#p.step(s);for(const i of this.#n)i.step(s);this.#O(),this.#h.settled&&this.#p.settled&&this.#n.every(i=>i.settled)?this.#K():this.#d=requestAnimationFrame(this.#et)};#O(){const t=this.#h.x,s=this.#p.x;this.#a.style.transform="translate3d("+(s*100).toFixed(3)+"%,0,0)";const e=this.#h.v,i=l(e*this.#ot,-.3,.3),r=l(1+i,.5,1.8),n=l(1-i*.62,.5,1.8);this.#v.style.transform="translate(-50%,-50%) scale("+r.toFixed(3)+","+n.toFixed(3)+")";const h=l((t-s)*this.#P,-this.#I*.45,this.#I*.45);this.#A.style.transform=Math.abs(h)>.05?"translate3d("+h.toFixed(2)+"px,0,0)":"";const a=Math.min(this.#nt,Math.abs(e)*this.#P*.004);this.#a.style.filter=a>.05?"blur("+a.toFixed(2)+"px)":"";for(let o=0;o<this.#n.length;o++){const u=this.#n[o].x,f=(l(u,0,1)*100).toFixed(1)+"%";this.#u[o]?.style.setProperty("--pp",f),this.#E[o]?.style.setProperty("--pp",f);const m=1+.055*u,g=this.#M(this.#e[o].value)*100;this.#u[o]&&(this.#u[o].style.transform="translateX("+(-g).toFixed(3)+"%) scale("+m.toFixed(4)+")")}}}customElements.define("vs-slider-stops",w);
