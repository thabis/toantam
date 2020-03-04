import { connect } from 'react-redux';
import ListOrderPrinting from '@modules/orders/listOrderPrinting';
import { getList } from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload)),
});

const mapStateToProps = ({ listOrderReducer, userReducer }) => ({
  listPrinting: listOrderReducer.listPrinting,
  user: userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderPrinting);
