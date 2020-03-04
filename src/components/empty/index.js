import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

class Empty extends PureComponent {
  render() {
    const {
      emptyStyle = {},
      imageEmpty = {},
      title = {},
      titleStyle = {}
    } = this.props;
    return (
      <View
        pointerEvents="box-none"
        style={[styles.emptyStyles, emptyStyle]}
      >
        {imageEmpty
          && (
            <FastImage source={imageEmpty} resizeMode="contain" style={styles.images} />
          )
        }
        {title
          && (
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          )
        }
      </View>
    );
  }
}


export default Empty;
