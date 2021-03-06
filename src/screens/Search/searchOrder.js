/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import EmptyComponent from '@components/empty';
import EMPTYCUSTOMER from '@assets/icon/empty-customer.png';
import { IconButton } from '@components/icon/icon';
import { Text } from 'react-native-elements';
import { navigateScreen, pop } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import LinearGradient from 'react-native-linear-gradient';
import AnimationItem from '@components/animation/animation';
import { formatDateTime } from '@utils/date';
import Container from '@components/container';
import HeaderComponent from '@components/header/header';
import styles from './styles';

class SearchOrder extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientColor = ['#f59267', '#f06363'];
    this.statusColor = ['#56d1d5', '#56c1d5', '#56b9d5'];
  }

  renderEmtpy = () => (
    <EmptyComponent
      imageEmpty={EMPTYCUSTOMER}
      title="Không tìm thấy đơn hàng!"
    />
  )

  navigateDetailOrder = (item) => {
    const { setOrderSuccess, setCustomer } = this.props;
    const { customer } = item;
    setCustomer({ payload: customer });
    setOrderSuccess({ payload: item });
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
    const { listSearch } = this.props;
    return (
      <FlatList
        data={listSearch}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={this.renderEmtpy}
      />
    );
  }

  back = () => {
    const { componentId } = this.props;
    pop(componentId);
  }

  render() {
    return (
      <Container>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={this.gradientColor}
        >
          <HeaderComponent
            placement="center"
            title="KẾT QUẢ"
            containerHeader={styles.containerHeader}
            iconLeft="arrow-left-circle"
            leftAction={this.back}
          />
        </LinearGradient>
        {this.renderListOrder()}
      </Container>
    );
  }
}
export default SearchOrder;
