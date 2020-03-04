/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import {
  pop, navigateScreen, showBadge, checkExistBottomTab
} from '@navigation/navigation';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import HeaderComponent from '@components/header/header';
import { Avatar } from 'react-native-elements';
import Container from '@components/container';
import { caculateDateFollow, getFromNow } from '@utils/date';
import { screenKeys } from '@constants/screenKeys';
import LinearGradient from 'react-native-linear-gradient';
import { retrieveNotificationNumber } from '@utils/common';
import { Navigation } from 'react-native-navigation';
import color from '@constants/color';
import styles from './styles';
import ItemNotification from './itemNotification';

class Notification extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientColor = ['#56d1d5', '#56c1d5', '#56b9d5'];
    this.gradientColor1 = ['#1286ac', '#239bc2', '#6fe1e2', '#9feaeb'];
    this.newNotificationCount = 0;
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.getListNotification();
    this.state = {
      pullRefeshing: false
    };
  }

  back = () => {
    const { componentId } = this.props;
    pop(componentId);
  }

  getListNotification = () => {
    const { getListNotification } = this.props;
    getListNotification({
      callback: this.showBadgeNotification
    });
  }

  showBadgeNotification = (data) => {
    const { pullRefeshing } = this.state;
    if (pullRefeshing) {
      this.setState({ pullRefeshing: false });
    }
    const newNotificationCount = retrieveNotificationNumber(data);
    this.newNotificationCount = newNotificationCount;
    if (newNotificationCount > 0) {
      // Need check bottom Tab exist before set bageNumber
      if (checkExistBottomTab(screenKeys.Notification)) {
        showBadge(screenKeys.Notification, newNotificationCount.toString());
      }
    } else {
      showBadge(screenKeys.Notification, '');
    }
  }

  navigateDetailOrder = (item) => {
    const { readNotification } = this.props;
    const {
      id, type, order_id, read
    } = item;
    if (!read) {
      readNotification({
        id
      });
    }

    if (type === 'FEEDBACK_DESIGN') {
      const passProps = {
        fromNotification: true,
      };
      navigateScreen(screenKeys.OrderListConfirm, { bottomTabs: false, passProps });
    } else if (type === 'FEEDBACK_DESIGNING') {
      const passProps = {
        orderId: order_id
      };
      navigateScreen(screenKeys.OrderDetail, { bottomTabs: false, passProps });
    } else if (type === 'ORDER_CANCELED') {
      const passProps = {
        orderId: order_id,
        fromNotification: true,
      };
      navigateScreen(screenKeys.OrderProcessingDetail, { bottomTabs: false, passProps });
    } else {
      const passProps = {
        editOrder: true,
        orderId: order_id,
        fromNotification: true,
      };
      navigateScreen(screenKeys.CreateOrder, { bottomTabs: false, passProps });
    }
  }

  getDataNotification = (type, order) => {
    const {
      customer, created_time,
      updated_time, order_no
    } = order;
    const { name } = customer;
    const dateTime = updated_time || created_time;
    const days = caculateDateFollow(dateTime);
    let title = '';
    let content = '';
    let icon = '';
    let avatarTitle = 'HT';

    if (type === 'UNFOLLOW') {
      title = 'Từ hệ thống:';
      content = `Bạn chưa trao đổi với ${name} ${Math.round(days)} ngày`;
      icon = 'settings';
      avatarTitle = 'HT';
    }
    if (type === 'DESIGNING') {
      title = 'Từ phòng Design:';
      content = `Đơn hàng ${order_no} đang được xử lý`;
      icon = 'clock';
      avatarTitle = 'DS';
    }
    if (type === 'FEEDBACK_DESIGN') {
      title = 'Từ phòng Design:';
      content = `Đơn hàng ${order_no} chờ phản hồi của khách hàng`;
      icon = 'shuffle';
      avatarTitle = 'DS';
    }
    if (type === 'FEEDBACK_DESIGNING') {
      title = 'Từ phòng Sale:';
      content = `Thiết kế đơn hàng ${order_no} đã được xác nhận từ ${name}`;
      icon = 'shuffle';
      avatarTitle = 'Sale';
    }
    if (type === 'ORDER_CANCELED') {
      title = 'Từ hệ thống:';
      content = `Đơn hàng ${order_no} đã bị huỷ`;
      icon = 'settings';
      avatarTitle = 'HT';
    }
    return {
      title,
      content,
      icon,
      avatarTitle,
    };
  }

  renderItem = ({ item }) => (
    <ItemNotification
      item={item}
      navigateDetailOrder={this.navigateDetailOrder}
    />
  )

  keyExtractor = (item, index) => index.toString();

  refeshPage = () => {
    const { pullRefeshing } = this.state;
    if (!pullRefeshing) {
      this.setState({ pullRefeshing: true }, () => {
        this.getListNotification();
      });
    }
  }

  render() {
    const { notificationReducer, user } = this.props;
    const isDesigner = user && user.role === 'designer';
    if (isDesigner) {
      return (
        this.renderDesignerNotification()
      );
    }
    const { pullRefeshing } = this.state;

    return (
      <Container>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={this.gradientColor}
        >
          <HeaderComponent
            title="THÔNG BÁO"
            iconLeft="arrow-left-circle"
            leftAction={this.back}
            defaultHeader
            size={25}
            containerHeader={styles.containerHeader}
          />
        </LinearGradient>
        <Container>
          <FlatList
            data={notificationReducer}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            refreshControl={(
              <RefreshControl
                refreshing={pullRefeshing}
                onRefresh={this.refeshPage}
              />
            )}
          />
        </Container>
      </Container>
    );
  }

  renderDesignerNotification() {
    const { notificationReducer } = this.props;
    return (
      <Container>
        <LinearGradient
          colors={this.gradientColor1}
          style={{ flex: 1 }}
        >
          <HeaderComponent
            title="THÔNG BÁO"
            defaultHeader
            size={25}
            containerHeader={styles.containerHeader}
          />
          <FlatList
            data={notificationReducer}
            renderItem={this.renderDesignerItem}
            keyExtractor={this.keyExtractor}
            style={{ marginTop: 5 }}
          />
        </LinearGradient>
      </Container>
    );
  }

  renderDesignerItem = ({ item }) => {
    const {
      type,
      order,
      read,
      created_time
    } = item;

    const backgroundUnread = read ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.5)';
    const textUnread = read ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.8)';
    const {
      title,
      content,
      icon,
      avatarTitle,
    } = this.getDataNotification(type, order);
    const timeNotification = getFromNow(created_time);

    return (
      <TouchableOpacity onPress={() => this.navigateDetailOrder(item)}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginHorizontal: 10,
          marginBottom: 5
        }}
        >
          <View style={[styles.containerRowValue, { backgroundColor: backgroundUnread, borderRadius: 10 }]}>
            <Avatar
              size="medium"
              rounded
              title={avatarTitle}
              showEditButton
              editButton={{
                name: icon,
                type: 'simple-line-icon',
                color: color.white,
                iconStyle: styles.iconStyle,
                containerStyle: {
                  backgroundColor: color.mainAppColor, width: 24, height: 24, borderRadius: 15
                }
              }}
            />
            <View style={styles.containerText}>
              <Text style={[styles.mainText, { color: textUnread }]}>
                {title}
                {' '}
                <Text style={[styles.content, { color: textUnread }]}>
                  {content}
                </Text>
              </Text>
              <Text style={[styles.timing, { color: textUnread }]}>{timeNotification}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Notification;
