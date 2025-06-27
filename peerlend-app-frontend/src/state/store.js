import itemReducer from './reducers/itemReducer.js';
import { applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { createStore } from 'redux';
import rootReducer from './reducers/index.js';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['user'], // persist only 'user' reducer or adjust as needed
  transforms: [
    encryptTransform({
      secretKey: '9&_QOb//yPH4C5wgo,pN<MC_Vb<,91:w', // ideally keep this in an env variable
      onError: function (error) {
        console.error('Encryption error:', error);
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    {},
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);