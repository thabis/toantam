
import React, {
  Component,
} from 'react';
import {
  View, Text
} from 'react-native';
import { navigateScreen } from '@navigation/navigation';
import Container from '@components/container';
import HeaderComponent from '@components/header/header';
import { ListItem, Divider } from 'react-native-elements';
import { screenKeys } from '@constants/screenKeys';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { AvatarDefault } from '@src/components/avatar/avatar';
import BGMENU from '@assets/icon/bg-menu.png';
import styles from './styles';

class Settings extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    const { role } = user;
    this.role = role;
    this.style = {};
    this.gradientColor = [];
    this.list = [
      {
        id: 1,
        title: 'Đăng xuất',
        icon: 'power-settings-new',
        action: this.logout
      }
    ];
    if (role === 'saler') {
      this.list = [
        {
          id: 1,
          title: 'Đăng xuất',
          icon: 'power-settings-new',
          action: this.logout
        },
        {
          id: 2,
          title: 'Danh sách khách hàng',
          icon: 'view-list',
          action: this.navigateListCustomer
        },
      ];
    }
    this.getInitColor();
  }

  getInitColor = () => {
    this.gradientColor = ['#56d1d5', '#56c1d5', '#56b9d5'];
    this.style = styles.containerHeader;
  }

  logout = () => {
    const { requestLogout } = this.props;
    requestLogout();
  }

  navigateListCustomer = () => {
    navigateScreen(
      screenKeys.ListCustomer,
      { bottomTabs: false }
    );
  }

  render() {
    const { user } = this.props;
    return (
      <Container>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={this.gradientColor}
        >
          <HeaderComponent
            placement="center"
            title="CÀI ĐẶT"
            containerHeader={this.style}
          />
        </LinearGradient>
        <FastImage resizeMode={FastImage.resizeMode.cover} source={BGMENU} style={styles.background}>
          <View style={styles.avatarContainer}>
            <AvatarDefault
              overlayContainer={styles.overlayContainer}
              size="large"
              title={user.username}
              titleStyles={styles.titleStyles}
            />
            <View style={styles.bottomLabelContainer}>
              <Text style={styles.labelContainer}>
                Họ tên:
                {' '}
                {user.first_name}
                {' '}
                {user.last_name}
              </Text>
              <Text style={styles.labelContainer}>
                Email:
                {' '}
                {user.email}
              </Text>
              <Text style={styles.labelContainer}>
                Vai trò:
                {' '}
                {user.role}
              </Text>
            </View>
          </View>
        </FastImage>
        {
          this.list.map(item => (
            <View key={item.id}>
              <ListItem
                title={item.title}
                leftIcon={{ name: item.icon }}
                onPress={item.action}
              />
              <Divider />
            </View>
          ))
        }
      </Container>
    );
  }
}

export default Settings;
