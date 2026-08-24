const k=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;const C="420ms cubic-bezier(0.34, 1.46, 0.44, 1)";const R=`
  :host { display: inline-flex; }
  .vstip-wrap { position: relative; display: inline-flex; }
  .vstip-trigger { display: inline-flex; align-items: center; outline: none; border-radius: var(--ctrl-r-sm, 8px); color: var(--text, #ededed); cursor: default; }
  .vstip-trigger:focus-visible { box-shadow: 0 0 0 2px var(--ui-accent, #ededed); }
`,P=`
  .vstip-host {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--vstip-z, 10000);
    display: inline-flex;
    pointer-events: none;
    transition: transform 420ms cubic-bezier(0.34, 1.46, 0.44, 1);
  }
  .vstip-host__box {
    position: relative;
    display: inline-flex;
    align-items: center;
    max-width: 260px;
    padding: 7px 11px;
    border-radius: calc(var(--vstip-r, 10px) * var(--vstip-r-mult, 1));
    font-size: 12.5px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--vstip-fg, #ededed);
    background: var(--vstip-surface, #1c1c1e);
    box-shadow: var(--vstip-shadow, none);
    white-space: normal;
    overflow: hidden;
    box-sizing: border-box;
    transform-origin: var(--vstip-origin, bottom center);
    --exit-x: 0px;
    --exit-y: 8px;
    opacity: 0;
    filter: blur(8px);
    scale: 0.86;
  }
  .vstip-host__box.is-visible { opacity: 1; filter: blur(0); scale: 1; }
  .vstip-host__box.is-entering { animation: vstip-pop 320ms cubic-bezier(0.34, 1.46, 0.44, 1); }
  @keyframes vstip-pop {
    0%   { opacity: 0; scale: 0.7; filter: blur(8px); translate: var(--exit-x) var(--exit-y); }
    60%  { opacity: 1; scale: 1.04; filter: blur(0); translate: 0 0; }
    100% { opacity: 1; scale: 1; translate: 0 0; }
  }
  .vstip-host__box.is-exiting {
    animation: vstip-out 360ms cubic-bezier(0.36, 0, 0.66, -0.36) forwards;
    pointer-events: none;
  }
  @keyframes vstip-out {
    0%   { opacity: 1; scale: 1; filter: blur(0); translate: 0 0; }
    30%  { scale: 1.05; translate: 0 0; }
    100% { opacity: 0; scale: 0.6; filter: blur(8px); translate: var(--exit-x) var(--exit-y); }
  }
  .vstip-host__content {
    display: inline-block;
    flex: none;
    max-width: 238px;
    transform-origin: center;
  }
  .vstip-host__content.is-swapping { animation: vstip-swap 400ms cubic-bezier(0.34, 1.46, 0.44, 1); }
  .vstip-host__content :where(b, strong) { font-weight: 700; }
  .vstip-host__content kbd {
    display: inline-block;
    min-width: 1.4em;
    padding: 1px 5px;
    margin: 0 1px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.14);
    font: inherit;
    font-size: 0.92em;
    text-align: center;
  }
  @keyframes vstip-swap {
    0%   { filter: blur(0); opacity: 1;    scale: 1; }
    40%  { filter: blur(5px); opacity: 0.3; scale: 0.9; }
    70%  { filter: blur(0); opacity: 1;    scale: 1.03; }
    100% { filter: blur(0); opacity: 1;    scale: 1; }
  }
  .vstip-host__box--top    { --vstip-origin: bottom center; --exit-x: 0px;  --exit-y: 8px;  }
  .vstip-host__box--bottom { --vstip-origin: top center;    --exit-x: 0px;  --exit-y: -8px; }
  .vstip-host__box--left   { --vstip-origin: right center;  --exit-x: 8px;  --exit-y: 0px;  }
  .vstip-host__box--right  { --vstip-origin: left center;   --exit-x: -8px; --exit-y: 0px;  }
  .vstip-host__arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    background: var(--vstip-surface, #1c1c1e);
    border-radius: 2px;
    z-index: -1;
    opacity: 0;
    filter: blur(6px);
    scale: 0;
    transform-origin: var(--arrow-origin, center top);
    transition: opacity 180ms ease, filter 180ms ease, scale 240ms cubic-bezier(0.34, 1.56, 0.44, 1);
  }
  .vstip-host__arrow.is-visible { opacity: 1; filter: blur(0); scale: 1; }
  .vstip-host__arrow.is-entering { animation: vstip-arrow-pop 420ms cubic-bezier(0.34, 1.56, 0.44, 1); }
  .vstip-host__arrow.is-exiting { opacity: 0; filter: blur(4px); scale: 0.2; }
  @keyframes vstip-arrow-pop {
    0%   { scale: 0; }
    55%  { scale: 1.3; }
    78%  { scale: 0.92; }
    100% { scale: 1; }
  }
  .vstip-host__arrow--top    { bottom: 0; left: 50%; transform: translate(-50%, 50%) rotate(45deg);  --arrow-origin: center top; }
  .vstip-host__arrow--bottom { top: 0;    left: 50%; transform: translate(-50%, -50%) rotate(45deg); --arrow-origin: center bottom; }
  .vstip-host__arrow--left   { right: 0;  top: 50%;  transform: translate(50%, -50%) rotate(45deg);  --arrow-origin: left center; }
  .vstip-host__arrow--right  { left: 0;   top: 50%;  transform: translate(-50%, -50%) rotate(45deg); --arrow-origin: right center; }
  .vstip-host__arrow--v-fluent  { background: color-mix(in srgb, #2a2a30 90%, transparent); }
  .vstip-host__arrow--v-outline { background: #000; }
  .vstip-host__arrow--v-glass   { background: rgba(124, 124, 134, 0.22); }
  .vstip-host__box { --vstip-r: 10px; }
  .vstip-host__box--r-none    { --vstip-r: 0px; }
  .vstip-host__box--r-subtle  { --vstip-r: 6px; }
  .vstip-host__box--r-rounded { --vstip-r: 10px; }
  .vstip-host__box--r-pill    { --vstip-r: 999px; }
  @supports (corner-shape: squircle) {
    .vstip-host__box--r-squircle { corner-shape: squircle; --vstip-r-mult: 1.6; }
  }
  .vstip-host__box--r-squircle { --vstip-r: 12px; }
  .vstip-host__box--v-fluent {
    --vstip-surface: color-mix(in srgb, #2a2a30 90%, transparent);
    --vstip-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(12px);
  }
  .vstip-host__box--v-outline {
    --vstip-surface: #000;
    --vstip-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12);
  }
  .vstip-host__box--v-glass {
    --vstip-surface: rgba(124, 124, 134, 0.22);
    --vstip-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.32);
    backdrop-filter: blur(16px) saturate(160%);
  }
  @media (prefers-reduced-motion: reduce) {
    .vstip-host, .vstip-host__box, .vstip-host__arrow, .vstip-host__content { transition: none; animation: none; }
  }
`;let W=0,g;function I(t){if(g||=document.createElement("canvas").getContext("2d"),!g)return null;g.fillStyle="#000",g.fillStyle=t;const i=g.fillStyle;if(i.charAt(0)==="#")return[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)];const e=i.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const D=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function M(t,i){const e=i?I(String(i).trim()):null;if(!e){for(const a of D)t.style.removeProperty(a);return}const o=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),c=.2126*o(e[0])+.7152*o(e[1])+.0722*o(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(a=>Math.round(c?a*.92:a+(255-a)*.16)),p=(a,v)=>t.style.setProperty(a,v);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])p(a,l);p("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])p(a,e.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])p(a,c?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])p(a,c?"0 0 0":"255 255 255");p("--vs-color",l),p("--vs-color-rgb",e.join(" ")),p("--vs-color-fg",c?"#0b0b0b":"#ffffff")}let r=null,y=0;const s={visible:!1,exiting:!1,content:null,placement:null,variant:null,radius:null,owner:null,nudge:0};let d=null,u=null,x=null,b=null,m=null;function H(){if(r)return r;const t=document.createElement("div");t.setAttribute("data-vs-tooltip-host","");const i=t.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=P;const o=document.createElement("div");o.className="vstip-host",o.setAttribute("role","tooltip"),o.id=`vstip-host-${(++W).toString(36)}`;const n=document.createElement("div");n.className="vstip-host__box";const c=document.createElement("span");c.className="vstip-host__content";const l=document.createElement("span");return l.className="vstip-host__arrow",l.setAttribute("aria-hidden","true"),n.appendChild(c),o.append(n,l),i.append(e,o),document.body.appendChild(t),r={el:t,host:o,box:n,content:c,arrow:l},r}function q(){clearTimeout(d),d=null,clearTimeout(u),u=null,clearTimeout(x),x=null,clearTimeout(b),b=null,clearTimeout(m),m=null,removeEventListener("scroll",f,!0),removeEventListener("resize",f),r&&r.el.remove(),r=null,s.visible=s.exiting=!1,s.content=s.placement=s.variant=s.radius=null,s.owner=null,s.nudge=0}const f=()=>{s.visible&&s.owner&&N(s.owner,!1)};function O(t,i){switch(i){case"bottom":return{x:t.left+t.width/2,y:t.bottom};case"left":return{x:t.left,y:t.top+t.height/2};case"right":return{x:t.right,y:t.top+t.height/2};case"top":default:return{x:t.left+t.width/2,y:t.top}}}function G(t,i,e,o,n){const c=innerWidth,l=innerHeight,h={top:i.top-n-o>=0,bottom:i.bottom+n+o<=l,left:i.left-n-e>=0,right:i.right+n+e<=c};if(h[t])return t;const p={top:"bottom",bottom:"top",left:"right",right:"left"};return h[p[t]]?p[t]:t}const L=8;function j(t,i,e){if(e!=="top"&&e!=="bottom")return 0;const o=t-i/2,n=t+i/2;return o<L?Math.round(L-o):n>innerWidth-L?Math.round(innerWidth-L-n):0}function F(t){const{box:i,arrow:e}=r;s.placement!==t&&(s.placement&&(i.classList.remove(`vstip-host__box--${s.placement}`),e.classList.remove(`vstip-host__arrow--${s.placement}`)),i.classList.add(`vstip-host__box--${t}`),e.classList.add(`vstip-host__arrow--${t}`),s.placement=t)}function V(t,i){const{box:e,arrow:o}=r;s.variant!==t&&(s.variant&&(e.classList.remove(`vstip-host__box--v-${s.variant}`),o.classList.remove(`vstip-host__arrow--v-${s.variant}`)),e.classList.add(`vstip-host__box--v-${t}`),o.classList.add(`vstip-host__arrow--v-${t}`),s.variant=t),s.radius!==i&&(s.radius&&e.classList.remove(`vstip-host__box--r-${s.radius}`),e.classList.add(`vstip-host__box--r-${i}`),s.radius=i)}function N(t,i){const{host:e,box:o,arrow:n}=r,c=t.anchorRect(),l=Math.max(0,Number(t.getAttribute("offset")??10)||0),h=t.getAttribute("placement")||"top",p=o.offsetWidth||0,a=o.offsetHeight||0,v=G(h,c,p,a,l);F(v);const T=O(c,v);let E="-50%",_="-100%",$=0,w=-l;v==="bottom"?(_="0",w=l):v==="left"?(E="-100%",_="-50%",$=-l,w=0):v==="right"&&(E="0",_="-50%",$=l,w=0),s.nudge=j(T.x,p,v),n.style.marginLeft=s.nudge?`${-s.nudge}px`:"";const A=`translate(${T.x+$+s.nudge}px, ${T.y+w}px) translate(${E}, ${_})`;if(i&&!k()){e.style.transform=A;return}e.style.transition="none",e.style.transform=A,e.offsetWidth,e.style.transition=""}function X(t){const{box:i,content:e}=r;if(!s.visible||k()){e.innerHTML=t;return}const o=i.offsetWidth,n=i.offsetHeight;e.innerHTML=t,clearTimeout(m),i.style.transition="none",i.style.width="auto",i.style.height="auto",e.style.width="";const c=i.offsetWidth,l=i.offsetHeight;e.style.width=`${e.offsetWidth}px`,i.style.width=`${o}px`,i.style.height=`${n}px`,i.offsetWidth,i.style.transition=`width ${C}, height ${C}`,i.style.width=`${c}px`,i.style.height=`${l}px`,m=setTimeout(S,440),e.classList.remove("is-swapping"),e.offsetWidth,e.classList.add("is-swapping")}function S(){clearTimeout(m),m=null,r&&(r.box.style.transition="",r.box.style.width="",r.box.style.height="",r.content.style.width="")}function z(t){H(),clearTimeout(d),d=null,clearTimeout(b),b=null;const{box:i,arrow:e,content:o}=r,n=t.getAttribute("content")??"Tooltip",c=s.visible&&!s.exiting,l=s.owner;s.exiting=!1,s.owner=t,M(r.el,t.getAttribute("color")),V(t.getAttribute("variant")||"solid",t.getAttribute("radius")||"squircle"),n!==s.content&&(c?X(n):(S(),o.innerHTML=n),s.content=n),N(t,c),i.classList.remove("is-exiting"),e.classList.remove("is-exiting"),i.classList.add("is-visible"),e.classList.add("is-visible"),c?(clearTimeout(u),u=null,i.classList.remove("is-entering"),e.classList.remove("is-entering"),clearTimeout(x),x=setTimeout(()=>{x=null},420),l&&l!==t&&l.dropDescribedBy()):(i.classList.add("is-entering"),e.classList.add("is-entering"),clearTimeout(u),u=setTimeout(()=>{u=null,i.classList.remove("is-entering"),e.classList.remove("is-entering")},340),addEventListener("scroll",f,!0),addEventListener("resize",f),t.dispatchEvent(new CustomEvent("show",{bubbles:!0,composed:!0}))),t.takeDescribedBy(r.host.id),s.visible=!0}function K(t,i){clearTimeout(d),d=setTimeout(()=>{d=null,!(!s.visible||s.owner&&s.owner!==t)&&B()},i)}function B(){if(!r||!s.visible)return;const{box:t,arrow:i}=r,e=s.owner;s.exiting=!0,clearTimeout(u),u=null,t.classList.remove("is-visible","is-entering"),i.classList.remove("is-visible","is-entering"),e&&e.dropDescribedBy();const o=()=>{b=null,s.visible=!1,s.exiting=!1,r&&(r.box.classList.remove("is-exiting"),r.arrow.classList.remove("is-exiting")),S(),removeEventListener("scroll",f,!0),removeEventListener("resize",f),e&&e.dispatchEvent(new CustomEvent("hide",{bubbles:!0,composed:!0}))};if(k()){o();return}t.classList.add("is-exiting"),i.classList.add("is-exiting"),clearTimeout(b),b=setTimeout(o,360)}class U extends HTMLElement{static observedAttributes=["content","placement","variant","radius","offset","delay","hide-delay","color"];#t;#e;#i=null;#r=()=>this.#s();#n=()=>this.#o();#a=()=>this.#s();#l=()=>this.#o();constructor(){super();const i=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=R,this.#t=document.createElement("span"),this.#t.className="vstip-wrap",this.#e=document.createElement("span"),this.#e.className="vstip-trigger",this.#e.tabIndex=0;const o=document.createElement("slot");o.textContent="Hover me",this.#e.appendChild(o),this.#t.appendChild(this.#e),i.append(e,this.#t)}connectedCallback(){M(this,this.getAttribute("color")),this.#t.addEventListener("mouseenter",this.#r),this.#t.addEventListener("mouseleave",this.#n),this.#t.addEventListener("focusin",this.#a),this.#t.addEventListener("focusout",this.#l),y+=1,H()}disconnectedCallback(){clearTimeout(this.#i),this.#i=null,this.#t.removeEventListener("mouseenter",this.#r),this.#t.removeEventListener("mouseleave",this.#n),this.#t.removeEventListener("focusin",this.#a),this.#t.removeEventListener("focusout",this.#l),s.owner===this&&(s.owner=null,B()),y=Math.max(0,y-1),y||q()}attributeChangedCallback(){M(this,this.getAttribute("color")),s.owner===this&&s.visible&&!s.exiting&&z(this)}show(){this.#s()}hide(){this.#o()}anchorRect(){return this.#e.getBoundingClientRect()}takeDescribedBy(i){this.#e.setAttribute("aria-describedby",i)}dropDescribedBy(){this.#e.removeAttribute("aria-describedby")}#s(){const i=Math.max(0,Number(this.getAttribute("delay")??120)||0),e=s.visible&&!s.exiting?0:i;clearTimeout(d),d=null,clearTimeout(this.#i),this.#i=setTimeout(()=>{this.#i=null,z(this)},e)}#o(){clearTimeout(this.#i),this.#i=null;const i=Math.max(0,Number(this.getAttribute("hide-delay")??90)||0);K(this,i)}}customElements.define("vs-tooltip",U);
