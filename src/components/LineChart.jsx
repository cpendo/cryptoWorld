import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const history = coinHistory?.data?.history ?? [];
  const coinPrice = history.map((h) => h.price);
  const coinTimestamp = history.map((h) =>
    new Date(h.timestamp * 1000).toLocaleDateString()
  );

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price (USD)",
        data: coinPrice,
        fill: true,
        backgroundColor: "rgba(34, 197, 94, 0.08)",
        borderColor: "#22c55e",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#22c55e",
        pointHoverBorderColor: "#ffffff",
        tension: 0.25,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#ffffff",
        borderColor: "#e4e4e7",
        borderWidth: 1,
        titleColor: "#18181b",
        bodyColor: "#52525b",
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(228, 228, 231, 0.6)" },
        ticks: { color: "#71717a", maxRotation: 0, autoSkipPadding: 20 },
      },
      y: {
        grid: { color: "rgba(228, 228, 231, 0.6)" },
        ticks: { color: "#71717a" },
        beginAtZero: false,
      },
    },
  };

  const change = Number(coinHistory?.data?.change ?? 0);
  const isPositive = change >= 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <h2 className="font-heading text-3xl sm:text-4xl text-zinc-900 tracking-wide">
          {coinName} Price Chart
        </h2>
        <div className="flex items-center gap-6 text-sm">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider">
              Change
            </p>
            <p
              className={`font-heading text-2xl ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? "+" : ""}
              {change.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider">
              Current Price
            </p>
            <p className="font-heading text-2xl text-zinc-900">
              ${currentPrice}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 h-72 sm:h-96">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

LineChart.propTypes = {
  coinHistory: PropTypes.object,
  currentPrice: PropTypes.string,
  coinName: PropTypes.string,
};

export default LineChart;
