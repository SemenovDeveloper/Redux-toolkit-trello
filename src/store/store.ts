import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { columnReducer } from "store/ducks/column/columnReducers";
import { taskReducer } from "store/ducks/card/cardReducers";
import { commentReducer } from "store/ducks/comment/commentReducers";
import { authorReducer } from "store/ducks/author/authorReducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  columnReducer,
  taskReducer,
  commentReducer,
  authorReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
