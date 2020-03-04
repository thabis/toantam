/* eslint-disable react/no-array-index-key */
import React from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { getWidthAndHeight } from '@utils/dimensions';
import * as PropTypes from 'prop-types';
import styles from './styles';

const { height } = getWidthAndHeight();

const ButtonActionCom = (props) => {
  const {
    actionsList,
    size = 56,
    buttonMainColor = '#16BCC0',
    buttonChildColor = '#16BCC0',
  } = props;
  return (
    <ActionButton
      buttonColor={buttonMainColor}
      offsetY={height * 0.8}
      bgOpacity={0.7}
      size={size}
      style={{ position: 'absolute' }}
      bgColor="#000"
    >
      {actionsList.map((value, index) => {
        const { title, action, iconName } = value;
        return (
          <ActionButton.Item
            key={index.toString()}
            buttonColor={buttonChildColor}
            title={title}
            onPress={action}
          >
            <Icon
              name={iconName}
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
        );
      })
      }
    </ActionButton>
  );
};

ButtonActionCom.propsType = {
  actionsList: PropTypes.array.isRequired,
};

export { ButtonActionCom };
