import { connect } from 'react-redux';
import CreateCompany from '@screens/Company/createCompany';
import { create } from '@actions/company/company';
import { loadDistrict } from '@actions/config/config';

const mapDispatchToProps = dispatch => ({
  dispatch,
  create: payload => dispatch(create(payload)),
  loadDistrict: payload => dispatch(loadDistrict(payload)),
});

const mapStateToProps = ({ companyReducer, configReducer }) => ({
  companyReducer,
  configReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCompany);
