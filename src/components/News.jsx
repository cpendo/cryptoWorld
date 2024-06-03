import { Select, Typography, Row, Col, Card } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import { useState } from "react";
import { useGetCryptoNewsQuery } from "../features/newsApi";
import { useGetCryptosQuery } from "../features/cryptoApi";
import Spinner from "./Spinner";
const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: News, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (isFetching) return <Spinner />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency, i) => (
              <Option key={i} value={currency.name}>
                {currency.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {News.articles.map((article, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={article.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <img
                  src={article?.urlToImage || demoImage}
                  style={{
                    width: "100%",
                    height: "100px",
                    objectFit: "cover",
                  }}
                  alt="news-image"
                />
              </div>
              <Title className="news-title heading" level={3}>
                {article.title}
              </Title>
              <div className="provider-container">
                <div>
                  <Text>{article.author}</Text>
                </div>
                <Text>
                  {moment(article.publishedAt).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

News.propTypes = {
  simplified: PropTypes.bool,
};

export default News;
