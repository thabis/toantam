import { connect } from 'react-redux';
import ListOrderCancel from '@screens/Orders/orderCancel';
import { getList } from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload))
});

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderCancel);
