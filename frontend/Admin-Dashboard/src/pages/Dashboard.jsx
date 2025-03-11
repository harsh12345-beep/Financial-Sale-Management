// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "../styles/Dashboard.css";

const data = [
    { name: "0", sales: 10, targets: 7, incentives: 0 },
    { name: "1", sales: 9, targets: 8, incentives: 2 },
    { name: "2", sales: 8, targets: 7, incentives: 10 },
    { name: "3", sales: 9, targets: 6, incentives: 5 },
    { name: "4", sales: 10, targets: 8, incentives: 6 },
    { name: "5", sales: 6, targets: 4, incentives: 1 },
    { name: "6", sales: 12, targets: 9, incentives: 7 },
    { name: "7", sales: 7, targets: 5, incentives: 2 },
    { name: "8", sales: 9, targets: 6, incentives: 4 },
    { name: "9", sales: 11, targets: 8, incentives: 9 },
    { name: "10", sales: 10, targets: 9, incentives: 6 },
    { name: "11", sales: 9, targets: 7, incentives: 8 },
];

const Dashboard = () => {
    const [managers, setManagers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Call the API to fetch all managers when the component mounts
    useEffect(() => {
        const fetchManagers = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Authentication token not found. Please log in.");
                    setLoading(false);
                    return;
                }
                const response = await fetch("https://erp-r0hx.onrender.com/api/manager/", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const result = await response.json();
                if (!response.ok) {
                    setError(result.message || "Failed to fetch managers.");
                } else {
                    // If your API returns an array of managers directly, use it.
                    // If the manager has a nested user object, you can extract the necessary fields.
                    const formattedManagers = result.map((manager) => ({
                        id: manager._id || manager.id,
                        name: manager.user?.name || manager.name,
                        email: manager.user?.email || manager.email,
                        phone: manager.user?.phone || manager.phone,
                    }));
                    setManagers(formattedManagers);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchManagers();
    }, []);

    return (
        <div className="dashboard-container">
            {/* Navbar Section */}
            <div className="navbar-container">
                <div className="navbar">
                    <button className="dashboard-btn">Dashboard Overview</button>
                    <div className="search-section">
                        <button className="btn2">
                            <FaSearch className="search-icon" /> Search<b>...</b>
                        </button>
                    </div>
                    <div className="icons">
                        <span className="icon">🔔</span>
                        <div className="profile-section">
                            <IoIosArrowDown className="dropdown-icon" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="stats-section">
                <div className="stat-card">Total Managers: {managers.length}</div>
                <div className="stat-card">Active Teams</div>
                <div className="stat-card">Monthly Target</div>
                <div className="stat-card">Sales</div>
            </div>

            {/* Performance Chart Section */}
            <div className="performance-container">
                <div className="performance-section">
                    <h3 className="chart-title">Performance Overview</h3>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#D9D9D9" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="sales" stroke="#2ECC71" strokeWidth={2} />
                            <Line type="monotone" dataKey="targets" stroke="#3498DB" strokeWidth={2} />
                            <Line type="monotone" dataKey="incentives" stroke="#9B59B6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="chart-labels">
                        <span className="sales-label">🟢 Sales</span>
                        <span className="targets-label">🔵 Targets</span>
                        <span className="incentives-label">🟣 Incentives</span>
                    </div>
                </div>
            </div>

            {/* Display any error or loading status */}
            {error && <p className="error-message">{error}</p>}
            {loading && <p>Loading managers...</p>}
        </div>
    );
};

export default Dashboard;
