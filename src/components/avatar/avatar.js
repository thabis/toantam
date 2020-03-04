import React from 'react';
import * as PropTypes from 'prop-types';
import { View } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import styles from './styles';

const IconBadge = (props) => {
  const {
    icon,
    size,
    overlayStyle,
    number,
    badgeStyle,
    action
  } = props;

  return (
    <View>
      <Avatar
        rounded
        icon={icon}
        size={size}
        overlayContainerStyle={[styles.overlayContainerStyle, overlayStyle]}
        activeOpacity={0.7}
        onPress={action}
      />
      { number > 0
        && (
        <Badge
          value={number}
          status="error"
          containerStyle={[styles.badgeIconStyle, badgeStyle]}
        />
        )
      }
    </View>
  );
};

const AvatarDefault = (props) => {
  const {
    title,
    size,
    overlayContainer,
    titleStyles,
    source = '',
  } = props;

  return (
    source !== '' ? (
      <Avatar
        rounded
        source={{ uri: source }}
        size={size}
      />
    )
      : (
        <Avatar
          overlayContainerStyle={[styles.overlayContainer, overlayContainer]}
          rounded
          size={size}
          title={title}
          titleStyle={[styles.titleStyles, titleStyles]}
          activeOpacity={1}
        />
      )
  );
};
IconBadge.propTypes = {
  action: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired
};
AvatarDefault.propTypes = {
  title: PropTypes.string.isRequired
};
export { IconBadge, AvatarDefault };
