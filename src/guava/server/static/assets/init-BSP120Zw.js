import{$ as e,A as t,C as n,D as r,E as i,I as a,N as o,O as s,P as c,T as l,V as u,Z as d,_ as f,b as p,bt as m,c as h,d as g,dt as ee,et as te,f as ne,g as _,gt as v,h as y,i as re,j as ie,k as ae,l as b,m as x,n as S,nt as oe,p as se,r as ce,rt as C,s as le,st as w,t as T,tt as E,u as ue,ut as D,v as O,w as k,xt as A}from"./colorToUniform-qHCz3N7z.js";import{a as j,c as de,g as M,i as fe,l as pe,n as me,r as he,s as ge,t as N}from"./CanvasTextGenerator-CXKctCuG.js";import{t as P}from"./CanvasPool-ltu76-t9.js";var F=class{static init(e){Object.defineProperty(this,"resizeTo",{set(e){globalThis.removeEventListener(`resize`,this.queueResize),this._resizeTo=e,e&&(globalThis.addEventListener(`resize`,this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&=(cancelAnimationFrame(this._resizeId),null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let e,t;if(this._resizeTo===globalThis.window)e=globalThis.innerWidth,t=globalThis.innerHeight;else{let{clientWidth:n,clientHeight:r}=this._resizeTo;e=n,t=r}this.renderer.resize(e,t),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener(`resize`,this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}};F.extension=m.Application;var I=class{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{set(e){this._ticker&&this._ticker.remove(this.render,this),this._ticker=e,e&&e.add(this.render,this,c.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?o.shared:new o,e.autoStart&&this.start()}static destroy(){if(this._ticker){let e=this._ticker;this.ticker=null,e.destroy()}}};I.extension=m.Application;var L=class{constructor(e){this._renderer=e}push(e,t,n){this._renderer.renderPipes.batch.break(n),n.add({renderPipeId:`filter`,canBundle:!1,action:`pushFilter`,container:t,filterEffect:e})}pop(e,t,n){this._renderer.renderPipes.batch.break(n),n.add({renderPipeId:`filter`,action:`popFilter`,canBundle:!1})}execute(e){e.action===`pushFilter`?this._renderer.filter.push(e):e.action===`popFilter`&&this._renderer.filter.pop()}destroy(){this._renderer=null}};L.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:`filter`};var R=new v;function _e(e,t){t.clear();let n=t.matrix;for(let n=0;n<e.length;n++){let r=e[n];if(r.globalDisplayStatus<7)continue;let i=r.renderGroup??r.parentRenderGroup;i?.isCachedAsTexture?t.matrix=R.copyFrom(i.textureOffsetInverseTransform).append(r.worldTransform):i?._parentCacheAsTextureRenderGroup?t.matrix=R.copyFrom(i._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(r.groupTransform):t.matrix=r.worldTransform,t.addBounds(r.bounds)}return t.matrix=n,t}var ve=new _({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:`float32x2`,stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])}),ye=class{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new E,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0}}},z=class{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new s({uInputSize:{value:new Float32Array(4),type:`vec4<f32>`},uInputPixel:{value:new Float32Array(4),type:`vec4<f32>`},uInputClamp:{value:new Float32Array(4),type:`vec4<f32>`},uOutputFrame:{value:new Float32Array(4),type:`vec4<f32>`},uGlobalFrame:{value:new Float32Array(4),type:`vec4<f32>`},uOutputTexture:{value:new Float32Array(4),type:`vec4<f32>`}}),this._globalFilterBindGroup=new r({}),this.renderer=e}get activeBackTexture(){return this._activeFilterData?.backTexture}push(e){let t=this.renderer,n=e.filterEffect.filters,r=this._pushFilterData();r.skip=!1,r.filters=n,r.container=e.container,r.outputRenderSurface=t.renderTarget.renderSurface;let i=t.renderTarget.renderTarget.colorTexture.source,a=i.resolution,o=i.antialias;if(n.length===0){r.skip=!0;return}let s=r.bounds;if(this._calculateFilterArea(e,s),this._calculateFilterBounds(r,t.renderTarget.rootViewPort,o,a,1),r.skip)return;let c=this._getPreviousFilterData(),l=this._findFilterResolution(a),u=0,d=0;c&&(u=c.bounds.minX,d=c.bounds.minY),this._calculateGlobalFrame(r,u,d,l,i.width,i.height),this._setupFilterTextures(r,s,t,c)}generateFilteredTexture({texture:e,filters:t}){let n=this._pushFilterData();this._activeFilterData=n,n.skip=!1,n.filters=t;let r=e.source,i=r.resolution,a=r.antialias;if(t.length===0)return n.skip=!0,e;let o=n.bounds;if(o.addRect(e.frame),this._calculateFilterBounds(n,o.rectangle,a,i,0),n.skip)return e;let s=i;this._calculateGlobalFrame(n,0,0,s,r.width,r.height),n.outputRenderSurface=u.getOptimalTexture(o.width,o.height,n.resolution,n.antialias),n.backTexture=C.EMPTY,n.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(n,!0);let c=n.outputRenderSurface;return c.source.alphaMode=`premultiplied-alpha`,c}pop(){let e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&u.returnTexture(t.backTexture),u.returnTexture(t.inputTexture))}getBackTexture(e,t,n){let r=e.colorTexture.source._resolution,i=u.getOptimalTexture(t.width,t.height,r,!1),a=t.minX,o=t.minY;n&&(a-=n.minX,o-=n.minY),a=Math.floor(a*r),o=Math.floor(o*r);let s=Math.ceil(t.width*r),c=Math.ceil(t.height*r);return this.renderer.renderTarget.copyToTexture(e,i,{x:a,y:o},{width:s,height:c},{x:0,y:0}),i}applyFilter(e,t,n,r){let i=this.renderer,a=this._activeFilterData,o=a.outputRenderSurface===n,s=i.renderTarget.rootRenderTarget.colorTexture.source._resolution,c=this._findFilterResolution(s),l=0,u=0;if(o){let e=this._findPreviousFilterOffset();l=e.x,u=e.y}this._updateFilterUniforms(t,n,a,l,u,c,o,r),this._setupBindGroupsAndRender(e,t,i)}calculateSpriteMatrix(e,t){let n=this._activeFilterData,r=e.set(n.inputTexture._source.width,0,0,n.inputTexture._source.height,n.bounds.minX,n.bounds.minY),i=t.worldTransform.copyTo(v.shared),a=t.renderGroup||t.parentRenderGroup;return a&&a.cacheToLocalTransform&&i.prepend(a.cacheToLocalTransform),i.invert(),r.prepend(i),r.scale(1/t.texture.orig.width,1/t.texture.orig.height),r.translate(t.anchor.x,t.anchor.y),r}destroy(){}_setupBindGroupsAndRender(e,t,n){if(n.renderPipes.uniformBatch){let e=n.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(e,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,n.encoder.draw({geometry:ve,shader:e,state:e._state,topology:`triangle-list`}),n.type===i.WEBGL&&n.renderTarget.finishRenderPass()}_setupFilterTextures(e,t,n,r){if(e.backTexture=C.EMPTY,e.inputTexture=u.getOptimalTexture(t.width,t.height,e.resolution,e.antialias),e.blendRequired){n.renderTarget.finishRenderPass();let i=n.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(i,t,r?.bounds)}n.renderTarget.bind(e.inputTexture,!0),n.globalUniforms.push({offset:t})}_calculateGlobalFrame(e,t,n,r,i,a){let o=e.globalFrame;o.x=t*r,o.y=n*r,o.width=i*r,o.height=a*r}_updateFilterUniforms(e,t,n,r,i,a,o,s){let c=this._filterGlobalUniforms.uniforms,l=c.uOutputFrame,u=c.uInputSize,d=c.uInputPixel,f=c.uInputClamp,p=c.uGlobalFrame,m=c.uOutputTexture;o?(l[0]=n.bounds.minX-r,l[1]=n.bounds.minY-i):(l[0]=0,l[1]=0),l[2]=e.frame.width,l[3]=e.frame.height,u[0]=e.source.width,u[1]=e.source.height,u[2]=1/u[0],u[3]=1/u[1],d[0]=e.source.pixelWidth,d[1]=e.source.pixelHeight,d[2]=1/d[0],d[3]=1/d[1],f[0]=.5*d[2],f[1]=.5*d[3],f[2]=e.frame.width*u[2]-.5*d[2],f[3]=e.frame.height*u[3]-.5*d[3];let h=this.renderer.renderTarget.rootRenderTarget.colorTexture;p[0]=r*a,p[1]=i*a,p[2]=h.source.width*a,p[3]=h.source.height*a,t instanceof C&&(t.source.resource=null);let g=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!s),t instanceof C?(m[0]=t.frame.width,m[1]=t.frame.height):(m[0]=g.width,m[1]=g.height),m[2]=g.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,n=this._filterStackIndex;for(;n>0;){n--;let r=this._filterStack[n];if(!r.skip){e=r.bounds.minX,t=r.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?_e(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){let n=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;n&&t.applyMatrix(n)}}_applyFiltersToTexture(e,t){let n=e.inputTexture,r=e.bounds,i=e.filters;if(this._globalFilterBindGroup.setResource(n.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),i.length===1)i[0].apply(this,n,e.outputRenderSurface,t);else{let n=e.inputTexture,a=u.getOptimalTexture(r.width,r.height,n.source._resolution,!1),o=a,s=0;for(s=0;s<i.length-1;++s){i[s].apply(this,n,o,!0);let e=n;n=o,o=e}i[s].apply(this,n,e.outputRenderSurface,t),u.returnTexture(a)}}_calculateFilterBounds(t,n,r,i,a){let o=this.renderer,s=t.bounds,c=t.filters,l=1/0,u=0,d=!0,f=!1,p=!1,m=!0;for(let t=0;t<c.length;t++){let n=c[t];if(l=Math.min(l,n.resolution===`inherit`?i:n.resolution),u+=n.padding,n.antialias===`off`?d=!1:n.antialias===`inherit`&&(d&&=r),n.clipToViewport||(m=!1),!(n.compatibleRenderers&o.type)){p=!1;break}if(n.blendRequired&&!(o.backBuffer?.useBackBuffer??!0)){e("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),p=!1;break}p=n.enabled||p,f||=n.blendRequired}if(!p){t.skip=!0;return}if(m&&s.fitBounds(0,n.width/i,0,n.height/i),s.scale(l).ceil().scale(1/l).pad((u|0)*a),!s.isPositive){t.skip=!0;return}t.antialias=d,t.resolution=l,t.blendRequired=f}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>0&&(t--,e=this._filterStack[t],e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||=this._filterStack[this._filterStackIndex]=new ye,this._filterStackIndex++,e}};z.extension={type:[m.WebGLSystem,m.WebGPUSystem],name:`filter`};var B=class e extends _{constructor(...t){let n=t[0]??{};n instanceof Float32Array&&(D(ee,`use new MeshGeometry({ positions, uvs, indices }) instead`),n={positions:n,uvs:t[1],indices:t[2]}),n={...e.defaultOptions,...n};let r=n.positions||new Float32Array([0,0,1,0,1,1,0,1]),i=n.uvs;i||=n.positions?new Float32Array(r.length):new Float32Array([0,0,1,0,1,1,0,1]);let a=n.indices||new Uint32Array([0,1,2,0,2,3]),o=n.shrinkBuffersToFit,s=new f({data:r,label:`attribute-mesh-positions`,shrinkToFit:o,usage:O.VERTEX|O.COPY_DST}),c=new f({data:i,label:`attribute-mesh-uvs`,shrinkToFit:o,usage:O.VERTEX|O.COPY_DST}),l=new f({data:a,label:`index-mesh-buffer`,shrinkToFit:o,usage:O.INDEX|O.COPY_DST});super({attributes:{aPosition:{buffer:s,format:`float32x2`,stride:8,offset:0},aUV:{buffer:c,format:`float32x2`,stride:8,offset:0}},indexBuffer:l,topology:n.topology}),this.batchMode=`auto`}get positions(){return this.attributes.aPosition.buffer.data}set positions(e){this.attributes.aPosition.buffer.data=e}get uvs(){return this.attributes.aUV.buffer.data}set uvs(e){this.attributes.aUV.buffer.data=e}get indices(){return this.indexBuffer.data}set indices(e){this.indexBuffer.data=e}};B.defaultOptions={topology:`triangle-list`,shrinkBuffersToFit:!1};var V=B,H=`http://www.w3.org/2000/svg`,U=`http://www.w3.org/1999/xhtml`,W=class{constructor(){this.svgRoot=document.createElementNS(H,`svg`),this.foreignObject=document.createElementNS(H,`foreignObject`),this.domElement=document.createElementNS(U,`div`),this.styleElement=document.createElementNS(U,`style`);let{foreignObject:e,svgRoot:t,styleElement:n,domElement:r}=this;e.setAttribute(`width`,`10000`),e.setAttribute(`height`,`10000`),e.style.overflow=`hidden`,t.appendChild(e),e.appendChild(n),e.appendChild(r),this.image=a.get().createImage()}destroy(){this.svgRoot.remove(),this.foreignObject.remove(),this.styleElement.remove(),this.domElement.remove(),this.image.src=``,this.image.remove(),this.svgRoot=null,this.foreignObject=null,this.styleElement=null,this.domElement=null,this.image=null,this.canvasAndContext=null}},be;function xe(e,t,n,r){r||=be||=new W;let{domElement:i,styleElement:a,svgRoot:o}=r;i.innerHTML=`<style>${t.cssStyle};</style><div style='padding:0'>${e}</div>`,i.setAttribute(`style`,`transform-origin: top left; display: inline-block`),n&&(a.textContent=n),document.body.appendChild(o);let s=i.getBoundingClientRect();o.remove();let c=t.padding*2;return{width:s.width-c,height:s.height-c}}var Se=class{constructor(){this.batches=[],this.batched=!1}destroy(){this.batches.forEach(e=>{d.return(e)}),this.batches.length=0}},G=class{constructor(e,t){this.state=k.for2d(),this.renderer=e,this._adaptor=t,this.renderer.runners.contextChange.add(this)}contextChange(){this._adaptor.contextChange(this.renderer)}validateRenderable(e){let t=e.context,n=!!e._gpuData,r=this.renderer.graphicsContext.updateGpuContext(t);return!!(r.isBatchable||n!==r.isBatchable)}addRenderable(e,t){let n=this.renderer.graphicsContext.updateGpuContext(e.context);e.didViewUpdate&&this._rebuild(e),n.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add(e))}updateRenderable(e){let t=this._getGpuDataForRenderable(e).batches;for(let e=0;e<t.length;e++){let n=t[e];n._batcher.updateElement(n)}}execute(e){if(!e.isRenderable)return;let t=this.renderer,n=e.context;if(!t.graphicsContext.getGpuContext(n).batches.length)return;let r=n.customShader||this._adaptor.shader;this.state.blendMode=e.groupBlendMode;let i=r.resources.localUniforms.uniforms;i.uTransformMatrix=e.groupTransform,i.uRound=t._roundPixels|e._roundPixels,T(e.groupColorAlpha,i.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){let t=this._getGpuDataForRenderable(e),n=this.renderer.graphicsContext.updateGpuContext(e.context);t.destroy(),n.isBatchable&&this._updateBatchesForRenderable(e,t)}_addToBatcher(e,t){let n=this.renderer.renderPipes.batch,r=this._getGpuDataForRenderable(e).batches;for(let e=0;e<r.length;e++){let i=r[e];n.addToBatch(i,t)}}_getGpuDataForRenderable(e){return e._gpuData[this.renderer.uid]||this._initGpuDataForRenderable(e)}_initGpuDataForRenderable(e){let t=new Se;return e._gpuData[this.renderer.uid]=t,t}_updateBatchesForRenderable(e,t){let n=e.context,r=this.renderer.graphicsContext.getGpuContext(n),i=this.renderer._roundPixels|e._roundPixels;t.batches=r.batches.map(t=>{let n=d.get(de);return t.copyTo(n),n.renderable=e,n.roundPixels=i,n})}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null}};G.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:`graphics`};var K=class e extends V{constructor(...e){super({});let t=e[0]??{};typeof t==`number`&&(D(ee,`PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead`),t={width:t,height:e[1],verticesX:e[2],verticesY:e[3]}),this.build(t)}build(t){t={...e.defaultOptions,...t},this.verticesX=this.verticesX??t.verticesX,this.verticesY=this.verticesY??t.verticesY,this.width=this.width??t.width,this.height=this.height??t.height;let n=this.verticesX*this.verticesY,r=[],i=[],a=[],o=this.verticesX-1,s=this.verticesY-1,c=this.width/o,l=this.height/s;for(let e=0;e<n;e++){let t=e%this.verticesX,n=e/this.verticesX|0;r.push(t*c,n*l),i.push(t/o,n/s)}let u=o*s;for(let e=0;e<u;e++){let t=e%o,n=e/o|0,r=n*this.verticesX+t,i=n*this.verticesX+t+1,s=(n+1)*this.verticesX+t,c=(n+1)*this.verticesX+t+1;a.push(r,i,s,i,c,s)}this.buffers[0].data=new Float32Array(r),this.buffers[1].data=new Float32Array(i),this.indexBuffer.data=new Uint32Array(a),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};K.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};var Ce=K,q=class{constructor(){this.batcherName=`default`,this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){let e=this.geometry.getBuffer(`aUV`),t=e.data,n=t,r=this.texture.textureMatrix;return r.isSimple||(n=this._transformedUvs,(this._textureMatrixUpdateId!==r._updateID||this._uvUpdateId!==e._updateID)&&((!n||n.length<t.length)&&(n=this._transformedUvs=new Float32Array(t.length)),this._textureMatrixUpdateId=r._updateID,this._uvUpdateId=e._updateID,r.multiplyUvs(t,n))),n}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}},J=class{destroy(){}},Y=class{constructor(e,t){this.localUniforms=new s({uTransformMatrix:{value:new v,type:`mat3x3<f32>`},uColor:{value:new Float32Array([1,1,1,1]),type:`vec4<f32>`},uRound:{value:0,type:`f32`}}),this.localUniformsBindGroup=new r({0:this.localUniforms}),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){let t=this._getMeshData(e),n=t.batched,r=e.batched;if(t.batched=r,n!==r)return!0;if(r){let n=e._geometry;if(n.indices.length!==t.indexSize||n.positions.length!==t.vertexSize)return t.indexSize=n.indices.length,t.vertexSize=n.positions.length,!0;let r=this._getBatchableMesh(e);return r.texture.uid!==e._texture.uid&&(r._textureMatrixUpdateId=-1),!r._batcher.checkAndUpdateTexture(r,e._texture)}return!1}addRenderable(e,t){let n=this.renderer.renderPipes.batch,r=this._getMeshData(e);if(e.didViewUpdate&&(r.indexSize=e._geometry.indices?.length,r.vertexSize=e._geometry.positions?.length),r.batched){let r=this._getBatchableMesh(e);r.setTexture(e._texture),r.geometry=e._geometry,n.addToBatch(r,t)}else n.break(t),t.add(e)}updateRenderable(e){if(e.batched){let t=this._getBatchableMesh(e);t.setTexture(e._texture),t.geometry=e._geometry,t._batcher.updateElement(t)}}execute(e){if(!e.isRenderable)return;e.state.blendMode=p(e.groupBlendMode,e.texture._source);let t=this.localUniforms;t.uniforms.uTransformMatrix=e.groupTransform,t.uniforms.uRound=this.renderer._roundPixels|e._roundPixels,t.update(),T(e.groupColorAlpha,t.uniforms.uColor,0),this._adaptor.execute(this,e)}_getMeshData(e){var t,n;return(t=e._gpuData)[n=this.renderer.uid]||(t[n]=new J),e._gpuData[this.renderer.uid].meshData||this._initMeshData(e)}_initMeshData(e){return e._gpuData[this.renderer.uid].meshData={batched:e.batched,indexSize:0,vertexSize:0},e._gpuData[this.renderer.uid].meshData}_getBatchableMesh(e){var t,n;return(t=e._gpuData)[n=this.renderer.uid]||(t[n]=new J),e._gpuData[this.renderer.uid].batchableMesh||this._initBatchableMesh(e)}_initBatchableMesh(e){let t=new q;return t.renderable=e,t.setTexture(e._texture),t.transform=e.groupTransform,t.roundPixels=this.renderer._roundPixels|e._roundPixels,e._gpuData[this.renderer.uid].batchableMesh=t,t}destroy(){this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}};Y.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:`mesh`};var we=class{execute(e,t){let n=e.state,r=e.renderer,i=t.shader||e.defaultShader;i.resources.uTexture=t.texture._source,i.resources.uniforms=e.localUniforms;let a=r.gl,o=e.getBuffers(t);r.shader.bind(i),r.state.set(n),r.geometry.bind(o.geometry,i.glProgram);let s=o.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?a.UNSIGNED_SHORT:a.UNSIGNED_INT;a.drawElements(a.TRIANGLES,t.particleChildren.length*6,s,0)}},Te=class{execute(e,t){let n=e.renderer,r=t.shader||e.defaultShader;r.groups[0]=n.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),r.groups[1]=n.texture.getTextureBindGroup(t.texture);let i=e.state,a=e.getBuffers(t);n.encoder.draw({geometry:a.geometry,shader:t.shader||e.defaultShader,state:i,size:t.particleChildren.length*6})}};function Ee(e,t=null){let n=e*6;if(n>65535?t||=new Uint32Array(n):t||=new Uint16Array(n),t.length!==n)throw Error(`Out buffer length is incorrect, got ${t.length} and expected ${n}`);for(let e=0,r=0;e<n;e+=6,r+=4)t[e+0]=r+0,t[e+1]=r+1,t[e+2]=r+2,t[e+3]=r+0,t[e+4]=r+2,t[e+5]=r+3;return t}function De(e){return{dynamicUpdate:Oe(e,!0),staticUpdate:Oe(e,!1)}}function Oe(e,n){let r=[];r.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let i=0;for(let a in e){let o=e[a];if(n!==o.dynamic)continue;r.push(`offset = index + ${i}`),r.push(o.code);let s=t(o.format);i+=s.stride/4}r.push(`
            index += stride * 4;
        }
    `),r.unshift(`
        var stride = ${i};
    `);let a=r.join(`
`);return Function(`ps`,`f32v`,`u32v`,a)}var ke=class{constructor(e){this._size=0,this._generateParticleUpdateCache={};let r=this._size=e.size??1e3,i=e.properties,a=0,o=0;for(let e in i){let n=i[e],r=t(n.format);n.dynamic?o+=r.stride:a+=r.stride}this._dynamicStride=o/4,this._staticStride=a/4,this.staticAttributeBuffer=new n(r*4*a),this.dynamicAttributeBuffer=new n(r*4*o),this.indexBuffer=Ee(r);let s=new _,c=0,l=0;this._staticBuffer=new f({data:new Float32Array(1),label:`static-particle-buffer`,shrinkToFit:!1,usage:O.VERTEX|O.COPY_DST}),this._dynamicBuffer=new f({data:new Float32Array(1),label:`dynamic-particle-buffer`,shrinkToFit:!1,usage:O.VERTEX|O.COPY_DST});for(let e in i){let n=i[e],r=t(n.format);n.dynamic?(s.addAttribute(n.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:c*4,format:n.format}),c+=r.size):(s.addAttribute(n.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:l*4,format:n.format}),l+=r.size)}s.addIndex(this.indexBuffer);let u=this.getParticleUpdate(i);this._dynamicUpload=u.dynamicUpdate,this._staticUpload=u.staticUpdate,this.geometry=s}getParticleUpdate(e){let t=Ae(e);return this._generateParticleUpdateCache[t]||(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e)),this._generateParticleUpdateCache[t]}generateParticleUpdate(e){return De(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new n(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new n(this._size*this._dynamicStride*4*4),this.indexBuffer=Ee(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));let r=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,r.float32View,r.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){let t=this.staticAttributeBuffer;this._staticUpload(e,t.float32View,t.uint32View),this._staticBuffer.setDataWithSize(t.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}};function Ae(e){let t=[];for(let n in e){let r=e[n];t.push(n,r.code,r.dynamic?`d`:`s`)}return t.join(`_`)}var je=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,Me=`attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;
}
`,Ne=`
struct ParticleUniforms {
  uTranslationMatrix:mat3x3<f32>,
  uColor:vec4<f32>,
  uRound:f32,
  uResolution:vec2<f32>,
};

fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
{
  return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   var position = vec4((uniforms.uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

   if(uniforms.uRound == 1.0) {
       position = vec4(roundPixels(position.xy, uniforms.uResolution), position.zw);
   }

    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;

  return VSOutput(
   position,
   aUV,
   vColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`,Pe=class extends l{constructor(){let e=ie.from({vertex:Me,fragment:je}),t=ae.from({fragment:{source:Ne,entryPoint:`mainFragment`},vertex:{source:Ne,entryPoint:`mainVertex`}});super({glProgram:e,gpuProgram:t,resources:{uTexture:C.WHITE.source,uSampler:new w({}),uniforms:{uTranslationMatrix:{value:new v,type:`mat3x3<f32>`},uColor:{value:new te(16777215),type:`vec4<f32>`},uRound:{value:1,type:`f32`},uResolution:{value:[0,0],type:`vec2<f32>`}}}})}},Fe=class{constructor(e,t){this.state=k.for2d(),this.localUniforms=new s({uTranslationMatrix:{value:new v,type:`mat3x3<f32>`},uColor:{value:new Float32Array(4),type:`vec4<f32>`},uRound:{value:1,type:`f32`},uResolution:{value:[0,0],type:`vec2<f32>`}}),this.renderer=e,this.adaptor=t,this.defaultShader=new Pe,this.state=k.for2d()}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new ke({size:e.particleChildren.length,properties:e._properties}),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){let t=e.particleChildren;if(t.length===0)return;let n=this.renderer,r=this.getBuffers(e);e.texture||=t[0].texture;let i=this.state;r.update(t,e._childrenDirty),e._childrenDirty=!1,i.blendMode=p(e.blendMode,e.texture._source);let a=this.localUniforms.uniforms,o=a.uTranslationMatrix;e.worldTransform.copyTo(o),o.prepend(n.globalUniforms.globalUniformData.projectionMatrix),a.uResolution=n.globalUniforms.globalUniformData.resolution,a.uRound=n._roundPixels|e._roundPixels,T(e.groupColorAlpha,a.uColor,0),this.adaptor.execute(this,e)}destroy(){this.renderer=null,this.defaultShader&&=(this.defaultShader.destroy(),null)}},Ie=class extends Fe{constructor(e){super(e,new we)}};Ie.extension={type:[m.WebGLPipes],name:`particle`};var Le=class extends Fe{constructor(e){super(e,new Te)}};Le.extension={type:[m.WebGPUPipes],name:`particle`};var Re=class e extends Ce{constructor(t={}){t={...e.defaultOptions,...t},super({width:t.width,height:t.height,verticesX:4,verticesY:4}),this.update(t)}update(e){this.width=e.width??this.width,this.height=e.height??this.height,this._originalWidth=e.originalWidth??this._originalWidth,this._originalHeight=e.originalHeight??this._originalHeight,this._leftWidth=e.leftWidth??this._leftWidth,this._rightWidth=e.rightWidth??this._rightWidth,this._topHeight=e.topHeight??this._topHeight,this._bottomHeight=e.bottomHeight??this._bottomHeight,this._anchorX=e.anchor?.x,this._anchorY=e.anchor?.y,this.updateUvs(),this.updatePositions()}updatePositions(){let e=this.positions,{width:t,height:n,_leftWidth:r,_rightWidth:i,_topHeight:a,_bottomHeight:o,_anchorX:s,_anchorY:c}=this,l=r+i,u=t>l?1:t/l,d=a+o,f=n>d?1:n/d,p=Math.min(u,f),m=s*t,h=c*n;e[0]=e[8]=e[16]=e[24]=-m,e[2]=e[10]=e[18]=e[26]=r*p-m,e[4]=e[12]=e[20]=e[28]=t-i*p-m,e[6]=e[14]=e[22]=e[30]=t-m,e[1]=e[3]=e[5]=e[7]=-h,e[9]=e[11]=e[13]=e[15]=a*p-h,e[17]=e[19]=e[21]=e[23]=n-o*p-h,e[25]=e[27]=e[29]=e[31]=n-h,this.getBuffer(`aPosition`).update()}updateUvs(){let e=this.uvs;e[0]=e[8]=e[16]=e[24]=0,e[1]=e[3]=e[5]=e[7]=0,e[6]=e[14]=e[22]=e[30]=1,e[25]=e[27]=e[29]=e[31]=1;let t=1/this._originalWidth,n=1/this._originalHeight;e[2]=e[10]=e[18]=e[26]=t*this._leftWidth,e[9]=e[11]=e[13]=e[15]=n*this._topHeight,e[4]=e[12]=e[20]=e[28]=1-t*this._rightWidth,e[17]=e[19]=e[21]=e[23]=1-n*this._bottomHeight,this.getBuffer(`aUV`).update()}};Re.defaultOptions={width:100,height:100,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10,originalWidth:100,originalHeight:100};var ze=Re,Be=class extends q{constructor(){super(),this.geometry=new ze}destroy(){this.geometry.destroy()}},Ve=class{constructor(e){this._renderer=e}addRenderable(e,t){let n=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,n),this._renderer.renderPipes.batch.addToBatch(n,t)}updateRenderable(e){let t=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,t),t._batcher.updateElement(t)}validateRenderable(e){let t=this._getGpuSprite(e);return!t._batcher.checkAndUpdateTexture(t,e._texture)}_updateBatchableSprite(e,t){t.geometry.update(e),t.setTexture(e._texture)}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){let t=e._gpuData[this._renderer.uid]=new Be,n=t;return n.renderable=e,n.transform=e.groupTransform,n.texture=e._texture,n.roundPixels=this._renderer._roundPixels|e._roundPixels,e.didViewUpdate||this._updateBatchableSprite(e,n),t}destroy(){this._renderer=null}};Ve.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:`nineSliceSprite`};var He={name:`tiling-bit`,vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            }

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},Ue={name:`tiling-bit`,vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;

        `,main:`
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0

        `}},We,Ge,Ke=class extends l{constructor(){We??=y({name:`tiling-sprite-shader`,bits:[ce,He,h]}),Ge??=x({name:`tiling-sprite-shader`,bits:[re,Ue,b]});let e=new s({uMapCoord:{value:new v,type:`mat3x3<f32>`},uClampFrame:{value:new Float32Array([0,0,1,1]),type:`vec4<f32>`},uClampOffset:{value:new Float32Array([0,0]),type:`vec2<f32>`},uTextureTransform:{value:new v,type:`mat3x3<f32>`},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:`vec4<f32>`}});super({glProgram:Ge,gpuProgram:We,resources:{localUniforms:new s({uTransformMatrix:{value:new v,type:`mat3x3<f32>`},uColor:{value:new Float32Array([1,1,1,1]),type:`vec4<f32>`},uRound:{value:0,type:`f32`}}),tilingUniforms:e,uTexture:C.EMPTY.source,uSampler:C.EMPTY.source.style}})}updateUniforms(e,t,n,r,i,a){let o=this.resources.tilingUniforms,s=a.width,c=a.height,l=a.textureMatrix,u=o.uniforms.uTextureTransform;u.set(n.a*s/e,n.b*s/t,n.c*c/e,n.d*c/t,n.tx/e,n.ty/t),u.invert(),o.uniforms.uMapCoord=l.mapCoord,o.uniforms.uClampFrame=l.uClampFrame,o.uniforms.uClampOffset=l.uClampOffset,o.uniforms.uTextureTransform=u,o.uniforms.uSizeAnchor[0]=e,o.uniforms.uSizeAnchor[1]=t,o.uniforms.uSizeAnchor[2]=r,o.uniforms.uSizeAnchor[3]=i,a&&(this.resources.uTexture=a.source,this.resources.uSampler=a.source.style)}},qe=class extends V{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}};function Je(e,t){let n=e.anchor.x,r=e.anchor.y;t[0]=-n*e.width,t[1]=-r*e.height,t[2]=(1-n)*e.width,t[3]=-r*e.height,t[4]=(1-n)*e.width,t[5]=(1-r)*e.height,t[6]=-n*e.width,t[7]=(1-r)*e.height}function Ye(e,t,n,r){let i=0,a=e.length/(t||2),o=r.a,s=r.b,c=r.c,l=r.d,u=r.tx,d=r.ty;for(n*=t;i<a;){let r=e[n],a=e[n+1];e[n]=o*r+c*a+u,e[n+1]=s*r+l*a+d,n+=t,i++}}function Xe(e,t){let n=e.texture,r=n.frame.width,i=n.frame.height,a=0,o=0;e.applyAnchorToTexture&&(a=e.anchor.x,o=e.anchor.y),t[0]=t[6]=-a,t[2]=t[4]=1-a,t[1]=t[3]=-o,t[5]=t[7]=1-o;let s=v.shared;s.copyFrom(e._tileTransform.matrix),s.tx/=e.width,s.ty/=e.height,s.invert(),s.scale(e.width/r,e.height/i),Ye(t,2,0,s)}var X=new qe,Ze=class{constructor(){this.canBatch=!0,this.geometry=new V({indices:X.indices.slice(),positions:X.positions.slice(),uvs:X.uvs.slice()})}destroy(){this.geometry.destroy(),this.shader?.destroy()}},Qe=class{constructor(e){this._state=k.default2d,this._renderer=e}validateRenderable(e){let t=this._getTilingSpriteData(e),n=t.canBatch;this._updateCanBatch(e);let r=t.canBatch;if(r&&r===n){let{batchableMesh:n}=t;return!n._batcher.checkAndUpdateTexture(n,e.texture)}return n!==r}addRenderable(e,t){let n=this._renderer.renderPipes.batch;this._updateCanBatch(e);let r=this._getTilingSpriteData(e),{geometry:i,canBatch:a}=r;if(a){r.batchableMesh||=new q;let a=r.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),a.geometry=i,a.renderable=e,a.transform=e.groupTransform,a.setTexture(e._texture)),a.roundPixels=this._renderer._roundPixels|e._roundPixels,n.addToBatch(a,t)}else n.break(t),r.shader||=new Ke,this.updateRenderable(e),t.add(e)}execute(e){let{shader:t}=this._getTilingSpriteData(e);t.groups[0]=this._renderer.globalUniforms.bindGroup;let n=t.resources.localUniforms.uniforms;n.uTransformMatrix=e.groupTransform,n.uRound=this._renderer._roundPixels|e._roundPixels,T(e.groupColorAlpha,n.uColor,0),this._state.blendMode=p(e.groupBlendMode,e.texture._source),this._renderer.encoder.draw({geometry:X,shader:t,state:this._state})}updateRenderable(e){let t=this._getTilingSpriteData(e),{canBatch:n}=t;if(n){let{batchableMesh:n}=t;e.didViewUpdate&&this._updateBatchableMesh(e),n._batcher.updateElement(n)}else if(e.didViewUpdate){let{shader:n}=t;n.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){let t=new Ze;return t.renderable=e,e._gpuData[this._renderer.uid]=t,t}_updateBatchableMesh(e){let{geometry:t}=this._getTilingSpriteData(e),n=e.texture.source.style;n.addressMode!==`repeat`&&(n.addressMode=`repeat`,n.update()),Xe(e,t.uvs),Je(e,t.positions)}destroy(){this._renderer=null}_updateCanBatch(e){let t=this._getTilingSpriteData(e),n=e.texture,r=!0;return this._renderer.type===i.WEBGL&&(r=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=n.textureMatrix.isSimple&&(r||n.source.isPowerOfTwo),t.canBatch}};Qe.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:`tilingSprite`};var $e={name:`local-uniform-msdf-bit`,vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:`
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `}},et={name:`local-uniform-msdf-bit`,vertex:{header:`
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `},fragment:{header:`
            uniform float uDistance;
         `,main:`
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `}},tt={name:`msdf-bit`,fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {

                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;

            }
        `}},nt={name:`msdf-bit`,fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {

                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);

                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);

                return coverage;
            }
        `}},rt,it,at=class extends l{constructor(e){let t=new s({uColor:{value:new Float32Array([1,1,1,1]),type:`vec4<f32>`},uTransformMatrix:{value:new v,type:`mat3x3<f32>`},uDistance:{value:4,type:`f32`},uRound:{value:0,type:`f32`}});rt??=y({name:`sdf-shader`,bits:[ne,ue(e),$e,tt,h]}),it??=x({name:`sdf-shader`,bits:[se,g(e),et,nt,b]}),super({glProgram:it,gpuProgram:rt,resources:{localUniforms:t,batchSamplers:le(e)}})}},ot=class extends me{destroy(){this.context.customShader&&this.context.customShader.destroy(),super.destroy()}},st=class{constructor(e){this._renderer=e}validateRenderable(e){let t=this._getGpuBitmapText(e);return this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){let n=this._getGpuBitmapText(e);ct(e,n),e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,n)),this._renderer.renderPipes.graphics.addRenderable(n,t),n.context.customShader&&this._updateDistanceField(e)}updateRenderable(e){let t=this._getGpuBitmapText(e);ct(e,t),this._renderer.renderPipes.graphics.updateRenderable(t),t.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){let{context:n}=t,r=he.getFont(e.text,e._style);n.clear(),r.distanceField.type!==`none`&&(n.customShader||=new at(this._renderer.limits.maxBatchableTextures));let i=pe.graphemeSegmenter(e.text),a=e._style,o=r.baseLineOffset,s=fe(i,a,r,!0),c=a.padding,l=s.scale,u=s.width,d=s.height+s.offsetY;a._stroke&&(u+=a._stroke.width/l,d+=a._stroke.width/l),n.translate(-e._anchor._x*u-c,-e._anchor._y*d-c).scale(l,l);let f=r.applyFillAsTint?a._fill.color:16777215,p=r.fontMetrics.fontSize,m=r.lineHeight;a.lineHeight&&(p=a.fontSize/l,m=a.lineHeight/l);let h=(m-p)/2;h-r.baseLineOffset<0&&(h=0);for(let e=0;e<s.lines.length;e++){let t=s.lines[e];for(let e=0;e<t.charPositions.length;e++){let i=t.chars[e],a=r.chars[i];if(a?.texture){let r=a.texture;n.texture(r,f||`black`,Math.round(t.charPositions[e]+a.xOffset),Math.round(o+a.yOffset+h),r.orig.width,r.orig.height)}}o+=m}}_getGpuBitmapText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){let t=new ot;return e._gpuData[this._renderer.uid]=t,this._updateContext(e,t),t}_updateDistanceField(e){let t=this._getGpuBitmapText(e).context,n=e._style.fontFamily,r=M.get(`${n}-bitmap`),{a:i,b:a,c:o,d:s}=e.groupTransform,c=Math.sqrt(i*i+a*a),l=Math.sqrt(o*o+s*s),u=(Math.abs(c)+Math.abs(l))/2,d=r.baseRenderedFontSize/e._style.fontSize,f=u*r.distanceField.range*(1/d);t.customShader.resources.localUniforms.uniforms.uDistance=f}destroy(){this._renderer=null}};st.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:`bitmapText`};function ct(e,t){t.groupTransform=e.groupTransform,t.groupColorAlpha=e.groupColorAlpha,t.groupColor=e.groupColor,t.groupBlendMode=e.groupBlendMode,t.globalDisplayStatus=e.globalDisplayStatus,t.groupTransform=e.groupTransform,t.localDisplayStatus=e.localDisplayStatus,t.groupAlpha=e.groupAlpha,t._roundPixels=e._roundPixels}var lt=class extends S{constructor(e){super(),this.generatingTexture=!1,this.currentKey=`--`,this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){let e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){let{htmlText:e}=this._renderer;e.getReferenceCount(this.currentKey)===null?e.returnTexturePromise(this.texturePromise):e.decreaseReferenceCount(this.currentKey),this._renderer.runners.resolutionChange.remove(this),this.texturePromise=null,this._renderer=null}};function Z(e,t){let{texture:n,bounds:r}=e,i=t._style._getFinalPadding();oe(r,t._anchor,n);let a=t._anchor._x*i*2,o=t._anchor._y*i*2;r.minX-=i-a,r.minY-=i-o,r.maxX-=i-a,r.maxY-=i-o}var ut=class{constructor(e){this._renderer=e}validateRenderable(e){let t=this._getGpuText(e),n=e.styleKey;return t.currentKey!==n}addRenderable(e,t){let n=this._getGpuText(e);if(e._didTextUpdate){let t=e._autoResolution?this._renderer.resolution:e.resolution;(n.currentKey!==e.styleKey||e.resolution!==t)&&this._updateGpuText(e).catch(e=>{console.error(e)}),e._didTextUpdate=!1,Z(n,e)}this._renderer.renderPipes.batch.addToBatch(n,t)}updateRenderable(e){let t=this._getGpuText(e);t._batcher.updateElement(t)}async _updateGpuText(e){e._didTextUpdate=!1;let t=this._getGpuText(e);if(t.generatingTexture)return;let n=t.texturePromise;t.texturePromise=null,t.generatingTexture=!0,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;let r=this._renderer.htmlText.getTexturePromise(e);n&&(r=r.finally(()=>{this._renderer.htmlText.decreaseReferenceCount(t.currentKey),this._renderer.htmlText.returnTexturePromise(n)})),t.texturePromise=r,t.currentKey=e.styleKey,t.texture=await r;let i=e.renderGroup||e.parentRenderGroup;i&&(i.structureDidChange=!0),t.generatingTexture=!1,Z(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){let t=new lt(this._renderer);return t.renderable=e,t.transform=e.groupTransform,t.texture=C.EMPTY,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}};ut.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:`htmlText`};function dt(){let{userAgent:e}=a.get().getNavigator();return/^((?!chrome|android).)*safari/i.test(e)}var ft=new E;function pt(e,t,n,r){let i=ft;i.minX=0,i.minY=0,i.maxX=e.width/r|0,i.maxY=e.height/r|0;let a=u.getOptimalTexture(i.width,i.height,r,!1);return a.source.uploadMethodId=`image`,a.source.resource=e,a.source.alphaMode=`premultiply-alpha-on-upload`,a.frame.width=t/r,a.frame.height=n/r,a.source.emit(`update`,a.source),a.updateUvs(),a}function mt(e,t){let n=t.fontFamily,r=[],i={},a=e.match(/font-family:([^;"\s]+)/g);function o(e){i[e]||(r.push(e),i[e]=!0)}if(Array.isArray(n))for(let e=0;e<n.length;e++)o(n[e]);else o(n);a&&a.forEach(e=>{o(e.split(`:`)[1].trim())});for(let e in t.tagStyles){let n=t.tagStyles[e].fontFamily;o(n)}return r}async function ht(e){let t=await(await a.get().fetch(e)).blob(),n=new FileReader;return await new Promise((e,r)=>{n.onloadend=()=>e(n.result),n.onerror=r,n.readAsDataURL(t)})}async function gt(e,t){let n=await ht(t);return`@font-face {
        font-family: "${e.fontFamily}";
        font-weight: ${e.fontWeight};
        font-style: ${e.fontStyle};
        src: url('${n}');
    }`}var Q=new Map;async function _t(e){let t=e.filter(e=>M.has(`${e}-and-url`)).map(e=>{if(!Q.has(e)){let{entries:t}=M.get(`${e}-and-url`),n=[];t.forEach(t=>{let r=t.url,i=t.faces.map(e=>({weight:e.weight,style:e.style}));n.push(...i.map(t=>gt({fontWeight:t.weight,fontStyle:t.style,fontFamily:e},r)))}),Q.set(e,Promise.all(n).then(e=>e.join(`
`)))}return Q.get(e)});return(await Promise.all(t)).join(`
`)}function vt(e,t,n,r,i){let{domElement:a,styleElement:o,svgRoot:s}=i;a.innerHTML=`<style>${t.cssStyle}</style><div style='padding:0;'>${e}</div>`,a.setAttribute(`style`,`transform: scale(${n});transform-origin: top left; display: inline-block`),o.textContent=r;let{width:c,height:l}=i.image;return s.setAttribute(`width`,c.toString()),s.setAttribute(`height`,l.toString()),new XMLSerializer().serializeToString(s)}function yt(e,t){let n=P.getOptimalCanvasAndContext(e.width,e.height,t),{context:r}=n;return r.clearRect(0,0,e.width,e.height),r.drawImage(e,0,0),n}function bt(e,t,n){return new Promise(async r=>{n&&await new Promise(e=>setTimeout(e,100)),e.onload=()=>{r()},e.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(t)}`,e.crossOrigin=`anonymous`})}var xt=class{constructor(e){this._activeTextures={},this._renderer=e,this._createCanvas=e.type===i.WEBGPU}getTexture(e){return this.getTexturePromise(e)}getManagedTexture(e){let t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].promise;let n=this._buildTexturePromise(e).then(e=>(this._activeTextures[t].texture=e,e));return this._activeTextures[t]={texture:null,promise:n,usageCount:1},n}getReferenceCount(e){return this._activeTextures[e]?.usageCount??null}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(t){let n=this._activeTextures[t];n&&(n.usageCount--,n.usageCount===0&&(n.texture?this._cleanUp(n.texture):n.promise.then(e=>{n.texture=e,this._cleanUp(n.texture)}).catch(()=>{e(`HTMLTextSystem: Failed to clean texture`)}),this._activeTextures[t]=null))}getTexturePromise(e){return this._buildTexturePromise(e)}async _buildTexturePromise(e){let{text:t,style:n,resolution:r,textureStyle:i}=e,a=d.get(W),o=mt(t,n),s=await _t(o),c=xe(t,n,s,a),l=Math.ceil(Math.ceil(Math.max(1,c.width)+n.padding*2)*r),u=Math.ceil(Math.ceil(Math.max(1,c.height)+n.padding*2)*r),f=a.image;f.width=(l|0)+2,f.height=(u|0)+2,await bt(f,vt(t,n,r,s,a),dt()&&o.length>0);let p=f,m;this._createCanvas&&(m=yt(f,r));let h=pt(m?m.canvas:p,f.width-2,f.height-2,r);return i&&(h.source.style=i),this._createCanvas&&(this._renderer.texture.initSource(h.source),P.returnCanvasAndContext(m)),d.return(a),h}returnTexturePromise(t){t.then(e=>{this._cleanUp(e)}).catch(()=>{e(`HTMLTextSystem: Failed to clean texture`)})}_cleanUp(e){u.returnTexture(e,!0),e.source.resource=null,e.source.uploadMethodId=`unknown`}destroy(){this._renderer=null;for(let e in this._activeTextures)this._activeTextures[e]&&this.returnTexturePromise(this._activeTextures[e].promise);this._activeTextures=null}};xt.extension={type:[m.WebGLSystem,m.WebGPUSystem,m.CanvasSystem],name:`htmlText`};var St=class extends S{constructor(e){super(),this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){let e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){let{canvasText:e}=this._renderer;e.getReferenceCount(this.currentKey)===null?e.returnTexture(this.texture):e.decreaseReferenceCount(this.currentKey),this._renderer.runners.resolutionChange.remove(this),this._renderer=null}},Ct=class{constructor(e){this._renderer=e}validateRenderable(e){let t=this._getGpuText(e),n=e.styleKey;return t.currentKey!==n||e._didTextUpdate}addRenderable(e,t){let n=this._getGpuText(e);if(e._didTextUpdate){let t=e._autoResolution?this._renderer.resolution:e.resolution;(n.currentKey!==e.styleKey||e.resolution!==t)&&this._updateGpuText(e),e._didTextUpdate=!1}this._renderer.renderPipes.batch.addToBatch(n,t)}updateRenderable(e){let t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){let t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey,Z(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){let t=new St(this._renderer);return t.currentKey=`--`,t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}};Ct.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:`text`};var $=class{constructor(e){this._activeTextures={},this._renderer=e}getTexture(e,t,n,r){typeof e==`string`&&(D(`8.0.0`,`CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments`),e={text:e,style:n,resolution:t}),e.style instanceof j||(e.style=new j(e.style)),e.textureStyle instanceof w||(e.textureStyle=new w(e.textureStyle)),typeof e.text!=`string`&&(e.text=e.text.toString());let{text:i,style:a,textureStyle:o}=e,s=e.resolution??this._renderer.resolution,{frame:c,canvasAndContext:l}=N.getCanvasAndContext({text:i,style:a,resolution:s}),u=pt(l.canvas,c.width,c.height,s);if(o&&(u.source.style=o),a.trim&&(c.pad(a.padding),u.frame.copyFrom(c),u.frame.scale(1/s),u.updateUvs()),a.filters){let e=this._applyFilters(u,a.filters);return this.returnTexture(u),N.returnCanvasAndContext(l),e}return this._renderer.texture.initSource(u._source),N.returnCanvasAndContext(l),u}returnTexture(e){let t=e.source;t.resource=null,t.uploadMethodId=`unknown`,t.alphaMode=`no-premultiply-alpha`,u.returnTexture(e,!0)}renderTextToCanvas(){D(`8.10.0`,`CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead`)}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;let t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;let n=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle});return this._activeTextures[t]={texture:n,usageCount:1},n}decreaseReferenceCount(e){let t=this._activeTextures[e];t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null)}getReferenceCount(e){return this._activeTextures[e]?.usageCount??null}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){let n=this._renderer.renderTarget.renderTarget,r=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(n,!1),r}destroy(){this._renderer=null;for(let e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}};$.extension={type:[m.WebGLSystem,m.WebGPUSystem,m.CanvasSystem],name:`canvasText`},A.add(F),A.add(I),A.add(G),A.add(ge),A.add(Y),A.add(Ie),A.add(Le),A.add($),A.add(Ct),A.add(st),A.add(xt),A.add(ut),A.add(Qe),A.add(Ve),A.add(z),A.add(L);