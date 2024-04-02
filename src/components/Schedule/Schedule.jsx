// import React, { useState, useEffect } from 'react';
// import DoneIcon from '@mui/icons-material/Done';

// const Schedule = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     // Function to fetch tasks from the server
//     const fetchTasks = async () => {
//       try {
//         const response = await fetch('https://eefypintegration.azurewebsites.net/calendar/retrieveSchedules');
//         if (!response.ok) {
//           throw new Error('Failed to fetch tasks');
//         }
//         const data = await response.json();
//         // Assuming the response data contains an array of tasks
//         setTasks(data.result); // Update tasks state with the fetched data
//       } catch (error) {
//         console.error('Error fetching tasks:', error.message);
//       }
//     };

//     // Call the fetchTasks function when the component mounts
//     fetchTasks();
//   }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

//   const handleDone = (taskId) => {
//     // Add logic to handle the "Done" action, e.g., update the task status in the backend

//     // For now, let's just log a message to the console
//     console.log(`Task ${taskId} marked as done!`);
//   };

//   return (
//     <div className="ScheduleContainer">
//       {tasks.map((task) => (
//         <div key={task.ScheduleId} className={`task-item ${task.Status ? 'done' : ''}`}>
//           <div>{task.Datetime}</div>
//           {task.type === 'manual' ? (
//             <div>{task.ScheduleDescription}</div>
//           ) : (
//             <>
//               <div>{task.content}</div>
//               <div>Task: {task.Task}</div>
//             </>
//           )}
//           {!task.Status && (
//             <DoneIcon
//               style={{ cursor: 'pointer', marginLeft: '10px' }}
//               onClick={() => handleDone(task.ScheduleId)}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Schedule;


import React, { useState, useEffect } from 'react';

const Schedule = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://eefypintegration.azurewebsites.net/calendar/retrieveSchedules');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data.result);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };
    const intervalId = setInterval(() => {
      fetchTasks();
    }, 3000); // 1000 milliseconds = 1 second
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleDelete = async (scheduleId) => {
    try {
      const response = await fetch(`https://eefypintegration.azurewebsites.net/calendar/deleteSchedule/${scheduleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.ScheduleId !== scheduleId));
      console.log(`Task ${scheduleId} deleted successfully!`);
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  return (
    <div className="ScheduleContainer">
      {tasks.map((task) => (
        <div key={task.ScheduleId} className={`task-item ${task.Status ? 'done' : ''}`}>
          <div>{task.Datetime}</div>
          {task.type === 'manual' ? (
            <div>{task.ScheduleDescription}</div>
          ) : (
            <>
              <div>{task.content}</div>
              <div>Task: {task.Task}</div>
            </>
          )}
          {!task.Status && (
            <>
              <button onClick={() => handleDelete(task.ScheduleId)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Schedule;
