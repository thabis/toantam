import { connect } from 'react-redux';
import OrderProcessingDetail from '@screens/Orders/orderProcessingDetail';
import { setOrderSuccess, clearOrder, getOrderDetail } from '@actions/order/order';
import { setCustomer, clearCustomer } from '@actions/customer/customer';

const mapDispatchToProps = dispatch => ({
  dispatch,
  setOrderSuccess: payload => dispatch(setOrderSuccess(payload)),
  setCustomer: payload => dispatch(setCustomer(payload)),
  clearCustomer: () => dispatch(clearCustomer()),
  clearOrder: () => dispatch(clearOrder()),
  getOrderDetail: payload => dispatch(getOrderDetail(payload))
});

const mapStateToProps = ({ customerReducer, orderReducer, configReducer }) => ({
  customerReducer,
  orderReducer,
  configReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderProcessingDetail);
