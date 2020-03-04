import { connect } from 'react-redux';
import ListDeliver from '@screens/Deliver/listDeliver';
import { getList } from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload)),
});

const mapStateToProps = ({ listOrderReducer }) => ({
  listDeliver: listOrderReducer.listDeliver,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListDeliver);
