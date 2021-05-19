import React, { CSSProperties } from "react";
import { useDispatch } from "react-redux";
import {
  getChangeRate,
  getCommaNumber,
  getIntCommaNumber,
} from "../../lib/coinController";
import { setContentWrapFadeOut, setMarket } from "../../modules/Client";
import { setMenu } from "../../modules/Client";
import { CoinType } from "../../types/CommonType";

interface AssetBlockProps {
  coin: CoinType;
  asset: {
    quantity: number;
    averagePrice: number;
  };
}

export const AssetBlock = React.memo(
  ({
    coin: { market, english_name, trade_price, change: lastChange },
    asset: { quantity, averagePrice },
  }: AssetBlockProps) => {
    const dispatch = useDispatch();
    const totalPrice = quantity * trade_price;
    const startPrice = quantity * averagePrice;

    const change = totalPrice - startPrice;

    const color = change > 0 ? "#FF4B4B" : change < 0 ? "#3555FF" : "#000000";
    const lastColor =
      lastChange === "RISE"
        ? "#FF4B4B"
        : lastChange === "FALL"
        ? "#3555FF"
        : "#000000";

    const navigationFadeAway = (market: string) => {
      dispatch(setContentWrapFadeOut(true));
      setTimeout(() => {
        dispatch(setMarket(market));
        dispatch(setMenu(1));
        dispatch(setContentWrapFadeOut(false));
      }, 250);
    };
    return (
      <div
        className="AssetBlock"
        onClick={() => {
          navigationFadeAway(market);
        }}
      >
        <div className="AssetBlockHeader">
          <img
            alt="CoinImage"
            className="AssetBlockImg"
            src={`https://static.upbit.com/logos/${market.substring(4)}.png`}
          />
          <div className="Info">
            <p className="AssetName">{english_name}</p>
            <p className="AssetTicker">{market.substring(4)}</p>
          </div>
          <div className="Summary" style={{ color } as CSSProperties}>
            <p className="TotalPrice">{getIntCommaNumber(totalPrice)}</p>
            <p className="Quantity">
              {getCommaNumber(quantity) + " " + market.substr(4)}
            </p>
          </div>
        </div>
        <div className="AssetBlockBody" style={{ color } as CSSProperties}>
          <p className="Label">{"P&L"}</p>
          <p className="Value">
            {change > 0 && "+"}
            {getCommaNumber(change)}
          </p>
          <p className="Label">{"Last"}</p>
          <p className="Value" style={{ color: lastColor } as CSSProperties}>
            {getCommaNumber(trade_price)}
          </p>
          <p className="Label">{"P&L%"}</p>
          <p className="Value">
            {change > 0 && "+"}
            {getChangeRate(change / startPrice)}
          </p>
          <p className="Label">{"Avg"}</p>
          <p className="Value Avg">{getCommaNumber(averagePrice)}</p>
        </div>
      </div>
    );
  }
);
