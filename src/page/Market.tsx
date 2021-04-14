import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../modules";
import { MarketListArea } from "../components/Market/MarketListArea";
import { MarketChart } from "../components/Market/MarketChart";

export function Market() {
  //0 = Volume, 1=Rise, 2=Fall 3=All
  const Coin = useSelector((state: RootState) => state.Coin);
  const [sort, setSort] = useState(0);
  const [fadeAway, setFadeAway] = useState(true);

  const rawData = Array.from(Coin.values())
    .map((item) => item.change_rate)
    .sort((a, b) => a - b);

  const marketListFadeAway = (num: number) => {
    setFadeAway(true);
    setTimeout(() => {
      setSort(num);
      setFadeAway(false);
    }, 250);
  };

  const onVolume = () => {
    if (sort !== 0) marketListFadeAway(0);
  };
  const onRise = () => {
    if (sort !== 1) marketListFadeAway(1);
  };
  const onFall = () => {
    if (sort !== 2) marketListFadeAway(2);
  };
  const onAll = () => {
    if (sort !== 3) marketListFadeAway(3);
  };

  const riseReducer = (accumulator: number, currentValue: number) =>
    currentValue > 0 ? accumulator + 1 : accumulator;
  const fallReducer = (accumulator: number, currentValue: number) =>
    currentValue < 0 ? accumulator + 1 : accumulator;
  const normalReducer = (accumulator: number, currentValue: number) =>
    currentValue === 0 ? accumulator + 1 : accumulator;

  return (
    <div className="Market">
      <div className="MarketOverview">
        <p className="MarketOverviewLabel">Market Overview</p>
        <div className="MarketOverviewContent">
          <MarketChart rawData={rawData} />
          <div className="MarketOverviewLine">
            <div className="MarketRise OBlock">
              <i className="fas fa-arrow-up"></i>
              <p className="Amount">{rawData.reduce(riseReducer, 0)}</p>
            </div>
            <div className="MarketNormal OBlock">
              <i className="fas fa-minus"></i>
              <p className="Amount">{rawData.reduce(normalReducer, 0)}</p>
            </div>
            <div className="MarketFall OBlock">
              <i className="fas fa-arrow-down"></i>
              <p className="Amount">{rawData.reduce(fallReducer, 0)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="MarketSorter">
        <button onClick={onVolume}>
          <p className={"VolumeP" + (sort === 0 ? "" : " inActive")}>Volume</p>
        </button>
        <button onClick={onRise}>
          <p className={"RiseP" + (sort === 1 ? "" : " inActive")}>Rise</p>
        </button>
        <button onClick={onFall}>
          <p className={"FallP" + (sort === 2 ? "" : " inActive")}>Fall</p>
        </button>
        <button onClick={onAll}>
          <p className={"AllP" + (sort === 3 ? "" : " inActive")}>Search</p>
        </button>
      </div>
      <MarketListArea
        sortType={sort}
        fadeAway={fadeAway}
        setFadeAway={setFadeAway}
      />
    </div>
  );
}
