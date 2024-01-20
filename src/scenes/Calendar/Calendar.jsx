import React, { useState } from 'react';
import { Badge, Calendar, Modal, Form, Input, Button, DatePicker, TimePicker } from 'antd';

import './Calendar.css';

const addTaskToServer = async (newTask) => {
  try {
    const response = await fetch('http://localhost:4001/tasks', {
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
  }
};

const getListData = (value, manualEvents) => {
  const dateKey = value.format('YYYY-MM-DD');
  return manualEvents[dateKey] || [];
};

const App = () => {
  const [manualEvents, setManualEvents] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleManualTaskSubmit = async (values) => {
    const { task, date, time } = values;

    const dateKey = date.format('YYYY-MM-DD');
    const newTask = {
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

    // Add the task to the server
    await addTaskToServer(newTask);

    setIsModalVisible(false);
  };

  const dateCellRender = (value) => {
    const listData = getListData(value, manualEvents);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
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
        <Form onFinish={handleManualTaskSubmit} layout="vertical">
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

      {/* Ant Design Calendar component */}
      <Calendar cellRender={cellRender} />
    </div>
  );
};

export default App;
