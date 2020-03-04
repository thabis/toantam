import {
  REQUEST_REGISTER, REQUEST_LOGIN,
  LOGIN_SUCCESS, LOGIN_FAILED,
  REQUEST_VALID_TOKEN,
  UPDATE_USER,
  REQUEST_LOGOUT,
  RESET_ALL_STATE
} from '@constants/action-names';

const requestLogin = payload => ({
  type: REQUEST_LOGIN,
  ...payload
});

const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  ...payload
});
const loginFailed = payload => ({
  type: LOGIN_FAILED,
  ...payload
});
const requestRegister = payload => ({
  type: REQUEST_REGISTER,
  ...payload
});
const requestValidToken = payload => ({
  type: REQUEST_VALID_TOKEN,
  ...payload
});
const updateUser = payload => ({
  type: UPDATE_USER,
  ...payload
});

const requestLogout = () => ({
  type: REQUEST_LOGOUT,
});

const resetAllState = () => ({
  type: RESET_ALL_STATE
});


export {
  requestLogin,
  loginSuccess,
  loginFailed,
  requestRegister,
  requestValidToken,
  updateUser,
  requestLogout,
  resetAllState
};
