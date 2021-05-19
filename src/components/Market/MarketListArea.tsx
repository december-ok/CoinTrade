import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import { CoinType } from "../../types/CommonType";
import { CoinBlock } from "./CoinBlock";

export interface MarketListAreaProps {
  fadeAway: boolean;
  setFadeAway: Function;
  sortType: number;
}

export const MarketListArea = React.memo(
  ({ sortType, fadeAway, setFadeAway }: MarketListAreaProps) => {
    const Coin = useSelector((state: RootState) => state.Coin);
    const [search, setSearch] = useState("");

    const ShowList = SortCoins(
      sortType,
      Array.from(Coin.values()) as CoinType[]
    );
    useEffect(() => {
      setFadeAway(false);
    }, [setFadeAway]);

    return (
      <div className={"MarketListArea" + (fadeAway ? " fadeAway" : "")}>
        {sortType === 3 && (
          <input
            className="MarketSearch"
            value={search}
            placeholder={"Search Coin..."}
            onChange={({ target: { value } }) => {
              setSearch(value);
            }}
          />
        )}
        <div className="MarketList">
          {sortType < 3 &&
            ShowList.map((item) => <CoinBlock coin={item} key={item.market} />)}
          {sortType === 3 &&
            ShowList.filter((item) => {
              const lowerSearch = search.toLowerCase();
              return (
                item.english_name.toLowerCase().includes(lowerSearch) ||
                item.korean_name.includes(lowerSearch) ||
                item.market.substr(4).toLowerCase().includes(lowerSearch)
              );
            }).map((item) => <CoinBlock coin={item} key={item.market} />)}
        </div>
      </div>
    );
  }
);

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
      if (a.english_name.toLowerCase() < b.english_name.toLowerCase())
        return -1;
      else if (a.english_name.toLowerCase() > b.english_name.toLowerCase())
        return 1;
      else return 0;
    });
    return returnCoins;
  }
  return returnCoins.splice(0, 10);
}
