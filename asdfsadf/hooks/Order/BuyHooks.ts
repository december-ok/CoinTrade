import { Dispatch, useEffect, useRef } from "react";
import { AccountState, buyCoin } from "../../modules/Account";
import { CoinType } from "../../types/CommonType";

export const useBuyButtonClick = (
  quantity: number,
  CoinInfo: CoinType,
  Account: AccountState,
  dispatch: Dispatch<any>,
  quantityInput: React.RefObject<HTMLInputElement>
) => {
  const buttonElement = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const buttonElementCurrent = buttonElement.current;
    const applyFunction: EventListener = () => {
      if (!quantity) {
        alert("Select Quantity." + quantity);
      } else if (quantity * CoinInfo.trade_price <= Account.won) {
        dispatch(
          buyCoin({
            market: CoinInfo.market,
            averagePrice: CoinInfo.trade_price,
            quantity,
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
  ]);
  return buttonElement;
};
