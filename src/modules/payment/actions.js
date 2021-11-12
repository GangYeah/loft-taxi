export const REQUEST_CARD_DETAILS = "REQUEST_CARD_DETAILS"
export const REQUEST_CARD_DETAILS_SUCCESS = "REQUEST_CARD_DETAILS_SUCCESS"
export const REQUEST_CARD_DETAILS_FAILURE = "REQUEST_CARD_DETAILS_FAILURE"

export const SEND_CARD_DETAILS = "SEND_CARD_DETAILS";
export const SEND_CARD_DETAILS_SUCCESS = "SEND_CARD_DETAILS_SUCCESS";
export const SEND_CARD_DETAILS_FAILURE = "SEND_CARD_DETAILS_FAILURE";


export const requestCard = (token) => ({
  type: REQUEST_CARD_DETAILS,
  payload: { token }
})
export const requestCardSuccess = ({ cardName, cardNumber, expiryDate, cvc }) => ({
  type: REQUEST_CARD_DETAILS_SUCCESS,
  payload: { cardName, cardNumber, expiryDate, cvc }
})
export const requestCardFailure = (error) => ({
  type: REQUEST_CARD_DETAILS_FAILURE,
  payload: error
})
export const sendCard = (cardName, cardNumber, expiryDate, cvc, token) => ({
  type: SEND_CARD_DETAILS,
  payload: { cardName, cardNumber, expiryDate, cvc, token }
});
export const sendCardSuccess = () => ({ type: SEND_CARD_DETAILS_SUCCESS });
export const sendCardFailure = (error) => ({
  type: SEND_CARD_DETAILS_FAILURE,
  payload: error
});