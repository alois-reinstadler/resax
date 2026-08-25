const f=`
  :host { display: inline-flex; }
  .avt {
    --sz: var(--ctrl-h-md, 40px);
    --fs: var(--ctrl-fs-md, 15px);
    --r: 50%;
    position: relative; isolation: isolate;
    display: inline-flex; align-items: center; justify-content: center;
    width: var(--sz); height: var(--sz); border-radius: var(--r);
    flex: none; user-select: none; cursor: pointer;
    perspective: 340px; transform-style: preserve-3d;
    transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
    transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1); }
  .avt--active { transition-duration: 60ms; }
  .avt__face {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    border-radius: inherit; overflow: hidden;
    background: var(--vs-color, hsl(var(--avt-hue, 220) 45% 22%));
    color: var(--vs-color-fg, hsl(var(--avt-hue, 220) 70% 78%)); }
  /* sizes */
  .avt--xs { --sz: var(--ctrl-h-xs, 24px); --fs: var(--ctrl-fs-xs, 10px); }
  .avt--sm { --sz: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 12px); }
  .avt--md { --sz: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 15px); }
  .avt--lg { --sz: var(--ctrl-h-lg, 56px); --fs: var(--ctrl-fs-lg, 20px); }
  .avt--xl { --sz: var(--ctrl-h-xl, 80px); --fs: var(--ctrl-fs-xl, 28px); }
  /* shapes */
  .avt--s-circle { --r: 50%; }
  .avt--s-rounded { --r: var(--ctrl-r-md, 12px); }
  .avt--s-squircle { --r: var(--ctrl-r-lg, 16px); }
  @supports (corner-shape: squircle) {
    .avt--s-squircle,
    .avt--s-squircle .avt__face { corner-shape: squircle; } }
  .avt--bordered .avt__face {
    box-shadow: 0 0 0 2px var(--bg-card, #111), 0 0 0 3px var(--inp-border, #2a2a2a); }
  .avt__img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    pointer-events: none; -webkit-user-drag: none; }
  .avt__initials {
    font-family: inherit; font-weight: 600; font-size: var(--fs);
    line-height: 1; letter-spacing: 0.02em; }
  .avt__placeholder { width: 62%; height: 62%; color: var(--inp-text, #ededed); opacity: 0.5; }
  /* ── specular glare that tracks the pointer (out of flow) ── */
  .avt__glare {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
    z-index: 2; opacity: 0;
    background: radial-gradient(circle at var(--gx, 50%) var(--gy, 50%),
      rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.14) 24%, transparent 52%);
    transition: opacity 220ms ease; }
  .avt--active .avt__glare { opacity: 1; }
  @media (prefers-reduced-motion: reduce) {
    .avt { transition: none; transform: none !important; }
    .avt__glare { display: none; } }
`,u='<svg class="avt__placeholder" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';let v;function g(c){if(v||=document.createElement("canvas").getContext("2d"),!v)return null;v.fillStyle="#000",v.fillStyle=c;const e=v.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(c,e){const t=e?g(String(e).trim()):null;if(!t){for(const r of m)c.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),o=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,h=`rgb(${t[0]} ${t[1]} ${t[2]})`,d=t.map(r=>Math.round(o?r*.92:r+(255-r)*.16)),i=(r,l)=>c.style.setProperty(r,l);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(r,h);i("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(r,o?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])i(r,o?"0 0 0":"255 255 255");i("--vs-color",h),i("--vs-color-rgb",t.join(" ")),i("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class b extends HTMLElement{static observedAttributes=["src","alt","name","size","shape","bordered","max-tilt","color"];#t;#e;#r;#o;#l=!1;#s=null;#i=0;#f=0;#u=0;#c=!1;#h;#d;#n;#a;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=f,this.#t=document.createElement("span"),this.#t.className="avt",this.#e=document.createElement("span"),this.#e.className="avt__face",this.#o=document.createElement("span"),this.#o.className="avt__glare",this.#o.setAttribute("aria-hidden","true"),this.#r=document.createElement("img"),this.#r.className="avt__img",this.#r.draggable=!1,this.#r.addEventListener("error",()=>{this.#l=!0,this.#v()}),this.#t.append(this.#e,this.#o),e.append(t,this.#t),this.#d=()=>{this.#s=null,window.addEventListener("scroll",this.#a,{passive:!0,capture:!0}),window.addEventListener("resize",this.#a,{passive:!0})},this.#h=s=>{this.#f=s.clientX,this.#u=s.clientY,this.#t.classList.add("avt--active"),this.#i||(this.#i=requestAnimationFrame(()=>this.#m()))},this.#n=()=>{this.#t.classList.remove("avt--active"),this.#g(),this.#t.style.setProperty("--rx","0deg"),this.#t.style.setProperty("--ry","0deg"),this.#t.style.setProperty("--gx","50%"),this.#t.style.setProperty("--gy","50%")},this.#a=()=>{this.#s=null}}connectedCallback(){p(this,this.getAttribute("color")),this.#c=!1,this.#v(),this.addEventListener("pointerenter",this.#d),this.addEventListener("pointermove",this.#h),this.addEventListener("pointerleave",this.#n),this.addEventListener("pointercancel",this.#n)}disconnectedCallback(){this.#c=!0,this.removeEventListener("pointerenter",this.#d),this.removeEventListener("pointermove",this.#h),this.removeEventListener("pointerleave",this.#n),this.removeEventListener("pointercancel",this.#n),this.#g()}attributeChangedCallback(e){p(this,this.getAttribute("color")),e==="src"&&(this.#l=!1),this.#t&&this.#v()}#g(){window.removeEventListener("scroll",this.#a,{capture:!0}),window.removeEventListener("resize",this.#a),this.#i&&(cancelAnimationFrame(this.#i),this.#i=0),this.#s=null}#m(){if(this.#i=0,this.#c)return;this.#s||(this.#s=this.#t.getBoundingClientRect());const e=this.#s;if(!e.width||!e.height)return;const t=(this.#f-e.left)/e.width,s=(this.#u-e.top)/e.height,a=Number(this.getAttribute("max-tilt"))||16;this.#t.style.setProperty("--ry",`${(t-.5)*2*a}deg`),this.#t.style.setProperty("--rx",`${-(s-.5)*2*a}deg`),this.#t.style.setProperty("--gx",`${t*100}%`),this.#t.style.setProperty("--gy",`${s*100}%`)}#b(){const e=(this.getAttribute("name")||this.getAttribute("alt")||"").trim();if(!e)return"";const t=e.split(/\s+/);return t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase()}#y(){const e=this.getAttribute("name")||this.getAttribute("alt")||"";let t=0;for(let s=0;s<e.length;s++)t=(t*31+e.charCodeAt(s))%360;return t}#v(){const e=(l,n)=>this.getAttribute(l)??n,t=e("size","md"),s=e("shape","circle"),a=this.getAttribute("bordered"),o=a===null?!0:a!=="false";this.#t.className=`avt avt--${t} avt--s-${s}${o?" avt--bordered":""}`,this.#t.style.setProperty("--avt-hue",String(this.#y()));const h=e("src",""),d=e("alt",""),i=e("name","");if(!!h&&!this.#l)this.#r.src=h,this.#r.alt=d||i,this.#r.parentNode!==this.#e&&this.#p(this.#r);else{const l=this.#b();if(l){const n=document.createElement("span");n.className="avt__initials",n.setAttribute("aria-hidden","true"),n.textContent=l,this.#p(n)}else{const n=document.createElement("template");n.innerHTML=u,this.#p(n.content.firstChild)}}}#p(e){let t=this.#e.firstChild;for(;t;){const s=t.nextSibling;t!==e&&this.#e.removeChild(t),t=s}e.parentNode!==this.#e&&this.#e.appendChild(e)}}customElements.define("vs-avatar-tilt",b);
