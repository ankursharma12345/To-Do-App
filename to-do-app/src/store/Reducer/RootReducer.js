import snackbarReducer from "./Snackbar";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  snackbar: snackbarReducer,
});
export default rootReducer;
