import React, { FC, useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { useAppSelector } from "../../../hooks/store";
import { selectCurrentRoom } from "../../../store/rooms";
import { GameContext } from "./Game";

export interface IKeyProps {
  keyVal: string;
  bigKey?: boolean;
}

export const Key: FC<IKeyProps> = ({ keyVal, bigKey }) => {
  const currentRoom = useAppSelector(selectCurrentRoom);
  const { board, setBoard, currAttempt, setCurrAttempt } =
    useContext(GameContext);

  const wordLength = currentRoom?.wordLength ?? 0;

  const selectLetter = () => {
    const currBoard = [...board];

    if (keyVal === "DELETE") {
      if (!(currAttempt.attempt === 0 && currAttempt.letter === 0)) {
        if (currAttempt.letter === 0) {
          currBoard[currAttempt.attempt - 1][board[0].length - 1] = "";
          setCurrAttempt({
            attempt: currAttempt.attempt - 1,
            letter: board[0].length - 1,
          });
        } else {
          currBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
          setBoard(currBoard);
          setCurrAttempt((prev) => ({
            ...prev,
            letter: currAttempt.letter - 1, 
          }));
        }
      }
      return;
    } else if (currAttempt.letter === wordLength) return;
    currBoard[currAttempt.attempt][currAttempt.letter] = keyVal;
    setBoard(currBoard);
    setCurrAttempt((prev) => ({ ...prev, letter: currAttempt.letter + 1 }));
  };

  const classes = [styles.key, { width: bigKey ? 40 : 23 }];

  return (
    <Text onPress={selectLetter} style={classes}>
      {keyVal}
    </Text>
  );
};

const styles = StyleSheet.create({
  key: {
    width: 23,
    height: 30,
    margin: 4,
    borderRadius: 4,
    fontSize: 20,
    backgroundColor: "grey",
    display: "flex",
    color: "white",
    fontFamily: "Arial, Helvetica, sans-serif",
    textAlign: "center",
    justifyContent: "center",
  },
});
