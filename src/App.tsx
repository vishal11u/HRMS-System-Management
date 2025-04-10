import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import Login from "./components/Login";
import HRMSDashboard from "./components/HRMSDashboard";
import { useEffect } from "react";
import { verifyToken } from "./redux/authSlice";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(verifyToken());
    }
  }, [isLoggedIn, dispatch]);

  return isLoggedIn ? <HRMSDashboard /> : <Login />;
};

export default App;
