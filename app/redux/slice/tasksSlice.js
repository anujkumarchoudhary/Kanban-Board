import { BaseURL } from "@/app/util/baseUrl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create task
export const createTask = createAsyncThunk(
  "task/create",
  async (body, { rejectWithValue }) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await axios.post(`${BaseURL}/task/create`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get all task
export const getAllTask = createAsyncThunk(
  "task/getAllTask",
  async (_, { rejectWithValue }) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await axios.get(`${BaseURL}/task/getAll`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
// Get task by ID
export const getSingleTask = createAsyncThunk(
  "task/getSingleTask",
  async (id, { rejectWithValue }) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await axios.get(`${BaseURL}/auth/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  "user/update",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await axios.patch(`${BaseURL}/task/${id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "user/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await axios.delete(`${BaseURL}/auth/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // remove token if user deleted
      localStorage.removeItem("token");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
const initialToken =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
// Signup

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: initialToken,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // signup
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.success = "Login successful";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // get user
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });

    // update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.success = action.payload.message;
      state.user = { ...state.user, ...action.payload.data };
    });

    // delete user
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.success = action.payload.message;
      state.user = null;
      state.token = null;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
