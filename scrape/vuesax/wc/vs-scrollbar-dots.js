const h={sm:4,md:6,lg:8},d=30,r=3;function m(o){const t=String(o).replace("#",""),e=t.length===3?t.split("").map(i=>i+i).join(""):t,s=parseInt(e,16)||0;return`${s>>16&255},${s>>8&255},${s&255}`}const u=`
  :host { display: block; }
  .vsd-sb {
    position: relative;
    width: 100%;
    max-width: 420px;
    height: 340px;
    border-radius: var(--ctrl-r-lg, 16px);
    background: var(--bg-card, #111);
    border: 1px solid var(--border, #2a2a2a);
    overflow: hidden;
  }
  .vsd-sb--bare {
    max-width: none;
    height: auto;
    border-radius: 0;
    background: transparent;
    border: none;
  }
  .vsd-sb__vp {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overscroll-behavior: contain;
  }
  .vsd-sb--bare .vsd-sb__vp {
    height: auto;
  }
  .vsd-sb__vp::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
  .vsd-sb__track {
    position: absolute;
    top: 3px;
    bottom: 3px;
    right: 4px;
    width: 16px;
    cursor: pointer;
    transition: opacity 320ms ease;
  }
  .vsd-sb__track--hidden {
    opacity: 0;
  }
  .vsd-sb__track--gone {
    display: none;
  }
  .vsd-sb__thumb {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    cursor: grab;
    will-change: transform;
  }
  .vsd-sb__thumb:active {
    cursor: grabbing;
  }
  .vsd-sb__dot {
    border-radius: 999px;
    animation: vsd-wave 1.6s ease-in-out infinite;
    transition: width 220ms cubic-bezier(0.34, 1.56, 0.64, 1),
      height 220ms cubic-bezier(0.34, 1.56, 0.64, 1),
      background-color 220ms ease;
  }
  @keyframes vsd-wave {
    0%,
    100% {
      opacity: 0.6;
      transform: scale(0.85);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  }
  .vsd-sb__thumb--active .vsd-sb__dot {
    animation-play-state: paused;
  }
  .vsd-sb__demo {
    padding: 22px 26px;
    color: var(--text-secondary, #c9c9c9);
    font-family: inherit;
  }
  .vsd-sb__demo h3 {
    margin: 0 0 14px;
    color: var(--text, #fff);
    font-size: 16px;
    font-weight: 600;
  }
  .vsd-sb__demo p {
    margin: 0 0 16px;
    font-size: 13px;
    line-height: 1.7;
  }
  @media (prefers-reduced-motion: reduce) {
    .vsd-sb__dot {
      animation: none;
      transition: none;
    }
  }
`;class b extends HTMLElement{static observedAttributes=["size","color","auto-hide","lines","bare","max-height"];#_;#t;#u;#s;#e;#a;#x;#o=[];#c=[];#T="255,255,255";#b=null;#p=null;#i=40;#l=0;#E=0;#k=!1;#h=!1;#n=!1;#g=!1;#r=0;#C=0;#H=0;#A=()=>{this.#v(),this.#d()};#P=()=>{this.#h=!0,this.#d(),this.#f()};#I=()=>{this.#h=!1,this.#d(),this.#f()};#O=t=>{const e=this.#t,s=this.#e;if(!e||!s||t.target===s||s.contains(t.target))return;const i=this.#s.getBoundingClientRect(),n=t.clientY-i.top-r-this.#i/2,a=this.#l-this.#i,c=e.scrollHeight-e.clientHeight,l=Math.max(0,Math.min(n/a,1))*c;e.scrollTo({top:l,behavior:"smooth"})};#Y=t=>{const e=this.#t;if(e){this.#n=!0,this.#g=!0,this.#C=t.clientY,this.#H=e.scrollTop;try{t.target.setPointerCapture?.(t.pointerId)}catch{}t.preventDefault(),this.#f(),this.#m()}};#F=t=>{if(!this.#n)return;const e=this.#t;if(!e)return;const s=this.#l-this.#i,i=e.scrollHeight-e.clientHeight,n=t.clientY-this.#C;e.scrollTop=this.#H+n/s*i};#S=t=>{this.#n=!1,this.#d();try{t.target.releasePointerCapture?.(t.pointerId)}catch{}this.#f()};#R=()=>this.#L();constructor(){super(),this.#_=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=u;const e=document.createElement("div");e.className="vsd-sb",this.#t=document.createElement("div"),this.#t.className="vsd-sb__vp",this.#u=document.createElement("div"),this.#u.className="vsd-sb__content";const s=document.createElement("slot");this.#a=document.createElement("article"),this.#a.className="vsd-sb__demo",this.#x=document.createElement("h3"),this.#x.textContent="Dotted scrollbar",this.#a.appendChild(this.#x),s.appendChild(this.#a),this.#u.appendChild(s),this.#t.appendChild(this.#u),this.#s=document.createElement("div"),this.#s.className="vsd-sb__track",this.#e=document.createElement("div"),this.#e.className="vsd-sb__thumb",this.#s.appendChild(this.#e),e.append(this.#t,this.#s),this.#_.append(t,e),this.#t.addEventListener("scroll",this.#A,{passive:!0}),this.#s.addEventListener("pointerenter",this.#P),this.#s.addEventListener("pointerleave",this.#I),this.#s.addEventListener("pointerdown",this.#O),this.#e.addEventListener("pointerdown",this.#Y),this.#e.addEventListener("pointermove",this.#F),this.#e.addEventListener("pointerup",this.#S),this.#e.addEventListener("pointercancel",this.#S)}connectedCallback(){this.#L(),this.#b=new MutationObserver(this.#R),this.#b.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),this.#M(),this.#v(),this.#p=new ResizeObserver(()=>this.#v()),this.#p.observe(this.#t),this.#d()}disconnectedCallback(){this.#r&&clearTimeout(this.#r),this.#r=0,this.#p?.disconnect(),this.#p=null,this.#b?.disconnect(),this.#b=null}attributeChangedCallback(t){this.#s&&(this.#M(),(t==="lines"||t==="size")&&requestAnimationFrame(()=>this.#v()))}#L(){const t=getComputedStyle(document.documentElement).getPropertyValue("--fx-tint").trim();t&&(this.#T=t.replace(/\s+/g,","),this.#y())}get#V(){return this.getAttribute("size")||"md"}get#N(){return this.getAttribute("color")||"#ffffff"}get#$(){return this.hasAttribute("auto-hide")}get#j(){const t=Number(this.getAttribute("lines"));return Number.isFinite(t)&&t>0?t:14}get#D(){return this.hasAttribute("bare")}get#z(){const t=Number(this.getAttribute("max-height"));return Number.isFinite(t)?t:0}get#w(){return h[this.#V]||h.md}get#q(){return this.#N==="#ffffff"?this.#T:m(this.#N)}#M(){this.#_.querySelector(".vsd-sb").classList.toggle("vsd-sb--bare",this.#D),this.#D&&this.#z?this.#t.style.maxHeight=`${this.#z}px`:this.#t.style.maxHeight="",this.#B(),this.#m()}#B(){const t=this.#j;for(;this.#c.length<t;){const e=document.createElement("p"),s=this.#c.length+1;e.textContent=`${s}. Instead of a solid bar the thumb is a neat column of dots that ripple in a wave as they idle and swell on hover. The dot count adapts to how much there is to scroll.`,this.#a.appendChild(e),this.#c.push(e)}for(;this.#c.length>t;)this.#c.pop().remove()}#v(){const t=this.#t;if(!t)return;const e=t.clientHeight;this.#l=e-r*2;const s=t.scrollHeight>0?e/t.scrollHeight:1;this.#i=Math.max(d,this.#l*s);const i=t.scrollHeight-e,n=this.#l-this.#i;this.#E=i>0?t.scrollTop/i*n:0,this.#k=i>1,this.#U(),this.#G(),this.#m()}#d(){this.#g=!0,this.#r&&clearTimeout(this.#r),this.#$&&!this.#n&&!this.#h&&(this.#r=window.setTimeout(()=>{this.#g=!1,this.#m()},900)),this.#m()}#U(){this.#e.style.height=`${this.#i}px`,this.#e.style.transform=`translate3d(0, ${this.#E}px, 0)`}#m(){this.#s.classList.toggle("vsd-sb__track--gone",!this.#k);const t=this.#$&&!this.#g&&!this.#h&&!this.#n;this.#s.classList.toggle("vsd-sb__track--hidden",t)}#f(){const t=this.#h||this.#n;this.#e.classList.toggle("vsd-sb__thumb--active",t),this.#y()}#G(){const t=this.#w*1.6,e=Math.max(3,Math.floor(this.#i/t));for(;this.#o.length<e;){const s=document.createElement("span");s.className="vsd-sb__dot",this.#e.appendChild(s),this.#o.push(s)}for(;this.#o.length>e;)this.#o.pop().remove();this.#o.forEach((s,i)=>{s.style.animationDelay=`${(i+1)*.12}s`}),this.#y()}#y(){const t=this.#h||this.#n,e=t?.95:.5,s=t?this.#w+2:this.#w,i=this.#q;for(const n of this.#o)n.style.width=`${s}px`,n.style.height=`${s}px`,n.style.background=`rgb(${i} / ${e})`}}customElements.define("vs-scrollbar-dots",b);
