import { takeEvery, call, put } from 'redux-saga/effects';
import { requestAddressListSuccess, REQUEST_ADDRESS_LIST } from "./actions";

const getAddressList = async () => {
  return fetch(`https://loft-taxi.glitch.me/addressList`)
    .then(res => res.json()).then(data => data.addresses);;
};
function* addressListWorker() {
  try {
    const res = yield call(getAddressList);
    yield put(requestAddressListSuccess(res))
  } catch (error) {
  }
}
export default function* watchAddressList() {
  yield takeEvery(REQUEST_ADDRESS_LIST, addressListWorker);
}