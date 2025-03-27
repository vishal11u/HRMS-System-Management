import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Login from "./components/Login";
import Register from "./components/Register";
import HRMSDashboard from "./components/HRMSDashboard";
import { useRegister } from "./context/RegisterContext";

const App: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { isRegister } = useRegister();

  if (isLoggedIn) return <HRMSDashboard />;

  return isRegister ? <Register /> : <Login />;
};

export default App;
