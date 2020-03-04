/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Container from '@components/container';
import RNPickerSelect from 'react-native-picker-select';
import { IconButton } from '@components/icon/icon';
import {
  Text, Divider, Input, CheckBox
} from 'react-native-elements';
import styles from './styleCreate';
import color from '../../constants/color';

class detailOrder2 extends PureComponent {
  constructor(props) {
    super(props);
    const { orderReducer, editOrder } = this.props;
    const {
      category_id,
      paper_id,
      number_print_face,
      print_type_ids,
      method,
    } = orderReducer;
    this.id_category = 0;
    this.id_paper = editOrder ? paper_id : 0;
    this.method = editOrder ? method : '0 x 0';
    this.id_method = 0;
    this.widthMethod = '';
    this.heightMethod = '';
    this.print_type_ids = editOrder ? print_type_ids[0] : 0;
    // this.listBasic = [
    //   {
    //     value: '841 x 1189',
    //     label: 'A0',
    //   },
    //   {
    //     value: '594 x 841',
    //     label: 'A1',
    //   },
    //   {
    //     value: '420 x 594',
    //     label: 'A2',
    //   },
    //   {
    //     value: '297 x 420',
    //     label: 'A3',
    //   },
    //   {
    //     value: '210 x 297',
    //     label: 'A4',
    //   },
    //   {
    //     value: '148 x 210',
    //     label: 'A5',
    //   },
    // ];
    this.number_print_face = editOrder ? number_print_face : 1;
    this.state = {
      customSize: editOrder ? this.getCustomSize(method) : false,
      listChildCat: editOrder ? this.getDetailChild() : [],
      disableChild: true,
      valueCat: editOrder ? category_id : 0,
      isFace: !(editOrder && number_print_face !== 1),
    };
  }

  getCustomSize = (method) => {
    const splitMethod = method.split('x');
    if (splitMethod.length === 2) {
      const widthSize = splitMethod[0].trim();
      const heightSize = splitMethod[1].trim();
      this.widthMethod = widthSize !== '0' ? widthSize : '';
      this.heightMethod = heightSize !== '0' ? heightSize : '';
      return true;
    }
    return false;
  }

  getDetailChild = () => {
    const { orderReducer, listCategory } = this.props;
    const { category_id } = orderReducer;
    const value = category_id;
    let parentName = '';
    Object.keys(listCategory).forEach((val) => {
      const listCat = listCategory[val];
      if (listCat.length > 0) {
        const cat = listCat.find(e => e.id === value);
        if (cat) {
          parentName = val;
          this.id_category = cat.parent_id;
          return true;
        }
      }
    });

    if (!parentName) {
      return [];
    }
    const listChild = listCategory[parentName];
    const listChildConvert = [];
    listChild.map((val) => {
      listChildConvert.push({
        value: val.id,
        label: val.category_name
      });
    });
    return listChildConvert;
  }

  changeCustomSize = () => {
    const { customSize } = this.state;
    this.setState({ customSize: !customSize });
  }

  changeCatParent = (value) => {
    const { disableChild } = this.state;
    if (value == null && !disableChild) {
      return this.setState({ disableChild: true, valueCat: '' });
    }
    if (value != null && disableChild) {
      this.setState({ disableChild: false });
    }
    this.id_category = value;
  }

  changeCatChild = (value) => {
    this.setState({
      valueCat: value
    });
  }

  changeMethod = (value) => {
    this.method = value;
  }

  changeWidthMethod = (value) => {
    this.widthMethod = value;
    this.sumMethod();
  }

  changeHeightMethod = (value) => {
    this.heightMethod = value;
    this.sumMethod();
  }

  sumMethod = () => {
    const width = this.widthMethod ? this.widthMethod : 0;
    const height = this.heightMethod ? this.heightMethod : 0;
    this.method = `${width} x ${height}`;
  }

  changePaper = (value) => {
    this.id_paper = value;
  }

  changeColor = (value) => {
    this.print_type_ids = value;
  }

  changeFaceSize = (value) => {
    const { isFace } = this.state;
    this.setState({
      isFace: !isFace
    });
    this.number_print_face = value;
  }

  selectParent = () => {
    const value = this.id_category;
    const { listCategory, listCategoryParent } = this.props;
    const data = listCategoryParent.find(e => e.value === value);
    if (!data) {
      return;
    }
    const listChild = listCategory[data.label];
    const listChildConvert = [];
    listChild.map((val) => {
      listChildConvert.push({
        value: val.id,
        label: val.category_name
      });
    });
    this.setState({
      listChildCat: listChildConvert
    });
  }

  render() {
    const {
      // customSize,
      listChildCat,
      disableChild,
      valueCat,
      isFace
    } = this.state;
    const {
      listCategoryParent,
      listPaper,
      listColorPrint,
      editOrder = false,
      orderReducer
    } = this.props;
    const { status } = orderReducer;
    const styleDisable = status !== 0 && editOrder ? { backgroundColor: 'rgba(183,183,183,0.5)', opacity: 0.8, padding: 5 } : null;
    const disableView = status !== 0 && editOrder ? 'none' : 'auto';
    return (
      <Container
        pointerEvents={disableView}
        stylesContainer={[styles.section, styleDisable]}
      >
        <Text style={styles.titleSection}>Chi tiết sản xuất (1)</Text>
        <Text style={styles.subtitleSection}>Loại Hàng Hoá(*):</Text>
        <View style={styles.row}>
          <RNPickerSelect
            placeholder={{
              label: 'Hàng hoá chung',
              value: null,
            }}
            items={listCategoryParent}
            onValueChange={this.changeCatParent}
            style={{
              inputIOS: styles.inputPicker,
              viewContainer: styles.containerPicker,
              placeholder: styles.placeHolderPicker
            }}
            value={!editOrder || this.id_category === 0 ? undefined : this.id_category}
            onDonePress={this.selectParent}
            doneText="Chọn"
            placeholderTextColor="#e3e3e3"
            Icon={() => (
              <IconButton
                icon="drawer"
                size={22}
                propsStyles={{
                  color: color.mainAppColor,
                  // right: 10
                }}
              />
            )}
          />
          <RNPickerSelect
            placeholder={{
              label: 'Loại hàng ',
              value: null,
              color: '#e3e3e3',
            }}
            disabled={disableChild}
            items={listChildCat}
            onValueChange={this.changeCatChild}
            style={{
              inputIOS: styles.inputPicker,
              viewContainer: styles.containerPicker,
              placeholder: styles.placeHolderPicker
            }}
            doneText="Chọn"
            value={valueCat}
            placeholderTextColor="#e3e3e3"
            Icon={() => (
              <IconButton
                icon="drawer"
                size={22}
                propsStyles={styles.iconPicker}
              />
            )}
          />
        </View>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.rowInline}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>Loại Giấy(*):</Text>
          </View>
          <RNPickerSelect
            placeholder={{
              label: 'Chọn giấy ',
              value: null,
              color: '#e3e3e3',
            }}
            value={!editOrder || this.id_paper === 0 ? undefined : this.id_paper}
            items={listPaper}
            onValueChange={this.changePaper}
            style={{
              inputIOS: styles.inputPicker,
              viewContainer: [styles.containerPicker, styles.customContainerPicker],
              placeholder: styles.placeHolderPicker
            }}
            doneText="Chọn"
            placeholderTextColor="#e3e3e3"
            Icon={() => (
              <IconButton
                icon="doc"
                size={22}
                propsStyles={{
                  color: color.mainAppColor,
                  left: 10
                }}
              />
            )}
          />
        </View>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={[styles.rowInline, { paddingTop: 20 }]}>
          <View style={[styles.text, { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }]}>
            <Text style={styles.subtitleMethod}>
              Quy cách(*):
            </Text>
            <Text style={[styles.subtitleMethod, { fontSize: 12, paddingTop: 5 }]}>
              Dài x Rộng (mm)
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Input
              defaultValue={this.widthMethod}
              keyboardType="numeric"
              containerStyle={styles.containerSize}
              inputContainerStyle={styles.containerInputSize}
              inputStyle={styles.inputSize}
              onChangeText={this.changeWidthMethod}
            />
            <Text style={styles.xText}> X </Text>
            <Input
              defaultValue={this.heightMethod}
              keyboardType="numeric"
              containerStyle={styles.containerSize}
              inputContainerStyle={styles.containerInputSize}
              inputStyle={styles.inputSize}
              onChangeText={this.changeHeightMethod}
            />
          </View>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <CheckBox
                checked={!customSize}
                iconRight
                title="Cơ bản"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                size={16}
                checkedColor={color.mainAppColor}
                uncheckedColor={color.secondAppColor}
                containerStyle={[styles.containerRadio, { width: 100 }]}
                textStyle={styles.textRadio}
                onPress={this.changeCustomSize}
              />
              <CheckBox
                checked={customSize}
                iconRight
                title="Tuỳ chỉnh"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor={color.mainAppColor}
                uncheckedColor={color.secondAppColor}
                size={16}
                containerStyle={[styles.containerRadio, { width: 100 }]}
                textStyle={styles.textRadio}
                onPress={this.changeCustomSize}
              />
            </View> */}
        </View>
        {/* {!customSize
            ? (
              <View style={styles.row}>
                <RNPickerSelect
                  placeholder={{
                    label: 'Chọn giấy a4, a3.. ',
                    value: null,
                    color: '#e3e3e3',
                  }}
                  value={!editOrder || this.id_method === 0 ? undefined : this.id_method}
                  items={this.listBasic}
                  onValueChange={this.changeMethod}
                  style={{
                    inputIOS: styles.inputPicker,
                    viewContainer: [styles.containerPicker],
                    placeholder: styles.placeHolderPicker
                  }}
                  doneText="Chọn"
                  placeholderTextColor="#e3e3e3"
                  Icon={() => (
                    <IconButton
                      icon="docs"
                      size={22}
                      propsStyles={{
                        color: color.mainAppColor,
                      }}
                    />
                  )}
                />
              </View>
            )
            : (
              <View style={styles.rowInline}>
                <Text style={[styles.subtitleSection, { width: 150 }]}>Dài x Rộng (mm)</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <Input
                    defaultValue={this.widthMethod}
                    keyboardType="numeric"
                    containerStyle={styles.containerSize}
                    inputContainerStyle={styles.containerInputSize}
                    inputStyle={styles.inputSize}
                    onChangeText={this.changeWidthMethod}
                  />
                  <Text style={styles.xText}>X </Text>
                  <Input
                    defaultValue={this.heightMethod}
                    keyboardType="numeric"
                    containerStyle={styles.containerSize}
                    inputContainerStyle={styles.containerInputSize}
                    inputStyle={styles.inputSize}
                    onChangeText={this.changeHeightMethod}
                  />
                </View>
              </View>
            )
          } */}
        {/* <Text style={[styles.subtitleSection, styles.secondSubTitle]}>Loại In</Text> */}
        <View style={styles.rowInline}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>Mặt in(*):</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <CheckBox
              checked={isFace}
              iconRight
              title="1 Mặt"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              size={16}
              checkedColor={color.mainAppColor}
              uncheckedColor={color.secondAppColor}
              containerStyle={styles.containerRadio}
              textStyle={styles.textRadio}
              onPress={() => this.changeFaceSize(1)}
            />
            <CheckBox
              checked={!isFace}
              iconRight
              title="2 Mặt"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor={color.mainAppColor}
              uncheckedColor={color.secondAppColor}
              size={16}
              containerStyle={styles.containerRadio}
              textStyle={styles.textRadio}
              onPress={() => this.changeFaceSize(2)}
            />
          </View>
        </View>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.rowInline}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>Màu in(*):</Text>
          </View>
          <RNPickerSelect
            placeholder={{
              label: 'Chọn màu ',
              value: null,
              color: '#e3e3e3',
            }}
            value={!editOrder || this.print_type_ids === 0 ? undefined : this.print_type_ids}
            items={listColorPrint}
            onValueChange={this.changeColor}
            style={{
              inputIOS: styles.inputPicker,
              viewContainer: [styles.containerPicker, styles.customContainerPicker],
              placeholder: styles.placeHolderPicker
            }}
            doneText="Chọn"
            // value={values.ward}
            placeholderTextColor="#e3e3e3"
            Icon={() => (
              <IconButton
                icon="tag"
                size={22}
                propsStyles={{
                  color: color.mainAppColor,
                  left: 10
                }}
              />
            )}
          />
        </View>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
      </Container>
    );
  }
}
export default detailOrder2;
