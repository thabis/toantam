/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { PureComponent } from 'react';
import {
  FlatList, View,
  Text, RefreshControl
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import EmptyComponent from '@components/empty';
import EMPTYCUSTOMER from '@assets/icon/empty-customer.png';
import { navigateScreen } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import AnimationItem from '@components/animation/animation';
import { IconButton } from '@components/icon/icon';
import OrderItem from '@containers/orderContainer/orderItemContainer';
import LinearGradient from 'react-native-linear-gradient';
import { formatDateTime } from '@utils/date';
import color from '@constants/color';
import styles from './styles';

class ListOrderSale extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientColor = ['#f59267', '#f06363'];
    this.state = {
      search: '',
      pullRefeshing: false
    };
  }

  renderEmtpy = () => (
    <EmptyComponent
      imageEmpty={EMPTYCUSTOMER}
      title="Bạn chưa có đơn hàng nào!"
    />
  )

  refeshPage = () => {
    const { getList } = this.props;
    const { pullRefeshing } = this.state;
    if (!pullRefeshing) {
      this.setState({ pullRefeshing: true }, () => {
        getList({ status: 1, callback: status => this.callback(status) });
      });
    }
  }

  callback = (status) => {
    const { pullRefeshing } = this.state;
    if (status && pullRefeshing) {
      this.setState({ pullRefeshing: false });
    }
  }

  navigateDetailOrder = (item) => {
    const { setOrderSuccess, setCustomer } = this.props;
    const { customer } = item;
    setCustomer({ payload: customer });
    setOrderSuccess({ payload: item });
    const passProps = {
      editOrder: true,
    };
    navigateScreen(screenKeys.CreateOrder, { bottomTabs: false, passProps });
  }

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

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    const { user, orderStatus } = this.props;
    if (user && user.role === 'designer') {
      return (
        <OrderItem
          data={item}
          orderStatus={orderStatus}
          index={index}
          onMoveItem={this.onMoveItem}
        />
      );
    }

    const {
      order_no,
      delivery_date,
      customer
    } = item;
    const { name, phone } = customer;
    const date_now = delivery_date ? formatDateTime(delivery_date) : '';
    return (
      <AnimationItem
        index={index}
        onAction={() => this.navigateDetailOrder(item)}
        actionStyle={styles.containerRows}
        duration={500}
      >
        <View style={styles.blockConfirm}>
          <View style={styles.containerOrder}>
            <LinearGradient colors={this.gradientColor} style={styles.orderNoStyle}>
              <Text style={styles.textRow}>{order_no}</Text>
            </LinearGradient>
          </View>
          <View style={styles.containerOrder}>
            <View style={styles.containerDetailOrder}>
              <Text style={styles.textOrderStyle}>
                <IconButton
                  icon="user"
                  size={16}
                  propsStyles={styles.iconOrderStyles}
                />
                {' '}
                {name}
              </Text>
              <Text style={styles.textOrderStyle}>
                <IconButton
                  icon="phone"
                  size={16}
                  propsStyles={styles.iconOrderStyles}
                />
                {' '}
                {phone}
              </Text>
              <Text style={styles.textOrderStyle}>
                <IconButton
                  icon="basket"
                  size={16}
                  propsStyles={styles.iconOrderStyles}
                />
                {' '}
                {date_now}
              </Text>
            </View>
            <View style={{ alignSelf: 'center', paddingRight: 15 }}>
              <Text style={styles.textDetailOrder}>Chi tiết</Text>
            </View>
          </View>
        </View>
      </AnimationItem>
    );
  }

  renderListOrder = () => {
    const { user } = this.props;
    const { pullRefeshing } = this.state;
    const isDesigner = user && user.role === 'designer';
    const listSaleFilter = this.filterOrder();
    return (
      <FlatList
        ref={(ref) => { this.listRef = ref; }}
        data={listSaleFilter}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={this.renderEmtpy}
        refreshControl={(
          <RefreshControl
            tintColor={isDesigner ? 'white' : ''}
            refreshing={pullRefeshing}
            onRefresh={this.refeshPage}
          />
        )}
      />
    );
  }

  filterOrder = () => {
    const { listSale } = this.props;
    const { search } = this.state;
    if (search !== '') {
      return listSale.filter((item) => {
        const name = item.name.toLowerCase();
        const orderNo = item.order_no.toLowerCase();
        const searchName = search.toLowerCase();
        if (name.includes(searchName) || orderNo.includes(searchName)) {
          return item;
        }
        return false;
      });
    }
    return listSale;
  }

  updateSearch = (search) => {
    this.setState({
      search
    });
  }

  renderSearchBar = () => {
    const { search } = this.state;
    return (
      <SearchBar
        value={search}
        placeholder="Nhập tên, mã đơn hàng"
        lightTheme
        round
        containerStyle={[styles.containerSearchStyle]}
        inputContainerStyle={[styles.inputCtnSearch, { backgroundColor: 'rgba(255,255,255,0.12)' }]}
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
    const { user } = this.props;
    const isDesigner = user && user.role === 'designer';
    const style = isDesigner ? { flex: 1 } : {};
    return (
      <View style={style}>
        {isDesigner && this.renderSearchBar()}
        {this.renderListOrder()}
      </View>
    );
  }
}

export default ListOrderSale;
