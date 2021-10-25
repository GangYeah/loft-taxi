export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const AUTHENTICATE = "AUTHENTICATE";
export const FETCH_CARD = "FETCH_CARD"

export const logIn = () => ({ type: LOG_IN });
export const logOut = () => ({ type: LOG_OUT });
export const authenticate = (email, password) => ({
  type: AUTHENTICATE,
  payload: { email, password },
});
export const fetch_card = (cardName, cardNumber, expiryDate, cvc) => ({
  type: FETCH_CARD,
  payload: { cardName, cardNumber, expiryDate, cvc }
});
