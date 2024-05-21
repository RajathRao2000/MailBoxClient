import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlert: false,
  head: "",
  variant: "danger",
  details: "",
};

const UISlice = createSlice({
  name: "uislice",
  initialState,
  reducers: {
    setShowAlert(state) {
      state.showAlert = !state.showAlert;
    },
    setAlertValues(state, action) {
      const temp = action.payload;
      state.details = temp.details;
      state.head = temp.head;
      state.variant = temp.variant;
    },
  },
});

export const uiactions = UISlice.actions;

export default UISlice.reducer;
