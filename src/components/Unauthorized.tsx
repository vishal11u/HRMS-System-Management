import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { Button } from "antd";
import { HomeOutlined, LoginOutlined } from "@ant-design/icons";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-4xl font-bold">Unauthorized Access</h1>
      <p className="text-lg mt-2 text-gray-600">
        You do not have permission to view this page.
      </p>
      <div className="mt-6 flex gap-4">
        {!isLoggedIn ? (
          <Button 
            type="primary" 
            icon={<LoginOutlined />}
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        ) : (
          <Button 
            type="primary" 
            icon={<HomeOutlined />}
            onClick={() => navigate("/")}
          >
            Go to Dashboard
          </Button>
        )}
      </div>
    </div>
  );
};

export default Unauthorized;
