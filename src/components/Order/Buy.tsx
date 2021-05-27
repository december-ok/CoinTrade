import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getCommaNumber } from "../../lib/coinController";
import { CoinType } from "../../types/CommonType";
import { useBuyButtonClick } from "../../hooks/Order/BuyHooks";
import { AccountState } from "../../modules/Account";

interface BuyProps {
  CoinInfo: CoinType;
  Account: AccountState;
}

export function Buy({ CoinInfo, Account }: BuyProps) {
  const quantityInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const percentArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const buyButtonElement = useBuyButtonClick(
    quantity,
    CoinInfo,
    Account,
    dispatch,
    quantityInput
  );

  const onQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //eslint-disable-next-line
    if (!/^(\d*)[\.]?(\d{1,2})?$/g.test(e.target.value)) {
      e.target.value = e.target.value.slice(0, -1);
    }
    if (Number(e.target.value) * CoinInfo.trade_price > Account.won) {
      e.target.value = e.target.value.slice(0, -1);
    }
    setQuantity(Number(e.target.value));
  };
  const onQuantitySelectorChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const calculatedValue =
      (Account.won / CoinInfo.trade_price) *
      0.98 *
      Number(Number(e.target.value) / 100);
    if (quantityInput.current)
      quantityInput.current.value = calculatedValue.toFixed(2);
    setQuantity(Number(calculatedValue.toFixed(2)));
  };

  return (
    <div className="Buy">
      <div className="BuyForm">
        <p className="CashL L">Cash</p>
        <p className="CashV V">{getCommaNumber(Account.won)}</p>
        <p className="QuantityL L">Quantity</p>
        <input
          ref={quantityInput}
          className="QuantityV V"
          onChange={onQuantityInputChange}
          type="number"
        />
        <select
          className="QuantitySelector"
          onChange={onQuantitySelectorChange}
        >
          <option value="">Select</option>
          {percentArray.map((i) => (
            <option key={i} value={i}>
              {i}%
            </option>
          ))}
        </select>
        <p className="PriceL L">Price</p>
        <p className="PriceV V">{getCommaNumber(CoinInfo.trade_price)}</p>
        <p className="TotalPriceL L">Total Price</p>
        <p className="TotalPriceV V">
          {getCommaNumber(CoinInfo.trade_price * quantity)}
        </p>
        <button className="BuyButton" ref={buyButtonElement}>
          Buy
        </button>
      </div>
    </div>
  );
}
