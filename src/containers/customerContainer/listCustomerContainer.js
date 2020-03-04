import { connect } from 'react-redux';
import ListCustomer from '@screens/Customer/listCustomer';
import { getListCustomer, setCustomer } from '@actions/customer/customer';
import { loadCity } from '@actions/config/config';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getListCustomer: () => dispatch(getListCustomer()),
  setCustomer: payload => dispatch(setCustomer(payload)),
  loadCity: () => dispatch(loadCity())
});

const mapStateToProps = ({ customerReducer, configReducer }) => ({
  listCustomer: customerReducer.listCustomer,
  listCity: configReducer.listCity
});

export default connect(mapStateToProps, mapDispatchToProps)(ListCustomer);
