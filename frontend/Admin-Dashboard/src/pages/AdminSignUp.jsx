import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminSignUp } from "../api/authAPI"; // Import API function
import "../styles/AdminSignUp.css";

const AdminSignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "admin",  // Default role
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Toggle Password Visibility
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        // Basic Validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are required!");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true); // Show loading state
        try {
            await adminSignUp({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role, // Send role to API
            });

            alert("Registration Successful!");
            navigate("/AdminLogin"); // Redirect to login after successful signup
        } catch (err) {
            setError(err.message || "Signup failed! Please try again.");
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h1 className="signup-title">ADMIN SIGN UP</h1>
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="form-group">
                        <label htmlFor="name">Enter Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    {/* Email Input */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    {/* Role Selection */}
                    <div className="form-group">
                        <label htmlFor="role">Select Role</label>
                        <select id="role" name="role" value={formData.role} onChange={handleChange} required>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>

                    {/* Password Input */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                            <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} required />
                            <button type="button" className="eye-button" onClick={togglePasswordVisibility}>
                                {showPassword ? "👁️" : "🙈"}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-input-container">
                            <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                            <button type="button" className="eye-button" onClick={toggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? "👁️" : "🙈"}
                            </button>
                        </div>
                    </div>

                    {/* Login Redirect */}
                    <div className="login-link">
                        Already have an account?{" "}
                        <button type="button" onClick={() => navigate("/AdminLogin")}>
                            Go to Login
                        </button>
                    </div>

                    {/* Signup Button */}
                    <button type="submit" className="signup-button" disabled={loading}>
                        {loading ? "Signing Up..." : "SIGN UP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminSignUp;
