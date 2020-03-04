import React, { PureComponent } from 'react';
import { View, Switch, TouchableOpacity } from 'react-native';
import {
  Button, Input, Divider, Text, CheckBox
} from 'react-native-elements';
import { GETWARD } from '@constants/action-names';
import { Formik } from 'formik';
import { initValid, initField, ignoreField } from '@utils/yup';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Colors from '@constants/color';
import { navigateScreen, checkCurrentTab } from '@navigation/navigation';
import { screenKeys } from '@constants/screenKeys';
import RNPickerSelect from 'react-native-picker-select';
import * as yup from 'yup';
import { getIdByLabel } from '@utils/common';
import styles from './styles';

class FormCustomer extends PureComponent {
  constructor(props) {
    super(props);
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    this.fullDate = `${date}/${month}/${year}`;
    const { data } = this.props;
    const isTown = data && !data.district && !data.ward;
    this.state = {
      frequenter: data && data.customer_type ? data.customer_type : 0,
      company_name: data && data.company ? data.company.company_name : '',
      company: data && data.company ? data.company : null,
      // company_code,
      company_id: data && data.company ? data.company.id : '',
      isTown,
      personal: false,
    };
    this.refForm = null;
    this.initFormFields();
  }

  initFormFields = (listIgnore = []) => {
    const { listFields, data } = this.props;
    const { company_name } = this.state;
    let fields = listFields;
    if (listIgnore.length > 0) {
      fields = ignoreField(listFields, listIgnore);
    }
    this.initFields = initField(fields, data);
    this.initFields.company_name = company_name;
    this.validSchema = initValid(fields);
  }

  onChangeTypeCustomer = () => {
    const { frequenter } = this.state;
    this.setState({
      frequenter: !frequenter
    });
  }

  onSubmit = (values, action) => {
    const { create } = this.props;
    const { frequenter, personal, isTown } = this.state;
    values.customer_type = frequenter;
    const { company_id, company_name } = this.state;
    values.company_name = company_name;
    if (!personal) {
      values.company_id = company_id;
    }
    // const { configReducer: { listDistrict = [], listWard = [] } } = this.props;
    // const data_district = listDistrict.length > 0 && values.district !== '' ? listDistrict.filter(dis => dis.value === values.district) : '';
    // const data_ward = listWard.length > 0 && values.ward !== '' ? listWard.filter(dis => dis.value === values.ward) : '';
    // values.district_name = data_district !== '' && data_district.length > 0 ? data_district[0].label : '';
    // values.ward_name = data_ward !== '' && data_ward.length > 0 ? data_ward[0].label : '';
    values.personal = personal;
    values.isTown = isTown;
    create({ values, action });
  }

  setCompany = (value) => {
    this.setState({
      company_name: value.company_name,
      // company_code: value.company_code,
      company_id: value.id
    }, () => {
      if (this.refForm) {
        const { company_name } = this.state;
        this.refForm.setFieldValue('company_name', company_name);
      }
    });
  }

  navigateListCompany = () => {
    const passProps = {
      setCompany: this.setCompany
    };
    navigateScreen(
      screenKeys.Company,
      { bottomTabs: false, passProps }
    );
  }

  updateCompany = (company) => {
    this.setState({
      company,
      company_name: company.company_name
    });
  }

  navigateCompany = () => {
    const currentTab = checkCurrentTab();
    if (currentTab === screenKeys.Settings) {
      const { company } = this.state;
      navigateScreen(screenKeys.CreateCompany,
        {
          bottomTabs: false,
          passProps:
          {
            data: company,
            updateCompany: this.updateCompany
          }
        });
    } else {
      this.navigateListCompany();
    }
  }

  onSelecDistrict = () => {
    // const { loadDistrict } = this.props;
    // const { district = 0 } = values;
    // loadDistrict({ typeAddress: GETWARD, id: district });
  }

  onSwitchChange = (isTown) => {
    const { personal } = this.state;
    const listIgnore = personal ? ['company_name'] : [];
    if (isTown) {
      listIgnore.push(...['district', 'ward']);
    }
    this.initFormFields(listIgnore);
    this.setState({
      isTown
    });
  }

  onChangeTypePersonal = () => {
    const { personal, isTown } = this.state;
    const changePersonal = !personal;
    const listIgnore = isTown ? ['district', 'ward'] : [];
    if (changePersonal) {
      listIgnore.push('company_name');
    }
    this.initFormFields(listIgnore);
    this.setState({
      personal: changePersonal
    });
  }

  renderCompany({
    handleChange, setFieldTouched, touched, errors
  }) {
    const { company_name, personal } = this.state;
    const fullname = company_name !== '' ? company_name : '';
    if (personal) return null;
    return (
      <View>
        <View style={styles.blockAddressInfo}>
          <Text style={styles.title}>
            Thông tin công ty
          </Text>
          <Divider style={styles.dividerHeight} />
          <TouchableOpacity onPress={this.navigateCompany} style={styles.blockListCompany}>
            {/* <Button
              onPress={this.navigateListCompany}
              titleStyle={styles.inputStyleCompany}
              buttonStyle={styles.btnCompany}
              iconRight
              title="Danh sách công ty"
            /> */}
            <Input
              pointerEvents="none"
              editable={false}
              value={fullname}
              placeholder="Chọn công ty từ danh sách"
              onChangeText={handleChange('company_name')}
              onBlur={() => setFieldTouched('company_name')}
              placeholderTextColor="#a3a3a3"
              containerStyle={styles.containerInput}
              inputContainerStyle={styles.containerInputStyles}
              inputStyle={styles.inputStyleDisable}
              errorStyle={styles.errorStyle}
              errorMessage={touched.company_name && errors.company_name ? errors.company_name : ''}
              rightIcon={(
                <Icon
                  onPress={this.navigateCompany}
                  name="arrow-right"
                  size={22}
                  style={styles.iconInput}
                />
              )}
            />
          </TouchableOpacity>
          <Divider style={styles.divider} />
        </View>
      </View>
    );
  }


  renderInformation({
    handleChange, setFieldTouched, values, touched, errors
  }) {
    const { frequenter } = this.state;
    return (
      <View style={styles.blockBasicInfo}>
        <Text style={styles.title}>
          Thông tin người đại diện
        </Text>
        <Divider style={styles.dividerHeight} />
        <Input
          value={values.name}
          placeholder="Họ tên"
          onChangeText={handleChange('name')}
          onBlur={() => setFieldTouched('name')}
          rightIcon={(
            <Icon
              name="user"
              size={22}
              style={styles.iconInput}
            />
          )}
          placeholderTextColor="#e3e3e3"
          containerStyle={styles.containerInput}
          inputContainerStyle={styles.containerInputStyles}
          inputStyle={styles.inputStyle}
          errorStyle={styles.errorStyle}
          errorMessage={touched.name && errors.name ? errors.name : ''}
        />
        <Divider style={styles.divider} />
        <Input
          value={values.email}
          placeholder="Email"
          onChangeText={handleChange('email')}
          onBlur={() => setFieldTouched('email')}
          rightIcon={(
            <Icon
              name="envelope"
              size={22}
              style={styles.iconInput}
            />
          )}
          placeholderTextColor="#e3e3e3"
          containerStyle={styles.containerInput}
          inputContainerStyle={styles.containerInputStyles}
          inputStyle={styles.inputStyle}
          errorStyle={styles.errorStyle}
          errorMessage={touched.email && errors.email ? errors.email : ''}
        />
        <Divider style={styles.divider} />
        <Input
          maxLength={11}
          value={values.phone}
          placeholder="Điện thoại"
          keyboardType="numeric"
          onChangeText={handleChange('phone')}
          onBlur={() => setFieldTouched('phone')}
          rightIcon={(
            <Icon
              name="phone"
              size={22}
              style={styles.iconInput}
            />
          )}
          placeholderTextColor="#e3e3e3"
          containerStyle={styles.containerInput}
          inputContainerStyle={styles.containerInputStyles}
          inputStyle={styles.inputStyle}
          errorStyle={styles.errorStyle}
          errorMessage={touched.phone && errors.phone ? errors.phone : ''}
        />
        <Divider style={styles.divider} />
        <View style={styles.checkboxContainer}>
          <CheckBox
            left
            title="Khách mới/ vãng lai"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={!frequenter}
            checkedColor={Colors.mainAppColor}
            containerStyle={styles.checkBoxStyles}
            onPress={this.onChangeTypeCustomer}
          />
          <CheckBox
            right
            title="Khách quen"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={frequenter}
            checkedColor={Colors.mainAppColor}
            containerStyle={styles.checkBoxStyles}
            onPress={this.onChangeTypeCustomer}
          />
        </View>
      </View>
    );
  }

  toggleWardPicker = () => {
    if (this.wardPickerSelect) {
      const {
        loadDistrict,
        data: { district },
        configReducer: { listDistrict = [], listWard = [] }
      } = this.props;
      if (listWard.length === 0) {
        const districtId = getIdByLabel(district, listDistrict);
        loadDistrict({ typeAddress: GETWARD, id: districtId });
        setTimeout(() => { this.wardPickerSelect.togglePicker(true); }, 1000);
      } else {
        this.wardPickerSelect.togglePicker(true);
      }
    }
  }

  renderAddress = ({
    handleChange, setFieldTouched, values, touched, errors
  }) => {
    const { isTown, personal } = this.state;
    const titleAddress = !isTown ? 'Trong thành phố HCM' : 'Ngoại thành';
    const { configReducer: { listCityData = [] }, data } = this.props;
    const listDistrict = listCityData.map((d) => {
      const district = {
        label: d.name,
        value: d.name
      };
      return district;
    });
    const district = listCityData.find(i => i.name === values.district);
    const districtName = district ? district.name : '';
    let listWard = district ? district.wards : [];
    const enableWard = listWard.length > 0 || values.ward !== '';
    const ward = listWard.find(i => i.name === values.ward);
    const wardName = ward ? ward.name : '';
    listWard = listWard.map((d) => {
      const w = {
        label: d.name,
        value: d.name
      };
      return w;
    });

    return (
      <View style={styles.blockBasicInfo}>
        <Text style={styles.title}>
          Địa chỉ khách hàng
        </Text>
        <Divider style={styles.dividerHeight} />
        <View style={styles.blockSwitch}>
          <Text style={styles.textSwitch}>{titleAddress}</Text>
          <Switch
            value={isTown}
            onValueChange={this.onSwitchChange}
            trackColor={{ false: '#e3e3e3', true: '#D7263D' }}
          />
        </View>
        {!isTown
          && (
            <View style={styles.blockListCompany}>
              <View style={styles.blockRowAddress}>
                <RNPickerSelect
                  placeholder={{
                    label: 'Chọn quận',
                    value: null,
                  }}
                  items={listDistrict}
                  onValueChange={handleChange('district')}
                  style={{
                    inputIOS: styles.inputPicker,
                    viewContainer: styles.viewPickerContainer,
                  }}
                  onDonePress={() => this.onSelecDistrict(values)}
                  doneText="Chọn"
                  value={districtName}
                  placeholderTextColor="#e3e3e3"
                  Icon={() => (
                    <Icon
                      name="directions"
                      size={22}
                      style={{
                        color: Colors.mainAppColor,
                        paddingRight: 20
                      }}
                    />
                  )}
                />
                <Text style={styles.errorStyleAddress}>{touched.district && errors.district ? errors.district : ''}</Text>
              </View>
              {enableWard && (
                <View style={styles.blockRowAddress}>
                  <RNPickerSelect
                    ref={(p) => { this.wardPickerSelect = p; }}
                    placeholder={{
                      label: 'Chọn phường',
                      value: null,
                      color: '#e3e3e3',
                    }}
                    disabled={!enableWard}
                    items={listWard}
                    onValueChange={handleChange('ward')}
                    style={{
                      inputIOS: styles.inputPicker,
                      viewContainer: styles.viewPickerContainer,
                    }}
                    doneText="Chọn"
                    value={wardName}
                    placeholderTextColor="#e3e3e3"
                    Icon={() => (
                      <Icon
                        name="direction"
                        size={22}
                        style={{
                          color: !enableWard ? '#e3e3e3' : Colors.mainAppColor,
                          paddingRight: 5
                        }}
                      />
                    )}
                  />
                  <Text style={styles.errorStyleAddress}>{touched.ward && errors.ward ? errors.ward : ''}</Text>
                </View>
              )}
              <Divider style={styles.divider} />
            </View>
          )
        }
        <Input
          value={values.address}
          placeholder="Địa chỉ"
          onChangeText={handleChange('address')}
          onBlur={() => setFieldTouched('address')}
          rightIcon={(
            <Icon
              name="location-pin"
              size={22}
              style={styles.iconInput}
            />
          )}
          placeholderTextColor="#e3e3e3"
          containerStyle={styles.containerInput}
          inputContainerStyle={styles.containerInputStyles}
          inputStyle={styles.inputStyle}
          errorStyle={styles.errorStyle}
          errorMessage={touched.address && errors.address ? errors.address : ''}
        />
        {!data && (
          <View style={styles.checkboxContainer}>
            <CheckBox
              left
              title="Cá nhân"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={personal}
              checkedColor={Colors.mainAppColor}
              containerStyle={styles.checkBoxStyles}
              onPress={this.onChangeTypePersonal}
            />
            <CheckBox
              right
              title="Công ty"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={!personal}
              checkedColor={Colors.mainAppColor}
              containerStyle={styles.checkBoxStyles}
              onPress={this.onChangeTypePersonal}
            />
          </View>
        )
        }
      </View>
    );
  }

  render() {
    const { data } = this.props;
    const title = data ? 'Cập nhật khách hàng' : 'Tạo khách hàng';
    return (
      <Formik
        initialValues={this.initFields}
        onSubmit={this.onSubmit}
        validationSchema={yup.object().shape(
          this.validSchema
        )}
      >
        {
          ((propsForm) => {
            this.refForm = propsForm;
            return (
              <View style={styles.halfViewEnd}>
                <View style={styles.halfViewStart}>
                  <Text style={styles.dateStyles}>
                    Ngày:
                    {' '}
                    {this.fullDate}
                  </Text>
                </View>
                {this.renderInformation(propsForm)}
                {this.renderAddress(propsForm)}
                {!data && this.renderCompany(propsForm)}
                <Button
                  buttonStyle={styles.btnStyle}
                  containerStyle={styles.btnContainerStyle}
                  loading={!!propsForm.isSubmitting}
                  loadingStyle={styles.loadingStyle}
                  titleStyle={styles.titleStyle}
                  title={propsForm.isSubmitting ? 'xin chờ...' : title}
                  onPress={propsForm.handleSubmit}
                  disabled={!propsForm.isValidating && propsForm.isSubmitting}
                />
              </View>
            );
          })
        }
      </Formik>
    );
  }
}

export default FormCustomer;
