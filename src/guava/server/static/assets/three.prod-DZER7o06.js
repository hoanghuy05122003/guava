import{$ as e,$a as t,$i as n,$r as r,$t as i,A as a,Aa as o,Ar as s,C as c,Cr as l,Dt as u,E as d,Er as f,F as p,Fn as m,Fr as h,Ft as g,G as _,Ga as v,Gn as ee,Gt as y,H as te,Hi as ne,Hn as re,Ht as ie,Ii as ae,In as b,Kn as oe,Kt as se,L as ce,Ln as x,Lt as le,Mr as ue,Ni as de,O as fe,Or as S,Pi as pe,Pr as me,Q as he,Qi as ge,Qn as _e,Qr as C,Rt as ve,Sr as ye,St as be,U as w,Un as T,Ur as E,V as xe,Vn as Se,Wr as Ce,Xi as we,Ya as D,Yt as Te,_n as Ee,a as De,an as Oe,ar as ke,br as Ae,bt as je,ca as Me,co as Ne,dt as O,eo as k,er as Pe,fn as Fe,fr as Ie,ft as Le,gn as Re,gr as ze,ha as Be,hr as Ve,in as He,ir as Ue,j as We,jn as Ge,ka as Ke,kn as qe,kt as Je,mn as Ye,mt as Xe,no as Ze,nr as Qe,oa as $e,oo as et,pn as tt,pr as nt,pt as rt,qt as it,rr as A,sn as at,to as j,tr as ot,tt as st,ua as ct,ut as lt,vt as ut,yr as dt,zn as ft,zr as pt}from"./three.core-BZvQH57C.js";import{a as mt,n as ht,t as gt}from"./three.module-D-5NvbkG.js";import{n as _t,t as vt}from"./preload-helper-BQKl5FOV.js";_t();var yt=class{#e=new Map;#t=new Map;forKey(e){return this.#e.get(e)}forId(e){return this.#t.get(e)}setKey(e,t){this.#e.set(e,t)}setId(e,t){return this.#t.set(e,t)}delete(e){this.#e.delete(e.key),this.#t.delete(e.id)}deleteKey(e){this.#e.delete(e)}deleteId(e){this.#t.delete(e)}},bt=class{#e;useExtSplats=!1;#t=null;splatsExtendedData=null;#n=null;#r=null;#i=null;#a=null;#o=0;sh1Data=null;sh1Max=1;sh2Data=null;sh2Max=1;sh3Data=null;sh3Max=1;sh3ExtendedData=null;get key(){return this.#e??null}set key(e){this.store.deleteKey(this.key),(e||e===0)&&this.store.setKey(e,this),this.#e=e}set splats(e){this.#t=e}get splats(){return this.#t}set bounds(e){this.#n=e}get bounds(){return console.warn("`bounds` is deprecated, use `localBounds` instead"),this.#n}set localBounds(e){this.#r=e}get localBounds(){return this.#r}set lodIndex(e){this.#a=e}get lodIndex(){return this.#a}set paddingCount(e){this.#o=e}get paddingCount(){return this.#o}set transform(e){this.#i=e}get transform(){return this.#i}setSh1(e,t){this.sh1Data=e,this.sh1Max=t}setSh2(e,t){this.sh2Data=e,this.sh2Max=t}setSh3(e,t){this.sh3Data=e,this.sh3Max=t}dispose(){let e=this.#e;e?.dispose?.(),this.store.delete(this),this.#e=null,e?.dispose?.(),this.#t=null,this.splatsExtendedData=null,this.#n=null,this.#i=null,this.sh1Data=null,this.sh2Data=null,this.sh3Data=null,this.sh3ExtendedData=null,this.modelRoot?.lods?.delete(this)}constructor({id:e,modelRoot:t,lodStore:n}){Object.defineProperties(this,{id:{value:e},modelRoot:{value:t},store:{value:n}}),n.setId(e,this),t.add(this)}},xt=class{constructor({type:e,lod:t}){Object.defineProperties(this,{type:{value:e},lod:{value:t}})}},St=class e{static#e=new Map;static#t=new Map;static forKey(e){return this.#e.get(e)}static forId(e){return this.#t.get(e)}#n;get key(){return this.#n??null}set key(t){e.#e.delete(this.key),(t||t===0)&&e.#e.set(t,this),this.#n=t}#r=new Set;get lods(){return this.#r}#i;set transform(e){this.#i=e}get transform(){return this.#i}constructor({id:t,stream:n}){Object.defineProperties(this,{id:{value:t},stream:{value:n}}),e.#t.set(t,this),n.add(this)}add(e){this.#r.add(e)}dispose(){let t=[...this.#r];this.#r.clear();for(let e of t)e.dispose();e.#e.delete(this.key),e.#t.delete(this.id),this.#n=null}},Ct=class{static#e=new Map;static#t=1;static#n=0;static#r=2**32;static#i=0;static#a(e){this.#n=(this.#n+e)%this.#r}static#o(e){this.#n=(this.#n-e)%this.#r,this.#n<0&&(this.#n+=this.#r)}static getCheckSum(){return this.#n}static getConsecutiveIds(e){let t=this.#t;return this.#t+=e,t}static addWithId(e,t){this.#a(t),this.#e.set(t,e)}static add(e){let t=this.#t++;return this.addWithId(e,t),t}static get(e){let t=this.#e.get(e);if(t===void 0)throw Error(`Attribute with id ${e} not found in cache`);return t}static remove(e){if(Array.isArray(e))for(let t of e)this.#e.delete(t),this.#o(t);else this.#e.delete(e),this.#o(e)}static validateCheckSum(e){if(e!=this.getCheckSum()){let t=e-this.getCheckSum();t<0&&(t+=this.#r),t!=this.#i&&(console.error(`ID checksum mismatch between WASM and TypeScript sides! ${e} ${this.getCheckSum()}`),this.#i=t)}}},wt=class e extends EventTarget{static _idMap=new Map;static _keyMap=new Map;static forId(e){if(e)return this._idMap.get(e)}static forKey(e){return this._keyMap.get(e)}#e;#t=!1;#n={};#r=!1;_addVariantCollection(e){this.#n[e]||(this.#n[e]={id:e,children:[]})}_findAndAddToVariantSet(e,t){let n=r=>{if(!r)return!1;if(r.id===e)return r.children?r.children.push(t):t.type===`option`?(r.options||=[],r.options.push(t)):(r.nestedSets||=[],r.nestedSets.push(t)),!0;if(Array.isArray(r.children)){for(let e of r.children)if(n(e))return!0}if(Array.isArray(r.nestedSets)){for(let e of r.nestedSets)if(n(e))return!0}if(Array.isArray(r.options)){for(let e of r.options)if(n(e))return!0}return!1};for(let e of Object.values(this.#n))if(n(e))return}_addVariant(e,t){this._findAndAddToVariantSet(e,t)}_exportVariantHierarchies(){return Object.entries(this.#n).map(([e,t])=>({hierarchyId:Number(e),hierarchy:t}))}_setVariantSelection(e){this.client.setVariantSelection(e)}get key(){return this.#e??null}set key(t){this.#r?console.log(`[junk] Not setting key ${t} for prefetch-only stream`):(e._keyMap.delete(this.key),(t||t===0)&&e._keyMap.set(t,this),this.#e=t)}#i=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];get matrix(){return this.#i}set matrix(e){this.#i=e;let{engine:t,client:n}=this,r=t.malloc(4*this.#i.length);t.heapF32.set(Float32Array.from(this.#i),r/4),n.setSceneObjectTransform(this.id,r),t.free(r)}get boundingBox(){let{engine:e,client:t}=this,n=e.malloc(24);t.getWorldBoundingBox(this.id,n);let[r,i,a,o,s,c]=Float32Array.from(e.heapF32.subarray(n/4,n/4+6));if(r===void 0||i===void 0||a===void 0||o===void 0||s===void 0||c===void 0)return;let l={min:{x:r-o/2,y:i-s/2,z:a-c/2},max:{x:r+o/2,y:i+s/2,z:a+c/2},size:{x:o,y:s,z:c},center:{x:r,y:i,z:a}};return Object.freeze(l),l}#a=new Set;get modelRoots(){return new Set(this.#a)}get chunks(){return this.modelRoots}constructor(t){super();let{scene:n,uuid:r}=t;Object.defineProperties(this,{uuid:{value:r,enumerable:!0},scene:{value:n,enumerable:!0},client:{value:n.client,enumerable:!0},miris:{value:n.miris,enumerable:!0},engine:{value:n.miris.engine,enumerable:!0}}),this._initStream(t),e._idMap.set(this.id,this),n.add(this)}_initStream({uuid:e,prefetch:t=!1,prefetchMaxDepth:n=3,keepPrefetch:r=!1}){this.#r=t;let i=t?this.client.addPrefetchStreamById(e,e,n,r):this.client.addStreamById(e,e,!1);Object.defineProperty(this,"id",{value:i})}async _onStreamLoaded(){this.#t||=(this.dispatchEvent(new Event(`streamloaded`)),this.scene._onSceneLoaded(),!0)}_onRootLoaded(){this.dispatchEvent(new Event(`rootloaded`))}add(e){this.#a.add(e)}end(){console.log(`ending the stream`),this.client.removeStream(this.id);for(let e of this.#a)e.dispose();this.#a.clear(),e._idMap.delete(this.id),e._keyMap.delete(this.key),this.scene.streams.has(this)&&this.scene.delete(this)}},Tt,Et,Dt=(Ot=new URL(``+new URL(`AquaApi-DT3JGHyg.wasm`,import.meta.url).href,``+import.meta.url).href).includes(`/.vite/`)?Ot.replace(/\.vite\/[^?#]*/,()=>`node_modules/@miris-inc/core/dist/AquaApi.wasm`):Ot,Ot;function kt(e){return e.default||e}function At(...e){var t;return Tt||=(Et=fetch(Dt).then(e=>!e.ok||(e.headers.get(`content-type`)||``).includes(`text/html`)?null:e.arrayBuffer()).catch(()=>null),(t=(e=>e.includes(`/.vite/`)?new URL(`/node_modules/@miris-inc/core/dist/AquaApi.js`,e).href:e)(new URL(``+new URL(`AquaApi-BbLCbVmH.js`,import.meta.url).href,``+import.meta.url).href),vt(()=>import(t).then(e=>{let t=kt(e);if(typeof t==`function`)return t;throw Error(`bad module`)}),[],import.meta.url).catch(()=>fetch(t).then(e=>{if(!e.ok)throw Error(e.status+` `+t);return e.text()}).then(e=>{let t=URL.createObjectURL(new Blob([e],{type:`text/javascript`}));return vt(()=>import(t).then(e=>(URL.revokeObjectURL(t),kt(e))),[],import.meta.url)}))).catch(e=>{throw Tt=Et=void 0,e})),Promise.all([Tt,Et]).then(([t,n])=>{if(n){let[r={},...i]=e;return t({...r,wasmBinary:n},...i)}return t(...e)})}var jt=class e{static name=`thread`;static get Worker(){throw Error("Thread could not be initialized because no Worker was supplied. Do you forget to set `static Worker = Worker` on the child class?")}constructor({engine:t}){Object.defineProperty(this,"engine",{value:t,enumerable:!0}),Object.defineProperty(this,"ready",{enumerable:!0,value:new Promise(e=>{this.#i.set(0,async()=>{this.#n=!1,this.#i.delete(0),e(this)})})}),this.#r=new this.constructor.Worker({name:`decoder-${e.#t()}`}),this.#r.addEventListener(`message`,this.#s.bind(this))}static#e=0;static#t(){return this.#e+=1}#n=!0;get pending(){return this.#n}#r;#i=new Map;get pendingRequests(){return this.#i.size}get terminated(){return!this.#r}#a=0;#o(){return this.#a+=1}async _execute(e,...t){if(this.pending)throw Error(`Unable to execute ${e} because decoder has not yet been initialized`);if(!this.#r)throw Error(`Unable to execute ${e} because decoder has already been terminated`);return new Promise(n=>{if(!this.#r)throw Error(`Unable to execute ${e} because decoder has already been terminated`);let r=this.#o();this.#i.set(r,async e=>{this.#i.delete(r),n(e)});let i=t.filter(e=>e instanceof ArrayBuffer);this.#r.postMessage({id:r,action:e,args:t},i)})}#s({data:e}){e===`ready`&&(e={id:0,result:void 0});let{id:t,result:n}=e;this.#i.get(t)?.(n)}_postToWorker(e,t){this.#r?.postMessage(e,t??[])}terminate(){this.#r&&=(this.#r.terminate(),this.#r.removeEventListener(`message`,this.#s),null)}},Mt='const e={sparkPackedSplat:{elementsPerSplat:4,discard:!1},extendedPackedSplatLow:{elementsPerSplat:4,discard:!1},extendedPackedSplatHigh:{elementsPerSplat:4,discard:!1},packedSh1:{elementsPerSplat:2,discard:!1},packedSh2:{elementsPerSplat:4,discard:!1},packedSh3:{elementsPerSplat:4,discard:!1},sh1Extended:{elementsPerSplat:4,discard:!1},sh2Extended:{elementsPerSplat:4,discard:!1},sh3Extended_0:{elementsPerSplat:4,discard:!1},sh3Extended_1:{elementsPerSplat:4,discard:!1},splatterEllipsoids:{elementsPerSplat:12,discard:!1},splatterSphericalHarmonics:{elementsPerSplat:16,discard:!1}};function t(t,r,n){const a=e[t];if(void 0===a)throw new Error("attribute name"+t+" is unknown");const i=n.length,o=(s=i,u=2048*a.elementsPerSplat,Math.ceil(s/u)*u);var s,u;const c=new Uint32Array(o);return c.set(n),{paddedData:c,originalSize:i,id:r}}const{wasmBinary:r}=await new Promise(e=>{self.addEventListener("message",function t(r){"wasm-init"===r.data?.type&&(self.removeEventListener("message",t),e(r.data))})});if(!r)throw new Error("Decoder worker did not receive WASM binary. The main thread failed to fetch aqua-parser.wasm.");const n=await async function(e={}){var t,r,n=e,a="./this.program",i=(e,t)=>{throw t},o=import.meta.url,s="";try{s=new URL(".",o).href}catch{}r=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)},t=async e=>{var t=await fetch(e,{credentials:"same-origin"});if(t.ok)return t.arrayBuffer();throw new Error(t.status+" : "+t.url)};var u,c,l,p,d,f,h,v,m,y,g,_,w,$,b,T,P=console.log.bind(console),C=console.error.bind(console),k=!1,S=!1;function F(){var e=d.buffer;n.HEAP8=f=new Int8Array(e),v=new Int16Array(e),n.HEAPU8=h=new Uint8Array(e),m=new Uint16Array(e),n.HEAP32=y=new Int32Array(e),n.HEAPU32=g=new Uint32Array(e),n.HEAPF32=_=new Float32Array(e),n.HEAPF64=w=new Float64Array(e),$=new BigInt64Array(e),b=new BigUint64Array(e)}function A(e){n.onAbort?.(e),C(e="Aborted("+e+")"),k=!0,e+=". Build with -sASSERTIONS for more info.";var t=new WebAssembly.RuntimeError(e);throw p?.(t),t}function D(){return n.locateFile?(e="aqua-parser.wasm",n.locateFile?n.locateFile(e,s):s+e):"";var e}async function W(e){if(!u)try{var n=await t(e);return new Uint8Array(n)}catch{}return function(e){if(e==T&&u)return new Uint8Array(u);if(r)return r(e);throw"both async and sync fetching of the wasm failed"}(e)}async function E(e,t,r){if(!e)try{var n=fetch(t,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(n,r)}catch(a){C(`wasm streaming compile failed: ${a}`),C("falling back to ArrayBuffer instantiation")}return async function(e,t){try{var r=await W(e);return await WebAssembly.instantiate(r,t)}catch(n){C(`failed to asynchronously prepare wasm: ${n}`),A(n)}}(t,r)}class x{name="ExitStatus";constructor(e){this.message=`Program terminated with exit(${e})`,this.status=e}}var O=e=>{for(;e.length>0;)e.shift()(n)},R=[],j=e=>R.push(e),U=[],H=e=>U.push(e),I=!0,V=e=>Ne(e),B=()=>Ye(),M=[],q=0,L=0;class z{constructor(e){this.excPtr=e,this.ptr=e-24}set_type(e){g[this.ptr+4>>2]=e}get_type(){return g[this.ptr+4>>2]}set_destructor(e){g[this.ptr+8>>2]=e}get_destructor(){return g[this.ptr+8>>2]}set_caught(e){e=e?1:0,f[this.ptr+12]=e}get_caught(){return 0!=f[this.ptr+12]}set_rethrown(e){e=e?1:0,f[this.ptr+13]=e}get_rethrown(){return 0!=f[this.ptr+13]}init(e,t){this.set_adjusted_ptr(0),this.set_type(e),this.set_destructor(t)}set_adjusted_ptr(e){g[this.ptr+16>>2]=e}get_adjusted_ptr(){return g[this.ptr+16>>2]}}var N=e=>ze(e),J=e=>{var t=L;if(!t)return N(0),0;var r=new z(t);r.set_adjusted_ptr(t);var n=r.get_type();if(!n)return N(0),t;for(var a of e){if(0===a||a===n)break;var i=r.ptr+16;if(Ze(a,n,i))return N(a),t}return N(n),t},Y=e=>{for(var t="";;){var r=h[e++];if(!r)return t;t+=String.fromCharCode(r)}},G={},X={},Z={},K=class extends Error{constructor(e){super(e),this.name="BindingError"}},Q=e=>{throw new K(e)};function ee(e,t,r={}){return function(e,t,r={}){var n=t.name;if(e||Q(`type "${n}" must have a positive integer typeid pointer`),X.hasOwnProperty(e)){if(r.ignoreDuplicateRegistrations)return;Q(`Cannot register type \'${n}\' twice`)}if(X[e]=t,delete Z[e],G.hasOwnProperty(e)){var a=G[e];delete G[e],a.forEach(e=>e())}}(e,t,r)}var te=(e,t,r)=>{switch(t){case 1:return r?e=>f[e]:e=>h[e];case 2:return r?e=>v[e>>1]:e=>m[e>>1];case 4:return r?e=>y[e>>2]:e=>g[e>>2];case 8:return r?e=>$[e>>3]:e=>b[e>>3];default:throw new TypeError(`invalid integer width (${t}): ${e}`)}},re=e=>({count:e.count,deleteScheduled:e.deleteScheduled,preservePointerOnDelete:e.preservePointerOnDelete,ptr:e.ptr,ptrType:e.ptrType,smartPtr:e.smartPtr,smartPtrType:e.smartPtrType}),ne=e=>{Q(e.$$.ptrType.registeredClass.name+" instance already deleted")},ae=!1,ie=e=>{},oe=e=>{e.count.value-=1,0===e.count.value&&(e=>{e.smartPtr?e.smartPtrType.rawDestructor(e.smartPtr):e.ptrType.registeredClass.rawDestructor(e.ptr)})(e)},se=e=>typeof FinalizationRegistry>"u"?(se=e=>e,e):(ae=new FinalizationRegistry(e=>{oe(e.$$)}),ie=e=>ae.unregister(e),(se=e=>{var t=e.$$;if(!!t.smartPtr){var r={$$:t};ae.register(e,r,e)}return e})(e));function ue(){}var ce=(e,t)=>Object.defineProperty(t,"name",{value:e}),le={},pe=(e,t,r)=>{if(void 0===e[t].overloadTable){var n=e[t];e[t]=function(...n){return e[t].overloadTable.hasOwnProperty(n.length)||Q(`Function \'${r}\' called with an invalid number of arguments (${n.length}) - expects one of (${e[t].overloadTable})!`),e[t].overloadTable[n.length].apply(this,n)},e[t].overloadTable=[],e[t].overloadTable[n.argCount]=n}},de=(e,t,r)=>{n.hasOwnProperty(e)?((void 0===r||void 0!==n[e].overloadTable&&void 0!==n[e].overloadTable[r])&&Q(`Cannot register public name \'${e}\' twice`),pe(n,e,e),n[e].overloadTable.hasOwnProperty(r)&&Q(`Cannot register multiple overloads of a function with the same number of arguments (${r})!`),n[e].overloadTable[r]=t):(n[e]=t,n[e].argCount=r)};function fe(e,t,r,n,a,i,o,s){this.name=e,this.constructor=t,this.instancePrototype=r,this.rawDestructor=n,this.baseClass=a,this.getActualType=i,this.upcast=o,this.downcast=s,this.pureVirtualFunctions=[]}var he=(e,t,r)=>{for(;t!==r;)t.upcast||Q(`Expected null or instance of ${r.name}, got an instance of ${t.name}`),e=t.upcast(e),t=t.baseClass;return e},ve=e=>{if(null===e)return"null";var t=typeof e;return"object"===t||"array"===t||"function"===t?e.toString():""+e};function me(e,t){if(null===t)return this.isReference&&Q(`null is not a valid ${this.name}`),0;t.$$||Q(`Cannot pass "${ve(t)}" as a ${this.name}`),t.$$.ptr||Q(`Cannot pass deleted object as a pointer of type ${this.name}`);var r=t.$$.ptrType.registeredClass;return he(t.$$.ptr,r,this.registeredClass)}function ye(e,t){var r;if(null===t)return this.isReference&&Q(`null is not a valid ${this.name}`),this.isSmartPointer?(r=this.rawConstructor(),null!==e&&e.push(this.rawDestructor,r),r):0;(!t||!t.$$)&&Q(`Cannot pass "${ve(t)}" as a ${this.name}`),t.$$.ptr||Q(`Cannot pass deleted object as a pointer of type ${this.name}`),!this.isConst&&t.$$.ptrType.isConst&&Q(`Cannot convert argument of type ${t.$$.smartPtrType?t.$$.smartPtrType.name:t.$$.ptrType.name} to parameter type ${this.name}`);var n=t.$$.ptrType.registeredClass;if(r=he(t.$$.ptr,n,this.registeredClass),this.isSmartPointer)switch(void 0===t.$$.smartPtr&&Q("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:t.$$.smartPtrType===this?r=t.$$.smartPtr:Q(`Cannot convert argument of type ${t.$$.smartPtrType?t.$$.smartPtrType.name:t.$$.ptrType.name} to parameter type ${this.name}`);break;case 1:r=t.$$.smartPtr;break;case 2:if(t.$$.smartPtrType===this)r=t.$$.smartPtr;else{var a=t.clone();r=this.rawShare(r,it.toHandle(()=>a.delete())),null!==e&&e.push(this.rawDestructor,r)}break;default:Q("Unsupporting sharing policy")}return r}function ge(e,t){if(null===t)return this.isReference&&Q(`null is not a valid ${this.name}`),0;t.$$||Q(`Cannot pass "${ve(t)}" as a ${this.name}`),t.$$.ptr||Q(`Cannot pass deleted object as a pointer of type ${this.name}`),t.$$.ptrType.isConst&&Q(`Cannot convert argument of type ${t.$$.ptrType.name} to parameter type ${this.name}`);var r=t.$$.ptrType.registeredClass;return he(t.$$.ptr,r,this.registeredClass)}function _e(e){return this.fromWireType(g[e>>2])}var we=(e,t,r)=>{if(t===r)return e;if(void 0===r.baseClass)return null;var n=we(e,t,r.baseClass);return null===n?null:r.downcast(n)},$e={},be=(e,t)=>(t=((e,t)=>{for(void 0===t&&Q("ptr should not be undefined");e.baseClass;)t=e.upcast(t),e=e.baseClass;return t})(e,t),$e[t]),Te=class extends Error{constructor(e){super(e),this.name="InternalError"}},Pe=e=>{throw new Te(e)},Ce=(e,t)=>((!t.ptrType||!t.ptr)&&Pe("makeClassHandle requires ptr and ptrType"),!!t.smartPtrType!==!!t.smartPtr&&Pe("Both smartPtrType and smartPtr must be specified"),t.count={value:1},se(Object.create(e,{$$:{value:t,writable:!0}})));function ke(e){var t=this.getPointee(e);if(!t)return this.destructor(e),null;var r=be(this.registeredClass,t);if(void 0!==r){if(0===r.$$.count.value)return r.$$.ptr=t,r.$$.smartPtr=e,r.clone();var n=r.clone();return this.destructor(e),n}function a(){return this.isSmartPointer?Ce(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:t,smartPtrType:this,smartPtr:e}):Ce(this.registeredClass.instancePrototype,{ptrType:this,ptr:e})}var i,o=this.registeredClass.getActualType(t),s=le[o];if(!s)return a.call(this);i=this.isConst?s.constPointerType:s.pointerType;var u=we(t,this.registeredClass,i.registeredClass);return null===u?a.call(this):this.isSmartPointer?Ce(i.registeredClass.instancePrototype,{ptrType:i,ptr:u,smartPtrType:this,smartPtr:e}):Ce(i.registeredClass.instancePrototype,{ptrType:i,ptr:u})}function Se(e,t,r,n,a,i,o,s,u,c,l){this.name=e,this.registeredClass=t,this.isReference=r,this.isConst=n,this.isSmartPointer=a,this.pointeeType=i,this.sharingPolicy=o,this.rawGetPointee=s,this.rawConstructor=u,this.rawShare=c,this.rawDestructor=l,a||void 0!==t.baseClass?this.toWireType=ye:n?(this.toWireType=me,this.destructorFunction=null):(this.toWireType=ge,this.destructorFunction=null)}var Fe,Ae=(e,t,r)=>{n.hasOwnProperty(e)||Pe("Replacing nonexistent public symbol"),void 0!==n[e].overloadTable&&void 0!==r?n[e].overloadTable[r]=t:(n[e]=t,n[e].argCount=r)},De=[],We=e=>{var t=De[e];return t||(De[e]=t=Fe.get(e)),t},Ee=(e,t,r=!1)=>{e=Y(e);var n=We(t);return"function"!=typeof n&&Q(`unknown function pointer with signature ${e}: ${t}`),n};class xe extends Error{}var Oe=e=>{var t=Ve(e),r=Y(t);return Me(t),r},Re=(e,t)=>{var r=[],n={};throw t.forEach(function e(t){if(!n[t]&&!X[t]){if(Z[t])return void Z[t].forEach(e);r.push(t),n[t]=!0}}),new xe(`${e}: `+r.map(Oe).join([", "]))},je=(e,t,r)=>{function n(t){var n=r(t);n.length!==e.length&&Pe("Mismatched type converter count");for(var a=0;a<e.length;++a)ee(e[a],n[a])}e.forEach(e=>Z[e]=t);var a=new Array(t.length),i=[],o=0;t.forEach((e,t)=>{X.hasOwnProperty(e)?a[t]=X[e]:(i.push(e),G.hasOwnProperty(e)||(G[e]=[]),G[e].push(()=>{a[t]=X[e],++o===i.length&&n(a)}))}),0===i.length&&n(a)},Ue=e=>{for(;e.length;){var t=e.pop();e.pop()(t)}};function He(e){for(var t=1;t<e.length;++t)if(null!==e[t]&&void 0===e[t].destructorFunction)return!0;return!1}function Ie(e,t,r,n,a,i){var o=t.length;o<2&&Q("argTypes array size mismatch! Must at least get return value and \'this\' types!");for(var s=null!==t[1]&&null!==r,u=He(t),c=!t[0].isVoid,l=t[0],p=t[1],d=[e,Q,n,a,Ue,l.fromWireType.bind(l),p?.toWireType.bind(p)],f=2;f<o;++f){var h=t[f];d.push(h.toWireType.bind(h))}if(!u)for(f=s?1:2;f<t.length;++f)null!==t[f].destructorFunction&&d.push(t[f].destructorFunction);var v=function(e,t,r,n){var a=He(e),i=e.length-2,o=[],s=["fn"];t&&s.push("thisWired");for(var u=0;u<i;++u)o.push(`arg${u}`),s.push(`arg${u}Wired`);o=o.join(","),s=s.join(",");var c=`return function (${o}) {\\n`;a&&(c+="var destructors = [];\\n");var l=a?"destructors":"null",p=["humanName","throwBindingError","invoker","fn","runDestructors","fromRetWire","toClassParamWire"];for(t&&(c+=`var thisWired = toClassParamWire(${l}, this);\\n`),u=0;u<i;++u){var d=`toArg${u}Wire`;c+=`var arg${u}Wired = ${d}(${l}, arg${u});\\n`,p.push(d)}if(c+=(r||n?"var rv = ":"")+`invoker(${s});\\n`,a)c+="runDestructors(destructors);\\n";else for(u=t?1:2;u<e.length;++u){var f=1===u?"thisWired":"arg"+(u-2)+"Wired";null!==e[u].destructorFunction&&(c+=`${f}_dtor(${f});\\n`,p.push(`${f}_dtor`))}return r&&(c+="var ret = fromRetWire(rv);\\nreturn ret;\\n"),c+="}\\n",new Function(p,c)}(t,s,c,i)(...d);return ce(e,v)}var Ve,Be,Me,qe,Le,ze,Ne,Je,Ye,Ge,Xe,Ze,Ke,Qe=(e,t)=>{for(var r=[],n=0;n<e;n++)r.push(g[t+4*n>>2]);return r},et=e=>{const t=(e=e.trim()).indexOf("(");return-1===t?e:e.slice(0,t)},tt=(e,t,r)=>(e instanceof Object||Q(`${r} with invalid "this": ${e}`),e instanceof t.registeredClass.constructor||Q(`${r} incompatible with "this" of type ${e.constructor.name}`),e.$$.ptr||Q(`cannot call emscripten binding method ${r} on deleted object`),he(e.$$.ptr,e.$$.ptrType.registeredClass,t.registeredClass)),rt=[],nt=[0,1,,1,null,1,!0,1,!1,1],at=e=>{e>9&&0===--nt[e+1]&&(nt[e]=void 0,rt.push(e))},it={toValue:e=>(e||Q(`Cannot use deleted val. handle = ${e}`),nt[e]),toHandle:e=>{switch(e){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:{const t=rt.pop()||nt.length;return nt[t]=e,nt[t+1]=1,t}}}},ot={name:"emscripten::val",fromWireType:e=>{var t=it.toValue(e);return at(e),t},toWireType:(e,t)=>it.toHandle(t),readValueFromPointer:_e,destructorFunction:null},st=(e,t,r)=>{switch(t){case 1:return r?function(e){return this.fromWireType(f[e])}:function(e){return this.fromWireType(h[e])};case 2:return r?function(e){return this.fromWireType(v[e>>1])}:function(e){return this.fromWireType(m[e>>1])};case 4:return r?function(e){return this.fromWireType(y[e>>2])}:function(e){return this.fromWireType(g[e>>2])};default:throw new TypeError(`invalid integer width (${t}): ${e}`)}},ut=(e,t)=>{var r=X[e];return void 0===r&&Q(`${t} has unknown type ${Oe(e)}`),r},ct=(e,t)=>{switch(t){case 4:return function(e){return this.fromWireType(_[e>>2])};case 8:return function(e){return this.fromWireType(w[e>>3])};default:throw new TypeError(`invalid float width (${t}): ${e}`)}},lt=(e,t,r)=>((e,t,r,n)=>{if(!(n>0))return 0;for(var a=r,i=r+n-1,o=0;o<e.length;++o){var s=e.codePointAt(o);if(s<=127){if(r>=i)break;t[r++]=s}else if(s<=2047){if(r+1>=i)break;t[r++]=192|s>>6,t[r++]=128|63&s}else if(s<=65535){if(r+2>=i)break;t[r++]=224|s>>12,t[r++]=128|s>>6&63,t[r++]=128|63&s}else{if(r+3>=i)break;t[r++]=240|s>>18,t[r++]=128|s>>12&63,t[r++]=128|s>>6&63,t[r++]=128|63&s,o++}}return t[r]=0,r-a})(e,h,t,r),pt=e=>{for(var t=0,r=0;r<e.length;++r){var n=e.charCodeAt(r);n<=127?t++:n<=2047?t+=2:n>=55296&&n<=57343?(t+=4,++r):t+=3}return t},dt=typeof TextDecoder<"u"?new TextDecoder:void 0,ft=(e,t,r,n)=>{var a=t+r;if(n)return a;for(;e[t]&&!(t>=a);)++t;return t},ht=(e,t=0,r,n)=>{var a=ft(e,t,r,n);if(a-t>16&&e.buffer&&dt)return dt.decode(e.subarray(t,a));for(var i="";t<a;){var o=e[t++];if(128&o){var s=63&e[t++];if(192!=(224&o)){var u=63&e[t++];if((o=224==(240&o)?(15&o)<<12|s<<6|u:(7&o)<<18|s<<12|u<<6|63&e[t++])<65536)i+=String.fromCharCode(o);else{var c=o-65536;i+=String.fromCharCode(55296|c>>10,56320|1023&c)}}else i+=String.fromCharCode((31&o)<<6|s)}else i+=String.fromCharCode(o)}return i},vt=(e,t,r)=>e?ht(h,e,t,r):"",mt=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,yt=(e,t,r)=>{var n=e>>1,a=ft(m,n,t/2,r);if(a-n>16&&mt)return mt.decode(m.subarray(n,a));for(var i="",o=n;o<a;++o){var s=m[o];i+=String.fromCharCode(s)}return i},gt=(e,t,r)=>{if(r??=2147483647,r<2)return 0;for(var n=t,a=(r-=2)<2*e.length?r/2:e.length,i=0;i<a;++i){var o=e.charCodeAt(i);v[t>>1]=o,t+=2}return v[t>>1]=0,t-n},_t=e=>2*e.length,wt=(e,t,r)=>{for(var n="",a=e>>2,i=0;!(i>=t/4);i++){var o=g[a+i];if(!o&&!r)break;n+=String.fromCodePoint(o)}return n},$t=(e,t,r)=>{if(r??=2147483647,r<4)return 0;for(var n=t,a=n+r-4,i=0;i<e.length;++i){var o=e.codePointAt(i);if(o>65535&&i++,y[t>>2]=o,(t+=4)+4>a)break}return y[t>>2]=0,t-n},bt=e=>{for(var t=0,r=0;r<e.length;++r){e.codePointAt(r)>65535&&r++,t+=4}return t},Tt=0,Pt=[],Ct=(e,t,r)=>{var n=[],a=e(n,r);return n.length&&(g[t>>2]=it.toHandle(n)),a},kt={},St=e=>{var t=kt[e];return void 0===t?Y(e):t},Ft=e=>e<-9007199254740992||e>9007199254740992?NaN:Number(e),At=[0,31,60,91,121,152,182,213,244,274,305,335],Dt=[0,31,59,90,120,151,181,212,243,273,304,334],Wt={},Et=e=>{if(e instanceof x||"unwind"==e)return c;i(0,e)},xt=()=>I||Tt>0,Ot=e=>{c=e,xt()||(n.onExit?.(e),k=!0),i(0,new x(e))},Rt=(e,t)=>{c=e,Ot(e)},jt=e=>{if(!k)try{e(),(()=>{if(!xt())try{Rt(c)}catch(e){Et(e)}})()}catch(t){Et(t)}},Ut=()=>performance.now(),Ht=(e,t)=>Math.ceil(e/t)*t,It=e=>{var t=(e-d.buffer.byteLength+65535)/65536|0;try{return d.grow(t),F(),1}catch{}},Vt={},Bt=()=>{if(!Bt.strings){var e={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"==typeof navigator&&navigator.language||"C").replace("-","_")+".UTF-8",_:a||"./this.program"};for(var t in Vt)void 0===Vt[t]?delete e[t]:e[t]=Vt[t];var r=[];for(var t in e)r.push(`${t}=${e[t]}`);Bt.strings=r}return Bt.strings},Mt=[null,[],[]],qt=(e,t)=>{var r=Mt[e];0===t||10===t?((1===e?P:C)(ht(r)),r.length=0):r.push(t)},Lt=e=>n["_"+e],zt=e=>Je(e),Nt=(e,t,r,n,a)=>{var i={string:e=>{var t=0;return null!=e&&0!==e&&(t=(e=>{var t=pt(e)+1,r=zt(t);return lt(e,r,t),r})(e)),t},array:e=>{var t=zt(e.length);return((e,t)=>{f.set(e,t)})(e,t),t}};var o=Lt(e),s=[],u=0;if(n)for(var c=0;c<n.length;c++){var l=i[r[c]];l?(0===u&&(u=B()),s[c]=l(n[c])):s[c]=n[c]}var p,d=o(...s);return p=d,0!==u&&V(u),d=function(e){return"string"===t?vt(e):"boolean"===t?!!e:e}(p),d};if((()=>{let e=ue.prototype;Object.assign(e,{isAliasOf(e){if(!(this instanceof ue&&e instanceof ue))return!1;var t=this.$$.ptrType.registeredClass,r=this.$$.ptr;e.$$=e.$$;for(var n=e.$$.ptrType.registeredClass,a=e.$$.ptr;t.baseClass;)r=t.upcast(r),t=t.baseClass;for(;n.baseClass;)a=n.upcast(a),n=n.baseClass;return t===n&&r===a},clone(){if(this.$$.ptr||ne(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var e=se(Object.create(Object.getPrototypeOf(this),{$$:{value:re(this.$$)}}));return e.$$.count.value+=1,e.$$.deleteScheduled=!1,e},delete(){this.$$.ptr||ne(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&Q("Object already scheduled for deletion"),ie(this),oe(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)},isDeleted(){return!this.$$.ptr},deleteLater(){return this.$$.ptr||ne(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&Q("Object already scheduled for deletion"),this.$$.deleteScheduled=!0,this}});const t=Symbol.dispose;t&&(e[t]=e.delete)})(),Object.assign(Se.prototype,{getPointee(e){return this.rawGetPointee&&(e=this.rawGetPointee(e)),e},destructor(e){this.rawDestructor?.(e)},readValueFromPointer:_e,fromWireType:ke}),n.noExitRuntime&&(I=n.noExitRuntime),n.print&&(P=n.print),n.printErr&&(C=n.printErr),n.wasmBinary&&(u=n.wasmBinary),n.arguments&&n.arguments,n.thisProgram&&(a=n.thisProgram),n.preInit)for("function"==typeof n.preInit&&(n.preInit=[n.preInit]);n.preInit.length>0;)n.preInit.shift()();n.ENV=Vt,n.ccall=Nt,n.cwrap=(e,t,r,n)=>{var a=!r||r.every(e=>"number"===e||"boolean"===e);return"string"!==t&&a&&!n?Lt(e):(...n)=>Nt(e,t,r,n)};var Jt,Yt={__cxa_begin_catch:e=>{var t=new z(e);return t.get_caught()||(t.set_caught(!0),q--),t.set_rethrown(!1),M.push(t),Xe(e),Ke(e)},__cxa_end_catch:()=>{Le(0,0);var e=M.pop();Ge(e.excPtr),L=0},__cxa_find_matching_catch_2:()=>J([]),__cxa_find_matching_catch_3:e=>J([e]),__cxa_find_matching_catch_4:(e,t)=>J([e,t]),__cxa_rethrow:()=>{var e=M.pop();e||A("no exception to throw");var t=e.excPtr;throw e.get_rethrown()||(M.push(e),e.set_rethrown(!0),e.set_caught(!1),q++),L=t},__cxa_throw:(e,t,r)=>{throw new z(e).init(t,r),q++,L=e},__cxa_uncaught_exceptions:()=>q,__resumeException:e=>{throw L||(L=e),L},_abort_js:()=>A(""),_embind_register_bigint:(e,t,r,n,a)=>{t=Y(t);const i=0n===n;let o=e=>e;if(i){const e=8*r;o=t=>BigInt.asUintN(e,t),a=o(a)}ee(e,{name:t,fromWireType:o,toWireType:(e,t)=>("number"==typeof t&&(t=BigInt(t)),t),readValueFromPointer:te(t,r,!i),destructorFunction:null})},_embind_register_bool:(e,t,r,n)=>{ee(e,{name:t=Y(t),fromWireType:function(e){return!!e},toWireType:function(e,t){return t?r:n},readValueFromPointer:function(e){return this.fromWireType(h[e])},destructorFunction:null})},_embind_register_class:(e,t,r,n,a,i,o,s,u,c,l,p,d)=>{l=Y(l),i=Ee(a,i),s&&=Ee(o,s),c&&=Ee(u,c),d=Ee(p,d);var f=(e=>{var t=(e=e.replace(/[^a-zA-Z0-9_]/g,"$")).charCodeAt(0);return t>=48&&t<=57?`_${e}`:e})(l);de(f,function(){Re(`Cannot construct ${l} due to unbound types`,[n])}),je([e,t,r],n?[n]:[],t=>{var r,a;t=t[0],n?a=(r=t.registeredClass).instancePrototype:a=ue.prototype;var o=ce(l,function(...e){if(Object.getPrototypeOf(this)!==u)throw new K(`Use \'new\' to construct ${l}`);if(void 0===p.constructor_body)throw new K(`${l} has no accessible constructor`);var t=p.constructor_body[e.length];if(void 0===t)throw new K(`Tried to invoke ctor of ${l} with invalid number of parameters (${e.length}) - expected (${Object.keys(p.constructor_body).toString()}) parameters instead!`);return t.apply(this,e)}),u=Object.create(a,{constructor:{value:o}});o.prototype=u;var p=new fe(l,o,u,d,r,i,s,c);p.baseClass&&(p.baseClass.__derivedClasses??=[],p.baseClass.__derivedClasses.push(p));var h=new Se(l,p,!0,!1,!1),v=new Se(l+"*",p,!1,!1,!1),m=new Se(l+" const*",p,!1,!0,!1);return le[e]={pointerType:v,constPointerType:m},Ae(f,o),[h,v,m]})},_embind_register_class_class_function:(e,t,r,n,a,i,o,s,u)=>{var c=Qe(r,n);t=Y(t),t=et(t),i=Ee(a,i,s),je([],[e],e=>{var n=`${(e=e[0]).name}.${t}`;function a(){Re(`Cannot call ${n} due to unbound types`,c)}t.startsWith("@@")&&(t=Symbol[t.substring(2)]);var u=e.registeredClass.constructor;return void 0===u[t]?(a.argCount=r-1,u[t]=a):(pe(u,t,n),u[t].overloadTable[r-1]=a),je([],c,a=>{var c=[a[0],null].concat(a.slice(1)),l=Ie(n,c,null,i,o,s);if(void 0===u[t].overloadTable?(l.argCount=r-1,u[t]=l):u[t].overloadTable[r-1]=l,e.registeredClass.__derivedClasses)for(const r of e.registeredClass.__derivedClasses)r.constructor.hasOwnProperty(t)||(r.constructor[t]=l);return[]}),[]})},_embind_register_class_constructor:(e,t,r,n,a,i)=>{var o=Qe(t,r);a=Ee(n,a),je([],[e],e=>{var r=`constructor ${(e=e[0]).name}`;if(void 0===e.registeredClass.constructor_body&&(e.registeredClass.constructor_body=[]),void 0!==e.registeredClass.constructor_body[t-1])throw new K(`Cannot register multiple constructors with identical number of parameters (${t-1}) for class \'${e.name}\'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return e.registeredClass.constructor_body[t-1]=()=>{Re(`Cannot construct ${e.name} due to unbound types`,o)},je([],o,n=>(n.splice(1,0,null),e.registeredClass.constructor_body[t-1]=Ie(r,n,null,a,i),[])),[]})},_embind_register_class_function:(e,t,r,n,a,i,o,s,u,c)=>{var l=Qe(r,n);t=Y(t),t=et(t),i=Ee(a,i,u),je([],[e],e=>{var n=`${(e=e[0]).name}.${t}`;function a(){Re(`Cannot call ${n} due to unbound types`,l)}t.startsWith("@@")&&(t=Symbol[t.substring(2)]),s&&e.registeredClass.pureVirtualFunctions.push(t);var c=e.registeredClass.instancePrototype,p=c[t];return void 0===p||void 0===p.overloadTable&&p.className!==e.name&&p.argCount===r-2?(a.argCount=r-2,a.className=e.name,c[t]=a):(pe(c,t,n),c[t].overloadTable[r-2]=a),je([],l,a=>{var s=Ie(n,a,e,i,o,u);return void 0===c[t].overloadTable?(s.argCount=r-2,c[t]=s):c[t].overloadTable[r-2]=s,[]}),[]})},_embind_register_class_property:(e,t,r,n,a,i,o,s,u,c)=>{t=Y(t),a=Ee(n,a),je([],[e],e=>{var n=`${(e=e[0]).name}.${t}`,l={get(){Re(`Cannot access ${n} due to unbound types`,[r,o])},enumerable:!0,configurable:!0};return l.set=u?()=>Re(`Cannot access ${n} due to unbound types`,[r,o]):e=>Q(n+" is a read-only property"),Object.defineProperty(e.registeredClass.instancePrototype,t,l),je([],u?[r,o]:[r],r=>{var o=r[0],l={get(){var t=tt(this,e,n+" getter");return o.fromWireType(a(i,t))},enumerable:!0};if(u){u=Ee(s,u);var p=r[1];l.set=function(t){var r=tt(this,e,n+" setter"),a=[];u(c,r,p.toWireType(a,t)),Ue(a)}}return Object.defineProperty(e.registeredClass.instancePrototype,t,l),[]}),[]})},_embind_register_emval:e=>ee(e,ot),_embind_register_enum:(e,t,r,n)=>{function a(){}t=Y(t),a.values={},ee(e,{name:t,constructor:a,fromWireType:function(e){return this.constructor.values[e]},toWireType:(e,t)=>t.value,readValueFromPointer:st(t,r,n),destructorFunction:null}),de(t,a)},_embind_register_enum_value:(e,t,r)=>{var n=ut(e,"enum");t=Y(t);var a=n.constructor,i=Object.create(n.constructor.prototype,{value:{value:r},constructor:{value:ce(`${n.name}_${t}`,function(){})}});a.values[r]=i,a[t]=i},_embind_register_float:(e,t,r)=>{ee(e,{name:t=Y(t),fromWireType:e=>e,toWireType:(e,t)=>t,readValueFromPointer:ct(t,r),destructorFunction:null})},_embind_register_function:(e,t,r,n,a,i,o,s)=>{var u=Qe(t,r);e=Y(e),e=et(e),a=Ee(n,a,o),de(e,function(){Re(`Cannot call ${e} due to unbound types`,u)},t-1),je([],u,r=>{var n=[r[0],null].concat(r.slice(1));return Ae(e,Ie(e,n,null,a,i,o),t-1),[]})},_embind_register_integer:(e,t,r,n,a)=>{t=Y(t);let i=e=>e;if(0===n){var o=32-8*r;i=e=>e<<o>>>o,a=i(a)}ee(e,{name:t,fromWireType:i,toWireType:(e,t)=>t,readValueFromPointer:te(t,r,0!==n),destructorFunction:null})},_embind_register_memory_view:(e,t,r)=>{var n=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][t];function a(e){var t=g[e>>2],r=g[e+4>>2];return new n(f.buffer,r,t)}ee(e,{name:r=Y(r),fromWireType:a,readValueFromPointer:a},{ignoreDuplicateRegistrations:!0})},_embind_register_std_string:(e,t)=>{ee(e,{name:t=Y(t),fromWireType(e){var t,r=g[e>>2];return t=vt(e+4,r,!0),Me(e),t},toWireType(e,t){t instanceof ArrayBuffer&&(t=new Uint8Array(t));var r,n="string"==typeof t;n||ArrayBuffer.isView(t)&&1==t.BYTES_PER_ELEMENT||Q("Cannot pass non-string to std::string"),r=n?pt(t):t.length;var a=Be(4+r+1),i=a+4;return g[a>>2]=r,n?lt(t,i,r+1):h.set(t,i),null!==e&&e.push(Me,a),a},readValueFromPointer:_e,destructorFunction(e){Me(e)}})},_embind_register_std_wstring:(e,t,r)=>{var n,a,i;r=Y(r),2===t?(n=yt,a=gt,i=_t):(n=wt,a=$t,i=bt),ee(e,{name:r,fromWireType:e=>{var r=g[e>>2],a=n(e+4,r*t,!0);return Me(e),a},toWireType:(e,n)=>{"string"!=typeof n&&Q(`Cannot pass non-string to C++ string type ${r}`);var o=i(n),s=Be(4+o+t);return g[s>>2]=o/t,a(n,s+4,o+t),null!==e&&e.push(Me,s),s},readValueFromPointer:_e,destructorFunction(e){Me(e)}})},_embind_register_void:(e,t)=>{ee(e,{isVoid:!0,name:t=Y(t),fromWireType:()=>{},toWireType:(e,t)=>{}})},_emscripten_runtime_keepalive_clear:()=>{I=!1,Tt=0},_emval_create_invoker:(e,t,r)=>{var[n,...a]=((e,t)=>{for(var r=new Array(e),n=0;n<e;++n)r[n]=ut(g[t+4*n>>2],`parameter ${n}`);return r})(e,t),i=n.toWireType.bind(n),o=a.map(e=>e.readValueFromPointer.bind(e));e--;var s,u={toValue:it.toValue},c=o.map((e,t)=>{var r=`argFromPtr${t}`;return u[r]=e,`${r}(args${t?"+"+8*t:""})`});switch(r){case 0:s="toValue(handle)";break;case 2:s="new (toValue(handle))";break;case 3:s="";break;case 1:u.getStringOrSymbol=St,s="toValue(handle)[getStringOrSymbol(methodName)]"}s+=`(${c})`,n.isVoid||(u.toReturnWire=i,u.emval_returnValue=Ct,s=`return emval_returnValue(toReturnWire, destructorsRef, ${s})`),s=`return function (handle, methodName, destructorsRef, args) {\\n  ${s}\\n  }`;var l=new Function(Object.keys(u),s)(...Object.values(u)),p=`methodCaller<(${a.map(e=>e.name)}) => ${n.name}>`;return(e=>{var t=Pt.length;return Pt.push(e),t})(ce(p,l))},_emval_decref:at,_emval_invoke:(e,t,r,n,a)=>Pt[e](t,r,n,a),_emval_new_object:()=>it.toHandle({}),_emval_run_destructors:e=>{var t=it.toValue(e);Ue(t),at(e)},_emval_set_property:(e,t,r)=>{e=it.toValue(e),t=it.toValue(t),r=it.toValue(r),e[t]=r},_gmtime_js:function(e,t){e=Ft(e);var r=new Date(1e3*e);y[t>>2]=r.getUTCSeconds(),y[t+4>>2]=r.getUTCMinutes(),y[t+8>>2]=r.getUTCHours(),y[t+12>>2]=r.getUTCDate(),y[t+16>>2]=r.getUTCMonth(),y[t+20>>2]=r.getUTCFullYear()-1900,y[t+24>>2]=r.getUTCDay();var n=Date.UTC(r.getUTCFullYear(),0,1,0,0,0,0),a=(r.getTime()-n)/864e5|0;y[t+28>>2]=a},_localtime_js:function(e,t){e=Ft(e);var r=new Date(1e3*e);y[t>>2]=r.getSeconds(),y[t+4>>2]=r.getMinutes(),y[t+8>>2]=r.getHours(),y[t+12>>2]=r.getDate(),y[t+16>>2]=r.getMonth(),y[t+20>>2]=r.getFullYear()-1900,y[t+24>>2]=r.getDay();var n=0|(e=>((e=>e%4==0&&(e%100!=0||e%400==0))(e.getFullYear())?At:Dt)[e.getMonth()]+e.getDate()-1)(r);y[t+28>>2]=n,y[t+36>>2]=-60*r.getTimezoneOffset();var a=new Date(r.getFullYear(),0,1),i=new Date(r.getFullYear(),6,1).getTimezoneOffset(),o=a.getTimezoneOffset(),s=0|(i!=o&&r.getTimezoneOffset()==Math.min(o,i));y[t+32>>2]=s},_setitimer_js:(e,t)=>{if(Wt[e]&&(clearTimeout(Wt[e].id),delete Wt[e]),!t)return 0;var r=setTimeout(()=>{delete Wt[e],jt(()=>qe(e,Ut()))},t);return Wt[e]={id:r,timeout_ms:t},0},_tzset_js:(e,t,r,n)=>{var a=/* @__PURE__ */(new Date).getFullYear(),i=new Date(a,0,1),o=new Date(a,6,1),s=i.getTimezoneOffset(),u=o.getTimezoneOffset(),c=Math.max(s,u);g[e>>2]=60*c,y[t>>2]=+(s!=u);var l=e=>{var t=e>=0?"-":"+",r=Math.abs(e);return`UTC${t}${String(Math.floor(r/60)).padStart(2,"0")}${String(r%60).padStart(2,"0")}`},p=l(s),d=l(u);u<s?(lt(p,r,17),lt(d,n,17)):(lt(p,n,17),lt(d,r,17))},clock_time_get:function(e,t,r){if(!(e=>e>=0&&e<=3)(e))return 28;var n;n=0===e?Date.now():Ut();var a=Math.round(1e3*n*1e3);return $[r>>3]=BigInt(a),0},emscripten_get_heap_max:()=>2147483648,emscripten_resize_heap:e=>{var t=h.length,r=2147483648;if((e>>>=0)>r)return!1;for(var n=1;n<=4;n*=2){var a=t*(1+.2/n);a=Math.min(a,e+100663296);var i=Math.min(r,Ht(Math.max(e,a),65536));if(It(i))return!0}return!1},environ_get:(e,t)=>{var r=0,n=0;for(var a of Bt()){var i=t+r;g[e+n>>2]=i,r+=lt(a,i,1/0)+1,n+=4}return 0},environ_sizes_get:(e,t)=>{var r=Bt();g[e>>2]=r.length;var n=0;for(var a of r)n+=pt(a)+1;return g[t>>2]=n,0},fd_close:e=>52,fd_fdstat_get:(e,t)=>{var r=0;return 0==e?r=2:(1==e||2==e)&&(r=64),f[t]=2,v[t+2>>1]=1,$[t+8>>3]=BigInt(r),$[t+16>>3]=BigInt(0),0},fd_seek:function(e,t,r,n){return 70},fd_write:(e,t,r,n)=>{for(var a=0,i=0;i<r;i++){var o=g[t>>2],s=g[t+4>>2];t+=8;for(var u=0;u<s;u++)qt(e,h[o+u]);a+=s}return g[n>>2]=a,0},invoke_diii:function(e,t,r,n){var a=B();try{return We(e)(t,r,n)}catch(i){if(V(a),i!==i+0)throw i;Le(1,0)}},invoke_fi:function(e,t){var r=B();try{return We(e)(t)}catch(n){if(V(r),n!==n+0)throw n;Le(1,0)}},invoke_fiii:function(e,t,r,n){var a=B();try{return We(e)(t,r,n)}catch(i){if(V(a),i!==i+0)throw i;Le(1,0)}},invoke_i:function(e){var t=B();try{return We(e)()}catch(r){if(V(t),r!==r+0)throw r;Le(1,0)}},invoke_ii:function(e,t){var r=B();try{return We(e)(t)}catch(n){if(V(r),n!==n+0)throw n;Le(1,0)}},invoke_iii:function(e,t,r){var n=B();try{return We(e)(t,r)}catch(a){if(V(n),a!==a+0)throw a;Le(1,0)}},invoke_iiii:function(e,t,r,n){var a=B();try{return We(e)(t,r,n)}catch(i){if(V(a),i!==i+0)throw i;Le(1,0)}},invoke_iiiid:function(e,t,r,n,a){var i=B();try{return We(e)(t,r,n,a)}catch(o){if(V(i),o!==o+0)throw o;Le(1,0)}},invoke_iiiii:function(e,t,r,n,a){var i=B();try{return We(e)(t,r,n,a)}catch(o){if(V(i),o!==o+0)throw o;Le(1,0)}},invoke_iiiiid:function(e,t,r,n,a,i){var o=B();try{return We(e)(t,r,n,a,i)}catch(s){if(V(o),s!==s+0)throw s;Le(1,0)}},invoke_iiiiii:function(e,t,r,n,a,i){var o=B();try{return We(e)(t,r,n,a,i)}catch(s){if(V(o),s!==s+0)throw s;Le(1,0)}},invoke_iiiiiii:function(e,t,r,n,a,i,o){var s=B();try{return We(e)(t,r,n,a,i,o)}catch(u){if(V(s),u!==u+0)throw u;Le(1,0)}},invoke_iiiiiiii:function(e,t,r,n,a,i,o,s){var u=B();try{return We(e)(t,r,n,a,i,o,s)}catch(c){if(V(u),c!==c+0)throw c;Le(1,0)}},invoke_iiiiiiiiii:function(e,t,r,n,a,i,o,s,u,c){var l=B();try{return We(e)(t,r,n,a,i,o,s,u,c)}catch(p){if(V(l),p!==p+0)throw p;Le(1,0)}},invoke_iiiiiiiiiii:function(e,t,r,n,a,i,o,s,u,c,l){var p=B();try{return We(e)(t,r,n,a,i,o,s,u,c,l)}catch(d){if(V(p),d!==d+0)throw d;Le(1,0)}},invoke_iiiiiiiiiiii:function(e,t,r,n,a,i,o,s,u,c,l,p){var d=B();try{return We(e)(t,r,n,a,i,o,s,u,c,l,p)}catch(f){if(V(d),f!==f+0)throw f;Le(1,0)}},invoke_iiiiijj:function(e,t,r,n,a,i,o){var s=B();try{return We(e)(t,r,n,a,i,o)}catch(u){if(V(s),u!==u+0)throw u;Le(1,0)}},invoke_iiiijj:function(e,t,r,n,a,i){var o=B();try{return We(e)(t,r,n,a,i)}catch(s){if(V(o),s!==s+0)throw s;Le(1,0)}},invoke_iiij:function(e,t,r,n){var a=B();try{return We(e)(t,r,n)}catch(i){if(V(a),i!==i+0)throw i;Le(1,0)}},invoke_j:function(e){var t=B();try{return We(e)()}catch(r){if(V(t),r!==r+0)throw r;return Le(1,0),0n}},invoke_jiiii:function(e,t,r,n,a){var i=B();try{return We(e)(t,r,n,a)}catch(o){if(V(i),o!==o+0)throw o;return Le(1,0),0n}},invoke_v:function(e){var t=B();try{We(e)()}catch(r){if(V(t),r!==r+0)throw r;Le(1,0)}},invoke_vi:function(e,t){var r=B();try{We(e)(t)}catch(n){if(V(r),n!==n+0)throw n;Le(1,0)}},invoke_vii:function(e,t,r){var n=B();try{We(e)(t,r)}catch(a){if(V(n),a!==a+0)throw a;Le(1,0)}},invoke_viii:function(e,t,r,n){var a=B();try{We(e)(t,r,n)}catch(i){if(V(a),i!==i+0)throw i;Le(1,0)}},invoke_viiii:function(e,t,r,n,a){var i=B();try{We(e)(t,r,n,a)}catch(o){if(V(i),o!==o+0)throw o;Le(1,0)}},invoke_viiiii:function(e,t,r,n,a,i){var o=B();try{We(e)(t,r,n,a,i)}catch(s){if(V(o),s!==s+0)throw s;Le(1,0)}},invoke_viiiiii:function(e,t,r,n,a,i,o){var s=B();try{We(e)(t,r,n,a,i,o)}catch(u){if(V(s),u!==u+0)throw u;Le(1,0)}},invoke_viiiiiii:function(e,t,r,n,a,i,o,s){var u=B();try{We(e)(t,r,n,a,i,o,s)}catch(c){if(V(u),c!==c+0)throw c;Le(1,0)}},invoke_viiiiiiii:function(e,t,r,n,a,i,o,s,u){var c=B();try{We(e)(t,r,n,a,i,o,s,u)}catch(l){if(V(c),l!==l+0)throw l;Le(1,0)}},invoke_viiiiiiiiii:function(e,t,r,n,a,i,o,s,u,c,l){var p=B();try{We(e)(t,r,n,a,i,o,s,u,c,l)}catch(d){if(V(p),d!==d+0)throw d;Le(1,0)}},invoke_viiiiiiiiiiiiiii:function(e,t,r,n,a,i,o,s,u,c,l,p,d,f,h,v){var m=B();try{We(e)(t,r,n,a,i,o,s,u,c,l,p,d,f,h,v)}catch(y){if(V(m),y!==y+0)throw y;Le(1,0)}},invoke_viiji:function(e,t,r,n,a){var i=B();try{We(e)(t,r,n,a)}catch(o){if(V(i),o!==o+0)throw o;Le(1,0)}},invoke_viijii:function(e,t,r,n,a,i){var o=B();try{We(e)(t,r,n,a,i)}catch(s){if(V(o),s!==s+0)throw s;Le(1,0)}},llvm_eh_typeid_for:e=>e,proc_exit:Ot};return Jt=await async function(){function e(e,t){return Jt=e.exports,d=Jt.memory,F(),Fe=Jt.__indirect_function_table,function(e){Ve=e.__getTypeName,n._malloc=Be=e.malloc,n._parseDropFile=e.parseDropFile,n._getAttributeFromDropFile=e.getAttributeFromDropFile,n._takeAttributeFromDropFile=e.takeAttributeFromDropFile,n._flattenDropFile=e.flattenDropFile,n._destroyDropFileHandle=e.destroyDropFileHandle,e.__cxa_free_exception,n._free=Me=e.free,qe=e._emscripten_timeout,Le=e.setThrew,ze=e._emscripten_tempret_set,Ne=e._emscripten_stack_restore,Je=e._emscripten_stack_alloc,Ye=e.emscripten_stack_get_current,Ge=e.__cxa_decrement_exception_refcount,Xe=e.__cxa_increment_exception_refcount,Ze=e.__cxa_can_catch,Ke=e.__cxa_get_exception_ptr}(Jt),Jt}var t={env:Yt,wasi_snapshot_preview1:Yt};return n.instantiateWasm?new Promise((r,a)=>{n.instantiateWasm(t,(t,n)=>{r(e(t))})}):(T??=D(),e((await E(u,T,t)).instance))}(),function(){function e(){n.calledRun=!0,!k&&(S=!0,Jt.__wasm_call_ctors(),l?.(n),n.onRuntimeInitialized?.(),function(){if(n.postRun)for("function"==typeof n.postRun&&(n.postRun=[n.postRun]);n.postRun.length;)j(n.postRun.shift());O(R)}())}!function(){if(n.preRun)for("function"==typeof n.preRun&&(n.preRun=[n.preRun]);n.preRun.length;)H(n.preRun.shift());O(U)}(),n.setStatus?(n.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>n.setStatus(""),1),e()},1)):e()}(),S?n:new Promise((e,t)=>{l=e,p=t})}({wasmBinary:r}),a=/* @__PURE__ */new Map,i={get AttributeInfo(){return n.AttributeInfo},get AquaStatus(){return n.AquaStatus},get heapU8(){return n.HEAPU8},get heapU32(){return n.HEAPU32},get SceneRequestDescriptor(){return n.SceneRequestDescriptor},get WorkerDataType(){return n.WorkerDataType},dataPtrView:e=>n.dataPtrView(e),free:(...e)=>n.ccall("free","number",["number"],e),malloc:(...e)=>n.ccall("malloc","number",["number"],e),parseDropFile:(e,t)=>n.parseDropFile(e,t),getAttributeFromDropFile:(e,t,r)=>n.getAttributeFromDropFile(e,t,r),takeAttributeFromDropFile:(e,t,r)=>n.takeAttributeFromDropFile(e,t,r),flattenDropFile:(e,t,r)=>n.flattenDropFile(e,t,r),destroyDropFileHandle:e=>n.destroyDropFileHandle(e)};var o;o={async cancel(e,t){const r=`${t}-${e}`,n=a.get(r);return n&&(n.abort(),a.delete(r)),[{cancelled:!!n}]},heapSnapshot:async e=>"function"!=typeof n.TakeHeapSnapshot?[{snapshotJson:null}]:[{snapshotJson:n.TakeHeapSnapshot(e)}],heapTrackingControl:async e=>"function"!=typeof n.SetHeapTrackingEnabled?[{success:!1}]:(n.SetHeapTrackingEnabled(e),[{success:!0}]),heapTrackingReset:async()=>"function"!=typeof n.ResetHeapTracking?[{success:!1}]:(n.ResetHeapTracking(),[{success:!0}]),async decode(r,o,s,u,c,l){const p=`${o}-${r}`,d=new AbortController;a.set(p,d);try{const{free:a,malloc:p,parseDropFile:h,getAttributeFromDropFile:v,takeAttributeFromDropFile:m,flattenDropFile:y,destroyDropFileHandle:g}=i,_=s.byteLength,w=p(_);i.heapU8.set(new Uint8Array(s),w);const $=n.SceneRequestDescriptor.deserializeFromBinary(w,_);a(w);let b=$.getUrl();if(l){const e=new URL(b);e.searchParams.delete("jwt"),b=e.toString()}const T=$.getBody()||null,P=T?"POST":"GET",C=$.getHeaders();$.delete();const k=performance.now(),S=await fetch(b,{method:P,headers:C,body:T,signal:d.signal}),F=JSON.stringify({"x-cache":S.headers.get("x-cache")??""});if(!S.ok){const e=performance.now()-k;return[{requestIdLow:r,requestIdHigh:o,resultBuffer:new ArrayBuffer(0),success:!1,parsed:!1,error:`HTTP error! status: ${S.status}`,dataType:n.WorkerDataType.Raw.value,contextPtr:u,attributes:[],duration:e,ttfb:e,httpStatus:S.status,responseHeadersJson:F},{transfer:[]}]}const A=performance.now()-k,D=await S.arrayBuffer(),W=performance.now()-k,E=[];if(!b.split(/[?#]/,1)[0].endsWith(".drop"))return[{requestIdLow:r,requestIdHigh:o,resultBuffer:D,success:!0,parsed:!1,error:void 0,dataType:n.WorkerDataType.Raw.value,contextPtr:u,attributes:E,duration:W,ttfb:A,httpStatus:S.status,responseHeadersJson:F},{transfer:[D]}];const x=D.byteLength,O=p(x);i.heapU8.set(new Uint8Array(D),O);const R=p(4),j=p(4);i.heapU32[R/4]=0,i.heapU32[j/4]=0;let U=0,H=0;const I=new i.AttributeInfo;try{if(U=h(O,x),0===U)throw new Error("parseDropFile failed");let a=c;for(const[r,n]of Object.entries(e)){if(n.discard)m(U,r,a);else if(v(U,r,I)===i.AquaStatus.Success){const e=t(r,a,i.dataPtrView(I));m(U,r,a)===i.AquaStatus.Success&&E.push(e)}a++}if(y(U,R,j)!==i.AquaStatus.Success)throw new Error("flattenDropFile failed");H=i.heapU32[R/4];const s=i.heapU32[j/4];if(0===H)throw new Error("flattenDropFile gave nullptr");const l=i.heapU8.buffer.slice(H,H+s),p=E.map(e=>e.paddedData.buffer);return[{requestIdLow:r,requestIdHigh:o,resultBuffer:l,success:!0,parsed:!0,error:void 0,dataType:n.WorkerDataType.Drop.value,contextPtr:u,attributes:E,duration:W,ttfb:A,httpStatus:S.status,responseHeadersJson:F},{transfer:[l,...p]}]}catch(f){console.error("Exception when parsing dropfile",f);const e=f instanceof Error?f.stack??f.message:String(f),t=(new Uint8Array).buffer;return[{requestIdLow:r,requestIdHigh:o,resultBuffer:t,success:!1,parsed:!1,error:e,dataType:n.WorkerDataType.Drop.value,contextPtr:u,attributes:void 0,duration:W,ttfb:A,httpStatus:S.status,responseHeadersJson:F},{transfer:[t]}]}finally{g(U),a(O),a(R),a(j),0!==H&&a(H),I.delete()}}catch(f){const e=f instanceof Error?f.message:String(f),t=f instanceof Error&&"AbortError"===f.name;return[{requestIdLow:r,requestIdHigh:o,resultBuffer:new ArrayBuffer(0),success:!1,parsed:!1,error:t?"Cancelled":e,dataType:n.WorkerDataType.Raw.value,contextPtr:u,attributes:[],duration:0,ttfb:0,httpStatus:0,responseHeadersJson:"{}"},{transfer:[]}]}finally{a.delete(p)}}},self.postMessage("ready"),self.addEventListener("message",async({data:e})=>{if("ready"===e)return;const{id:t,action:r,args:n}=e,[a,...i]=await Reflect.apply(o[r],void 0,[...n,t]);self.postMessage({id:t,result:a},...i)});\n',Nt=typeof self<`u`&&self.Blob&&new Blob([`URL.revokeObjectURL(import.meta.url);`,Mt],{type:`text/javascript;charset=utf-8`});function Pt(e){let t;try{if(t=Nt&&(self.URL||self.webkitURL).createObjectURL(Nt),!t)throw``;let n=new Worker(t,{type:`module`,name:e?.name});return n.addEventListener(`error`,()=>{(self.URL||self.webkitURL).revokeObjectURL(t)}),n}catch{return new Worker(`data:text/javascript;charset=utf-8,`+encodeURIComponent(Mt),{type:`module`,name:e?.name})}}var Ft=(e=>{let t;return async()=>{t??=fetch(e).then(t=>{if(!t.ok)throw Error(`HTTP ${t.status} fetching ${e}`);return t.arrayBuffer()});try{return(await t).slice(0)}catch(e){throw t=void 0,e}}})((e=>e.includes(`/.vite/`)?e.replace(/\.vite\/[^?#]*/,()=>`@miris-inc/core/dist/aqua-parser.wasm`):e)(new URL(``+new URL(`aqua-parser-15SbM211.wasm`,import.meta.url).href,``+import.meta.url).href)),It=class extends jt{static name=`decoder`;static Worker=Pt;constructor(e){super(e),this.#e()}async#e(){try{let e=await Ft();this._postToWorker({type:`wasm-init`,wasmBinary:e},[e])}catch(e){console.error(`Failed to load aqua-parser.wasm for decoder worker`,e),this._postToWorker({type:`wasm-init`})}}get AttributeInfo(){return this.module.AttributeInfo}async heapSnapshot(e){return this._execute(`heapSnapshot`,e)}async heapTrackingControl(e){return this._execute(`heapTrackingControl`,e)}async heapTrackingReset(){return this._execute(`heapTrackingReset`)}async cancel(e,t){await this.ready,this._execute(`cancel`,e,t).catch(()=>{})}async decode(...e){let{requestIdLow:t,requestIdHigh:n,resultBuffer:r,success:i,dataType:a,contextPtr:o,attributes:s,duration:c,ttfb:l,httpStatus:u,responseHeadersJson:d}=await this._execute(`decode`,...e);if(s!==void 0)for(let{paddedData:e,originalSize:t,id:n}of s)Ct.addWithId({paddedData:e,originalSize:t},n);let{engine:f}=this,p=r.byteLength,m=f.malloc(p);f.heapU8.set(new Uint8Array(r),m),f.onWorkerResult(t,n,m,p,u,c,l,i,a,``,d,o)}},Lt={sparkPackedSplat:{elementsPerSplat:4,discard:!1},extendedPackedSplatLow:{elementsPerSplat:4,discard:!1},extendedPackedSplatHigh:{elementsPerSplat:4,discard:!1},packedSh1:{elementsPerSplat:2,discard:!1},packedSh2:{elementsPerSplat:4,discard:!1},packedSh3:{elementsPerSplat:4,discard:!1},sh1Extended:{elementsPerSplat:4,discard:!1},sh2Extended:{elementsPerSplat:4,discard:!1},sh3Extended_0:{elementsPerSplat:4,discard:!1},sh3Extended_1:{elementsPerSplat:4,discard:!1},splatterEllipsoids:{elementsPerSplat:12,discard:!1},splatterSphericalHarmonics:{elementsPerSplat:16,discard:!1}};function Rt(e,t,n){let r=Lt[e];if(r===void 0)throw Error(`attribute name`+e+` is unknown`);let i=n.length,a=(o=i,s=2048*r.elementsPerSplat,Math.ceil(o/s)*s);var o,s;let c=new Uint32Array(a);return c.set(n),{paddedData:c,originalSize:i,id:t}}var zt=class{static SPARK_PACKED_SPLAT=`sparkPackedSplat`;static SPARK_EXTENDED_SPLAT_LOW=`extendedPackedSplatLow`;static SPARK_EXTENDED_SPLAT_HIGH=`extendedPackedSplatHigh`;static SPARK_PACKED_SH1=`packedSh1`;static SPARK_PACKED_SH2=`packedSh2`;static SPARK_PACKED_SH3=`packedSh3`;static SPARK_EXTENDED_SH1=`sh1Extended`;static SPARK_EXTENDED_SH2=`sh2Extended`;static SPARK_EXTENDED_SH3_A=`sh3Extended_0`;static SPARK_EXTENDED_SH3_B=`sh3Extended_1`;static UNUSED=`unused`;static SPLATTER_ELLIPSOIDS=`splatterEllipsoids`;static SPLATTER_SPHERICAL_HARMONICS=`splatterSphericalHarmonics`},M=class e{static AquaStatus={Success:0,Failure:1};static SceneObjectType={ModelRoot:0,SceneObject:1,StreamObject:2,GaussianSplats:3,PointsObject:4,Camera:5,LodOctree:6,VariantSetCollection:7,VariantSet:8,VariantSetOption:9};static Feature={DrMap:0,ReflMesh:1,GlassMesh:2};static FeatureState={NotLoaded:0,Pending:1,Loaded:2,Failed:3};#e;get module(){if(!this.#e)throw Error("Engine has not yet been initialized. Did you forget to `await engine.ready()?`");return this.#e}#t=new Set;#n=new Map;#r=new URL(location.href).searchParams.has(`nojwt`);constructor(e={}){Object.defineProperty(this,"pending",{value:!0,configurable:!0,enumerable:!0}),Object.defineProperty(this,"ready",{enumerable:!0,value:this.#i(e)})}async#i(t){return this.#e=await At({createDeserializeWorker:this.createDeserializeWorker.bind(this),submitToWorker:this.submitToWorker.bind(this),cancelRequest:this.cancelRequest.bind(this),terminateWorker:this.terminateWorker.bind(this),workerUrl:`aqua-parser`,...t,preRun:[t=>Object.assign(t.ENV,e.#a())]}),Object.defineProperty(this,"pending",{value:!1,configurable:!1}),this}get AttributeInfo(){return this.module.AttributeInfo}get Handedness(){return this.module.Handedness}get heapF32(){return this.module.HEAPF32}get heapU8(){return this.module.HEAPU8}get MatrixOrder(){return this.module.MatrixOrder}get SceneChangeIds(){return this.module.SceneChangeIds}get SceneMetadata(){return this.module.SceneMetadata}get RuntimeSettings(){return this.module.RuntimeSettings}get SpatialFormat(){return this.module.SpatialFormat}get StringVector(){return this.module.StringVector}get UpAxis(){return this.module.UpAxis}activatedObjectIdsView(...e){return this.module.activatedObjectIdsView(...e)}addStreamById(...e){return this.module.ccall(`AddStreamById`,`number`,[`number`,`string`,`string`,`number`],e)}addPrefetchStreamById(...e){return this.module.ccall(`AddPrefetchStreamById`,`number`,[`number`,`string`,`string`,`number`,`boolean`],e)}allocateSceneChangesArrays(...e){return this.module.AllocateSceneChangesArrays(...e)}createContext(...e){return this.module.ccall(`CreateAquaContext`,`number`,[],e)}destroyContext(...e){return this.module.ccall(`DestroyAquaContext`,`number`,[`number`],e)}createClient(e,...t){return e?this.module.ccall(`CreateClientForContext`,`number`,[`number`],[e,...t]):this.module.ccall(`CreateClient`,`number`,[],t)}createdObjectIdsView(...e){return this.module.createdObjectIdsView(...e)}deletedObjectIdsView(...e){return this.module.deletedObjectIdsView(...e)}dataPtrView(...e){return this.module.dataPtrView(...e)}deactivatedObjectIdsView(...e){return this.module.deactivatedObjectIdsView(...e)}destroyClient(...e){return this.module.ccall(`DestroyClient`,`number`,[`number`],e)}free(...e){return this.module.ccall(`free`,`number`,[`number`],e)}getAssetsAsync(...e){return this.module.GetAssetsAsync(...e)}getAttribute(...e){return this.module.ccall(`GetAttribute`,`number`,[`number`,`number`,`string`,`number`],e)}getDefaultCameraId(...e){return this.module.ccall(`GetDefaultCameraId`,`number`,[`number`],e)}getViewingVolumeId(...e){return this.module.ccall(`GetViewingVolumeId`,`number`,[`number`],e)}getLocalBoundingBox(...e){return this.module.ccall(`GetLocalBoundingBox`,`number`,[`number`,`number`,`number`],e)}getWorldBoundingBox(...e){return this.module.ccall(`GetWorldBoundingBox`,`number`,[`number`,`number`,`number`],e)}getLodIndex(...e){return this.module.ccall(`GetLodIndex`,`number`,[`number`,`number`],e)}getSceneChanges(...e){return this.module.GetSceneChanges(...e)}getSceneChangesCounts(...e){return this.module.GetSceneChangesCounts(...e)}getSceneMetadata(...e){return this.module.GetSceneMetadata(...e).value}getSceneObjectParent(...e){return this.module.ccall(`GetSceneObjectParent`,`number`,[`number`,`number`],e)}getSceneObjectType(...e){return this.module.ccall(`GetSceneObjectType`,`number`,[`number`,`number`],e)}getLocalTransform(...e){return this.module.ccall(`MirisGetLocalTransform`,`number`,[`number`,`number`,`number`],e)}getWorldTransform(...e){return this.module.ccall(`MirisGetWorldTransform`,`number`,[`number`,`number`,`number`],e)}hasAttribute(...e){return this.module.ccall(`HasAttribute`,`boolean`,[`number`,`number`,`string`],e)}isSceneObjectAncestorOf(...e){return this.module.ccall(`IsSceneObjectAncestorOf`,`boolean`,[`number`,`number`,`number`],e)}lockScene(...e){return this.module.ccall(`LockScene`,`number`,[`number`],e)}malloc(...e){return this.module.ccall(`malloc`,`number`,[`number`],e)}modifiedObjectIdsView(...e){return this.module.modifiedObjectIdsView(...e)}onWorkerResult(...e){let t=`${e[1]}-${e[0]}`;return this.#n.delete(t),this.module.ccall(`onWorkerResult`,null,[`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`number`,`string`,`string`,`number`],e)}removeStream(...e){return this.module.ccall(`RemoveStream`,`boolean`,[`pointer`,`number`],e)}setAssetViewerKey(...e){return this.module.ccall(`SetAssetViewerKey`,`number`,[`number`,`string`],e)}setClientSpatialFormat(...e){return this.module.SetClientSpatialFormat(...e).value}setRuntimeSettings(...e){return this.module.SetRuntimeSettings(...e).value}setMainCameraTransform(...e){return this.module.ccall(`SetMainCameraTransform`,`number`,[`number`,`number`],e)}setMainCameraViewFrustum(...e){return this.module.ccall(`SetMainCameraViewFrustum`,`number`,[`number`,`number`,`number`,`number`,`number`],e)}setMaxCacheSize(...e){return this.module.setMaxCacheSize(...e)}setSceneObjectTransform(...e){return this.module.ccall(`SetSceneObjectTransform`,`number`,[`number`,`number`,`number`],e)}hasFeature(...e){return this.module.HasFeature(...e)}getFeatureVersion(...e){return this.module.GetFeatureVersion(...e)}getFeatureState(...e){return this.module.GetFeatureState(...e)}getName(...e){return this.module.GetName(...e)}setVariantSelection(...e){return this.module.ccall(`SetVariantSelection`,`number`,[`number`,`number`],e)}takeAttribute(...e){return this.module.ccall(`TakeAttribute`,`number`,[`number`,`number`,`string`,`bigint`],e)}takeEvictedClientSideAttributeIds(...e){return this.module.TakeEvictedClientSideAttributeIds(...e)}getActiveClientSideIdsCheckSum(){return this.module.GetActiveClientSideIdsCheckSum()}unlockScene(...e){return this.module.ccall(`UnlockScene`,`number`,[`number`],e)}updateSceneExecution(...e){return this.module.ccall(`UpdateSceneExecution`,`number`,[`number`],e)}recordFrameTime(...e){return this.module.ccall(`RecordFrameTime`,`number`,[`number`,`number`],e)}takeRenderRequired(...e){return this.module.TakeRenderRequired(...e)}createDeserializeWorker(e,t,n){for(let e=1;e<n;e+=1)this.#t.add(new It({engine:this}));return!0}cancelRequest(e,t){let n=`${t}-${e}`,r=this.#n.get(n);return r&&(r.cancel(e,t),this.#n.delete(n)),!0}submitToWorker(e,t,n,r){let i=[...this.#t.values()].reduce((e,t)=>e?t.pendingRequests<e.pendingRequests?t:e:t),a=`${t}-${e}`;this.#n.set(a,i);let o=Ct.getConsecutiveIds(Object.keys(Lt).length);return i.ready.then(()=>i.decode(e,t,n,r,o,this.#r)),!0}terminateWorker(){for(let e of this.#t)e.terminate();this.#t.clear()}async requestWorkerHeapSnapshots(e){let t=[...this.#t];return(await Promise.allSettled(t.map(t=>t.ready.then(()=>{let n,r=new Promise(e=>{n=setTimeout(()=>e(null),5e3)});return Promise.race([t.heapSnapshot(e).then(e=>e.snapshotJson),r]).finally(()=>clearTimeout(n))})))).map(e=>e.status===`fulfilled`?e.value:null)}async setWorkerHeapTrackingEnabled(e){await Promise.allSettled([...this.#t].map(t=>t.ready.then(()=>t.heapTrackingControl(e))))}async resetWorkerHeapTracking(){await Promise.allSettled([...this.#t].map(e=>e.ready.then(()=>e.heapTrackingReset())))}static#a(){return{AQUA_USE_SINGLETON_NETWORK_TRANSPORT:`true`,AQUA_SERVER_BASE_URL:`https://app.miris.com/viewer/v1`}}},Bt=[30,60,72,90,120,144,165,240],Vt=class{static _instance;static async instance(){let e=this._instance??=new this;return await e.ready,e}#e;get sharedContext(){return this.#e}#t;get viewerKey(){return this.#t}set viewerKey(e){this.#t=e}#n=new Set;get scenes(){return new Set(this.#n)}#r=[];#i=null;#a=new Set;#o=new Map;#s=!0;get useSphericalHarmonics(){return this.#s}set useSphericalHarmonics(e){this.#s=e}constructor(){this.constructor.prototype._instance||(this.constructor.prototype._instance=this),Object.defineProperties(this,{pending:{value:!0,configurable:!0,enumerable:!0},engine:{value:new M,enumerable:!0}}),Object.defineProperty(this,"ready",{enumerable:!0,value:this.#c()}),console.assert?.(!1===this._xrModeActive),this.#_()}async#c(){let{engine:e}=this;await e.ready,this.#e=this.engine.createContext();let t=1048576,n=new URLSearchParams(window.location.search).get(`aquaMaxCacheSize`),r=0;if(n){let e=parseInt(n,10);!isNaN(e)&&e>0&&(r=e)}return r>0?this.engine.setMaxCacheSize(r*t):navigator.userAgent.includes(`iPhone`)?this.engine.setMaxCacheSize(128*t):navigator.userAgent.includes(`Android`)&&this.engine.setMaxCacheSize(256*t),this.#v(),Object.defineProperty(this,"pending",{value:!1,configurable:!1}),this}dispose(){this.#e&&=(this.engine.destroyContext(this.#e)!==M.AquaStatus.Success&&console.error(`Failed to destroy aqua context with handle '${this.#e}'`),0)}updateParentedTransform(e,t){}#l=function(){let e=[],t=null,n=0;return screen.addEventListener?.(`change`,()=>{e=[],n=0,t=null}),{update(r){if(!n){if(t!==null&&(e.push(r-t),e.length>60&&e.shift(),!n&&e.length===60)){let t=1e3/(e.reduce((e,t)=>e+t,0)/e.length);n=Bt.reduce((e,n)=>Math.abs(n-t)<Math.abs(e-t)?n:e)}t=r}},get nativeHz(){return n}}}();#u=this.#v.bind(this);#d=!1;#f=null;#p=-1;#m=72;#h=null;_xrModeActive=!1;_xrSession=null;_requestAnimationFrame=null;signalResumeFromIdle(){}#g(){let e=new this.engine.RuntimeSettings;e.targetFramesPerSecond=this.#m,e.xrModeActive=this._xrModeActive,this.#h===null?this._xrModeActive&&(e.splatCountBudget=2e5):e.splatCountBudget=this.#h;for(let t of this.#n)t.client.setRuntimeSettings(e);e.delete()}static _XR_TARGET_FRAME_RATE=43;#_(){this._requestAnimationFrame=this._xrModeActive?this._xrSession.requestAnimationFrame.bind(this._xrSession):window.requestAnimationFrame.bind(window)}_setTargetFrameRate(e){this.#m=e,this.#l=null,this.#g()}_setXRModeActive(e,t,n){this._xrModeActive=e,this._xrSession=n??null,t!==void 0&&(this.#m=t),this.#g(),this.#_()}_setSplatCountBudgetOverride(e){this.#h=e,this.#g()}#v(e=0){this.#d||(this._update(e),this._xrModeActive||requestAnimationFrame(this.#u))}_update(e=0){if(e!==0&&e===this.#p)return;if(this.#p=e,this.#l&&(this.#l.update(performance.now()),this.#l.nativeHz>0)){let e=this.#l.nativeHz;this.#m=e<=40?e:40,this.#g(),this.#l=null}let t=performance.now(),n=this.#f===null?null:t-this.#f;this.#f=t;let r=n!==null&&n<=1e3?n:null;for(let e of this.#n){let{client:t}=e;r!==null&&t.recordFrameTime(r),t.updateSceneExecution();let n=t.takeEvictedClientSideAttributeIds();try{let e=n.size();if(e>0){let t=[];for(let r=0;r<e;r++)t.push(Number(n.get(r)));Ct.remove(t)}}finally{n.delete()}let i=this.engine.getActiveClientSideIdsCheckSum();if(Ct.validateCheckSum(i),!t.lockScene())return;try{this.#S(e)}finally{t.unlockScene()}}this.#r.length&&(this.applyChanges(this.#r),this.#r.length=0)}#y(e,t,n){let r=this.engine.malloc(4*t);n(e,r);let i=this.engine.heapF32.subarray(r>>2,(r>>2)+t).slice();return this.engine.free(r),i}getLocalTransform(e,t){if(Number.isInteger(t)&&t>=0)return this.#y(t,16,e.getLocalTransform.bind(e))}getWorldTransform(e,t){if(Number.isInteger(t)&&t>=0)return this.#y(t,16,e.getWorldTransform.bind(e))}#b(){return!!this.#i&&(this.#i.createdObjectsCount>0||this.#i.activatedObjectsCount>0||this.#i.deactivatedObjectsCount>0||this.#i.modifiedObjectsCount>0||this.#i.deletedObjectsCount>0)}#x(e,t,n,r){let{engine:i}=this;if(!e.hasAttribute(t,n))return null;let{ptr:a}=r.$$,o=e.getAttribute(t,n,a);if(o!==M.AquaStatus.Success)return console.warn(`GetAttribute failed for object id ${t} and attribute name ${n}: status ${o}`),null;let s,c;if(r.clientSideId!=0n)({paddedData:s,originalSize:c}=Ct.get(Number(r.clientSideId)));else{let a=Rt(n,0,i.dataPtrView(r));s=a.paddedData,c=a.originalSize;let o=Ct.add({paddedData:a.paddedData,originalSize:a.originalSize}),l=e.takeAttribute(t,n,BigInt(o));if(l!==M.AquaStatus.Success)return Ct.remove(o),console.warn(`Failed to take attribute ${n} for scene object ${t}: status ${l}`),null}return{paddedData:s,originalSize:c}}#S(e){let{engine:t}=this,{client:n,camera:r,lods:i}=e;if(r&&r.update(),this.#i===null&&(this.#i=new t.SceneChangeIds),n.getSceneChangesCounts(this.#i),!this.#b())return;t.allocateSceneChangesArrays(this.#i),n.getSceneChanges(this.#i);let a=new Set;for(let r of t.createdObjectIdsView(this.#i)){let t=n.getSceneObjectType(r);if(t!==M.SceneObjectType.StreamObject){if(t===M.SceneObjectType.ModelRoot){let t=e.getStreamForDescendentId(r);if(!t)continue;let i=new St({id:r,stream:t}),a=this.getLocalTransform(n,r);if(!a)continue;let o=n.getSceneObjectParent(r),s=this.getLocalTransform(n,o);if(!s)continue;let c=this.updateParentedTransform(a,s);if(!c)continue;i.transform=c}else if(t==M.SceneObjectType.GaussianSplats){let t=e.getModelRootForDescendentId(r);if(!t)continue;let o=new bt({id:r,modelRoot:t,lodStore:i});o.transform=this.getLocalTransform(n,r),a.add(r);let s=new xt({type:`created`,lod:o});this.#r.push(s)}else if(t==M.SceneObjectType.VariantSetCollection)e.getStreamForDescendentId(r)?._addVariantCollection(r);else if(t==M.SceneObjectType.VariantSet){let t=e.getStreamForDescendentId(r),i=n.getName(r),a=n.getSceneObjectParent(r);t?._addVariant(a,{id:r,name:i,options:[],nestedSets:[]})}else if(t==M.SceneObjectType.VariantSetOption){let t=e.getStreamForDescendentId(r),i=n.getName(r),a=n.getSceneObjectParent(r);t?._addVariant(a,{id:r,name:i,type:`option`})}}else wt.forId(r)}for(let e of t.deletedObjectIdsView(this.#i)){let t=i.forId(e);if(!t)continue;let n=new xt({type:`deleted`,lod:t});this.#r.push(n)}for(let r of t.modifiedObjectIdsView(this.#i)){let a=n.getSceneObjectType(r);if(a===M.SceneObjectType.LodOctree)e._onFeatureData(r);else if(a===M.SceneObjectType.GaussianSplats){let a=n.getLodIndex(r),o=new t.AttributeInfo,s=new t.AttributeInfo;try{let t=this.#x(n,r,zt.SPARK_EXTENDED_SPLAT_LOW,o),c=null,l=!0;if(t===null?(t=this.#x(n,r,zt.SPARK_PACKED_SPLAT,o),l=!1):c=this.#x(n,r,zt.SPARK_EXTENDED_SPLAT_HIGH,s),t===null){console.error(`Could not retrieve primary splats attribute for scene object ${r}! skipping scene object`);continue}let u=i.forId(r);if(!u){console.warn(`Received modified event for LOD ${r} which does not exist.`);continue}let d=this.#y(u.id,6,n.getWorldBoundingBox.bind(n)),f=this.#y(u.id,6,n.getLocalBoundingBox.bind(n));u.splats=t?.paddedData,u.splatsExtendedData=c?.paddedData??null,u.useExtSplats=l,u.bounds=d,u.localBounds=f,u.lodIndex=a,u.paddingCount=(t?.paddedData.length-t.originalSize)/4,this.useSphericalHarmonics&&this.#C(e,r,u);let p=new xt({type:`modified`,lod:u});if(this.#r.push(p),this.#a.delete(r)){this.#r.push(new xt({type:`activated`,lod:u}));for(let[,e]of this.#o)this.#r.push(new xt({type:`deactivated`,lod:e}));this.#o.clear()}}finally{o.delete(),s.delete()}}}if(this.#r.some(e=>e.type===`created`))try{let e=new t.SceneMetadata;n.getSceneMetadata(e),this.onColorSpaceDetected(e.inputColorSpace===`linear`),e.delete()}catch(e){console.warn(`Failed to read scene metadata:`,e)}let o=!1;for(let e of t.activatedObjectIdsView(this.#i))if(n.getSceneObjectType(e)==M.SceneObjectType.GaussianSplats){let t=i.forId(e);if(t&&t.splats){let e=new xt({type:`activated`,lod:t});this.#r.push(e)}else t&&(this.#a.add(e),o=!0)}for(let e of t.deactivatedObjectIdsView(this.#i))if(n.getSceneObjectType(e)==M.SceneObjectType.GaussianSplats&&(this.#a.delete(e),!a.has(e))){let t=i.forId(e);if(t&&t.splats)if(o)this.#o.set(e,t);else{let e=new xt({type:`deactivated`,lod:t});this.#r.push(e)}}}#C(e,t,n){let{engine:r}=this,{client:i}=e,a=(e,a,o)=>{let s=n.useExtSplats?a:e;if(i.hasAttribute(t,s)){let e=new r.AttributeInfo;try{let n=this.#x(i,t,s,e);n!==null&&o(n.paddedData,e.maxValue.x)}finally{e.delete()}}};a(zt.SPARK_PACKED_SH1,zt.SPARK_EXTENDED_SH1,(e,t)=>n.setSh1(e,t)),a(zt.SPARK_PACKED_SH2,zt.SPARK_EXTENDED_SH2,(e,t)=>n.setSh2(e,t)),a(zt.SPARK_PACKED_SH3,zt.SPARK_EXTENDED_SH3_A,(e,t)=>n.setSh3(e,t)),a(zt.UNUSED,zt.SPARK_EXTENDED_SH3_B,(e,t)=>n.sh3ExtendedData=e)}update(){this.#d=!0,this._update();let e=!1;for(let t of this.#n)t.client.takeRenderRequired()&&(e=!0);return e||this._computeAdditionalRenderNeeded()}applyChanges(e){}_computeAdditionalRenderNeeded(){return!1}onColorSpaceDetected(e){}add(e){this.#n.add(e)}delete(e){this.#n.delete(e),e.miris&&e.close(),this.#n.size===0&&this.#i!==null&&(this.#i.delete(),this.#i=null)}},Ht=class{update(){let{engine:e}=this,{client:t}=this.scene,n=e.malloc(4*this.#i.length);e.heapF32.set(Float32Array.from(this.#i),n/4),t.setMainCameraTransform(n),e.free(n),t.setMainCameraViewFrustum(this.#e,this.#t,this.#n,this.#r)}#e;get aspect(){return this.#e}set aspect(e){this.#e=e}#t;get fov(){return this.#t}set fov(e){this.#t=e}#n;get near(){return this.#n}set near(e){this.#n=e}#r;get far(){return this.#r}set far(e){this.#r=e}#i;get matrix(){return this.#i}set matrix(e){this.#i=e}constructor({aspect:e,fov:t,near:n,far:r,matrix:i,scene:a}){this.#e=e,this.#t=t,this.#n=n,this.#r=r,this.#i=i,Object.defineProperties(this,{scene:{value:a},miris:{value:a.miris},engine:{value:a.miris.engine}})}},Ut=class{#e=null;get viewerKey(){return this.#e}set viewerKey(e){e&&this.setAssetViewerKey(e),this.#e=e}constructor({engine:e,context:t}){Object.defineProperties(this,{engine:{value:e,enumerable:!0},handle:{value:e.createClient(t),enumerable:!0}})}dispose(){this.engine.destroyClient(this.handle)!==M.AquaStatus.Success&&console.error(`Failed to destroy client with handle '${this.handle}'`)}addStreamById(...e){return this.engine.addStreamById(this.handle,...e)}addPrefetchStreamById(...e){return this.engine.addPrefetchStreamById(this.handle,...e)}destroyClient(...e){return this.engine.destroyClient(this.handle,...e)}getAssetsAsync(...e){return this.engine.getAssetsAsync(this.handle,...e)}getAttribute(...e){return this.engine.getAttribute(this.handle,...e)}getDefaultCameraId(...e){return this.engine.getDefaultCameraId(this.handle,...e)}getViewingVolumeId(...e){return this.engine.getViewingVolumeId(this.handle,...e)}getLocalBoundingBox(...e){return this.engine.getLocalBoundingBox(this.handle,...e)}getWorldBoundingBox(...e){return this.engine.getWorldBoundingBox(this.handle,...e)}getLodIndex(...e){return this.engine.getLodIndex(this.handle,...e)}getSceneChanges(...e){return this.engine.getSceneChanges(this.handle,...e)}getSceneChangesCounts(...e){return this.engine.getSceneChangesCounts(this.handle,...e)}getSceneMetadata(...e){return this.engine.getSceneMetadata(this.handle,...e)}getSceneObjectParent(...e){return this.engine.getSceneObjectParent(this.handle,...e)}getSceneObjectType(...e){return this.engine.getSceneObjectType(this.handle,...e)}getLocalTransform(...e){return this.engine.getLocalTransform(this.handle,...e)}getWorldTransform(...e){return this.engine.getWorldTransform(this.handle,...e)}hasAttribute(...e){return this.engine.hasAttribute(this.handle,...e)}isSceneObjectAncestorOf(...e){return this.engine.isSceneObjectAncestorOf(this.handle,...e)}lockScene(...e){return this.engine.lockScene(this.handle,...e)}removeStream(...e){return this.engine.removeStream(this.handle,...e)}setAssetViewerKey(...e){return this.engine.setAssetViewerKey(this.handle,...e)}setClientSpatialFormat(...e){return this.engine.setClientSpatialFormat(this.handle,...e)}setRuntimeSettings(...e){return this.engine.setRuntimeSettings(this.handle,...e)}setMainCameraTransform(...e){return this.engine.setMainCameraTransform(this.handle,...e)}setMainCameraViewFrustum(...e){return this.engine.setMainCameraViewFrustum(this.handle,...e)}setSceneObjectTransform(...e){return this.engine.setSceneObjectTransform(this.handle,...e)}hasFeature(...e){return this.engine.hasFeature(this.handle,...e)}getFeatureVersion(...e){return this.engine.getFeatureVersion(this.handle,...e)}getFeatureState(...e){return this.engine.getFeatureState(this.handle,...e)}getName(...e){return this.engine.getName(this.handle,...e)}setVariantSelection(...e){return this.engine.setVariantSelection(this.handle,...e)}takeAttribute(...e){return this.engine.takeAttribute(this.handle,...e)}takeEvictedClientSideAttributeIds(...e){return this.engine.takeEvictedClientSideAttributeIds(this.handle,...e)}takeRenderRequired(...e){return this.engine.takeRenderRequired(this.handle,...e)}unlockScene(...e){return this.engine.unlockScene(this.handle,...e)}updateSceneExecution(...e){return this.engine.updateSceneExecution(this.handle,...e)}recordFrameTime(...e){return this.engine.recordFrameTime(this.handle,...e)}},Wt=class e extends EventTarget{static#e=new Map;static#t=new Map;#n=null;get camera(){return this.#n}set camera(e){this.#n=e}#r=null;static forId(t){return e.#e.get(t)}static forKey(t){return e.#t.get(t)}#i;get key(){return this.#i??null}set key(t){e.#t.delete(this.key),(t||t===0)&&e.#t.set(t,this),this.#i=t}#a=new Set;#o=new Map;get viewerKey(){return this.client.viewerKey}set viewerKey(e){e&&(this.client.viewerKey=e)}get streams(){return new Set(this.#a)}#s=new yt;get lods(){return this.#s}constructor({miris:t,viewerKey:n}){super(),Object.defineProperties(this,{miris:{value:t,enumerable:!0},engine:{value:t.engine,enumerable:!0},client:{value:new Ut({engine:t.engine,context:t.sharedContext})}}),n&&(this.viewerKey=n);let r=new this.engine.SpatialFormat;r.metersPerUnit=1,r.upAxis=this.engine.UpAxis.Y,r.matrixOrder=this.engine.MatrixOrder.ColumnMajor,r.handedness=this.engine.Handedness.Right,this.client.setClientSpatialFormat(r),r.delete(),e.#e.set(this.id,this),t.add(this)}dispose(){this.close(),this.client.dispose()}#c(){let e=this.client.getDefaultCameraId();this.#r=e>=0?e:null}_getViewingVolumeBounds(){let e=this.client.getViewingVolumeId();if(e<0)return null;let{engine:t,client:n}=this,r=t.malloc(24);try{n.getWorldBoundingBox(e,r);let[i,a,o,s,c,l]=Float32Array.from(t.heapF32.subarray(r/4,r/4+6));return i===void 0||a===void 0||o===void 0||s===void 0||c===void 0||l===void 0?null:{min:[i-s/2,a-c/2,o-l/2],max:[i+s/2,a+c/2,o+l/2]}}finally{t.free(r)}}async fetchAssets(e){if(!this.viewerKey)throw Error(`Could not fetch assets because there is no viewer key`);let t=new this.engine.StringVector,n=[];typeof e==`string`?n=e.split(`,`):e?.[Symbol.iterator]&&(n=[...e]);for(let e of n)t.push_back(e);let r=await this.client.getAssetsAsync(t),i=[],a=new TextDecoder;for(let{name:e,tags:t,thumbnailUrl:n,uuid:o}of r){let r={name:e,thumbnailUrl:n,uuid:o,tags:[]},s=t.size();for(let e=0;e<s;e+=1){let n=t.get(e);n&&(typeof n!=`string`&&(n=a.decode(n)),r.tags.push(n))}i.push(r)}return t.delete(),i}getDefaultCameraTransform(){return this.#r===null?null:this.miris.getWorldTransform(this.client,this.#r)}add(e){this.#a.add(e),this.#o.set(e.id,e)}getStreamForId(e){return this.#o.get(e)}getStreamForDescendentId(e){for(let[t,n]of this.#o)if(this.client.isSceneObjectAncestorOf(t,e))return n;return null}getModelRootForDescendentId(e){for(let[,t]of this.#o)for(let n of t.modelRoots)if(this.client.isSceneObjectAncestorOf(n.id,e))return n;return null}async _getFeatureMesh(e,t,n){if(!this.client.hasFeature(e,t)||this.client.getFeatureState(e,t)!==M.FeatureState.Loaded)return null;let r=this.client.getFeatureVersion(e,t);if(r===1){let t=`${n}_v${r}`,i=new this.engine.AttributeInfo;try{if(this.client.getAttribute(e,t,i.$$.ptr)!==M.AquaStatus.Success)return null;if(i.clientSideId!==0n)return Ct.get(Number(i.clientSideId));let n=this.engine.dataPtrView(i),r=new Uint8Array(n.buffer).subarray(n.byteOffset,n.byteOffset+n.byteLength).slice().buffer,a=Ct.add(r),o=this.client.takeAttribute(e,t,BigInt(a));return o===M.AquaStatus.Success?r:(Ct.remove(a),console.warn(`Failed to take attribute ${t} for scene object ${e}: status ${o}`),null)}finally{i.delete()}}return console.warn(`getFeatureMesh: unsupported version ${r} for feature ${t}`),null}async _getDrMap(e){if(!this.client.hasFeature(e,M.Feature.DrMap)||this.client.getFeatureState(e,M.Feature.DrMap)!==M.FeatureState.Loaded)return null;let t=this.client.getFeatureVersion(e,M.Feature.DrMap);if(t===1||t===2){let n=`drMap_v${t}`,r=new this.engine.AttributeInfo;try{if(this.client.getAttribute(e,n,r.$$.ptr)!==M.AquaStatus.Success)return null;if(r.clientSideId!==0n){let e=Ct.get(Number(r.clientSideId));return e===void 0?null:{bytes:e,version:t}}let i=this.engine.dataPtrView(r),a=new Uint8Array(i.buffer).subarray(i.byteOffset,i.byteOffset+i.byteLength).slice(),o=Ct.add(a);console.log(`_getDrMap is calling takeAttribute for ${n} with id ${o}`);let s=this.client.takeAttribute(e,n,BigInt(o));if(s!==M.AquaStatus.Success){if(Ct.remove(o),this.client.getAttribute(e,n,r.$$.ptr)===M.AquaStatus.Success&&r.clientSideId!==0n){let e=Ct.get(Number(r.clientSideId));return e===void 0?null:{bytes:e,version:t}}return console.warn(`getDrMap: failed to take attribute ${n} for scene object ${e}: status ${s}`),null}return{bytes:a,version:t}}finally{r.delete()}}return console.warn(`getDrMap: unsupported DR map version ${t}`),null}async _onFeatureData(e){let t=await this._getDrMap(e);t!==null&&this.dispatchEvent(new CustomEvent(`drmaploaded`,{detail:{bytes:t.bytes,version:t.version,sceneObjectId:e}}));let n=await this._getFeatureMesh(e,M.Feature.ReflMesh,`reflMesh`);n!==null&&this.dispatchEvent(new CustomEvent(`reflmeshloaded`,{detail:{buffer:n,sceneObjectId:e}}));let r=await this._getFeatureMesh(e,M.Feature.GlassMesh,`glassMesh`);r!==null&&this.dispatchEvent(new CustomEvent(`glassmeshloaded`,{detail:{buffer:r,sceneObjectId:e}}))}_onSceneLoaded(){this.#c(),this.dispatchEvent(new Event(`sceneloaded`))}delete(e){this.#a.delete(e),this.#o.delete(e.id),wt.forId(e.id)&&e.end()}close(){for(let e of this.streams)e.end();e.#e.delete(this.id),e.#t.delete(this.key),this.miris.scenes.has(this)&&this.miris.delete(this)}},Gt,Kt,qt,Jt,Yt,Xt,Zt,Qt,$t=e=>{throw TypeError(e)},en=(e,t,n)=>t.has(e)||$t(`Cannot `+n),tn=(e,t,n)=>(en(e,t,`read from private field`),n?n.call(e):t.get(e)),nn=(e,t,n)=>t.has(e)?$t(`Cannot add the same private member more than once`):t instanceof WeakSet?t.add(e):t.set(e,n),rn=(e,t,n,r)=>(en(e,t,`write to private field`),t.set(e,n),n),an=class extends Oe{constructor(e,t){super(),this.ordering=e,this.setAttribute(`position`,new a(on,3)),this.setIndex(new a(sn,1)),this._maxInstanceCount=e.length,this.instanceCount=t,this.attribute=new He(e,1,!1,1),this.attribute.setUsage(u),this.setAttribute(`splatIndex`,this.attribute)}update(e,t){this.ordering=e,this.attribute.array=e,this.instanceCount=t,this.attribute.addUpdateRange(0,t),this.attribute.needsUpdate=!0}},on=new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),sn=new Uint16Array([0,1,2,0,2,3]),cn=`(function() {
  "use strict";
  let wasm;
  const cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {
    throw Error("TextDecoder not available");
  } };
  if (typeof TextDecoder !== "undefined") {
    cachedTextDecoder.decode();
  }
  let cachedUint8ArrayMemory0 = null;
  function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
      cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
  }
  function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
  }
  function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_3.set(idx, obj);
    return idx;
  }
  function handleError(f, args) {
    try {
      return f.apply(this, args);
    } catch (e) {
      const idx = addToExternrefTable0(e);
      wasm.__wbindgen_exn_store(idx);
    }
  }
  let WASM_VECTOR_LEN = 0;
  const cachedTextEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder("utf-8") : { encode: () => {
    throw Error("TextEncoder not available");
  } };
  const encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
  } : function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
  function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === void 0) {
      const buf = cachedTextEncoder.encode(arg);
      const ptr2 = malloc(buf.length, 1) >>> 0;
      getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
      WASM_VECTOR_LEN = buf.length;
      return ptr2;
    }
    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;
    const mem = getUint8ArrayMemory0();
    let offset = 0;
    for (; offset < len; offset++) {
      const code = arg.charCodeAt(offset);
      if (code > 127) break;
      mem[ptr + offset] = code;
    }
    if (offset !== len) {
      if (offset !== 0) {
        arg = arg.slice(offset);
      }
      ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
      const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
      const ret = encodeString(arg, view);
      offset += ret.written;
      ptr = realloc(ptr, len, offset, 1) >>> 0;
    }
    WASM_VECTOR_LEN = offset;
    return ptr;
  }
  let cachedDataViewMemory0 = null;
  function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
      cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
  }
  function debugString(val) {
    const type = typeof val;
    if (type == "number" || type == "boolean" || val == null) {
      return \`\${val}\`;
    }
    if (type == "string") {
      return \`"\${val}"\`;
    }
    if (type == "symbol") {
      const description = val.description;
      if (description == null) {
        return "Symbol";
      } else {
        return \`Symbol(\${description})\`;
      }
    }
    if (type == "function") {
      const name = val.name;
      if (typeof name == "string" && name.length > 0) {
        return \`Function(\${name})\`;
      } else {
        return "Function";
      }
    }
    if (Array.isArray(val)) {
      const length = val.length;
      let debug = "[";
      if (length > 0) {
        debug += debugString(val[0]);
      }
      for (let i2 = 1; i2 < length; i2++) {
        debug += ", " + debugString(val[i2]);
      }
      debug += "]";
      return debug;
    }
    const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
      className = builtInMatches[1];
    } else {
      return toString.call(val);
    }
    if (className == "Object") {
      try {
        return "Object(" + JSON.stringify(val) + ")";
      } catch (_) {
        return "Object";
      }
    }
    if (val instanceof Error) {
      return \`\${val.name}: \${val.message}
\${val.stack}\`;
    }
    return className;
  }
  function isLikeNone(x2) {
    return x2 === void 0 || x2 === null;
  }
  function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_3.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
  }
  function sort_splats(num_splats, readback, ordering) {
    const ret = wasm.sort_splats(num_splats, readback, ordering);
    return ret >>> 0;
  }
  function sort32_splats(num_splats, readback, ordering) {
    const ret = wasm.sort32_splats(num_splats, readback, ordering);
    return ret >>> 0;
  }
  typeof FinalizationRegistry === "undefined" ? {} : new FinalizationRegistry((ptr) => wasm.__wbg_chunkdecoder_free(ptr >>> 0, 1));
  const CsplatArrayFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
  }, unregister: () => {
  } } : new FinalizationRegistry((ptr) => wasm.__wbg_csplatarray_free(ptr >>> 0, 1));
  class CsplatArray {
    static __wrap(ptr) {
      ptr = ptr >>> 0;
      const obj = Object.create(CsplatArray.prototype);
      obj.__wbg_ptr = ptr;
      CsplatArrayFinalization.register(obj, obj.__wbg_ptr, obj);
      return obj;
    }
    __destroy_into_raw() {
      const ptr = this.__wbg_ptr;
      this.__wbg_ptr = 0;
      CsplatArrayFinalization.unregister(this);
      return ptr;
    }
    free() {
      const ptr = this.__destroy_into_raw();
      wasm.__wbg_csplatarray_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get numSplats() {
      const ret = wasm.__wbg_get_csplatarray_numSplats(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set numSplats(arg0) {
      wasm.__wbg_set_csplatarray_numSplats(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get maxShDegree() {
      const ret = wasm.__wbg_get_csplatarray_maxShDegree(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set maxShDegree(arg0) {
      wasm.__wbg_set_csplatarray_maxShDegree(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Uint8Array} rgba
     */
    inject_rgba8(rgba) {
      wasm.csplatarray_inject_rgba8(this.__wbg_ptr, rgba);
    }
    /**
     * @returns {object}
     */
    to_extsplats() {
      const ret = wasm.csplatarray_to_extsplats(this.__wbg_ptr);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {object}
     */
    to_packedsplats() {
      const ret = wasm.csplatarray_to_packedsplats(this.__wbg_ptr);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {object}
     */
    to_extsplats_lod() {
      const ret = wasm.csplatarray_to_extsplats_lod(this.__wbg_ptr);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {object}
     */
    to_packedsplats_lod() {
      const ret = wasm.csplatarray_to_packedsplats_lod(this.__wbg_ptr);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {number}
     */
    len() {
      const ret = wasm.csplatarray_len(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    has_lod() {
      const ret = wasm.csplatarray_has_lod(this.__wbg_ptr);
      return ret !== 0;
    }
    /**
     * @param {number} lod_base
     * @param {boolean} merge_filter
     */
    tiny_lod(lod_base, merge_filter) {
      wasm.csplatarray_tiny_lod(this.__wbg_ptr, lod_base, merge_filter);
    }
    /**
     * @param {number} lod_base
     */
    bhatt_lod(lod_base) {
      wasm.csplatarray_bhatt_lod(this.__wbg_ptr, lod_base);
    }
  }
  const GsplatArrayFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
  }, unregister: () => {
  } } : new FinalizationRegistry((ptr) => wasm.__wbg_gsplatarray_free(ptr >>> 0, 1));
  class GsplatArray {
    static __wrap(ptr) {
      ptr = ptr >>> 0;
      const obj = Object.create(GsplatArray.prototype);
      obj.__wbg_ptr = ptr;
      GsplatArrayFinalization.register(obj, obj.__wbg_ptr, obj);
      return obj;
    }
    __destroy_into_raw() {
      const ptr = this.__wbg_ptr;
      this.__wbg_ptr = 0;
      GsplatArrayFinalization.unregister(this);
      return ptr;
    }
    free() {
      const ptr = this.__destroy_into_raw();
      wasm.__wbg_gsplatarray_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get numSplats() {
      const ret = wasm.__wbg_get_gsplatarray_numSplats(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set numSplats(arg0) {
      wasm.__wbg_set_gsplatarray_numSplats(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get maxShDegree() {
      const ret = wasm.__wbg_get_gsplatarray_maxShDegree(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set maxShDegree(arg0) {
      wasm.__wbg_set_gsplatarray_maxShDegree(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Uint8Array} rgba
     */
    inject_rgba8(rgba) {
      wasm.gsplatarray_inject_rgba8(this.__wbg_ptr, rgba);
    }
    /**
     * @returns {object}
     */
    to_extsplats() {
      const ret = wasm.gsplatarray_to_extsplats(this.__wbg_ptr);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {any} encoding
     * @returns {object}
     */
    to_packedsplats(encoding) {
      const ret = wasm.gsplatarray_to_packedsplats(this.__wbg_ptr, encoding);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {object}
     */
    to_extsplats_lod() {
      const ret = wasm.gsplatarray_to_extsplats_lod(this.__wbg_ptr);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {any} encoding
     * @returns {object}
     */
    to_packedsplats_lod(encoding) {
      const ret = wasm.gsplatarray_to_packedsplats_lod(this.__wbg_ptr, encoding);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {number}
     */
    len() {
      const ret = wasm.gsplatarray_len(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    has_lod() {
      const ret = wasm.csplatarray_has_lod(this.__wbg_ptr);
      return ret !== 0;
    }
    /**
     * @param {number} lod_base
     * @param {boolean} merge_filter
     */
    tiny_lod(lod_base, merge_filter) {
      wasm.gsplatarray_tiny_lod(this.__wbg_ptr, lod_base, merge_filter);
    }
    /**
     * @param {number} lod_base
     */
    bhatt_lod(lod_base) {
      wasm.gsplatarray_bhatt_lod(this.__wbg_ptr, lod_base);
    }
  }
  async function __wbg_load(module, imports) {
    if (typeof Response === "function" && module instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === "function") {
        try {
          return await WebAssembly.instantiateStreaming(module, imports);
        } catch (e) {
          if (module.headers.get("Content-Type") != "application/wasm") {
            console.warn("\`WebAssembly.instantiateStreaming\` failed because your server does not serve Wasm with \`application/wasm\` MIME type. Falling back to \`WebAssembly.instantiate\` which is slower. Original error:\\n", e);
          } else {
            throw e;
          }
        }
      }
      const bytes = await module.arrayBuffer();
      return await WebAssembly.instantiate(bytes, imports);
    } else {
      const instance = await WebAssembly.instantiate(module, imports);
      if (instance instanceof WebAssembly.Instance) {
        return { instance, module };
      } else {
        return instance;
      }
    }
  }
  function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
      const ret = arg0.buffer;
      return ret;
    };
    imports.wbg.__wbg_csplatarray_new = function(arg0) {
      const ret = CsplatArray.__wrap(arg0);
      return ret;
    };
    imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
      let deferred0_0;
      let deferred0_1;
      try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
      } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
      }
    };
    imports.wbg.__wbg_get_67b2ba62fc30de12 = function() {
      return handleError(function(arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_get_b9b93047fe3cf45b = function(arg0, arg1) {
      const ret = arg0[arg1 >>> 0];
      return ret;
    };
    imports.wbg.__wbg_getwithrefkey_1dc361bd10053bfe = function(arg0, arg1) {
      const ret = arg0[arg1];
      return ret;
    };
    imports.wbg.__wbg_gsplatarray_new = function(arg0) {
      const ret = GsplatArray.__wrap(arg0);
      return ret;
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_e14585432e3737fc = function(arg0) {
      let result;
      try {
        result = arg0 instanceof ArrayBuffer;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_17156bcf118086a9 = function(arg0) {
      let result;
      try {
        result = arg0 instanceof Uint8Array;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    };
    imports.wbg.__wbg_length_6ca527665d89694d = function(arg0) {
      const ret = arg0.length;
      return ret;
    };
    imports.wbg.__wbg_length_8cfd2c6409af88ad = function(arg0) {
      const ret = arg0.length;
      return ret;
    };
    imports.wbg.__wbg_length_a446193dc22c12f8 = function(arg0) {
      const ret = arg0.length;
      return ret;
    };
    imports.wbg.__wbg_length_e2d2a49132c1b256 = function(arg0) {
      const ret = arg0.length;
      return ret;
    };
    imports.wbg.__wbg_log_c222819a41e063d3 = function(arg0) {
      console.log(arg0);
    };
    imports.wbg.__wbg_new_405e22f390576ce2 = function() {
      const ret = new Object();
      return ret;
    };
    imports.wbg.__wbg_new_78feb108b6472713 = function() {
      const ret = new Array();
      return ret;
    };
    imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
      const ret = new Error();
      return ret;
    };
    imports.wbg.__wbg_new_9fee97a409b32b68 = function(arg0) {
      const ret = new Uint16Array(arg0);
      return ret;
    };
    imports.wbg.__wbg_new_a12002a7f91c75be = function(arg0) {
      const ret = new Uint8Array(arg0);
      return ret;
    };
    imports.wbg.__wbg_new_e3b321dcfef89fc7 = function(arg0) {
      const ret = new Uint32Array(arg0);
      return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_f1dead44d1fc7212 = function(arg0, arg1, arg2) {
      const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
      return ret;
    };
    imports.wbg.__wbg_newwithlength_bd3de93688d68fbc = function(arg0) {
      const ret = new Uint32Array(arg0 >>> 0);
      return ret;
    };
    imports.wbg.__wbg_push_737cfc8c1432c2c6 = function(arg0, arg1) {
      const ret = arg0.push(arg1);
      return ret;
    };
    imports.wbg.__wbg_set_3f1d0b984ed272ed = function(arg0, arg1, arg2) {
      arg0[arg1] = arg2;
    };
    imports.wbg.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
      arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_set_bb8cecf6a62b9f46 = function() {
      return handleError(function(arg0, arg1, arg2) {
        const ret = Reflect.set(arg0, arg1, arg2);
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_set_d23661d19148b229 = function(arg0, arg1, arg2) {
      arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_set_f4f1f0daa30696fc = function(arg0, arg1, arg2) {
      arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_setindex_c430b78b97744fcc = function(arg0, arg1, arg2) {
      arg0[arg1 >>> 0] = arg2 >>> 0;
    };
    imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
      const ret = arg1.stack;
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_subarray_3aaeec89bb2544f0 = function(arg0, arg1, arg2) {
      const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
      return ret;
    };
    imports.wbg.__wbg_subarray_769e1e0f81bb259b = function(arg0, arg1, arg2) {
      const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
      return ret;
    };
    imports.wbg.__wbg_subarray_aa9065fa9dc5df96 = function(arg0, arg1, arg2) {
      const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
      return ret;
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
      const v = arg0;
      const ret = typeof v === "boolean" ? v ? 1 : 0 : 2;
      return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
      const ret = debugString(arg1);
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
      const ret = new Error(getStringFromWasm0(arg0, arg1));
      return ret;
    };
    imports.wbg.__wbindgen_in = function(arg0, arg1) {
      const ret = arg0 in arg1;
      return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
      const table = wasm.__wbindgen_export_3;
      const offset = table.grow(4);
      table.set(0, void 0);
      table.set(offset + 0, void 0);
      table.set(offset + 1, null);
      table.set(offset + 2, true);
      table.set(offset + 3, false);
    };
    imports.wbg.__wbindgen_is_falsy = function(arg0) {
      const ret = !arg0;
      return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
      const val = arg0;
      const ret = typeof val === "object" && val !== null;
      return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
      const ret = arg0 === void 0;
      return ret;
    };
    imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
      const ret = arg0 == arg1;
      return ret;
    };
    imports.wbg.__wbindgen_memory = function() {
      const ret = wasm.memory;
      return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
      const obj = arg1;
      const ret = typeof obj === "number" ? obj : void 0;
      getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
      const ret = arg0;
      return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
      const obj = arg1;
      const ret = typeof obj === "string" ? obj : void 0;
      var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
      const ret = getStringFromWasm0(arg0, arg1);
      return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    };
    return imports;
  }
  function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
  }
  async function __wbg_init(module_or_path) {
    if (wasm !== void 0) return wasm;
    if (typeof module_or_path !== "undefined") {
      if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
        ({ module_or_path } = module_or_path);
      } else {
        console.warn("using deprecated parameters for the initialization function; pass a single object instead");
      }
    }
    if (typeof module_or_path === "undefined") {
      module_or_path = "";
    }
    const imports = __wbg_get_imports();
    if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
      module_or_path = fetch(module_or_path);
    }
    const { instance, module } = await __wbg_load(await module_or_path, imports);
    return __wbg_finalize_init(instance, module);
  }
  var ch2 = {};
  var wk = (function(c, id, msg, transfer, cb) {
    var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
      c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
    ], { type: "text/javascript" }))));
    w.onmessage = function(e) {
      var d = e.data, ed = d.$e$;
      if (ed) {
        var err2 = new Error(ed[0]);
        err2["code"] = ed[1];
        err2.stack = ed[2];
        cb(err2, null);
      } else
        cb(null, d);
    };
    w.postMessage(msg, transfer);
    return w;
  });
  var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start) {
    var b = new u16(31);
    for (var i2 = 0; i2 < 31; ++i2) {
      b[i2] = start += 1 << eb[i2 - 1];
    }
    var r = new i32(b[30]);
    for (var i2 = 1; i2 < 30; ++i2) {
      for (var j = b[i2]; j < b[i2 + 1]; ++j) {
        r[j] = j - b[i2] << 5 | i2;
      }
    }
    return { b, r };
  };
  var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0), fd = _b.b;
  var rev = new u16(32768);
  for (var i = 0; i < 32768; ++i) {
    var x = (i & 43690) >> 1 | (i & 21845) << 1;
    x = (x & 52428) >> 2 | (x & 13107) << 2;
    x = (x & 61680) >> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
  }
  var hMap = (function(cd, mb, r) {
    var s = cd.length;
    var i2 = 0;
    var l = new u16(mb);
    for (; i2 < s; ++i2) {
      if (cd[i2])
        ++l[cd[i2] - 1];
    }
    var le = new u16(mb);
    for (i2 = 1; i2 < mb; ++i2) {
      le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
    }
    var co;
    if (r) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          var sv = i2 << 4 | cd[i2];
          var r_1 = mb - cd[i2];
          var v = le[cd[i2] - 1]++ << r_1;
          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
            co[rev[v] >> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s);
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];
        }
      }
    }
    return co;
  });
  var flt = new u8(288);
  for (var i = 0; i < 144; ++i)
    flt[i] = 8;
  for (var i = 144; i < 256; ++i)
    flt[i] = 9;
  for (var i = 256; i < 280; ++i)
    flt[i] = 7;
  for (var i = 280; i < 288; ++i)
    flt[i] = 8;
  var fdt = new u8(32);
  for (var i = 0; i < 32; ++i)
    fdt[i] = 5;
  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
  var max = function(a) {
    var m = a[0];
    for (var i2 = 1; i2 < a.length; ++i2) {
      if (a[i2] > m)
        m = a[i2];
    }
    return m;
  };
  var bits = function(d, p, m) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
  };
  var bits16 = function(d, p) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
  };
  var shft = function(p) {
    return (p + 7) / 8 | 0;
  };
  var slc = function(v, s, e) {
    if (s == null || s < 0)
      s = 0;
    if (e == null || e > v.length)
      e = v.length;
    return new u8(v.subarray(s, e));
  };
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e, err);
    if (!nt)
      throw e;
    return e;
  };
  var inflt = function(dat, st, buf, dict) {
    var sl = dat.length, dl = dict ? dict.length : 0;
    if (!sl || st.f && !st.l)
      return buf || new u8(0);
    var noBuf = !buf;
    var resize = noBuf || st.i != 2;
    var noSt = st.i;
    if (noBuf)
      buf = new u8(sl * 3);
    var cbuf = function(l2) {
      var bl = buf.length;
      if (l2 > bl) {
        var nbuf = new u8(Math.max(bl * 2, l2));
        nbuf.set(buf);
        buf = nbuf;
      }
    };
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    var tbts = sl * 8;
    do {
      if (!lm) {
        final = bits(dat, pos, 1);
        var type = bits(dat, pos + 1, 3);
        pos += 3;
        if (!type) {
          var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
          if (t > sl) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + l);
          buf.set(dat.subarray(s, t), bt);
          st.b = bt += l, st.p = pos = t * 8, st.f = final;
          continue;
        } else if (type == 1)
          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
        else if (type == 2) {
          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
          var tl = hLit + bits(dat, pos + 5, 31) + 1;
          pos += 14;
          var ldt = new u8(tl);
          var clt = new u8(19);
          for (var i2 = 0; i2 < hcLen; ++i2) {
            clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
          }
          pos += hcLen * 3;
          var clb = max(clt), clbmsk = (1 << clb) - 1;
          var clm = hMap(clt, clb, 1);
          for (var i2 = 0; i2 < tl; ) {
            var r = clm[bits(dat, pos, clbmsk)];
            pos += r & 15;
            var s = r >> 4;
            if (s < 16) {
              ldt[i2++] = s;
            } else {
              var c = 0, n = 0;
              if (s == 16)
                n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i2 - 1];
              else if (s == 17)
                n = 3 + bits(dat, pos, 7), pos += 3;
              else if (s == 18)
                n = 11 + bits(dat, pos, 127), pos += 7;
              while (n--)
                ldt[i2++] = c;
            }
          }
          var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
          lbt = max(lt);
          dbt = max(dt);
          lm = hMap(lt, lbt, 1);
          dm = hMap(dt, dbt, 1);
        } else
          err(1);
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
      }
      if (resize)
        cbuf(bt + 131072);
      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
      var lpos = pos;
      for (; ; lpos = pos) {
        var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
        pos += c & 15;
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (!c)
          err(2);
        if (sym < 256)
          buf[bt++] = sym;
        else if (sym == 256) {
          lpos = pos, lm = null;
          break;
        } else {
          var add = sym - 254;
          if (sym > 264) {
            var i2 = sym - 257, b = fleb[i2];
            add = bits(dat, pos, (1 << b) - 1) + fl[i2];
            pos += b;
          }
          var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
          if (!d)
            err(3);
          pos += d & 15;
          var dt = fd[dsym];
          if (dsym > 3) {
            var b = fdeb[dsym];
            dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
          }
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + 131072);
          var end = bt + add;
          if (bt < dt) {
            var shift = dl - dt, dend = Math.min(dt, end);
            if (shift + bt < 0)
              err(3);
            for (; bt < dend; ++bt)
              buf[bt] = dict[shift + bt];
          }
          for (; bt < end; ++bt)
            buf[bt] = buf[bt - dt];
        }
      }
      st.l = lm, st.p = lpos, st.b = bt, st.f = final;
      if (lm)
        final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
  };
  var et = /* @__PURE__ */ new u8(0);
  var mrg = function(a, b) {
    var o = {};
    for (var k in a)
      o[k] = a[k];
    for (var k in b)
      o[k] = b[k];
    return o;
  };
  var wcln = function(fn, fnStr, td2) {
    var dt = fn();
    var st = fn.toString();
    var ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/\\s+/g, "").split(",");
    for (var i2 = 0; i2 < dt.length; ++i2) {
      var v = dt[i2], k = ks[i2];
      if (typeof v == "function") {
        fnStr += ";" + k + "=";
        var st_1 = v.toString();
        if (v.prototype) {
          if (st_1.indexOf("[native code]") != -1) {
            var spInd = st_1.indexOf(" ", 8) + 1;
            fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
          } else {
            fnStr += st_1;
            for (var t in v.prototype)
              fnStr += ";" + k + ".prototype." + t + "=" + v.prototype[t].toString();
          }
        } else
          fnStr += st_1;
      } else
        td2[k] = v;
    }
    return fnStr;
  };
  var ch = [];
  var cbfs = function(v) {
    var tl = [];
    for (var k in v) {
      if (v[k].buffer) {
        tl.push((v[k] = new v[k].constructor(v[k])).buffer);
      }
    }
    return tl;
  };
  var wrkr = function(fns, init, id, cb) {
    if (!ch[id]) {
      var fnStr = "", td_1 = {}, m = fns.length - 1;
      for (var i2 = 0; i2 < m; ++i2)
        fnStr = wcln(fns[i2], fnStr, td_1);
      ch[id] = { c: wcln(fns[m], fnStr, td_1), e: td_1 };
    }
    var td2 = mrg({}, ch[id].e);
    return wk(ch[id].c + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td2, cbfs(td2), cb);
  };
  var bInflt = function() {
    return [u8, u16, i32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gopt];
  };
  var pbf = function(msg) {
    return postMessage(msg, [msg.buffer]);
  };
  var gopt = function(o) {
    return o && {
      out: o.size && new u8(o.size),
      dictionary: o.dictionary
    };
  };
  var cbify = function(dat, opts, fns, init, id, cb) {
    var w = wrkr(fns, init, id, function(err2, dat2) {
      w.terminate();
      cb(err2, dat2);
    });
    w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
    return function() {
      w.terminate();
    };
  };
  var b2 = function(d, b) {
    return d[b] | d[b + 1] << 8;
  };
  var b4 = function(d, b) {
    return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
  };
  var b8 = function(d, b) {
    return b4(d, b) + b4(d, b + 4) * 4294967296;
  };
  var gzs = function(d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8)
      err(6, "invalid gzip data");
    var flg = d[3];
    var st = 10;
    if (flg & 4)
      st += (d[10] | d[11] << 8) + 2;
    for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
      ;
    return st + (flg & 2);
  };
  var Inflate = /* @__PURE__ */ (function() {
    function Inflate2(opts, cb) {
      if (typeof opts == "function")
        cb = opts, opts = {};
      this.ondata = cb;
      var dict = opts && opts.dictionary && opts.dictionary.subarray(-32768);
      this.s = { i: 0, b: dict ? dict.length : 0 };
      this.o = new u8(32768);
      this.p = new u8(0);
      if (dict)
        this.o.set(dict);
    }
    Inflate2.prototype.e = function(c) {
      if (!this.ondata)
        err(5);
      if (this.d)
        err(4);
      if (!this.p.length)
        this.p = c;
      else if (c.length) {
        var n = new u8(this.p.length + c.length);
        n.set(this.p), n.set(c, this.p.length), this.p = n;
      }
    };
    Inflate2.prototype.c = function(final) {
      this.s.i = +(this.d = final || false);
      var bts = this.s.b;
      var dt = inflt(this.p, this.s, this.o);
      this.ondata(slc(dt, bts, this.s.b), this.d);
      this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
      this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
    };
    Inflate2.prototype.push = function(chunk, final) {
      this.e(chunk), this.c(final);
    };
    return Inflate2;
  })();
  function inflate(data, opts, cb) {
    if (!cb)
      cb = opts, opts = {};
    if (typeof cb != "function")
      err(7);
    return cbify(data, opts, [
      bInflt
    ], function(ev) {
      return pbf(inflateSync(ev.data[0], gopt(ev.data[1])));
    }, 1, cb);
  }
  function inflateSync(data, opts) {
    return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
  }
  var Gunzip = /* @__PURE__ */ (function() {
    function Gunzip2(opts, cb) {
      this.v = 1;
      this.r = 0;
      Inflate.call(this, opts, cb);
    }
    Gunzip2.prototype.push = function(chunk, final) {
      Inflate.prototype.e.call(this, chunk);
      this.r += chunk.length;
      if (this.v) {
        var p = this.p.subarray(this.v - 1);
        var s = p.length > 3 ? gzs(p) : 4;
        if (s > p.length) {
          if (!final)
            return;
        } else if (this.v > 1 && this.onmember) {
          this.onmember(this.r - p.length);
        }
        this.p = p.subarray(s), this.v = 0;
      }
      Inflate.prototype.c.call(this, final);
      if (this.s.f && !this.s.l && !final) {
        this.v = shft(this.s.p) + 9;
        this.s = { i: 0 };
        this.o = new u8(0);
        this.push(new u8(0), final);
      }
    };
    return Gunzip2;
  })();
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  try {
    td.decode(et, { stream: true });
  } catch (e) {
  }
  var dutf8 = function(d) {
    for (var r = "", i2 = 0; ; ) {
      var c = d[i2++];
      var eb = (c > 127) + (c > 223) + (c > 239);
      if (i2 + eb > d.length)
        return { s: r, r: slc(d, i2 - 1) };
      if (!eb)
        r += String.fromCharCode(c);
      else if (eb == 3) {
        c = ((c & 15) << 18 | (d[i2++] & 63) << 12 | (d[i2++] & 63) << 6 | d[i2++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
      } else if (eb & 1)
        r += String.fromCharCode((c & 31) << 6 | d[i2++] & 63);
      else
        r += String.fromCharCode((c & 15) << 12 | (d[i2++] & 63) << 6 | d[i2++] & 63);
    }
  };
  function strFromU8(dat, latin1) {
    if (latin1) {
      var r = "";
      for (var i2 = 0; i2 < dat.length; i2 += 16384)
        r += String.fromCharCode.apply(null, dat.subarray(i2, i2 + 16384));
      return r;
    } else if (td) {
      return td.decode(dat);
    } else {
      var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;
      if (r.length)
        err(8);
      return s;
    }
  }
  var slzh = function(d, b) {
    return b + 30 + b2(d, b + 26) + b2(d, b + 28);
  };
  var zh = function(d, b, z) {
    var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
    var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];
    return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
  };
  var z64e = function(d, b) {
    for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
      ;
    return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
  };
  var mt = typeof queueMicrotask == "function" ? queueMicrotask : typeof setTimeout == "function" ? setTimeout : function(fn) {
    fn();
  };
  function unzip(data, opts, cb) {
    if (!cb)
      cb = opts, opts = {};
    if (typeof cb != "function")
      err(7);
    var term = [];
    var tAll = function() {
      for (var i3 = 0; i3 < term.length; ++i3)
        term[i3]();
    };
    var files = {};
    var cbd = function(a, b) {
      mt(function() {
        cb(a, b);
      });
    };
    mt(function() {
      cbd = cb;
    });
    var e = data.length - 22;
    for (; b4(data, e) != 101010256; --e) {
      if (!e || data.length - e > 65558) {
        cbd(err(13, 0, 1), null);
        return tAll;
      }
    }
    var lft = b2(data, e + 8);
    if (lft) {
      var c = lft;
      var o = b4(data, e + 16);
      var z = o == 4294967295 || c == 65535;
      if (z) {
        var ze = b4(data, e - 12);
        z = b4(data, ze) == 101075792;
        if (z) {
          c = lft = b4(data, ze + 32);
          o = b4(data, ze + 48);
        }
      }
      var fltr = opts && opts.filter;
      var _loop_3 = function(i3) {
        var _a2 = zh(data, o, z), c_1 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
        o = no;
        var cbl = function(e2, d) {
          if (e2) {
            tAll();
            cbd(e2, null);
          } else {
            if (d)
              files[fn] = d;
            if (!--lft)
              cbd(null, files);
          }
        };
        if (!fltr || fltr({
          name: fn,
          size: sc,
          originalSize: su,
          compression: c_1
        })) {
          if (!c_1)
            cbl(null, slc(data, b, b + sc));
          else if (c_1 == 8) {
            var infl = data.subarray(b, b + sc);
            if (su < 524288 || sc > 0.8 * su) {
              try {
                cbl(null, inflateSync(infl, { out: new u8(su) }));
              } catch (e2) {
                cbl(e2, null);
              }
            } else
              term.push(inflate(infl, { size: su }, cbl));
          } else
            cbl(err(14, "unknown compression type " + c_1, 1), null);
        } else
          cbl(null, null);
      };
      for (var i2 = 0; i2 < c; ++i2) {
        _loop_3(i2);
      }
    } else
      cbd(null, {});
    return tAll;
  }
  function unzipSync(data, opts) {
    var files = {};
    var e = data.length - 22;
    for (; b4(data, e) != 101010256; --e) {
      if (!e || data.length - e > 65558)
        err(13);
    }
    var c = b2(data, e + 8);
    if (!c)
      return {};
    var o = b4(data, e + 16);
    var z = o == 4294967295 || c == 65535;
    if (z) {
      var ze = b4(data, e - 12);
      z = b4(data, ze) == 101075792;
      if (z) {
        c = b4(data, ze + 32);
        o = b4(data, ze + 48);
      }
    }
    var fltr = opts && opts.filter;
    for (var i2 = 0; i2 < c; ++i2) {
      var _a2 = zh(data, o, z), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
      o = no;
      if (!fltr || fltr({
        name: fn,
        size: sc,
        originalSize: su,
        compression: c_2
      })) {
        if (!c_2)
          files[fn] = slc(data, b, b + sc);
        else if (c_2 == 8)
          files[fn] = inflateSync(data.subarray(b, b + sc), { out: new u8(su) });
        else
          err(14, "unknown compression type " + c_2);
      }
    }
    return files;
  }
  const REVISION = "182";
  const NoColorSpace = "";
  const SRGBColorSpace = "srgb";
  const LinearSRGBColorSpace = "srgb-linear";
  const LinearTransfer = "linear";
  const SRGBTransfer = "srgb";
  const _cache = {};
  function warn(...params) {
    const message = "THREE." + params.shift();
    {
      console.warn(message, ...params);
    }
  }
  function warnOnce(...params) {
    const message = params.join(" ");
    if (message in _cache) return;
    _cache[message] = true;
    warn(...params);
  }
  function clamp(value, min, max2) {
    return Math.max(min, Math.min(max2, value));
  }
  function euclideanModulo(n, m) {
    return (n % m + m) % m;
  }
  function lerp(x2, y, t) {
    return (1 - t) * x2 + t * y;
  }
  class Quaternion {
    /**
     * Constructs a new quaternion.
     *
     * @param {number} [x=0] - The x value of this quaternion.
     * @param {number} [y=0] - The y value of this quaternion.
     * @param {number} [z=0] - The z value of this quaternion.
     * @param {number} [w=1] - The w value of this quaternion.
     */
    constructor(x2 = 0, y = 0, z = 0, w = 1) {
      this.isQuaternion = true;
      this._x = x2;
      this._y = y;
      this._z = z;
      this._w = w;
    }
    /**
     * Interpolates between two quaternions via SLERP. This implementation assumes the
     * quaternion data are managed in flat arrays.
     *
     * @param {Array<number>} dst - The destination array.
     * @param {number} dstOffset - An offset into the destination array.
     * @param {Array<number>} src0 - The source array of the first quaternion.
     * @param {number} srcOffset0 - An offset into the first source array.
     * @param {Array<number>} src1 -  The source array of the second quaternion.
     * @param {number} srcOffset1 - An offset into the second source array.
     * @param {number} t - The interpolation factor in the range \`[0,1]\`.
     * @see {@link Quaternion#slerp}
     */
    static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
      let x0 = src0[srcOffset0 + 0], y0 = src0[srcOffset0 + 1], z0 = src0[srcOffset0 + 2], w0 = src0[srcOffset0 + 3];
      let x1 = src1[srcOffset1 + 0], y1 = src1[srcOffset1 + 1], z1 = src1[srcOffset1 + 2], w1 = src1[srcOffset1 + 3];
      if (t <= 0) {
        dst[dstOffset + 0] = x0;
        dst[dstOffset + 1] = y0;
        dst[dstOffset + 2] = z0;
        dst[dstOffset + 3] = w0;
        return;
      }
      if (t >= 1) {
        dst[dstOffset + 0] = x1;
        dst[dstOffset + 1] = y1;
        dst[dstOffset + 2] = z1;
        dst[dstOffset + 3] = w1;
        return;
      }
      if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
        let dot = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1;
        if (dot < 0) {
          x1 = -x1;
          y1 = -y1;
          z1 = -z1;
          w1 = -w1;
          dot = -dot;
        }
        let s = 1 - t;
        if (dot < 0.9995) {
          const theta = Math.acos(dot);
          const sin = Math.sin(theta);
          s = Math.sin(s * theta) / sin;
          t = Math.sin(t * theta) / sin;
          x0 = x0 * s + x1 * t;
          y0 = y0 * s + y1 * t;
          z0 = z0 * s + z1 * t;
          w0 = w0 * s + w1 * t;
        } else {
          x0 = x0 * s + x1 * t;
          y0 = y0 * s + y1 * t;
          z0 = z0 * s + z1 * t;
          w0 = w0 * s + w1 * t;
          const f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
          x0 *= f;
          y0 *= f;
          z0 *= f;
          w0 *= f;
        }
      }
      dst[dstOffset] = x0;
      dst[dstOffset + 1] = y0;
      dst[dstOffset + 2] = z0;
      dst[dstOffset + 3] = w0;
    }
    /**
     * Multiplies two quaternions. This implementation assumes the quaternion data are managed
     * in flat arrays.
     *
     * @param {Array<number>} dst - The destination array.
     * @param {number} dstOffset - An offset into the destination array.
     * @param {Array<number>} src0 - The source array of the first quaternion.
     * @param {number} srcOffset0 - An offset into the first source array.
     * @param {Array<number>} src1 -  The source array of the second quaternion.
     * @param {number} srcOffset1 - An offset into the second source array.
     * @return {Array<number>} The destination array.
     * @see {@link Quaternion#multiplyQuaternions}.
     */
    static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
      const x0 = src0[srcOffset0];
      const y0 = src0[srcOffset0 + 1];
      const z0 = src0[srcOffset0 + 2];
      const w0 = src0[srcOffset0 + 3];
      const x1 = src1[srcOffset1];
      const y1 = src1[srcOffset1 + 1];
      const z1 = src1[srcOffset1 + 2];
      const w1 = src1[srcOffset1 + 3];
      dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
      dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
      dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
      dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;
      return dst;
    }
    /**
     * The x value of this quaternion.
     *
     * @type {number}
     * @default 0
     */
    get x() {
      return this._x;
    }
    set x(value) {
      this._x = value;
      this._onChangeCallback();
    }
    /**
     * The y value of this quaternion.
     *
     * @type {number}
     * @default 0
     */
    get y() {
      return this._y;
    }
    set y(value) {
      this._y = value;
      this._onChangeCallback();
    }
    /**
     * The z value of this quaternion.
     *
     * @type {number}
     * @default 0
     */
    get z() {
      return this._z;
    }
    set z(value) {
      this._z = value;
      this._onChangeCallback();
    }
    /**
     * The w value of this quaternion.
     *
     * @type {number}
     * @default 1
     */
    get w() {
      return this._w;
    }
    set w(value) {
      this._w = value;
      this._onChangeCallback();
    }
    /**
     * Sets the quaternion components.
     *
     * @param {number} x - The x value of this quaternion.
     * @param {number} y - The y value of this quaternion.
     * @param {number} z - The z value of this quaternion.
     * @param {number} w - The w value of this quaternion.
     * @return {Quaternion} A reference to this quaternion.
     */
    set(x2, y, z, w) {
      this._x = x2;
      this._y = y;
      this._z = z;
      this._w = w;
      this._onChangeCallback();
      return this;
    }
    /**
     * Returns a new quaternion with copied values from this instance.
     *
     * @return {Quaternion} A clone of this instance.
     */
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
    /**
     * Copies the values of the given quaternion to this instance.
     *
     * @param {Quaternion} quaternion - The quaternion to copy.
     * @return {Quaternion} A reference to this quaternion.
     */
    copy(quaternion) {
      this._x = quaternion.x;
      this._y = quaternion.y;
      this._z = quaternion.z;
      this._w = quaternion.w;
      this._onChangeCallback();
      return this;
    }
    /**
     * Sets this quaternion from the rotation specified by the given
     * Euler angles.
     *
     * @param {Euler} euler - The Euler angles.
     * @param {boolean} [update=true] - Whether the internal \`onChange\` callback should be executed or not.
     * @return {Quaternion} A reference to this quaternion.
     */
    setFromEuler(euler, update = true) {
      const x2 = euler._x, y = euler._y, z = euler._z, order = euler._order;
      const cos = Math.cos;
      const sin = Math.sin;
      const c1 = cos(x2 / 2);
      const c2 = cos(y / 2);
      const c3 = cos(z / 2);
      const s1 = sin(x2 / 2);
      const s2 = sin(y / 2);
      const s3 = sin(z / 2);
      switch (order) {
        case "XYZ":
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;
        case "YXZ":
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;
        case "ZXY":
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;
        case "ZYX":
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;
        case "YZX":
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;
        case "XZY":
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;
        default:
          warn("Quaternion: .setFromEuler() encountered an unknown order: " + order);
      }
      if (update === true) this._onChangeCallback();
      return this;
    }
    /**
     * Sets this quaternion from the given axis and angle.
     *
     * @param {Vector3} axis - The normalized axis.
     * @param {number} angle - The angle in radians.
     * @return {Quaternion} A reference to this quaternion.
     */
    setFromAxisAngle(axis, angle) {
      const halfAngle = angle / 2, s = Math.sin(halfAngle);
      this._x = axis.x * s;
      this._y = axis.y * s;
      this._z = axis.z * s;
      this._w = Math.cos(halfAngle);
      this._onChangeCallback();
      return this;
    }
    /**
     * Sets this quaternion from the given rotation matrix.
     *
     * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
     * @return {Quaternion} A reference to this quaternion.
     */
    setFromRotationMatrix(m) {
      const te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;
      if (trace > 0) {
        const s = 0.5 / Math.sqrt(trace + 1);
        this._w = 0.25 / s;
        this._x = (m32 - m23) * s;
        this._y = (m13 - m31) * s;
        this._z = (m21 - m12) * s;
      } else if (m11 > m22 && m11 > m33) {
        const s = 2 * Math.sqrt(1 + m11 - m22 - m33);
        this._w = (m32 - m23) / s;
        this._x = 0.25 * s;
        this._y = (m12 + m21) / s;
        this._z = (m13 + m31) / s;
      } else if (m22 > m33) {
        const s = 2 * Math.sqrt(1 + m22 - m11 - m33);
        this._w = (m13 - m31) / s;
        this._x = (m12 + m21) / s;
        this._y = 0.25 * s;
        this._z = (m23 + m32) / s;
      } else {
        const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
        this._w = (m21 - m12) / s;
        this._x = (m13 + m31) / s;
        this._y = (m23 + m32) / s;
        this._z = 0.25 * s;
      }
      this._onChangeCallback();
      return this;
    }
    /**
     * Sets this quaternion to the rotation required to rotate the direction vector
     * \`vFrom\` to the direction vector \`vTo\`.
     *
     * @param {Vector3} vFrom - The first (normalized) direction vector.
     * @param {Vector3} vTo - The second (normalized) direction vector.
     * @return {Quaternion} A reference to this quaternion.
     */
    setFromUnitVectors(vFrom, vTo) {
      let r = vFrom.dot(vTo) + 1;
      if (r < 1e-8) {
        r = 0;
        if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
          this._x = -vFrom.y;
          this._y = vFrom.x;
          this._z = 0;
          this._w = r;
        } else {
          this._x = 0;
          this._y = -vFrom.z;
          this._z = vFrom.y;
          this._w = r;
        }
      } else {
        this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
        this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
        this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
        this._w = r;
      }
      return this.normalize();
    }
    /**
     * Returns the angle between this quaternion and the given one in radians.
     *
     * @param {Quaternion} q - The quaternion to compute the angle with.
     * @return {number} The angle in radians.
     */
    angleTo(q) {
      return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));
    }
    /**
     * Rotates this quaternion by a given angular step to the given quaternion.
     * The method ensures that the final quaternion will not overshoot \`q\`.
     *
     * @param {Quaternion} q - The target quaternion.
     * @param {number} step - The angular step in radians.
     * @return {Quaternion} A reference to this quaternion.
     */
    rotateTowards(q, step) {
      const angle = this.angleTo(q);
      if (angle === 0) return this;
      const t = Math.min(1, step / angle);
      this.slerp(q, t);
      return this;
    }
    /**
     * Sets this quaternion to the identity quaternion; that is, to the
     * quaternion that represents "no rotation".
     *
     * @return {Quaternion} A reference to this quaternion.
     */
    identity() {
      return this.set(0, 0, 0, 1);
    }
    /**
     * Inverts this quaternion via {@link Quaternion#conjugate}. The
     * quaternion is assumed to have unit length.
     *
     * @return {Quaternion} A reference to this quaternion.
     */
    invert() {
      return this.conjugate();
    }
    /**
     * Returns the rotational conjugate of this quaternion. The conjugate of a
     * quaternion represents the same rotation in the opposite direction about
     * the rotational axis.
     *
     * @return {Quaternion} A reference to this quaternion.
     */
    conjugate() {
      this._x *= -1;
      this._y *= -1;
      this._z *= -1;
      this._onChangeCallback();
      return this;
    }
    /**
     * Calculates the dot product of this quaternion and the given one.
     *
     * @param {Quaternion} v - The quaternion to compute the dot product with.
     * @return {number} The result of the dot product.
     */
    dot(v) {
      return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
    }
    /**
     * Computes the squared Euclidean length (straight-line length) of this quaternion,
     * considered as a 4 dimensional vector. This can be useful if you are comparing the
     * lengths of two quaternions, as this is a slightly more efficient calculation than
     * {@link Quaternion#length}.
     *
     * @return {number} The squared Euclidean length.
     */
    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    /**
     * Computes the Euclidean length (straight-line length) of this quaternion,
     * considered as a 4 dimensional vector.
     *
     * @return {number} The Euclidean length.
     */
    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    /**
     * Normalizes this quaternion - that is, calculated the quaternion that performs
     * the same rotation as this one, but has a length equal to \`1\`.
     *
     * @return {Quaternion} A reference to this quaternion.
     */
    normalize() {
      let l = this.length();
      if (l === 0) {
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._w = 1;
      } else {
        l = 1 / l;
        this._x = this._x * l;
        this._y = this._y * l;
        this._z = this._z * l;
        this._w = this._w * l;
      }
      this._onChangeCallback();
      return this;
    }
    /**
     * Multiplies this quaternion by the given one.
     *
     * @param {Quaternion} q - The quaternion.
     * @return {Quaternion} A reference to this quaternion.
     */
    multiply(q) {
      return this.multiplyQuaternions(this, q);
    }
    /**
     * Pre-multiplies this quaternion by the given one.
     *
     * @param {Quaternion} q - The quaternion.
     * @return {Quaternion} A reference to this quaternion.
     */
    premultiply(q) {
      return this.multiplyQuaternions(q, this);
    }
    /**
     * Multiplies the given quaternions and stores the result in this instance.
     *
     * @param {Quaternion} a - The first quaternion.
     * @param {Quaternion} b - The second quaternion.
     * @return {Quaternion} A reference to this quaternion.
     */
    multiplyQuaternions(a, b) {
      const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
      const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
      this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
      this._onChangeCallback();
      return this;
    }
    /**
     * Performs a spherical linear interpolation between quaternions.
     *
     * @param {Quaternion} qb - The target quaternion.
     * @param {number} t - The interpolation factor in the closed interval \`[0, 1]\`.
     * @return {Quaternion} A reference to this quaternion.
     */
    slerp(qb, t) {
      if (t <= 0) return this;
      if (t >= 1) return this.copy(qb);
      let x2 = qb._x, y = qb._y, z = qb._z, w = qb._w;
      let dot = this.dot(qb);
      if (dot < 0) {
        x2 = -x2;
        y = -y;
        z = -z;
        w = -w;
        dot = -dot;
      }
      let s = 1 - t;
      if (dot < 0.9995) {
        const theta = Math.acos(dot);
        const sin = Math.sin(theta);
        s = Math.sin(s * theta) / sin;
        t = Math.sin(t * theta) / sin;
        this._x = this._x * s + x2 * t;
        this._y = this._y * s + y * t;
        this._z = this._z * s + z * t;
        this._w = this._w * s + w * t;
        this._onChangeCallback();
      } else {
        this._x = this._x * s + x2 * t;
        this._y = this._y * s + y * t;
        this._z = this._z * s + z * t;
        this._w = this._w * s + w * t;
        this.normalize();
      }
      return this;
    }
    /**
     * Performs a spherical linear interpolation between the given quaternions
     * and stores the result in this quaternion.
     *
     * @param {Quaternion} qa - The source quaternion.
     * @param {Quaternion} qb - The target quaternion.
     * @param {number} t - The interpolation factor in the closed interval \`[0, 1]\`.
     * @return {Quaternion} A reference to this quaternion.
     */
    slerpQuaternions(qa, qb, t) {
      return this.copy(qa).slerp(qb, t);
    }
    /**
     * Sets this quaternion to a uniformly random, normalized quaternion.
     *
     * @return {Quaternion} A reference to this quaternion.
     */
    random() {
      const theta1 = 2 * Math.PI * Math.random();
      const theta2 = 2 * Math.PI * Math.random();
      const x0 = Math.random();
      const r1 = Math.sqrt(1 - x0);
      const r2 = Math.sqrt(x0);
      return this.set(
        r1 * Math.sin(theta1),
        r1 * Math.cos(theta1),
        r2 * Math.sin(theta2),
        r2 * Math.cos(theta2)
      );
    }
    /**
     * Returns \`true\` if this quaternion is equal with the given one.
     *
     * @param {Quaternion} quaternion - The quaternion to test for equality.
     * @return {boolean} Whether this quaternion is equal with the given one.
     */
    equals(quaternion) {
      return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
    }
    /**
     * Sets this quaternion's components from the given array.
     *
     * @param {Array<number>} array - An array holding the quaternion component values.
     * @param {number} [offset=0] - The offset into the array.
     * @return {Quaternion} A reference to this quaternion.
     */
    fromArray(array, offset = 0) {
      this._x = array[offset];
      this._y = array[offset + 1];
      this._z = array[offset + 2];
      this._w = array[offset + 3];
      this._onChangeCallback();
      return this;
    }
    /**
     * Writes the components of this quaternion to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number>} [array=[]] - The target array holding the quaternion components.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number>} The quaternion components.
     */
    toArray(array = [], offset = 0) {
      array[offset] = this._x;
      array[offset + 1] = this._y;
      array[offset + 2] = this._z;
      array[offset + 3] = this._w;
      return array;
    }
    /**
     * Sets the components of this quaternion from the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.
     * @param {number} index - The index into the attribute.
     * @return {Quaternion} A reference to this quaternion.
     */
    fromBufferAttribute(attribute, index) {
      this._x = attribute.getX(index);
      this._y = attribute.getY(index);
      this._z = attribute.getZ(index);
      this._w = attribute.getW(index);
      this._onChangeCallback();
      return this;
    }
    /**
     * This methods defines the serialization result of this class. Returns the
     * numerical elements of this quaternion in an array of format \`[x, y, z, w]\`.
     *
     * @return {Array<number>} The serialized quaternion.
     */
    toJSON() {
      return this.toArray();
    }
    _onChange(callback) {
      this._onChangeCallback = callback;
      return this;
    }
    _onChangeCallback() {
    }
    *[Symbol.iterator]() {
      yield this._x;
      yield this._y;
      yield this._z;
      yield this._w;
    }
  }
  class Vector3 {
    /**
     * Constructs a new 3D vector.
     *
     * @param {number} [x=0] - The x value of this vector.
     * @param {number} [y=0] - The y value of this vector.
     * @param {number} [z=0] - The z value of this vector.
     */
    constructor(x2 = 0, y = 0, z = 0) {
      Vector3.prototype.isVector3 = true;
      this.x = x2;
      this.y = y;
      this.z = z;
    }
    /**
     * Sets the vector components.
     *
     * @param {number} x - The value of the x component.
     * @param {number} y - The value of the y component.
     * @param {number} z - The value of the z component.
     * @return {Vector3} A reference to this vector.
     */
    set(x2, y, z) {
      if (z === void 0) z = this.z;
      this.x = x2;
      this.y = y;
      this.z = z;
      return this;
    }
    /**
     * Sets the vector components to the same value.
     *
     * @param {number} scalar - The value to set for all vector components.
     * @return {Vector3} A reference to this vector.
     */
    setScalar(scalar) {
      this.x = scalar;
      this.y = scalar;
      this.z = scalar;
      return this;
    }
    /**
     * Sets the vector's x component to the given value
     *
     * @param {number} x - The value to set.
     * @return {Vector3} A reference to this vector.
     */
    setX(x2) {
      this.x = x2;
      return this;
    }
    /**
     * Sets the vector's y component to the given value
     *
     * @param {number} y - The value to set.
     * @return {Vector3} A reference to this vector.
     */
    setY(y) {
      this.y = y;
      return this;
    }
    /**
     * Sets the vector's z component to the given value
     *
     * @param {number} z - The value to set.
     * @return {Vector3} A reference to this vector.
     */
    setZ(z) {
      this.z = z;
      return this;
    }
    /**
     * Allows to set a vector component with an index.
     *
     * @param {number} index - The component index. \`0\` equals to x, \`1\` equals to y, \`2\` equals to z.
     * @param {number} value - The value to set.
     * @return {Vector3} A reference to this vector.
     */
    setComponent(index, value) {
      switch (index) {
        case 0:
          this.x = value;
          break;
        case 1:
          this.y = value;
          break;
        case 2:
          this.z = value;
          break;
        default:
          throw new Error("index is out of range: " + index);
      }
      return this;
    }
    /**
     * Returns the value of the vector component which matches the given index.
     *
     * @param {number} index - The component index. \`0\` equals to x, \`1\` equals to y, \`2\` equals to z.
     * @return {number} A vector component value.
     */
    getComponent(index) {
      switch (index) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw new Error("index is out of range: " + index);
      }
    }
    /**
     * Returns a new vector with copied values from this instance.
     *
     * @return {Vector3} A clone of this instance.
     */
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    /**
     * Copies the values of the given vector to this instance.
     *
     * @param {Vector3} v - The vector to copy.
     * @return {Vector3} A reference to this vector.
     */
    copy(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      return this;
    }
    /**
     * Adds the given vector to this instance.
     *
     * @param {Vector3} v - The vector to add.
     * @return {Vector3} A reference to this vector.
     */
    add(v) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      return this;
    }
    /**
     * Adds the given scalar value to all components of this instance.
     *
     * @param {number} s - The scalar to add.
     * @return {Vector3} A reference to this vector.
     */
    addScalar(s) {
      this.x += s;
      this.y += s;
      this.z += s;
      return this;
    }
    /**
     * Adds the given vectors and stores the result in this instance.
     *
     * @param {Vector3} a - The first vector.
     * @param {Vector3} b - The second vector.
     * @return {Vector3} A reference to this vector.
     */
    addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;
      return this;
    }
    /**
     * Adds the given vector scaled by the given factor to this instance.
     *
     * @param {Vector3|Vector4} v - The vector.
     * @param {number} s - The factor that scales \`v\`.
     * @return {Vector3} A reference to this vector.
     */
    addScaledVector(v, s) {
      this.x += v.x * s;
      this.y += v.y * s;
      this.z += v.z * s;
      return this;
    }
    /**
     * Subtracts the given vector from this instance.
     *
     * @param {Vector3} v - The vector to subtract.
     * @return {Vector3} A reference to this vector.
     */
    sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      return this;
    }
    /**
     * Subtracts the given scalar value from all components of this instance.
     *
     * @param {number} s - The scalar to subtract.
     * @return {Vector3} A reference to this vector.
     */
    subScalar(s) {
      this.x -= s;
      this.y -= s;
      this.z -= s;
      return this;
    }
    /**
     * Subtracts the given vectors and stores the result in this instance.
     *
     * @param {Vector3} a - The first vector.
     * @param {Vector3} b - The second vector.
     * @return {Vector3} A reference to this vector.
     */
    subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;
      return this;
    }
    /**
     * Multiplies the given vector with this instance.
     *
     * @param {Vector3} v - The vector to multiply.
     * @return {Vector3} A reference to this vector.
     */
    multiply(v) {
      this.x *= v.x;
      this.y *= v.y;
      this.z *= v.z;
      return this;
    }
    /**
     * Multiplies the given scalar value with all components of this instance.
     *
     * @param {number} scalar - The scalar to multiply.
     * @return {Vector3} A reference to this vector.
     */
    multiplyScalar(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      return this;
    }
    /**
     * Multiplies the given vectors and stores the result in this instance.
     *
     * @param {Vector3} a - The first vector.
     * @param {Vector3} b - The second vector.
     * @return {Vector3} A reference to this vector.
     */
    multiplyVectors(a, b) {
      this.x = a.x * b.x;
      this.y = a.y * b.y;
      this.z = a.z * b.z;
      return this;
    }
    /**
     * Applies the given Euler rotation to this vector.
     *
     * @param {Euler} euler - The Euler angles.
     * @return {Vector3} A reference to this vector.
     */
    applyEuler(euler) {
      return this.applyQuaternion(_quaternion$4.setFromEuler(euler));
    }
    /**
     * Applies a rotation specified by an axis and an angle to this vector.
     *
     * @param {Vector3} axis - A normalized vector representing the rotation axis.
     * @param {number} angle - The angle in radians.
     * @return {Vector3} A reference to this vector.
     */
    applyAxisAngle(axis, angle) {
      return this.applyQuaternion(_quaternion$4.setFromAxisAngle(axis, angle));
    }
    /**
     * Multiplies this vector with the given 3x3 matrix.
     *
     * @param {Matrix3} m - The 3x3 matrix.
     * @return {Vector3} A reference to this vector.
     */
    applyMatrix3(m) {
      const x2 = this.x, y = this.y, z = this.z;
      const e = m.elements;
      this.x = e[0] * x2 + e[3] * y + e[6] * z;
      this.y = e[1] * x2 + e[4] * y + e[7] * z;
      this.z = e[2] * x2 + e[5] * y + e[8] * z;
      return this;
    }
    /**
     * Multiplies this vector by the given normal matrix and normalizes
     * the result.
     *
     * @param {Matrix3} m - The normal matrix.
     * @return {Vector3} A reference to this vector.
     */
    applyNormalMatrix(m) {
      return this.applyMatrix3(m).normalize();
    }
    /**
     * Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
     * divides by perspective.
     *
     * @param {Matrix4} m - The matrix to apply.
     * @return {Vector3} A reference to this vector.
     */
    applyMatrix4(m) {
      const x2 = this.x, y = this.y, z = this.z;
      const e = m.elements;
      const w = 1 / (e[3] * x2 + e[7] * y + e[11] * z + e[15]);
      this.x = (e[0] * x2 + e[4] * y + e[8] * z + e[12]) * w;
      this.y = (e[1] * x2 + e[5] * y + e[9] * z + e[13]) * w;
      this.z = (e[2] * x2 + e[6] * y + e[10] * z + e[14]) * w;
      return this;
    }
    /**
     * Applies the given Quaternion to this vector.
     *
     * @param {Quaternion} q - The Quaternion.
     * @return {Vector3} A reference to this vector.
     */
    applyQuaternion(q) {
      const vx = this.x, vy = this.y, vz = this.z;
      const qx = q.x, qy = q.y, qz = q.z, qw = q.w;
      const tx = 2 * (qy * vz - qz * vy);
      const ty = 2 * (qz * vx - qx * vz);
      const tz = 2 * (qx * vy - qy * vx);
      this.x = vx + qw * tx + qy * tz - qz * ty;
      this.y = vy + qw * ty + qz * tx - qx * tz;
      this.z = vz + qw * tz + qx * ty - qy * tx;
      return this;
    }
    /**
     * Projects this vector from world space into the camera's normalized
     * device coordinate (NDC) space.
     *
     * @param {Camera} camera - The camera.
     * @return {Vector3} A reference to this vector.
     */
    project(camera) {
      return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
    }
    /**
     * Unprojects this vector from the camera's normalized device coordinate (NDC)
     * space into world space.
     *
     * @param {Camera} camera - The camera.
     * @return {Vector3} A reference to this vector.
     */
    unproject(camera) {
      return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
    }
    /**
     * Transforms the direction of this vector by a matrix (the upper left 3 x 3
     * subset of the given 4x4 matrix and then normalizes the result.
     *
     * @param {Matrix4} m - The matrix.
     * @return {Vector3} A reference to this vector.
     */
    transformDirection(m) {
      const x2 = this.x, y = this.y, z = this.z;
      const e = m.elements;
      this.x = e[0] * x2 + e[4] * y + e[8] * z;
      this.y = e[1] * x2 + e[5] * y + e[9] * z;
      this.z = e[2] * x2 + e[6] * y + e[10] * z;
      return this.normalize();
    }
    /**
     * Divides this instance by the given vector.
     *
     * @param {Vector3} v - The vector to divide.
     * @return {Vector3} A reference to this vector.
     */
    divide(v) {
      this.x /= v.x;
      this.y /= v.y;
      this.z /= v.z;
      return this;
    }
    /**
     * Divides this vector by the given scalar.
     *
     * @param {number} scalar - The scalar to divide.
     * @return {Vector3} A reference to this vector.
     */
    divideScalar(scalar) {
      return this.multiplyScalar(1 / scalar);
    }
    /**
     * If this vector's x, y or z value is greater than the given vector's x, y or z
     * value, replace that value with the corresponding min value.
     *
     * @param {Vector3} v - The vector.
     * @return {Vector3} A reference to this vector.
     */
    min(v) {
      this.x = Math.min(this.x, v.x);
      this.y = Math.min(this.y, v.y);
      this.z = Math.min(this.z, v.z);
      return this;
    }
    /**
     * If this vector's x, y or z value is less than the given vector's x, y or z
     * value, replace that value with the corresponding max value.
     *
     * @param {Vector3} v - The vector.
     * @return {Vector3} A reference to this vector.
     */
    max(v) {
      this.x = Math.max(this.x, v.x);
      this.y = Math.max(this.y, v.y);
      this.z = Math.max(this.z, v.z);
      return this;
    }
    /**
     * If this vector's x, y or z value is greater than the max vector's x, y or z
     * value, it is replaced by the corresponding value.
     * If this vector's x, y or z value is less than the min vector's x, y or z value,
     * it is replaced by the corresponding value.
     *
     * @param {Vector3} min - The minimum x, y and z values.
     * @param {Vector3} max - The maximum x, y and z values in the desired range.
     * @return {Vector3} A reference to this vector.
     */
    clamp(min, max2) {
      this.x = clamp(this.x, min.x, max2.x);
      this.y = clamp(this.y, min.y, max2.y);
      this.z = clamp(this.z, min.z, max2.z);
      return this;
    }
    /**
     * If this vector's x, y or z values are greater than the max value, they are
     * replaced by the max value.
     * If this vector's x, y or z values are less than the min value, they are
     * replaced by the min value.
     *
     * @param {number} minVal - The minimum value the components will be clamped to.
     * @param {number} maxVal - The maximum value the components will be clamped to.
     * @return {Vector3} A reference to this vector.
     */
    clampScalar(minVal, maxVal) {
      this.x = clamp(this.x, minVal, maxVal);
      this.y = clamp(this.y, minVal, maxVal);
      this.z = clamp(this.z, minVal, maxVal);
      return this;
    }
    /**
     * If this vector's length is greater than the max value, it is replaced by
     * the max value.
     * If this vector's length is less than the min value, it is replaced by the
     * min value.
     *
     * @param {number} min - The minimum value the vector length will be clamped to.
     * @param {number} max - The maximum value the vector length will be clamped to.
     * @return {Vector3} A reference to this vector.
     */
    clampLength(min, max2) {
      const length = this.length();
      return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max2));
    }
    /**
     * The components of this vector are rounded down to the nearest integer value.
     *
     * @return {Vector3} A reference to this vector.
     */
    floor() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      return this;
    }
    /**
     * The components of this vector are rounded up to the nearest integer value.
     *
     * @return {Vector3} A reference to this vector.
     */
    ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      return this;
    }
    /**
     * The components of this vector are rounded to the nearest integer value
     *
     * @return {Vector3} A reference to this vector.
     */
    round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);
      return this;
    }
    /**
     * The components of this vector are rounded towards zero (up if negative,
     * down if positive) to an integer value.
     *
     * @return {Vector3} A reference to this vector.
     */
    roundToZero() {
      this.x = Math.trunc(this.x);
      this.y = Math.trunc(this.y);
      this.z = Math.trunc(this.z);
      return this;
    }
    /**
     * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
     *
     * @return {Vector3} A reference to this vector.
     */
    negate() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      return this;
    }
    /**
     * Calculates the dot product of the given vector with this instance.
     *
     * @param {Vector3} v - The vector to compute the dot product with.
     * @return {number} The result of the dot product.
     */
    dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    /**
     * Computes the square of the Euclidean length (straight-line length) from
     * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should
     * compare the length squared instead as it is slightly more efficient to calculate.
     *
     * @return {number} The square length of this vector.
     */
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    /**
     * Computes the  Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
     *
     * @return {number} The length of this vector.
     */
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    /**
     * Computes the Manhattan length of this vector.
     *
     * @return {number} The length of this vector.
     */
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    /**
     * Converts this vector to a unit vector - that is, sets it equal to a vector
     * with the same direction as this one, but with a vector length of \`1\`.
     *
     * @return {Vector3} A reference to this vector.
     */
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    /**
     * Sets this vector to a vector with the same direction as this one, but
     * with the specified length.
     *
     * @param {number} length - The new length of this vector.
     * @return {Vector3} A reference to this vector.
     */
    setLength(length) {
      return this.normalize().multiplyScalar(length);
    }
    /**
     * Linearly interpolates between the given vector and this instance, where
     * alpha is the percent distance along the line - alpha = 0 will be this
     * vector, and alpha = 1 will be the given one.
     *
     * @param {Vector3} v - The vector to interpolate towards.
     * @param {number} alpha - The interpolation factor, typically in the closed interval \`[0, 1]\`.
     * @return {Vector3} A reference to this vector.
     */
    lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      this.z += (v.z - this.z) * alpha;
      return this;
    }
    /**
     * Linearly interpolates between the given vectors, where alpha is the percent
     * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
     * be the second one. The result is stored in this instance.
     *
     * @param {Vector3} v1 - The first vector.
     * @param {Vector3} v2 - The second vector.
     * @param {number} alpha - The interpolation factor, typically in the closed interval \`[0, 1]\`.
     * @return {Vector3} A reference to this vector.
     */
    lerpVectors(v1, v2, alpha) {
      this.x = v1.x + (v2.x - v1.x) * alpha;
      this.y = v1.y + (v2.y - v1.y) * alpha;
      this.z = v1.z + (v2.z - v1.z) * alpha;
      return this;
    }
    /**
     * Calculates the cross product of the given vector with this instance.
     *
     * @param {Vector3} v - The vector to compute the cross product with.
     * @return {Vector3} The result of the cross product.
     */
    cross(v) {
      return this.crossVectors(this, v);
    }
    /**
     * Calculates the cross product of the given vectors and stores the result
     * in this instance.
     *
     * @param {Vector3} a - The first vector.
     * @param {Vector3} b - The second vector.
     * @return {Vector3} A reference to this vector.
     */
    crossVectors(a, b) {
      const ax = a.x, ay = a.y, az = a.z;
      const bx = b.x, by = b.y, bz = b.z;
      this.x = ay * bz - az * by;
      this.y = az * bx - ax * bz;
      this.z = ax * by - ay * bx;
      return this;
    }
    /**
     * Projects this vector onto the given one.
     *
     * @param {Vector3} v - The vector to project to.
     * @return {Vector3} A reference to this vector.
     */
    projectOnVector(v) {
      const denominator = v.lengthSq();
      if (denominator === 0) return this.set(0, 0, 0);
      const scalar = v.dot(this) / denominator;
      return this.copy(v).multiplyScalar(scalar);
    }
    /**
     * Projects this vector onto a plane by subtracting this
     * vector projected onto the plane's normal from this vector.
     *
     * @param {Vector3} planeNormal - The plane normal.
     * @return {Vector3} A reference to this vector.
     */
    projectOnPlane(planeNormal) {
      _vector$c.copy(this).projectOnVector(planeNormal);
      return this.sub(_vector$c);
    }
    /**
     * Reflects this vector off a plane orthogonal to the given normal vector.
     *
     * @param {Vector3} normal - The (normalized) normal vector.
     * @return {Vector3} A reference to this vector.
     */
    reflect(normal) {
      return this.sub(_vector$c.copy(normal).multiplyScalar(2 * this.dot(normal)));
    }
    /**
     * Returns the angle between the given vector and this instance in radians.
     *
     * @param {Vector3} v - The vector to compute the angle with.
     * @return {number} The angle in radians.
     */
    angleTo(v) {
      const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
      if (denominator === 0) return Math.PI / 2;
      const theta = this.dot(v) / denominator;
      return Math.acos(clamp(theta, -1, 1));
    }
    /**
     * Computes the distance from the given vector to this instance.
     *
     * @param {Vector3} v - The vector to compute the distance to.
     * @return {number} The distance.
     */
    distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    }
    /**
     * Computes the squared distance from the given vector to this instance.
     * If you are just comparing the distance with another distance, you should compare
     * the distance squared instead as it is slightly more efficient to calculate.
     *
     * @param {Vector3} v - The vector to compute the squared distance to.
     * @return {number} The squared distance.
     */
    distanceToSquared(v) {
      const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
      return dx * dx + dy * dy + dz * dz;
    }
    /**
     * Computes the Manhattan distance from the given vector to this instance.
     *
     * @param {Vector3} v - The vector to compute the Manhattan distance to.
     * @return {number} The Manhattan distance.
     */
    manhattanDistanceTo(v) {
      return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    }
    /**
     * Sets the vector components from the given spherical coordinates.
     *
     * @param {Spherical} s - The spherical coordinates.
     * @return {Vector3} A reference to this vector.
     */
    setFromSpherical(s) {
      return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
    }
    /**
     * Sets the vector components from the given spherical coordinates.
     *
     * @param {number} radius - The radius.
     * @param {number} phi - The phi angle in radians.
     * @param {number} theta - The theta angle in radians.
     * @return {Vector3} A reference to this vector.
     */
    setFromSphericalCoords(radius, phi, theta) {
      const sinPhiRadius = Math.sin(phi) * radius;
      this.x = sinPhiRadius * Math.sin(theta);
      this.y = Math.cos(phi) * radius;
      this.z = sinPhiRadius * Math.cos(theta);
      return this;
    }
    /**
     * Sets the vector components from the given cylindrical coordinates.
     *
     * @param {Cylindrical} c - The cylindrical coordinates.
     * @return {Vector3} A reference to this vector.
     */
    setFromCylindrical(c) {
      return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
    }
    /**
     * Sets the vector components from the given cylindrical coordinates.
     *
     * @param {number} radius - The radius.
     * @param {number} theta - The theta angle in radians.
     * @param {number} y - The y value.
     * @return {Vector3} A reference to this vector.
     */
    setFromCylindricalCoords(radius, theta, y) {
      this.x = radius * Math.sin(theta);
      this.y = y;
      this.z = radius * Math.cos(theta);
      return this;
    }
    /**
     * Sets the vector components to the position elements of the
     * given transformation matrix.
     *
     * @param {Matrix4} m - The 4x4 matrix.
     * @return {Vector3} A reference to this vector.
     */
    setFromMatrixPosition(m) {
      const e = m.elements;
      this.x = e[12];
      this.y = e[13];
      this.z = e[14];
      return this;
    }
    /**
     * Sets the vector components to the scale elements of the
     * given transformation matrix.
     *
     * @param {Matrix4} m - The 4x4 matrix.
     * @return {Vector3} A reference to this vector.
     */
    setFromMatrixScale(m) {
      const sx = this.setFromMatrixColumn(m, 0).length();
      const sy = this.setFromMatrixColumn(m, 1).length();
      const sz = this.setFromMatrixColumn(m, 2).length();
      this.x = sx;
      this.y = sy;
      this.z = sz;
      return this;
    }
    /**
     * Sets the vector components from the specified matrix column.
     *
     * @param {Matrix4} m - The 4x4 matrix.
     * @param {number} index - The column index.
     * @return {Vector3} A reference to this vector.
     */
    setFromMatrixColumn(m, index) {
      return this.fromArray(m.elements, index * 4);
    }
    /**
     * Sets the vector components from the specified matrix column.
     *
     * @param {Matrix3} m - The 3x3 matrix.
     * @param {number} index - The column index.
     * @return {Vector3} A reference to this vector.
     */
    setFromMatrix3Column(m, index) {
      return this.fromArray(m.elements, index * 3);
    }
    /**
     * Sets the vector components from the given Euler angles.
     *
     * @param {Euler} e - The Euler angles to set.
     * @return {Vector3} A reference to this vector.
     */
    setFromEuler(e) {
      this.x = e._x;
      this.y = e._y;
      this.z = e._z;
      return this;
    }
    /**
     * Sets the vector components from the RGB components of the
     * given color.
     *
     * @param {Color} c - The color to set.
     * @return {Vector3} A reference to this vector.
     */
    setFromColor(c) {
      this.x = c.r;
      this.y = c.g;
      this.z = c.b;
      return this;
    }
    /**
     * Returns \`true\` if this vector is equal with the given one.
     *
     * @param {Vector3} v - The vector to test for equality.
     * @return {boolean} Whether this vector is equal with the given one.
     */
    equals(v) {
      return v.x === this.x && v.y === this.y && v.z === this.z;
    }
    /**
     * Sets this vector's x value to be \`array[ offset ]\`, y value to be \`array[ offset + 1 ]\`
     * and z value to be \`array[ offset + 2 ]\`.
     *
     * @param {Array<number>} array - An array holding the vector component values.
     * @param {number} [offset=0] - The offset into the array.
     * @return {Vector3} A reference to this vector.
     */
    fromArray(array, offset = 0) {
      this.x = array[offset];
      this.y = array[offset + 1];
      this.z = array[offset + 2];
      return this;
    }
    /**
     * Writes the components of this vector to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number>} [array=[]] - The target array holding the vector components.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number>} The vector components.
     */
    toArray(array = [], offset = 0) {
      array[offset] = this.x;
      array[offset + 1] = this.y;
      array[offset + 2] = this.z;
      return array;
    }
    /**
     * Sets the components of this vector from the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
     * @param {number} index - The index into the attribute.
     * @return {Vector3} A reference to this vector.
     */
    fromBufferAttribute(attribute, index) {
      this.x = attribute.getX(index);
      this.y = attribute.getY(index);
      this.z = attribute.getZ(index);
      return this;
    }
    /**
     * Sets each component of this vector to a pseudo-random value between \`0\` and
     * \`1\`, excluding \`1\`.
     *
     * @return {Vector3} A reference to this vector.
     */
    random() {
      this.x = Math.random();
      this.y = Math.random();
      this.z = Math.random();
      return this;
    }
    /**
     * Sets this vector to a uniformly random point on a unit sphere.
     *
     * @return {Vector3} A reference to this vector.
     */
    randomDirection() {
      const theta = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      const c = Math.sqrt(1 - u * u);
      this.x = c * Math.cos(theta);
      this.y = u;
      this.z = c * Math.sin(theta);
      return this;
    }
    *[Symbol.iterator]() {
      yield this.x;
      yield this.y;
      yield this.z;
    }
  }
  const _vector$c = /* @__PURE__ */ new Vector3();
  const _quaternion$4 = /* @__PURE__ */ new Quaternion();
  class Matrix3 {
    /**
     * Constructs a new 3x3 matrix. The arguments are supposed to be
     * in row-major order. If no arguments are provided, the constructor
     * initializes the matrix as an identity matrix.
     *
     * @param {number} [n11] - 1-1 matrix element.
     * @param {number} [n12] - 1-2 matrix element.
     * @param {number} [n13] - 1-3 matrix element.
     * @param {number} [n21] - 2-1 matrix element.
     * @param {number} [n22] - 2-2 matrix element.
     * @param {number} [n23] - 2-3 matrix element.
     * @param {number} [n31] - 3-1 matrix element.
     * @param {number} [n32] - 3-2 matrix element.
     * @param {number} [n33] - 3-3 matrix element.
     */
    constructor(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
      Matrix3.prototype.isMatrix3 = true;
      this.elements = [
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ];
      if (n11 !== void 0) {
        this.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);
      }
    }
    /**
     * Sets the elements of the matrix.The arguments are supposed to be
     * in row-major order.
     *
     * @param {number} [n11] - 1-1 matrix element.
     * @param {number} [n12] - 1-2 matrix element.
     * @param {number} [n13] - 1-3 matrix element.
     * @param {number} [n21] - 2-1 matrix element.
     * @param {number} [n22] - 2-2 matrix element.
     * @param {number} [n23] - 2-3 matrix element.
     * @param {number} [n31] - 3-1 matrix element.
     * @param {number} [n32] - 3-2 matrix element.
     * @param {number} [n33] - 3-3 matrix element.
     * @return {Matrix3} A reference to this matrix.
     */
    set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
      const te = this.elements;
      te[0] = n11;
      te[1] = n21;
      te[2] = n31;
      te[3] = n12;
      te[4] = n22;
      te[5] = n32;
      te[6] = n13;
      te[7] = n23;
      te[8] = n33;
      return this;
    }
    /**
     * Sets this matrix to the 3x3 identity matrix.
     *
     * @return {Matrix3} A reference to this matrix.
     */
    identity() {
      this.set(
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      );
      return this;
    }
    /**
     * Copies the values of the given matrix to this instance.
     *
     * @param {Matrix3} m - The matrix to copy.
     * @return {Matrix3} A reference to this matrix.
     */
    copy(m) {
      const te = this.elements;
      const me = m.elements;
      te[0] = me[0];
      te[1] = me[1];
      te[2] = me[2];
      te[3] = me[3];
      te[4] = me[4];
      te[5] = me[5];
      te[6] = me[6];
      te[7] = me[7];
      te[8] = me[8];
      return this;
    }
    /**
     * Extracts the basis of this matrix into the three axis vectors provided.
     *
     * @param {Vector3} xAxis - The basis's x axis.
     * @param {Vector3} yAxis - The basis's y axis.
     * @param {Vector3} zAxis - The basis's z axis.
     * @return {Matrix3} A reference to this matrix.
     */
    extractBasis(xAxis, yAxis, zAxis) {
      xAxis.setFromMatrix3Column(this, 0);
      yAxis.setFromMatrix3Column(this, 1);
      zAxis.setFromMatrix3Column(this, 2);
      return this;
    }
    /**
     * Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.
     *
     * @param {Matrix4} m - The 4x4 matrix.
     * @return {Matrix3} A reference to this matrix.
     */
    setFromMatrix4(m) {
      const me = m.elements;
      this.set(
        me[0],
        me[4],
        me[8],
        me[1],
        me[5],
        me[9],
        me[2],
        me[6],
        me[10]
      );
      return this;
    }
    /**
     * Post-multiplies this matrix by the given 3x3 matrix.
     *
     * @param {Matrix3} m - The matrix to multiply with.
     * @return {Matrix3} A reference to this matrix.
     */
    multiply(m) {
      return this.multiplyMatrices(this, m);
    }
    /**
     * Pre-multiplies this matrix by the given 3x3 matrix.
     *
     * @param {Matrix3} m - The matrix to multiply with.
     * @return {Matrix3} A reference to this matrix.
     */
    premultiply(m) {
      return this.multiplyMatrices(m, this);
    }
    /**
     * Multiples the given 3x3 matrices and stores the result
     * in this matrix.
     *
     * @param {Matrix3} a - The first matrix.
     * @param {Matrix3} b - The second matrix.
     * @return {Matrix3} A reference to this matrix.
     */
    multiplyMatrices(a, b) {
      const ae = a.elements;
      const be = b.elements;
      const te = this.elements;
      const a11 = ae[0], a12 = ae[3], a13 = ae[6];
      const a21 = ae[1], a22 = ae[4], a23 = ae[7];
      const a31 = ae[2], a32 = ae[5], a33 = ae[8];
      const b11 = be[0], b12 = be[3], b13 = be[6];
      const b21 = be[1], b22 = be[4], b23 = be[7];
      const b31 = be[2], b32 = be[5], b33 = be[8];
      te[0] = a11 * b11 + a12 * b21 + a13 * b31;
      te[3] = a11 * b12 + a12 * b22 + a13 * b32;
      te[6] = a11 * b13 + a12 * b23 + a13 * b33;
      te[1] = a21 * b11 + a22 * b21 + a23 * b31;
      te[4] = a21 * b12 + a22 * b22 + a23 * b32;
      te[7] = a21 * b13 + a22 * b23 + a23 * b33;
      te[2] = a31 * b11 + a32 * b21 + a33 * b31;
      te[5] = a31 * b12 + a32 * b22 + a33 * b32;
      te[8] = a31 * b13 + a32 * b23 + a33 * b33;
      return this;
    }
    /**
     * Multiplies every component of the matrix by the given scalar.
     *
     * @param {number} s - The scalar.
     * @return {Matrix3} A reference to this matrix.
     */
    multiplyScalar(s) {
      const te = this.elements;
      te[0] *= s;
      te[3] *= s;
      te[6] *= s;
      te[1] *= s;
      te[4] *= s;
      te[7] *= s;
      te[2] *= s;
      te[5] *= s;
      te[8] *= s;
      return this;
    }
    /**
     * Computes and returns the determinant of this matrix.
     *
     * @return {number} The determinant.
     */
    determinant() {
      const te = this.elements;
      const a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i2 = te[8];
      return a * e * i2 - a * f * h - b * d * i2 + b * f * g + c * d * h - c * e * g;
    }
    /**
     * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
     * You can not invert with a determinant of zero. If you attempt this, the method produces
     * a zero matrix instead.
     *
     * @return {Matrix3} A reference to this matrix.
     */
    invert() {
      const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n12 = te[3], n22 = te[4], n32 = te[5], n13 = te[6], n23 = te[7], n33 = te[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;
      if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      const detInv = 1 / det;
      te[0] = t11 * detInv;
      te[1] = (n31 * n23 - n33 * n21) * detInv;
      te[2] = (n32 * n21 - n31 * n22) * detInv;
      te[3] = t12 * detInv;
      te[4] = (n33 * n11 - n31 * n13) * detInv;
      te[5] = (n31 * n12 - n32 * n11) * detInv;
      te[6] = t13 * detInv;
      te[7] = (n21 * n13 - n23 * n11) * detInv;
      te[8] = (n22 * n11 - n21 * n12) * detInv;
      return this;
    }
    /**
     * Transposes this matrix in place.
     *
     * @return {Matrix3} A reference to this matrix.
     */
    transpose() {
      let tmp;
      const m = this.elements;
      tmp = m[1];
      m[1] = m[3];
      m[3] = tmp;
      tmp = m[2];
      m[2] = m[6];
      m[6] = tmp;
      tmp = m[5];
      m[5] = m[7];
      m[7] = tmp;
      return this;
    }
    /**
     * Computes the normal matrix which is the inverse transpose of the upper
     * left 3x3 portion of the given 4x4 matrix.
     *
     * @param {Matrix4} matrix4 - The 4x4 matrix.
     * @return {Matrix3} A reference to this matrix.
     */
    getNormalMatrix(matrix4) {
      return this.setFromMatrix4(matrix4).invert().transpose();
    }
    /**
     * Transposes this matrix into the supplied array, and returns itself unchanged.
     *
     * @param {Array<number>} r - An array to store the transposed matrix elements.
     * @return {Matrix3} A reference to this matrix.
     */
    transposeIntoArray(r) {
      const m = this.elements;
      r[0] = m[0];
      r[1] = m[3];
      r[2] = m[6];
      r[3] = m[1];
      r[4] = m[4];
      r[5] = m[7];
      r[6] = m[2];
      r[7] = m[5];
      r[8] = m[8];
      return this;
    }
    /**
     * Sets the UV transform matrix from offset, repeat, rotation, and center.
     *
     * @param {number} tx - Offset x.
     * @param {number} ty - Offset y.
     * @param {number} sx - Repeat x.
     * @param {number} sy - Repeat y.
     * @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise.
     * @param {number} cx - Center x of rotation.
     * @param {number} cy - Center y of rotation
     * @return {Matrix3} A reference to this matrix.
     */
    setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
      const c = Math.cos(rotation);
      const s = Math.sin(rotation);
      this.set(
        sx * c,
        sx * s,
        -sx * (c * cx + s * cy) + cx + tx,
        -sy * s,
        sy * c,
        -sy * (-s * cx + c * cy) + cy + ty,
        0,
        0,
        1
      );
      return this;
    }
    /**
     * Scales this matrix with the given scalar values.
     *
     * @param {number} sx - The amount to scale in the X axis.
     * @param {number} sy - The amount to scale in the Y axis.
     * @return {Matrix3} A reference to this matrix.
     */
    scale(sx, sy) {
      this.premultiply(_m3.makeScale(sx, sy));
      return this;
    }
    /**
     * Rotates this matrix by the given angle.
     *
     * @param {number} theta - The rotation in radians.
     * @return {Matrix3} A reference to this matrix.
     */
    rotate(theta) {
      this.premultiply(_m3.makeRotation(-theta));
      return this;
    }
    /**
     * Translates this matrix by the given scalar values.
     *
     * @param {number} tx - The amount to translate in the X axis.
     * @param {number} ty - The amount to translate in the Y axis.
     * @return {Matrix3} A reference to this matrix.
     */
    translate(tx, ty) {
      this.premultiply(_m3.makeTranslation(tx, ty));
      return this;
    }
    // for 2D Transforms
    /**
     * Sets this matrix as a 2D translation transform.
     *
     * @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.
     * @param {number} y - The amount to translate in the Y axis.
     * @return {Matrix3} A reference to this matrix.
     */
    makeTranslation(x2, y) {
      if (x2.isVector2) {
        this.set(
          1,
          0,
          x2.x,
          0,
          1,
          x2.y,
          0,
          0,
          1
        );
      } else {
        this.set(
          1,
          0,
          x2,
          0,
          1,
          y,
          0,
          0,
          1
        );
      }
      return this;
    }
    /**
     * Sets this matrix as a 2D rotational transformation.
     *
     * @param {number} theta - The rotation in radians.
     * @return {Matrix3} A reference to this matrix.
     */
    makeRotation(theta) {
      const c = Math.cos(theta);
      const s = Math.sin(theta);
      this.set(
        c,
        -s,
        0,
        s,
        c,
        0,
        0,
        0,
        1
      );
      return this;
    }
    /**
     * Sets this matrix as a 2D scale transform.
     *
     * @param {number} x - The amount to scale in the X axis.
     * @param {number} y - The amount to scale in the Y axis.
     * @return {Matrix3} A reference to this matrix.
     */
    makeScale(x2, y) {
      this.set(
        x2,
        0,
        0,
        0,
        y,
        0,
        0,
        0,
        1
      );
      return this;
    }
    /**
     * Returns \`true\` if this matrix is equal with the given one.
     *
     * @param {Matrix3} matrix - The matrix to test for equality.
     * @return {boolean} Whether this matrix is equal with the given one.
     */
    equals(matrix) {
      const te = this.elements;
      const me = matrix.elements;
      for (let i2 = 0; i2 < 9; i2++) {
        if (te[i2] !== me[i2]) return false;
      }
      return true;
    }
    /**
     * Sets the elements of the matrix from the given array.
     *
     * @param {Array<number>} array - The matrix elements in column-major order.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Matrix3} A reference to this matrix.
     */
    fromArray(array, offset = 0) {
      for (let i2 = 0; i2 < 9; i2++) {
        this.elements[i2] = array[i2 + offset];
      }
      return this;
    }
    /**
     * Writes the elements of this matrix to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number>} The matrix elements in column-major order.
     */
    toArray(array = [], offset = 0) {
      const te = this.elements;
      array[offset] = te[0];
      array[offset + 1] = te[1];
      array[offset + 2] = te[2];
      array[offset + 3] = te[3];
      array[offset + 4] = te[4];
      array[offset + 5] = te[5];
      array[offset + 6] = te[6];
      array[offset + 7] = te[7];
      array[offset + 8] = te[8];
      return array;
    }
    /**
     * Returns a matrix with copied values from this instance.
     *
     * @return {Matrix3} A clone of this instance.
     */
    clone() {
      return new this.constructor().fromArray(this.elements);
    }
  }
  const _m3 = /* @__PURE__ */ new Matrix3();
  const LINEAR_REC709_TO_XYZ = /* @__PURE__ */ new Matrix3().set(
    0.4123908,
    0.3575843,
    0.1804808,
    0.212639,
    0.7151687,
    0.0721923,
    0.0193308,
    0.1191948,
    0.9505322
  );
  const XYZ_TO_LINEAR_REC709 = /* @__PURE__ */ new Matrix3().set(
    3.2409699,
    -1.5373832,
    -0.4986108,
    -0.9692436,
    1.8759675,
    0.0415551,
    0.0556301,
    -0.203977,
    1.0569715
  );
  function createColorManagement() {
    const ColorManagement2 = {
      enabled: true,
      workingColorSpace: LinearSRGBColorSpace,
      /**
       * Implementations of supported color spaces.
       *
       * Required:
       *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
       *	- whitePoint: reference white [ x y ]
       *	- transfer: transfer function (pre-defined)
       *	- toXYZ: Matrix3 RGB to XYZ transform
       *	- fromXYZ: Matrix3 XYZ to RGB transform
       *	- luminanceCoefficients: RGB luminance coefficients
       *
       * Optional:
       *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace, toneMappingMode: 'extended' | 'standard' }
       *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
       *
       * Reference:
       * - https://www.russellcottrell.com/photo/matrixCalculator.htm
       */
      spaces: {},
      convert: function(color, sourceColorSpace, targetColorSpace) {
        if (this.enabled === false || sourceColorSpace === targetColorSpace || !sourceColorSpace || !targetColorSpace) {
          return color;
        }
        if (this.spaces[sourceColorSpace].transfer === SRGBTransfer) {
          color.r = SRGBToLinear(color.r);
          color.g = SRGBToLinear(color.g);
          color.b = SRGBToLinear(color.b);
        }
        if (this.spaces[sourceColorSpace].primaries !== this.spaces[targetColorSpace].primaries) {
          color.applyMatrix3(this.spaces[sourceColorSpace].toXYZ);
          color.applyMatrix3(this.spaces[targetColorSpace].fromXYZ);
        }
        if (this.spaces[targetColorSpace].transfer === SRGBTransfer) {
          color.r = LinearToSRGB(color.r);
          color.g = LinearToSRGB(color.g);
          color.b = LinearToSRGB(color.b);
        }
        return color;
      },
      workingToColorSpace: function(color, targetColorSpace) {
        return this.convert(color, this.workingColorSpace, targetColorSpace);
      },
      colorSpaceToWorking: function(color, sourceColorSpace) {
        return this.convert(color, sourceColorSpace, this.workingColorSpace);
      },
      getPrimaries: function(colorSpace) {
        return this.spaces[colorSpace].primaries;
      },
      getTransfer: function(colorSpace) {
        if (colorSpace === NoColorSpace) return LinearTransfer;
        return this.spaces[colorSpace].transfer;
      },
      getToneMappingMode: function(colorSpace) {
        return this.spaces[colorSpace].outputColorSpaceConfig.toneMappingMode || "standard";
      },
      getLuminanceCoefficients: function(target, colorSpace = this.workingColorSpace) {
        return target.fromArray(this.spaces[colorSpace].luminanceCoefficients);
      },
      define: function(colorSpaces) {
        Object.assign(this.spaces, colorSpaces);
      },
      // Internal APIs
      _getMatrix: function(targetMatrix, sourceColorSpace, targetColorSpace) {
        return targetMatrix.copy(this.spaces[sourceColorSpace].toXYZ).multiply(this.spaces[targetColorSpace].fromXYZ);
      },
      _getDrawingBufferColorSpace: function(colorSpace) {
        return this.spaces[colorSpace].outputColorSpaceConfig.drawingBufferColorSpace;
      },
      _getUnpackColorSpace: function(colorSpace = this.workingColorSpace) {
        return this.spaces[colorSpace].workingColorSpaceConfig.unpackColorSpace;
      },
      // Deprecated
      fromWorkingColorSpace: function(color, targetColorSpace) {
        warnOnce("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().");
        return ColorManagement2.workingToColorSpace(color, targetColorSpace);
      },
      toWorkingColorSpace: function(color, sourceColorSpace) {
        warnOnce("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().");
        return ColorManagement2.colorSpaceToWorking(color, sourceColorSpace);
      }
    };
    const REC709_PRIMARIES = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06];
    const REC709_LUMINANCE_COEFFICIENTS = [0.2126, 0.7152, 0.0722];
    const D65 = [0.3127, 0.329];
    ColorManagement2.define({
      [LinearSRGBColorSpace]: {
        primaries: REC709_PRIMARIES,
        whitePoint: D65,
        transfer: LinearTransfer,
        toXYZ: LINEAR_REC709_TO_XYZ,
        fromXYZ: XYZ_TO_LINEAR_REC709,
        luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
        workingColorSpaceConfig: { unpackColorSpace: SRGBColorSpace },
        outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }
      },
      [SRGBColorSpace]: {
        primaries: REC709_PRIMARIES,
        whitePoint: D65,
        transfer: SRGBTransfer,
        toXYZ: LINEAR_REC709_TO_XYZ,
        fromXYZ: XYZ_TO_LINEAR_REC709,
        luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
        outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }
      }
    });
    return ColorManagement2;
  }
  const ColorManagement = /* @__PURE__ */ createColorManagement();
  function SRGBToLinear(c) {
    return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
  }
  function LinearToSRGB(c) {
    return c < 31308e-7 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
  }
  class Box3 {
    /**
     * Constructs a new bounding box.
     *
     * @param {Vector3} [min=(Infinity,Infinity,Infinity)] - A vector representing the lower boundary of the box.
     * @param {Vector3} [max=(-Infinity,-Infinity,-Infinity)] - A vector representing the upper boundary of the box.
     */
    constructor(min = new Vector3(Infinity, Infinity, Infinity), max2 = new Vector3(-Infinity, -Infinity, -Infinity)) {
      this.isBox3 = true;
      this.min = min;
      this.max = max2;
    }
    /**
     * Sets the lower and upper boundaries of this box.
     * Please note that this method only copies the values from the given objects.
     *
     * @param {Vector3} min - The lower boundary of the box.
     * @param {Vector3} max - The upper boundary of the box.
     * @return {Box3} A reference to this bounding box.
     */
    set(min, max2) {
      this.min.copy(min);
      this.max.copy(max2);
      return this;
    }
    /**
     * Sets the upper and lower bounds of this box so it encloses the position data
     * in the given array.
     *
     * @param {Array<number>} array - An array holding 3D position data.
     * @return {Box3} A reference to this bounding box.
     */
    setFromArray(array) {
      this.makeEmpty();
      for (let i2 = 0, il = array.length; i2 < il; i2 += 3) {
        this.expandByPoint(_vector$b.fromArray(array, i2));
      }
      return this;
    }
    /**
     * Sets the upper and lower bounds of this box so it encloses the position data
     * in the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - A buffer attribute holding 3D position data.
     * @return {Box3} A reference to this bounding box.
     */
    setFromBufferAttribute(attribute) {
      this.makeEmpty();
      for (let i2 = 0, il = attribute.count; i2 < il; i2++) {
        this.expandByPoint(_vector$b.fromBufferAttribute(attribute, i2));
      }
      return this;
    }
    /**
     * Sets the upper and lower bounds of this box so it encloses the position data
     * in the given array.
     *
     * @param {Array<Vector3>} points - An array holding 3D position data as instances of {@link Vector3}.
     * @return {Box3} A reference to this bounding box.
     */
    setFromPoints(points) {
      this.makeEmpty();
      for (let i2 = 0, il = points.length; i2 < il; i2++) {
        this.expandByPoint(points[i2]);
      }
      return this;
    }
    /**
     * Centers this box on the given center vector and sets this box's width, height and
     * depth to the given size values.
     *
     * @param {Vector3} center - The center of the box.
     * @param {Vector3} size - The x, y and z dimensions of the box.
     * @return {Box3} A reference to this bounding box.
     */
    setFromCenterAndSize(center, size) {
      const halfSize = _vector$b.copy(size).multiplyScalar(0.5);
      this.min.copy(center).sub(halfSize);
      this.max.copy(center).add(halfSize);
      return this;
    }
    /**
     * Computes the world-axis-aligned bounding box for the given 3D object
     * (including its children), accounting for the object's, and children's,
     * world transforms. The function may result in a larger box than strictly necessary.
     *
     * @param {Object3D} object - The 3D object to compute the bounding box for.
     * @param {boolean} [precise=false] - If set to \`true\`, the method computes the smallest
     * world-axis-aligned bounding box at the expense of more computation.
     * @return {Box3} A reference to this bounding box.
     */
    setFromObject(object, precise = false) {
      this.makeEmpty();
      return this.expandByObject(object, precise);
    }
    /**
     * Returns a new box with copied values from this instance.
     *
     * @return {Box3} A clone of this instance.
     */
    clone() {
      return new this.constructor().copy(this);
    }
    /**
     * Copies the values of the given box to this instance.
     *
     * @param {Box3} box - The box to copy.
     * @return {Box3} A reference to this bounding box.
     */
    copy(box) {
      this.min.copy(box.min);
      this.max.copy(box.max);
      return this;
    }
    /**
     * Makes this box empty which means in encloses a zero space in 3D.
     *
     * @return {Box3} A reference to this bounding box.
     */
    makeEmpty() {
      this.min.x = this.min.y = this.min.z = Infinity;
      this.max.x = this.max.y = this.max.z = -Infinity;
      return this;
    }
    /**
     * Returns true if this box includes zero points within its bounds.
     * Note that a box with equal lower and upper bounds still includes one
     * point, the one both bounds share.
     *
     * @return {boolean} Whether this box is empty or not.
     */
    isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }
    /**
     * Returns the center point of this box.
     *
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The center point.
     */
    getCenter(target) {
      return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
    /**
     * Returns the dimensions of this box.
     *
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The size.
     */
    getSize(target) {
      return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
    }
    /**
     * Expands the boundaries of this box to include the given point.
     *
     * @param {Vector3} point - The point that should be included by the bounding box.
     * @return {Box3} A reference to this bounding box.
     */
    expandByPoint(point) {
      this.min.min(point);
      this.max.max(point);
      return this;
    }
    /**
     * Expands this box equilaterally by the given vector. The width of this
     * box will be expanded by the x component of the vector in both
     * directions. The height of this box will be expanded by the y component of
     * the vector in both directions. The depth of this box will be
     * expanded by the z component of the vector in both directions.
     *
     * @param {Vector3} vector - The vector that should expand the bounding box.
     * @return {Box3} A reference to this bounding box.
     */
    expandByVector(vector) {
      this.min.sub(vector);
      this.max.add(vector);
      return this;
    }
    /**
     * Expands each dimension of the box by the given scalar. If negative, the
     * dimensions of the box will be contracted.
     *
     * @param {number} scalar - The scalar value that should expand the bounding box.
     * @return {Box3} A reference to this bounding box.
     */
    expandByScalar(scalar) {
      this.min.addScalar(-scalar);
      this.max.addScalar(scalar);
      return this;
    }
    /**
     * Expands the boundaries of this box to include the given 3D object and
     * its children, accounting for the object's, and children's, world
     * transforms. The function may result in a larger box than strictly
     * necessary (unless the precise parameter is set to true).
     *
     * @param {Object3D} object - The 3D object that should expand the bounding box.
     * @param {boolean} precise - If set to \`true\`, the method expands the bounding box
     * as little as necessary at the expense of more computation.
     * @return {Box3} A reference to this bounding box.
     */
    expandByObject(object, precise = false) {
      object.updateWorldMatrix(false, false);
      const geometry = object.geometry;
      if (geometry !== void 0) {
        const positionAttribute = geometry.getAttribute("position");
        if (precise === true && positionAttribute !== void 0 && object.isInstancedMesh !== true) {
          for (let i2 = 0, l = positionAttribute.count; i2 < l; i2++) {
            if (object.isMesh === true) {
              object.getVertexPosition(i2, _vector$b);
            } else {
              _vector$b.fromBufferAttribute(positionAttribute, i2);
            }
            _vector$b.applyMatrix4(object.matrixWorld);
            this.expandByPoint(_vector$b);
          }
        } else {
          if (object.boundingBox !== void 0) {
            if (object.boundingBox === null) {
              object.computeBoundingBox();
            }
            _box$4.copy(object.boundingBox);
          } else {
            if (geometry.boundingBox === null) {
              geometry.computeBoundingBox();
            }
            _box$4.copy(geometry.boundingBox);
          }
          _box$4.applyMatrix4(object.matrixWorld);
          this.union(_box$4);
        }
      }
      const children = object.children;
      for (let i2 = 0, l = children.length; i2 < l; i2++) {
        this.expandByObject(children[i2], precise);
      }
      return this;
    }
    /**
     * Returns \`true\` if the given point lies within or on the boundaries of this box.
     *
     * @param {Vector3} point - The point to test.
     * @return {boolean} Whether the bounding box contains the given point or not.
     */
    containsPoint(point) {
      return point.x >= this.min.x && point.x <= this.max.x && point.y >= this.min.y && point.y <= this.max.y && point.z >= this.min.z && point.z <= this.max.z;
    }
    /**
     * Returns \`true\` if this bounding box includes the entirety of the given bounding box.
     * If this box and the given one are identical, this function also returns \`true\`.
     *
     * @param {Box3} box - The bounding box to test.
     * @return {boolean} Whether the bounding box contains the given bounding box or not.
     */
    containsBox(box) {
      return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
    }
    /**
     * Returns a point as a proportion of this box's width, height and depth.
     *
     * @param {Vector3} point - A point in 3D space.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} A point as a proportion of this box's width, height and depth.
     */
    getParameter(point, target) {
      return target.set(
        (point.x - this.min.x) / (this.max.x - this.min.x),
        (point.y - this.min.y) / (this.max.y - this.min.y),
        (point.z - this.min.z) / (this.max.z - this.min.z)
      );
    }
    /**
     * Returns \`true\` if the given bounding box intersects with this bounding box.
     *
     * @param {Box3} box - The bounding box to test.
     * @return {boolean} Whether the given bounding box intersects with this bounding box.
     */
    intersectsBox(box) {
      return box.max.x >= this.min.x && box.min.x <= this.max.x && box.max.y >= this.min.y && box.min.y <= this.max.y && box.max.z >= this.min.z && box.min.z <= this.max.z;
    }
    /**
     * Returns \`true\` if the given bounding sphere intersects with this bounding box.
     *
     * @param {Sphere} sphere - The bounding sphere to test.
     * @return {boolean} Whether the given bounding sphere intersects with this bounding box.
     */
    intersectsSphere(sphere) {
      this.clampPoint(sphere.center, _vector$b);
      return _vector$b.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
    }
    /**
     * Returns \`true\` if the given plane intersects with this bounding box.
     *
     * @param {Plane} plane - The plane to test.
     * @return {boolean} Whether the given plane intersects with this bounding box.
     */
    intersectsPlane(plane) {
      let min, max2;
      if (plane.normal.x > 0) {
        min = plane.normal.x * this.min.x;
        max2 = plane.normal.x * this.max.x;
      } else {
        min = plane.normal.x * this.max.x;
        max2 = plane.normal.x * this.min.x;
      }
      if (plane.normal.y > 0) {
        min += plane.normal.y * this.min.y;
        max2 += plane.normal.y * this.max.y;
      } else {
        min += plane.normal.y * this.max.y;
        max2 += plane.normal.y * this.min.y;
      }
      if (plane.normal.z > 0) {
        min += plane.normal.z * this.min.z;
        max2 += plane.normal.z * this.max.z;
      } else {
        min += plane.normal.z * this.max.z;
        max2 += plane.normal.z * this.min.z;
      }
      return min <= -plane.constant && max2 >= -plane.constant;
    }
    /**
     * Returns \`true\` if the given triangle intersects with this bounding box.
     *
     * @param {Triangle} triangle - The triangle to test.
     * @return {boolean} Whether the given triangle intersects with this bounding box.
     */
    intersectsTriangle(triangle) {
      if (this.isEmpty()) {
        return false;
      }
      this.getCenter(_center);
      _extents.subVectors(this.max, _center);
      _v0$2.subVectors(triangle.a, _center);
      _v1$7.subVectors(triangle.b, _center);
      _v2$4.subVectors(triangle.c, _center);
      _f0.subVectors(_v1$7, _v0$2);
      _f1.subVectors(_v2$4, _v1$7);
      _f2.subVectors(_v0$2, _v2$4);
      let axes = [
        0,
        -_f0.z,
        _f0.y,
        0,
        -_f1.z,
        _f1.y,
        0,
        -_f2.z,
        _f2.y,
        _f0.z,
        0,
        -_f0.x,
        _f1.z,
        0,
        -_f1.x,
        _f2.z,
        0,
        -_f2.x,
        -_f0.y,
        _f0.x,
        0,
        -_f1.y,
        _f1.x,
        0,
        -_f2.y,
        _f2.x,
        0
      ];
      if (!satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents)) {
        return false;
      }
      axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      if (!satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents)) {
        return false;
      }
      _triangleNormal.crossVectors(_f0, _f1);
      axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];
      return satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents);
    }
    /**
     * Clamps the given point within the bounds of this box.
     *
     * @param {Vector3} point - The point to clamp.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The clamped point.
     */
    clampPoint(point, target) {
      return target.copy(point).clamp(this.min, this.max);
    }
    /**
     * Returns the euclidean distance from any edge of this box to the specified point. If
     * the given point lies inside of this box, the distance will be \`0\`.
     *
     * @param {Vector3} point - The point to compute the distance to.
     * @return {number} The euclidean distance.
     */
    distanceToPoint(point) {
      return this.clampPoint(point, _vector$b).distanceTo(point);
    }
    /**
     * Returns a bounding sphere that encloses this bounding box.
     *
     * @param {Sphere} target - The target sphere that is used to store the method's result.
     * @return {Sphere} The bounding sphere that encloses this bounding box.
     */
    getBoundingSphere(target) {
      if (this.isEmpty()) {
        target.makeEmpty();
      } else {
        this.getCenter(target.center);
        target.radius = this.getSize(_vector$b).length() * 0.5;
      }
      return target;
    }
    /**
     * Computes the intersection of this bounding box and the given one, setting the upper
     * bound of this box to the lesser of the two boxes' upper bounds and the
     * lower bound of this box to the greater of the two boxes' lower bounds. If
     * there's no overlap, makes this box empty.
     *
     * @param {Box3} box - The bounding box to intersect with.
     * @return {Box3} A reference to this bounding box.
     */
    intersect(box) {
      this.min.max(box.min);
      this.max.min(box.max);
      if (this.isEmpty()) this.makeEmpty();
      return this;
    }
    /**
     * Computes the union of this box and another and the given one, setting the upper
     * bound of this box to the greater of the two boxes' upper bounds and the
     * lower bound of this box to the lesser of the two boxes' lower bounds.
     *
     * @param {Box3} box - The bounding box that will be unioned with this instance.
     * @return {Box3} A reference to this bounding box.
     */
    union(box) {
      this.min.min(box.min);
      this.max.max(box.max);
      return this;
    }
    /**
     * Transforms this bounding box by the given 4x4 transformation matrix.
     *
     * @param {Matrix4} matrix - The transformation matrix.
     * @return {Box3} A reference to this bounding box.
     */
    applyMatrix4(matrix) {
      if (this.isEmpty()) return this;
      _points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix);
      _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix);
      _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix);
      _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix);
      _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix);
      _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix);
      _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix);
      _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix);
      this.setFromPoints(_points);
      return this;
    }
    /**
     * Adds the given offset to both the upper and lower bounds of this bounding box,
     * effectively moving it in 3D space.
     *
     * @param {Vector3} offset - The offset that should be used to translate the bounding box.
     * @return {Box3} A reference to this bounding box.
     */
    translate(offset) {
      this.min.add(offset);
      this.max.add(offset);
      return this;
    }
    /**
     * Returns \`true\` if this bounding box is equal with the given one.
     *
     * @param {Box3} box - The box to test for equality.
     * @return {boolean} Whether this bounding box is equal with the given one.
     */
    equals(box) {
      return box.min.equals(this.min) && box.max.equals(this.max);
    }
    /**
     * Returns a serialized structure of the bounding box.
     *
     * @return {Object} Serialized structure with fields representing the object state.
     */
    toJSON() {
      return {
        min: this.min.toArray(),
        max: this.max.toArray()
      };
    }
    /**
     * Returns a serialized structure of the bounding box.
     *
     * @param {Object} json - The serialized json to set the box from.
     * @return {Box3} A reference to this bounding box.
     */
    fromJSON(json) {
      this.min.fromArray(json.min);
      this.max.fromArray(json.max);
      return this;
    }
  }
  const _points = [
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3()
  ];
  const _vector$b = /* @__PURE__ */ new Vector3();
  const _box$4 = /* @__PURE__ */ new Box3();
  const _v0$2 = /* @__PURE__ */ new Vector3();
  const _v1$7 = /* @__PURE__ */ new Vector3();
  const _v2$4 = /* @__PURE__ */ new Vector3();
  const _f0 = /* @__PURE__ */ new Vector3();
  const _f1 = /* @__PURE__ */ new Vector3();
  const _f2 = /* @__PURE__ */ new Vector3();
  const _center = /* @__PURE__ */ new Vector3();
  const _extents = /* @__PURE__ */ new Vector3();
  const _triangleNormal = /* @__PURE__ */ new Vector3();
  const _testAxis = /* @__PURE__ */ new Vector3();
  function satForAxes(axes, v0, v1, v2, extents) {
    for (let i2 = 0, j = axes.length - 3; i2 <= j; i2 += 3) {
      _testAxis.fromArray(axes, i2);
      const r = extents.x * Math.abs(_testAxis.x) + extents.y * Math.abs(_testAxis.y) + extents.z * Math.abs(_testAxis.z);
      const p0 = v0.dot(_testAxis);
      const p1 = v1.dot(_testAxis);
      const p2 = v2.dot(_testAxis);
      if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {
        return false;
      }
    }
    return true;
  }
  const _colorKeywords = {
    "aliceblue": 15792383,
    "antiquewhite": 16444375,
    "aqua": 65535,
    "aquamarine": 8388564,
    "azure": 15794175,
    "beige": 16119260,
    "bisque": 16770244,
    "black": 0,
    "blanchedalmond": 16772045,
    "blue": 255,
    "blueviolet": 9055202,
    "brown": 10824234,
    "burlywood": 14596231,
    "cadetblue": 6266528,
    "chartreuse": 8388352,
    "chocolate": 13789470,
    "coral": 16744272,
    "cornflowerblue": 6591981,
    "cornsilk": 16775388,
    "crimson": 14423100,
    "cyan": 65535,
    "darkblue": 139,
    "darkcyan": 35723,
    "darkgoldenrod": 12092939,
    "darkgray": 11119017,
    "darkgreen": 25600,
    "darkgrey": 11119017,
    "darkkhaki": 12433259,
    "darkmagenta": 9109643,
    "darkolivegreen": 5597999,
    "darkorange": 16747520,
    "darkorchid": 10040012,
    "darkred": 9109504,
    "darksalmon": 15308410,
    "darkseagreen": 9419919,
    "darkslateblue": 4734347,
    "darkslategray": 3100495,
    "darkslategrey": 3100495,
    "darkturquoise": 52945,
    "darkviolet": 9699539,
    "deeppink": 16716947,
    "deepskyblue": 49151,
    "dimgray": 6908265,
    "dimgrey": 6908265,
    "dodgerblue": 2003199,
    "firebrick": 11674146,
    "floralwhite": 16775920,
    "forestgreen": 2263842,
    "fuchsia": 16711935,
    "gainsboro": 14474460,
    "ghostwhite": 16316671,
    "gold": 16766720,
    "goldenrod": 14329120,
    "gray": 8421504,
    "green": 32768,
    "greenyellow": 11403055,
    "grey": 8421504,
    "honeydew": 15794160,
    "hotpink": 16738740,
    "indianred": 13458524,
    "indigo": 4915330,
    "ivory": 16777200,
    "khaki": 15787660,
    "lavender": 15132410,
    "lavenderblush": 16773365,
    "lawngreen": 8190976,
    "lemonchiffon": 16775885,
    "lightblue": 11393254,
    "lightcoral": 15761536,
    "lightcyan": 14745599,
    "lightgoldenrodyellow": 16448210,
    "lightgray": 13882323,
    "lightgreen": 9498256,
    "lightgrey": 13882323,
    "lightpink": 16758465,
    "lightsalmon": 16752762,
    "lightseagreen": 2142890,
    "lightskyblue": 8900346,
    "lightslategray": 7833753,
    "lightslategrey": 7833753,
    "lightsteelblue": 11584734,
    "lightyellow": 16777184,
    "lime": 65280,
    "limegreen": 3329330,
    "linen": 16445670,
    "magenta": 16711935,
    "maroon": 8388608,
    "mediumaquamarine": 6737322,
    "mediumblue": 205,
    "mediumorchid": 12211667,
    "mediumpurple": 9662683,
    "mediumseagreen": 3978097,
    "mediumslateblue": 8087790,
    "mediumspringgreen": 64154,
    "mediumturquoise": 4772300,
    "mediumvioletred": 13047173,
    "midnightblue": 1644912,
    "mintcream": 16121850,
    "mistyrose": 16770273,
    "moccasin": 16770229,
    "navajowhite": 16768685,
    "navy": 128,
    "oldlace": 16643558,
    "olive": 8421376,
    "olivedrab": 7048739,
    "orange": 16753920,
    "orangered": 16729344,
    "orchid": 14315734,
    "palegoldenrod": 15657130,
    "palegreen": 10025880,
    "paleturquoise": 11529966,
    "palevioletred": 14381203,
    "papayawhip": 16773077,
    "peachpuff": 16767673,
    "peru": 13468991,
    "pink": 16761035,
    "plum": 14524637,
    "powderblue": 11591910,
    "purple": 8388736,
    "rebeccapurple": 6697881,
    "red": 16711680,
    "rosybrown": 12357519,
    "royalblue": 4286945,
    "saddlebrown": 9127187,
    "salmon": 16416882,
    "sandybrown": 16032864,
    "seagreen": 3050327,
    "seashell": 16774638,
    "sienna": 10506797,
    "silver": 12632256,
    "skyblue": 8900331,
    "slateblue": 6970061,
    "slategray": 7372944,
    "slategrey": 7372944,
    "snow": 16775930,
    "springgreen": 65407,
    "steelblue": 4620980,
    "tan": 13808780,
    "teal": 32896,
    "thistle": 14204888,
    "tomato": 16737095,
    "turquoise": 4251856,
    "violet": 15631086,
    "wheat": 16113331,
    "white": 16777215,
    "whitesmoke": 16119285,
    "yellow": 16776960,
    "yellowgreen": 10145074
  };
  const _hslA = { h: 0, s: 0, l: 0 };
  const _hslB = { h: 0, s: 0, l: 0 };
  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
    return p;
  }
  class Color {
    /**
     * Constructs a new color.
     *
     * Note that standard method of specifying color in three.js is with a hexadecimal triplet,
     * and that method is used throughout the rest of the documentation.
     *
     * @param {(number|string|Color)} [r] - The red component of the color. If \`g\` and \`b\` are
     * not provided, it can be hexadecimal triplet, a CSS-style string or another \`Color\` instance.
     * @param {number} [g] - The green component.
     * @param {number} [b] - The blue component.
     */
    constructor(r, g, b) {
      this.isColor = true;
      this.r = 1;
      this.g = 1;
      this.b = 1;
      return this.set(r, g, b);
    }
    /**
     * Sets the colors's components from the given values.
     *
     * @param {(number|string|Color)} [r] - The red component of the color. If \`g\` and \`b\` are
     * not provided, it can be hexadecimal triplet, a CSS-style string or another \`Color\` instance.
     * @param {number} [g] - The green component.
     * @param {number} [b] - The blue component.
     * @return {Color} A reference to this color.
     */
    set(r, g, b) {
      if (g === void 0 && b === void 0) {
        const value = r;
        if (value && value.isColor) {
          this.copy(value);
        } else if (typeof value === "number") {
          this.setHex(value);
        } else if (typeof value === "string") {
          this.setStyle(value);
        }
      } else {
        this.setRGB(r, g, b);
      }
      return this;
    }
    /**
     * Sets the colors's components to the given scalar value.
     *
     * @param {number} scalar - The scalar value.
     * @return {Color} A reference to this color.
     */
    setScalar(scalar) {
      this.r = scalar;
      this.g = scalar;
      this.b = scalar;
      return this;
    }
    /**
     * Sets this color from a hexadecimal value.
     *
     * @param {number} hex - The hexadecimal value.
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setHex(hex, colorSpace = SRGBColorSpace) {
      hex = Math.floor(hex);
      this.r = (hex >> 16 & 255) / 255;
      this.g = (hex >> 8 & 255) / 255;
      this.b = (hex & 255) / 255;
      ColorManagement.colorSpaceToWorking(this, colorSpace);
      return this;
    }
    /**
     * Sets this color from RGB values.
     *
     * @param {number} r - Red channel value between \`0.0\` and \`1.0\`.
     * @param {number} g - Green channel value between \`0.0\` and \`1.0\`.
     * @param {number} b - Blue channel value between \`0.0\` and \`1.0\`.
     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setRGB(r, g, b, colorSpace = ColorManagement.workingColorSpace) {
      this.r = r;
      this.g = g;
      this.b = b;
      ColorManagement.colorSpaceToWorking(this, colorSpace);
      return this;
    }
    /**
     * Sets this color from RGB values.
     *
     * @param {number} h - Hue value between \`0.0\` and \`1.0\`.
     * @param {number} s - Saturation value between \`0.0\` and \`1.0\`.
     * @param {number} l - Lightness value between \`0.0\` and \`1.0\`.
     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setHSL(h, s, l, colorSpace = ColorManagement.workingColorSpace) {
      h = euclideanModulo(h, 1);
      s = clamp(s, 0, 1);
      l = clamp(l, 0, 1);
      if (s === 0) {
        this.r = this.g = this.b = l;
      } else {
        const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
        const q = 2 * l - p;
        this.r = hue2rgb(q, p, h + 1 / 3);
        this.g = hue2rgb(q, p, h);
        this.b = hue2rgb(q, p, h - 1 / 3);
      }
      ColorManagement.colorSpaceToWorking(this, colorSpace);
      return this;
    }
    /**
     * Sets this color from a CSS-style string. For example, \`rgb(250, 0,0)\`,
     * \`rgb(100%, 0%, 0%)\`, \`hsl(0, 100%, 50%)\`, \`#ff0000\`, \`#f00\`, or \`red\` ( or
     * any [X11 color name](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) -
     * all 140 color names are supported).
     *
     * @param {string} style - Color as a CSS-style string.
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setStyle(style, colorSpace = SRGBColorSpace) {
      function handleAlpha(string) {
        if (string === void 0) return;
        if (parseFloat(string) < 1) {
          warn("Color: Alpha component of " + style + " will be ignored.");
        }
      }
      let m;
      if (m = /^(\\w+)\\(([^\\)]*)\\)/.exec(style)) {
        let color;
        const name = m[1];
        const components = m[2];
        switch (name) {
          case "rgb":
          case "rgba":
            if (color = /^\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*(?:,\\s*(\\d*\\.?\\d+)\\s*)?$/.exec(components)) {
              handleAlpha(color[4]);
              return this.setRGB(
                Math.min(255, parseInt(color[1], 10)) / 255,
                Math.min(255, parseInt(color[2], 10)) / 255,
                Math.min(255, parseInt(color[3], 10)) / 255,
                colorSpace
              );
            }
            if (color = /^\\s*(\\d+)\\%\\s*,\\s*(\\d+)\\%\\s*,\\s*(\\d+)\\%\\s*(?:,\\s*(\\d*\\.?\\d+)\\s*)?$/.exec(components)) {
              handleAlpha(color[4]);
              return this.setRGB(
                Math.min(100, parseInt(color[1], 10)) / 100,
                Math.min(100, parseInt(color[2], 10)) / 100,
                Math.min(100, parseInt(color[3], 10)) / 100,
                colorSpace
              );
            }
            break;
          case "hsl":
          case "hsla":
            if (color = /^\\s*(\\d*\\.?\\d+)\\s*,\\s*(\\d*\\.?\\d+)\\%\\s*,\\s*(\\d*\\.?\\d+)\\%\\s*(?:,\\s*(\\d*\\.?\\d+)\\s*)?$/.exec(components)) {
              handleAlpha(color[4]);
              return this.setHSL(
                parseFloat(color[1]) / 360,
                parseFloat(color[2]) / 100,
                parseFloat(color[3]) / 100,
                colorSpace
              );
            }
            break;
          default:
            warn("Color: Unknown color model " + style);
        }
      } else if (m = /^\\#([A-Fa-f\\d]+)$/.exec(style)) {
        const hex = m[1];
        const size = hex.length;
        if (size === 3) {
          return this.setRGB(
            parseInt(hex.charAt(0), 16) / 15,
            parseInt(hex.charAt(1), 16) / 15,
            parseInt(hex.charAt(2), 16) / 15,
            colorSpace
          );
        } else if (size === 6) {
          return this.setHex(parseInt(hex, 16), colorSpace);
        } else {
          warn("Color: Invalid hex color " + style);
        }
      } else if (style && style.length > 0) {
        return this.setColorName(style, colorSpace);
      }
      return this;
    }
    /**
     * Sets this color from a color name. Faster than {@link Color#setStyle} if
     * you don't need the other CSS-style formats.
     *
     * For convenience, the list of names is exposed in \`Color.NAMES\` as a hash.
     * \`\`\`js
     * Color.NAMES.aliceblue // returns 0xF0F8FF
     * \`\`\`
     *
     * @param {string} style - The color name.
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setColorName(style, colorSpace = SRGBColorSpace) {
      const hex = _colorKeywords[style.toLowerCase()];
      if (hex !== void 0) {
        this.setHex(hex, colorSpace);
      } else {
        warn("Color: Unknown color " + style);
      }
      return this;
    }
    /**
     * Returns a new color with copied values from this instance.
     *
     * @return {Color} A clone of this instance.
     */
    clone() {
      return new this.constructor(this.r, this.g, this.b);
    }
    /**
     * Copies the values of the given color to this instance.
     *
     * @param {Color} color - The color to copy.
     * @return {Color} A reference to this color.
     */
    copy(color) {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      return this;
    }
    /**
     * Copies the given color into this color, and then converts this color from
     * \`SRGBColorSpace\` to \`LinearSRGBColorSpace\`.
     *
     * @param {Color} color - The color to copy/convert.
     * @return {Color} A reference to this color.
     */
    copySRGBToLinear(color) {
      this.r = SRGBToLinear(color.r);
      this.g = SRGBToLinear(color.g);
      this.b = SRGBToLinear(color.b);
      return this;
    }
    /**
     * Copies the given color into this color, and then converts this color from
     * \`LinearSRGBColorSpace\` to \`SRGBColorSpace\`.
     *
     * @param {Color} color - The color to copy/convert.
     * @return {Color} A reference to this color.
     */
    copyLinearToSRGB(color) {
      this.r = LinearToSRGB(color.r);
      this.g = LinearToSRGB(color.g);
      this.b = LinearToSRGB(color.b);
      return this;
    }
    /**
     * Converts this color from \`SRGBColorSpace\` to \`LinearSRGBColorSpace\`.
     *
     * @return {Color} A reference to this color.
     */
    convertSRGBToLinear() {
      this.copySRGBToLinear(this);
      return this;
    }
    /**
     * Converts this color from \`LinearSRGBColorSpace\` to \`SRGBColorSpace\`.
     *
     * @return {Color} A reference to this color.
     */
    convertLinearToSRGB() {
      this.copyLinearToSRGB(this);
      return this;
    }
    /**
     * Returns the hexadecimal value of this color.
     *
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {number} The hexadecimal value.
     */
    getHex(colorSpace = SRGBColorSpace) {
      ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
      return Math.round(clamp(_color.r * 255, 0, 255)) * 65536 + Math.round(clamp(_color.g * 255, 0, 255)) * 256 + Math.round(clamp(_color.b * 255, 0, 255));
    }
    /**
     * Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
     *
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {string} The hexadecimal value as a string.
     */
    getHexString(colorSpace = SRGBColorSpace) {
      return ("000000" + this.getHex(colorSpace).toString(16)).slice(-6);
    }
    /**
     * Converts the colors RGB values into the HSL format and stores them into the
     * given target object.
     *
     * @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.
     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
     * @return {{h:number,s:number,l:number}} The HSL representation of this color.
     */
    getHSL(target, colorSpace = ColorManagement.workingColorSpace) {
      ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
      const r = _color.r, g = _color.g, b = _color.b;
      const max2 = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let hue, saturation;
      const lightness = (min + max2) / 2;
      if (min === max2) {
        hue = 0;
        saturation = 0;
      } else {
        const delta = max2 - min;
        saturation = lightness <= 0.5 ? delta / (max2 + min) : delta / (2 - max2 - min);
        switch (max2) {
          case r:
            hue = (g - b) / delta + (g < b ? 6 : 0);
            break;
          case g:
            hue = (b - r) / delta + 2;
            break;
          case b:
            hue = (r - g) / delta + 4;
            break;
        }
        hue /= 6;
      }
      target.h = hue;
      target.s = saturation;
      target.l = lightness;
      return target;
    }
    /**
     * Returns the RGB values of this color and stores them into the given target object.
     *
     * @param {Color} target - The target color that is used to store the method's result.
     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
     * @return {Color} The RGB representation of this color.
     */
    getRGB(target, colorSpace = ColorManagement.workingColorSpace) {
      ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
      target.r = _color.r;
      target.g = _color.g;
      target.b = _color.b;
      return target;
    }
    /**
     * Returns the value of this color as a CSS style string. Example: \`rgb(255,0,0)\`.
     *
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {string} The CSS representation of this color.
     */
    getStyle(colorSpace = SRGBColorSpace) {
      ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
      const r = _color.r, g = _color.g, b = _color.b;
      if (colorSpace !== SRGBColorSpace) {
        return \`color(\${colorSpace} \${r.toFixed(3)} \${g.toFixed(3)} \${b.toFixed(3)})\`;
      }
      return \`rgb(\${Math.round(r * 255)},\${Math.round(g * 255)},\${Math.round(b * 255)})\`;
    }
    /**
     * Adds the given HSL values to this color's values.
     * Internally, this converts the color's RGB values to HSL, adds HSL
     * and then converts the color back to RGB.
     *
     * @param {number} h - Hue value between \`0.0\` and \`1.0\`.
     * @param {number} s - Saturation value between \`0.0\` and \`1.0\`.
     * @param {number} l - Lightness value between \`0.0\` and \`1.0\`.
     * @return {Color} A reference to this color.
     */
    offsetHSL(h, s, l) {
      this.getHSL(_hslA);
      return this.setHSL(_hslA.h + h, _hslA.s + s, _hslA.l + l);
    }
    /**
     * Adds the RGB values of the given color to the RGB values of this color.
     *
     * @param {Color} color - The color to add.
     * @return {Color} A reference to this color.
     */
    add(color) {
      this.r += color.r;
      this.g += color.g;
      this.b += color.b;
      return this;
    }
    /**
     * Adds the RGB values of the given colors and stores the result in this instance.
     *
     * @param {Color} color1 - The first color.
     * @param {Color} color2 - The second color.
     * @return {Color} A reference to this color.
     */
    addColors(color1, color2) {
      this.r = color1.r + color2.r;
      this.g = color1.g + color2.g;
      this.b = color1.b + color2.b;
      return this;
    }
    /**
     * Adds the given scalar value to the RGB values of this color.
     *
     * @param {number} s - The scalar to add.
     * @return {Color} A reference to this color.
     */
    addScalar(s) {
      this.r += s;
      this.g += s;
      this.b += s;
      return this;
    }
    /**
     * Subtracts the RGB values of the given color from the RGB values of this color.
     *
     * @param {Color} color - The color to subtract.
     * @return {Color} A reference to this color.
     */
    sub(color) {
      this.r = Math.max(0, this.r - color.r);
      this.g = Math.max(0, this.g - color.g);
      this.b = Math.max(0, this.b - color.b);
      return this;
    }
    /**
     * Multiplies the RGB values of the given color with the RGB values of this color.
     *
     * @param {Color} color - The color to multiply.
     * @return {Color} A reference to this color.
     */
    multiply(color) {
      this.r *= color.r;
      this.g *= color.g;
      this.b *= color.b;
      return this;
    }
    /**
     * Multiplies the given scalar value with the RGB values of this color.
     *
     * @param {number} s - The scalar to multiply.
     * @return {Color} A reference to this color.
     */
    multiplyScalar(s) {
      this.r *= s;
      this.g *= s;
      this.b *= s;
      return this;
    }
    /**
     * Linearly interpolates this color's RGB values toward the RGB values of the
     * given color. The alpha argument can be thought of as the ratio between
     * the two colors, where \`0.0\` is this color and \`1.0\` is the first argument.
     *
     * @param {Color} color - The color to converge on.
     * @param {number} alpha - The interpolation factor in the closed interval \`[0,1]\`.
     * @return {Color} A reference to this color.
     */
    lerp(color, alpha) {
      this.r += (color.r - this.r) * alpha;
      this.g += (color.g - this.g) * alpha;
      this.b += (color.b - this.b) * alpha;
      return this;
    }
    /**
     * Linearly interpolates between the given colors and stores the result in this instance.
     * The alpha argument can be thought of as the ratio between the two colors, where \`0.0\`
     * is the first and \`1.0\` is the second color.
     *
     * @param {Color} color1 - The first color.
     * @param {Color} color2 - The second color.
     * @param {number} alpha - The interpolation factor in the closed interval \`[0,1]\`.
     * @return {Color} A reference to this color.
     */
    lerpColors(color1, color2, alpha) {
      this.r = color1.r + (color2.r - color1.r) * alpha;
      this.g = color1.g + (color2.g - color1.g) * alpha;
      this.b = color1.b + (color2.b - color1.b) * alpha;
      return this;
    }
    /**
     * Linearly interpolates this color's HSL values toward the HSL values of the
     * given color. It differs from {@link Color#lerp} by not interpolating straight
     * from one color to the other, but instead going through all the hues in between
     * those two colors. The alpha argument can be thought of as the ratio between
     * the two colors, where 0.0 is this color and 1.0 is the first argument.
     *
     * @param {Color} color - The color to converge on.
     * @param {number} alpha - The interpolation factor in the closed interval \`[0,1]\`.
     * @return {Color} A reference to this color.
     */
    lerpHSL(color, alpha) {
      this.getHSL(_hslA);
      color.getHSL(_hslB);
      const h = lerp(_hslA.h, _hslB.h, alpha);
      const s = lerp(_hslA.s, _hslB.s, alpha);
      const l = lerp(_hslA.l, _hslB.l, alpha);
      this.setHSL(h, s, l);
      return this;
    }
    /**
     * Sets the color's RGB components from the given 3D vector.
     *
     * @param {Vector3} v - The vector to set.
     * @return {Color} A reference to this color.
     */
    setFromVector3(v) {
      this.r = v.x;
      this.g = v.y;
      this.b = v.z;
      return this;
    }
    /**
     * Transforms this color with the given 3x3 matrix.
     *
     * @param {Matrix3} m - The matrix.
     * @return {Color} A reference to this color.
     */
    applyMatrix3(m) {
      const r = this.r, g = this.g, b = this.b;
      const e = m.elements;
      this.r = e[0] * r + e[3] * g + e[6] * b;
      this.g = e[1] * r + e[4] * g + e[7] * b;
      this.b = e[2] * r + e[5] * g + e[8] * b;
      return this;
    }
    /**
     * Returns \`true\` if this color is equal with the given one.
     *
     * @param {Color} c - The color to test for equality.
     * @return {boolean} Whether this bounding color is equal with the given one.
     */
    equals(c) {
      return c.r === this.r && c.g === this.g && c.b === this.b;
    }
    /**
     * Sets this color's RGB components from the given array.
     *
     * @param {Array<number>} array - An array holding the RGB values.
     * @param {number} [offset=0] - The offset into the array.
     * @return {Color} A reference to this color.
     */
    fromArray(array, offset = 0) {
      this.r = array[offset];
      this.g = array[offset + 1];
      this.b = array[offset + 2];
      return this;
    }
    /**
     * Writes the RGB components of this color to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number>} [array=[]] - The target array holding the color components.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number>} The color components.
     */
    toArray(array = [], offset = 0) {
      array[offset] = this.r;
      array[offset + 1] = this.g;
      array[offset + 2] = this.b;
      return array;
    }
    /**
     * Sets the components of this color from the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute holding color data.
     * @param {number} index - The index into the attribute.
     * @return {Color} A reference to this color.
     */
    fromBufferAttribute(attribute, index) {
      this.r = attribute.getX(index);
      this.g = attribute.getY(index);
      this.b = attribute.getZ(index);
      return this;
    }
    /**
     * This methods defines the serialization result of this class. Returns the color
     * as a hexadecimal value.
     *
     * @return {number} The hexadecimal value.
     */
    toJSON() {
      return this.getHex();
    }
    *[Symbol.iterator]() {
      yield this.r;
      yield this.g;
      yield this.b;
    }
  }
  const _color = /* @__PURE__ */ new Color();
  Color.NAMES = _colorKeywords;
  if (typeof __THREE_DEVTOOLS__ !== "undefined") {
    __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
      revision: REVISION
    } }));
  }
  if (typeof window !== "undefined") {
    if (window.__THREE__) {
      warn("WARNING: Multiple instances of Three.js being imported.");
    } else {
      window.__THREE__ = REVISION;
    }
  }
  const LN_SCALE_MIN = -12;
  const LN_SCALE_MAX = 9;
  const LN_SCALE_ZERO = -30;
  const SCALE_ZERO = Math.exp(LN_SCALE_ZERO);
  const SPLAT_TEX_WIDTH_BITS = 11;
  const SPLAT_TEX_HEIGHT_BITS = 11;
  const SPLAT_TEX_WIDTH = 1 << SPLAT_TEX_WIDTH_BITS;
  const SPLAT_TEX_HEIGHT = 1 << SPLAT_TEX_HEIGHT_BITS;
  const SPLAT_TEX_MIN_HEIGHT = 1;
  var SplatFileType = /* @__PURE__ */ ((SplatFileType2) => {
    SplatFileType2["PLY"] = "ply";
    SplatFileType2["SPZ"] = "spz";
    SplatFileType2["SPLAT"] = "splat";
    SplatFileType2["KSPLAT"] = "ksplat";
    SplatFileType2["PCSOGS"] = "pcsogs";
    SplatFileType2["PCSOGSZIP"] = "pcsogszip";
    SplatFileType2["RAD"] = "rad";
    return SplatFileType2;
  })(SplatFileType || {});
  function unindentLines(s) {
    let seenNonEmpty = false;
    const lines = s.split("\\n").map((line) => {
      const trimmedLine = line.trimEnd();
      if (seenNonEmpty) {
        return trimmedLine;
      }
      if (trimmedLine.length > 0) {
        seenNonEmpty = true;
        return trimmedLine;
      }
      return null;
    }).filter((line) => line != null);
    while (lines.length > 0 && lines[lines.length - 1].length === 0) {
      lines.pop();
    }
    if (lines.length === 0) {
      return [];
    }
    const indent = lines[0].match(/^\\s*/)?.[0];
    if (!indent) {
      return lines;
    }
    const regex = new RegExp(\`^\${indent}\`);
    return lines.map((line) => line.replace(regex, ""));
  }
  function unindent(s) {
    return unindentLines(s).join("\\n");
  }
  const f32buffer = new Float32Array(1);
  const u32buffer = new Uint32Array(f32buffer.buffer);
  const supportsFloat16Array = "Float16Array" in globalThis;
  const f16buffer = supportsFloat16Array ? new globalThis["Float16Array"](1) : null;
  const u16buffer = new Uint16Array(f16buffer?.buffer);
  function normalize(vec) {
    const norm = Math.sqrt(vec.reduce((acc, v) => acc + v * v, 0));
    return vec.map((v) => v / norm);
  }
  const toHalf = supportsFloat16Array ? toHalfNative : toHalfJS;
  const fromHalf = supportsFloat16Array ? fromHalfNative : fromHalfJS;
  function toHalfNative(f) {
    f16buffer[0] = f;
    return u16buffer[0];
  }
  function toHalfJS(f) {
    f32buffer[0] = f;
    const bits2 = u32buffer[0];
    const sign = bits2 >> 31 & 1;
    const exp = bits2 >> 23 & 255;
    const frac = bits2 & 8388607;
    const halfSign = sign << 15;
    if (exp === 255) {
      if (frac !== 0) {
        return halfSign | 32767;
      }
      return halfSign | 31744;
    }
    const newExp = exp - 127 + 15;
    if (newExp >= 31) {
      return halfSign | 31744;
    }
    if (newExp <= 0) {
      if (newExp < -10) {
        return halfSign;
      }
      const subFrac = (frac | 8388608) >> 1 - newExp + 13;
      return halfSign | subFrac;
    }
    const halfFrac = frac >> 13;
    return halfSign | newExp << 10 | halfFrac;
  }
  function fromHalfNative(u) {
    u16buffer[0] = u;
    return f16buffer[0];
  }
  function fromHalfJS(h) {
    const sign = h >> 15 & 1;
    const exp = h >> 10 & 31;
    const frac = h & 1023;
    let f32bits;
    if (exp === 0) {
      if (frac === 0) {
        f32bits = sign << 31;
      } else {
        let mant = frac;
        let e = -14;
        while ((mant & 1024) === 0) {
          mant <<= 1;
          e--;
        }
        mant &= 1023;
        const newExp = e + 127;
        const newFrac = mant << 13;
        f32bits = sign << 31 | newExp << 23 | newFrac;
      }
    } else if (exp === 31) {
      if (frac === 0) {
        f32bits = sign << 31 | 2139095040;
      } else {
        f32bits = sign << 31 | 2143289344;
      }
    } else {
      const newExp = exp - 15 + 127;
      const newFrac = frac << 13;
      f32bits = sign << 31 | newExp << 23 | newFrac;
    }
    u32buffer[0] = f32bits;
    return f32buffer[0];
  }
  function floatToUint8(v) {
    return Math.max(0, Math.min(255, Math.round(v * 255)));
  }
  function getTransferable(ctx) {
    const buffers = [];
    const seen = /* @__PURE__ */ new Set();
    function traverse(obj) {
      if (obj && typeof obj === "object" && !seen.has(obj)) {
        seen.add(obj);
        if (obj instanceof ArrayBuffer) {
          buffers.push(obj);
        } else if (obj instanceof ReadableStream || obj instanceof WritableStream) {
          buffers.push(obj);
        } else if (ArrayBuffer.isView(obj)) {
          buffers.push(obj.buffer);
        } else if (Array.isArray(obj)) {
          obj.forEach(traverse);
        } else {
          Object.values(obj).forEach(traverse);
        }
      }
    }
    traverse(ctx);
    return buffers;
  }
  function setPackedSplat(packedSplats, index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b, encoding) {
    const rgbMin = encoding?.rgbMin ?? 0;
    const rgbMax = encoding?.rgbMax ?? 1;
    const rgbRange = rgbMax - rgbMin;
    const uR = floatToUint8((r - rgbMin) / rgbRange);
    const uG = floatToUint8((g - rgbMin) / rgbRange);
    const uB = floatToUint8((b - rgbMin) / rgbRange);
    const uA = floatToUint8(encoding?.lodOpacity ? 0.5 * opacity : opacity);
    const uQuat = encodeQuatOctXy88R8(
      tempQuaternion.set(quatX, quatY, quatZ, quatW)
    );
    const uQuatX = uQuat & 255;
    const uQuatY = uQuat >>> 8 & 255;
    const uQuatZ = uQuat >>> 16 & 255;
    const lnScaleMin = encoding?.lnScaleMin ?? LN_SCALE_MIN;
    const lnScaleMax = encoding?.lnScaleMax ?? LN_SCALE_MAX;
    const lnScaleScale = 254 / (lnScaleMax - lnScaleMin);
    const uScaleX = scaleX < SCALE_ZERO ? 0 : Math.min(
      255,
      Math.max(
        1,
        Math.round((Math.log(scaleX) - lnScaleMin) * lnScaleScale) + 1
      )
    );
    const uScaleY = scaleY < SCALE_ZERO ? 0 : Math.min(
      255,
      Math.max(
        1,
        Math.round((Math.log(scaleY) - lnScaleMin) * lnScaleScale) + 1
      )
    );
    const uScaleZ = scaleZ < SCALE_ZERO ? 0 : Math.min(
      255,
      Math.max(
        1,
        Math.round((Math.log(scaleZ) - lnScaleMin) * lnScaleScale) + 1
      )
    );
    const uCenterX = toHalf(x2);
    const uCenterY = toHalf(y);
    const uCenterZ = toHalf(z);
    const i4 = index * 4;
    packedSplats[i4] = uR | uG << 8 | uB << 16 | uA << 24;
    packedSplats[i4 + 1] = uCenterX | uCenterY << 16;
    packedSplats[i4 + 2] = uCenterZ | uQuatX << 16 | uQuatY << 24;
    packedSplats[i4 + 3] = uScaleX | uScaleY << 8 | uScaleZ << 16 | uQuatZ << 24;
  }
  function setPackedSplatCenter(packedSplats, index, x2, y, z) {
    const uCenterX = toHalf(x2);
    const uCenterY = toHalf(y);
    const uCenterZ = toHalf(z);
    const i4 = index * 4;
    packedSplats[i4 + 1] = uCenterX | uCenterY << 16;
    packedSplats[i4 + 2] = uCenterZ | packedSplats[i4 + 2] & 4294901760;
  }
  function setPackedSplatScales(packedSplats, index, scaleX, scaleY, scaleZ, encoding) {
    const lnScaleMin = encoding?.lnScaleMin ?? LN_SCALE_MIN;
    const lnScaleMax = encoding?.lnScaleMax ?? LN_SCALE_MAX;
    const lnScaleScale = 254 / (lnScaleMax - lnScaleMin);
    const uScaleX = scaleX < SCALE_ZERO ? 0 : Math.min(
      255,
      Math.max(
        1,
        Math.round((Math.log(scaleX) - lnScaleMin) * lnScaleScale) + 1
      )
    );
    const uScaleY = scaleY < SCALE_ZERO ? 0 : Math.min(
      255,
      Math.max(
        1,
        Math.round((Math.log(scaleY) - lnScaleMin) * lnScaleScale) + 1
      )
    );
    const uScaleZ = scaleZ < SCALE_ZERO ? 0 : Math.min(
      255,
      Math.max(
        1,
        Math.round((Math.log(scaleZ) - lnScaleMin) * lnScaleScale) + 1
      )
    );
    const i4 = index * 4;
    packedSplats[i4 + 3] = uScaleX | uScaleY << 8 | uScaleZ << 16 | packedSplats[i4 + 3] & 4278190080;
  }
  const tempQuaternion = new Quaternion();
  function setPackedSplatQuat(packedSplats, index, quatX, quatY, quatZ, quatW) {
    const uQuat = encodeQuatOctXy88R8(
      tempQuaternion.set(quatX, quatY, quatZ, quatW)
    );
    const uQuatX = uQuat & 255;
    const uQuatY = uQuat >>> 8 & 255;
    const uQuatZ = uQuat >>> 16 & 255;
    const i4 = index * 4;
    packedSplats[i4 + 2] = packedSplats[i4 + 2] & 65535 | uQuatX << 16 | uQuatY << 24;
    packedSplats[i4 + 3] = packedSplats[i4 + 3] & 16777215 | uQuatZ << 24;
  }
  function setPackedSplatRgba(packedSplats, index, r, g, b, a, encoding) {
    const rgbMin = encoding?.rgbMin ?? 0;
    const rgbMax = encoding?.rgbMax ?? 1;
    const rgbRange = rgbMax - rgbMin;
    const uR = floatToUint8((r - rgbMin) / rgbRange);
    const uG = floatToUint8((g - rgbMin) / rgbRange);
    const uB = floatToUint8((b - rgbMin) / rgbRange);
    const uA = floatToUint8(encoding?.lodOpacity ? 0.5 * a : a);
    const i4 = index * 4;
    packedSplats[i4] = uR | uG << 8 | uB << 16 | uA << 24;
  }
  function setPackedSplatRgb(packedSplats, index, r, g, b, encoding) {
    const rgbMin = encoding?.rgbMin ?? 0;
    const rgbMax = encoding?.rgbMax ?? 1;
    const rgbRange = rgbMax - rgbMin;
    const uR = floatToUint8((r - rgbMin) / rgbRange);
    const uG = floatToUint8((g - rgbMin) / rgbRange);
    const uB = floatToUint8((b - rgbMin) / rgbRange);
    const i4 = index * 4;
    packedSplats[i4] = uR | uG << 8 | uB << 16 | packedSplats[i4] & 4278190080;
  }
  function setPackedSplatOpacity(packedSplats, index, opacity) {
    const uA = floatToUint8(opacity);
    const i4 = index * 4;
    packedSplats[i4] = packedSplats[i4] & 16777215 | uA << 24;
  }
  new Vector3();
  new Vector3();
  new Color();
  function getTextureSize(numSplats) {
    const width = SPLAT_TEX_WIDTH;
    const height = Math.max(
      SPLAT_TEX_MIN_HEIGHT,
      Math.min(SPLAT_TEX_HEIGHT, Math.ceil(numSplats / width))
    );
    const depth = Math.ceil(numSplats / (width * height));
    const maxSplats = width * height * depth;
    return { width, height, depth, maxSplats };
  }
  function computeMaxSplats(numSplats) {
    const width = SPLAT_TEX_WIDTH;
    const height = Math.max(
      SPLAT_TEX_MIN_HEIGHT,
      Math.min(SPLAT_TEX_HEIGHT, Math.ceil(numSplats / width))
    );
    const depth = Math.ceil(numSplats / (width * height));
    return width * height * depth;
  }
  unindent(\`
  precision highp float;

  in vec3 position;

  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
\`);
  const tempNormalizedQuaternion = new Quaternion();
  const tempAxis = new Vector3();
  function encodeQuatOctXy88R8(q) {
    const qnorm = tempNormalizedQuaternion.copy(q).normalize();
    if (qnorm.w < 0) {
      qnorm.set(-qnorm.x, -qnorm.y, -qnorm.z, -qnorm.w);
    }
    const theta = 2 * Math.acos(qnorm.w);
    const xyz_norm = Math.sqrt(
      qnorm.x * qnorm.x + qnorm.y * qnorm.y + qnorm.z * qnorm.z
    );
    const axis = xyz_norm < 1e-6 ? tempAxis.set(1, 0, 0) : tempAxis.set(qnorm.x, qnorm.y, qnorm.z).divideScalar(xyz_norm);
    const sum = Math.abs(axis.x) + Math.abs(axis.y) + Math.abs(axis.z);
    let p_x = axis.x / sum;
    let p_y = axis.y / sum;
    if (axis.z < 0) {
      const tmp = p_x;
      p_x = (1 - Math.abs(p_y)) * (p_x >= 0 ? 1 : -1);
      p_y = (1 - Math.abs(tmp)) * (p_y >= 0 ? 1 : -1);
    }
    const u_f = p_x * 0.5 + 0.5;
    const v_f = p_y * 0.5 + 0.5;
    const quantU = Math.round(u_f * 255);
    const quantV = Math.round(v_f * 255);
    const angleInt = Math.round(theta * (255 / Math.PI));
    return angleInt << 16 | quantV << 8 | quantU;
  }
  function packSint8Bytes(b0, b1, b22, b3) {
    const clampedB0 = Math.round(Math.max(-127, Math.min(127, b0 * 127)));
    const clampedB1 = Math.round(Math.max(-127, Math.min(127, b1 * 127)));
    const clampedB2 = Math.round(Math.max(-127, Math.min(127, b22 * 127)));
    const clampedB3 = Math.round(Math.max(-127, Math.min(127, b3 * 127)));
    return clampedB0 & 255 | (clampedB1 & 255) << 8 | (clampedB2 & 255) << 16 | (clampedB3 & 255) << 24;
  }
  function encodeSh1Rgb(sh1Array, index, sh1Rgb, encoding) {
    const sh1Max = encoding?.sh1Max ?? 1;
    const sh1Scale = 63 / sh1Max;
    const base = index * 2;
    for (let i2 = 0; i2 < 9; ++i2) {
      const s = sh1Rgb[i2] * sh1Scale;
      const value = Math.round(Math.max(-63, Math.min(63, s))) & 127;
      const bitStart = i2 * 7;
      const bitEnd = bitStart + 7;
      const wordStart = Math.floor(bitStart / 32);
      const bitOffset = bitStart - wordStart * 32;
      const firstWord = value << bitOffset & 4294967295;
      sh1Array[base + wordStart] |= firstWord;
      if (bitEnd > wordStart * 32 + 32) {
        const secondWord = value >>> 32 - bitOffset & 4294967295;
        sh1Array[base + wordStart + 1] |= secondWord;
      }
    }
  }
  function encodeSh2Rgb(sh2Array, index, sh2Rgb, encoding) {
    const sh2Max = encoding?.sh2Max ?? 1;
    const sh2Scale = 1 / sh2Max;
    sh2Array[index * 4 + 0] = packSint8Bytes(
      sh2Rgb[0] * sh2Scale,
      sh2Rgb[1] * sh2Scale,
      sh2Rgb[2] * sh2Scale,
      sh2Rgb[3] * sh2Scale
    );
    sh2Array[index * 4 + 1] = packSint8Bytes(
      sh2Rgb[4] * sh2Scale,
      sh2Rgb[5] * sh2Scale,
      sh2Rgb[6] * sh2Scale,
      sh2Rgb[7] * sh2Scale
    );
    sh2Array[index * 4 + 2] = packSint8Bytes(
      sh2Rgb[8] * sh2Scale,
      sh2Rgb[9] * sh2Scale,
      sh2Rgb[10] * sh2Scale,
      sh2Rgb[11] * sh2Scale
    );
    sh2Array[index * 4 + 3] = packSint8Bytes(
      sh2Rgb[12] * sh2Scale,
      sh2Rgb[13] * sh2Scale,
      sh2Rgb[14] * sh2Scale,
      0
    );
  }
  function encodeSh3Rgb(sh3Array, index, sh3Rgb, encoding) {
    const sh3Max = encoding?.sh3Max ?? 1;
    const sh3Scale = 31 / sh3Max;
    const base = index * 4;
    for (let i2 = 0; i2 < 21; ++i2) {
      const s = sh3Rgb[i2] * sh3Scale;
      const value = Math.round(Math.max(-31, Math.min(31, s))) & 63;
      const bitStart = i2 * 6;
      const bitEnd = bitStart + 6;
      const wordStart = Math.floor(bitStart / 32);
      const bitOffset = bitStart - wordStart * 32;
      const firstWord = value << bitOffset & 4294967295;
      sh3Array[base + wordStart] |= firstWord;
      if (bitEnd > wordStart * 32 + 32) {
        const secondWord = value >>> 32 - bitOffset & 4294967295;
        sh3Array[base + wordStart + 1] |= secondWord;
      }
    }
  }
  function decompressPartialGzip(fileBytes, numBytes) {
    const chunks = [];
    let totalBytes = 0;
    let result = null;
    const gunzip = new Gunzip((data, final) => {
      chunks.push(data);
      totalBytes += data.length;
      if (final || totalBytes >= numBytes) {
        const allBytes = new Uint8Array(totalBytes);
        let offset2 = 0;
        for (const chunk of chunks) {
          allBytes.set(chunk, offset2);
          offset2 += chunk.length;
        }
        result = allBytes.slice(0, numBytes);
      }
    });
    const CHUNK_SIZE = 1024;
    let offset = 0;
    while (result == null && offset < fileBytes.length) {
      const chunk = fileBytes.slice(offset, offset + CHUNK_SIZE);
      gunzip.push(chunk, false);
      offset += CHUNK_SIZE;
    }
    if (result == null) {
      gunzip.push(new Uint8Array(), true);
      if (result == null) {
        throw new Error("Failed to decompress partial gzip");
      }
    }
    return result;
  }
  class GunzipReader {
    constructor({
      fileBytes,
      chunkBytes = 64 * 1024
    }) {
      this.fileBytes = fileBytes;
      this.chunkBytes = chunkBytes;
      this.chunks = [];
      this.totalBytes = 0;
      const ds = new DecompressionStream("gzip");
      const decompressionStream = new Blob([fileBytes]).stream().pipeThrough(ds);
      this.reader = decompressionStream.getReader();
    }
    async read(numBytes) {
      while (this.totalBytes < numBytes) {
        const { value: chunk, done: readerDone } = await this.reader.read();
        if (readerDone) {
          break;
        }
        this.chunks.push(chunk);
        this.totalBytes += chunk.length;
      }
      if (this.totalBytes < numBytes) {
        throw new Error(
          \`Unexpected EOF: needed \${numBytes}, got \${this.totalBytes}\`
        );
      }
      const allBytes = new Uint8Array(this.totalBytes);
      let outOffset = 0;
      for (const chunk of this.chunks) {
        allBytes.set(chunk, outOffset);
        outOffset += chunk.length;
      }
      const result = allBytes.subarray(0, numBytes);
      this.chunks = [allBytes.subarray(numBytes)];
      this.totalBytes -= numBytes;
      return result;
    }
  }
  function decodeAntiSplat(fileBytes, initNumSplats, splatCallback) {
    const numSplats = Math.floor(fileBytes.length / 32);
    if (numSplats * 32 !== fileBytes.length) {
      throw new Error("Invalid .splat file size");
    }
    initNumSplats(numSplats);
    const f32 = new Float32Array(fileBytes.buffer);
    for (let i2 = 0; i2 < numSplats; ++i2) {
      const i322 = i2 * 32;
      const i8 = i2 * 8;
      const x2 = f32[i8 + 0];
      const y = f32[i8 + 1];
      const z = f32[i8 + 2];
      const scaleX = f32[i8 + 3];
      const scaleY = f32[i8 + 4];
      const scaleZ = f32[i8 + 5];
      const r = fileBytes[i322 + 24] / 255;
      const g = fileBytes[i322 + 25] / 255;
      const b = fileBytes[i322 + 26] / 255;
      const opacity = fileBytes[i322 + 27] / 255;
      const quatW = (fileBytes[i322 + 28] - 128) / 128;
      const quatX = (fileBytes[i322 + 29] - 128) / 128;
      const quatY = (fileBytes[i322 + 30] - 128) / 128;
      const quatZ = (fileBytes[i322 + 31] - 128) / 128;
      splatCallback(
        i2,
        x2,
        y,
        z,
        scaleX,
        scaleY,
        scaleZ,
        quatX,
        quatY,
        quatZ,
        quatW,
        opacity,
        r,
        g,
        b
      );
    }
  }
  function unpackAntiSplat(fileBytes, splatEncoding) {
    let numSplats = 0;
    let maxSplats = 0;
    let packedArray = new Uint32Array(0);
    decodeAntiSplat(
      fileBytes,
      (cbNumSplats) => {
        numSplats = cbNumSplats;
        maxSplats = computeMaxSplats(numSplats);
        packedArray = new Uint32Array(maxSplats * 4);
      },
      (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {
        setPackedSplat(
          packedArray,
          index,
          x2,
          y,
          z,
          scaleX,
          scaleY,
          scaleZ,
          quatX,
          quatY,
          quatZ,
          quatW,
          opacity,
          r,
          g,
          b,
          splatEncoding
        );
      }
    );
    return { packedArray, numSplats };
  }
  const KSPLAT_COMPRESSION = {
    0: {
      bytesPerCenter: 12,
      bytesPerScale: 12,
      bytesPerRotation: 16,
      bytesPerColor: 4,
      bytesPerSphericalHarmonicsComponent: 4,
      scaleOffsetBytes: 12,
      rotationOffsetBytes: 24,
      colorOffsetBytes: 40,
      sphericalHarmonicsOffsetBytes: 44,
      scaleRange: 1
    },
    1: {
      bytesPerCenter: 6,
      bytesPerScale: 6,
      bytesPerRotation: 8,
      bytesPerColor: 4,
      bytesPerSphericalHarmonicsComponent: 2,
      scaleOffsetBytes: 6,
      rotationOffsetBytes: 12,
      colorOffsetBytes: 20,
      sphericalHarmonicsOffsetBytes: 24,
      scaleRange: 32767
    },
    2: {
      bytesPerCenter: 6,
      bytesPerScale: 6,
      bytesPerRotation: 8,
      bytesPerColor: 4,
      bytesPerSphericalHarmonicsComponent: 1,
      scaleOffsetBytes: 6,
      rotationOffsetBytes: 12,
      colorOffsetBytes: 20,
      sphericalHarmonicsOffsetBytes: 24,
      scaleRange: 32767
    }
  };
  const KSPLAT_SH_DEGREE_TO_COMPONENTS = {
    0: 0,
    1: 9,
    2: 24,
    3: 45
  };
  function decodeKsplat(fileBytes, initNumSplats, splatCallback, shCallback) {
    const HEADER_BYTES = 4096;
    const SECTION_BYTES = 1024;
    let headerOffset = 0;
    const header = new DataView(fileBytes.buffer, headerOffset, HEADER_BYTES);
    headerOffset += HEADER_BYTES;
    const versionMajor = header.getUint8(0);
    const versionMinor = header.getUint8(1);
    if (versionMajor !== 0 || versionMinor < 1) {
      throw new Error(
        \`Unsupported .ksplat version: \${versionMajor}.\${versionMinor}\`
      );
    }
    const maxSectionCount = header.getUint32(4, true);
    header.getUint32(16, true);
    const compressionLevel = header.getUint16(20, true);
    if (compressionLevel < 0 || compressionLevel > 2) {
      throw new Error(\`Invalid .ksplat compression level: \${compressionLevel}\`);
    }
    const minSphericalHarmonicsCoeff = header.getFloat32(36, true) || -1.5;
    const maxSphericalHarmonicsCoeff = header.getFloat32(40, true) || 1.5;
    let sectionBase = HEADER_BYTES + maxSectionCount * SECTION_BYTES;
    for (let section = 0; section < maxSectionCount; ++section) {
      let getSh = function(splatOffset, component) {
        if (compressionLevel === 0) {
          return data.getFloat32(
            splatOffset + sphericalHarmonicsOffsetBytes + component * 4,
            true
          );
        }
        if (compressionLevel === 1) {
          return fromHalf(
            data.getUint16(
              splatOffset + sphericalHarmonicsOffsetBytes + component * 2,
              true
            )
          );
        }
        const t = data.getUint8(splatOffset + sphericalHarmonicsOffsetBytes + component) / 255;
        return minSphericalHarmonicsCoeff + t * (maxSphericalHarmonicsCoeff - minSphericalHarmonicsCoeff);
      };
      const section2 = new DataView(fileBytes.buffer, headerOffset, SECTION_BYTES);
      headerOffset += SECTION_BYTES;
      const sectionSplatCount = section2.getUint32(0, true);
      const sectionMaxSplatCount = section2.getUint32(4, true);
      const bucketSize = section2.getUint32(8, true);
      const bucketCount = section2.getUint32(12, true);
      const bucketBlockSize = section2.getFloat32(16, true);
      const bucketStorageSizeBytes = section2.getUint16(20, true);
      const compressionScaleRange = (section2.getUint32(24, true) || KSPLAT_COMPRESSION[compressionLevel]?.scaleRange) ?? 1;
      const fullBucketCount = section2.getUint32(32, true);
      const fullBucketSplats = fullBucketCount * bucketSize;
      const partiallyFilledBucketCount = section2.getUint32(36, true);
      const bucketsMetaDataSizeBytes = partiallyFilledBucketCount * 4;
      const bucketsStorageSizeBytes = bucketStorageSizeBytes * bucketCount + bucketsMetaDataSizeBytes;
      const sphericalHarmonicsDegree = section2.getUint16(40, true);
      const shComponents = KSPLAT_SH_DEGREE_TO_COMPONENTS[sphericalHarmonicsDegree];
      const {
        bytesPerCenter,
        bytesPerScale,
        bytesPerRotation,
        bytesPerColor,
        bytesPerSphericalHarmonicsComponent,
        scaleOffsetBytes,
        rotationOffsetBytes,
        colorOffsetBytes,
        sphericalHarmonicsOffsetBytes
      } = KSPLAT_COMPRESSION[compressionLevel];
      const bytesPerSplat = bytesPerCenter + bytesPerScale + bytesPerRotation + bytesPerColor + shComponents * bytesPerSphericalHarmonicsComponent;
      const splatDataStorageSizeBytes = bytesPerSplat * sectionMaxSplatCount;
      const storageSizeBytes = splatDataStorageSizeBytes + bucketsStorageSizeBytes;
      const sh1Index = [0, 3, 6, 1, 4, 7, 2, 5, 8];
      const sh2Index = [
        9,
        14,
        19,
        10,
        15,
        20,
        11,
        16,
        21,
        12,
        17,
        22,
        13,
        18,
        23
      ];
      const sh3Index = [
        24,
        31,
        38,
        25,
        32,
        39,
        26,
        33,
        40,
        27,
        34,
        41,
        28,
        35,
        42,
        29,
        36,
        43,
        30,
        37,
        44
      ];
      const sh1 = sphericalHarmonicsDegree >= 1 ? new Float32Array(3 * 3) : void 0;
      const sh2 = sphericalHarmonicsDegree >= 2 ? new Float32Array(5 * 3) : void 0;
      const sh3 = sphericalHarmonicsDegree >= 3 ? new Float32Array(7 * 3) : void 0;
      const compressionScaleFactor = bucketBlockSize / 2 / compressionScaleRange;
      const bucketsBase = sectionBase + bucketsMetaDataSizeBytes;
      const dataBase = sectionBase + bucketsStorageSizeBytes;
      const data = new DataView(
        fileBytes.buffer,
        dataBase,
        splatDataStorageSizeBytes
      );
      const bucketArray = new Float32Array(
        fileBytes.buffer,
        bucketsBase,
        bucketCount * 3
      );
      const partiallyFilledBucketLengths = new Uint32Array(
        fileBytes.buffer,
        sectionBase,
        partiallyFilledBucketCount
      );
      let partialBucketIndex = fullBucketCount;
      let partialBucketBase = fullBucketSplats;
      for (let i2 = 0; i2 < sectionSplatCount; ++i2) {
        const splatOffset = i2 * bytesPerSplat;
        let bucketIndex;
        if (i2 < fullBucketSplats) {
          bucketIndex = Math.floor(i2 / bucketSize);
        } else {
          const bucketLength = partiallyFilledBucketLengths[partialBucketIndex - fullBucketCount];
          if (i2 >= partialBucketBase + bucketLength) {
            partialBucketIndex += 1;
            partialBucketBase += bucketLength;
          }
          bucketIndex = partialBucketIndex;
        }
        const x2 = compressionLevel === 0 ? data.getFloat32(splatOffset + 0, true) : (data.getUint16(splatOffset + 0, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 0];
        const y = compressionLevel === 0 ? data.getFloat32(splatOffset + 4, true) : (data.getUint16(splatOffset + 2, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 1];
        const z = compressionLevel === 0 ? data.getFloat32(splatOffset + 8, true) : (data.getUint16(splatOffset + 4, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 2];
        const scaleX = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 0, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 0, true));
        const scaleY = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 4, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 2, true));
        const scaleZ = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 8, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 4, true));
        const quatW = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 0, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 0, true)
        );
        const quatX = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 4, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 2, true)
        );
        const quatY = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 8, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 4, true)
        );
        const quatZ = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 12, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 6, true)
        );
        const r = data.getUint8(splatOffset + colorOffsetBytes + 0) / 255;
        const g = data.getUint8(splatOffset + colorOffsetBytes + 1) / 255;
        const b = data.getUint8(splatOffset + colorOffsetBytes + 2) / 255;
        const opacity = data.getUint8(splatOffset + colorOffsetBytes + 3) / 255;
        splatCallback(
          i2,
          x2,
          y,
          z,
          scaleX,
          scaleY,
          scaleZ,
          quatX,
          quatY,
          quatZ,
          quatW,
          opacity,
          r,
          g,
          b
        );
        if (sphericalHarmonicsDegree >= 1 && sh1) {
          for (const [i22, key] of sh1Index.entries()) {
            sh1[i22] = getSh(splatOffset, key);
          }
          if (sh2) {
            for (const [i22, key] of sh2Index.entries()) {
              sh2[i22] = getSh(splatOffset, key);
            }
          }
          if (sh3) {
            for (const [i22, key] of sh3Index.entries()) {
              sh3[i22] = getSh(splatOffset, key);
            }
          }
          shCallback?.(i2, sh1, sh2, sh3);
        }
      }
      sectionBase += storageSizeBytes;
    }
  }
  function unpackKsplat(fileBytes, splatEncoding) {
    const HEADER_BYTES = 4096;
    const SECTION_BYTES = 1024;
    let headerOffset = 0;
    const header = new DataView(fileBytes.buffer, headerOffset, HEADER_BYTES);
    headerOffset += HEADER_BYTES;
    const versionMajor = header.getUint8(0);
    const versionMinor = header.getUint8(1);
    if (versionMajor !== 0 || versionMinor < 1) {
      throw new Error(
        \`Unsupported .ksplat version: \${versionMajor}.\${versionMinor}\`
      );
    }
    const maxSectionCount = header.getUint32(4, true);
    const splatCount = header.getUint32(16, true);
    const compressionLevel = header.getUint16(20, true);
    if (compressionLevel < 0 || compressionLevel > 2) {
      throw new Error(\`Invalid .ksplat compression level: \${compressionLevel}\`);
    }
    const minSphericalHarmonicsCoeff = header.getFloat32(36, true) || -1.5;
    const maxSphericalHarmonicsCoeff = header.getFloat32(40, true) || 1.5;
    const numSplats = splatCount;
    const maxSplats = computeMaxSplats(numSplats);
    const packedArray = new Uint32Array(maxSplats * 4);
    const extra = {};
    let sectionBase = HEADER_BYTES + maxSectionCount * SECTION_BYTES;
    for (let section = 0; section < maxSectionCount; ++section) {
      let getSh = function(splatOffset, component) {
        if (compressionLevel === 0) {
          return data.getFloat32(
            splatOffset + sphericalHarmonicsOffsetBytes + component * 4,
            true
          );
        }
        if (compressionLevel === 1) {
          return fromHalf(
            data.getUint16(
              splatOffset + sphericalHarmonicsOffsetBytes + component * 2,
              true
            )
          );
        }
        const t = data.getUint8(splatOffset + sphericalHarmonicsOffsetBytes + component) / 255;
        return minSphericalHarmonicsCoeff + t * (maxSphericalHarmonicsCoeff - minSphericalHarmonicsCoeff);
      };
      const section2 = new DataView(fileBytes.buffer, headerOffset, SECTION_BYTES);
      headerOffset += SECTION_BYTES;
      const sectionSplatCount = section2.getUint32(0, true);
      const sectionMaxSplatCount = section2.getUint32(4, true);
      const bucketSize = section2.getUint32(8, true);
      const bucketCount = section2.getUint32(12, true);
      const bucketBlockSize = section2.getFloat32(16, true);
      const bucketStorageSizeBytes = section2.getUint16(20, true);
      const compressionScaleRange = (section2.getUint32(24, true) || KSPLAT_COMPRESSION[compressionLevel]?.scaleRange) ?? 1;
      const fullBucketCount = section2.getUint32(32, true);
      const fullBucketSplats = fullBucketCount * bucketSize;
      const partiallyFilledBucketCount = section2.getUint32(36, true);
      const bucketsMetaDataSizeBytes = partiallyFilledBucketCount * 4;
      const bucketsStorageSizeBytes = bucketStorageSizeBytes * bucketCount + bucketsMetaDataSizeBytes;
      const sphericalHarmonicsDegree = section2.getUint16(40, true);
      const shComponents = KSPLAT_SH_DEGREE_TO_COMPONENTS[sphericalHarmonicsDegree];
      const {
        bytesPerCenter,
        bytesPerScale,
        bytesPerRotation,
        bytesPerColor,
        bytesPerSphericalHarmonicsComponent,
        scaleOffsetBytes,
        rotationOffsetBytes,
        colorOffsetBytes,
        sphericalHarmonicsOffsetBytes
      } = KSPLAT_COMPRESSION[compressionLevel];
      const bytesPerSplat = bytesPerCenter + bytesPerScale + bytesPerRotation + bytesPerColor + shComponents * bytesPerSphericalHarmonicsComponent;
      const splatDataStorageSizeBytes = bytesPerSplat * sectionMaxSplatCount;
      const storageSizeBytes = splatDataStorageSizeBytes + bucketsStorageSizeBytes;
      const sh1Index = [0, 3, 6, 1, 4, 7, 2, 5, 8];
      const sh2Index = [
        9,
        14,
        19,
        10,
        15,
        20,
        11,
        16,
        21,
        12,
        17,
        22,
        13,
        18,
        23
      ];
      const sh3Index = [
        24,
        31,
        38,
        25,
        32,
        39,
        26,
        33,
        40,
        27,
        34,
        41,
        28,
        35,
        42,
        29,
        36,
        43,
        30,
        37,
        44
      ];
      const sh1 = sphericalHarmonicsDegree >= 1 ? new Float32Array(3 * 3) : void 0;
      const sh2 = sphericalHarmonicsDegree >= 2 ? new Float32Array(5 * 3) : void 0;
      const sh3 = sphericalHarmonicsDegree >= 3 ? new Float32Array(7 * 3) : void 0;
      const compressionScaleFactor = bucketBlockSize / 2 / compressionScaleRange;
      const bucketsBase = sectionBase + bucketsMetaDataSizeBytes;
      const dataBase = sectionBase + bucketsStorageSizeBytes;
      const data = new DataView(
        fileBytes.buffer,
        dataBase,
        splatDataStorageSizeBytes
      );
      const bucketArray = new Float32Array(
        fileBytes.buffer,
        bucketsBase,
        bucketCount * 3
      );
      const partiallyFilledBucketLengths = new Uint32Array(
        fileBytes.buffer,
        sectionBase,
        partiallyFilledBucketCount
      );
      let partialBucketIndex = fullBucketCount;
      let partialBucketBase = fullBucketSplats;
      for (let i2 = 0; i2 < sectionSplatCount; ++i2) {
        const splatOffset = i2 * bytesPerSplat;
        let bucketIndex;
        if (i2 < fullBucketSplats) {
          bucketIndex = Math.floor(i2 / bucketSize);
        } else {
          const bucketLength = partiallyFilledBucketLengths[partialBucketIndex - fullBucketCount];
          if (i2 >= partialBucketBase + bucketLength) {
            partialBucketIndex += 1;
            partialBucketBase += bucketLength;
          }
          bucketIndex = partialBucketIndex;
        }
        const x2 = compressionLevel === 0 ? data.getFloat32(splatOffset + 0, true) : (data.getUint16(splatOffset + 0, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 0];
        const y = compressionLevel === 0 ? data.getFloat32(splatOffset + 4, true) : (data.getUint16(splatOffset + 2, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 1];
        const z = compressionLevel === 0 ? data.getFloat32(splatOffset + 8, true) : (data.getUint16(splatOffset + 4, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 2];
        const scaleX = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 0, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 0, true));
        const scaleY = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 4, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 2, true));
        const scaleZ = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 8, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 4, true));
        const quatW = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 0, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 0, true)
        );
        const quatX = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 4, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 2, true)
        );
        const quatY = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 8, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 4, true)
        );
        const quatZ = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 12, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 6, true)
        );
        const r = data.getUint8(splatOffset + colorOffsetBytes + 0) / 255;
        const g = data.getUint8(splatOffset + colorOffsetBytes + 1) / 255;
        const b = data.getUint8(splatOffset + colorOffsetBytes + 2) / 255;
        const opacity = data.getUint8(splatOffset + colorOffsetBytes + 3) / 255;
        setPackedSplat(
          packedArray,
          i2,
          x2,
          y,
          z,
          scaleX,
          scaleY,
          scaleZ,
          quatX,
          quatY,
          quatZ,
          quatW,
          opacity,
          r,
          g,
          b,
          splatEncoding
        );
        if (sphericalHarmonicsDegree >= 1) {
          if (sh1) {
            if (!extra.sh1) {
              extra.sh1 = new Uint32Array(numSplats * 2);
            }
            for (const [i22, key] of sh1Index.entries()) {
              sh1[i22] = getSh(splatOffset, key);
            }
            encodeSh1Rgb(extra.sh1, i2, sh1, splatEncoding);
          }
          if (sh2) {
            if (!extra.sh2) {
              extra.sh2 = new Uint32Array(numSplats * 4);
            }
            for (const [i22, key] of sh2Index.entries()) {
              sh2[i22] = getSh(splatOffset, key);
            }
            encodeSh2Rgb(extra.sh2, i2, sh2, splatEncoding);
          }
          if (sh3) {
            if (!extra.sh3) {
              extra.sh3 = new Uint32Array(numSplats * 4);
            }
            for (const [i22, key] of sh3Index.entries()) {
              sh3[i22] = getSh(splatOffset, key);
            }
            encodeSh3Rgb(extra.sh3, i2, sh3, splatEncoding);
          }
        }
      }
      sectionBase += storageSizeBytes;
    }
    return { packedArray, numSplats, extra };
  }
  const PLY_PROPERTY_TYPES = [
    "char",
    "uchar",
    "short",
    "ushort",
    "int",
    "uint",
    "float",
    "double"
  ];
  const _PlyReader = class _PlyReader {
    // Create a PlyReader from a Uint8Array/ArrayBuffer, no parsing done yet
    constructor({ fileBytes }) {
      this.header = "";
      this.littleEndian = true;
      this.elements = {};
      this.comments = [];
      this.data = null;
      this.numSplats = 0;
      this.fileBytes = fileBytes instanceof ArrayBuffer ? new Uint8Array(fileBytes) : fileBytes;
    }
    // Identify and parse the PLY text header (assumed to be <64KB in size).
    // this.elements will contain all the elements in the file, typically
    // "vertex" contains the Gsplat data.
    async parseHeader() {
      const bufferStream = new ReadableStream({
        start: (controller) => {
          controller.enqueue(this.fileBytes.slice(0, 65536));
          controller.close();
        }
      });
      const decoder = bufferStream.pipeThrough(new TextDecoderStream()).getReader();
      this.header = "";
      const headerTerminator = "end_header\\n";
      while (true) {
        const { value, done } = await decoder.read();
        if (done) {
          throw new Error("Failed to read header");
        }
        this.header += value;
        const endHeader = this.header.indexOf(headerTerminator);
        if (endHeader >= 0) {
          this.header = this.header.slice(0, endHeader + headerTerminator.length);
          break;
        }
      }
      const headerLen = new TextEncoder().encode(this.header).length;
      this.data = new DataView(this.fileBytes.buffer, headerLen);
      this.elements = {};
      let curElement = null;
      this.comments = [];
      this.header.trim().split("\\n").forEach((line, lineIndex) => {
        const trimmedLine = line.trim();
        if (lineIndex === 0) {
          if (trimmedLine !== "ply") {
            throw new Error("Invalid PLY header");
          }
          return;
        }
        if (trimmedLine.length === 0) {
          return;
        }
        const fields = trimmedLine.split(" ");
        switch (fields[0]) {
          case "format":
            if (fields[1] === "binary_little_endian") {
              this.littleEndian = true;
            } else if (fields[1] === "binary_big_endian") {
              this.littleEndian = false;
            } else {
              throw new Error(\`Unsupported PLY format: \${fields[1]}\`);
            }
            if (fields[2] !== "1.0") {
              throw new Error(\`Unsupported PLY version: \${fields[2]}\`);
            }
            break;
          case "end_header":
            break;
          case "comment":
            this.comments.push(trimmedLine.slice("comment ".length));
            break;
          case "element": {
            const name = fields[1];
            curElement = {
              name,
              count: Number.parseInt(fields[2]),
              properties: {}
            };
            this.elements[name] = curElement;
            break;
          }
          case "property":
            if (curElement == null) {
              throw new Error("Property must be inside an element");
            }
            if (fields[1] === "list") {
              curElement.properties[fields[4]] = {
                isList: true,
                type: fields[3],
                countType: fields[2]
              };
            } else {
              curElement.properties[fields[2]] = {
                isList: false,
                type: fields[1]
              };
            }
            break;
        }
      });
      if (this.elements.vertex) {
        this.numSplats = this.elements.vertex.count;
      }
    }
    parseData(elementCallback) {
      let offset = 0;
      const data = this.data;
      if (data == null) {
        throw new Error("No data to parse");
      }
      for (const elementName in this.elements) {
        const element = this.elements[elementName];
        const { count, properties } = element;
        const item = createEmptyItem(properties);
        const parseFn = createParseFn(properties, this.littleEndian);
        const callback = elementCallback(element) ?? (() => {
        });
        for (let index = 0; index < count; index++) {
          offset = parseFn(data, offset, item);
          callback(index, item);
        }
      }
    }
    // Parse all the Gsplat data in the PLY file in go, invoking the given
    // callbacks for each Gsplat.
    parseSplats(splatCallback, shCallback) {
      if (this.elements.vertex == null) {
        throw new Error("No vertex element found");
      }
      let isSuperSplat = false;
      const ssChunks = [];
      let numSh = 0;
      let sh1Props = [];
      let sh2Props = [];
      let sh3Props = [];
      let sh1 = void 0;
      let sh2 = void 0;
      let sh3 = void 0;
      function prepareSh() {
        const num_f_rest = NUM_SH_TO_NUM_F_REST[numSh];
        sh1Props = new Array(3).fill(null).flatMap((_, k) => [0, 1, 2].map((_2, d) => k + d * num_f_rest / 3));
        sh2Props = new Array(5).fill(null).flatMap(
          (_, k) => [0, 1, 2].map((_2, d) => 3 + k + d * num_f_rest / 3)
        );
        sh3Props = new Array(7).fill(null).flatMap(
          (_, k) => [0, 1, 2].map((_2, d) => 8 + k + d * num_f_rest / 3)
        );
        sh1 = numSh >= 1 ? new Float32Array(3 * 3) : void 0;
        sh2 = numSh >= 2 ? new Float32Array(5 * 3) : void 0;
        sh3 = numSh >= 3 ? new Float32Array(7 * 3) : void 0;
      }
      function ssShCallback(index, item) {
        if (!sh1) {
          throw new Error("Missing sh1");
        }
        const sh = item.f_rest;
        for (let i2 = 0; i2 < sh1Props.length; i2++) {
          sh1[i2] = sh[sh1Props[i2]] * 8 / 255 - 4;
        }
        if (sh2) {
          for (let i2 = 0; i2 < sh2Props.length; i2++) {
            sh2[i2] = sh[sh2Props[i2]] * 8 / 255 - 4;
          }
        }
        if (sh3) {
          for (let i2 = 0; i2 < sh3Props.length; i2++) {
            sh3[i2] = sh[sh3Props[i2]] * 8 / 255 - 4;
          }
        }
        shCallback?.(index, sh1, sh2, sh3);
      }
      function initSuperSplat(element) {
        const {
          min_x,
          min_y,
          min_z,
          max_x,
          max_y,
          max_z,
          min_scale_x,
          min_scale_y,
          min_scale_z,
          max_scale_x,
          max_scale_y,
          max_scale_z
        } = element.properties;
        if (!min_x || !min_y || !min_z || !max_x || !max_y || !max_z || !min_scale_x || !min_scale_y || !min_scale_z || !max_scale_x || !max_scale_y || !max_scale_z) {
          throw new Error("Missing PLY chunk properties");
        }
        isSuperSplat = true;
        return (index, item) => {
          const {
            min_x: min_x2,
            min_y: min_y2,
            min_z: min_z2,
            max_x: max_x2,
            max_y: max_y2,
            max_z: max_z2,
            min_scale_x: min_scale_x2,
            min_scale_y: min_scale_y2,
            min_scale_z: min_scale_z2,
            max_scale_x: max_scale_x2,
            max_scale_y: max_scale_y2,
            max_scale_z: max_scale_z2,
            min_r,
            min_g,
            min_b,
            max_r,
            max_g,
            max_b
          } = item;
          ssChunks.push({
            min_x: min_x2,
            min_y: min_y2,
            min_z: min_z2,
            max_x: max_x2,
            max_y: max_y2,
            max_z: max_z2,
            min_scale_x: min_scale_x2,
            min_scale_y: min_scale_y2,
            min_scale_z: min_scale_z2,
            max_scale_x: max_scale_x2,
            max_scale_y: max_scale_y2,
            max_scale_z: max_scale_z2,
            min_r,
            min_g,
            min_b,
            max_r,
            max_g,
            max_b
          });
        };
      }
      function decodeSuperSplat(element) {
        if (shCallback && element.name === "sh") {
          numSh = getNumSh(element.properties);
          prepareSh();
          return ssShCallback;
        }
        if (element.name !== "vertex") {
          return null;
        }
        const { packed_position, packed_rotation, packed_scale, packed_color } = element.properties;
        if (!packed_position || !packed_rotation || !packed_scale || !packed_color) {
          throw new Error(
            "Missing PLY properties: packed_position, packed_rotation, packed_scale, packed_color"
          );
        }
        const SQRT2 = Math.sqrt(2);
        return (index, item) => {
          const chunk = ssChunks[index >>> 8];
          if (chunk == null) {
            throw new Error("Missing PLY chunk");
          }
          const {
            min_x,
            min_y,
            min_z,
            max_x,
            max_y,
            max_z,
            min_scale_x,
            min_scale_y,
            min_scale_z,
            max_scale_x,
            max_scale_y,
            max_scale_z,
            min_r,
            min_g,
            min_b,
            max_r,
            max_g,
            max_b
          } = chunk;
          const { packed_position: packed_position2, packed_rotation: packed_rotation2, packed_scale: packed_scale2, packed_color: packed_color2 } = item;
          const x2 = (packed_position2 >>> 21 & 2047) / 2047 * (max_x - min_x) + min_x;
          const y = (packed_position2 >>> 11 & 1023) / 1023 * (max_y - min_y) + min_y;
          const z = (packed_position2 & 2047) / 2047 * (max_z - min_z) + min_z;
          const r0 = ((packed_rotation2 >>> 20 & 1023) / 1023 - 0.5) * SQRT2;
          const r1 = ((packed_rotation2 >>> 10 & 1023) / 1023 - 0.5) * SQRT2;
          const r2 = ((packed_rotation2 & 1023) / 1023 - 0.5) * SQRT2;
          const rr = Math.sqrt(Math.max(0, 1 - r0 * r0 - r1 * r1 - r2 * r2));
          const rOrder = packed_rotation2 >>> 30;
          const quatX = rOrder === 0 ? r0 : rOrder === 1 ? rr : r1;
          const quatY = rOrder <= 1 ? r1 : rOrder === 2 ? rr : r2;
          const quatZ = rOrder <= 2 ? r2 : rr;
          const quatW = rOrder === 0 ? rr : r0;
          const scaleX = Math.exp(
            (packed_scale2 >>> 21 & 2047) / 2047 * (max_scale_x - min_scale_x) + min_scale_x
          );
          const scaleY = Math.exp(
            (packed_scale2 >>> 11 & 1023) / 1023 * (max_scale_y - min_scale_y) + min_scale_y
          );
          const scaleZ = Math.exp(
            (packed_scale2 & 2047) / 2047 * (max_scale_z - min_scale_z) + min_scale_z
          );
          const r = (packed_color2 >>> 24 & 255) / 255 * ((max_r ?? 1) - (min_r ?? 0)) + (min_r ?? 0);
          const g = (packed_color2 >>> 16 & 255) / 255 * ((max_g ?? 1) - (min_g ?? 0)) + (min_g ?? 0);
          const b = (packed_color2 >>> 8 & 255) / 255 * ((max_b ?? 1) - (min_b ?? 0)) + (min_b ?? 0);
          const opacity = (packed_color2 & 255) / 255;
          splatCallback(
            index,
            x2,
            y,
            z,
            scaleX,
            scaleY,
            scaleZ,
            quatX,
            quatY,
            quatZ,
            quatW,
            opacity,
            r,
            g,
            b
          );
        };
      }
      const elementCallback = (element) => {
        if (element.name === "chunk") {
          return initSuperSplat(element);
        }
        if (isSuperSplat) {
          return decodeSuperSplat(element);
        }
        if (element.name !== "vertex") {
          return null;
        }
        const {
          x: x2,
          y,
          z,
          scale_0,
          scale_1,
          scale_2,
          rot_0,
          rot_1,
          rot_2,
          rot_3,
          opacity,
          f_dc_0,
          f_dc_1,
          f_dc_2,
          red,
          green,
          blue,
          alpha
        } = element.properties;
        if (!x2 || !y || !z) {
          throw new Error("Missing PLY properties: x, y, z");
        }
        const hasScales = scale_0 && scale_1 && scale_2;
        const hasRots = rot_0 && rot_1 && rot_2 && rot_3;
        const alphaDiv = alpha != null ? FIELD_SCALE[alpha.type] : 1;
        const redDiv = red != null ? FIELD_SCALE[red.type] : 1;
        const greenDiv = green != null ? FIELD_SCALE[green.type] : 1;
        const blueDiv = blue != null ? FIELD_SCALE[blue.type] : 1;
        numSh = getNumSh(element.properties);
        prepareSh();
        return (index, item) => {
          const scaleX = hasScales ? Math.exp(item.scale_0) : _PlyReader.defaultPointScale;
          const scaleY = hasScales ? Math.exp(item.scale_1) : _PlyReader.defaultPointScale;
          const scaleZ = hasScales ? Math.exp(item.scale_2) : _PlyReader.defaultPointScale;
          const quatX = hasRots ? item.rot_1 : 0;
          const quatY = hasRots ? item.rot_2 : 0;
          const quatZ = hasRots ? item.rot_3 : 0;
          const quatW = hasRots ? item.rot_0 : 1;
          const op = opacity != null ? 1 / (1 + Math.exp(-item.opacity)) : alpha != null ? item.alpha / alphaDiv : 1;
          const r = f_dc_0 != null ? item.f_dc_0 * SH_C0$1 + 0.5 : red != null ? item.red / redDiv : 1;
          const g = f_dc_1 != null ? item.f_dc_1 * SH_C0$1 + 0.5 : green != null ? item.green / greenDiv : 1;
          const b = f_dc_2 != null ? item.f_dc_2 * SH_C0$1 + 0.5 : blue != null ? item.blue / blueDiv : 1;
          splatCallback(
            index,
            item.x,
            item.y,
            item.z,
            scaleX,
            scaleY,
            scaleZ,
            quatX,
            quatY,
            quatZ,
            quatW,
            op,
            r,
            g,
            b
          );
          if (shCallback && sh1) {
            const sh = item.f_rest;
            if (sh1) {
              for (let i2 = 0; i2 < sh1Props.length; i2++) {
                sh1[i2] = sh[sh1Props[i2]];
              }
            }
            if (sh2) {
              for (let i2 = 0; i2 < sh2Props.length; i2++) {
                sh2[i2] = sh[sh2Props[i2]];
              }
            }
            if (sh3) {
              for (let i2 = 0; i2 < sh3Props.length; i2++) {
                sh3[i2] = sh[sh3Props[i2]];
              }
            }
            shCallback(index, sh1, sh2, sh3);
          }
        };
      };
      this.parseData(elementCallback);
    }
    // Inject RGBA values into original PLY file, which can be used to modify
    // the color/opacity of the Gsplats and write out the modified PLY file.
    injectRgba(rgba) {
      let offset = 0;
      const data = this.data;
      if (data == null) {
        throw new Error("No parsed data");
      }
      if (rgba.length !== this.numSplats * 4) {
        throw new Error("Invalid RGBA array length");
      }
      for (const elementName in this.elements) {
        const element = this.elements[elementName];
        const { count, properties } = element;
        const parsers = [];
        let rgbaOffset = 0;
        const isVertex = elementName === "vertex";
        if (isVertex) {
          for (const name of ["opacity", "f_dc_0", "f_dc_1", "f_dc_2"]) {
            if (!properties[name] || properties[name].type !== "float") {
              throw new Error(\`Can't injectRgba due to property: \${name}\`);
            }
          }
        }
        for (const [propertyName, property] of Object.entries(properties)) {
          if (!property.isList) {
            if (isVertex) {
              if (propertyName === "f_dc_0" || propertyName === "f_dc_1" || propertyName === "f_dc_2") {
                const component = Number.parseInt(
                  propertyName.slice("f_dc_".length)
                );
                parsers.push(() => {
                  const value = (rgba[rgbaOffset + component] / 255 - 0.5) / SH_C0$1;
                  SET_FIELD[property.type](
                    data,
                    offset,
                    this.littleEndian,
                    value
                  );
                });
              } else if (propertyName === "opacity") {
                parsers.push(() => {
                  const value = Math.max(
                    -100,
                    Math.min(
                      100,
                      -Math.log(1 / (rgba[rgbaOffset + 3] / 255) - 1)
                    )
                  );
                  SET_FIELD[property.type](
                    data,
                    offset,
                    this.littleEndian,
                    value
                  );
                });
              }
            }
            parsers.push(() => {
              offset += FIELD_BYTES[property.type];
            });
          } else {
            parsers.push(() => {
              const length = PARSE_FIELD[property.countType](
                data,
                offset,
                this.littleEndian
              );
              offset += FIELD_BYTES[property.countType];
              offset += length * FIELD_BYTES[property.type];
            });
          }
        }
        for (let index = 0; index < count; index++) {
          for (const parser of parsers) {
            parser();
          }
          if (isVertex) {
            rgbaOffset += 4;
          }
        }
      }
    }
  };
  _PlyReader.defaultPointScale = 1e-3;
  let PlyReader = _PlyReader;
  const SH_C0$1 = 0.28209479177387814;
  const PARSE_FIELD = {
    char: (data, offset, littleEndian) => {
      return data.getInt8(offset);
    },
    uchar: (data, offset, littleEndian) => {
      return data.getUint8(offset);
    },
    short: (data, offset, littleEndian) => {
      return data.getInt16(offset, littleEndian);
    },
    ushort: (data, offset, littleEndian) => {
      return data.getUint16(offset, littleEndian);
    },
    int: (data, offset, littleEndian) => {
      return data.getInt32(offset, littleEndian);
    },
    uint: (data, offset, littleEndian) => {
      return data.getUint32(offset, littleEndian);
    },
    float: (data, offset, littleEndian) => {
      return data.getFloat32(offset, littleEndian);
    },
    double: (data, offset, littleEndian) => {
      return data.getFloat64(offset, littleEndian);
    }
  };
  const SET_FIELD = {
    char: (data, offset, littleEndian, value) => {
      data.setInt8(offset, value);
    },
    uchar: (data, offset, littleEndian, value) => {
      data.setUint8(offset, value);
    },
    short: (data, offset, littleEndian, value) => {
      data.setInt16(offset, value, littleEndian);
    },
    ushort: (data, offset, littleEndian, value) => {
      data.setUint16(offset, value, littleEndian);
    },
    int: (data, offset, littleEndian, value) => {
      data.setInt32(offset, value, littleEndian);
    },
    uint: (data, offset, littleEndian, value) => {
      data.setUint32(offset, value, littleEndian);
    },
    float: (data, offset, littleEndian, value) => {
      data.setFloat32(offset, value, littleEndian);
    },
    double: (data, offset, littleEndian, value) => {
      data.setFloat64(offset, value, littleEndian);
    }
  };
  const FIELD_BYTES = {
    char: 1,
    uchar: 1,
    short: 2,
    ushort: 2,
    int: 4,
    uint: 4,
    float: 4,
    double: 8
  };
  const FIELD_SCALE = {
    char: 127,
    uchar: 255,
    short: 32767,
    ushort: 65535,
    int: 2147483647,
    uint: 4294967295,
    float: 1,
    double: 1
  };
  const NUM_F_REST_TO_NUM_SH = {
    0: 0,
    9: 1,
    24: 2,
    45: 3
  };
  const NUM_SH_TO_NUM_F_REST = {
    0: 0,
    1: 9,
    2: 24,
    3: 45
  };
  const F_REST_REGEX = /^f_rest_([0-9]{1,2})$/;
  function createEmptyItem(properties) {
    const item = {};
    for (const [propertyName, property] of Object.entries(properties)) {
      if (F_REST_REGEX.test(propertyName)) {
        item.f_rest = new Array(getNumSh(properties));
      } else {
        item[propertyName] = property.isList ? [] : 0;
      }
    }
    return item;
  }
  function createParseFn(properties, littleEndian) {
    if (safeToCompile(properties)) {
      return createCompiledParserFn(properties, littleEndian);
    }
    return createDynamicParserFn(properties, littleEndian);
  }
  const UNSAFE_EVAL_ALLOWED = (() => {
    try {
      new Function("return 42;");
    } catch (e) {
      return false;
    }
    return true;
  })();
  const PROPERTY_NAME_REGEX = /^[a-zA-Z0-9_]+$/;
  function safeToCompile(properties) {
    if (!UNSAFE_EVAL_ALLOWED) {
      return false;
    }
    for (const [propertyName, property] of Object.entries(properties)) {
      if (!PROPERTY_NAME_REGEX.test(propertyName)) {
        return false;
      }
      if (property.isList && !PLY_PROPERTY_TYPES.includes(property.countType)) {
        return false;
      }
      if (!PLY_PROPERTY_TYPES.includes(property.type)) {
        return false;
      }
    }
    return true;
  }
  function createCompiledParserFn(properties, littleEndian) {
    const parserSrc = ["let list;"];
    for (const [propertyName, property] of Object.entries(properties)) {
      const fRestMatch = propertyName.match(F_REST_REGEX);
      if (fRestMatch) {
        const fRestIndex = +fRestMatch[1];
        parserSrc.push(
          /*js*/
          \`
        item.f_rest[\${fRestIndex}] = PARSE_FIELD['\${property.type}'](data, offset, \${littleEndian});
        offset += \${FIELD_BYTES[property.type]};
      \`
        );
      } else if (!property.isList) {
        parserSrc.push(
          /*js*/
          \`
        item['\${propertyName}'] = PARSE_FIELD['\${property.type}'](data, offset, \${littleEndian});
        offset += \${FIELD_BYTES[property.type]};
      \`
        );
      } else {
        parserSrc.push(
          /*js*/
          \`
        list = item['\${propertyName}'];
        list.length = PARSE_FIELD['\${property.countType}'](data, offset, \${littleEndian});
        offset += \${FIELD_BYTES[property.countType]};
        for (let i = 0; i < list.length; i++) {
          list[i] = PARSE_FIELD['\${property.type}'](data, offset, \${littleEndian});
          offset += \${FIELD_BYTES[property.type]};
        }
      \`
        );
      }
    }
    parserSrc.push("return offset;");
    const fn = new Function(
      "data",
      "offset",
      "item",
      "PARSE_FIELD",
      parserSrc.join("\\n")
    );
    return (data, offset, item) => fn(data, offset, item, PARSE_FIELD);
  }
  function createDynamicParserFn(properties, littleEndian) {
    const parsers = [];
    for (const [propertyName, property] of Object.entries(properties)) {
      const fRestMatch = propertyName.match(F_REST_REGEX);
      if (fRestMatch) {
        const fRestIndex = +fRestMatch[1];
        parsers.push(
          (data, offset, item) => {
            item.f_rest[fRestIndex] = PARSE_FIELD[property.type](
              data,
              offset,
              littleEndian
            );
            return offset + FIELD_BYTES[property.type];
          }
        );
      } else if (!property.isList) {
        parsers.push(
          (data, offset, item) => {
            item[propertyName] = PARSE_FIELD[property.type](
              data,
              offset,
              littleEndian
            );
            return offset + FIELD_BYTES[property.type];
          }
        );
      } else {
        parsers.push(
          (data, offset, item) => {
            const list = item[propertyName];
            list.length = PARSE_FIELD[property.countType](
              data,
              offset,
              littleEndian
            );
            let currentOffset = offset + FIELD_BYTES[property.countType];
            for (let i2 = 0; i2 < list.length; i2++) {
              list[i2] = PARSE_FIELD[property.type](
                data,
                currentOffset,
                littleEndian
              );
              currentOffset += FIELD_BYTES[property.type];
            }
            return currentOffset;
          }
        );
      }
    }
    return (data, offset, item) => {
      let currentOffset = offset;
      for (let parserIndex = 0; parserIndex < parsers.length; parserIndex++) {
        currentOffset = parsers[parserIndex](data, currentOffset, item);
      }
      return currentOffset;
    };
  }
  function getNumSh(properties) {
    let num_f_rest = 0;
    while (properties[\`f_rest_\${num_f_rest}\`]) {
      num_f_rest += 1;
    }
    const numSh = NUM_F_REST_TO_NUM_SH[num_f_rest];
    if (numSh == null) {
      throw new Error(\`Unsupported number of SH coefficients: \${num_f_rest}\`);
    }
    return numSh;
  }
  class SpzReader {
    constructor({ fileBytes }) {
      this.version = -1;
      this.numSplats = 0;
      this.shDegree = 0;
      this.fractionalBits = 0;
      this.flags = 0;
      this.flagAntiAlias = false;
      this.flagLod = false;
      this.reserved = 0;
      this.headerParsed = false;
      this.parsed = false;
      this.fileBytes = fileBytes instanceof ArrayBuffer ? new Uint8Array(fileBytes) : fileBytes;
      this.reader = new GunzipReader({
        fileBytes: this.fileBytes
      });
    }
    async parseHeader() {
      if (this.headerParsed) {
        throw new Error("SPZ file header already parsed");
      }
      const header = new DataView((await this.reader.read(16)).buffer);
      if (header.getUint32(0, true) !== 1347635022) {
        throw new Error("Invalid SPZ file");
      }
      this.version = header.getUint32(4, true);
      if (this.version < 1 || this.version > 3) {
        throw new Error(\`Unsupported SPZ version: \${this.version}\`);
      }
      this.numSplats = header.getUint32(8, true);
      this.shDegree = header.getUint8(12);
      this.fractionalBits = header.getUint8(13);
      this.flags = header.getUint8(14);
      this.flagAntiAlias = (this.flags & 1) !== 0;
      this.flagLod = (this.flags & 128) !== 0;
      this.reserved = header.getUint8(15);
      this.headerParsed = true;
      this.parsed = false;
    }
    async parseSplats(centerCallback, alphaCallback, rgbCallback, scalesCallback, quatCallback, shCallback, {
      childCounts,
      childStarts
    } = {}) {
      if (!this.headerParsed) {
        throw new Error("SPZ file header must be parsed first");
      }
      if (this.parsed) {
        throw new Error("SPZ file already parsed");
      }
      this.parsed = true;
      if (this.version === 1) {
        const centerBytes = await this.reader.read(this.numSplats * 3 * 2);
        const centerUint16 = new Uint16Array(centerBytes.buffer);
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          const i3 = i2 * 3;
          const x2 = fromHalf(centerUint16[i3]);
          const y = fromHalf(centerUint16[i3 + 1]);
          const z = fromHalf(centerUint16[i3 + 2]);
          centerCallback?.(i2, x2, y, z);
        }
      } else if (this.version === 2 || this.version === 3) {
        const fixed = 1 << this.fractionalBits;
        const centerBytes = await this.reader.read(this.numSplats * 3 * 3);
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          const i9 = i2 * 9;
          const x2 = ((centerBytes[i9 + 2] << 24 | centerBytes[i9 + 1] << 16 | centerBytes[i9] << 8) >> 8) / fixed;
          const y = ((centerBytes[i9 + 5] << 24 | centerBytes[i9 + 4] << 16 | centerBytes[i9 + 3] << 8) >> 8) / fixed;
          const z = ((centerBytes[i9 + 8] << 24 | centerBytes[i9 + 7] << 16 | centerBytes[i9 + 6] << 8) >> 8) / fixed;
          centerCallback?.(i2, x2, y, z);
        }
      } else {
        throw new Error("Unreachable");
      }
      {
        const bytes = await this.reader.read(this.numSplats);
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          alphaCallback?.(i2, bytes[i2] / 255);
        }
      }
      {
        const rgbBytes = await this.reader.read(this.numSplats * 3);
        const scale = SH_C0 / 0.15;
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          const i3 = i2 * 3;
          const r = (rgbBytes[i3] / 255 - 0.5) * scale + 0.5;
          const g = (rgbBytes[i3 + 1] / 255 - 0.5) * scale + 0.5;
          const b = (rgbBytes[i3 + 2] / 255 - 0.5) * scale + 0.5;
          rgbCallback?.(i2, r, g, b);
        }
      }
      {
        const scalesBytes = await this.reader.read(this.numSplats * 3);
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          const i3 = i2 * 3;
          const scaleX = Math.exp(scalesBytes[i3] / 16 - 10);
          const scaleY = Math.exp(scalesBytes[i3 + 1] / 16 - 10);
          const scaleZ = Math.exp(scalesBytes[i3 + 2] / 16 - 10);
          scalesCallback?.(i2, scaleX, scaleY, scaleZ);
        }
      }
      if (this.version === 3) {
        const maxValue = 1 / Math.sqrt(2);
        const quatBytes = await this.reader.read(this.numSplats * 4);
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          const i3 = i2 * 4;
          const quaternion = [0, 0, 0, 0];
          const values = [
            quatBytes[i3],
            quatBytes[i3 + 1],
            quatBytes[i3 + 2],
            quatBytes[i3 + 3]
          ];
          const combinedValues = values[0] + (values[1] << 8) + (values[2] << 16) + (values[3] << 24);
          const valueMask = (1 << 9) - 1;
          const largestIndex = combinedValues >>> 30;
          let remainingValues = combinedValues;
          let sumSquares = 0;
          for (let i22 = 3; i22 >= 0; --i22) {
            if (i22 !== largestIndex) {
              const value = remainingValues & valueMask;
              const sign = remainingValues >>> 9 & 1;
              remainingValues = remainingValues >>> 10;
              quaternion[i22] = maxValue * (value / valueMask);
              quaternion[i22] = sign === 0 ? quaternion[i22] : -quaternion[i22];
              sumSquares += quaternion[i22] * quaternion[i22];
            }
          }
          const square = 1 - sumSquares;
          quaternion[largestIndex] = Math.sqrt(Math.max(square, 0));
          quatCallback?.(
            i2,
            quaternion[0],
            quaternion[1],
            quaternion[2],
            quaternion[3]
          );
        }
      } else {
        const quatBytes = await this.reader.read(this.numSplats * 3);
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          const i3 = i2 * 3;
          const quatX = quatBytes[i3] / 127.5 - 1;
          const quatY = quatBytes[i3 + 1] / 127.5 - 1;
          const quatZ = quatBytes[i3 + 2] / 127.5 - 1;
          const quatW = Math.sqrt(
            Math.max(0, 1 - quatX * quatX - quatY * quatY - quatZ * quatZ)
          );
          quatCallback?.(i2, quatX, quatY, quatZ, quatW);
        }
      }
      if (shCallback && this.shDegree >= 1) {
        const sh1 = new Float32Array(3 * 3);
        const sh2 = this.shDegree >= 2 ? new Float32Array(5 * 3) : void 0;
        const sh3 = this.shDegree >= 3 ? new Float32Array(7 * 3) : void 0;
        const shBytes = await this.reader.read(
          this.numSplats * SH_DEGREE_TO_VECS[this.shDegree] * 3
        );
        let offset = 0;
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          for (let j = 0; j < 9; ++j) {
            sh1[j] = (shBytes[offset + j] - 128) / 128;
          }
          offset += 9;
          if (sh2) {
            for (let j = 0; j < 15; ++j) {
              sh2[j] = (shBytes[offset + j] - 128) / 128;
            }
            offset += 15;
          }
          if (sh3) {
            for (let j = 0; j < 21; ++j) {
              sh3[j] = (shBytes[offset + j] - 128) / 128;
            }
            offset += 21;
          }
          shCallback?.(i2, sh1, sh2, sh3);
        }
      }
      if (this.flagLod) {
        let bytes = await this.reader.read(this.numSplats * 2);
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          const i22 = i2 * 2;
          const count = bytes[i22] + (bytes[i22 + 1] << 8);
          childCounts?.(i2, count);
        }
        bytes = await this.reader.read(this.numSplats * 4);
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          const i4 = i2 * 4;
          const start = bytes[i4] + (bytes[i4 + 1] << 8) + (bytes[i4 + 2] << 16) + (bytes[i4 + 3] << 24);
          childStarts?.(i2, start);
        }
      }
    }
  }
  const SH_DEGREE_TO_VECS = { 1: 3, 2: 8, 3: 15 };
  const SH_C0 = 0.28209479177387814;
  const SPZ_MAGIC = 1347635022;
  const SPZ_VERSION = 3;
  const FLAG_ANTIALIASED = 1;
  class SpzWriter {
    constructor({
      numSplats,
      shDegree,
      fractionalBits = 12,
      flagAntiAlias = true
    }) {
      this.clippedCount = 0;
      const splatSize = 9 + // Position
      1 + // Opacity
      3 + // Scale
      3 + // DC-rgb
      4 + // Rotation
      (shDegree >= 1 ? 9 : 0) + (shDegree >= 2 ? 15 : 0) + (shDegree >= 3 ? 21 : 0);
      const bufferSize = 16 + numSplats * splatSize;
      this.buffer = new ArrayBuffer(bufferSize);
      this.view = new DataView(this.buffer);
      this.view.setUint32(0, SPZ_MAGIC, true);
      this.view.setUint32(4, SPZ_VERSION, true);
      this.view.setUint32(8, numSplats, true);
      this.view.setUint8(12, shDegree);
      this.view.setUint8(13, fractionalBits);
      this.view.setUint8(14, flagAntiAlias ? FLAG_ANTIALIASED : 0);
      this.view.setUint8(15, 0);
      this.numSplats = numSplats;
      this.shDegree = shDegree;
      this.fractionalBits = fractionalBits;
      this.fraction = 1 << fractionalBits;
      this.flagAntiAlias = flagAntiAlias;
    }
    setCenter(index, x2, y, z) {
      const xRounded = Math.round(x2 * this.fraction);
      const xInt = Math.max(-8388607, Math.min(8388607, xRounded));
      const yRounded = Math.round(y * this.fraction);
      const yInt = Math.max(-8388607, Math.min(8388607, yRounded));
      const zRounded = Math.round(z * this.fraction);
      const zInt = Math.max(-8388607, Math.min(8388607, zRounded));
      const clipped = xRounded !== xInt || yRounded !== yInt || zRounded !== zInt;
      if (clipped) {
        this.clippedCount += 1;
      }
      const i9 = index * 9;
      const base = 16 + i9;
      this.view.setUint8(base, xInt & 255);
      this.view.setUint8(base + 1, xInt >> 8 & 255);
      this.view.setUint8(base + 2, xInt >> 16 & 255);
      this.view.setUint8(base + 3, yInt & 255);
      this.view.setUint8(base + 4, yInt >> 8 & 255);
      this.view.setUint8(base + 5, yInt >> 16 & 255);
      this.view.setUint8(base + 6, zInt & 255);
      this.view.setUint8(base + 7, zInt >> 8 & 255);
      this.view.setUint8(base + 8, zInt >> 16 & 255);
    }
    setAlpha(index, alpha) {
      const base = 16 + this.numSplats * 9 + index;
      this.view.setUint8(
        base,
        Math.max(0, Math.min(255, Math.round(alpha * 255)))
      );
    }
    static scaleRgb(r) {
      const v = ((r - 0.5) / (SH_C0 / 0.15) + 0.5) * 255;
      return Math.max(0, Math.min(255, Math.round(v)));
    }
    setRgb(index, r, g, b) {
      const base = 16 + this.numSplats * 10 + index * 3;
      this.view.setUint8(base, SpzWriter.scaleRgb(r));
      this.view.setUint8(base + 1, SpzWriter.scaleRgb(g));
      this.view.setUint8(base + 2, SpzWriter.scaleRgb(b));
    }
    setScale(index, scaleX, scaleY, scaleZ) {
      const base = 16 + this.numSplats * 13 + index * 3;
      this.view.setUint8(
        base,
        Math.max(0, Math.min(255, Math.round((Math.log(scaleX) + 10) * 16)))
      );
      this.view.setUint8(
        base + 1,
        Math.max(0, Math.min(255, Math.round((Math.log(scaleY) + 10) * 16)))
      );
      this.view.setUint8(
        base + 2,
        Math.max(0, Math.min(255, Math.round((Math.log(scaleZ) + 10) * 16)))
      );
    }
    setQuat(index, ...q) {
      const base = 16 + this.numSplats * 16 + index * 4;
      const quat = normalize(q);
      let iLargest = 0;
      for (let i2 = 1; i2 < 4; ++i2) {
        if (Math.abs(quat[i2]) > Math.abs(quat[iLargest])) {
          iLargest = i2;
        }
      }
      const negate = quat[iLargest] < 0 ? 1 : 0;
      let comp = iLargest;
      for (let i2 = 0; i2 < 4; ++i2) {
        if (i2 !== iLargest) {
          const negbit = (quat[i2] < 0 ? 1 : 0) ^ negate;
          const mag = Math.floor(
            ((1 << 9) - 1) * (Math.abs(quat[i2]) / Math.SQRT1_2) + 0.5
          );
          comp = comp << 10 | negbit << 9 | mag;
        }
      }
      this.view.setUint8(base, comp & 255);
      this.view.setUint8(base + 1, comp >> 8 & 255);
      this.view.setUint8(base + 2, comp >> 16 & 255);
      this.view.setUint8(base + 3, comp >>> 24 & 255);
    }
    static quantizeSh(sh, bits2) {
      const value = Math.round(sh * 128) + 128;
      const bucketSize = 1 << 8 - bits2;
      const quantized = Math.floor((value + bucketSize / 2) / bucketSize) * bucketSize;
      return Math.max(0, Math.min(255, quantized));
    }
    setSh(index, sh1, sh2, sh3) {
      const shVecs = SH_DEGREE_TO_VECS[this.shDegree] || 0;
      const base1 = 16 + this.numSplats * 20 + index * shVecs * 3;
      for (let j = 0; j < 9; ++j) {
        this.view.setUint8(base1 + j, SpzWriter.quantizeSh(sh1[j], 5));
      }
      if (sh2) {
        const base2 = base1 + 9;
        for (let j = 0; j < 15; ++j) {
          this.view.setUint8(base2 + j, SpzWriter.quantizeSh(sh2[j], 4));
        }
        if (sh3) {
          const base3 = base2 + 15;
          for (let j = 0; j < 21; ++j) {
            this.view.setUint8(base3 + j, SpzWriter.quantizeSh(sh3[j], 4));
          }
        }
      }
    }
    async finalize() {
      const input = new Uint8Array(this.buffer);
      const stream = new ReadableStream({
        async start(controller) {
          controller.enqueue(input);
          controller.close();
        }
      });
      const compressed = stream.pipeThrough(new CompressionStream("gzip"));
      const response = new Response(compressed);
      const buffer = await response.arrayBuffer();
      console.log(
        "Compressed",
        input.length,
        "bytes to",
        buffer.byteLength,
        "bytes"
      );
      return new Uint8Array(buffer);
    }
  }
  async function transcodeSpz(input) {
    const splats = new SplatData();
    const {
      inputs,
      clipXyz,
      maxSh,
      fractionalBits = 12,
      opacityThreshold
    } = input;
    for (const input2 of inputs) {
      let transformPos = function(pos) {
        pos.multiplyScalar(scale);
        pos.applyQuaternion(quaternion);
        pos.add(translate);
        return pos;
      }, transformScales = function(scales) {
        scales.multiplyScalar(scale);
        return scales;
      }, transformQuaternion = function(quat) {
        quat.premultiply(quaternion);
        return quat;
      }, withinClip = function(p) {
        return !clip || clip.containsPoint(p);
      }, withinOpacity = function(opacity) {
        return opacityThreshold !== void 0 ? opacity >= opacityThreshold : true;
      };
      const scale = input2.transform?.scale ?? 1;
      const quaternion = new Quaternion().fromArray(
        input2.transform?.quaternion ?? [0, 0, 0, 1]
      );
      const translate = new Vector3().fromArray(
        input2.transform?.translate ?? [0, 0, 0]
      );
      const clip = clipXyz ? new Box3(
        new Vector3().fromArray(clipXyz.min),
        new Vector3().fromArray(clipXyz.max)
      ) : void 0;
      let fileType = input2.fileType;
      if (!fileType) {
        fileType = getSplatFileType(input2.fileBytes);
        if (!fileType && input2.pathOrUrl) {
          fileType = getSplatFileTypeFromPath(input2.pathOrUrl);
        }
      }
      switch (fileType) {
        case SplatFileType.PLY: {
          const ply = new PlyReader({ fileBytes: input2.fileBytes });
          await ply.parseHeader();
          let lastIndex = null;
          ply.parseSplats(
            (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {
              const center = transformPos(new Vector3(x2, y, z));
              if (withinClip(center) && withinOpacity(opacity)) {
                lastIndex = splats.pushSplat();
                splats.setCenter(lastIndex, center.x, center.y, center.z);
                const scales = transformScales(
                  new Vector3(scaleX, scaleY, scaleZ)
                );
                splats.setScale(lastIndex, scales.x, scales.y, scales.z);
                const quaternion2 = transformQuaternion(
                  new Quaternion(quatX, quatY, quatZ, quatW)
                );
                splats.setQuaternion(
                  lastIndex,
                  quaternion2.x,
                  quaternion2.y,
                  quaternion2.z,
                  quaternion2.w
                );
                splats.setOpacity(lastIndex, opacity);
                splats.setColor(lastIndex, r, g, b);
              } else {
                lastIndex = null;
              }
            },
            (index, sh1, sh2, sh3) => {
              if (sh1 && lastIndex !== null) {
                splats.setSh1(lastIndex, sh1);
              }
              if (sh2 && lastIndex !== null) {
                splats.setSh2(lastIndex, sh2);
              }
              if (sh3 && lastIndex !== null) {
                splats.setSh3(lastIndex, sh3);
              }
            }
          );
          break;
        }
        case SplatFileType.SPZ: {
          const spz2 = new SpzReader({ fileBytes: input2.fileBytes });
          await spz2.parseHeader();
          const mapping = new Int32Array(spz2.numSplats);
          mapping.fill(-1);
          const centers = new Float32Array(spz2.numSplats * 3);
          const center = new Vector3();
          spz2.parseSplats(
            (index, x2, y, z) => {
              const center2 = transformPos(new Vector3(x2, y, z));
              centers[index * 3] = center2.x;
              centers[index * 3 + 1] = center2.y;
              centers[index * 3 + 2] = center2.z;
            },
            (index, alpha) => {
              center.fromArray(centers, index * 3);
              if (withinClip(center) && withinOpacity(alpha)) {
                mapping[index] = splats.pushSplat();
                splats.setCenter(mapping[index], center.x, center.y, center.z);
                splats.setOpacity(mapping[index], alpha);
              }
            },
            (index, r, g, b) => {
              if (mapping[index] >= 0) {
                splats.setColor(mapping[index], r, g, b);
              }
            },
            (index, scaleX, scaleY, scaleZ) => {
              if (mapping[index] >= 0) {
                const scales = transformScales(
                  new Vector3(scaleX, scaleY, scaleZ)
                );
                splats.setScale(mapping[index], scales.x, scales.y, scales.z);
              }
            },
            (index, quatX, quatY, quatZ, quatW) => {
              if (mapping[index] >= 0) {
                const quaternion2 = transformQuaternion(
                  new Quaternion(quatX, quatY, quatZ, quatW)
                );
                splats.setQuaternion(
                  mapping[index],
                  quaternion2.x,
                  quaternion2.y,
                  quaternion2.z,
                  quaternion2.w
                );
              }
            },
            (index, sh1, sh2, sh3) => {
              if (mapping[index] >= 0) {
                splats.setSh1(mapping[index], sh1);
                if (sh2) {
                  splats.setSh2(mapping[index], sh2);
                }
                if (sh3) {
                  splats.setSh3(mapping[index], sh3);
                }
              }
            }
          );
          break;
        }
        case SplatFileType.SPLAT:
          decodeAntiSplat(
            input2.fileBytes,
            (numSplats) => {
            },
            (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {
              const center = transformPos(new Vector3(x2, y, z));
              if (withinClip(center) && withinOpacity(opacity)) {
                const index2 = splats.pushSplat();
                splats.setCenter(index2, center.x, center.y, center.z);
                const scales = transformScales(
                  new Vector3(scaleX, scaleY, scaleZ)
                );
                splats.setScale(index2, scales.x, scales.y, scales.z);
                const quaternion2 = transformQuaternion(
                  new Quaternion(quatX, quatY, quatZ, quatW)
                );
                splats.setQuaternion(
                  index2,
                  quaternion2.x,
                  quaternion2.y,
                  quaternion2.z,
                  quaternion2.w
                );
                splats.setOpacity(index2, opacity);
                splats.setColor(index2, r, g, b);
              }
            }
          );
          break;
        case SplatFileType.KSPLAT: {
          let lastIndex = null;
          decodeKsplat(
            input2.fileBytes,
            (numSplats) => {
            },
            (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {
              const center = transformPos(new Vector3(x2, y, z));
              if (withinClip(center) && withinOpacity(opacity)) {
                lastIndex = splats.pushSplat();
                splats.setCenter(lastIndex, center.x, center.y, center.z);
                const scales = transformScales(
                  new Vector3(scaleX, scaleY, scaleZ)
                );
                splats.setScale(lastIndex, scales.x, scales.y, scales.z);
                const quaternion2 = transformQuaternion(
                  new Quaternion(quatX, quatY, quatZ, quatW)
                );
                splats.setQuaternion(
                  lastIndex,
                  quaternion2.x,
                  quaternion2.y,
                  quaternion2.z,
                  quaternion2.w
                );
                splats.setOpacity(lastIndex, opacity);
                splats.setColor(lastIndex, r, g, b);
              } else {
                lastIndex = null;
              }
            },
            (index, sh1, sh2, sh3) => {
              if (lastIndex !== null) {
                splats.setSh1(lastIndex, sh1);
                if (sh2) {
                  splats.setSh2(lastIndex, sh2);
                }
                if (sh3) {
                  splats.setSh3(lastIndex, sh3);
                }
              }
            }
          );
          break;
        }
        default:
          throw new Error(\`transcodeSpz not implemented for \${fileType}\`);
      }
    }
    const shDegree = Math.min(
      maxSh ?? 3,
      splats.sh3 ? 3 : splats.sh2 ? 2 : splats.sh1 ? 1 : 0
    );
    const spz = new SpzWriter({
      numSplats: splats.numSplats,
      shDegree,
      fractionalBits,
      flagAntiAlias: true
    });
    for (let i2 = 0; i2 < splats.numSplats; ++i2) {
      const i3 = i2 * 3;
      const i4 = i2 * 4;
      spz.setCenter(
        i2,
        splats.centers[i3],
        splats.centers[i3 + 1],
        splats.centers[i3 + 2]
      );
      spz.setScale(
        i2,
        splats.scales[i3],
        splats.scales[i3 + 1],
        splats.scales[i3 + 2]
      );
      spz.setQuat(
        i2,
        splats.quaternions[i4],
        splats.quaternions[i4 + 1],
        splats.quaternions[i4 + 2],
        splats.quaternions[i4 + 3]
      );
      spz.setAlpha(i2, splats.opacities[i2]);
      spz.setRgb(
        i2,
        splats.colors[i3],
        splats.colors[i3 + 1],
        splats.colors[i3 + 2]
      );
      if (splats.sh1 && shDegree >= 1) {
        spz.setSh(
          i2,
          splats.sh1.slice(i2 * 9, (i2 + 1) * 9),
          shDegree >= 2 && splats.sh2 ? splats.sh2.slice(i2 * 15, (i2 + 1) * 15) : void 0,
          shDegree >= 3 && splats.sh3 ? splats.sh3.slice(i2 * 21, (i2 + 1) * 21) : void 0
        );
      }
    }
    const spzBytes = await spz.finalize();
    return { fileBytes: spzBytes, clippedCount: spz.clippedCount };
  }
  function getSplatFileType(fileBytes) {
    const view = new DataView(fileBytes.buffer);
    const magic = view.getUint32(0, true);
    if ((magic & 16777215) === 7957616) {
      return SplatFileType.PLY;
    }
    if ((magic & 16777215) === 559903) {
      const header = decompressPartialGzip(fileBytes, 4);
      const gView = new DataView(header.buffer);
      if (gView.getUint32(0, true) === 1347635022) {
        return SplatFileType.SPZ;
      }
      return void 0;
    }
    if (magic === 67324752) {
      if (tryPcSogsZip(fileBytes)) {
        return SplatFileType.PCSOGSZIP;
      }
      return void 0;
    }
    if (magic === 809779538) {
      return SplatFileType.RAD;
    }
    return void 0;
  }
  function getFileExtension(pathOrUrl) {
    const noTrailing = pathOrUrl.split(/[?#]/, 1)[0];
    const lastSlash = Math.max(
      noTrailing.lastIndexOf("/"),
      noTrailing.lastIndexOf("\\\\")
    );
    const filename = noTrailing.slice(lastSlash + 1);
    const lastDot = filename.lastIndexOf(".");
    if (lastDot <= 0 || lastDot === filename.length - 1) {
      return "";
    }
    return filename.slice(lastDot + 1).toLowerCase();
  }
  function getSplatFileTypeFromPath(pathOrUrl) {
    const extension = getFileExtension(pathOrUrl);
    if (extension === "ply") {
      return SplatFileType.PLY;
    }
    if (extension === "spz") {
      return SplatFileType.SPZ;
    }
    if (extension === "splat") {
      return SplatFileType.SPLAT;
    }
    if (extension === "ksplat") {
      return SplatFileType.KSPLAT;
    }
    if (extension === "sog") {
      return SplatFileType.PCSOGSZIP;
    }
    if (extension === "rad") {
      return SplatFileType.RAD;
    }
    return void 0;
  }
  function tryPcSogs(input) {
    try {
      let text;
      if (typeof input === "string") {
        text = input;
      } else {
        const fileBytes = input instanceof ArrayBuffer ? new Uint8Array(input) : input;
        if (fileBytes.length > 65536) {
          return void 0;
        }
        text = new TextDecoder().decode(fileBytes);
      }
      const json = JSON.parse(text);
      if (!json || typeof json !== "object" || Array.isArray(json)) {
        return void 0;
      }
      const isVersion2 = json.version === 2;
      for (const key of ["means", "scales", "quats", "sh0"]) {
        if (!json[key] || typeof json[key] !== "object" || Array.isArray(json[key])) {
          return void 0;
        }
        if (isVersion2) {
          if (!json[key].files) {
            return void 0;
          }
          if ((key === "scales" || key === "sh0") && !json[key].codebook) {
            return void 0;
          }
          if (key === "means" && (!json[key].mins || !json[key].maxs)) {
            return void 0;
          }
        } else {
          if (!json[key].shape || !json[key].files) {
            return void 0;
          }
          if (key !== "quats" && (!json[key].mins || !json[key].maxs)) {
            return void 0;
          }
        }
      }
      return json;
    } catch {
      return void 0;
    }
  }
  function tryPcSogsZip(input) {
    try {
      const fileBytes = input instanceof ArrayBuffer ? new Uint8Array(input) : input;
      let metaFilename = null;
      const unzipped = unzipSync(fileBytes, {
        filter: ({ name }) => {
          const filename = name.split(/[\\\\/]/).pop();
          if (filename === "meta.json") {
            metaFilename = name;
            return true;
          }
          return false;
        }
      });
      if (!metaFilename) {
        return void 0;
      }
      const json = tryPcSogs(unzipped[metaFilename]);
      if (!json) {
        return void 0;
      }
      return { name: metaFilename, json };
    } catch {
      return void 0;
    }
  }
  class SplatData {
    constructor({ maxSplats = 1 } = {}) {
      this.numSplats = 0;
      this.maxSplats = getTextureSize(maxSplats).maxSplats;
      this.centers = new Float32Array(this.maxSplats * 3);
      this.scales = new Float32Array(this.maxSplats * 3);
      this.quaternions = new Float32Array(this.maxSplats * 4);
      this.opacities = new Float32Array(this.maxSplats);
      this.colors = new Float32Array(this.maxSplats * 3);
    }
    pushSplat() {
      const index = this.numSplats;
      this.ensureIndex(index);
      this.numSplats += 1;
      return index;
    }
    unpushSplat(index) {
      if (index === this.numSplats - 1) {
        this.numSplats -= 1;
      } else {
        throw new Error("Cannot unpush splat from non-last position");
      }
    }
    ensureCapacity(numSplats) {
      if (numSplats > this.maxSplats) {
        const targetSplats = Math.max(numSplats, this.maxSplats * 2);
        const newCenters = new Float32Array(targetSplats * 3);
        const newScales = new Float32Array(targetSplats * 3);
        const newQuaternions = new Float32Array(targetSplats * 4);
        const newOpacities = new Float32Array(targetSplats);
        const newColors = new Float32Array(targetSplats * 3);
        newCenters.set(this.centers);
        newScales.set(this.scales);
        newQuaternions.set(this.quaternions);
        newOpacities.set(this.opacities);
        newColors.set(this.colors);
        this.centers = newCenters;
        this.scales = newScales;
        this.quaternions = newQuaternions;
        this.opacities = newOpacities;
        this.colors = newColors;
        if (this.sh1) {
          const newSh1 = new Float32Array(targetSplats * 9);
          newSh1.set(this.sh1);
          this.sh1 = newSh1;
        }
        if (this.sh2) {
          const newSh2 = new Float32Array(targetSplats * 15);
          newSh2.set(this.sh2);
          this.sh2 = newSh2;
        }
        if (this.sh3) {
          const newSh3 = new Float32Array(targetSplats * 21);
          newSh3.set(this.sh3);
          this.sh3 = newSh3;
        }
        this.maxSplats = targetSplats;
      }
    }
    ensureIndex(index) {
      this.ensureCapacity(index + 1);
    }
    setCenter(index, x2, y, z) {
      this.centers[index * 3] = x2;
      this.centers[index * 3 + 1] = y;
      this.centers[index * 3 + 2] = z;
    }
    setScale(index, scaleX, scaleY, scaleZ) {
      this.scales[index * 3] = scaleX;
      this.scales[index * 3 + 1] = scaleY;
      this.scales[index * 3 + 2] = scaleZ;
    }
    setQuaternion(index, x2, y, z, w) {
      this.quaternions[index * 4] = x2;
      this.quaternions[index * 4 + 1] = y;
      this.quaternions[index * 4 + 2] = z;
      this.quaternions[index * 4 + 3] = w;
    }
    setOpacity(index, opacity) {
      this.opacities[index] = opacity;
    }
    setColor(index, r, g, b) {
      this.colors[index * 3] = r;
      this.colors[index * 3 + 1] = g;
      this.colors[index * 3 + 2] = b;
    }
    setSh1(index, sh1) {
      if (!this.sh1) {
        this.sh1 = new Float32Array(this.maxSplats * 9);
      }
      for (let j = 0; j < 9; ++j) {
        this.sh1[index * 9 + j] = sh1[j];
      }
    }
    setSh2(index, sh2) {
      if (!this.sh2) {
        this.sh2 = new Float32Array(this.maxSplats * 15);
      }
      for (let j = 0; j < 15; ++j) {
        this.sh2[index * 15 + j] = sh2[j];
      }
    }
    setSh3(index, sh3) {
      if (!this.sh3) {
        this.sh3 = new Float32Array(this.maxSplats * 21);
      }
      for (let j = 0; j < 21; ++j) {
        this.sh3[index * 21 + j] = sh3[j];
      }
    }
  }
  async function unpackPcSogs(json, extraFiles, splatEncoding) {
    const isVersion2 = "version" in json;
    if (!isVersion2 && json.quats.encoding !== "quaternion_packed") {
      throw new Error("Unsupported quaternion encoding");
    }
    const numSplats = isVersion2 ? json.count : json.means.shape[0];
    const maxSplats = computeMaxSplats(numSplats);
    const packedArray = new Uint32Array(maxSplats * 4);
    const extra = {};
    const meansPromise = Promise.all([
      decodeImageRgba(extraFiles[json.means.files[0]]),
      decodeImageRgba(extraFiles[json.means.files[1]])
    ]).then((means) => {
      for (let i2 = 0; i2 < numSplats; ++i2) {
        const i4 = i2 * 4;
        const fx = (means[0][i4 + 0] + (means[1][i4 + 0] << 8)) / 65535;
        const fy = (means[0][i4 + 1] + (means[1][i4 + 1] << 8)) / 65535;
        const fz = (means[0][i4 + 2] + (means[1][i4 + 2] << 8)) / 65535;
        let x2 = json.means.mins[0] + (json.means.maxs[0] - json.means.mins[0]) * fx;
        let y = json.means.mins[1] + (json.means.maxs[1] - json.means.mins[1]) * fy;
        let z = json.means.mins[2] + (json.means.maxs[2] - json.means.mins[2]) * fz;
        x2 = Math.sign(x2) * (Math.exp(Math.abs(x2)) - 1);
        y = Math.sign(y) * (Math.exp(Math.abs(y)) - 1);
        z = Math.sign(z) * (Math.exp(Math.abs(z)) - 1);
        setPackedSplatCenter(packedArray, i2, x2, y, z);
      }
    });
    const scalesPromise = decodeImageRgba(extraFiles[json.scales.files[0]]).then(
      (scales) => {
        let xLookup;
        let yLookup;
        let zLookup;
        if (isVersion2) {
          xLookup = yLookup = zLookup = json.scales.codebook.map((x2) => Math.exp(x2));
        } else {
          xLookup = new Array(256).fill(0).map(
            (_, i2) => json.scales.mins[0] + (json.scales.maxs[0] - json.scales.mins[0]) * (i2 / 255)
          ).map((x2) => Math.exp(x2));
          yLookup = new Array(256).fill(0).map(
            (_, i2) => json.scales.mins[1] + (json.scales.maxs[1] - json.scales.mins[1]) * (i2 / 255)
          ).map((x2) => Math.exp(x2));
          zLookup = new Array(256).fill(0).map(
            (_, i2) => json.scales.mins[2] + (json.scales.maxs[2] - json.scales.mins[2]) * (i2 / 255)
          ).map((x2) => Math.exp(x2));
        }
        for (let i2 = 0; i2 < numSplats; ++i2) {
          const i4 = i2 * 4;
          setPackedSplatScales(
            packedArray,
            i2,
            xLookup[scales[i4 + 0]],
            yLookup[scales[i4 + 1]],
            zLookup[scales[i4 + 2]],
            splatEncoding
          );
        }
      }
    );
    const quatsPromise = decodeImageRgba(extraFiles[json.quats.files[0]]).then(
      (quats) => {
        const SQRT2 = Math.sqrt(2);
        const lookup = new Array(256).fill(0).map((_, i2) => (i2 / 255 - 0.5) * SQRT2);
        for (let i2 = 0; i2 < numSplats; ++i2) {
          const i4 = i2 * 4;
          const r0 = lookup[quats[i4 + 0]];
          const r1 = lookup[quats[i4 + 1]];
          const r2 = lookup[quats[i4 + 2]];
          const rr = Math.sqrt(Math.max(0, 1 - r0 * r0 - r1 * r1 - r2 * r2));
          const rOrder = quats[i4 + 3] - 252;
          const quatX = rOrder === 0 ? r0 : rOrder === 1 ? rr : r1;
          const quatY = rOrder <= 1 ? r1 : rOrder === 2 ? rr : r2;
          const quatZ = rOrder <= 2 ? r2 : rr;
          const quatW = rOrder === 0 ? rr : r0;
          setPackedSplatQuat(packedArray, i2, quatX, quatY, quatZ, quatW);
        }
      }
    );
    const sh0Promise = decodeImageRgba(extraFiles[json.sh0.files[0]]).then(
      (sh0) => {
        const SH_C02 = 0.28209479177387814;
        let rLookup;
        let gLookup;
        let bLookup;
        let aLookup;
        if (isVersion2) {
          rLookup = gLookup = bLookup = json.sh0.codebook.map((x2) => SH_C02 * x2 + 0.5);
          aLookup = new Array(256).fill(0).map((_, i2) => i2 / 255);
        } else {
          rLookup = new Array(256).fill(0).map(
            (_, i2) => json.sh0.mins[0] + (json.sh0.maxs[0] - json.sh0.mins[0]) * (i2 / 255)
          ).map((x2) => SH_C02 * x2 + 0.5);
          gLookup = new Array(256).fill(0).map(
            (_, i2) => json.sh0.mins[1] + (json.sh0.maxs[1] - json.sh0.mins[1]) * (i2 / 255)
          ).map((x2) => SH_C02 * x2 + 0.5);
          bLookup = new Array(256).fill(0).map(
            (_, i2) => json.sh0.mins[2] + (json.sh0.maxs[2] - json.sh0.mins[2]) * (i2 / 255)
          ).map((x2) => SH_C02 * x2 + 0.5);
          aLookup = new Array(256).fill(0).map(
            (_, i2) => json.sh0.mins[3] + (json.sh0.maxs[3] - json.sh0.mins[3]) * (i2 / 255)
          ).map((x2) => 1 / (1 + Math.exp(-x2)));
        }
        for (let i2 = 0; i2 < numSplats; ++i2) {
          const i4 = i2 * 4;
          setPackedSplatRgba(
            packedArray,
            i2,
            rLookup[sh0[i4 + 0]],
            gLookup[sh0[i4 + 1]],
            bLookup[sh0[i4 + 2]],
            aLookup[sh0[i4 + 3]],
            splatEncoding
          );
        }
      }
    );
    const promises = [meansPromise, scalesPromise, quatsPromise, sh0Promise];
    if (json.shN) {
      const useSH3 = isVersion2 ? json.shN.bands >= 3 : json.shN.shape[1] >= 48 - 3;
      const useSH2 = isVersion2 ? json.shN.bands >= 2 : json.shN.shape[1] >= 27 - 3;
      const useSH1 = isVersion2 ? json.shN.bands >= 1 : json.shN.shape[1] >= 12 - 3;
      if (useSH1) extra.sh1 = new Uint32Array(numSplats * 2);
      if (useSH2) extra.sh2 = new Uint32Array(numSplats * 4);
      if (useSH3) extra.sh3 = new Uint32Array(numSplats * 4);
      const sh1 = new Float32Array(9);
      const sh2 = new Float32Array(15);
      const sh3 = new Float32Array(21);
      const shN = json.shN;
      const shNPromise = Promise.all([
        decodeImage(extraFiles[json.shN.files[0]]),
        decodeImage(extraFiles[json.shN.files[1]])
      ]).then(([centroids, labels]) => {
        const lookup = "codebook" in shN ? shN.codebook : new Array(256).fill(0).map((_, i2) => shN.mins + (shN.maxs - shN.mins) * (i2 / 255));
        for (let i2 = 0; i2 < numSplats; ++i2) {
          const i4 = i2 * 4;
          const label = labels.rgba[i4 + 0] + (labels.rgba[i4 + 1] << 8);
          const col = (label & 63) * 15;
          const row = label >>> 6;
          const offset = row * centroids.width + col;
          for (let d = 0; d < 3; ++d) {
            if (useSH1) {
              for (let k = 0; k < 3; ++k) {
                sh1[k * 3 + d] = lookup[centroids.rgba[(offset + k) * 4 + d]];
              }
            }
            if (useSH2) {
              for (let k = 0; k < 5; ++k) {
                sh2[k * 3 + d] = lookup[centroids.rgba[(offset + 3 + k) * 4 + d]];
              }
            }
            if (useSH3) {
              for (let k = 0; k < 7; ++k) {
                sh3[k * 3 + d] = lookup[centroids.rgba[(offset + 8 + k) * 4 + d]];
              }
            }
          }
          if (useSH1)
            encodeSh1Rgb(extra.sh1, i2, sh1, splatEncoding);
          if (useSH2)
            encodeSh2Rgb(extra.sh2, i2, sh2, splatEncoding);
          if (useSH3)
            encodeSh3Rgb(extra.sh3, i2, sh3, splatEncoding);
        }
      });
      promises.push(shNPromise);
    }
    await Promise.all(promises);
    return { packedArray, numSplats, extra };
  }
  let offscreenGlContext = null;
  async function decodeImage(fileBytes) {
    if (!offscreenGlContext) {
      const canvas = new OffscreenCanvas(1, 1);
      offscreenGlContext = canvas.getContext("webgl2");
      if (!offscreenGlContext) {
        throw new Error("Failed to create WebGL2 context");
      }
    }
    const imageBlob = new Blob([fileBytes]);
    const bitmap = await createImageBitmap(imageBlob, {
      premultiplyAlpha: "none"
    });
    const gl = offscreenGlContext;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );
    const data = new Uint8Array(bitmap.width * bitmap.height * 4);
    gl.readPixels(
      0,
      0,
      bitmap.width,
      bitmap.height,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      data
    );
    gl.deleteTexture(texture);
    gl.deleteFramebuffer(framebuffer);
    return { rgba: data, width: bitmap.width, height: bitmap.height };
  }
  async function decodeImageRgba(fileBytes) {
    const { rgba } = await decodeImage(fileBytes);
    return rgba;
  }
  async function unpackPcSogsZip(fileBytes, splatEncoding) {
    const nameJson = tryPcSogsZip(fileBytes);
    if (!nameJson) {
      throw new Error("Invalid PC SOGS zip file");
    }
    const { name, json } = nameJson;
    const lastSlash = name.lastIndexOf("/");
    const lastBackslash = name.lastIndexOf("\\\\");
    const prefix = name.slice(0, Math.max(lastSlash, lastBackslash) + 1);
    const fileMap = /* @__PURE__ */ new Map();
    const refFiles = [
      ...json.means.files,
      ...json.scales.files,
      ...json.quats.files,
      ...json.sh0.files,
      ...json.shN?.files ?? []
    ];
    for (const file of refFiles) {
      fileMap.set(prefix + file, file);
    }
    const unzipped = await new Promise(
      (resolve, reject) => {
        unzip(
          fileBytes,
          {
            filter: ({ name: name2 }) => {
              return fileMap.has(name2);
            }
          },
          (err2, files) => {
            if (err2) {
              reject(err2);
            } else {
              resolve(files);
            }
          }
        );
      }
    );
    const extraFiles = {};
    for (const [full, name2] of fileMap.entries()) {
      extraFiles[name2] = unzipped[full];
    }
    return await unpackPcSogs(json, extraFiles, splatEncoding);
  }
  async function onMessage(event) {
    const { name, args, id } = event.data;
    let result = void 0;
    let error = void 0;
    try {
      switch (name) {
        case "unpackPly": {
          const { packedArray, fileBytes, splatEncoding } = args;
          const decoded = await unpackPly({
            packedArray,
            fileBytes,
            splatEncoding
          });
          result = {
            id,
            numSplats: decoded.numSplats,
            packedArray: decoded.packedArray,
            extra: decoded.extra
          };
          break;
        }
        case "decodeSpz": {
          const { fileBytes, splatEncoding } = args;
          const decoded = await unpackSpz(fileBytes, splatEncoding);
          result = {
            id,
            numSplats: decoded.numSplats,
            packedArray: decoded.packedArray,
            extra: decoded.extra
          };
          break;
        }
        case "decodeAntiSplat": {
          const { fileBytes, splatEncoding } = args;
          const decoded = unpackAntiSplat(fileBytes, splatEncoding);
          result = {
            id,
            numSplats: decoded.numSplats,
            packedArray: decoded.packedArray
          };
          break;
        }
        case "decodeKsplat": {
          const { fileBytes, splatEncoding } = args;
          const decoded = unpackKsplat(fileBytes, splatEncoding);
          result = {
            id,
            numSplats: decoded.numSplats,
            packedArray: decoded.packedArray,
            extra: decoded.extra
          };
          break;
        }
        case "decodePcSogs": {
          const { fileBytes, extraFiles, splatEncoding } = args;
          const json = JSON.parse(
            new TextDecoder().decode(fileBytes)
          );
          const decoded = await unpackPcSogs(json, extraFiles, splatEncoding);
          result = {
            id,
            numSplats: decoded.numSplats,
            packedArray: decoded.packedArray,
            extra: decoded.extra
          };
          break;
        }
        case "decodePcSogsZip": {
          const { fileBytes, splatEncoding } = args;
          const decoded = await unpackPcSogsZip(fileBytes, splatEncoding);
          result = {
            id,
            numSplats: decoded.numSplats,
            packedArray: decoded.packedArray,
            extra: decoded.extra
          };
          break;
        }
        case "sortSplats": {
          const { totalSplats, readback, ordering } = args;
          result = {
            id,
            readback,
            ...sortSplats({ totalSplats, readback, ordering })
          };
          break;
        }
        case "sortDoubleSplats": {
          const { numSplats, readback, ordering } = args;
          {
            result = {
              id,
              readback,
              ordering,
              activeSplats: sort_splats(numSplats, readback, ordering)
            };
          }
          break;
        }
        case "sort32Splats": {
          const { numSplats, readback, ordering } = args;
          {
            result = {
              id,
              readback,
              ordering,
              activeSplats: sort32_splats(numSplats, readback, ordering)
            };
          }
          break;
        }
        case "transcodeSpz": {
          const input = args;
          const spzBytes = await transcodeSpz(input);
          result = {
            id,
            fileBytes: spzBytes,
            input
          };
          break;
        }
        default: {
          throw new Error(\`Unknown name: \${name}\`);
        }
      }
    } catch (e) {
      error = e;
      console.error(error);
    }
    self.postMessage(
      { id, result, error },
      { transfer: getTransferable(result) }
    );
  }
  async function unpackPly({
    packedArray,
    fileBytes,
    splatEncoding
  }) {
    const ply = new PlyReader({ fileBytes });
    await ply.parseHeader();
    const numSplats = ply.numSplats;
    const extra = {};
    ply.parseSplats(
      (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {
        setPackedSplat(
          packedArray,
          index,
          x2,
          y,
          z,
          scaleX,
          scaleY,
          scaleZ,
          quatX,
          quatY,
          quatZ,
          quatW,
          opacity,
          r,
          g,
          b,
          splatEncoding
        );
      },
      (index, sh1, sh2, sh3) => {
        if (sh1) {
          if (!extra.sh1) {
            extra.sh1 = new Uint32Array(numSplats * 2);
          }
          encodeSh1Rgb(extra.sh1, index, sh1, splatEncoding);
        }
        if (sh2) {
          if (!extra.sh2) {
            extra.sh2 = new Uint32Array(numSplats * 4);
          }
          encodeSh2Rgb(extra.sh2, index, sh2, splatEncoding);
        }
        if (sh3) {
          if (!extra.sh3) {
            extra.sh3 = new Uint32Array(numSplats * 4);
          }
          encodeSh3Rgb(extra.sh3, index, sh3, splatEncoding);
        }
      }
    );
    return { packedArray, numSplats, extra };
  }
  async function unpackSpz(fileBytes, splatEncoding) {
    const spz = new SpzReader({ fileBytes });
    await spz.parseHeader();
    const numSplats = spz.numSplats;
    const maxSplats = computeMaxSplats(numSplats);
    const packedArray = new Uint32Array(maxSplats * 4);
    const extra = {};
    let extraCallbacks = {};
    if (spz.flagLod) {
      const childCounts = new Uint16Array(numSplats);
      const childStarts = new Uint32Array(numSplats);
      extra.childCounts = childCounts;
      extra.childStarts = childStarts;
      extraCallbacks = {
        childCounts: (index, count) => {
          childCounts[index] = count;
        },
        childStarts: (index, start) => {
          childStarts[index] = start;
        }
      };
    }
    await spz.parseSplats(
      (index, x2, y, z) => {
        setPackedSplatCenter(packedArray, index, x2, y, z);
      },
      (index, alpha) => {
        setPackedSplatOpacity(packedArray, index, alpha);
      },
      (index, r, g, b) => {
        setPackedSplatRgb(packedArray, index, r, g, b, splatEncoding);
      },
      (index, scaleX, scaleY, scaleZ) => {
        setPackedSplatScales(
          packedArray,
          index,
          scaleX,
          scaleY,
          scaleZ,
          splatEncoding
        );
      },
      (index, quatX, quatY, quatZ, quatW) => {
        setPackedSplatQuat(packedArray, index, quatX, quatY, quatZ, quatW);
      },
      (index, sh1, sh2, sh3) => {
        if (sh1) {
          if (!extra.sh1) {
            extra.sh1 = new Uint32Array(numSplats * 2);
          }
          encodeSh1Rgb(extra.sh1, index, sh1, splatEncoding);
        }
        if (sh2) {
          if (!extra.sh2) {
            extra.sh2 = new Uint32Array(numSplats * 4);
          }
          encodeSh2Rgb(extra.sh2, index, sh2, splatEncoding);
        }
        if (sh3) {
          if (!extra.sh3) {
            extra.sh3 = new Uint32Array(numSplats * 4);
          }
          encodeSh3Rgb(extra.sh3, index, sh3, splatEncoding);
        }
      },
      extraCallbacks
    );
    return { packedArray, numSplats, extra };
  }
  const DEPTH_INFINITY_F16 = 31744;
  const DEPTH_SIZE_16 = DEPTH_INFINITY_F16 + 1;
  let depthArray16 = null;
  function sortSplats({
    totalSplats,
    readback,
    ordering
  }) {
    if (!depthArray16) {
      depthArray16 = new Uint32Array(DEPTH_SIZE_16);
    }
    depthArray16.fill(0);
    const readbackUint32 = readback.map((layer) => new Uint32Array(layer.buffer));
    const layerSize = readbackUint32[0].length;
    const numLayers = Math.ceil(totalSplats / layerSize);
    let layerBase = 0;
    for (let layer = 0; layer < numLayers; ++layer) {
      const readbackLayer = readbackUint32[layer];
      const layerSplats = Math.min(readbackLayer.length, totalSplats - layerBase);
      for (let i2 = 0; i2 < layerSplats; ++i2) {
        const pri = readbackLayer[i2] & 32767;
        if (pri < DEPTH_INFINITY_F16) {
          depthArray16[pri] += 1;
        }
      }
      layerBase += layerSplats;
    }
    let activeSplats = 0;
    for (let j = 0; j < DEPTH_SIZE_16; ++j) {
      const nextIndex = activeSplats + depthArray16[j];
      depthArray16[j] = activeSplats;
      activeSplats = nextIndex;
    }
    layerBase = 0;
    for (let layer = 0; layer < numLayers; ++layer) {
      const readbackLayer = readbackUint32[layer];
      const layerSplats = Math.min(readbackLayer.length, totalSplats - layerBase);
      for (let i2 = 0; i2 < layerSplats; ++i2) {
        const pri = readbackLayer[i2] & 32767;
        if (pri < DEPTH_INFINITY_F16) {
          ordering[depthArray16[pri]] = layerBase + i2;
          depthArray16[pri] += 1;
        }
      }
      layerBase += layerSplats;
    }
    if (depthArray16[DEPTH_SIZE_16 - 1] !== activeSplats) {
      throw new Error(
        \`Expected \${activeSplats} active splats but got \${depthArray16[DEPTH_SIZE_16 - 1]}\`
      );
    }
    return { activeSplats, ordering };
  }
  const messageBuffer = [];
  function bufferMessage(event) {
    messageBuffer.push(event);
  }
  async function initialize() {
    self.addEventListener("message", bufferMessage);
    await __wbg_init();
    self.removeEventListener("message", bufferMessage);
    self.addEventListener("message", onMessage);
    for (const event of messageBuffer) {
      onMessage(event);
    }
    messageBuffer.length = 0;
  }
  initialize().catch(console.error);
})();
//# sourceMappingURL=oldWorker-BHhVRRQ1.js.map
`,ln=typeof self<`u`&&self.Blob&&new Blob([`(self.URL || self.webkitURL).revokeObjectURL(self.location.href);`,cn],{type:`text/javascript;charset=utf-8`});function un(e){let t;try{if(t=ln&&(self.URL||self.webkitURL).createObjectURL(ln),!t)throw``;let n=new Worker(t,{name:e?.name});return n.addEventListener(`error`,()=>{(self.URL||self.webkitURL).revokeObjectURL(t)}),n}catch{return new Worker(`data:text/javascript;charset=utf-8,`+encodeURIComponent(cn),{name:e?.name})}}var N=Uint8Array,dn=Uint16Array,fn=Int32Array,pn=new N([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),mn=new N([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),hn=new N([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),gn=function(e,t){for(var n=new dn(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];var i=new fn(n[30]);for(r=1;r<30;++r)for(var a=n[r];a<n[r+1];++a)i[a]=a-n[r]<<5|r;return{b:n,r:i}},_n=gn(pn,2),vn=_n.b,yn=_n.r;vn[28]=258,yn[258]=28;for(var bn=gn(mn,0).b,xn=new dn(32768),P=0;P<32768;++P){var Sn=(43690&P)>>1|(21845&P)<<1;Sn=(61680&(Sn=(52428&Sn)>>2|(13107&Sn)<<2))>>4|(3855&Sn)<<4,xn[P]=((65280&Sn)>>8|(255&Sn)<<8)>>1}var Cn=function(e,t,n){for(var r=e.length,i=0,a=new dn(t);i<r;++i)e[i]&&++a[e[i]-1];var o,s=new dn(t);for(i=1;i<t;++i)s[i]=s[i-1]+a[i-1]<<1;o=new dn(1<<t);var c=15-t;for(i=0;i<r;++i)if(e[i])for(var l=i<<4|e[i],u=t-e[i],d=s[e[i]-1]++<<u,f=d|(1<<u)-1;d<=f;++d)o[xn[d]>>c]=l;return o},wn=new N(288);for(P=0;P<144;++P)wn[P]=8;for(P=144;P<256;++P)wn[P]=9;for(P=256;P<280;++P)wn[P]=7;for(P=280;P<288;++P)wn[P]=8;var Tn=new N(32);for(P=0;P<32;++P)Tn[P]=5;var En=Cn(wn,9),Dn=Cn(Tn,5),On=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},kn=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(7&t)&n},An=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(7&t)},jn=function(e){return(e+7)/8|0},Mn=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new N(e.subarray(t,n))},Nn=[`unexpected EOF`,`invalid block type`,`invalid length/literal`,`invalid distance`,`stream finished`,`no stream handler`,,`no callback`,`invalid UTF-8 data`,`extra field too long`,`date not in range 1980-2099`,`filename too long`,`stream finishing`,`invalid zip data`],F=function(e,t,n){var r=Error(t||Nn[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,F),!n)throw r;return r},Pn=function(e,t,n,r){var i=e.length,a=r?r.length:0;if(!i||t.f&&!t.l)return n||new N(0);var o=!n,s=o||t.i!=2,c=t.i;o&&(n=new N(3*i));var l=function(e){var t=n.length;if(e>t){var r=new N(Math.max(2*t,e));r.set(n),n=r}},u=t.f||0,d=t.p||0,f=t.b||0,p=t.l,m=t.d,h=t.m,g=t.n,_=8*i;do{if(!p){u=kn(e,d,1);var v=kn(e,d+1,3);if(d+=3,!v){var ee=e[(x=jn(d)+4)-4]|e[x-3]<<8,y=x+ee;if(y>i){c&&F(0);break}s&&l(f+ee),n.set(e.subarray(x,y),f),t.b=f+=ee,t.p=d=8*y,t.f=u;continue}if(v==1)p=En,m=Dn,h=9,g=5;else if(v==2){var te=kn(e,d,31)+257,ne=kn(e,d+10,15)+4,re=te+kn(e,d+5,31)+1;d+=14;for(var ie=new N(re),ae=new N(19),b=0;b<ne;++b)ae[hn[b]]=kn(e,d+3*b,7);d+=3*ne;var oe=On(ae),se=(1<<oe)-1,ce=Cn(ae,oe);for(b=0;b<re;){var x,le=ce[kn(e,d,se)];if(d+=15&le,(x=le>>4)<16)ie[b++]=x;else{var ue=0,de=0;for(x==16?(de=3+kn(e,d,3),d+=2,ue=ie[b-1]):x==17?(de=3+kn(e,d,7),d+=3):x==18&&(de=11+kn(e,d,127),d+=7);de--;)ie[b++]=ue}}var fe=ie.subarray(0,te),S=ie.subarray(te);h=On(fe),g=On(S),p=Cn(fe,h),m=Cn(S,g)}else F(1);if(d>_){c&&F(0);break}}s&&l(f+131072);for(var pe=(1<<h)-1,me=(1<<g)-1,he=d;;he=d){var ge=(ue=p[An(e,d)&pe])>>4;if((d+=15&ue)>_){c&&F(0);break}if(ue||F(2),ge<256)n[f++]=ge;else{if(ge==256){he=d,p=null;break}var _e=ge-254;if(ge>264){var C=pn[b=ge-257];_e=kn(e,d,(1<<C)-1)+vn[b],d+=C}var ve=m[An(e,d)&me],ye=ve>>4;if(ve||F(3),d+=15&ve,S=bn[ye],ye>3&&(C=mn[ye],S+=An(e,d)&(1<<C)-1,d+=C),d>_){c&&F(0);break}s&&l(f+131072);var be=f+_e;if(f<S){var w=a-S,T=Math.min(S,be);for(w+f<0&&F(3);f<T;++f)n[f]=r[w+f]}for(;f<be;++f)n[f]=n[f-S]}}t.l=p,t.p=he,t.b=f,t.f=u,p&&(u=1,t.m=h,t.d=m,t.n=g)}while(!u);return f!=n.length&&o?Mn(n,0,f):n.subarray(0,f)},Fn=new N(0),In=function(e,t){return e[t]|e[t+1]<<8},Ln=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},Rn=function(e,t){return Ln(e,t)+4294967296*Ln(e,t+4)},zn=function(){function e(e,t){typeof e==`function`&&(t=e,e={}),this.ondata=t;var n=e&&e.dictionary&&e.dictionary.subarray(-32768);this.s={i:0,b:n?n.length:0},this.o=new N(32768),this.p=new N(0),n&&this.o.set(n)}return e.prototype.e=function(e){if(this.ondata||F(5),this.d&&F(4),this.p.length){if(e.length){var t=new N(this.p.length+e.length);t.set(this.p),t.set(e,this.p.length),this.p=t}}else this.p=e},e.prototype.c=function(e){this.s.i=+(this.d=e||!1);var t=this.s.b,n=Pn(this.p,this.s,this.o);this.ondata(Mn(n,t,this.s.b),this.d),this.o=Mn(n,this.s.b-32768),this.s.b=this.o.length,this.p=Mn(this.p,this.s.p/8|0),this.s.p&=7},e.prototype.push=function(e,t){this.e(e),this.c(t)},e}();function Bn(e,t){return Pn(e,{i:2},t&&t.out,t&&t.dictionary)}var Vn=function(){function e(e,t){this.v=1,this.r=0,zn.call(this,e,t)}return e.prototype.push=function(e,t){if(zn.prototype.e.call(this,e),this.r+=e.length,this.v){var n=this.p.subarray(this.v-1),r=n.length>3?function(e){e[0]==31&&e[1]==139&&e[2]==8||F(6,`invalid gzip data`);var t=e[3],n=10;4&t&&(n+=2+(e[10]|e[11]<<8));for(var r=(t>>3&1)+(t>>4&1);r>0;r-=!e[n++]);return n+(2&t)}(n):4;if(r>n.length){if(!t)return}else this.v>1&&this.onmember&&this.onmember(this.r-n.length);this.p=n.subarray(r),this.v=0}zn.prototype.c.call(this,t),!this.s.f||this.s.l||t||(this.v=jn(this.s.p)+9,this.s={i:0},this.o=new N(0),this.push(new N(0),t))},e}(),Hn=typeof TextDecoder<`u`&&new TextDecoder;try{Hn.decode(Fn,{stream:!0})}catch{}function Un(e,t){if(t){for(var n=``,r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}if(Hn)return Hn.decode(e);var i=function(e){for(var t=``,n=0;;){var r=e[n++],i=(r>127)+(r>223)+(r>239);if(n+i>e.length)return{s:t,r:Mn(e,n-1)};i?i==3?(r=((15&r)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536,t+=String.fromCharCode(55296|r>>10,56320|1023&r)):t+=1&i?String.fromCharCode((31&r)<<6|63&e[n++]):String.fromCharCode((15&r)<<12|(63&e[n++])<<6|63&e[n++]):t+=String.fromCharCode(r)}}(e),a=i.s;return(n=i.r).length&&F(8),a}var Wn=function(e,t){return t+30+In(e,t+26)+In(e,t+28)},Gn=function(e,t,n){var r=In(e,t+28),i=Un(e.subarray(t+46,t+46+r),!(2048&In(e,t+8))),a=t+46+r,o=Ln(e,t+20),s=n&&o==4294967295?Kn(e,a):[o,Ln(e,t+24),Ln(e,t+42)],c=s[0],l=s[1],u=s[2];return[In(e,t+10),c,l,i,a+In(e,t+30)+In(e,t+32),u]},Kn=function(e,t){for(;In(e,t)!=1;t+=4+In(e,t+2));return[Rn(e,t+12),Rn(e,t+4),Rn(e,t+20)]},qn=-12,Jn=Math.exp(-30),I=2048,Yn=2048,Xn=(e=>(e.PLY=`ply`,e.SPZ=`spz`,e.SPLAT=`splat`,e.KSPLAT=`ksplat`,e.PCSOGS=`pcsogs`,e.PCSOGSZIP=`pcsogszip`,e.RAD=`rad`,e))(Xn||{}),Zn={rgbMin:0,rgbMax:1,lnScaleMin:qn,lnScaleMax:9,sh1Max:1,sh2Max:1,sh3Max:1,lodOpacity:!1};function Qn(e){return e===`int`||e===`ivec2`||e===`ivec3`||e===`ivec4`}function $n(e){return e===`uint`||e===`uvec2`||e===`uvec3`||e===`uvec4`}function er(e){return function(e){return e===`float`||e===`vec2`||e===`vec3`||e===`vec4`}(e)||function(e){return e===`mat2`||e===`mat2x2`||e===`mat2x3`||e===`mat2x4`||e===`mat3`||e===`mat3x2`||e===`mat3x3`||e===`mat3x4`||e===`mat4`||e===`mat4x2`||e===`mat4x3`||e===`mat4x4`}(e)}function tr(e){return e===`mat2`||e===`mat2x2`}function nr(e){return e===`mat3`||e===`mat3x3`}function rr(e){return e===`mat4`||e===`mat4x4`}function L(e){return Math.trunc(e).toString()}function R(e){return`${Math.max(0,Math.trunc(e)).toString()}u`}function z(e){return e===1/0?`INFINITY`:e===-1/0?`-INFINITY`:Number.isInteger(e)?e.toFixed(1):e.toString()}function ir(e){return e instanceof ar?e.type:e.dynoOut().type}var ar=class{constructor(e){this.__isDynoValue=!0,this.type=e}},B=class extends ar{constructor(e,t){super(e.outTypes[t]),this.dyno=e,this.key=t}},or=class extends ar{constructor(e,t){super(e),this.literal=t}getLiteral(){return this.literal}},sr=class extends or{constructor(e,t){super(e,``),this.value=t}getLiteral(){let{type:e,value:n}=this;switch(e){case`bool`:return n?`true`:`false`;case`uint`:return R(n);case`int`:return L(n);case`float`:return z(n);case`bvec2`:{let e=n;return`bvec2(${e[0]}, ${e[1]})`}case`uvec2`:{if(n instanceof t)return`uvec2(${R(n.x)}, ${R(n.y)})`;let e=n;return`uvec2(${R(e[0])}, ${R(e[1])})`}case`ivec2`:{if(n instanceof t)return`ivec2(${L(n.x)}, ${L(n.y)})`;let e=n;return`ivec2(${L(e[0])}, ${L(e[1])})`}case`vec2`:{if(n instanceof t)return`vec2(${z(n.x)}, ${z(n.y)})`;let e=n;return`vec2(${z(e[0])}, ${z(e[1])})`}case`bvec3`:{let e=n;return`bvec3(${e[0]}, ${e[1]}, ${e[2]})`}case`uvec3`:{if(n instanceof k)return`uvec3(${R(n.x)}, ${R(n.y)}, ${R(n.z)})`;let e=n;return`uvec3(${R(e[0])}, ${R(e[1])}, ${R(e[2])})`}case`ivec3`:{if(n instanceof k)return`ivec3(${L(n.x)}, ${L(n.y)}, ${L(n.z)})`;let e=n;return`ivec3(${L(e[0])}, ${L(e[1])}, ${L(e[2])})`}case`vec3`:{if(n instanceof k)return`vec3(${z(n.x)}, ${z(n.y)}, ${z(n.z)})`;let e=n;return`vec3(${z(e[0])}, ${z(e[1])}, ${z(e[2])})`}case`bvec4`:{let e=n;return`bvec4(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`}case`uvec4`:{if(n instanceof j)return`uvec4(${R(n.x)}, ${R(n.y)}, ${R(n.z)}, ${R(n.w)})`;let e=n;return`uvec4(${R(e[0])}, ${R(e[1])}, ${R(e[2])}, ${R(e[3])})`}case`ivec4`:{if(n instanceof j)return`ivec4(${L(n.x)}, ${L(n.y)}, ${L(n.z)}, ${L(n.w)})`;let e=n;return`ivec4(${L(e[0])}, ${L(e[1])}, ${L(e[2])}, ${L(e[3])})`}case`vec4`:{if(n instanceof j||n instanceof E)return`vec4(${z(n.x)}, ${z(n.y)}, ${z(n.z)}, ${z(n.w)})`;let e=n;return`vec4(${z(e[0])}, ${z(e[1])}, ${z(e[2])}, ${z(e[3])})`}case`mat2`:case`mat2x2`:{let t=n,r=t instanceof ot?t.elements:n;return`${e}(${[,,,,].fill(0).map((e,t)=>z(r[t])).join(`, `)})`}case`mat2x3`:{let t=n;return`${e}(${[,,,,,,].fill(0).map((e,n)=>z(t[n])).join(`, `)})`}case`mat2x4`:{let t=n;return`${e}(${Array(8).fill(0).map((e,n)=>z(t[n])).join(`, `)})`}case`mat3`:case`mat3x3`:{let t=n,r=t instanceof Qe?t.elements:n;return`${e}(${Array(9).fill(0).map((e,t)=>z(r[t])).join(`, `)})`}case`mat3x2`:{let t=n;return`${e}(${[,,,,,,].fill(0).map((e,n)=>z(t[n])).join(`, `)})`}case`mat3x4`:{let t=n;return`${e}(${Array(12).fill(0).map((e,n)=>z(t[n])).join(`, `)})`}case`mat4`:case`mat4x4`:{let t=n,r=t instanceof A?t.elements:n;return`${e}(${Array(16).fill(0).map((e,t)=>z(r[t])).join(`, `)})`}case`mat4x2`:{let t=n;return`${e}(${Array(8).fill(0).map((e,n)=>z(t[n])).join(`, `)})`}case`mat4x3`:{let t=n;return`${e}(${Array(12).fill(0).map((e,n)=>z(t[n])).join(`, `)})`}default:throw Error(`Type not implemented: ${String(e)}`)}}};function V(e,t){return new sr(e,t)}function cr(e){let t=String(e);if(function(e){return e===`bool`||e===`bvec2`||e===`bvec3`||e===`bvec4`}(e))return`${t}(false)`;if(er(e))return`${t}(0.0)`;if(Qn(e))return`${t}(0)`;if($n(e))return`${t}(0u)`;throw Error(`Type not implemented: ${t}`)}var lr=`    `,ur=class{constructor({indent:e}={}){this.globals=new Set,this.statements=[],this.uniforms={},this.declares=new Set,this.updaters=[],this.sequence=0,this.indent=lr,this.indent=e??lr}nextSequence(){return this.sequence++}},H=class{constructor({inTypes:e,outTypes:t,inputs:n,update:r,globals:i,statements:a,generate:o}){this.inTypes=e??{},this.outTypes=t??{},this.inputs=n??{},this.update=r,this.globals=i,this.statements=a,this.generate=o??(({inputs:e,outputs:t,compile:n})=>({globals:this.globals?.({inputs:e,outputs:t,compile:n}),statements:this.statements?.({inputs:e,outputs:t,compile:n})}))}get outputs(){let e={};for(let t in this.outTypes)e[t]=new B(this,t);return e}apply(e){return Object.assign(this.inputs,e),this.outputs}compile({inputs:e,outputs:t,compile:n}){let r=[`// ${this.constructor.name}(${Object.values(e).join(`, `)}) => (${Object.values(t).join(`, `)})`],i=[];for(let e in t){let r=t[e];r&&!n.declares.has(r)&&(n.declares.add(r),i.push(e))}let{globals:a,statements:o,uniforms:s}=this.generate({inputs:e,outputs:t,compile:n});for(let e of a??[])n.globals.add(e);for(let e in s)n.uniforms[e]=s[e];this.update&&n.updaters.push(this.update);for(let e of i){let i=t[e];i&&(n.uniforms[i]||r.push(`${pr(i,this.outTypes[e])};`))}return o?.length&&(r.push(`{`),r.push(...o.map(e=>n.indent+e)),r.push(`}`)),r}},dr=class extends H{constructor({inTypes:e,outTypes:t,inputs:n,update:r,globals:i,construct:a}){super({inTypes:e,outTypes:t,inputs:n,update:r,globals:i,generate:e=>this.generateBlock(e)}),this.construct=a}generateBlock({inputs:e,outputs:t,compile:n}){let r={},i={};for(let t in e)e[t]!=null&&(r[t]=new or(this.inTypes[t],e[t]));for(let e in t)t[e]!=null&&(i[e]=new ar(this.outTypes[e]));let a={roots:[]},o=this.construct(r,i,a);for(let r of this.globals?.({inputs:e,outputs:t,compile:n})??[])n.globals.add(r);let s=[],c=new Map;function l(e,t,r){let i=c.get(e);if(!i){i={sequence:n.nextSequence(),outNames:new Map,newOuts:new Set},c.set(e,i);for(let t in e.inputs){let n=e.inputs[t];for(;n;){if(n instanceof ar){n instanceof B&&l(n.dyno,n.key);break}if(typeof n.dynoOut!=`function`)throw Error(`dynoOut is not a function for ${n.constructor.name}`);n=n.dynoOut()}}s.push(e)}t&&(r||i.newOuts.add(t),i.outNames.set(t,r??`${t}_${i.sequence}`))}for(let e of a.roots)l(e);for(let e in i){let n=o?.[e]??i[e];for(;n;){if(n instanceof ar){n instanceof B&&l(n.dyno,n.key,t[e]);break}n=n.dynoOut()}i[e]=n}let u=[];for(let e of s){let t={},r={};for(let n in e.inputs){let r=e.inputs[n];for(;r;){if(r instanceof ar){if(r instanceof or)t[n]=r.getLiteral();else if(r instanceof B){let e=c.get(r.dyno)?.outNames.get(r.key);if(!e)throw Error(`Source not found for ${r.dyno.constructor.name}.${r.key}`);t[n]=e}break}r=r.dynoOut()}}let i=c.get(e)??{outNames:new Map};for(let[e,t]of i.outNames.entries())r[e]=t;let a=e.compile({inputs:t,outputs:r,compile:n});u.push(a)}let d=[];for(let e in t)i[e]instanceof or&&d.push(`${t[e]} = ${i[e].getLiteral()};`);return d.length>0&&u.push(d),{statements:u.flatMap((e,t)=>t===0?e:[``,...e])}}};function U(e,t,n,{update:r,globals:i}={}){return new dr({inTypes:e,outTypes:t,construct:n,update:r,globals:i})}function fr({inTypes:e,outTypes:t,inputs:n,update:r,globals:i,statements:a,generate:o}){return new H({inTypes:e,outTypes:t,inputs:n,update:r,globals:i,statements:a,generate:o})}function pr(e,t,n){let r=typeof t==`string`?t:t.type;if(!r)throw Error(`Invalid DynoType: ${String(t)}`);return`${r} ${e}${n==null?``:`[${n}]`}`}function W(e){let t=!1,n=e.split(`
`).map(e=>{let n=e.trimEnd();return t?n:n.length>0?(t=!0,n):null}).filter(e=>e!=null);for(;n.length>0&&n[n.length-1].length===0;)n.pop();if(n.length===0)return[];let r=n[0].match(/^\s*/)?.[0];if(!r)return n;let i=RegExp(`^${r}`);return n.map(e=>e.replace(i,``))}function G(e){return W(e).join(`
`)}var mr=class extends H{constructor({a:e,outKey:t,outTypeFunc:n}){let r={a:ir(e)},i=n(ir(e));super({inTypes:r,outTypes:{[t]:i},inputs:{a:e}}),this.outKey=t}dynoOut(){return new B(this,this.outKey)}},hr=class extends H{constructor({a:e,b:t,outKey:n,outTypeFunc:r}){let i={a:ir(e),b:ir(t)},a=r(ir(e),ir(t));super({inTypes:i,outTypes:{[n]:a},inputs:{a:e,b:t}}),this.outKey=n}dynoOut(){return new B(this,this.outKey)}},gr=class extends H{constructor({a:e,b:t,c:n,outKey:r,outTypeFunc:i}){let a={a:ir(e),b:ir(t),c:ir(n)},o=i(ir(e),ir(t),ir(n));super({inTypes:a,outTypes:{[r]:o},inputs:{a:e,b:t,c:n}}),this.outKey=r}dynoOut(){return new B(this,this.outKey)}},_r=Number.parseInt(`185`)>=179,vr=new Float32Array(1),yr=new Uint32Array(vr.buffer),br=`Float16Array`in globalThis,xr=br?new globalThis.Float16Array(1):null,Sr=new Uint16Array(xr?.buffer);function Cr(e){return vr[0]=e,yr[0]}function wr(e){return yr[0]=e,vr[0]}var Tr=br?function(e){return xr[0]=e,Sr[0]}:function(e){vr[0]=e;let t=yr[0],n=t>>23&255,r=8388607&t,i=(t>>31&1)<<15;if(n===255)return r===0?31744|i:32767|i;let a=n-127+15;return a>=31?31744|i:a<=0?a<-10?i:i|(8388608|r)>>1-a+13:i|a<<10|r>>13},Er=br?function(e){return Sr[0]=e,xr[0]}:function(e){let t=e>>15&1,n=e>>10&31,r=1023&e,i;if(n===0)if(r===0)i=t<<31;else{let e=r,n=-14;for(;!(1024&e);)e<<=1,n--;e&=1023,i=t<<31|n+127<<23|e<<13}else i=n===31?r===0?t<<31|2139095040:t<<31|2143289344:t<<31|n-15+127<<23|r<<13;return yr[0]=i,vr[0]};function Dr(e){return Math.max(0,Math.min(255,Math.round(255*e)))}function Or(e){let t=[],n=new Set;return function e(r){r&&typeof r==`object`&&!n.has(r)&&(n.add(r),r instanceof ArrayBuffer||r instanceof ReadableStream||r instanceof WritableStream?t.push(r):ArrayBuffer.isView(r)?t.push(r.buffer):Array.isArray(r)?r.forEach(e):Object.values(r).forEach(e))}(e),t}var kr=class{constructor({allocate:e,dispose:t,valid:n}){this.items=[],this.allocate=e,this.dispose=t,this.valid=n}alloc(e){for(;;){let t=this.items.pop();if(!t)break;if(this.valid(t,e))return t;this.dispose&&this.dispose(t)}return this.allocate(e)}free(e){this.items.push(e)}disposeAll(){let e;for(e=this.items.pop();e;)this.dispose&&this.dispose(e),e=this.items.pop()}};function Ar(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=4*t,[_,v]=e;_[g]=Cr(n),_[g+1]=Cr(r),_[g+2]=Cr(i),_[g+3]=Tr(f),v[g]=Tr(p)|Tr(m)<<16,v[g+1]=Tr(h)|Tr(Math.log(a))<<16,v[g+2]=Tr(Math.log(o))|Tr(Math.log(s))<<16,v[g+3]=function(e,t,n,r){let i=Math.sqrt(e*e+t*t+n*n+r*r),a=(r<0?-e:e)/i,o=(r<0?-t:t)/i,s=(r<0?-n:n)/i,c=(r<0?-r:r)/i,l=2*Math.acos(c),u=Math.sqrt(a*a+o*o+s*s),d=u<1e-6?1:a/u,f=u<1e-6?0:o/u,p=u<1e-6?0:s/u,m=Math.abs(d)+Math.abs(f)+Math.abs(p),h=d/m,g=f/m;if(p<0){let e=h;h=(1-Math.abs(g))*(h>=0?1:-1),g=(1-Math.abs(e))*(g>=0?1:-1)}let _=.5*h+.5,v=.5*g+.5,ee=Math.round(1023*_),y=Math.round(1023*v);return Math.round(4095/Math.PI*l)<<20|y<<10|ee}(c,l,u,d)}function jr(e,t){let n=Pr,r=4*t,[i,a]=e;return n.center.x=wr(i[r]),n.center.y=wr(i[r+1]),n.center.z=wr(i[r+2]),n.opacity=Er(65535&i[r+3]),n.color.r=Er(65535&a[r]),n.color.g=Er(a[r]>>>16),n.color.b=Er(65535&a[r+1]),n.scales.x=Math.exp(Er(a[r+1]>>>16)),n.scales.y=Math.exp(Er(65535&a[r+2])),n.scales.z=Math.exp(Er(a[r+2]>>>16)),function(e,t){let n=e>>>20&4095,r=2*((1023&e)/1023-.5),i=2*((e>>>10&1023)/1023-.5),a=1-(Math.abs(r)+Math.abs(i)),o=Math.max(-a,0);r+=r>=0?-o:o,i+=i>=0?-o:o;let s=Math.sqrt(r*r+i*i+a*a),c=s<1e-6?0:r/s,l=s<1e-6?0:i/s,u=s<1e-6?0:a/s,d=n/4095*Math.PI*.5,f=Math.sin(d),p=Math.cos(d);t.set(c*f,l*f,u*f,p)}(a[r+3],n.quaternion),n}function Mr(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){let _=g?.rgbMin??0,v=(g?.rgbMax??1)-_,ee=Dr((p-_)/v),y=Dr((m-_)/v),te=Dr((h-_)/v),ne=Dr(g?.lodOpacity?.5*f:f),re=function(e){let t=Vr.copy(e).normalize();t.w<0&&t.set(-t.x,-t.y,-t.z,-t.w);let n=2*Math.acos(t.w),r=Math.sqrt(t.x*t.x+t.y*t.y+t.z*t.z),i=r<1e-6?Hr.set(1,0,0):Hr.set(t.x,t.y,t.z).divideScalar(r),a=Math.abs(i.x)+Math.abs(i.y)+Math.abs(i.z),o=i.x/a,s=i.y/a;if(i.z<0){let e=o;o=(1-Math.abs(s))*(o>=0?1:-1),s=(1-Math.abs(e))*(s>=0?1:-1)}let c=.5*o+.5,l=.5*s+.5,u=Math.round(255*c),d=Math.round(255*l);return Math.round(255/Math.PI*n)<<16|d<<8|u}(Nr.set(c,l,u,d)),ie=255&re,ae=re>>>8&255,b=re>>>16&255,oe=g?.lnScaleMin??qn,se=254/((g?.lnScaleMax??9)-oe),ce=a<Jn?0:Math.min(255,Math.max(1,Math.round((Math.log(a)-oe)*se)+1)),x=o<Jn?0:Math.min(255,Math.max(1,Math.round((Math.log(o)-oe)*se)+1)),le=s<Jn?0:Math.min(255,Math.max(1,Math.round((Math.log(s)-oe)*se)+1)),ue=Tr(n),de=Tr(r),fe=Tr(i),S=4*t;e[S]=ee|y<<8|te<<16|ne<<24,e[S+1]=ue|de<<16,e[S+2]=fe|ie<<16|ae<<24,e[S+3]=ce|x<<8|le<<16|b<<24}var Nr=new E,Pr={center:new k,scales:new k,quaternion:new E,color:new w,opacity:0};function Fr(e,t,n){let r=Pr,i=4*t,a=e[i],o=e[i+1],s=e[i+2],c=e[i+3],l=n?.rgbMin??0,u=(n?.rgbMax??1)-l;r.color.set(l+(255&a)/255*u,l+(a>>>8&255)/255*u,l+(a>>>16&255)/255*u),r.opacity=(a>>>24&255)/255,n?.lodOpacity&&(r.opacity=2*r.opacity),r.center.set(Er(65535&o),Er(o>>>16&65535),Er(65535&s));let d=n?.lnScaleMin??qn,f=((n?.lnScaleMax??9)-d)/254,p=255&c;r.scales.x=p===0?0:Math.exp(d+(p-1)*f);let m=c>>>8&255;r.scales.y=m===0?0:Math.exp(d+(m-1)*f);let h=c>>>16&255;return r.scales.z=h===0?0:Math.exp(d+(h-1)*f),function(e,t){let n=e>>>16&255,r=2*((255&e)/255-.5),i=2*((e>>>8&255)/255-.5),a=1-(Math.abs(r)+Math.abs(i)),o=Math.max(-a,0);r+=r>=0?-o:o,i+=i>=0?-o:o;let s=Hr.set(r,i,a).normalize(),c=n/255*Math.PI*.5,l=Math.sin(c),u=Math.cos(c);t.set(s.x*l,s.y*l,s.z*l,u)}(s>>>16&65535|c>>>8&16711680,r.quaternion),r}function K(e){let t=I,n=Math.max(1,Math.min(Yn,Math.ceil(e/t))),r=Math.ceil(e/(t*n));return{width:t,height:n,depth:r,maxSplats:t*n*r}}function Ir(){return!navigator.platform.toLowerCase().startsWith(`win`)&&(navigator.maxTouchPoints>0||/Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/.test(navigator.userAgent))}function Lr(){return/iPhone|iPad/.test(navigator.userAgent)}function Rr(e){let t=new te(e.autoStart);return t.startTime=e.startTime,t.oldTime=e.oldTime,t.elapsedTime=e.elapsedTime,t.running=e.running,t}var zr=G(`
  precision highp float;

  in vec3 position;

  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`);function Br({matrix1:e,matrix2:t,maxDistance:n,minCoorient:r}){let{distance:i,coorient:a}=function(e,t){let[n,r]=[new k,new E],[i,a]=[new k,new E];return e.decompose(n,r,new k),t.decompose(i,a,new k),{distance:n.distanceTo(i),coorient:Math.abs(r.dot(a))}}(e,t);return i<=n&&(r==null||a>=r)}var Vr=new E,Hr=new k,Ur=class{constructor(){this.messages={},this.messageIdNext=0,this.worker=new un,this.worker.onmessage=e=>this.onMessage(e)}makeMessageId(){return++this.messageIdNext}makeMessagePromiseId(){let e=this.makeMessageId();return{id:e,promise:new Promise((t,n)=>{this.messages[e]={resolve:t,reject:n}})}}onMessage(e){let{id:t,result:n,error:r}=e.data,i=this.messages[t];i&&(delete this.messages[t],r?i.reject(r):i.resolve(n))}async call(e,t){let{id:n,promise:r}=this.makeMessagePromiseId();return this.worker.postMessage({name:e,args:t,id:n},{transfer:Or(t)}),r}},Wr=0,Gr=[],Kr=[];async function qr(e){let t=await async function(){let e=Gr.shift();if(e)return e;if(Wr<4){let e=new Ur;return Wr+=1,e}return new Promise(e=>{Kr.push(e)})}();try{return await e(t)}finally{(function(e){if(Wr>4)return void--Wr;let t=Kr.shift();t?t(e):Gr.push(e)})(t)}}var Jr=new f(-1,1,1,-1,0,1),Yr=new class extends We{constructor(){super(),this.setAttribute(`position`,new le([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new le([0,2,0,0,2,0],2))}},Xr=class{constructor(e){this._mesh=new Ue(Yr,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Jr)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Zr=`(function() {
  "use strict";
  let wasm;
  const cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {
    throw Error("TextDecoder not available");
  } };
  if (typeof TextDecoder !== "undefined") {
    cachedTextDecoder.decode();
  }
  let cachedUint8ArrayMemory0 = null;
  function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
      cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
  }
  function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
  }
  function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_3.set(idx, obj);
    return idx;
  }
  function handleError(f, args) {
    try {
      return f.apply(this, args);
    } catch (e) {
      const idx = addToExternrefTable0(e);
      wasm.__wbindgen_exn_store(idx);
    }
  }
  let WASM_VECTOR_LEN = 0;
  const cachedTextEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder("utf-8") : { encode: () => {
    throw Error("TextEncoder not available");
  } };
  const encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
  } : function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
  function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === void 0) {
      const buf = cachedTextEncoder.encode(arg);
      const ptr2 = malloc(buf.length, 1) >>> 0;
      getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
      WASM_VECTOR_LEN = buf.length;
      return ptr2;
    }
    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;
    const mem = getUint8ArrayMemory0();
    let offset = 0;
    for (; offset < len; offset++) {
      const code = arg.charCodeAt(offset);
      if (code > 127) break;
      mem[ptr + offset] = code;
    }
    if (offset !== len) {
      if (offset !== 0) {
        arg = arg.slice(offset);
      }
      ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
      const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
      const ret = encodeString(arg, view);
      offset += ret.written;
      ptr = realloc(ptr, len, offset, 1) >>> 0;
    }
    WASM_VECTOR_LEN = offset;
    return ptr;
  }
  let cachedDataViewMemory0 = null;
  function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
      cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
  }
  function debugString(val) {
    const type = typeof val;
    if (type == "number" || type == "boolean" || val == null) {
      return \`\${val}\`;
    }
    if (type == "string") {
      return \`"\${val}"\`;
    }
    if (type == "symbol") {
      const description = val.description;
      if (description == null) {
        return "Symbol";
      } else {
        return \`Symbol(\${description})\`;
      }
    }
    if (type == "function") {
      const name = val.name;
      if (typeof name == "string" && name.length > 0) {
        return \`Function(\${name})\`;
      } else {
        return "Function";
      }
    }
    if (Array.isArray(val)) {
      const length = val.length;
      let debug = "[";
      if (length > 0) {
        debug += debugString(val[0]);
      }
      for (let i = 1; i < length; i++) {
        debug += ", " + debugString(val[i]);
      }
      debug += "]";
      return debug;
    }
    const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
      className = builtInMatches[1];
    } else {
      return toString.call(val);
    }
    if (className == "Object") {
      try {
        return "Object(" + JSON.stringify(val) + ")";
      } catch (_) {
        return "Object";
      }
    }
    if (val instanceof Error) {
      return \`\${val.name}: \${val.message}
\${val.stack}\`;
    }
    return className;
  }
  function isLikeNone(x) {
    return x === void 0 || x === null;
  }
  function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_3.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
  }
  function tiny_lod_packedsplats(num_splats, packed, extra, lod_base, merge_filter, rgba, encoding) {
    const ret = wasm.tiny_lod_packedsplats(num_splats, packed, isLikeNone(extra) ? 0 : addToExternrefTable0(extra), lod_base, merge_filter, isLikeNone(rgba) ? 0 : addToExternrefTable0(rgba), encoding);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  function bhatt_lod_packedsplats(num_splats, packed, extra, lod_base, rgba, encoding) {
    const ret = wasm.bhatt_lod_packedsplats(num_splats, packed, isLikeNone(extra) ? 0 : addToExternrefTable0(extra), lod_base, isLikeNone(rgba) ? 0 : addToExternrefTable0(rgba), encoding);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  function tiny_lod_extsplats(num_splats, ext1, ext2, extra, lod_base, merge_filter, rgba) {
    const ret = wasm.tiny_lod_extsplats(num_splats, ext1, ext2, isLikeNone(extra) ? 0 : addToExternrefTable0(extra), lod_base, merge_filter, isLikeNone(rgba) ? 0 : addToExternrefTable0(rgba));
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  function bhatt_lod_extsplats(num_splats, ext1, ext2, extra, lod_base, rgba) {
    const ret = wasm.bhatt_lod_extsplats(num_splats, ext1, ext2, isLikeNone(extra) ? 0 : addToExternrefTable0(extra), lod_base, isLikeNone(rgba) ? 0 : addToExternrefTable0(rgba));
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  function sort_splats(num_splats, readback, ordering) {
    const ret = wasm.sort_splats(num_splats, readback, ordering);
    return ret >>> 0;
  }
  function sort32_splats(num_splats, readback, ordering) {
    const ret = wasm.sort32_splats(num_splats, readback, ordering);
    return ret >>> 0;
  }
  function decode_to_gsplatarray(file_type, path_name) {
    var ptr0 = isLikeNone(file_type) ? 0 : passStringToWasm0(file_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(path_name) ? 0 : passStringToWasm0(path_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.decode_to_gsplatarray(ptr0, len0, ptr1, len1);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ChunkDecoder.__wrap(ret[0]);
  }
  function decode_to_csplatarray(file_type, path_name, encoding) {
    var ptr0 = isLikeNone(file_type) ? 0 : passStringToWasm0(file_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(path_name) ? 0 : passStringToWasm0(path_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.decode_to_csplatarray(ptr0, len0, ptr1, len1, encoding);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ChunkDecoder.__wrap(ret[0]);
  }
  function decode_to_packedsplats(file_type, path_name, encoding) {
    var ptr0 = isLikeNone(file_type) ? 0 : passStringToWasm0(file_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(path_name) ? 0 : passStringToWasm0(path_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.decode_to_packedsplats(ptr0, len0, ptr1, len1, encoding);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ChunkDecoder.__wrap(ret[0]);
  }
  function decode_to_extsplats(file_type, path_name) {
    var ptr0 = isLikeNone(file_type) ? 0 : passStringToWasm0(file_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(path_name) ? 0 : passStringToWasm0(path_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.decode_to_extsplats(ptr0, len0, ptr1, len1);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ChunkDecoder.__wrap(ret[0]);
  }
  function new_lod_tree(capacity) {
    const ret = wasm.new_lod_tree(capacity);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  function new_shared_lod_tree(orig_lod_id) {
    const ret = wasm.new_shared_lod_tree(orig_lod_id);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  function init_lod_tree(num_splats, lod_tree) {
    const ret = wasm.init_lod_tree(num_splats, lod_tree);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  function dispose_lod_tree(lod_id) {
    wasm.dispose_lod_tree(lod_id);
  }
  let cachedUint32ArrayMemory0 = null;
  function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
      cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
  }
  function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
  }
  function update_lod_trees(lod_ids, page_bases, chunk_bases, counts, lod_trees) {
    const ptr0 = passArray32ToWasm0(lod_ids, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray32ToWasm0(page_bases, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArray32ToWasm0(chunk_bases, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    const ptr3 = passArray32ToWasm0(counts, wasm.__wbindgen_malloc);
    const len3 = WASM_VECTOR_LEN;
    const ret = wasm.update_lod_trees(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, lod_trees);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  let cachedFloat32ArrayMemory0 = null;
  function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
      cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
  }
  function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
  }
  function get_lod_tree_level(lod_id, level) {
    const ret = wasm.get_lod_tree_level(lod_id, level);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  function new_traverse_lod_trees(max_splats, pixel_scale_limit, last_pixel_limit, lod_ids, root_pages, view_to_objects, lod_scales, behind_foveates, cone_foveates, cone_fov0s, cone_fovs) {
    const ptr0 = passArray32ToWasm0(lod_ids, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray32ToWasm0(root_pages, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArrayF32ToWasm0(view_to_objects, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    const ptr3 = passArrayF32ToWasm0(lod_scales, wasm.__wbindgen_malloc);
    const len3 = WASM_VECTOR_LEN;
    const ptr4 = passArrayF32ToWasm0(behind_foveates, wasm.__wbindgen_malloc);
    const len4 = WASM_VECTOR_LEN;
    const ptr5 = passArrayF32ToWasm0(cone_foveates, wasm.__wbindgen_malloc);
    const len5 = WASM_VECTOR_LEN;
    const ptr6 = passArrayF32ToWasm0(cone_fov0s, wasm.__wbindgen_malloc);
    const len6 = WASM_VECTOR_LEN;
    const ptr7 = passArrayF32ToWasm0(cone_fovs, wasm.__wbindgen_malloc);
    const len7 = WASM_VECTOR_LEN;
    const ret = wasm.new_traverse_lod_trees(max_splats, pixel_scale_limit, isLikeNone(last_pixel_limit) ? 4294967297 : Math.fround(last_pixel_limit), ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  const ChunkDecoderFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
  }, unregister: () => {
  } } : new FinalizationRegistry((ptr) => wasm.__wbg_chunkdecoder_free(ptr >>> 0, 1));
  class ChunkDecoder {
    static __wrap(ptr) {
      ptr = ptr >>> 0;
      const obj = Object.create(ChunkDecoder.prototype);
      obj.__wbg_ptr = ptr;
      ChunkDecoderFinalization.register(obj, obj.__wbg_ptr, obj);
      return obj;
    }
    __destroy_into_raw() {
      const ptr = this.__wbg_ptr;
      this.__wbg_ptr = 0;
      ChunkDecoderFinalization.unregister(this);
      return ptr;
    }
    free() {
      const ptr = this.__destroy_into_raw();
      wasm.__wbg_chunkdecoder_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} bytes
     */
    push(bytes) {
      const ret = wasm.chunkdecoder_push(this.__wbg_ptr, bytes);
      if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
      }
    }
    /**
     * @returns {any}
     */
    finish() {
      const ptr = this.__destroy_into_raw();
      const ret = wasm.chunkdecoder_finish(ptr);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
  }
  const CsplatArrayFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
  }, unregister: () => {
  } } : new FinalizationRegistry((ptr) => wasm.__wbg_csplatarray_free(ptr >>> 0, 1));
  class CsplatArray {
    static __wrap(ptr) {
      ptr = ptr >>> 0;
      const obj = Object.create(CsplatArray.prototype);
      obj.__wbg_ptr = ptr;
      CsplatArrayFinalization.register(obj, obj.__wbg_ptr, obj);
      return obj;
    }
    __destroy_into_raw() {
      const ptr = this.__wbg_ptr;
      this.__wbg_ptr = 0;
      CsplatArrayFinalization.unregister(this);
      return ptr;
    }
    free() {
      const ptr = this.__destroy_into_raw();
      wasm.__wbg_csplatarray_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get numSplats() {
      const ret = wasm.__wbg_get_csplatarray_numSplats(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set numSplats(arg0) {
      wasm.__wbg_set_csplatarray_numSplats(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get maxShDegree() {
      const ret = wasm.__wbg_get_csplatarray_maxShDegree(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set maxShDegree(arg0) {
      wasm.__wbg_set_csplatarray_maxShDegree(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Uint8Array} rgba
     */
    inject_rgba8(rgba) {
      wasm.csplatarray_inject_rgba8(this.__wbg_ptr, rgba);
    }
    /**
     * @returns {object}
     */
    to_extsplats() {
      const ret = wasm.csplatarray_to_extsplats(this.__wbg_ptr);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {object}
     */
    to_packedsplats() {
      const ret = wasm.csplatarray_to_packedsplats(this.__wbg_ptr);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {object}
     */
    to_extsplats_lod() {
      const ret = wasm.csplatarray_to_extsplats_lod(this.__wbg_ptr);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {object}
     */
    to_packedsplats_lod() {
      const ret = wasm.csplatarray_to_packedsplats_lod(this.__wbg_ptr);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {number}
     */
    len() {
      const ret = wasm.csplatarray_len(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    has_lod() {
      const ret = wasm.csplatarray_has_lod(this.__wbg_ptr);
      return ret !== 0;
    }
    /**
     * @param {number} lod_base
     * @param {boolean} merge_filter
     */
    tiny_lod(lod_base, merge_filter) {
      wasm.csplatarray_tiny_lod(this.__wbg_ptr, lod_base, merge_filter);
    }
    /**
     * @param {number} lod_base
     */
    bhatt_lod(lod_base) {
      wasm.csplatarray_bhatt_lod(this.__wbg_ptr, lod_base);
    }
  }
  const GsplatArrayFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
  }, unregister: () => {
  } } : new FinalizationRegistry((ptr) => wasm.__wbg_gsplatarray_free(ptr >>> 0, 1));
  class GsplatArray {
    static __wrap(ptr) {
      ptr = ptr >>> 0;
      const obj = Object.create(GsplatArray.prototype);
      obj.__wbg_ptr = ptr;
      GsplatArrayFinalization.register(obj, obj.__wbg_ptr, obj);
      return obj;
    }
    __destroy_into_raw() {
      const ptr = this.__wbg_ptr;
      this.__wbg_ptr = 0;
      GsplatArrayFinalization.unregister(this);
      return ptr;
    }
    free() {
      const ptr = this.__destroy_into_raw();
      wasm.__wbg_gsplatarray_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get numSplats() {
      const ret = wasm.__wbg_get_gsplatarray_numSplats(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set numSplats(arg0) {
      wasm.__wbg_set_gsplatarray_numSplats(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get maxShDegree() {
      const ret = wasm.__wbg_get_gsplatarray_maxShDegree(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set maxShDegree(arg0) {
      wasm.__wbg_set_gsplatarray_maxShDegree(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Uint8Array} rgba
     */
    inject_rgba8(rgba) {
      wasm.gsplatarray_inject_rgba8(this.__wbg_ptr, rgba);
    }
    /**
     * @returns {object}
     */
    to_extsplats() {
      const ret = wasm.gsplatarray_to_extsplats(this.__wbg_ptr);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {any} encoding
     * @returns {object}
     */
    to_packedsplats(encoding) {
      const ret = wasm.gsplatarray_to_packedsplats(this.__wbg_ptr, encoding);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {object}
     */
    to_extsplats_lod() {
      const ret = wasm.gsplatarray_to_extsplats_lod(this.__wbg_ptr);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {any} encoding
     * @returns {object}
     */
    to_packedsplats_lod(encoding) {
      const ret = wasm.gsplatarray_to_packedsplats_lod(this.__wbg_ptr, encoding);
      if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
      }
      return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {number}
     */
    len() {
      const ret = wasm.gsplatarray_len(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    has_lod() {
      const ret = wasm.csplatarray_has_lod(this.__wbg_ptr);
      return ret !== 0;
    }
    /**
     * @param {number} lod_base
     * @param {boolean} merge_filter
     */
    tiny_lod(lod_base, merge_filter) {
      wasm.gsplatarray_tiny_lod(this.__wbg_ptr, lod_base, merge_filter);
    }
    /**
     * @param {number} lod_base
     */
    bhatt_lod(lod_base) {
      wasm.gsplatarray_bhatt_lod(this.__wbg_ptr, lod_base);
    }
  }
  async function __wbg_load(module, imports) {
    if (typeof Response === "function" && module instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === "function") {
        try {
          return await WebAssembly.instantiateStreaming(module, imports);
        } catch (e) {
          if (module.headers.get("Content-Type") != "application/wasm") {
            console.warn("\`WebAssembly.instantiateStreaming\` failed because your server does not serve Wasm with \`application/wasm\` MIME type. Falling back to \`WebAssembly.instantiate\` which is slower. Original error:\\n", e);
          } else {
            throw e;
          }
        }
      }
      const bytes = await module.arrayBuffer();
      return await WebAssembly.instantiate(bytes, imports);
    } else {
      const instance = await WebAssembly.instantiate(module, imports);
      if (instance instanceof WebAssembly.Instance) {
        return { instance, module };
      } else {
        return instance;
      }
    }
  }
  function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
      const ret = arg0.buffer;
      return ret;
    };
    imports.wbg.__wbg_csplatarray_new = function(arg0) {
      const ret = CsplatArray.__wrap(arg0);
      return ret;
    };
    imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
      let deferred0_0;
      let deferred0_1;
      try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
      } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
      }
    };
    imports.wbg.__wbg_get_67b2ba62fc30de12 = function() {
      return handleError(function(arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_get_b9b93047fe3cf45b = function(arg0, arg1) {
      const ret = arg0[arg1 >>> 0];
      return ret;
    };
    imports.wbg.__wbg_getwithrefkey_1dc361bd10053bfe = function(arg0, arg1) {
      const ret = arg0[arg1];
      return ret;
    };
    imports.wbg.__wbg_gsplatarray_new = function(arg0) {
      const ret = GsplatArray.__wrap(arg0);
      return ret;
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_e14585432e3737fc = function(arg0) {
      let result;
      try {
        result = arg0 instanceof ArrayBuffer;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_17156bcf118086a9 = function(arg0) {
      let result;
      try {
        result = arg0 instanceof Uint8Array;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    };
    imports.wbg.__wbg_length_6ca527665d89694d = function(arg0) {
      const ret = arg0.length;
      return ret;
    };
    imports.wbg.__wbg_length_8cfd2c6409af88ad = function(arg0) {
      const ret = arg0.length;
      return ret;
    };
    imports.wbg.__wbg_length_a446193dc22c12f8 = function(arg0) {
      const ret = arg0.length;
      return ret;
    };
    imports.wbg.__wbg_length_e2d2a49132c1b256 = function(arg0) {
      const ret = arg0.length;
      return ret;
    };
    imports.wbg.__wbg_log_c222819a41e063d3 = function(arg0) {
      console.log(arg0);
    };
    imports.wbg.__wbg_new_405e22f390576ce2 = function() {
      const ret = new Object();
      return ret;
    };
    imports.wbg.__wbg_new_78feb108b6472713 = function() {
      const ret = new Array();
      return ret;
    };
    imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
      const ret = new Error();
      return ret;
    };
    imports.wbg.__wbg_new_9fee97a409b32b68 = function(arg0) {
      const ret = new Uint16Array(arg0);
      return ret;
    };
    imports.wbg.__wbg_new_a12002a7f91c75be = function(arg0) {
      const ret = new Uint8Array(arg0);
      return ret;
    };
    imports.wbg.__wbg_new_e3b321dcfef89fc7 = function(arg0) {
      const ret = new Uint32Array(arg0);
      return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_f1dead44d1fc7212 = function(arg0, arg1, arg2) {
      const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
      return ret;
    };
    imports.wbg.__wbg_newwithlength_bd3de93688d68fbc = function(arg0) {
      const ret = new Uint32Array(arg0 >>> 0);
      return ret;
    };
    imports.wbg.__wbg_push_737cfc8c1432c2c6 = function(arg0, arg1) {
      const ret = arg0.push(arg1);
      return ret;
    };
    imports.wbg.__wbg_set_3f1d0b984ed272ed = function(arg0, arg1, arg2) {
      arg0[arg1] = arg2;
    };
    imports.wbg.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
      arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_set_bb8cecf6a62b9f46 = function() {
      return handleError(function(arg0, arg1, arg2) {
        const ret = Reflect.set(arg0, arg1, arg2);
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_set_d23661d19148b229 = function(arg0, arg1, arg2) {
      arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_set_f4f1f0daa30696fc = function(arg0, arg1, arg2) {
      arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_setindex_c430b78b97744fcc = function(arg0, arg1, arg2) {
      arg0[arg1 >>> 0] = arg2 >>> 0;
    };
    imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
      const ret = arg1.stack;
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_subarray_3aaeec89bb2544f0 = function(arg0, arg1, arg2) {
      const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
      return ret;
    };
    imports.wbg.__wbg_subarray_769e1e0f81bb259b = function(arg0, arg1, arg2) {
      const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
      return ret;
    };
    imports.wbg.__wbg_subarray_aa9065fa9dc5df96 = function(arg0, arg1, arg2) {
      const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
      return ret;
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
      const v = arg0;
      const ret = typeof v === "boolean" ? v ? 1 : 0 : 2;
      return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
      const ret = debugString(arg1);
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
      const ret = new Error(getStringFromWasm0(arg0, arg1));
      return ret;
    };
    imports.wbg.__wbindgen_in = function(arg0, arg1) {
      const ret = arg0 in arg1;
      return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
      const table = wasm.__wbindgen_export_3;
      const offset = table.grow(4);
      table.set(0, void 0);
      table.set(offset + 0, void 0);
      table.set(offset + 1, null);
      table.set(offset + 2, true);
      table.set(offset + 3, false);
    };
    imports.wbg.__wbindgen_is_falsy = function(arg0) {
      const ret = !arg0;
      return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
      const val = arg0;
      const ret = typeof val === "object" && val !== null;
      return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
      const ret = arg0 === void 0;
      return ret;
    };
    imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
      const ret = arg0 == arg1;
      return ret;
    };
    imports.wbg.__wbindgen_memory = function() {
      const ret = wasm.memory;
      return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
      const obj = arg1;
      const ret = typeof obj === "number" ? obj : void 0;
      getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
      const ret = arg0;
      return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
      const obj = arg1;
      const ret = typeof obj === "string" ? obj : void 0;
      var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
      const ret = getStringFromWasm0(arg0, arg1);
      return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    };
    return imports;
  }
  function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
  }
  async function __wbg_init(module_or_path) {
    if (wasm !== void 0) return wasm;
    if (typeof module_or_path !== "undefined") {
      if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
        ({ module_or_path } = module_or_path);
      } else {
        console.warn("using deprecated parameters for the initialization function; pass a single object instead");
      }
    }
    if (typeof module_or_path === "undefined") {
      module_or_path = "";
    }
    const imports = __wbg_get_imports();
    if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
      module_or_path = fetch(module_or_path);
    }
    const { instance, module } = await __wbg_load(await module_or_path, imports);
    return __wbg_finalize_init(instance, module);
  }
  const rpcHandlers = {
    sortSplats16,
    sortSplats32,
    loadPackedSplats,
    loadExtSplats,
    tinyLodPackedSplats,
    qualityLodPackedSplats,
    tinyLodExtSplats,
    qualityLodExtSplats,
    newLodTree,
    newSharedLodTree,
    initLodTree,
    disposeLodTree,
    updateLodTrees,
    traverseLodTrees,
    getLodTreeLevel
  };
  async function onMessage(event) {
    const {
      id,
      name,
      args
    } = event.data;
    try {
      const handler = rpcHandlers[name];
      if (!handler) {
        throw new Error(\`Unknown worker RPC: \${name}\`);
      }
      const sendStatus = (data) => {
        self.postMessage(
          { id, status: data },
          { transfer: getTransferable(data) }
        );
      };
      const result = await handler(args, { sendStatus });
      self.postMessage({ id, result }, { transfer: getTransferable(result) });
    } catch (error) {
      console.warn(\`Worker error: \${error}\`);
      self.postMessage({ id, error }, { transfer: getTransferable(error) });
    }
  }
  function sortSplats16({
    numSplats,
    readback,
    ordering
  }) {
    const activeSplats = sort_splats(numSplats, readback, ordering);
    return { activeSplats, readback, ordering };
  }
  function sortSplats32({
    numSplats,
    readback,
    ordering
  }) {
    const activeSplats = sort32_splats(numSplats, readback, ordering);
    return { activeSplats, readback, ordering };
  }
  async function decodeBytesUrl({
    decoder,
    fileBytes,
    url,
    requestHeader,
    withCredentials,
    stream,
    streamLength,
    sendStatus
  }) {
    if (fileBytes) {
      const CHUNK_SIZE = 1048576;
      for (let i = 0; i < fileBytes.length; i += CHUNK_SIZE) {
        decoder.push(
          fileBytes.subarray(i, Math.min(i + CHUNK_SIZE, fileBytes.length))
        );
      }
    } else if (url || stream) {
      let readStream;
      let total = 0;
      if (url) {
        const request = new Request(url, {
          headers: requestHeader ? new Headers(requestHeader) : void 0,
          credentials: withCredentials ? "include" : "same-origin"
        });
        const response = await fetch(request);
        if (!response.ok || !response.body) {
          throw new Error(
            \`Failed to fetch "\${url}": \${response.status} \${response.statusText}\`
          );
        }
        readStream = response.body.getReader();
        const contentLength = Number.parseInt(
          response.headers.get("Content-Length") || "0"
        );
        total = Number.isNaN(contentLength) ? 0 : contentLength;
      } else if (stream) {
        readStream = stream.getReader();
        total = streamLength ?? 0;
      } else {
        throw new Error("No url or stream provided");
      }
      let loaded = 0;
      while (true) {
        const { done, value } = await readStream.read();
        if (done) {
          break;
        }
        loaded += value.length;
        sendStatus({ loaded, total });
        decoder.push(value);
      }
    } else {
      throw new Error("No url or fileBytes provided");
    }
    const decoded = decoder.finish();
    return decoded;
  }
  function toPackedResult(packed) {
    return {
      numSplats: packed.numSplats,
      packedArray: packed.packed,
      extra: {
        sh1: packed.sh1,
        sh2: packed.sh2,
        sh3: packed.sh3,
        lodTree: packed.lodTree
      },
      splatEncoding: packed.splatEncoding
    };
  }
  async function loadPackedSplats({
    url,
    requestHeader,
    withCredentials,
    fileBytes,
    fileType,
    pathName,
    stream,
    streamLength,
    encoding,
    lod,
    lodBase,
    lodAbove,
    nonLod
  }, {
    sendStatus
  }) {
    if (!lod) {
      const decoder2 = decode_to_packedsplats(fileType, pathName ?? url, encoding);
      const decoded2 = await decodeBytesUrl({
        decoder: decoder2,
        fileBytes,
        url,
        requestHeader,
        withCredentials,
        stream,
        streamLength,
        sendStatus
      });
      const result2 = toPackedResult(decoded2);
      if (result2.splatEncoding.lodOpacity) {
        return { lodSplats: result2 };
      }
      return result2;
    }
    const decoder = decode_to_csplatarray(fileType, pathName ?? url, encoding);
    const decoded = await decodeBytesUrl({
      decoder,
      fileBytes,
      url,
      requestHeader,
      withCredentials,
      stream,
      streamLength,
      sendStatus
    });
    if (decoded.has_lod()) {
      const result2 = toPackedResult(
        decoded.to_packedsplats_lod()
      );
      return { lodSplats: result2 };
    }
    if (lodAbove !== void 0) {
      if (decoded.len() < lodAbove) {
        return toPackedResult(decoded.to_packedsplats());
      }
    }
    let result = {};
    if (nonLod) {
      result = toPackedResult(decoded.to_packedsplats());
    }
    const initialSplats = decoded.len();
    const lodStart = performance.now();
    if (lod === "quality") {
      const base = Math.max(1.1, Math.min(2, lodBase ?? 1.25));
      decoded.bhatt_lod(base);
    } else {
      const base = Math.max(1.1, Math.min(2, lodBase ?? 1.5));
      decoded.tiny_lod(base, false);
    }
    const lodDuration = performance.now() - lodStart;
    console.log(
      \`\${lod === "quality" ? "Bhatt" : "Tiny"} LoD: \${initialSplats} -> \${decoded.len()} (\${lodDuration} ms)\`
    );
    const lodPacked = decoded.to_packedsplats_lod();
    result.lodSplats = toPackedResult(lodPacked);
    return result;
  }
  function toExtResult(packed) {
    return {
      numSplats: packed.numSplats,
      extArrays: [packed.ext0, packed.ext1],
      extra: {
        sh1: packed.sh1,
        sh2: packed.sh2,
        sh3a: packed.sh3a,
        sh3b: packed.sh3b,
        lodTree: packed.lodTree
      }
    };
  }
  async function loadExtSplats({
    url,
    requestHeader,
    withCredentials,
    fileBytes,
    fileType,
    pathName,
    stream,
    streamLength,
    lod,
    lodBase,
    lodAbove,
    nonLod
  }, {
    sendStatus
  }) {
    if (!lod) {
      const decoder2 = decode_to_extsplats(fileType, pathName ?? url);
      const decoded2 = await decodeBytesUrl({
        decoder: decoder2,
        fileBytes,
        url,
        requestHeader,
        withCredentials,
        stream,
        streamLength,
        sendStatus
      });
      const result2 = toExtResult(decoded2);
      if (result2.extra.lodTree) {
        return { lodSplats: result2 };
      }
      return result2;
    }
    const decoder = decode_to_gsplatarray(fileType, pathName ?? url);
    const decoded = await decodeBytesUrl({
      decoder,
      fileBytes,
      url,
      requestHeader,
      withCredentials,
      stream,
      streamLength,
      sendStatus
    });
    if (decoded.has_lod()) {
      return {
        lodSplats: toExtResult(decoded.to_extsplats_lod())
      };
    }
    if (lodAbove !== void 0) {
      if (decoded.len() < lodAbove) {
        return toExtResult(decoded.to_extsplats());
      }
    }
    let result = {};
    if (nonLod) {
      result = toExtResult(decoded.to_extsplats());
    }
    const initialSplats = decoded.len();
    const lodStart = performance.now();
    if (lod === "quality") {
      const base = Math.max(1.1, Math.min(2, lodBase ?? 1.75));
      decoded.bhatt_lod(base);
    } else {
      const base = Math.max(1.1, Math.min(2, lodBase ?? 1.5));
      decoded.tiny_lod(base, false);
    }
    const lodDuration = performance.now() - lodStart;
    console.log(
      \`\${lod === "quality" ? "Bhatt" : "Tiny"} LoD: \${initialSplats} -> \${decoded.len()} (\${lodDuration} ms)\`
    );
    const lodPacked = decoded.to_extsplats_lod();
    result.lodSplats = toExtResult(lodPacked);
    return result;
  }
  async function tinyLodPackedSplats({
    numSplats,
    packedArray,
    extra,
    lodBase,
    rgba,
    encoding
  }) {
    const base = Math.max(1.1, Math.min(2, lodBase ?? 1.5));
    const lodStart = performance.now();
    const filter = false;
    const decoded = tiny_lod_packedsplats(
      numSplats,
      packedArray,
      extra,
      base,
      filter,
      rgba,
      encoding
    );
    const lodDuration = performance.now() - lodStart;
    const result = toPackedResult(decoded);
    console.log(
      \`Tiny LoD: \${numSplats} -> \${result.numSplats} (\${lodDuration} ms)\`
    );
    return result;
  }
  async function qualityLodPackedSplats({
    numSplats,
    packedArray,
    extra,
    lodBase,
    rgba,
    encoding
  }) {
    const base = Math.max(1.1, Math.min(2, lodBase ?? 1.75));
    const lodStart = performance.now();
    const decoded = bhatt_lod_packedsplats(
      numSplats,
      packedArray,
      extra,
      base,
      rgba,
      encoding
    );
    const lodDuration = performance.now() - lodStart;
    const result = toPackedResult(decoded);
    console.log(
      \`Bhatt LoD: \${numSplats} -> \${result.numSplats} (\${lodDuration} ms)\`
    );
    return result;
  }
  async function tinyLodExtSplats({
    numSplats,
    extArrays,
    extra,
    lodBase,
    rgba,
    encoding
  }) {
    const base = Math.max(1.1, Math.min(2, lodBase ?? 1.5));
    const lodStart = performance.now();
    const filter = false;
    const decoded = tiny_lod_extsplats(
      numSplats,
      extArrays[0],
      extArrays[1],
      extra,
      base,
      filter,
      rgba
    );
    const lodDuration = performance.now() - lodStart;
    const result = toExtResult(decoded);
    console.log(
      \`Tiny LoD: \${numSplats} -> \${result.numSplats} (\${lodDuration} ms)\`
    );
    return result;
  }
  async function qualityLodExtSplats({
    numSplats,
    extArrays,
    extra,
    lodBase,
    rgba,
    encoding
  }) {
    const base = Math.max(1.1, Math.min(2, lodBase ?? 1.75));
    const lodStart = performance.now();
    const decoded = bhatt_lod_extsplats(
      numSplats,
      extArrays[0],
      extArrays[1],
      extra,
      base,
      rgba
    );
    const lodDuration = performance.now() - lodStart;
    const result = toExtResult(decoded);
    console.log(
      \`Bhatt LoD: \${numSplats} -> \${result.numSplats} (\${lodDuration} ms)\`
    );
    return result;
  }
  function newLodTree({
    capacity
  }) {
    const { lodId } = new_lod_tree(capacity);
    return { lodId };
  }
  function newSharedLodTree({
    lodId
  }) {
    const { lodId: newLodId } = new_shared_lod_tree(lodId);
    return { lodId: newLodId };
  }
  function initLodTree({
    numSplats,
    lodTree
  }) {
    const { lodId, chunkToPage } = init_lod_tree(numSplats, lodTree);
    return { lodId, chunkToPage };
  }
  function disposeLodTree({ lodId }) {
    dispose_lod_tree(lodId);
  }
  function updateLodTrees({
    ranges
  }) {
    const lodIds = new Uint32Array(ranges.map(({ lodId }) => lodId));
    const pageBases = new Uint32Array(ranges.map(({ pageBase }) => pageBase));
    const chunkBases = new Uint32Array(ranges.map(({ chunkBase }) => chunkBase));
    const counts = new Uint32Array(ranges.map(({ count }) => count));
    const lodTreeData = ranges.map(({ lodTreeData: lodTreeData2 }) => lodTreeData2);
    update_lod_trees(
      lodIds,
      pageBases,
      chunkBases,
      counts,
      lodTreeData
    );
  }
  function traverseLodTrees({
    maxSplats,
    pixelScaleLimit,
    lastPixelLimit,
    fovXdegrees,
    fovYdegrees,
    instances
  }) {
    const keyInstances = Object.entries(instances);
    const lodIds = new Uint32Array(
      keyInstances.map(([_key, instance]) => instance.lodId)
    );
    const rootPages = new Uint32Array(
      keyInstances.map(([_key, instance]) => instance.rootPage ?? 4294967295)
    );
    const viewToObjects = new Float32Array(
      keyInstances.flatMap(([_key, instance]) => {
        if (instance.viewToObjectCols.length !== 16) {
          throw new Error("Incorrect array size for viewToObjectCols");
        }
        return instance.viewToObjectCols;
      })
    );
    const lodScales = new Float32Array(
      keyInstances.map(([_key, instance]) => instance.lodScale)
    );
    new Float32Array(
      keyInstances.map(([_key, instance]) => instance.outsideFoveate)
    );
    const behindFoveates = new Float32Array(
      keyInstances.map(([_key, instance]) => instance.behindFoveate)
    );
    const coneFov0s = new Float32Array(
      keyInstances.map(([_key, instance]) => instance.coneFov0)
    );
    const coneFovs = new Float32Array(
      keyInstances.map(([_key, instance]) => instance.coneFov)
    );
    const coneFoveates = new Float32Array(
      keyInstances.map(([_key, instance]) => instance.coneFoveate)
    );
    const result = new_traverse_lod_trees(
      maxSplats,
      pixelScaleLimit,
      lastPixelLimit,
      lodIds,
      rootPages,
      viewToObjects,
      lodScales,
      behindFoveates,
      coneFoveates,
      coneFov0s,
      coneFovs
    );
    const { instanceIndices, chunks, pixelLimit } = result;
    const indices = keyInstances.reduce(
      (indices2, [key, _instance], index) => {
        indices2[key] = instanceIndices[index];
        return indices2;
      },
      {}
    );
    return {
      keyIndices: indices,
      // chunks: chunks.map(([instIndex, chunk]) => [keyInstances[instIndex][0], chunk]),
      chunks,
      pixelLimit
    };
  }
  function getLodTreeLevel({
    lodId,
    level
  }) {
    return get_lod_tree_level(lodId, level);
  }
  function getTransferable(ctx) {
    const buffers = [];
    const seen = /* @__PURE__ */ new Set();
    function traverse(obj) {
      if (obj && typeof obj === "object" && !seen.has(obj)) {
        seen.add(obj);
        if (obj instanceof ArrayBuffer) {
          buffers.push(obj);
        } else if (obj instanceof ReadableStream || obj instanceof WritableStream) {
          buffers.push(obj);
        } else if (ArrayBuffer.isView(obj)) {
          buffers.push(obj.buffer);
        } else if (Array.isArray(obj)) {
          obj.forEach(traverse);
        } else {
          Object.values(obj).forEach(traverse);
        }
      }
    }
    traverse(ctx);
    return buffers;
  }
  async function initialize() {
    const pending = [];
    const bufferMessage = (event) => {
      if (event.data?.type !== "wasm-init") pending.push(event);
    };
    self.addEventListener("message", bufferMessage);
    const initData = await new Promise(
      (resolve) => {
        self.addEventListener("message", function onInit(e) {
          if (e.data?.type === "wasm-init") {
            self.removeEventListener("message", onInit);
            resolve(e.data);
          }
        });
      }
    );
    if (!initData.wasmBinary) {
      throw new Error(
        "Splat worker did not receive WASM binary. The main thread failed to fetch spark_worker_rs_bg.wasm."
      );
    }
    await __wbg_init(initData.wasmBinary);
    self.removeEventListener("message", bufferMessage);
    self.addEventListener("message", onMessage);
    for (const event of pending) {
      onMessage(event);
    }
  }
  initialize().catch(console.error);
})();
//# sourceMappingURL=worker-DNRWBMF9.js.map
`,Qr=typeof self<`u`&&self.Blob&&new Blob([`(self.URL || self.webkitURL).revokeObjectURL(self.location.href);`,Zr],{type:`text/javascript;charset=utf-8`});function $r(e){let t;try{if(t=Qr&&(self.URL||self.webkitURL).createObjectURL(Qr),!t)throw``;let n=new Worker(t,{name:e?.name});return n.addEventListener(`error`,()=>{(self.URL||self.webkitURL).revokeObjectURL(t)}),n}catch{return new Worker(`data:text/javascript;charset=utf-8,`+encodeURIComponent(Zr),{name:e?.name})}}var ei=(ti=new URL(``+new URL(`spark_worker_rs_bg-CCi4jCSz.wasm`,import.meta.url).href,``+import.meta.url).href).includes(`/.vite/`)?ti.replace(/\.vite\/[^?#]*/,()=>`@miris-inc/three/dist/spark_worker_rs_bg.wasm`):ti,ti,ni=class e{constructor(){var e,t,n;nn(this,Gt),this.queue=null,this.messages={},this.worker=new $r,this.worker.onmessage=e=>this.onMessage(e),(e=this,t=Gt,n=Kt,en(e,t,`access private method`),n).call(this)}onMessage(e){let{id:t,result:n,error:r,status:i}=e.data,a=this.messages[t];a&&(r===void 0?i===void 0?(delete this.messages[t],a.resolve(n)):a.onStatus?.(i):(delete this.messages[t],a.reject(r)))}tryExclusive(e){return this.queue==null?this.exclusive(e):null}async exclusive(e){let t=this.queue;t==null?this.queue=[]:await new Promise(e=>{t.push(()=>e(void 0))});try{return await e(this)}finally{this.queue!=null&&(this.queue.length===0?this.queue=null:this.queue.shift()())}}async call(t,n,r={}){let i=++e.currentId,a=new Promise((e,t)=>{this.messages[i]={resolve:e,reject:t,onStatus:r.onStatus}});return this.worker.postMessage({id:i,name:t,args:n},{transfer:Or(n)}),await a}dispose(){this.worker.terminate();let e=Object.values(this.messages);this.messages={};for(let t of e)t.reject(Error(`Worker terminate`))}};Gt=new WeakSet,Kt=async function(){try{let e=await fetch(ei);if(!e.ok)throw Error(`HTTP ${e.status} fetching spark_worker_rs_bg.wasm`);let t=await e.arrayBuffer();this.worker.postMessage({type:`wasm-init`,wasmBinary:t},[t])}catch(e){console.error(`Failed to load spark-worker-rs WASM`,e),this.worker.postMessage({type:`wasm-init`})}},ni.currentId=0;var ri=ni,ii=new class{constructor(e=4){this.numWorkers=0,this.freelist=[],this.queue=[],this.maxWorkers=e}async withWorker(e){let t=await this.allocWorker();try{return await e(t)}finally{this.freeWorker(t)}}async allocWorker(){let e=this.freelist.pop();if(e)return e;if(this.numWorkers<this.maxWorkers){let e=new ri;return this.numWorkers+=1,e}return new Promise(e=>{this.queue.push(e)})}freeWorker(e){if(this.numWorkers>this.maxWorkers)return void--this.numWorkers;let t=this.queue.shift();t?t(e):this.freelist.push(e)}},q={type:`Gsplat`},ai={type:`CovSplat`},oi={type:`PackedSplats`},si={type:`ExtSplats`},ci=(e,t)=>new yi({packedSplats:e,index:t}),li=e=>new wi({gsplat:e}),J=e=>new Ti({gsplat:e}),ui=({gsplat:e,flags:t,index:n,center:r,scales:i,quaternion:a,rgba:o,rgb:s,opacity:c,x:l,y:u,z:d,r:f,g:p,b:m,reflectance:h})=>new Ei({gsplat:e,flags:t,index:n,center:r,scales:i,quaternion:a,rgba:o,rgb:s,opacity:c,x:l,y:u,z:d,r:f,g:p,b:m,reflectance:h}),di=e=>new Oi({gsplat:e}),fi=(e,{scale:t,rotate:n,translate:r,recolor:i})=>new ki({gsplat:e,scale:t,rotate:n,translate:r,recolor:i}),pi=e=>new Pi({index:e}),mi=e=>new Fi({index:e}),hi=G(`
  struct Gsplat {
    vec3 center;
    uint flags;
    vec3 scales;
    int index;
    vec4 quaternion;
    vec4 rgba;
    float reflectance;
  };
  const uint GSPLAT_FLAG_ACTIVE = 1u << 0u;

  bool isGsplatActive(uint flags) {
    return (flags & GSPLAT_FLAG_ACTIVE) != 0u;
  }
`),gi=G(`
  struct CovSplat {
    vec3 center;
    uint flags;
    vec4 rgba;
    vec3 xxyyzz;
    int index;
    vec3 xyxzyz;
  };

  bool isCovSplatActive(uint flags) {
    return (flags & GSPLAT_FLAG_ACTIVE) != 0u;
  }
`),_i=G(`
  struct PackedSplats {
    usampler2DArray textureArray;
    int numSplats;
    vec4 rgbMinMaxLnScaleMinMax;
    bool lodOpacity;
  };
`),vi=G(`
  bool readPackedArray(usampler2DArray texture, int numSplats, vec4 rgbMinMaxLnScaleMinMax, int index, out Gsplat gsplat) {
    if ((index >= 0) && (index < numSplats)) {
      uvec4 packed = texelFetch(texture, splatTexCoord(index), 0);
      unpackSplatEncoding(packed, gsplat.center, gsplat.scales, gsplat.quaternion, gsplat.rgba, rgbMinMaxLnScaleMinMax);
      return true;
    } else {
      return false;
    }
  }
`),yi=class extends H{constructor({packedSplats:e,index:t}){super({inTypes:{packedSplats:oi,index:`int`},outTypes:{gsplat:q},inputs:{packedSplats:e,index:t},globals:()=>[hi,_i,vi],statements:({inputs:e,outputs:t})=>{let{gsplat:n}=t;if(!n)return[];let{packedSplats:r,index:i}=e,a;return a=r&&i?W(`\n            ${n}.flags = 0u;\n            if (readPackedArray(${r}.textureArray, ${r}.numSplats, ${r}.rgbMinMaxLnScaleMinMax, ${i}, ${n})) {\n              if (${r}.lodOpacity) {\n                ${n}.rgba.a = 2.0 * ${n}.rgba.a;\n              }\n              bool zeroSize = all(equal(${n}.scales, vec3(0.0, 0.0, 0.0)));\n              ${n}.flags = zeroSize ? 0u : GSPLAT_FLAG_ACTIVE;\n            }\n          `):[`${n}.flags = 0u;`],a.push(`${n}.index = ${i??`0`};`),a}})}dynoOut(){return new B(this,`gsplat`)}},bi=class extends H{constructor({packedSplats:e,index:t,base:n,count:r}){super({inTypes:{packedSplats:oi,index:`int`,base:`int`,count:`int`},outTypes:{gsplat:q},inputs:{packedSplats:e,index:t,base:n,count:r},globals:()=>[hi,_i,vi],statements:({inputs:e,outputs:t})=>{let{gsplat:n}=t;if(!n)return[];let{packedSplats:r,index:i,base:a,count:o}=e,s;return s=r&&i&&a&&o?W(`\n            ${n}.flags = 0u;\n            if (readPackedArray(${r}.textureArray, ${r}.numSplats, ${r}.rgbMinMaxLnScaleMinMax, ${i}, ${n})) {\n              if (${r}.lodOpacity) {\n                ${n}.rgba.a = 2.0 * ${n}.rgba.a;\n              }\n              bool zeroSize = all(equal(${n}.scales, vec3(0.0, 0.0, 0.0)));\n              ${n}.flags = zeroSize ? 0u : GSPLAT_FLAG_ACTIVE;\n            }\n          `):[`${n}.flags = 0u;`],s.push(`${n}.index = ${i??`0`};`),s}})}dynoOut(){return new B(this,`gsplat`)}},xi=G(`
  struct ExtSplats {
    usampler2DArray textureArray1;
    usampler2DArray textureArray2;
    int numSplats;
  };
`),Si=G(`
  void readExtArrays(usampler2DArray texture1, usampler2DArray texture2, int numSplats, int index, out Gsplat gsplat) {
    gsplat.flags = 0u;
    if ((index >= 0) && (index < numSplats)) {
      ivec3 coord = splatTexCoord(index);
      uvec4 packed1 = texelFetch(texture1, coord, 0);
      uvec4 packed2 = texelFetch(texture2, coord, 0);
      unpackSplatExt(packed1, packed2, gsplat.center, gsplat.scales, gsplat.quaternion, gsplat.rgba, gsplat.reflectance);
      gsplat.flags = all(equal(gsplat.scales, vec3(0.0, 0.0, 0.0))) ? 0u : GSPLAT_FLAG_ACTIVE;
      gsplat.index = index;
    }
  }
`),Ci=class extends H{constructor({extSplats:e,index:t}){super({inTypes:{extSplats:si,index:`int`},outTypes:{gsplat:q},inputs:{extSplats:e,index:t},globals:()=>[hi,xi,Si],statements:({inputs:e,outputs:t})=>{let{gsplat:n}=t;if(!n)return[`${n}.flags = 0u;`];let{extSplats:r,index:i}=e;return r&&i?W(`\n            readExtArrays(${r}.textureArray1, ${r}.textureArray2, ${r}.numSplats, ${i}, ${n});\n          `):[`${n}.flags = 0u;`]}})}dynoOut(){return new B(this,`gsplat`)}};G(`
  void readCovArrays(usampler2DArray texture1, usampler2DArray texture2, int numSplats, int index, out CovSplat covsplat) {
    covsplat.flags = 0u;
    if ((index >= 0) && (index < numSplats)) {
      ivec3 coord = splatTexCoord(index);
      uvec4 packed1 = texelFetch(texture1, coord, 0);
      uvec4 packed2 = texelFetch(texture2, coord, 0);
      unpackSplatExtCov(packed1, packed2, covsplat.center, covsplat.rgba, covsplat.xxyyzz, covsplat.xyxzyz);
      covsplat.flags = (all(equal(covsplat.xxyyzz, vec3(0.0))) && all(equal(covsplat.xyxzyz, vec3(0.0)))) ? 0u : GSPLAT_FLAG_ACTIVE;
      gsplat.index = index;
    }
  }
`);var wi=class extends H{constructor({gsplat:e}){super({inTypes:{gsplat:q},outTypes:{covsplat:ai},inputs:{gsplat:e},globals:()=>[hi,gi],statements:({inputs:e,outputs:t})=>{let{gsplat:n}=e,{covsplat:r}=t;return n?W(`\n          ${r}.flags = 0u;\n          if (isGsplatActive(${n}.flags)) {\n            ${r}.flags = ${n}.flags;\n            ${r}.index = ${n}.index;\n            ${r}.rgba = ${n}.rgba;\n            ${r}.center = ${n}.center;\n            mat3 m = scaleQuaternionToMatrix(${n}.scales, ${n}.quaternion);\n            m = m * transpose(m);\n            ${r}.xxyyzz = vec3(m[0][0], m[1][1], m[2][2]);\n            ${r}.xyxzyz = vec3(m[0][1], m[0][2], m[1][2]);\n          }\n        `):[`${r}.flags = 0u;`]}})}dynoOut(){return new B(this,`covsplat`)}},Ti=class extends H{constructor({gsplat:e}){super({inTypes:{gsplat:q},outTypes:{flags:`uint`,active:`bool`,index:`int`,center:`vec3`,scales:`vec3`,quaternion:`vec4`,rgba:`vec4`,rgb:`vec3`,opacity:`float`,x:`float`,y:`float`,z:`float`,r:`float`,g:`float`,b:`float`,reflectance:`float`},inputs:{gsplat:e},globals:()=>[hi],statements:({inputs:e,outputs:t})=>{let{gsplat:n}=e,{flags:r,active:i,index:a,center:o,scales:s,quaternion:c,rgba:l,rgb:u,opacity:d,x:f,y:p,z:m,r:h,g,b:_,reflectance:v}=t;return[r?`${r} = ${n?`${n}.flags`:`0u`};`:null,i?`${i} = isGsplatActive(${n?`${n}.flags`:`0u`});`:null,a?`${a} = ${n?`${n}.index`:`0`};`:null,o?`${o} = ${n?`${n}.center`:`vec3(0.0, 0.0, 0.0)`};`:null,s?`${s} = ${n?`${n}.scales`:`vec3(0.0, 0.0, 0.0)`};`:null,c?`${c} = ${n?`${n}.quaternion`:`vec4(0.0, 0.0, 0.0, 1.0)`};`:null,l?`${l} = ${n?`${n}.rgba`:`vec4(0.0, 0.0, 0.0, 0.0)`};`:null,u?`${u} = ${n?`${n}.rgba.rgb`:`vec3(0.0, 0.0, 0.0)`};`:null,d?`${d} = ${n?`${n}.rgba.a`:`0.0`};`:null,f?`${f} = ${n?`${n}.center.x`:`0.0`};`:null,p?`${p} = ${n?`${n}.center.y`:`0.0`};`:null,m?`${m} = ${n?`${n}.center.z`:`0.0`};`:null,h?`${h} = ${n?`${n}.rgba.r`:`0.0`};`:null,g?`${g} = ${n?`${n}.rgba.g`:`0.0`};`:null,_?`${_} = ${n?`${n}.rgba.b`:`0.0`};`:null,v?`${v} = ${n?`${n}.reflectance`:`0.0`};`:null].filter(Boolean)}})}},Ei=class extends H{constructor({gsplat:e,flags:t,index:n,center:r,scales:i,quaternion:a,rgba:o,rgb:s,opacity:c,x:l,y:u,z:d,r:f,g:p,b:m,reflectance:h}){super({inTypes:{gsplat:q,flags:`uint`,index:`int`,center:`vec3`,scales:`vec3`,quaternion:`vec4`,rgba:`vec4`,rgb:`vec3`,opacity:`float`,x:`float`,y:`float`,z:`float`,r:`float`,g:`float`,b:`float`,reflectance:`float`},outTypes:{gsplat:q},inputs:{gsplat:e,flags:t,index:n,center:r,scales:i,quaternion:a,rgba:o,rgb:s,opacity:c,x:l,y:u,z:d,r:f,g:p,b:m,reflectance:h},globals:()=>[hi],statements:({inputs:e,outputs:t})=>{let{gsplat:n}=t;if(!n)return[];let{gsplat:r,flags:i,index:a,center:o,scales:s,quaternion:c,rgba:l,rgb:u,opacity:d,x:f,y:p,z:m,r:h,g,b:_,reflectance:v}=e;return[`${n}.flags = ${i??(r?`${r}.flags`:`0u`)};`,`${n}.index = ${a??(r?`${r}.index`:`0`)};`,`${n}.center = ${o??(r?`${r}.center`:`vec3(0.0, 0.0, 0.0)`)};`,`${n}.scales = ${s??(r?`${r}.scales`:`vec3(0.0, 0.0, 0.0)`)};`,`${n}.quaternion = ${c??(r?`${r}.quaternion`:`vec4(0.0, 0.0, 0.0, 1.0)`)};`,`${n}.rgba = ${l??(r?`${r}.rgba`:`vec4(0.0, 0.0, 0.0, 0.0)`)};`,`${n}.reflectance = ${v??(r?`${r}.reflectance`:`0.0`)};`,u?`${n}.rgba.rgb = ${u};`:null,d?`${n}.rgba.a = ${d};`:null,f?`${n}.center.x = ${f};`:null,p?`${n}.center.y = ${p};`:null,m?`${n}.center.z = ${m};`:null,h?`${n}.rgba.r = ${h};`:null,g?`${n}.rgba.g = ${g};`:null,_?`${n}.rgba.b = ${_};`:null].filter(Boolean)}})}dynoOut(){return new B(this,`gsplat`)}},Di=G(`
  vec3 gsplatNormal(vec3 scales, vec4 quaternion) {
    float minScale = min(scales.x, min(scales.y, scales.z));
    vec3 normal;
    if (scales.z == minScale) {
      normal = vec3(0.0, 0.0, 1.0);
    } else if (scales.y == minScale) {
      normal = vec3(0.0, 1.0, 0.0);
    } else {
      normal = vec3(1.0, 0.0, 0.0);
    }
    return quatVec(quaternion, normal);
  }
`),Oi=class extends mr{constructor({gsplat:e}){super({a:e,outKey:`normal`,outTypeFunc:()=>`vec3`}),this.globals=()=>[hi,Di],this.statements=({inputs:e,outputs:t})=>[`${t.normal} = gsplatNormal(${e.a}.scales, ${e.a}.quaternion);`]}},ki=class extends H{constructor({gsplat:e,scale:t,rotate:n,translate:r,recolor:i}){super({inTypes:{gsplat:q,scale:`float`,rotate:`vec4`,translate:`vec3`,recolor:`vec4`},outTypes:{gsplat:q},inputs:{gsplat:e,scale:t,rotate:n,translate:r,recolor:i},globals:()=>[hi],statements:({inputs:e,outputs:t,compile:n})=>{let{gsplat:r}=t;if(!r||!e.gsplat)return[];let{scale:i,rotate:a,translate:o,recolor:s}=e,c=n.indent;return[`${r} = ${e.gsplat};`,`if (isGsplatActive(${r}.flags)) {`,i?`${c}${r}.center *= ${i};`:null,a?`${c}${r}.center = quatVec(${a}, ${r}.center);`:null,o?`${c}${r}.center += ${o};`:null,i?`${c}${r}.scales *= ${i};`:null,a?`${c}${r}.quaternion = quatQuat(${a}, ${r}.quaternion);`:null,s?`${c}${r}.rgba *= ${s};`:null,`}`].filter(Boolean)}})}dynoOut(){return new B(this,`gsplat`)}},Ai=e=>new Mi({covsplat:e}),ji=({covsplat:e,flags:t,index:n,center:r,rgba:i,rgb:a,opacity:o,x:s,y:c,z:l,r:u,g:d,b:f})=>new Ni({covsplat:e,flags:t,index:n,center:r,rgba:i,rgb:a,opacity:o,x:s,y:c,z:l,r:u,g:d,b:f}),Mi=class extends H{constructor({covsplat:e}){super({inTypes:{covsplat:ai},outTypes:{flags:`uint`,active:`bool`,index:`int`,center:`vec3`,rgba:`vec4`,rgb:`vec3`,opacity:`float`,x:`float`,y:`float`,z:`float`,r:`float`,g:`float`,b:`float`},inputs:{covsplat:e},globals:()=>[gi],statements:({inputs:e,outputs:t})=>{let{covsplat:n}=e,{flags:r,active:i,index:a,center:o,rgba:s,rgb:c,opacity:l,x:u,y:d,z:f,r:p,g:m,b:h}=t;return[r?`${r} = ${n?`${n}.flags`:`0u`};`:null,i?`${i} = isCovSplatActive(${n?`${n}.flags`:`0u`});`:null,a?`${a} = ${n?`${n}.index`:`0`};`:null,o?`${o} = ${n?`${n}.center`:`vec3(0.0, 0.0, 0.0)`};`:null,s?`${s} = ${n?`${n}.rgba`:`vec4(0.0, 0.0, 0.0, 0.0)`};`:null,c?`${c} = ${n?`${n}.rgba.rgb`:`vec3(0.0, 0.0, 0.0)`};`:null,l?`${l} = ${n?`${n}.rgba.a`:`0.0`};`:null,u?`${u} = ${n?`${n}.center.x`:`0.0`};`:null,d?`${d} = ${n?`${n}.center.y`:`0.0`};`:null,f?`${f} = ${n?`${n}.center.z`:`0.0`};`:null,p?`${p} = ${n?`${n}.rgba.r`:`0.0`};`:null,m?`${m} = ${n?`${n}.rgba.g`:`0.0`};`:null,h?`${h} = ${n?`${n}.rgba.b`:`0.0`};`:null].filter(Boolean)}})}},Ni=class extends H{constructor({covsplat:e,flags:t,index:n,center:r,rgba:i,rgb:a,opacity:o,x:s,y:c,z:l,r:u,g:d,b:f}){super({inTypes:{covsplat:ai,flags:`uint`,index:`int`,center:`vec3`,rgba:`vec4`,rgb:`vec3`,opacity:`float`,x:`float`,y:`float`,z:`float`,r:`float`,g:`float`,b:`float`},outTypes:{covsplat:ai},inputs:{covsplat:e,flags:t,index:n,center:r,rgba:i,rgb:a,opacity:o,x:s,y:c,z:l,r:u,g:d,b:f},globals:()=>[gi],statements:({inputs:e,outputs:t})=>{let{covsplat:n}=t;if(!n)return[];let{covsplat:r,flags:i,index:a,center:o,rgba:s,rgb:c,opacity:l,x:u,y:d,z:f,r:p,g:m,b:h}=e;return[`${n}.flags = ${i??(r?`${r}.flags`:`0u`)};`,`${n}.index = ${a??(r?`${r}.index`:`0`)};`,`${n}.center = ${o??(r?`${r}.center`:`vec3(0.0, 0.0, 0.0)`)};`,`${n}.rgba = ${s??(r?`${r}.rgba`:`vec4(0.0, 0.0, 0.0, 0.0)`)};`,c?`${n}.rgba.rgb = ${c};`:null,l?`${n}.rgba.a = ${l};`:null,u?`${n}.center.x = ${u};`:null,d?`${n}.center.y = ${d};`:null,f?`${n}.center.z = ${f};`:null,p?`${n}.rgba.r = ${p};`:null,m?`${n}.rgba.g = ${m};`:null,h?`${n}.rgba.b = ${h};`:null,`${n}.xxyyzz = ${r?`${r}.xxyyzz`:`vec3(0.0, 0.0, 0.0)`};`,`${n}.xyxzyz = ${r?`${r}.xyxzyz`:`vec3(0.0, 0.0, 0.0)`};`].filter(Boolean)}})}dynoOut(){return new B(this,`covsplat`)}},Pi=class extends H{constructor({index:e}){super({inTypes:{index:`int`},outTypes:{coord:`ivec3`},inputs:{index:e},statements:({inputs:e,outputs:t})=>{let{index:n}=e,{coord:r}=t;return n&&r?[`${r} = splatTexCoord(${n});`]:[]}})}dynoOut(){return new B(this,`coord`)}},Fi=class extends H{constructor({index:e}){super({inTypes:{index:`int`},outTypes:{coord:`ivec3`},inputs:{index:e},statements:({inputs:e,outputs:t})=>{let{index:n}=e,{coord:r}=t;return n&&r?[`${r} = pagedSplatTexCoord(${n});`]:[]}})}dynoOut(){return new B(this,`coord`)}},Ii=(e,t)=>new Ri({gsplat:e,rgbMinMaxLnScaleMinMax:t}),Li=e=>new Vi({covsplat:e}),Ri=class extends H{constructor({gsplat:e,rgbMinMaxLnScaleMinMax:t}){super({inTypes:{gsplat:q,rgbMinMaxLnScaleMinMax:`vec4`},inputs:{gsplat:e,rgbMinMaxLnScaleMinMax:t},globals:()=>[hi],statements:({inputs:e,outputs:t})=>{let{gsplat:n,rgbMinMaxLnScaleMinMax:r}=e;return n&&r?W(`\n            if (isGsplatActive(${n}.flags)) {\n              target = packSplatEncoding(${n}.center, ${n}.scales, ${n}.quaternion, ${n}.rgba, ${r});\n            } else {\n              target = uvec4(0u, 0u, 0u, 0u);\n            }\n          `):[`target = uvec4(0u, 0u, 0u, 0u);`]}})}},zi=class extends H{constructor({covsplat:e,rgbMinMaxLnScaleMinMax:t}){super({inTypes:{covsplat:ai,rgbMinMaxLnScaleMinMax:`vec4`},inputs:{covsplat:e,rgbMinMaxLnScaleMinMax:t},globals:()=>[gi],statements:({inputs:e})=>{let{covsplat:t,rgbMinMaxLnScaleMinMax:n}=e;return t&&n?W(`\n            if (isCovSplatActive(${t}.flags)) {\n              target = packSplatCovEncoding(${t}.center, ${t}.rgba, ${t}.xxyyzz, ${t}.xyxzyz, ${n});\n            } else {\n              target = uvec4(0u);\n            }\n          `):[`target = uvec4(0u);`]}})}},Bi=class extends H{constructor({gsplat:e}){super({inTypes:{gsplat:q},inputs:{gsplat:e},globals:()=>[hi],statements:({inputs:e})=>{let{gsplat:t}=e;return t?W(`\n            if (isGsplatActive(${t}.flags)) {\n              packSplatExt(target, target2, ${t}.center, ${t}.scales, ${t}.quaternion, ${t}.rgba, ${t}.reflectance);\n            } else {\n              target = uvec4(0u);\n              target2 = uvec4(0u);\n            }\n          `):[`target = uvec4(0u);`,`target2 = uvec4(0u);`]}})}},Vi=class extends H{constructor({covsplat:e}){super({inTypes:{covsplat:ai},inputs:{covsplat:e},globals:()=>[gi],statements:({inputs:e})=>{let{covsplat:t}=e;return t?W(`\n            if (isCovSplatActive(${t}.flags)) {\n              packSplatExtCov(target, target2, ${t}.center, ${t}.rgba, ${t}.xxyyzz, ${t}.xyxzyz);\n            } else {\n              target = uvec4(0u);\n              target2 = uvec4(0u);\n            }\n          `):[`target = uvec4(0u);`,`target2 = uvec4(0u);`]}})}},Hi=class extends H{constructor({rgba8:e}){super({inTypes:{rgba8:`vec4`},inputs:{rgba8:e},statements:({inputs:e,outputs:t})=>[`target = ${e.rgba8??`vec4(0.0, 0.0, 0.0, 0.0)`};`]})}dynoOut(){return new B(this,`rgba8`)}},Ui=class extends H{constructor({key:e,type:t,count:n,value:r,update:i,globals:a}){e??=`value`,super({outTypes:{[e]:t},update:()=>{if(i){let e=i(this.value);e!==void 0&&(this.value=e)}this.uniform.value=this.value},generate:({inputs:r,outputs:i})=>{let o=a?.({inputs:r,outputs:i})??[],s={},c=i[e];return c&&(o.push(`uniform ${pr(c,t,n)};`),s[c]=this.uniform),{globals:o,uniforms:s}}}),this.type=t,this.count=n,this.value=r,this.uniform={value:r},this.outKey=e}dynoOut(){return new B(this,this.outKey)}},Wi=class extends Ui{constructor({key:e,value:t,update:n}){super({key:e,type:`bool`,value:t,update:n})}},Gi=class extends Ui{constructor({key:e,value:t,update:n}){super({key:e,type:`int`,value:t,update:n})}},Ki=class extends Ui{constructor({key:e,value:t,update:n}){super({key:e,type:`float`,value:t,update:n})}},qi=class extends Ui{constructor({key:e,value:t,update:n}){super({key:e,type:`vec3`,value:t,update:n})}},Ji=class extends Ui{constructor({key:e,value:t,update:n}){super({key:e,type:`vec4`,value:t,update:n})}},Yi=class extends Ui{constructor({key:e,value:t,update:n}){super({key:e,type:`mat3`,value:t,update:n})}},Xi=class extends Ui{constructor({key:e,value:t,update:n}){super({key:e,type:`usampler2D`,value:t,update:n})}},Zi=class extends Ui{constructor({key:e,value:t,update:n}){super({key:e,type:`usampler2DArray`,value:t,update:n})}},Qi=class{constructor({graph:e,inputs:t,outputs:n,template:r,consoleLog:i}){this.graph=e,this.template=r,this.inputs=t??{},this.outputs=n??{};let a=new ur({indent:this.template.indent});for(let e in this.outputs)this.outputs[e]&&a.declares.add(this.outputs[e]);let o=e.compile({inputs:this.inputs,outputs:this.outputs,compile:a});this.shader=r.generate({globals:a.globals,statements:o}),this.uniforms=a.uniforms,this.updaters=a.updaters,i&&(console.log(`*** COMPILED SHADER`,this.shader),console.log(`*** UNIFORMS`,this.uniforms))}prepareMaterial(){return function(e){let t=ea.get(e);return t||(t=new pe({glslVersion:y,vertexShader:zr,fragmentShader:e.shader,uniforms:e.uniforms}),ea.set(e,t),t)}(this)}update(){for(let e of this.updaters)e()}dispose(){ea.delete(this)}},$i=class{constructor(e){let t=e.match(/^([ \t]*)\{\{\s*GLOBALS\s*\}\}/m),n=e.match(/^([ \t]*)\{\{\s*STATEMENTS\s*\}\}/m);if(!t||!n)throw Error(`Template must contain {{ GLOBALS }} and {{ STATEMENTS }}`);this.before=e.substring(0,t.index),this.between=e.substring(t.index+t[0].length,n.index),this.after=e.substring(n.index+n[0].length),this.indent=n[1]}generate({globals:e,statements:t}){return this.before+Array.from(e).join(`

`)+this.between+t.map(e=>this.indent+e).join(`
`)+this.after}},ea=new Map;function ta(e,t,n=`add`){let r=()=>{throw Error(`Invalid ${n} types: ${e}, ${t}`)};if(e===t)return e;if(e===`int`){if(Qn(t))return t;r()}if(t===`int`){if(Qn(e))return e;r()}if(e===`uint`){if($n(t))return t;r()}if(t===`uint`){if($n(e))return e;r()}if(e===`float`){if(er(t))return t;r()}if(t===`float`){if(er(e))return e;r()}throw Error(`Invalid ${n} types: ${e}, ${t}`)}function na(e,t){return ta(e,t,`sub`)}function ra(e,t){let n=()=>{throw Error(`Invalid mul types: ${e}, ${t}`)};if(e===`int`){if(Qn(t))return t;n()}if(t===`int`){if(Qn(e))return e;n()}if(e===`uint`){if($n(t))return t;n()}if(t===`uint`){if($n(e))return e;n()}if(e===`float`){if(er(t))return t;n()}if(t===`float`){if(er(e))return e;n()}if(Qn(e)||$n(e)||Qn(t)||$n(t)){if(e===t)return e;n()}if(e===`vec2`){if(t===`vec2`||tr(t))return`vec2`;if(t===`mat3x2`)return`vec3`;if(t===`mat4x2`)return`vec4`;n()}if(e===`vec3`){if(t===`mat2x3`)return`vec2`;if(t===`vec3`||nr(t))return`vec3`;if(t===`mat4x3`)return`vec4`;n()}if(e===`vec4`){if(t===`mat2x4`)return`vec2`;if(t===`mat3x4`)return`vec3`;if(t===`vec4`||rr(t))return`vec4`;n()}if(t===`vec2`){if(tr(e))return`vec2`;if(e===`mat2x3`)return`vec3`;if(e===`mat2x4`)return`vec4`;n()}if(t===`vec3`){if(e===`mat3x2`)return`vec2`;if(nr(e))return`vec3`;if(e===`mat3x4`)return`vec4`;n()}if(t===`vec4`){if(e===`mat4x2`)return`vec2`;if(e===`mat4x3`)return`vec3`;if(rr(e))return`vec4`;n()}if(tr(e)){if(tr(t))return`mat2`;if(t===`mat3x2`)return`mat3x2`;if(t===`mat4x2`)return`mat4x2`;n()}if(e===`mat2x3`){if(tr(t))return`mat2x3`;if(t===`mat3x2`)return`mat3`;if(t===`mat4x2`)return`mat4x3`;n()}if(e===`mat2x4`){if(tr(t))return`mat2x4`;if(t===`mat3x2`)return`mat3x4`;if(t===`mat4x2`)return`mat4`;n()}if(e===`mat3x2`){if(t===`mat2x3`)return`mat2`;if(nr(t))return`mat3x2`;if(t===`mat4x3`)return`mat4x2`;n()}if(nr(e)){if(t===`mat2x3`)return`mat2x3`;if(nr(t))return`mat3`;if(t===`mat4x3`)return`mat4x3`;n()}if(e===`mat3x4`){if(t===`mat2x3`)return`mat2x4`;if(nr(t))return`mat3x4`;if(t===`mat4x3`)return`mat4`;n()}if(e===`mat4x2`){if(t===`mat2x4`)return`mat2`;if(t===`mat3x4`)return`mat3x2`;if(rr(t))return`mat4x2`;n()}if(e===`mat4x3`){if(t===`mat2x4`)return`mat2x3`;if(t===`mat3x4`)return`mat3`;if(rr(t))return`mat4x3`;n()}if(rr(e)){if(t===`mat2x4`)return`mat2x4`;if(t===`mat3x4`)return`mat3x4`;if(rr(t))return`mat4`;n()}throw Error(`Invalid mul types: ${e}, ${t}`)}function ia(e){return e}var aa=(e,t)=>new la({a:e,b:t}),oa=(e,t)=>new ua({a:e,b:t}),sa=(e,t)=>new da({a:e,b:t}),ca=e=>new fa({a:e}),la=class extends hr{constructor({a:e,b:t}){super({a:e,b:t,outKey:`sum`,outTypeFunc:ta}),this.statements=({inputs:e,outputs:t})=>[`${t.sum} = ${e.a} + ${e.b};`]}},ua=class extends hr{constructor({a:e,b:t}){super({a:e,b:t,outKey:`difference`,outTypeFunc:na}),this.statements=({inputs:e,outputs:t})=>[`${t.difference} = ${e.a} - ${e.b};`]}},da=class extends hr{constructor({a:e,b:t}){super({a:e,b:t,outKey:`product`,outTypeFunc:ra}),this.statements=({inputs:e,outputs:t})=>[`${t.product} = ${e.a} * ${e.b};`]}},fa=class extends mr{constructor({a:e}){super({a:e,outKey:`neg`,outTypeFunc:ia}),this.statements=({inputs:e,outputs:t})=>[`${t.neg} = -${e.a};`]}},pa=(e,t,n)=>new ha({cond:e,t,f:n}),ma=class extends hr{constructor({a:e,b:t}){super({a:e,b:t,outTypeFunc:(e,t)=>function(e,t){if(function(e){return e===`int`||e===`uint`||e===`float`}(e))return`bool`;if(e===`ivec2`||e===`uvec2`||e===`vec2`)return`bvec2`;if(e===`ivec3`||e===`uvec3`||e===`vec3`)return`bvec3`;if(e===`ivec4`||e===`uvec4`||e===`vec4`)return`bvec4`;throw Error(`Invalid ${t} type: ${e}`)}(e,`greaterThanEqual`),outKey:`greaterThanEqual`}),this.statements=({inputs:e,outputs:t})=>this.outTypes.greaterThanEqual===`bool`?[`${t.greaterThanEqual} = ${e.a} >= ${e.b};`]:[`${t.greaterThanEqual} = greaterThanEqual(${e.a}, ${e.b});`]}},ha=class extends gr{constructor({cond:e,t,f:n}){super({a:e,b:t,c:n,outKey:`select`,outTypeFunc:(e,t,n)=>t}),this.statements=({inputs:e,outputs:t})=>{let{a:n,b:r,c:i}=e;return[`${t.select} = (${n}) ? (${r}) : (${i});`]}}},ga=e=>new ya({value:e}),_a=class extends mr{constructor({value:e}){super({a:e,outKey:`uint`,outTypeFunc:()=>`uint`}),this.statements=({inputs:e,outputs:t})=>[`${t.uint} = floatBitsToUint(${e.a});`]}},va=class extends mr{constructor({value:e}){super({a:e,outKey:`uint`,outTypeFunc:()=>`uint`}),this.statements=({inputs:e,outputs:t})=>[`${t.uint} = packHalf2x16(${e.a});`]}},ya=class extends mr{constructor({value:e}){super({a:e,outKey:`rgba8`,outTypeFunc:()=>`vec4`}),this.statements=({inputs:e,outputs:t})=>[`uvec4 uRgba = uvec4(${e.a} & 0xffu, (${e.a} >> 8u) & 0xffu, (${e.a} >> 16u) & 0xffu, (${e.a} >> 24u) & 0xffu);`,`${t.rgba8} = vec4(uRgba) / 255.0;`]}},ba=(e,t)=>new Sa({a:e,b:t}),xa=e=>new Ca({a:e}),Sa=class extends hr{constructor({a:e,b:t}){super({a:e,b:t,outKey:`dot`,outTypeFunc:(e,t)=>`float`}),this.statements=({inputs:e,outputs:t})=>[`${t.dot} = dot(${e.a}, ${e.b});`]}},Ca=class extends mr{constructor({a:e}){super({a:e,outTypeFunc:e=>e,outKey:`normalize`}),this.statements=({inputs:e,outputs:t})=>[`${t.normalize} = normalize(${e.a});`]}},wa=class extends H{constructor({vector:e}){let t={vector:ir(e)},n=function(e){switch(e){case`vec2`:return{x:`float`,y:`float`,r:`float`,g:`float`};case`vec3`:return{x:`float`,y:`float`,z:`float`,r:`float`,g:`float`,b:`float`};case`vec4`:return{x:`float`,y:`float`,z:`float`,w:`float`,r:`float`,g:`float`,b:`float`,a:`float`};case`ivec2`:return{x:`int`,y:`int`,r:`int`,g:`int`};case`ivec3`:return{x:`int`,y:`int`,z:`int`,r:`int`,g:`int`,b:`int`};case`ivec4`:return{x:`int`,y:`int`,z:`int`,w:`int`,r:`int`,g:`int`,b:`int`,a:`int`};case`uvec2`:return{x:`uint`,y:`uint`,r:`uint`,g:`uint`};case`uvec3`:return{x:`uint`,y:`uint`,z:`uint`,r:`uint`,g:`uint`,b:`uint`};case`uvec4`:return{x:`uint`,y:`uint`,z:`uint`,w:`uint`,r:`uint`,g:`uint`,b:`uint`,a:`uint`};default:throw Error(`Invalid vector type: ${e}`)}}(t.vector);super({inTypes:t,outTypes:n,inputs:{vector:e}}),this.statements=({inputs:e,outputs:t})=>{let{x:n,y:r,z:i,w:a,r:o,g:s,b:c,a:l}=t,{vector:u}=e;return[n?`${n} = ${u}.x;`:null,r?`${r} = ${u}.y;`:null,i?`${i} = ${u}.z;`:null,a?`${a} = ${u}.w;`:null,o?`${o} = ${u}.r;`:null,s?`${s} = ${u}.g;`:null,c?`${c} = ${u}.b;`:null,l?`${l} = ${u}.a;`:null].filter(Boolean)}}},Ta=class extends H{constructor({vector:e,vectorType:t,x:n,y:r,z:i,w:a,r:o,g:s,b:c,a:l}){if(!e&&!t)throw Error(`Either vector or vectorType must be provided`);let u=t??ir(e),d=function(e){switch(e){case`vec2`:case`vec3`:case`vec4`:return`float`;case`ivec2`:case`ivec3`:case`ivec4`:return`int`;case`uvec2`:case`uvec3`:case`uvec4`:return`uint`;default:throw Error(`Invalid vector type: ${e}`)}}(u),f=function(e){switch(e){case`vec2`:case`ivec2`:case`uvec2`:return 2;case`vec3`:case`ivec3`:case`uvec3`:return 3;case`vec4`:case`ivec4`:case`uvec4`:return 4;default:throw Error(`Invalid vector type: ${e}`)}}(u),p={vector:u,x:d,y:d,r:d,g:d},m={vector:e,x:n,y:r,r:o,g:s};f>=3&&(Object.assign(p,{z:d,b:d}),Object.assign(m,{z:i,b:c})),f>=4&&(Object.assign(p,{w:d,a:d}),Object.assign(m,{w:a,a:l})),super({inTypes:p,outTypes:{vector:u},inputs:m}),this.statements=({inputs:e,outputs:t})=>{let{vector:n}=t,{vector:r,x:i,y:a,z:o,w:s,r:c,g:l,b:u,a:p}=e,m=[`${n}.x = ${i??c??(r?`${r}.x`:cr(d))};`,`${n}.y = ${a??l??(r?`${r}.y`:cr(d))};`];return f>=3&&m.push(`${n}.z = ${o??u??(r?`${r}.z`:cr(d))};`),f>=4&&m.push(`${n}.w = ${s??p??(r?`${r}.w`:cr(d))};`),m}}dynoOut(){return new B(this,`vector`)}},Ea=class extends H{constructor({z:e,zNear:t,zFar:n}){super({inTypes:{z:`float`,zNear:`float`,zFar:`float`},outTypes:{depth:`float`},inputs:{z:e,zNear:t,zFar:n},statements:({inputs:e,outputs:t})=>[`float clamped = clamp(${e.z}, ${e.zNear}, ${e.zFar});`,`${t.depth} = (log2(clamped + 1.0) - log2(${e.zNear} + 1.0)) / (log2(${e.zFar} + 1.0) - log2(${e.zNear} + 1.0));`]})}dynoOut(){return new B(this,`depth`)}},Da=class extends H{constructor({position:e,scale:t,scales:n,rotate:r,translate:i}){super({inTypes:{position:`vec3`,scale:`float`,scales:`vec3`,rotate:`vec4`,translate:`vec3`},outTypes:{position:`vec3`},inputs:{position:e,scale:t,scales:n,rotate:r,translate:i},statements:({inputs:e,outputs:t})=>{let{position:n}=t;if(!n)return[];let{scale:r,scales:i,rotate:a,translate:o}=e;return[`${n} = ${e.position??`vec3(0.0, 0.0, 0.0)`};`,r?`${n} *= ${r};`:null,i?`${n} *= ${i};`:null,a?`${n} = quatVec(${a}, ${n});`:null,o?`${n} += ${o};`:null].filter(Boolean)}})}},Oa=class extends H{constructor({dir:e,scale:t,scales:n,rotate:r}){super({inTypes:{dir:`vec3`,scale:`float`,scales:`vec3`,rotate:`vec4`},outTypes:{dir:`vec3`},inputs:{dir:e,scale:t,scales:n,rotate:r},statements:({inputs:e,outputs:t})=>{let{dir:n}=t;if(!n)return[];let{scale:r,scales:i,rotate:a}=e;return[`${n} = ${e.dir??`vec3(0.0, 0.0, 0.0)`};`,r?`${n} *= ${r};`:null,i?`${n} *= ${i};`:null,a?`${n} = quatVec(${a}, ${n});`:null].filter(Boolean)}})}},ka=class e{constructor(t={}){this.maxSplats=0,this.numSplats=0,this.extra={},this.maxSh=3,this.isInitialized=!1,this.extArrays=[new Uint32Array,new Uint32Array],this.textures=[e.emptyTexture,e.emptyTexture],this.extra={},this.dyno=new ja({extSplats:this}),this.dynoNumSh=new Gi({key:`numSh`,value:0,update:()=>Math.min(this.getNumSh(),this.maxSh)}),this.initialized=Promise.resolve(this),this.reinitialize(t)}reinitialize(e){this.isInitialized=!1,this.extra={},this.maxSplats=e.maxSplats??0,this.lod=e.lod,this.nonLod=e.nonLod,e.url||e.fileBytes||e.stream||e.construct?this.initialized=this.asyncInitialize(e).then(()=>(this.isInitialized=!0,this)):(this.initialize(e),this.isInitialized=!0,this.initialized=Promise.resolve(this))}initialize(e){this.extra=e.extra??{},this.lodSplats=e.lodSplats,e.extArrays?(this.extArrays=e.extArrays,this.maxSplats=Math.floor(Math.min(this.extArrays[0].length/4,this.extArrays[1].length/4)),this.numSplats=e.numSplats??this.maxSplats,this.maxSplats=Math.floor(this.maxSplats/I)*I,this.numSplats=Math.min(this.maxSplats,e.numSplats??1/0),this.updateTextures()):(this.maxSplats=e.maxSplats??0,this.numSplats=0,this.extArrays=[new Uint32Array,new Uint32Array])}async asyncInitialize(e){let{url:t,fileBytes:n,fileType:r,fileName:i,stream:a,streamLength:o,construct:s,lod:c,nonLod:l,lodAbove:u}=e;this.lod=c,this.nonLod=l;let d=new us;if((n||t||a)&&await d.loadInternalAsync({extSplats:this,url:t,fileBytes:n,fileType:r,fileName:i,stream:a,streamLength:o,onProgress:e.onProgress,lodAbove:u}),s){let e=s(this);e instanceof Promise&&await e}}dispose(){this.textures[0]!==e.emptyTexture&&(this.textures[0].dispose(),this.textures[0]=e.emptyTexture),this.textures[1]!==e.emptyTexture&&(this.textures[1].dispose(),this.textures[1]=e.emptyTexture);for(let[e,t]of Object.entries(this.extra)){let n=t?.value;n instanceof Ke&&(n.dispose(),delete this.extra[e])}this.disposeLodSplats()}prepareFetchSplat(){}getNumSplats(){return this.numSplats}hasRgbDir(){return Math.min(this.getNumSh(),this.maxSh)>0}getNumSh(){return this.extra.sh1?this.extra.sh2?this.extra.sh3a&&this.extra.sh3b?3:2:1:0}setMaxSh(e){this.maxSh=e}fetchSplat({index:e,viewOrigin:t}){let n=((e,t)=>new Ci({extSplats:e,index:t}))(this.dyno,e);if(this.hasRgbDir()&&t){let r=J(n).outputs.center,i=xa(oa(r,t)),{sh1Texture:a,sh2Texture:o,sh3TextureA:s,sh3TextureB:c}=this.ensureShTextures(),{rgb:l}=Fa({coord:pi(e),viewDir:i,numSh:this.dynoNumSh,sh1Texture:a,sh2Texture:o,sh3TextureA:s,sh3TextureB:c});l=aa(l,J(n).outputs.rgb),n=ui({gsplat:n,rgb:l})}return n}evaluateSH({index:e,gsplat:t,viewOrigin:n}){if(!this.hasRgbDir())return;let r=J(t).outputs.center,i=xa(oa(r,n)),{sh1Texture:a,sh2Texture:o,sh3TextureA:s,sh3TextureB:c}=this.ensureShTextures(),{rgb:l}=Fa({coord:pi(e),viewDir:i,numSh:this.dynoNumSh,sh1Texture:a,sh2Texture:o,sh3TextureA:s,sh3TextureB:c});return l}ensureShTextures(){if(!this.extra.sh1)return{};let e=this.extra.sh1Texture;if(!e){let t=this.extra.sh1,{width:n,height:i,depth:a,maxSplats:o}=K(t.length/4);if(t.length<4*o){let e=new Uint32Array(4*o);e.set(t),this.extra.sh1=e,t=e}e=new Zi({value:Ia(t,n,i,a,r,D,`RGBA32UI`),key:`sh1`}),this.extra.sh1Texture=e}if(!this.extra.sh2)return{sh1Texture:e};let t=this.extra.sh2Texture;if(!t){let e=this.extra.sh2,{width:n,height:i,depth:a,maxSplats:o}=K(e.length/4);if(e.length<4*o){let t=new Uint32Array(4*o);t.set(e),this.extra.sh2=t,e=t}t=new Zi({value:Ia(e,n,i,a,r,D,`RGBA32UI`),key:`sh2`}),this.extra.sh2Texture=t}if(!this.extra.sh3a||!this.extra.sh3b)return{sh1Texture:e,sh2Texture:t};let n=this.extra.sh3TextureA;if(!n){let e=this.extra.sh3a,{width:t,height:i,depth:a,maxSplats:o}=K(e.length/4);if(e.length<4*o){let t=new Uint32Array(4*o);t.set(e),this.extra.sh3a=t,e=t}n=new Zi({value:Ia(e,t,i,a,r,D,`RGBA32UI`),key:`sh3`}),this.extra.sh3TextureA=n}let i=this.extra.sh3TextureB;if(!i){let e=this.extra.sh3b,{width:t,height:n,depth:a,maxSplats:o}=K(e.length/4);if(e.length<4*o){let t=new Uint32Array(4*o);t.set(e),this.extra.sh3b=t,e=t}i=new Zi({value:Ia(e,t,n,a,r,D,`RGBA32UI`),key:`sh3b`}),this.extra.sh3TextureB=i}return{sh1Texture:e,sh2Texture:t,sh3TextureA:n,sh3TextureB:i}}ensureSplats(e){let t=e<=this.maxSplats?this.maxSplats:Math.max(e,2*this.maxSplats),n=this.extArrays[0]?this.extArrays[0].length/4:0;if(!this.extArrays[0]||t>n){this.maxSplats=K(t).maxSplats;let e=new Uint32Array(4*this.maxSplats),n=new Uint32Array(4*this.maxSplats);this.extArrays[0]&&(e.set(this.extArrays[0]),n.set(this.extArrays[1])),this.extArrays[0]=e,this.extArrays[1]=n}return this.extArrays}getSplat(e){if(e>=this.numSplats)throw Error(`Invalid index`);return jr(this.extArrays,e)}setSplat(e,t,n,r,i,a){Ar(this.ensureSplats(e+1),e,t.x,t.y,t.z,n.x,n.y,n.z,r.x,r.y,r.z,r.w,i,a.r,a.g,a.b),this.numSplats=Math.max(this.numSplats,e+1)}pushSplat(e,t,n,r,i){Ar(this.ensureSplats(this.numSplats+1),this.numSplats,e.x,e.y,e.z,t.x,t.y,t.z,n.x,n.y,n.z,n.w,r,i.r,i.g,i.b),++this.numSplats}forEachSplat(e){if(this.numSplats)for(let t=0;t<this.numSplats;++t){let n=jr(this.extArrays,t);e(t,n.center,n.scales,n.quaternion,n.opacity,n.color)}}updateTextures(){if(this.textures[0]!==e.emptyTexture){let{width:t,height:n,depth:r}=this.textures[0].image;this.maxSplats!==t*n*r&&(this.textures[0].dispose(),this.textures[0]=e.emptyTexture,this.textures[1].dispose(),this.textures[1]=e.emptyTexture)}if(this.textures[0]===e.emptyTexture){let{width:e,height:t,depth:n}=K(this.maxSplats);this.textures[0]=Ia(this.extArrays[0],e,t,n,r,D,`RGBA32UI`),this.textures[1]=Ia(this.extArrays[1],e,t,n,r,D,`RGBA32UI`)}else this.extArrays[0].buffer!==this.textures[0].image.data.buffer&&(this.textures[0].image.data=new Uint8Array(this.extArrays[0].buffer),this.textures[1].image.data=new Uint8Array(this.extArrays[1].buffer),this.textures[0].needsUpdate=!0,this.textures[1].needsUpdate=!0)}extractSplats(t,n){let r=K(t.length).maxSplats,i=new e({maxSplats:r});for(let e=0;e<t.length;e++){let r=this.getSplat(t[e]);if(n){let n=.61803398875*(t[e]>>>16);n-=Math.floor(n);let i=Math.max(0,Math.min(1,Math.abs(6*n-3)-1)),a=Math.max(0,Math.min(1,Math.abs(6*n+1)-1)),o=Math.max(0,Math.min(1,Math.abs(6*n-1)-1));r.color.r*=i,r.color.g*=a,r.color.b*=o}i.pushSplat(r.center,r.scales,r.quaternion,r.opacity,r.color)}return i}disposeLodSplats(){this.lodSplats&&=(this.lodSplats.dispose(),void 0)}async createLodSplats({rgbaArray:t,quality:n}={}){let r=typeof this.lod==`number`?Math.max(1.1,Math.min(2,this.lod)):n?1.75:1.5,i=[this.extArrays[0].slice(),this.extArrays[1].slice()],a=t?(await t.getArray()).slice():void 0,o={sh1:this.extra.sh1?this.extra.sh1.slice():void 0,sh2:this.extra.sh2?this.extra.sh2.slice():void 0,sh3:this.extra.sh3?this.extra.sh3.slice():void 0},s=await ii.withWorker(async e=>await e.call(n?`qualityLodExtSplats`:`tinyLodExtSplats`,{numSplats:this.numSplats,extArrays:i,extra:o,lodBase:r,rgba:a})),c=new e(s);this.lodSplats&&this.lodSplats.dispose(),this.lodSplats=c,this.nonLod=!0,this.lod||=r}};ka.emptyArray=(()=>{let{width:e,height:t,depth:n,maxSplats:i}=K(1),a=new O(new Uint32Array(4*i),e,t,n);return a.format=r,a.type=D,a.internalFormat=`RGBA32UI`,a.needsUpdate=!0,a})(),ka.emptyTexture=Ia(null,1,1,1,r,D,`RGBA32UI`),ka.emptyUint32x4=(()=>{let{width:e,height:t,depth:n,maxSplats:i}=K(1),a=new O(new Uint32Array(4*i),e,t,n);return a.format=r,a.type=D,a.internalFormat=`RGBA32UI`,a.needsUpdate=!0,a})();var Aa=ka,ja=class extends Ui{constructor({extSplats:e}={}){super({key:`extSplats`,type:si,globals:()=>[xi],value:{textureArray1:Aa.emptyTexture,textureArray2:Aa.emptyTexture,numSplats:0},update:e=>(e.textureArray1=this.extSplats?.textures[0]??Aa.emptyTexture,e.textureArray2=this.extSplats?.textures[1]??Aa.emptyTexture,e.numSplats=this.extSplats?.numSplats??0,e)}),this.extSplats=e}},Ma=G(`
  vec3 evaluateExtSH1(uvec4 packed, vec3 viewDir) {
    vec3 sh1_0 = decodeExtRgb(packed.x);
    vec3 sh1_1 = decodeExtRgb(packed.y);
    vec3 sh1_2 = decodeExtRgb(packed.z);

    return sh1_0 * (-0.4886025 * viewDir.y)
      + sh1_1 * (0.4886025 * viewDir.z)
      + sh1_2 * (-0.4886025 * viewDir.x);
  }
`),Na=G(`
  vec3 evaluateExtSH12(uvec4 packed1, uvec4 packed2, vec3 viewDir) {
    vec3 sh1_0 = decodeExtRgb(packed1.x);
    vec3 sh1_1 = decodeExtRgb(packed1.y);
    vec3 sh1_2 = decodeExtRgb(packed1.z);

    vec3 sh2_0 = decodeExtRgb(packed1.w);
    vec3 sh2_1 = decodeExtRgb(packed2.x);
    vec3 sh2_2 = decodeExtRgb(packed2.y);
    vec3 sh2_3 = decodeExtRgb(packed2.z);
    vec3 sh2_4 = decodeExtRgb(packed2.w);

    vec3 sh1Rgb = sh1_0 * (-0.4886025 * viewDir.y)
      + sh1_1 * (0.4886025 * viewDir.z)
      + sh1_2 * (-0.4886025 * viewDir.x);

    vec3 sh2Rgb = sh2_0 * (1.0925484 * viewDir.x * viewDir.y)
      + sh2_1 * (-1.0925484 * viewDir.y * viewDir.z)
      + sh2_2 * (0.3153915 * (2.0 * viewDir.z * viewDir.z - viewDir.x * viewDir.x - viewDir.y * viewDir.y))
      + sh2_3 * (-1.0925484 * viewDir.x * viewDir.z)
      + sh2_4 * (0.5462742 * (viewDir.x * viewDir.x - viewDir.y * viewDir.y));

    return sh1Rgb + sh2Rgb;
  }
`),Pa=G(`
  vec3 evaluateExtSH3(uvec4 packedA, uvec4 packedB, vec3 viewDir) {
    vec3 sh3_0 = decodeExtRgb(packedA.x);
    vec3 sh3_1 = decodeExtRgb(packedA.y);
    vec3 sh3_2 = decodeExtRgb(packedA.z);
    vec3 sh3_3 = decodeExtRgb(packedA.w);
    vec3 sh3_4 = decodeExtRgb(packedB.x);
    vec3 sh3_5 = decodeExtRgb(packedB.y);
    vec3 sh3_6 = decodeExtRgb(packedB.z);

    float xx = viewDir.x * viewDir.x;
    float yy = viewDir.y * viewDir.y;
    float zz = viewDir.z * viewDir.z;
    float xy = viewDir.x * viewDir.y;
    float yz = viewDir.y * viewDir.z;
    float zx = viewDir.z * viewDir.x;

    return sh3_0 * (-0.5900436 * viewDir.y * (3.0 * xx - yy))
      + sh3_1 * (2.8906114 * xy * viewDir.z) +
      + sh3_2 * (-0.4570458 * viewDir.y * (4.0 * zz - xx - yy))
      + sh3_3 * (0.3731763 * viewDir.z * (2.0 * zz - 3.0 * xx - 3.0 * yy))
      + sh3_4 * (-0.4570458 * viewDir.x * (4.0 * zz - xx - yy))
      + sh3_5 * (1.4453057 * viewDir.z * (xx - yy))
      + sh3_6 * (-0.5900436 * viewDir.x * (xx - 3.0 * yy));
  }
`);function Fa({coord:e,viewDir:t,numSh:n,sh1Texture:r,sh2Texture:i,sh3TextureA:a,sh3TextureB:o}){return new H({inTypes:{coord:`ivec3`,viewDir:`vec3`,numSh:`int`,sh1Texture:`usampler2DArray`,sh2Texture:`usampler2DArray`,sh3TextureA:`usampler2DArray`,sh3TextureB:`usampler2DArray`},outTypes:{rgb:`vec3`},inputs:{coord:e,viewDir:t,numSh:n,sh1Texture:r,sh2Texture:i,sh3TextureA:a,sh3TextureB:o},globals:()=>[Ma,Na,Pa],statements:({inputs:e,outputs:t})=>{let n=[`vec3 rgb = vec3(0.0);`];return e.sh1Texture&&(e.sh2Texture?(n.push(...W(`\n            if (${e.numSh} == 1) {\n              rgb = evaluateExtSH1(texelFetch(${e.sh1Texture}, ${e.coord}, 0), ${e.viewDir});\n            } else if (${e.numSh} >= 2) {\n              rgb = evaluateExtSH12(texelFetch(${e.sh1Texture}, ${e.coord}, 0), texelFetch(${e.sh2Texture}, ${e.coord}, 0), ${e.viewDir});\n            `)),e.sh3TextureA&&e.sh3TextureB&&n.push(...W(`\n              if (${e.numSh} >= 3) {\n                rgb += evaluateExtSH3(texelFetch(${e.sh3TextureA}, ${e.coord}, 0), texelFetch(${e.sh3TextureB}, ${e.coord}, 0), ${e.viewDir});\n              }\n            `)),n.push(`}`)):n.push(...W(`\n            if (${e.numSh} >= 1) {\n              rgb = evaluateExtSH1(texelFetch(${e.sh1Texture}, ${e.coord}, 0), ${e.viewDir});\n            }\n            `))),n.push(`${t.rgb} = rgb;`),n}}).outputs}function Ia(e,t,n,r,i,a,o){let s=new O(e,t,n,r);return s.format=i,s.type=a,s.internalFormat=o,s.needsUpdate=!0,s}var Y,La=typeof TextDecoder<`u`?new TextDecoder(`utf-8`,{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error(`TextDecoder not available`)}};typeof TextDecoder<`u`&&La.decode();var Ra=null;function za(){return Ra!==null&&Ra.byteLength!==0||(Ra=new Uint8Array(Y.memory.buffer)),Ra}function Ba(e,t){return e>>>=0,La.decode(za().subarray(e,e+t))}function Va(e,t){try{return e.apply(this,t)}catch(e){let t=function(e){let t=Y.__externref_table_alloc();return Y.__wbindgen_export_3.set(t,e),t}(e);Y.__wbindgen_exn_store(t)}}var Ha=0,Ua=typeof TextEncoder<`u`?new TextEncoder(`utf-8`):{encode:()=>{throw Error(`TextEncoder not available`)}},Wa=typeof Ua.encodeInto==`function`?function(e,t){return Ua.encodeInto(e,t)}:function(e,t){let n=Ua.encode(e);return t.set(n),{read:e.length,written:n.length}},Ga=null;function Ka(){return(Ga===null||!0===Ga.buffer.detached||Ga.buffer.detached===void 0&&Ga.buffer!==Y.memory.buffer)&&(Ga=new DataView(Y.memory.buffer)),Ga}function qa(e,t,n,r,i,a,o,s,c,l,u,d,f){return Y.raycast_packed_buffer(e,t,n,r,i,a,o,s,c,l,u,d,f)}function Ja(e,t,n,r,i,a,o,s,c,l){return Y.raycast_ext_buffers(e,t,n,r,i,a,o,s,c,l)}function Ya(e){let t=Y.__wbindgen_export_3.get(e);return Y.__externref_table_dealloc(e),t}function Xa(e){let t=Y.decode_rad_header(e);if(t[2])throw Ya(t[1]);return Ya(t[0])}function Za(){let e={wbg:{}};return e.wbg.__wbg_buffer_609cc3eee51ed158=function(e){return e.buffer},e.wbg.__wbg_error_7534b8e9a36f1ab4=function(e,t){let n,r;try{n=e,r=t,console.error(Ba(e,t))}finally{Y.__wbindgen_free(n,r,1)}},e.wbg.__wbg_length_3b4f022188ae8db6=function(e){return e.length},e.wbg.__wbg_length_6ca527665d89694d=function(e){return e.length},e.wbg.__wbg_length_a446193dc22c12f8=function(e){return e.length},e.wbg.__wbg_new_405e22f390576ce2=function(){return{}},e.wbg.__wbg_new_78feb108b6472713=function(){return[]},e.wbg.__wbg_new_8a6f238a6ece86ea=function(){return Error()},e.wbg.__wbg_new_a12002a7f91c75be=function(e){return new Uint8Array(e)},e.wbg.__wbg_new_e3b321dcfef89fc7=function(e){return new Uint32Array(e)},e.wbg.__wbg_newwithbyteoffsetandlength_e6b7e69acd4c7354=function(e,t,n){return new Float32Array(e,t>>>0,n>>>0)},e.wbg.__wbg_newwithbyteoffsetandlength_f1dead44d1fc7212=function(e,t,n){return new Uint32Array(e,t>>>0,n>>>0)},e.wbg.__wbg_newwithlength_5a5efe313cfd59f1=function(e){return new Float32Array(e>>>0)},e.wbg.__wbg_set_10bad9bee0e9c58b=function(e,t,n){e.set(t,n>>>0)},e.wbg.__wbg_set_37837023f3d740e8=function(e,t,n){e[t>>>0]=n},e.wbg.__wbg_set_3f1d0b984ed272ed=function(e,t,n){e[t]=n},e.wbg.__wbg_set_65595bdd868b3009=function(e,t,n){e.set(t,n>>>0)},e.wbg.__wbg_set_bb8cecf6a62b9f46=function(){return Va(function(e,t,n){return Reflect.set(e,t,n)},arguments)},e.wbg.__wbg_set_d23661d19148b229=function(e,t,n){e.set(t,n>>>0)},e.wbg.__wbg_stack_0ed75d68575b0f3c=function(e,t){let n=function(e,t,n){if(n===void 0){let n=Ua.encode(e),r=t(n.length,1)>>>0;return za().subarray(r,r+n.length).set(n),Ha=n.length,r}let r=e.length,i=t(r,1)>>>0,a=za(),o=0;for(;o<r;o++){let t=e.charCodeAt(o);if(t>127)break;a[i+o]=t}if(o!==r){o!==0&&(e=e.slice(o)),i=n(i,r,r=o+3*e.length,1)>>>0;let t=za().subarray(i+o,i+r);o+=Wa(e,t).written,i=n(i,r,o,1)>>>0}return Ha=o,i}(t.stack,Y.__wbindgen_malloc,Y.__wbindgen_realloc),r=Ha;Ka().setInt32(e+4,r,!0),Ka().setInt32(e+0,n,!0)},e.wbg.__wbg_subarray_3aaeec89bb2544f0=function(e,t,n){return e.subarray(t>>>0,n>>>0)},e.wbg.__wbindgen_bigint_from_u64=function(e){return BigInt.asUintN(64,e)},e.wbg.__wbindgen_error_new=function(e,t){return Error(Ba(e,t))},e.wbg.__wbindgen_init_externref_table=function(){let e=Y.__wbindgen_export_3,t=e.grow(4);e.set(0,void 0),e.set(t+0,void 0),e.set(t+1,null),e.set(t+2,!0),e.set(t+3,!1)},e.wbg.__wbindgen_memory=function(){return Y.memory},e.wbg.__wbindgen_number_new=function(e){return e},e.wbg.__wbindgen_string_new=function(e,t){return Ba(e,t)},e.wbg.__wbindgen_throw=function(e,t){throw Error(Ba(e,t))},e}async function Qa(e){if(Y!==void 0)return Y;e!==void 0&&(Object.getPrototypeOf(e)===Object.prototype?{module_or_path:e}=e:console.warn(`using deprecated parameters for the initialization function; pass a single object instead`)),e===void 0&&(e=(e=>e.includes(`/.vite/`)?e.replace(/\.vite\/[^?#]*/,()=>`@miris-inc/three/dist/spark_rs_bg.wasm`):e)(new URL(``+new URL(`spark_rs_bg-DHMgJ098.wasm`,import.meta.url).href,``+import.meta.url).href));let t=Za();(typeof e==`string`||typeof Request==`function`&&e instanceof Request||typeof URL==`function`&&e instanceof URL)&&(e=fetch(e));let{instance:n,module:r}=await async function(e,t){if(typeof Response==`function`&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming==`function`)try{return await WebAssembly.instantiateStreaming(e,t)}catch(t){if(e.headers.get(`Content-Type`)==`application/wasm`)throw t;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",t)}let n=await e.arrayBuffer();return await WebAssembly.instantiate(n,t)}{let n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}}(await e,t);return function(e,t){return Y=e.exports,Qa.__wbindgen_wasm_module=t,Ga=null,Ra=null,Y.__wbindgen_start(),Y}(n,r)}var $a=class e{constructor({renderer:e}={}){this.renderer=e,this.capacity=0,this.count=0}dispose(){this.target&&=(this.target.dispose(),void 0)}static ensureBuffer(e,t){let n=4*(Math.ceil(Math.max(1,e)/I)*I);if(t.byteLength>=n)return t;let r=new ArrayBuffer(n);return t instanceof ArrayBuffer?r:new t.constructor(r)}ensureBuffer(t,n){return e.ensureBuffer(t,n)}ensureCapacity(e){let{width:t,height:n,depth:r,maxSplats:i}=K(e);(!this.target||i>this.capacity)&&(this.dispose(),this.capacity=i,this.target=new et(t,n,r,{depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,magFilter:1003,minFilter:1003}),this.target.texture.format=1023,this.target.texture.type=1009,this.target.texture.internalFormat=`RGBA8`,this.target.scissorTest=!0)}prepareProgramMaterial(t){let n=e.readbackProgram.get(t);if(!n){let r=U({index:`int`},{rgba8:`vec4`},({index:e})=>(t.inputs.index=e,{rgba8:new Hi({rgba8:t.outputs.rgba8})}));e.programTemplate||=new $i(`precision highp float;
precision highp int;
precision highp sampler2D;
precision highp usampler2D;
precision highp isampler2D;
precision highp sampler2DArray;
precision highp usampler2DArray;
precision highp isampler2DArray;
precision highp sampler3D;
precision highp usampler3D;
precision highp isampler3D;

#include <splatDefines>

uniform uint targetLayer;
uniform int targetBase;
uniform int targetCount;

out vec4 target;

{{ GLOBALS }}

void computeReadback(int index) {
    {{ STATEMENTS }}
}

void main() {
    int targetIndex = int(targetLayer << SPLAT_TEX_LAYER_BITS) + int(uint(gl_FragCoord.y) << SPLAT_TEX_WIDTH_BITS) + int(gl_FragCoord.x);
    int index = targetIndex - targetBase;

    if ((index >= 0) && (index < targetCount)) {
        computeReadback(index);
    } else {
        target = vec4(0.0, 0.0, 0.0, 0.0);
    }
}`),n=new Qi({graph:r,inputs:{index:`index`},outputs:{rgba8:`target`},template:e.programTemplate}),Object.assign(n.uniforms,{targetLayer:{value:0},targetBase:{value:0},targetCount:{value:0}}),e.readbackProgram.set(t,n)}let r=n.prepareMaterial();return e.fullScreenQuad.material=r,{program:n,material:r}}saveRenderState(e){return{target:e.getRenderTarget(),xrEnabled:e.xr.enabled,autoClear:e.autoClear}}resetRenderState(e,t){e.setRenderTarget(t.target),e.xr.enabled=t.xrEnabled,e.autoClear=t.autoClear}process({count:t,material:n}){let r=this.renderer;if(!r)throw Error(`No renderer`);if(!this.target)throw Error(`No target`);let i=4194304;n.uniforms.targetBase.value=0,n.uniforms.targetCount.value=t;let a=0;for(;a<t;){let o=Math.floor(a/i),s=o*i,c=Math.min(Yn,Math.ceil((t-s)/I));n.uniforms.targetLayer.value=o,this.target.scissor.set(0,0,I,c),r.setRenderTarget(this.target,o),r.xr.enabled=!1,r.autoClear=!1,e.fullScreenQuad.render(r),a+=I*c}this.count=t}async read({readback:e}){let t=this.renderer;if(!t)throw Error(`No renderer`);if(!this.target)throw Error(`No target`);let n=Math.ceil(this.count/I)*I;if(e.byteLength<4*n)throw Error(`Readback buffer too small: ${e.byteLength} < ${4*n}`);let r=new Uint8Array(e instanceof ArrayBuffer?e:e.buffer),i=4194304,a=0,o=[];for(;a<this.count;){let e=Math.floor(a/i),n=e*i,s=Math.min(Yn,Math.ceil((this.count-n)/I));t.setRenderTarget(this.target,e);let c=I*s*4,l=r.subarray(4*n,4*n+c),u=t?.readRenderTargetPixelsAsync(this.target,0,0,I,s,l);o.push(u),a+=I*s}return Promise.all(o).then(()=>e)}render({reader:e,count:t,renderer:n}){if(this.renderer=n||this.renderer,!this.renderer)throw Error(`No renderer`);this.ensureCapacity(t);let{program:r,material:i}=this.prepareProgramMaterial(e);r.update();let a=this.saveRenderState(this.renderer);this.process({count:t,material:i}),this.resetRenderState(this.renderer,a)}async readback({readback:e}){if(!this.renderer)throw Error(`No renderer`);let t=this.saveRenderState(this.renderer),n=this.read({readback:e});return this.resetRenderState(this.renderer,t),n}async renderReadback({reader:e,count:t,renderer:n,readback:r}){if(this.renderer=n||this.renderer,!this.renderer)throw Error(`No renderer`);this.ensureCapacity(t);let{program:i,material:a}=this.prepareProgramMaterial(e);i.update();let o=this.saveRenderState(this.renderer);this.process({count:t,material:a});let s=this.read({readback:r});return this.resetRenderState(this.renderer,o),s}getTexture(){return this.target?.texture}};$a.programTemplate=null,$a.readbackProgram=new Map,$a.fullScreenQuad=new Xr(new pe({visible:!1}));var eo=$a,to=class e{constructor(t={}){if(this.capacity=0,this.count=0,this.array=null,this.readback=null,this.source=null,this.needsUpdate=!0,this.dyno=new Ui({key:`rgbaArray`,type:ro,globals:()=>[io],value:{texture:e.getEmpty(),count:0},update:e=>(e.texture=this.getTexture(),e.count=this.count,e)}),t.array){this.array=t.array;let e=Math.floor(this.array.length/4);this.capacity=Math.ceil(e/I)*I,this.capacity>e&&(this.array=new Uint8Array(4*this.capacity),this.array.set(t.array)),this.count=Math.min(e,t.count??1/0)}else this.capacity=t.capacity??0,this.count=0}dispose(){this.readback&&=(this.readback.dispose(),null),this.source&&=(this.source.dispose(),null)}ensureCapacity(e){if(!this.array||e>(this.array?.length??0)/4){this.capacity=K(e).maxSplats;let t=new Uint8Array(4*this.capacity);this.array&&t.set(this.array),this.array=t}return this.array}getTexture(){let t=this.readback?.getTexture();return(this.source||this.array)&&(t=this.maybeUpdateSource()),t??e.getEmpty()}maybeUpdateSource(){if(!this.array)throw Error(`No array`);if(this.needsUpdate||!this.source){if(this.needsUpdate=!1,this.source){let{width:e,height:t,depth:n}=this.source.image;this.capacity!==e*t*n&&(this.source.dispose(),this.source=null)}if(this.source)this.array.buffer!==this.source.image.data.buffer&&(this.source.image.data=new Uint8Array(this.array.buffer));else{let{width:e,height:t,depth:n}=K(this.capacity);this.source=new O(this.array,e,t,n),this.source.format=C,this.source.type=v,this.source.internalFormat=`RGBA8`,this.source.needsUpdate=!0}this.source.needsUpdate=!0}return this.source}render({reader:e,count:t,renderer:n}){this.readback||=new eo({renderer:n}),this.readback.render({reader:e,count:t,renderer:n}),this.capacity=this.readback.capacity,this.count=this.readback.count}fromPackedSplats({packedSplats:t,base:n,count:r,renderer:i}){let{dynoSplats:a,dynoBase:o,dynoCount:s,reader:c}=e.makeDynos();return a.packedSplats=t,o.value=n,s.value=r,this.render({reader:c,count:r,renderer:i}),this}async read(){if(!this.readback)throw Error(`No readback`);return(!this.array||this.array.length<4*this.count)&&(this.array=new Uint8Array(4*this.capacity)),(await this.readback.readback({readback:this.array})).subarray(0,4*this.count)}async getArray(){if(this.readback)return await this.read();if(this.array)return this.array;throw Error(`No array`)}static getEmpty(){return e.emptySource||(e.emptySource=new O(new Uint8Array(4),1,1,1),e.emptySource.format=C,e.emptySource.type=v,e.emptySource.internalFormat=`RGBA8`,e.emptySource.needsUpdate=!0),e.emptySource}static makeDynos(){if(!e.dynos){let t=new ps,n=new Gi({value:0}),r=new Gi({value:0}),i=U({index:`int`},{rgba8:`vec4`},({index:e})=>{if(!e)throw Error(`index is undefined`);return e=aa(e,n),{rgba8:J(((e,t,n,r)=>new bi({packedSplats:e,index:t,base:n,count:r}))(t,e,n,r)).outputs.rgba}});e.dynos={dynoSplats:t,dynoBase:n,dynoCount:r,reader:i}}return e.dynos}};to.emptySource=null,to.dynos=null;var no=to,ro={type:`RgbaArray`},io=G(`
  struct RgbaArray {
    sampler2DArray texture;
    int count;
  };
`);function ao(e){switch(e){case`all`:return 0;case`plane`:return 1;case`sphere`:return 2;case`box`:return 3;case`ellipsoid`:return 4;case`cylinder`:return 5;case`capsule`:return 6;case`infinite_cone`:return 7;default:throw Error(`Unknown SDF type: ${e}`)}}function oo(e){switch(e){case`multiply`:return 0;case`set_rgb`:return 1;case`add_rgba`:return 2;default:throw Error(`Unknown blend mode: ${e}`)}}var so=class extends l{constructor(e={}){super();let{type:t,invert:n,opacity:r,color:i,displace:a,radius:o}=e;this.type=t??`sphere`,this.invert=n??!1,this.opacity=r??1,this.color=i??new w(1,1,1),this.displace=a??new k(0,0,0),this.radius=o??0}},co=class e extends l{constructor(t={}){let{name:n,rgbaBlendMode:r=`multiply`,sdfSmooth:i=0,softEdge:a=0,invert:o=!1,sdfs:s=null}=t;super(),this.rgbaBlendMode=r,this.sdfSmooth=i,this.softEdge=a,this.invert=o,this.sdfs=s,this.ordering=e.nextOrdering++,this.name=n??`Edit ${this.ordering}`}addSdf(e){this.sdfs??=[],this.sdfs.includes(e)||this.sdfs.push(e)}removeSdf(e){this.sdfs!=null&&(this.sdfs=this.sdfs.filter(t=>t!==e))}};co.nextOrdering=1;var lo=co,uo=class{constructor({maxSdfs:e,maxEdits:t}){this.maxSdfs=Math.max(16,e??0),this.numSdfs=0,this.sdfData=new Uint32Array(8*this.maxSdfs*4),this.sdfFloatData=new Float32Array(this.sdfData.buffer),this.sdfTexture=this.newSdfTexture(this.sdfData,this.maxSdfs),this.dynoSdfArray=new Ui({key:`sdfArray`,type:fo,globals:()=>[po],value:{numSdfs:0,sdfTexture:this.sdfTexture},update:e=>(e.numSdfs=this.numSdfs,e.sdfTexture=this.sdfTexture,e)}),this.maxEdits=Math.max(16,t??0),this.numEdits=0,this.editData=new Uint32Array(4*this.maxEdits),this.editFloatData=new Float32Array(this.editData.buffer),this.dynoNumEdits=new Gi({value:0}),this.dynoEdits=this.newEdits(this.editData,this.maxEdits)}dispose(){this.sdfTexture.dispose()}newSdfTexture(e,t){let n=new Le(e,8,t,r,D);return n.internalFormat=`RGBA32UI`,n.needsUpdate=!0,n}newEdits(e,t){return new Ui({key:`edits`,type:`uvec4`,count:t,globals:()=>[mo],value:e})}ensureCapacity({maxSdfs:e,maxEdits:t}){let n=!1;return e>this.sdfTexture.image.height&&(this.sdfTexture.dispose(),this.maxSdfs=Math.max(2*this.maxSdfs,e),this.sdfData=new Uint32Array(8*this.maxSdfs*4),this.sdfFloatData=new Float32Array(this.sdfData.buffer),this.sdfTexture=this.newSdfTexture(this.sdfData,this.maxSdfs)),t>(this.dynoEdits.count??0)&&(this.maxEdits=Math.max(2*this.maxEdits,t),this.editData=new Uint32Array(4*this.maxEdits),this.editFloatData=new Float32Array(this.editData.buffer),this.dynoEdits=this.newEdits(this.editData,this.maxEdits),n=!0),n}updateEditData(e,t){let n=this.editData[e]!==t;return this.editData[e]=t,n}updateEditFloatData(e,t){ho[0]=t;let n=this.editFloatData[e]!==ho[0];return n&&(this.editFloatData[e]=ho[0]),n}encodeEdit(e,{sdfFirst:t,sdfCount:n,invert:r,rgbaBlendMode:i,softEdge:a,sdfSmooth:o}){let s=4*e,c=!1;return c=this.updateEditData(s+0,i|(r?256:0))||c,c=this.updateEditData(s+1,t|n<<16)||c,c=this.updateEditFloatData(s+2,a)||c,c=this.updateEditFloatData(s+3,o)||c,c}updateSdfData(e,t){let n=this.sdfData[e]!==t;return this.sdfData[e]=t,n}updateSdfFloatData(e,t){ho[0]=t;let n=this.sdfFloatData[e]!==ho[0];return n&&(this.sdfFloatData[e]=ho[0]),n}encodeSdf(e,{sdfType:t,invert:n,center:r,quaternion:i,scale:a,sizes:o},s){let c=32*e,l=t|(n?256:0),u=!1;u=this.updateSdfFloatData(c+0,r?.x??0)||u,u=this.updateSdfFloatData(c+1,r?.y??0)||u,u=this.updateSdfFloatData(c+2,r?.z??0)||u,u=this.updateSdfData(c+3,l)||u,u=this.updateSdfFloatData(c+4,i?.x??0)||u,u=this.updateSdfFloatData(c+5,i?.y??0)||u,u=this.updateSdfFloatData(c+6,i?.z??0)||u,u=this.updateSdfFloatData(c+7,i?.w??0)||u,u=this.updateSdfFloatData(c+8,a?.x??0)||u,u=this.updateSdfFloatData(c+9,a?.y??0)||u,u=this.updateSdfFloatData(c+10,a?.z??0)||u,u=this.updateSdfData(c+11,0)||u,u=this.updateSdfFloatData(c+12,o?.x??0)||u,u=this.updateSdfFloatData(c+13,o?.y??0)||u,u=this.updateSdfFloatData(c+14,o?.z??0)||u,u=this.updateSdfFloatData(c+15,o?.w??0)||u;let d=Math.min(4,s.length);for(let e=0;e<d;++e){let t=c+16+4*e;u=this.updateSdfFloatData(t+0,s[e].x)||u,u=this.updateSdfFloatData(t+1,s[e].y)||u,u=this.updateSdfFloatData(t+2,s[e].z)||u,u=this.updateSdfFloatData(t+3,s[e].w)||u}return u}update(e){let t=e.reduce((e,{sdfs:t})=>e+t.length,0),n=this.ensureCapacity({maxEdits:e.length,maxSdfs:t}),r=[new j,new j],i=new k,a=new E,o=new k,s=new j,c=0,l=n;e.length!==this.dynoNumEdits.value&&(this.dynoNumEdits.value=e.length,this.numEdits=e.length,l=!0);for(let[t,{edit:n,sdfs:u}]of e.entries()){l=this.encodeEdit(t,{sdfFirst:c,sdfCount:u.length,invert:n.invert,rgbaBlendMode:oo(n.rgbaBlendMode),softEdge:n.softEdge,sdfSmooth:n.sdfSmooth})||l;let e=!1;for(let t of u)s.set(t.scale.x,t.scale.y,t.scale.z,t.radius),t.scale.setScalar(1),t.updateMatrixWorld(),t.matrixWorld.clone().invert().decompose(i,a,o),t.scale.set(s.x,s.y,s.z),t.updateMatrixWorld(),r[0].set(t.color.r,t.color.g,t.color.b,t.opacity),r[1].set(t.displace.x,t.displace.y,t.displace.z,1),e=this.encodeSdf(c,{sdfType:ao(t.type),invert:t.invert,center:i,quaternion:a,scale:o,sizes:s},r)||e,c+=1;this.numSdfs=c,e&&(this.sdfTexture.needsUpdate=!0),l||=e}return{updated:l,dynoUpdated:n}}modify(e){return function(e,t,n,r){return new H({inTypes:{gsplat:q,sdfArray:fo,numEdits:`int`,rgbaDisplaceEdits:`uvec4`},outTypes:{gsplat:q},globals:()=>[po,mo],inputs:{gsplat:e,sdfArray:t,numEdits:n,rgbaDisplaceEdits:r},statements:({inputs:e,outputs:t})=>{let{sdfArray:n,numEdits:r,rgbaDisplaceEdits:i}=e,{gsplat:a}=t;return W(`\n        ${a} = ${e.gsplat};\n        if (isGsplatActive(${a}.flags)) {\n          for (int editIndex = 0; editIndex < ${r}; ++editIndex) {\n            applyPackedRgbaDisplaceEdit(\n              ${i}[editIndex], ${n}.sdfTexture, ${n}.numSdfs,\n              ${a}.center, ${a}.rgba\n            );\n          }\n        }\n      `)}}).outputs.gsplat}(e,this.dynoSdfArray,this.dynoNumEdits,this.dynoEdits)}modifyCov(e){return function(e,t,n,r){return new H({inTypes:{covsplat:ai,sdfArray:fo,numEdits:`int`,rgbaDisplaceEdits:`uvec4`},outTypes:{covsplat:ai},globals:()=>[po,mo],inputs:{covsplat:e,sdfArray:t,numEdits:n,rgbaDisplaceEdits:r},statements:({inputs:e,outputs:t})=>{let{sdfArray:n,numEdits:r,rgbaDisplaceEdits:i}=e,{covsplat:a}=t;return W(`\n        ${a} = ${e.covsplat};\n        if (isCovSplatActive(${a}.flags)) {\n          for (int editIndex = 0; editIndex < ${r}; ++editIndex) {\n            applyPackedRgbaDisplaceEdit(\n              ${i}[editIndex], ${n}.sdfTexture, ${n}.numSdfs,\n              ${a}.center, ${a}.rgba\n            );\n          }\n        }\n      `)}}).outputs.covsplat}(e,this.dynoSdfArray,this.dynoNumEdits,this.dynoEdits)}},fo={type:`SdfArray`},po=G(`
  struct SdfArray {
    int numSdfs;
    usampler2D sdfTexture;
  };

  void unpackSdfArray(
    usampler2D sdfTexture, int sdfIndex, out uint flags,
    out vec3 center, out vec4 quaternion, out vec3 scale, out vec4 sizes,
    int numValues, out vec4 values[4]
  ) {
    uvec4 temp = texelFetch(sdfTexture, ivec2(0, sdfIndex), 0);
    flags = temp.w;
    center = vec3(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z));

    temp = texelFetch(sdfTexture, ivec2(1, sdfIndex), 0);
    quaternion = vec4(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z), uintBitsToFloat(temp.w));

    temp = texelFetch(sdfTexture, ivec2(2, sdfIndex), 0);
    scale = vec3(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z));

    temp = texelFetch(sdfTexture, ivec2(3, sdfIndex), 0);
    sizes = vec4(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z), uintBitsToFloat(temp.w));

    for (int i = 0; i < numValues; ++i) {
      temp = texelFetch(sdfTexture, ivec2(4 + i, sdfIndex), 0);
      values[i] = vec4(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z), uintBitsToFloat(temp.w));
    }
  }

  const uint SDF_FLAG_TYPE = 0xFFu;
  const uint SDF_FLAG_INVERT = 1u << 8u;

  const uint SDF_TYPE_ALL = 0u;
  const uint SDF_TYPE_PLANE = 1u;
  const uint SDF_TYPE_SPHERE = 2u;
  const uint SDF_TYPE_BOX = 3u;
  const uint SDF_TYPE_ELLIPSOID = 4u;
  const uint SDF_TYPE_CYLINDER = 5u;
  const uint SDF_TYPE_CAPSULE = 6u;
  const uint SDF_TYPE_INFINITE_CONE = 7u;

  float evaluateSdfArray(
    usampler2D sdfTexture, int numSdfs, int sdfFirst, int sdfCount, vec3 pos,
    float smoothK, int numValues, out vec4 outValues[4]
  ) {
    float distanceAccum = (smoothK == 0.0) ? 1.0 / 0.0 : 0.0;
    float maxExp = -1.0 / 0.0;
    for (int i = 0; i < numValues; ++i) {
        outValues[i] = vec4(0.0);
    }

    uint flags;
    vec3 center, scale;
    vec4 quaternion, sizes;
    vec4 values[4];

    int sdfLast = min(sdfFirst + sdfCount, numSdfs);
    for (int index = sdfFirst; index < sdfLast; ++index) {
      unpackSdfArray(sdfTexture, index, flags, center, quaternion, scale, sizes, numValues, values);
      uint sdfType = flags & SDF_FLAG_TYPE;
      vec3 sdfPos = quatVec(quaternion, pos * scale) + center;

      float distance;
      switch (sdfType) {
        case SDF_TYPE_ALL:
          distance = -1.0 / 0.0;
          break;
        case SDF_TYPE_PLANE: {
          distance = sdfPos.z;
          break;
        }
        case SDF_TYPE_SPHERE: {
          distance = length(sdfPos) - sizes.w;
          break;
        }
        case SDF_TYPE_BOX: {
          vec3 q = abs(sdfPos) - sizes.xyz + sizes.w;
          distance = length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - sizes.w;
          break;
        }
        case SDF_TYPE_ELLIPSOID: {
          vec3 sizes = sizes.xyz;
          float k0 = length(sdfPos / sizes);
          float k1 = length(sdfPos / dot(sizes, sizes));
          distance = k0 * (k0 - 1.0) / k1;
          break;
        }
        case SDF_TYPE_CYLINDER: {
          vec2 d = abs(vec2(length(sdfPos.xz), sdfPos.y)) - sizes.wy;
          distance = min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
          break;
        }
        case SDF_TYPE_CAPSULE: {
          sdfPos.y -= clamp(sdfPos.y, -0.5 * sizes.y, 0.5 * sizes.y);
          distance = length(sdfPos) - sizes.w;
          break;
        }
        case SDF_TYPE_INFINITE_CONE: {
          float angle = 0.25 * PI * sizes.w;
          vec2 c = vec2(sin(angle), cos(angle));
          vec2 q = vec2(length(sdfPos.xy), -sdfPos.z);
          float d = length(q - c * max(dot(q, c), 0.0));
          distance = d * (((q.x * c.y - q.y * c.x) < 0.0) ? -1.0 : 1.0);
          break;
        }
      }

      if ((flags & SDF_FLAG_INVERT) != 0u) {
        distance = -distance;
      }

      if (smoothK == 0.0) {
        if (distance < distanceAccum) {
          distanceAccum = distance;
          for (int i = 0; i < numValues; ++i) {
            outValues[i] = values[i];
          }
        }
      } else {
        float scaledDistance = -distance / smoothK;
        if (scaledDistance > maxExp) {
          float scale = exp(maxExp - scaledDistance);
          distanceAccum *= scale;
          for (int i = 0; i < numValues; ++i) {
            outValues[i] *= scale;
          }
          maxExp = scaledDistance;
        }

        float weight = exp(scaledDistance - maxExp);
        distanceAccum += weight;
        for (int i = 0; i < numValues; ++i) {
          outValues[i] += weight * values[i];
        }
      }
    }

    if (smoothK == 0.0) {
      return distanceAccum;
    } else {
      // Very distant SDFs may result in 0 accumulation
      if (distanceAccum == 0.0) {
        return 1.0 / 0.0;
      }
      for (int i = 0; i < numValues; ++i) {
        outValues[i] /= distanceAccum;
      }
      return (-log(distanceAccum) - maxExp) * smoothK;
    }
  }

  float modulateSdfArray(
    usampler2D sdfTexture, int numSdfs, int sdfFirst, int sdfCount, vec3 pos,
    float smoothK, int numValues, out vec4 values[4],
    float softEdge, bool invert
  ) {
    float distance = evaluateSdfArray(sdfTexture, numSdfs, sdfFirst, sdfCount, pos, smoothK, numValues, values);
    if (invert) {
      distance = -distance;
    }

    return (softEdge == 0.0) ? ((distance < 0.0) ? 1.0 : 0.0)
      : clamp(-distance / softEdge + 0.5, 0.0, 1.0);
  }
`),mo=G(`
  const uint EDIT_FLAG_BLEND = 0xFFu;
  const uint EDIT_BLEND_MULTIPLY = 0u;
  const uint EDIT_BLEND_SET_RGB = 1u;
  const uint EDIT_BLEND_ADD_RGBA = 2u;
  const uint EDIT_FLAG_INVERT = 0x100u;

  void decodeEdit(
    uvec4 packedEdit, out int sdfFirst, out int sdfCount,
    out bool invert, out uint rgbaBlendMode, out float softEdge, out float sdfSmooth
  ) {
    rgbaBlendMode = packedEdit.x & EDIT_FLAG_BLEND;
    invert = (packedEdit.x & EDIT_FLAG_INVERT) != 0u;

    sdfFirst = int(packedEdit.y & 0xFFFFu);
    sdfCount = int(packedEdit.y >> 16u);

    softEdge = uintBitsToFloat(packedEdit.z);
    sdfSmooth = uintBitsToFloat(packedEdit.w);
  }

  void applyRgbaDisplaceEdit(
    usampler2D sdfTexture, int numSdfs, int sdfFirst, int sdfCount, inout vec3 pos,
    float smoothK, float softEdge, bool invert, uint rgbaBlendMode, inout vec4 rgba
  ) {
    vec4 values[4];
    float modulate = modulateSdfArray(sdfTexture, numSdfs, sdfFirst, sdfCount, pos, smoothK, 2, values, softEdge, invert);
    // On Android, moving values[0] is necessary to work around a compiler bug.
    vec4 sdfRgba = values[0];
    vec4 sdfDisplaceScale = values[1];

    vec4 target;
    switch (rgbaBlendMode) {
      case EDIT_BLEND_MULTIPLY:
        target = rgba * sdfRgba;
        break;
      case EDIT_BLEND_SET_RGB:
        target = vec4(sdfRgba.rgb, rgba.a * sdfRgba.a);
        break;
      case EDIT_BLEND_ADD_RGBA:
        target = rgba + sdfRgba;
        break;
      default:
        // Debug output if blend mode not set
        target = vec4(fract(pos), 1.0);
    }
    rgba = mix(rgba, target, modulate);
    pos += sdfDisplaceScale.xyz * modulate;
  }

  void applyPackedRgbaDisplaceEdit(uvec4 packedEdit, usampler2D sdfTexture, int numSdfs, inout vec3 pos, inout vec4 rgba) {
    int sdfFirst, sdfCount;
    bool invert;
    uint rgbaBlendMode;
    float softEdge, sdfSmooth;
    decodeEdit(packedEdit, sdfFirst, sdfCount, invert, rgbaBlendMode, softEdge, sdfSmooth);
    applyRgbaDisplaceEdit(sdfTexture, numSdfs, sdfFirst, sdfCount, pos, sdfSmooth, softEdge, invert, rgbaBlendMode, rgba);
  }
`),ho=new Float32Array(1),go=class{constructor(e){this.modifier=e,this.cache=new Map}apply(e){let t=this.cache.get(e);return t||(t=U({index:`int`},{gsplat:q},({index:t})=>{let{gsplat:n}=e.apply({index:t});return this.modifier.apply({gsplat:n})}),this.cache.set(e,t)),t}},_o=class{constructor(){this.scale=new Ki({value:-1/0}),this.rotate=new Ji({value:new E(1/0,1/0,1/0,1/0)}),this.translate=new qi({value:new k(1/0,1/0,1/0)})}apply(e){return((e,{scale:t,scales:n,rotate:r,translate:i})=>new Da({position:e,scale:t,scales:n,rotate:r,translate:i}).outputs.position)(e,{scale:this.scale,rotate:this.rotate,translate:this.translate})}applyDir(e){return((e,{scale:t,scales:n,rotate:r})=>new Oa({dir:e,scale:t,scales:n,rotate:r}).outputs.dir)(e,{rotate:this.rotate})}applyGsplat(e){return fi(e,{scale:this.scale,rotate:this.rotate,translate:this.translate})}updateFromMatrix(e){let t=new k,n=new E,r=new k;e.decompose(r,n,t);let i=(t.x+t.y+t.z)/3,a=!1;return i!==this.scale.value&&(this.scale.value=i,a=!0),r.equals(this.translate.value)||(this.translate.value.copy(r),a=!0),n.equals(this.rotate.value)||(this.rotate.value.copy(n),a=!0),a}update(e){return e.updateMatrixWorld(),this.updateFromMatrix(e.matrixWorld)}},vo=class{constructor(){this.basis=new Yi({value:new Qe}),this.offset=new qi({value:new k})}apply(e){return aa(sa(this.basis,e),this.offset)}applyDir(e){return sa(this.basis,e)}applyCovSplat(e){return new H({inTypes:{covsplat:ai,basis:`mat3`,offset:`vec3`},outTypes:{covsplat:ai},inputs:{covsplat:e,basis:this.basis,offset:this.offset},statements:({inputs:e,outputs:t})=>{let{covsplat:n,basis:r,offset:i}=e;return n&&r&&i?W(`\n          ${t.covsplat}.flags = 0u;\n          if (isCovSplatActive(${n}.flags)) {\n            ${t.covsplat}.flags = ${n}.flags;\n            ${t.covsplat}.index = ${n}.index;\n            ${t.covsplat}.rgba = ${n}.rgba;\n\n            ${t.covsplat}.center = ${r} * ${n}.center + ${i};\n            \n            mat3 cov = mat3(\n              ${n}.xxyyzz.x, ${n}.xyxzyz.x, ${n}.xyxzyz.y,\n              ${n}.xyxzyz.x, ${n}.xxyyzz.y, ${n}.xyxzyz.z,\n              ${n}.xyxzyz.y, ${n}.xyxzyz.z, ${n}.xxyyzz.z\n            );\n            cov = ${r} * cov * transpose(${r});\n            ${t.covsplat}.xxyyzz = vec3(cov[0][0], cov[1][1], cov[2][2]);\n            ${t.covsplat}.xyxzyz = vec3(cov[0][1], cov[0][2], cov[1][2]);\n          }\n        `):[`${t.covsplat}.flags = 0u;`]}}).outputs.covsplat}updateFromMatrix(e){let t=new Qe().setFromMatrix4(e),n=new k().setFromMatrixColumn(e,3),r=!t.equals(this.basis.value)||!n.equals(this.offset.value);return r&&(this.basis.value.copy(t),this.offset.value.copy(n)),r}update(e){return e.updateMatrixWorld(),this.updateFromMatrix(e.matrixWorld)}},yo=class extends l{constructor({numSplats:e,generator:t,covGenerator:n,construct:r,update:i}){if(super(),this.numSplats=e??0,this.generator=t,this.covGenerator=n,this.frameUpdate=i,this.version=0,this.mappingVersion=0,r){let e=r(this);Object.assign(this,e)}}updateVersion(){this.version+=1}updateMappingVersion(){this.mappingVersion+=1,this.version+=1}set needsUpdate(e){e&&this.updateVersion()}},bo=class e{constructor({extSplats:e,covSplats:t}={}){if(nn(this,qt),nn(this,Jt),nn(this,Yt),nn(this,Xt),nn(this,Zt),nn(this,Qt),this.time=0,this.deltaTime=0,this.viewToWorld=new A,this.viewOrigin=new k,this.viewDirection=new k,this.maxSplats=0,this.numSplats=0,this.target=null,this.mapping=[],this.version=-1,this.mappingVersion=-1,this.readback=null,this.readbackSplats=[],this.dynoSkipCache=new Map,rn(this,qt,0),rn(this,Jt,0),rn(this,Yt,0),rn(this,Xt,0),rn(this,Zt,new A),rn(this,Qt,new ie),!_r)throw Error(`Spark requires THREE.js r179 or above`);this.extSplats=e??!0,this.covSplats=t??!1}get totalGeneratorCount(){return tn(this,qt)}get frustumCulledGeneratorCount(){return tn(this,Jt)}get layersCulledGeneratorCount(){return tn(this,Yt)}get renderedGeneratorsCount(){return tn(this,Xt)}dispose(){this.target&&=(this.target.dispose(),null)}getTextures(){return this.target?this.target.textures:e.emptyTextures}generateMapping(e){let t=0,n=e.map(e=>{let n=t,r=Math.ceil(e/I)*I;return t+=r,{base:n,count:e}});return{maxSplats:t,mapping:n}}ensureGenerate({maxSplats:e}){if(this.target&&(e??1)<=this.maxSplats)return!1;this.dispose();let t=K(e??1),{width:n,height:r,depth:i}=t;if(this.maxSplats=t.maxSplats,this.target=new et(n,r,i,{depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,magFilter:1003,minFilter:1003,format:1033,type:1014}),this.target.scissorTest=!0,this.extSplats){let e=this.target.texture.clone(),t=this.target.texture.clone();t.format=C,t.type=v,t.internalFormat=`RGBA8`,this.target.textures=[this.target.texture,e,t]}else{let e=this.target.texture.clone();e.format=C,e.type=v,e.internalFormat=`RGBA8`,this.target.textures=[this.target.texture,e]}return!0}saveRenderState(e){return{target:e.getRenderTarget(),xrEnabled:e.xr.enabled,autoClear:e.autoClear}}resetRenderState(e,t){e.setRenderTarget(t.target),e.xr.enabled=t.xrEnabled,e.autoClear=t.autoClear}prepareProgramMaterial(t,n){let r=t??n;if(!r)throw Error(`Either generator or covGenerator must be provided`);let i=e.generatorProgram.get(r);i||(i=new Qi({graph:U({index:`int`},{},({index:r},i,{roots:a})=>{if(t&&(t.inputs.index=r),n&&(n.inputs.index=r),this.extSplats)if(this.covSplats)if(n){let e=Li(n.outputs.covsplat);a.push(e)}else{if(!t)throw Error(`Generator must be provided`);{let e=Li(li(t.outputs.gsplat));a.push(e)}}else{if(!t)throw Error(`Generator must be provided`);{let e=(o=t.outputs.gsplat,new Bi({gsplat:o}));a.push(e)}}else{if(this.covSplats){let r;if(n)r=n.outputs.covsplat;else{if(!t)throw Error(`Generator must be provided`);r=li(t.outputs.gsplat)}let i=oa(Ai(r).outputs.center,e.viewCenterUniform),o=sa(Ai(r).outputs.opacity,V(`float`,.5));r=ji({covsplat:r,center:i,opacity:o});let s=((e,t)=>new zi({covsplat:e,rgbMinMaxLnScaleMinMax:t}))(r,V(`vec4`,[0,1,qn,9]));a.push(s)}else{if(!t)throw Error(`Generator must be provided`);{let n=oa(J(t.outputs.gsplat).outputs.center,e.viewCenterUniform),r=sa(J(t.outputs.gsplat).outputs.opacity,V(`float`,.5)),i=Ii(ui({gsplat:t.outputs.gsplat,center:n,opacity:r}),V(`vec4`,[0,1,qn,9]));a.push(i)}}if(!t)throw Error(`Generator must be provided`)}var o}),inputs:{index:`index`},outputs:{},template:this.extSplats?e.programExtTemplate:e.programTemplate}),e.generatorProgram.set(r,i)),Object.assign(i.uniforms,{targetLayer:{value:0},targetBase:{value:0},targetCount:{value:0}});let a=i.prepareMaterial();return e.fullScreenQuad.material=a,{program:i,material:a}}static getDynoSourceTex(e){return!(e instanceof os)||e.skinning||e.rgbaDisplaceEdits?null:e.extSplats?e.extSplats.textures?.[0]??null:e.packedSplats?(e.packedSplats.lodSplats!=null&&e.context.enableLod.value?e.packedSplats.lodSplats?.source:e.packedSplats.source)??null:null}needsDyno(t,n,r){if(!e.enableDynoSkip)return!0;let i=e.getDynoSourceTex(t);if(!i)return!0;let a=this.dynoSkipCache.get(t);return!a||a.version!==t.version||a.base!==n||a.count!==r||a.texObject!==i||a.texVersion!==i.version||!a.matrixWorld.equals(t.matrixWorld)}cacheDynoGenerate(t,n,r){let i=e.getDynoSourceTex(t);this.dynoSkipCache.set(t,{version:t.version,texVersion:i?.version??-1,texObject:i??null,base:n,count:r,matrixWorld:t.matrixWorld.clone()})}generate({generator:t,covGenerator:n,base:r,count:i,renderer:a}){if(!this.target)throw Error(`Target must be initialized with ensureGenerate`);if(r+i>this.maxSplats)throw Error(`Base + count exceeds maxSplats`);let{program:o,material:s}=this.prepareProgramMaterial(t,n);o.update(),a.setRenderTarget(this.target,0);let c=Math.ceil((r+i)/I)*I,l=4194304;for(s.uniforms.targetBase.value=r,s.uniforms.targetCount.value=i;r<c;){let t=Math.floor(r/l);s.uniforms.targetLayer.value=t;let n=t*l,i=Math.floor((r-n)/I),o=Math.min(Yn,Math.ceil((c-n)/I));this.target.scissor.set(0,i,I,o-i),a.setRenderTarget(this.target,t),a.xr.enabled=!1,a.autoClear=!1,e.fullScreenQuad.render(a),r+=I*(o-i)}return{nextBase:c}}prepareGenerate({renderer:t,scene:n,time:r,camera:i,sortRadial:a,renderSize:o,previous:s,lodInstances:c}){this.viewToWorld.copy(i.matrixWorld),i.getWorldPosition(this.viewOrigin),i.getWorldDirection(this.viewDirection),e.viewCenterUniform.value.copy(this.viewOrigin),e.viewDirUniform.value.copy(this.viewDirection),e.sortRadialUniform.value=a,this.time=r,this.deltaTime=r-s.time;let l=[];n.traverse(e=>{e instanceof yo&&(i.layers&&!i.layers.test(e.layers)||l.push(e))});let u=new Set;n.traverseVisible(e=>{if(e instanceof lo){let t=e.parent;for(;t!=null&&!(t instanceof os);)t=t.parent;t??u.add(e)}});let f=Array.from(u);for(let e of l)try{e.frameUpdate?.({renderer:t,object:e,time:this.time,deltaTime:this.deltaTime,viewToWorld:this.viewToWorld,camera:i,renderSize:o,globalEdits:f,lodIndices:c&&e instanceof os?c.get(e):void 0})}catch(t){console.error(`frameUpdate error`,t),e.generator=void 0,e.covGenerator=void 0,e.generatorError=t}i.updateMatrixWorld(),tn(this,Zt).multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),tn(this,Qt).setFromProjectionMatrix(tn(this,Zt));let p=[],m=new d;rn(this,qt,0),rn(this,Yt,0),rn(this,Jt,0),n.traverseVisible(t=>{if(t instanceof yo){let n=t;if(rn(this,qt,tn(this,qt)+1),!i.layers||i.layers.test(n.layers)){if(n.localBounds&&e.doCustomBoundsFrustumCulling&&(n.updateMatrixWorld(),m.copy(n.localBounds),m.applyMatrix4(n.matrixWorld),!tn(this,Qt).intersectsBox(m)))return void rn(this,Jt,tn(this,Jt)+1);p.push(t)}else rn(this,Yt,tn(this,Yt)+1)}}),rn(this,Xt,p.length);let h=p.map(e=>e.numSplats),{maxSplats:g,mapping:_}=this.generateMapping(h),v=s.mapping.reduce((e,t)=>(e.set(t.node,t),e),new Map);this.mapping=[],this.numSplats=0,_.forEach(({base:e,count:t},n)=>{let r=p[n],i=v.get(r);i&&i.count!==r.numSplats&&r.updateMappingVersion();let{generator:a,covGenerator:o}=r;if((a||o)&&t>0){let{version:n,mappingVersion:i}=r;this.mapping.push({node:r,generator:a,covGenerator:o,version:n,mappingVersion:i,base:e,count:t}),this.numSplats=Math.max(this.numSplats,e+t)}});let{splatsUpdated:ee,mappingUpdated:y}=s.checkVersions(this.mapping);return this.version=s.version+ +!!ee,this.mappingVersion=s.mappingVersion+ +!!y,{sameMapping:!y,version:this.version,mappingVersion:this.mappingVersion,visibleGenerators:p,generate:()=>{(this.ensureGenerate({maxSplats:g})||y)&&this.dynoSkipCache.clear();let e=this.saveRenderState(t);for(let{node:e,base:n,count:r}of this.mapping){let{generator:i,covGenerator:a}=e;(i||a)&&r>0&&this.needsDyno(e,n,r)&&(this.generate({generator:i,covGenerator:a,base:n,count:r,renderer:t}),this.cacheDynoGenerate(e,n,r))}this.resetRenderState(t,e)},readback:async()=>{let e=this.getTextures();this.readbackSplats.length===0&&(this.readbackSplats=[new Zi({value:e[0],key:`extSplats`}),new Zi({value:e[1],key:`extSplats`})]),this.readbackSplats[0].value=e[0],this.readbackSplats[1].value=e[1],this.readback||=new eo({renderer:t});let n=this.readback,r=this.extSplats?8:4,i=n.ensureBuffer(this.numSplats*r,new Uint32Array),a=U({index:`int`},{rgba8:`vec4`},({index:e})=>({rgba8:new H({inTypes:{index:`int`,extSplats1:`usampler2DArray`,extSplats2:`usampler2DArray`},outTypes:{rgba8:`vec4`},inputs:{index:e,extSplats1:this.readbackSplats[0],extSplats2:this.readbackSplats[1]},statements:({inputs:e,outputs:t})=>this.extSplats?W(`\n                    int indexDiv8 = ${e.index} >> 3;\n                    ivec3 coord = splatTexCoord(indexDiv8);\n                    uvec4 packed;\n                    if ((${e.index} & 4) == 0) {\n                      packed = texelFetch(${e.extSplats1}, coord, 0);\n                    } else {\n                      packed = texelFetch(${e.extSplats2}, coord, 0);\n                    }\n\n                    int indexMod4 = ${e.index} & 3;\n                    uint data = (indexMod4 == 0) ? packed.x\n                      : (indexMod4 == 1) ? packed.y\n                      : (indexMod4 == 2) ? packed.z\n                      : packed.w;\n                    ${t.rgba8} = uintToVec4(data);\n                  `):W(`\n                  int indexDiv4 = ${e.index} >> 2;\n                  ivec3 coord = splatTexCoord(indexDiv4);\n                  uvec4 packed = texelFetch(${e.extSplats1}, coord, 0);\n\n                  int indexMod4 = ${e.index} & 3;\n                  uint data = (indexMod4 == 0) ? packed.x\n                    : (indexMod4 == 1) ? packed.y\n                    : (indexMod4 == 2) ? packed.z\n                    : packed.w;\n                  ${t.rgba8} = uintToVec4(data);\n                `)}).outputs.rgba8}));return await n.renderReadback({reader:a,count:this.numSplats*r,renderer:t,readback:i})}}}checkVersions(e){if(this.mapping.length!==e.length)return{splatsUpdated:!0,mappingUpdated:!0};let t=this.mapping.some((t,n)=>{let r=e[n];return t.node!==r.node||t.base!==r.base||t.count!==r.count||t.mappingVersion!==r.mappingVersion});return t?{splatsUpdated:!0,mappingUpdated:!0}:{splatsUpdated:this.mapping.some((t,n)=>t.version!==e[n].version),mappingUpdated:t}}};qt=new WeakMap,Jt=new WeakMap,Yt=new WeakMap,Xt=new WeakMap,Zt=new WeakMap,Qt=new WeakMap,bo.viewCenterUniform=new qi({value:new k}),bo.viewDirUniform=new qi({value:new k}),bo.sortRadialUniform=new Wi({value:!0}),bo.enableDynoSkip=!0,bo.doCustomBoundsFrustumCulling=!0,bo.emptyTexture=(()=>{let{width:e,height:t,depth:n,maxSplats:i}=K(1),a=new O(new Uint32Array(4*i),e,t,n);return a.format=r,a.type=D,a.internalFormat=`RGBA32UI`,a.needsUpdate=!0,a})(),bo.emptyTextures=[bo.emptyTexture,bo.emptyTexture],bo.programExtTemplate=new $i(`precision highp float;
precision highp int;
precision highp sampler2D;
precision highp usampler2D;
precision highp isampler2D;
precision highp sampler2DArray;
precision highp usampler2DArray;
precision highp isampler2DArray;
precision highp sampler3D;
precision highp usampler3D;
precision highp isampler3D;

#include <splatDefines>

uniform uint targetLayer;
uniform int targetBase;
uniform int targetCount;

layout(location = 0) out uvec4 target;
layout(location = 1) out uvec4 target2;
layout(location = 2) out vec4 target3;

{{ GLOBALS }}

void produceSplat(int index) {
    {{ STATEMENTS }}
}

void main() {
    int targetIndex = int(targetLayer << SPLAT_TEX_LAYER_BITS) + int(uint(gl_FragCoord.y) << SPLAT_TEX_WIDTH_BITS) + int(gl_FragCoord.x);
    int index = targetIndex - targetBase;

    
    target = uvec4(0u, 0u, 0u, 0u);
    target2 = uvec4(0u, 0u, 0u, 0u);

    
    target3 = floatToVec4(1.0 / 0.0);

    if ((index >= 0) && (index < targetCount)) {
        produceSplat(index);
    }
}`),bo.programTemplate=new $i(`precision highp float;
precision highp int;
precision highp sampler2D;
precision highp usampler2D;
precision highp isampler2D;
precision highp sampler2DArray;
precision highp usampler2DArray;
precision highp isampler2DArray;
precision highp sampler3D;
precision highp usampler3D;
precision highp isampler3D;

#include <splatDefines>

uniform uint targetLayer;
uniform int targetBase;
uniform int targetCount;

layout(location = 0) out uvec4 target;
layout(location = 1) out vec4 target3;

{{ GLOBALS }}

void produceSplat(int index) {
    {{ STATEMENTS }}
}

void main() {
    int targetIndex = int(targetLayer << SPLAT_TEX_LAYER_BITS) + int(uint(gl_FragCoord.y) << SPLAT_TEX_WIDTH_BITS) + int(gl_FragCoord.x);
    int index = targetIndex - targetBase;

    
    target = uvec4(0u, 0u, 0u, 0u);

    
    target3 = floatToVec4(1.0 / 0.0);

    if ((index >= 0) && (index < targetCount)) {
        produceSplat(index);
    }
}`),bo.generatorProgram=new Map,bo.fullScreenQuad=new Xr(new pe({visible:!1}));var xo=bo,So=class extends Oe{constructor(){super(),this.setAttribute(`position`,new a(Co,3)),this.setIndex(new a(wo,1))}},Co=new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),wo=new Uint16Array([0,1,2,0,2,3]),X,To=null;function Eo(){return To||=(ht.splatDefines=`const float LN_SCALE_MIN = -12.0;
const float LN_SCALE_MAX = 9.0;

const uint SPLAT_TEX_WIDTH_BITS = 11u;
const uint SPLAT_TEX_HEIGHT_BITS = 11u;
const uint SPLAT_TEX_DEPTH_BITS = 11u;
const uint SPLAT_TEX_LAYER_BITS = SPLAT_TEX_WIDTH_BITS + SPLAT_TEX_HEIGHT_BITS;

const uint SPLAT_TEX_WIDTH = 1u << SPLAT_TEX_WIDTH_BITS;
const uint SPLAT_TEX_HEIGHT = 1u << SPLAT_TEX_HEIGHT_BITS;
const uint SPLAT_TEX_DEPTH = 1u << SPLAT_TEX_DEPTH_BITS;

const uint SPLAT_TEX_WIDTH_MASK = SPLAT_TEX_WIDTH - 1u;
const uint SPLAT_TEX_HEIGHT_MASK = SPLAT_TEX_HEIGHT - 1u;
const uint SPLAT_TEX_DEPTH_MASK = SPLAT_TEX_DEPTH - 1u;

const uint F16_INF = 0x7c00u;
const float PI = 3.1415926535897932384626433832795;

const float INFINITY = 1.0 / 0.0;
const float NEG_INFINITY = -INFINITY;

float sqr(float x) {
    return x * x;
}

float pow4(float x) {
    float x2 = x * x;
    return x2 * x2;
}

float pow8(float x) {
    float x4 = pow4(x);
    return x4 * x4;
}

vec3 srgbToLinear(vec3 rgb) {
    return pow(rgb, vec3(2.2));
}

vec3 linearToSrgb(vec3 rgb) {
    return vec3(
        rgb.r <= 0.0031308 ? 12.92 * rgb.r : 1.055 * pow(rgb.r, 1.0 / 2.4) - 0.055,
        rgb.g <= 0.0031308 ? 12.92 * rgb.g : 1.055 * pow(rgb.g, 1.0 / 2.4) - 0.055,
        rgb.b <= 0.0031308 ? 12.92 * rgb.b : 1.055 * pow(rgb.b, 1.0 / 2.4) - 0.055
    );
}

uint encodeQuatOctXy88R8(vec4 q) {
    
    if (q.w < 0.0) {
        q = -q;
    }
    
    float theta = 2.0 * acos(q.w);
    float halfTheta = theta * 0.5;
    float s = sin(halfTheta);
    
    vec3 axis = (abs(s) < 1e-6) ? vec3(1.0, 0.0, 0.0) : q.xyz / s;
    
    
    
    float sum = abs(axis.x) + abs(axis.y) + abs(axis.z);
    vec2 p = vec2(axis.x, axis.y) / sum;
    
    if (axis.z < 0.0) {
        float oldPx = p.x;
        p.x = (1.0 - abs(p.y)) * (p.x >= 0.0 ? 1.0 : -1.0);
        p.y = (1.0 - abs(oldPx)) * (p.y >= 0.0 ? 1.0 : -1.0);
    }
    
    float u_f = p.x * 0.5 + 0.5;
    float v_f = p.y * 0.5 + 0.5;
    
    uint quantU = uint(clamp(round(u_f * 255.0), 0.0, 255.0));
    uint quantV = uint(clamp(round(v_f * 255.0), 0.0, 255.0));
    
    
    
    uint angleInt = uint(clamp(round((theta / 3.14159265359) * 255.0), 0.0, 255.0));
    
    
    return (angleInt << 16u) | (quantV << 8u) | quantU;
}

vec4 decodeQuatOctXy88R8(uint encoded) {
    
    uint quantU = encoded & uint(0xFFu);               
    uint quantV = (encoded >> 8u) & uint(0xFFu);         
    uint angleInt = encoded >> 16u;                      

    
    float u_f = float(quantU) / 255.0;
    float v_f = float(quantV) / 255.0;
    vec2 f = vec2(u_f * 2.0 - 1.0, v_f * 2.0 - 1.0);

    vec3 axis = vec3(f.xy, 1.0 - abs(f.x) - abs(f.y));
    float t = max(-axis.z, 0.0);
    axis.x += (axis.x >= 0.0) ? -t : t;
    axis.y += (axis.y >= 0.0) ? -t : t;
    axis = normalize(axis);
    
    
    float theta = (float(angleInt) / 255.0) * 3.14159265359;
    float halfTheta = theta * 0.5;
    float s = sin(halfTheta);
    float w = cos(halfTheta);
    
    return vec4(axis * s, w);
}

uint encodeQuatOctXy1010R12(vec4 q) {
    
    if (q.w < 0.0) {
        q = -q;
    }
    
    float halfTheta = acos(q.w);
    float theta = 2.0 * halfTheta;
    float s = sin(halfTheta);
    
    vec3 axis = (abs(s) < 1e-6) ? vec3(1.0, 0.0, 0.0) : q.xyz / s;
    
    
    
    float sum = abs(axis.x) + abs(axis.y) + abs(axis.z);
    vec2 p = vec2(axis.x, axis.y) / sum;
    
    if (axis.z < 0.0) {
        float oldPx = p.x;
        p.x = (1.0 - abs(p.y)) * (p.x >= 0.0 ? 1.0 : -1.0);
        p.y = (1.0 - abs(oldPx)) * (p.y >= 0.0 ? 1.0 : -1.0);
    }
    
    float u_f = p.x * 0.5 + 0.5;
    float v_f = p.y * 0.5 + 0.5;
    
    uint quantU = uint(clamp(round(u_f * 1023.0), 0.0, 1023.0));
    uint quantV = uint(clamp(round(v_f * 1023.0), 0.0, 1023.0));
    
    
    
    uint angleInt = uint(clamp(round((theta / PI) * 4095.0), 0.0, 4095.0));
    
    
    return (angleInt << 20u) | (quantV << 10u) | quantU;
}

vec4 decodeQuatOctXy1010R12(uint encoded) {
    
    uint quantU = encoded & uint(0x3FFu);               
    uint quantV = (encoded >> 10u) & uint(0x3FFu);         
    uint angleInt = encoded >> 20u;                      

    
    float u_f = float(quantU) / 1023.0;
    float v_f = float(quantV) / 1023.0;
    vec2 f = vec2(u_f * 2.0 - 1.0, v_f * 2.0 - 1.0);

    vec3 axis = vec3(f.xy, 1.0 - abs(f.x) - abs(f.y));
    float t = max(-axis.z, 0.0);
    axis.x += (axis.x >= 0.0) ? -t : t;
    axis.y += (axis.y >= 0.0) ? -t : t;
    axis = normalize(axis);
    
    
    float theta = (float(angleInt) / 4095.0) * PI;
    float halfTheta = theta * 0.5;
    float s = sin(halfTheta);
    float w = cos(halfTheta);
    
    return vec4(axis * s, w);
}

uvec4 packSplatEncoding(
    vec3 center, vec3 scales, vec4 quaternion, vec4 rgba, vec4 rgbMinMaxLnScaleMinMax
) {
    float rgbMin = rgbMinMaxLnScaleMinMax.x;
    float rgbMax = rgbMinMaxLnScaleMinMax.y;
    vec3 encRgb = (rgba.rgb - vec3(rgbMin)) / (rgbMax - rgbMin);
    uvec4 uRgba = uvec4(round(clamp(vec4(encRgb, rgba.a) * 255.0, 0.0, 255.0)));

    uint uQuat = encodeQuatOctXy88R8(quaternion);
    
    
    uvec3 uQuat3 = uvec3(uQuat & 0xffu, (uQuat >> 8u) & 0xffu, (uQuat >> 16u) & 0xffu);

    
    float lnScaleMin = rgbMinMaxLnScaleMinMax.z;
    float lnScaleMax = rgbMinMaxLnScaleMinMax.w;
    float lnScaleScale = 254.0 / (lnScaleMax - lnScaleMin);
    uvec3 uScales = uvec3(
        (scales.x == 0.0) ? 0u : uint(round(clamp((log(scales.x) - lnScaleMin) * lnScaleScale, 0.0, 254.0))) + 1u,
        (scales.y == 0.0) ? 0u : uint(round(clamp((log(scales.y) - lnScaleMin) * lnScaleScale, 0.0, 254.0))) + 1u,
        (scales.z == 0.0) ? 0u : uint(round(clamp((log(scales.z) - lnScaleMin) * lnScaleScale, 0.0, 254.0))) + 1u
    );

    
    uint word0 = uRgba.r | (uRgba.g << 8u) | (uRgba.b << 16u) | (uRgba.a << 24u);
    uint word1 = packHalf2x16(center.xy);
    uint word2 = packHalf2x16(vec2(center.z, 0.0)) | (uQuat3.x << 16u) | (uQuat3.y << 24u);
    uint word3 = uScales.x | (uScales.y << 8u) | (uScales.z << 16u) | (uQuat3.z << 24u);
    return uvec4(word0, word1, word2, word3);
}

uvec4 packSplat(vec3 center, vec3 scales, vec4 quaternion, vec4 rgba) {
    return packSplatEncoding(center, scales, quaternion, rgba, vec4(0.0, 1.0, LN_SCALE_MIN, LN_SCALE_MAX));
}

void unpackSplatEncoding(uvec4 packed, out vec3 center, out vec3 scales, out vec4 quaternion, out vec4 rgba, vec4 rgbMinMaxLnScaleMinMax) {
    uint word0 = packed.x, word1 = packed.y, word2 = packed.z, word3 = packed.w;

    uvec4 uRgba = uvec4(word0 & 0xffu, (word0 >> 8u) & 0xffu, (word0 >> 16u) & 0xffu, (word0 >> 24u) & 0xffu);
    float rgbMin = rgbMinMaxLnScaleMinMax.x;
    float rgbMax = rgbMinMaxLnScaleMinMax.y;
    rgba = (vec4(uRgba) / 255.0);
    rgba.rgb = rgba.rgb * (rgbMax - rgbMin) + rgbMin;

    center = vec4(
        unpackHalf2x16(word1),
        unpackHalf2x16(word2 & 0xffffu)
    ).xyz;

    uvec3 uScales = uvec3(word3 & 0xffu, (word3 >> 8u) & 0xffu, (word3 >> 16u) & 0xffu);
    float lnScaleMin = rgbMinMaxLnScaleMinMax.z;
    float lnScaleMax = rgbMinMaxLnScaleMinMax.w;
    float lnScaleScale = (lnScaleMax - lnScaleMin) / 254.0;
    scales = vec3(
        (uScales.x == 0u) ? 0.0 : exp(lnScaleMin + float(uScales.x - 1u) * lnScaleScale),
        (uScales.y == 0u) ? 0.0 : exp(lnScaleMin + float(uScales.y - 1u) * lnScaleScale),
        (uScales.z == 0u) ? 0.0 : exp(lnScaleMin + float(uScales.z - 1u) * lnScaleScale)
    );

    uint uQuat = ((word2 >> 16u) & 0xFFFFu) | ((word3 >> 8u) & 0xFF0000u);
    quaternion = decodeQuatOctXy88R8(uQuat);
    
    
}

void unpackSplat(uvec4 packed, out vec3 center, out vec3 scales, out vec4 quaternion, out vec4 rgba) {
    unpackSplatEncoding(packed, center, scales, quaternion, rgba, vec4(0.0, 1.0, LN_SCALE_MIN, LN_SCALE_MAX));
}

uvec4 packSplatCovEncoding(
    vec3 center, vec4 rgba, vec3 xxyyzz, vec3 xyxzyz, vec4 rgbMinMaxLnScaleMinMax
) {
    float rgbMin = rgbMinMaxLnScaleMinMax.x;
    float rgbMax = rgbMinMaxLnScaleMinMax.y;
    vec3 encRgb = (rgba.rgb - vec3(rgbMin)) / (rgbMax - rgbMin);
    uvec4 uRgba = uvec4(round(clamp(vec4(encRgb, rgba.a) * 255.0, 0.0, 255.0)));

    float lnScaleMin = rgbMinMaxLnScaleMinMax.z;
    float lnScaleMax = rgbMinMaxLnScaleMinMax.w;
    float diagScale = 255.0 / (2.0 * (lnScaleMax - lnScaleMin));
    uvec3 uXxyyzz = uvec3(round(clamp((log(xxyyzz) - 2.0 * lnScaleMin) * diagScale, 0.0, 255.0)));

    vec3 xyxzyzCor = vec3(
        clamp(xyxzyz.x / sqrt(xxyyzz.x * xxyyzz.y), -1.0, 1.0),
        clamp(xyxzyz.y / sqrt(xxyyzz.x * xxyyzz.z), -1.0, 1.0),
        clamp(xyxzyz.z / sqrt(xxyyzz.y * xxyyzz.z), -1.0, 1.0)
    );
    ivec3 iXyxzyzCor = ivec3(round(xyxzyzCor * 127.0));

    
    uint word0 = uRgba.r | (uRgba.g << 8u) | (uRgba.b << 16u) | (uRgba.a << 24u);
    uint word1 = packHalf2x16(center.xy);
    uint word2 = packHalf2x16(vec2(center.z, 0.0)) |
        ((uint(iXyxzyzCor.y) & 0xffu) << 16u) |
        ((uint(iXyxzyzCor.z) & 0xffu) << 24u);
    uint word3 =
        uXxyyzz.x | (uXxyyzz.y << 8u) | (uXxyyzz.z << 16u) |
        ((uint(iXyxzyzCor.x) & 0xffu) << 24u);
    return uvec4(word0, word1, word2, word3);
}

void unpackSplatCovEncoding(uvec4 packed, out vec3 center, out vec4 rgba, out vec3 xxyyzz, out vec3 xyxzyz, vec4 rgbMinMaxLnScaleMinMax) {
    uint word0 = packed.x, word1 = packed.y, word2 = packed.z, word3 = packed.w;

    uvec4 uRgba = uvec4(word0 & 0xffu, (word0 >> 8u) & 0xffu, (word0 >> 16u) & 0xffu, (word0 >> 24u) & 0xffu);
    float rgbMin = rgbMinMaxLnScaleMinMax.x;
    float rgbMax = rgbMinMaxLnScaleMinMax.y;
    rgba = (vec4(uRgba) / 255.0);
    rgba.rgb = rgba.rgb * (rgbMax - rgbMin) + rgbMin;

    center = vec3(
        unpackHalf2x16(word1),
        unpackHalf2x16(word2 & 0xffffu).x
    );

    uvec3 uXxyyzz = uvec3(word3 & 0xffu, (word3 >> 8u) & 0xffu, (word3 >> 16u) & 0xffu);
    ivec3 iXyxzyzCor = ivec3(int(word3) >> 24, int(word2 << 8u) >> 24, int(word2) >> 24);

    float lnScaleMin = rgbMinMaxLnScaleMinMax.z;
    float lnScaleMax = rgbMinMaxLnScaleMinMax.w;
    float diagScale = 2.0 * (lnScaleMax - lnScaleMin) / 255.0;
    xxyyzz = exp(2.0 * lnScaleMin + vec3(uXxyyzz) * diagScale);

    vec3 xyxzyzCor = vec3(iXyxzyzCor) / 127.0;
    xyxzyz = xyxzyzCor * vec3(
        sqrt(xxyyzz.x * xxyyzz.y),
        sqrt(xxyyzz.x * xxyyzz.z),
        sqrt(xxyyzz.y * xxyyzz.z)
    );
}

void packSplatExtCov(
    out uvec4 packed, out uvec4 packed2,
    vec3 center, vec4 rgba, vec3 xxyyzz, vec3 xyxzyz
) {
    packed.x = floatBitsToUint(center.x);
    packed.y = floatBitsToUint(center.y);
    packed.z = floatBitsToUint(center.z);
    packed.w = packHalf2x16(vec2(rgba.a, rgba.b));
    packed2.x = packHalf2x16(rgba.rg);

    vec3 xyxzyzCor = vec3(
        clamp(xyxzyz.x / sqrt(xxyyzz.x * xxyyzz.y), -1.0, 1.0),
        clamp(xyxzyz.y / sqrt(xxyyzz.x * xxyyzz.z), -1.0, 1.0),
        clamp(xyxzyz.z / sqrt(xxyyzz.y * xxyyzz.z), -1.0, 1.0)
    );
    xyxzyzCor = sign(xyxzyzCor) * clamp(log(abs(xyxzyzCor)), -100.0, -0.0000001);
    xxyyzz = log(xxyyzz);

    packed2.y = packHalf2x16(vec2(xxyyzz.x, xxyyzz.y));
    packed2.z = packHalf2x16(vec2(xxyyzz.z, xyxzyzCor.x));
    packed2.w = packHalf2x16(vec2(xyxzyzCor.y, xyxzyzCor.z));
}

void unpackSplatExtCov(
    uvec4 packed, uvec4 packed2,
    out vec3 center, out vec4 rgba, out vec3 xxyyzz, out vec3 xyxzyz
) {
    center.x = uintBitsToFloat(packed.x);
    center.y = uintBitsToFloat(packed.y);
    center.z = uintBitsToFloat(packed.z);

    vec2 ab = unpackHalf2x16(packed.w);
    vec2 rg = unpackHalf2x16(packed2.x);
    rgba = vec4(rg, ab.y, ab.x);

    vec2 xxyy = unpackHalf2x16(packed2.y);
    vec2 zzxy = unpackHalf2x16(packed2.z);
    vec2 xzyz = unpackHalf2x16(packed2.w);
    xxyyzz = exp(vec3(xxyy.x, xxyy.y, zzxy.x));
    xyxzyz = vec3(zzxy.y, xzyz.x, xzyz.y);
    xyxzyz = -sign(xyxzyz) * exp(-abs(xyxzyz));
    xyxzyz *= vec3(
        sqrt(xxyyzz.x * xxyyzz.y),
        sqrt(xxyyzz.x * xxyyzz.z),
        sqrt(xxyyzz.y * xxyyzz.z)
    );
}

void packSplatExt(
    out uvec4 packed, out uvec4 packed2,
    vec3 center, vec3 scales, vec4 quaternion, vec4 rgba,
    float reflectance
) {
    packed.x = floatBitsToUint(center.x);
    packed.y = floatBitsToUint(center.y);
    packed.z = floatBitsToUint(center.z);
    packed.w = packHalf2x16(vec2(rgba.a, 0.0));

    
    uint uReflectance = uint(round(clamp(reflectance * 255.0, 0.0, 255.0)));
    packed.w |= (uReflectance << 16u);

    packed2.x = packHalf2x16(rgba.rg);
    packed2.y = packHalf2x16(vec2(rgba.b, log(scales.x)));
    packed2.z = packHalf2x16(log(scales.yz));
    packed2.w = encodeQuatOctXy1010R12(quaternion);
}

vec4 unpackSplatExtCenterAlpha(uvec4 packed) {
    return vec4(
        uintBitsToFloat(packed.x),
        uintBitsToFloat(packed.y),
        uintBitsToFloat(packed.z),
        unpackHalf2x16(packed.w).x
    );
}

float unpackSplatExtAlpha(uvec4 packed) {
    return unpackHalf2x16(packed.w).x;
}

void unpackSplatExt(
    uvec4 packed, uvec4 packed2,
    out vec3 center, out vec3 scales, out vec4 quaternion, out vec4 rgba,
    out float reflectance
) {
    center.x = uintBitsToFloat(packed.x);
    center.y = uintBitsToFloat(packed.y);
    center.z = uintBitsToFloat(packed.z);
    rgba.a = unpackHalf2x16(packed.w).x;

    
    uint uReflectance = (packed.w >> 16u) & 0xffu;
    reflectance = float(uReflectance) / 255.0;

    rgba.rg = unpackHalf2x16(packed2.x);
    vec2 split = unpackHalf2x16(packed2.y);
    rgba.b = split.x;
    scales.x = exp(split.y);
    scales.yz = exp(unpackHalf2x16(packed2.z));
    quaternion = decodeQuatOctXy1010R12(packed2.w);
}

uint encodeExtRgb(vec3 rgb) {
    vec3 absRgb = abs(rgb);
    float maxAbs = max(absRgb.r, max(absRgb.g, absRgb.b));

    int base = clamp(int(floor(log2(maxAbs))) + 15, 0, 31);
    float divisor = exp2(float(base - 15)) / 255.0;

    uvec3 uRgb = uvec3(round(clamp(absRgb / divisor, 0.0, 255.0)));
    uint expSigns = (uint(base) << 3u) | ((rgb.r < 0.0 ? 0x1u : 0u) | (rgb.g < 0.0 ? 0x2u : 0u) | (rgb.b < 0.0 ? 0x4u : 0u));
    return uRgb.r | (uRgb.g << 8u) | (uRgb.b << 16u) | (expSigns << 24u);
}

vec3 decodeExtRgb(uint encoded) {
    uint biasedBase = (encoded >> 27u) & 0x1fu;
    float divisor = exp2(float(int(biasedBase) - 15)) / 255.0;

    vec3 rgb = vec3(uvec3(encoded & 0xffu, (encoded >> 8u) & 0xffu, (encoded >> 16u) & 0xffu));
    rgb *= divisor;

    return vec3(
        ((encoded & 0x1000000u) != 0u) ? -rgb.r : rgb.r,
        ((encoded & 0x2000000u) != 0u) ? -rgb.g : rgb.g,
        ((encoded & 0x4000000u) != 0u) ? -rgb.b : rgb.b
    );
}

vec3 quatVec(vec4 q, vec3 v) {
    
    vec3 t = 2.0 * cross(q.xyz, v);
    return v + q.w * t + cross(q.xyz, t);
}

vec4 quatQuat(vec4 q1, vec4 q2) {
    return vec4(
        q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y,
        q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x,
        q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w,
        q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z
    );
}

mat3 quaternionToMatrix(vec4 q) {
    return mat3(
        (1.0 - 2.0 * (q.y * q.y + q.z * q.z)),
        (2.0 * (q.x * q.y + q.w * q.z)),
        (2.0 * (q.x * q.z - q.w * q.y)),
        (2.0 * (q.x * q.y - q.w * q.z)),
        (1.0 - 2.0 * (q.x * q.x + q.z * q.z)),
        (2.0 * (q.y * q.z + q.w * q.x)),
        (2.0 * (q.x * q.z + q.w * q.y)),
        (2.0 * (q.y * q.z - q.w * q.x)),
        (1.0 - 2.0 * (q.x * q.x + q.y * q.y))
    );
}

mat3 scaleQuaternionToMatrix(vec3 s, vec4 q) {
    
    return mat3(
        s.x * (1.0 - 2.0 * (q.y * q.y + q.z * q.z)),
        s.x * (2.0 * (q.x * q.y + q.w * q.z)),
        s.x * (2.0 * (q.x * q.z - q.w * q.y)),
        s.y * (2.0 * (q.x * q.y - q.w * q.z)),
        s.y * (1.0 - 2.0 * (q.x * q.x + q.z * q.z)),
        s.y * (2.0 * (q.y * q.z + q.w * q.x)),
        s.z * (2.0 * (q.x * q.z + q.w * q.y)),
        s.z * (2.0 * (q.y * q.z - q.w * q.x)),
        s.z * (1.0 - 2.0 * (q.x * q.x + q.y * q.y))
    );
}

vec4 slerp(vec4 q1, vec4 q2, float t) {
    
    float cosHalfTheta = dot(q1, q2);

    
    if (abs(cosHalfTheta) >= 0.999) {
        return q1;
    }
    
    
    
    if (cosHalfTheta < 0.0) {
        q2 = -q2;
        cosHalfTheta = -cosHalfTheta;
    }

    
    float halfTheta = acos(cosHalfTheta);
    float sinHalfTheta = sqrt(1.0 - cosHalfTheta * cosHalfTheta);

    
    float ratioA = sin((1.0 - t) * halfTheta) / sinHalfTheta;
    float ratioB = sin(t * halfTheta) / sinHalfTheta;

    
    return q1 * ratioA + q2 * ratioB;
}

ivec3 splatTexCoord(int index) {
    uint x = uint(index) & SPLAT_TEX_WIDTH_MASK;
    uint y = (uint(index) >> SPLAT_TEX_WIDTH_BITS) & SPLAT_TEX_HEIGHT_MASK;
    uint z = uint(index) >> SPLAT_TEX_LAYER_BITS;
    return ivec3(x, y, z);
}

ivec3 pagedSplatTexCoord(int index) {
    return ivec3(index & 255, (index >> 8) & 255, index >> 16);
}

vec4 uintToVec4(uint u32) {
    uvec4 bytes = uvec4(
        u32 & 0xFFu,
        (u32 >> 8u) & 0xFFu,
        (u32 >> 16u) & 0xFFu,
        (u32 >> 24u) & 0xFFu
    );
    return vec4(bytes) / 255.0;
}

vec4 floatToVec4(float f) {
    uint u32 = floatBitsToUint(f);
    return uintToVec4(u32);
}

vec3 debugColorHue(uint i) {
    
    float hue = fract(float(i) * 0.61803398875);
    
    vec3 rgb = clamp(abs(mod(hue*6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(1.0), rgb, 0.85); 
}

vec3 normalFromScales(vec3 pos, vec3 scale, mat3 rotation, vec3 cameraPos)
{
    vec3 p2o = normalize(cameraPos - pos);
    float min_scale = min(min(scale.x, scale.y), scale.z);
    uint min_axis_id = scale.x == min_scale ? 0u : scale.y == min_scale ? 1u : 2u;
    vec3 normal_axis = vec3(0, 0, 0);
    normal_axis[min_axis_id] = 1.0;
    normal_axis = normalize(rotation * normal_axis);
    vec3 normal = dot(p2o, normal_axis) < 0.0 ? normal_axis * -1.0 : normal_axis;
    return normal;
}`,{oldSplatVertex:`precision highp float;
precision highp int;
precision highp usampler2DArray;

#include <splatDefines>

attribute uint splatIndex;

out vec4 vRgba;
out vec2 vSplatUv;
out vec3 vNdc;
flat out uint vSplatIndex;

uniform vec2 renderSize;
uniform uint numSplats;
uniform vec4 renderToViewQuat;
uniform vec3 renderToViewPos;
uniform float maxStdDev;
uniform float minPixelRadius;
uniform float maxPixelRadius;
uniform float time;
uniform float deltaTime;
uniform bool debugFlag;
uniform float minAlpha;
uniform bool stochastic;
uniform bool enable2DGS;
uniform float blurAmount;
uniform float preBlurAmount;
uniform float focalDistance;
uniform float apertureAngle;
uniform float clipXY;
uniform float focalAdjustment;

uniform usampler2DArray packedSplats;
uniform vec4 rgbMinMaxLnScaleMinMax;

void main() {
    
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);

    if (uint(gl_InstanceID) >= numSplats) {
        return;
    }

    ivec3 texCoord;
    if (stochastic) {
        texCoord = ivec3(
            uint(gl_InstanceID) & SPLAT_TEX_WIDTH_MASK,
            (uint(gl_InstanceID) >> SPLAT_TEX_WIDTH_BITS) & SPLAT_TEX_HEIGHT_MASK,
            (uint(gl_InstanceID) >> SPLAT_TEX_LAYER_BITS)
        );
    } else {
        if (splatIndex == 0xffffffffu) {
            
            return;
        }
        texCoord = ivec3(
            splatIndex & SPLAT_TEX_WIDTH_MASK,
            (splatIndex >> SPLAT_TEX_WIDTH_BITS) & SPLAT_TEX_HEIGHT_MASK,
            splatIndex >> SPLAT_TEX_LAYER_BITS
        );
    }
    uvec4 packed = texelFetch(packedSplats, texCoord, 0);

    vec3 center, scales;
    vec4 quaternion, rgba;
    unpackSplatEncoding(packed, center, scales, quaternion, rgba, rgbMinMaxLnScaleMinMax);

    if (rgba.a < minAlpha) {
        return;
    }
    bvec3 zeroScales = equal(scales, vec3(0.0));
    if (all(zeroScales)) {
        return;
    }

    
    vec3 viewCenter = quatVec(renderToViewQuat, center) + renderToViewPos;

    
    if (viewCenter.z >= 0.0) {
        return;
    }

    
    vec4 clipCenter = projectionMatrix * vec4(viewCenter, 1.0);

    
    if (abs(clipCenter.z) >= clipCenter.w) {
        return;
    }

    
    float clip = clipXY * clipCenter.w;
    if (abs(clipCenter.x) > clip || abs(clipCenter.y) > clip) {
        return;
    }

    
    vSplatIndex = splatIndex;

    
    vec4 viewQuaternion = quatQuat(renderToViewQuat, quaternion);

    if (enable2DGS && any(zeroScales)) {
        vRgba = rgba;
        vSplatUv = position.xy * maxStdDev;

        vec3 offset;
        if (zeroScales.z) {
            offset = vec3(vSplatUv.xy * scales.xy, 0.0);
        } else if (zeroScales.y) {
            offset = vec3(vSplatUv.x * scales.x, 0.0, vSplatUv.y * scales.z);
        } else {
            offset = vec3(0.0, vSplatUv.xy * scales.yz);
        }

        vec3 viewPos = viewCenter + quatVec(viewQuaternion, offset);
        gl_Position = projectionMatrix * vec4(viewPos, 1.0);
        vNdc = gl_Position.xyz / gl_Position.w;
        return;
    }

    
    vec3 ndcCenter = clipCenter.xyz / clipCenter.w;

    
    mat3 RS = scaleQuaternionToMatrix(scales, viewQuaternion);
    mat3 cov3D = RS * transpose(RS);

    
    vec2 scaledRenderSize = renderSize * focalAdjustment;
    vec2 focal = 0.5 * scaledRenderSize * vec2(projectionMatrix[0][0], projectionMatrix[1][1]);

    mat3 J;
    if(isOrthographic) {
        J = mat3(
            focal.x, 0.0, 0.0,
            0.0, focal.y, 0.0,
            0.0, 0.0, 0.0
        );
    } else {
        float invZ = 1.0 / viewCenter.z;
        vec2 J1 = focal * invZ;
        vec2 J2 = -(J1 * viewCenter.xy) * invZ;
        J = mat3(
            J1.x, 0.0, J2.x,
            0.0, J1.y, J2.y,
            0.0, 0.0, 0.0
        );
    }

    
    
    
    
    
    
    
    mat3 cov2D = transpose(J) * cov3D * J;
    float a = cov2D[0][0];
    float d = cov2D[1][1];
    float b = cov2D[0][1];

    
    a += preBlurAmount;
    d += preBlurAmount;

    float fullBlurAmount = blurAmount;
    if ((focalDistance > 0.0) && (apertureAngle > 0.0)) {
        float focusRadius = maxPixelRadius;
        if (viewCenter.z < 0.0) {
            float focusBlur = abs((-viewCenter.z - focalDistance) / viewCenter.z);
            float apertureRadius = focal.x * tan(0.5 * apertureAngle);
            focusRadius = focusBlur * apertureRadius;
        }
        fullBlurAmount = clamp(sqr(focusRadius), blurAmount, sqr(maxPixelRadius));
    }

    
    float detOrig = a * d - b * b;
    a += fullBlurAmount;
    d += fullBlurAmount;
    float det = a * d - b * b;

    
    float blurAdjust = sqrt(max(0.0, detOrig / det));
    rgba.a *= blurAdjust;
    if (rgba.a < minAlpha) {
        return;
    }

    
    float eigenAvg = 0.5 * (a + d);
    float eigenDelta = sqrt(max(0.0, eigenAvg * eigenAvg - det));
    float eigen1 = eigenAvg + eigenDelta;
    float eigen2 = eigenAvg - eigenDelta;

    vec2 eigenVec1 = normalize(vec2((abs(b) < 0.001) ? 1.0 : b, eigen1 - a));
    vec2 eigenVec2 = vec2(eigenVec1.y, -eigenVec1.x);

    float scale1 = min(maxPixelRadius, maxStdDev * sqrt(eigen1));
    float scale2 = min(maxPixelRadius, maxStdDev * sqrt(eigen2));
    if (scale1 < minPixelRadius && scale2 < minPixelRadius) {
        return;
    }

    
    vec2 pixelOffset = position.x * eigenVec1 * scale1 + position.y * eigenVec2 * scale2;
    vec2 ndcOffset = (2.0 / scaledRenderSize) * pixelOffset;
    vec3 ndc = vec3(ndcCenter.xy + ndcOffset, ndcCenter.z);

    vRgba = rgba;
    vSplatUv = position.xy * maxStdDev;
    vNdc = ndc;
    gl_Position = vec4(ndc.xy * clipCenter.w, clipCenter.zw);
}`,oldSplatFragment:`precision highp float;
precision highp int;

#include <splatDefines>

uniform float near;
uniform float far;
uniform bool encodeLinear;
uniform float time;
uniform bool debugFlag;
uniform float maxStdDev;
uniform float minAlpha;
uniform bool stochastic;
uniform bool disableFalloff;
uniform float falloff;

uniform bool splatTexEnable;
uniform sampler3D splatTexture;
uniform mat2 splatTexMul;
uniform vec2 splatTexAdd;
uniform float splatTexNear;
uniform float splatTexFar;
uniform float splatTexMid;

out vec4 fragColor;

in vec4 vRgba;
in vec2 vSplatUv;
in vec3 vNdc;
flat in uint vSplatIndex;

void main() {
    vec4 rgba = vRgba;

    float z = dot(vSplatUv, vSplatUv);
    if (!splatTexEnable) {
        if (z > (maxStdDev * maxStdDev)) {
            discard;
        }
    } else {
        vec2 uv = splatTexMul * vSplatUv + splatTexAdd;
        float ndcZ = vNdc.z;
        float depth = (2.0 * near * far) / (far + near - ndcZ * (far - near));
        float clampedFar = max(splatTexFar, splatTexNear);
        float clampedDepth = clamp(depth, splatTexNear, clampedFar);
        float logDepth = log2(clampedDepth + 1.0);
        float logNear = log2(splatTexNear + 1.0);
        float logFar = log2(clampedFar + 1.0);

        float texZ;
        if (splatTexMid > 0.0) {
            float clampedMid = clamp(splatTexMid, splatTexNear, clampedFar);
            float logMid = log2(clampedMid + 1.0);
            texZ = (clampedDepth <= clampedMid) ?
                (0.5 * ((logDepth - logNear) / (logMid - logNear))) :
                (0.5 * ((logDepth - logMid) / (logFar - logMid)) + 0.5);
        } else {
            texZ = (logDepth - logNear) / (logFar - logNear);
        }

        vec4 modulate = texture(splatTexture, vec3(uv, 1.0 - texZ));
        rgba *= modulate;
    }

    rgba.a *= mix(1.0, exp(-0.5 * z), falloff);

    if (rgba.a < minAlpha) {
        discard;
    }
    if (encodeLinear) {
        rgba.rgb = srgbToLinear(rgba.rgb);
    }

    if (stochastic) {
        const bool STEADY = false;
        uint uTime = STEADY ? 0u : floatBitsToUint(time);
        uvec2 coord = uvec2(gl_FragCoord.xy);
        uint state = uTime + 0x9e3779b9u * coord.x + 0x85ebca6bu * coord.y + 0xc2b2ae35u * uint(vSplatIndex);
        state = state * 747796405u + 2891336453u;
        uint hash = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
        hash = (hash >> 22u) ^ hash;
        float rand = float(hash) / 4294967296.0;
        if (rand < rgba.a) {
            fragColor = vec4(rgba.rgb, 1.0);
        } else {
            discard;
        }
    } else {
        #ifdef PREMULTIPLIED_ALPHA
            fragColor = vec4(rgba.rgb * rgba.a, rgba.a);
        #else
            fragColor = rgba;
        #endif
    }
}`,splatVertex:`precision highp float;
precision highp int;
precision highp usampler2DArray;

#include <splatDefines>

out vec4 vRgba;
out vec2 vSplatUv;
out vec3 vNdc;
out vec3 vView;
out vec3 vNorm;
out float vReflectance;
flat out uint vSplatIndex;
flat out float adjustedStdDev;

uniform vec2 renderSize;
uniform vec4 renderToViewQuat;
uniform vec3 renderToViewPos;
uniform mat3 renderToViewBasis;
uniform float maxStdDev;
uniform float minPixelRadius;
uniform float maxPixelRadius;
uniform bool enableExtSplats;
uniform bool enableCovSplats;
uniform float time;
uniform float deltaTime;
uniform bool debugFlag;
uniform float minAlpha;
uniform bool enable2DGS;
uniform float blurAmount;
uniform float preBlurAmount;
uniform float focalDistance;
uniform float apertureAngle;
uniform float clipXY;
uniform float focalAdjustment;

uniform usampler2D ordering;
uniform usampler2DArray extSplats;
uniform usampler2DArray extSplats2;

bool isPerspectiveMatrix( mat4 m ) {
    return m[ 2 ][ 3 ] == -1.0;
}

#include <logdepthbuf_pars_vertex>

void main() {
    
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);

    ivec2 orderingCoord = ivec2((gl_InstanceID >> 2) & 4095, gl_InstanceID >> 14);
    uint splatIndex = texelFetch(ordering, orderingCoord, 0)[gl_InstanceID & 3];
    if (splatIndex == 0xffffffffu) {
        
        return;
    }

    ivec3 texCoord = splatTexCoord(int(splatIndex));
    vec3 center, scales, xxyyzz, xyxzyz;
    vec4 quaternion, rgba;
    mat3 cov3D;
    bvec3 zeroScales = bvec3(false);
    vReflectance = 0.0;

    if (enableExtSplats) {
        uvec4 ext1 = texelFetch(extSplats, texCoord, 0);
        float alpha = unpackSplatExtAlpha(ext1);
        if ((alpha == 0.0) || (alpha < minAlpha)) {
            return;
        }
        uvec4 ext2 = texelFetch(extSplats2, texCoord, 0);

        if (!enableCovSplats) {
            unpackSplatExt(ext1, ext2, center, scales, quaternion, rgba, vReflectance);
            zeroScales = equal(scales, vec3(0.0));
            if (all(zeroScales)) {
                return;
            }
        } else {
            unpackSplatExtCov(ext1, ext2, center, rgba, xxyyzz, xyxzyz);
            if (all(equal(xxyyzz, vec3(0.0))) && all(equal(xyxzyz, vec3(0.0)))) {
                return;
            }
        }
    } else {
        uvec4 packed = texelFetch(extSplats, texCoord, 0);
        if (!enableCovSplats) {
            unpackSplatEncoding(packed, center, scales, quaternion, rgba, vec4(0.0, 1.0, LN_SCALE_MIN, LN_SCALE_MAX));
            zeroScales = equal(scales, vec3(0.0));
            if (all(zeroScales)) {
                return;
            }
        } else {
            unpackSplatCovEncoding(packed, center, rgba, xxyyzz, xyxzyz, vec4(0.0, 1.0, LN_SCALE_MIN, LN_SCALE_MAX));
            if (all(equal(xxyyzz, vec3(0.0))) && all(equal(xyxzyz, vec3(0.0)))) {
                return;
            }
        }

        rgba.a *= 2.0;
        if ((rgba.a == 0.0) || (rgba.a < minAlpha)) {
            return;
        }

        
        
        
        vReflectance = 0.0;
    }

    adjustedStdDev = maxStdDev;
    if (rgba.a > 1.0) {
        
        rgba.a = min(rgba.a * 4.0 - 3.0, 5.0);
        
        adjustedStdDev = min(1.5 * maxStdDev, maxStdDev + 0.7 * (rgba.a - 1.0));
    }

    
    vec3 viewCenter = (!enableCovSplats ? quatVec(renderToViewQuat, center) : (renderToViewBasis * center)) + renderToViewPos;

    
    if (viewCenter.z >= 0.0) {
        return;
    }

    
    vec4 clipCenter = projectionMatrix * vec4(viewCenter, 1.0);

    
    if (abs(clipCenter.z) >= clipCenter.w) {
        return;
    }

    
    float clip = clipXY * clipCenter.w;
    if (abs(clipCenter.x) > clip || abs(clipCenter.y) > clip) {
        return;
    }

    vRgba = rgba;
    vSplatUv = position.xy * adjustedStdDev;

    
    
    mat3 splatRot = scaleQuaternionToMatrix(vec3(1), quaternion);
    vec3 camPos = (inverse(viewMatrix) * vec4(0, 0, 0, 1)).xyz;
    vNorm = mat3(viewMatrix) * normalFromScales(center, scales, splatRot, camPos);

    
    vSplatIndex = splatIndex;

    if (!enableCovSplats) {
        
        vec4 viewQuaternion = quatQuat(renderToViewQuat, quaternion);

        if (enable2DGS && any(zeroScales)) {
            vec3 offset;
            if (zeroScales.z) {
                offset = vec3(vSplatUv.xy * scales.xy, 0.0);
            } else if (zeroScales.y) {
                offset = vec3(vSplatUv.x * scales.x, 0.0, vSplatUv.y * scales.z);
            } else {
                offset = vec3(0.0, vSplatUv.xy * scales.yz);
            }

            vec3 viewPos = viewCenter + quatVec(viewQuaternion, offset);
            gl_Position = projectionMatrix * vec4(viewPos, 1.0);
            vNdc = gl_Position.xyz / gl_Position.w;
            vView = viewPos; 

            #include <logdepthbuf_vertex>
            return;
        }

        
        mat3 RS = scaleQuaternionToMatrix(scales, viewQuaternion);
        cov3D = RS * transpose(RS);
    } else {
        cov3D = mat3(
            xxyyzz.x, xyxzyz.x, xyxzyz.y,
            xyxzyz.x, xxyyzz.y, xyxzyz.z,
            xyxzyz.y, xyxzyz.z, xxyyzz.z
        );
        cov3D = renderToViewBasis * cov3D * transpose(renderToViewBasis);
    }

    
    vec2 scaledRenderSize = renderSize * focalAdjustment;
    vec2 focal = 0.5 * scaledRenderSize * vec2(projectionMatrix[0][0], projectionMatrix[1][1]);

    mat3 J;
    if (isOrthographic) {
        J = mat3(
            focal.x, 0.0, 0.0,
            0.0, focal.y, 0.0,
            0.0, 0.0, 0.0
        );
    } else {
        float invZ = 1.0 / viewCenter.z;
        vec2 J1 = focal * invZ;
        vec2 J2 = -(J1 * viewCenter.xy) * invZ;
        J = mat3(
            J1.x, 0.0, J2.x,
            0.0, J1.y, J2.y,
            0.0, 0.0, 0.0
        );
    }

    
    
    mat3 cov2D = transpose(J) * cov3D * J;
    float a = cov2D[0][0];
    float d = cov2D[1][1];
    float b = cov2D[0][1];

    
    a += preBlurAmount;
    d += preBlurAmount;

    float fullBlurAmount = blurAmount;
    if ((focalDistance > 0.0) && (apertureAngle > 0.0)) {
        float focusRadius = maxPixelRadius;
        if (viewCenter.z < 0.0) {
            float focusBlur = abs((-viewCenter.z - focalDistance) / viewCenter.z);
            float apertureRadius = focal.x * tan(0.5 * apertureAngle);
            focusRadius = focusBlur * apertureRadius;
        }
        fullBlurAmount = clamp(sqr(focusRadius), blurAmount, sqr(maxPixelRadius));
    }

    
    float detOrig = a * d - b * b;
    a += fullBlurAmount;
    d += fullBlurAmount;
    float det = a * d - b * b;

    
    float blurAdjust = sqrt(max(0.0, detOrig / det));
    rgba.a *= blurAdjust;
    if (rgba.a < minAlpha) {
        return;
    }
    vRgba.a = rgba.a;

    
    float eigenAvg = 0.5 * (a + d);
    float eigenDelta = sqrt(max(0.0, eigenAvg * eigenAvg - det));
    float eigen1 = eigenAvg + eigenDelta;
    float eigen2 = eigenAvg - eigenDelta;

    vec2 eigenVec1 = normalize(vec2((abs(b) < 0.001) ? 1.0 : b, eigen1 - a));
    vec2 eigenVec2 = vec2(eigenVec1.y, -eigenVec1.x);

    float scale1 = min(maxPixelRadius, adjustedStdDev * sqrt(eigen1));
    float scale2 = min(maxPixelRadius, adjustedStdDev * sqrt(eigen2));
    if (scale1 < minPixelRadius && scale2 < minPixelRadius) {
        return;
    }

    
    vec2 pixelOffset = position.x * eigenVec1 * scale1 + position.y * eigenVec2 * scale2;
    vec2 ndcOffset = (2.0 / scaledRenderSize) * pixelOffset;

    
    vec3 ndcCenter = clipCenter.xyz / clipCenter.w;
    vec3 ndc = vec3(ndcCenter.xy + ndcOffset, ndcCenter.z);

    vNdc = ndc;
    gl_Position = vec4(ndc.xy * clipCenter.w, clipCenter.zw);
    vView = (inverse(projectionMatrix) * gl_Position).xyz;

    #include <logdepthbuf_vertex>
}`,splatFragment:`precision highp float;
precision highp int;

#include <splatDefines>

uniform float near;
uniform float far;
uniform bool encodeLinear;
uniform bool inputLinear;
uniform float time;
uniform bool debugFlag;
uniform bool debugOverdraw;
uniform float maxStdDev;
uniform float minAlpha;
uniform bool disableFalloff;
uniform float falloff;

uniform bool useDepthTest;
uniform sampler2D depthTexture;

layout(location = 0) out vec4 fragColor;
layout(location = 1) out vec4 fragSplatData;

in vec4 vRgba;
in vec2 vSplatUv;
in vec3 vNdc;
in vec3 vView;
in vec3 vNorm;
in float vReflectance;
flat in uint vSplatIndex;
flat in float adjustedStdDev;

#include <logdepthbuf_pars_fragment>

float readDepthZ( sampler2D depthSampler, vec2 coord ) {
    float fragCoordZ = texture( depthSampler, coord ).x;
    float viewZ = ( near * far ) / ( ( far - near ) * fragCoordZ - far );
    return viewZ;
}

void main() {   
    vec4 rgba = vRgba;

    float z2 = dot(vSplatUv, vSplatUv);
    if (z2 > (adjustedStdDev * adjustedStdDev)) {
        discard;
    }

    if (useDepthTest) {
        
        vec2 screenUv = (vNdc.xy * 0.5) + 0.5;
        float sampleDepthZ = readDepthZ( depthTexture, screenUv );
        if (sampleDepthZ > vView.z) {
            discard;
        }
    }

    if (debugOverdraw) {
        fragColor = vec4(1,1,1,0.001);
        return;
    }

    if (false) {
    
        float a = rgba.a;
        float shifted = sqrt(z2) - max(0.0, a - 1.0);
        float exponent = -0.5 * max(1.0, a) * sqr(max(0.0, shifted));
        float min1a = min(1.0, a);
        rgba.a = mix(min1a, min1a * exp(exponent), falloff);
    } else {
        
        if (rgba.a <= 1.0) {
            rgba.a = mix(rgba.a, rgba.a * exp(-0.5 * z2), falloff);
        } else {
            float a = exp((rgba.a*rgba.a - 1.0) / 2.718281828459045);
            float alpha = 1.0 - pow(1.0 - exp(-0.5 * z2), a);
            rgba.a = mix(1.0, alpha, falloff);
        }
    }

    if (rgba.a < minAlpha) { 
        discard;
    }

    
    
    rgba.a = max(0.0, rgba.a);

    
    

    vec3 normalDir = vNorm;

    
    vec3 reflectCurrent = vec3(0);
    {
        vec3 I = normalize(vView.xyz);
        vec3 R = reflect(I, normalDir);
        reflectCurrent = (inverse(viewMatrix) * vec4(R,0)).xyz;
    }
    

    if (inputLinear && !encodeLinear) {
        rgba.rgb = linearToSrgb(rgba.rgb);
    } else if (!inputLinear && encodeLinear) {
        rgba.rgb = srgbToLinear(rgba.rgb);
    }

    
    vec3 splatData = vec3(vReflectance, -vView.z, 0.4);

    #ifdef PREMULTIPLIED_ALPHA
        fragColor = vec4(rgba.rgb * rgba.a, rgba.a);
        fragSplatData = vec4(splatData * rgba.a, rgba.a);
    #else
        fragColor = rgba;
        fragSplatData = vec4(splatData, rgba.a);
    #endif

    #include <logdepthbuf_fragment>
}`}),To}var Do=typeof TextDecoder<`u`?new TextDecoder(`utf-8`,{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error(`TextDecoder not available`)}};typeof TextDecoder<`u`&&Do.decode();var Oo=null;function ko(){return Oo!==null&&Oo.byteLength!==0||(Oo=new Uint8Array(X.memory.buffer)),Oo}function Ao(e,t){return e>>>=0,Do.decode(ko().subarray(e,e+t))}function jo(e){let t=X.__externref_table_alloc();return X.__wbindgen_export_3.set(t,e),t}function Mo(e,t){try{return e.apply(this,t)}catch(e){let t=jo(e);X.__wbindgen_exn_store(t)}}var No=0,Po=typeof TextEncoder<`u`?new TextEncoder(`utf-8`):{encode:()=>{throw Error(`TextEncoder not available`)}},Fo=typeof Po.encodeInto==`function`?function(e,t){return Po.encodeInto(e,t)}:function(e,t){let n=Po.encode(e);return t.set(n),{read:e.length,written:n.length}};function Io(e,t,n){if(n===void 0){let n=Po.encode(e),r=t(n.length,1)>>>0;return ko().subarray(r,r+n.length).set(n),No=n.length,r}let r=e.length,i=t(r,1)>>>0,a=ko(),o=0;for(;o<r;o++){let t=e.charCodeAt(o);if(t>127)break;a[i+o]=t}if(o!==r){o!==0&&(e=e.slice(o)),i=n(i,r,r=o+3*e.length,1)>>>0;let t=ko().subarray(i+o,i+r);o+=Fo(e,t).written,i=n(i,r,o,1)>>>0}return No=o,i}var Lo=null;function Ro(){return(Lo===null||!0===Lo.buffer.detached||Lo.buffer.detached===void 0&&Lo.buffer!==X.memory.buffer)&&(Lo=new DataView(X.memory.buffer)),Lo}function zo(e){let t=typeof e;if(t==`number`||t==`boolean`||e==null)return`${e}`;if(t==`string`)return`"${e}"`;if(t==`symbol`){let t=e.description;return t==null?`Symbol`:`Symbol(${t})`}if(t==`function`){let t=e.name;return typeof t==`string`&&t.length>0?`Function(${t})`:`Function`}if(Array.isArray(e)){let t=e.length,n=`[`;t>0&&(n+=zo(e[0]));for(let r=1;r<t;r++)n+=`, `+zo(e[r]);return n+=`]`,n}let n=/\[object ([^\]]+)\]/.exec(toString.call(e)),r;if(!(n&&n.length>1))return toString.call(e);if(r=n[1],r==`Object`)try{return`Object(`+JSON.stringify(e)+`)`}catch{return`Object`}return e instanceof Error?`${e.name}: ${e.message}\n${e.stack}`:r}function Bo(e){return e==null}function Z(e){let t=X.__wbindgen_export_3.get(e);return X.__externref_table_dealloc(e),t}function Vo(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,ee,y){X.compute_depths_packed_js(e,t,n,r,Bo(i)?0:jo(i),a,o,s,c,l,u,d,f,p,m,h,g,_,v,ee,y)}function Ho(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,ee,y){X.compute_depths_ext_js(e,t,n,r,Bo(i)?0:jo(i),a,o,s,c,l,u,d,f,p,m,h,g,_,v,ee,y)}typeof FinalizationRegistry>`u`||new FinalizationRegistry(e=>X.__wbg_chunkdecoder_free(e>>>0,1));var Uo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_csplatarray_free(e>>>0,1)),Wo=class e{static __wrap(t){t>>>=0;let n=Object.create(e.prototype);return n.__wbg_ptr=t,Uo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Uo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_csplatarray_free(e,0)}get numSplats(){return X.__wbg_get_csplatarray_numSplats(this.__wbg_ptr)>>>0}set numSplats(e){X.__wbg_set_csplatarray_numSplats(this.__wbg_ptr,e)}get maxShDegree(){return X.__wbg_get_csplatarray_maxShDegree(this.__wbg_ptr)>>>0}set maxShDegree(e){X.__wbg_set_csplatarray_maxShDegree(this.__wbg_ptr,e)}inject_rgba8(e){X.csplatarray_inject_rgba8(this.__wbg_ptr,e)}to_extsplats(){let e=X.csplatarray_to_extsplats(this.__wbg_ptr);if(e[2])throw Z(e[1]);return Z(e[0])}to_packedsplats(){let e=X.csplatarray_to_packedsplats(this.__wbg_ptr);if(e[2])throw Z(e[1]);return Z(e[0])}to_extsplats_lod(){let e=X.csplatarray_to_extsplats_lod(this.__wbg_ptr);if(e[2])throw Z(e[1]);return Z(e[0])}to_packedsplats_lod(){let e=X.csplatarray_to_packedsplats_lod(this.__wbg_ptr);if(e[2])throw Z(e[1]);return Z(e[0])}len(){return X.csplatarray_len(this.__wbg_ptr)>>>0}has_lod(){return X.csplatarray_has_lod(this.__wbg_ptr)!==0}tiny_lod(e,t){X.csplatarray_tiny_lod(this.__wbg_ptr,e,t)}bhatt_lod(e){X.csplatarray_bhatt_lod(this.__wbg_ptr,e)}},Go=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_gsplatarray_free(e>>>0,1)),Ko=class e{static __wrap(t){t>>>=0;let n=Object.create(e.prototype);return n.__wbg_ptr=t,Go.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Go.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_gsplatarray_free(e,0)}get numSplats(){return X.__wbg_get_gsplatarray_numSplats(this.__wbg_ptr)>>>0}set numSplats(e){X.__wbg_set_gsplatarray_numSplats(this.__wbg_ptr,e)}get maxShDegree(){return X.__wbg_get_gsplatarray_maxShDegree(this.__wbg_ptr)>>>0}set maxShDegree(e){X.__wbg_set_gsplatarray_maxShDegree(this.__wbg_ptr,e)}inject_rgba8(e){X.gsplatarray_inject_rgba8(this.__wbg_ptr,e)}to_extsplats(){let e=X.gsplatarray_to_extsplats(this.__wbg_ptr);if(e[2])throw Z(e[1]);return Z(e[0])}to_packedsplats(e){let t=X.gsplatarray_to_packedsplats(this.__wbg_ptr,e);if(t[2])throw Z(t[1]);return Z(t[0])}to_extsplats_lod(){let e=X.gsplatarray_to_extsplats_lod(this.__wbg_ptr);if(e[2])throw Z(e[1]);return Z(e[0])}to_packedsplats_lod(e){let t=X.gsplatarray_to_packedsplats_lod(this.__wbg_ptr,e);if(t[2])throw Z(t[1]);return Z(t[0])}len(){return X.gsplatarray_len(this.__wbg_ptr)>>>0}has_lod(){return X.csplatarray_has_lod(this.__wbg_ptr)!==0}tiny_lod(e,t){X.gsplatarray_tiny_lod(this.__wbg_ptr,e,t)}bhatt_lod(e){X.gsplatarray_bhatt_lod(this.__wbg_ptr,e)}};function qo(){let e={wbg:{}};return e.wbg.__wbg_buffer_609cc3eee51ed158=function(e){return e.buffer},e.wbg.__wbg_csplatarray_new=function(e){return Wo.__wrap(e)},e.wbg.__wbg_error_7534b8e9a36f1ab4=function(e,t){let n,r;try{n=e,r=t,console.error(Ao(e,t))}finally{X.__wbindgen_free(n,r,1)}},e.wbg.__wbg_get_67b2ba62fc30de12=function(){return Mo(function(e,t){return Reflect.get(e,t)},arguments)},e.wbg.__wbg_get_b9b93047fe3cf45b=function(e,t){return e[t>>>0]},e.wbg.__wbg_getwithrefkey_1dc361bd10053bfe=function(e,t){return e[t]},e.wbg.__wbg_gsplatarray_new=function(e){return Ko.__wrap(e)},e.wbg.__wbg_instanceof_ArrayBuffer_e14585432e3737fc=function(e){let t;try{t=e instanceof ArrayBuffer}catch{t=!1}return t},e.wbg.__wbg_instanceof_Uint8Array_17156bcf118086a9=function(e){let t;try{t=e instanceof Uint8Array}catch{t=!1}return t},e.wbg.__wbg_length_6ca527665d89694d=function(e){return e.length},e.wbg.__wbg_length_8cfd2c6409af88ad=function(e){return e.length},e.wbg.__wbg_length_a446193dc22c12f8=function(e){return e.length},e.wbg.__wbg_length_e2d2a49132c1b256=function(e){return e.length},e.wbg.__wbg_log_c222819a41e063d3=function(e){console.log(e)},e.wbg.__wbg_new_405e22f390576ce2=function(){return{}},e.wbg.__wbg_new_78feb108b6472713=function(){return[]},e.wbg.__wbg_new_8a6f238a6ece86ea=function(){return Error()},e.wbg.__wbg_new_9fee97a409b32b68=function(e){return new Uint16Array(e)},e.wbg.__wbg_new_a12002a7f91c75be=function(e){return new Uint8Array(e)},e.wbg.__wbg_new_e3b321dcfef89fc7=function(e){return new Uint32Array(e)},e.wbg.__wbg_newwithbyteoffsetandlength_f1dead44d1fc7212=function(e,t,n){return new Uint32Array(e,t>>>0,n>>>0)},e.wbg.__wbg_newwithlength_bd3de93688d68fbc=function(e){return new Uint32Array(e>>>0)},e.wbg.__wbg_push_737cfc8c1432c2c6=function(e,t){return e.push(t)},e.wbg.__wbg_set_3f1d0b984ed272ed=function(e,t,n){e[t]=n},e.wbg.__wbg_set_65595bdd868b3009=function(e,t,n){e.set(t,n>>>0)},e.wbg.__wbg_set_bb8cecf6a62b9f46=function(){return Mo(function(e,t,n){return Reflect.set(e,t,n)},arguments)},e.wbg.__wbg_set_d23661d19148b229=function(e,t,n){e.set(t,n>>>0)},e.wbg.__wbg_set_f4f1f0daa30696fc=function(e,t,n){e.set(t,n>>>0)},e.wbg.__wbg_setindex_c430b78b97744fcc=function(e,t,n){e[t>>>0]=n>>>0},e.wbg.__wbg_stack_0ed75d68575b0f3c=function(e,t){let n=Io(t.stack,X.__wbindgen_malloc,X.__wbindgen_realloc),r=No;Ro().setInt32(e+4,r,!0),Ro().setInt32(e+0,n,!0)},e.wbg.__wbg_subarray_3aaeec89bb2544f0=function(e,t,n){return e.subarray(t>>>0,n>>>0)},e.wbg.__wbg_subarray_769e1e0f81bb259b=function(e,t,n){return e.subarray(t>>>0,n>>>0)},e.wbg.__wbg_subarray_aa9065fa9dc5df96=function(e,t,n){return e.subarray(t>>>0,n>>>0)},e.wbg.__wbindgen_boolean_get=function(e){return typeof e==`boolean`?+!!e:2},e.wbg.__wbindgen_debug_string=function(e,t){let n=Io(zo(t),X.__wbindgen_malloc,X.__wbindgen_realloc),r=No;Ro().setInt32(e+4,r,!0),Ro().setInt32(e+0,n,!0)},e.wbg.__wbindgen_error_new=function(e,t){return Error(Ao(e,t))},e.wbg.__wbindgen_in=function(e,t){return e in t},e.wbg.__wbindgen_init_externref_table=function(){let e=X.__wbindgen_export_3,t=e.grow(4);e.set(0,void 0),e.set(t+0,void 0),e.set(t+1,null),e.set(t+2,!0),e.set(t+3,!1)},e.wbg.__wbindgen_is_falsy=function(e){return!e},e.wbg.__wbindgen_is_object=function(e){return typeof e==`object`&&!!e},e.wbg.__wbindgen_is_undefined=function(e){return e===void 0},e.wbg.__wbindgen_jsval_loose_eq=function(e,t){return e==t},e.wbg.__wbindgen_memory=function(){return X.memory},e.wbg.__wbindgen_number_get=function(e,t){let n=typeof t==`number`?t:void 0;Ro().setFloat64(e+8,Bo(n)?0:n,!0),Ro().setInt32(e+0,!Bo(n),!0)},e.wbg.__wbindgen_number_new=function(e){return e},e.wbg.__wbindgen_string_get=function(e,t){let n=typeof t==`string`?t:void 0;var r=Bo(n)?0:Io(n,X.__wbindgen_malloc,X.__wbindgen_realloc),i=No;Ro().setInt32(e+4,i,!0),Ro().setInt32(e+0,r,!0)},e.wbg.__wbindgen_string_new=function(e,t){return Ao(e,t)},e.wbg.__wbindgen_throw=function(e,t){throw Error(Ao(e,t))},e}async function Jo(e){if(X!==void 0)return X;e!==void 0&&(Object.getPrototypeOf(e)===Object.prototype?{module_or_path:e}=e:console.warn(`using deprecated parameters for the initialization function; pass a single object instead`)),e===void 0&&(e=(e=>e.includes(`/.vite/`)?e.replace(/\.vite\/[^?#]*/,()=>`@miris-inc/three/dist/spark_worker_rs_bg.wasm`):e)(new URL(``+new URL(`spark_worker_rs_bg-CCi4jCSz.wasm`,import.meta.url).href,``+import.meta.url).href));let t=qo();(typeof e==`string`||typeof Request==`function`&&e instanceof Request||typeof URL==`function`&&e instanceof URL)&&(e=fetch(e));let{instance:n,module:r}=await async function(e,t){if(typeof Response==`function`&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming==`function`)try{return await WebAssembly.instantiateStreaming(e,t)}catch(t){if(e.headers.get(`Content-Type`)==`application/wasm`)throw t;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",t)}let n=await e.arrayBuffer();return await WebAssembly.instantiate(n,t)}{let n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}}(await e,t);return function(e,t){return X=e.exports,Jo.__wbindgen_wasm_module=t,Lo=null,Oo=null,X.__wbindgen_start(),X}(n,r)}var Yo=Jo(),Xo=class i extends Ue{constructor(e){if(!e)throw Error(`SparkRenderer options are required`);if(!e.renderer)throw Error(`renderer is required in SparkRenderer options`);let r=i.makeUniforms();Object.assign(r,e.extraUniforms??{});let a=Eo(),o=e.premultipliedAlpha??!0,s=new So,c=new n({glslVersion:y,vertexShader:e.vertexShader??a.splatVertex,fragmentShader:e.fragmentShader??a.splatFragment,uniforms:r,premultipliedAlpha:o,transparent:e.transparent??!0,depthTest:e.depthTest??!0,depthWrite:e.depthWrite??!1,side:2,allowOverride:!1});super(s,c),this.uploadIndex=null,this.pboSize=0,this.ignoreViewChange=!1,this.renderSize=new t,this.lastFrame=-1,this.updateTimeoutId=-1,this.orderingTexture=null,this.maxSplats=0,this.activeSplats=0,this.accumulators=[],this.sorting=!1,this.sortDirty=!1,this.lastSortTime=0,this.sortWorker=null,this.sortTimeoutId=-1,this.sortedCenter=new k().setScalar(-1/0),this.sortedDir=new k().setScalar(0),this.readback32=new Uint32Array,this.lodWorker=null,this.lodMeshes=[],this.lodDirty=!1,this.lodIds=new Map,this.lodIdToSplats=new Map,this.lodInitQueue=[],this.lodInstances=new Map,this.lodUpdates=[],this.lastTraverseTime=0,this.pagerId=0,this.superXY=1,this.flushAfterGenerate=!1,this.flushAfterRead=!1,this.readPause=1,this.sortPause=0,this.sortDelay=0,this.pageSizeWarning=!1,this.material=c,this.uniforms=r,this.frustumCulled=!1,this.renderer=e.renderer,this.premultipliedAlpha=o,this.autoUpdate=e.autoUpdate??!0,this.preUpdate=e.preUpdate??!0,this.maxStdDev=e.maxStdDev??Math.sqrt(8),this.minPixelRadius=e.minPixelRadius??0,this.maxPixelRadius=e.maxPixelRadius??512,this.accumExtSplats=e.accumExtSplats??!1,this.covSplats=e.covSplats??!1,this.minAlpha=e.minAlpha??1/255*.5,this.enable2DGS=e.enable2DGS??!1,this.preBlurAmount=e.preBlurAmount??0,this.blurAmount=e.blurAmount??.3,this.focalDistance=e.focalDistance??0,this.apertureAngle=e.apertureAngle??0,this.falloff=e.falloff??1,this.clipXY=e.clipXY??1.4,this.focalAdjustment=e.focalAdjustment??1,this.encodeLinear=e.encodeLinear??!1,this.sortRadial=e.sortRadial??!0,this.minSortIntervalMs=e.minSortIntervalMs??0,this.enableLod=e.enableLod??!0,this.enableDriveLod=e.enableDriveLod??this.enableLod,this.lodSplatCount=e.lodSplatCount,this.lodSplatScale=e.lodSplatScale??1,this.lodRenderScale=e.lodRenderScale??1,this.pagedExtSplats=e.pagedExtSplats??!1;let l=Ir()?Lr()?96:128:256;this.maxPagedSplats=e.maxPagedSplats??65536*l,this.numLodFetchers=e.numLodFetchers??3,this.outsideFoveate=1,this.behindFoveate=e.behindFoveate??.2,this.coneFov0=e.coneFov0??90,this.coneFov=e.coneFov??120,this.coneFoveate=e.coneFoveate??.4,this.clock=e.clock?Rr(e.clock):new te;let u={extSplats:this.accumExtSplats,covSplats:this.covSplats};if(this.display=new xo(u),this.current=this.display,this.accumulators.push(new xo(u)),this.accumulators.push(new xo(u)),e.target){let{width:t,height:n,doubleBuffer:r}=e.target,i=Math.max(1,Math.min(4,e.target.superXY??1));if(t*i>8192||n*i>8192)throw Error(`Target size too large`);this.superXY=i;let a=t*i,o=n*i,s={format:C,type:v,colorSpace:we};this.target=new Ne(a,o,s),r&&(this.backTarget=new Ne(a,o,s)),this.encodeLinear=e.encodeLinear??!0}}static makeUniforms(){return{renderSize:{value:new t},near:{value:.1},far:{value:1e3},renderToViewQuat:{value:new E},renderToViewPos:{value:new k},renderToViewBasis:{value:new Qe},renderToViewOffset:{value:new k},maxStdDev:{value:1},minPixelRadius:{value:0},maxPixelRadius:{value:512},minAlpha:{value:1/255*.5},enable2DGS:{value:!1},preBlurAmount:{value:0},blurAmount:{value:.3},focalDistance:{value:0},apertureAngle:{value:0},falloff:{value:1},clipXY:{value:1.4},focalAdjustment:{value:1},encodeLinear:{value:!1},inputLinear:{value:!1},ordering:{type:`t`,value:i.emptyOrdering},enableExtSplats:{value:!1},enableCovSplats:{value:!1},extSplats:{type:`t`,value:xo.emptyTexture},extSplats2:{type:`t`,value:xo.emptyTexture},time:{value:0},deltaTime:{value:0},debugFlag:{value:!1},useDepthTest:{value:!1},depthTexture:{type:`t`,value:i.EMPTY_UINT_TEXTURE},debugOverdraw:{value:!1},prePassNormals:{value:!1},normalsTexEnable:{value:!1},normalsTexture:{type:`t`,value:i.EMPTY_HALF_TEXTURE},reflectionEnable:{value:!1},reflectionMapTexture:{type:`t`,value:i.EMPTY_CUBE_TEXTURE},reflectionRotation:{value:new A},reflectionDebugMode:{value:0}}}dispose(){if(this.target&&=(this.target.dispose(),void 0),this.backTarget&&=(this.backTarget.dispose(),void 0),this.orderingTexture&&=(this.orderingTexture.dispose(),null),this.uploadIndex===null){let e=this.renderer;if(e){let t=e.getContext();t.deleteBuffer(this.pbos[0]),t.deleteBuffer(this.pbos[1])}}let e=new Set;e.add(this.display),e.add(this.current);for(let t of this.accumulators)e.add(t);for(let t of e)t.dispose();let t=this.lodInstances.values();this.lodInstances.clear();for(let e of t)e.texture.dispose();this.sortWorker&&=(this.sortWorker.dispose(),null),this.lodWorker&&=(this.lodWorker.dispose(),null),this.pager&&=(this.pager.dispose(),void 0)}onBeforeRender(e,t,n){let r=i.sparkOverride??this,a=e.info.render.frame,o=a!==r.lastFrame;if(r.lastFrame=a,r.target)r.renderSize.set(r.target.width,r.target.height);else{let t=e.getDrawingBufferSize(r.renderSize);if(e.xr.isPresenting&&t.x===1&&t.y===1){let n=e.xr.getSession()?.renderState.baseLayer;n&&(t.x=n.framebufferWidth,t.y=n.framebufferHeight)}}this.uniforms.renderSize.value.copy(r.renderSize);let s=n;if(this.uniforms.near.value=s.near,this.uniforms.far.value=s.far,this.geometry.instanceCount=r.activeSplats,this.uniforms.maxStdDev.value=r.maxStdDev,this.uniforms.minPixelRadius.value=r.minPixelRadius,this.uniforms.maxPixelRadius.value=r.maxPixelRadius,this.uniforms.minAlpha.value=r.minAlpha,this.uniforms.enable2DGS.value=r.enable2DGS,this.uniforms.preBlurAmount.value=r.preBlurAmount,this.uniforms.blurAmount.value=r.blurAmount,this.uniforms.focalDistance.value=r.focalDistance,this.uniforms.apertureAngle.value=r.apertureAngle,this.uniforms.falloff.value=r.falloff,this.uniforms.clipXY.value=r.clipXY,this.uniforms.focalAdjustment.value=r.focalAdjustment,this.uniforms.encodeLinear.value=r.encodeLinear,this.uniforms.inputLinear.value=i.inputLinear,this.uniforms.ordering.value=r.orderingTexture??i.emptyOrdering,this.uniforms.debugFlag.value=performance.now()/1e3%2<1,r.autoUpdate&&o){let i=r.preUpdate&&!e.xr.isPresenting,a=e.xr.isPresenting?e.xr.getCamera():n;i?r.updateInternal({scene:t,camera:a,autoUpdate:!0}):r.updateTimeoutId===-1&&(r.updateTimeoutId=setTimeout(()=>{r.updateTimeoutId=-1,r.updateInternal({scene:t,camera:a,autoUpdate:!0})},1))}this.uniforms.time.value=r.display.time,this.uniforms.deltaTime.value=r.display.deltaTime;let c=new A;this.display.extSplats||c.makeTranslation(r.display.viewOrigin);let l=n.matrixWorld.clone().invert().multiply(c);if(l.decompose(this.uniforms.renderToViewPos.value,this.uniforms.renderToViewQuat.value,new k),this.uniforms.renderToViewBasis.value.setFromMatrix4(l),this.uniforms.enableExtSplats.value=this.display.extSplats,this.uniforms.enableCovSplats.value=this.display.covSplats,this.display.extSplats){let e=r.display.getTextures();this.uniforms.extSplats.value=e[0],this.uniforms.extSplats2.value=e[1]}else{let e=r.display.getTextures();this.uniforms.extSplats.value=e[0],this.uniforms.extSplats2.value=e[0]}}async update({scene:e,camera:t}){await this.updateInternal({scene:e,camera:t,autoUpdate:!1})}updatePBOCapacity(e){let t=this.renderer;if(t){let n=t.getContext();this.uploadIndex===null&&(this.pbos=[n.createBuffer(),n.createBuffer()],this.pbos[0]&&this.pbos[1]&&(this.uploadIndex=0)),this.uploadIndex!==-1&&this.pboSize<e&&(this.pboSize=e,n.bindBuffer(n.PIXEL_UNPACK_BUFFER,this.pbos[0]),n.bufferData(n.PIXEL_UNPACK_BUFFER,4096*e*4*4,n.STREAM_DRAW),n.bindBuffer(n.PIXEL_UNPACK_BUFFER,this.pbos[1]),n.bufferData(n.PIXEL_UNPACK_BUFFER,4096*e*4*4,n.STREAM_DRAW),n.bindBuffer(n.PIXEL_UNPACK_BUFFER,null))}}async updateInternal({scene:e,camera:t,autoUpdate:n}){let r=this.renderer,i=this.time??this.clock.getElapsedTime(),a=t.getWorldPosition(new k),o=t.getWorldDirection(new k),s=(a.distanceTo(this.sortedCenter)>.1||o.dot(this.sortedDir)<.9)&&!this.ignoreViewChange,c=this.accumulators.pop();if(!c)throw Error(`No next accumulator`);if(c===this.current)throw Error(`Next accumulator is the same as the current accumulator`);let{version:l,mappingVersion:u,visibleGenerators:d,generate:f,readback:p}=c.prepareGenerate({renderer:r,scene:e,time:i,camera:t,sortRadial:this.sortRadial??!0,renderSize:this.renderSize,previous:this.current,lodInstances:this.enableLod?this.lodInstances:void 0}),m=!0,h=s||l!==this.current.version;n&&!h&&(m=!1),u!==this.display.mappingVersion&&this.sorting&&(m=!1),m?(f(),this.flushAfterGenerate&&r.getContext().flush(),this.display.mappingVersion===c.mappingVersion?(this.accumulators.push(this.display),this.display=c):this.display!==this.current&&this.accumulators.push(this.current),this.current=c,this.sortDirty=!0):this.accumulators.push(c),this.enableDriveLod&&this.driveLod({visibleGenerators:d,camera:t,scene:e}),await this.driveSort()}async driveSort(){if(this.sorting||!this.sortDirty)return;this.sortTimeoutId!==-1&&(clearTimeout(this.sortTimeoutId),this.sortTimeoutId=-1);let e=performance.now(),t=this.lastSortTime?this.lastSortTime+this.minSortIntervalMs:e;if(e<t)return void(this.sortTimeoutId=setTimeout(()=>{this.sortTimeoutId=-1,this.driveSort()},t-e));this.sorting=!0,this.sortDirty=!1,this.lastSortTime=e;let n=this.current;this.sortedCenter.copy(n.viewOrigin),this.sortedDir.copy(n.viewDirection);let{numSplats:i,maxSplats:a}=n,o=Math.max(1,Math.ceil(a/16384)),s=16384*o;this.maxSplats=Math.max(this.maxSplats,s);let c=new Uint32Array(this.maxSplats);await Yo;let l=n.viewOrigin,u=n.viewDirection,d=this.sortRadial??!0;var f=a;X.depth_buffer_init(f);for(let{node:e,base:t,count:r}of n.mapping){if(!(e instanceof os))continue;let n=e.context.transform,i=n.scale.value,a=n.rotate.value,o=n.translate.value,s=Math.ceil(r/I)*I,c=this.lodInstances.get(e),f=c&&e.context.enableLod.value,p=f?c.indices:void 0,m=f?c.numSplats:0;if(e.packedSplats){let n=f?e.packedSplats.lodSplats:e.packedSplats;n?.packedArray&&Vo(n.packedArray,r,s,t,p,m,i,a.x,a.y,a.z,a.w,o.x,o.y,o.z,l.x,l.y,l.z,u.x,u.y,u.z,d)}else if(e.extSplats){let n=f?e.extSplats.lodSplats:e.extSplats;n?.extArrays?.[0]&&Ho(n.extArrays[0],r,s,t,p,m,i,a.x,a.y,a.z,a.w,o.x,o.y,o.z,l.x,l.y,l.z,u.x,u.y,u.z,d)}}let p=function(e,t){return X.sort_from_depths(e,t)>>>0}(i,c);if(this.activeSplats=p,this.orderingTexture&&o>this.orderingTexture.image.height&&(this.orderingTexture.dispose(),this.orderingTexture=null),this.orderingTexture){let e=this.renderer,t=e.getContext();if(e.properties.has(this.orderingTexture)){let n=e.properties.get(this.orderingTexture).__webglTexture;if(!n)throw Error(`ordering texture not found`);t.bindBuffer(t.PIXEL_UNPACK_BUFFER,this.pbos[this.uploadIndex]),t.bufferSubData(t.PIXEL_UNPACK_BUFFER,0,c),this.uploadIndex=1-this.uploadIndex,e.state.activeTexture(t.TEXTURE0),e.state.bindTexture(t.TEXTURE_2D,n),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texSubImage2D(t.TEXTURE_2D,0,0,0,4096,o,t.RGBA_INTEGER,t.UNSIGNED_INT,0),e.state.bindTexture(t.TEXTURE_2D,null),t.bindBuffer(t.PIXEL_UNPACK_BUFFER,null)}else this.orderingTexture.needsUpdate=!0}else{let e=new Le(c,4096,o,r,D);e.internalFormat=`RGBA32UI`,e.needsUpdate=!0,this.orderingTexture=e,this.updatePBOCapacity(o)}this.current.mappingVersion===n.mappingVersion&&this.current.mappingVersion!==this.display.mappingVersion&&(this.accumulators.push(this.display),this.display=this.current),this.sorting=!1,this.driveSort()}ensureLodWorker(){return this.lodWorker||=new ri,this.lodWorker}driveLod({visibleGenerators:e,camera:t,scene:n}){t.updateMatrixWorld(!0);let r=t.clone(),i=navigator.xr&&/Oculus/.test(navigator.userAgent)?5e5:navigator.xr&&Lr()&&/Safari/.test(navigator.userAgent)&&Ir()?75e4:/Android/.test(navigator.userAgent)||/Tizen/.test(navigator.userAgent)?1e6:Lr()?15e5:25e5,a=(this.lodSplatCount??i)*this.lodSplatScale,o=0,s=1/0,c=1/0;if(r instanceof S){let e=Math.tan(.5*r.fov*Math.PI/180);o=2*e/this.renderSize.y,c=r.fov,s=180*Math.atan(e*r.aspect)/Math.PI*2}o*=this.lodRenderScale;let l=new k,u=new E;this.current.viewToWorld.decompose(l,u,new k),this.lastLod&&(l.distanceTo(this.lastLod.pos)>.001||u.dot(this.lastLod.quat)<.999||this.lastLod.fovXdegrees!==s||this.lastLod.fovYdegrees!==c||this.lastLod.pixelScaleLimit!==o||this.lastLod.maxSplats!==a)&&(this.lodDirty=!0);let d=this.enableLod?e.filter(e=>e instanceof os&&(e.packedSplats?.lodSplats||e.extSplats?.lodSplats||e.paged)&&!1!==e.enableLod):[],f=d.some(e=>e.paged);(this.lodMeshes.length!==d.length||d.some((e,t)=>e!==this.lodMeshes[t].mesh||e.version>this.lodMeshes[t].version))&&(this.lodDirty=!0),this.lodMeshes=d.map(e=>({mesh:e,version:e.version+1})),this.lodInitQueue=[];let p=performance.now();for(let e of d){let t=e.packedSplats?.lodSplats??e.extSplats?.lodSplats??e.paged;if(t){let e=this.lodIds.get(t);e?e.lastTouched=p:this.lodInitQueue.push(t)}}this.ensureLodWorker().tryExclusive(async e=>{if(f&&!this.pager){this.pager=new $o({renderer:this.renderer,extSplats:this.pagedExtSplats,maxSplats:this.maxPagedSplats,numFetchers:this.numLodFetchers});let{lodId:t}=await e.call(`newLodTree`,{capacity:this.pager.maxSplats});this.pagerId=t}if(this.pager)for(let{mesh:e}of this.lodMeshes)e.paged&&!e.paged.pager&&(e.paged.pager=this.pager);if(this.lodInitQueue.length>0){let t=this.lodInitQueue;for(this.lodInitQueue=[];t.length>0;){let n=t.shift();n&&(await this.initLodTree(e,n),this.lodDirty=!0)}}if(this.pager){let e=this.pager.consumeLodTreeUpdates();for(let{splats:t,page:n,chunk:r,numSplats:i,lodTree:a}of e){let e=this.lodIds.get(t);e&&(a&&r===0&&(e.rootPage=n),this.lodUpdates.push({lodId:e.lodId,pageBase:n*this.pager.pageSplats,chunkBase:r*this.pager.pageSplats,count:i,lodTreeData:a}))}}if(this.lodUpdates.length>0){let t=this.lodUpdates;this.lodUpdates=[],await e.call(`updateLodTrees`,{ranges:t}),this.lodDirty=!0}if(this.lodDirty){let t=new k;if(this.lastLod){let e=performance.now()-this.lastLod.timestamp;t.copy(l).sub(this.lastLod.pos).multiplyScalar(this.lastTraverseTime/e)}this.lastLod={pos:l,quat:u,fovXdegrees:s,fovYdegrees:c,pixelScaleLimit:o,maxSplats:a,timestamp:p},this.lodDirty=!1,await this.updateLodInstances(e,r,t,d,n,a,o,s,c)}await this.cleanupLodTrees(e)})}async initLodTree(e,t){if(t instanceof fs||t instanceof Aa){let{lodId:n}=await e.call(`initLodTree`,{numSplats:t.numSplats??0,lodTree:t.extra.lodTree.slice()});this.lodIds.set(t,{lodId:n,lastTouched:performance.now()}),this.lodIdToSplats.set(n,t)}else{let{lodId:n}=await e.call(`newSharedLodTree`,{lodId:this.pagerId});this.lodIds.set(t,{lodId:n,lastTouched:performance.now()}),this.lodIdToSplats.set(n,t)}}async updateLodInstances(e,t,n,r,i,a,o,s,c){let l=new Map,u=r.reduce((e,n)=>{l.set(n.uuid,n);let r=n.matrixWorld.clone().invert().multiply(t.matrixWorld),i=n.packedSplats?.lodSplats??n.extSplats?.lodSplats??n.paged;if(!i)return e;let a=this.lodIds.get(i);return a&&(this.pager&&n.paged&&a.rootPage===void 0||(e[n.uuid]={lodId:a.lodId,rootPage:a.rootPage,viewToObjectCols:r.elements,lodScale:n.lodScale,outsideFoveate:n.outsideFoveate??this.outsideFoveate,behindFoveate:n.behindFoveate??this.behindFoveate,coneFov0:n.coneFov0??this.coneFov0,coneFov:n.coneFov??this.coneFov,coneFoveate:n.coneFoveate??this.coneFoveate})),e},{}),d=performance.now(),{keyIndices:f,chunks:p,pixelLimit:m}=await e.call(`traverseLodTrees`,{maxSplats:a,pixelScaleLimit:o,lastPixelLimit:this.lastPixelLimit,fovXdegrees:s,fovYdegrees:c,instances:u});if(this.lastTraverseTime=performance.now()-d,this.lastPixelLimit=m,Object.values(f).reduce((e,{numSplats:t})=>e+t,0),this.updateLodIndices(l,f),this.pager){this.pager.processUploads();let e=t.getWorldPosition(new k),n=r.map(t=>{if(!t.paged||!this.pager)return null;let n=t.getWorldPosition(new k);return{splats:t.paged,distance:n.distanceTo(e)}}).filter(e=>e!==null);!this.pageSizeWarning&&n.length>this.pager.maxPages&&(this.pageSizeWarning=!0,console.warn(`# paged SplatMeshes exceeds maxPages: ${n.length} > ${this.pager.maxPages}`)),n.sort((e,t)=>e.distance-t.distance),this.pager.fetchPriority=n.map(({splats:e})=>({splats:e,chunk:0}));for(let[e,t]of p){let n=this.lodIdToSplats.get(e);n instanceof Qo&&t!==0&&this.pager.fetchPriority.push({splats:n,chunk:t})}this.pager.driveFetchers()}}async cleanupLodTrees(e){let t=performance.now(),n=null;for(let[e,t]of this.lodIds.entries())(n==null||t.lastTouched<n.lastTouched)&&(n={splats:e,lastTouched:t.lastTouched,lodId:t.lodId});if(n&&!(n.lastTouched>t-3e3)){this.lodIds.delete(n.splats),this.lodIdToSplats.delete(n.lodId);for(let[e,t]of this.lodInstances.entries())t.lodId===n.lodId&&(t.texture.dispose(),this.lodInstances.delete(e));await e.call(`disposeLodTree`,{lodId:n.lodId})}}updateLodIndices(e,t){for(let[n,i]of Object.entries(t)){let{lodId:t,numSplats:a,indices:o}=i,s=e.get(n);if(s.paged)s.paged.update(a,o);else{let e=this.lodInstances.get(s);e&&o.length>e.indices.length&&(e.texture.dispose(),e=void 0);let n=Math.ceil(o.length/16384);if(e){e.numSplats=a,e.indices.set(o.subarray(0,a));let t=this.renderer,r=t.getContext();if(t.properties.has(e.texture)){let i=t.properties.get(e.texture).__webglTexture;if(!i)throw Error(`lodIndices texture not found`);t.state.activeTexture(r.TEXTURE0),t.state.bindTexture(r.TEXTURE_2D,i),r.bindBuffer(r.PIXEL_UNPACK_BUFFER,this.pbos[this.uploadIndex]),r.bufferSubData(r.PIXEL_UNPACK_BUFFER,0,o),this.uploadIndex=1-this.uploadIndex,r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.texSubImage2D(r.TEXTURE_2D,0,0,0,4096,n,r.RGBA_INTEGER,r.UNSIGNED_INT,0),t.state.bindTexture(r.TEXTURE_2D,null),r.bindBuffer(r.PIXEL_UNPACK_BUFFER,null)}}else{let i=16384*n;if(o.length!==i)throw Error(`Indices length != capacity`);let c=new Le(o,4096,n,r,D);c.internalFormat=`RGBA32UI`,c.needsUpdate=!0,e={lodId:t,numSplats:a,indices:o,texture:c},this.lodInstances.set(s,e),this.updatePBOCapacity(n)}}s.updateMappingVersion()}}async readbackDepth({current:e,renderer:t,numSplats:n,readback:r}){if(!t)throw Error(`No renderer`);if(!e.target)throw Error(`No target`);let i=Math.ceil(n/I)*I;if(r.byteLength<4*i)throw Error(`Readback buffer too small: ${r.byteLength} < ${4*i}`);let a=new Uint8Array(r.buffer),o=this.saveRenderState(t),s=4194304,c=0,l=[];for(;c<n;){let r=Math.floor(c/s),i=r*s,o=Math.min(Yn,Math.ceil((n-i)/I)),u=I*o*4,d=a.subarray(4*i,4*i+u);t.setRenderTarget(e.target,r);let f=t.readRenderTargetPixelsAsync(e.target,0,0,I,o,d,void 0,e.extSplats?2:1);l.push(f),this.flushAfterRead&&t.getContext().flush(),c+=I*o}return this.resetRenderState(t,o),Promise.all(l).then(()=>r)}saveRenderState(e){return{target:e.getRenderTarget(),xrEnabled:e.xr.enabled,autoClear:e.autoClear}}resetRenderState(e,t){e.setRenderTarget(t.target),e.xr.enabled=t.xrEnabled,e.autoClear=t.autoClear}render(e,t){try{i.sparkOverride=this,this.renderer.render(e,t)}finally{i.sparkOverride=void 0}}renderTarget({scene:e,camera:t}){let n=this.backTarget??this.target;if(!n)throw Error(`No target`);let r=this.renderer.getRenderTarget();try{this.renderer.setRenderTarget(n),i.sparkOverride=this,this.renderer.render(e,t)}finally{i.sparkOverride=void 0,this.renderer.setRenderTarget(r)}return n!==this.target&&([this.target,this.backTarget]=[this.backTarget,this.target]),n}async readTarget(){if(!this.target)throw Error(`Must initialize with target`);let{width:e,height:t}=this.target,n=e*t*4;(!this.superPixels||this.superPixels.length<n)&&(this.superPixels=new Uint8Array(n));let r=this.superPixels;await this.renderer.readRenderTargetPixelsAsync(this.target,0,0,e,t,r);let{superXY:i}=this;if(i===1)return r;let a=e/i,o=t/i,s=a*o*4;(!this.targetPixels||this.targetPixels.length<s)&&(this.targetPixels=new Uint8Array(s));let c=this.targetPixels,l=i*i;for(let t=0;t<o;t++){let n=t*a;for(let o=0;o<a;o++){let a=o*i,s=0,u=0,d=0,f=0;for(let n=0;n<i;n++){let o=(t*i+n)*e;for(let e=0;e<i;e++){let t=4*(o+a+e);s+=r[t],u+=r[t+1],d+=r[t+2],f+=r[t+3]}}let p=4*(n+o);c[p]=s/l,c[p+1]=u/l,c[p+2]=d/l,c[p+3]=f/l}}return c}async renderReadTarget({scene:e,camera:t}){return this.renderTarget({scene:e,camera:t}),this.readTarget()}async renderCubeMap({scene:t,worldCenter:n,size:r=256,near:a=.1,far:o=1e3,hideObjects:s=[],update:c=!0,filter:l=!1}){if(!i.cubeRender||i.cubeRender.target.width!==r||i.cubeRender.near!==a||i.cubeRender.far!==o){i.cubeRender&&i.cubeRender.target.dispose();let t=new mt(r,{format:C,type:v,generateMipmaps:l,minFilter:l?ft:x,magFilter:x,colorSpace:l?T:we}),n=new e(a,o,t);i.cubeRender={target:t,cubeCamera:n,near:a,far:o}}let{target:u,cubeCamera:d}=i.cubeRender;d.position.copy(n);let f=new Map;for(let e of s)f.set(e,e.visible),e.visible=!1;if(c){let e=new p;e.position.copy(n),await this.update({scene:t,camera:e})}try{i.sparkOverride=this,d.update(this.renderer,t)}finally{i.sparkOverride=void 0}for(let[e,t]of f.entries())e.visible=t;return u.texture}async readCubeTargets(){if(!i.cubeRender)throw Error(`No cube render`);let e=i.cubeRender.target.texture,t=[],n=[];for(let r=0;r<e.images.length;++r){let{width:a,height:o}=e.images[r],s=new Uint8Array(a*o*4);n.push(s);let c=this.renderer.readRenderTargetPixelsAsync(i.cubeRender.target,0,0,a,o,s,r);t.push(c)}return await Promise.all(t),n}async renderEnvMap({scene:e,worldCenter:t,size:n=256,near:r=.1,far:a=1e3,hideObjects:o=[],update:s=!0}){let c=await this.renderCubeMap({scene:e,worldCenter:t,size:n,near:r,far:a,hideObjects:o,update:s,filter:!0});return i.pmrem||=new gt(this.renderer),i.pmrem?.fromCubemap(c).texture}recurseSetEnvMap(e,t){e.traverse(e=>{if(e instanceof Ue)if(Array.isArray(e.material))for(let n of e.material)n instanceof nt&&(n.envMap=t);else e.material instanceof nt&&(e.material.envMap=t)})}async getLodTreeLevel(e,t,n=!1){let r=this.lodInstances.get(e);if(!r)return null;let i=await this.ensureLodWorker().exclusive(async e=>await e.call(`getLodTreeLevel`,{lodId:r.lodId,level:t}));if(e.packedSplats?.lodSplats)return new os({packedSplats:e.packedSplats.lodSplats.extractSplats(i.indices,n)});if(e.extSplats?.lodSplats)return new os({extSplats:e.extSplats.lodSplats.extractSplats(i.indices,n)});throw Error(`Only LoD-enabled PackedSplats and ExtSplats are supported`)}};Xo.inputLinear=!1,Xo.EMPTY_CUBE_TEXTURE=new st,Xo.EMPTY_HALF_TEXTURE=new Le(null,0,0,C,Te),Xo.EMPTY_UINT_TEXTURE=new Le(null,0,0,C,D),Xo.EMPTY_UINT_ARRAY_TEXTURE=new O(null,0,0,0),Xo.emptyOrdering=(()=>{let e=new Le(new Uint32Array(16384),4096,1);return e.format=r,e.type=D,e.internalFormat=`RGBA32UI`,e.needsUpdate=!0,e})(),Xo.cubeRender=null,Xo.pmrem=null;var Zo=Xo,Qo=class{constructor(e){if(this.pager=e.pager,this.rootUrl=e.rootUrl??``,this.requestHeader=e.requestHeader,this.withCredentials=e.withCredentials,this.numSh=0,this.maxSh=e.pager?.maxSh??3,this.numSplats=0,this.dynoNumSplats=new Gi({value:0}),this.dynoIndices=new Xi({value:$o.emptyIndicesTexture}),this.rgbMinMaxLnScaleMinMax=new Ji({value:new j(0,1,qn,9)}),this.lodOpacity=new Wi({value:!1}),this.dynoNumSh=new Gi({value:0}),this.shMax=new qi({value:new k}),this.fileBytes=e.fileBytes,this.fileType=e.fileType,!this.fileType&&this.fileBytes&&(this.fileType=function(e){let t=new DataView(e.buffer).getUint32(0,!0);if((16777215&t)==7957616)return Xn.PLY;if((16777215&t)==559903){let t=function(e,t){let n=[],r=0,i=null,a=new Vn((e,a)=>{if(n.push(e),r+=e.length,a||r>=t){let e=new Uint8Array(r),a=0;for(let t of n)e.set(t,a),a+=t.length;i=e.slice(0,t)}}),o=0;for(;i==null&&o<e.length;){let t=e.slice(o,o+1024);a.push(t,!1),o+=1024}if(i==null&&(a.push(new Uint8Array,!0),i==null))throw Error(`Failed to decompress partial gzip`);return i}(e,4);return new DataView(t.buffer).getUint32(0,!0)===1347635022?Xn.SPZ:void 0}if(t===67324752)return function(e){try{let t=e instanceof ArrayBuffer?new Uint8Array(e):e,n=null,r=function(e,t){for(var n={},r=e.length-22;Ln(e,r)!=101010256;--r)(!r||e.length-r>65558)&&F(13);var i=In(e,r+8);if(!i)return{};var a=Ln(e,r+16),o=a==4294967295||i==65535;if(o){var s=Ln(e,r-12);(o=Ln(e,s)==101075792)&&(i=Ln(e,s+32),a=Ln(e,s+48))}for(var c=t&&t.filter,l=0;l<i;++l){var u=Gn(e,a,o),d=u[0],f=u[1],p=u[2],m=u[3],h=u[4],g=u[5],_=Wn(e,g);a=h,c&&!c({name:m,size:f,originalSize:p,compression:d})||(d?d==8?n[m]=Bn(e.subarray(_,_+f),{out:new N(p)}):F(14,`unknown compression type `+d):n[m]=Mn(e,_,_+f))}return n}(t,{filter:({name:e})=>e.split(/[\\/]/).pop()===`meta.json`&&(n=e,!0)});if(!n)return;let i=function(e){try{let t;if(typeof e==`string`)t=e;else{let n=e instanceof ArrayBuffer?new Uint8Array(e):e;if(n.length>65536)return;t=new TextDecoder().decode(n)}let n=JSON.parse(t);if(!n||typeof n!=`object`||Array.isArray(n))return;let r=n.version===2;for(let e of[`means`,`scales`,`quats`,`sh0`]){if(!n[e]||typeof n[e]!=`object`||Array.isArray(n[e]))return;if(r){if(!n[e].files||(e===`scales`||e===`sh0`)&&!n[e].codebook||!(e!==`means`||n[e].mins&&n[e].maxs))return}else if(!n[e].shape||!n[e].files||!(e===`quats`||n[e].mins&&n[e].maxs))return}return n}catch{return}}(r[n]);return i?{name:n,json:i}:void 0}catch{return}}(e)?Xn.PCSOGSZIP:void 0;if(t===809779538)return Xn.RAD}(this.fileBytes)),!this.fileType&&this.rootUrl&&(this.fileType=function(e){let t=function(e){let t=e.split(/[?#]/,1)[0],n=Math.max(t.lastIndexOf(`/`),t.lastIndexOf(`\\`)),r=t.slice(n+1),i=r.lastIndexOf(`.`);return i<=0||i===r.length-1?``:r.slice(i+1).toLowerCase()}(e);if(t===`ply`)return Xn.PLY;if(t===`spz`)return Xn.SPZ;if(t===`splat`)return Xn.SPLAT;if(t===`ksplat`)return Xn.KSPLAT;if(t===`sog`)return Xn.PCSOGSZIP;if(t===`rad`)return Xn.RAD}(this.rootUrl)),!this.fileType)throw Error(`Unable to determine file type`);this.fileType===Xn.RAD&&(this.radMetaPromise=this.getRadMeta())}dispose(){this.dynoIndices.value.dispose(),this.dynoIndices.value=$o.emptyIndicesTexture}setMaxSh(e){this.maxSh=e}getRadMeta(){return this.radMetaPromise||(this.radMetaPromise=(async()=>{if(await ts,this.fileBytes){let e=Xa(this.fileBytes.slice(0,1048576));if(e)return e;throw Error(`Failed to decode RAD header`)}if(!this.rootUrl)throw Error(`No url or fileBytes provided`);for(let e of[65536,262144,1048576]){let t=Xa(await ns({url:this.rootUrl,requestHeader:this.requestHeader,withCredentials:this.withCredentials,offset:0,bytes:e}));if(t)return t}throw Error(`Failed to decode RAD header`)})().then(e=>e),this.radMetaPromise.catch(e=>{console.error(e)})),this.radMetaPromise}chunkUrl(e){return this.rootUrl.replace(/-lod-0\./,`-lod-${e}.`)}async fetchDecodeChunk(e){let t;if(this.fileType===Xn.RAD){let{meta:n,chunksStart:r}=await this.getRadMeta();if(e<0||e>=n.chunks.length)throw Error(`Chunk index out of range: ${e} (max: ${n.chunks.length-1})`);let{offset:i,bytes:a,filename:o}=n.chunks[e];if(o){if(this.fileBytes)throw Error(`Chunked RAD file not supported with fileBytes`);let e=new URL(this.rootUrl,window.location.href).toString();t=await ns({url:new URL(o,e).toString(),requestHeader:this.requestHeader,withCredentials:this.withCredentials})}else if(i+=r,this.fileBytes){if(i<0||i+a>this.fileBytes.length)throw Error(`Invalid chunk offset or bytes: ${i} + ${a} > ${this.fileBytes.length}`);t=this.fileBytes.slice(i,i+a)}else{if(!this.rootUrl)throw Error(`No url or fileBytes provided`);t=await ns({url:this.rootUrl,requestHeader:this.requestHeader,withCredentials:this.withCredentials,offset:i,bytes:a})}}else if(!this.fileBytes){if(!this.rootUrl)throw Error(`No url or fileBytes provided`);{let n=this.chunkUrl(e),r=new Request(n,{headers:this.requestHeader?new Headers(this.requestHeader):void 0,credentials:this.withCredentials?`include`:`same-origin`}),i=await fetch(r);if(!i.ok||!i.body)throw Error(`Failed to fetch "${n}": ${i.status} ${i.statusText}`);t=new Uint8Array(await i.arrayBuffer())}}return await ii.withWorker(async n=>{if(!this.pager)throw Error(`PagedSplats.pager not set`);if(!this.pager.extSplats){let r=(await n.call(`loadPackedSplats`,{fileBytes:t,pathName:this.chunkUrl(e)})).lodSplats;return this.splatEncoding||(this.splatEncoding=r.splatEncoding,this.numSh=r.extra.sh3?3:r.extra.sh2?2:+!!r.extra.sh1,this.rgbMinMaxLnScaleMinMax.value.set(this.splatEncoding.rgbMin??0,this.splatEncoding.rgbMax??1,this.splatEncoding.lnScaleMin??qn,this.splatEncoding.lnScaleMax??9),this.lodOpacity.value=this.splatEncoding.lodOpacity??!1,this.shMax.value.set(this.splatEncoding.sh1Max??1,this.splatEncoding.sh2Max??1,this.splatEncoding.sh3Max??1)),r}let r=(await n.call(`loadExtSplats`,{fileBytes:t,pathName:this.chunkUrl(e)})).lodSplats;return this.splatEncoding||(this.splatEncoding=Zn,this.numSh=r.extra.sh3a&&r.extra.sh3b?3:r.extra.sh2?2:+!!r.extra.sh1),r})}update(e,t){if(!this.pager)throw Error(`PagedSplats.pager not set`);let n=this.pager.renderer;this.numSplats=e,this.dynoNumSplats.value=this.numSplats;let i=Math.ceil(e/16384),a=this.dynoIndices.value===$o.emptyIndicesTexture?void 0:this.dynoIndices.value;if(a&&i>a.image.height&&(a.dispose(),a=void 0),a){a.image.data.set(t.subarray(0,e));let r=n.getContext();n.state.activeTexture(r.TEXTURE0),n.state.bindTexture(r.TEXTURE_2D,es(n,a)),r.bindBuffer(r.PIXEL_UNPACK_BUFFER,null),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.texSubImage2D(r.TEXTURE_2D,0,0,0,4096,i,r.RGBA_INTEGER,r.UNSIGNED_INT,t),n.state.bindTexture(r.TEXTURE_2D,null)}else a=new Le(t,4096,i,r,D),a.internalFormat=`RGBA32UI`,a.needsUpdate=!0,n.initTexture(a),this.dynoIndices.value=a}prepareFetchSplat(){}getNumSplats(){return this.numSplats}hasRgbDir(){return!!this.pager&&Math.min(this.numSh,this.pager.maxSh)>0}getNumSh(){return this.numSh}fetchSplat({index:e,viewOrigin:t}){if(!this.pager)throw Error(`PagedSplats.pager not set`);let n=this.pager.readIndex.apply({index:e,numSplats:this.dynoNumSplats,indices:this.dynoIndices}).index;return this.pager.extSplats?this.hasRgbDir()&&t?(this.dynoNumSh.value=Math.min(this.numSh,this.maxSh,this.pager.maxSh),this.pager.readSplatExtDir.apply({index:n,viewOrigin:t,numSh:this.dynoNumSh}).gsplat):this.pager.readSplatExt.apply({index:n}).gsplat:this.hasRgbDir()&&t?(this.dynoNumSh.value=Math.min(this.numSh,this.maxSh,this.pager.maxSh),this.pager.readSplatDir.apply({index:n,rgbMinMaxLnScaleMinMax:this.rgbMinMaxLnScaleMinMax,lodOpacity:this.lodOpacity,viewOrigin:t,numSh:this.dynoNumSh,shMax:this.shMax}).gsplat):this.pager.readSplat.apply({index:n,rgbMinMaxLnScaleMinMax:this.rgbMinMaxLnScaleMinMax,lodOpacity:this.lodOpacity}).gsplat}},Q=class e{constructor(t){this.splatsChunkToPage=new Map,this.pageToSplatsChunk=[],this.renderer=t.renderer,this.extSplats=t.extSplats??!1,this.pageSplats=65536,this.maxSplats=t.maxSplats??16777216,this.maxPages=Math.ceil(this.maxSplats/this.pageSplats),this.maxSplats=this.maxPages*this.pageSplats,this.maxSh=t.maxSh??3,this.curSh=0,this.autoDrive=t.autoDrive??!0,this.numFetchers=t.numFetchers??3,this.splatsChunkToPage=new Map,this.pageToSplatsChunk=Array(this.maxPages),this.pageFreelist=Array.from({length:this.maxPages},(e,t)=>t),this.pageLru=new Set,this.freeablePages=[],this.newUploads=[],this.readyUploads=[],this.lodTreeUpdates=[],this.fetchers=[],this.fetched=[],this.fetchPriority=[],this.packedTexture=new Zi({value:this.newUint32ArrayTexture(new Uint32Array(256*this.maxPages*256*4),256,256,this.maxPages,r,D,`RGBA32UI`)}),this.extTexture=new Zi({value:this.extSplats?this.newUint32ArrayTexture(new Uint32Array(256*this.maxPages*256*4),256,256,this.maxPages,r,D,`RGBA32UI`):e.emptyExtTexture}),this.sh1Texture=new Zi({value:this.extSplats?e.emptyExtSh1Texture:e.emptySh1Texture}),this.sh2Texture=new Zi({value:this.extSplats?e.emptyExtSh2Texture:e.emptySh2Texture}),this.sh3Texture=new Zi({value:this.extSplats?e.emptyExtSh3Texture:e.emptySh3Texture}),this.sh3TextureB=new Zi({value:e.emptyExtSh3BTexture}),this.readIndex=U({index:`int`,numSplats:`int`,indices:`usampler2D`},{index:`int`},({index:e,numSplats:t,indices:n})=>new H({inTypes:{index:`int`,numSplats:`int`,indices:`usampler2D`},outTypes:{index:`int`},inputs:{index:e,numSplats:t,indices:n},statements:({inputs:e,outputs:t})=>W(`\n            if (${e.index} >= ${e.numSplats}) {\n              return;\n            }\n\n            ivec2 indexCoord = ivec2((${e.index} >> 2) & 4095, ${e.index} >> 14);\n            uint index = texelFetch(${e.indices}, indexCoord, 0)[${e.index} & 3];\n            ${t.index} = int(index);\n          `)}).outputs),this.readSplat=U({index:`int`,rgbMinMaxLnScaleMinMax:`vec4`,lodOpacity:`bool`},{gsplat:q},({index:e,rgbMinMaxLnScaleMinMax:t,lodOpacity:n})=>new H({inTypes:{index:`int`,packedTexture:`usampler2DArray`,rgbMinMaxLnScaleMinMax:`vec4`,lodOpacity:`bool`},outTypes:{gsplat:q},inputs:{index:e,packedTexture:this.packedTexture,rgbMinMaxLnScaleMinMax:t,lodOpacity:n},globals:()=>[hi],statements:({inputs:e,outputs:t})=>W(`\n            int index = ${e.index};\n            ivec3 splatCoord = pagedSplatTexCoord(index);\n            uvec4 packed = texelFetch(${e.packedTexture}, splatCoord, 0);\n\n            unpackSplatEncoding(packed, ${t.gsplat}.center, ${t.gsplat}.scales, ${t.gsplat}.quaternion, ${t.gsplat}.rgba, ${e.rgbMinMaxLnScaleMinMax});\n            if ((${t.gsplat}.rgba.a == 0.0) || all(equal(${t.gsplat}.scales, vec3(0.0, 0.0, 0.0)))) {\n              return;\n            }\n\n            ${t.gsplat}.index = index;\n            ${t.gsplat}.flags = GSPLAT_FLAG_ACTIVE;\n            if (${e.lodOpacity}) {\n              ${t.gsplat}.rgba.a *= 2.0;\n            }\n          `)}).outputs),this.readSplatDir=U({index:`int`,rgbMinMaxLnScaleMinMax:`vec4`,lodOpacity:`bool`,viewOrigin:`vec3`,numSh:`int`,shMax:`vec3`},{gsplat:q},({index:e,rgbMinMaxLnScaleMinMax:t,lodOpacity:n,viewOrigin:r,numSh:i,shMax:a})=>{if(!(e&&t&&n&&r&&i&&a))throw Error(`index and viewOrigin are required`);let o=this.readSplat.apply({index:e,rgbMinMaxLnScaleMinMax:t,lodOpacity:n}).gsplat,s=J(o).outputs.center,c=xa(oa(s,r)),l=_s({coord:mi(e),viewDir:c,numSh:i,sh1Texture:this.sh1Texture,sh2Texture:this.sh2Texture,sh3Texture:this.sh3Texture,shMax:a}).rgb;return l=aa(l,J(o).outputs.rgb),o=ui({gsplat:o,rgb:l}),{gsplat:o}}),this.readSplatExt=U({index:`int`},{gsplat:q},({index:e})=>new H({inTypes:{index:`int`,extTexture1:`usampler2DArray`,extTexture2:`usampler2DArray`},outTypes:{gsplat:q},inputs:{index:e,extTexture1:this.packedTexture,extTexture2:this.extTexture},globals:()=>[hi],statements:({inputs:e,outputs:t})=>W(`\n            int index = ${e.index};\n            ivec3 splatCoord = ivec3(index & 255, (index >> 8) & 255, index >> 16);\n            uvec4 ext1 = texelFetch(${e.extTexture1}, splatCoord, 0);\n            float alpha = unpackSplatExtAlpha(ext1);\n            if (alpha == 0.0) {\n              return;\n            }\n\n            uvec4 ext2 = texelFetch(${e.extTexture2}, splatCoord, 0);\n            unpackSplatExt(ext1, ext2, ${t.gsplat}.center, ${t.gsplat}.scales, ${t.gsplat}.quaternion, ${t.gsplat}.rgba, ${t.gsplat}.reflectance);\n            if (all(equal(${t.gsplat}.scales, vec3(0.0, 0.0, 0.0)))) {\n              return;\n            }\n\n            ${t.gsplat}.index = index;\n            ${t.gsplat}.flags = GSPLAT_FLAG_ACTIVE;\n          `)}).outputs),this.readSplatExtDir=U({index:`int`,viewOrigin:`vec3`,numSh:`int`},{gsplat:q},({index:e,viewOrigin:t,numSh:n})=>{if(!e||!t||!n)throw Error(`index and viewOrigin are required`);let r=this.readSplatExt.apply({index:e}).gsplat,i=J(r).outputs.center,a=xa(oa(i,t)),o=Fa({coord:mi(e),viewDir:a,numSh:n,sh1Texture:this.sh1Texture,sh2Texture:this.sh2Texture,sh3TextureA:this.sh3Texture,sh3TextureB:this.sh3TextureB}).rgb;return o=aa(o,J(r).outputs.rgb),r=ui({gsplat:r,rgb:o}),{gsplat:r}})}dispose(){this.autoDrive=!1,this.numFetchers=0,this.packedTexture.value.dispose(),this.extTexture.value!==e.emptyExtTexture&&this.extTexture.value.dispose(),this.extSplats?(this.sh1Texture.value!==e.emptyExtSh1Texture&&this.sh1Texture.value.dispose(),this.sh2Texture.value!==e.emptyExtSh2Texture&&this.sh2Texture.value.dispose(),this.sh3Texture.value!==e.emptyExtSh3Texture&&this.sh3Texture.value.dispose(),this.sh3TextureB.value!==e.emptyExtSh3BTexture&&this.sh3TextureB.value.dispose()):(this.sh1Texture.value!==e.emptySh1Texture&&this.sh1Texture.value.dispose(),this.sh2Texture.value!==e.emptySh2Texture&&this.sh2Texture.value.dispose(),this.sh3Texture.value!==e.emptySh3Texture&&this.sh3Texture.value.dispose())}ensureShTextures(t){this.curSh=Math.max(this.curSh,t),this.extSplats?this.curSh>=1&&this.sh1Texture.value===e.emptyExtSh1Texture&&(this.sh1Texture.value=this.newUint32ArrayTexture(new Uint32Array(256*this.maxPages*256*4),256,256,this.maxPages,1033,1014,`RGBA32UI`)):this.curSh>=1&&this.sh1Texture.value===e.emptySh1Texture&&(this.sh1Texture.value=this.newUint32ArrayTexture(new Uint32Array(256*this.maxPages*256*2),256,256,this.maxPages,1031,1014,`RG32UI`)),this.curSh>=2&&this.sh2Texture.value===(this.extSplats?e.emptyExtSh2Texture:e.emptySh2Texture)&&(this.sh2Texture.value=this.newUint32ArrayTexture(new Uint32Array(256*this.maxPages*256*4),256,256,this.maxPages,1033,1014,`RGBA32UI`)),this.extSplats?this.curSh>=3&&(this.sh3Texture.value===e.emptyExtSh3Texture&&(this.sh3Texture.value=this.newUint32ArrayTexture(new Uint32Array(256*this.maxPages*256*4),256,256,this.maxPages,1033,1014,`RGBA32UI`)),this.sh3TextureB.value===e.emptyExtSh3BTexture&&(this.sh3TextureB.value=this.newUint32ArrayTexture(new Uint32Array(256*this.maxPages*256*4),256,256,this.maxPages,1033,1014,`RGBA32UI`))):this.curSh>=3&&this.sh3Texture.value===e.emptySh3Texture&&(this.sh3Texture.value=this.newUint32ArrayTexture(new Uint32Array(256*this.maxPages*256*4),256,256,this.maxPages,1033,1014,`RGBA32UI`))}allocatePage(){return this.pageFreelist.shift()}freePage(e){this.pageFreelist.push(e)}getSplatsChunk(e,t){let n=this.splatsChunkToPage.get(e);if(n)return n[t]}insertSplatsChunkPage(e,t,n,r){this.splatsChunkToPage.has(e)||this.splatsChunkToPage.set(e,[]);let i=this.splatsChunkToPage.get(e);if(!i)throw Error(`impossible`);t>=i.length&&(i.length=t+1);let a={page:n,lru:r};return i[t]=a,this.pageLru.add(a),this.pageToSplatsChunk[n]={splats:e,chunk:t},this.pageToSplatsChunk[n]}removeSplatsChunkPage(e,t,n){let r=this.splatsChunkToPage.get(e);if(!r)throw Error(`impossible`);let i=r[t];if(!i)throw Error(`pageLru not found for splats: ${e}, chunk: ${t}, page: ${n}`);for(this.pageLru.delete(i),r[t]=void 0;r.length>0&&r[r.length-1]===void 0;)r.pop();for(r.length===0&&this.splatsChunkToPage.delete(e),this.pageToSplatsChunk[n]=void 0;this.pageToSplatsChunk.length>0&&this.pageToSplatsChunk[this.pageToSplatsChunk.length-1]===void 0;)this.pageToSplatsChunk.pop()}uploadPage(t,n,r,i){let a=t*this.pageSplats;this.packedTexture.value.image.data.subarray(4*a,4*a+n.length).set(n),this.packedTexture.value.addLayerUpdate(t),this.packedTexture.value.needsUpdate=!0,i&&(this.extTexture.value.image.data.subarray(4*a,4*a+i.length).set(i),this.extTexture.value.addLayerUpdate(t),this.extTexture.value.needsUpdate=!0);let o=this.extSplats?r.sh3a&&r.sh3b?3:r.sh2?2:+!!r.sh1:r.sh3?3:r.sh2?2:+!!r.sh1;if(this.ensureShTextures(o),this.extSplats){if(this.sh1Texture.value!==e.emptyExtSh1Texture&&r.sh1){let e=r.sh1;this.sh1Texture.value.image.data.subarray(4*a,4*a+e.length).set(e),this.sh1Texture.value.addLayerUpdate(t),this.sh1Texture.value.needsUpdate=!0}}else if(this.sh1Texture.value!==e.emptySh1Texture&&r.sh1){let e=r.sh1;this.sh1Texture.value.image.data.subarray(2*a,2*a+e.length).set(e),this.sh1Texture.value.addLayerUpdate(t),this.sh1Texture.value.needsUpdate=!0}if(this.sh2Texture.value!==e.emptySh2Texture&&r.sh2){let e=r.sh2;this.sh2Texture.value.image.data.subarray(4*a,4*a+e.length).set(e),this.sh2Texture.value.addLayerUpdate(t),this.sh2Texture.value.needsUpdate=!0}if(this.extSplats){if(this.sh3Texture.value!==e.emptyExtSh3Texture&&r.sh3a){let e=r.sh3a;this.sh3Texture.value.image.data.subarray(4*a,4*a+e.length).set(e),this.sh3Texture.value.addLayerUpdate(t),this.sh3Texture.value.needsUpdate=!0}if(this.sh3TextureB.value!==e.emptyExtSh3BTexture&&r.sh3b){let e=r.sh3b;this.sh3TextureB.value.image.data.subarray(4*a,4*a+e.length).set(e),this.sh3TextureB.value.addLayerUpdate(t),this.sh3TextureB.value.needsUpdate=!0}}else if(this.sh3Texture.value!==e.emptySh3Texture&&r.sh3){let e=r.sh3;this.sh3Texture.value.image.data.subarray(4*a,4*a+e.length).set(e),this.sh3Texture.value.addLayerUpdate(t),this.sh3Texture.value.needsUpdate=!0}}getGlTexture(e){return es(this.renderer,e)}newUint32ArrayTexture(e,t,n,r,i,a,o){let s=new O(e,t,n,r);return s.format=i,s.type=a,s.internalFormat=o,s.needsUpdate=!0,this.renderer.initTexture(s),s}driveFetchers(){let e=[],t=[],n=0;for(let{splats:r,chunk:i}of this.fetchPriority){let a=this.getSplatsChunk(r,i);if(a)n>=this.maxPages?t.push(a):e.push(a),n+=1;else if(this.fetched.some(({splats:e,chunk:t})=>r===e&&i===t)||this.fetchers.some(({splats:e,chunk:t})=>r===e&&i===t))n+=1;else if(n<this.maxPages&&this.fetchers.length<this.numFetchers){n+=1;let e=r.fetchDecodeChunk(i).then(e=>{this.fetched.push({splats:r,chunk:i,data:e}),this.fetchers=this.fetchers.filter(({splats:e,chunk:t})=>r!==e||i!==t),this.processFetched()});this.fetchers.push({splats:r,chunk:i,promise:e}),e.then(e=>{this.autoDrive&&this.driveFetchers()})}}let r=performance.now();for(let e of t.reverse())e.lru=r,this.pageLru.delete(e),this.pageLru.add(e);let i=new Set(this.pageLru);for(let t of e.reverse())i.delete(t),t.lru=r,this.pageLru.delete(t),this.pageLru.add(t);this.freeablePages=Array.from(i).map(({page:e})=>e)}allocateFreeable(){let e=this.freeablePages.shift();if(e===void 0)return;let t=this.pageToSplatsChunk[e];if(!t)throw Error(`splatsChunk not found for page: ${e}`);let{splats:n,chunk:r}=t;return this.removeSplatsChunkPage(n,r,e),this.lodTreeUpdates.push({splats:n,page:e,chunk:r,numSplats:this.pageSplats}),e}processFetched(){let e=performance.now();for(;;){let t=this.fetched.shift();if(!t)break;let{splats:n,chunk:r,data:i}=t,a=this.allocatePage();if(a===void 0&&(a=this.allocateFreeable(),a===void 0))return;this.insertSplatsChunkPage(n,r,a,e);let{numSplats:o,extra:s}=i;if(this.lodTreeUpdates.push({splats:n,page:a,chunk:r,numSplats:o,lodTree:s.lodTree}),this.extSplats){let e=i.extArrays,t=e[0],n=e[1];this.newUploads.push({page:a,numSplats:o,packedArray:t,extArray:n,extra:s})}else{let e=i.packedArray;this.newUploads.push({page:a,numSplats:o,packedArray:e,extra:s})}}}processUploads(){for(;;){let e=this.readyUploads.shift();if(!e)break;let{page:t,numSplats:n,packedArray:r,extArray:i,extra:a}=e;this.uploadPage(t,r,a,i)}}consumeLodTreeUpdates(){let e=this.lodTreeUpdates;return this.lodTreeUpdates=[],this.readyUploads.push(...this.newUploads),this.newUploads=[],e}};Q.emptyUint32x4=(()=>{let{width:e,height:t,depth:n,maxSplats:i}=K(1),a=new O(new Uint32Array(4*i),e,t,n);return a.format=r,a.type=D,a.internalFormat=`RGBA32UI`,a.needsUpdate=!0,a})(),Q.emptyUint32x2=(()=>{let{width:e,height:t,depth:n,maxSplats:r}=K(1),i=new O(new Uint32Array(2*r),e,t,n);return i.format=de,i.type=D,i.internalFormat=`RG32UI`,i.needsUpdate=!0,i})(),Q.emptyIndicesTexture=(()=>{let e=new Le(new Uint32Array(16384),4096,1);return e.format=r,e.type=D,e.internalFormat=`RGBA32UI`,e.needsUpdate=!0,e})(),Q.emptyPackedTexture=Q.emptyUint32x4,Q.emptyExtTexture=Q.emptyUint32x4,Q.emptySh1Texture=Q.emptyUint32x2,Q.emptySh2Texture=Q.emptyUint32x4,Q.emptySh3Texture=Q.emptyUint32x4,Q.emptyExtSh1Texture=Q.emptyUint32x4,Q.emptyExtSh2Texture=Q.emptyUint32x4,Q.emptyExtSh3Texture=Q.emptyUint32x4,Q.emptyExtSh3BTexture=Q.emptyUint32x4;var $o=Q;function es(e,t){if(!e.properties.has(t))throw Error(`texture not found`);let n=e.properties.get(t).__webglTexture;if(!n)throw Error(`texture not found`);return n}var ts=Qa();async function ns({url:e,requestHeader:t,withCredentials:n,offset:r,bytes:i}){let a=new Request(e,{headers:t?new Headers(t):void 0,credentials:n?`include`:`same-origin`});r!==void 0&&i!==void 0&&a.headers.set(`Range`,`bytes=${r}-${r+i-1}`);let o=await fetch(a);if(!o.ok||!o.body)throw Error(`Failed to fetch "${e}": ${o.status} ${o.statusText}`);return new Uint8Array(await o.arrayBuffer())}function rs(e,t){let n=ba(e,V(`vec3`,[.2126,.7152,.0722]));return ui({gsplat:t,rgb:aa(sa(V(`vec3`,[1,1,1]),sa(n,V(`float`,2))),V(`vec3`,[.5,.5,.5]))})}var is=class{constructor(){this.fetchDyno=new H({inTypes:{},outTypes:{gsplat:q},globals:()=>[hi],statements:({outputs:e})=>W(`\n      ${e.gsplat}.flags = 0u;\n      return;\n    `)}).outputs.gsplat}prepareFetchSplat(){}dispose(){}getNumSplats(){return 0}hasRgbDir(){return!1}getNumSh(){return 0}setMaxSh(e){}fetchSplat({index:e}){return this.fetchDyno}},as=class e extends yo{constructor(e={}){if(super({update:e=>this.update(e)}),this.isInitialized=!1,this.recolor=new w(1,1,1),this.opacity=1,this.generatorDirty=!0,this.enableViewToObject=!1,this.enableViewToWorld=!1,this.enableWorldToView=!1,this.skinning=null,this.edits=null,this.rgbaDisplaceEdits=null,this.splatRgba=null,this.maxSh=3,this.shDebugSHOnly=!1,this.showLodPageDyno=new Gi({value:0}),e.splats)this.splats=e.splats,this.numSplats=e.splats.getNumSplats();else if(e.paged){e.extSplats&&console.warn(`To set extSplats with the paged option, set SparkRenderer.pagedExtSplats`);let t=e.url??``;if(!0===e.paged)this.paged=new Qo({rootUrl:t});else if(e.paged instanceof Qo)this.paged=e.paged;else{if(!(e.paged instanceof $o))throw Error(`Invalid paged option`);this.paged=new Qo({rootUrl:t,pager:e.paged})}this.splats=this.paged}else e.extSplats?(this.extSplats=e.extSplats instanceof Aa?e.extSplats:new Aa,e.extSplats=this.extSplats,this.numSplats=this.extSplats.numSplats,this.splats=this.extSplats):e.packedSplats?(this.packedSplats=e.packedSplats,this.packedSplats.splatEncoding=e.splatEncoding??{...Zn},this.splats=this.packedSplats):this.packedSplats=new fs;if(this.editable=e.editable??!0,this.raycastable=e.raycastable??!0,this.minRaycastOpacity=e.minRaycastOpacity??.2,this.onFrame=e.onFrame,this.context={transform:new _o,viewToWorld:new _o,worldToView:new _o,viewToObject:new _o,covTransform:new vo,covViewToWorld:new vo,covWorldToView:new vo,covViewToObject:new vo,recolor:new Ji({value:new j().setScalar(-1/0)}),time:new Ki({value:0}),deltaTime:new Ki({value:0}),numSplats:new Gi({value:0}),splats:new is,enableLod:new Wi({value:!1}),lodIndices:new Xi({value:ls,key:`lodIndices`})},this.covSplats=e.covSplats??!1,this.covSplats&&!this.extSplats)throw Error(`CovSplats requires ExtSplats`);if(this.objectModifiers=e.objectModifier?[e.objectModifier]:void 0,this.worldModifiers=e.worldModifier?[e.worldModifier]:void 0,e.objectModifiers&&(this.objectModifiers=e.objectModifiers),e.worldModifiers&&(this.worldModifiers=e.worldModifiers),this.enableLod=e.enableLod,this.lodScale=e.lodScale??1,this.outsideFoveate=void 0,this.behindFoveate=e.behindFoveate,this.coneFov0=e.coneFov0,this.coneFov=e.coneFov,this.coneFoveate=e.coneFoveate,this.updateGenerator(),e.url||e.fileBytes||e.stream||e.constructSplats||e.packedSplats&&!e.packedSplats.isInitialized||this.extSplats&&!this.extSplats.isInitialized)this.initialized=this.asyncInitialize(e).then(async()=>{if(this.updateGenerator(),this.isInitialized=!0,e.onLoad){let t=e.onLoad(this);t instanceof Promise&&await t}return this});else if(this.isInitialized=!0,this.initialized=Promise.resolve(this),e.onLoad){let t=e.onLoad(this);t instanceof Promise&&(this.initialized=t.then(()=>this))}}async asyncInitialize(e){let{url:t,fileBytes:n,fileType:r,fileName:i,stream:a,streamLength:o,maxSplats:s,constructSplats:c,onProgress:l,splatEncoding:u,lod:d,nonLod:f,lodAbove:p}=e;if(this.packedSplats){if(t||n||a||c){let e={url:t,fileBytes:n,fileType:r,fileName:i,stream:a,streamLength:o,maxSplats:s,construct:c,onProgress:l,splatEncoding:u,lod:d,nonLod:f,lodAbove:p};this.packedSplats.reinitialize(e)}await this.packedSplats.initialized,this.splats=this.packedSplats}else if(this.extSplats&&(t||n||a||c)){let e=c;this.extSplats.reinitialize({url:t,fileBytes:n,fileType:r,fileName:i,stream:a,streamLength:o,maxSplats:s,construct:e,onProgress:l,lod:d,nonLod:f,lodAbove:p}),await this.extSplats.initialized,this.splats=this.extSplats}this.splats&&(this.numSplats=this.splats.getNumSplats(),this.updateGenerator())}static async staticInitialize(){await Qa(),e.isStaticInitialized=!0}pushSplat(e,t,n,r,i){this.packedSplats?this.packedSplats.pushSplat(e,t,n,r,i):this.extSplats&&this.extSplats.pushSplat(e,t,n,r,i)}forEachSplat(e){this.packedSplats?this.packedSplats.forEachSplat(e):this.extSplats&&this.extSplats.forEachSplat(e)}evictGenerator(e){let t=xo.generatorProgram.get(e);if(t){xo.generatorProgram.delete(e);let n=ea.get(t);n&&(n.dispose(),ea.delete(t))}}setGenerators(e,t){this.generator&&this.evictGenerator(this.generator),this.covGenerator&&this.evictGenerator(this.covGenerator),this.generator=e,this.covGenerator=t}evictGenerator(e){let t=xo.generatorProgram.get(e);if(t){xo.generatorProgram.delete(e);let n=ea.get(t);n&&(n.dispose(),ea.delete(t))}}setGenerators(e,t){this.generator&&this.evictGenerator(this.generator),this.covGenerator&&this.evictGenerator(this.covGenerator),this.generator=e,this.covGenerator=t}dispose(){this.setGenerators(void 0,void 0),this.rgbaDisplaceEdits&&=(this.rgbaDisplaceEdits.dispose(),null),this.splatRgba&&=(this.splatRgba.dispose(),null),this.splats&&this.splats!==this.packedSplats&&this.splats!==this.extSplats&&(this.splats.dispose(),this.splats=void 0),this.packedSplats&&=(this.packedSplats.dispose(),void 0),this.extSplats&&=(this.extSplats.dispose(),void 0),this.rgbaDisplaceEdits&&=(this.rgbaDisplaceEdits.dispose(),null),this.splatRgba&&=(this.splatRgba.dispose(),null)}getBoundingBox(e=!0){if(!this.initialized)throw Error(`Cannot get bounding box before SplatMesh is initialized`);if(!this.packedSplats&&!this.extSplats)throw Error(`Bounding box requires PackedSplats or ExtSplats`);let t=new k(1/0,1/0,1/0),n=new k(-1/0,-1/0,-1/0),r=new k,i=[-1,1];function a(a,o,s,c,l,u){if(e)t.min(o),n.max(o);else for(let e of i)for(let a of i)for(let l of i)r.set(e*s.x,a*s.y,l*s.z),r.applyQuaternion(c),r.add(o),t.min(r),n.max(r)}return this.packedSplats?this.packedSplats.forEachSplat(a):this.extSplats&&this.extSplats.forEachSplat(a),new d(t,n)}set objectModifier(e){this.objectModifiers=e?[e]:void 0}set worldModifier(e){this.worldModifiers=e?[e]:void 0}applySHDebug(e,t,n,r){if(!this.shDebugSHOnly||!e.evaluateSH)return t;let i=e.evaluateSH({index:n,gsplat:t,viewOrigin:r});return i?rs(i,t):t}constructGenerator(e){if(this.covSplats)return this.constructCovGenerator(e);let{transform:t,viewToObject:n,recolor:r}=e,i=U({index:`int`},{gsplat:q},({index:i})=>{if(!i)throw Error(`index is undefined`);i=ss(e.lodIndices,i,e.numSplats,e.enableLod,this.showLodPageDyno),e.splats.setMaxSh(this.maxSh),e.splats.prepareFetchSplat();let a=e.splats.fetchSplat({index:i,viewOrigin:n.translate});if(this.shDebugSHOnly&&(a=this.applySHDebug(e.splats,a,i,n.translate)),this.splatRgba&&(a=cs(a,this.splatRgba.dyno,i,e.enableLod)),this.skinning&&(a=this.skinning.modify(a)),this.objectModifiers)for(let e of this.objectModifiers)a=e.apply({gsplat:a}).gsplat;a=t.applyGsplat(a);let o=sa(r,J(a).outputs.rgba);if(a=ui({gsplat:a,rgba:o}),this.rgbaDisplaceEdits&&(a=this.rgbaDisplaceEdits.modify(a)),this.worldModifiers)for(let e of this.worldModifiers)a=e.apply({gsplat:a}).gsplat;return{gsplat:a}});this.setGenerators(i,void 0)}constructCovGenerator(e){let{covTransform:t,covViewToObject:n,recolor:r}=e,i=U({index:`int`},{covsplat:ai},({index:i})=>{if(!i)throw Error(`index is undefined`);i=ss(e.lodIndices,i,e.numSplats,e.enableLod,this.showLodPageDyno),e.splats.prepareFetchSplat();let a=e.splats.fetchSplat({index:i,viewOrigin:n.offset});if(this.shDebugSHOnly&&(a=this.applySHDebug(e.splats,a,i,n.offset)),this.splatRgba&&(a=cs(a,this.splatRgba.dyno,i,e.enableLod)),this.objectModifiers)for(let e of this.objectModifiers)a=e.apply({gsplat:a}).gsplat;let o=li(a);if(this.skinning&&(o=this.skinning.modifyCov(o)),this.covObjectModifiers)for(let e of this.covObjectModifiers)o=e.apply({covsplat:o}).covsplat;o=t.applyCovSplat(o);let s=sa(r,Ai(o).outputs.rgba);if(o=ji({covsplat:o,rgba:s}),this.rgbaDisplaceEdits&&(o=this.rgbaDisplaceEdits.modifyCov(o)),this.covWorldModifiers)for(let e of this.covWorldModifiers)o=e.apply({covsplat:o}).covsplat;return{covsplat:o}});this.setGenerators(void 0,i)}updateGenerator(){this.generatorDirty=!0}update({renderer:t,time:n,deltaTime:r,viewToWorld:i,camera:a,renderSize:o,globalEdits:s,lodIndices:c}){this.context.time.value=n,this.context.deltaTime.value=r,e.dynoTime.value=n,this.showLodPageDyno.value=this.showLodPage??-1;let l=this.splats??this.packedSplats??this.extSplats;l&&(this.context.splats=l),this.numSplats=this.context.splats.getNumSplats();let u=!1;if(this.covSplats){this.context.covTransform.update(this)&&(u=!0),this.context.covViewToWorld.updateFromMatrix(i)&&this.enableViewToWorld&&(u=!0);let e=i.clone().invert();this.context.covWorldToView.updateFromMatrix(e)&&this.enableWorldToView&&(u=!0);let t=this.matrixWorld.clone().invert().multiply(i);this.context.covViewToObject.updateFromMatrix(t)&&(this.enableViewToObject||this.context.splats.hasRgbDir())&&(u=!0)}else{this.context.transform.update(this)&&(u=!0),this.context.viewToWorld.updateFromMatrix(i)&&this.enableViewToWorld&&(u=!0);let e=i.clone().invert();this.context.worldToView.updateFromMatrix(e)&&this.enableWorldToView&&(u=!0);let t=new A().compose(this.context.transform.translate.value,this.context.transform.rotate.value,new k().setScalar(this.context.transform.scale.value)).invert().multiply(i);this.context.viewToObject.updateFromMatrix(t)&&(this.enableViewToObject||this.context.splats.hasRgbDir())&&(u=!0)}let d=new j(this.recolor.r,this.recolor.g,this.recolor.b,this.opacity);d.equals(this.context.recolor.value)||(this.context.recolor.value.copy(d),u=!0);let f=this.editable?(this.edits??[]).concat(s):[];this.editable&&!this.edits&&this.traverseVisible(e=>{e instanceof lo&&f.push(e)}),f.sort((e,t)=>e.ordering-t.ordering);let p=f.map(e=>{if(e.sdfs!=null)return{edit:e,sdfs:e.sdfs};let t=[];return e.traverseVisible(e=>{e instanceof so&&t.push(e)}),{edit:e,sdfs:t}});if(p.length>0&&!this.rgbaDisplaceEdits){let e=p.length,t=p.reduce((e,t)=>e+t.sdfs.length,0);this.rgbaDisplaceEdits=new uo({maxEdits:e,maxSdfs:t}),this.generatorDirty=!0}if(this.rgbaDisplaceEdits){let e=this.rgbaDisplaceEdits.update(p);u||=e.updated,e.dynoUpdated&&(this.generatorDirty=!0)}let m=this.packedSplats?.lodSplats??this.extSplats?.lodSplats;this.context.enableLod.value=m!=null&&c!=null,!1===this.enableLod&&(this.context.enableLod.value=!1),this.context.lodIndices.value=c?.texture??ls,this.context.enableLod.value&&m&&(this.context.splats=m,this.numSplats=c?.numSplats??0),this.context.numSplats.value=this.numSplats,this.context.splats!==this.lastSplats&&(this.lastSplats=this.context.splats,this.generatorDirty=!0),this.generatorDirty&&(this.constructGenerator(this.context),this.generatorDirty=!1,u=!0),u&&this.updateVersion(),this.onFrame?.({mesh:this,time:n,deltaTime:r})}raycast(t,n){if(!this.raycastable||!this.packedSplats&&!this.extSplats&&!this.paged)return;let r=this.paged!=null,i=r?this.paged?.pager?.extSplats??!1:this.extSplats!=null,{near:a,far:o,ray:s}=t,c=this.matrixWorld.clone().invert(),l=new Qe().setFromMatrix4(c),u=s.origin.clone().applyMatrix4(c),d=s.direction.clone().applyMatrix3(l),f=Y.get_raycast_buffer(),p=f.length/4,m=0,h=(r?this.paged?.numSplats:this.context.numSplats.value)??0,g=r?this.paged?.dynoIndices.value.image.data:this.context.enableLod.value?this.context.lodIndices.value.image.data:null;if(i){let e=Y.get_raycast_buffer2(),t=r?this.paged?.pager?.packedTexture.value.image.data:g?this.extSplats?.lodSplats?.extArrays[0]:this.extSplats?.extArrays[0],n=r?this.paged?.pager?.extTexture.value.image.data:g?this.extSplats?.lodSplats?.extArrays[1]:this.extSplats?.extArrays[1];if(!t||!n)return;for(let r=0;r<h;r+=p){let i=Math.min(p,h-r);if(g)for(let a=0;a<i;++a){let i=4*a,o=4*g[r+a];f[i]=t[o],f[i+1]=t[o+1],f[i+2]=t[o+2],f[i+3]=t[o+3],e[i]=n[o],e[i+1]=n[o+1],e[i+2]=n[o+2],e[i+3]=n[o+3]}else f.set(t.subarray(4*r,4*(r+i))),e.set(n.subarray(4*r,4*(r+i)));let s=Ja(u.x,u.y,u.z,d.x,d.y,d.z,this.minRaycastOpacity,a,o,i);m=this.appendRaycastBuffer(m,s)}}else{let e=r?this.paged?.pager?.packedTexture.value.image.data:g?this.packedSplats?.lodSplats?.packedArray:this.packedSplats?.packedArray;if(!e)return;let t=r?this.paged?.splatEncoding:this.packedSplats?.splatEncoding;for(let n=0;n<h;n+=p){let r=Math.min(p,h-n);if(g)for(let t=0;t<r;++t){let r=4*t,i=4*g[n+t];f[r]=e[i],f[r+1]=e[i+1],f[r+2]=e[i+2],f[r+3]=e[i+3]}else f.set(e.subarray(4*n,4*(n+r)));let i=qa(u.x,u.y,u.z,d.x,d.y,d.z,this.minRaycastOpacity,a,o,r,t?.lnScaleMin??qn,t?.lnScaleMax??9,t?.lodOpacity??!1);m=this.appendRaycastBuffer(m,i)}}for(let t of e.raycastBuffer.subarray(0,m)){let e=s.direction.clone().multiplyScalar(t).add(s.origin);n.push({distance:t,point:e,object:this})}}appendRaycastBuffer(t,n){let r=t+n.length,i=e.raycastBuffer.length;if(r>i){for(;i<r;)i*=2;let n=new Float32Array(i);n.set(e.raycastBuffer.subarray(0,t)),e.raycastBuffer=n}return e.raycastBuffer.set(n,t),t+n.length}async createLodSplats({rgbaArray:e,quality:t}={}){this.packedSplats?await this.packedSplats.createLodSplats({quality:t,rgbaArray:e}):this.extSplats&&await this.extSplats.createLodSplats({quality:t,rgbaArray:e})}};as.staticInitialized=as.staticInitialize(),as.isStaticInitialized=!1,as.dynoTime=new Ki({value:0}),as.raycastBuffer=new Float32Array(1024);var os=as;function ss(e,t,n,r,i){return fr({inTypes:{lodIndices:`usampler2D`,index:`int`,numSplats:`int`,enableLod:`bool`,showLodPage:`int`},outTypes:{index:`int`},inputs:{lodIndices:e,index:t,numSplats:n,enableLod:r,showLodPage:i},statements:({inputs:e,outputs:t})=>W(`\n        int index = ${e.index};\n        if (${e.showLodPage} < 0) {\n          if (index >= ${e.numSplats}) {\n            return;\n          }\n          if (${e.enableLod}) {\n            ivec2 lodIndexCoord = ivec2((index >> 2) & 4095, index >> 14);\n            uint splatIndex = texelFetch(${e.lodIndices}, lodIndexCoord, 0)[index & 3];\n            ${t.index} = int(splatIndex);\n          } else {\n            ${t.index} = index;\n          }\n        } else {\n          int start = ${e.showLodPage} << 16;\n          if (index >= 65536) {\n            return;\n          }\n          ${t.index} = start + index;\n        }\n      `)}).outputs.index}function cs(e,t,n,r){return fr({inTypes:{gsplat:q,rgba:ro,index:`int`,enableLod:`bool`},outTypes:{gsplat:q},inputs:{gsplat:e,rgba:t,index:n,enableLod:r},statements:({inputs:e,outputs:t})=>W(`\n        ${t.gsplat} = ${e.gsplat};\n        if (!${e.enableLod} && (${e.index} >= 0) && (${e.index} < ${e.rgba}.count)) {\n          ${t.gsplat}.rgba = texelFetch(${e.rgba}.texture, splatTexCoord(${e.index}), 0);\n        }\n      `)}).outputs.gsplat}var ls=(()=>{let e=new Le(new Uint32Array(16384),4096,1,r,D);return e.internalFormat=`RGBA32UI`,e.needsUpdate=!0,e})();new We,new n,(()=>{try{Function(`return 42;`)}catch{return!1}})();var us=class extends ee{constructor(e){super(e),this.fileLoader=new g(e)}load(e,t,n,r){return this.loadInternal({url:e,onLoad:t,onProgress:n,onError:r})}async loadAsync(e,t){return new Promise((n,r)=>{this.load(e,e=>{n(e)},t,r)})}parse(e){return new os({packedSplats:e})}loadInternal({packedSplats:e,extSplats:t,url:n,fileBytes:r,fileType:i,fileName:a,stream:o,streamLength:s,onLoad:c,onProgress:l,onError:u,lod:d,nonLod:f,lodAbove:p,lodBase:m}){r instanceof ArrayBuffer&&(r=new Uint8Array(r));let h=r?void 0:this.manager.resolveURL((this.path??``)+(n??``));this.manager.itemStart(h??``),ii.withWorker(async n=>{let u=e?.lod??t?.lod;u&&(d=!0,typeof u==`number`&&(m=Math.max(1.1,Math.min(2,u))));let g=e?.nonLod??t?.nonLod;g!==void 0&&(f=g);let _=h?new URL(h,window.location.href).toString():void 0,v=await n.call(t?`loadExtSplats`:`loadPackedSplats`,{url:_,requestHeader:this.requestHeader,withCredentials:this.withCredentials,fileBytes:r?.slice(),fileType:i,pathName:h||a,stream:o,streamLength:s,encoding:e?.splatEncoding,lod:d,lodBase:m,nonLod:f,lodAbove:p},{onStatus:e=>{let{loaded:t,total:n}=e;t!==void 0&&l&&l(new ProgressEvent(`progress`,{lengthComputable:n!==0,loaded:t,total:n}))}});if(v.lodSplats&&=t?new Aa({...v.lodSplats}):new fs({...v.lodSplats,maxSplats:e?.maxSplats}),t){let e={...v};t.initialize(e),c?.(t)}else{let t={...v};e?(e.initialize(t),c?.(e)):c?.(new fs(t))}}).catch(e=>{this.manager.itemError(h??``),u?.(e)}).finally(()=>{this.manager.itemEnd(h??``)})}async loadInternalAsync({packedSplats:e,extSplats:t,url:n,fileBytes:r,fileType:i,fileName:a,stream:o,streamLength:s,onProgress:c,lod:l,nonLod:u,lodAbove:d,lodBase:f}){return new Promise((p,m)=>{this.loadInternal({packedSplats:e,extSplats:t,url:n,fileBytes:r,fileType:i,fileName:a,stream:o,streamLength:s,onLoad:p,onProgress:c,onError:m,lod:l,nonLod:u,lodAbove:d,lodBase:f})})}},ds=class e{constructor(e={}){this.maxSplats=0,this.numSplats=0,this.packedArray=null,this.maxSh=3,this.isInitialized=!1,this.target=null,this.source=null,this.needsUpdate=!0,this.extra={},this.dyno=new ps({packedSplats:this}),this.dynoRgbMinMaxLnScaleMinMax=new Ji({key:`rgbMinMaxLnScaleMinMax`,value:new j(0,1,qn,9),update:e=>(e.set(this.splatEncoding?.rgbMin??0,this.splatEncoding?.rgbMax??1,this.splatEncoding?.lnScaleMin??qn,this.splatEncoding?.lnScaleMax??9),e)}),this.dynoNumSh=new Gi({key:`numSh`,value:0,update:()=>Math.min(this.getNumSh(),this.maxSh)}),this.dynoShMax=new qi({key:`shMax`,value:new k,update:e=>(e.set(this.splatEncoding?.sh1Max??1,this.splatEncoding?.sh2Max??1,this.splatEncoding?.sh3Max??1),e)}),this.initialized=Promise.resolve(this),this.reinitialize(e)}reinitialize(e){this.isInitialized=!1,this.extra={},this.maxSplats=e.maxSplats??0,this.splatEncoding=e.splatEncoding,this.lod=e.lod,this.nonLod=e.nonLod,e.url||e.fileBytes||e.stream||e.construct?this.initialized=this.asyncInitialize(e).then(()=>(this.isInitialized=!0,this)):(this.initialize(e),this.isInitialized=!0,this.initialized=Promise.resolve(this))}initialize(e){this.extra=e.extra??{},this.splatEncoding=e.splatEncoding??this.splatEncoding,this.lodSplats=e.lodSplats,e.packedArray?(this.packedArray=e.packedArray,this.numSplats=e.numSplats??this.packedArray.length/4,this.maxSplats=Math.floor(this.packedArray.length/4),this.maxSplats=Math.floor(this.maxSplats/I)*I,this.numSplats=Math.min(this.maxSplats,e.numSplats??1/0)):(this.maxSplats=e.maxSplats??0,this.numSplats=0)}async asyncInitialize(e){let{url:t,fileBytes:n,fileType:r,fileName:i,stream:a,streamLength:o,construct:s,lod:c,nonLod:l,lodAbove:u}=e;this.lod=c,this.nonLod=l;let d=new us;if((n||t||a)&&await d.loadInternalAsync({packedSplats:this,url:t,fileBytes:n,fileType:r,fileName:i,stream:a,streamLength:o,onProgress:e.onProgress,lodAbove:u}),s){let e=s(this);e instanceof Promise&&await e}}dispose(){this.target&&=(this.target.dispose(),null),this.source&&=(this.source.dispose(),null);for(let[e,t]of Object.entries(this.extra)){let n=t?.value;n instanceof Ke&&(n.dispose(),delete this.extra[e])}this.disposeLodSplats()}prepareFetchSplat(){}getNumSplats(){return this.numSplats}hasRgbDir(){return Math.min(this.getNumSh(),this.maxSh)>0}getNumSh(){return this.extra.sh1?this.extra.sh2?this.extra.sh3?3:2:1:0}setMaxSh(e){this.maxSh=e}fetchSplat({index:e,viewOrigin:t}){let n=ci(this.dyno,e);if(this.hasRgbDir()&&t){let r=J(n).outputs.center,i=xa(oa(r,t)),{sh1Texture:a,sh2Texture:o,sh3Texture:s}=this.ensureShTextures(),{rgb:c}=_s({coord:pi(e),viewDir:i,numSh:this.dynoNumSh,sh1Texture:a,sh2Texture:o,sh3Texture:s,shMax:this.dynoShMax});c=aa(c,J(n).outputs.rgb),n=ui({gsplat:n,rgb:c})}return n}evaluateSH({index:e,gsplat:t,viewOrigin:n}){if(!this.hasRgbDir())return;let r=J(t).outputs.center,i=xa(oa(r,n)),{sh1Texture:a,sh2Texture:o,sh3Texture:s}=this.ensureShTextures(),{rgb:c}=_s({coord:pi(e),viewDir:i,numSh:this.dynoNumSh,sh1Texture:a,sh2Texture:o,sh3Texture:s,shMax:this.dynoShMax});return c}ensureShTextures(){if(!this.extra.sh1)return{};let e=this.extra.sh1Texture;if(!e){let t=this.extra.sh1,{width:n,height:r,depth:i,maxSplats:a}=K(t.length/2);if(t.length<2*a){let e=new Uint32Array(2*a);e.set(t),this.extra.sh1=e,t=e}let o=new O(t,n,r,i);o.format=de,o.type=D,o.internalFormat=`RG32UI`,o.needsUpdate=!0,e=new Zi({value:o,key:`sh1`}),this.extra.sh1Texture=e}if(!this.extra.sh2)return{sh1Texture:e};let t=this.extra.sh2Texture;if(!t){let e=this.extra.sh2,{width:n,height:i,depth:a,maxSplats:o}=K(e.length/4);if(e.length<4*o){let t=new Uint32Array(4*o);t.set(e),this.extra.sh2=t,e=t}let s=new O(e,n,i,a);s.format=r,s.type=D,s.internalFormat=`RGBA32UI`,s.needsUpdate=!0,t=new Zi({value:s,key:`sh2`}),this.extra.sh2Texture=t}if(!this.extra.sh3)return{sh1Texture:e,sh2Texture:t};let n=this.extra.sh3Texture;if(!n){let e=this.extra.sh3,{width:t,height:i,depth:a,maxSplats:o}=K(e.length/4);if(e.length<4*o){let t=new Uint32Array(4*o);t.set(e),this.extra.sh3=t,e=t}let s=new O(e,t,i,a);s.format=r,s.type=D,s.internalFormat=`RGBA32UI`,s.needsUpdate=!0,n=new Zi({value:s,key:`sh3`}),this.extra.sh3Texture=n}return{sh1Texture:e,sh2Texture:t,sh3Texture:n}}ensureSplats(e){let t=e<=this.maxSplats?this.maxSplats:Math.max(e,2*this.maxSplats),n=this.packedArray?this.packedArray.length/4:0;if(!this.packedArray||t>n){this.maxSplats=K(t).maxSplats;let e=new Uint32Array(4*this.maxSplats);this.packedArray&&e.set(this.packedArray),this.packedArray=e}return this.packedArray}ensureSplatsSh(e,t){let n,r;if(e===0)return this.ensureSplats(t);if(e===1)n=2,r=`sh1`;else if(e===2)n=4,r=`sh2`;else{if(e!==3)throw Error(`Invalid level: ${e}`);n=4,r=`sh3`}let i=this.extra[r]?this.extra[r].length/n:0,a=t<=i?i:Math.max(t,2*i);if(!this.extra[r]||a>i){i=K(a).maxSplats;let e=new Uint32Array(i*n);this.extra[r]&&e.set(this.extra[r]),this.extra[r]=e}return this.extra[r]}getSplat(e){if(!this.packedArray||e>=this.numSplats)throw Error(`Invalid index`);return Fr(this.packedArray,e,this.splatEncoding)}setSplat(e,t,n,r,i,a){Mr(this.ensureSplats(e+1),e,t.x,t.y,t.z,n.x,n.y,n.z,r.x,r.y,r.z,r.w,i,a.r,a.g,a.b),this.numSplats=Math.max(this.numSplats,e+1)}pushSplat(e,t,n,r,i){Mr(this.ensureSplats(this.numSplats+1),this.numSplats,e.x,e.y,e.z,t.x,t.y,t.z,n.x,n.y,n.z,n.w,r,i.r,i.g,i.b),++this.numSplats}forEachSplat(e){if(this.packedArray&&this.numSplats)for(let t=0;t<this.numSplats;++t){let n=Fr(this.packedArray,t,this.splatEncoding);e(t,n.center,n.scales,n.quaternion,n.opacity,n.color)}}ensureGenerate(e){if(this.target&&(e??1)<=this.maxSplats)return!1;this.dispose();let t=K(e??1),{width:n,height:i,depth:a}=t;return this.maxSplats=t.maxSplats,this.target=new et(n,i,a,{depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,magFilter:ze,minFilter:ze}),this.target.texture.format=r,this.target.texture.type=D,this.target.texture.internalFormat=`RGBA32UI`,this.target.scissorTest=!0,!0}generateMapping(e){let t=0,n=e.map(e=>{let n=t,r=Math.ceil(e/I)*I;return t+=r,{base:n,count:e}});return{maxSplats:t,mapping:n}}getTexture(){return this.target?this.target.texture:this.source||this.packedArray?this.maybeUpdateSource():e.getEmptyArray}maybeUpdateSource(){if(!this.packedArray)throw Error(`No packed splats`);if(this.needsUpdate||!this.source){if(this.needsUpdate=!1,this.source){let{width:e,height:t,depth:n}=this.source.image;this.maxSplats!==e*t*n&&(this.source.dispose(),this.source=null)}if(this.source)this.packedArray.buffer!==this.source.image.data.buffer&&(this.source.image.data=new Uint8Array(this.packedArray.buffer));else{let{width:e,height:t,depth:n}=K(this.maxSplats);this.source=new O(this.packedArray,e,t,n),this.source.format=r,this.source.type=D,this.source.internalFormat=`RGBA32UI`,this.source.needsUpdate=!0}this.source.needsUpdate=!0}return this.source}prepareProgramMaterial(t){let n=e.generatorProgram.get(t);if(!n){let r=U({index:`int`},{},({index:e},n,{roots:r})=>{t.inputs.index=e;let i=t.outputs.gsplat,a=Ii(i,this.dynoRgbMinMaxLnScaleMinMax);r.push(a)});e.programTemplate||=new $i(`precision highp float;
precision highp int;
precision highp sampler2D;
precision highp usampler2D;
precision highp isampler2D;
precision highp sampler2DArray;
precision highp usampler2DArray;
precision highp isampler2DArray;
precision highp sampler3D;
precision highp usampler3D;
precision highp isampler3D;

#include <splatDefines>

uniform uint targetLayer;
uniform int targetBase;
uniform int targetCount;

out uvec4 target;

{{ GLOBALS }}

void produceSplat(int index) {
    {{ STATEMENTS }}
}

void main() {
    int targetIndex = int(targetLayer << SPLAT_TEX_LAYER_BITS) + int(uint(gl_FragCoord.y) << SPLAT_TEX_WIDTH_BITS) + int(gl_FragCoord.x);
    int index = targetIndex - targetBase;

    target = uvec4(0u, 0u, 0u, 0u);
    if ((index >= 0) && (index < targetCount)) {
        produceSplat(index);
    }
}`),n=new Qi({graph:r,inputs:{index:`index`},outputs:{output:`target`},template:e.programTemplate}),Object.assign(n.uniforms,{targetLayer:{value:0},targetBase:{value:0},targetCount:{value:0}}),e.generatorProgram.set(t,n)}let r=n.prepareMaterial();return e.fullScreenQuad.material=r,{program:n,material:r}}saveRenderState(e){return{target:e.getRenderTarget(),xrEnabled:e.xr.enabled,autoClear:e.autoClear}}resetRenderState(e,t){e.setRenderTarget(t.target),e.xr.enabled=t.xrEnabled,e.autoClear=t.autoClear}generate({generator:t,base:n,count:r,renderer:i}){if(!this.target)throw Error(`Target must be initialized with ensureSplats`);if(n+r>this.maxSplats)throw Error(`Base + count exceeds maxSplats`);let{program:a,material:o}=this.prepareProgramMaterial(t);a.update();let s=this.saveRenderState(i),c=Math.ceil((n+r)/I)*I,l=4194304;for(o.uniforms.targetBase.value=n,o.uniforms.targetCount.value=r;n<c;){let t=Math.floor(n/l);o.uniforms.targetLayer.value=t;let r=t*l,a=Math.floor((n-r)/I),s=Math.min(Yn,Math.ceil((c-r)/I));this.target.scissor.set(0,a,I,s-a),i.setRenderTarget(this.target,t),i.xr.enabled=!1,i.autoClear=!1,e.fullScreenQuad.render(i),n+=I*(s-a)}return this.resetRenderState(i,s),{nextBase:c}}disposeLodSplats(){this.lodSplats&&=(this.lodSplats.dispose(),void 0)}async createLodSplats({rgbaArray:t,quality:n}={}){let r=typeof this.lod==`number`?Math.max(1.1,Math.min(2,this.lod)):n?1.75:1.5,i=this.packedArray.slice(),a=t?(await t.getArray()).slice():void 0,o={sh1:this.extra.sh1?this.extra.sh1.slice():void 0,sh2:this.extra.sh2?this.extra.sh2.slice():void 0,sh3:this.extra.sh3?this.extra.sh3.slice():void 0},s=await ii.withWorker(async e=>await e.call(n?`qualityLodPackedSplats`:`tinyLodPackedSplats`,{numSplats:this.numSplats,packedArray:i,extra:o,lodBase:r,rgba:a,encoding:this.splatEncoding})),c=new e(s);this.lodSplats&&this.lodSplats.dispose(),this.lodSplats=c,this.nonLod=!0,this.lod||=r}extractSplats(t,n){let r=K(t.length).maxSplats,i=new e({maxSplats:r});for(let e=0;e<t.length;e++){let r=this.getSplat(t[e]);if(n){let n=.61803398875*(t[e]>>>16);n-=Math.floor(n);let i=Math.max(0,Math.min(1,Math.abs(6*n-3)-1)),a=Math.max(0,Math.min(1,Math.abs(6*n+1)-1)),o=Math.max(0,Math.min(1,Math.abs(6*n-1)-1));r.color.r*=i,r.color.g*=a,r.color.b*=o}i.pushSplat(r.center,r.scales,r.quaternion,r.opacity,r.color)}return i}};ds.getEmptyArray=(()=>{let{width:e,height:t,depth:n,maxSplats:i}=K(1),a=new O(new Uint32Array(4*i),e,t,n);return a.format=r,a.type=D,a.internalFormat=`RGBA32UI`,a.needsUpdate=!0,a})(),ds.programTemplate=null,ds.generatorProgram=new Map,ds.fullScreenQuad=new Xr(new pe({visible:!1})),ds.emptyUint32x4=(()=>{let{width:e,height:t,depth:n,maxSplats:i}=K(1),a=new O(new Uint32Array(4*i),e,t,n);return a.format=r,a.type=D,a.internalFormat=`RGBA32UI`,a.needsUpdate=!0,a})(),ds.emptyUint32x2=(()=>{let{width:e,height:t,depth:n,maxSplats:r}=K(1),i=new O(new Uint32Array(2*r),e,t,n);return i.format=de,i.type=D,i.internalFormat=`RG32UI`,i.needsUpdate=!0,i})();var fs=ds,ps=class extends Ui{constructor({packedSplats:e}={}){super({key:`packedSplats`,type:oi,globals:()=>[_i],value:{textureArray:fs.getEmptyArray,numSplats:0,rgbMinMaxLnScaleMinMax:new j(0,1,qn,9),lodOpacity:!1},update:e=>(e.textureArray=this.packedSplats?.getTexture()??fs.getEmptyArray,e.numSplats=this.packedSplats?.numSplats??0,e.rgbMinMaxLnScaleMinMax.set(this.packedSplats?.splatEncoding?.rgbMin??0,this.packedSplats?.splatEncoding?.rgbMax??1,this.packedSplats?.splatEncoding?.lnScaleMin??qn,this.packedSplats?.splatEncoding?.lnScaleMax??9),e.lodOpacity=this.packedSplats?.splatEncoding?.lodOpacity??!1,e)}),this.packedSplats=e}},ms=G(`
  vec3 evaluatePackedSH1(uvec2 packed, vec3 viewDir, float sh1Max) {
    // Extract sint7 values packed into 2 x uint32
    vec3 sh1_0 = vec3(ivec3(
      int(packed.x << 25u) >> 25,
      int(packed.x << 18u) >> 25,
      int(packed.x << 11u) >> 25
    ));
    vec3 sh1_1 = vec3(ivec3(
      int(packed.x << 4u) >> 25,
      int((packed.x >> 3u) | (packed.y << 29u)) >> 25,
      int(packed.y << 22u) >> 25
    ));
    vec3 sh1_2 = vec3(ivec3(
      int(packed.y << 15u) >> 25,
      int(packed.y << 8u) >> 25,
      int(packed.y << 1u) >> 25
    ));

    vec3 rgb = sh1_0 * (-0.4886025 * viewDir.y)
      + sh1_1 * (0.4886025 * viewDir.z)
      + sh1_2 * (-0.4886025 * viewDir.x);
    return rgb * (sh1Max / 63.0);
  }
`),hs=G(`
  vec3 evaluatePackedSH2(uvec4 packed, vec3 viewDir, float sh2Max) {
    // Extract sint8 values packed into 4 x uint32
    vec3 sh2_0 = vec3(ivec3(
      int(packed.x << 24u) >> 24,
      int(packed.x << 16u) >> 24,
      int(packed.x << 8u) >> 24
    ));
    vec3 sh2_1 = vec3(ivec3(
      int(packed.x) >> 24,
      int(packed.y << 24u) >> 24,
      int(packed.y << 16u) >> 24
    ));
    vec3 sh2_2 = vec3(ivec3(
      int(packed.y << 8u) >> 24,
      int(packed.y) >> 24,
      int(packed.z << 24u) >> 24
    ));
    vec3 sh2_3 = vec3(ivec3(
      int(packed.z << 16u) >> 24,
      int(packed.z << 8u) >> 24,
      int(packed.z) >> 24
    ));
    vec3 sh2_4 = vec3(ivec3(
      int(packed.w << 24u) >> 24,
      int(packed.w << 16u) >> 24,
      int(packed.w << 8u) >> 24
    ));

    vec3 rgb = sh2_0 * (1.0925484 * viewDir.x * viewDir.y)
      + sh2_1 * (-1.0925484 * viewDir.y * viewDir.z)
      + sh2_2 * (0.3153915 * (2.0 * viewDir.z * viewDir.z - viewDir.x * viewDir.x - viewDir.y * viewDir.y))
      + sh2_3 * (-1.0925484 * viewDir.x * viewDir.z)
      + sh2_4 * (0.5462742 * (viewDir.x * viewDir.x - viewDir.y * viewDir.y));
    return rgb * (sh2Max / 127.0);
  }
`),gs=G(`
  vec3 evaluatePackedSH3(uvec4 packed, vec3 viewDir, float sh3Max) {
    // Extract sint6 values packed into 4 x uint32
    vec3 sh3_0 = vec3(ivec3(
      int(packed.x << 26u) >> 26,
      int(packed.x << 20u) >> 26,
      int(packed.x << 14u) >> 26
    ));
    vec3 sh3_1 = vec3(ivec3(
      int(packed.x << 8u) >> 26,
      int(packed.x << 2u) >> 26,
      int((packed.x >> 4u) | (packed.y << 28u)) >> 26
    ));
    vec3 sh3_2 = vec3(ivec3(
      int(packed.y << 22u) >> 26,
      int(packed.y << 16u) >> 26,
      int(packed.y << 10u) >> 26
    ));
    vec3 sh3_3 = vec3(ivec3(
      int(packed.y << 4u) >> 26,
      int((packed.y >> 2u) | (packed.z << 30u)) >> 26,
      int(packed.z << 24u) >> 26
    ));
    vec3 sh3_4 = vec3(ivec3(
      int(packed.z << 18u) >> 26,
      int(packed.z << 12u) >> 26,
      int(packed.z << 6u) >> 26
    ));
    vec3 sh3_5 = vec3(ivec3(
      int(packed.z) >> 26,
      int(packed.w << 26u) >> 26,
      int(packed.w << 20u) >> 26
    ));
    vec3 sh3_6 = vec3(ivec3(
      int(packed.w << 14u) >> 26,
      int(packed.w << 8u) >> 26,
      int(packed.w << 2u) >> 26
    ));

    float xx = viewDir.x * viewDir.x;
    float yy = viewDir.y * viewDir.y;
    float zz = viewDir.z * viewDir.z;
    float xy = viewDir.x * viewDir.y;
    float yz = viewDir.y * viewDir.z;
    float zx = viewDir.z * viewDir.x;

    vec3 rgb = sh3_0 * (-0.5900436 * viewDir.y * (3.0 * xx - yy))
      + sh3_1 * (2.8906114 * xy * viewDir.z) +
      + sh3_2 * (-0.4570458 * viewDir.y * (4.0 * zz - xx - yy))
      + sh3_3 * (0.3731763 * viewDir.z * (2.0 * zz - 3.0 * xx - 3.0 * yy))
      + sh3_4 * (-0.4570458 * viewDir.x * (4.0 * zz - xx - yy))
      + sh3_5 * (1.4453057 * viewDir.z * (xx - yy))
      + sh3_6 * (-0.5900436 * viewDir.x * (xx - 3.0 * yy));
    return rgb * (sh3Max / 31.0);
  }
`);function _s({coord:e,viewDir:t,numSh:n,sh1Texture:r,sh2Texture:i,sh3Texture:a,shMax:o}){return new H({inTypes:{coord:`ivec3`,viewDir:`vec3`,numSh:`int`,sh1Texture:`usampler2DArray`,sh2Texture:`usampler2DArray`,sh3Texture:`usampler2DArray`,shMax:`vec3`},outTypes:{rgb:`vec3`},inputs:{coord:e,viewDir:t,numSh:n,sh1Texture:r,sh2Texture:i,sh3Texture:a,shMax:o},globals:()=>[ms,hs,gs],statements:({inputs:e,outputs:t})=>{let n=[`vec3 rgb = vec3(0.0);`];return e.sh1Texture&&(n.push(...W(`\n          if (${e.numSh} >= 1) {\n            vec3 sh1Rgb = evaluatePackedSH1(texelFetch(${e.sh1Texture}, ${e.coord}, 0).rg, ${e.viewDir}, ${e.shMax}.x);\n            rgb += sh1Rgb;\n          `)),e.sh2Texture&&(n.push(...W(`\n            if (${e.numSh} >= 2) {\n              vec3 sh2Rgb = evaluatePackedSH2(texelFetch(${e.sh2Texture}, ${e.coord}, 0), ${e.viewDir}, ${e.shMax}.y);\n              rgb += sh2Rgb;\n            `)),e.sh3Texture&&n.push(...W(`\n              if (${e.numSh} >= 3) {\n                vec3 sh3Rgb = evaluatePackedSH3(texelFetch(${e.sh3Texture}, ${e.coord}, 0), ${e.viewDir}, ${e.shMax}.z);\n                rgb += sh3Rgb;\n              }\n            `)),n.push(`}`)),n.push(`}`)),n.push(`${t.rgb} = rgb;`),n}}).outputs}var vs=class e{constructor(e){if(this.lastTime=null,this.encodeLinear=!1,this.superXY=1,this.display=null,this.sorting=null,this.pending=null,this.sortingCheck=!1,this.readback16=new Uint16Array,this.readback32=new Uint32Array,this.spark=e.spark,this.camera=e.camera,this.viewToWorld=e.viewToWorld??new A,e.target){let{width:t,height:n,doubleBuffer:r}=e.target,i=Math.max(1,Math.min(4,e.target.superXY??1));if(this.superXY=i,t*i>8192||n*i>8192)throw Error(`Target size too large`);this.target=new Ne(t*i,n*i,{format:C,type:v,colorSpace:we}),r&&(this.back=new Ne(t*i,n*i,{format:1023,type:1009,colorSpace:`srgb`})),this.encodeLinear=!0}this.onTextureUpdated=e.onTextureUpdated,this.sortRadial=e.sortRadial??!0,this.sortDistance=e.sortDistance,this.sortCoorient=e.sortCoorient,this.depthBias=e.depthBias,this.sort360=e.sort360,this.sort32=e.sort32,this.stochastic=e.stochastic??!1,this.orderingFreelist=new kr({allocate:e=>new Uint32Array(e),valid:(e,t)=>e.length===t}),this.autoUpdate=!1,this.setAutoUpdate(e.autoUpdate??!1)}dispose(){this.setAutoUpdate(!1),this.target&&=(this.target.dispose(),void 0),this.back&&=(this.back.dispose(),void 0),this.display&&=(this.spark.releaseAccumulator(this.display.accumulator),this.display.geometry.dispose(),null),this.pending?.accumulator&&(this.spark.releaseAccumulator(this.pending.accumulator),this.pending=null)}setAutoUpdate(e){!this.autoUpdate&&e?this.spark.autoViewpoints.push(this):this.autoUpdate&&!e&&(this.spark.autoViewpoints=this.spark.autoViewpoints.filter(e=>e!==this)),this.autoUpdate=e}async prepare({scene:e,camera:t,viewToWorld:n,update:r,forceOrigin:i}){for(n?this.viewToWorld=n:(this.camera=t??this.camera,this.camera&&(this.camera.updateMatrixWorld(),this.viewToWorld=this.camera.matrixWorld.clone()));r??1;){let t=i?this.viewToWorld:void 0;if(this.spark.updateInternal({scene:e,originToWorld:t}))break;await new Promise(e=>setTimeout(e,10))}let a=this.spark.active;a!==this.display?.accumulator&&(this.spark.active.refCount+=1),await this.sortUpdate({accumulator:a,viewToWorld:this.viewToWorld})}renderTarget({scene:e,camera:t}){let n=this.back??this.target;if(!n)throw Error(`Must initialize SparkViewpoint with target`);if(!(t??=this.camera))throw Error(`Must provide camera`);if(t instanceof S){let e=new S().copy(t,!1);e.aspect=n.width/n.height,e.updateProjectionMatrix(),t=e}this.viewToWorld=t.matrixWorld.clone();let r=this.spark.renderer.getRenderTarget();try{this.spark.renderer.setRenderTarget(n),this.spark.prepareViewpoint(this),this.spark.renderer.render(e,t)}finally{this.spark.prepareViewpoint(this.spark.defaultView),this.spark.renderer.setRenderTarget(r)}n!==this.target&&([this.target,this.back]=[this.back,this.target]),this.onTextureUpdated?.(n.texture)}async readTarget(){if(!this.target)throw Error(`Must initialize SparkViewpoint with target`);let{width:e,height:t}=this.target,n=e*t*4;(!this.superPixels||this.superPixels.length<n)&&(this.superPixels=new Uint8Array(n)),await this.spark.renderer.readRenderTargetPixelsAsync(this.target,0,0,e,t,this.superPixels);let{superXY:r}=this;if(r===1)return this.superPixels;let i=e/r,a=t/r,o=i*a*4;(!this.pixels||this.pixels.length<o)&&(this.pixels=new Uint8Array(o));let{superPixels:s,pixels:c}=this,l=r*r;for(let e=0;e<a;e++){let t=e*i;for(let n=0;n<i;n++){let i=n*r,a=0,o=0,u=0,d=0;for(let t=0;t<r;t++){let n=(e*r+t)*this.target.width;for(let e=0;e<r;e++){let t=4*(n+i+e);a+=s[t],o+=s[t+1],u+=s[t+2],d+=s[t+3]}}let f=4*(t+n);c[f]=a/l,c[f+1]=o/l,c[f+2]=u/l,c[f+3]=d/l}}return c}async prepareRenderPixels({scene:e,camera:t,viewToWorld:n,update:r,forceOrigin:i}){return await this.prepare({scene:e,camera:t,viewToWorld:n,update:r,forceOrigin:i}),this.renderTarget({scene:e,camera:t}),this.readTarget()}autoPoll({accumulator:e}){this.camera&&(this.camera.updateMatrixWorld(),this.viewToWorld=this.camera.matrixWorld.clone());let t=!1,n=!1;if(this.display){if(e){t=!0;let{mappingVersion:r}=this.display.accumulator;e.mappingVersion===r&&(this.spark.releaseAccumulator(this.display.accumulator),this.display.accumulator=e,n=!0)}}else t=!0;let r=this.sorting?.viewToWorld??this.display?.viewToWorld;r&&!Br({matrix1:this.viewToWorld,matrix2:r,maxDistance:this.sortDistance??.01,minCoorient:this.sortCoorient??this.sortRadial?.99:.999})&&(t=!0),t&&(e&&(e.refCount+=1),e&&this.pending?.accumulator&&this.pending.accumulator!==this.display?.accumulator&&this.spark.releaseAccumulator(this.pending.accumulator),this.pending={accumulator:e,viewToWorld:this.viewToWorld,displayed:n},this.driveSort())}async driveSort(){for(;;){if(this.sorting||!this.pending)return;let{viewToWorld:e,displayed:t}=this.pending,n=this.pending.accumulator??this.display?.accumulator;if(n||(n=this.spark.active,n.refCount+=1),this.pending=null,!n)throw Error(`No accumulator to sort`);this.sorting={viewToWorld:e},await this.sortUpdate({accumulator:n,viewToWorld:e,displayed:t}),this.sorting=null}}async sortUpdate({accumulator:t,viewToWorld:n,displayed:r=!1}){if(this.sortingCheck)throw Error(`Only one sort at a time`);this.sortingCheck=!0,t??=this.spark.active;let{numSplats:i,maxSplats:a}=t.splats,o=0,s=this.orderingFreelist.alloc(a);if(this.stochastic){o=i;for(let e=0;e<i;++e)s[e]=e}else if(i>0){let{reader:r,doubleSortReader:c,sort32Reader:l,dynoSortRadial:u,dynoOrigin:d,dynoDirection:f,dynoDepthBias:p,dynoSort360:m,dynoSplats:h}=e.makeSorter(),g=this.sort32??!1,_;if(g)this.readback32=r.ensureBuffer(a,this.readback32),_=this.readback32;else{let e=Math.ceil(a/2);this.readback16=r.ensureBuffer(e,this.readback16),_=this.readback16}let v=t.toWorld.clone().invert(),ee=n.clone().premultiply(v);u.value=!!this.sort360||this.sortRadial,d.value.set(0,0,0).applyMatrix4(ee),f.value.set(0,0,-1).applyMatrix4(ee).sub(d.value).normalize(),p.value=this.depthBias??1,m.value=this.sort360??!1,h.packedSplats=t.splats;let y=g?l:c,te=g?i:Math.ceil(i/2);await r.renderReadback({renderer:this.spark.renderer,reader:y,count:te,readback:_});let ne=await qr(async e=>{let t=g?`sort32Splats`:`sortDoubleSplats`;return e.call(t,{maxSplats:a,numSplats:i,readback:_,ordering:s})});g?this.readback32=ne.readback:this.readback16=ne.readback,s=ne.ordering,o=ne.activeSplats}this.updateDisplay({accumulator:t,viewToWorld:n,ordering:s,activeSplats:o,displayed:r}),this.sortingCheck=!1}updateDisplay({accumulator:e,viewToWorld:t,ordering:n,activeSplats:r,displayed:i=!1}){if(this.display){i||e===this.display.accumulator||(this.spark.releaseAccumulator(this.display.accumulator),this.display.accumulator=e),this.display.viewToWorld=t;let a=this.display.geometry.ordering;a.length===n.length?this.display.geometry.update(n,r):(this.display.geometry.dispose(),this.display.geometry=new an(n,r)),this.orderingFreelist.free(a)}else this.display={accumulator:e,viewToWorld:t,geometry:new an(n,r)};this.spark.viewpoint===this&&this.spark.prepareViewpoint(this)}static makeSorter(){if(!e.dynos){let t=new Wi({value:!0}),n=new qi({value:new k}),r=new qi({value:new k}),i=new Ki({value:1}),a=new Wi({value:!1}),o=new ps,s=new eo,c=U({index:`int`},{rgba8:`vec4`},({index:e})=>{if(!e)throw Error(`No index`);let s={sortRadial:t,sortOrigin:n,sortDirection:r,sortDepthBias:i,sort360:a},c=sa(e,V(`int`,2));return{rgba8:ga(new va({value:(({vector:e,vectorType:t,x:n,y:r,z:i,w:a,r:o,g:s,b:c,a:l})=>new Ta({vector:e,vectorType:t,x:n,y:r,z:i,w:a,r:o,g:s,b:c,a:l}))({vectorType:`vec2`,x:xs({gsplat:ci(o,c),...s}),y:xs({gsplat:ci(o,aa(c,V(`int`,1))),...s})})}))}}),l=U({index:`int`},{rgba8:`vec4`},({index:e})=>{if(!e)throw Error(`No index`);let s={sortRadial:t,sortOrigin:n,sortDirection:r,sortDepthBias:i,sort360:a};return{rgba8:ga(new _a({value:xs({gsplat:ci(o,e),...s})}))}});e.dynos={dynoSortRadial:t,dynoOrigin:n,dynoDirection:r,dynoDepthBias:i,dynoSort360:a,dynoSplats:o,reader:s,doubleSortReader:c,sort32Reader:l}}return e.dynos}};vs.EMPTY_TEXTURE=new Ke,vs.dynos=null;var ys=vs,bs=G(`
  float computeSort(Gsplat gsplat, bool sortRadial, vec3 sortOrigin, vec3 sortDirection, float sortDepthBias, bool sort360) {
    if (!isGsplatActive(gsplat.flags)) {
      return INFINITY;
    }

    vec3 center = gsplat.center - sortOrigin;
    float biasedDepth = dot(center, sortDirection) + sortDepthBias;
    if (!sort360 && (biasedDepth <= 0.0)) {
      return INFINITY;
    }

    return sortRadial ? length(center) : biasedDepth;
  }
`);function xs({gsplat:e,sortRadial:t,sortOrigin:n,sortDirection:r,sortDepthBias:i,sort360:a}){return fr({inTypes:{gsplat:q,sortRadial:`bool`,sortOrigin:`vec3`,sortDirection:`vec3`,sortDepthBias:`float`,sort360:`bool`},outTypes:{metric:`float`},globals:()=>[hi,bs],inputs:{gsplat:e,sortRadial:t,sortOrigin:n,sortDirection:r,sortDepthBias:i,sort360:a},statements:({inputs:e,outputs:t})=>{let{gsplat:n,sortRadial:r,sortOrigin:i,sortDirection:a,sortDepthBias:o,sort360:s}=e;return W(`\n        ${t.metric} = computeSort(${n}, ${r}, ${i}, ${a}, ${o}, ${s});\n      `)}}).outputs.metric}var Ss=class{constructor(){this.splats=new fs,this.toWorld=new A,this.mapping=[],this.refCount=0,this.splatsVersion=-1,this.mappingVersion=-1}ensureGenerate(e){this.splats.ensureGenerate(e)&&(this.mapping=[])}generateSplats({renderer:e,modifier:t,generators:n,forceUpdate:r,originToWorld:i}){let a=this.mapping.reduce((e,t)=>(e.set(t.node,t),e),new Map),o=0,s=0;for(let{node:i,generator:c,version:l,base:u,count:d}of n){let n=a.get(i);if((r||c!==n?.generator||l!==n?.version||u!==n?.base||d!==n?.count)&&c&&d>0){let n=t.apply(c);try{this.splats.generate({generator:n,base:u,count:d,renderer:e})}catch(e){i.generator=void 0,i.generatorError=e}o+=1}s=Math.max(s,u+d)}return this.splats.numSplats=s,this.toWorld=i,this.mapping=n,o!==0}hasCorrespondence(e){return this.mapping.length===e.mapping.length&&this.mapping.every(({node:t,base:n,count:r},i)=>{let{node:a,base:o,count:s}=e.mapping[i];return t===a&&n===o&&r===s})}},Cs=class r extends Ue{constructor(e){let t=r.makeUniforms(),i=Eo(),a=e.premultipliedAlpha??!0,o=new n({glslVersion:y,vertexShader:i.oldSplatVertex,fragmentShader:i.oldSplatFragment,uniforms:t,premultipliedAlpha:a,transparent:!0,depthTest:!0,depthWrite:!1,side:2});super(ws,o),this.splatTexture=null,this.autoViewpoints=[],this.rotateToAccumulator=new Ji({value:new E}),this.translateToAccumulator=new qi({value:new k}),this.lastFrame=-1,this.lastUpdateTime=null,this.defaultCameras=[],this.lastStochastic=null,this.pendingUpdate={scene:null,originToWorld:new A,timeoutId:-1},this.envViewpoint=null,this.frustumCulled=!1,this.renderer=e.renderer,this.material=o,this.uniforms=t;let s=U({gsplat:q},{gsplat:q},({gsplat:e})=>{if(!e)throw Error(`gsplat not defined`);return{gsplat:e=fi(e,{rotate:this.rotateToAccumulator,translate:this.translateToAccumulator})}});this.modifier=new go(s),this.premultipliedAlpha=a,this.autoUpdate=e.autoUpdate??!0,this.preUpdate=e.preUpdate??!1,this.needsUpdate=!1,this.originDistance=e.originDistance??1,this.maxStdDev=e.maxStdDev??Math.sqrt(8),this.minPixelRadius=e.minPixelRadius??0,this.maxPixelRadius=e.maxPixelRadius??512,this.minAlpha=e.minAlpha??1/255*.5,this.enable2DGS=e.enable2DGS??!1,this.preBlurAmount=e.preBlurAmount??0,this.blurAmount=e.blurAmount??.3,this.focalDistance=e.focalDistance??0,this.apertureAngle=e.apertureAngle??0,this.falloff=e.falloff??1,this.clipXY=e.clipXY??1.4,this.focalAdjustment=e.focalAdjustment??1,this.splatEncoding=e.splatEncoding??{...Zn},this.active=new Ss,this.accumulatorCount=1,this.freeAccumulators=[];for(let e=0;e<1;++e)this.freeAccumulators.push(new Ss),this.accumulatorCount+=1;this.defaultView=new ys({...e.view,autoUpdate:!0,spark:this}),this.viewpoint=this.defaultView,this.prepareViewpoint(this.viewpoint),this.clock=e.clock?Rr(e.clock):new te}static makeUniforms(){return{renderSize:{value:new t},near:{value:.1},far:{value:1e3},numSplats:{value:0},renderToViewQuat:{value:new E},renderToViewPos:{value:new k},maxStdDev:{value:1},minPixelRadius:{value:0},maxPixelRadius:{value:512},minAlpha:{value:1/255*.5},stochastic:{value:!1},enable2DGS:{value:!1},preBlurAmount:{value:0},blurAmount:{value:.3},focalDistance:{value:0},apertureAngle:{value:0},falloff:{value:1},clipXY:{value:1.4},focalAdjustment:{value:1},splatTexEnable:{value:!1},splatTexture:{type:`t`,value:r.EMPTY_SPLAT_TEXTURE},splatTexMul:{value:new ot},splatTexAdd:{value:new t},splatTexNear:{value:.1},splatTexFar:{value:1e3},splatTexMid:{value:0},packedSplats:{type:`t`,value:fs.getEmptyArray},rgbMinMaxLnScaleMinMax:{value:new j},time:{value:0},deltaTime:{value:0},encodeLinear:{value:!1},debugFlag:{value:!1}}}canAllocAccumulator(){return this.freeAccumulators.length>0||this.accumulatorCount<5}maybeAllocAccumulator(){let e=this.freeAccumulators.pop();if(e===void 0){if(this.accumulatorCount>=5)return null;e=new Ss,this.accumulatorCount+=1}return e.refCount=1,e}releaseAccumulator(e){--e.refCount,e.refCount===0&&this.freeAccumulators.push(e)}newViewpoint(e){return new ys({...e,spark:this})}onBeforeRender(e,t,n){let i=this.time??this.clock.getElapsedTime(),a=i-(this.viewpoint.lastTime??i);this.viewpoint.lastTime=i;let o=e.info.render.frame,s=o!==this.lastFrame;this.lastFrame=o;let c=this.viewpoint;if(c===this.defaultView){if(s)if(e.xr.isPresenting){let t=e.xr.getCamera().cameras;this.defaultCameras=t.map(e=>e.matrixWorld),this.defaultView.viewToWorld=function(e){if(e.length===0)return null;let t=new k,n=new E,r=new k,i=[],a=[];for(let o of e)o.decompose(t,n,r),i.push(t),a.push(n);return new A().compose(function(e){let t=new k;for(let n of e)t.add(n);return t.divideScalar(e.length)}(i),function(e){if(e.length===0)return new E;let t=e[0].clone();for(let n=1;n<e.length;n++)e[n].dot(e[0])<0?(t.x-=e[n].x,t.y-=e[n].y,t.z-=e[n].z,t.w-=e[n].w):(t.x+=e[n].x,t.y+=e[n].y,t.z+=e[n].z,t.w+=e[n].w);return t.normalize()}(a),new k(1,1,1))}(this.defaultCameras)??new A}else this.defaultView.viewToWorld=n.matrixWorld.clone(),this.defaultCameras=[this.defaultView.viewToWorld];this.autoUpdate&&this.update({scene:t,viewToWorld:this.defaultView.viewToWorld})}if(s&&(this.material.premultipliedAlpha!==this.premultipliedAlpha&&(this.material.premultipliedAlpha=this.premultipliedAlpha,this.material.needsUpdate=!0),this.uniforms.time.value=i,this.uniforms.deltaTime.value=a,this.uniforms.debugFlag.value=performance.now()/1e3%2<1,c.display&&c.stochastic&&(this.geometry.instanceCount=this.uniforms.numSplats.value)),c.target)this.uniforms.renderSize.value.set(c.target.width,c.target.height);else{let t=e.getDrawingBufferSize(this.uniforms.renderSize.value);if(t.x===1&&t.y===1){let n=e.xr.getSession()?.renderState.baseLayer;n&&(t.x=n.framebufferWidth,t.y=n.framebufferHeight)}}let l=n;if(this.uniforms.near.value=l.near,this.uniforms.far.value=l.far,this.uniforms.encodeLinear.value=c.encodeLinear,this.uniforms.maxStdDev.value=this.maxStdDev,this.uniforms.minPixelRadius.value=this.minPixelRadius,this.uniforms.maxPixelRadius.value=this.maxPixelRadius,this.uniforms.minAlpha.value=this.minAlpha,this.uniforms.stochastic.value=c.stochastic,this.uniforms.enable2DGS.value=this.enable2DGS,this.uniforms.preBlurAmount.value=this.preBlurAmount,this.uniforms.blurAmount.value=this.blurAmount,this.uniforms.focalDistance.value=this.focalDistance,this.uniforms.apertureAngle.value=this.apertureAngle,this.uniforms.falloff.value=this.falloff,this.uniforms.clipXY.value=this.clipXY,this.uniforms.focalAdjustment.value=this.focalAdjustment,this.lastStochastic!==!c.stochastic&&(this.lastStochastic=!c.stochastic,this.material.transparent=!c.stochastic,this.material.depthWrite=c.stochastic,this.material.needsUpdate=!0),this.splatTexture){let{enable:e,texture:t,multiply:n,add:i,near:a,far:o,mid:s}=this.splatTexture;e&&t?(this.uniforms.splatTexEnable.value=!0,this.uniforms.splatTexture.value=t,n?this.uniforms.splatTexMul.value.fromArray(n.elements):this.uniforms.splatTexMul.value.set(.5/this.maxStdDev,0,0,.5/this.maxStdDev),this.uniforms.splatTexAdd.value.set(i?.x??.5,i?.y??.5),this.uniforms.splatTexNear.value=a??this.uniforms.near.value,this.uniforms.splatTexFar.value=o??this.uniforms.far.value,this.uniforms.splatTexMid.value=s??0):(this.uniforms.splatTexEnable.value=!1,this.uniforms.splatTexture.value=r.EMPTY_SPLAT_TEXTURE)}else this.uniforms.splatTexEnable.value=!1,this.uniforms.splatTexture.value=r.EMPTY_SPLAT_TEXTURE;let u=c.display?.accumulator.toWorld??new A,d=n.matrixWorld.clone().invert();u.clone().premultiply(d).decompose(this.uniforms.renderToViewPos.value,this.uniforms.renderToViewQuat.value,new k)}prepareViewpoint(e){if(this.viewpoint=e??this.viewpoint,this.viewpoint.display){let{accumulator:e,geometry:t}=this.viewpoint.display;this.uniforms.numSplats.value=e.splats.numSplats,this.uniforms.packedSplats.value=e.splats.getTexture(),this.uniforms.rgbMinMaxLnScaleMinMax.value.set(e.splats.splatEncoding?.rgbMin??0,e.splats.splatEncoding?.rgbMax??1,e.splats.splatEncoding?.lnScaleMin??qn,e.splats.splatEncoding?.lnScaleMax??9),this.geometry=t,this.material.transparent=!this.viewpoint.stochastic,this.material.depthWrite=this.viewpoint.stochastic,this.material.needsUpdate=!0}else this.uniforms.numSplats.value=0,this.uniforms.packedSplats.value=fs.getEmptyArray,this.geometry=ws}update({scene:e,viewToWorld:t}){let n=this.matrixWorld;this.preUpdate?this.updateInternal({scene:e,originToWorld:n.clone(),viewToWorld:t}):(this.pendingUpdate.scene=e,this.pendingUpdate.originToWorld.copy(n),this.pendingUpdate.timeoutId===-1&&(this.pendingUpdate.timeoutId=setTimeout(()=>{let{scene:e,originToWorld:n}=this.pendingUpdate;this.pendingUpdate.scene=null,this.pendingUpdate.timeoutId=-1,this.updateInternal({scene:e,originToWorld:n,viewToWorld:t})&&this.renderer.getContext().flush()},1)))}updateInternal({scene:e,originToWorld:t,viewToWorld:n}){if(!this.canAllocAccumulator())return!1;t||=this.active.toWorld,n??=t.clone();let r=this.time??this.clock.getElapsedTime(),i=r-(this.lastUpdateTime??r);this.lastUpdateTime=r;let a=this.active.mapping.reduce((e,t)=>(e.set(t.node,t),e),new Map),{generators:o,visibleGenerators:s,globalEdits:c}=this.compileScene(e);for(let e of o)e.frameUpdate?.({renderer:this.renderer,object:e,time:r,deltaTime:i,viewToWorld:n,globalEdits:c});let l=new Set(s.map(e=>e.uuid));for(let e of o){let t=a.get(e),n=e.generator&&l.has(e.uuid)?e.numSplats:0;(this.needsUpdate||e.generator!==t?.generator||n!==t?.count)&&e.updateVersion()}let u=!Br({matrix1:t,matrix2:this.active.toWorld,maxDistance:this.originDistance}),d=this.needsUpdate||u||o.length!==a.size||o.some(e=>e.version!==a.get(e)?.version);this.needsUpdate=!1;let f=null;if(d){if(f=this.maybeAllocAccumulator(),!f)throw Error(`Unreachable`);let e=!Br({matrix1:t,matrix2:this.active.toWorld,maxDistance:1e-5,minCoorient:.99999}),n=s.map((e,t)=>{let n=a.get(e);return n?[e.version-n.version,n.base,e]:[1/0,e.version,e]}).sort((e,t)=>e[0]===t[0]?e[1]-t[1]:e[0]-t[0]).map(([e,t,n])=>n),r=n.map(e=>e.numSplats),{maxSplats:i,mapping:o}=f.splats.generateMapping(r),c=n.map((e,t)=>{let{base:n,count:r}=o[t];return{node:e,generator:e.generator,version:e.version,base:n,count:r}});t.clone().invert().decompose(this.translateToAccumulator.value,this.rotateToAccumulator.value,new k),f.ensureGenerate(i),f.splats.splatEncoding={...this.splatEncoding},f.generateSplats({renderer:this.renderer,modifier:this.modifier,generators:c,forceUpdate:e,originToWorld:t}),f.splatsVersion=this.active.splatsVersion+1;let l=f.hasCorrespondence(this.active);f.mappingVersion=this.active.mappingVersion+ +!l,this.releaseAccumulator(this.active),this.active=f,this.prepareViewpoint()}return setTimeout(()=>{for(let e of this.autoViewpoints)e.autoPoll({accumulator:f??void 0})},1),!0}compileScene(e){let t=[];e.traverse(e=>{e instanceof yo&&t.push(e)});let n=[];e.traverseVisible(e=>{e instanceof yo&&n.push(e)});let r=new Set;return e.traverseVisible(e=>{if(e instanceof lo){let t=e.parent;for(;t!=null&&!(t instanceof os);)t=t.parent;t??r.add(e)}}),{generators:t,visibleGenerators:n,globalEdits:Array.from(r)}}async renderEnvMap({renderer:t,scene:n,worldCenter:i,size:a=256,near:o=.1,far:s=1e3,hideObjects:c=[],update:l=!1}){if(this.envViewpoint||=this.newViewpoint({sort360:!0}),!r.cubeRender||r.cubeRender.target.width!==a||r.cubeRender.near!==o||r.cubeRender.far!==s){r.cubeRender&&r.cubeRender.target.dispose();let t=new mt(a,{format:C,generateMipmaps:!0,minFilter:ft}),n=new e(o,s,t);r.cubeRender={target:t,camera:n,near:o,far:s}}r.pmrem||=new gt(t??this.renderer);let u=new A().setPosition(i);await this.envViewpoint?.prepare({scene:n,viewToWorld:u,update:l});let{target:d,camera:f}=r.cubeRender;f.position.copy(i);let p=new Map;for(let e of c)p.set(e,e.visible),e.visible=!1;this.prepareViewpoint(this.envViewpoint),f.update(t??this.renderer,n),this.prepareViewpoint(this.defaultView);for(let[e,t]of p.entries())e.visible=t;return r.pmrem?.fromCubemap(d.texture).texture}recurseSetEnvMap(e,t){e.traverse(e=>{if(e instanceof Ue)if(Array.isArray(e.material))for(let n of e.material)n instanceof nt&&(n.envMap=t);else e.material instanceof nt&&(e.material.envMap=t)})}getRgba({generator:e,rgba:t}){let n=this.active.mapping.find(({node:t})=>t===e);if(!n)throw Error(`Generator not found`);return(t??=new no).fromPackedSplats({packedSplats:this.active.splats,base:n.base,count:n.count,renderer:this.renderer}),t}async readRgba({generator:e,rgba:t}){return(t=this.getRgba({generator:e,rgba:t})).read()}};Cs.cubeRender=null,Cs.pmrem=null,Cs.EMPTY_SPLAT_TEXTURE=new lt;var ws=new an(new Uint32Array(1),0);function Ts(e){return U({gsplat:q},{gsplat:q},({gsplat:t})=>{if(!t)throw Error(`No gsplat input`);let n=di(t),r=e.applyGsplat(t),i=J(r).outputs.center,a=(o=ba(i,di(r)),s=V(`float`,0),new ma({a:o,b:s}));var o,s;n=pa(a,ca(n),n);let c=aa(sa(n,V(`float`,.5)),V(`float`,.5));return{gsplat:t=ui({gsplat:t,rgb:c})}})}function Es(e,t,n,r){return U({gsplat:q},{gsplat:q},({gsplat:i})=>{if(!i)throw Error(`No gsplat input`);let{center:a}=J(i).outputs;a=e.apply(a);let{z:o}=(s=a,new wa({vector:s})).outputs;var s;let c=((e,t,n)=>new Ea({z:e,zNear:t,zFar:n}).outputs.depth)(ca(o),t,n);return c=pa(r,oa(V(`float`,1),c),c),{gsplat:i=ui({gsplat:i,r:c,g:c,b:c})}})}U({packedSplats:oi,index:`int`},{gsplat:q},({packedSplats:e,index:t})=>{if(!e||!t)throw Error(`Invalid input`);return{gsplat:ci(e,t)}}),new k(1,1,1),new E,new k,new E,new A,G(`
  struct GsplatSkinning {
    int numSplats;
    int numBones;
    usampler2DArray skinTexture;
    sampler2D boneTexture;
  };
`),G(`
  void applyGsplatSkinning(
    int numSplats, int numBones,
    usampler2DArray skinTexture, sampler2D boneTexture,
    int splatIndex, inout vec3 center, inout vec4 quaternion
  ) {
    if ((splatIndex < 0) || (splatIndex >= numSplats)) {
      return;
    }

    uvec4 skinData = texelFetch(skinTexture, splatTexCoord(splatIndex), 0);

    float weights[4];
    weights[0] = float(skinData.x & 0xffu) / 255.0;
    weights[1] = float(skinData.y & 0xffu) / 255.0;
    weights[2] = float(skinData.z & 0xffu) / 255.0;
    weights[3] = float(skinData.w & 0xffu) / 255.0;

    uint boneIndices[4];
    boneIndices[0] = (skinData.x >> 8u) & 0xffu;
    boneIndices[1] = (skinData.y >> 8u) & 0xffu;
    boneIndices[2] = (skinData.z >> 8u) & 0xffu;
    boneIndices[3] = (skinData.w >> 8u) & 0xffu;

    vec4 quat = vec4(0.0);
    vec4 dual = vec4(0.0);
    for (int i = 0; i < 4; i++) {
      if (weights[i] > 0.0) {
        int boneIndex = int(boneIndices[i]);
        vec4 boneQuat = vec4(0.0, 0.0, 0.0, 1.0);
        vec4 boneDual = vec4(0.0);
        if (boneIndex < numBones) {
          boneQuat = texelFetch(boneTexture, ivec2(0, boneIndex), 0);
          boneDual = texelFetch(boneTexture, ivec2(1, boneIndex), 0);
        }

        if ((i > 0) && (dot(quat, boneQuat) < 0.0)) {
          // Flip sign if next blend is pointing in the opposite direction
          boneQuat = -boneQuat;
          boneDual = -boneDual;
        }
        quat += weights[i] * boneQuat;
        dual += weights[i] * boneDual;
      }
    }

    // Normalize dual quaternion
    float norm = length(quat);
    quat /= norm;
    dual /= norm;
    vec3 translate = vec3(
      2.0 * (-dual.w * quat.x + dual.x * quat.w - dual.y * quat.z + dual.z * quat.y),
      2.0 * (-dual.w * quat.y + dual.x * quat.z + dual.y * quat.w - dual.z * quat.x),
      2.0 * (-dual.w * quat.z - dual.x * quat.y + dual.y * quat.x + dual.z * quat.w)
    );

    center = quatVec(quat, center) + translate;
    quaternion = quatQuat(quat, quaternion);
  }
`),G(`
  void applyCovSplatDQSkinning(
    int numSplats, int numBones,
    usampler2DArray skinTexture, sampler2D boneTexture,
    int splatIndex, inout vec3 center, inout vec3 xxyyzz, inout vec3 xyxzyz
  ) {
    if ((splatIndex < 0) || (splatIndex >= numSplats)) {
      return;
    }

    uvec4 skinData = texelFetch(skinTexture, splatTexCoord(splatIndex), 0);

    float weights[4];
    weights[0] = float(skinData.x & 0xffu) / 255.0;
    weights[1] = float(skinData.y & 0xffu) / 255.0;
    weights[2] = float(skinData.z & 0xffu) / 255.0;
    weights[3] = float(skinData.w & 0xffu) / 255.0;

    uint boneIndices[4];
    boneIndices[0] = (skinData.x >> 8u) & 0xffu;
    boneIndices[1] = (skinData.y >> 8u) & 0xffu;
    boneIndices[2] = (skinData.z >> 8u) & 0xffu;
    boneIndices[3] = (skinData.w >> 8u) & 0xffu;

    vec4 quat = vec4(0.0);
    vec4 dual = vec4(0.0);
    for (int i = 0; i < 4; i++) {
      if (weights[i] > 0.0) {
        int boneIndex = int(boneIndices[i]);
        vec4 boneQuat = vec4(0.0, 0.0, 0.0, 1.0);
        vec4 boneDual = vec4(0.0);
        if (boneIndex < numBones) {
          boneQuat = texelFetch(boneTexture, ivec2(0, boneIndex), 0);
          boneDual = texelFetch(boneTexture, ivec2(1, boneIndex), 0);
        }

        if ((i > 0) && (dot(quat, boneQuat) < 0.0)) {
          // Flip sign if next blend is pointing in the opposite direction
          boneQuat = -boneQuat;
          boneDual = -boneDual;
        }
        quat += weights[i] * boneQuat;
        dual += weights[i] * boneDual;
      }
    }

    // Normalize dual quaternion
    float norm = length(quat);
    quat /= norm;
    dual /= norm;
    vec3 translate = vec3(
      2.0 * (-dual.w * quat.x + dual.x * quat.w - dual.y * quat.z + dual.z * quat.y),
      2.0 * (-dual.w * quat.y + dual.x * quat.z + dual.y * quat.w - dual.z * quat.x),
      2.0 * (-dual.w * quat.z - dual.x * quat.y + dual.y * quat.x + dual.z * quat.w)
    );
    mat3 basis = quaternionToMatrix(quat);

    center = quatVec(quat, center) + translate;

    mat3 cov = mat3(xxyyzz.x, xyxzyz.x, xyxzyz.y, xyxzyz.x, xxyyzz.y, xyxzyz.z, xyxzyz.y, xyxzyz.z, xxyyzz.z);
    cov = basis * cov * transpose(basis);
    xxyyzz = vec3(cov[0][0], cov[1][1], cov[2][2]);
    xyxzyz = vec3(cov[0][1], cov[0][2], cov[1][2]);
  }
`),G(`
  void applyCovSplatLBSkinning(
    int numSplats, int numBones,
    usampler2DArray skinTexture, sampler2D boneTexture,
    int splatIndex, inout vec3 center, inout vec3 xxyyzz, inout vec3 xyxzyz
  ) {
    if ((splatIndex < 0) || (splatIndex >= numSplats)) {
      return;
    }

    uvec4 skinData = texelFetch(skinTexture, splatTexCoord(splatIndex), 0);

    float weights[4];
    weights[0] = float(skinData.x & 0xffu) / 255.0;
    weights[1] = float(skinData.y & 0xffu) / 255.0;
    weights[2] = float(skinData.z & 0xffu) / 255.0;
    weights[3] = float(skinData.w & 0xffu) / 255.0;

    uint boneIndices[4];
    boneIndices[0] = (skinData.x >> 8u) & 0xffu;
    boneIndices[1] = (skinData.y >> 8u) & 0xffu;
    boneIndices[2] = (skinData.z >> 8u) & 0xffu;
    boneIndices[3] = (skinData.w >> 8u) & 0xffu;

    mat3 basis = mat3(0.0);
    vec3 offset = vec3(0.0);

    for (int i = 0; i < 4; i++) {
      if (weights[i] > 0.0) {
        int boneIndex = int(boneIndices[i]);
        if (boneIndex < numBones) {
          vec4 v0 = texelFetch(boneTexture, ivec2(0, boneIndex), 0);
          vec4 v1 = texelFetch(boneTexture, ivec2(1, boneIndex), 0);
          vec4 v2 = texelFetch(boneTexture, ivec2(2, boneIndex), 0);
          basis += weights[i] * mat3(v0.x, v0.y, v0.z, v0.w, v1.x, v1.y, v1.z, v1.w, v2.x);
          offset += weights[i] * vec3(v2.y, v2.z, v2.w);
        }
      }
    }

    center = basis * center + offset;

    mat3 cov = mat3(xxyyzz.x, xyxzyz.x, xyxzyz.y, xyxzyz.x, xxyyzz.y, xyxzyz.z, xyxzyz.y, xyxzyz.z, xxyyzz.z);
    cov = basis * cov * transpose(basis);
    xxyyzz = vec3(cov[0][0], cov[1][1], cov[2][2]);
    xyxzyz = vec3(cov[0][1], cov[0][2], cov[1][2]);
  }
`),new d(new k(-1,-1,-1),new k(1,1,1)),new k(-1,-3,1).normalize(),new w(1,1,1),new w(.5,.5,1),new k(1,1,1),new d(new k(-2,-1,-2),new k(2,5,2)),new k(0,-1,0),new w(1,1,1),new w(.25,.25,.5),new k(.1,1,.1);var Ds=Object.freeze(Object.defineProperty({__proto__:null,applySHOnlyViz:rs,makeDepthColorModifier:Es,makeNormalColorModifier:Ts,setDepthColor:function(e,t,n,r){e.enableWorldToView=!0;let i=V(`float`,t),a=V(`float`,n),o=V(`bool`,r??!1);return e.worldModifier=Es(e.context.worldToView,i,a,o),e.updateGenerator(),{minDepth:i,maxDepth:a,reverse:o}},setWorldNormalColor:function(e){e.enableWorldToView=!0,e.worldModifier=Ts(e.context.worldToView),e.updateGenerator()}},Symbol.toStringTag,{value:`Module`})),Os=(e=>(e.w=`wrist`,e.t0=`thumb-metacarpal`,e.t1=`thumb-phalanx-proximal`,e.t2=`thumb-phalanx-distal`,e.t3=`thumb-tip`,e.i0=`index-finger-metacarpal`,e.i1=`index-finger-phalanx-proximal`,e.i2=`index-finger-phalanx-intermediate`,e.i3=`index-finger-phalanx-distal`,e.i4=`index-finger-tip`,e.m0=`middle-finger-metacarpal`,e.m1=`middle-finger-phalanx-proximal`,e.m2=`middle-finger-phalanx-intermediate`,e.m3=`middle-finger-phalanx-distal`,e.m4=`middle-finger-tip`,e.r0=`ring-finger-metacarpal`,e.r1=`ring-finger-phalanx-proximal`,e.r2=`ring-finger-phalanx-intermediate`,e.r3=`ring-finger-phalanx-distal`,e.r4=`ring-finger-tip`,e.p0=`pinky-finger-metacarpal`,e.p1=`pinky-finger-phalanx-proximal`,e.p2=`pinky-finger-phalanx-intermediate`,e.p3=`pinky-finger-phalanx-distal`,e.p4=`pinky-finger-tip`,e))(Os||{});Object.keys(Os).length,new E,new E;var ks=(e=>(e.w=`wrist`,e.t0=`thumb-metacarpal`,e.t1=`thumb-phalanx-proximal`,e.t2=`thumb-phalanx-distal`,e.t3=`thumb-tip`,e.i0=`index-finger-metacarpal`,e.i1=`index-finger-phalanx-proximal`,e.i2=`index-finger-phalanx-intermediate`,e.i3=`index-finger-phalanx-distal`,e.i4=`index-finger-tip`,e.m0=`middle-finger-metacarpal`,e.m1=`middle-finger-phalanx-proximal`,e.m2=`middle-finger-phalanx-intermediate`,e.m3=`middle-finger-phalanx-distal`,e.m4=`middle-finger-tip`,e.r0=`ring-finger-metacarpal`,e.r1=`ring-finger-phalanx-proximal`,e.r2=`ring-finger-phalanx-intermediate`,e.r3=`ring-finger-phalanx-distal`,e.r4=`ring-finger-tip`,e.p0=`pinky-finger-metacarpal`,e.p1=`pinky-finger-phalanx-proximal`,e.p2=`pinky-finger-phalanx-intermediate`,e.p3=`pinky-finger-phalanx-distal`,e.p4=`pinky-finger-tip`,e))(ks||{});Object.keys(ks).length,new k(0,0,-1),new k(0,0,1),new k(-1,0,0),new k(1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,-1),new k(0,0,1),new k(-1,0,0),new k(1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,1,0),new k(-1,0,0),new k(1,0,0);var As=class extends it{#e;#t=`Splats`;#n=3;#r=.1;#i=100;get _renderMode(){return this.#t}set _renderMode(e){e!==this.#t&&(this.#t=e,this.#a())}_setDepthLimits(e,t){this.#r=e,this.#i=t}_setSphericalHarmonicsLevel(e){let t=Math.max(0,Math.min(e,3));t!==this.#n&&(this.#n=t,this.#a())}_setSHDebugMode(e){let t=this.children;if(t&&t.length!==0)for(let n=0;n<t.length;n++){let r=t[n];r&&r.shDebugSHOnly!==e&&(r.shDebugSHOnly=e,r.updateGenerator())}}constructor(e){super(),this.#e=e.modelRoot;let t=this.#e.transform;t?this.matrix.fromArray(t):this.matrix.identity(),this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!0}add(...e){return super.add(...e),this.#t===`Splats`?this.#l(this.children):this.#a(),this}#a(){let e=this.children;e&&e.length!==0&&(this.#o(e,this.#n),this.#t===`SplatNormalsWorldSpace`?this.#s(e):this.#t===`SplatDepthColor`?this.#c(e):this.#l(e))}#o(e,t){for(let n=0;n<e.length;n++){let r=e[n];r&&r.maxSh!==t&&(r.maxSh=t,r.updateGenerator())}}#s(e){for(let t=0;t<e.length;t++){let n=e[t];n&&n.enableWorldToView!==void 0&&Ds.setWorldNormalColor(n)}}#c(e){for(let t=0;t<e.length;t++){let n=e[t];n&&n.enableWorldToView!==void 0&&Ds.setDepthColor(n,this.#r,this.#i,!0)}}#l(e){for(let t=0;t<e.length;t++){let n=e[t];n&&(n.enableWorldToView=!1,n.worldModifier=void 0,n.updateGenerator())}}},js=class extends os{#e;get coreLod(){if(this.#e==null)throw Error(`Lod accessed after disposal`);return this.#e}constructor(e){let t=e.lod;if(t.useExtSplats){let e={};t.sh1Data!=null&&(e.sh1=t.sh1Data),t.sh2Data!=null&&(e.sh2=t.sh2Data),t.sh3Data!=null&&t.sh3ExtendedData!=null&&(e.sh3a=t.sh3Data,e.sh3b=t.sh3ExtendedData),super({extSplats:new Aa({extArrays:[t.splats,t.splatsExtendedData],extra:e})})}else{let e={},n={};if(t.sh1Data!=null&&(n.sh1=t.sh1Data,e.sh1Max=t.sh1Max),t.sh2Data!=null&&(n.sh2=t.sh2Data,e.sh2Max=t.sh2Max),t.sh3Data!=null&&(n.sh3=t.sh3Data,e.sh3Max=t.sh3Max),!t.splats)throw Error(`Lod constructed before splats were assigned`);super({packedSplats:new fs({packedArray:t.splats,extra:n}),splatEncoding:e})}Object.defineProperty(this,"isLod",{value:!0}),this.#e=t;let n=this.#e.localBounds,r=new k(n[0],n[1],n[2]),i=new k(n[3],n[4],n[5]);this.localBounds=new d().setFromCenterAndSize(r,i);let a=i.multiplyScalar(.5).length();Object.defineProperty(this,"boundingSphere",{value:new ct(r,a)}),this.layers.mask=Ms.renderLayerMask}get _paddingCount(){return this.coreLod.paddingCount}dispose(){this.#e=null,super.dispose()}},Ms=class extends Vt{static renderLayerMask=6;#e=500;#t=new Set;#n=new Set;#r=!1;#i=!1;get crossfadeDuration(){return this.#e}set crossfadeDuration(e){this.#e=Math.max(0,e)}_computeAdditionalRenderNeeded(){let e=this.#r;this.#r=!1;let t=this.#i;return this.#i=!1,this.#t.size>0||this.#n.size>0||e||t}applyChanges(e){for(let{type:t,lod:n}of e)switch(t){case`created`:this.#a(n);break;case`modified`:this.#s(n);break;case`activated`:this.#c(n);break;case`deactivated`:this.#l(n);break;case`deleted`:this.#o(n)}}updateParentedTransform(e,t){let n=new A().fromArray(e),r=new A().fromArray(t);return new Float32Array(n.premultiply(r).elements)}onColorSpaceDetected(e){Zo.inputLinear=e}_onDrMapLoaded;_onDrMapReceived(e,t){this._onDrMapLoaded?.(e,t),this.#r=!0}#a(e){}#o(e){let t=e.key;t&&(e.key=null,this.#t.delete(t),this.#n.delete(t),t.removeFromParent(),t.dispose())}#s(e){let t=e.key,n=t??new js({lod:e}),r=e.modelRoot,i=r.key??new As({modelRoot:r});t||(n.opacity=0),e.key=n,r.key=i}#c(e){let t=e.key;if(!t)return;let n=e.modelRoot,r=n.stream,i=n.key,a=r.key;this.#t.delete(t),i&&!t.parent&&(i.add(t),a&&!i.parent?(a.add(i),i.updateWorldMatrix(!1,!0),r._onStreamLoaded(),e.lodIndex===0&&r._onRootLoaded()):i.parent&&t.updateWorldMatrix(!1,!0)),this.#e<=0?t.opacity=1:this.#u(t)}#l(e){let t=e.key;if(t){if(this.#e<=0)return t.opacity=0,void t.removeFromParent();this.#t.add(t),this.#d(t)}}#u(e){let t=this.#e,n=e.opacity,r=-1;this.#n.add(e);let i=a=>{r<0&&(r=a);let o=Math.min(1,(a-r)/t);e.opacity=n+(1-n)*o,o<1?this._requestAnimationFrame(i):(this.#n.delete(e),this.#i=!0)};this._requestAnimationFrame(i)}#d(e){let t=this.#e,n=-1,r=i=>{if(!this.#t.has(e))return;n<0&&(n=i);let a=Math.min(1,(i-n)/t);e.opacity=1-a,a>=1?(this.#t.delete(e),this.#i=!0,e.opacity=0,e.removeFromParent()):this._requestAnimationFrame(r)};this._requestAnimationFrame(r)}},Ns=class extends ge{#e;#t=null;#n=10;#r=10;#i=5195750;#a=16777215;#o;get miris(){if(!this.#o)throw Error("ThreeScene has not yet been initialized. Did you forget to `await miris.ready`?");return this.#o}#s=null;get viewerKey(){return this.#s}set viewerKey(e){this.#s=e,this.#e&&(this.#e.viewerKey=e)}constructor(e,...t){super(...t);let{viewerKey:n}=e??{};Object.defineProperty(this,"pending",{value:!0,configurable:!0,enumerable:!0}),Object.defineProperty(this,"ready",{enumerable:!0,value:this.#c(n)})}async#c(e){let t=await Ms.instance();return Object.defineProperty(this,"miris",{value:t,enumerable:!0}),this.#e=new Wt({miris:t,viewerKey:e??this.#s}),this.#e.key=this,this.#e.addEventListener(`sceneloaded`,()=>{this.dispatchEvent({type:`sceneloaded`})}),Object.defineProperty(this,"pending",{value:!1,configurable:!1}),this}dispose(){this.#e?.dispose()}setViewerKey(e){this.viewerKey=e}async fetchAssets(...e){return await this.ready,this.coreScene.fetchAssets(...e)}get coreScene(){if(!this.#e)throw Error("MirisScene has not yet been initialized. Did you forget to `await scene.ready`?");return this.#e}_updateGridHelperBackground(e){if(this.#t){let t=1,n=1,r=1;e.r>180&&e.g>180&&e.b>180&&(t=n=r=0);let i=this.#t.material;Array.isArray(i)?i.length>0&&`color`in i[0]&&i[0].color.setRGB(t,n,r):`color`in i&&i.color.setRGB(t,n,r)}}_toggleGridHelper(e=!1){this.#t||(this.#t=new se(this.#n,this.#r,this.#i,this.#a),this.add(this.#t)),this.#t.visible=e}},Ps=Math.PI/2-.1,Fs=class extends he{#e=new ae;#t=null;#n=!1;#r=new t;#i;enableRotate=!0;enableZoom=!0;constructor(e,t,n){super(t,n),Object.defineProperty(this,"objects",{value:new Set(e?e instanceof l?[e]:e:null)});let r=this.#a.bind(this),i=this.#o.bind(this),a=this.#s.bind(this),o=this.#s.bind(this);n.addEventListener(`pointerdown`,r),n.addEventListener(`pointermove`,i),n.addEventListener(`pointerup`,a),n.addEventListener(`pointerleave`,o),this.#i=()=>{n.removeEventListener(`pointerdown`,r),n.removeEventListener(`pointermove`,i),n.removeEventListener(`pointerup`,a),n.removeEventListener(`pointerleave`,o)}}#a({clientX:e,clientY:n}){if(!(this.domElement&&this.object instanceof S))return;let{left:r,top:i,width:a,height:o}=this.domElement.getBoundingClientRect(),s=new t((e-r)/a*2-1,-(n-i)/o*2+1);this.#e.setFromCamera(s,this.object);let[c]=this.#e.intersectObjects([...this.objects],!0);this.#t=null,c&&c.object.traverseAncestors(e=>{this.objects.has(e)&&(this.#t=e)}),this.#t&&(this.dispatchEvent({type:`start`}),this.#n=!0,this.#r=s,this.domElement.style.cursor=`grabbing`)}#o({clientX:e,clientY:n}){if(!(this.domElement&&this.object instanceof S))return;let{left:r,top:i,width:a,height:o}=this.domElement.getBoundingClientRect(),s=new t((e-r)/a*2-1,-(n-i)/o*2+1);if(!this.#n){this.#e.setFromCamera(s,this.object);let[e]=this.#e.intersectObjects([...this.objects],!0);this.domElement.style.cursor=e?`grab`:`default`;return}if(!this.#t)return;let c=s.x-this.#r.x,l=s.y-this.#r.y,{rotation:u}=this.#t;u.x-=5*l,u.x=Math.max(-Ps,Math.min(Ps,u.x)),u.y+=5*c,this.#r.copy(s)}#s(){this.#t&&this.dispatchEvent({type:`end`}),this.#n=!1,this.#t=null,this.domElement&&(this.domElement.style.cursor=`default`)}dispose(){this.#i(),this.domElement&&(this.domElement.style.cursor=`default`)}};function Is(e,t){if(t===0)return console.warn(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.`),e;if(t===2||t===1){let n=e.getIndex();if(n===null){let t=[],r=e.getAttribute(`position`);if(r===void 0)return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.`),e;for(let e=0;e<r.count;e++)t.push(e);e.setIndex(t),n=e.getIndex()}let r=n.count-2,i=[];if(t===2)for(let e=1;e<=r;e++)i.push(n.getX(0)),i.push(n.getX(e)),i.push(n.getX(e+1));else for(let e=0;e<r;e++)e%2==0?(i.push(n.getX(e)),i.push(n.getX(e+1)),i.push(n.getX(e+2))):(i.push(n.getX(e+2)),i.push(n.getX(e+1)),i.push(n.getX(e)));i.length/3!==r&&console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.`);let a=e.clone();return a.setIndex(i),a.clearGroups(),a}return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:`,t),e}var Ls=class extends ee{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Hs(e)}),this.register(function(e){return new Us(e)}),this.register(function(e){return new Qs(e)}),this.register(function(e){return new $s(e)}),this.register(function(e){return new ec(e)}),this.register(function(e){return new Gs(e)}),this.register(function(e){return new Ks(e)}),this.register(function(e){return new qs(e)}),this.register(function(e){return new Js(e)}),this.register(function(e){return new Vs(e)}),this.register(function(e){return new Ys(e)}),this.register(function(e){return new Ws(e)}),this.register(function(e){return new Zs(e)}),this.register(function(e){return new Xs(e)}),this.register(function(e){return new zs(e)}),this.register(function(e){return new tc(e)}),this.register(function(e){return new nc(e)})}load(e,t,n,r){let i=this,a;if(this.resourcePath!==``)a=this.resourcePath;else if(this.path!==``){let t=oe.extractUrlBase(e);a=oe.resolveURL(t,this.path)}else a=oe.extractUrlBase(e);this.manager.itemStart(e);let o=function(t){r?r(t):console.error(t),i.manager.itemError(e),i.manager.itemEnd(e)},s=new g(this.manager);s.setPath(this.path),s.setResponseType(`arraybuffer`),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(n){try{i.parse(n,a,function(n){t(n),i.manager.itemEnd(e)},o)}catch(e){o(e)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let i,a={},o={},s=new TextDecoder;if(typeof e==`string`)i=JSON.parse(e);else if(e instanceof ArrayBuffer)if(s.decode(new Uint8Array(e,0,4))===rc){try{a[$.KHR_BINARY_GLTF]=new oc(e)}catch(e){r&&r(e);return}i=JSON.parse(a[$.KHR_BINARY_GLTF].content)}else i=JSON.parse(s.decode(e));else i=e;if(i.asset===void 0||i.asset.version[0]<2)return void(r&&r(Error(`THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`)));let c=new Mc(i,{path:t||this.resourcePath||``,crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let e=0;e<this.pluginCallbacks.length;e++){let t=this.pluginCallbacks[e](c);t.name||console.error(`THREE.GLTFLoader: Invalid plugin found: missing name`),o[t.name]=t,a[t.name]=!0}if(i.extensionsUsed)for(let e=0;e<i.extensionsUsed.length;++e){let t=i.extensionsUsed[e],n=i.extensionsRequired||[];switch(t){case $.KHR_MATERIALS_UNLIT:a[t]=new Bs;break;case $.KHR_DRACO_MESH_COMPRESSION:a[t]=new sc(i,this.dracoLoader);break;case $.KHR_TEXTURE_TRANSFORM:a[t]=new cc;break;case $.KHR_MESH_QUANTIZATION:a[t]=new lc;break;default:n.indexOf(t)>=0&&o[t]===void 0&&console.warn(`THREE.GLTFLoader: Unknown extension "`+t+`".`)}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,i){n.parse(e,t,r,i)})}};function Rs(){let e={};return{get:function(t){return e[t]},add:function(t,n){e[t]=n},remove:function(t){delete e[t]},removeAll:function(){e={}}}}var $={KHR_BINARY_GLTF:`KHR_binary_glTF`,KHR_DRACO_MESH_COMPRESSION:`KHR_draco_mesh_compression`,KHR_LIGHTS_PUNCTUAL:`KHR_lights_punctual`,KHR_MATERIALS_CLEARCOAT:`KHR_materials_clearcoat`,KHR_MATERIALS_DISPERSION:`KHR_materials_dispersion`,KHR_MATERIALS_IOR:`KHR_materials_ior`,KHR_MATERIALS_SHEEN:`KHR_materials_sheen`,KHR_MATERIALS_SPECULAR:`KHR_materials_specular`,KHR_MATERIALS_TRANSMISSION:`KHR_materials_transmission`,KHR_MATERIALS_IRIDESCENCE:`KHR_materials_iridescence`,KHR_MATERIALS_ANISOTROPY:`KHR_materials_anisotropy`,KHR_MATERIALS_UNLIT:`KHR_materials_unlit`,KHR_MATERIALS_VOLUME:`KHR_materials_volume`,KHR_TEXTURE_BASISU:`KHR_texture_basisu`,KHR_TEXTURE_TRANSFORM:`KHR_texture_transform`,KHR_MESH_QUANTIZATION:`KHR_mesh_quantization`,KHR_MATERIALS_EMISSIVE_STRENGTH:`KHR_materials_emissive_strength`,EXT_MATERIALS_BUMP:`EXT_materials_bump`,EXT_TEXTURE_WEBP:`EXT_texture_webp`,EXT_TEXTURE_AVIF:`EXT_texture_avif`,EXT_MESHOPT_COMPRESSION:`EXT_meshopt_compression`,EXT_MESH_GPU_INSTANCING:`EXT_mesh_gpu_instancing`},zs=class{constructor(e){this.parser=e,this.name=$.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n=`light:`+e,r=t.cache.get(n);if(r)return r;let i=t.json,a=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e],o,s=new w(16777215);a.color!==void 0&&s.setRGB(a.color[0],a.color[1],a.color[2],`srgb-linear`);let c=a.range===void 0?0:a.range;switch(a.type){case`directional`:o=new be(s),o.target.position.set(0,0,-1),o.add(o.target);break;case`point`:o=new ue(s),o.distance=c;break;case`spot`:o=new Be(s),o.distance=c,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle===void 0?0:a.spot.innerConeAngle,a.spot.outerConeAngle=a.spot.outerConeAngle===void 0?Math.PI/4:a.spot.outerConeAngle,o.angle=a.spot.outerConeAngle,o.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,o.target.position.set(0,0,-1),o.add(o.target);break;default:throw Error(`THREE.GLTFLoader: Unexpected light type: `+a.type)}return o.position.set(0,0,0),Ec(o,a),a.intensity!==void 0&&(o.intensity=a.intensity),o.name=t.createUniqueName(a.name||`light_`+e),r=Promise.resolve(o),t.cache.add(n,r),r}getDependency(e,t){if(e===`light`)return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],i=(r.extensions&&r.extensions[this.name]||{}).light;return i===void 0?null:this._loadLight(i).then(function(e){return n._getNodeRef(t.cache,i,e)})}},Bs=class{constructor(){this.name=$.KHR_MATERIALS_UNLIT}getMaterialType(){return ke}extendParams(e,t,n){let r=[];e.color=new w(1,1,1),e.opacity=1;let i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){let t=i.baseColorFactor;e.color.setRGB(t[0],t[1],t[2],T),e.opacity=t[3]}i.baseColorTexture!==void 0&&r.push(n.assignTexture(e,`map`,i.baseColorTexture,`srgb`))}return Promise.all(r)}},Vs=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();let r=n.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Hs=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let t=this.parser.json.materials[e];return t.extensions&&t.extensions[this.name]?Ie:null}extendMaterialParams(e,n){let r=this.parser,i=r.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let a=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(n.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&a.push(r.assignTexture(n,`clearcoatMap`,o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(n.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&a.push(r.assignTexture(n,`clearcoatRoughnessMap`,o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(a.push(r.assignTexture(n,`clearcoatNormalMap`,o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let e=o.clearcoatNormalTexture.scale;n.clearcoatNormalScale=new t(e,e)}return Promise.all(a)}},Us=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_DISPERSION}getMaterialType(e){let t=this.parser.json.materials[e];return t.extensions&&t.extensions[this.name]?Ie:null}extendMaterialParams(e,t){let n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();let r=n.extensions[this.name];return t.dispersion=r.dispersion===void 0?0:r.dispersion,Promise.resolve()}},Ws=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let t=this.parser.json.materials[e];return t.extensions&&t.extensions[this.name]?Ie:null}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let i=[],a=r.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&i.push(n.assignTexture(t,`iridescenceMap`,a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&i.push(n.assignTexture(t,`iridescenceThicknessMap`,a.iridescenceThicknessTexture)),Promise.all(i)}},Gs=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_SHEEN}getMaterialType(e){let t=this.parser.json.materials[e];return t.extensions&&t.extensions[this.name]?Ie:null}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let i=[];t.sheenColor=new w(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=r.extensions[this.name];if(a.sheenColorFactor!==void 0){let e=a.sheenColorFactor;t.sheenColor.setRGB(e[0],e[1],e[2],T)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&i.push(n.assignTexture(t,`sheenColorMap`,a.sheenColorTexture,`srgb`)),a.sheenRoughnessTexture!==void 0&&i.push(n.assignTexture(t,`sheenRoughnessMap`,a.sheenRoughnessTexture)),Promise.all(i)}},Ks=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let t=this.parser.json.materials[e];return t.extensions&&t.extensions[this.name]?Ie:null}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let i=[],a=r.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&i.push(n.assignTexture(t,`transmissionMap`,a.transmissionTexture)),Promise.all(i)}},qs=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_VOLUME}getMaterialType(e){let t=this.parser.json.materials[e];return t.extensions&&t.extensions[this.name]?Ie:null}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let i=[],a=r.extensions[this.name];t.thickness=a.thicknessFactor===void 0?0:a.thicknessFactor,a.thicknessTexture!==void 0&&i.push(n.assignTexture(t,`thicknessMap`,a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new w().setRGB(o[0],o[1],o[2],T),Promise.all(i)}},Js=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_IOR}getMaterialType(e){let t=this.parser.json.materials[e];return t.extensions&&t.extensions[this.name]?Ie:null}extendMaterialParams(e,t){let n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();let r=n.extensions[this.name];return t.ior=r.ior===void 0?1.5:r.ior,Promise.resolve()}},Ys=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_SPECULAR}getMaterialType(e){let t=this.parser.json.materials[e];return t.extensions&&t.extensions[this.name]?Ie:null}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let i=[],a=r.extensions[this.name];t.specularIntensity=a.specularFactor===void 0?1:a.specularFactor,a.specularTexture!==void 0&&i.push(n.assignTexture(t,`specularIntensityMap`,a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new w().setRGB(o[0],o[1],o[2],T),a.specularColorTexture!==void 0&&i.push(n.assignTexture(t,`specularColorMap`,a.specularColorTexture,`srgb`)),Promise.all(i)}},Xs=class{constructor(e){this.parser=e,this.name=$.EXT_MATERIALS_BUMP}getMaterialType(e){let t=this.parser.json.materials[e];return t.extensions&&t.extensions[this.name]?Ie:null}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let i=[],a=r.extensions[this.name];return t.bumpScale=a.bumpFactor===void 0?1:a.bumpFactor,a.bumpTexture!==void 0&&i.push(n.assignTexture(t,`bumpMap`,a.bumpTexture)),Promise.all(i)}},Zs=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let t=this.parser.json.materials[e];return t.extensions&&t.extensions[this.name]?Ie:null}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let i=[],a=r.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&i.push(n.assignTexture(t,`anisotropyMap`,a.anisotropyTexture)),Promise.all(i)}},Qs=class{constructor(e){this.parser=e,this.name=$.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let i=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures`);return null}return t.loadTextureImage(e,i.source,a)}},$s=class{constructor(e){this.parser=e,this.name=$.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},ec=class{constructor(e){this.parser=e,this.name=$.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},tc=class{constructor(e){this.name=$.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let e=n.extensions[this.name],r=this.parser.getDependency(`buffer`,e.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files`);return null}return r.then(function(t){let n=e.byteOffset||0,r=e.byteLength||0,a=e.count,o=e.byteStride,s=new Uint8Array(t,n,r);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(a,o,s,e.mode,e.filter).then(function(e){return e.buffer}):i.ready.then(function(){let t=new ArrayBuffer(a*o);return i.decodeGltfBuffer(new Uint8Array(t),a,o,s,e.mode,e.filter),t})})}return null}},nc=class{constructor(e){this.name=$.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let e of r.primitives)if(e.mode!==pc.TRIANGLES&&e.mode!==pc.TRIANGLE_STRIP&&e.mode!==pc.TRIANGLE_FAN&&e.mode!==void 0)return null;let i=n.extensions[this.name].attributes,a=[],o={};for(let e in i)a.push(this.parser.getDependency(`accessor`,i[e]).then(t=>(o[e]=t,o[e])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(e=>{let t=e.pop(),n=t.isGroup?t.children:[t],r=e[0].count,i=[];for(let e of n){let t=new A,n=new k,a=new E,s=new k(1,1,1),c=new at(e.geometry,e.material,r);for(let e=0;e<r;e++)o.TRANSLATION&&n.fromBufferAttribute(o.TRANSLATION,e),o.ROTATION&&a.fromBufferAttribute(o.ROTATION,e),o.SCALE&&s.fromBufferAttribute(o.SCALE,e),c.setMatrixAt(e,t.compose(n,a,s));for(let t in o)if(t===`_COLOR_0`){let e=o[t];c.instanceColor=new He(e.array,e.itemSize,e.normalized)}else t!==`TRANSLATION`&&t!==`ROTATION`&&t!==`SCALE`&&e.geometry.setAttribute(t,o[t]);l.prototype.copy.call(c,e),this.parser.assignFinalMaterial(c),i.push(c)}return t.isGroup?(t.clear(),t.add(...i),t):i[0]}))}},rc=`glTF`,ic=1313821514,ac=5130562,oc=class{constructor(e){this.name=$.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,12),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==rc)throw Error(`THREE.GLTFLoader: Unsupported glTF-Binary header.`);if(this.header.version<2)throw Error(`THREE.GLTFLoader: Legacy binary file detected.`);let r=this.header.length-12,i=new DataView(e,12),a=0;for(;a<r;){let t=i.getUint32(a,!0);a+=4;let r=i.getUint32(a,!0);if(a+=4,r===ic){let r=new Uint8Array(e,12+a,t);this.content=n.decode(r)}else if(r===ac){let n=12+a;this.body=e.slice(n,n+t)}a+=t}if(this.content===null)throw Error(`THREE.GLTFLoader: JSON content not found.`)}},sc=class{constructor(e,t){if(!t)throw Error(`THREE.GLTFLoader: No DRACOLoader instance provided.`);this.name=$.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,i=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},s={},c={};for(let e in a){let t=vc[e]||e.toLowerCase();o[t]=a[e]}for(let t in e.attributes){let r=vc[t]||t.toLowerCase();if(a[t]!==void 0){let i=n.accessors[e.attributes[t]];c[r]=mc[i.componentType].name,s[r]=!0===i.normalized}}return t.getDependency(`bufferView`,i).then(function(e){return new Promise(function(t,n){r.decodeDracoFile(e,function(e){for(let t in e.attributes){let n=e.attributes[t],r=s[t];r!==void 0&&(n.normalized=r)}t(e)},o,c,T,n)})})}},cc=class{constructor(){this.name=$.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return t.texCoord!==void 0&&t.texCoord!==e.channel||t.offset!==void 0||t.rotation!==void 0||t.scale!==void 0?(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0,e):e}},lc=class{constructor(){this.name=$.KHR_MESH_QUANTIZATION}},uc=class extends Ye{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r*3+r;for(let e=0;e!==r;e++)t[e]=n[i+e];return t}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=2*o,c=3*o,l=r-t,u=(n-t)/l,d=u*u,f=d*u,p=e*c,m=p-c,h=-2*f+3*d,g=f-d,_=1-h,v=g-d+u;for(let e=0;e!==o;e++){let t=a[m+e+o],n=a[m+e+s]*l,r=a[p+e+o],c=a[p+e]*l;i[e]=_*t+v*n+h*r+g*c}return i}},dc=new E,fc=class extends uc{interpolate_(e,t,n,r){let i=super.interpolate_(e,t,n,r);return dc.fromArray(i).normalize().toArray(i),i}},pc={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},mc={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},hc={9728:ze,9729:x,9984:Ae,9985:re,9986:dt,9987:Se},gc={33071:xe,33648:Ve,10497:ne},_c={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},vc={POSITION:`position`,NORMAL:`normal`,TANGENT:`tangent`,TEXCOORD_0:`uv`,TEXCOORD_1:`uv1`,TEXCOORD_2:`uv2`,TEXCOORD_3:`uv3`,COLOR_0:`color`,WEIGHTS_0:`skinWeight`,JOINTS_0:`skinIndex`},yc={scale:`scale`,translation:`position`,rotation:`quaternion`,weights:`morphTargetInfluences`},bc={CUBICSPLINE:void 0,LINEAR:Ee,STEP:Re},xc=`OPAQUE`,Sc=`MASK`,Cc=`BLEND`;function wc(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new nt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),e.DefaultMaterial}function Tc(e,t,n){for(let r in n.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=n.extensions[r])}function Ec(e,t){t.extras!==void 0&&(typeof t.extras==`object`?Object.assign(e.userData,t.extras):console.warn(`THREE.GLTFLoader: Ignoring primitive type .extras, `+t.extras))}function Dc(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let n=0,r=t.weights.length;n<r;n++)e.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){let n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(let t=0,r=n.length;t<r;t++)e.morphTargetDictionary[n[t]]=t}else console.warn(`THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.`)}}function Oc(e){let t,n=e.extensions&&e.extensions[$.KHR_DRACO_MESH_COMPRESSION];if(t=n?`draco:`+n.bufferView+`:`+n.indices+`:`+kc(n.attributes):e.indices+`:`+kc(e.attributes)+`:`+e.mode,e.targets!==void 0)for(let n=0,r=e.targets.length;n<r;n++)t+=`:`+kc(e.targets[n]);return t}function kc(e){let t=``,n=Object.keys(e).sort();for(let r=0,i=n.length;r<i;r++)t+=n[r]+`:`+e[n[r]]+`;`;return t}function Ac(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw Error(`THREE.GLTFLoader: Unsupported normalized accessor component type.`)}}var jc=new A,Mc=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Rs,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,a=!1,s=-1;if(typeof navigator<`u`){let e=navigator.userAgent;n=!0===/^((?!chrome|android).)*safari/i.test(e);let t=e.match(/Version\/(\d+)/);r=n&&t?parseInt(t[1],10):-1,a=e.indexOf(`Firefox`)>-1,s=a?e.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>`u`||n&&r<17||a&&s<98?this.textureLoader=new o(this.options.manager):this.textureLoader=new i(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new g(this.options.manager),this.fileLoader.setResponseType(`arraybuffer`),this.options.crossOrigin===`use-credentials`&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(e){return e._markDefs&&e._markDefs()}),Promise.all(this._invokeAll(function(e){return e.beforeRoot&&e.beforeRoot()})).then(function(){return Promise.all([n.getDependencies(`scene`),n.getDependencies(`animation`),n.getDependencies(`camera`)])}).then(function(t){let a={scene:t[0][r.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:r.asset,parser:n,userData:{}};return Tc(i,a,r),Ec(a,r),Promise.all(n._invokeAll(function(e){return e.afterRoot&&e.afterRoot(a)})).then(function(){for(let e of a.scenes)e.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n].joints;for(let t=0,n=r.length;t<n;t++)e[r[t]].isBone=!0}for(let t=0,r=e.length;t<r;t++){let r=e[t];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),i=(e,t)=>{let n=this.associations.get(e);n!=null&&this.associations.set(t,n);for(let[n,r]of e.children.entries())i(r,t.children[n])};return i(n,r),r.name+=`_instance_`+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let i=e(t[r]);i&&n.push(i)}return n}getDependency(e,t){let n=e+`:`+t,r=this.cache.get(n);if(!r){switch(e){case`scene`:r=this.loadScene(t);break;case`node`:r=this._invokeOne(function(e){return e.loadNode&&e.loadNode(t)});break;case`mesh`:r=this._invokeOne(function(e){return e.loadMesh&&e.loadMesh(t)});break;case`accessor`:r=this.loadAccessor(t);break;case`bufferView`:r=this._invokeOne(function(e){return e.loadBufferView&&e.loadBufferView(t)});break;case`buffer`:r=this.loadBuffer(t);break;case`material`:r=this._invokeOne(function(e){return e.loadMaterial&&e.loadMaterial(t)});break;case`texture`:r=this._invokeOne(function(e){return e.loadTexture&&e.loadTexture(t)});break;case`skin`:r=this.loadSkin(t);break;case`animation`:r=this._invokeOne(function(e){return e.loadAnimation&&e.loadAnimation(t)});break;case`camera`:r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(n){return n!=this&&n.getDependency&&n.getDependency(e,t)}),!r)throw Error(`Unknown type: `+e)}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e===`mesh`?`es`:`s`)]||[];t=Promise.all(r.map(function(t,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!==`arraybuffer`)throw Error(`THREE.GLTFLoader: `+t.type+` buffer type is not supported.`);if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[$.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(e,i){n.load(oe.resolveURL(t.uri,r.path),e,void 0,function(){i(Error(`THREE.GLTFLoader: Failed to load buffer "`+t.uri+`".`))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency(`buffer`,t.buffer).then(function(e){let n=t.byteLength||0,r=t.byteOffset||0;return e.slice(r,r+n)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let e=_c[r.type],t=mc[r.componentType],n=!0===r.normalized,i=new t(r.count*e);return Promise.resolve(new a(i,e,n))}let i=[];return r.bufferView===void 0?i.push(null):i.push(this.getDependency(`bufferView`,r.bufferView)),r.sparse!==void 0&&(i.push(this.getDependency(`bufferView`,r.sparse.indices.bufferView)),i.push(this.getDependency(`bufferView`,r.sparse.values.bufferView))),Promise.all(i).then(function(e){let i=e[0],o=_c[r.type],s=mc[r.componentType],c=s.BYTES_PER_ELEMENT,l=c*o,u=r.byteOffset||0,d=r.bufferView===void 0?void 0:n.bufferViews[r.bufferView].byteStride,f=!0===r.normalized,p,m;if(d&&d!==l){let e=Math.floor(u/d),n=`InterleavedBuffer:`+r.bufferView+`:`+r.componentType+`:`+e+`:`+r.count,a=t.cache.get(n);a||(p=new s(i,e*d,r.count*d/c),a=new Fe(p,d/c),t.cache.add(n,a)),m=new tt(a,o,u%d/c,f)}else p=i===null?new s(r.count*o):new s(i,u,r.count*o),m=new a(p,o,f);if(r.sparse!==void 0){let t=_c.SCALAR,n=mc[r.sparse.indices.componentType],c=r.sparse.indices.byteOffset||0,l=r.sparse.values.byteOffset||0,u=new n(e[1],c,r.sparse.count*t),d=new s(e[2],l,r.sparse.count*o);i!==null&&(m=new a(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let e=0,t=u.length;e<t;e++){let t=u[e];if(m.setX(t,d[e*o]),o>=2&&m.setY(t,d[e*o+1]),o>=3&&m.setZ(t,d[e*o+2]),o>=4&&m.setW(t,d[e*o+3]),o>=5)throw Error(`THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.`)}m.normalized=f}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,i=t.images[r],a=this.textureLoader;if(i.uri){let e=n.manager.getHandler(i.uri);e!==null&&(a=e)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let r=this,i=this.json,a=i.textures[e],o=i.images[t],s=(o.uri||o.bufferView)+`:`+a.sampler;if(this.textureCache[s])return this.textureCache[s];let c=this.loadImageSource(t,n).then(function(t){t.flipY=!1,t.name=a.name||o.name||``,t.name===``&&typeof o.uri==`string`&&!1===o.uri.startsWith(`data:image/`)&&(t.name=o.uri);let n=(i.samplers||{})[a.sampler]||{};return t.magFilter=hc[n.magFilter]||1006,t.minFilter=hc[n.minFilter]||1008,t.wrapS=gc[n.wrapS]||1e3,t.wrapT=gc[n.wrapT]||1e3,t.generateMipmaps=!t.isCompressedTexture&&t.minFilter!==1003&&t.minFilter!==1006,r.associations.set(t,{textures:e}),t}).catch(function(){return null});return this.textureCache[s]=c,c}loadImageSource(e,t){let n=this,r=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(e=>e.clone());let a=r.images[e],o=self.URL||self.webkitURL,s=a.uri||``,c=!1;if(a.bufferView!==void 0)s=n.getDependency(`bufferView`,a.bufferView).then(function(e){c=!0;let t=new Blob([e],{type:a.mimeType});return s=o.createObjectURL(t),s});else if(a.uri===void 0)throw Error(`THREE.GLTFLoader: Image `+e+` is missing URI and bufferView`);let l=Promise.resolve(s).then(function(e){return new Promise(function(n,r){let a=n;!0===t.isImageBitmapLoader&&(a=function(e){let t=new Ke(e);t.needsUpdate=!0,n(t)}),t.load(oe.resolveURL(e,i.path),a,void 0,r)})}).then(function(e){var t;return!0===c&&o.revokeObjectURL(s),Ec(e,a),e.userData.mimeType=a.mimeType||((t=a.uri).search(/\.jpe?g($|\?)/i)>0||t.search(/^data\:image\/jpeg/)===0?`image/jpeg`:t.search(/\.webp($|\?)/i)>0||t.search(/^data\:image\/webp/)===0?`image/webp`:t.search(/\.ktx2($|\?)/i)>0||t.search(/^data\:image\/ktx2/)===0?`image/ktx2`:`image/png`),e}).catch(function(e){throw console.error(`THREE.GLTFLoader: Couldn't load texture`,s),e});return this.sourceCache[e]=l,l}assignTexture(e,t,n,r){let i=this;return this.getDependency(`texture`,n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&((a=a.clone()).channel=n.texCoord),i.extensions[$.KHR_TEXTURE_TRANSFORM]){let e=n.extensions===void 0?void 0:n.extensions[$.KHR_TEXTURE_TRANSFORM];if(e){let t=i.associations.get(a);a=i.extensions[$.KHR_TEXTURE_TRANSFORM].extendTexture(a,e),i.associations.set(a,t)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let e=`PointsMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new h,_e.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,t.sizeAttenuation=!1,this.cache.add(e,t)),n=t}else if(e.isLine){let e=`LineBasicMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new Ge,_e.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,this.cache.add(e,t)),n=t}if(r||i||a){let e=`ClonedMaterial:`+n.uuid+`:`;r&&(e+=`derivative-tangents:`),i&&(e+=`vertex-colors:`),a&&(e+=`flat-shading:`);let t=this.cache.get(e);t||(t=n.clone(),i&&(t.vertexColors=!0),a&&(t.flatShading=!0),r&&(t.normalScale&&(t.normalScale.y*=-1),t.clearcoatNormalScale&&(t.clearcoatNormalScale.y*=-1)),this.cache.add(e,t),this.associations.set(t,this.associations.get(n))),n=t}e.material=n}getMaterialType(){return nt}loadMaterial(e){let n=this,r=this.json,i=this.extensions,a=r.materials[e],o,s={},c=[];if((a.extensions||{})[$.KHR_MATERIALS_UNLIT]){let e=i[$.KHR_MATERIALS_UNLIT];o=e.getMaterialType(),c.push(e.extendParams(s,a,n))}else{let t=a.pbrMetallicRoughness||{};if(s.color=new w(1,1,1),s.opacity=1,Array.isArray(t.baseColorFactor)){let e=t.baseColorFactor;s.color.setRGB(e[0],e[1],e[2],T),s.opacity=e[3]}t.baseColorTexture!==void 0&&c.push(n.assignTexture(s,`map`,t.baseColorTexture,`srgb`)),s.metalness=t.metallicFactor===void 0?1:t.metallicFactor,s.roughness=t.roughnessFactor===void 0?1:t.roughnessFactor,t.metallicRoughnessTexture!==void 0&&(c.push(n.assignTexture(s,`metalnessMap`,t.metallicRoughnessTexture)),c.push(n.assignTexture(s,`roughnessMap`,t.metallicRoughnessTexture))),o=this._invokeOne(function(t){return t.getMaterialType&&t.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,s)})))}!0===a.doubleSided&&(s.side=2);let l=a.alphaMode||xc;if(l===Cc?(s.transparent=!0,s.depthWrite=!1):(s.transparent=!1,l===Sc&&(s.alphaTest=a.alphaCutoff===void 0?.5:a.alphaCutoff)),a.normalTexture!==void 0&&o!==ke&&(c.push(n.assignTexture(s,`normalMap`,a.normalTexture)),s.normalScale=new t(1,1),a.normalTexture.scale!==void 0)){let e=a.normalTexture.scale;s.normalScale.set(e,e)}if(a.occlusionTexture!==void 0&&o!==ke&&(c.push(n.assignTexture(s,`aoMap`,a.occlusionTexture)),a.occlusionTexture.strength!==void 0&&(s.aoMapIntensity=a.occlusionTexture.strength)),a.emissiveFactor!==void 0&&o!==ke){let e=a.emissiveFactor;s.emissive=new w().setRGB(e[0],e[1],e[2],T)}return a.emissiveTexture!==void 0&&o!==ke&&c.push(n.assignTexture(s,`emissiveMap`,a.emissiveTexture,`srgb`)),Promise.all(c).then(function(){let t=new o(s);return a.name&&(t.name=a.name),Ec(t,a),n.associations.set(t,{materials:e}),a.extensions&&Tc(i,t,a),t})}createUniqueName(e){let t=pt.sanitizeNodeName(e||``);return t in this.nodeNamesUsed?t+`_`+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function i(e){return n[$.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(n){return Nc(n,e,t)})}let a=[];for(let n=0,o=e.length;n<o;n++){let o=e[n],s=Oc(o),c=r[s];if(c)a.push(c.promise);else{let e;e=o.extensions&&o.extensions[$.KHR_DRACO_MESH_COMPRESSION]?i(o):Nc(new We,o,t),r[s]={primitive:o,promise:e},a.push(e)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,i=n.meshes[e],a=i.primitives,o=[];for(let e=0,t=a.length;e<t;e++){let t=a[e].material===void 0?wc(this.cache):this.getDependency(`material`,a[e].material);o.push(t)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(n){let o=n.slice(0,n.length-1),s=n[n.length-1],c=[];for(let n=0,l=s.length;n<l;n++){let l=s[n],u=a[n],d,f=o[n];if(u.mode===pc.TRIANGLES||u.mode===pc.TRIANGLE_STRIP||u.mode===pc.TRIANGLE_FAN||u.mode===void 0)d=!0===i.isSkinnedMesh?new Me(l,f):new Ue(l,f),!0===d.isSkinnedMesh&&d.normalizeSkinWeights(),u.mode===pc.TRIANGLE_STRIP?d.geometry=Is(d.geometry,1):u.mode===pc.TRIANGLE_FAN&&(d.geometry=Is(d.geometry,2));else if(u.mode===pc.LINES)d=new b(l,f);else if(u.mode===pc.LINE_STRIP)d=new qe(l,f);else if(u.mode===pc.LINE_LOOP)d=new m(l,f);else{if(u.mode!==pc.POINTS)throw Error(`THREE.GLTFLoader: Primitive mode unsupported: `+u.mode);d=new me(l,f)}Object.keys(d.geometry.morphAttributes).length>0&&Dc(d,i),d.name=t.createUniqueName(i.name||`mesh_`+e),Ec(d,i),u.extensions&&Tc(r,d,u),t.assignFinalMaterial(d),c.push(d)}for(let n=0,r=c.length;n<r;n++)t.associations.set(c[n],{meshes:e,primitives:n});if(c.length===1)return i.extensions&&Tc(r,c[0],i),c[0];let l=new it;i.extensions&&Tc(r,l,i),t.associations.set(l,{meshes:e});for(let e=0,t=c.length;e<t;e++)l.add(c[e]);return l})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(r)return n.type===`perspective`?t=new S(Pe.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type===`orthographic`&&(t=new f(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ec(t,n),Promise.resolve(t);console.warn(`THREE.GLTFLoader: Missing camera parameters.`)}loadSkin(e){let t=this.json.skins[e],n=[];for(let e=0,r=t.joints.length;e<r;e++)n.push(this._loadNodeShallow(t.joints[e]));return t.inverseBindMatrices===void 0?n.push(null):n.push(this.getDependency(`accessor`,t.inverseBindMatrices)),Promise.all(n).then(function(e){let n=e.pop(),r=e,i=[],a=[];for(let e=0,o=r.length;e<o;e++){let o=r[e];if(o){i.push(o);let t=new A;n!==null&&t.fromArray(n.array,16*e),a.push(t)}else console.warn(`THREE.GLTFLoader: Joint "%s" could not be found.`,t.joints[e])}return new $e(i,a)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],i=r.name?r.name:`animation_`+e,a=[],o=[],s=[],c=[],l=[];for(let e=0,t=r.channels.length;e<t;e++){let t=r.channels[e],n=r.samplers[t.sampler],i=t.target,u=i.node,d=r.parameters===void 0?n.input:r.parameters[n.input],f=r.parameters===void 0?n.output:r.parameters[n.output];i.node!==void 0&&(a.push(this.getDependency(`node`,u)),o.push(this.getDependency(`accessor`,d)),s.push(this.getDependency(`accessor`,f)),c.push(n),l.push(i))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l)]).then(function(e){let t=e[0],a=e[1],o=e[2],s=e[3],c=e[4],l=[];for(let e=0,r=t.length;e<r;e++){let r=t[e],i=a[e],u=o[e],d=s[e],f=c[e];if(r===void 0)continue;r.updateMatrix&&r.updateMatrix();let p=n._createAnimationTracks(r,i,u,d,f);if(p)for(let e=0;e<p.length;e++)l.push(p[e])}let u=new De(i,void 0,l);return Ec(u,r),u})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency(`mesh`,r.mesh).then(function(e){let t=n._getNodeRef(n.meshCache,r.mesh,e);return r.weights!==void 0&&t.traverse(function(e){if(e.isMesh)for(let t=0,n=r.weights.length;t<n;t++)e.morphTargetInfluences[t]=r.weights[t]}),t})}loadNode(e){let t=this,n=this.json.nodes[e],r=t._loadNodeShallow(e),i=[],a=n.children||[];for(let e=0,n=a.length;e<n;e++)i.push(t.getDependency(`node`,a[e]));let o=n.skin===void 0?Promise.resolve(null):t.getDependency(`skin`,n.skin);return Promise.all([r,Promise.all(i),o]).then(function(e){let t=e[0],n=e[1],r=e[2];r!==null&&t.traverse(function(e){e.isSkinnedMesh&&e.bind(r,jc)});for(let e=0,r=n.length;e<r;e++)t.add(n[e]);return t})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let i=t.nodes[e],a=i.name?r.createUniqueName(i.name):``,o=[],s=r._invokeOne(function(t){return t.createNodeMesh&&t.createNodeMesh(e)});return s&&o.push(s),i.camera!==void 0&&o.push(r.getDependency(`camera`,i.camera).then(function(e){return r._getNodeRef(r.cameraCache,i.camera,e)})),r._invokeAll(function(t){return t.createNodeAttachment&&t.createNodeAttachment(e)}).forEach(function(e){o.push(e)}),this.nodeCache[e]=Promise.all(o).then(function(t){let o;if(o=!0===i.isBone?new c:t.length>1?new it:t.length===1?t[0]:new l,o!==t[0])for(let e=0,n=t.length;e<n;e++)o.add(t[e]);if(i.name&&(o.userData.name=i.name,o.name=a),Ec(o,i),i.extensions&&Tc(n,o,i),i.matrix!==void 0){let e=new A;e.fromArray(i.matrix),o.applyMatrix4(e)}else i.translation!==void 0&&o.position.fromArray(i.translation),i.rotation!==void 0&&o.quaternion.fromArray(i.rotation),i.scale!==void 0&&o.scale.fromArray(i.scale);if(r.associations.has(o)){if(i.mesh!==void 0&&r.meshCache.refs[i.mesh]>1){let e=r.associations.get(o);r.associations.set(o,{...e})}}else r.associations.set(o,{});return r.associations.get(o).nodes=e,o}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,i=new it;n.name&&(i.name=r.createUniqueName(n.name)),Ec(i,n),n.extensions&&Tc(t,i,n);let a=n.nodes||[],o=[];for(let e=0,t=a.length;e<t;e++)o.push(r.getDependency(`node`,a[e]));return Promise.all(o).then(function(e){for(let t=0,n=e.length;t<n;t++)i.add(e[t]);return r.associations=(e=>{let t=new Map;for(let[e,n]of r.associations)(e instanceof _e||e instanceof Ke)&&t.set(e,n);return e.traverse(e=>{let n=r.associations.get(e);n!=null&&t.set(e,n)}),t})(i),i})}_createAnimationTracks(e,t,n,r,i){let a=[],o=e.name?e.name:e.uuid,s=[],c;switch(yc[i.path]===yc.weights?e.traverse(function(e){e.morphTargetInfluences&&s.push(e.name?e.name:e.uuid)}):s.push(o),yc[i.path]){case yc.weights:c=ye;break;case yc.rotation:c=Ce;break;case yc.translation:case yc.scale:c=Ze;break;default:c=n.itemSize===1?ye:Ze}let l=r.interpolation===void 0?Ee:bc[r.interpolation],u=this._getArrayFromAccessor(n);for(let e=0,n=s.length;e<n;e++){let n=new c(s[e]+`.`+yc[i.path],t.array,u,l);r.interpolation===`CUBICSPLINE`&&this._createCubicSplineTrackInterpolant(n),a.push(n)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let e=Ac(t.constructor),n=new Float32Array(t.length);for(let r=0,i=t.length;r<i;r++)n[r]=t[r]*e;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(e){return new(this instanceof Ce?fc:uc)(this.times,this.values,this.getValueSize()/3,e)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Nc(e,t,n){let r=t.attributes,i=[];function a(t,r){return n.getDependency(`accessor`,t).then(function(t){e.setAttribute(r,t)})}for(let t in r){let n=vc[t]||t.toLowerCase();n in e.attributes||i.push(a(r[t],n))}if(t.indices!==void 0&&!e.index){let r=n.getDependency(`accessor`,t.indices).then(function(t){e.setIndex(t)});i.push(r)}return _.workingColorSpace!==`srgb-linear`&&`COLOR_0`in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${_.workingColorSpace}" not supported.`),Ec(e,t),function(e,t,n){let r=t.attributes,i=new d;if(r.POSITION===void 0)return;{let e=n.json.accessors[r.POSITION],t=e.min,a=e.max;if(t===void 0||a===void 0)return void console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`);if(i.set(new k(t[0],t[1],t[2]),new k(a[0],a[1],a[2])),e.normalized){let t=Ac(mc[e.componentType]);i.min.multiplyScalar(t),i.max.multiplyScalar(t)}}let a=t.targets;if(a!==void 0){let e=new k,t=new k;for(let r=0,i=a.length;r<i;r++){let i=a[r];if(i.POSITION!==void 0){let r=n.json.accessors[i.POSITION],a=r.min,o=r.max;if(a!==void 0&&o!==void 0){if(t.setX(Math.max(Math.abs(a[0]),Math.abs(o[0]))),t.setY(Math.max(Math.abs(a[1]),Math.abs(o[1]))),t.setZ(Math.max(Math.abs(a[2]),Math.abs(o[2]))),r.normalized){let e=Ac(mc[r.componentType]);t.multiplyScalar(e)}e.max(t)}else console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`)}}i.expandByVector(e)}e.boundingBox=i;let o=new ct;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,e.boundingSphere=o}(e,t,n),Promise.all(i).then(function(){return t.targets===void 0?e:function(e,t,n){let r=!1,i=!1,a=!1;for(let e=0,n=t.length;e<n;e++){let n=t[e];if(n.POSITION!==void 0&&(r=!0),n.NORMAL!==void 0&&(i=!0),n.COLOR_0!==void 0&&(a=!0),r&&i&&a)break}if(!r&&!i&&!a)return Promise.resolve(e);let o=[],s=[],c=[];for(let l=0,u=t.length;l<u;l++){let u=t[l];if(r){let t=u.POSITION===void 0?e.attributes.position:n.getDependency(`accessor`,u.POSITION);o.push(t)}if(i){let t=u.NORMAL===void 0?e.attributes.normal:n.getDependency(`accessor`,u.NORMAL);s.push(t)}if(a){let t=u.COLOR_0===void 0?e.attributes.color:n.getDependency(`accessor`,u.COLOR_0);c.push(t)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(t){let n=t[0],o=t[1],s=t[2];return r&&(e.morphAttributes.position=n),i&&(e.morphAttributes.normal=o),a&&(e.morphAttributes.color=s),e.morphTargetsRelative=!0,e})}(e,t.targets,n)})}var Pc=class extends rt{constructor(e){super(e),this.type=Te}parse(e){let t=function(e,t){switch(e){case 1:throw Error(`THREE.HDRLoader: Read Error: `+(t||``));case 2:throw Error(`THREE.HDRLoader: Write Error: `+(t||``));case 3:throw Error(`THREE.HDRLoader: Bad File Format: `+(t||``));default:throw Error(`THREE.HDRLoader: Memory Error: `+(t||``))}},n=function(e,t,n){t||=1024;let r=e.pos,i=-1,a=0,o=``,s=String.fromCharCode.apply(null,new Uint16Array(e.subarray(r,r+128)));for(;0>(i=s.indexOf(`
`))&&a<t&&r<e.byteLength;)o+=s,a+=s.length,r+=128,s+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(r,r+128)));return-1<i&&(e.pos+=a+i+1,o+s.slice(0,i))},r=function(e,t,n,r){let i=2**(e[t+3]-128)/255;n[r+0]=e[t+0]*i,n[r+1]=e[t+1]*i,n[r+2]=e[t+2]*i,n[r+3]=1},i=function(e,t,n,r){let i=2**(e[t+3]-128)/255;n[r+0]=Xe.toHalfFloat(Math.min(e[t+0]*i,65504)),n[r+1]=Xe.toHalfFloat(Math.min(e[t+1]*i,65504)),n[r+2]=Xe.toHalfFloat(Math.min(e[t+2]*i,65504)),n[r+3]=Xe.toHalfFloat(1)},a=new Uint8Array(e);a.pos=0;let o=function(e){let r=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,i=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,a=/^\s*FORMAT=(\S+)\s*$/,o=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,s={valid:0,string:``,comments:``,programtype:`RGBE`,format:``,gamma:1,exposure:1,width:0,height:0},c,l;for((e.pos>=e.byteLength||!(c=n(e)))&&t(1,`no header found`),(l=c.match(/^#\?(\S+)/))||t(3,`bad initial token`),s.valid|=1,s.programtype=l[1],s.string+=c+`
`;c=n(e),!1!==c;)if(s.string+=c+`
`,c.charAt(0)!==`#`){if((l=c.match(r))&&(s.gamma=parseFloat(l[1])),(l=c.match(i))&&(s.exposure=parseFloat(l[1])),(l=c.match(a))&&(s.valid|=2,s.format=l[1]),(l=c.match(o))&&(s.valid|=4,s.height=parseInt(l[1],10),s.width=parseInt(l[2],10)),2&s.valid&&4&s.valid)break}else s.comments+=c+`
`;return 2&s.valid||t(3,`missing format specifier`),4&s.valid||t(3,`missing image size specifier`),s}(a),s=o.width,c=o.height,l=function(e,n,r){let i=n;if(i<8||i>32767||e[0]!==2||e[1]!==2||128&e[2])return new Uint8Array(e);i!==(e[2]<<8|e[3])&&t(3,`wrong scanline width`);let a=new Uint8Array(4*n*r);a.length||t(4,`unable to allocate buffer space`);let o=0,s=0,c=4*i,l=new Uint8Array(4),u=new Uint8Array(c),d=r;for(;d>0&&s<e.byteLength;){s+4>e.byteLength&&t(1),l[0]=e[s++],l[1]=e[s++],l[2]=e[s++],l[3]=e[s++],l[0]==2&&l[1]==2&&(l[2]<<8|l[3])==i||t(3,`bad rgbe scanline format`);let n,r=0;for(;r<c&&s<e.byteLength;){n=e[s++];let i=n>128;if(i&&(n-=128),(n===0||r+n>c)&&t(3,`bad scanline data`),i){let t=e[s++];for(let e=0;e<n;e++)u[r++]=t}else u.set(e.subarray(s,s+n),r),r+=n,s+=n}let f=i;for(let e=0;e<f;e++){let t=0;a[o]=u[e+t],t+=i,a[o+1]=u[e+t],t+=i,a[o+2]=u[e+t],t+=i,a[o+3]=u[e+t],o+=4}d--}return a}(a.subarray(a.pos),s,c),u,d,f;switch(this.type){case ve:f=l.length/4;let e=new Float32Array(4*f);for(let t=0;t<f;t++)r(l,4*t,e,4*t);u=e,d=ve;break;case Te:f=l.length/4;let t=new Uint16Array(4*f);for(let e=0;e<f;e++)i(l,4*e,t,4*e);u=t,d=Te;break;default:throw Error(`THREE.HDRLoader: Unsupported type: `+this.type)}return{width:s,height:c,data:u,header:o.string,gamma:o.gamma,exposure:o.exposure,type:d}}setDataType(e){return this.type=e,this}load(e,t,n,r){return super.load(e,function(e,n){switch(e.type){case ve:case Te:e.colorSpace=T,e.minFilter=x,e.magFilter=x,e.generateMipmaps=!1,e.flipY=!0}t&&t(e,n)},n,r)}},Fc=new WeakMap,Ic=new WeakMap;function Lc(e){let t=e.getContext();return typeof WebGL2RenderingContext<`u`&&t instanceof WebGL2RenderingContext?t:null}function Rc(e){let t=Lc(e);if(!t)return!1;let n=Fc.get(t);if(n!==void 0)return n;let r=zc(t,[t.RGBA32UI,t.RGBA32UI,t.RGBA8]);return Fc.set(t,r),r}function zc(e,t){let n=e.getParameter(e.FRAMEBUFFER_BINDING),r=e.getParameter(e.TEXTURE_BINDING_2D_ARRAY),i=e.createFramebuffer(),a=[];try{return e.bindFramebuffer(e.FRAMEBUFFER,i),t.forEach((t,n)=>{let r=e.createTexture();a.push(r),e.bindTexture(e.TEXTURE_2D_ARRAY,r),e.texStorage3D(e.TEXTURE_2D_ARRAY,1,t,4,4,1),e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,r,0,0)}),e.drawBuffers(t.map((t,n)=>e.COLOR_ATTACHMENT0+n)),e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE}catch{return!1}finally{e.bindFramebuffer(e.FRAMEBUFFER,n),e.bindTexture(e.TEXTURE_2D_ARRAY,r),e.deleteFramebuffer(i);for(let t of a)e.deleteTexture(t);for(;e.getError()!==e.NO_ERROR;);}}var Bc=class extends Ue{frustumCulled=!1;#e=!1;#t=void 0;#n=void 0;#r=!1;#i=null;#a=0;#o;#s=null;#c=null;#l=null;#u=0;#d=!0;#f=.5;#p=0;#m=0;#h=void 0;#g=void 0;#_=new w(0);#v=!0;#y=void 0;#b=new A;#x=!1;onBeforeRender(e,n,r){let i=Wt.forKey(n);if(i){if(this.#n||=e,!this.#e){if(this.#t=new Zo({renderer:e,sortRadial:!1,accumExtSplats:Rc(e),maxStdDev:2.3}),n.add(this.#t),this.#d&&!function(e){let t=Lc(e);if(!t)return!1;let n=Ic.get(t);if(n!==void 0)return n;let r=zc(t,[t.RGBA16F]);return Ic.set(t,r),r}(e)&&(this.#d=!1),this.#d){let e={format:C,type:Te,colorSpace:T};this.#h?.dispose(),this.#g?.dispose(),this.#h=new Ne(2,2,e),this.#g=new Ne(2,2,e)}this.#e=!0}if(this.#c&&this.#c.parent,this.#l&&this.#l.parent,r.matrixAutoUpdate){let e=r.projectionMatrix.elements,t=2*Math.atan(1/e[5])*(180/Math.PI),n=e[5]/e[0],a=e[10]===1?r.near:e[14]/(e[10]-1),o=e[10]===-1?r.far:e[14]/(e[10]+1),s=new Ht({aspect:n,fov:t,near:a,far:o,matrix:r.matrixWorld.toArray(),scene:i});i.camera=s,s.matrix=r.matrixWorld.toArray(),s.aspect=n,s.fov=t,s.near=a,s.far=o}if(this.#t&&!this.#x){this.#x=!0;let a=this.#t;if(this.#d&&this.#h&&this.#g){let n=new t;e.getDrawingBufferSize(n),n.x=Math.round(n.x*this.#f),n.y=Math.round(n.y*this.#f),n.x==this.#p&&n.y==this.#m||(this.#p=n.x,this.#m=n.y,this.#h.setSize(this.#p,this.#m),this.#g.setSize(this.#p,this.#m))}if(this.#r&&!e.xr.isPresenting){if(this.#d&&this.#h&&this.#g){let e=n.background;n.background=this.#_,a.uniforms.prePassNormals.value=!0,a.target=this.#h,a.backTarget=this.#g,a.renderTarget({scene:n,camera:r}),a.uniforms.normalsTexEnable.value=!0,a.uniforms.normalsTexture.value=a.target.texture,[this.#h,this.#g]=[this.#g,this.#h],a.target=void 0,a.backTarget=void 0,n.background=e,a.uniforms.prePassNormals.value=!1}if(this.#v){if(a.uniforms.reflectionEnable.value=!0,this.#o&&i.miris){let e=i.miris.getWorldTransform(i.client,this.#o);this.#b.fromArray(e)}a.uniforms.reflectionRotation.value=this.#b,this.#y&&a.uniforms.reflectionMapTexture.value!=this.#y&&(a.uniforms.reflectionMapTexture.value=this.#y),a.uniforms.reflectionDebugMode.value=this.#u}}else a.uniforms.prePassNormals.value=!1,a.uniforms.normalsTexEnable.value=!1,a.uniforms.reflectionEnable.value=!1;this.#x=!1}}}reset(){this.#r=!1,this.#i=null,this.#a=0,this.#o=void 0,this.#s?.dispose(),this.#s=null,this.#y=void 0,this.#b.identity(),this.#c?.removeFromParent(),this.#c=null,this.#l?.removeFromParent(),this.#l=null}get sparkRenderer(){return this.#t}get renderer(){return this.#n}get reflectionDebugMode(){return this.#u}set reflectionDebugMode(e){this.#u=e}onReflMeshReceived(e,t){new Ls().parse(e,``,e=>{this.#c?.removeFromParent(),this.#c=e.scene},e=>{console.error(`Failed to parse reflMesh GLB:`,e)})}onGlassMeshReceived(e,t){new Ls().parse(e,``,e=>{this.#l?.removeFromParent(),this.#l=e.scene},e=>{console.error(`Failed to parse glassMesh GLB:`,e)})}onDrMapReceived(e,t,n){e==null?this.reset():(this.#i=e,this.#a=t,this.#o=n,this._generateCubeMapFromDrMap(),this.#r=!0)}async _generateCubeMapFromDrMap(){if(this.#s?.dispose(),this.#s=null,this.#y=void 0,this.#i){let e=this.#n,t;if(this.#a===2){let e=new Pc;e.setDataType(ve);let n=e.parse(this.#i.buffer);t=new Le(this._blurHDRData(n.data,n.width,n.height,1),n.width,n.height,C,ve),t.colorSpace=T,t.needsUpdate=!0}else{let e=new Blob([this.#i.buffer],{type:`image/png`}),n=await createImageBitmap(e);t=new ce(n),t.colorSpace=we,n.close()}this.#s=new mt(256),this.#s.fromEquirectangularTexture(e,t),t.dispose(),this.#y=this.#s.texture}}_blurHDRData(e,t,n,r){let i=Math.ceil(3*r),a=2*i+1,o=new Float32Array(a),s=0;for(let e=0;e<a;e++){let t=e-i;o[e]=Math.exp(-t*t/(2*r*r)),s+=o[e]}for(let e=0;e<a;e++)o[e]=o[e]/s;let c=new Float32Array(e.length);for(let r=0;r<n;r++)for(let n=0;n<t;n++){let s=0,l=0,u=0;for(let c=0;c<a;c++){let a=4*(r*t+((n+c-i)%t+t)%t),d=o[c];s+=e[a]*d,l+=e[a+1]*d,u+=e[a+2]*d}let d=4*(r*t+n);c[d]=s,c[d+1]=l,c[d+2]=u,c[d+3]=e[d+3]}let l=new Float32Array(e.length);for(let e=0;e<n;e++)for(let r=0;r<t;r++){let s=0,u=0,d=0;for(let l=0;l<a;l++){let a=4*(Math.max(0,Math.min(n-1,e+l-i))*t+r),f=o[l];s+=c[a]*f,u+=c[a+1]*f,d+=c[a+2]*f}let f=4*(e*t+r);l[f]=s,l[f+1]=u,l[f+2]=d,l[f+3]=c[f+3]}return l}},Vc=class extends Ue{frustumCulled=!1;#e=!1;#t=new t;mirisStreamObject=void 0;renderTarget=null;renderer=null;cameraNear=.1;cameraFar=1e3;stateXrEnabled=!1;stateAutoClearColor=!1;stateAutoClearDepth=!1;stateRenderTarget=null;stateViewport=new j;xrRenderResolution=2048;onBeforeRender(e,t,n){let r=Wt.forKey(t);if(!r)return;if(this._saveState(e,n),!this.#e){this.renderer=e,e.xr.isPresenting||(e.autoClearColor=!1,e.autoClearDepth=!1),e.info.autoReset=!1;let t={format:C,type:Te,colorSpace:T,minFilter:x,magFilter:x,depthBuffer:!0};this.renderTarget=new Ne(2,2,t),this.renderTarget.depthTexture=new je(2,2),this.renderTarget.depthTexture.format=ut,this.renderTarget.depthTexture.type=D,this.#e=!0}if((!e.xr.isPresenting||e.xr.isPresenting&&n.layers.isEnabled(1))&&e.info.reset(),this._checkResizeRenderBuffers(e),(!e.xr.isPresenting||n.layers.isEnabled(1))&&n.matrixAutoUpdate){let e,t;if(n instanceof S)e=n.aspect,t=n.fov;else{if(!(n instanceof f))return;e=(n.right-n.left)/(n.top-n.bottom),t=0}let{near:i,far:a}=n,o=new Ht({aspect:e,fov:t,near:i,far:a,matrix:n.matrixWorld.toArray(),scene:r});r.camera=o,o.matrix=n.matrixWorld.toArray(),o.aspect=e,o.fov=t,o.near=i,o.far=a}let{near:i,far:a}=n;this.cameraNear=i,this.cameraFar=a,e.setClearColor(new w().setRGB(0,0,0)),e.setClearAlpha(0),e.xr.enabled=!1,e.setRenderTarget(this.renderTarget),e.clearColor(),e.clearDepth()}_checkResizeRenderBuffers(e){let n=new t;e.getDrawingBufferSize(n),e.xr.isPresenting&&n.set(this.xrRenderResolution,this.xrRenderResolution),n.set(n.x,1*n.y),n.equals(this.#t)||(this.#t=n,this.renderTarget?.setSize(n.x,n.y))}_saveState(e,t){this.stateXrEnabled=e.xr.enabled,this.stateAutoClearColor=e.autoClearColor,this.stateAutoClearDepth=e.autoClearDepth,this.stateRenderTarget=e.getRenderTarget();let n=t.viewport;this.stateViewport.set(n?.x,n?.y,n?.z,n?.w)}},Hc=new WeakMap,Uc=class extends ee{constructor(e){super(e),this.decoderPath=``,this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL=``,this.defaultAttributeIDs={position:`POSITION`,normal:`NORMAL`,color:`COLOR`,uv:`TEX_COORD`},this.defaultAttributeTypes={position:`Float32Array`,normal:`Float32Array`,color:`Float32Array`,uv:`Float32Array`}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,r){let i=new g(this.manager);i.setPath(this.path),i.setResponseType(`arraybuffer`),i.setRequestHeader(this.requestHeader),i.setWithCredentials(this.withCredentials),i.load(e,e=>{this.parse(e,t,r)},n,r)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,we,n).catch(n)}decodeDracoFile(e,t,n,r,i=T,a=()=>{}){let o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:r||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:i};return this.decodeGeometry(e,o).then(t).catch(a)}decodeGeometry(e,t){let n=JSON.stringify(t);if(Hc.has(e)){let t=Hc.get(e);if(t.key===n)return t.promise;if(e.byteLength===0)throw Error(`THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.`)}let r,i=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(i,a).then(n=>(r=n,new Promise((n,a)=>{r._callbacks[i]={resolve:n,reject:a},r.postMessage({type:`decode`,id:i,taskConfig:t,buffer:e},[e])}))).then(e=>this._createGeometry(e.geometry));return o.catch(()=>!0).then(()=>{r&&i&&this._releaseTask(r,i)}),Hc.set(e,{key:n,promise:o}),o}_createGeometry(e){let t=new We;e.index&&t.setIndex(new a(e.index.array,1));for(let n=0;n<e.attributes.length;n++){let{name:r,array:i,itemSize:o,stride:s,vertexColorSpace:c}=e.attributes[n],l;l=o===s?new a(i,o):new tt(new Fe(i,s),o,0),r===`color`&&(this._assignVertexColorSpace(l,c),l.normalized=i instanceof Float32Array==0),t.setAttribute(r,l)}return t}_assignVertexColorSpace(e,t){if(t!==`srgb`)return;let n=new w;for(let t=0,r=e.count;t<r;t++)n.fromBufferAttribute(e,t),_.colorSpaceToWorking(n,we),e.setXYZ(t,n.r,n.g,n.b)}_loadLibrary(e,t){let n=new g(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((t,r)=>{n.load(e,t,void 0,r)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!=`object`||this.decoderConfig.type===`js`,t=[];return e?t.push(this._loadLibrary(`draco_decoder.js`,`text`)):(t.push(this._loadLibrary(`draco_wasm_wrapper.js`,`text`)),t.push(this._loadLibrary(`draco_decoder.wasm`,`arraybuffer`))),this.decoderPending=Promise.all(t).then(t=>{let n=t[0];e||(this.decoderConfig.wasmBinary=t[1]);let r=Wc.toString(),i=[`/* draco decoder */`,n,``,`/* worker */`,r.substring(r.indexOf(`{`)+1,r.lastIndexOf(`}`))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([i]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let e=new Worker(this.workerSourceURL);e._callbacks={},e._taskCosts={},e._taskLoad=0,e.postMessage({type:`init`,decoderConfig:this.decoderConfig}),e.onmessage=function(t){let n=t.data;switch(n.type){case`decode`:e._callbacks[n.id].resolve(n);break;case`error`:e._callbacks[n.id].reject(n);break;default:console.error(`THREE.DRACOLoader: Unexpected message, "`+n.type+`"`)}},this.workerPool.push(e)}else this.workerPool.sort(function(e,t){return e._taskLoad>t._taskLoad?-1:1});let n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log(`Task load: `,this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==``&&URL.revokeObjectURL(this.workerSourceURL),this}};function Wc(){let e,t;function n(e,t,n,r,i,a){let o=n.num_points(),s=a.num_components(),c=function(e,t){switch(t){case Float32Array:return e.DT_FLOAT32;case Int8Array:return e.DT_INT8;case Int16Array:return e.DT_INT16;case Int32Array:return e.DT_INT32;case Uint8Array:return e.DT_UINT8;case Uint16Array:return e.DT_UINT16;case Uint32Array:return e.DT_UINT32}}(e,i),l=s*i.BYTES_PER_ELEMENT,u=4*Math.ceil(l/4),d=u/i.BYTES_PER_ELEMENT,f=o*l,p=o*u,m=e._malloc(f);t.GetAttributeDataArrayForAllPoints(n,a,c,f,m);let h=new i(e.HEAPF32.buffer,m,f/i.BYTES_PER_ELEMENT),g;if(l===u)g=h.slice();else{g=new i(p/i.BYTES_PER_ELEMENT);let e=0;for(let t=0,n=h.length;t<n;t++){for(let n=0;n<s;n++)g[e+n]=h[t*s+n];e+=d}}return e._free(m),{name:r,count:o,itemSize:s,array:g,stride:d}}onmessage=function(r){let i=r.data;switch(i.type){case`init`:e=i.decoderConfig,t=new Promise(function(t){e.onModuleLoaded=function(e){t({draco:e})},DracoDecoderModule(e)});break;case`decode`:let r=i.buffer,a=i.taskConfig;t.then(e=>{let t=e.draco,o=new t.Decoder;try{let e=function(e,t,r,i){let a=i.attributeIDs,o=i.attributeTypes,s,c,l=t.GetEncodedGeometryType(r);if(l===e.TRIANGULAR_MESH)s=new e.Mesh,c=t.DecodeArrayToMesh(r,r.byteLength,s);else{if(l!==e.POINT_CLOUD)throw Error(`THREE.DRACOLoader: Unexpected geometry type.`);s=new e.PointCloud,c=t.DecodeArrayToPointCloud(r,r.byteLength,s)}if(!c.ok()||s.ptr===0)throw Error(`THREE.DRACOLoader: Decoding failed: `+c.error_msg());let u={index:null,attributes:[]};for(let r in a){let c=self[o[r]],l,d;if(i.useUniqueIDs)d=a[r],l=t.GetAttributeByUniqueId(s,d);else{if(d=t.GetAttributeId(s,e[a[r]]),d===-1)continue;l=t.GetAttribute(s,d)}let f=n(e,t,s,r,c,l);r===`color`&&(f.vertexColorSpace=i.vertexColorSpace),u.attributes.push(f)}return l===e.TRIANGULAR_MESH&&(u.index=function(e,t,n){let r=3*n.num_faces(),i=4*r,a=e._malloc(i);t.GetTrianglesUInt32Array(n,i,a);let o=new Uint32Array(e.HEAPF32.buffer,a,r).slice();return e._free(a),{array:o,itemSize:1}}(e,t,s)),e.destroy(s),u}(t,o,new Int8Array(r),a),s=e.attributes.map(e=>e.array.buffer);e.index&&s.push(e.index.array.buffer),self.postMessage({type:`decode`,id:i.id,geometry:e},s)}catch(e){console.error(e),self.postMessage({type:`error`,id:i.id,error:e.message})}finally{t.destroy(o)}})}}}var Gc=null;function Kc(){return Gc||(Gc=new Uc,Gc.setDecoderPath(`https://www.gstatic.com/draco/versioned/decoders/1.5.6/`)),Gc}var qc=class extends Ue{frustumCulled=!1;#e=new Ls;#t=0;#n=0;#r=void 0;get sparkRenderer(){return this.#r}#i=void 0;#a=void 0;renderingHook=void 0;#o=null;#s=null;#c=!1;#l=!1;#u=new t;#d=1;#f=1;#p=!1;#m=!1;#h=!1;#g=!1;#_=!0;#v=new t(.45,.45);#y=.03;#b=.15;#x=.0066;#S=new j;#C=new j;#w=!1;#T=4;#E=1024;useCanvasPassthrough=!1;#D=void 0;#O=new A;#k=null;#A=0;#j;#M=null;#N=new A;#P=1;#F=31;#I=30;#L=void 0;#R=null;#z=void 0;#B=null;#V=null;#H=null;#U=`
      out vec3 vNormal;
      out float vFacing;
      out vec3 vView;
      out vec3 vNdc;

      void main() {
        vNormal = normalize((modelViewMatrix * vec4(normal, 0)).xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        vFacing = dot(normalize(normal), normalize(position));
        vView = (inverse(projectionMatrix) * gl_Position).xyz;
        vNdc = gl_Position.xyz / gl_Position.w;
      }
    `;#W=`
      in vec3 vNormal;
      in vec3 vView;

      out vec4 fragColor;

      uniform int debugMode;

      #include <common>

      void main() {
        if (debugMode == 1) {
          vec3 normal = inverseTransformDirection(vNormal, viewMatrix);
          normal = (normalize(normal) + 1.0) * 0.5;
          fragColor = vec4(normal, 1);
          return;
        }

        vec3 I = normalize(vView.xyz);
        vec3 R = reflect(I, vNormal);
        // transform reflection from view to current
        vec3 reflectCurrent = inverseTransformDirection(R, viewMatrix);
        // possibly do per-asset DR rotation here?
        fragColor = vec4(reflectCurrent.rgb,1);
      }
    `;#G=`
      in vec3 vNormal;
      in vec3 vView;
      in vec3 vNdc;
      in float vFacing;

      out vec4 fragColor;

      uniform float cameraNear;
      uniform float cameraFar;

      uniform float glassAlpha;
      uniform samplerCube tReflectionMap;
      uniform mat4 inverseReflectionRotation;

      uniform sampler2D tCanvasDepth;

      #include <common>

      float readDepthZ( sampler2D depthSampler, vec2 coord ) {
        float fragCoordZ = texture( depthSampler, coord ).x;
        float viewZ = ( cameraNear * cameraFar ) / ( ( cameraFar - cameraNear ) * fragCoordZ - cameraFar );
        return viewZ;
      }

      void main() {
        vec2 screenUv = (vNdc.xy * 0.5) + 0.5;
        float sampleDepthZ = readDepthZ( tCanvasDepth, screenUv );
        if (sampleDepthZ > vView.z) {
            discard;
        }

        vec3 I = normalize(vView.xyz);

        vec3 normalDir = normalize(vNormal);
        if (vFacing < 0.0) {
          normalDir *= -1.0;
        }

        vec3 R = reflect(I, normalDir);
        vec3 reflectCurrent = inverseTransformDirection(R, viewMatrix);

        vec3 reflectDir = reflectCurrent.xyz * -1.0;
        reflectDir = mat3(inverseReflectionRotation) * reflectDir;
        reflectDir = normalize(reflectDir);
        vec4 reflectionTex = texture( tReflectionMap, reflectDir );

        // CHECK
        // potentially need to handle envmap colourspace here
        reflectionTex = sRGBTransferOETF(reflectionTex);

        float glassAlphaResult = glassAlpha;

        if (vFacing < 0.0) {
            // make interior reflections near-black
            vec3 clampedReflection = clamp(reflectionTex.rgb, vec3(0.0), vec3(1.0));
            reflectionTex.rgb = mix(clampedReflection, vec3(0.0), 0.9);
        }

        // apply a simple fresnel effect which increases
        // the glass opacity on grazing angles allowing more
        // of the reflection to be visible
        float fresnelAlpha = smoothstep(0.5, 1.0, dot(I, R)) * 0.65;
        glassAlphaResult = max(glassAlphaResult, fresnelAlpha);

        fragColor = vec4(reflectionTex.rgb, glassAlphaResult);
      }
    `;#K=void 0;#q=void 0;#J=void 0;#Y=`
      out vec2 vUv;
      void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    `;#X=`
      precision highp float;
      precision highp int;

      layout(location = 0) out vec4 pc_FragColor;

      in vec2 vUv;

      uniform float cameraNear;
      uniform float cameraFar;

      uniform sampler2D tCanvasDiffuse;
      uniform sampler2D tCanvasDepth;
      uniform sampler2D tSplatsDiffuse;
      uniform sampler2D tSplatsDiffuseLow;
      uniform sampler2D tSplatsData;
      uniform sampler2D tSplatsDataLow;
      uniform sampler2D tAssetReflect;
      uniform sampler2D tAssetGlass;
      uniform samplerCube tReflectionMap;

      uniform bool useCanvasPassthrough;

      uniform bool useFoveation;
      uniform vec4 foveationViewport;
      uniform float foveationBlendMargin;

      uniform bool useGlass;
      uniform bool useReflection;
      uniform int reflectionMode;
      uniform mat4 inverseReflectionRotation;

      uniform bool useDebug;
      uniform int debugMode;

      #include <common>

      // HueToRgb function matching Unity implementation
      // Taken from https://chilliant.com/rgb2hsv.html
      vec3 HueToRgb(float hue)
      {
          float r = abs(hue * 6.0 - 3.0) - 1.0;
          float g = 2.0 - abs(hue * 6.0 - 2.0);
          float b = 2.0 - abs(hue * 6.0 - 4.0);
          return saturate(vec3(r, g, b));
      }

      float readDepth( sampler2D depthSampler, vec2 coord ) {
          float fragCoordZ = texture( depthSampler, coord ).x;
          float viewZ = ( cameraNear * cameraFar ) / ( ( cameraFar - cameraNear ) * fragCoordZ - cameraFar );
          return ( viewZ + cameraNear ) / ( cameraNear - cameraFar );
      }

      void main() {
          vec4 canvasDiffuse = vec4(0);
          if (!useCanvasPassthrough) {
              canvasDiffuse = texture( tCanvasDiffuse, vUv );
              canvasDiffuse.a = clamp(canvasDiffuse.a, 0.0, 1.0);
          }

          float foveationMask = 1.0;
          if (useFoveation) {
              // generate a blend mask based on foveation viewport
              float foveationMaskX = smoothstep(foveationViewport.x, foveationViewport.x + foveationBlendMargin, vUv.x ) *
                  (1.0 - smoothstep(foveationViewport.z - foveationBlendMargin, foveationViewport.z, vUv.x ));
              float foveationMaskY = smoothstep(foveationViewport.y, foveationViewport.y + foveationBlendMargin, vUv.y ) *
                  (1.0 - smoothstep(foveationViewport.w - foveationBlendMargin, foveationViewport.w, vUv.y ));
              foveationMask = foveationMaskX * foveationMaskY;
          }

          vec4 splatsDiffuse = texture( tSplatsDiffuse, vUv );
          splatsDiffuse.a = clamp(splatsDiffuse.a , 0.0, 1.0);
          splatsDiffuse.rgb /= max(splatsDiffuse.a, 1e-6);
          splatsDiffuse.rgb = max(splatsDiffuse.rgb, vec3(0.0));
          
          bool hasSplatFragment = splatsDiffuse.a > 0.001;

          if (useFoveation) {
              vec4 splatsDiffuseLow = texture( tSplatsDiffuseLow, vUv );
              splatsDiffuseLow.a = clamp(splatsDiffuseLow.a , 0.0, 1.0);
              splatsDiffuseLow.rgb /= max(splatsDiffuseLow.a, 1e-6);
              splatsDiffuseLow.rgb = max(splatsDiffuseLow.rgb, vec3(0.0));

              if (useDebug && debugMode == 8) {
                  // debug tint the foveated area
                  splatsDiffuseLow.b += 0.3;
              }

              splatsDiffuse.rgb = mix(splatsDiffuseLow.rgb, splatsDiffuse.rgb, foveationMask);
              splatsDiffuse.a = mix(splatsDiffuseLow.a, splatsDiffuse.a, foveationMask);
          }

          vec4 splatsData = texture( tSplatsData, vUv );

          float reflectance = clamp(splatsData.x/max(splatsData.a, 1e-6), 0.0, 1.0);
          if (useFoveation) {
              vec4 splatsDataLow = texture( tSplatsDataLow, vUv );
              float reflectanceLow = clamp(splatsDataLow.x/max(splatsDataLow.a, 1e-6), 0.0, 1.0);
              reflectance = max(reflectance, reflectanceLow);
          }

          // float splatsDepthZ = splatsData.y/splatsData.a;

          vec3 reflectionResult = vec3(0);
          vec3 reflectionDir = vec3(0);
          vec3 assetDir = vec3(0);
          float reflectionAlpha = 0.0;

          if (useReflection) {
              vec4 assetReflect = texture( tAssetReflect, vUv );
              assetDir = assetReflect.xyz;

              // correct for coordinate space differences
              vec3 reflectDirCurrent = assetReflect.xyz * -1.0;
              reflectionAlpha = assetReflect.a;

              // correct for asset rotation since we need
              // to lookup the envmap in asset local space
              reflectDirCurrent = mat3(inverseReflectionRotation) * reflectDirCurrent;

              reflectionDir = normalize(reflectDirCurrent);

              vec4 reflectionTex = texture( tReflectionMap, reflectionDir );
              reflectionResult = reflectionTex.rgb;
          }

          if (useDebug && debugMode == 1) {
              // DEBUG flat 25% reflectance
              reflectance = 0.25;
          }

          vec4 splatResult = vec4(0);
          if (reflectionMode == 0) {
              // additive
              splatResult = splatsDiffuse;
              splatResult.rgb += reflectionResult * reflectance;
          } else if(reflectionMode == 1) {
              // energy preserving composite splats reflection
              splatResult = mix(splatsDiffuse, vec4(reflectionResult, splatsDiffuse.a), reflectance);
          }

          // eliminate any negative values in splatResult that
          // can affect the final composite below
          splatResult = max(splatResult, vec4(0));

          // HACK
          // blend in some of the reflection/mesh alpha to darken
          // areas where there _should_ be splats but perhaps aren't
          // this improves the outline edges around glass
          if (!useDebug && useReflection && useGlass) {
            splatResult.a = max(splatResult.a, step(0.001, splatResult.a) * reflectionAlpha * 0.25);
          
            // also try and dim the canvas in the same areas since HDR
            // environments can contribute high values. this can cause
            // an outline :( need to be careful not to make this too
            // dark as it will introduce and outline around the asset
            vec3 clampedCanvasDiffuse = smoothstep(vec3(0), vec3(1), canvasDiffuse.rgb);
            canvasDiffuse.rgb = mix(canvasDiffuse.rgb, clampedCanvasDiffuse*0.85, reflectionAlpha);
          }

          bool applyToneMapping = true;

          // base output result
          pc_FragColor = mix(canvasDiffuse, splatResult, splatResult.a);

          // apply glass 
          vec4 assetGlass = vec4(0);
          if (useGlass) {
            assetGlass = texture( tAssetGlass, vUv );
            assetGlass.a = clamp(assetGlass.a, 0.0, 1.0);  
            if (!useDebug || debugMode == 1 || debugMode == 8) {
              pc_FragColor = mix(pc_FragColor, assetGlass, assetGlass.a);        
            } 
          }

          if (useDebug) {
              if (debugMode == 2) {
                // reflectance value
                pc_FragColor = mix(canvasDiffuse, vec4(vec3(reflectance),1.0), splatResult.a);
                applyToneMapping = false;
              } else if (debugMode == 3) {
                // reflection direction
                pc_FragColor = mix(canvasDiffuse, vec4(reflectionDir,1.0), reflectionAlpha);
                applyToneMapping = false;
              } else if (debugMode == 4) {
                // normals direction
                pc_FragColor = mix(canvasDiffuse, vec4(assetDir,1.0), reflectionAlpha);
                applyToneMapping = false;
              } else if (debugMode == 5) {
                // pure reflection
                pc_FragColor = mix(canvasDiffuse, vec4(reflectionResult,1.0), reflectionAlpha);
              } else if (debugMode == 6) {
                // background
                pc_FragColor = mix(canvasDiffuse, vec4(0,0,0,1), splatResult.a);
              } else if (debugMode == 7) {
                // canvas depth
                float canvasDepth = readDepth( tCanvasDepth, vUv );
                pc_FragColor = hasSplatFragment ? vec4(0.65, 0.0, 0.0, 0.65) : vec4(vec3(canvasDepth),1);
                applyToneMapping = false;
              } else if (debugMode == 9) {
                // overdraw
                // alpha is a count of rendered fragments
                // each one contributes 1/1000th to alpha
                // to bring it into discernable range 
                float hue = splatResult.a * 1.5;
                hue = clamp(hue, 0.0, 0.7);
                // invert so we get red == hot & blue == cold
                hue = 0.7 - hue;
                vec3 rgb = clamp(HueToRgb(hue), vec3(0.0), vec3(1.0));
                float accum = clamp(splatResult.a*100.0, 0.0, 1.0);
                pc_FragColor = hasSplatFragment ? vec4(rgb, accum) : vec4(0,0,0,canvasDiffuse.a);
                applyToneMapping = false;
              } else if (debugMode == 10) {
                canvasDiffuse = mix(canvasDiffuse, vec4(0, 0, 0, 1), reflectionAlpha * 0.5);
                pc_FragColor = mix(canvasDiffuse, assetGlass, assetGlass.a);     
              } 
          }

    #if defined( TONE_MAPPING )
          if (applyToneMapping) {
            // linearise from sRGB
            pc_FragColor = sRGBTransferEOTF(pc_FragColor);

            // ensure non-zero min?
            pc_FragColor.rgb = max(vec3(0.01), pc_FragColor.rgb);

            pc_FragColor.rgb = toneMapping(pc_FragColor.rgb);

            // linear result output as sRGB
            pc_FragColor = sRGBTransferOETF(pc_FragColor);
          }
    #endif
      }
    `;get useDebug(){return this.#w}set useDebug(e){this.#w=e}get debugMode(){return this.#T}set debugMode(e){this.#T=e}set cubeMapSize(e){this.#E=e}constructor(){super(),this.#e.setDRACOLoader(Kc()),this.material=new ke({depthWrite:!1,colorWrite:!1,transparent:!0})}onBeforeRender(e,t,n){if(this.#a||=Wt.forKey(t),this.#p)return;this.#p=!0,this.#i||=e,e.xr.enabled=!1,e.autoClear=!1,!this.#r&&this.renderingHook&&(this.#r=new Zo({renderer:e,sortRadial:!1,accumExtSplats:Rc(e),minSortIntervalMs:30,maxStdDev:2.3}),this.#r.layers.set(this.#F),t.add(this.#r)),!this.#c&&this.renderingHook&&(this._createRenderBuffers(),this._createCompositeScene(),this._createAssetMeshMaterials(),this.#c=!0);let r=t.background;t.background=null;try{if(this._checkResizeRenderBuffers(e),this.#u.x<128||this.#u.y<128)return;this._clearRenderBuffers(e),this._updateAssetXforms(t),this._updateFoveationViewport(n),this._renderAssetMeshReflection(t,n,e),this._renderAssetMeshGlass(t,n,e),this._renderSplats(t,n,e),this._renderComposite(e)}finally{this._restoreState(e),t.background=r,this.#p=!1}}reset(){this.#m=!1,this.#k=null,this.#A=0,this.#j=void 0,this.#M?.dispose(),this.#M=null,this.#D=void 0,this.#O.identity(),this.#h=!1,this.#V&&=(this._disposeMeshHierarchy(this.#V),null),this.#g=!1,this.#H&&=(this._disposeMeshHierarchy(this.#H),null),this._updateCompositeMaterialUniforms()}onDrMapReceived(e,t,n){this.#j=n,e==null?this.reset():(this.#k=e,this.#A=t,this._generateCubeMapFromDrMap(),this.#m=!0,this._updateCompositeMaterialUniforms())}onReflMeshReceived(e,t){let n=++this.#t;this.#V&&=(this._disposeMeshHierarchy(this.#V),null),this.#h=!1,this.#j=t,this.#e.parse(e,``,e=>{n===this.#t?(this._configureMeshes(e.scene,this.#L),this.#V=e.scene,this.#h=!0):this._disposeMeshHierarchy(e.scene)},e=>{console.error(`Failed to parse reflMesh:`,e)})}onGlassMeshReceived(e,t){let n=++this.#n;this.#H&&=(this._disposeMeshHierarchy(this.#H),null),this.#g=!1,this.#j=t,this.#e.parse(e,``,e=>{n===this.#n?(this._configureMeshes(e.scene,this.#z),this.#H=e.scene,this.#g=!0):this._disposeMeshHierarchy(e.scene)},e=>{console.error(`Failed to parse glassMesh:`,e)})}async _generateCubeMapFromDrMap(){if(this.#M?.dispose(),this.#M=null,this.#D=void 0,this.#k){let e=this.renderingHook?.renderer,t;if(this.#A!==2){let n=new Blob([this.#k.buffer],{type:`image/png`}),r=await createImageBitmap(n);try{t=new ce(r),t.colorSpace=we,this.#M=new mt(this.#E),this.#M.fromEquirectangularTexture(e,t),t.dispose()}finally{r.close()}this.#D=this.#M.texture,this._updateCompositeMaterialUniforms();return}{let e=new Pc;e.setDataType(ve);let n=e.parse(this.#k.buffer);t=new Le(this._blurHDRData(n.data,n.width,n.height,1),n.width,n.height,C,ve),t.colorSpace=T,t.needsUpdate=!0}this.#M=new mt(this.#E),this.#M.fromEquirectangularTexture(e,t),t.dispose(),this.#D=this.#M.texture,this._updateCompositeMaterialUniforms()}}_blurHDRData(e,t,n,r){let i=Math.ceil(3*r),a=2*i+1,o=new Float32Array(a),s=0;for(let e=0;e<a;e++){let t=e-i;o[e]=Math.exp(-t*t/(2*r*r)),s+=o[e]}for(let e=0;e<a;e++)o[e]=o[e]/s;let c=new Float32Array(e.length);for(let r=0;r<n;r++)for(let n=0;n<t;n++){let s=0,l=0,u=0;for(let c=0;c<a;c++){let a=4*(r*t+((n+c-i)%t+t)%t),d=o[c];s+=e[a]*d,l+=e[a+1]*d,u+=e[a+2]*d}let d=4*(r*t+n);c[d]=s,c[d+1]=l,c[d+2]=u,c[d+3]=e[d+3]}let l=new Float32Array(e.length);for(let e=0;e<n;e++)for(let r=0;r<t;r++){let s=0,u=0,d=0;for(let l=0;l<a;l++){let a=4*(Math.max(0,Math.min(n-1,e+l-i))*t+r),f=o[l];s+=c[a]*f,u+=c[a+1]*f,d+=c[a+2]*f}let f=4*(e*t+r);l[f]=s,l[f+1]=u,l[f+2]=d,l[f+3]=c[f+3]}return l}_configureMeshes(e,t){let n=[];e.traverse(e=>{let t=e;t.isMesh&&n.push(t)}),n.forEach(e=>{this._disposeMeshMaterials(e.material),e.material=t,e.layers.set(this.#I)}),e.layers.set(this.#I)}_disposeMeshMaterials(e){let t=Array.isArray(e)?e:[e];for(let e of t)e&&e!==this.#L&&e!==this.#z&&e.dispose()}_disposeMeshHierarchy(e){e?.removeFromParent(),e.traverse(e=>{let t=e;if(t.isMesh){let e=t;e.geometry?.dispose(),this._disposeMeshMaterials(e.material)}})}_createRenderBuffers(){this.#o?.dispose(),this.#o=new Ne(2,2,{count:2,minFilter:x,magFilter:x,format:C,type:Te,colorSpace:T,depthBuffer:!1}),this.#s?.dispose(),this.#s=new Ne(2,2,{count:2,minFilter:x,magFilter:x,format:C,type:Te,colorSpace:T,depthBuffer:!1}),this.#R?.dispose(),this.#R=new Ne(2,2,{minFilter:x,magFilter:x,format:C,type:Te,colorSpace:T,depthBuffer:!0}),this.#B?.dispose(),this.#B=new Ne(2,2,{minFilter:x,magFilter:x,format:C,type:Te,colorSpace:T,depthBuffer:!1,resolveDepthBuffer:!1})}_createCompositeScene(){this.#K=new ge,this.#q=new f(-1,1,1,-1,0,1),this.#J=new Ue(new s(2,2),new n({name:`Composite Base Shader`,vertexShader:this.#Y,fragmentShader:this.#X,uniforms:{cameraNear:{value:this.renderingHook?.cameraNear},cameraFar:{value:this.renderingHook?.cameraFar},useGlass:{value:this.#g},useReflection:{value:this.#h},reflectionMode:{value:0},tCanvasDiffuse:{value:this.renderingHook?.renderTarget?.texture},tCanvasDepth:{value:this.renderingHook?.renderTarget?.depthTexture},tSplatsDiffuse:{value:this.#o?.textures[0]},tSplatsDiffuseLow:{value:this.#s?.textures[0]},tSplatsData:{value:this.#o?.textures[1]},tSplatsDataLow:{value:this.#s?.textures[1]},tAssetReflect:{value:this.#R?.texture},tAssetGlass:{value:this.#B?.texture},tReflectionMap:{value:this.#D},inverseReflectionRotation:{value:new A},useFoveation:{value:!1},foveationViewport:{value:new j(0,0,1,1)},foveationBlendMargin:{value:.01},useCanvasPassthrough:{value:this.useCanvasPassthrough},useDebug:{value:!1},debugMode:{value:0}},depthTest:!1,depthWrite:!1,transparent:!0,glslVersion:y})),this.#J.renderOrder=1e7,this.#K.add(this.#J)}_createAssetMeshMaterials(){this.#L=new n({vertexShader:this.#U,fragmentShader:this.#W,uniforms:{debugMode:{value:0}},depthTest:!0,depthWrite:!0,glslVersion:y}),this.#z=new n({vertexShader:this.#U,fragmentShader:this.#G,uniforms:{debugMode:{value:0},cameraNear:{value:this.renderingHook?.cameraNear},cameraFar:{value:this.renderingHook?.cameraFar},glassAlpha:{value:.4},tCanvasDepth:{value:this.renderingHook?.renderTarget?.depthTexture},tReflectionMap:{value:this.#D},inverseReflectionRotation:{value:new A}},depthTest:!0,depthWrite:!1,transparent:!0,blending:2,glslVersion:y})}_checkResizeRenderBuffers(e){if(e.xr.isPresenting&&!e.xr.getCamera().layers.isEnabled(this.#P)||!this.renderingHook)return;let n=new t;e.getDrawingBufferSize(n),e.xr.isPresenting&&n.set(this.renderingHook.xrRenderResolution,this.renderingHook.xrRenderResolution),n.set(n.x*this.#d,n.y*this.#d*1);let r=n.x>=128&&n.y>=128,i=!n.equals(this.#u);r&&i&&(this.#u=n,this.#o?.setSize(n.x,n.y),this.#s?.setSize(Math.max(128,Math.floor(n.x/3)),Math.max(128,Math.floor(n.y/3))),this.#R?.setSize(Math.max(128,n.x*this.#f),Math.max(128,n.y*this.#f)),this.#B?.setSize(Math.max(128,n.x*this.#f),Math.max(128,n.y*this.#f)))}_clearRenderBuffers(e){if(this.#u.x<128||this.#u.y<128)return;let t=e.getContext();t.colorMask(!0,!0,!0,!0),t.depthMask(!0),this.#R&&(e.setRenderTarget(this.#R),e.clear()),this.#B&&(e.setRenderTarget(this.#B),e.clear())}_bindDepthBuffer(e,t){let n=e.getContext();if(!e.properties.has(t))return;let r=e.properties.get(t),i=r.__webglDepthRenderbuffer||r.__webglDepthbuffer;i&&n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,i)}_updateAssetXforms(e){if(!this.#j||!this.#a)return;let t=this.#a.miris.getWorldTransform(this.#a.client,this.#j),n=new A().fromArray(t);this.#N.equals(n)||(this.#O.fromArray(t),this.#O.invert(),this.#N.fromArray(t)),this.#V&&!this.#V.matrix.equals(n)&&(this.#V.matrixAutoUpdate=!1,this.#V.matrix=n),this.#H&&!this.#H.matrix.equals(n)&&(this.#H.matrixAutoUpdate=!1,this.#H.matrix=n)}_renderAssetMeshReflection(e,t,n){if(this.#l||!this.#V||!this.#h||!this.#m)return;let r=t.layers.mask;e.add(this.#V),this.#V.updateMatrixWorld(!0),n.autoClearDepth=!1,this.#L&&(this.#w&&this.#T==4?this.#L.uniforms.debugMode.value=1:this.#L.uniforms.debugMode.value=0),n.setRenderTarget(this.#R),t.layers.set(this.#I),n.render(e,t),t.layers.mask=r,e.remove(this.#V)}_renderAssetMeshGlass(e,t,n){if(this.#l||!this.#H||!this.#V||!this.#g||!this.#m)return;let r=t.layers.mask;e.add(this.#H),this.#H.updateMatrixWorld(!0),n.autoClearDepth=!1,n.setRenderTarget(this.#B),this._bindDepthBuffer(n,this.#R),this.#z&&(this.#z.uniforms.cameraNear.value=this.renderingHook?.cameraNear,this.#z.uniforms.cameraFar.value=this.renderingHook?.cameraFar,this.#z.uniforms.tCanvasDepth.value=this.renderingHook?.renderTarget?.depthTexture,this.#z.uniforms.tReflectionMap.value=this.#D,this.#z.uniforms.inverseReflectionRotation.value=this.#O),t.layers.set(this.#I),n.render(e,t),t.layers.mask=r,e.remove(this.#H)}_renderSplats(e,t,n){if(this.#l||!this.#r||!this.renderingHook||!this.#o)return;let r=t.layers.mask,i=!n.xr.isPresenting||t.layers.isEnabled(1);if(this.#l=!0,n.setRenderTarget(this.#o),n.clear(),t.layers.mask=Ms.renderLayerMask,this.#r.layers.mask=Ms.renderLayerMask,this.#r.material.uniforms.depthTexture.value=this.renderingHook.renderTarget?.depthTexture,this.#w&&this.#T==9?(this.#r.material.uniforms.debugOverdraw.value=!0,this.#r.material.blending=2):(this.#r.material.uniforms.debugOverdraw.value=!1,this.#r.material.blending=1),n.xr.isPresenting?this.#r.material.uniforms.useDepthTest.value=!1:this.#r.material.uniforms.useDepthTest.value=!0,this.#_&&n.xr.isPresenting){let r=new j;n.getScissor(r),this.#o.scissor=this.#C,this.#o.scissorTest=!0,n.setRenderTarget(this.#o),n.render(e,t),this.#o.scissorTest=!1,this.#o.scissor=r,n.setRenderTarget(this.#s),n.clear(),this.#r.ignoreViewChange=!0,n.render(e,t)}else this.#r.ignoreViewChange=!i,n.render(e,t);this.#r.ignoreViewChange=!1,t.layers.mask=r,this.#r.layers.set(this.#F),this.#l=!1}_renderComposite(e){this._updateCompositeMaterialUniforms(),this.renderingHook?.stateRenderTarget?(e.setRenderTarget(this.renderingHook?.stateRenderTarget),e.setViewport(this.renderingHook?.stateViewport)):(e.setRenderTarget(null),e.clear()),e.render(this.#K,this.#q)}_updateCompositeMaterialUniforms(){if(this.#J?.material){let e=this.#J.material;e.uniforms.useCanvasPassthrough.value=this.useCanvasPassthrough,e.uniforms.tCanvasDiffuse.value=this.renderingHook?.renderTarget?.texture,e.uniforms.tReflectionMap.value=this.#D,e.uniforms.tAssetReflect.value=this.#R.texture,e.uniforms.tAssetGlass.value=this.#B.texture,e.uniforms.useGlass.value=this.#g,e.uniforms.useReflection.value=this.#h,e.uniforms.inverseReflectionRotation.value=this.#O,e.uniforms.useDebug.value=this.#w,e.uniforms.debugMode.value=this.#T,e.uniforms.useFoveation.value=this.#_&&this.#i?.xr.isPresenting,e.uniforms.foveationViewport.value=this.#S,e.uniforms.foveationBlendMargin.value=this.#y}}_updateFoveationViewport(e){if(!this.#_||!this.#o||!this.#i)return;let n=this.#v.x/2,r=this.#v.y/2;this.#S.x=.5-n,this.#S.y=.5-r,this.#S.z=.5+n,this.#S.w=.5+r,this.#i.xr.isPresenting&&(e.layers.isEnabled(1)?(this.#S.x+=this.#b,this.#S.z+=this.#b):(this.#S.x-=this.#b,this.#S.z-=this.#b),this.#S.y+=this.#x,this.#S.w+=this.#x);let i=new t(this.#o.width,this.#o.height);this.#C.x=this.#S.x*i.x,this.#C.y=this.#S.y*i.y,this.#C.z=(this.#S.z-this.#S.x)*i.x,this.#C.w=(this.#S.w-this.#S.y)*i.y}_restoreState(e){this.renderingHook&&(e.xr.enabled=this.renderingHook.stateXrEnabled,e.autoClearColor=this.renderingHook.stateAutoClearColor,e.autoClearDepth=this.renderingHook.stateAutoClearDepth,this.renderingHook.stateRenderTarget?(e.setRenderTarget(this.renderingHook.stateRenderTarget),e.setViewport(this.renderingHook.stateViewport)):e.setRenderTarget(null))}_cleanup(){this.#o?.dispose(),this.#o=null,this.#s?.dispose(),this.#s=null,this.#R?.dispose(),this.#R=null,this.#B?.dispose(),this.#B=null,this.#V&&=(this._disposeMeshHierarchy(this.#V),null),this.#H&&=(this._disposeMeshHierarchy(this.#H),null)}},Jc=class e extends it{static viewerKey=``;#e=null;#t=null;#n=null;#r=null;#i=null;#a=null;#o=null;#s=3e3;#c=null;#l=null;#u=new A;#d=new E;#f=new k;#p=new k;#m=!1;constructor({uuid:t,viewerKey:n,authToken:r,drmKey:i},...a){super(...a),Object.defineProperty(this,"isStream",{value:!0}),this.addEventListener(`added`,async()=>{let a;this.traverseAncestors(async o=>{if(!(o instanceof ge))return;let s=await Ms.instance(),c=o;a=Wt.forKey(c),a||(a=new Wt({miris:s,viewerKey:n??e.viewerKey}),a.key=c);let l,u,d=!1,f=!1,p=null;c.traverse(e=>{e instanceof Bc?l=e:e instanceof Vc?(f=!0,p=e):e instanceof qc&&(d=!0,u=e,u.reset())}),l||(l=new Bc,c.add(l));let m=new wt({uuid:t,authToken:r,drmKey:i,scene:a});this.#e=m,this.#m&&!l&&(l=new Bc,l.renderOrder=1e6,c.add(l)),this.#m||f||(p=new Vc,p.renderOrder=-1e8,p.layers.set(0),c.add(p)),this.#m||d||(u=new qc,u.renderOrder=100,c.add(u)),u&&p&&(u.renderingHook=p,u.reset());let h=e=>{let{bytes:t,version:n,sceneObjectId:r}=e.detail,i=this.#e;i?a?a.client.isSceneObjectAncestorOf(i.id,r)&&(this.#m?l.onDrMapReceived(t,n,r):u.onDrMapReceived(t,n,r)):console.log(`[junk] core scene is nullish!`):console.log(`[junk] core stream is nullish!`)},g=e=>{let{buffer:t,sceneObjectId:n}=e.detail,r=this.#e;r?a?(console.log(`[junk] reflmeshloaded ancestor check: ancestorId=${r?.id}, descendantId=${n}, result=${r&&a.client.isSceneObjectAncestorOf(r.id,n)}`),a.client.isSceneObjectAncestorOf(r.id,n)&&(this.#m?l.onReflMeshReceived(t,n):u.onReflMeshReceived(t,n))):console.log(`[junk] core scene is nullish!`):console.log(`[junk] core stream is nullish!`)},_=e=>{let{buffer:t,sceneObjectId:n}=e.detail,r=this.#e;r?a?(console.log(`[junk] glassmeshloaded ancestor check: ancestorId=${r?.id}, descendantId=${n}, result=${r&&a.client.isSceneObjectAncestorOf(r.id,n)}`),a.client.isSceneObjectAncestorOf(r.id,n)&&(this.#m?l.onGlassMeshReceived(t,n):u.onGlassMeshReceived(t,n))):console.log(`[junk] core scene is nullish!`):console.log(`[junk] core stream is nullish!`)};this.#r=h,this.#i=g,this.#a=_,this.#n=a,a.addEventListener(`drmaploaded`,h),a.addEventListener(`reflmeshloaded`,g),a.addEventListener(`glassmeshloaded`,_),m.key=this,m.matrix=this.matrixWorld.toArray(),m.addEventListener(`streamloaded`,()=>{this.#E(),this.dispatchEvent({type:`streamloaded`})}),m.addEventListener(`rootloaded`,()=>{this.dispatchEvent({type:`rootloaded`})}),this.#e=m})}),this.addEventListener(`removed`,async()=>{this.#n&&=(this.#r&&this.#n.removeEventListener(`drmaploaded`,this.#r),this.#i&&this.#n.removeEventListener(`reflmeshloaded`,this.#i),this.#a&&this.#n.removeEventListener(`glassmeshloaded`,this.#a),this.#r=null,this.#i=null,this.#a=null,null),this.#e?.end(),this.#e=null,this.#t&&=(this.remove(this.#t),this.#t.geometry.dispose(),this.#t.material.dispose(),null),this.#o&&=(this.#o.removeFromParent(),this.#o.geometry.dispose(),this.#o.material.dispose(),null),this.#c&&=(this.#c.dispose(),null),this.#l&&=(this.#l.removeFromParent(),this.#l.geometry.dispose(),this.#l.material.dispose(),null)})}#h=new Float64Array(16);updateMatrixWorld(...e){super.updateMatrixWorld(...e);let t=this.matrixWorld.elements,n=!1;for(let e=0;e<16;e++)if(Math.abs(t[e]-this.#h[e])>1e-7){n=!0;break}n&&(this.#h.set(t),this.#e&&(this.#e.matrix=this.matrixWorld.toArray()))}#g(){if(this.#c)return;let e=new Je(new fe(1,1,1)),t=new Oe;t.index=e.index,t.attributes.position=e.attributes.position;let n=16*this.#s,r=3*this.#s,i=new He(new Float32Array(n),16),a=new He(new Float32Array(r),3);t.setAttribute(`instanceMatrix`,i),t.setAttribute(`instanceColor`,a),t.attributes.instanceMatrix.setUsage(u),t.attributes.instanceColor.setUsage(u);let o=new Ge;o.onBeforeCompile=e=>{e.vertexShader=`
    attribute mat4 instanceMatrix;
    attribute vec3 instanceColor;
    varying vec3 vInstanceColor;
  `+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`
      vec3 transformed = (instanceMatrix * vec4(position, 1.0)).xyz;
      vInstanceColor = instanceColor;
    `),e.fragmentShader=`
    varying vec3 vInstanceColor;
  `+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`vec4 diffuseColor = vec4( diffuse, opacity );`,`vec4 diffuseColor = vec4( vInstanceColor, opacity );`)},t.instanceCount=0,this.#c=t,this.#o=new b(this.#c,o),this.#o.frustumCulled=!1,this.#o.visible=!1,this.parent.add(this.#o)}_clearBoxes(){if(!this.#c)return;let e=this.#c?.attributes.instanceMatrix;e.array.fill(0),e.needsUpdate=!0}#_=()=>this.children===null||this.children.length===0?[]:this.children[0].children;#v(e){let t=e=>Math.max(0,Math.min(e,1)),n=Math.abs(6*e-3)-1,r=2-Math.abs(6*e-2),i=2-Math.abs(6*e-4);return new w(t(n),t(r),t(i))}#y(e){let t=0;return t=(e-0)/5,this.#v(1-t)}#b(e,t,n,r){let i=this.#c.attributes.instanceMatrix;this.#u.compose(t,this.#d,n),this.#u.premultiply(r),this.#u.toArray(i.array,16*e)}#x(e,t){(this.#c?.attributes.instanceColor)?.setXYZ(e,t.r,t.g,t.b)}#S(e,t,n,r){this.#f.set(e[0],e[1],e[2]),this.#p.set(e[3],e[4],e[5]),this.#b(r,this.#f,this.#p,t),this.#x(r,this.#y(n))}_toggleRenderBounds(e=!1){this.#g(),this.#o.visible=e}_toggleStreamBounds(e=!1){e?(this.#C(),this.#l&&(this.#l.visible=!0,this.#w())):this.#l&&(this.#l.visible=!1)}#C(){if(this.#l)return;let e=new Je(new fe(1,1,1)),t=new Ge({color:16777215,linewidth:2});this.#l=new b(e,t),this.#l.frustumCulled=!1,this.#l.visible=!1,this.parent.add(this.#l)}#w(){if(!this.#l||!this.#l.visible)return;let e=this.#e?.boundingBox;e&&(this.#l.position.set(e.center.x,e.center.y,e.center.z),this.#l.scale.set(e.size.x,e.size.y,e.size.z))}_setRenderMode(e){this.children.length!==0&&(this.children[0]._renderMode=e)}_setDepthLimits(e,t){this.children.length!==0&&this.children[0]._setDepthLimits(e,t)}_setSphericalHarmonicsLevel(e){this.children.length!==0&&this.children[0]._setSphericalHarmonicsLevel(e)}#T(){if(!this.#o?.visible||!this.#c)return;let e=this.#_(),t=this.#c,n=Math.min(e.length,this.#s);for(let t=0;t<n;t++){let n=e[t];if(!n)continue;let r=n.coreLod.localBounds,i=n.coreLod.lodIndex;!r||r.length<6||i==null||this.#S(r,n.matrixWorld,i,t)}t.instanceCount=n,t.attributes.instanceMatrix.needsUpdate=!0,t.attributes.instanceColor.needsUpdate=!0}#E(){if(this.#t||!this.#e?.boundingBox)return;let e=new Ue(new fe(1,1,1),new ke({colorWrite:!1,depthWrite:!1}));e.name=`__bounds_sentinel__`,this.#t=e,this.add(e),this.#D()}#D(){if(!this.#t)return;let e=this.#e?.boundingBox;e&&(this.#t.position.set(e.center.x,e.center.y,e.center.z),this.#t.scale.set(e.size.x,e.size.y,e.size.z))}getBounds(){let e=this.#e?.boundingBox;if(!e)return{min:[0,0,0],max:[0,0,0],size:[0,0,0],center:[0,0,0]};let t=new d(new k(e.min.x,e.min.y,e.min.z),new k(e.max.x,e.max.y,e.max.z));return t.applyMatrix4(this.matrix),{min:t.min.toArray(),max:t.max.toArray(),size:t.getSize(new k).toArray(),center:t.getCenter(new k).toArray()}}_update(){this.#T(),this.#w(),this.#D()}_exportVariantHierarchies(){return this.#e?this.#e._exportVariantHierarchies():[]}_setVariantSelection(e){this.#e&&this.#e._setVariantSelection(e)}};export{Ms as Miris,Fs as MirisControls,Bc as MirisDetector,js as MirisLod,qc as MirisRenderingExec,Ns as MirisScene,Jc as MirisStream,Kc as getDracoLoader};