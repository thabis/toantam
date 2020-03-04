import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { Formik } from 'formik';
import { initValid, initField } from '@utils/yup';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';
import styles from './styles';

export default class FormInfo extends PureComponent {
  constructor(props) {
    super(props);
    const { fields = {} } = this.props;
    this.fields = fields;
    this.initFields = initField(this.fields);
    this.validSchema = initValid(this.fields);
    this.renderFields = this.renderFields.bind(this);
  }
  // validateForm = (values) => {
  //   const errors = {};
  //   if (!values.email) {
  //     errors.email = 'Required';
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address';
  //   }
  //   return errors;
  // }

  onSubmit = (values, action) => {
    const { doActionFirst, doActionSecond } = this.props;
    const data = {
      values,
      action,
    };
    if (values.isLogin) {
      doActionFirst(data);
    } else if (values.isRegister) {
      doActionSecond(data);
    }
  }

  renderFields = (data, key, props) => {
    const {
      values,
      handleChange,
      setFieldTouched,
      touched,
      errors
    } = props;
    const typeKeyboard = data.type === 'email' ? 'email-address' : 'default';
    return (
      <Input
        key={key}
        keyboardType={typeKeyboard}
        secureTextEntry={data.secureTextEntry}
        value={values[data.field] ? values[data.field] : null}
        placeholder={data.label}
        onChangeText={handleChange(data.field)}
        onBlur={() => setFieldTouched(data.field)}
        leftIcon={(
          <Icon
            name={data.icon}
            size={28}
            style={styles.iconInput}
          />
        )}
        placeholderTextColor="#fff"
        containerStyle={styles.containerInput}
        inputContainerStyle={styles.containerInputStyles}
        inputStyle={styles.inputStyle}
        errorStyle={styles.errorStyle}
        errorMessage={touched[data.field] && errors[data.field] ? errors[data.field] : ''}
      />
    );
  }

  iconButton = () => (
    <Icon
      icon="unlock-alt"
      size={25}
      color="#517fa4"
    />
  );

  render() {
    return (
      <Formik
        initialValues={this.initFields}
        onSubmit={this.onSubmit}
        validationSchema={yup.object().shape(
          this.validSchema
        )}
      >
        {props => (
          <View style={styles.halfViewEnd}>
            {
              this.fields.map((data, key) => this.renderFields(data, key, props))
            }
            <Button
              buttonStyle={styles.btnStyle}
              containerStyle={styles.btnContainerStyle}
              loading={!!props.isSubmitting}
              loadingStyle={styles.loadingStyle}
              titleStyle={styles.titleStyle}
              title={props.isSubmitting ? 'xin chờ...' : 'Đăng nhập'}
              onPress={async () => {
                await props.setFieldValue('isLogin', true);
                props.handleSubmit();
              }
              }
              disabled={!props.isValidating && props.isSubmitting}
            />
            <View style={styles.containerRegister}>
              <View style={styles.lineStyles} />
              <Text style={{ color: '#fff' }}>Hoặc</Text>
              <View style={styles.lineStyles} />
            </View>
            <Button
              buttonStyle={styles.btnStyle}
              containerStyle={styles.btnContainerStyle}
              loading={!!props.isSubmitting}
              loadingStyle={styles.loadingStyle}
              titleStyle={styles.titleStyle}
              title={props.isSubmitting ? 'xin chờ...' : 'Đăng ký'}
              onPress={async () => {
                await props.setFieldValue('isRegister', true);
                props.handleSubmit();
              }
              }
              disabled={!props && props.isSubmitting}
            />
          </View>
        )}
      </Formik>
    );
  }
}
