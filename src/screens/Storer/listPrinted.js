
import React, { PureComponent } from 'react';
import HeaderComponent from '@components/header/header';
import Container from '@components/container';
import ListOrderPrinted from '@containers/orderContainer/orderListPrintedContainer';
import { Navigation } from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

class ListPrinted extends PureComponent {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.status = 7;
    this.gradientColor = ['#1286ac', '#239bc2', '#6fe1e2', '#9feaeb'];
  }

  componentDidAppear() {
    const { getList } = this.props;
    getList({ status: this.status, order_by: 'delivery_date', sort_direction: 'asc' });
  }

  render() {
    return (
      <Container>
        <LinearGradient
          colors={this.gradientColor}
          style={{ flex: 1 }}
        >
          <HeaderComponent
            title="DANH SÁCH ĐÃ IN ẤN"
            containerHeader={styles.containerHeader}
          />
          <ListOrderPrinted status={this.status} />
        </LinearGradient>
      </Container>
    );
  }
}

export default ListPrinted;
