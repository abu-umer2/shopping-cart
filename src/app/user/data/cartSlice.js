import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cartTotalQuantity: 0,
  cartTotoalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart(state, action) {
      state.items.push(action.payload);
    },
    deleteItem(state, action) {
      console.log("Before delete:", state.items.length);
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      console.log("After delete:", state.items);
    },
    emptyCart(state) {
      state.items = [];
    },
  },
});

export const { addTocart, deleteItem, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
