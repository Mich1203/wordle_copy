import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IUser } from "../interfaces/auth";
import { authApiSlice } from "../services/auth";

export interface AuthState {
  loading: boolean;
  user: IUser | null;
  token: string | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthState["user"];
        token: AuthState["token"];
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApiSlice.endpoints.getProfile.matchFulfilled,
        (state, { payload: { body } }) => {
          state.user = body;
        }
      )
      .addMatcher(
        authApiSlice.endpoints.login.matchFulfilled,
        (state, { payload: { body } }) => {
          state.token = body.token;
          state.user = body.user;
        }
      )
      .addMatcher(
        authApiSlice.endpoints.register.matchFulfilled,
        (state, { payload: { body } }) => {
          state.token = body.token;
          state.user = body.user;
        }
      );
  },
});

export const { setCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
