import { combineReducers } from "redux";
import Coin from "./Coin";
import User from "./User";

const rootReducer = combineReducers({
  Coin,
  User,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
