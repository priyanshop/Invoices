import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from './reducers';

const appReducer = combineReducers(reducer);

const rootReducer = (state: any, action: any) => {
  /**
   * Reset store state on logout action
   */
  return appReducer(state, action);
};
// user reduser data store in local storage "AsyncStorage"
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, promise],
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export {store, persistor};
