import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  getChangeRate,
  getCommaNumber,
} from "../../../Controller/CoinController";
import { RootState } from "../../../Modules";
import { CoinType } from "../../CommonType";

export const CoinBlock = React.memo(
  ({
    coin: {
      market,
      change,
      english_name,
      trade_price,
      change_price,
      change_rate,
    },
  }: any) => {
    const priceSelector = useRef<HTMLDivElement>(null);
    const Coin: CoinType | any = useSelector((state: RootState) => state.Coin);

    useEffect(() => {
      if (priceSelector.current) {
        // console.log(priceSelector.current.style.color);
        if (change === "RISE") {
          priceSelector.current.style.color = "#FF4B4B";
        } else if (change === "FALL") {
          priceSelector.current.style.color = "#3555FF";
        } else {
          priceSelector.current.style.color = "#000000";
        }
      }
    }, [Coin, change]);

    return (
      <div className="CoinBlock">
        <img
          alt="CoinImage"
          className="CoinBlockImg"
          src={`https://static.upbit.com/logos/${market.substring(4)}.png`}
        />
        <div className="Info">
          <p className="CoinName">{english_name}</p>
          <p className="CoinTicker">{market.substring(4)}</p>
        </div>
        <div className="Price" ref={priceSelector}>
          <p className="CoinPrice">{getCommaNumber(trade_price)}</p>
          <p className="CoinChangePrice">
            {change === "RISE" && "+"}
            {getCommaNumber(change_price)}
          </p>
          <p className="CoinChangeRate">
            {change === "RISE" && "+"}
            {getChangeRate(change_rate)}
          </p>
        </div>
      </div>
    );
  }
);
