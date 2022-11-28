import React, { useEffect, useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Tag, Avatar } from 'antd';
import {
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  StopOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  NumberOutlined,
  CheckOutlined
} from "@ant-design/icons";

import { getCoinData, getCoinHistory } from '../axios/Api/cryptoApi';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const params = useParams();
  const [ coinData, setCoinData ] = useState([null]);
  const [ timePeriod, setTimePeriod ] = useState('7d');
  const [ isFetching, setIsFetching ] = useState(true);
  const [ coinHistory, setCoinHistory ] = useState([]);

  const timeFrame = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${coinData?.price && parseFloat(coinData?.price).toFixed(7)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: coinData?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${coinData?.["24hVolume"] && millify(coinData?.["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${coinData?.marketCap && millify(coinData?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${coinData?.allTimeHigh?.price && millify(coinData?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: coinData?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: coinData?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: coinData?.supply?.max ? millify(coinData?.supply?.max) : '--', icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `${coinData?.supply?.total && millify(coinData?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `${coinData?.supply?.circulating && millify(coinData?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  useEffect(() => {
    getCoinData(params.coinId)
    .then((response) => {
      setCoinData(response.data.data.coin);
      setIsFetching(false);
    })
    .catch((err) => 
      console.log("Error occured", err)
    )
  }, []);

  useEffect(() => {
    getCoinHistory(params.coinId, timePeriod)
    .then((response) => {
      setCoinHistory(response.data.data);
      setIsFetching(false);
    })
    .catch((err) => 
      console.log("Error occured", err)
    )
  }, [timePeriod]);

  console.log('dat', coinHistory);

  if(isFetching===true) {
    return (
      <div className="spinner-wrapper">
      <div className="spinner">
        <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
      </div>
    );
  }
  else {

    return (
      <Col className='coin-detail-container'>
        <Col className='coin-heading'>
          <Col className='coin-heading-container'>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              <Title level={1} className="coin-name">
                {coinData?.name} ({coinData?.symbol})
              </Title>
              <Avatar shape='circle' src={coinData?.iconUrl} size='default' style={{ marginTop: '10px', marginLeft: '5px'}} />
            </div>
            <div>
            <Tag className='coin-tags' closable={false}>Rank #{coinData?.rank}</Tag>
            {coinData?.tags?.map((item) => 
              <Tag className='coin-tags' closable={false}>{item}</Tag>
            )}
            </div>
          </Col>
          <Col className='coin-heading-container'>
            <span> {coinData?.name} Price ({coinData?.symbol}) in USD</span>
            <div className='coin-price-container'>
            <Title level={2} style={{ fontWeight: 650}} >${coinData?.price > 1 ? parseFloat(coinData?.price).toFixed(2) : parseFloat(coinData?.price).toFixed(7) }</Title>
            <Tag className='coin-change' closable={false} style={{ backgroundColor: coinData?.change>0 ? '#16c784' : "#ea3943"}} >{coinData?.change}%</Tag>
            </div>
            <span style={{ fontSize: '13px', opacity: 0.8 }} >All Time High: ${parseFloat(coinData?.allTimeHigh?.price).toFixed(2)}</span>
            <span style={{ fontSize: '13px', opacity: 0.8 }} >BTC Price: {coinData?.btcPrice}</span>
          </Col>
        </Col>
        <Select 
          className='select-timeperiod'
          defaultValue="7d"
          placeholder="Select Time Period"
          onChange={(value) => setTimePeriod(value) }
        >
          {timeFrame?.map((frame) =>
            <Option value={frame}>{frame}</Option>
          )}
        </Select>
        {/* Coin chart */}
        <LineChart coinHistory={coinHistory} coinName={coinData?.name} coinPrice={coinData?.price} />
        <Col className='stats-container'>
          <Col className='coin-value-statistics'>
            <Col className='coin-value-statistics-heading'>
              <Title level={3} className='coin-details-heading'>
                {coinData?.name} Statistics
              </Title>
              <p>
                An overview of Bitcoin stats
              </p>
            </Col>
            {stats.map(({icon,title,value}) => 
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Col className='stats'>
                  <Text>{value}</Text>
                </Col>
              </Col>
            )}
          </Col>
          <Col className='other-stats-info'>
            <Col className='coin-value-statistics-heading'>
              <Title level={3} className='coin-details-heading'>
                Advanced Statistics
              </Title>
              <p>
                An advanced overview of cryptocurrency stats
              </p>
            </Col>
            {genericStats.map(({icon,title,value}) => 
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Col className='stats'>
                  <Text>{value}</Text>
                </Col>
              </Col>
            )}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              What is {coinData?.name}?
              {HTMLReactParser(coinData?.description)}
            </Title>
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              Related {coinData?.name} Links
            </Title>
            {coinData?.links?.map((link) => (
              <Row className='coin-link' key={link?.name}>
                <Title level={5} className="link-name">
                  {link?.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link?.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>

      </Col>
    )
  }
}

export default CryptoDetails;