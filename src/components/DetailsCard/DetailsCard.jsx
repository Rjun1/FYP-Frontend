import React, { useState } from 'react'
import "./DetailsCard.css"

import ReactApexChart from 'react-apexcharts';

function DetailsCard({title, unit, dataset, backend}) {

  const [state, setState] = useState({
    series: [{
      name: "predicted",
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
    },
    {
      name: "optimal",
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    },
    {
      name: 'actual',
      data: [87, 10, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: true
        },
      },
      colors: ['#6cb6a0', '#9be6cf', '#26725e'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [2, 2, 3],
        curve: 'smooth',
        dashArray: [5, 8, 0]
      },
      // title: {
      //   text: '',
      //   align: 'left'
      // },
      legend: {
        show: false,
        // tooltipHoverFormatter: function(val, opts) {
        //   return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
        // }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        type: 'datetime',
        categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
          '10 Jan', '11 Jan', '12 Jan'
        ],
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (unit)"
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + " (unit)"
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + " (unit)";
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

//   // Extracting temperature values
//   const temperatures = backend.map(entry => entry.Temperature);

//   // Extracting datetime categories
//   // const categories = backend.map(entry => new Date(entry.Datetime).toLocaleDateString());
//   const categories = backend.map(entry => {
//     const date = new Date(entry.Datetime);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero if needed
//     const day = date.getDate().toString().padStart(2, '0'); // Adding leading zero if needed
//     const hours = date.getHours().toString().padStart(2, '0'); // Adding leading zero if needed
//     const minutes = date.getMinutes().toString().padStart(2, '0'); // Adding leading zero if needed
//     const seconds = date.getSeconds().toString().padStart(2, '0'); // Adding leading zero if needed
//     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// });

//   console.log("Temperature Data:", temperatures);
//   console.log("Datetime Categories:", categories);

//   const [state, setState] = useState({
//     series: [{
//       name: "predicted",
//       data: [45, 52, 38, 24, 33, 26]
//     },
//     {
//       name: "optimal",
//       data: [35, 41, 62, 42, 13, 18]
//     },
//     {
//       name: 'actual',
//       data: temperatures
//     }],
//     options: {
//       chart: {
//         height: 350,
//         type: 'line',
//         zoom: {
//           enabled: true
//         },
//       },
//       colors: ['#6cb6a0', '#9be6cf', '#26725e'],
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         width: [2, 2, 3],
//         curve: 'smooth',
//         dashArray: [5, 8, 0]
//       },
//       // title: {
//       //   text: 'Page Statistics',
//       //   align: 'left'
//       // },
//       legend: {
//         show: false,
//         // tooltipHoverFormatter: function(val, opts) {
//         //   return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
//         // }
//       },
//       markers: {
//         size: 0,
//         hover: {
//           sizeOffset: 6
//         }
//       },
//       xaxis: {
//         type: 'datetime',
//         categories: categories,
//       },
//       tooltip: {
//         y: [
//           {
//             title: {
//               formatter: function (val) {
//                 return val + " (unit)"
//               }
//             }
//           },
//           {
//             title: {
//               formatter: function (val) {
//                 return val + " (unit)"
//               }
//             }
//           },
//           {
//             title: {
//               formatter: function (val) {
//                 return val + " (unit)";
//               }
//             }
//           }
//         ]
//       },
//       grid: {
//         borderColor: '#DEF0E9',
//       }
//     },
//   });


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