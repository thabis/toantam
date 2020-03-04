import React, { PureComponent } from 'react';
import { View, Text, Keyboard } from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Formik } from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import { formatDateTime } from '@utils/date';
import { ActionIcon } from '@components/icon/icon';
import { ActionType } from '@constants/actionType';
import { StatusType } from '@constants/statusType';
import { hideModal } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import styles from '@modules/orders/styles';

export default class CommentModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openDatePicker: false
    };
  }

  hideModalCommentPopup = () => {
    Keyboard.dismiss();
    hideModal(screenKeys.LoadModal);
  };

  onchangeDatePicker = () => {
    const { openDatePicker } = this.state;
    this.setState({
      openDatePicker: !openDatePicker
    });
  }

  confirmDate = (date) => {
    this.outsource_date = date;
    this.outsourceDateDisplay = formatDateTime(date);
    this.onchangeDatePicker();
  }

  convertDate = date => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T00:00:00Z`

  render() {
    const { actionType, status, colors } = this.props;
    const { openDatePicker } = this.state;

    return (
      <View style={{}}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={colors}
          style={{
            height: 40,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            GHI CHÚ
          </Text>
          <ActionIcon
            size={25}
            icon="close"
            action={this.hideModalCommentPopup}
            propsStyles={{
              position: 'absolute',
              right: 0,
              width: 40,
              height: 40,
              margin: 2
            }}
          />
        </LinearGradient>
        <DateTimePicker
          locale="vi"
          titleIOS="Ngày chuyển qua gia công"
          confirmTextIOS="Chọn"
          cancelTextIOS="Huỷ"
          isVisible={openDatePicker}
          onConfirm={this.confirmDate}
          onCancel={this.onchangeDatePicker}
          date={this.outsource_date}
        />
        <Formik
          onSubmit={values => this.onSubmit(values, actionType)}
          initialValues={{
            note: '',
            outsourceDate: ''
          }}
          validate={this.validateField}
        >
          {propsForm => (
            <View style={styles.noteWriteContainer}>
              {status === 6 && actionType === ActionType.DONE
                && (
                  <CheckBox
                    title={`Đã gửi đơn hàng này qua gia công ${this.outsourceDateDisplay || '?'}`}
                    checked={!!this.outsource_date}
                    onPress={this.onchangeDatePicker}
                    uncheckedColor={propsForm.errors.outsourceDate ? 'red' : '#bfbfbf'}
                    containerStyle={{
                      backgroundColor: 'white',
                      borderWidth: 0,
                      borderBottomColor: 'transparent',
                      borderTopColor: 'transparent'
                    }}
                  />
                )
              }
              <Input
                containerStyle={styles.containerInputNote}
                underlineColorAndroid="transparent"
                placeholder="Nhập nội dung"
                placeholderTextColor="grey"
                numberOfLines={2}
                multiline
                inputContainerStyle={styles.containerInputStyles}
                onChangeText={propsForm.handleChange('note')}
                errorStyle={styles.errorStyle}
                errorMessage={
                  propsForm.errors.note ? propsForm.errors.note : ''
                }
              />
              <Button
                title={actionType}
                type="outline"
                containerStyle={{
                  width: '50%',
                  paddingVertical: 0,
                  marginBottom: 10
                }}
                titleStyle={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}
                buttonStyle={{ borderWidth: 0, borderRadius: 5 }}
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors
                }}
                loading={!!propsForm.isSubmitting}
                onPress={propsForm.handleSubmit}
                disabled={!propsForm.isValidating && propsForm.isSubmitting}
              />
            </View>
          )}
        </Formik>
      </View>
    );
  }

  validateField = (values) => {
    const { status, actionType } = this.props;
    const errors = {};
    if (values.note === '') {
      errors.note = 'Bạn chưa điền ghi chú';
    }

    if (!this.outsource_date && status === 6 && actionType === ActionType.DONE) {
      errors.outsourceDate = 'Bạn chưa gửi đơn hàng này qua gia công';
    }

    return errors;
  }

  onSubmit = (values, actionType) => {
    Keyboard.dismiss();
    hideModal(screenKeys.LoadModal);

    const {
      id, status, rejectOrder, updateOrderStatus, callback
    } = this.props;
    const { note } = values;

    if (actionType === ActionType.REJECT) {
      rejectOrder({
        id,
        reason: note,
        currentStatus: status,
        callback: success => callback(actionType, success)
      });
    } else if (actionType === ActionType.CONFIRM || actionType === ActionType.DONE) {
      const payload = {
        id,
        note,
        status: actionType === ActionType.CONFIRM ? 3 : status + 1,
        currentStatus: status,
        callback: success => callback(actionType, success)
      };
      if (status === StatusType.PRINT.value) {
        payload.outsource_date = formatDateTime(this.outsource_date, 'YYYY-MM-DD hh:mm:ss');
      }
      updateOrderStatus(payload);
    }
  }
}
