import React, { createContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "../../../hooks/store";
import { useGetWordQuery } from "../../../services/wordle";
import { selectCurrentRoom } from "../../../store/rooms";
import { Board } from "./Board";
import { Keyboard } from "./Keyboard";
import { boardDefault, generateBoard } from "./words";

type TAttempt = {
  attempt: number;
  letter: number;
};

export const GameContext = createContext<{
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
  currAttempt: TAttempt;
  setCurrAttempt: React.Dispatch<React.SetStateAction<TAttempt>>;
  checks: boolean[];
  word: string;
}>({
  board: [[]],
  setBoard: () => null,
  currAttempt: { attempt: 0, letter: 0 },
  setCurrAttempt: () => null,
  checks: [],
  word: "",
});

export const Game = () => {
  const currentRoom = useAppSelector(selectCurrentRoom);
  const [board, setBoard] = useState<string[][]>(
    boardDefault(5, currentRoom?.wordLength ?? 0)
  );
  const { data: words } = useGetWordQuery({
    length: currentRoom?.wordLength ?? 3,
  });

  const [currAttempt, setCurrAttempt] = useState<TAttempt>({
    attempt: 0,
    letter: 0,
  });

  const [checks, setChecks] = useState([...Array(5)].map(() => false));

  const currentWord = words?.[0].toUpperCase() ?? "";

  useEffect(() => {
    if (currentWord.length !== 0 && currAttempt.letter === currentWord.length) {
      const newChecks = [...checks];
      newChecks[currAttempt.attempt] = true;
      setChecks(newChecks);
      if (board[currAttempt.attempt].join("") === currentWord) {
        return;
      }
      setCurrAttempt((prev) => ({ attempt: prev.attempt + 1, letter: 0 }));
    }
  }, [currAttempt.letter, currentWord]);
  return (
    <View style={styles.gameContainer}>
      <GameContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          checks,
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
  gameContainer: {
    height: '100%',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: "#121212",
  },
});
