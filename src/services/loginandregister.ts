import axios from "../utils/axiosInstance";
import Cookies from "js-cookie";

export const loginUsers = async (emailOrUsername: string, password: string) => {
  const response = await axios.post("/auth/login", {
    emailOrUsername,
    password,
  });
  return response.data;
};

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  role: string
) => {
  const response = await axios.post("/auth/register", {
    username,
    email,
    password,
    role,
  });
  return response.data;
};

export const checkTokenExpireOrNot = async () => {
  const token = Cookies.get("token");
  if (!token) throw new Error("No token found in cookies");

  try {
    const response = await axios.get("/auth/verify-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return { code: 401, message: "Token is invalid or expired" };
    }
    throw error;
  }
};
