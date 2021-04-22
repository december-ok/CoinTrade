import { useEffect, useState } from "react";
import { Market } from "./Market";
import { MyAsset } from "./MyAsset";

export const Home: React.FC = () => {
  const [isMarket, setIsMarket] = useState(true);
  const [fadeAway, setFadeAway] = useState(true);

  const HomeMenuFadeAway = (isMarket: boolean) => {
    setFadeAway(true);
    setTimeout(() => {
      setIsMarket(isMarket);
      setFadeAway(false);
    }, 250);
  };

  const onMarketClick = () => {
    if (!isMarket) HomeMenuFadeAway(true);
  };
  const onAssetClick = () => {
    if (isMarket) HomeMenuFadeAway(false);
  };

  useEffect(() => {
    setFadeAway(false);
    document.title = "CoinTrade";
  }, []);

  return (
    <div className="Home">
      <div className="ContentTitle">
        <h1>Home</h1>
      </div>
      <div className="Content">
        <div className="HomeMenu">
          <button onClick={onMarketClick}>
            <p className={"MarketP" + (isMarket ? "" : " inActive")}>Market</p>
          </button>
          <button onClick={onAssetClick}>
            <p className={"MyAssetP" + (!isMarket ? "" : " inActive")}>
              My Asset
            </p>
          </button>
        </div>
        <div className={"HomeContent" + (fadeAway ? " fadeAway" : "")}>
          {isMarket && <Market />}
          {!isMarket && <MyAsset />}
        </div>
      </div>
    </div>
  );
};
