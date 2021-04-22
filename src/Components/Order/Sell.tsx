import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommaNumber } from "../../lib/coinController";
import { RootState } from "../../modules";
import { sellCoin } from "./../../modules/Account";
import { CoinType } from "./../../@types/CommonType";

interface SellProps {
  CoinInfo: CoinType;
}

export function Sell({ CoinInfo }: SellProps) {
  const User = useSelector((state: RootState) => state.Account);
  const Quantity = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);

  const leftQuantity =
    User.assetsList.filter((item) => item.market === CoinInfo.market)[0]
      ?.quantity ?? 0;
  return (
    <div className="Sell">
      <div className="SellForm">
        <p className="QuantityL L">Quantity</p>
        <p className="QuantityV">{getCommaNumber(leftQuantity)}</p>
        <p className="QuantityL L">Quantity</p>
        <input
          ref={Quantity}
          className="QuantityV"
          onChange={(e) => {
            if (leftQuantity < Number(e.target.value)) {
              e.target.value = e.target.value.slice(0, -1);
            }
            setQuantity(Number(e.target.value));
          }}
          type="number"
        />
        <select
          className="QuantitySelector"
          onChange={(e) => {
            const calculatedValue =
              leftQuantity * Number(Number(e.target.value) / 100);
            if (Quantity.current)
              Quantity.current.value = calculatedValue.toFixed(2);
            setQuantity(Number(calculatedValue.toFixed(2)));
          }}
        >
          <option value="">Select</option>
          {Array.from(new Array(20), (x, i) => 5 * (1 + i)).map((i) => (
            <option key={i} value={i}>
              {i}%
            </option>
          ))}
        </select>
        <p className="PriceL L">Price</p>
        <p className="PriceV">{getCommaNumber(CoinInfo.trade_price)}</p>
        <p className="TotalPriceL L">Total Price</p>
        <p className="TotalPriceV">
          {getCommaNumber(CoinInfo.trade_price * quantity)}
        </p>
        <button
          className="SellButton"
          onClick={() => {
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
              if (Quantity.current) Quantity.current.value = "0";
            } else {
              alert("Failed to purchase.");
            }
          }}
        >
          Sell
        </button>
      </div>
    </div>
  );
}
