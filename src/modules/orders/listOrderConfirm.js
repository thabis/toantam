import React, { PureComponent } from 'react';
import {
  FlatList, View, RefreshControl, Alert
} from 'react-native';
import EmptyComponent from '@components/empty';
import EMPTYCUSTOMER from '@assets/icon/empty-customer.png';
import { Text, Divider } from 'react-native-elements';
import Container from '@components/container';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '@components/header/header';
import { pop } from '@navigation/navigation';
import ItemOrderConfirm from './itemOrderConfirm';
import styles from './styles';

class ListOrderConfirm extends PureComponent {
  constructor(props) {
    super(props);
    const { getList } = this.props;
    getList({ status: 3, order_by: 'updated_time' });
    this.gradientColor = ['#f59267', '#f06363'];
    this.showHeader = false;
    this.state = {
      pullRefeshing: false
    };
  }

  renderEmtpy = () => (
    <EmptyComponent
      imageEmpty={EMPTYCUSTOMER}
      title="Chưa có đơn hàng nào cần phản hồi!"
    />
  )

  callBack = (status) => {
    if (!status) {
      Alert.alert('Lưu không thành công');
    }
  }

  callBackRefresh = (status) => {
    const { pullRefeshing } = this.state;
    if (status && pullRefeshing) {
      this.setState({ pullRefeshing: false });
    }
  }

  submitOrder = (action, dataOrder) => {
    const { updateOrder } = this.props;
    action.setSubmitting(false);
    updateOrder({
      action,
      values: { status: 3 },
      dataOrder,
      callback: statusCallBack => this.callBack(statusCallBack)
    });
  }

  refeshPage = () => {
    const { getList } = this.props;
    const { pullRefeshing } = this.state;
    if (!pullRefeshing) {
      this.setState({ pullRefeshing: true }, () => {
        getList({
          status: 3,
          callback: statusCallBack => this.callBackRefresh(statusCallBack)
        });
      });
    }
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <ItemOrderConfirm
      item={item}
      index={index}
      submitOrder={this.submitOrder}
    />
  );

  renderListOrder = () => {
    const { listConfirm } = this.props;
    const { pullRefeshing } = this.state;
    return (
      <FlatList
        data={listConfirm}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={this.renderEmtpy}
        ListHeaderComponent={this.renderHeaderText}
        refreshControl={(
          <RefreshControl
            refreshing={pullRefeshing}
            onRefresh={this.refeshPage}
          />
        )}
      />
    );
  }

  renderHeaderText = () => (
    <View style={styles.containerHeaderOrder}>
      <Divider style={styles.dividerStyle} />
      <Text style={styles.textTitleStyle}>Design xử lý/ chỉnh sửa</Text>
      <Divider style={styles.dividerStyle} />
    </View>
  )

  back = () => {
    const { componentId } = this.props;
    pop(componentId);
  }

  renderHeader = () => (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={this.gradientColor}
    >
      <HeaderComponent
        title="DANH SÁCH PHẢN HỒI"
        containerHeader={styles.containerHeader}
        iconLeft="arrow-left-circle"
        leftAction={this.back}
      />
    </LinearGradient>
  )

  render() {
    const { fromNotification = false } = this.props;
    if (fromNotification) {
      this.showHeader = true;
    }
    return (
      this.showHeader
        ? (
          <Container>
            {this.renderHeader()}
            {this.renderListOrder()}
          </Container>
        )
        : this.renderListOrder()
    );
  }
}
export default ListOrderConfirm;
