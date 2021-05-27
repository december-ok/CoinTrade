import { CoinType, OrderBookType } from "../types/CommonType";

const SET_BASIC_MARKET = "Coin/SET_BASIC_MARKET" as const;
const SET_SIMPLE_MARKET = "Coin/SET_SIMPLE_MARKET" as const;
const SET_DETAIL_MARKET = "Coin/SET_DETAIL_MARKET" as const;
const SET_REAL_MARKET = "Coin/SET_REAL_MARKET" as const;

export type setSimpleMarketType = CoinType[];

export const setBasicMarket = (data: Partial<setSimpleMarketType>) => ({
  type: SET_BASIC_MARKET,
  payload: data,
});
export const setSimpleMarket = (data: setSimpleMarketType) => ({
  type: SET_SIMPLE_MARKET,
  payload: data,
});
export const setDetailMarket = (data: OrderBookType) => ({
  type: SET_DETAIL_MARKET,
  payload: data,
});
export const setRealMarket = (data: any) => ({
  type: SET_REAL_MARKET,
  payload: data,
});

type CoinAction =
  | ReturnType<typeof setSimpleMarket>
  | ReturnType<typeof setBasicMarket>
  | ReturnType<typeof setRealMarket>
  | ReturnType<typeof setDetailMarket>;

export type CoinState = Map<string, CoinType>;

const initialState: CoinState = new Map<string, CoinType>();

export const Coin = (
  state: CoinState = initialState,
  action: CoinAction
): CoinState => {
  let newCoinState = new Map<string, CoinType>();
  state.forEach((value, key) => {
    newCoinState.set(key, value);
  });
  switch (action.type) {
    case SET_BASIC_MARKET:
      action.payload.forEach((item: any) => {
        newCoinState.set(item.market, { ...state.get(item.market), ...item });
      });
      return newCoinState;
    case SET_SIMPLE_MARKET:
      action.payload.forEach((item: any) => {
        newCoinState.set(item.market, { ...state.get(item.market), ...item });
      });
      return newCoinState;
    case SET_DETAIL_MARKET:
      newCoinState.set(action.payload.code, {
        ...(state.get(action.payload.code) as CoinType),
        order_book: action.payload,
      });
      return newCoinState;
    case SET_REAL_MARKET:
      newCoinState.set(action.payload.code, {
        ...state.get(action.payload.code),
        ...action.payload,
      });
      return newCoinState;
    default:
      return state;
  }
};
