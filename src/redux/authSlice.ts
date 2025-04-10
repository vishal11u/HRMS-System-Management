import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AuthState, User } from "../types/loginandregisterTypes";
import {
  loginUsers,
  registerUser as registerUserService,
  checkTokenExpireOrNot as verifyTokenService,
} from "../services/loginandregister";

// Verify token thunk that uses the API service
export const verifyToken = createAsyncThunk<
  { isValid: boolean; user?: User; tokenExpiry?: number },
  void,
  { rejectValue: string }
>("auth/verifyToken", async (_, { rejectWithValue }) => {
  try {
    const response = await verifyTokenService();
    if (response.code === 200 && response.data) {
      return { 
        isValid: true,
        user: response.data.user,
        tokenExpiry: response.data.tokenExpiry
      };
    }
    return { isValid: false };
  } catch (error: any) {
    return rejectWithValue(error.message || "Token verification failed");
  }
});

// Login thunk
export const loginUser = createAsyncThunk<
  { user: User; token: string },
  { emailOrUsername: string; password: string },
  { rejectValue: string }
>("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await loginUsers(
      userData.emailOrUsername,
      userData.password
    );

    if (response.code === 200 || response?.data?.token) {
      const token = response?.data?.token;
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

// Register user thunk
export const registerUser = createAsyncThunk<
  { message: string },
  { username: string; email: string; password: string; role: string },
  { rejectValue: string }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await registerUserService(
      userData.username,
      userData.email,
      userData.password,
      userData.role
    );

    if (response.code === 201 || response.code === 200) {
      return { message: response.message || "Registration successful" };
    } else {
      return rejectWithValue(response.message || "Registration failed");
    }
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "An error occurred during registration"
    );
  }
});

// Check for stored token/user
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
  registerSuccess: false,
  registerError: null,
  tokenVerified: false,
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
    clearRegisterState: (state) => {
      state.registerSuccess = false;
      state.registerError = null;
    },
    setTokenVerified: (state, action: PayloadAction<boolean>) => {
      state.tokenVerified = action.payload;
      if (!action.payload && state.isLoggedIn) {
        // Automatically logout if token is invalid
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.roles = [];
        Cookies.remove("token");
        localStorage.removeItem("user");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
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
          state.tokenVerified = true;
        }
      )
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Login failed";
        }
      )

      // Registration cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registerError = null;
        state.registerSuccess = false;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.loading = false;
          state.registerSuccess = true;
        }
      )
      .addCase(
        registerUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.registerError = action.payload || "Registration failed";
        }
      )

      // Token verification cases
      // .addCase(verifyToken.pending, (state) => {
      // })
      .addCase(
        verifyToken.fulfilled,
        (state, action: PayloadAction<{ isValid: boolean; user?: User; tokenExpiry?: number }>) => {
          state.tokenVerified = action.payload.isValid;

          if (action.payload.isValid && action.payload.user) {
            // Update user data if token is valid
            state.user = action.payload.user;
            state.isLoggedIn = true;
            state.roles = action.payload.user.roles || [];
          } else if (!action.payload.isValid && state.isLoggedIn) {
            // If token is invalid but user is logged in, log them out
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            state.roles = [];
            Cookies.remove("token");
            localStorage.removeItem("user");
          }
        }
      )
      .addCase(verifyToken.rejected, (state) => {
        // If token verification fails, consider token invalid
        state.tokenVerified = false;

        // Log user out
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.roles = [];
        Cookies.remove("token");
        localStorage.removeItem("user");
      });
  },
});

export const { logout, clearRegisterState, setTokenVerified } =
  authSlice.actions;
export default authSlice.reducer;
