/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import FormLoginContainer from '@containers/formLoginContainer/formLoginContainer';
import Container from '@components/container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LOGO from '@assets/logo/main-light-logo.png';
import BACKGROUND from '@assets/icon/background.jpg';
import NotificationService from '@services/firebase/notificationService';
import styles from './styles';

class SignUp extends PureComponent {
  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.notiService = new NotificationService(this.props);
  }

  async UNSAFE_componentWillMount() {
    await this.notiService.checkPermission();
  }

  componentWillUnmount() {
    // Not mandatory
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  // componentDidAppear() {
  //   showBadge(screenKeys.SignUp, '99+');
  // }

  render() {
    return (
      <Container background={BACKGROUND}>
        <KeyboardAwareScrollView
          extraScrollHeight={40}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll
        >
          <View style={styles.halfViewTop}>
            <Image resizeMode="contain" style={styles.imageLogo} source={LOGO} />
          </View>
          <FormLoginContainer />
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

export default SignUp;
