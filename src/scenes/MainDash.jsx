import React from 'react'
import './MainDash.css'
import Cards from '../components/PlantCards/PlantCards'
import Table from '../components/Table/Table'
import NotificationCenter from '../components/NotificationCenter/NotificationCenter'
import YieldCard from '../components/YieldCard/YieldCard'

const MainDash = () => {
return (
    <div className = "MainDash">
        <div className = "DashContent">
            <h1 style={{marginBottom:"0px"}}>Dashboard</h1>
            <Cards/>
            {/* <YieldCard/> */}
            <Table/>

        </div>
        <NotificationCenter/>
    </div>
    )
}

export default MainDash