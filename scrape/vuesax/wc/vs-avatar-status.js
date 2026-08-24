const g=`
  :host { display: inline-flex; }
  .avs {
    --sz: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 15px); --dot: 11px; --r: 50%;
    position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center;
    width: var(--sz); height: var(--sz); border-radius: var(--r); flex: none; user-select: none; }
  .avs__face {
    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
    border-radius: inherit; overflow: hidden;
    background: var(--vs-color, hsl(var(--avs-hue, 220) 45% 22%)); color: var(--vs-color-fg, hsl(var(--avs-hue, 220) 70% 78%)); }
  /* sizes */
  .avs--xs { --sz: var(--ctrl-h-xs, 24px); --fs: var(--ctrl-fs-xs, 10px); --dot: 7px; }
  .avs--sm { --sz: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 12px); --dot: 9px; }
  .avs--md { --sz: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 15px); --dot: 11px; }
  .avs--lg { --sz: var(--ctrl-h-lg, 56px); --fs: var(--ctrl-fs-lg, 20px); --dot: 14px; }
  .avs--xl { --sz: var(--ctrl-h-xl, 80px); --fs: var(--ctrl-fs-xl, 28px); --dot: 18px; }
  /* shapes */
  .avs--s-circle { --r: 50%; }
  .avs--s-rounded { --r: var(--ctrl-r-md, 12px); }
  .avs--s-squircle { --r: var(--ctrl-r-lg, 16px); }
  @supports (corner-shape: squircle) {
    .avs--s-squircle, .avs--s-squircle .avs__face { corner-shape: squircle; } }
  .avs--bordered .avs__face {
    box-shadow: 0 0 0 2px var(--bg-card, #111), 0 0 0 3px var(--inp-border, #2a2a2a); }
  .avs__img {
    width: 100%; height: 100%; object-fit: cover; display: block; pointer-events: none; -webkit-user-drag: none; }
  .avs__initials {
    font-family: inherit; font-weight: 600; font-size: var(--fs); line-height: 1; letter-spacing: 0.02em; }
  .avs__placeholder { width: 62%; height: 62%; color: var(--inp-text, #ededed); opacity: 0.5; }
  /* ── presence dot ───────────────────────────────────────────── */
  .avs__dot {
    position: absolute; right: 0; bottom: 0; width: var(--dot); height: var(--dot); border-radius: 50%;
    box-shadow: 0 0 0 2px var(--bg-card, #111); z-index: 2; transform: translate(-6%, -6%); }
  .avs--s-circle .avs__dot { transform: translate(-8%, -8%); }
  .avs__dot--online { background: var(--accent, #5b8cff); }
  .avs__dot--idle { background: #f0b232; }
  .avs__dot--dnd { background: #f23f43; }
  .avs__dot--offline {
    background: var(--bg-card, #111);
    box-shadow: 0 0 0 2px var(--bg-card, #111), inset 0 0 0 2.5px var(--inp-border, #2a2a2a); }
  /* pulsing expanding halo for online — position:absolute, out of flow */
  .avs__dot--pulse::after {
    content: ''; position: absolute; inset: 0; border-radius: 50%;
    background: var(--accent, #5b8cff); z-index: -1; animation: avs-pulse 1.8s ease-out infinite; }
  @keyframes avs-pulse {
    0% { transform: scale(1); opacity: 0.55; }
    70% { transform: scale(2.4); opacity: 0; }
    100% { transform: scale(2.4); opacity: 0; } }
  @media (prefers-reduced-motion: reduce) {
    .avs__dot--pulse::after { animation: none; display: none; } }
`;let d;function m(c){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=c;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(c,t){const e=t?m(String(t).trim()):null;if(!e){for(const s of x)c.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),o=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,n=e.map(s=>Math.round(o?s*.92:s+(255-s)*.16)),r=(s,l)=>c.style.setProperty(s,l);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(s,a);r("--btn-primary-bg-hover",`rgb(${n[0]} ${n[1]} ${n[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(s,o?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])r(s,o?"0 0 0":"255 255 255");r("--vs-color",a),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["src","alt","name","size","shape","bordered","status","color"];#l;#s;#a;#t;#i;#e;#r;#n=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#s=document.createElement("span"),this.#s.className="avs",this.#a=document.createElement("span"),this.#a.className="avs__face",this.#t=document.createElement("img"),this.#t.className="avs__img",this.#t.draggable=!1,this.#t.addEventListener("error",()=>{this.#n=!0,this.#o()}),this.#i=document.createElement("span"),this.#i.className="avs__initials",this.#i.setAttribute("aria-hidden","true"),this.#e=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.#e.setAttribute("class","avs__placeholder"),this.#e.setAttribute("viewBox","0 0 24 24"),this.#e.setAttribute("fill","none"),this.#e.setAttribute("aria-hidden","true"),this.#e.innerHTML='<path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />',this.#a.append(this.#t,this.#i,this.#e),this.#r=document.createElement("span"),this.#r.className="avs__dot",this.#r.setAttribute("role","img"),this.#s.append(this.#a,this.#r),t.append(e,this.#s),this.#l=t}connectedCallback(){f(this,this.getAttribute("color")),this.#o()}attributeChangedCallback(t){f(this,this.getAttribute("color")),this.#s&&(t==="src"&&(this.#n=!1),this.#o())}#c(){const t=(this.getAttribute("name")||this.getAttribute("alt")||"").trim();if(!t)return"";const e=t.split(/\s+/);return e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase()}#d(){const t=this.getAttribute("name")||this.getAttribute("alt")||"";let e=0;for(let i=0;i<t.length;i++)e=(e*31+t.charCodeAt(i))%360;return e}#o(){const t=(v,b)=>this.getAttribute(v)??b,e=t("size","md"),i=t("shape","circle"),h=this.getAttribute("bordered"),o=h===null?!0:h!=="false",a=t("status","online"),n=t("src",""),r=this.getAttribute("alt")||"",s=this.getAttribute("name")||"";this.#s.className=`avs avs--${e} avs--s-${i}`+(o?" avs--bordered":""),this.#s.style.setProperty("--avs-hue",String(this.#d()));const l=!!n&&!this.#n,u=this.#c();this.#t.style.display=l?"":"none",l&&this.#t.getAttribute("src")!==n&&this.#t.setAttribute("src",n),this.#t.setAttribute("alt",r||s),this.#i.textContent=u,this.#i.style.display=!l&&u?"":"none",this.#e.style.display=!l&&!u?"":"none";const p=a!=="none";this.#r.style.display=p?"":"none",this.#r.className="avs__dot"+(p?` avs__dot--${a}`:"")+(a==="online"?" avs__dot--pulse":""),this.#r.setAttribute("aria-label",a)}set src(t){t==null?this.removeAttribute("src"):this.setAttribute("src",t)}get src(){return this.getAttribute("src")||""}set name(t){t==null?this.removeAttribute("name"):this.setAttribute("name",t)}get name(){return this.getAttribute("name")||""}set status(t){t==null?this.removeAttribute("status"):this.setAttribute("status",t)}get status(){return this.getAttribute("status")||"online"}disconnectedCallback(){this.#t.removeAttribute("src")}}customElements.define("vs-avatar-status",_);
