import Crypto from "crypto-js";

const KEY = "2ZLdKAbltUtnlA8Y8gdqeofTISAZ6ekD";

export const encrypt = (data: string): string => {
  return Crypto.AES.encrypt(data, KEY).toString();
};

export const decrypt = (data: string | null): string => {
  if (data == null) return "";
  return Crypto.AES.decrypt(data, KEY).toString(Crypto.enc.Utf8);
};
