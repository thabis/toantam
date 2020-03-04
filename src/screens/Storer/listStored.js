
import React, { PureComponent } from 'react';
import HeaderComponent from '@components/header/header';
import Container from '@components/container';
import ListOrderStored from '@containers/orderContainer/orderListStoredContainer';
import { Navigation } from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

class ListStored extends PureComponent {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.status = 8;
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
            title="DANH SÁCH LƯU KHO"
            containerHeader={styles.containerHeader}
          />
          <ListOrderStored status={this.status} />
        </LinearGradient>
      </Container>
    );
  }
}

export default ListStored;
