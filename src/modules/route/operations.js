import { takeLatest, call, put } from 'redux-saga/effects';
import { makeServerRequest } from '../api';
import { requestRouteSuccess, requestRouteFailure, REQUEST_ROUTE } from "./actions";

export function* getRoute(action) {
  try {
    const res = yield call(makeServerRequest, "GET", "route", action.payload);
    yield put(requestRouteSuccess(res))
  } catch (e) {
    yield put(requestRouteFailure(e.message))
  }
}
export default function* watchRoute() {
  yield takeLatest(REQUEST_ROUTE, getRoute);
}