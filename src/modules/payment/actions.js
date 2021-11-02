export const REQUEST_CARD_DETAILS = "REQUEST_CARD_DETAILS"
export const REQUEST_CARD_DETAILS_SUCCESS = "REQUEST_CARD_DETAILS_SUCCESS"
export const SEND_CARD_DETAILS = "SEND_CARD_DETAILS";

export const requestCard = (authToken) => ({
  type: REQUEST_CARD_DETAILS,
  payload: authToken
})
export const requestCardSuccess = ({cardName, cardNumber, expiryDate, cvc}) => ({
  type: REQUEST_CARD_DETAILS_SUCCESS,
  payload: { cardName, cardNumber, expiryDate, cvc }
})
export const fetch_card = (cardName, cardNumber, expiryDate, cvc, authToken) => ({
  type: SEND_CARD_DETAILS,
  payload: { cardName, cardNumber, expiryDate, cvc, authToken }
});
