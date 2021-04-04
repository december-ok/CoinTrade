import { CoinType } from "../Components/CommonType";

const SET_BASIC_MARKET = "Coin/SET_BASIC_MARKET" as const;
const SET_SIMPLE_MARKET = "Coin/SET_SIMPLE_MARKET" as const;
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
export const setRealMarket = (data: any) => ({
  type: SET_REAL_MARKET,
  payload: data,
});

type CoinAction =
  | ReturnType<typeof setSimpleMarket>
  | ReturnType<typeof setBasicMarket>
  | ReturnType<typeof setRealMarket>;

type CoinState = Map<string, object>;

const initialState: CoinState = new Map<string, object>();

export default function Coin(
  state: CoinState = initialState,
  action: CoinAction
): CoinState {
  let newCoinState = new Map<string, object>();
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
    case SET_REAL_MARKET:
      newCoinState.set(action.payload.code, {
        ...state.get(action.payload.code),
        ...action.payload,
      });
      return newCoinState;
    default:
      return state;
  }
}
