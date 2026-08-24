import{FX_CSS as M,attachGlow as p}from"./vs-fx.CLXiCjCI.js";const x=50,_={accent:"var(--ui-accent, #ededed)",success:"#30d158",danger:"#ff453a",warn:"#ff9f0a",neutral:"#ededed"},y=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;function S(g,t){const e=g/t;return 2*(1/(1+Math.exp(-e))-.5)*t}const C=`
  :host { display: inline-flex; }
${M}
.vsl {
  --w: 192px;
  --gap: 16px;
  --icon-fs: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: var(--w);
  font-family: inherit;
  color: var(--text, #ededed);
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.vsl--sm { --w: 150px; --gap: 12px; --icon-fs: 15px; }
.vsl--lg { --w: 240px; --gap: 18px; --icon-fs: 21px; }

.vsl__value {
  margin: 0;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--text-secondary, #a1a1a1);
}

.vsl__row {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: var(--gap);
  touch-action: none;
  transition: scale 200ms var(--ease-out, ease), opacity 200ms var(--ease-out, ease);
}

.vsl__icon {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-fs);
  height: var(--icon-fs);
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  font-size: var(--icon-fs);
  line-height: 1;
  /* the cursor is a light: --glow (0→1 by proximity) raises the glyph from muted to text */
  --glow: 0;
  color: color-mix(
    in srgb,
    var(--text, #ededed) calc(var(--glow) * 80% + 20%),
    var(--text-secondary, #a1a1a1)
  );
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 200ms var(--ease-out, ease), color 160ms ease;
}
.vsl__icon:hover:not(:disabled) { color: var(--text, #ededed); }
.vsl__icon:active:not(:disabled) { transform: scale(0.85); }
.vsl__icon:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--accent) 80%, #fff);
  outline-offset: 3px;
  border-radius: 6px;
}
.vsl__icon:disabled { cursor: not-allowed; }

.vsl__track-area {
  position: relative;
  display: flex;
  flex-grow: 1;
  align-items: center;
  padding: 16px 0;
  cursor: grab;
  touch-action: none;
  outline: none;
}
.vsl__track-area:active { cursor: grabbing; }
.vsl__track-area:focus-visible .vsl__track {
  outline: 2px solid color-mix(in srgb, var(--accent) 80%, #fff);
  outline-offset: 4px;
}

.vsl__track-wrap {
  display: flex;
  flex-grow: 1;
  will-change: transform;
}

.vsl__track {
  position: relative;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
  border-radius: 999px;
  background: var(--sw-off, #39393d);
}

.vsl__glow { --glow-strength: 0.5; border-radius: 999px; }

.vsl__fill {
  position: absolute;
  inset: 0 auto 0 0;
  height: 100%;
  border-radius: 999px;
  background: var(--accent, var(--ui-accent, #ededed));
}

/* ghost bar: neutral shadow (not accent), behind the fill, chases with a lag */
.vsl__ghost {
  position: absolute;
  inset: 0 auto 0 0;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    rgb(var(--fx-tint, 255 255 255) / 0) 0%,
    rgb(var(--fx-tint, 255 255 255) / 0.3) 30%,
    rgb(var(--fx-tint, 255 255 255) / 0.3) 70%,
    rgb(var(--fx-tint, 255 255 255) / 0) 100%
  );
}

.is-disabled { cursor: not-allowed; opacity: 0.45; }
.is-disabled .vsl__track-area { cursor: not-allowed; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .vsl__row,
  .vsl__icon { transition: none; }
}
`;class F extends HTMLElement{static observedAttributes=["value","default-value","min","max","stepped","step-size","size","tone","color","disabled","show-value","ghost","left-icon","right-icon","glow"];#f;#p;#i;#s;#n;#k;#L;#t;#r;#M;#S;#x;#_;#e=50;#g=null;#P=!1;#d="middle";#H=0;#y={value:0};#q={value:1};#B={value:1};#G={value:1};#C=0;#E=null;#b=0;#w=0;#z=0;#o=new Set;#F=new Set;#V=()=>this.#nt(-1);#j=()=>this.#nt(1);#U=t=>this.#lt(t);#K=t=>this.#ct(t);#N=()=>this.#dt();#W=t=>this.#vt(t);#R=()=>this.#ut();#$=()=>this.#mt();#Y=()=>{this.#E=null};#J=()=>{const t=this.#T()-this.#C;this.#C+=t*.12,this.#x.style.width=`${this.#C}%`,this.#z=requestAnimationFrame(this.#J)};#Q;#Z;#tt;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=C,this.#f=document.createElement("div"),this.#f.className="vsl",this.#p=document.createElement("p"),this.#p.className="vsl__value",this.#i=document.createElement("div"),this.#i.className="vsl__row",this.#s=document.createElement("button"),this.#s.type="button",this.#s.className="vsl__icon",this.#s.setAttribute("aria-label","Decrease");const i=document.createElement("slot");i.name="left-icon",this.#k=document.createElement("span"),this.#k.textContent="-",i.appendChild(this.#k),this.#s.appendChild(i),this.#t=document.createElement("div"),this.#t.className="vsl__track-area",this.#t.setAttribute("role","slider"),this.#t.setAttribute("tabindex","0"),this.#r=document.createElement("div"),this.#r.className="vsl__track-wrap",this.#M=document.createElement("div"),this.#M.className="vsl__track",this.#S=document.createElement("span"),this.#S.className="fx-glow vsl__glow",this.#S.setAttribute("aria-hidden","true"),this.#x=document.createElement("div"),this.#x.className="vsl__ghost",this.#_=document.createElement("div"),this.#_.className="vsl__fill",this.#M.append(this.#S,this.#x,this.#_),this.#r.append(this.#M),this.#t.append(this.#r),this.#n=document.createElement("button"),this.#n.type="button",this.#n.className="vsl__icon",this.#n.setAttribute("aria-label","Increase");const s=document.createElement("slot");s.name="right-icon",this.#L=document.createElement("span"),this.#L.textContent="+",s.appendChild(this.#L),this.#n.appendChild(s),this.#i.append(this.#s,this.#t,this.#n),this.#f.append(this.#p,this.#i),t.append(e,this.#f),this.#s.addEventListener("click",this.#V),this.#n.addEventListener("click",this.#j),this.#t.addEventListener("pointermove",this.#U),this.#t.addEventListener("pointerdown",this.#K),this.#t.addEventListener("pointerup",this.#N),this.#t.addEventListener("pointercancel",this.#N),this.#t.addEventListener("keydown",this.#W),this.#i.addEventListener("mouseenter",this.#R),this.#i.addEventListener("mouseleave",this.#$),this.#i.addEventListener("touchstart",this.#R,{passive:!0}),this.#i.addEventListener("touchend",this.#$)}connectedCallback(){this.#P=!0;const t=this.hasAttribute("value")?this.#l("value",50):this.#l("default-value",50);this.#e=t,this.#g=t,this.#C=this.#T(),this.#et(),y()||(this.#z=requestAnimationFrame(this.#J)),window.addEventListener("resize",this.#Y),this.#Q=p(this.#t,120,()=>this.#X()),this.#Z=p(this.#s,96,()=>this.#X()),this.#tt=p(this.#n,96,()=>this.#X())}disconnectedCallback(){this.#P=!1,cancelAnimationFrame(this.#z);for(const t of this.#o)cancelAnimationFrame(t);this.#o.clear();for(const t of this.#F)clearTimeout(t);this.#F.clear(),window.removeEventListener("resize",this.#Y),this.#Q?.(),this.#Z?.(),this.#tt?.(),this.#s.removeEventListener("click",this.#V),this.#n.removeEventListener("click",this.#j),this.#t.removeEventListener("pointermove",this.#U),this.#t.removeEventListener("pointerdown",this.#K),this.#t.removeEventListener("pointerup",this.#N),this.#t.removeEventListener("pointercancel",this.#N),this.#t.removeEventListener("keydown",this.#W),this.#i.removeEventListener("mouseenter",this.#R),this.#i.removeEventListener("mouseleave",this.#$),this.#i.removeEventListener("touchstart",this.#R),this.#i.removeEventListener("touchend",this.#$)}attributeChangedCallback(t,e,i){if(!(!this.#P||e===i)){if(t==="value"){if(i===null)this.#e=this.#l("default-value",this.#e);else{if(this.#g!==null&&Number(i)===this.#g)return;this.#e=this.#l("value",this.#e)}this.#g=this.#e}else t==="default-value"&&!this.hasAttribute("value")&&(this.#e=this.#l("default-value",this.#e),this.#g=this.#e);this.#et()}}get value(){return this.#e}set value(t){this.setAttribute("value",String(t))}#l(t,e){const i=parseFloat(this.getAttribute(t));return Number.isFinite(i)?i:e}get#a(){return this.#l("min",0)}get#h(){return this.#l("max",100)}get#D(){return this.hasAttribute("stepped")}get#I(){return this.#l("step-size",1)}get#c(){return this.hasAttribute("disabled")}get#ht(){return this.hasAttribute("show-value")}get#ot(){return this.hasAttribute("ghost")}#X(){return this.#c||!this.hasAttribute("glow")}#T(){const t=this.#h-this.#a;return t===0?0:Math.min(Math.max((this.#e-this.#a)/t*100,0),100)}#et(){const t=this.#c,e=this.getAttribute("size")||"md";this.#f.className=`vsl vsl--${e}`+(t?" is-disabled":"");const i=this.getAttribute("tone")||"accent",n=this.getAttribute("color")||""||_[i]||_.accent;this.#f.style.setProperty("--accent",n),this.#p.style.display=this.#ht?"":"none",this.#p.textContent=String(Math.round(this.#e)),this.#s.disabled=t,this.#n.disabled=t,this.#k.textContent=this.getAttribute("left-icon")??"-",this.#L.textContent=this.getAttribute("right-icon")??"+",this.#t.setAttribute("aria-valuemin",String(this.#a)),this.#t.setAttribute("aria-valuemax",String(this.#h)),this.#t.setAttribute("aria-valuenow",String(Math.round(this.#e))),this.#t.setAttribute("aria-disabled",String(t)),this.#t.setAttribute("tabindex",t?"-1":"0"),this.#x.style.display=this.#ot?"":"none",this.#_.style.width=`${this.#T()}%`,this.#u()}#u(){const t=this.#O(),e=this.#y.value,i=t?1+e/t.width:1,n=1+e/x*(.8-1);let l;this.#d==="left"?l="right":this.#d==="right"?l="left":l=t?this.#H<t.left+t.width/2?"right":"left":"center",this.#r.style.transform=`scaleX(${i}) scaleY(${n})`,this.#r.style.transformOrigin=l;const a=this.#q.value,r=(o,d)=>{const c=(a-1)/.19999999999999996;return o+c*(d-o)};this.#r.style.height=`${r(6,12)}px`,this.#r.style.marginTop=`${r(0,-3)}px`,this.#r.style.marginBottom=`${r(0,-3)}px`,this.#i.style.scale=String(a),this.#i.style.opacity=String(r(.7,1));const u=this.#d==="left"?-e/a:0,h=this.#d==="right"?e/a:0;this.#s.style.transform=`translateX(${u}px) scale(${this.#B.value})`,this.#n.style.transform=`translateX(${h}px) scale(${this.#G.value})`}#O(){return this.#E?this.#E:this.#t?this.#t.getBoundingClientRect():null}#A(t){if(t===this.#d)return;const e=this.#d;this.#d=t,t==="left"&&e!=="left"?this.#at(this.#B,!0):t==="right"&&e!=="right"&&this.#at(this.#G,!0)}#it(t){this.#H=t;const e=this.#O();if(!e)return;const{left:i,right:s}=e;let n;t<i?(n=i-t,this.#A("left")):t>s?(n=t-s,this.#A("right")):(n=0,this.#A("middle")),this.#y.value=S(n,x),this.#u()}#st(t){const e=this.#O();if(!e)return this.#e;let i=this.#a+(t-e.left)/e.width*(this.#h-this.#a);return this.#D&&(i=Math.round(i/this.#I)*this.#I),Math.min(Math.max(i,this.#a),this.#h)}#lt(t){this.#c||t.buttons===0||(this.#m(this.#st(t.clientX)),this.#it(t.clientX))}#ct(t){if(!this.#c){this.#E=this.#t.getBoundingClientRect(),this.#m(this.#st(t.clientX)),this.#it(t.clientX);try{this.#t.setPointerCapture(t.pointerId)}catch{}}}#dt(){this.#E=null,this.#w&&cancelAnimationFrame(this.#w),this.#w=this.#v(this.#y,0,{type:"spring",bounce:.4,duration:500})}#nt(t){if(this.#c)return;const e=this.#D?this.#I:(this.#h-this.#a)/20||1;this.#m(Math.min(Math.max(this.#e+t*e,this.#a),this.#h)),this.#A(t<0?"left":"right"),this.#w&&cancelAnimationFrame(this.#w),this.#y.value=10.4,this.#u(),this.#w=this.#v(this.#y,0,{type:"spring",bounce:.12,duration:420}),this.#rt(()=>this.#A("middle"),520)}#ut(){this.#c||(this.#b&&cancelAnimationFrame(this.#b),this.#b=this.#v(this.#q,1.2,{duration:200}))}#mt(){this.#b&&cancelAnimationFrame(this.#b),this.#b=this.#v(this.#q,1,{duration:200})}#vt(t){if(this.#c)return;const e=this.#D?this.#I:(this.#h-this.#a)/100;t.key==="ArrowRight"||t.key==="ArrowUp"?(t.preventDefault(),this.#m(Math.min(this.#e+e,this.#h))):t.key==="ArrowLeft"||t.key==="ArrowDown"?(t.preventDefault(),this.#m(Math.max(this.#e-e,this.#a))):t.key==="Home"?(t.preventDefault(),this.#m(this.#a)):t.key==="End"&&(t.preventDefault(),this.#m(this.#h))}#m(t){if(this.#c||t===this.#e)return;this.#e=t,this.#g=t,this.setAttribute("value",String(t)),this.#p.textContent=String(Math.round(t)),this.#t.setAttribute("aria-valuenow",String(Math.round(t))),this.#_.style.width=`${this.#T()}%`;const e={value:t};this.dispatchEvent(new CustomEvent("input",{bubbles:!0,composed:!0,detail:e})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:e}))}#v(t,e,{type:i="tween",bounce:s=0,duration:n=.3}={}){return y()?(t.value=e,this.#u(),0):i==="spring"?this.#pt(t,e,s,n):this.#ft(t,e,n)}#ft(t,e,i=300){const s=t.value,n=e-s,l=performance.now();let a=0;const r=u=>{this.#o.delete(a);const h=Math.min((u-l)/i,1),o=1-Math.pow(1-h,3);t.value=s+n*o,this.#u(),h<1&&(a=requestAnimationFrame(r),this.#o.add(a))};return a=requestAnimationFrame(r),this.#o.add(a),a}#pt(t,e,i=.5,s=600){const n=t.value,l=performance.now(),a=1,r=170,h=26*(1-i)/(2*Math.sqrt(a*r)),o=Math.sqrt(r/a),d=o*Math.sqrt(1-h*h);let c=0;const b=E=>{this.#o.delete(c);const v=E-l,m=v/1e3;let f;if(h<1){const A=Math.exp(-h*o*m),k=Math.cos(d*m),L=Math.sin(d*m);f=A*(k+h*o/d*L)}else f=Math.exp(-o*m);const w=e+(n-e)*f;t.value=w,this.#u(),!(Math.abs(w-e)<.01&&v>100)&&v<s*3?(c=requestAnimationFrame(b),this.#o.add(c)):(t.value=e,this.#u())};return c=requestAnimationFrame(b),this.#o.add(c),c}#at(t,e){e?(this.#v(t,1.4,{duration:125}),this.#rt(()=>this.#v(t,1,{duration:125}),125)):this.#v(t,1,{duration:250})}#rt(t,e){const i=setTimeout(()=>{this.#F.delete(i),t()},e);return this.#F.add(i),i}}customElements.define("vs-slider",F);
