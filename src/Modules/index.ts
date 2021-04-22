import { Account } from "./Account";
import { Client } from "./Client";
import { Coin } from "./Coin";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ Coin, Client, Account });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
