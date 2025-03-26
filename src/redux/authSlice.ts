import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { loginUsers } from "../services/loginandrefister";
import { AuthState, User } from "../types/loginandregisterTypes";

export const loginUser = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await loginUsers(userData?.email, userData?.password);
    console.log(response.status);

    if (response.status === 200) {
      const { token } = response.data;

      localStorage.setItem("token", token);

      const decoded: User = jwtDecode(token);

      return { user: decoded, token };
    } else {
      return rejectWithValue(response.data?.message || "Login failed");
    }
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "An error occurred");
  }
});

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
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
      localStorage.removeItem("token");
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
          localStorage.setItem("user", JSON.stringify(action.payload.user));
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
