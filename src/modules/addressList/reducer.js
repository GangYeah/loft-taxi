import { REQUEST_ADDRESS_LIST, REQUEST_ADDRESS_LIST_SUCCESS, REQUEST_ADDRESS_LIST_FAILURE } from "./actions";

const initialState = {
  list: [],
  error: ""
};
const reduce = function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_ADDRESS_LIST: {
      return {
        ...state,
        list: [],
        error: ""
      }
    }
    case REQUEST_ADDRESS_LIST_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        error: ""
      };     
    }
    case REQUEST_ADDRESS_LIST_FAILURE: {
      return {
        ...state,
        list: [],
        error: action.payload
      };     
    }
    default:
      return state;
  }
}
export default reduce;
