import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

// Initial state for the authentication slice
const initialState = {
  user: user ? user : null,
  isAuthenticated: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Async thunk to validate the user
export const validate = createAsyncThunk(
  'auth/validate',
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.validate(user, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk to sign up a new user
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk to log in a user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk to log out a user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// Create the authSlice using createSlice from Redux toolkit
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reset authentication state
    authReset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // Handling various actions and their states using extraReducers
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isAuthenticated = false;
      })
      // Similar handling for login, logout, and validate actions
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
    // ... (handling other cases)
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = ''
      state.user = action.payload
      state.isAuthenticated = true
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
      state.isAuthenticated = false
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = null
      state.isAuthenticated = false
    })
    .addCase(validate.pending, (state) => {
      state.isLoading = true
    })
    .addCase(validate.fulfilled, (state) => {
      state.isLoading = false
      state.isSuccess = true
      state.isAuthenticated = true
      state.message = ''
    })
    .addCase(validate.rejected, (state) => {
      state.isLoading = false
      state.user = null
      state.isAuthenticated = false
    })
  },
});

// Export actions and the reducer from the authSlice
export const { authReset } = authSlice.actions;
export default authSlice.reducer;
