import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { Button } from "antd";
import { HomeOutlined, LoginOutlined } from "@ant-design/icons";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg mt-2 text-gray-600">
        Oops! The page you're looking for doesn't exist.
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

export default NotFound;
