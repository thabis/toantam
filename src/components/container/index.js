import React, { PureComponent } from 'react';
import { View, ImageBackground, StatusBar } from 'react-native';
import styles from './styles';

class Container extends PureComponent {
  render() {
    const {
      stylesContainer = {},
      children,
      background = {},
      pointerEvents
    } = this.props;
    return (
      <View
        style={[styles.container, stylesContainer]}
        pointerEvents={pointerEvents}
      >
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        {background
          ? (
            <ImageBackground source={background} style={{ width: '100%', height: '100%' }}>
              {children}
            </ImageBackground>
          )
          : children
        }

      </View>
    );
  }
}


export default Container;
