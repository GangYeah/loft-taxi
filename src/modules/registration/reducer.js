import { REGISTER_INIT, REGISTER, REGISTER_SUCCESS } from "./actions";

const initialState = {
  fields: {},
  isRegistered: false
};
const reduce = function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_INIT: {
      return {
        ...state,
        fields: {},
        isRegistered: false
      }
    }
    case REGISTER: {
      return {
        ...state,
        fields: action.payload,
        isRegistered: false
      };     
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        fields: {},
        isRegistered: true
      };
    }
    default:
      return state;
  }
}
export default reduce;
