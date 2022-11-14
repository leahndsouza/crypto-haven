import React from 'react';
import millify from "millify";
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Statistic } from 'antd';
import { useEffect, useState } from 'react';

import { getStats } from '../axios/Api/cryptoApi';
import { Cryptocurrencies, News} from '../components';

const { Title } = Typography;

const Homepage = () => {
  const [ data, setData] = useState([]);

  useEffect(() => {
    getStats()
    .then((res) => {
      console.log(res.data);
      setData(res.data.data.stats);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <>
      <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={data?.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={data?.totalExchanges} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(data?.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(data?.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(data?.totalMarkets)} /></Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 10 Cryptocurrency</Title>
        <Title level={3} className='home-title'><Link to='/cryptocurrencies'>Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top Crypto News</Title>
        <Title level={3} className='home-title'><Link to='/news'>Show more</Link></Title>
      </div>
      <News simplified={true} />
    </>
  )
}

export default Homepage;