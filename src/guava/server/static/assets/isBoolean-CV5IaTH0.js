import{o as e,t}from"./rolldown-runtime-DAXXjFlN.js";import{t as n}from"./react-BS-zz9yQ.js";import{Bo as r,Ro as i,Wo as a,zo as o}from"./classnames-CLArhFZ2.js";import{t as s}from"./jsx-runtime-Dp4Rg0xp.js";import{Lt as c,Ut as l,sn as u}from"./src-qY5X9guN.js";import{Et as d,K as f,St as p,Tt as m}from"./src-BsvRhJfd.js";import{Zt as h}from"./src-slfIOhsL.js";import{A as g,C as _,E as v,H as y,I as b,K as x,N as S,O as C,T as w,V as T,g as E,j as ee,m as te}from"./_baseClone-SBVdFwKw.js";import{l as ne,o as re,s as ie}from"./toInteger-sk2VyaMW.js";var D=e(n()),O=s(),k=e=>Number(e)===e&&e%1!=0,A=u.a`
  color: ${({theme:e})=>e.text.primary};
`,j=({href:e,...t})=>{let n=l(e);return(0,O.jsx)(A,{...t,href:e,target:`_blank`,onClick:n})},M=e=>{let t=c(e);if(t instanceof URL){let e=t.toString();return(0,O.jsx)(j,{title:e,href:e,children:e})}return t},N=(e,t,n)=>e===t?0:e===null?1:t===null?-1:e>t?n?1:-1:n?-1:1,P=(e,t)=>{let n=`2-digit`,r={timeZone:I(t),year:`numeric`,day:n,month:n,hour:n,hour12:!1,minute:n,second:n,fractionalSecondDigits:3};return e%1e3||delete r.fractionalSecondDigits,e%864e5||(delete r.second,delete r.minute,delete r.hour),new Intl.DateTimeFormat(`en-ZA`,r).format(e).replaceAll(`/`,`-`).replace(`, `,` `).replace(`,`,`.`)},F=(()=>{let e=`2-digit`,t=`en-CA`;return(n,r,i)=>{n=I(n);let a={timeZone:n,hour12:!1},o={timeZone:n,hour12:!1},s=new Intl.DateTimeFormat(t,{timeZone:n,year:`numeric`,month:e,day:e});return s.format(r)===s.format(i)?(a={year:`numeric`,month:e,day:e,...a},o={hour:e,minute:e,second:e,fractionalSecondDigits:3,...o}):(a=null,o={year:`numeric`,month:e,day:e,hour:e,minute:e,second:e,fractionalSecondDigits:3,...o}),{common:a?new Intl.DateTimeFormat(t,a):null,diff:new Intl.DateTimeFormat(t,o)}}})(),I=e=>e===`local`?Intl.DateTimeFormat().resolvedOptions().timeZone:e||`UTC`;u.div`
  padding: 1em;
  box-sizing: border-box;
  background-color: ${({theme:e})=>e.background.body};
`,u.div`
  height: ${({height:e})=>typeof e==`number`?e+`px`:e};
  background-color: ${({opaque:e,theme:t})=>e?t.background.body:void 0};
`;var L=u.div`
  box-sizing: border-box;
  border-radius: 3px;
  background-color: ${({theme:e})=>e.background.level3};
  color: ${({theme:e})=>e.text.secondary};
  border: 1px solid ${({theme:e})=>e.primary.plainBorder};
  box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.43);
  border-radius: 2px;
  padding: 0.5rem;
  line-height: 1rem;
  margin-top: 2.5rem;
  font-weight: bold;
  width: auto;
  z-index: 802;
`,R=u.div`
  color: ${({theme:e})=>e.text.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  cursor: ${({$isTooltipLocked:e})=>e?`grab`:`default`};
`,z=p(u.div`
  background-color: ${({theme:e})=>e.background.level2};
  border: 1px solid ${({theme:e})=>e.primary.plainBorder};
  border-radius: 2px;
  box-shadow: 0 2px 20px ${({theme:e})=>e.custom.shadow};
  box-sizing: border-box;
  margin-top: 0.6rem;
  position: absolute;
  width: auto;
  z-index: 801;
  font-size: 14px;
  padding: 0 0.5rem 0 0.5rem;
  min-width: 14rem;
`);u.div`
  margin: 0 -0.5rem;
  padding: 0 0.5rem;
  border-bottom: 1px solid ${({theme:e})=>e.background.level1};
  font-size: 1rem;
  line-height: 2;
  font-weight: bold;
`;var B=p(u.div`
  display: flex;
  font-weight: bold;
  cursor: pointer;
  justify-content: space-between;
  margin: 0.5rem -0.5rem;
  height: 2rem;

  & > div {
    display: flex;
    flex-direction: column;
    align-content: center;
    cursor: inherit;
    flex-grow: 1;
    flex-basis: 0;
    text-align: center;
    overflow: hidden;
  }
`),V=p(u.div``),ae=({active:e,options:t,color:n})=>{let r=f(),[i,a]=(0,D.useState)(t.map(()=>!1)),o=d(t.length,t.map((t,a)=>({backgroundColor:t.text===e?n||r.primary.plainColor:i[a]?r.background.body:r.background.level2,color:i?r.text.primary:r.text.secondary}))),[s,c]=m(()=>({background:r.background.level1}));return(0,O.jsx)(B,{style:s,onMouseEnter:()=>c({background:r.background.body}),onMouseLeave:()=>c({background:r.background.level1}),children:t.map(({text:t,title:n,onClick:s},c)=>(0,O.jsx)(V,{onClick:s,title:n,style:{...o[c],cursor:t===e?`default`:`pointer`,color:r.text.primary},onMouseEnter:()=>a(i.map((e,t)=>t===c||e)),onMouseLeave:()=>a(i.map((e,t)=>t!==c&&e)),children:t},c))})},H=p(u.div`
  cursor: ${({disabled:e})=>e?`not-allowed`:`pointer`};
  margin-left: 0;
  margin-right: 0;
  padding: 2.5px 0.5rem;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  margin-top: 3px;
`),U=p(u.div`
  padding-right: 0.25rem;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  color: inherit;
  line-height: 1.7;
  & > span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`),W=({style:e,children:t})=>(0,O.jsx)(U,{style:e,children:(0,O.jsx)(`span`,{children:t})}),G=({onClick:e,text:t,children:n=null,style:r={},color:i=null,title:a=null,disabled:o=!1})=>{let s=f(),[c,l]=(0,D.useState)(!1);i??=s.primary.plainColor;let u=m({backgroundColor:o?s.background.paper:c?i:s.background.body,color:o?s.text.secondary:c?s.text.buttonHighlight:s.text.secondary,config:{duration:150}});return(0,O.jsxs)(H,{style:{...u,userSelect:`none`,...r},onClick:o?void 0:e,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),title:a??(typeof t==`string`?t:``),"data-cy":`button-${a??t}`,disabled:o,children:[(0,O.jsx)(W,{style:{fontWeight:`bold`,width:`100%`},children:t},`button`),n]})},K=u.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
  align-items: center;
  user-select: text;

  & > span {
    user-select: text;
  }

  & > span:first-child {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 6px;
  }

  & span {
    margin-right: 6px;
  }
`,q=t(((e,t)=>{function n(e,t){var n=e.length;for(e.sort(t);n--;)e[n]=e[n].value;return e}t.exports=n})),J=t(((e,t)=>{var n=i();function r(e,t){if(e!==t){var r=e!==void 0,i=e===null,a=e===e,o=n(e),s=t!==void 0,c=t===null,l=t===t,u=n(t);if(!c&&!u&&!o&&e>t||o&&s&&l&&!c&&!u||i&&s&&l||!r&&l||!a)return 1;if(!i&&!o&&!u&&e<t||u&&r&&a&&!i&&!o||c&&r&&a||!s&&a||!l)return-1}return 0}t.exports=r})),oe=t(((e,t)=>{var n=J();function r(e,t,r){for(var i=-1,a=e.criteria,o=t.criteria,s=a.length,c=r.length;++i<s;){var l=n(a[i],o[i]);if(l)return i>=c?l:l*(r[i]==`desc`?-1:1)}return e.index-t.index}t.exports=r})),se=t(((e,t)=>{var n=ee(),r=E(),i=te(),a=h(),o=q(),s=T(),c=oe(),l=S(),u=x();function d(e,t,d){t=t.length?n(t,function(e){return u(e)?function(t){return r(t,e.length===1?e[0]:e)}:e}):[l];var f=-1;return t=n(t,s(i)),o(a(e,function(e,r,i){return{criteria:n(t,function(t){return t(e)}),index:++f,value:e}}),function(e,t){return c(e,t,d)})}t.exports=d})),Y=t(((e,t)=>{var n=g(),r=b(),i=y(),o=a();function s(e,t,a){if(!o(a))return!1;var s=typeof t;return(s==`number`?r(a)&&i(t,a.length):s==`string`&&t in a)?n(a[t],e):!1}t.exports=s})),ce=t(((e,t)=>{var n=ne(),r=se(),i=ie(),a=Y();t.exports=i(function(e,t){if(e==null)return[];var i=t.length;return i>1&&a(e,t[0],t[1])?t=[]:i>2&&a(t[0],t[1],t[2])&&(t=[t[0]]),r(e,n(t,1),[])})})),X=t(((e,t)=>{function n(e,t,n,r){for(var i=e.length,a=n+(r?1:-1);r?a--:++a<i;)if(t(e[a],a,e))return a;return-1}t.exports=n})),le=t(((e,t)=>{function n(e){return e!==e}t.exports=n})),ue=t(((e,t)=>{function n(e,t,n){for(var r=n-1,i=e.length;++r<i;)if(e[r]===t)return r;return-1}t.exports=n})),Z=t(((e,t)=>{var n=X(),r=le(),i=ue();function a(e,t,a){return t===t?i(e,t,a):n(e,r,a)}t.exports=a})),Q=t(((e,t)=>{var n=Z();function r(e,t){return!!(e!=null&&e.length)&&n(e,t,0)>-1}t.exports=r})),$=t(((e,t)=>{function n(e,t,n){for(var r=-1,i=e==null?0:e.length;++r<i;)if(n(t,e[r]))return!0;return!1}t.exports=n})),de=t(((e,t)=>{var n=_(),r=re(),i=w();t.exports=n&&1/i(new n([,-0]))[1]==1/0?function(e){return new n(e)}:r})),fe=t(((e,t)=>{var n=C(),r=Q(),i=$(),a=v(),o=de(),s=w(),c=200;function l(e,t,l){var u=-1,d=r,f=e.length,p=!0,m=[],h=m;if(l)p=!1,d=i;else if(f>=c){var g=t?null:o(e);if(g)return s(g);p=!1,d=a,h=new n}else h=t?[]:m;outer:for(;++u<f;){var _=e[u],v=t?t(_):_;if(_=l||_!==0?_:0,p&&v===v){for(var y=h.length;y--;)if(h[y]===v)continue outer;t&&h.push(v),m.push(_)}else d(h,v,l)||(h!==m&&h.push(v),m.push(_))}return m}t.exports=l})),pe=t(((e,t)=>{var n=r(),i=o(),a=`[object Boolean]`;function s(e){return e===!0||e===!1||i(e)&&n(e)==a}t.exports=s}));export{N as _,Z as a,M as b,Y as c,R as d,K as f,P as g,j as h,Q as i,G as l,ae as m,fe as n,X as o,z as p,$ as r,ce as s,pe as t,L as u,F as v,k as y};