import { takeLatest, call, put } from 'redux-saga/effects';
import { requestRouteSuccess, REQUEST_ROUTE } from "./actions";

const getRoute = async (address1, address2) => {
  return fetch(`https://loft-taxi.glitch.me/route?address1=${address1}&address2=${address2}`)
    .then(res => res.json());
};
function* routeWorker(action) {
  try {
    const {address1, address2} = action.payload;
    const res = yield call(getRoute, address1, address2);
    yield put(requestRouteSuccess(res))
  } catch (error) {
  }
}
export default function* watchRoute() {
  yield takeLatest(REQUEST_ROUTE, routeWorker);
}