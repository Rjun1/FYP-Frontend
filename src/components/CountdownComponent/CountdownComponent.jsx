import React from 'react'
import './CountdownComponent.css'
import { Statistic } from 'antd'
const { Countdown } = Statistic

function CountdownComponent({expectedHarvestDate}) {
  
  return (
    <div className='CountdownComponent'>
      <span>Countdown</span>
      <div className='countdown'>
        <Countdown 
          value={expectedHarvestDate} 
          format="D [day] H [hr] m [min] s [s]" 
          />
      </div>
      
    </div>
  )
}

export default CountdownComponent