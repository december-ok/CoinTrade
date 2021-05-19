import { useState } from "react";
import { useSelector } from "react-redux";
import { Buy } from "./Order/Buy";
import { RootState } from "../modules";
import { Sell } from "./Order/Sell";
import { CoinInfoComponent } from "./Coin/CoinInfoComponent";
import { CoinType } from "../types/CommonType";

export default function Order() {
  const Client = useSelector((state: RootState) => state.Client);
  const Coin = useSelector((state: RootState) => state.Coin);
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
              <p className={"BuyP" + (orderType ? " inActive" : "")}>Buy</p>
            </button>
            <button onClick={onSellClick}>
              <p className={"SellP" + (orderType ? "" : " inActive")}>Sell</p>
            </button>
          </div>
          <div className={"OrderContentBody" + (fadeAway ? " fadeAway" : "")}>
            {orderType === 0 && <Buy CoinInfo={CoinInfo} />}
            {orderType === 1 && <Sell CoinInfo={CoinInfo} />}
          </div>
        </div>
      </div>
    </div>
  );
}
