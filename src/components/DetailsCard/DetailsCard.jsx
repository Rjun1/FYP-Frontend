import React, { useEffect, useState } from 'react'
import "./DetailsCard.css"

import ReactApexChart from 'react-apexcharts';

function DetailsCard({title, unit, min, max, actual, optimal, datetime}) {

  // console.log("DetailsCard INDIV (", title, ") ", datetime)
  const [state, setState] = useState({
    series: [{
      name: "Minimum",
      data: min
    },
    {
      name: "Maximum",
      data: max
    },
    {
      name: 'Actual',
      data: actual,
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: true
        },
        animations: {
          enabled: false,
          // easing: 'easeinout',
          // speed: 800,
          // animateGradually: {
          //     enabled: false,
          //     delay: 150
          // },
          // dynamicAnimation: {
          //     enabled: false,
          //     speed: 350
          // }
        },
      },
      colors: ['#9DA8A1', '#9DA8A1', '#26725e'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [2, 2, 3],
        curve: 'smooth',
        dashArray: [5, 8, 0]
      },
      legend: {
        show: false,
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        type: 'datetime',
        categories: datetime
        // min: new Date('2024-02-14T20:00:00Z').getTime(),
        // max: new Date('2024-02-15T12:00:00Z').getTime(),
      },
      tooltip: {
        x: {
          show: true,
          format: 'dd MMM HH:mm',
        },
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " " + unit + ""
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + " " + unit + ""
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + " " + unit + ""
              }
            }
          }
        ]
      },
      grid: {
        borderColor: '#DEF0E9',
      }
    },
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      series: [
        { ...prevState.series[0], data: min },
        { ...prevState.series[1], data: max },
        { ...prevState.series[2], data: actual }
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: datetime
        }
      }
    }));
  }, [min, max, actual, datetime]);


    return (
        <div className='DetailsCard'>
            <span className='stats-title'>{title} {unit}</span>

            <div className='graph-container'>
                <ReactApexChart options={state.options} series={state.series} type='line' width={'100%'} height={'100%'} />
            </div>
        </div>
    )   
}

export default DetailsCard