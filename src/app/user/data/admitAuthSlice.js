import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  redirectAfterLogin: "/adminHome",
};
const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLogin(state, action) {
      console.log("Reducer payload:", action.payload);

      state.admin = action.payload.user;
      sessionStorage.setItem("adminToken", action.payload.access_token);
      sessionStorage.setItem("admin", JSON.stringify(action.payload.user));
      state.error = null;
    },
  },
});

export const { adminLogin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
