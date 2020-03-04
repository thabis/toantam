/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { PureComponent } from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
import { SearchBar, Text } from 'react-native-elements';
import EmptyComponent from '@components/empty';
import EMPTYCUSTOMER from '@assets/icon/empty-customer.png';
import { IconButton } from '@components/icon/icon';
import { navigateScreen } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import LinearGradient from 'react-native-linear-gradient';
import AnimationItem from '@components/animation/animation';
import { formatDateTime } from '@utils/date';
import OrderItem from '@containers/orderContainer/orderItemContainer';
import color from '@constants/color';
import styles from './styles';

class ListOrderProccessing extends PureComponent {
  constructor(props) {
    super(props);
    const { getList } = this.props;
    getList({ status: '2,4,5,6,7,8,9,10', order_by: 'updated_time' });
    this.gradientColor = ['#f59267', '#f06363'];
    this.statusColor = ['#56d1d5', '#56c1d5', '#56b9d5'];
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

  callBack = (status) => {
    const { pullRefeshing } = this.state;
    if (status && pullRefeshing) {
      this.setState({ pullRefeshing: false });
    }
  }

  refeshPage = () => {
    const { getList } = this.props;
    const { pullRefeshing } = this.state;
    if (!pullRefeshing) {
      this.setState({ pullRefeshing: true }, () => {
        getList({
          status: '2,4,5,6,7,8,9,10',
          order_by: 'updated_time',
          callback: status => this.callBack(status)
        });
      });
    }
  }

  navigateDetailOrder = (item) => {
    const { setOrderSuccess, setCustomer } = this.props;
    const { customer } = item;
    setCustomer({ payload: customer });
    setOrderSuccess({ payload: item });
    // const passProps = {
    //   editOrder: true,
    //   statusOrder: 'processing',
    // };
    navigateScreen(screenKeys.OrderProcessingDetail, { bottomTabs: false });
  }

  getColorStatusOrder = (status) => {
    let statusName = '';
    switch (status) {
      case 1:
      case 2:
      case 3:
      case 4: {
        this.statusColor = ['#56d1d5', '#56b9d5'];
        statusName = 'Phòng Design';
        break;
      }
      case 5:
      case 6: {
        statusName = 'Phòng In Ấn';
        break;
      }
      case 7:
      case 8: {
        statusName = 'Phòng Kho';
        break;
      }
      case 9: {
        statusName = 'Vận Chuyển';
        break;
      }
      case 10: {
        statusName = 'Đã Giao';
        break;
      }
      default: {
        statusName = 'Không rõ';
        this.statusColor = ['#56d1d5', '#56b9d5'];
      }
    }
    return statusName;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    const { user, orderStatus } = this.props;
    if (user && user.role === 'designer') {
      return (
        <OrderItem data={item} orderStatus={orderStatus} />
      );
    }

    const {
      customer,
      order_no,
      delivery_date,
      status
    } = item;
    const { name, phone } = customer;
    const date_now = delivery_date ? formatDateTime(delivery_date) : '';
    const statusName = this.getColorStatusOrder(status);
    return (
      <AnimationItem
        index={index}
        onAction={() => this.navigateDetailOrder(item)}
        actionStyle={styles.containerRows}
        duration={500}
      >
        <View style={styles.containerOrder}>
          <LinearGradient colors={this.gradientColor} style={styles.orderNoStyle}>
            <Text style={styles.textRow}>{order_no}</Text>
          </LinearGradient>
          <LinearGradient colors={this.statusColor} style={styles.orderStatusStyle}>
            <Text style={styles.textRow}>{statusName}</Text>
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
      </AnimationItem>
    );
  }

  renderListOrder = () => {
    const { pullRefeshing } = this.state;
    const listProcessingFilter = this.filterOrder();
    return (
      <FlatList
        data={listProcessingFilter}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={this.renderEmtpy}
        refreshControl={(
          <RefreshControl
            refreshing={pullRefeshing}
            onRefresh={this.refeshPage}
          />
        )}
      />
    );
  }

  filterOrder = () => {
    const { listProcessing } = this.props;
    const { search } = this.state;
    if (search !== '') {
      return listProcessing.filter((item) => {
        const name = item.name.toLowerCase();
        const orderNo = item.order_no.toLowerCase();
        const searchName = search.toLowerCase();
        if (name.includes(searchName) || orderNo.includes(searchName)) {
          return item;
        }
        return false;
      });
    }
    return listProcessing;
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
        placeholder="Nhập tên, số điện thoại..."
        lightTheme
        round
        containerStyle={[styles.containerSearchStyle]}
        inputContainerStyle={[styles.inputCtnSearch, { backgroundColor: 'rgba(255,255,255,0.12)' }]}
        inputStyle={[styles.inputSearch, { color: color.dividerGrey }]}
        onChangeText={this.updateSearch}
        placeholderTextColor={color.dividerGrey}
      />
    );
  }

  render() {
    const { user } = this.props;
    const isDesigner = user && user.role === 'designer';
    return (
      <View>
        {isDesigner && (this.renderSearchBar())}
        {this.renderListOrder()}
      </View>
    );
  }
}
export default ListOrderProccessing;
