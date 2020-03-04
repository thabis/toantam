import { connect } from 'react-redux';
import OrderList from '@screens/Orders/orderList';
import {
  setOrderSuccess,
  getList, searchOrder
} from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  setOrderSuccess: payload => dispatch(setOrderSuccess(payload)),
  getList: payload => dispatch(getList(payload)),
  searchOrder: payload => dispatch(searchOrder(payload))
});

const mapStateToProps = ({ listOrderReducer }) => ({
  listSale: listOrderReducer.listSale
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
