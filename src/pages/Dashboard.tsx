import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { RootState, AppDispatch } from "../redux/store";  

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const user = useSelector((state: RootState) => state.auth.user);  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-black">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.name || "User"}
      </h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Dashboard;
