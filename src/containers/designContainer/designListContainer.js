import { connect } from 'react-redux';
import DesignList from '@screens/Designer/DesignList/designList';
import { getList } from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload))
});

const mapStateToProps = ({ userReducer, orderReducer }) => ({
  orderReducer,
  user: userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(DesignList);
