import { connect } from 'react-redux';
import PrintingList from '@screens/Printer/printingList';
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

export default connect(mapStateToProps, mapDispatchToProps)(PrintingList);
