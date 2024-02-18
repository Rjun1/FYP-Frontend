import React from 'react'
import './CountdownComponent.css'
import { Statistic } from 'antd'
const { Countdown } = Statistic

const onFinish = () => {
  console.log('finished!')
}
const onChange = (val) => {
  if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
    console.log('changed!')
  }
}

function CountdownComponent({deadline}) {
  // var deadline = 'Thursday, February 8, 2024 6:50:40.213 PM GMT+08:00'
  // console.log(deadline)

  
  const deadlineTimestamp = getDeadlineTimestamp({plantDate: deadline, growthDays: 8})
  return (
    <div className='CountdownComponent'>
      <span>Countdown</span>
      <div className='countdown'>
        <Countdown 
          value={deadlineTimestamp} 
          format="D [day] H [hr] m [min] s [s]" 
          />
      </div>
      
    </div>
  )
}

function dateToTimestamp(dateString) {
  const timestamp = new Date(dateString).getTime()
  // console.log(timestamp ) 
  return timestamp
}

function getDeadlineTimestamp({plantDate, growthDays}) {
  const startTimestamp = dateToTimestamp(plantDate)
  // console.log(startTimestamp + 1000 * 60 * 60 * 24 * growthDays ) // Output will be the timestamp in milliseconds
  return (startTimestamp + 1000 * 60 * 60 * 24 * growthDays )
}

export default CountdownComponent