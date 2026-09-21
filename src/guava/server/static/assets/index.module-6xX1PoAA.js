import{o as e,t}from"./rolldown-runtime-DAXXjFlN.js";import{t as n}from"./react-BS-zz9yQ.js";import{B as r,Jp as i,M as a,Pl as o,V as s,Zu as c,_ as l,gl as u,qp as d,rm as f,sm as p}from"./classnames-CLArhFZ2.js";import{t as m}from"./jsx-runtime-Dp4Rg0xp.js";import{Jr as h,M as g,N as _,t as v}from"./createSvgIcon-ChM1aSPx.js";import{in as y,on as b,sn as x}from"./src-qY5X9guN.js";import{A as S,B as C,J as w,K as T,Li as E,Ur as D,V as O,Vn as k,Z as A,at as ee,j as te,k as j,l as M,rr as N,rt as P,vt as F,yi as I}from"./src-BsvRhJfd.js";import{On as ne,Xn as L,y as re}from"./src-slfIOhsL.js";import{n as ie}from"./src-CaGSb6aW.js";_();var R=m(),ae=g((0,R.jsx)(`path`,{d:`M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1`}),`DarkMode`);_();var oe=g((0,R.jsx)(`path`,{d:`M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0z`}),`LightMode`),se={dev:`MrAGfUuvQq2FOJIgAgbwgjMQgRNgruRa`,prod:`SjCRPH72QTHlVhFZIT5067V9rhuq80Dl`},z=e(n()),B={argumentDefinitions:[],kind:`Fragment`,metadata:null,name:`NavFragment`,selections:[{args:null,kind:`FragmentSpread`,name:`Analytics`},{args:null,kind:`FragmentSpread`,name:`NavDatasets`}],type:`Query`,abstractKey:null};B.hash=`b4c1e5cfb810c869d7f48d036fc48cad`;var V=(function(){var e=[{defaultValue:null,kind:`LocalArgument`,name:`count`},{defaultValue:null,kind:`LocalArgument`,name:`cursor`},{defaultValue:null,kind:`LocalArgument`,name:`search`}],t=[{kind:`Variable`,name:`after`,variableName:`cursor`},{kind:`Variable`,name:`first`,variableName:`count`},{kind:`Variable`,name:`search`,variableName:`search`}];return{fragment:{argumentDefinitions:e,kind:`Fragment`,metadata:null,name:`DatasetsPaginationQuery`,selections:[{args:null,kind:`FragmentSpread`,name:`NavDatasets`}],type:`Query`,abstractKey:null},kind:`Request`,operation:{argumentDefinitions:e,kind:`Operation`,name:`DatasetsPaginationQuery`,selections:[{alias:null,args:t,concreteType:`DatasetStrConnection`,kind:`LinkedField`,name:`datasets`,plural:!1,selections:[{alias:null,args:null,kind:`ScalarField`,name:`total`,storageKey:null},{alias:null,args:null,concreteType:`DatasetStrEdge`,kind:`LinkedField`,name:`edges`,plural:!0,selections:[{alias:null,args:null,kind:`ScalarField`,name:`cursor`,storageKey:null},{alias:null,args:null,concreteType:`Dataset`,kind:`LinkedField`,name:`node`,plural:!1,selections:[{alias:null,args:null,kind:`ScalarField`,name:`name`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`id`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`__typename`,storageKey:null}],storageKey:null}],storageKey:null},{alias:null,args:null,concreteType:`DatasetStrPageInfo`,kind:`LinkedField`,name:`pageInfo`,plural:!1,selections:[{alias:null,args:null,kind:`ScalarField`,name:`endCursor`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`hasNextPage`,storageKey:null}],storageKey:null}],storageKey:null},{alias:null,args:t,filters:[`search`],handle:`connection`,key:`DatasetsList_query_datasets`,kind:`LinkedHandle`,name:`datasets`}]},params:{cacheID:`51829dc84906da9b415d984d01b4ef24`,id:null,metadata:{},name:`DatasetsPaginationQuery`,operationKind:`query`,text:`query DatasetsPaginationQuery(
  $count: Int
  $cursor: String
  $search: String
) {
  ...NavDatasets
}

fragment NavDatasets on Query {
  datasets(search: $search, first: $count, after: $cursor) {
    total
    edges {
      cursor
      node {
        name
        id
        __typename
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`}}})();V.hash=`c3d4960b5532b1af0f3fe881adf27805`;var H=(function(){var e=[`datasets`];return{argumentDefinitions:[{kind:`RootArgument`,name:`count`},{kind:`RootArgument`,name:`cursor`},{kind:`RootArgument`,name:`search`}],kind:`Fragment`,metadata:{connection:[{count:`count`,cursor:`cursor`,direction:`forward`,path:e}],refetch:{connection:{forward:{count:`count`,cursor:`cursor`},backward:null,path:e},fragmentPathInResult:[],operation:V}},name:`NavDatasets`,selections:[{alias:`datasets`,args:[{kind:`Variable`,name:`search`,variableName:`search`}],concreteType:`DatasetStrConnection`,kind:`LinkedField`,name:`__DatasetsList_query_datasets_connection`,plural:!1,selections:[{alias:null,args:null,kind:`ScalarField`,name:`total`,storageKey:null},{alias:null,args:null,concreteType:`DatasetStrEdge`,kind:`LinkedField`,name:`edges`,plural:!0,selections:[{alias:null,args:null,kind:`ScalarField`,name:`cursor`,storageKey:null},{alias:null,args:null,concreteType:`Dataset`,kind:`LinkedField`,name:`node`,plural:!1,selections:[{alias:null,args:null,kind:`ScalarField`,name:`name`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`__typename`,storageKey:null}],storageKey:null}],storageKey:null},{alias:null,args:null,concreteType:`DatasetStrPageInfo`,kind:`LinkedField`,name:`pageInfo`,plural:!1,selections:[{alias:null,args:null,kind:`ScalarField`,name:`endCursor`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`hasNextPage`,storageKey:null}],storageKey:null}],storageKey:null}],type:`Query`,abstractKey:null}})();H.hash=`c3d4960b5532b1af0f3fe881adf27805`;function U(e,t){t===void 0&&(t=0);var n=(0,z.useRef)(!1),r=(0,z.useRef)(),i=(0,z.useRef)(e),a=(0,z.useCallback)(function(){return n.current},[]),o=(0,z.useCallback)(function(){n.current=!1,r.current&&clearTimeout(r.current),r.current=setTimeout(function(){n.current=!0,i.current()},t)},[t]),s=(0,z.useCallback)(function(){n.current=null,r.current&&clearTimeout(r.current)},[]);return(0,z.useEffect)(function(){i.current=e},[e]),(0,z.useEffect)(function(){return o(),s},[t]),[a,s,o]}function W(e,t,n){t===void 0&&(t=0),n===void 0&&(n=[]);var r=U(e,t),i=r[0],a=r[1],o=r[2];return(0,z.useEffect)(o,n),[i,a]}i();var G=e(d()),K={argumentDefinitions:[],kind:`Fragment`,metadata:null,name:`Analytics`,selections:[{alias:null,args:null,kind:`ScalarField`,name:`context`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`dev`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`doNotTrack`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`uid`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`version`,storageKey:null}],type:`Query`,abstractKey:null};K.hash=`042d0c5e3b5c588fc852e8a26d260126`;var ce=t((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,e.default=function(){var e=[...arguments];if(typeof window<`u`){var t;window.gtag===void 0&&(window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)}),(t=window).gtag.apply(t,e)}}})),le=t((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=o;var t=/^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;function n(e){return e.toString().trim().replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g,function(e,n,r){return n>0&&n+e.length!==r.length&&e.search(t)>-1&&r.charAt(n-2)!==`:`&&(r.charAt(n+e.length)!==`-`||r.charAt(n-1)===`-`)&&r.charAt(n-1).search(/[^\s-]/)<0?e.toLowerCase():e.substr(1).search(/[A-Z]|\../)>-1?e:e.charAt(0).toUpperCase()+e.substr(1)})}function r(e){return typeof e==`string`&&e.indexOf(`@`)!==-1}var i=`REDACTED (Potential Email Address)`;function a(e){return r(e)?(console.warn(`This arg looks like an email address, redacting.`),i):e}function o(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,i=e||``;return t&&(i=n(e)),r&&(i=a(i)),i}})),ue=t((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.GA4=void 0;var t=o(ce()),n=o(le()),r=[`eventCategory`,`eventAction`,`eventLabel`,`eventValue`,`hitType`],i=[`title`,`location`],a=[`page`,`hitType`];function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(e==null)return{};var n=c(e,t),r,i;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)r=a[i],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function c(e,t){if(e==null)return{};var n={},r=Object.keys(e),i,a;for(a=0;a<r.length;a++)i=r[a],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}function l(e){"@babel/helpers - typeof";return l=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},l(e)}function u(e){return p(e)||f(e)||v(e)||d()}function d(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function f(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function p(e){if(Array.isArray(e))return y(e)}function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?m(Object(n),!0).forEach(function(t){T(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function g(e,t){return x(e)||b(e,t)||v(e,t)||_()}function _(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function v(e,t){if(e){if(typeof e==`string`)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`)return Array.from(e);if(n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return y(e,t)}}function y(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function b(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function x(e){if(Array.isArray(e))return e}function S(e,t){if(!(e instanceof t))throw TypeError(`Cannot call a class as a function`)}function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,E(r.key),r)}}function w(e,t,n){return t&&C(e.prototype,t),n&&C(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function T(e,t,n){return t=E(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function E(e){var t=D(e,`string`);return l(t)===`symbol`?t:String(t)}function D(e,t){if(l(e)!==`object`||e===null)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(l(r)!==`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var O=function(){function e(){var o=this;S(this,e),T(this,`reset`,function(){o.isInitialized=!1,o._testMode=!1,o._currentMeasurementId,o._hasLoadedGA=!1,o._isQueuing=!1,o._queueGtag=[]}),T(this,`_gtag`,function(){var e=[...arguments];o._testMode||o._isQueuing?o._queueGtag.push(e):t.default.apply(void 0,e)}),T(this,`_loadGA`,function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:`https://www.googletagmanager.com/gtag/js`;if(!(typeof window>`u`||typeof document>`u`)&&!o._hasLoadedGA){var r=document.createElement(`script`);r.async=!0,r.src=`${n}?id=${e}`,t&&r.setAttribute(`nonce`,t),document.body.appendChild(r),window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)},o._hasLoadedGA=!0}}),T(this,`_toGtagOptions`,function(e){if(e){var t={cookieUpdate:`cookie_update`,cookieExpires:`cookie_expires`,cookieDomain:`cookie_domain`,cookieFlags:`cookie_flags`,userId:`user_id`,clientId:`client_id`,anonymizeIp:`anonymize_ip`,contentGroup1:`content_group1`,contentGroup2:`content_group2`,contentGroup3:`content_group3`,contentGroup4:`content_group4`,contentGroup5:`content_group5`,allowAdFeatures:`allow_google_signals`,allowAdPersonalizationSignals:`allow_ad_personalization_signals`,nonInteraction:`non_interaction`,page:`page_path`,hitCallback:`event_callback`};return Object.entries(e).reduce(function(e,n){var r=g(n,2),i=r[0],a=r[1];return t[i]?e[t[i]]=a:e[i]=a,e},{})}}),T(this,`initialize`,function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!e)throw Error(`Require GA_MEASUREMENT_ID`);var n=typeof e==`string`?[{trackingId:e}]:e;o._currentMeasurementId=n[0].trackingId;var r=t.gaOptions,i=t.gtagOptions,a=t.nonce,s=t.testMode,c=s!==void 0&&s,l=t.gtagUrl;if(o._testMode=c,c||o._loadGA(o._currentMeasurementId,a,l),o.isInitialized||(o._gtag(`js`,new Date),n.forEach(function(e){var t=h(h(h({},o._toGtagOptions(h(h({},r),e.gaOptions))),i),e.gtagOptions);Object.keys(t).length?o._gtag(`config`,e.trackingId,t):o._gtag(`config`,e.trackingId)})),o.isInitialized=!0,!c){var d=u(o._queueGtag);for(o._queueGtag=[],o._isQueuing=!1;d.length;){var f=d.shift();o._gtag.apply(o,u(f)),f[0]===`get`&&(o._isQueuing=!0)}}}),T(this,`set`,function(e){if(!e){console.warn("`fieldsObject` is required in .set()");return}if(l(e)!==`object`){console.warn("Expected `fieldsObject` arg to be an Object");return}Object.keys(e).length===0&&console.warn("empty `fieldsObject` given to .set()"),o._gaCommand(`set`,e)}),T(this,`_gaCommandSendEvent`,function(e,t,n,r,i){o._gtag(`event`,t,h(h({event_category:e,event_label:n,value:r},i&&{non_interaction:i.nonInteraction}),o._toGtagOptions(i)))}),T(this,`_gaCommandSendEventParameters`,function(){var e=[...arguments];if(typeof e[0]==`string`)o._gaCommandSendEvent.apply(o,u(e.slice(1)));else{var t=e[0],n=t.eventCategory,i=t.eventAction,a=t.eventLabel,c=t.eventValue;t.hitType;var l=s(t,r);o._gaCommandSendEvent(n,i,a,c,l)}}),T(this,`_gaCommandSendTiming`,function(e,t,n,r){o._gtag(`event`,`timing_complete`,{name:t,value:n,event_category:e,event_label:r})}),T(this,`_gaCommandSendPageview`,function(e,t){if(t&&Object.keys(t).length){var n=o._toGtagOptions(t),r=n.title,a=n.location,c=s(n,i);o._gtag(`event`,`page_view`,h(h(h(h({},e&&{page_path:e}),r&&{page_title:r}),a&&{page_location:a}),c))}else e?o._gtag(`event`,`page_view`,{page_path:e}):o._gtag(`event`,`page_view`)}),T(this,`_gaCommandSendPageviewParameters`,function(){var e=[...arguments];if(typeof e[0]==`string`)o._gaCommandSendPageview.apply(o,u(e.slice(1)));else{var t=e[0],n=t.page;t.hitType;var r=s(t,a);o._gaCommandSendPageview(n,r)}}),T(this,`_gaCommandSend`,function(){var e=[...arguments],t=typeof e[0]==`string`?e[0]:e[0].hitType;switch(t){case`event`:o._gaCommandSendEventParameters.apply(o,e);break;case`pageview`:o._gaCommandSendPageviewParameters.apply(o,e);break;case`timing`:o._gaCommandSendTiming.apply(o,u(e.slice(1)));break;case`screenview`:case`transaction`:case`item`:case`social`:case`exception`:console.warn(`Unsupported send command: ${t}`);break;default:console.warn(`Send command doesn't exist: ${t}`)}}),T(this,`_gaCommandSet`,function(){var e=[...arguments];typeof e[0]==`string`&&(e[0]=T({},e[0],e[1])),o._gtag(`set`,o._toGtagOptions(e[0]))}),T(this,`_gaCommand`,function(e){var t=[...arguments].slice(1);switch(e){case`send`:o._gaCommandSend.apply(o,t);break;case`set`:o._gaCommandSet.apply(o,t);break;default:console.warn(`Command doesn't exist: ${e}`)}}),T(this,`ga`,function(){var e=[...arguments];if(typeof e[0]==`string`)o._gaCommand.apply(o,e);else{var t=e[0];o._gtag(`get`,o._currentMeasurementId,`client_id`,function(e){o._isQueuing=!1;var n=o._queueGtag;for(t({get:function(t){return t===`clientId`?e:t===`trackingId`?o._currentMeasurementId:t===`apiVersion`?`1`:void 0}});n.length;){var r=n.shift();o._gtag.apply(o,u(r))}}),o._isQueuing=!0}return o.ga}),T(this,`event`,function(e,t){if(typeof e==`string`)o._gtag(`event`,e,o._toGtagOptions(t));else{var r=e.action,i=e.category,a=e.label,s=e.value,c=e.nonInteraction,l=e.transport;if(!i||!r){console.warn(`args.category AND args.action are required in event()`);return}var u={hitType:`event`,eventCategory:(0,n.default)(i),eventAction:(0,n.default)(r)};a&&(u.eventLabel=(0,n.default)(a)),s!==void 0&&(typeof s==`number`?u.eventValue=s:console.warn("Expected `args.value` arg to be a Number.")),c!==void 0&&(typeof c==`boolean`?u.nonInteraction=c:console.warn("`args.nonInteraction` must be a boolean.")),l!==void 0&&(typeof l==`string`?([`beacon`,`xhr`,`image`].indexOf(l)===-1&&console.warn("`args.transport` must be either one of these values: `beacon`, `xhr` or `image`"),u.transport=l):console.warn("`args.transport` must be a string.")),o._gaCommand(`send`,u)}}),T(this,`send`,function(e){o._gaCommand(`send`,e)}),this.reset()}return w(e,[{key:`gtag`,value:function(){this._gtag.apply(this,arguments)}}]),e}();e.GA4=O,e.default=new O})),de=e(t((e=>{function t(e){"@babel/helpers - typeof";return t=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},t(e)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.ReactGAImplementation=void 0;var n=i(ue());function r(e){if(typeof WeakMap!=`function`)return null;var t=new WeakMap,n=new WeakMap;return(r=function(e){return e?n:t})(e)}function i(e,n){if(!n&&e&&e.__esModule)return e;if(e===null||t(e)!==`object`&&typeof e!=`function`)return{default:e};var i=r(n);if(i&&i.has(e))return i.get(e);var a={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(s!=="default"&&Object.prototype.hasOwnProperty.call(e,s)){var c=o?Object.getOwnPropertyDescriptor(e,s):null;c&&(c.get||c.set)?Object.defineProperty(a,s,c):a[s]=e[s]}return a.default=e,i&&i.set(e,a),a}e.ReactGAImplementation=n.GA4,e.default=n.default}))()),fe={app_ids:{prod:`G-NT3FLN0QHF`,dev:`G-7TMZEFFWB7`},dimensions:{dev:`dimension1`,version:`dimension2`,context:`dimension3`}},q=`fiftyone-do-not-track`;function pe(e){let[t,n]=(0,z.useState)(!1),[r,i]=(0,z.useState)(!1),a=window.localStorage.getItem(q);(0,z.useEffect)(()=>{e||a===`true`||a===`false`?(i(!1),n(!0)):(i(!0),n(!0))},[e,a]);let o=(0,z.useCallback)(()=>{window.localStorage.setItem(q,`true`),i(!1),n(!0)},[]),s=(0,z.useCallback)(()=>{window.localStorage.setItem(q,`false`),i(!1),n(!0)},[]);return{doNotTrack:a===`true`||e,handleDisable:o,handleAllow:s,ready:t,show:r}}function me({callGA:e,info:t}){let[n,r]=ee(),{doNotTrack:i,handleDisable:a,handleAllow:o,ready:c,show:l}=pe(t.doNotTrack);return(0,z.useEffect)(()=>{if(!c)return;let n=se[t.dev?`dev`:`prod`];r({userId:t.uid,userGroup:`fiftyone-oss`,writeKey:n,doNotTrack:i,debug:t.dev}),!i&&e()},[e,i,t,c,r]),l?(0,R.jsxs)(he,{children:[(0,R.jsx)(ge,{}),(0,R.jsx)(L,{container:!0,direction:`column`,alignItems:`center`,sx:{borderTop:e=>`1px solid ${e.palette.divider}`,backgroundColor:`background.paper`},children:(0,R.jsxs)(L,{padding:2,children:[(0,R.jsx)(I,{variant:`h6`,marginBottom:1,children:`Help us improve Guava`}),(0,R.jsx)(I,{marginBottom:1,children:`We use cookies to understand how Guava is used and improve the product. You can help us by allowing anonymous analytics.`}),(0,R.jsxs)(L,{container:!0,gap:2,justifyContent:`end`,direction:`row`,children:[(0,R.jsx)(L,{item:!0,alignContent:`center`,children:(0,R.jsx)(N,{style:{cursor:`pointer`},onClick:a,"data-cy":`btn-disable-cookies`,children:`Disable`})}),(0,R.jsx)(L,{item:!0,children:(0,R.jsx)(s,{variant:`contained`,onClick:o,children:`Allow`})})]})]})})]}):null}function he({children:e}){return(0,R.jsx)(D,{position:`fixed`,bottom:0,width:`100%`,zIndex:51,children:e})}function ge(){let e=P();return(0,z.useEffect)(()=>{e(`analytics-consent-shown`)},[e]),null}var _e=e=>(0,z.useCallback)(()=>{let t=e.dev?`dev`:`prod`;de.default.initialize(fe.app_ids[t],{testMode:!1,gaOptions:{storage:`none`,cookieDomain:`none`,clientId:e.uid,page_location:`omitted`,page_path:`omitted`,version:e.version,context:e.context,checkProtocolTask:null}})},[e]);function ve({fragment:e}){let t=(0,G.useFragment)(K,e),n=_e(t);return window.IS_PLAYWRIGHT?(console.log(`Analytics component is disabled in playwright`),null):(0,R.jsx)(me,{callGA:n,info:t})}var ye=({className:e,value:t})=>(0,R.jsx)(`span`,{className:e,title:t,children:t}),be=({useSearch:e})=>{let t=l(),n=f(c);return(0,R.jsx)(M,{cy:`dataset`,component:ye,placeholder:`Select dataset`,inputStyle:{height:40,maxWidth:300},containerStyle:{position:`relative`},onSelect:async e=>(t(e),e),overflow:!0,useSearch:e,value:n})},xe=e(t((e=>{var t=h();Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=t(v()),r=m();e.default=(0,n.default)((0,r.jsx)(`path`,{d:`m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25z`}),`AutoAwesome`)}))()),J=`fiftyone-enterprise-tooltip-seen`,Y=`fo-cta-enterprise-button`,X=`#333333`,Z=`#FFFFFF`,Se=`#FF6D04`,Ce=`#B681FF`,we=y`
  animation: ${b`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`} 1.5s ease-in-out infinite;
`,Te=x.div`
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
`,Q=()=>(0,R.jsxs)(R.Fragment,{children:[(0,R.jsxs)(`svg`,{width:0,height:0,"aria-label":`Gradient`,"aria-labelledby":`gradient`,children:[(0,R.jsx)(`title`,{children:`Gradient`}),(0,R.jsx)(`defs`,{children:(0,R.jsxs)(`linearGradient`,{id:`gradient1`,x1:`0%`,y1:`0%`,x2:`100%`,y2:`100%`,children:[(0,R.jsx)(`stop`,{offset:`0%`,style:{stopColor:Se,stopOpacity:1}}),(0,R.jsx)(`stop`,{offset:`100%`,style:{stopColor:Ce,stopOpacity:1}})]})})]}),(0,R.jsx)(Te,{className:`fo-teams-cta-pulse-animation`,children:(0,R.jsx)(xe.default,{sx:{fontSize:{xs:16,sm:20},mr:1,fill:`url(#gradient1)`}})})]}),Ee=x.div`
  background-color: ${({$bgColor:e})=>e};
  border-radius: 16px;

  &:hover {
    background-color: transparent;
  }
`,De=x(A)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`,$=x(F)`
  background: linear-gradient(45deg, #ff6d04 0%, #b681ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 6px 12px;
  border-radius: 16px;
  font-weight: 500;
  text-transform: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  font-size: 16px;
  position: relative;
  overflow: hidden;
  border: 1px solid ${({$borderColor:e})=>e};
  outline: none;
  box-shadow: none;

  @media (max-width: 767px) {
    font-size: 14px;
    padding: 4px 10px;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: ${({$isLightMode:e})=>e?`150%`:`100%`};
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(
          255,
          255,
          255,
          ${({$isLightMode:e})=>e?`0.3`:`0.2`}
        )
        50%,
      rgba(255, 255, 255, 0) 100%
    );
    transition: all ${({$isLightMode:e})=>e?`0.8s`:`0.6s`}
      ease;
    z-index: 1;
  }

  &:hover,
  &:focus,
  &:active {
    transform: scale(1.03);
    text-decoration: none;
    border: 1px solid ${({$borderColor:e})=>e} !important;
    outline: none;
    box-shadow: none;

    background: linear-gradient(45deg, #ff6d04 0%, #b681ff 100%) !important;
    background-clip: text !important;
    -webkit-background-clip: text !important;
    text-fill-color: transparent !important;
    -webkit-text-fill-color: transparent !important;

    &:before {
      left: 100%;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(
            255,
            255,
            255,
            ${({$isLightMode:e})=>e?`0.6`:`0.2`}
          )
          50%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    .fo-teams-cta-pulse-animation {
      ${we}
    }
  }
`,Oe=x(D)`
  padding: 16px;
  width: 310px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,ke=x(I)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  margin-bottom: 12px;
`,Ae=x(I)`
  position: relative;
  color: var(--fo-palette-text-secondary);
  font-size: 15px !important;
`,je=x(r)`
  margin-top: 16px;
`;function Me({disablePopover:e=!1}){let[t,n]=(0,z.useState)(!1),{mode:r}=E(),i=T(),a=r===`light`?Z:X;(0,z.useEffect)(()=>{let e=window.localStorage.getItem(J),t=window.IS_PLAYWRIGHT;!e&&!t&&n(!0)},[]);let o=(0,z.useCallback)(()=>{localStorage.setItem(J,`true`)},[]),c=(0,z.useCallback)(()=>{o(),n(!1)},[o]),l=(0,z.useCallback)(()=>{o(),n(!1),window.open(`#`,`_blank`)},[o]);return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(Ee,{$bgColor:r===`light`?`transparent`:a,children:(0,R.jsx)(De,{href:`#`,children:(0,R.jsxs)($,{$borderColor:r===`dark`?X:i.divider,$isLightMode:r===`light`,id:Y,children:[(0,R.jsx)(Q,{}),``]})})}),t&&!e&&(0,R.jsx)(k,{open:!0,anchorEl:document.getElementById(Y),onClose:c,anchorOrigin:{vertical:`bottom`,horizontal:`center`},transformOrigin:{vertical:-12,horizontal:`center`},elevation:3,children:(0,R.jsxs)(Oe,{style:{backgroundColor:r===`light`?Z:X},children:[(0,R.jsxs)(ke,{variant:`h6`,children:[(0,R.jsx)(Q,{}),(0,R.jsx)(I,{variant:`h6`,letterSpacing:.3,children:`Accelerate your workflow`})]}),(0,R.jsx)(Ae,{variant:`body2`,children:`With Guava Enterprise you can connect to your data lake, automate your data curation and model analysis tasks, securely collaborate with your team, and more.`}),(0,R.jsxs)(je,{direction:`row`,spacing:2,children:[(0,R.jsx)(s,{variant:`contained`,onClick:l,size:`large`,sx:{boxShadow:`none`},children:``}),(0,R.jsx)(s,{variant:`outlined`,color:`secondary`,onClick:c,size:`large`,sx:{boxShadow:`none`},children:`Dismiss`})]})]})})]})}var Ne=e=>t=>{let n=f(u),{data:r,refetch:i}=(0,G.usePaginationFragment)(H,e);return W(()=>{i({search:t})},200,[t,n]),(0,z.useMemo)(()=>({total:r.datasets.total===null?void 0:r.datasets.total,values:r.datasets.edges.map(e=>e.node.name)}),[r])},Pe=({children:e,fragment:t,hasDataset:n})=>{let r=(0,G.useFragment)(B,t),i=Ne(r),s=a(),{mode:c,setMode:l}=E(),u=p(o),d=P();return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsxs)(w,{title:`Guava`,onRefresh:s,navChildren:(0,R.jsx)(be,{useSearch:i}),children:[n&&(0,R.jsx)(z.Suspense,{fallback:(0,R.jsx)(`div`,{style:{flex:1}}),children:(0,R.jsx)(ie,{})}),!n&&(0,R.jsx)(`div`,{style:{flex:1}}),(0,R.jsx)(`div`,{style:{padding:`0.5rem`},children:(0,R.jsx)(Me,{})}),(0,R.jsxs)(`div`,{className:C,children:[(0,R.jsx)(O,{title:c===`dark`?`Light mode`:`Dark mode`,onClick:()=>{let e=c===`dark`?`light`:`dark`;l(e),u(e),d(`switch_app_theme`,{theme:e})},sx:{color:e=>e.palette.text.secondary,m:0,p:`0.5rem`},children:c===`dark`?(0,R.jsx)(oe,{color:`inherit`}):(0,R.jsx)(ae,{})}),(0,R.jsx)(j,{}),(0,R.jsx)(te,{}),(0,R.jsx)(S,{}),(0,R.jsx)(D,{ml:1,children:(0,R.jsx)(re,{place:ne.HEADER_ACTIONS})})]})]}),e,(0,R.jsx)(ve,{fragment:r})]})},Fe={page:`_page_8fb7q_1`,rest:`_rest_8fb7q_8`,icons:`_icons_8fb7q_13`};export{Pe as n,Fe as t};