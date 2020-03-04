import { connect } from 'react-redux';
import Order from '@screens/Orders/createOrder';
import {
  createOrder, updateOrder,
  clearOrder, setOrderSuccess, getOrderDetail
} from '@actions/order/order';
import { clearCustomer, setCustomer } from '@actions/customer/customer';

const mapDispatchToProps = dispatch => ({
  dispatch,
  createOrder: payload => dispatch(createOrder(payload)),
  clearCustomer: () => dispatch(clearCustomer()),
  updateOrder: payload => dispatch(updateOrder(payload)),
  clearOrder: () => dispatch(clearOrder()),
  setOrderSuccess: payload => dispatch(setOrderSuccess(payload)),
  setCustomer: payload => dispatch(setCustomer(payload)),
  getOrderDetail: payload => dispatch(getOrderDetail(payload))
});

const mapStateToProps = ({ customerReducer, orderReducer, configReducer }) => ({
  customerReducer,
  orderReducer,
  configReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
