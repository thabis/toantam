import firebase from 'react-native-firebase';
import { navigateScreen, checkCurrentScreen } from '@navigation/navigation';
import { Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { screenKeys } from '@constants/screenKeys';
import color from '@constants/color';

export default class NotificationService {
  constructor(props) {
    this.propsControl = props || null;
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    const { userReducer } = this.propsControl;
    if (userReducer) {
      let device_token = userReducer.device_token || undefined;
      if (!device_token) {
        device_token = await firebase.messaging().getToken();
        if (device_token) {
          this.propsControl.setFcmToken({ device_token });
        }
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  implementFunction = (data) => {
    const { resetClickInApp } = this.propsControl;
    resetClickInApp();
    this.navigateScreen();
  }

  navigateScreen = () => {
    const { user, changeTabNotification } = this.propsControl;
    const isDesigner = !!(user && user.role && user.role === 'designer');
    if (isDesigner && typeof changeTabNotification === 'function') {
      changeTabNotification();
      return;
    }
    const currentScreen = checkCurrentScreen();
    if (currentScreen !== screenKeys.Notification) {
      navigateScreen(screenKeys.Notification, { bottomTabs: false });
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body, data } = notification;
      const { clickedInApp } = this.propsControl;
      clickedInApp();
      showMessage({
        message: title,
        description: body,
        type: 'info',
        backgroundColor: color.mainAppColorDark,
        color: color.white,
        onPress: () => { this.implementFunction(data); }
      });
    });

    /*
    * If your app is in background,
    you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications()
      .onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.navigateScreen();
        // this.showAlert(title, body);
      });

    /*
    * If your app is closed,
    you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      setTimeout(() => {
        this.navigateScreen();
      }, 200);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      // process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert = (title, body) => {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  setBageApp = number => firebase.notifications().setBadge(number)

  static resetBageApp = () => firebase.notifications().setBadge(0);
}
