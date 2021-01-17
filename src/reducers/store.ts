import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootReducer from "./rootReducer";
const loggerMiddleware = createLogger();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)


const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

export const store: any = createStoreWithMiddleware(persistedReducer);