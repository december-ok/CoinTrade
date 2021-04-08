import { getChangeRate, getCommaNumber } from "../../Controller/CoinController";
import { CoinType } from "../CommonType";

export default function OrderBook({ CoinInfo }: { CoinInfo: CoinType }) {
  let totalMax: number;
  if (CoinInfo.order_book) {
    totalMax = Math.max(
      ...CoinInfo.order_book.orderbook_units
        .map((item) => item.ask_size)
        .concat(
          CoinInfo.order_book.orderbook_units.map((item) => item.bid_size)
        )
    );
  }
  return (
    <div className="OrderBook">
      {!CoinInfo.order_book && (
        <div className="Loading">
          <i className="fas fa-circle-notch fa-spin"></i>
        </div>
      )}
      {CoinInfo.order_book && (
        <div className="OrderBookLoaded">
          <p className="AskLabel Label">Ask</p>
          <p className="PriceLabel Label">Price</p>
          <p className="BidLabel Label">Bid</p>
          <div className="AskArea">
            {CoinInfo.order_book?.orderbook_units
              .slice(0)
              .reverse()
              .map((item) => (
                <div
                  key={item.ask_price}
                  className="AskBlock"
                  style={{
                    background: `linear-gradient(90deg, transparent ${
                      100 - (item.ask_size / totalMax) * 100
                    }%, rgba(155,171,255,1) ${
                      100 - (item.ask_size / totalMax) * 100
                    }%)`,
                  }}
                >
                  <p className="Size">{getCommaNumber(item.ask_size)}</p>
                </div>
              ))}
            <div className="UnderAsk"></div>
          </div>
          <div className="PriceArea">
            {CoinInfo.order_book?.orderbook_units
              .slice(0)
              .reverse()
              .map((item) => {
                const changePrice =
                  item.ask_price - CoinInfo.prev_closing_price;
                const color =
                  changePrice > 0
                    ? "#FF4B4B"
                    : changePrice < 0
                    ? "#3555FF"
                    : "#000000";
                return (
                  <div className="PriceBlock" key={item.ask_price}>
                    <p className="Price" style={{ color }}>
                      {getCommaNumber(item.ask_price)}
                    </p>
                    <p className="ChangeRate" style={{ color }}>
                      {changePrice > 0 && "+"}
                      {getChangeRate(changePrice / CoinInfo.prev_closing_price)}
                    </p>
                  </div>
                );
              })}
            {CoinInfo.order_book?.orderbook_units.map((item) => {
              const changePrice = item.bid_price - CoinInfo.prev_closing_price;
              const color =
                changePrice > 0
                  ? "#FF4B4B"
                  : changePrice < 0
                  ? "#3555FF"
                  : "#000000";
              return (
                <div className="PriceBlock" key={item.bid_price}>
                  <p className="Price" style={{ color }}>
                    {getCommaNumber(item.bid_price)}
                  </p>
                  <p className="ChangeRate" style={{ color }}>
                    {changePrice > 0 && "+"}
                    {getChangeRate(changePrice / CoinInfo.prev_closing_price)}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="BidArea">
            <div className="OverBid"></div>
            {CoinInfo.order_book?.orderbook_units.map((item) => (
              <div
                key={item.bid_price}
                className="BidBlock"
                style={{
                  background: `linear-gradient(90deg, #ffa3a3 ${
                    (item.bid_size / totalMax) * 100
                  }%, transparent ${(item.bid_size / totalMax) * 100}%)`,
                }}
              >
                <p className="Size">{getCommaNumber(item.bid_size)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
