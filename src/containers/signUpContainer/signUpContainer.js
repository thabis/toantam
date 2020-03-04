import { connect } from 'react-redux';
import SignUp from '@screens/SignUp/signup';
import { setFcmToken } from '@actions/notification/notification';

const mapDispatchToProps = dispatch => ({
  dispatch,
  setFcmToken: payload => dispatch(setFcmToken(payload)),
});

const mapStateToProps = ({ userReducer }) => ({
  userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
