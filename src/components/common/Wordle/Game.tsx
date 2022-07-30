import React, { createContext, useEffect, useState } from "react";
import { View, StyleSheet, ToastAndroid, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { selectCurrentRoom, setRoom } from "../../../store/rooms";
import { Board } from "./Board";
import { Keyboard } from "./Keyboard";
import { boardDefault } from "./words";
import socketIOClient, { Socket } from "socket.io-client";
import { API_URL } from "../../../services";
import { selectUser } from "../../../store/auth";
import { IRoom } from "../../../interfaces/rooms";
import { currentInstancesStatus } from "react-native-mmkv-storage/dist/src/initializer";

type TAttempt = {
  attempt: number;
  letterPosition: number;
};

export const GameContext = createContext<{
  board: string[][];
  currAttempt: TAttempt;
  checks: boolean[];
  word: string;
  socket: Socket | null;
}>({
  board: [[]],
  currAttempt: { attempt: 0, letterPosition: 0 },
  checks: [],
  word: "",
  socket: null,
});

export const Game = () => {
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);
  const currentUser = useAppSelector(selectUser);
  const [socket, setSocket] = useState<Socket | null>(null);

  const board = currentRoom?.board || boardDefault(5, 5);
  const currentPlayer = currentRoom?.currentPlayer || currentInstancesStatus;
  const currAttempt = currentRoom?.state || { attempt: 0, letterPosition: 0 };

  const [checks, setChecks] = useState([...Array(5)].map(() => false));

  const nextPlayer = () => {
    socket?.emit(`cycle-player`, currentRoom?.code, currentPlayer?._id);
  };

  const nextRound = () => {
    socket?.emit("next-round", currentRoom?.code);
  };

  const currentWord =
    currentRoom?.currentWord
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") ?? "";

  useEffect(() => {
    if (!currentRoom?.code || !currentUser?._id) return;

    const sock = socketIOClient(API_URL);
    sock.emit("join-room", currentRoom.code, currentUser?._id);
    sock.on(`joined-${currentRoom.code}-user`, (name: string) =>
      ToastAndroid.show(`${name} joined the room!`, ToastAndroid.LONG)
    );
    sock.on(`left-${currentRoom.code}-user`, (name: string) =>
      ToastAndroid.show(`${name} left the room!`, ToastAndroid.LONG)
    );
    sock.on(`game-${currentRoom.code}-update`, (room: IRoom) => {
      console.log(room.board);
      dispatch(setRoom({ room }));
    });
    setSocket(sock);

    return () => {
      sock.emit("leave-room", currentRoom.code, currentUser._id);
      sock.disconnect();
      setSocket(null);
    };
  }, [currentRoom?.code, currentUser?._id]);

  useEffect(() => {
    if (
      currentWord.length !== 0 &&
      currAttempt.letterPosition === currentWord.length
    ) {
      const newChecks = [...checks];
      newChecks[currAttempt.attempt] = true;
      setChecks(newChecks);
      if (
        currentPlayer._id === currentUser?._id &&
        (board[currAttempt.attempt].join("") === currentWord ||
          currAttempt.attempt + 1 === currentRoom?.users.length)
      ) {
        nextRound();
      } else if (currentPlayer._id === currentUser?._id) {
        nextPlayer();
      }
    }
  }, [currAttempt, currentWord]);
  return (
    <View style={styles.gameContainer}>
      <Text style={styles.topText}>{currentPlayer?.name}'s Turn</Text>
      <GameContext.Provider
        value={{
          board,
          currAttempt,
          checks,
          socket,
          word: currentWord,
        }}
      >
        <Board />
        <Keyboard />
      </GameContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  topText: {
    backgroundColor: "red",
    color: "white",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  gameContainer: {
    height: "100%",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#121212",
  },
});
