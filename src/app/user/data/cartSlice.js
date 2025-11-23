import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cartTotalQuantity: 0,

  cartTotoalAmount: 0,
};
const calculateTotals = (state) => {
  state.cartTotalQuantity = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  state.cartTotoalAmount = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload;
      calculateTotals(state);
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
        state.items.cartTotalQuantity += 1;
      }
      calculateTotals(state);
    },
    deleteItem(state, action) {
      console.log("Before delete:", state.items.length);
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      calculateTotals(state);
      state.items.cartTotalQuantity -= 1;

      console.log("After delete:", state.items);
    },
    emptyCart(state) {
      state.items = [];
      calculateTotals(state);
    },

    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
      calculateTotals(state);
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
