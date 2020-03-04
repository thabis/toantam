/* eslint-disable no-undef */
/* eslint-disable no-alert */
import {
  REQUEST_LOGIN, REQUEST_REGISTER,
  REQUEST_VALID_TOKEN
} from '@constants/action-names';
import {
  takeLatest,
  put,
  delay,
  select,
} from 'redux-saga/effects';
import { homeRootScreen, signUpRootScreen } from '@navigation/navigation';
import { registerUser } from '@services/firebase/authenService';
import { apiLogin, apiMe } from '@services/auth-api';
import { loginSuccess, loginFailed, updateUser } from '@actions/login/login';
import { loadCityData, loadAllConfig } from '@actions/config/config';
import { messageFirebase, LOGIN_ERROR } from '@constants/message';
import { checkRoleUser } from '@utils/roles';

function* login(payload) {
  const { action, values } = payload;
  try {
    yield delay(300);
    const { femail, fpassword } = values;
    const { userReducer } = yield select();
    const { device_token } = userReducer;
    const body = {
      identity: femail.toLowerCase(),
      password: fpassword,
      device_token
    };
    const { data, error, errors } = yield apiLogin(body);
    if (error || errors) {
      if (errors) {
        alert(LOGIN_ERROR);
        action.setSubmitting(false);
        return;
      }
      const { messages } = error;
      const mess = messages[''][0];
      const errors_data = {};
      errors_data.femail = mess;
      action.setErrors(errors_data);
      action.setSubmitting(false);
      yield put(loginFailed());
      return;
    }
    yield put(loginSuccess({ payload: data }));
    const { user } = data;
    const { roles = [] } = user;
    const role = yield checkRoleUser(roles);
    yield put(loadCityData());
    yield put(loadAllConfig());
    if (!role) {
      signUpRootScreen();
      return;
    }
    yield homeRootScreen(role);
  } catch (err) {
    action.setSubmitting(false);
    alert(err.message);
  }
}

function* register(payload) {
  try {
    yield delay(300);
    const { action, values } = payload;
    const { femail, fpassword } = values;
    const { user, userInfo } = yield registerUser(femail, fpassword);
    if (userInfo) {
      const mess = messageFirebase(userInfo.error_name);
      const errors = {};
      errors.femail = mess;
      action.setErrors(errors);
      action.setSubmitting(false);
      yield put(loginFailed());
      return;
    }
    const { uid, email } = user;
    const token = yield user.getIdToken();
    const data = {
      uid,
      email,
      password: fpassword,
      token
    };
    yield put(loginSuccess({ payload: data }));
    const role = yield checkRoleUser(data);
    if (!role) {
      signUpRootScreen();
      return;
    }
    yield homeRootScreen(role);
  } catch (err) {
    alert(err.message);
  }
}

function* validLogin(payload) {
  const { token } = payload;
  const { data, error } = yield apiMe(token);
  const { userReducer } = yield select();
  const { role } = userReducer;
  if (error) {
    signUpRootScreen();
    return;
  }
  if (!data) {
    signUpRootScreen();
    return;
  }
  yield put(loadCityData());
  yield put(loadAllConfig());
  yield put(updateUser({ payload: data }));
  if (!role) {
    signUpRootScreen();
    return;
  }
  yield homeRootScreen(role);
}

function* authSaga() {
  yield takeLatest(REQUEST_LOGIN, login);
  yield takeLatest(REQUEST_REGISTER, register);
  yield takeLatest(REQUEST_VALID_TOKEN, validLogin);
}

export default authSaga;
