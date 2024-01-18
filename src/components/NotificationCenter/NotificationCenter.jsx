import React from 'react'
import './NotificationCenter.css'
import Schedule from '../Schedule/Schedule'

const NotificationCenter = () => {
  return (
    <div className='NotificationCenter'>
        <div>
            <h3>Schedule</h3>
            <Schedule/>
        </div>
        <div>
            <h3>Alerts</h3>
        </div>
    </div>
  )
}

export default NotificationCenter