import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IRoom } from "../interfaces/rooms";
import { roomsApiSlice } from "../services/rooms";

export interface RoomsState {
  currentRoom: IRoom | null;
  timer: number;
}

const initialState: RoomsState = {
  currentRoom: null,
  timer: 0,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (
      state,
      action: PayloadAction<{
        room: IRoom;
      }>
    ) => {
      state.currentRoom = action.payload.room;
    },
    setTimer: (state, action: PayloadAction<{ timer: number }>) => {
      state.timer = action.payload.timer;
    },
  },
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

export const { setRoom, setTimer } = roomSlice.actions;
export const roomReducer = roomSlice.reducer;

export const selectCurrentRoom = (state: RootState) => state.rooms.currentRoom;
export const selectTimer = (state: RootState) => state.rooms.timer;
