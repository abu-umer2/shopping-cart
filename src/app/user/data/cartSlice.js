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
    setCartItems(state, action) {
      state.items = action.payload;
    },
    addTocart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === newItem.productId
      );
      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
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

    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const {
  addTocart,
  deleteItem,
  emptyCart,
  setCartItems,
  updateQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
