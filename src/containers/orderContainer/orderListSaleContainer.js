import { connect } from 'react-redux';
import ListOrderSale from '@modules/orders/listOrderSale';
import {
  setOrderSuccess,
  getList, updateOrder,
  getOrderStatusHistory
} from '@actions/order/order';
import { setCustomer } from '@actions/customer/customer';

const mapDispatchToProps = dispatch => ({
  dispatch,
  setOrderSuccess: payload => dispatch(setOrderSuccess(payload)),
  getList: payload => dispatch(getList(payload)),
  setCustomer: payload => dispatch(setCustomer(payload)),
  updateOrder: payload => dispatch(updateOrder(payload)),
  getOrderStatusHistory: payload => dispatch(getOrderStatusHistory(payload))
});

const mapStateToProps = ({ listOrderReducer, userReducer }) => ({
  listSale: listOrderReducer.listSale,
  user: userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderSale);
