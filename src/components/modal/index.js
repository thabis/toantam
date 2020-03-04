import React, { PureComponent } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '@constants/color';

class LoadingBox extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subModal}>
          <ActivityIndicator
            animating
          />
        </View>
      </View>
    );
  }
}
export default LoadingBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  subModal: {
    backgroundColor: colors.white,
    height: 100,
    width: 100,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
