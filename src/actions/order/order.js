import {
  GET_LIST_ORDER,
  SET_LIST_DRAFT_SUCCESS,
  CREATE_ORDER,
  SET_ORDER_SUCCESS,
  SET_ORDER_FAIL,
  SET_LIST_DRAFT_FAILED,
  UPDATE_ORDER,
  UPDATE_ORDER_SUCCESS,
  SET_LIST_SALE_SUCCESS,
  SET_LIST_PROCCESS_SUCCESS,
  SET_LIST_DONE_SUCCESS,
  SET_LIST_CANCEL_SUCCESS,
  CLEAR_ORDER_LOCAL,
  SET_LIST_CONFIRM_SUCCESS,
  ASSIGN_ORDER,
  REJECT_ORDER,
  UPDATE_ORDER_STATUS,
  GET_ORDER_DETAIL,
  GET_ORDER_STATUS_HISTORY,
  SEARCH_ORDER,
  SEARCH_ORDER_SUCCESS,
  SEARCH_ORDER_FAILED,
  SET_LIST_STORED_SUCCESS,
  SET_LIST_PRINTED_SUCCESS,
  SET_LIST_DESIGN_SUCCESS,
  SET_LIST_FEEDBACK_DESIGN_SUCCESS,
  SET_LIST_DESIGNED_SUCCESS,
  SET_LIST_PRINTING_SUCCESS,
  SET_LIST_DELIVERING_SUCCESS
} from '@constants/action-names';

const getList = payload => ({
  type: GET_LIST_ORDER,
  ...payload
});

const setListDraft = payload => ({
  type: SET_LIST_DRAFT_SUCCESS,
  ...payload
});

const setListSale = payload => ({
  type: SET_LIST_SALE_SUCCESS,
  ...payload
});

const setListProcess = payload => ({
  type: SET_LIST_PROCCESS_SUCCESS,
  ...payload
});

const setListDone = payload => ({
  type: SET_LIST_DONE_SUCCESS,
  ...payload
});

const setListCancel = payload => ({
  type: SET_LIST_CANCEL_SUCCESS,
  ...payload
});

const setListDraftFailed = payload => ({
  type: SET_LIST_DRAFT_FAILED,
  ...payload
});

const setListConfirm = payload => ({
  type: SET_LIST_CONFIRM_SUCCESS,
  ...payload
});

const createOrder = payload => ({
  type: CREATE_ORDER,
  ...payload
});

const setOrderSuccess = payload => ({
  type: SET_ORDER_SUCCESS,
  ...payload
});

const setOrderFail = payload => ({
  type: SET_ORDER_FAIL,
  ...payload
});

const updateOrder = payload => ({
  type: UPDATE_ORDER,
  ...payload
});

const updateOrderSuccess = payload => ({
  type: UPDATE_ORDER_SUCCESS,
  ...payload
});

const clearOrder = () => ({
  type: CLEAR_ORDER_LOCAL
});

const assignOrder = payload => ({
  type: ASSIGN_ORDER,
  ...payload
});

const rejectOrder = payload => ({
  type: REJECT_ORDER,
  ...payload
});

const updateOrderStatus = payload => ({
  type: UPDATE_ORDER_STATUS,
  ...payload
});

const getOrderDetail = payload => ({
  type: GET_ORDER_DETAIL,
  ...payload
});

const getOrderStatusHistory = payload => ({
  type: GET_ORDER_STATUS_HISTORY,
  ...payload
});

const searchOrder = payload => ({
  type: SEARCH_ORDER,
  ...payload
});

const searchOrderSuccess = payload => ({
  type: SEARCH_ORDER_SUCCESS,
  ...payload
});

const searchOrderFailed = () => ({
  type: SEARCH_ORDER_FAILED
});

const setListStoredSuccess = payload => ({
  type: SET_LIST_STORED_SUCCESS,
  ...payload
});

const setListPrintedSuccess = payload => ({
  type: SET_LIST_PRINTED_SUCCESS,
  ...payload
});

const setListDesignSuccess = payload => ({
  type: SET_LIST_DESIGN_SUCCESS,
  ...payload
});

const setListFeedbackDesignSuccess = payload => ({
  type: SET_LIST_FEEDBACK_DESIGN_SUCCESS,
  ...payload
});

const setListDesignedSuccess = payload => ({
  type: SET_LIST_DESIGNED_SUCCESS,
  ...payload
});

const setListPrintingSuccess = payload => ({
  type: SET_LIST_PRINTING_SUCCESS,
  ...payload
});

const setListDeliveringSuccess = payload => ({
  type: SET_LIST_DELIVERING_SUCCESS,
  ...payload
});

export {
  getList,
  setListDraft,
  setListDraftFailed,
  createOrder,
  setOrderSuccess,
  setOrderFail,
  updateOrder,
  updateOrderSuccess,
  setListSale,
  setListProcess,
  setListCancel,
  setListDone,
  clearOrder,
  setListConfirm,
  assignOrder,
  rejectOrder,
  updateOrderStatus,
  getOrderDetail,
  getOrderStatusHistory,
  searchOrder,
  searchOrderSuccess,
  searchOrderFailed,
  setListStoredSuccess,
  setListPrintedSuccess,
  setListDesignSuccess,
  setListFeedbackDesignSuccess,
  setListDesignedSuccess,
  setListPrintingSuccess,
  setListDeliveringSuccess
};
