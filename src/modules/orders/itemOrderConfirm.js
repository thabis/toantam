import React, { PureComponent } from 'react';
import { View, Text, FlatList } from 'react-native';
import AnimationItem from '@components/animation/animation';
import { ActionIcon, IconButton } from '@components/icon/icon';
import { Divider, Button, Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { getDateFromNow, getFromNow, caculateDateFollow } from '@utils/date';
import { screenKeys } from '@constants/screenKeys';
import { showModal, hideModal } from '@navigation/navigation';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

class ItemOrderDraft extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientColor = ['#f59267', '#f06363'];
    this.reverse = false;
    this.notesReverse = [];
  }

  renderNotes = ({ item }) => {
    const { note, created_time } = item;
    const caculateDate = caculateDateFollow(created_time);
    const dateFromNow = getDateFromNow(caculateDate, created_time);
    return (
      <View style={styles.blockRow}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <Text style={styles.textOrderStyle}>
            <IconButton
              icon="bubble"
              size={16}
              propsStyles={styles.iconOrderStyles}
            />
            {' '}
            {note}
          </Text>
          <Text style={styles.textOrderStyle}>
            <IconButton
              icon="clock"
              size={16}
              propsStyles={styles.iconOrderStyles}
            />
            {' '}
            {dateFromNow}
          </Text>
        </View>
        <Divider style={{ width: '100%' }} />
      </View>
    );
  }

  renderHeaderNotes = () => (
    <LinearGradient colors={this.gradientColor} style={styles.containerNotes}>
      <Text style={styles.titleNotes}>Danh sách ghi chú</Text>
      <ActionIcon
        icon="close"
        action={() => { hideModal(screenKeys.LoadModal); }}
        propsStyles={{ textAlign: 'right' }}
      />
    </LinearGradient>
  )

  validateField = (values) => {
    const errors = {};
    if (values.note === '') {
      errors.note = 'Bạn chưa điền ghi chú';
    }
    return errors;
  }

  onSubmit = (values, action) => {
    const { submitOrder, item } = this.props;
    const { id } = item;
    const { note } = values;
    const dataOrder = {
      id,
      note,
      status: 4
    };
    submitOrder(action, dataOrder);
    hideModal(screenKeys.LoadModal);
  }

  keyExtractor = (item, index) => index.toString();

  popupOrder = () => {
    const { item } = this.props;
    const {
      notes
    } = item;
    if (!this.reverse) {
      this.reverse = true;
      this.notesReverse = notes.reverse();
    }
    showModal(screenKeys.LoadModal, null, {
      childrenContent: () => (
        <KeyboardAwareScrollView
          innerRef={(ref) => { this.keyboard = ref; }}
          extraScrollHeight={40}
          contentContainerStyle={styles.containerKeyBoard}
          keyboardShouldPersistTaps="handled"
          viewIsInsideTabBar
          enableAutomaticScroll
        >
          <View style={styles.containerModal}>
            <FlatList
              data={this.notesReverse}
              style={{ height: '30%' }}
              renderItem={this.renderNotes}
              keyExtractor={this.keyExtractor}
              ListHeaderComponent={this.renderHeaderNotes}
              stickyHeaderIndices={[0]}
            />

            <Formik
              onSubmit={this.onSubmit}
              initialValues={{
                note: ''
              }}
              validate={this.validateField}
            >
              {
                (propsForm => (
                  <View style={styles.noteWriteContainer}>
                    <Input
                      containerStyle={styles.containerInputNote}
                      underlineColorAndroid="transparent"
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
                      title="Phản hồi"
                      type="outline"
                      containerStyle={{ width: '50%', paddingVertical: 15 }}
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
          </View>
        </KeyboardAwareScrollView>
      ),
    });
  }

  render() {
    const { item, index } = this.props;
    const {
      order_no,
      name,
      notes
    } = item;
    const noteTitle = notes.length > 0 ? `${notes[notes.length - 1].note}` : '';
    const timeNotes = notes.length > 0 ? `${notes[notes.length - 1].created_time}` : '';
    const dateFromNow = getFromNow(timeNotes);
    return (
      <AnimationItem
        index={index}
        onAction={this.popupOrder}
        actionStyle={styles.containerRows}
        duration={500}
      >
        <View style={styles.blockConfirm}>
          <View style={styles.containerOrder}>
            <LinearGradient colors={this.gradientColor} style={styles.orderNoStyle}>
              <Text style={styles.textRow}>{order_no}</Text>
            </LinearGradient>
          </View>
          <View style={styles.containerOrder}>
            <View style={styles.containerDetailOrder}>
              <Text style={styles.textOrderStyle}>
                <IconButton
                  icon="folder-alt"
                  size={18}
                  propsStyles={styles.iconOrderStyles}
                />
                {' '}
                {name}
              </Text>
              <Text style={styles.textOrderNote} numberOfLines={2}>
                <IconButton
                  icon="bubble"
                  size={18}
                  propsStyles={styles.iconOrderStyles}
                />
                {' '}
                {noteTitle}
              </Text>
            </View>
            <View style={{ alignSelf: 'flex-end', paddingBottom: 10 }}>
              <Text style={styles.textDetailOrder}>Phản hồi</Text>
            </View>
          </View>
          <Divider style={{ marginVertical: 5, backgroundColor: '#7C7C7C' }} />
          <Text style={styles.textDateTime}>
            Đã xử lý
            {' '}
            {dateFromNow}
          </Text>
        </View>
      </AnimationItem>
    );
  }
}
export default ItemOrderDraft;
