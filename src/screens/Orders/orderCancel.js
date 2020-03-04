import React, { PureComponent } from 'react';
import HeaderComponent from '@components/header/header';
import Container from '@components/container';
import ListOrderCancel from '@containers/orderContainer/orderListCancelContainer';
import { Navigation } from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

class OrderListCancel extends PureComponent {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.gradientColor = ['#d53f62', '#d53f50', '#d53f3f'];
  }

  componentDidAppear() {
    const { getList } = this.props;
    getList({ status: -1 });
  }

  render() {
    return (
      <Container>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={this.gradientColor}
        >
          <HeaderComponent
            title="ĐƠN HÀNG BỊ HUỶ"
            containerHeader={styles.containerHeader}
          />
        </LinearGradient>
        <ListOrderCancel />
      </Container>
    );
  }
}

export default OrderListCancel;
