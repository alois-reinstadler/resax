const S=`
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

  .plate {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background: var(--vs-cur-color, #fff);
    opacity: 0;
    pointer-events: none;
    will-change: transform, width, height, border-radius;
    transition: opacity 200ms ease;
  }
  .plate.is-visible { opacity: 1; }
  /* snapped: the plate becomes a translucent highlight over the element */
  .plate.is-snapped { opacity: 0.16; }

  /* field ring: shows the attraction radius reaching a target */
  .ring {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    border-radius: 50%;
    border: 1px solid var(--vs-cur-color, #fff);
    opacity: 0;
    pointer-events: none;
    will-change: transform, opacity;
  }

  /* built-in demo stage (bounded mode only). Any light-DOM child replaces it. */
  .stage {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 14px;
    padding: 0 24px;
    color: #fff;
    pointer-events: none;
  }
  :host([page]) .stage { display: none; }
  .stage .pill {
    padding: 11px 22px;
    border-radius: 999px;
    border: 1px solid rgb(255 255 255 / 0.16);
    background: rgb(255 255 255 / 0.04);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.01em;
    will-change: transform;
  }
  .stage .pill.wide { border-radius: 14px; padding: 14px 26px; }
  .stage .hint { font-size: 11px; opacity: 0.4; letter-spacing: 0.04em; text-transform: uppercase; }
  /* thumbnail-sized boxes: two targets, tighter, so nothing spills out */
  @container (max-width: 300px) {
    .stage { gap: 9px; padding: 0 12px; }
    .stage .pill { padding: 7px 14px; font-size: 11px; }
    .stage .pill.wide { padding: 9px 16px; border-radius: 11px; }
    .stage .pill:nth-of-type(3),
    .stage .hint { display: none; }
  }
`;class N extends HTMLElement{static observedAttributes=["page","size","padding","ease","pull","radius","color","hide-native","disabled"];#a;#e;#h;#x;#r;#n=0;#s=!1;#l=!1;#A=!1;#m=matchMedia("(prefers-reduced-motion: reduce)").matches;#o={x:0,y:0};#i={x:0,y:0};#c=0;#p=0;#y=999;#w=[];#f=null;#k=-1e9;#d=null;#M=0;#z=0;#C=0;#E=!0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=S,this.#x=document.createElement("div"),this.#x.className="stage",this.#r=document.createElement("slot");const s=document.createElement("div");s.className="hint",s.textContent="they pull back",this.#r.append(this.#S("Get started",!0),this.#S("Documentation",!1),this.#S("Pricing",!1),s),this.#x.append(this.#r),this.#h=document.createElement("div"),this.#h.className="ring",this.#e=document.createElement("div"),this.#e.className="plate",this.#a=document.createElement("div"),this.#a.className="hit",t.append(e,this.#x,this.#h,this.#e,this.#a)}#S(t,e){const s=document.createElement("div");return s.className=e?"pill wide":"pill",s.textContent=t,s.setAttribute("data-cursor-magnet",""),s}#b(t,e){const s=this.getAttribute(t);if(s==null)return e;const h=parseFloat(s);return Number.isFinite(h)?h:e}#I(t,e){const s=this.getAttribute(t);return s??e}#W(t,e){if(!this.hasAttribute(t))return e;const s=this.getAttribute(t);return s!=="false"&&s!=="0"}#v(t,e,s){return Math.max(e,Math.min(s,t))}get#t(){return{page:this.hasAttribute("page"),size:this.#b("size",12),padding:this.#b("padding",10),ease:this.#v(this.#b("ease",.22),.05,.8),pull:this.#v(this.#b("pull",14),0,60),radius:this.#v(this.#b("radius",130),0,500),color:this.#I("color",""),hideNative:this.#W("hide-native",!0),disabled:this.hasAttribute("disabled")}}connectedCallback(){this.#s=!1,this.#m=matchMedia("(prefers-reduced-motion: reduce)").matches,this.#c=this.#p=this.#t.size,this.#O(),this.#P(),this.#T(),this.#g(!0),this.#a.addEventListener("pointermove",this.#H),this.#a.addEventListener("pointerleave",this.#X),document.addEventListener("pointermove",this.#Y),document.addEventListener("mouseleave",this.#G),document.addEventListener("visibilitychange",this.#V),window.addEventListener("resize",this.#L,{passive:!0}),window.addEventListener("scroll",this.#L,{passive:!0,capture:!0}),this.#r.addEventListener("slotchange",this.#R),this.#$()}disconnectedCallback(){this.#s=!0,cancelAnimationFrame(this.#n),this.#n=0,this.#u&&(cancelAnimationFrame(this.#u),this.#u=0),this.#d?.disconnect(),this.#d=null,this.#a.removeEventListener("pointermove",this.#H),this.#a.removeEventListener("pointerleave",this.#X),document.removeEventListener("pointermove",this.#Y),document.removeEventListener("mouseleave",this.#G),document.removeEventListener("visibilitychange",this.#V),window.removeEventListener("resize",this.#L),window.removeEventListener("scroll",this.#L,{capture:!0}),this.#r.removeEventListener("slotchange",this.#R),this.#N(),this.#F()}attributeChangedCallback(t){this.#s||(t==="color"&&this.#O(),t==="size"&&!this.#f&&(this.#c=this.#p=this.#t.size,this.#y=999),(t==="page"||t==="hide-native"||t==="disabled")&&(this.#N(),this.#F(),this.#P(),t==="page"&&(this.#T(),this.#g(!0)),this.#$()))}#R=()=>this.#g(!0);#u=0;#L=()=>{this.#u||this.#s||(this.#u=requestAnimationFrame(()=>{this.#u=0,this.#g(!0)}))};#g(t){if(this.#s)return;const e=performance.now();if(!t&&e-this.#k<500)return;this.#k=e;const s=this.#t;let h;if(s.page)h=Array.from(document.querySelectorAll("[data-cursor-magnet]"));else{const o=this.#r.assignedElements({flatten:!0}),r=o.length?o:Array.from(this.#r.children);h=[];for(const l of r)l.matches&&l.matches("[data-cursor-magnet]")&&h.push(l),l.querySelectorAll&&h.push(...l.querySelectorAll("[data-cursor-magnet]"))}const n=s.page?{left:0,top:0}:this.getBoundingClientRect(),a=new Map(this.#w.map(o=>[o.el,o])),c=[];for(const o of h){const r=a.get(o),l=o.style.transform;r&&r.off&&(o.style.transform=r.prev??"");const d=o.getBoundingClientRect();r&&r.off&&(o.style.transform=l);const p=getComputedStyle(o);c.push({el:o,prev:r?r.prev:o.style.transform||"",off:r?r.off:{x:0,y:0},base:{x:d.left-n.left,y:d.top-n.top,w:d.width,h:d.height,r:parseFloat(p.borderTopLeftRadius)||0}}),a.delete(o)}for(const o of a.values())this.#B(o);this.#w=c,this.#f&&!c.some(o=>o.el===this.#f.el)&&(this.#f=null)}#B(t){t&&(t.off.x=t.off.y=0,t.el.isConnected&&(t.el.style.transform=t.prev||""))}#N(){for(const t of this.#w)this.#B(t);this.#f=null,this.#e.classList.remove("is-snapped")}#q(){if(this.#s||this.#t.page)return;const t=this.getBoundingClientRect();this.#M=t.width,this.#z=t.height,this.#g(!0)}#T(){if(this.#t.page){this.#d?.disconnect(),this.#d=null,this.#l=!1,this.#e.classList.remove("is-visible");return}this.#d||(this.#d=new ResizeObserver(()=>this.#q()),this.#d.observe(this)),this.#q(),this.#E=!0,this.#l||(this.#l=!0,this.#i.x=this.#o.x=this.#M/2,this.#i.y=this.#o.y=this.#z/2),this.#e.classList.add("is-visible")}#J(){this.#C+=.009;const t=this.#M||100,e=this.#z||100;this.#o.x=t*(.5+Math.cos(this.#C)*.26),this.#o.y=e*(.5+Math.sin(this.#C*.7)*.34)}#O(){const t=this.#t;t.color?this.style.setProperty("--vs-cur-color",t.color):this.style.removeProperty("--vs-cur-color")}#P(){const t=this.#t;t.page&&t.hideNative&&!t.disabled?(document.documentElement.style.cursor="none",this.#A=!0):this.#F()}#F(){this.#A&&(document.documentElement.style.cursor="",this.#A=!1)}#H=t=>{if(this.#s||this.#t.page)return;this.#E=!1;const e=this.getBoundingClientRect();this.#D(t.clientX-e.left,t.clientY-e.top)};#Y=t=>{this.#s||!this.#t.page||this.#t.disabled||t.pointerType&&t.pointerType!=="mouse"||(this.#g(!1),this.#D(t.clientX,t.clientY))};#D(t,e){this.#o.x=t,this.#o.y=e,this.#l||(this.#l=!0,this.#i.x=t,this.#i.y=e,this.#e.classList.add("is-visible"))}#X=()=>{this.#E=!0};#G=()=>{this.#t.page&&(this.#l=!1,this.#N(),this.#e.classList.remove("is-visible"))};#V=()=>this.#$();#$(){if(this.#s||this.#t.disabled){this.#_();return}const t=!document.hidden;t&&!this.#n?this.#n=requestAnimationFrame(this.#j):t||this.#_()}#_(){this.#n&&(cancelAnimationFrame(this.#n),this.#n=0)}#j=()=>{this.#n=0,!(this.#s||this.#t.disabled||document.hidden)&&(this.#K(),this.#n=requestAnimationFrame(this.#j))};#K(){const t=this.#t;!t.page&&this.#E&&!this.#m&&this.#J();const e=this.#o.x,s=this.#o.y,h=this.#m?1:.18;let n=null,a=0,c=1/0;for(const i of this.#w){const g=i.base.x+i.base.w/2+i.off.x,f=i.base.y+i.base.h/2+i.off.y,y=e-g,w=s-f,E=Math.hypot(y,w),L=Math.max(0,Math.abs(e-g)-i.base.w/2-t.padding),A=Math.max(0,Math.abs(s-f)-i.base.h/2-t.padding),M=Math.hypot(L,A),u=t.radius>0?Math.max(0,1-M/t.radius)**2:0,z=u*this.#v(y,-t.pull,t.pull),C=u*this.#v(w,-t.pull,t.pull);i.off.x+=(z-i.off.x)*h,i.off.y+=(C-i.off.y)*h,Math.abs(i.off.x)<.05&&Math.abs(i.off.y)<.05&&(i.off.x=i.off.y=0),i.el.style.transform=i.off.x||i.off.y?`${i.prev?i.prev+" ":""}translate3d(${i.off.x.toFixed(2)}px, ${i.off.y.toFixed(2)}px, 0)`:i.prev||"",(u>a||u===a&&E<c)&&(n=i,a=u,c=E)}const o=n&&a>0&&this.#Q(n,e,s,t.padding);this.#f=o?n:null,this.#e.classList.toggle("is-snapped",!!o);let r=e,l=s,d=t.size,p=t.size,b=999;if(o)r=n.base.x+n.base.w/2+n.off.x,l=n.base.y+n.base.h/2+n.off.y,d=n.base.w+t.padding*2,p=n.base.h+t.padding*2,b=n.base.r>0?n.base.r+t.padding:16;else if(n&&a>0){const i=n.base.x+n.base.w/2+n.off.x,g=n.base.y+n.base.h/2+n.off.y,f=a*.4;r=e+(i-e)*f,l=s+(g-s)*f,d=p=t.size*(1+a*.6)}const v=this.#m?1:t.ease,m=this.#m?1:.24;this.#i.x+=(r-this.#i.x)*v,this.#i.y+=(l-this.#i.y)*v,this.#c+=(d-this.#c)*m,this.#p+=(p-this.#p)*m,this.#y+=(b-this.#y)*m,this.#e.style.width=`${this.#c}px`,this.#e.style.height=`${this.#p}px`,this.#e.style.borderRadius=`${Math.min(this.#y,this.#c/2,this.#p/2)}px`,this.#e.style.transform=`translate3d(${this.#i.x}px, ${this.#i.y}px, 0) translate(-50%, -50%)`;const x=!o&&a>.02;if(this.#h.style.opacity=this.#l&&x?String(.05+a*.22):"0",x){const i=t.radius*(1.25-a*.55);this.#h.style.width=`${i}px`,this.#h.style.height=`${i}px`,this.#h.style.transform=`translate3d(${e}px, ${s}px, 0) translate(-50%, -50%)`}}#Q(t,e,s,h){const n=t.base.x+t.off.x-h,a=t.base.y+t.off.y-h;return e>=n&&e<=n+t.base.w+h*2&&s>=a&&s<=a+t.base.h+h*2}}customElements.define("vs-cursor-magnet",N);
