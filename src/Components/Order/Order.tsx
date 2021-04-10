import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CoinType } from "../../@types/CommonType";
import {
  getChangeRate,
  getCommaNumber,
  getDetailData,
} from "../../Controller/CoinController";
import { RootState } from "../../Modules";
import { setMarket } from "../../Modules/Client";
import { Buy } from "./Buy";
import { Sell } from "./Sell";

export function Order() {
  const Client = useSelector((state: RootState) => state.Client);
  const Coin = useSelector((state: RootState) => state.Coin);
  const CoinInfo = Coin.get(Client.market) as CoinType;
  const dispatch = useDispatch();
  const [searching, setSearching] = useState(false);
  const [orderType, setOrderType] = useState(0);
  const CoinSelector = useRef<any>(null);
  const Dropdown = useRef<any>(null);
  const CoinDetailSocket = useRef<any>(null);

  const changeColor =
    CoinInfo.change === "RISE"
      ? "#FF4B4B"
      : CoinInfo.change === "FALL"
      ? "#3555FF"
      : "#000000";

  const OrderContentFadeAway = (selectedOrderType: number) => {
    document.querySelector(".OrderContentBody")?.classList.add("fadeAway");
    setTimeout(() => {
      setOrderType(selectedOrderType);
      document.querySelector(".OrderContentBody")?.classList.remove("fadeAway");
    }, 250);
  };
  const onBuyClick = () => {
    if (orderType !== 0) {
      document.querySelectorAll(".OrderSelector p").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".BuyP")?.classList.remove("inActive");

      OrderContentFadeAway(0);
    }
  };
  const onSellClick = () => {
    if (orderType !== 1) {
      document.querySelectorAll(".OrderSelector p").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".SellP")?.classList.remove("inActive");

      OrderContentFadeAway(1);
    }
  };
  useEffect(() => {
    CoinSelector.current.value = CoinInfo.english_name;
  }, [CoinInfo.english_name]);
  useEffect(() => {
    document.title =
      CoinInfo.english_name + " " + getCommaNumber(CoinInfo.trade_price);
  }, [CoinInfo.trade_price, CoinInfo.english_name]);

  useEffect(() => {
    (async () => {
      CoinDetailSocket.current = await getDetailData(Client.market);
    })();

    return () => {
      CoinDetailSocket.current.close();
    };
  }, [Client.market]);

  return (
    <div className="Order">
      <div className="ContentTitle">
        <h1>Order</h1>
      </div>
      <div className="Content">
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
                          dispatch(setMarket(item.market));
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
        <div className="OrderContent">
          <div className="OrderSelector">
            <button onClick={onBuyClick}>
              <p className="BuyP">Buy</p>
            </button>
            <button onClick={onSellClick}>
              <p className="SellP inActive">Sell</p>
            </button>
          </div>
          <div className="OrderContentBody">
            {orderType === 0 && <Buy CoinInfo={CoinInfo} />}
            {orderType === 1 && <Sell CoinInfo={CoinInfo} />}
          </div>
        </div>
      </div>
    </div>
  );
}
