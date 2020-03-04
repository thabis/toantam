import React, { PureComponent } from 'react';
import {
  FlatList,
  RefreshControl
} from 'react-native';
import EmptyComponent from '@components/empty';
import EMPTYCUSTOMER from '@assets/icon/empty-customer.png';
import { navigateScreen } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import ItemOrderStore from './itemOrderStore';

class ListOrderPrinted extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientOrderNo = ['#f59267', '#f06363'];
    this.gradientDate = ['#56d1d5', '#56b9d5'];
    this.state = {
      pullRefeshing: false
    }
  }

  renderEmtpy = () => (
    <EmptyComponent
      imageEmpty={EMPTYCUSTOMER}
      title="Bạn chưa có đơn hàng nào!"
    />
  )

  refeshPage = () => {
    const { getList, status } = this.props;
    this.setState({
      pullRefeshing: true,
    }, () => {
      getList({
        status,
        order_by: 'delivery_date',
        sort_direction: 'asc',
        callback: status => this.callback(status)
      });
    })
  }

  callback = (status) => {
    const { pullRefeshing } = this.state;
    if (status && pullRefeshing) {
      this.setState({ pullRefeshing: false });
    }
  }

  navigateDetailOrder = (item) => {
    const passProps = {
      item
    };
    navigateScreen(screenKeys.OrderDetailScreen, { bottomTabs: false, passProps });
  }

  keyExtractor = (item, index) => index.toString();

  onMoveItem = (moveEnd) => {
    if (moveEnd) {
      this.listRef.getScrollResponder().setNativeProps({
        scrollEnabled: false
      });
    } else {
      this.listRef.getScrollResponder().setNativeProps({
        scrollEnabled: true
      });
    }
  }

  renderItem = ({ item, index }) => {
    const { user, status, updateOrder } = this.props;
    return (
      <ItemOrderStore
        item={item}
        index={index}
        onMoveItem={this.onMoveItem}
        user={user}
        currentStatus={status}
        updateOrder={updateOrder}
        navigateDetailOrder={this.navigateDetailOrder}
      />
    );
  };

  renderListOrder = () => {
    const { listPrinted } = this.props;
    const { pullRefeshing } = this.state;
    return (
      <FlatList
        ref={(ref) => { this.listRef = ref; }}
        data={listPrinted}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={this.renderEmtpy}
        onScrollBeginDrag={this.onScrollBeginDrag}
        onTouchMove={this.onTouchMove}
        refreshControl={(
          <RefreshControl
            refreshing={pullRefeshing}
            onRefresh={this.refeshPage}
          />
        )}
      />
    );
  }

  render() {
    return (
      this.renderListOrder()
    );
  }
}

export default ListOrderPrinted;
