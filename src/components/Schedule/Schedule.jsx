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
//   const [taskList, setTaskList] = useState(tasks);

//   const handleDone = (taskId) => {
//     // Filter out the task with the specified ID
//     const updatedTasks = taskList.filter(task => task.id !== taskId);

//     // Update the state with the filtered tasks
//     setTaskList(updatedTasks);

//     // You can also add logic here to update the task status in the backend
//     console.log(`Task ${taskId} marked as done!`);
//   };

//   return (
//     <div className="ScheduleContainer">
//       {taskList.map((task) => (
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
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Schedule;
