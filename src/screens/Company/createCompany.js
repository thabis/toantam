import React, { PureComponent } from 'react';
import { View, Switch } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Container from '@components/container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '@components/header/header';
import { GETDISTRICT, GETWARD } from '@constants/action-names';
import { pop } from '@navigation/navigation';
import {
  Button, Input, Divider, Text
} from 'react-native-elements';
import { Formik } from 'formik';
import { initValid, initField, ignoreField } from '@utils/yup';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '@constants/color';
import * as yup from 'yup';
import {
  EMAIL_VALID,
  PHONE_LENGTH,
  DISTRICT_REQUIRED,
  WARD_REQUIRED,
  ADDRESS_REQUIRED,
  COMPANY_REQUIRED,
  // CODECOMPANY_REQUIRED
  NUMBER_VALID
} from '@constants/message';

import styles from './styles';

const listFields = [
  {
    label: 'Mã công ty',
    field: 'id',
    type: 'text',
    require: false,
    messageRequired: '',
  },
  {
    label: 'Tên công ty',
    field: 'company_name',
    type: 'text',
    require: true,
    messageRequired: COMPANY_REQUIRED,
  },
  // {
  //   label: 'Mã công ty',
  //   field: 'company_code',
  //   type: 'text',
  //   require: true,
  //   messageRequired: CODECOMPANY_REQUIRED,
  // },
  {
    label: 'Mã số thuế',
    field: 'tax_code',
    type: 'number',
    messageValid: NUMBER_VALID
  },
  {
    label: 'Email',
    field: 'email',
    type: 'email',
    messageValid: EMAIL_VALID
  },
  {
    label: 'Điện thoại',
    field: 'phone',
    type: 'phone',
    min: 11,
    messageValid: PHONE_LENGTH
  },
  {
    label: 'Quận',
    field: 'district',
    type: 'select',
    messageRequired: DISTRICT_REQUIRED,
  },
  {
    label: 'Phường/Huyện',
    field: 'ward',
    type: 'select',
    messageRequired: WARD_REQUIRED,
  },
  {
    label: 'Địa chỉ',
    field: 'address',
    type: 'text',
    messageRequired: ADDRESS_REQUIRED,
  },
];
class CreateCompany extends PureComponent {
  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.initFormFields();
    const { data } = this.props;
    const isTown = data && !data.district && !data.ward;
    this.state = {
      isTown
    };
  }

  UNSAFE_componentWillMount() {
    const { loadDistrict } = this.props;
    loadDistrict({ typeAddress: GETDISTRICT });
  }

  componentWillUnmount() {
    // Not mandatory
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  initFormFields = (listIgnore = []) => {
    let fields = listFields;
    if (listIgnore.length > 0) {
      fields = ignoreField(listFields, listIgnore);
    }
    const { data } = this.props;
    this.initFields = initField(fields, data);
    this.validSchema = initValid(fields);
  }

  onSwitchChange = (isTown) => {
    if (isTown) {
      this.initFormFields(['district', 'ward']);
    }
    this.setState({
      isTown
    });
  }

  onSelecDistrict = (values) => {
    // const { loadDistrict } = this.props;
    // const { district = 0 } = values;
    // loadDistrict({ typeAddress: GETWARD, id: district });
  }

  onSubmit = (values, action) => {
    const { create, componentId } = this.props;
    create({
      values,
      action,
      componentId,
      // onCompleted: (company) => { updateCompany(company); }
    });
  }

  // onCompleted = (company) => {
  //   const { updateCompany } = this.props;
  //   updateCompany(company);
  // }

  back = () => {
    const { componentId } = this.props;
    pop(componentId);
  }

  renderAddress({
    handleChange, setFieldTouched, values, touched, errors
  }) {
    const { isTown } = this.state;
    const titleAddress = !isTown ? 'Trong thành phố HCM' : 'Ngoại thành';
    const { configReducer: { listCityData = [] } } = this.props;
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
      <View style={styles.blockAddressInfo}>
        <Text style={styles.title}>
          Thông tin công ty
        </Text>
        <Divider style={styles.dividerHeight} />
        <Input
          value={values.company_name}
          placeholder="Tên công ty"
          onChangeText={handleChange('company_name')}
          onBlur={() => setFieldTouched('company_name')}
          rightIcon={(
            <Icon
              name="organization"
              size={25}
              style={styles.iconInput}
            />
          )}
          placeholderTextColor="#e3e3e3"
          containerStyle={styles.containerInput}
          inputContainerStyle={styles.containerInputStyles}
          inputStyle={styles.inputStyle}
          errorStyle={styles.errorStyle}
          errorMessage={touched.company_name && errors.company_name ? errors.company_name : ''}
        />
        <Divider style={styles.divider} />
        {/* <Input
          value={values.company_code}
          maxLength={5}
          placeholder="Mã công ty"
          onChangeText={handleChange('company_code')}
          onBlur={() => setFieldTouched('company_code')}
          rightIcon={(
            <Icon
              name="key"
              size={22}
              style={styles.iconInput}
            />
          )}
          placeholderTextColor="#e3e3e3"
          containerStyle={styles.containerInput}
          inputContainerStyle={styles.containerInputStyles}
          inputStyle={styles.inputStyle}
          errorStyle={styles.errorStyle}
          errorMessage={touched.company_code && errors.company_code ? errors.company_code : ''}
        />
        <Divider style={styles.divider} /> */}
        <View style={styles.blockDistrict}>
          <Input
            value={values.tax_code}
            maxLength={10}
            keyboardType="numeric"
            placeholder="Mã số thuế"
            onChangeText={handleChange('tax_code')}
            onBlur={() => setFieldTouched('tax_code')}
            placeholderTextColor="#e3e3e3"
            containerStyle={[styles.containerInput, { width: '85%' }]}
            inputContainerStyle={styles.containerInputStyles}
            inputStyle={styles.inputStyle}
            errorStyle={styles.errorStyle}
            errorMessage={touched.tax_code && errors.tax_code ? errors.tax_code : ''}
          />
          <Text style={styles.taxCode}>MST</Text>
        </View>
        <Divider style={styles.divider} />
        <Input
          value={values.email}
          placeholder="Email"
          keyboardType="email-address"
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
            <View style={styles.blockDistrict}>
              <View style={styles.blockRowAddress}>
                <RNPickerSelect
                  placeholder={{
                    label: 'Chọn quận',
                    value: ''
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
                    placeholder={{
                      label: 'Chọn phường',
                      value: null,
                      color: '#e3e3e3',
                    }}
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
      </View>
    );
  }

  render() {
    const { data } = this.props;
    const title = data ? 'Cập nhật công ty' : 'Tạo công ty';
    return (
      <Container>
        <HeaderComponent
          title={title}
          iconLeft="arrow-left-circle"
          leftAction={this.back}
          defaultHeader
          size={25}
        />
        <KeyboardAwareScrollView
          scrollEnabled
          // bounces={false}
          extraScrollHeight={100}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          viewIsInsideTabBar
        >
          <Formik
            initialValues={this.initFields}
            onSubmit={this.onSubmit}
            validationSchema={yup.object().shape(
              this.validSchema
            )}
          >
            {
              (propsForm => (
                <View style={styles.halfViewEnd}>
                  {this.renderAddress(propsForm)}
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
              ))}
          </Formik>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

export default CreateCompany;
