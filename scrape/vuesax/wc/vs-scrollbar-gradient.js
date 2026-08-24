const n={sm:5,md:7,lg:9},c=30,r=3,l=`
  :host { display: block; }
  .vsg-sb {
    position: relative;
    width: 100%;
    max-width: 420px;
    height: 340px;
    border-radius: var(--ctrl-r-lg, 16px);
    background: var(--bg-card, #111);
    border: 1px solid var(--border, #2a2a2a);
    overflow: hidden;
  }
  .vsg-sb--bare {
    max-width: none;
    height: auto;
    border-radius: 0;
    background: transparent;
    border: none;
  }
  .vsg-sb__vp {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overscroll-behavior: contain;
  }
  .vsg-sb--bare .vsg-sb__vp {
    height: auto;
  }
  .vsg-sb__vp::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
  .vsg-sb__track {
    position: absolute;
    top: 3px;
    bottom: 3px;
    right: 3px;
    width: 14px;
    cursor: pointer;
    transition: opacity 320ms ease;
  }
  .vsg-sb__track--noscroll {
    display: none;
  }
  .vsg-sb__track--hidden {
    opacity: 0;
  }
  .vsg-sb__thumb {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: var(--ctrl-r-md, 999px);
    cursor: grab;
    background-size: 100% 300%;
    animation: vsg-flow 3.5s linear infinite;
    will-change: transform, width;
    transition: width 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .vsg-sb__thumb:active {
    cursor: grabbing;
  }
  @keyframes vsg-flow {
    0% { background-position: 0 0%; }
    100% { background-position: 0 300%; }
  }
  .vsg-sb__demo {
    padding: 22px 26px;
    color: var(--text-secondary, #c9c9c9);
    font-family: inherit;
  }
  .vsg-sb__demo h3 {
    margin: 0 0 14px;
    color: var(--text, #fff);
    font-size: 16px;
    font-weight: 600;
  }
  .vsg-sb__demo p {
    margin: 0 0 16px;
    font-size: 13px;
    line-height: 1.7;
  }
  @media (prefers-reduced-motion: reduce) {
    .vsg-sb__thumb {
      animation: none;
      transition: none;
    }
  }
`;class d extends HTMLElement{static observedAttributes=["size","color","color2","auto-hide","lines","bare","max-height"];#x;#h;#s;#b;#f;#n;#e;#t;#r=40;#c=0;#_=0;#k=!1;#l=!1;#o=!1;#g=!1;#a=0;#w=0;#y=0;#p=null;#T=-1;#$=()=>{this.#u(),this.#m()};#N=()=>{this.#l=!0,this.#m(),this.#i()};#M=()=>{this.#l=!1,this.#m(),this.#i()};#z=t=>{const s=this.#s;if(!s||t.target===this.#t)return;const e=this.#e.getBoundingClientRect(),i=t.clientY-e.top-r-this.#r/2,h=this.#c-this.#r,o=s.scrollHeight-s.clientHeight,a=Math.max(0,Math.min(i/h,1))*o;s.scrollTo({top:a,behavior:"smooth"})};#A=t=>{const s=this.#s;if(s){this.#o=!0,this.#g=!0,this.#w=t.clientY,this.#y=s.scrollTop;try{t.target.setPointerCapture?.(t.pointerId)}catch{}t.preventDefault(),this.#i(),this.#v()}};#I=t=>{if(!this.#o)return;const s=this.#s;if(!s)return;const e=this.#c-this.#r,i=s.scrollHeight-s.clientHeight,h=t.clientY-this.#w;s.scrollTop=this.#y+h/e*i};#E=t=>{this.#o=!1,this.#m();try{t.target.releasePointerCapture?.(t.pointerId)}catch{}this.#i(),this.#v()};constructor(){super(),this.#x=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=l,this.#h=document.createElement("div"),this.#h.className="vsg-sb",this.#s=document.createElement("div"),this.#s.className="vsg-sb__vp",this.#b=document.createElement("div"),this.#b.className="vsg-sb__content",this.#f=document.createElement("slot"),this.#n=document.createElement("article"),this.#n.className="vsg-sb__demo",this.#f.appendChild(this.#n),this.#b.appendChild(this.#f),this.#s.appendChild(this.#b),this.#e=document.createElement("div"),this.#e.className="vsg-sb__track",this.#t=document.createElement("div"),this.#t.className="vsg-sb__thumb",this.#e.appendChild(this.#t),this.#h.append(this.#s,this.#e),this.#x.append(t,this.#h),this.#s.addEventListener("scroll",this.#$,{passive:!0}),this.#e.addEventListener("pointerenter",this.#N),this.#e.addEventListener("pointerleave",this.#M),this.#e.addEventListener("pointerdown",this.#z),this.#t.addEventListener("pointerdown",this.#A),this.#t.addEventListener("pointermove",this.#I),this.#t.addEventListener("pointerup",this.#E),this.#t.addEventListener("pointercancel",this.#E)}connectedCallback(){this.#C(),this.#H(),this.#u(),this.#p=new ResizeObserver(()=>this.#u()),this.#p.observe(this.#s),this.#m()}disconnectedCallback(){this.#a&&clearTimeout(this.#a),this.#a=0,this.#p?.disconnect(),this.#p=null}attributeChangedCallback(){this.#h&&this.#H()}#d(t,s){return this.hasAttribute(t)?this.getAttribute(t):s}#C(){const t=Math.max(0,parseInt(this.#d("lines","14"),10)||0);if(t===this.#T)return;this.#T=t,this.#n.replaceChildren();const s=document.createElement("h3");s.textContent="Gradient scrollbar",this.#n.appendChild(s);for(let e=1;e<=t;e++){const i=document.createElement("p");i.textContent=`${e}. The thumb is filled with a living gradient that endlessly flows from one hue to the next along its length. Scroll and the color river keeps drifting. Pick two colors and let them blend.`,this.#n.appendChild(i)}}#H(){this.#C();const t=this.hasAttribute("bare");this.#h.className=`vsg-sb${t?" vsg-sb--bare":""}`;const s=parseInt(this.#d("max-height","0"),10)||0;t&&s?this.#s.style.maxHeight=`${s}px`:this.#s.style.maxHeight="",this.#i(),this.#v(),requestAnimationFrame(()=>this.#u())}#S(){return n[this.#d("size","md")]??n.md}#L(){return this.hasAttribute("auto-hide")}#u(){const t=this.#s;if(!t)return;const s=t.clientHeight;this.#c=s-r*2;const e=s/t.scrollHeight;this.#r=Math.max(c,this.#c*e);const i=t.scrollHeight-s,h=this.#c-this.#r;this.#_=i>0?t.scrollTop/i*h:0,this.#k=i>1,this.#i(),this.#v()}#m(){this.#g=!0,this.#a&&clearTimeout(this.#a),this.#L()&&!this.#o&&!this.#l&&(this.#a=window.setTimeout(()=>{this.#g=!1,this.#i()},900)),this.#i()}#i(){if(!this.#e)return;const t=this.#L()&&!this.#g&&!this.#l&&!this.#o;this.#e.className=`vsg-sb__track${this.#k?"":" vsg-sb__track--noscroll"}${t?" vsg-sb__track--hidden":""}`}#v(){if(!this.#t)return;const t=this.#l||this.#o?this.#S()+2:this.#S(),s=this.#d("color","var(--ui-accent, #ededed)"),e=this.#d("color2","#8a8a8a");this.#t.style.height=`${this.#r}px`,this.#t.style.width=`${t}px`,this.#t.style.transform=`translate3d(0, ${this.#_}px, 0)`,this.#t.style.backgroundImage=`linear-gradient(180deg, ${s} 0%, ${e} 50%, ${s} 100%)`}}customElements.define("vs-scrollbar-gradient",d);
