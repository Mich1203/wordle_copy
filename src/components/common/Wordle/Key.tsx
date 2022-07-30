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
  const { board, currAttempt, socket } = useContext(GameContext);

  const wordLength = currentRoom?.wordLength ?? 0;

  const selectLetter = () => {
    const currBoard = board.map((arr) => arr.map((letter) => letter));
    if (keyVal === "DELETE") {
      if (!(currAttempt.attempt === 0 && currAttempt.letterPosition === 0)) {
        if (currAttempt.letterPosition === 0) {
          return;
        } else {
          currBoard[currAttempt.attempt][currAttempt.letterPosition - 1] = "";
          socket?.emit("game-update", currentRoom?.code, currBoard, {
            attempt: currAttempt,
            letterPosition: currAttempt.letterPosition - 1,
          });
        }
      }
      return;
    } else if (currAttempt.letterPosition === wordLength) return;
    currBoard[currAttempt.attempt][currAttempt.letterPosition] = keyVal;
    console.log(currBoard);
    socket?.emit("game-update", currentRoom?.code, currBoard, {
      attempt: currAttempt,
      letterPosition: currAttempt.letterPosition + 1,
    });
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
