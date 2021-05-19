import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAccountData } from "../App";
import { getCommaNumber, getIntCommaNumber } from "../lib/coinController";
import { RootState } from "../modules";
import { AssetType, initialState, initialUpdate } from "../modules/Account";
import { getChangeRate } from "../lib/coinController";
import { AssetBlock } from "./MyAsset/AssetBlock";
import { CoinType } from "../types/CommonType";

export default function MyAsset() {
  const User = useSelector((state: RootState) => state.Account);
  const Coin = useSelector((state: RootState) => state.Coin);
  const dispatch = useDispatch();
  const priceSelector = useRef<HTMLDivElement>(null);

  const onResetAsset = () => {
    const randNumber = Math.random().toString(10).substr(2, 4);
    if (
      randNumber === prompt(`If you want to RESET ASSET, enter ${randNumber}.`)
    ) {
      dispatch(initialUpdate(initialState));
      saveAccountData(initialState);
      alert("Asset has been RESET!");
    }
  };

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
    <div className="MyAsset">
      <div className="MyAssetValueArea">
        <div className="MyAssetValueAreaHeader">
          <p className="MyAssetValueLabel">My Asset Value</p>
          <p className="MyAssetReset" onClick={onResetAsset}>
            🔄Reset Asset
          </p>
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
      <div className="MyAssetListArea">
        <p className="MyAssetListLabel">My Asset List</p>
        <div className="MyAssetList">
          {Boolean(User.won) && (
            <div className="Won">
              <img
                className="WonImg"
                alt="SimSaImDang"
                src={
                  "https://www.choicenews.co.kr/news/photo/201904/49676_27900_144.jpg"
                }
              />
              <div className="Info">
                <p className="WonLabel">Korean Won</p>
                <p className="WonTicker">KRW</p>
              </div>
              <p className="WonPrice">{getCommaNumber(User.won)}</p>
            </div>
          )}
          {User.assetsList
            .sort(
              (b, a) =>
                a.quantity * (Coin.get(a.market) as CoinType).trade_price -
                b.quantity * (Coin.get(b.market) as CoinType).trade_price
            )
            .map((item) => (
              <AssetBlock
                coin={Coin.get(item.market) as CoinType}
                asset={item}
                key={item.market}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
