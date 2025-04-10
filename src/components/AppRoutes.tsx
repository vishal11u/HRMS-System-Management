import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import EmployeeList from "../pages/EmployeeList";
import EmployeeManagement from "../pages/EmployeeManagement";
import JobPostings from "../pages/JobPostings";
import Payroll from "../pages/Payroll";
import Settings from "../pages/Settings";
import Unauthorized from "./Unauthorized";
import NotFound from "./NotFound";

const AppRoutes = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" /> : <Login />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["Super Admin", "Admin", "HR Manager", "Manager", "Employee"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee-list"
        element={
          <ProtectedRoute allowedRoles={["Super Admin", "Admin", "HR Manager", "Manager"]}>
            <EmployeeList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee-management"
        element={
          <ProtectedRoute allowedRoles={["Super Admin", "Admin", "HR Manager"]}>
            <EmployeeManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/job-postings"
        element={
          <ProtectedRoute allowedRoles={["Super Admin", "Admin", "HR Manager"]}>
            <JobPostings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payroll"
        element={
          <ProtectedRoute allowedRoles={["Super Admin", "Admin", "HR Manager"]}>
            <Payroll />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={["Super Admin", "Admin"]}>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Unauthorized & 404 Pages */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
