import { saveUserData } from "./../App";
const INITIAL_UPDATE = "User/INITIAL_UPDATE" as const;
const BUY_COIN = "User/BUY_COIN" as const;
const SELL_COIN = "User/SELL_COIN" as const;

export type AssetType = {
  market: string;
  quantity: number;
  averagePrice: number;
};

export type UserState = {
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

export const initialUpdate = (data: UserState) => ({
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

type UserAction =
  | ReturnType<typeof buyCoin>
  | ReturnType<typeof initialUpdate>
  | ReturnType<typeof sellCoin>;

export const initialState: UserState = {
  startValue: 10000000,
  won: 10000000,
  assetsList: [],
};

export default function User(
  state: UserState = initialState,
  action: UserAction
): UserState {
  let formerData;
  let newData;
  switch (action.type) {
    case INITIAL_UPDATE:
      return action.payload;
    case BUY_COIN:
      formerData = state.assetsList.filter(
        (item) => item.market === action.payload.market
      )[0];
      if (formerData) {
        newData = {
          market: action.payload.market,
          averagePrice:
            (formerData.averagePrice * formerData.quantity +
              action.payload.quantity * action.payload.averagePrice) /
            (formerData.quantity + action.payload.quantity),
          quantity: action.payload.quantity + formerData.quantity,
        };
      } else {
        newData = {
          market: action.payload.market,
          averagePrice: action.payload.averagePrice,
          quantity: action.payload.quantity,
        };
      }
      saveUserData({
        ...state,
        won: state.won - action.payload.averagePrice * action.payload.quantity,
        assetsList: [
          ...state.assetsList.filter(
            (item) => item.market !== action.payload.market
          ),
          newData,
        ],
      });
      return {
        ...state,
        won: state.won - action.payload.averagePrice * action.payload.quantity,
        assetsList: [
          ...state.assetsList.filter(
            (item) => item.market !== action.payload.market
          ),
          newData,
        ],
      };
    case SELL_COIN:
      formerData = state.assetsList.filter(
        (item) => item.market === action.payload.market
      )[0];
      newData = {
        market: action.payload.market,
        averagePrice: formerData.quantity,
        quantity: formerData.quantity - action.payload.quantity,
      };

      saveUserData({
        ...state,
        won: state.won + action.payload.sellPrice * action.payload.quantity,
        assetsList: [
          ...state.assetsList.filter(
            (item) => item.market !== action.payload.market
          ),
          newData,
        ],
      });
      return {
        ...state,
        won: state.won + action.payload.sellPrice * action.payload.quantity,
        assetsList: [
          ...state.assetsList.filter(
            (item) => item.market !== action.payload.market
          ),
          newData,
        ],
      };
    default:
      return state;
  }
}
