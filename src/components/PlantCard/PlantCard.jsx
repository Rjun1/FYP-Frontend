import React, {useState} from 'react'
import {motion, AnimateSharedLayout} from 'framer-motion'
import 'react-circular-progressbar/dist/styles.css';
import './PlantCard.css'

import {
  UilTimes,
} from "@iconscout/react-unicons";

// Import helper functions
import { formatDate, getPic, getStyle } from '../../helperFunctions/utils';

function PlantCard({batchInfo}) {

    const [expanded, setExpanded] = useState(false)
    
    return (
        <AnimateSharedLayout>
            {
              batchInfo.status == "Healthy" ? 
              (<UnexpandableCompactCard param={batchInfo}/>) :
              (expanded?
                <ExpandedCard param={batchInfo} setExpanded={() => setExpanded(false)} /> :
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
            <span >{param.status}</span>
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
              <span >{param.status}</span>
            </div>
            <span>Date planted: {formatDate(param.DatePlanted)}</span>
          </div>
      </motion.div>
    )
}

// ExpandedCard
function ExpandedCard({ param, setExpanded }) {

    return(
        <motion.div 
            className='ExpandedCard'
            style={{background: param.color}}
            layoutId='expandableCard'
        >
            <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "#002212" }}>
                <UilTimes onClick={setExpanded} />
            </div>
            <span>{param.PlantName}</span>
        </motion.div>
        
    )
}

export default PlantCard