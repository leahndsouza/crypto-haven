import React from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  MenuOutlined,
  SlackSquareOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import icon from "../images/cryptohaven.png";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" className="logo" />
        <Typography.Title level={2} style={{marginLeft: '10px'}}>
          <NavLink to="/">CryptoHaven</NavLink>
        </Typography.Title>
      </div>

      <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />}>
          <NavLink to="/">Home</NavLink>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <NavLink to="/cryptocurrencies">Cryptocurrencies</NavLink>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />}>
          <NavLink to="/exchanges">Exchanges</NavLink>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <NavLink to="/news">News</NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
