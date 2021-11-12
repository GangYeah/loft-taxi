import { LOG_IN, LOG_OUT, AUTHENTICATE_FAILURE } from "./actions";

const initialState = {
  isLoggedIn: false,
  token: "",
  error: ""
};
const reduce = function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true, 
        token: action.payload,
        error: ""
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false, 
        token: "",
        error: ""
      }
    }
    case AUTHENTICATE_FAILURE: {
      return {
        ...state,
        isLoggedIn: false,
        token: "",
        error: action.payload
      }
    }
    default:
      return state;
  }
}
export default reduce;
