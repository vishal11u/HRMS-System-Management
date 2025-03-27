import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AuthState, User } from "../types/loginandregisterTypes";
import { loginUsers } from "../services/loginandrefister";

export const loginUser = createAsyncThunk<
  { user: User; token: string },
  { username: string; password: string },
  { rejectValue: string }
>("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await loginUsers(userData.username, userData.password);

    if (response.status === 200 || response?.token) {
      const token = response?.token;

      Cookies.set("token", token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      const decoded: User = jwtDecode(token);
      localStorage.setItem("user", JSON.stringify(decoded));

      return { user: decoded, token };
    } else {
      return rejectWithValue(response.data?.message || "Login failed");
    }
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "An error occurred");
  }
});

const storedToken = Cookies.get("token") || null;
const storedUser = storedToken
  ? JSON.parse(localStorage.getItem("user") || "null")
  : null;

const initialState: AuthState = {
  isLoggedIn: !!storedUser && !!storedToken,
  user: storedUser,
  roles:
    storedUser && storedToken
      ? jwtDecode<{ roles: string[] }>(storedToken).roles || []
      : [],
  token: storedToken,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.roles = [];
      Cookies.remove("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
          state.roles = action.payload.user.roles || [];
        }
      )
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Login failed";
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
