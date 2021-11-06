import Big from "big.js";
import { saveAccountData } from "../App";

const INITIAL_UPDATE = "Account/INITIAL_UPDATE" as const;
const BUY_COIN = "Account/BUY_COIN" as const;
const SELL_COIN = "Account/SELL_COIN" as const;

export type AssetType = {
  market: string;
  quantity: number;
  averagePrice: number;
};

export type AccountState = {
  startValue: number;
  won: number;
  assetsList: AssetType[];
};

export type buyCoinType = {
  market: string;
  quantity: number;
  averagePrice: number;
};
export type sellCoinType = {
  market: string;
  quantity: number;
  sellPrice: number;
};

export const initialUpdate = (data: AccountState) => ({
  type: INITIAL_UPDATE,
  payload: data,
});
export const buyCoin = (data: buyCoinType) => ({
  type: BUY_COIN,
  payload: data,
});
export const sellCoin = (data: sellCoinType) => ({
  type: SELL_COIN,
  payload: data,
});

type AccountAction =
  | ReturnType<typeof buyCoin>
  | ReturnType<typeof initialUpdate>
  | ReturnType<typeof sellCoin>;

export const initialState: AccountState = {
  startValue: 10000000,
  won: 10000000,
  assetsList: [],
};

export const Account = (
  state: AccountState = initialState,
  action: AccountAction
): AccountState => {
  let newState;
  switch (action.type) {
    case INITIAL_UPDATE:
      return action.payload;
    case BUY_COIN:
      newState = buyCoinReducer(state, action);
      saveAccountData(newState);
      return newState;
    case SELL_COIN:
      newState = sellCoinReducer(state, action);
      saveAccountData(newState);
      return newState;
    default:
      return state;
  }
};

const buyCoinReducer = (
  state: AccountState,
  action: ReturnType<typeof buyCoin>
) => {
  const formerData = state.assetsList.filter(
    (item) => item.market === action.payload.market
  )[0];

  const newData = {
    market: action.payload.market,
    averagePrice: formerData
      ? Big(formerData.averagePrice)
          .times(formerData.quantity)
          .plus(Big(action.payload.quantity).times(action.payload.averagePrice))
          .div(Big(formerData.quantity).plus(action.payload.quantity))
          .toNumber()
      : action.payload.averagePrice,
    quantity: formerData
      ? Big(action.payload.quantity).plus(formerData.quantity).toNumber()
      : action.payload.quantity,
  };

  return {
    ...state,
    won: Big(state.won)
      .minus(Big(action.payload.averagePrice).times(action.payload.quantity))
      .toNumber(),
    assetsList: [
      ...state.assetsList.filter(
        (item) => item.market !== action.payload.market
      ),
      newData,
    ],
  };
};

const sellCoinReducer = (
  state: AccountState,
  action: ReturnType<typeof sellCoin>
) => {
  const formerData = state.assetsList.filter(
    (item) => item.market === action.payload.market
  )[0];

  const newData = {
    market: action.payload.market,
    averagePrice: formerData.averagePrice,
    quantity: Big(formerData.quantity)
      .minus(action.payload.quantity)
      .toNumber(),
  };

  return {
    ...state,
    won: Big(state.won)
      .plus(Big(action.payload.sellPrice).times(action.payload.quantity))
      .toNumber(),
    assetsList: newData.quantity
      ? [
          ...state.assetsList.filter(
            (item) => item.market !== action.payload.market
          ),
          newData,
        ]
      : [
          ...state.assetsList.filter(
            (item) => item.market !== action.payload.market
          ),
        ],
  };
};
