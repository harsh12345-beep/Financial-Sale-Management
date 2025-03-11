import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AdminSignUp from "./pages/AdminSignUp";
import AdminLogin from "./pages/AdminLogin";
import Sidebar from "./components/Sidebar";
import TeamManagerOverview from "./pages/TeamManagerOverview";
import PerformanceReports from "./pages/PerformanceReports";
import AdministrativeControl from "./pages/AdministrativeControl";
import AssignTask from "./pages/AssignTask";
import Dashboard from "./pages/Dashboard";
import TeamManagement from "./pages/TeamManagement";

// ✅ Helper function to check if user is authenticated
const isAuthenticated = () => !!localStorage.getItem("token");

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin-login" />;
};

// ✅ Layout with Sidebar (Ensures Proper Styling)
const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="app-content">{children}</div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔹 Redirect users based on authentication */}
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/admin-login" />}
        />

        {/* 🔹 Authentication Pages */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />

        {/* 🔹 Dashboard Pages (Require Authentication) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/team-management"
          element={
            <ProtectedRoute>
              <Layout>
                <TeamManagement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/team-manager-overview"
          element={
            <ProtectedRoute>
              <Layout>
                <TeamManagerOverview />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assign-task"
          element={
            <ProtectedRoute>
              <Layout>
                <AssignTask />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/administrative-control"
          element={
            <ProtectedRoute>
              <Layout>
                <AdministrativeControl />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/performance-reports"
          element={
            <ProtectedRoute>
              <Layout>
                <PerformanceReports />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 🔹 Catch-All Route */}
        <Route path="*" element={<Navigate to="/admin-login" />} />
      </Routes>
    </Router>
  );
}

export default App;
