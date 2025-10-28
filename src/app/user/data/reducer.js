import { createStore } from "redux";

const initialState = {
  data: 2
};

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case "Inc":
        let val=parseInt(state.data)
        val=val+1
        state={data:val}
        console.log(state);
      return  state ;
    default:
      return state;
  }
}

const store = createStore(dataReducer);
export default store;
