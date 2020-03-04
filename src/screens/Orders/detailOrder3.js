/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { PureComponent } from 'react';
import {
  View, Switch, TouchableOpacity, FlatList
} from 'react-native';
import Container from '@components/container';
import {
  Text, Divider, CheckBox, Overlay, Button, Input
} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { IconButton } from '@components/icon/icon';
import styles from './styleCreate';
import color from '../../constants/color';

class detailOrder3 extends PureComponent {
  constructor(props) {
    super(props);
    const { editOrder, orderReducer, customerName } = this.props;
    const { outsources, name } = orderReducer;
    this.replaceName = `${customerName.replace(' ', '_')}_`;
    this.state = {
      rolling: !(editOrder && this.getRollingValue(outsources) === 0),
      openModal: false,
      listSelectOutSource: this.addCheckItem(),
      name: editOrder && name !== '' ? name : this.replaceName
    };
    this.selectValueOutSource = this.selectValueOutSource.bind(this);
    this.rollingValue = editOrder && outsources.length > 0 ? this.getRollingValue(outsources) : 0;
  }

  getRollingValue = (outsources) => {
    const listRolling = outsources.filter(e => e.group === 'rolling');
    if (listRolling.length > 0) {
      return listRolling[0].id;
    }
    return 0;
  }

  addCheckItem = () => {
    const { listOutSourceDiff, orderReducer, editOrder } = this.props;
    const { outsources } = orderReducer;
    let litsOther = [];
    if (editOrder) {
      litsOther = outsources.filter(e => e.group === 'other');
    }
    const listOutSourceCheck = [];
    listOutSourceDiff.map((value) => {
      let isCheck = editOrder ? litsOther.find(e => e.id === value.value) : false;
      if (isCheck) {
        isCheck = true;
      }
      listOutSourceCheck.push({
        label: value.label,
        value: value.value,
        check: isCheck,
      });
    });
    return listOutSourceCheck;
  }

  onchageRolling = (rolling) => {
    this.setState({ rolling });
  }

  openList = () => {
    const { openModal } = this.state;
    this.setState({ openModal: !openModal });
  }

  selectOutSource = () => {
    this.openList();
  }

  selectValueOutSource = (item) => {
    const { listSelectOutSource } = this.state;
    const listNew = [];
    listSelectOutSource.map((e) => {
      if (e.value === item.value) {
        e.check = !item.check;
      }
      listNew.push(e);
    });

    this.setState({
      listSelectOutSource: listNew
    });
  }

  changeRolling = (value) => {
    this.rollingValue = value;
  }

  componentDidUpdate(prevProps) {
    const { customerName, editOrder } = this.props;
    if (customerName !== prevProps.customerName) {
      this.replaceName = `${customerName.replace(' ', '_')}_`;
      if (!editOrder) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          name: this.replaceName
        });
      }
    }
  }

  changeFileName = (value) => {
    this.aliasName = value;
    const name = `${this.replaceName}${value}`;
    this.setState({
      name
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderListOutSource = ({ item, key }) => {
    const { label, check } = item;
    return (
      <View>
        <CheckBox
          key={key}
          checked={check}
          title={label}
          checkedColor={color.mainAppColor}
          uncheckedColor={color.mainAppColor}
          size={16}
          containerStyle={[styles.containerRadio, { width: 200 }]}
          textStyle={styles.textRadio}
          onPress={() => this.selectValueOutSource(item)}
        />
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
      </View>
    );
  }

  listOutSource = () => {
    const { listSelectOutSource } = this.state;
    return (
      <View style={styles.containerOutsource}>
        {listSelectOutSource.map((e) => {
          if (e.check) {
            return (
              <View key={e.value} style={styles.itemOutSource}>
                <Text style={{ color: '#fff' }}>{e.label}</Text>
              </View>
            );
          }
        })}
      </View>
    );
  };

  render() {
    const {
      rolling, openModal,
      listSelectOutSource,
      name
    } = this.state;
    const {
      listOutSourceRolling, editOrder = false, orderReducer,
    } = this.props;
    const { status } = orderReducer;
    const titleRolling = rolling ? 'Cán màng' : 'Không cán màng';
    const styleDisable = status !== 0 && editOrder ? { backgroundColor: 'rgba(183,183,183,0.5)', opacity: 0.8, padding: 5 } : null;
    const disableView = status !== 0 && editOrder ? 'none' : 'auto';
    this.aliasName = name.replace(this.replaceName, '');
    return (
      <Container
        pointerEvents={disableView}
        stylesContainer={[styles.section, styleDisable]}
      >
        <Text style={styles.titleSection}>Chi tiết sản xuất (2)</Text>
        <View style={styles.row}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>Tên file thiết kế(*):</Text>
          </View>
          <View style={styles.text}>
            <Input
              defaultValue={this.aliasName}
              onChangeText={this.changeFileName}
              placeholder="Nhập tên file"
              placeholderTextColor="#e3e3e3"
              containerStyle={styles.containerInput}
              inputContainerStyle={styles.containerInputStyles}
              errorStyle={styles.errorStyle}
              inputStyle={styles.inputSize}
            />
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>Tên file đầy đủ:</Text>
            <Text>{name}</Text>
          </View>
        </View>
        <Text style={[styles.subtitleSection, styles.secondSubTitle]}>Loại Gia Công</Text>
        <Divider style={{ backgroundColor: '#e3e3e3' }} />
        <View style={styles.rowInline}>
          <View style={styles.text}>
            <Text style={styles.subtitlenNotWidthSection}>{titleRolling}</Text>
          </View>
          <View>
            <Switch
              value={rolling}
              onValueChange={this.onchageRolling}
              trackColor={{ false: '#e3e3e3', true: '#D7263D' }}
            />
          </View>
        </View>
        {rolling
          && (
            <View>
              <View style={styles.rowInline}>
                <View style={styles.text}>
                  <Text style={styles.subtitlenNotWidthSection}>Chọn cán màng(*)</Text>
                </View>
                <RNPickerSelect
                  placeholder={{
                    label: 'Chọn cán màng ',
                    value: null,
                    color: '#e3e3e3',
                  }}
                  value={!editOrder || this.rollingValue === 0 ? undefined : this.rollingValue}
                  items={listOutSourceRolling}
                  onValueChange={this.changeRolling}
                  style={{
                    inputIOS: styles.inputPicker,
                    viewContainer: [styles.containerPicker, styles.customContainerPicker],
                    placeholder: styles.placeHolderPicker
                  }}
                  doneText="Chọn"
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
              {/* <View style={styles.rowInline}>
              <View style={styles.text}>
                <Text style={styles.subtitleSection}>Cách Cán</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <CheckBox
                  iconRight
                  title="Cán bóng"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor={color.mainAppColor}
                  uncheckedColor={color.secondAppColor}
                  size={16}
                  containerStyle={[styles.containerRadio, { left: 28, width: 100 }]}
                  textStyle={styles.textRadio}
                  onPress={this.changeCustomSize}
                />
                <CheckBox
                  iconRight
                  title="Cán mờ"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor={color.mainAppColor}
                  uncheckedColor={color.secondAppColor}
                  size={16}
                  containerStyle={[styles.containerRadio, { left: 20, width: 100 }]}
                  textStyle={styles.textRadio}
                  onPress={this.changeCustomSize}
                />
              </View>
            </View> */}
            </View>
          )}
        <View style={styles.rowInline}>
          <View style={styles.text}>
            <Text style={styles.subtitleSection}>Gia công khác</Text>
          </View>
          <TouchableOpacity onPress={this.openList}>
            <View style={styles.text}>
              <Text style={{ textDecorationLine: 'underline', color: 'red' }}>Danh sách gia công</Text>
            </View>
          </TouchableOpacity>
        </View>
        {openModal
          && (
            <Overlay
              isVisible={openModal}
              windowBackgroundColor="rgba(0, 0, 0, .5)"
              width="80%"
              height="70%"
            >
              <View style={styles.viewModalTop}>
                <Text style={styles.titleSection}>Danh sách gia công</Text>
                <FlatList
                  data={listSelectOutSource}
                  renderItem={this.renderListOutSource}
                  keyExtractor={this.keyExtractor}
                />
                <View style={[styles.row, { justifyContent: 'space-evenly' }]}>
                  <Button
                    type="outline"
                    containerStyle={styles.btnContainerStyle}
                    titleStyle={styles.archiveTitle}
                    buttonStyle={styles.btnArchive}
                    title="Chọn"
                    onPress={this.selectOutSource}
                  />

                </View>
              </View>
            </Overlay>
          )}
        {listSelectOutSource.length > 0 && this.listOutSource()}
      </Container>
    );
  }
}
export default detailOrder3;
