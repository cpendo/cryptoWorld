import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../features/cryptoApi";
import { Currencies, News } from "../components";
import Spinner from "./Spinner";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const stats = data?.data?.stats;
  const {
    totalCoins,
    totalMarkets,
    totalMarketCap,
    totalExchanges,
    total24hVolume,
  } = stats || {};

  if (isFetching) return <Spinner />;
  return (
    <>
      <Title level={1} className="heading">
        {" "}
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Currencies" value={millify(Number(totalCoins))} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Currencies" value={millify(Number(totalExchanges))} />
        </Col>{" "}
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(Number(totalMarketCap))} />
        </Col>{" "}
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(Number(total24hVolume))} />
        </Col>{" "}
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(totalMarkets)} />
        </Col>{" "}
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="heading">
          Top 10 Currencies in the world
        </Title>
        <Title level={5} className="show-more">
          <Link to="/currencies">Show More</Link>
        </Title>
      </div>
      <Currencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="heading">
          Latest News
        </Title>
        <Title level={5} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified={true} />
    </>
  );
};

export default Homepage;
