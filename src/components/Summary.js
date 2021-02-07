import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';

const Summary = props => {

const data = {
  labels: props.dates,
  datasets: [
    {
      label: 'Currency Values',
      data: props.currencyValues,
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

  return <>
    <div className='header'>
      <h1 className='title'>1 EUR - {props.currencyValues.slice(-1)} {props.selectedCurrency}</h1>
    </div>
    <Line data={data} options={options} />
  </>
};

export default Summary;
