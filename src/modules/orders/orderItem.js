import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Divider } from 'react-native-elements';
import { ActionIcon, IconButton } from '@components/icon/icon';
import { navigateScreen, showModal, hideModal } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import { getDateFromNow, caculateDateFollowFrom, formatDateTime } from '@utils/date';
import { apiGetOrderStatusHistory } from '@services/order-api';
import AnimationItem from '@src/components/animation/animation';
import SwipeView from '@src/components/animation/swipe';
import styles from './styles';

class OrderItem extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientOrderNo = ['#f59267', '#f06363'];
    this.gradientDate = ['#56d1d5', '#56b9d5'];
    this.state = {
      expanded: false,
      updatedTime: ''
    };
  }

  componentDidMount() {
    const { user: { token }, data: { id, status } } = this.props;
    if (status === 1) {
      apiGetOrderStatusHistory(token, {
        id,
        status
      })
        .then(res => this.getOrderStatusHistoryCallback(res.data))
        .catch(error => error.data);
    }
  }

  getOrderStatusHistoryCallback = (data) => {
    const { items } = data;
    if (items) {
      this.setState({
        updatedTime: items[0].updated_time || items[0].created_time
      });
    }
  }

  toggle = () => {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded
    });
  }

  resetSwipe = () => {
    hideModal(screenKeys.showModal);
    this.swipeItem.rowItemJustSwiped = false;
    if (!this.swipeItem.state.swipingLeft) {
      this.swipeItem.setState({ swipingLeft: true });
    }
  }

  acceptOrderFromDesigner = () => {
    const { assignOrder, data: { id, status } } = this.props;
    showModal(screenKeys.showModal);
    assignOrder({
      id,
      status: status + 1,
      currentStatus: status,
      callback: () => this.getAcceptOrderCallback()
    });
  }

  getAcceptOrderCallback = () => {
    this.resetSwipe();
  }

  navigateToDetailOrder = (data) => {
    const passProps = {
      data
    };
    navigateScreen(screenKeys.OrderDetail, { bottomTabs: false, passProps });
  }

  renderMainContent = () => {
    const { updatedTime } = this.state;
    const { index } = this.props;
    const {
      data: {
        updated_time,
        delivery_date,
        name,
        order_no,
        notes
      },
      data,
      orderStatus
    } = this.props;
    const saleDate = updatedTime || updated_time;
    const createdTime = formatDateTime(saleDate);
    const deliveryDate = formatDateTime(delivery_date);
    const noteString = notes.length > 0 ? notes[notes.length - 1].note : '';
    const dateNotFollow = caculateDateFollowFrom(saleDate);
    const dateFromNow = getDateFromNow(dateNotFollow, updated_time);
    const isAlert = dateNotFollow && orderStatus === 1 && (
      (dateNotFollow.type === 'd' && dateNotFollow.value >= 2)
      || (dateNotFollow.type !== 'd' && dateNotFollow.type !== 'h' && dateNotFollow.type !== 'm' && dateNotFollow.value > 0));
    return (
      <AnimationItem
        index={index}
        onAction={() => this.navigateToDetailOrder(data)}
        actionStyle={[styles.containerRows, styles.itemContainerStyle]}
        opacity={1}
        duration={500}
      >
        <View style={styles.headerItem}>
          <LinearGradient colors={this.gradientOrderNo} style={styles.orderNo}>
            <Text style={styles.subTextRow}>{order_no}</Text>
          </LinearGradient>
          <View style={[styles.itemContainerDate]}>
            <View
              style={[styles.itemContainerDateHeader,
                { backgroundColor: `${isAlert ? '#d53f50' : '#1678E4'}` }]}
            >
              <Text style={styles.itemCreateDateTitle}>
                {orderStatus === 1 ? 'NGÀY TẠO' : 'NGÀY GIAO'}
              </Text>
            </View>
            <View style={[styles.itemContainerDateContent]}>
              <Text style={[styles.itemCreateDateText]}>
                {orderStatus === 1 ? createdTime : deliveryDate}
              </Text>
              {orderStatus === 1 && (
              <View>
                <Text style={[styles.itemDateNotFollowText]}>
                  {dateNotFollow && dateNotFollow.value}
                </Text>
                <Text style={[styles.itemDateNotFollowTitle]}>
                  {dateNotFollow && dateNotFollow.typeName}
                </Text>
              </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.contentItem}>
          <Text numberOfLines={2} style={styles.titleName}>{name}</Text>
          <View style={styles.noteContainer}>
            <ActionIcon
              size={12}
              propsStyles={styles.dateIcon}
              icon="note"
            />
            <Text numberOfLines={2} style={styles.noteText}>
              {noteString.trim()}
            </Text>
          </View>
        </View>
        <View style={[styles.contentItemFooter]}>
          <Divider style={styles.itemDividerStyle} />
          <Text style={styles.itemDiscussDate}>
            {`Trao đổi ${dateFromNow}`}
          </Text>
        </View>
      </AnimationItem>
    );
  }

  renderSwipeLeft = () => (
    <View style={[styles.itemSwiperContainer]}>
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

  render() {
    const { orderStatus } = this.props;
    if (orderStatus === 1 || orderStatus === 5) {
      return (
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
    }
    return this.renderMainContent();
  }

  swipeOrder = () => this.acceptOrderFromDesigner()
}

export default OrderItem;
