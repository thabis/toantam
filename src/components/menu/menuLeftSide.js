import React, { PureComponent } from 'react';
import { ListItem } from 'react-native-elements';
import style from './styles';

export default class MenuLeftSide extends PureComponent {
  renderListMenu = (item, key) => {
    const {
      iconName, stylesIcon, label, actions
    } = item;
    return (
      <ListItem
        key={key}
        title={label}
        leftIcon={{ name: iconName }}
        onPress={actions}
        titleStyle={[style.iconLeft, stylesIcon]}
      />
    );
  }

  render() {
    const { listMenu } = this.props;
    return (
      listMenu.map((item, key) => this.renderListMenu(item, key))
    );
  }
}
