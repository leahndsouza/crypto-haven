import React, { useEffect, useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { getNews } from '../axios/Api/newsApi';

const News = (props) => {
  const count = props.simplified ? 10 : 100;
  const [ newsData, setNewsData ] = useState([]);

  useEffect(() => {
    getNews( 'Cryptocurrency', count)
    .then((res) => {
      setNewsData(res?.data?.value)
    })
    .catch((error) =>{
      console.log(error);
    })
  }, []);
  
  console.log(newsData);
  
  return (
    <div>
        News
    </div>
  )
}

export default News;