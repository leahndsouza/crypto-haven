import React, { useCallback, useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { getStats } from '../axios/Api/cryptoApi';

const Cryptocurrencies = (props) => {
  const count = props.simplified ? 10 : 100;
  const [ coinData, setCoinData ] = useState([]);
  const [ coins, setCoins ] = useState([]);
  const [ isFetching, setIsFetching ] = useState(true);
  const [ coinSearch, setCoinSearch] = useState('');

  useEffect(() => {
    window.scrollTo(0,0);
    getStats(count)
    .then((res) => {
      setCoinData(res?.data);
      setCoins(res?.data?.data?.coins);
      setIsFetching(false);
    })
    .catch((error) =>{
      console.log(error);
    })
  }, [count]);

  useEffect(() => {
    searchFilter();
  }, [coinSearch])

  const searchFilter = useCallback(() => {
    setCoins(coinData?.data?.coins);
    const filteredData = coinData?.data?.coins?.filter((list)=> list.name.toLowerCase().includes(coinSearch.toLowerCase()));
    setCoins(filteredData);
  }, [coinSearch]) 

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
      <>
        {props.simplified ? null : 
          <div className='search-crypto'>
            <Input placeholder='Search Cryptocurrency' onChange={(event)=> setCoinSearch(event.target.value)} />
          </div>
        }
        <Row gutter={[32,32]} className='crypto-card-container'>
          {coins?.map((item) =>(
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={item.rank}>
              <Link to={`/crypto/${item.uuid}`}>
                <Card 
                  title={`${item.rank}. ${item.name} (${item.symbol})`}
                  extra={<img className='crypto-image' src={item.iconUrl} alt='crypto coin' />}
                  hoverable
                >
                  <p>Price: ${item?.price > 1 ? parseFloat(item?.price).toFixed(2) : ( item?.price <0.01 ? parseFloat(item?.price).toFixed(7) : parseFloat(item?.price).toFixed(3)) }</p>  
                  <p>Market Cap: {millify(item?.marketCap)}</p>
                  <p>Daily Change: {millify(item?.change)}%</p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </>
    )
  }
}

export default Cryptocurrencies;