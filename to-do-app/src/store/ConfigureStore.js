import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducer/RootReducer";

const store = configureStore({
  reducer: rootReducer,
});
export default store;
