(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},57:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n(1),s=n.n(a),r=n(27),i=n.n(r),l=(n(35),n(28)),o=n(2),u=(n(36),function(){return Object(c.jsx)("div",{className:"main-layout",children:Object(c.jsx)("h1",{children:"Dataset"})})}),j=n(10),b=["\u7ebf\u7d22\u7ec6\u80de","\u964d\u89e3\u7684\u7ebf\u7d22\u7ec6\u80de","\u6ef4\u866b","\u4e73\u6746\u83cc","\u5ff5\u73e0\u83cc","\u767d\u7ec6\u80de"],d=(n(37),n(9)),h=n.n(d),f=n(12),p=n(13),O=n.n(p),x=function(){var e=Object(f.a)(h.a.mark((function e(t,n,c){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.put("/api/v1/instance/label",{uid:t,file:n,label:c},{headers:{"Content-Type":"application/json"}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n,c){return e.apply(this,arguments)}}(),m=function(){var e=Object(f.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("/api/v1/instance/info");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var e=Object(f.a)(h.a.mark((function e(t,n){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.post("/api/v1/instance/label",{uid:t,file:n},{headers:{"Content-Type":"application/json"}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),g=[],N={top:0,left:0},y=function(){var e=Object(a.useState)(g),t=Object(j.a)(e,2),n=t[0],s=t[1],r=Object(a.useState)(0),i=Object(j.a)(r,2),l=i[0],o=i[1],u=Object(a.useState)(0),d=Object(j.a)(u,2),h=d[0],f=d[1],p=Object(a.useState)(""),O=Object(j.a)(p,2),y=O[0],k=O[1],C=Object(a.useState)(N),w=Object(j.a)(C,2),F=w[0],S=w[1];Object(a.useEffect)((function(){m().then((function(e){var t=e.data;t.success||console.error(t.message),s(t.data),l<n.length&&f(n[l].label)})).catch((function(e){console.error(e)}))}),[]),Object(a.useEffect)((function(){if(0!==n.length){var e=n[l].uid,t=n[l].file,c=parseInt(t.split(".")[0]);if(!isNaN(c))S({top:-86*(4-c/100),left:c%100*86});v(e,t).then((function(e){var t=e.data;t.success||console.error(t.message),l<n.length&&f(t.data.label)})).catch((function(e){console.error(e)}))}}),[n,l]);var I=function(e){return function(t){var n=null===h?0:h;t.target.checked?f(n|1<<e):f(n&~(1<<e))}},B=function(e){return function(t){var c=l+e;!isNaN(c)&&c>=0&&c<n.length&&(f(n[c].label),o(c))}};return Object(c.jsxs)("div",{className:"main-layout",children:[Object(c.jsx)("h1",{children:"Labeling"}),Object(c.jsxs)("div",{className:"instance",children:[Object(c.jsxs)("div",{className:"instance-image",children:[Object(c.jsx)("img",{style:{marginBottom:0},src:n[l]&&"/file/".concat(n[l].image)}),Object(c.jsx)("div",{className:"bbox",style:{top:F.top,left:F.left}})]}),Object(c.jsx)("div",{className:"instance-image",style:{width:"300px"},children:Object(c.jsx)("img",{src:n[l]&&"/file/datasets/".concat(n[l].uid,"/").concat(n[l].file)})}),Object(c.jsxs)("div",{className:"info",children:[Object(c.jsx)("div",{className:"vertical-divider"}),Object(c.jsxs)("div",{className:"instance-properties",children:[Object(c.jsxs)("div",{children:[Object(c.jsx)("h5",{children:"Image Uid:"}),Object(c.jsx)("p",{children:n[l]&&n[l].uid})]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("h5",{children:"Image File:"}),Object(c.jsx)("p",{children:n[l]&&n[l].image})]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("h5",{children:"Patch File:"}),Object(c.jsx)("p",{children:n[l]&&n[l].file})]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("h5",{children:"Label"}),Object(c.jsx)("p",{children:h})]})]})]})]}),Object(c.jsx)("div",{className:"checkboxes",children:b.map((function(e,t){return Object(c.jsxs)("span",{className:"checkbox",children:[Object(c.jsx)("input",{type:"checkbox",name:"category",checked:Boolean((null===h?0:h)&1<<t),onChange:I(t)}),e]})}))}),Object(c.jsx)("button",{id:"submit-button",onClick:function(e){if(!(l>=n.length)){var t=n[l].uid,c=n[l].file;x(t,c,h).then((function(e){var t=e.data;t.success||console.error(t.message)})).catch((function(e){console.error(e)}))}},disabled:null===h,children:"\u4fdd\u5b58"}),Object(c.jsxs)("div",{className:"paginator",children:[Object(c.jsx)("span",{children:Object(c.jsx)("button",{onClick:B(-1),children:"\u276e"})}),Array.from(Array(5).keys()).map((function(e){return e+Math.min(n.length-1-e,Math.max(l-2,0))})).filter((function(e){return e>=0&&e<n.length})).map((function(e,t){return Object(c.jsx)("span",{children:Object(c.jsx)("button",{onClick:(a=e,function(e){!isNaN(a)&&a>=0&&a<n.length&&(f(n[a].label),o(a))}),style:e===l?{color:"blue"}:{},children:e})});var a})),Object(c.jsx)("span",{children:Object(c.jsx)("button",{onClick:B(1),children:"\u276f"})}),Object(c.jsx)("span",{children:Object(c.jsx)("button",{onClick:function(){if(!(l>=n.length)){var e=n[l].uid,t=n[l].file;f(0),x(e,t,0).then((function(e){var t=e.data;t.success||console.error(t.message)})).catch((function(e){console.error(e)}))}},children:"\u786e\u8ba4\u826f\u6027"})}),Object(c.jsx)("span",{}),Object(c.jsx)("span",{children:Object(c.jsx)("button",{onClick:function(e){var t=parseInt(y);!isNaN(t)&&t>=0&&t<n.length&&(f(n[t].label),o(t))},children:"\u8df3\u8f6c"})}),Object(c.jsx)("span",{children:Object(c.jsx)("input",{type:"text",value:y,onChange:function(e){k(e.target.value)}})})]})]})},k=n.p+"static/media/logo.6ce24c58.svg",C=(n(57),function(){return Object(c.jsx)("div",{className:"topbar",children:Object(c.jsx)("img",{src:k})})});var w=function(){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(C,{}),Object(c.jsxs)(l.a,{children:[Object(c.jsx)(o.a,{path:"/dataset",component:u}),Object(c.jsx)(o.a,{path:"/",component:y})]})]})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,64)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),s(e),r(e)}))};i.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(w,{})}),document.getElementById("root")),F()}},[[63,1,2]]]);
//# sourceMappingURL=main.69970538.chunk.js.map