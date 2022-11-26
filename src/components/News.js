import React, { useEffect, useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { getNews } from '../axios/Api/newsApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.financialexpress.com/wp-content/uploads/2022/04/crypto-price-news-1.jpg';

const News = (props) => {
  const count = props.simplified ? 6 : 20;
  const cryptoData= useSelector( (state) =>  state.stats.data);
  const [ newsData, setNewsData ] = useState([]);
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const [ isFetching, setIsFetching ] = useState(true);

  useEffect(() => {
    getNews( newsCategory, count)
    .then((res) => {
      setIsFetching(false);
      setNewsData(res?.data?.value)
    })
    .catch((error) =>{
      console.log(error);
    })
  }, [count, newsCategory]);
  
  console.log(cryptoData);

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
  else{

    return (
      <Row gutter={[24,24]}>
        {props.simplified ? null : 
          <Col span={24}>
            <Select 
              showSearch
              className='select-news'
              placeholder='Select Crypto Category'
              optionFilterProp='children'
              onChange={(value) => setNewsCategory(value) }
              filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} 
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {cryptoData?.data?.coins?.map((coin) => 
                <Option value={coin.name}>{coin.name}</Option>
              )}
            </Select>
          </Col>
        }
        {newsData?.map((data, inx) => (
          <Col xs={24} sm={12} lg={8} key={inx}>
            <Card hoverable className='news-card'>
              <a href={data.url} target="_blank" rel='noreferrer' >
                <div className='news-image-container'>
                  <img className='news-image' src={data?.image?.thumbnail?.contentUrl || demoImage} alt='Crypto News Image' />
                  <Title className='news-title' level={4}>{data.name}</Title>
                </div>
                <p>
                    { data.description>50 ? `${data.description.substring(0,50)}...` : data.description }
                </p>
                <div className='provider-container'>
                  <div>
                    <Avatar src={data.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                    <Text className='provider-name'>{data.provider[0]?.name}</Text>  
                  </div>
                  <Text>{moment(data.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    )

  }
}

export default News;