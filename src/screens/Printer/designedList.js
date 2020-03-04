import React, { PureComponent } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '@components/header/header';
import Container from '@components/container';
import { showBadge } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import ListOrderDesigned from '@containers/orderContainer/orderListDesignedContainer';
import { retrieveNotificationNumber } from '@utils/common';
import { Navigation } from 'react-native-navigation';
import styles from './styles';

class DesignedList extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientColor = ['#1286ac', '#239bc2', '#6fe1e2', '#9feaeb'];
    Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    const { getList, getListNotification } = this.props;
    getList({ status: 5 });
    getListNotification({
      callback: this.showBadgeNotification
    });
  }

  showBadgeNotification = (data) => {
    const newNotificationCount = retrieveNotificationNumber(data);
    if (newNotificationCount > 0) {
      showBadge(screenKeys.Notification, newNotificationCount.toString());
    }
  }

  render() {
    return (
      <Container>
        <LinearGradient
          colors={this.gradientColor}
          style={{ flex: 1 }}
        >
          <HeaderComponent
            title="DANH SÁCH ĐƠN HÀNG"
            containerHeader={[styles.containerHeader]}
          />
          <View style={[styles.containerList]}>
            <ListOrderDesigned orderStatus={5} />
          </View>
        </LinearGradient>
      </Container>
    );
  }
}

export default DesignedList;
