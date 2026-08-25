const r=`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 200px;
    min-height: 220px;
    margin: 0;
    border: none;
    border-radius: 0;
    background: transparent;
    overflow: hidden;
    font-family: inherit;
  }
  :host([page]) {
    position: fixed;
    inset: 0;
    width: auto;
    height: auto;
    min-width: 0;
    min-height: 0;
    overflow: visible;
    pointer-events: none;
    z-index: 2147483600;
  }
  :host([disabled]) { display: none; }

  .hit { position: absolute; inset: 0; }
  :host(:not([page])) .hit { cursor: none; }
  :host([page]) .hit { display: none; }

  .dot, .ring {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 200ms ease;
    will-change: transform;
    transform: translate3d(-999px, -999px, 0);
  }
  .dot {
    width: var(--vs-cur-size, 8px);
    height: var(--vs-cur-size, 8px);
    background: var(--vs-cur-color, #fff);
  }
  .ring {
    width: var(--vs-cur-size-outer, 36px);
    height: var(--vs-cur-size-outer, 36px);
    border: 1.5px solid var(--vs-cur-color, #fff);
    box-sizing: border-box;
  }
  .dot.is-visible, .ring.is-visible { opacity: 1; }

  @media (prefers-reduced-motion: reduce) {
    .dot, .ring { transition: none; }
  }
`;class h extends HTMLElement{static observedAttributes=["page","size","size-outer","ease-outer","color","hide-native","disabled"];#a;#h;#n;#r=0;#o=!1;#l=!1;#p=!1;#m=!1;#c=matchMedia("(prefers-reduced-motion: reduce)").matches;#e={x:0,y:0};#i={x:0,y:0};#s={x:0,y:0};#u=1;#d=null;#f=0;#b=0;#g=0;#v=!0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=r,this.#a=document.createElement("div"),this.#a.className="hit",this.#n=document.createElement("div"),this.#n.className="ring",this.#h=document.createElement("div"),this.#h.className="dot",t.append(e,this.#a,this.#n,this.#h)}#y(t,e){const i=this.getAttribute(t);if(i==null)return e;const s=parseFloat(i);return Number.isFinite(s)?s:e}#H(t,e){const i=this.getAttribute(t);return i??e}#R(t,e){if(!this.hasAttribute(t))return e;const i=this.getAttribute(t);return i!=="false"&&i!=="0"}#S(t,e,i){return Math.max(e,Math.min(i,t))}get#t(){return{page:this.hasAttribute("page"),size:this.#y("size",8),sizeOuter:this.#y("size-outer",36),easeOuter:this.#S(this.#y("ease-outer",.15),.02,.6),color:this.#H("color",""),hideNative:this.#R("hide-native",!0),disabled:this.hasAttribute("disabled")}}connectedCallback(){this.#o=!1,this.#c=matchMedia("(prefers-reduced-motion: reduce)").matches,this.#z(),this.#A(),this.#E(),this.#a.addEventListener("pointermove",this.#C),this.#a.addEventListener("pointerleave",this.#$),document.addEventListener("pointermove",this.#M),document.addEventListener("mouseleave",this.#k),window.addEventListener("pointerdown",this.#F),window.addEventListener("pointerup",this.#O),document.addEventListener("visibilitychange",this.#P),this.#L()}disconnectedCallback(){this.#o=!0,cancelAnimationFrame(this.#r),this.#r=0,this.#d?.disconnect(),this.#d=null,this.#a.removeEventListener("pointermove",this.#C),this.#a.removeEventListener("pointerleave",this.#$),document.removeEventListener("pointermove",this.#M),document.removeEventListener("mouseleave",this.#k),window.removeEventListener("pointerdown",this.#F),window.removeEventListener("pointerup",this.#O),document.removeEventListener("visibilitychange",this.#P),this.#x()}attributeChangedCallback(t){this.#o||((t==="size"||t==="size-outer"||t==="color")&&this.#z(),(t==="page"||t==="hide-native"||t==="disabled")&&(this.#x(),this.#A(),t==="page"&&this.#E(),this.#L()))}#w(){if(this.#o||this.#t.page)return;const t=this.getBoundingClientRect();this.#f=t.width,this.#b=t.height}#E(){if(this.#t.page){this.#d?.disconnect(),this.#d=null,this.#l=!1,this.#h.classList.remove("is-visible"),this.#n.classList.remove("is-visible");return}this.#d||(this.#d=new ResizeObserver(()=>this.#w()),this.#d.observe(this)),this.#w(),this.#v=!0,this.#l||(this.#l=!0,this.#i.x=this.#s.x=this.#e.x=this.#f/2,this.#i.y=this.#s.y=this.#e.y=this.#b/2),this.#h.classList.add("is-visible"),this.#n.classList.add("is-visible")}#V(){this.#g+=.012;const t=this.#f||100,e=this.#b||100;this.#e.x=t*(.5+Math.cos(this.#g)*.3),this.#e.y=e*(.5+Math.sin(this.#g*1.4)*.28)}#z(){const t=this.#t;this.style.setProperty("--vs-cur-size",`${t.size}px`),this.style.setProperty("--vs-cur-size-outer",`${t.sizeOuter}px`),t.color?this.style.setProperty("--vs-cur-color",t.color):this.style.removeProperty("--vs-cur-color")}#A(){const t=this.#t;t.page&&t.hideNative&&!t.disabled?(document.documentElement.style.cursor="none",this.#m=!0):this.#x()}#x(){this.#m&&(document.documentElement.style.cursor="",this.#m=!1)}#C=t=>{if(this.#o||this.#t.page)return;this.#v=!1;const e=this.getBoundingClientRect();this.#N(t.clientX-e.left,t.clientY-e.top)};#M=t=>{this.#o||!this.#t.page||this.#t.disabled||t.pointerType&&t.pointerType!=="mouse"||this.#N(t.clientX,t.clientY)};#N(t,e){this.#e.x=t,this.#e.y=e,this.#l||(this.#l=!0,this.#i.x=this.#s.x=t,this.#i.y=this.#s.y=e,this.#h.classList.add("is-visible"),this.#n.classList.add("is-visible"))}#$=()=>{this.#v=!0};#k=()=>{this.#t.page&&(this.#l=!1,this.#h.classList.remove("is-visible"),this.#n.classList.remove("is-visible"))};#F=()=>{this.#p=!0};#O=()=>{this.#p=!1};#P=()=>this.#L();#L(){if(this.#o||this.#t.disabled){this.#B();return}const t=!document.hidden;t&&!this.#r?this.#r=requestAnimationFrame(this.#T):t||this.#B()}#B(){this.#r&&(cancelAnimationFrame(this.#r),this.#r=0)}#T=()=>{this.#r=0,!(this.#o||this.#t.disabled||document.hidden)&&(this.#q(),this.#r=requestAnimationFrame(this.#T))};#q(){!this.#t.page&&this.#v&&!this.#c&&this.#V();const t=this.#t,e=this.#c?1:.55,i=this.#c?1:t.easeOuter;this.#i.x+=(this.#e.x-this.#i.x)*e,this.#i.y+=(this.#e.y-this.#i.y)*e,this.#s.x+=(this.#e.x-this.#s.x)*i,this.#s.y+=(this.#e.y-this.#s.y)*i,this.#u+=((this.#p?.72:1)-this.#u)*.3,this.#h.style.transform=`translate3d(${this.#i.x}px, ${this.#i.y}px, 0) translate(-50%, -50%) scale(${this.#u})`,this.#n.style.transform=`translate3d(${this.#s.x}px, ${this.#s.y}px, 0) translate(-50%, -50%) scale(${this.#u})`}}customElements.define("vs-cursor",h);
