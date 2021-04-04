const INITIAL_UPDATE = "User/INITIAL_UPDATE" as const;
const BUY_COIN = "User/BUY_COIN" as const;

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

export const initialUpdate = (data: UserState) => ({
  type: INITIAL_UPDATE,
  payload: data,
});
export const buyCoin = (data: buyCoinType) => ({
  type: BUY_COIN,
  payload: data,
});

type UserAction = ReturnType<typeof buyCoin> | ReturnType<typeof initialUpdate>;

export const initialState: UserState = {
  startValue: 1000000,
  won: 1000000,
  assetsList: [
    {
      market: "KRW-MTL",
      quantity: 13,
      averagePrice: 100,
    },
  ],
};

export default function User(
  state: UserState = initialState,
  action: UserAction
): UserState {
  // let newState = { ...state };
  switch (action.type) {
    case INITIAL_UPDATE:
      return action.payload;
    case BUY_COIN:
      console.log(action.payload);
      return initialState;
    default:
      return state;
  }
}
