import { connect } from 'react-redux';
import ItemOrderDetail from '@modules/orders/itemDetail/itemOrderDetail';

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = ({ configReducer }) => ({
  listPaper: configReducer.listPaper,
  listCategory: configReducer.listCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemOrderDetail);
