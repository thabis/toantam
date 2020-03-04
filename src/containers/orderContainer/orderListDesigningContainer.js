import { connect } from 'react-redux';
import ListOrderDesigning from '@modules/orders/listOrderDesigning';
import { getList } from '@actions/order/order';
import { updatePullRefesh } from '@actions/config/config';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload)),
  updatePullRefesh: payload => dispatch(updatePullRefesh(payload)),
});

const mapStateToProps = ({ listOrderReducer, userReducer }) => ({
  listDesigning: listOrderReducer.listDesigning,
  user: userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderDesigning);
