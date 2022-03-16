import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import menuReducer from "./menuSlice";

const reducers = combineReducers({
  user: userReducer,
  cart: cartReducer,
  menu: menuReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
