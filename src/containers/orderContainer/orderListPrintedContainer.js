import { connect } from 'react-redux';
import ListOrderPrinted from '@modules/orders/listOrderPrinted';
import {
  getList, assignOrder, updateOrder
} from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload)),
  assignOrder: payload => dispatch(assignOrder(payload)),
  updateOrder: payload => dispatch(updateOrder(payload)),
});

const mapStateToProps = ({ listOrderReducer, userReducer }) => ({
  listPrinted: listOrderReducer.listPrinted,
  user: userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderPrinted);
