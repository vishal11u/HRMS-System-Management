import { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="py-4 px-10 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="border p-2 w-full mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="border p-2 w-full mb-3"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="text-red-500 mb-4 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
