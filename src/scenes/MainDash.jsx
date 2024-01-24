import React from 'react'
import './MainDash.css'
import PlantCards from '../components/PlantCards/PlantCards'
import Table from '../components/Table/Table'
import NotificationCenter from '../components/NotificationCenter/NotificationCenter'
import YieldCard from '../components/YieldCard/YieldCard'
import StatsCard from '../components/StatsCard/StatsCard'

// Import animation
import energyAnimation from "../assets/animation/energy-animation.json"
import carbonAnimation from "../assets/animation/carbon-animation.json"

const MainDash = () => {
return (
    <div className = "MainDash">
        <div className = "DashContent">
            <h1 style={{marginTop:"0rem", marginBottom:"0"}}>Dashboard</h1>
            <PlantCards/>
            <div className='Stats-Row'>
                <YieldCard/>
                <div className='Stats-Cards'>
                    <StatsCard animationData={energyAnimation} title='Energy Usage' value='38.8' unit='kwh/kg'/>
                    <StatsCard animationData={carbonAnimation} title='Carbon Footprint' value='18.4' unit='kg'/>
                </div>
            </div>
            
            <Table/>

        </div>
        <NotificationCenter/>
    </div>
    )
}

export default MainDash