import React, { PureComponent } from 'react';
import {
  View, Alert,
  Text, Dimensions
} from 'react-native';
import AnimationItem from '@components/animation/animation';
import { IconButton } from '@components/icon/icon';
import { Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { formatDateTime, getFromNow } from '@utils/date';
import SwipeView from '@components/animation/swipe';
import { hideModal, showModal } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import styles from './stylesStore';

class ItemOrderPrinted extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientOrderNo = ['#f59267', '#f06363'];
    this.gradientDate = ['#56d1d5', '#56b9d5'];
    this.swipeItem = null;
  }

  navigateDetailOrder = () => {
    const { item, navigateDetailOrder } = this.props;
    navigateDetailOrder(item);
  }

  getStatusMess = () => {
    const { currentStatus } = this.props;
    if (currentStatus === 7) {
      return 'Đã in';
    }
    if (currentStatus === 8) {
      return 'Đã lưu kho';
    }
    if (currentStatus === 9) {
      return 'Đã vận chuyển';
    }
    return '';
  }

  getContentItem = () => {
    const { user, item } = this.props;
    const { role } = user;
    const { name, delivery_address } = item;
    if (role === 'store') {
      return (
        <View style={styles.containerDetailOrder}>
          <Text style={styles.textOrderStyle}>
            File thiết kế:
          </Text>
          <Text style={styles.textName}>
            {name}
          </Text>
        </View>
      );
    }
    if (role === 'deliver') {
      return (
        <View style={styles.containerDetailOrder}>
          <Text style={styles.textOrderStyle}>
            Địa chỉ giao hàng:
          </Text>
          <Text style={[styles.textName, styles.textAddress]}>
            {delivery_address}
          </Text>
        </View>
      );
    }
    return null;
  }

  renderMainContent = () => {
    const { item, index } = this.props;
    const {
      order_no,
      delivery_date,
      updated_time,
    } = item;
    const date_delivery = delivery_date ? formatDateTime(delivery_date) : '';
    const date_now = updated_time ? getFromNow(updated_time) : '';

    return (
      <AnimationItem
        index={index}
        actionStyle={styles.containerRows}
        duration={500}
        opacity={1}
        onAction={this.navigateDetailOrder}
      >
        <View
          style={[styles.blockRow]}
        >
          <View style={styles.rowContent}>
            <View style={styles.blockRow}>
              <LinearGradient colors={this.gradientOrderNo} style={styles.orderNoStyle}>
                <Text style={styles.textRow}>{order_no}</Text>
              </LinearGradient>
              {this.getContentItem()}
            </View>
            <View style={styles.containerCalendar}>
              <LinearGradient
                colors={this.gradientDate}
                style={styles.viewCalendar}
              >
                <Text style={{ fontSize: 16, color: '#fff' }}>
                  Ngày giao
                </Text>
              </LinearGradient>
              <View style={styles.viewDetailCalendar}>
                <Text style={[styles.textOrderStyle, styles.textDelivery]}>{date_delivery}</Text>
              </View>
            </View>
          </View>
          <Divider style={{ backgroundColor: '#fff' }} />
          <View style={styles.containerOrder}>
            <View style={styles.textTime}>
              <Text style={styles.textOrderStyle}>
                {this.getStatusMess()}
                {' '}
                {date_now}
              </Text>
            </View>
          </View>
        </View>
      </AnimationItem>
    );
  }

  renderSwipeLeft = () => (
    <View style={styles.iconSwipeLeft}>
      <IconButton
        icon="check"
        size={26}
        propsStyles={{ color: '#fff' }}
      />
    </View>
  )

  onTouchMove = () => {
    if (this.swipeItem) {
      const { onMoving } = this.swipeItem;
      const { onMoveItem } = this.props;
      if (onMoveItem) {
        onMoveItem(onMoving);
      }
    }
  }

  onFinishService = (flag) => {
    hideModal(screenKeys.showModal);
    if (!flag) {
      Alert.alert('Không thể lưu kho được');
    }
    this.resetSwipe();
  }

  swipeOrder = () => {
    const { currentStatus, user } = this.props;
    const { role } = user;
    if (role === 'store' && currentStatus === 7) {
      return this.alertMessage();
    }
    if (role === 'deliver' && currentStatus === 8) {
      return this.acceptOrder();
    }
    return null;
  }

  alertMessage = () => {
    Alert.alert(
      'Thông báo',
      'Bạn lấy hàng về kho chưa?',
      [
        {
          text: 'Lưu kho',
          onPress: () => this.acceptOrder('store'),
          style: 'default'
        },
        {
          text: 'Chưa',
          onPress: () => this.resetSwipe(),
          style: 'destructive',
        },
      ],
    );
  }

  resetSwipe = () => {
    this.swipeItem.rowItemJustSwiped = false;
    if (!this.swipeItem.state.swipingLeft) {
      this.swipeItem.setState({ swipingLeft: true });
    }
  }

  acceptOrder = (role = '') => {
    if (this.swipeItem) {
      const { onMoving } = this.swipeItem;
      const { onMoveItem } = this.props;
      if (onMoveItem) {
        onMoveItem(onMoving);
      }
    }
    showModal(screenKeys.showModal);
    const {
      item, currentStatus, assignOrder, updateOrder, user
    } = this.props;
    const { username } = user;
    const { id } = item;
    if (role === 'store') {
      const payload = {
        values: { status: currentStatus + 1 },
        dataOrder: {
          id,
          note: `${username} đã xác nhận lưu kho`,
          status: currentStatus + 1
        },
        callback: status => this.onFinishService(status),
      }
      updateOrder(payload);
    }
    else {
      const payload = {
        currentStatus,
        callback: status => this.onFinishService(status),
        id,
        status: currentStatus + 1,
      };
      assignOrder(payload);
    }

  }

  renderSwipeContent = () => (
    <SwipeView
      ref={(ref) => { this.swipeItem = ref; }}
      renderVisibleContent={this.renderMainContent}
      renderLeftView={this.renderSwipeLeft}
      leftOpenValue={Dimensions.get('window').width}
      rightOpenValue={-Dimensions.get('window').width}
      swipeDuration={500}
      swipeToOpenPercent={35}
      disableSwipeToLeft
      onSwipedRight={this.swipeOrder}
      onTouchMove={this.onTouchMove}
    />
  );

  render() {
    const { currentStatus, user } = this.props;
    const { role } = user;
    if ((role === 'store' && currentStatus === 8) || (role === 'deliver' && currentStatus === 9)) {
      return this.renderMainContent();
    }
    return this.renderSwipeContent();
  }
}
export default ItemOrderPrinted;
