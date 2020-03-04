
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { PureComponent } from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import EmptyComponent from '@components/empty';
import EMPTYCUSTOMER from '@assets/icon/empty-customer.png';
import OrderItem from '@containers/orderContainer/orderItemContainer';
import color from '@constants/color';
import styles from './styles';

class ListOrderDesigned extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pullRefeshing: false
    };
  }

  renderEmpty = () => (
    <EmptyComponent
      imageEmpty={EMPTYCUSTOMER}
      title="Bạn chưa có đơn hàng nào!"
    />
  );

  refreshPage = () => {
    const { getList } = this.props;
    this.setState({
      pullRefeshing: true
    }, () => {
      getList({
        status: '5',
        callback: status => this.callback(status)
      })
    })
  };

  callback = (status) => {
    const { pullRefeshing } = this.state;
    if (status && pullRefeshing) {
      this.setState({ pullRefeshing: false });
    }
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    const { orderStatus } = this.props;
    return (
      <OrderItem
        key={index.toString()}
        data={item}
        orderStatus={orderStatus}
        onMoveItem={this.onMoveItem}
      />
    );
  };

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

  renderListOrder = () => {
    const { pullRefeshing } = this.state;
    const listDesignedFilter = this.filterOrder();
    return (
      <FlatList
        ref={(ref) => { this.listRef = ref; }}
        data={listDesignedFilter}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={this.renderEmpty}
        refreshControl={(
          <RefreshControl
            tintColor="white"
            refreshing={pullRefeshing}
            onRefresh={this.refreshPage}
          />
        )}
      />
    );
  };

  filterOrder = () => {
    const { listDesigned } = this.props;
    const { search } = this.state;
    if (search !== '') {
      return listDesigned.filter((item) => {
        const name = item.name.toLowerCase();
        const orderNo = item.order_no.toLowerCase();
        const searchName = search.toLowerCase();
        if (name.includes(searchName) || orderNo.includes(searchName)) {
          return item;
        }
        return false;
      });
    }
    return listDesigned;
  };

  updateSearch = (search) => {
    this.setState({
      search
    });
  };

  renderSearchBar = () => {
    const { search } = this.state;
    return (
      <SearchBar
        value={search}
        placeholder="Nhập tên, mã đơn hàng"
        lightTheme
        round
        containerStyle={[styles.containerSearchStyle]}
        inputContainerStyle={[
          styles.inputCtnSearch,
          { backgroundColor: 'rgba(255,255,255,0.12)' }
        ]}
        inputStyle={[styles.inputSearch, { color: color.dividerGrey }]}
        onChangeText={this.updateSearch}
        placeholderTextColor={color.dividerGrey}
        searchIcon={(
          <Icon
            name="search"
            type="material"
            color={color.dividerGrey}
            size={20}
          />
        )}
        clearIcon={(
          <Icon
            name="clear"
            type="material"
            color={color.dividerGrey}
            size={20}
            underlayColor="transparent"
            onPress={() => this.setState({ search: '' })}
          />
        )}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderSearchBar()}
        {this.renderListOrder()}
      </View>
    );
  }
}

export default ListOrderDesigned;
