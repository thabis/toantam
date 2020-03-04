import React, { PureComponent } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '@components/header/header';
import Container from '@components/container';
import { showBadge } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import ListOrderPrinting from '@containers/orderContainer/orderListPrintingContainer';
import { retrieveNotificationNumber } from '@utils/common';
import { Navigation } from 'react-native-navigation';
import styles from './styles';

class PrintingList extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientColor = ['#1286ac', '#239bc2', '#6fe1e2', '#9feaeb'];
    Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    const { getList, getListNotification } = this.props;
    getList({ status: 6 });
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
            title="DANH SÁCH XỬ LÝ"
            containerHeader={[styles.containerHeader]}
          />
          <View style={[styles.containerList]}>
            <ListOrderPrinting orderStatus={6} />
          </View>
        </LinearGradient>
      </Container>
    );
  }
}

export default PrintingList;
