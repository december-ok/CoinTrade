import axios from "axios";
import {
  setBasicMarket,
  setDetailMarket,
  setRealMarket,
} from "../modules/Coin";
import { setSimpleMarket } from "../modules/Coin";
import { store } from "../store";

const getWebSocketUrl = () => {
  if (typeof window === "undefined") return "";
  const isVercel = window.location.hostname.includes("vercel.app");
  if (isVercel) {
    return "wss://api.upbit.com/websocket/v1";
  }
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}/api/ws`;
};

export const getSimpleMarket = async () => {
  let { data: hi } = await axios.get("/api/upbit/v1/market/all");
  const marketList = hi.filter((item: typeof hi[0]) => {
    return item.market.includes("KRW-");
  });
  store.dispatch(setBasicMarket(marketList));
  let { data } = await axios.get(
    "/api/upbit/v1/ticker?markets=" +
      marketList
        .map((item: typeof hi[0]) => {
          return item.market;
        })
        .join()
  );
  //set Minus
  store.dispatch(
    setSimpleMarket(
      data.map((item: any) => {
        if (item.change === "FALL") {
          item.change_rate = -item.change_rate;
          item.change_price = -item.change_price;
        }
        return item;
      })
    )
  );
  return {
    marketListString: marketList
      .map((item: typeof hi[0]) => {
        return `"${item.market}"`;
      })
      .join(),
    marketList: marketList.map((item: typeof hi[0]) => {
      return `${item.market}`;
    }),
  };
};

export const getRealTimeMarket = async (marketList: string): Promise<WebSocket> => {
  let socket = new WebSocket(getWebSocketUrl());

  const subscribe = (ws: WebSocket) => {
    const message = `[{"ticket":"test"},{"type":"ticker","codes":[${marketList}]}]`;
    ws.send(message);
  };

  const handleMessage = async (message: any) => {
    let data: any;
    if (typeof message.data === "string") {
      data = JSON.parse(message.data);
    } else {
      const text = await new Response(message.data).text();
      data = JSON.parse(text);
    }
    //setMinus
    if (data.change === "FALL") {
      data.change_rate = -data.change_rate;
      data.change_price = -data.change_price;
    }
    store.dispatch(setRealMarket(data));
  };

  socket.onopen = () => subscribe(socket);
  socket.onmessage = handleMessage;

  socket.onerror = () => {
    if (socket.url.includes("/api/ws")) {
      console.warn("WebSocket proxy error, falling back to direct Upbit WebSocket");
      const fallbackSocket = new WebSocket("wss://api.upbit.com/websocket/v1");
      fallbackSocket.onopen = () => subscribe(fallbackSocket);
      fallbackSocket.onmessage = handleMessage;
      socket = fallbackSocket;
    }
  };

  return socket;
};

export const getDetailData = async (market: string): Promise<WebSocket> => {
  let socket = new WebSocket(getWebSocketUrl());

  const subscribe = (ws: WebSocket) => {
    const messageOrderbook = `[{"ticket":"test"},{"type":"orderbook","codes":["${market}.7"]}]`;
    ws.send(messageOrderbook);
  };

  const handleMessage = async (message: any) => {
    let data: any;
    if (typeof message.data === "string") {
      data = JSON.parse(message.data);
    } else {
      data = await new Response(message.data).json();
    }
    store.dispatch(
      setDetailMarket({
        ...data,
        orderbook_units: data.orderbook_units.slice(0, 7),
      })
    );
  };

  socket.onopen = () => subscribe(socket);
  socket.onmessage = handleMessage;

  socket.onerror = () => {
    if (socket.url.includes("/api/ws")) {
      console.warn("Detail WebSocket proxy error, falling back to direct Upbit WebSocket");
      const fallbackSocket = new WebSocket("wss://api.upbit.com/websocket/v1");
      fallbackSocket.onopen = () => subscribe(fallbackSocket);
      fallbackSocket.onmessage = handleMessage;
      socket = fallbackSocket;
    }
  };

  return socket;
};

export const getChartData = async (
  market: string,
  scale: number,
  amount: number,
  time: string = ""
) => {
  const scaleUrl = [
    "/api/upbit/v1/candles/minutes/1",
    "/api/upbit/v1/candles/minutes/30",
    "/api/upbit/v1/candles/minutes/60",
    "/api/upbit/v1/candles/days",
    "/api/upbit/v1/candles/weeks",
    "/api/upbit/v1/candles/months",
  ];

  const { data }: any = await axios.get(
    scaleUrl[scale] + `?market=${market}&count=${amount}&to=${time}`
  );
  return data;
};

export const getCommaNumber = (num: number): string => {
  return Number(num.toFixed(2))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getIntCommaNumber = (num: number): string => {
  return Number(num.toFixed(0))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getChangeRate = (num: number): string => {
  return (
    Number((100 * num).toFixed(2))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "%"
  );
};
