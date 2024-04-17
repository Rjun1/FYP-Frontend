import React from 'react'
import "./StatsCard.css"

import Lottie from "lottie-react"

const StatsCard = (props) => {
  const formatScientificNotation = (val, dp) => {
    const exponent = Math.floor(Math.log10(Math.abs(val)));
    const mantissa = val / Math.pow(10, exponent);
    if (exponent === 0) {
      return [`${mantissa.toFixed(dp)}`,  ''];
    }
    return [`${mantissa.toFixed(dp)}`, `${exponent}`];
  };

  // Format the value
  const value = props.value
  console.log("statsCard", value)
  var formattedValue = [value.toFixed(2), ''];
  if (props.value > 100 || props.value < 0.1) {
    formattedValue = formatScientificNotation(props.value, 2);
  }
  
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
        {(formattedValue[1] === '') ? (<span>{formattedValue[0]}</span>) :
          (<span>{formattedValue[0]}
            <span style={{fontSize:'25px'}}>×10</span>
            <span style={{fontSize:'15px', verticalAlign: 'top'}}> {formattedValue[1]}</span>
          </span>)}
        
        <span>{props.unit}</span>
      </div>
      
    </div>
  )
}

export default StatsCard