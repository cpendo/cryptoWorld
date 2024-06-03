import { Table } from "antd";
import millify from "millify";


import {
  useGetCryptosQuery,
} from "../features/cryptoApi";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";



const columns = [
  {
    title: "Exchanges",
    dataIndex: "exchanges",
    key: "exchanges",
  },
  {
    title: "24h Trade Volume",
    dataIndex: "volume",
    key: "volume",
  },
  {
    title: "Markets",
    dataIndex: "markets",
    key: "markets",
    responsive: ['md'],

  },
  {
    title: "Change",
    dataIndex: "change",
    key: "change",
    responsive: ['lg'],

  },
];

const Exchanges = () => {
  const { data: coinData, isFetching } = useGetCryptosQuery(100);
  const coins = coinData?.data?.coins;
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = coins?.map((coin) => {
      return {
        key: coin.uuid,
        exchanges: coin.name,
        volume: `$${millify(coin["24hVolume"])}`,
        markets: millify(coin.marketCap),
        change: `${coin.change} %`,
      };
    });

    setData(data);
  }, [coins]);

  if (isFetching) return <Spinner />;

  return (
    <Table
      columns={columns}
      dataSource={data}
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}
          >
            {record.description}
          </p>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
    />
  );
};
export default Exchanges;
