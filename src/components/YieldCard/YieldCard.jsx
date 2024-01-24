import React, { useState } from 'react'
import './YieldCard.css'

// import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { BarChart} from '@mui/x-charts/BarChart';


const yieldFormatter = (value) => `${value}kg`;

const YieldCard = () => {

  const [data, setData] = useState(data1);

  const handleData1Click = () => {
    setData(data1);
  };

  const handleData2Click = () => {
    setData(data2);
  };

    return (
      <div className="YieldCard">
        <div className='YieldTopBar'>
          <span className='Title'>Yield</span>
          <div className='Buttons'>
            <button onClick={handleData1Click}>Monthly</button>
            <button onClick={handleData2Click}>Weekly</button>
          </div>
        </div>
        <Box sx={{ width: '100%' }}>
          <BarChart
            height={200}
            dataset={data}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              { dataKey: 'yield', label: 'Yield', valueFormatter: yieldFormatter },
            ]}
            slots={{
              bar: (props) => {
                const { style } = props;
                const str = JSON.stringify(style);
                const arr = JSON.parse(str);
                const { x, y, height, width } = arr;
    
                const radius = 10;

                // SVG path for bar shape
                const d = `M${x},${y + radius}
                  A${radius},${radius} 0 0 1 ${x + radius},${y}
                  L${x + width - radius},${y}
                  A${radius},${radius} 0 0 1 ${x + width},${y + radius}
                  L${x + width},${y + height}
                  L${x},${y + height}
                  Z`;
                return <path d={d} fill='#FFCC7A'></path>;
              },
            }}
            colors={['#FFCC7A']}
            slotProps={{ legend: { hidden: true } }}
            margin={{bottom:30, top:10, left:40, right:40}}
        />
        </Box>
        
    </div>
    );
  }

const data1 = [
  { month: 'Jan', yield: 10 },
  { month: 'Feb', yield: 20 },
  { month: 'Mar', yield: 30 },
  { month: 'Apr', yield: 30 },
  { month: 'May', yield: 20 },
  { month: 'Jun', yield: 10 },
  { month: 'Jul', yield: 30 },
  { month: 'Aug', yield: 20 },
  { month: 'Sep', yield: 10 },
  { month: 'Oct', yield: 0 },
  { month: 'Nov', yield: 30 },
  { month: 'Dec', yield: 20 },
];

const data2 = [
  { month: '1 Jan - 7 Jan', yield: 30 },
  { month: '8 Jan - 14 Jan', yield: 20 },
  { month: '15 Jan - 21 Jan', yield: 10 },
];

export default YieldCard