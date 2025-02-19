// store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import { rootSaga } from './rootSaga'

// 1) Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// 2) Configure the store
export const store = configureStore({
  reducer: rootReducer, // or just your single slice if you have only one
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// 3) Run the root saga
sagaMiddleware.run(rootSaga);

// 4) Export types for usage throughout the app
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
