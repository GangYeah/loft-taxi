import { takeEvery, call, put } from 'redux-saga/effects';
import { AUTHENTICATE, logIn } from "./actions";
import { serverLogIn } from './api'

export function* authWorker(action) {
  const { email, password } = action.payload;
  const result = yield call(serverLogIn, email, password);
  if (true) {
    yield put(logIn('rec9N8npU3uimgJ4l'));
  }
}
export default function* watchAuth() {
  yield takeEvery(AUTHENTICATE, authWorker);
}