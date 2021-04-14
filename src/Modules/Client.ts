const SET_MENU = "Client/SET_MENU" as const;
const SET_MARKET = "Client/SET_MARKET" as const;
const SET_CONTENT_WRAP_FADE_OUT = "Client/SET_CONTENT_WRAP_FADE_OUT" as const;

export const setMenu = (data: number) => ({
  type: SET_MENU,
  payload: data,
});
export const setMarket = (data: string) => ({
  type: SET_MARKET,
  payload: data,
});
export const setContentWrapFadeOut = (data: boolean) => ({
  type: SET_CONTENT_WRAP_FADE_OUT,
  payload: data,
});

type ClientAction =
  | ReturnType<typeof setMenu>
  | ReturnType<typeof setMarket>
  | ReturnType<typeof setContentWrapFadeOut>;

type ClientState = {
  market: string;
  menu: number;
  contentWrapFadeOut: boolean;
};

const initialState: ClientState = {
  market: "KRW-BTC",
  menu: 0,
  contentWrapFadeOut: true,
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
    case SET_CONTENT_WRAP_FADE_OUT:
      return { ...state, contentWrapFadeOut: action.payload };
    default:
      return state;
  }
}
