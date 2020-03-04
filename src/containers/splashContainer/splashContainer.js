import { connect } from 'react-redux';
import Splash from '@screens/Splash';
import { requestValidToken } from '@actions/login/login';
import { loadAllConfig } from '@actions/config/config';

const mapDispatchToProps = dispatch => ({
  dispatch,
  requestValidToken: params => dispatch(requestValidToken(params)),
  loadAllConfig: () => dispatch(loadAllConfig()),
});

const mapStateToProps = ({ userReducer }) => ({
  userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
