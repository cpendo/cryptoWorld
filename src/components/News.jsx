import moment from "moment";
import PropTypes from "prop-types";
import { useState } from "react";

import { useGetCryptoNewsQuery } from "../features/newsApi";
import { useGetCryptosQuery } from "../features/cryptoApi";
import Skeleton from "./Skeleton";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const NewsCardSkeleton = () => (
  <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col">
    <div className="aspect-video">
      <Skeleton className="w-full h-full" rounded="rounded-none" />
    </div>
    <div className="flex flex-col gap-3 p-5 flex-1">
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-5 w-3/5" />
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-zinc-100">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  </div>
);

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: coinsData } = useGetCryptosQuery(100);
  const { data: newsData, isFetching } = useGetCryptoNewsQuery(newsCategory);

  const articlesCount = simplified ? 6 : 12;
  const selectedArticles = newsData?.items?.slice(0, articlesCount) ?? [];

  return (
    <div className="flex flex-col gap-6">
      {!simplified && (
        <div>
          <h1 className="font-heading text-5xl sm:text-6xl text-zinc-900 mb-6 tracking-wide">
            Crypto News
          </h1>
          <select
            value={newsCategory}
            onChange={(e) => setNewsCategory(e.target.value)}
            disabled={isFetching}
            className="w-full sm:w-72 px-4 py-2.5 rounded-full bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors appearance-none cursor-pointer disabled:opacity-60"
            aria-label="Filter news by category"
          >
            <option value="Cryptocurrency">Cryptocurrency</option>
            {coinsData?.data?.coins?.map((c) => (
              <option key={c.uuid} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {isFetching ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          role="status"
          aria-label="Loading news"
        >
          {Array.from({ length: articlesCount }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {selectedArticles.map((article, i) => (
            <a
              key={i}
              href={article.newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col hover:border-green-400 hover:shadow-md transition-all"
            >
              <div className="aspect-video bg-zinc-100 overflow-hidden">
                <img
                  src={article.images?.thumbnailProxied || demoImage}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col gap-3 p-5 flex-1">
                <h3 className="font-heading text-xl text-zinc-900 leading-tight group-hover:text-green-600 transition-colors line-clamp-3">
                  {article.title}
                </h3>
                <div className="mt-auto flex items-center justify-between text-xs text-zinc-500 pt-3 border-t border-zinc-100">
                  <span className="truncate">{article.publisher}</span>
                  <span className="flex-shrink-0 ml-3">
                    {moment
                      .unix(article.timestamp / 1000)
                      .startOf("ss")
                      .fromNow()}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

News.propTypes = {
  simplified: PropTypes.bool,
};

export default News;
