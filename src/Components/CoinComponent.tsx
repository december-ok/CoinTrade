import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../modules";
import { CoinType } from "../@types/CommonType";
import { CoinInfoComponent } from "../components/Coin/CoinInfoComponent";
import OrderBook from "./../components/Coin/OrderBook";
import Chart from "./../components/Coin/Chart";
import { getDetailData } from "../lib/coinController";

export default function CoinComponent() {
  const Coin = useSelector((state: RootState) => state.Coin);
  const Client = useSelector((state: RootState) => state.Client);
  const CoinInfo = Coin.get(Client.market) as CoinType;
  const [contentMenu, setContentMenu] = useState(0);
  const [fadeAway, setFadeAway] = useState(false);
  const [contentFadeAway, setContentFadeAway] = useState(false);
  const CoinDetailSocket = useRef<WebSocket>();

  const CoinContentFadeAway = (contentMenu: number) => {
    setFadeAway(true);
    setTimeout(() => {
      setContentMenu(contentMenu);
      setFadeAway(false);
    }, 250);
  };
  const onOrderBookClick = () => {
    if (contentMenu !== 0) CoinContentFadeAway(0);
  };
  const onChartClick = () => {
    if (contentMenu !== 1) CoinContentFadeAway(1);
  };

  useEffect(() => {
    (async () => {
      CoinDetailSocket.current = await getDetailData(Client.market);
    })();

    return () => {
      if (CoinDetailSocket.current) CoinDetailSocket.current.close();
    };
  }, [Client.market]);

  return (
    <div className="Coin">
      <div className="ContentTitle">
        <h1>Coin</h1>
      </div>
      <div className={"Content" + (contentFadeAway ? " fadeAway" : "")}>
        <CoinInfoComponent setFadeAway={setContentFadeAway} />
        <div className="CoinContent">
          <div className="CoinContentSelector">
            <button onClick={onOrderBookClick}>
              <p
                className={"OrderBookP" + (contentMenu ? " inActive" : "")}
                style={{ width: "90px" }}
              >
                Order Book
              </p>
            </button>
            <button onClick={onChartClick}>
              <p className={"ChartP" + (contentMenu ? "" : " inActive")}>
                Chart
              </p>
            </button>
          </div>
          <div className={"CoinContentBody" + (fadeAway ? " fadeAway" : "")}>
            {contentMenu === 0 && <OrderBook CoinInfo={CoinInfo} />}
            {contentMenu === 1 && <Chart CoinInfo={CoinInfo} />}
          </div>
        </div>
      </div>
    </div>
  );
}
