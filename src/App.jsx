import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import {
  Navbar,
  Homepage,
  Exchanges,
  Currencies,
  CryptoDetails,
  News,
} from "./components";
import { Divider, Layout, Space, Typography } from "antd";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/currencies" element={<Currencies />} />
              <Route path="/currency/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
          <Divider />
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
           © 2024 CryptoWorld. All Rights Reserved.
          </Typography.Title>
        </div>
      </div>
    </div>
  );
};

export default App;
