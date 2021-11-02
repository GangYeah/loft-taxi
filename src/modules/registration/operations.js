import { takeLatest, call, put } from 'redux-saga/effects';
import { REGISTER, registerSuccess } from "./actions";

const serverRegister = async (email, password, name, surname) => {
  return fetch(
    `https://loft-taxi.glitch.me/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name, surname })
  }
  ).then(res => res.json()).then(data => data.success);;
};
function* registrationWorker(action) {
  try {
    const { email, password, name, surname } = action.payload;
    const success = yield call(serverRegister, email, password, name, surname);
    if (success) {
      yield put(registerSuccess())
    }
  } catch (error) {
  }
}
export default function* watchRegistration() {
  yield takeLatest(REGISTER, registrationWorker);
}