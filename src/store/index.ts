import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services";
import { utilSlice } from "../services/util";
import { authReducer } from "./auth";
import { roomReducer } from "./rooms";

export const rootStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [utilSlice.reducerPath]: utilSlice.reducer,
    rooms: roomReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, utilSlice.middleware),
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
