import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

// 🔹 Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist only the "auth" slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

// 🔹 Logger Middleware to track dispatched actions
const loggerMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  console.log("🟡 Dispatching Action:", action);
  const result = next(action);
  console.log("🟢 Updated State:", storeAPI.getState());
  return result;
};

export function createStore() {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false, serializableCheck: false })
        .concat(sagaMiddleware)
        .concat(loggerMiddleware), // ✅ Add logger middleware
    devTools: process.env.NODE_ENV !== "production",
  });

  sagaMiddleware.run(rootSaga);

  return store;
}

export const store = createStore();
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
