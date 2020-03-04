import { connect } from 'react-redux';
import ListOrderProccessing from '@modules/orders/listOrderProccessing';
import { setOrderSuccess, getList } from '@actions/order/order';
import { setCustomer } from '@actions/customer/customer';

const mapDispatchToProps = dispatch => ({
  dispatch,
  setOrderSuccess: payload => dispatch(setOrderSuccess(payload)),
  getList: payload => dispatch(getList(payload)),
  setCustomer: payload => dispatch(setCustomer(payload)),
});

const mapStateToProps = ({ listOrderReducer, userReducer }) => ({
  listProcessing: listOrderReducer.listProcessing,
  user: userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderProccessing);
