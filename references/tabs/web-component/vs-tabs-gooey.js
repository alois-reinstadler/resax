const g=[{label:"Overview",value:"overview"},{label:"Activity",value:"activity"},{label:"Settings",value:"settings"},{label:"Members",value:"members",disabled:!0}],f=96,p=`
  :host { display: inline-flex; max-width: 100%; }
.tbg {
  --fs: var(--ctrl-fs-md, 14px);
  --h: var(--ctrl-h-md, 40px);
  --pad: 5px;
  --gap: 2px;
  --tab-px: 16px;
  --r: var(--ctrl-r-md, 12px);
  --tr: calc(var(--h) / 2);
  --acc: var(--inp-accent, #ededed);
  --acc-on: var(--bg, #0a0a0a);
  display: inline-flex;
  font-family: inherit;
  font-size: var(--fs);
  max-width: 100%;
}
.tbg--block { display: flex; width: 100%; }
.tbg--sm { --fs: var(--ctrl-fs-sm, 13px); --h: var(--ctrl-h-sm, 32px); --tab-px: 13px; --r: var(--ctrl-r-sm, 10px); }
.tbg--lg { --fs: var(--ctrl-fs-lg, 15px); --h: var(--ctrl-h-lg, 48px); --tab-px: 20px; --r: var(--ctrl-r-lg, 14px); }

.tbg__list {
  position: relative;
  display: inline-flex;
  gap: var(--gap);
  padding: var(--pad);
  width: 100%;
  border-radius: calc(var(--tr) + var(--pad));
  background: var(--bg-elevated, #111);
  border: 1px solid var(--border, #2a2a2a);
  /* More tabs than the box can hold become a rail: the goo blob slides along a
     single row, so wrapping would strand it. Scrolling inside the capsule keeps
     the blob and the row in the same coordinate space. */
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
}
.tbg__list::-webkit-scrollbar { display: none; }
.tbg--r-subtle { --tr: 8px; }
.tbg--r-rounded { --tr: var(--r); }
@supports (corner-shape: squircle) {
  .tbg--r-squircle .tbg__list,
  .tbg--r-squircle .tbg__ind,
  .tbg--r-squircle .tbg__tab { corner-shape: squircle; --tr: calc(var(--r) * 1.7); }
}

/* the liquid indicator: transitions x + width with a springy ease so the
   union-stretch → collapse reads as a gooey blob */
.tbg__ind {
  position: absolute;
  top: var(--pad);
  left: 0;
  height: var(--h);
  border-radius: var(--tr);
  background: var(--acc);
  opacity: 0;
  z-index: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.28);
  transition:
    transform 460ms cubic-bezier(0.5, 1.5, 0.5, 1),
    width 460ms cubic-bezier(0.5, 1.5, 0.5, 1),
    opacity 200ms ease;
}
.tbg__ind.is-ready { opacity: 1; }

.tbg__tab {
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--h);
  padding: 0 var(--tab-px);
  border: 0;
  /* proximity glow (see #paintGlow): a radial focus clipped to the glyphs, so the
     letters under the cursor brighten and the distant ones stay muted. --lit is
     the 0..1 nearness the script writes alongside the position — the gradient
     reads --mx/--my, --lit is what lets a consumer hang more on the effect. */
  --lit: 0;
  --mx: 50%;
  --my: 50%;
  color: var(--text-muted, #8a8a8a);
  background: radial-gradient(
    140px circle at var(--mx) var(--my),
    var(--text, #ededed),
    var(--text, #ededed) 25%,
    var(--text-muted, #8a8a8a) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font: inherit;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border-radius: var(--tr);
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 260ms ease, -webkit-text-fill-color 260ms ease;
}
.tbg--block .tbg__tab { flex: 1 1 0; }
/* The active label rides the blob in the accent's ink, and a disabled one is
   simply out: both drop the gradient, or the clip would paint over them. */
.tbg__tab.is-active {
  background: none;
  color: var(--acc-on);
  -webkit-text-fill-color: var(--acc-on);
}
.tbg__tab:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: none;
  -webkit-text-fill-color: var(--text-muted, #8a8a8a);
}
.tbg__icon { display: inline-flex; }
.tbg__icon svg { width: 18px; height: 18px; display: block; }

/* tones */
.tbg--t-danger { --acc: #e5484d; --acc-on: #fff; }
.tbg--t-warn { --acc: #f5a623; --acc-on: #1a1206; }
.tbg--t-success { --acc: #30a46c; --acc-on: #fff; }

.is-disabled { opacity: 0.55; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .tbg__ind { transition: opacity 200ms ease; }
  .tbg__tab { transition: none; }
}
`;let h;function m(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(c,t){const e=t?m(String(t).trim()):null;if(!e){for(const s of v)c.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,r=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(s=>Math.round(n?s*.92:s+(255-s)*.16)),l=(s,d)=>c.style.setProperty(s,d);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(s,r);l("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(s,n?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])l(s,n?"0 0 0":"255 255 255");l("--vs-color",r),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["active","value","size","radius","tone","block","disabled","color"];#t;#o;#n;#i=[];#x=null;#y=null;#e="";#l=0;#h=0;#w=!1;#r=0;#s=0;#a=0;#b=null;#c=0;#d=null;#u;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=p,this.#t=document.createElement("div"),this.#t.className="tbg",this.#t.setAttribute("role","tablist"),this.#t.addEventListener("keydown",i=>this.#$(i)),this.#o=document.createElement("div"),this.#o.className="tbg__list",this.#n=document.createElement("span"),this.#n.className="tbg__ind",this.#n.setAttribute("aria-hidden","true"),this.#o.appendChild(this.#n),this.#t.appendChild(this.#o),t.append(e,this.#t),this.#u=i=>this.#S(i)}connectedCallback(){u(this,this.getAttribute("color")),this.#f(),this.#p(!0),typeof ResizeObserver<"u"&&(this.#b=new ResizeObserver(()=>this.#m(!1)),this.#b.observe(this.#o)),window.addEventListener("pointermove",this.#u,{passive:!0})}disconnectedCallback(){this.#b?.disconnect(),this.#b=null,window.removeEventListener("pointermove",this.#u),this.#r&&cancelAnimationFrame(this.#r),this.#s&&cancelAnimationFrame(this.#s),this.#a&&cancelAnimationFrame(this.#a),this.#c&&cancelAnimationFrame(this.#c),this.#r=this.#s=this.#a=this.#c=0}attributeChangedCallback(){u(this,this.getAttribute("color")),this.#t&&(this.#f(),this.#p(!1))}set tabs(t){this.#x=Array.isArray(t)&&t.length?t:null,this.#t&&(this.#f(),this.#p(!1))}get tabs(){return this.#x??g}set items(t){this.tabs=t}get items(){return this.tabs}get active(){return this.#e||this.tabs[0]?.value||""}set active(t){this.setAttribute("active",String(t))}get value(){return this.active}set value(t){this.active=t}#g(t,e){if(!this.hasAttribute(t))return e;const i=this.getAttribute(t);return i!=="false"&&i!=="0"}#f(){const t=this.tabs;t!==this.#y&&(this.#y=t,this.#k(t))}#k(t){for(const e of this.#i)e.remove();this.#i=[],t.forEach(e=>{const i=document.createElement("button");if(i.type="button",i.className="tbg__tab",i.setAttribute("role","tab"),i.__item=e,e.icon){const a=document.createElement("span");a.className="tbg__icon",a.innerHTML=e.icon,i.appendChild(a)}else i.textContent=e.label;i.addEventListener("click",()=>this.#A(e)),this.#o.appendChild(i),this.#i.push(i)})}#p(t){const e=this.getAttribute("size")||"md",i=this.getAttribute("radius")||"pill",a=this.getAttribute("tone")||"default",n=this.#g("block",!1),r=this.#g("disabled",!1);this.#t.className=["tbg",`tbg--${e}`,`tbg--r-${i}`,a!=="default"?`tbg--t-${a}`:"",n?"tbg--block":"",r?"is-disabled":""].filter(Boolean).join(" ");const o=this.tabs,l=this.getAttribute("active")??this.getAttribute("value");let s=l??(this.#e||o[0]?.value||"");o.some(b=>b.value===s)||(s=o[0]?.value??"");const d=s!==this.#e;this.#e=s;for(const b of this.#i)b.disabled=r||!!b.__item.disabled;this.#E(),t?this.#m(!1):d&&this.#m(!0),d&&this.#d&&this.#_(this.#d)}#E(){for(const t of this.#i){const e=t.__item.value===this.#e;t.classList.toggle("is-active",e),t.setAttribute("aria-selected",String(e)),t.tabIndex=e?0:-1}}#C(){return this.tabs.findIndex(t=>t.value===this.#e)}#m(t){this.#r&&cancelAnimationFrame(this.#r),this.#r=requestAnimationFrame(()=>{this.#r=0,this.#M(this.#C(),t)})}#F(t){const e=this.#i[t];return e?{x:e.offsetLeft,w:e.offsetWidth}:null}#M(t,e){const i=this.#F(t);if(i){if(this.#s&&cancelAnimationFrame(this.#s),this.#a&&cancelAnimationFrame(this.#a),this.#s=this.#a=0,e&&this.#w){const a=Math.min(this.#l,i.x),n=Math.max(this.#l+this.#h,i.x+i.w);this.#l=a,this.#h=n-a,this.#v(),this.#s=requestAnimationFrame(()=>{this.#s=0,this.#a=requestAnimationFrame(()=>{this.#a=0,this.#l=i.x,this.#h=i.w,this.#v()})})}else this.#l=i.x,this.#h=i.w,this.#v();this.#w=!0}}#v(){this.#n.style.transform=`translateX(${this.#l}px)`,this.#n.style.width=`${this.#h}px`,this.#n.classList.add("is-ready")}#_(t){if(this.#g("disabled",!1))return;const e=this.tabs;for(let i=0;i<e.length;i++){const a=this.#i[i];if(!a)continue;const n=e[i];if(n.disabled||n.value===this.#e){a.style.setProperty("--lit","0");continue}const r=a.getBoundingClientRect();a.style.setProperty("--mx",`${t.clientX-r.left}px`),a.style.setProperty("--my",`${t.clientY-r.top}px`);const o=Math.max(r.left,Math.min(t.clientX,r.right)),l=Math.max(r.top,Math.min(t.clientY,r.bottom)),s=Math.hypot(t.clientX-o,t.clientY-l);a.style.setProperty("--lit",Math.max(0,1-s/f).toFixed(3))}}#S(t){this.#d=t,!this.#c&&(this.#c=requestAnimationFrame(()=>{this.#c=0,this.#d&&this.#_(this.#d)}))}#A(t){if(this.hasAttribute("disabled")||t.disabled||t.value===this.#e)return;this.setAttribute("active",t.value),this.setAttribute("value",t.value);const e=this.tabs.findIndex(i=>i.value===t.value);this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:t.value,index:e}}))}#$(t){const i=this.tabs.filter(o=>!o.disabled);if(!i.length)return;const a=i.findIndex(o=>o.value===this.#e);let n=-1;if(t.key==="ArrowRight"||t.key==="ArrowDown"?n=(a+1+i.length)%i.length:t.key==="ArrowLeft"||t.key==="ArrowUp"?n=(a-1+i.length)%i.length:t.key==="Home"?n=0:t.key==="End"&&(n=i.length-1),n<0)return;t.preventDefault();const r=i[n];this.#A(r),requestAnimationFrame(()=>{this.#i.find(o=>o.__item.value===r.value)?.focus()})}}customElements.define("vs-tabs-gooey",x);
