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
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    },

    // reducequantity(state, action) {
    //   const item = state.items.filter(
    //     (item) => item._id === action.payload._id
    //   );
    //   if (item) {
    //     item.quan;
    //   }
    // },
  },
});

export const { addTocart, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
