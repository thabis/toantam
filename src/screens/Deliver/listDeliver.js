
import React, { PureComponent } from 'react';
import HeaderComponent from '@components/header/header';
import Container from '@components/container';
import ListOrderDeliver from '@containers/orderContainer/orderListDeliveringContainer';
import { Navigation } from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

class ListDeliver extends PureComponent {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.status = 9;
    this.gradientColor = ['#1286ac', '#239bc2', '#6fe1e2', '#9feaeb'];
  }

  componentDidAppear() {
    const { getList } = this.props;
    getList({ status: this.status });
  }

  render() {
    return (
      <Container>
        <LinearGradient
          colors={this.gradientColor}
          style={{ flex: 1 }}
        >
          <HeaderComponent
            title="DANH SÁCH VẬN CHUYỂN"
            containerHeader={styles.containerHeader}
          />
          <ListOrderDeliver status={this.status} />
        </LinearGradient>
      </Container>
    );
  }
}

export default ListDeliver;
