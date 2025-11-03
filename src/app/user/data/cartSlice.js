import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import dbserver from "../../dbserver";

const getToken = () => {
  try {
    const userData = sessionStorage.getItem("userAuth");
    return userData;
  } catch (error) {
    return null;
  }
};

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotoalAmount: 0,
};

export const getCart = () => {
  const token = getToken();
  console.log("tt", token);

  return axios.get(`http://${dbserver.server}:${dbserver.port}/cart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart(state, action) {
      state.cartItems.push(action.payload);
    },
  },
});

export const { addTocart } = cartSlice.actions;
export default cartSlice.reducer;
