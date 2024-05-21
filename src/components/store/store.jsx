import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./authSlice";
import emailreducer from "./emailSlice";
import sentemailreducer from "./emailSentSlice";
import uireducer from "./UISlice";

export const store = configureStore({
  reducer: {
    auth: authreducer,
    email: emailreducer,
    sent: sentemailreducer,
    ui: uireducer,
  },
});
