import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';

class NotificationInApp extends PureComponent {
  render() {
    const { onClickNotification } = this.props;
    const event = !onClickNotification ? 'none' : 'auto';
    // if (!onClickNotification) return null;
    return (
      <View pointerEvents={event} style={styles.container}>
        <FlashMessage
          position="top"
          animationDuration={250}
          icon="info"
          hideOnPress={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
    width: '100%',
  },
});

export default NotificationInApp;
