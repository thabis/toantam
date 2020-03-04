import {
  LOAD_CITY_DATA,
  LOAD_CITY_DATA_SUCCESS,
  LOAD_DISTRICT,
  LOAD_DISTRICT_SUCCESS,
  LOAD_WARD_SUCCESS,
  LOAD_WARD_FAIL,
  LOAD_ALL_CONFIG,
  LOAD_CONFIG_SUCCESS,
  UPDATE_PULL_REFESH,
  RESET_CLICK_IN_APP,
  CLICKED_IN_APP,
  LOAD_CITY,
  LOAD_CITY_SUCCESS
} from '@constants/action-names';

const loadCityData = payload => ({
  type: LOAD_CITY_DATA,
  ...payload
});

const loadCityDataSuccess = payload => ({
  type: LOAD_CITY_DATA_SUCCESS,
  ...payload
});

const loadDistrict = payload => ({
  type: LOAD_DISTRICT,
  ...payload
});
const loadDistrictSuccess = payload => ({
  type: LOAD_DISTRICT_SUCCESS,
  ...payload
});
const loadWardSuccess = payload => ({
  type: LOAD_WARD_SUCCESS,
  ...payload
});

const loadWardFail = payload => ({
  type: LOAD_WARD_FAIL,
  ...payload
});

const loadAllConfig = () => ({
  type: LOAD_ALL_CONFIG
});

const loadAllConfigSuccess = payload => ({
  type: LOAD_CONFIG_SUCCESS,
  ...payload
});
const updatePullRefesh = payload => ({
  type: UPDATE_PULL_REFESH,
  ...payload
});
const loadCity = () => ({
  type: LOAD_CITY
});
const loadCitySuccess = payload => ({
  type: LOAD_CITY_SUCCESS,
  ...payload
});

const clickedInApp = () => ({
  type: CLICKED_IN_APP,
});
const resetClickInApp = () => ({
  type: RESET_CLICK_IN_APP,
});

export {
  loadCityData,
  loadCityDataSuccess,
  loadDistrict,
  loadDistrictSuccess,
  loadWardSuccess,
  loadWardFail,
  loadAllConfig,
  loadAllConfigSuccess,
  updatePullRefesh,
  clickedInApp,
  resetClickInApp,
  loadCity,
  loadCitySuccess
};
