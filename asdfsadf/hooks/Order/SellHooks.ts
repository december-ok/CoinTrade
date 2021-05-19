import { CoinType } from "../../types/CommonType";
import { Dispatch, useEffect, useRef } from "react";
import { AccountState, sellCoin } from "./../../modules/Account";

export const useSellButtonClick = (
  quantity: number,
  CoinInfo: CoinType,
  Account: AccountState,
  dispatch: Dispatch<any>,
  quantityInput: React.RefObject<HTMLInputElement>,
  leftQuantity: number
) => {
  const buttonElement = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const buttonElementCurrent = buttonElement.current;
    const applyFunction: EventListener = () => {
      if (!quantity) {
        alert("Select Quantity.");
      } else if (quantity <= leftQuantity) {
        dispatch(
          sellCoin({
            market: CoinInfo.market,
            quantity,
            sellPrice: CoinInfo.trade_price,
          })
        );
        alert("The purchase has been Successfully concluded.");
        if (quantityInput.current) quantityInput.current.value = "0";
      } else {
        alert("Failed to purchase.");
      }
    };
    buttonElementCurrent?.addEventListener("click", applyFunction);
    return () => {
      buttonElementCurrent?.removeEventListener("click", applyFunction);
    };
  }, [
    quantity,
    CoinInfo.trade_price,
    Account.won,
    dispatch,
    quantityInput,
    CoinInfo.market,
    leftQuantity,
  ]);
  return buttonElement;
};
