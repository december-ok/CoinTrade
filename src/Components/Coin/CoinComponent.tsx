import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getChangeRate, getCommaNumber } from "../../Controller/CoinController";
import { RootState } from "../../Modules";
import { CoinType } from "../CommonType";

export function CoinComponent({
  market,
  setMarket,
}: {
  market: string;
  setMarket: Function;
}) {
  const Coin = useSelector((state: RootState) => state.Coin);
  const CoinInfo = Coin.get(market) as CoinType;
  const [searching, setSearching] = useState(false);
  const CoinSelector = useRef<any>(null);

  const changeColor =
    CoinInfo.change === "RISE"
      ? "#FF4B4B"
      : CoinInfo.change === "FALL"
      ? "#3555FF"
      : "#000000";

  useEffect(() => {
    CoinSelector.current.value = CoinInfo.english_name;
  }, []);

  const outBlur = (e: any) => {
    e.target.value = CoinInfo.english_name;
    setTimeout(() => {
      setSearching(false);
    }, 250);
  };
  return (
    <div className="Coin">
      <div className="ContentTitle">
        <h1>Coin</h1>
      </div>
      <div className="Content">
        <div className="CoinInfo">
          <div className="CoinInfoHeader">
            <img
              alt="CoinImg"
              src={`https://static.upbit.com/logos/${market.substring(4)}.png`}
            />
            <input
              className="CoinSelector"
              ref={CoinSelector}
              onFocus={(e) => {
                e.target.value = "";
                setSearching(true);
              }}
              onBlur={outBlur}
            />
            <div className="DropdownMenu">
              {searching &&
                Array.from(Coin.values())
                  .filter((item: any) => {
                    const lowerSearch = CoinSelector.current.value.toLowerCase();
                    return (
                      item.english_name.toLowerCase().includes(lowerSearch) ||
                      item.korean_name.includes(lowerSearch) ||
                      item.market.substr(4).toLowerCase().includes(lowerSearch)
                    );
                  })
                  .map((item: any) => (
                    <div
                      className="DropdownCoinBlock"
                      key={item.market}
                      onClick={(e: any) => {
                        setMarket(item.market);
                        CoinSelector.current.value = item.english_name;
                      }}
                    >
                      <img
                        src={`https://static.upbit.com/logos/${item.market.substring(
                          4
                        )}.png`}
                      />
                      <p className="CoinName">{item.english_name}</p>
                    </div>
                  ))}
            </div>
          </div>
          <div className="CoinInfoBody" style={{ color: changeColor }}>
            <p className="CoinPrice">{getCommaNumber(CoinInfo.trade_price)}</p>
            <div className="CoinChangeInfo">
              <p className="CoinChangePrice">
                {CoinInfo.change === "RISE" && "+"}
                {getCommaNumber(CoinInfo.change_price)}
              </p>
              <p className="CoinChangeRate">
                {CoinInfo.change === "RISE" && "+"}
                {getChangeRate(CoinInfo.change_rate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
