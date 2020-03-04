import {
  LOAD_ALL_CONFIG,
  LOAD_CITY_DATA
} from '@constants/action-names';
import {
  takeLatest, select, all, put
} from 'redux-saga/effects';
import { Alert } from 'react-native';
import {
  apiGetOutSource, apiGetPrintType, apiGetPaper, apiGetCategories, apiGetCity
} from '@services/dataConfig-api';
import {
  loadAllConfigSuccess,
  loadCityDataSuccess,
} from '@actions/config/config';
import { messageError } from '@constants/message';

function* loadCityData() {
  try {
    const { userReducer } = yield select();
    const { token } = userReducer;
    const { data, errors } = yield apiGetCity(token);
    if (errors) {
      const error_mess = messageError('error_ward');
      yield Alert.alert(error_mess);
      return;
    }

    const listCityData = data.districts;
    yield put(loadCityDataSuccess({ listCityData }));
  } catch (error) {
    Alert.alert(error.message);
  }
}

function* loadConfig() {
  try {
    const { userReducer } = yield select();
    const { token } = userReducer;
    const [outsource, printype, paper, categories, city] = yield all([
      apiGetOutSource(token),
      apiGetPrintType(token),
      apiGetPaper(token),
      apiGetCategories(token),
      apiGetCity(token)
    ]);
    const { other, rolling } = outsource.data;
    const { color } = printype.data;
    const papers = paper.data;
    const listCategory = categories.data;
    const listCityData = city.data;
    const listOther = yield convertList(other, 'outsource');
    const listRolling = yield convertList(rolling, 'outsource');
    const listColor = yield convertList(color, 'color');
    const listPaper = yield convertList(papers, 'paper');
    const listCategoryParent = yield converListCat(listCategory);
    const data = {
      listOutSourceRolling: listRolling,
      listOutSourceDiff: listOther,
      listColorPrint: listColor,
      listPaper,
      listCategoryParent,
      listCategory,
      listCityData
    };
    yield put(loadAllConfigSuccess(data));
  } catch (error) {
    Alert.alert(error.message);
  }
}

// function* loadCity() {
//   try {
//     const { data, error, errors } = yield apiGetListCity();
//     if (error || errors) {
//       if (error) {
//         Alert.alert(error.message);
//       }
//       if (Object.prototype.hasOwnProperty.call(errors, 'message')) {
//         Alert.alert(errors.message);
//       }
//       return false;
//     }
//     const { districts } = data;
//     const dataDistrict = [];
//     if (districts.length > 0) {
//       districts.map(value => dataDistrict.push({
//         id: value.id,
//         district: value.name,
//         wards: value.wards
//       }));
//     }
//     yield put(loadCitySuccess({ listCity: dataDistrict }));
//     return true;
//   } catch (error) {
//     Alert.alert(error.message);
//     return false;
//   }
// }

function converListCat(dataList) {
  const listParent = [];
  Object.keys(dataList).forEach((val) => {
    const listSub = dataList[val];
    listParent.push({
      label: val,
      value: listSub[0].parent_id,
    });
  });
  return listParent;
}
function convertList(dataList, type) {
  const listConvert = [];
  // eslint-disable-next-line array-callback-return
  dataList.map((val) => {
    const value = val.id;
    let label = '';
    switch (type) {
      case 'outsource': {
        label = val.name;
        break;
      }
      case 'color': {
        label = val.print_type_name;
        break;
      }
      case 'paper': {
        label = val.paper_code;
        break;
      }
      default: {
        break;
      }
    }
    listConvert.push({
      value,
      label,
    });
  });
  return listConvert;
}

function* configSaga() {
  yield takeLatest(LOAD_ALL_CONFIG, loadConfig);
  yield takeLatest(LOAD_CITY_DATA, loadCityData);
}

export default configSaga;
