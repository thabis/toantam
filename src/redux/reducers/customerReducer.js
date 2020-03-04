const initialState = {
  id: '',
  name: '',
  phone: '',
  email: '',
  address: '',
  district: '',
  ward: '',
  city: '',
  listCustomer: []
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_CUSTOMER': {
      return {
        ...state,
        id: '',
        name: '',
        phone: '',
        email: '',
        address: '',
        district: '',
        ward: '',
        city: '',
      };
    }
    case 'RESET_ALL_STATE': {
      return initialState;
    }
    case 'CREATE_CUSTOMER_SUCCESS': {
      const {
        id = '',
        name = '',
        phone = '',
        email = '',
        address = '',
        district = '',
        ward = '',
        city = ''
      } = action.payload;
      return {
        ...state,
        id,
        name,
        phone,
        email,
        address,
        district,
        ward,
        city
      };
    }
    case 'SET_LIST_CUSTOMER_SUCCESS': {
      return {
        ...state,
        listCustomer: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default customerReducer;
