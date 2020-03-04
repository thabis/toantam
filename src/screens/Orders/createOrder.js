/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { PureComponent } from 'react';
import {
  View, Alert, Keyboard, ScrollView, InteractionManager
} from 'react-native';
import Container from '@components/container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '@components/header/header';
import {
  pop, checkCurrentTab, popTo, changeBottomTab
} from '@navigation/navigation';
import {
  Input, Button, Text
} from 'react-native-elements';
import { Formik } from 'formik';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import { screenKeys } from '@src/constants/screenKeys';
import { formatDateTime } from '@src/utils/date';
import DetailOrder from './detailOrder';
import DetailOrder2 from './detailOrder2';
import DetailOrder3 from './detailOrder3';
import DetailOrder4 from './detailOrder4';
import styles from './styleCreate';

class CreateOrder extends PureComponent {
  constructor(props) {
    super(props);
    this.page1 = null;
    this.page2 = null;
    this.page3 = null;
    this.page4 = null;
    this.swiper = null;
    this.statusOrder = 0;
    this.initFields = {
      note: '',
    };
    this.state = {
      index: 0,
    };
    this.gradientColor = ['#56d1d5', '#56c1d5', '#56b9d5'];
    this.initOrder();
    const { orderReducer } = this.props;
    const { notes = [] } = orderReducer;
    this.noteReverse = notes.reverse();
  }

  initOrder = () => {
    const { fromNotification = false, orderId = '', getOrderDetail } = this.props;
    if (fromNotification && orderId !== '') {
      getOrderDetail({
        id: orderId,
        callback: this.getOrderDetailCallback
      });
    }
  }

  getOrderDetailCallback = (data) => {
    const {
      setOrderSuccess, setCustomer,
      fromNotification = false,
      orderId = ''
    } = this.props;
    // double check , to make sure another screen not set data.
    if (fromNotification && orderId !== '') {
      const { customer } = data;
      setOrderSuccess({ payload: data });
      setCustomer({ payload: customer });
    }
  }

  validateField = (values) => {
    const errors = {};
    if (values.note === '') {
      errors.note = 'Bạn chưa điền ghi chú';
    }
    return errors;
  }

  callback = (status, action) => {
    if (!status) {
      action.setSubmitting(false);
      return Alert.alert('Cập nhật đơn hàng lỗi!');
    }
    if (this.statusOrder === 1 || this.statusOrder === 0) {
      const currentTab = checkCurrentTab();
      popTo(currentTab);
      if (this.statusOrder === 1) {
        changeBottomTab(screenKeys.OrderList, 1);
      }
    } else {
      this.back();
    }
  }

  onSubmit = (values, action) => {
    Keyboard.dismiss();
    InteractionManager.runAfterInteractions(() => {
      const { status } = values;
      if (status === 1) {
        const checkOrder = this.validOrder(action);
        if (!checkOrder) {
          return false;
        }
      }
      action.setSubmitting(false);
      // Page 1
      const {
        delivery_address, date, payment_method, receiver_info
      } = this.page1;
      const { vat } = this.page1.state;
      const { customerReducer } = this.props;
      const { id } = customerReducer;
      if (!id) {
        Alert.alert('Xin chọn khách hàng!');
        action.setSubmitting(false);
        return false;
      }
      // Page 2
      const {
        id_paper, method, print_type_ids, number_print_face
      } = this.page2;
      const { valueCat } = this.page2.state;
      // Page 3
      const { rollingValue } = this.page3;
      const { listSelectOutSource, name } = this.page3.state;
      const listOurSourceSelect = listSelectOutSource.filter(e => e.check === true);
      const outsource_ids = [];
      listOurSourceSelect.map((e) => {
        outsource_ids.push(e.value);
      });
      outsource_ids.push(rollingValue);
      // Page 4
      const {
        template_number, quantity, unit_price, design_fee, shipping_fee, deposite
      } = this.page4.state;
      const { note } = values;

      const data = {
        name,
        note,
        customer_id: id,
        paper_id: id_paper,
        category_id: valueCat,
        payment_method,
        vat,
        template_number: template_number === '' ? 0 : template_number,
        quantity: quantity === '' ? 0 : quantity,
        unit_price: unit_price === '' ? 0 : unit_price,
        design_fee: design_fee === '' ? 0 : design_fee,
        shipping_fee: shipping_fee === '' ? 0 : shipping_fee,
        print_type_ids: [print_type_ids],
        number_print_face,
        outsource_ids,
        method,
        delivery_address,
        delivery_date: formatDateTime(date, 'YYYY-MM-DD'),
        deposite: deposite === '' ? 0 : deposite,
        receiver_info,
        status
      };

      const {
        createOrder,
        updateOrder,
        orderReducer,
        editOrder,
      } = this.props;
      const { id: idOrder, order_no, status: statusOrder } = orderReducer;
      if (editOrder && statusOrder !== -1) {
        data.id = idOrder;
        data.order_no = order_no;
        updateOrder({
          values,
          action,
          dataOrder: data,
          callback: (statusCallBack, actionForm) => this.callback(statusCallBack, actionForm)
        });
      } else {
        if (statusOrder === -1) {
          data.reference_order = idOrder;
        }
        createOrder({
          values,
          action,
          dataOrder: data,
          callback: (statusCallBack, actionForm) => this.callback(statusCallBack, actionForm)
        });
      }
    });
  }

  validOrder = (action) => {
    let errorPage1 = false;
    let errorPage2 = false;
    let errorPage3 = false;
    let errorPage4 = false;
    const { index } = this.state;
    if (this.page1) {
      const dataPage1 = this.page1;
      const { delivery_address, receiver_info } = dataPage1;
      if (!delivery_address || !receiver_info) {
        errorPage1 = true;
        Alert.alert('Điền thông tin giao hàng!');
        if (this.swiper && index !== 0) {
          this.swiper.scrollBy(0 - index);
        }
        if (errorPage1) {
          action.setSubmitting(false);
          return false;
        }
      }
    }
    if (this.page2) {
      const dataPage2 = this.page2;
      const {
        id_paper, method, print_type_ids, number_print_face
      } = dataPage2;
      const { valueCat } = dataPage2.state;
      if (!id_paper || !method || !print_type_ids || !number_print_face || !valueCat) {
        errorPage2 = true;
        Alert.alert('Điền trang chi tiết sản xuất (1)');
        if (this.swiper && index !== 1) {
          this.swiper.scrollBy(1 - index);
        }
        if (errorPage2) {
          action.setSubmitting(false);
          return false;
        }
      }
    }
    if (this.page3) {
      const dataPage3 = this.page3;
      const { rolling } = dataPage3.state;
      const { rollingValue, aliasName } = dataPage3;
      if ((rolling && !rollingValue) || !aliasName) {
        errorPage3 = true;
        Alert.alert('Điền trang chi tiết sản xuất(2)');
        if (this.swiper && index !== 2) {
          this.swiper.scrollBy(2 - index);
        }
        if (errorPage3) {
          action.setSubmitting(false);
          return false;
        }
      }
    }
    if (this.page4) {
      const dataPage4 = this.page4;
      const { template_number, quantity, unit_price } = dataPage4.state;
      if (!template_number || !quantity || !unit_price) {
        errorPage4 = true;
        Alert.alert('Điền thông tin thanh toán!');
        if (this.swiper && index !== 3) {
          this.swiper.scrollBy(3 - index);
        }
        if (errorPage4) {
          action.setSubmitting(false);
          return false;
        }
      }
    }
    return true;
  }

  onChangePage = (indexChange) => {
    const { index } = this.state;
    if (index !== indexChange) {
      this.setState({
        index: indexChange
      });
    }
  }

  back = () => {
    const {
      componentId, clearCustomer, clearOrder, fromDetailOrder = false
    } = this.props;
    if (!fromDetailOrder) {
      clearCustomer();
      clearOrder();
    }
    pop(componentId);
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
    console.log('_______DID CATCH____________');
    Alert.alert(error);
  }

  submitButtonLeft = async (propsForm) => {
    const {
      editOrder = false,
      orderReducer
    } = this.props;
    const { status = 0 } = orderReducer;
    this.statusOrder = status;
    if (editOrder && status !== 0) {
      // Cancel Order if Order is processing
      this.statusOrder = -1;
    }
    await propsForm.setFieldValue('status', this.statusOrder);
    propsForm.handleSubmit();
  }

  submitButtonRight = async (propsForm) => {
    const {
      // editOrder = false,
      orderReducer
    } = this.props;
    const { status = 0 } = orderReducer;
    this.statusOrder = status;
    if (status === 0 || status === -1) {
      // Update Order if Order is processing
      this.statusOrder = 1;
    }
    await propsForm.setFieldValue('status', this.statusOrder);
    propsForm.handleSubmit();
  }

  render() {
    const {
      configReducer,
      customerReducer,
      directOrder = false,
      editOrder = false,
      orderReducer,
    } = this.props;
    const { notes = [], status = 0 } = orderReducer;
    const {
      listOutSourceDiff,
      listOutSourceRolling,
      listPaper,
      listCategoryParent,
      listCategory,
      listColorPrint
    } = configReducer;
    const { index } = this.state;
    const titleButtonLeft = editOrder && status !== 0 ? 'Huỷ' : 'Lưu trữ';
    const titleButtonRight = editOrder && status !== 0 ? 'Cập nhật' : 'Tạo đơn hàng';
    const titleButtonRenew = status === -1 ? 'Tạo đơn hàng mới' : '';

    return (
      <Container>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={this.gradientColor}
        >
          <HeaderComponent
            iconLeft={directOrder || editOrder ? 'arrow-left-circle' : ''}
            leftAction={directOrder || editOrder ? this.back : null}
            title="THÔNG TIN ĐƠN HÀNG"
            defaultHeader
            containerHeader={styles.containerHeader}
            size={25}
          />
        </LinearGradient>
        <KeyboardAwareScrollView
          innerRef={(ref) => { this.keyboard = ref; }}
          scrollEnabled
          // bounces={false}
          extraScrollHeight={100}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          // keyboardDismissMode="on-drag"
          viewIsInsideTabBar
          enableAutomaticScroll
        >
          <Swiper
            style={styles.halfViewTop}
            index={index}
            loop={false}
            ref={(node) => { this.swiper = node; }}
            onIndexChanged={this.onChangePage}
          >
            <DetailOrder
              ref={(ref) => { this.page1 = ref; }}
              customerReducer={customerReducer}
              directOrder={directOrder}
              editOrder={editOrder}
              orderReducer={orderReducer}
              status={status}
            />
            <DetailOrder2
              ref={(ref) => { this.page2 = ref; }}
              listCategory={listCategory}
              listCategoryParent={listCategoryParent}
              listPaper={listPaper}
              listColorPrint={listColorPrint}
              editOrder={editOrder}
              orderReducer={orderReducer}
            />
            <DetailOrder3
              ref={(ref) => { this.page3 = ref; }}
              listOutSourceDiff={listOutSourceDiff}
              listOutSourceRolling={listOutSourceRolling}
              editOrder={editOrder}
              orderReducer={orderReducer}
              customerName={customerReducer.name}
            />
            <DetailOrder4
              ref={(ref) => { this.page4 = ref; }}
              getParam={this.getPage4}
              editOrder={editOrder}
              orderReducer={orderReducer}
            />
          </Swiper>
          {editOrder && this.noteReverse.length > 0
            && (
              <View style={styles.noteContainer}>
                <Text style={styles.titleSection}>Danh sách ghi chú</Text>
                <ScrollView>
                  {
                    this.noteReverse.map((value, key) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <View key={key} style={styles.noteRow}>
                        <Text style={styles.noteTime}>{moment.parseZone(value.created_time).utcOffset(7).format('DD-MM-YYYY h:mm a')}</Text>
                        <Text style={styles.noteDescript}>{value.note}</Text>
                      </View>
                    ))
                  }
                </ScrollView>
              </View>
            )
          }
          {status < 8
            && (
              <Formik
                initialValues={this.initFields}
                onSubmit={this.onSubmit}
                validate={this.validateField}
              >
                {
                  (propsForm => (
                    <View style={styles.noteWriteContainer}>
                      <View>
                        <Input
                          containerStyle={styles.containerInputNote}
                          underlineColorAndroid="transparent"
                          placeholder="Ghi chú"
                          placeholderTextColor="grey"
                          numberOfLines={5}
                          multiline
                          inputStyle={styles.styleNote}
                          inputContainerStyle={styles.containerInputStyles}
                          onChangeText={propsForm.handleChange('note')}
                          errorStyle={styles.errorStyle}
                          errorMessage={propsForm.errors.note ? propsForm.errors.note : ''}
                        />
                      </View>
                      {status !== -1
                        ? (
                          <View style={styles.containerButton}>
                            <Button
                              type="outline"
                              loading={!!propsForm.isSubmitting}
                              buttonStyle={styles.btnArchive}
                              titleStyle={styles.archiveTitle}
                              title={titleButtonLeft}
                              onPress={() => this.submitButtonLeft(propsForm)}
                              disabled={!propsForm.isValidating && propsForm.isSubmitting}
                            />
                            <Button
                              title={titleButtonRight}
                              type="outline"
                              titleStyle={styles.btnTitle}
                              buttonStyle={styles.btnStyle}
                              loading={!!propsForm.isSubmitting}
                              onPress={() => this.submitButtonRight(propsForm)}
                              disabled={!propsForm.isValidating && propsForm.isSubmitting}
                            />

                          </View>
                        )
                        : (
                          <Button
                            title={titleButtonRenew}
                            type="outline"
                            titleStyle={styles.btnTitle}
                            buttonStyle={styles.btnStyle}
                            loading={!!propsForm.isSubmitting}
                            onPress={() => this.submitButtonRight(propsForm)}
                            disabled={!propsForm.isValidating && propsForm.isSubmitting}
                          />
                        )
                      }
                    </View>
                  )
                  )}
              </Formik>
            )
          }
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

export default CreateOrder;
