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

  .pill {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
    padding: 0;
    border-radius: 50%;
    background: var(--vs-cur-color, #fff);
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    will-change: transform;
    transition:
      opacity 180ms ease,
      width 260ms cubic-bezier(.16,1,.3,1),
      height 260ms cubic-bezier(.16,1,.3,1),
      padding 260ms cubic-bezier(.16,1,.3,1),
      border-radius 260ms ease;
  }
  .pill.is-visible { opacity: 1; }
  .pill.is-active { border-radius: 999px; }

  .label {
    color: var(--vs-cur-fg, #000);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    white-space: nowrap;
    opacity: 0;
    transform: scale(0.6);
    transition: opacity 160ms ease 40ms, transform 240ms cubic-bezier(.34,1.56,.64,1) 40ms;
  }
  .pill.is-active .label { opacity: 1; transform: scale(1); }

  @media (prefers-reduced-motion: reduce) {
    .pill, .label { transition: none; }
  }
`;class r extends HTMLElement{static observedAttributes=["page","size","pill-height","ease","color","fg","hide-native","disabled"];#n;#e;#c;#h=0;#i=!1;#l=!1;#p=!1;#m=matchMedia("(prefers-reduced-motion: reduce)").matches;#r={x:0,y:0};#s={x:0,y:0};#o=null;#a=null;#v=0;#f=0;#g=0;#d=!0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=h,this.#n=document.createElement("div"),this.#n.className="hit",this.#e=document.createElement("div"),this.#e.className="pill",this.#c=document.createElement("span"),this.#c.className="label",this.#e.append(this.#c),t.append(e,this.#n,this.#e)}#b(t,e){const i=this.getAttribute(t);if(i==null)return e;const s=parseFloat(i);return Number.isFinite(s)?s:e}#L(t,e){const i=this.getAttribute(t);return i??e}#O(t,e){if(!this.hasAttribute(t))return e;const i=this.getAttribute(t);return i!=="false"&&i!=="0"}#S(t,e,i){return Math.max(e,Math.min(i,t))}get#t(){return{page:this.hasAttribute("page"),size:this.#b("size",10),pillHeight:this.#b("pill-height",40),ease:this.#S(this.#b("ease",.3),.05,.8),color:this.#L("color",""),fg:this.#L("fg",""),hideNative:this.#O("hide-native",!0),disabled:this.hasAttribute("disabled")}}connectedCallback(){this.#i=!1,this.#m=matchMedia("(prefers-reduced-motion: reduce)").matches,this.#u(),this.#z(),this.#A(),this.#w(),this.#n.addEventListener("pointermove",this.#N),this.#n.addEventListener("pointerleave",this.#F),document.addEventListener("pointermove",this.#k),document.addEventListener("mouseleave",this.#P),document.addEventListener("pointerover",this.#C),document.addEventListener("pointerout",this.#M),document.addEventListener("visibilitychange",this.#$),this.#x()}disconnectedCallback(){this.#i=!0,cancelAnimationFrame(this.#h),this.#h=0,this.#a?.disconnect(),this.#a=null,this.#n.removeEventListener("pointermove",this.#N),this.#n.removeEventListener("pointerleave",this.#F),document.removeEventListener("pointermove",this.#k),document.removeEventListener("mouseleave",this.#P),document.removeEventListener("pointerover",this.#C),document.removeEventListener("pointerout",this.#M),document.removeEventListener("visibilitychange",this.#$),this.#y()}attributeChangedCallback(t){this.#i||(t==="size"&&!this.#o&&this.#u(),(t==="color"||t==="fg")&&this.#z(),(t==="page"||t==="hide-native"||t==="disabled")&&(this.#y(),this.#A(),t==="page"&&this.#w(),this.#x()))}#E(){if(this.#i||this.#t.page)return;const t=this.getBoundingClientRect();this.#v=t.width,this.#f=t.height}#w(){if(this.#t.page){this.#a?.disconnect(),this.#a=null,this.#l=!1,this.#e.classList.remove("is-visible");return}this.#a||(this.#a=new ResizeObserver(()=>this.#E()),this.#a.observe(this)),this.#E(),this.#d=!0,this.#l||(this.#l=!0,this.#s.x=this.#r.x=this.#v/2,this.#s.y=this.#r.y=this.#f/2),this.#e.classList.add("is-visible")}#R(){this.#g+=.012;const t=this.#v||100,e=this.#f||100;this.#r.x=t*(.5+Math.cos(this.#g)*.3),this.#r.y=e*(.5+Math.sin(this.#g*1.4)*.28)}#u(){if(this.#o)return;const t=this.#t.size;this.#e.style.width=`${t}px`,this.#e.style.height=`${t}px`,this.#e.style.padding="0"}#z(){const t=this.#t;t.color?this.style.setProperty("--vs-cur-color",t.color):this.style.removeProperty("--vs-cur-color"),t.fg?this.style.setProperty("--vs-cur-fg",t.fg):this.style.removeProperty("--vs-cur-fg")}#A(){const t=this.#t;t.page&&t.hideNative&&!t.disabled?(document.documentElement.style.cursor="none",this.#p=!0):this.#y()}#y(){this.#p&&(document.documentElement.style.cursor="",this.#p=!1)}#C=t=>{if(this.#i||!this.#t.page)return;const e=t.target.closest&&t.target.closest("[data-cursor-text]");e&&(this.#o=e,this.#c.textContent=e.getAttribute("data-cursor-text")||"",this.#e.style.height=`${this.#t.pillHeight}px`,this.#e.style.padding=`0 ${this.#t.pillHeight*.45}px`,this.#e.classList.add("is-active"))};#M=t=>{this.#i||!this.#t.page||this.#o&&t.target.closest&&t.target.closest("[data-cursor-text]")===this.#o&&(this.#o=null,this.#e.classList.remove("is-active"),this.#u())};#N=t=>{if(this.#i||this.#t.page)return;this.#d=!1;const e=this.getBoundingClientRect();this.#H(t.clientX-e.left,t.clientY-e.top)};#k=t=>{this.#i||!this.#t.page||this.#t.disabled||t.pointerType&&t.pointerType!=="mouse"||this.#H(t.clientX,t.clientY)};#H(t,e){this.#r.x=t,this.#r.y=e,this.#l||(this.#l=!0,this.#s.x=t,this.#s.y=e,this.#e.classList.add("is-visible"))}#F=()=>{this.#d=!0};#P=()=>{this.#t.page&&(this.#l=!1,this.#o=null,this.#e.classList.remove("is-visible","is-active"),this.#u())};#$=()=>this.#x();#x(){if(this.#i||this.#t.disabled){this.#B();return}const t=!document.hidden;t&&!this.#h?this.#h=requestAnimationFrame(this.#T):t||this.#B()}#B(){this.#h&&(cancelAnimationFrame(this.#h),this.#h=0)}#T=()=>{this.#h=0,!(this.#i||this.#t.disabled||document.hidden)&&(this.#q(),this.#h=requestAnimationFrame(this.#T))};#q(){!this.#t.page&&this.#d&&!this.#m&&this.#R();const t=this.#m?1:this.#t.ease;this.#s.x+=(this.#r.x-this.#s.x)*t,this.#s.y+=(this.#r.y-this.#s.y)*t,this.#e.style.transform=`translate3d(${this.#s.x}px, ${this.#s.y}px, 0) translate(-50%, -50%)`}}customElements.define("vs-cursor-label",r);
