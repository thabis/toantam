const initialState = {
  loading: false
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_ALL_STATE': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default homeReducer;
