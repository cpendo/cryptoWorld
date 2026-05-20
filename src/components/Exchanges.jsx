import millify from "millify";

import { useGetCryptosQuery } from "../features/cryptoApi";
import Skeleton from "./Skeleton";

const RowSkeleton = () => (
  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
    <div className="col-span-2 sm:col-span-1">
      <Skeleton className="h-3 w-6" />
    </div>
    <div className="col-span-10 sm:col-span-5 flex items-center gap-3">
      <Skeleton className="h-7 w-7" rounded="rounded-full" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
    <div className="col-span-6 sm:col-span-3 flex justify-end">
      <Skeleton className="h-4 w-20" />
    </div>
    <div className="col-span-6 sm:col-span-2 hidden md:flex justify-end">
      <Skeleton className="h-4 w-20" />
    </div>
    <div className="col-span-6 sm:col-span-1 flex justify-end">
      <Skeleton className="h-4 w-12" />
    </div>
  </div>
);

const Exchanges = () => {
  const { data, isFetching } = useGetCryptosQuery(100);
  const coins = data?.data?.coins ?? [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-5xl sm:text-6xl text-zinc-900 tracking-wide">
        Exchanges
      </h1>

      <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 text-xs uppercase tracking-wider text-zinc-500 border-b border-zinc-200">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">Exchange</div>
          <div className="col-span-3 text-right">24h Volume</div>
          <div className="col-span-2 text-right hidden md:block">
            Market Cap
          </div>
          <div className="col-span-1 text-right">Change</div>
        </div>

        {/* Rows */}
        {isFetching ? (
          <div
            className="divide-y divide-zinc-100"
            role="status"
            aria-label="Loading exchanges"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <RowSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {coins.map((coin) => {
              const change = Number(coin.change);
              const isPositive = change >= 0;
              return (
                <div
                  key={coin.uuid}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-zinc-50 transition-colors items-center"
                >
                  <div className="col-span-2 sm:col-span-1 text-zinc-400 text-sm">
                    #{coin.rank}
                  </div>
                  <div className="col-span-10 sm:col-span-5 flex items-center gap-3 min-w-0">
                    {coin.iconUrl && (
                      <img
                        src={coin.iconUrl}
                        alt=""
                        className="w-7 h-7 object-contain flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-zinc-900 truncate">
                        {coin.name}
                      </p>
                      <p className="text-xs text-zinc-500 uppercase">
                        {coin.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3 text-right text-zinc-900 font-medium">
                    ${millify(Number(coin["24hVolume"]))}
                  </div>
                  <div className="col-span-6 sm:col-span-2 text-right text-zinc-700 hidden md:block">
                    ${millify(Number(coin.marketCap))}
                  </div>
                  <div
                    className={`col-span-6 sm:col-span-1 text-right font-medium ${
                      isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {change.toFixed(2)}%
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exchanges;
