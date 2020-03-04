const initialState = {
  id: '',
  created_time: '',
  updated_time: null,
  order_no: '',
  name: '',
  user_id: 0,
  customer_id: 0,
  category_id: '',
  paper_id: '',
  quantity: 0,
  template_number: 0,
  reference_order: null,
  unit_price: 0,
  design_fee: 0,
  shipping_fee: 0,
  deposite: 0,
  delivery_date: '',
  payment_method: '',
  vat: false,
  print_type_ids: [],
  print_types: [],
  outsources: [],
  status: 0,
  number_print_face: 1,
  method: '',
  delivery_address: '',
  receiver_info: '',
  notes: [],
  outsource_date: '',
  saler: null
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_ALL_STATE': {
      return initialState;
    }
    case 'CLEAR_ORDER_LOCAL':
    case 'SET_ORDER_FAILED': {
      return initialState;
    }
    case 'SET_ORDER_SUCCESS': {
      const {
        id = '',
        created_time = null,
        updated_time = null,
        order_no = '',
        name = '',
        user_id = 0,
        customer_id = 0,
        category_id = '',
        paper_id = '',
        quantity = 0,
        template_number = 0,
        reference_order = null,
        unit_price = 0,
        design_fee = 0,
        shipping_fee = 0,
        deposite = 0,
        delivery_date = '',
        payment_method = '',
        vat = false,
        print_type_ids = [],
        outsources = [],
        status = 0,
        number_print_face = 1,
        method = '',
        delivery_address = '',
        receiver_info = '',
        notes = [],
        print_types,
        saler,
        outsource_date
      } = action.payload;
      return {
        ...state,
        id,
        created_time,
        updated_time,
        order_no,
        name,
        user_id,
        customer_id,
        category_id,
        paper_id,
        quantity,
        template_number,
        reference_order: reference_order !== null ? reference_order : 0,
        unit_price,
        design_fee,
        shipping_fee,
        deposite: deposite !== null ? deposite : 0,
        delivery_date,
        payment_method,
        vat,
        print_type_ids,
        outsources,
        status,
        number_print_face,
        method,
        delivery_address,
        receiver_info,
        notes,
        print_types,
        saler,
        outsource_date
      };
    }
    default: {
      return state;
    }
  }
};

export default orderReducer;
