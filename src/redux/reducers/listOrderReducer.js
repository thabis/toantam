const initialState = {
  listDraft: [],
  listCancel: [],
  listSale: [],
  listProcessing: [],
  listDone: [],
  listConfirm: [],
  listSearch: [],
  listPrinted: [],
  listStored: [],
  listDesigning: [],
  listFeedbackDesigning: [],
  listDesigned: [],
  listPrinting: [],
  listDeliver: [],
};

const listOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_ALL_STATE': {
      return initialState;
    }
    case 'SET_LIST_DRAFT_SUCCESS': {
      const { listOrder } = action;
      const { items = [] } = listOrder;
      return {
        ...state,
        listDraft: items
      };
    }
    case 'SET_LIST_DRAFT_FAILED': {
      return {
        ...state,
        listDraft: []
      };
    }
    case 'SET_LIST_SALE_SUCCESS': {
      const { listSale } = action;
      const { items = [] } = listSale;
      return {
        ...state,
        listSale: items
      };
    }
    case 'SET_LIST_SALE_FAILED': {
      return {
        ...state,
        listSale: []
      };
    }
    case 'SET_LIST_PROCCESS_SUCCESS': {
      const { listProcessing } = action;
      const { items = [] } = listProcessing;
      return {
        ...state,
        listProcessing: items
      };
    }
    case 'SET_LIST_PROCCESS_FAILED': {
      return {
        ...state,
        listProcessing: []
      };
    }
    case 'SET_LIST_DONE_SUCCESS': {
      const { listDone } = action;
      const { items = [] } = listDone;
      return {
        ...state,
        listDone: items
      };
    }
    case 'SET_LIST_DONE_FAILED': {
      return {
        ...state,
        listDone: []
      };
    }
    case 'SET_LIST_CONFIRM_SUCCESS': {
      const { listConfirm } = action;
      const { items = [] } = listConfirm;
      return {
        ...state,
        listConfirm: items
      };
    }
    case 'SET_LIST_CONFIRM_FAILED': {
      return {
        ...state,
        listConfirm: []
      };
    }
    case 'SET_LIST_CANCEL_SUCCESS': {
      const { listCancel } = action;
      const { items = [] } = listCancel;
      return {
        ...state,
        listCancel: items
      };
    }
    case 'SEARCH_ORDER_SUCCESS': {
      const { listSearch } = action;
      const { items = [] } = listSearch;
      return {
        ...state,
        listSearch: items
      };
    }
    case 'SEARCH_ORDER_FAILED': {
      return {
        ...state,
        listSearch: []
      };
    }
    case 'SET_LIST_PRINTED_SUCCESS': {
      const { listPrinted } = action;
      const { items = [] } = listPrinted;
      return {
        ...state,
        listPrinted: items
      };
    }
    case 'SET_LIST_STORED_SUCCESS': {
      const { listStored } = action;
      const { items = [] } = listStored;
      return {
        ...state,
        listStored: items
      };
    }
    case 'SET_LIST_DESIGN_SUCCESS': {
      const { listDesigning } = action;
      const { items = [] } = listDesigning;
      return {
        ...state,
        listDesigning: items
      };
    }
    case 'SET_LIST_FEEDBACK_DESIGN_SUCCESS': {
      const { listFeedbackDesigning } = action;
      const { items = [] } = listFeedbackDesigning;
      return {
        ...state,
        listFeedbackDesigning: items
      };
    }
    case 'SET_LIST_DESIGNED_SUCCESS': {
      const { listDesigned } = action;
      const { items = [] } = listDesigned;
      return {
        ...state,
        listDesigned: items
      };
    }
    case 'SET_LIST_PRINTING_SUCCESS': {
      const { listPrinting } = action;
      const { items = [] } = listPrinting;
      return {
        ...state,
        listPrinting: items
      };
    }
    case 'SET_LIST_DELIVERING_SUCCESS': {
      const { listDeliver } = action;
      const { items = [] } = listDeliver;
      console.log(items);
      return {
        ...state,
        listDeliver: items
      };
    }
    default: {
      return state;
    }
  }
};

export default listOrderReducer;
