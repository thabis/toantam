import { connect } from 'react-redux';
import OrderDetail from '@modules/orders/orderDetail';
import { assignOrder, rejectOrder, updateOrderStatus, getOrderDetail } from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  assignOrder: payload => dispatch(assignOrder(payload)),
  rejectOrder: payload => dispatch(rejectOrder(payload)),
  updateOrderStatus: payload => dispatch(updateOrderStatus(payload)),
  getOrderDetail: payload => dispatch(getOrderDetail(payload))
});

const mapStateToProps = ({ userReducer }) => ({
  user: userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
