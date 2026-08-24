const d="http://www.w3.org/2000/svg",m=["Account","Profile","Confirm"],p=`
  :host { display: block; width: 100%; }
  .stb {
    --fs: var(--ctrl-fs-md, 14px);
    --mk: 26px;
    --line: 3px;
    --accent: var(--ui-accent, #ededed);
    --ring: var(--ui-ring, 255 255 255);
    --done-fg: var(--ui-accent-fg, #0b0b0b);
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    /* the rail is elastic — a floor here only made the whole bar wider than a
       phone column, which pushed the "n / n" counter out past the right edge */
    min-width: 0;
    font-family: inherit;
    color: var(--text, #ededed);
  }
  .stb--sm { --fs: 13px; --mk: 22px; }
  .stb--lg { --fs: 15px; --mk: 30px; }

  .stb__head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
  .stb__title { font-size: var(--fs); font-weight: 600; }
  .stb__count { font-size: calc(var(--fs) - 1px); font-variant-numeric: tabular-nums; color: var(--text-muted, #8a8a8a); }

  /* the bar track + a fill that grows to the current node */
  .stb__track {
    position: relative;
    height: var(--mk);
    margin: 0 calc(var(--mk) / 2);
  }
  .stb__track::before {
    content: '';
    position: absolute;
    left: 0; right: 0; top: 50%;
    height: var(--line);
    transform: translateY(-50%);
    border-radius: 999px;
    background: var(--border, #2a2a2a);
  }
  .stb__fill {
    position: absolute;
    left: 0; top: 50%;
    height: var(--line);
    transform: translateY(-50%);
    border-radius: 999px;
    background: var(--accent);
    box-shadow: 0 0 10px color-mix(in srgb, var(--accent) 45%, transparent);
    transition: width 520ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* nodes positioned along the bar (translate -50% to center on the point) */
  .stb__node {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--mk);
    height: var(--mk);
    padding: 0;
    border: 2px solid var(--border, #2a2a2a);
    border-radius: 999px;
    background: var(--bg-card, #141414);
    color: var(--text-muted, #8a8a8a);
    font: inherit;
    font-size: calc(var(--fs) - 2px);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    cursor: default;
    transition: border-color 280ms ease, background-color 280ms ease, color 280ms ease, transform 280ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  }
  .stb__node.is-completed { background: var(--accent); border-color: var(--accent); color: var(--done-fg); }
  .stb__node.is-active { border-color: var(--accent); color: var(--accent); transform: translate(-50%, -50%) scale(1.12); box-shadow: 0 0 0 4px rgb(var(--ring) / 0.16); }
  .stb__node.is-error { background: #ff6369; border-color: #ff6369; color: #fff; }
  .stb--clickable .stb__node.is-nav { cursor: pointer; }
  /* icon/number swap is class-driven (native DOM has no v-if) — nodes are built
     once with all three children and only visibility toggles per status */
  .stb__ico { width: 58%; height: 58%; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; display: none; }
  .stb__node.is-completed .stb__ico--check { display: block; }
  .stb__node.is-error .stb__ico--err { display: block; }
  .stb__num { line-height: 1; display: block; }
  .stb__node.is-completed .stb__num, .stb__node.is-error .stb__num { display: none; }

  /* labels aligned under each node */
  .stb__labels { position: relative; height: calc(var(--fs) * 1.4); margin: 0 calc(var(--mk) / 2); }
  .stb__label {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    max-width: 100px;
    font-size: calc(var(--fs) - 2px);
    line-height: 1.3;
    text-align: center;
    color: var(--text-muted, #8a8a8a);
    transition: color 240ms ease;
  }
  /* The first and last nodes sit ON the ends of the rail, so centring their
     labels hangs half of each one outside the component: "Account" is chopped
     by the box's left edge and "Confirm" widens the page. The terminals hang
     inward instead — only the middle ones stay centred on their node. */
  .stb__label:first-child { transform: none; text-align: left; }
  .stb__label:last-child:not(:first-child) { transform: translateX(-100%); text-align: right; }
  .stb__label.is-active { color: var(--text, #ededed); font-weight: 600; }
  .stb__label.is-completed { color: var(--text-secondary, #a8a8a8); }
  .stb__label.is-error { color: #ff6369; }

  /* tones */
  .stb--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --done-fg: #fff; }
  .stb--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --done-fg: #1a1206; }
  .stb--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --done-fg: #06180f; }

  .is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .stb__fill, .stb__node, .stb__label { transition: none; }
    .stb__node.is-active { transform: translate(-50%, -50%); }
  }
`;let u;function g(h){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=h;const e=u.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(h,e){const t=e?g(String(e).trim()):null;if(!t){for(const s of _)h.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),l=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,a=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(s=>Math.round(l?s*.92:s+(255-s)*.16)),r=(s,c)=>h.style.setProperty(s,c);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(s,a);r("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(s,t.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(s,l?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])r(s,l?"0 0 0":"255 255 255");r("--vs-color",a),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["steps","current","value","size","tone","show-count","clickable","disabled","color"];#r;#l;#n;#s;#a;#o;#i=[];#t=[];#e=1;#d=e=>{const t=e.target.closest(".stb__node");if(!t||!this.#s.contains(t))return;const i=Number(t.dataset.idx);Number.isNaN(i)||this.#p(i)};constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=p,this.#r=document.createElement("div"),this.#r.className="stb";const i=document.createElement("div");i.className="stb__head",this.#l=document.createElement("span"),this.#l.className="stb__title",this.#n=document.createElement("span"),this.#n.className="stb__count",i.append(this.#l,this.#n),this.#s=document.createElement("div"),this.#s.className="stb__track",this.#a=document.createElement("span"),this.#a.className="stb__fill",this.#a.setAttribute("aria-hidden","true"),this.#s.appendChild(this.#a),this.#o=document.createElement("div"),this.#o.className="stb__labels",this.#r.append(i,this.#s,this.#o),e.append(t,this.#r),this.#s.addEventListener("click",this.#d)}connectedCallback(){f(this,this.getAttribute("color")),this.#t.length||(this.hasAttribute("steps")?this.#u():(this.#t=m.map(e=>({label:e})),this.#h())),this.#b()}disconnectedCallback(){this.#s.removeEventListener("click",this.#d)}attributeChangedCallback(e){f(this,this.getAttribute("color")),this.#r&&(e==="steps"&&this.#u(),this.#b())}get steps(){return this.#t}set steps(e){this.#t=Array.isArray(e)?e.map(t=>typeof t=="string"?{label:t}:t||{}):[],this.#h(),this.#b()}get current(){return this.#e}set current(e){this.setAttribute("current",String(e|0))}get value(){return this.#e}set value(e){this.setAttribute("value",String(e|0))}#c(e,t){if(!this.hasAttribute(e))return t;const i=this.getAttribute(e);return i!=="false"&&i!=="0"}#u(){const e=this.getAttribute("steps");if(e==null)return;let t=[];try{const i=JSON.parse(e);Array.isArray(i)&&(t=i.map(n=>typeof n=="string"?{label:n}:n||{}))}catch{t=e.split(",").map(i=>i.trim()).filter(Boolean).map(i=>({label:i}))}this.#t=t.length?t:this.#t,this.#h()}#b(){const e=this.getAttribute("value")??this.getAttribute("current"),t=e==null?this.#e:parseInt(e,10)||0,i=this.#i.length;this.#e=Math.min(Math.max(t,0),Math.max(i-1,0));const n=this.#c("clickable",!1);this.#r.className=["stb",`stb--${this.getAttribute("size")||"md"}`,`stb--t-${this.getAttribute("tone")||"default"}`,n?"stb--clickable":"",this.hasAttribute("disabled")?"is-disabled":""].filter(Boolean).join(" "),this.#f()}#h(){for(const t of this.#i)t.btn.remove();this.#i=[],this.#o.replaceChildren();const e=this.#t.length;for(let t=0;t<e;t++){const i=e>1?`${t/(e-1)*100}%`:"0%",n=document.createElement("button");n.type="button",n.className="stb__node",n.dataset.idx=String(t),n.style.left=i;const l=document.createElementNS(d,"svg");l.setAttribute("class","stb__ico stb__ico--check"),l.setAttribute("viewBox","0 0 24 24"),l.setAttribute("fill","none"),l.setAttribute("aria-hidden","true");const a=document.createElementNS(d,"path");a.setAttribute("d","M7.75 11.9999L10.58 14.8299L16.25 9.16992"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),l.appendChild(a);const o=document.createElementNS(d,"svg");o.setAttribute("class","stb__ico stb__ico--err"),o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("aria-hidden","true");const r=document.createElementNS(d,"path");r.setAttribute("d","M9.17004 14.8299L14.83 9.16992"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.5"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round");const s=document.createElementNS(d,"path");s.setAttribute("d","M14.83 14.8299L9.17004 9.16992"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),o.append(r,s);const c=document.createElement("span");c.className="stb__num",c.textContent=String(t+1),n.append(l,o,c),this.#s.appendChild(n);const b=document.createElement("span");b.className="stb__label",b.style.left=i,this.#o.appendChild(b),this.#i.push({btn:n,label:b})}}#f(){const e=this.#i.length,t=this.#c("clickable",!1),i=this.hasAttribute("disabled"),n=this.hasAttribute("show-count"),l=Math.min(Math.max(this.#e,0),Math.max(e-1,0));this.#l.textContent=this.#t[l]?.label??"",this.#n.style.display=n?"":"none",this.#n.textContent=`${Math.min(this.#e+1,e)} / ${e}`,this.#a.style.width=`${e>1?l/(e-1)*100:0}%`;for(let a=0;a<e;a++){const{btn:o,label:r}=this.#i[a],s=this.#m(a),c=t&&!i&&s==="completed",b=this.#t[a]?.label??`Step ${a+1}`;o.className=`stb__node is-${s}${c?" is-nav":""}`,o.disabled=i,o.setAttribute("aria-label",b),s==="active"?o.setAttribute("aria-current","step"):o.removeAttribute("aria-current"),r.className=`stb__label is-${s}`,r.textContent=b}}#m(e){const t=this.#t[e]?.status;return t||(e<this.#e?"completed":e===this.#e?"active":"pending")}#p(e){this.hasAttribute("disabled")||!this.#c("clickable",!1)||this.#m(e)==="completed"&&this.#g(e)}#g(e){const t=Math.min(Math.max(e,0),Math.max(this.#i.length-1,0));t!==this.#e&&(this.#e=t,this.setAttribute("value",String(t)),this.setAttribute("current",String(t)),this.#f(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{index:t,value:t}})))}}customElements.define("vs-steps-bar",v);
