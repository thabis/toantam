import { connect } from 'react-redux';
import FormLogin from '@modules/form/formLogin';
import { requestLogin, requestRegister } from '@actions/login/login';

const mapDispatchToProps = dispatch => ({
  dispatch,
  requestLogin: params => dispatch(requestLogin(params)),
  requestRegister: params => dispatch(requestRegister(params)),
});

const mapStateToProps = ({ userReducer }) => ({
  userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
