(this.webpackJsonpcointrade=this.webpackJsonpcointrade||[]).push([[4],{311:function(e,c,t){"use strict";t.d(c,"a",(function(){return l}));var r=t(85),n=t(0),s=t(20),i=t(21),a=t(59),o=t(4),l=function(e){var c=e.setFadeAway,t=Object(s.c)((function(e){return e.Coin})),l=Object(s.c)((function(e){return e.Client})),u=t.get(l.market),d=Object(s.b)(),j=Object(n.useState)(!1),b=Object(r.a)(j,2),m=b[0],O=b[1],h=Object(n.useRef)(null),v=Object(n.useRef)(null),f="RISE"===u.change?"#FF4B4B":"FALL"===u.change?"#3555FF":"#000000";return Object(n.useEffect)((function(){h.current&&(h.current.value=u.english_name)}),[u.english_name]),Object(n.useEffect)((function(){document.title=u.english_name+" "+Object(a.c)(u.trade_price)}),[u.trade_price,u.english_name]),Object(o.jsxs)("div",{className:"CoinInfo",children:[Object(o.jsxs)("div",{className:"CoinInfoHeader",children:[Object(o.jsx)("img",{alt:"CoinImg",src:"https://static.upbit.com/logos/".concat(l.market.substring(4),".png")}),Object(o.jsx)("input",{className:"CoinSelector",ref:h,onFocus:function(e){e.target.value="",v.current&&v.current.classList.add("Show"),O(!0)},onBlur:function(){h.current&&(h.current.value=u.english_name),v.current&&v.current.classList.remove("Show"),setTimeout((function(){O(!1)}),250)}}),Object(o.jsx)("div",{className:"DropdownMenu",ref:v,children:m&&Array.from(t.values()).filter((function(e){var c,t=(null===(c=h.current)||void 0===c?void 0:c.value.toLowerCase())||"";return e.english_name.toLowerCase().includes(t)||e.korean_name.includes(t)||e.market.substr(4).toLowerCase().includes(t)})).map((function(e){return Object(o.jsxs)("button",{className:"DropdownCoinBlock",onMouseDown:function(){c(!0),setTimeout((function(){d(Object(i.c)(e.market)),c(!1)}),250)},children:[Object(o.jsx)("img",{alt:"CoinImg",src:"https://static.upbit.com/logos/".concat(e.market.substring(4),".png")}),Object(o.jsx)("p",{className:"CoinName",children:e.english_name})]},e.market)}))})]}),Object(o.jsxs)("div",{className:"CoinInfoBody",style:{color:f},children:[Object(o.jsx)("p",{className:"CoinPrice",children:Object(a.c)(u.trade_price)}),Object(o.jsxs)("div",{className:"CoinChangeInfo",children:[Object(o.jsxs)("p",{className:"CoinChangePrice",children:["RISE"===u.change&&"+",Object(a.c)(u.change_price)]}),Object(o.jsxs)("p",{className:"CoinChangeRate",children:["RISE"===u.change&&"+",Object(a.a)(u.change_rate)]})]})]})]})}},426:function(e,c,t){"use strict";t.r(c),t.d(c,"default",(function(){return _}));var r=t(8),n=t.n(r),s=t(19),i=t(85),a=t(0),o=t(20),l=t(311),u=t(56),d=t(59),j=t(4);function b(e){var c,t,r,n,s,i=e.CoinInfo;return i.order_book&&(s=Math.max.apply(Math,Object(u.a)(i.order_book.orderbook_units.map((function(e){return e.ask_size})).concat(i.order_book.orderbook_units.map((function(e){return e.bid_size})))))),Object(j.jsxs)("div",{className:"OrderBook",children:[!i.order_book&&Object(j.jsx)("div",{className:"Loading",children:Object(j.jsx)("i",{className:"fas fa-circle-notch fa-spin"})}),i.order_book&&Object(j.jsxs)("div",{className:"OrderBookLoaded",children:[Object(j.jsx)("p",{className:"AskLabel Label",children:"Ask"}),Object(j.jsx)("p",{className:"PriceLabel Label",children:"Price"}),Object(j.jsx)("p",{className:"BidLabel Label",children:"Bid"}),Object(j.jsxs)("div",{className:"AskArea",children:[null===(c=i.order_book)||void 0===c?void 0:c.orderbook_units.slice(0).reverse().map((function(e){return Object(j.jsx)("div",{className:"AskBlock",style:{background:"linear-gradient(90deg, transparent ".concat(100-e.ask_size/s*100,"%, rgba(155,171,255,1) ").concat(100-e.ask_size/s*100,"%)")},children:Object(j.jsx)("p",{className:"Size",children:Object(d.c)(e.ask_size)})},e.ask_price)})),Object(j.jsx)("div",{className:"UnderAsk"})]}),Object(j.jsxs)("div",{className:"PriceArea",children:[null===(t=i.order_book)||void 0===t?void 0:t.orderbook_units.slice(0).reverse().map((function(e){var c=e.ask_price-i.prev_closing_price,t=c>0?"#FF4B4B":c<0?"#3555FF":"#000000";return Object(j.jsxs)("div",{className:"PriceBlock",children:[Object(j.jsx)("p",{className:"Price",style:{color:t},children:Object(d.c)(e.ask_price)}),Object(j.jsxs)("p",{className:"ChangeRate",style:{color:t},children:[c>0&&"+",Object(d.a)(c/i.prev_closing_price)]})]},e.ask_price)})),null===(r=i.order_book)||void 0===r?void 0:r.orderbook_units.map((function(e){var c=e.bid_price-i.prev_closing_price,t=c>0?"#FF4B4B":c<0?"#3555FF":"#000000";return Object(j.jsxs)("div",{className:"PriceBlock",children:[Object(j.jsx)("p",{className:"Price",style:{color:t},children:Object(d.c)(e.bid_price)}),Object(j.jsxs)("p",{className:"ChangeRate",style:{color:t},children:[c>0&&"+",Object(d.a)(c/i.prev_closing_price)]})]},e.bid_price)}))]}),Object(j.jsxs)("div",{className:"BidArea",children:[Object(j.jsx)("div",{className:"OverBid"}),null===(n=i.order_book)||void 0===n?void 0:n.orderbook_units.map((function(e){return Object(j.jsx)("div",{className:"BidBlock",style:{background:"linear-gradient(90deg, #ffa3a3 ".concat(e.bid_size/s*100,"%, transparent ").concat(e.bid_size/s*100,"%)")},children:Object(j.jsx)("p",{className:"Size",children:Object(d.c)(e.bid_size)})},e.bid_price)}))]})]})]})}var m=t(423),O=t(422),h=t.n(O),v=!1;function f(e){var c,t,r=e.CoinInfo,o=Object(a.useState)(0),l=Object(i.a)(o,2),u=l[0],b=l[1],O=Object(a.useRef)(),f=Object(a.useRef)(),_=Object(a.useRef)(),x=Object(a.useRef)(),k=document.querySelector(".Coin").offsetWidth,g=.5*window.screen.height;if(Object(a.useEffect)((function(){return Object(s.a)(n.a.mark((function e(){var c;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.b)(r.market,u,200);case 2:c=e.sent,O.current=c;case 4:case"end":return e.stop()}}),e)})))().then((function(){_.current=Object(m.b)(document.querySelector(".Chart"),{width:k,height:g,crosshair:{mode:m.a.Normal},localization:{locale:"ko-KR",dateFormat:"yyyy-MM-dd"},timeScale:{timeVisible:!0,secondsVisible:!1,rightOffset:2}}),f.current=_.current.addCandlestickSeries({upColor:"#FF4B4B",downColor:"#3555FF",wickUpColor:"#FF4B4B",wickDownColor:"#3555FF",borderVisible:!1}),O.current&&f.current.setData(p(O.current.slice(0))),x.current=setInterval(Object(s.a)(n.a.mark((function e(){var c,t,s,i,a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.b)(r.market,u,1);case 2:a=e.sent,O.current&&f.current&&(null===(c=a[0])||void 0===c?void 0:c.candle_date_time_utc)===(null===(t=O.current[0])||void 0===t?void 0:t.candle_date_time_utc)?(O.current=a.concat(O.current.slice(1)),O.current&&f.current.setData(p(O.current.slice(0)))):O.current&&f.current&&(null===(s=a[0])||void 0===s?void 0:s.candle_date_time_utc)>(null===(i=O.current[0])||void 0===i?void 0:i.candle_date_time_utc)&&(O.current=a.concat(O.current),O.current&&f.current.setData(p(O.current.slice(0))));case 4:case"end":return e.stop()}}),e)}))),500)})),function(){var e;null===(e=document.querySelector(".Chart"))||void 0===e||e.removeChild(document.querySelector(".tv-lightweight-charts")),x.current&&clearInterval(x.current),O.current=[]}}),[r.market,u]),null===(c=_.current)||void 0===c||c.resize(k,g),!v&&_.current&&(null===(t=O.current)||void 0===t?void 0:t.length)){var C,N=null===(C=_.current.timeScale().getVisibleRange())||void 0===C?void 0:C.from;console.log(O,u);var w=O.current[O.current.length-1].timestamp/1e3+32400;N===w&&(v=!0,console.log(N,w),Object(s.a)(n.a.mark((function e(){var c;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.b)(r.market,u,200,h()(1e3*(w-32400-32400),"yyyy-mm-dd HH:MM:ss"));case 2:c=e.sent,f.current&&O.current&&(O.current=O.current.concat(c.slice(1)),f.current.setData(p(O.current.slice(0)))),v=!1;case 5:case"end":return e.stop()}}),e)})))())}return Object(j.jsx)("div",{className:"Chart",children:Object(j.jsxs)("select",{className:"scaleSelector",onChange:function(e){b(Number(e.target.value))},children:[Object(j.jsx)("option",{value:"0",children:"Min"}),Object(j.jsx)("option",{value:"1",children:"Half Hour"}),Object(j.jsx)("option",{value:"2",children:"Hour"}),Object(j.jsx)("option",{value:"3",children:"Day"}),Object(j.jsx)("option",{value:"4",children:"Week"}),Object(j.jsx)("option",{value:"5",children:"Month"})]})})}var p=function(e){return e.slice(0).reverse().map((function(e){return{time:e.timestamp/1e3+32400,open:e.opening_price,high:e.high_price,low:e.low_price,close:e.trade_price}}))};function _(){var e=Object(o.c)((function(e){return e.Coin})),c=Object(o.c)((function(e){return e.Client})),t=e.get(c.market),r=Object(a.useState)(0),u=Object(i.a)(r,2),m=u[0],O=u[1],h=Object(a.useState)(!1),v=Object(i.a)(h,2),p=v[0],_=v[1],x=Object(a.useState)(!1),k=Object(i.a)(x,2),g=k[0],C=k[1],N=Object(a.useRef)(),w=function(e){_(!0),setTimeout((function(){O(e),_(!1)}),250)};return Object(a.useEffect)((function(){return Object(s.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.d)(c.market);case 2:N.current=e.sent;case 3:case"end":return e.stop()}}),e)})))(),function(){N.current&&N.current.close()}}),[c.market]),Object(j.jsxs)("div",{className:"Coin",children:[Object(j.jsx)("div",{className:"ContentTitle",children:Object(j.jsx)("h1",{children:"Coin"})}),Object(j.jsxs)("div",{className:"Content"+(g?" fadeAway":""),children:[Object(j.jsx)(l.a,{setFadeAway:C}),Object(j.jsxs)("div",{className:"CoinContent",children:[Object(j.jsxs)("div",{className:"CoinContentSelector",children:[Object(j.jsx)("button",{onClick:function(){0!==m&&w(0)},children:Object(j.jsx)("p",{className:"OrderBookP"+(m?" inActive":""),style:{width:"90px"},children:"Order Book"})}),Object(j.jsx)("button",{onClick:function(){1!==m&&w(1)},children:Object(j.jsx)("p",{className:"ChartP"+(m?"":" inActive"),children:"Chart"})})]}),Object(j.jsxs)("div",{className:"CoinContentBody"+(p?" fadeAway":""),children:[0===m&&Object(j.jsx)(b,{CoinInfo:t}),1===m&&Object(j.jsx)(f,{CoinInfo:t})]})]})]})]})}}}]);