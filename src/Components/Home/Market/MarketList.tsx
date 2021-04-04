import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Modules";
import { CoinType } from "../../CommonType";
import { CoinBlock } from "./CoinBlock";
import { MarketListType } from "../HomeInterface";

export const MarketList = React.memo(({ sortType }: MarketListType) => {
  const Coin = useSelector((state: RootState) => state.Coin);

  useEffect(() => {
    document.querySelector(".MarketList")?.classList.remove("fadeAway");
  }, []);

  return (
    <div className="MarketList fadeAway">
      {SortCoins(sortType, Array.from(Coin.values()) as CoinType[]).map(
        (item) => (
          <CoinBlock coin={item} key={item.market} />
        )
      )}
    </div>
  );
});

function SortCoins(sortType: number, coinList: CoinType[]): CoinType[] {
  let returnCoins;
  if (sortType === 0) {
    returnCoins = coinList.sort((b, a) => {
      return a.acc_trade_price_24h - b.acc_trade_price_24h;
    });
  } else if (sortType === 1) {
    returnCoins = coinList.sort((a, b) => {
      return b.change_rate - a.change_rate;
    });
  } else if (sortType === 2) {
    returnCoins = coinList.sort((a, b) => {
      return a.change_rate - b.change_rate;
    });
  } else {
    returnCoins = coinList.sort((a, b) => {
      if (a.english_name < b.english_name) return -1;
      else if (a.english_name > b.english_name) return 1;
      else return 0;
    });
  }
  return returnCoins.splice(0, 3);
  // return returnCoins;
}
