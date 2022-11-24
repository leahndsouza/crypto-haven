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
    getStats(count)
    .then((res) => {
      setCoinData(res?.data);
      setCoins(res?.data?.data?.coins);
      setIsFetching(false);
    })
    .catch((error) =>{
      console.log(error);
    })
  }, []);

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
      <div class="spinner-wrapper">
      <div class="spinner">
        <div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
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
                  extra={<img className='crypto-image' src={item.iconUrl} />}
                  hoverable
                >
                  <p>Price: ${millify(item.price)}</p>  
                  <p>Market Cap: {millify(item.marketCap)}</p>
                  <p>Daily Change: {millify(item.change)}%</p>
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