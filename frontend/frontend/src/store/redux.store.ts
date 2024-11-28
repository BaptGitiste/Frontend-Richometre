import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import testSlice from "./slices/test.slice";
import baseApi from "./api/base.api";
import { externalApi } from "./api/external.api";
import userSlice from "./slices/users.slice";
import authenticationSlice from "./slices/authentication.slice";
import { exceptionListener } from "./middlewares/error.middleware";
import { authenticationApi } from "./api/authentication.api";
import toastSlice from "./slices/toast.slice";

const reduxStore = configureStore({
  reducer: {
    // apis
    [baseApi.reducerPath]: baseApi.reducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [externalApi.reducerPath]: externalApi.reducer,
    // slices
    [testSlice.reducerPath]: testSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [authenticationSlice.reducerPath]: authenticationSlice.reducer,
    [toastSlice.reducerPath]: toastSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(exceptionListener)
      .concat(baseApi.middleware, authenticationApi.middleware, externalApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

setupListeners(reduxStore.dispatch);

export default reduxStore;