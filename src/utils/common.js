import { StatusType } from '@constants/statusType';
export const histlopTouch = {
  top: 10, bottom: 10, left: 10, right: 10
};

export function getIdByLabel(label, list = []) {
  const item = list.find(i => i.label === label);
  return item ? item.value : label;
}

export function getStatusType(type) {
  switch (type) {
    case StatusType.CANCEL.value:
      return StatusType.CANCEL;
    case StatusType.DRAFT.value:
      return StatusType.DRAFT;
    case StatusType.SALE.value:
      return StatusType.SALE;
    case StatusType.DESIGNING.value:
      return StatusType.DESIGNING;
    case StatusType.FEEDBACK_DESIGN.value:
      return StatusType.FEEDBACK_DESIGN;
    case StatusType.FEEDBACK_DESIGNING.value:
      return StatusType.FEEDBACK_DESIGNING;
    case StatusType.DESIGNED.value:
      return StatusType.DESIGNED;
    case StatusType.PRINT.value:
      return StatusType.PRINT;
    case StatusType.PRINTED.value:
      return StatusType.PRINTED;
    case StatusType.STORE.value:
      return StatusType.STORE;
    case StatusType.DELIVER.value:
      return StatusType.DELIVER;
    case StatusType.DONE.value:
      return StatusType.DONE;
    default:
      return null;
  }
}

export function retrieveNotificationNumber(data) {
  let newCount = 0;
  data.forEach((notification) => {
    if (!notification.read) {
      newCount += 1;
    }
  });
  return newCount;
}

export function formatCurrency(country, format, number) {
  return new Intl.NumberFormat(country, { style: 'currency', currency: format }).format(number);
}
