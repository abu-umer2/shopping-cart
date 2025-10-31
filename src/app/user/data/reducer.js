import { createStore } from "redux";

const initialState = {
  data: [],
};

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case "Inc":
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
      return state;
  }
}

const store = createStore(dataReducer);
export default store;
