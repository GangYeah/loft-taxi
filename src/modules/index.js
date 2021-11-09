import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { auth, authSaga } from './authorization';
import { card, paymentSaga } from './payment';
import { reg, registrationSaga } from './registration';
import { address, addressListSaga } from './addressList';
import { route, routeSaga } from './route';

export const rootReducer = combineReducers({
    reg,
    auth,
    card,
    address,
    route
});
export function* rootSaga() {
    yield all([
        registrationSaga(),
        authSaga(),
        paymentSaga(),
        addressListSaga(),
        routeSaga()
    ])
}