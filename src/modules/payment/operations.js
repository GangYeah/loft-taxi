import { takeEvery, call, put } from 'redux-saga/effects';
import { makeServerRequest } from '../api';
import { REQUEST_CARD_DETAILS, requestCardSuccess, requestCardFailure, sendCardSuccess, sendCardFailure, SEND_CARD_DETAILS } from "./actions";

export function* getOrSetCardDetails(action) {
  try {
    if (action.type === REQUEST_CARD_DETAILS) {
      const res = yield call(makeServerRequest, "GET", "card", action.payload);
      yield put(requestCardSuccess(res));
    }
  } catch (e) {
    yield put(requestCardFailure(e));
  }
  try {
    if (action.type === SEND_CARD_DETAILS) {
      const result = yield call(makeServerRequest, "POST", "card", action.payload);
      if (result.success) {
        yield put(sendCardSuccess());
      }
      else {
        yield put(sendCardFailure(result.error));
      }
    }
  } catch (e) {
    yield put(sendCardFailure(e.message));
  }
}
export default function* watchPayment() {
  yield takeEvery([REQUEST_CARD_DETAILS, SEND_CARD_DETAILS], getOrSetCardDetails);
}