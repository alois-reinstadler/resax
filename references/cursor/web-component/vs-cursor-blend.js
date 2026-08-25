const d=`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 160px;
    min-height: 160px;
    margin: 0;
    border: none;
    background: transparent;
    overflow: hidden;
    font-family: inherit;
    container-type: inline-size; /* lets the stage adapt to card-sized boxes */
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

  .hit { position: absolute; inset: 0; z-index: 3; }
  :host(:not([page])) .hit { cursor: none; }
  :host([page]) .hit { display: none; }

  .circle,
  .ghost {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    will-change: transform;
    transition: opacity 200ms ease;
  }
  .circle {
    background: var(--vs-cur-color, #fff);
    mix-blend-mode: difference;
    z-index: 2;
  }
  /* the lagging ring only outlines the path — thin, so it reads as a wake */
  .ghost {
    border: 1.5px solid var(--vs-cur-color, #fff);
    mix-blend-mode: difference;
    z-index: 1;
  }
  .circle.is-visible { opacity: 1; }
  .ghost.is-visible { opacity: 0.5; }

  /* built-in demo stage (bounded mode only): half light, half dark, so the
     inversion is visible on both. Any light-DOM child replaces it. */
  .stage {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    pointer-events: none;
  }
  :host([page]) .stage { display: none; }
  .stage .half {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 0 clamp(14px, 6%, 28px);
    min-width: 0;
  }
  .stage .light { background: #f2f2f2; color: #0a0a0a; }
  .stage .dark { background: #0a0a0a; color: #f2f2f2; }
  .stage strong {
    font-size: clamp(14px, 5.5cqw, 21px);
    font-weight: 600;
    letter-spacing: -0.015em;
  }
  .stage span { font-size: 12px; line-height: 1.45; opacity: 0.62; }
  /* card-sized boxes: drop the body copy so the halves stay legible */
  @container (max-width: 360px) {
    .stage span { display: none; }
    .stage .half { gap: 8px; }
  }
  .stage .chip {
    align-self: flex-start;
    font-size: 11px;
    padding: 5px 11px;
    border-radius: 999px;
    border: 1px solid currentColor;
    opacity: 0.8;
  }
`;class u extends HTMLElement{static observedAttributes=["page","size","ease","grow-scale","squash","color","hide-native","disabled"];#a;#i;#s;#f;#l;#r=0;#h=!1;#c=!1;#m=!1;#b=!1;#u=matchMedia("(prefers-reduced-motion: reduce)").matches;#n={x:0,y:0};#e={x:0,y:0};#o={x:0,y:0};#p={x:0,y:0};#g=1;#E=0;#d=null;#w=0;#L=0;#C=0;#v=!0;#y=[];constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=d,this.#f=document.createElement("div"),this.#f.className="stage",this.#l=document.createElement("slot"),this.#l.append(this.#S("light","Light side","The disc subtracts what is under it, so it turns dark here.","invert"),this.#S("dark","Dark side","Same disc, same color — the background decides what you see.","no config")),this.#f.append(this.#l),this.#s=document.createElement("div"),this.#s.className="ghost",this.#i=document.createElement("div"),this.#i.className="circle",this.#a=document.createElement("div"),this.#a.className="hit",t.append(e,this.#f,this.#s,this.#i,this.#a)}#S(t,e,s,i){const h=document.createElement("div");h.className=`half ${t}`;const r=document.createElement("strong");r.textContent=e;const o=document.createElement("span");o.textContent=s;const n=document.createElement("div");return n.className="chip",n.textContent=i,n.setAttribute("data-cursor-grow",""),h.append(r,o,n),h}#x(t,e){const s=this.getAttribute(t);if(s==null)return e;const i=parseFloat(s);return Number.isFinite(i)?i:e}#j(t,e){const s=this.getAttribute(t);return s??e}#W(t,e){if(!this.hasAttribute(t))return e;const s=this.getAttribute(t);return s!=="false"&&s!=="0"}#z(t,e,s){return Math.max(e,Math.min(s,t))}get#t(){return{page:this.hasAttribute("page"),size:this.#x("size",28),ease:this.#z(this.#x("ease",.35),.05,1),growScale:this.#z(this.#x("grow-scale",2.2),1,4),squash:this.#z(this.#x("squash",.6),0,1),color:this.#j("color",""),hideNative:this.#W("hide-native",!0),disabled:this.hasAttribute("disabled")}}connectedCallback(){this.#h=!1,this.#u=matchMedia("(prefers-reduced-motion: reduce)").matches,this.#B(),this.#F(),this.#P(),this.#q(),this.#A(),this.#a.addEventListener("pointermove",this.#O),this.#a.addEventListener("pointerleave",this.#G),document.addEventListener("pointermove",this.#D),document.addEventListener("mouseleave",this.#V),document.addEventListener("pointerover",this.#R),document.addEventListener("pointerout",this.#T),document.addEventListener("visibilitychange",this.#X),this.#l.addEventListener("slotchange",this.#M),this.#$()}disconnectedCallback(){this.#h=!0,cancelAnimationFrame(this.#r),this.#r=0,this.#d?.disconnect(),this.#d=null,this.#a.removeEventListener("pointermove",this.#O),this.#a.removeEventListener("pointerleave",this.#G),document.removeEventListener("pointermove",this.#D),document.removeEventListener("mouseleave",this.#V),document.removeEventListener("pointerover",this.#R),document.removeEventListener("pointerout",this.#T),document.removeEventListener("visibilitychange",this.#X),this.#l.removeEventListener("slotchange",this.#M),this.#k()}attributeChangedCallback(t){this.#h||(t==="size"&&this.#B(),t==="color"&&this.#F(),(t==="page"||t==="hide-native"||t==="disabled")&&(this.#k(),this.#P(),t==="page"&&(this.#q(),this.#A()),this.#$()))}#M=()=>this.#A();#A(){if(this.#t.page){this.#y=[];return}const t=this.#l.assignedElements({flatten:!0}),e=t.length?t:Array.from(this.#l.children),s=[];for(const i of e)i.matches&&i.matches("[data-cursor-grow]")&&s.push(i),i.querySelectorAll&&s.push(...i.querySelectorAll("[data-cursor-grow]"));this.#y=s}#I(t,e){if(!this.#y.length)return!1;const s=this.getBoundingClientRect();for(const i of this.#y){const h=i.getBoundingClientRect(),r=h.left-s.left,o=h.top-s.top;if(t>=r&&t<=r+h.width&&e>=o&&e<=o+h.height)return!0}return!1}#N(){if(this.#h||this.#t.page)return;const t=this.getBoundingClientRect();this.#w=t.width,this.#L=t.height}#q(){if(this.#t.page){this.#d?.disconnect(),this.#d=null,this.#c=!1,this.#i.classList.remove("is-visible"),this.#s.classList.remove("is-visible");return}this.#d||(this.#d=new ResizeObserver(()=>this.#N()),this.#d.observe(this)),this.#N(),this.#v=!0,this.#c||(this.#c=!0,this.#e.x=this.#o.x=this.#n.x=this.#w/2,this.#e.y=this.#o.y=this.#n.y=this.#L/2),this.#i.classList.add("is-visible"),this.#s.classList.add("is-visible")}#J(){this.#C+=.012;const t=this.#w||100,e=this.#L||100;this.#n.x=t*(.5+Math.cos(this.#C)*.34),this.#n.y=e*(.5+Math.sin(this.#C*1.4)*.3)}#B(){const t=this.#t.size;this.#i.style.width=`${t}px`,this.#i.style.height=`${t}px`,this.#s.style.width=`${t}px`,this.#s.style.height=`${t}px`}#F(){const t=this.#t;t.color?this.style.setProperty("--vs-cur-color",t.color):this.style.removeProperty("--vs-cur-color")}#P(){const t=this.#t;t.page&&t.hideNative&&!t.disabled?(document.documentElement.style.cursor="none",this.#b=!0):this.#k()}#k(){this.#b&&(document.documentElement.style.cursor="",this.#b=!1)}#R=t=>{this.#h||!this.#t.page||t.target.closest&&t.target.closest("[data-cursor-grow]")&&(this.#m=!0)};#T=t=>{this.#h||!this.#t.page||t.target.closest&&t.target.closest("[data-cursor-grow]")&&(this.#m=!1)};#O=t=>{if(this.#h||this.#t.page)return;this.#v=!1;const e=this.getBoundingClientRect();this.#H(t.clientX-e.left,t.clientY-e.top)};#D=t=>{this.#h||!this.#t.page||this.#t.disabled||t.pointerType&&t.pointerType!=="mouse"||this.#H(t.clientX,t.clientY)};#H(t,e){this.#n.x=t,this.#n.y=e,this.#c||(this.#c=!0,this.#e.x=this.#o.x=t,this.#e.y=this.#o.y=e,this.#i.classList.add("is-visible"),this.#s.classList.add("is-visible"))}#G=()=>{this.#v=!0};#V=()=>{this.#t.page&&(this.#c=!1,this.#m=!1,this.#i.classList.remove("is-visible"),this.#s.classList.remove("is-visible"))};#X=()=>this.#$();#$(){if(this.#h||this.#t.disabled){this.#Y();return}const t=!document.hidden;t&&!this.#r?this.#r=requestAnimationFrame(this.#_):t||this.#Y()}#Y(){this.#r&&(cancelAnimationFrame(this.#r),this.#r=0)}#_=()=>{this.#r=0,!(this.#h||this.#t.disabled||document.hidden)&&(this.#K(),this.#r=requestAnimationFrame(this.#_))};#K(){const t=this.#t;!t.page&&this.#v&&!this.#u&&this.#J(),t.page||(this.#m=this.#I(this.#n.x,this.#n.y));const e=this.#u?1:t.ease,s=this.#e.x,i=this.#e.y;this.#e.x+=(this.#n.x-s)*e,this.#e.y+=(this.#n.y-i)*e,this.#p.x=this.#e.x-s,this.#p.y=this.#e.y-i;const h=this.#u?1:e*.4;this.#o.x+=(this.#e.x-this.#o.x)*h,this.#o.y+=(this.#e.y-this.#o.y)*h;const r=this.#m?t.growScale:1;this.#g+=(r-this.#g)*(this.#u?1:.18);const o=Math.hypot(this.#p.x,this.#p.y),n=this.#u?0:Math.min(o/26,1)*t.squash;o>.4&&(this.#E=Math.atan2(this.#p.y,this.#p.x));const a=this.#g*(1+n*.85),l=this.#g*(1-n*.42);this.#i.style.transform=`translate3d(${this.#e.x}px, ${this.#e.y}px, 0) translate(-50%, -50%) rotate(${this.#E}rad) scale(${a}, ${l})`;const c=this.#g*(1+n*1.5);this.#s.style.transform=`translate3d(${this.#o.x}px, ${this.#o.y}px, 0) translate(-50%, -50%) rotate(${this.#E}rad) scale(${c}, ${this.#g*(1-n*.5)})`,this.#s.style.opacity=this.#c?String(.16+n*.34):"0"}}customElements.define("vs-cursor-blend",u);
