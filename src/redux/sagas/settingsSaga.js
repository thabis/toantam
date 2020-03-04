import {
  REQUEST_LOGOUT
} from '@constants/action-names';
import { Alert } from 'react-native';
import {
  takeLatest, put, select
} from 'redux-saga/effects';
import { signUpRootScreen } from '@navigation/navigation';
import { apiLogout } from '@services/auth-api';
import { resetAllState } from '@actions/login/login';
import NotificationService from '../../services/firebase/notificationService';

function* logout() {
  try {
    const { userReducer } = yield select();
    const { token } = userReducer;
    const { error, errors } = yield apiLogout(token);
    if (error || errors) {
      if (error) {
        Alert.alert(error.message);
      }
      if (errors) {
        Alert.alert(JSON.stringify(errors));
      }
      return;
    }
    yield put(resetAllState());
    NotificationService.resetBageApp();
    signUpRootScreen();
  } catch (err) {
    Alert.alert(err.message);
  }
}


function* customerSaga() {
  yield takeLatest(REQUEST_LOGOUT, logout);
}

export default customerSaga;
