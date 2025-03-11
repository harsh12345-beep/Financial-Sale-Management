import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { FaDownload } from "react-icons/fa";
import "../styles/AdministrativeControl.css";

const salesData = [
    { day: 1, sales: 500, target: 700 },
    { day: 2, sales: 300, target: 500 },
    { day: 3, sales: 700, target: 900 },
    { day: 4, sales: 250, target: 650 },
    { day: 5, sales: 800, target: 750 },
    { day: 6, sales: 600, target: 850 },
    { day: 7, sales: 900, target: 950 },
];

const teamPerformance = [
    { team: "Team 1", score: 80 },
    { team: "Team 2", score: 40 },
    { team: "Team 3", score: 90 },
    { team: "Team 4", score: 30 },
    { team: "Team 5", score: 85 },
];

const incentiveData = [
    { month: "Jan", incentives: 200 },
    { month: "Feb", incentives: 400 },
    { month: "Mar", incentives: 300 },
    { month: "Apr", incentives: 500 },
];

const AdministrativeControl = () => {
    return (
        <Container fluid className="admin-container">
            <Row>
                <Col md={12}>
                    <Card className="admin-header">
                        <Row className="align-items-center">
                            <Col>
                                <h5>📌 Administrative Control Overview</h5>
                            </Col>
                            <Col md={4} className="text-end">
                                <Form.Control type="search" placeholder="Search here..." className="admin-search" />
                            </Col>
                        </Row>
                    </Card>

                    <Row className="admin-statistics">
                        <Col>
                            <Card className="admin-card">💰 Total Sales</Card>
                        </Col>
                        <Col>
                            <Card className="admin-card">🎯 Targets Achieved</Card>
                        </Col>
                        <Col>
                            <Card className="admin-card">🏆 Total Incentives</Card>
                        </Col>
                    </Row>

                    <Card className="admin-chart-card">
                        <Row className="align-items-center">
                            <Col md={4}>
                                <Form.Select className="admin-dropdown">
                                    <option>This Month</option>
                                    <option>Last Month</option>
                                </Form.Select>
                            </Col>
                            <Col md={4}>
                                <Button variant="outline-primary" className="admin-filter-btn">Filter</Button>
                            </Col>
                            <Col md={4} className="text-end">
                                <Button variant="outline-secondary" className="admin-export-btn">
                                    <FaDownload /> Export
                                </Button>
                            </Col>
                        </Row>

                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="sales" stroke="#007bff" />
                                <Line type="monotone" dataKey="target" stroke="#28a745" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>

                    <Row>
                        <Col md={6}>
                            <Card className="admin-chart-card">
                                <h6>📊 Team Performance</h6>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={teamPerformance}>
                                        <XAxis dataKey="team" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="score" fill="#007bff" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="admin-chart-card">
                                <h6>💰 Incentive Distribution</h6>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={incentiveData}>
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="incentives" fill="#28a745" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default AdministrativeControl;
