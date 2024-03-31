import React, {useState} from 'react'
import {motion, AnimateSharedLayout} from 'framer-motion'
import LinearProgress from '@mui/material/LinearProgress';

// import 'react-circular-progressbar/dist/styles.css';
import './PlantCard.css'

import {
  UilTimes,
} from "@iconscout/react-unicons";

// Import helper functions
import { dataUnits, formatDate, formatDateAndTime, getPic, getStyle, sensors } from '../../helperFunctions/utils';
import SensorCard from '../SensorCard/SensorCard';

function PlantCard({batchInfo, latestSensorData}) {

    const [expanded, setExpanded] = useState(false)
    
    return (
        <AnimateSharedLayout>
            {
              (batchInfo && Object.keys(batchInfo).length > 0 && (batchInfo.status.toLowerCase() === "healthy" || batchInfo.status.toLowerCase() === "unknown")) ? 
              (<UnexpandableCompactCard param={batchInfo}/>) :
              (expanded?
                <ExpandedCard param={batchInfo} setExpanded={() => setExpanded(false)} latestSensorData={latestSensorData}/> :
                <ExpandableCompactCard param = {batchInfo} setExpanded={()=>setExpanded(true)}/>)
            }
        </AnimateSharedLayout>
        
    )
}

// Unexpandable Compact Card
function UnexpandableCompactCard({param}){
  return (
      <div className="CompactCard Unexpandable"
      style={{
        backgroundColor: getStyle(param.status).backgroundColor,
      }}
      >
        <div className="plant-container">
          <img src={getPic(param.PlantName)} alt="Plant Image" className="circular-image"/>
        </div>
        <div className="detail">
          <span>{param.PlantName}</span>
          <div className='status-container' style={ getStyle(param.status).color }>
            {getStyle(param.status).icon}
            <span>{param.status && (param.status.charAt(0).toUpperCase() + param.status.slice(1))}</span>
          </div>
          <span>Date planted: {formatDate(param.DatePlanted)}</span>
        </div>
    </div>
  )
}

// Compact Card
function ExpandableCompactCard({param, setExpanded}){
    return (
        <motion.div className="CompactCard Expandable"
        style={{
          backgroundColor: getStyle(param.status).backgroundColor,
        }}
        onClick={setExpanded}
        layoutId='expandableCard'
        >
          <div className="plant-container">
            <img src={getPic(param.PlantName)} alt="Plant Image" className="circular-image"/>
          </div>
          <div className="detail">
            <span>{param.PlantName}</span>
            <div className='status-container' style={ getStyle(param.status).color }>
              {getStyle(param.status).icon}
              <span>{param.status && (param.status.charAt(0).toUpperCase() + param.status.slice(1))}</span>
            </div>
            <span>Date planted: {formatDate(param.DatePlanted)}</span>
            <span>Date planted: {formatDate(param.DatePlanted)}</span>
          </div>
      </motion.div>
    )
}

// ExpandedCard
function ExpandedCard({ param, setExpanded, latestSensorData}) {

  console.log(latestSensorData)
    return(
        <motion.div 
            className='ExpandedCard'
            style={{borderColor: getStyle(param.status).backgroundColor, borderWidth: '1px', borderStyle: 'solid'}}
            layoutId='expandableCard'
        >
          <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "#002212" }}>
              <UilTimes onClick={setExpanded} />
          </div>
          <span className='plant-name' 
            style={{borderColor: getStyle(param.status).backgroundColor, 
              borderWidth: '3px', 
              borderStyle: 'solid',
              borderRadius: '10px',
              padding: '3px 10px'}}>
            {param.PlantName}
          </span>
          <span style={{marginBottom: '5px'}}>
            Last updated: {formatDateAndTime(latestSensorData.Datetime[0])}
          </span>
          
          <span className='sensors-grid'>
          {latestSensorData && Object.keys(latestSensorData).length > 0 && sensors.map(sensorName => (
            <SensorCard
              key={`SensorCard-${sensorName}`}
              title={sensorName}
              unit={dataUnits[sensorName]}
              min={latestSensorData[sensorName + "_min"][0]}
              max={latestSensorData[sensorName + "_max"][0]}
              actual={latestSensorData[sensorName][0]}
              optimal={latestSensorData[sensorName + "_optimal"][0]}
              status={latestSensorData.status}
            />
          ))} 
          </span>
        </motion.div>
        
    )
}

export default PlantCard