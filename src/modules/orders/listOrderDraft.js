import React, { Component } from 'react';
import {
  FlatList,
  RefreshControl,
} from 'react-native';
import EmptyComponent from '@components/empty';
import EMPTYCUSTOMER from '@assets/icon/empty-customer.png';
import { SearchBar } from 'react-native-elements';
import { navigateScreen } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import Container from '@components/container';
import color from '@constants/color';
import styles from './styles';
import ItemOrderDraft from './itemOrderDraft';

class ListOrderDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pullRefeshing: false,
    };
  }

  renderEmtpy = () => (
    <EmptyComponent
      imageEmpty={EMPTYCUSTOMER}
      title="Bạn chưa có khách hàng nào!"
    />
  )

  callback = (status) => {
    const { pullRefeshing } = this.state;
    if (status && pullRefeshing) {
      this.setState({ pullRefeshing: false });
    }
  }

  navigateDetailOrder = (item) => {
    const { setOrderSuccess, setCustomer } = this.props;
    const { customer } = item;
    setCustomer({ payload: customer });
    setOrderSuccess({ payload: item });
    const passProps = {
      editOrder: true
    };
    navigateScreen(screenKeys.CreateOrder, { bottomTabs: false, passProps });
  }

  refeshPage = () => {
    const { getList } = this.props;
    const { pullRefeshing } = this.state;
    if (!pullRefeshing) {
      this.setState({ pullRefeshing: true }, () => {
        getList({
          status: 0,
          order_by: 'updated_time',
          callback: status => this.callback(status)
        });
      });
    }
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <ItemOrderDraft
      item={item}
      index={index}
      navigateDetailOrder={this.navigateDetailOrder}
    />
  )


  filterOrder = () => {
    const { listDraft } = this.props;
    const { search } = this.state;
    if (search !== '') {
      return listDraft.filter((item) => {
        const { customer } = item;
        const name = customer.name.toLowerCase();
        const phone = customer.phone.toLowerCase();
        const searchName = search.toLowerCase();
        if (name.includes(searchName) || phone.includes(searchName)) {
          return item;
        }
        return false;
      });
    }
    return listDraft;
  }

  renderListOrder = () => {
    const { pullRefeshing } = this.state;
    const listDraftFilter = this.filterOrder();
    return (
      <FlatList
        data={listDraftFilter}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={this.renderEmtpy}
        refreshControl={(
          <RefreshControl
            refreshing={pullRefeshing}
            onRefresh={this.refeshPage}
          />
        )}
      />
    );
  }

  updateSearch = (search) => {
    this.setState({
      search
    });
  }

  render() {
    const { search } = this.state;
    return (
      <Container>
        <SearchBar
          value={search}
          placeholder="Nhập tên, số điện thoại..."
          lightTheme
          round
          containerStyle={{ backgroundColor: 'transparent' }}
          inputContainerStyle={styles.inputCtnSearch}
          inputStyle={styles.inputSearch}
          onChangeText={this.updateSearch}
          placeholderTextColor={color.mainAppColor}
        />
        {this.renderListOrder()}
      </Container>
    );
  }
}
export default ListOrderDraft;
