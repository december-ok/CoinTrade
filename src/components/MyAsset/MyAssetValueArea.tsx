import ResetButton from "./ResetButton";
import { useRef } from "react";
import { AccountState, AssetType } from "../../modules/Account";
import { CoinType } from "../../types/CommonType";
import { getIntCommaNumber } from "../../lib/coinController";
import { getChangeRate } from "./../../lib/coinController";
import { CoinState } from "../../modules/Coin";

interface MyAssetValueProps {
  Coin: CoinState;
  User: AccountState;
}

export default function MyAssetValueArea({ Coin, User }: MyAssetValueProps) {
  const priceSelector = useRef<HTMLDivElement>(null);

  const sumReducer = (a: number, b: number) => a + b;
  const totalValue =
    User.won +
    User.assetsList
      .map(
        (item: AssetType) =>
          item.quantity * (Coin.get(item.market) as CoinType).trade_price
      )
      .reduce(sumReducer, 0);
  const changePrice = totalValue - User.startValue;
  const changeRate = changePrice / User.startValue;

  if (priceSelector.current)
    priceSelector.current.style.color =
      changePrice > 0 ? "#FF4B4B" : changePrice < 0 ? "#3555FF" : "#000000";

  return (
    <div className="MyAssetValueArea">
      <div className="MyAssetValueAreaHeader">
        <p className="MyAssetValueLabel">My Asset Value</p>
        <ResetButton />
      </div>
      <div className="MyAssetValueAreaBody" ref={priceSelector}>
        <p className="MyAssetValue">{getIntCommaNumber(totalValue)}</p>
        <div className="MyAssetValueInfo">
          <p className="MyAssetChangePrice">
            {changePrice > 0 && "+"}
            {getIntCommaNumber(changePrice)}
          </p>
          <p className="MyAssetChangeRate">
            {changePrice > 0 && "+"}
            {getChangeRate(changeRate)}
          </p>
        </div>
      </div>
    </div>
  );
}
