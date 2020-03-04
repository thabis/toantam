import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import MenuLeftSide from '@components/menu/menuLeftSide';
import { navigateScreen } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import { AvatarDefault } from '@components/avatar/avatar';
import BGMENU from '@assets/icon/bg-menu.png';
import FastImage from 'react-native-fast-image';
import styles from './styles';

class LeftMenu extends PureComponent {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.listMenu = [
      {
        iconName: 'person-outline',
        stylesIcon: styles.iconLeft,
        stylesLabel: styles.label,
        label: 'Tài khoản',
        actions: () => this.onClickPush(),
      },
      {
        iconName: 'power-settings-new',
        stylesIcon: styles.iconLeft,
        stylesLabel: styles.label,
        label: 'Thoát',
        actions: () => this.onClickPush()
      }
    ];
    const { userReducer } = this.props;
    this.email = userReducer.email ? userReducer.email : '';
  }

  onClickPush = () => {
    const anotherProps = {
      options: {
        topBar: {
          title: {
            text: 'Login'
          },
        },
        sideMenu: {
          left: {
            visible: false
          }
        }
      }
    };
    navigateScreen(screenKeys.SignUp, anotherProps);
  }

  render() {
    return (
      <FastImage resizeMode={FastImage.resizeMode.cover} source={BGMENU} style={styles.background}>
        <View style={styles.avatarContainer}>
          <AvatarDefault
            overlayContainer={styles.overlayContainer}
            size="large"
            title="ND"
            titleStyles={styles.titleStyles}
          />
          <View style={styles.bottomLabelContainer}>
            <Text style={styles.labelContainer}>{this.email}</Text>
          </View>
        </View>
        <MenuLeftSide listMenu={this.listMenu} />
      </FastImage>
    );
  }
}

export default LeftMenu;
