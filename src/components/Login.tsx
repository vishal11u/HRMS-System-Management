import { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";
import { FaUser, FaLock } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { toast } from "sonner";
import { useRegister } from "../context/RegisterContext";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { setIsRegister } = useRegister();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ username, password }));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 p-4">
      <Particles
        id="tsparticles"
        init={async (engine) => await loadSlim(engine)}
        options={{
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              out_mode: "out",
            },
          },
        }}
        className="absolute inset-0 z-0"
      />

      <div className="relative bg-white shadow-lg rounded-xl p-8 w-96 text-center z-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">HRMS Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              // type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              className="border pl-10 p-2 w-full rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="border pl-10 p-2 w-full rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md font-semibold transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 mt-4">Invalid Username or Password</p>
        )}

        <div className="mt-4 text-sm">
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                navigate("/register");
              }}
              className="text-blue-500 font-semibold hover:underline cursor-pointer"
            >
              Register Here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
