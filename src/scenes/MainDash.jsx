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
    const urlPlantYieldByMonth = 'https://eefypintegration.azurewebsites.net/plant/plantYieldByMonth'
    const urlPlantYieldByWeek = 'https://eefypintegration.azurewebsites.net/plant/plantYieldByWeek'
    const urlEnvironmentalData = 'https://eefypintegration.azurewebsites.net/energyConsumption/getEnergyConsumptionValue'

    const fetchEnvironmentalData = async () => {
        try {
          console.log("Fetching environmental data...");
          const response = await fetch(urlEnvironmentalData);
          if (!response.ok) {
            throw new Error('Failed to fetch environmental data');
          }
          const data = await response.json();
          setStats(data.result);
          console.log("Environmental data fetched successfully.");
          return true;
        } catch (error) {
          console.error('Error fetching environmental data:', error.message);
          return false;
        }
    };
    const fetchActiveBatchInfoAndYield = async () => {
        try {
          console.log("Fetching active batch info and yield...");
          const response = await fetch(urlActiveBatchInfoAndYield);
          if (!response.ok) {
            throw new Error('Failed to fetch active batch info and yield');
          }
          const data = await response.json();
          setActiveBatchInfo(data.result);
          console.log("Active batch info and yield fetched successfully.");
          return true;
        } catch (error) {
          console.error('Error fetching active batch info and yield:', error.message);
          return false;
        }
    };
    const fetchPlantYieldByMonth = async () => {
        try {
            console.log("Fetching plant yield by month...");
            const response = await fetch(urlPlantYieldByMonth);
            if (!response.ok) {
                throw new Error('Failed to fetch plant yield by month');
            }
            const data = await response.json();
            setPlantYieldByMonth(data.result);
            console.log("Plant yield by month fetched successfully.");
            return true;
        } catch (error) {
            console.error('Error fetching plant yield by month:', error.message);
            return false;
            }
    };
    const fetchPlantYieldByWeek = async () => {
        try {
            console.log("Fetching plant yield by week...");
            const response = await fetch(urlPlantYieldByWeek);
            if (!response.ok) {
                throw new Error('Failed to fetch plant yield by week');
            }
            const data = await response.json();
            setPlantYieldByWeek(data.result);
            console.log("Plant yield by week fetched successfully.");
            return true;
        } catch (error) {
            console.error('Error fetching plant yield by week:', error.message);
            return false;
        }
    };
    const fetchLatestActiveSensorData = async () => {
        try {
        console.log("Fetching latest active sensor data...");
        const response = await fetch(urlLatestActiveSensorData);
        if (!response.ok) {
            throw new Error('Failed to fetch latest active sensor data');
        }
        const data = await response.json();
        setLatestActiveSensorData(data.result);
        console.log("Latest active sensor data fetched successfully.");
        return true;
        } catch (error) {
        console.error('Error fetching latest active sensor data:', error.message);
        return false;
        }
    };

    // useEffect to fetch data initially and setup intervals
  useEffect(() => {
    let intervalId;
    const fetchData = async () => {
        const environmentalDataSuccess = await fetchEnvironmentalData();
        
        const activeBatchInfoSuccess = await fetchActiveBatchInfoAndYield();
        
        
        const plantYieldByMonthSuccess = await fetchPlantYieldByMonth();
        const plantYieldByWeekSuccess = await fetchPlantYieldByWeek();

        const latestActiveSensorDataSuccess = await fetchLatestActiveSensorData();

        if (activeBatchInfoSuccess && latestActiveSensorDataSuccess && environmentalDataSuccess && plantYieldByMonthSuccess && plantYieldByWeekSuccess) {
            console.log("All data points fetched successfully. Switching to 10-second interval.");
            clearInterval(intervalId);
            intervalId = setInterval(async () => {
                fetchEnvironmentalData();
                fetchActiveBatchInfoAndYield();
                fetchPlantYieldByMonth();
                fetchPlantYieldByWeek();
                fetchLatestActiveSensorData();
        }, 10000);
      }
    };

    // Initial fetch loop
    intervalId = setInterval(fetchData, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);


    // Prepare data for the table
    useEffect(() => {
        if (activeBatchInfo.length !== 0) {
            const rowsData = []
            for (var info of activeBatchInfo) {
                rowsData.push(createData(info.PlantName, info.PlantBatchId, formatDate(info.DatePlanted), formatDate(info.ExpectedHarvestDate), parseFloat(info.ExpectedYield).toFixed(2)))
            }
            setRows(rowsData)
          }
    }, [activeBatchInfo]);

    // Prepare data for the yield graph
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
                y: (plantData.WeightHarvested[index] * 1000) || 0
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
                y: (plantData.WeightHarvested[index] * 1000) || 0
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
      {x:'Jan', y: 2.3}, 
      {x:'Feb', y: 1.1}, 
      {x:'Mar', y: 1.5}, 
      {x:'Apr', y: 1.2}, 
      {x:'Jun', y: 2.5}, 
      {x:'Jul', y: 1.4},
      {x:'Aug', y: 1.7},
      {x:'Sep', y: 2.5},
      {x:'Oct', y: 2.3},
      {x:'Nov', y: 2.6},
      {x:'Dec', y: 5},
    ]}, {
    name: 'Mizuna',
    data: [
      {x:'Jan', y: 2.5}, 
      {x:'Feb', y: 1.1}, 
      {x:'Mar', y: 3.3}, 
      {x:'Apr', y: 1.2}, 
      {x:'Jun', y: 3.4}, 
      {x:'Jul', y: 2.1},
      {x:'Aug', y: 1.5},
      {x:'Sep', y: 3.0},
      {x:'Oct', y: 2.3},
      {x:'Nov', y: 2.6},
      {x:'Dec', y: 3.0},
    ]}, {
    name: 'Basil',
    data: [
      {x:'Jan', y: 4.4}, 
      {x:'Feb', y: 2.2}, 
      {x:'Mar', y: 3.3}, 
      {x:'Apr', y: 1.2}, 
      {x:'Jun', y: 3.4}, 
      {x:'Jul', y: 2.1},
      {x:'Aug', y: 1.5},
      {x:'Sep', y: 3.0},
      {x:'Oct', y: 2.3},
      {x:'Nov', y: 2.6},
      {x:'Dec', y: 4.4},
    ]}, 
  ];
  
  const yieldWklyMock = [{
    name: 'Choy Sum',
    data: [
      {x:'W1', y: 4.4}, 
      {x:'W2', y: 1.1}, 
      {x:'W3', y: 3.3}, 
      {x:'W4', y: 1.2}, 
      {x:'W5', y: 3.4}, 
      {x:'W6', y: 4.4}, 
      {x:'W7', y: 1.1}, 
      {x:'W8', y: 3.3}, 
      {x:'W9', y: 1.2}, 
      {x:'W10', y: 3.4}, 
      {x:'W11', y: 4.4}, 
      {x:'W12', y: 1.1}, 
    ]}, {
    name: 'Mizuna',
    data: [
      {x:'W1', y: 4.4}, 
      {x:'W2', y: 1.1}, 
      {x:'W3', y: 3.3}, 
      {x:'W4', y: 1.2}, 
      {x:'W5', y: 3.4}, 
      {x:'W6', y: 4.4}, 
      {x:'W7', y: 1.1}, 
      {x:'W8', y: 3.3}, 
      {x:'W9', y: 1.2}, 
      {x:'W10', y: 3.4}, 
      {x:'W11', y: 4.4}, 
      {x:'W12', y: 1.1},  
    ]}, {
    name: 'Basil',
    data: [
      {x:'W1', y: 4.4}, 
      {x:'W2', y: 1.1}, 
      {x:'W3', y: 3.3}, 
      {x:'W4', y: 1.2}, 
      {x:'W5', y: 3.4}, 
      {x:'W6', y: 4.4}, 
      {x:'W7', y: 1.1}, 
      {x:'W8', y: 3.3}, 
      {x:'W9', y: 1.2}, 
      {x:'W10', y: 3.4}, 
      {x:'W11', y: 4.4}, 
      {x:'W12', y: 1.1},  
    ]}, 
  ];

export default MainDash