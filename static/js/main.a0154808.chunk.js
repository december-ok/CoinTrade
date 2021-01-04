(this.webpackJsonpcointrade=this.webpackJsonpcointrade||[]).push([[0],{188:function(e,t,c){},498:function(e,t,c){},503:function(e,t,c){},504:function(e,t,c){},505:function(e,t,c){},506:function(e,t,c){},507:function(e,t,c){},602:function(e,t,c){"use strict";c.r(t);var n=c(0),a=c(2),r=c.n(a),s=c(25),i=c.n(s),o=(c(188),c(31)),l=c(4);c(109);function d(e,t){switch(t.type){case"GET_MARKETS":return Object(l.a)(Object(l.a)({},e),{},{marketsLoaded:!1});case"GET_MARKETS_SUC":return Object(l.a)(Object(l.a)({},e),{},{marketsLoaded:!0,markets:t.markets,marketsList:t.markets});case"GET_MARKETS_FAIL":return Object(l.a)(Object(l.a)({},e),{},{marketsLoaded:!1});case"UPDATE_MARKET":return t.realTimeData?Object(l.a)(Object(l.a)({},e),{},{markets:e.markets.map((function(e){return e.market===t.realTimeData.code?Object(l.a)(Object(l.a)(Object(l.a)({},e),t.realTimeData),{},{loaded:!0}):e}))}):e;case"UPDATE_ORDERBOOK":return t.realTimeData?Object(l.a)(Object(l.a)({},e),{},{markets:e.markets.map((function(e){return e.market===t.realTimeData.code?Object(l.a)(Object(l.a)({},e),{},{orderBook:t.realTimeData}):e}))}):e;case"UPDATE_TRADE":return t.realTimeData?Object(l.a)(Object(l.a)({},e),{},{markets:e.markets.map((function(e){return e.market===t.realTimeData.code?Object(l.a)(Object(l.a)({},e),{},{trade:t.realTimeData}):e}))}):e;default:return Object(l.a)(Object(l.a)({},e),{},{markets:"test"})}}var j=r.a.createContext(null),u=r.a.createContext(null),b={marketsLoaded:!1,markets:[],nowLooking:""};function h(e){var t=e.children,c=Object(a.useReducer)(d,b),r=Object(o.a)(c,2),s=r[0],i=r[1];return Object(n.jsx)(j.Provider,{value:s,children:Object(n.jsx)(u.Provider,{value:i,children:t})})}var p=function(){var e=Object(a.useContext)(j);if(!e)throw new Error("State not found");return e},O=function(){var e=Object(a.useContext)(u);if(!e)throw new Error("dispatch not found");return e};function m(e,t){switch(t.type){case"GET_MARKETS":return Object(l.a)(Object(l.a)({},e),{},{marketsLoaded:!1});default:return{}}}var x=r.a.createContext(null),f=r.a.createContext(null),v={money:"10000"};function k(e){var t=e.children,c=Object(a.useReducer)(m,v),r=Object(o.a)(c,2),s=r[0],i=r[1];return Object(n.jsx)(x.Provider,{value:s,children:Object(n.jsx)(f.Provider,{value:i,children:t})})}var N=c(24),g=c(5),E=c(18),_=c.n(E),T=c(40),L=c(73),w=c.n(L),R=function(){var e=Object(T.a)(_.a.mark((function e(){var t,c;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.get("https://api.upbit.com/v1/market/all?isDetails=true");case 2:return t=e.sent,c=t.data.filter((function(e){return e.market.includes("KRW-")})),e.abrupt("return",c.map((function(e){return Object(l.a)(Object(l.a)({},e),{},{loaded:!1})})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(T.a)(_.a.mark((function e(t,c,n,a){var r;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=new WebSocket("wss://api.upbit.com/websocket/v1"),r=c.map((function(e){return'"'.concat(e.market,'"')})),t.onopen=function(){var e='[{"ticket":"test"},{"type":"ticker","codes":['.concat(r,"]}]");t.send(e)},t.onmessage=function(){var e=Object(T.a)(_.a.mark((function e(t){var c,n;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Response(t.data).text();case 2:c=e.sent,"ticker"===(n=JSON.parse(c)).type&&a({type:"UPDATE_MARKET",realTimeData:n});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();case 4:case"end":return e.stop()}}),e)})));return function(t,c,n,a){return e.apply(this,arguments)}}(),A=function(){var e;return{open:function(t,c){try{(e=new WebSocket("wss://api.upbit.com/websocket/v1")).onopen=function(){var c='[{"ticket":"asdlkfjasdljk"},{"type":"trade","codes":["'.concat(t,'"]},{"type":"orderbook","codes":["').concat(t,'"]}]');e.send(c)},e.onmessage=function(){var e=Object(T.a)(_.a.mark((function e(t){var n,a;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Response(t.data).text();case 2:n=e.sent,a=JSON.parse(n),console.log(a),"orderbook"===a.type&&c({type:"UPDATE_ORDERBOOK",realTimeData:a}),"trade"===a.type&&c({type:"UPDATE_TRADE",realTimeData:a});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}catch(n){console.log(n)}},close:function(){e&&e.close()}}}(),D=function(e){return e?e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},S=function(e){return e?(100*e).toFixed(2):""};c(498);var C=function(){return Object(n.jsxs)("div",{className:"nav",children:[Object(n.jsxs)(N.b,{className:"link",to:"/",children:[Object(n.jsx)("i",{className:"fas fa-home"}),Object(n.jsx)("p",{children:"Home"})]}),Object(n.jsxs)(N.b,{className:"link",to:"/order/BTC",children:[Object(n.jsx)("i",{className:"fas fa-file-invoice-dollar"}),Object(n.jsx)("p",{children:"Order"})]}),Object(n.jsxs)(N.b,{className:"link",to:"/chart/BTC",children:[Object(n.jsx)("i",{className:"fas fa-chart-line"}),Object(n.jsx)("p",{children:"Chart"})]}),Object(n.jsxs)(N.b,{className:"link",to:"/about",children:[Object(n.jsx)("i",{className:"far fa-smile-wink"}),Object(n.jsx)("p",{children:"About"})]})]})};c(503),c(504);var P=function(e){var t=e.info,c=Object(a.useRef)(),r=Object(a.useRef)(),s=Object(a.useState)(!0),i=Object(o.a)(s,2),l=i[0],d=i[1];return Object(a.useEffect)((function(){var e,c=r.current,n=(r.current.parentNode,!0);t.code&&(e=t.code.split("-")[1]);var a={x:0,y:0};e&&n&&(n=!1,c.addEventListener("mousedown",(function(e){a={x:e.clientX,y:e.clientY}})),c.addEventListener("mouseup",(function(t){t.clientX===a.x&&t.clientY===a.y&&("https://december-ok.github.io"===window.location.origin?window.location.href=window.location.origin+"/CoinTrade/#/order/".concat(e):window.location.href=window.location.origin+"#/order/".concat(e))})))}),[t.code]),Object(a.useEffect)((function(){l?d(!1):(c.current.classList.add("refreshed"),setTimeout((function(){c.current&&c.current.classList.remove("refreshed")}),1e3))}),[t.trade_price]),t.code&&t.code.split("-")[1],Object(n.jsx)("div",{className:"CoinBlock",ref:r,title:t.code?t.code.split("-")[1]:"",children:Object(n.jsx)("div",{className:"CoinBlock".concat(t.change),ref:c,id:"cb",children:Object(n.jsxs)("div",{className:"content",children:[Object(n.jsx)("img",{className:"coinImg",src:"https://static.upbit.com/logos/".concat(t.market.split("-")[1],".png")}),Object(n.jsx)("span",{className:"koreanName",children:t.korean_name}),Object(n.jsx)("span",{className:"englishName",children:t.market.split("-")[1]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("span",{className:"tradePrice",children:D(t.trade_price)}),Object(n.jsxs)("div",{children:[Object(n.jsxs)("span",{className:"changePrice",children:["RISE"===t.change?"\u25b2":"","FALL"===t.change?"\u25bc":"","EVEN"===t.change?"0":"",D(t.change_price)]}),Object(n.jsxs)("span",{className:"changePercent",children:["RISE"===t.change?"+":"","FALL"===t.change?"-":"",S(t.change_rate),"%"]})]})]})]})})})};var B=function(e){var t=e.sortBy,c=p(),r=Object(a.useRef)();return Object(a.useEffect)((function(){var e=r.current,t=!1,c={x:0,y:0},n=0;e.addEventListener("mousedown",(function(a){t=!0,c={x:a.clientX,y:a.clientY},n=e.scrollLeft})),e.addEventListener("mousemove",(function(a){if(t){var r=a.clientX-c.x;e.scrollLeft=n-r}})),e.addEventListener("mouseleave",(function(e){t=!1})),e.addEventListener("mouseup",(function(e){t=!1}))}),[]),Object(n.jsx)("div",{className:"CoinBlockList",ref:r,children:F(t,c).map((function(e,t){return Object(n.jsx)(P,{info:e},t)}))})},F=function(e,t){return"trade_price"===e?t.markets.sort((function(e,t){return t.acc_trade_price_24h-e.acc_trade_price_24h})).slice(0,7):"RISE"===e?t.markets.sort((function(e,t){var c=e.change_rate,n=t.change_rate;return"FALL"===e.change&&(c=-c),"FALL"===t.change&&(n=-n),n-c})).slice(0,7):"FALL"===e?t.markets.sort((function(e,t){var c=e.change_rate,n=t.change_rate;return"FALL"===e.change&&(c=-c),"FALL"===t.change&&(n=-n),c-n})).slice(0,7):t.markets};c(505);var I=function(){return Object(n.jsxs)("div",{className:"Home",children:[Object(n.jsx)("h1",{children:"Home"}),Object(n.jsx)("div",{className:"Main",children:"Real Time Crypto Currency Exchange"}),Object(n.jsx)("h4",{children:"\uac70\ub798\ub300\uae08 \uc0c1\uc704"}),Object(n.jsx)(B,{sortBy:"trade_price"}),Object(n.jsx)("h4",{children:"\uc0c1\uc2b9\ub960 \uc0c1\uc704"}),Object(n.jsx)(B,{sortBy:"RISE"}),Object(n.jsx)("h4",{children:"\ud558\ub77d\ub960 \uc0c1\uc704"}),Object(n.jsx)(B,{sortBy:"FALL"})]})};c(506);var K=function(e){var t=e.info,c=Object(a.useRef)();return Object(a.useEffect)((function(){})),Object(n.jsx)("div",{className:"CoinDetail",children:Object(n.jsx)("div",{className:"CoinDetail".concat(t.change),ref:c,id:"cd",children:Object(n.jsxs)("div",{className:"content",children:[Object(n.jsxs)("div",{className:"mainContent",children:[Object(n.jsx)("img",{className:"coinImg",src:"https://static.upbit.com/logos/".concat(t.market.split("-")[1],".png")}),Object(n.jsx)("span",{className:"koreanName",children:t.korean_name}),Object(n.jsx)("span",{className:"englishName",children:t.market.split("-")[1]}),Object(n.jsx)("span",{className:"englishFullName",children:t.english_name}),Object(n.jsx)("span",{className:"tradePrice",children:D(t.trade_price)}),Object(n.jsxs)("span",{className:"changePrice",children:["RISE"===t.change?"\u25b2":"","FALL"===t.change?"\u25bc":"","EVEN"===t.change?"0":"",D(t.change_price)]}),Object(n.jsxs)("span",{className:"changePercent",children:["RISE"===t.change?"+":"","FALL"===t.change?"-":"",S(t.change_rate),"%"]})]}),Object(n.jsxs)("div",{className:"detailContent",children:[Object(n.jsx)("span",{className:"detailTitle",children:"OPEN"}),Object(n.jsx)("span",{className:"detailDescription",children:t.opening_price}),Object(n.jsx)("span",{className:"detailTitle",children:"PREV CLOSE"}),Object(n.jsx)("span",{className:"detailDescription",children:t.prev_closing_price}),Object(n.jsx)("span",{className:"detailTitle",children:"HIGH"}),Object(n.jsx)("span",{className:"detailDescription",children:t.high_price}),Object(n.jsx)("span",{className:"detailTitle",children:"LOW"}),Object(n.jsx)("span",{className:"detailDescription",children:t.low_price}),Object(n.jsx)("span",{className:"detailTitle",children:"24H VOLUME(WON)"}),Object(n.jsx)("span",{className:"detailDescription",children:t.acc_trade_price.toFixed(2)}),Object(n.jsx)("span",{className:"detailTitle",children:"24H VOLUME(EA)"}),Object(n.jsx)("span",{className:"detailDescription",children:t.acc_trade_volume.toFixed(2)}),Object(n.jsx)("span",{className:"detailTitle",children:"52 WEEK HIGH"}),Object(n.jsx)("span",{className:"detailDescription",children:t.highest_52_week_price}),Object(n.jsx)("span",{className:"detailTitle",children:"52 WEEK LOW"}),Object(n.jsx)("span",{className:"detailDescription",children:t.lowest_52_week_price})]})]})})})};var M=function(e){var t=e.props,c=t.type,a=t.price,r=t.size;return"bid"===c?Object(n.jsxs)("div",{className:"OrderPriceBlock",id:c,children:[Object(n.jsx)("div",{className:"askSize"}),Object(n.jsx)("div",{className:"price",children:D(a)}),Object(n.jsx)("div",{className:"bidSize",children:r.toFixed(2)})]}):Object(n.jsxs)("div",{className:"OrderPriceBlock",id:c,children:[Object(n.jsx)("div",{className:"askSize",children:r.toFixed(2)}),Object(n.jsx)("div",{className:"price",children:D(a)}),Object(n.jsx)("div",{className:"bidSize"})]})};c(507);var W=function(e){var t=e.info;if(t.orderBook){var c=t.orderBook.orderbook_units.map((function(e){return{type:"bid",price:e.bid_price,size:e.bid_size}})),a=t.orderBook.orderbook_units.map((function(e){return{type:"ask",price:e.ask_price,size:e.ask_size}})).reverse();return Object(n.jsxs)("div",{className:"OrderBook",children:[Object(n.jsxs)("div",{className:"OrderPriceBlockDiscription",children:[Object(n.jsx)("p",{children:"\ub9e4\ub3c4"}),Object(n.jsx)("p",{children:"\ud638\uac00"}),Object(n.jsx)("p",{children:"\ub9e4\uc218"})]}),a.map((function(e,t){return Object(n.jsx)(M,{props:e},t)})),c.map((function(e,t){return Object(n.jsx)(M,{props:e},t)}))]})}return Object(n.jsx)("div",{className:"OrderBook",children:"Waiting..."})};var H=function(){var e=p(),t=O(),c=Object(g.f)().id,r=e.markets.find((function(e){return e.market.split("-")[1]===c})),s=r&&r.trade_price&&!0;return Object(a.useEffect)((function(){return console.log(r),r&&A.open(r.market,t),function(){A.close()}}),[c,s]),Object(n.jsxs)("div",{className:"Order",children:[Object(n.jsx)("h1",{children:"Order"}),void 0===r&&Object(n.jsxs)("h2",{children:["Not Found Coin ",c]}),void 0!==r&&r.loaded&&Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(K,{info:r}),Object(n.jsx)(W,{info:r})]})]})},U=c(182),z=c(183),G=c.n(z);var V=function(){var e=Object(a.useState)({}),t=Object(o.a)(e,2),c=t[0],r=t[1],s=Object(a.useState)([1,0]),i=Object(o.a)(s,2),l=(i[0],i[1],p()),d=(O(),Object(g.f)().id),j=l.markets.find((function(e){return e.market.split("-")[1]===d})),u=j&&j.trade_price&&!0,b=function(){var e=Object(T.a)(_.a.mark((function e(){var t,n,a,s,i;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.get("https://api.upbit.com/v1/candles/minutes/60?market=KRW-".concat(d,"&count=200"));case 2:t=e.sent,n=t.data.map((function(e){return{x:G.a.asString("dd / hh:mm",new Date(e.timestamp)),y:e.trade_price}})).reverse(),a=n.map((function(e){return e.x})),s=n.map((function(e){return e.y})),i=Array(200).fill(j.prev_closing_price),r({labels:a,datasets:[{label:d,borderColor:"rgba(75, 192, 192, 1)",fill:!1,pointRadius:0,lineTension:0,data:s,borderWidth:2},{label:"Previous Close",data:i,pointRadius:0,borderWidth:2,pointHitRadius:0,fill:!1,borderColor:"rgba(200, 1, 0, 1)"}]}),console.log(c);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){j&&b()}),[d,u]),Object(n.jsxs)("div",{className:"ChartPage",children:[Object(n.jsxs)("h1",{children:["Chart - ",d]}),void 0===j&&Object(n.jsxs)("h2",{children:["Not Found Coin ",d]}),j&&Object(n.jsx)("div",{className:"ChartContainer",children:Object(n.jsx)(U.Line,{data:c,options:{responsive:!0,maintainAspectRatio:!1,animation:{duration:500}},height:400})})]})};var J=function(){return Object(n.jsxs)("div",{className:"About",children:[Object(n.jsx)("h1",{children:"About"}),Object(n.jsx)("h3",{children:"\uc815\uc6b0\ucca0\uc774 \ub9cc\ub4e4\uc5c8\uc5b4\uc694!"}),Object(n.jsx)("h3",{children:"\uc6f9 \uc5b4\ud50c\ub9ac\ucf00\uc774\uc158\uc73c\ub85c \uc5b4\ub5a4 \uc7ac\ubc0c\uace0 \uc720\uc6a9\ud55c\uac78 \ub9cc\ub4e4 \uc218 \uc788\uc744\uae4c?"}),Object(n.jsx)("h3",{children:"\uc0ac\uc6a9(\uc0c8\ub85c \uacf5\ubd80\ud55c) \uae30\uc220"}),Object(n.jsx)("h3",{children:"-React"}),Object(n.jsx)("h5",{children:"-Hook(useState, useEffect, useReducer...)"}),Object(n.jsx)("h5",{children:"-Context API"}),Object(n.jsx)("h5",{children:"-Redux\ub97c \uc2dc\ub3c4\ud558\ub824\uace0 \uacf5\ubd80\ub294 \ud588\uc74c(\uc801\uc6a9\ub9cc \uc548\ud568) / Context API \uac00 \ud3b8\ud55c\uac70 \uac19\uc544\uc694..."}),Object(n.jsx)("h3",{children:"-Rest API"}),Object(n.jsx)("h3",{children:"-Web Socket (\ub2e4\uc74c\uc5d4 Socket.io)"}),Object(n.jsx)("h3",{children:"-Chart library(?)"}),Object(n.jsx)("h3",{children:"-CSS Animation Font"}),Object(n.jsx)("h3",{children:"-Responsive Web (Desktop/Mobile) 1024px"})]})};var X=function(){var e=p(),t=O();return Object(a.useEffect)((function(){var c;t({type:"GET_MARKETS"});try{R().then((function(e){return t({type:"GET_MARKETS_SUC",markets:e}),e})).then((function(n){t({type:"UPDATE_MARKET"}),y(c,n,e,t)}))}catch(n){console.log(n),t({type:"GET_MARKETS_FAIL"})}return function(){c}}),[t]),Object(n.jsxs)("div",{className:"CoinTrade",children:[Object(n.jsx)("div",{className:"Screen"}),Object(n.jsxs)(N.a,{children:[Object(n.jsx)(C,{}),Object(n.jsx)("div",{className:"contents",children:Object(n.jsxs)(g.c,{children:[Object(n.jsx)(g.a,{path:"/",exact:!0,component:I}),Object(n.jsx)(g.a,{path:"/order/:id",exact:!0,component:H}),Object(n.jsx)(g.a,{path:"/chart/:id",exact:!0,component:V}),Object(n.jsx)(g.a,{path:"/setting",exact:!0,component:I}),Object(n.jsx)(g.a,{path:"/about",exact:!0,component:J}),Object(n.jsx)(g.a,{path:"/*",exact:!0,children:"Wrong page"})]})})]})]})};var Y=function(){return Object(n.jsx)("div",{className:"App",children:Object(n.jsx)(k,{children:Object(n.jsx)(h,{children:Object(n.jsx)(X,{})})})})};i.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(Y,{})}),document.getElementById("root"))}},[[602,1,2]]]);
//# sourceMappingURL=main.a0154808.chunk.js.map