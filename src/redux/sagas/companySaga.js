import {
  LOAD_DISTRICT, GETWARD, GETDISTRICT,
  GET_LIST_COMPANY, CREATE_COMPANY
} from '@constants/action-names';
import {
  takeLatest, put, delay, select
} from 'redux-saga/effects';
import { Alert } from 'react-native';
import {
  apiGetAddress, apiGetCompany,
  apiCreateCompany, apiUpdateCompany
} from '@services/company-api';
import { messageError } from '@constants/message';
import {
  loadDistrictSuccess, loadWardSuccess, loadWardFail,
} from '@actions/config/config';
import {
  setListCompanySuccess
} from '@actions/company/company';
import { showModal, hideModal, pop } from '@navigation/navigation';
import { screenKeys } from '../../constants/screenKeys';

function* loadDistrict(payload) {
  const error_mess = messageError('error_ward');
  try {
    showModal(screenKeys.showModal);
    const { id, typeAddress } = payload;
    if (typeAddress === GETDISTRICT) {
      const { customerReducer } = yield select();
      const { listDistrict = [] } = customerReducer;
      if (listDistrict.length > 0) {
        yield delay(500);
        hideModal(screenKeys.showModal);
        return;
      }
    }
    if (typeAddress === GETWARD && !id) {
      yield put(loadWardFail());
      yield delay(500);
      hideModal(screenKeys.showModal);
      return;
    }
    const { data, errors } = yield apiGetAddress(id);
    if (errors) {
      hideModal(screenKeys.showModal);
      delay(500);
      yield Alert.alert(error_mess);
      return;
    }
    const listAddress = yield revertDistrict(data, typeAddress);
    if (typeAddress === GETDISTRICT) {
      yield put(loadDistrictSuccess({ listDistrict: listAddress }));
    } else if (typeAddress === GETWARD) {
      yield put(loadWardSuccess({ listWard: listAddress }));
    }
    hideModal(screenKeys.showModal);
  } catch (err) {
    hideModal(screenKeys.showModal);
    delay(500);
    Alert.alert(error_mess);
  }
}

function revertDistrict(data, type) {
  const listAddress = [];
  data.map((value) => {
    let nameDistrict = '';
    switch (type) {
      case GETDISTRICT: {
        nameDistrict = value.address_type === 'quan' ? `Quận ${value.name}` : value.name;
        break;
      }
      case GETWARD: {
        nameDistrict = value.address_type === 'phuong' ? `Phường ${value.name}` : value.name;
        break;
      }
      default: {
        return '';
      }
    }
    const ward = {
      value: value.id,
      label: nameDistrict
    };
    return listAddress.push(ward);
  });
  return listAddress;
}

function* getCompany() {
  const error_mess = messageError('error_company');
  try {
    showModal(screenKeys.showModal);
    const { userReducer } = yield select();
    const { token } = userReducer;
    const { data, error, errors } = yield apiGetCompany(token);
    if (error || errors) {
      if (error) {
        Alert.alert(error_mess);
      }
      if (errors) {
        Alert.alert(JSON.stringify(errors));
      }
      delay(500);
      hideModal(screenKeys.showModal);
      return;
    }
    yield put(setListCompanySuccess({ listCompany: data }));
    delay(500);
    hideModal(screenKeys.showModal);
  } catch (err) {
    hideModal(screenKeys.showModal);
    delay(500);
    Alert.alert(error_mess);
  }
}

function* createCompany(payload) {
  const error_mess = messageError('error_create_update_company');
  const {
    action, values, componentId, onCompleted
  } = payload;
  try {
    const {
      id,
      phone,
      email,
      district,
      ward,
      address,
      isTown,
      tax_code,
      company_name,
      company_code
    } = values;
    const body = {
      id,
      phone,
      email: email === '' ? null : email,
      district,
      ward,
      address,
      city: !isTown ? 'Hồ Chí Minh' : 'Ngoại thành',
      company_name,
      company_code,
      tax_code
    };
    const { userReducer } = yield select();
    const { token } = userReducer;
    const { data, error, errors } = id ? yield apiUpdateCompany(token, body)
      : yield apiCreateCompany(token, body);
    if (error || errors) {
      const errorMess = {};
      if (errors && Object.keys(errors).length > 0) {
        Object.keys(errors).forEach((value) => {
          // eslint-disable-next-line prefer-destructuring
          errorMess[`${value}`] = errors[value][0];
        });
        action.setErrors(errorMess);
      }
      if (error) {
        Alert.alert(error.message);
      }
      action.setSubmitting(false);
      onCompleted(data);
      return;
    }
    action.setSubmitting(false);
    yield getCompany();
    yield delay(500);
    yield pop(componentId);
  } catch (err) {
    Alert.alert(error_mess);
    action.setSubmitting(false);
  }
}

function* customerSaga() {
  yield takeLatest(LOAD_DISTRICT, loadDistrict);
  yield takeLatest(GET_LIST_COMPANY, getCompany);
  yield takeLatest(CREATE_COMPANY, createCompany);
}

export default customerSaga;
