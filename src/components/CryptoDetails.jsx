import { useParams } from "react-router-dom";
import millify from "millify";
import HTMLReactParser from "html-react-parser/lib/index";
import { useState } from "react";
import {
  FiDollarSign,
  FiHash,
  FiZap,
  FiAward,
  FiBarChart2,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiTrendingUp,
} from "react-icons/fi";

import LineChart from "./LineChart";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../features/cryptoApi";
import Skeleton from "./Skeleton";

const TIME_PERIODS = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

const DetailsSkeleton = () => (
  <div
    className="flex flex-col gap-10"
    role="status"
    aria-label="Loading coin details"
  >
    {/* Header */}
    <div className="flex items-center gap-4">
      <Skeleton className="w-12 h-12 sm:w-16 sm:h-16" rounded="rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 sm:h-14 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>
    </div>

    {/* Time period buttons */}
    <div className="flex flex-wrap gap-2">
      {TIME_PERIODS.map((p) => (
        <Skeleton key={p} className="h-8 w-12" rounded="rounded-full" />
      ))}
    </div>

    {/* Chart */}
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 h-72 sm:h-96">
      <Skeleton className="w-full h-full" />
    </div>

    {/* Stats grids */}
    <div className="grid lg:grid-cols-2 gap-6">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-zinc-200 bg-white p-6"
        >
          <Skeleton className="h-7 w-48 mb-2" />
          <Skeleton className="h-4 w-64 mb-5" />
          <div className="divide-y divide-zinc-100">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="flex items-center justify-between py-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  if (isFetching) return <DetailsSkeleton />;
  const cryptoDetails = data?.data?.coin;
  if (!cryptoDetails) return null;

  const stats = [
    {
      title: "Price to USD",
      value: `$${millify(Number(cryptoDetails.price))}`,
      icon: <FiDollarSign />,
    },
    {
      title: "Rank",
      value: `#${cryptoDetails.rank}`,
      icon: <FiHash />,
    },
    {
      title: "24h Volume",
      value: `$${millify(Number(cryptoDetails["24hVolume"]))}`,
      icon: <FiZap />,
    },
    {
      title: "Market Cap",
      value: `$${millify(Number(cryptoDetails.marketCap))}`,
      icon: <FiTrendingUp />,
    },
    {
      title: "All-time high",
      value: `$${millify(Number(cryptoDetails.allTimeHigh?.price))}`,
      icon: <FiAward />,
    },
  ];

  const supplyStats = [
    {
      title: "Number of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FiBarChart2 />,
    },
    {
      title: "Number of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <FiBarChart2 />,
    },
    {
      title: "Approved Supply",
      value: cryptoDetails.supply?.confirmed ? <FiCheck /> : <FiX />,
      icon: <FiAlertCircle />,
    },
    {
      title: "Total Supply",
      value: cryptoDetails.supply?.total
        ? `$${millify(Number(cryptoDetails.supply.total))}`
        : "—",
      icon: <FiAlertCircle />,
    },
    {
      title: "Circulating Supply",
      value: cryptoDetails.supply?.circulating
        ? `$${millify(Number(cryptoDetails.supply.circulating))}`
        : "—",
      icon: <FiAlertCircle />,
    },
  ];

  const websiteLinks =
    cryptoDetails.links?.filter((item) => ["website"].includes(item.type)) ??
    [];

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        {cryptoDetails.iconUrl && (
          <img
            src={cryptoDetails.iconUrl}
            alt=""
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
          />
        )}
        <div>
          <h1 className="font-heading text-4xl sm:text-6xl text-zinc-900 tracking-wide leading-none">
            {cryptoDetails.name}{" "}
            <span className="text-zinc-400">({cryptoDetails.symbol})</span>
          </h1>
          <p className="text-zinc-500 mt-2 text-sm sm:text-base">
            Live price in US Dollar (USD). View value statistics, market cap,
            and supply.
          </p>
        </div>
      </div>

      {/* Time period selector + chart */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {TIME_PERIODS.map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                timePeriod === period
                  ? "bg-green-500 text-white"
                  : "bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(Number(cryptoDetails.price))}
          coinName={cryptoDetails.name}
        />
      </div>

      {/* Stats grids */}
      <div className="grid lg:grid-cols-2 gap-6">
        <StatPanel
          title={`${cryptoDetails.name} Value Statistics`}
          subtitle="Overview of base/quote currency, rank, and trading volume."
          stats={stats}
        />
        <StatPanel
          title="Other Stats Info"
          subtitle="Supply, markets, and exchange data."
          stats={supplyStats}
        />
      </div>

      {/* Description + links */}
      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <h2 className="font-heading text-3xl text-zinc-900 mb-4 tracking-wide">
            What is {cryptoDetails.name}?
          </h2>
          <div className="coin-desc-body text-zinc-700 text-sm sm:text-base">
            {HTMLReactParser(cryptoDetails.description ?? "")}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-3xl text-zinc-900 mb-4 tracking-wide">
            {cryptoDetails.name} Links
          </h2>
          <div className="rounded-2xl border border-zinc-200 bg-white divide-y divide-zinc-100">
            {websiteLinks.length === 0 ? (
              <p className="p-4 text-zinc-400 text-sm">No links available.</p>
            ) : (
              websiteLinks.map((link) => (
                <div
                  key={link.name}
                  className="flex items-center justify-between p-4 hover:bg-zinc-50"
                >
                  <span className="text-zinc-500 capitalize text-sm">
                    {link.type}
                  </span>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </a>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const StatPanel = ({ title, subtitle, stats }) => (
  <section className="rounded-2xl border border-zinc-200 bg-white p-6">
    <h3 className="font-heading text-2xl text-zinc-900 tracking-wide">
      {title}
    </h3>
    <p className="text-zinc-500 text-sm mt-1 mb-5">{subtitle}</p>
    <div className="divide-y divide-zinc-100">
      {stats.map(({ title: t, value, icon }, idx) => (
        <div
          key={`${t}-${idx}`}
          className="flex items-center justify-between py-3"
        >
          <div className="flex items-center gap-3 text-zinc-600 text-sm">
            <span className="text-green-600">{icon}</span>
            <span>{t}</span>
          </div>
          <span className="text-zinc-900 font-medium text-sm">{value}</span>
        </div>
      ))}
    </div>
  </section>
);

export default CryptoDetails;
