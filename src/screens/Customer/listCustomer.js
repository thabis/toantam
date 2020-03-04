/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
  SearchBar, CheckBox, Text, Divider
} from 'react-native-elements';
import { navigateScreen, pop, checkCurrentTab } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import EmptyComponent from '@components/empty';
import EMPTYCOMPANY from '@assets/icon/company.png';
import Container from '@components/container';
import { ActionIcon } from '@components/icon/icon';
import HeaderComponent from '@components/header/header';
import { histlopTouch } from '@utils/common';
import styles from './styles';
import color from '../../constants/color';

class ListCustomer extends PureComponent {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      search: ''
    };
    this.currentTab = checkCurrentTab();
  }

  componentDidMount() {
    const { getListCustomer, listCity, loadCity } = this.props;
    getListCustomer();
    if (listCity.length < 1) {
      loadCity();
    }
  }

  componentWillUnmount() {
  }

  back = () => {
    const { componentId } = this.props;
    pop(componentId);
  }

  renderEmtpy = () => (
    <EmptyComponent
      imageEmpty={EMPTYCOMPANY}
      title="Bạn chưa có khách hàng nào!"
    />
  )

  selectCustomer = (item) => {
    if (this.currentTab === screenKeys.Settings) {
      this.updateCustomer(item);
    } else {
      const { setCustomer } = this.props;
      setCustomer({ payload: item });
      this.back();
    }
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    const { name = '', phone = '' } = item;
    return (
      <View>
        <View style={styles.containerRows}>
          <CheckBox
            center
            uncheckedColor={color.mainAppColor}
            containerStyle={styles.shadowCheckbox}
            onPress={() => this.selectCustomer(item)}
          />
          <View style={styles.containerItem}>
            <TouchableOpacity hitSlop={histlopTouch} style={{ width: '85%' }} onPress={() => this.selectCustomer(item)}>
              <Text>
                {name}
                {' '}
                -
                {' '}
                <Text style={{ fontStyle: 'italic', fontSize: 11 }}>{phone}</Text>
              </Text>
            </TouchableOpacity>
            <ActionIcon
              action={() => this.updateCustomer(item)}
              size={16}
              propsStyles={styles.editButton}
              icon="arrow-right"
            />
          </View>
        </View>
        <Divider style={styles.divider} />
      </View>
    );
  }

  updateCustomer = (customer) => {
    Keyboard.dismiss();
    setTimeout(() => {
      navigateScreen(screenKeys.CreateCustomer,
        {
          bottomTabs: false,
          passProps: { data: customer }
        });
    }, 200);
  }

  updateSearch = (search) => {
    this.setState({ search });
  }

  filterCustomer = () => {
    const { listCustomer } = this.props;
    const { search } = this.state;
    if (search !== '') {
      return listCustomer.filter((c) => {
        const name = c.name.toLowerCase();
        const searchName = search.toLowerCase();
        if (name.includes(searchName)) {
          return c;
        }
        const phone = c.phone.toLowerCase();
        if (phone.includes(searchName)) {
          return c;
        }
      });
    }
    return listCustomer;
  }

  renderListCustomer = () => {
    const listCustomer = this.filterCustomer();
    return (
      <FlatList
        data={listCustomer}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }

  render() {
    const { listCustomer } = this.props;
    return (
      <Container>
        <HeaderComponent
          title="Danh Sách Khách Hàng"
          iconLeft="arrow-left-circle"
          leftAction={this.back}
          defaultHeader
          size={25}
        />
        <SearchBar
          value={this.state.search}
          placeholder="Tìm khách hàng.."
          lightTheme
          round
          containerStyle={{ backgroundColor: 'transparent' }}
          inputContainerStyle={styles.inputCtnSearch}
          inputStyle={styles.inputSearch}
          onChangeText={this.updateSearch}
          placeholderTextColor={color.mainAppColor}
        />
        {listCustomer.length < 1 ? this.renderEmtpy() : this.renderListCustomer()}
      </Container>
    );
  }
}

export default ListCustomer;
