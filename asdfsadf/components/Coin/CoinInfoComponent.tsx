import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { setMarket } from "../../modules/Client";
import { getCommaNumber, getChangeRate } from "../../lib/coinController";
import { CoinType } from "../../types/CommonType";

export interface CoinInfoComponentProps {
  setFadeAway: Function;
}

export const CoinInfoComponent = ({ setFadeAway }: CoinInfoComponentProps) => {
  const Coin = useSelector((state: RootState) => state.Coin);
  const Client = useSelector((state: RootState) => state.Client);
  const CoinInfo = Coin.get(Client.market) as CoinType;
  const dispatch = useDispatch();

  const [searching, setSearching] = useState(false);
  const CoinSelector = useRef<HTMLInputElement>(null);
  const Dropdown = useRef<HTMLDivElement>(null);
  const changeColor =
    CoinInfo.change === "RISE"
      ? "#FF4B4B"
      : CoinInfo.change === "FALL"
      ? "#3555FF"
      : "#000000";

  useEffect(() => {
    if (CoinSelector.current)
      CoinSelector.current.value = CoinInfo.english_name;
  }, [CoinInfo.english_name]);
  useEffect(() => {
    document.title =
      CoinInfo.english_name + " " + getCommaNumber(CoinInfo.trade_price);
  }, [CoinInfo.trade_price, CoinInfo.english_name]);
  return (
    <div className="CoinInfo">
      <div className="CoinInfoHeader">
        <img
          alt="CoinImg"
          src={`https://static.upbit.com/logos/${Client.market.substring(
            4
          )}.png`}
        />
        <input
          className="CoinSelector"
          ref={CoinSelector}
          onFocus={(e) => {
            e.target.value = "";
            if (Dropdown.current) Dropdown.current.classList.add("Show");
            setSearching(true);
          }}
          onBlur={() => {
            if (CoinSelector.current)
              CoinSelector.current.value = CoinInfo.english_name;
            if (Dropdown.current) Dropdown.current.classList.remove("Show");
            setTimeout(() => {
              setSearching(false);
            }, 250);
          }}
        />
        <div className="DropdownMenu" ref={Dropdown}>
          {searching &&
            Array.from(Coin.values())
              .filter((item: CoinType) => {
                const lowerSearch =
                  CoinSelector.current?.value.toLowerCase() || "";
                return (
                  item.english_name.toLowerCase().includes(lowerSearch) ||
                  item.korean_name.includes(lowerSearch) ||
                  item.market.substr(4).toLowerCase().includes(lowerSearch)
                );
              })
              .map((item: CoinType) => (
                <button
                  className="DropdownCoinBlock"
                  key={item.market}
                  onMouseDown={() => {
                    setFadeAway(true);
                    setTimeout(() => {
                      dispatch(setMarket(item.market));
                      setFadeAway(false);
                    }, 250);
                  }}
                >
                  <img
                    alt="CoinImg"
                    src={`https://static.upbit.com/logos/${item.market.substring(
                      4
                    )}.png`}
                  />
                  <p className="CoinName">{item.english_name}</p>
                </button>
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
  );
};
