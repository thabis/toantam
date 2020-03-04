import { connect } from 'react-redux';
import ListOrderFeedbackDesigning from '@modules/orders/listOrderFeedbackDesigning';
import { getList } from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload)),
});

const mapStateToProps = ({ listOrderReducer, userReducer }) => ({
  listFeedbackDesigning: listOrderReducer.listFeedbackDesigning,
  user: userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderFeedbackDesigning);
