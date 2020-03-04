import {
  SET_FCM_TOKEN,
  GET_NOTIFICATION,
  SET_LIST_NOTIFICATION,
  READ_NOTIFICATION,
  READ_NOTIFICATION_SUCCESS
} from '@constants/action-names';

const setFcmToken = payload => ({
  type: SET_FCM_TOKEN,
  ...payload
});

const getListNotification = payload => ({
  type: GET_NOTIFICATION,
  ...payload
});

const setListNotification = payload => ({
  type: SET_LIST_NOTIFICATION,
  ...payload
});

const readNotification = payload => ({
  type: READ_NOTIFICATION,
  ...payload
});

const readNotificationSuccess = payload => ({
  type: READ_NOTIFICATION_SUCCESS,
  ...payload
});

export {
  setFcmToken,
  getListNotification,
  setListNotification,
  readNotification,
  readNotificationSuccess
};
