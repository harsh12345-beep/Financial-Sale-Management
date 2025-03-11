import React, { useState } from "react";
import "../styles/AssignTask.css";

function AssignTask() {
    // State to store the list of managers
    const [managers, setManagers] = useState([]);
    // Toggle for showing/hiding the add manager form
    const [showAddForm, setShowAddForm] = useState(false);
    // State for new manager form values
    const [newManager, setNewManager] = useState({
        name: "",
        department: "",
        monthlyTarget: "",
        quarterlyTarget: "",
        yearlyTarget: "",
        status: "Pending" // default status, can be updated based on business logic
    });

    // Update newManager state on input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewManager({ ...newManager, [name]: value });
    };

    // Add the new manager to the managers array
    const handleAddManager = (e) => {
        e.preventDefault();
        const managerToAdd = {
            ...newManager,
            id: Date.now() // generate a unique id
        };

        setManagers([...managers, managerToAdd]);

        // Reset form and hide it
        setNewManager({
            name: "",
            department: "",
            monthlyTarget: "",
            quarterlyTarget: "",
            yearlyTarget: "",
            status: "Pending"
        });
        setShowAddForm(false);
    };

    // Delete manager by filtering it out of the state array
    const handleDeleteManager = (id) => {
        setManagers(managers.filter((manager) => manager.id !== id));
    };

    return (
        <div className="assign-main-content">
            {/* Page Header */}
            <div className="header">
                <div className="title">Assign Task</div>
                <input type="text" placeholder="Search here..." className="search-box" />
                <button className="add-button" onClick={() => setShowAddForm(true)}>
                    + Add New Manager
                </button>
            </div>

            {/* Add Manager Form */}
            {showAddForm && (
                <div className="add-manager-form">
                    <h2>Add New Manager</h2>
                    <form onSubmit={handleAddManager}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Manager Name"
                            value={newManager.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={newManager.department}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="monthlyTarget"
                            placeholder="Monthly Target"
                            value={newManager.monthlyTarget}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="quarterlyTarget"
                            placeholder="Quarterly Target"
                            value={newManager.quarterlyTarget}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="yearlyTarget"
                            placeholder="Yearly Target"
                            value={newManager.yearlyTarget}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="form-buttons">
                            <button type="submit" className="submit-btn">Add Manager</button>
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => setShowAddForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Assign Targets Section */}
            <div className="assign-targets">
                <h2>Assign Targets</h2>
                <p>Manage and track team targets</p>

                {/* Target Stats */}
                <div className="stats">
                    <div className="stat-box">Total Managers: {managers.length}</div>
                    <div className="stat-box">Active Targets</div>
                    <div className="stat-box">Completion Rate</div>
                </div>

                {/* Task Assignment Table */}
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Manager</th>
                            <th>Department</th>
                            <th>Monthly Target</th>
                            <th>Quarterly Target</th>
                            <th>Yearly Target</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map((manager) => (
                            <tr key={manager.id}>
                                <td>{manager.name}</td>
                                <td>{manager.department}</td>
                                <td>${Number(manager.monthlyTarget).toLocaleString()}</td>
                                <td>${Number(manager.quarterlyTarget).toLocaleString()}</td>
                                <td>${Number(manager.yearlyTarget).toLocaleString()}</td>
                                <td>{manager.status}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDeleteManager(manager.id)}>
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AssignTask;
