const h=`
  :host { display: inline-flex; }
  :host([block]) { display: flex; width: 100%; }
  .vbg {
    --h: 34px; --px: 18px; --fs: 14px; --rr: 999px;
    align-items: center; background: #000; border: 0; border-radius: var(--rr);
    box-sizing: border-box; color: #fff; cursor: pointer; display: inline-flex;
    font-family: inherit; font-size: var(--fs); font-weight: 400; height: var(--h);
    justify-content: center; min-height: var(--h); outline: none; overflow: hidden;
    padding: 0 var(--px); position: relative; transition: 0.3s; user-select: none; z-index: 10; }
  .vbg--block { width: 100%; }
  /* sizes */
  .vbg--sm { --h: 28px; --px: 14px; --fs: 12px; }
  .vbg--lg { --h: 42px; --px: 24px; --fs: 16px; }
  /* radii — proportional to height so they scale with the size */
  .vbg--r-none { --rr: 0px; }
  .vbg--r-subtle { --rr: calc(var(--h) * 0.24); }
  .vbg--r-rounded { --rr: calc(var(--h) * 0.4); }
  .vbg--r-pill { --rr: 999px; }
  @supports (corner-shape: squircle) {
    .vbg--r-squircle { corner-shape: squircle; --rr: calc(var(--h) * 0.45); }
  }
  /* click ripple: above the gradients, below the text */
  .vbg__ripples { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; z-index: 16; pointer-events: none; }
  @supports (corner-shape: squircle) { .vbg--r-squircle .vbg__ripples { corner-shape: squircle; } }
  .fx-ripple { position: absolute; z-index: 1; pointer-events: none; border-radius: 50%; transform: translate(-50%,-50%) scale(0);
    background: radial-gradient(circle, rgb(var(--rip,255 255 255)/.38) 0%, rgb(var(--rip,255 255 255)/.20) 24%, rgb(var(--rip,255 255 255)/.09) 44%, rgb(var(--rip,255 255 255)/.03) 60%, transparent 76%);
    opacity: 0; will-change: transform,opacity;
    animation: vbg-rip 780ms cubic-bezier(.22,1,.36,1) forwards, vbg-fade 780ms cubic-bezier(.25,.1,.25,1) forwards; }
  @keyframes vbg-rip { from { transform: translate(-50%,-50%) scale(0); } to { transform: translate(-50%,-50%) scale(1); } }
  @keyframes vbg-fade { from { opacity: .8; } to { opacity: 0; } }
  .vbg .btn-content { align-items: center; display: flex; justify-content: center; position: relative; text-shadow: 0 0 8px rgba(0,0,0,0.5); z-index: 20; }
  .vbg .gradient-0 {
    background: #000;
    /* inner box 2px smaller per side → concentric radius = button − 2px */
    border-radius: max(0px, calc(var(--rr) - 2px)); filter: blur(10px); height: calc(100% - 4px);
    opacity: 0; position: absolute; transform: scale(0.95); transition: 0.5s; width: calc(100% - 4px); z-index: 12; }
  @supports (corner-shape: squircle) { .vbg--r-squircle .gradient-0 { corner-shape: squircle; } }
  .vbg .gradient-1 {
    background: radial-gradient(103.46% 134.6% at 64.66% 50%, rgba(217,217,217,0) 27.37%, rgba(217,217,217,0.3) 100%);
    border-radius: inherit; height: 100%; opacity: 1; position: absolute; transition: 0.4s; width: 100%; z-index: 12; }
  .vbg .glass { height: 130%; opacity: 1; position: absolute; width: 130%; z-index: 10; }
  .vbg .gradient-2 { align-items: center; display: flex; height: 100%; justify-content: center; opacity: 1; position: absolute; transform: scale(1); transition: 0.5s; width: 100%; z-index: 5; }
  .vbg .gradient-2 .color { border-radius: 50%; filter: blur(12px); height: 100px; position: absolute; transition: 2s; width: 100px; }
  /* "Aurora" palette (cyan → blue → violet → magenta): analogous and cohesive,
     reads premium over the dark glass. Overridable via CSS var without code. */
  .vbg .color-1 { background: var(--vbg-c1, #00d4ff); transform: translate(-86%, -65%); }
  .vbg .color-2 { background: var(--vbg-c2, #4f46e5); transform: translate(3%, -63%); }
  .vbg .color-3 { background: var(--vbg-c3, #a855f7); transform: translate(64%, -89%); }
  .vbg .color-4 { background: var(--vbg-c4, #2563eb); transform: translate(-87%, 8%); }
  .vbg .color-5 { background: var(--vbg-c5, #ff2ec4); transform: translate(-35%, -76%); }
  .vbg .color-6 { background: var(--vbg-c6, #22d3ee); transform: translate(-69%, -79%); }
  .vbg:hover:not(.is-disabled) .gradient-2 { transform: scale(1.1); }
  .vbg:hover:not(.is-disabled) .gradient-0 { filter: blur(0); opacity: 1; transform: scale(1); }
  .vbg:focus-visible { outline: none; }
  .vbg.is-disabled { opacity: 0.5; cursor: not-allowed; }
  @media (prefers-reduced-motion: reduce) {
    .vbg, .vbg .gradient-0, .vbg .gradient-1, .vbg .gradient-2, .vbg .gradient-2 .color { transition: none; }
    .fx-ripple { display: none; }
  }
`,p=(l,e)=>Math.random()*(e-l)+l,u=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let b;function f(l){if(b||=document.createElement("canvas").getContext("2d"),!b)return null;b.fillStyle="#000",b.fillStyle=l;const e=b.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function g(l,e){const t=e?f(String(e).trim()):null;if(!t){for(const r of v)l.style.removeProperty(r);return}const n=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),a=.2126*n(t[0])+.7152*n(t[1])+.0722*n(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(r=>Math.round(a?r*.92:r+(255-r)*.16)),i=(r,d)=>l.style.setProperty(r,d);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(r,c);i("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(r,a?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])i(r,a?"0 0 0":"255 255 255");i("--vs-color",c),i("--vs-color-rgb",t.join(" ")),i("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["label","size","radius","block","disabled","speed","color"];#t;#e;#n;#s;#i=null;#r=null;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=h,this.#t=document.createElement("button"),this.#t.type="button";const n=document.createElement("div");n.className="btn-content";const s=document.createElement("slot");this.#n=document.createTextNode("Upgrade"),s.append(this.#n),n.append(s),this.#e=document.createElement("span"),this.#e.className="fx-ripples vbg__ripples",this.#e.setAttribute("aria-hidden","true");const a=document.createElement("div");a.className="gradient-0";const c=document.createElement("div");c.className="gradient-1";const o=document.createElement("div");o.className="glass";const i=document.createElement("div");i.className="gradient-2",this.#s=[];for(let r=1;r<=6;r++){const d=document.createElement("div");d.className=`color color-${r}`,this.#s.push(d),i.appendChild(d)}this.#t.append(n,this.#e,a,c,o,i),e.append(t,this.#t)}connectedCallback(){g(this,this.getAttribute("color")),this.#a(),this.#i=new AbortController;const e={signal:this.#i.signal};this.#t.addEventListener("pointerdown",t=>this.#c(t),e);for(const t of["pointerup","pointerleave","pointercancel"])this.#t.addEventListener(t,()=>{this.#t.style.transform=""},e);this.#o()}disconnectedCallback(){this.#i?.abort(),this.#i=null,this.#r&&(clearInterval(this.#r),this.#r=null)}attributeChangedCallback(e){g(this,this.getAttribute("color")),this.#t&&(this.#a(),this.isConnected&&(e==="disabled"||e==="speed")&&this.#o())}#a(){const e=(n,s)=>this.getAttribute(n)??s,t=this.hasAttribute("disabled");this.#t.className=`vbg vbg--${e("size","md")} vbg--r-${e("radius","pill")}`+(this.hasAttribute("block")?" vbg--block":"")+(t?" is-disabled":""),this.#t.disabled=t,this.#n.data=e("label","Upgrade")}#o(){if(this.#r&&(clearInterval(this.#r),this.#r=null),this.hasAttribute("disabled")||u())return;this.#l();const e=Math.max(400,Number(this.getAttribute("speed"))||2e3);this.#r=setInterval(()=>this.#l(),e)}#l(){for(const e of this.#s)e.style.transform=`translate(${p(-100,100).toFixed(0)}%, ${p(-100,100).toFixed(0)}%)`}#c(e){if(this.#t.disabled)return;const t=this.#t.getBoundingClientRect(),n=e.clientX-t.left,s=e.clientY-t.top,a=Math.max(n,t.width-n),c=Math.max(s,t.height-s),o=Math.hypot(a,c)*2,i=document.createElement("span");for(i.className="fx-ripple",i.style.cssText=`left:${n}px;top:${s}px;width:${o}px;height:${o}px`,i.addEventListener("animationend",()=>i.remove()),this.#e.appendChild(i);this.#e.childElementCount>6;)this.#e.firstElementChild.remove();this.#t.style.transform="scale(.96)"}}customElements.define("vs-button-gradient",m);
