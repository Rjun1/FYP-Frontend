import React from 'react';
import { Card, Col, Row } from 'antd';
import './PlantDetails.css';

const PlantDetails = () => {
  return (
    <div className="plant-details-container">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Temperature" bordered={false}>
            {/* Replace with your temperature reading and graph */}
            <p>Reading: 25°C</p>
            {/* Replace with your temperature graph */}
            <div className="graph-placeholder">Temperature Graph</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Humidity" bordered={false}>
            {/* Replace with your humidity reading and graph */}
            <p>Reading: 50%</p>
            {/* Replace with your humidity graph */}
            <div className="graph-placeholder">Humidity Graph</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Lighting" bordered={false}>
            {/* Replace with your lighting reading and graph */}
            <p>Reading: 800 lux</p>
            {/* Replace with your lighting graph */}
            <div className="graph-placeholder">Lighting Graph</div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={8}>
          <Card title="pH" bordered={false}>
            {/* Replace with your pH reading and graph */}
            <p>Reading: 6.5</p>
            {/* Replace with your pH graph */}
            <div className="graph-placeholder">pH Graph</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="EC" bordered={false}>
            {/* Replace with your EC reading and graph */}
            <p>Reading: 2.0 mS/cm</p>
            {/* Replace with your EC graph */}
            <div className="graph-placeholder">EC Graph</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="TDS" bordered={false}>
            {/* Replace with your TDS reading and graph */}
            <p>Reading: 800 ppm</p>
            {/* Replace with your TDS graph */}
            <div className="graph-placeholder">TDS Graph</div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlantDetails;
