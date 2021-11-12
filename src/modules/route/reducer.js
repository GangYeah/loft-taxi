import { REQUEST_ROUTE, REQUEST_ROUTE_SUCCESS, REQUEST_ROUTE_FAILURE, ROUTE_INIT } from "./actions";

const initialState = {
  route: [],
  addresses: {},
  error: ""
};
const reduce = function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_ROUTE: {
      return {
        ...state,
        addresses: action.payload
      }
    }
    case REQUEST_ROUTE_SUCCESS: {
      return {
        ...state,
        route: action.payload,
        error: ""
      };
    }
    case REQUEST_ROUTE_FAILURE: {
      return {
        ...state,
        route: [],
        error: action.payload
      };
    }
    case ROUTE_INIT: {
      return {
        ...state,
        route: [],
        addresses: {},
        error: ""
      };
    }
    default:
      return state;
  }
}
export default reduce;
