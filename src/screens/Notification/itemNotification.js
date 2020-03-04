import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Divider, Avatar } from 'react-native-elements';
import { getFromNow, caculateDateFollow } from '@utils/date';
import color from '@constants/color';
import styles from './styles';

export default class Notification extends PureComponent {
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
      avatarTitle = 'DS';
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

  render() {
    const { item, navigateDetailOrder } = this.props;
    const {
      type,
      order,
      read,
      created_time
    } = item;

    const backgroundUnread = read ? '#fff' : '#EDF2FA';
    const textUnread = read ? color.textRead : color.textUnread;
    const {
      title,
      content,
      icon,
      avatarTitle,
    } = this.getDataNotification(type, order);
    const timeNotification = getFromNow(created_time);
    return (
      <TouchableOpacity onPress={() => navigateDetailOrder(item)}>
        <View style={styles.containerRow}>
          <View style={[styles.containerRowValue, { backgroundColor: backgroundUnread }]}>
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
              <Text style={styles.mainText}>
                {title}
                {' '}
                <Text style={[styles.content, { color: textUnread }]}>
                  {content}
                </Text>
              </Text>
              <Text style={styles.timing}>{timeNotification}</Text>
            </View>
          </View>
          <Divider />
        </View>
      </TouchableOpacity>
    );
  }
}
