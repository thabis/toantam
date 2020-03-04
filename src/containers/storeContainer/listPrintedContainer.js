import { connect } from 'react-redux';
import ListPrinted from '@src/screens/Storer/listPrinted';
import { getList } from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload)),
});

const mapStateToProps = ({ listOrderReducer, configReducer }) => ({
  listPrinted: listOrderReducer.listPrinted,
  pullRefeshing: configReducer.pullRefeshing
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPrinted);
