import { connect } from 'react-redux';
import ListOrderCancel from '@modules/orders/listOrderCancel';
import { setOrderSuccess, getList } from '@actions/order/order';
import { setCustomer } from '@actions/customer/customer';

const mapDispatchToProps = dispatch => ({
  dispatch,
  setOrderSuccess: payload => dispatch(setOrderSuccess(payload)),
  getList: payload => dispatch(getList(payload)),
  setCustomer: payload => dispatch(setCustomer(payload)),
});

const mapStateToProps = ({ listOrderReducer, configReducer }) => ({
  listCancel: listOrderReducer.listCancel,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderCancel);
