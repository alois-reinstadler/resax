<script lang="ts" module>
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';

	export type ButtonVariant = 'default' | 'flat' | 'border' | 'gradient' | 'shadow' | 'relief' | 'transparent' |
		'border-draw' | 'chrome' | 'glitch' | 'gooey' | 'invert' | 'liquid' | 'magnetic' | 'plasma' | 'push' | 'shine' | 'v2';
	export interface ButtonProps extends Omit<HTMLButtonAttributes, 'color' | 'children' | 'onclick'> {
		variant?: ButtonVariant;
		color?: RxColor;
		size?: 'xl' | 'lg' | 'default' | 'sm' | 'mini';
		shape?: 'default' | 'circle' | 'square';
		effect?: 'none' | 'glow' | 'pulse';
		block?: boolean;
		floating?: boolean;
		loading?: boolean;
		disabled?: boolean;
		href?: string;
		ripple?: boolean;
		reach?: number;
		stiffness?: number;
		damping?: number;
		lag?: number;
		gooStrength?: number;
		squash?: number;
		filaments?: 0 | 1 | 2;
		droplets?: 0 | 1 | 2 | 3 | 4;
		gravity?: number;
		drag?: number;
		sag?: number;
		/** Chrome rim width in pixels (source: 1–6). */
		thickness?: number;
		/** Chrome field playback speed as a percentage (source: 0–400). */
		speed?: number;
		/** Chrome shard drift/noise amount as a percentage (source: 0–100). */
		chaos?: number;
		/** Chrome prismatic dispersion as a percentage (source: 0–100). */
		prism?: number;
		/** Invert label motion blur in pixels (source: 0–14). */
		blur?: number;
		children: Snippet;
		icon?: Snippet;
		onclick?: (event: MouseEvent) => void;
	}
</script>

<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { proximityGlow } from '$lib/registry/attachments/proximity-glow';
	import { neighborLight } from '$lib/registry/attachments/neighbor-light';
	import { ripple as sourceRipple } from '$lib/registry/attachments/ripple';
	import { magnetic } from '$lib/registry/attachments/magnetic';
	import { buttonVariants } from './index';

	let {
		variant = 'default', color, size = 'default', shape = 'default', effect = 'none',
		block = false, floating = false, loading = false, disabled = false, href,
		ripple = true, reach = 240, stiffness = variant === 'invert' ? 260 : 220, damping = variant === 'invert' ? 17 : 13, lag = variant === 'invert' ? .45 : .62, gooStrength = 7, squash = variant === 'invert' ? .05 : .065, filaments = 2, droplets = 3, gravity = 620, drag = 3.2, sag = .28,
		thickness = 3, speed = 100, chaos = 70, prism = 100, blur = 2,
		children, icon, class: className, style, onclick, ...restProps
	}: ButtonProps = $props();
	const componentId = $props.id();
	const gooFilterId = `${componentId}-goo`;

	const inactive = $derived(disabled || loading);
	const classes = $derived(buttonVariants({ variant, size, shape, effect, block, floating, class: typeof className === 'string' ? className : undefined }));
	const solidForeground = $derived(color === 'success' || color === 'danger' || color === 'warn' ? 'rgb(var(--rx-warn-contrast-rgb))' : 'var(--rx-color-foreground, rgb(var(--rx-light)))');
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-button-foreground:${solidForeground}; --chr-bw:${Math.max(1, Math.min(6, thickness))}px; --chr-prism:${Math.max(0, Math.min(100, prism)) / 100}; ${style ?? ''}`);
	const anchorProps = $derived(restProps as unknown as HTMLAnchorAttributes);
	const attachProximity = $derived(proximityGlow({ radius: 200, disabled: () => inactive }));
	const attachNeighbor = $derived(neighborLight({ disabled: () => inactive }));
	const usesSharedRipple = $derived(['default','flat','border','shadow','relief','transparent','glitch','gradient','v2'].includes(variant));
	const attachRipple = $derived(ripple && usesSharedRipple ? sourceRipple({ color:'var(--rip)', pressTilt:['default','flat','border','shadow','transparent'].includes(variant), disabled:()=>inactive }) : () => {});
	const attachMagnetic = $derived(magnetic({ strength: .4, labelStrength: .4, label: '.rx-button__content', disabled: () => inactive || variant !== 'magnetic' }));

	// Chrome/invert/plasma and the gooey ripple have source-specific geometry;
	// reusable proximity, neighbor, magnetic and common ripple work is shared above.
	function variantEffects(node: HTMLElement) {
		let frame = 0;
		let chromeFrame = 0, chromeLast = 0, chromeClock = 0, chromeHover = false, chromeVisible = true;
		let invertFrame = 0, invertLast = 0;
		let gooFrame = 0;
		let last: PointerEvent | null = null;
		let chromeAngle = 0;
		type ScalarSpring = { x:number; v:number; target:number; k:number; d:number };
		const scalar = (k:number,d:number):ScalarSpring => ({ x:0,v:0,target:0,k,d });
		const invertInk = scalar(stiffness, damping);
		const invertLabel = scalar(stiffness * (1 - Math.max(0, Math.min(.9, lag)) * .62), damping * (1 - Math.max(0, Math.min(.9, lag)) * .3));
		const invertX = scalar(stiffness * .58, damping * 1.1), invertY = scalar(stiffness * .58, damping * 1.1);
		let invertWidth = 0, invertRadius = 0, invertScaleX = 1, invertScaleY = 1;
		const stepScalar = (spring:ScalarSpring,dt:number) => { const half=dt/2; for(let i=0;i<2;i++){spring.v+=(-spring.k*(spring.x-spring.target)-spring.d*spring.v)*half;spring.x+=spring.v*half;} };
		const settled = (spring:ScalarSpring) => Math.abs(spring.v)<.002 && Math.abs(spring.x-spring.target)<.002;
		const paintInvert = (now:number) => {
			invertFrame=0;if(variant!=='invert')return;const dt=Math.min(.032,invertLast?(now-invertLast)/1000:1/60);invertLast=now;
			if(reduced()){for(const spring of [invertInk,invertLabel,invertX,invertY]){spring.x=spring.target;spring.v=0;}}
			else{stepScalar(invertInk,dt);stepScalar(invertLabel,dt);stepScalar(invertX,dt);stepScalar(invertY,dt);}
			const radius=Math.max(0,invertInk.x)*invertRadius*1.08;node.style.setProperty('--ink-r',`${radius.toFixed(2)}px`);node.style.setProperty('--ink-x',`${invertX.x.toFixed(2)}px`);node.style.setProperty('--ink-y',`${invertY.x.toFixed(2)}px`);
			const velocity=Math.max(-1,Math.min(1,invertLabel.v*.12)),amount=velocity*Math.max(0,Math.min(.14,squash));invertScaleX=1+amount;invertScaleY=1-amount*.62;node.style.setProperty('--sx',invertScaleX.toFixed(4));node.style.setProperty('--sy',invertScaleY.toFixed(4));const pull=invertWidth?Math.max(-1,Math.min(1,(invertWidth/2-invertX.x)/(invertWidth/2))):0;node.style.setProperty('--lx',`${(pull*velocity*5).toFixed(2)}px`);node.style.setProperty('--lsx',(1+amount*.6).toFixed(4));node.style.setProperty('--lsy',(1-amount*.4).toFixed(4));const blurAmount=Math.abs(velocity)*Math.max(0,Math.min(14,blur));node.style.setProperty('--lf',blurAmount>.05?`blur(${blurAmount.toFixed(2)}px)`:'none');
			if(![invertInk,invertLabel,invertX,invertY].every(settled))invertFrame=requestAnimationFrame(paintInvert);
		};
		const runInvert = () => { if(!invertFrame){invertLast=0;invertFrame=requestAnimationFrame(paintInvert);} };
		const chromeConfigs=[
			{kind:'hi',seed:0,rate:.19,drift:26,width:16,blur:.22,gain:1},{kind:'hi',seed:2.7,rate:.13,drift:-17,width:10,blur:.14,gain:1},{kind:'hi',seed:5.1,rate:.27,drift:41,width:6,blur:.1,gain:1},
			{kind:'dark',seed:1.4,rate:.11,drift:-23,width:22,blur:.28,gain:1.6},{kind:'dark',seed:4.2,rate:.23,drift:33,width:11,blur:.18,gain:1.5},
			{kind:'prism',seed:3.3,rate:.17,drift:-29,width:1,blur:.22,gain:1,span:6,roll:.11},{kind:'prism',seed:6,rate:.09,drift:47,width:1,blur:.18,gain:1,span:4,roll:.07},{kind:'prism',seed:1.9,rate:.21,drift:-38,width:1,blur:.26,gain:1,span:8,roll:.15}
		];
		const chromeShards=chromeConfigs.map((_,index)=>[...node.querySelectorAll<HTMLElement>(`.rx-button__chrome-shard[data-chrome-index="${index}"]`)]);
		const wave=(value:number)=>(Math.sin(value)+Math.sin(value*1.7+1.3)+Math.sin(value*2.9+2.1)+Math.sin(value*.43+4.7))/4;
		const noise=(value:number)=>.5+.5*wave(value);
		const palette=['var(--rx-danger-color, #ff3b30)','var(--rx-warning-color, #ff9500)','var(--rx-warning-color, #ffe600)','var(--rx-success-color, #34ff8f)','rgb(var(--rx-ai-cyan))','rgb(var(--rx-color))','rgb(var(--rx-ai-violet))','rgb(var(--rx-ai-magenta))','var(--rx-success-color, #b6ff3d)','rgb(var(--rx-light))'];
		const prismArc=(seed:number,span:number)=>{let state=(seed*1664525+1013904223)>>>0;const random=()=>((state=(state*1664525+1013904223)>>>0)/4294967296);const colors=[...palette];for(let i=colors.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[colors[i],colors[j]]=[colors[j],colors[i]];}const count=3+Math.floor(random()*2),picked=colors.slice(0,count),weights=picked.map(()=>.15+random()*1.85),total=weights.reduce((a,b)=>a+b,0);let cursor=0;const left:string[]=[],right:string[]=[];for(let i=0;i<count;i++){left.push(`${picked[i]} ${cursor.toFixed(2)}%`);right.unshift(`${picked[i]} ${(100-cursor).toFixed(2)}%`);cursor+=weights[i]/total*span;}left.push(`transparent ${(cursor+span*.18).toFixed(2)}%`);right.unshift(`transparent ${(100-cursor-span*.18).toFixed(2)}%`);return `conic-gradient(from calc(var(--p,0)*1deg),${left.join(',')},${right.join(',')})`;};
		const chromePhases=chromeConfigs.map(()=>Number.NaN),chromeActiveLayers=chromeConfigs.map(()=>0);
		const paintChrome=(now:number)=>{chromeFrame=0;if(variant!=='chrome'||inactive||reduced()||!chromeVisible)return;const dt=Math.min(.1,chromeLast?(now-chromeLast)/1000:0);chromeLast=now;chromeClock+=dt*Math.max(0,Math.min(400,speed))/100*1.2*(chromeHover?2:1);const time=chromeClock,amount=Math.max(0,Math.min(100,chaos))/100;chromeConfigs.forEach((config,index)=>{const shards=chromeShards[index];if(!shards.length)return;if(config.kind==='prism'){const phase=Math.floor(time*(config.roll??0)+config.seed);if(phase!==chromePhases[index]){const first=Number.isNaN(chromePhases[index]),target=first?chromeActiveLayers[index]:1-chromeActiveLayers[index];chromePhases[index]=phase;shards[target].style.background=prismArc(phase*7919+config.seed*104729,(config.span??6)*(.6+.9*noise(phase*3.1+config.seed)));if(!first){shards[target].style.setProperty('--chr-blend','1');shards[chromeActiveLayers[index]].style.setProperty('--chr-blend','0');chromeActiveLayers[index]=target;}}}const phase=time*config.rate+config.seed,position=config.seed*57+time*config.drift*(.35+.65*amount)+170*amount*wave(phase*.7+config.seed),width=config.width*(.35+1.25*noise(phase*1.9+2.3)),opacity=Math.min(1,Math.pow(noise(phase*1.35+config.seed*2),1.7+1.6*(1-amount))*config.gain);for(const shard of shards){shard.style.setProperty('--p',position.toFixed(1));shard.style.setProperty('--w',width.toFixed(2));shard.style.setProperty('--o',opacity.toFixed(3));shard.style.setProperty('--b',String(config.blur));}});node.style.setProperty('--chr-a',`${(time*26+45*wave(time*.09)).toFixed(1)}deg`);chromeFrame=requestAnimationFrame(paintChrome);};
		const chromeObserver=variant==='chrome'&&typeof IntersectionObserver!=='undefined'?new IntersectionObserver((entries)=>{chromeVisible=entries.at(-1)?.isIntersecting??true;if(chromeVisible&&!chromeFrame){chromeLast=0;chromeFrame=requestAnimationFrame(paintChrome);}else if(!chromeVisible&&chromeFrame){cancelAnimationFrame(chromeFrame);chromeFrame=0;}}):null;
		chromeObserver?.observe(node);
		if(variant==='chrome')chromeFrame=requestAnimationFrame(paintChrome);
		let gooX = 0, gooY = 0, gooVx = 0, gooVy = 0, gooTargetX = 0, gooTargetY = 0, gooAnchorX = 0, gooAnchorY = 0;
		let gooActive = false, gooRetracting = false, lastGooTime = 0;
		let gooAge = 0, gooSpawnMask = 0;
		type GooPoint = { x:number;y:number;vx:number;vy:number;tx:number;ty:number;k:number;d:number };
		type GooDrop = { active:boolean;x:number;y:number;vx:number;vy:number;r:number;age:number;ttl:number;hang:number;ox:number;oy:number };
		const point=(k:number,d:number):GooPoint=>({x:0,y:0,vx:0,vy:0,tx:0,ty:0,k,d});
		const mid=point(stiffness*(1-lag*.42),damping*(1-lag*.18)),neck=point(stiffness*(1-lag*.72),damping*(1-lag*.34));
		const filamentPoints=[
			{tip:point(stiffness*1.05,damping*.95),mid:point(stiffness*.58,damping*.82),neck:point(stiffness*.4,damping*.72),delay:32},
			{tip:point(stiffness*.56,damping*.78),mid:point(stiffness*.4,damping*.68),neck:point(stiffness*.27,damping*.58),delay:68}
		];
		const drops:Array<GooDrop>=Array.from({length:4},()=>({active:false,x:0,y:0,vx:0,vy:0,r:0,age:0,ttl:0,hang:0,ox:0,oy:0}));
		const gooPath = node.querySelector<SVGPathElement>('.rx-button__goo-tail');
		const gooBase = node.querySelector<SVGCircleElement>('.rx-button__goo-base');
		const gooTip = node.querySelector<SVGCircleElement>('.rx-button__goo-tip');
		const gooBody = node.querySelector<SVGRectElement>('.rx-button__goo-body');
		const gooSvg = node.querySelector<SVGSVGElement>('.rx-button__goo-svg');
		const gooGroup = node.querySelector<SVGGElement>('.rx-button__goo-shapes');
		const gooBlur = node.querySelector<SVGFEGaussianBlurElement>('.rx-button__goo-blur');
		const filamentPaths=[...node.querySelectorAll<SVGPathElement>('.rx-button__goo-filament')],filamentBeads=[...node.querySelectorAll<SVGCircleElement>('.rx-button__goo-filament-bead')];
		const dropPaths=[...node.querySelectorAll<SVGPathElement>('.rx-button__goo-drop-tail')],dropCircles=[...node.querySelectorAll<SVGCircleElement>('.rx-button__goo-drop')];
		const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
		const syncGoo = () => {
			const rect = node.getBoundingClientRect(); const width = Math.max(1, rect.width), height = Math.max(1, rect.height);
			gooSvg?.setAttribute('viewBox', `0 0 ${width} ${height}`); gooBody?.setAttribute('width', `${width}`); gooBody?.setAttribute('height', `${height}`); gooBody?.setAttribute('rx', `${height / 2}`);
			return { rect, width, height };
		};
		const edge = (x:number,y:number,width:number,height:number) => { const distances=[x,width-x,y,height-y],minimum=Math.min(...distances); return minimum===distances[0]?{x:0,y}:minimum===distances[1]?{x:width,y}:minimum===distances[2]?{x,y:0}:{x,y:height}; };
		const clamp=(value:number,min:number,max:number)=>Math.max(min,Math.min(max,value));
		const seed=(p:GooPoint,x:number,y:number)=>{p.x=p.tx=x;p.y=p.ty=y;p.vx=p.vy=0};
		const step=(p:GooPoint,dt:number)=>{const half=dt/2;for(let i=0;i<2;i++){p.vx+=(-p.k*(p.x-p.tx)-p.d*p.vx)*half;p.vy+=(-p.k*(p.y-p.ty)-p.d*p.vy)*half;p.x+=p.vx*half;p.y+=p.vy*half}};
		const tail=(path:SVGPathElement|null|undefined,a:GooPoint|{x:number;y:number},n:GooPoint,b:GooPoint,c:GooPoint,width:number)=>{if(!path)return;let dx=c.x-a.x,dy=c.y-a.y,length=Math.hypot(dx,dy)||1,px=-dy/length,py=dx/length,base=width,midWidth=base*.62,tip=Math.max(1.8,width*.3);path.setAttribute('d',`M ${(a.x+px*base).toFixed(2)} ${(a.y+py*base).toFixed(2)} C ${(n.x+px*base*.88).toFixed(2)} ${(n.y+py*base*.88).toFixed(2)} ${(b.x+px*midWidth).toFixed(2)} ${(b.y+py*midWidth).toFixed(2)} ${(b.x+px*midWidth).toFixed(2)} ${(b.y+py*midWidth).toFixed(2)} C ${(c.x+px*tip).toFixed(2)} ${(c.y+py*tip).toFixed(2)} ${(c.x+px*tip).toFixed(2)} ${(c.y+py*tip).toFixed(2)} ${(c.x+px*tip).toFixed(2)} ${(c.y+py*tip).toFixed(2)} L ${(c.x-px*tip).toFixed(2)} ${(c.y-py*tip).toFixed(2)} C ${(c.x-px*tip).toFixed(2)} ${(c.y-py*tip).toFixed(2)} ${(b.x-px*midWidth).toFixed(2)} ${(b.y-py*midWidth).toFixed(2)} ${(b.x-px*midWidth).toFixed(2)} ${(b.y-py*midWidth).toFixed(2)} C ${(n.x-px*base*.88).toFixed(2)} ${(n.y-py*base*.88).toFixed(2)} ${(a.x-px*base).toFixed(2)} ${(a.y-py*base).toFixed(2)} ${(a.x-px*base).toFixed(2)} ${(a.y-py*base).toFixed(2)} Z`)};
		const spawnDrop=(index:number,height:number)=>{const drop=drops[index];drop.active=true;drop.x=gooX+(index%2?1:-1)*height*.04;drop.y=gooY;drop.ox=drop.x;drop.oy=drop.y;drop.vx=gooVx*.22+(index%2?1:-1)*(15+index*6);drop.vy=gooVy*.18+28+index*14;drop.r=height*(.052+index*.007);drop.age=0;drop.hang=300+index*80;drop.ttl=1160+index*145};
		const paintDrops=(dt:number,height:number)=>{drops.forEach((drop,index)=>{const circle=dropCircles[index],path=dropPaths[index];if(!drop.active){circle?.setAttribute('r','0');path?.setAttribute('d','');return}drop.age+=dt*1000;drop.vy+=gravity*dt;const resistance=Math.exp(-drag*dt);drop.vx*=resistance;drop.vy*=resistance;drop.x+=drop.vx*dt;drop.y+=drop.vy*dt;const life=clamp(1-drop.age/drop.ttl,0,1),radius=drop.r*Math.sqrt(life);circle?.setAttribute('cx',drop.x.toFixed(2));circle?.setAttribute('cy',drop.y.toFixed(2));circle?.setAttribute('r',radius.toFixed(2));circle?.style.setProperty('opacity',life.toFixed(3));const dx=drop.x-drop.ox,dy=drop.y-drop.oy,length=Math.hypot(dx,dy)||1,px=-dy/length,py=dx/length,w=radius*.55;path?.setAttribute('d',`M ${(drop.ox+px*w).toFixed(2)} ${(drop.oy+py*w).toFixed(2)} L ${(drop.x+px*w*.4).toFixed(2)} ${(drop.y+py*w*.4).toFixed(2)} L ${(drop.x-px*w*.4).toFixed(2)} ${(drop.y-py*w*.4).toFixed(2)} L ${(drop.ox-px*w).toFixed(2)} ${(drop.oy-py*w).toFixed(2)} Z`);path?.style.setProperty('opacity',life.toFixed(3));if(drop.age>=drop.ttl||drop.y>height+reach*.9){drop.active=false;circle?.setAttribute('r','0');path?.setAttribute('d','')}})};
		const paintGoo = (now:number) => {
			gooFrame=0;if(!gooActive)return;const {height}=syncGoo();const dt=Math.min(.032,lastGooTime?(now-lastGooTime)/1000:1/60);lastGooTime=now;
			gooAge+=dt*1000;const mainK=gooRetracting?stiffness*1.18:stiffness,mainD=gooRetracting?damping*1.25:damping;gooVx+=(-mainK*(gooX-gooTargetX)-mainD*gooVx)*dt;gooVy+=(-mainK*(gooY-gooTargetY)-mainD*gooVy)*dt;gooX+=gooVx*dt;gooY+=gooVy*dt;
			const dx=gooX-gooAnchorX,dy=gooY-gooAnchorY,length=Math.hypot(dx,dy)||1,progress=clamp(length/Math.max(1,reach*.8),0,1),nx=dx/length,ny=dy/length,base=Math.min(height*(.19+progress*.18+clamp(Math.hypot(gooVx,gooVy)/900,0,1)*squash),height*.42);
			mid.tx=gooAnchorX+dx*clamp(.68-lag*.1,.6,.68);mid.ty=gooAnchorY+dy*clamp(.68-lag*.1,.6,.68)+sag*height*progress*progress*.75;neck.tx=gooAnchorX+dx*clamp(.34-lag*.09,.26,.34);neck.ty=gooAnchorY+dy*clamp(.34-lag*.09,.26,.34)+sag*height*progress*progress*.25;step(mid,dt);step(neck,dt);
			tail(gooPath,{x:gooAnchorX,y:gooAnchorY},neck,mid,{x:gooX,y:gooY,vx:gooVx,vy:gooVy,tx:gooTargetX,ty:gooTargetY,k:mainK,d:mainD},base);
			const tip=Math.min(height*.095,4.6);gooBase?.setAttribute('cx',`${gooAnchorX}`);gooBase?.setAttribute('cy',`${gooAnchorY}`);gooBase?.setAttribute('r',`${base*.72}`);gooTip?.setAttribute('cx',`${gooX}`);gooTip?.setAttribute('cy',`${gooY}`);gooTip?.setAttribute('r',`${tip}`);
			filamentPoints.forEach((filament,index)=>{if(index>=filaments){filamentPaths[index]?.setAttribute('d','');filamentBeads[index]?.setAttribute('r','0');return}const side=index===0?1:-1,offset=height*(index===0?.32:.25)*side,anchor={x:gooAnchorX-ny*offset,y:gooAnchorY+nx*offset};filament.tip.tx=gooAnchorX+dx*(index===0?.99:.88);filament.tip.ty=gooAnchorY+dy*(index===0?.99:.88)+sag*height*progress*(index===0?1.8:.68);filament.mid.tx=gooAnchorX+dx*(index===0?.58:.46);filament.mid.ty=gooAnchorY+dy*(index===0?.58:.46);filament.neck.tx=gooAnchorX+dx*(index===0?.24:.18);filament.neck.ty=gooAnchorY+dy*(index===0?.24:.18);step(filament.tip,dt);step(filament.mid,dt);step(filament.neck,dt);tail(filamentPaths[index],anchor,filament.neck,filament.mid,filament.tip,height*(index===0?.07:.048));filamentBeads[index]?.setAttribute('cx',filament.tip.x.toFixed(2));filamentBeads[index]?.setAttribute('cy',filament.tip.y.toFixed(2));filamentBeads[index]?.setAttribute('r',(height*(index===0?.033:.027)).toFixed(2))});
			const thresholds=[.18,.38,.56,.76],delays=[52,108,172,238];for(let index=0;index<droplets;index++){const bit=1<<index;if(!(gooSpawnMask&bit)&&progress>=thresholds[index]&&gooAge>=delays[index]){gooSpawnMask|=bit;spawnDrop(index,height)}}paintDrops(dt,height);
			const blur=Math.min(gooStrength,Math.max(.35+progress*gooStrength*.48,Math.hypot(gooVx,gooVy)*.007));gooBlur?.setAttribute('stdDeviation',blur.toFixed(2));if(gooGroup)gooGroup.style.filter=`url(#${gooFilterId})`;
			if(gooRetracting&&length<1&&Math.hypot(gooVx,gooVy)<8&&!drops.some(drop=>drop.active)){gooActive=false;gooPath?.setAttribute('d','');gooBase?.setAttribute('r','0');gooTip?.setAttribute('r','0');gooBlur?.setAttribute('stdDeviation','0');filamentPaths.forEach(path=>path.setAttribute('d',''));filamentBeads.forEach(circle=>circle.setAttribute('r','0'));if(gooGroup)gooGroup.style.filter='none';return}gooFrame=requestAnimationFrame(paintGoo);
		};
		const followGoo=(event:PointerEvent)=>{if(!gooActive||gooRetracting)return;const rect=node.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top,dx=x-gooAnchorX,dy=y-gooAnchorY,distance=Math.hypot(dx,dy)||1,limit=reach*.8,extension=Math.min(distance,limit)+Math.max(0,distance-limit)*.22*(1-Math.exp(-Math.max(0,distance-limit)/(limit*.38)));gooTargetX=gooAnchorX+dx/distance*extension;gooTargetY=gooAnchorY+dy/distance*extension};
		const startGoo=(event:PointerEvent)=>{if(variant!=='gooey'||reduced()||inactive)return;const {rect,width,height}=syncGoo();const localX=event.clientX-rect.left,localY=event.clientY-rect.top,anchor=edge(localX,localY,width,height);gooAnchorX=anchor.x;gooAnchorY=anchor.y;gooX=anchor.x;gooY=anchor.y;gooTargetX=localX;gooTargetY=localY;gooVx=gooVy=0;seed(mid,anchor.x,anchor.y);seed(neck,anchor.x,anchor.y);filamentPoints.forEach(f=>{seed(f.tip,anchor.x,anchor.y);seed(f.mid,anchor.x,anchor.y);seed(f.neck,anchor.x,anchor.y)});drops.forEach(drop=>drop.active=false);gooAge=0;gooSpawnMask=0;gooActive=true;gooRetracting=false;lastGooTime=0;followGoo(event);document.addEventListener('pointermove',followGoo,{passive:true});if(!gooFrame)gooFrame=requestAnimationFrame(paintGoo)};
		const retractGoo=()=>{if(!gooActive)return;gooRetracting=true;gooTargetX=gooAnchorX;gooTargetY=gooAnchorY;document.removeEventListener('pointermove',followGoo);if(!gooFrame)gooFrame=requestAnimationFrame(paintGoo)};
		const setPointer = (event: PointerEvent) => {
			last = event;
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				if (!last) return;
				const rect = node.getBoundingClientRect();
				const x = last.clientX - rect.left;
				const y = last.clientY - rect.top;
				const nx = Math.max(-1, Math.min(1, (x / (rect.width || 1) - .5) * 2));
				const ny = Math.max(-1, Math.min(1, (y / (rect.height || 1) - .5) * 2));
				node.style.setProperty('--plx', `${(nx * 4).toFixed(2)}px`);
				node.style.setProperty('--ply', `${(ny * 3).toFixed(2)}px`);
				node.style.setProperty('--ink-x', `${x.toFixed(1)}px`);
				node.style.setProperty('--ink-y', `${y.toFixed(1)}px`);
				node.style.setProperty('--mag-x', `${x.toFixed(1)}px`);
				node.style.setProperty('--mag-y', `${y.toFixed(1)}px`);
				if(variant!=='chrome'){chromeAngle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180 / Math.PI + 90;node.style.setProperty('--chr-a', `${chromeAngle.toFixed(2)}deg`);}
			});
		};
		const enter = (event: PointerEvent) => {
			retractGoo();
			setPointer(event);
			const rect = node.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			chromeHover=true;
			if(variant==='invert'){invertWidth=rect.width/invertScaleX;const height=rect.height/invertScaleY;invertRadius=Math.max(Math.hypot(x,y),Math.hypot(invertWidth-x,y),Math.hypot(x,height-y),Math.hypot(invertWidth-x,height-y));invertX.x=invertX.target=x;invertY.x=invertY.target=y;invertX.v=invertY.v=0;invertInk.target=1;invertLabel.target=1;runInvert();}
			node.classList.add('is-active');
		};
		const leave = (event: PointerEvent) => {
			if (frame) cancelAnimationFrame(frame);
			frame = 0; last = null;
			for (const prop of ['--plx','--ply','--mag-x','--mag-y']) node.style.removeProperty(prop);
			chromeHover=false;
			if(variant==='invert'){const rect=node.getBoundingClientRect();invertX.target=Math.max(0,Math.min(rect.width,event.clientX-rect.left));invertY.target=Math.max(0,Math.min(rect.height,event.clientY-rect.top));invertInk.target=0;invertLabel.target=0;runInvert();}
			node.classList.remove('is-active');
			startGoo(event);
		};
		const down = (event: PointerEvent) => {
			if (inactive) return;
			const rect = node.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			if (!ripple || reduced() || !['gooey','plasma','chrome'].includes(variant)) return;
			const diameter = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y)) * 2;
			const item = document.createElement('span');
			item.className = `rx-button__ripple rx-button__ripple--${variant}`;
			item.setAttribute('aria-hidden', 'true');
			item.style.cssText = `left:${x}px;top:${y}px;width:${diameter}px;height:${diameter}px`;
			node.querySelector('.rx-button__ripples')?.append(item);
			item.addEventListener('animationend', () => item.remove(), { once: true });
			const items = node.querySelectorAll('.rx-button__ripple');
			if (items.length > 6) items[0]?.remove();
		};
		const release = () => {};
		node.addEventListener('pointermove', setPointer);
		node.addEventListener('pointerenter', enter);
		node.addEventListener('pointerleave', leave);
		node.addEventListener('pointerdown', down);
		node.addEventListener('pointerup', release);
		node.addEventListener('pointercancel', release);
		return () => {
			if (frame) cancelAnimationFrame(frame);
			if (chromeFrame) cancelAnimationFrame(chromeFrame);
			chromeObserver?.disconnect();
			if (invertFrame) cancelAnimationFrame(invertFrame);
			if (gooFrame) cancelAnimationFrame(gooFrame); document.removeEventListener('pointermove',followGoo);
			node.removeEventListener('pointermove', setPointer); node.removeEventListener('pointerenter', enter); node.removeEventListener('pointerleave', leave);
			node.removeEventListener('pointerdown', down); node.removeEventListener('pointerup', release); node.removeEventListener('pointercancel', release);
			node.querySelectorAll('.rx-button__ripple').forEach((item) => item.remove());gooPath?.setAttribute('d','');gooBlur?.setAttribute('stdDeviation','0');filamentPaths.forEach(path=>path.setAttribute('d',''));dropPaths.forEach(path=>path.setAttribute('d',''));[...filamentBeads,...dropCircles].forEach(circle=>circle.setAttribute('r','0'));
		};
	}

	function handleClick(event: MouseEvent) {
		if (inactive) { event.preventDefault(); event.stopImmediatePropagation(); return; }
		onclick?.(event);
	}
</script>

{#snippet labelContent()}
	{#if icon}<span class="rx-button__icon">{@render icon()}</span>{/if}{@render children()}
{/snippet}

{#snippet contents()}
	<span class="rx-button__glow" aria-hidden="true"></span>
	<span class="rx-button__special" aria-hidden="true">
		<span class="rx-button__border-draw"></span>
		<span class="rx-button__chrome-ring"></span>{#each ['hi','hi','hi','dark','dark','prism','prism','prism'] as kind, index}<span class="rx-button__chrome-shard rx-button__chrome-shard--{kind}" data-chrome-index={index}></span>{#if kind === 'prism'}<span class="rx-button__chrome-shard rx-button__chrome-shard--prism" data-chrome-index={index} style="--chr-blend:0"></span>{/if}{/each}
		<span class="rx-button__gradient-fields">{#each [1,2,3,4,5,6] as field}<span class="rx-button__gradient-field field-{field}"></span>{/each}</span><span class="rx-button__gradient-glass"></span><span class="rx-button__gradient-inner"></span>
		<span class="rx-button__ink"></span><span class="rx-button__liquid"></span><span class="rx-button__magnetic-glow"></span><span class="rx-button__plasma-ring"></span><span class="rx-button__shine"></span><span class="rx-button__push-base"></span>
		<svg class="rx-button__goo-svg" aria-hidden="true" focusable="false" preserveAspectRatio="none"><defs><filter id={gooFilterId} x="-60%" y="-120%" width="220%" height="340%" color-interpolation-filters="sRGB"><feGaussianBlur class="rx-button__goo-blur" in="SourceGraphic" stdDeviation="0" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="goo"/><feComposite in="SourceGraphic" in2="goo" operator="atop"/></filter></defs><g class="rx-button__goo-shapes"><rect class="rx-button__goo-body" x="0" y="0" width="1" height="1"/><path class="rx-button__goo-filament"/><circle class="rx-button__goo-filament-bead" r="0"/><path class="rx-button__goo-filament"/><circle class="rx-button__goo-filament-bead" r="0"/>{#each [0,1,2,3] as _}<path class="rx-button__goo-drop-tail"/><circle class="rx-button__goo-drop" r="0"/>{/each}<circle class="rx-button__goo-base" r="0"/><path class="rx-button__goo-tail"/><circle class="rx-button__goo-tip" r="0"/></g></svg>
	</span>
	{#if variant === 'invert'}<span class="rx-button__invert-clip" aria-hidden="true">{@render labelContent()}</span>{/if}
	<span class="rx-button__ripples" aria-hidden="true"></span>
	<span class="rx-button__content" class:rx-button__content--hidden={loading}>
		<span class="rx-button__face rx-button__face--front">{@render labelContent()}</span>
		<span class="rx-button__face rx-button__face--back" aria-hidden="true">{@render labelContent()}</span>
		{#if variant === 'glitch'}<span class="rx-button__face rx-button__face--glitch-b" aria-hidden="true">{@render labelContent()}</span>{/if}
	</span>
	{#if loading}<span class="rx-button__loader" aria-hidden="true"></span>{/if}
{/snippet}

{#if href}
	<a {...anchorProps} {href} class={classes} style={inlineStyle} data-rx-lamp aria-disabled={inactive ? 'true' : undefined} aria-busy={loading ? 'true' : undefined} tabindex={inactive ? -1 : restProps.tabindex} onclick={handleClick} {@attach attachProximity} {@attach attachNeighbor} {@attach attachRipple} {@attach attachMagnetic} {@attach variantEffects}>{@render contents()}</a>
{:else}
	<button {...restProps} class={classes} style={inlineStyle} data-rx-lamp disabled={inactive} aria-busy={loading ? 'true' : undefined} onclick={handleClick} {@attach attachProximity} {@attach attachNeighbor} {@attach attachRipple} {@attach attachMagnetic} {@attach variantEffects}>{@render contents()}</button>
{/if}

<style>
	@property --bd-a{syntax:'<angle>';inherits:false;initial-value:0deg}@property --c-a{syntax:'<angle>';inherits:false;initial-value:0deg}@property --chr-f{syntax:'<number>';inherits:false;initial-value:0}
	.rx-button{--h:40px;--r:12px;--fs:14px;--px:14px;--rip:255 255 255;--fx-tint:var(--rx-color);--rx-button-accent-ink:color-mix(in srgb,rgb(var(--rx-color)) 50%,rgb(var(--rx-text)));position:relative;isolation:isolate;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;gap:8px;height:var(--h);min-height:var(--h);padding:0 var(--px);border:1px solid transparent;border-radius:var(--r);font-family:inherit;font-weight:500;font-size:var(--fs);line-height:1;cursor:pointer;text-decoration:none;white-space:nowrap;user-select:none;touch-action:manipulation;transition:transform 240ms cubic-bezier(.34,1.56,.64,1),background-color 200ms cubic-bezier(.22,1,.36,1),border-color 200ms cubic-bezier(.22,1,.36,1),box-shadow 260ms cubic-bezier(.22,1,.36,1),opacity 200ms;}
	.rx-button:active:not(:disabled):not([aria-disabled='true']){transform:perspective(450px) rotateX(var(--press-rx,0deg)) rotateY(var(--press-ry,0deg)) scale(.96)}.rx-button:focus-visible{outline:2px solid rgb(var(--rx-color)/.9);outline-offset:3px}.rx-button:disabled,.rx-button[aria-disabled='true']{cursor:not-allowed;opacity:.45;pointer-events:none}
	.rx-button--default,.rx-button--shadow,.rx-button--relief{--rip:0 0 0;background:rgb(var(--rx-color));color:var(--rx-button-foreground)}.rx-button--default:hover{background:color-mix(in srgb,rgb(var(--rx-color)) 88%,rgb(var(--rx-warn-contrast-rgb)))}.rx-button--flat{color:var(--rx-button-accent-ink);background:rgb(var(--rx-color)/.13)}.rx-button--flat:hover{background:rgb(var(--rx-color)/.22)}.rx-button--border{color:var(--rx-button-accent-ink);background:transparent;border-color:rgb(var(--rx-color))}.rx-button--border:hover{background:rgb(var(--rx-color)/.1)}.rx-button--shadow{box-shadow:0 8px 20px -9px rgb(var(--rx-color)/.62)}.rx-button--relief{box-shadow:0 5px 0 rgb(var(--rx-color)/.52);transform:translateY(-2px)}.rx-button--relief:active{box-shadow:0 1px 0 rgb(var(--rx-color)/.52);transform:translateY(2px)}.rx-button--transparent{color:var(--rx-button-accent-ink);background:transparent}.rx-button--transparent:hover{background:rgb(var(--rx-color)/.1)}
	.rx-button--xl{--h:48px;--r:14px;--fs:15px;--px:18px}.rx-button--lg{--h:48px;--r:14px;--fs:15px;--px:18px}.rx-button--sm{--h:32px;--r:10px;--fs:13px;--px:12px}.rx-button--mini{--h:28px;--r:8px;--fs:12px;--px:10px}.rx-button--circle,.rx-button--square{width:var(--h);padding:0}.rx-button--circle{border-radius:999px}.rx-button--square{border-radius:8px}.rx-button--block{display:flex;width:100%}.rx-button--floating{box-shadow:0 10px 24px rgb(var(--rx-color)/.36)}
	.rx-button::before{content:'';position:absolute;inset:0;z-index:0;border-radius:inherit;pointer-events:none;background:var(--rx-neighbor-fill,none);opacity:calc(var(--rx-neighbor-lit,0)*.3);transition:opacity 140ms}.rx-button::after{content:'';position:absolute;inset:-1px;z-index:1;border-radius:inherit;padding:1px;pointer-events:none;background:var(--rx-neighbor-ring,none);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:var(--rx-neighbor-lit,0);transition:opacity 140ms}
	.rx-button__glow{position:absolute;inset:-1px;z-index:1;border-radius:inherit;padding:1px;pointer-events:none;background:radial-gradient(60px circle at var(--rx-gx,50%) var(--rx-gy,50%),rgb(var(--fx-tint)/.6),rgb(var(--fx-tint)/.42) 30%,rgb(var(--fx-tint)/.16) 58%,rgb(var(--fx-tint)/0) 82%),radial-gradient(200px circle at var(--rx-gx,50%) var(--rx-gy,50%),rgb(var(--fx-tint)/.6),rgb(var(--fx-tint)/.27) 42%,rgb(var(--fx-tint)/.08) 66%,rgb(var(--fx-tint)/0) 85%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:calc(var(--rx-glow,0)*.63);transition:opacity 140ms}
	.rx-button__special,.rx-button__ripples{position:absolute;inset:0;border-radius:inherit;pointer-events:none;overflow:hidden}.rx-button__special{z-index:0}.rx-button__ripples{z-index:4}:global(.rx-button__ripple){position:absolute;border-radius:50%;pointer-events:none;transform:translate(-50%,-50%) scale(0);background:radial-gradient(circle,rgb(var(--rip)/.38) 0%,rgb(var(--rip)/.20) 24%,rgb(var(--rip)/.09) 44%,rgb(var(--rip)/.03) 60%,transparent 76%);opacity:0;animation:rx-rip 780ms cubic-bezier(.22,1,.36,1) forwards,rx-fade 780ms cubic-bezier(.25,.1,.25,1) forwards}:global(.rx-button__ripple--gooey){animation-duration:720ms;background:radial-gradient(circle,rgb(var(--rip)/.32) 0%,rgb(var(--rip)/.16) 34%,rgb(var(--rip)/.05) 58%,transparent 76%)}:global(.rx-button__ripple--plasma){animation:rx-rip 760ms cubic-bezier(.2,.8,.3,1) forwards,rx-fade 760ms cubic-bezier(.2,.8,.3,1) forwards}:global(.rx-button__ripple--chrome){animation-duration:760ms;background:radial-gradient(circle,color-mix(in srgb,currentColor 30%,transparent) 0%,color-mix(in srgb,currentColor 16%,transparent) 26%,color-mix(in srgb,currentColor 6%,transparent) 48%,transparent 72%)}@keyframes rx-rip{to{transform:translate(-50%,-50%) scale(1)}}@keyframes rx-fade{from{opacity:.8}to{opacity:0}}
	.rx-button__content{position:relative;z-index:5;display:inline-grid;height:100%;align-items:center}.rx-button__content--hidden{opacity:0}.rx-button__face{grid-area:1/1;display:inline-flex;align-items:center;justify-content:center;gap:6px;height:100%;white-space:nowrap}.rx-button__face--back{visibility:hidden}.rx-button__icon{display:inline-flex}.rx-button__loader{position:absolute;z-index:6;width:14px;height:14px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:rx-spin .7s linear infinite}@keyframes rx-spin{to{transform:rotate(1turn)}}
	/* Source catalog: border draw */
	.rx-button--border-draw{--bd-a:0deg;color:rgb(var(--rx-text));background:transparent;border-color:rgb(var(--rx-gray-4));transition:color 220ms cubic-bezier(.22,1,.36,1),box-shadow 260ms cubic-bezier(.22,1,.36,1),transform 160ms ease}.rx-button--border-draw:hover{color:var(--rx-button-accent-ink);box-shadow:0 0 22px -8px rgb(var(--rx-color)/.7)}.rx-button__border-draw{display:none;position:absolute;inset:0;border-radius:inherit;padding:1.5px;background:conic-gradient(from -90deg,rgb(var(--rx-color)) var(--bd-a),transparent 0);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:--bd-a 560ms cubic-bezier(.65,0,.35,1),opacity 120ms}.rx-button--border-draw .rx-button__border-draw{display:block}.rx-button--border-draw:hover .rx-button__border-draw{--bd-a:360deg;opacity:1}
	/* Chrome alloy rim and centre flood */
	.rx-button--chrome{--chr-f:0;background:transparent;color:color-mix(in srgb,rgb(var(--rx-background)) calc(var(--chr-f)*100%),rgb(var(--rx-text)));border:0;transition:transform 240ms cubic-bezier(.34,1.56,.64,1),--chr-f 400ms cubic-bezier(.25,.8,.35,1)}.rx-button--chrome:hover,.rx-button--chrome:focus-visible{--chr-f:1}.rx-button__chrome-ring,.rx-button__chrome-shard{display:none;position:absolute;inset:0;border-radius:inherit;padding:var(--chr-bw,3px);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}.rx-button--chrome .rx-button__chrome-ring,.rx-button--chrome .rx-button__chrome-shard{display:block}.rx-button__chrome-ring{background:conic-gradient(from var(--chr-a,0deg),rgb(var(--rx-light)) 0%,rgb(var(--rx-gray-2)) 11%,rgb(var(--rx-dark)) 18% 25%,rgb(var(--rx-light)) 27% 36%,rgb(var(--rx-gray-3)) 45%,rgb(var(--rx-dark)) 50% 55%,rgb(var(--rx-light)) 58%,rgb(var(--rx-gray-2)) 65%,rgb(var(--rx-dark)) 70% 76%,rgb(var(--rx-light)) 85%,rgb(var(--rx-gray-3)) 93%,rgb(var(--rx-light)) 100%);opacity:calc(1 - var(--chr-f))}.rx-button__chrome-shard{background:conic-gradient(from calc(var(--p,0)*1deg),transparent calc(50% - var(--w,1)*.5%),rgb(var(--rx-light)) 50%,transparent calc(50% + var(--w,1)*.5%));filter:blur(calc(var(--b,.2)*1px));opacity:calc(var(--o,0)*(1 - var(--chr-f)))}.rx-button__chrome-shard--dark{background:conic-gradient(from calc(var(--p,0)*1deg),transparent calc(50% - var(--w,1)*.5%),rgb(var(--rx-dark)) 50%,transparent calc(50% + var(--w,1)*.5%))}.rx-button__chrome-shard--prism{opacity:calc(var(--chr-prism,1)*var(--chr-blend,1)*var(--o,0)*(1 - var(--chr-f)));transition:opacity 900ms cubic-bezier(.25,.8,.25,1)}.rx-button--chrome .rx-button__special::after{content:'';position:absolute;inset:0;border-radius:inherit;z-index:3;background:rgb(var(--rx-text));clip-path:inset(calc(var(--px)*(1 - var(--chr-f))) round calc(var(--r)*(.45 + .55*var(--chr-f))));opacity:min(1,calc(var(--chr-f)*2.6))}
	/* Glitch */
	.rx-button--glitch{background:rgb(var(--rx-gray-1));color:rgb(var(--rx-text));border-color:rgb(var(--rx-gray-4));letter-spacing:.02em;overflow:hidden}.rx-button--glitch:hover{border-color:rgb(var(--rx-light)/.6);box-shadow:0 0 0 1px rgb(255 0 200/.25),0 0 18px -6px rgb(0 240 255/.5)}.rx-button--glitch .rx-button__face--back,.rx-button--glitch .rx-button__face--glitch-b{visibility:visible;color:rgb(var(--rx-light));opacity:0}.rx-button--glitch .rx-button__face--back{text-shadow:-2px 0 rgb(var(--rx-ai-cyan));clip-path:inset(0 0 72% 0)}.rx-button--glitch .rx-button__face--glitch-b{text-shadow:2px 0 rgb(var(--rx-ai-magenta));clip-path:inset(72% 0 0 0)}.rx-button--glitch:hover .rx-button__face--back{opacity:.9;animation:rx-glitch-a 560ms steps(2,end) infinite}.rx-button--glitch:hover .rx-button__face--glitch-b{opacity:.9;animation:rx-glitch-b 560ms steps(2,end) infinite}@keyframes rx-glitch-a{0%,100%{transform:translate(0);clip-path:inset(0 0 72% 0)}25%{transform:translate(-2px,-1px);clip-path:inset(30% 0 40% 0)}50%{transform:translate(2px,1px);clip-path:inset(60% 0 8% 0)}75%{transform:translate(-1px,1px);clip-path:inset(12% 0 66% 0)}}@keyframes rx-glitch-b{0%,100%{transform:translate(0);clip-path:inset(72% 0 0 0)}25%{transform:translate(2px,1px);clip-path:inset(8% 0 60% 0)}50%{transform:translate(-2px,-1px);clip-path:inset(42% 0 28% 0)}75%{transform:translate(1px,-1px);clip-path:inset(66% 0 12% 0)}}
	/* Source dynamic SVG goo: a spring tail follows the pointer outside the hit area. */
	.rx-button--gooey{--rip:0 0 0;background:transparent;color:var(--rx-button-foreground);border-radius:999px;overflow:visible;font-weight:650}.rx-button__goo-svg{display:none;position:absolute;inset:0;width:100%;height:100%;overflow:visible}.rx-button--gooey .rx-button__goo-svg{display:block}.rx-button__goo-shapes{fill:rgb(var(--rx-color))}.rx-button__goo-tail{stroke:none}
	/* Source six-field black-glass gradient */
	.rx-button--gradient{--rip:255 255 255;height:34px;border:0;border-radius:999px;background:#000;color:#fff;overflow:hidden;font-weight:400}.rx-button__gradient-fields,.rx-button__gradient-inner,.rx-button__gradient-glass{display:none;position:absolute}.rx-button--gradient .rx-button__gradient-fields,.rx-button--gradient .rx-button__gradient-inner,.rx-button--gradient .rx-button__gradient-glass{display:block}.rx-button__gradient-fields{inset:0;z-index:5;transition:transform .5s}.rx-button__gradient-field{position:absolute;width:100px;height:100px;border-radius:50%;filter:blur(12px);transition:2s}.field-1{background:#00d4ff;transform:translate(-86%,-65%)}.field-2{background:#4f46e5;transform:translate(3%,-63%)}.field-3{background:#a855f7;transform:translate(64%,-89%)}.field-4{background:#2563eb;transform:translate(-87%,8%)}.field-5{background:#ff2ec4;transform:translate(-35%,-76%)}.field-6{background:#22d3ee;transform:translate(-69%,-79%)}.rx-button__gradient-glass{inset:-15%;z-index:6;background:radial-gradient(103.46% 134.6% at 64.66% 50%,transparent 27.37%,rgb(217 217 217/.3) 100%)}.rx-button__gradient-inner{z-index:7;width:calc(100% - 4px);height:calc(100% - 4px);inset:2px;border-radius:inherit;background:#000;filter:blur(10px);opacity:0;transform:scale(.95);transition:.5s}.rx-button--gradient:hover .rx-button__gradient-fields{transform:scale(1.1)}.rx-button--gradient:hover .rx-button__gradient-inner{filter:blur(0);opacity:1;transform:scale(1)}
	/* Invert spring clip */
	.rx-button--invert{background:transparent;color:var(--rx-button-accent-ink);border-color:rgb(var(--rx-color));overflow:hidden;transform:scale(var(--sx,1),var(--sy,1))}.rx-button__ink{display:none;position:absolute;inset:0;background:rgb(var(--rx-color));clip-path:circle(var(--ink-r,0px) at var(--ink-x,50%) var(--ink-y,50%));will-change:clip-path}.rx-button--invert .rx-button__ink{display:block}.rx-button--invert .rx-button__content,.rx-button__invert-clip{transform:translateX(var(--lx,0)) scale(var(--lsx,1),var(--lsy,1));filter:var(--lf,none);will-change:transform,filter}.rx-button__invert-clip{position:absolute;inset:0;z-index:6;display:inline-flex;align-items:center;justify-content:center;gap:6px;color:var(--rx-button-foreground);clip-path:circle(var(--ink-r,0px) at var(--ink-x,50%) var(--ink-y,50%));pointer-events:none}
	/* Liquid reveal */
	.rx-button--liquid{background:rgb(var(--rx-gray-1));color:rgb(var(--rx-text));border-color:rgb(var(--rx-gray-4));overflow:hidden}.rx-button__liquid{display:none;position:absolute;z-index:2;left:0;bottom:0;width:100%;height:0;background:rgb(var(--rx-color));border-radius:50% 50% 0 0/22% 22% 0 0;transition:height 520ms cubic-bezier(.65,0,.35,1)}.rx-button--liquid .rx-button__liquid{display:block}.rx-button--liquid:hover{color:var(--rx-button-foreground)}.rx-button--liquid:hover .rx-button__liquid{height:240%;animation:rx-liquid 1.7s ease-in-out infinite}@keyframes rx-liquid{50%{border-radius:44% 56% 0 0/30% 16% 0 0}}
	/* Magnetic */
	.rx-button--magnetic{background:rgb(var(--rx-color));color:var(--rx-button-foreground);transition:transform 300ms cubic-bezier(.34,1.56,.64,1)}.rx-button--magnetic .rx-button__content{transition:transform 300ms cubic-bezier(.34,1.56,.64,1)}.rx-button__magnetic-glow{display:none;position:absolute;inset:-1px;border-radius:inherit;background:radial-gradient(120% 120% at var(--mag-x,50%) var(--mag-y,50%),rgb(var(--rx-light)/.18),transparent 60%);opacity:0;transition:opacity 260ms}.rx-button--magnetic .rx-button__magnetic-glow{display:block}.rx-button--magnetic:hover .rx-button__magnetic-glow{opacity:1}
	/* Plasma token ring */
	.rx-button--plasma{background:rgb(var(--rx-background));color:rgb(var(--rx-text));border-color:transparent;overflow:hidden;transform:scale(var(--press-scale,1));transition:transform 180ms cubic-bezier(.2,.8,.3,1)}.rx-button--plasma:active{--press-scale:.972}.rx-button--plasma .rx-button__content{transform:translate(var(--plx,0),var(--ply,0));transition:transform 90ms linear}.rx-button__plasma-ring{display:none;position:absolute;inset:0;padding:2px;border-radius:inherit;background:linear-gradient(105deg,rgb(var(--rx-ai-cyan)),rgb(var(--rx-color)) 42% 76%,rgb(var(--rx-ai-cyan)));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;filter:drop-shadow(0 0 5px rgb(var(--rx-color)/.58))}.rx-button--plasma .rx-button__plasma-ring{display:block}
	/* Mechanical push */
	.rx-button--push{--depth:5px;background:rgb(var(--rx-color));color:var(--rx-button-foreground);border:0;overflow:visible;transform:translateY(calc(var(--depth)*-1))}.rx-button__push-base{display:none;position:absolute;inset:var(--depth) 0 calc(var(--depth)*-1);border-radius:inherit;background:rgb(var(--rx-color)/.48);box-shadow:inset 0 -2px 3px rgb(var(--rx-dark)/.3)}.rx-button--push .rx-button__push-base{display:block}.rx-button--push .rx-button__special::before{content:'';position:absolute;inset:0;border-radius:inherit;background:rgb(var(--rx-color));box-shadow:inset 0 1px rgb(var(--rx-light)/.18)}.rx-button--push:active{transform:translateY(1px) scale(.99)}
	/* Diagonal sheen */
	.rx-button--shine{background:rgb(var(--rx-color));color:var(--rx-button-foreground);overflow:hidden;transition:transform 260ms cubic-bezier(.34,1.56,.64,1),box-shadow 260ms cubic-bezier(.22,1,.36,1)}.rx-button--shine:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 10px 26px -12px rgb(var(--rx-dark)/.55)}.rx-button__shine{display:none;position:absolute;top:-60%;left:0;width:55%;height:220%;transform:translateX(-220%) rotate(20deg);background:linear-gradient(90deg,transparent 0%,rgb(var(--rx-light)/.15) 35%,rgb(var(--rx-light)/.85) 50%,rgb(var(--rx-light)/.15) 65%,transparent 100%);opacity:0}.rx-button--shine .rx-button__shine{display:block}.rx-button--shine:hover .rx-button__shine{animation:rx-shine 760ms cubic-bezier(.3,.7,.3,1) forwards}@keyframes rx-shine{0%{opacity:0;transform:translateX(-220%) rotate(20deg)}12%,88%{opacity:1}100%{opacity:0;transform:translateX(320%) rotate(20deg)}}
	/* V2 two-face label */
	.rx-button--v2{background:rgb(var(--rx-color));color:var(--rx-button-foreground);overflow:hidden}.rx-button--v2 .rx-button__face{transition:transform 320ms cubic-bezier(.22,1,.36,1),filter 320ms cubic-bezier(.22,1,.36,1),opacity 320ms cubic-bezier(.22,1,.36,1)}.rx-button--v2 .rx-button__face--back{visibility:visible;transform:translateY(100%);filter:blur(6px);opacity:0}.rx-button--v2:hover .rx-button__face--front{transform:translateY(-100%);filter:blur(6px);opacity:0}.rx-button--v2:hover .rx-button__face--back{transform:translateY(0);filter:blur(0);opacity:1}
	.rx-button--glow{animation:rx-effect-glow 1.8s ease-in-out infinite}.rx-button--pulse{animation:rx-effect-pulse 1.4s ease-in-out infinite}@keyframes rx-effect-glow{50%{filter:drop-shadow(0 0 10px rgb(var(--rx-color)/.6))}}@keyframes rx-effect-pulse{50%{transform:scale(1.045)}}
	@media(prefers-reduced-motion:reduce){.rx-button,.rx-button__content,.rx-button__face,.rx-button__special :global(*),.rx-button__liquid{transition:none!important}.rx-button--glow,.rx-button--pulse,.rx-button__loader,.rx-button__liquid,.rx-button__shine,.rx-button--glitch .rx-button__face--back{animation:none!important}.rx-button:active{transform:none!important}:global(.rx-button__ripple){display:none}}
</style>
