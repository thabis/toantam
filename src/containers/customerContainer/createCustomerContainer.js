import { connect } from 'react-redux';
import CreateCustomer from '@screens/Customer/createCustomer';
import { create, clearCustomer } from '@actions/customer/customer';
import { loadDistrict, loadCityData } from '@actions/config/config';

const mapDispatchToProps = dispatch => ({
  dispatch,
  create: payload => dispatch(create(payload)),
  clearCustomer: () => dispatch(clearCustomer()),
  loadDistrict: payload => dispatch(loadDistrict(payload)),
  loadCityData: payload => dispatch(loadCityData(payload)),
});

const mapStateToProps = ({ customerReducer, configReducer }) => ({
  customerReducer,
  configReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomer);
