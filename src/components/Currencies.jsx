import millify from "millify";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useGetCryptosQuery } from "../features/cryptoApi";
import Skeleton from "./Skeleton";

const formatChange = (change) => {
  const num = Number(change);
  if (Number.isNaN(num)) return { label: "—", positive: null };
  return {
    label: `${num > 0 ? "+" : ""}${num.toFixed(2)}%`,
    positive: num >= 0,
  };
};

const CardSkeleton = () => (
  <div className="rounded-2xl border border-zinc-200 bg-white p-5 flex flex-col gap-4">
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="h-9 w-9" rounded="rounded-full" />
    </div>
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
);

const Currencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const coins = data?.data?.coins;
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = coins?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData ?? []);
  }, [coins, searchTerm]);

  return (
    <div className="flex flex-col gap-6">
      {!simplified && (
        <div>
          <h1 className="font-heading text-5xl sm:text-6xl text-zinc-900 mb-6 tracking-wide">
            All Currencies
          </h1>
          <input
            type="search"
            placeholder="Search currency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isFetching}
            className="w-full sm:w-80 px-4 py-2.5 rounded-full bg-white border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors disabled:opacity-60"
            aria-label="Search currency"
          />
        </div>
      )}

      {isFetching ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          role="status"
          aria-label="Loading currencies"
        >
          {Array.from({ length: count > 12 ? 12 : count }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cryptos?.map((currency) => {
              const change = formatChange(currency.change);
              return (
                <Link
                  key={currency.uuid}
                  to={`/currency/${currency.uuid}`}
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 flex flex-col gap-4 hover:border-green-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-zinc-400 mb-0.5">
                        #{currency.rank}
                      </p>
                      <h3 className="font-heading text-2xl text-zinc-900 tracking-wide group-hover:text-green-600 transition-colors">
                        {currency.name}
                      </h3>
                      <p className="text-xs text-zinc-500 uppercase mt-0.5">
                        {currency.symbol}
                      </p>
                    </div>
                    {currency.iconUrl && (
                      <img
                        src={currency.iconUrl}
                        alt=""
                        className="w-9 h-9 object-contain"
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Price</span>
                      <span className="text-zinc-900 font-medium">
                        ${millify(Number(currency.price))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Market Cap</span>
                      <span className="text-zinc-900 font-medium">
                        ${millify(Number(currency.marketCap))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">24h Change</span>
                      <span
                        className={`font-medium ${
                          change.positive === null
                            ? "text-zinc-400"
                            : change.positive
                              ? "text-green-600"
                              : "text-red-600"
                        }`}
                      >
                        {change.label}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {cryptos?.length === 0 && (
            <p className="text-center text-zinc-400 py-12">
              No currencies match your search.
            </p>
          )}
        </>
      )}
    </div>
  );
};

Currencies.propTypes = {
  simplified: PropTypes.bool,
};

export default Currencies;
