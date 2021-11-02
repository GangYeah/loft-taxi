import { REQUEST_ROUTE, REQUEST_ROUTE_SUCCESS, ROUTE_INIT } from "./actions";

const initialState = {
  route: [],
  addresses: {}
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
        route: action.payload
      };
    }
    case ROUTE_INIT: {
      return {
        ...state,
        route: [],
        addresses: {}
      };
    }
    default:
      return state;
  }
}
export default reduce;
