import React, { PureComponent } from 'react';
import {
  View, SafeAreaView, Text, Alert
} from 'react-native';
import {
  pop, showModal, hideModal, hideAllModal
} from '@navigation/navigation';
import HeaderComponent from '@components/header/header';
import Container from '@components/container';
import LinearGradient from 'react-native-linear-gradient';
import ItemOrderDetail from '@containers/orderContainer/orderItemDetailContainer';
import { Button, Input } from 'react-native-elements';
import { screenKeys } from '@src/constants/screenKeys';
import { Formik } from 'formik';
import { ActionIcon } from '@src/components/icon/icon';
import styles from './styles';

class OrderDetailScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientColor = ['#239bc2', '#39d7d9'];
    const { user } = this.props;
    const { role } = user;
    this.role = role;
    this.listBtnAction = [];
    this.initButtonByRole();
  }

  initButtonByRole = () => {
    const { item } = this.props;
    if (!item) return this.listBtnAction;
    const { status } = item;
    if (this.role === 'store' && status === 7) {
      this.listBtnAction.push({
        dataActions: {},
        fncAction: () => this.alertMessage(),
        titleButton: 'Chấp Nhận',
        colorsButton: ['#53d2d6', '#56c1d5', '#56b9d5'],
      });
    } else if (this.role === 'store' && status === 8) {
      this.listBtnAction.push({
        dataActions: {
          status: -1,
          action: 'update'
        },
        fncAction: value => this.popupOrder(value),
        titleButton: 'Huỷ',
        colorsButton: ['#d53f62', '#d53f50', '#d53f3f'],
      });
    } else if (this.role === 'deliver' && status === 8) {
      this.listBtnAction.push({
        dataActions: {},
        fncAction: () => this.acceptOrder(),
        titleButton: 'Chấp Nhận',
        colorsButton: ['#53d2d6', '#56c1d5', '#56b9d5'],
      });
    } else if (this.role === 'deliver' && status === 9) {
      this.listBtnAction.push({
        dataActions: {
          status: 8,
          action: 'reject'
        },
        fncAction: value => this.popupOrder(value),
        titleButton: 'Huỷ Giao',
        colorsButton: ['#d53f62', '#d53f50', '#d53f3f']
      });
      this.listBtnAction.push({
        dataActions: {
          status: 10,
          action: 'update'
        },
        fncAction: value => this.popupOrder(value),
        titleButton: 'Đã Giao',
        colorsButton: ['#53d2d6', '#56c1d5', '#56b9d5'],
      });
    }
    return true;
  }

  back = () => {
    const { componentId } = this.props;
    pop(componentId);
  }

  callBack = (status) => {
    hideAllModal();
    if (!status) {
      if (this.role === 'store') {
        Alert.alert('Lưu kho không thành công!');
      }
      if (this.role === 'deliver') {
        Alert.alert('Xử lý không thành công!');
      }
    } else {
      this.back();
    }
  }

  acceptOrder = () => {
    const { item } = this.props;
    showModal(screenKeys.showModal);
    const { assignOrder } = this.props;
    const { id, status } = item;
    const payload = {
      callback: statusCallBack => this.callBack(statusCallBack),
      id,
      status: status + 1,
    };
    assignOrder(payload);
  }

  alertMessage = () => {
    Alert.alert(
      'Thông báo',
      'Bạn lấy hàng về kho chưa?',
      [
        {
          text: 'Lưu kho',
          onPress: () => this.acceptOrder(),
          style: 'default'
        },
        {
          text: 'Chưa',
          onPress: () => console.log('cancel'),
          style: 'destructive',
        },
      ],
    );
  }

  validateField = (values) => {
    const errors = {};
    if (!values.note) {
      errors.note = 'Bạn chưa điền ghi chú';
    }
    return errors;
  }

  onSubmitForm = (valuesForm) => {
    const { updateOrder, rejectOrder, item } = this.props;
    const { id } = item;
    const { note, dataActions } = valuesForm;
    const { action, status } = dataActions;
    const values = {
      status,
    };
    if (action === 'update') {
      const dataOrder = {
        id,
        note,
        status,
      };
      updateOrder({
        dataOrder,
        values,
        callback: statusCallBack => this.callBack(statusCallBack),
      });
    }
    if (action === 'reject') {
      rejectOrder({
        id,
        reason: note,
        callback: statusCallBack => this.callBack(statusCallBack)
      });
    }
  }

  popupOrder = (value) => {
    const { colorsButton, titleButton, dataActions } = value;
    const titleHeader = `Ghi Chú ${titleButton}`;
    return showModal(screenKeys.LoadModal, null, {
      childrenContent: () => (
        <View style={styles.containerModal}>
          <Formik
            onSubmit={this.onSubmitForm}
            initialValues={{
              note: ''
            }}
            validate={this.validateField}
          >
            {
              (propsForm => (
                <View style={{ flex: 1 }}>
                  <LinearGradient
                    style={{
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      paddingHorizontal: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                    colors={colorsButton}
                  >
                    <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center' }}>{titleHeader}</Text>
                    <ActionIcon
                      icon="close"
                      action={() => { hideModal(screenKeys.LoadModal); }}
                      propsStyles={{ textAlign: 'right' }}
                    />
                  </LinearGradient>
                  <View style={styles.formContainer}>
                    <Input
                      containerStyle={styles.containerNote}
                      placeholder="Ghi chú"
                      placeholderTextColor="grey"
                      numberOfLines={2}
                      multiline
                      inputContainerStyle={styles.containerInputStyles}
                      onChangeText={propsForm.handleChange('note')}
                      errorStyle={styles.errorStyle}
                      errorMessage={propsForm.errors.note ? propsForm.errors.note : ''}
                    />
                    <Button
                      title={titleButton}
                      type="outline"
                      containerStyle={{ width: '50%', paddingVertical: 15 }}
                      titleStyle={{ color: 'white' }}
                      buttonStyle={{ borderWidth: 0 }}
                      ViewComponent={LinearGradient}
                      linearGradientProps={{ colors: colorsButton }}
                      loading={!!propsForm.isSubmitting}
                      onPress={async () => {
                        await propsForm.setFieldValue('dataActions', dataActions);
                        propsForm.handleSubmit();
                      }
                      }
                      disabled={!propsForm.isValidating && propsForm.isSubmitting}
                    />
                  </View>
                </View>
              )
              )}
          </Formik>
        </View>
      ),
    });
  }

  renderListButton = () => (this.listBtnAction.map((value, index) => {
    const {
      titleButton, colorsButton, fncAction
    } = value;
    return (
      <Button
        key={index.toString()}
        ViewComponent={LinearGradient}
        linearGradientProps={{ colors: colorsButton }}
        title={titleButton}
        onPress={() => fncAction(value)}
        buttonStyle={{ height: 50, borderRadius: 0 }}
        containerStyle={{ flex: 1, width: '100%' }}
      />
    );
  })
  );

  render() {
    const { item } = this.props;
    return (
      <Container>
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={this.gradientColor}
          style={{
            flex: 1
          }}
        >
          <HeaderComponent
            placement="center"
            title="CHI TIẾT ĐƠN HÀNG"
            containerHeader={styles.containerHeader}
            iconLeft="arrow-left-circle"
            leftAction={this.back}
            size={25}
          />
          <ItemOrderDetail item={item} role={this.role} />
          <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              {this.renderListButton()}
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Container>
    );
  }
}

export default OrderDetailScreen;
