import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IRoom } from "../interfaces/rooms";
import { roomsApiSlice } from "../services/rooms";

export interface RoomsState {
  currentRoom: IRoom | null;
}

const initialState: RoomsState = {
  currentRoom: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        roomsApiSlice.endpoints.createRoom.matchFulfilled,
        (state, { payload: { body } }) => {
          state.currentRoom = body;
        }
      )
      .addMatcher(
        roomsApiSlice.endpoints.joinRoom.matchFulfilled,
        (state, { payload: { body } }) => {
          state.currentRoom = body;
        }
      );
  },
});

export const roomReducer = roomSlice.reducer;

export const selectCurrentRoom = (state: RootState) => state.rooms.currentRoom;
