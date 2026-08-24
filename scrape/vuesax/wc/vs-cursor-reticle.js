const h=`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 200px;
    min-height: 220px;
    margin: 0;
    border: none;
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

  .reticle {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    will-change: transform;
    transition: opacity 200ms ease, width 260ms cubic-bezier(.2,.9,.3,1.3), height 260ms cubic-bezier(.2,.9,.3,1.3);
  }
  .reticle.is-visible { opacity: 1; }

  .ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px dashed var(--vs-cur-color, #fff);
    animation: vs-cur-spin var(--vs-cur-spin, 7s) linear infinite;
  }
  .dot {
    position: absolute;
    top: 50%; left: 50%;
    width: 3px; height: 3px;
    margin: -1.5px 0 0 -1.5px;
    border-radius: 50%;
    background: var(--vs-cur-color, #fff);
  }
  .c {
    position: absolute;
    width: 7px;
    height: 7px;
    border-color: var(--vs-cur-color, #fff);
    border-style: solid;
    border-width: 0;
  }
  .c--tl { top: -4px; left: -4px; border-top-width: 1.5px; border-left-width: 1.5px; }
  .c--tr { top: -4px; right: -4px; border-top-width: 1.5px; border-right-width: 1.5px; }
  .c--bl { bottom: -4px; left: -4px; border-bottom-width: 1.5px; border-left-width: 1.5px; }
  .c--br { bottom: -4px; right: -4px; border-bottom-width: 1.5px; border-right-width: 1.5px; }

  @keyframes vs-cur-spin { to { transform: rotate(360deg); } }

  @media (prefers-reduced-motion: reduce) {
    .reticle { transition: none; }
    .ring { animation: none; }
  }
`;class a extends HTMLElement{static observedAttributes=["page","size","ease","grow-scale","spin","color","hide-native","disabled"];#n;#e;#r=0;#i=!1;#a=!1;#c=!1;#u=!1;#m=matchMedia("(prefers-reduced-motion: reduce)").matches;#o={x:0,y:0};#s={x:0,y:0};#h=null;#v=0;#b=0;#f=0;#l=!0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=h,this.#n=document.createElement("div"),this.#n.className="hit",this.#e=document.createElement("div"),this.#e.className="reticle";const i=document.createElement("div");i.className="ring";const s=document.createElement("div");s.className="dot";const o=["c--tl","c--tr","c--bl","c--br"].map(n=>{const r=document.createElement("div");return r.className=`c ${n}`,r});this.#e.append(i,s,...o),t.append(e,this.#n,this.#e)}#p(t,e){const i=this.getAttribute(t);if(i==null)return e;const s=parseFloat(i);return Number.isFinite(s)?s:e}#S(t,e){const i=this.getAttribute(t);return i??e}#T(t,e){if(!this.hasAttribute(t))return e;const i=this.getAttribute(t);return i!=="false"&&i!=="0"}#y(t,e,i){return Math.max(e,Math.min(i,t))}get#t(){return{page:this.hasAttribute("page"),size:this.#p("size",34),ease:this.#y(this.#p("ease",.3),.05,.9),growScale:this.#y(this.#p("grow-scale",1.6),1,3),spin:this.#p("spin",7),color:this.#S("color",""),hideNative:this.#T("hide-native",!0),disabled:this.hasAttribute("disabled")}}connectedCallback(){this.#i=!1,this.#m=matchMedia("(prefers-reduced-motion: reduce)").matches,this.#d(),this.#L(),this.#E(),this.#n.addEventListener("pointermove",this.#N),this.#n.addEventListener("pointerleave",this.#k),document.addEventListener("pointermove",this.#z),document.addEventListener("mouseleave",this.#F),document.addEventListener("pointerover",this.#A),document.addEventListener("pointerout",this.#C),document.addEventListener("visibilitychange",this.#$),this.#x()}disconnectedCallback(){this.#i=!0,cancelAnimationFrame(this.#r),this.#r=0,this.#h?.disconnect(),this.#h=null,this.#n.removeEventListener("pointermove",this.#N),this.#n.removeEventListener("pointerleave",this.#k),document.removeEventListener("pointermove",this.#z),document.removeEventListener("mouseleave",this.#F),document.removeEventListener("pointerover",this.#A),document.removeEventListener("pointerout",this.#C),document.removeEventListener("visibilitychange",this.#$),this.#g()}attributeChangedCallback(t){this.#i||((t==="size"||t==="color"||t==="spin")&&this.#d(),(t==="page"||t==="hide-native"||t==="disabled")&&(this.#g(),this.#L(),t==="page"&&this.#E(),this.#x()))}#w(){if(this.#i||this.#t.page)return;const t=this.getBoundingClientRect();this.#v=t.width,this.#b=t.height}#E(){if(this.#t.page){this.#h?.disconnect(),this.#h=null,this.#a=!1,this.#e.classList.remove("is-visible");return}this.#h||(this.#h=new ResizeObserver(()=>this.#w()),this.#h.observe(this)),this.#w(),this.#l=!0,this.#a||(this.#a=!0,this.#s.x=this.#o.x=this.#v/2,this.#s.y=this.#o.y=this.#b/2),this.#e.classList.add("is-visible")}#H(){this.#f+=.012;const t=this.#v||100,e=this.#b||100;this.#o.x=t*(.5+Math.cos(this.#f)*.3),this.#o.y=e*(.5+Math.sin(this.#f*1.4)*.28)}#d(){const t=this.#t,e=t.size*(this.#c?t.growScale:1);this.#e.style.width=`${e}px`,this.#e.style.height=`${e}px`,this.style.setProperty("--vs-cur-spin",`${t.spin}s`),t.color?this.style.setProperty("--vs-cur-color",t.color):this.style.removeProperty("--vs-cur-color")}#L(){const t=this.#t;t.page&&t.hideNative&&!t.disabled?(document.documentElement.style.cursor="none",this.#u=!0):this.#g()}#g(){this.#u&&(document.documentElement.style.cursor="",this.#u=!1)}#A=t=>{this.#i||!this.#t.page||t.target.closest&&t.target.closest("[data-cursor-grow]")&&(this.#c=!0,this.#d())};#C=t=>{this.#i||!this.#t.page||t.target.closest&&t.target.closest("[data-cursor-grow]")&&(this.#c=!1,this.#d())};#N=t=>{if(this.#i||this.#t.page)return;this.#l=!1;const e=this.getBoundingClientRect();this.#M(t.clientX-e.left,t.clientY-e.top)};#z=t=>{this.#i||!this.#t.page||this.#t.disabled||t.pointerType&&t.pointerType!=="mouse"||this.#M(t.clientX,t.clientY)};#M(t,e){this.#o.x=t,this.#o.y=e,this.#a||(this.#a=!0,this.#s.x=t,this.#s.y=e,this.#e.classList.add("is-visible"))}#k=()=>{this.#l=!0};#F=()=>{this.#t.page&&(this.#a=!1,this.#c=!1,this.#e.classList.remove("is-visible"),this.#d())};#$=()=>this.#x();#x(){if(this.#i||this.#t.disabled){this.#B();return}const t=!document.hidden;t&&!this.#r?this.#r=requestAnimationFrame(this.#P):t||this.#B()}#B(){this.#r&&(cancelAnimationFrame(this.#r),this.#r=0)}#P=()=>{this.#r=0,!(this.#i||this.#t.disabled||document.hidden)&&(this.#O(),this.#r=requestAnimationFrame(this.#P))};#O(){!this.#t.page&&this.#l&&!this.#m&&this.#H();const t=this.#m?1:this.#t.ease;this.#s.x+=(this.#o.x-this.#s.x)*t,this.#s.y+=(this.#o.y-this.#s.y)*t,this.#e.style.transform=`translate3d(${this.#s.x}px, ${this.#s.y}px, 0) translate(-50%, -50%)`}}customElements.define("vs-cursor-reticle",a);
