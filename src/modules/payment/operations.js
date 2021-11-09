import { takeEvery, call, put } from 'redux-saga/effects';
import { REQUEST_CARD_DETAILS, requestCardSuccess, SEND_CARD_DETAILS } from "./actions";

const serverCardGet = async (authToken) => {
  return fetch(`https://loft-taxi.glitch.me/card?token=${authToken}`)
    .then(res => res.json());
};

const serverCardPost = async (cardName, cardNumber, expiryDate, cvc, token) => {
  return fetch(
    `https://loft-taxi.glitch.me/card`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cardName, cardNumber, expiryDate, cvc, token })
  }).then(res => res.json()).then(data => data.success);
};

function* paymentWorker(action) {
  try {
    if (action.type === REQUEST_CARD_DETAILS) {
      const authToken = action.payload;
      const res = yield call(serverCardGet, authToken);
      yield put(requestCardSuccess(res));
    }
    if (action.type === SEND_CARD_DETAILS) {
      const { cardName, cardNumber, expiryDate, cvc, authToken } = action.payload;
      yield call(serverCardPost, cardName, cardNumber, expiryDate, cvc, authToken);
    }
  } catch (error) {
  }
}
export default function* watchPayment() {
  yield takeEvery([REQUEST_CARD_DETAILS, SEND_CARD_DETAILS], paymentWorker);
}