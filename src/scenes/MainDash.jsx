import React, { useState, useEffect } from 'react'
import './MainDash.css'
import PlantCards from '../components/PlantCards/PlantCards'
import Table from '../components/Table/Table'
import NotificationCenter from '../components/NotificationCenter/NotificationCenter'
import YieldCard from '../components/YieldCard/YieldCard'
import StatsCard from '../components/StatsCard/StatsCard'

import { formatDate } from '../helperFunctions/utils'

// Import animation
import energyAnimation from "../assets/animation/energy-animation.json"
import carbonAnimation from "../assets/animation/carbon-animation.json"

function createData(name, batchNum, datePlanted, harvestDate, expectedYield) {
    return { name, batchNum, datePlanted, harvestDate, expectedYield };
  }  

const MainDash = () => {

    // Fetch latest active plant sensor data & active batch info
    const [latestActiveSensorData, setLatestActiveSensorData] = useState([])
    const [activeBatchInfo, setActiveBatchInfo] = useState([])
    const [stats, setStats] = useState({})
    const [rows, setRows] = useState([])

    const fetchData = () => {
        fetch('http://localhost:4002/result')
            .then(res => res.json())
            .then(data => {setLatestActiveSensorData(data);})
            .catch(e => console.log(e.message));
        fetch('http://localhost:4000/PlantData')
            .then(res => res.json())
            .then(data => {setActiveBatchInfo(data);})
            .catch(e => console.log(e.message));
        fetch('http://localhost:4000/Stats')
            .then(res => res.json())
            .then(data => {setStats(data);})
            .catch(e => console.log(e.message));
    }

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        if (activeBatchInfo.length !== 0) {
            const rowsData = []
            for (var info of activeBatchInfo) {
                rowsData.push(createData(info.PlantName, info.PlantBatchId, formatDate(info.DatePlanted), formatDate(info.ExpectedHarvestDate), info.ExpectedYield))
            }
            setRows(rowsData)
          }
    }, [activeBatchInfo]);

    

return (
    <div className = "MainDash">
        <div className = "DashContent">
            <h1 style={{marginTop:"0rem", marginBottom:"0"}}>Dashboard</h1>
            <PlantCards latestActiveSensorData={latestActiveSensorData} activeBatchInfo={activeBatchInfo}/>
            <div className='Stats-Row'>
                <YieldCard/>
                <div className='Stats-Cards'>
                    <StatsCard animationData={energyAnimation} title='Energy Usage' value={stats.EnergyUsage} unit='kwh'/>
                    <StatsCard animationData={carbonAnimation} title='Carbon Footprint' value={stats.CarbonFootprint} unit='kgCO2e'/>
                </div>
            </div>
            
            { (<Table rows={rows}/>)}
        </div>
        <NotificationCenter/>
    </div>
    )
}

export default MainDash