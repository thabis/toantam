const initialState = {
  listCityData: [],
  listDistrict: [],
  listWard: [],
  listOutSourceDiff: [],
  listOutSourceRolling: [],
  listPaper: [],
  listCategoryParent: [],
  listCategory: [],
  listColorPrint: [],
  listCity: [],
  pullRefeshing: false,
  onClickNotification: false,
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_ALL_STATE': {
      return initialState;
    }
    case 'LOAD_CITY_DATA_SUCCESS': {
      const { listCityData } = action;
      return {
        ...state,
        listCityData
      };
    }
    case 'LOAD_DISTRICT_SUCCESS': {
      const { listDistrict } = action;
      return {
        ...state,
        listDistrict
      };
    }
    case 'LOAD_WARD_SUCCESS': {
      const { listWard } = action;
      return {
        ...state,
        listWard
      };
    }
    case 'LOAD_WARD_FAIL': {
      return {
        ...state,
        listWard: []
      };
    }
    case 'LOAD_CONFIG_SUCCESS': {
      const {
        listOutSourceDiff,
        listOutSourceRolling,
        listPaper,
        listCategoryParent,
        listCategory,
        listColorPrint,
      } = action;
      const listColor = listColorPrint.filter(clo => clo.label !== 'khác');
      return {
        ...state,
        listOutSourceDiff,
        listOutSourceRolling,
        listPaper,
        listCategoryParent,
        listCategory,
        listColorPrint: listColor,
      };
    }
    case 'LOAD_CITY_SUCCESS': {
      const {
        listCity
      } = action;
      return {
        ...state,
        listCity
      };
    }
    case 'UPDATE_PULL_REFESH': {
      return {
        ...state,
        pullRefeshing: action.pullRefeshing
      };
    }
    case 'RESET_CLICK_IN_APP': {
      return {
        ...state,
        onClickNotification: false,
      };
    }
    case 'CLICKED_IN_APP': {
      return {
        ...state,
        onClickNotification: true,
      };
    }
    default: {
      return {
        ...state,
        onClickNotification: false
      };
    }
  }
};

export default configReducer;
