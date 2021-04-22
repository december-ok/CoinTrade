import axios from "axios";
import { store } from "..";
import {
  setBasicMarket,
  setDetailMarket,
  setRealMarket,
} from "../modules/Coin";
import { setSimpleMarket } from "../modules/Coin";

export const getSimpleMarket = async () => {
  let { data: hi } = await axios.get("https://api.upbit.com/v1/market/all");
  const marketList = hi.filter((item: typeof hi[0]) => {
    return item.market.includes("KRW-");
  });
  store.dispatch(setBasicMarket(marketList));
  let { data } = await axios.get(
    "https://api.upbit.com/v1/ticker?markets=" +
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

export const getRealTimeMarket = async (marketList: string) => {
  let socket = new WebSocket("wss://api.upbit.com/websocket/v1");
  socket.onopen = () => {
    const message = `[{"ticket":"test"},{"type":"ticker","codes":[${marketList}]}]`;
    socket.send(message);
  };
  socket.onmessage = async (message: any) => {
    const text = await new Response(message.data).text();
    const data = JSON.parse(text);
    //setMinus
    if (data.change === "FALL") {
      data.change_rate = -data.change_rate;
      data.change_price = -data.change_price;
    }
    store.dispatch(setRealMarket(data));
  };
  return socket;
};

export const getDetailData = async (market: string): Promise<WebSocket> => {
  const socket = new WebSocket("wss://api.upbit.com/websocket/v1");
  socket.onopen = () => {
    const messageOrderbook = `[{"ticket":"test"},{"type":"orderbook","codes":["${market}.7"]}]`;
    // console.log(message);
    socket.send(messageOrderbook);
  };
  socket.onmessage = async (message: any) => {
    const data = await new Response(message.data).json();
    store.dispatch(
      setDetailMarket({
        ...data,
        orderbook_units: data.orderbook_units.slice(0, 7),
      })
    );
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
    "https://api.upbit.com/v1/candles/minutes/1",
    "https://api.upbit.com/v1/candles/minutes/30",
    "https://api.upbit.com/v1/candles/minutes/60",
    "https://api.upbit.com/v1/candles/days",
    "https://api.upbit.com/v1/candles/weeks",
    "https://api.upbit.com/v1/candles/months",
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
