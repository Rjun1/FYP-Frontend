import React from 'react'
import './PlantDetailsTopRow.css';

import DetailsCards from '../../components/DetailsCards/DetailsCards';
import CountdownComponent from '../CountdownComponent/CountdownComponent';

// Import Ant Design components
import { ClockCircleOutlined } from '@ant-design/icons'
import { Timeline } from 'antd'

import {
    UilHeart,
    UilHeartMedical,
    UilMedicalSquare,
    UilMedkit,
    UilHeartBreak,
  } from "@iconscout/react-unicons";
import bokChoy from "../../imgs/bokChoy.png"
import choySum from "../../imgs/choySum.jpeg"
import kaiLan from "../../imgs/kaiLan.jpg"


const color = [{ color: '#065c4a'}, { color: '#ff747b'}, { color: '#FFF'}]
const backgroundColor = [
  'linear-gradient(to bottom right, #83ceb7, #defff4)', 
  'linear-gradient(to bottom right, #ffc9b4, #faeae4)', 
  'linear-gradient(to bottom right, #ff6d71, #f8bdbf)']
const icon = [<UilHeart/>, <UilMedicalSquare/>, <UilHeartBreak/>]



function PlantDetailsTopRow({details}) {
  return (
    <div className='PlantDetailsTopRow' 
      style={{
        background: backgroundColor[getStatusIndex(details.status)],
      }}>
      <div className='details-column'>
        <div>
          <span className='flex-col'>
            <div className='title'>
              {details.title}
            </div>
            <div className='status-container' style={ color[getStatusIndex(details.status)]}>
              {icon[getStatusIndex(details.status)]}
              <span >{details.status}</span>
            </div>
          </span>
          <div>
            <img src={getPic(details.title)} alt="Plant Image" className="circular-image"/>
          </div>
        </div>
        <div className='info flex-col'>
          <span><span>Date planted:</span> {details.plantDate}</span>
          {/* <span><span>Last watered:</span> {details.lastWatered}</span> */}
        </div>
      </div>

      <CountdownComponent deadline={details.plantDate}/>

      <div className='timeline'>
        <Timeline
          items={[
            {
              color: '#26725e', 
              children: 'Grow-bed preparation 2024-01-10',
            },
            {
              color: '#26725e', 
              children: 'Seeds planted 2024-01-11',
            },
            {
              dot: <ClockCircleOutlined className="timeline-clock-icon" />,
              color: '#ff6d71',
              children: 'Harvest 2024-02-01',
            },
            {
              color: '#26725e', 
              children: 'Conclude batch 2024-02-01',
            },
          ]}
        />
      </div>
    </div>
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
      case 'Bok Choy':
        return bokChoy;
      case 'Choy Sum':
        return choySum;
      case 'Kai Lan':
        return kaiLan;
      default:
        return {};
    }
  }
export default PlantDetailsTopRow