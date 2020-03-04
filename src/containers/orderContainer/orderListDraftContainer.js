import { connect } from 'react-redux';
import ListOrderDraft from '@modules/orders/listOrderDraft';
import { setOrderSuccess, getList } from '@actions/order/order';
import { setCustomer } from '@actions/customer/customer';

const mapDispatchToProps = dispatch => ({
  dispatch,
  setOrderSuccess: payload => dispatch(setOrderSuccess(payload)),
  setCustomer: payload => dispatch(setCustomer(payload)),
  getList: payload => dispatch(getList(payload)),
});

const mapStateToProps = ({ listOrderReducer }) => ({
  listDraft: listOrderReducer.listDraft,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderDraft);
