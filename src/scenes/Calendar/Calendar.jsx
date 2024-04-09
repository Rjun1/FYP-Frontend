// import React, { useState, useEffect } from 'react';
// import { Badge, Calendar, Modal, Form, Input, Button, DatePicker, TimePicker } from 'antd';
// import './Calendar.css';

// const API_BASE_URL = 'https://eefypintegration.azurewebsites.net';

// const addTaskToServer = async (newTask) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/calendar/insertSchedule`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newTask),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to add task');
//     }

//     const responseData = await response.json();
//     console.log('Task added successfully:', responseData);
//   } catch (error) {
//     console.error('Error adding task:', error.message);
//   }
// };

// const retrieveTasksFromServer = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/calendar/retrieveSchedules`);
//     if (!response.ok) {
//       throw new Error('Failed to retrieve tasks');
//     }

//     const data = await response.json();
//     if (data.success === 1) {
//       return data.result;
//     } else {
//       throw new Error('Failed to retrieve tasks');
//     }
//   } catch (error) {
//     console.error('Error retrieving tasks:', error.message);
//     return [];
//   }
// };

// const App = () => {
//   const [manualEvents, setManualEvents] = useState({});
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     // Load manual events from the server on component mount
//     retrieveTasksFromServer().then(result => {
//       setManualEvents(result);
//     }).catch(error => {
//       console.error('Error retrieving tasks:', error.message);
//     });
//   }, []);

  
//   const showModal = () => {
//     setIsModalVisible(true);
//     form.resetFields();
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setDeleteConfirmationVisible(false);
//   };

//   const showDeleteConfirmation = (event, date) => {
//     setSelectedEvent({ event, date });
//     setDeleteConfirmationVisible(true);
//   };

//   const handleDeleteEvent = async () => {
//     try {
//       const { event, date } = selectedEvent;
//       const taskId = event.id;

//       console.log('Deleting task with ID:', taskId);

//       setManualEvents((prevEvents) => {
//         const updatedEvents = { ...prevEvents };
//         const dateKey = date.format('YYYY-MM-DD');
//         updatedEvents[dateKey] = updatedEvents[dateKey].filter((item) => item.id !== taskId);
//         return updatedEvents;
//       });

//       setDeleteConfirmationVisible(false);
//     } catch (error) {
//       console.error('Error deleting event:', error.message);
//     }
//   };

//   const handleManualTaskSubmit = async (values) => {
//     try {
//       const { task, date, time } = values;

//       const dateKey = date.format('YYYY-MM-DD');
//       const newTask = {
//         id: Date.now().toString(),
//         type: 'manual',
//         content: `${date.format('D MMM YYYY')} ${time.format('hh:mm A')}`,
//         task: `${task}`,
//       };

//       setManualEvents((prevEvents) => {
//         const updatedEvents = { ...prevEvents };
//         if (updatedEvents[dateKey]) {
//           updatedEvents[dateKey].push(newTask);
//         } else {
//           updatedEvents[dateKey] = [newTask];
//         }
//         return updatedEvents;
//       });

//       // Add the task to the server
//       await addTaskToServer(newTask);

//       setIsModalVisible(false);
//     } catch (error) {
//       console.error('Error handling manual task submit:', error.message);
//     }
//   };

//   const getListData = (value, manualEvents) => {
//     const dateKey = value.format('YYYY-MM-DD');
//     return manualEvents[dateKey] || [];
//   };

//   const dateCellRender = (value) => {
//     const listData = getListData(value, manualEvents);
//     return (
//       <ul className="events">
//         {listData.map((item) => (
//           <li key={item.id}>
//             <div>
//               <Badge status={item.type} text={item.content} />
//             </div>
//             <div className="task">
//               {item.task}
//             </div>
//             <Button
//               type="link"
//               onClick={() => showDeleteConfirmation(item, value)}
//               style={{ marginLeft: '8px' }}
//             >
//               Delete
//             </Button>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const cellRender = (current, info) => {
//     if (info.type === 'date') return dateCellRender(current);
//     return info.originNode;
//   };

//   return (
//     <div className="calendar-container">
//       <h2>Calendar</h2>

//       <Button type="primary" onClick={showModal}>
//         Add Manual Event
//       </Button>

//       <Modal
//         title="Manual Event Input"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form form={form} onFinish={handleManualTaskSubmit} layout="vertical">
//           <Form.Item label="Task" name="task" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item label="Date" name="date" rules={[{ required: true }]}>
//             <DatePicker />
//           </Form.Item>
//           <Form.Item label="Time" name="time" rules={[{ required: true }]}>
//             <TimePicker format="hh:mm A" showNow use12Hours minuteStep={15} />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Add Task
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Modal
//         title="Delete Event"
//         visible={deleteConfirmationVisible}
//         onOk={handleDeleteEvent}
//         onCancel={handleCancel}
//       >
//         <p>Are you sure you want to delete this event?</p>
//       </Modal>

//       <Calendar cellRender={cellRender} />
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { Badge, Calendar, Modal, Form, Input, Button, DatePicker, TimePicker } from 'antd';
import './Calendar.css';

const API_BASE_URL = 'https://eefypintegration.azurewebsites.net';

const retrieveTasksFromServer = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/calendar/retrieveSchedules`);
    if (!response.ok) {
      throw new Error('Failed to retrieve tasks');
    }

    const data = await response.json();
    if (data.success === 1) {
      return data.result;
    } else {
      throw new Error('Failed to retrieve tasks');
    }
  } catch (error) {
    console.error('Error retrieving tasks:', error.message);
    return [];
  }
};

const addTaskToServer = async (newTask) => {
  try {
    const response = await fetch(`${API_BASE_URL}/calendar/insertSchedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error('Failed to add task: ' + response.statusText);
    }

    const responseData = await response.json();
    console.log('Task added successfully:', responseData);
  } catch (error) {
    console.error('Error adding task:', error.message);
  }
};

const deleteTaskFromServer = async (scheduleId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/calendar/deleteSchedule/${scheduleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    console.log(`Task ${scheduleId} deleted successfully!`);
  } catch (error) {
    console.error('Error deleting task:', error.message);
  }
};

const App = () => {
  const [manualEvents, setManualEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Load manual events from the server on component mount
    retrieveTasksFromServer().then(result => {
      setManualEvents(result);
    }).catch(error => {
      console.error('Error retrieving tasks:', error.message);
    });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setDeleteConfirmationVisible(false);
  };

  const showDeleteConfirmation = (event, date) => {
    setSelectedEvent({ event, date });
    setDeleteConfirmationVisible(true);
  };

  const handleDeleteEvent = async () => {
    try {
      const { event } = selectedEvent;
      const scheduleId = event.ScheduleId;

      // Call deleteTaskFromServer to delete the task
      await deleteTaskFromServer(scheduleId);

      // Update the state to reflect the deletion
      setManualEvents(prevEvents => prevEvents.filter(item => item.ScheduleId !== scheduleId));

      setDeleteConfirmationVisible(false);
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
  };

  const handleManualTaskSubmit = async (values) => {
    try {
      const { task, date, time } = values;
  
      const newTask = {
        id: Date.now().toString(),
        type: 'manual',
        content: date.format('D MMM YYYY') + ' ' + time.format('hh:mm A'),
        task: task,
      };
  
      // Add the task to the server
      await addTaskToServer(newTask);

      // Update the state to reflect the addition
      setManualEvents(prevEvents => [...prevEvents, newTask]);
  
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error handling manual task submit:', error.message);
    }
    retrieveTasksFromServer().then(result => {
      setManualEvents(result);
    }).catch(error => {
      console.error('Error retrieving tasks:', error.message);
    });
  };
  
  const getListData = (value, manualEvents) => {
    const dateKey = value.format('D MMM YYYY');
    return manualEvents.filter(item => {
      const itemDate = new Date(item.content).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      return itemDate === dateKey;
    });
  };

  const dateCellRender = value => {
    const listData = getListData(value, manualEvents);
    return (
      <ul className="events">
        {listData.map(item => {
          return (
            <li key={item.ScheduleId}>
              <div>
                <Badge status={item.Type} text={item.content} />
              </div>
              <div className="task">{item.Task}</div>
              <Button
                type="link"
                onClick={() => showDeleteConfirmation(item, value)}
                style={{ marginLeft: '8px' }}
              >
                Delete
              </Button>
            </li>
          );
        })}
      </ul>
    );
  };
  

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>

      <Button type="primary" onClick={showModal}>
        Add Manual Event
      </Button>

      <Modal
        title="Manual Event Input"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleManualTaskSubmit} layout="vertical">
          <Form.Item label="Task" name="task" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Time" name="time" rules={[{ required: true }]}>
            <TimePicker format="hh:mm A" showNow use12Hours minuteStep={15} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Event"
        visible={deleteConfirmationVisible}
        onOk={handleDeleteEvent}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this event?</p>
      </Modal>

      <Calendar cellRender={cellRender} />
    </div>
  );
};

export default App;
