import { createSlice } from "@reduxjs/toolkit";

const ucenikSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
  },
  reducers: {
    isLogged(state, action) {
      state.user = action.payload;
    },
  },
});

export const ucenikActions = ucenikSlice.actions;

export default ucenikSlice;
