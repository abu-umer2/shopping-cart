import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  showLoginModel: false,
  redirectAfterLogin: "/",
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
    openLoginModel(state, action) {
      state.showLoginModel = true;
      state.redirectAfterLogin = action.payload || "/";
    },
    closeLoginModel(state) {
      state.showLoginModel = false;
    },
  },
});

export const { login, logout, openLoginModel, closeLoginModel } =
  authSlice.actions;
export default authSlice.reducer;
