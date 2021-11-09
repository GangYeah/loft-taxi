import { takeEvery, call, put } from 'redux-saga/effects';
import { AUTHENTICATE, logIn } from "./actions";
import { serverLogIn } from './api'

export function* authWorker(action) {
  const { email, password } = action.payload;
  const result = yield call(serverLogIn, email, password);
  if (result.success) {
    yield put(logIn(result.token));
  }
}
export default function* watchAuth() {
  yield takeEvery(AUTHENTICATE, authWorker);
}