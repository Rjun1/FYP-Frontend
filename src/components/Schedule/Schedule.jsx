import React, { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';

const Schedule = ({ tasks }) => {
  const handleDone = (taskId) => {
    // Add logic to handle the "Done" action, e.g., update the task status in the backend

    // For now, let's just log a message to the console
    console.log(`Task ${taskId} marked as done!`);
  };

  return (
    <div className="ScheduleContainer">
      {tasks.map((task) => (
        <div key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
          <div>{task.date}</div>
          {task.type === 'manual' ? (
            <div>{task.content}</div>
          ) : (
            <>
              <div>Title: {task.title}</div>
              <div>Time: {task.time}</div>
            </>
          )}
          {!task.done && (
            <DoneIcon
              style={{ cursor: 'pointer', marginLeft: '10px' }}
              onClick={() => handleDone(task.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Schedule;



// import React, { useState } from 'react';
// import DoneIcon from '@mui/icons-material/Done';

// const Schedule = ({ tasks }) => {
//   const [updatedTasks, setUpdatedTasks] = useState(tasks);

//   const handleDone = (taskId) => {
//     // Update the tasks array to exclude the task that is marked as done
//     const updatedTasksList = updatedTasks.filter((task) => task.id !== taskId);
//     setUpdatedTasks(updatedTasksList);

//     // Add logic to handle the "Done" action, e.g., update the task status in the backend

//     // For now, let's just log a message to the console
//     console.log(`Task ${taskId} marked as done!`);
//   };

//   return (
//     <div className="ScheduleContainer">
//       {updatedTasks.map((task) => (
//         <div key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
//           <div>{task.date}</div>
//           {task.type === 'manual' ? (
//             <div>{task.content}</div>
//           ) : (
//             <>
//               <div>Title: {task.title}</div>
//               <div>Time: {task.time}</div>
//             </>
//           )}
//           {!task.done && (
//             <DoneIcon
//               style={{ cursor: 'pointer', marginLeft: '10px' }}
//               onClick={() => handleDone(task.id)}
//             />
//             // You can customize the DoneIcon with additional styles or props
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Schedule;

