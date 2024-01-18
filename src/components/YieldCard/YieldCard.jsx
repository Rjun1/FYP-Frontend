import React from 'react'
import Chart from "react-apexcharts";
import './YieldCard.css'

const YieldCard = () => {
    const data = {
      series: [
        {
          name: "Yield",
          data: [10, 50, 130, 190, 240, 250, 300],
        },
      ],
      options: {
        chart: {
          type: "area",
          height: "auto",
        },
  
        fill: {
          colors: ["#fff"],
          type: "gradient",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          colors: ["#081C15"],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
        grid: {
          show: false,
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-20T01:30:00.000Z",
            "2018-09-21T02:30:00.000Z",
            "2018-09-22T03:30:00.000Z",
            "2018-09-23T04:30:00.000Z",
            "2018-09-24T05:30:00.000Z",
            "2018-09-25T06:30:00.000Z",
          ],
        },
        yaxis: {
          show: false
        },
        toolbar:{
          show: false
        }
      },
    };
    return (
        <div className="YieldCard">
            <span>Yield</span>
            <Chart options={data.options} series={data.series} type="area" />
        </div>
    )
  };

export default YieldCard