import { connect } from 'react-redux';
import SearchOrder from '@screens/Search/searchOrder';
import { setOrderSuccess, clearOrder } from '@actions/order/order';
import { setCustomer, clearCustomer } from '@actions/customer/customer';

const mapDispatchToProps = dispatch => ({
  dispatch,
  setOrderSuccess: payload => dispatch(setOrderSuccess(payload)),
  setCustomer: payload => dispatch(setCustomer(payload)),
  clearCustomer: () => dispatch(clearCustomer()),
  clearOrder: () => dispatch(clearOrder())
});

const mapStateToProps = ({ customerReducer, orderReducer, listOrderReducer }) => ({
  customerReducer,
  orderReducer,
  listSearch: listOrderReducer.listSearch,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchOrder);
