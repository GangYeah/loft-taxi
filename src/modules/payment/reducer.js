import { REQUEST_CARD_DETAILS_SUCCESS, SEND_CARD_DETAILS } from "./actions";

const initialState = {
  details: {}
};
const reduce = function (state = initialState, action) {
  switch (action.type) {
    case SEND_CARD_DETAILS: {
      return {
        ...state,
        details: action.payload
      };     
    }
    case REQUEST_CARD_DETAILS_SUCCESS: {
      return {
        ...state,
        details: action.payload
      }
    }
    default:
      return state;
  }
}
export default reduce;
