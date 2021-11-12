import { takeEvery, call, put } from 'redux-saga/effects';
import { makeServerRequest } from '../api';
import { AUTHENTICATE, logIn, authenticateError } from "./actions";

export function* authenticate(action) {
  try {
    const result = yield call(makeServerRequest, "POST", "auth", action.payload);
    if (result.success) {
      yield put(logIn(result.token));
    }
    else {
      yield put(authenticateError(result.error));
    }
  } catch (e) {
    yield put(authenticateError(e.message));
  }
}
export default function* watchAuthorization() {
  yield takeEvery(AUTHENTICATE, authenticate);
}