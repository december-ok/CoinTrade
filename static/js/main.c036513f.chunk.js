(this.webpackJsonpcointrade=this.webpackJsonpcointrade||[]).push([[0],{152:function(t,e,n){},163:function(t,e){},165:function(t,e){},176:function(t,e){},178:function(t,e){},205:function(t,e){},207:function(t,e){},208:function(t,e){},21:function(t,e,n){"use strict";n.d(e,"d",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"b",(function(){return s})),n.d(e,"a",(function(){return p}));var a=n(5),r="Client/SET_MENU",c="Client/SET_MARKET",u="Client/SET_CONTENT_WRAP_FADE_OUT",i=function(t){return{type:r,payload:t}},o=function(t){return{type:c,payload:t}},s=function(t){return{type:u,payload:t}},d={market:"KRW-BTC",menu:0,contentWrapFadeOut:!0},p=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case r:return Object(a.a)(Object(a.a)({},t),{},{menu:e.payload});case c:return Object(a.a)(Object(a.a)({},t),{},{market:e.payload});case u:return Object(a.a)(Object(a.a)({},t),{},{contentWrapFadeOut:e.payload});default:return t}}},213:function(t,e){},215:function(t,e){},23:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"e",(function(){return s})),n.d(e,"c",(function(){return d})),n.d(e,"d",(function(){return p})),n.d(e,"a",(function(){return l}));var a=n(5),r="Coin/SET_BASIC_MARKET",c="Coin/SET_SIMPLE_MARKET",u="Coin/SET_DETAIL_MARKET",i="Coin/SET_REAL_MARKET",o=function(t){return{type:r,payload:t}},s=function(t){return{type:c,payload:t}},d=function(t){return{type:u,payload:t}},p=function(t){return{type:i,payload:t}},f=new Map,l=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,e=arguments.length>1?arguments[1]:void 0,n=new Map;switch(t.forEach((function(t,e){n.set(e,t)})),e.type){case r:case c:return e.payload.forEach((function(e){n.set(e.market,Object(a.a)(Object(a.a)({},t.get(e.market)),e))})),n;case u:return n.set(e.payload.code,Object(a.a)(Object(a.a)({},t.get(e.payload.code)),{},{order_book:e.payload})),n;case i:return n.set(e.payload.code,Object(a.a)(Object(a.a)({},t.get(e.payload.code)),e.payload)),n;default:return t}}},234:function(t,e){},246:function(t,e){},249:function(t,e){},34:function(t,e,n){"use strict";n.r(e),n.d(e,"store",(function(){return j}));var a=n(0),r=n.n(a),c=n(54),u=n.n(c),i=(n(152),n(44)),o=n(27),s=n(35),d=n(21),p=n(23),f=Object(o.combineReducers)({Account:s.a,Client:d.a,Coin:p.a}),l=n(20),b=n(146),m=n(4),j=Object(o.createStore)(f,Object(b.composeWithDevTools)());u.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(l.a,{store:j,children:Object(m.jsx)(i.a,{})})}),document.getElementById("root"))},35:function(t,e,n){"use strict";n.d(e,"d",(function(){return p})),n.d(e,"b",(function(){return f})),n.d(e,"e",(function(){return l})),n.d(e,"c",(function(){return b})),n.d(e,"a",(function(){return m}));var a=n(56),r=n(5),c=n(17),u=n.n(c),i=n(44),o="Account/INITIAL_UPDATE",s="Account/BUY_COIN",d="Account/SELL_COIN",p=function(t){return{type:o,payload:t}},f=function(t){return{type:s,payload:t}},l=function(t){return{type:d,payload:t}},b={startValue:1e7,won:1e7,assetsList:[]},m=function(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case o:return n.payload;case s:return t=j(e,n),Object(i.b)(t),t;case d:return t=O(e,n),Object(i.b)(t),t;default:return e}},j=function(t,e){var n=t.assetsList.filter((function(t){return t.market===e.payload.market}))[0],c={market:e.payload.market,averagePrice:n?u()(n.averagePrice).times(n.quantity).plus(u()(e.payload.quantity).times(e.payload.averagePrice)).div(u()(n.quantity).plus(e.payload.quantity)).toNumber():e.payload.averagePrice,quantity:n?u()(e.payload.quantity).plus(n.quantity).toNumber():e.payload.quantity};return Object(r.a)(Object(r.a)({},t),{},{won:u()(t.won).minus(u()(e.payload.averagePrice).times(e.payload.quantity)).toNumber(),assetsList:[].concat(Object(a.a)(t.assetsList.filter((function(t){return t.market!==e.payload.market}))),[c])})},O=function(t,e){var n=t.assetsList.filter((function(t){return t.market===e.payload.market}))[0],c={market:e.payload.market,averagePrice:n.averagePrice,quantity:u()(n.quantity).minus(e.payload.quantity).toNumber()};return Object(r.a)(Object(r.a)({},t),{},{won:u()(t.won).plus(u()(e.payload.sellPrice).times(e.payload.quantity)).toNumber(),assetsList:c.quantity?[].concat(Object(a.a)(t.assetsList.filter((function(t){return t.market!==e.payload.market}))),[c]):Object(a.a)(t.assetsList.filter((function(t){return t.market!==e.payload.market})))})}},44:function(t,e,n){"use strict";n.d(e,"b",(function(){return w}));var a=n(5),r=n(8),c=n.n(r),u=n(19),i=n(85),o=n(0),s=n(20),d=n(21),p=n(4);function f(){var t=Object(s.c)((function(t){return t.Client})),e=Object(s.b)(),n=function(t){e(Object(d.b)(!0)),setTimeout((function(){e(Object(d.d)(t)),e(Object(d.b)(!1))}),250)};return Object(p.jsx)("div",{className:"Navigation",children:Object(p.jsxs)("div",{className:"Menu",children:[Object(p.jsxs)("button",{className:"m-button Home"+(0===t.menu?"":" inActive"),onClick:function(){0!==t.menu&&n(0)},children:[Object(p.jsx)("i",{className:"fas fa-home"}),Object(p.jsx)("p",{children:"Home"})]}),Object(p.jsxs)("button",{className:"m-button Coin"+(1===t.menu?"":" inActive"),onClick:function(){1!==t.menu&&n(1)},children:[Object(p.jsx)("i",{className:"fas fa-chart-line"}),Object(p.jsx)("p",{children:"Coin"})]}),Object(p.jsxs)("button",{className:"m-button Order"+(2===t.menu?"":" inActive"),onClick:function(){2!==t.menu&&n(2)},children:[Object(p.jsx)("i",{className:"fas fa-file-invoice-dollar"}),Object(p.jsx)("p",{children:"Order"})]}),Object(p.jsxs)("button",{className:"m-button About"+(3===t.menu?"":" inActive"),onClick:function(){3!==t.menu&&n(3)},children:[Object(p.jsx)("i",{className:"far fa-smile"}),Object(p.jsx)("p",{children:"About"})]})]})})}var l=n(35),b=n(47),m=n(57),j=n.n(m),O="2ZLdKAbltUtnlA8Y8gdqeofTISAZ6ekD",y=n(59),v=Object(b.a)((function(){return n.e(8).then(n.bind(null,426))})),h=Object(b.a)((function(){return Promise.all([n.e(6),n.e(4)]).then(n.bind(null,429))})),k=Object(b.a)((function(){return n.e(5).then(n.bind(null,428))})),g=Object(b.a)((function(){return n.e(7).then(n.bind(null,427))}));e.a=function(){var t=Object(s.b)(),e=Object(o.useRef)(null),n=Object(o.useState)(!1),a=Object(i.a)(n,2),r=a[0],l=a[1],b=Object(s.c)((function(t){return t.Client}));return Object(o.useEffect)((function(){return Object(u.a)(c.a.mark((function n(){var a,r,u;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(y.g)();case 2:return a=n.sent,r=a.marketList,u=a.marketListString,n.next=7,Object(y.f)(u);case 7:e.current=n.sent,x(t,r),l(!0),t(Object(d.b)(!1));case 11:case"end":return n.stop()}}),n)})))(),function(){e.current&&e.current.close()}}),[t]),Object(p.jsxs)("div",{className:"App",children:[Object(p.jsxs)("div",{className:"ContentWrap"+(b.contentWrapFadeOut?" fadeAway":""),children:[r&&0===b.menu&&Object(p.jsx)(v,{}),r&&1===b.menu&&Object(p.jsx)(h,{}),r&&2===b.menu&&Object(p.jsx)(k,{}),r&&3===b.menu&&Object(p.jsx)(g,{})]}),Object(p.jsx)(f,{})]})};var x=function(t,e){var n,r;try{n=null==(r=localStorage.getItem("userData"))?"":j.a.AES.decrypt(r,O).toString(j.a.enc.Utf8)}catch(u){n=""}if(n){var c=JSON.parse(n);t(Object(l.d)(Object(a.a)(Object(a.a)({},c),{},{assetsList:c.assetsList.filter((function(t){return e.includes(t.market)}))})))}else w(l.c)},w=function(t){localStorage.setItem("userData",function(t){return j.a.AES.encrypt(t,O).toString()}(JSON.stringify(t)))}},59:function(t,e,n){"use strict";n.d(e,"g",(function(){return p})),n.d(e,"f",(function(){return f})),n.d(e,"d",(function(){return l})),n.d(e,"b",(function(){return b})),n.d(e,"c",(function(){return m})),n.d(e,"e",(function(){return j})),n.d(e,"a",(function(){return O}));var a=n(5),r=n(8),c=n.n(r),u=n(19),i=n(58),o=n.n(i),s=n(23),d=n(34),p=function(){var t=Object(u.a)(c.a.mark((function t(){var e,n,a,r,u;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.get("https://api.upbit.com/v1/market/all");case 2:return e=t.sent,n=e.data,a=n.filter((function(t){return t.market.includes("KRW-")})),d.store.dispatch(Object(s.b)(a)),t.next=8,o.a.get("https://api.upbit.com/v1/ticker?markets="+a.map((function(t){return t.market})).join());case 8:return r=t.sent,u=r.data,d.store.dispatch(Object(s.e)(u.map((function(t){return"FALL"===t.change&&(t.change_rate=-t.change_rate,t.change_price=-t.change_price),t})))),t.abrupt("return",{marketListString:a.map((function(t){return'"'.concat(t.market,'"')})).join(),marketList:a.map((function(t){return"".concat(t.market)}))});case 12:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),f=function(){var t=Object(u.a)(c.a.mark((function t(e){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(n=new WebSocket("wss://api.upbit.com/websocket/v1")).onopen=function(){var t='[{"ticket":"test"},{"type":"ticker","codes":['.concat(e,"]}]");n.send(t)},n.onmessage=function(){var t=Object(u.a)(c.a.mark((function t(e){var n,a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Response(e.data).text();case 2:n=t.sent,"FALL"===(a=JSON.parse(n)).change&&(a.change_rate=-a.change_rate,a.change_price=-a.change_price),d.store.dispatch(Object(s.d)(a));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),l=function(){var t=Object(u.a)(c.a.mark((function t(e){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(n=new WebSocket("wss://api.upbit.com/websocket/v1")).onopen=function(){var t='[{"ticket":"test"},{"type":"orderbook","codes":["'.concat(e,'.7"]}]');n.send(t)},n.onmessage=function(){var t=Object(u.a)(c.a.mark((function t(e){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Response(e.data).json();case 2:n=t.sent,d.store.dispatch(Object(s.c)(Object(a.a)(Object(a.a)({},n),{},{orderbook_units:n.orderbook_units.slice(0,7)})));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),b=function(){var t=Object(u.a)(c.a.mark((function t(e,n,a){var r,u,i,s,d=arguments;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=d.length>3&&void 0!==d[3]?d[3]:"",u=["https://api.upbit.com/v1/candles/minutes/1","https://api.upbit.com/v1/candles/minutes/30","https://api.upbit.com/v1/candles/minutes/60","https://api.upbit.com/v1/candles/days","https://api.upbit.com/v1/candles/weeks","https://api.upbit.com/v1/candles/months"],t.next=4,o.a.get(u[n]+"?market=".concat(e,"&count=").concat(a,"&to=").concat(r));case 4:return i=t.sent,s=i.data,t.abrupt("return",s);case 7:case"end":return t.stop()}}),t)})));return function(e,n,a){return t.apply(this,arguments)}}(),m=function(t){return Number(t.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},j=function(t){return Number(t.toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},O=function(t){return Number((100*t).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+"%"}}},[[34,1,2]]]);