import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/usersSlice";
import globalReducer from "./slice/globalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    global: globalReducer,
  },
});
