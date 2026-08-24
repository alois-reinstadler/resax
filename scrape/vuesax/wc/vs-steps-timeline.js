const h="http://www.w3.org/2000/svg",v="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z";function x(b){const t=document.createElementNS(h,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const e of b){const r=document.createElementNS(h,"path");r.setAttribute("d",e),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.5"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),t.appendChild(r)}return t}const y=()=>x([v,"M7.75 11.9999L10.58 14.8299L16.25 9.16992"]),k=()=>x([v,"M9.17004 14.8299L14.83 9.16992","M14.83 14.8299L9.17004 9.16992"]),g=[{label:"Account",description:"Create your credentials"},{label:"Profile",description:"Tell us about yourself"},{label:"Confirm",description:"Review and finish"}],w=`
  .stt {
    --fs: var(--ctrl-fs-md, 14px);
    --mk: 30px;
    --line: 2px;
    --accent: var(--ui-accent, #ededed);
    --ring: var(--ui-ring, 255 255 255);
    --done-fg: var(--ui-accent-fg, #0b0b0b);
    list-style: none;
    margin: 0;
    /* kills the <ol> indent, and buys the rail a hair of breathing room: the
       active dot grows past its own box (scale + a 4px ring) and the cards need
       a gutter, so flush against the container both get shaved by its edges */
    padding: 4px 4px 0;
    display: flex;
    flex-direction: column;
    /* the rows already shrink on their own; a floor here just pushed the whole
       stepper wider than a phone column */
    min-width: 0;
    font-family: inherit;
    color: var(--text, #ededed);
  }
  .stt--sm { --fs: 13px; --mk: 26px; }
  .stt--lg { --fs: 15px; --mk: 34px; }

  .stt__item { position: relative; display: flex; gap: 14px; }

  .stt__rail { position: relative; display: flex; flex-direction: column; align-items: center; flex: none; width: var(--mk); }
  .stt__dot {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--mk); height: var(--mk);
    border-radius: 999px;
    border: 2px solid var(--border, #2a2a2a);
    background: var(--bg-card, #141414);
    color: var(--text-muted, #8a8a8a);
    font-size: calc(var(--fs) - 2px);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    transition: background-color 280ms ease, border-color 280ms ease, color 280ms ease, transform 280ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  }
  .stt__dot svg { width: 56%; height: 56%; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
  /* connector fills between dots */
  .stt__line {
    flex: 1 1 auto;
    width: var(--line);
    margin: 4px 0;
    min-height: 12px;
    background: var(--border, #2a2a2a);
    border-radius: 999px;
    overflow: hidden;
  }
  .stt__line::after {
    content: '';
    display: block;
    width: 100%; height: 100%;
    background: var(--accent);
    transform: scaleY(0);
    transform-origin: top center;
    transition: transform 480ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .stt__item:last-child .stt__line { display: none; }
  .stt__item.is-completed .stt__line::after { transform: scaleY(1); }

  /* dot states */
  .stt__item.is-completed .stt__dot { background: var(--accent); border-color: var(--accent); color: var(--done-fg); }
  .stt__item.is-active .stt__dot { border-color: var(--accent); color: var(--accent); transform: scale(1.08); box-shadow: 0 0 0 4px rgb(var(--ring) / 0.16); }
  .stt__item.is-error .stt__dot { background: #ff6369; border-color: #ff6369; color: #fff; }

  /* body */
  .stt__body { display: flex; flex-direction: column; gap: 3px; padding-bottom: 20px; min-width: 0; flex: 1 1 auto; }
  .stt__item:last-child .stt__body { padding-bottom: 0; }
  .stt__label { font-size: var(--fs); font-weight: 500; line-height: 1.3; color: var(--text-muted, #8a8a8a); transition: color 240ms ease; }
  .stt__item.is-active .stt__label { color: var(--text, #ededed); font-weight: 600; }
  .stt__item.is-completed .stt__label { color: var(--text-secondary, #a8a8a8); }
  .stt__item.is-error .stt__label { color: #ff6369; }
  .stt__desc { font-size: calc(var(--fs) - 2px); color: var(--text-muted, #8a8a8a); line-height: 1.45; }

  /* card mode: wrap body in an elevated panel */
  .stt--cards .stt__body {
    margin-bottom: 14px;
    padding: 10px 14px;
    border: 1px solid var(--border, #2a2a2a);
    border-radius: 12px;
    background: var(--bg-card, #141414);
    transition: border-color 240ms ease, transform 240ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  }
  .stt--cards .stt__item.is-active .stt__body { border-color: color-mix(in srgb, var(--accent) 55%, var(--border, #2a2a2a)); }
  .stt--cards .stt__item:last-child .stt__body { margin-bottom: 0; }

  /* clickable */
  .stt--clickable .stt__item.is-nav { cursor: pointer; }
  .stt--clickable .stt__item.is-nav:hover .stt__dot { border-color: var(--accent); }

  /* tones */
  .stt--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --done-fg: #fff; }
  .stt--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --done-fg: #1a1206; }
  .stt--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --done-fg: #06180f; }

  .is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .stt__dot, .stt__line::after, .stt__label, .stt--cards .stt__body { transition: none; }
    .stt__item.is-active .stt__dot { transform: none; }
  }
`;let f;function A(b){if(f||=document.createElement("canvas").getContext("2d"),!f)return null;f.fillStyle="#000",f.fillStyle=b;const t=f.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const C=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function _(b,t){const e=t?A(String(t).trim()):null;if(!e){for(const s of C)b.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),a=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,u=e.map(s=>Math.round(a?s*.92:s+(255-s)*.16)),i=(s,n)=>b.style.setProperty(s,n);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(s,o);i("--btn-primary-bg-hover",`rgb(${u[0]} ${u[1]} ${u[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(s,a?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])i(s,a?"0 0 0":"255 255 255");i("--vs-color",o),i("--vs-color-rgb",e.join(" ")),i("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class E extends HTMLElement{static observedAttributes=["current","value","size","tone","clickable","disabled","cards","color"];#t;#n=null;#r=[];#e=[];#s=1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=w,this.#t=document.createElement("ol"),this.#t.className="stt",t.append(e,this.#t)}connectedCallback(){_(this,this.getAttribute("color")),this.#o(),this.#i()}disconnectedCallback(){for(const t of this.#e)t.dot.removeEventListener("click",t.onClick)}attributeChangedCallback(){_(this,this.getAttribute("color")),this.#t&&this.#i()}get steps(){return this.#n??g}set steps(t){this.#n=Array.isArray(t)?t:null,this.#t&&(this.#o(),this.#i())}get current(){return this.#s}set current(t){this.setAttribute("current",String(t|0))}get value(){return this.#s}set value(t){this.setAttribute("value",String(t|0))}#a(t,e){if(!this.hasAttribute(t))return e;const r=this.getAttribute(t);return r!=="false"&&r!=="0"}#o(){for(const e of this.#e)e.dot.removeEventListener("click",e.onClick);this.#t.textContent="",this.#e=[];const t=this.#n??g;this.#r=t.map(e=>typeof e=="string"?{label:e}:e||{}),this.#r.forEach((e,r)=>{const d=document.createElement("li");d.className="stt__item";const a=document.createElement("div");a.className="stt__rail";const o=document.createElement("span");o.className="stt__dot",o.setAttribute("aria-hidden","true");const u=y(),i=k(),s=document.createElement("span");s.textContent=String(r+1),o.append(u,i,s);const n=document.createElement("span");n.className="stt__line",n.setAttribute("aria-hidden","true"),a.append(o,n);const m=document.createElement("div");m.className="stt__body";const c=document.createElement("span");c.className="stt__label";const l=document.createElement("span");l.className="stt__desc",m.append(c,l),c.textContent=e.label||"",e.description?(l.textContent=e.description,l.style.display=""):l.style.display="none",d.append(a,m),this.#t.appendChild(d);const p=()=>this.#l(r);o.addEventListener("click",p),this.#e.push({li:d,dot:o,checkIco:u,errorIco:i,numEl:s,canNav:!1,onClick:p})})}#i(){const t=this.getAttribute("size")||"md",e=this.getAttribute("tone")||"default",r=this.hasAttribute("cards"),d=this.#a("clickable",!1),a=this.hasAttribute("disabled");this.#t.className=["stt",`stt--${t}`,`stt--t-${e}`,r?"stt--cards":"",d?"stt--clickable":"",a?"is-disabled":""].filter(Boolean).join(" ");const o=this.getAttribute("current")??this.getAttribute("value"),u=o==null?1:parseInt(o,10)||0,i=this.#r.length;this.#s=i?Math.min(Math.max(u,0),i-1):0;for(let s=0;s<this.#e.length;s++){const n=this.#e[s],c=this.#r[s]?.status||(s<this.#s?"completed":s===this.#s?"active":"pending"),l=d&&!a&&c==="completed";n.canNav=l,n.li.className=`stt__item is-${c}`+(l?" is-nav":""),c==="active"?n.li.setAttribute("aria-current","step"):n.li.removeAttribute("aria-current"),l?(n.dot.setAttribute("role","button"),n.dot.tabIndex=0):(n.dot.removeAttribute("role"),n.dot.removeAttribute("tabindex")),n.checkIco.style.display=c==="completed"?"":"none",n.errorIco.style.display=c==="error"?"":"none",n.numEl.style.display=c==="completed"||c==="error"?"none":""}}#c(t){t!==this.#s&&(this.setAttribute("current",String(t)),this.setAttribute("value",String(t)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{index:t}})))}#l(t){const e=this.#e[t];!e||!e.canNav||this.#c(t)}}customElements.define("vs-steps-timeline",E);
