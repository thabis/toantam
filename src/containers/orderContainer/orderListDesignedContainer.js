import { connect } from 'react-redux';
import ListOrderDesigned from '@modules/orders/listOrderDesigned';
import { getList } from '@actions/order/order';
import { updatePullRefesh } from '@actions/config/config';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload)),
  updatePullRefesh: payload => dispatch(updatePullRefesh(payload)),
});

const mapStateToProps = ({ listOrderReducer, userReducer }) => ({
  listDesigned: listOrderReducer.listDesigned,
  user: userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderDesigned);
