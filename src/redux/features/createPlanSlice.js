import { createSlice } from "@reduxjs/toolkit";

export const createPlanSlice = createSlice({
  name: "plan",
  initialState: {
    isCreatePlan: false,
  },
  reducers: {
    // Update the state with the provided payload
    pushSignal: (state, action) => {
      state.isCreatePlan = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { pushSignal } = createPlanSlice.actions;
export default createPlanSlice.reducer;
