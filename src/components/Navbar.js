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
        <Typography.Title level={1} style={{marginLeft: '10px', paddingTop: '15px'}} >
          <NavLink to="/" className='header-font-color' >CryptoHaven</NavLink>
        </Typography.Title>
      </div>

      <Menu theme="dark" className="menu-style">
        <Menu.Item icon={<HomeOutlined />} className='header-font' >
          <NavLink to="/" className='header-font' >Home</NavLink>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />} className='header-font' >
          <NavLink to="/cryptocurrencies" className='header-font' >Cryptocurrencies</NavLink>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />} className='header-font' >
          <NavLink to="/exchanges" className='header-font' >Exchanges</NavLink>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />} className='header-font' >
          <NavLink to="/news" className='header-font' >News</NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
