import { connect } from 'react-redux';
import ListOrderDeliver from '@modules/orders/listOrderDeliver';
import {
  getList, assignOrder, updateOrder, rejectOrder
} from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload)),
  assignOrder: payload => dispatch(assignOrder(payload)),
  updateOrder: payload => dispatch(updateOrder(payload)),
  rejectOrder: payload => dispatch(rejectOrder(payload)),
});

const mapStateToProps = ({ listOrderReducer, userReducer }) => ({
  listDeliver: listOrderReducer.listDeliver,
  user: userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderDeliver);
