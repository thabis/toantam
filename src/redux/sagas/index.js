import { all, fork } from 'redux-saga/effects';
import homeSaga from './homeSaga';
import authSaga from './authSaga';
import customerSaga from './customerSaga';
import orderSaga from './orderSaga';
import companySaga from './companySaga';
import configSaga from './configSaga';
import notificationSaga from './notificationSaga';
import settingsSaga from './settingsSaga';

export default function* rootSaga() {
  yield all([
    fork(homeSaga),
    fork(authSaga),
    fork(customerSaga),
    fork(orderSaga),
    fork(companySaga),
    fork(configSaga),
    fork(notificationSaga),
    fork(settingsSaga)
  ]);
}
