import { AUTHENTICATE, logIn, FETCH_CARD } from "./actions";
import { serverLogIn, serverCard } from './api'

export const authMiddleware = (store) => (next) => async (action) => {
  if (action.type === AUTHENTICATE) {
    const {email, password} = action.payload;
    const success = await serverLogIn(email, password)
    if(success){
      store.dispatch(logIn())
    }
  } else {
    next(action);
  }
};

// export const fetchCardMiddleware = (store) => (next) => async (action) => {
//   if (action.type === FETCH_CARD) {
//     const {cardName, cardNumber, expiryDate, cvc} = action.payload;
//     await serverCard(cardName, cardNumber, expiryDate, cvc);
//   }
//   next(action);
// };