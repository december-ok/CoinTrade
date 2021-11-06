import { useState } from "react";
import { useSelector } from "react-redux";
import Buy from "./Order/Buy";
import { RootState } from "../modules";
import Sell from "./Order/Sell";
import { CoinInfoComponent } from "./Coin/CoinInfoComponent";
import { CoinType } from "../types/CommonType";
import MyAsset from "./MyAsset";

export default function Order() {
  const { Coin, Client, Account } = useSelector((state: RootState) => state);
  const CoinInfo = Coin.get(Client.market) as CoinType;
  const [orderType, setOrderType] = useState(0);
  const [fadeAway, setFadeAway] = useState(false);
  const [contentFadeAway, setContentFadeAway] = useState(false);

  const OrderContentFadeAway = (selectedOrderType: number) => {
    setFadeAway(true);
    setTimeout(() => {
      setOrderType(selectedOrderType);
      setFadeAway(false);
    }, 250);
  };
  const onBuyClick = () => {
    if (orderType !== 0) OrderContentFadeAway(0);
  };
  const onSellClick = () => {
    if (orderType !== 1) OrderContentFadeAway(1);
  };
  const onAssetClick = () => {
    if (orderType !== 2) OrderContentFadeAway(2);
  };

  return (
    <div className="Order">
      <div className="ContentTitle">
        <h1>Order</h1>
      </div>
      <div className={"Content" + (contentFadeAway ? " fadeAway" : "")}>
        <CoinInfoComponent setFadeAway={setContentFadeAway} />
        <div className="OrderContent">
          <div className="OrderSelector">
            <button onClick={onBuyClick}>
              <p className={"BuyP" + (orderType !== 0 ? " inActive" : "")}>
                Buy
              </p>
            </button>
            <button onClick={onSellClick}>
              <p className={"SellP" + (orderType !== 1 ? " inActive" : "")}>
                Sell
              </p>
            </button>
            <button onClick={onAssetClick}>
              <p className={"MyAssetP" + (orderType !== 2 ? " inActive" : "")}>
                My Asset
              </p>
            </button>
          </div>
          <div className={"OrderContentBody" + (fadeAway ? " fadeAway" : "")}>
            {orderType === 0 && <Buy CoinInfo={CoinInfo} Account={Account} />}
            {orderType === 1 && <Sell CoinInfo={CoinInfo} Account={Account} />}
            {orderType === 2 && <MyAsset />}
          </div>
        </div>
      </div>
    </div>
  );
}
