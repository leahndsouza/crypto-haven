import React, { useEffect, useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import {
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  StopOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

import { getCoinData } from '../axios/Api/cryptoApi';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const params = useParams();
  const [ coinData, setCoinData ] = useState([null]);
  const [ timePeriod, setTimePeriod ] = useState('7d');

  useEffect(() => {
    getCoinData(params.coinId)
    .then((response) => {
      setCoinData(response.data.coin);
    })
    .catch((err) => 
      console.log("Error occured", err)
    )
  }, []);

  return (
    <div>
        CryptoDetails {params.coinId}
    </div>
  )
}

export default CryptoDetails;