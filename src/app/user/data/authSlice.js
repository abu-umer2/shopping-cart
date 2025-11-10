import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      sessionStorage.setItem("token", action.payload.accessToken);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      state.error = null;
    },
    logout(state) {
      state.user = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
