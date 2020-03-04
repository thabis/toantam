import React, { PureComponent } from 'react';
import { View, AppState } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '@components/header/header';
import Container from '@components/container';
import { showBadge, changeBottomTab } from '@navigation/navigation';
import NotificationInApp from '@components/notification/notification';
import { screenKeys } from '@constants/screenKeys';
import ListOrderSale from '@containers/orderContainer/orderListSaleContainer';
import { retrieveNotificationNumber } from '@utils/common';
import { Navigation } from 'react-native-navigation';
import NotificationService from '@services/firebase/notificationService';
import styles from './styles';

class SaleList extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientColor = ['#1286ac', '#239bc2', '#6fe1e2', '#9feaeb'];
    const dataProps = {
      ...this.props,
      changeTabNotification: () => this.changeTabNotification()
    };

    this.appState = AppState.currentState;
    this.notiService = new NotificationService(dataProps);
    Navigation.events().bindComponent(this);
  }

  changeTabNotification = () => {
    changeBottomTab(screenKeys.Notification, 2);
  }

  UNSAFE_componentWillMount() {
    this.notiService.createNotificationListeners();
    // showOverlay(screenKeys.NotificationTop);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    this.notiService.notificationListener();
    this.notiService.notificationOpenedListener();
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
    const { badgeUnread } = this.props;
    this.notiService.setBageApp(badgeUnread || 0);
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    const { badgeUnread } = this.props;
    if (
      this.appState.match(/inactive|background/)
      && nextAppState === 'active'
    ) {
      this.notiService.setBageApp(badgeUnread || 0);
    } else if (nextAppState === 'background') {
      this.notiService.setBageApp(badgeUnread || 0);
    }
  };

  componentDidAppear() {
    const { getList, getListNotification } = this.props;
    getList({ status: 1 });
    // getListNotification({
    //   callback: this.showBadgeNotification
    // });
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
          <NotificationInApp />
          <HeaderComponent
            title="DANH SÁCH ĐƠN HÀNG"
            containerHeader={styles.containerHeader}
          />
          <View style={[styles.containerList]}>
            <ListOrderSale orderStatus={1} />
          </View>
        </LinearGradient>
      </Container>
    );
  }
}

export default SaleList;
