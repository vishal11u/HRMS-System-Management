import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { RootState } from "./redux/store";  

const App: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth); 

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!token ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<Dashboard />}
              allowedRoles={["admin", "teacher", "student"]}
            />
          }
        />
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
        <Route path="*" element={<h1>404 Page Not Found...</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
