import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import { FaTh, FaUserFriends, FaTasks, FaUsersCog, FaShieldAlt, FaChartBar, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function Sidebar() {
    const [adminName, setAdminName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch admin's name from localStorage
        const storedAdminName = localStorage.getItem("adminName");
        if (storedAdminName) {
            setAdminName(storedAdminName);
        }
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("https://erp-r0hx.onrender.com/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Logout failed!");
            }

            // Clear localStorage on successful logout
            localStorage.removeItem("token");
            localStorage.removeItem("adminName");

            // Navigate to the login page
            navigate("/admin-login");
        } catch (error) {
            console.error("Error during logout:", error);
            // Optionally, handle error (e.g., display error message)
        }
    };

    return (
        <div className="sidebar">
            <div className="logo-container">
                <div className="logo">FS</div>
                <span className="logo-text">FinSage</span>
            </div>

            {/* Admin Info Section */}
            <div className="admin-info">
                <FaUserCircle className="admin-icon" />
                <span className="admin-name">{adminName ? `Hello, ${adminName}` : "Welcome, Admin"}</span>
            </div>

            <div className="menu-items">
                <div className="menu-item">
                    <FaTh className="icon" />
                    <Link to="/dashboard"><span>Dashboard</span></Link>
                </div>

                <div className="menu-item">
                    <FaUserFriends className="icon" />
                    <Link to="/team-management"><span>Team Management</span></Link>
                </div>

                <div className="menu-item">
                    <FaTasks className="icon" />
                    <Link to="/assign-task"><span>Assign Task</span></Link>
                </div>

                <div className="menu-item">
                    <FaUsersCog className="icon" />
                    <Link to="/team-manager-overview"><span>Team Managers</span></Link>
                </div>

                <div className="menu-item">
                    <FaShieldAlt className="icon" />
                    <Link to="/administrative-control"><span>Administrative Control</span></Link>
                </div>

                <div className="menu-item">
                    <FaChartBar className="icon" />
                    <Link to="/performance-reports"><span>Performance Reports</span></Link>
                </div>

                {/* Logout Button */}
                <div className="menu-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
                    <FaSignOutAlt className="icon" />
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
