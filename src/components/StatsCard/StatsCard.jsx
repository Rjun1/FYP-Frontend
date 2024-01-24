import React from 'react'
import "./StatsCard.css"

import Lottie from "lottie-react"
import energyAnimation from "../../assets/animation/energy-animation.json"
import { display, height, width } from '@mui/system'

const StatsCard = (props) => {
  return (
    <div className='StatsCard'>
      <div className='LeftSide'>
        <div className='Animation'>
          <Lottie animationData={props.animationData}/>
        </div>
        <div className='StatsTitle'>
          {props.title}
        </div>
      </div>
      <div className='Value'>
        <span>{props.value}</span>
        <span>{props.unit}</span>
      </div>
      
    </div>
  )
}

export default StatsCard