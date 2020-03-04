import {
  CREATE_CUSTOMER,
  GET_LIST_CUSTOMER
} from '@constants/action-names';
import {
  takeLatest, put, select, delay
} from 'redux-saga/effects';
import { Alert } from 'react-native';
import { apiCreateCustomer, apiUpdateCustomer, apiGetListCustomer } from '@services/customer-api';
import {
  createCustomerSuccess,
  setListCustomerSuccess
} from '@actions/customer/customer';
import {
  navigateScreen, showModal,
  hideModal, pop
} from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';

function* create(payload) {
  const { action, values } = payload;
  try {
    const {
      id,
      name,
      phone,
      email,
      district,
      ward,
      address,
      isTown,
      customer_type,
      company_id,
      personal,
      // company_name,
      // company_code,
    } = values;
    const body = {
      id,
      name,
      phone,
      email,
      district,
      ward,
      address,
      city: !isTown ? 'Hồ Chí Minh' : 'Ngoại thành',
      // company_name,
      // company_code,
      customer_type: customer_type ? 1 : 0,
      company_id,
      personal
    };
    const { userReducer } = yield select();
    const { token } = userReducer;
    const { data, error, errors } = id ? yield apiUpdateCustomer(token, body)
      : yield apiCreateCustomer(token, body);
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
        Object.keys(errors).forEach((value) => {
          // eslint-disable-next-line prefer-destructuring
          errorMess[`${value}`] = errors[value][0];
        });
        action.setErrors(errorMess);
      }
      return action.setSubmitting(false);
    }
    yield put(createCustomerSuccess({ payload: data }));
    action.setSubmitting(false);
    yield getList();
    if (!id) {
      navigateScreen(screenKeys.CreateOrder, { bottomTabs: false });
    } else {
      pop(screenKeys.CreateCustomer);
    }
  } catch (err) {
    Alert.alert(err.message);
    action.setSubmitting(false);
    // alert(err);
  }
  return true;
}

function* getList() {
  try {
    showModal(screenKeys.showModal);
    const { userReducer } = yield select();
    const { token } = userReducer;
    const { data, error, errors } = yield apiGetListCustomer(token);
    if (error || errors) {
      if (error) {
        Alert.alert(error.message);
      }
      if (errors) {
        Alert.alert(JSON.stringify(errors));
      }
      delay(500);
      hideModal(screenKeys.showModal);
      return;
    }
    yield put(setListCustomerSuccess({ payload: data }));
    hideModal(screenKeys.showModal);
  } catch (err) {
    hideModal(screenKeys.showModal);
    Alert.alert(err.message);
  }
}

function* customerSaga() {
  yield takeLatest(CREATE_CUSTOMER, create);
  yield takeLatest(GET_LIST_CUSTOMER, getList);
}

export default customerSaga;
