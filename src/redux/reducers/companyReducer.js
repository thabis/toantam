const initialState = {
  id: '',
  name: '',
  phone: '',
  email: '',
  address: '',
  district: '',
  ward: '',
  city: '',
  listCompany: []
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_ALL_STATE': {
      return initialState;
    }
    case 'SET_LIST_COMPANY_SUCCESS': {
      const { listCompany } = action;
      return {
        ...state,
        listCompany
      };
    }
    default: {
      return state;
    }
  }
};

export default companyReducer;
