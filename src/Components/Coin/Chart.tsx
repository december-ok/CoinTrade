import { createChart, CrosshairMode } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { getChartData } from "../../lib/CoinController";
import { CoinType } from "../../@types/CommonType";

export default function Chart({ CoinInfo }: { CoinInfo: CoinType }) {
  const [scale, setScale] = useState(0);
  const ChartData = useRef<any>();
  const ChartDataSeries = useRef<any>();
  const Chart = useRef<any>();
  const Updater = useRef<any>();
  //0 1분 1 30분 2 60 3 일 4 주 5 월

  const chartWidth = (document.querySelector(".Coin") as any).offsetWidth;
  const chartHeight = window.screen.height * 0.5;
  useEffect(() => {
    (async () => {
      const receivedData = await getChartData(CoinInfo.market, scale, 200);
      ChartData.current = receivedData;
    })().then(() => {
      Chart.current = createChart(
        document.querySelector(".Chart") as HTMLElement,
        {
          width: chartWidth,
          height: chartHeight,
          crosshair: {
            mode: CrosshairMode.Normal,
          },
          localization: {
            locale: "ko-KR",
            dateFormat: "yyyy-MM-dd",
          },
          timeScale: {
            timeVisible: true,
            secondsVisible: false,
            rightOffset: 2,
          },
        }
      );
      ChartDataSeries.current = Chart.current.addCandlestickSeries({
        upColor: "#FF4B4B",
        downColor: "#3555FF",
        wickUpColor: "#FF4B4B",
        wickDownColor: "#3555FF",
        borderVisible: false,
      });
      ChartDataSeries.current.setData(
        processChartData(ChartData.current.slice(0))
      );
      Updater.current = setInterval(async () => {
        const receivedData = await getChartData(CoinInfo.market, scale, 1);

        if (
          receivedData[0]?.candle_date_time_utc ===
          ChartData.current[0]?.candle_date_time_utc
        ) {
          ChartData.current = receivedData.concat(ChartData.current.slice(1));
          ChartDataSeries.current.setData(
            processChartData(ChartData.current.slice(0))
          );
        } else if (
          receivedData[0]?.candle_date_time_utc >
          ChartData.current[0]?.candle_date_time_utc
        ) {
          ChartData.current = receivedData.concat(ChartData.current);
          ChartDataSeries.current.setData(
            processChartData(ChartData.current.slice(0))
          );
        }
      }, 500);
    });

    return () => {
      document
        .querySelector(".Chart")
        ?.removeChild(
          document.querySelector(".tv-lightweight-charts") as Element
        );
      clearInterval(Updater.current);
      ChartData.current = [];
    };
    //eslint-disable-next-line
  }, [CoinInfo.market, scale]);
  Chart.current?.resize(chartWidth, chartHeight);

  return (
    <div className="Chart">
      <select
        className="scaleSelector"
        onChange={(e) => {
          setScale(Number(e.target.value));
        }}
      >
        <option value="0">Min</option>
        <option value="1">Half Hour</option>
        <option value="2">Hour</option>
        <option value="3">Day</option>
        <option value="4">Week</option>
        <option value="5">Month</option>
      </select>
    </div>
  );
}

const processChartData = (rawData: any) => {
  return rawData
    .slice(0)
    .reverse()
    .map((item: any) => ({
      time: item.timestamp / 1000 + 32400,
      open: item.opening_price,
      high: item.high_price,
      low: item.low_price,
      close: item.trade_price,
    }));
};
