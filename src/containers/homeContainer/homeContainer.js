import { connect } from 'react-redux';
import Home from '@screens/Home/home';
import { getListNotification } from '@actions/notification/notification';
import { clearOrder, getList } from '@actions/order/order';
import { resetClickInApp, clickedInApp } from '@actions/config/config';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getListNotification: payload => dispatch(getListNotification(payload)),
  clearOrder: () => dispatch(clearOrder()),
  resetClickInApp: () => dispatch(resetClickInApp()),
  clickedInApp: () => dispatch(clickedInApp()),
  getList: payload => dispatch(getList(payload))
});

const mapStateToProps = ({ userReducer, notificationReducer }) => ({
  userReducer,
  badgeUnread: notificationReducer.badgeUnread,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
