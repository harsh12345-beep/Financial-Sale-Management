import React, { useState } from "react";
import "../styles/TeamManagerOverview.css";
import { FaSearch, FaPlus, FaPen, FaTrash } from "react-icons/fa";

function TeamManagerOverview() {
    const [managers, setManagers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newManager, setNewManager] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Update the new manager state when input changes.
    const handleInputChange = (e) => {
        setNewManager({ ...newManager, [e.target.name]: e.target.value });
    };

    // Add a new manager.
    const handleAddManager = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication token not found. Please log in.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://erp-r0hx.onrender.com/api/manager/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newManager),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to add manager.");
            }

            // Attempt to retrieve the new manager from the response.
            let managerData = data.manager;
            if (!managerData) {
                // If the response doesn't contain the new manager, create one using form data.
                managerData = { ...newManager, id: Date.now() };
            }

            // Format the manager for display in the table.
            const formattedManager = {
                id: managerData._id || managerData.id || Date.now(),
                name: managerData.user?.name || managerData.name || newManager.name,
                email: managerData.user?.email || managerData.email || newManager.email,
                phone: managerData.user?.phone || managerData.phone || newManager.phone,
            };

            // Append the new manager to the table.
            setManagers((prevManagers) => [...prevManagers, formattedManager]);

            // Reset form fields and hide the form.
            setNewManager({ name: "", email: "", password: "", phone: "" });
            setShowAddForm(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete manager from table.
    const handleDeleteManager = async (managerId) => {
        // Optional: Call your backend delete endpoint to remove the manager from the server.
        // const token = localStorage.getItem("token");
        // try {
        //   const response = await fetch(`https://erp-r0hx.onrender.com/api/manager/${managerId}`, {
        //       method: "DELETE",
        //       headers: {
        //           "Authorization": `Bearer ${token}`,
        //       },
        //   });
        //   if (!response.ok) {
        //       throw new Error("Failed to delete manager.");
        //   }
        // } catch (error) {
        //   setError(error.message);
        //   return;
        // }

        // Remove the manager from the table.
        setManagers((prevManagers) =>
            prevManagers.filter((manager) => manager.id !== managerId)
        );
    };

    return (
        <div className="main-content">
            {/* Header Section */}
            <div className="header">
                <h1 className="title">Team Manager Overview</h1>
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Search managers..." className="search-input" />
                </div>
                <button
                    className="add-button"
                    onClick={() => {
                        setShowAddForm(true);
                        setError("");
                    }}
                >
                    <FaPlus className="plus-icon" /> Add Manager
                </button>
            </div>

            {/* Inline Add Manager Form */}
            {showAddForm && (
                <div className="add-manager-form">
                    <h3>Add New Manager</h3>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleAddManager} className="add-manager-inline-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={newManager.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={newManager.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={newManager.password}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={newManager.phone}
                            onChange={handleInputChange}
                            required
                            pattern="[0-9]*"
                        />
                        <div className="form-buttons">
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? "Adding Manager..." : "Add Manager"}
                            </button>
                            <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Managers Table */}
            <div className="managers-section">
                <h2>Team Managers</h2>
                <div className="managers-table">
                    <div className="table-header">
                        <div className="column">Name</div>
                        <div className="column">Email</div>
                        <div className="column">Phone</div>
                        <div className="column actions">Actions</div>
                    </div>

                    {managers.map((manager) => (
                        <div key={manager.id} className="table-row">
                            <div className="column">{manager.name}</div>
                            <div className="column">{manager.email}</div>
                            <div className="column">{manager.phone}</div>
                            <div className="column actions">
                                <button className="edit-btn">
                                    <FaPen />
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteManager(manager.id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TeamManagerOverview;
