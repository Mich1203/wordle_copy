import React, { FC, useContext } from "react";
import { StyleSheet, Text, ToastAndroid } from "react-native";
import { useAppSelector } from "../../../hooks/store";
import { selectUser } from "../../../store/auth";
import { selectCurrentRoom, setRoom } from "../../../store/rooms";
import { GameContext } from "./Game";

export interface IKeyProps {
  keyVal: string;
  bigKey?: boolean;
}

export const Key: FC<IKeyProps> = ({ keyVal, bigKey }) => {
  const currentRoom = useAppSelector(selectCurrentRoom);
  const currentUser = useAppSelector(selectUser);
  const { board, currAttempt, socket } = useContext(GameContext);

  const wordLength = currentRoom?.wordLength ?? 0;

  const selectLetter = () => {
    if (currentRoom?.currentPlayer._id !== currentUser?._id) {
      ToastAndroid.show("NOT YOU TURN!", ToastAndroid.LONG);
      return;
    }
    const currBoard = board.map((arr) => arr.map((letter) => letter));
    let attempt = {
      attempt: 0,
      letterPosition: 0,
    };
    if (keyVal === "DELETE") {
      if (!(currAttempt.attempt === 0 && currAttempt.letterPosition === 0)) {
        if (currAttempt.letterPosition === 0) {
          return;
        } else {
          currBoard[currAttempt.attempt][currAttempt.letterPosition - 1] = "";
          attempt = {
            attempt: currAttempt.attempt,
            letterPosition: currAttempt.letterPosition - 1,
          };

          socket?.emit("game-update", currentRoom?.code, currBoard, attempt);
        }
      }
      return;
    } else if (currAttempt.letterPosition === wordLength) return;
    currBoard[currAttempt.attempt][currAttempt.letterPosition] = keyVal;
    attempt = {
      attempt: currAttempt.attempt,
      letterPosition: currAttempt.letterPosition + 1,
    };
    socket?.emit("game-update", currentRoom?.code, currBoard, attempt);
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
