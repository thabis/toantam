/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { PureComponent } from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import EmptyComponent from '@components/empty';
import EMPTYCUSTOMER from '@assets/icon/empty-customer.png';
import { IconButton } from '@components/icon/icon';
import { navigateScreen } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import LinearGradient from 'react-native-linear-gradient';
import AnimationItem from '@components/animation/animation';
import { getFromNow } from '@utils/date';
import styles from './styles';

class ListOrderCancel extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientColor = ['#d53f62', '#d53f50', '#d53f3f'];
    this.gradientOrderNo = ['#f59267', '#f06363'];
    this.statusColor = ['#56d1d5', '#56c1d5', '#56b9d5'];
    this.state = {
      pullRefeshing: false
    };
  }

  renderEmtpy = () => (
    <EmptyComponent
      imageEmpty={EMPTYCUSTOMER}
      title="Bạn chưa có đơn hàng nào bị huỷ!"
    />
  )

  callback = (status) => {
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
          status: -1,
          order_by: 'updated_time',
          callback: status => this.callback(status)
        });
      });
    }
  }

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
      case -1: {
        statusName = 'Đã Huỷ';
        break;
      }
      default: {
        statusName = 'Không rõ';
      }
    }
    return statusName;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    const {
      customer,
      order_no,
      status,
      notes
    } = item;
    const { name, phone } = customer;
    const timeNotes = notes.length > 0 ? `${notes[notes.length - 1].created_time}` : '';
    const statusName = this.getColorStatusOrder(status);
    const noteTitle = notes.length > 0 ? `${notes[notes.length - 1].note}` : '';
    const dateFromNow = getFromNow(timeNotes);
    return (
      <AnimationItem
        index={index}
        onAction={() => this.navigateDetailOrder(item)}
        actionStyle={styles.containerRows}
        duration={500}
      >
        <View style={styles.containerOrder}>
          <LinearGradient colors={this.gradientOrderNo} style={styles.orderNoStyle}>
            <Text style={styles.textRow}>{order_no}</Text>
          </LinearGradient>
          <LinearGradient colors={this.gradientColor} style={styles.orderStatusStyle}>
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
                icon="bubble"
                size={16}
                propsStyles={styles.iconOrderStyles}
              />
              {' '}
              {noteTitle}
            </Text>
            <Divider style={{ backgroundColor: '#7C7C7C' }} />
            <Text style={styles.textOrderStyle}>
              Đã huỷ
              {' '}
              {dateFromNow}
            </Text>
          </View>

        </View>

      </AnimationItem>
    );
  }

  renderListOrder = () => {
    const { listCancel } = this.props;
    const { pullRefeshing } = this.state;
    return (
      <FlatList
        data={listCancel}
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

  render() {
    return (
      this.renderListOrder()
    );
  }
}
export default ListOrderCancel;
