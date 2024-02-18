import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatBubble } from '@mui/icons-material';
import Sidebar from './scenes/Sidebar';
import MainDash from './scenes/MainDash';
import PlantDetails from './scenes/PlantDetails/PlantDetails';
import Calendar from './scenes/Calendar/Calendar';
import InventoryManagement from './scenes/InventoryManagement/InventoryManagement';
import Chatbot from 'react-chatbot-kit';
import config from './scenes/Chatbot/config';
import ActionProvider from './scenes/Chatbot/ActionProvider';
import MessageParser from './scenes/Chatbot/MessageParser';
import './App.css';

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <div className="AppGlass">
          <Sidebar />
          <Routes>
            <Route path="/" element={<MainDash />} />
            <Route path="/PlantDetails" element={<PlantDetails />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/InventoryManagement" element={<InventoryManagement />} />
          </Routes>
        </div>

        <div className="chat-button-container">
          <button className="chat-button" onClick={toggleChatbot}>
            <ChatBubble />
          </button>
        </div>

        {isChatbotOpen && (
          <div className="chatbot-popup">
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
