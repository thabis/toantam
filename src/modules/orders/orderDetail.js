import React, { PureComponent } from 'react';
import {
  View, Text, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { formatDateTime } from '@utils/date';
import HeaderComponent from '@components/header/header';
import Container from '@components/container';
import { ActionIcon } from '@components/icon/icon';
import { pop, showModal, hideModal } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import { ActionType } from '@constants/actionType';
import ItemOrderDetail from '@containers/orderContainer/orderItemDetailContainer';
import CommentModal from '@containers/modalContainer/commentModalContainer';
import styles from './styles';

class OrderDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientColor = ['#239bc2', '#39d7d9'];
    this.gradientOrderNo = ['#f59267', '#f06363'];
    const { user } = this.props;
    const { role } = user;
    this.role = role;
    this.listBtnAction = [];
    this.state = {
      didAction: false,
      actionMessage: ''
    };
  }

  componentDidMount() {
    const { data, orderId, getOrderDetail } = this.props;
    if (!data) {
      getOrderDetail({
        id: orderId,
        callback: this.getOrderDetailCallback
      });
    }
  }

  getOrderDetailCallback = (data) => {
    this.setState({
      order: data
    });
  }

  back = () => {
    const { componentId } = this.props;
    pop(componentId);
  }

  render() {
    const { data } = this.props;
    const { order } = this.state;
    const orderData = data || order;

    return (
      <Container>
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={this.gradientColor}
          style={{ flex: 1 }}
        >
          <HeaderComponent
            iconLeft="arrow-left-circle"
            leftAction={this.back}
            defaultHeader
            size={25}
            title="CHI TIẾT ĐƠN HÀNG"
            containerHeader={[styles.containerDetailHeader]}
          />
          <View style={{ flex: 1 }}>
            {this.renderHeader(orderData)}
            {this.renderBody(orderData)}
            {this.renderFooter(orderData)}
          </View>
        </LinearGradient>
      </Container>
    );
  }

  renderHeader = (data) => {
    let deliveryDate = 'Chưa có';
    if (data && data.delivery_date) {
      const date = moment(data.delivery_date);
      deliveryDate = formatDateTime(date, 'D-M-YYYY');
    }

    return (
      <View style={[styles.containerHeaderOrderDetail]}>
        <LinearGradient colors={this.gradientOrderNo} style={styles.orderNo}>
          <Text style={styles.subTextRow}>
            {data && data.order_no}
            {data && data.reference_order ? '(*)' : ''}
          </Text>
        </LinearGradient>
        <View style={styles.dateContainer}>
          <View style={styles.createDate}>
            <ActionIcon
              size={14}
              propsStyles={styles.dateIcon}
              icon="clock"
            />
            <Text style={styles.dateText}>
              {`NGÀY GIAO: ${deliveryDate}`}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderBody = (data) => {
    if (data) {
      return (
        <View>
          <ItemOrderDetail item={data} role={this.role} />
        </View>
      );
    }
    return (<View />);
  };

  renderFooter = (data) => {
    if (!data) return (<View />);

    const { id, status, reference_order } = data;
    const { didAction, actionMessage } = this.state;
    const assignColors = ['#53d2d6', '#56c1d5', '#56b9d5'];
    const rejectColors = ['#d53f62', '#d53f50', '#d53f3f'];
    const confirmColors = ['#f59267', '#f06363'];
    const doneColors = ['#53d2d6', '#56c1d5', '#56b9d5'];

    const renderAssignButton = () => (
      <TouchableWithoutFeedback
        onPress={() => this.acceptOrderFromDesigner(id, status)}
      >
        <LinearGradient
          colors={assignColors}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{ActionType.ASSIGN}</Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
    const renderRejectButton = () => (
      <TouchableWithoutFeedback
        onPress={() => this.showCommentPopup(ActionType.REJECT, id, status, rejectColors)}
      >
        <LinearGradient
          colors={rejectColors}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{ActionType.REJECT}</Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );

    const renderConfirmButton = () => (
      <TouchableWithoutFeedback
        onPress={() => this.showCommentPopup(ActionType.CONFIRM, id, status, confirmColors)}
      >
        <LinearGradient
          colors={confirmColors}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{ActionType.CONFIRM}</Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );

    const renderDoneButton = () => (
      <TouchableWithoutFeedback
        onPress={() => this.showCommentPopup(ActionType.DONE, id, status, doneColors)}
      >
        <LinearGradient
          colors={doneColors}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{ActionType.DONE}</Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );

    return (
      <View style={[styles.containerFooterDetail]}>
        {didAction ? (
          <View style={{ margin: 10 }}>
            <Text style={[styles.actionMesageText]}>
              {actionMessage}
            </Text>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            {((status === 1 && this.role === 'designer') || (status === 5 && this.role === 'printer')) && renderAssignButton()}
            {(((status === 2 || status === 4) && this.role === 'designer') || (status === 6 && this.role === 'printer')) && renderRejectButton()}
            {((status === 2 || status === 4) && this.role === 'designer') && renderConfirmButton()}
            {(((status === 4 || (status === 2 && reference_order)) && this.role === 'designer') || (status === 6 && this.role === 'printer')) && renderDoneButton()}
          </View>
        )}
      </View>
    );
  }

  acceptOrderFromDesigner = (id, status) => {
    showModal(screenKeys.showModal);

    const { assignOrder } = this.props;
    assignOrder({
      id,
      status: status + 1,
      currentStatus: status,
      callback: success => this.callback(ActionType.ASSIGN, success)
    });
  }

  hideModalCommentPopup = () => {
    Keyboard.dismiss();
    hideModal(screenKeys.LoadModal);
  }

  showCommentPopup = (actionType, id, status, colors) => {
    showModal(screenKeys.LoadModal, null, {
      childrenContent: () => (
        <View style={[styles.containerCommentModal]}>
          <CommentModal actionType={actionType} id={id} status={status} callback={this.callback} colors={colors} />
        </View>
      ),
    });
  }

  callback = (actionType, success) => {
    let message = 'Đang xử lý...';
    if (actionType === ActionType.REJECT) {
      message = 'Đơn hàng đã được từ chối';
    } else if (actionType === ActionType.ASSIGN) {
      message = 'Đơn hàng đang xử lý';
    } else if (actionType === ActionType.CONFIRM) {
      message = 'Đơn hàng đã gửi yêu cầu xác nhận từ khách hàng';
    } else if (actionType === ActionType.DONE) {
      message = 'Đơn hàng đã hoàn thành';
    }

    hideModal(screenKeys.showModal);

    if (success) {
      this.setState({
        didAction: true,
        actionMessage: message
      });
    }
  }
}

export default OrderDetail;
