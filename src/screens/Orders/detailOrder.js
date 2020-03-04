import React, { Component } from 'react';
import { View, Switch, TouchableOpacity } from 'react-native';
import Container from '@components/container';
import {
  Text, Divider, Input, CheckBox
} from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ActionIcon } from '@components/icon/icon';
import { navigateScreen } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import { formatDateTime } from '@src/utils/date';
import color from '@constants/color';
import styles from './styleCreate';

class detailOrder extends Component {
  constructor(props) {
    super(props);
    const {
      customerReducer,
      orderReducer,
      editOrder, status
    } = this.props;
    const {
      address,
      district = '',
      ward = '',
      city = '',
      name = 'không xác nhận'
    } = customerReducer;
    const {
      vat,
      delivery_address,
      delivery_date,
      receiver_info,
      payment_method
    } = orderReducer;
    this.delivery_address = editOrder && delivery_address !== '' ? delivery_address : `${address}, ${district}, ${ward}, ${city}`;
    this.tempAddress = this.delivery_address;
    this.payment_method = editOrder ? payment_method : 'Tiền mặt';
    this.delivery_date = editOrder && delivery_date ? formatDateTime(delivery_date) : formatDateTime(new Date());
    this.date = editOrder && delivery_date ? new Date(delivery_date) : new Date();
    this.receiver_info = editOrder ? receiver_info : name;
    this.titlePage = status !== 0 ? 'Thông tin giao hàng' : 'Thông tin khách hàng';
    this.state = {
      vat: editOrder ? vat : false,
      editAddress: false,
      directMethod: !(editOrder && payment_method !== 'Tiền mặt'),
      openDatePicker: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { customerReducer } = this.props;
    const {
      vat,
      editAddress,
      directMethod,
      openDatePicker
    } = this.state;
    const nextUser = nextProps.customerReducer;
    if (customerReducer.id !== nextUser.id) {
      return true;
    }
    if (vat !== nextState.vat
      || editAddress !== nextState.editAddress
      || directMethod !== nextState.directMethod
      || openDatePicker !== nextState.openDatePicker) {
      return true;
    }

    return false;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { customerReducer } = this.props;
    const nextUser = nextProps.customerReducer;
    if (customerReducer.id !== nextUser.id) {
      const {
        address,
        district = '',
        ward = '',
        city = '',
        name = '',
      } = nextUser;
      this.delivery_address = `${address}, ${district}, ${ward}, ${city}`;
      this.tempAddress = this.delivery_address;
      this.receiver_info = name;
    }
  }

  changeCustomSize = (value) => {
    const { directMethod } = this.state;
    this.setState({ directMethod: !directMethod }, () => {
      this.payment_method = value;
    });
  }

  onChangeAddress = () => {
    const { editAddress } = this.state;
    if (!editAddress) {
      this.delivery_address = '';
    } else {
      this.delivery_address = this.tempAddress;
    }
    this.setState({
      editAddress: !editAddress
    });
  }

  onchangeDatePicker = () => {
    const { openDatePicker } = this.state;
    this.setState({
      openDatePicker: !openDatePicker
    });
  }

  confirmDate = (date) => {
    this.date = date;
    this.delivery_date = formatDateTime(date);
    this.onchangeDatePicker();
  }

  onchangeAddress = (value) => {
    this.delivery_address = value;
  }

  onchangeVat = () => {
    const { vat } = this.state;
    this.setState({
      vat: !vat
    });
  }

  changeReceviverInfo = (value) => {
    this.receiver_info = value;
  }

  navigateListCustomer = () => {
    navigateScreen(
      screenKeys.ListCustomer,
      { bottomTabs: false }
    );
  }


  render() {
    const {
      directMethod,
      vat,
      editAddress,
      openDatePicker,
    } = this.state;
    const {
      customerReducer, directOrder,
      orderReducer, editOrder
    } = this.props;
    const { status } = orderReducer;
    const styleDisable = (status >= 8 || status === -1) && editOrder ? { backgroundColor: 'rgba(183,183,183,0.5)', opacity: 0.8, padding: 5 } : null;
    const disableView = (status >= 8 || status === -1) && editOrder ? 'none' : 'auto';
    const { name = 'không xác nhận' } = customerReducer;
    return (
      <Container
        pointerEvents={disableView}
        stylesContainer={[styles.section, styleDisable]}
      >
        <Text style={styles.titleSection}>{this.titlePage}</Text>
        {!directOrder
          ? (
            <View style={styles.rowInline}>
              <View style={styles.text}>
                <Text style={styles.addressInput}>Khách hàng:</Text>
              </View>
              <TouchableOpacity>
                <Text style={[styles.subtitleSection, { width: 'auto', textDecorationLine: 'underline' }]}>{name}</Text>
              </TouchableOpacity>
            </View>
          )
          : (
            <View>
              <TouchableOpacity onPress={this.navigateListCustomer}>
                <View style={styles.rowInline}>
                  <Text style={styles.inputStyleCustomer}>Danh sách khách hàng</Text>
                  <ActionIcon
                    icon="arrow-right"
                    size={15}
                    color={color.mainAppColor}
                    propsStyles={styles.iconCustomer}
                  />
                </View>
              </TouchableOpacity>
              <Input
                editable={false}
                value={name}
                placeholder="Chọn khách hàng từ danh sách (*)"
                placeholderTextColor="#a3a3a3"
                containerStyle={styles.containerInput}
                inputContainerStyle={styles.containerInputStyles}
                inputStyle={styles.inputStyleDisable}
              />
            </View>
          )}
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.rowInline}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>Xuất VAT:</Text>
          </View>
          <Switch
            value={vat}
            onValueChange={this.onchangeVat}
            trackColor={{ false: '#e3e3e3', true: '#D7263D' }}
          />
        </View>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.rowInline}>
          <View style={styles.text}>
            <Text style={[styles.subtitleSection, { width: '100%' }]}>Địa chỉ giao hàng khác(*):</Text>
          </View>
          <Switch
            value={editAddress}
            onValueChange={this.onChangeAddress}
            trackColor={{ false: '#e3e3e3', true: '#D7263D' }}
          />
        </View>
        <Input
          onChangeText={this.onchangeAddress}
          defaultValue={this.delivery_address}
          editable={editAddress}
          placeholder="Địa chỉ khác"
          containerStyle={styles.containerInput}
          inputContainerStyle={styles.containerInputStyles}
          errorStyle={styles.errorStyle}
          inputStyle={styles.addressInput}
          multiline
        />
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.rowInline}>
          <View style={styles.text}>
            <Text style={[styles.subtitleSection, { width: '100%' }]}>Ngày giao hàng:</Text>
          </View>
          <TouchableOpacity onPress={this.onchangeDatePicker}>
            <View style={styles.text}>
              <Text style={styles.addressInput}>{this.delivery_date}</Text>
            </View>
            <DateTimePicker
              locale="vi"
              titleIOS="Ngày giao hàng"
              confirmTextIOS="Chọn"
              cancelTextIOS="Huỷ"
              isVisible={openDatePicker}
              onConfirm={this.confirmDate}
              onCancel={this.onchangeDatePicker}
              date={this.date}
            />
          </TouchableOpacity>
        </View>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.rowInline}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>Tên người nhận(*):</Text>
          </View>
          <View style={styles.text}>
            <Input
              onChangeText={this.changeReceviverInfo}
              defaultValue={this.receiver_info}
              placeholder="Người nhận hàng"
              placeholderTextColor="#e3e3e3"
              containerStyle={styles.containerInput}
              inputContainerStyle={styles.containerInputStyles}
              inputStyle={[styles.addressInput, { textAlign: 'right' }]}
            />
          </View>
        </View>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.rowInline}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>Thanh toán(*):</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <CheckBox
              checked={!directMethod}
              iconRight
              title="C/ khoản"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              size={16}
              checkedColor={color.mainAppColor}
              uncheckedColor={color.secondAppColor}
              containerStyle={[styles.containerRadio, { width: 100 }]}
              textStyle={styles.textRadio}
              onPress={() => this.changeCustomSize('Chuyển khoản')}
            />
            <CheckBox
              checked={directMethod}
              iconRight
              title="Tiền mặt"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor={color.mainAppColor}
              uncheckedColor={color.secondAppColor}
              size={16}
              containerStyle={[styles.containerRadio, { width: 100 }]}
              textStyle={styles.textRadio}
              onPress={() => this.changeCustomSize('Tiền mặt')}
            />
          </View>
        </View>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
      </Container>
    );
  }
}
export default detailOrder;
