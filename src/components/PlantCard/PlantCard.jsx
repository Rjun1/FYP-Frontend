import React, {useState} from 'react'
import {motion, AnimateSharedLayout} from 'framer-motion'
import {CircularProgressbar} from 'react-circular-progressbar'
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import 'react-circular-progressbar/dist/styles.css';
import './PlantCard.css'
import bokChoy from "../../imgs/bokChoy.png";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
  UilUsdSquare,
  UilHeart,
  UilHeartMedical,
  UilMedicalSquare,
  UilMedkit,
  UilHeartBreak,

} from "@iconscout/react-unicons";
function PlantCard({card}) {

    const [expanded, setExpanded] = useState(false)
    
    return (
        <AnimateSharedLayout>
            {
              expanded?
                <ExpandedCard param={card} setExpanded={() => setExpanded(false)} /> :
                <CompactCard param = {card} setExpanded={()=>setExpanded(true)}/>
            }
            {/* <div>{card.title}</div> */}
        </AnimateSharedLayout>
        
    )
}



// Compact Card
function CompactCard({param, setExpanded}){
    // const Png = param.png; // Icon
    // const Img = param.img;
    return (
        <motion.div className="CompactCard"
        style={{
            // background: param.color.background,
            // boxShadow: param.color.boxShadow
        }}
        onClick={setExpanded}
        layoutId='expandableCard'
        >
          <div className="plant-container">
            <img src={bokChoy} alt="Plant Image" className="circular-image"/>
          </div>
          <div className="detail">
            <span>{param.title}</span>
            <div className='status-container' style={{color: param.color}}>
              {/* <Png /> */}
              <UilHeartBreak />
              <span >{param.status}</span>
            </div>
            <span>Last updated 1 Hour ago</span>
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
            <span>{param.title}</span>
        </motion.div>
        
    )
}

export default PlantCard