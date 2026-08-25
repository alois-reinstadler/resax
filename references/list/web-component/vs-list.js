import{FX_CSS as L,attachGlow as k,pressRipple as M}from"./vs-fx.CLXiCjCI.js";const x="http://www.w3.org/2000/svg",N=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;function h(d,{miter:t=!1,cap:e=!0}={}){const i=document.createElementNS(x,"path");return i.setAttribute("d",d),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),t&&i.setAttribute("stroke-miterlimit","10"),e&&(i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round")),i}function f(d){const t=document.createElementNS(x,"svg");t.setAttribute("class","vsl-action__icon"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const e of d)t.appendChild(e);return t}const T={pin:()=>f([h("M12 13.4295C13.7231 13.4295 15.12 12.0326 15.12 10.3095C15.12 8.58633 13.7231 7.18945 12 7.18945C10.2769 7.18945 8.88 8.58633 8.88 10.3095C8.88 12.0326 10.2769 13.4295 12 13.4295Z",{cap:!1}),h("M3.61995 8.49C5.58995 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.38995 20.54C5.62995 17.88 2.46995 13.57 3.61995 8.49Z",{cap:!1})]),archive:()=>f([h("M9.25 9.05078C11.03 9.70078 12.97 9.70078 14.75 9.05078"),h("M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z")]),flag:()=>f([h("M5.15002 2V22",{miter:!0}),h("M5.15002 4H16.35C19.05 4 19.65 5.5 17.75 7.4L16.55 8.6C15.75 9.4 15.75 10.7 16.55 11.4L17.75 12.6C19.65 14.5 18.95 16 16.35 16H5.15002",{miter:!0})]),edit:()=>f([h("M13.26 3.59924L5.04997 12.2892C4.73997 12.6192 4.43997 13.2692 4.37997 13.7192L4.00997 16.9592C3.87997 18.1292 4.71997 18.9292 5.87997 18.7292L9.09997 18.1792C9.54997 18.0992 10.18 17.7692 10.49 17.4292L18.7 8.73924C20.12 7.23924 20.76 5.52924 18.55 3.43924C16.35 1.36924 14.68 2.09924 13.26 3.59924Z",{miter:!0}),h("M11.89 5.05078C12.32 7.81078 14.56 9.92078 17.34 10.2008",{miter:!0}),h("M3 22H21",{miter:!0})]),delete:()=>f([h("M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047"),h("M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"),h("M18.85 9.14062L18.2 19.2106C18.09 20.7806 18 22.0006 15.21 22.0006H8.79002C6.00002 22.0006 5.91002 20.7806 5.80002 19.2106L5.15002 9.14062"),h("M10.33 16.5H13.66"),h("M9.5 12.5H14.5")]),more:()=>f([h("M12 9.32C13.19 9.32 14.16 8.35 14.16 7.16C14.16 5.97 13.19 5 12 5C10.81 5 9.83997 5.97 9.83997 7.16C9.83997 8.35 10.81 9.32 12 9.32Z"),h("M6.79 18.9997C7.98 18.9997 8.95 18.0297 8.95 16.8397C8.95 15.6497 7.98 14.6797 6.79 14.6797C5.6 14.6797 4.63 15.6497 4.63 16.8397C4.63 18.0297 5.59 18.9997 6.79 18.9997Z"),h("M17.21 18.9997C18.4 18.9997 19.37 18.0297 19.37 16.8397C19.37 15.6497 18.4 14.6797 17.21 14.6797C16.02 14.6797 15.05 15.6497 15.05 16.8397C15.05 18.0297 16.02 18.9997 17.21 18.9997Z")])};function S(d){const t=T[d];return t?t():null}function D(){const d=document.createElementNS(x,"svg");return d.setAttribute("class","vsl-row__chevron"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.setAttribute("aria-hidden","true"),d.appendChild(h("M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008",{miter:!0})),d}function _(d){const t=document.createElement("span");t.className="vsl-row__avatar-initials";const e=String(d||"").trim().split(/\s+/).filter(Boolean);t.textContent=e.length?(e[0][0]+(e.length>1?e[e.length-1][0]:"")).toUpperCase():"";let i=0;for(let s=0;s<d.length;s++)i=i*31+d.charCodeAt(s)|0;return t.style.setProperty("--vsl-ava-hue",String(Math.abs(i)%360)),t}const C=[{id:1,title:"Ada Lovelace",subtitle:"Track your order #4821",meta:"09:24",name:"Ada Lovelace"},{id:2,title:"Grace Hopper",subtitle:"Invoice ready for review",meta:"Yesterday",name:"Grace Hopper"},{id:3,title:"Alan Turing",subtitle:"Commented on your proposal",meta:"Mon",name:"Alan Turing"},{id:4,title:"Katherine Johnson",subtitle:"New connection accepted",meta:"Mon",name:"Katherine Johnson"}],b=[{key:"edit",label:"Edit",tone:"default",icon:"edit"},{key:"archive",label:"Archive",tone:"warn",icon:"archive"},{key:"delete",label:"Delete",tone:"danger",icon:"delete",dismiss:!0,confirm:!0}],y=[{key:"pin",label:"Pin",tone:"success",icon:"pin"}],E={default:"161 161 161",danger:"255 99 105",warn:"255 178 36",success:"76 195 138"},m={sm:64,md:76,lg:88},I=240,B=`
  :host { display: block; width: 100%; }
  ${L}
  .vsl {
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    position: relative;
    isolation: isolate;
    width: 100%;
    background: var(--bg-card, #0a0a0a);
    border: 1px solid var(--border, #1f1f1f);
    overflow: hidden;
  }
  .vsl--plain { border: none; background: transparent; border-radius: 0 !important; --vsl-radius: 0px; }

  .vsl { border-radius: var(--vsl-radius, 12px); }
  .vsl--r-none { --vsl-radius: 0px; }
  .vsl--r-subtle { --vsl-radius: 8px; }
  .vsl--r-rounded { --vsl-radius: var(--radius-card, 12px); }
  .vsl--r-pill { --vsl-radius: 26px; }
  @supports (corner-shape: squircle) {
    .vsl--r-squircle { corner-shape: squircle; --vsl-radius: 22px; }
  }

  .vsl__rows { display: flex; flex-direction: column; }

  .vsl-wrap { display: grid; grid-template-rows: 1fr; transition: grid-template-rows 280ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)); }
  .vsl-wrap__collapse { min-height: 0; overflow: hidden; transition: opacity 220ms ease; }
  .vsl-wrap.is-removing { grid-template-rows: 0fr; }
  .vsl-wrap.is-removing .vsl-wrap__collapse { opacity: 0; }
  .vsl-wrap + .vsl-wrap .vsl-row { border-top: 1px solid var(--border, #1f1f1f); }

  .vsl-row { position: relative; display: flex; overflow: hidden; }

  .vsl-wrap:first-child .vsl-row__content {
    border-top-left-radius: var(--vsl-radius, 12px);
    border-top-right-radius: var(--vsl-radius, 12px);
  }
  .vsl-wrap:last-child .vsl-row__content {
    border-bottom-left-radius: var(--vsl-radius, 12px);
    border-bottom-right-radius: var(--vsl-radius, 12px);
  }
  @supports (corner-shape: squircle) {
    .vsl--r-squircle .vsl-wrap:first-child .vsl-row__content,
    .vsl--r-squircle .vsl-wrap:last-child .vsl-row__content { corner-shape: squircle; }
  }

  .vsl-row__content {
    position: relative;
    isolation: isolate;
    z-index: 2;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    padding: var(--vsl-py, 14px) var(--vsl-px, 16px);
    background: var(--bg-card, #0a0a0a);
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    cursor: grab;
    transition: transform 460ms var(--vsl-spring, cubic-bezier(0.34, 1.85, 0.4, 1));
    will-change: transform;
  }
  .vsl-row__content:active { cursor: grabbing; }
  .vsl-row__content:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--accent); }
  .vsl-row__content:hover { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.03)); }

  .vsl-row__glow {
    --glow-strength: 0.5;
    --glow-ring: 1px;
    --glow-inset: 0;
    --glow-r-core: 70px;
    --glow-r-soft: 220px;
    padding: 0 var(--glow-ring);
    border-radius: inherit;
  }
  .vsl-wrap:first-child .vsl-row__glow { padding-top: var(--glow-ring); }
  .vsl-wrap:last-child .vsl-row__glow { padding-bottom: var(--glow-ring); }

  .vsl-row__avatar { flex: none; width: var(--ctrl-h-sm, 32px); height: var(--ctrl-h-sm, 32px); border-radius: 50%; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; background: hsl(var(--vsl-ava-hue, 220) 0% 22%); user-select: none; }
  .vsl-row__avatar-img { width: 100%; height: 100%; object-fit: cover; display: block; pointer-events: none; -webkit-user-drag: none; }
  .vsl-row__avatar-initials { font-size: 12px; font-weight: 600; letter-spacing: 0.02em; color: hsl(var(--vsl-ava-hue, 220) 0% 78%); }
  .vsl-row__text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .vsl-row__title { font-size: var(--vsl-fs, 14px); font-weight: 560; color: var(--text, #ededed); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vsl-row__subtitle { font-size: 12.5px; color: var(--text-secondary, #a1a1a1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vsl-row__meta { flex: none; font-size: 12px; color: var(--text-muted, #666); }
  .vsl-row__chevron { flex: none; width: 16px; height: 16px; color: var(--text-muted, #666); }

  .vsl--sm .vsl-row__content { --vsl-py: 10px; --vsl-px: 12px; --vsl-fs: 13px; }
  .vsl--lg .vsl-row__content { --vsl-py: 18px; --vsl-px: 20px; --vsl-fs: 15px; }

  .vsl-actions {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    overflow: hidden;
    transition: width 460ms var(--vsl-spring, cubic-bezier(0.34, 1.85, 0.4, 1));
  }
  .vsl-actions--left { left: 0; flex-direction: row-reverse; }
  .vsl-actions--right { right: 0; }

  .vsl-action {
    position: relative;
    isolation: isolate;
    flex: 0 0 var(--vsl-action-w, 76px);
    width: var(--vsl-action-w, 76px);
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border: none;
    padding: 4px;
    background: rgb(var(--vsl-a-fx) / 0.92);
    color: #fff;
    font: inherit;
    cursor: pointer;
    transition:
      flex-basis 380ms var(--vsl-spring, cubic-bezier(0.34, 1.85, 0.4, 1)),
      padding 380ms var(--vsl-spring, cubic-bezier(0.34, 1.85, 0.4, 1)),
      opacity 200ms ease,
      filter 150ms ease;
  }
  .vsl-action:hover { filter: brightness(1.08); }
  .vsl-action:focus-visible { outline: 2px solid #fff; outline-offset: -3px; }
  .vsl-action__icon { width: 18px; height: 18px; flex: none; }
  .vsl-action__label { font-size: 11px; font-weight: 600; letter-spacing: 0.01em; white-space: nowrap; }
  .vsl-action.is-pending { background: rgb(var(--vsl-a-fx) / 1); }
  .vsl-action.is-pending .vsl-action__label { font-weight: 700; }

  .vsl-action:last-child { flex: 1 0 auto; }

  .vsl-actions--full .vsl-action:last-child { flex: 1 1 auto; }
  .vsl-actions--full .vsl-action:not(:last-child) {
    flex-basis: 0;
    padding-left: 0;
    padding-right: 0;
    opacity: 0;
    pointer-events: none;
  }

  .vsl__empty { margin: 0; padding: 24px 16px; text-align: center; font-size: 13px; color: var(--text-muted, #666); }

  .vsl-row-enter-active { transition: opacity 220ms ease; }
  .vsl-row-enter-from { opacity: 0; }

  .vsl.is-disabled .vsl-row__content { cursor: default; pointer-events: none; }
  .vsl.is-disabled { opacity: 0.6; }

  @media (prefers-reduced-motion: reduce) {
    .vsl-wrap,
    .vsl-wrap__collapse,
    .vsl-row__content,
    .vsl-action,
    .vsl-row-enter-active { transition: none; }
  }
`;let g;function P(d){if(g||=document.createElement("canvas").getContext("2d"),!g)return null;g.fillStyle="#000",g.fillStyle=d;const t=g.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const z=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function A(d,t){const e=t?P(String(t).trim()):null;if(!e){for(const r of z)d.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(r=>Math.round(n?r*.92:r+(255-r)*.16)),l=(r,p)=>d.style.setProperty(r,p);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(r,a);l("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(r,n?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])l(r,n?"0 0 0":"255 255 255");l("--vs-color",a),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class $ extends HTMLElement{static observedAttributes=["size","radius","variant","threshold","full-swipe-ratio","swipe-to-delete","disabled","glow","color"];#s;#g;#d;#h=null;#p=null;#u=null;#v=b;#f=y;#m=m.md;#i=new Map;#_=new Set;#C=new Set;#e=null;#n=null;#t={id:null,dragging:!1,releasing:!1,moved:!1,startX:0,startTx:0,tx:0};#r=null;#E;#M=t=>this.#q(t);constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=B,this.#s=document.createElement("div"),this.#s.className="vsl",this.#s.setAttribute("role","list"),this.#g=document.createElement("div"),this.#g.className="vsl__rows",this.#d=document.createElement("p"),this.#d.className="vsl__empty",this.#d.textContent="No items.",this.#d.style.display="none",this.#s.append(this.#g,this.#d),t.append(e,this.#s)}connectedCallback(){A(this,this.getAttribute("color")),document.addEventListener("pointerdown",this.#M,!0),this.#x(),this.#I()}disconnectedCallback(){document.removeEventListener("pointerdown",this.#M,!0),clearTimeout(this.#E);for(const t of Array.from(this.#i.keys()))this.#L(t)}attributeChangedCallback(){A(this,this.getAttribute("color")),this.#s&&this.#I()}get items(){return this.#h??C}set items(t){this.#h=Array.isArray(t)?t:null,this.#_=new Set,this.#C=new Set,this.#s&&this.#x()}get actions(){return this.#p??b}set actions(t){this.#p=Array.isArray(t)?t:null,this.#s&&this.#x()}get leadingActions(){return this.#u??y}set leadingActions(t){this.#u=Array.isArray(t)?t:null,this.#s&&this.#x()}#O(t,e){if(!this.hasAttribute(t))return e;const i=this.getAttribute(t);return i!=="false"&&i!=="0"}#w(t,e){const i=this.getAttribute(t);if(i==null)return e;const s=parseFloat(i);return Number.isFinite(s)?s:e}#b(){return this.hasAttribute("disabled")}#N(){return this.hasAttribute("glow")}#l(){return this.#v.length*this.#m}#a(){return this.#f.length*this.#m}#y(t,e){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:e}))}#x(){const t=this.#h&&this.#h.length?this.#h:C;this.#v=this.#p&&this.#p.length?this.#p:b,this.#f=this.#u&&this.#u.length?this.#u:y,this.#m=m[this.getAttribute("size")||"md"]||m.md;const e=t.filter(s=>!this.#_.has(s.id)),i=new Set(e.map(s=>s.id));for(const s of Array.from(this.#i.keys()))i.has(s)||this.#L(s);for(const s of e){let n=this.#i.get(s.id);n?(this.#T(n,s),this.#S(n)):(n=this.#B(s),this.#i.set(s.id,n)),this.#g.appendChild(n.wrap),this.#o(s.id)}this.#d.style.display=e.length?"none":""}#B(t){const e=document.createElement("div");e.className="vsl-wrap";const i=document.createElement("div");i.className="vsl-wrap__collapse";const s=document.createElement("div");s.className="vsl-row",s.setAttribute("role","listitem");const n=document.createElement("div");n.className="vsl-row__content",n.tabIndex=0;const a=document.createElement("span");a.className="fx-glow vsl-row__glow",a.setAttribute("aria-hidden","true");const o=document.createElement("span");o.className="vsl-row__avatar",o.style.display="none";const l=document.createElement("span");l.className="vsl-row__title";const r=document.createElement("span");r.className="vsl-row__subtitle";const p=document.createElement("div");p.className="vsl-row__text",p.append(l,r);const v=document.createElement("span");v.className="vsl-row__meta",v.style.display="none";const w=D();n.append(a,o,p,v,w),s.append(n),i.append(s),e.append(i);const c={id:t.id,item:t,wrap:e,collapse:i,rowEl:s,content:n,glow:a,avatarWrap:o,titleEl:l,subtitleEl:r,metaEl:v,leftTrayEl:null,rightTrayEl:null,leftButtons:[],rightButtons:[],detachGlow:null};return c.onDown=u=>this.#U(c,u),c.onMove=u=>this.#R(c,u),c.onUp=u=>this.#H(c,u),n.addEventListener("pointerdown",c.onDown),n.addEventListener("pointermove",c.onMove),n.addEventListener("pointerup",c.onUp),n.addEventListener("pointercancel",c.onUp),c.onKeydown=u=>this.#G(c,u),s.addEventListener("keydown",c.onKeydown),this.#T(c,t),this.#S(c),c.detachGlow=k(n,I,()=>this.#b()||!this.#N()),e.classList.add("vsl-row-enter-active","vsl-row-enter-from"),requestAnimationFrame(()=>requestAnimationFrame(()=>e.classList.remove("vsl-row-enter-from"))),e.addEventListener("transitionend",()=>e.classList.remove("vsl-row-enter-active"),{once:!0}),c}#T(t,e){t.item=e,t.titleEl.textContent=e.title||"",e.subtitle?(t.subtitleEl.textContent=e.subtitle,t.subtitleEl.style.display=""):(t.subtitleEl.textContent="",t.subtitleEl.style.display="none"),e.meta?(t.metaEl.textContent=e.meta,t.metaEl.style.display=""):(t.metaEl.textContent="",t.metaEl.style.display="none"),e.avatar||e.name?(t.avatarWrap.style.display="",this.#P(t,e)):(t.avatarWrap.style.display="none",t.avatarWrap.textContent="")}#P(t,e){t.avatarWrap.textContent="";const i=e.name||e.title||"";if(e.avatar){const s=document.createElement("img");s.className="vsl-row__avatar-img",s.src=e.avatar,s.alt="",s.draggable=!1,s.addEventListener("error",()=>{s.remove(),t.avatarWrap.appendChild(_(i))},{once:!0}),t.avatarWrap.appendChild(s)}else t.avatarWrap.appendChild(_(i))}#S(t){this.#D(t,"left",this.#f),this.#D(t,"right",this.#v)}#D(t,e,i){const s=e==="left"?"leftTrayEl":"rightTrayEl",n=e==="left"?"leftButtons":"rightButtons",a=t[s];if(a&&(this.#A(t[n]),a.remove(),t[s]=null,t[n]=[]),!i.length)return;const o=document.createElement("div");o.className=`vsl-actions vsl-actions--${e}`;const l=[];for(const r of i)l.push(this.#z(t,r,o));e==="left"?t.rowEl.insertBefore(o,t.content):t.rowEl.appendChild(o),t[s]=o,t[n]=l}#z(t,e,i){const s=document.createElement("button");s.type="button",s.className=`vsl-action vsl-action--t-${e.tone||"default"}`,s.style.setProperty("--vsl-a-fx",E[e.tone]||E.default);const n=document.createElement("span");n.className="fx-ripples",n.setAttribute("aria-hidden","true");const a=S(e.icon),o=document.createElement("span");o.className="vsl-action__label",o.textContent=e.label,s.append(n),a&&s.append(a),s.append(o),i.appendChild(s);const l=v=>{try{M(s,n,v)}catch{}},r=()=>{s.style.transform=""},p=()=>this.#k(t,e);return s.addEventListener("pointerdown",l),s.addEventListener("pointerup",r),s.addEventListener("pointerleave",r),s.addEventListener("click",p),{btn:s,ripples:n,labelEl:o,action:e,onDown:l,onUp:r,onClick:p}}#A(t){for(const e of t)e.btn.removeEventListener("pointerdown",e.onDown),e.btn.removeEventListener("pointerup",e.onUp),e.btn.removeEventListener("pointerleave",e.onUp),e.btn.removeEventListener("click",e.onClick)}#L(t){const e=this.#i.get(t);e&&(e.detachGlow?.(),e.content.removeEventListener("pointerdown",e.onDown),e.content.removeEventListener("pointermove",e.onMove),e.content.removeEventListener("pointerup",e.onUp),e.content.removeEventListener("pointercancel",e.onUp),e.rowEl.removeEventListener("keydown",e.onKeydown),this.#A(e.leftButtons),this.#A(e.rightButtons),e.wrap.remove(),this.#i.delete(t),this.#t.id===t&&(this.#t.id=null),this.#e===t&&(this.#e=null,this.#n=null))}#o(t){const e=this.#i.get(t);if(!e)return;const i=this.#t.id===t;let s,n=!1;if(i&&this.#t.dragging)s=`translateX(${this.#t.tx}px)`,n=!0;else if(i&&this.#t.releasing)s=`translateX(${this.#t.tx}px)`;else{let o=0;this.#e===t&&(o=this.#n==="right"?-this.#l():this.#a()),s=`translateX(${o}px)`}e.content.style.transform=s,e.content.style.transition=n?"none":"";for(const o of["left","right"]){const l=o==="left"?e.leftTrayEl:e.rightTrayEl;if(!l)continue;const r=o==="left"?this.#a():this.#l();let p,v=!1;i&&(this.#t.dragging||this.#t.releasing)?(p=o==="left"?Math.max(0,this.#t.tx):Math.max(0,-this.#t.tx),v=this.#t.dragging):p=this.#e===t&&this.#n===o?r:0,l.style.width=`${p}px`,l.style.transition=v?"none":"",l.classList.toggle("vsl-actions--full",this.#$(e,o));const w=!(this.#e===t&&this.#n===o);l.setAttribute("aria-hidden",String(w));const c=o==="left"?e.leftButtons:e.rightButtons;for(const u of c)u.btn.tabIndex=w?-1:0}const a=this.#r;for(const o of[e.leftButtons,e.rightButtons])for(const l of o){const r=!!a&&a.id===t&&a.key===l.action.key;l.btn.classList.toggle("is-pending",r),l.labelEl.textContent=r?l.action.confirmLabel||"Sure?":l.action.label}}#$(t,e){if(this.#t.id!==t.id)return!1;const i=this.#w("full-swipe-ratio",1.8);return e==="right"?this.#l()>0&&-this.#t.tx>=this.#l()*i*.92:this.#a()>0&&this.#t.tx>=this.#a()*i*.92}#W(t){const e=this.#l(),i=this.#a(),s=this.#w("full-swipe-ratio",1.8),n=-e*s*1.1,a=i*s*1.1;return t<-e*s&&(t=-e*s+(t+e*s)*.25),t>i*s&&(t=i*s+(t-i*s)*.25),Math.max(n,Math.min(a,t))}#U(t,e){if(!(this.#b()||t.item.disabled)&&!(e.pointerType==="mouse"&&e.button!==0)){this.#t.id=t.id,this.#t.dragging=!1,this.#t.moved=!1,this.#t.startX=e.clientX,this.#t.startTx=this.#e===t.id?this.#n==="right"?-this.#l():this.#a():0,this.#t.tx=this.#t.startTx;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}}}#R(t,e){if(this.#t.id!==t.id)return;const i=e.clientX-this.#t.startX;!this.#t.moved&&Math.abs(i)>4&&(this.#t.moved=!0),this.#t.moved&&(this.#t.dragging=!0,this.#t.tx=this.#W(this.#t.startTx+i),this.#o(t.id))}#H(t,e){if(this.#t.id!==t.id)return;try{e.currentTarget.releasePointerCapture?.(e.pointerId)}catch{}const i=!this.#t.moved,s=this.#t.tx;if(this.#t.dragging=!1,i){this.#t.id=null,this.#t.releasing=!1,this.#e===t.id?this.#c():(this.#c(),this.#y("select",{item:t.item}));return}const n=this.#l(),a=this.#a(),o=this.hasAttribute("swipe-to-delete"),l=this.#w("full-swipe-ratio",1.8);if(n>0&&-s>=n*l*.92&&o){this.#t.id=null,this.#t.releasing=!1,this.#k(t,this.#v[this.#v.length-1],{skipConfirm:!0});return}if(a>0&&s>=a*l*.92&&o){this.#t.id=null,this.#t.releasing=!1,this.#k(t,this.#f[this.#f.length-1],{skipConfirm:!0});return}const r=this.#w("threshold",.45);n>0&&-s>n*r?(this.#e=t.id,this.#n="right"):a>0&&s>a*r?(this.#e=t.id,this.#n="left"):(this.#e=null,this.#n=null,this.#r=null),this.#F(t)}#F(t){this.#t.releasing=!0,this.#o(t.id),t.content.offsetWidth,this.#t.releasing=!1,this.#t.id=null,this.#o(t.id)}#c(){const t=this.#e;this.#e=null,this.#n=null,this.#r=null,t!=null&&this.#o(t)}#q(t){if(this.#e==null)return;const e=this.#i.get(this.#e);if(!e)return;const s=(t.composedPath?t.composedPath():[t.target])[0];e.rowEl.contains(s)||this.#c()}#G(t,e){this.#b()||t.item.disabled||(e.key==="ArrowLeft"&&this.#l()>0?(e.preventDefault(),this.#e=t.id,this.#n="right",this.#o(t.id),t.rightButtons[0]?.btn.focus()):e.key==="ArrowRight"&&this.#a()>0?(e.preventDefault(),this.#e=t.id,this.#n="left",this.#o(t.id),t.leftButtons[0]?.btn.focus()):e.key==="Escape"&&this.#e===t.id?(e.preventDefault(),this.#c(),t.content.focus()):(e.key==="Enter"||e.key===" ")&&this.#e!==t.id&&(e.preventDefault(),this.#y("select",{item:t.item})))}#k(t,e,i={}){if(!e)return;const s=this.#r;if(!(i.skipConfirm||e.confirm&&s&&s.id===t.id&&s.key===e.key)){if(e.confirm){this.#r={id:t.id,key:e.key},clearTimeout(this.#E),this.#E=setTimeout(()=>{this.#r&&this.#r.id===t.id&&this.#r.key===e.key&&(this.#r=null),this.#o(t.id)},2600),this.#o(t.id);return}}if(this.#r=null,this.#y("action",{item:t.item,action:e}),e.dismiss){this.#C.add(t.id),t.wrap.classList.add("is-removing"),this.#c();const n=t.item,a=()=>{this.#C.delete(t.id),this.#_.add(t.id),this.#L(t.id),this.#d.style.display=this.#i.size?"none":"",this.#y("remove",{item:n})};N()?a():setTimeout(a,280)}else this.#c()}#I(){const t=this.getAttribute("size")||"md",e=this.getAttribute("radius")||"rounded",i=this.getAttribute("variant")||"inset",s=this.#b();this.#m=m[t]||m.md,this.#s.className=["vsl",`vsl--${t}`,`vsl--r-${e}`,`vsl--${i}`,s?"is-disabled":""].filter(Boolean).join(" "),this.#s.style.setProperty("--vsl-action-w",`${this.#m}px`);for(const n of this.#i.keys())this.#o(n);if(s||!this.#N())for(const n of this.#i.values())n.content.style.setProperty("--glow","0")}}customElements.define("vs-list",$);
