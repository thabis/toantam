import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

export default class LoadModal extends PureComponent {
  render() {
    const { childrenContent } = this.props;
    return (
      <View style={styles.container}>
        {childrenContent && childrenContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
});
