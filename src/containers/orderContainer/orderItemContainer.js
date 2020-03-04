import { connect } from 'react-redux';
import OrderItem from '@modules/orders/orderItem';
import { assignOrder, rejectOrder, getOrderStatusHistory } from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  assignOrder: payload => dispatch(assignOrder(payload)),
  rejectOrder: payload => dispatch(rejectOrder(payload)),
  getOrderStatusHistory: payload => dispatch(getOrderStatusHistory(payload))
});

const mapStateToProps = ({ userReducer }) => ({
  user: userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
