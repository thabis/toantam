import { connect } from 'react-redux';
import Notification from '@screens/Notification/notification';
import { readNotification, getListNotification } from '@actions/notification/notification';

const mapDispatchToProps = dispatch => ({
  dispatch,
  readNotification: payload => dispatch(readNotification(payload)),
  getListNotification: payload => dispatch(getListNotification(payload))
});

const mapStateToProps = ({ notificationReducer, userReducer, configReducer }) => ({
  notificationReducer: notificationReducer.listNotification,
  user: userReducer,
  pullRefeshing: configReducer.pullRefeshing
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
