const h="http://www.w3.org/2000/svg",m=`
  :host { display: inline-flex; width: 100%; }
  .sta {
    --fs: var(--ctrl-fs-md, 14px);
    --h: 42px;
    --arrow: 16px;   /* chevron depth */
    --accent: var(--ui-accent, #ededed);
    --ring: var(--ui-ring, 255 255 255);
    --done-fg: var(--ui-accent-fg, #0b0b0b);
    display: inline-flex;
    width: 100%;
    font-family: inherit;
    font-size: var(--fs);
    color: var(--text, #ededed);
    border-radius: 10px;
    overflow: hidden;
  }
  .sta--sm { --fs: 13px; --h: 36px; --arrow: 13px; }
  .sta--lg { --fs: 15px; --h: 50px; --arrow: 20px; }

  .sta__step {
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    height: var(--h);
    margin-left: calc(var(--arrow) * -1 + 3px); /* overlap so chevrons interlock */
    padding: 0;
    border: 0;
    background: var(--bg-elevated, #16181d);
    color: var(--text-muted, #8a8a8a);
    font: inherit;
    cursor: default;
    /* chevron: left notch + right point */
    clip-path: polygon(
      0 0, calc(100% - var(--arrow)) 0, 100% 50%,
      calc(100% - var(--arrow)) 100%, 0 100%, var(--arrow) 50%
    );
    transition: background-color 300ms cubic-bezier(0.22, 1, 0.36, 1), color 260ms ease;
  }
  .sta__step.is-first { margin-left: 0; clip-path: polygon(0 0, calc(100% - var(--arrow)) 0, 100% 50%, calc(100% - var(--arrow)) 100%, 0 100%); }
  .sta__step.is-last { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, var(--arrow) 50%); }
  .sta__step.is-first.is-last { clip-path: none; }

  .sta__inner {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 100%;
    padding: 0 12px 0 calc(var(--arrow) + 10px);
    min-width: 0;
  }
  .sta__step.is-first .sta__inner { padding-left: 14px; }
  .sta__badge {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px; height: 22px;
    border-radius: 999px;
    border: 1.5px solid currentColor;
    font-size: calc(var(--fs) - 3px);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .sta__badge svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
  .sta__label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500; }

  /* icon swap: all 3 badge nodes (check/error/number) exist always — the SFC's
     v-if is not available imperatively, so visibility follows the step's
     status class instead. Only one is ever visible at a time. */
  .sta__badge-icon { display: none; }
  .sta__badge-num { display: inline; }
  .sta__step.is-completed .sta__badge-check { display: block; }
  .sta__step.is-completed .sta__badge-num { display: none; }
  .sta__step.is-error .sta__badge-error { display: block; }
  .sta__step.is-error .sta__badge-num { display: none; }

  /* states */
  .sta__step.is-completed { background: color-mix(in srgb, var(--accent) 22%, var(--bg-elevated, #16181d)); color: var(--text, #ededed); }
  .sta__step.is-completed .sta__badge { background: var(--accent); border-color: var(--accent); color: var(--done-fg); }
  .sta__step.is-active { background: var(--accent); color: var(--done-fg); }
  .sta__step.is-active .sta__badge { border-color: var(--done-fg); }
  .sta__step.is-error { background: #ff6369; color: #fff; }
  .sta__step.is-error .sta__badge { border-color: #fff; }
  .sta--clickable .sta__step.is-nav { cursor: pointer; }
  .sta--clickable .sta__step.is-nav:hover { filter: brightness(1.12); }

  /* tones */
  .sta--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --done-fg: #fff; }
  .sta--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --done-fg: #1a1206; }
  .sta--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --done-fg: #06180f; }

  .is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .sta__step { transition: none; }
  }
`;let g;function v(b){if(g||=document.createElement("canvas").getContext("2d"),!g)return null;g.fillStyle="#000",g.fillStyle=b;const e=g.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(b,e){const t=e?v(String(e).trim()):null;if(!t){for(const r of _)b.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),o=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,a=t.map(r=>Math.round(o?r*.92:r+(255-r)*.16)),i=(r,c)=>b.style.setProperty(r,c);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(r,l);i("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(r,o?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])i(r,o?"0 0 0":"255 255 255");i("--vs-color",l),i("--vs-color-rgb",t.join(" ")),i("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class A extends HTMLElement{static observedAttributes=["steps","current","value","size","tone","numbered","clickable","disabled","color"];#t;#e=[];#r=[];#i=!0;#s=1;#n=e=>this.#h(e);constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=m,this.#t=document.createElement("div"),this.#t.className="sta",this.#t.setAttribute("role","list"),e.append(t,this.#t)}connectedCallback(){f(this,this.getAttribute("color")),this.#o(),this.#t.addEventListener("click",this.#n)}disconnectedCallback(){this.#t.removeEventListener("click",this.#n)}attributeChangedCallback(){f(this,this.getAttribute("color")),this.#t&&this.#o()}get current(){return this.#s}set current(e){this.setAttribute("current",String(e|0))}get value(){return this.#s}set value(e){this.setAttribute("value",String(e|0))}get steps(){return this.#r}set steps(e){Array.isArray(e)?this.setAttribute("steps",JSON.stringify(e)):this.removeAttribute("steps")}#a(e,t){if(!this.hasAttribute(e))return t;const s=this.getAttribute(e);return s!=="false"&&s!=="0"}#u(){const e=this.getAttribute("steps");if(e&&e.trim())try{const t=JSON.parse(e);if(Array.isArray(t)&&t.length)return t.map(s=>typeof s=="string"?{label:s}:s||{})}catch{const t=e.split(",").map(s=>s.trim()).filter(Boolean);if(t.length)return t.map(s=>({label:s}))}return[{label:"Account"},{label:"Profile"},{label:"Confirm"}]}#o(){const e=this.#u(),t=this.hasAttribute("numbered"),s=this.getAttribute("size")||"md",n=this.getAttribute("tone")||"default",o=this.#a("clickable",!1),l=this.hasAttribute("disabled");if(this.#t.className=["sta",`sta--${s}`,`sta--t-${n}`,o?"sta--clickable":"",l?"is-disabled":""].filter(Boolean).join(" "),e.length!==this.#e.length||t!==this.#i)this.#p(e,t),this.#i=t;else for(let r=0;r<e.length;r++){const c=e[r].label??`Step ${r+1}`;this.#e[r].labelEl.textContent=c,this.#e[r].numEl&&(this.#e[r].numEl.textContent=String(r+1))}this.#r=e;const a=this.getAttribute("current")??this.getAttribute("value"),i=a==null?this.#s:parseInt(a,10)||0;this.#s=Math.min(Math.max(i,0),e.length-1),this.#l()}#p(e,t){for(const s of this.#e)s.btn.remove();this.#e=[];for(let s=0;s<e.length;s++){const n=document.createElement("button");n.type="button",n.className="sta__step",n.setAttribute("role","listitem"),n.dataset.index=String(s);const o=document.createElement("span");o.className="sta__inner";let l=null,a=null,i=null,r=null;if(t){l=document.createElement("span"),l.className="sta__badge",a=document.createElementNS(h,"svg"),a.setAttribute("class","sta__badge-icon sta__badge-check"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("aria-hidden","true");const d=document.createElementNS(h,"path");d.setAttribute("d","M7.75 11.9999L10.58 14.8299L16.25 9.16992"),d.setAttribute("stroke","currentColor"),d.setAttribute("stroke-width","1.5"),d.setAttribute("stroke-linecap","round"),d.setAttribute("stroke-linejoin","round"),a.appendChild(d),i=document.createElementNS(h,"svg"),i.setAttribute("class","sta__badge-icon sta__badge-error"),i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("fill","none"),i.setAttribute("aria-hidden","true");const u=document.createElementNS(h,"path");u.setAttribute("d","M9.17004 14.8299L14.83 9.16992"),u.setAttribute("stroke","currentColor"),u.setAttribute("stroke-width","1.5"),u.setAttribute("stroke-linecap","round"),u.setAttribute("stroke-linejoin","round");const p=document.createElementNS(h,"path");p.setAttribute("d","M14.83 14.8299L9.17004 9.16992"),p.setAttribute("stroke","currentColor"),p.setAttribute("stroke-width","1.5"),p.setAttribute("stroke-linecap","round"),p.setAttribute("stroke-linejoin","round"),i.append(u,p),r=document.createElement("span"),r.className="sta__badge-num",r.textContent=String(s+1),l.append(a,i,r),o.appendChild(l)}const c=document.createElement("span");c.className="sta__label",c.textContent=e[s].label??`Step ${s+1}`,o.appendChild(c),n.appendChild(o),this.#t.appendChild(n),this.#e.push({btn:n,badge:l,checkSvg:a,errSvg:i,numEl:r,labelEl:c})}}#l(){const e=this.#e.length;for(let t=0;t<e;t++){const{btn:s}=this.#e[t],n=this.#c(t);s.classList.toggle("is-completed",n==="completed"),s.classList.toggle("is-active",n==="active"),s.classList.toggle("is-pending",n==="pending"),s.classList.toggle("is-error",n==="error"),s.classList.toggle("is-first",t===0),s.classList.toggle("is-last",t===e-1),s.classList.toggle("is-nav",this.#d(t)),n==="active"?s.setAttribute("aria-current","step"):s.removeAttribute("aria-current")}}#c(e){const t=this.#r[e]?.status;return t||(e<this.#s?"completed":e===this.#s?"active":"pending")}#d(e){return this.#a("clickable",!1)&&!this.hasAttribute("disabled")&&this.#c(e)==="completed"}#b(e,t=!0){const s=Math.min(Math.max(e,0),this.#e.length-1);s!==this.#s&&(this.#s=s,this.setAttribute("current",String(s)),this.setAttribute("value",String(s)),this.#l(),t&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{index:s}})))}#h(e){const t=e.target.closest(".sta__step");if(!t||!this.#t.contains(t))return;const s=Number(t.dataset.index);this.#d(s)&&this.#b(s)}}customElements.define("vs-steps-arrow",A);
