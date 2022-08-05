import React, { createContext, useEffect, useState } from "react";
import { View, StyleSheet, ToastAndroid, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import {
  selectCurrentRoom,
  selectTimer,
  setRoom,
  setTimer,
} from "../../../store/rooms";
import { Board } from "./Board";
import { Keyboard } from "./Keyboard";
import { boardDefault } from "./words";
import socketIOClient, { Socket } from "socket.io-client";
import { API_URL } from "../../../services";
import { selectUser } from "../../../store/auth";
import { IRoom } from "../../../interfaces/rooms";
import { currentInstancesStatus } from "react-native-mmkv-storage/dist/src/initializer";
import Players from "./Players";
import { FAB } from "@rneui/themed";

type TAttempt = {
  attempt: number;
  letterPosition: number;
};

interface IGameContext {
  board: string[][];
  currAttempt: TAttempt;
  word: string;
  socket: Socket | null;
  checks: boolean[];
}

export const GameContext = createContext<IGameContext>({
  board: [[]],
  currAttempt: { attempt: 0, letterPosition: 0 },
  word: "",
  socket: null,
  checks: [],
});

export const Game = () => {
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);
  const currentUser = useAppSelector(selectUser);
  const timer = useAppSelector(selectTimer);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [checks, setChecks] = useState([...Array(5)].map(() => false));
  const [showPlayers, setShowPlayers] = useState(false);

  const board = currentRoom?.board || boardDefault(5, 5);
  const currentPlayer = currentRoom?.currentPlayer || currentInstancesStatus;
  const currAttempt = currentRoom?.state || { attempt: 0, letterPosition: 0 };
  const currentWord =
    currentRoom?.currentWord
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") ?? "";

  const computePlayerScore = () => {
    let score = 0;
    const guessedWord = board[currAttempt.attempt];
    guessedWord.forEach((char, index) => {
      if (char === currentWord[index]) score += 10;
      else if (currentWord.includes(char)) score += 5;
    });
    if (guessedWord.join("") === currentWord) score += 10;
    return score;
  };

  const nextPlayer = () => {
    socket?.emit(
      `cycle-player`,
      currentRoom?.code,
      currentPlayer?._id,
      computePlayerScore()
    );
  };

  const nextRound = () => {
    socket?.emit("next-round", currentRoom?.code, computePlayerScore());
  };

  useEffect(() => {
    setChecks([...Array(currentRoom?.players.length).map(() => false)]);
  }, [currentRoom?.players?.length, currentWord]);

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
      dispatch(setRoom({ room }));
    });
    sock.on(`timer-${currentRoom.code}-update`, (timer: number) => {
      dispatch(setTimer({ timer }));
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
      currAttempt.letterPosition === currentWord.length &&
      timer !== 0
    ) {
      const newChecks = [...checks];
      newChecks[currAttempt.attempt] = true;
      setChecks(newChecks);
      if (
        currentPlayer._id === currentUser?._id &&
        (board[currAttempt.attempt].join("") === currentWord ||
          currAttempt.attempt + 1 === currentRoom?.players.length)
      ) {
        nextRound();
      } else if (currentPlayer._id === currentUser?._id) {
        nextPlayer();
      }
    }
  }, [currAttempt, currentWord]);
  return (
    <View style={styles.gameContainer}>
      <View style={styles.gameHeader}>
        <Text style={styles.topText}>{currentPlayer?.name}'s Turn</Text>
        <FAB
          icon={{ name: "persons", type: "fontisto" }}
          visible={!showPlayers}
          onPress={() => setShowPlayers(true)}
        />
      </View>

      <GameContext.Provider
        value={{
          board,
          currAttempt,
          socket,
          word: currentWord,
          checks,
        }}
      >
        <Players isOpen={showPlayers} onClose={() => setShowPlayers(false)} />
        <Board />
        <Keyboard />
      </GameContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  topText: {
    color: "white",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  gameHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  gameContainer: {
    height: "100%",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#121212",
  },
});
