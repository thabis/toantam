import { connect } from 'react-redux';
import ListOrderStored from '@modules/orders/listOrderStored';
import {
  getList, assignOrder
} from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload)),
  assignOrder: payload => dispatch(assignOrder(payload))
});

const mapStateToProps = ({ listOrderReducer, configReducer, userReducer }) => ({
  listStored: listOrderReducer.listStored,
  user: userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderStored);
