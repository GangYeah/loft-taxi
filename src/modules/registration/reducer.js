import { REGISTER_INIT, REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE } from "./actions";

const initialState = {
  fields: {},
  isRegistered: false,
  error: ""
};
const reduce = function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_INIT: {
      return {
        ...state,
        fields: {},
        isRegistered: false,
        error: ""
      }
    }
    case REGISTER: {
      return {
        ...state,
        fields: action.payload,
        isRegistered: false,
        error: ""
      };     
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        fields: {},
        isRegistered: true
      };
    }
    case REGISTER_FAILURE: {
      return {
        ...state,
        isRegistered: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
export default reduce;
