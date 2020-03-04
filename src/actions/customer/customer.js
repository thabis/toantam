import {
  CREATE_CUSTOMER,
  CREATE_CUSTOMER_SUCCESS,
  CLEAR_CUSTOMER,
  GET_LIST_CUSTOMER,
  SET_LIST_CUSTOMER_SUCCESS
} from '@constants/action-names';

const clearCustomer = () => ({
  type: CLEAR_CUSTOMER,
});

const create = payload => ({
  type: CREATE_CUSTOMER,
  ...payload
});
const createCustomerSuccess = payload => ({
  type: CREATE_CUSTOMER_SUCCESS,
  ...payload
});
const getListCustomer = () => ({
  type: GET_LIST_CUSTOMER,
});

const setListCustomerSuccess = payload => ({
  type: SET_LIST_CUSTOMER_SUCCESS,
  ...payload
});

const setCustomer = payload => ({
  type: CREATE_CUSTOMER_SUCCESS,
  ...payload
});

export {
  create,
  createCustomerSuccess,
  clearCustomer,
  getListCustomer,
  setListCustomerSuccess,
  setCustomer
};
