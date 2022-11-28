import React from 'react';
import { Line } from 'react-chartjs-2';
import { Row,Col,Typography } from 'antd';

const { Title } = Typography;

const LineChart = (props) => {
  return (
    <>
        <Row className='chart-header'>
            <Title level={3} className='chart-title'>{props.coinName} Price Chart</Title>
            <Col className='price-container'>
                <Title level={5} className="price-change">{props.coinHistory?.change}</Title>
                <Title level={5} className="current-price">Current {props.coinName} Price: {props.coinPrice > 1 ? parseFloat(props.coinPrice).toFixed(2) : ( props.coinPrice <0.01 ? parseFloat(props.coinPrice).toFixed(7) : parseFloat(props.coinPrice).toFixed(3)) }</Title>
            </Col>
        </Row>
    </>
  )
}

export default LineChart;