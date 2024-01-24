import './App.css'
import Sidebar from './scenes/Sidebar'
import MainDash from './scenes/MainDash'
import PlantDetails from './scenes/PlantDetails/PlantDetails'
import Calender from './scenes/Calendar/Calendar'
import InventoryManagement from './scenes/InventoryManagement/InventoryManagement'

// Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="AppGlass">
          <Sidebar/>
          <Routes>
            <Route path="/" element={<MainDash />}/>
            <Route path="/Calender" element={<Calender />}/>
            <Route path="/InventoryManagement" element={<InventoryManagement />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
