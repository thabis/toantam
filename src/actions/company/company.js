import {
  CREATE_COMPANY,
  GET_LIST_COMPANY,
  SET_LIST_COMPANY_SUCCESS
} from '@constants/action-names';

const create = payload => ({
  type: CREATE_COMPANY,
  ...payload
});

const getListCompany = () => ({
  type: GET_LIST_COMPANY
});

const setListCompanySuccess = payload => ({
  type: SET_LIST_COMPANY_SUCCESS,
  ...payload
});

export {
  create,
  getListCompany,
  setListCompanySuccess
};
