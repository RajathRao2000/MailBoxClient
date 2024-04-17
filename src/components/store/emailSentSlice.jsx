import { createSlice } from "@reduxjs/toolkit";

const initialState = { sentList: [] };

const sentEmailSlice = createSlice({
  name: "sentemail",
  initialState,
  reducers: {
    setSentEmail(state, action) {
      state.sentList = action.payload.inboxList;
    },
    addSentEmail(state, action) {
      state.sentList.push(action.payload);
    },
  },
});

export const sentEmailActions = sentEmailSlice.actions;

export default sentEmailSlice.reducer;
