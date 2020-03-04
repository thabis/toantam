import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Header, Text } from 'react-native-elements';
import { ActionIcon } from '@components/icon/icon';
import { IconBadge } from '@components/avatar/avatar';
import * as PropTypes from 'prop-types';
import style from './styles';


export default class HeaderComponent extends PureComponent {
  renderLeftComponent = () => {
    const {
      iconLeft = iconLeft || null,
      leftAction = leftAction || null,
      size = size || 20
    } = this.props;
    if (!leftAction && !iconLeft) return null;
    return (
      <ActionIcon
        icon={iconLeft}
        size={size}
        action={leftAction}
      />
    );
  }

  renderRightComponent = () => {
    const {
      rightAction = rightAction || null,
      iconRight = iconRight || null,
      showIconBadge = false,
      iconBadge = {},
      size = size || 20,
      number = 0,
    } = this.props;
    if (showIconBadge && iconBadge) {
      return (
        <IconBadge
          icon={iconBadge}
          size="medium"
          number={number}
          action={rightAction}
        />
      );
    }
    if (!rightAction && !iconRight) return null;
    return (
      <ActionIcon
        icon={iconRight}
        size={size}
        action={rightAction}
        propsStyles={{ width: 'auto' }}
      />
    );
  }

  renderCenterComponent = () => {
    const { title = title || '', numberClient = numberClient || 5 } = this.props;
    const subTitle = `Bạn cần gặp ${numberClient} khách hàng mỗi ngày`;
    return (
      <View>
        <Text style={style.headerText}>
          {title}
        </Text>
        <Text style={style.subHeaderText}>
          {subTitle}
        </Text>
      </View>
    );
  }

  render() {
    const {
      placement = placement || 'center',
      title = title || '',
      defaultHeader = true,
      containerHeader
    } = this.props;
    const defaultHead = defaultHeader ? { text: title, style: { color: '#fff', fontSize: 18 } } : this.renderCenterComponent;
    return (
      <Header
        placement={placement}
        leftComponent={this.renderLeftComponent}
        rightComponent={this.renderRightComponent}
        centerComponent={defaultHead}
        containerStyle={containerHeader || style.container}
      />
    );
  }
}

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
};
