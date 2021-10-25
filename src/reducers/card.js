import { FETCH_CARD } from "../actions";

const initialState = {
    cardName: "", 
    cardNumber: "", 
    expiryDate: "",
    cvc: ""
};
const reduce = function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CARD: {
      return action.payload;
    }
    default:
      return state;
  }
}
export default reduce;
