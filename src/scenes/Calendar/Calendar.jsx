import React, { useState, useEffect } from 'react';
import { Badge, Calendar, Modal, Form, Input, Button, DatePicker, TimePicker } from 'antd';
import './Calendar.css';

const API_BASE_URL = 'http://localhost:4000';

const addTaskToServer = async (newTask) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error('Failed to add task');
    }

    const responseData = await response.json();
    console.log('Task added successfully:', responseData);
  } catch (error) {
    console.error('Error adding task:', error.message);
    // Handle error, e.g., show an error message to the user
  }
};

const removeTaskFromServer = async (taskId) => {
  try {
    const response = await fetch('http://localhost:4001/tasks', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    const responseData = await response.json();
    console.log('Task deleted successfully:', responseData);
  } catch (error) {
    console.error('Error deleting task:', error.message);
    // Handle error, e.g., show an error message to the user
  }
};

const App = () => {
  const [manualEvents, setManualEvents] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form] = Form.useForm(); // Use Ant Design Form hook

  useEffect(() => {
    // Load manual events from localStorage on component mount
    const storedEvents = localStorage.getItem('manualEvents');
    if (storedEvents) {
      setManualEvents(JSON.parse(storedEvents));
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields(); // Reset form fields when the modal is opened
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
      const { event, date } = selectedEvent;
      const taskId = event.id; // Assuming each event has a unique identifier

      console.log('Deleting task with ID:', taskId);

      // Remove the event from manualEvents state
      setManualEvents((prevEvents) => {
        const updatedEvents = { ...prevEvents };
        const dateKey = date.format('YYYY-MM-DD');
        updatedEvents[dateKey] = updatedEvents[dateKey].filter((item) => item.id !== taskId);
        return updatedEvents;
      });

      // Save the updated manual events to localStorage
      localStorage.setItem('manualEvents', JSON.stringify(manualEvents));

      // Remove the task from the server
      await removeTaskFromServer(taskId);

      setDeleteConfirmationVisible(false);
    } catch (error) {
      console.error('Error deleting event:', error.message);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleManualTaskSubmit = async (values) => {
    try {
      const { task, date, time } = values;

      const dateKey = date.format('YYYY-MM-DD');
      const newTask = {
        id: Date.now().toString(), // Using the current timestamp as a simple unique ID
        type: 'manual',
        content: `${date.format('D MMM')} ${time.format('hh:mm A')}: ${task}`,
      };

      setManualEvents((prevEvents) => {
        const updatedEvents = { ...prevEvents };
        if (updatedEvents[dateKey]) {
          updatedEvents[dateKey].push(newTask);
        } else {
          updatedEvents[dateKey] = [newTask];
        }
        return updatedEvents;
      });

      // Save the updated manual events to localStorage
      localStorage.setItem('manualEvents', JSON.stringify(manualEvents));

      // Add the task to the server
      await addTaskToServer(newTask);

      setIsModalVisible(false);
    } catch (error) {
      console.error('Error handling manual task submit:', error.message);
      // Handle error, e.g., show an error message to the user
    }
  };

  const getListData = (value, manualEvents) => {
    const dateKey = value.format('YYYY-MM-DD');
    return manualEvents[dateKey] || [];
  };
  

  const dateCellRender = (value) => {
    const listData = getListData(value, manualEvents);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status={item.type} text={item.content} />
            <Button
              type="link"
              onClick={() => showDeleteConfirmation(item, value)}
              style={{ marginLeft: '8px' }}
            >
              Delete
            </Button>
          </li>
        ))}
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

      {/* Button to open the manual input modal */}
      <Button type="primary" onClick={showModal}>
        Add Manual Event
      </Button>

      {/* Manual Input Modal */}
      <Modal
        title="Manual Event Input"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* Form for manual event input */}
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

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Event"
        visible={deleteConfirmationVisible}
        onOk={handleDeleteEvent}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this event?</p>
      </Modal>

      {/* Ant Design Calendar component */}
      <Calendar cellRender={cellRender} />
    </div>
  );
};

export default App;
