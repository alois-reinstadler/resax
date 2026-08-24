const f="http://www.w3.org/2000/svg",u=`
:host { display: inline-flex; }
.vcf {
  --h: var(--ctrl-h-md, 28px);
  --px: 11px;
  --fs: var(--ctrl-fs-md, 13px);
  --gap: 6px;
  --rr: var(--ctrl-r-pill, 999px);
  --accent: var(--ui-accent, #ededed);
  --ring: var(--inp-ring, var(--ui-ring, 255 255 255));
  --solid-fg: var(--badge-solid-fg, #0b0b0b);

  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  gap: var(--gap);
  height: var(--h);
  padding: 0 var(--px);
  margin: 0;
  border: 1px solid rgb(var(--ring) / 0.3);
  border-radius: var(--rr);
  font: inherit;
  font-size: var(--fs);
  font-weight: 500;
  line-height: 1;
  text-align: inherit;
  white-space: nowrap;
  user-select: none;
  overflow: hidden;
  color: var(--inp-text, #ededed);
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  transition: color 240ms ease, border-color 200ms ease;
}
.vcf.is-clickable { cursor: pointer; }
.vcf:not(.is-clickable) { cursor: default; }

/* fill layer that sweeps in from the left */
.vcf__fill {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: rgb(var(--ring) / 0.95);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 340ms cubic-bezier(0.22, 1, 0.36, 1);
}
.vcf.is-clickable:hover:not(.is-disabled) .vcf__fill { transform: scaleX(1); }
.vcf.is-clickable:hover:not(.is-disabled) { color: var(--solid-fg); border-color: transparent; }
.vcf.is-selected .vcf__fill { transform: scaleX(1); }
.vcf.is-selected { color: var(--solid-fg); border-color: transparent; }

/* variants (base background when not filled) */
.vcf--v-soft { background: rgb(var(--ring) / 0.10); }
.vcf--v-solid .vcf__fill { transform: scaleX(1); }
.vcf--v-solid { color: var(--solid-fg); border-color: transparent; }
.vcf--v-outline { background: transparent; border-color: rgb(var(--ring) / 0.45); }

/* sizes */
.vcf--sm { --h: var(--ctrl-h-sm, 24px); --px: 9px; --fs: var(--ctrl-fs-sm, 12px); --gap: 5px; }
.vcf--lg { --h: var(--ctrl-h-lg, 32px); --px: 14px; --fs: var(--ctrl-fs-lg, 14px); --gap: 7px; }

/* radii */
.vcf--r-subtle { --rr: var(--ctrl-r-sm, 7px); }
.vcf--r-rounded { --rr: var(--ctrl-r-md, 10px); }
.vcf--r-pill { --rr: var(--ctrl-r-pill, 999px); }

.vcf:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

.vcf__dot { position: relative; z-index: 1; width: 7px; height: 7px; border-radius: 999px; background: var(--accent); flex: 0 0 auto; }
.vcf.is-selected .vcf__dot, .vcf.is-clickable:hover:not(.is-disabled) .vcf__dot { background: currentColor; }
.vcf__avatar { position: relative; z-index: 1; display: inline-flex; margin-left: -3px; }
.vcf__avatar ::slotted(img), .vcf__avatar ::slotted(*) { width: 1.45em; height: 1.45em; border-radius: 999px; object-fit: cover; }
.vcf__check { position: relative; z-index: 1; flex: 0 0 auto; margin-left: -1px; width: 1em; height: 1em; }
.vcf__close svg { width: 1em; height: 1em; }
.vcf__label { position: relative; z-index: 1; }

.vcf__close {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25em;
  height: 1.25em;
  margin-right: -3px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 160ms ease, background-color 160ms ease;
}
.vcf__close:hover:not(:disabled) { opacity: 1; background: rgb(0 0 0 / 0.18); }
.vcf__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }

/* tones */
.vcf--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --solid-fg: #160405; }
.vcf--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --solid-fg: #160f02; }
.vcf--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --solid-fg: #04120b; }

.vcf.is-disabled { opacity: 0.5; cursor: not-allowed; }
.vcf.is-disabled .vcf__close { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .vcf, .vcf__close { transition: none; }
  .vcf__fill { transition: none; }
}
`;let d;function v(l){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=l;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const p=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(l,t){const e=t?v(String(t).trim()):null;if(!e){for(const i of p)l.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),s=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(i=>Math.round(s?i*.92:i+(255-i)*.16)),n=(i,h)=>l.style.setProperty(i,h);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(i,c);n("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(i,s?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])n(i,s?"0 0 0":"255 255 255");n("--vs-color",c),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["label","variant","size","radius","tone","selectable","selected","value","dot","removable","disabled","color"];#t;#a;#s;#r;#n;#i;#o;#l;#e;#f=t=>this.#v(t);#h=t=>this.#p(t);#b=()=>this.#d();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="vcf",this.#a=document.createElement("span"),this.#a.className="vcf__fill",this.#a.setAttribute("aria-hidden","true"),this.#s=document.createElement("span"),this.#s.className="vcf__avatar",this.#r=document.createElement("slot"),this.#r.name="avatar",this.#s.appendChild(this.#r),this.#n=document.createElement("span"),this.#n.className="vcf__dot",this.#n.setAttribute("aria-hidden","true"),this.#i=document.createElementNS(f,"svg"),this.#i.setAttribute("class","vcf__check"),this.#i.setAttribute("viewBox","0 0 24 24"),this.#i.setAttribute("fill","none"),this.#i.setAttribute("aria-hidden","true");for(const o of["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z","M7.75 11.9999L10.58 14.8299L16.25 9.16992"]){const s=document.createElementNS(f,"path");s.setAttribute("d",o),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),this.#i.appendChild(s)}this.#o=document.createElement("span"),this.#o.className="vcf__label",this.#l=document.createElement("slot"),this.#o.appendChild(this.#l),this.#e=document.createElement("button"),this.#e.className="vcf__close",this.#e.type="button";const r=document.createElementNS(f,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("aria-hidden","true");for(const o of["M6 6L18 18","M18 6L6 18"]){const s=document.createElementNS(f,"path");s.setAttribute("d",o),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),r.appendChild(s)}this.#e.appendChild(r),this.#t.append(this.#a,this.#s,this.#n,this.#i,this.#o,this.#e),t.append(e,this.#t),this.#t.addEventListener("click",this.#f),this.#e.addEventListener("click",this.#h),this.#r.addEventListener("slotchange",this.#b)}connectedCallback(){b(this,this.getAttribute("color")),this.#d()}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#t&&this.#d()}disconnectedCallback(){}get selected(){return this.hasAttribute("selected")}set selected(t){t?this.setAttribute("selected",""):this.removeAttribute("selected")}get value(){return this.#c()}set value(t){this.setAttribute("value",String(!!t))}#c(){if(this.hasAttribute("value")){const t=this.getAttribute("value");return t!=="false"&&t!=="0"}return this.hasAttribute("selected")}#u(){return this.#r.assignedNodes({flatten:!0}).length>0}#d(){const t=(i,h)=>this.getAttribute(i)??h,e=this.hasAttribute("disabled"),r=this.hasAttribute("selectable"),o=this.hasAttribute("dot"),s=this.hasAttribute("removable"),c=t("label","Chip"),a=r&&this.#c(),n=this.#u();this.#t.className=["vcf",`vcf--${t("size","md")}`,`vcf--v-${t("variant","soft")}`,`vcf--r-${t("radius","pill")}`,`vcf--t-${t("tone","default")}`,e?"is-disabled":"",a?"is-selected":"",r?"is-clickable":""].filter(Boolean).join(" "),r?(this.#t.disabled=e,this.#t.setAttribute("aria-pressed",String(a)),this.#t.removeAttribute("role"),this.#t.tabIndex=0):(this.#t.disabled=!1,this.#t.removeAttribute("aria-pressed"),this.#t.setAttribute("role","presentation"),this.#t.tabIndex=-1),this.#s.hidden=!n,this.#n.hidden=n||!o,this.#i.style.display=a?"":"none",this.#l.textContent=c,this.#e.style.display=s?"":"none",this.#e.disabled=e,this.#e.setAttribute("aria-label",`Remove ${c}`)}#v(){const t=this.hasAttribute("disabled"),e=this.hasAttribute("selectable");if(t||!e)return;const r=!this.#c();this.setAttribute("value",String(r)),this.selected=r,this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:r})),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:r}))}#p(t){this.hasAttribute("disabled")||(t.stopPropagation(),this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,composed:!0,detail:void 0})))}}customElements.define("vs-chip-fill",g);
