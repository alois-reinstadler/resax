const o={sm:2,md:3,lg:4},d=24,a=2,m=n=>`${n}. A hairline thumb that stays out of the way. It thickens a touch and brightens on hover, then quietly fades when idle. Pure native scroll, no dependencies, no distractions.`;function u(n){const t=String(n||"").replace("#",""),e=t.length===3?t.split("").map(i=>i+i).join(""):t,s=parseInt(e,16)||0;return`${s>>16&255},${s>>8&255},${s&255}`}const b=`
  :host { display: block; }
  .vsm-sb {
    position: relative;
    width: 100%;
    max-width: 420px;
    height: 340px;
    border-radius: var(--ctrl-r-lg, 16px);
    background: var(--bg-card, #111);
    border: 1px solid var(--border, #2a2a2a);
    overflow: hidden;
  }
  .vsm-sb--bare {
    max-width: none;
    height: auto;
    border-radius: 0;
    background: transparent;
    border: none;
  }
  .vsm-sb__vp {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overscroll-behavior: contain;
  }
  .vsm-sb--bare .vsm-sb__vp {
    height: auto;
  }
  .vsm-sb__vp::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
  .vsm-sb__track {
    position: absolute;
    top: 2px;
    bottom: 2px;
    right: 2px;
    width: 12px;
    cursor: pointer;
    transition: opacity 320ms ease;
  }
  .vsm-sb__track[hidden] { display: none; }
  .vsm-sb__track--hidden {
    opacity: 0;
  }
  .vsm-sb__thumb {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: var(--ctrl-r-sm, 999px);
    cursor: grab;
    will-change: transform, width;
    transition: width 200ms ease, background-color 200ms ease;
  }
  .vsm-sb__thumb:active {
    cursor: grabbing;
  }
  .vsm-sb__demo {
    padding: 22px 26px;
    color: var(--text-secondary, #c9c9c9);
    font-family: inherit;
  }
  .vsm-sb__demo h3 {
    margin: 0 0 14px;
    color: var(--text, #fff);
    font-size: 16px;
    font-weight: 600;
  }
  .vsm-sb__demo p {
    margin: 0 0 16px;
    font-size: 13px;
    line-height: 1.7;
  }
  @media (prefers-reduced-motion: reduce) {
    .vsm-sb__thumb,
    .vsm-sb__track {
      transition: none;
    }
  }
`;class p extends HTMLElement{static observedAttributes=["size","color","auto-hide","lines","bare","max-height"];#w;#r;#e;#b;#x;#i;#_;#s;#t;#y="255,255,255";#o=40;#c=0;#T=0;#E=!1;#d=!1;#a=!1;#p=!1;#l=0;#k=0;#C=0;#v=null;#g=null;#I=()=>{this.#m(),this.#u()};#q=t=>{const e=this.#e;if(e){this.#a=!0,this.#p=!0,this.#k=t.clientY,this.#C=e.scrollTop;try{t.target.setPointerCapture?.(t.pointerId)}catch{}t.preventDefault(),this.#h(),this.#n()}};#D=t=>{if(!this.#a)return;const e=this.#e;if(!e)return;const s=this.#c-this.#o,i=e.scrollHeight-e.clientHeight,h=t.clientY-this.#k;e.scrollTop=this.#C+(s?h/s*i:0)};#H=t=>{this.#a=!1,this.#u();try{t.target.releasePointerCapture?.(t.pointerId)}catch{}this.#h(),this.#n()};#F=t=>{const e=this.#e,s=this.#t;if(!e||!s||t.target===s)return;const i=this.#s.getBoundingClientRect(),h=t.clientY-i.top-a-this.#o/2,r=this.#c-this.#o,l=e.scrollHeight-e.clientHeight,c=Math.max(0,Math.min(r?h/r:0,1))*l;e.scrollTo({top:c,behavior:"smooth"})};#O=()=>{this.#d=!0,this.#u(),this.#h(),this.#n()};#P=()=>{this.#d=!1,this.#u(),this.#h(),this.#n()};#Y=()=>this.#N();constructor(){super(),this.#w=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=b,this.#r=document.createElement("div"),this.#r.className="vsm-sb",this.#e=document.createElement("div"),this.#e.className="vsm-sb__vp",this.#b=document.createElement("div"),this.#b.className="vsm-sb__content",this.#x=document.createElement("slot"),this.#i=document.createElement("article"),this.#i.className="vsm-sb__demo",this.#_=document.createElement("h3"),this.#_.textContent="Minimal scrollbar",this.#i.appendChild(this.#_),this.#x.appendChild(this.#i),this.#b.appendChild(this.#x),this.#e.appendChild(this.#b),this.#s=document.createElement("div"),this.#s.className="vsm-sb__track",this.#t=document.createElement("div"),this.#t.className="vsm-sb__thumb",this.#s.appendChild(this.#t),this.#r.append(this.#e,this.#s),this.#w.append(t,this.#r),this.#e.addEventListener("scroll",this.#I,{passive:!0}),this.#s.addEventListener("pointerenter",this.#O),this.#s.addEventListener("pointerleave",this.#P),this.#s.addEventListener("pointerdown",this.#F),this.#t.addEventListener("pointerdown",this.#q),this.#t.addEventListener("pointermove",this.#D),this.#t.addEventListener("pointerup",this.#H),this.#t.addEventListener("pointercancel",this.#H)}connectedCallback(){this.#N(),this.#v=new MutationObserver(this.#Y),this.#v.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),this.#$(),this.#z(),this.#m(),this.#g=new ResizeObserver(()=>this.#m()),this.#g.observe(this.#e),this.#u()}disconnectedCallback(){this.#l&&clearTimeout(this.#l),this.#l=0,this.#g?.disconnect(),this.#g=null,this.#v?.disconnect(),this.#v=null}attributeChangedCallback(t){this.#r&&(t==="lines"&&(this.#$(),requestAnimationFrame(()=>this.#m())),t==="size"&&requestAnimationFrame(()=>this.#m()),this.#z())}#f(t,e){const s=this.getAttribute(t);return s===null?e:s}#R(){const t=this.#f("size","md");return o[t]?t:"md"}#S(){return o[this.#R()]}#L(){return this.#f("color","#ffffff")}#M(){return this.hasAttribute("auto-hide")}#B(){return this.hasAttribute("bare")}#A(){const t=parseFloat(this.#f("max-height","0"));return Number.isFinite(t)?t:0}#U(){const t=parseInt(this.#f("lines","14"),10);return Number.isFinite(t)&&t>=0?t:14}#N(){const t=getComputedStyle(document.documentElement).getPropertyValue("--fx-tint").trim();t&&(this.#y=t.replace(/\s+/g,",")),this.#n()}#V(){return this.#L()==="#ffffff"?this.#y:u(this.#L())}#$(){const t=this.#U();let e=this.#i.querySelectorAll("p");for(;e.length<t;){const s=document.createElement("p");s.textContent=m(e.length+1),this.#i.appendChild(s),e=this.#i.querySelectorAll("p")}for(;e.length>t;)this.#i.removeChild(this.#i.lastElementChild),e=this.#i.querySelectorAll("p")}#z(){const t=this.#B();this.#r.className=t?"vsm-sb vsm-sb--bare":"vsm-sb",t&&this.#A()?this.#e.style.maxHeight=`${this.#A()}px`:this.#e.style.maxHeight="",this.#h(),this.#n()}#m(){const t=this.#e;if(!t)return;const e=t.clientHeight;this.#c=e-a*2;const s=e/t.scrollHeight;this.#o=Math.max(d,this.#c*s);const i=t.scrollHeight-e,h=this.#c-this.#o;this.#T=i>0&&h>0?t.scrollTop/i*h:0,this.#E=i>1,this.#h(),this.#n()}#u(){this.#p=!0,this.#l&&clearTimeout(this.#l),this.#M()&&!this.#a&&!this.#d&&(this.#l=window.setTimeout(()=>{this.#p=!1,this.#h()},900)),this.#h()}#h(){if(!this.#s)return;this.#s.hidden=!this.#E;const t=this.#M()&&!this.#p&&!this.#d&&!this.#a;this.#s.classList.toggle("vsm-sb__track--hidden",t)}#n(){if(!this.#t)return;const t=this.#d||this.#a,e=t?this.#S()+1:this.#S(),s=t?.9:.35;this.#t.style.height=`${this.#o}px`,this.#t.style.width=`${e}px`,this.#t.style.transform=`translate3d(0, ${this.#T}px, 0)`,this.#t.style.background=`rgb(${this.#V()} / ${s})`}}customElements.define("vs-scrollbar-minimal",p);
