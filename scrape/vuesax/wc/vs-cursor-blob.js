const u=`
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

  .blob {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    background: var(--vs-cur-color, #fff);
    pointer-events: none;
    opacity: 0;
    will-change: transform;
    transition: opacity 200ms ease;
  }
  .blob.is-visible { opacity: 1; }

  @media (prefers-reduced-motion: reduce) {
    .blob { transition: none; }
  }
`;class p extends HTMLElement{static observedAttributes=["page","size","ease","sensitivity","max-stretch","color","hide-native","disabled"];#a;#e;#s=0;#h=!1;#c=!1;#v=!1;#d=matchMedia("(prefers-reduced-motion: reduce)").matches;#n={x:0,y:0};#t={x:0,y:0};#o={x:0,y:0};#r={x:0,y:0};#l=null;#m=0;#b=0;#y=0;#u=!0;constructor(){super();const t=this.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=u,this.#a=document.createElement("div"),this.#a.className="hit",this.#e=document.createElement("div"),this.#e.className="blob",t.append(i,this.#a,this.#e)}#p(t,i){const e=this.getAttribute(t);if(e==null)return i;const s=parseFloat(e);return Number.isFinite(s)?s:i}#T(t,i){const e=this.getAttribute(t);return e??i}#q(t,i){if(!this.hasAttribute(t))return i;const e=this.getAttribute(t);return e!=="false"&&e!=="0"}#g(t,i,e){return Math.max(i,Math.min(e,t))}get#i(){return{page:this.hasAttribute("page"),size:this.#p("size",26),ease:this.#g(this.#p("ease",.35),.05,.9),sensitivity:this.#p("sensitivity",.015),maxStretch:this.#g(this.#p("max-stretch",.9),.1,2),color:this.#T("color",""),hideNative:this.#q("hide-native",!0),disabled:this.hasAttribute("disabled")}}connectedCallback(){this.#h=!1,this.#d=matchMedia("(prefers-reduced-motion: reduce)").matches,this.#w(),this.#M(),this.#A(),this.#E(),this.#a.addEventListener("pointermove",this.#C),this.#a.addEventListener("pointerleave",this.#N),document.addEventListener("pointermove",this.#z),document.addEventListener("mouseleave",this.#$),document.addEventListener("visibilitychange",this.#B),this.#x()}disconnectedCallback(){this.#h=!0,cancelAnimationFrame(this.#s),this.#s=0,this.#l?.disconnect(),this.#l=null,this.#a.removeEventListener("pointermove",this.#C),this.#a.removeEventListener("pointerleave",this.#N),document.removeEventListener("pointermove",this.#z),document.removeEventListener("mouseleave",this.#$),document.removeEventListener("visibilitychange",this.#B),this.#f()}attributeChangedCallback(t){this.#h||(t==="size"&&this.#w(),t==="color"&&this.#M(),(t==="page"||t==="hide-native"||t==="disabled")&&(this.#f(),this.#A(),t==="page"&&this.#E(),this.#x()))}#L(){if(this.#h||this.#i.page)return;const t=this.getBoundingClientRect();this.#m=t.width,this.#b=t.height}#E(){if(this.#i.page){this.#l?.disconnect(),this.#l=null,this.#c=!1,this.#e.classList.remove("is-visible");return}this.#l||(this.#l=new ResizeObserver(()=>this.#L()),this.#l.observe(this)),this.#L(),this.#u=!0,this.#c||(this.#c=!0,this.#t.x=this.#o.x=this.#n.x=this.#m/2,this.#t.y=this.#o.y=this.#n.y=this.#b/2),this.#e.classList.add("is-visible")}#H(){this.#y+=.02;const t=this.#m||100,i=this.#b||100;this.#n.x=t*(.5+Math.cos(this.#y)*.3),this.#n.y=i*(.5+Math.sin(this.#y*1.4)*.28)}#w(){const t=this.#i.size;this.#e.style.width=`${t}px`,this.#e.style.height=`${t}px`}#M(){const t=this.#i;t.color?this.style.setProperty("--vs-cur-color",t.color):this.style.removeProperty("--vs-cur-color")}#A(){const t=this.#i;t.page&&t.hideNative&&!t.disabled?(document.documentElement.style.cursor="none",this.#v=!0):this.#f()}#f(){this.#v&&(document.documentElement.style.cursor="",this.#v=!1)}#C=t=>{if(this.#h||this.#i.page)return;this.#u=!1;const i=this.getBoundingClientRect();this.#k(t.clientX-i.left,t.clientY-i.top)};#z=t=>{this.#h||!this.#i.page||this.#i.disabled||t.pointerType&&t.pointerType!=="mouse"||this.#k(t.clientX,t.clientY)};#k(t,i){this.#n.x=t,this.#n.y=i,this.#c||(this.#c=!0,this.#t.x=this.#o.x=t,this.#t.y=this.#o.y=i,this.#e.classList.add("is-visible"))}#N=()=>{this.#u=!0};#$=()=>{this.#i.page&&(this.#c=!1,this.#e.classList.remove("is-visible"))};#B=()=>this.#x();#x(){if(this.#h||this.#i.disabled){this.#F();return}const t=!document.hidden;t&&!this.#s?this.#s=requestAnimationFrame(this.#S):t||this.#F()}#F(){this.#s&&(cancelAnimationFrame(this.#s),this.#s=0)}#S=()=>{this.#s=0,!(this.#h||this.#i.disabled||document.hidden)&&(this.#P(),this.#s=requestAnimationFrame(this.#S))};#P(){!this.#i.page&&this.#u&&!this.#d&&this.#H();const t=this.#i,i=this.#d?1:t.ease;this.#o.x=this.#t.x,this.#o.y=this.#t.y,this.#t.x+=(this.#n.x-this.#t.x)*i,this.#t.y+=(this.#n.y-this.#t.y)*i;const e=this.#t.x-this.#o.x,s=this.#t.y-this.#o.y,a=e,l=s;this.#r.x+=(a-this.#r.x)*.35,this.#r.y+=(l-this.#r.y)*.35;let h=1,n=1,o=0;if(!this.#d){const c=Math.hypot(this.#r.x,this.#r.y),r=1+Math.min(c*t.sensitivity,t.maxStretch),d=1/Math.sqrt(r);o=Math.atan2(this.#r.y,this.#r.x),h=r,n=d}this.#e.style.transform=`translate3d(${this.#t.x}px, ${this.#t.y}px, 0) translate(-50%, -50%) rotate(${o}rad) scale(${h}, ${n})`}}customElements.define("vs-cursor-blob",p);
