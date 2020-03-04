import React, { PureComponent } from 'react';
import { Keyboard } from 'react-native';
import FormInfo from '@components/form/formInfo';
import {
  EMAIL_REQUIRED, EMAIL_VALID,
  PASSWORD_LENGTH, PASSWORD_REQUIRED
} from '@constants/message';

class FormLogin extends PureComponent {
  constructor(props) {
    super(props);
    this.fields = [
      {
        label: 'Email',
        field: 'femail',
        type: 'email',
        require: true,
        icon: 'user',
        secureTextEntry: false,
        messageRequired: EMAIL_REQUIRED,
        messageValid: EMAIL_VALID
      },
      {
        label: 'Mật khẩu',
        field: 'fpassword',
        type: 'password',
        require: true,
        icon: 'eye',
        secureTextEntry: true,
        messageRequired: PASSWORD_REQUIRED,
        messageValid: PASSWORD_LENGTH
      }
    ];
  }

  login = (payload) => {
    Keyboard.dismiss();
    const { requestLogin } = this.props;
    setTimeout(() => {
      requestLogin(payload);
    }, 200);
  }

  register = (payload) => {
    // const { requestRegister } = this.props;
    // requestRegister(payload);
    const { action } = payload;
    alert('Bạn không thể đăng ký, xin liên hệ với Admin');
    action.setSubmitting(false);
  }

  render() {
    return (
      <FormInfo
        fields={this.fields}
        doActionFirst={this.login}
        doActionSecond={this.register}
      />
    );
  }
}

export default FormLogin;
