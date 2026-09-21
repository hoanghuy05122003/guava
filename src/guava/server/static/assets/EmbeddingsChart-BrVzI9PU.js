import{BufferAttribute as e,BufferGeometry as t,Points as n,Scene as r,WebGLRenderer as i,a,c as o,i as s,l as c,n as l,o as u,r as d,s as f,t as p,u as m}from"./three.module-CrDz7KIP.js";function h(e,t=!1){let n=e.length,r=new Float32Array(n),i=new Float32Array(n),a=new Float32Array(n),o=Array(n),s=new Uint32Array(n),c=[],l=new Map,u=!1,d=1/0,f=-1/0,p=1/0,m=-1/0,h=1/0,g=-1/0;for(let _=0;_<n;_++){let{id:n,x:v,y,z:b,label:x}=e[_];b!==void 0&&!t&&(u=!0);let S=t?0:b??0;r[_]=v,i[_]=y,a[_]=S,o[_]=n,v<d&&(d=v),v>f&&(f=v),y<p&&(p=y),y>m&&(m=y),S<h&&(h=S),S>g&&(g=S);let C=String(x),w=l.get(C);w===void 0&&(w=c.length,c.push(C),l.set(C,w)),s[_]=w}return n===0&&(d=p=h=0,f=m=g=1),{n,xs:r,ys:i,zs:a,hasZ:u,ids:o,labelIndex:s,labelKeys:c,xMin:d,xMax:f,yMin:p,yMax:m,zMin:h,zMax:g}}function g(e,t){if(!t){let{xMin:t,xMax:n,yMin:r,yMax:i,zMin:a,zMax:o}=e;return{xMin:t,xMax:n,yMin:r,yMax:i,zMin:a,zMax:o}}let n=1/0,r=-1/0,i=1/0,a=-1/0,o=1/0,s=-1/0;for(let c=0;c<e.n;c++){if(!t[c])continue;let l=e.xs[c],u=e.ys[c],d=e.zs[c];l<n&&(n=l),l>r&&(r=l),u<i&&(i=u),u>a&&(a=u),d<o&&(o=d),d>s&&(s=d)}return n===1/0?null:{xMin:n,xMax:r,yMin:i,yMax:a,zMin:o,zMax:s}}function _(e,t){let n=e.labelKeys.map((e,n)=>{let r=t[n%t.length];return[parseInt(r.slice(1,3),16)/255,parseInt(r.slice(3,5),16)/255,parseInt(r.slice(5,7),16)/255]}),r=new Float32Array(e.n*3);for(let t=0;t<e.n;t++)r.set(n[e.labelIndex[t]],t*3);return r}var v=[`#ffa500`,`#19a7ce`,`#9b5de5`,`#02c39a`,`#ef476f`],y=`#ffa500`,b=.15,x=.7,S=.4,C=.85,w=.9,T=.55,E={mode:`density`,gamma:1,glow:1,singleAlpha:.55};function D(e,t,n,r){let i=e.xMax-e.xMin||1,a=e.yMax-e.yMin||1,o=Math.max(t-2*r,1),s=Math.max(n-2*r,1),c=Math.max(i/o,a/s),l=(e.xMin+e.xMax)/2,u=(e.yMin+e.yMax)/2,d=t*c/2,f=n*c/2;return{x0:l-d,x1:l+d,y0:u-f,y1:u+f}}function O(e,t){return(t.x1-t.x0)/(e.x1-e.x0)}function k(e,t,n,r,i){return[e.x0+r/t*(e.x1-e.x0),e.y1-i/n*(e.y1-e.y0)]}function A(e,t){let{x0:n,y0:r,x1:i,y1:a}=e;return n<t.x0&&(i+=t.x0-n,n=t.x0),i>t.x1&&(n-=i-t.x1,i=t.x1),r<t.y0&&(a+=t.y0-r,r=t.y0),a>t.y1&&(r-=a-t.y1,a=t.y1),{x0:n,y0:r,x1:i,y1:a}}function j(e,t){let n=(e.x1-e.x0)*(1/t-1)/2,r=(e.y1-e.y0)*(1/t-1)/2;return{x0:e.x0-n,x1:e.x1+n,y0:e.y0-r,y1:e.y1+r}}function M(e,t,n,r,i,a=t){let o=(t.x1-t.x0)/(a.x1-a.x0),s=Math.min(Math.max(O(e,t)*r,o),i),c=(t.x1-t.x0)/s,l=(t.y1-t.y0)/s,[u,d]=n,f=(u-e.x0)/(e.x1-e.x0),p=(d-e.y0)/(e.y1-e.y0);return A({x0:u-f*c,x1:u+(1-f)*c,y0:d-p*l,y1:d+(1-p)*l},a)}function N(e,t,n,r){return A({x0:e.x0+n,x1:e.x1+n,y0:e.y0+r,y1:e.y1+r},t)}function P(e,t,n){let r=!1;for(let i=0,a=e.length-1;i<e.length;a=i++){let[o,s]=e[i],[c,l]=e[a];s>n!=l>n&&t<(c-o)*(n-s)/(l-s)+o&&(r=!r)}return r}function F(e,t,n,r,i,a){let o=1/0,s=-1/0,c=1/0,l=-1/0;for(let[e,t]of i)e<o&&(o=e),e>s&&(s=e),t<c&&(c=t),t>l&&(l=t);let{n:u,xs:d,ys:f,zs:p}=e,m=[];for(let e=0;e<u;e++){if(a&&a[e]===0)continue;let u=d[e],h=f[e],g=p[e],_=t[3]*u+t[7]*h+t[11]*g+t[15];if(_<=0)continue;let v=((t[0]*u+t[4]*h+t[8]*g+t[12])/_*.5+.5)*n,y=(.5-(t[1]*u+t[5]*h+t[9]*g+t[13])/_*.5)*r;v>=o&&v<=s&&y>=c&&y<=l&&P(i,v,y)&&m.push(e)}return m}function I(e,t,n,r,i){let{n:a,xs:o,ys:s,zs:c}=e;if(!Number.isInteger(i)||i<0||i>=a)return null;let l=o[i],u=s[i],d=c[i],f=t[3]*l+t[7]*u+t[11]*d+t[15];return f<=0?null:{x:((t[0]*l+t[4]*u+t[8]*d+t[12])/f*.5+.5)*n,y:(.5-(t[1]*l+t[5]*u+t[9]*d+t[13])/f*.5)*r}}function L(e,t,n,r,i,a,o,s){let{n:c,xs:l,ys:u,zs:d}=e,f=-1,p=o*o,m=0,h=0;for(let e=0;e<c;e++){if(s&&s[e]===0)continue;let o=l[e],c=u[e],g=d[e],_=t[3]*o+t[7]*c+t[11]*g+t[15];if(_<=0)continue;let v=((t[0]*o+t[4]*c+t[8]*g+t[12])/_*.5+.5)*n,y=(.5-(t[1]*o+t[5]*c+t[9]*g+t[13])/_*.5)*r,b=v-i,x=y-a,S=b*b+x*x;S<p&&(p=S,f=e,m=v,h=y)}return f<0?null:{index:f,id:e.ids[f],label:e.labelKeys[e.labelIndex[f]],x:m,y:h}}var R=class{camera;element;onChange;listeners=new AbortController;bounds=null;focus=null;home={x0:-1,y0:-1,x1:1,y1:1};world=this.home;defaultView=this.home;rect=this.home;width=1;height=1;panPointer=null;panLast=[0,0];cursorBefore=``;mode=`select`;constructor(e,t){this.element=e,this.onChange=t,this.camera=new u(-1,1,1,-1,.1,10),this.camera.position.set(0,0,1);let{signal:n}=this.listeners;e.addEventListener(`wheel`,e=>this.handleWheel(e),{passive:!1,signal:n}),e.addEventListener(`pointerdown`,e=>this.handlePanStart(e),{signal:n}),e.addEventListener(`pointermove`,e=>this.handlePanMove(e),{signal:n});for(let t of[`pointerup`,`pointercancel`])e.addEventListener(t,e=>this.handlePanEnd(e),{signal:n})}isLassoStart(e){return this.mode===`select`&&e.button===0&&!e.shiftKey}setMode(e){this.mode=e}toDataPolygon(e){return e.map(([e,t])=>k(this.rect,this.width,this.height,e,t))}setBounds(e,t,n){this.bounds=e,this.focus=null,this.width=t,this.height=n,this.home=D(e,t,n,24),this.world=j(this.home,T),this.defaultView=j(this.home,w),this.rect=this.defaultView,this.apply()}setFocus(e){this.focus=e}resize(e,t){if(this.width=e,this.height=t,!this.bounds)return;let n=O(this.rect,this.home),r=(this.rect.x0+this.rect.x1)/2,i=(this.rect.y0+this.rect.y1)/2;this.home=D(this.bounds,e,t,24),this.world=j(this.home,T),this.defaultView=j(this.home,w);let a=(this.home.x1-this.home.x0)/n,o=(this.home.y1-this.home.y0)/n;this.rect=A({x0:r-a/2,x1:r+a/2,y0:i-o/2,y1:i+o/2},this.world),this.apply()}reset(){this.rect=this.focus?this.frameFocus(this.focus):this.defaultView,this.apply()}frameFocus(e){let t=D(e,this.width,this.height,24),n=Math.min(O(t,this.home),50),r=(this.home.x1-this.home.x0)/n,i=(this.home.y1-this.home.y0)/n,a=(e.xMin+e.xMax)/2,o=(e.yMin+e.yMax)/2;return A({x0:a-r/2,x1:a+r/2,y0:o-i/2,y1:o+i/2},this.world)}destroy(){this.panPointer!==null&&this.endPan(),this.listeners.abort()}apply(){let{x0:e,y0:t,x1:n,y1:r}=this.rect;this.camera.left=e,this.camera.right=n,this.camera.top=r,this.camera.bottom=t,this.camera.updateProjectionMatrix(),this.onChange()}handleWheel(e){e.preventDefault();let t=e.ctrlKey?.02:.002,n=2**(-e.deltaY*t),r=k(this.rect,this.width,this.height,e.offsetX,e.offsetY);this.rect=M(this.rect,this.home,r,n,50,this.world),this.apply()}handlePanStart(e){this.panPointer===null&&(e.button===1||e.button===0&&(e.shiftKey||this.mode===`explore`))&&(e.preventDefault(),this.panPointer=e.pointerId,this.panLast=[e.offsetX,e.offsetY],this.cursorBefore=this.element.style.cursor,this.element.style.cursor=`grabbing`,this.element.setPointerCapture(e.pointerId))}handlePanMove(e){if(this.panPointer!==e.pointerId)return;let[t,n]=this.panLast;this.panLast=[e.offsetX,e.offsetY];let r=(this.rect.x1-this.rect.x0)/this.width,i=(this.rect.y1-this.rect.y0)/this.height;this.rect=N(this.rect,this.world,-(e.offsetX-t)*r,(e.offsetY-n)*i),this.apply()}handlePanEnd(e){this.panPointer===e.pointerId&&this.endPan()}endPan(){this.panPointer=null,this.element.style.cursor===`grabbing`&&(this.element.style.cursor=this.cursorBefore)}},z=class{listeners=new AbortController;pointerId=null;downX=0;downY=0;constructor(e,t){let{signal:n}=this.listeners;e.addEventListener(`pointerdown`,e=>{e.button!==0||e.shiftKey||(this.pointerId=e.pointerId,this.downX=e.offsetX,this.downY=e.offsetY)},{signal:n}),e.addEventListener(`pointerup`,e=>{if(this.pointerId!==e.pointerId)return;this.pointerId=null;let n=e.offsetX-this.downX,r=e.offsetY-this.downY;n*n+r*r>16||t.onClick(e.offsetX,e.offsetY)},{signal:n}),e.addEventListener(`pointercancel`,()=>{this.pointerId=null},{signal:n})}destroy(){this.listeners.abort()}},B=class{callbacks;listeners=new AbortController;handle=null;pointer=null;shown=null;buttonsDown=!1;constructor(e,t){this.callbacks=t;let{signal:n}=this.listeners;e.addEventListener(`pointerdown`,()=>{this.buttonsDown=!0,this.pointer=null,this.clear()},{capture:!0,signal:n});for(let t of[`pointerup`,`pointercancel`])e.addEventListener(t,()=>{this.buttonsDown=!1},{capture:!0,signal:n});e.addEventListener(`pointermove`,e=>{this.callbacks.isBlocked()||e.buttons!==0||(this.pointer=[e.offsetX,e.offsetY],this.schedule())},{signal:n}),e.addEventListener(`pointerleave`,()=>{this.pointer=null,this.clear()},{signal:n})}viewChanged(){this.buttonsDown?this.clear():this.schedule()}reset(){this.pointer=null,this.clear()}destroy(){this.cancel(),this.listeners.abort()}schedule(){this.handle!==null||!this.pointer||(this.handle=window.setTimeout(()=>{this.handle=null,this.hitTest()},50))}clear(){this.cancel(),this.shown&&(this.shown=null,this.callbacks.onHover(null))}cancel(){this.handle!==null&&(window.clearTimeout(this.handle),this.handle=null)}hitTest(){if(!this.pointer||this.callbacks.isBlocked())return;let e=this.callbacks.pick(this.pointer[0],this.pointer[1]);if(!e){this.shown&&(this.shown=null,this.callbacks.onHover(null));return}this.shown&&this.shown.index===e.index&&this.shown.x===e.x&&this.shown.y===e.y||(this.shown=e,this.callbacks.onHover(e))}};function V(e){if(e.length<3)return!1;let t=1/0,n=1/0,r=-1/0,i=-1/0,a=0;for(let o=0;o<e.length;o++){let[s,c]=e[o],[l,u]=e[(o+1)%e.length];s<t&&(t=s),s>r&&(r=s),c<n&&(n=c),c>i&&(i=c),a+=s*u-l*c}return a!==0&&Math.hypot(r-t,i-n)>=12}var H=class{svg;path;listeners=new AbortController;polygon=[];drawing=!1;pointerId=null;constructor(e,t){let n=`http://www.w3.org/2000/svg`;this.svg=document.createElementNS(n,`svg`),Object.assign(this.svg.style,{position:`absolute`,inset:`0`,width:`100%`,height:`100%`,pointerEvents:`none`,zIndex:`1`}),this.path=document.createElementNS(n,`path`),this.path.setAttribute(`fill`,y),this.path.setAttribute(`fill-opacity`,`0.08`),this.path.setAttribute(`stroke`,y),this.path.setAttribute(`stroke-width`,`1.5`),this.svg.appendChild(this.path),e.appendChild(this.svg);let{signal:r}=this.listeners;e.addEventListener(`pointerdown`,n=>{this.drawing||!t.shouldStart(n)||(n.stopPropagation(),n.preventDefault(),this.drawing=!0,this.pointerId=n.pointerId,this.polygon=[[n.offsetX,n.offsetY]],e.setPointerCapture(n.pointerId))},{capture:!0,signal:r}),e.addEventListener(`pointermove`,e=>{if(!this.drawing||e.pointerId!==this.pointerId)return;e.stopPropagation();let[t,n]=this.polygon[this.polygon.length-1],r=e.offsetX-t,i=e.offsetY-n;r*r+i*i<9||(this.polygon.push([e.offsetX,e.offsetY]),this.path.setAttribute(`d`,`M${this.polygon.map(e=>e.join(`,`)).join(`L`)}Z`))},{capture:!0,signal:r}),e.addEventListener(`pointerup`,e=>{if(!this.drawing||e.pointerId!==this.pointerId)return;e.stopPropagation(),this.drawing=!1,this.pointerId=null;let n=this.polygon;this.polygon=[],this.path.setAttribute(`d`,``),t.onComplete(V(n)?n:null,e.offsetX,e.offsetY)},{capture:!0,signal:r}),e.addEventListener(`pointercancel`,e=>{!this.drawing||e.pointerId!==this.pointerId||(this.drawing=!1,this.pointerId=null,this.polygon=[],this.path.setAttribute(`d`,``))},{capture:!0,signal:r})}isDrawing(){return this.drawing}destroy(){this.listeners.abort(),this.svg.remove()}},U=class{host=null;lasso=null;active=null;writeHost(e){return this.host=e,this.active=e?`host`:this.lasso?`lasso`:null,this.current()}writeLasso(e){return this.lasso=e,this.active=e?`lasso`:this.host?`host`:null,this.current()}clear(){return this.host=null,this.lasso=null,this.active=null,null}current(){return this.active===`host`?this.host:this.active===`lasso`?this.lasso:null}},W=`
  precision highp float;

  attribute vec3 position;
  attribute vec3 color;
  attribute float emphasis;
  attribute float visible;

  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;
  uniform float uPointSize;
  uniform float uHasSelection;

  varying vec3 vColor;
  varying float vWeight;

  void main() {
    // dim = 1 for a non-selected point while a selection is active.
    // Dimming cuts the point's weight AND desaturates it toward gray:
    // the weight cut fades isolated points, the desaturation is what
    // survives density accumulation in deep piles (see constants.ts)
    float dim = uHasSelection * (1.0 - emphasis);
    vColor = mix(color, vec3(${S}), dim * ${x});
    vWeight = mix(1.0, ${b}, dim);
    if (visible < 0.5) {
      // Outside the clip volume (z > w): never rasterized
      gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
      gl_PointSize = 0.0;
      return;
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uPointSize;
  }
`,G=`
  precision highp float;

  uniform float uMode;
  uniform float uOpacity;

  varying vec3 vColor;
  varying float vWeight;

  void main() {
    float dist = length(gl_PointCoord - 0.5);
    if (uMode > 1.5) {
      // opaque(ish): depth-tested occlusion, AA edges via blending, and
      // uOpacity leaves a hint of see-through. Unsorted, so at low
      // opacity rear points pop instead of fading — keep it near 1.
      // Dimming darkens (a depth-written low-alpha point would block
      // whatever sits behind it)
      float edge = 1.0 - smoothstep(0.4, 0.5, dist);
      if (edge == 0.0) discard;
      gl_FragColor = vec4(vColor * vWeight, edge * uOpacity);
    } else {
      float edge = 1.0 - smoothstep(0.4, 0.5, dist);
      if (edge == 0.0) discard;
      float w = edge * vWeight;
      // density: premultiplied (color·w, w) for additive accumulation;
      // alpha: plain (color, coverage·alpha) for classic compositing
      gl_FragColor = mix(
        vec4(vColor, w * ${C}),
        vec4(vColor * w, w),
        uMode
      );
    }
  }
`,K=`
  precision highp float;

  attribute vec3 position;
  attribute vec3 color;
  attribute float emphasis;
  attribute float visible;

  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;
  uniform float uPointSize;

  varying vec3 vColor;

  void main() {
    vColor = color;
    if (emphasis < 0.5 || visible < 0.5) {
      // Outside the clip volume (z > w): never rasterized
      gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
      gl_PointSize = 0.0;
      return;
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uPointSize;
  }
`,q=`
  precision highp float;

  varying vec3 vColor;

  void main() {
    float dist = length(gl_PointCoord - 0.5);
    float edge = 1.0 - smoothstep(0.44, 0.5, dist);
    if (edge == 0.0) discard;
    gl_FragColor = vec4(vColor, edge);
  }
`,J=`
  uniform float uGamma;
  uniform float uGlow;
  uniform float uAlphaSingle;

  vec4 toneMap(vec4 acc) {
    if (acc.a <= 0.0) return vec4(0.0);
    // rgb summed color*weight and a summed weight, so rgb/a is the
    // density-weighted average color at this pixel
    vec3 base = acc.rgb / acc.a;
    float d = pow(acc.a, uGamma);
    // Opacity: linear ramp up to the single-point alpha while coverage
    // is partial (d < 1), then exponential saturation toward 1.0 as the
    // pile deepens (d=2 ≈ 0.7, d=5 ≈ 0.95)
    float alpha = uAlphaSingle * min(d, 1.0) +
      (1.0 - uAlphaSingle) * (1.0 - exp(-max(d - 1.0, 0.0) * 0.35));
    // Glow: blend toward white with the log of density so 1000-deep
    // cores read hotter than 10-deep ones; capped at 45% so the point
    // hue stays recognizable
    vec3 color = mix(base, vec3(1.0), uGlow * min(0.45, 0.06 * log2(1.0 + d)));
    return vec4(color, alpha);
  }
`,Y=`
  precision highp float;

  attribute vec2 position;
  varying vec2 vUv;

  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`,X=`
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D uAcc;

  ${J}

  void main() {
    vec4 mapped = toneMap(texture2D(uAcc, vUv));
    if (mapped.a <= 0.0) discard;
    gl_FragColor = mapped;
  }
`,Z=class{accumTarget;screenScene=new r;screenMaterial;screenCamera=new u(-1,1,1,-1,0,1);constructor(){this.accumTarget=new m(1,1,{type:l,magFilter:a,minFilter:a,depthBuffer:!1,stencilBuffer:!1});let n=new t;n.setAttribute(`position`,new e(new Float32Array([-1,-1,3,-1,-1,3]),2)),n.boundingSphere=new o(new c(0,0,0),1),this.screenMaterial=new f({vertexShader:Y,fragmentShader:X,uniforms:{uAcc:{value:this.accumTarget.texture},uGamma:{value:E.gamma},uGlow:{value:E.glow},uAlphaSingle:{value:E.singleAlpha}},transparent:!0,depthTest:!1,depthWrite:!1});let r=new s(n,this.screenMaterial);r.frustumCulled=!1,this.screenScene.add(r)}setSize(e,t){this.accumTarget.setSize(e,t)}applySettings({gamma:e,glow:t,singleAlpha:n}){this.screenMaterial.uniforms.uGamma.value=e,this.screenMaterial.uniforms.uGlow.value=t,this.screenMaterial.uniforms.uAlphaSingle.value=n}render(e,t,n,r){r?(e.setRenderTarget(this.accumTarget),e.clear(),e.render(t,n),e.setRenderTarget(null),e.render(this.screenScene,this.screenCamera)):(e.setRenderTarget(null),e.render(t,n))}dispose(){this.screenMaterial.dispose(),this.accumTarget.dispose()}},Q=class{container;callbacks;zCamera;canvas;renderer;scene=new r;points;material;overlayScene=new r;emphasisPoints;emphasisMaterial;hasSelection=!1;selection=new U;pipeline=new Z;lasso;picker;clicks;resizeObserver;listeners=new AbortController;viewProjection=new d;adapter=null;adapterHasZ=!1;cols=null;colorAttribute=null;emphasisMask=new Float32Array;emphasisAttribute=null;visibleMask=null;visibleAttribute=null;settings=E;interactionMode=`select`;width=0;height=0;renderQueued=!1;rafHandle=null;disposed=!1;constructor(e,r={},a={}){this.container=e,this.callbacks=r,this.zCamera=a.zCamera??null,getComputedStyle(e).position===`static`&&(e.style.position=`relative`),this.canvas=document.createElement(`canvas`),Object.assign(this.canvas.style,{position:`absolute`,inset:`0`,width:`100%`,height:`100%`}),e.prepend(this.canvas),this.renderer=new i({canvas:this.canvas,alpha:!0,antialias:!1,powerPreference:`high-performance`}),this.renderer.setPixelRatio(window.devicePixelRatio||1),this.renderer.sortObjects=!1,this.renderer.setClearColor(0,0),this.material=new f({vertexShader:W,fragmentShader:G,uniforms:{uPointSize:{value:6*(window.devicePixelRatio||1)},uHasSelection:{value:0},uMode:{value:1},uOpacity:{value:E.singleAlpha}},transparent:!0,blending:5,blendSrc:201,blendDst:201,blendSrcAlpha:201,blendDstAlpha:201,depthTest:!1,depthWrite:!1}),this.points=new n(new t,this.material),this.points.frustumCulled=!1,this.scene.add(this.points),this.emphasisMaterial=new f({vertexShader:K,fragmentShader:q,uniforms:{uPointSize:{value:10*(window.devicePixelRatio||1)}},transparent:!0,depthTest:!1,depthWrite:!1}),this.emphasisPoints=new n(this.points.geometry,this.emphasisMaterial),this.emphasisPoints.frustumCulled=!1,this.overlayScene.add(this.emphasisPoints),this.lasso=new H(e,{shouldStart:e=>this.adapter?.isLassoStart(e)??!1,onComplete:(e,t,n)=>this.handleLasso(e,t,n)}),this.picker=new B(e,{isBlocked:()=>this.lasso.isDrawing(),pick:(e,t)=>this.pick(e,t),onHover:e=>this.callbacks.onHover?.(e)}),this.clicks=new z(e,{onClick:(e,t)=>this.handleClick(e,t)}),e.addEventListener(`dblclick`,()=>{this.adapter?.reset(),this.requestRender()},{signal:this.listeners.signal}),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.resize()}setData(n){let r=h(n,this.zCamera===null);this.cols=r;let i=new Float32Array(r.n*3);for(let e=0;e<r.n;e++)i[e*3]=r.xs[e],i[e*3+1]=r.ys[e],i[e*3+2]=r.zs[e];this.points.geometry.dispose();let a=new t;a.setAttribute(`position`,new e(i,3)),this.colorAttribute=new e(_(r,v),3),a.setAttribute(`color`,this.colorAttribute),this.emphasisMask=new Float32Array(r.n),this.emphasisAttribute=new e(this.emphasisMask,1).setUsage(p),a.setAttribute(`emphasis`,this.emphasisAttribute),this.visibleMask=null,this.visibleAttribute=new e(new Uint8Array(r.n).fill(1),1).setUsage(p),a.setAttribute(`visible`,this.visibleAttribute),a.boundingSphere=new o(new c(0,0,0),1),this.points.geometry=a,this.emphasisPoints.geometry=a,this.clearSelection(),this.ensureAdapter(r.hasZ),this.adapter?.setBounds(r,this.width,this.height),this.picker.reset(),this.requestRender(),this.callbacks.onSelection?.([])}setColors(e){let{cols:t,colorAttribute:n}=this;if(!t||!n)return;let r=e??_(t,v);if(r.length!==t.n*3)throw Error(`setColors expects ${t.n*3} floats (n·rgb), got ${r.length}`);n.array.set(r),n.needsUpdate=!0,this.requestRender()}setVisible(e){let{cols:t,visibleAttribute:n}=this;if(!t||!n)return;let r=e?e instanceof Uint8Array?e.length:e.ordinals.length:t.n;if(e&&r!==t.n)throw Error(`setVisible expects ${t.n} entries (one per point), got ${r}`);let i=n.array;if(e instanceof Uint8Array)i.set(e),this.visibleMask=i;else if(e){let{ordinals:t,ordinal:n}=e;for(let e=0;e<t.length;e++)i[e]=+(t[e]===n);this.visibleMask=i}else i.fill(1),this.visibleMask=null;if(this.adapter?.setFocus){let n=e?g(t,i):null;(!e||n)&&this.adapter.setFocus(n)}n.needsUpdate=!0,this.picker.viewChanged(),this.requestRender()}setSelected(e){this.applySelection(this.selection.writeHost(e))}clearSelection(){this.applySelection(this.selection.clear())}applySelection(e){let{cols:t,emphasisAttribute:n}=this;if(!(!t||!n)){if(this.emphasisMask.fill(0),e)for(let n=0;n<e.length;n++){let r=e[n];r>=0&&r<t.n&&(this.emphasisMask[r]=1)}this.hasSelection=e!==null,this.material.uniforms.uHasSelection.value=+!!this.hasSelection,n.needsUpdate=!0,this.requestRender()}}resetCamera(){this.adapter?.reset(),this.requestRender()}setInteractionMode(e){this.interactionMode=e,this.adapter?.setMode?.(e),this.applyCursor()}setRenderSettings(e){this.settings=e;let{mode:t,singleAlpha:n}=e,r=t===`opaque`;this.material.uniforms.uMode.value=t===`density`?1:r?2:0,this.material.blending=t===`density`?5:1,this.material.depthTest=r,this.material.depthWrite=r,this.material.uniforms.uOpacity.value=n,this.pipeline.applySettings(e),this.requestRender()}destroy(){this.disposed=!0,this.rafHandle!==null&&(cancelAnimationFrame(this.rafHandle),this.rafHandle=null),this.picker.destroy(),this.lasso.destroy(),this.clicks.destroy(),this.adapter?.destroy(),this.listeners.abort(),this.resizeObserver.disconnect(),this.points.geometry.dispose(),this.material.dispose(),this.emphasisMaterial.dispose(),this.pipeline.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.canvas.remove()}ensureAdapter(e){if(this.adapter&&this.adapterHasZ===e)return;this.adapter?.destroy();let t=()=>{this.requestRender(),this.picker.viewChanged(),this.callbacks.onCameraChange?.()};this.adapter=e&&this.zCamera?this.zCamera(this.container,t):new R(this.container,t),this.adapter.setMode?.(this.interactionMode),this.adapterHasZ=e,this.applyCursor()}applyCursor(){if(!this.adapter?.setMode){this.container.style.cursor=``;return}this.container.style.cursor=this.interactionMode===`select`?`crosshair`:`grab`}currentViewProjection(){let e=this.adapter?.camera;return e?(e.updateMatrixWorld(),this.viewProjection.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse).elements):null}projectPoint(e){let{cols:t}=this,n=this.currentViewProjection();return!t||!n?null:I(t,n,this.width,this.height,e)}pick(e,t){let{cols:n}=this,r=this.currentViewProjection();return!n||!r?null:L(n,r,this.width,this.height,e,t,14,this.visibleMask)}handleLasso(e,t,n){if(!e){this.handleClick(t,n);return}let{cols:r}=this,i=this.currentViewProjection();if(!r||!i)return;let a=F(r,i,this.width,this.height,e,this.visibleMask);a.length&&(this.applySelection(this.selection.writeLasso(a)),this.callbacks.onSelection?.(a,this.adapter?.toDataPolygon?.(e)??null))}handleClick(e,t){let n=this.pick(e,t);if(n&&this.callbacks.onPointClick){this.callbacks.onPointClick(n);return}this.applySelection(this.selection.writeLasso(null)),this.callbacks.onSelection?.([]),n||this.callbacks.onBackgroundClick?.()}resize(){let e=this.container.clientWidth||1,t=this.container.clientHeight||1;if(e===this.width&&t===this.height)return;this.width=e,this.height=t;let n=window.devicePixelRatio||1;this.renderer.setSize(e,t,!1),this.pipeline.setSize(Math.round(e*n),Math.round(t*n)),this.adapter?.resize(e,t),this.requestRender(),this.callbacks.onCameraChange?.()}requestRender(){this.renderQueued||this.disposed||(this.renderQueued=!0,this.rafHandle=requestAnimationFrame(()=>{this.rafHandle=null,this.renderQueued=!1,this.render()}))}render(){let e=this.adapter?.camera;e&&(this.pipeline.render(this.renderer,this.scene,e,this.settings.mode===`density`),this.hasSelection&&(this.renderer.autoClear=!1,this.renderer.render(this.overlayScene,e),this.renderer.autoClear=!0))}};export{Q as EmbeddingsChart};