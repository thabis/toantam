import { connect } from 'react-redux';
import NotificationInApp from '@components/notification/notification';

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = ({ configReducer }) => ({
  onClickNotification: configReducer.onClickNotification
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationInApp);
