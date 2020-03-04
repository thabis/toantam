import { connect } from 'react-redux';
import ListStored from '@screens/Storer/listStored';
import { getList } from '@actions/order/order';

const mapDispatchToProps = dispatch => ({
  dispatch,
  getList: payload => dispatch(getList(payload)),
});

const mapStateToProps = ({ listOrderReducer, configReducer }) => ({
  listPrinted: listOrderReducer.listPrinted,
  pullRefeshing: configReducer.pullRefeshing
});

export default connect(mapStateToProps, mapDispatchToProps)(ListStored);
