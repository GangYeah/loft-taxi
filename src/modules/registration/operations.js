import { takeEvery, call, put } from 'redux-saga/effects';
import { REGISTER, registerSuccess, registerFailure } from "./actions";
import { makeServerRequest } from '../api';

export function* register(action) {
  try {
    const result = yield call(makeServerRequest, "POST", "register", action.payload);
    if (result.success) {
      yield put(registerSuccess())
    }
    else {
      yield put(registerFailure(result.error))
    }
  } catch (e) {
    yield put(registerFailure(e.message))
  }
}
export default function* watchRegistration() {
  yield takeEvery(REGISTER, register);
}