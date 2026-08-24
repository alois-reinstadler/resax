import{WebGLRenderer as ve,Scene as me,OrthographicCamera as pe,Mesh as xe,PlaneGeometry as he,Color as ye,Vector3 as ge,ShaderMaterial as be,Vector2 as oe}from"./three.module.Bx43vjkH.js";import{D as _e}from"./items.DHGq2xLr.js";import{u as we}from"./useProximityGlow.DGSdznXf.js";import{u as Me}from"./anim-loop.D76XXas4.js";import{p as ke}from"./motion.DgPJIDJa.js";import{h as H,T as ze,s as Ce}from"./TooltipHost.BbMMkXBc.js";import{_ as Te}from"./_plugin-vue_export-helper.DlAUqK2U.js";import{b as c,c as u,d as M,F as N,i as K,n as ne,k as Pe,p as Se,q as S,s as Y,o as De,a as Re}from"./runtime-core.esm-bundler.DVgNSqUt.js";import"./runtime-dom.esm-bundler.Dn9nioBi.js";const ae=`
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 =   v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}`,se=`
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`,Ee=Se({__name:"VsDockAurora",props:{active:{default:0},size:{default:"md"},radius:{default:"squircle"},tone:{default:"default"},magnify:{type:Boolean,default:!0},tooltips:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1}},emits:["update:active"],setup(J,{expose:y,emit:v}){y();const t=J,B=v,D=_e,d=S(i(t.active));function i(e){return Math.max(0,Math.min(D.length-1,e|0))}Y(()=>t.active,e=>{typeof e=="number"&&(d.value=i(e))});function r(e){t.disabled||(d.value=e,B("update:active",e))}const m=S(null),R=S(null),L=S(null),k=S([]),re=(e,o)=>{e instanceof HTMLElement&&(k.value[o]=e)};we(L,{radius:280,disabled:()=>t.disabled});const O={default:["#1a1a1a","#6f6f6f","#b4b4b4"],danger:["#461521","#e14b57","#f6aab2"],warn:["#4a3410","#e6a21e","#f7d79a"],success:["#123b2a","#3ea97a","#a9e7c9"]};let l=null,p=null,z=null,n=null,g=null,b=null,_=!1,w=0;const a={tx:.5,ty:.5,x:.5,y:.5,a:0,inside:!1};function E(e,o,s){return Math.max(o,Math.min(s,e))}function x(e){const o=new ye(e);return new ge(o.r,o.g,o.b)}function q(){return typeof document>"u"||document.documentElement.dataset.theme!=="light"}const Q=`
precision highp float;
varying vec2 vUv;
uniform vec2  uRes;
uniform float uTime;
uniform float uDark;   // 1 dark, 0 light
uniform vec3  uC1;     // deep
uniform vec3  uC2;     // mid
uniform vec3  uC3;     // crest
uniform vec2  uMouse;
uniform float uMouseAmt;

${ae}

void main(){
  vec2 uv = vUv;
  // aspect-correct the noise domain so cells stay roughly square on the wide bar
  float asp = uRes.x / max(uRes.y, 1.0);
  vec2 auv = vec2((uv.x - 0.5) * asp + 0.5, uv.y);

  // pointer stir — a gaussian bump that pushes the domain outward + a warm halo
  float md = distance(uv, uMouse);
  float infl = exp(-md * md * 9.0) * uMouseAmt;
  vec2  push = normalize(uv - uMouse + 1e-4) * infl * 0.05;

  vec2 base = (auv + push) * 1.35;
  float t = uTime;

  // first warp
  vec2 q = vec2(
    snoise(vec3(base * 1.1, t * 0.10)),
    snoise(vec3(base * 1.1 + 7.3, t * 0.12))
  );
  // second warp (this is what turns the field into folding liquid metal)
  vec2 r = vec2(
    snoise(vec3(base + q * 1.6, t * 0.11 + 0.4)),
    snoise(vec3(base + q * 1.6 + 3.1, t * 0.09 + 1.7))
  );
  float f = snoise(vec3(base + r * 1.1, t * 0.08 + infl * 0.5));
  float g = snoise(vec3(base * 0.8 - r * 0.5, t * 0.06));

  float band = f * 0.5 + 0.5;
  float band2 = g * 0.5 + 0.5;

  vec3 col = mix(uC1, uC2, smoothstep(0.12, 0.72, band));
  col = mix(col, uC3, smoothstep(0.55, 1.0, band) * (0.55 + 0.45 * band2));

  // iridescent sheen: thin bright filaments where the fold is steepest
  float sheen = pow(smoothstep(0.72, 1.0, abs(f)), 2.0);
  col += sheen * 0.14;

  // warm halo trailing the cursor
  col += uC3 * infl * 0.10;

  // theme adaptation: on light, lift toward white into a soft pastel wash
  if (uDark < 0.5) {
    col = mix(col, vec3(1.0), 0.34);
  }

  // soft super-ellipse fade → a glowing pool, no visible rectangle edge
  vec2 dd = abs(uv - 0.5) * 2.0;
  float edge = max(dd.x, dd.y);
  float fade = 1.0 - smoothstep(0.5, 1.0, edge);
  float alpha = fade * (uDark > 0.5 ? 0.9 : 0.82);

  gl_FragColor = vec4(col, alpha);
}`;function Z(){const e=O[t.tone];return new be({vertexShader:se,fragmentShader:Q,transparent:!0,uniforms:{uRes:{value:new oe(1,1)},uTime:{value:0},uDark:{value:q()?1:0},uC1:{value:x(e[0])},uC2:{value:x(e[1])},uC3:{value:x(e[2])},uMouse:{value:new oe(.5,.5)},uMouseAmt:{value:0}}})}function C(){l&&p&&z&&l.render(p,z)}function V(){if(!n)return;const e=O[t.tone];n.uniforms.uC1.value.copy(x(e[0])),n.uniforms.uC2.value.copy(x(e[1])),n.uniforms.uC3.value.copy(x(e[2])),n.uniforms.uDark.value=q()?1:0,_&&C()}function U(){const e=R.value;if(!l||!n||!e)return;const o=e.getBoundingClientRect(),s=Math.max(1,Math.round(o.width)),I=Math.max(1,Math.round(o.height));l.setPixelRatio(E(window.devicePixelRatio||1,1,2)),l.setSize(s,I,!1),n.uniforms.uRes.value.set(s,I),C()}let T=62,A=0,P=!1,h=!1;function F(){T=(k.value[0]?.offsetWidth||52)*1.15}function $(){const e=L.value;if(!e)return;const o=e.getBoundingClientRect().left,s=.5,I=.3,de=.14;for(const f of k.value){if(!f)continue;const fe=o+f.offsetLeft+f.offsetWidth/2,X=A-fe,G=Math.exp(-(X*X)/(2*T*T));f.style.setProperty("--s",(1+s*G).toFixed(3)),f.style.setProperty("--ty",(-(I*f.offsetWidth)*G).toFixed(2)+"px"),f.style.setProperty("--tx",(-Math.sign(X)*de*f.offsetWidth*G).toFixed(2)+"px")}}function j(){for(const e of k.value)e&&(e.style.setProperty("--s","1"),e.style.setProperty("--ty","0px"),e.style.setProperty("--tx","0px"))}function ee(e,o){if(!n)return;const s=o?Math.min(.05,o/1e3):.016;w+=s*.22,n.uniforms.uTime.value=w,a.a+=((a.inside?1:0)-a.a)*.08,a.x+=(a.tx-a.x)*.14,a.y+=(a.ty-a.y)*.14,n.uniforms.uMouse.value.set(a.x,a.y),n.uniforms.uMouseAmt.value=a.a,h&&(P&&t.magnify&&!t.disabled?$():j(),h=!1),C()}const W=Me(m,ee,{autoStart:!1,onResize:()=>U()});function ie(e){if(_||t.disabled)return;A=e.clientX,P=!0,h=!0;const o=R.value;if(o){const s=o.getBoundingClientRect();a.tx=E((e.clientX-s.left)/s.width,0,1),a.ty=E(1-(e.clientY-s.top)/s.height,0,1),a.inside=!0}}function le(){P=!1,h=!0,a.inside=!1,H()}function ce(e,o){!t.tooltips||t.disabled||Ce(e.currentTarget,{content:D[o].label,placement:"top",variant:"solid",offset:14})}function ue(e){e.currentTarget.contains(e.relatedTarget)||H()}De(()=>{const e=R.value,o=m.value;if(!(!e||!o)){if(_=ke(),F(),l=new ve({canvas:e,antialias:!1,alpha:!0,powerPreference:"high-performance"}),l.setClearColor(0,0),p=new me,z=new pe(-1,1,1,-1,0,1),n=Z(),g=new xe(new he(2,2),n),p.add(g),U(),b=new MutationObserver(()=>V()),b.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),window.addEventListener("resize",F),_){w=8,n.uniforms.uTime.value=w,C();return}W.start()}}),Re(()=>{W.stop(),window.removeEventListener("resize",F),b?.disconnect(),b=null,H(),g?.geometry.dispose(),n?.dispose(),l?.dispose(),l=null,p=null,n=null,g=null}),Y(()=>t.tone,V),Y(()=>t.magnify,e=>{e?h=!0:j()});const te={props:t,emit:B,ITEMS:D,current:d,clampIndex:i,select:r,stage:m,canvas:R,barRef:L,itemRefs:k,setItem:re,PALETTE:O,get renderer(){return l},set renderer(e){l=e},get scene(){return p},set scene(e){p=e},get camera(){return z},set camera(e){z=e},get material(){return n},set material(e){n=e},get mesh(){return g},set mesh(e){g=e},get themeObs(){return b},set themeObs(e){b=e},get staticMode(){return _},set staticMode(e){_=e},get tSec(){return w},set tSec(e){w=e},ptr:a,clamp:E,toVec3:x,isDarkTheme:q,SNOISE:ae,VERT:se,FRAG:Q,buildMaterial:Z,renderOnce:C,syncUniforms:V,resize:U,get sigma(){return T},set sigma(e){T=e},get lastX(){return A},set lastX(e){A=e},get magActive(){return P},set magActive(e){P=e},get magDirty(){return h},set magDirty(e){h=e},measureSigma:F,applyMagnify:$,resetMagnify:j,frame:ee,loop:W,onMove:ie,onLeave:le,onItemEnter:ce,onFocusOut:ue,TooltipHost:ze};return Object.defineProperty(te,"__isScriptSetup",{enumerable:!1,value:!0}),te}}),Ae={ref:"stage",class:"dock__stage"},Fe={ref:"canvas",class:"dock__aurora","aria-hidden":"true"},Ie=["disabled","aria-label","aria-current","onClick","onPointerenter","onFocus"],Be={class:"dock__ico"},Le={key:0,viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true"},Oe=["d"],qe={key:1,viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"},Ve=["d"];function Ue(J,y,v,t,B,D){return c(),u("nav",{class:ne(["dock",[`dock--${v.size}`,`dock--r-${v.radius}`,`dock--t-${v.tone}`,{"is-disabled":v.disabled}]]),"aria-label":"Dock"},[M("div",Ae,[M("canvas",Fe,null,512),M("div",{ref:"barRef",class:"dock__bar",role:"toolbar","aria-label":"Dock",style:{"--gx":"50%","--gy":"50%"},onPointermove:t.onMove,onPointerleave:t.onLeave,onFocusout:t.onFocusOut},[y[1]||(y[1]=M("span",{class:"fx-glow dock__glow","aria-hidden":"true"},null,-1)),(c(!0),u(N,null,K(t.ITEMS,(d,i)=>(c(),u("button",{key:d.label,ref_for:!0,ref:r=>t.setItem(r,i),type:"button",class:ne(["dock__item",{"is-active":i===t.current}]),style:{"--s":1,"--ty":"0px","--tx":"0px"},disabled:v.disabled,"aria-label":d.label,"aria-current":i===t.current?"page":void 0,onClick:r=>t.select(i),onPointerenter:r=>t.onItemEnter(r,i),onFocus:r=>t.onItemEnter(r,i)},[M("span",Be,[i===t.current?(c(),u("svg",Le,[(c(!0),u(N,null,K(d.bold,(r,m)=>(c(),u("path",{key:m,d:r},null,8,Oe))),128))])):(c(),u("svg",qe,[(c(!0),u(N,null,K(d.linear,(r,m)=>(c(),u("path",{key:m,d:r,stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},null,8,Ve))),128))]))]),y[0]||(y[0]=M("span",{class:"dock__dot","aria-hidden":"true"},null,-1))],42,Ie))),128))],544)],512),Pe(t.TooltipHost)],2)}const Qe=Te(Ee,[["render",Ue],["__scopeId","data-v-0c7cc161"]]);export{Qe as default};
