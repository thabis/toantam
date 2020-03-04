import { connect } from 'react-redux';
import OrderDetailScreen from '@src/screens/Orders/orderDetailScreen';
import {
  assignOrder, updateOrder, rejectOrder
} from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  assignOrder: payload => dispatch(assignOrder(payload)),
  updateOrder: payload => dispatch(updateOrder(payload)),
  rejectOrder: payload => dispatch(rejectOrder(payload)),
});

const mapStateToProps = ({ userReducer }) => ({
  user: userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);
