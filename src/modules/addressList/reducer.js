import { REQUEST_ADDRESS_LIST, REQUEST_ADDRESS_LIST_SUCCESS } from "./actions";

const initialState = {
  list: []
};
const reduce = function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_ADDRESS_LIST: {
      return {
        ...state,
        list: []
      }
    }
    case REQUEST_ADDRESS_LIST_SUCCESS: {
      return {
        ...state,
        list: action.payload,
      };     
    }
    default:
      return state;
  }
}
export default reduce;
