import { takeEvery, call, put } from 'redux-saga/effects';
import { makeServerRequest } from '../api';
import { requestAddressListSuccess, requestAddressListFailure, REQUEST_ADDRESS_LIST } from "./actions";

export function* getAddressList() {
  try {
    const res = yield call(makeServerRequest, "GET", "addressList");
    yield put(requestAddressListSuccess(res.addresses))
  }
  catch (e) {
    yield put(requestAddressListFailure(e.message));
  }
}
export default function* watchAddressList() {
  yield takeEvery(REQUEST_ADDRESS_LIST, getAddressList);
}