import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChangeRate, getCommaNumber } from "../../lib/CoinController";
import { CoinType } from "../../@types/CommonType";
import { RootState } from "../../Modules";
import { setContentWrapFadeOut, setMarket } from "../../Modules/Client";
import { setMenu } from "./../../Modules/Client";

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
    const dispatch = useDispatch();

    const navigationFadeAway = (market: string) => {
      dispatch(setContentWrapFadeOut(true));
      setTimeout(() => {
        dispatch(setMarket(market));
        dispatch(setMenu(1));
        dispatch(setContentWrapFadeOut(false));
      }, 250);
    };

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
      <div
        className="CoinBlock"
        onClick={() => {
          navigationFadeAway(market);
        }}
      >
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
