import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getCommaNumber } from "../../lib/coinController";
import { CoinType } from "../../types/CommonType";
import { useSellButtonClick } from "../../hooks/Order/SellHooks";
import { AccountState } from "../../modules/Account";

interface SellProps {
  CoinInfo: CoinType;
  Account: AccountState;
}

export default function Sell({ CoinInfo, Account }: SellProps) {
  const quantityInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const percentArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const leftQuantity =
    Account.assetsList.filter((item) => item.market === CoinInfo.market)[0]
      ?.quantity ?? 0;

  const sellButtonElement = useSellButtonClick(
    quantity,
    CoinInfo,
    Account,
    dispatch,
    quantityInput,
    leftQuantity
  );

  const onQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (leftQuantity < Number(e.target?.value)) {
      e.target.value = e.target.value.slice(0, -1);
    }
    setQuantity(Number(e.target.value));
  };
  const onQuantitySelectorChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const calculatedValue = leftQuantity * Number(Number(e.target.value) / 100);
    if (quantityInput.current)
      quantityInput.current.value = calculatedValue.toFixed(2);
    setQuantity(Number(calculatedValue.toFixed(2)));
  };

  return (
    <div className="Sell">
      <div className="SellForm">
        <p className="QuantityL L">Quantity</p>
        <p className="QuantityV V">{getCommaNumber(leftQuantity)}</p>
        <hr />
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
        <hr />
        <p className="PriceL L">Price</p>
        <p className="PriceV V">{getCommaNumber(CoinInfo.trade_price)}</p>
        <hr />
        <p className="TotalPriceL L">Total Price</p>
        <p className="TotalPriceV V">
          {getCommaNumber(CoinInfo.trade_price * quantity)}
        </p>
        <button className="SellButton" ref={sellButtonElement}>
          Sell
        </button>
      </div>
    </div>
  );
}
