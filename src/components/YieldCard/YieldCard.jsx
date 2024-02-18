import React, { useState } from 'react'
import './YieldCard.css'

import Box from '@mui/material/Box';
import { BarChart} from '@mui/x-charts/BarChart';
import ReactApexChart from "react-apexcharts";

const YieldCard = () => {

  const [data, setData] = useState(data1);

  const handleData1Click = () => {
    setData(data1);
  };

  const handleData2Click = () => {
    setData(data2);
  };

  const [state, setState] = useState({
    series: [{
      name: 'Bok Choy',
      data: [44, 55, 41, 67, 22, 43]
    }, {
      name: 'Choy Sum',
      data: [13, 23, 20, 8, 13, 27]
    }, {
      name: 'Kai Lan',
      data: [11, 17, 15, 15, 21, 14]
    }, ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      colors: ['#26725e', '#6cb6a0', '#9be6cf'],
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 5,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                color: '#002212',
                fontSize: '15px',
                fontWeight: 600
              }
            }
          }
        },
      },
      dataLabels: { // disable display of values within bar
        enabled: false,
      },
      xaxis: {
        type: 'catergories',
        // type: 'datetime',
        // categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
        //   '01/05/2011 GMT', '01/06/2011 GMT'
        // ],
        // categories: ['Jan 1, 2024 3:57:51 PM GMT', 
        // 'Feb 2, 2024 3:57:51 PM GMT', 
        // 'Mar 3, 2024 3:57:51 PM GMT', 
        // 'Apr 4, 2024 3:57:51 PM GMT',
        // 'May 5, 2024 3:57:51 PM GMT', 
        // 'Jun 7, 2024 3:57:51 PM GMT'
        // ],
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        x: {
          show: true,
          format: 'dd MMM y',
        },
        y: {
            formatter: function (val) {
                return val + "kg";
              },
        }
      }
    },
  });

  return (
    <div className="YieldCard">
      <div className='YieldTopBar'>
        <span className='Title'>Yield</span>
        <div>
          <button onClick={handleData1Click} className='yield-button'>Monthly</button>
          <button onClick={handleData2Click} className='yield-button'>Weekly</button>
        </div>
      </div>
      <div style={{width:'100%', height:'100%'}}>
        <ReactApexChart options={state.options} series={data} type='bar' width={'100%'} height={'100%'}/>
      </div>
      
  </div>
  );
}

const data1 = [{
  name: 'Bok Choy',
  data: [
    {x:'Jan', y: 44}, 
    {x:'Feb', y: 11}, 
    {x:'Mar', y: 33}, 
    {x:'Apr', y: 12}, 
    {x:'Jun', y: 34}, 
    {x:'Jul', y: 21},
    {x:'Aug', y: 15},
    {x:'Sep', y: 30},
    {x:'Oct', y: 23},
    {x:'Nov', y: 26},
    {x:'Dec', y: 44},
  ]}, {
  name: 'Choy Sum',
  data: [
    {x:'Jan', y: 44}, 
    {x:'Feb', y: 11}, 
    {x:'Mar', y: 33}, 
    {x:'Apr', y: 12}, 
    {x:'Jun', y: 34}, 
    {x:'Jul', y: 21},
    {x:'Aug', y: 15},
    {x:'Sep', y: 30},
    {x:'Oct', y: 23},
    {x:'Nov', y: 26},
    {x:'Dec', y: 44},
  ]}, {
  name: 'Kai Lan',
  data: [
    {x:'Jan', y: 44}, 
    {x:'Feb', y: 11}, 
    {x:'Mar', y: 33}, 
    {x:'Apr', y: 12}, 
    {x:'Jun', y: 34}, 
    {x:'Jul', y: 21},
    {x:'Aug', y: 15},
    {x:'Sep', y: 30},
    {x:'Oct', y: 23},
    {x:'Nov', y: 26},
    {x:'Dec', y: 44},
  ]}, 
];

const data2 = [{
  name: 'Bok Choy',
  data: [
    {x:'W1', y: 44}, 
    {x:'W2', y: 11}, 
    {x:'W3', y: 33}, 
    {x:'W4', y: 12}, 
    {x:'W5', y: 34}, 
  ]}, {
  name: 'Choy Sum',
  data: [
    {x:'W1', y: 44}, 
    {x:'W2', y: 11}, 
    {x:'W3', y: 33}, 
    {x:'W4', y: 12}, 
    {x:'W5', y: 34}, 
  ]}, {
  name: 'Kai Lan',
  data: [
    {x:'W1', y: 44}, 
    {x:'W2', y: 11}, 
    {x:'W3', y: 33}, 
    {x:'W4', y: 12}, 
    {x:'W5', y: 34}, 
  ]}, 
];

export default YieldCard