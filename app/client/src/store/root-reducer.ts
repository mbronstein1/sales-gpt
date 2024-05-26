import { combineReducers } from '@reduxjs/toolkit';
import sessionStorage from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';
import authReducer from '../slices/auth';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const rootReducers = combineReducers({
  auth: persistedAuthReducer,
});
