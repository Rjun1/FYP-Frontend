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
    const [plantYieldByMonth, setPlantYieldByMonth] = useState({})
    const [plantYieldByWeek, setPlantYieldByWeek] = useState({})
    const [formattedPlantYieldByMonth, setFormattedPlantYieldByMonth] = useState([])
    const [formattedPlantYieldByWeek, setFormattedPlantYieldByWeek] = useState([])
    const [stats, setStats] = useState({})
    const [rows, setRows] = useState([])

    // // Fetch data from local
    // const fetchData = () => {
    //     fetch('http://localhost:4002/result')
    //         .then(res => res.json())
    //         .then(data => {setLatestActiveSensorData(data);})
    //         .catch(e => console.log(e.message));
    //     fetch('http://localhost:4000/PlantData')
    //         .then(res => res.json())
    //         .then(data => {setActiveBatchInfo(data);})
    //         .catch(e => console.log(e.message));
    //     fetch('http://localhost:4000/Stats')
    //         .then(res => res.json())
    //         .then(data => {setStats(data);})
    //         .catch(e => console.log(e.message));
    // }

    // useEffect(() => {
    //     fetchData();
    // }, []);
    // useEffect(() => {
    //     if (activeBatchInfo.length !== 0) {
    //         const rowsData = []
    //         for (var info of activeBatchInfo) {
    //             rowsData.push(createData(info.PlantName, info.PlantBatchId, formatDate(info.DatePlanted), formatDate(info.ExpectedHarvestDate), info.ExpectedYield))
    //         }
    //         setRows(rowsData)
    //       }
    // }, [activeBatchInfo]);

    // Fetch data from cloud
    const urlActiveBatchInfoAndYield = 'https://eefypintegration.azurewebsites.net/plant/activePlantBatchInfoAndYield'
    const urlLatestActiveSensorData = 'https://eefypintegration.azurewebsites.net/plant/retrieveLatestActivePlantBatchSensorData'
    const urlplantYieldByMonth = 'https://eefypintegration.azurewebsites.net/plant/plantYieldByMonth'
    const urlplantYieldByWeek = 'https://eefypintegration.azurewebsites.net/plant/plantYieldByWeek'
    const urlEnvironmentalData = 'https://eefypintegration.azurewebsites.net/energyConsumption/getEnergyConsumptionValue'

    const fetchBackendData = () => {
        fetch(urlLatestActiveSensorData)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {setLatestActiveSensorData(data["result"]);})
            .catch(error => {
                console.error('Error fetching latest active sensor data:', error);
            });
        fetch(urlActiveBatchInfoAndYield)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {setActiveBatchInfo(data["result"]);})
            .catch(error => {
                console.error('Error fetching active batch info and yield:', error);
            });
        fetch(urlplantYieldByMonth)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {setPlantYieldByMonth(data["result"]);})
            .catch(error => {
                console.error('Error fetching plant yield by month:', error);
            });
        fetch(urlplantYieldByWeek)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {setPlantYieldByWeek(data["result"]);})
            .catch(error => {
                console.error('Error fetching plant yield by week:', error);
            });
        fetch(urlEnvironmentalData)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {setStats(data["result"]);})
            .catch(error => {
                console.error('Error fetching environmental data:', error);
            });
    }

    useEffect(() => {
        fetchBackendData();
        const intervalId = setInterval(() => {
            
            if (latestActiveSensorData.length == 0 && 
                activeBatchInfo.length == 0 && 
                Object.keys(plantYieldByMonth).length == 0 && 
                Object.keys(plantYieldByWeek).length == 0 && 
                Object.keys(stats).length == 0) {
                // console.log("!!!!!!!!!!! !!!!!!!!!!! Running first fetch type")
                // console.log("latestActiveSensorData", latestActiveSensorData)
                // console.log("activeBatchInfo", activeBatchInfo)
                // console.log("plantYieldByMonth", plantYieldByMonth)
                // console.log("plantYieldByWeek", plantYieldByWeek)
                // console.log("stats", stats)
                // fetchBackendData();
            }
        }, 1000); // 1000 milliseconds = 1 second
    
        const secondIntervalId = setInterval(() => {
            if (latestActiveSensorData.length !== 0 && 
                activeBatchInfo.length !== 0 && 
                Object.keys(plantYieldByMonth).length !== 0 && 
                Object.keys(plantYieldByWeek).length !== 0 && 
                Object.keys(stats).length !== 0) {
                // console.log("!!!!!!!!!!! Running second fetch type")
                fetchBackendData();
            }
        }, 10000); // 30000 milliseconds = 30 seconds

        return () => {
            clearInterval(intervalId);
            clearInterval(secondIntervalId);
        };
    }, []);
    
    useEffect(() => {
        if (activeBatchInfo.length !== 0) {
            const rowsData = []
            for (var info of activeBatchInfo) {
                rowsData.push(createData(info.PlantName, info.PlantBatchId, formatDate(info.DatePlanted), formatDate(info.ExpectedHarvestDate), parseFloat(info.ExpectedYield).toFixed(2)))
            }
            setRows(rowsData)
          }
    }, [activeBatchInfo]);

    useEffect(() => {
        const formattedData = []
        for (const plantName in plantYieldByMonth) {
            const plantData = plantYieldByMonth[plantName];
            const newData = {
                name: plantName,
                data: []
            };
        
            plantData.Month.forEach((month, index) => {
            newData.data.push({
                x: month,
                y: plantData.WeightHarvested[index].toFixed(2) || 0
            });
            });
        
            formattedData.push(newData);
        }

        setFormattedPlantYieldByMonth(formattedData);
    }, [plantYieldByMonth]);

    useEffect(() => {
        const formattedData = []
        for (const plantName in plantYieldByWeek) {
            const plantData = plantYieldByWeek[plantName];
            const newData = {
                name: plantName,
                data: []
            };
        
            plantData.Week.forEach((week, index) => {
            newData.data.push({
                x: `W${week}`,
                y: plantData.WeightHarvested[index].toFixed(2) || 0
            });
            });
        
            formattedData.push(newData);
        }

        setFormattedPlantYieldByWeek(formattedData);
    }, [plantYieldByWeek]);

    return (
        <div className = "MainDash">
            <div className = "DashContent">
                <h1 style={{marginTop:"0rem", marginBottom:"0"}}>Dashboard</h1>
                <PlantCards latestActiveSensorData={latestActiveSensorData} activeBatchInfo={activeBatchInfo}/>
                <div className='Stats-Row'>
                    {formattedPlantYieldByMonth && formattedPlantYieldByMonth.length !== 0 &&
                        formattedPlantYieldByWeek && formattedPlantYieldByWeek.length !== 0 &&
                        (<YieldCard monthly={formattedPlantYieldByMonth} weekly={formattedPlantYieldByWeek}/>)
                    }
                    {stats && Object.keys(stats).length > 0 && (<div className='Stats-Cards'>
                        <StatsCard animationData={energyAnimation} title='Energy Usage' value={stats.EnergyUsage} unit='kwh'/>
                        <StatsCard animationData={carbonAnimation} title='Carbon Footprint' value={stats.CarbonFootprint} unit='kgCO2e'/>
                    </div>)}
                </div>
                
                <Table rows={rows}/>
            </div>
            <NotificationCenter/>
        </div>
    )
}

const yieldMthlyMock = [{
    name: 'Choy Sum',
    data: [
      {x:'Jan', y: 23}, 
      {x:'Feb', y: 11}, 
      {x:'Mar', y: 15}, 
      {x:'Apr', y: 12}, 
      {x:'Jun', y: 25}, 
      {x:'Jul', y: 14},
      {x:'Aug', y: 17},
      {x:'Sep', y: 25},
      {x:'Oct', y: 23},
      {x:'Nov', y: 26},
      {x:'Dec', y: 5},
    ]}, {
    name: 'Mizuna',
    data: [
      {x:'Jan', y: 25}, 
      {x:'Feb', y: 11}, 
      {x:'Mar', y: 33}, 
      {x:'Apr', y: 12}, 
      {x:'Jun', y: 34}, 
      {x:'Jul', y: 21},
      {x:'Aug', y: 15},
      {x:'Sep', y: 30},
      {x:'Oct', y: 23},
      {x:'Nov', y: 26},
      {x:'Dec', y: 30},
    ]}, {
    name: 'Basil',
    data: [
      {x:'Jan', y: 44}, 
      {x:'Feb', y: 22}, 
      {x:'Mar', y: 33}, 
      {x:'Apr', y: 12}, 
      {x:'Jun', y: 34}, 
      {x:'Jul', y: 21},
      {x:'Aug', y: 15},
      {x:'Sep', y: 30},
      {x:'Oct', y: 23},
      {x:'Nov', y: 26},
      {x:'Dec', y: 44},
    ]}, 
  ];
  
  const yieldWklyMock = [{
    name: 'Choy Sum',
    data: [
      {x:'W1', y: 44}, 
      {x:'W2', y: 11}, 
      {x:'W3', y: 33}, 
      {x:'W4', y: 12}, 
      {x:'W5', y: 34}, 
    ]}, {
    name: 'Mizuna',
    data: [
      {x:'W1', y: 44}, 
      {x:'W2', y: 11}, 
      {x:'W3', y: 33}, 
      {x:'W4', y: 12}, 
      {x:'W5', y: 34}, 
    ]}, {
    name: 'Basil',
    data: [
      {x:'W1', y: 44}, 
      {x:'W2', y: 11}, 
      {x:'W3', y: 33}, 
      {x:'W4', y: 12}, 
      {x:'W5', y: 34}, 
    ]}, 
  ];

export default MainDash