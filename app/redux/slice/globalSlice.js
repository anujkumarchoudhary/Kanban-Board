import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalData: null,
};

const GlobalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalData: (state, action) => {
      state.globalData = action.payload;
    },
  },
});

export const { setGlobalData } = GlobalSlice.actions;
export default GlobalSlice.reducer;
