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
import { navigateScreen, pop } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import EmptyComponent from '@components/empty';
import EMPTYCOMPANY from '@assets/icon/company.png';
import Container from '@components/container';
import { ActionIcon } from '@components/icon/icon';
import HeaderComponent from '@components/header/header';
import { histlopTouch } from '@utils/common';
import styles from './styles';
import color from '../../constants/color';


class ListCompany extends PureComponent {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    const { getListCompany } = this.props;
    getListCompany();
  }

  componentWillUnmount() {
  }

  createCompany = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      navigateScreen(screenKeys.CreateCompany, { bottomTabs: false });
    }, 200);
  }

  back = () => {
    const { componentId } = this.props;
    pop(componentId);
  }

  renderEmtpy = () => (
    <EmptyComponent
      imageEmpty={EMPTYCOMPANY}
      title="Bạn chưa có công ty nào!"
    />
  )

  selectCompany = (item) => {
    const { setCompany } = this.props;
    setCompany(item);
    this.back();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    const { company_name = '' } = item;
    return (
      <View>
        <View style={styles.containerRows}>
          <CheckBox
            center
            uncheckedColor={color.mainAppColor}
            containerStyle={styles.shadowCheckbox}
            onPress={() => this.selectCompany(item)}
          />
          <View style={styles.containerItem}>
            <TouchableOpacity hitSlop={histlopTouch} style={{ width: '85%' }} onPress={() => this.selectCompany(item)}>
              <Text>
                {company_name}
                {/* {' '}
              -
              {' '}
              <Text style={{ fontStyle: 'italic', fontSize: 11 }}>{company_code}</Text> */}
              </Text>
            </TouchableOpacity>
            <ActionIcon
              action={() => this.updateCompany(item)}
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

  updateCompany = (company) => {
    Keyboard.dismiss();
    setTimeout(() => {
      navigateScreen(screenKeys.CreateCompany, { bottomTabs: false, passProps: { data: company } });
    }, 200);
  }

  updateSearch = (search) => {
    this.setState({ search });
  }

  filterCompany = () => {
    const { listCompany } = this.props;
    const { search } = this.state;
    if (search !== '') {
      return listCompany.filter((c) => {
        const name = c.company_name.toLowerCase();
        const searchName = search.toLowerCase();
        if (name.includes(searchName)) {
          return c;
        }
        if (c.company_code) {
          const code_name = c.company_code.toLowerCase();
          if (code_name.includes(searchName)) {
            return c;
          }
        }
        return false;
      });
    }
    return listCompany;
  }

  renderListCompany = () => {
    const listFilter = this.filterCompany();
    return (
      <FlatList
        data={listFilter}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }

  render() {
    const { listCompany } = this.props;
    return (
      <Container>
        <HeaderComponent
          title="DANH SÁCH CÔNG TY"
          iconLeft="arrow-left-circle"
          leftAction={this.back}
          iconRight="plus"
          rightAction={this.createCompany}
          defaultHeader
          size={25}
        />
        <SearchBar
          value={this.state.search}
          placeholder="Tìm công ty.."
          lightTheme
          round
          containerStyle={{ backgroundColor: 'transparent' }}
          inputContainerStyle={styles.inputCtnSearch}
          inputStyle={styles.inputSearch}
          onChangeText={this.updateSearch}
          placeholderTextColor={color.mainAppColor}
        />
        {listCompany.length < 1 ? this.renderEmtpy() : this.renderListCompany()}
      </Container>
    );
  }
}

export default ListCompany;
