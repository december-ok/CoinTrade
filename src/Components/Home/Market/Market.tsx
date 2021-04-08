import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../../Modules";
import { MarketListArea } from "./MarketListArea";

export function Market() {
  //0 = Volume, 1=Rise, 2=Fall 3=All
  const Coin = useSelector((state: RootState) => state.Coin);
  const [sort, setSort] = useState(0);

  const rawData = Array.from(Coin.values())
    .map((item) => {
      return item.change_rate;
    })
    .sort((a, b) => a - b);
  const chartData = {
    labels: rawData.map(() => ""),
    datasets: [
      {
        backgroundColor: rawData.map((item) => {
          if (item >= 0) {
            return "#FF4B4B";
          }
          return "#3555FF";
        }),
        data: rawData.map((item) => Math.abs(item)),
      },
    ],
  };
  const chartOptions = {
    // title: {
    //   display: true,
    //   text: "Market Overview",
    //   fontSize: 16,
    //   fontColor: "#000",
    //   fontStyle: "bold",
    // },
    animation: {
      duration: 0,
    },
    tooltips: { enabled: false },
    hover: { mode: null },
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          display: false,
        },
      ],
      xAxes: [{ display: false }],
    },
  };

  const marketListFadeAway = (num: number) => {
    document.querySelector(".MarketListArea")?.classList.add("fadeAway");
    setTimeout(() => {
      setSort(num);
      document.querySelector(".MarketListArea")?.classList.remove("fadeAway");
    }, 250);
  };

  const onVolume = () => {
    if (sort !== 0) {
      document.querySelectorAll(".MarketSorter p").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".VolumeP")?.classList.remove("inActive");

      marketListFadeAway(0);
    }
  };
  const onRise = () => {
    if (sort !== 1) {
      document.querySelectorAll(".MarketSorter p").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".RiseP")?.classList.remove("inActive");

      marketListFadeAway(1);
    }
  };
  const onFall = () => {
    if (sort !== 2) {
      document.querySelectorAll(".MarketSorter p").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".FallP")?.classList.remove("inActive");

      marketListFadeAway(2);
    }
  };
  const onAll = () => {
    if (sort !== 3) {
      document.querySelectorAll(".MarketSorter p").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".AllP")?.classList.remove("inActive");

      marketListFadeAway(3);
    }
  };

  const riseReducer = (accumulator: number, currentValue: number) => {
    if (currentValue > 0) return accumulator + 1;
    return accumulator;
  };
  const fallReducer = (accumulator: number, currentValue: number) => {
    if (currentValue < 0) return accumulator + 1;
    return accumulator;
  };
  const normalReducer = (accumulator: number, currentValue: number) => {
    if (currentValue === 0) return accumulator + 1;
    return accumulator;
  };
  return (
    <div className="Market">
      <div className="MarketOverview">
        <p className="MarketOverviewLabel">Market Overview</p>
        <div className="MarketOverviewContent">
          <Bar data={chartData} options={chartOptions} height={100} />
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
          <p className="VolumeP">Volume</p>
        </button>
        <button onClick={onRise}>
          <p className="RiseP inActive">Rise</p>
        </button>
        <button onClick={onFall}>
          <p className="FallP inActive">Fall</p>
        </button>
        <button onClick={onAll}>
          <p className="AllP inActive">Search</p>
        </button>
      </div>
      <MarketListArea sortType={sort} />
    </div>
  );
}
