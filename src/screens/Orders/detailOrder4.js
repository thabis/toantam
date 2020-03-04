/* eslint-disable radix */
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Container from '@components/container';
import {
  Text, Divider, Input
} from 'react-native-elements';
import styles from './styleCreate';

class detailOrder4 extends PureComponent {
  constructor(props) {
    super(props);
    const { editOrder, orderReducer } = this.props;
    const {
      template_number,
      quantity,
      unit_price,
      design_fee,
      shipping_fee,
      deposite
    } = orderReducer;
    this.state = {
      template_number: editOrder && template_number !== 0 ? template_number : '',
      quantity: editOrder && quantity !== 0 ? quantity : '',
      unit_price: editOrder && unit_price !== 0 ? unit_price : '',
      design_fee: editOrder && design_fee !== 0 ? design_fee : '',
      shipping_fee: editOrder && shipping_fee !== 0 ? shipping_fee : '',
      deposite: editOrder && deposite !== 0 ? deposite : '',
      total: 0
    };
  }

  caculateTotal = () => {
    const {
      template_number,
      quantity,
      unit_price,
      design_fee = 0,
      shipping_fee = 0,
      deposite = 0,
    } = this.state;
    const fee_design = design_fee !== '' ? parseInt(design_fee) : 0;
    const fee_ship = shipping_fee !== '' ? parseInt(shipping_fee) : 0;
    const fee_deposite = deposite !== '' ? parseInt(deposite) : 0;
    const totalMoney = template_number * quantity * unit_price
      + fee_design + fee_ship - fee_deposite;
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(totalMoney) && totalMoney !== 0) {
      this.setState({
        total: totalMoney
      });
    }
  }

  componentDidMount() {
    this.caculateTotal();
  }

  changeTemplateNumber = (value) => {
    const num = value || 0;
    this.setState({
      template_number: num
    }, () => {
      this.caculateTotal();
    });
  }

  changeQuality = (value) => {
    const num = value || 0;
    this.setState({
      quantity: num
    }, () => {
      this.caculateTotal();
    });
  }

  changePrice = (value) => {
    const num = value || 0;
    this.setState({
      unit_price: num
    }, () => {
      this.caculateTotal();
    });
  }

  changeDesignFee = (value) => {
    const num = value || 0;
    this.setState({
      design_fee: num
    }, () => {
      this.caculateTotal();
    });
  }

  changeShippingFee = (value) => {
    const num = value || 0;
    this.setState({
      shipping_fee: num
    }, () => {
      this.caculateTotal();
    });
  }

  changeDeposite = (value) => {
    const num = value || 0;
    this.setState({
      deposite: num
    }, () => {
      this.caculateTotal();
    });
  }

  render() {
    const {
      template_number,
      quantity,
      unit_price,
      design_fee,
      shipping_fee,
      total,
      deposite = ''
    } = this.state;
    const { orderReducer, editOrder } = this.props;
    const { status } = orderReducer;
    const styleDisable = status !== 0 && editOrder ? { backgroundColor: 'rgba(183,183,183,0.5)', opacity: 0.8, padding: 5 } : null;
    const disableView = status !== 0 && editOrder ? 'none' : 'auto';
    return (
      <Container
        pointerEvents={disableView}
        stylesContainer={[styles.section, styleDisable]}
      >
        <Text style={styles.titleSection}>Thông tin thanh toán</Text>
        <View style={styles.row}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>SL mẫu(*)</Text>
          </View>
          <View style={styles.text}>
            <Input
              defaultValue={template_number.toString()}
              onChangeText={this.changeTemplateNumber}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#e3e3e3"
              containerStyle={styles.containerInput}
              inputContainerStyle={[styles.containerInputStyles]}
              inputStyle={{ textAlign: 'right' }}
              errorStyle={styles.errorStyle}
            />
          </View>
        </View>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.row}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>SL in(*)</Text>
          </View>
          <View style={styles.text}>
            <Input
              defaultValue={quantity.toString()}
              onChangeText={this.changeQuality}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#e3e3e3"
              containerStyle={styles.containerInput}
              inputContainerStyle={[styles.containerInputStyles]}
              inputStyle={{ textAlign: 'right' }}
              errorStyle={styles.errorStyle}
            />
          </View>
        </View>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.row}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>Đơn giá(*)</Text>
          </View>
          <View style={styles.text}>
            <Input
              defaultValue={unit_price.toString()}
              onChangeText={this.changePrice}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#e3e3e3"
              containerStyle={styles.containerInput}
              inputContainerStyle={[styles.containerInputStyles]}
              inputStyle={{ textAlign: 'right' }}
              errorStyle={styles.errorStyle}
            />
          </View>
        </View>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.row}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>Phí thiết kế</Text>
          </View>
          <View style={styles.text}>
            <Input
              defaultValue={design_fee.toString()}
              onChangeText={this.changeDesignFee}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#e3e3e3"
              containerStyle={styles.containerInput}
              inputContainerStyle={styles.containerInputStyles}
              inputStyle={{ textAlign: 'right' }}
              errorStyle={styles.errorStyle}
            />
          </View>
        </View>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.row}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>Phí ship</Text>
          </View>
          <View style={styles.text}>
            <Input
              defaultValue={shipping_fee.toString()}
              onChangeText={this.changeShippingFee}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#e3e3e3"
              containerStyle={styles.containerInput}
              inputContainerStyle={[styles.containerInputStyles]}
              inputStyle={{ textAlign: 'right' }}
              errorStyle={styles.errorStyle}
            />
          </View>
        </View>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.row}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>Tạm ứng</Text>
          </View>
          <View style={styles.text}>
            <Input
              defaultValue={deposite.toString()}
              onChangeText={this.changeDeposite}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#e3e3e3"
              containerStyle={styles.containerInput}
              inputContainerStyle={[styles.containerInputStyles]}
              inputStyle={{ textAlign: 'right' }}
              errorStyle={styles.errorStyle}
            />
          </View>
        </View>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.row}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>Thành tiền</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.totalText}>
              {total}
              {' '}
              VNĐ
            </Text>
          </View>
        </View>
      </Container>
    );
  }
}
export default detailOrder4;
