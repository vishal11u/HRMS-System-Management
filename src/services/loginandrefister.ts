import axios from "../utils/axiosInstance";

export const loginUsers = async (email: string, password: string) => {
  const response = await axios.post("/auth/emailLogin", { email, password });
  return response.data;
};
