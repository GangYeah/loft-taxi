import { REQUEST_CARD_DETAILS_SUCCESS, REQUEST_CARD_DETAILS_FAILURE, SEND_CARD_DETAILS, SEND_CARD_DETAILS_FAILURE } from "./actions";

const initialState = {
  details: {},
  error: ""
};
const reduce = function (state = initialState, action) {
  switch (action.type) {
    case SEND_CARD_DETAILS: {
      return {
        ...state,
        details: action.payload,
        error: ""
      };     
    }
    case SEND_CARD_DETAILS_FAILURE: {
      return {
        ...state,
        error: action.payload
      };     
    }
    case REQUEST_CARD_DETAILS_SUCCESS: {
      return {
        ...state,
        details: action.payload,
        error: ""
      }
    }
    case REQUEST_CARD_DETAILS_FAILURE: {
      return {
        ...state,
        details: {},
        error: action.payload
      }
    }
    default:
      return state;
  }
}
export default reduce;
