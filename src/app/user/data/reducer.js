import { createStore } from "redux";

const initialState = {
  cart: [],
};

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case "Add":
      return {
        ...state,
        cart: [...state.data, action.payload],
      };
    default:
      return state;
  }
}

const store = createStore(dataReducer);
export default store;
