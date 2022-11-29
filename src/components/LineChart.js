import React from 'react';
import { Line } from 'react-chartjs-2';
import { Row,Col,Typography } from 'antd';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  Tooltip,
  Legend,
  } from 'chart.js';
  
  ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  Tooltip,
  Legend
  );

const { Title } = Typography;

const LineChart = (props) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  for( let i=0; i<props.coinHistory?.history?.length; i += 1 ){
    coinPrice.push(props.coinHistory?.history[i].price)
  }
  
  for( let j=0; j<props.coinHistory?.history?.length; j += 1 ){
    coinTimeStamp.push(
      new Date(
      props.coinHistory?.history[j].timestamp
      ).toLocaleDateString()
      );
  }

  console.log('co', coinTimeStamp);

  const data = {
    labels: coinTimeStamp,
    datasets: [{
      label: 'Price in USD',
      data: coinPrice,
      fill: false,
      backgroundColor: '#0071bd',
      borderColor: '#0071bd'
    }]
  };

  const options = {
    scales: {
      yAxes:[{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  };

  // const options = {
  //   scales: {
  //     yAxes: {
  //       scaleLabel: {
  //       display: true,
  //       fontColor: 'white',
  //       fontSize: 25,
  //       labelString: 'Faction Points',
  //     },
  //     ticks: {
  //       beginAtZero: true,
  //       },
  //     },  
  //   },
  // };

  return (
    <>
        <Row className='chart-header'>
            <Title level={3} className='chart-title'>{props.coinName} Price Chart</Title>
            <Col className='price-container'>
                <Title level={5} className="price-change">Change: {props.coinHistory?.change}</Title>
                <Title level={5} className="current-price">Current {props.coinName} Price: {props.coinPrice > 1 ? parseFloat(props.coinPrice).toFixed(2) : ( props.coinPrice <0.01 ? parseFloat(props.coinPrice).toFixed(7) : parseFloat(props.coinPrice).toFixed(3)) }</Title>
            </Col>
        </Row>
        <Line data={data} options={options} />
    </>
  )
}

export default LineChart;