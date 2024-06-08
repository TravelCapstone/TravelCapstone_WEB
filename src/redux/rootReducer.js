import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import createPlanReducer from "./features/createPlanSlice";
const rootReducer = combineReducers({
  user: counterReducer,
  plan: createPlanReducer,
});

export default rootReducer;
