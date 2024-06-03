import { Button, Menu, Typography } from "antd";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Typography.Title level={1} className="logo">
          <Link to="/">CryptoWorld</Link>
        </Typography.Title>
      </div>
      <Button
        type="text"
        className="menu-control-container"
        onClick={() => setActiveMenu(!activeMenu)}
      >
        <MenuOutlined />
      </Button>
      {activeMenu && (
        <Menu
          theme="dark"
          className="nav-menu"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: <Link to="/">Home</Link>,
            },
            {
              key: "2",
              icon: <FundOutlined />,
              label: <Link to="/currencies">Currencies</Link>,
            },
            {
              key: "3",
              icon: <MoneyCollectOutlined />,
              label: <Link to="/exchanges">Exchanges</Link>,
            },
            {
              key: "4",
              icon: <BulbOutlined />,
              label: <Link to="/news">News</Link>,
            },
          ]}
        />
      )}
    </div>
  );
};

export default Navbar;
