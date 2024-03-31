import React, { useEffect, useState } from 'react'
import './YieldCard.css'

import Box from '@mui/material/Box';
import { BarChart} from '@mui/x-charts/BarChart';
import ReactApexChart from "react-apexcharts";

const YieldCard = ({monthly, weekly}) => {

  const [data, setData] = useState(monthly);
  const [mthly, setMthly] = useState(true);

  const handleMthlyClick = () => {
    setData(monthly);
    setMthly(true);
  };

  const handleWklyClick = () => {
    setData(weekly);
    setMthly(false);
  };

  useEffect(() =>{
    if (mthly) {
      setData(monthly);
    } else {
      setData(weekly);
    }
  }, [monthly, weekly]);

  const [state, setState] = useState({
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
        show: true,
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
                return val.toFixed(2) + "kg";
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
          <button onClick={handleMthlyClick} className='yield-button'>Monthly</button>
          <button onClick={handleWklyClick} className='yield-button'>Weekly</button>
        </div>
      </div>
      <div style={{width:'100%', height:'100%'}}>
        <ReactApexChart options={state.options} series={data} type='bar' width={'100%'} height={'100%'}/>
      </div>
      
  </div>
  );
}



export default YieldCard