import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import FormCustomer from '@modules/form/formCustomer';
import Container from '@components/container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '@components/header/header';
import { pop } from '@navigation/navigation';
import {
  EMAIL_REQUIRED, EMAIL_VALID,
  NAME_REQUIRED,
  PHONE_REQUIRED,
  PHONE_LENGTH,
  DISTRICT_REQUIRED,
  WARD_REQUIRED,
  ADDRESS_REQUIRED,
  COMPANY_SELECT_REQUIRED,
} from '@constants/message';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const listFields = [
  {
    label: 'Mã khách hàng',
    field: 'id',
    type: 'text',
    require: false,
    messageRequired: '',
  },
  {
    label: 'Họ Tên',
    field: 'name',
    type: 'text',
    require: true,
    messageRequired: NAME_REQUIRED,
  },
  {
    label: 'Email',
    field: 'email',
    type: 'email',
    require: true,
    messageRequired: EMAIL_REQUIRED,
    messageValid: EMAIL_VALID
  },
  {
    label: 'Điện thoại',
    field: 'phone',
    type: 'phone',
    require: true,
    min: 11,
    messageRequired: PHONE_REQUIRED,
    messageValid: PHONE_LENGTH
  },
  {
    label: 'Quận',
    field: 'district',
    type: 'select',
    require: true,
    messageRequired: DISTRICT_REQUIRED,
  },
  {
    label: 'Phường/Huyện',
    field: 'ward',
    type: 'select',
    require: true,
    messageRequired: WARD_REQUIRED,
  },
  {
    label: 'Địa chỉ',
    field: 'address',
    type: 'text',
    require: true,
    messageRequired: ADDRESS_REQUIRED,
  },
  {
    label: 'Tên công ty',
    field: 'company_name',
    type: 'text',
    require: true,
    messageRequired: COMPANY_SELECT_REQUIRED,
  },
];
class CreateCustomer extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientColor = ['#56d1d5', '#56c1d5', '#56b9d5'];
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  UNSAFE_componentWillMount() {
    // const { loadCityData } = this.props;
    // loadDistrict({ typeAddress: GETDISTRICT });
    // loadCityData();
  }

  componentWillUnmount() {
    // Not mandatory
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  back = () => {
    const { componentId } = this.props;
    pop(componentId);
  }

  render() {
    const {
      configReducer, loadDistrict, create, data
    } = this.props;
    return (
      <Container>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={this.gradientColor}
        >
          <HeaderComponent
            title="Thông Tin Khách Hàng"
            iconLeft="arrow-left-circle"
            leftAction={this.back}
            defaultHeader
            containerHeader={styles.containerHeader}
            size={25}
          />
        </LinearGradient>
        <KeyboardAwareScrollView
          scrollEnabled
          bounces={false}
          // extraScrollHeight={100}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          viewIsInsideTabBar
        >
          <FormCustomer
            configReducer={configReducer}
            listFields={listFields}
            data={data}
            create={create}
            loadDistrict={loadDistrict}
          />
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

export default CreateCustomer;
