const y=`
  :host { display: inline-flex; vertical-align: middle; }
  :host([block]) { display: flex; width: 100%; }
  :host([block]) .plasma { width: 100%; }

  .plasma {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    --plasma-bleed: 18px;
    --plasma-thickness: 2.5px;
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: calc(var(--h) * 3.05);
    height: var(--h);
    padding: 0 calc(var(--px) * 1.45);
    overflow: visible;
    border: 0;
    border-radius: calc(var(--r) * var(--r-mult, 1));
    background: transparent;
    color: var(--plasma-label, var(--inp-text, #ededed));
    font: inherit;
    font-weight: 400;
    font-size: var(--fs);
    line-height: 1;
    letter-spacing: .035em;
    text-transform: uppercase;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transform: translateZ(0) scale(var(--press-scale, 1));
    transition: transform 180ms var(--ease-out, cubic-bezier(.2,.8,.3,1)), opacity 180ms ease;
  }
  .plasma:active:not(:disabled) { --press-scale: .972; }
  .plasma:disabled { opacity: .42; cursor: not-allowed; }
  .plasma:focus { outline: none; }

  .plasma--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
  .plasma--md { --h: var(--ctrl-h-md, 40px); --r: var(--ctrl-r-md, 12px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); }
  .plasma--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); }

  .plasma--r-none { --r: 1px; }
  .plasma--r-subtle { --r: 8px; }
  .plasma--r-pill { --r: 999px; }
  @supports (corner-shape: squircle) {
    .plasma--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
    .plasma--r-squircle .plasma__focus,
    .plasma--r-squircle .plasma__ripples { corner-shape: squircle; }
  }

  .plasma__canvas {
    position: absolute;
    z-index: 0;
    display: block;
    pointer-events: none;
    max-width: none;
  }
  .plasma__label {
    position: relative;
    z-index: 3;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-width: 0;
    text-shadow: 0 0 18px color-mix(in srgb, currentColor 20%, transparent);
    transform: translate3d(var(--label-x, 0), var(--label-y, 0), 0);
    transition: text-shadow 180ms ease;
  }
  .plasma:hover:not(:disabled) .plasma__label,
  .plasma:focus-visible:not(:disabled) .plasma__label {
    text-shadow: 0 0 12px color-mix(in srgb, currentColor 42%, transparent);
  }

  .plasma__focus {
    position: absolute;
    z-index: 4;
    inset: -5px;
    border: 1px solid var(--plasma-secondary-color, var(--plasma-core, #42f5ff));
    border-radius: inherit;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--plasma-secondary-color, var(--plasma-core, #42f5ff)) 18%, transparent);
    transition: opacity 140ms ease;
  }
  .plasma:focus-visible .plasma__focus { opacity: .82; }

  .plasma__ripples {
    position: absolute;
    z-index: 2;
    inset: 0;
    overflow: hidden;
    border-radius: inherit;
    pointer-events: none;
  }
  .plasma__ripple {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    background: radial-gradient(circle,
      color-mix(in srgb, var(--vs-color, var(--plasma-color, #ff2bd6)) 38%, transparent) 0%,
      color-mix(in srgb, var(--plasma-secondary-color, var(--plasma-core, #42f5ff)) 18%, transparent) 42%,
      transparent 72%);
    animation: plasma-ripple 760ms var(--ease-out, cubic-bezier(.2,.8,.3,1)) forwards;
  }
  @keyframes plasma-ripple {
    0% { transform: translate(-50%, -50%) scale(0); opacity: .78; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
  }

  .plasma__swatch {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
  }
  .plasma__swatch--a { color: var(--vs-color, var(--plasma-color, #ff2bd6)); }
  .plasma__swatch--b { color: var(--plasma-secondary-color, var(--plasma-core, #42f5ff)); }

  /* WebGL2 is the primary renderer. This masked ring keeps the button usable
     and recognisable if a browser/device cannot create a context. */
  .plasma--fallback .plasma__canvas { opacity: 0; }
  .plasma--fallback::before {
    content: '';
    position: absolute;
    z-index: 0;
    inset: 0;
    padding: var(--plasma-thickness);
    border-radius: inherit;
    pointer-events: none;
    background: linear-gradient(105deg,
      var(--plasma-secondary-color, var(--plasma-core, #42f5ff)),
      var(--vs-color, var(--plasma-color, #ff2bd6)) 42%,
      var(--vs-color, var(--plasma-color, #ff2bd6)) 76%,
      var(--plasma-secondary-color, var(--plasma-core, #42f5ff)));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    filter: drop-shadow(0 0 5px color-mix(in srgb, var(--vs-color, var(--plasma-color, #ff2bd6)) 58%, transparent));
  }

  @media (prefers-reduced-motion: reduce) {
    .plasma { transition: none; }
    .plasma:active:not(:disabled) { --press-scale: 1; }
    .plasma__label, .plasma__focus { transition: none; }
    .plasma__ripple { display: none; }
  }
`,_=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,w=`#version 300 es
precision highp float;

out vec4 fragColor;

uniform vec2 u_res;
uniform vec2 u_half;
uniform float u_radius;
uniform float u_time;
uniform float u_thickness;
uniform float u_intensity;
uniform float u_fill;
uniform float u_shell;
uniform float u_arc;
uniform float u_energy;
uniform float u_press;
uniform float u_pressArc;
uniform vec3 u_colA;
uniform vec3 u_colB;

const float TAU = 6.28318530718;

float hash21(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 q = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, q.x), mix(c, d, q.x), q.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    sum += amp * vnoise(p);
    p = p * 2.03 + vec2(7.1, 11.7);
    amp *= 0.5;
  }
  return sum;
}

float sdRoundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

float arcDistance(float a, float b) {
  return abs(fract(a - b + 0.5) - 0.5);
}

vec2 rotate2(vec2 v, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
}

void main() {
  vec2 p = gl_FragCoord.xy - u_res * 0.5;
  vec2 safeHalf = max(u_half, vec2(1.0));
  vec2 pn = p / safeHalf;
  float ang = atan(pn.y, pn.x);
  float arc = ang / TAU;
  vec2 ring = vec2(cos(ang), sin(ang));

  // Rotate the entire periodic field with the orbit. Small XY drift prevents a
  // mechanical spinner feel while preserving one coherent travelling texture.
  vec2 flowingRing = rotate2(ring, -u_arc * TAU);
  float n0 = fbm(flowingRing * 2.55 + vec2(u_time * 0.035, -u_time * 0.022));
  float n1 = fbm(flowingRing * 4.10 + vec2(-u_time * 0.025, u_time * 0.038) + 5.7);
  float n2 = fbm(flowingRing * 6.40 + vec2(u_time * 0.045, u_time * 0.018) + 13.1);
  float wave = (n0 - 0.5) * 1.22 + (n1 - 0.5) * 0.72
    + sin(ang * 3.0 - u_time * 0.78) * 0.18
    + sin(ang * 7.0 + u_time * 0.43) * 0.09;
  float activity = smoothstep(0.03, 0.92, clamp(u_shell, 0.0, 1.0));

  // One coherent energy current orbits the whole pill. It never stops; hover
  // only increases the speed in JS and reveals the more energetic layers.
  float orbitDistance = arcDistance(arc, u_arc);
  float orbitHead = exp(-pow(orbitDistance / 0.070, 2.0));
  float orbitWakeDistance = arcDistance(arc, fract(u_arc - 0.105));
  float orbitWake = exp(-pow(orbitWakeDistance / 0.145, 2.0));
  float orbitEnergy = clamp(orbitHead + orbitWake * 0.34, 0.0, 1.0);

  // Hover keeps the hand-pulled silhouette alive, but it is driven entirely by
  // time. The pointer never selects which part of the outline should move.
  float leftBias = 0.78
    + 0.46 * smoothstep(-0.15, 0.98, -cos(ang))
    + 0.16 * smoothstep(0.05, 0.96, sin(ang));
  float hoverLift = wave * u_intensity * activity * leftBias
    * min(safeHalf.y, 30.0) * 0.17;

  // Roughly once every nine seconds, a small family of crests grows on top of
  // the orbiting current, rides around the perimeter, then dissolves again.
  float mountainClock = u_time * 0.11;
  float mountainCycle = floor(mountainClock);
  float mountainPhase = fract(mountainClock);
  float mountainLife = smoothstep(0.10, 0.21, mountainPhase)
    * (1.0 - smoothstep(0.46, 0.68, mountainPhase));
  float mountainSeed = hash21(vec2(mountainCycle + 2.7, 8.3));
  float mountainCenter = fract(u_arc + (mountainSeed - 0.5) * 0.16
    + sin(mountainPhase * TAU) * 0.025);
  float peakA = exp(-pow(arcDistance(arc, mountainCenter) / 0.030, 2.0));
  float peakB = exp(-pow(arcDistance(arc, mountainCenter - 0.054) / 0.022, 2.0));
  float peakC = exp(-pow(arcDistance(arc, mountainCenter + 0.047) / 0.018, 2.0));
  float mountains = mountainLife * (peakA + peakB * 0.52 + peakC * 0.32);
  float mountainLift = mountains * u_intensity * mix(1.0, 1.28, activity)
    * min(safeHalf.y, 30.0) * 0.46;

  float autonomousKnot = exp(-orbitDistance * orbitDistance * 54.0) * u_energy;
  float pressDistance = arcDistance(arc, u_pressArc);
  float pressureWave = sin(pressDistance * TAU * 11.0 - u_time * 7.5)
    * exp(-pressDistance * pressDistance * 24.0) * u_press * u_intensity;

  float d0 = sdRoundBox(p, safeHalf, min(u_radius, min(safeHalf.x, safeHalf.y)));
  float calmDrift = (n0 - 0.5) * u_thickness * 0.18 * u_intensity;
  float orbitLift = orbitEnergy * u_thickness * mix(0.20, 0.72, activity) * u_intensity;
  float rawDeform = calmDrift + orbitLift + mountainLift + hoverLift
    + autonomousKnot * u_thickness * (0.94 + 1.58 * activity) * u_intensity
    + pressureWave * u_thickness * 0.95;
  float deform = clamp(rawDeform, -safeHalf.y * 0.82, safeHalf.y * 0.82);
  float d = d0 - deform;
  float width = max(u_thickness, 1.0);

  // Calm: one continuous core. Active: the original filaments separate from
  // that core and braid around it without ever steering toward the cursor.
  float ridge = 1.0 - abs(n2 * 2.0 - 1.0);
  ridge = pow(smoothstep(0.18, 1.0, ridge), 1.55);
  float cleanCore = exp(-pow(abs(d) / (width * 0.54), 2.0));
  float offA = (n1 - 0.5) * width * 3.2 - width * 0.72;
  float offB = (n2 - 0.5) * width * 3.8 + width * 0.78;
  float strandA = exp(-pow(abs(d + offA) / (width * 0.29), 2.0));
  float strandB = exp(-pow(abs(d + offB) / (width * 0.24), 2.0));
  float micro = exp(-pow(abs(d + (n0 - 0.5) * width * 4.6) / (width * 0.16), 2.0));
  float pulse = 0.64
    + 0.52 * pow(0.5 + 0.5 * cos(TAU * (arc - u_arc)), 7.0)
    + 0.24 * pow(0.5 + 0.5 * cos(TAU * (arc * 2.0 - u_arc * 2.0)), 5.0);

  float activeCore = cleanCore * (0.50 + 0.66 * ridge) * pulse;
  float filaments = strandA * 0.72 + strandB * 0.64 + micro * 0.42;
  float calmCore = cleanCore * (0.88 + orbitEnergy * 0.18);
  float plasma = mix(calmCore, activeCore + filaments, activity);
  float halo = exp(-abs(d) / (width * 3.35))
    * mix(0.045 + orbitEnergy * 0.105, 0.13 + 0.13 * pulse, activity);
  float rimAlpha = clamp(plasma * 0.90 + halo, 0.0, 1.0);

  // The cyan/magenta split belongs to the same orbit, making rotation readable
  // even while the calm state remains a single continuous line.
  float chromaOrbit = 0.5 + 0.5 * sin(ang - u_arc * TAU);
  float chroma = clamp(0.08 + 0.84 * chromaOrbit + activity
    * (0.12 * sin(ang * 2.0 - u_time * 0.21) + (n1 - 0.5) * 0.16), 0.0, 1.0);
  vec3 rimTone = mix(u_colA, u_colB, chroma);
  vec3 hotTone = mix(rimTone, u_colB, 0.10 + 0.16 * strandA);
  vec3 activeColor = mix(rimTone, hotTone, clamp(strandA * 0.62 + micro * 0.34, 0.0, 1.0));
  vec3 rimColor = mix(rimTone, activeColor, activity);
  rimColor = clamp(rimColor
    * mix(0.94 + orbitEnergy * 0.13, 0.92 + 0.12 * pulse, activity), 0.0, 1.0);

  float aa = max(fwidth(d) * 1.35, 0.85);
  float inside = 1.0 - smoothstep(-aa, aa, d);
  float fillNoise = fbm(p / max(safeHalf.y, 1.0) * 0.72 + vec2(u_time * 0.045, -u_time * 0.035));
  float fillAlpha = inside * u_fill * (0.32 + fillNoise * 0.20);
  vec3 fillTone = mix(u_colA, u_colB, 0.12 + 0.14 * (0.5 + 0.5 * sin(ang - u_time * 0.12)));
  fillTone *= 0.62 + fillNoise * 0.20;

  float alpha = clamp(rimAlpha + fillAlpha * (1.0 - rimAlpha), 0.0, 1.0);
  vec3 premultiplied = rimColor * rimAlpha
    + fillTone * fillAlpha * (1.0 - rimAlpha);
  vec3 color = clamp(premultiplied / max(alpha, 0.001), 0.0, 1.0);
  fragColor = vec4(color, alpha);
}`,k=["u_res","u_half","u_radius","u_time","u_thickness","u_intensity","u_fill","u_shell","u_arc","u_energy","u_press","u_pressArc","u_colA","u_colB"];class u{x=0;v=0;target=0;constructor(t,e){this.k=t,this.d=e}step(t){const e=t/2;for(let i=0;i<2;i++){const s=-this.k*(this.x-this.target)-this.d*this.v;this.v+=s*e,this.x+=this.v*e}}get settled(){return Math.abs(this.v)<.002&&Math.abs(this.x-this.target)<.002}snap(){this.x=this.target,this.v=0}}const n=(l,t,e)=>Math.max(t,Math.min(e,l)),m=(l,t,e)=>{const i=Number.parseFloat(l.getAttribute(t));return Number.isFinite(i)?i:e};let p;function d(l){const t=String(l||"").trim();if(!t||(p||=document.createElement("canvas").getContext("2d"),!p))return null;p.fillStyle="#010203",p.fillStyle=t;const e=String(p.fillStyle);p.fillStyle="#fefdfc",p.fillStyle=t;const i=String(p.fillStyle);return e===i?e:null}function v(l,t="#ffffff"){const e=d(l)||d(t);if(!e)return null;if(e.startsWith("#")){const s=e.slice(1),o=s.length===3?s.replace(/./g,h=>h+h):s.slice(0,6),r=Number.parseInt(o,16);if(Number.isFinite(r))return[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255]}const i=e.match(/[\d.]+/g)?.map(Number)||[];if(i.length>=3){const s=e.includes("color(")||e.includes("srgb")?1:255;return[n(i[0]/s,0,1),n(i[1]/s,0,1),n(i[2]/s,0,1)]}return null}const A=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(l,t){const e=t?v(String(t).trim(),""):null;if(!e||!String(t||"").trim()){for(const a of A)l.style.removeProperty(a);return}const i=e.map(a=>Math.round(a*255)),s=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),r=.2126*s(i[0])+.7152*s(i[1])+.0722*s(i[2])>.45,h=`rgb(${i[0]} ${i[1]} ${i[2]})`,f=i.map(a=>Math.round(r?a*.92:a+(255-a)*.16)),c=(a,x)=>l.style.setProperty(a,x);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(a,h);c("--btn-primary-bg-hover",`rgb(${f[0]} ${f[1]} ${f[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(a,i.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(a,r?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])c(a,r?"0 0 0":"255 255 255");c("--vs-color",h),c("--vs-color-rgb",i.join(" ")),c("--vs-color-fg",r?"#0b0b0b":"#ffffff")}function g(l,t){const e=String(t||"").trim();if(!e){l.style.removeProperty("--plasma-secondary-color");return}if(!d(e)){l.style.removeProperty("--plasma-secondary-color");return}l.style.setProperty("--plasma-secondary-color",e)}class C extends HTMLElement{static observedAttributes=["label","variant","size","radius","color","secondary-color","thickness","speed","intensity","fill","stiffness","damping","lag","disabled","block","aria-label","title"];#t;#i;#H;#u;#P;#D;#g=null;#d=null;#v=null;#B={};#f=!1;#q=!1;#o=!0;#x=!1;#s=0;#y=0;#R=0;#l=0;#G=.12;#C=.12;#E=!1;#S=!1;#z=!0;#h=!1;#F=null;#N=null;#$=null;#M=null;#b=1;#I=1;#U=1;#_=1;#w=1;#O=1;#k=1;#A=18;#p={a:[1,.17,.84],b:[.26,.96,1]};#e={variant:"ghost",radius:"pill",thickness:2.5,speed:1,intensity:.78,fill:.72,stiffness:260,damping:17,lag:.45};#c=new u(260,17);#a=new u(187,15);#r=new u(300,22);constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=y,this.#t=document.createElement("button"),this.#t.type="button",this.#t.setAttribute("part","button"),this.#i=document.createElement("canvas"),this.#i.className="plasma__canvas",this.#i.setAttribute("part","canvas"),this.#i.setAttribute("aria-hidden","true"),this.#u=document.createElement("span"),this.#u.className="plasma__ripples",this.#u.setAttribute("aria-hidden","true");const i=document.createElement("span");i.className="plasma__label",i.setAttribute("part","label"),this.#H=document.createElement("slot"),i.append(this.#H);const s=document.createElement("span");s.className="plasma__focus",s.setAttribute("aria-hidden","true"),this.#P=document.createElement("span"),this.#P.className="plasma__swatch plasma__swatch--a",this.#D=document.createElement("span"),this.#D.className="plasma__swatch plasma__swatch--b",this.#t.append(this.#i,this.#u,i,s,this.#P,this.#D),t.append(e,this.#t),this.#i.addEventListener("webglcontextlost",this.#ht),this.#i.addEventListener("webglcontextrestored",this.#ct)}connectedCallback(){this.#x||(this.#x=!0,this.#o=!1,this.#q=!1,this.#M=matchMedia("(prefers-reduced-motion: reduce)"),this.#h=this.#M.matches,this.#M.addEventListener?.("change",this.#K),this.#t.addEventListener("pointerenter",this.#Z),this.#t.addEventListener("pointerleave",this.#tt),this.#t.addEventListener("pointerdown",this.#st),this.#t.addEventListener("focus",this.#et),this.#t.addEventListener("blur",this.#it),document.addEventListener("visibilitychange",this.#X),this.#N=new ResizeObserver(this.#ot),this.#N.observe(this.#t),this.#F=new IntersectionObserver(t=>{this.#z=t[0]?.isIntersecting??!0,this.#m()}),this.#F.observe(this),this.#$=new MutationObserver(this.#nt),this.#$.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),b(this,this.getAttribute("color")),g(this,this.getAttribute("secondary-color")),this.#j(),this.#f=this.#J(),this.#V(!this.#f),this.#T(),this.#W(),this.#r.x=this.#r.target=.28,this.#h?(this.#R=0,this.#c.snap(),this.#a.snap(),this.#n()):(this.#n(),this.#m()),document.fonts?.ready.then(()=>{this.#o||this.#T()}))}disconnectedCallback(){if(!this.#x)return;this.#o=!0,this.#x=!1,this.#E=!1,this.#S=!1,this.#l=0,cancelAnimationFrame(this.#s),this.#s=0,this.#y=0,this.#N?.disconnect(),this.#F?.disconnect(),this.#$?.disconnect(),this.#N=this.#F=this.#$=null,this.#M?.removeEventListener?.("change",this.#K),this.#M=null,document.removeEventListener("visibilitychange",this.#X),this.#t.removeEventListener("pointerenter",this.#Z),this.#t.removeEventListener("pointerleave",this.#tt),this.#t.removeEventListener("pointerdown",this.#st),this.#t.removeEventListener("focus",this.#et),this.#t.removeEventListener("blur",this.#it);const t=this.#g;t&&(this.#v&&t.deleteVertexArray(this.#v),this.#d&&t.deleteProgram(this.#d)),this.#g=null,this.#d=null,this.#v=null,this.#B={},this.#f=!1}attributeChangedCallback(t,e,i){e!==i&&(t==="color"&&b(this,i),t==="secondary-color"&&g(this,i),this.#t&&(this.#j(),this.#x&&(this.#W(),this.#T(),this.#n(),this.#m())))}#j(){const t=(h,f,c)=>{const a=this.getAttribute(h)||c;return f.includes(a)?a:c},e=t("variant",["primary","secondary","ghost"],"ghost"),i=t("size",["sm","md","lg"],"lg"),s=t("radius",["none","subtle","rounded","pill","squircle"],"pill");this.#e={variant:e,radius:s,thickness:n(m(this,"thickness",2.5),1,7),speed:n(m(this,"speed",100)/100,0,4),intensity:n(m(this,"intensity",78)/100,0,1.5),fill:n(m(this,"fill",72)/100,0,1),stiffness:n(m(this,"stiffness",260),80,600),damping:n(m(this,"damping",17),6,50),lag:n(m(this,"lag",.45),0,.9)};const o=this.#e.stiffness,r=this.#e.damping;this.#c.k=o,this.#c.d=r,this.#a.k=o*(1-this.#e.lag*.62),this.#a.d=r*(1-this.#e.lag*.3),this.#r.k=o*1.16,this.#r.d=r*1.24,this.#t.className=`plasma plasma--${e} plasma--${i} plasma--r-${s}`+(this.#q?" plasma--fallback":""),this.#t.disabled=this.hasAttribute("disabled"),this.#H.textContent=this.getAttribute("label")??"Subscribe",this.#t.style.setProperty("--plasma-thickness",`${this.#e.thickness}px`);for(const h of["aria-label","title"]){const f=this.getAttribute(h);f==null?this.#t.removeAttribute(h):this.#t.setAttribute(h,f)}this.#t.disabled&&(this.#E=!1,this.#S=!1),this.#L()}#L(){const t=!this.#t.disabled&&(this.#E||this.#S);this.#c.target=t?1:0,this.#a.target=t?1:0,this.#r.target=t?1:.28,this.#h&&(this.#l=0,this.#c.snap(),this.#a.snap(),this.#r.snap(),this.#n())}#at(){const t=this.#e.variant==="primary"?.48:this.#e.variant==="secondary"?.16:0,e=Math.max(t,this.#e.fill);return t+(e-t)*n(this.#c.x,0,1.12)}#rt(){const t=this.#k;return this.#e.radius==="none"?1.5:this.#e.radius==="subtle"?Math.min(8,t*.25):this.#e.radius==="rounded"?Math.min(14,t*.38):this.#e.radius==="squircle"?Math.min(18,t*.44):t*.5}#W(){this.#o||(this.#p.a=v(getComputedStyle(this.#P).color,"#ff2bd6")||[1,.17,.84],this.#p.b=v(getComputedStyle(this.#D).color,"#42f5ff")||[.26,.96,1])}#nt=()=>{this.#W(),this.#n()};#K=t=>{this.#h=t.matches,cancelAnimationFrame(this.#s),this.#s=0,this.#y=0,this.#h?(this.#l=0,this.#c.snap(),this.#a.snap(),this.#r.snap(),this.#R=0,this.#n()):this.#m()};#X=()=>this.#m();#ot=()=>this.#T();#T(){if(this.#o)return;const t=this.#t.getBoundingClientRect();this.#O=Math.max(1,t.width||1),this.#k=Math.max(1,t.height||1);const e=this.#e.thickness*3.6+this.#k*this.#e.intensity*.5;this.#A=Math.ceil(Math.max(18,this.#k*.58,e)),this.#I=this.#O+this.#A*2,this.#U=this.#k+this.#A*2,this.#b=n(window.devicePixelRatio||1,1,2),this.#_=Math.max(1,Math.round(this.#I*this.#b)),this.#w=Math.max(1,Math.round(this.#U*this.#b)),this.#t.style.setProperty("--plasma-bleed",`${this.#A}px`),this.#i.style.left=`${-this.#A}px`,this.#i.style.top=`${-this.#A}px`,this.#i.style.width=`${this.#I}px`,this.#i.style.height=`${this.#U}px`,this.#i.width!==this.#_&&(this.#i.width=this.#_),this.#i.height!==this.#w&&(this.#i.height=this.#w),this.#g?.viewport(0,0,this.#_,this.#w),this.#n()}#Y(t,e){const i=this.#g;if(!i)return null;const s=i.createShader(e);return s?(i.shaderSource(s,t),i.compileShader(s),i.getShaderParameter(s,i.COMPILE_STATUS)?s:(console.warn("[vs-button-plasma] shader:",i.getShaderInfoLog(s)),i.deleteShader(s),null)):null}#J(){const t=this.#i.getContext("webgl2",{alpha:!0,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"});if(this.#g=t,!t)return!1;const e=this.#Y(_,t.VERTEX_SHADER),i=this.#Y(w,t.FRAGMENT_SHADER);if(!e||!i)return!1;const s=t.createProgram();if(!s)return!1;if(t.attachShader(s,e),t.attachShader(s,i),t.linkProgram(s),t.deleteShader(e),t.deleteShader(i),!t.getProgramParameter(s,t.LINK_STATUS))return console.warn("[vs-button-plasma] link:",t.getProgramInfoLog(s)),t.deleteProgram(s),!1;this.#d=s,t.useProgram(s),this.#v=t.createVertexArray(),t.bindVertexArray(this.#v),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE);for(const o of k)this.#B[o]=t.getUniformLocation(s,o);return!0}#n(){const t=this.#g;if(!t||!this.#f||!this.#d||this.#o)return;const e=this.#B,i=this.#e,s=i.thickness*this.#b;t.viewport(0,0,this.#_,this.#w),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(this.#d),t.bindVertexArray(this.#v),t.uniform2f(e.u_res,this.#_,this.#w),t.uniform2f(e.u_half,Math.max(1,this.#O*this.#b*.5-s*.32),Math.max(1,this.#k*this.#b*.5-s*.32)),t.uniform1f(e.u_radius,Math.max(1,this.#rt()*this.#b-s*.2)),t.uniform1f(e.u_time,this.#R),t.uniform1f(e.u_thickness,s),t.uniform1f(e.u_intensity,i.intensity),t.uniform1f(e.u_fill,n(this.#at(),0,1)),t.uniform1f(e.u_shell,n(this.#a.x,0,1.15)),t.uniform1f(e.u_arc,this.#C),t.uniform1f(e.u_energy,n(this.#r.x,0,1.2)),t.uniform1f(e.u_press,n(this.#l,0,1)),t.uniform1f(e.u_pressArc,this.#G),t.uniform3f(e.u_colA,this.#p.a[0],this.#p.a[1],this.#p.a[2]),t.uniform3f(e.u_colB,this.#p.b[0],this.#p.b[1],this.#p.b[2]),t.drawArrays(t.TRIANGLES,0,3);const o=(this.#c.x-this.#a.x)*1.8;this.#t.style.setProperty("--label-x",`${(Math.cos(this.#C*Math.PI*2)*o).toFixed(2)}px`),this.#t.style.setProperty("--label-y",`${(-Math.sin(this.#C*Math.PI*2)*o*.45).toFixed(2)}px`)}#m(){if(this.#o||this.#h||!this.#f)return;const t=this.#z&&!document.hidden;t&&!this.#s?(this.#y=0,this.#s=requestAnimationFrame(this.#Q)):!t&&this.#s&&(cancelAnimationFrame(this.#s),this.#s=0)}#Q=t=>{if(this.#s=0,this.#o||this.#h||!this.#z||document.hidden)return;const e=Math.min(.032,this.#y?(t-this.#y)/1e3:1/60);this.#y=t;const i=n(this.#a.x,0,1);this.#R+=e*this.#e.speed*(1+i*.58),this.#C=(this.#C+e*this.#e.speed*(.066+i*.084))%1,this.#c.step(e),this.#a.step(e),this.#r.step(e),this.#l*=Math.exp(-e*4.6),this.#l<.001&&(this.#l=0),this.#n(),this.#s=requestAnimationFrame(this.#Q)};#lt(t){const e=this.#t.getBoundingClientRect();if(!e.width||!e.height)return null;const i=n(t.clientX-e.left,0,e.width),s=n(t.clientY-e.top,0,e.height),o=(i/e.width-.5)/Math.max(.001,.5-this.#e.thickness/e.width),r=(.5-s/e.height)/Math.max(.001,.5-this.#e.thickness/e.height),f=(Math.atan2(r,o)/(Math.PI*2)+1)%1;return{x:i,y:s,width:e.width,height:e.height,arc:f}}#Z=()=>{this.#t.disabled||(this.#E=!0,this.#L(),this.#m())};#tt=()=>{this.#E=!1,this.#L()};#et=()=>{this.#t.disabled||(this.#S=this.#t.matches(":focus-visible"),this.#L(),this.#m())};#it=()=>{this.#S=!1,this.#L()};#st=t=>{if(this.#t.disabled)return;const e=this.#lt(t);if(!e)return;this.#G=e.arc,this.#h?this.#l=0:(this.#l=1,this.#r.target=1);try{this.#t.setPointerCapture?.(t.pointerId)}catch{}const i=Math.max(e.x,e.width-e.x),s=Math.max(e.y,e.height-e.y),o=Math.hypot(i,s)*2,r=document.createElement("span");for(r.className="plasma__ripple",r.style.cssText=`left:${e.x}px;top:${e.y}px;width:${o}px;height:${o}px`,r.addEventListener("animationend",()=>r.remove()),this.#u.append(r);this.#u.childElementCount>5;)this.#u.firstElementChild?.remove();this.dispatchEvent(new CustomEvent("plasma-press",{bubbles:!0,composed:!0,detail:{x:e.x/e.width,y:e.y/e.height,arc:e.arc}})),this.#h&&this.#n()};#V(t){this.#q=t,this.#t.classList.toggle("plasma--fallback",t)}#ht=t=>{t.preventDefault(),this.#f=!1,cancelAnimationFrame(this.#s),this.#s=0,this.#V(!0)};#ct=()=>{!this.#x||this.#o||(this.#d=null,this.#v=null,this.#B={},this.#f=this.#J(),this.#V(!this.#f),this.#T(),this.#n(),this.#m())}}customElements.get("vs-button-plasma")||customElements.define("vs-button-plasma",C);
