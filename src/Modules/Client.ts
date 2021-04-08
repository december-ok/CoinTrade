const SET_MENU = "Client/SET_MENU" as const;
const SET_MARKET = "Client/SET_MARKET" as const;

export const setMenu = (data: number) => ({
  type: SET_MENU,
  payload: data,
});
export const setMarket = (data: string) => ({
  type: SET_MARKET,
  payload: data,
});

type ClientAction = ReturnType<typeof setMenu> | ReturnType<typeof setMarket>;

type ClientState = { market: string; menu: number };

const initialState: ClientState = {
  market: "KRW-BTC",
  menu: 0,
};

export default function Client(
  state: ClientState = initialState,
  action: ClientAction
): ClientState {
  switch (action.type) {
    case SET_MENU:
      return { ...state, menu: action.payload };
    case SET_MARKET:
      return { ...state, market: action.payload };
    default:
      return state;
  }
}
