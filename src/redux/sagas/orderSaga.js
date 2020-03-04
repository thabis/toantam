import {
  GET_LIST_ORDER,
  CREATE_ORDER,
  UPDATE_ORDER,
  ASSIGN_ORDER,
  REJECT_ORDER,
  SEARCH_ORDER,
  UPDATE_ORDER_STATUS,
  GET_ORDER_DETAIL,
  GET_ORDER_STATUS_HISTORY,
} from '@constants/action-names';
import {
  setListDraft,
  setListDraftFailed,
  setOrderSuccess,
  setListSale,
  setListCancel, setListProcess, setListDone,
  setListConfirm,
  searchOrderSuccess,
  searchOrderFailed,
  setListPrintedSuccess,
  setListStoredSuccess,
  setListDesignSuccess,
  setListFeedbackDesignSuccess,
  setListDesignedSuccess,
  setListPrintingSuccess,
  setListDeliveringSuccess
} from '@actions/order/order';
import {
  takeLatest, put, delay, select, takeEvery
} from 'redux-saga/effects';
import { Alert } from 'react-native';
import {
  apiGetOrder, apiCreateOrder,
  apiUpdateOrder, apiAssignOrder,
  apiRejectOrder, apiGetOrderDetail,
  apiGetOrderStatusHistory
} from '@services/order-api';
import { messageError } from '@constants/message';
import { StatusType } from '@constants/statusType';


function* getListOrder(payload) {
  const error_mess = messageError('error_get_list_order');
  try {
    const { status, callback } = payload;
    // status = parseInt(status);
    const { userReducer } = yield select();
    const { token } = userReducer;
    const { data, error, errors } = yield apiGetOrder(token, payload);
    if (error || errors) {
      const errorMess = {};
      if (errors && Object.keys(errors).length > 0) {
        Object.keys(errors).forEach((value) => {
          // eslint-disable-next-line prefer-destructuring
          errorMess[`${value}`] = errors[value][0];
        });
      }
      if (error) {
        Alert.alert(error_mess);
      }
      yield put(setListDraftFailed());
      delay(500);
      return;
    }
    if (!data) {
      Alert.alert(error_mess);
      return;
    }
    if (status === 0) {
      yield put(setListDraft({ listOrder: data }));
    } else if (status === 1) {
      yield put(setListSale({ listSale: data }));
    } else if (status === -1) {
      yield put(setListCancel({ listCancel: data }));
    } else if (status === 2) {
      yield put(setListDesignSuccess({ listDesigning: data }));
    } else if (status === 3) {
      yield put(setListConfirm({ listConfirm: data }));
    } else if (status === 4) {
      yield put(setListFeedbackDesignSuccess({ listFeedbackDesigning: data }));
    } else if (status === 5) {
      yield put(setListDesignedSuccess({ listDesigned: data }));
    } else if (status === 6) {
      yield put(setListPrintingSuccess({ listPrinting: data }));
    } else if (status === 10) {
      yield put(setListDone({ listDone: data }));
    } else if (status === 7) {
      yield put(setListPrintedSuccess({ listPrinted: data }));
    } else if (status === 8) {
      yield put(setListStoredSuccess({ listStored: data }));
    } else if (status === 9) {
      yield put(setListDeliveringSuccess({ listDeliver: data }));
    } else {
      yield put(setListProcess({ listProcessing: data }));
    }
    if (callback) {
      callback(true);
    }
  } catch (err) {
    Alert.alert(error_mess);
  }
}

function* createOrder(payload) {
  try {
    const {
      action, values, dataOrder, callback
    } = payload;
    let { status } = values;
    status = parseInt(status, 0);
    const dataAll = yield select();
    const { userReducer } = dataAll;
    const { token } = userReducer;
    const { error, errors } = yield apiCreateOrder(token, dataOrder);
    if (error || errors) {
      if (error) {
        Alert.alert(error.message);
      }
      if (Object.prototype.hasOwnProperty.call(errors, 'message')) {
        Alert.alert(errors.message);
        return action.setSubmitting(false);
      }
      const errorMess = {};
      if (errors && Object.keys(errors).length > 0) {
        Object.keys(errors).forEach((val) => {
          // eslint-disable-next-line prefer-destructuring
          errorMess[`${val}`] = errors[val][0];
        });
        action.setErrors(errorMess);
      }
      return action.setSubmitting(false);
    }
    yield getListOrder({ status, order_by: 'updated_time' });
    callback(true, action);
  } catch (err) {
    const error_mess = messageError('error_create_order');
    Alert.alert(error_mess);
  }
  return true;
}

function* updateOrder(payload) {
  try {
    const {
      action,
      values,
      dataOrder,
      callback
    } = payload;
    const dataAll = yield select();
    const { userReducer } = dataAll;
    const { token } = userReducer;
    const { error, errors } = yield apiUpdateOrder(token, dataOrder);
    if (error || errors) {
      return callback(false, action);
    }
    yield put(setOrderSuccess({ payload: dataOrder }));
    let { status } = values;
    // if (!status) {
    //   return false;
    // }
    status = parseInt(status, 0);
    if (status === 3) {
      yield getListOrder({ status: '2,4,5,6,7,8,9', order_by: 'updated_time' });
    }
    yield getListOrder({ status, order_by: 'updated_time' });
    callback(true, action);
  } catch (err) {
    const error_mess = messageError('error_update_order');
    Alert.alert(error_mess);
  }
  return true;
}

function* assignOrder(payload) {
  const error_mess = messageError('error_assign_order');
  const { currentStatus, callback } = payload;
  try {
    const dataAll = yield select();
    const { userReducer } = dataAll;
    const { token } = userReducer;
    const { error, errors } = yield apiAssignOrder(token, payload);
    if (error || errors) {
      if (callback) {
        callback(false);
      }
      Alert.alert(error_mess);
      return;
    }
    if (callback) {
      callback(true);
    }
    if (currentStatus) {
      yield getListOrder({ status: currentStatus, order_by: 'updated_time' });
    }
  } catch (err) {
    if (callback) {
      callback(false);
    }
    Alert.alert(error_mess);
  }
}

function* rejectOrder(payload) {
  const error_mess = messageError('error_reject_order');
  const { currentStatus, callback } = payload;
  try {
    const dataAll = yield select();
    const { userReducer } = dataAll;
    const { token } = userReducer;
    const { error, errors } = yield apiRejectOrder(token, payload);
    if (error || errors) {
      if (callback) {
        callback(false);
      }
      Alert.alert(error_mess);
      return;
    }
    if (callback) {
      callback(true);
    }
    if (!currentStatus) {
      return;
    }
    yield getListOrder({ status: currentStatus, order_by: 'updated_time' });
  } catch (err) {
    if (callback) {
      callback(false);
    }
    Alert.alert(error_mess);
  }
}

function* updateOrderStatus(payload) {
  const { currentStatus, callback, status } = payload;
  try {
    const dataAll = yield select();
    const { userReducer } = dataAll;
    const { token } = userReducer;
    const { error, errors } = yield apiUpdateOrder(token, payload);
    if (error || errors) {
      if (callback) {
        callback(false);
      }
      let error_mess = messageError('default');
      if (status === StatusType.FEEDBACK_DESIGN.value) {
        error_mess = messageError('error_confirm_order');
      } else if (status === StatusType.DESIGNED.value || status === StatusType.PRINTED.value) {
        error_mess = messageError('error_done_order');
      }
      Alert.alert(error_mess);
      return;
    }
    if (callback) {
      callback(true);
    }
    yield getListOrder({ status: currentStatus, order_by: 'updated_time' });
  } catch (err) {
    if (callback) {
      callback(false);
    }
    const error_mess = messageError('default');
    Alert.alert(error_mess);
  }
}

function* getOrderDetail(payload) {
  const error_mess = messageError('error_get_order_detail');
  try {
    const { callback } = payload;
    const dataAll = yield select();
    const { userReducer } = dataAll;
    const { token } = userReducer;
    const { data, error, errors } = yield apiGetOrderDetail(token, payload);
    if (error || errors) {
      if (callback) {
        callback(data);
      }
      Alert.alert(error_mess);
      return;
    }
    if (!data) {
      Alert.alert(error_mess);
    }
    if (callback) {
      callback(data);
    }
  } catch (err) {
    Alert.alert(messageError('default'));
  }
}

function* getOrderStatusHistory(payload) {
  const error_mess = messageError('error_get_order_status_history');
  try {
    const { callback } = payload;
    const dataAll = yield select();
    const { userReducer } = dataAll;
    const { token } = userReducer;
    const { data, error, errors } = yield apiGetOrderStatusHistory(token, payload);
    if (error || errors) {
      if (callback) {
        callback(data);
      }
      Alert.alert(error_mess);
    }
    if (!data) {
      Alert.alert(error_mess);
    }
    if (callback) {
      callback(data);
    }
  } catch (err) {
    Alert.alert(messageError('default'));
  }
}

function* searchOrder(payload) {
  const error_search = messageError('error_search_order');
  try {
    const {
      values,
      callback
    } = payload;
    const { userReducer } = yield select();
    const { token } = userReducer;
    const { search } = values;
    const status = `1,2,3,4,5,6,7,8,9,10&search=${search}`;
    const { data, error, errors } = yield apiGetOrder(token, { status });
    if (error || errors) {
      callback(false);
      yield put(searchOrderFailed());
    }
    yield put(searchOrderSuccess({ listSearch: data }));
    callback(true);
  } catch (err) {
    Alert.alert(error_search);
  }
  return true;
}

function* customerSaga() {
  yield takeEvery(GET_LIST_ORDER, getListOrder);
  yield takeLatest(CREATE_ORDER, createOrder);
  yield takeLatest(UPDATE_ORDER, updateOrder);
  yield takeLatest(ASSIGN_ORDER, assignOrder);
  yield takeLatest(REJECT_ORDER, rejectOrder);
  yield takeLatest(UPDATE_ORDER_STATUS, updateOrderStatus);
  yield takeLatest(GET_ORDER_DETAIL, getOrderDetail);
  yield takeLatest(GET_ORDER_STATUS_HISTORY, getOrderStatusHistory);
  yield takeLatest(SEARCH_ORDER, searchOrder);
}

export default customerSaga;
