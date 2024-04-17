import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./authSlice";
import emailreducer from "./emailSlice";
import sentemailreducer from "./emailSentSlice";

export const store = configureStore({
  reducer: { auth: authreducer, email: emailreducer, sent: sentemailreducer },
});
