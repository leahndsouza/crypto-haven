import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { getStats } from '../axios/Api/cryptoApi';

const Cryptocurrencies = (props) => {
  const count = props.simplified ? 10 : 100;
  const [ coins, setCoins ] = useState([]); 

  useEffect(() => {
    getStats(count)
    .then((res) => {
      setCoins(res?.data?.data?.coins);
    })
    .catch((error) =>{
      console.log(error);
    })
  })

  return (
    <>
      <Row gutter={[32,32]} className='crypto-card-container'>
        {coins.map((item) =>(
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={item.rank}>
            <Link to={`/crypto/${item.id}`}>
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

export default Cryptocurrencies;