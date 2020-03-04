import { connect } from 'react-redux';
import ListCompany from '@screens/Company/listCompany';
import { getListCompany, create } from '@actions/company/company';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getListCompany: () => dispatch(getListCompany()),
  create: payload => dispatch(create(payload))
});

const mapStateToProps = ({ companyReducer }) => ({
  listCompany: companyReducer.listCompany
});

export default connect(mapStateToProps, mapDispatchToProps)(ListCompany);
