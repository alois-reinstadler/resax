const g=`
:host { display: inline-flex; }
:host([block]) { display: flex; width: 100%; }
.tac {
  --fs: var(--ctrl-fs-md, 14px);
  --px: 12px;
  --py: 10px;
  --lh: 1.6;
  --r: var(--ctrl-r-md, 12px);
  --accent: var(--inp-accent, #ededed);
  --gutter-w: 3ch;
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  min-width: 320px;
  font-family: inherit;
}
.tac--block { display: flex; width: 100%; min-width: 0; }
.tac--sm { --fs: var(--ctrl-fs-sm, 13px); --r: var(--ctrl-r-sm, 10px); }
.tac--lg { --fs: var(--ctrl-fs-lg, 15px); --r: var(--ctrl-r-lg, 14px); }

.tac__label {
  font-size: calc(var(--fs) - 1px);
  font-weight: 500;
  color: var(--inp-label, #8a8a8a);
  padding: 0 2px;
}

.tac__field {
  position: relative;
  display: flex;
  align-items: stretch;
  border-radius: var(--r);
  border: 1px solid var(--inp-border, #2a2a2a);
  background: var(--bg-code, var(--bg-elevated, #0e0e0e));
  overflow: hidden;
  transition: border-color 200ms ease, box-shadow 200ms ease;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
}
.tac.is-focused .tac__field {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgb(var(--inp-ring, 255 255 255) / 0.12);
}

/* line-number gutter — scrolls in sync with the textarea (JS) */
.tac__gutter {
  flex: none;
  width: calc(var(--gutter-w) + var(--px));
  padding: var(--py) 6px var(--py) var(--px);
  box-sizing: content-box;
  overflow: hidden;
  text-align: right;
  user-select: none;
  color: var(--text-muted, #5a5a5a);
  background: color-mix(in srgb, var(--inp-border, #2a2a2a) 22%, transparent);
  border-right: 1px solid var(--inp-border, #2a2a2a);
  font-size: var(--fs);
  line-height: var(--lh);
}
.tac__ln { display: block; font-variant-numeric: tabular-nums; }

.tac__control {
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
  min-height: calc(var(--rows) * var(--lh) * var(--fs) + var(--py) * 2);
  padding: var(--py) var(--px);
  border: none;
  background: transparent;
  color: var(--inp-text, #ededed);
  font-family: inherit;
  font-size: var(--fs);
  line-height: var(--lh);
  tab-size: 2;
  white-space: pre;
  overflow: auto;
  outline: none;
  resize: vertical;
}
.tac.is-wrap .tac__control { white-space: pre-wrap; overflow-wrap: break-word; overflow-x: hidden; }
.tac__control::placeholder { color: var(--inp-placeholder, #5a5a5a); }

/* meta */
.tac__meta { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; padding: 0 2px; }
.tac__hint { margin: 0; font-size: calc(var(--fs) - 1px); color: var(--inp-hint, #7a7a7a); font-family: inherit; }
.tac__counter { margin-left: auto; font-size: calc(var(--fs) - 2px); font-variant-numeric: tabular-nums; color: var(--inp-hint, #7a7a7a); }
.tac__counter.is-full { color: var(--inp-t-danger-hint, #ff8d91); }

/* disabled / readonly */
.tac.is-disabled { opacity: 0.5; }
.tac.is-disabled .tac__control { cursor: not-allowed; resize: none; }
.tac.is-readonly .tac__field { background: var(--inp-readonly-bg, rgba(255, 255, 255, 0.02)); }

/* tones — recolor accent/border + hint (mirrors vs-input's --t-* contract) */
.tac--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
.tac--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
.tac--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }
.tac--t-danger .tac__field { border-color: var(--inp-t-danger-rest, #5b1a1d); }
.tac--t-warn .tac__field { border-color: var(--inp-t-warn-rest, #5a3d10); }
.tac--t-success .tac__field { border-color: var(--inp-t-success-rest, #1b3b2a); }
.tac--t-danger .tac__hint { color: var(--inp-t-danger-hint, #ff8d91); }
.tac--t-warn .tac__hint { color: var(--inp-t-warn-hint, #ffce6e); }
.tac--t-success .tac__hint { color: var(--inp-t-success-hint, #79d3a6); }

@media (prefers-reduced-motion: reduce) {
  .tac__field { transition: none; }
}
`;let h;function y(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(c,t){const e=t?y(String(t).trim()):null;if(!e){for(const i of x)c.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),a=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,s=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(i=>Math.round(a?i*.92:i+(255-i)*.16)),o=(i,u)=>c.style.setProperty(i,u);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(i,s);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(i,a?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])o(i,a?"0 0 0":"255 255 255");o("--vs-color",s),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["value","placeholder","label","size","rows","hint","maxlength","wrap","block","disabled","readonly","tone","line-numbers","color"];#s;#n;#l;#e;#t;#r;#o;#a;#h=!1;#c=!0;#u=t=>this.#y(t);#p=t=>{t.stopPropagation(),this.#d("change")};#f=t=>this.#x(t);#b=t=>this.#_(t);#v=()=>{this.#c&&(this.#e.scrollTop=this.#t.scrollTop)};#m=t=>this.#w(t);constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#s=document.createElement("div"),this.#s.className="tac",this.#n=document.createElement("label"),this.#n.className="tac__label",this.#l=document.createElement("div"),this.#l.className="tac__field",this.#e=document.createElement("div"),this.#e.className="tac__gutter",this.#e.setAttribute("aria-hidden","true"),this.#t=document.createElement("textarea"),this.#t.className="tac__control",this.#t.spellcheck=!1,this.#t.setAttribute("autocapitalize","off"),this.#t.setAttribute("autocomplete","off"),this.#l.append(this.#e,this.#t),this.#r=document.createElement("div"),this.#r.className="tac__meta",this.#o=document.createElement("p"),this.#o.className="tac__hint",this.#a=document.createElement("span"),this.#a.className="tac__counter",this.#r.append(this.#o,this.#a),this.#s.append(this.#n,this.#l,this.#r),t.append(e,this.#s),this.#t.addEventListener("input",this.#u),this.#t.addEventListener("change",this.#p),this.#t.addEventListener("focus",this.#f),this.#t.addEventListener("blur",this.#b),this.#t.addEventListener("scroll",this.#v),this.#t.addEventListener("keydown",this.#m)}connectedCallback(){v(this,this.getAttribute("color")),this.#i()}disconnectedCallback(){this.#t.removeEventListener("input",this.#u),this.#t.removeEventListener("change",this.#p),this.#t.removeEventListener("focus",this.#f),this.#t.removeEventListener("blur",this.#b),this.#t.removeEventListener("scroll",this.#v),this.#t.removeEventListener("keydown",this.#m)}attributeChangedCallback(){v(this,this.getAttribute("color")),this.#t&&this.#i()}get value(){return this.#t.value}set value(t){const e=t==null?"":String(t);this.#t.value!==e&&(this.#t.value=e),this.getAttribute("value")!==e&&this.setAttribute("value",e),this.#i()}focus(){this.#t.focus()}blur(){this.#t.blur()}#i(){const t=(d,m)=>this.getAttribute(d)??m,e=this.hasAttribute("disabled"),n=this.hasAttribute("readonly"),r=t("label","Code"),a=t("hint",""),s=parseInt(t("maxlength","0"),10)||0,l=Math.max(1,parseInt(t("rows","6"),10)||6),o=this.hasAttribute("wrap"),i=this.hasAttribute("block"),u=t("size","md"),f=t("tone","default");this.#c=this.getAttribute("line-numbers")!=="false";const b=t("value","");this.#t.value!==b&&(this.#t.value=b),this.#t.rows=l,this.#t.placeholder=t("placeholder",""),this.#t.disabled=e,this.#t.readOnly=n,s>0?this.#t.setAttribute("maxlength",String(s)):this.#t.removeAttribute("maxlength"),r?this.#t.setAttribute("aria-label",r):this.#t.removeAttribute("aria-label"),this.#s.style.setProperty("--rows",String(l)),this.#s.className=`tac tac--${u}`+(f!=="default"?` tac--t-${f}`:"")+(this.#h?" is-focused":"")+(e?" is-disabled":"")+(n?" is-readonly":"")+(i?" tac--block":"")+(o?" is-wrap":""),this.#n.textContent=r,this.#n.style.display=r?"":"none",this.#e.style.display=this.#c?"":"none",this.#c&&this.#g(l);const p=s>0;if(this.#o.textContent=a,this.#o.style.display=a?"":"none",this.#a.style.display=p?"":"none",this.#r.style.display=a||p?"":"none",p){const d=this.#t.value.length;this.#a.textContent=`${d}/${s}`,this.#a.classList.toggle("is-full",d>=s)}}#g(t){const e=Math.max(t,this.#t.value.split(`
`).length),n=this.#e.childElementCount;if(e>n){const r=document.createDocumentFragment();for(let a=n+1;a<=e;a++){const s=document.createElement("span");s.className="tac__ln",s.textContent=String(a),r.appendChild(s)}this.#e.appendChild(r)}else if(e<n)for(let r=n;r>e;r--)this.#e.lastElementChild.remove();this.#e.scrollTop=this.#t.scrollTop}#y(t){t?.stopPropagation();const e=this.#t.value;this.getAttribute("value")!==e?this.setAttribute("value",e):this.#i(),this.#d("input")}#d(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#t.value}}))}#x(t){this.#h=!0,this.#i(),this.dispatchEvent(new CustomEvent("focus",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}#_(t){this.#h=!1,this.#i(),this.dispatchEvent(new CustomEvent("blur",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}#w(t){if(t.key!=="Tab"||this.hasAttribute("readonly")||this.hasAttribute("disabled"))return;t.preventDefault();const e=this.#t,n=e.selectionStart,r=e.selectionEnd,a=e.value,s=a.slice(0,n)+"  "+a.slice(r);e.value=s,e.selectionStart=e.selectionEnd=n+2,this.getAttribute("value")!==s?this.setAttribute("value",s):this.#i(),this.#d("input")}}customElements.define("vs-textarea-code",_);
