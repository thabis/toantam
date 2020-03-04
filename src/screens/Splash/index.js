import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import loading from '@assets/animate/loading.json';
import { signUpRootScreen } from '@navigation/navigation';
import LOGO from '@assets/logo/main-logo.png';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.gradientColor = ['#239bc2', '#39d7d9'];
  }

  componentDidMount() {
    this.animation.play();
    const { userReducer, requestValidToken } = this.props;
    const { token } = userReducer;
    if (token) {
      requestValidToken({ token });
    } else {
      signUpRootScreen();
    }
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={this.gradientColor}
        style={styles.container}
      >
        <View>
          <FastImage resizeMode="contain" style={styles.imageLogo} source={LOGO} />
        </View>
        <View>
          <LottieView
            ref={(animation) => {
              this.animation = animation;
            }}
            style={styles.animateSplash}
            source={loading}
            loop={false}
            speed={1}
            resizeMode="cover"
          />
        </View>
      </LinearGradient>
    );
  }
}
export default Splash;
