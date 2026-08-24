const o={sm:6,md:9,lg:12},d=34,a=4;function u(h){const t=String(h).replace("#",""),s=t.length===3?t.split("").map(i=>i+i).join(""):t,e=parseInt(s,16)||0;return`${e>>16&255},${e>>8&255},${e&255}`}const p=`
  :host { display: block; }
  .vsr-sb {
    position: relative;
    width: 100%;
    max-width: 420px;
    height: 340px;
    border-radius: var(--ctrl-r-lg, 16px);
    background: var(--bg-card, #111);
    border: 1px solid var(--border, #2a2a2a);
    overflow: hidden;
  }
  .vsr-sb--bare {
    max-width: none;
    height: auto;
    border-radius: 0;
    background: transparent;
    border: none;
  }
  .vsr-sb__vp {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overscroll-behavior: contain;
  }
  .vsr-sb--bare .vsr-sb__vp {
    height: auto;
  }
  .vsr-sb__vp::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
  .vsr-sb__track {
    position: absolute;
    top: 6px;
    bottom: 6px;
    right: 5px;
    width: 18px;
    padding: 4px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 999px;
    transition: opacity 320ms ease, background-color 220ms ease;
  }
  .vsr-sb__track--capsule {
    background: rgb(var(--fx-tint, 255 255 255) / 0.06);
    border: 1px solid var(--border, #2a2a2a);
  }
  .vsr-sb__track--hidden {
    opacity: 0;
  }
  .vsr-sb__track--can-scroll {
    display: block;
  }
  .vsr-sb__track:not(.vsr-sb__track--can-scroll) {
    display: none;
  }
  .vsr-sb__thumb {
    position: absolute;
    top: 4px;
    right: 4px;
    border-radius: 999px;
    cursor: grab;
    will-change: transform, width;
    transition: width 260ms cubic-bezier(0.34, 1.56, 0.64, 1),
      background-color 220ms ease;
  }
  .vsr-sb__thumb:active {
    cursor: grabbing;
  }
  .vsr-sb__demo {
    padding: 22px 26px;
    color: var(--text-secondary, #c9c9c9);
    font-family: inherit;
  }
  .vsr-sb__demo h3 {
    margin: 0 0 14px;
    color: var(--text, #fff);
    font-size: 16px;
    font-weight: 600;
  }
  .vsr-sb__demo p {
    margin: 0 0 16px;
    font-size: 13px;
    line-height: 1.7;
  }
  @media (prefers-reduced-motion: reduce) {
    .vsr-sb__thumb,
    .vsr-sb__track {
      transition: none;
    }
  }
`;class b extends HTMLElement{static observedAttributes=["size","color","auto-hide","show-track","lines","bare","max-height"];#E;#o;#s;#m;#k;#d;#w;#e;#t;#u=[];#a=40;#p=0;#y=0;#T=!1;#c=!1;#i=!1;#v=!1;#r=0;#C="255,255,255";#g=null;#f=null;#H=0;#L=0;#h=0;#S=()=>{this.#x(),this.#b()};#A=t=>{const s=this.#s;if(s){this.#i=!0,this.#v=!0,this.#H=t.clientY,this.#L=s.scrollTop;try{t.target.setPointerCapture?.(t.pointerId)}catch{}t.preventDefault(),this.#n()}};#N=t=>{if(!this.#i)return;const s=this.#s;if(!s)return;const e=this.#p-this.#a,i=s.scrollHeight-s.clientHeight,r=t.clientY-this.#H;s.scrollTop=this.#L+(e>0?r/e*i:0)};#_=t=>{this.#i=!1,this.#b();try{t.target.releasePointerCapture?.(t.pointerId)}catch{}this.#n()};#z=t=>{const s=this.#s,e=this.#t;if(!s||!e||t.target===e)return;const i=this.#e.getBoundingClientRect(),r=t.clientY-i.top-a-this.#a/2,n=this.#p-this.#a,c=s.scrollHeight-s.clientHeight,l=Math.max(0,Math.min(n>0?r/n:0,1))*c;s.scrollTo({top:l,behavior:"smooth"})};#$=()=>{this.#c=!0,this.#b(),this.#l(),this.#n()};#I=()=>{this.#c=!1,this.#b(),this.#l(),this.#n()};#M=()=>{const t=getComputedStyle(document.documentElement).getPropertyValue("--fx-tint").trim();t&&(this.#C=t.replace(/\s+/g,",")),this.#n()};#O=()=>this.#x();constructor(){super(),this.#E=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=p,this.#o=document.createElement("div"),this.#o.className="vsr-sb",this.#s=document.createElement("div"),this.#s.className="vsr-sb__vp",this.#m=document.createElement("div"),this.#m.className="vsr-sb__content",this.#k=document.createElement("slot"),this.#d=document.createElement("article"),this.#d.className="vsr-sb__demo",this.#w=document.createElement("h3"),this.#w.textContent="Rounded scrollbar",this.#d.appendChild(this.#w),this.#k.appendChild(this.#d),this.#m.appendChild(this.#k),this.#s.appendChild(this.#m),this.#e=document.createElement("div"),this.#e.className="vsr-sb__track",this.#t=document.createElement("div"),this.#t.className="vsr-sb__thumb",this.#e.appendChild(this.#t),this.#o.append(this.#s,this.#e),this.#E.append(t,this.#o),this.#s.addEventListener("scroll",this.#S,{passive:!0}),this.#e.addEventListener("pointerenter",this.#$),this.#e.addEventListener("pointerleave",this.#I),this.#e.addEventListener("pointerdown",this.#z),this.#t.addEventListener("pointerdown",this.#A),this.#t.addEventListener("pointermove",this.#N),this.#t.addEventListener("pointerup",this.#_),this.#t.addEventListener("pointercancel",this.#_)}connectedCallback(){this.#M(),this.#g=new MutationObserver(this.#M),this.#g.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),this.#D(),this.#x(),this.#f=new ResizeObserver(this.#O),this.#f.observe(this.#s),this.#b()}disconnectedCallback(){this.#r&&(clearTimeout(this.#r),this.#r=0),this.#h&&(cancelAnimationFrame(this.#h),this.#h=0),this.#f?.disconnect(),this.#f=null,this.#g?.disconnect(),this.#g=null,this.#s.removeEventListener("scroll",this.#S),this.#e.removeEventListener("pointerenter",this.#$),this.#e.removeEventListener("pointerleave",this.#I),this.#e.removeEventListener("pointerdown",this.#z),this.#t.removeEventListener("pointerdown",this.#A),this.#t.removeEventListener("pointermove",this.#N),this.#t.removeEventListener("pointerup",this.#_),this.#t.removeEventListener("pointercancel",this.#_)}attributeChangedCallback(t){this.#o&&(this.#D(),(t==="lines"||t==="size")&&(this.#h&&cancelAnimationFrame(this.#h),this.#h=requestAnimationFrame(()=>{this.#h=0,this.#x()})))}#j(){return this.getAttribute("size")||"md"}#F(){return this.getAttribute("color")||"#ffffff"}#R(){return this.hasAttribute("auto-hide")}#B(){return this.hasAttribute("show-track")}#U(){const t=parseInt(this.getAttribute("lines"),10);return Number.isFinite(t)&&t>0?t:14}#V(){return this.hasAttribute("bare")&&this.getAttribute("bare")!=="false"}#P(){const t=parseInt(this.getAttribute("max-height"),10);return Number.isFinite(t)?t:0}#Y(){return o[this.#j()]||o.md}#q(){return this.#F()==="#ffffff"?this.#C:u(this.#F())}#D(){const t=this.#V();this.#o.className=t?"vsr-sb vsr-sb--bare":"vsr-sb",t&&this.#P()?this.#s.style.maxHeight=`${this.#P()}px`:this.#s.style.maxHeight="";const s=this.#U();for(;this.#u.length<s;){const e=document.createElement("p");this.#d.appendChild(e),this.#u.push(e)}for(;this.#u.length>s;)this.#u.pop().remove();this.#u.forEach((e,i)=>{e.textContent=`${i+1}. A chunky pill thumb that glides inside a soft rounded capsule track. Full pill radius, generous padding, springy on hover. Toggle the capsule off for a floating pill instead.`}),this.#l(),this.#n()}#l(){const t=["vsr-sb__track"];this.#T&&t.push("vsr-sb__track--can-scroll"),this.#B()&&t.push("vsr-sb__track--capsule"),this.#R()&&!this.#v&&!this.#c&&!this.#i&&t.push("vsr-sb__track--hidden"),this.#e.className=t.join(" ")}#n(){const t=this.#c||this.#i?this.#Y()+3:this.#Y(),s=this.#c||this.#i?.95:.55;this.#t.style.height=`${this.#a}px`,this.#t.style.width=`${t}px`,this.#t.style.transform=`translate3d(0, ${this.#y}px, 0)`,this.#t.style.background=`rgb(${this.#q()} / ${s})`}#x(){const t=this.#s;if(!t)return;const s=t.clientHeight;this.#p=s-a*2;const e=t.scrollHeight>0?s/t.scrollHeight:1;this.#a=Math.max(d,this.#p*e);const i=t.scrollHeight-s,r=this.#p-this.#a;this.#y=i>0&&r>0?t.scrollTop/i*r:0,this.#T=i>1,this.#l(),this.#n()}#b(){this.#v=!0,this.#l(),this.#r&&(clearTimeout(this.#r),this.#r=0),this.#R()&&!this.#i&&!this.#c&&(this.#r=window.setTimeout(()=>{this.#v=!1,this.#l()},900))}}customElements.define("vs-scrollbar-rounded",b);
