import * as yup from 'yup';

const initValid = (paramsField) => {
  const shape = {};
  paramsField.forEach((element) => {
    switch (element.type) {
      case 'email': {
        let fieldEmail = yup.string().email(element.messageValid && element.messageValid);
        if (element.require) {
          fieldEmail = fieldEmail.required(element.messageRequired && element.messageRequired);
        }
        shape[element.field] = fieldEmail;
        break;
      }
      case 'age': {
        let fieldAge = yup.number().positive();
        if (element.require) {
          fieldAge = fieldAge.required();
        }
        if (element.num > 0) {
          fieldAge = fieldAge.moreThan(element.num);
        }
        shape[element.field] = fieldAge;
        break;
      }
      case 'number': {
        let number = yup.number().positive(element.messageValid)
          .typeError(element.messageValid);
        if (element.require) {
          number = number.required(element.messageRequired && element.messageRequired);
        }
        shape[element.field] = number;
        break;
      }
      case 'phone': {
        let fieldPhone = yup.number().positive(element.messageValid)
          .typeError(element.messageValid);
        if (element.require) {
          fieldPhone = fieldPhone.required(element.messageRequired && element.messageRequired);
        }
        shape[element.field] = fieldPhone;
        break;
      }
      case 'password': {
        let fieldPassword = yup.string().min(6, element.messageValid
          && element.messageValid);
        if (element.require) {
          fieldPassword = fieldPassword.required(element.messageRequired
            && element.messageRequired);
        }
        shape[element.field] = fieldPassword;
        break;
      }
      case 'date_now':
        shape[element.field] = yup.date().default(() => new Date());
        break;
      default: {
        let fieldsAnother = yup.string().trim().nullable();
        if (element.require) {
          fieldsAnother = fieldsAnother.required(
            element.messageRequired && element.messageRequired
          );
        }
        shape[element.field] = fieldsAnother;
        break;
      }
    }
  });
  return shape;
};

const initField = (paramsField, values = {}) => {
  const fields = {};
  if (paramsField.length > 0) {
    paramsField.forEach((param) => {
      fields[param.field] = values[param.field] ? values[param.field] : '';
    });
  }
  return fields;
};

const ignoreField = (paramsField, listIgnore) => {
  const fields = [];
  if (paramsField.length > 0) {
    paramsField.forEach((param) => {
      if (!listIgnore.includes(param.field)) {
        fields.push(param);
      }
    });
  }
  return fields;
};
export {
  initValid,
  initField,
  ignoreField
};
