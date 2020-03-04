import { connect } from 'react-redux';
import Settings from '@screens/Settings/settings';
import { requestLogout } from '@actions/login/login';

const mapDispatchToProps = dispatch => ({
  dispatch,
  requestLogout: () => dispatch(requestLogout())
});

const mapStateToProps = ({ userReducer }) => ({
  user: userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
