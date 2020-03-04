import {
  GET_NOTIFICATION,
  READ_NOTIFICATION
} from '@constants/action-names';
import {
  takeLatest, put, select
} from 'redux-saga/effects';
import { Alert } from 'react-native';
import { apiGetListNotificaions, apiReadMessage } from '@services/notification-api';
import {
  setListNotification,
  readNotificationSuccess
} from '@actions/notification/notification';

function* getList(payload) {
  try {
    const { callback } = payload;
    const { userReducer } = yield select();
    const { token } = userReducer;
    const { data, error, errors } = yield apiGetListNotificaions(token);
    if (error || errors) {
      if (error) {
        Alert.alert(error.message);
      }
      if (errors) {
        Alert.alert(JSON.stringify(errors));
      }
      return;
    }

    if (callback) {
      callback(data);
    }
    yield put(setListNotification({ listNotification: data }));
  } catch (err) {
    Alert.alert(err.message);
  }
}


function* readNotification(payload) {
  try {
    const { id, callback } = payload;
    const { userReducer } = yield select();
    const { token } = userReducer;
    const body = {
      ids: [id]
    };
    const { error, errors } = yield apiReadMessage(token, body);
    if (error || errors) {
      if (error) {
        Alert.alert(error.message);
      }
      if (errors) {
        Alert.alert(JSON.stringify(errors));
      }
      return;
    }
    yield put(readNotificationSuccess({ id }));
    if (callback) {
      callback();
    }
  } catch (err) {
    Alert.alert(err.message);
  }
}

function* customerSaga() {
  yield takeLatest(GET_NOTIFICATION, getList);
  yield takeLatest(READ_NOTIFICATION, readNotification);
}

export default customerSaga;
