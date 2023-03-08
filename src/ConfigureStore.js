
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./_slices/auth";
import messageReducer from "./_slices/message";
import patientReducer from "./_slices/patient";
import goalReducer from "./_slices/goal";
import userReducer from "./_slices/user";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  patients: patientReducer,
  goal: goalReducer,
  userDetail: userReducer,
};

const configureAppStore = preloadedState => {
  const store = configureStore({
    reducer: reducer,
    devTools: true,
  });
  if (module.hot) {
    module.hot.accept('./_slices', () => {
      const nextRootReducer = require('./_slices').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

export default configureAppStore