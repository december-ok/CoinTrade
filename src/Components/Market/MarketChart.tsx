import { Bar } from "react-chartjs-2";

export interface MarketChartProps {
  rawData: number[];
}

export function MarketChart({ rawData }: MarketChartProps) {
  const chartData = {
    labels: rawData.map(() => ""),
    datasets: [
      {
        backgroundColor: rawData.map((item) =>
          item >= 0 ? "#FF4B4B" : "#3555FF"
        ),
        data: rawData.map((item) => Math.abs(item)),
      },
    ],
  };
  const chartOptions = {
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

  return <Bar data={chartData} options={chartOptions} height={100} />;
}
