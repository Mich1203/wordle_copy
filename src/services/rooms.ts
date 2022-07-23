import { apiSlice } from ".";
import { ApiResponse } from "../interfaces/general";
import { IRoom } from "../interfaces/rooms";

export const roomsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation<ApiResponse<IRoom>, Partial<IRoom>>({
      query: (room) => ({
        url: "rooms",
        method: "POST",
        body: room,
      }),
    }),
    joinRoom: builder.mutation<ApiResponse<IRoom>, string>({
      query: (roomId) => ({
        url: `rooms/join/${roomId}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateRoomMutation, useJoinRoomMutation } = roomsApiSlice;
