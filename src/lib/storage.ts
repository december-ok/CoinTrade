import { AccountState } from "../modules/Account";
import { encrypt, decrypt } from "./crypto";

export const saveAccountData = (data: AccountState) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("userData", encrypt(JSON.stringify(data)));
};

export const loadAccountData = (): string => {
  if (typeof window === "undefined") return "";
  try {
    return decrypt(localStorage.getItem("userData"));
  } catch (error) {
    return "";
  }
};
