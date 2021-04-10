import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommaNumber } from "../../Controller/CoinController";
import { RootState } from "../../Modules";
import { buyCoin } from "../../Modules/User";

export function Buy({ CoinInfo }: any) {
  const User = useSelector((state: RootState) => state.User);
  const Quantity = useRef<any>();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="Buy">
      <div className="BuyForm">
        <p className="CashL L">Cash</p>
        <p className="CashV">{getCommaNumber(User.won)}</p>
        <p className="QuantityL L">Quantity</p>
        <input
          ref={Quantity}
          className="QuantityV"
          onChange={(e) => {
            //eslint-disable-next-line
            if (!/^(\d*)[\.]?(\d{1,2})?$/g.test(e.target.value)) {
              e.target.value = e.target.value.slice(0, -1);
            }
            if (Number(e.target.value) * CoinInfo.trade_price > User.won) {
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
              (User.won / CoinInfo.trade_price) *
              0.98 *
              Number(Number(e.target.value) / 100);
            Quantity.current.value = calculatedValue.toFixed(2);
            setQuantity(Number(calculatedValue.toFixed(2)));
          }}
        >
          <option value="">Select</option>
          {Array.from(new Array(20), (x, i) => 5 * (1 + i)).map((i) => (
            <option value={i}>{i}%</option>
          ))}
        </select>
        <p className="PriceL L">Price</p>
        <p className="PriceV">{getCommaNumber(CoinInfo.trade_price)}</p>
        <p className="TotalPriceL L">Total Price</p>
        <p className="TotalPriceV">
          {getCommaNumber(CoinInfo.trade_price * quantity)}
        </p>
        <button
          className="BuyButton"
          onClick={() => {
            if (!quantity) {
              alert("Select Quantity.");
            } else if (quantity * CoinInfo.trade_price <= User.won) {
              dispatch(
                buyCoin({
                  market: CoinInfo.market,
                  averagePrice: CoinInfo.trade_price,
                  quantity,
                })
              );
              alert("The purchase has been Successfully concluded.");
              Quantity.current.value = "0";
            } else {
              alert("Failed to purchase.");
            }
          }}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
