import { LOG_IN, LOG_OUT } from "./actions";

const initialState = {
  isLoggedIn: false,
  token: ""
};
const reduce = function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true, 
        token: action.payload
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false, 
        token: ""
      }
    }
    default:
      return state;
  }
}
export default reduce;
