import { useEffect, useState } from "react";
import { Market } from "./Market/Market";
import { MyAsset } from "./MyAsset/MyAsset";

export function Home() {
  const [isMarket, setIsMarket] = useState(true);

  const HomeMenuFadeAway = (isMarket: boolean) => {
    document.querySelector(".HomeContent")?.classList.add("fadeAway");
    setTimeout(() => {
      setIsMarket(isMarket);
      document.querySelector(".HomeContent")?.classList.remove("fadeAway");
    }, 250);
  };
  const onMarketClick = () => {
    if (!isMarket) {
      document.querySelectorAll(".HomeMenu p").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".MarketP")?.classList.remove("inActive");

      HomeMenuFadeAway(true);
    }
  };
  const onAssetClick = () => {
    if (isMarket) {
      document.querySelectorAll(".HomeMenu p").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".MyAssetP")?.classList.remove("inActive");

      HomeMenuFadeAway(false);
    }
  };

  useEffect(() => {
    document.querySelector(".HomeContent")?.classList.remove("fadeAway");
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
            <p className="MarketP">Market</p>
          </button>
          <button onClick={onAssetClick}>
            <p className="MyAssetP inActive">My Asset</p>
          </button>
        </div>
        <div className="HomeContent fadeAway">
          {isMarket && <Market />}
          {!isMarket && <MyAsset />}
        </div>
      </div>
    </div>
  );
}
