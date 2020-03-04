
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import HeaderComponent from '@components/header/header';
import Container from '@components/container';
import { View, Text } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import ListOrderSale from '@containers/orderContainer/orderListSaleContainer';
import ListOrderProcessing from '@containers/orderContainer/orderListProcessingContainer';
import ListOrderConfirm from '@containers/orderContainer/orderListConfirmContainer';
import { Navigation } from 'react-native-navigation';
import { showModal, hideModal, navigateScreen } from '@navigation/navigation';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import { Input, Button } from 'react-native-elements';
import { ActionIcon } from '@components/icon/icon';
import color from '@constants/color';
import { screenKeys } from '@constants/screenKeys';
import styles from './styles';

class OrderList extends PureComponent {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.gradientColor = ['#f59267', '#f06363'];
    this.actionRef = null;
  }

  componentDidAppear() {
    const { getList } = this.props;
    getList({ status: 1 });
  }

  renderHeaderModal = () => (
    <LinearGradient colors={this.gradientColor} style={styles.containerHeaderModal}>
      <Text style={styles.titleHeaderModal}>Tìm kiếm đơn hàng</Text>
      <ActionIcon
        icon="close"
        action={() => { hideModal(screenKeys.LoadModal); }}
        propsStyles={{ textAlign: 'right' }}
      />
    </LinearGradient>
  )

  callback = (status) => {
    hideModal(screenKeys.LoadModal);
    if (status) {
      this.actionRef.setSubmitting(false);
      navigateScreen(screenKeys.SearchOrder, { bottomTabs: false });
    }
  }

  onSearch = (values, action) => {
    const { searchOrder } = this.props;
    this.actionRef = action;
    searchOrder({
      values,
      callback: status => this.callback(status)
    });
  }

  validateField = (values) => {
    const errors = {};
    if (values.search === '') {
      errors.search = 'Bạn chưa điền ghi chú';
    }
    return errors;
  }

  renderFormModal = () => (
    <Formik
      onSubmit={this.onSearch}
      initialValues={{
        search: ''
      }}
      validate={this.validateField}
    >
      {
        (propsForm => (
          <View style={styles.formContainer}>
            <Input
              containerStyle={styles.containerInputSearch}
              underlineColorAndroid="transparent"
              placeholder="Tìm kiếm đơn hàng"
              placeholderTextColor="grey"
              inputContainerStyle={styles.containerInputStyles}
              onChangeText={propsForm.handleChange('search')}
              errorStyle={styles.errorStyle}
              errorMessage={propsForm.errors.search ? propsForm.errors.search : ''}
            />
            <Text style={{ paddingVertical: 10, fontSize: 12, fontStyle: 'italic' }}>
              Gợi ý: Tìm theo họ tên, số điện thoại, mã đơn hàng...
            </Text>
            <Button
              title="Tìm"
              type="outline"
              containerStyle={{ width: '50%' }}
              titleStyle={{ color: 'white' }}
              buttonStyle={{ borderWidth: 0 }}
              ViewComponent={LinearGradient}
              linearGradientProps={{ colors: this.gradientColor }}
              loading={!!propsForm.isSubmitting}
              onPress={propsForm.handleSubmit}
              disabled={!propsForm.isValidating && propsForm.isSubmitting}
            />
          </View>
        )
        )}
    </Formik>
  )

  searchOrder = () => {
    showModal(screenKeys.LoadModal, null, {
      childrenContent: () => (
        <View style={styles.containerModal}>
          {this.renderHeaderModal()}
          {this.renderFormModal()}
        </View>
      ),
    });
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
            title="DANH SÁCH ĐƠN HÀNG"
            containerHeader={styles.containerHeader}
            iconRight="magnifier"
            rightAction={this.searchOrder}
          />
        </LinearGradient>
        <ScrollableTabView
          initialPage={0}
          scrollWithoutAnimation={false}
          tabBarUnderlineStyle={{ backgroundColor: '#f59267' }}
          tabBarInactiveTextColor={color.textUnread}
          tabBarActiveTextColor="#f59267"
          renderTabBar={() => (
            <DefaultTabBar />
          )}
        >
          <View
            tabLabel="ĐH mới"
            style={{ justifyContent: 'center' }}
          >
            <ListOrderSale />
          </View>
          <View
            tabLabel="ĐH chờ phản hồi"
            style={{ justifyContent: 'center' }}
          >
            <ListOrderConfirm />
          </View>
          <View
            tabLabel="ĐH xử lý"
            style={{ justifyContent: 'center' }}
          >
            <ListOrderProcessing />
          </View>

        </ScrollableTabView>
      </Container>
    );
  }
}

export default OrderList;
