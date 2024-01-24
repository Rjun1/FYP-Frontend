import React, { useState, useEffect } from 'react';
import './NotificationCenter.css';
import Schedule from '../Schedule/Schedule';

const NotificationCenter = () => {
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4001/tasks');
      if (!response.ok) {
        throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
      }

      const tasksData = await response.json();
      console.log('Fetched tasks successfully:', tasksData);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up interval for periodic fetching (every 5 seconds in this example)
    const fetchInterval = setInterval(() => {
      fetchData();
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(fetchInterval);
  }, []);

  // Sort tasks by date before rendering ( NOT WORKING!!!!! NEED TO DEBUG)
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="NotificationCenter">
      <div>
        <h3>Schedule</h3>
        <div className="Schedule">
          <Schedule tasks={sortedTasks} />
        </div>
      </div>
      <div>
        <h3>Alerts</h3>
        {/* Render your alerts component here */}
      </div>
    </div>
  );
};

export default NotificationCenter;
