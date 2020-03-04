
import { put, takeEvery } from 'redux-saga/effects';

function* testSaga() {
  yield put({ type: 'INCREMENT' });
}

function* homeSaga() {
  yield takeEvery('aaaa', testSaga);
}

export default homeSaga;
