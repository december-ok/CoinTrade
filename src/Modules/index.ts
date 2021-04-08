import { combineReducers } from "redux";
import Coin from "./Coin";
import User from "./User";
import Client from "./Client";

const rootReducer = combineReducers({
  Coin,
  User,
  Client,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
