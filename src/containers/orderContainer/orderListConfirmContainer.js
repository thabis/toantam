import { connect } from 'react-redux';
import ListOrderConfirm from '@modules/orders/listOrderConfirm';
import { getList, updateOrder } from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload)),
  updateOrder: payload => dispatch(updateOrder(payload)),
});

const mapStateToProps = ({ listOrderReducer }) => ({
  listConfirm: listOrderReducer.listConfirm,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderConfirm);
