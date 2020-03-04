import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  navigateScreen, pop, showModal, hideModal
} from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import HeaderComponent from '@components/header/header';
import Container from '@components/container';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import { IconButton } from '@components/icon/icon';
import { Divider } from 'react-native-elements';
import { formatDateTime } from '@src/utils/date';
import styles from './styles';

class OrderProcessingDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientColor = ['#56d1d5', '#56c1d5', '#56b9d5'];
    this.state = {
      round: 0,
    };
    this.descriptionStatus = '';
    this.initOrder();
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

  componentDidMount() {
    const { orderReducer } = this.props;
    const { status } = orderReducer;
    this.setState({
      round: 0.1 * status
    });
  }

  back = () => {
    const { componentId, clearCustomer, clearOrder } = this.props;
    clearCustomer();
    clearOrder();
    pop(componentId);
  }

  onNavigateOrder = () => {
    const passProps = {
      editOrder: true,
      fromDetailOrder: true
    };
    navigateScreen(screenKeys.CreateOrder, { bottomTabs: false, passProps });
  }

  getStatusOrder = () => {
    const { orderReducer } = this.props;
    const { status } = orderReducer;
    let titleStatus = '';
    switch (status) {
      case -1: {
        this.descriptionStatus = 'ĐH đã bị huỷ';
        titleStatus = 'Huỷ';
        break;
      }
      case 1: {
        this.descriptionStatus = 'ĐH đã chốt sale và chờ xử lý';
        titleStatus = 'Phòng Design';
        break;
      }
      case 2: {
        this.descriptionStatus = 'ĐH đang được xử lý';
        titleStatus = 'Phòng Design';
        break;
      }
      case 3: {
        this.descriptionStatus = 'ĐH chờ phản hồi từ khách hàng';
        titleStatus = 'Phòng Design';
        break;
      }
      case 4: {
        this.descriptionStatus = 'ĐH đang xử lý phản hồi từ khách hàng';
        titleStatus = 'Phòng Design';
        break;
      }
      case 5: {
        this.descriptionStatus = 'ĐH đã design xong và chờ xử lý';
        titleStatus = 'Phòng In Ấn';
        break;
      }
      case 6: {
        this.descriptionStatus = 'ĐH đang được xử lý';
        titleStatus = 'Phòng In Ấn';
        break;
      }
      case 7: {
        this.descriptionStatus = 'ĐH đã in xong và chờ lưu kho';
        titleStatus = 'Phòng Kho';
        break;
      }
      case 8: {
        this.descriptionStatus = 'ĐH đã lưu kho và chờ vận chuyển';
        titleStatus = 'Phòng Kho';
        break;
      }
      case 9: {
        this.descriptionStatus = 'ĐH đang vận chuyển';
        titleStatus = 'Vận Chuyển';
        break;
      }
      case 10: {
        this.descriptionStatus = 'ĐH đã giao thành công';
        titleStatus = 'Đã giao hàng';
        break;
      }
      default: {
        titleStatus = 'Không rõ';
      }
    }
    return titleStatus;
  }

  renderAddressInfo = () => {
    const { orderReducer } = this.props;
    const {
      delivery_date,
      receiver_info,
      delivery_address,
    } = orderReducer;
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.titleSection}>Thông tin giao hàng</Text>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.row}>
          <View style={styles.containRow}>
            <Text style={styles.text}>Ngày giao hàng:</Text>
          </View>
          <View style={styles.containRow}>
            <Text style={styles.text}>{formatDateTime(delivery_date)}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.containRow}>
            <Text style={styles.text}>Người nhận hàng:</Text>
          </View>
          <View style={styles.containRow}>
            <Text style={styles.text}>{receiver_info}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.containRow}>
            <Text style={styles.text}>Địa chỉ giao hàng:</Text>
          </View>
          <View style={styles.containRow}>
            <Text style={styles.text}>{delivery_address}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderOrderInfo = () => {
    const { orderReducer } = this.props;
    const {
      vat,
      order_no,
      name: file_name,
      template_number,
      quantity,
      unit_price,
      design_fee,
      shipping_fee,
      deposite
    } = orderReducer;
    const totalMoney = template_number * quantity * unit_price
      + design_fee + shipping_fee - deposite;
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.titleSection}>Thông tin đơn hàng</Text>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.row}>
          <View style={styles.containRow}>
            <Text style={styles.text}>Mã đơn hàng:</Text>
          </View>
          <View style={styles.containRow}>
            <Text style={styles.text}>{order_no}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.containRow}>
            <Text style={styles.text}>Tên File thiết kế:</Text>
          </View>
          <View style={styles.containRow}>
            <Text style={styles.text}>{file_name}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.containRow}>
            <Text style={styles.text}>Tổng tiền:</Text>
          </View>
          <View style={styles.containRow}>
            <Text style={styles.text}>{totalMoney}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.containRow}>
            <Text style={styles.text}>Xuất VAT:</Text>
          </View>
          <View style={styles.containRow}>
            <Text style={styles.text}>{vat ? 'Có' : 'Không'}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderBasicInfo = () => {
    const { orderReducer, customerReducer } = this.props;
    const {
      order_no,
    } = orderReducer;
    const { round } = this.state;
    const { name, phone } = customerReducer;
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <View style={styles.rowContent}>
          <View style={styles.basicInfoStyle}>
            <Text style={styles.textRow}>
              <IconButton
                icon="doc"
                size={20}
                propsStyles={{ color: '#83fbf4' }}
              />
              {' '}
              {order_no}
            </Text>
            <Text style={styles.textRow}>
              <IconButton
                icon="user"
                size={20}
                propsStyles={{ color: '#83fbf4' }}
              />
              {' '}
              {name}
            </Text>
            <Text style={styles.textRow}>
              <IconButton
                icon="phone"
                size={20}
                propsStyles={{ color: '#83fbf4' }}
              />
              {' '}
              {phone}
            </Text>
          </View>
          <View style={styles.progressStyle}>
            <Progress.Circle
              animated
              size={150}
              showsText
              formatText={this.getStatusOrder}
              textStyle={{ textAlign: 'center', fontWeight: '500' }}
              thickness={6}
              progress={round}
              unfilledColor="#344555"
              borderWidth={0}
              color="#83fbf4"
              strokeCap="square"
            />
          </View>
        </View>
        <View style={{ alignSelf: 'center' }}>
          <Text style={styles.textRow}>
            {this.descriptionStatus}
          </Text>
        </View>
      </View>
    );
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
            placement="center"
            title="ĐƠN HÀNG"
            containerHeader={styles.containerHeader}
            iconLeft="arrow-left-circle"
            leftAction={this.back}
            size={25}
            iconRight="note"
            rightAction={this.onNavigateOrder}
          />
        </LinearGradient>
        {this.renderBasicInfo()}
        <View style={styles.oval} />
        <View style={styles.bottomContainer} />
        <ScrollView
          style={styles.scrollStyle}
        >
          {this.renderAddressInfo()}
          {this.renderOrderInfo()}
        </ScrollView>
      </Container>
    );
  }
}

export default OrderProcessingDetail;
