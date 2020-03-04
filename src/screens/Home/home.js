/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import { navigateScreen } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import HeaderComponent from '@components/header/header';
import Container from '@components/container';
import NotificationInApp from '@components/notification/notification';
import { ButtonActionCom } from '@components/actionbtn/actionbtn';
import ListOrderDraft from '@containers/orderContainer/orderListDraftContainer';
import NotificationService from '@services/firebase/notificationService';
import LinearGradient from 'react-native-linear-gradient';
import {
  AppState, Keyboard
} from 'react-native';
import styles from './styles';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.appState = AppState.currentState;
    this.notiService = new NotificationService(this.props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
    const { userReducer } = this.props;
    this.fullname = `Xin chào ${userReducer.username}`;
    this.gradientColor = ['#56d1d5', '#56c1d5', '#56b9d5'];
  }

  UNSAFE_componentWillMount() {
    this.notiService.createNotificationListeners();
    // showOverlay(screenKeys.NotificationTop);
    const { getList } = this.props;
    getList({ status: 0, order_by: 'updated_time' });
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
    this.notiService.setBageApp(badgeUnread);
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    const { badgeUnread } = this.props;
    if (
      this.appState.match(/inactive|background/)
      && nextAppState === 'active'
    ) {
      this.notiService.setBageApp(badgeUnread);
    } else if (nextAppState === 'background') {
      this.notiService.setBageApp(badgeUnread);
    }
  };

  onNavigateCustomer = () => {
    navigateScreen(screenKeys.CreateCustomer, { bottomTabs: false });
  }

  onNavigateOrder = () => {
    const passProps = {
      directOrder: true
    };
    const { clearOrder } = this.props;
    clearOrder();
    navigateScreen(screenKeys.CreateOrder, { bottomTabs: false, passProps });
  }

  onNotificationOrder = () => {
    Keyboard.dismiss();
    // Not using InteractionManager because JS thread must be run done.
    setTimeout(() => {
      navigateScreen(screenKeys.Notification, { bottomTabs: false });
    }, 200);
  }

  actionButton = () => {
    const actionsList = [
      {
        title: 'Tạo khách hàng',
        iconName: 'md-person-add',
        action: this.onNavigateCustomer
      },
      {
        title: 'Tạo đơn hàng',
        iconName: 'md-clipboard',
        action: this.onNavigateOrder
      },
    ];
    return (
      <ButtonActionCom
        actionsList={actionsList}
        buttonMainColor="#D7263D"
        buttonChildColor="#003049"
        size={46}
      />
    );
  }

  render() {
    const { badgeUnread } = this.props;
    return (
      <Container>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={this.gradientColor}
          style={{ flex: 1 }}
        >
          <NotificationInApp />
          <HeaderComponent
            placement="left"
            title={this.fullname}
            showIconBadge
            iconBadge={{ name: 'ios-notifications', color: '#34D5DA', type: 'ionicon' }}
            rightAction={this.onNotificationOrder}
            defaultHeader={false}
            number={badgeUnread}
            containerHeader={styles.containerHeader}
          />
          <ListOrderDraft />
          {this.actionButton()}
        </LinearGradient>
      </Container>
    );
  }
}

export default Home;
