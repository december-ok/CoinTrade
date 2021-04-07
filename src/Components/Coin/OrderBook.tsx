import { getChangeRate, getCommaNumber } from "../../Controller/CoinController";
import { CoinType } from "../CommonType";

export default function OrderBook({ CoinInfo }: { CoinInfo: CoinType }) {
  return (
    <div className="OrderBook">
      {!CoinInfo.order_book && (
        <div className="OrderBookLoading">
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
                <div className="AskBlock">
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
                  <div className="PriceBlock">
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
                <div className="PriceBlock">
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
          </div>
          <div className="BidArea">
            <div className="OverBid"></div>
            {CoinInfo.order_book?.orderbook_units.map((item) => (
              <div className="BidBlock">
                <p className="Size">{getCommaNumber(item.bid_size)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
