import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import * as PropTypes from 'prop-types';
import styles from './styles';


const ActionIcon = (props) => {
  const {
    icon = icon || null,
    size = size || 25,
    action = action || null,
    propsStyles
  } = props;
  return (
    <Icon
      name={icon}
      size={size}
      onPress={action}
      style={[styles.iconDefault, propsStyles]}
    />
  );
};

const IconButton = (props) => {
  const {
    icon = icon || null,
    size = size || 25,
    propsStyles,
  } = props;
  return (
    <Icon
      name={icon}
      size={size}
      style={[styles.iconBtnDefault, propsStyles]}
    />
  );
};

ActionIcon.propsType = {
  action: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired
};
IconButton.propsType = {
  icon: PropTypes.string.isRequired
};

export { ActionIcon, IconButton };
