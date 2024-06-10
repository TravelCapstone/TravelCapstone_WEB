import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import createPlanReducer from "./features/createPlanSlice";
const rootReducer = combineReducers({
  user: authReducer,
  plan: createPlanReducer,
});

export default rootReducer;
