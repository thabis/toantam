import { connect } from 'react-redux';
import LeftMenu from '@screens/Menu/LeftMenu';

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = ({ homeReducer, userReducer }) => ({
  homeReducer,
  userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
