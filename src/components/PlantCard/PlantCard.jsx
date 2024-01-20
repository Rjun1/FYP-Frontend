import React, {useState} from 'react'
import {motion, AnimateSharedLayout} from 'framer-motion'
import {CircularProgressbar} from 'react-circular-progressbar'
import Chart from "react-apexcharts";
import 'react-circular-progressbar/dist/styles.css';
import './PlantCard.css'

import {
  UilTimes,
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
import bokChoy from "../../imgs/bokChoy.png";
import choySum from "../../imgs/choySum.jpeg";
import kaiLan from "../../imgs/kaiLan.jpg";

const color = [{ color: '#559f89'}, { color: '#fff'}, { color: '#FFF'}]
const backgroundColor = ['#FFF', '#ffc9b4', '#ff6d71']
const boxShadow = ["0px 5px 15px 0px #19302b28", "0px 5px 15px 0px #19302b28", "0px 5px 15px 0px #19302b41"]
const icon = [<UilHeart/>, <UilMedicalSquare/>, <UilHeartBreak/>]

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
          backgroundColor: backgroundColor[getStatusIndex(param.status)],
          // boxShadow: boxShadow[getStatusIndex(param.status)]
        }}
        onClick={setExpanded}
        layoutId='expandableCard'
        >
          <div className="plant-container">
            <img src={getPic(param.title)} alt="Plant Image" className="circular-image"/>
          </div>
          <div className="detail">
            <span>{param.title}</span>
            <div className='status-container' style={ color[getStatusIndex(param.status)]}>
              {icon[getStatusIndex(param.status)]}
              <span >{param.status}</span>
            </div>
            <span>Date planted: {param.plantDate}</span>
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

function getStatusIndex(status) {
  switch (status) {
    case 'Healthy':
      return 0;
    case 'Attention':
      return 1;
    case 'Critical':
      return 2;
    default:
      return {};
  }
}

function getPic(title) {
  switch (title) {
    case 'Bak Choy':
      return bokChoy;
    case 'Cai Xim':
      return choySum;
    case 'Kai Lan':
      return kaiLan;
    default:
      return {};
  }
}

export default PlantCard