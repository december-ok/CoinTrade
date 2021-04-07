import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getChangeRate,
  getCommaNumber,
  getDetailData,
} from "../../Controller/CoinController";
import { RootState } from "../../Modules";
import { CoinType } from "../CommonType";
import OrderBook from "./OrderBook";

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
  const [contentMenu, setContentMenu] = useState(0);
  const CoinSelector = useRef<any>(null);
  const Dropdown = useRef<any>(null);
  const CoinDetailSocket = useRef<any>(null);

  const CoinContentFadeAway = (contentMenu: number) => {
    document.querySelector(".CoinContentBody")?.classList.add("fadeAway");
    setTimeout(() => {
      setContentMenu(contentMenu);
      document.querySelector(".CoinContentBody")?.classList.remove("fadeAway");
    }, 250);
  };
  const onOrderBookClick = () => {
    if (contentMenu !== 0) {
      document.querySelectorAll(".CoinContentSelector p").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".OrderBookP")?.classList.remove("inActive");

      CoinContentFadeAway(0);
    }
  };
  const onChartClick = () => {
    if (contentMenu !== 1) {
      document.querySelectorAll(".CoinContentSelector p").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".ChartP")?.classList.remove("inActive");

      CoinContentFadeAway(1);
    }
  };

  const changeColor =
    CoinInfo.change === "RISE"
      ? "#FF4B4B"
      : CoinInfo.change === "FALL"
      ? "#3555FF"
      : "#000000";

  useEffect(() => {
    CoinSelector.current.value = CoinInfo.english_name;
  }, [CoinInfo.english_name]);

  useEffect(() => {
    (async () => {
      CoinDetailSocket.current = await getDetailData(market);
    })();
    return () => {
      CoinDetailSocket.current.close();
    };
  }, [market]);

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
                Dropdown.current.classList.add("Show");
                setSearching(true);
              }}
              onBlur={() => {
                CoinSelector.current.value = CoinInfo.english_name;
                Dropdown.current.classList.remove("Show");
                setTimeout(() => {
                  setSearching(false);
                }, 250);
              }}
            />
            <div className="DropdownMenu" ref={Dropdown}>
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
                    <button
                      className="DropdownCoinBlock"
                      key={item.market}
                      onMouseDown={() => {
                        document
                          .querySelector(".Content")
                          ?.classList.add("fadeAway");
                        setTimeout(() => {
                          setMarket(item.market);
                          document
                            .querySelector(".Content")
                            ?.classList.remove("fadeAway");
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
        <div className="CoinContent">
          <div className="CoinContentSelector">
            <button onClick={onOrderBookClick}>
              <p className="OrderBookP" style={{ width: "90px" }}>
                Order Book
              </p>
            </button>
            <button onClick={onChartClick}>
              <p className="ChartP inActive">Chart</p>
            </button>
          </div>
          <div className="CoinContentBody">
            {contentMenu === 0 && <OrderBook CoinInfo={CoinInfo} />}
            {contentMenu === 1 && "Chart"}
          </div>
        </div>
      </div>
    </div>
  );
}
