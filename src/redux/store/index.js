import {
  createStore, compose, applyMiddleware, combineReducers
} from 'redux';
import {
  homeReducer,
  userReducer,
  customerReducer,
  orderReducer,
  companyReducer,
  listOrderReducer,
  configReducer,
  notificationReducer
} from '@redux/reducers';
import rootSaga from '@redux/sagas';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import sagaMiddleware from './middleware';

/* Redux-Persist */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['companyReducer', 'configReducer', 'customerReducer', 'listOrderReducer'] // add black list reducer
};


const companyReducerConfig = {
  key: 'companyReducer',
  storage: AsyncStorage,
  blacklist: ['listCompany'] // add black list property of reducer
};
const configReducerConfig = {
  key: 'configReducer',
  storage: AsyncStorage,
  blacklist: ['listWard', 'pullRefeshing']
};

const rootPersistReducer = combineReducers({
  customerReducer,
  userReducer,
  homeReducer,
  orderReducer,
  listOrderReducer,
  companyReducer: persistReducer(companyReducerConfig, companyReducer),
  configReducer: persistReducer(configReducerConfig, configReducer),
  notificationReducer
});
const combinedReducer = persistReducer(persistConfig, rootPersistReducer);

/* Saga */
const enhancer = compose(
  applyMiddleware(
    sagaMiddleware
  )
);

/* Create Store */
export const store = createStore(
  combinedReducer,
  enhancer
);

/* Redux-Persist + Store */
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default { store, persistor };
