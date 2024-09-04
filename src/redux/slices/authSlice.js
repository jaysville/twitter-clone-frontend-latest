import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  sessionExpiresAt: null,
  error: null,
  timeout: false,
  didLogOut: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    refreshToken: (state, action) => {
      const newToken = action.payload;

      state.token = newToken;

      state.timeout = false;
      state.sessionExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
    },
    timeout: (state) => {
      state.user = null;
      state.token = null;
      state.timeout = true;
      state.sessionExpiresAt = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.timeout = false;
      state.sessionExpiresAt = null;
      state.didLogOut = true;
    },
  },
});

export const { updateUser, refreshToken, timeout, logout } = authSlice.actions;

export default authSlice.reducer;
