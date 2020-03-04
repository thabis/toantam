import { connect } from 'react-redux';
import SaleList from '@screens/Designer/DesignList/saleList';
import { getList } from '@actions/order/order';
import { getListNotification } from '@actions/notification/notification';
import { resetClickInApp, clickedInApp, loadAllConfig } from '@actions/config/config';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload)),
  getListNotification: payload => dispatch(getListNotification(payload)),
  resetClickInApp: () => dispatch(resetClickInApp()),
  clickedInApp: () => dispatch(clickedInApp())
});

const mapStateToProps = ({ orderReducer, userReducer }) => ({
  orderReducer,
  user: userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(SaleList);
