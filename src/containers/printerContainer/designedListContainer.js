import { connect } from 'react-redux';
import DesignedList from '@screens/Printer/designedList';
import { getList } from '@actions/order/order';
import { getListNotification } from '@actions/notification/notification';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload)),
  getListNotification: payload => dispatch(getListNotification(payload))
});

const mapStateToProps = ({ userReducer }) => ({
  user: userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(DesignedList);
