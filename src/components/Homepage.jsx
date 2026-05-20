import millify from "millify";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../features/cryptoApi";
import Currencies from "./Currencies";
import News from "./News";
import Skeleton from "./Skeleton";

const STAT_TILES = [
  { key: "totalCoins", label: "Total Currencies" },
  { key: "totalExchanges", label: "Total Exchanges" },
  { key: "totalMarketCap", label: "Total Market Cap" },
  { key: "total24hVolume", label: "Total 24h Volume" },
  { key: "totalMarkets", label: "Total Markets" },
];

const StatsSkeleton = () => (
  <div
    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
    role="status"
    aria-label="Loading stats"
  >
    {STAT_TILES.map((t) => (
      <div
        key={t.key}
        className="rounded-2xl border border-zinc-200 bg-white p-5"
      >
        <Skeleton className="h-3 w-20 mb-3" />
        <Skeleton className="h-9 w-24" />
      </div>
    ))}
  </div>
);

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const stats = data?.data?.stats;

  return (
    <div className="flex flex-col gap-16">
      {/* Global Stats */}
      <section>
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-zinc-900 mb-6 tracking-wide">
          Global Crypto Stats
        </h1>

        {isFetching ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {STAT_TILES.map(({ key, label }) => (
              <div
                key={key}
                className="rounded-2xl border border-zinc-200 bg-white p-5 hover:border-zinc-300 hover:shadow-sm transition-all"
              >
                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  {label}
                </p>
                <p className="font-heading text-3xl sm:text-4xl text-zinc-900">
                  {stats?.[key] != null ? millify(Number(stats[key])) : "—"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Top Currencies */}
      <section>
        <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
          <h2 className="font-heading text-3xl sm:text-5xl text-zinc-900 tracking-wide">
            Top 10 Currencies
          </h2>
          <Link
            to="/currencies"
            className="text-sm text-green-600 hover:text-green-700 transition-colors"
          >
            Show More →
          </Link>
        </div>
        <Currencies simplified />
      </section>

      {/* Latest News */}
      <section>
        <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
          <h2 className="font-heading text-3xl sm:text-5xl text-zinc-900 tracking-wide">
            Latest News
          </h2>
          <Link
            to="/news"
            className="text-sm text-green-600 hover:text-green-700 transition-colors"
          >
            Show More →
          </Link>
        </div>
        <News simplified />
      </section>
    </div>
  );
};

export default Homepage;
