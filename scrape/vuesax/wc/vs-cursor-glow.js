const p=`
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

  canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: none;
    mix-blend-mode: screen;
    opacity: 0;
    transition: opacity 260ms ease;
  }
  canvas.is-visible { opacity: 1; }

  .hit { position: absolute; inset: 0; z-index: 2; }
  :host(:not([page])) .hit { cursor: none; }
  :host([page]) .hit { display: none; }

  /* built-in demo stage (bounded mode only): dim content for the light to
     reveal. Any light-DOM child replaces it. */
  .stage {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 0 clamp(18px, 9%, 44px);
    color: #fff;
    pointer-events: none;
  }
  :host([page]) .stage { display: none; }
  .stage h3 {
    margin: 0;
    font-size: clamp(19px, 9cqw, 34px);
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .stage p { margin: 0; font-size: 13px; line-height: 1.5; opacity: 0.62; max-width: 34ch; }
  .stage .keys { display: flex; gap: 6px; opacity: 0.7; }
  .stage .keys span {
    font-size: 11px;
    padding: 4px 9px;
    border-radius: 999px;
    border: 1px solid currentColor;
  }
  /* card-sized boxes: headline + tags only */
  @container (max-width: 360px) {
    .stage p { display: none; }
  }
`;class u extends HTMLElement{static observedAttributes=["page","size","ease","intensity","trail","color","hide-native","disabled"];#h;#i;#l;#v;#A;#c=null;#T="";#n=0;#o=!1;#a=!1;#M=!1;#d=matchMedia("(prefers-reduced-motion: reduce)").matches;#s={x:0,y:0};#e={x:0,y:0};#g={x:0,y:0};#z=new Array(40);#p=0;#f=0;#r=null;#b=0;#y=0;#u=1;#w=0;#x=!0;#C=[255,255,255];constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=p,this.#v=document.createElement("div"),this.#v.className="stage",this.#A=document.createElement("slot");const i=document.createElement("h3");i.textContent="Light follows you";const n=document.createElement("p");n.textContent="The trail is the last few pointer samples stamped back additively — slow moves pool, fast moves smear.";const s=document.createElement("div");s.className="keys";for(const o of["additive","velocity stretch","canvas"]){const h=document.createElement("span");h.textContent=o,s.append(h)}this.#A.append(i,n,s),this.#v.append(this.#A),this.#i=document.createElement("canvas"),this.#h=document.createElement("div"),this.#h.className="hit",t.append(e,this.#v,this.#i,this.#h)}#E(t,e){const i=this.getAttribute(t);if(i==null)return e;const n=parseFloat(i);return Number.isFinite(n)?n:e}#j(t,e){const i=this.getAttribute(t);return i??e}#q(t,e){if(!this.hasAttribute(t))return e;const i=this.getAttribute(t);return i!=="false"&&i!=="0"}#L(t,e,i){return Math.max(e,Math.min(i,t))}get#t(){return{page:this.hasAttribute("page"),size:this.#E("size",220),ease:this.#L(this.#E("ease",.14),.02,.6),intensity:this.#L(this.#E("intensity",.28),.05,1),trail:this.#L(this.#E("trail",.6),0,1),color:this.#j("color",""),hideNative:this.#q("hide-native",!0),disabled:this.hasAttribute("disabled")}}connectedCallback(){this.#o=!1,this.#d=matchMedia("(prefers-reduced-motion: reduce)").matches,this.#l=this.#i.getContext("2d"),this.#I(),this.#P(),this.#k(),this.#h.addEventListener("pointermove",this.#_),this.#h.addEventListener("pointerleave",this.#N),document.addEventListener("pointermove",this.#F),document.addEventListener("mouseleave",this.#H),window.addEventListener("resize",this.#$,{passive:!0}),document.addEventListener("visibilitychange",this.#O),this.#S()}disconnectedCallback(){this.#o=!0,cancelAnimationFrame(this.#n),this.#n=0,this.#r?.disconnect(),this.#r=null,this.#h.removeEventListener("pointermove",this.#_),this.#h.removeEventListener("pointerleave",this.#N),document.removeEventListener("pointermove",this.#F),document.removeEventListener("mouseleave",this.#H),window.removeEventListener("resize",this.#$),document.removeEventListener("visibilitychange",this.#O),this.#R(),this.#c=null}attributeChangedCallback(t){this.#o||(t==="color"&&this.#I(),(t==="page"||t==="hide-native"||t==="disabled")&&(this.#R(),this.#P(),t==="page"&&(this.#k(),this.#m()),this.#S()))}#I(){const t=this.#t.color||"#ffffff",e=document.createElement("span");e.style.cssText="position:absolute;opacity:0;pointer-events:none",e.style.color=t,document.body.appendChild(e);const i=getComputedStyle(e).color.match(/[\d.]+/g);e.remove(),this.#C=i?[Math.round(+i[0]),Math.round(+i[1]),Math.round(+i[2])]:[255,255,255],this.#G()}#G(){const t=this.#C.join(",");if(this.#c&&this.#T===t)return;const e=document.createElement("canvas");e.width=e.height=128;const i=e.getContext("2d"),n=128/2,s=i.createRadialGradient(n,n,0,n,n,n);s.addColorStop(0,`rgba(${t}, 0.82)`),s.addColorStop(.2,`rgba(${t}, 0.5)`),s.addColorStop(.48,`rgba(${t}, 0.18)`),s.addColorStop(.78,`rgba(${t}, 0.04)`),s.addColorStop(1,`rgba(${t}, 0)`),i.fillStyle=s,i.fillRect(0,0,128,128),this.#c=e,this.#T=t}#m(){if(this.#o)return;const t=this.#t,e=t.page?innerWidth:this.clientWidth,i=t.page?innerHeight:this.clientHeight;!e||!i||(this.#b=e,this.#y=i,this.#u=Math.min(2,devicePixelRatio||1),this.#i.width=Math.round(e*this.#u),this.#i.height=Math.round(i*this.#u),this.#l=this.#i.getContext("2d"),this.#l.setTransform(this.#u,0,0,this.#u,0,0))}#k(){if(this.#t.page){this.#r?.disconnect(),this.#r=null,this.#a=!1,this.#i.classList.remove("is-visible"),this.#m();return}this.#r||(this.#r=new ResizeObserver(()=>this.#m()),this.#r.observe(this)),this.#m(),this.#x=!0,this.#a||(this.#a=!0,this.#e.x=this.#s.x=this.#b/2,this.#e.y=this.#s.y=this.#y/2),this.#i.classList.add("is-visible")}#W(){this.#w+=.012;const t=this.#b||100,e=this.#y||100;this.#s.x=t*(.5+Math.cos(this.#w)*.3),this.#s.y=e*(.5+Math.sin(this.#w*1.4)*.28)}#P(){const t=this.#t;t.page&&t.hideNative&&!t.disabled?(document.documentElement.style.cursor="none",this.#M=!0):this.#R()}#R(){this.#M&&(document.documentElement.style.cursor="",this.#M=!1)}#_=t=>{if(this.#o||this.#t.page)return;this.#x=!1;const e=this.getBoundingClientRect();this.#X(t.clientX-e.left,t.clientY-e.top)};#F=t=>{this.#o||!this.#t.page||this.#t.disabled||t.pointerType&&t.pointerType!=="mouse"||this.#X(t.clientX,t.clientY)};#X(t,e){this.#s.x=t,this.#s.y=e,this.#a||(this.#a=!0,this.#e.x=t,this.#e.y=e,this.#p=0,this.#f=0,this.#i.classList.add("is-visible"))}#N=()=>{this.#x=!0};#H=()=>{this.#t.page&&(this.#a=!1,this.#i.classList.remove("is-visible"))};#$=()=>{this.#t.page&&this.#m()};#O=()=>this.#S();#S(){if(this.#o||this.#t.disabled){this.#B();return}const t=!document.hidden;t&&!this.#n?this.#n=requestAnimationFrame(this.#D):t||this.#B()}#B(){this.#n&&(cancelAnimationFrame(this.#n),this.#n=0)}#D=()=>{this.#n=0,!(this.#o||this.#t.disabled||document.hidden)&&(this.#V(),this.#n=requestAnimationFrame(this.#D))};#V(){const t=this.#t;!t.page&&this.#x&&!this.#d&&this.#W();const e=this.#d?1:t.ease,i=this.#e.x,n=this.#e.y;this.#e.x+=(this.#s.x-i)*e,this.#e.y+=(this.#s.y-n)*e,this.#g.x=this.#e.x-i,this.#g.y=this.#e.y-n,this.#z[this.#p]={x:this.#e.x,y:this.#e.y,vx:this.#g.x,vy:this.#g.y},this.#p=(this.#p+1)%40,this.#f<40&&this.#f++,this.#Y()}#Y(){const t=this.#l;if(!t||!this.#c)return;const e=this.#t;if(t.clearRect(0,0,this.#b,this.#y),!this.#a)return;t.globalCompositeOperation="lighter";const i=this.#d?1:Math.max(1,Math.round(e.trail*39)),n=Math.min(i,this.#f);for(let s=n-1;s>=0;s--){const o=this.#z[(this.#p-1-s+80)%40];if(!o)continue;const h=n<=1?0:s/n,a=(1-h)*(1-h),r=Math.hypot(o.vx,o.vy),c=1+Math.min(r/22,1)*.5,d=e.size*(.55+.45*(1-h)),l=e.intensity*a*(s===0?.55:.16)*c;l<.004||this.#K(o,d,l,r)}this.#J(this.#s.x,this.#s.y),t.globalCompositeOperation="source-over"}#J(t,e){const i=this.#l;i.save(),i.globalAlpha=.5,i.drawImage(this.#c,t-11,e-11,22,22),i.globalAlpha=1,i.fillStyle=`rgb(${this.#C.join(",")})`,i.beginPath(),i.arc(t,e,3,0,Math.PI*2),i.fill(),i.restore()}#K(t,e,i,n){const s=this.#l,o=this.#d?0:Math.min(n/22,1),h=1+o*.9,a=1-o*.35;s.save(),s.globalAlpha=i,s.translate(t.x,t.y),o>.01&&s.rotate(Math.atan2(t.vy,t.vx)),s.scale(h,a),s.drawImage(this.#c,-e/2,-e/2,e,e),s.restore()}}customElements.define("vs-cursor-glow",u);
