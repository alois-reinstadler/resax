const u=`
  :host { display: inline-block; }
.rcd {
  --box: 20px;
  --fs: 14px;
  --accent: var(--inp-accent, var(--ui-accent, #ededed));
  --ring: var(--inp-ring, var(--ui-ring, 255 255 255));
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1.5px solid var(--inp-border, #2a2a2a);
  border-radius: 12px;
  background: var(--bg-input, #0d0d0d);
  font-family: inherit;
  font-size: var(--fs);
  color: var(--text, #ededed);
  cursor: pointer;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    border-color 240ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    background-color 240ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    box-shadow 260ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    transform 260ms cubic-bezier(0.34, 1.4, 0.5, 1);
}
.rcd--lbl-left { flex-direction: row-reverse; }
.rcd--sm { --box: 16px; --fs: 13px; padding: 8px 12px; }
.rcd--md { --box: 20px; --fs: 14px; }
.rcd--lg { --box: 24px; --fs: 15px; padding: 12px 16px; }

.rcd:hover { border-color: var(--inp-border-hover, #5a5a5a); }
.rcd:focus-visible { box-shadow: 0 0 0 3px rgb(var(--ring) / 0.3); }

/* selected card: accent border, faint tint, lift */
.rcd.is-on {
  border-color: var(--accent);
  background: rgb(var(--ring) / 0.1);
  box-shadow: 0 6px 16px rgb(var(--ring) / 0.18), 0 0 0 1px rgb(var(--ring) / 0.4) inset;
  transform: translateY(-2px);
}

.rcd__box {
  position: relative;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--box);
  height: var(--box);
  border: 1.5px solid var(--inp-border, #2a2a2a);
  border-radius: 50%;
  background: var(--bg, #0a0a0a);
  transition: border-color 240ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
}
.rcd.is-on .rcd__box { border-color: var(--accent); }

.rcd__dot {
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background: var(--accent);
  transform: scale(0);
  transition: transform 320ms cubic-bezier(0.34, 1.56, 0.5, 1);
}
.rcd.is-on .rcd__dot { transform: scale(1); }

.rcd__label { line-height: 1.2; }

.rcd--t-default { --ring: var(--ui-ring, 255 255 255); }
.rcd--t-danger { --accent: #e5484d; --ui-accent-fg: #fff; --ring: 255 99 105; }
.rcd--t-warn { --accent: #f5a623; --ui-accent-fg: #160f02; --ring: 255 178 36; }
.rcd--t-success { --accent: #30a46c; --ui-accent-fg: #fff; --ring: 76 195 138; }

.rcd.is-disabled { opacity: 0.45; cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .rcd, .rcd__box, .rcd__dot { transition-duration: 0ms; }
  .rcd.is-on { transform: none; }
}

/* body wrapper for title + optional description (extends the SFC layout) */
.rcd__body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.rcd__desc { font-size: calc(var(--fs) - 2px); color: var(--text-muted, #8a8a8a); line-height: 1.2; }
`;let d;function p(a){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=a;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(a,t){const e=t?p(String(t).trim()):null;if(!e){for(const r of f)a.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(r=>Math.round(n?r*.92:r+(255-r)*.16)),o=(r,h)=>a.style.setProperty(r,h);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(r,c);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(r,n?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])o(r,n?"0 0 0":"255 255 255");o("--vs-color",c),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["checked","disabled","label","description","name","value","size","tone","label-position","color"];#t;#r;#e;#i;#s=()=>this.#d();#o=t=>this.#l(t);#n=()=>this.#a();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="rcd",this.#t.setAttribute("role","radio");const i=document.createElement("span");i.className="rcd__box",i.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="rcd__dot",i.append(s);const n=document.createElement("span");n.className="rcd__body";const c=document.createElement("span");c.className="rcd__label",this.#r=document.createElement("slot"),c.append(this.#r),this.#i=document.createElement("span"),this.#i.className="rcd__desc",this.#e=document.createElement("slot"),this.#e.name="description",this.#i.append(this.#e),n.append(c,this.#i),this.#t.append(i,n),t.append(e,this.#t),this.#t.addEventListener("click",this.#s),this.#t.addEventListener("keydown",this.#o),this.#r.addEventListener("slotchange",this.#n),this.#e.addEventListener("slotchange",this.#n)}connectedCallback(){b(this,this.getAttribute("color")),this.#c()}disconnectedCallback(){this.#t.removeEventListener("click",this.#s),this.#t.removeEventListener("keydown",this.#o),this.#r.removeEventListener("slotchange",this.#n),this.#e.removeEventListener("slotchange",this.#n)}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#t&&this.#c()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}get value(){return this.getAttribute("value")}set value(t){t==null?this.removeAttribute("value"):this.setAttribute("value",t)}#c(){const t=(s,n)=>this.getAttribute(s)??n,e=this.hasAttribute("checked"),i=this.hasAttribute("disabled");this.#t.className=`rcd rcd--${t("size","md")} rcd--t-${t("tone","default")} rcd--lbl-${t("label-position","right")}`+(e?" is-on":"")+(i?" is-disabled":""),this.#t.disabled=i,this.#t.setAttribute("aria-checked",String(e)),this.#r.textContent=t("label",""),this.#e.textContent=t("description",""),this.#a()}#a(){const t=!!this.getAttribute("description")||this.#e.assignedNodes({flatten:!0}).length>0;this.#i.style.display=t?"":"none"}#d(){if(this.hasAttribute("disabled")||this.hasAttribute("checked"))return;const t=this.getAttribute("name");if(t){const e=this.getRootNode(),i=`vs-radio-card[name="${window.CSS.escape(t)}"]`;for(const s of e.querySelectorAll(i))s!==this&&(s.checked=!1)}this.checked=!0,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:!0,value:this.getAttribute("value")}}))}#l(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this.#d())}}customElements.define("vs-radio-card",g);
