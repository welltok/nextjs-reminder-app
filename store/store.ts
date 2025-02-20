// store.ts
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import { rootSaga } from './rootSaga'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // persist only the "user" slice (adjust as needed)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer, // or just your single slice if you have only one
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false  }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});


sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
