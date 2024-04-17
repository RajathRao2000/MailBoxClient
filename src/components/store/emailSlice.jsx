import { createSlice } from "@reduxjs/toolkit";

const initialState = { inboxList: [], inboxUnreadcount: 0, sentEmailList: [] };

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setInbox(state, action) {
      state.inboxList = action.payload.inboxList;
      state.inboxUnreadcount=action.payload.count

    },
    addEmail(state,action){
      state.inboxList.push(action.payload)
      state.inboxUnreadcount+=1
    }

  },
});

export const emailActions = emailSlice.actions;

export default emailSlice.reducer;
