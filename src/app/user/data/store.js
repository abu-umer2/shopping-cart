import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import admiAuthReducer from "./admitAuthSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    adminAuth: admiAuthReducer,
  },
});
export default store;
