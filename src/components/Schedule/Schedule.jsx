import React from 'react';

const Schedule = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <div>{task.date}</div>
          {task.type === 'manual' ? (
            <div>{task.content}</div>
          ) : (
            <>
              <div>Title: {task.title}</div>
              <div>Time: {task.time}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Schedule;
