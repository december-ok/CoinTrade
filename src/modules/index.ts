import { combineReducers } from "redux";
import { Account } from "./Account";
import { Client } from "./Client";
import { Coin } from "./Coin";

const rootReducer = combineReducers({ Account, Client, Coin });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
