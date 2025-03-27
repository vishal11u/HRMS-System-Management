import axios from "../utils/axiosInstance";

export const loginUsers = async (username: string, password: string) => {
  const response = await axios.post("/api/auth/login", { username, password });
  return response.data;
};
