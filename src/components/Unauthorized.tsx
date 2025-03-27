import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-4xl font-bold">Unauthorized Access</h1>
      <p className="text-lg mt-2 text-gray-600">
        You do not have permission to view this page.
      </p>
      {!isLoggedIn && (
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Go to Login
        </button>
      )}
    </div>
  );
};

export default Unauthorized;
